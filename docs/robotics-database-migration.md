# Robotics database migration — 2026-11-05

Destination: **buildRobotMindx**, project `dgtzzwgxmzoanayfqabp`.

Application tables remain in the `robotics` schema (select this schema in the
Supabase Table Editor):

| Table | Migrated rows | Purpose |
| --- | ---: | --- |
| `robotics.robotics_projects` | 67 | Authored assembly documents, revisions and thumbnails |
| `robotics.robotics_submissions` | 2 | Published/reviewed model snapshots |
| `robotics_private.robotics_visitors` | 21 | Private browser capability hashes |
| `robotics_private.robotics_reviewers` | 1 | Private approval authorization |

The application admin identity was copied with the existing password hash and
reviewer UUID. Unrelated Auth users, roles and tables were not migrated. Auth
storage is scoped by database; sign in again after switching databases. Existing
browser guest identities and model IDs remain valid.

An app-scoped backup, including schema definitions, is held outside deployment
and Git in `artifacts/private-migration/tps-robotics-2026-11-05.json`.
SHA-256: `baa1fad94508c2adc5b0419d825ff58ff1db1eb36d1ec69fb7407681617b300e`.
The backup includes sensitive identity hashes and must stay private.

Production cutover was verified at https://robotics.tpsmindx.com on deployment
`dpl_2vaqhrxrDx85962z3gEDFoeiLgiU`. Both Production and Preview environment
variables now point to the dedicated project. Deploy with `--archive=tgz` because
the CAD catalogue exceeds Vercel's per-file upload request allowance.

After the production checks, the two Robotics schemas and their functions were
removed from TPS in a guarded transaction. Source fingerprints were checked again
while holding table locks. The shared Auth identity and all 128 existing public
tables were preserved; only `robotics` was removed from Data API exposure.
Historical migration records are retained as an audit trail.

Full-row deterministic source/destination fingerprints matched:

- Projects: `8ae67be91b2be7587c6b358899d63e1f`.
- Submissions: `5490cdc428363611c24e19c88e0b7955`.
- Visitors: `79663064a49d700afe2042c7940b5ea1`.

## Save behavior

Local drafts continue to save during editing. Database checkpoints occur on
opening a project and navigation away from the editor. Explicit library submission
also saves its review snapshot. Editing, idle time, tab visibility changes,
reconnecting, local Save/download and a separate project-list tab do not trigger
database writes. There are no periodic background uploads.
Identical acknowledged documents perform no database requests. Edits use one
revision-checked save RPC; full remote reads are reserved for opening
checks or resolving a revision conflict. Generated guide snapshots and contact
caches are rebuilt instead of being uploaded. Authored guide preferences remain.

Closing a browser is best effort: small hidden-page requests use keepalive;
larger unfinished drafts remain local and recover on the next opening. Offline
or conflicting updates never silently replace another device's revision.

Public library pages cache only approved list metadata for one minute, with
bounded entries and single-flight requests. Private reviewer data is not cached.
Confirmed egress restriction pauses network attempts for five minutes, with an
explicit retry. A new database still has its own usage limits.

## Verification

- `node scripts/test-robotics-cloud-sync.mjs`: compact state, no-op suppression,
  single-RPC updates, conflict and identity protection, quota circuit recovery.
- `node scripts/test-robotics-storage-ui.mjs`: actual migrated public library,
  landing navigation, 100-edit burst, ten minutes idle, multiple tabs, local Save,
  navigation checkpoints and unchanged reopening.
- `node scripts/test-assembly-workspace-navigation.mjs`: cross-kit switching,
  browser Back, valid/invalid imports and local draft preservation.
- `scripts/verify-robotics-migration.mjs`: public/private access, existing admin
  login/reviewer rights, guest ownership, save/read and stale revision rejection.
  Test fixtures are removed through the database administrator connection.
- Production build, TypeScript and UTF-8 checks.

RLS is enabled on all four tables. Private tables intentionally have no direct
client policy. Security advisor also reports that leaked-password protection is
disabled in Auth; enable it in the new project's password security settings:
https://supabase.com/docs/guides/auth/password-security.

## Assembled models only — 2026-11-05

Only documents with an authored joint between two distinct existing parts,
including both connector references, qualify for database storage. Grouping
loose parts does not qualify. Empty and unfinished drafts remain on the device;
clearing a draft never overwrites the last valid server assembly with an empty
document. The same rule is enforced by database constraints on projects and
submissions, covering older clients and direct API writes.

The admin collection was cleaned after backing up 34 non-assemblies: 27 empty,
3 single-part and 4 loose-part drafts. Existing published models were preserved.
Backup: `artifacts/private-migration/unassembled-2026-11-05.json`, SHA-256
`a9cdca4918e845d2efac30e7764b1583eb665d0a589ee3bf361f7d44442a3bdf`.

`node scripts/test-robotics-model-eligibility.mjs` checks client/Postgres parity
and actual constraint rejection of invalid drafts. Live API verification also
checks that guest save rejects empty, single-part and unattached documents.
