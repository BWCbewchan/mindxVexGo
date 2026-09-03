
declare module Blockly {

    class Menu extends Menu__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Menu__Class  { 
    
            /**
             * A basic menu class.
             * @constructor
             */
            constructor();
    
            /**
             * Coordinates of the mousedown event that caused this menu to open. Used to
             * prevent the consequent mouseup event due to a simple click from activating
             * a menu item immediately.
             * @type {?Blockly.utils.Coordinate}
             * @package
             */
            openingCoords: Blockly.utils.Coordinate;
    
            /**
             * Add a new menu item to the bottom of this menu.
             * @param {!Blockly.MenuItem} menuItem Menu item to append.
             */
            addChild(menuItem: Blockly.MenuItem): void;
    
            /**
             * Creates the menu DOM.
             * @param {!Element} container Element upon which to append this menu.
             */
            render(container: Element): void;
    
            /**
             * Gets the menu's element.
             * @return {Element} The DOM element.
             * @package
             */
            getElement(): Element;
    
            /**
             * Focus the menu element.
             * @package
             */
            focus(): void;
    
            /**
             * Set the menu accessibility role.
             * @param {!Blockly.utils.aria.Role} roleName role name.
             * @package
             */
            setRole(roleName: Blockly.utils.aria.Role): void;
    
            /**
             * Dispose of this menu.
             */
            dispose(): void;
    
            /**
             * Highlights the given menu item, or clears highlighting if null.
             * @param {Blockly.MenuItem} item Item to highlight, or null.
             * @package
             */
            setHighlighted(item: Blockly.MenuItem): void;
    
            /**
             * Highlights the next highlightable item (or the first if nothing is currently
             * highlighted).
             * @package
             */
            highlightNext(): void;
    
            /**
             * Highlights the previous highlightable item (or the last if nothing is
             * currently highlighted).
             * @package
             */
            highlightPrevious(): void;
    
            /**
             * Get the size of a rendered menu.
             * @return {!Blockly.utils.Size} Object with width and height properties.
             * @package
             */
            getSize(): Blockly.utils.Size;
    } 
    
}
