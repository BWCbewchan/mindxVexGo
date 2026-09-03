
declare module Blockly {

    class WorkspaceDragSurfaceSvg extends WorkspaceDragSurfaceSvg__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class WorkspaceDragSurfaceSvg__Class  { 
    
            /**
             * Blocks are moved into this SVG during a drag, improving performance.
             * The entire SVG is translated using CSS transforms instead of SVG so the
             * blocks are never repainted during drag improving performance.
             * @param {!Element} container Containing element.
             * @constructor
             */
            constructor(container: Element);
    
            /**
             * Dom structure when the workspace is being dragged. If there is no drag in
             * progress, the SVG is empty and display: none.
             * <svg class="blocklyWsDragSurface" style=transform:translate3d(...)>
             *   <g class="blocklyBlockCanvas"></g>
             *   <g class="blocklyBubbleCanvas">/g>
             * </svg>
             */
            SVG_: any /*missing*/;
    
            /**
             * Create the drag surface and inject it into the container.
             */
            createDom(): void;
    
            /**
             * Translate the entire drag surface during a drag.
             * We translate the drag surface instead of the blocks inside the surface
             * so that the browser avoids repainting the SVG.
             * Because of this, the drag coordinates must be adjusted by scale.
             * @param {number} x X translation for the entire surface
             * @param {number} y Y translation for the entire surface
             * @package
             */
            translateSurface(x: number, y: number): void;
    
            /**
             * Reports the surface translation in scaled workspace coordinates.
             * Use this when finishing a drag to return blocks to the correct position.
             * @return {!Blockly.utils.Coordinate} Current translation of the surface
             * @package
             */
            getSurfaceTranslation(): Blockly.utils.Coordinate;
    
            /**
             * Move the blockCanvas and bubbleCanvas out of the surface SVG and on to
             * newSurface.
             * @param {SVGElement} newSurface The element to put the drag surface contents
             *     into.
             * @package
             */
            clearAndHide(newSurface: SVGElement): void;
    
            /**
             * Set the SVG to have the block canvas and bubble canvas in it and then
             * show the surface.
             * @param {!SVGElement} blockCanvas The block canvas <g> element from the
             *     workspace.
             * @param {!SVGElement} bubbleCanvas The <g> element that contains the bubbles.
             * @param {Element} previousSibling The element to insert the block canvas and
                   bubble canvas after when it goes back in the DOM at the end of a drag.
             * @param {number} width The width of the workspace SVG element.
             * @param {number} height The height of the workspace SVG element.
             * @param {number} scale The scale of the workspace being dragged.
             * @package
             */
            setContentsAndShow(blockCanvas: SVGElement, bubbleCanvas: SVGElement, previousSibling: Element, width: number, height: number, scale: number): void;
    } 
    
}
