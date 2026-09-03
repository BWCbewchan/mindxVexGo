
declare module Blockly.Events {

    class FinishedLoading extends FinishedLoading__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class FinishedLoading__Class extends Blockly.Events.Ui__Class  { 
    
            /**
             * Class for a finished loading event.
             * Used to notify the developer when the workspace has finished loading (i.e
             * domToWorkspace).
             * Finished loading events do not record undo or redo.
             * @param {!Blockly.Workspace=} opt_workspace The workspace that has finished
             *    loading.  Undefined for a blank event.
             * @extends {Blockly.Events.Ui}
             * @constructor
             */
            constructor(opt_workspace?: Blockly.Workspace);
    
            /**
             * Whether or not the event is blank (to be populated by fromJson).
             * @type {boolean}
             */
            isBlank: boolean;
    
            /**
             * The workspace identifier for this event.
             * @type {string}
             */
            workspaceId: string;
    
            /**
             * The event group ID for the group this event belongs to. Groups define
             * events that should be treated as an single action from the user's
             * perspective, and should be undone together.
             * @type {string}
             */
            group: string;
    
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
    } 
    
}
