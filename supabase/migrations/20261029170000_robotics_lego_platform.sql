-- Extend kit identity only; ownership policies, grants and documents stay intact.
begin;
alter table robotics.robotics_projects drop constraint robotics_projects_platform_check;
alter table robotics.robotics_projects add constraint robotics_projects_platform_check check (platform in ('vexgo','vexiq','lego'));
alter table robotics.robotics_submissions drop constraint robotics_submissions_platform_check;
alter table robotics.robotics_submissions add constraint robotics_submissions_platform_check check (platform in ('vexgo','vexiq','lego'));
commit;
