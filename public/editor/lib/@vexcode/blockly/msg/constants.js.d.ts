
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
             * Rounded corner radius.
             * @type {number}
             */
            CORNER_RADIUS: number;
    
            /**
             * The height of an empty statement input.  Note that in the old rendering this
             * varies slightly depending on whether the block has external or inline inputs.
             * In the new rendering this is consistent.  It seems unlikely that the old
             * behaviour was intentional.
             * @const
             * @type {number}
             */
            EMPTY_STATEMENT_INPUT_HEIGHT: number;
    
            /**
             * Height of SVG path for jagged teeth at the end of collapsed blocks.
             * @const
             */
            JAGGED_TEETH_HEIGHT: any /*missing*/;
    
            /**
             * Width of SVG path for jagged teeth at the end of collapsed blocks.
             * @const
             */
            JAGGED_TEETH_WIDTH: any /*missing*/;
    
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
             * Get an object with connection shape and sizing information based on the type
             * of the connection.
             * @param {!Blockly.RenderedConnection} connection The connection to find a
             *     shape object for
             * @return {!Object} The shape object for the connection.
             * @package
             */
            shapeFor(connection: Blockly.RenderedConnection): Object;
    } 
    
}
