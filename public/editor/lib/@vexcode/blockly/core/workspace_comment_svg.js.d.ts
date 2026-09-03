
declare module Blockly {

    class WorkspaceCommentSvg extends WorkspaceCommentSvg__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class WorkspaceCommentSvg__Class extends Blockly.WorkspaceComment__Class implements Blockly.IBoundedElement, Blockly.IBubble, Blockly.ICopyable  { 
    
            /**
             * Class for a workspace comment's SVG representation.
             * @param {!Blockly.Workspace} workspace The block's workspace.
             * @param {string} content The content of this workspace comment.
             * @param {number} height Height of the comment.
             * @param {number} width Width of the comment.
             * @param {string=} opt_id Optional ID.  Use this ID if provided, otherwise
             *     create a new ID.
             * @extends {Blockly.WorkspaceComment}
             * @implements {Blockly.IBoundedElement}
             * @implements {Blockly.IBubble}
             * @implements {Blockly.ICopyable}
             * @constructor
             */
            constructor(workspace: Blockly.Workspace, content: string, height: number, width: number, opt_id?: string);
    
            /**
             * Dispose of this comment.
             * @package
             */
            dispose(): void;
    
            /**
             * Create and initialize the SVG representation of a workspace comment.
             * May be called more than once.
             * @package
             */
            initSvg(): void;
    
            /**
             * Show the context menu for this workspace comment.
             * @param {!Event} e Mouse event.
             * @package
             */
            showContextMenu(e: Event): void;
    
            /**
             * Select this comment.  Highlight it visually.
             * @package
             */
            select(): void;
    
            /**
             * Unselect this comment.  Remove its highlighting.
             * @package
             */
            unselect(): void;
    
            /**
             * Select this comment.  Highlight it visually.
             * @package
             */
            addSelect(): void;
    
            /**
             * Unselect this comment.  Remove its highlighting.
             * @package
             */
            removeSelect(): void;
    
            /**
             * Focus this comment.  Highlight it visually.
             * @package
             */
            addFocus(): void;
    
            /**
             * Unfocus this comment.  Remove its highlighting.
             * @package
             */
            removeFocus(): void;
    
            /**
             * Return the coordinates of the top-left corner of this comment relative to
             * the drawing surface's origin (0,0), in workspace units.
             * If the comment is on the workspace, (0, 0) is the origin of the workspace
             * coordinate system.
             * This does not change with workspace scale.
             * @return {!Blockly.utils.Coordinate} Object with .x and .y properties in
             *     workspace coordinates.
             * @package
             */
            getRelativeToSurfaceXY(): Blockly.utils.Coordinate;
    
            /**
             * Move a comment by a relative offset.
             * @param {number} dx Horizontal offset, in workspace units.
             * @param {number} dy Vertical offset, in workspace units.
             * @package
             */
            moveBy(dx: number, dy: number): void;
    
            /**
             * Transforms a comment by setting the translation on the transform attribute
             * of the block's SVG.
             * @param {number} x The x coordinate of the translation in workspace units.
             * @param {number} y The y coordinate of the translation in workspace units.
             * @package
             */
            translate(x: number, y: number): void;
    
            /**
             * Move this comment to its workspace's drag surface, accounting for
             * positioning.  Generally should be called at the same time as
             * setDragging(true).  Does nothing if useDragSurface_ is false.
             * @package
             */
            moveToDragSurface(): void;
    
            /**
             * Move this comment during a drag, taking into account whether we are using a
             * drag surface to translate blocks.
             * @param {Blockly.BlockDragSurfaceSvg} dragSurface The surface that carries
             *     rendered items during a drag, or null if no drag surface is in use.
             * @param {!Blockly.utils.Coordinate} newLoc The location to translate to, in
             *     workspace coordinates.
             * @package
             */
            moveDuringDrag(dragSurface: Blockly.BlockDragSurfaceSvg, newLoc: Blockly.utils.Coordinate): void;
    
            /**
             * Move the bubble group to the specified location in workspace coordinates.
             * @param {number} x The x position to move to.
             * @param {number} y The y position to move to.
             * @package
             */
            moveTo(x: number, y: number): void;
    
            /**
             * Returns the coordinates of a bounding box describing the dimensions of this
             * comment.
             * Coordinate system: workspace coordinates.
             * @return {!Blockly.utils.Rect} Object with coordinates of the bounding box.
             * @package
             */
            getBoundingRectangle(): Blockly.utils.Rect;
    
            /**
             * Add or remove the UI indicating if this comment is movable or not.
             * @package
             */
            updateMovable(): void;
    
            /**
             * Set whether this comment is movable or not.
             * @param {boolean} movable True if movable.
             * @package
             */
            setMovable(movable: boolean): void;
    
            /**
             * Set whether this comment is editable or not.
             * @param {boolean} editable True if editable.
             */
            setEditable(editable: boolean): void;
    
            /**
             * Recursively adds or removes the dragging class to this node and its children.
             * @param {boolean} adding True if adding, false if removing.
             * @package
             */
            setDragging(adding: boolean): void;
    
            /**
             * Return the root node of the SVG or null if none exists.
             * @return {!SVGElement} The root SVG node (probably a group).
             * @package
             */
            getSvgRoot(): SVGElement;
    
            /**
             * Returns this comment's text.
             * @return {string} Comment text.
             * @package
             */
            getContent(): string;
    
            /**
             * Set this comment's content.
             * @param {string} content Comment content.
             * @package
             */
            setContent(content: string): void;
    
            /**
             * Update the cursor over this comment by adding or removing a class.
             * @param {boolean} enable True if the delete cursor should be shown, false
             *     otherwise.
             * @package
             */
            setDeleteStyle(enable: boolean): void;
    
            /**
             * Set whether auto-layout of this bubble is enabled.  The first time a bubble
             * is shown it positions itself to not cover any blocks.  Once a user has
             * dragged it to reposition, it renders where the user put it.
             * @param {boolean} _enable True if auto-layout should be enabled, false
             *     otherwise.
             * @package
             */
            setAutoLayout(_enable: boolean): void;
    
            /**
             * Encode a comment subtree as XML with XY coordinates.
             * @param {boolean=} opt_noId True if the encoder should skip the comment ID.
             * @return {!Element} Tree of XML elements.
             * @package
             */
            toXmlWithXY(opt_noId?: boolean): Element;
    
            /**
             * Encode a comment for copying.
             * @return {!Blockly.ICopyable.CopyData} Copy metadata.
             * @package
             */
            toCopyData(): Blockly.ICopyable.CopyData;
    } 
    
}

declare module Blockly.WorkspaceCommentSvg {

    /**
     * The width and height to use to size a workspace comment when it is first
     * added, before it has been edited by the user.
     * @type {number}
     * @package
     */
    var DEFAULT_SIZE: number;

    /**
     * Decode an XML comment tag and create a rendered comment on the workspace.
     * @param {!Element} xmlComment XML comment element.
     * @param {!Blockly.Workspace} workspace The workspace.
     * @param {number=} opt_wsWidth The width of the workspace, which is used to
     *     position comments correctly in RTL.
     * @return {!Blockly.WorkspaceCommentSvg} The created workspace comment.
     * @package
     */
    function fromXml(xmlComment: Element, workspace: Blockly.Workspace, opt_wsWidth?: number): Blockly.WorkspaceCommentSvg;
}
