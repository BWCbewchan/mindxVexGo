
declare module Blockly.ContextMenu {

    /**
     * Which block is the context menu attached to?
     * @type {Blockly.Block}
     */
    var currentBlock: Blockly.Block;

    /**
     * Construct the menu based on the list of options and show the menu.
     * @param {!Event} e Mouse event.
     * @param {!Array.<!Object>} options Array of menu options.
     * @param {boolean} rtl True if RTL, false if LTR.
     */
    function show(e: Event, options: Object[], rtl: boolean): void;

    /**
     * Hide the context menu.
     */
    function hide(): void;

    /**
     * Dispose of the menu.
     */
    function dispose(): void;

    /**
     * Create a callback function that creates and configures a block,
     *   then places the new block next to the original.
     * @param {!Blockly.Block} block Original block.
     * @param {!Element} xml XML representation of new block.
     * @return {!Function} Function that creates a block.
     */
    function callbackFactory(block: Blockly.Block, xml: Element): Function;

    /**
     * Make a context menu option for deleting the current workspace comment.
     * @param {!Blockly.WorkspaceCommentSvg} comment The workspace comment where the
     *     right-click originated.
     * @return {!Object} A menu option, containing text, enabled, and a callback.
     * @package
     */
    function commentDeleteOption(comment: Blockly.WorkspaceCommentSvg): Object;

    /**
     * Make a context menu option for duplicating the current workspace comment.
     * @param {!Blockly.WorkspaceCommentSvg} comment The workspace comment where the
     *     right-click originated.
     * @return {!Object} A menu option, containing text, enabled, and a callback.
     * @package
     */
    function commentDuplicateOption(comment: Blockly.WorkspaceCommentSvg): Object;

    /**
     * Make a context menu option for adding a comment on the workspace.
     * @param {!Blockly.WorkspaceSvg} ws The workspace where the right-click
     *     originated.
     * @param {!Event} e The right-click mouse event.
     * @return {!Object} A menu option, containing text, enabled, and a callback.
     * @package
     * @suppress {strictModuleDepCheck,checkTypes} Suppress checks while workspace
     *     comments are not bundled in.
     */
    function workspaceCommentOption(ws: Blockly.WorkspaceSvg, e: Event): Object;
}
