
declare module Blockly.blockRendering {

    /**
     * Types of rendering elements.
     * @enum {number}
     */
    enum Types { NONE, FIELD, HAT, ICON, SPACER, BETWEEN_ROW_SPACER, IN_ROW_SPACER, EXTERNAL_VALUE_INPUT, INPUT, INLINE_INPUT, STATEMENT_INPUT, CONNECTION, PREVIOUS_CONNECTION, NEXT_CONNECTION, OUTPUT_CONNECTION, CORNER, LEFT_SQUARE_CORNER, LEFT_ROUND_CORNER, RIGHT_SQUARE_CORNER, RIGHT_ROUND_CORNER, JAGGED_EDGE, ROW, TOP_ROW, BOTTOM_ROW, INPUT_ROW, LEFT_LARGE_ROUND_CORNER, RIGHT_LARGE_ROUND_CORNER } 
}

declare module Blockly.blockRendering.Types {

    /**
     * A Left Corner Union Type.
     * @type {number}
     * @const
     * @package
     */
    var LEFT_CORNER: number;

    /**
     * A Right Corner Union Type.
     * @type {number}
     * @const
     * @package
     */
    var RIGHT_CORNER: number;

    /**
     * Get the enum flag value of an existing type or register a new type.
     * @param {!string} type The name of the type.
     * @return {!number} The enum flag value associated with that type.
     * @package
     */
    function getType(type: string): number;

    /**
     * Whether a measurable stores information about a field.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about a field.
     * @package
     */
    function isField(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about a hat.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about a hat.
     * @package
     */
    function isHat(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about an icon.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about an icon.
     * @package
     */
    function isIcon(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about a spacer.
     * @param {!Blockly.blockRendering.Measurable|!Blockly.blockRendering.Row} elem
     *     The element to check.
     * @return {number} 1 if the object stores information about a spacer.
     * @package
     */
    function isSpacer(elem: Blockly.blockRendering.Measurable|Blockly.blockRendering.Row): number;

    /**
     * Whether a measurable stores information about an in-row spacer.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about an
     *   in-row spacer.
     * @package
     */
    function isInRowSpacer(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about an input.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about an input.
     * @package
     */
    function isInput(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about an external input.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about an
     *   external input.
     * @package
     */
    function isExternalInput(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about an inline input.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about an
     *   inline input.
     * @package
     */
    function isInlineInput(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about a statement input.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about a
     *   statement input.
     * @package
     */
    function isStatementInput(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about a previous connection.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about a
     *   previous connection.
     * @package
     */
    function isPreviousConnection(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about a next connection.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about a
     *   next connection.
     * @package
     */
    function isNextConnection(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about a previous or next connection.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about a previous or
     *   next connection.
     * @package
     */
    function isPreviousOrNextConnection(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about a left round corner.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about a
     *   left round corner.
     * @package
     */
    function isLeftRoundedCorner(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about a right round corner.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about a
     *   right round corner.
     * @package
     */
    function isRightRoundedCorner(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about a left round corner.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about a
     *   left round corner.
     * @package
     */
    function isLeftLargeRoundedCorner(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about a right round corner.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about a
     *   right round corner.
     * @package
     */
    function isRightLargeRoundedCorner(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about a left square corner.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about a
     *   left square corner.
     * @package
     */
    function isLeftSquareCorner(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about a right square corner.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about a
     *   right square corner.
     * @package
     */
    function isRightSquareCorner(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about a corner.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about a
     *   corner.
     * @package
     */
    function isCorner(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about a jagged edge.
     * @param {!Blockly.blockRendering.Measurable} elem The element to check.
     * @return {number} 1 if the object stores information about a jagged edge.
     * @package
     */
    function isJaggedEdge(elem: Blockly.blockRendering.Measurable): number;

    /**
     * Whether a measurable stores information about a row.
     * @param {!Blockly.blockRendering.Row} row The row to check.
     * @return {number} 1 if the object stores information about a row.
     * @package
     */
    function isRow(row: Blockly.blockRendering.Row): number;

    /**
     * Whether a measurable stores information about a between-row spacer.
     * @param {!Blockly.blockRendering.Row} row The row to check.
     * @return {number} 1 if the object stores information about a
     *   between-row spacer.
     * @package
     */
    function isBetweenRowSpacer(row: Blockly.blockRendering.Row): number;

    /**
     * Whether a measurable stores information about a top row.
     * @param {!Blockly.blockRendering.Row} row The row to check.
     * @return {number} 1 if the object stores information about a top row.
     * @package
     */
    function isTopRow(row: Blockly.blockRendering.Row): number;

    /**
     * Whether a measurable stores information about a bottom row.
     * @param {!Blockly.blockRendering.Row} row The row to check.
     * @return {number} 1 if the object stores information about a bottom row.
     * @package
     */
    function isBottomRow(row: Blockly.blockRendering.Row): number;

    /**
     * Whether a measurable stores information about a top or bottom row.
     * @param {!Blockly.blockRendering.Row} row The row to check.
     * @return {number} 1 if the object stores information about a top or
     *   bottom row.
     * @package
     */
    function isTopOrBottomRow(row: Blockly.blockRendering.Row): number;

    /**
     * Whether a measurable stores information about an input row.
     * @param {!Blockly.blockRendering.Row} row The row to check.
     * @return {number} 1 if the object stores information about an input row.
     * @package
     */
    function isInputRow(row: Blockly.blockRendering.Row): number;
}
