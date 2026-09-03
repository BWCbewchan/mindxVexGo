
declare module Blockly {

    interface ICopyable extends Blockly.ISelectable {
    
        /**
          * Encode for copying.
          * @return {?Blockly.ICopyable.CopyData} Copy metadata.
          */
        toCopyData(): Blockly.ICopyable.CopyData;
    }
}

declare module Blockly.ICopyable {

    /**
     * Copy Metadata.
     * @typedef {{
     *            xml:!Element,
     *            source:Blockly.WorkspaceSvg,
     *            typeCounts:?Object
     *          }}
     */
    interface CopyData {
        xml: Element;
        source: Blockly.WorkspaceSvg;
        typeCounts: Object
    }
}
