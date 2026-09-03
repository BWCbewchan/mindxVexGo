
declare module Blockly {

    class Comment extends Comment__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Comment__Class extends Blockly.Icon__Class  { 
    
            /**
             * Class for a comment.
             * @param {!Blockly.Block} block The block associated with this comment.
             * @extends {Blockly.Icon}
             * @constructor
             */
            constructor(block: Blockly.Block);
    
            /**
             * Draw the comment icon.
             * @param {!Element} group The icon group.
             * @protected
             */
            drawIcon_(group: Element): void;
    
            /**
             * Show or hide the comment bubble.
             * @param {boolean} visible True if the bubble should be visible.
             */
            setVisible(visible: boolean): void;
    
            /**
             * Get the dimensions of this comment's bubble.
             * @return {Blockly.utils.Size} Object with width and height properties.
             */
            getBubbleSize(): Blockly.utils.Size;
    
            /**
             * Size this comment's bubble.
             * @param {number} width Width of the bubble.
             * @param {number} height Height of the bubble.
             */
            setBubbleSize(width: number, height: number): void;
    
            /**
             * Returns this comment's text.
             * @return {string} Comment text.
             * @deprecated August 2019 Use block.getCommentText() instead.
             */
            getText(): string;
    
            /**
             * Set this comment's text.
             *
             * If you want to receive a comment change event, then this should not be called
             * directly. Instead call block.setCommentText();
             * @param {string} text Comment text.
             * @deprecated August 2019 Use block.setCommentText() instead.
             */
            setText(text: string): void;
    
            /**
             * Update the comment's view to match the model.
             * @package
             */
            updateText(): void;
    
            /**
             * Dispose of this comment.
             *
             * If you want to receive a comment "delete" event (newValue: null), then this
             * should not be called directly. Instead call block.setCommentText(null);
             */
            dispose(): void;
    } 
    
}
