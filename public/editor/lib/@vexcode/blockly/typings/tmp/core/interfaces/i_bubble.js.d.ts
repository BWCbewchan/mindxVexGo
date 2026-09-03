
declare module Blockly {

    interface IBubble extends Blockly.IDeletable, Blockly.IContextMenu {
    
        /**
          * Return the coordinates of the top-left corner of this bubble's body relative
          * to the drawing surface's origin (0,0), in workspace units.
          * @return {!Blockly.utils.Coordinate} Object with .x and .y properties.
          */
        getRelativeToSurfaceXY(): Blockly.utils.Coordinate;
    
        /**
          * Return the root node of the bubble's SVG group.
          * @return {!SVGElement} The root SVG node of the bubble's group.
          */
        getSvgRoot(): SVGElement;
    
        /**
          * Set whether auto-layout of this bubble is enabled.  The first time a bubble
          * is shown it positions itself to not cover any blocks.  Once a user has
          * dragged it to reposition, it renders where the user put it.
          * @param {boolean} enable True if auto-layout should be enabled, false
          *     otherwise.
          */
        setAutoLayout(enable: boolean): void;
    
        /**
          * Triggers a move callback if one exists at the end of a drag.
          * @param {boolean} adding True if adding, false if removing.
          */
        setDragging(adding: boolean): void;
    
        /**
          * Move this bubble during a drag, taking into account whether or not there is
          * a drag surface.
          * @param {Blockly.BlockDragSurfaceSvg} dragSurface The surface that carries
          *     rendered items during a drag, or null if no drag surface is in use.
          * @param {!Blockly.utils.Coordinate} newLoc The location to translate to, in
          *     workspace coordinates.
          */
        moveDuringDrag(dragSurface: Blockly.BlockDragSurfaceSvg, newLoc: Blockly.utils.Coordinate): void;
    
        /**
          * Move the bubble to the specified location in workspace coordinates.
          * @param {number} x The x position to move to.
          * @param {number} y The y position to move to.
          */
        moveTo(x: number, y: number): void;
    
        /**
          * Update the style of this bubble when it is dragged over a delete area.
          * @param {boolean} enable True if the bubble is about to be deleted, false
          *     otherwise.
          */
        setDeleteStyle(enable: boolean): void;
    
        /**
          * Dispose of this bubble.
          */
        dispose: any /*missing*/;
    }
}
