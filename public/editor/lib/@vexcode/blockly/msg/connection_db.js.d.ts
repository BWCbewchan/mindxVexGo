
declare module Blockly {

    class ConnectionDB extends ConnectionDB__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class ConnectionDB__Class  { 
    
            /**
             * Database of connections.
             * Connections are stored in order of their vertical component.  This way
             * connections in an area may be looked up quickly using a binary search.
             * @constructor
             */
            constructor();
    
            /**
             * Add a connection to the database.  Must not already exist in DB.
             * @param {!Blockly.Connection} connection The connection to be added.
             */
            addConnection(connection: Blockly.Connection): void;
    
            /**
             * Find the given connection.
             * Starts by doing a binary search to find the approximate location, then
             *     linearly searches nearby for the exact connection.
             * @param {!Blockly.Connection} conn The connection to find.
             * @return {number} The index of the connection, or -1 if the connection was
             *     not found.
             */
            findConnection(conn: Blockly.Connection): number;
    
            /**
             * Find all nearby connections to the given connection.
             * Type checking does not apply, since this function is used for bumping.
             * @param {!Blockly.Connection} connection The connection whose neighbours
             *     should be returned.
             * @param {number} maxRadius The maximum radius to another connection.
             * @return {!Array.<!Blockly.Connection>} List of connections.
             */
            getNeighbours(connection: Blockly.Connection, maxRadius: number): Blockly.Connection[];
    
            /**
             * Find the closest compatible connection to this connection.
             * @param {!Blockly.Connection} conn The connection searching for a compatible
             *     mate.
             * @param {number} maxRadius The maximum radius to another connection.
             * @param {!Blockly.utils.Coordinate} dxy Offset between this connection's
             *     location in the database and the current location (as a result of
             *     dragging).
             * @return {!{connection: ?Blockly.Connection, radius: number}} Contains two
             *     properties:' connection' which is either another connection or null,
             *     and 'radius' which is the distance.
             */
            searchForClosest(conn: Blockly.Connection, maxRadius: number, dxy: Blockly.utils.Coordinate): { connection: Blockly.Connection; radius: number };
    } 
    
}

declare module Blockly.ConnectionDB {

    /**
     * Initialize a set of connection DBs for a workspace.
     * @return {!Array.<!Blockly.ConnectionDB>} Array of databases.
     */
    function init(): Blockly.ConnectionDB[];
}
