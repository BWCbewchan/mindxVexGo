'use strict';

goog.provide('Blockly.CPP.events');

goog.require('Blockly.CPP');

Blockly.CPP["event_started"] = (block) => {
  const nextBlock = block.getNextBlock();
  let branch = Blockly.CPP.eventStackToCode(nextBlock);
  if (Blockly.CPP.STATEMENT_PREFIX) {
    const id = block.id.replace(/\$/g, "$$$$");  // Issue 251.
    branch = Blockly.CPP.prefixLines(
      Blockly.CPP.STATEMENT_PREFIX.replace(/%1/g,
      "\'" + id + "\'"), Blockly.CPP.INDENT) + branch;
  }

  Blockly.CPP.addWhenStartedFunction(block, branch);
  return null;
};
