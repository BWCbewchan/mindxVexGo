drop function robotics.robotics_save_project(text,text,text,jsonb,text,integer);
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
notify pgrst, 'reload schema';
