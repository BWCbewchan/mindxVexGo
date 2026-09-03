
declare module Blockly.zelos {

    class Drawer extends Drawer__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Drawer__Class extends Blockly.blockRendering.Drawer__Class  { 
    
            /**
             * An object that draws a block based on the given rendering information.
             * @param {!Blockly.BlockSvg} block The block to render.
             * @param {!Blockly.zelos.RenderInfo} info An object containing all
             *   information needed to render this block.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Drawer}
             */
            constructor(block: Blockly.BlockSvg, info: Blockly.zelos.RenderInfo);
    
            /**
             * Add steps for the right side of a row that does not have value or
             * statement input connections.
             * @param {!Blockly.blockRendering.Row} row The row to draw the
             *     side of.
             * @protected
             */
            drawRightSideRow_(row: Blockly.blockRendering.Row): void;
    
            /**
             * Add steps to draw the right side of an output with a dynamic connection.
             * @protected
             */
            drawRightDynamicConnection_(): void;
    
            /**
             * Add steps to draw the left side of an output with a dynamic connection.
             * @protected
             */
            drawLeftDynamicConnection_(): void;
    
            /**
             * Add steps to draw a flat top row.
             * @protected
             */
            drawFlatTop_(): void;
    
            /**
             * Add steps to draw a flat bottom row.
             * @protected
             */
            drawFlatBottom_(): void;
    } 
    
}
