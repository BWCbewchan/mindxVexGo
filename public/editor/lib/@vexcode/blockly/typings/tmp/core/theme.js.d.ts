
declare module Blockly {

    class Theme extends Theme__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Theme__Class  { 
    
            /**
             * Class for a theme.
             * @param {string} name Theme name.
             * @param {!Object.<string, Blockly.Theme.BlockStyle>=} opt_blockStyles A map
             *     from style names (strings) to objects with style attributes for blocks.
             * @param {!Object.<string, Blockly.Theme.CategoryStyle>=} opt_categoryStyles A
             *     map from style names (strings) to objects with style attributes for
             *     categories.
             * @param {!Blockly.Theme.ComponentStyle=} opt_componentStyles A map of Blockly
             *     component names to style value.
             * @constructor
             */
            constructor(name: string, opt_blockStyles?: { [key: string]: Blockly.Theme.BlockStyle }, opt_categoryStyles?: { [key: string]: Blockly.Theme.CategoryStyle }, opt_componentStyles?: Blockly.Theme.ComponentStyle);
    
            /**
             * The theme name. This can be used to reference a specific theme in CSS.
             * @type {string}
             */
            name: string;
    
            /**
             * The block styles map.
             * @type {!Object.<string, !Blockly.Theme.BlockStyle>}
             * @package
             */
            blockStyles: { [key: string]: Blockly.Theme.BlockStyle };
    
            /**
             * The category styles map.
             * @type {!Object.<string, Blockly.Theme.CategoryStyle>}
             * @package
             */
            categoryStyles: { [key: string]: Blockly.Theme.CategoryStyle };
    
            /**
             * The UI components styles map.
             * @type {!Blockly.Theme.ComponentStyle}
             * @package
             */
            componentStyles: Blockly.Theme.ComponentStyle;
    
            /**
             * The font style.
             * @type {!Blockly.Theme.FontStyle}
             * @package
             */
            fontStyle: Blockly.Theme.FontStyle;
    
            /**
             * Whether or not to add a 'hat' on top of all blocks with no previous or
             * output connections.
             * @type {?boolean}
             * @package
             */
            startHats: boolean;
    
            /**
             * Gets the class name that identifies this theme.
             * @return {string} The CSS class name.
             * @package
             */
            getClassName(): string;
    
            /**
             * Overrides or adds a style to the blockStyles map.
             * @param {string} blockStyleName The name of the block style.
             * @param {Blockly.Theme.BlockStyle} blockStyle The block style.
            */
            setBlockStyle(blockStyleName: string, blockStyle: Blockly.Theme.BlockStyle): void;
    
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
    
            /**
             * Configure a theme's font style.
             * @param {Blockly.Theme.FontStyle} fontStyle The font style.
            */
            setFontStyle(fontStyle: Blockly.Theme.FontStyle): void;
    
            /**
             * Configure a theme's start hats.
             * @param {boolean} startHats True if the theme enables start hats, false
             *     otherwise.
            */
            setStartHats(startHats: boolean): void;
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

    /**
     * A component style.
     * @typedef {{
     *            workspaceBackgroundColour:?string,
     *            toolboxBackgroundColour:?string,
     *            toolboxForegroundColour:?string,
     *            toolboxCategoryBackgroundColour:?string,
     *            toolboxCategoryForegroundColour:?string,
     *            flyoutBackgroundColour:?string,
     *            flyoutForegroundColour:?string,
     *            flyoutOpacity:?number,
     *            scrollbarColour:?string,
     *            scrollbarOpacity:?number,
     *            insertionMarkerColour:?string,
     *            insertionMarkerOpacity:?number,
     *            markerColour:?string,
     *            cursorColour:?string,
     *            selectedGlowColour:?string,
     *            selectedGlowOpacity:?number,
     *            replacementGlowColour:?string,
     *            replacementGlowOpacity:?number
     *          }}
     */
    interface ComponentStyle {
        workspaceBackgroundColour: string;
        toolboxBackgroundColour: string;
        toolboxForegroundColour: string;
        toolboxCategoryBackgroundColour: string;
        toolboxCategoryForegroundColour: string;
        flyoutBackgroundColour: string;
        flyoutForegroundColour: string;
        flyoutOpacity: number;
        scrollbarColour: string;
        scrollbarOpacity: number;
        insertionMarkerColour: string;
        insertionMarkerOpacity: number;
        markerColour: string;
        cursorColour: string;
        selectedGlowColour: string;
        selectedGlowOpacity: number;
        replacementGlowColour: string;
        replacementGlowOpacity: number
    }

    /**
     * A font style.
     * @typedef {{
     *            family:?string,
     *            weight:?string,
     *            size:?number
     *          }}
     */
    interface FontStyle {
        family: string;
        weight: string;
        size: number
    }

    /**
     * Define a new Blockly theme.
     * @param {string} name The name of the theme.
     * @param {!Object} themeObj An object containing theme properties.
     * @return {!Blockly.Theme} A new Blockly theme.
    */
    function defineTheme(name: string, themeObj: Object): Blockly.Theme;
}
