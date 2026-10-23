# Robotics cloud library implementation

User-authorized scope: store Assembly projects across devices in TPS; all new tables/functions prefixed robotics_; public library /library; reviewer workflow /admin/library; public landing describes all features except administration.

Architecture: Supabase Auth browser client, separate robotics database schema and robotics_private reviewer membership. Owner-only projects with compare-and-swap revisions; immutable submission snapshots; public reads only approved submissions. Supabase publishable key in public env, no privileged key in client. Existing TPS public-schema permissions remain untouched. RPCs execute with caller permissions; only protected reviewer boolean helper uses an audited definer.

Implementation: auth/account UI with username alias support; cloud autosave from Assembly save events; offline local saves retained; cross-device restore preserves divergent local copy; cloud project list and submission feedback; reviewer 3D inspection and approval/rejection; public model preview and copy; seven-feature landing and learning workflow.

Verification: PostgreSQL policy/trigger/CAS tests using PGlite, real Supabase REST/auth tests, independent browser contexts for cross-device and publication, UI empty/error/permission states, production build, UTF-8 scan. Independent reviewer checks new code. No unrelated TPS data changes; no commit/push requested.
