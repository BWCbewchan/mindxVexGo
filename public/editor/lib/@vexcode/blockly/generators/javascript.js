/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Helper functions for generating JavaScript for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript');

goog.require('Blockly.Generator');
goog.require('Blockly.utils.global');
goog.require('Blockly.utils.string');


/**
 * JavaScript code generator.
 * @type {!Blockly.Generator}
 */
Blockly.JavaScript = new Blockly.Generator('JavaScript');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.JavaScript.addReservedWords(
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords
    'break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,new,return,super,switch,this,throw,try,typeof,var,void,while,with,yield,' +
    'enum,' +
    'implements,interface,let,package,private,protected,public,static,' +
    'await,' +
    'null,true,false,' +
    // Magic variable.
    'arguments,' +
    // Everything in the current environment (835 items in Chrome, 104 in Node).
    Object.getOwnPropertyNames(Blockly.utils.global).join(','));

/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/JavaScript/Reference/Operators/Operator_Precedence
 */
Blockly.JavaScript.ORDER_ATOMIC = 0;           // 0 "" ...
Blockly.JavaScript.ORDER_NEW = 1.1;            // new
Blockly.JavaScript.ORDER_MEMBER = 1.2;         // . []
Blockly.JavaScript.ORDER_FUNCTION_CALL = 2;    // ()
Blockly.JavaScript.ORDER_INCREMENT = 3;        // ++
Blockly.JavaScript.ORDER_DECREMENT = 3;        // --
Blockly.JavaScript.ORDER_BITWISE_NOT = 4.1;    // ~
Blockly.JavaScript.ORDER_UNARY_PLUS = 4.2;     // +
Blockly.JavaScript.ORDER_UNARY_NEGATION = 4.3; // -
Blockly.JavaScript.ORDER_LOGICAL_NOT = 4.4;    // !
Blockly.JavaScript.ORDER_TYPEOF = 4.5;         // typeof
Blockly.JavaScript.ORDER_VOID = 4.6;           // void
Blockly.JavaScript.ORDER_DELETE = 4.7;         // delete
Blockly.JavaScript.ORDER_AWAIT = 4.8;          // await
Blockly.JavaScript.ORDER_EXPONENTIATION = 5.0; // **
Blockly.JavaScript.ORDER_MULTIPLICATION = 5.1; // *
Blockly.JavaScript.ORDER_DIVISION = 5.2;       // /
Blockly.JavaScript.ORDER_MODULUS = 5.3;        // %
Blockly.JavaScript.ORDER_SUBTRACTION = 6.1;    // -
Blockly.JavaScript.ORDER_ADDITION = 6.2;       // +
Blockly.JavaScript.ORDER_BITWISE_SHIFT = 7;    // << >> >>>
Blockly.JavaScript.ORDER_RELATIONAL = 8;       // < <= > >=
Blockly.JavaScript.ORDER_IN = 8;               // in
Blockly.JavaScript.ORDER_INSTANCEOF = 8;       // instanceof
Blockly.JavaScript.ORDER_EQUALITY = 9;         // == != === !==
Blockly.JavaScript.ORDER_BITWISE_AND = 10;     // &
Blockly.JavaScript.ORDER_BITWISE_XOR = 11;     // ^
Blockly.JavaScript.ORDER_BITWISE_OR = 12;      // |
Blockly.JavaScript.ORDER_LOGICAL_AND = 13;     // &&
Blockly.JavaScript.ORDER_LOGICAL_OR = 14;      // ||
Blockly.JavaScript.ORDER_CONDITIONAL = 15;     // ?:
Blockly.JavaScript.ORDER_ASSIGNMENT = 16;      // = += -= **= *= /= %= <<= >>= ...
Blockly.JavaScript.ORDER_YIELD = 17;           // yield
Blockly.JavaScript.ORDER_COMMA = 18;           // ,
Blockly.JavaScript.ORDER_NONE = 99;            // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.JavaScript.ORDER_OVERRIDES = [
  // (foo()).bar -> foo().bar
  // (foo())[0] -> foo()[0]
  [Blockly.JavaScript.ORDER_FUNCTION_CALL, Blockly.JavaScript.ORDER_MEMBER],
  // (foo())() -> foo()()
  [Blockly.JavaScript.ORDER_FUNCTION_CALL, Blockly.JavaScript.ORDER_FUNCTION_CALL],
  // (foo.bar).baz -> foo.bar.baz
  // (foo.bar)[0] -> foo.bar[0]
  // (foo[0]).bar -> foo[0].bar
  // (foo[0])[1] -> foo[0][1]
  [Blockly.JavaScript.ORDER_MEMBER, Blockly.JavaScript.ORDER_MEMBER],
  // (foo.bar)() -> foo.bar()
  // (foo[0])() -> foo[0]()
  [Blockly.JavaScript.ORDER_MEMBER, Blockly.JavaScript.ORDER_FUNCTION_CALL],

  // !(!foo) -> !!foo
  [Blockly.JavaScript.ORDER_LOGICAL_NOT, Blockly.JavaScript.ORDER_LOGICAL_NOT],
  // a * (b * c) -> a * b * c
  [Blockly.JavaScript.ORDER_MULTIPLICATION, Blockly.JavaScript.ORDER_MULTIPLICATION],
  // a + (b + c) -> a + b + c
  [Blockly.JavaScript.ORDER_ADDITION, Blockly.JavaScript.ORDER_ADDITION],
  // a && (b && c) -> a && b && c
  [Blockly.JavaScript.ORDER_LOGICAL_AND, Blockly.JavaScript.ORDER_LOGICAL_AND],
  // a || (b || c) -> a || b || c
  [Blockly.JavaScript.ORDER_LOGICAL_OR, Blockly.JavaScript.ORDER_LOGICAL_OR]
];

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.JavaScript.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.JavaScript.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.JavaScript.functionNames_ = Object.create(null);

  // RM Code Start
  Blockly.JavaScript.systemEvents_ = Object.create(null);

  Blockly.JavaScript.driverEvents_ = Object.create(null);
  Blockly.JavaScript.autonEvents_ = Object.create(null);

  Blockly.JavaScript.procedurePrototypes_ = Object.create(null);

  // Create an array of when started functions.
  Blockly.JavaScript.mainFunctions_ = [];
  // RM Code End

  if (!Blockly.JavaScript.variableDB_) {
    Blockly.JavaScript.variableDB_ =
        new Blockly.Names(Blockly.JavaScript.RESERVED_WORDS_);
  } else {
    Blockly.JavaScript.variableDB_.reset();
  }

  Blockly.JavaScript.variableDB_.setVariableMap(workspace.getVariableMap());

  var defvars = [];
  // Add developer variables (not created or named by the user).
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    defvars.push(Blockly.JavaScript.variableDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE));
  }

  // Add user variables, but only ones that are being used.
  var variables = Blockly.Variables.allUsedVarModels(workspace);
  for (var i = 0; i < variables.length; i++) {
    defvars.push(Blockly.JavaScript.variableDB_.getName(variables[i].getId(),
        Blockly.VARIABLE_CATEGORY_NAME));
  }

  // Declare all of the variables.
  if (defvars.length) {
    Blockly.JavaScript.definitions_['variables'] =
        'var ' + defvars.join(', ') + ';';
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.JavaScript.finish = function(code) {
  // RM Code Start
  let mainFunction = "";
  const mainFunctionCalls = [];
  if (Blockly.JavaScript.mainFunctions_.length) {
    for (var i = 0; i < Blockly.JavaScript.mainFunctions_.length; i++) {
      const func = Blockly.JavaScript.mainFunctions_[i];
      if (i === 0) {
        mainFunction = `${func}();\n`;
      } else {
        // Threading in JavaScript?
        mainFunctionCalls.push(`ws${i} = Thread( ${func} )`);
      }
    }
  }
  mainFunctionCalls.push(mainFunction);

  var variables = Blockly.JavaScript.definitions_['variables'];
  // RM Code End

  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.JavaScript.definitions_) {
    // RM Code Start
    var def = Blockly.JavaScript.definitions_[name];
    if (name !== "variables") {
      if (typeof def === "object" && def.ishidden) {
        console.log("skipping hidden function");
      } else {
        definitions.push(def);
      }
    }
    // RM Code End
  }

  // RM Code Start
  var eventCodeLines = ["# system event handlers"];
  for (var name in Blockly.JavaScript.systemEvents_) {
    var sysEvent = Blockly.JavaScript.systemEvents_[name];
    for (var funcId in sysEvent.functions) {
      var func = sysEvent.functions[funcId];
      eventCodeLines.push(`${sysEvent.setter}(${func})`);
    }
  }
  if (eventCodeLines.length === 1) {
    eventCodeLines = [];
  } else {
    eventCodeLines.push("# add 15ms delay to make sure events are registered correctly.");
    eventCodeLines.push("wait(15, MSEC)");
  }
  // RM Code End

  // Clean up temporary data.
  delete Blockly.JavaScript.definitions_;
  delete Blockly.JavaScript.functionNames_;
  // RM Code Start
  delete Blockly.JavaScript.systemEvents_;
  delete Blockly.JavaScript.mainFunctions_;
  // RM Code End
  Blockly.JavaScript.variableDB_.reset();
  
  // RM Code Start
  // Build the actual output
  var outputSections = [
    variables,
    definitions.join('\n'),
    Blockly.JavaScript.preEventRegistration || "",
    eventCodeLines.join("\n"),
    Blockly.JavaScript.postEventRegistration || "",
    mainFunctionCalls.join('\n'),
  ];

  var allDefs = outputSections.join('\n\n');
  return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n').replace(/\t/g, Blockly.JavaScript.INDENT);
  // RM Code End
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.JavaScript.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped JavaScript string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} JavaScript string.
 * @private
 */
Blockly.JavaScript.quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Encode a string as a properly escaped multiline JavaScript string, complete
 * with quotes.
 * @param {string} string Text to encode.
 * @return {string} JavaScript string.
 * @private
 */
Blockly.JavaScript.multiline_quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  var lines = string.split(/\n/g).map(Blockly.JavaScript.quote_);
  return lines.join(' + \'\\n\' +\n');
};

/**
 * Common tasks for generating JavaScript from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The JavaScript code created for this block.
 * @param {boolean=} opt_thisOnly True to generate code for only this statement.
 * @return {string} JavaScript code with comments and subsequent blocks added.
 * @private
 */
Blockly.JavaScript.scrub_ = function(block, code, opt_thisOnly) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      comment = Blockly.utils.string.wrap(comment,
          Blockly.JavaScript.COMMENT_WRAP - 3);
      commentCode += Blockly.JavaScript.prefixLines(comment + '\n', '// ');
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          comment = Blockly.JavaScript.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.JavaScript.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  
  // RM code start
  if (block.isHatBlock() && block.previousConnection === null) {
    return commentCode + code;
  }
  // RM code end

  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = opt_thisOnly ? '' : Blockly.JavaScript.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value while taking into account indexing.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @param {number=} opt_order The highest order acting on this value.
 * @return {string|number}
 */
Blockly.JavaScript.getAdjusted = function(block, atId, opt_delta, opt_negate,
    opt_order) {
  var delta = opt_delta || 0;
  var order = opt_order || Blockly.JavaScript.ORDER_NONE;
  if (block.workspace.options.oneBasedIndex) {
    delta--;
  }
  var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
  if (delta > 0) {
    var at = Blockly.JavaScript.valueToCode(block, atId,
        Blockly.JavaScript.ORDER_ADDITION) || defaultAtIndex;
  } else if (delta < 0) {
    var at = Blockly.JavaScript.valueToCode(block, atId,
        Blockly.JavaScript.ORDER_SUBTRACTION) || defaultAtIndex;
  } else if (opt_negate) {
    var at = Blockly.JavaScript.valueToCode(block, atId,
        Blockly.JavaScript.ORDER_UNARY_NEGATION) || defaultAtIndex;
  } else {
    var at = Blockly.JavaScript.valueToCode(block, atId, order) ||
        defaultAtIndex;
  }

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = Number(at) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = at + ' + ' + delta;
      var innerOrder = Blockly.JavaScript.ORDER_ADDITION;
    } else if (delta < 0) {
      at = at + ' - ' + -delta;
      var innerOrder = Blockly.JavaScript.ORDER_SUBTRACTION;
    }
    if (opt_negate) {
      if (delta) {
        at = '-(' + at + ')';
      } else {
        at = '-' + at;
      }
      var innerOrder = Blockly.JavaScript.ORDER_UNARY_NEGATION;
    }
    innerOrder = Math.floor(innerOrder);
    order = Math.floor(order);
    if (innerOrder && order >= innerOrder) {
      at = '(' + at + ')';
    }
  }
  return at;
};

//#region RM code
/**
 * add a driver event to the generated code
 * @param block The block starting the stack.
 * @param name the name of the event
 * @param branch the branch code for the event
 * @param eventSetter the code called to tell the event to call the function
 */
Blockly.JavaScript.addDriverEventFunction = function(block, name, branch, eventSetter) {
  if (!Blockly.JavaScript.driverEvents_[name]) {
    Blockly.JavaScript.driverEvents_[name] = {
      setter: eventSetter,
      functions: [],
    };
  }
  
  var count = Blockly.JavaScript.driverEvents_[name].functions.length;

  var funcName = Blockly.JavaScript.variableDB_.getDistinctName("ondriver_" + name + "_" + count, Blockly.Procedures.NAME_TYPE);

  if (Blockly.JavaScript.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.JavaScript.prefixLines(
      Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.JavaScript.INDENT) + branch;
  }
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }
  var code = 'function ' + funcName + '() {\n' + branch +'\n}\n';
  code = Blockly.JavaScript.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.JavaScript.definitions_['%' + funcName] = code;

  Blockly.JavaScript.driverEvents_[name].functions.push(funcName);
  return null;
};

/**
 * add a auton event to the generated code
 * @param block The block starting the stack.
 * @param name the name of the event
 * @param branch the branch code for the event
 * @param eventSetter the code called to tell the event to call the function
 */
Blockly.JavaScript.addAutonEventFunction = function(block, name, branch, eventSetter) {
  if (!Blockly.JavaScript.autonEvents_[name]) {
    Blockly.JavaScript.autonEvents_[name] = {
      setter: eventSetter,
      functions: [],
    };
  }
  
  var count = Blockly.JavaScript.autonEvents_[name].functions.length;

  var funcName = Blockly.JavaScript.variableDB_.getDistinctName("onauton_" + name + "_" + count, Blockly.Procedures.NAME_TYPE);

  if (Blockly.JavaScript.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.JavaScript.prefixLines(
      Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.JavaScript.INDENT) + branch;
  }
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }
  var code = 'function ' + funcName + '() {\n' + branch +'\n}\n';
  code = Blockly.JavaScript.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.JavaScript.definitions_['%' + funcName] = code;

  Blockly.JavaScript.autonEvents_[name].functions.push(funcName);
  return null;
};

/**
 * add a system (hardware) event to the generated code
 * @param block The block starting the stack.
 * @param name the name of the event
 * @param branch the branch code for the event
 * @param eventSetter the code called to tell the event to call the function
 */
Blockly.JavaScript.addSystemEventFunction = function(block, name, branch, eventSetter) {
  if (!Blockly.JavaScript.systemEvents_[name]) {
    Blockly.JavaScript.systemEvents_[name] = {
      setter: eventSetter,
      functions: [],
    };
  }
  
  var count = Blockly.JavaScript.systemEvents_[name].functions.length;

  var funcName = Blockly.JavaScript.variableDB_.getDistinctName("onevent_" + name + "_" + count, Blockly.Procedures.NAME_TYPE);

  if (Blockly.JavaScript.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.JavaScript.prefixLines(
      Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.JavaScript.INDENT) + branch;
  }
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }
  var code = 'function ' + funcName + '() {\n' + branch +'\n}\n';
  code = Blockly.JavaScript.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.JavaScript.definitions_['%' + funcName] = code;

  Blockly.JavaScript.systemEvents_[name].functions.push(funcName);
  return null;
};

/**
 * add a system (hardware) event to the generated code
 * @param block The block starting the stack.
 * @param name the name of the event
 * @param branch the branch code for the event
 * @param eventSetter the code called to tell the event to call the function
 * @param arg the argument of the event
 */
Blockly.JavaScript.addSystemEventArgumentFunction = function(block, name, branch, eventSetter, arg) {
  if (!Blockly.JavaScript.systemEvents_[name]) {
    Blockly.JavaScript.systemEvents_[name] = {
      setter: eventSetter,
      functions: []
    };
  }
  
  var count = Blockly.JavaScript.systemEvents_[name].functions.length;

  var funcName = Blockly.JavaScript.variableDB_.getDistinctName("onevent_" + name + "_" + count, Blockly.Procedures.NAME_TYPE);

  if (Blockly.JavaScript.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.JavaScript.prefixLines(
      Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.JavaScript.INDENT) + branch;
  }
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }
  var code = 'function ' + funcName + '() {\n' + branch +'\n}\n';
  code = Blockly.JavaScript.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.JavaScript.definitions_['%' + funcName] = code;
  funcName = `${funcName}, ${arg} `;
  Blockly.JavaScript.systemEvents_[name].functions.push(funcName);
  return null;
};

/**
 * add a user event (broadcast message) to the generated code
 * @param block The block starting the stack.
 * @param name the name of the event
 * @param branch the branch code for the event
 * @param eventSetter the code called to tell the event to call the function
 */
Blockly.JavaScript.addUserEventFunction = function(block, name, branch, eventSetter) {
  if (!Blockly.JavaScript.systemEvents_[name]) {
    Blockly.JavaScript.systemEvents_[name] = {
      setter: eventSetter,
      functions: [],
    };
  }
  
  var count = Blockly.JavaScript.systemEvents_[name].functions.length;

  var funcName = Blockly.JavaScript.variableDB_.getDistinctName("onevent_" + name + "_" + count, Blockly.Procedures.NAME_TYPE);

  if (Blockly.JavaScript.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.JavaScript.prefixLines(
      Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.JavaScript.INDENT) + branch;
  }
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }
  var code = 'function ' + funcName + '() {\n' + branch +'\n}\n';
  code = Blockly.JavaScript.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.JavaScript.definitions_['%' + funcName] = code;

  Blockly.JavaScript.systemEvents_[name].functions.push(funcName);
  return null;
};

/**
 * add a when started function to the generated code
 * @param block The block starting the stack.
 * @param branch the branch code for the event
 */
Blockly.JavaScript.addWhenStartedFunction = function(block, branch) {
  const number = Blockly.JavaScript.mainFunctions_.length + 1;
  const name = `when_started${number}`;

  const funcName = Blockly.JavaScript.variableDB_.getDistinctName(name, Blockly.Procedures.NAME_TYPE);

  if (Blockly.JavaScript.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.JavaScript.prefixLines(
      Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.JavaScript.INDENT) + branch;
  }
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }
  var code = 'function ' + funcName + '() {\n' + branch +'\n}\n';
  code = Blockly.JavaScript.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.JavaScript.definitions_['%' + funcName] = code;

  Blockly.JavaScript.mainFunctions_.push(funcName);
  return null;
};


Blockly.JavaScript.switchComment = function(block) {
  return Blockly.JavaScript.STATEMENT_PREFIX && ` #Block ID: "${block.id}"` || "";
}


//#endregion RM code