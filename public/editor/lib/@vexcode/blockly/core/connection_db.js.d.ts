
declare module Blockly {

    class ConnectionDB extends ConnectionDB__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class ConnectionDB__Class  { 
    
            /**
             * Database of connections.
             * Connections are stored in order of their vertical component.  This way
             * connections in an area may be looked up quickly using a binary search.
             * @param {!Blockly.IConnectionChecker} checker The workspace's
             *     connection type checker, used to decide if connections are valid during a
             *     drag.
             * @constructor
             */
            constructor(checker: Blockly.IConnectionChecker);
    
            /**
             * Add a connection to the database. Should not already exist in the database.
             * @param {!Blockly.RenderedConnection} connection The connection to be added.
             * @param {number} yPos The y position used to decide where to insert the
             *    connection.
             * @package
             */
            addConnection(connection: Blockly.RenderedConnection, yPos: number): void;
    
            /**
             * Remove a connection from the database.  Must already exist in DB.
             * @param {!Blockly.RenderedConnection} connection The connection to be removed.
             * @param {number} yPos The y position used to find the index of the connection.
             * @throws {Error} If the connection cannot be found in the database.
             */
            removeConnection(connection: Blockly.RenderedConnection, yPos: number): void;
    
            /**
             * Find all nearby connections to the given connection.
             * Type checking does not apply, since this function is used for bumping.
             * @param {!Blockly.RenderedConnection} connection The connection whose
             *     neighbours should be returned.
             * @param {number} maxRadius The maximum radius to another connection.
             * @return {!Array.<!Blockly.RenderedConnection>} List of connections.
             */
            getNeighbours(connection: Blockly.RenderedConnection, maxRadius: number): Blockly.RenderedConnection[];
    
            /**
             * Find the closest compatible connection to this connection.
             * @param {!Blockly.RenderedConnection} conn The connection searching for a compatible
             *     mate.
             * @param {number} maxRadius The maximum radius to another connection.
             * @param {!Blockly.utils.Coordinate} dxy Offset between this connection's
             *     location in the database and the current location (as a result of
             *     dragging).
             * @return {!{connection: Blockly.RenderedConnection, radius: number}}
             *     Contains two properties: 'connection' which is either another
             *     connection or null, and 'radius' which is the distance.
             */
            searchForClosest(conn: Blockly.RenderedConnection, maxRadius: number, dxy: Blockly.utils.Coordinate): { connection: Blockly.RenderedConnection; radius: number };
    } 
    
}

declare module Blockly.ConnectionDB {

    /**
     * Initialize a set of connection DBs for a workspace.
     * @param {!Blockly.IConnectionChecker} checker The workspace's
     *     connection checker, used to decide if connections are valid during a drag.
     * @return {!Array.<!Blockly.ConnectionDB>} Array of databases.
     */
    function init(checker: Blockly.IConnectionChecker): Blockly.ConnectionDB[];
}
