
declare module Blockly.Events {

    class Monitor extends Monitor__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Monitor__Class extends Blockly.Events.Abstract__Class  { 
    
            /**
             * Class for a UI event.
             * UI events are events that don't need to be sent over the wire for multi-user
             * editing to work (e.g. scrolling the workspace, zooming, opening toolbox
             * categories).
             * UI events do not undo or redo.
             * @param {?Blockly.Block=} opt_block The affected block.  Null for UI events
             *     that do not have an associated block.  Undefined for a blank event.
             * @param {string=} opt_element One of 'selected', 'comment', 'mutatorOpen',
             *     etc.
             * @param {*=} opt_oldValue Previous value of element.
             * @param {*=} opt_newValue New value of element.
             * @extends {Blockly.Events.Abstract}
             * @constructor
             */
            constructor(opt_block?: Blockly.Block);
    
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
