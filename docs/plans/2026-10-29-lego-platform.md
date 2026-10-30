# LEGO Assembly Implementation Plan

> Execution: implement and verify the tasks sequentially in this existing workspace; preserve the uncommitted IQ guide fix.

**Goal:** Add LEGO alongside VEX GO and VEX IQ, with every LEGO kit supplied by the requested source, native editing and project persistence.

**Architecture:** Import only licensed LDraw data and factual kit indexes from upstream revision e356c113402e49df7f5c4b477172611a1b62a8c8. Convert all 329 LEGO CAD roots to local GLBs and previews, retaining all recursive dependencies and attribution. Extend the shared editor platform registry, adapt LDraw units/connector families, and keep the two VEX platforms unchanged.

**Tech Stack:** Next.js, React, existing Three.js assembly editor, Three LDrawLoader / GLTFExporter, Python data extraction, Supabase cloud project schema.

## Approved design

The user explicitly selected a third LEGO option next to VEX GO and VEX IQ. The LEGO project creation dialog selects EV3 Core/Expansion/Home, SPIKE Prime/Expansion/Essential or Robot Inventor. Projects use /assembly/lego/<id>, the current layers/history/transform/save UI and kit settings. Kit quantities are labeled as upstream data; they are not represented as verified factory/color inventory. Snap geometry must use 0.4 mm per LDraw unit and a distinct cross axle/stud profile, not VEX square shafts.

## Tasks

1. Clone and pin upstream, extract bundle/index/connection facts without executing upstream JS. Check every root and recursive dependency, preserve authors/licenses, output a portable source archive.
   Files: scripts/import-mindstorms-library.py; public/assembly/lego/{ldraw,parts-index.json,kits.json,kits,connectors-ldraw.json,source-manifest.json,ATTRIBUTION.md,CAreadme.txt}.
2. Convert every root with the installed LDrawLoader to GLB in meters; generate bounds and native catalog. Translate connector centers to entrance/end references and keep studs/cross axles distinct. Generate color-aware previews from actual meshes.
   Files: scripts/build-lego-cad.mjs; public/assembly/lego/parts/*; parts.json; connectors.json; metadata.js.
3. Extend project validation/platform metadata and assembly home/create dialog. Reuse common editor; select the 7 kits and persist kit identity. Update thumbnails, stock policy, kit settings and source notice.
   Files: public/assembly/{platform.js,project-store.js,project-store.d.ts,kit-policy.js,part-preview.js,editor.js}; app/assembly/{assembly-home.tsx,assembly-home.module.css,assembly-client.tsx,kit-settings/page.tsx}.
4. Add cross axle / stud compatibility, keyed alignment, conservative default insertion depths. Test real beam-pin-beam, axle-hub and brick-stud CAD cases. Do not enable unverified guide rules by presenting a GO sequence as a LEGO guide.
   Files: public/assembly/{connector-policy.js,mating.js,guide-sequence.js}; LEGO connector adaptation and regression scripts.
5. Extend cloud/library validation and additive database platform constraints without changing ownership policies or existing data. Provide a migration and apply to the configured robotics database if access is available.
   Files: lib/robotics/*; app/components/robotics/*; supabase/migrations/*.
6. Verify all 329 GLBs/previews/dependencies, 7 kit quotas, project create/open/import/save/duplicate, platform isolation and real mating fixtures. Run VEX regressions, typecheck, encoding and production build. Open the integrated LEGO UI and retain screenshots of actual results.

## Evidence / constraints

Source has 337 types: 329 LEGO and 8 optional non-LEGO electronics. 7 LEGO kit indexes and 1437 library files have no missing dependencies. 288 LEGO types have source connection data; this is not proof all inferred ports are real. Use the original CAD for verification and do not invent connector support for parts without references. Upstream application has no general LICENSE file; its UI/bundled application code is not copied into this application.
