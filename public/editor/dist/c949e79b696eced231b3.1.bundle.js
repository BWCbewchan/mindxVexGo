this["webpackChunkwebapp"]([1],{

/***/ "./node_modules/@vexcode/blockly-react-component/dist/controllers/BlocklyMyBlockWorkspaceController.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/@vexcode/blockly-react-component/dist/controllers/BlocklyMyBlockWorkspaceController.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const logger = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
const log = logger.getLogger("BlocklyMyBlockWorkspaceController");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();
const BlocklyWorkspaceBaseController_1 = __webpack_require__(/*! ./BlocklyWorkspaceBaseController */ "./node_modules/@vexcode/blockly-react-component/dist/controllers/BlocklyWorkspaceBaseController.js");
class BlocklyMyBlockWorkspaceController extends BlocklyWorkspaceBaseController_1.BlocklyWorkspaceBaseController {
    /**
     * Class to control and inject a blockly programming workspace for configuring My Blocks
     * @param mediaPath the path to the blockly media files
     * @param startScale what scale should the workspace use
     */
    constructor(mediaPath, startScale) {
        super(mediaPath, true, true, startScale, true);
    }
    getDummyToolbox() {
        return null;
    }
}
exports.BlocklyMyBlockWorkspaceController = BlocklyMyBlockWorkspaceController;


/***/ }),

/***/ "./node_modules/@vexcode/blockly-react-component/dist/controllers/BlocklyWorkspaceBaseController.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@vexcode/blockly-react-component/dist/controllers/BlocklyWorkspaceBaseController.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const logger = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
const log = logger.getLogger("BlocklyWorkspaceBaseController");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();
const BlocklyAccessWrapper_1 = __webpack_require__(/*! ../BlocklyAccessWrapper */ "./node_modules/@vexcode/blockly-react-component/dist/BlocklyAccessWrapper.js");
const helpers_1 = __webpack_require__(/*! ../helpers */ "./node_modules/@vexcode/blockly-react-component/dist/helpers.js");
class BlocklyWorkspaceBaseController {
    /**
     * Class to control and inject a blockly workspace
     * @param mediaPath the path to the blockly media files
     * @param includeToolbox should the workspace display a toolbox
     * @param allowScale can the workspace be scaled by the user
     * @param startScale what scale should the workspace use
     * @param supportWorkspaceNotes should the workspace allow notes
     * @param monitor should the monitor icon be displayed. default is false.
     */
    constructor(mediaPath, includeToolbox, allowScale, startScale, supportWorkspaceNotes, monitor) {
        this.BLOCKLY_FLYOUT_TOOLBOX_WIDTH = 410;
        this.BLOCKLY_TOOLBOX_CATEGORY_WIDTH = 60;
        /**
         * this is a unique ID for the give controller instance.
         */
        this.uuid = helpers_1.generateUUID();
        /** the workspace that is currently managed */
        this.workspace = null;
        /**
         * this can be used to prevent resize calls
         */
        this.resizeEnabled = true;
        this.mediaPath = null;
        this.toolbox = null;
        this.allowScale = false;
        this.startScale = 0;
        this.isWorkspaceReady = false;
        this.supportWorkspaceNotes = false;
        this.isResizingWorkspaceVar = false;
        // TODO: combine clearResizeFlag and setPostResizeTimer since they do the same thing...
        this.clearResizeFlagTimer = null;
        this.postResizeTimer = null;
        // public setPostResize(func: () => void) {
        //   this.postResize = func;
        // }
        //#endregion resize
        //#region event system
        this.eventCallbacks = {
            "workspaceDestroy": new Set(),
            "workspaceReady": new Set(),
        };
        this.mediaPath = mediaPath ? mediaPath : "./media/";
        if (includeToolbox) {
            this.toolbox = this.getDummyToolbox();
        }
        this.allowScale = allowScale;
        this.startScale = startScale;
        this.supportWorkspaceNotes = supportWorkspaceNotes;
        this.monitor = monitor;
        this.resizeWorkspace = this.resizeWorkspace.bind(this);
        this.postResizeFunc = this.postResizeFunc.bind(this);
    }
    /** the current blockly workspace this controller is managing */
    get blocklyWorkspace() {
        return this.workspace;
    }
    /** the ID of the blockly workspace this controller is managing */
    get blocklyWorkspaceID() {
        return this.workspace ? this.workspace.id : null;
    }
    getDummyToolbox() {
        // TODO: actually set this data
        return {
            kind: BlocklyAccessWrapper_1.Blockly.utils.toolbox.CATEGORY_TOOLBOX_KIND,
            contents: [
                {
                    kind: "category",
                    name: "Events",
                    contents: [
                        {
                            kind: "block",
                            type: "event_started"
                        }
                    ]
                },
                {
                    kind: "category",
                    name: "Operators",
                    contents: [
                        {
                            kind: "block",
                            type: "logic_boolean"
                        }
                    ]
                }
            ]
        };
    }
    //#region main controls
    /**
     * will inject a new instance of Blockly workspace in the specified Div
     * @param containerDiv the Div to inject Blockly inside of
     * @param rtlEnabled true if text should be right to left
     */
    injectBlockly(containerDiv, rtlEnabled) {
        this.isWorkspaceReady = false;
        // make sure we destroy the eisting workspace if it exists to prevent memory leaks
        this.disposeWorkspace();
        this.workspace = BlocklyAccessWrapper_1.Blockly.inject(containerDiv, this.getInjectOptions(rtlEnabled));
        BlocklyAccessWrapper_1.Blockly.svgResize(this.workspace);
        // add workspace note option to context menu if needed
        if (this.supportWorkspaceNotes) {
            function configureContextMenu(menuOptions, e) {
                if (!this.workspace.options.readOnly) {
                    // Adds a default-sized workspace comment to the workspace.
                    menuOptions.push(BlocklyAccessWrapper_1.Blockly.ContextMenu.workspaceCommentOption(this.workspace, e));
                }
            }
            this.workspace.configureContextMenu = configureContextMenu.bind(this);
        }
        this.isWorkspaceReady = true;
        this.fireEvent("workspaceReady", this.workspace);
    }
    /**
     * will build the inject options
     * @param rtlEnabled
     * @param monitor enables monitor true/false
     * @returns
     */
    getInjectOptions(rtlEnabled) {
        return {
            media: this.mediaPath,
            toolbox: this.toolbox,
            grid: { spacing: 20, length: 3, colour: "#ccc", snap: true },
            zoom: {
                controls: this.allowScale,
                wheel: this.allowScale,
                startScale: this.startScale,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2,
            },
            move: {
                drag: true,
                wheel: true,
            },
            rtl: rtlEnabled,
            renderer: "Zelos",
            theme: BlocklyWorkspaceBaseController.THEME,
            monitor: this.monitor,
            trashcan: false,
        };
    }
    /**
     * Will resolve the returned promise once the workspace is ready.
     */
    async waitForWorkspaceReady() {
        while (!this.isWorkspaceReady) {
            await helpers_1.delay(10);
        }
    }
    /**
     * Nullify current workspace and dispose
     */
    disposeWorkspace() {
        if (this.workspace) {
            this.fireEvent("workspaceDestroy", this.workspace);
            this.workspace.dispose();
            this.workspace = null;
        }
    }
    //#endregion main controls
    //#region resize
    /**
     * force the Blockly workspace to resize
     */
    resizeWorkspace() {
        if (this.resizeEnabled) {
            log.info("resizing blockly workspace", this.blocklyWorkspaceID);
            this.isResizingWorkspaceVar = true;
            // TODO: fix this
            // // Set the flyout to visible to prevent gutter space before resize...
            // blocklyWorkspace.toolbox_.flyout_.setVisible(true);
            BlocklyAccessWrapper_1.Blockly.svgResize(this.workspace);
            // TODO: fix this
            // Set AutoCollapse to whatever setting the user has enabled...
            // setAutoCollapse(isAutoClosedEnabled);
            this.clearResizeFlag();
            this.setPostResizeTimer();
            log.info("done resizing blockly workspace", this.blocklyWorkspaceID);
        }
    }
    /**
     * is the workspace currently resizing
     * @returns true if in the middle of a resize
     */
    isResizingWorkspace() {
        return this.isResizingWorkspaceVar;
    }
    /**
     * This is used to make sure that we don't set/clear the resizing flag over and over due to delays between event triggers.
     */
    clearResizeFlag() {
        if (this.clearResizeFlagTimer) {
            clearTimeout(this.clearResizeFlagTimer);
        }
        this.clearResizeFlagTimer = setTimeout(() => {
            this.isResizingWorkspaceVar = false;
        }, 200);
    }
    setPostResizeTimer() {
        if (this.postResizeTimer) {
            clearTimeout(this.postResizeTimer);
        }
        this.postResizeTimer = setTimeout(this.postResizeFunc, 150);
    }
    /**
     * is is run after a resize events have finished running
     */
    postResizeFunc() {
        // // refresh the toolbox to make sure the my blocks are there
        // this.refreshToolbox();
        // // hide the toolbox after resize if the auto collapse is active
        // if (this.isAutoClosedEnabled) {
        //   // TODO: fix this
        //   // this.workspace.toolbox_.flyout_.hide();
        // }  
    }
    on(eventName, callback) {
        this.eventCallbacks[eventName].add(callback);
    }
    off(eventName, callback) {
        this.eventCallbacks[eventName].delete(callback);
    }
    fireEvent(eventName, ...args) {
        log.debug("fire event", eventName, ...args);
        for (const callback of this.eventCallbacks[eventName]) {
            callback(...args);
        }
    }
}
exports.BlocklyWorkspaceBaseController = BlocklyWorkspaceBaseController;
BlocklyWorkspaceBaseController.THEME = BlocklyAccessWrapper_1.Blockly === null || BlocklyAccessWrapper_1.Blockly === void 0 ? void 0 : BlocklyAccessWrapper_1.Blockly.Themes.Zelos;


/***/ }),

/***/ "./node_modules/@vexcode/blockly-react-component/dist/controllers/BlocklyWorkspaceController.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@vexcode/blockly-react-component/dist/controllers/BlocklyWorkspaceController.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const logger = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
const log = logger.getLogger("BlocklyWorkspaceController");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();
const BlocklyAccessWrapper_1 = __webpack_require__(/*! ../BlocklyAccessWrapper */ "./node_modules/@vexcode/blockly-react-component/dist/BlocklyAccessWrapper.js");
const BlocklyWorkspaceBaseController_1 = __webpack_require__(/*! ./BlocklyWorkspaceBaseController */ "./node_modules/@vexcode/blockly-react-component/dist/controllers/BlocklyWorkspaceBaseController.js");
class BlocklyWorkspaceController extends BlocklyWorkspaceBaseController_1.BlocklyWorkspaceBaseController {
    /**
     * Class to control and inject a blockly programming workspace
     * @param mediaPath the path to the blockly media files
     * @param startScale what scale should the workspace use
     * @param should the monitor icon be displayed. default is false.
     */
    constructor(mediaPath, startScale, monitor) {
        super(mediaPath, true, true, startScale, true, monitor);
        this.isAutoClosedEnabled = false;
        this.resetNeeded = false;
        this.resetNeededFromClick = false;
        this.postResize = null;
        this.lastAutoCollapseState = this.isAutoClosedEnabled ? true : false;
    }
    //#region main controls
    /**
     * load a clean workspace
     */
    newWorkspace() {
        const emptyWorkspace = "<xml></xml>";
        this.clearWorkspace();
        this.loadWorkspace(emptyWorkspace);
    }
    /**
     * load the specified content into the workspace. Note that this does not replace the existing contents
     * @param {(!String)} contents the new contents for the workspace
     */
    loadWorkspace(contents) {
        const xml = BlocklyAccessWrapper_1.Blockly.Xml.textToDom(contents);
        BlocklyAccessWrapper_1.Blockly.Xml.domToWorkspace(xml, this.workspace);
        this.alignToStartBlock();
        this.clearUndoRedoStack();
    }
    /**
     * clears all blcoks from the workspace.
     */
    clearWorkspace() {
        this.workspace.clear();
    }
    /**
     * Rebuilds the workspace to make sure the there are no reder issues.
     */
    rebuildWorkspaceBlocks() {
        log.debug("rebuilding workspace blocks");
        const xml = BlocklyAccessWrapper_1.Blockly.Xml.workspaceToDom(this.workspace);
        try {
            BlocklyAccessWrapper_1.Blockly.Events.disable();
            this.clearWorkspace();
            BlocklyAccessWrapper_1.Blockly.Xml.domToWorkspace(xml, this.workspace);
            this.alignToStartBlock();
            BlocklyAccessWrapper_1.Blockly.Events.enable();
        }
        catch (error) {
            log.debug("error rebuilding workspace blocks: ", error);
        }
        finally {
            setTimeout(() => log.debug("undo stack after rebuilding workspace blocks: ", this.workspace.undoStack_), 100);
        }
    }
    // Default workspace block aligner
    alignToStartBlock() {
        let block = this.workspace.getBlockById(".NsXwU_L.OuU1l7Sho$F");
        if (!block) {
            block = this.workspace.getTopBlocks(true)[0];
            if (!block) {
                return;
            }
        }
        // XY is in workspace coordinates.
        const xy = block.getRelativeToSurfaceXY();
        log.debug("Block XY Coordinates: ", xy);
        // Height/width is in workspace units.
        const height = block.height;
        const width = block.width;
        log.debug("Block Height and Width: ", height, " ", width);
        // Find the enter of the block in workspace units.
        const blockCenterY = xy.y + height / 2;
        // In RTL the block's position is the top right of the block, not top left.
        const multiplier = this.workspace.RTL ? -1 : 1;
        const blockCenterX = xy.x + (multiplier * width / 2);
        // Workspace scale, used to convert from workspace coordinates to pixels.
        const scale = this.workspace.scale;
        // Center in pixels.  0, 0 is at the workspace origin.  These numbers may
        // be negative.
        const pixelX = blockCenterX * scale;
        const pixelY = blockCenterY * scale;
        log.debug("Block Center Pixels: ", pixelX, " ", pixelY);
        // TODO: fix this type issue
        const metrics = this.workspace.getMetrics();
        log.debug("Workspace Metrics: ", metrics);
        // Scrolling to here would put the block in the top-left corner of the
        // visible workspace.
        const scrollToBlockX = pixelX - metrics.contentLeft;
        const scrollToBlockY = pixelY - metrics.contentTop;
        const additionalXOffset = this.BLOCKLY_TOOLBOX_CATEGORY_WIDTH === 60 ? 80 : 160;
        const additionalYOffset = this.BLOCKLY_TOOLBOX_CATEGORY_WIDTH === 60 ? 50 : 100;
        // Put the block in the center of the visible workspace instead.
        const horizontalScroll = scrollToBlockX - additionalXOffset;
        log.debug("Horizontal Scroll: ", horizontalScroll);
        const scrollToCenterX = this.workspace.RTL ? metrics.viewWidth - scrollToBlockX : horizontalScroll;
        const scrollToCenterY = scrollToBlockY - additionalYOffset;
        log.debug("Scroll to Center X: ", scrollToCenterX);
        log.debug("Scroll to Center Y: ", scrollToCenterY);
        BlocklyAccessWrapper_1.Blockly.hideChaff();
        this.workspace.scrollbar.set(scrollToCenterX, scrollToCenterY);
    }
    /**
     * reset the zoom
     */
    resetScale() {
        // TODO: store the scale from the config data...
        this.workspace.setScale(0.72);
    }
    /**
     * sets the workspace zoom scale to the provided value
     * @param newScale the new zoom scale
     */
    setScale(newScale) {
        this.workspace.setScale(newScale);
    }
    //#endregion main controls
    //#region toolbox
    /**
     * Replaces the toolbox with the specified contents.
     * @param xml the new contents for the toolbox
     */
    setToolbox(xml) {
        this.workspace.updateToolbox(xml);
        if (this.isAutoClosedEnabled) {
            this.resetNeeded = true;
        }
    }
    /**
     * Refreshes the current toolbox
     */
    refreshToolbox() {
        log.trace("refreshToolbox()");
        const toolbox = this.blocklyWorkspace.getToolbox();
        const flyout = toolbox.getFlyout();
        const hideAfterRefresh = this.isAutoClosedEnabled && !flyout.isVisible();
        this.workspace.refreshToolboxSelection();
        if (hideAfterRefresh) {
            toolbox.clearSelection();
        }
        // TODO: fix this
        // blocklyWorkspace.refreshToolboxSelection_();
        // blocklyWorkspace.recordCachedAreas();
    }
    /**
     * This sets the toolbox width.
     * @param width the desired toolbox width
     * @param categoryMenuWidth the category menu width to help set the toolbox translation
     */
    setToolboxWidth(width, categoryMenuWidth = 60, withRefresh = true) {
        this.BLOCKLY_TOOLBOX_CATEGORY_WIDTH = categoryMenuWidth;
        if (width < 50 || width > 600) {
            log.error("invalid toolbox width");
        }
        else {
            this.BLOCKLY_FLYOUT_TOOLBOX_WIDTH = width;
            // TODO: fix this
            // this.workspace.toolbox_.width = width + BLOCKLY_TOOLBOX_CATEGORY_WIDTH;
            // this.workspace.toolbox_.flyout_.DEFAULT_WIDTH = width;
            if (withRefresh) {
                this.refreshToolbox();
                this.rebuildWorkspaceBlocks();
            }
        }
    }
    /**
     * This sets the toolbox scale.
     * @param scale the desired toolbox scale
     */
    setToolboxScale(scale, withRefresh = true) {
        if (scale < 0.3 || scale > 3) {
            log.error("invalid toolbox scale");
        }
        else {
            this.workspace.getFlyout().getWorkspace().setScale(scale);
            // TODO: fix this
            // this.workspace.getFlyout().scrollbar_.resize();
            if (withRefresh) {
                this.refreshToolbox();
                this.rebuildWorkspaceBlocks();
            }
        }
    }
    /**
     * This exposes a way to add styles to the toolbox category bar by adding a class to the wrapper.
     * @param classString the desired class to add to the category bar wrapper
     */
    addToolboxCategoryClass(classString) {
        // TODO: fix this
        // this.workspace.toolbox_.addStyle(classString);
    }
    /**
     * This exposes a way to remove any user-defined styles from the toolbox category bar
     * @param classString the desired class to remove frmo the category bar wrapper
     */
    removeToolboxCategoryClass(classString) {
        // TODO: fix this
        // this.workspace.toolbox_.removeStyle(classString);
    }
    /**
     * This function sets autoCollapse feature on or off...This should be called by
     * the UI.
     */
    setAutoCollapse(value) {
        log.info("setAutoCollapse... start");
        if (this.lastAutoCollapseState !== value || value) {
            this.lastAutoCollapseState = value;
            this.isResizingWorkspaceVar = true;
            const toolbox = this.blocklyWorkspace.getToolbox();
            const flyout = toolbox.getFlyout();
            flyout.autoClose = value;
            this.setToolboxWidth(this.BLOCKLY_FLYOUT_TOOLBOX_WIDTH, this.BLOCKLY_TOOLBOX_CATEGORY_WIDTH);
            this.isAutoClosedEnabled = value;
            this.resetScrollbar();
            // make sure that when we turn on the auto collapse feature we default to hide the flyout
            if (value) {
                if (flyout.isVisible()) {
                    toolbox.clearSelection();
                }
            }
        }
        else {
            log.info("setAutoCollapse... nothing to do");
        }
        if (this.postResize) {
            this.postResize();
        }
        this.clearResizeFlag();
        this.setPostResizeTimer();
        log.info("setAutoCollapse... complete");
    }
    resetScrollbar() {
        if (!this.blocklyWorkspace) {
            return;
        }
        // After 20 ms reset scrollbar...
        setTimeout(() => {
            this.blocklyWorkspace.scrollbar.resize();
        }, 20);
    }
    //#endregion toolbox
    //#region resize
    postResizeFunc() {
        // refresh the toolbox to make sure the my blocks are there
        this.refreshToolbox();
        // hide the toolbox after resize if the auto collapse is active
        if (this.isAutoClosedEnabled) {
            // TODO: fix this
            // this.workspace.toolbox_.flyout_.hide();
        }
    }
    setPostResize(func) {
        this.postResize = func;
    }
    //#endregion resize
    //#region undo/redo
    /**
     * will undo one event on the workspace
     */
    undo() {
        if (this.workspace) {
            this.workspace.undo(false);
        }
    }
    /**
     * will redo one event on the workspace
     */
    redo() {
        if (this.workspace) {
            this.workspace.undo(true);
        }
    }
    /**
     * checks to see if the workspace has any undo actions
     * @returns true if there are any actions in the undo stack
     */
    hasUndo() {
        var _a;
        return ((_a = this.workspace) === null || _a === void 0 ? void 0 : _a.getUndoStack().length) > 0 || false;
    }
    /**
     * checks to see if the workspace has any redo actions
     * @returns true if there are any actions in the redo stack
     */
    hasRedo() {
        var _a;
        return ((_a = this.workspace) === null || _a === void 0 ? void 0 : _a.getRedoStack().length) > 0 || false;
    }
    /**
     * will clear the undo/redo stack of the workspace
     */
    clearUndoRedoStack() {
        this.workspace.clearUndo();
    }
    //#endregion undo/redo
    //#region workspace info
    /**
     * Return the number of each block type used in the workspace.
     * @param countDisable should disabled blocks also get counted
     * @returns {[key: string]: number} object with key for each block type in the workspace.
     * The value set for the key is the number of that type of block
     */
    getBlockCount(countDisable = true) {
        const count = {};
        const blocks = this.workspace.getAllBlocks(false);
        blocks.forEach((block) => {
            const type = block.type;
            if (countDisable || !block.disabled) {
                if (count[type]) {
                    count[type]++;
                }
                else {
                    count[type] = 1;
                }
            }
        });
        return count;
    }
    /**
     * get the current workspace contents
     * @returns {string} an XML string that represents the current workspace
     */
    getWorkspaceContents() {
        const xml = BlocklyAccessWrapper_1.Blockly.Xml.workspaceToDom(this.workspace);
        const xmlText = BlocklyAccessWrapper_1.Blockly.Xml.domToText(xml);
        return xmlText;
    }
    /**
     * checks to see if the workspace has orphan blocks.
     * @returns true if there are orphan blocks
     */
    hasOrphanBlocks() {
        for (const stack of BlocklyAccessWrapper_1.Blockly.getMainWorkspace().getTopBlocks(false)) {
            if (stack.hasOwnProperty("hat") && !stack.hat) {
                return true;
            }
        }
        return false;
    }
    //#endregion workspace info
    //#region variables
    /**
     * check to see if there is a variable with the specified name in the workspace.
     * @param name the name you want to check exists
     * @returns true if there is a variable with the same name
     */
    doesVariableExist(name) {
        if (!this.workspace) {
            return false;
        }
        const allVariables = this.workspace.getAllVariables();
        for (const variable of allVariables) {
            if (variable.name === name) {
                return true;
            }
        }
        return false;
    }
    /**
     * returns a list of all list and 2d-list variables in the current workspace
     */
    getBlocklyComplexVariables() {
        if (!this.workspace) {
            return null;
        }
        const variables = [];
        const lists = this.workspace.getVariablesOfType("list");
        const array2d = this.workspace.getVariablesOfType("array2d");
        lists.forEach((list) => {
            variables.push(list);
        });
        array2d.forEach((array) => {
            variables.push(array);
        });
        return variables;
    }
    /**
     * get a list of all the variables in the current workspace as they would be in the
     * generated javascript code.
     * @returns the list of javascript variable names
     */
    getJavascriptVariableNames() {
        if (!this.workspace) {
            return null;
        }
        const TYPE = BlocklyAccessWrapper_1.Blockly.VARIABLE_CATEGORY_NAME;
        // Note: the bind is ncesissary or the scope gets lost and everything breaks
        const nameFunc = BlocklyAccessWrapper_1.Blockly.JavaScript.variableDB_.getName.bind(BlocklyAccessWrapper_1.Blockly.JavaScript.variableDB_);
        BlocklyAccessWrapper_1.Blockly.JavaScript.variableDB_.setVariableMap(this.workspace.getVariableMap());
        const allVariables = this.workspace.getAllVariables();
        const names = [];
        allVariables.forEach((blocklyVar) => {
            names.push(nameFunc(blocklyVar.name, TYPE));
        });
        BlocklyAccessWrapper_1.Blockly.JavaScript.variableDB_.reset();
        return names;
    }
    /**
     * get a list of all the variables in the current workspace as they would be
     * in the generated javascript code organized by the variable type.
     * @param varType the type of variable to process or undefined for all variables
     * @returns the list of javascript variable names
     */
    getJavascriptVariableNamesByType(varType) {
        if (!this.workspace) {
            return null;
        }
        const TYPE = BlocklyAccessWrapper_1.Blockly.VARIABLE_CATEGORY_NAME;
        const nameFunc = BlocklyAccessWrapper_1.Blockly.JavaScript.variableDB_.getName.bind(BlocklyAccessWrapper_1.Blockly.JavaScript.variableDB_);
        const allVariables = this.workspace.getAllVariables();
        const variables = [];
        const booleans = [];
        const lists = [];
        const array2d = [];
        allVariables.forEach((blocklyVar) => {
            const blockVarType = blocklyVar.type;
            if (blockVarType === "") {
                variables.push(nameFunc(blocklyVar.name, TYPE));
            }
            else if (blockVarType === "boolean") {
                booleans.push(nameFunc(blocklyVar.name, TYPE));
            }
            else if (blockVarType === "list") {
                lists.push(nameFunc(blocklyVar.name, TYPE));
            }
            else if (blockVarType === "array2d") {
                array2d.push(nameFunc(blocklyVar.name, TYPE));
            }
            else {
                throw new Error("Variable type not recognized");
            }
        });
        const varNames = {
            var: variables,
            bool: booleans,
            list: lists,
            list2d: array2d,
        };
        if (!varType) {
            return varNames;
        }
        else if (varType === "list") {
            return varNames.list;
        }
        else if (varType === "list2d") {
            return varNames.list2d;
        }
    }
    getVarNameById(id) {
        if (!this.workspace) {
            return null;
        }
        const variable = this.workspace.getVariableById(id);
        const varName = variable.name;
        return varName;
    }
    /**
     * get metadata about the variable with the specified name
     * @param name the name of the variable to get the info for
     * @param info the info you want to get
     * @returns
     */
    getVarInfo(name, info) {
        if (!this.workspace) {
            return null;
        }
        const allVariables = this.workspace.getAllVariables();
        const findVariable = allVariables.filter((variable) => variable.name === name);
        if (!findVariable[0]) {
            return null;
        }
        if (info === "type") {
            const variableType = findVariable[0].type;
            return variableType;
        }
        else if (info === "size") {
            if (findVariable[0].type === "list") {
                return findVariable[0].arrayLength;
            }
            else if (findVariable[0].type === "array2d") {
                return [findVariable[0].arrayLength, findVariable[0].arrayWidth];
            }
        }
    }
    //#endregion variables
    //#region myblocks
    /**
     * this will run through the provided block and all inputs to make sure that any my
     * block argument blocks are only enabled when used in the stack for that particular
     * my block.
     * @param block the block to process
     */
    updateMyBlockArgumentVariableBlock(block) {
        const blockType = block.type;
        if (blockType === "argument_reporter_boolean" ||
            blockType === "argument_reporter_string" ||
            blockType === "argument_reporter_number") {
            log.debug("found argument block", block);
            if (!block.parentBlock_) {
                log.debug("Block has no parent. Disabling the block");
                block.setEnabled(false);
            }
            else {
                const rootBlock = block.getRootBlock();
                if (rootBlock.type === "procedures_definition" &&
                    rootBlock.getInput("custom_block").connection.targetConnection.sourceBlock_.id === block.procedureDefId) {
                    log.debug("Block is in definition stack. Enabling the block");
                    block.setEnabled(true);
                    // try to redraw the block if a SVG
                    if (block instanceof BlocklyAccessWrapper_1.Blockly.BlockSvg) {
                        block.render();
                    }
                    // TODO: try to find a better way to force a redraw of just the block.
                    // window.dispatchEvent(new Event('resize'));
                    // block.initSvg();
                }
                else {
                    log.debug("Block not in definition stack. Disabling the block");
                    block.setEnabled(false);
                }
            }
        }
        else {
            const inputList = block.inputList;
            inputList.forEach((input) => {
                if (input.connection) {
                    if (input.connection.targetConnection) {
                        this.updateMyBlockArgumentVariableBlock(input.connection.targetConnection.sourceBlock_);
                    }
                }
            });
        }
    }
    //#endregion myblocks
    //#region block highlighting
    /**
     * highlight the desired block.
     * @param {string} id the id for the desired block to highlight in the workspace
     */
    hightlightBlock(id) {
        // for (const block of this.workspace.getAllBlocks(false) as BlockSvg[]) {
        //   // TODO: make sure this works
        //   block.unselect()
        //   // block.setGlowBlock(false);
        // }
        const block = this.workspace.getBlockById(id);
        if (block) {
            // TODO: make sure this works
            block.select();
            // block.setGlowBlock(true);
        }
    }
    /**
     * highlight the desired block.
     * @param {string} id the id for the desired block to highlight in the workspace
     */
    hightlightBlockByID(id) {
        const block = this.workspace.getBlockById(id);
        if (block) {
            block.addHighlight();
        }
    }
    /**
     * unhighlight the desired block.
     * @param {string} id the id for the desired block to unhighlight in the workspace
     */
    unhightlightBlockByID(id) {
        // for (const key of Object.keys(blocklyWorkspace.blockDB_)) {
        //   blocklyWorkspace.blockDB_[key].setGlowBlock(false);
        // }
        const block = this.workspace.getBlockById(id);
        if (block) {
            block.removeHighlight();
        }
    }
}
exports.BlocklyWorkspaceController = BlocklyWorkspaceController;


/***/ }),

/***/ "./node_modules/@vexcode/blockly-react-component/dist/helpers.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@vexcode/blockly-react-component/dist/helpers.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * will generate a random UUID
 * @returns string with UUID
 */
function generateUUID() {
    // tslint:disable: no-bitwise
    let d = new Date().getTime();
    const randDigit = (c) => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    };
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, randDigit);
}
exports.generateUUID = generateUUID;
;
async function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}
exports.delay = delay;


/***/ }),

/***/ "./node_modules/@vexcode/blockly-react-component/dist/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@vexcode/blockly-react-component/dist/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BlocklyAccessWrapper_1 = __webpack_require__(/*! ./BlocklyAccessWrapper */ "./node_modules/@vexcode/blockly-react-component/dist/BlocklyAccessWrapper.js");
exports.Blockly = BlocklyAccessWrapper_1.Blockly;
const BlocklyWorkspaceBaseController_1 = __webpack_require__(/*! ./controllers/BlocklyWorkspaceBaseController */ "./node_modules/@vexcode/blockly-react-component/dist/controllers/BlocklyWorkspaceBaseController.js");
exports.BlocklyWorkspaceBaseController = BlocklyWorkspaceBaseController_1.BlocklyWorkspaceBaseController;
const BlocklyWorkspaceController_1 = __webpack_require__(/*! ./controllers/BlocklyWorkspaceController */ "./node_modules/@vexcode/blockly-react-component/dist/controllers/BlocklyWorkspaceController.js");
exports.BlocklyWorkspaceController = BlocklyWorkspaceController_1.BlocklyWorkspaceController;
const BlocklyMyBlockWorkspaceController_1 = __webpack_require__(/*! ./controllers/BlocklyMyBlockWorkspaceController */ "./node_modules/@vexcode/blockly-react-component/dist/controllers/BlocklyMyBlockWorkspaceController.js");
exports.BlocklyMyBlockWorkspaceController = BlocklyMyBlockWorkspaceController_1.BlocklyMyBlockWorkspaceController;
const BlocklyMyBlockWorkspace_1 = __webpack_require__(/*! ./react/BlocklyMyBlockWorkspace */ "./node_modules/@vexcode/blockly-react-component/dist/react/BlocklyMyBlockWorkspace.js");
exports.BlocklyMyBlockWorkspace = BlocklyMyBlockWorkspace_1.BlocklyMyBlockWorkspace;
const BlocklyWorkspace_1 = __webpack_require__(/*! ./react/BlocklyWorkspace */ "./node_modules/@vexcode/blockly-react-component/dist/react/BlocklyWorkspace.js");
exports.BlocklyWorkspace = BlocklyWorkspace_1.BlocklyWorkspace;


/***/ }),

/***/ "./node_modules/@vexcode/blockly-react-component/dist/react/BlocklyMyBlockWorkspace.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vexcode/blockly-react-component/dist/react/BlocklyMyBlockWorkspace.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const logger = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
const log = logger.getLogger("BlocklyMyBlockWorkspace");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();
const React = __webpack_require__(/*! react */ "react");
class BlocklyMyBlockWorkspace extends React.Component {
    constructor(props) {
        super(props);
        // Creates the blockly ref as an HTMLDivElement...
        this.refBlocklyDiv = React.createRef();
        this.controller = null;
        this.state = {
            rtlOffset: 0,
        };
        this.onWindowResize = this.onWindowResize.bind(this);
        this.controller = props.controller;
    }
    componentDidMount() {
        log.debug(this.refBlocklyDiv.current);
        this.injectBlockly();
        // this.controller.newWorkspace();
        const workspace = this.controller.blocklyWorkspace;
        const mutation = workspace.newBlock("procedures_declaration");
        mutation.setMovable(false);
        mutation.setDeletable(false);
        mutation.contextMenu = false;
        workspace.addChangeListener(() => {
            mutation.onChangeFn();
            // Keep the block centered on the workspace
            const metrics = workspace.getMetrics();
            const { x, y } = mutation.getRelativeToSurfaceXY();
            const dy = (metrics.viewHeight / 2) - (mutation.height / 2) - y;
            let dx;
            if (this.props.rtlEnabled) {
                const ltrX = ((metrics.viewWidth / 2) - (mutation.width / 2) + 25);
                const mirrorX = x - ((x - this.state.rtlOffset) * 2);
                if (mirrorX === ltrX) {
                    return;
                }
                dx = mirrorX - ltrX;
                const midPoint = metrics.viewWidth / 2;
                if (x === 0) {
                    if (mutation.width < midPoint) {
                        dx = ltrX;
                    }
                    else if (mutation.width < metrics.viewWidth) {
                        dx = midPoint - ((metrics.viewWidth - mutation.width) / 2);
                    }
                    else {
                        dx = midPoint + (mutation.width - metrics.viewWidth);
                    }
                    mutation.moveBy(dx, dy);
                    this.setState({ rtlOffset: mutation.getRelativeToSurfaceXY().x });
                    return;
                }
                if (mutation.width > metrics.viewWidth) {
                    dx = dx + mutation.width - metrics.viewWidth;
                }
            }
            else {
                dx = (metrics.viewWidth / 2) - (mutation.width / 2) - x;
                // If the procedure declaration is wider than the view width,
                // keep the right-hand side of the procedure in view.
                if (mutation.width > metrics.viewWidth) {
                    dx = metrics.viewWidth - mutation.width - x;
                }
            }
            mutation.moveBy(dx, dy);
        });
        mutation.domToMutation(this.props.initialData);
        mutation.initSvg();
        mutation.render();
        log.debug("created my blocks workspace:", workspace);
        this.props.callback(mutation);
    }
    onWindowResize(e) {
        this.controller.resizeWorkspace();
    }
    injectBlockly() {
        log.debug("injecting blockly workspace");
        const rtlEnabled = this.props.rtlEnabled;
        this.controller.disposeWorkspace();
        this.controller.injectBlockly(this.refBlocklyDiv.current, rtlEnabled);
    }
    render() {
        return (React.createElement("div", { className: "my_block_blockly_wrapper" },
            React.createElement("div", { className: "my_blockcontent blockly" },
                React.createElement("div", { className: "myBlockBlocklyDiv", ref: this.refBlocklyDiv }))));
    }
}
exports.BlocklyMyBlockWorkspace = BlocklyMyBlockWorkspace;


/***/ }),

/***/ "./node_modules/@vexcode/blockly-react-component/dist/react/BlocklyWorkspace.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@vexcode/blockly-react-component/dist/react/BlocklyWorkspace.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const logger = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
const log = logger.getLogger("BlocklyWorkspace");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();
const React = __webpack_require__(/*! react */ "react");
// TODO: handle RTL change
class BlocklyWorkspace extends React.Component {
    constructor(props) {
        super(props);
        // Creates the blockly ref as an HTMLDivElement...
        this.refBlocklyDiv = React.createRef();
        this.controller = null;
        this.state = {};
        this.onWindowResize = this.onWindowResize.bind(this);
        this.controller = props.controller;
    }
    async componentDidUpdate(prevProps) {
        // we just want to detect controller changes
        if (this.controller.uuid !== this.props.controller.uuid) {
            log.error("unexpected controller change. will continue to use old controller", this.controller);
        }
        // Dispose current and create new Blockly Workspace if current
        // and previous RTL flags don't match
        if (this.props.rtlEnabled !== prevProps.rtlEnabled) {
            log.info("Stashing workspace content");
            const stash = this.controller.getWorkspaceContents();
            log.info("Disposing and creating new workspace");
            this.injectBlockly();
            log.info("Loading previous workspace content");
            this.controller.loadWorkspace(stash);
            // Using a brief wait to only move blocks and clear undo/redo
            // after the workspace is ready
            await this.controller.waitForWorkspaceReady();
            this.controller.clearUndoRedoStack();
            log.info("Cleared undo/redo stack");
        }
    }
    componentDidMount() {
        log.debug(this.refBlocklyDiv.current);
        this.injectBlockly();
        this.controller.newWorkspace();
    }
    onWindowResize(e) {
        // trigger a workspace resize if the window resizes
        this.controller.resizeWorkspace();
    }
    injectBlockly() {
        log.debug("injecting blockly workspace");
        const rtlEnabled = this.props.rtlEnabled;
        this.controller.disposeWorkspace();
        this.controller.injectBlockly(this.refBlocklyDiv.current, rtlEnabled);
    }
    render() {
        return (React.createElement("div", { className: "blockly_wrapper" },
            React.createElement("div", { className: "content blockly", ref: this.refBlocklyDiv })));
    }
}
exports.BlocklyWorkspace = BlocklyWorkspace;


/***/ })

});
//# sourceMappingURL=c949e79b696eced231b3.1.bundle.js.map