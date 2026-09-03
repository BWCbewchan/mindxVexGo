
declare module Blockly {

    class FlyoutButton extends FlyoutButton__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class FlyoutButton__Class  { 
    
            /**
             * Class for a button in the flyout.
             * @param {!Blockly.WorkspaceSvg} workspace The workspace in which to place this
             *     button.
             * @param {!Blockly.WorkspaceSvg} targetWorkspace The flyout's target workspace.
             * @param {!Element} xml The XML specifying the label/button.
             * @param {boolean} isLabel Whether this button should be styled as a label.
             * @constructor
             */
            constructor(workspace: Blockly.WorkspaceSvg, targetWorkspace: Blockly.WorkspaceSvg, xml: Element, isLabel: boolean);
    
            /**
             * The width of the button's rect.
             * @type {number}
             */
            width: number;
    
            /**
             * The height of the button's rect.
             * @type {number}
             */
            height: number;
    
            /**
             * Create the button elements.
             * @return {!SVGElement} The button's SVG group.
             */
            createDom(): SVGElement;
    
            /**
             * Correctly position the flyout button and make it visible.
             */
            show(): void;
    
            /**
             * Move the button to the given x, y coordinates.
             * @param {number} x The new x coordinate.
             * @param {number} y The new y coordinate.
             */
            moveTo(x: number, y: number): void;
    
            /**
             * Location of the button.
             * @return {!Blockly.utils.Coordinate} x, y coordinates.
             * @package
             */
            getPosition(): Blockly.utils.Coordinate;
    
            /**
             * Get the button's target workspace.
             * @return {!Blockly.WorkspaceSvg} The target workspace of the flyout where this
             *     button resides.
             */
            getTargetWorkspace(): Blockly.WorkspaceSvg;
    
            /**
             * Dispose of this button.
             */
            dispose(): void;
    } 
    
}

declare module Blockly.FlyoutButton {

    /**
     * The margin around the text in the button.
     */
    var MARGIN: any /*missing*/;
}
