
declare module Blockly.geras {

    class ConstantProvider extends ConstantProvider__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class ConstantProvider__Class extends Blockly.blockRendering.ConstantProvider__Class  { 
    
            /**
             * An object that provides constants for rendering blocks in Geras mode.
             * @constructor
             * @package
             * @extends {Blockly.blockRendering.ConstantProvider}
             */
            constructor();
    
            /**
             * The maximum width of a bottom row that follows a statement input and has
             * inputs inline.
             * @type {number}
             */
            MAX_BOTTOM_WIDTH: number;
    } 
    
}
