# Independent RoboLab

User approved a new, separate feature that does not change existing project code.

Create `/robolab` and a self-contained runtime under `/robolab/runtime/`. Do not edit Assembly, Studio, Simulation, their storage, or existing navigation. Pin the RoboMakers CAD source revision, preserve authorship and upstream third-party notices, and document every integration patch. The source does not provide a top-level application license; do not label its application code as MIT or infer a redistribution grant from its dependencies.

The new route hosts the runtime in an iframe with independent storage namespaces, a compact Vietnamese shell, explicit entry to simulation, source attribution, and recovery for load failures. Camera and robot connections require user interaction. Do not automatically import, edit, or migrate existing projects.

Include upstream simulation, fields/scoring, optimization/training, AI camera and real-hub tooling. Hardware and actual-camera execution require device validation; software tests cannot certify them. Keep the original engine's English UI available rather than claiming a complete Vietnamese translation.

Verify relative assets, worker/WASM loads, block execution, field selection/scoring, reload persistence, dialog handling, and unchanged canary keys from the existing app. Test desktop and narrow viewports. No automatic deployment.
