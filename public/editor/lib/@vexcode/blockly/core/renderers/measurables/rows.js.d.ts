
declare module Blockly.blockRendering {

    class Row extends Row__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Row__Class  { 
    
            /**
             * An object representing a single row on a rendered block and all of its
             * subcomponents.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @package
             * @constructor
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider);
    
            /**
             * The type of this rendering object.
             * @package
             * @type {number}
             */
            type: number;
    
            /**
             * An array of elements contained in this row.
             * @package
             * @type {!Array.<!Blockly.blockRendering.Measurable>}
             */
            elements: Blockly.blockRendering.Measurable[];
    
            /**
             * The height of the row.
             * @package
             * @type {number}
             */
            height: number;
    
            /**
             * The width of the row, from the left edge of the block to the right.
             * Does not include child blocks unless they are inline.
             * @package
             * @type {number}
             */
            width: number;
    
            /**
             * The minimum height of the row.
             * @package
             * @type {number}
             */
            minHeight: number;
    
            /**
             * The minimum width of the row, from the left edge of the block to the right.
             * Does not include child blocks unless they are inline.
             * @package
             * @type {number}
             */
            minWidth: number;
    
            /**
             * The width of the row, from the left edge of the block to the edge of the
             * block or any connected child blocks.
             * @package
             * @type {number}
             */
            widthWithConnectedBlocks: number;
    
            /**
             * The Y position of the row relative to the origin of the block's svg group.
             * @package
             * @type {number}
             */
            yPos: number;
    
            /**
             * The X position of the row relative to the origin of the block's svg group.
             * @package
             * @type {number}
             */
            xPos: number;
    
            /**
             * Whether the row has any external inputs.
             * @package
             * @type {boolean}
             */
            hasExternalInput: boolean;
    
            /**
             * Whether the row has any statement inputs.
             * @package
             * @type {boolean}
             */
            hasStatement: boolean;
    
            /**
             * Whether the row has any inline inputs.
             * @package
             * @type {boolean}
             */
            hasInlineInput: boolean;
    
            /**
             * Whether the row has any dummy inputs.
             * @package
             * @type {boolean}
             */
            hasDummyInput: boolean;
    
            /**
             * Whether the row has a jagged edge.
             * @package
             * @type {boolean}
             */
            hasJaggedEdge: boolean;
    
            /**
             * The renderer's constant provider.
             * @type {!Blockly.blockRendering.ConstantProvider}
             * @protected
             */
            constants_: Blockly.blockRendering.ConstantProvider;
    
            /**
             * Alignment of the row.
             * @package
             * @type {?number}
             */
            align: number;
    
            /**
             * Inspect all subcomponents and populate all size properties on the row.
             * @package
             */
            measure(): void;
    
            /**
             * Get the last input on this row, if it has one.
             * @return {Blockly.blockRendering.InputConnection} The last input on the row,
             *     or null.
             * @package
             */
            getLastInput(): Blockly.blockRendering.InputConnection;
    
            /**
             * Determines whether this row should start with an element spacer.
             * @return {boolean} Whether the row should start with a spacer.
             * @package
             */
            startsWithElemSpacer(): boolean;
    
            /**
             * Determines whether this row should end with an element spacer.
             * @return {boolean} Whether the row should end with a spacer.
             * @package
             */
            endsWithElemSpacer(): boolean;
    
            /**
             * Convenience method to get the first spacer element on this row.
             * @return {Blockly.blockRendering.InRowSpacer} The first spacer element on
             *   this row.
             * @package
             */
            getFirstSpacer(): Blockly.blockRendering.InRowSpacer;
    
            /**
             * Convenience method to get the last spacer element on this row.
             * @return {Blockly.blockRendering.InRowSpacer} The last spacer element on
             *   this row.
             * @package
             */
            getLastSpacer(): Blockly.blockRendering.InRowSpacer;
    } 
    

    class TopRow extends TopRow__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class TopRow__Class extends Blockly.blockRendering.Row__Class  { 
    
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
             * @extends {Blockly.blockRendering.Row}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider);
    
            /**
             * The starting point for drawing the row, in the y direction.
             * This allows us to draw hats and similar shapes that don't start at the
             * origin. Must be non-negative (see #2820).
             * @package
             * @type {number}
             */
            capline: number;
    
            /**
             * How much the row extends up above its capline.
             * @type {number}
             */
            ascenderHeight: number;
    
            /**
             * Whether the block has a previous connection.
             * @package
             * @type {boolean}
             */
            hasPreviousConnection: boolean;
    
            /**
             * The previous connection on the block, if any.
             * @type {Blockly.blockRendering.PreviousConnection}
             */
            connection: Blockly.blockRendering.PreviousConnection;
    
            /**
             * Returns whether or not the top row has a left square corner.
             * @param {!Blockly.BlockSvg} block The block whose top row this represents.
             * @return {boolean} Whether or not the top row has a left square corner.
             */
            hasLeftSquareCorner(block: Blockly.BlockSvg): boolean;
    
            /**
             * Returns whether or not the top row has a right square corner.
             * @param {!Blockly.BlockSvg} _block The block whose top row this represents.
             * @return {boolean} Whether or not the top row has a right square corner.
             */
            hasRightSquareCorner(_block: Blockly.BlockSvg): boolean;
    } 
    

    class BottomRow extends BottomRow__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class BottomRow__Class extends Blockly.blockRendering.Row__Class  { 
    
            /**
             * An object containing information about what elements are in the bottom row of
             * a block as well as spacing information for the top row.
             * Elements in a bottom row can consist of corners, spacers and next
             * connections.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Row}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider);
    
            /**
             * Whether this row has a next connection.
             * @package
             * @type {boolean}
             */
            hasNextConnection: boolean;
    
            /**
             * The next connection on the row, if any.
             * @package
             * @type {Blockly.blockRendering.NextConnection}
             */
            connection: Blockly.blockRendering.NextConnection;
    
            /**
             * The amount that the bottom of the block extends below the horizontal edge,
             * e.g. because of a next connection.  Must be non-negative (see #2820).
             * @package
             * @type {number}
             */
            descenderHeight: number;
    
            /**
             * The Y position of the bottom edge of the block, relative to the origin
             * of the block rendering.
             * @type {number}
             */
            baseline: number;
    
            /**
             * Returns whether or not the bottom row has a left square corner.
             * @param {!Blockly.BlockSvg} block The block whose bottom row this represents.
             * @return {boolean} Whether or not the bottom row has a left square corner.
             */
            hasLeftSquareCorner(block: Blockly.BlockSvg): boolean;
    
            /**
             * Returns whether or not the bottom row has a right square corner.
             * @param {!Blockly.BlockSvg} _block The block whose bottom row this represents.
             * @return {boolean} Whether or not the bottom row has a right square corner.
             */
            hasRightSquareCorner(_block: Blockly.BlockSvg): boolean;
    } 
    

    class SpacerRow extends SpacerRow__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class SpacerRow__Class extends Blockly.blockRendering.Row__Class  { 
    
            /**
             * An object containing information about a spacer between two rows.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @param {number} height The height of the spacer.
             * @param {number} width The width of the spacer.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Row}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider, height: number, width: number);
    } 
    

    class InputRow extends InputRow__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class InputRow__Class extends Blockly.blockRendering.Row__Class  { 
    
            /**
             * An object containing information about a row that holds one or more inputs.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Row}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider);
    
            /**
             * The total width of all blocks connected to this row.
             * @type {number}
             * @package
             */
            connectedBlockWidths: number;
    
            /**
             * Inspect all subcomponents and populate all size properties on the row.
             * @package
             */
            measure(): void;
    } 
    
}
