
declare module Blockly {

    interface IStyleable {
    
        /**
          * Adds a style on the toolbox. Usually used to change the cursor.
          * @param {string} style The name of the class to add.
          */
        addStyle(style: string): void;
    
        /**
          * Removes a style from the toolbox. Usually used to change the cursor.
          * @param {string} style The name of the class to remove.
          */
        removeStyle(style: string): void;
    }
}
