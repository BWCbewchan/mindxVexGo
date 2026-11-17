# RoboLab Implementation Plan

**Goal:** Add an independent robotics experiment feature without modifying existing product modules.

**Architecture:** New Next route wrapping a pinned, locally served runtime. A small adapter namespaces storage and provides application dialogs. No imports from Assembly/Studio/Simulation.

**Tech Stack:** Next.js, React, vendored upstream Three/Blockly/Rapier engine, Playwright.

1. Record upstream revision and source hashes. Import only runtime assets and notices using a reproducible script; exclude repository metadata and helper executables.
2. Add isolated browser-storage adapters and custom dialogs. Document source adaptations and default to English.
3. Add the `/robolab` shell with source attribution, loading/error states and direct feature navigation.
4. Test startup, runtime assets, actual block execution and fields. Verify storage boundaries and reloads, then typecheck and encoding checks.
5. Report working functionality and hardware-dependent verification limits. Keep changes local until deployment is requested.
