
declare module Blockly.geras {

    class Highlighter extends Highlighter__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Highlighter__Class  { 
    
            /**
             * An object that adds highlights to a block based on the given rendering
             * information.
             *
             * Highlighting is interesting because the highlights do not fully enclose the
             * block.  Instead, they are positioned based on a light source in the top left.
             * This means that rendering highlights requires exact information about the
             * position of each part of the block.  The resulting paths are not continuous
             * or closed paths.  The highlights for tabs and notches are loosely based on
             * tab and notch shapes, but are not exactly the same.
             *
             * @param {!Blockly.geras.RenderInfo} info An object containing all
             *     information needed to render this block.
             * @package
             * @constructor
             */
            constructor(info: Blockly.geras.RenderInfo);
    
            /**
             * The renderer's constant provider.
             * @type {!Blockly.blockRendering.ConstantProvider}
             */
            constants_: Blockly.blockRendering.ConstantProvider;
    
            /**
             * @type {!Blockly.geras.HighlightConstantProvider}
             */
            highlightConstants_: Blockly.geras.HighlightConstantProvider;
    
            /**
             * Get the steps for the highlight path.
             * @return {string} The steps for the highlight path.
             * @package
             */
            getPath(): string;
    } 
    
}
