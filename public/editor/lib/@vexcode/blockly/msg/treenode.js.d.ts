
declare module Blockly.tree {

    class TreeNode extends TreeNode__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class TreeNode__Class extends Blockly.tree.BaseNode__Class  { 
    
            /**
             * A single node in the tree, customized for Blockly's UI.
             * Similar to Closure's goog.ui.tree.TreeNode
             *
             * @param {Blockly.Toolbox} toolbox The parent toolbox for this tree.
             * @param {string} content The content of the node label treated as
             *     plain-text and will be HTML escaped.
             * @param {!Blockly.tree.BaseNode.Config} config The configuration for the tree.
             * @constructor
             * @extends {Blockly.tree.BaseNode}
             */
            constructor(toolbox: Blockly.Toolbox, content: string, config: Blockly.tree.BaseNode.Config);
    
            /**
             * Set the handler that's triggered when the size of node has changed.
             * @param {function():?} fn The handler
             * @package
             */
            onSizeChanged(fn: { (): any }): void;
    } 
    
}
