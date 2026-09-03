
declare module Blockly.Events {

    /**
     * Sets whether the next event should be added to the undo stack.
     * @type {boolean}
     */
    var recordUndo: boolean;

    /**
     * Name of event that creates a block. Will be deprecated for BLOCK_CREATE.
     * @const
     */
    var CREATE: any /*missing*/;

    /**
     * Name of event that creates a block.
     * @const
     */
    var BLOCK_CREATE: any /*missing*/;

    /**
     * Name of event that deletes a block. Will be deprecated for BLOCK_DELETE.
     * @const
     */
    var DELETE: any /*missing*/;

    /**
     * Name of event that deletes a block.
     * @const
     */
    var BLOCK_DELETE: any /*missing*/;

    /**
     * Name of event that changes a block. Will be deprecated for BLOCK_CHANGE.
     * @const
     */
    var CHANGE: any /*missing*/;

    /**
     * Name of event that changes a block.
     * @const
     */
    var BLOCK_CHANGE: any /*missing*/;

    /**
     * Name of event that moves a block. Will be deprecated for BLOCK_MOVE.
     * @const
     */
    var MOVE: any /*missing*/;

    /**
     * Name of event that moves a block.
     * @const
     */
    var BLOCK_MOVE: any /*missing*/;

    /**
     * Name of event that creates a variable.
     * @const
     */
    var VAR_CREATE: any /*missing*/;

    /**
     * Name of event that deletes a variable.
     * @const
     */
    var VAR_DELETE: any /*missing*/;

    /**
     * Name of event that renames a variable.
     * @const
     */
    var VAR_RENAME: any /*missing*/;

    /**
     * Name of event that records a UI change.
     * @const
     */
    var UI: any /*missing*/;

    /**
     * Name of event for monitor events
     * @const
     */
    var MONITOR: any /*missing*/;

    /**
     * Name of event that creates a comment.
     * @const
     */
    var COMMENT_CREATE: any /*missing*/;

    /**
     * Name of event that deletes a comment.
     * @const
     */
    var COMMENT_DELETE: any /*missing*/;

    /**
     * Name of event that changes a comment.
     * @const
     */
    var COMMENT_CHANGE: any /*missing*/;

    /**
     * Name of event that moves a comment.
     * @const
     */
    var COMMENT_MOVE: any /*missing*/;

    /**
     * Name of event that records a workspace load.
     */
    var FINISHED_LOADING: any /*missing*/;

    /**
     * List of events that cause objects to be bumped back into the visible
     * portion of the workspace (only used for non-movable workspaces).
     *
     * Not to be confused with bumping so that disconnected connections to do
     * not appear connected.
     * @const
     */
    var BUMP_EVENTS: any /*missing*/;

    /**
     * Create a custom event and fire it.
     * @param {!Blockly.Events.Abstract} event Custom data for event.
     */
    function fire(event: Blockly.Events.Abstract): void;

    /**
     * Filter the queued events and merge duplicates.
     * @param {!Array.<!Blockly.Events.Abstract>} queueIn Array of events.
     * @param {boolean} forward True if forward (redo), false if backward (undo).
     * @return {!Array.<!Blockly.Events.Abstract>} Array of filtered events.
     */
    function filter(queueIn: Blockly.Events.Abstract[], forward: boolean): Blockly.Events.Abstract[];

    /**
     * Modify pending undo events so that when they are fired they don't land
     * in the undo stack.  Called by Blockly.Workspace.clearUndo.
     */
    function clearPendingUndo(): void;

    /**
     * Stop sending events.  Every call to this function MUST also call enable.
     */
    function disable(): void;

    /**
     * Start sending events.  Unless events were already disabled when the
     * corresponding call to disable was made.
     */
    function enable(): void;

    /**
     * Returns whether events may be fired or not.
     * @return {boolean} True if enabled.
     */
    function isEnabled(): boolean;

    /**
     * Current group.
     * @return {string} ID string.
     */
    function getGroup(): string;

    /**
     * Start or stop a group.
     * @param {boolean|string} state True to start new group, false to end group.
     *   String to set group explicitly.
     */
    function setGroup(state: boolean|string): void;

    /**
     * Compute a list of the IDs of the specified block and all its descendants.
     * @param {!Blockly.Block} block The root block.
     * @return {!Array.<string>} List of block IDs.
     * @package
     */
    function getDescendantIds(block: Blockly.Block): string[];

    /**
     * Decode the JSON into an event.
     * @param {!Object} json JSON representation.
     * @param {!Blockly.Workspace} workspace Target workspace for event.
     * @return {!Blockly.Events.Abstract} The event represented by the JSON.
     * @throws {Error} if an event type is not found in the registry.
     */
    function fromJson(json: Object, workspace: Blockly.Workspace): Blockly.Events.Abstract;

    /**
     * Enable/disable a block depending on whether it is properly connected.
     * Use this on applications where all blocks should be connected to a top block.
     * Recommend setting the 'disable' option to 'false' in the config so that
     * users don't try to re-enable disabled orphan blocks.
     * @param {!Blockly.Events.Abstract} event Custom data for event.
     */
    function disableOrphans(event: Blockly.Events.Abstract): void;
}
