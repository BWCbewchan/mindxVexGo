# Live automatic-guide export workbench

User approved the live-card reference: automatic preview, thumbnail strip, rotate/elevate/zoom, drag image, current editor view, reset and apply to all steps.

Implement an accessible large dialog opened from Guide/File, plus a compact launcher and live-preview setting. Reuse the actual guide renderer and automatically generated steps. Store normalized per-step camera and safe fit percentage in existing guide preferences; a default camera covers newly generated steps after Apply all. Preserve title/note/order, undo and model poses.

Use debounced rendering, a bounded image cache and generation checks for stale jobs. Pause only preview updates, never planning; show stale state and require refresh before exporting from the dialog. Fit zoom ranges 50–100% of the fully visible model to avoid clipping. PDF and ZIP must consume the same settings.

Verify orbit/zoom math, invalid input, global/default camera inheritance, UI image dragging, multiple-step persistence, pause/refresh, apply-all undo, unchanged model transforms, no-WebGL behavior, existing GO/IQ/LEGO exports, encoding/typecheck/build. No upstream application code copied; reference is interaction design only.
