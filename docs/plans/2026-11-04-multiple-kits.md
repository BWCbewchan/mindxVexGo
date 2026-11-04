# Optional additional kits and balloon wheel

**Goal:** Keep one-kit defaults unchanged. Add other kits only through an explicit button in settings. Permit GO/IQ additions in either direction and combine LEGO sets. Add the pictured 48.5 mm hub + balloon tire as a reusable wheel.

**Architecture:** Extend the existing version-1 profile with optional additional kit rows, each with its own platform, kit ID, count and stock. Preserve legacy IDs; namespace foreign VEX catalog IDs to prevent GO/IQ collisions. Load other catalogs only when requested or reopening a mixed project. Resolve CAD, thumbnails and mating references by the part's source platform. LEGO quantities aggregate shared IDs across sets. Existing placed parts survive removal of kit stock.

**Validation:** Unit checks for totals, aliases/composites, invalid combinations, old profile migration and persistence. Browser checks for untouched defaults, add/cancel/apply/remove, stock exhaustion, GO/IQ both directions, mixed LEGO stock, save/reload, actual CAD/connector rendering and guide export. Run typecheck, encoding and production build.

## Work

1. Compose the original 1953 hub and 1958 tire; verify centers, scale and shaft references. Register a derived wheel with shared component stock and a preview.
2. Add source-ID/catalog helpers and optional additional profile rows. Validate stock provenance and maintain one-kit results.
3. Add an optional kit-row editor in settings; preview totals and shortages before applying. Cancellation must preserve the project.
4. Load source CAD/reference libraries lazily. Integrate additions into Parts Library, Quick Attach, API, collision checks and PDF thumbnails.
5. Exercise regressions and new behavior in isolated browser projects. Keep the local app running for review.
