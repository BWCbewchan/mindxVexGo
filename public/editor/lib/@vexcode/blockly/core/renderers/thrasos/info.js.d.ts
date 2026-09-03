
declare module Blockly.thrasos {

    class RenderInfo extends RenderInfo__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class RenderInfo__Class extends Blockly.blockRendering.RenderInfo__Class  { 
    
            /**
             * An object containing all sizing information needed to draw this block.
             *
             * This measure pass does not propagate changes to the block (although fields
             * may choose to rerender when getSize() is called).  However, calling it
             * repeatedly may be expensive.
             *
             * @param {!Blockly.thrasos.Renderer} renderer The renderer in use.
             * @param {!Blockly.BlockSvg} block The block to measure.
             * @constructor
             * @package
             * @extends {Blockly.blockRendering.RenderInfo}
             */
            constructor(renderer: Blockly.thrasos.Renderer, block: Blockly.BlockSvg);
    
            /**
             * Get the block renderer in use.
             * @return {!Blockly.thrasos.Renderer} The block renderer in use.
             * @package
             */
            getRenderer(): Blockly.thrasos.Renderer;
    } 
    
}
