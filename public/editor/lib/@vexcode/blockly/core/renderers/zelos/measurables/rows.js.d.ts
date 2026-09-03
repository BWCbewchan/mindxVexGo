
declare module Blockly.zelos {

    class TopRow extends TopRow__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class TopRow__Class extends Blockly.blockRendering.TopRow__Class  { 
    
            /**
             * An object containing information about what elements are in the top row of a
             * block as well as sizing information for the top row.
             * Elements in a top row can consist of corners, hats, spacers, and previous
             * connections.
             * After this constructor is called, the row will contain all non-spacer
             * elements it needs.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.TopRow}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider);
    } 
    

    class BottomRow extends BottomRow__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class BottomRow__Class extends Blockly.blockRendering.BottomRow__Class  { 
    
            /**
             * An object containing information about what elements are in the bottom row of
             * a block as well as spacing information for the top row.
             * Elements in a bottom row can consist of corners, spacers and next
             * connections.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.BottomRow}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider);
    } 
    
}
