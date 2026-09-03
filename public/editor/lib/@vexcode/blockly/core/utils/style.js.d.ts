
declare module Blockly.utils.style {

    /**
     * Gets the height and width of an element.
     * Similar to Closure's goog.style.getSize
     * @param {!Element} element Element to get size of.
     * @return {!Blockly.utils.Size} Object with width/height properties.
     */
    function getSize(element: Element): Blockly.utils.Size;

    /**
     * Retrieves a computed style value of a node. It returns empty string if the
     * value cannot be computed (which will be the case in Internet Explorer) or
     * "none" if the property requested is an SVG one and it has not been
     * explicitly set (firefox and webkit).
     *
     * Copied from Closure's goog.style.getComputedStyle
     *
     * @param {!Element} element Element to get style of.
     * @param {string} property Property to get (camel-case).
     * @return {string} Style value.
     */
    function getComputedStyle(element: Element, property: string): string;

    /**
     * Gets the cascaded style value of a node, or null if the value cannot be
     * computed (only Internet Explorer can do this).
     *
     * Copied from Closure's goog.style.getCascadedStyle
     *
     * @param {!Element} element Element to get style of.
     * @param {string} style Property to get (camel-case).
     * @return {string} Style value.
     */
    function getCascadedStyle(element: Element, style: string): string;

    /**
     * Returns a Coordinate object relative to the top-left of the HTML document.
     * Similar to Closure's goog.style.getPageOffset
     * @param {!Element} el Element to get the page offset for.
     * @return {!Blockly.utils.Coordinate} The page offset.
     */
    function getPageOffset(el: Element): Blockly.utils.Coordinate;

    /**
     * Calculates the viewport coordinates relative to the document.
     * Similar to Closure's goog.style.getViewportPageOffset
     * @return {!Blockly.utils.Coordinate} The page offset of the viewport.
     */
    function getViewportPageOffset(): Blockly.utils.Coordinate;

    /**
     * Shows or hides an element from the page. Hiding the element is done by
     * setting the display property to "none", removing the element from the
     * rendering hierarchy so it takes up no space. To show the element, the default
     * inherited display property is restored (defined either in stylesheets or by
     * the browser's default style rules).
     * Copied from Closure's goog.style.getViewportPageOffset
     *
     * @param {!Element} el Element to show or hide.
     * @param {*} isShown True to render the element in its default style,
     *     false to disable rendering the element.
     */
    function setElementShown(el: Element, isShown: any): void;

    /**
     * Returns true if the element is using right to left (RTL) direction.
     * Copied from Closure's goog.style.isRightToLeft
     *
     * @param {!Element} el The element to test.
     * @return {boolean} True for right to left, false for left to right.
     */
    function isRightToLeft(el: Element): boolean;

    /**
     * Gets the computed border widths (on all sides) in pixels
     * Copied from Closure's goog.style.getBorderBox
     * @param {!Element} element  The element to get the border widths for.
     * @return {!Object} The computed border widths.
     */
    function getBorderBox(element: Element): Object;

    /**
     * Changes the scroll position of `container` with the minimum amount so
     * that the content and the borders of the given `element` become visible.
     * If the element is bigger than the container, its top left corner will be
     * aligned as close to the container's top left corner as possible.
     * Copied from Closure's goog.style.scrollIntoContainerView
     *
     * @param {!Element} element The element to make visible.
     * @param {!Element} container The container to scroll. If not set, then the
     *     document scroll element will be used.
     * @param {boolean=} opt_center Whether to center the element in the container.
     *     Defaults to false.
     */
    function scrollIntoContainerView(element: Element, container: Element, opt_center?: boolean): void;

    /**
     * Calculate the scroll position of `container` with the minimum amount so
     * that the content and the borders of the given `element` become visible.
     * If the element is bigger than the container, its top left corner will be
     * aligned as close to the container's top left corner as possible.
     * Copied from Closure's goog.style.getContainerOffsetToScrollInto
     *
     * @param {!Element} element The element to make visible.
     * @param {!Element} container The container to scroll. If not set, then the
     *     document scroll element will be used.
     * @param {boolean=} opt_center Whether to center the element in the container.
     *     Defaults to false.
     * @return {!Blockly.utils.Coordinate} The new scroll position of the container,
     *     in form of goog.math.Coordinate(scrollLeft, scrollTop).
     */
    function getContainerOffsetToScrollInto(element: Element, container: Element, opt_center?: boolean): Blockly.utils.Coordinate;
}
