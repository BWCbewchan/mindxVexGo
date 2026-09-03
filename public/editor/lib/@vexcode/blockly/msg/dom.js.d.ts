
declare module Blockly.utils.dom {

    /**
     * Required name space for SVG elements.
     * @const
     */
    var SVG_NS: any /*missing*/;

    /**
     * Required name space for HTML elements.
     * @const
     */
    var HTML_NS: any /*missing*/;

    /**
     * Required name space for XLINK elements.
     * @const
     */
    var XLINK_NS: any /*missing*/;

    /**
     * Node type constants.
     * https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
     * @enum {number}
     */
    enum Node { ELEMENT_NODE, TEXT_NODE, COMMENT_NODE, DOCUMENT_POSITION_CONTAINED_BY } 

    /**
     * Helper method for creating SVG elements.
     * @param {string} name Element's tag name.
     * @param {!Object} attrs Dictionary of attribute names and values.
     * @param {Element} parent Optional parent on which to append the element.
     * @return {!SVGElement} Newly created SVG element.
     */
    function createSvgElement(name: string, attrs: Object, parent: Element): SVGElement;

    /**
     * Add a CSS class to a element.
     * Similar to Closure's goog.dom.classes.add, except it handles SVG elements.
     * @param {!Element} element DOM element to add class to.
     * @param {string} className Name of class to add.
     * @return {boolean} True if class was added, false if already present.
     */
    function addClass(element: Element, className: string): boolean;

    /**
     * Remove a CSS class from a element.
     * Similar to Closure's goog.dom.classes.remove, except it handles SVG elements.
     * @param {!Element} element DOM element to remove class from.
     * @param {string} className Name of class to remove.
     * @return {boolean} True if class was removed, false if never present.
     */
    function removeClass(element: Element, className: string): boolean;

    /**
     * Checks if an element has the specified CSS class.
     * Similar to Closure's goog.dom.classes.has, except it handles SVG elements.
     * @param {!Element} element DOM element to check.
     * @param {string} className Name of class to check.
     * @return {boolean} True if class exists, false otherwise.
     */
    function hasClass(element: Element, className: string): boolean;

    /**
     * Removes a node from its parent. No-op if not attached to a parent.
     * @param {Node} node The node to remove.
     * @return {Node} The node removed if removed; else, null.
     */
    function removeNode(node: Node): Node;

    /**
     * Insert a node after a reference node.
     * Contrast with node.insertBefore function.
     * @param {!Element} newNode New element to insert.
     * @param {!Element} refNode Existing element to precede new node.
     */
    function insertAfter(newNode: Element, refNode: Element): void;

    /**
     * Whether a node contains another node.
     * @param {!Node} parent The node that should contain the other node.
     * @param {!Node} descendant The node to test presence of.
     * @return {boolean} Whether the parent node contains the descendant node.
     */
    function containsNode(parent: Node, descendant: Node): boolean;

    /**
     * Sets the CSS transform property on an element. This function sets the
     * non-vendor-prefixed and vendor-prefixed versions for backwards compatibility
     * with older browsers. See https://caniuse.com/#feat=transforms2d
     * @param {!Element} element Element to which the CSS transform will be applied.
     * @param {string} transform The value of the CSS `transform` property.
     */
    function setCssTransform(element: Element, transform: string): void;

    /**
     * Start caching text widths. Every call to this function MUST also call
     * stopTextWidthCache. Caches must not survive between execution threads.
     */
    function startTextWidthCache(): void;

    /**
     * Stop caching field widths. Unless caching was already on when the
     * corresponding call to startTextWidthCache was made.
     */
    function stopTextWidthCache(): void;

    /**
     * Gets the width of a text element, caching it in the process.
     * @param {!Element} textElement An SVG 'text' element.
     * @return {number} Width of element.
     */
    function getTextWidth(textElement: Element): number;
}
