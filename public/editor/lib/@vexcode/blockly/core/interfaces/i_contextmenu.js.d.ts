
declare module Blockly {

    interface IContextMenu {
    
        /**
          * Show the context menu for this object.
          * @param {!Event} e Mouse event.
          */
        showContextMenu(e: Event): void;
    }
}
