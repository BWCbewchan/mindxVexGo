/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Helper functions for generating Python for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Python');

goog.require('Blockly.Generator');
goog.require('Blockly.utils.string');


/**
 * Python code generator.
 * @type {!Blockly.Generator}
 */
Blockly.Python = new Blockly.Generator('Python');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Python.addReservedWords(
    // import keyword
    // print(','.join(sorted(keyword.kwlist)))
    // https://docs.python.org/3/reference/lexical_analysis.html#keywords
    // https://docs.python.org/2/reference/lexical_analysis.html#keywords
    'False,None,True,and,as,assert,break,class,continue,def,del,elif,else,' +
    'except,exec,finally,for,from,global,if,import,in,is,lambda,nonlocal,not,' +
    'or,pass,print,raise,return,try,while,with,yield,' +
    // https://docs.python.org/3/library/constants.html
    // https://docs.python.org/2/library/constants.html
    'NotImplemented,Ellipsis,__debug__,quit,exit,copyright,license,credits,' +
    // >>> print(','.join(sorted(dir(__builtins__))))
    // https://docs.python.org/3/library/functions.html
    // https://docs.python.org/2/library/functions.html
    'ArithmeticError,AssertionError,AttributeError,BaseException,' +
    'BlockingIOError,BrokenPipeError,BufferError,BytesWarning,' +
    'ChildProcessError,ConnectionAbortedError,ConnectionError,' +
    'ConnectionRefusedError,ConnectionResetError,DeprecationWarning,EOFError,' +
    'Ellipsis,EnvironmentError,Exception,FileExistsError,FileNotFoundError,' +
    'FloatingPointError,FutureWarning,GeneratorExit,IOError,ImportError,' +
    'ImportWarning,IndentationError,IndexError,InterruptedError,' +
    'IsADirectoryError,KeyError,KeyboardInterrupt,LookupError,MemoryError,' +
    'ModuleNotFoundError,NameError,NotADirectoryError,NotImplemented,' +
    'NotImplementedError,OSError,OverflowError,PendingDeprecationWarning,' +
    'PermissionError,ProcessLookupError,RecursionError,ReferenceError,' +
    'ResourceWarning,RuntimeError,RuntimeWarning,StandardError,' +
    'StopAsyncIteration,StopIteration,SyntaxError,SyntaxWarning,SystemError,' +
    'SystemExit,TabError,TimeoutError,TypeError,UnboundLocalError,' +
    'UnicodeDecodeError,UnicodeEncodeError,UnicodeError,' +
    'UnicodeTranslateError,UnicodeWarning,UserWarning,ValueError,Warning,' +
    'ZeroDivisionError,_,__build_class__,__debug__,__doc__,__import__,' +
    '__loader__,__name__,__package__,__spec__,abs,all,any,apply,ascii,' +
    'basestring,bin,bool,buffer,bytearray,bytes,callable,chr,classmethod,cmp,' +
    'coerce,compile,complex,copyright,credits,delattr,dict,dir,divmod,' +
    'enumerate,eval,exec,execfile,exit,file,filter,float,format,frozenset,' +
    'getattr,globals,hasattr,hash,help,hex,id,input,int,intern,isinstance,' +
    'issubclass,iter,len,license,list,locals,long,map,max,memoryview,min,' +
    'next,object,oct,open,ord,pow,print,property,quit,range,raw_input,reduce,' +
    'reload,repr,reversed,round,set,setattr,slice,sorted,staticmethod,str,' +
    'sum,super,tuple,type,unichr,unicode,vars,xrange,zip'
);

/**
 * Order of operation ENUMs.
 * http://docs.python.org/reference/expressions.html#summary
 */
Blockly.Python.ORDER_ATOMIC = 0;            // 0 "" ...
Blockly.Python.ORDER_COLLECTION = 1;        // tuples, lists, dictionaries
Blockly.Python.ORDER_STRING_CONVERSION = 1; // `expression...`
Blockly.Python.ORDER_MEMBER = 2.1;          // . []
Blockly.Python.ORDER_FUNCTION_CALL = 2.2;   // ()
Blockly.Python.ORDER_EXPONENTIATION = 3;    // **
Blockly.Python.ORDER_UNARY_SIGN = 4;        // + -
Blockly.Python.ORDER_BITWISE_NOT = 4;       // ~
Blockly.Python.ORDER_MULTIPLICATIVE = 5;    // * / // %
Blockly.Python.ORDER_ADDITIVE = 6;          // + -
Blockly.Python.ORDER_BITWISE_SHIFT = 7;     // << >>
Blockly.Python.ORDER_BITWISE_AND = 8;       // &
Blockly.Python.ORDER_BITWISE_XOR = 9;       // ^
Blockly.Python.ORDER_BITWISE_OR = 10;       // |
Blockly.Python.ORDER_RELATIONAL = 11;       // in, not in, is, is not,
                                            //     <, <=, >, >=, <>, !=, ==
Blockly.Python.ORDER_LOGICAL_NOT = 12;      // not
Blockly.Python.ORDER_LOGICAL_AND = 13;      // and
Blockly.Python.ORDER_LOGICAL_OR = 14;       // or
Blockly.Python.ORDER_CONDITIONAL = 15;      // if else
Blockly.Python.ORDER_LAMBDA = 16;           // lambda
Blockly.Python.ORDER_NONE = 99;             // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.Python.ORDER_OVERRIDES = [
  // (foo()).bar -> foo().bar
  // (foo())[0] -> foo()[0]
  [Blockly.Python.ORDER_FUNCTION_CALL, Blockly.Python.ORDER_MEMBER],
  // (foo())() -> foo()()
  [Blockly.Python.ORDER_FUNCTION_CALL, Blockly.Python.ORDER_FUNCTION_CALL],
  // (foo.bar).baz -> foo.bar.baz
  // (foo.bar)[0] -> foo.bar[0]
  // (foo[0]).bar -> foo[0].bar
  // (foo[0])[1] -> foo[0][1]
  [Blockly.Python.ORDER_MEMBER, Blockly.Python.ORDER_MEMBER],
  // (foo.bar)() -> foo.bar()
  // (foo[0])() -> foo[0]()
  [Blockly.Python.ORDER_MEMBER, Blockly.Python.ORDER_FUNCTION_CALL],

  // not (not foo) -> not not foo
  [Blockly.Python.ORDER_LOGICAL_NOT, Blockly.Python.ORDER_LOGICAL_NOT],
  // a and (b and c) -> a and b and c
  [Blockly.Python.ORDER_LOGICAL_AND, Blockly.Python.ORDER_LOGICAL_AND],
  // a or (b or c) -> a or b or c
  [Blockly.Python.ORDER_LOGICAL_OR, Blockly.Python.ORDER_LOGICAL_OR]
];

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 * @this {Blockly.Generator}
 */
Blockly.Python.init = function(workspace) {
  /**
   * Empty loops or conditionals are not allowed in Python.
   */
  Blockly.Python.PASS = this.INDENT + 'pass\n';
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Python.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Python.functionNames_ = Object.create(null);

  // RM - events and when started code need special order
  Blockly.Python.systemEvents_ = Object.create(null);
  Blockly.Python.driverEvents_ = Object.create(null);
  Blockly.Python.autonEvents_ = Object.create(null);
  Blockly.Python.mainFunctions_ = [];

  if (!Blockly.Python.variableDB_) {
    Blockly.Python.variableDB_ =
        new Blockly.Names(Blockly.Python.RESERVED_WORDS_);
  } else {
    Blockly.Python.variableDB_.reset();
  }

  Blockly.Python.variableDB_.setVariableMap(workspace.getVariableMap());

  var defvars = [];
  // Add developer variables (not created or named by the user).
  var devVarList = Blockly.Variables.allDeveloperVariablesData(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    // RM - add code for typed dev variables...
    var devVar = devVarList[i];
    if (devVar && typeof devVar === 'object' && devVar.name) {
      var varName = devVar.name;
      if (devVar.type !== null && devVar.type !== undefined) {
        if (devVar.type === Blockly.LIST_VARIABLE_TYPE) {
          defvars.push(Blockly.Python.variableDB_.getName(varName,
            Blockly.Names.DEVELOPER_VARIABLE_TYPE) + ` = [0 for x in range(${devVar.arrayLength})]`);
        } else if (devVar.type === Blockly.ARRAY2D_VARIABLE_TYPE) {
          defvars.push(Blockly.Python.variableDB_.getName(varName,
            Blockly.Names.DEVELOPER_VARIABLE_TYPE) + ` = [[0 for y in range(${devVar.arrayWidth})] for x in range(${devVar.arrayLength})]`);
        } else if (devVar.type === Blockly.BOOL_VARIABLE_TYPE) {
          defvars.push(Blockly.Python.variableDB_.getName(varName,
            Blockly.Names.DEVELOPER_VARIABLE_TYPE) + ' = False');
        } else if (devVar.type === Blockly.BROADCAST_MESSAGE_VARIABLE_TYPE) {
          // TODO: figure out event init?
          defvars.push(Blockly.Python.variableDB_.getName(varName,
            Blockly.Names.DEVELOPER_VARIABLE_TYPE) + ' = Event()');
        } else {
          defvars.push(Blockly.Python.variableDB_.getName(varName,
            Blockly.Names.DEVELOPER_VARIABLE_TYPE) + ' = 0');
        }
      } else if (devVar.initValue) {
        defvars.push(Blockly.Python.variableDB_.getName(varName,
          Blockly.Names.DEVELOPER_VARIABLE_TYPE) + ' = ' + devVar.initValue);
      } else {
        defvars.push(Blockly.Python.variableDB_.getName(varName,
          Blockly.Names.DEVELOPER_VARIABLE_TYPE) + ' = None');
      }
    } else {
      // original code start
      defvars.push(Blockly.Python.variableDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE) + ' = None');
      // end original code
    }
    // RM end
  }

  // RM code start
  var variables = [];
  if (Blockly.Python.INCLUDE_UNUSED_VARS) {
    // Add all user variables.
    variables = workspace.getAllVariables();
  } else {
    // original code start
    // Add user variables, but only ones that are being used.
    variables = Blockly.Variables.allUsedVarModels(workspace);
    // original code end
  }

  for (var i = 0; i < variables.length; i++) {
    var variable = variables[i];
    if (variable.type === Blockly.LIST_VARIABLE_TYPE) {
      defvars.push(Blockly.Python.variableDB_.getName(variable.getId(),
        Blockly.Variables.NAME_TYPE) + ` = [0 for x in range(${variable.arrayLength})]`);
    } else if (variable.type === Blockly.ARRAY2D_VARIABLE_TYPE) {
      defvars.push(Blockly.Python.variableDB_.getName(variable.getId(),
        Blockly.Variables.NAME_TYPE) + ` = [[0 for y in range(${variable.arrayWidth})] for x in range(${variable.arrayLength})]`);
    } else if (variable.type === Blockly.BOOL_VARIABLE_TYPE) {
      defvars.push(Blockly.Python.variableDB_.getName(variable.getId(),
      Blockly.Variables.NAME_TYPE) + ' = False');
    } else if (variable.type === Blockly.BROADCAST_MESSAGE_VARIABLE_TYPE) {
      // TODO: figure out event init?
      defvars.push(Blockly.Python.variableDB_.getName(variable.getId(),
        Blockly.Variables.NAME_TYPE) + ' = Event()');
    } else {
      defvars.push(Blockly.Python.variableDB_.getName(variable.getId(),
        Blockly.Variables.NAME_TYPE) + ' = 0');
    }
  }
  // RM code end

  Blockly.Python.definitions_['variables'] = defvars.join('\n');
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Python.finish = function(code) {
  // RM code start
  let mainFunction = "";
  const mainFunctionCalls = [];
  if (Blockly.Python.mainFunctions_.length) {
    for (let i = 0; i < Blockly.Python.mainFunctions_.length; i++) {
      const func = Blockly.Python.mainFunctions_[i];
      if (Blockly.Python.addMainFunctions) {
        if (i === 0) {
          mainFunction = Blockly.Python.addMainFunctions(func, i);
        } else {
          mainFunctionCalls.push(Blockly.Python.addMainFunctions(func, i));
        }
      } else {
        if (i === 0) {
          mainFunction = `${func}()`;
        } else {
          mainFunctionCalls.push(`ws${i + 1}=Thread( ${func} )`);
        }
      }
    }
  }
  mainFunctionCalls.push(mainFunction);
  // RM code end

  // Convert the definitions dictionary into a list.
  var imports = [];
  var definitions = [];
  for (var name in Blockly.Python.definitions_) {
    var def = Blockly.Python.definitions_[name];
    if (typeof def === "string" && def.match(/^(from\s+\S+\s+)?import\s+\S+/)) {
      imports.push(def);
    } else {
      // RM code start
      if (name !== 'variables') {
        if (typeof def === "object" && def.ishidden) {
          console.log("skipping hidden function");
        } else {
          // original code start
          definitions.push(def);
          // original code end
        }
      }
      // RM code end
    }
  }

  // RM code start
  let eventCodeLines = ["# system event handlers"];
  for (let name in Blockly.Python.systemEvents_) {
    let sysEvent = Blockly.Python.systemEvents_[name];
    for (let funcId in sysEvent.functions) {
      let func = sysEvent.functions[funcId];
      eventCodeLines.push(`${sysEvent.setter}(${func})`);
    }
  }
  if (eventCodeLines.length === 1) {
    eventCodeLines = [];
  } else {
    eventCodeLines.push("# add 15ms delay to make sure events are registered correctly.");
    eventCodeLines.push("wait(15, MSEC)");
  }

  let hasAuton = Object.entries(Blockly.Python.autonEvents_).length > 0;
  let hasDriver = Object.entries(Blockly.Python.driverEvents_).length > 0;
  let hasCompetition = (hasAuton || hasDriver) ? true : false;

  let autonCodeLines = [];
  for (let name in Blockly.Python.autonEvents_) {
    let autonEvent = Blockly.Python.autonEvents_[name];
    for (let funcID in autonEvent.functions) {
      let func = autonEvent.functions[funcID];
      autonCodeLines.push(func);
    }
  }

  let driveCodeLines = [];
  for (var name in Blockly.Python.driverEvents_) {
    var driveEvent = Blockly.Python.driverEvents_[name];
    for (var funcID in driveEvent.functions) {
      var func = driveEvent.functions[funcID];
      driveCodeLines.push(func);
    }
  }

  let competitionTasksCodeLines = []
  if (hasCompetition) {

    var taskAutonSetters = [];
    var taskAutonStoppers = [];
    for (var i = 0; i < autonCodeLines.length; i++) {
      const threadName = `auton_task_${i}`;
      var setter = `${threadName} = Thread( ${autonCodeLines[i]} )`;
      taskAutonSetters.push(setter);
      var stopper = `${threadName}.stop()`;
      taskAutonStoppers.push(stopper);
    }

    var taskDriveSetters = [];
    var taskDriveStoppers = [];
    for (var i = 0; i < driveCodeLines.length; i++) {
      const threadName = `driver_control_task_${i}`;
      var setter = `${threadName} = Thread( ${driveCodeLines[i]} )`;
      taskDriveSetters.push(setter);
      var stopper = `${threadName}.stop()`;
      taskDriveStoppers.push(stopper);
    }

    // // TODO: convert this?
    // competitionSetter = Blockly.Python.INDENT + "vex::competition::bStopTasksBetweenModes = false;\n";

    // indent the auton/driver thread lines...
    taskAutonSetters = taskAutonSetters.map(line => "\t" + line);
    taskAutonStoppers = taskAutonStoppers.map(line => "\t" + line);
    taskDriveSetters = taskDriveSetters.map(line => "\t" + line);
    taskDriveStoppers = taskDriveStoppers.map(line => "\t" + line);

    const rcStart = Blockly.Python.RC_TASK_START ? Blockly.Python.RC_TASK_START : "";
    const rcStop = Blockly.Python.RC_TASK_STOP ? Blockly.Python.RC_TASK_STOP : "";

    const rcStartLines = rcStart.split("\n").map(x => "\t" + x.trim());
    const rcStopLines = rcStop.split("\n").map(x => "\t" + x.trim());

    competitionTasksCodeLines = [
      "# create a function for handling the starting and stopping of all autonomous tasks",
      "def vexcode_auton_function():",
      "\t# Start the autonomous control tasks",
      ...taskAutonSetters,
      "\t# wait for the driver control period to end",
      "\twhile( competition.is_autonomous() and competition.is_enabled() ):",
      "\t\t# wait 10 milliseconds before checking again",
      "\t\twait( 10, MSEC )",
      "\t# Stop the autonomous control tasks",
      ...taskAutonStoppers,
      "",
      "def vexcode_driver_function():",
      "\t# Start the driver control tasks",
      ...taskDriveSetters,
      ...rcStartLines,
      "\t# wait for the driver control period to end",
      "\twhile( competition.is_driver_control() and competition.is_enabled() ):",
      "\t\t# wait 10 milliseconds before checking again",
      "\t\twait( 10, MSEC )",
      "\t# Stop the driver control tasks",
      ...taskDriveStoppers,
      ...rcStopLines,
      "",
      "# register the competition functions",
      "competition = Competition( vexcode_driver_function, vexcode_auton_function )"
    ]
  }

  const drivetrainCalibrate = Blockly.Python.DRIVETRAIN_CALIBRATE;

  const variables = Blockly.Python.definitions_['variables'];
  // RM code end

  // Clean up temporary data.
  delete Blockly.Python.definitions_;
  delete Blockly.Python.functionNames_;
  Blockly.Python.variableDB_.reset();
  // RM code start
  delete Blockly.Python.systemEvents_;
  delete Blockly.Python.driverEvents_;
  delete Blockly.Python.autonEvents_;
  delete Blockly.Python.mainFunctions_;
  // RM code end

  // RM code start
  // build the actual output
  var outputSections = [
    imports.join('\n'),
    variables,
    definitions.join('\n'),
    competitionTasksCodeLines.join('\n'),
    drivetrainCalibrate,
    Blockly.Python.preEventRegistration || "",
    eventCodeLines.join("\n"),
    Blockly.Python.postEventRegistration || "",
    mainFunctionCalls.join('\n'),
  ];

  var allDefs = outputSections.join('\n\n');
  return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n').replace(/\t/g, Blockly.Python.INDENT);
  // RM code end
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Python.scrubNakedValue = function(line) {
  return line + '\n';
};

/**
 * Encode a string as a properly escaped Python string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Python string.
 * @private
 */
Blockly.Python.quote_ = function(string) {
  // Can't use goog.string.quote since % must also be escaped.
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n');

  // Follow the CPython behaviour of repr() for a non-byte string.
  var quote = '\'';
  if (string.indexOf('\'') !== -1) {
    if (string.indexOf('"') === -1) {
      quote = '"';
    } else {
      string = string.replace(/'/g, '\\\'');
    }
  };
  return quote + string + quote;
};

/**
 * Encode a string as a properly escaped multiline Python string, complete
 * with quotes.
 * @param {string} string Text to encode.
 * @return {string} Python string.
 * @private
 */
Blockly.Python.multiline_quote_ = function(string) {
  var lines = string.split(/\n/g).map(Blockly.Python.quote_);
  // Join with the following, plus a newline:
  // + '\n' +
  return lines.join(' + \'\\n\' + \n');
};

/**
 * Common tasks for generating Python from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Python code created for this block.
 * @param {boolean=} opt_thisOnly True to generate code for only this statement.
 * @return {string} Python code with comments and subsequent blocks added.
 * @private
 */
Blockly.Python.scrub_ = function(block, code, opt_thisOnly) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      comment = Blockly.utils.string.wrap(comment,
          Blockly.Python.COMMENT_WRAP - 3);
      commentCode += Blockly.Python.prefixLines(comment + '\n', '# ');
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          comment = Blockly.Python.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Python.prefixLines(comment, '# ');
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
  var nextCode = opt_thisOnly ? '' : Blockly.Python.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value, taking into account indexing, and
 * casts to an integer.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @return {string|number}
 */
Blockly.Python.getAdjustedInt = function(block, atId, opt_delta, opt_negate) {
  var delta = opt_delta || 0;
  if (block.workspace.options.oneBasedIndex) {
    delta--;
  }
  var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
  var atOrder = delta ? Blockly.Python.ORDER_ADDITIVE :
      Blockly.Python.ORDER_NONE;
  var at = Blockly.Python.valueToCode(block, atId, atOrder) || defaultAtIndex;

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = parseInt(at, 10) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = 'int(' + at + ' + ' + delta + ')';
    } else if (delta < 0) {
      at = 'int(' + at + ' - ' + -delta + ')';
    } else {
      at = 'int(' + at + ')';
    }
    if (opt_negate) {
      at = '-' + at;
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
Blockly.Python.addDriverEventFunction = function(block, name, branch, eventSetter) {
  if (!Blockly.Python.driverEvents_[name]) {
    Blockly.Python.driverEvents_[name] = {
      setter: eventSetter,
      functions: [],
    };
  }
  
  var count = Blockly.Python.driverEvents_[name].functions.length;

  var funcName = Blockly.Python.variableDB_.getDistinctName("ondriver_" + name + "_" + count, Blockly.Procedures.NAME_TYPE);

  if (Blockly.Python.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.Python.prefixLines(
      Blockly.Python.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.Python.INDENT) + branch;
  }
  if (Blockly.Python.INFINITE_LOOP_TRAP) {
    branch = Blockly.Python.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }
  var code = 'def ' + funcName + '():\n' + branch +'\n';
  code = Blockly.Python.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Python.definitions_['%' + funcName] = code;

  Blockly.Python.driverEvents_[name].functions.push(funcName);
  return null;
};

/**
 * add a auton event to the generated code
 * @param block The block starting the stack.
 * @param name the name of the event
 * @param branch the branch code for the event
 * @param eventSetter the code called to tell the event to call the function
 */
Blockly.Python.addAutonEventFunction = function(block, name, branch, eventSetter) {
  if (!Blockly.Python.autonEvents_[name]) {
    Blockly.Python.autonEvents_[name] = {
      setter: eventSetter,
      functions: [],
    };
  }
  
  var count = Blockly.Python.autonEvents_[name].functions.length;

  var funcName = Blockly.Python.variableDB_.getDistinctName("onauton_" + name + "_" + count, Blockly.Procedures.NAME_TYPE);

  if (Blockly.Python.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.Python.prefixLines(
      Blockly.Python.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.Python.INDENT) + branch;
  }
  if (Blockly.Python.INFINITE_LOOP_TRAP) {
    branch = Blockly.Python.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }
  var code = 'def ' + funcName + '():\n' + branch + '\n';
  code = Blockly.Python.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Python.definitions_['%' + funcName] = code;

  Blockly.Python.autonEvents_[name].functions.push(funcName);
  return null;
};

/**
 * add a system (hardware) event to the generated code
 * @param block The block starting the stack.
 * @param name the name of the event
 * @param branch the branch code for the event
 * @param eventSetter the code called to tell the event to call the function
 */
Blockly.Python.addSystemEventFunction = function(block, name, branch, eventSetter) {
  if (!Blockly.Python.systemEvents_[name]) {
    Blockly.Python.systemEvents_[name] = {
      setter: eventSetter,
      functions: [],
    };
  }
  
  var count = Blockly.Python.systemEvents_[name].functions.length;

  var funcName = Blockly.Python.variableDB_.getDistinctName("onevent_" + name + "_" + count, Blockly.Procedures.NAME_TYPE);

  if (Blockly.Python.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.Python.prefixLines(
      Blockly.Python.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.Python.INDENT) + branch;
  }
  if (Blockly.Python.INFINITE_LOOP_TRAP) {
    branch = Blockly.Python.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }
  var code = 'def ' + funcName + '():\n' + branch + '\n';
  code = Blockly.Python.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Python.definitions_['%' + funcName] = code;

  Blockly.Python.systemEvents_[name].functions.push(funcName);
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
Blockly.Python.addSystemEventArgumentFunction = function(block, name, branch, eventSetter, arg) {
  if (!Blockly.Python.systemEvents_[name]) {
    Blockly.Python.systemEvents_[name] = {
      setter: eventSetter,
      functions: []
    };
  }
  
  var count = Blockly.Python.systemEvents_[name].functions.length;

  var funcName = Blockly.Python.variableDB_.getDistinctName("onevent_" + name + "_" + count, Blockly.Procedures.NAME_TYPE);

  if (Blockly.Python.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.Python.prefixLines(
      Blockly.Python.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.Python.INDENT) + branch;
  }
  if (Blockly.Python.INFINITE_LOOP_TRAP) {
    branch = Blockly.Python.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }
  var code = 'def ' + funcName + '():\n' + branch + '\n';
  code = Blockly.Python.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Python.definitions_['%' + funcName] = code;
  funcName = `${funcName}, ${arg} `;
  Blockly.Python.systemEvents_[name].functions.push(funcName);
  return null;
};

/**
 * add a user event (broadcast message) to the generated code
 * @param block The block starting the stack.
 * @param name the name of the event
 * @param branch the branch code for the event
 * @param eventSetter the code called to tell the event to call the function
 */
Blockly.Python.addUserEventFunction = function(block, name, branch, eventSetter) {
  if (!Blockly.Python.systemEvents_[name]) {
    Blockly.Python.systemEvents_[name] = {
      setter: eventSetter,
      functions: [],
    };
  }
  
  var count = Blockly.Python.systemEvents_[name].functions.length;

  var funcName = Blockly.Python.variableDB_.getDistinctName("onevent_" + name + "_" + count, Blockly.Procedures.NAME_TYPE);

  if (Blockly.Python.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.Python.prefixLines(
      Blockly.Python.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.Python.INDENT) + branch;
  }
  if (Blockly.Python.INFINITE_LOOP_TRAP) {
    branch = Blockly.Python.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }
  var code = 'def ' + funcName + '():\n' + branch + '\n';
  code = Blockly.Python.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Python.definitions_['%' + funcName] = code;

  Blockly.Python.systemEvents_[name].functions.push(funcName);
  return null;
};

/**
 * add a when started function to the generated code
 * @param block The block starting the stack.
 * @param branch the branch code for the event
 */
Blockly.Python.addWhenStartedFunction = function(block, branch) {
  const number = Blockly.Python.mainFunctions_.length + 1;
  const name = `when_started${number}`;

  const funcName = Blockly.Python.variableDB_.getDistinctName(name, Blockly.Procedures.NAME_TYPE);

  if (Blockly.Python.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.Python.prefixLines(
      Blockly.Python.STATEMENT_PREFIX.replace(/%1/g,
      '\'' + id + '\''), Blockly.Python.INDENT) + branch;
  }
  if (Blockly.Python.INFINITE_LOOP_TRAP) {
    branch = Blockly.Python.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + block.id + '\'') + branch;
  }
  var code = 'def ' + funcName + '():\n' + branch + '\n';
  code = Blockly.Python.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Python.definitions_['%' + funcName] = code;

  Blockly.Python.mainFunctions_.push(funcName);
  return null;
};


Blockly.Python.switchComment = function(block) {
  return Blockly.Python.STATEMENT_PREFIX && ` #Block ID: "${block.id}"` || "";
}


//#endregion RM code