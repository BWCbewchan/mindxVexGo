
declare module Blockly.zelos {

    class MarkerSvg extends MarkerSvg__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class MarkerSvg__Class extends Blockly.blockRendering.MarkerSvg__Class  { 
    
            /**
             * Class to draw a marker.
             * @param {!Blockly.WorkspaceSvg} workspace The workspace the marker belongs to.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The constants for
             *     the renderer.
             * @param {!Blockly.Marker} marker The marker to draw.
             * @constructor
             * @extends {Blockly.blockRendering.MarkerSvg}
             */
            constructor(workspace: Blockly.WorkspaceSvg, constants: Blockly.blockRendering.ConstantProvider, marker: Blockly.Marker);
    
            /**
             * Draw a rectangle around the block.
             * @param {!Blockly.ASTNode} curNode The current node of the marker.
             */
            showWithBlock_(curNode: Blockly.ASTNode): void;
    } 
    
}
