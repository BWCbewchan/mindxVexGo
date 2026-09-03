
declare module Blockly {

    /**
     * PHP code generator.
     * @type {!Blockly.Generator}
     */
    var PHP: Blockly.Generator;
}

declare module Blockly.PHP {

    /**
     * Order of operation ENUMs.
     * http://php.net/manual/en/language.operators.precedence.php
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
}
