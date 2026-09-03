
declare module Blockly {

    class Generator extends Generator__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Generator__Class  { 
    
            /**
             * Class for a code generator that translates the blocks into a language.
             * @param {string} name Language name of this generator.
             * @constructor
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
             * Add one or more words to the list of reserved words for this language.
             * @param {string} words Comma-separated list of words to add to the list.
             *     No spaces.  Duplicates are ok.
             */
            addReservedWords(words: string): void;
    
            /**
             * Hook for code to run before code generation starts.
             * Subclasses may override this, e.g. to initialise the database of variable
             * names.
             * @param {!Blockly.Workspace} _workspace Workspace to generate code from.
             */
            init(_workspace: Blockly.Workspace): void;
    
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
    } 
    
}

declare module Blockly.Generator {

    /**
     * Category to separate generated function names from variables and procedures.
     */
    var NAME_TYPE: any /*missing*/;
}
