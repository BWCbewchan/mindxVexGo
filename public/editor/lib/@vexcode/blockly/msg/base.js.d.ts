
declare module Blockly.blockRendering {

    class Measurable extends Measurable__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Measurable__Class  { 
    
            /**
             * The base class to represent a part of a block that takes up space during
             * rendering.  The constructor for each non-spacer Measurable records the size
             * of the block element (e.g. field, statement input).
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @package
             * @constructor
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider);
    
            /**
             * The renderer's constant provider.
             * @type {!Blockly.blockRendering.ConstantProvider}
             * @protected
             */
            constants_: Blockly.blockRendering.ConstantProvider;
    } 
    
}
