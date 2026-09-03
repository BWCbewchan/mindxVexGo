
declare module Blockly {

    class DropDownDiv extends DropDownDiv__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class DropDownDiv__Class  { 
    
            /**
             * Class for drop-down div.
             * @constructor
             */
            constructor();
    } 
    
}

declare module Blockly.DropDownDiv {

    /**
     * Arrow size in px. Should match the value in CSS (need to position pre-render).
     * @type {number}
     * @const
     */
    var ARROW_SIZE: number;

    /**
     * Drop-down border size in px. Should match the value in CSS (need to position the arrow).
     * @type {number}
     * @const
     */
    var BORDER_SIZE: number;

    /**
     * Amount the arrow must be kept away from the edges of the main drop-down div, in px.
     * @type {number}
     * @const
     */
    var ARROW_HORIZONTAL_PADDING: number;

    /**
     * Amount drop-downs should be padded away from the source, in px.
     * @type {number}
     * @const
     */
    var PADDING_Y: number;

    /**
     * Length of animations in seconds.
     * @type {number}
     * @const
     */
    var ANIMATION_TIME: number;

    /**
     * The default dropdown div border color.
     * @type {string}
     * @const
     */
    var DEFAULT_DROPDOWN_BORDER_COLOR: string;

    /**
     * The default dropdown div color.
     * @type {string}
     * @const
     */
    var DEFAULT_DROPDOWN_COLOR: string;

    /**
     * Timer for animation out, to be cleared if we need to immediately hide
     * without disrupting new shows.
     * @type {?number}
     */
    var animateOutTimer_: number;

    /**
     * Callback for when the drop-down is hidden.
     * @type {?Function}
     */
    var onHide_: Function;

    /**
     * Create and insert the DOM element for this div.
     */
    function createDom(): void;

    /**
     * Set an element to maintain bounds within. Drop-downs will appear
     * within the box of this element if possible.
     * @param {Element} boundsElement Element to bind drop-down to.
     */
    function setBoundsElement(boundsElement: Element): void;

    /**
     * Provide the div for inserting content into the drop-down.
     * @return {Element} Div to populate with content
     */
    function getContentDiv(): Element;

    /**
     * Clear the content of the drop-down.
     */
    function clearContent(): void;

    /**
     * Set the colour for the drop-down.
     * @param {string} backgroundColour Any CSS colour for the background.
     * @param {string} borderColour Any CSS colour for the border.
     */
    function setColour(backgroundColour: string, borderColour: string): void;

    /**
     * Set the category for the drop-down.
     * @param {string} category The new category for the drop-down.
     */
    function setCategory(category: string): void;

    /**
     * Shortcut to show and place the drop-down with positioning determined
     * by a particular block. The primary position will be below the block,
     * and the secondary position above the block. Drop-down will be
     * constrained to the block's workspace.
     * @param {!Blockly.Field} field The field showing the drop-down.
     * @param {!Blockly.Block} block Block to position the drop-down around.
     * @param {Function=} opt_onHide Optional callback for when the drop-down is
     *   hidden.
     * @param {number=} opt_secondaryYOffset Optional Y offset for above-block
     *   positioning.
     * @return {boolean} True if the menu rendered below block; false if above.
     */
    function showPositionedByBlock(field: Blockly.Field, block: Blockly.Block, opt_onHide?: Function, opt_secondaryYOffset?: number): boolean;

    /**
     * Shortcut to show and place the drop-down with positioning determined
     * by a particular field. The primary position will be below the field,
     * and the secondary position above the field. Drop-down will be
     * constrained to the block's workspace.
     * @param {!Blockly.Field} field The field to position the dropdown against.
     * @param {Function=} opt_onHide Optional callback for when the drop-down is
     *   hidden.
     * @param {number=} opt_secondaryYOffset Optional Y offset for above-block
     *   positioning.
     * @return {boolean} True if the menu rendered below block; false if above.
     */
    function showPositionedByField(field: Blockly.Field, opt_onHide?: Function, opt_secondaryYOffset?: number): boolean;

    /**
     * Show and place the drop-down.
     * The drop-down is placed with an absolute "origin point" (x, y) - i.e.,
     * the arrow will point at this origin and box will positioned below or above it.
     * If we can maintain the container bounds at the primary point, the arrow will
     * point there, and the container will be positioned below it.
     * If we can't maintain the container bounds at the primary point, fall-back to the
     * secondary point and position above.
     * @param {Object} owner The object showing the drop-down
     * @param {boolean} rtl Right-to-left (true) or left-to-right (false).
     * @param {number} primaryX Desired origin point x, in absolute px
     * @param {number} primaryY Desired origin point y, in absolute px
     * @param {number} secondaryX Secondary/alternative origin point x, in absolute px
     * @param {number} secondaryY Secondary/alternative origin point y, in absolute px
     * @param {Function=} opt_onHide Optional callback for when the drop-down is hidden
     * @return {boolean} True if the menu rendered at the primary origin point.
     * @package
     */
    function show(owner: Object, rtl: boolean, primaryX: number, primaryY: number, secondaryX: number, secondaryY: number, opt_onHide?: Function): boolean;

    /**
     * Helper to position the drop-down and the arrow, maintaining bounds.
     * See explanation of origin points in Blockly.DropDownDiv.show.
     * @param {number} primaryX Desired origin point x, in absolute px.
     * @param {number} primaryY Desired origin point y, in absolute px.
     * @param {number} secondaryX Secondary/alternative origin point x,
     *    in absolute px.
     * @param {number} secondaryY Secondary/alternative origin point y,
     *    in absolute px.
     * @return {Object} Various final metrics, including rendered positions
     *    for drop-down and arrow.
     */
    function getPositionMetrics(primaryX: number, primaryY: number, secondaryX: number, secondaryY: number): Object;

    /**
     * Get the metrics for positioning the div below the source.
     * @param {number} primaryX Desired origin point x, in absolute px.
     * @param {number} primaryY Desired origin point y, in absolute px.
     * @param {!Object} boundsInfo An object containing size information about the
     *    bounding element (bounding box and width/height).
     * @param {!Object} divSize An object containing information about the size
     *    of the DropDownDiv (width & height).
     * @return {Object} Various final metrics, including rendered positions
     *    for drop-down and arrow.
     */
    function getPositionBelowMetrics(primaryX: number, primaryY: number, boundsInfo: Object, divSize: Object): Object;

    /**
     * Get the metrics for positioning the div above the source.
     * @param {number} secondaryX Secondary/alternative origin point x,
     *    in absolute px.
     * @param {number} secondaryY Secondary/alternative origin point y,
     *    in absolute px.
     * @param {!Object} boundsInfo An object containing size information about the
     *    bounding element (bounding box and width/height).
     * @param {!Object} divSize An object containing information about the size
     *    of the DropDownDiv (width & height).
     * @return {Object} Various final metrics, including rendered positions
     *    for drop-down and arrow.
     */
    function getPositionAboveMetrics(secondaryX: number, secondaryY: number, boundsInfo: Object, divSize: Object): Object;

    /**
     * Get the metrics for positioning the div at the top of the page.
     * @param {number} sourceX Desired origin point x, in absolute px.
     * @param {!Object} boundsInfo An object containing size information about the
     *    bounding element (bounding box and width/height).
     * @param {!Object} divSize An object containing information about the size
     *    of the DropDownDiv (width & height).
     * @return {Object} Various final metrics, including rendered positions
     *    for drop-down and arrow.
     */
    function getPositionTopOfPageMetrics(sourceX: number, boundsInfo: Object, divSize: Object): Object;

    /**
     * Get the x positions for the left side of the DropDownDiv and the arrow,
     * accounting for the bounds of the workspace.
     * @param {number} sourceX Desired origin point x, in absolute px.
     * @param {number} boundsLeft The left edge of the bounding element, in
     *    absolute px.
     * @param {number} boundsRight The right edge of the bounding element, in
     *    absolute px.
     * @param {number} divWidth The width of the div in px.
     * @return {{divX: number, arrowX: number}} An object containing metrics for
     *    the x positions of the left side of the DropDownDiv and the arrow.
     */
    function getPositionX(sourceX: number, boundsLeft: number, boundsRight: number, divWidth: number): { divX: number; arrowX: number };

    /**
     * Is the container visible?
     * @return {boolean} True if visible.
     */
    function isVisible(): boolean;

    /**
     * Hide the menu only if it is owned by the provided object.
     * @param {Object} owner Object which must be owning the drop-down to hide.
     * @param {boolean=} opt_withoutAnimation True if we should hide the dropdown
     *     without animating.
     * @return {boolean} True if hidden.
     */
    function hideIfOwner(owner: Object, opt_withoutAnimation?: boolean): boolean;

    /**
     * Hide the menu, triggering animation.
     */
    function hide(): void;

    /**
     * Hide the menu, without animation.
     */
    function hideWithoutAnimation(): void;

    /**
     *  Repositions the dropdownDiv on window resize. If it doesn't know how to
     *  calculate the new position, it will just hide it instead.
     */
    function repositionForWindowResize(): void;
}
