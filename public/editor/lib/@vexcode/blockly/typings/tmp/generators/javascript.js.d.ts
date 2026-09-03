
declare module Blockly {

    /**
     * JavaScript code generator.
     * @type {!Blockly.Generator}
     */
    var JavaScript: Blockly.Generator;
}

declare module Blockly.JavaScript {

    /**
     * Order of operation ENUMs.
     * https://developer.mozilla.org/en/JavaScript/Reference/Operators/Operator_Precedence
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
     * anything.  A trailing semicolon is needed to make this legal.
     * @param {string} line Line of generated code.
     * @return {string} Legal line of code.
     */
    function scrubNakedValue(line: string): string;

    /**
     * Gets a property and adjusts the value while taking into account indexing.
     * @param {!Blockly.Block} block The block.
     * @param {string} atId The property ID of the element to get.
     * @param {number=} opt_delta Value to add.
     * @param {boolean=} opt_negate Whether to negate the value.
     * @param {number=} opt_order The highest order acting on this value.
     * @return {string|number}
     */
    function getAdjusted(block: Blockly.Block, atId: string, opt_delta?: number, opt_negate?: boolean, opt_order?: number): string|number;

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
