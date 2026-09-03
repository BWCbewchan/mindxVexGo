
declare module Blockly.Events {

    class Abstract extends Abstract__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Abstract__Class  { 
    
            /**
             * Abstract class for an event.
             * @constructor
             */
            constructor();
    
            /**
             * Whether or not the event is blank (to be populated by fromJson).
             * @type {?boolean}
             */
            isBlank: boolean;
    
            /**
             * The workspace identifier for this event.
             * @type {string|undefined}
             */
            workspaceId: string|any /*undefined*/;
    
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
    
            /**
             * Does this event record any change of state?
             * @return {boolean} True if null, false if something changed.
             */
            isNull(): boolean;
    
            /**
             * Run an event.
             * @param {boolean} _forward True if run forward, false if run backward (undo).
             */
            run(_forward: boolean): void;
    
            /**
             * Get workspace the event belongs to.
             * @return {!Blockly.Workspace} The workspace the event belongs to.
             * @throws {Error} if workspace is null.
             * @protected
             */
            getEventWorkspace_(): Blockly.Workspace;
    } 
    
}
