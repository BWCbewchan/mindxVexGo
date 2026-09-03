
declare module Blockly {

    interface IDeleteArea {
    
        /**
          * Return the deletion rectangle.
          * @return {Blockly.utils.Rect} Rectangle in which to delete.
          */
        getClientRect(): Blockly.utils.Rect;
    }
}
