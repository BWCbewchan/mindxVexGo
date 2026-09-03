
declare module Blockly.WidgetDiv {

    /**
     * Create the widget div and inject it onto the page.
     */
    function createDom(): void;

    /**
       * The HTML container for popup overlays (e.g. editor widgets).
       * @type {!Element}
       */
    var DIV: Element;

    /**
     * Initialize and display the widget div.  Close the old one if needed.
     * @param {!Object} newOwner The object that will be using this container.
     * @param {boolean} rtl Right-to-left (true) or left-to-right (false).
     * @param {Function} dispose Optional cleanup function to be run when the
     *     widget is closed.
     */
    function show(newOwner: Object, rtl: boolean, dispose: Function): void;

    /**
     * Destroy the widget and hide the div.
     */
    function hide(): void;

    /**
     * Is the container visible?
     * @return {boolean} True if visible.
     */
    function isVisible(): boolean;

    /**
     * Destroy the widget and hide the div if it is being used by the specified
     * object.
     * @param {!Object} oldOwner The object that was using this container.
     */
    function hideIfOwner(oldOwner: Object): void;

    /**
     * Position the widget div based on an anchor rectangle.
     * The widget should be placed adjacent to but not overlapping the anchor
     * rectangle.  The preferred position is directly below and aligned to the left
     * (LTR) or right (RTL) side of the anchor.
     * @param {!Blockly.utils.Rect} viewportBBox The bounding rectangle of the
     *     current viewport, in window coordinates.
     * @param {!Blockly.utils.Rect} anchorBBox The bounding rectangle of the anchor,
     *     in window coordinates.
     * @param {!Blockly.utils.Size} widgetSize The size of the widget that is inside
     *     the widget div, in window coordinates.
     * @param {boolean} rtl Whether the workspace is in RTL mode.  This determines
     *     horizontal alignment.
     * @package
     */
    function positionWithAnchor(viewportBBox: Blockly.utils.Rect, anchorBBox: Blockly.utils.Rect, widgetSize: Blockly.utils.Size, rtl: boolean): void;
}
