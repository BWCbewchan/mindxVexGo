
declare module Blockly.navigation {

    /**
     * A function to call to give feedback to the user about logs, warnings, and
     * errors.  You can override this to customize feedback (e.g. warning sounds,
     * reading out the warning text, etc).
     * Null by default.
     * The first argument is one of 'log', 'warn', and 'error'.
     * The second argument is the message.
     * @type {?function(string, string)}
     * @public
     */
    var loggingCallback: { (_0: string, _1: string): any /*missing*/ };

    /**
     * State indicating focus is currently on the flyout.
     * @type {number}
     * @const
     */
    var STATE_FLYOUT: number;

    /**
     * State indicating focus is currently on the workspace.
     * @type {number}
     * @const
     */
    var STATE_WS: number;

    /**
     * State indicating focus is currently on the toolbox.
     * @type {number}
     * @const
     */
    var STATE_TOOLBOX: number;

    /**
     * The distance to move the cursor on the workspace.
     * @type {number}
     * @const
     */
    var WS_MOVE_DISTANCE: number;

    /**
     * Object holding default action names.
     * @enum {string}
     */
    enum actionNames { PREVIOUS, NEXT, IN, OUT, INSERT, MARK, DISCONNECT, TOOLBOX, EXIT, TOGGLE_KEYBOARD_NAV, MOVE_WS_CURSOR_UP, MOVE_WS_CURSOR_DOWN, MOVE_WS_CURSOR_LEFT, MOVE_WS_CURSOR_RIGHT } 

    /**
     * The name of the marker reserved for internal use.
     * @type {string}
     * @const
     */
    var MARKER_NAME: string;

    /**
     * Get the local marker.
     * @return {Blockly.Marker} The local marker for the main workspace.
     */
    function getMarker(): Blockly.Marker;

    /**
     * Get the workspace that is being navigated.
     * @return {!Blockly.WorkspaceSvg} The workspace being navigated.
     */
    function getNavigationWorkspace(): Blockly.WorkspaceSvg;

    /**
     * If there is a marked connection try connecting the block from the flyout to
     * that connection. If no connection has been marked then inserting will place
     * it on the workspace.
     */
    function insertFromFlyout(): void;

    /**
     * Tries to connect the given block to the destination connection, making an
     * intelligent guess about which connection to use to on the moving block.
     * @param {!Blockly.BlockSvg} block The block to move.
     * @param {!Blockly.RenderedConnection} destConnection The connection to connect
     *     to.
     * @return {boolean} Whether the connection was successful.
     */
    function insertBlock(block: Blockly.BlockSvg, destConnection: Blockly.RenderedConnection): boolean;

    /**
     * Set the current navigation state.
     * @param {number} newState The new navigation state.
     * @package
     */
    function setState(newState: number): void;

    /**
     * Before a block is deleted move the cursor to the appropriate position.
     * @param {!Blockly.BlockSvg} deletedBlock The block that is being deleted.
     */
    function moveCursorOnBlockDelete(deletedBlock: Blockly.BlockSvg): void;

    /**
     * When a block that the cursor is on is mutated move the cursor to the block
     * level.
     * @param {!Blockly.BlockSvg} mutatedBlock The block that is being mutated.
     * @package
     */
    function moveCursorOnBlockMutation(mutatedBlock: Blockly.BlockSvg): void;

    /**
     * Enable accessibility mode.
     */
    function enableKeyboardAccessibility(): void;

    /**
     * Disable accessibility mode.
     */
    function disableKeyboardAccessibility(): void;

    /**
     * Handler for all the keyboard navigation events.
     * @param {!KeyboardEvent} e The keyboard event.
     * @return {boolean} True if the key was handled false otherwise.
     */
    function onKeyPress(e: KeyboardEvent): boolean;

    /**
     * Decides which actions to handle depending on keyboard navigation and readonly
     * states.
     * @param {!Blockly.Action} action The current action.
     * @return {boolean} True if the action has been handled, false otherwise.
     */
    function onBlocklyAction(action: Blockly.Action): boolean;

    /**
     * The previous action.
     * @type {!Blockly.Action}
     */
    var ACTION_PREVIOUS: Blockly.Action;

    /**
     * The out action.
     * @type {!Blockly.Action}
     */
    var ACTION_OUT: Blockly.Action;

    /**
     * The next action.
     * @type {!Blockly.Action}
     */
    var ACTION_NEXT: Blockly.Action;

    /**
     * The in action.
     * @type {!Blockly.Action}
     */
    var ACTION_IN: Blockly.Action;

    /**
     * The action to try to insert a block.
     * @type {!Blockly.Action}
     */
    var ACTION_INSERT: Blockly.Action;

    /**
     * The action to mark a certain location.
     * @type {!Blockly.Action}
     */
    var ACTION_MARK: Blockly.Action;

    /**
     * The action to disconnect a block.
     * @type {!Blockly.Action}
     */
    var ACTION_DISCONNECT: Blockly.Action;

    /**
     * The action to open the toolbox.
     * @type {!Blockly.Action}
     */
    var ACTION_TOOLBOX: Blockly.Action;

    /**
     * The action to exit the toolbox or flyout.
     * @type {!Blockly.Action}
     */
    var ACTION_EXIT: Blockly.Action;

    /**
     * The action to toggle keyboard navigation mode on and off.
     * @type {!Blockly.Action}
     */
    var ACTION_TOGGLE_KEYBOARD_NAV: Blockly.Action;

    /**
     * The action to move the cursor to the left on a workspace.
     * @type {!Blockly.Action}
     */
    var ACTION_MOVE_WS_CURSOR_LEFT: Blockly.Action;

    /**
     * The action to move the cursor to the right on a workspace.
     * @type {!Blockly.Action}
     */
    var ACTION_MOVE_WS_CURSOR_RIGHT: Blockly.Action;

    /**
     * The action to move the cursor up on a workspace.
     * @type {!Blockly.Action}
     */
    var ACTION_MOVE_WS_CURSOR_UP: Blockly.Action;

    /**
     * The action to move the cursor down on a workspace.
     * @type {!Blockly.Action}
     */
    var ACTION_MOVE_WS_CURSOR_DOWN: Blockly.Action;

    /**
     * List of actions that can be performed in read only mode.
     * @type {!Array.<!Blockly.Action>}
     */
    var READONLY_ACTION_LIST: Blockly.Action[];
}
