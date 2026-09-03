
declare module Blockly.blockRendering {

    class Renderer extends Renderer__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Renderer__Class  { 
    
            /**
             * The base class for a block renderer.
             * @package
             * @constructor
             */
            constructor();
    
            /**
             * Initialize the renderer.
             * @package
             */
            init(): void;
    
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
             * @protected
             */
            makeDebugger_(): Blockly.blockRendering.Debug;
    
            /**
             * Create a new instance of the renderer's cursor drawer.
             * @param {!Blockly.WorkspaceSvg} workspace The workspace the cursor belongs to.
             * @param {boolean=} opt_marker True if the cursor is a marker. A marker is used
             *     to save a location and is an immovable cursor. False or undefined if the
             *     cursor is not a marker.
             * @return {!Blockly.CursorSvg} The cursor drawer.
             * @package
             */
            makeCursorDrawer(workspace: Blockly.WorkspaceSvg, opt_marker?: boolean): Blockly.CursorSvg;
    
            /**
             * Create a new instance of a renderer path object.
             * @param {!SVGElement} root The root SVG element.
             * @return {!Blockly.blockRendering.IPathObject} The renderer path object.
             * @package
             */
            makePathObject(root: SVGElement): Blockly.blockRendering.IPathObject;
    
            /**
             * Get the current renderer's constant provider.  We assume that when this is
             * called, the renderer has already been initialized.
             * @return {!Blockly.blockRendering.ConstantProvider} The constant provider.
             * @package
             */
            getConstants(): Blockly.blockRendering.ConstantProvider;
    
            /**
             * Render the block.
             * @param {!Blockly.BlockSvg} block The block to render.
             * @package
             */
            render(block: Blockly.BlockSvg): void;
    } 
    
}
