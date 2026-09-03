
declare module Blockly.tree {

    class TreeControl extends TreeControl__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class TreeControl__Class extends Blockly.tree.BaseNode__Class  { 
    
            /**
             * An extension of the TreeControl object in closure that provides
             * a way to view a hierarchical set of data.
             * Similar to Closure's goog.ui.tree.TreeControl
             *
             * @param {Blockly.Toolbox} toolbox The parent toolbox for this tree.
             * @param {!Blockly.tree.BaseNode.Config} config The configuration for the tree.
             * @constructor
             * @extends {Blockly.tree.BaseNode}
             */
            constructor(toolbox: Blockly.Toolbox, config: Blockly.tree.BaseNode.Config);
    
            /**
             * Returns the associated toolbox.
             * @return {Blockly.Toolbox} The toolbox.
             * @package
             */
            getToolbox(): Blockly.Toolbox;
    
            /**
             * Get whether this tree has focus or not.
             * @return {boolean} True if it has focus.
             * @package
             */
            hasFocus(): boolean;
    
            /**
             * Sets the selected item.
             * @param {Blockly.tree.BaseNode} node The item to select.
             * @package
             */
            setSelectedItem(node: Blockly.tree.BaseNode): void;
    
            /**
             * Set the handler that's triggered before a node is selected.
             * @param {function(Blockly.tree.BaseNode):boolean} fn The handler
             * @package
             */
            onBeforeSelected(fn: { (_0: Blockly.tree.BaseNode): boolean }): void;
    
            /**
             * Set the handler that's triggered after a node is selected.
             * @param {function(
             *  Blockly.tree.BaseNode, Blockly.tree.BaseNode):?} fn The handler
             * @package
             */
            onAfterSelected(fn: { (_0: Blockly.tree.BaseNode, _1: Blockly.tree.BaseNode): any }): void;
    
            /**
             * Returns the selected item.
             * @return {Blockly.tree.BaseNode} The currently selected item.
             * @package
             */
            getSelectedItem(): Blockly.tree.BaseNode;
    
            /**
             * Creates a new tree node using the same config as the root.
             * @param {string=} opt_content The content of the node label.
             * @return {!Blockly.tree.TreeNode} The new item.
             * @package
             */
            createNode(opt_content?: string): Blockly.tree.TreeNode;
    } 
    
}
