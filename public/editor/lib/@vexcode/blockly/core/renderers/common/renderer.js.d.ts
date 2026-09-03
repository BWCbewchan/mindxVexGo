
declare module Blockly.blockRendering {

    class Renderer extends Renderer__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Renderer__Class implements Blockly.IRegistrable  { 
    
            /**
             * The base class for a block renderer.
             * @param {string} name The renderer name.
             * @package
             * @constructor
             * @implements {Blockly.IRegistrable}
             */
            constructor(name: string);
    
            /**
             * The renderer name.
             * @type {string}
             * @package
             */
            name: string;
    
            /**
             * Rendering constant overrides, passed in through options.
             * @type {?Object}
             * @package
             */
            overrides: Object;
    
            /**
             * Gets the class name that identifies this renderer.
             * @return {string} The CSS class name.
             * @package
             */
            getClassName(): string;
    
            /**
             * Initialize the renderer.
             * @param {!Blockly.Theme} theme The workspace theme object.
             * @param {Object=} opt_rendererOverrides Rendering constant overrides.
             * @package
             */
            init(theme: Blockly.Theme, opt_rendererOverrides?: Object): void;
    
            /**
             * Create any DOM elements that this renderer needs.
             * @param {!SVGElement} svg The root of the workspace's SVG.
             * @param {!Blockly.Theme} theme The workspace theme object.
             * @package
             */
            createDom(svg: SVGElement, theme: Blockly.Theme): void;
    
            /**
             * Refresh the renderer after a theme change.
             * @param {!SVGElement} svg The root of the workspace's SVG.
             * @param {!Blockly.Theme} theme The workspace theme object.
             * @package
             */
            refreshDom(svg: SVGElement, theme: Blockly.Theme): void;
    
            /**
             * Dispose of this renderer.
             * Delete all DOM elements that this renderer and its constants created.
             * @package
             */
            dispose(): void;
    
            /**
             * Create a new instance of the renderer's constant provider.
             * @return {!Blockly.blockRendering.ConstantProvider} The constant provider.
             * @protected
             */
            makeConstants_(): Blockly.blockRendering.ConstantProvider;
    
            /**
             * Create a new instance of the renderer's render info object.
             * @param {!Blockly.BlockSvg} block The block to measure.
             * @return {!Blockly.blockRendering.RenderInfo} The render info object.
             * @protected
             */
            makeRenderInfo_(block: Blockly.BlockSvg): Blockly.blockRendering.RenderInfo;
    
            /**
             * Create a new instance of the renderer's drawer.
             * @param {!Blockly.BlockSvg} block The block to render.
             * @param {!Blockly.blockRendering.RenderInfo} info An object containing all
             *   information needed to render this block.
             * @return {!Blockly.blockRendering.Drawer} The drawer.
             * @protected
             */
            makeDrawer_(block: Blockly.BlockSvg, info: Blockly.blockRendering.RenderInfo): Blockly.blockRendering.Drawer;
    
            /**
             * Create a new instance of the renderer's debugger.
             * @return {!Blockly.blockRendering.Debug} The renderer debugger.
             * @suppress {strictModuleDepCheck} Debug renderer only included in playground.
             * @protected
             */
            makeDebugger_(): Blockly.blockRendering.Debug;
    
            /**
             * Create a new instance of the renderer's marker drawer.
             * @param {!Blockly.WorkspaceSvg} workspace The workspace the marker belongs to.
             * @param {!Blockly.Marker} marker The marker.
             * @return {!Blockly.blockRendering.MarkerSvg} The object in charge of drawing
             *     the marker.
             * @package
             */
            makeMarkerDrawer(workspace: Blockly.WorkspaceSvg, marker: Blockly.Marker): Blockly.blockRendering.MarkerSvg;
    
            /**
             * Create a new instance of a renderer path object.
             * @param {!SVGElement} root The root SVG element.
             * @param {!Blockly.Theme.BlockStyle} style The style object to use for
             *     colouring.
             * @return {!Blockly.blockRendering.IPathObject} The renderer path object.
             * @package
             */
            makePathObject(root: SVGElement, style: Blockly.Theme.BlockStyle): Blockly.blockRendering.IPathObject;
    
            /**
             * Get the current renderer's constant provider.  We assume that when this is
             * called, the renderer has already been initialized.
             * @return {!Blockly.blockRendering.ConstantProvider} The constant provider.
             * @package
             */
            getConstants(): Blockly.blockRendering.ConstantProvider;
    
            /**
             * Determine whether or not to highlight a connection.
             * @param {Blockly.Connection} _conn The connection to determine whether or not
             *     to highlight.
             * @return {boolean} True if we should highlight the connection.
             * @package
             */
            shouldHighlightConnection(_conn: Blockly.Connection): boolean;
    
            /**
             * Checks if an orphaned block can connect to the "end" of the topBlock's
             * block-clump. If the clump is a row the end is the last input. If the clump
             * is a stack, the end is the last next connection. If the clump is neither,
             * then this returns false.
             * @param {!Blockly.BlockSvg} topBlock The top block of the block clump we want to try and
             *     connect to.
             * @param {!Blockly.BlockSvg} orphanBlock The orphan block that wants to find
             *     a home.
             * @param {number} localType The type of the connection being dragged.
             * @return {boolean} Whether there is a home for the orphan or not.
             * @package
             */
            orphanCanConnectAtEnd(topBlock: Blockly.BlockSvg, orphanBlock: Blockly.BlockSvg, localType: number): boolean;
    
            /**
             * Chooses a connection preview method based on the available connection, the
             * current dragged connection, and the block being dragged.
             * @param {!Blockly.RenderedConnection} closest The available connection.
             * @param {!Blockly.RenderedConnection} local The connection currently being
             *     dragged.
             * @param {!Blockly.BlockSvg} topBlock The block currently being dragged.
             * @return {!Blockly.InsertionMarkerManager.PREVIEW_TYPE} The preview type
             *     to display.
             * @package
             */
            getConnectionPreviewMethod(closest: Blockly.RenderedConnection, local: Blockly.RenderedConnection, topBlock: Blockly.BlockSvg): Blockly.InsertionMarkerManager.PREVIEW_TYPE;
    
            /**
             * Render the block.
             * @param {!Blockly.BlockSvg} block The block to render.
             * @package
             */
            render(block: Blockly.BlockSvg): void;
    } 
    
}
