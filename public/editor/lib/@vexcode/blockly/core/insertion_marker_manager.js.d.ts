
declare module Blockly {

    class InsertionMarkerManager extends InsertionMarkerManager__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class InsertionMarkerManager__Class  { 
    
            /**
             * Class that controls updates to connections during drags.  It is primarily
             * responsible for finding the closest eligible connection and highlighting or
             * unhiglighting it as needed during a drag.
             * @param {!Blockly.BlockSvg} block The top block in the stack being dragged.
             * @constructor
             */
            constructor(block: Blockly.BlockSvg);
    
            /**
             * Sever all links from this object.
             * @package
             */
            dispose(): void;
    
            /**
             * Update the available connections for the top block. These connections can
             * change if a block is unplugged and the stack is healed.
             * @package
             */
            updateAvailableConnections(): void;
    
            /**
             * Return whether the block would be deleted if dropped immediately, based on
             * information from the most recent move event.
             * @return {boolean} True if the block would be deleted if dropped immediately.
             * @package
             */
            wouldDeleteBlock(): boolean;
    
            /**
             * Return whether the block would be monitored if dropped immediately, based on
             * information from the most recent move event.
             * @return {boolean} True if the block would be monitored if dropped immediately.
             * @package
             */
            wouldMonitorBlock(): boolean;
    
            /**
             * Return whether the block would be connected if dropped immediately, based on
             * information from the most recent move event.
             * @return {boolean} True if the block would be connected if dropped
             *   immediately.
             * @package
             */
            wouldConnectBlock(): boolean;
    
            /**
             * Connect to the closest connection and render the results.
             * This should be called at the end of a drag.
             * @package
             */
            applyConnections(): void;
    
            /**
             * Update connections based on the most recent move location.
             * @param {!Blockly.utils.Coordinate} dxy Position relative to drag start,
             *     in workspace units.
             * @param {?number} deleteArea One of {@link Blockly.DELETE_AREA_TRASH},
             *     {@link Blockly.DELETE_AREA_TOOLBOX}, or {@link Blockly.DELETE_AREA_NONE}.
             * @param {?number} monitorArea One of {@link Blockly.MONITOR_AREA_NONE},
             *     or {@link Blockly.MONITOR_AREA_DROP}.
             * @package
             */
            update(dxy: Blockly.utils.Coordinate, deleteArea: number, monitorArea: number): void;
    
            /**
             * Get a list of the insertion markers that currently exist.  Drags have 0, 1,
             * or 2 insertion markers.
             * @return {!Array.<!Blockly.BlockSvg>} A possibly empty list of insertion
             *     marker blocks.
             * @package
             */
            getInsertionMarkers(): Blockly.BlockSvg[];
    } 
    
}

declare module Blockly.InsertionMarkerManager {

    /**
     * An enum describing different kinds of previews the InsertionMarkerManager
     * could display.
     * @enum {number}
     */
    enum PREVIEW_TYPE { INSERTION_MARKER, INPUT_OUTLINE, REPLACEMENT_FADE } 
}
