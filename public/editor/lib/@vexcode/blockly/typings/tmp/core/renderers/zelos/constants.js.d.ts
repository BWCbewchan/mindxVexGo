
declare module Blockly.zelos {

    class ConstantProvider extends ConstantProvider__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class ConstantProvider__Class extends Blockly.blockRendering.ConstantProvider__Class  { 
    
            /**
             * An object that provides constants for rendering blocks in Zelos mode.
             * @constructor
             * @package
             * @extends {Blockly.blockRendering.ConstantProvider}
             */
            constructor();
    
            /**
             * Minimum statement input spacer width.
             * @type {number}
             */
            STATEMENT_INPUT_SPACER_MIN_WIDTH: number;
    
            /**
             * Radius of the cursor for input and output connections.
             * @type {number}
             * @package
             */
            CURSOR_RADIUS: number;
    
            /**
             * Map of output/input shapes and the amount they should cause a block to be
             * padded. Outer key is the outer shape, inner key is the inner shape.
             * When a block with the outer shape contains an input block with the inner
             * shape on its left or right edge, the block elements are aligned such that
             * the padding specified is reached.
             * @package
             */
            SHAPE_IN_SHAPE_PADDING: any /*missing*/;
    
            /**
             * The maximum width of a dynamic connection shape.
             * @type {number}
             */
            MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH: number;
    
            /**
             * The selected glow colour.
             * @type {string}
             */
            SELECTED_GLOW_COLOUR: string;
    
            /**
             * The size of the selected glow.
             * @type {number}
             */
            SELECTED_GLOW_SIZE: number;
    
            /**
             * The highlighted glow colour.
             * @type {string}
             */
            HIGHLIGHTED_GLOW_COLOUR: string;
    
            /**
             * The size of the highlighted glow.
             * @type {number}
             */
            HIGHLIGHTED_GLOW_SIZE: number;
    
            /**
             * The replacement glow colour.
             * @type {string}
             */
            REPLACEMENT_GLOW_COLOUR: string;
    
            /**
             * The size of the selected glow.
             * @type {number}
             */
            REPLACEMENT_GLOW_SIZE: number;
    
            /**
             * The ID of the selected glow filter, or the empty string if no filter is
             * set.
             * @type {string}
             * @package
             */
            selectedGlowFilterId: string;
    
            /**
             * The ID of the highlighted glow filter, or the empty string if no filter is
             * set.
             * @type {string}
             * @package
             */
            highlightedGlowFilterId: string;
    
            /**
             * The ID of the replacement glow filter, or the empty string if no filter is
             * set.
             * @type {string}
             * @package
             */
            replacementGlowFilterId: string;
    
            /**
             * Create sizing and path information about a hexagonal shape.
             * @return {!Object} An object containing sizing and path information about
             *     a hexagonal shape for connections.
             * @package
             */
            makeHexagonal(): Object;
    
            /**
             * Create sizing and path information about a rounded shape.
             * @return {!Object} An object containing sizing and path information about
             *     a rounded shape for connections.
             * @package
             */
            makeRounded(): Object;
    
            /**
             * Create sizing and path information about a squared shape.
             * @return {!Object} An object containing sizing and path information about
             *     a squared shape for connections.
             * @package
             */
            makeSquared(): Object;
    } 
    
}
