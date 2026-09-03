
declare module Blockly {

    class Connection extends Connection__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Connection__Class implements Blockly.IASTNodeLocationWithBlock  { 
    
            /**
             * Class for a connection between blocks.
             * @param {!Blockly.Block} source The block establishing this connection.
             * @param {number} type The type of the connection.
             * @constructor
             * @implements {Blockly.IASTNodeLocationWithBlock}
             */
            constructor(source: Blockly.Block, type: number);
    
            /**
             * @type {!Blockly.Block}
             * @protected
             */
            sourceBlock_: Blockly.Block;
    
            /** @type {number} */
            type: number;
    
            /**
             * Connection this connection connects to.  Null if not connected.
             * @type {Blockly.Connection}
             */
            targetConnection: Blockly.Connection;
    
            /**
             * Has this connection been disposed of?
             * @type {boolean}
             * @package
             */
            disposed: boolean;
    
            /**
             * Horizontal location of this connection.
             * @type {number}
             * @package
             */
            x: number;
    
            /**
             * Vertical location of this connection.
             * @type {number}
             * @package
             */
            y: number;
    
            /**
             * Connect two connections together.  This is the connection on the superior
             * block.
             * @param {!Blockly.Connection} childConnection Connection on inferior block.
             * @protected
             */
            connect_(childConnection: Blockly.Connection): void;
    
            /**
             * Dispose of this connection and deal with connected blocks.
             * @package
             */
            dispose(): void;
    
            /**
             * Get the source block for this connection.
             * @return {!Blockly.Block} The source block.
             */
            getSourceBlock(): Blockly.Block;
    
            /**
             * Does the connection belong to a superior block (higher in the source stack)?
             * @return {boolean} True if connection faces down or right.
             */
            isSuperior(): boolean;
    
            /**
             * Is the connection connected?
             * @return {boolean} True if connection is connected to another connection.
             */
            isConnected(): boolean;
    
            /**
             * Checks whether the current connection can connect with the target
             * connection.
             * @param {Blockly.Connection} target Connection to check compatibility with.
             * @return {number} Blockly.Connection.CAN_CONNECT if the connection is legal,
             *    an error code otherwise.
             * @deprecated July 2020. Will be deleted July 2021. Use the workspace's
             *     connectionChecker instead.
             */
            canConnectWithReason(target: Blockly.Connection): number;
    
            /**
             * Checks whether the current connection and target connection are compatible
             * and throws an exception if they are not.
             * @param {Blockly.Connection} target The connection to check compatibility
             *    with.
             * @package
             * @deprecated July 2020. Will be deleted July 2021. Use the workspace's
             *     connectionChecker instead.
             */
            checkConnection(target: Blockly.Connection): void;
    
            /**
             * Get the workspace's connection type checker object.
             * @return {!Blockly.IConnectionChecker} The connection type checker for the
             *     source block's workspace.
             * @package
             */
            getConnectionChecker(): Blockly.IConnectionChecker;
    
            /**
             * Check if the two connections can be dragged to connect to each other.
             * @param {!Blockly.Connection} candidate A nearby connection to check.
             * @return {boolean} True if the connection is allowed, false otherwise.
             * @deprecated July 2020. Will be deleted July 2021. Use the workspace's
             *     connectionChecker instead.
             */
            isConnectionAllowed(candidate: Blockly.Connection): boolean;
    
            /**
             * Behavior after a connection attempt fails.
             * @param {!Blockly.Connection} _otherConnection Connection that this connection
             *     failed to connect to.
             * @package
             */
            onFailedConnect(_otherConnection: Blockly.Connection): void;
    
            /**
             * Connect this connection to another connection.
             * @param {!Blockly.Connection} otherConnection Connection to connect to.
             */
            connect(otherConnection: Blockly.Connection): void;
    
            /**
             * Disconnect this connection.
             */
            disconnect(): void;
    
            /**
             * Disconnect two blocks that are connected by this connection.
             * @param {!Blockly.Block} parentBlock The superior block.
             * @param {!Blockly.Block} childBlock The inferior block.
             * @protected
             */
            disconnectInternal_(parentBlock: Blockly.Block, childBlock: Blockly.Block): void;
    
            /**
             * Respawn the shadow block if there was one connected to the this connection.
             * @protected
             */
            respawnShadow_(): void;
    
            /**
             * Returns the block that this connection connects to.
             * @return {Blockly.Block} The connected block or null if none is connected.
             */
            targetBlock(): Blockly.Block;
    
            /**
             * Is this connection compatible with another connection with respect to the
             * value type system.  E.g. square_root("Hello") is not compatible.
             * @param {!Blockly.Connection} otherConnection Connection to compare against.
             * @return {boolean} True if the connections share a type.
             * @deprecated July 2020. Will be deleted July 2021. Use the workspace's
             *     connectionChecker instead.
             */
            checkType(otherConnection: Blockly.Connection): boolean;
    
            /**
             * Function to be called when this connection's compatible types have changed.
             * @protected
             */
            onCheckChanged_(): void;
    
            /**
             * Change a connection's compatibility.
             * @param {?(string|!Array.<string>)} check Compatible value type or list of
             *     value types. Null if all types are compatible.
             * @return {!Blockly.Connection} The connection being modified
             *     (to allow chaining).
             */
            setCheck(check: string|string[]): Blockly.Connection;
    
            /**
             * Get a connection's compatibility.
             * @return {Array} List of compatible value types.
             *     Null if all types are compatible.
             * @public
             */
            getCheck(): any[];
    
            /**
             * Changes the connection's shadow block.
             * @param {Element} shadow DOM representation of a block or null.
             */
            setShadowDom(shadow: Element): void;
    
            /**
             * Returns the xml representation of the connection's shadow block.
             * @return {Element} Shadow DOM representation of a block or null.
             */
            getShadowDom(): Element;
    
            /**
             * Find all nearby compatible connections to this connection.
             * Type checking does not apply, since this function is used for bumping.
             *
             * Headless configurations (the default) do not have neighboring connection,
             * and always return an empty list (the default).
             * {@link Blockly.RenderedConnection} overrides this behavior with a list
             * computed from the rendered positioning.
             * @param {number} _maxLimit The maximum radius to another connection.
             * @return {!Array.<!Blockly.Connection>} List of connections.
             * @package
             */
            neighbours(_maxLimit: number): Blockly.Connection[];
    
            /**
             * Get the parent input of a connection.
             * @return {Blockly.Input} The input that the connection belongs to or null if
             *     no parent exists.
             * @package
             */
            getParentInput(): Blockly.Input;
    
            /**
             * This method returns a string describing this Connection in developer terms
             * (English only). Intended to on be used in console logs and errors.
             * @return {string} The description.
             */
            toString(): string;
    } 
    
}

declare module Blockly.Connection {

    /**
     * Constants for checking whether two connections are compatible.
     */
    var CAN_CONNECT: any /*missing*/;

    /**
     * Walks down a row a blocks, at each stage checking if there are any
     * connections that will accept the orphaned block.  If at any point there
     * are zero or multiple eligible connections, returns null.  Otherwise
     * returns the only input on the last block in the chain.
     * Terminates early for shadow blocks.
     * @param {!Blockly.Block} startBlock The block on which to start the search.
     * @param {!Blockly.Block} orphanBlock The block that is looking for a home.
     * @return {Blockly.Connection} The suitable connection point on the chain
     *     of blocks, or null.
     * @package
     */
    function lastConnectionInRow(startBlock: Blockly.Block, orphanBlock: Blockly.Block): Blockly.Connection;
}
