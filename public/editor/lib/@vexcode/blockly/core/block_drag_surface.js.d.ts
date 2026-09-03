
declare module Blockly {

    class BlockDragSurfaceSvg extends BlockDragSurfaceSvg__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class BlockDragSurfaceSvg__Class  { 
    
            /**
             * Class for a drag surface for the currently dragged block. This is a separate
             * SVG that contains only the currently moving block, or nothing.
             * @param {!Element} container Containing element.
             * @constructor
             */
            constructor(container: Element);
    
            /**
             * Create the drag surface and inject it into the container.
             */
            createDom(): void;
    
            /**
             * Set the SVG blocks on the drag surface's group and show the surface.
             * Only one block group should be on the drag surface at a time.
             * @param {!SVGElement} blocks Block or group of blocks to place on the drag
             * surface.
             */
            setBlocksAndShow(blocks: SVGElement): void;
    
            /**
             * Translate and scale the entire drag surface group to the given position, to
             * keep in sync with the workspace.
             * @param {number} x X translation in workspace coordinates.
             * @param {number} y Y translation in workspace coordinates.
             * @param {number} scale Scale of the group.
             */
            translateAndScaleGroup(x: number, y: number, scale: number): void;
    
            /**
             * Translate the entire drag surface during a drag.
             * We translate the drag surface instead of the blocks inside the surface
             * so that the browser avoids repainting the SVG.
             * Because of this, the drag coordinates must be adjusted by scale.
             * @param {number} x X translation for the entire surface.
             * @param {number} y Y translation for the entire surface.
             */
            translateSurface(x: number, y: number): void;
    
            /**
             * Reports the surface translation in scaled workspace coordinates.
             * Use this when finishing a drag to return blocks to the correct position.
             * @return {!Blockly.utils.Coordinate} Current translation of the surface.
             */
            getSurfaceTranslation(): Blockly.utils.Coordinate;
    
            /**
             * Provide a reference to the drag group (primarily for
             * BlockSvg.getRelativeToSurfaceXY).
             * @return {SVGElement} Drag surface group element.
             */
            getGroup(): SVGElement;
    
            /**
             * Get the current blocks on the drag surface, if any (primarily
             * for BlockSvg.getRelativeToSurfaceXY).
             * @return {Element} Drag surface block DOM element, or undefined if no blocks
             * exist.
             */
            getCurrentBlock(): Element;
    
            /**
             * Clear the group and hide the surface; move the blocks off onto the provided
             * element.
             * If the block is being deleted it doesn't need to go back to the original
             * surface, since it would be removed immediately during dispose.
             * @param {Element=} opt_newSurface Surface the dragging blocks should be moved
             *     to, or null if the blocks should be removed from this surface without
             *     being moved to a different surface.
             */
            clearAndHide(opt_newSurface?: Element): void;
    } 
    
}
