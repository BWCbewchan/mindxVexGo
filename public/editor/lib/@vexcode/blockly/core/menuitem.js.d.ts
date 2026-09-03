
declare module Blockly {

    class MenuItem extends MenuItem__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class MenuItem__Class  { 
    
            /**
             * Class representing an item in a menu.
             *
             * @param {string|!HTMLElement} content Text caption to display as the content
             *     of the item, or a HTML element to display.
             * @param {string=} opt_value Data/model associated with the menu item.
             * @constructor
             */
            constructor(content: string|HTMLElement, opt_value?: string);
    
            /**
             * Creates the menuitem's DOM.
             * @return {!Element} Completed DOM.
             */
            createDom(): Element;
    
            /**
             * Dispose of this menu item.
             */
            dispose(): void;
    
            /**
             * Gets the menu item's element.
             * @return {Element} The DOM element.
             * @package
             */
            getElement(): Element;
    
            /**
             * Gets the unique ID for this menu item.
             * @return {string} Unique component ID.
             * @package
             */
            getId(): string;
    
            /**
             * Gets the value associated with the menu item.
             * @return {*} value Value associated with the menu item.
             * @package
             */
            getValue(): any;
    
            /**
             * Set menu item's rendering direction.
             * @param {boolean} rtl True if RTL, false if LTR.
             * @package
             */
            setRightToLeft(rtl: boolean): void;
    
            /**
             * Set the menu item's accessibility role.
             * @param {!Blockly.utils.aria.Role} roleName Role name.
             * @package
             */
            setRole(roleName: Blockly.utils.aria.Role): void;
    
            /**
             * Sets the menu item to be checkable or not. Set to true for menu items
             * that represent checkable options.
             * @param {boolean} checkable Whether the menu item is checkable.
             * @package
             */
            setCheckable(checkable: boolean): void;
    
            /**
             * Checks or unchecks the component.
             * @param {boolean} checked Whether to check or uncheck the component.
             * @package
             */
            setChecked(checked: boolean): void;
    
            /**
             * Highlights or unhighlights the component.
             * @param {boolean} highlight Whether to highlight or unhighlight the component.
             * @package
             */
            setHighlighted(highlight: boolean): void;
    
            /**
             * Returns true if the menu item is enabled, false otherwise.
             * @return {boolean} Whether the menu item is enabled.
             * @package
             */
            isEnabled(): boolean;
    
            /**
             * Enables or disables the menu item.
             * @param {boolean} enabled Whether to enable or disable the menu item.
             * @package
             */
            setEnabled(enabled: boolean): void;
    
            /**
             * Performs the appropriate action when the menu item is activated
             * by the user.
             * @param {?Event} e Click event to be passed
             * @package
             */
            performAction(e: Event): void;
    
            /**
             * Set the handler that's called when the menu item is activated by the user.
             * `obj` will be used as the 'this' object in the function when called.
             * @param {function(!Blockly.MenuItem, ?Event)} fn The handler.
             * @param {!Object} obj Used as the 'this' object in fn when called.
             * @package
             */
            onAction(fn: { (_0: Blockly.MenuItem, _1: Event): any /*missing*/ }, obj: Object): void;
    } 
    
}
