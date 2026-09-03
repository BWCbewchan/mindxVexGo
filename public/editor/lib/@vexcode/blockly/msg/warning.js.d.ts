
declare module Blockly {

    class Warning extends Warning__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Warning__Class extends Blockly.Icon__Class  { 
    
            /**
             * Class for a warning.
             * @param {!Blockly.Block} block The block associated with this warning.
             * @extends {Blockly.Icon}
             * @constructor
             */
            constructor(block: Blockly.Block);
    
            /**
             * Does this icon get hidden when the block is collapsed.
             */
            collapseHidden: any /*missing*/;
    
            /**
             * Show or hide the warning bubble.
             * @param {boolean} visible True if the bubble should be visible.
             */
            setVisible(visible: boolean): void;
    
            /**
             * Show the bubble.
             * @package
             */
            createBubble(): void;
    
            /**
             * Dispose of the bubble and references to it.
             * @package
             */
            disposeBubble(): void;
    
            /**
             * Set this warning's text.
             * @param {string} text Warning text (or '' to delete). This supports
             *    linebreaks.
             * @param {string} id An ID for this text entry to be able to maintain
             *     multiple warnings.
             */
            setText(text: string, id: string): void;
    
            /**
             * Get this warning's texts.
             * @return {string} All texts concatenated into one string.
             */
            getText(): string;
    
            /**
             * Dispose of this warning.
             */
            dispose(): void;
    } 
    
}
