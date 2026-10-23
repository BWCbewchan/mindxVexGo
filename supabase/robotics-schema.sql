-- Robotics owns only robotics_* objects. Existing TPS tables are untouched.
create schema robotics;
revoke all on schema robotics from public;
grant usage on schema robotics to anon,authenticated;
create schema if not exists robotics_private;
revoke all on schema robotics_private from public;
create table robotics_private.robotics_reviewers (
 user_id uuid primary key references auth.users(id) on delete cascade,
 created_at timestamptz not null default now()
);
alter table robotics_private.robotics_reviewers enable row level security;
create function robotics_private.robotics_is_reviewer() returns boolean
language sql stable security definer set search_path = '' as $$
 select auth.uid() is not null and exists(select 1 from robotics_private.robotics_reviewers r where r.user_id=auth.uid());
$$;
revoke all on function robotics_private.robotics_is_reviewer() from public;
grant usage on schema robotics_private to anon,authenticated;
grant execute on function robotics_private.robotics_is_reviewer() to anon,authenticated;
create function robotics.robotics_is_reviewer() returns boolean language sql stable security invoker set search_path = '' as $$
 select robotics_private.robotics_is_reviewer();
$$;
revoke all on function robotics.robotics_is_reviewer() from public;
grant execute on function robotics.robotics_is_reviewer() to authenticated;

create function robotics.robotics_valid_document(doc jsonb,platform text) returns boolean language sql immutable set search_path = '' as $$
 select coalesce(jsonb_typeof(doc)='object' and doc->>'version'='1'
 and (doc->>'platform' is null or doc->>'platform'=platform)
 and jsonb_typeof(doc->'parts')='array'
 and case when jsonb_typeof(doc->'parts')='array' then jsonb_array_length(doc->'parts')<=250 else false end
 and octet_length(doc::text)<=5000000,false);
$$;
revoke all on function robotics.robotics_valid_document(jsonb,text) from public;
grant execute on function robotics.robotics_valid_document(jsonb,text) to authenticated;
create table robotics.robotics_projects (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade,
 local_id text not null check(local_id ~ '^[a-zA-Z0-9_-]{1,100}$'),
 platform text not null check(platform in ('vexgo','vexiq')),
 title text not null check(char_length(btrim(title)) between 1 and 120),
 document jsonb not null, thumbnail text,
 revision integer not null default 1 check(revision>0),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 unique(owner_id,platform,local_id),
 check(robotics.robotics_valid_document(document,platform)),
 check(thumbnail is null or (length(thumbnail)<=400000 and thumbnail ~ '^data:image/(png|jpeg|webp);base64,[a-zA-Z0-9+/=]+$'))
);
alter table robotics.robotics_projects enable row level security;
revoke all on robotics.robotics_projects from anon,authenticated;
grant select,insert,update,delete on robotics.robotics_projects to authenticated;
create policy robotics_projects_owner on robotics.robotics_projects for all to authenticated
 using(owner_id=(select auth.uid())) with check(owner_id=(select auth.uid()));
create function robotics.robotics_project_revision() returns trigger language plpgsql security invoker set search_path = '' as $$
begin
 if new.owner_id<>old.owner_id or new.platform<>old.platform or new.local_id<>old.local_id then raise exception 'ROBOTICS_IMMUTABLE_IDENTITY'; end if;
 new.revision=old.revision+1; new.updated_at=now(); new.created_at=old.created_at; return new;
end; $$;
revoke all on function robotics.robotics_project_revision() from public;
create trigger robotics_project_revision before update on robotics.robotics_projects for each row execute function robotics.robotics_project_revision();

create function robotics.robotics_save_project(p_local_id text,p_platform text,p_title text,p_document jsonb,p_thumbnail text,p_expected_revision integer default null,p_expected_owner uuid default null)
returns robotics.robotics_projects language plpgsql security invoker set search_path = '' as $$
declare existing robotics.robotics_projects;
begin
 if auth.uid() is null then raise exception 'ROBOTICS_SIGN_IN_REQUIRED'; end if;
 if p_expected_owner is null or p_expected_owner<>auth.uid() then raise exception 'ROBOTICS_ACCOUNT_CHANGED'; end if;
 -- Serialize first writes too: two devices cannot both create revision 1.
 perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text||p_platform||p_local_id,0));
 select * into existing from robotics.robotics_projects where owner_id=auth.uid() and platform=p_platform and local_id=p_local_id for update;
 if found then
  if p_expected_revision is null or existing.revision<>p_expected_revision then raise exception 'ROBOTICS_CONFLICT'; end if;
  update robotics.robotics_projects set title=p_title,document=p_document,thumbnail=p_thumbnail where id=existing.id returning * into existing;
 else
  if p_expected_revision is not null then raise exception 'ROBOTICS_CONFLICT'; end if;
  insert into robotics.robotics_projects(owner_id,local_id,platform,title,document,thumbnail) values(auth.uid(),p_local_id,p_platform,p_title,p_document,p_thumbnail) returning * into existing;
 end if;
 return existing;
end; $$;
revoke all on function robotics.robotics_save_project(text,text,text,jsonb,text,integer,uuid) from public;
grant execute on function robotics.robotics_save_project(text,text,text,jsonb,text,integer,uuid) to authenticated;

create table robotics.robotics_submissions (
 id uuid primary key default gen_random_uuid(), project_id uuid not null references robotics.robotics_projects(id) on delete cascade,
 owner_id uuid not null references auth.users(id) on delete cascade,
 platform text not null check(platform in ('vexgo','vexiq')),
 title text not null check(char_length(btrim(title)) between 1 and 120),
 description text not null default '' check(char_length(description)<=2000),
 author_name text not null check(char_length(btrim(author_name)) between 1 and 80),
 document jsonb not null, thumbnail text, project_revision integer not null,
 status text not null default 'pending' check(status in ('pending','approved','rejected')),
 review_note text not null default '' check(char_length(review_note)<=2000),
 reviewer_id uuid references auth.users(id), reviewed_at timestamptz,
 created_at timestamptz not null default now(),
 unique(project_id,project_revision), check(robotics.robotics_valid_document(document,platform))
);
create index robotics_submissions_public on robotics.robotics_submissions(status,created_at desc);
create index robotics_submissions_owner on robotics.robotics_submissions(owner_id,created_at desc);
create index robotics_submissions_reviewer on robotics.robotics_submissions(reviewer_id);
alter table robotics.robotics_submissions enable row level security;
revoke all on robotics.robotics_submissions from anon,authenticated;
grant select on robotics.robotics_submissions to anon,authenticated;
grant insert(project_id,title,description,author_name,project_revision) on robotics.robotics_submissions to authenticated;
grant update(status,review_note) on robotics.robotics_submissions to authenticated;
create policy robotics_submissions_read on robotics.robotics_submissions for select to anon,authenticated using(
 status='approved' or owner_id=(select auth.uid()) or (select robotics_private.robotics_is_reviewer())
);
create policy robotics_submissions_send on robotics.robotics_submissions for insert to authenticated with check(
 owner_id=(select auth.uid()) and status='pending' and exists(select 1 from robotics.robotics_projects p where p.id=project_id and p.owner_id=(select auth.uid()))
);
create policy robotics_submissions_review on robotics.robotics_submissions for update to authenticated
 using((select robotics_private.robotics_is_reviewer())) with check((select robotics_private.robotics_is_reviewer()));
create function robotics.robotics_submission_snapshot() returns trigger language plpgsql security invoker set search_path = '' as $$
declare p robotics.robotics_projects;
begin
 if tg_op='INSERT' then
  select * into p from robotics.robotics_projects where id=new.project_id and owner_id=auth.uid();
  if not found then raise exception 'ROBOTICS_PROJECT_NOT_OWNED'; end if;
  if new.project_revision is null or new.project_revision<>p.revision then raise exception 'ROBOTICS_CONFLICT'; end if;
  if jsonb_array_length(p.document->'parts')=0 then raise exception 'ROBOTICS_EMPTY_MODEL'; end if;
  new.owner_id=auth.uid();new.platform=p.platform;new.document=p.document;new.thumbnail=p.thumbnail;new.project_revision=p.revision;
  new.status='pending';new.review_note='';new.reviewer_id=null;new.reviewed_at=null;
 else
  if not robotics_private.robotics_is_reviewer() then raise exception 'ROBOTICS_REVIEWER_REQUIRED'; end if;
  new.reviewer_id=auth.uid();new.reviewed_at=now();
 end if;
 return new;
end; $$;
revoke all on function robotics.robotics_submission_snapshot() from public;
create trigger robotics_submission_snapshot before insert or update on robotics.robotics_submissions for each row execute function robotics.robotics_submission_snapshot();
