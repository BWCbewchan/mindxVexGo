
declare module Blockly {

    class ContextMenuRegistry extends ContextMenuRegistry__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class ContextMenuRegistry__Class  { 
    
            /**
             * Class for the registry of context menu items. This is intended to be a singleton. You should
             * not create a new instance, and only access this class from Blockly.ContextMenuRegistry.registry.
             * @constructor
             */
            constructor();
    
            /**
             * Registers a RegistryItem.
             * @param {!Blockly.ContextMenuRegistry.RegistryItem} item Context menu item to register.
             * @throws {Error} if an item with the given id already exists.
             */
            register(item: Blockly.ContextMenuRegistry.RegistryItem): void;
    
            /**
             * Unregisters a RegistryItem with the given id.
             * @param {string} id The id of the RegistryItem to remove.
             * @throws {Error} if an item with the given id does not exist.
             */
            unregister(id: string): void;
    
            /**
             * @param {string} id The id of the RegistryItem to get.
             * @returns {?Blockly.ContextMenuRegistry.RegistryItem} RegistryItem or null if not found
             */
            getItem(id: string): Blockly.ContextMenuRegistry.RegistryItem;
    
            /**
             * Gets the valid context menu options for the given scope type (e.g. block or workspace) and scope.
             * Blocks are only shown if the preconditionFn shows they should not be hidden.
             * @param {!Blockly.ContextMenuRegistry.ScopeType} scopeType Type of scope where menu should be
             *     shown (e.g. on a block or on a workspace)
             * @param {!Blockly.ContextMenuRegistry.Scope} scope Current scope of context menu
             *     (i.e., the exact workspace or block being clicked on)
             * @returns {!Array.<!Blockly.ContextMenuRegistry.ContextMenuOption>} the list of ContextMenuOptions
             */
            getContextMenuOptions(scopeType: Blockly.ContextMenuRegistry.ScopeType, scope: Blockly.ContextMenuRegistry.Scope): Blockly.ContextMenuRegistry.ContextMenuOption[];
    } 
    
}

declare module Blockly.ContextMenuRegistry {

    /**
     * Where this menu item should be rendered. If the menu item should be rendered in multiple
     * scopes, e.g. on both a block and a workspace, it should be registered for each scope.
     * @enum {string}
     */
    enum ScopeType { BLOCK, WORKSPACE } 

    /**
     * The actual workspace/block where the menu is being rendered. This is passed to callback and
     * displayText functions that depend on this information.
     * @typedef {{
     *    block: (Blockly.BlockSvg|undefined),
     *    workspace: (Blockly.WorkspaceSvg|undefined)
     * }}
     */
    interface Scope {
        block: Blockly.BlockSvg|any /*undefined*/;
        workspace: Blockly.WorkspaceSvg|any /*undefined*/
    }

    /**
     * A menu item as entered in the registry.
     * @typedef {{
     *    callback: function(!Blockly.ContextMenuRegistry.Scope),
     *    scopeType: !Blockly.ContextMenuRegistry.ScopeType,
     *    displayText: ((function(!Blockly.ContextMenuRegistry.Scope):string)|string),
     *    preconditionFn: function(!Blockly.ContextMenuRegistry.Scope):string,
     *    weight: number,
     *    id: string
     * }}
    */
    interface RegistryItem {
        callback: { (_0: Blockly.ContextMenuRegistry.Scope): any /*missing*/ };
        scopeType: Blockly.ContextMenuRegistry.ScopeType;
        displayText: { (_0: Blockly.ContextMenuRegistry.Scope): string }|string;
        preconditionFn: { (_0: Blockly.ContextMenuRegistry.Scope): string };
        weight: number;
        id: string
    }

    /**
     * A menu item as presented to contextmenu.js.
     * @typedef {{
     *    text: string,
     *    enabled: boolean,
     *    callback: function(!Blockly.ContextMenuRegistry.Scope),
     *    scope: !Blockly.ContextMenuRegistry.Scope,
     *    weight: number
     * }}
     */
    interface ContextMenuOption {
        text: string;
        enabled: boolean;
        callback: { (_0: Blockly.ContextMenuRegistry.Scope): any /*missing*/ };
        scope: Blockly.ContextMenuRegistry.Scope;
        weight: number
    }

    /**
     * Singleton instance of this class. All interactions with this class should be done on this object.
     * @type {?Blockly.ContextMenuRegistry}
     */
    var registry: Blockly.ContextMenuRegistry;
}
