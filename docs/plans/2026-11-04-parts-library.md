# Kit-based Parts Library implementation plan

Goal: make the dark parts library a reliable, searchable view of the official IQ 228-7755 kit, preserve improved wheels and all existing CAD, and expose every supported GO/IQ/LEGO kit.

Architecture: a pure catalog view separates physical-kit membership from project stock enforcement. The browser library groups canonical kit parts by function, with separate expansion/all-CAD views and disabled reference cards for missing CAD. Existing project IDs, models, connectors, colors, quotas and drag/drop remain intact.

1. Audit the official IQ kit against canonical CAD IDs. Preserve both improved wheel assets; keep older electronics and duplicate CAD in expansion. Correct Cable Anchor stock and refresh the exported kit snapshot.
2. Add a pure library catalog module: natural ordering, functional groups, kit scopes, accent-insensitive search, stock aliases and reference-only missing CAD.
3. Add the compact dark library controller: all supported kits selector, scope chips, functional category filter, grouped cards, clear counts, missing-CAD references and a source link. Foreign-platform kits open a new-project flow after saving; browsing never changes project inventory.
4. Wire existing card creation, drag/drop and quota logic to the new controller. Preserve the search/category IDs and background-free thumbnails.
5. Validate canonical membership/coverage, improved wheel visibility, aliases/legacy separation, all seven LEGO scopes, search/category behavior, unchanged quota enforcement, click/drag/drop and cross-kit navigation. Inspect screenshots; run encoding, typecheck and production build.

Source: https://www.vexrobotics.com/parts/228-7755 (checked 2026-11-04). Physical quantity and CAD availability are distinct; never substitute a gen1 Brain for gen2.
