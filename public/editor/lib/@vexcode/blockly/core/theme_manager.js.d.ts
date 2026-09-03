
declare module Blockly {

    class ThemeManager extends ThemeManager__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class ThemeManager__Class  { 
    
            /**
             * Class for storing and updating a workspace's theme and UI components.
             * @param {!Blockly.WorkspaceSvg} workspace The main workspace.
             * @param {!Blockly.Theme} theme The workspace theme.
             * @constructor
             * @package
             */
            constructor(workspace: Blockly.WorkspaceSvg, theme: Blockly.Theme);
    
            /**
             * Get the workspace theme.
             * @return {!Blockly.Theme} The workspace theme.
             * @package
             */
            getTheme(): Blockly.Theme;
    
            /**
             * Set the workspace theme, and refresh the workspace and all components.
             * @param {!Blockly.Theme} theme The workspace theme.
             * @package
             */
            setTheme(theme: Blockly.Theme): void;
    
            /**
             * Subscribe a workspace to changes to the selected theme.  If a new theme is
             * set, the workspace is called to refresh its blocks.
             * @param {!Blockly.Workspace} workspace The workspace to subscribe.
             * @package
             */
            subscribeWorkspace(workspace: Blockly.Workspace): void;
    
            /**
             * Unsubscribe a workspace to changes to the selected theme.
             * @param {!Blockly.Workspace} workspace The workspace to unsubscribe.
             * @package
             */
            unsubscribeWorkspace(workspace: Blockly.Workspace): void;
    
            /**
             * Subscribe an element to changes to the selected theme.  If a new theme is
             * selected, the element's style is refreshed with the new theme's style.
             * @param {!Element} element The element to subscribe.
             * @param {string} componentName The name used to identify the component. This
             *     must be the same name used to configure the style in the Theme object.
             * @param {string} propertyName The inline style property name to update.
             * @package
             */
            subscribe(element: Element, componentName: string, propertyName: string): void;
    
            /**
             * Unsubscribe an element to changes to the selected theme.
             * @param {Element} element The element to unsubscribe.
             * @package
             */
            unsubscribe(element: Element): void;
    
            /**
             * Dispose of this theme manager.
             * @package
             * @suppress {checkTypes}
             */
            dispose(): void;
    } 
    
}

declare module Blockly.ThemeManager {

    /**
     * A Blockly UI component type.
     * @typedef {{
      *            element:!Element,
      *            propertyName:string
      *          }}
      */
    interface Component {
        element: Element;
        propertyName: string
    }
}
