# Assembly guide export

## Reference reviewed

VEX Robotics, Motorized Super Car build instructions:
https://education.vex.com/stemlabs/sites/default/files/inline-files/BI%20Motorized%20Super%20Car%20%281%29.pdf

Pages 3–20 visually inspected on 2026-10-11. Relevant patterns: a small parts/count panel,
exploded assembly plus seated result, visible attachment features, new-part outlines,
and wheel insertion before a shaft collar (page 12). The supplied PREB lesson 2 build
pages 3–8 were also visually compared for the mindX header and uncluttered diagrams.
Original illustrations are references, not copied into the user's export.

## Planning rules

- Editing parent/child direction does not define physical assembly order.
- Validate the joint graph before deriving a guide. Retain the disconnected/cycle gates.
- Re-root drive/retainer assemblies on the motor or structural receiving component.
- Reorient joint records only in guide clones, never modify the saved source model.
- Schedule an attachment only after its receiving component is in the cumulative state.
- For a shared square-shaft end, add inner members (larger saved insertion depth) first.
  These are precedence constraints, not a non-transitive sorting comparator.
- Fit supports and hubs before shaft collars. A retainer is not the starting platform.
- Do not turn an editing twist value into an invented physical rotation instruction.
- Keep authentic CAD shapes, positions and all physical components.
- A saved joint graph cannot certify insertion access, torque, cable routing or stability.
  Collision checks are geometric assistance, not physical testing.

## Print rules

- One preparation page, then real cumulative assembly actions. No decorative filler pages.
- A dedicated fixed-resolution renderer, independent of editor dimensions and camera.
- Stable overview direction; projected centering and fit for each cumulative state.
- Original CAD colors, moderate even lighting and subtle technical edges for white parts.
- Red technical outlines identify the added piece without repainting its surfaces.
- A large cumulative image, new-piece thumbnails/counts, and a joint close-up with an
  insertion arrow. The close-up explicitly labels its exploded state.
- Motor close-ups frame mounting features instead of letting the CAD cable dominate.
  The overview preserves the whole cable.
- Explicit print selectors for logo dimensions; the earlier generic image rule stretched
  the logo across its header and caused the apparent page alignment defect.
- Dispose the dedicated renderer and restore the complete model and editor camera.

## Regression evidence

`node scripts/test-auto-build-guide.mjs`

`node scripts/test-guide-sequence.mjs`

`node scripts/test-guide-print.mjs "C:/Users/admin/Downloads/VEXGO-assembly (5).json"`

The print regression checks retainer order, all final parts, cumulative dependencies,
source preservation, JavaScript errors, print overflow/logo alignment, and identical
overview images at 1500×1000 and 1000×760 editor dimensions. Render and visually inspect
every PDF page after changes; assertions alone do not establish a readable guide.
