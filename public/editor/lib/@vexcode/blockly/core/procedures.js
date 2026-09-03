/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utility functions for handling procedures.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * @name Blockly.Procedures
 * @namespace
 */
goog.provide('Blockly.Procedures');

goog.require('Blockly.Blocks');
goog.require('Blockly.constants');
goog.require('Blockly.Events');
goog.require('Blockly.Events.BlockChange');
goog.require('Blockly.Field');
goog.require('Blockly.Msg');
goog.require('Blockly.Names');
goog.require('Blockly.utils');
goog.require('Blockly.utils.dom');
goog.require('Blockly.utils.xml');
goog.require('Blockly.Workspace');
goog.require('Blockly.Xml');

// RM Code Start
goog.require('Blockly.WidgetDiv');
// RM Code End

/**
 * Constant to separate procedure names from variables and generated functions
 * when running generators.
 * @deprecated Use Blockly.PROCEDURE_CATEGORY_NAME
 */
Blockly.Procedures.NAME_TYPE = Blockly.PROCEDURE_CATEGORY_NAME;

/**
 * The default argument for a procedures_mutatorarg block.
 * @type {string}
 */
Blockly.Procedures.DEFAULT_ARG = 'x';

/**
 * Procedure block type.
 * @typedef {{
 *    getProcedureCall: function():string,
 *    renameProcedure: function(string,string),
 *    getProcedureDef: function():!Array
 * }}
 */
Blockly.Procedures.ProcedureBlock;

/**
 * Find all user-created procedure definitions in a workspace.
 * @param {!Blockly.Workspace} root Root workspace.
 * @return {!Array.<!Array.<!Array>>} Pair of arrays, the
 *     first contains procedures without return variables, the second with.
 *     Each procedure is defined by a three-element list of name, parameter
 *     list, and return value boolean.
 */
Blockly.Procedures.allProcedures = function(root) {
  var proceduresNoReturn = root.getBlocksByType('procedures_defnoreturn', false)
      .map(function(block) {
        return /** @type {!Blockly.Procedures.ProcedureBlock} */ (block).getProcedureDef();
      });
  var proceduresReturn = root.getBlocksByType('procedures_defreturn', false).map(function(block) {
    return /** @type {!Blockly.Procedures.ProcedureBlock} */ (block).getProcedureDef();
  });
  proceduresNoReturn.sort(Blockly.Procedures.procTupleComparator_);
  proceduresReturn.sort(Blockly.Procedures.procTupleComparator_);
  return [proceduresNoReturn, proceduresReturn];
};

/**
 * Comparison function for case-insensitive sorting of the first element of
 * a tuple.
 * @param {!Array} ta First tuple.
 * @param {!Array} tb Second tuple.
 * @return {number} -1, 0, or 1 to signify greater than, equality, or less than.
 * @private
 */
Blockly.Procedures.procTupleComparator_ = function(ta, tb) {
  return ta[0].toLowerCase().localeCompare(tb[0].toLowerCase());
};

/**
 * Ensure two identically-named procedures don't exist.
 * Take the proposed procedure name, and return a legal name i.e. one that
 * is not empty and doesn't collide with other procedures.
 * @param {string} name Proposed procedure name.
 * @param {!Blockly.Block} block Block to disambiguate.
 * @return {string} Non-colliding name.
 */
Blockly.Procedures.findLegalName = function(name, block) {
  if (block.isInFlyout) {
    // Flyouts can have multiple procedures called 'do something'.
    return name;
  }
  name = name || Blockly.Msg['UNNAMED_KEY'] || 'unnamed';
  while (!Blockly.Procedures.isLegalName_(name, block.workspace, block)) {
    // Collision with another procedure.
    var r = name.match(/^(.*?)(\d+)$/);
    if (!r) {
      name += '2';
    } else {
      name = r[1] + (parseInt(r[2], 10) + 1);
    }
  }
  return name;
};

/**
 * Does this procedure have a legal name?  Illegal names include names of
 * procedures already defined.
 * @param {string} name The questionable name.
 * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
 * @param {Blockly.Block=} opt_exclude Optional block to exclude from
 *     comparisons (one doesn't want to collide with oneself).
 * @return {boolean} True if the name is legal.
 * @private
 */
Blockly.Procedures.isLegalName_ = function(name, workspace, opt_exclude) {
  return !Blockly.Procedures.isNameUsed(name, workspace, opt_exclude);
};

/**
 * Return if the given name is already a procedure name.
 * @param {string} name The questionable name.
 * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
 * @param {Blockly.Block=} opt_exclude Optional block to exclude from
 *     comparisons (one doesn't want to collide with oneself).
 * @return {boolean} True if the name is used, otherwise return false.
 */
Blockly.Procedures.isNameUsed = function(name, workspace, opt_exclude) {
  var blocks = workspace.getAllBlocks(false);
  // Iterate through every block and check the name.
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i] == opt_exclude) {
      continue;
    }
    if (blocks[i].getProcedureDef) {
      var procedureBlock = /** @type {!Blockly.Procedures.ProcedureBlock} */ (
        blocks[i]);
      var procName = procedureBlock.getProcedureDef();
      if (Blockly.Names.equals(procName[0], name)) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Rename a procedure.  Called by the editable field.
 * @param {string} name The proposed new name.
 * @return {string} The accepted name.
 * @this {Blockly.Field}
 */
Blockly.Procedures.rename = function(name) {
  // Strip leading and trailing whitespace.  Beyond this, all names are legal.
  name = name.trim();

  var legalName = Blockly.Procedures.findLegalName(name,
      /** @type {!Blockly.Block} */ (this.getSourceBlock()));
  var oldName = this.getValue();
  if (oldName != name && oldName != legalName) {
    // Rename any callers.
    var blocks = this.getSourceBlock().workspace.getAllBlocks(false);
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].renameProcedure) {
        var procedureBlock = /** @type {!Blockly.Procedures.ProcedureBlock} */ (
          blocks[i]);
        procedureBlock.renameProcedure(
            /** @type {string} */ (oldName), legalName);
      }
    }
  }
  return legalName;
};

/**
 * Construct the blocks required by the flyout for the procedure category.
 * @param {!Blockly.Workspace} workspace The workspace containing procedures.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.Procedures.flyoutCategory = function(workspace) {
  var xmlList = [];

  Blockly.Procedures.addCreateButton_(workspace, xmlList);

  // Create call blocks for each procedure defined in the workspace
  var mutations = Blockly.Procedures.allProcedureMutations(workspace);
  mutations = Blockly.Procedures.sortProcedureMutations_(mutations);
  for (var i = 0; i < mutations.length; i++) {
    var mutation = mutations[i];
    // <block type="procedures_call">
    //   <mutation ...></mutation>
    // </block>
    var block = Blockly.utils.dom.createDom('block');
    block.setAttribute('type', 'procedures_call');
    block.setAttribute('gap', 16);
    block.appendChild(mutation);
    xmlList.push(block);
  }
  return xmlList;
};

/**
 * Updates the procedure mutator's flyout so that the arg block is not a
 * duplicate of another arg.
 * @param {!Blockly.Workspace} workspace The procedure mutator's workspace. This
 *     workspace's flyout is what is being updated.
 * @private
 */
Blockly.Procedures.updateMutatorFlyout_ = function(workspace) {
  // RM we don't care about this...
  return;
};

/**
 * Listens for when a procedure mutator is opened. Then it triggers a flyout
 * update and adds a mutator change listener to the mutator workspace.
 * @param {!Blockly.Events.Abstract} e The event that triggered this listener.
 * @package
 */
Blockly.Procedures.mutatorOpenListener = function(e) {
  // RM we don't care about this...
  return;
};

/**
 * Listens for changes in a procedure mutator and triggers flyout updates when
 * necessary.
 * @param {!Blockly.Events.Abstract} e The event that triggered this listener.
 * @private
 */
Blockly.Procedures.mutatorChangeListener_ = function(e) {
  // RM we don't care about this...
  return;
};

/**
 * Find all callers of a named procedure.
 * @param {string} name Name of procedure (procCode in scratch-blocks).
 * @param {!Blockly.Workspace} ws The workspace to find callers in.
 * @param {!Blockly.Block} definitionRoot The root of the stack where the
 *     procedure is defined.
 * @param {boolean} allowRecursive True if the search should include recursive
 *     procedure calls.  False if the search should ignore the stack starting
 *     with definitionRoot.
 * @return {!Array.<!Blockly.Block>} Array of caller blocks.
 * @package
 */
Blockly.Procedures.getCallers = function (name, ws, definitionRoot,
    allowRecursive) {
  var allBlocks = [];
  var topBlocks = ws.getTopBlocks();

  // Start by deciding which stacks to investigate.
  for (var i = 0; i < topBlocks.length; i++) {
    var block = topBlocks[i];
    if (block.id == definitionRoot.id && !allowRecursive) {
      continue;
    }
    allBlocks.push.apply(allBlocks, block.getDescendants(false));
  }

  var callers = [];
  for (var i = 0; i < allBlocks.length; i++) {
    var block = allBlocks[i];
    if (block.type == Blockly.PROCEDURES_CALL_BLOCK_TYPE) {
      var procCode = block.getProcCode();
      if (procCode && procCode == name) {
        callers.push(block);
      }
    }
  }
  return callers;
};

/**
 * When a procedure definition changes its parameters, find and edit all its
 * callers.
 * @param {!Blockly.Block} defBlock Procedure definition block.
 */
Blockly.Procedures.mutateCallers = function(defBlock) {
  // RM replaced with other function
};

/**
 * Find the definition block for the named procedure.
 * @param {string} procCode The identifier of the procedure.
 * @param {!Blockly.Workspace} workspace The workspace to search.
 * @return {Blockly.Block} The procedure definition block, or null not found.
 */
Blockly.Procedures.getDefinition = function(procCode, workspace) {
  // RM - don't care about this...
  return null;
};

//#region added by RM
/**
 * Find all user-created procedure definition mutations in a workspace.
 * @param {!Blockly.Workspace} root Root workspace.
 * @return {!Array.<Element>} Array of mutation xml elements.
 * @package
 */
 Blockly.Procedures.allProcedureMutations = function(root) {
  var blocks = root.getAllBlocks();
  var mutations = [];
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].type == Blockly.PROCEDURES_PROTOTYPE_BLOCK_TYPE) {
      var mutation = blocks[i].mutationToDom(/* opt_generateShadows */ true);
      if (mutation) {
        mutations.push(mutation);
      }
    }
  }
  return mutations;
};

/**
 * Sorts an array of procedure definition mutations alphabetically.
 * (Does not mutate the given array.)
 * @param {!Array.<Element>} mutations Array of mutation xml elements.
 * @return {!Array.<Element>} Sorted array of mutation xml elements.
 * @private
 */
 Blockly.Procedures.sortProcedureMutations_ = function(mutations) {
  var newMutations = mutations.slice();

  newMutations.sort(function(a, b) {
    var procCodeA = a.getAttribute('proccode');
    var procCodeB = b.getAttribute('proccode');

    return Blockly.utils.scratch.compareStrings(procCodeA, procCodeB);
  });

  return newMutations;
};

/**
 * Create the "Make a Block..." button.
 * @param {!Blockly.Workspace} workspace The workspace contianing procedures.
 * @param {!Array.<!Element>} xmlList Array of XML block elements to add to.
 * @private
 */
 Blockly.Procedures.addCreateButton_ = function(workspace, xmlList) {
  var button = Blockly.utils.dom.createDom('button');
  var msg = Blockly.Msg.NEW_PROCEDURE;
  var callbackKey = 'CREATE_PROCEDURE';
  var callback = function() {
    Blockly.Procedures.createProcedureDefCallback_(workspace);
  };
  button.setAttribute('text', msg);
  button.setAttribute('callbackKey', callbackKey);
  workspace.registerButtonCallback(callbackKey, callback);
  xmlList.push(button);
};

/**
 * Find all procedure variable blocks of a named procedure.
 * @param {string} name Name of procedure (funcName).
 * @param {!Blockly.Workspace} ws The workspace to find callers in.
 * @param {!Blockly.Block} definitionRoot The root of the stack where the
 *     procedure is defined.
 * @param {boolean} allowRecursive True if the search should include recursive
 *     procedure calls.  False if the search should ignore the stack starting
 *     with definitionRoot.
 * @return {!Array.<!Blockly.Block>} Array of caller blocks.
 * @package
 */
 Blockly.Procedures.getVariables = function(name, ws, definitionRoot, allowRecursive) {
  var allBlocks = [];
  var topBlocks = ws.getTopBlocks();

  // Start by deciding which stacks to investigate.
  for (var i = 0; i < topBlocks.length; i++) {
    var block = topBlocks[i];
    if (block.id == definitionRoot.id && !allowRecursive) {
      continue;
    }
    allBlocks.push.apply(allBlocks, block.getDescendants(false));
  }

  var vars = [];
  for (var i = 0; i < allBlocks.length; i++) {
    var block = allBlocks[i];
    if (
      block.type == 'argument_reporter_boolean' ||
      block.type == 'argument_reporter_number' ||
      block.type == 'argument_reporter_string'
    ) {
      var funcName = block.getFuncName();
      if (funcName && funcName == name) {
        vars.push(block);
      }
    }
  }
  return vars;
};

/**
 * Find and edit all callers with a procCode using a new mutation.
 * @param {string} name Name of procedure (procCode in scratch-blocks).
 * @param {!Blockly.Workspace} ws The workspace to find callers in.
 * @param {!Element} mutation New mutation for the callers.
 * @package
 */
 Blockly.Procedures.mutateCallersAndPrototype = function(name, ws, mutation) {
  var defineBlock = Blockly.Procedures.getDefineBlock(name, ws);
  var prototypeBlock = Blockly.Procedures.getPrototypeBlock(name, ws);
  if (defineBlock && prototypeBlock) {
    const originalFuncName = prototypeBlock.getFuncName();
    var callers = Blockly.Procedures.getCallers(name,
        defineBlock.workspace, defineBlock, true /* allowRecursive */);
    callers.push(prototypeBlock);
    Blockly.Events.setGroup(true);
    for (var i = 0, caller; caller = callers[i]; i++) {
      var oldMutationDom = caller.mutationToDom();
      var oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);
      caller.domToMutation(mutation);
      var newMutationDom = caller.mutationToDom();
      var newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
      if (oldMutation != newMutation) {
        Blockly.Events.fire(new Blockly.Events.BlockChange(
            caller, 'mutation', null, oldMutation, newMutation));
      }
    }
    const newFuncName = prototypeBlock.getFuncName();
    if (originalFuncName !== newFuncName) {
      const vars = Blockly.Procedures.getVariables(
        originalFuncName,
        defineBlock.workspace, 
        defineBlock,
        true
      );
      for (var i = 0, varBlock; varBlock = vars[i]; i++) {
        console.log("updating var block:", varBlock);
        const newMut = varBlock.generateMutation(newFuncName);
        var oldMutationDom = varBlock.mutationToDom();
        var oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);
        varBlock.domToMutation(newMut);
        var newMutationDom = varBlock.mutationToDom();
        var newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
        if (oldMutation != newMutation) {
          Blockly.Events.fire(new Blockly.Events.BlockChange(
            varBlock, 'mutation', null, oldMutation, newMutation));
        }
      }
    }
    Blockly.Events.setGroup(false);
  } else {
    alert('No define block on workspace'); // TODO decide what to do about this.
  }
};

/**
 * Find the definition block for the named procedure.
 * @param {string} procCode The identifier of the procedure.
 * @param {!Blockly.Workspace} workspace The workspace to search.
 * @return {Blockly.Block} The procedure definition block, or null not found.
 * @package
 */
 Blockly.Procedures.getDefineBlock = function(procCode, workspace) {
  // Assume that a procedure definition is a top block.
  var blocks = workspace.getTopBlocks(false);
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].type == Blockly.PROCEDURES_DEFINITION_BLOCK_TYPE) {
      var prototypeBlock = blocks[i].getInput('custom_block').connection.targetBlock();
      if (prototypeBlock.getProcCode && prototypeBlock.getProcCode() == procCode) {
        return blocks[i];
      }
    }
  }
  return null;
};

/**
 * Find the prototype block for the named procedure.
 * @param {string} procCode The identifier of the procedure.
 * @param {!Blockly.Workspace} workspace The workspace to search.
 * @return {Blockly.Block} The procedure prototype block, or null not found.
 * @package
 */
 Blockly.Procedures.getPrototypeBlock = function(procCode, workspace) {
  var defineBlock = Blockly.Procedures.getDefineBlock(procCode, workspace);
  if (defineBlock) {
    return defineBlock.getInput('custom_block').connection.targetBlock();
  }
  return null;
};

/**
 * Create a mutation for a brand new custom procedure.
 * @return {Element} The mutation for a new custom procedure
 * @package
 */
 Blockly.Procedures.newProcedureMutation = function() {
  var mutationText = '<xml>' +
      '<mutation' +
      ' proccode="' + Blockly.Msg['PROCEDURE_DEFAULT_NAME'] + '"' +
      ' argumentids="[]"' +
      ' argumentnames="[]"' +
      ' argumentdefaults="[]"' +
      ' warp="false">' +
      '</mutation>' +
      '</xml>';
  return Blockly.Xml.textToDom(mutationText).firstChild;
};

/**
 * Callback to create a new procedure custom command block.
 * @param {!Blockly.Workspace} workspace The workspace to create the new procedure on.
 * @private
 */
Blockly.Procedures.createProcedureDefCallback_ = function(workspace) {
  Blockly.Procedures.externalProcedureDefCallback(
      Blockly.Procedures.newProcedureMutation(),
      Blockly.Procedures.createProcedureCallbackFactory_(workspace)
  );
};

/**
 * Callback factory for adding a new custom procedure from a mutation.
 * @param {!Blockly.Workspace} workspace The workspace to create the new procedure on.
 * @return {function(?Element)} callback for creating the new custom procedure.
 * @private
 */
Blockly.Procedures.createProcedureCallbackFactory_ = function(workspace) {
  return function(mutation) {
    if (mutation) {
      var blockText = '<xml>' +
          '<block type="procedures_definition">' +
          '<statement name="custom_block">' +
          '<shadow type="procedures_prototype">' +
          Blockly.Xml.domToText(mutation) +
          '</shadow>' +
          '</statement>' +
          '</block>' +
          '</xml>';
      var blockDom = Blockly.Xml.textToDom(blockText).firstChild;
      Blockly.Events.setGroup(true);
      var block = Blockly.Xml.domToBlock(blockDom, workspace);
      var scale = workspace.scale; // To convert from pixel units to workspace units
      // Position the block so that it is at the top left of the visible workspace,
      // padded from the edge by 30 units. Position in the top right if RTL.
      var posX = -workspace.scrollX;
      if (workspace.RTL) {
        posX += workspace.getMetrics().contentWidth - 30;
      } else {
        posX += 30;
      }
      block.moveBy(posX / scale, (-workspace.scrollY + 30) / scale);
      block.scheduleSnapAndBump();
      Blockly.Events.setGroup(false);

      // RM Code Start
      // we want to update the toolbox after the block update...
      if (block.workspace.refreshToolbox) {
        block.workspace.refreshToolbox();
      }
      // RM Code End
    }
    // RM Code Start
    Blockly.WidgetDiv.hide();
    // RM Code End
  };
};

/**
 * Callback to open the modal for editing custom procedures.
 * @param {!Blockly.Block} block The block that was right-clicked.
 */
Blockly.Procedures.editProcedureCallback = function(block) {
  // Edit can come from one of three block types (call, define, prototype)
  // Normalize by setting the block to the prototype block for the procedure.
  if (block.type == Blockly.PROCEDURES_DEFINITION_BLOCK_TYPE) {
    var input = block.getInput('custom_block');
    if (!input) {
      alert('Bad input'); // TODO: Decide what to do about this.
      return;
    }
    var conn = input.connection;
    if (!conn) {
      alert('Bad connection'); // TODO: Decide what to do about this.
      return;
    }
    var innerBlock = conn.targetBlock();
    if (!innerBlock ||
        !innerBlock.type == Blockly.PROCEDURES_PROTOTYPE_BLOCK_TYPE) {
      alert('Bad inner block'); // TODO: Decide what to do about this.
      return;
    }
    block = innerBlock;
  } else if (block.type == Blockly.PROCEDURES_CALL_BLOCK_TYPE) {
    // This is a call block, find the prototype corresponding to the procCode.
    // Make sure to search the correct workspace, call block can be in flyout.
    var workspaceToSearch = block.workspace.isFlyout ?
        block.workspace.targetWorkspace : block.workspace;
    block = Blockly.Procedures.getPrototypeBlock(
        block.getProcCode(), workspaceToSearch);
  }
  // Block now refers to the procedure prototype block, it is safe to proceed.
  Blockly.Procedures.externalProcedureDefCallback(
      block.mutationToDom(),
      Blockly.Procedures.editProcedureCallbackFactory_(block)
  );
};

/**
 * Callback factory for editing an existing custom procedure.
 * @param {!Blockly.Block} block The procedure prototype block being edited.
 * @return {function(?Element)} Callback for editing the custom procedure.
 * @private
 */
Blockly.Procedures.editProcedureCallbackFactory_ = function(block) {
  return function(mutation) {
    if (mutation) {
      Blockly.Procedures.mutateCallersAndPrototype(block.getProcCode(),
          block.workspace, mutation);
      // RM Code Start
      // we want to update the toolbox after the block update...
      if (block.workspace.refreshToolbox) {
        block.workspace.refreshToolbox();
      }
      // RM Code End
    }
  };
};

// RM Code Start
/**
 * Callback to create a new procedure custom command block.
 * @param {Element} mutator the data for the my block
 * @param {Function} callback the function to call when the edit is done
 * @public
 */
Blockly.Procedures.externalProcedureDefCallback = function(mutator, callback) {
  alert('External procedure editor must be override Blockly.Procedures.externalProcedureDefCallback');
};
// RM Code End

/**
 * Callback to try to delete a custom block definitions.
 * @param {string} procCode The identifier of the procedure to delete.
 * @param {!Blockly.Block} definitionRoot The root block of the stack that
 *     defines the custom procedure.
 * @return {boolean} True if the custom procedure was deleted, false otherwise.
 */
Blockly.Procedures.deleteProcedureDefCallback = function(procCode,
    definitionRoot) {
  var callers = Blockly.Procedures.getCallers(procCode,
      definitionRoot.workspace, definitionRoot, false /* allowRecursive */);
  if (callers.length > 0) {
    return false;
  }

  var workspace = definitionRoot.workspace;

  // Delete the whole stack.
  Blockly.Events.setGroup(true);
  definitionRoot.dispose();
  Blockly.Events.setGroup(false);

  // TODO (#1354) Update this function when '_' is removed
  // Refresh toolbox, so caller doesn't appear there anymore
  workspace.refreshToolboxSelection();

  return true;
};

//#endregion added by RM
