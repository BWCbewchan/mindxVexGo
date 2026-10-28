# Guide export position

Goal: show Export steps / PDF at the beginning of the Guide tab for GO and IQ.

The user requested this location explicitly. Use the existing export button and handler, move it before the student guide and keep it visible when scrolling. Both editors share Inspector chrome. Do not change the guide sequence or the model.

1. Reorder the existing button in inspector-chrome.js and add sticky positioning in editor-chrome.css.
2. Revise shared asset URLs so existing browser tabs load the update.
3. Verify the button location and disabled/enabled state in the browser. Review recent GO/IQ PDF output, including inventory, assembly pages and finished model. Report visual quality separately from physical assembly validation.

Verification: the live user's GO editor shows the export button first in the Guide panel with sticky positioning. It remains disabled because this 31-part model contains disconnected mechanical assemblies. JavaScript syntax, diff whitespace and UTF-8 checks passed.

PDF review: the 33-page GO sample and 4-page IQ sample have readable layouts and final-product pages. GO step 5 has purple hole markers floating after its six-pin subassembly is exploded; GO step 1 uses a front view that does not clearly reveal insertion despite the exploded-view caption. The renderer currently substitutes a seated close-up when one insertion ray finds an obstruction, which is not proof that the complete moving part can be inserted. Priorities: volume-based insertion validation and dependency ordering, preparation/join mini-steps for batched pins, markers following the exploded holes, and camera angles showing the joint and insertion axis together.
