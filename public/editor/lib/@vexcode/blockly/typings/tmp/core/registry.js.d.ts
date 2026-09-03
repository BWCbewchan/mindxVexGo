
declare module Blockly.registry {

    class Type<T> extends Type__Class<T> { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Type__Class<T>  { 
    
            /**
             * A name with the type of the element stored in the generic.
             * @param {string} name The name of the registry type.
             * @constructor
             * @template T
             */
            constructor(name: string);
    } 
    

    /**
     * A map of maps. With the keys being the type and name of the class we are
     * registering and the value being the constructor function.
     * e.g. {'field': {'field_angle': Blockly.FieldAngle}}
     *
     * @type {Object<string, Object<string, function(new:?)>>}
     */
    var typeMap_: any /*missing*/;

    /**
     * The string used to register the default class for a type of plugin.
     * @type {string}
     */
    var DEFAULT: string;

    /**
     * Registers a class based on a type and name.
     * @param {string|!Blockly.registry.Type<T>} type The type of the plugin.
     *     (e.g. Field, Renderer)
     * @param {string} name The plugin's name. (Ex. field_angle, geras)
     * @param {?function(new:T, ...?)|Object} registryItem The class or object to
     *     register.
     * @param {boolean=} opt_quiet True to prevent an error when overriding an
     *     already registered item.
     * @throws {Error} if the type or name is empty, a name with the given type has
     *     already been registered, or if the given class or object is not valid for it's type.
     * @template T
     */
    function register<T>(type: string|Blockly.registry.Type<T>, name: string, registryItem: { (_0: any[]): any /*missing*/ }|Object, opt_quiet?: boolean): void;

    /**
     * Unregisters the registry item with the given type and name.
     * @param {string|!Blockly.registry.Type<T>} type The type of the plugin.
     *     (e.g. Field, Renderer)
     * @param {string} name The plugin's name. (Ex. field_angle, geras)
     * @template T
     */
    function unregister<T>(type: string|Blockly.registry.Type<T>, name: string): void;

    /**
     * Gets the registry item for the given name and type. This can be either a
     * class or an object.
     * @param {string|!Blockly.registry.Type<T>} type The type of the plugin.
     *     (e.g. Field, Renderer)
     * @param {string} name The plugin's name. (Ex. field_angle, geras)
     * @return {?function(new:T, ...?)|Object} The class or object with the given
     *     name and type or null if none exists.
     * @template T
     */
    function getItem_<T>(type: string|Blockly.registry.Type<T>, name: string): { (_0: any[]): any /*missing*/ }|Object;

    /**
     * Returns whether or not the registry contains an item with the given type and
     * name.
     * @param {string|!Blockly.registry.Type<T>} type The type of the plugin.
     *     (e.g. Field, Renderer)
     * @param {string} name The plugin's name. (Ex. field_angle, geras)
     * @return {boolean} True if the registry has an item with the given type and
     *     name, false otherwise.
     * @template T
     */
    function hasItem<T>(type: string|Blockly.registry.Type<T>, name: string): boolean;

    /**
     * Gets the class for the given name and type.
     * @param {string|!Blockly.registry.Type<T>} type The type of the plugin.
     *     (e.g. Field, Renderer)
     * @param {string} name The plugin's name. (Ex. field_angle, geras)
     * @return {?function(new:T, ...?)} The class with the given name and type or
     *     null if none exists.
     * @template T
     */
    function getClass<T>(type: string|Blockly.registry.Type<T>, name: string): { (_0: any[]): any /*missing*/ };

    /**
     * Gets the object for the given name and type.
     * @param {string|!Blockly.registry.Type<T>} type The type of the plugin.
     *     (e.g. Category)
     * @param {string} name The plugin's name. (Ex. logic_category)
     * @returns {T} The object with the given name and type or null if none exists.
     * @template T
     */
    function getObject<T>(type: string|Blockly.registry.Type<T>, name: string): T;

    /**
     * Gets the class from Blockly options for the given type.
     * This is used for plugins that override a built in feature. (e.g. Toolbox)
     * @param {!Blockly.registry.Type<T>} type The type of the plugin.
     * @param {!Blockly.Options} options The option object to check for the given
     *     plugin.
     * @return {?function(new:T, ...?)} The class for the plugin.
     * @template T
     */
    function getClassFromOptions<T>(type: Blockly.registry.Type<T>, options: Blockly.Options): { (_0: any[]): any /*missing*/ };
}

declare module Blockly.registry.Type {

    /** @type {!Blockly.registry.Type<Blockly.IConnectionChecker>} */
    var CONNECTION_CHECKER: Blockly.registry.Type<Blockly.IConnectionChecker>;

    /** @type {!Blockly.registry.Type<Blockly.Events.Abstract>} */
    var EVENT: Blockly.registry.Type<Blockly.Events.Abstract>;

    /** @type {!Blockly.registry.Type<Blockly.Field>} */
    var FIELD: Blockly.registry.Type<Blockly.Field>;

    /** @type {!Blockly.registry.Type<Blockly.blockRendering.Renderer>} */
    var RENDERER: Blockly.registry.Type<Blockly.blockRendering.Renderer>;

    /** @type {!Blockly.registry.Type<Blockly.IToolbox>} */
    var TOOLBOX: Blockly.registry.Type<Blockly.IToolbox>;

    /** @type {!Blockly.registry.Type<Blockly.Theme>} */
    var THEME: Blockly.registry.Type<Blockly.Theme>;

    /** @type {!Blockly.registry.Type<Blockly.ToolboxItem>} */
    var TOOLBOX_ITEM: Blockly.registry.Type<Blockly.ToolboxItem>;

    /** @type {!Blockly.registry.Type<Blockly.IFlyout>} */
    var FLYOUTS_VERTICAL_TOOLBOX: Blockly.registry.Type<Blockly.IFlyout>;

    /** @type {!Blockly.registry.Type<Blockly.IFlyout>} */
    var FLYOUTS_HORIZONTAL_TOOLBOX: Blockly.registry.Type<Blockly.IFlyout>;
}
