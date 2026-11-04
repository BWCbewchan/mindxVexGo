-- The same structural eligibility rule is used by model-eligibility.ts.
-- A group alone is not a joint. Require two distinct existing parts and an
-- authored attachment with both connector references; loose drafts stay local.
create or replace function robotics.robotics_has_assembled_parts(doc jsonb)
returns boolean language sql immutable security invoker set search_path='' as $$
 select coalesce(case when jsonb_typeof(doc->'parts')='array' then
 jsonb_array_length(doc->'parts')>=2 and exists (
  select 1 from jsonb_array_elements(doc->'parts') p
  join jsonb_array_elements(doc->'parts') q on q->>'id'=p->'mate'->>'target'
  where jsonb_typeof(p->'id')='string' and length(p->>'id')>0
   and jsonb_typeof(q->'id')='string' and q->>'id'<>p->>'id'
   and jsonb_typeof(p->'mate'->'target')='string'
   and jsonb_typeof(p->'mate'->'sourceRef')='string' and length(p->'mate'->>'sourceRef')>0
   and jsonb_typeof(p->'mate'->'targetRef')='string' and length(p->'mate'->>'targetRef')>0
 ) else false end,false);
$$;
revoke all on function robotics.robotics_has_assembled_parts(jsonb) from public;
grant execute on function robotics.robotics_has_assembled_parts(jsonb) to anon,authenticated;

-- Add only after existing non-assemblies have been privately backed up and
-- removed. This protects every write path, including older deployed clients.
alter table robotics.robotics_projects add constraint robotics_projects_assembled_model
 check(robotics.robotics_has_assembled_parts(document));
alter table robotics.robotics_submissions add constraint robotics_submissions_assembled_model
 check(robotics.robotics_has_assembled_parts(document));
