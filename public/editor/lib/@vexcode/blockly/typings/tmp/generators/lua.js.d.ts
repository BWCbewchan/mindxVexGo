
declare module Blockly {

    /**
     * Lua code generator.
     * @type {!Blockly.Generator}
     */
    var Lua: Blockly.Generator;
}

declare module Blockly.Lua {

    /**
     * Order of operation ENUMs.
     * http://www.lua.org/manual/5.3/manual.html#3.4.8
     */
    var ORDER_ATOMIC: any /*missing*/;

    /**
     * Initialise the database of variable names.
     * @param {!Blockly.Workspace} workspace Workspace to generate code from.
     */
    function init(workspace: Blockly.Workspace): void;

    /**
     * Prepend the generated code with the variable definitions.
     * @param {string} code Generated code.
     * @return {string} Completed code.
     */
    function finish(code: string): string;

    /**
     * Naked values are top-level blocks with outputs that aren't plugged into
     * anything. In Lua, an expression is not a legal statement, so we must assign
     * the value to the (conventionally ignored) _.
     * http://lua-users.org/wiki/ExpressionsAsStatements
     * @param {string} line Line of generated code.
     * @return {string} Legal line of code.
     */
    function scrubNakedValue(line: string): string;
}
