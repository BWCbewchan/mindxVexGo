
declare module Blockly {

    class CursorSvg extends CursorSvg__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class CursorSvg__Class  { 
    
            /**
             * Class for a cursor.
             * @param {!Blockly.WorkspaceSvg} workspace The workspace the cursor belongs to.
             * @param {boolean=} opt_marker True if the cursor is a marker. A marker is used
             *     to save a location and is an immovable cursor. False or undefined if the
             *     cursor is not a marker.
             * @constructor
             */
            constructor(workspace: Blockly.WorkspaceSvg, opt_marker?: boolean);
    
            /**
             * The current SVG element for the cursor.
             * @type {Element}
             */
            currentCursorSvg: Element;
    
            /**
             * Return the root node of the SVG or null if none exists.
             * @return {SVGElement} The root SVG node.
             */
            getSvgRoot(): SVGElement;
    
            /**
             * Create the DOM element for the cursor.
             * @return {!SVGElement} The cursor controls SVG group.
             * @package
             */
            createDom(): SVGElement;
    
            /**
             * Position the cursor for a block.
             * Displays an outline of the top half of a rectangle around a block.
             * @param {number} width The width of the block.
             * @param {number} cursorOffset The extra padding for around the block.
             * @param {number} cursorHeight The height of the cursor.
             */
            positionBlock_(width: number, cursorOffset: number, cursorHeight: number): void;
    
            /**
             * Hide the cursor.
             * @package
             */
            hide(): void;
    
            /**
             * Update the cursor.
             * @param {Blockly.ASTNode} curNode The node that we want to draw the cursor for.
             * @package
             */
            draw(curNode: Blockly.ASTNode): void;
    
            /**
             * Dispose of this cursor.
             * @package
             */
            dispose(): void;
    } 
    
}

declare module Blockly.CursorSvg {

    /**
     * Height of the horizontal cursor.
     * @type {number}
     * @const
     */
    var CURSOR_HEIGHT: number;

    /**
     * Width of the horizontal cursor.
     * @type {number}
     * @const
     */
    var CURSOR_WIDTH: number;

    /**
     * The start length of the notch.
     * @type {number}
     * @const
     */
    var NOTCH_START_LENGTH: number;

    /**
     * Padding around the input.
     * @type {number}
     * @const
     */
    var VERTICAL_PADDING: number;

    /**
     * Padding around a stack.
     * @type {number}
     * @const
     */
    var STACK_PADDING: number;

    /**
     * Padding around a block.
     * @type {number}
     * @const
     */
    var BLOCK_PADDING: number;

    /**
     * What we multiply the height by to get the height of the cursor.
     * Only used for the block and block connections.
     * @type {number}
     * @const
     */
    var HEIGHT_MULTIPLIER: number;

    /**
     * Cursor color.
     * @type {string}
     * @const
     */
    var CURSOR_COLOR: string;

    /**
     * Immovable marker color.
     * @type {string}
     * @const
     */
    var MARKER_COLOR: string;

    /**
     * The name of the CSS class for a cursor.
     * @const {string}
     */
    var CURSOR_CLASS: any /*missing*/;

    /**
     * The name of the CSS class for a marker.
     * @const {string}
     */
    var MARKER_CLASS: any /*missing*/;
}
