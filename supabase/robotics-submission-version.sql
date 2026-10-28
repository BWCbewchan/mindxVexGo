create or replace function robotics.robotics_submission_snapshot() returns trigger language plpgsql security invoker set search_path = '' as $$
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
grant insert(project_revision) on robotics.robotics_submissions to authenticated;
notify pgrst, 'reload schema';
