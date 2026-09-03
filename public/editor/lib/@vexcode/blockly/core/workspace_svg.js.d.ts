
declare module Blockly {

    class WorkspaceSvg extends WorkspaceSvg__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class WorkspaceSvg__Class extends Blockly.Workspace__Class implements Blockly.IASTNodeLocationSvg  { 
    
            /**
             * Class for a workspace.  This is an onscreen area with optional trashcan,
             * scrollbars, bubbles, and dragging.
             * @param {!Blockly.Options} options Dictionary of options.
             * @param {Blockly.BlockDragSurfaceSvg=} opt_blockDragSurface Drag surface for
             *     blocks.
             * @param {Blockly.WorkspaceDragSurfaceSvg=} opt_wsDragSurface Drag surface for
             *     the workspace.
             * @extends {Blockly.Workspace}
             * @implements {Blockly.IASTNodeLocationSvg}
             * @constructor
             */
            constructor(options: Blockly.Options, opt_blockDragSurface?: Blockly.BlockDragSurfaceSvg, opt_wsDragSurface?: Blockly.WorkspaceDragSurfaceSvg);
    
            /** @type {function():!Blockly.utils.Metrics} */
            getMetrics: { (): Blockly.utils.Metrics };
    
            /** @type {function(!{x:number, y:number}):void} */
            setMetrics: { (_0: { x: number; y: number }): void };
    
            /**
             * Object in charge of storing and updating the workspace theme.
             * @type {!Blockly.ThemeManager}
             * @protected
             */
            themeManager_: Blockly.ThemeManager;
    
            /**
             * True if keyboard accessibility mode is on, false otherwise.
             * @type {boolean}
             */
            keyboardAccessibilityMode: boolean;
    
            /**
             * The render status of an SVG workspace.
             * Returns `false` for headless workspaces and true for instances of
             * `Blockly.WorkspaceSvg`.
             * @type {boolean}
             */
            rendered: boolean;
    
            /**
             * Is this workspace the surface for a flyout?
             * @type {boolean}
             */
            isFlyout: boolean;
    
            /**
             * Is this workspace the surface for a mutator?
             * @type {boolean}
             * @package
             */
            isMutator: boolean;
    
            /**
             * Current horizontal scrolling offset in pixel units, relative to the
             * workspace origin.
             *
             * It is useful to think about a view, and a canvas moving beneath that
             * view. As the canvas moves right, this value becomes more positive, and
             * the view is now "seeing" the left side of the canvas. As the canvas moves
             * left, this value becomes more negative, and the view is now "seeing" the
             * right side of the canvas.
             *
             * The confusing thing about this value is that it does not, and must not
             * include the absoluteLeft offset. This is because it is used to calculate
             * the viewLeft value.
             *
             * The viewLeft is relative to the workspace origin (although in pixel
             * units). The workspace origin is the top-left corner of the workspace (at
             * least when it is enabled). It is shifted from the top-left of the blocklyDiv
             * so as not to be beneath the toolbox.
             *
             * When the workspace is enabled the viewLeft and workspace origin are at
             * the same X location. As the canvas slides towards the right beneath the view
             * this value (scrollX) becomes more positive, and the viewLeft becomes more
             * negative relative to the workspace origin (imagine the workspace origin
             * as a dot on the canvas sliding to the right as the canvas moves).
             *
             * So if the scrollX were to include the absoluteLeft this would in a way
             * "unshift" the workspace origin. This means that the viewLeft would be
             * representing the left edge of the blocklyDiv, rather than the left edge
             * of the workspace.
             *
             * @type {number}
             */
            scrollX: number;
    
            /**
             * Current vertical scrolling offset in pixel units, relative to the
             * workspace origin.
             *
             * It is useful to think about a view, and a canvas moving beneath that
             * view. As the canvas moves down, this value becomes more positive, and the
             * view is now "seeing" the upper part of the canvas. As the canvas moves
             * up, this value becomes more negative, and the view is "seeing" the lower
             * part of the canvas.
             *
             * This confusing thing about this value is that it does not, and must not
             * include the absoluteTop offset. This is because it is used to calculate
             * the viewTop value.
             *
             * The viewTop is relative to the workspace origin (although in pixel
             * units). The workspace origin is the top-left corner of the workspace (at
             * least when it is enabled). It is shifted from the top-left of the
             * blocklyDiv so as not to be beneath the toolbox.
             *
             * When the workspace is enabled the viewTop and workspace origin are at the
             * same Y location. As the canvas slides towards the bottom this value
             * (scrollY) becomes more positive, and the viewTop becomes more negative
             * relative to the workspace origin (image in the workspace origin as a dot
             * on the canvas sliding downwards as the canvas moves).
             *
             * So if the scrollY were to include the absoluteTop this would in a way
             * "unshift" the workspace origin. This means that the viewTop would be
             * representing the top edge of the blocklyDiv, rather than the top edge of
             * the workspace.
             *
             * @type {number}
             */
            scrollY: number;
    
            /**
             * Horizontal scroll value when scrolling started in pixel units.
             * @type {number}
             */
            startScrollX: number;
    
            /**
             * Vertical scroll value when scrolling started in pixel units.
             * @type {number}
             */
            startScrollY: number;
    
            /**
             * Current scale.
             * @type {number}
             */
            scale: number;
    
            /**
             * original scale.
             * @type {number}
             */
            scaleStart: number;
    
            /** @type {Blockly.Trashcan} */
            trashcan: Blockly.Trashcan;
    
            /** @type {Blockly.MonitorIcon} */
            monitorIcon: Blockly.MonitorIcon;
    
            /**
             * This workspace's scrollbars, if they exist.
             * @type {Blockly.ScrollbarPair}
             */
            scrollbar: Blockly.ScrollbarPair;
    
            /**
             * Developers may define this function to add custom menu options to the
             * workspace's context menu or edit the workspace-created set of menu options.
             * @param {!Array.<!Object>} options List of menu options to add to.
             * @param {!Event} e The right-click event that triggered the context menu.
             */
            configureContextMenu(options: Object[], e: Event): void;
    
            /**
             * In a flyout, the target workspace where blocks should be placed after a drag.
             * Otherwise null.
             * @type {Blockly.WorkspaceSvg}
             * @package
             */
            targetWorkspace: Blockly.WorkspaceSvg;
    
            /**
             * Get the marker manager for this workspace.
             * @return {Blockly.MarkerManager} The marker manager.
             */
            getMarkerManager(): Blockly.MarkerManager;
    
            /**
             * Add the cursor svg to this workspaces svg group.
             * @param {SVGElement} cursorSvg The svg root of the cursor to be added to the
             *     workspace svg group.
             * @package
             */
            setCursorSvg(cursorSvg: SVGElement): void;
    
            /**
             * Add the marker svg to this workspaces svg group.
             * @param {SVGElement} markerSvg The svg root of the marker to be added to the
             *     workspace svg group.
             * @package
             */
            setMarkerSvg(markerSvg: SVGElement): void;
    
            /**
             * Get the marker with the given id.
             * @param {string} id The id of the marker.
             * @return {Blockly.Marker} The marker with the given id or null if no marker
             *     with the given id exists.
             * @package
             */
            getMarker(id: string): Blockly.Marker;
    
            /**
             * The cursor for this workspace.
             * @return {Blockly.Cursor} The cursor for the workspace.
             */
            getCursor(): Blockly.Cursor;
    
            /**
             * Get the block renderer attached to this workspace.
             * @return {!Blockly.blockRendering.Renderer} The renderer attached to this workspace.
             */
            getRenderer(): Blockly.blockRendering.Renderer;
    
            /**
             * Get the theme manager for this workspace.
             * @return {!Blockly.ThemeManager} The theme manager for this workspace.
             * @package
             */
            getThemeManager(): Blockly.ThemeManager;
    
            /**
             * Get the workspace theme object.
             * @return {!Blockly.Theme} The workspace theme object.
             */
            getTheme(): Blockly.Theme;
    
            /**
             * Set the workspace theme object.
             * If no theme is passed, default to the `Blockly.Themes.Classic` theme.
             * @param {Blockly.Theme} theme The workspace theme object.
             */
            setTheme(theme: Blockly.Theme): void;
    
            /**
             * Refresh all blocks on the workspace after a theme update.
             * @package
             */
            refreshTheme(): void;
    
            /**
             * Getter for the inverted screen CTM.
             * @return {SVGMatrix} The matrix to use in mouseToSvg
             */
            getInverseScreenCTM(): SVGMatrix;
    
            /**
             * Mark the inverse screen CTM as dirty.
             */
            updateInverseScreenCTM(): void;
    
            /**
             * Getter for isVisible
             * @return {boolean} Whether the workspace is visible.
             *     False if the workspace has been hidden by calling `setVisible(false)`.
             */
            isVisible(): boolean;
    
            /**
             * Return the absolute coordinates of the top-left corner of this element,
             * scales that after canvas SVG element, if it's a descendant.
             * The origin (0,0) is the top-left corner of the Blockly SVG.
             * @param {!SVGElement} element SVG element to find the coordinates of.
             * @return {!Blockly.utils.Coordinate} Object with .x and .y properties.
             * @package
             */
            getSvgXY(element: SVGElement): Blockly.utils.Coordinate;
    
            /**
             * Return the position of the workspace origin relative to the injection div
             * origin in pixels.
             * The workspace origin is where a block would render at position (0, 0).
             * It is not the upper left corner of the workspace SVG.
             * @return {!Blockly.utils.Coordinate} Offset in pixels.
             * @package
             */
            getOriginOffsetInPixels(): Blockly.utils.Coordinate;
    
            /**
             * Return the injection div that is a parent of this workspace.
             * Walks the DOM the first time it's called, then returns a cached value.
             * Note: We assume this is only called after the workspace has been injected
             * into the DOM.
             * @return {!Element} The first parent div with 'injectionDiv' in the name.
             * @package
             */
            getInjectionDiv(): Element;
    
            /**
             * Get the svg block canvas for the workspace.
             * @return {SVGElement} The svg group for the workspace.
             * @package
             */
            getBlockCanvas(): SVGElement;
    
            /**
             * Save resize handler data so we can delete it later in dispose.
             * @param {!Array.<!Array>} handler Data that can be passed to unbindEvent_.
             */
            setResizeHandlerWrapper(handler: any[][]): void;
    
            /**
             * Create the workspace DOM elements.
             * @param {string=} opt_backgroundClass Either 'blocklyMainBackground' or
             *     'blocklyMutatorBackground'.
             * @return {!Element} The workspace's SVG group.
             */
            createDom(opt_backgroundClass?: string): Element;
    
            /**
             * <g class="blocklyWorkspace">
             *   <rect class="blocklyMainBackground" height="100%" width="100%"></rect>
             *   [Trashcan and/or flyout may go here]
             *   <g class="blocklyBlockCanvas"></g>
             *   <g class="blocklyBubbleCanvas"></g>
             * </g>
             * @type {SVGElement}
             */
            svgGroup_: SVGElement;
    
            /** @type {SVGElement} */
            svgBackground_: SVGElement;
    
            /** @type {SVGElement} */
            svgBlockCanvas_: SVGElement;
    
            /** @type {SVGElement} */
            svgBubbleCanvas_: SVGElement;
    
            /**
             * Dispose of this workspace.
             * Unlink from all DOM elements to prevent memory leaks.
             * @suppress {checkTypes}
             */
            dispose(): void;
    
            /**
             * Add a trashcan.
             * @package
             */
            addTrashcan(): void;
    
            /**
             * Add zoom controls.
             * @package
             */
            addZoomControls(): void;
    
            /** @type {Blockly.ZoomControls} */
            zoomControls_: Blockly.ZoomControls;
    
            /**
             * Add monitor icon.
             * @package
             */
            addMonitorIcon(): void;
    
            /**
             * Add a flyout element in an element with the given tag name.
             * @param {string|
             * !Blockly.utils.Svg<!SVGSVGElement>|
             * !Blockly.utils.Svg<!SVGGElement>} tagName What type of tag the
             *     flyout belongs in.
             * @return {!Element} The element containing the flyout DOM.
             * @package
             */
            addFlyout(tagName: string|Blockly.utils.Svg<SVGSVGElement>|Blockly.utils.Svg<SVGGElement>): Element;
    
            /**
             * Getter for the flyout associated with this workspace.  This flyout may be
             * owned by either the toolbox or the workspace, depending on toolbox
             * configuration.  It will be null if there is no flyout.
             * @param {boolean=} opt_own Only return the workspace's own flyout if True.
             * @return {Blockly.IFlyout} The flyout on this workspace.
             * @package
             */
            getFlyout(opt_own?: boolean): Blockly.IFlyout;
    
            /**
             * Getter for the toolbox associated with this workspace, if one exists.
             * @return {Blockly.IToolbox} The toolbox on this workspace.
             * @package
             */
            getToolbox(): Blockly.IToolbox;
    
            /**
             * If enabled, resize the parts of the workspace that change when the workspace
             * contents (e.g. block positions) change.  This will also scroll the
             * workspace contents if needed.
             * @package
             */
            resizeContents(): void;
    
            /**
             * Resize and reposition all of the workspace chrome (toolbox,
             * trash, scrollbars etc.)
             * This should be called when something changes that
             * requires recalculating dimensions and positions of the
             * trash, zoom, toolbox, etc. (e.g. window resize).
             */
            resize(): void;
    
            /**
             * Resizes and repositions workspace chrome if the page has a new
             * scroll position.
             * @package
             */
            updateScreenCalculationsIfScrolled(): void;
    
            /**
             * Get the SVG element that forms the drawing surface.
             * @return {!SVGGElement} SVG group element.
             */
            getCanvas(): SVGGElement;
    
            /**
             * Get the SVG element that forms the bubble surface.
             * @return {!SVGGElement} SVG group element.
             */
            getBubbleCanvas(): SVGGElement;
    
            /**
             * Get the SVG element that contains this workspace.
             * Note: We assume this is only called after the workspace has been injected
             * into the DOM.
             * @return {!SVGElement} SVG element.
             */
            getParentSvg(): SVGElement;
    
            /**
             * Fires a viewport event if events are enabled and there is a change in
             * viewport values.
             * @package
             */
            maybeFireViewportChangeEvent(): void;
    
            /**
             * Translate this workspace to new coordinates.
             * @param {number} x Horizontal translation, in pixel units relative to the
             *    top left of the Blockly div.
             * @param {number} y Vertical translation, in pixel units relative to the
             *    top left of the Blockly div.
             */
            translate(x: number, y: number): void;
    
            /**
             * Called at the end of a workspace drag to take the contents
             * out of the drag surface and put them back into the workspace SVG.
             * Does nothing if the workspace drag surface is not enabled.
             * @package
             */
            resetDragSurface(): void;
    
            /**
             * Called at the beginning of a workspace drag to move contents of
             * the workspace to the drag surface.
             * Does nothing if the drag surface is not enabled.
             * @package
             */
            setupDragSurface(): void;
    
            /**
             * @return {Blockly.BlockDragSurfaceSvg} This workspace's block drag surface,
             *     if one is in use.
             * @package
             */
            getBlockDragSurface(): Blockly.BlockDragSurfaceSvg;
    
            /**
             * Returns the horizontal offset of the workspace.
             * Intended for LTR/RTL compatibility in XML.
             * @return {number} Width.
             */
            getWidth(): number;
    
            /**
             * Toggles the visibility of the workspace.
             * Currently only intended for main workspace.
             * @param {boolean} isVisible True if workspace should be visible.
             */
            setVisible(isVisible: boolean): void;
    
            /**
             * Render all blocks in workspace.
             */
            render(): void;
    
            /**
             * Highlight or unhighlight a block in the workspace.  Block highlighting is
             * often used to visually mark blocks currently being executed.
             * @param {?string} id ID of block to highlight/unhighlight,
             *   or null for no block (used to unhighlight all blocks).
             * @param {boolean=} opt_state If undefined, highlight specified block and
             * automatically unhighlight all others.  If true or false, manually
             * highlight/unhighlight the specified block.
             */
            highlightBlock(id: string, opt_state?: boolean): void;
    
            /**
             * Paste the provided block onto the workspace.
             * @param {!Element|!DocumentFragment} xmlBlock XML block element or an empty
             *     DocumentFragment if the block was an insertion marker.
             */
            paste(xmlBlock: Element|DocumentFragment): void;
    
            /**
             * 
             * @param {!Element|!DocumentFragment} xmlBlock XML block element or an empty
             *     DocumentFragment if the block was an insertion marker.
             */
            RMDuplicate(xmlBlock: Element|DocumentFragment, x: any /* jsdoc error */, y: any /* jsdoc error */): void;
    
            /**
             * Refresh the toolbox unless there's a drag in progress.
             * @package
             */
            refreshToolboxSelection(): void;
    
            /**
             * Rename a variable by updating its name in the variable map.  Update the
             *     flyout to show the renamed variable immediately.
             * @param {string} id ID of the variable to rename.
             * @param {string} newName New variable name.
             */
            renameVariableById(id: string, newName: string): void;
    
            /**
             * Delete a variable by the passed in ID.   Update the flyout to show
             *     immediately that the variable is deleted.
             * @param {string} id ID of variable to delete.
             */
            deleteVariableById(id: string): void;
    
            /**
             * Create a new variable with the given name.  Update the flyout to show the
             *     new variable immediately.
             * @param {string} name The new variable's name.
             * @param {?string=} opt_type The type of the variable like 'int' or 'string'.
             *     Does not need to be unique. Field_variable can filter variables based on
             *     their type. This will default to '' which is a specific type.
             * @param {?string=} opt_id The unique ID of the variable. This will default to
             *     a UUID.
             * @param {?number=} opt_arrayLength the lenght of the array if the variable is an array -RM
             * @param {?number=} opt_arrayWidth the widht of the array if the variable is an array -RM
             * @return {!Blockly.VariableModel} The newly created variable.
             */
            createVariable(name: string, opt_type?: string, opt_id?: string, opt_arrayLength?: number, opt_arrayWidth?: number): Blockly.VariableModel;
    
            /**
             * Make a list of all the delete areas for this workspace.
             */
            recordDeleteAreas(): void;
    
            /**
             * Is the mouse event over a delete area (toolbox or non-closing flyout)?
             * @param {!Event} e Mouse move event.
             * @return {?number} Null if not over a delete area, or an enum representing
             *     which delete area the event is over.
             */
            isDeleteArea(e: Event): number;
    
            /**
             * Is the mouse event over a delete area (toolbox or non-closing flyout)?
             * @param {!Event} e Mouse move event.
             * @return {?number} Null if not over a delete area, or an enum representing
             *     which delete area the event is over.
             */
            isMonitorArea(e: Event): number;
    
            /**
             * Start tracking a drag of an object on this workspace.
             * @param {!Event} e Mouse down event.
             * @param {!Blockly.utils.Coordinate} xy Starting location of object.
             */
            startDrag(e: Event, xy: Blockly.utils.Coordinate): void;
    
            /**
             * Track a drag of an object on this workspace.
             * @param {!Event} e Mouse move event.
             * @return {!Blockly.utils.Coordinate} New location of object.
             */
            moveDrag(e: Event): Blockly.utils.Coordinate;
    
            /**
             * Is the user currently dragging a block or scrolling the flyout/workspace?
             * @return {boolean} True if currently dragging or scrolling.
             */
            isDragging(): boolean;
    
            /**
             * Is this workspace draggable?
             * @return {boolean} True if this workspace may be dragged.
             */
            isDraggable(): boolean;
    
            /**
             * Should the workspace have bounded content? Used to tell if the
             * workspace's content should be sized so that it can move (bounded) or not
             * (exact sizing).
             * @return {boolean} True if the workspace should be bounded, false otherwise.
             * @package
             */
            isContentBounded(): boolean;
    
            /**
             * Is this workspace movable?
             *
             * This means the user can reposition the X Y coordinates of the workspace
             * through input. This can be through scrollbars, scroll wheel, dragging, or
             * through zooming with the scroll wheel or pinch (since the zoom is centered on
             * the mouse position). This does not include zooming with the zoom controls
             * since the X Y coordinates are decided programmatically.
             * @return {boolean} True if the workspace is movable, false otherwise.
             */
            isMovable(): boolean;
    
            /**
             * Calculate the bounding box for the blocks on the workspace.
             * Coordinate system: workspace coordinates.
             *
             * @return {!Blockly.utils.Rect} Contains the position and size of the
             *   bounding box containing the blocks on the workspace.
             */
            getBlocksBoundingBox(): Blockly.utils.Rect;
    
            /**
             * Clean up the workspace by ordering all the blocks in a column.
             */
            cleanUp(): void;
    
            /**
             * Show the context menu for the workspace.
             * @param {!Event} e Mouse event.
             * @package
             */
            showContextMenu(e: Event): void;
    
            /**
             * Modify the block tree on the existing toolbox.
             * @param {?Blockly.utils.toolbox.ToolboxDefinition} toolboxDef
             *    DOM tree of toolbox contents, string of toolbox contents, or JSON
             *    representing toolbox definition.
             */
            updateToolbox(toolboxDef: Blockly.utils.toolbox.ToolboxDefinition): void;
    
            /**
             * Mark this workspace as the currently focused main workspace.
             */
            markFocused(): void;
    
            /**
             * Zooms the workspace in or out relative to/centered on the given (x, y)
             * coordinate.
             * @param {number} x X coordinate of center, in pixel units relative to the
             *     top-left corner of the parentSVG.
             * @param {number} y Y coordinate of center, in pixel units relative to the
             *     top-left corner of the parentSVG.
             * @param {number} amount Amount of zooming. The formula for the new scale
             *     is newScale = currentScale * (scaleSpeed^amount). scaleSpeed is set in
             *     the workspace options. Negative amount values zoom out, and positive
             *     amount values zoom in.
             */
            zoom(x: number, y: number, amount: number): void;
    
            /**
             * Zooming the blocks centered in the center of view with zooming in or out.
             * @param {number} type Type of zooming (-1 zooming out and 1 zooming in).
             */
            zoomCenter(type: number): void;
    
            /**
             * Zoom the blocks to fit in the workspace if possible.
             */
            zoomToFit(): void;
    
            /**
             * Add a transition class to the block and bubble canvas, to animate any
             * transform changes.
             * @package
             */
            beginCanvasTransition(): void;
    
            /**
             * Remove transition class from the block and bubble canvas.
             * @package
             */
            endCanvasTransition(): void;
    
            /**
             * Center the workspace.
             */
            scrollCenter(): void;
    
            /**
             * Scroll the workspace to center on the given block.
             * @param {?string} id ID of block center on.
             * @public
             */
            centerOnBlock(id: string): void;
    
            /**
             * Function is altered version of Blockly centerOnBlock function
             * Instead of moving workspace view to the center, the workspace view of the block passed in is shifted to the top left corner.
             * This function was modified in order to have the ability to move workspace block focus to top left view of workspace
             * @param {?string} id ID of block moving to top left.
             * @public
             */
            moveWorkspaceTopLeft(id: string): void;
    
            /**
             * Set the workspace's zoom factor.
             * @param {number} newScale Zoom factor. Units: (pixels / workspaceUnit).
             */
            setScale(newScale: number): void;
    
            /**
             * Get the workspace's zoom factor.  If the workspace has a parent, we call into
             * the parent to get the workspace scale.
             * @return {number} The workspace zoom factor. Units: (pixels / workspaceUnit).
             */
            getScale(): number;
    
            /**
             * Scroll the workspace to a specified offset (in pixels), keeping in the
             * workspace bounds. See comment on workspaceSvg.scrollX for more detail on
             * the meaning of these values.
             * @param {number} x Target X to scroll to.
             * @param {number} y Target Y to scroll to.
             * @package
             */
            scroll(x: number, y: number): void;
    
            /**
             * Adds a block to the list of top blocks.
             * @param {!Blockly.Block} block Block to add.
             */
            addTopBlock(block: Blockly.Block): void;
    
            /**
             * Removes a block from the list of top blocks.
             * @param {!Blockly.Block} block Block to remove.
             */
            removeTopBlock(block: Blockly.Block): void;
    
            /**
             * Adds a comment to the list of top comments.
             * @param {!Blockly.WorkspaceComment} comment comment to add.
             */
            addTopComment(comment: Blockly.WorkspaceComment): void;
    
            /**
             * Removes a comment from the list of top comments.
             * @param {!Blockly.WorkspaceComment} comment comment to remove.
             */
            removeTopComment(comment: Blockly.WorkspaceComment): void;
    
            /**
             * Adds a bounded element to the list of top bounded elements.
             * @param {!Blockly.IBoundedElement} element Bounded element to add.
             */
            addTopBoundedElement(element: Blockly.IBoundedElement): void;
    
            /**
             * Removes a bounded element from the list of top bounded elements.
             * @param {!Blockly.IBoundedElement} element Bounded element to remove.
             */
            removeTopBoundedElement(element: Blockly.IBoundedElement): void;
    
            /**
             * Finds the top-level bounded elements and returns them.
             * @return {!Array.<!Blockly.IBoundedElement>} The top-level bounded elements.
             */
            getTopBoundedElements(): Blockly.IBoundedElement[];
    
            /**
             * Update whether this workspace has resizes enabled.
             * If enabled, workspace will resize when appropriate.
             * If disabled, workspace will not resize until re-enabled.
             * Use to avoid resizing during a batch operation, for performance.
             * @param {boolean} enabled Whether resizes should be enabled.
             */
            setResizesEnabled(enabled: boolean): void;
    
            /**
             * Dispose of all blocks in workspace, with an optimization to prevent resizes.
             */
            clear(): void;
    
            /**
             * Register a callback function associated with a given key, for clicks on
             * buttons and labels in the flyout.
             * For instance, a button specified by the XML
             * <button text="create variable" callbackKey="CREATE_VARIABLE"></button>
             * should be matched by a call to
             * registerButtonCallback("CREATE_VARIABLE", yourCallbackFunction).
             * @param {string} key The name to use to look up this function.
             * @param {function(!Blockly.FlyoutButton)} func The function to call when the
             *     given button is clicked.
             */
            registerButtonCallback(key: string, func: { (_0: Blockly.FlyoutButton): any /*missing*/ }): void;
    
            /**
             * Get the callback function associated with a given key, for clicks on buttons
             * and labels in the flyout.
             * @param {string} key The name to use to look up the function.
             * @return {?function(!Blockly.FlyoutButton)} The function corresponding to the
             *     given key for this workspace; null if no callback is registered.
             */
            getButtonCallback(key: string): { (_0: Blockly.FlyoutButton): any /*missing*/ };
    
            /**
             * Remove a callback for a click on a button in the flyout.
             * @param {string} key The name associated with the callback function.
             */
            removeButtonCallback(key: string): void;
    
            /**
             * Register a callback function associated with a given key, for populating
             * custom toolbox categories in this workspace.  See the variable and procedure
             * categories as an example.
             * @param {string} key The name to use to look up this function.
             * @param {function(!Blockly.Workspace):!Array.<!Element>} func The function to
             *     call when the given toolbox category is opened.
             */
            registerToolboxCategoryCallback(key: string, func: { (_0: Blockly.Workspace): Element[] }): void;
    
            /**
             * Get the callback function associated with a given key, for populating
             * custom toolbox categories in this workspace.
             * @param {string} key The name to use to look up the function.
             * @return {?function(!Blockly.Workspace):!Array.<!Element>} The function
             *     corresponding to the given key for this workspace, or null if no function
             *     is registered.
             */
            getToolboxCategoryCallback(key: string): { (_0: Blockly.Workspace): Element[] };
    
            /**
             * Remove a callback for a click on a custom category's name in the toolbox.
             * @param {string} key The name associated with the callback function.
             */
            removeToolboxCategoryCallback(key: string): void;
    
            /**
             * Look up the gesture that is tracking this touch stream on this workspace.
             * May create a new gesture.
             * @param {!Event} e Mouse event or touch event.
             * @return {Blockly.TouchGesture} The gesture that is tracking this touch
             *     stream, or null if no valid gesture exists.
             * @package
             */
            getGesture(e: Event): Blockly.TouchGesture;
    
            /**
             * Clear the reference to the current gesture.
             * @package
             */
            clearGesture(): void;
    
            /**
             * Cancel the current gesture, if one exists.
             * @package
             */
            cancelCurrentGesture(): void;
    
            /**
             * Get the audio manager for this workspace.
             * @return {!Blockly.WorkspaceAudio} The audio manager for this workspace.
             */
            getAudioManager(): Blockly.WorkspaceAudio;
    
            /**
             * Get the grid object for this workspace, or null if there is none.
             * @return {Blockly.Grid} The grid object for this workspace.
             * @package
             */
            getGrid(): Blockly.Grid;
    
            /**
             * Refreshes the current toolbox
             */
            refreshToolbox(): void;
    } 
    
}
