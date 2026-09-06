# Homework library

`/quiz` hosts 72 supplied originals (39 DOCX and 33 PDF), 241 adapted questions and 226 coding tasks across 70 lessons. Progress and code stay in the browser.

## Source fidelity

Original downloads remain unchanged, with source paths and SHA-256 hashes in the catalog. PDF readers show rendered source pages. Word readers preserve text/image order and tables with merged cells; download the original for exact typography and pagination.

Questions retain device illustrations and essential images, without full-page reference cards. 45 PDF crops and 56 Word excerpts supply context for mission-dependent questions. Excerpts match source evidence in the same lesson. This is open-book practice. Device SVG credits are in devices.json.

The source audit verifies all 72 hosted originals against supplied files, PDF text, Word text/table counts and reader assets. This establishes faithful transcription, not the correctness of the original author.

## Coding assessment

Instructions stay visible above the editor. Submit automatically inspects the current workspace. Ten task entries, including duplicates, run behavior checks for movement, turning, square routes, mazes or eye-triggered stopping. Assessment resets the robot and correlates results with a unique attempt ID. Cancellation does not save results; timeout is 60 seconds.

Other tasks check connected Blockly structure against displayed criteria for movement, sensors, conditions, loops, stops, signals and literal parameters. Some unreachable branches are excluded. Success is labelled Code criteria met, not a simulation pass. Structural checks do not prove ordering, every conditional path, dynamic expressions or physical behavior. Insufficient requirements produce an incomplete verdict. Motors and LEDs are not fully simulated.

Results use mindx-quiz-code-result-v2; old teacher-review results are not restored. No teacher submission is required. Confirmations use React dialogs, never native alerts.

## Rebuild

Run from the repository root with Python, PyMuPDF and Pillow:

```powershell
python scripts/import-homework.py 'C:/Users/admin/Downloads/HOMEWORK ALL -20260905T113047Z-1-001/HOMEWORK ALL'
python scripts/build-homework-quizzes.py
python scripts/build-quiz-tasks.py
python scripts/repair-word-readers.py
python scripts/prepare-quiz-visuals.py
python scripts/quiz-question-context.py
python scripts/audit-quiz-sources.py
python scripts/check-encoding.py
npm run typecheck
npm run build
```

Import resets the catalog. Run all subsequent steps to restore questions and context. Reports are in artifacts/quiz.

With Chrome and the development server at port 3117:

```powershell
node scripts/test-quiz.mjs
node scripts/test-quiz-coding.mjs
node scripts/test-code-check.mjs
node scripts/test-quiz-visuals.mjs
node scripts/test-quiz-context.mjs
node scripts/test-encoding-ui.mjs
```

Tests cover grading/storage, behavior and structural checks, visible requirements, image decoding/zoom, mobile layout, Word tables and Unicode rendering.

## Required question diagrams

Run `python scripts/repair-quiz-question-context.py` after both visual/context builders. It applies manually reviewed PDF regions for maze, numbered positions and route tasks, propagates them to matching combined-document questions, and audits all 241 questions. It also restores missing source text context. Required diagrams are marked as question illustrations, so filtering out full-page source cards cannot hide them. Regression: `node scripts/test-quiz-diagrams.mjs`. Original source downloads are unchanged.

