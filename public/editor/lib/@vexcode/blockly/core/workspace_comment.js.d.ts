
declare module Blockly {

    class WorkspaceComment extends WorkspaceComment__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class WorkspaceComment__Class  { 
    
            /**
             * Class for a workspace comment.
             * @param {!Blockly.Workspace} workspace The block's workspace.
             * @param {string} content The content of this workspace comment.
             * @param {number} height Height of the comment.
             * @param {number} width Width of the comment.
             * @param {string=} opt_id Optional ID.  Use this ID if provided, otherwise
             *     create a new ID.
             * @constructor
             */
            constructor(workspace: Blockly.Workspace, content: string, height: number, width: number, opt_id?: string);
    
            /** @type {string} */
            id: string;
    
            /**
             * The comment's position in workspace units.  (0, 0) is at the workspace's
             * origin; scale does not change this value.
             * @type {!Blockly.utils.Coordinate}
             * @protected
             */
            xy_: Blockly.utils.Coordinate;
    
            /**
             * @type {!Blockly.Workspace}
             */
            workspace: Blockly.Workspace;
    
            /**
             * @protected
             * @type {boolean}
             */
            RTL: boolean;
    
            /**
             * @protected
             * @type {string}
             */
            content_: string;
    
            /**
             * @package
             * @type {boolean}
             */
            isComment: boolean;
    
            /**
             * Dispose of this comment.
             * @package
             */
            dispose(): void;
    
            /**
             * Get comment height.
             * @return {number} Comment height.
             * @package
             */
            getHeight(): number;
    
            /**
             * Set comment height.
             * @param {number} height Comment height.
             * @package
             */
            setHeight(height: number): void;
    
            /**
             * Get comment width.
             * @return {number} Comment width.
             * @package
             */
            getWidth(): number;
    
            /**
             * Set comment width.
             * @param {number} width comment width.
             * @package
             */
            setWidth(width: number): void;
    
            /**
             * Get stored location.
             * @return {!Blockly.utils.Coordinate} The comment's stored location.
             *   This is not valid if the comment is currently being dragged.
             * @package
             */
            getXY(): Blockly.utils.Coordinate;
    
            /**
             * Move a comment by a relative offset.
             * @param {number} dx Horizontal offset, in workspace units.
             * @param {number} dy Vertical offset, in workspace units.
             * @package
             */
            moveBy(dx: number, dy: number): void;
    
            /**
             * Get whether this comment is deletable or not.
             * @return {boolean} True if deletable.
             * @package
             */
            isDeletable(): boolean;
    
            /**
             * Set whether this comment is deletable or not.
             * @param {boolean} deletable True if deletable.
             * @package
             */
            setDeletable(deletable: boolean): void;
    
            /**
             * Get whether this comment is movable or not.
             * @return {boolean} True if movable.
             * @package
             */
            isMovable(): boolean;
    
            /**
             * Set whether this comment is movable or not.
             * @param {boolean} movable True if movable.
             * @package
             */
            setMovable(movable: boolean): void;
    
            /**
             * Get whether this comment is editable or not.
             * @return {boolean} True if editable.
             */
            isEditable(): boolean;
    
            /**
             * Set whether this comment is editable or not.
             * @param {boolean} editable True if editable.
             */
            setEditable(editable: boolean): void;
    
            /**
             * Returns this comment's text.
             * @return {string} Comment text.
             * @package
             */
            getContent(): string;
    
            /**
             * Set this comment's content.
             * @param {string} content Comment content.
             * @package
             */
            setContent(content: string): void;
    
            /**
             * Encode a comment subtree as XML with XY coordinates.
             * @param {boolean=} opt_noId True if the encoder should skip the comment ID.
             * @return {!Element} Tree of XML elements.
             * @package
             */
            toXmlWithXY(opt_noId?: boolean): Element;
    
            /**
             * Encode a comment subtree as XML, but don't serialize the XY coordinates.
             * This method avoids some expensive metrics-related calls that are made in
             * toXmlWithXY().
             * @param {boolean=} opt_noId True if the encoder should skip the comment ID.
             * @return {!Element} Tree of XML elements.
             * @package
             */
            toXml(opt_noId?: boolean): Element;
    } 
    
}

declare module Blockly.WorkspaceComment {

    /**
     * Fire a create event for the given workspace comment, if comments are enabled.
     * @param {!Blockly.WorkspaceComment} comment The comment that was just created.
     * @package
     */
    function fireCreateEvent(comment: Blockly.WorkspaceComment): void;

    /**
     * Decode an XML comment tag and create a comment on the workspace.
     * @param {!Element} xmlComment XML comment element.
     * @param {!Blockly.Workspace} workspace The workspace.
     * @return {!Blockly.WorkspaceComment} The created workspace comment.
     * @package
     */
    function fromXml(xmlComment: Element, workspace: Blockly.Workspace): Blockly.WorkspaceComment;

    /**
     * Decode an XML comment tag and return the results in an object.
     * @param {!Element} xml XML comment element.
     * @return {{w: number, h: number, x: number, y: number, content: string}} An
     *     object containing the id, size, position, and comment string.
     * @package
     */
    function parseAttributes(xml: Element): { w: number; h: number; x: number; y: number; content: string };
}
