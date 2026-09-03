
declare module Blockly.ContextMenuItems {

    /** Option to undo previous action. */
    function registerUndo(): void;

    /** Option to redo previous action. */
    function registerRedo(): void;

    /** Option to clean up blocks. */
    function registerCleanup(): void;

    /** Option to collapse all blocks. */
    function registerCollapse(): void;

    /** Option to expand all blocks. */
    function registerExpand(): void;

    /** Option to delete all blocks. */
    function registerDeleteAll(): void;

    /** Option to duplicate a block. */
    function registerDuplicate(): void;

    /** Option to add or remove block-level comment. */
    function registerComment(): void;

    /** Option to inline variables. */
    function registerInline(): void;

    /** Option to collapse or expand a block. */
    function registerCollapseExpandBlock(): void;

    /** Option to disable or enable a block. */
    function registerDisable(): void;

    /** Option to delete a block. */
    function registerDelete(): void;

    /** Option to open help for a block. */
    function registerHelp(): void;

    /**
     * Registers all default context menu items. This should be called once per instance of
     * ContextMenuRegistry.
     * @package
     */
    function registerDefaultOptions(): void;
}
