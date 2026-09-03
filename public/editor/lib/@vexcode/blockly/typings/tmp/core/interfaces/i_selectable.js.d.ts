
declare module Blockly {

    interface ISelectable extends Blockly.IDeletable, Blockly.IMovable {
    
        /**
          * @type {string}
          */
        id: string;
    
        /**
          * Select this.  Highlight it visually.
          * @return {void}
          */
        select(): void;
    
        /**
          * Unselect this.  Unhighlight it visually.
          * @return {void}
          */
        unselect(): void;
    }
}
