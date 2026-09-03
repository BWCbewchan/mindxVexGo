
declare module Blockly {

    class MenuItem extends MenuItem__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class MenuItem__Class extends Blockly.Component__Class  { 
    
            /**
             * Class representing an item in a menu.
             *
             * @param {string} content Text caption to display as the content of
             *     the item.
             * @param {string=} opt_value Data/model associated with the menu item.
             * @constructor
             * @extends {Blockly.Component}
             */
            constructor(content: string, opt_value?: string);
    
            /**
             * @return {Element} The HTML element for the checkbox.
             * @protected
             */
            getCheckboxDom(): Element;
    
            /**
             * @return {!Element} The HTML for the content.
             * @protected
             */
            getContentDom(): Element;
    
            /**
             * @return {!Element} The HTML for the content wrapper.
             * @protected
             */
            getContentWrapperDom(): Element;
    
            /**
             * Sets the content associated with the menu item.
             * @param {string} content Text caption to set as the
             *    menuitem's contents.
             * @protected
             */
            setContentInternal(content: string): void;
    
            /**
             * Sets the value associated with the menu item.
             * @param {*} value Value to be associated with the menu item.
             * @package
             */
            setValue(value: any): void;
    
            /**
             * Gets the value associated with the menu item.
             * @return {*} value Value associated with the menu item.
             * @package
             */
            getValue(): any;
    
            /**
             * Set the menu accessibility role.
             * @param {!Blockly.utils.aria.Role|string} roleName role name.
             * @package
             */
            setRole(roleName: Blockly.utils.aria.Role|string): void;
    
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
             * Handles click events. If the component is enabled, trigger
             * the action associated with this menu item.
             * @param {Event} _e Mouse event to handle.
             * @package
             */
            handleClick(_e: Event): void;
    
            /**
             * Performs the appropriate action when the menu item is activated
             * by the user.
             * @protected
             */
            performActionInternal(): void;
    
            /**
             * Set the handler that's triggered when the menu item is activated
             * by the user. If `opt_obj` is provided, it will be used as the
             * 'this' object in the function when called.
             * @param {function(this:T,!Blockly.MenuItem):?} fn The handler.
             * @param {T=} opt_obj Used as the 'this' object in f when called.
             * @template T
             * @package
             */
            onAction<T>(fn: { (_0: Blockly.MenuItem): any }, opt_obj?: T): void;
    } 
    
}
