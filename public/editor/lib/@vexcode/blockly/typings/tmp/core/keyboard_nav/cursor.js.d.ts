
declare module Blockly {

    class Cursor extends Cursor__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Cursor__Class extends Blockly.Marker__Class implements Blockly.IBlocklyActionable  { 
    
            /**
             * Class for a cursor.
             * A cursor controls how a user navigates the Blockly AST.
             * @constructor
             * @extends {Blockly.Marker}
             * @implements {Blockly.IBlocklyActionable}
             */
            constructor();
    
            /**
             * Find the next connection, field, or block.
             * @return {Blockly.ASTNode} The next element, or null if the current node is
             *     not set or there is no next value.
             * @protected
             */
            next(): Blockly.ASTNode;
    
            /**
             * Find the in connection or field.
             * @return {Blockly.ASTNode} The in element, or null if the current node is
             *     not set or there is no in value.
             * @protected
             */
            in(): Blockly.ASTNode;
    
            /**
             * Find the previous connection, field, or block.
             * @return {Blockly.ASTNode} The previous element, or null if the current node
             *     is not set or there is no previous value.
             * @protected
             */
            prev(): Blockly.ASTNode;
    
            /**
             * Find the out connection, field, or block.
             * @return {Blockly.ASTNode} The out element, or null if the current node is
             *     not set or there is no out value.
             * @protected
             */
            out(): Blockly.ASTNode;
    
            /**
             * Handles the given action.
             * This is only triggered when keyboard navigation is enabled.
             * @param {!Blockly.Action} action The action to be handled.
             * @return {boolean} True if the action has been handled, false otherwise.
             */
            onBlocklyAction(action: Blockly.Action): boolean;
    } 
    
}
