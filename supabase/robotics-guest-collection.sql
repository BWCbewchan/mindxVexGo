-- Per-browser capabilities allow automatic collection without changing TPS Auth.
create table robotics_private.robotics_visitors (
 id uuid primary key, secret_hash text not null check(length(secret_hash)=64),
 created_at timestamptz not null default now()
);
alter table robotics_private.robotics_visitors enable row level security;
revoke all on robotics_private.robotics_visitors from public,anon,authenticated;
alter table robotics.robotics_projects alter column owner_id drop not null;
alter table robotics.robotics_projects add column visitor_id uuid references robotics_private.robotics_visitors(id) on delete cascade;
alter table robotics.robotics_projects add constraint robotics_project_identity check((owner_id is not null)::integer+(visitor_id is not null)::integer=1);
create unique index robotics_projects_visitor_local on robotics.robotics_projects(visitor_id,platform,local_id);
create index robotics_projects_collected on robotics.robotics_projects(updated_at desc);
alter table robotics.robotics_submissions alter column owner_id drop not null;

create or replace function robotics.robotics_project_revision() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if new.owner_id is distinct from old.owner_id or new.visitor_id is distinct from old.visitor_id or new.platform<>old.platform or new.local_id<>old.local_id then raise exception 'ROBOTICS_IMMUTABLE_IDENTITY'; end if;
 new.revision=old.revision+1;new.updated_at=now();new.created_at=old.created_at;return new;
end; $$;

create function robotics_private.robotics_guest_identity(p_device uuid,p_secret text,p_create boolean default false) returns uuid
language plpgsql security definer set search_path='' as $$
declare hashed text;
begin
 if p_device is null or p_secret is null or p_secret !~ '^[a-f0-9]{64}$' then raise exception 'ROBOTICS_GUEST_DENIED'; end if;
 hashed=encode(sha256(convert_to(p_secret,'UTF8')),'hex');
 if p_create then insert into robotics_private.robotics_visitors(id,secret_hash) values(p_device,hashed) on conflict(id) do nothing; end if;
 if not exists(select 1 from robotics_private.robotics_visitors where id=p_device and secret_hash=hashed) then raise exception 'ROBOTICS_GUEST_DENIED'; end if;
 return p_device;
end; $$;
revoke all on function robotics_private.robotics_guest_identity(uuid,text,boolean) from public,anon,authenticated;

create function robotics_private.robotics_guest_save(p_device uuid,p_secret text,p_local_id text,p_platform text,p_title text,p_document jsonb,p_thumbnail text,p_expected_revision integer default null)
returns robotics.robotics_projects language plpgsql security definer set search_path='' as $$
declare visitor uuid;existing robotics.robotics_projects;
begin
 visitor=robotics_private.robotics_guest_identity(p_device,p_secret,true);
 perform pg_advisory_xact_lock(hashtextextended(visitor::text||p_platform||p_local_id,0));
 select * into existing from robotics.robotics_projects where visitor_id=visitor and platform=p_platform and local_id=p_local_id for update;
 if found then
  if p_expected_revision is null or p_expected_revision<>existing.revision then raise exception 'ROBOTICS_CONFLICT'; end if;
  update robotics.robotics_projects set title=p_title,document=p_document,thumbnail=p_thumbnail where id=existing.id returning * into existing;
 else
  if p_expected_revision is not null then raise exception 'ROBOTICS_CONFLICT'; end if;
  if (select count(*) from robotics.robotics_projects where visitor_id=visitor)>=200 then raise exception 'ROBOTICS_GUEST_LIMIT'; end if;
  insert into robotics.robotics_projects(visitor_id,local_id,platform,title,document,thumbnail) values(visitor,p_local_id,p_platform,p_title,p_document,p_thumbnail) returning * into existing;
 end if;
 return existing;
end; $$;
create function robotics.robotics_guest_save(p_device uuid,p_secret text,p_local_id text,p_platform text,p_title text,p_document jsonb,p_thumbnail text,p_expected_revision integer default null)
returns robotics.robotics_projects language sql security invoker set search_path='' as $$select robotics_private.robotics_guest_save(p_device,p_secret,p_local_id,p_platform,p_title,p_document,p_thumbnail,p_expected_revision);$$;

create function robotics_private.robotics_guest_projects(p_device uuid,p_secret text,p_page integer default 0) returns jsonb
language plpgsql security definer set search_path='' as $$
declare visitor uuid;result jsonb;
begin
 visitor=robotics_private.robotics_guest_identity(p_device,p_secret,true);
 select coalesce(jsonb_agg(to_jsonb(p)-'document'),'[]'::jsonb) into result from (select * from robotics.robotics_projects where visitor_id=visitor order by updated_at desc limit 12 offset least(100000,greatest(0,coalesce(p_page,0)))*12) p;
 return result;
end; $$;
create function robotics.robotics_guest_projects(p_device uuid,p_secret text,p_page integer default 0) returns jsonb language sql security invoker set search_path='' as $$select robotics_private.robotics_guest_projects(p_device,p_secret,p_page);$$;

create function robotics_private.robotics_guest_project(p_device uuid,p_secret text,p_id uuid default null,p_platform text default null,p_local_id text default null) returns jsonb
language plpgsql security definer set search_path='' as $$
declare visitor uuid;result jsonb;
begin
 visitor=robotics_private.robotics_guest_identity(p_device,p_secret,true);
 select to_jsonb(p) into result from robotics.robotics_projects p where visitor_id=visitor and (p_id is not null and id=p_id or p_id is null and platform=p_platform and local_id=p_local_id);
 return result;
end; $$;
create function robotics.robotics_guest_project(p_device uuid,p_secret text,p_id uuid default null,p_platform text default null,p_local_id text default null) returns jsonb language sql security invoker set search_path='' as $$select robotics_private.robotics_guest_project(p_device,p_secret,p_id,p_platform,p_local_id);$$;

-- Only our capability/reviewer-checked private functions execute as the table owner.
-- Direct client inserts retain the account ownership check and existing RLS.
create or replace function robotics.robotics_submission_snapshot() returns trigger language plpgsql security invoker set search_path='' as $$
declare p robotics.robotics_projects;
begin
 if tg_op='INSERT' then
  if current_user=pg_get_userbyid((select relowner from pg_catalog.pg_class where oid='robotics.robotics_submissions'::regclass)) then
   select * into p from robotics.robotics_projects where id=new.project_id;
  else
   select * into p from robotics.robotics_projects where id=new.project_id and owner_id=auth.uid();
  end if;
  if not found then raise exception 'ROBOTICS_PROJECT_NOT_OWNED'; end if;
  if new.project_revision is null or new.project_revision<>p.revision then raise exception 'ROBOTICS_CONFLICT'; end if;
  if jsonb_array_length(p.document->'parts')=0 then raise exception 'ROBOTICS_EMPTY_MODEL'; end if;
  new.owner_id=p.owner_id;new.platform=p.platform;new.document=p.document;new.thumbnail=p.thumbnail;new.project_revision=p.revision;
  new.status='pending';new.review_note='';new.reviewer_id=null;new.reviewed_at=null;
 else
  if not robotics_private.robotics_is_reviewer() then raise exception 'ROBOTICS_REVIEWER_REQUIRED'; end if;
  new.reviewer_id=auth.uid();new.reviewed_at=now();
 end if;
 return new;
end; $$;

create function robotics_private.robotics_guest_submit(p_device uuid,p_secret text,p_id uuid,p_revision integer,p_description text) returns uuid
language plpgsql security definer set search_path='' as $$
declare visitor uuid;p robotics.robotics_projects;result uuid;
begin
 visitor=robotics_private.robotics_guest_identity(p_device,p_secret);
 select * into p from robotics.robotics_projects where id=p_id and visitor_id=visitor;
 if not found then raise exception 'ROBOTICS_GUEST_DENIED'; end if;
 insert into robotics.robotics_submissions(project_id,project_revision,title,description,author_name) values(p.id,p_revision,p.title,p_description,'Khách lắp ráp') returning id into result;
 return result;
end; $$;
create function robotics.robotics_guest_submit(p_device uuid,p_secret text,p_id uuid,p_revision integer,p_description text) returns uuid language sql security invoker set search_path='' as $$select robotics_private.robotics_guest_submit(p_device,p_secret,p_id,p_revision,p_description);$$;

create function robotics_private.robotics_guest_submissions(p_device uuid,p_secret text) returns jsonb language plpgsql security definer set search_path='' as $$
declare visitor uuid;result jsonb;
begin
 visitor=robotics_private.robotics_guest_identity(p_device,p_secret,true);
 select coalesce(jsonb_agg(to_jsonb(s)-'document'),'[]'::jsonb) into result from (select s.* from robotics.robotics_submissions s join robotics.robotics_projects p on p.id=s.project_id where p.visitor_id=visitor order by s.created_at desc limit 30) s;
 return result;
end; $$;
create function robotics.robotics_guest_submissions(p_device uuid,p_secret text) returns jsonb language sql security invoker set search_path='' as $$select robotics_private.robotics_guest_submissions(p_device,p_secret);$$;

create function robotics_private.robotics_collected_projects(p_page integer default 0) returns jsonb language plpgsql security definer set search_path='' as $$
declare result jsonb;
begin
 if not robotics_private.robotics_is_reviewer() then raise exception 'ROBOTICS_REVIEWER_REQUIRED'; end if;
 select coalesce(jsonb_agg(to_jsonb(p)),'[]'::jsonb) into result from (
  select p.id,p.owner_id,p.visitor_id,p.local_id,p.platform,p.title,p.thumbnail,p.revision,p.updated_at,jsonb_array_length(p.document->'parts') as part_count,
   (select s.status from robotics.robotics_submissions s where s.project_id=p.id and s.project_revision=p.revision) as review_status
  from robotics.robotics_projects p order by p.updated_at desc limit 24 offset least(100000,greatest(0,coalesce(p_page,0)))*24
 ) p;return result;
end; $$;
create function robotics.robotics_collected_projects(p_page integer default 0) returns jsonb language sql security invoker set search_path='' as $$select robotics_private.robotics_collected_projects(p_page);$$;
create function robotics_private.robotics_collected_project(p_id uuid) returns robotics.robotics_projects language plpgsql security definer set search_path='' as $$
declare result robotics.robotics_projects;
begin
 if not robotics_private.robotics_is_reviewer() then raise exception 'ROBOTICS_REVIEWER_REQUIRED'; end if;
 select * into result from robotics.robotics_projects where id=p_id;return result;
end; $$;
create function robotics.robotics_collected_project(p_id uuid) returns robotics.robotics_projects language sql security invoker set search_path='' as $$select robotics_private.robotics_collected_project(p_id);$$;
create function robotics_private.robotics_review_collected(p_id uuid,p_revision integer,p_decision text,p_note text default '') returns uuid language plpgsql security definer set search_path='' as $$
declare p robotics.robotics_projects;result uuid;
begin
 if not robotics_private.robotics_is_reviewer() then raise exception 'ROBOTICS_REVIEWER_REQUIRED'; end if;
 if p_decision is null or p_decision not in ('approved','rejected') then raise exception 'ROBOTICS_INVALID_REVIEW'; end if;
 select * into p from robotics.robotics_projects where id=p_id for update;
 if not found or p_revision is null or p.revision<>p_revision then raise exception 'ROBOTICS_CONFLICT'; end if;
 select id into result from robotics.robotics_submissions where project_id=p_id and project_revision=p_revision;
 if result is null then
  insert into robotics.robotics_submissions(project_id,project_revision,title,description,author_name) values(p.id,p_revision,p.title,'Mô hình được lưu tự động từ Assembly.',case when p.visitor_id is not null then 'Khách lắp ráp' else 'Nhà thiết kế' end) returning id into result;
 end if;
 update robotics.robotics_submissions set status=p_decision,review_note=coalesce(p_note,'') where id=result;
 return result;
end; $$;
create function robotics.robotics_review_collected(p_id uuid,p_revision integer,p_decision text,p_note text default '') returns uuid language sql security invoker set search_path='' as $$select robotics_private.robotics_review_collected(p_id,p_revision,p_decision,p_note);$$;

-- Explicit grants, never default PUBLIC execution on privileged implementations.
do $$declare f record;begin
 for f in select n.nspname,p.proname,pg_get_function_identity_arguments(p.oid) as args from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname in ('robotics','robotics_private') and p.proname in ('robotics_guest_save','robotics_guest_projects','robotics_guest_project','robotics_guest_submit','robotics_guest_submissions','robotics_collected_projects','robotics_collected_project','robotics_review_collected') loop
  execute format('revoke all on function %I.%I(%s) from public,anon,authenticated',f.nspname,f.proname,f.args);
  execute format('grant execute on function %I.%I(%s) to authenticated',f.nspname,f.proname,f.args);
  if f.proname like 'robotics_guest_%' then execute format('grant execute on function %I.%I(%s) to anon',f.nspname,f.proname,f.args);end if;
 end loop;
end; $$;
