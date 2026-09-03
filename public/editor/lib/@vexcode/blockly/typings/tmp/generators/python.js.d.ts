
declare module Blockly {

    /**
     * Python code generator.
     * @type {!Blockly.Generator}
     */
    var Python: Blockly.Generator;
}

declare module Blockly.Python {

    /**
     * Order of operation ENUMs.
     * http://docs.python.org/reference/expressions.html#summary
     */
    var ORDER_ATOMIC: any /*missing*/;

    /**
     * List of outer-inner pairings that do NOT require parentheses.
     * @type {!Array.<!Array.<number>>}
     */
    var ORDER_OVERRIDES: number[][];

    /**
     * Initialise the database of variable names.
     * @param {!Blockly.Workspace} workspace Workspace to generate code from.
     * @this {Blockly.Generator}
     */
    function init(workspace: Blockly.Workspace): void;

    /**
       * Empty loops or conditionals are not allowed in Python.
       */
    var PASS: any /*missing*/;

    /**
     * Prepend the generated code with the variable definitions.
     * @param {string} code Generated code.
     * @return {string} Completed code.
     */
    function finish(code: string): string;

    /**
     * Naked values are top-level blocks with outputs that aren't plugged into
     * anything.
     * @param {string} line Line of generated code.
     * @return {string} Legal line of code.
     */
    function scrubNakedValue(line: string): string;

    /**
     * Gets a property and adjusts the value, taking into account indexing, and
     * casts to an integer.
     * @param {!Blockly.Block} block The block.
     * @param {string} atId The property ID of the element to get.
     * @param {number=} opt_delta Value to add.
     * @param {boolean=} opt_negate Whether to negate the value.
     * @return {string|number}
     */
    function getAdjustedInt(block: Blockly.Block, atId: string, opt_delta?: number, opt_negate?: boolean): string|number;

    /**
     * add a driver event to the generated code
     * @param block The block starting the stack.
     * @param name the name of the event
     * @param branch the branch code for the event
     * @param eventSetter the code called to tell the event to call the function
     */
    function addDriverEventFunction(block: any /*missing*/, name: any /*missing*/, branch: any /*missing*/, eventSetter: any /*missing*/): void;

    /**
     * add a auton event to the generated code
     * @param block The block starting the stack.
     * @param name the name of the event
     * @param branch the branch code for the event
     * @param eventSetter the code called to tell the event to call the function
     */
    function addAutonEventFunction(block: any /*missing*/, name: any /*missing*/, branch: any /*missing*/, eventSetter: any /*missing*/): void;

    /**
     * add a system (hardware) event to the generated code
     * @param block The block starting the stack.
     * @param name the name of the event
     * @param branch the branch code for the event
     * @param eventSetter the code called to tell the event to call the function
     */
    function addSystemEventFunction(block: any /*missing*/, name: any /*missing*/, branch: any /*missing*/, eventSetter: any /*missing*/): void;

    /**
     * add a system (hardware) event to the generated code
     * @param block The block starting the stack.
     * @param name the name of the event
     * @param branch the branch code for the event
     * @param eventSetter the code called to tell the event to call the function
     * @param arg the argument of the event
     */
    function addSystemEventArgumentFunction(block: any /*missing*/, name: any /*missing*/, branch: any /*missing*/, eventSetter: any /*missing*/, arg: any /*missing*/): void;

    /**
     * add a user event (broadcast message) to the generated code
     * @param block The block starting the stack.
     * @param name the name of the event
     * @param branch the branch code for the event
     * @param eventSetter the code called to tell the event to call the function
     */
    function addUserEventFunction(block: any /*missing*/, name: any /*missing*/, branch: any /*missing*/, eventSetter: any /*missing*/): void;

    /**
     * add a when started function to the generated code
     * @param block The block starting the stack.
     * @param branch the branch code for the event
     */
    function addWhenStartedFunction(block: any /*missing*/, branch: any /*missing*/): void;
}
