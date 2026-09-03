
declare module Blockly.Events {

    class CommentBase extends CommentBase__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class CommentBase__Class extends Blockly.Events.Abstract__Class  { 
    
            /**
             * Abstract class for a comment event.
             * @param {!Blockly.WorkspaceComment=} opt_comment The comment this event
             *     corresponds to.  Undefined for a blank event.
             * @extends {Blockly.Events.Abstract}
             * @constructor
             */
            constructor(opt_comment?: Blockly.WorkspaceComment);
    
            /**
             * Whether or not an event is blank.
             * @type {boolean}
             */
            isBlank: boolean;
    
            /**
             * The ID of the comment this event pertains to.
             * @type {string}
             */
            commentId: string;
    
            /**
             * The workspace identifier for this event.
             * @type {string}
             */
            workspaceId: string;
    
            /**
             * The event group id for the group this event belongs to. Groups define
             * events that should be treated as an single action from the user's
             * perspective, and should be undone together.
             * @type {string}
             */
            group: string;
    
            /**
             * Sets whether the event should be added to the undo stack.
             * @type {boolean}
             */
            recordUndo: boolean;
    
            /**
             * Encode the event as JSON.
             * @return {!Object} JSON representation.
             */
            toJson(): Object;
    
            /**
             * Decode the JSON event.
             * @param {!Object} json JSON representation.
             */
            fromJson(json: Object): void;
    } 
    

    class CommentChange extends CommentChange__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class CommentChange__Class extends Blockly.Events.CommentBase__Class  { 
    
            /**
             * Class for a comment change event.
             * @param {!Blockly.WorkspaceComment=} opt_comment The comment that is being
             *     changed.  Undefined for a blank event.
             * @param {string=} opt_oldContents Previous contents of the comment.
             * @param {string=} opt_newContents New contents of the comment.
             * @extends {Blockly.Events.CommentBase}
             * @constructor
             */
            constructor(opt_comment?: Blockly.WorkspaceComment, opt_oldContents?: string, opt_newContents?: string);
    
            /**
             * Type of this event.
             * @type {string}
             */
            type: string;
    
            /**
             * Encode the event as JSON.
             * @return {!Object} JSON representation.
             */
            toJson(): Object;
    
            /**
             * Decode the JSON event.
             * @param {!Object} json JSON representation.
             */
            fromJson(json: Object): void;
    
            /**
             * Does this event record any change of state?
             * @return {boolean} False if something changed.
             */
            isNull(): boolean;
    
            /**
             * Run a change event.
             * @param {boolean} forward True if run forward, false if run backward (undo).
             */
            run(forward: boolean): void;
    } 
    

    class CommentCreate extends CommentCreate__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class CommentCreate__Class extends Blockly.Events.CommentBase__Class  { 
    
            /**
             * Class for a comment creation event.
             * @param {!Blockly.WorkspaceComment=} opt_comment The created comment.
             *     Undefined for a blank event.
             * @extends {Blockly.Events.CommentBase}
             * @constructor
             */
            constructor(opt_comment?: Blockly.WorkspaceComment);
    
            /**
             * Type of this event.
             * @type {string}
             */
            type: string;
    
            /**
             * Encode the event as JSON.
             * @return {!Object} JSON representation.
             */
            toJson(): Object;
    
            /**
             * Decode the JSON event.
             * @param {!Object} json JSON representation.
             */
            fromJson(json: Object): void;
    
            /**
             * Run a creation event.
             * @param {boolean} forward True if run forward, false if run backward (undo).
             */
            run(forward: boolean): void;
    } 
    

    class CommentDelete extends CommentDelete__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class CommentDelete__Class extends Blockly.Events.CommentBase__Class  { 
    
            /**
             * Class for a comment deletion event.
             * @param {!Blockly.WorkspaceComment=} opt_comment The deleted comment.
             *     Undefined for a blank event.
             * @extends {Blockly.Events.CommentBase}
             * @constructor
             */
            constructor(opt_comment?: Blockly.WorkspaceComment);
    
            /**
             * Type of this event.
             * @type {string}
             */
            type: string;
    
            /**
             * Encode the event as JSON.
             * @return {!Object} JSON representation.
             */
            toJson(): Object;
    
            /**
             * Decode the JSON event.
             * @param {!Object} json JSON representation.
             */
            fromJson(json: Object): void;
    
            /**
             * Run a creation event.
             * @param {boolean} forward True if run forward, false if run backward (undo).
             */
            run(forward: boolean): void;
    } 
    

    class CommentMove extends CommentMove__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class CommentMove__Class extends Blockly.Events.CommentBase__Class  { 
    
            /**
             * Class for a comment move event.  Created before the move.
             * @param {!Blockly.WorkspaceComment=} opt_comment The comment that is being
             *     moved.  Undefined for a blank event.
             * @extends {Blockly.Events.CommentBase}
             * @constructor
             */
            constructor(opt_comment?: Blockly.WorkspaceComment);
    
            /**
             * The comment that is being moved.  Will be cleared after recording the new
             * location.
             * @type {Blockly.WorkspaceComment}
             */
            comment_: Blockly.WorkspaceComment;
    
            /**
             * The location before the move, in workspace coordinates.
             * @type {!Blockly.utils.Coordinate}
             */
            oldCoordinate_: Blockly.utils.Coordinate;
    
            /**
             * The location after the move, in workspace coordinates.
             * @type {Blockly.utils.Coordinate}
             */
            newCoordinate_: Blockly.utils.Coordinate;
    
            /**
             * Record the comment's new location.  Called after the move.  Can only be
             * called once.
             */
            recordNew(): void;
    
            /**
             * Type of this event.
             * @type {string}
             */
            type: string;
    
            /**
             * Override the location before the move.  Use this if you don't create the
             * event until the end of the move, but you know the original location.
             * @param {!Blockly.utils.Coordinate} xy The location before the move,
             *     in workspace coordinates.
             */
            setOldCoordinate(xy: Blockly.utils.Coordinate): void;
    
            /**
             * Encode the event as JSON.
             * @return {!Object} JSON representation.
             */
            toJson(): Object;
    
            /**
             * Decode the JSON event.
             * @param {!Object} json JSON representation.
             */
            fromJson(json: Object): void;
    
            /**
             * Does this event record any change of state?
             * @return {boolean} False if something changed.
             */
            isNull(): boolean;
    
            /**
             * Run a move event.
             * @param {boolean} forward True if run forward, false if run backward (undo).
             */
            run(forward: boolean): void;
    } 
    

    /**
     * Helper function for Comment[Create|Delete]
     * @param {!Blockly.Events.CommentCreate|!Blockly.Events.CommentDelete} event
     *     The event to run.
     * @param {boolean} create if True then Create, if False then Delete
     */
    function CommentCreateDeleteHelper(event: Blockly.Events.CommentCreate|Blockly.Events.CommentDelete, create: boolean): void;
}
