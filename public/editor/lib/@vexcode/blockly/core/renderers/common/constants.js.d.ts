
declare module Blockly.blockRendering {

    class ConstantProvider extends ConstantProvider__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class ConstantProvider__Class  { 
    
            /**
             * An object that provides constants for rendering blocks.
             * @constructor
             * @package
             */
            constructor();
    
            /**
             * The size of an empty spacer.
             * @type {number}
             */
            NO_PADDING: number;
    
            /**
             * The size of small padding.
             * @type {number}
             */
            SMALL_PADDING: number;
    
            /**
             * The size of medium padding.
             * @type {number}
             */
            MEDIUM_PADDING: number;
    
            /**
             * The size of medium-large padding.
             * @type {number}
             */
            MEDIUM_LARGE_PADDING: number;
    
            /**
             * The size of large padding.
             * @type {number}
             */
            LARGE_PADDING: number;
    
            /**
             * Offset from the top of the row for placing fields on inline input rows
             * and statement input rows.
             * Matches existing rendering (in 2019).
             * @type {number}
             */
            TALL_INPUT_FIELD_OFFSET_Y: number;
    
            /**
             * The height of the puzzle tab used for input and output connections.
             * @type {number}
             */
            TAB_HEIGHT: number;
    
            /**
             * The offset from the top of the block at which a puzzle tab is positioned.
             * @type {number}
             */
            TAB_OFFSET_FROM_TOP: number;
    
            /**
             * Vertical overlap of the puzzle tab, used to make it look more like a puzzle
             * piece.
             * @type {number}
             */
            TAB_VERTICAL_OVERLAP: number;
    
            /**
             * The width of the puzzle tab used for input and output connections.
             * @type {number}
             */
            TAB_WIDTH: number;
    
            /**
             * The width of the notch used for previous and next connections.
             * @type {number}
             */
            NOTCH_WIDTH: number;
    
            /**
             * The height of the notch used for previous and next connections.
             * @type {number}
             */
            NOTCH_HEIGHT: number;
    
            /**
             * The minimum width of the block.
             * @type {number}
             */
            MIN_BLOCK_WIDTH: number;
    
            /**
             * The minimum height of a dummy input row.
             * @type {number}
             */
            DUMMY_INPUT_MIN_HEIGHT: number;
    
            /**
             * The minimum height of a dummy input row in a shadow block.
             * @type {number}
             */
            DUMMY_INPUT_SHADOW_MIN_HEIGHT: number;
    
            /**
             * Rounded corner radius.
             * @type {number}
             */
            CORNER_RADIUS: number;
    
            /**
             * Offset from the left side of a block or the inside of a statement input to
             * the left side of the notch.
             * @type {number}
             */
            NOTCH_OFFSET_LEFT: number;
    
            /**
             * Additional offset added to the statement input's width to account for the
             * notch.
             * @type {number}
             */
            STATEMENT_INPUT_NOTCH_OFFSET: number;
    
            /**
             * Vertical padding between consecutive statement inputs.
             * @type {number}
             */
            BETWEEN_STATEMENT_PADDING_Y: number;
    
            /**
             * The top row's minimum height.
             * @type {number}
             */
            TOP_ROW_MIN_HEIGHT: number;
    
            /**
             * The top row's minimum height if it precedes a statement.
             * @type {number}
             */
            TOP_ROW_PRECEDES_STATEMENT_MIN_HEIGHT: number;
    
            /**
             * The bottom row's minimum height.
             * @type {number}
             */
            BOTTOM_ROW_MIN_HEIGHT: number;
    
            /**
             * The bottom row's minimum height if it follows a statement input.
             * @type {number}
             */
            BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT: number;
    
            /**
             * Whether to add a 'hat' on top of all blocks with no previous or output
             * connections. Can be overridden by 'hat' property on Theme.BlockStyle.
             * @type {boolean}
             */
            ADD_START_HATS: boolean;
    
            /**
             * Height of the top hat.
             * @type {number}
             */
            START_HAT_HEIGHT: number;
    
            /**
             * Width of the top hat.
             * @type {number}
             */
            START_HAT_WIDTH: number;
    
            /**
             * The height of an empty inline input.
             * @type {number}
             */
            EMPTY_INLINE_INPUT_HEIGHT: number;
    
            /**
             * The height of an empty statement input.  Note that in the old rendering this
             * varies slightly depending on whether the block has external or inline inputs.
             * In the new rendering this is consistent.  It seems unlikely that the old
             * behaviour was intentional.
             * @type {number}
             */
            EMPTY_STATEMENT_INPUT_HEIGHT: number;
    
            /**
             * Height of SVG path for jagged teeth at the end of collapsed blocks.
             * @type {number}
             */
            JAGGED_TEETH_HEIGHT: number;
    
            /**
             * Width of SVG path for jagged teeth at the end of collapsed blocks.
             * @type {number}
             */
            JAGGED_TEETH_WIDTH: number;
    
            /**
             * Point size of text.
             * @type {number}
             */
            FIELD_TEXT_FONTSIZE: number;
    
            /**
             * Text font weight.
             * @type {string}
             */
            FIELD_TEXT_FONTWEIGHT: string;
    
            /**
             * Text font family.
             * @type {string}
             */
            FIELD_TEXT_FONTFAMILY: string;
    
            /**
             * Height of text.  This constant is dynamically set in ``setFontConstants_``
             * to be the height of the text based on the font used.
             * @type {number}
             */
            FIELD_TEXT_HEIGHT: number;
    
            /**
             * Text baseline.  This constant is dynamically set in ``setFontConstants_``
             * to be the baseline of the text based on the font used.
             * @type {number}
             */
            FIELD_TEXT_BASELINE: number;
    
            /**
             * A field's border rect corner radius.
             * @type {number}
             */
            FIELD_BORDER_RECT_RADIUS: number;
    
            /**
             * A field's border rect default height.
             * @type {number}
             */
            FIELD_BORDER_RECT_HEIGHT: number;
    
            /**
             * A field's border rect X padding.
             * @type {number}
             */
            FIELD_BORDER_RECT_X_PADDING: number;
    
            /**
             * A field's border rect Y padding.
             * @type {number}
             */
            FIELD_BORDER_RECT_Y_PADDING: number;
    
            /**
             * The backing colour of a field's border rect.
             * @type {string}
             * @package
             */
            FIELD_BORDER_RECT_COLOUR: string;
    
            /**
             * A field's text element's dominant baseline.
             * @type {boolean}
             */
            FIELD_TEXT_BASELINE_CENTER: boolean;
    
            /**
             * A dropdown field's border rect height.
             * @type {number}
             */
            FIELD_DROPDOWN_BORDER_RECT_HEIGHT: number;
    
            /**
             * Whether or not a dropdown field should add a border rect when in a shadow
             * block.
             * @type {boolean}
             */
            FIELD_DROPDOWN_NO_BORDER_RECT_SHADOW: boolean;
    
            /**
             * Whether or not a dropdown field's div should be coloured to match the
             * block colours.
             * @type {boolean}
             */
            FIELD_DROPDOWN_COLOURED_DIV: boolean;
    
            /**
             * Whether or not a dropdown field uses a text or SVG arrow.
             * @type {boolean}
             */
            FIELD_DROPDOWN_SVG_ARROW: boolean;
    
            /**
             * A dropdown field's SVG arrow padding.
             * @type {number}
             */
            FIELD_DROPDOWN_SVG_ARROW_PADDING: number;
    
            /**
             * A dropdown field's SVG arrow size.
             * @type {number}
             */
            FIELD_DROPDOWN_SVG_ARROW_SIZE: number;
    
            /**
             * A dropdown field's SVG arrow datauri.
             * @type {string}
             */
            FIELD_DROPDOWN_SVG_ARROW_DATAURI: string;
    
            /**
             * A mutator toggle field's SVG arrow size.
             * @type {number}
             */
            FIELD_MUTATORTOGGLE_SVG_ARROW_SIZE: number;
    
            /**
             * Whether or not to show a box shadow around the widget div. This is only a
             * feature of full block fields.
             * @type {boolean}
             */
            FIELD_TEXTINPUT_BOX_SHADOW: boolean;
    
            /**
             * Whether or not the colour field should display its colour value on the
             * entire block.
             * @type {boolean}
             */
            FIELD_COLOUR_FULL_BLOCK: boolean;
    
            /**
             * A colour field's default width.
             * @type {number}
             */
            FIELD_COLOUR_DEFAULT_WIDTH: number;
    
            /**
             * A colour field's default height.
             * @type {number}
             */
            FIELD_COLOUR_DEFAULT_HEIGHT: number;
    
            /**
             * A checkbox field's X offset.
             * @type {number}
             */
            FIELD_CHECKBOX_X_OFFSET: number;
    
            /**
             * A random identifier used to ensure a unique ID is used for each
             * filter/pattern for the case of multiple Blockly instances on a page.
             * @type {string}
             * @package
             */
            randomIdentifier: string;
    
            /**
             * The ID of the emboss filter, or the empty string if no filter is set.
             * @type {string}
             * @package
             */
            embossFilterId: string;
    
            /**
             * The ID of the disabled pattern, or the empty string if no pattern is set.
             * @type {string}
             * @package
             */
            disabledPatternId: string;
    
            /**
             * The ID of the debug filter, or the empty string if no pattern is set.
             * @type {string}
             * @package
             */
            debugFilterId: string;
    
            /**
             * Cursor colour.
             * @type {string}
             * @package
             */
            CURSOR_COLOUR: string;
    
            /**
             * Immovable marker colour.
             * @type {string}
             * @package
             */
            MARKER_COLOUR: string;
    
            /**
             * Width of the horizontal cursor.
             * @type {number}
             * @package
             */
            CURSOR_WS_WIDTH: number;
    
            /**
             * Height of the horizontal cursor.
             * @type {number}
             * @package
             */
            WS_CURSOR_HEIGHT: number;
    
            /**
             * Padding around a stack.
             * @type {number}
             * @package
             */
            CURSOR_STACK_PADDING: number;
    
            /**
             * Padding around a block.
             * @type {number}
             * @package
             */
            CURSOR_BLOCK_PADDING: number;
    
            /**
             * Stroke of the cursor.
             * @type {number}
             * @package
             */
            CURSOR_STROKE_WIDTH: number;
    
            /**
             * Whether text input and colour fields fill up the entire source block.
             * @type {boolean}
             * @package
             */
            FULL_BLOCK_FIELDS: boolean;
    
            /**
             * The main colour of insertion markers, in hex.  The block is rendered a
             * transparent grey by changing the fill opacity in CSS.
             * @type {string}
             * @package
             */
            INSERTION_MARKER_COLOUR: string;
    
            /**
             * The insertion marker opacity.
             * @type {number}
             * @package
             */
            INSERTION_MARKER_OPACITY: number;
    
            /**
             * Enum for connection shapes.
             * @enum {number}
             */
            SHAPES: any /*missing*/;
    
            /**
             * Initialize shape objects based on the constants set in the constructor.
             * @package
             */
            init(): void;
    
            /**
             * An object containing sizing and path information about collapsed block
             * indicators.
             * @type {!Object}
             */
            JAGGED_TEETH: Object;
    
            /**
             * An object containing sizing and path information about notches.
             * @type {!Object}
             */
            NOTCH: Object;
    
            /**
             * An object containing sizing and path information about start hats
             * @type {!Object}
             */
            START_HAT: Object;
    
            /**
             * An object containing sizing and path information about puzzle tabs.
             * @type {!Object}
             */
            PUZZLE_TAB: Object;
    
            /**
             * An object containing sizing and path information about inside corners
             * @type {!Object}
             */
            INSIDE_CORNERS: Object;
    
            /**
             * An object containing sizing and path information about outside corners.
             * @type {!Object}
             */
            OUTSIDE_CORNERS: Object;
    
            /**
             * An object containing sizing and path information about large outside corners.
             * @type {!Object}
             */
            LARGE_OUTSIDE_CORNERS: Object;
    
            /**
             * Refresh constants properties that depend on the theme.
             * @param {!Blockly.Theme} theme The current workspace theme.
             * @package
             */
            setTheme(theme: Blockly.Theme): void;
    
            /**
             * The block styles map.
             * @type {Object.<string, Blockly.Theme.BlockStyle>}
             * @package
             */
            blockStyles: { [key: string]: Blockly.Theme.BlockStyle };
    
            /**
             * Sets dynamic properties that depend on other values or theme properties.
             * @param {!Blockly.Theme} theme The current workspace theme.
             * @protected
             */
            setDynamicProperties_(theme: Blockly.Theme): void;
    
            /**
             * Set constants related to fonts.
             * @param {!Blockly.Theme} theme The current workspace theme.
             * @protected
             */
            setFontConstants_(theme: Blockly.Theme): void;
    
            /**
             * Set constants from a theme's component styles.
             * @param {!Blockly.Theme} theme The current workspace theme.
             * @protected
             */
            setComponentConstants_(theme: Blockly.Theme): void;
    
            /**
             * Get or create a block style based on a single colour value.  Generate a name
             * for the style based on the colour.
             * @param {string} colour #RRGGBB colour string.
             * @return {{style: !Blockly.Theme.BlockStyle, name: string}} An object
             *     containing the style and an autogenerated name for that style.
             * @package
             */
            getBlockStyleForColour(colour: string): { style: Blockly.Theme.BlockStyle; name: string };
    
            /**
             * Gets the BlockStyle for the given block style name.
             * @param {?string} blockStyleName The name of the block style.
             * @return {!Blockly.Theme.BlockStyle} The named block style, or a default style
             *     if no style with the given name was found.
             */
            getBlockStyle(blockStyleName: string): Blockly.Theme.BlockStyle;
    
            /**
             * Create a block style object based on the given colour.
             * @param {string} colour #RRGGBB colour string.
             * @return {!Blockly.Theme.BlockStyle} A populated block style based on the
             *     given colour.
             * @protected
             */
            createBlockStyle_(colour: string): Blockly.Theme.BlockStyle;
    
            /**
             * Get a full block style object based on the input style object.  Populate
             * any missing values.
             * @param {{
             *     colourPrimary:string,
             *     colourSecondary:(string|undefined),
             *     colourTertiary:(string|undefined),
             *     hat:(string|undefined)
             * }} blockStyle A full or partial block style object.
            
             * @return {!Blockly.Theme.BlockStyle} A full block style object, with all
             *     required properties populated.
             * @protected
             */
            validatedBlockStyle_(blockStyle: { colourPrimary: string; colourSecondary: string|any /*undefined*/; colourTertiary: string|any /*undefined*/; hat: string|any /*undefined*/ }): Blockly.Theme.BlockStyle;
    
            /**
             * Generate a secondary colour from the passed in primary colour.
             * @param {string} colour Primary colour.
             * @return {string} The generated secondary colour.
             * @protected
             */
            generateSecondaryColour_(colour: string): string;
    
            /**
             * Generate a tertiary colour from the passed in primary colour.
             * @param {string} colour Primary colour.
             * @return {string} The generated tertiary colour.
             * @protected
             */
            generateTertiaryColour_(colour: string): string;
    
            /**
             * Dispose of this constants provider.
             * Delete all DOM elements that this provider created.
             * @package
             */
            dispose(): void;
    
            /**
             * @return {!Object} An object containing sizing and path information about
             *     collapsed block indicators.
             * @package
             */
            makeJaggedTeeth(): Object;
    
            /**
             * @return {!Object} An object containing sizing and path information about
             *     start hats.
             * @package
             */
            makeStartHat(): Object;
    
            /**
             * @return {!Object} An object containing sizing and path information about
             *     puzzle tabs.
             * @package
             */
            makePuzzleTab(): Object;
    
            /**
             * @return {!Object} An object containing sizing and path information about
             *     notches.
             * @package
             */
            makeNotch(): Object;
    
            /**
             * @return {!Object} An object containing sizing and path information about
             *     inside corners.
             * @package
             */
            makeInsideCorners(): Object;
    
            /**
             * @return {!Object} An object containing sizing and path information about
             *     outside corners.
             * @package
             */
            makeOutsideCorners(): Object;
    
            /**
             * @return {!Object} An object containing sizing and path information about
             *     large outside corners.
             * @package
             */
            makeLargeOutsideCorners(): Object;
    
            /**
             * Get an object with connection shape and sizing information based on the type
             * of the connection.
             * @param {!Blockly.RenderedConnection} connection The connection to find a
             *     shape object for
             * @return {!Object} The shape object for the connection.
             * @package
             */
            shapeFor(connection: Blockly.RenderedConnection): Object;
    
            /**
             * Create any DOM elements that this renderer needs (filters, patterns, etc).
             * @param {!SVGElement} svg The root of the workspace's SVG.
             * @param {string} tagName The name to use for the CSS style tag.
             * @param {string} selector The CSS selector to use.
             * @suppress {strictModuleDepCheck} Debug renderer only included in playground.
             * @package
             */
            createDom(svg: SVGElement, tagName: string, selector: string): void;
    
            /**
             * Inject renderer specific CSS into the page.
             * @param {string} tagName The name of the style tag to use.
             * @param {string} selector The CSS selector to use.
             * @protected
             */
            injectCSS_(tagName: string, selector: string): void;
    
            /**
             * Get any renderer specific CSS to inject when the renderer is initialized.
             * @param {string} selector CSS selector to use.
             * @return {!Array.<string>} Array of CSS strings.
             * @protected
             */
            getCSS_(selector: string): string[];
    } 
    
}
