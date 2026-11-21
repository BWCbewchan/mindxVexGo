# RoboCode (robot-blocky)

Built from https://github.com/thuongtran1210/robot-blocky at cf2d76170acb06cda70fa6a298ebfe3047f86d44 with `vite build --base /blocky/`.
Author: Quang Thường (thuongtran1210). Used in mindX Robotics Lab with the author's permission; the upstream repository has no license file.
Blockly editor UI uses scratch-blocks; see scratch-media/LICENSE and scratch-media/TRADEMARK.
mindX patches from scripts/robot-blocky-patches are applied before the build: VEXcode GO / VEX IQ command set (same wording as VR Lab) with a GO/IQ switch in the code bar, and the 2D /training fields as 3D maps in a Training mindX group (02-training-maps.patch carries a snapshot of app/training/missions.json), and the two-motor robot drawn as a VEX GO Super Code Base from /robot-models/vex-go-super-code-base.glb (baked by scripts/bake-go-robot.mjs).

Rebuild: `node scripts/import-robot-blocky.mjs <work-dir> [commit]`.
