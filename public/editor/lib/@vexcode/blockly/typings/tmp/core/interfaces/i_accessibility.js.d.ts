
declare module Blockly {

    interface IASTNodeLocation {
    }

    interface IASTNodeLocationSvg extends Blockly.IASTNodeLocation {
    
        /**
          * Add the marker svg to this node's svg group.
          * @param {SVGElement} markerSvg The svg root of the marker to be added to the
          *     svg group.
          */
        setMarkerSvg(markerSvg: SVGElement): void;
    
        /**
          * Add the cursor svg to this node's svg group.
          * @param {SVGElement} cursorSvg The svg root of the cursor to be added to the
          *     svg group.
          */
        setCursorSvg(cursorSvg: SVGElement): void;
    }

    interface IASTNodeLocationWithBlock extends Blockly.IASTNodeLocation {
    
        /**
          * Get the source block associated with this node.
          * @return {Blockly.Block} The source block.
          */
        getSourceBlock(): Blockly.Block;
    }

    interface IBlocklyActionable {
    
        /**
          * Handles the given action.
          * @param {!Blockly.Action} action The action to be handled.
          * @return {boolean} True if the action has been handled, false otherwise.
          */
        onBlocklyAction(action: Blockly.Action): boolean;
    }
}
