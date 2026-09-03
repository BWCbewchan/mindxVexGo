
declare module Blockly.blockRendering {

    class Connection extends Connection__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Connection__Class extends Blockly.blockRendering.Measurable__Class  { 
    
            /**
             * The base class to represent a connection and the space that it takes up on
             * the block.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @param {!Blockly.RenderedConnection} connectionModel The connection object on
             *     the block that this represents.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Measurable}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider, connectionModel: Blockly.RenderedConnection);
    } 
    

    class OutputConnection extends OutputConnection__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class OutputConnection__Class extends Blockly.blockRendering.Connection__Class  { 
    
            /**
             * An object containing information about the space an output connection takes
             * up during rendering.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @param {Blockly.RenderedConnection} connectionModel The connection object on
             *     the block that this represents.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Connection}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider, connectionModel: Blockly.RenderedConnection);
    } 
    

    class PreviousConnection extends PreviousConnection__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class PreviousConnection__Class extends Blockly.blockRendering.Connection__Class  { 
    
            /**
             * An object containing information about the space a previous connection takes
             * up during rendering.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @param {Blockly.RenderedConnection} connectionModel The connection object on
             *     the block that this represents.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Connection}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider, connectionModel: Blockly.RenderedConnection);
    } 
    

    class NextConnection extends NextConnection__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class NextConnection__Class extends Blockly.blockRendering.Connection__Class  { 
    
            /**
             * An object containing information about the space a next connection takes
             * up during rendering.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @param {Blockly.RenderedConnection} connectionModel The connection object on
             *     the block that this represents.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Connection}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider, connectionModel: Blockly.RenderedConnection);
    } 
    
}
