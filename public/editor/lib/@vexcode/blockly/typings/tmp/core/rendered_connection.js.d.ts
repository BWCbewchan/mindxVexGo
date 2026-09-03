
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
             * Connection this connection connects to.  Null if not connected.
             * @type {Blockly.RenderedConnection}
             */
            targetConnection: Blockly.RenderedConnection;
    
            /**
             * Returns the distance between this connection and another connection in
             * workspace units.
             * @param {!Blockly.Connection} otherConnection The other connection to measure
             *     the distance to.
             * @return {number} The distance between connections, in workspace units.
             */
            distanceFrom(otherConnection: Blockly.Connection): number;
    
            /**
             * Move the block(s) belonging to the connection to a point where they don't
             * visually interfere with the specified connection.
             * @param {!Blockly.Connection} staticConnection The connection to move away
             *     from.
             * @package
             */
            bumpAwayFrom(staticConnection: Blockly.Connection): void;
    
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
             * @param {!Blockly.utils.Coordinate} blockTL The location of the top left
             *     corner of the block, in workspace coordinates.
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
             * Move the blocks on either side of this connection right next to each other.
             * @package
             */
            tighten(): void;
    
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
             * Remove the highlighting around this connection.
             */
            unhighlight(): void;
    
            /**
             * Set whether this connections is tracked in the database or not.
             * @param {boolean} doTracking If true, start tracking. If false, stop tracking.
             * @package
             */
            setTracking(doTracking: boolean): void;
    
            /**
             * Stop tracking this connection, as well as all down-stream connections on
             * any block attached to this connection. This happens when a block is
             * collapsed.
             *
             * Also closes down-stream icons/bubbles.
             * @package
             */
            stopTrackingAll(): void;
    
            /**
             * Start tracking this connection, as well as all down-stream connections on
             * any block attached to this connection. This happens when a block is expanded.
             * @return {!Array.<!Blockly.Block>} List of blocks to render.
             */
            startTrackingAll(): Blockly.Block[];
    
            /**
             * Check if the two connections can be dragged to connect to each other.
             * @param {!Blockly.Connection} candidate A nearby connection to check.
             * @param {number=} maxRadius The maximum radius allowed for connections, in
             *     workspace units.
             * @return {boolean} True if the connection is allowed, false otherwise.
             * @deprecated July 2020
             */
            isConnectionAllowed(candidate: Blockly.Connection, maxRadius?: number): boolean;
    
            /**
             * Behavior after a connection attempt fails.
             * @param {!Blockly.Connection} otherConnection Connection that this connection
             *     failed to connect to.
             * @package
             */
            onFailedConnect(otherConnection: Blockly.Connection): void;
    
            /**
             * Find all nearby compatible connections to this connection.
             * Type checking does not apply, since this function is used for bumping.
             * @param {number} maxLimit The maximum radius to another connection, in
             *     workspace units.
             * @return {!Array.<!Blockly.Connection>} List of connections.
             * @package
             */
            neighbours(maxLimit: number): Blockly.Connection[];
    
            /**
             * Connect two connections together.  This is the connection on the superior
             * block.  Rerender blocks as needed.
             * @param {!Blockly.Connection} childConnection Connection on inferior block.
             * @protected
             */
            connect_(childConnection: Blockly.Connection): void;
    
            /**
             * Function to be called when this connection's compatible types have changed.
             * @protected
             */
            onCheckChanged_(): void;
    } 
    
}

declare module Blockly.RenderedConnection {

    /**
     * Enum for different kinds of tracked states.
     *
     * WILL_TRACK means that this connection will add itself to
     * the db on the next moveTo call it receives.
     *
     * UNTRACKED means that this connection will not add
     * itself to the database until setTracking(true) is explicitly called.
     *
     * TRACKED means that this connection is currently being tracked.
     * @enum {number}
     */
    enum TrackedState { WILL_TRACK, UNTRACKED, TRACKED } 
}
