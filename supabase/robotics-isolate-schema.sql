create schema robotics;
revoke all on schema robotics from public;
grant usage on schema robotics to anon,authenticated;
alter table public.robotics_projects set schema robotics;
alter table public.robotics_submissions set schema robotics;
alter function public.robotics_is_reviewer() set schema robotics;
alter function public.robotics_valid_document(jsonb,text) set schema robotics;
alter function public.robotics_project_revision() set schema robotics;
alter function public.robotics_save_project(text,text,text,jsonb,text,integer) set schema robotics;
alter function public.robotics_submission_snapshot() set schema robotics;
create or replace function robotics.robotics_is_reviewer() returns boolean language sql stable security invoker set search_path = '' as $$
 select robotics_private.robotics_is_reviewer();
$$;
create or replace function robotics.robotics_valid_document(doc jsonb,platform text) returns boolean language sql immutable set search_path = '' as $$
 select coalesce(jsonb_typeof(doc)='object' and doc->>'version'='1'
 and (doc->>'platform' is null or doc->>'platform'=platform)
 and jsonb_typeof(doc->'parts')='array'
 and case when jsonb_typeof(doc->'parts')='array' then jsonb_array_length(doc->'parts')<=250 else false end
 and octet_length(doc::text)<=5000000,false);
$$;
create or replace function robotics.robotics_project_revision() returns trigger language plpgsql security invoker set search_path = '' as $$
begin
 if new.owner_id<>old.owner_id or new.platform<>old.platform or new.local_id<>old.local_id then raise exception 'ROBOTICS_IMMUTABLE_IDENTITY'; end if;
 new.revision=old.revision+1; new.updated_at=now(); new.created_at=old.created_at; return new;
end; $$;
create or replace function robotics.robotics_save_project(p_local_id text,p_platform text,p_title text,p_document jsonb,p_thumbnail text,p_expected_revision integer default null)
returns robotics.robotics_projects language plpgsql security invoker set search_path = '' as $$
declare existing robotics.robotics_projects;
begin
 if auth.uid() is null then raise exception 'ROBOTICS_SIGN_IN_REQUIRED'; end if;
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
create or replace function robotics.robotics_submission_snapshot() returns trigger language plpgsql security invoker set search_path = '' as $$
declare p robotics.robotics_projects;
begin
 if tg_op='INSERT' then
  select * into p from robotics.robotics_projects where id=new.project_id and owner_id=auth.uid();
  if not found then raise exception 'ROBOTICS_PROJECT_NOT_OWNED'; end if;
  if jsonb_array_length(p.document->'parts')=0 then raise exception 'ROBOTICS_EMPTY_MODEL'; end if;
  new.owner_id=auth.uid();new.platform=p.platform;new.document=p.document;new.thumbnail=p.thumbnail;new.project_revision=p.revision;
  new.status='pending';new.review_note='';new.reviewer_id=null;new.reviewed_at=null;
 else
  if not robotics_private.robotics_is_reviewer() then raise exception 'ROBOTICS_REVIEWER_REQUIRED'; end if;
  new.reviewer_id=auth.uid();new.reviewed_at=now();
 end if;
 return new;
end; $$;
alter role authenticator set pgrst.db_schemas = 'public, graphql_public, robotics';
notify pgrst, 'reload config';
notify pgrst, 'reload schema';
