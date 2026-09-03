
declare module Blockly {

    class Cursor extends Cursor__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Cursor__Class  { 
    
            /**
             * Class for a cursor.
             * A cursor controls how a user navigates the Blockly AST.
             * @constructor
             */
            constructor();
    
            /**
             * Sets the object in charge of drawing the cursor.
             * @param {Blockly.CursorSvg} drawer The object in charge of drawing the cursor.
             */
            setDrawer(drawer: Blockly.CursorSvg): void;
    
            /**
             * Get the current drawer for the cursor.
             * @return {Blockly.CursorSvg} The object in charge of drawing the cursor.
             */
            getDrawer(): Blockly.CursorSvg;
    
            /**
             * Gets the current location of the cursor.
             * @return {Blockly.ASTNode} The current field, connection, or block the cursor
             *     is on.
             */
            getCurNode(): Blockly.ASTNode;
    
            /**
             * Set the location of the cursor and call the update method.
             * Setting isStack to true will only work if the newLocation is the top most
             * output or previous connection on a stack.
             * @param {Blockly.ASTNode} newNode The new location of the cursor.
             */
            setCurNode(newNode: Blockly.ASTNode): void;
    
            /**
             * Hide the cursor SVG.
             */
            hide(): void;
    
            /**
             * Find the next connection, field, or block.
             * @return {Blockly.ASTNode} The next element, or null if the current node is
             *     not set or there is no next value.
             */
            next(): Blockly.ASTNode;
    
            /**
             * Find the in connection or field.
             * @return {Blockly.ASTNode} The in element, or null if the current node is
             *     not set or there is no in value.
             */
            in(): Blockly.ASTNode;
    
            /**
             * Find the previous connection, field, or block.
             * @return {Blockly.ASTNode} The previous element, or null if the current node
             *     is not set or there is no previous value.
             */
            prev(): Blockly.ASTNode;
    
            /**
             * Find the out connection, field, or block.
             * @return {Blockly.ASTNode} The out element, or null if the current node is
             *     not set or there is no out value.
             */
            out(): Blockly.ASTNode;
    } 
    
}
