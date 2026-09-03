
declare module Blockly.blockRendering {

    class InputConnection extends InputConnection__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class InputConnection__Class extends Blockly.blockRendering.Connection__Class  { 
    
            /**
             * The base class to represent an input that takes up space on a block
             * during rendering
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @param {!Blockly.Input} input The input to measure and store information for.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Connection}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider, input: Blockly.Input);
    } 
    

    class InlineInput extends InlineInput__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class InlineInput__Class extends Blockly.blockRendering.InputConnection__Class  { 
    
            /**
             * An object containing information about the space an inline input takes up
             * during rendering
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @param {!Blockly.Input} input The inline input to measure and store
             *     information for.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.InputConnection}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider, input: Blockly.Input);
    } 
    

    class StatementInput extends StatementInput__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class StatementInput__Class extends Blockly.blockRendering.InputConnection__Class  { 
    
            /**
             * An object containing information about the space a statement input takes up
             * during rendering
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @param {!Blockly.Input} input The statement input to measure and store
             *     information for.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.InputConnection}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider, input: Blockly.Input);
    } 
    

    class ExternalValueInput extends ExternalValueInput__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class ExternalValueInput__Class extends Blockly.blockRendering.InputConnection__Class  { 
    
            /**
             * An object containing information about the space an external value input
             * takes up during rendering
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @param {!Blockly.Input} input The external value input to measure and store
             *     information for.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.InputConnection}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider, input: Blockly.Input);
    } 
    
}
