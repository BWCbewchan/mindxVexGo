# RoboLab competitions implementation plan

**Goal:** Add locally hosted FLL/WRO practice simulations in the independent RoboLab, and remove RoboMakers visual branding from the primary UI.

**Architecture:** Keep existing Assembly/Studio/Simulation untouched. Add a lazy-loaded Gears runtime in a separate iframe with its own storage prefix. Offer a catalog of available upstream FLL/WRO fields through 2026. Label mat-only versus object-based fields accurately; no claim of complete official scoring. Preserve original authors, GPL license and a corresponding-source download. The separate WRO Junior repository has no application license, so it is research only and is not redistributed.

**Tech stack:** Next client wrapper, static Babylon/Ammo/Blockly/Skulpt runtime, Python reproducible import, Playwright verification.

1. Pin Gears c0549600a26f9811906b4e02fd9246fe2413a072. Import required runtime libraries; omit old duplicate library versions and unrelated model packs. Retain original source notices and source ZIP.
2. Generate catalog from mission configurations. Reject future-year entries and missing textures. Expose field type and approximate object count.
3. Add independent catalog/engine selection and runtime readiness messages. Use separate storage namespace and lazy iframe mounting.
4. Remove RoboMakers header logo, title and promotional link from existing RoboLab runtime via reproducible import patches. Move attribution into help/sources.
5. Verify loading, real robot movement, sensor values, multiple FLL/WRO seasons, engine switching, storage isolation, branding, typecheck and encoding. Capture screenshot.

User authorized continuing the isolated RoboLab approach on 2026-11-17. No main merge or push is included.

## Verification

- `scripts/test-robolab-fields.mjs`: all 38 catalog entries loaded into a physics scene with robot meshes and finite color sensor readings; zero page errors or failed HTTP responses.
- `scripts/test-robolab-competitions.mjs`: catalog selection, FLL2020/WRO2026 Junior/FLL2025, Python MoveTank actual movement (~10 cm), host storage canary, distinct Gears storage prefix, switching to original lab, and removed visual RoboMakers logo/title/about button all passed.
- TypeScript check and encoding check passed. No edits to pre-existing Assembly/Studio/Simulation files.
- Independent Gemini review attempted, but CLI returned API authentication 401. No review result is claimed.
- Not verified: full mission scoring, season-rule compliance, real hardware, physical authenticity of every source mission interaction. Catalog explicitly distinguishes mats and object scenes.

## 2026-11-18 follow-up: per-field robots, practice, tools

- `public/robolab/robot-profiles.json`: six mindX robots (FLL, WRO Elementary/Junior/Senior, Future Engineers, Sport) chosen by field id rules; adapter loads it before reset and reports the real port map to the page ("Robot: …" panel).
- `public/robolab/practice.json`: 21 local Gears practice worlds (line following, gyro, sumo, fire rescue, football, maze) under a "Luyện tập" tab. Gears' remote-image challenge pack is not included.
- "Công cụ" menu: Gears robot configurator, world builder and arena, with isolated storage.
- `scripts/patch-robolab-gears-brand.py` (called by the import script): mindX mark/title/favicon on all Gears pages; text credits remain in About and in RoboLab sources.
- Verified: `scripts/test-robolab-field-robots.mjs` (6 profiles load with the expected component count and drive ~15 cm; 6 practice worlds; 3 tools; mindX-only header logo), `test-robolab-competitions.mjs`, `test-robolab-fields.mjs` (38/38), TypeScript. Not verified: mission scoring, how suitable each robot is for every season's real rules.
