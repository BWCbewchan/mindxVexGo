
declare module Blockly {

    class FlyoutButton extends FlyoutButton__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class FlyoutButton__Class  { 
    
            /**
             * Class for a button in the flyout.
             * @param {!Blockly.WorkspaceSvg} workspace The workspace in which to place this
             *     button.
             * @param {!Blockly.WorkspaceSvg} targetWorkspace The flyout's target workspace.
             * @param {!Blockly.utils.toolbox.ButtonOrLabelInfo} json
             *    The JSON specifying the label/button.
             * @param {boolean} isLabel Whether this button should be styled as a label.
             * @constructor
             * @package
             */
            constructor(workspace: Blockly.WorkspaceSvg, targetWorkspace: Blockly.WorkspaceSvg, json: Blockly.utils.toolbox.ButtonOrLabelInfo, isLabel: boolean);
    
            /**
             * The JSON specifying the label / button.
             * @type {!Blockly.utils.toolbox.ButtonOrLabelInfo}
             */
            info: Blockly.utils.toolbox.ButtonOrLabelInfo;
    
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
             * @return {boolean} Whether or not the button is a label.
             */
            isLabel(): boolean;
    
            /**
             * Location of the button.
             * @return {!Blockly.utils.Coordinate} x, y coordinates.
             * @package
             */
            getPosition(): Blockly.utils.Coordinate;
    
            /**
             * @return {string} Text of the button.
             */
            getButtonText(): string;
    
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
    
            /**
             * Get whether this button is a label at the top of a category.
             * @return {boolean} True if it is a category label.
             * @package
             */
            getIsCategoryLabel(): boolean;
    } 
    
}

declare module Blockly.FlyoutButton {

    /**
     * The horizontal margin around the text in the button.
     */
    var MARGIN_X: any /*missing*/;

    /**
     * The vertical margin around the text in the button.
     */
    var MARGIN_Y: any /*missing*/;

    /**
     * The minimum height of a button
     */
    var MIN_HEIGHT: any /*missing*/;
}
