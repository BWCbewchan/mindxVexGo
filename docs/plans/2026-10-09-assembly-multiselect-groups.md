# Assembly Multi-Select and Layers Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement the plan task-by-task.

**Goal:** Add modifier-drag box selection, persistent part groups, and practical group layer controls to the VEX GO assembly editor.

**Architecture:** Keep assembly geometry as independent CAD parts. Store groups as project metadata and each member part's group id; grouping changes selection and management behavior without merging meshes or joints. Add a canvas marquee that projects model bounds into screen space, and a Groups/Layers panel for selection, visibility, locking, renaming, and ungrouping. Reuse the existing selectedIds/moveJoined behavior so multi-selected parts continue to move together.

**Tech Stack:** Static HTML/CSS/JavaScript, Three.js, Playwright scripts, Node.

---

### Task 1: Add project group state and group actions

**Files:**
- Modify: `public/assembly/editor.js`
- Modify: `public/assembly/editor.html`
- Test: `scripts/test-assembly-groups.mjs`

**Steps:**
1. Add project.groups and validate group ids, names, flags, and part groupId references for project files and drafts.
2. Add Group/Ungroup actions and Ctrl+G / Ctrl+Shift+G shortcuts, ignoring inputs and textareas.
3. Make selected group members multi-selectable and use existing linkedPoses selection behavior for shared transforms.
4. Update delete/ungroup operations to remove stale group metadata safely.

### Task 2: Add Ctrl-drag marquee selection and layer controls

**Files:**
- Modify: `public/assembly/editor.js`
- Modify: `public/assembly/editor.html`
- Modify: `public/assembly/editor.css`
- Test: `scripts/test-assembly-groups.mjs`

**Steps:**
1. Add an accessible overlay rectangle and capture Ctrl/Meta-drag gestures before OrbitControls.
2. Project each visible part's world bounds to canvas coordinates and intersect them with the marquee.
3. Render Groups/Layers rows with select, show/hide, lock/unlock, rename, and ungroup controls.
4. Apply hidden/locked group state to CAD objects and prevent transforms on locked members.

### Task 3: Verify persistence and interaction

**Files:**
- Test: `scripts/test-assembly-groups.mjs`

**Steps:**
1. Test Ctrl-drag selection, grouping, visibility, lock behavior, and keyboard shortcuts in Playwright.
2. Export/reopen a project and verify group metadata and member ids survive.
3. Run assembly unit/browser tests, encoding checks, typecheck, and build.
