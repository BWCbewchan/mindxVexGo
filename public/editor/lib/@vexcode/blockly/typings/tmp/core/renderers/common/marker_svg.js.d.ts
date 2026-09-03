
declare module Blockly.blockRendering {

    class MarkerSvg extends MarkerSvg__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class MarkerSvg__Class  { 
    
            /**
             * Class for a marker.
             * @param {!Blockly.WorkspaceSvg} workspace The workspace the marker belongs to.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The constants for
             *     the renderer.
             * @param {!Blockly.Marker} marker The marker to draw.
             * @constructor
             */
            constructor(workspace: Blockly.WorkspaceSvg, constants: Blockly.blockRendering.ConstantProvider, marker: Blockly.Marker);
    
            /**
             * The constants necessary to draw the marker.
             * @type {Blockly.blockRendering.ConstantProvider}
             * @protected
             */
            constants_: Blockly.blockRendering.ConstantProvider;
    
            /**
             * The current SVG element for the marker.
             * @type {Element}
             */
            currentMarkerSvg: Element;
    
            /**
             * The colour of the marker.
             * @type {string}
             */
            colour_: string;
    
            /**
             * Return the root node of the SVG or null if none exists.
             * @return {SVGElement} The root SVG node.
             */
            getSvgRoot(): SVGElement;
    
            /**
             * Get the marker.
             * @return {!Blockly.Marker} The marker to draw for.
             */
            getMarker(): Blockly.Marker;
    
            /**
             * True if the marker should be drawn as a cursor, false otherwise.
             * A cursor is drawn as a flashing line. A marker is drawn as a solid line.
             * @return {boolean} True if the marker is a cursor, false otherwise.
             */
            isCursor(): boolean;
    
            /**
             * Create the DOM element for the marker.
             * @return {!SVGElement} The marker controls SVG group.
             * @package
             */
            createDom(): SVGElement;
    
            /**
             * Attaches the SVG root of the marker to the SVG group of the parent.
             * @param {!Blockly.IASTNodeLocationSvg} newParent The workspace, field, or
             *     block that the marker SVG element should be attached to.
             * @protected
             */
            setParent_(newParent: Blockly.IASTNodeLocationSvg): void;
    
            /**
             * Update the marker.
             * @param {Blockly.ASTNode} oldNode The previous node the marker was on or null.
             * @param {Blockly.ASTNode} curNode The node that we want to draw the marker for.
             */
            draw(oldNode: Blockly.ASTNode, curNode: Blockly.ASTNode): void;
    
            /**
             * Update the marker's visible state based on the type of curNode..
             * @param {!Blockly.ASTNode} curNode The node that we want to draw the marker for.
             * @protected
             */
            showAtLocation_(curNode: Blockly.ASTNode): void;
    
            /**
             * Position and display the marker for a block.
             * @param {!Blockly.ASTNode} curNode The node to draw the marker for.
             * @protected
             */
            showWithBlock_(curNode: Blockly.ASTNode): void;
    
            /**
             * Position and display the marker for a previous connection.
             * @param {!Blockly.ASTNode} curNode The node to draw the marker for.
             * @protected
             */
            showWithPrevious_(curNode: Blockly.ASTNode): void;
    
            /**
             * Position and display the marker for an output connection.
             * @param {!Blockly.ASTNode} curNode The node to draw the marker for.
             * @protected
             */
            showWithOutput_(curNode: Blockly.ASTNode): void;
    
            /**
             * Position and display the marker for a workspace coordinate.
             * This is a horizontal line.
             * @param {!Blockly.ASTNode} curNode The node to draw the marker for.
             * @protected
             */
            showWithCoordinates_(curNode: Blockly.ASTNode): void;
    
            /**
             * Position and display the marker for a field.
             * This is a box around the field.
             * @param {!Blockly.ASTNode} curNode The node to draw the marker for.
             * @protected
             */
            showWithField_(curNode: Blockly.ASTNode): void;
    
            /**
             * Position and display the marker for an input.
             * This is a puzzle piece.
             * @param {!Blockly.ASTNode} curNode The node to draw the marker for.
             * @protected
             */
            showWithInput_(curNode: Blockly.ASTNode): void;
    
            /**
             * Position and display the marker for a next connection.
             * This is a horizontal line.
             * @param {!Blockly.ASTNode} curNode The node to draw the marker for.
             * @protected
             */
            showWithNext_(curNode: Blockly.ASTNode): void;
    
            /**
             * Position and display the marker for a stack.
             * This is a box with extra padding around the entire stack of blocks.
             * @param {!Blockly.ASTNode} curNode The node to draw the marker for.
             * @protected
             */
            showWithStack_(curNode: Blockly.ASTNode): void;
    
            /**
             * Show the current marker.
             * @protected
             */
            showCurrent_(): void;
    
            /**
             * Position the marker for a block.
             * Displays an outline of the top half of a rectangle around a block.
             * @param {number} width The width of the block.
             * @param {number} markerOffset The extra padding for around the block.
             * @param {number} markerHeight The height of the marker.
             * @protected
             */
            positionBlock_(width: number, markerOffset: number, markerHeight: number): void;
    
            /**
             * Position the marker for an input connection.
             * Displays a filled in puzzle piece.
             * @param {!Blockly.RenderedConnection} connection The connection to position
             *     marker around.
             * @protected
             */
            positionInput_(connection: Blockly.RenderedConnection): void;
    
            /**
             * Move and show the marker at the specified coordinate in workspace units.
             * Displays a horizontal line.
             * @param {number} x The new x, in workspace units.
             * @param {number} y The new y, in workspace units.
             * @param {number} width The new width, in workspace units.
             * @protected
             */
            positionLine_(x: number, y: number, width: number): void;
    
            /**
             * Position the marker for an output connection.
             * Displays a puzzle outline and the top and bottom path.
             * @param {number} width The width of the block.
             * @param {number} height The height of the block.
             * @param {!Object} connectionShape The shape object for the connection.
             * @protected
             */
            positionOutput_(width: number, height: number, connectionShape: Object): void;
    
            /**
             * Position the marker for a previous connection.
             * Displays a half rectangle with a notch in the top to represent the previous
             * connection.
             * @param {number} width The width of the block.
             * @param {number} markerOffset The offset of the marker from around the block.
             * @param {number} markerHeight The height of the marker.
             * @param {!Object} connectionShape The shape object for the connection.
             * @protected
             */
            positionPrevious_(width: number, markerOffset: number, markerHeight: number, connectionShape: Object): void;
    
            /**
             * Move and show the marker at the specified coordinate in workspace units.
             * Displays a filled in rectangle.
             * @param {number} x The new x, in workspace units.
             * @param {number} y The new y, in workspace units.
             * @param {number} width The new width, in workspace units.
             * @param {number} height The new height, in workspace units.
             * @protected
             */
            positionRect_(x: number, y: number, width: number, height: number): void;
    
            /**
             * Hide the marker.
             */
            hide(): void;
    
            /**
             * Get the properties to make a marker blink.
             * @return {!Object} The object holding attributes to make the marker blink.
             * @protected
             */
            getBlinkProperties_(): Object;
    
            /**
             * Create the marker SVG.
             * @return {Element} The SVG node created.
             * @protected
             */
            createDomInternal_(): Element;
    
            /**
             * Apply the marker's colour.
             * @param {!Blockly.ASTNode} _curNode The node that we want to draw the marker
             *    for.
             * @protected
             */
            applyColour_(_curNode: Blockly.ASTNode): void;
    
            /**
             * Dispose of this marker.
             */
            dispose(): void;
    } 
    
}

declare module Blockly.blockRendering.MarkerSvg {

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

    /**
     * What we multiply the height by to get the height of the marker.
     * Only used for the block and block connections.
     * @const {number}
     */
    var HEIGHT_MULTIPLIER: any /*missing*/;
}
