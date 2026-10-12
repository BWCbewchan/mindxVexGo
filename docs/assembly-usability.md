# Assembly usability improvements — 2026-10-12

- Properties shows actual seated holes, pin/shaft ends and insertion depths. Secondary contacts are derived from compatible original CAD features and saved in `project.connections`; they supplement rather than replace the primary editing tree. Moving a feature away invalidates its derived contact.
- Mechanical review identifies stale primary mates, separated geometric components, unsupported electronics, missing outer retainers and shallow wheel engagement. These checks are geometric, not physical certification.
- Fit review separates sampled body penetration from expected connector contacts.
- Layers supports search, instance suffixes, custom names, nested folders, cycle-safe drag grouping, inherited locks/visibility and undo.
- The view menu provides six directions, orthographic projection, selection framing, reversible transparency and isolation. Narrow screens use a bottom Inspector sheet.
- Kit inventory records used/available quantities from VEX GO 269-6911 (checked 2026-10-12). Unverified CAD mappings show `?`. Gray Wheel CAD assemblies consume additional physical tires.
- Guide actions allow title/note editing, camera presets and dependency-safe movement with buttons or drag. Cumulative states are rebuilt from actions. Pins/supports must precede receiving pieces; outer shaft retainers must follow inner members. Preferences persist in saved projects and undo.
- Selected square-drive stacks can be inspected at seven angles from 0 to 90 degrees, with sampled collision checks and full restoration. Multi-motor shared-drive ambiguity, gear-mesh propagation, loads and friction are not simulated.
- PDF rendering reuses CAD meshes and edge geometry, excludes annotation lines from body ray tests, pauses the editor renderer while exporting/printing and keeps final-model fit validation. Per-step poses must exactly match the checked final assembly. The overview can use a chosen direction while the detail chooses a joint-facing view.

## Verification

`node scripts/test-assembly-usability.mjs` passed: four-pin matching, stale contact removal, real-car retention, nested group locks/visibility, guide dependencies and wording, kit inventory and reversible poses.

`node scripts/test-assembly-ai-api.mjs` passed for existing API reads, validation, attachment, cycle rejection, locked children, undo/redo, collision rollback, command serialization and electronics.

`node scripts/test-joint-constraints.mjs` passed for nearest-hole correction, axial depth, target motion and orientation.

`node scripts/test-assembly-usability-ui.mjs` passed: new review/inventory reads, Layers search, reversible rotation, orthographic view, persisted guide edits, PDF export, narrow layout and no browser JavaScript errors. The 54-instance original car generated 31 assembly actions, one preparation page and a completed-model page; test export and PDF generation took approximately 74 seconds.

The older `test-assembly-guide.mjs` uses a pre-menu export locator and failed because that control is hidden in File; the current guide flow was verified with the dedicated UI test above. Gemini advisory review was attempted, but its CLI refused the untrusted workspace. No trust setting was bypassed.

PDF and inspection images: `artifacts/assembly-usability/`. Physical hardware operation remains untested.
