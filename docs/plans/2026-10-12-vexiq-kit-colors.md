# VEX IQ kit color correction

User-authorized scope: match the colors shown at https://www.vexrobotics.com/parts/228-7755 in IQ's 3D editor, library previews and build guides. Keep original STEP/GLB geometry, origins, mating references and project poses.

Use a shared presentation layer rather than rewriting source CAD. Store named palette/rules with the official SVG image URLs and evidence level. Explicit kit mappings take precedence over common-family mappings. Unidentified accessories retain source materials. Split metal motor shafts into the silver shaft and colored overmold using actual CAD component names. Electronics use named CAD components; keep first-generation identity where that is the supplied geometry.

1. Inspect the kit's actual SVGs and published VEX color identifiers; record part-specific exceptions (pin sizes, shafts, plates, corners, gears, sprockets).
2. Implement pure color selection plus material-safe application before mesh optimization. Apply exactly the same module to editor and preview renderer.
3. Regenerate previews with appearance signatures; keep model GLBs and connector files unchanged. Record coverage separately from full-kit membership.
4. Test representative colors, shared-material isolation, overmold/housing regions, unchanged transforms/geometry and GO separation. Inspect a colored IQ assembly and its PDF, then refresh the app.
