
declare module Blockly {

    class ScrollbarPair extends ScrollbarPair__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class ScrollbarPair__Class  { 
    
            /**
             * Class for a pair of scrollbars.  Horizontal and vertical.
             * @param {!Blockly.Workspace} workspace Workspace to bind the scrollbars to.
             * @constructor
             */
            constructor(workspace: Blockly.Workspace);
    
            /**
             * Dispose of this pair of scrollbars.
             * Unlink from all DOM elements to prevent memory leaks.
             */
            dispose(): void;
    
            /**
             * Recalculate both of the scrollbars' locations and lengths.
             * Also reposition the corner rectangle.
             */
            resize(): void;
    
            /**
             * Set the handles of both scrollbars to be at a certain position in CSS pixels
             * relative to their parents.
             * @param {number} x Horizontal scroll value.
             * @param {number} y Vertical scroll value.
             */
            set(x: number, y: number): void;
    
            /**
             * Set whether this scrollbar's container is visible.
             * @param {boolean} visible Whether the container is visible.
             */
            setContainerVisible(visible: boolean): void;
    } 
    

    class Scrollbar extends Scrollbar__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Scrollbar__Class  { 
    
            /**
             * Class for a pure SVG scrollbar.
             * This technique offers a scrollbar that is guaranteed to work, but may not
             * look or behave like the system's scrollbars.
             * @param {!Blockly.Workspace} workspace Workspace to bind the scrollbar to.
             * @param {boolean} horizontal True if horizontal, false if vertical.
             * @param {boolean=} opt_pair True if scrollbar is part of a horiz/vert pair.
             * @param {string=} opt_class A class to be applied to this scrollbar.
             * @constructor
             */
            constructor(workspace: Blockly.Workspace, horizontal: boolean, opt_pair?: boolean, opt_class?: string);
    
            /**
             * The position of the mouse along this scrollbar's major axis at the start of
             * the most recent drag.
             * Units are CSS pixels, with (0, 0) at the top left of the browser window.
             * For a horizontal scrollbar this is the x coordinate of the mouse down event;
             * for a vertical scrollbar it's the y coordinate of the mouse down event.
             * @type {Blockly.utils.Coordinate}
             */
            startDragMouse_: Blockly.utils.Coordinate;
    
            /**
             * Dispose of this scrollbar.
             * Unlink from all DOM elements to prevent memory leaks.
             */
            dispose(): void;
    
            /**
             * Set the length of the scrollbar's handle and change the SVG attribute
             * accordingly.
             * @param {number} newLength The new scrollbar handle length in CSS pixels.
             */
            setHandleLength_(newLength: number): void;
    
            /**
             * Set the offset of the scrollbar's handle from the scrollbar's position, and
             * change the SVG attribute accordingly.
             * @param {number} newPosition The new scrollbar handle offset in CSS pixels.
             */
            setHandlePosition(newPosition: number): void;
    
            /**
             * Recalculate the scrollbar's location and its length.
             * @param {Object=} opt_metrics A data structure of from the describing all the
             * required dimensions.  If not provided, it will be fetched from the host
             * object.
             */
            resize(opt_metrics?: Object): void;
    
            /**
             * Recalculate a horizontal scrollbar's location on the screen and path length.
             * This should be called when the layout or size of the window has changed.
             * @param {!Object} hostMetrics A data structure describing all the
             *     required dimensions, possibly fetched from the host object.
             */
            resizeViewHorizontal(hostMetrics: Object): void;
    
            /**
             * Recalculate a horizontal scrollbar's location within its path and length.
             * This should be called when the contents of the workspace have changed.
             * @param {!Object} hostMetrics A data structure describing all the
             *     required dimensions, possibly fetched from the host object.
             */
            resizeContentHorizontal(hostMetrics: Object): void;
    
            /**
             * Recalculate a vertical scrollbar's location on the screen and path length.
             * This should be called when the layout or size of the window has changed.
             * @param {!Object} hostMetrics A data structure describing all the
             *     required dimensions, possibly fetched from the host object.
             */
            resizeViewVertical(hostMetrics: Object): void;
    
            /**
             * Recalculate a vertical scrollbar's location within its path and length.
             * This should be called when the contents of the workspace have changed.
             * @param {!Object} hostMetrics A data structure describing all the
             *     required dimensions, possibly fetched from the host object.
             */
            resizeContentVertical(hostMetrics: Object): void;
    
            /**
             * Is the scrollbar visible.  Non-paired scrollbars disappear when they aren't
             * needed.
             * @return {boolean} True if visible.
             */
            isVisible(): boolean;
    
            /**
             * Set whether the scrollbar's container is visible and update
             * display accordingly if visibility has changed.
             * @param {boolean} visible Whether the container is visible
             */
            setContainerVisible(visible: boolean): void;
    
            /**
             * Set whether the scrollbar is visible.
             * Only applies to non-paired scrollbars.
             * @param {boolean} visible True if visible.
             */
            setVisible(visible: boolean): void;
    
            /**
             * Update visibility of scrollbar based on whether it thinks it should
             * be visible and whether its containing workspace is visible.
             * We cannot rely on the containing workspace being hidden to hide us
             * because it is not necessarily our parent in the DOM.
             */
            updateDisplay_(): void;
    
            /**
             * Set the scrollbar handle's position.
             * @param {number} value The distance from the top/left end of the bar, in CSS
             *     pixels.  It may be larger than the maximum allowable position of the
             *     scrollbar handle.
             */
            set(value: number): void;
    
            /**
             * Record the origin of the workspace that the scrollbar is in, in pixels
             * relative to the injection div origin. This is for times when the scrollbar is
             * used in an object whose origin isn't the same as the main workspace
             * (e.g. in a flyout.)
             * @param {number} x The x coordinate of the scrollbar's origin, in CSS pixels.
             * @param {number} y The y coordinate of the scrollbar's origin, in CSS pixels.
             */
            setOrigin(x: number, y: number): void;
    } 
    
}

declare module Blockly.Scrollbar {

    /**
     * Width of vertical scrollbar or height of horizontal scrollbar in CSS pixels.
     * Scrollbars should be larger on touch devices.
     */
    var scrollbarThickness: any /*missing*/;
}
