/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating JavaScript for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.CPP');

goog.require('Blockly.Generator');


/**
 * CPP code generator.
 * @type {!Blockly.Generator}
 */
Blockly.CPP = new Blockly.Generator('CPP');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.CPP.addReservedWords(
  //https://www.tutorialspoint.com/Cplusplus-Keywords
  [
    "alignas", "alignof", "and", "and_eq", "asm", "atomic_cancel", "atomic_commit",
    "atomic_noexcept", "auto", "bitand", "bitor", "bool", "break", "case", "catch",
    "char", "char16_t", "char32_t", "class", "compl", "concept", "const", "constexpr",
    "const_cast", "continue", "co_await", "co_return", "co_yield", "decltype", "default",
    "delete", "do", "double", "dynamic_cast", "else", "enum", "explicit", "export",
    "extern", "false", "float", "for", "friend", "goto", "if", "import", "inline",
    "inline", "int", "long", "module", "mutable", "namespace", "new", "noexcept",
    "not", "not_eq", "nullptr", "operator", "or", "or_eq", "private", "protected",
    "public", "register", "reinterpret_cast", "requires", "return", "short", "signed",
    "sizeof", "static", "static_assert", "static_cast", "struct", "switch", "synchronized",
    "template", "this", "thread_local", "throw", "true", "try", "typedef", "typeid",
    "typename", "union", "unsigned", "using", "virtual", "void", "volatile", "wchar_t",
    "while", "xor", "xor_eq",

    // // vex keywords
    // "vex", "colorsensor", "gyro", "color", "touchled", "distance", "sonar", "vision", "motor"
  ].join(",")
);

/**
 * Order of operation ENUMs.
 * https://en.cppreference.com/w/cpp/language/operator_precedence
 */
Blockly.CPP.ORDER_ATOMIC = 0;               // 0 "" ...

Blockly.CPP.ORDER_SCOPE_RESOLUTION = 1;     // ::

Blockly.CPP.ORDER_MEMBER = 2;               // . ->
Blockly.CPP.ORDER_FUNCTION_CALL = 2;        // ()
Blockly.CPP.ORDER_SUBSCRIPT = 2;            // []
Blockly.CPP.ORDER_FUNCTIONAL_CAST = 2;      // type() type{}

Blockly.CPP.ORDER_INCREMENT = 3;            // ++
Blockly.CPP.ORDER_DECREMENT = 3;            // --
Blockly.CPP.ORDER_UNARY_PLUS = 3;           // +
Blockly.CPP.ORDER_UNARY_NEGATION = 3;       // -
Blockly.CPP.ORDER_LOGICAL_NOT = 3;          // !
Blockly.CPP.ORDER_BITWISE_NOT = 3;          // ~
Blockly.CPP.ORDER_C_CAST = 3;               // (type)
Blockly.CPP.ORDER_INDIRECTION = 3;          // *a
Blockly.CPP.ORDER_ADDRESS_OF = 3;           // &a
Blockly.CPP.ORDER_SIZE_OF = 3;              // sizeof
Blockly.CPP.ORDER_DYNAMIC_MEM_ALLOC = 3;    // new a[]
Blockly.CPP.ORDER_DYNAMIC_MEM_DEALLOC = 3;  // delete a[]

Blockly.CPP.ORDER_POINTER = 4;          // .* ->*

Blockly.CPP.ORDER_MULTIPLICATION = 5;   // *
Blockly.CPP.ORDER_DIVISION = 5;         // /
Blockly.CPP.ORDER_MODULUS = 5;          // %

Blockly.CPP.ORDER_ADDITION = 6;         // +
Blockly.CPP.ORDER_SUBTRACTION = 6;      // -

Blockly.CPP.ORDER_BITWISE_SHIFT = 7;    // << >>

Blockly.CPP.ORDER_THREE_WAY_COMP = 8;   // <=>

Blockly.CPP.ORDER_RELATIONAL = 9;       // < <= > >=

Blockly.CPP.ORDER_EQUALITY = 10;         // == != 

Blockly.CPP.ORDER_BITWISE_AND = 11;     // &

Blockly.CPP.ORDER_BITWISE_XOR = 12;     // ^

Blockly.CPP.ORDER_BITWISE_OR = 13;      // |

Blockly.CPP.ORDER_LOGICAL_AND = 14;     // &&

Blockly.CPP.ORDER_LOGICAL_OR = 15;      // ||

Blockly.CPP.ORDER_CONDITIONAL = 16;     // ?:
Blockly.CPP.ORDER_THROW = 16;           // throw
Blockly.CPP.ORDER_ASSIGNMENT = 16;      // = += -= *= /= %= <<= >>= ...

Blockly.CPP.ORDER_COMMA = 17;           // ,

Blockly.CPP.ORDER_NONE = 99;            // (...)

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.CPP.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.CPP.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.CPP.functionNames_ = Object.create(null);

  Blockly.CPP.systemEvents_ = Object.create(null);

  Blockly.CPP.driverEvents_ = Object.create(null);
  Blockly.CPP.autonEvents_ = Object.create(null);

  Blockly.CPP.procedurePrototypes_ = Object.create(null);

  // Create an array of when started functions.
  Blockly.CPP.mainFunctions_ = [];

  if (!Blockly.CPP.variableDB_) {
    Blockly.CPP.variableDB_ =
        new Blockly.Names(Blockly.CPP.RESERVED_WORDS_);
  } else {
    Blockly.CPP.variableDB_.reset();
  }

  Blockly.CPP.variableDB_.setVariableMap(workspace.getVariableMap());

  var defvars = [];
  var defints = [];
  var defbools = [];
  var deflistvars = [];
  var defevents = [];

  // Add developer variables (not created or named by the user).
  var devVarList = Blockly.Variables.allDeveloperVariablesData(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    var devVar = devVarList[i];
    if (devVar && typeof devVar === 'object' && devVar.name) {
      var varName = Blockly.CPP.variableDB_.getName(
        devVar.name,
        Blockly.Variables.DEVELOPER_VARIABLE_TYPE
      );
      console.warn("found dev var", varName, devVar);
      if (devVar.type !== null && devVar.type !== undefined) {
        if (devVar.type === Blockly.LIST_VARIABLE_TYPE) {
          deflistvars.push(`float ${varName}[${devVar.arrayLength}];`);
        } else if (devVar.type === Blockly.ARRAY2D_VARIABLE_TYPE) {
          deflistvars.push(`float ${varName}[${devVar.arrayLength}][${devVar.arrayWidth}];`);
        } else if (devVar.type === Blockly.BOOL_VARIABLE_TYPE) {
          defbools.push(varName + ' = False');
        } else if (devVar.type === Blockly.BROADCAST_MESSAGE_VARIABLE_TYPE) {
          defevents.push(varName);
        } else if (devVar.type === "int") {
          defints.push(varName + ' = 0');
        } else {
          defvars.push(varName + ' = 0');
        }
      } else if (devVar.initValue) {
        defvars.push(varName + ' = ' + devVar.initValue);
      } else {
        defvars.push(varName);
      }
    } else {
      defvars.push(varName);
    }
  }  
  
  // Add user variables.
  var variables = workspace.getAllVariables();
  for (var i = 0; i < variables.length; i++) {
    var variable = variables[i];
    if (variable.type === Blockly.LIST_VARIABLE_TYPE) {
      var varName = Blockly.CPP.variableDB_.getName(
        variable.getId(),
        Blockly.Variables.NAME_TYPE
      );
      deflistvars.push(`float ${varName}[${variable.arrayLength}];`);
    } else if (variable.type === Blockly.ARRAY2D_VARIABLE_TYPE) {
      var varName = Blockly.CPP.variableDB_.getName(
        variable.getId(),
        Blockly.Variables.NAME_TYPE
      );
      deflistvars.push(`float ${varName}[${variable.arrayLength}][${variable.arrayWidth}];`);
    } else if (variable.type === Blockly.BOOL_VARIABLE_TYPE) {
      var varName = Blockly.CPP.variableDB_.getName(
        variable.id_,
        Blockly.Variables.NAME_TYPE
      );
      defbools.push(varName);
    } else if (variable.type === Blockly.BROADCAST_MESSAGE_VARIABLE_TYPE) {
      defevents.push(variable);
    } else {
      defvars.push(Blockly.CPP.variableDB_.getName(
        variable.getId(),
        Blockly.Variables.NAME_TYPE
      ));
    }
  }

  // Declare all of the variables.
  if (defints.length) {
    Blockly.CPP.definitions_['int_variables'] =
        'int ' + defints.join(', ') + ';';
  }
  if (defvars.length) {
    Blockly.CPP.definitions_['variables'] =
        'float ' + defvars.join(', ') + ';';
  }
  if (defbools.length) {
    Blockly.CPP.definitions_['bool_variables'] =
        'bool ' + defbools.join(', ') + ';';
  }
  if (deflistvars.length) {
    Blockly.CPP.definitions_['list_variables'] = deflistvars.join('\n');
  }

  if (defevents.length) {
    const eventvars = defevents.map((variable) => {
      const name = Blockly.CPP.variableDB_.getName(variable.getId(), Blockly.Variables.NAME_TYPE);
      return `event ${name} = event();`;
    })
    Blockly.CPP.definitions_['event_variables'] = eventvars.join('\n');
  }

  let hasRandom = false;
  const blocks = workspace.getAllBlocks();
  blocks.forEach((block) => {

    const type = block.type;
    if (type.endsWith("_operator_random")) {
      hasRandom = true;
    }
  });

  Blockly.CPP.hasRandom = hasRandom;
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.CPP.finish = function(code) {

  let mainFunction = "";
  const mainFunctionCalls = [];
  if (Blockly.CPP.mainFunctions_.length) {
    for (var i = 0; i < Blockly.CPP.mainFunctions_.length; i++) {
      const func = Blockly.CPP.mainFunctions_[i];
      if (i === 0) {
        mainFunction = Blockly.CPP.INDENT + `${func}();\n`;
      } else {
        mainFunctionCalls.push(Blockly.CPP.INDENT + `vex::task ws${i}(${func});`);
      }
    }
  }

  // build prototypes
  var prototypes = [];
  for (var name in Blockly.CPP.procedurePrototypes_) {
    prototypes.push(Blockly.CPP.procedurePrototypes_[name] + ";");
  }

  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.CPP.definitions_) {
    const def = Blockly.CPP.definitions_[name];
    if (typeof def === "object" && def.ishidden) {
      console.log("skipping hidden function");
    } else {
      definitions.push(def);
    }
  }

  var eventCodeLines = [];
  for (var name in Blockly.CPP.systemEvents_) {
    var sysEvent = Blockly.CPP.systemEvents_[name];
    for (var funcId in sysEvent.functions) {
      var func = sysEvent.functions[funcId];
      eventCodeLines.push(Blockly.CPP.INDENT + sysEvent.setter + "(" + func + ");");
    }
  }
  if (eventCodeLines.length > 0) {
    eventCodeLines.splice(0, 0, Blockly.CPP.INDENT + "// register event handlers");
  }
  var eventCode = eventCodeLines.join("\n");
  var hasCompetition = (Object.entries(Blockly.CPP.driverEvents_).length > 0) ||
  (Object.entries(Blockly.CPP.autonEvents_).length > 0) ? true : false;
  
  var autonCodeLines = [];
  for (var name in Blockly.CPP.autonEvents_) {
    // console.log("auton event ", name);
    var autonEvent = Blockly.CPP.autonEvents_[name];
    // console.log(autonEvent);
    for (var funcID in autonEvent.functions) {
      var func = autonEvent.functions[funcID];
      // console.log("pushing ", func);
      autonCodeLines.push(func);
    }
  }
  // console.log(autonCode);

  var driveCodeLines = [];
  for (var name in Blockly.CPP.driverEvents_) {
    // console.log("driver event ", name);
    var driveEvent = Blockly.CPP.driverEvents_[name];
    // console.log(driveEvent);
    for (var funcID in driveEvent.functions) {
      var func = driveEvent.functions[funcID];
      // console.log("pushing ", func);
      driveCodeLines.push(func);
    }
  }
  // var driverCode = driveCodeLines.join("\n");
  // console.log(driverCode);
  var competitionSetter = "";
  var competitionTasks = "";
  if (hasCompetition) {

    competitionSetter = Blockly.CPP.INDENT + "vex::competition::bStopTasksBetweenModes = false;\n" +
    Blockly.CPP.INDENT + "Competition.autonomous(VEXcode_auton_task);\n" +
    Blockly.CPP.INDENT + "Competition.drivercontrol(VEXcode_driver_task);";

    var driverTasks = "";
    var driveStop = "";
    var autonTasks = "";
    var autonStop = "";
    var taskDriveSetters = [];
    var taskDriveStoppers = [];
    var taskAutonSetters = [];
    var taskAutonStoppers = [];
    for (var i = 0; i < driveCodeLines.length; i++) {
      var line = "vex::task "+ "drive" +i+ "(" + driveCodeLines[i] + ");";
      taskDriveSetters.push(line);
      var stop = "drive" + i + ".stop();";
      taskDriveStoppers.push(stop);
    }
    driverTasks = taskDriveSetters.join("\n");
    driveStop = taskDriveStoppers.join("\n");

    for (var i = 0; i < autonCodeLines.length; i++) {
      var line = "vex::task " + "auto"+ i + "(" + autonCodeLines[i] + ");";
      taskAutonSetters.push(line);
      var stop = "auto" +i+".stop();";
      taskAutonStoppers.push(stop);
    }
    autonTasks = taskAutonSetters.join("\n");
    autonStop = taskAutonStoppers.join("\n");

    const rcStart = Blockly.CPP.RC_TASK_START ? "\n" + Blockly.CPP.INDENT + Blockly.CPP.RC_TASK_START : "";
    const rcStop = Blockly.CPP.RC_TASK_STOP ? "\n" + Blockly.CPP.INDENT + Blockly.CPP.RC_TASK_STOP : "";

    competitionTasks =
    "\n\nvoid VEXcode_driver_task() {\n" +
    Blockly.CPP.INDENT + "// Start the driver control tasks....\n" +
    Blockly.CPP.INDENT + driverTasks + rcStart + "\n" +
    Blockly.CPP.INDENT + "while(Competition.isDriverControl() && Competition.isEnabled()) {this_thread::sleep_for(10);}\n" +
    Blockly.CPP.INDENT + driveStop + rcStop + "\n" +
    Blockly.CPP.INDENT + "return;\n}\n\n" +
    "void VEXcode_auton_task() {\n" +
    Blockly.CPP.INDENT + "// Start the auton control tasks....\n" +
    Blockly.CPP.INDENT + autonTasks + "\n" +
    Blockly.CPP.INDENT + "while(Competition.isAutonomous() && Competition.isEnabled()) {this_thread::sleep_for(10);}\n" +
    Blockly.CPP.INDENT + autonStop + "\n" +
    Blockly.CPP.INDENT + "return;\n}\n";
  }

  const randInit = [
    "// initialize the random number system",
    "srand(Brain.Timer.system());"
  ].map(l => Blockly.CPP.INDENT + l).join("\n");

  const drivetrainCalibrate = Blockly.CPP.INDENT + Blockly.CPP.DRIVETRAIN_CALIBRATE;

  // Clean up temporary data.
  delete Blockly.CPP.definitions_;
  delete Blockly.CPP.functionNames_;
  delete Blockly.CPP.systemEvents_;
  Blockly.CPP.variableDB_.reset();
  var main = "";
  main = "int main() {\n" + 
    (competitionSetter ? competitionSetter + "\n\n" : "") +
    (Blockly.CPP.hasRandom ? randInit + "\n\n" : "") + 
    (drivetrainCalibrate.trim() ? drivetrainCalibrate + "\n\n" : "") + 
    (Blockly.CPP.preEventRegistration ? Blockly.CPP.INDENT + "// pre event registration\n" : "") +
    Blockly.CPP.preEventRegistration +
    (eventCode ? eventCode + "\n\n" : "") + 
    (eventCode ? Blockly.CPP.INDENT + "wait(15, msec);\n" : "") +
    (Blockly.CPP.postEventRegistration ? Blockly.CPP.INDENT + "// post event registration\n" : "") +
    Blockly.CPP.postEventRegistration +
    (code.trim() ? code + "\n" : "") + 
    (mainFunctionCalls.length > 0 ? mainFunctionCalls.join("\n") + "\n" : "") +
    mainFunction +
    "}";

  return  prototypes.join("\n") + "\n\n" + definitions.join('\n\n') + competitionTasks + '\n\n\n' + main;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.CPP.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped JavaScript string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} JavaScript string.
 * @private
 */
Blockly.CPP.quote_ = function(string) {
  string = string.replace(/\\/g, '\\\\')
    .replace(/'/g, '\\\'')
    .replace(/"/g, '\\\"')
    .replace(/\?/g, '\\?');
  string = string.replace(/\\\\n/g, '\\n');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating JavaScript from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The JavaScript code created for this block.
 * @return {string} JavaScript code with comments and subsequent blocks added.
 * @private
 */
Blockly.CPP.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      comment = Blockly.utils.string.wrap(comment, Blockly.CPP.COMMENT_WRAP - 3);
      if (block.getProcedureDef) {
        // Use a comment block for function comments.
        commentCode += '/**\n' +
                       Blockly.CPP.prefixLines(comment + '\n', ' * ') +
                       ' */\n';
      } else {
        commentCode += Blockly.CPP.prefixLines(comment + '\n', '// ');
      }
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.CPP.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.CPP.prefixLines(comment, '// ');
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
  var nextCode = Blockly.CPP.blockToCode(nextBlock);
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
Blockly.CPP.getAdjusted = function(block, atId, opt_delta, opt_negate,
    opt_order) {
  var delta = opt_delta || 0;
  var order = opt_order || Blockly.CPP.ORDER_NONE;
  if (block.workspace.options.oneBasedIndex) {
    delta--;
  }
  var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
  if (delta > 0) {
    var at = Blockly.CPP.valueToCode(block, atId,
        Blockly.CPP.ORDER_ADDITION) || defaultAtIndex;
  } else if (delta < 0) {
    var at = Blockly.CPP.valueToCode(block, atId,
        Blockly.CPP.ORDER_SUBTRACTION) || defaultAtIndex;
  } else if (opt_negate) {
    var at = Blockly.CPP.valueToCode(block, atId,
        Blockly.CPP.ORDER_UNARY_NEGATION) || defaultAtIndex;
  } else {
    var at = Blockly.CPP.valueToCode(block, atId, order) ||
        defaultAtIndex;
  }

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = parseFloat(at) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = at + ' + ' + delta;
      var innerOrder = Blockly.CPP.ORDER_ADDITION;
    } else if (delta < 0) {
      at = at + ' - ' + -delta;
      var innerOrder = Blockly.CPP.ORDER_SUBTRACTION;
    }
    if (opt_negate) {
      if (delta) {
        at = '-(' + at + ')';
      } else {
        at = '-' + at;
      }
      var innerOrder = Blockly.CPP.ORDER_UNARY_NEGATION;
    }
    innerOrder = Math.floor(innerOrder);
    order = Math.floor(order);
    if (innerOrder && order >= innerOrder) {
      at = '(' + at + ')';
    }
  }
  return at;
};

Blockly.CPP.addDriverEventFunction = function(block, name, branch, eventSetter) {
  if (!Blockly.CPP.driverEvents_[name]) {
    Blockly.CPP.driverEvents_[name] = {
      setter: eventSetter,
      functions: [],
    };
  }
  
  var count = Blockly.CPP.driverEvents_[name].functions.length;

  var funcName = Blockly.CPP.variableDB_.getDistinctName("ondriver_" + name + "_" + count, Blockly.Procedures.NAME_TYPE);

  if (Blockly.CPP.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.CPP.prefixLines(
      Blockly.CPP.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.CPP.INDENT) + branch;
  }
  if (Blockly.CPP.INFINITE_LOOP_TRAP) {
    branch = Blockly.CPP.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }
  var code = '// "when driver control" hat block ' + '\n' + 'int ' + funcName + '() {\n' + branch + Blockly.CPP.INDENT + 'return 0;\n}';
  code = Blockly.CPP.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.CPP.definitions_['%' + funcName] = code;

  Blockly.CPP.driverEvents_[name].functions.push(funcName);
  return null;
};
Blockly.CPP.addAutonEventFunction = function(block, name, branch, eventSetter) {
  if (!Blockly.CPP.autonEvents_[name]) {
    Blockly.CPP.autonEvents_[name] = {
      setter: eventSetter,
      functions: [],
    };
  }
  
  var count = Blockly.CPP.autonEvents_[name].functions.length;

  var funcName = Blockly.CPP.variableDB_.getDistinctName("onauton_" + name + "_" + count, Blockly.Procedures.NAME_TYPE);

  if (Blockly.CPP.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.CPP.prefixLines(
      Blockly.CPP.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.CPP.INDENT) + branch;
  }
  if (Blockly.CPP.INFINITE_LOOP_TRAP) {
    branch = Blockly.CPP.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }
  var code = '// "when autonomous" hat block ' + '\n' + 'int ' + funcName + '() {\n' + branch + Blockly.CPP.INDENT + 'return 0;\n}';
  code = Blockly.CPP.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.CPP.definitions_['%' + funcName] = code;

  Blockly.CPP.autonEvents_[name].functions.push(funcName);
  return null;
};
Blockly.CPP.addSystemEventFunction = function(block, name, branch, eventSetter) {
  if (!Blockly.CPP.systemEvents_[name]) {
    Blockly.CPP.systemEvents_[name] = {
      setter: eventSetter,
      functions: [],
    };
  }
  
  var count = Blockly.CPP.systemEvents_[name].functions.length;

  var funcName = Blockly.CPP.variableDB_.getDistinctName("onevent_" + name + "_" + count, Blockly.Procedures.NAME_TYPE);

  if (Blockly.CPP.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.CPP.prefixLines(
      Blockly.CPP.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.CPP.INDENT) + branch;
  }
  if (Blockly.CPP.INFINITE_LOOP_TRAP) {
    branch = Blockly.CPP.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }

  var comment = name.toLowerCase().includes("controller") ? `${eventSetter.split('.').join(' ')}`: name.replace(/_/g, ' ');

  var code = `// "when ${comment}" hat block ` + '\n' + 'void ' + funcName + '() {\n' + branch + '}';
  code = Blockly.CPP.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.CPP.definitions_['%' + funcName] = code;

  Blockly.CPP.systemEvents_[name].functions.push(funcName);
  return null;
};

Blockly.CPP.addSystemEventArgumentFunction = function(block, name, branch, eventSetter, arg) {
  if (!Blockly.CPP.systemEvents_[name]) {
    Blockly.CPP.systemEvents_[name] = {
      setter: eventSetter,
      functions: []
    };
  }
  
  var count = Blockly.CPP.systemEvents_[name].functions.length;

  var funcName = Blockly.CPP.variableDB_.getDistinctName("onevent_" + name + "_" + count, Blockly.Procedures.NAME_TYPE);

  if (Blockly.CPP.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.CPP.prefixLines(
      Blockly.CPP.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.CPP.INDENT) + branch;
  }
  if (Blockly.CPP.INFINITE_LOOP_TRAP) {
    branch = Blockly.CPP.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }
  var code = `// "when ${name.replace(/_/g, ' ')}" hat block ` + '\n' + 'void ' + funcName + '() {\n' + branch + '}';
  code = Blockly.CPP.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.CPP.definitions_['%' + funcName] = code;
  funcName = funcName + "," + arg;
  Blockly.CPP.systemEvents_[name].functions.push(funcName);
  return null;
};

Blockly.CPP.addUserEventFunction = function(block, name, branch, eventSetter) {
  if (!Blockly.CPP.systemEvents_[name]) {
    Blockly.CPP.systemEvents_[name] = {
      setter: eventSetter,
      functions: [],
    };
  }
  
  var count = Blockly.CPP.systemEvents_[name].functions.length;

  var funcName = Blockly.CPP.variableDB_.getDistinctName("onevent_" + name + "_" + count, Blockly.Procedures.NAME_TYPE);

  if (Blockly.CPP.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.CPP.prefixLines(
      Blockly.CPP.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.CPP.INDENT) + branch;
  }
  if (Blockly.CPP.INFINITE_LOOP_TRAP) {
    branch = Blockly.CPP.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }
  var code = `// "when I receive ${name}" hat block ` + '\n' + 'void ' + funcName + '() {\n' + branch + '}';
  code = Blockly.CPP.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.CPP.definitions_['%' + funcName] = code;

  Blockly.CPP.systemEvents_[name].functions.push(funcName);
  return null;
};

Blockly.CPP.addWhenStartedFunction = function(block, branch) {
  const number = Blockly.CPP.mainFunctions_.length + 1;
  const name = `whenStarted${number}`;

  const funcName = Blockly.CPP.variableDB_.getDistinctName(name, Blockly.Procedures.NAME_TYPE);

  if (Blockly.CPP.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.CPP.prefixLines(
      Blockly.CPP.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.CPP.INDENT) + branch;
  }
  if (Blockly.CPP.INFINITE_LOOP_TRAP) {
    branch = Blockly.CPP.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }
  var code = '// "when started" hat block ' + '\n' + 'int ' + funcName + '() {\n' + branch + Blockly.CPP.INDENT + 'return 0;\n}';
  code = Blockly.CPP.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.CPP.definitions_['%' + funcName] = code;

  Blockly.CPP.mainFunctions_.push(funcName);
  return null;
};