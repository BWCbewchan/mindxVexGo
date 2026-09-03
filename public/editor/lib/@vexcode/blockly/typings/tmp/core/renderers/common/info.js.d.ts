
declare module Blockly.blockRendering {

    class RenderInfo extends RenderInfo__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class RenderInfo__Class  { 
    
            /**
             * An object containing all sizing information needed to draw this block.
             *
             * This measure pass does not propagate changes to the block (although fields
             * may choose to rerender when getSize() is called).  However, calling it
             * repeatedly may be expensive.
             *
             * @param {!Blockly.blockRendering.Renderer} renderer The renderer in use.
             * @param {!Blockly.BlockSvg} block The block to measure.
             * @constructor
             * @package
             */
            constructor(renderer: Blockly.blockRendering.Renderer, block: Blockly.BlockSvg);
    
            /**
             * The block renderer in use.
             * @type {!Blockly.blockRendering.Renderer}
             * @protected
             */
            renderer_: Blockly.blockRendering.Renderer;
    
            /**
             * The renderer's constant provider.
             * @type {!Blockly.blockRendering.ConstantProvider}
             * @protected
             */
            constants_: Blockly.blockRendering.ConstantProvider;
    
            /**
             * A measurable representing the output connection if the block has one.
             * Otherwise null.
             * @type {Blockly.blockRendering.OutputConnection}
             */
            outputConnection: Blockly.blockRendering.OutputConnection;
    
            /**
             * Whether the block should be rendered as a single line, either because it's
             * inline or because it has been collapsed.
             * @type {boolean}
             */
            isInline: boolean;
    
            /**
             * Whether the block is collapsed.
             * @type {boolean}
             */
            isCollapsed: boolean;
    
            /**
             * Whether the block is an insertion marker.  Insertion markers are the same
             * shape as normal blocks, but don't show fields.
             * @type {boolean}
             */
            isInsertionMarker: boolean;
    
            /**
             * True if the block should be rendered right-to-left.
             * @type {boolean}
             */
            RTL: boolean;
    
            /**
             * The height of the rendered block, including child blocks.
             * @type {number}
             */
            height: number;
    
            /**
             * The width of the rendered block, including child blocks.
             * @type {number}
             */
            widthWithChildren: number;
    
            /**
             * The width of the rendered block, excluding child blocks.  This is the right
             * edge of the block when rendered LTR.
             * @type {number}
             */
            width: number;
    
            /**
             *
             * @type {number}
             */
            statementEdge: number;
    
            /**
             * An array of Row objects containing sizing information.
             * @type {!Array.<!Blockly.blockRendering.Row>}
             */
            rows: Blockly.blockRendering.Row[];
    
            /**
             * An array of input rows on the block.
             * @type {!Array.<!Blockly.blockRendering.InputRow>}
             */
            inputRows: Blockly.blockRendering.InputRow[];
    
            /**
             * An array of measurable objects containing hidden icons.
             * @type {!Array.<!Blockly.blockRendering.Icon>}
             */
            hiddenIcons: Blockly.blockRendering.Icon[];
    
            /**
             * An object with rendering information about the top row of the block.
             * @type {!Blockly.blockRendering.TopRow}
             */
            topRow: Blockly.blockRendering.TopRow;
    
            /**
             * An object with rendering information about the bottom row of the block.
             * @type {!Blockly.blockRendering.BottomRow}
             */
            bottomRow: Blockly.blockRendering.BottomRow;
    
            /**
             * Get the block renderer in use.
             * @return {!Blockly.blockRendering.Renderer} The block renderer in use.
             * @package
             */
            getRenderer(): Blockly.blockRendering.Renderer;
    
            /**
             * Populate and return an object containing all sizing information needed to
             * draw this block.
             *
             * This measure pass does not propagate changes to the block (although fields
             * may choose to rerender when getSize() is called).  However, calling it
             * repeatedly may be expensive.
             *
             * @package
             */
            measure(): void;
    
            /**
             * Create rows of Measurable objects representing all renderable parts of the
             * block.
             * @protected
             */
            createRows_(): void;
    
            /**
             * Create all non-spacer elements that belong on the top row.
             * @package
             */
            populateTopRow_(): void;
    
            /**
             * Create all non-spacer elements that belong on the bottom row.
             * @package
             */
            populateBottomRow_(): void;
    
            /**
             * Add an input element to the active row, if needed, and record the type of the
             * input on the row.
             * @param {!Blockly.Input} input The input to record information about.
             * @param {!Blockly.blockRendering.Row} activeRow The row that is currently being
             *     populated.
             * @protected
             */
            addInput_(input: Blockly.Input, activeRow: Blockly.blockRendering.Row): void;
    
            /**
             * Decide whether to start a new row between the two Blockly.Inputs.
             * @param {!Blockly.Input} input The first input to consider
             * @param {Blockly.Input} lastInput The input that follows.
             * @return {boolean} True if the next input should be rendered on a new row.
             * @protected
             */
            shouldStartNewRow_(input: Blockly.Input, lastInput: Blockly.Input): boolean;
    
            /**
             * Add horizontal spacing between and around elements within each row.
             * @protected
             */
            addElemSpacing_(): void;
    
            /**
             * Calculate the width of a spacer element in a row based on the previous and
             * next elements in that row.  For instance, extra padding is added between two
             * editable fields.
             * @param {Blockly.blockRendering.Measurable} prev The element before the
             *     spacer.
             * @param {Blockly.blockRendering.Measurable} next The element after the spacer.
             * @return {number} The size of the spacing between the two elements.
             * @protected
             */
            getInRowSpacing_(prev: Blockly.blockRendering.Measurable, next: Blockly.blockRendering.Measurable): number;
    
            /**
             * Figure out where the right edge of the block and right edge of statement inputs
             * should be placed.
             * @protected
             */
            computeBounds_(): void;
    
            /**
             * Extra spacing may be necessary to make sure that the right sides of all
             * rows line up.  This can only be calculated after a first pass to calculate
             * the sizes of all rows.
             * @protected
             */
            alignRowElements_(): void;
    
            /**
             * Calculate the desired width of an input row.
             * @param {!Blockly.blockRendering.Row} _row The input row.
             * @return {number} The desired width of the input row.
             * @protected
             */
            getDesiredRowWidth_(_row: Blockly.blockRendering.Row): number;
    
            /**
             * Modify the given row to add the given amount of padding around its fields.
             * The exact location of the padding is based on the alignment property of the
             * last input in the field.
             * @param {Blockly.blockRendering.Row} row The row to add padding to.
             * @param {number} missingSpace How much padding to add.
             * @protected
             */
            addAlignmentPadding_(row: Blockly.blockRendering.Row, missingSpace: number): void;
    
            /**
             * Align the elements of a statement row based on computed bounds.
             * Unlike other types of rows, statement rows add space in multiple places.
             * @param {!Blockly.blockRendering.InputRow} row The statement row to resize.
             * @protected
             */
            alignStatementRow_(row: Blockly.blockRendering.InputRow): void;
    
            /**
             * Add spacers between rows and set their sizes.
             * @protected
             */
            addRowSpacing_(): void;
    
            /**
             * Create a spacer row to go between prev and next, and set its size.
             * @param {!Blockly.blockRendering.Row} prev The previous row.
             * @param {!Blockly.blockRendering.Row} next The next row.
             * @return {!Blockly.blockRendering.SpacerRow} The newly created spacer row.
             * @protected
             */
            makeSpacerRow_(prev: Blockly.blockRendering.Row, next: Blockly.blockRendering.Row): Blockly.blockRendering.SpacerRow;
    
            /**
             * Calculate the width of a spacer row.
             * @param {!Blockly.blockRendering.Row} _prev The row before the spacer.
             * @param {!Blockly.blockRendering.Row} _next The row after the spacer.
             * @return {number} The desired width of the spacer row between these two rows.
             * @protected
             */
            getSpacerRowWidth_(_prev: Blockly.blockRendering.Row, _next: Blockly.blockRendering.Row): number;
    
            /**
             * Calculate the height of a spacer row.
             * @param {!Blockly.blockRendering.Row} _prev The row before the spacer.
             * @param {!Blockly.blockRendering.Row} _next The row after the spacer.
             * @return {number} The desired height of the spacer row between these two rows.
             * @protected
             */
            getSpacerRowHeight_(_prev: Blockly.blockRendering.Row, _next: Blockly.blockRendering.Row): number;
    
            /**
             * Calculate the centerline of an element in a rendered row.
             * This base implementation puts the centerline at the middle of the row
             * vertically, with no special cases.  You will likely need extra logic to
             * handle (at minimum) top and bottom rows.
             * @param {!Blockly.blockRendering.Row} row The row containing the element.
             * @param {!Blockly.blockRendering.Measurable} elem The element to place.
             * @return {number} The desired centerline of the given element, as an offset
             *     from the top left of the block.
             * @protected
             */
            getElemCenterline_(row: Blockly.blockRendering.Row, elem: Blockly.blockRendering.Measurable): number;
    
            /**
             * Record final position information on elements on the given row, for use in
             * drawing.  At minimum this records xPos and centerline on each element.
             * @param {!Blockly.blockRendering.Row} row The row containing the elements.
             * @protected
             */
            recordElemPositions_(row: Blockly.blockRendering.Row): void;
    
            /**
             * Make any final changes to the rendering information object.  In particular,
             * store the y position of each row, and record the height of the full block.
             * @protected
             */
            finalize_(): void;
    } 
    
}
