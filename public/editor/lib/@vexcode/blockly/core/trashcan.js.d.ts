
declare module Blockly {

    class Trashcan extends Trashcan__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Trashcan__Class implements Blockly.IDeleteArea  { 
    
            /**
             * Class for a trash can.
             * @param {!Blockly.WorkspaceSvg} workspace The workspace to sit in.
             * @constructor
             * @implements {Blockly.IDeleteArea}
             */
            constructor(workspace: Blockly.WorkspaceSvg);
    
            /**
             * The trashcan flyout.
             * @type {Blockly.IFlyout}
             * @package
             */
            flyout: Blockly.IFlyout;
    
            /**
             * Current open/close state of the lid.
             * @type {boolean}
             */
            isLidOpen: boolean;
    
            /**
             * Create the trash can elements.
             * @return {!SVGElement} The trash can's SVG group.
             */
            createDom(): SVGElement;
    
            /**
             * Initialize the trash can.
             * @param {number} verticalSpacing Vertical distance from workspace edge to the
             *    same edge of the trashcan.
             * @return {number} Vertical distance from workspace edge to the opposite
             *    edge of the trashcan.
             */
            init(verticalSpacing: number): number;
    
            /**
             * Dispose of this trash can.
             * Unlink from all DOM elements to prevent memory leaks.
             * @suppress {checkTypes}
             */
            dispose(): void;
    
            /**
             * Returns true if the trashcan contents-flyout is currently open.
             * @return {boolean} True if the trashcan contents-flyout is currently open.
             */
            contentsIsOpen(): boolean;
    
            /**
             * Opens the trashcan flyout.
             */
            openFlyout(): void;
    
            /**
             * Closes the trashcan flyout.
             */
            closeFlyout(): void;
    
            /**
             * Empties the trashcan's contents. If the contents-flyout is currently open
             * it will be closed.
             */
            emptyContents(): void;
    
            /**
             * Position the trashcan.
             * It is positioned in the opposite corner to the corner the
             * categories/toolbox starts at.
             */
            position(): void;
    
            /**
             * Return the deletion rectangle for this trash can.
             * @return {Blockly.utils.Rect} Rectangle in which to delete.
             */
            getClientRect(): Blockly.utils.Rect;
    
            /**
             * Flip the lid open or shut.
             * @param {boolean} state True if open.
             * @package
             */
            setLidOpen(state: boolean): void;
    
            /**
             * Flip the lid shut.
             * Called externally after a drag.
             */
            closeLid(): void;
    
            /**
             * Inspect the contents of the trash.
             */
            click(): void;
    } 
    
}
