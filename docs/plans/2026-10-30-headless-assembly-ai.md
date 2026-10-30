# Assembly headless / AI JSON implementation plan

**Goal:** Keep the editor usable without WebGL, expose a queued `window.assemblyAPI`, provide atomic model/batch JSON input in Help, and open a persistent guest VEX GO workspace at `/assembly`.

**Design approved by the supplied request:** `/assembly` becomes the guest workspace; retain the existing project manager at `/assembly/projects`. Preserve all GO/IQ/LEGO projects and the original `mindxAssembly` API/MCP commands. The existing GPU editor continues to run normally. Without a GPU, Three.js math and CAD loading/collision checks still run on the CPU; a DOM data view replaces the rendered canvas. State normalization and attachment operations live in a pure module shared by the facade and JSON panel, not in the renderer adapter.

1. Add a pure document normalizer supporting project JSON, AI part aliases, attachTo, groups and explicitly supported JSON command batches. Reject invalid parts, ports, cycles, nonfinite coordinates, duplicate IDs and invalid groups before commit. Append remaps imported IDs while retaining existing objects; all writes use the current editor transaction/history/stock/collision checks.
2. Install a minimal facade before the editor module starts. Its ready promise queues listParts/getState/loadJSON/addPart/clear calls until catalog/controller readiness, including same-origin iframe hosts. No code evaluation or login dependency.
3. Add a non-WebGL renderer adapter and accessible DOM state table. Preserve menus, library, inspector, layers and guide. Export a clearly labeled data guide when a GPU image cannot be rendered; never pretend it is a rendered 3D guide.
4. Extend Help → AI / API & MCP with a live catalog/port table, a real CAD-checked few-shot example, the requested textarea/button IDs and explicit success/error status. Keep the existing command workbench and MCP pairing flow.
5. Add the default guest workspace and move the project manager. Update navigation/help links and same-origin facade cleanup on project changes.
6. Test pure normalization and append rollback, every requested facade operation, all exact DOM IDs, a GPU-disabled browser with both missing and failing WebGL contexts, attachment and stock failures without state loss, persistence/undo, and the existing WebGL/LEGO/IQ tests. Typecheck, encoding check, syntax checks and production build must pass. Write edited files atomically after the previous interrupted-write incident.

**Mechanical evidence:** Read part IDs and port definitions from the actual catalog, not invented examples. Validate the plate/pin/shaft/wheel few-shot with actual GLBs and collision checks. Any complete car example must carry its actual CAD validation and physical-test limitations.
