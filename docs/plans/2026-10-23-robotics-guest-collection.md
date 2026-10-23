# Automatic Assembly collection without sign-in

User direction: Assembly projects must save to TPS even without login. Collect models from every active visitor; admin can inspect and publish reviewed snapshots. Remove the login gate and the misleading cross-device heading for guests.

TPS Auth anonymous sign-ins are disabled. Keep its shared Auth settings unchanged. Use a random per-browser visitor UUID and a 256-bit capability, persisting only the SHA-256 digest on the database. Private definer implementations verify this capability before any guest read/write; exposed wrappers execute as caller. Project rows retain RLS; account-owned projects keep existing permissions. Anonymous visitors cannot browse all saved models or self-publish.

Extend robotics_projects with visitor ownership, exactly one of account or visitor. Retain revision checks and immutable snapshot publication. Add reviewer-only collection/list/read/review RPCs covering guest and account models. Admin's automatic collection tab provides direct preview and approval. Existing pending/approved/rejected workflows remain available.

Client identity adapter selects current account or browser visitor. Automatically save active editor changes; backfill unbound local drafts on the project screen. Never reassign a draft already bound to another identity during automatic collection. Provide clear save/retry state and a short notice that Assembly models are saved for administrator review. Sign-in remains optional for account-based cross-device access.

Verify guest A/B isolation, incorrect secrets, direct table access denial, account isolation, revision conflicts, reviewer access, snapshot approval and public-copy behavior using PGlite and live independent browser contexts. Keep synthetic fixtures separate and remove them after testing. Build, typecheck, UTF-8 and relevant existing cloud regressions must pass.
