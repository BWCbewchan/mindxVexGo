
declare module Blockly {

    class Action extends Action__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Action__Class  { 
    
            /**
             * Class for a single action.
             * An action describes user intent. (ex go to next or go to previous)
             * @param {string} name The name of the action.
             * @param {string} desc The description of the action.
             * @constructor
             */
            constructor(name: string, desc: string);
    } 
    
}
