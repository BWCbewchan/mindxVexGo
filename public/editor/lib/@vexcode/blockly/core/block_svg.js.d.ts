
declare module Blockly {

    class BlockSvg extends BlockSvg__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class BlockSvg__Class extends Blockly.Block__Class implements Blockly.IASTNodeLocationSvg, Blockly.IBoundedElement, Blockly.ICopyable  { 
    
            /**
             * Class for a block's SVG representation.
             * Not normally called directly, workspace.newBlock() is preferred.
             * @param {!Blockly.WorkspaceSvg} workspace The block's workspace.
             * @param {?string} prototypeName Name of the language object containing
             *     type-specific functions for this block.
             * @param {string=} opt_id Optional ID.  Use this ID if provided, otherwise
             *     create a new ID.
             * @extends {Blockly.Block}
             * @implements {Blockly.IASTNodeLocationSvg}
             * @implements {Blockly.IBoundedElement}
             * @implements {Blockly.ICopyable}
             * @constructor
             */
            constructor(workspace: Blockly.WorkspaceSvg, prototypeName: string, opt_id?: string);
    
            /**
             * A block style object.
             * @type {!Blockly.Theme.BlockStyle}
             */
            style: Blockly.Theme.BlockStyle;
    
            /**
             * The renderer's path object.
             * @type {Blockly.blockRendering.IPathObject}
             * @package
             */
            pathObject: Blockly.blockRendering.IPathObject;
    
            /** @type {boolean} */
            rendered: boolean;
    
            /** @type {!Blockly.WorkspaceSvg} */
            workspace: Blockly.WorkspaceSvg;
    
            /** @type {Blockly.RenderedConnection} */
            outputConnection: Blockly.RenderedConnection;
    
            /** @type {Blockly.RenderedConnection} */
            nextConnection: Blockly.RenderedConnection;
    
            /** @type {Blockly.RenderedConnection} */
            previousConnection: Blockly.RenderedConnection;
    
            /**
             * Height of this block, not including any statement blocks above or below.
             * Height is in workspace units.
             */
            height: any /*missing*/;
    
            /**
             * Width of this block, including any connected value blocks.
             * Width is in workspace units.
             */
            width: any /*missing*/;
    
            /**
             * An optional method called when a mutator dialog is first opened.
             * This function must create and initialize a top-level block for the mutator
             * dialog, and return it. This function should also populate this top-level
             * block with any sub-blocks which are appropriate. This method must also be
             * coupled with defining a `compose` method for the default mutation dialog
             * button and UI to appear.
             * @type {?function(Blockly.WorkspaceSvg):!Blockly.BlockSvg}
             */
            decompose: { (_0: Blockly.WorkspaceSvg): Blockly.BlockSvg };
    
            /**
             * An optional method called when a mutator dialog saves its content.
             * This function is called to modify the original block according to new
             * settings. This method must also be coupled with defining a `decompose`
             * method for the default mutation dialog button and UI to appear.
             * @type {?function(!Blockly.BlockSvg)}
             */
            compose: { (_0: Blockly.BlockSvg): any /*missing*/ };
    
            /**
             * An optional method for defining custom block context menu items.
             * @type {?function(!Array.<!Object>)}
             */
            customContextMenu: { (_0: Object[]): any /*missing*/ };
    
            /**
             * An property used internally to reference the block's rendering debugger.
             * @type {?Blockly.blockRendering.Debug}
             * @package
             */
            renderingDebugger: Blockly.blockRendering.Debug;
    
            /**
             * Create and initialize the SVG representation of the block.
             * May be called more than once.
             */
            initSvg(): void;
    
            /**
             * Get the secondary colour of a block.
             * @return {?string} #RRGGBB string.
             */
            getColourSecondary(): string;
    
            /**
             * Get the tertiary colour of a block.
             * @return {?string} #RRGGBB string.
             */
            getColourTertiary(): string;
    
            /**
             * Get the shadow colour of a block.
             * @return {?string} #RRGGBB string.
             * @deprecated Use style.colourSecondary. (2020 January 21)
             */
            getColourShadow(): string;
    
            /**
             * Get the border colour(s) of a block.
             * @return {{colourDark, colourLight, colourBorder}} An object containing
             *     colour values for the border(s) of the block. If the block is using a
             *     style the colourBorder will be defined and equal to the tertiary colour
             *     of the style (#RRGGBB string). Otherwise the colourDark and colourLight
             *     attributes will be defined (#RRGGBB strings).
             * @deprecated Use style.colourTertiary. (2020 January 21)
             */
            getColourBorder(): { colourDark: any /*missing*/; colourLight: any /*missing*/; colourBorder: any /*missing*/ };
    
            /**
             * Select this block.  Highlight it visually.
             */
            select(): void;
    
            /**
             * Unselect this block.  Remove its highlighting.
             */
            unselect(): void;
    
            /**
             * Block's mutator icon (if any).
             * @type {Blockly.Mutator}
             */
            mutator: Blockly.Mutator;
    
            /**
             * Block's comment icon (if any).
             * @type {Blockly.Comment}
             * @deprecated August 2019. Use getCommentIcon instead.
             */
            comment: Blockly.Comment;
    
            /**
             * Block's warning icon (if any).
             * @type {Blockly.Warning}
             */
            warning: Blockly.Warning;
    
            /**
             * Returns a list of mutator, comment, and warning icons.
             * @return {!Array} List of icons.
             */
            getIcons(): any[];
    
            /**
             * Return the coordinates of the top-left corner of this block relative to the
             * drawing surface's origin (0,0), in workspace units.
             * If the block is on the workspace, (0, 0) is the origin of the workspace
             * coordinate system.
             * This does not change with workspace scale.
             * @return {!Blockly.utils.Coordinate} Object with .x and .y properties in
             *     workspace coordinates.
             */
            getRelativeToSurfaceXY(): Blockly.utils.Coordinate;
    
            /**
             * Move a block by a relative offset.
             * @param {number} dx Horizontal offset in workspace units.
             * @param {number} dy Vertical offset in workspace units.
             */
            moveBy(dx: number, dy: number): void;
    
            /**
             * Transforms a block by setting the translation on the transform attribute
             * of the block's SVG.
             * @param {number} x The x coordinate of the translation in workspace units.
             * @param {number} y The y coordinate of the translation in workspace units.
             */
            translate(x: number, y: number): void;
    
            /**
             * Move this block to its workspace's drag surface, accounting for positioning.
             * Generally should be called at the same time as setDragging_(true).
             * Does nothing if useDragSurface_ is false.
             * @package
             */
            moveToDragSurface(): void;
    
            /**
             * Move a block to a position.
             * @param {Blockly.utils.Coordinate} xy The position to move to in workspace units.
             */
            moveTo(xy: Blockly.utils.Coordinate): void;
    
            /**
             * Move this block back to the workspace block canvas.
             * Generally should be called at the same time as setDragging_(false).
             * Does nothing if useDragSurface_ is false.
             * @param {!Blockly.utils.Coordinate} newXY The position the block should take on
             *     on the workspace canvas, in workspace coordinates.
             * @package
             */
            moveOffDragSurface(newXY: Blockly.utils.Coordinate): void;
    
            /**
             * Move this block during a drag, taking into account whether we are using a
             * drag surface to translate blocks.
             * This block must be a top-level block.
             * @param {!Blockly.utils.Coordinate} newLoc The location to translate to, in
             *     workspace coordinates.
             * @package
             */
            moveDuringDrag(newLoc: Blockly.utils.Coordinate): void;
    
            /**
             * Snap this block to the nearest grid point.
             */
            snapToGrid(): void;
    
            /**
             * Returns the coordinates of a bounding box describing the dimensions of this
             * block and any blocks stacked below it.
             * Coordinate system: workspace coordinates.
             * @return {!Blockly.utils.Rect} Object with coordinates of the bounding box.
             */
            getBoundingRectangle(): Blockly.utils.Rect;
    
            /**
             * Notify every input on this block to mark its fields as dirty.
             * A dirty field is a field that needs to be re-rendered.
             */
            markDirty(): void;
    
            /**
             * Set whether the block is collapsed or not.
             * @param {boolean} collapsed True if collapsed.
             */
            setCollapsed(collapsed: boolean): void;
    
            /**
             * Open the next (or previous) FieldTextInput.
             * @param {!Blockly.Field} start Current field.
             * @param {boolean} forward If true go forward, otherwise backward.
             */
            tab(start: Blockly.Field, forward: boolean): void;
    
            /**
             * Load the block's help page in a new window.
             * @package
             */
            showHelp(): void;
    
            /**
             * Generate the context menu for this block.
             * @param {!Event} e Mouse event.
             * @protected
             * @return {Array.<!Object>} Context menu options
             */
            generateContextMenu(e: Event): Object[];
    
            /**
             * Show the context menu for this block.
             * @param {!Event} e Mouse event.
             * @package
             */
            showContextMenu(e: Event): void;
    
            /**
             * Move the connections for this block and all blocks attached under it.
             * Also update any attached bubbles.
             * @param {number} dx Horizontal offset from current location, in workspace
             *     units.
             * @param {number} dy Vertical offset from current location, in workspace
             *     units.
             * @package
             */
            moveConnections(dx: number, dy: number): void;
    
            /**
             * Recursively adds or removes the dragging class to this node and its children.
             * @param {boolean} adding True if adding, false if removing.
             * @package
             */
            setDragging(adding: boolean): void;
    
            /**
             * Set whether this block is movable or not.
             * @param {boolean} movable True if movable.
             */
            setMovable(movable: boolean): void;
    
            /**
             * Set whether this block is editable or not.
             * @param {boolean} editable True if editable.
             */
            setEditable(editable: boolean): void;
    
            /**
             * Set whether this block is a shadow block or not.
             * @param {boolean} shadow True if a shadow.
             */
            setShadow(shadow: boolean): void;
    
            /**
             * Set whether this block is an insertion marker block or not.
             * Once set this cannot be unset.
             * @param {boolean} insertionMarker True if an insertion marker.
             * @package
             */
            setInsertionMarker(insertionMarker: boolean): void;
    
            /**
             * Return the root node of the SVG or null if none exists.
             * @return {!SVGGElement} The root SVG node (probably a group).
             */
            getSvgRoot(): SVGGElement;
    
            /**
             * Dispose of this block.
             * @param {boolean=} healStack If true, then try to heal any gap by connecting
             *     the next statement with the previous statement.  Otherwise, dispose of
             *     all children of this block.
             * @param {boolean=} animate If true, show a disposal animation and sound.
             * @suppress {checkTypes}
             */
            dispose(healStack?: boolean, animate?: boolean): void;
    
            /**
             * Encode a block for copying.
             * @return {?Blockly.ICopyable.CopyData} Copy metadata, or null if the block is
             *     an insertion marker.
             * @package
             */
            toCopyData(): Blockly.ICopyable.CopyData;
    
            /**
             * Change the colour of a block.
             * @package
             */
            applyColour(): void;
    
            /**
             * Enable or disable a block.
             */
            updateDisabled(): void;
    
            /**
             * Get the comment icon attached to this block, or null if the block has no
             * comment.
             * @return {Blockly.Comment} The comment icon attached to this block, or null.
             */
            getCommentIcon(): Blockly.Comment;
    
            /**
             * Set this block's comment text.
             * @param {?string} text The text, or null to delete.
             */
            setCommentText(text: string): void;
    
            /**
             * Set this block's warning text.
             * @param {?string} text The text, or null to delete.
             * @param {string=} opt_id An optional ID for the warning text to be able to
             *     maintain multiple warnings.
             */
            setWarningText(text: string, opt_id?: string): void;
    
            /**
             * Give this block a mutator dialog.
             * @param {Blockly.Mutator} mutator A mutator dialog instance or null to remove.
             */
            setMutator(mutator: Blockly.Mutator): void;
    
            /**
             * Set whether the block is disabled or not.
             * @param {boolean} disabled True if disabled.
             * @deprecated May 2019
             */
            setDisabled(disabled: boolean): void;
    
            /**
             * Set whether the block is enabled or not.
             * @param {boolean} enabled True if enabled.
             */
            setEnabled(enabled: boolean): void;
    
            /**
             * Set whether the block is highlighted or not.  Block highlighting is
             * often used to visually mark blocks currently being executed.
             * @param {boolean} highlighted True if highlighted.
             */
            setHighlighted(highlighted: boolean): void;
    
            /**
             * Select this block.  Highlight it visually.
             */
            addSelect(): void;
    
            /**
             * Unselect this block.  Remove its highlighting.
             */
            removeSelect(): void;
    
            /**
             * highlight this block.
             */
            addHighlight(): void;
    
            /**
             * Unhighlight this block.  Remove its highlighting.
             */
            removeHighlight(): void;
    
            /**
             * Update the cursor over this block by adding or removing a class.
             * @param {boolean} enable True if the delete cursor should be shown, false
             *     otherwise.
             * @package
             */
            setDeleteStyle(enable: boolean): void;
    
            /**
             * Get the colour of a block.
             * @return {string} #RRGGBB string.
             */
            getColour(): string;
    
            /**
             * Change the colour of a block.
             * @param {number|string} colour HSV hue value, or #RRGGBB string.
             */
            setColour(colour: number|string): void;
    
            /**
             * Set the style and colour values of a block.
             * @param {string} blockStyleName Name of the block style
             * @throws {Error} if the block style does not exist.
             */
            setStyle(blockStyleName: string): void;
    
            /**
             * Move this block to the front of the visible workspace.
             * <g> tags do not respect z-index so SVG renders them in the
             * order that they are in the DOM.  By placing this block first within the
             * block group's <g>, it will render on top of any other blocks.
             * @package
             */
            bringToFront(): void;
    
            /**
             * Set whether this block can chain onto the bottom of another block.
             * @param {boolean} newBoolean True if there can be a previous statement.
             * @param {(string|Array.<string>|null)=} opt_check Statement type or
             *     list of statement types.  Null/undefined if any type could be connected.
             */
            setPreviousStatement(newBoolean: boolean, opt_check?: string|string[]|any /*null*/): void;
    
            /**
             * Set whether another block can chain onto the bottom of this block.
             * @param {boolean} newBoolean True if there can be a next statement.
             * @param {(string|Array.<string>|null)=} opt_check Statement type or
             *     list of statement types.  Null/undefined if any type could be connected.
             */
            setNextStatement(newBoolean: boolean, opt_check?: string|string[]|any /*null*/): void;
    
            /**
             * Set whether this block returns a value.
             * @param {boolean} newBoolean True if there is an output.
             * @param {(string|Array.<string>|null)=} opt_check Returned type or list
             *     of returned types.  Null or undefined if any type could be returned
             *     (e.g. variable get).
             */
            setOutput(newBoolean: boolean, opt_check?: string|string[]|any /*null*/): void;
    
            /**
             * Set whether value inputs are arranged horizontally or vertically.
             * @param {boolean} newBoolean True if inputs are horizontal.
             */
            setInputsInline(newBoolean: boolean): void;
    
            /**
             * Remove an input from this block.
             * @param {string} name The name of the input.
             * @param {boolean=} opt_quiet True to prevent error if input is not present.
             * @return {boolean} True if operation succeeds, false if input is not present and opt_quiet is true
             * @throws {Error} if the input is not present and
             *     opt_quiet is not true.
             */
            removeInput(name: string, opt_quiet?: boolean): boolean;
    
            /**
             * Move a numbered input to a different location on this block.
             * @param {number} inputIndex Index of the input to move.
             * @param {number} refIndex Index of input that should be after the moved input.
             */
            moveNumberedInputBefore(inputIndex: number, refIndex: number): void;
    
            /**
             * Sets whether this block's connections are tracked in the database or not.
             *
             * Used by the deserializer to be more efficient. Setting a connection's
             * tracked_ value to false keeps it from adding itself to the db when it
             * gets its first moveTo call, saving expensive ops for later.
             * @param {boolean} track If true, start tracking. If false, stop tracking.
             * @package
             */
            setConnectionTracking(track: boolean): void;
    
            /**
             * Returns connections originating from this block.
             * @param {boolean} all If true, return all connections even hidden ones.
             *     Otherwise, for a non-rendered block return an empty list, and for a
             *     collapsed block don't return inputs connections.
             * @return {!Array.<!Blockly.RenderedConnection>} Array of connections.
             * @package
             */
            getConnections_(all: boolean): Blockly.RenderedConnection[];
    
            /**
             * Create a connection of the specified type.
             * @param {number} type The type of the connection to create.
             * @return {!Blockly.RenderedConnection} A new connection of the specified type.
             * @protected
             */
            makeConnection_(type: number): Blockly.RenderedConnection;
    
            /**
             * Bump unconnected blocks out of alignment.  Two blocks which aren't actually
             * connected should not coincidentally line up on screen.
             */
            bumpNeighbours(): void;
    
            /**
             * Schedule snapping to grid and bumping neighbours to occur after a brief
             * delay.
             * @package
             */
            scheduleSnapAndBump(): void;
    
            /**
             * Position a block so that it doesn't move the target block when connected.
             * The block to position is usually either the first block in a dragged stack or
             * an insertion marker.
             * @param {!Blockly.RenderedConnection} sourceConnection The connection on the
             *     moving block's stack.
             * @param {!Blockly.RenderedConnection} targetConnection The connection that
             *     should stay stationary as this block is positioned.
             * @package
             */
            positionNearConnection(sourceConnection: Blockly.RenderedConnection, targetConnection: Blockly.RenderedConnection): void;
    
            /**
             * Lays out and reflows a block based on its contents and settings.
             * @param {boolean=} opt_bubble If false, just render this block.
             *   If true, also render block's parent, grandparent, etc.  Defaults to true.
             */
            render(opt_bubble?: boolean): void;
    
            /**
             * Redraw any attached marker or cursor svgs if needed.
             * @protected
             */
            updateMarkers_(): void;
    
            /**
             * Add the cursor svg to this block's svg group.
             * @param {SVGElement} cursorSvg The svg root of the cursor to be added to the
             *     block svg group.
             * @package
             */
            setCursorSvg(cursorSvg: SVGElement): void;
    
            /**
             * Add the marker svg to this block's svg group.
             * @param {SVGElement} markerSvg The svg root of the marker to be added to the
             *     block svg group.
             * @package
             */
            setMarkerSvg(markerSvg: SVGElement): void;
    
            /**
             * Returns a bounding box describing the dimensions of this block
             * and any blocks stacked below it.
             * @return {!{height: number, width: number}} Object with height and width
             *    properties in workspace units.
             * @package
             */
            getHeightWidth(): { height: number; width: number };
    
            /**
             * Visual effect to show that if the dragging block is dropped, this block will
             * be replaced.  If a shadow block, it will disappear.  Otherwise it will bump.
             * @param {boolean} add True if highlighting should be added.
             * @package
             */
            fadeForReplacement(add: boolean): void;
    
            /**
             * Visual effect to show that if the dragging block is dropped it will connect
             * to this input.
             * @param {Blockly.Connection} conn The connection on the input to highlight.
             * @param {boolean} add True if highlighting should be added.
             * @package
             */
            highlightShapeForInput(conn: Blockly.Connection, add: boolean): void;
    } 
    
}

declare module Blockly.BlockSvg {

    /**
     * Constant for identifying rows that are to be rendered inline.
     * Don't collide with Blockly.INPUT_VALUE and friends.
     * @const
     */
    var INLINE: any /*missing*/;

    /**
     * ID to give the "collapsed warnings" warning. Allows us to remove the
     * "collapsed warnings" warning without removing any warnings that belong to
     * the block.
     * @type {string}
     * @const
     */
    var COLLAPSED_WARNING_ID: string;
}
