
declare module Blockly {

    class Generator extends Generator__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Generator__Class  { 
    
            /**
             * Class for a code generator that translates the blocks into a language.
             * @param {string} name Language name of this generator.
             * @constructor
             * @augments BlocklyGeneratorBlocks
             */
            constructor(name: string);
    
            /**
             * Arbitrary code to inject into locations that risk causing infinite loops.
             * Any instances of '%1' will be replaced by the block ID that failed.
             * E.g. '  checkTimeout(%1);\n'
             * @type {?string}
             */
            INFINITE_LOOP_TRAP: string;
    
            /**
             * Arbitrary code to inject before every statement.
             * Any instances of '%1' will be replaced by the block ID of the statement.
             * E.g. 'highlight(%1);\n'
             * @type {?string}
             */
            STATEMENT_PREFIX: string;
    
            /**
             * Arbitrary code to inject after every statement.
             * Any instances of '%1' will be replaced by the block ID of the statement.
             * E.g. 'highlight(%1);\n'
             * @type {?string}
             */
            STATEMENT_SUFFIX: string;
    
            /**
             * The method of indenting.  Defaults to two spaces, but language generators
             * may override this to increase indent or change to tabs.
             * @type {string}
             */
            INDENT: string;
    
            /**
             * Maximum length for a comment before wrapping.  Does not account for
             * indenting level.
             * @type {number}
             */
            COMMENT_WRAP: number;
    
            /**
             * List of outer-inner pairings that do NOT require parentheses.
             * @type {!Array.<!Array.<number>>}
             */
            ORDER_OVERRIDES: number[][];
    
            /**
             * Generate code for all blocks in the workspace to the specified language.
             * @param {Blockly.Workspace} workspace Workspace to generate code from.
             * @return {string} Generated code.
             */
            workspaceToCode(workspace: Blockly.Workspace): string;
    
            /**
             * Prepend a common prefix onto each line of code.
             * Intended for indenting code or adding comment markers.
             * @param {string} text The lines of code.
             * @param {string} prefix The common prefix.
             * @return {string} The prefixed lines of code.
             */
            prefixLines(text: string, prefix: string): string;
    
            /**
             * Recursively spider a tree of blocks, returning all their comments.
             * @param {!Blockly.Block} block The block from which to start spidering.
             * @return {string} Concatenated list of comments.
             */
            allNestedComments(block: Blockly.Block): string;
    
            /**
             * Generate code for the specified block (and attached blocks).
             * @param {Blockly.Block} block The block to generate code for.
             * @param {boolean=} opt_thisOnly True to generate code for only this statement.
             * @return {string|!Array} For statement blocks, the generated code.
             *     For value blocks, an array containing the generated code and an
             *     operator order value.  Returns '' if block is null.
             */
            blockToCode(block: Blockly.Block, opt_thisOnly?: boolean): string|any[];
    
            /**
             * Generate code representing the specified value input.
             * @param {!Blockly.Block} block The block containing the input.
             * @param {string} name The name of the input.
             * @param {number} outerOrder The maximum binding strength (minimum order value)
             *     of any operators adjacent to "block".
             * @return {string} Generated code or '' if no blocks are connected or the
             *     specified input does not exist.
             */
            valueToCode(block: Blockly.Block, name: string, outerOrder: number): string;
    
            /**
             * Generate a code string representing the blocks attached to the named
             * statement input. Indent the code.
             * This is mainly used in generators. When trying to generate code to evaluate
             * look at using workspaceToCode or blockToCode.
             * @param {!Blockly.Block} block The block containing the input.
             * @param {string} name The name of the input.
             * @return {string} Generated code or '' if no blocks are connected.
             */
            statementToCode(block: Blockly.Block, name: string): string;
    
            /**
             * Add an infinite loop trap to the contents of a loop.
             * Add statement suffix at the start of the loop block (right after the loop
             * statement executes), and a statement prefix to the end of the loop block
             * (right before the loop statement executes).
             * @param {string} branch Code for loop contents.
             * @param {!Blockly.Block} block Enclosing block.
             * @return {string} Loop contents, with infinite loop trap added.
             */
            addLoopTrap(branch: string, block: Blockly.Block): string;
    
            /**
             * Inject a block ID into a message to replace '%1'.
             * Used for STATEMENT_PREFIX, STATEMENT_SUFFIX, and INFINITE_LOOP_TRAP.
             * @param {string} msg Code snippet with '%1'.
             * @param {!Blockly.Block} block Block which has an ID.
             * @return {string} Code snippet with ID.
             */
            injectId(msg: string, block: Blockly.Block): string;
    
            /**
             * Comma-separated list of reserved words.
             * @type {string}
             * @protected
             */
            RESERVED_WORDS_: string;
    
            /**
             * Add one or more words to the list of reserved words for this language.
             * @param {string} words Comma-separated list of words to add to the list.
             *     No spaces.  Duplicates are ok.
             */
            addReservedWords(words: string): void;
    
            /**
             * This is used as a placeholder in functions defined using
             * Blockly.Generator.provideFunction_.  It must not be legal code that could
             * legitimately appear in a function definition (or comment), and it must
             * not confuse the regular expression parser.
             * @type {string}
             * @protected
             */
            FUNCTION_NAME_PLACEHOLDER_: string;
    
            /**
             * A dictionary of definitions to be printed before the code.
             * @type {Object}
             * @protected
             */
            definitions_: Object;
    
            /**
             * A dictionary mapping desired function names in definitions_ to actual
             * function names (to avoid collisions with user functions).
             * @type {Object}
             * @protected
             */
            functionNames_: Object;
    
            /**
             * A database of variable names.
             * @type {Blockly.Names}
             * @protected
             */
            variableDB_: Blockly.Names;
    
            /**
             * Define a function to be included in the generated code.
             * The first time this is called with a given desiredName, the code is
             * saved and an actual name is generated.  Subsequent calls with the
             * same desiredName have no effect but have the same return value.
             *
             * It is up to the caller to make sure the same desiredName is not
             * used for different code values.
             *
             * The code gets output when Blockly.Generator.finish() is called.
             *
             * @param {string} desiredName The desired name of the function (e.g., isPrime).
             * @param {!Array.<string>} code A list of statements.  Use '  ' for indents.
             * @param {!boolean=} isHiddenFunc indicates if the function should be considered
             * a hidden function.
             * @return {string} The actual name of the new function.  This may differ
             *     from desiredName if the former has already been taken by the user.
             * @protected
             */
            provideFunction_(desiredName: string, code: string[], isHiddenFunc?: boolean): string;
    
            /**
             * Hook for code to run before code generation starts.
             * Subclasses may override this, e.g. to initialise the database of variable
             * names.
             * @param {!Blockly.Workspace} _workspace Workspace to generate code from.
             */
            init(_workspace: Blockly.Workspace): void;
    
            /**
             * Common tasks for generating code from blocks.  This is called from
             * blockToCode and is called on every block, not just top level blocks.
             * Subclasses may override this, e.g. to generate code for statements following
             * the block, or to handle comments for the specified block and any connected
             * value blocks.
             * @param {!Blockly.Block} _block The current block.
             * @param {string} code The code created for this block.
             * @param {boolean=} _opt_thisOnly True to generate code for only this
             *     statement.
             * @return {string} Code with comments and subsequent blocks added.
             * @protected
             */
            scrub_(_block: Blockly.Block, code: string, _opt_thisOnly?: boolean): string;
    
            /**
             * Hook for code to run at end of code generation.
             * Subclasses may override this, e.g. to prepend the generated code with the
             * variable definitions.
             * @param {string} code Generated code.
             * @return {string} Completed code.
             */
            finish(code: string): string;
    
            /**
             * Naked values are top-level blocks with outputs that aren't plugged into
             * anything.
             * Subclasses may override this, e.g. if their language does not allow
             * naked values.
             * @param {string} line Line of generated code.
             * @return {string} Legal line of code.
             */
            scrubNakedValue(line: string): string;
    
            /**
             * Set whether the generator should include unused
             * user variables in the generated code.
             * @type {boolean}
             */
            INCLUDE_UNUSED_VARS: boolean;
    
            /**
             * Set whether the generator should include a wait in loops.
             * @type {boolean}
             */
            INCLUDE_LOOP_WAIT: boolean;
    
            /**
             * string to add for starting RC generated task
             */
            RC_TASK_START: any /*missing*/;
    
            /**
             * string to add for stoping RC generated task
             */
            RC_TASK_STOP: any /*missing*/;
    
            /**
             * string to add for calibrating the drivetrain
             */
            DRIVETRAIN_CALIBRATE: any /*missing*/;
    
            /**
             * string to add to int main before any events get setup/registered
             */
            preEventRegistration: any /*missing*/;
    
            /**
             * string to add to int main after any events get setup/registered
             */
            postEventRegistration: any /*missing*/;
    
            /**
             * Generate code representing the statement.  Indent the code.
             * @param {!Blockly.Block} block The block containing the input.
             * @param {string} name The name of the input.
             * @return {string} Generated code or '' if no blocks are connected.
             */
            eventStackToCode(block: Blockly.Block): string;
    
            /**
             * add a driver event to the generated code
             * @param {!Blockly.Block} block The block starting the stack.
             * @param {string} name the name of the event
             * @param {string} branch the branch code for the event
             * @param {string} eventSetter the code called to tell the event to call the function
             */
            addDriverEventFunction(block: Blockly.Block, name: string, branch: string, eventSetter: string): void;
    
            /**
             * add a auton event to the generated code
             * @param {!Blockly.Block} block The block starting the stack.
             * @param {string} name the name of the event
             * @param {string} branch the branch code for the event
             * @param {string} eventSetter the code called to tell the event to call the function
             */
            addAutonEventFunction(block: Blockly.Block, name: string, branch: string, eventSetter: string): void;
    
            /**
             * add a system (hardware) event to the generated code
             * @param {!Blockly.Block} block The block starting the stack.
             * @param {string} name the name of the event
             * @param {string} branch the branch code for the event
             * @param {string} eventSetter the code called to tell the event to call the function
             */
            addSystemEventFunction(block: Blockly.Block, name: string, branch: string, eventSetter: string): void;
    
            /**
             * add a system (hardware) event to the generated code
             * @param {!Blockly.Block} block The block starting the stack.
             * @param {string} name the name of the event
             * @param {string} branch the branch code for the event
             * @param {string} eventSetter the code called to tell the event to call the function
             * @param {string} arg the argument of the event
             */
            addSystemEventArgumentFunction(block: Blockly.Block, name: string, branch: string, eventSetter: string, arg: string): void;
    
            /**
             * add a user event (broadcast message) to the generated code
             * @param {!Blockly.Block} block The block starting the stack.
             * @param {string} name the name of the event
             * @param {string} branch the branch code for the event
             * @param {string} eventSetter the code called to tell the event to call the function
             */
            addUserEventFunction(block: Blockly.Block, name: string, branch: string, eventSetter: string): void;
    
            /**
             * add a when started function to the generated code
             * @param {!Blockly.Block} block The block starting the stack.
             * @param {string} branch the branch code for the event
             */
            addWhenStartedFunction(block: Blockly.Block, branch: string): void;
    } 
    
}

declare module Blockly.Generator {

    /**
     * Category to separate generated function names from variables and procedures.
     */
    var NAME_TYPE: any /*missing*/;
}
