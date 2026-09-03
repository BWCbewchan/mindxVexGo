
declare module Blockly {

    /**
     * Blockly core version.
     * This constant is overridden by the build script (build.py) to the value of the version
     * in package.json. This is done during the gen_core build step.
     * For local builds, you can pass --define='Blockly.VERSION=X.Y.Z' to the compiler
     * to override this constant.
     * @define {string}
     */
    var VERSION: any /*missing*/;

    /**
     * The main workspace most recently used.
     * Set by Blockly.WorkspaceSvg.prototype.markFocused
     * @type {Blockly.Workspace}
     */
    var mainWorkspace: Blockly.Workspace;

    /**
     * Currently selected block.
     * @type {?Blockly.ICopyable}
     */
    var selected: Blockly.ICopyable;

    /**
     * All of the connections on blocks that are currently being dragged.
     * @type {!Array.<!Blockly.Connection>}
     * @package
     */
    var draggingConnections: Blockly.Connection[];

    /**
     * Container element to render the WidgetDiv, DropDownDiv and Tooltip.
     * @type {?Element}
     * @package
     */
    var parentContainer: Element;

    /**
     * Blockly opaque event data used to unbind events when using
     * `Blockly.bindEvent_` and `Blockly.bindEventWithChecks_`.
     * @typedef {!Array.<!Array>}
     */
    interface EventData extends Array<any[]> { }

    /**
     * Returns the dimensions of the specified SVG image.
     * @param {!SVGElement} svg SVG image.
     * @return {!Blockly.utils.Size} Contains width and height properties.
     */
    function svgSize(svg: SVGElement): Blockly.utils.Size;

    /**
     * Size the workspace when the contents change.  This also updates
     * scrollbars accordingly.
     * @param {!Blockly.WorkspaceSvg} workspace The workspace to resize.
     */
    function resizeSvgContents(workspace: Blockly.WorkspaceSvg): void;

    /**
     * Size the SVG image to completely fill its container. Call this when the view
     * actually changes sizes (e.g. on a window resize/device orientation change).
     * See Blockly.resizeSvgContents to resize the workspace when the contents
     * change (e.g. when a block is added or removed).
     * Record the height/width of the SVG image.
     * @param {!Blockly.WorkspaceSvg} workspace Any workspace in the SVG.
     */
    function svgResize(workspace: Blockly.WorkspaceSvg): void;

    /**
     * Handle a key-down on SVG drawing surface. Does nothing if the main workspace
     * is not visible.
     * @param {!KeyboardEvent} e Key down event.
     * @package
     */
    function onKeyDown(e: KeyboardEvent): void;

    /**
     * Duplicate this block and its children, or a workspace comment.
     * @param {!Blockly.ICopyable} toDuplicate Block or Workspace Comment to be
     *     copied.
     * @param {!Number} x x position of the block
     * @param {!Number} y y position of the block
     * @package
     * @return {!Blockly.Block} block
     */
    function duplicate(toDuplicate: Blockly.ICopyable, x: Number, y: Number): Blockly.Block;

    /**
     * Close tooltips, context menus, dropdown selections, etc.
     * @param {boolean=} opt_allowToolbox If true, don't close the toolbox.
     */
    function hideChaff(opt_allowToolbox?: boolean): void;

    /**
     * Returns the main workspace.  Returns the last used main workspace (based on
     * focus).  Try not to use this function, particularly if there are multiple
     * Blockly instances on a page.
     * @return {!Blockly.Workspace} The main workspace.
     */
    function getMainWorkspace(): Blockly.Workspace;

    /**
     * Wrapper to window.alert() that app developers may override to
     * provide alternatives to the modal browser window.
     * @param {string} message The message to display to the user.
     * @param {function()=} opt_callback The callback when the alert is dismissed.
     */
    function alert(message: string, opt_callback?: { (): any /*missing*/ }): void;

    /**
     * Wrapper to window.confirm() that app developers may override to
     * provide alternatives to the modal browser window.
     * @param {string} message The message to display to the user.
     * @param {!function(boolean)} callback The callback for handling user response.
     */
    function confirm(message: string, callback: { (_0: boolean): any /*missing*/ }): void;

    /**
     * Wrapper to window.prompt() that app developers may override to provide
     * alternatives to the modal browser window. Built-in browser prompts are
     * often used for better text input experience on mobile device. We strongly
     * recommend testing mobile when overriding this.
     * @param {string} message The message to display to the user.
     * @param {string} defaultValue The value to initialize the prompt with.
     * @param {!function(?string)} callback The callback for handling user response.
     * @param {string=} opt_title An optional title for the prompt. -RM
     * @param {string=} opt_varType An optional variable type for variable specific -RM
     */
    function prompt(message: string, defaultValue: string, callback: { (_0: string): any /*missing*/ }, opt_title?: string, opt_varType?: string): void;

    /**
     * Define blocks from an array of JSON block definitions, as might be generated
     * by the Blockly Developer Tools.
     * @param {!Array.<!Object>} jsonArray An array of JSON block definitions.
     */
    function defineBlocksWithJsonArray(jsonArray: Object[]): void;

    /**
     * Bind an event to a function call.  When calling the function, verifies that
     * it belongs to the touch stream that is currently being processed, and splits
     * multitouch events into multiple events as needed.
     * @param {!EventTarget} node Node upon which to listen.
     * @param {string} name Event name to listen to (e.g. 'mousedown').
     * @param {Object} thisObject The value of 'this' in the function.
     * @param {!Function} func Function to call when event is triggered.
     * @param {boolean=} opt_noCaptureIdentifier True if triggering on this event
     *     should not block execution of other event handlers on this touch or
     *     other simultaneous touches.  False by default.
     * @param {boolean=} opt_noPreventDefault True if triggering on this event
     *     should prevent the default handler.  False by default.  If
     *     opt_noPreventDefault is provided, opt_noCaptureIdentifier must also be
     *     provided.
     * @return {!Blockly.EventData} Opaque data that can be passed to unbindEvent_.
     */
    function bindEventWithChecks_(node: EventTarget, name: string, thisObject: Object, func: Function, opt_noCaptureIdentifier?: boolean, opt_noPreventDefault?: boolean): Blockly.EventData;

    /**
     * Bind an event to a function call.  Handles multitouch events by using the
     * coordinates of the first changed touch, and doesn't do any safety checks for
     * simultaneous event processing.  In most cases prefer is to use
     * `Blockly.bindEventWithChecks_`.
     * @param {!EventTarget} node Node upon which to listen.
     * @param {string} name Event name to listen to (e.g. 'mousedown').
     * @param {Object} thisObject The value of 'this' in the function.
     * @param {!Function} func Function to call when event is triggered.
     * @return {!Blockly.EventData} Opaque data that can be passed to unbindEvent_.
     */
    function bindEvent_(node: EventTarget, name: string, thisObject: Object, func: Function): Blockly.EventData;

    /**
     * Unbind one or more events event from a function call.
     * @param {!Array.<!Array>} bindData Opaque data from bindEvent_.
     *     This list is emptied during the course of calling this function.
     * @return {!Function} The function call.
     */
    function unbindEvent_(bindData: any[][]): Function;

    /**
     * Is the given string a number (includes negative and decimals).
     * @param {string} str Input string.
     * @return {boolean} True if number, false otherwise.
     */
    function isNumber(str: string): boolean;

    /**
     * Convert a hue (HSV model) into an RGB hex triplet.
     * @param {number} hue Hue on a colour wheel (0-360).
     * @return {string} RGB code, e.g. '#5ba65b'.
     */
    function hueToHex(hue: number): string;

    /**
     * Checks old colour constants are not overwritten by the host application.
     * If a constant is overwritten, it prints a console warning directing the
     * developer to use the equivalent Msg constant.
     * @package
     */
    function checkBlockColourConstants(): void;

    /**
     * Set the parent container.  This is the container element that the WidgetDiv,
     * DropDownDiv, and Tooltip are rendered into the first time `Blockly.inject`
     * is called.
     * This method is a NOP if called after the first ``Blockly.inject``.
     * @param {!Element} container The container element.
     */
    function setParentContainer(container: Element): void;
}
