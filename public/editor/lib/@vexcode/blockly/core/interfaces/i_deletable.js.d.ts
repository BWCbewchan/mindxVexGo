
declare module Blockly {

    interface IDeletable {
    
        /**
          * Get whether this object is deletable or not.
          * @return {boolean} True if deletable.
          */
        isDeletable(): boolean;
    }
}
