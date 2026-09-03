
declare module Blockly {

    interface IFlyoutCategoryPositionData {
    
        /**
          * the name of the category this data is for
          * @type {string}
          */
        categoryName: string;
    
        /**
          * the name of the category this data is for
          * @type {string}
          */
        categoryId: string;
    
        /**
          * the scroll position for the start of the category
          * @type {number}
          */
        position: number;
    
        /**
          * the scroll length of the category
          * @type {number}
          */
        length: number;
    }
}
