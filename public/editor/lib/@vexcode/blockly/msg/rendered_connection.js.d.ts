
declare module Blockly {

    class RenderedConnection extends RenderedConnection__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class RenderedConnection__Class extends Blockly.Connection__Class  { 
    
            /**
             * Class for a connection between blocks that may be rendered on screen.
             * @param {!Blockly.BlockSvg} source The block establishing this connection.
             * @param {number} type The type of the connection.
             * @extends {Blockly.Connection}
             * @constructor
             */
            constructor(source: Blockly.BlockSvg, type: number);
    
            /**
             * Returns the distance between this connection and another connection in
             * workspace units.
             * @param {!Blockly.Connection} otherConnection The other connection to measure
             *     the distance to.
             * @return {number} The distance between connections, in workspace units.
             */
            distanceFrom(otherConnection: Blockly.Connection): number;
    
            /**
             * Change the connection's coordinates.
             * @param {number} x New absolute x coordinate, in workspace coordinates.
             * @param {number} y New absolute y coordinate, in workspace coordinates.
             */
            moveTo(x: number, y: number): void;
    
            /**
             * Change the connection's coordinates.
             * @param {number} dx Change to x coordinate, in workspace units.
             * @param {number} dy Change to y coordinate, in workspace units.
             */
            moveBy(dx: number, dy: number): void;
    
            /**
             * Move this connection to the location given by its offset within the block and
             * the location of the block's top left corner.
             * @param {!Blockly.utils.Coordinate} blockTL The location of the top left corner
             *     of the block, in workspace coordinates.
             */
            moveToOffset(blockTL: Blockly.utils.Coordinate): void;
    
            /**
             * Set the offset of this connection relative to the top left of its block.
             * @param {number} x The new relative x, in workspace units.
             * @param {number} y The new relative y, in workspace units.
             */
            setOffsetInBlock(x: number, y: number): void;
    
            /**
             * Get the offset of this connection relative to the top left of its block.
             * @return {!Blockly.utils.Coordinate} The offset of the connection.
             * @package
             */
            getOffsetInBlock(): Blockly.utils.Coordinate;
    
            /**
             * Find the closest compatible connection to this connection.
             * All parameters are in workspace units.
             * @param {number} maxLimit The maximum radius to another connection.
             * @param {!Blockly.utils.Coordinate} dxy Offset between this connection's location
             *     in the database and the current location (as a result of dragging).
             * @return {!{connection: ?Blockly.Connection, radius: number}} Contains two
             *     properties: 'connection' which is either another connection or null,
             *     and 'radius' which is the distance.
             */
            closest(maxLimit: number, dxy: Blockly.utils.Coordinate): { connection: Blockly.Connection; radius: number };
    
            /**
             * Add highlighting around this connection.
             */
            highlight(): void;
    
            /**
             * Unhide this connection, as well as all down-stream connections on any block
             * attached to this connection.  This happens when a block is expanded.
             * Also unhides down-stream comments.
             * @return {!Array.<!Blockly.Block>} List of blocks to render.
             */
            unhideAll(): Blockly.Block[];
    
            /**
             * Remove the highlighting around this connection.
             */
            unhighlight(): void;
    
            /**
             * Set whether this connections is hidden (not tracked in a database) or not.
             * @param {boolean} hidden True if connection is hidden.
             */
            setHidden(hidden: boolean): void;
    
            /**
             * Hide this connection, as well as all down-stream connections on any block
             * attached to this connection.  This happens when a block is collapsed.
             * Also hides down-stream comments.
             */
            hideAll(): void;
    
            /**
             * Check if the two connections can be dragged to connect to each other.
             * @param {!Blockly.Connection} candidate A nearby connection to check.
             * @param {number=} maxRadius The maximum radius allowed for connections, in
             *     workspace units.
             * @return {boolean} True if the connection is allowed, false otherwise.
             */
            isConnectionAllowed(candidate: Blockly.Connection, maxRadius?: number): boolean;
    
            /**
             * Behavior after a connection attempt fails.
             * @param {Blockly.Connection} otherConnection Connection that this connection
             *     failed to connect to.
             * @package
             */
            onFailedConnect(otherConnection: Blockly.Connection): void;
    } 
    
}
