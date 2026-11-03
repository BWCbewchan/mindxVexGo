# LEGO snap, live guide and interchange implementation plan

**Goal:** Implement the five improvements approved in the user's feature table.

**Architecture:** Keep data transforms independent of the editor. Reuse the existing guide planner and print renderer for previews/PDF/ZIP, with saved per-step camera directions. Use native LDraw matrices and explicit supported-part validation; never approximate unsupported geometry silently.

**Tasks:**
1. Add `snap-settings.js`: LEGO stud/half-stud/plate presets, project persistence, gizmo and surface-drag integration. Test rounding, negative coordinates and legacy defaults.
2. Add `ldraw-model.js`: parse LDR/embedded MPD submodels, matrix/unit/axis conversion, per-instance colors, export. Reject unknown parts, malformed/nonrigid matrices, recursive submodels and excessive inputs atomically. Test matrix round trips and real CAD poses against the official LDraw specification.
3. Extend `guide-editing.js`/`guide-renderer.js`: validate and preserve custom direction/up; fit the whole model regardless of camera angle. Add lazy cancellable preview cards without changing editor scene/camera. Test persistence, stale-result cancellation and rendered images.
4. Enable LEGO automatic connected-part guides through the existing contact/path planner. Retain CAD insertion-path checks and fail visibly for unsupported sequences. Verify a real beam/pin assembly and legacy IQ/GO.
5. Add self-contained ZIP writer and offline guide HTML/PNG/JSON (LDR for LEGO). Reuse PDF scene generation, including prep and completed-model pages. Verify CRC/file contents with an independent ZIP reader and open offline HTML without requests.
6. Add File controls, Guide controls, Help and API export format docs. Run units, actual GLB/browser tests, typecheck, encoding check and production build. Restart local app and show the finished controls; no push unless requested.

**Constraints:** Preserve original models and undo history. No upstream application code copied. Hardware-free mode cannot invent PNG renderings; report this clearly and retain data PDF. Save complete state in native JSON; LDR preserves geometry/colors, not native groups/mates.
