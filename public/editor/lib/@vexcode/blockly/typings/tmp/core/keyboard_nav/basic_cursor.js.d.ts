
declare module Blockly {

    class BasicCursor extends BasicCursor__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class BasicCursor__Class extends Blockly.Cursor__Class  { 
    
            /**
             * Class for a basic cursor.
             * This will allow the user to get to all nodes in the AST by hitting next or
             * previous.
             * @constructor
             * @extends {Blockly.Cursor}
             */
            constructor();
    
            /**
             * Uses pre order traversal to navigate the Blockly AST. This will allow
             * a user to easily navigate the entire Blockly AST without having to go in
             * and out levels on the tree.
             * @param {Blockly.ASTNode} node The current position in the AST.
             * @param {!function(Blockly.ASTNode) : boolean} isValid A function true/false
             *     depending on whether the given node should be traversed.
             * @return {Blockly.ASTNode} The next node in the traversal.
             * @protected
             */
            getNextNode_(node: Blockly.ASTNode, isValid: { (_0: Blockly.ASTNode): boolean }): Blockly.ASTNode;
    
            /**
             * Reverses the pre order traversal in order to find the previous node. This will
             * allow a user to easily navigate the entire Blockly AST without having to go in
             * and out levels on the tree.
             * @param {Blockly.ASTNode} node The current position in the AST.
             * @param {!function(Blockly.ASTNode) : boolean} isValid A function true/false
             *     depending on whether the given node should be traversed.
             * @return {Blockly.ASTNode} The previous node in the traversal or null if no
             *     previous node exists.
             * @protected
             */
            getPreviousNode_(node: Blockly.ASTNode, isValid: { (_0: Blockly.ASTNode): boolean }): Blockly.ASTNode;
    
            /**
             * Decides what nodes to traverse and which ones to skip. Currently, it
             * skips output, stack and workspace nodes.
             * @param {Blockly.ASTNode} node The AST node to check whether it is valid.
             * @return {boolean} True if the node should be visited, false otherwise.
             * @protected
             */
            validNode_(node: Blockly.ASTNode): boolean;
    } 
    
}
