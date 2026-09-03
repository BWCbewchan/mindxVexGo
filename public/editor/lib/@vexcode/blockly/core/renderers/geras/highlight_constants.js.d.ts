
declare module Blockly.geras {

    class HighlightConstantProvider extends HighlightConstantProvider__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class HighlightConstantProvider__Class  { 
    
            /**
             * An object that provides constants for rendering highlights on blocks.
             * Some highlights are simple offsets of the parent paths and can be generated
             * programmatically.  Others, especially on curves, are just made out of piles
             * of constants and are hard to tweak.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @constructor
             * @package
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider);
    
            /**
             * The renderer's constant provider.
             * @type {!Blockly.blockRendering.ConstantProvider}
             */
            constantProvider: Blockly.blockRendering.ConstantProvider;
    
            /**
             * The offset between the block's main path and highlight path.
             * @type {number}
             * @package
             */
            OFFSET: number;
    
            /**
             * The start point, which is offset in both X and Y, as an SVG path chunk.
             * @type {string}
             */
            START_POINT: string;
    
            /**
             * Initialize shape objects based on the constants set in the constructor.
             * @package
             */
            init(): void;
    
            /**
             * An object containing sizing and path information about inside corner
             * highlights.
             * @type {!Object}
             */
            INSIDE_CORNER: Object;
    
            /**
             * An object containing sizing and path information about outside corner
             * highlights.
             * @type {!Object}
             */
            OUTSIDE_CORNER: Object;
    
            /**
             * An object containing sizing and path information about puzzle tab
             * highlights.
             * @type {!Object}
             */
            PUZZLE_TAB: Object;
    
            /**
             * An object containing sizing and path information about notch highlights.
             * @type {!Object}
             */
            NOTCH: Object;
    
            /**
             * An object containing sizing and path information about highlights for
             * collapsed block indicators.
             * @type {!Object}
             */
            JAGGED_TEETH: Object;
    
            /**
             * An object containing sizing and path information about start hat
             * highlights.
             * @type {!Object}
             */
            START_HAT: Object;
    
            /**
             * @return {!Object} An object containing sizing and path information about
             *     inside corner highlights.
             * @package
             */
            makeInsideCorner(): Object;
    
            /**
             * @return {!Object} An object containing sizing and path information about
             *     outside corner highlights.
             * @package
             */
            makeOutsideCorner(): Object;
    
            /**
             * @return {!Object} An object containing sizing and path information about
             *     puzzle tab highlights.
             * @package
             */
            makePuzzleTab(): Object;
    
            /**
             * @return {!Object} An object containing sizing and path information about
             *     notch highlights.
             * @package
             */
            makeNotch(): Object;
    
            /**
             * @return {!Object} An object containing sizing and path information about
             *     collapsed block edge highlights.
             * @package
             */
            makeJaggedTeeth(): Object;
    
            /**
             * @return {!Object} An object containing sizing and path information about
             *     start highlights.
             * @package
             */
            makeStartHat(): Object;
    } 
    
}
