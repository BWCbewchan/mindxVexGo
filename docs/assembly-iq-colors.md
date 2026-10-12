# VEX IQ kit appearance — 2026-10-12

The user requested the colors of the VEX IQ 228-7755 kit: https://www.vexrobotics.com/parts/228-7755. Its actual SVG illustrations were inspected in the browser, including connector pins, standoffs, corner connectors, beams, plates, shafts, gears, sprockets, hubs, retainers and common electronics. Colors were read from the rendered SVG styles, not inferred from `2500` CAD IDs. VEX's color/SKU guide explains that `2500` denotes color-independent CAD: https://kb.vex.com/hc/en-us/articles/360044274672-Color-Part-Number-Info-for-VEX-IQ.

The shared `public/assembly/iq/color-profile.js` applies a presentation material before CAD mesh optimization. It does not rewrite STEP or GLB source geometry/materials, move holes, scale parts or change saved projects. The editor, preview renderer and guide use the same colored model. Mixed components are selected by existing CAD component names: motor shaft overmolds are orange/blue/lime for 2x/3x/4x respectively; the metal remains silver. Motor housing/caps and sensor components remain separate materials.

Key corrections include light gray beams, dark gray plates, white corner connectors, blue lock/angle beams and gears, orange sprockets, blue 1x1 pins, gray 1x2 pins, dark gray 2x2/0x3 pins, gray 0x2 pins, orange/green idler pins, black spacers and rubber collars. The 3x capped plastic shaft is medium gray; the 5x is dark gray. Exact palette/source URLs are recorded in `public/assembly/iq/color-manifest.json`.

Coverage after the Parts Library follow-up: 265 CAD entries have presentation mappings, comprising 51 explicit kit matches, 9 supplementary manufacturer mappings and 205 mappings to the same physical family. Family mappings are an inference; they do not assert kit membership. The other 213 entries, including unidentified specialty panels and unmatched first-generation electronics, retain their CAD materials. Unmapped cards have a tooltip stating that their colors have not been matched to kit 228-7755. No unsupported item is relabeled as a second-generation device.

The follow-up found named variants omitted by the original strict rules, including right-angle beams, truss plates and standard weak pin/standoff/corner variants. They now use the corresponding family appearance while retaining their original geometry and variant names. Additional pulley, idler and bushing mappings use VEX's manufacturer-authored parts list: https://www.pltw.org/hubfs/operations/equipment_supplies/eng_bill_of_materials/IED_VEX_IQ_Kit_228-7342_.pdf (pages 1, 3, 4 and 8; source SKUs encode the color). These additional entries are not claimed to belong to 228-7755. For example, the sheet pin remains unassigned because the manufacturer sells it in multiple colors.

All 478 preview files were checked; changed appearances were regenerated. `preview-manifest.json` records each source hash and appearance signature so future color/source changes invalidate its thumbnail.

`preview-revisions.js` records the SHA-256 content revision of each actual PNG. A shared `partPreviewSrc` function adds that revision to IQ image URLs in Parts Library, quick attach, Layers, guide thumbnails and the home card. A changed PNG receives a new URL, avoiding reuse of the previous decoded/cache image. GO image URLs are unchanged.

Verification:

- `node scripts/test-vexiq-colors.mjs` passed using actual GLBs: representative colors, the three two-material motor shafts, split motor housing colors, shared-material isolation, unchanged geometry/poses and source-color preservation. GO remains a separate library and its Red Beam remains unchanged.
- `node scripts/test-vexiq-cad.mjs` passed after the appearance update: all 478 CAD/previews, references, beam–pin–beam mounting, collision review and four-page PDF export. The rendered PDF shows the blue pin and gray beams.
- `python scripts/check-encoding.py`: zero issues.
- `node scripts/test-library-preview-colors.mjs`: passed after the follow-up. All 478 image revisions/signatures matched current PNGs; actual Parts Library pixel checks passed for blue pins/pulleys/angle beams and neutral standoffs/corners/truss/pin variants. Reload and the unmapped tooltip were verified with zero JavaScript errors. The test used an isolated browser context.

Visual inspection artifacts are `artifacts/assembly-iq-colors/kit-colors.png` and `guide-page.png`. Existing reference cables, generation identities, kit quantities and physical fit are outside this color correction.

The actual Parts Library and 3D inspection screenshots are in `artifacts/assembly-library-colors/parts-library.png` and `after.png`.
