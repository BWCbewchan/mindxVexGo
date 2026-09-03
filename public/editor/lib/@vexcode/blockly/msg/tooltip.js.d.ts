
declare module Blockly.Tooltip {

    /**
     * Is a tooltip currently showing?
     */
    var visible: any /*missing*/;

    /**
     * Maximum width (in characters) of a tooltip.
     */
    var LIMIT: any /*missing*/;

    /**
     * Horizontal offset between mouse cursor and tooltip.
     */
    var OFFSET_X: any /*missing*/;

    /**
     * Vertical offset between mouse cursor and tooltip.
     */
    var OFFSET_Y: any /*missing*/;

    /**
     * Radius mouse can move before killing tooltip.
     */
    var RADIUS_OK: any /*missing*/;

    /**
     * Delay before tooltip appears.
     */
    var HOVER_MS: any /*missing*/;

    /**
     * Horizontal padding between tooltip and screen edge.
     */
    var MARGINS: any /*missing*/;

    /**
     * The HTML container.  Set once by Blockly.Tooltip.createDom.
     * @type {Element}
     */
    var DIV: Element;

    /**
     * Create the tooltip div and inject it onto the page.
     */
    function createDom(): void;

    /**
     * Binds the required mouse events onto an SVG element.
     * @param {!Element} element SVG element onto which tooltip is to be bound.
     */
    function bindMouseEvents(element: Element): void;

    /**
     * Hide the tooltip.
     */
    function hide(): void;

    /**
     * Hide any in-progress tooltips and block showing new tooltips until the next
     * call to unblock().
     * @package
     */
    function block(): void;

    /**
     * Unblock tooltips: allow them to be scheduled and shown according to their own
     * logic.
     * @package
     */
    function unblock(): void;
}
