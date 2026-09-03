
declare module Blockly {

    class MonitorIcon extends MonitorIcon__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class MonitorIcon__Class implements Blockly.IDeleteArea  { 
    
            /**
             * Class for a monitor icon.
             * @param {!Blockly.WorkspaceSvg} workspace The workspace to sit in.
             * @constructor
             * @implements {Blockly.IDeleteArea}
             */
            constructor(workspace: Blockly.WorkspaceSvg);
    
            /**
             * Create the monitor icon elements.
             * @return {!SVGElement} The monitor icon's SVG group.
             */
            createDom(): SVGElement;
    
            /**
             * Initialize the trash can.
             * @param {number} _verticalSpacing Vertical distance from workspace edge to the
             *    same edge of the trashcan.
             * @return {number} Vertical distance from workspace edge to the opposite
             *    edge of the trashcan.
             */
            init(_verticalSpacing: number): number;
    
            /**
             * Dispose of this trash can.
             * Unlink from all DOM elements to prevent memory leaks.
             * @suppress {checkTypes}
             */
            dispose(): void;
    
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
             * set the state of the icon.
             * @param {boolean} state True if over icon.
             * @param {boolean} supported True if the block supports monitoring
             * @package
             */
            setState(state: boolean, supported: boolean): void;
    
            /**
             * set the image for the icon
             * @param {string} file the file in the media folder to display
             * @package
             */
            setIcon(file: string): void;
    } 
    
}
