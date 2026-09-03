
declare module Blockly {

    class Theme extends Theme__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Theme__Class  { 
    
            /**
             * Class for a theme.
             * @param {!Object.<string, Blockly.Theme.BlockStyle>} blockStyles A map from
             *     style names (strings) to objects with style attributes for blocks.
             * @param {!Object.<string, Blockly.Theme.CategoryStyle>} categoryStyles A map
             *     from style names (strings) to objects with style attributes for
             *     categories.
             * @param {!Object.<string, *>=} opt_componentStyles A map of Blockly component
             *     names to style value.
             * @constructor
             */
            constructor(blockStyles: { [key: string]: Blockly.Theme.BlockStyle }, categoryStyles: { [key: string]: Blockly.Theme.CategoryStyle }, opt_componentStyles?: { [key: string]: any });
    
            /**
             * The block styles map.
             * @type {!Object.<string, Blockly.Theme.BlockStyle>}
             */
            blockStyles_: { [key: string]: Blockly.Theme.BlockStyle };
    
            /**
             * The category styles map.
             * @type {!Object.<string, Blockly.Theme.CategoryStyle>}
             */
            categoryStyles_: { [key: string]: Blockly.Theme.CategoryStyle };
    
            /**
             * The UI components styles map.
             * @type {!Object.<string, *>}
             */
            componentStyles_: { [key: string]: any };
    
            /**
             * Overrides or adds all values from blockStyles to blockStyles_
             * @param {Object.<string, Blockly.Theme.BlockStyle>} blockStyles Map of
             *     block styles.
             */
            setAllBlockStyles(blockStyles: { [key: string]: Blockly.Theme.BlockStyle }): void;
    
            /**
             * Gets a map of all the block style names.
             * @return {!Object.<string, Blockly.Theme.BlockStyle>} Map of block styles.
             */
            getAllBlockStyles(): { [key: string]: Blockly.Theme.BlockStyle };
    
            /**
             * Gets the BlockStyle for the given block style name.
             * @param {string} blockStyleName The name of the block style.
             * @return {Blockly.Theme.BlockStyle|undefined} The named block style.
             */
            getBlockStyle(blockStyleName: string): Blockly.Theme.BlockStyle|any /*undefined*/;
    
            /**
             * Overrides or adds a style to the blockStyles map.
             * @param {string} blockStyleName The name of the block style.
             * @param {Blockly.Theme.BlockStyle} blockStyle The block style.
            */
            setBlockStyle(blockStyleName: string, blockStyle: Blockly.Theme.BlockStyle): void;
    
            /**
             * Gets the CategoryStyle for the given category style name.
             * @param {string} categoryStyleName The name of the category style.
             * @return {Blockly.Theme.CategoryStyle|undefined} The named category style.
             */
            getCategoryStyle(categoryStyleName: string): Blockly.Theme.CategoryStyle|any /*undefined*/;
    
            /**
             * Overrides or adds a style to the categoryStyles map.
             * @param {string} categoryStyleName The name of the category style.
             * @param {Blockly.Theme.CategoryStyle} categoryStyle The category style.
            */
            setCategoryStyle(categoryStyleName: string, categoryStyle: Blockly.Theme.CategoryStyle): void;
    
            /**
             * Gets the style for a given Blockly UI component.  If the style value is a
             * string, we attempt to find the value of any named references.
             * @param {string} componentName The name of the component.
             * @return {?string} The style value.
             */
            getComponentStyle(componentName: string): string;
    
            /**
             * Configure a specific Blockly UI component with a style value.
             * @param {string} componentName The name of the component.
             * @param {*} styleValue The style value.
            */
            setComponentStyle(componentName: string, styleValue: any): void;
    } 
    
}

declare module Blockly.Theme {

    /**
     * A block style.
     * @typedef {{
      *            colourPrimary:string,
      *            colourSecondary:string,
      *            colourTertiary:string,
      *            hat:string
      *          }}
      */
    interface BlockStyle {
        colourPrimary: string;
        colourSecondary: string;
        colourTertiary: string;
        hat: string
    }

    /**
     * A category style.
     * @typedef {{
      *            colour:string
      *          }}
      */
    interface CategoryStyle {
        colour: string
    }
}
