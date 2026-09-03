
declare module Blockly.blockRendering {

    class Debug extends Debug__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Debug__Class  { 
    
            /**
             * An object that renders rectangles and dots for debugging rendering code.
             * @package
             * @constructor
             */
            constructor();
    
            /**
             * An array of SVG elements that have been created by this object.
             * @type {Array.<!SVGElement>}
             */
            debugElements_: SVGElement[];
    
            /**
             * The SVG root of the block that is being rendered.  Debug elements will
             * be attached to this root.
             * @type {SVGElement}
             */
            svgRoot_: SVGElement;
    
            /**
             * Remove all elements the this object created on the last pass.
             * @package
             */
            clearElems(): void;
    
            /**
             * Draw a debug rectangle for a spacer (empty) row.
             * @param {!Blockly.blockRendering.Row} row The row to render.
             * @param {number} cursorY The y position of the top of the row.
             * @param {boolean} isRtl Whether the block is rendered RTL.
             * @package
             */
            drawSpacerRow(row: Blockly.blockRendering.Row, cursorY: number, isRtl: boolean): void;
    
            /**
             * Draw a debug rectangle for a horizontal spacer.
             * @param {!Blockly.blockRendering.InRowSpacer} elem The spacer to render.
             * @param {number} rowHeight The height of the container row.
             * @param {boolean} isRtl Whether the block is rendered RTL.
             * @package
             */
            drawSpacerElem(elem: Blockly.blockRendering.InRowSpacer, rowHeight: number, isRtl: boolean): void;
    
            /**
             * Draw a debug rectangle for an in-row element.
             * @param {!Blockly.blockRendering.Measurable} elem The element to render.
             * @param {boolean} isRtl Whether the block is rendered RTL.
             * @package
             */
            drawRenderedElem(elem: Blockly.blockRendering.Measurable, isRtl: boolean): void;
    
            /**
             * Draw a circle at the location of the given connection.  Inputs and outputs
             * share the same colors, as do previous and next.  When positioned correctly
             * a connected pair will look like a bullseye.
             * @param {Blockly.RenderedConnection} conn The connection to circle.
             * @package
             */
            drawConnection(conn: Blockly.RenderedConnection): void;
    
            /**
             * Draw a debug rectangle for a non-empty row.
             * @param {!Blockly.blockRendering.Row} row The non-empty row to render.
             * @param {number} cursorY The y position of the top of the row.
             * @param {boolean} isRtl Whether the block is rendered RTL.
             * @package
             */
            drawRenderedRow(row: Blockly.blockRendering.Row, cursorY: number, isRtl: boolean): void;
    
            /**
             * Draw debug rectangles for a non-empty row and all of its subcomponents.
             * @param {!Blockly.blockRendering.Row} row The non-empty row to render.
             * @param {number} cursorY The y position of the top of the row.
             * @param {boolean} isRtl Whether the block is rendered RTL.
             * @package
             */
            drawRowWithElements(row: Blockly.blockRendering.Row, cursorY: number, isRtl: boolean): void;
    
            /**
             * Draw a debug rectangle around the entire block.
             * @param {!Blockly.blockRendering.RenderInfo} info Rendering information about
             *     the block to debug.
             * @package
             */
            drawBoundingBox(info: Blockly.blockRendering.RenderInfo): void;
    
            /**
             * Do all of the work to draw debug information for the whole block.
             * @param {!Blockly.BlockSvg} block The block to draw debug information for.
             * @param {!Blockly.blockRendering.RenderInfo} info Rendering information about
             *     the block to debug.
             * @package
             */
            drawDebug(block: Blockly.BlockSvg, info: Blockly.blockRendering.RenderInfo): void;
    } 
    
}

declare module Blockly.blockRendering.Debug {

    /**
     * Configuration object containing booleans to enable and disable debug
     * rendering of specific rendering components.
     * @type {!Object.<string, boolean>}
     */
    var config: { [key: string]: boolean };
}
