
declare module Blockly {

    class ASTNode extends ASTNode__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class ASTNode__Class  { 
    
            /**
             * Class for an AST node.
             * It is recommended that you use one of the createNode methods instead of
             * creating a node directly.
             * @param {string} type The type of the location.
             *     Must be in Blockly.ASTNode.types.
             * @param {!Blockly.IASTNodeLocation} location The position in the AST.
             * @param {!Blockly.ASTNode.Params=} opt_params Optional dictionary of options.
             * @constructor
             */
            constructor(type: string, location: Blockly.IASTNodeLocation, opt_params?: Blockly.ASTNode.Params);
    
            /**
             * Gets the value pointed to by this node.
             * It is the callers responsibility to check the node type to figure out what
             * type of object they get back from this.
             * @return {!Blockly.IASTNodeLocation} The current field, connection, workspace, or
             *     block the cursor is on.
             */
            getLocation(): Blockly.IASTNodeLocation;
    
            /**
             * The type of the current location.
             * One of Blockly.ASTNode.types
             * @return {string} The type of the location.
             */
            getType(): string;
    
            /**
             * The coordinate on the workspace.
             * @return {Blockly.utils.Coordinate} The workspace coordinate or null if the
             *     location is not a workspace.
             */
            getWsCoordinate(): Blockly.utils.Coordinate;
    
            /**
             * Whether the node points to a connection.
             * @return {boolean} [description]
             * @package
             */
            isConnection(): boolean;
    
            /**
             * Finds the source block of the location of this node.
             * @return {Blockly.Block} The source block of the location, or null if the node
             * is of type workspace.
             */
            getSourceBlock(): Blockly.Block;
    
            /**
             * Find the element to the right of the current element in the AST.
             * @return {Blockly.ASTNode} An AST node that wraps the next field, connection,
             *     block, or workspace. Or null if there is no node to the right.
             */
            next(): Blockly.ASTNode;
    
            /**
             * Find the element one level below and all the way to the left of the current
             * location.
             * @return {Blockly.ASTNode} An AST node that wraps the next field, connection,
             * workspace, or block. Or null if there is nothing below this node.
             */
            in(): Blockly.ASTNode;
    
            /**
             * Find the element to the left of the current element in the AST.
             * @return {Blockly.ASTNode} An AST node that wraps the previous field,
             * connection, workspace or block. Or null if no node exists to the left.
             * null.
             */
            prev(): Blockly.ASTNode;
    
            /**
             * Find the next element that is one position above and all the way to the left
             * of the current location.
             * @return {Blockly.ASTNode} An AST node that wraps the next field, connection,
             *     workspace or block. Or null if we are at the workspace level.
             */
            out(): Blockly.ASTNode;
    } 
    
}

declare module Blockly.ASTNode {

    /**
     * @typedef {{
     *     wsCoordinate: Blockly.utils.Coordinate
     * }}
     */
    interface Params {
        wsCoordinate: Blockly.utils.Coordinate
    }

    /**
     * Object holding different types for an AST node.
     * @enum {string}
     */
    enum types { FIELD, BLOCK, INPUT, OUTPUT, NEXT, PREVIOUS, STACK, WORKSPACE } 

    /**
     * True to navigate to all fields. False to only navigate to clickable fields.
     * @type {boolean}
     */
    var NAVIGATE_ALL_FIELDS: boolean;

    /**
     * Create an AST node pointing to a field.
     * @param {Blockly.Field} field The location of the AST node.
     * @return {Blockly.ASTNode} An AST node pointing to a field.
     */
    function createFieldNode(field: Blockly.Field): Blockly.ASTNode;

    /**
     * Creates an AST node pointing to a connection. If the connection has a parent
     * input then create an AST node of type input that will hold the connection.
     * @param {Blockly.Connection} connection This is the connection the node will
     *     point to.
     * @return {Blockly.ASTNode} An AST node pointing to a connection.
     */
    function createConnectionNode(connection: Blockly.Connection): Blockly.ASTNode;

    /**
     * Creates an AST node pointing to an input. Stores the input connection as the
     *     location.
     * @param {Blockly.Input} input The input used to create an AST node.
     * @return {Blockly.ASTNode} An AST node pointing to a input.
     */
    function createInputNode(input: Blockly.Input): Blockly.ASTNode;

    /**
     * Creates an AST node pointing to a block.
     * @param {Blockly.Block} block The block used to create an AST node.
     * @return {Blockly.ASTNode} An AST node pointing to a block.
     */
    function createBlockNode(block: Blockly.Block): Blockly.ASTNode;

    /**
     * Create an AST node of type stack. A stack, represented by its top block, is
     *     the set of all blocks connected to a top block, including the top block.
     * @param {Blockly.Block} topBlock A top block has no parent and can be found
     *     in the list returned by workspace.getTopBlocks().
     * @return {Blockly.ASTNode} An AST node of type stack that points to the top
     *     block on the stack.
     */
    function createStackNode(topBlock: Blockly.Block): Blockly.ASTNode;

    /**
     * Creates an AST node pointing to a workspace.
     * @param {!Blockly.Workspace} workspace The workspace that we are on.
     * @param {Blockly.utils.Coordinate} wsCoordinate The position on the workspace
     *     for this node.
     * @return {Blockly.ASTNode} An AST node pointing to a workspace and a position
     *     on the workspace.
     */
    function createWorkspaceNode(workspace: Blockly.Workspace, wsCoordinate: Blockly.utils.Coordinate): Blockly.ASTNode;

    /**
     * Creates an AST node for the top position on a block.
     * This is either an output connection, previous connection, or block.
     * @param {!Blockly.Block} block The block to find the top most AST node on.
     * @return {Blockly.ASTNode} The AST node holding the top most position on the
     *     block.
     */
    function createTopNode(block: Blockly.Block): Blockly.ASTNode;
}
