# Training cargo and sensors

Extend the existing local simulator and original GO Blockly block types. Keep physical Studio behavior unchanged. Do not push or deploy.

- Cargo: 40 mm colored blocks; front magnet at 65 mm; boost picks up within 35 mm of the mount, drop releases. A block scores only when released entirely inside a zone of the same color. Reset restores all objects.
- Sensors: forward eye ray from the front edge, 150/400 mm near/far range; closest wall or cargo occludes anything behind it. Color/hue report cargo color. Brightness is a simplified synthetic value. Bumper reports contact; motors stop but code continues so students can react.
- UI: expose Magnet and supported Sensing blocks automatically, live sensor panel, moving carried cargo, field editing and JSON persistence of cargo and zones.
- Add eight cargo missions, two bumper missions and two eye missions alongside the existing 30.
- Verify deterministic sensor/cargo behavior, real Blockly execution with sensor conditions and pickup/drop, reset and save/import, and production build.
