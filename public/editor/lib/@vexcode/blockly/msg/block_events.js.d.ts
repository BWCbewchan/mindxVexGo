
declare module Blockly.Events {

    class BlockBase extends BlockBase__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class BlockBase__Class extends Blockly.Events.Abstract__Class  { 
    
            /**
             * Abstract class for a block event.
             * @param {Blockly.Block} block The block this event corresponds to.
             * @extends {Blockly.Events.Abstract}
             * @constructor
             */
            constructor(block: Blockly.Block);
    
            /**
             * The block id for the block this event pertains to
             * @type {string}
             */
            blockId: string;
    
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
    

    class Change extends Change__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Change__Class extends Blockly.Events.BlockBase__Class  { 
    
            /**
             * Class for a block change event.
             * @param {Blockly.Block} block The changed block.  Null for a blank event.
             * @param {string} element One of 'field', 'comment', 'disabled', etc.
             * @param {?string} name Name of input or field affected, or null.
             * @param {*} oldValue Previous value of element.
             * @param {*} newValue New value of element.
             * @extends {Blockly.Events.BlockBase}
             * @constructor
             */
            constructor(block: Blockly.Block, element: string, name: string, oldValue: any, newValue: any);
    
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
    

    class BlockChange extends BlockChange__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class BlockChange__Class extends Blockly.Events.BlockBase__Class  { 
    
            /**
             * Class for a block change event.
             * @param {Blockly.Block} block The changed block.  Null for a blank event.
             * @param {string} element One of 'field', 'comment', 'disabled', etc.
             * @param {?string} name Name of input or field affected, or null.
             * @param {*} oldValue Previous value of element.
             * @param {*} newValue New value of element.
             * @extends {Blockly.Events.BlockBase}
             * @constructor
             */
            constructor(block: Blockly.Block, element: string, name: string, oldValue: any, newValue: any);
    } 
    

    class Create extends Create__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Create__Class extends Blockly.Events.BlockBase__Class  { 
    
            /**
             * Class for a block creation event.
             * @param {Blockly.Block} block The created block.  Null for a blank event.
             * @extends {Blockly.Events.BlockBase}
             * @constructor
             */
            constructor(block: Blockly.Block);
    
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
    

    class BlockCreate extends BlockCreate__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class BlockCreate__Class extends Blockly.Events.BlockBase__Class  { 
    
            /**
             * Class for a block creation event.
             * @param {Blockly.Block} block The created block. Null for a blank event.
             * @extends {Blockly.Events.BlockBase}
             * @constructor
             */
            constructor(block: Blockly.Block);
    } 
    

    class Delete extends Delete__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Delete__Class extends Blockly.Events.BlockBase__Class  { 
    
            /**
             * Class for a block deletion event.
             * @param {Blockly.Block} block The deleted block.  Null for a blank event.
             * @extends {Blockly.Events.BlockBase}
             * @constructor
             */
            constructor(block: Blockly.Block);
    
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
             * Run a deletion event.
             * @param {boolean} forward True if run forward, false if run backward (undo).
             */
            run(forward: boolean): void;
    } 
    

    class BlockDelete extends BlockDelete__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class BlockDelete__Class extends Blockly.Events.BlockBase__Class  { 
    
            /**
             * Class for a block deletion event.
             * @param {Blockly.Block} block The deleted block.  Null for a blank event.
             * @extends {Blockly.Events.BlockBase}
             * @constructor
             */
            constructor(block: Blockly.Block);
    } 
    

    class Move extends Move__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Move__Class extends Blockly.Events.BlockBase__Class  { 
    
            /**
             * Class for a block move event.  Created before the move.
             * @param {Blockly.Block} block The moved block.  Null for a blank event.
             * @extends {Blockly.Events.BlockBase}
             * @constructor
             */
            constructor(block: Blockly.Block);
    
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
             * Record the block's new location.  Called after the move.
             */
            recordNew(): void;
    
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
    

    class BlockMove extends BlockMove__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class BlockMove__Class extends Blockly.Events.BlockBase__Class  { 
    
            /**
             * Class for a block move event.  Created before the move.
             * @param {Blockly.Block} block The moved block.  Null for a blank event.
             * @extends {Blockly.Events.BlockBase}
             * @constructor
             */
            constructor(block: Blockly.Block);
    } 
    
}
