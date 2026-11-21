# Reference VEX models from teacher CAD

Converted from the SolidWorks assemblies in the 2026-11-19 teaching handover with
`node scripts/vexgo/sldasm.mjs <file.SLDASM> <out.project.json>`. Each file keeps the source path in
`source`. They are correct, real builds: use them as ground truth for joints and part placement.

- `00trial--build_xe` / `00trial--assem2`: VEX GO Code Base car (with LED Bumper), Brain, battery, 2 motors.
- `00trial--flag`, `1-arm--...--ten`: small GO examples.
- `2-semi--*`: VEX IQ SEMI humanoid (b1) and propeller robot (b2), with their sub-assemblies.
- `4-others--rl_sorter--*`: VEX IQ sorter (225 parts) and its sub-assemblies.

`learned-joints.json`: joint statistics over all of them (`scripts/vexgo/learn.mjs`), used by
`scripts/vexgo/fit.mjs` to prefer joints seen in real models.

Not converted: `00.trial/old_build/Assem1-3` (their part files are not in the handover).

## In the app (/library → Mô hình chuẩn)
`node scripts/build-reference-library.mjs` rebuilds them for the library: cars stand wheels-down, each model is
centred on the ground, a cover picture is rendered, and `public/library/reference/index.json` lists title, kit,
kind (robot / small / sub-assembly), course and part counts used by the filters. Titles and courses are set in
the `META` table of that script; run it again after converting new CAD.
