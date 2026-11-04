# VEX IQ 228-7755 library audit

Checked: 2026-11-04. Source: [VEX IQ (2nd gen) kit contents](https://www.vexrobotics.com/parts/228-7755).

The supplied STEP library contains many IQ accessories and first-generation electronics, not only the 228-7755 education kit. Keep those CAD IDs available in the extension library, but use the canonical kit selection for the default library. Existing models must keep their saved IDs.

## Mapping and counts

`public/assembly/iq/library-reference.js` records 114 preferred CAD IDs matched by the official part names and dimensions, and 1 visible reference-only row (Pin Tool) whose exact CAD has not been imported. The official inventory contains 121 named rows. Six unimported Controller/USB/Smart Cable reference cards are hidden from Parts Library at the user’s request; their official inventory data remains available in kit coverage. These application counts are not a new manufacturer claim about unique molded part types. Alternative CAD revisions, GO-color aliases and duplicate names are omitted from the preferred selection. Their stock continues to use the shared canonical inventory row.

The official page calls a corner connector `2x Wide, 3x2 Corner Connector`; the imported STEP library calls the same dimensional family `2x Wide, 2x3 Corner Connector` (228-2500-137). Preserve the existing CAD label/ID mapping rather than create an extra stock row.

## Quantity correction

The previous preset omitted **Cable Anchor**, although the official page explicitly lists **11** per kit. Its CAD model already exists as **228-2500-158**. This row is now included in the quantity preset and canonical kit library. Do not silently change user-authored custom kit quantities.

The old downloadable kit snapshot has 462 item keys and still reports the 200mm omni wheel as missing. The current library contains 485 CAD entries and includes the added omni wheel, that snapshot has now been regenerated from the shared current preset.

## Wheels to retain

- **228-2536**: 200mm Travel Omni-Directional Wheel, official kit quantity 2.
- **iq-200mm-travel-wheel**: assembled convenience CAD of one 228-2500-1208 44mm hub and one 228-2500-209 200mm tire. It consumes those two existing stock rows and has no independent extra quota.

- **iq-balloon-wheel**: assembled 228-2500-1953 48.5 mm hub and 228-2500-1958 balloon tire. It consumes one of each, with capacity limited by the hub/tire stock. Original tire CAD is reversed axially to seat on the hub. A dedicated `iq-balloon-rim` reference also permits mounting the loose tire onto the loose hub; it cannot mate with ordinary pins or a different wheel rim.

## Optional additional kits

The default project and settings still use one original kit. **+ Thêm kit khác** adds a separate row with its own count: GO/IQ in either direction, or additional LEGO sets. Foreign VEX IDs are namespaced only in mixed projects; CAD/model/preview lookups use their source platform. LEGO stock sums shared part IDs across the configured sets. Removing a kit changes capacity and reports shortages while preserving placed geometry. JSON, AI API, document import and PDF use the same stock/catalog rules. Catalogs load only on explicit addition or reopening a mixed model.

## Gen2 electronics added after source verification

Official product CAD tabs supplied the original STEP models for:

| Part | SKU | Exterior IQ mounting references |
| --- | --- | --- |
| [Robot Brain (2nd generation)](https://www.vexrobotics.com/228-6480.html) | 228-6480 | 16 |
| [Robot Battery (2nd generation)](https://www.vexrobotics.com/228-7045.html) | 228-7045 | 0: latch geometry is not an IQ pin mount |
| [Optical Sensor](https://www.vexrobotics.com/228-7082.html) | 228-7082 | 5 |
| [Distance Sensor (2nd generation)](https://www.vexrobotics.com/228-7106.html) | 228-7106 | 5 |

Each `cad.json` retains the official download URL, STEP hash, GLB hash, original material policy and validation result. Original STEP/XCAF colors and geometry were preserved. Exact CAD bounds were compared against GLB bounds after conversion from millimeters to meters and Z-up to Y-up. The maximum discrepancy was below 0.00001 mm. Mounting references retain only analytic 2.1 mm bores with an unobstructed outward insertion corridor; internal reverse mouths, electrical details and collar surfaces were excluded. These geometric checks are not a physical certification.

New IQ electronics use the Gen2 Brain/Battery companions. Existing projects with a Gen1 Brain keep their Gen1 pair when adding a shared motor/switch. Adding an explicitly Gen2 sensor uses the Gen2 pair. Existing CAD IDs and stored part geometry remain unchanged. Standard kit profiles created before these imports gain the official quantity only when the new SKU is absent; explicit zero/custom quantities remain intact.

## Exact CAD still unverified

Only Pin Tool remains a visible identification card. Controller (2nd generation), 2m USB Cable and Smart Cables of 200/300/400/600mm have been removed from Parts Library at the user’s request. Their label is **Chưa nhập đúng CAD**, which describes application availability rather than claiming the manufacturer has no CAD. The generic **228-2780 Smart Cable (simulated)** remains accessible under extensions/all CAD; it does not establish the four exact cable lengths. The Gen1 Controller must not be presented as a Gen2 model.

Both locally supplied control ZIPs contain the same 11 Gen1 STEP files. A fresh download of the official `https://link.vex.com/cad/STEP/VEX-IQ-All-Control-STEP` archive on 2026-11-04 also contains these 11 models, with matching STEP hashes. The Brain 228-2540, Controller 228-2530, Battery 228-2604, Color Sensor 228-3012 and Distance Sensor 228-3011 are preserved in extensions and cannot consume Gen2 inventory quotas. The current Controller and Smart Cable product pages did not expose a CAD download tab during this audit. This is not evidence that exact models do not exist elsewhere.

Reproduction: run conversion/audit on original STEP first, then `python scripts/register-iq-gen2-cad.py --manifest <audited-manifest.json>` and `node scripts/preview-iq-gen2-cad.mjs` against the local server. Registration only replaces these four explicit SKUs and preserves other catalog records.

## Reference illustrations

Eight original SVG files from the official product page are stored in `public/assembly/iq/reference-previews/`; the four cable-length rows share the official Smart Cables illustration. Each file was retrieved successfully and parsed as SVG XML. The total is 283,868 bytes. `imageSource` on each reference row preserves its exact VEX source URL. These are identification illustrations, not generated CAD.

## Kit coverage currently available

- VEX GO: 269-6911.
- VEX IQ (2nd gen): 228-7755, plus an extension library of other imported IQ CAD.
- LEGO: EV3 Core 45544-1, EV3 Expansion 45560-1, EV3 Home 31313-1, SPIKE Prime 45678-1, SPIKE Prime Expansion 45681-1, SPIKE Essential 45345-1 and Robot Inventor 51515-1.

Validation: `test-iq-gen2-cad.mjs`, `test-iq-gen2-ui.mjs`, `test-library-catalog.mjs`, `test-kit-parts-library-ui.mjs`, `test-kit-policy.mjs`, `test-kit-settings.mjs`, `test-iq-wheel-kit-ui.mjs`, `test-library-drag-drop-ui.mjs`, `test-parts-library-ui.mjs`, TypeScript, encoding and production build. Reference-only parts cannot be added. Kit browsing preserves the current project and stock configuration.
