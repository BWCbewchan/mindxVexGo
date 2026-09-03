
declare module Blockly {

    class Toolbox extends Toolbox__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Toolbox__Class  { 
    
            /**
             * Class for a Toolbox.
             * Creates the toolbox's DOM.
             * @param {!Blockly.WorkspaceSvg} workspace The workspace in which to create new
             *     blocks.
             * @constructor
             */
            constructor(workspace: Blockly.WorkspaceSvg);
    
            /**
             * Is RTL vs LTR.
             * @type {boolean}
             */
            RTL: boolean;
    
            /**
             * Position of the toolbox and flyout relative to the workspace.
             * @type {number}
             */
            toolboxPosition: number;
    
            /**
             * Width of the toolbox, which changes only in vertical layout.
             * @type {number}
             */
            width: number;
    
            /**
             * Height of the toolbox, which changes only in horizontal layout.
             * @type {number}
             */
            height: number;
    
            /**
             * Initializes the toolbox.
             */
            init(): void;
    
            /**
             * HTML container for the Toolbox menu.
             * @type {Element}
             */
            HtmlDiv: Element;
    
            /**
             * Fill the toolbox with categories and blocks.
             * @param {!Node} languageTree DOM tree of blocks.
             * @package
             */
            renderTree(languageTree: Node): void;
    
            /**
             * Handles the given Blockly action on a toolbox.
             * This is only triggered when keyboard accessibility mode is enabled.
             * @param {!Blockly.Action} action The action to be handled.
             * @return {boolean} True if the field handled the action, false otherwise.
             * @package
             */
            onBlocklyAction(action: Blockly.Action): boolean;
    
            /**
             * Dispose of this toolbox.
             */
            dispose(): void;
    
            /**
             * Get the width of the toolbox.
             * @return {number} The width of the toolbox.
             */
            getWidth(): number;
    
            /**
             * Get the height of the toolbox.
             * @return {number} The width of the toolbox.
             */
            getHeight(): number;
    
            /**
             * Move the toolbox to the edge.
             */
            position(): void;
    
            /**
             * Retrieves and sets the colour for the category using the style name.
             * The category colour is set from the colour style attribute.
             * @param {string} styleName Name of the style.
             * @param {!Blockly.tree.TreeNode} childOut The child to set the hexColour on.
             * @param {string} categoryName Name of the toolbox category.
             */
            setColourFromStyle_(styleName: string, childOut: Blockly.tree.TreeNode, categoryName: string): void;
    
            /**
             * Updates the category colours and background colour of selected categories.
             * @package
             */
            updateColourFromTheme(): void;
    
            /**
             * Unhighlight any previously specified option.
             */
            clearSelection(): void;
    
            /**
             * Adds a style on the toolbox. Usually used to change the cursor.
             * @param {string} style The name of the class to add.
             * @package
             */
            addStyle(style: string): void;
    
            /**
             * Removes a style from the toolbox. Usually used to change the cursor.
             * @param {string} style The name of the class to remove.
             * @package
             */
            removeStyle(style: string): void;
    
            /**
             * Return the deletion rectangle for this toolbox.
             * @return {Blockly.utils.Rect} Rectangle in which to delete.
             */
            getClientRect(): Blockly.utils.Rect;
    
            /**
             * Update the flyout's contents without closing it.  Should be used in response
             * to a change in one of the dynamic categories, such as variables or
             * procedures.
             */
            refreshSelection(): void;
    
            /**
             * Select the first toolbox category if no category is selected.
             * @package
             */
            selectFirstCategory(): void;
    } 
    
}

declare module Blockly.Toolbox {

    class TreeSeparator extends TreeSeparator__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class TreeSeparator__Class extends Blockly.tree.TreeNode__Class  { 
    
            /**
             * A blank separator node in the tree.
             * @param {!Blockly.tree.BaseNode.Config} config The configuration for the tree.
             * @constructor
             * @extends {Blockly.tree.TreeNode}
             */
            constructor(config: Blockly.tree.BaseNode.Config);
    } 
    
}
