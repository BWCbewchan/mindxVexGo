
declare module Blockly {

    class MarkerManager extends MarkerManager__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class MarkerManager__Class  { 
    
            /**
             * Class to manage the multiple markers and the cursor on a workspace.
             * @param {!Blockly.WorkspaceSvg} workspace The workspace for the marker manager.
             * @constructor
             * @package
             */
            constructor(workspace: Blockly.WorkspaceSvg);
    
            /**
             * Register the marker by adding it to the map of markers.
             * @param {string} id A unique identifier for the marker.
             * @param {!Blockly.Marker} marker The marker to register.
             */
            registerMarker(id: string, marker: Blockly.Marker): void;
    
            /**
             * Unregister the marker by removing it from the map of markers.
             * @param {string} id The id of the marker to unregister.
             */
            unregisterMarker(id: string): void;
    
            /**
             * Get the cursor for the workspace.
             * @return {Blockly.Cursor} The cursor for this workspace.
             */
            getCursor(): Blockly.Cursor;
    
            /**
             * Get a single marker that corresponds to the given id.
             * @param {string} id A unique identifier for the marker.
             * @return {Blockly.Marker} The marker that corresponds to the given id, or null
             *     if none exists.
             */
            getMarker(id: string): Blockly.Marker;
    
            /**
             * Sets the cursor and initializes the drawer for use with keyboard navigation.
             * @param {Blockly.Cursor} cursor The cursor used to move around this workspace.
             */
            setCursor(cursor: Blockly.Cursor): void;
    
            /**
             * Add the cursor svg to this workspace svg group.
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
             * Redraw the attached cursor svg if needed.
             * @package
             */
            updateMarkers(): void;
    
            /**
             * Dispose of the marker manager.
             * Go through and delete all markers associated with this marker manager.
             * @suppress {checkTypes}
             * @package
             */
            dispose(): void;
    } 
    
}
