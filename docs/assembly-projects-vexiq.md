# Assembly Studio projects and VEX IQ — 2026-10-12

`/assembly` is now a project home with a Photoshop-style dark sidebar, new-project dialog, recent projects, search, grid/list views, rename, duplicate and recoverable trash. The editors are `/assembly/vexgo/<id>` and `/assembly/vexiq/<id>`. The editor's logo returns to the project home; New opens the new-project dialog without erasing the current assembly. Import creates a separate project.

Project records and the recent-project index are stored separately in localStorage. GO and IQ have separate keys and asset roots, including overlapping SKUs. Project links open data on this browser; they are not cloud sharing links. Save project exports a JSON backup carrying its platform. A failed metadata write can be recovered by scanning intact project records. Missing or invalid IDs cannot create or overwrite a blank project. Trashed projects cannot be silently edited. The host clears its previous editor API during navigation.

The original `mindx-vexgo-assembly-v1` draft is copied once into a named GO project; its original key is preserved. The user's “test mô hình” project was visibly reopened with all 31 parts at its new GO route, then returned to the home.

## Supplied IQ CAD

Both supplied folders were scanned recursively: 467 mechanical STEP files and 11 control STEP files, totaling 478. All 478 were converted to GLB with their STEP/XCAF materials, original dimensions and Y-up coordinates. The source files were not changed. Duplicate-SKU variants receive distinct asset IDs. Names, source filenames, SHA-256 hashes, bounds and conversion results are recorded in `public/assembly/iq/cad-manifest.json` and each part's `cad.json`. The GLBs total 279,196,488 bytes; models load when used. All 478 preview images were rendered from those GLBs.

The control files include first-generation Robot Brain and sensors; the app does not relabel them as second-generation devices. IQ does not inherit GO's kit quotas or wiring ports. Its editor has category filters for shafts, pins, wheels, gears, retainers and frames/connectors, along with search.

On the user's subsequent request, kit 228-7755 presentation colors were added without rewriting these original GLBs. The editor, library previews and PDF share this appearance layer; see `docs/assembly-iq-colors.md` for sources, explicit/family mappings and preserved off-kit variants.

Analytic cylinders, planar opening wires and opposing planar walls provide 13,088 geometric references across 444 parts. All 47 shaft entries have a square tip reference. Side walls determine square width/key even when tips are rounded; original end planes and shoulders determine insertion limits. The motor output uses its measured square socket, rather than a mounting hole. The shared editor supports move, rotate, grouping, layers, pin/hole attachment, square shaft/socket attachment, history, collision review, the AI API and guide export with the selected library.

34 accessories/control parts do not have an extracted round/square mating reference and currently require manual positioning. Ball joints, tire/hub seating, belts, Brain/battery docking, radio slots, wiring and gear-mesh propagation do not yet have dedicated IQ attachment constraints. Conversion and sampled collision checks do not certify every physical combination. Official 228-7755 per-kit stock presets and project limits are now available; see `docs/assembly-kit-settings.md`. Parts missing from CAD are listed separately, and competition eligibility is not asserted.

To rebuild locally using the existing CAD runtime:

```powershell
python scripts/import-vexiq-cad.py
python scripts/complete-iq-profiles.py
node scripts/preview-vexiq-cad.mjs
```

## Verification

- `npm run typecheck`: passed.
- `node scripts/test-assembly-projects.mjs`: passed for platform isolation, ID validation, recoverable trash, one-time legacy migration, metadata quota recovery and malformed import rejection.
- `node scripts/test-assembly-projects-ui.mjs`: passed for home → IQ creation → actual motor/shaft attachment → reload/autosave → thumbnail → copy/rename/trash/restore → independent GO creation → missing ID → narrow-screen layout; legacy migration also verified on repeated home loads. No JavaScript errors or hydration mismatch in the final run.
- `node scripts/test-vexiq-cad.mjs`: passed for all 478 GLB headers/previews, unique reference IDs, finite normalized geometry, positive depths, every shaft's square tip and actual beam–pin–beam mounting. No body penetration was detected in the test assembly. Its illustrated PDF has one preparation page, two assembly actions and one completed-model page.
- Existing `test-assembly-usability.mjs`, `test-assembly-ai-api.mjs` and `test-joint-constraints.mjs`: passed for GO regressions.
- Browser inspection confirmed the visible project home, 75 GO / 478 IQ entries and the migrated user's 31-part draft.

Screenshots and the IQ test PDF are in `artifacts/assembly-projects/`. These tests ran in isolated browser contexts; they did not add test projects to the user's browser.
