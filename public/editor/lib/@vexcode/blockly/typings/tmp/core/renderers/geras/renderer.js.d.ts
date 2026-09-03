
declare module Blockly.geras {

    class Renderer extends Renderer__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Renderer__Class extends Blockly.blockRendering.Renderer__Class  { 
    
            /**
             * The geras renderer.
             * @param {string} name The renderer name.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Renderer}
             */
            constructor(name: string);
    
            /**
             * Create a new instance of the renderer's highlight constant provider.
             * @return {!Blockly.geras.HighlightConstantProvider} The highlight constant
             *     provider.
             * @protected
             */
            makeHighlightConstants_(): Blockly.geras.HighlightConstantProvider;
    
            /**
             * Get the renderer's highlight constant provider.  We assume that when this is
             * called, the renderer has already been initialized.
             * @return {!Blockly.geras.HighlightConstantProvider} The highlight constant
             *     provider.
             * @package
             */
            getHighlightConstants(): Blockly.geras.HighlightConstantProvider;
    } 
    
}
