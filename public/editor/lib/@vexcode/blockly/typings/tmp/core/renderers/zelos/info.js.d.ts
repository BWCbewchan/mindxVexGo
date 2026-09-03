
declare module Blockly.zelos {

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
             * @param {!Blockly.zelos.Renderer} renderer The renderer in use.
             * @param {!Blockly.BlockSvg} block The block to measure.
             * @constructor
             * @package
             * @extends {Blockly.blockRendering.RenderInfo}
             */
            constructor(renderer: Blockly.zelos.Renderer, block: Blockly.BlockSvg);
    
            /**
             * Whether the block should be rendered as a multi-line block, either because
             * it's not inline or because it has been collapsed.
             * @type {boolean}
             */
            isMultiRow: boolean;
    
            /**
             * Whether or not the block has a statement input in one of its rows.
             * @type {boolean}
             */
            hasStatementInput: boolean;
    
            /**
             * An object with rendering information about the right connection shape.
             * @type {Blockly.zelos.RightConnectionShape}
             */
            rightSide: Blockly.zelos.RightConnectionShape;
    
            /**
             * Get the block renderer in use.
             * @return {!Blockly.zelos.Renderer} The block renderer in use.
             * @package
             */
            getRenderer(): Blockly.zelos.Renderer;
    
            /**
             * Adjust the x position of fields to bump all non-label fields in the first row
             * past the notch position.  This must be called before ``computeBounds`` is
             * called.
             * @protected
             */
            adjustXPosition_(): void;
    
            /**
             * Finalize the output connection info.  In particular, set the height of the
             * output connection to match that of the block.  For the right side, add a
             * right connection shape element and have it match the dimensions of the
             * output connection.
             * @protected
             */
            finalizeOutputConnection_(): void;
    
            /**
             * Finalize horizontal alignment of elements on the block.  In particular,
             * reduce the implicit spacing created by the left and right output connection
             * shapes by adding setting negative spacing onto the leftmost and rightmost
             * spacers.
             * @protected
             */
            finalizeHorizontalAlignment_(): void;
    
            /**
             * Calculate the spacing to reduce the left and right edges by based on the
             * outer and inner connection shape.
             * @param {Blockly.blockRendering.Measurable} elem The first or last element on
             *     a block.
             * @return {number} The amount of spacing to reduce the first or last spacer.
             * @protected
             */
            getNegativeSpacing_(elem: Blockly.blockRendering.Measurable): number;
    
            /**
             * Finalize vertical alignment of rows on a block.  In particular, reduce the
             * implicit spacing when a non-shadow block is connected to any of an input
             * row's inline inputs.
             * @protected
             */
            finalizeVerticalAlignment_(): void;
    
            /**
             * Add spacers between rows and set their sizes.
             * @protected
             */
            addRowSpacing_(): void;
    
            /**
             * Figure out where the right edge of the block and right edge of statement inputs
             * should be placed.
             * @protected
             */
            computeBounds_(): void;
    } 
    
}
