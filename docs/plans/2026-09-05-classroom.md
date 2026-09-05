# Classroom Implementation Plan

Goal: Add a teacher-operated local classroom with portable backups and customizable companions.
Architecture: Client-side React workspace, versioned validated localStorage documents, immutable point ledger. No accounts or external AI calls in this release.
Tech stack: Existing Next.js, React, TypeScript and SVG.

1. Add model.ts for classes, students, attendance dates, criteria, rewards and transaction ledger; validate imports and constrain values.
2. Add classroom page with roster selection, avatar editor, award actions, reward redemptions and transaction undo. Save before updating UI; show storage failures.
3. Add teaching tools: attendance, fair random picker, shuffled teams, deadline-based timer, presentation mode and hide scores.
4. Add export/import, class creation and deletion confirmations; link Classroom from home. Use original SVG companions, clearly defer AI.
5. Validate build and browser workflows: create class, award, redeem, undo, reload, import/export, malformed file, mobile overflow.

Scope: Local teacher workflow. Training assignments and AI generation remain future integration work; no simulated online sync or AI claims.
