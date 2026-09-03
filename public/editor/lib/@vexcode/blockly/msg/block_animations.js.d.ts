
declare module Blockly.blockAnimations {

    /**
     * Play some UI effects (sound, animation) when disposing of a block.
     * @param {!Blockly.BlockSvg} block The block being disposed of.
     * @package
     */
    function disposeUiEffect(block: Blockly.BlockSvg): void;

    /**
     * Play some UI effects (sound, ripple) after a connection has been established.
     * @param {!Blockly.BlockSvg} block The block being connected.
     * @package
     */
    function connectionUiEffect(block: Blockly.BlockSvg): void;

    /**
     * Play some UI effects (sound, animation) when disconnecting a block.
     * @param {!Blockly.BlockSvg} block The block being disconnected.
     * @package
     */
    function disconnectUiEffect(block: Blockly.BlockSvg): void;

    /**
     * Stop the disconnect UI animation immediately.
     * @package
     */
    function disconnectUiStop(): void;
}
