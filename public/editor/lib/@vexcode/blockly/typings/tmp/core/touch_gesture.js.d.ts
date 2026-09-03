
declare module Blockly {

    class TouchGesture extends TouchGesture__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class TouchGesture__Class extends Blockly.Gesture__Class  { 
    
            /**
             * Class for one gesture.
             * @param {!Event} e The event that kicked off this gesture.
             * @param {!Blockly.WorkspaceSvg} creatorWorkspace The workspace that created
             *     this gesture and has a reference to it.
             * @extends {Blockly.Gesture}
             * @constructor
             */
            constructor(e: Event, creatorWorkspace: Blockly.WorkspaceSvg);
    
            /**
             * Start a gesture: update the workspace to indicate that a gesture is in
             * progress and bind mousemove and mouseup handlers.
             * @param {!Event} e A mouse down, touch start or pointer down event.
             * @package
             */
            doStart(e: Event): void;
    
            /**
             * Bind gesture events.
             * Overriding the gesture definition of this function, binding the same
             * functions for onMoveWrapper_ and onUpWrapper_ but passing
             * opt_noCaptureIdentifier.
             * In addition, binding a second mouse down event to detect multi-touch events.
             * @param {!Event} e A mouse down or touch start event.
             * @package
             */
            bindMouseEvents(e: Event): void;
    
            /**
             * Handle a mouse down, touch start, or pointer down event.
             * @param {!Event} e A mouse down, touch start, or pointer down event.
             * @package
             */
            handleStart(e: Event): void;
    
            /**
             * Handle a mouse move, touch move, or pointer move event.
             * @param {!Event} e A mouse move, touch move, or pointer move event.
             * @package
             */
            handleMove(e: Event): void;
    
            /**
             * Handle a mouse up, touch end, or pointer up event.
             * @param {!Event} e A mouse up, touch end, or pointer up event.
             * @package
             */
            handleUp(e: Event): void;
    
            /**
             * Whether this gesture is part of a multi-touch gesture.
             * @return {boolean} Whether this gesture is part of a multi-touch gesture.
             * @package
             */
            isMultiTouch(): boolean;
    
            /**
             * Sever all links from this object.
             * @package
             */
            dispose(): void;
    
            /**
             * Handle a touch start or pointer down event and keep track of current
             * pointers.
             * @param {!Event} e A touch start, or pointer down event.
             * @package
             */
            handleTouchStart(e: Event): void;
    
            /**
             * Handle a touch move or pointer move event and zoom in/out if two pointers
             * are on the screen.
             * @param {!Event} e A touch move, or pointer move event.
             * @package
             */
            handleTouchMove(e: Event): void;
    
            /**
             * Handle a touch end or pointer end event and end the gesture.
             * @param {!Event} e A touch end, or pointer end event.
             * @package
             */
            handleTouchEnd(e: Event): void;
    
            /**
             * Helper function returning the current touch point coordinate.
             * @param {!Event} e A touch or pointer event.
             * @return {Blockly.utils.Coordinate} The current touch point coordinate
             * @package
             */
            getTouchPoint(e: Event): Blockly.utils.Coordinate;
    } 
    
}

declare module Blockly.TouchGesture {

    /**
     * A multiplier used to convert the gesture scale to a zoom in delta.
     * @const
     */
    var ZOOM_IN_MULTIPLIER: any /*missing*/;

    /**
     * A multiplier used to convert the gesture scale to a zoom out delta.
     * @const
     */
    var ZOOM_OUT_MULTIPLIER: any /*missing*/;
}
