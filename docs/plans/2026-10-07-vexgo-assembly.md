# VEX GO Assembly Implementation Plan

**Goal:** Build a local-first CAD assembly editor and cumulative illustrated student instructions at /assembly.

**Architecture:** Next.js page hosts a self-contained same-origin Three.js editor. Original CAD GLBs and thumbnails are copied from the verified reference library; no geometry is generated. Project JSON stores millimetre transforms, step snapshots and cameras. Printable HTML captures each step and can be saved as PDF by the browser.

**Tech Stack:** Next.js, Three.js GLTFLoader, OrbitControls, TransformControls, browser localStorage and print.

Approved by user on 2026-10-07. Execute in the current session; preserve unrelated changes and do not push.

1. Package original GLBs, thumbnails, a compact source manifest and local Three.js modules with scripts/prepare-assembly.mjs.
2. Add /assembly and public/assembly editor with part search, transforms, selection, undo/redo, bounds warnings and keyboard controls.
3. Add explicit cumulative step snapshots, camera recording, playback, order controls and new-part highlighting. Historical snapshots remain independent of edits.
4. Implement safe project import/export, local draft recovery, custom confirmation dialog and illustrated printable instructions with per-step parts lists.
5. Verify asset coverage, imports, transform controls, save/reload, step export, keyboard behaviour and typecheck. Review remaining limitations: AABB intersections are conservative and connector mating is not certified.
