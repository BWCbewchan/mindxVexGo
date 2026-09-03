
declare module Blockly.zelos {

    class StatementInput extends StatementInput__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class StatementInput__Class extends Blockly.blockRendering.StatementInput__Class  { 
    
            /**
             * An object containing information about the space a statement input takes up
             * during rendering
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @param {!Blockly.Input} input The statement input to measure and store
             *     information for.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.StatementInput}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider, input: Blockly.Input);
    } 
    
}
