
declare module Blockly.utils {

    /**
     * Don't do anything for this event, just halt propagation.
     * @param {!Event} e An event.
     */
    function noEvent(e: Event): void;

    /**
     * Is this event targeting a text input widget?
     * @param {!Event} e An event.
     * @return {boolean} True if text input.
     */
    function isTargetInput(e: Event): boolean;

    /**
     * Return the coordinates of the top-left corner of this element relative to
     * its parent.  Only for SVG elements and children (e.g. rect, g, path).
     * @param {!Element} element SVG element to find the coordinates of.
     * @return {!Blockly.utils.Coordinate} Object with .x and .y properties.
     */
    function getRelativeXY(element: Element): Blockly.utils.Coordinate;

    /**
     * Return the coordinates of the top-left corner of this element relative to
     * the div Blockly was injected into.
     * @param {!Element} element SVG element to find the coordinates of. If this is
     *     not a child of the div Blockly was injected into, the behaviour is
     *     undefined.
     * @return {!Blockly.utils.Coordinate} Object with .x and .y properties.
     */
    function getInjectionDivXY_(element: Element): Blockly.utils.Coordinate;

    /**
     * Is this event a right-click?
     * @param {!Event} e Mouse event.
     * @return {boolean} True if right-click.
     */
    function isRightButton(e: Event): boolean;

    /**
     * Return the converted coordinates of the given mouse event.
     * The origin (0,0) is the top-left corner of the Blockly SVG.
     * @param {!Event} e Mouse event.
     * @param {!Element} svg SVG element.
     * @param {SVGMatrix} matrix Inverted screen CTM to use.
     * @return {!SVGPoint} Object with .x and .y properties.
     */
    function mouseToSvg(e: Event, svg: Element, matrix: SVGMatrix): SVGPoint;

    /**
     * Get the scroll delta of a mouse event in pixel units.
     * @param {!Event} e Mouse event.
     * @return {{x: number, y: number}} Scroll delta object with .x and .y
     *    properties.
     */
    function getScrollDeltaPixels(e: Event): { x: number; y: number };

    /**
     * Parse a string with any number of interpolation tokens (%1, %2, ...).
     * It will also replace string table references (e.g., %{bky_my_msg} and
     * %{BKY_MY_MSG} will both be replaced with the value in
     * Blockly.Msg['MY_MSG']). Percentage sign characters '%' may be self-escaped
     * (e.g., '%%').
     * @param {string} message Text which might contain string table references and
     *     interpolation tokens.
     * @return {!Array.<string|number>} Array of strings and numbers.
     */
    function tokenizeInterpolation(message: string): string|number[];

    /**
     * Replaces string table references in a message, if the message is a string.
     * For example, "%{bky_my_msg}" and "%{BKY_MY_MSG}" will both be replaced with
     * the value in Blockly.Msg['MY_MSG'].
     * @param {string|?} message Message, which may be a string that contains
     *     string table references.
     * @return {string} String with message references replaced.
     */
    function replaceMessageReferences(message: string|any): string;

    /**
     * Validates that any %{MSG_KEY} references in the message refer to keys of
     * the Blockly.Msg string table.
     * @param {string} message Text which might contain string table references.
     * @return {boolean} True if all message references have matching values.
     *     Otherwise, false.
     */
    function checkMessageReferences(message: string): boolean;

    /**
     * Generate a unique ID.  This should be globally unique.
     * 87 characters ^ 20 length > 128 bits (better than a UUID).
     * @return {string} A globally unique ID string.
     */
    function genUid(): string;

    /**
     * Check if 3D transforms are supported by adding an element
     * and attempting to set the property.
     * @return {boolean} True if 3D transforms are supported.
     */
    function is3dSupported(): boolean;

    /**
     * Calls a function after the page has loaded, possibly immediately.
     * @param {function()} fn Function to run.
     * @throws Error Will throw if no global document can be found (e.g., Node.js).
     */
    function runAfterPageLoad(fn: { (): any /*missing*/ }): void;

    /**
     * Get the position of the current viewport in window coordinates.  This takes
     * scroll into account.
     * @return {!Blockly.utils.Rect} An object containing window width, height, and
     *     scroll position in window coordinates.
     * @package
     */
    function getViewportBBox(): Blockly.utils.Rect;

    /**
     * Removes the first occurrence of a particular value from an array.
     * @param {!Array} arr Array from which to remove
     *     value.
     * @param {*} obj Object to remove.
     * @return {boolean} True if an element was removed.
     * @package
     */
    function arrayRemove(arr: any[], obj: any): boolean;

    /**
     * Gets the document scroll distance as a coordinate object.
     * Copied from Closure's goog.dom.getDocumentScroll.
     * @return {!Blockly.utils.Coordinate} Object with values 'x' and 'y'.
     */
    function getDocumentScroll(): Blockly.utils.Coordinate;

    /**
     * Get a map of all the block's descendants mapping their type to the number of
     *    children with that type.
     * @param {!Blockly.Block} block The block to map.
     * @param {boolean=} opt_stripFollowing Optionally ignore all following
     *    statements (blocks that are not inside a value or statement input
     *    of the block).
     * @return {!Object} Map of types to type counts for descendants of the bock.
     */
    function getBlockTypeCounts(block: Blockly.Block, opt_stripFollowing?: boolean): Object;

    /**
     * Converts screen coordinates to workspace coordinates.
     * @param {Blockly.WorkspaceSvg} ws The workspace to find the coordinates on.
     * @param {Blockly.utils.Coordinate} screenCoordinates The screen coordinates to
     * be converted to workspace coordinates
     * @return {Blockly.utils.Coordinate} The workspace coordinates.
     * @package
     */
    function screenToWsCoordinates(ws: Blockly.WorkspaceSvg, screenCoordinates: Blockly.utils.Coordinate): Blockly.utils.Coordinate;

    /**
     * Parse a block colour from a number or string, as provided in a block
     * definition.
     * @param {number|string} colour HSV hue value (0 to 360), #RRGGBB string,
     *     or a message reference string pointing to one of those two values.
     * @return {{hue: ?number, hex: string}} An object containing the colour as
     *     a #RRGGBB string, and the hue if the input was an HSV hue value.
     * @throws {Error} If the colour cannot be parsed.
     */
    function parseBlockColour(colour: number|string): { hue: number; hex: string };
}
