# PDF page editor implementation plan

Goal: preview the actual 16:9 printed document, edit both illustration frames and purple hole markers, then export exactly that presentation without moving CAD parts.

Architecture: shared page DOM/CSS for screen and print. The renderer returns clean images plus projected automatic markers for each view. SVG places images and editable vector dots in one coordinate space. Normalized per-step frame settings persist pan/zoom, optional frame rectangle, camera and optional custom markers. Pointer gestures update SVG/CSS only, with one undoable preference commit on release. Existing headless PDF/API paths remain compatible.

1. Add bounded presentation validation and coordinate helpers; test malformed data, rectangle bounds, marker transforms, empty/custom markers and metadata preservation.
2. Extend guide renderer with independent assembled/detail cameras and projected automatic markers. Keep legacy live-card behavior.
3. Extract shared headers, preparation, step and finished page builders; use the same page dimensions, fonts and SVG figures for preview and print. Rasterize SVG illustrations only when packaging offline PNGs.
4. Build fullscreen print-preview workspace: page navigation including preparation/finished pages, paper fit, frame/image/marker tools, frame drag/resize, individual camera/zoom controls, add/delete/restore markers, undo/redo and final print action. Route UI PDF buttons through preview; retain direct API exports.
5. Persist settings in native JSON and guide snapshots; protect active preview from external CAD edits. Filter preview-only input/DOM changes from the main renderer.
6. Verify real browser gestures, exact shared DOM/geometry, preview/export marker coordinates, independent frames, one Undo per gesture, no PNG/GPU renders during 2D dragging, reload, offline ZIP and production build. Preserve unrelated working-tree changes and do not commit/push without a new request.
