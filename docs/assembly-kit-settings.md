# Project kit settings

Official stock sources checked on 2026-10-22:

- VEX GO 269-6911: https://www.vexrobotics.com/parts/269-6911
- VEX IQ (2nd gen) 228-7755: https://www.vexrobotics.com/parts/228-7755

`public/assembly/kit-presets.js` records the per-kit quantities. `kit-policy.js` maps the physical stock to the actual CAD catalogue, merges documented CAD variants into a shared stock pool and validates imported profiles. Off-kit CAD items have zero stock in the standard preset. The settings window separately lists official items with no corresponding CAD, including second-generation IQ electronics. It does not substitute first-generation devices or assign GO stock counts to IQ.

New projects select a kit count and start with the matching standard preset, with enforcement enabled. Existing projects retain their parts and show an unconfigured kit badge until configured. File → Cài đặt bộ kit opens a React settings form with search, per-kit quantities, kit count, usage and remaining stock. File → Import bộ kit accepts JSON profiles or CSV files with `sku,quantity` columns; quantities are per kit. Imports open an editable preview before applying. JSON export produces a reusable inventory profile.

Stock is project metadata: local saves, JSON project backups, open/import, project duplication, Undo and Redo retain it. Changing limits never deletes model parts. Existing excess items are highlighted and can be removed. Further consumption of an exhausted stock pool is blocked through the Library, Quick Attach, whole-group duplication, Alt-drag and the AI API. An unrelated stock item may still be added while correcting a pre-existing excess. Strict guide export stops when the model requires more than the configured kit.

GO Gray Wheel CAD includes a tire, so using one also consumes one physical tire. Hidden or locked parts still consume stock. GO Gray Disk CAD is not automatically assigned the quotas of the differently colored kit disks. IQ weak-pin CAD variants share the corresponding physical pin inventory. Unknown CAD mappings remain at zero until explicitly configured by the user.

Quantities are taken from the kit-content statements, not replacement-pack sizes.

Verification commands:

```
node scripts/test-kit-policy.mjs
node scripts/test-kit-settings.mjs
node scripts/test-assembly-group-actions.mjs
node scripts/test-assembly-ai-api.mjs
node node_modules/typescript/bin/tsc --noEmit
python -X utf8 scripts/check-encoding.py
```
