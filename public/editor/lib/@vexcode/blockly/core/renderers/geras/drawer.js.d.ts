
declare module Blockly.geras {

    class Drawer extends Drawer__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Drawer__Class extends Blockly.blockRendering.Drawer__Class  { 
    
            /**
             * An object that draws a block based on the given rendering information.
             * @param {!Blockly.BlockSvg} block The block to render.
             * @param {!Blockly.geras.RenderInfo} info An object containing all
             *   information needed to render this block.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Drawer}
             */
            constructor(block: Blockly.BlockSvg, info: Blockly.geras.RenderInfo);
    } 
    
}
