
declare module Blockly {

    class Mutator extends Mutator__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Mutator__Class extends Blockly.Icon__Class  { 
    
            /**
             * Class for a mutator dialog.
             * @param {!Array.<string>} quarkNames List of names of sub-blocks for flyout.
             * @extends {Blockly.Icon}
             * @constructor
             */
            constructor(quarkNames: string[]);
    
            /**
             * Set the block this mutator is associated with.
             * @param {Blockly.BlockSvg} block The block associated with this mutator.
             * @package
             */
            setBlock(block: Blockly.BlockSvg): void;
    
            /**
             * Returns the workspace inside this mutator icon's bubble.
             * @return {Blockly.WorkspaceSvg} The workspace inside this mutator icon's
             *     bubble.
             * @package
             */
            getWorkspace(): Blockly.WorkspaceSvg;
    
            /**
             * Draw the mutator icon.
             * @param {!Element} group The icon group.
             * @protected
             */
            drawIcon_(group: Element): void;
    
            /**
             * Add or remove the UI indicating if this icon may be clicked or not.
             */
            updateEditable(): void;
    
            /**
             * Show or hide the mutator bubble.
             * @param {boolean} visible True if the bubble should be visible.
             */
            setVisible(visible: boolean): void;
    
            /**
             * Dispose of this mutator.
             */
            dispose(): void;
    
            /**
             * Update the styles on all blocks in the mutator.
             * @public
             */
            updateBlockStyle(): void;
    } 
    
}

declare module Blockly.Mutator {

    /**
     * Reconnect an block to a mutated input.
     * @param {Blockly.Connection} connectionChild Connection on child block.
     * @param {!Blockly.Block} block Parent block.
     * @param {string} inputName Name of input on parent block.
     * @return {boolean} True iff a reconnection was made, false otherwise.
     */
    function reconnect(connectionChild: Blockly.Connection, block: Blockly.Block, inputName: string): boolean;

    /**
     * Get the parent workspace of a workspace that is inside a mutator, taking into
     * account whether it is a flyout.
     * @param {Blockly.Workspace} workspace The workspace that is inside a mutator.
     * @return {Blockly.Workspace} The mutator's parent workspace or null.
     * @public
     */
    function findParentWs(workspace: Blockly.Workspace): Blockly.Workspace;
}
