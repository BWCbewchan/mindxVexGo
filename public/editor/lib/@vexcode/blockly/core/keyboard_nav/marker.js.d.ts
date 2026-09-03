
declare module Blockly {

    class Marker extends Marker__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Marker__Class  { 
    
            /**
             * Class for a marker.
             * This is used in keyboard navigation to save a location in the Blockly AST.
             * @constructor
             */
            constructor();
    
            /**
             * The colour of the marker.
             * @type {?string}
             */
            colour: string;
    
            /**
             * The type of the marker.
             * @type {string}
             */
            type: string;
    
            /**
             * Sets the object in charge of drawing the marker.
             * @param {Blockly.blockRendering.MarkerSvg} drawer The object in charge of
             *     drawing the marker.
             */
            setDrawer(drawer: Blockly.blockRendering.MarkerSvg): void;
    
            /**
             * Get the current drawer for the marker.
             * @return {Blockly.blockRendering.MarkerSvg} The object in charge of drawing
             *     the marker.
             */
            getDrawer(): Blockly.blockRendering.MarkerSvg;
    
            /**
             * Gets the current location of the marker.
             * @return {Blockly.ASTNode} The current field, connection, or block the marker
             *     is on.
             */
            getCurNode(): Blockly.ASTNode;
    
            /**
             * Set the location of the marker and call the update method.
             * Setting isStack to true will only work if the newLocation is the top most
             * output or previous connection on a stack.
             * @param {Blockly.ASTNode} newNode The new location of the marker.
             */
            setCurNode(newNode: Blockly.ASTNode): void;
    
            /**
             * Redraw the current marker.
             * @package
             */
            draw(): void;
    
            /**
             * Hide the marker SVG.
             */
            hide(): void;
    
            /**
             * Dispose of this marker.
             */
            dispose(): void;
    } 
    
}
