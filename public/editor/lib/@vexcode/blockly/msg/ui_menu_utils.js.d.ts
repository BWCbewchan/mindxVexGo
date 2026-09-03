
declare module Blockly.utils.uiMenu {

    /**
     * Get the size of a rendered goog.ui.Menu.
     * @param {!Blockly.Menu} menu The menu to measure.
     * @return {!Blockly.utils.Size} Object with width and height properties.
     * @package
     */
    function getSize(menu: Blockly.Menu): Blockly.utils.Size;

    /**
     * Adjust the bounding boxes used to position the widget div to deal with RTL
     * goog.ui.Menu positioning.  In RTL mode the menu renders down and to the left
     * of its start point, instead of down and to the right.  Adjusting all of the
     * bounding boxes accordingly allows us to use the same code for all widgets.
     * This function in-place modifies the provided bounding boxes.
     * @param {!Object} viewportBBox The bounding rectangle of the current viewport,
     *     in window coordinates.
     * @param {!Object} anchorBBox The bounding rectangle of the anchor, in window
     *     coordinates.
     * @param {!Blockly.utils.Size} menuSize The size of the menu that is inside the
     *     widget div, in window coordinates.
     * @package
     */
    function adjustBBoxesForRTL(viewportBBox: Object, anchorBBox: Object, menuSize: Blockly.utils.Size): void;
}
