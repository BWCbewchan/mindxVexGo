this["webpackChunkwebapp"]([21],{

/***/ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/BitManipulations.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/BitManipulations.js ***!
  \**************************************************************************************/
/*! exports provided: Byte, Int8, UInt8, Int32, UInt32, Int16, UInt16, uint32ToByteArray, uint16ToByteArray, byteArrayToUint32, byteArrayToInt32, ToUint32, uint16, isBigEndian */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Byte", function() { return Byte; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Int8", function() { return Int8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UInt8", function() { return UInt8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Int32", function() { return Int32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UInt32", function() { return UInt32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Int16", function() { return Int16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UInt16", function() { return UInt16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uint32ToByteArray", function() { return uint32ToByteArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uint16ToByteArray", function() { return uint16ToByteArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "byteArrayToUint32", function() { return byteArrayToUint32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "byteArrayToInt32", function() { return byteArrayToInt32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToUint32", function() { return ToUint32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uint16", function() { return uint16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBigEndian", function() { return isBigEndian; });
class Byte {
    constructor(Value) {
        this.Number = new Uint8Array(1);
        this.Number[0] = Value;
    }
    Get() {
        return this.Number[0];
    }
    Set(newValue) {
        this.Number[0] = newValue;
    }
}
function checkAllIntType(Value) {
    return Value instanceof Int8 || Value instanceof UInt8 || Value instanceof Int16 || Value instanceof UInt16 || Value instanceof Int32 || Value instanceof UInt32;
}
class Int8 {
    constructor(Value) {
        this.Number = new DataView(new ArrayBuffer(1));
        this.Set(Value);
    }
    Get() {
        return this.Number.getInt8(0);
    }
    Set(Value) {
        let initValue = 0;
        if (Value instanceof Int8 || Value instanceof UInt8 || Value instanceof Int16 || Value instanceof UInt16 || Value instanceof Int32 || Value instanceof UInt32) {
            initValue = Value.Get();
        }
        else {
            initValue = Value;
        }
        this.Number.setInt8(0, initValue);
    }
}
class UInt8 {
    constructor(Value) {
        this.Number = new DataView(new ArrayBuffer(1));
        this.Set(Value);
    }
    Get() {
        return this.Number.getUint8(0);
    }
    Set(Value) {
        let initValue = 0;
        if (Value instanceof Int8 || Value instanceof UInt8 || Value instanceof Int16 || Value instanceof UInt16 || Value instanceof Int32 || Value instanceof UInt32) {
            initValue = Value.Get();
        }
        else {
            initValue = Value;
        }
        this.Number.setUint8(0, initValue);
    }
}
class Int32 {
    constructor(Value) {
        this.Number = new DataView(new ArrayBuffer(4));
        this.Set(Value);
    }
    Get() {
        return this.Number.getInt32(0, true);
    }
    Set(Value) {
        let initValue = 0;
        if (Value instanceof Int8 || Value instanceof UInt8 || Value instanceof Int16 || Value instanceof UInt16 || Value instanceof Int32 || Value instanceof UInt32) {
            initValue = Value.Get();
        }
        else {
            initValue = Value;
        }
        this.Number.setInt32(0, initValue, true);
    }
}
class UInt32 {
    constructor(Value) {
        this.Number = new DataView(new ArrayBuffer(4));
        this.Set(Value);
    }
    Get() {
        return this.Number.getUint32(0, true);
    }
    Set(Value) {
        let initValue = 0;
        if (Value instanceof Int8 || Value instanceof UInt8 || Value instanceof Int16 || Value instanceof UInt16 || Value instanceof Int32 || Value instanceof UInt32) {
            initValue = Value.Get();
        }
        else {
            initValue = Value;
        }
        this.Number.setUint32(0, initValue, true);
    }
}
// tslint:disable-next-line: max-classes-per-file
class Int16 {
    constructor(Value) {
        this.Number = new DataView(new ArrayBuffer(2));
        this.Set(Value);
    }
    Get() {
        return this.Number.getInt16(0, true);
    }
    Set(Value) {
        let initValue = 0;
        if (Value instanceof Int8 || Value instanceof UInt8 || Value instanceof Int16 || Value instanceof UInt16 || Value instanceof Int32 || Value instanceof UInt32) {
            initValue = Value.Get();
        }
        else {
            initValue = Value;
        }
        this.Number.setInt16(0, initValue, true);
    }
}
// tslint:disable-next-line: max-classes-per-file
class UInt16 {
    constructor(Value) {
        this.Number = new DataView(new ArrayBuffer(2));
        this.Set(Value);
    }
    Get() {
        return this.Number.getUint16(0, true);
    }
    Set(Value) {
        let initValue = 0;
        if (Value instanceof Int8 || Value instanceof UInt8 || Value instanceof Int16 || Value instanceof UInt16 || Value instanceof Int32 || Value instanceof UInt32) {
            initValue = Value.Get();
        }
        else {
            initValue = Value;
        }
        this.Number.setUint16(0, initValue, true);
    }
}
function uint32ToByteArray(source) {
    const uint32Num = new UInt32(source);
    const byteNum = new Byte(0);
    const byteArr = new Uint8Array(4);
    for (let i = 0; i < 4; i++) {
        if (source > 255) {
            uint32Num.Set(source / 256);
            byteNum.Set(source - uint32Num.Get() * 256);
        }
        else {
            byteNum.Set(uint32Num.Get());
            uint32Num.Set(0);
        }
        byteArr[i] = byteNum.Get();
        source = uint32Num.Get();
    }
    return (byteArr);
}
function uint16ToByteArray(source) {
    const dv = new DataView(new ArrayBuffer(2));
    dv.setUint16(0, source, true);
    return new Uint8Array(dv.buffer);
}
function byteArrayToUint32(sourceByteArray) {
    const DV = new DataView(new ArrayBuffer(4));
    DV.setUint8(0, sourceByteArray[0]);
    DV.setUint8(1, sourceByteArray[1]);
    DV.setUint8(2, sourceByteArray[2]);
    DV.setUint8(3, sourceByteArray[3]);
    return DV.getUint32(0, true);
}
function byteArrayToInt32(sourceByteArray) {
    const DV = new DataView(new ArrayBuffer(4));
    DV.setUint8(0, sourceByteArray[0]);
    DV.setUint8(1, sourceByteArray[1]);
    DV.setUint8(2, sourceByteArray[2]);
    DV.setUint8(3, sourceByteArray[3]);
    return DV.getInt32(0, true);
}
function ToUint32(n) {
    return n >>> 0;
}
function uint16(n) {
    return n & 0xFFFF;
}
/** @returns {Boolean} true if system is big endian */
function isBigEndian() {
    const array = new Uint8Array(4);
    const view = new Uint32Array(array.buffer);
    return !((view[0] = 1) & array[0]);
}


/***/ }),

/***/ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/EventSystem.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/EventSystem.js ***!
  \*********************************************************************************/
/*! exports provided: on, off, fireEvent, getSubscriberCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fireEvent", function() { return fireEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSubscriberCount", function() { return getSubscriberCount; });
const eventCallbacks = {
    "VEXBLEBrowser.DeviceInfo": [],
    "VEXBLEBrowser.ConnectionState": [],
    "VEXBLEBrowser.SensorStatus": [],
    "VEXBLEBrowser.PortCommandStatus": [],
    "VEXBLEBrowser.FWUpdateProgress": [],
    "VEXBLEBrowser.FWUpdateComplete": [],
    "VEXBLEBrowser.PortConfig": [],
    "VEXBLEBrowser.UserSettingsStatus": [],
    "VEXBLEBrowser.AckReceived": [],
    // TODO: the below will become obsolete soon
    "VEXBLEBrowser.ProgramStatus": [],
    "VEXBLEBrowser.BotStatus": [],
    "VEXBLEBrowser.SensorUpdate": [],
    "VEXBLEBrowser.GyroUpdate": [],
    "VEXBLEBrowser.PortUpdate": [],
};
function getSubscriberCount(eventName) {
    return eventCallbacks[eventName].length;
}
function on(eventName, callback) {
    if (eventCallbacks[eventName].indexOf(callback) >= 0) {
        return;
    }
    eventCallbacks[eventName].push(callback);
}
function off(eventName, callback) {
    const i = eventCallbacks[eventName].indexOf(callback);
    if (i < 0) {
        console.warn("Unknown callback.");
        return;
    }
    eventCallbacks[eventName].splice(i, 1);
}
function fireEvent(eventName, ...args) {
    if (eventCallbacks[eventName]) {
        eventCallbacks[eventName].forEach((callback) => {
            callback(...args);
        });
    }
}



/***/ }),

/***/ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/LocalStorage.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/LocalStorage.js ***!
  \**********************************************************************************/
/*! exports provided: save, load, getResourceFolder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "save", function() { return save; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "load", function() { return load; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResourceFolder", function() { return getResourceFolder; });
function save(name, asset) {
    return new Promise((resolve, reject) => {
        saveToLocalStorage(name, asset)
            .then((result) => {
            resolve(result);
        })
            .catch(() => {
            reject();
        });
    });
}
function load(name, maxAge) {
    return new Promise((resolve, reject) => {
        readFromLocalStorage(name, maxAge)
            .then((asset) => {
            resolve(asset);
        })
            .catch(() => {
            reject();
        });
    });
}
function getResourceFolder() {
    // return "chrome-extension://" + chrome.runtime.id + "/resources/";
    return "resources";
}
function saveToLocalStorage(name, asset) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get('app_prefs', (result) => {
                let prefs = undefined;
                if (result !== undefined && result.app_prefs !== undefined)
                    prefs = JSON.parse(result.app_prefs);
                if (!prefs) {
                    // never set
                    prefs = { app_prefs: {} };
                }
                prefs.app_prefs[name] = asset;
                chrome.storage.local.set({ 'app_prefs': JSON.stringify(prefs) }, () => {
                    if (chrome.runtime.lastError) {
                        console.log('storage: ' + chrome.runtime.lastError.message);
                        resolve(0);
                    }
                    chrome.storage.local.getBytesInUse('app_prefs', (num) => {
                        console.log('storage: ' + num + ' bytes used');
                        resolve(num);
                    });
                });
            });
        }
        catch (e) {
            console.log('storage: not available');
            resolve(undefined);
        }
    });
}
function readFromLocalStorage(name, maxAge) {
    return new Promise((resolve, reject) => {
        try {
            // see if we have vexos object
            chrome.storage.local.get('app_prefs', (result) => {
                let prefs = undefined;
                if (result !== undefined && result.app_prefs !== undefined)
                    prefs = JSON.parse(result.app_prefs);
                if (!prefs) {
                    // never set
                    resolve(undefined);
                    return;
                }
                let obj = prefs.app_prefs[name];
                if (!obj) {
                    // never set
                    resolve(undefined);
                    return;
                }
                resolve(obj);
            });
        }
        catch (e) {
            console.log('storage: not available');
            resolve(undefined);
        }
    });
}


/***/ }),

/***/ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/ProgramUtil.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/ProgramUtil.js ***!
  \*********************************************************************************/
/*! exports provided: ProgramConst, ProgramCommands, scriptLineToCommand, getStringForCommandID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgramConst", function() { return ProgramConst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgramCommands", function() { return ProgramCommands; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scriptLineToCommand", function() { return scriptLineToCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStringForCommandID", function() { return getStringForCommandID; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/vex-ble-device-manager/node_modules/@rm-vca/logger/dist/logger.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BitManipulations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BitManipulations */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/BitManipulations.js");

const log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("vex-web-ble-device-manager");
log.setLevel(log.levels.INFO);

var ProgramCommands;
(function (ProgramCommands) {
    ProgramCommands[ProgramCommands["CMD_FWD"] = 1] = "CMD_FWD";
    ProgramCommands[ProgramCommands["CMD_FWD_FOR"] = 2] = "CMD_FWD_FOR";
    // CMD_FWD_TO =          0x03  // 0x(FF)Vel(mmps)(unsigned) (FFFF)mm(signed) (FF)CMD ID
    ProgramCommands[ProgramCommands["CMD_FWD_UNTIL"] = 4] = "CMD_FWD_UNTIL";
    ProgramCommands[ProgramCommands["CMD_TURN"] = 17] = "CMD_TURN";
    ProgramCommands[ProgramCommands["CMD_TURN_FOR"] = 18] = "CMD_TURN_FOR";
    ProgramCommands[ProgramCommands["CMD_TURN_TO"] = 19] = "CMD_TURN_TO";
    ProgramCommands[ProgramCommands["CMD_TURN_UNTIL"] = 20] = "CMD_TURN_UNTIL";
    ProgramCommands[ProgramCommands["CMD_TURN_RAND"] = 21] = "CMD_TURN_RAND";
    ProgramCommands[ProgramCommands["CMD_ARM_TILT"] = 22] = "CMD_ARM_TILT";
    ProgramCommands[ProgramCommands["CMD_ARM_TILT_FOR"] = 23] = "CMD_ARM_TILT_FOR";
    ProgramCommands[ProgramCommands["CMD_ARM_TILT_TO"] = 24] = "CMD_ARM_TILT_TO";
    ProgramCommands[ProgramCommands["CMD_STOP_DRIVE"] = 31] = "CMD_STOP_DRIVE";
    ProgramCommands[ProgramCommands["CMD_RESET_POS"] = 33] = "CMD_RESET_POS";
    ProgramCommands[ProgramCommands["CMD_RESET_HEADING"] = 34] = "CMD_RESET_HEADING";
    ProgramCommands[ProgramCommands["CMD_CAL_GYRO"] = 35] = "CMD_CAL_GYRO";
    ProgramCommands[ProgramCommands["CMD_SET_HEADING"] = 49] = "CMD_SET_HEADING";
    ProgramCommands[ProgramCommands["CMD_SET_VELOCITY"] = 50] = "CMD_SET_VELOCITY";
    ProgramCommands[ProgramCommands["CMD_SET_TURNRATE"] = 51] = "CMD_SET_TURNRATE";
    ProgramCommands[ProgramCommands["CMD_SET_TIMEOUT"] = 52] = "CMD_SET_TIMEOUT";
    ProgramCommands[ProgramCommands["CMD_SET_STOPPING"] = 53] = "CMD_SET_STOPPING";
    ProgramCommands[ProgramCommands["CMD_SET_DRIVE_ACC"] = 54] = "CMD_SET_DRIVE_ACC";
    ProgramCommands[ProgramCommands["CMD_SET_DRIVE_SENS"] = 55] = "CMD_SET_DRIVE_SENS";
    ProgramCommands[ProgramCommands["CMD_SOUND"] = 65] = "CMD_SOUND";
    ProgramCommands[ProgramCommands["CMD_SET_VOLUME"] = 66] = "CMD_SET_VOLUME";
    ProgramCommands[ProgramCommands["CMD_LED_COLOR"] = 81] = "CMD_LED_COLOR";
    ProgramCommands[ProgramCommands["CMD_GLOW"] = 82] = "CMD_GLOW";
    ProgramCommands[ProgramCommands["CMD_SET_FLOOR_THRESH"] = 90] = "CMD_SET_FLOOR_THRESH";
    ProgramCommands[ProgramCommands["CMD_SET_FLOOR_LED"] = 91] = "CMD_SET_FLOOR_LED";
    ProgramCommands[ProgramCommands["CMD_ACT"] = 180] = "CMD_ACT";
    // Control
    ProgramCommands[ProgramCommands["CMD_WAIT_UNTIL"] = 96] = "CMD_WAIT_UNTIL";
    ProgramCommands[ProgramCommands["CMD_DELAY"] = 97] = "CMD_DELAY";
    // Start Conditionals
    ProgramCommands[ProgramCommands["CMD_IF_PROX"] = 98] = "CMD_IF_PROX";
    ProgramCommands[ProgramCommands["CMD_IF_COLOR"] = 99] = "CMD_IF_COLOR";
    ProgramCommands[ProgramCommands["CMD_IF_CRASH"] = 100] = "CMD_IF_CRASH";
    ProgramCommands[ProgramCommands["CMD_IF_BUTTON"] = 101] = "CMD_IF_BUTTON";
    ProgramCommands[ProgramCommands["CMD_IF_LIGHT"] = 102] = "CMD_IF_LIGHT";
    ProgramCommands[ProgramCommands["CMD_ELSE"] = 110] = "CMD_ELSE";
    ProgramCommands[ProgramCommands["CMD_ENDIF"] = 111] = "CMD_ENDIF";
    // End Conditionals
    ProgramCommands[ProgramCommands["CMD_P_SPIN"] = 113] = "CMD_P_SPIN";
    ProgramCommands[ProgramCommands["CMD_P_SPIN_FOR"] = 114] = "CMD_P_SPIN_FOR";
    ProgramCommands[ProgramCommands["CMD_P_SPIN_TO"] = 115] = "CMD_P_SPIN_TO";
    ProgramCommands[ProgramCommands["CMD_P_SPIN_TO_A"] = 116] = "CMD_P_SPIN_TO_A";
    ProgramCommands[ProgramCommands["CMD_P_STOP"] = 121] = "CMD_P_STOP";
    ProgramCommands[ProgramCommands["CMD_P_SET_POS"] = 122] = "CMD_P_SET_POS";
    ProgramCommands[ProgramCommands["CMD_P_SET_VEL"] = 123] = "CMD_P_SET_VEL";
    ProgramCommands[ProgramCommands["CMD_P_SET_I_LIMIT"] = 124] = "CMD_P_SET_I_LIMIT";
    ProgramCommands[ProgramCommands["CMD_P_SET_BRAKE"] = 125] = "CMD_P_SET_BRAKE";
    ProgramCommands[ProgramCommands["CMD_P_SET_TIMEOUT"] = 126] = "CMD_P_SET_TIMEOUT";
    ProgramCommands[ProgramCommands["CMD_P_SET_STALL_TO"] = 127] = "CMD_P_SET_STALL_TO";
    ProgramCommands[ProgramCommands["CMD_P_MAG_SET_POWER"] = 129] = "CMD_P_MAG_SET_POWER";
    ProgramCommands[ProgramCommands["CMD_P_DROP"] = 130] = "CMD_P_DROP";
    ProgramCommands[ProgramCommands["CMD_P_BOOST"] = 131] = "CMD_P_BOOST";
    ProgramCommands[ProgramCommands["CMD_P_HOLD"] = 132] = "CMD_P_HOLD";
    ProgramCommands[ProgramCommands["CMD_P_SET_LED"] = 133] = "CMD_P_SET_LED";
    ProgramCommands[ProgramCommands["CMD_GOTO"] = 144] = "CMD_GOTO";
    ProgramCommands[ProgramCommands["CMD_END"] = 145] = "CMD_END";
    ProgramCommands[ProgramCommands["CMD_PAUSE"] = 146] = "CMD_PAUSE";
    // Sensor commmands
    ProgramCommands[ProgramCommands["CMD_SET_SENS_LED"] = 176] = "CMD_SET_SENS_LED";
    ProgramCommands[ProgramCommands["CMD_SET_SENS_PROX"] = 177] = "CMD_SET_SENS_PROX";
    ProgramCommands[ProgramCommands["CMD_NO_COMMAND"] = 255] = "CMD_NO_COMMAND";
})(ProgramCommands || (ProgramCommands = {}));
var ProgramConst;
(function (ProgramConst) {
    ProgramConst[ProgramConst["PROG_CMD_NONE"] = 0] = "PROG_CMD_NONE";
    ProgramConst[ProgramConst["PROG_CMD_STOP"] = 1] = "PROG_CMD_STOP";
    ProgramConst[ProgramConst["PROG_CMD_STEP"] = 2] = "PROG_CMD_STEP";
    ProgramConst[ProgramConst["PROG_CMD_PLAY"] = 3] = "PROG_CMD_PLAY";
    ProgramConst[ProgramConst["PROG_CMD_PAUSE"] = 4] = "PROG_CMD_PAUSE";
    ProgramConst[ProgramConst["PROG_CMD_ADD"] = 16] = "PROG_CMD_ADD";
    ProgramConst[ProgramConst["PROG_CMD_REMOVE"] = 17] = "PROG_CMD_REMOVE";
    ProgramConst[ProgramConst["PROG_CMD_REMOVE_ALL"] = 18] = "PROG_CMD_REMOVE_ALL";
    ProgramConst[ProgramConst["PROG_CMD_ADD_CARD_ID"] = 19] = "PROG_CMD_ADD_CARD_ID";
    ProgramConst[ProgramConst["PROG_CMD_SET_CMD_DELAY"] = 26] = "PROG_CMD_SET_CMD_DELAY";
    ProgramConst[ProgramConst["PROG_CMD_SET_IGNORE_CONN_DROP"] = 27] = "PROG_CMD_SET_IGNORE_CONN_DROP";
    ProgramConst[ProgramConst["PROG_CMD_SET_USER_SETTINGS"] = 28] = "PROG_CMD_SET_USER_SETTINGS";
    ProgramConst[ProgramConst["PROG_CMD_GET_USER_SETTINGS"] = 29] = "PROG_CMD_GET_USER_SETTINGS";
    ProgramConst[ProgramConst["PROG_CMD_EXE_SINGLE"] = 32] = "PROG_CMD_EXE_SINGLE";
    ProgramConst[ProgramConst["PROG_CMD_CLEAR_PORT_EVENTS"] = 33] = "PROG_CMD_CLEAR_PORT_EVENTS";
    ProgramConst[ProgramConst["PROG_CMD_RAW_PWM"] = 48] = "PROG_CMD_RAW_PWM";
    ProgramConst[ProgramConst["PROG_CMD_SET_BOT_NAME"] = 64] = "PROG_CMD_SET_BOT_NAME";
    ProgramConst[ProgramConst["PROG_CMD_SET_BOT_CONFIG_PRESET"] = 80] = "PROG_CMD_SET_BOT_CONFIG_PRESET";
    ProgramConst[ProgramConst["PROG_CMD_SET_PORT_CONFIG"] = 81] = "PROG_CMD_SET_PORT_CONFIG";
    ProgramConst[ProgramConst["PROG_CMD_SET_PROD_TEST_MODE"] = 82] = "PROG_CMD_SET_PROD_TEST_MODE";
    ProgramConst[ProgramConst["PROG_CMD_LOCATE"] = 112] = "PROG_CMD_LOCATE";
    ProgramConst[ProgramConst["PROG_CMD_GET_CONN_INT"] = 144] = "PROG_CMD_GET_CONN_INT";
    ProgramConst[ProgramConst["PROG_CMD_CODER_READ_CARDS"] = 96] = "PROG_CMD_CODER_READ_CARDS";
    ProgramConst[ProgramConst["PROG_CMD_CODER_RUN_LEDS"] = 97] = "PROG_CMD_CODER_RUN_LEDS";
    ProgramConst[ProgramConst["CODER_CMD_CODER_READ_REG"] = 98] = "CODER_CMD_CODER_READ_REG";
    ProgramConst[ProgramConst["CODER_CMD_CODER_WRITE_REG"] = 99] = "CODER_CMD_CODER_WRITE_REG";
    ProgramConst[ProgramConst["PROG_CMD_CODER_SET_STATE"] = 100] = "PROG_CMD_CODER_SET_STATE";
    ProgramConst[ProgramConst["CODER_CMD_SET_USER_SETTINGS"] = 101] = "CODER_CMD_SET_USER_SETTINGS";
    ProgramConst[ProgramConst["CODER_CMD_GET_USER_SETTINGS"] = 102] = "CODER_CMD_GET_USER_SETTINGS";
    ProgramConst[ProgramConst["CODER_CMD_CLEAR_PAIR"] = 105] = "CODER_CMD_CLEAR_PAIR";
    ProgramConst[ProgramConst["PROG_CMD_SET_BUTTON_CMD"] = 160] = "PROG_CMD_SET_BUTTON_CMD";
    ProgramConst[ProgramConst["PROG_CMD_SET_CONTROLL_VALUES"] = 161] = "PROG_CMD_SET_CONTROLL_VALUES";
    ProgramConst[ProgramConst["PROG_CMD_SAVE_CONTROL_CONFIG_CMD"] = 162] = "PROG_CMD_SAVE_CONTROL_CONFIG_CMD";
    ProgramConst[ProgramConst["PROG_CMD_SET_STICK_MODE_CMD"] = 163] = "PROG_CMD_SET_STICK_MODE_CMD";
})(ProgramConst || (ProgramConst = {}));
const CommandStrings = {};
function initCommandString() {
    CommandStrings[ProgramCommands.CMD_FWD] = "Drive";
}
initCommandString();
function getStringForCommandID(CmdID) {
    // TODO: needs to implement this for all the commands
    const name = CommandStrings[CmdID];
    if (name) {
        return name;
    }
    return "Unknown";
}
function scriptLineToCommand(script) {
    let retVal = 0;
    try {
        if (!script) {
            return retVal;
        }
        script = script.trim();
        const parts = script.split(" ") || [];
        if (parts.length === 0) {
            return retVal;
        }
        const command = parts[0].toUpperCase().trim();
        switch (command) {
            case "SET_FLOOR_THRESH": {
                // Description: Set 123 line detction threshold
                // Format SET_FLOOR_THRESH NewThresh
                // NewThresh: 0 < value > 4096
                if (parts.length < 2) {
                    break;
                }
                const colorID = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                retVal = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_SET_FLOOR_THRESH)).Get();
                retVal += (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](colorID)).Get() << 8)).Get();
                break;
            }
            case "SET_FLOOR_LED": {
                // Description: Set 123 line detction led on or off
                // Format SET_FLOOR_LED enable
                // enable: != 0 == on
                if (parts.length < 2) {
                    break;
                }
                const colorID = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                retVal = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_SET_FLOOR_LED)).Get();
                retVal += (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](colorID)).Get() << 8)).Get();
                break;
            }
            case "ACT": {
                // Description: Have 123 perform an action
                // Format ACT actionID
                // actionID: {NA=0, Happy=1, Sad=2, Crazy=3}
                if (parts.length < 2) {
                    break;
                }
                const act = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                retVal = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_ACT)).Get();
                retVal += (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](act)).Get() << 8)).Get();
                break;
            }
            case "SET_RGB": {
                // Description: Set 123 LED RGB
                // Format SET_RGB red green blue
                // red: 0-255
                // green: 0-255
                // blue: 0-255
                if (parts.length < 4) {
                    break;
                }
                const r = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10))).Get();
                const g = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[2], 10))).Get();
                const b = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[3], 10))).Get();
                retVal = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_LED_COLOR)).Get();
                retVal += (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](b)).Get() << 8)).Get();
                retVal += (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](g)).Get() << 16)).Get();
                retVal += (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](r)).Get() << 24)).Get();
                break;
            }
            case "GLOW": {
                // Description: Set 123 LED RGB by color ID
                // Format GLOW Color_ID
                // Color_ID: {off=0, red=1, green=2, blue=3, yellow=4, cyan=5, magenta=6, orange=7, white=8}
                if (parts.length < 2) {
                    break;
                }
                const colorID = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10))).Get();
                retVal = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_GLOW)).Get();
                retVal += (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](colorID)).Get() << 8)).Get();
                break;
            }
            case "SET_STOPPING": {
                // Description: Sets brake mode for drivetrain
                // Format "SET_STOPPING newBrakeMode"
                // Port = 0 - 3
                // newBrakeMode = (1 = Brake), (2 = Coast), (3 = Hold)
                let newPos = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](0)).Get();
                if (parts.length > 1) {
                    newPos = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10))).Get();
                }
                retVal = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_SET_STOPPING)).Get();
                retVal += (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"]((new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newPos)).Get() << 8)).Get();
                break;
            }
            case "SET_ACC": {
                // Description: Sets acceleration profile for drive
                // Format "SET_ACC newAccel"
                // newAccel = 1 -> 4 (faster acceleration -> slower Acceleration)
                let newAcc = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int8"](0)).Get();
                if (parts.length > 1) {
                    newAcc = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int8"](parseInt(parts[1], 10))).Get();
                }
                retVal = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_SET_DRIVE_ACC)).Get();
                retVal += (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"]((new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newAcc)).Get() << 8)).Get();
                break;
            }
            case "SET_SENS": {
                // Description: Set control drive sensetivity.
                // Format "SET_SENS newSensitivity"
                // newSensitivity = 1 -> 100 (%)
                let newAcc = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int8"](100)).Get();
                if (parts.length > 1) {
                    newAcc = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int8"](parseInt(parts[1], 10))).Get();
                }
                retVal = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_SET_DRIVE_SENS)).Get();
                retVal += (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"]((new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newAcc)).Get() << 8)).Get();
                break;
            }
            case "SET_VELOCITY": {
                // Description: Sets target velocity of drivetrain
                // Format "SET_VELOCITY newVelocity(optional)"
                // newVelocity = new target velocity in mm(123) or degrees(Go) if blank newVelocity = 0
                let newPos = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](0)).Get();
                if (parts.length > 1) {
                    newPos = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10))).Get();
                }
                retVal = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_SET_VELOCITY)).Get();
                retVal += (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"]((new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newPos)).Get() << 8)).Get();
                break;
            }
            case "SET_HEADING": {
                // Description: Sets target heading of drivetrain
                // Format "SET_HEADING newHeading(optional)"
                // newHeading = new target heading in degrees if blank newHeading = 0
                let newPos = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](0)).Get();
                if (parts.length > 1) {
                    newPos = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10))).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_SET_HEADING).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newPos).Get() << 8).Get();
                break;
            }
            case "SET_TIMEOUT": {
                // Description: Sets target drive and turn timeout for the drivetrain
                // Format "SET_TIMEOUT newTimeout(optional)"
                // newTimeout = new command timout in ms(unsigned). 0 == return to default;
                let newTimeout = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](0).Get();
                if (parts.length > 1) {
                    newTimeout = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](parseInt(parts[1], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_SET_TIMEOUT).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newTimeout).Get() << 8).Get();
                break;
            }
            case "SET_TURNRATE": {
                // Description: Sets turn rate of drivetrain
                // Format "SET_TURNRATE newTurnRate(optional)"
                // newTurnRate = new turn rate in degrees per second if blank turnRate = 0
                let newPos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](0).Get();
                if (parts.length > 1) {
                    newPos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_SET_TURNRATE).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newPos).Get() << 8).Get();
                break;
            }
            case "CAL_GYRO": {
                // Description: Calibrates the gyro and blocks until done. Heading will reset to 0
                // Format "CAL_GYRO"
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_CAL_GYRO).Get();
                break;
            }
            case "RESET_HEADING": {
                // Description: Sets the reported heading of the drivetrain
                // Format "RESET_HEADING newHeading(optional)"
                // newHeading = new heading in degrees. If blank newHeading = 0
                let newPos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](0).Get();
                if (parts.length > 1) {
                    newPos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_RESET_HEADING).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newPos).Get() << 8).Get();
                break;
            }
            case "RESET_POS": {
                // Description: Sets the reported position of the drivetrain
                // Format: "RESET_POS newPos(optional)"
                // newPos = new position in mm (123) or degrees (Go)
                let newPos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](0).Get();
                if (parts.length > 1) {
                    newPos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_RESET_POS).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newPos).Get() << 8).Get();
                break;
            }
            case "DELAY": {
                // Description: Pauses script for time
                // Format: DELAY count
                // count = ms to delay
                let delay = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](0).Get();
                if (parts.length > 1) {
                    delay = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](parseInt(parts[1], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_DELAY).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](delay << 8).Get();
                break;
            }
            case "WAIT": {
                // Description: Pauses script for time
                // Format: WAIT count
                // count = ms to delay
                let delay = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](0).Get();
                if (parts.length > 1) {
                    delay = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](parseInt(parts[1], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_DELAY).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](delay << 8).Get();
                break;
            }
            case "DRIVE_STOP": {
                // Description: Stops all motors on drivetrain
                // Format DRIVE_STOP breakMode(optional)
                // breakMode = vexBreakMode
                let breakMode = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](0).Get();
                if (parts.length > 1) {
                    breakMode = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_STOP_DRIVE).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](breakMode).Get() << 8).Get();
                break;
            }
            case "DRIVE": {
                // Description: Start driving at a velocity
                // Format DRIVE vel
                // vel = mm per second (123) or deg per second (Go)
                if (parts.length < 2) {
                    break;
                }
                const vel = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10))).Get();
                retVal = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_FWD)).Get();
                retVal += (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"]((vel << 8))).Get();
                break;
            }
            case "DRIVE_FOR": {
                // Description: Drive a distance and stop
                // Format DRIVE_FOR dist vel(optional)
                // dist = mm
                // vel = mm per second (123) or percent (Go)
                if (parts.length < 2) {
                    break;
                }
                const dist = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10))).Get();
                let vel = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](0)).Get();
                if (parts.length > 2) {
                    const testVel = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[2], 10))).Get();
                    if (testVel > 100) {
                        vel = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](100)).Get();
                    }
                    else if (testVel < 0) {
                        // error
                        break;
                    }
                    else {
                        vel = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](testVel)).Get();
                    }
                }
                retVal = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_FWD_FOR)).Get();
                retVal += (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](dist)).Get() << 8)).Get();
                retVal += (new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](vel)).Get() << 24)).Get();
                break;
            }
            case "DRIVE_UNTIL": {
                // Description: Drive until an event is set
                // Format DRIVE_UNTIL event vel
                // event = 1 = Crash, 2 = Obj Detected, 3 = Btn 1 pressed, 4 = Btn2, 5 = Btn 3, 6 = Btn4
                // vel = mm per second (123) or deg per second (Go)
                if (parts.length < 2) {
                    break;
                }
                const event = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                let vel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](0).Get();
                if (parts.length > 2) {
                    vel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[2], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_FWD_UNTIL).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](event)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](vel)).Get() << 16).Get();
                break;
            }
            case "WAIT_UNTIL": {
                // Description: Block until an event is set
                // Format WAIT_UNTIL event
                // event = 1 = Crash, 2 = Obj Detected, 3 = Btn 1 pressed, 4 = Btn2, 5 = Btn 3, 6 = Btn4
                if (parts.length < 2) {
                    break;
                }
                const event = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_WAIT_UNTIL).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](event)).Get() << 8).Get();
                break;
            }
            case "TURN_UNTIL": {
                // Description: Drivetrain turn until an event is set
                // Format TURN_UNTIL event turnrate
                // event = 1 = Crash, 2 = Obj Detected, 3 = Btn 1 pressed, 4 = Btn2, 5 = Btn 3, 6 = Btn4
                // turnrate = deg per second
                if (parts.length < 2) {
                    break;
                }
                const event = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                let turnrate = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](0).Get();
                if (parts.length > 2) {
                    turnrate = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[2], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_TURN_UNTIL).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](event)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](turnrate)).Get() << 16).Get();
                break;
            }
            case "TURN_RANDOM": {
                // Description: Drivetrain turn for a random number of degrees (-360 - 360)
                // Format TURN_RANDOM vel(optional)
                // vel = mm per second (123) or deg per second (Go) (500 max)
                let Vel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](0).Get();
                if (parts.length > 1) {
                    Vel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_TURN_RAND).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](Vel)).Get() << 8).Get();
                break;
            }
            case "TURN_FOR": {
                // Description: Drivetrain turn for a number of degrees
                // Format TURN_FOR dist vel
                // dist = degrees (signed absolute)
                // vel = mm per second (123) or percent (Go)
                if (parts.length < 2) {
                    break;
                }
                const dist = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                let vel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](0).Get();
                if (parts.length > 2) {
                    const testVel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](parseInt(parts[2], 10)).Get();
                    if (testVel > 100) {
                        vel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](100).Get();
                    }
                    else {
                        vel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](testVel).Get();
                    }
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_TURN_FOR).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](dist)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](vel)).Get() << 24).Get();
                break;
            }
            case "TURN_TO": {
                // Description: Drivetrain turn to a set absolute heading
                // Format TURN_TO dist vel
                // dist = degrees (signed absolute)
                // vel = mm per second (123) or percent (Go)
                if (parts.length < 2) {
                    break;
                }
                const dist = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                let vel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](0).Get();
                if (parts.length > 2) {
                    const testVel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](parseInt(parts[2], 10)).Get();
                    if (testVel > 100) {
                        vel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](100).Get();
                    }
                    else {
                        vel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](testVel).Get();
                    }
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_TURN_TO).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](dist)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](vel)).Get() << 24).Get();
                break;
            }
            case "TURN": {
                // Description: Drivetrain start turning with velocity
                // Format TURN vel
                // vel = deg per second
                if (parts.length < 2) {
                    break;
                }
                const Vel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_TURN).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](Vel)).Get() << 8).Get();
                break;
            }
            case "IF_LIGHT": {
                // Description: Conditional, If light or dark?
                // Format "IF_LIGHT color"
                // value -1 = dark, 1 = light
                if (parts.length < 2) {
                    break;
                }
                const value = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_IF_LIGHT).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](value)).Get() << 8).Get();
                break;
            }
            case "IF_BUTTON": {
                // Description: Conditional, If button is pressed/released
                // Format "IF_BUTTON button state"
                // button = 1=Up,2=Rt,3=Dn,4=Lt)(Go Button = port)
                // state = 1 = pressed, -1 = released, 0 = either
                if (parts.length < 3) {
                    break;
                }
                const button = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                const state = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int8"](parseInt(parts[2], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_IF_BUTTON).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](button)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](state).Get() << 16).Get();
                break;
            }
            case "GOTO": {
                // Description: Jump program counter to command number
                // Format "GOTO line(optional)"
                // line = line number to go to (0 based)
                let line = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](0).Get();
                if (parts.length > 1 && parts[1] !== "") {
                    line = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_GOTO).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](line)).Get() << 8).Get();
                break;
            }
            case "IF_CRASH": {
                // Description: Conditional, If crash detected?
                // Format "IF_CRASH"
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_IF_CRASH).Get();
                break;
            }
            case "IF_COLOR": {
                // Description: Conditional, If color == (???)
                // Format "IF_COLOR color"
                // color = (Red = 1, Green = 2, Blue = 3, ...)
                if (parts.length < 2) {
                    break;
                }
                const color = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_IF_COLOR).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](color)).Get() << 8).Get();
                break;
            }
            case "IF_PROX": {
                // Description: Conditional, If proximity value is > < or == value
                // Format "IF_PROX operand value"
                // operand = 0 = "==", -1 = "<", 1 = ">"
                // value = 0 - 255
                if (parts.length < 3) {
                    break;
                }
                const operand = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int8"](parseInt(parts[1], 10)).Get();
                const value = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[2], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_IF_PROX).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](operand)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](value).Get() << 16).Get();
                break;
            }
            case "ELSE": {
                // Description: Conditional, Start of else section
                // Format "ELSE"
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_ELSE).Get();
                break;
            }
            case "END_IF": {
                // Description: Conditional, Ends an if statement.
                // Format "END_IF"
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_ENDIF).Get();
                break;
            }
            case "SET_SWITCH_LED": {
                // Description: Set Go bumper LED power > 0 == Green / < 0 == Red
                // Format "SET_SWITCH_LED port time"
                // Port = 0 - 3
                // power = -100 to 100 % power
                if (parts.length < 3) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                const power = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[2], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SET_LED).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](power).Get() << 16).Get();
                break;
            }
            case "MAG_HOLD": {
                // Description: Start the magnet holding at power. This had no time limit. You must set hold to 0 to stop.
                // Format "MAG_HOLD port time"
                // Port = 0 - 3
                // power = -100 to 100 % power
                if (parts.length < 3) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                const power = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int8"](parseInt(parts[2], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_HOLD).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](power).Get() << 16).Get();
                break;
            }
            case "MAG_BOOST": {
                // Description: Turn mag power on at boost power with timeout
                // Format "MAG_BOOST port time"
                // Port = 0 - 3
                // time = Time in ms
                if (parts.length < 3) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                const time = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](parseInt(parts[2], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_BOOST).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](time).Get() << 16).Get();
                break;
            }
            case "MAG_DROP": {
                // Description: Turn mag power on at -boost power with timeout
                // Format "MAG_DROP port time"
                // Port = 0 - 3
                // time = Time in ms
                if (parts.length < 3) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                const time = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](parseInt(parts[2], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_DROP).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](time).Get() << 16).Get();
                break;
            }
            case "MAG_SET_POWER": {
                // Description: Set mag power to be used when Boost/Drop
                // Format "MAG_SET_POWER port power"
                // Port = 0 - 3
                // power = 0%-100%
                if (parts.length < 3) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                const power = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[2], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_MAG_SET_POWER).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](power).Get() << 16).Get();
                break;
            }
            case "SET_I_LIMIT": {
                // Description: Set motor current limit
                // Format "SET_I_LIMIT port ILimit(optional)"
                // Port = 0 - 3
                // ilimit = new current limit in percent
                if (parts.length < 2) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                let newIlimit = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](0).Get();
                if (parts.length > 2) {
                    newIlimit = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](parseInt(parts[2], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SET_I_LIMIT).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newIlimit).Get() << 16).Get();
                break;
            }
            case "SET_MOTOR_TIMEOUT": {
                // Description: Set motor timeout
                // Format "SET_MOTOR_TIMEOUT port timeout"
                // Port = 0 - 3
                // timeout = new timeout in ms. 0 = no timeout. Dft = 5000
                if (parts.length < 3) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                let newTimeout = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](0).Get();
                if (parts.length > 2) {
                    newTimeout = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](parseInt(parts[2], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SET_TIMEOUT).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newTimeout).Get() << 16).Get();
                break;
            }
            case "SET_MOTOR_STALL_TIMEOUT": {
                // Description: Set motor timeout for stalls
                // Format "SET_MOTOR_STALL_TIMEOUT port timeout"
                // Port = 0 - 3
                // timeout = new timeout in ms. 0 = no timeout. Dft = 5000
                if (parts.length < 3) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                let newTimeout = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](0).Get();
                if (parts.length > 2) {
                    newTimeout = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](parseInt(parts[2], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SET_STALL_TO).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newTimeout).Get() << 16).Get();
                break;
            }
            case "SET_MOTOR_POS": {
                // Description: Set motor reported position
                // Format "SET_MOTOR_POS port newPos(optional)"
                // Port = 0 - 3
                // newPos = new position in mm (123) or degrees (Go) (blank = 0)
                if (parts.length < 2) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                let newPos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int32"](0).Get();
                if (parts.length > 2) {
                    newPos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int32"](parseInt(parts[2], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SET_POS).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newPos).Get() << 16).Get();
                break;
            }
            case "SET_MOTOR_VEL": {
                // Description: Set motor target velocity
                // Format "SET_MOTOR_POS port newVelocity"
                // Port = 0 - 3
                // newVelocity = new velocity in mmps (123) or degrees per sec (Go)
                if (parts.length < 3) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                const newVel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[2], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SET_VEL).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newVel).Get() << 16).Get();
                break;
            }
            case "SET_MOTOR_BRAKE": {
                // Description: Set motor target velocity
                // Format "SET_MOTOR_BRAKE port newBrakeMode"
                // Port = 0 - 3
                // newBrakeMode = (1 = Brake), (2 = Coast), (3 = Hold)
                if (parts.length < 3) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                const newVel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[2], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SET_BRAKE).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newVel).Get() << 16).Get();
                break;
            }
            case "STOP_MOTOR": {
                // Description: Stop motor from spinning
                // Format STOP_MOTOR port breakMode(optional)
                // port = 0 - 3
                // breakMode = vexBreakMode
                if (parts.length < 2) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                let breakMode = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](0).Get();
                if (parts.length > 2) {
                    breakMode = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[2], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_STOP).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](breakMode).Get() << 16).Get();
                break;
            }
            case "SPIN_TO": {
                // Description: Spin motor to position
                // Format SPIN_TO port position
                // port = 0 - 3
                // position(signed) = mm (123) or degrees (Go)
                if (parts.length < 3) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                const pos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[2], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SPIN_TO).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](pos)).Get() << 16).Get();
                break;
            }
            case "SPIN_FOR": {
                // Description: Spin motor for a number of degrees
                // Format SPIN_FOR port position
                // port = 0 - 3
                // position(signed) = mm (123) or degrees (Go)
                if (parts.length < 3) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                const pos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[2], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SPIN_FOR).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](pos)).Get() << 16).Get();
                break;
            }
            case "SPIN": {
                // Description: Start spinning motor at velocity
                // Format SPIN port vel
                // port = 0 - 3
                // vel(signed) = mm per second (123) or deg per second (Go)
                if (parts.length < 3) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                const vel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[2], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SPIN).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](vel)).Get() << 16).Get();
                break;
            }
            case "SPIN_TO_A": {
                // Description: Spin motor to a specific angle
                // Format SPIN_TO_A port angle
                // Port = 0 - 3
                // angle = 0 to 360 (degrees)
                if (parts.length < 3) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                const pos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[2], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SPIN_TO_A).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](pos)).Get() << 16).Get();
                break;
            }
            case "END": {
                // Discription: Ends the program and stops all motors. Sets program state to Stop
                // Format: END
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_END).Get();
                break;
            }
            case "PAUSE": {
                // Discription: Sets program state to Pause.
                // Format: PAUSE
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_PAUSE).Get();
                break;
            }
            case "SET_ARM_ROTATION": {
                // Discription: Sets arm reported rotation position
                // Format "SET_ARM_ROTATION newPos(optional)"
                // newPos = new position in degrees (Go) (blank = 0)
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](0).Get();
                let newPos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](0).Get();
                if (parts.length > 1) {
                    newPos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SET_POS).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newPos).Get() << 16).Get();
                break;
            }
            case "SET_ARM_ROTATE_VEL": {
                // Discription: Sets arm rotation velocity
                // Format "SET_ARM_ROTATE_VEL newVelocity"
                // newVelocity = new velocity in degrees per sec (Go)
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](0).Get();
                const newVel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SET_VEL).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newVel).Get() << 16).Get();
                break;
            }
            case "ARM_STOP_ROTATE": {
                // Discription: Stops arm from rotating
                // Format ARM_STOP_ROTATE breakMode(optional)
                // breakMode = vexBreakMode
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](0).Get();
                let breakMode = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](0).Get();
                if (parts.length > 1) {
                    breakMode = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_STOP).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](breakMode).Get() << 16).Get();
                break;
            }
            case "ARM_ROTATE_TO": {
                // Discription: Rotate Arm to specific heading
                // Format ARM_ROTATE_TO position
                // position(signed) = degrees (Go)
                if (parts.length < 2) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](0).Get();
                const pos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SPIN_TO).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](pos)).Get() << 16).Get();
                break;
            }
            case "ARM_ROTATE_FOR": {
                // Discription: Rotate Arm for degrees
                // Format ARM_ROTATE_FOR degs
                // degs(signed) = degrees (Go)
                if (parts.length < 2) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](0).Get();
                const pos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SPIN_FOR).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](pos)).Get() << 16).Get();
                break;
            }
            case "ARM_ROTATE": {
                // Discription: Start rotating arm at velocity
                // Format SPIN vel
                // vel(signed) = deg per second (Go)
                if (parts.length < 2) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](0).Get();
                const vel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SPIN).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](vel)).Get() << 16).Get();
                break;
            }
            case "ARM_ROTATE_TO_A": {
                // Discription: Rotate are to a specific angle
                // Format ARM_ROTATE_TO_A angle
                // angle = 0 to 360 (degrees)
                if (parts.length < 2) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](0).Get();
                const pos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SPIN_TO_A).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](pos)).Get() << 16).Get();
                break;
            }
            case "SET_ARM_TILT": {
                // Discription: Sets arm tilt position
                // Format "SET_ARM_TILT newPos(optional)"
                // newPos = new position in degrees (Go) (blank = 0)
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](3).Get();
                let newPos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](0).Get();
                if (parts.length > 1) {
                    newPos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SET_POS).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newPos).Get() << 16).Get();
                break;
            }
            case "SET_ARM_TILT_VEL": {
                // Discription: Sets arm tilt velocity
                // Format "SET_ARM_TILT_VEL newVelocity"
                // newVelocity = new velocity in degrees per sec (Go)
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](3).Get();
                const newVel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SET_VEL).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](newVel).Get() << 16).Get();
                break;
            }
            case "ARM_STOP_TILT": {
                // Discription: Stops arm from tilting
                // Format ARM_STOP_TILT breakMode(optional)
                // breakMode = vexBreakMode
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](3);
                let breakMode = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](0).Get();
                if (parts.length > 1) {
                    breakMode = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_STOP).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](breakMode).Get() << 16).Get();
                break;
            }
            case "ARM_TILT": {
                // Discription: Start arm tilting
                // Format ARM_TILT vel
                // vel = deg per second
                if (parts.length < 2) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](3).Get();
                const vel = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SPIN).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](vel)).Get() << 16).Get();
                break;
            }
            case "ARM_TILT_FOR": {
                // Discription: Tilt Arm for degrees
                // Format ARM_TILT_FOR degs
                // degs(signed) = degrees (Go)
                if (parts.length < 2) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](3).Get();
                const pos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SPIN_FOR).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](pos)).Get() << 16).Get();
                break;
            }
            case "ARM_TILT_TO": {
                // Discription: Tilt Arm to specific angle + = up
                // Format ARM_TILT_TO angle
                // angle(signed) = degrees (Go)
                if (parts.length < 2) {
                    break;
                }
                const port = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](3).Get();
                const pos = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["Int16"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_P_SPIN_TO).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](port)).Get() << 8).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](pos)).Get() << 16).Get();
                break;
            }
            case "PLAY_SOUND": {
                // Description: Play sound file
                // Format "PLAY_SOUND fileID"
                // fileID = 0 - ??
                if (parts.length < 2) {
                    break;
                }
                const fileID = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_SOUND).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](0x03)).Get() << 24).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](fileID)).Get() << 16).Get();
                break;
            }
            case "PLAY_MIDI": {
                // Description: Play MIDI file
                // Format "PLAY_MIDI fileID"
                // fileID = 0 - ??
                if (parts.length < 2) {
                    break;
                }
                const fileID = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_SOUND).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](0x02)).Get() << 24).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](fileID)).Get() << 16).Get();
                break;
            }
            case "PLAY_TONE": {
                // Description: Play tone
                // Format "PLAY_TONE toneID instrument(optional)"
                // toneID = 0 - ??
                // instrument =  ????
                if (parts.length < 2) {
                    break;
                }
                let instrument = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](0).Get();
                if (parts.length > 2) {
                    instrument = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[2], 10)).Get();
                }
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_SOUND).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt16"](0x01)).Get() << 24).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](instrument).Get() << 16).Get();
                break;
            }
            case "SET_VOLUME": {
                // Discription: Set sound volume (0 - 15)
                // Format SET_VOLUME newVol
                // newVol (0 - 15)
                if (parts.length < 2) {
                    break;
                }
                const vol = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_SET_VOLUME).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](vol).Get() << 8).Get();
                break;
            }
            case "SET_SENSOR_LED": {
                // Discription: Set brightness of sensor LED
                // Format SET_SENSOR_LED newBrightness
                // newBrightness (0 - 100%)
                if (parts.length < 2) {
                    break;
                }
                const vol = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_SET_SENS_LED).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](vol).Get() << 8).Get();
                break;
            }
            case "SET_SENSOR_PROX": {
                // Discription: Set proximity sensitivity preset
                // Format SET_SENSOR_PROX newPreset
                // newPreset (0 -  4) 0 = close 4 = far
                if (parts.length < 2) {
                    break;
                }
                const vol = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt8"](parseInt(parts[1], 10)).Get();
                retVal = new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](ProgramCommands.CMD_SET_SENS_PROX).Get();
                retVal += new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](new _BitManipulations__WEBPACK_IMPORTED_MODULE_1__["UInt32"](vol).Get() << 8).Get();
                break;
            }
            //
            default:
                break;
        }
    }
    catch (ex) {
        log.error("Error during script to command: ", ex);
    }
    return retVal;
}



/***/ }),

/***/ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/VEXBLEDevice.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/VEXBLEDevice.js ***!
  \**********************************************************************************/
/*! exports provided: VEXDeviceInfo, VEXBLEDevice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXDeviceInfo", function() { return VEXDeviceInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXBLEDevice", function() { return VEXBLEDevice; });
/* harmony import */ var _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/VEXBLEDeviceManagerTypes */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLEDeviceManagerTypes.js");
/* harmony import */ var _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VEXBLEFirmware */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/VEXBLEFirmware.js");


class VEXDeviceInfo {
    constructor() {
        /// Product ID for this robot
        this.productType = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXProductTypes"].Unknown;
        /// Product type string as read from device
        this.productTypeString = "";
        /// Bootloader version for device
        this.bootVersion = new _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareVersion"](0, 0, 0, 0);
        /// Firmware version for device
        this.appVersion = new _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareVersion"](0, 0, 0, 0);
        /// This devices unique ID (4 bytes)
        this.deviceID = new Uint8Array(4).fill(0);
        /// This devices current mode
        this.deviceMode = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXDeviceMode"].Unknown;
        this.supportFWUpdate = false;
        this.updateNeeded = false;
        this.bootloaderUpdateNeeded = false;
    }
    checkFWUpdateSupported() {
        const lessThanSupportedBootloader = this.bootVersion.isLessThan(new _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareVersion"](1, 1, 0, 0));
        const isBootloaderWithVersionError = (this.bootVersion.major === 48 && this.bootVersion.minor === 48);
        return !(lessThanSupportedBootloader || isBootloaderWithVersionError);
    }
}
class VEXBLEDevice {
    constructor(Name, ProductType, VersionMajor, VersionMinor, VersionBuild, VersionBeta, DeviceID, DeviceMode) {
        /// The RSSI for the last advertising packet recived from this robot
        this.lastRSSI = -99;
        /// The current battery percentage if known
        this.batteryPercent = 0;
        this.name = Name;
        this.productType = ProductType;
        this.versionMajor = VersionMajor;
        this.versionMinor = VersionMinor;
        this.versionBuild = VersionBuild;
        this.versionBeta = VersionBeta;
        this.deviceID = DeviceID;
        this.deviceMode = DeviceMode;
        this.discoverTime = new Date();
    }
}


/***/ }),

/***/ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/VEXBLEDeviceManager.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/VEXBLEDeviceManager.js ***!
  \*****************************************************************************************/
/*! exports provided: ControlValues, VEXBLEDeviceManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlValues", function() { return ControlValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXBLEDeviceManager", function() { return VEXBLEDeviceManager; });
/* harmony import */ var _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/VEXBLEDeviceManagerTypes */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLEDeviceManagerTypes.js");
/* harmony import */ var _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VEXBLEFirmware */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/VEXBLEFirmware.js");
/* harmony import */ var _VEXBLEDevice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VEXBLEDevice */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/VEXBLEDevice.js");
/* harmony import */ var _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProgramUtil */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/ProgramUtil.js");
/* harmony import */ var _BitManipulations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BitManipulations */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/BitManipulations.js");
/* harmony import */ var _EventSystem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EventSystem */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/EventSystem.js");
/* harmony import */ var _types_VEBLEProgramStatus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../types/VEBLEProgramStatus */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEBLEProgramStatus.js");
/* harmony import */ var _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../types/VEXBLEPortStatus */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLEPortStatus.js");
/* harmony import */ var _types_VEXBLESensorStatus__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../types/VEXBLESensorStatus */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLESensorStatus.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/vex-ble-device-manager/node_modules/@rm-vca/logger/dist/logger.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _types_VEXBLEUserSettingsUpdate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../types/VEXBLEUserSettingsUpdate */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLEUserSettingsUpdate.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};













const log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_9__["getLogger"]("vex-web-ble-device-manager");
log.setLevel(log.levels.INFO);
const __SERVICE_CHAR_MAP = {};
__SERVICE_CHAR_MAP[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLEServiceID"].Programmer] = [
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramBotConfig,
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramBotStatus,
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand,
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramStatus,
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramSensorStatus,
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramPortCmdStatus,
];
__SERVICE_CHAR_MAP[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLEServiceID"].Reset] = [
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].Reset,
];
__SERVICE_CHAR_MAP[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLEServiceID"].OAD] = [
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageID,
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageBlock,
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageCtrl,
];
__SERVICE_CHAR_MAP[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLEServiceID"].device] = [
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoFirmware,
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoModelNumber,
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoSerialNumber,
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoSoftware,
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoSystemID,
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoHardwareRev,
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoLog,
];
__SERVICE_CHAR_MAP[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLEServiceID"].Sensor] = [
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].SensorGryoCMD,
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].SensorGyroDetails,
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].SensorPortDetails,
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].SensorRegWrite,
    _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].SensorStatusShort,
];
function getServicesFilter(productType) {
    //GO - 0x0677 123 - 0x0675, Coder -  0x0676,
    let servicesFilter = [0x0677];
    if (productType == _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXProductTypes"].VEXGO) {
        servicesFilter = [0x0677];
    }
    else if (productType == _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXProductTypes"].VEX123Puck) {
        servicesFilter = [0x0675];
    }
    else if (productType == _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXProductTypes"].VEXCoder) {
        servicesFilter = [0x0676];
    }
    return servicesFilter;
}
class ControlValues {
    constructor() {
        this.leftX = 0;
        this.leftY = 0;
        this.rightX = 0;
        this.rightY = 0;
        this.Buttons1 = 0;
        this.Buttons2 = 0;
    }
}
// declare var navigator: any;
class VEXBLEDeviceManager {
    //
    // TODO: platform will be used to filter devices
    constructor(target) {
        this.connectionState = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Disconnected;
        this.device = undefined;
        this.server = undefined;
        this.services = undefined;
        this.characteristics = {};
        this.autoUpdateOnBootLoad = false;
        this.isWaitingToBootload = false;
        this.firmwareType = _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareType"].Release;
        this.lastPortCommandStatus = undefined;
        this.lastProgramSensorStatus = undefined;
        // TODO: the below will become obsolete soon
        this.lastProgramBotStatus = undefined;
        this.lastProgramStatus = undefined;
        this.lastPortStatus = undefined;
        this.lastPortDetailsList = [new _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortDetails"](), new _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortDetails"](), new _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortDetails"](), new _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortDetails"]()];
        this.lastGyroData = undefined;
        this.lastSensorStatus = undefined;
        //
        this.payloadSize = 0;
        this.downloadState = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["FWDownloadState"].PaySize;
        this.oadLastStatus = 0;
        this.oadNextAddress = 0;
        this.deviceInfo = new _VEXBLEDevice__WEBPACK_IMPORTED_MODULE_2__["VEXDeviceInfo"]();
        /// Data type representing the Coder user settings
        this.CurrentCoderUserSettings = undefined;
        this.Current123RobotUserSettings = undefined;
        // Subscription control flags
        this.subscribeProgramCommandStatus = false;
        this.subscribeProgramSensorStatus = false;
        this.subscribeProgramPortCommandStatus = false;
        this.subscribeFirmwareUpodateService = false;
        this.subscribeDeiviceInfoHarwareRev = false;
        this.subscribeDeviceLogService = false;
        // TODO: the below will become obsolete soon
        this.subscribeSensor = false;
        this.subscribeGyro = false;
        this.subscribePortDetails = false;
        this.subscribeProgramStatus = false;
        this.subscribeProgramBotStatus = false;
        this.showBrainsInBootload = true;
        this.showAllBLEDevicesNear = false;
        this.isControllerUpdateRunning = false;
        this.controllerUpdateInterval = 0.050;
        this.onDisconnected = () => {
            log.debug("disconnected");
            this.controllerLoopStop();
            // try auto connecting to the recently connected device
            // Ex: App is not closed but the brain turned off
            this.updateConnectionState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Disconnected);
            this.unSubscribeToCharacteristics();
            this.autoconnect();
        };
        // Notification Handlers
        this.notificationHandlerProgramCommand = (ev) => {
            if (!(ev.target.value)) {
                return;
            }
            const dataView = ev.target.value;
            log.debug("Ack Received (raw): ", dataView);
            let index = 0;
            while (index < dataView.byteLength) {
                if (dataView.getUint8(index) === 0xAA && ((index + 3) < dataView.byteLength)) {
                    index += 1;
                    const status = dataView.getUint8(index);
                    index += 1;
                    const cmd = dataView.getUint8(index);
                    index += 1;
                    //
                    if (cmd == _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_GET_USER_SETTINGS) {
                        //This will be the user settings data
                        let len = dataView.getUint8(index);
                        index += 1;
                        //Version is next byte
                        //Right now we support Version 1
                        let version = dataView.getUint8(index);
                        if (version == 1) {
                            index += 1;
                            //First byte is sound volume
                            let vol = dataView.getUint8(index);
                            // We skip the next 2 bytes for now
                            index += 3;
                            if (len > 7) {
                                if (this.Current123RobotUserSettings == undefined) {
                                    this.Current123RobotUserSettings = new _types_VEXBLEUserSettingsUpdate__WEBPACK_IMPORTED_MODULE_10__["VEX123RobotUserSettings"]();
                                }
                                this.Current123RobotUserSettings.IdleTimeout = dataView.getUint32(index, true);
                                this.Current123RobotUserSettings.SoundVolume = vol;
                                log.debug(`RX 123 User Settings: Timeout: (${this.Current123RobotUserSettings.IdleTimeout}) Volume: (${this.Current123RobotUserSettings.SoundVolume})`);
                                _EventSystem__WEBPACK_IMPORTED_MODULE_5__["fireEvent"]("VEXBLEBrowser.UserSettingsStatus", _types_VEXBLEUserSettingsUpdate__WEBPACK_IMPORTED_MODULE_10__["VEXUserSettingsUpdateStatus"].SUCCESS);
                            }
                        }
                        else {
                            //clear current user settigns
                            this.Current123RobotUserSettings = undefined;
                            _EventSystem__WEBPACK_IMPORTED_MODULE_5__["fireEvent"]("VEXBLEBrowser.UserSettingsStatus", _types_VEXBLEUserSettingsUpdate__WEBPACK_IMPORTED_MODULE_10__["VEXUserSettingsUpdateStatus"].PARSE_ERROR);
                        }
                        break;
                    }
                    else if (cmd == _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_EXE_SINGLE) {
                        let data = dataView.getUint8(index);
                        if ((index + 3) < dataView.byteLength) {
                            let goodToGo = true;
                            //On newer version of firmware the acc for exe single contains the full command
                            //But make sure that there are not any other acks in this same packet
                            for (let i = 1; i <= 2; i++) {
                                if (dataView.getUint8(index + i) == 0xAA && dataView.getUint8(index + 1 + i) == 0x76) {
                                    goodToGo = false;
                                }
                            }
                            if (goodToGo) {
                                data = dataView.getUint32(index, true);
                                index += 3;
                            }
                        }
                        else if ((index + 1 < dataView.byteLength) && (index + 1 != 0xAA)) {
                            data = ((dataView.getUint16(index + 1) << 8) + dataView.getUint16(index));
                            index += 1;
                        }
                        log.debug(`Ack Received (parsed): cmd: ${cmd}, status: ${status} data: ${data}`);
                        _EventSystem__WEBPACK_IMPORTED_MODULE_5__["fireEvent"]("VEXBLEBrowser.AckReceived", cmd, status, data);
                    }
                    else {
                        //
                        let data = dataView.getUint8(index);
                        if (((index + 1) < dataView.byteLength) && (index + 1 != 0xAA)) {
                            data = dataView.getUint16(index);
                            index += 1;
                        }
                        log.debug(`Ack Received (parsed): cmd: ${cmd}, status: ${status} data: ${data}`);
                        _EventSystem__WEBPACK_IMPORTED_MODULE_5__["fireEvent"]("VEXBLEBrowser.AckReceived", cmd, status, data);
                    }
                }
                index += 1;
            }
        };
        this.notificationHandlerSensorStatus = (ev) => {
            if (!(ev.target.value)) {
                return;
            }
            const dataView = ev.target.value;
            if (dataView.byteLength >= 18) {
                const status = new _types_VEXBLESensorStatus__WEBPACK_IMPORTED_MODULE_8__["VEXProgramSensorStatus"]();
                status.AccX = dataView.getInt16(0, true);
                status.AccY = dataView.getInt16(2, true);
                status.AccZ = dataView.getInt16(4, true);
                status.GyroX = dataView.getInt16(6, true);
                status.GyroY = dataView.getInt16(8, true);
                status.GyroZ = dataView.getInt16(10, true);
                status.Pitch = new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["Int16"](dataView.getInt8(12) * 1.41).Get();
                status.Roll = new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["Int16"](dataView.getInt8(13) * 1.41).Get();
                status.Yaw = new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["Int16"](dataView.getInt8(14) * 1.41).Get();
                status.Hue = new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["UInt16"](dataView.getUint8(15) * 1.41).Get();
                status.Brightness = dataView.getUint8(16);
                status.Proximity = dataView.getUint8(17);
                if (dataView.byteLength >= 20) {
                    status.Floor = dataView.getInt16(18, true);
                }
                this.lastProgramSensorStatus = status;
                _EventSystem__WEBPACK_IMPORTED_MODULE_5__["fireEvent"]("VEXBLEBrowser.SensorStatus", this.lastProgramSensorStatus);
            }
        };
        this.notificationHandlerPortCommandStatus = (ev) => {
            if (!(ev.target.value)) {
                return;
            }
            const dataView = ev.target.value;
            let index = 0;
            while (index < dataView.byteLength) {
                if (dataView.getUint8(index) === 0) {
                    break;
                }
                const portNum = dataView.getUint8(index) & 0x0F;
                const devType = new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["UInt8"](dataView.getUint8(index) & 0xF0).Get();
                if (portNum > 4) {
                    break;
                }
                if (dataView.byteLength <= (index + 2)) {
                    break;
                }
                index += 1;
                const ActiveCommand = dataView.getUint8(index);
                index += 1;
                const len = dataView.getUint8(index);
                index += 1;
                if (this.lastPortCommandStatus === undefined) {
                    this.lastPortCommandStatus = new _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXBotCommandStatus"]();
                }
                if (devType === _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortDeviceID"].Motor) {
                    if (dataView.byteLength >= (index + len)) {
                        const status = new _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortCommandMotorStatus"]();
                        status.PortNumber = portNum;
                        status.DeviceID = devType;
                        status.ActiveCommand = ActiveCommand;
                        status.Current = new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["Int16"](dataView.getInt8(index)).Get(); // dataView.getInt16(index, true);
                        index += 1;
                        status.Velocity = new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["Int16"](dataView.getInt8(index)).Get(); // dataView.getInt16(index, true);
                        index += 1;
                        status.Position = dataView.getInt32(index, true);
                        index += 4;
                        status.Flags = dataView.getUint8(index);
                        index += 1;
                        status.ModeBits = dataView.getUint8(index);
                        index += 1;
                        if (this.lastPortCommandStatus.Ports[portNum].UpdateCounter < 255) {
                            status.UpdateCounter = this.lastPortCommandStatus.Ports[portNum].UpdateCounter + 1;
                        }
                        else {
                            status.UpdateCounter = 0;
                        }
                        this.lastPortCommandStatus.Ports[portNum] = status;
                    }
                }
                else if (devType === _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortDeviceID"].Magnet) {
                    if (dataView.byteLength >= (index + len)) {
                        const status = new _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortCommandMagnetStatus"]();
                        status.PortNumber = portNum;
                        status.DeviceID = devType;
                        status.ActiveCommand = ActiveCommand;
                        status.PWM = dataView.getInt8(index);
                        index += 1;
                        status.Flags = dataView.getUint8(index);
                        index += 1;
                        if (this.lastPortCommandStatus.Ports[portNum].UpdateCounter < 255) {
                            status.UpdateCounter = this.lastPortCommandStatus.Ports[portNum].UpdateCounter + 1;
                        }
                        else {
                            status.UpdateCounter = 0;
                        }
                        this.lastPortCommandStatus.Ports[portNum] = status;
                    }
                }
                else if (devType === _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortDeviceID"].Bumper) {
                    if (dataView.byteLength >= (index + len)) {
                        const status = new _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortCommandBumperStatus"]();
                        status.PortNumber = portNum;
                        status.DeviceID = devType;
                        status.ActiveCommand = ActiveCommand;
                        status.PWM = dataView.getInt8(index);
                        index += 1;
                        status.State = dataView.getUint8(index);
                        index += 1;
                        status.Flags = dataView.getUint8(index);
                        index += 1;
                        if (this.lastPortCommandStatus.Ports[portNum].UpdateCounter < 255) {
                            status.UpdateCounter = this.lastPortCommandStatus.Ports[portNum].UpdateCounter + 1;
                        }
                        else {
                            status.UpdateCounter = 0;
                        }
                        this.lastPortCommandStatus.Ports[portNum] = status;
                    }
                }
                else if (devType === _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortDeviceID"].Sound) {
                    if (dataView.byteLength >= (index + len)) {
                        const status = new _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortCommandSoundStatus"]();
                        status.PortNumber = portNum;
                        status.DeviceID = devType;
                        status.ActiveCommand = ActiveCommand;
                        status.SoundType = dataView.getUint8(index);
                        index += 1;
                        status.SoundID = dataView.getUint8(index);
                        index += 1;
                        if (this.lastPortCommandStatus.Ports[portNum].UpdateCounter < 255) {
                            status.UpdateCounter = this.lastPortCommandStatus.Ports[portNum].UpdateCounter + 1;
                        }
                        else {
                            status.UpdateCounter = 0;
                        }
                        this.lastPortCommandStatus.Ports[portNum] = status;
                    }
                }
                else if (devType === _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortDeviceID"].Drive123) {
                    if (dataView.byteLength >= (index + len)) {
                        const status = new _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortCommand123BotStatus"]();
                        status.PortNumber = portNum;
                        status.DeviceID = devType;
                        status.ActiveCommand = ActiveCommand;
                        this.lastPortCommandStatus.ConfigPreset = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXRobotConfigPreset"].BOT123;
                        this.lastPortCommandStatus.Battery = (dataView.getUint8(index));
                        index += 1;
                        status.Flags = dataView.getUint8(index);
                        index += 1;
                        status.Velocity = new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["Int16"](dataView.getInt8(index)).Get(); // dataView.getInt16(index, true);
                        index += 1;
                        status.Heading = dataView.getInt16(index, true);
                        index += 2;
                        status.Position = dataView.getInt32(index, true);
                        index += 4;
                        status.ButtonState = dataView.getUint8(index);
                        index += 1;
                        status.PressedEvents = dataView.getUint8(index);
                        index += 1;
                        status.ReleasedEvents = dataView.getUint8(index);
                        index += 1;
                        status.ColorIndex = dataView.getUint8(index);
                        index += 1;
                        if (this.lastPortCommandStatus.Ports[portNum].UpdateCounter < 255) {
                            status.UpdateCounter = this.lastPortCommandStatus.Ports[portNum].UpdateCounter + 1;
                        }
                        else {
                            status.UpdateCounter = 0;
                        }
                        this.lastPortCommandStatus.Ports[portNum] = status;
                    }
                }
                else if (devType === _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortDeviceID"].Motor123) {
                    if (dataView.byteLength >= (index + len)) {
                        const status = new _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortCommandMotorStatus"]();
                        status.PortNumber = portNum;
                        status.DeviceID = devType;
                        status.ActiveCommand = ActiveCommand;
                        this.lastPortCommandStatus.ConfigPreset = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXRobotConfigPreset"].BOT123;
                        status.Velocity = new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["Int16"](dataView.getInt8(index)).Get();
                        index += 1;
                        status.Position = dataView.getInt32(index, true);
                        index += 4;
                        status.Flags = dataView.getUint8(index);
                        index += 1;
                        status.ModeBits = dataView.getUint8(index);
                        index += 1;
                        if (this.lastPortCommandStatus.Ports[portNum].UpdateCounter < 255) {
                            status.UpdateCounter = this.lastPortCommandStatus.Ports[portNum].UpdateCounter + 1;
                        }
                        else {
                            status.UpdateCounter = 0;
                        }
                        this.lastPortCommandStatus.Ports[portNum] = status;
                    }
                }
                else if (devType === _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortDeviceID"].DriveTrain) {
                    if (len === 10 && (dataView.byteLength >= (index + len))) {
                        const status = new _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortCommandDriveStatus"]();
                        status.PortNumber = portNum;
                        status.DeviceID = devType;
                        status.ActiveCommand = ActiveCommand;
                        this.lastPortCommandStatus.Battery = (dataView.getUint8(index));
                        index += 1;
                        this.lastPortCommandStatus.ConfigPreset = dataView.getUint8(index);
                        index += 1;
                        status.Flags = dataView.getUint8(index);
                        index += 1;
                        status.Velocity = new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["Int16"](dataView.getInt8(index)).Get(); // dataView.getInt16(index, true);
                        index += 1;
                        status.Heading = dataView.getInt16(index, true);
                        index += 2;
                        status.Position = dataView.getInt32(index, true);
                        index += 4;
                        if (this.lastPortCommandStatus.Ports[portNum].UpdateCounter < 255) {
                            status.UpdateCounter = this.lastPortCommandStatus.Ports[portNum].UpdateCounter + 1;
                        }
                        else {
                            status.UpdateCounter = 0;
                        }
                        this.lastPortCommandStatus.Ports[portNum] = status;
                    }
                    else if (len === 5 && (dataView.byteLength >= (index + len))) {
                        const status = new _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortCommandDriveStatus"]();
                        status.PortNumber = portNum;
                        status.DeviceID = devType;
                        status.ActiveCommand = ActiveCommand;
                        this.lastPortCommandStatus.Battery = (dataView.getUint8(index));
                        index += 1;
                        this.lastPortCommandStatus.ConfigPreset = dataView.getUint8(index);
                        index += 1;
                        status.Flags = dataView.getUint8(index);
                        index += 1;
                        status.Heading = dataView.getInt16(index, true); // (Int16(truncatingIfNeeded: value[index + 1]) << 8) + Int16(truncatingIfNeeded: value[index])
                        index += 2;
                        if (this.lastPortCommandStatus.Ports[portNum].UpdateCounter < 255) {
                            status.UpdateCounter = this.lastPortCommandStatus.Ports[portNum].UpdateCounter + 1;
                        }
                        else {
                            status.UpdateCounter = 0;
                        }
                        this.lastPortCommandStatus.Ports[portNum] = status;
                    }
                }
            }
            if (this.lastPortCommandStatus) {
                _EventSystem__WEBPACK_IMPORTED_MODULE_5__["fireEvent"]("VEXBLEBrowser.PortCommandStatus", this.lastPortCommandStatus);
            }
        };
        this.notificationHandlerOADImageID = (ev) => __awaiter(this, void 0, void 0, function* () {
            if (this.connectionState != _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].UpdatingFirmware) {
                log.info("Another app might be updating the connected brain");
                return;
            }
            if (!(ev.target.value)) {
                return;
            }
            const data = ev.target.value;
            const dataUint8Arr = new Uint8Array(data.buffer);
            yield this.delay(10);
            log.debug("Bytes transferred (OADImgID): ", data.byteLength);
            // log.debug(dataUint8Arr);
            if (dataUint8Arr[0] === 0) {
                const dataToWrite = Uint8Array.of(3);
                yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageCtrl].writeValue(dataToWrite);
            }
        });
        this.notificationHandlerOADImageCtrl = (ev) => __awaiter(this, void 0, void 0, function* () {
            if (this.connectionState != _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].UpdatingFirmware) {
                log.info("Another app might be updating the connected brain");
                return;
            }
            try {
                if (!(ev.target.value)) {
                    return;
                }
                const data = ev.target.value;
                const dataUint8Arr = new Uint8Array(data.buffer);
                yield this.delay(10);
                log.debug("Bytes transferred (OADImgIDCtrl): ", data.byteLength);
                // log.debug(dataUint8Arr);
                if (dataUint8Arr[0] === 1) {
                    this.payloadSize = (dataUint8Arr[2] << 8) + dataUint8Arr[1];
                    if (this.payloadSize > 0) {
                        this.downloadState = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["FWDownloadState"].ImgVerify;
                        yield this.doDownload();
                    }
                    // else we may need to abort
                    this.oadLastStatus = 0;
                }
                else if (dataUint8Arr[0] === 0x12) {
                    this.oadLastStatus = dataUint8Arr[1];
                    this.oadNextAddress = data.getUint32(2, true);
                    // this.oadNextAddress = ((dataUint8Arr[5]) << 24 + (dataUint8Arr[4]) << 16);
                    // this.oadNextAddress += ((dataUint8Arr[3]) << 8 + (dataUint8Arr[2]));
                    this.downloadState = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["FWDownloadState"].SendBlock;
                    yield this.doDownload();
                }
                else if (dataUint8Arr[0] === 0x04) {
                    this.oadLastStatus = dataUint8Arr[1];
                    if (this.oadLastStatus === 0) {
                        // report to UI
                        this.updateFWUpdateState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXFWUpdateStatus"].Success);
                        log.info("Firmware Download successfully completed!");
                    }
                    else {
                        const status = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXFWUpdateStatus"][this.oadLastStatus] ? this.oadLastStatus : _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXFWUpdateStatus"].OAD_DL_NOT_COMPLETE;
                        //  Report status to UI
                        this.updateFWUpdateState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXFWUpdateStatus"].OAD_DL_NOT_COMPLETE);
                    }
                }
            }
            catch (ex) {
                log.error("OADImageCtrlHandler: error during update:", ex);
                yield this.updateFWUpdateState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXFWUpdateStatus"].CommunicationFailure);
            }
        });
        this.notificationHandlerOADImageBlock = (ev) => {
            //
        };
        this.notificationHandlerProgramBotConfig = (ev) => {
            if (!(ev.target.value)) {
                return;
            }
            const data = ev.target.value;
            if (data.byteLength >= 20) {
                const config = new _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXProgramPortConfig"]();
                config.Port1DeviceType = data.getUint8(0);
                config.Port1DeviceFlags = data.getUint8(1);
                config.Port1DeviceSettings = new Uint8Array([data.getUint8(2), data.getUint8(3), data.getUint8(4)]);
                config.Port2DeviceType = data.getUint8(5);
                config.Port2DeviceFlags = data.getUint8(6);
                config.Port2DeviceSettings = new Uint8Array([data.getUint8(7), data.getUint8(8), data.getUint8(9)]);
                config.Port3DeviceType = data.getUint8(10);
                config.Port3DeviceFlags = data.getUint8(11);
                config.Port3DeviceSettings = new Uint8Array([data.getUint8(12), data.getUint8(13), data.getUint8(14)]); // [UInt8(value[12]), UInt8(value[13]), UInt8(value[14])];
                config.Port4DeviceType = data.getUint8(15);
                config.Port4DeviceFlags = data.getUint8(16);
                config.Port4DeviceSettings = new Uint8Array([data.getUint8(17), data.getUint8(18), data.getUint8(19)]);
                this.lastProgramConfig = config;
                _EventSystem__WEBPACK_IMPORTED_MODULE_5__["fireEvent"]("VEXBLEBrowser.PortConfig", this.lastProgramConfig);
            }
        };
        this.notificationHandlerDevInfoHardwareRev = (ev) => {
            try {
                if (!(ev.target.value)) {
                    return;
                }
                const data = ev.target.value;
                const decoder = new TextDecoder("utf-8");
                let deviceName = "";
                try {
                    deviceName = decoder.decode(data);
                }
                catch (e) {
                    log.error("device Name is not a valid UTF-8 sequence");
                }
                this.deviceInfo.hardwareRev = deviceName;
                _EventSystem__WEBPACK_IMPORTED_MODULE_5__["fireEvent"]("VEXBLEBrowser.DeviceInfo", this.deviceInfo);
            }
            catch (ex) {
                log.error("error parsing HardwareRev");
            }
        };
        this.getConnectedDeviceInfo = () => __awaiter(this, void 0, void 0, function* () {
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoFirmware]) {
                const data = yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoFirmware].readValue();
                // This data comes across as a string but we can parse it
                // format is "#.#.#.B#"
                if (data.byteLength > 7) {
                    this.deviceInfo.bootVersion = new _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareVersion"](data.getUint8(0) - 0x30, data.getUint8(2) - 0x30, data.getUint8(4) - 0x30, data.getUint8(7) - 0x30);
                }
                if (!this.deviceInfo.bootVersion.isEmpty()) {
                    this.deviceInfo.supportFWUpdate = this.deviceInfo.checkFWUpdateSupported();
                }
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoSoftware]) {
                const data = yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoSoftware].readValue();
                // This data comes across as a string but we can parse it
                // format is "#.#.#.B#"
                if (data.byteLength > 7) {
                    this.deviceInfo.appVersion = new _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareVersion"](data.getUint8(0) - 0x30, data.getUint8(2) - 0x30, data.getUint8(4) - 0x30, data.getUint8(7) - 0x30);
                }
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoModelNumber]) {
                const data = yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoModelNumber].readValue();
                const decoder = new TextDecoder("utf-8");
                const modelNumberStr = decoder.decode(data);
                if (modelNumberStr) {
                    if (modelNumberStr.includes("VEX Coder")) {
                        this.deviceInfo.productType = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXProductTypes"].VEXCoder;
                    }
                    else if (modelNumberStr.includes("VEX 123")) {
                        this.deviceInfo.productType = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXProductTypes"].VEX123Puck;
                    }
                    else if (modelNumberStr.includes("VEX Go")) {
                        this.deviceInfo.productType = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXProductTypes"].VEXGO;
                    }
                    if (modelNumberStr.includes("Bootload")) {
                        this.deviceInfo.deviceMode = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXDeviceMode"].Update;
                    }
                    else {
                        this.deviceInfo.deviceMode = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXDeviceMode"].Connect;
                    }
                    this.deviceInfo.productTypeString = modelNumberStr;
                }
                else {
                    log.error("Model Number is not a valid UTF-8 sequence");
                    this.deviceInfo.productTypeString = "";
                    this.deviceInfo.productType = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXProductTypes"].Unknown;
                }
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoSystemID]) {
                const data = yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoSystemID].readValue();
                this.deviceInfo.deviceID = new Uint8Array([data.getUint8(0), data.getUint8(1), data.getUint8(2), data.getUint8(5)]);
                this.deviceInfo.deviceIDValue = Object(_BitManipulations__WEBPACK_IMPORTED_MODULE_4__["byteArrayToInt32"])(this.deviceInfo.deviceID);
            }
            // TODO:  Current this characteristic is blocked by WebBluetooth
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoSerialNumber]) {
                const data = yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoSerialNumber].readValue();
                const decoder = new TextDecoder("utf-8");
                let deviceName = "";
                try {
                    deviceName = decoder.decode(data);
                }
                catch (e) {
                    log.error("device Name is not a valid UTF-8 sequence");
                }
                this.deviceInfo.name = deviceName;
            }
            else if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoHardwareRev]) {
                const data = yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoHardwareRev].readValue();
                const decoder = new TextDecoder("utf-8");
                let deviceName = "";
                try {
                    deviceName = decoder.decode(data);
                }
                catch (e) {
                    log.error("device Name is not a valid UTF-8 sequence");
                }
                this.deviceInfo.name = deviceName;
            }
            else {
                if (this.device) {
                    this.deviceInfo.name = this.device.name;
                }
            }
            // version check
            this.deviceInfo.updateNeeded = false;
            if (this.firmwareVersionRemote && (!this.firmwareVersionRemote.isEmpty())) {
                this.deviceInfo.updateNeeded = this.deviceInfo.appVersion.isLessThan(this.firmwareVersionRemote);
            }
            else if (this.firmwareVersionLocal && (!this.firmwareVersionLocal.isEmpty())) {
                this.deviceInfo.updateNeeded = this.deviceInfo.appVersion.isLessThan(this.firmwareVersionLocal);
            }
            this.deviceInfo.bootloaderUpdateNeeded = false;
            if (this.bootLoaderVersionRemote && (!this.bootLoaderVersionRemote.isEmpty())) {
                this.deviceInfo.bootloaderUpdateNeeded = this.deviceInfo.bootVersion.isLessThan(this.bootLoaderVersionRemote);
            }
            else if (this.bootLoaderVersionLocal && (!this.bootLoaderVersionLocal.isEmpty())) {
                this.deviceInfo.bootloaderUpdateNeeded = this.deviceInfo.bootVersion.isLessThan(this.bootLoaderVersionLocal);
            }
        });
        this.notificationHandlerDeviceLog = (ev) => __awaiter(this, void 0, void 0, function* () {
            if (!(ev.target.value)) {
                return;
            }
            const dataView = ev.target.value;
            yield this.processDevLog(dataView.buffer);
        });
        if (!navigator || !navigator.bluetooth) {
            log.error("navigator.bluetooth not available");
            return;
        }
        // TODO: product should be based on the connected device
        this.productType = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXProductTypes"].VEXGO;
        if (target === "GO") {
            this.productType = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXProductTypes"].VEXGO;
        }
        if (target === "123") {
            this.productType = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXProductTypes"].VEX123Puck;
        }
        this.servicesFilter = [
            //GO - 0x0677 123 - 0x0675, Coder -  0x0676, 
            { services: getServicesFilter(this.productType) },
        ];
        this.optionalServices = [_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLEServiceID"].Programmer, _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLEServiceID"].OAD, _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLEServiceID"].Reset, _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLEServiceID"].device, _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLEServiceID"].Sensor];
        this.enableAutoConnect = false;
        this.firmware = new _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXBLEFirmware"](this.productType);
        this.init();
        this.currentControlValues = new ControlValues();
    }
    //#region Public
    getMachineBleHardwareInfo(platform) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // for chrome app
                    if (platform === "ChromeApp") {
                        if (chrome && chrome.bluetooth) {
                            let reqTimeout;
                            try {
                                reqTimeout = setTimeout(() => {
                                    log.error("getMachineBleHardwareInfo: timeout");
                                    reject(undefined);
                                }, 1000);
                                chrome.bluetooth.getAdapterState((adapterInfo) => {
                                    const adapterDetails = {
                                        address: adapterInfo.address,
                                        name: adapterInfo.name,
                                        available: adapterInfo.available,
                                        discovering: adapterInfo.discovering,
                                        powered: adapterInfo.powered,
                                    };
                                    clearTimeout(reqTimeout);
                                    resolve(adapterDetails);
                                });
                            }
                            catch (ex) {
                                log.error("getMachineBleHardwareInfo: could not get BLE adapter info");
                                clearTimeout(reqTimeout);
                                resolve(undefined);
                            }
                        }
                        else {
                            log.error("getMachineBleHardwareInfo: chrome.bluetooth not available. check passed platform arg?");
                            reject(undefined);
                        }
                    }
                    else { // browser
                        reject(undefined);
                    }
                }
                catch (ex) {
                    log.error("getMachineBleHardwareInfo: could not get BLE adapter info");
                    reject(undefined);
                }
            }));
        });
    }
    /**
     * Development and debugging purpose only
     * Shows all teh near by BLE devices in scan
     */
    showAllBLEDevices(enable) {
        this.showAllBLEDevicesNear = enable;
    }
    isConnected() {
        return (this.connectionState === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Connected);
    }
    getConnectionState() {
        return this.connectionState;
    }
    getDeviceInfo() {
        return this.deviceInfo;
    }
    scanAndConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.scan();
            yield this.connect();
        });
    }
    disconnect(force) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.device) {
                log.info("no device to disconnect!");
                return;
            }
            this.enableAutoConnect = false;
            if (this.device.gatt.connected) {
                this.device.gatt.disconnect();
                this.device = undefined;
                this.updateConnectionState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Disconnected);
                log.info("disconnected");
            }
            else {
                if (force) {
                    this.device = undefined;
                    this.updateConnectionState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Disconnected);
                    log.info("forcing disconnection & cleanup");
                }
                log.info("already disconnected");
            }
        });
    }
    powerOff() {
        return __awaiter(this, void 0, void 0, function* () {
            const state = Uint8Array.of(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["PowerState"].Off);
            yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].Reset].writeValue(state);
        });
    }
    reboot() {
        return __awaiter(this, void 0, void 0, function* () {
            const state = Uint8Array.of(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["PowerState"].Reboot);
            // set to false if Full Scan required
            this.enableAutoConnect = true;
            yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].Reset].writeValue(state);
        });
    }
    setFirmwareToBeta(firmwareType) {
        return __awaiter(this, void 0, void 0, function* () {
            this.firmwareType = firmwareType;
            yield this.pullLatestFirmwareVersion(this.firmwareType);
        });
    }
    bootload() {
        return __awaiter(this, void 0, void 0, function* () {
            const state = Uint8Array.of(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["PowerState"].Bootload);
            // set to false if Full Scan required
            this.enableAutoConnect = true;
            yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].Reset].writeValue(state);
            this.isWaitingToBootload = true;
            // uncomment if Full scan required
            // but in bootload mode , the web bluetooth is showing the brain in the scan list
            // this.device = undefined;
            // await this.scanAndConnect();
        });
    }
    SendProgramStateCommand(cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connectionState === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Connected && this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                const value = new Uint8Array(1);
                switch (cmd) {
                    case _types_VEBLEProgramStatus__WEBPACK_IMPORTED_MODULE_6__["VEXProgramState"].Play:
                        value[0] = _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_PLAY;
                        break;
                    case _types_VEBLEProgramStatus__WEBPACK_IMPORTED_MODULE_6__["VEXProgramState"].Play:
                        value[0] = _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_PAUSE;
                        break;
                    case _types_VEBLEProgramStatus__WEBPACK_IMPORTED_MODULE_6__["VEXProgramState"].Step:
                        value[0] = _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_STEP;
                        break;
                    default:
                        value[0] = _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_STOP;
                        break;
                }
                try {
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(value).catch((reason) => {
                        throw reason;
                    });
                }
                catch (ex) {
                    this.delay(500);
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(value);
                }
            }
        });
    }
    checkIfUpdateNeeded() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.deviceInfo && this.deviceInfo.updateNeeded;
        });
    }
    checkIfBootloaderUpdateNeeded() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.deviceInfo && this.deviceInfo.bootloaderUpdateNeeded;
        });
    }
    updateFirmware(firmwareType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (firmwareType === undefined) {
                firmwareType = this.firmwareType;
            }
            else {
                this.firmwareType = firmwareType;
            }
            try {
                // check for bootload mode if fwtype is not bootloader
                if (this.firmwareType != _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareType"].Bootloader) {
                    if (this.deviceInfo.deviceMode !== _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXDeviceMode"].Update) {
                        // bootload otherwise
                        if (this.deviceInfo.deviceMode === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXDeviceMode"].Connect) {
                            this.autoUpdateOnBootLoad = true;
                            yield this.bootload();
                            return;
                        }
                    }
                    else {
                        this.enableAutoConnect = true;
                    }
                }
                if (!this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageCtrl] ||
                    !this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageID] ||
                    !this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageBlock]) {
                    log.error("device does not support updating from browser or communication failure!");
                    this.updateFWUpdateState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXFWUpdateStatus"].CommunicationFailure);
                    return;
                }
                // safe delay to consider reconnection
                // fetch the latest version one more time from server or local
                yield this.pullLatestFirmwareVersion(this.firmwareType);
                if (this.productType == _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXProductTypes"].VEXGO) {
                    yield this.pullLatestFirmwareVersion(_VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareType"].Bootloader);
                }
                // double check device and image version and update the deviceinfo
                if (this.firmwareVersionRemote && (!this.firmwareVersionRemote.isEmpty())) {
                    this.deviceInfo.updateNeeded = this.deviceInfo.appVersion.isLessThan(this.firmwareVersionRemote);
                }
                else if (this.firmwareVersionLocal && (!this.firmwareVersionLocal.isEmpty())) {
                    this.deviceInfo.updateNeeded = this.deviceInfo.appVersion.isLessThan(this.firmwareVersionLocal);
                }
                if (this.bootLoaderVersionRemote && (!this.bootLoaderVersionRemote.isEmpty())) {
                    this.deviceInfo.bootloaderUpdateNeeded = this.deviceInfo.bootVersion.isLessThan(this.bootLoaderVersionRemote);
                }
                else if (this.bootLoaderVersionLocal && (!this.bootLoaderVersionLocal.isEmpty())) {
                    this.deviceInfo.bootloaderUpdateNeeded = this.deviceInfo.bootVersion.isLessThan(this.bootLoaderVersionLocal);
                }
                // we ignore updateNeeded check above and proceed to update the firmware when this function is called by Front end
                // Front end decides whether to update firmware or not depending on deviceInfo.updateNeeded flag
                this.updateConnectionState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].UpdatingFirmware);
                yield this.delay(3000);
                let image = undefined;
                image = yield this.firmware.getImageFromServer(firmwareType);
                log.debug("downloaded vexos hex string from server:", image);
                if (!image) {
                    image = yield this.firmware.getImageFromLocalFile(firmwareType);
                    log.debug("loaded vexos hex string from local file:", image);
                }
                if (!image) {
                    log.info("could not get latest image from server and local");
                    this.updateFWUpdateState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXFWUpdateStatus"].FileNotFound);
                    return;
                }
                this.oadLastStatus = 0;
                this.firmwareImage = yield this.firmware.getImageFromHex(image);
                // double checking still the service characteristics are still available
                // as the steps above did some intense file processing in a single threaded setup
                if (!this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageCtrl] ||
                    !this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageID] ||
                    !this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageBlock]) {
                    log.error("device does not support updating from browser or communication failure!");
                    this.updateFWUpdateState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXFWUpdateStatus"].CommunicationFailure);
                    return;
                }
                // start the update
                this.downloadState = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["FWDownloadState"].PaySize;
                yield this.doDownload();
            }
            catch (ex) {
                log.error("updateFirmware: error during update:", ex);
                yield this.updateFWUpdateState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXFWUpdateStatus"].CommunicationFailure);
            }
        });
    }
    executeSingleCommand(cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug("executeSingleCommand: ", cmd);
            if (cmd.length > 0) {
                let byteCommand = 0;
                try {
                    byteCommand = _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["scriptLineToCommand"](cmd);
                }
                catch (ex) {
                    byteCommand = 0;
                    log.error("invalid command: ", ex);
                }
                if (byteCommand !== 0) {
                    yield this.sendExecuteSingleCommand(byteCommand);
                }
            }
        });
    }
    executeMutlipleCommands(commands) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug("executeMutlipleCommands: ", commands);
            const byteCmdArr = [];
            for (let i = 0; i < commands.length; i++) {
                if (commands[i].length > 0) {
                    let byteCommand = 0;
                    try {
                        byteCommand = _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["scriptLineToCommand"](commands[i]);
                    }
                    catch (ex) {
                        byteCommand = 0;
                        log.error("invalid command: ", ex);
                    }
                    if (byteCommand !== 0) {
                        byteCmdArr.push(byteCommand);
                    }
                }
            }
            if (byteCmdArr.length > 0) {
                yield this.sendExecuteMultiCommand(byteCmdArr);
            }
        });
    }
    // Controller functions
    /**
     * Sends command to save the current controll settings for button commands and robot config
     * When the the robot reboots it will remember these settings once commanded into the "Control" config preset
     */
    saveControlSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected() && this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                const value = new Uint8Array([_ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_SAVE_CONTROL_CONFIG_CMD]);
                try {
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(value).catch((reason) => {
                        throw reason;
                    });
                }
                catch (ex) {
                    yield this.delay(200);
                    log.debug("saveControlSettings: ", ex);
                    log.debug("saveControlSettingss: ", "Retry...");
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(value);
                }
            }
        });
    }
    /**
     * Starts/Stops timer to send controller updates to the robot.
     * @param enable true to start the game timer. false to stop it.
     * @param updateRate Controls update interval in seconds. Default = 0.050
     */
    controllerEnable(enable, updateRate = 0.050) {
        this.controllerUpdateInterval = updateRate < 0.020 ? 0.050 : updateRate;
        if (enable) {
            //TODO:
            if (!this.isControllerUpdateRunning) {
                //restart the update loop
                this.controllerLoopRun();
            }
        }
        else {
            this.controllerLoopStop();
        }
    }
    controllerIsEnabled() {
        return this.isControllerUpdateRunning;
    }
    /**
     * Sets the stick values to be sent on the next controls udpate
     * @param leftX Left Stick X value (0 to 255). 127 == stop
     * @param leftY Left Stick Y value (0 to 255). 127 == stop
     * @param rightX Right Stick X value (0 to 255). 127 == stop
     * @param rightY Right Stick Y value (0 to 255). 127 == stop
     */
    controllerSetStickValues(leftX = 127, leftY = 127, rightX = 127, rightY = 127) {
        this.currentControlValues.leftX = leftX;
        this.currentControlValues.leftY = leftY;
        this.currentControlValues.rightX = rightX;
        this.currentControlValues.rightY = rightY;
    }
    /**
     * Sets the button values to be sent on the next controls udpate
     * @param buttonID button id to update
     * @param pressed button state
     */
    controllerSetButonValue(buttonID, pressed) {
        if (buttonID < 8) {
            if (pressed) {
                this.currentControlValues.Buttons1 |= (1 << buttonID);
            }
            else {
                this.currentControlValues.Buttons1 &= ~(1 << buttonID);
            }
        }
        else if (buttonID < 16) {
            if (pressed) {
                this.currentControlValues.Buttons2 |= (1 << (buttonID - 8));
            }
            else {
                this.currentControlValues.Buttons2 &= ~(1 << (buttonID - 8));
            }
        }
    }
    /**
    * Sets all controll values to their default value (sticks are neutral and buttons are released)
    */
    controllerClearValues() {
        this.currentControlValues.Buttons1 = 0;
        this.currentControlValues.Buttons2 = 0;
        this.currentControlValues.leftX = 127;
        this.currentControlValues.leftY = 127;
        this.currentControlValues.rightX = 127;
        this.currentControlValues.rightY = 127;
    }
    /**
     * Convieniance method for setting up button commands. This method will attempt to parse the string for the command and pass the 4 byte value to the base class to send to the robot.
     * @param command Command string
     * @param buttonID Button ID
     * @param pressed Buttons state that this command is connected to
     */
    controllerAddButtonCommand(command, buttonID, pressed) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected()) {
                try {
                    let cmd = _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["scriptLineToCommand"](command);
                    yield this.setControlButtonCommand(buttonID, pressed, cmd);
                    return true;
                }
                catch (error) {
                    log.debug("controllerAddButtonCommand: ", error);
                    return false;
                }
            }
            return false;
        });
    }
    /**
     * Send Controller updates
     */
    controllerUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected()) {
                yield this.setControlControlValues(this.currentControlValues.leftX, this.currentControlValues.leftY, this.currentControlValues.rightX, this.currentControlValues.rightY, this.currentControlValues.Buttons1, this.currentControlValues.Buttons2);
            }
        });
    }
    /**
     * In Go firmware app1.0.3 BL1.1.3 and newer the device ID changed in the advertisement data. This may cause issues when updating older versions of firmware with new BLs. This function will compare two ids for both the old ID format and the new. Once a brain is fully up to date this function is not really needed.
     */
    CheckAlternateID(deviceID, searchID) {
        return (deviceID == (searchID & 0xFF00FFFF));
    }
    setRobotConfigPreset(config) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug("setRobotConfigPreset: ", config);
            if (this.isConnected() && this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                const value = new Uint8Array([_ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_SET_BOT_CONFIG_PRESET, config]);
                yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(value);
            }
        });
    }
    setPortConfig(portNum, devType, flags = _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_7__["VEXPortConfigFlags"].FLAG_ENABLED, iLimitPct = 50, iLimitMax = 1000, Accel_value = 1, Dft_Vel = 50) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connectionState === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Connected && this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                let value = new Uint8Array();
                try {
                    const settings = _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["uint16ToByteArray"](iLimitMax);
                    value = new Uint8Array([_ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_SET_PORT_CONFIG, portNum, devType, flags, settings[0], settings[1], iLimitPct, Accel_value, Dft_Vel]);
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(value).catch((reason) => {
                        throw reason;
                    });
                }
                catch (ex) {
                    this.delay(500);
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(value);
                }
            }
        });
    }
    requestRobotConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected() && this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramBotConfig]) {
                const value = yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramBotConfig].readValue();
                // TODO: The config will be received through notification - needs callback
            }
        });
    }
    // public showBrainsInBootloadOnly(show: boolean) {
    //     this.showBrainsInBootload = show;
    // }
    /**
     * Returns the version of the latest firmware available on the cloud
     * If server not reachable, returns the local version packed with the application
     * return 0.0.0.b0 on failure to get both.
     */
    getLatestFirmwareVersion(firmwareType = _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareType"].Release) {
        return __awaiter(this, void 0, void 0, function* () {
            if (firmwareType === undefined) {
                firmwareType = this.firmwareType;
            }
            else {
                this.firmwareType = firmwareType;
            }
            // pull the catelog from server or local depending on the connectivity
            yield this.pullLatestFirmwareVersion(firmwareType);
            if (!this.firmwareVersionRemote.isEmpty()) {
                return this.firmwareVersionRemote;
            }
            else if (!this.firmwareVersionLocal.isEmpty()) {
                return this.firmwareVersionLocal;
            }
            return _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareVersion"].getEmpty();
        });
    }
    /**
     * Returns the version of the latest bootloader available on the cloud
     * If server not reachable, returns the local version packed with the application
     * return 0.0.0.b0 on failure to get both.
     */
    getLatestBootLoaderVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            // pull the catelog from server or local depending on the connectivity
            yield this.pullLatestFirmwareVersion(_VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareType"].Bootloader);
            if (!this.bootLoaderVersionRemote.isEmpty()) {
                return this.bootLoaderVersionRemote;
            }
            else if (!this.bootLoaderVersionLocal.isEmpty()) {
                return this.bootLoaderVersionLocal;
            }
            return _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareVersion"].getEmpty();
        });
    }
    /**
     * Returns the version of firmware on the device
     */
    getDeviceFirmwareVersion() {
        if (this.isConnected()) {
            return this.deviceInfo.appVersion;
        }
        return _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareVersion"].getEmpty();
    }
    /**
     * Returns the version of firmware on the device
     */
    // public getDeviceBootloaderVersion() {
    //     if (this.isConnected()) {
    //         return this.deviceInfo.bootVersion;
    //     }
    //     return VEXFirmwareVersion.getEmpty();
    // }
    /**
     * Return bootloader version from device
     */
    // not used
    getDeviceBootloaderVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected() && this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoFirmware]) {
                const data = yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoFirmware].readValue();
                // This data comes across as a string but we can parse it
                // format is "#.#.#.B#"
                if (data.byteLength > 7) {
                    this.deviceInfo.bootVersion = new _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareVersion"](data.getUint8(0) - 0x30, data.getUint8(2) - 0x30, data.getUint8(4) - 0x30, data.getUint8(7) - 0x30);
                }
                if (!this.deviceInfo.bootVersion.isEmpty()) {
                    this.deviceInfo.supportFWUpdate = this.deviceInfo.checkFWUpdateSupported();
                }
                return this.deviceInfo.bootVersion;
            }
            return _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareVersion"].getEmpty();
        });
    }
    IsFWUpdateSupported() {
        return __awaiter(this, void 0, void 0, function* () {
            //pull the bootloader version from brain
            yield this.getDeviceBootloaderVersion();
            return this.deviceInfo.supportFWUpdate;
        });
    }
    CanUpdateBootloader() {
        if (this.isConnected() &&
            this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageCtrl] &&
            this.deviceInfo.deviceMode !== _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXDeviceMode"].Update) {
            return true;
        }
        return false;
    }
    /**
     * Have the robot perform an action to help locate it.
     * @param durationSec how long the brain led blinks
     */
    LocateRobot(durationSec = 2) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connectionState === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Connected && this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                const value = new Uint8Array(2);
                value[0] = _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_LOCATE;
                value[1] = durationSec;
                yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(value);
            }
        });
    }
    /**
     * This will request the devices current connection interval. Value will be returned in the ack data callback.
     */
    RequestConnectionInterval() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connectionState === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Connected && this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                const value = new Uint8Array(1);
                value[0] = _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_GET_CONN_INT;
                yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(value);
            }
        });
    }
    /**
     * Send new user settings to 123 robot device. Status is returned in the didUpdateUserSettings callback
     * @param idleTimeout Coder will sleep after this many ms if not connected and no buttons have been pressed
     * @param soundVolume
     * @param persist If true these settings will be saved in flash else these settings will only persist until reboot. (In th case of the encoder this means batteries are removed.)
     */
    Set123RobotUserSettings(idleTimeout, soundVolume, persist) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connectionState === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Connected && this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                const timeoutBytes = _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["uint32ToByteArray"](idleTimeout);
                const commandBuffer = new Uint8Array(10);
                commandBuffer[0] = _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_SET_USER_SETTINGS;
                commandBuffer[1] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["UInt8"](persist ? 1 : 0).Get();
                commandBuffer[2] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["UInt8"](1).Get();
                commandBuffer[3] = soundVolume;
                commandBuffer[4] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["UInt8"](0).Get();
                commandBuffer[5] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["UInt8"](0).Get();
                commandBuffer[6] = timeoutBytes[0];
                commandBuffer[7] = timeoutBytes[1];
                commandBuffer[8] = timeoutBytes[2];
                commandBuffer[9] = timeoutBytes[3];
                if (this.Current123RobotUserSettings == undefined) {
                    this.Current123RobotUserSettings = new _types_VEXBLEUserSettingsUpdate__WEBPACK_IMPORTED_MODULE_10__["VEX123RobotUserSettings"]();
                }
                this.Current123RobotUserSettings.IdleTimeout = idleTimeout;
                this.Current123RobotUserSettings.SoundVolume = soundVolume;
                try {
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(commandBuffer).catch((reason) => {
                        throw reason;
                    });
                }
                catch (ex) {
                    yield this.delay(200);
                    log.debug("Set123RobotUserSettings: ", ex);
                    log.debug("Set123RobotUserSettings: ", "Retry...");
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(commandBuffer);
                }
            }
        });
    }
    /**
     * Send a command to read the current user setting from the 123 Robot
     *  Status is returned in the didUpdateUserSettings callback
     */
    Get123RobotUserSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connectionState === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Connected && this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                const value = new Uint8Array(1);
                value[0] = _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_GET_USER_SETTINGS;
                try {
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(value).catch((reason) => {
                        throw reason;
                    });
                    ;
                }
                catch (ex) {
                    yield this.delay(200);
                    log.debug("Get123UserSettings: ", ex);
                    log.debug("Get123UserSettings: ", "Retry...");
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(value);
                }
            }
        });
    }
    /**
     * Returns program command status subscription state.
     * Returns true if we have subscribed to this status.
     */
    isProgramCommandStatusEnabled() {
        return this.subscribeProgramCommandStatus;
    }
    /**
     * Returns program sensor status subscription state.
     * Returns true if we have subscribed to this status.
     */
    isProgramSensorStatusEnabled() {
        return this.subscribeProgramSensorStatus;
    }
    /**
     * Returns program port command status subscription state
     * Returns true if we have subscribed to this status.
     */
    isProgramPortCommandStatusEnabled() {
        return this.subscribeProgramPortCommandStatus;
    }
    /**
     * Returns device log subscription state
     * Returns true if we have subscribed to this status.
     */
    isDeviceLogServiceEnabled() {
        return this.subscribeDeviceLogService;
    }
    /**
     * Subscribe/Unsubscribe to Program status
     * @param enable true to start robot status update. false, to stop them
     */
    enableProgramCommandStatus(enable) {
        try {
            this.subscribeProgramCommandStatus = enable;
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                if (this.subscribeProgramCommandStatus) {
                    this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].startNotifications();
                }
                else {
                    this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].stopNotifications();
                }
            }
        }
        catch (ex) {
            log.error("enableProgramCommandStatus: ", ex);
        }
    }
    /**
     * Subscribe/Unsubscribe to sensor status
     * @param enable true to start robot status update. false, to stop them
     */
    enableProgramSensorStatus(enable) {
        try {
            this.subscribeProgramSensorStatus = enable;
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramSensorStatus]) {
                if (this.subscribeProgramSensorStatus) {
                    this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramSensorStatus].startNotifications();
                }
                else {
                    this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramSensorStatus].stopNotifications();
                }
            }
        }
        catch (ex) {
            log.error("enableProgramSensorStatus: ", ex);
        }
    }
    /**
     * Subscribe/Unsubscribe to port command status
     * @param enable true to start robot status update. false, to stop them
     */
    enableProgramPortCmdStatus(enable) {
        try {
            this.subscribeProgramPortCommandStatus = enable;
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramPortCmdStatus]) {
                if (this.subscribeProgramPortCommandStatus) {
                    this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramPortCmdStatus].startNotifications();
                }
                else {
                    this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramPortCmdStatus].stopNotifications();
                }
            }
        }
        catch (ex) {
            log.error("enableProgramPortCmdStatus : ", ex);
        }
    }
    /**
     * Subscribe/Unsubscribe to log from brain
     * @param enable true to start log feed. false, to stop them
     */
    enableDeviceInfoLogService(enable) {
        try {
            this.subscribeDeviceLogService = enable;
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoLog]) {
                if (this.subscribeDeviceLogService) {
                    this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoLog].startNotifications();
                }
                else {
                    this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoLog].stopNotifications();
                }
            }
        }
        catch (ex) {
            log.error("enableDeviceInfoLogService : ", ex);
        }
    }
    /**
     * Subscribe/Unsubscribe to firmware update services
     * @param enable true to start robot status update. false, to stop them
     */
    enableFirmwareUpdateService(enable) {
        try {
            this.subscribeFirmwareUpodateService = enable;
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageID]) {
                if (this.subscribeFirmwareUpodateService) {
                    this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageID].startNotifications();
                }
                else {
                    this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageID].stopNotifications();
                }
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageBlock]) {
                if (this.subscribeFirmwareUpodateService) {
                    this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageBlock].startNotifications();
                }
                else {
                    this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageBlock].stopNotifications();
                }
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageCtrl]) {
                if (this.subscribeFirmwareUpodateService) {
                    this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageCtrl].startNotifications();
                }
                else {
                    this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageCtrl].stopNotifications();
                }
            }
        }
        catch (ex) {
            log.error("enableFirmwareUpdateService : ", ex);
        }
    }
    getCommandNameFromID(command) {
        return _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["getStringForCommandID"](command);
    }
    /**
     * This will will clear all events for the passed in port
     * @param portID Port to clear events on.
     */
    clearPortEvents(portID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected() && this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                const value = new Uint8Array(2);
                value[0] = _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_CLEAR_PORT_EVENTS;
                value[1] = portID;
                try {
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(value);
                }
                catch (ex) {
                    yield this.delay(200);
                    log.debug("clearPortEvents: ", ex);
                    log.debug("clearPortEvents: ", "Retry...");
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(value);
                }
            }
        });
    }
    SetRobotName(newName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected()) {
                const uin8ArrayOfName = new TextEncoder().encode(newName);
                const byteArray = new Uint8Array([_ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_SET_BOT_NAME, uin8ArrayOfName.byteLength]);
                const arraybuff = this.appendArrayBuffer(byteArray.buffer, uin8ArrayOfName);
                const value = new Uint8Array(arraybuff);
                if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                    this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(value);
                }
            }
        });
    }
    SetSensorMode(newMode) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected() && this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].SensorGryoCMD]) {
                let value = new Uint8Array();
                try {
                    value = new Uint8Array([_types_VEXBLESensorStatus__WEBPACK_IMPORTED_MODULE_8__["SensorConst"].CMD_SET_SENSOR_MODE, newMode]);
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].SensorGryoCMD].writeValue(value).catch((reason) => {
                        throw reason;
                    });
                }
                catch (ex) {
                    this.delay(500);
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].SensorGryoCMD].writeValue(value);
                }
            }
        });
    }
    //#endregion
    //#region Private
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pullLatestFirmwareVersion(this.firmwareType);
            if (this.productType == _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXProductTypes"].VEXGO) {
                yield this.pullLatestFirmwareVersion(_VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareType"].Bootloader);
            }
        });
    }
    pullLatestFirmwareVersion(firmwareType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let latestVersion = yield this.firmware.getVersionFromServer(firmwareType, this.productType);
                if (firmwareType != _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareType"].Bootloader) {
                    this.firmwareVersionRemote = latestVersion;
                    log.info("App firmware version from Server", this.firmwareVersionRemote.getString());
                }
                else {
                    this.bootLoaderVersionRemote = latestVersion;
                    log.info("bootloader firmware version from Server", this.bootLoaderVersionRemote.getString());
                }
            }
            catch (ex) {
                log.info("error getting fw version from remote server: ", ex);
            }
            try {
                let latestVersion = yield this.firmware.getVersionFromLocalFile(firmwareType, this.productType);
                if (firmwareType != _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareType"].Bootloader) {
                    this.firmwareVersionLocal = latestVersion;
                    log.info("App firmware version from local file", this.firmwareVersionLocal.getString());
                }
                else {
                    this.bootLoaderVersionLocal = latestVersion;
                    log.info("bootloader firmware version from local file", this.bootLoaderVersionLocal.getString());
                }
            }
            catch (ex) {
                log.info("error getting fw version from local resources: ", ex);
            }
        });
    }
    updateConnectionState(state) {
        this.connectionState = state;
        _EventSystem__WEBPACK_IMPORTED_MODULE_5__["fireEvent"]("VEXBLEBrowser.ConnectionState", this.connectionState);
    }
    updateFWUpdateState(state) {
        return __awaiter(this, void 0, void 0, function* () {
            _EventSystem__WEBPACK_IMPORTED_MODULE_5__["fireEvent"]("VEXBLEBrowser.FWUpdateComplete", state);
            if (state !== _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXFWUpdateStatus"].Success) {
                if (this.connectionState === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].UpdatingFirmware || this.connectionState === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Connected) {
                    this.updateConnectionState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Connected);
                }
                else {
                    this.updateConnectionState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Disconnected);
                }
            }
            if (state == _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXFWUpdateStatus"].Success) {
                if (this.firmwareType === _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_1__["VEXFirmwareType"].Bootloader) {
                    this.updateConnectionState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Connected);
                    yield this.getConnectedDeviceInfo();
                    yield this.delay(200);
                    _EventSystem__WEBPACK_IMPORTED_MODULE_5__["fireEvent"]("VEXBLEBrowser.DeviceInfo", this.deviceInfo);
                }
            }
            if (state == _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXFWUpdateStatus"].CommunicationFailure) {
                this.disconnect(true);
            }
        });
    }
    updateFWUpdateProgress(progress) {
        return __awaiter(this, void 0, void 0, function* () {
            _EventSystem__WEBPACK_IMPORTED_MODULE_5__["fireEvent"]("VEXBLEBrowser.FWUpdateProgress", progress);
        });
    }
    autoconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            // this.device = await LocalStorage.load("ble_last_connected_device");
            if (this.device) {
                while (this.enableAutoConnect === true) {
                    try {
                        log.debug("reconnecting..");
                        yield this.delay(2000);
                        yield this.connect();
                        break;
                    }
                    catch (ex) {
                        log.error(ex);
                    }
                    yield this.delay(1000);
                }
            }
        });
    }
    scan() {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug("Scanning..");
            this.updateConnectionState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Scanning);
            let acceptAllDevices = false;
            this.optionalServices = [_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLEServiceID"].Programmer, _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLEServiceID"].OAD, _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLEServiceID"].Reset, _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLEServiceID"].device, _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLEServiceID"].Sensor];
            try {
                if (this.isWaitingToBootload) {
                    this.servicesFilter = [
                        { services: getServicesFilter(this.productType) },
                    ];
                }
                else {
                    this.servicesFilter = [
                        { services: getServicesFilter(this.productType) },
                    ];
                }
                if (this.showAllBLEDevicesNear === true) {
                    this.servicesFilter = undefined;
                    this.optionalServices = undefined;
                    acceptAllDevices = true;
                }
                this.device = yield navigator.bluetooth.requestDevice({
                    filters: this.servicesFilter,
                    optionalServices: this.optionalServices,
                    acceptAllDevices,
                });
                this.device.addEventListener("gattserverdisconnected", this.onDisconnected);
                // await LocalStorage.save("ble_last_connected_device",this.device);
            }
            catch (ex) {
                log.error(ex);
                this.device = undefined;
                this.updateConnectionState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Disconnected);
            }
        });
    }
    connect(attempt = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.device) {
                    log.info("device not selected");
                    return;
                }
                this.updateConnectionState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Connecting);
                yield this.delay(1000); // needed to reliabliy connect on some chromebooks
                this.server = yield this.device.gatt.connect().catch((e) => {
                    if (e.name === "TimeoutError") {
                        log.error("device failed to connect - timeout error", e);
                        // e.message = Device failed to connect after X seconds...
                        // Automatically try to reconnect
                        // return this.connect();
                        this.updateConnectionState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Disconnected);
                    }
                    throw e;
                });
                yield this.delay(1000);
                yield this.getServices();
                yield this.getAllCharacteristics();
                yield this.subscribeToCharacteristics();
                yield this.getConnectedDeviceInfo();
                yield this.delay(200);
                this.updateConnectionState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Connected);
                log.info("connected");
                _EventSystem__WEBPACK_IMPORTED_MODULE_5__["fireEvent"]("VEXBLEBrowser.DeviceInfo", this.deviceInfo);
                const deviceFwVersion = this.getDeviceFirmwareVersion();
                const deviceFwVersionStr = (deviceFwVersion) ? deviceFwVersion.getString() : "not available";
                log.info("Version from device ", deviceFwVersionStr);
                yield this.startNotifications();
                // check if its bootload
                if (this.deviceInfo.deviceMode === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXDeviceMode"].Update && this.autoUpdateOnBootLoad === true) {
                    this.isWaitingToBootload = false;
                    this.autoUpdateOnBootLoad = false;
                    this.updateFirmware();
                }
            }
            catch (ex) {
                log.error("error during connection : ", ex);
                if (attempt && attempt < 6) {
                    log.info("retrying connection..." + (attempt + 1));
                    yield this.delay(1000); // needed to reliabliy connect on some chromebooks
                    return yield this.connect(attempt + 1);
                }
                else {
                    this.updateConnectionState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BrainConnectionState"].Disconnected);
                    if (this.enableAutoConnect === true) {
                        this.enableAutoConnect = false;
                    }
                    return Promise.reject("failed to connect");
                }
            }
        });
    }
    getServices() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.server) {
                log.info("device not connected");
                return;
            }
            log.debug("getting services..");
            this.services = yield this.server.getPrimaryServices();
            log.debug("Available Services:");
            this.printServices(this.services);
        });
    }
    printServices(services) {
        if (services) {
            services.map((service) => {
                const serviceName = Object.keys(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLEServiceID"]).find((key) => _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLEServiceID"][key] === service.uuid);
                log.debug("Service Name: " + serviceName + " / UUID: " + service.uuid);
            });
        }
    }
    printCharacteristics(characteristics) {
        if (characteristics) {
            characteristics.map((characteristic) => {
                const charName = Object.keys(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"]).find((key) => _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"][key] === characteristic.uuid);
                log.debug("Characteristic Name: " + charName + " / UUID: " + characteristic.uuid);
            });
        }
    }
    getService(serviceID) {
        return __awaiter(this, void 0, void 0, function* () {
            let service;
            if (this.services && this.services.length > 0) {
                service = this.services.find((srv) => srv.uuid === serviceID);
            }
            return service;
        });
    }
    getAllCharacteristics() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.services && this.services.length > 0) {
                for (let sIndex = 0; sIndex < this.services.length; sIndex++) {
                    const service = this.services[sIndex];
                    const characteristics = yield service.getCharacteristics();
                    this.printCharacteristics(characteristics);
                    const charsFilter = __SERVICE_CHAR_MAP[service.uuid]; // Object.values(BLEUUID_CHAR);
                    if (!characteristics || !charsFilter) {
                        continue;
                    }
                    for (let cIndex = 0; cIndex < characteristics.length; cIndex++) {
                        if (charsFilter.includes(characteristics[cIndex].uuid)) {
                            this.characteristics[characteristics[cIndex].uuid] = characteristics[cIndex];
                        }
                    }
                }
                log.debug("filered Characteristics: ", this.characteristics);
            }
        });
    }
    subscribeToCharacteristics() {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug("subscribeToCharacteristics");
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].addEventListener("characteristicvaluechanged", this.notificationHandlerProgramCommand);
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramSensorStatus]) {
                this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramSensorStatus].addEventListener("characteristicvaluechanged", this.notificationHandlerSensorStatus);
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramPortCmdStatus]) {
                this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramPortCmdStatus].addEventListener("characteristicvaluechanged", this.notificationHandlerPortCommandStatus);
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageID]) {
                this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageID].addEventListener("characteristicvaluechanged", this.notificationHandlerOADImageID);
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageCtrl]) {
                this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageCtrl].addEventListener("characteristicvaluechanged", this.notificationHandlerOADImageCtrl);
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageBlock]) {
                this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageBlock].addEventListener("characteristicvaluechanged", this.notificationHandlerOADImageBlock);
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramBotConfig]) {
                this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramBotConfig].addEventListener("characteristicvaluechanged", this.notificationHandlerProgramBotConfig);
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoHardwareRev]) {
                this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoHardwareRev].addEventListener("characteristicvaluechanged", this.notificationHandlerDevInfoHardwareRev);
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoLog]) {
                this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoLog].addEventListener("characteristicvaluechanged", this.notificationHandlerDeviceLog);
            }
        });
    }
    startNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug("startNotifications");
            // TODO: - This should be modified to consider only the characteristics subscribed /used by the app
            this.enableProgramCommandStatus(true);
            this.enableProgramSensorStatus(true);
            this.enableProgramPortCmdStatus(true);
            this.enableFirmwareUpdateService(true);
            //this.enableDeviceInfoLogService(true);
        });
    }
    unSubscribeToCharacteristics() {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug("unSubscribeToCharacteristics");
            // unregister events
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].removeEventListener("characteristicvaluechanged", this.notificationHandlerProgramCommand);
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramSensorStatus]) {
                this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramSensorStatus].removeEventListener("characteristicvaluechanged", this.notificationHandlerSensorStatus);
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramPortCmdStatus]) {
                this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramPortCmdStatus].removeEventListener("characteristicvaluechanged", this.notificationHandlerPortCommandStatus);
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageID]) {
                this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageID].removeEventListener("characteristicvaluechanged", this.notificationHandlerOADImageID);
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageCtrl]) {
                this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageCtrl].removeEventListener("characteristicvaluechanged", this.notificationHandlerOADImageCtrl);
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageBlock]) {
                this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageBlock].removeEventListener("characteristicvaluechanged", this.notificationHandlerOADImageBlock);
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoHardwareRev]) {
                this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoHardwareRev].removeEventListener("characteristicvaluechanged", this.notificationHandlerDevInfoHardwareRev);
            }
            if (this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoLog]) {
                this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoLog].removeEventListener("characteristicvaluechanged", this.notificationHandlerDeviceLog);
            }
            this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand] = undefined;
            this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramSensorStatus] = undefined;
            this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramPortCmdStatus] = undefined;
            this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageID] = undefined;
            this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageCtrl] = undefined;
            this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageBlock] = undefined;
            this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoHardwareRev] = undefined;
            this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].DevInfoLog] = undefined;
            this.lastPortCommandStatus = undefined;
            this.lastProgramSensorStatus = undefined;
        });
    }
    doDownload() {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug("download statemachine..");
            try {
                switch (this.downloadState) {
                    case _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["FWDownloadState"].PaySize:
                        yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageCtrl].writeValue(Uint8Array.of(1));
                        break;
                    case _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["FWDownloadState"].ImgVerify:
                        this.firmwareImage.printHdr();
                        // generate header data
                        const headerData = this.firmwareImage.imgIdRequestData();
                        log.debug(headerData);
                        yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageID].writeValue(headerData);
                        break;
                    case _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["FWDownloadState"].SendBlock:
                        if (this.oadLastStatus !== 0 && this.oadLastStatus !== _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXFWUpdateStatus"].OAD_DL_COMPLETE) {
                            // Notifiy UI
                            // Error abort
                            this.updateFWUpdateState(_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["VEXFWUpdateStatus"].CommunicationFailure);
                            return;
                        }
                        const blockData = this.firmwareImage.block(this.oadNextAddress, this.payloadSize);
                        if (blockData !== undefined) {
                            const percentDone = (this.oadNextAddress * this.payloadSize) / this.firmwareImage.data.length;
                            let done = percentDone * 100;
                            if (done > 99) {
                                done = 99;
                            }
                            done = Math.round(done);
                            log.debug(`Sending Block: ${this.oadNextAddress} Size: ${blockData.length} Done %: ${percentDone}`);
                            // Progress callback to UI
                            this.updateFWUpdateProgress(done);
                            yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageBlock].writeValue(blockData);
                        }
                        else {
                            // sent all the data. send image enable
                            yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].OADImageCtrl].writeValue(Uint8Array.of(4));
                            // Progress callback to UI
                            this.updateFWUpdateProgress(100);
                        }
                        break;
                    default:
                        log.error("unknown download state");
                        break;
                }
            }
            catch (ex) {
                log.error("doDownload: error during update:", ex);
                throw ex;
            }
        });
    }
    sendExecuteSingleCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected() && this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                const raw = _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["uint32ToByteArray"](command);
                const commandBuffer = new Uint8Array(5);
                commandBuffer[0] = _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_EXE_SINGLE;
                commandBuffer[1] = raw[0];
                commandBuffer[2] = raw[1];
                commandBuffer[3] = raw[2];
                commandBuffer[4] = raw[3];
                try {
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(commandBuffer).catch((reason) => {
                        throw reason;
                    });
                }
                catch (ex) {
                    yield this.delay(200);
                    log.debug("sendExecuteSingleCommand: ", ex);
                    log.debug("sendExecuteSingleCommand: ", "Retry...");
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(commandBuffer);
                }
            }
        });
    }
    sendExecuteMultiCommand(commands) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected() && this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                const commandBuffer = new Uint8Array(commands.length * 5);
                for (let i = 0; i < commands.length; i++) {
                    const raw = _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["uint32ToByteArray"](commands[i]);
                    if (i < 4) {
                        const offset = i * 5;
                        commandBuffer[offset + 0] = _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_EXE_SINGLE;
                        commandBuffer[offset + 1] = raw[0];
                        commandBuffer[offset + 2] = raw[1];
                        commandBuffer[offset + 3] = raw[2];
                        commandBuffer[offset + 4] = raw[3];
                    }
                }
                try {
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(commandBuffer).catch((reason) => {
                        throw reason;
                    });
                }
                catch (ex) {
                    yield this.delay(200);
                    log.debug("sendExecuteMultiCommand: ", ex);
                    log.debug("sendExecuteMultiCommand: ", "Retry...");
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(commandBuffer);
                }
            }
        });
    }
    processDevLog(value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!value)
                return;
            //const dataUint8Arr = new Uint8Array(value);
            let logStr = new TextDecoder("utf-8").decode(value);
            let parts = logStr.split("\r");
            parts.forEach(element => {
                log.debug(`Brain Log: ${element})`);
            });
        });
    }
    //controller
    /**
 * Assigns a program command to a button press/release
 * @param buttonID Button ID to assign this command to. Values are 0 -> 15. Any value above 15 will clear all button commands
 * @param pressed If true this command will execute when the button value transitions from 0 to 1 else it will execute when the button value transitions from 1 to 0
 * @param buttonCommand 4 Byte command to execute when the button is pressed or released
 */
    setControlButtonCommand(buttonID, pressed, buttonCommand) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected() && this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                const raw = _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["uint32ToByteArray"](buttonCommand);
                const commandBuffer = new Uint8Array(7);
                commandBuffer[0] = _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_SET_BUTTON_CMD;
                commandBuffer[1] = buttonID;
                commandBuffer[2] = pressed ? (new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["UInt8"](1)).Get() : (new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["UInt8"](0)).Get();
                commandBuffer[3] = raw[0];
                commandBuffer[4] = raw[1];
                commandBuffer[5] = raw[2];
                commandBuffer[6] = raw[3];
                try {
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(commandBuffer).catch((reason) => {
                        throw reason;
                    });
                }
                catch (ex) {
                    yield this.delay(200);
                    log.debug("setControlButtonCommand: ", ex);
                    log.debug("setControlButtonCommand: ", "Retry...");
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(commandBuffer);
                }
            }
        });
    }
    /**
     * Sends control values to robot
     * @param leftX Left Stick X value (0 to 255). 127 == stop
     * @param leftY Left Stick Y value (0 to 255). 127 == stop
     * @param rightX Right Stick X value (0 to 255). 127 == stop
     * @param rightY Right Stick Y value (0 to 255). 127 == stop
     * @param Buttons1 First 8 button bit map
     * @param Buttons2 Second 8 button bit map
     */
    setControlControlValues(leftX = 127, leftY = 127, rightX = 127, rightY = 127, Buttons1 = 0, Buttons2 = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected() && this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                const commandBuffer = new Uint8Array(7);
                commandBuffer[0] = _ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_SET_CONTROLL_VALUES;
                commandBuffer[1] = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["UInt8"](leftX)).Get();
                commandBuffer[2] = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["UInt8"](leftY)).Get();
                commandBuffer[3] = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["UInt8"](rightX)).Get();
                commandBuffer[4] = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["UInt8"](rightY)).Get();
                commandBuffer[5] = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["UInt8"](Buttons1)).Get();
                commandBuffer[6] = (new _BitManipulations__WEBPACK_IMPORTED_MODULE_4__["UInt8"](Buttons2)).Get();
                try {
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(commandBuffer).catch((reason) => {
                        throw reason;
                    });
                }
                catch (ex) {
                    //await this.delay(200);
                    log.debug("SetControlControlValues: ", ex);
                    log.debug("SetControlControlValues: ", "Retry...");
                    //await this.characteristics[BLECharacteristicsID.ProgramCommand].writeValue(commandBuffer);
                }
            }
        });
    }
    /**
     * Sends a command to set the stick type for control values
     * @param newType
     * @param driveSensi
     * @param turnSensi
     */
    setControlDriveStickType(newType, driveSensi = 50, turnSensi = 25) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected() && this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand]) {
                const value = new Uint8Array([_ProgramUtil__WEBPACK_IMPORTED_MODULE_3__["ProgramConst"].PROG_CMD_SET_STICK_MODE_CMD, newType, driveSensi, turnSensi]);
                try {
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(value).catch((reason) => {
                        throw reason;
                    });
                }
                catch (ex) {
                    yield this.delay(200);
                    log.debug("setControlDriveStickType: ", ex);
                    log.debug("setControlDriveStickType: ", "Retry...");
                    yield this.characteristics[_types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["BLECharacteristicsID"].ProgramCommand].writeValue(value);
                }
            }
        });
    }
    controllerLoopRun() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isControllerUpdateRunning = true;
            try {
                while (this.isControllerUpdateRunning) {
                    try {
                        yield this.controllerUpdate();
                        yield this.delay(this.controllerUpdateInterval * 1000);
                        //log.debug("controller update loop running..")
                    }
                    catch (error) {
                        log.debug("controllerLoopRun: ", error);
                    }
                }
            }
            catch (error) {
                log.debug("controllerLoopRun: ", error);
            }
        });
    }
    controllerLoopStop() {
        this.isControllerUpdateRunning = false;
    }
    // helpers
    delay(ms, payload) {
        return new Promise((resolve) => {
            setTimeout(() => { resolve(payload); }, ms);
        });
    }
    exponentialBackoff(max, delay, toTry, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield toTry();
                success(result);
            }
            catch (error) {
                if (max === 0) {
                    return fail();
                }
                this.time("Retrying in " + delay + "s... (" + max + " tries left)");
                setTimeout(() => {
                    this.exponentialBackoff(--max, delay * 2, toTry, success, fail);
                }, delay * 1000);
            }
        });
    }
    appendArrayBuffer(buffer1, buffer2) {
        const length1 = buffer1 ? buffer1.byteLength : 0;
        const length2 = buffer2 ? buffer2.byteLength : 0;
        const tmp = new Uint8Array(length1 + length2);
        if (tmp.length === 0) {
            return null;
        }
        if (buffer1) {
            tmp.set(new Uint8Array(buffer1), 0);
        }
        if (buffer2) {
            tmp.set(new Uint8Array(buffer2), length1);
        }
        return tmp.buffer;
    }
    printBuffer(buf, maxLength) {
        if (!maxLength) {
            maxLength = buf.length;
        }
        let str = "";
        for (let i = 0; i < buf.length && i < maxLength; i++) {
            str += ("00" + buf[i].toString(16)).substr(-2, 2) + " ";
        }
        if (maxLength < buf.length) {
            str += " ... ";
        }
        log.debug(str);
    }
    time(text) {
        log.debug("[" + new Date().toJSON().substr(11, 8) + "] " + text);
    }
}


/***/ }),

/***/ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/VEXBLEFirmware.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/VEXBLEFirmware.js ***!
  \************************************************************************************/
/*! exports provided: VEXFirmwareType, VEXFirmwareVersion, VEXBLEFirmware, VEXBLEFirmwareImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXFirmwareType", function() { return VEXFirmwareType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXFirmwareVersion", function() { return VEXFirmwareVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXBLEFirmware", function() { return VEXBLEFirmware; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXBLEFirmwareImage", function() { return VEXBLEFirmwareImage; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/vex-ble-device-manager/node_modules/@rm-vca/logger/dist/logger.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/VEXBLEDeviceManagerTypes */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLEDeviceManagerTypes.js");
/* harmony import */ var _LocalStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocalStorage */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/LocalStorage.js");
/* harmony import */ var _BitManipulations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BitManipulations */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/BitManipulations.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("vex-web-ble-device-manager");
log.setLevel(log.levels.INFO);



// Type of firmware to load from server
var VEXFirmwareType;
(function (VEXFirmwareType) {
    VEXFirmwareType[VEXFirmwareType["Release"] = 1] = "Release";
    VEXFirmwareType[VEXFirmwareType["Beta"] = 2] = "Beta";
    VEXFirmwareType[VEXFirmwareType["Development"] = 3] = "Development";
    VEXFirmwareType[VEXFirmwareType["Bootloader"] = 4] = "Bootloader";
})(VEXFirmwareType || (VEXFirmwareType = {}));
class VEXFirmwareVersion {
    constructor(major, minor, build, beta) {
        this.major = 0;
        this.minor = 0;
        this.build = 0;
        this.beta = 0;
        this.major = major;
        this.minor = minor;
        this.build = build;
        this.beta = beta;
    }
    static getEmpty() {
        return new VEXFirmwareVersion(0, 0, 0, 0);
    }
    getString() {
        return `${this.major}.${this.minor}.${this.build}.B${this.beta}`;
    }
    isLessThan(targetVersion) {
        if (this.major < targetVersion.major) {
            return true;
        }
        if (this.major > targetVersion.major) {
            return false;
        }
        // if it gets here, the major matches, now check minor
        if (this.minor < targetVersion.minor) {
            return true;
        }
        if (this.minor > targetVersion.minor) {
            return false;
        }
        // if it gets here, the major & minor matches, check build
        if (this.build < targetVersion.build) {
            return true;
        }
        if (this.build > targetVersion.build) {
            return false;
        }
        // now check beta
        // beta 0 is a release version. so we ignore upgrade from beta 0 to say beta 1
        if ((this.beta !== 0) && (this.beta < targetVersion.beta)) {
            return false;
        }
        // allow upgrade from beta 10 to beta 0 (public release) of the same major.minor
        if ((targetVersion.beta === 0) && this.beta !== targetVersion.beta) {
            return true;
        }
        return false;
    }
    isEmpty() {
        return (this.major === 0 && this.minor === 0 && this.build === 0 && this.beta === 0);
    }
}
var ImgType;
(function (ImgType) {
    ImgType[ImgType["EFL_OAD_IMG_TYPE_PERIST"] = 0] = "EFL_OAD_IMG_TYPE_PERIST";
    ImgType[ImgType["EFL_OAD_IMG_TYPE_APP"] = 1] = "EFL_OAD_IMG_TYPE_APP";
    ImgType[ImgType["EFL_OAD_IMG_TYPE_NONE"] = 255] = "EFL_OAD_IMG_TYPE_NONE";
})(ImgType || (ImgType = {}));
// source: https://en.wikipedia.org/wiki/Intel_HEX
var RecordType;
(function (RecordType) {
    RecordType[RecordType["DATA"] = 0] = "DATA";
    RecordType[RecordType["EOF"] = 1] = "EOF";
    RecordType[RecordType["EXT_SEG_ADDR"] = 2] = "EXT_SEG_ADDR";
    RecordType[RecordType["START_SEG_ADDR"] = 3] = "START_SEG_ADDR";
    RecordType[RecordType["EXT_LIN_ADDR"] = 4] = "EXT_LIN_ADDR";
    RecordType[RecordType["START_LIN_ADDR"] = 5] = "START_LIN_ADDR";
})(RecordType || (RecordType = {}));
class VEXBLEFirmware {
    constructor(productType = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].Unknown) {
        // public
        this.AllGood = false;
        if (productType === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].Unknown) {
            console.error("Firmware : Product Type missing in constructor");
        }
        this.productType = productType;
    }
    setProductType(productType) {
        this.productType = productType;
    }
    // public
    getVersionFromServer(firmwareType = VEXFirmwareType.Release, productType = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].Unknown) {
        return __awaiter(this, void 0, void 0, function* () {
            const versionFileNameFromServer = yield this.getFirmwareFileNameFromServer(firmwareType, productType);
            const versionParts = versionFileNameFromServer.split("_");
            if (versionParts.length > 5) {
                return new VEXFirmwareVersion(parseInt(versionParts[versionParts.length - 4], 10), parseInt(versionParts[versionParts.length - 3], 10), parseInt(versionParts[versionParts.length - 2], 10), parseInt(versionParts[versionParts.length - 1], 10));
            }
            return new VEXFirmwareVersion(0, 0, 0, 0);
        });
    }
    getImageFromServer(firmwareType = VEXFirmwareType.Release) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileName = yield this.getFirmwareFileNameFromServer(firmwareType, this.productType);
                const productName = this.getProductName();
                if (fileName && productName) {
                    let vexosUrl = `https://content.vexrobotics.com/vexos/public${(firmwareType !== VEXFirmwareType.Release) ? "_beta" : ""}/${productName}/${fileName}.vexos`;
                    if (firmwareType === VEXFirmwareType.Bootloader && productName == "Go") {
                        vexosUrl = `https://content.vexrobotics.com/vexos/public_beta/Go/Bootloader/${fileName}.vexos`;
                    }
                    const serverImage = yield this.getFileFromServer(vexosUrl, "text", undefined, undefined, (percent) => {
                        log.debug("dowloading vexos from server (%) : ", percent * 100);
                    }).catch((reason) => { throw reason; });
                    return (serverImage) ? serverImage : "";
                }
                else {
                    return "";
                }
            }
            catch (ex) {
                console.error("error downloading vexos from server: ", ex);
                return "";
            }
        });
    }
    getVersionFromLocalFile(firmwareType = VEXFirmwareType.Release, productType = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].Unknown) {
        return __awaiter(this, void 0, void 0, function* () {
            const versionFileNameFromLocal = yield this.getFirmwareFileNameFromLocal(firmwareType, productType);
            const versionParts = versionFileNameFromLocal.split("_");
            if (versionParts.length < 5) {
                // TODO load from local resources
            }
            if (versionParts.length > 5) {
                return new VEXFirmwareVersion(parseInt(versionParts[versionParts.length - 4], 10), parseInt(versionParts[versionParts.length - 3], 10), parseInt(versionParts[versionParts.length - 2], 10), parseInt(versionParts[versionParts.length - 1], 10));
            }
            return new VEXFirmwareVersion(0, 0, 0, 0);
        });
    }
    getImageFromLocalFile(firmwareType = VEXFirmwareType.Release) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resourcePath = _LocalStorage__WEBPACK_IMPORTED_MODULE_2__["getResourceFolder"]();
                const productName = this.getProductName();
                if (!productName) {
                    return undefined;
                }
                const localImageName = yield this.getFirmwareFileNameFromLocal(firmwareType);
                if (!localImageName) {
                    return undefined;
                }
                // get the image from local resources folder
                const localVEXOSURL = `${resourcePath}/vexos/public${firmwareType !== VEXFirmwareType.Release ? "_beta" : ""}/${productName}/${localImageName}.vexos`;
                const localImage = yield this.getFileFromServer(localVEXOSURL, "text", undefined, undefined).catch((reason) => { throw reason; });
                return (localImage) ? localImage : "";
            }
            catch (ex) {
                console.error("Error getting vexos from local file:", ex);
                return "";
            }
        });
    }
    getImageFromHex(hex) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = new VEXBLEFirmwareImage(hex);
                return image;
            }
            catch (ex) {
                console.error("error during processing hex:", ex);
            }
        });
    }
    // helpers
    getProductName(productType) {
        if (productType === undefined || productType === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].Unknown) {
            productType = this.productType;
        }
        switch (productType) {
            case _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].VEXCoder:
                return "Coder";
            case _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].VEX123Puck:
                return "123";
            case _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].VEXGO:
                return "Go";
            default:
                return "";
        }
        return "";
    }
    getFirmwareFileNameFromServer(firmwareType = VEXFirmwareType.Release, productType = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].Unknown) {
        return __awaiter(this, void 0, void 0, function* () {
            let catalogURL = "";
            let imageFileName;
            if (productType === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].Unknown) {
                if (this.productType === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].Unknown) {
                    return "";
                }
                productType = this.productType;
            }
            try {
                if (firmwareType === VEXFirmwareType.Beta) {
                    if (productType === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].VEXGO) {
                        catalogURL = `https://content.vexrobotics.com/vexos/public_beta/Go/catalog.txt`;
                    }
                    else if (productType === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].VEX123Puck) {
                        catalogURL = `https://content.vexrobotics.com/vexos/public_beta/123/catalog.txt`;
                    }
                    else if (productType === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].VEXCoder) {
                        catalogURL = `https://content.vexrobotics.com/vexos/public_beta/Coder/catalog.txt`;
                    }
                    else {
                        // This board is not recognized. Alert the user.
                        return "";
                    }
                }
                else if (firmwareType === VEXFirmwareType.Development) {
                    if (productType === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].VEXGO) {
                        catalogURL = `https://content.vexrobotics.com/vexos/public_beta/Go/catalog_dev.txt`;
                    }
                    else if (productType === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].VEX123Puck) {
                        catalogURL = `https://content.vexrobotics.com/vexos/public_beta/123/catalog_dev.txt`;
                    }
                    else if (productType === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].VEXCoder) {
                        catalogURL = `https://content.vexrobotics.com/vexos/public_beta/Coder/catalog_dev.txt`;
                    }
                    else {
                        // This board is not recognized. Alert the user.
                        return "";
                    }
                }
                else if (firmwareType === VEXFirmwareType.Bootloader) {
                    if (productType === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].VEXGO) {
                        catalogURL = `https://content.vexrobotics.com/vexos/public_beta/Go/Bootloader/catalog.txt`;
                    }
                    else {
                        // This board is not recognized. Alert the user.
                        return "";
                    }
                }
                else {
                    if (productType === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].VEXGO) {
                        catalogURL = `https://content.vexrobotics.com/vexos/public/Go/catalog.txt`;
                    }
                    else if (productType === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].VEX123Puck) {
                        catalogURL = `https://content.vexrobotics.com/vexos/public/123/catalog.txt`;
                    }
                    else if (productType === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].VEXCoder) {
                        catalogURL = `https://content.vexrobotics.com/vexos/public/Coder/catalog.txt`;
                    }
                    else {
                        // This board is not recognized. Alert the user.
                        return "";
                    }
                }
                imageFileName = yield this.getFileFromServer(catalogURL, "text", undefined, undefined, (percent) => {
                    log.debug("dowloading catalog (%) : ", percent * 100);
                }).catch((reason) => { throw reason; });
                return (imageFileName) ? imageFileName : "";
            }
            catch (error) {
                console.info("Error when fetching firmware catalog contents: ", error);
                return "";
            }
        });
    }
    getFirmwareFileNameFromLocal(firmwareType = VEXFirmwareType.Release, productType = _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].Unknown) {
        return __awaiter(this, void 0, void 0, function* () {
            if (productType === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].Unknown) {
                if (this.productType === _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].Unknown) {
                    return "";
                }
                productType = this.productType;
            }
            try {
                const resourcePath = _LocalStorage__WEBPACK_IMPORTED_MODULE_2__["getResourceFolder"]();
                const productName = this.getProductName(productType);
                if (!productName) {
                    return undefined;
                }
                // get the image name from local catalog
                let localVEXOSCatalogURL = `${resourcePath}/vexos/public${(firmwareType !== VEXFirmwareType.Release) ? "_beta" : ""}/${productName}/catalog${(firmwareType === VEXFirmwareType.Development) ? "_dev" : ""}.txt`;
                if (firmwareType === VEXFirmwareType.Bootloader && productType == _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXProductTypes"].VEXGO) {
                    localVEXOSCatalogURL = `${resourcePath}/vexos/public_beta/Go/Bootloader/catalog.txt`;
                }
                const localImageName = yield this.getFileFromServer(localVEXOSCatalogURL, "text", undefined, undefined).catch((reason) => { throw reason; });
                return (localImageName) ? localImageName : "";
            }
            catch (error) {
                console.error("Error when fetching firmware catalog contents: ", error);
                return "";
            }
        });
    }
    getFileFromServer(url, responseType, user, pass, progress) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                // xhr.setRequestHeader("Cache-Control", "no-cache,max-age=0");
                xhr.responseType = responseType;
                // yea, this is bad, but for now we hard code some stuff
                // if (user !== undefined && pass !== undefined) {
                //     xhr.withCredentials = true;
                //     xhr.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + pass));
                // } else if (user !== undefined) {
                //     xhr.withCredentials = true;
                //     xhr.setRequestHeader("Authorization", "Basic " + user);
                // }
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    }
                    if (xhr.status === 401) {
                        // auth error
                        resolve(undefined);
                    }
                    else {
                        reject(Error(`failed to get file from url: ${url}; error code: ` + xhr.statusText));
                    }
                };
                xhr.onerror = () => {
                    reject(Error("There was a network error."));
                };
                if (progress !== undefined) {
                    // progress on transfers from the server to the client (downloads)
                    xhr.onprogress = (oEvent) => {
                        if (oEvent.lengthComputable) {
                            const percentComplete = oEvent.loaded / oEvent.total;
                            if (progress !== undefined) {
                                progress(percentComplete);
                            }
                        }
                        else {
                            // Unable to compute progress information since the total size is unknown
                        }
                    };
                }
                xhr.send();
            });
        });
    }
}
class VEXBLEFirmwareImage {
    constructor(hex) {
        // image header
        this.crc0 = 0;
        this.crc1 = 0;
        this.ver = 0;
        this.len = 0;
        this.addr = 0;
        this.imgBaseAddr = 0;
        this.uid = new Uint8Array([0x45, 0x45, 0x45, 0x45]);
        this.imgType = ImgType.EFL_OAD_IMG_TYPE_NONE;
        this.lastBlock = false;
        this.data = new Uint8Array();
        // fixed assumptions made, using intel hex from hexmerge.py
        this.OAD_BLOCK_SIZE = 16;
        this.HAL_FLASH_WORD_SIZE = 4;
        // programming counters used duing bulk block transfer
        this.iBlocks = 0; // Number of blocks programmed
        this.nBlocks = 0; // Total number of blocks
        const img = [];
        const lines = this.generateLines(hex);
        let allGood = this.parseLines(lines);
        if (this.data.length === 0) {
            allGood = false;
        }
        // update header fields (start address was updated during the parse)
        this.len = this.data.length / (16 / 4);
        this.crc1 = 0xFFFF;
        this.crc0 = this.calcImageCRC(0, this.data);
        // reset all counters
        this.resetProgress();
    }
    block(blockNum, blockSize) {
        if (!this.lastBlock) {
            // iBlocks = blockNum;
            let blockCount = blockSize;
            let endVal = blockNum * (blockSize - 4) + (blockSize - 4);
            if (endVal > this.data.length) {
                endVal = this.data.length;
                this.lastBlock = true;
                // blockCount = data.length + 4;
            }
            const range = this.range((blockNum * (blockSize - 4)), endVal, false);
            blockCount = range.length + 4;
            const blockHead = new Uint8Array(4).fill(0);
            let block = new Uint8Array(blockCount).fill(0);
            blockHead[0] = (blockNum & 0xFF);
            blockHead[1] = ((blockNum >> 8) & 0xFF);
            blockHead[2] = ((blockNum >> 16) & 0xFF);
            blockHead[3] = ((blockNum >> 24) & 0xFF);
            const subdata = this.data.subarray(range[0], range[range.length - 1] + 1); // end is excluded so adding 1 here
            block = this.concat([blockHead, subdata]);
            return block;
        }
        return undefined;
    }
    // print image header for debugging
    printHdr() {
        log.debug("FwUpdateActivity :");
        log.debug("-----------------------------------------------");
        log.debug("ImgHdr.len = ", this.len);
        log.debug("ImgHdr.ver = ", this.ver);
        log.debug(`ImgHdr.uid = 0x${this.uid[0]}${this.uid[1]}${this.uid[2]}${this.uid[3]}`);
        log.debug(`ImgHdr.addr = 0x ${new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt32"](this.addr & 0xFFFFFFFF).Get()}`);
        log.debug("ImgHdr.imgType = ", this.imgType);
        log.debug(`ImgHdr.crc0 = 0x${new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt16"](this.crc0 & 0xFFFF).Get()}`);
        log.debug(this.bytesToHex(this.imgIdentifyRequestData()));
        log.debug("-----------------------------------------------");
    }
    // generate the image header data to identify with the OAD target
    imgIdRequestData() {
        let block = new Uint8Array(22).fill(0);
        // Note: end is excluded
        const block0 = this.data.subarray(0, 8); // length : 8
        const block8 = this.data.subarray(12, 14); // length : 2
        const block10 = this.data.subarray(16, 20); // length : 4
        const block14 = this.data.subarray(24, 28); // length : 4
        //If we are loading a persist app then we need to put the start address in this section
        if (this.imgType == ImgType.EFL_OAD_IMG_TYPE_PERIST) {
            let baseAddressByteArray = Object(_BitManipulations__WEBPACK_IMPORTED_MODULE_3__["uint32ToByteArray"])(this.imgBaseAddr);
            const block18 = new Uint8Array([baseAddressByteArray[0], baseAddressByteArray[1], baseAddressByteArray[2], baseAddressByteArray[3]]);
            block = this.concat([block0, block8, block10, block14, block18]);
        }
        else {
            const block18 = this.data.subarray(32, 36); // length : 4
            block = this.concat([block0, block8, block10, block14, block18]);
        }
        return block;
    }
    // generate the image header data to identify with the OAD target
    imgIdentifyRequestData() {
        const tmp = new Uint8Array(16);
        tmp[0] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt8"](this.crc0 & 0xFF).Get();
        tmp[1] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt8"]((this.crc0 >> 8) & 0xFF).Get();
        tmp[2] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt8"](this.crc1 & 0xFF).Get();
        tmp[3] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt8"]((this.crc1 >> 8) & 0xFF).Get();
        tmp[4] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt8"](this.ver & 0xFF).Get();
        tmp[5] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt8"]((this.ver >> 8) & 0xFF).Get();
        tmp[6] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt8"](this.len & 0xFF).Get();
        tmp[7] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt8"]((this.len >> 8) & 0xFF).Get();
        tmp[8] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt8"](this.uid[0]).Get();
        tmp[9] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt8"](this.uid[1]).Get();
        tmp[10] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt8"](this.uid[2]).Get();
        tmp[11] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt8"](this.uid[3]).Get();
        tmp[12] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt8"](this.addr & 0xFF).Get();
        tmp[13] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt8"]((this.addr >> 8) & 0xFF).Get();
        tmp[14] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt8"](this.imgType & 0xFF).Get();
        tmp[15] = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["UInt8"](0xFF).Get();
        return tmp;
    }
    generateLines(hex) {
        if (hex) {
            const lines = hex.split("\n").filter((line) => (line) ? true : false);
            log.debug("No of lines : ", lines.length);
            return lines;
        }
        return [];
    }
    parseLines(lines) {
        let currentAddressBase = 0;
        let currentAddress;
        for (const line of lines) {
            // log.debug("parsing : ", line);
            if (!line.startsWith(":")) {
                continue;
            }
            // try to get the number of bytes in this line
            const numBytesStr = line.substr(1, 2);
            if (!numBytesStr) {
                continue;
            }
            const numBytes = parseInt(numBytesStr, 16);
            if (isNaN(numBytes)) {
                continue;
            }
            // try to get record type
            const recordTypeStr = line.substr(7, 2);
            if (!recordTypeStr) {
                continue;
            }
            const recordTypeInt = parseInt(recordTypeStr, 16);
            if (isNaN(recordTypeInt)) {
                continue;
            }
            // log.debug("numBytesStr: ", numBytesStr);
            // log.debug("numBytes: ", numBytes);
            // log.debug("recordTypeStr: ", recordTypeStr);
            // log.debug("recordTypeInt: ", recordTypeInt);
            try {
                const recordType = recordTypeInt;
                // log.debug("recordType: ", recordType);
                switch (recordType) {
                    case RecordType.DATA:
                        // try to get 16bit block address
                        const blockAddrStr = line.substr(3, 4);
                        let blockAddr = parseInt(blockAddrStr, 16);
                        if (isNaN(recordTypeInt)) {
                            continue;
                        }
                        // the block address in the line is relative to a previous base address record (if there was one)
                        blockAddr += currentAddressBase;
                        // if this is the very first data block address in the image,
                        // this will be the address we report in the image header
                        // the OAD target will program the image starting at this address, after reboot
                        if (currentAddress === undefined) {
                            this.addr = blockAddr / (16 / 4); // block address is multiple of 4 as per OAD UG
                            this.imgBaseAddr = blockAddr;
                        }
                        // this is not the first address, check if we need to padd
                        if (currentAddress !== undefined && currentAddress < blockAddr) {
                            const numPadBytes = (blockAddr - currentAddress);
                            const padData = new Uint8Array(numPadBytes).fill(0xFF);
                            // Append to data
                            this.data = this.concat([this.data, padData]);
                        }
                        // log.debug("data: ", this.data);
                        currentAddress = blockAddr;
                        // try to get the bytes as Data
                        const lineDataStr = line.substr(9, (numBytes * 2));
                        if (!lineDataStr) {
                            continue;
                        }
                        const lineData = this.hexToBytes(lineDataStr);
                        // log.debug("lineData: ", lineData);
                        this.data = this.concat([this.data, lineData]);
                        // log.debug("data: ", this.data);
                        currentAddress = currentAddress + lineData.length;
                        // log.debug("currentAddress : ", currentAddress);
                        break;
                    case RecordType.EXT_LIN_ADDR:
                        // try to get ext seg 16bit address
                        const extLinAddrStr = line.substr(9, 4);
                        if (!extLinAddrStr) {
                            continue;
                        }
                        let extLinAddr = parseInt(extLinAddrStr, 16);
                        extLinAddr = extLinAddr << 16;
                        // update current base address. all subsequent addresses are relative to this base address
                        currentAddressBase = extLinAddr;
                        break;
                    case RecordType.EOF:
                        break;
                    default:
                        return false;
                }
            }
            catch (e) {
                log.error("parsing failed for the line. continuing...", e);
                continue;
            }
        }
        //set image type
        if (this.data.length > 19) {
            //TODO: enum conversion might be not be safe here
            this.imgType = (this.data[18]);
        }
        return true;
    }
    calcImageCRC(startPage, data) {
        try {
            let crc = 0;
            let addr = startPage * 0x1000;
            let page = startPage;
            let pageEnd = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["Int32"](this.len / (0x1000 / 4)).Get();
            const osetEnd = (this.len - (pageEnd * (0x1000 / 4))) * 4;
            pageEnd += startPage;
            if (data.length === 0) {
                return -1;
            }
            // tslint:disable-next-line: no-constant-condition
            while (true) {
                let oset = 0;
                while (oset < 0x1000) {
                    // log.debug(`page: ${page}, pageEnd: ${pageEnd}`);
                    if ((page === startPage) && (oset === 0x00)) {
                        // Skip the CRC and shadow.
                        // Note: this increments by 3 because oset is incremented by 1 in each pass
                        // through the loop
                        oset += 3;
                    }
                    else if ((page === pageEnd) && (oset === osetEnd)) {
                        crc = this.crc16(crc, 0x00);
                        crc = this.crc16(crc, 0x00);
                        return crc;
                    }
                    else {
                        crc = this.crc16(crc, this.data[addr + oset]);
                    }
                    oset += 1;
                }
                page += 1;
                addr = page * 0x1000;
            }
        }
        catch (ex) {
            console.error("Error calcuating crc of image: ", ex);
            return -1;
        }
    }
    // calculate a 16bit crc
    crc16(startCrc, startVal) {
        let val = startVal;
        let crc = startCrc;
        const poly = 0x1021;
        let cnt = 0;
        while (cnt < 8) {
            let msb = 0;
            if ((crc & 0x8000) === 0x8000) {
                msb = 1;
            }
            else {
                msb = 0;
            }
            crc <<= 1;
            if ((val & 0x80) === 0x80) {
                crc |= 0x0001;
            }
            if (msb === 1) {
                crc ^= poly;
            }
            cnt += 1;
            val <<= 1;
        }
        return crc;
    }
    resetProgress() {
        this.iBlocks = 0;
        this.nBlocks = new _BitManipulations__WEBPACK_IMPORTED_MODULE_3__["Int32"](this.len / (this.OAD_BLOCK_SIZE / this.HAL_FLASH_WORD_SIZE)).Get();
    }
    concat(arrays) {
        // sum of individual array lengths
        const totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
        if (!arrays.length) {
            return undefined;
        }
        const result = new Uint8Array(totalLength);
        // for each array - copy it over result
        // next array is copied right after the previous one
        let length = 0;
        for (const array of arrays) {
            result.set(array, length);
            length += array.length;
        }
        return result;
    }
    appendArrayBuffer(buffer1, buffer2) {
        const length1 = buffer1 ? buffer1.byteLength : 0;
        const length2 = buffer2 ? buffer2.byteLength : 0;
        const tmp = new Uint8Array(length1 + length2);
        if (tmp.length === 0) {
            return null;
        }
        if (buffer1) {
            tmp.set(new Uint8Array(buffer1), 0);
        }
        if (buffer2) {
            tmp.set(new Uint8Array(buffer2), length1);
        }
        return tmp.buffer;
    }
    hexToBytes(hex) {
        hex = hex.replace(" ", "");
        const bytes = [];
        for (let c = 0; c < hex.length; c += 2) {
            const byte = parseInt(hex.substr(c, 2), 16);
            if (isNaN(byte)) {
                throw Error("invalid hex string");
            }
            else {
                bytes.push(byte);
            }
        }
        return Uint8Array.from(bytes);
    }
    // Convert a byte array to a hex string
    bytesToHex(bytes) {
        const hex = [];
        for (let i = 0; i < bytes.length; i++) {
            const current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
            hex.push((current >>> 4).toString(16));
            hex.push((current & 0xF).toString(16));
        }
        return hex.join("");
    }
    range(start, end, includeEnd = true) {
        const total = [];
        if ((!start && !end)) {
            return [];
        }
        if (end < start) {
            return [];
        }
        if (!includeEnd) {
            end = end - 1;
        }
        for (let i = start; i <= end; i += 1) {
            total.push(i);
        }
        return total;
    }
}


/***/ }),

/***/ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/index.js ***!
  \***************************************************************************/
/*! exports provided: init, scanAndConnect, disconnect, getConnectionState, getDeviceInfo, getLatestFirmwareVersion, getLatestBootloaderVersion, getDeviceFirmwareVersion, getDeviceBootloaderVersion, setFirmwareToBeta, updateFirmware, CanUpdateBootloader, bootload, powerOff, reboot, enableProgramCommandStatus, isProgramCommandStatusEnabled, enableSensorStatus, isSensorStatusEnabled, enablePortCmdStatus, isPortCommandStatusEnabled, clearPortEvents, enableDeviceLogService, isDeviceLogServiceEnabled, sendCommand, sendCommandMultiple, sendRobotConfigPreset, requestRobotConfig, stopProgram, LocateRobot, setRobotName, showAllBLEDevices, setPortConfig, RequestConnectionInterval, getMachineBleHardwareInfo, SetSensorMode, Get123RobotUserSettings, Set123RobotUserSettings, controllerEnable, controllerIsEnabled, controllerSetStickValues, controllerSetButonValue, setControlDriveStickType, controllerClearValues, controllerAddButtonCommand, saveControlSettings, setControlControlValues, VEXAckValue, VEXPortNumber, VEXPortConfigFlags, VEXDeviceMode, VEXFirmwareType, VEXBLEChromeEvents, VEXRobotConfigPreset, VEXDeviceInfo, BrainConnectionState, VEXProgramSensorStatus, VEXBotCommandStatus, VEXPortCommandStatus, VEXPortDetails, VEXProgramPortConfig, VEXFirmwareVersion, VEXFWUpdateStatus, IsFWUpdateSupported, VEXPortCommandMotorStatus, VEXPortCommandDriveStatus, VEXPortCommandMagnetStatus, VEXPortCommandBumperStatus, VEXPortCommand123BotStatus, VEXPortCommandSoundStatus, VEXDrivePortFlagConst, VEXMotorPortFlagConst, VEXMotorPortModeConst, VEXBumperPortFlagConst, VEXPortMotorDetails, VEXPortDeviceID, VEXPortDetailIDs, VEXDeviceSensorMode, VEX123RobotUserSettings, vex123DeviceFlags, VEXButtonValues, VEXDriveStickType, getCommandNameFromID, ProgramCommands, getDeviceManagerVersion, Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scanAndConnect", function() { return scanAndConnect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disconnect", function() { return disconnect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConnectionState", function() { return getConnectionState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDeviceInfo", function() { return getDeviceInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLatestFirmwareVersion", function() { return getLatestFirmwareVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLatestBootloaderVersion", function() { return getLatestBootloaderVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDeviceFirmwareVersion", function() { return getDeviceFirmwareVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDeviceBootloaderVersion", function() { return getDeviceBootloaderVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFirmwareToBeta", function() { return setFirmwareToBeta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateFirmware", function() { return updateFirmware; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanUpdateBootloader", function() { return CanUpdateBootloader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bootload", function() { return bootload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "powerOff", function() { return powerOff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reboot", function() { return reboot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableProgramCommandStatus", function() { return enableProgramCommandStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isProgramCommandStatusEnabled", function() { return isProgramCommandStatusEnabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableSensorStatus", function() { return enableSensorStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSensorStatusEnabled", function() { return isSensorStatusEnabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enablePortCmdStatus", function() { return enablePortCmdStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPortCommandStatusEnabled", function() { return isPortCommandStatusEnabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearPortEvents", function() { return clearPortEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableDeviceLogService", function() { return enableDeviceLogService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDeviceLogServiceEnabled", function() { return isDeviceLogServiceEnabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendCommand", function() { return sendCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendCommandMultiple", function() { return sendCommandMultiple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendRobotConfigPreset", function() { return sendRobotConfigPreset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestRobotConfig", function() { return requestRobotConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopProgram", function() { return stopProgram; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocateRobot", function() { return LocateRobot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRobotName", function() { return setRobotName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showAllBLEDevices", function() { return showAllBLEDevices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPortConfig", function() { return setPortConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestConnectionInterval", function() { return RequestConnectionInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMachineBleHardwareInfo", function() { return getMachineBleHardwareInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetSensorMode", function() { return SetSensorMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Get123RobotUserSettings", function() { return Get123RobotUserSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Set123RobotUserSettings", function() { return Set123RobotUserSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllerEnable", function() { return controllerEnable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllerIsEnabled", function() { return controllerIsEnabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllerSetStickValues", function() { return controllerSetStickValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllerSetButonValue", function() { return controllerSetButonValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setControlDriveStickType", function() { return setControlDriveStickType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllerClearValues", function() { return controllerClearValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllerAddButtonCommand", function() { return controllerAddButtonCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveControlSettings", function() { return saveControlSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setControlControlValues", function() { return setControlControlValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IsFWUpdateSupported", function() { return IsFWUpdateSupported; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCommandNameFromID", function() { return getCommandNameFromID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDeviceManagerVersion", function() { return getDeviceManagerVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return log; });
/* harmony import */ var _VEXBLEDeviceManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VEXBLEDeviceManager */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/VEXBLEDeviceManager.js");
/* harmony import */ var _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/VEXBLEDeviceManagerTypes */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLEDeviceManagerTypes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXDeviceMode", function() { return _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXDeviceMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXRobotConfigPreset", function() { return _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXRobotConfigPreset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BrainConnectionState", function() { return _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXFWUpdateStatus", function() { return _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXFWUpdateStatus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXButtonValues", function() { return _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXButtonValues"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXDriveStickType", function() { return _types_VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_1__["VEXDriveStickType"]; });

/* harmony import */ var _EventSystem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EventSystem */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/EventSystem.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "VEXBLEChromeEvents", function() { return _EventSystem__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _types_VEBLEProgramStatus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/VEBLEProgramStatus */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEBLEProgramStatus.js");
/* harmony import */ var _VEXBLEDevice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VEXBLEDevice */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/VEXBLEDevice.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXDeviceInfo", function() { return _VEXBLEDevice__WEBPACK_IMPORTED_MODULE_4__["VEXDeviceInfo"]; });

/* harmony import */ var _types_VEXBLESensorStatus__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../types/VEXBLESensorStatus */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLESensorStatus.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXProgramSensorStatus", function() { return _types_VEXBLESensorStatus__WEBPACK_IMPORTED_MODULE_5__["VEXProgramSensorStatus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXDeviceSensorMode", function() { return _types_VEXBLESensorStatus__WEBPACK_IMPORTED_MODULE_5__["VEXDeviceSensorMode"]; });

/* harmony import */ var _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../types/VEXBLEPortStatus */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLEPortStatus.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXPortNumber", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXPortNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXPortConfigFlags", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXPortConfigFlags"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXBotCommandStatus", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXBotCommandStatus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXPortCommandStatus", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXPortCommandStatus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXPortDetails", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXPortDetails"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXProgramPortConfig", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXProgramPortConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXPortCommandMotorStatus", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXPortCommandMotorStatus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXPortCommandDriveStatus", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXPortCommandDriveStatus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXPortCommandMagnetStatus", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXPortCommandMagnetStatus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXPortCommandBumperStatus", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXPortCommandBumperStatus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXPortCommand123BotStatus", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXPortCommand123BotStatus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXPortCommandSoundStatus", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXPortCommandSoundStatus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXDrivePortFlagConst", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXDrivePortFlagConst"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXMotorPortFlagConst", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXMotorPortFlagConst"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXMotorPortModeConst", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXMotorPortModeConst"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXBumperPortFlagConst", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXBumperPortFlagConst"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXPortMotorDetails", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXPortMotorDetails"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXPortDeviceID", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXPortDeviceID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXPortDetailIDs", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXPortDetailIDs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "vex123DeviceFlags", function() { return _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["vex123DeviceFlags"]; });

/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/vex-ble-device-manager/node_modules/@rm-vca/logger/dist/logger.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ProgramUtil__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ProgramUtil */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/ProgramUtil.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProgramCommands", function() { return _ProgramUtil__WEBPACK_IMPORTED_MODULE_8__["ProgramCommands"]; });

/* harmony import */ var _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./VEXBLEFirmware */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/VEXBLEFirmware.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXFirmwareType", function() { return _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_9__["VEXFirmwareType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXFirmwareVersion", function() { return _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_9__["VEXFirmwareVersion"]; });

/* harmony import */ var _types_VEXBLEUserSettingsUpdate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../types/VEXBLEUserSettingsUpdate */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLEUserSettingsUpdate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEXAckValue", function() { return _types_VEXBLEUserSettingsUpdate__WEBPACK_IMPORTED_MODULE_10__["VEXAckValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEX123RobotUserSettings", function() { return _types_VEXBLEUserSettingsUpdate__WEBPACK_IMPORTED_MODULE_10__["VEX123RobotUserSettings"]; });

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};











const log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_7__["getLogger"]("vex-web-ble-device-manager");
log.setLevel(log.levels.INFO);
const VEXBLEDeviceManagerVersion = "0.0.55";
let bleDeviceManager;
function init(target) {
    // initialize Device manager
    try {
        log.debug("VEX BLE Device Manager Version : ", VEXBLEDeviceManagerVersion);
        if (!navigator || !navigator.bluetooth) {
            log.error("navigator.bluetooth not available");
            return;
        }
        bleDeviceManager = new _VEXBLEDeviceManager__WEBPACK_IMPORTED_MODULE_0__["VEXBLEDeviceManager"](target);
    }
    catch (e) {
        log.error("error initializing VEXBLEDevice Manager", e);
    }
}
function getDeviceManagerVersion() {
    return VEXBLEDeviceManagerVersion;
}
function getMachineBleHardwareInfo(platform) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bleDeviceManager.getMachineBleHardwareInfo(platform);
    });
}
function updateFirmware(firmwareType = _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_9__["VEXFirmwareType"].Release) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.updateFirmware(firmwareType);
    });
}
function setFirmwareToBeta(firmwareType = _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_9__["VEXFirmwareType"].Release) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.setFirmwareToBeta(firmwareType);
    });
}
/**
 *  Returns the version of the latest firmware available on the cloud
 *  If server not reachable, returns the local version packed with the application
 *  return 0.0.0.b0 on failure to get both.
 */
function getLatestFirmwareVersion(firmwareType = _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_9__["VEXFirmwareType"].Release) {
    return __awaiter(this, void 0, void 0, function* () {
        const version = yield bleDeviceManager.getLatestFirmwareVersion(firmwareType);
        return version;
    });
}
/**
 *  Returns the version of the latest firmware available on the cloud
 *  If server not reachable, returns the local version packed with the application
 *  return 0.0.0.b0 on failure to get both.
 */
function getLatestBootloaderVersion(firmwareType = _VEXBLEFirmware__WEBPACK_IMPORTED_MODULE_9__["VEXFirmwareType"].Release) {
    return __awaiter(this, void 0, void 0, function* () {
        const version = yield bleDeviceManager.getLatestBootLoaderVersion();
        return version;
    });
}
/**
 * Returns the version of firmware on the device
 */
function getDeviceFirmwareVersion() {
    return bleDeviceManager.getDeviceFirmwareVersion();
}
/**
 * Returns the version of bootloader on the device
 */
function getDeviceBootloaderVersion() {
    return bleDeviceManager.getDeviceBootloaderVersion();
}
function CanUpdateBootloader() {
    return bleDeviceManager.CanUpdateBootloader();
}
function bootload() {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.bootload();
    });
}
function powerOff() {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.powerOff();
    });
}
function reboot() {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.reboot();
    });
}
function getConnectionState() {
    return bleDeviceManager.getConnectionState();
}
/**
 * Returns program program command status subscription state.
 * Returns true if we have subscribed to this status.
 */
function isProgramCommandStatusEnabled() {
    return bleDeviceManager.isProgramCommandStatusEnabled();
}
/**
 * Returns program sensor status subscription state.
 * Returns true if we have subscribed to this status.
 */
function isSensorStatusEnabled() {
    return bleDeviceManager.isProgramSensorStatusEnabled();
}
/**
 * Returns program port command status subscription state
 * Returns true if we have subscribed to this status.
 */
function isPortCommandStatusEnabled() {
    return bleDeviceManager.isProgramPortCommandStatusEnabled();
}
/**
 * Returns device log service subscription state
 * Returns true if we have subscribed to this status.
 */
function isDeviceLogServiceEnabled() {
    return bleDeviceManager.isDeviceLogServiceEnabled();
}
/**
 * Subscribe/Unsubscribe to program command status
 * @param enable true to start robot status update. false, to stop them
 */
function enableProgramCommandStatus(enable) {
    bleDeviceManager.enableProgramCommandStatus(enable);
}
/**
 * Subscribe/Unsubscribe to sensor status
 * @param enable true to start robot status update. false, to stop them
 */
function enableSensorStatus(enable) {
    bleDeviceManager.enableProgramSensorStatus(enable);
}
/**
 * Subscribe/Unsubscribe to port command status
 * @param enable true to start robot status update. false, to stop them
 */
function enablePortCmdStatus(enable) {
    bleDeviceManager.enableProgramPortCmdStatus(enable);
}
/**
 * Subscribe/Unsubscribe to brain log seervice
 * @param enable true to start log feed. false, to stop them
 */
function enableDeviceLogService(enable) {
    bleDeviceManager.enableDeviceInfoLogService(enable);
}
function scanAndConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.scanAndConnect();
    });
}
function stopProgram() {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.SendProgramStateCommand(_types_VEBLEProgramStatus__WEBPACK_IMPORTED_MODULE_3__["VEXProgramState"].Stop);
    });
}
function disconnect() {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.disconnect();
    });
}
function sendCommand(cmd) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.executeSingleCommand(cmd);
    });
}
function sendCommandMultiple(cmds) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.executeMutlipleCommands(cmds);
    });
}
function sendRobotConfigPreset(preset) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.setRobotConfigPreset(preset);
    });
}
function LocateRobot(durationSec = 2) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.LocateRobot(durationSec);
    });
}
function getCommandNameFromID(command) {
    return bleDeviceManager.getCommandNameFromID(command);
}
/**
 * This will will clear all events for the passed in port
 * @param portID Port to clear events on.
 */
function clearPortEvents(portID) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.clearPortEvents(portID);
    });
}
function requestRobotConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.requestRobotConfig();
    });
}
function setRobotName(newName) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.SetRobotName(newName);
    });
}
function getDeviceInfo() {
    return bleDeviceManager.getDeviceInfo();
}
function showAllBLEDevices(enable) {
    bleDeviceManager.showAllBLEDevices(enable);
}
function setPortConfig(portNum, devType, flags = _types_VEXBLEPortStatus__WEBPACK_IMPORTED_MODULE_6__["VEXPortConfigFlags"].FLAG_ENABLED, iLimitPct = 100, iLimitMax = 500) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.setPortConfig(portNum, devType, flags, iLimitPct, iLimitMax);
    });
}
/**
    * Sends control values to robot
    * @param leftX Left Stick X value (0 to 255). 127 == stop
    * @param leftY Left Stick Y value (0 to 255). 127 == stop
    * @param rightX Right Stick X value (0 to 255). 127 == stop
    * @param rightY Right Stick Y value (0 to 255). 127 == stop
    * @param Buttons1 First 8 button bit map
    * @param Buttons2 Second 8 button bit map
    */
function setControlControlValues(leftX = 127, leftY = 127, rightX = 127, rightY = 127, Buttons1 = 0, Buttons2 = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.setControlControlValues(leftX, leftY, rightX, rightY, Buttons1, Buttons2);
    });
}
/**
 * Sends a command to set the stick type for control values
 * @param newType
 * @param driveSensi
 * @param turnSensi
 */
function setControlDriveStickType(newType, driveSensi = 50, turnSensi = 25) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.setControlDriveStickType(newType, driveSensi, turnSensi);
    });
}
/**
* Convieniance method for setting up button commands. This method will attempt to parse the string for the command and pass the 4 byte value to the base class to send to the robot.
* @param command Command string
* @param buttonID Button ID
* @param pressed Buttons state that this command is connected to
*/
function controllerAddButtonCommand(command, buttonID, pressed) {
    return __awaiter(this, void 0, void 0, function* () {
        let state = yield bleDeviceManager.controllerAddButtonCommand(command, buttonID, pressed);
        return state;
    });
}
//functions below are needed only if VEXcode let library to run the controller update loop
/**
 * Starts/Stops timer to send controller updates to the robot.
 * @param enable true to start the game timer. false to stop it.
 * @param updateRate Controlls update interval in seconds. Default = 0.050
 */
function controllerEnable(enable, updateRate = 0.050) {
    bleDeviceManager.controllerEnable(enable, updateRate);
}
function controllerIsEnabled() {
    return bleDeviceManager.controllerIsEnabled();
}
/**
 * Sets the stick values to be sent on the next controls udpate
 * @param leftX Left Stick X value (0 to 255). 127 == stop
 * @param leftY Left Stick Y value (0 to 255). 127 == stop
 * @param rightX Right Stick X value (0 to 255). 127 == stop
 * @param rightY Right Stick Y value (0 to 255). 127 == stop
 */
function controllerSetStickValues(leftX = 127, leftY = 127, rightX = 127, rightY = 127) {
    bleDeviceManager.controllerSetStickValues(leftX, leftY, rightX, rightY);
}
/**
 * Sets the button values to be sent on the next controls udpate
 * @param buttonID button id to update
 * @param pressed button state
 */
function controllerSetButonValue(buttonID, pressed) {
    bleDeviceManager.controllerSetButonValue(buttonID, pressed);
}
/**
 * Sets all controll values to their default value (sticks are neutral and buttons are released)
 */
function controllerClearValues() {
    bleDeviceManager.controllerClearValues();
}
/**
 * Sends command to save the current controll settings for button commands and robot config
 * When the the robot reboots it will remember these settings once commanded into the "Control" config preset
 */
function saveControlSettings() {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.saveControlSettings();
    });
}
/**
 * This will request the devices current connection interval. Value will be returned in the ack data callback.
 */
function RequestConnectionInterval() {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.RequestConnectionInterval();
    });
}
function SetSensorMode(newMode) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.SetSensorMode(newMode);
    });
}
/**
 * Send a command to read the current user setting from the 123 Robot
 * Status is returned in the VEXBLEBrowser.UserSettingsStatus event callback
 */
function Get123RobotUserSettings() {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.Get123RobotUserSettings();
    });
}
/**
 * Send new user settings to 123 robot device. Status is returned in the VEXBLEBrowser.UserSettingsStatus event callback
 * @param idleTimeout Coder will sleep after this many ms if not connected and no buttons have been pressed
 * @param soundVolume
 * @param persist If true these settings will be saved in flash else these settings will only persist until reboot. (In th case of the encoder this means batteries are removed.)
 */
function Set123RobotUserSettings(idleTimeout, soundVolume, persist) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bleDeviceManager.Set123RobotUserSettings(idleTimeout, soundVolume, persist);
    });
}
/**
 *
 */
function IsFWUpdateSupported() {
    return __awaiter(this, void 0, void 0, function* () {
        let supported = yield bleDeviceManager.IsFWUpdateSupported();
        return supported;
    });
}



/***/ }),

/***/ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEBLEProgramStatus.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEBLEProgramStatus.js ***!
  \******************************************************************************************/
/*! exports provided: VEXProgramState, VEXProgramMode, VEXProgramStatus, vexProgramBotStatusTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXProgramState", function() { return VEXProgramState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXProgramMode", function() { return VEXProgramMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXProgramStatus", function() { return VEXProgramStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vexProgramBotStatusTypes", function() { return vexProgramBotStatusTypes; });
/// Values that represent a program's state
var VEXProgramState;
(function (VEXProgramState) {
    VEXProgramState[VEXProgramState["End"] = 0] = "End";
    VEXProgramState[VEXProgramState["Stop"] = 1] = "Stop";
    VEXProgramState[VEXProgramState["Play"] = 2] = "Play";
    VEXProgramState[VEXProgramState["Pause"] = 3] = "Pause";
    VEXProgramState[VEXProgramState["Step"] = 4] = "Step";
})(VEXProgramState || (VEXProgramState = {}));
/// Values that represent a program's mode
var VEXProgramMode;
(function (VEXProgramMode) {
    VEXProgramMode[VEXProgramMode["None"] = 0] = "None";
    VEXProgramMode[VEXProgramMode["Waiting"] = 1] = "Waiting";
    VEXProgramMode[VEXProgramMode["Ready"] = 2] = "Ready";
    VEXProgramMode[VEXProgramMode["SingleCmd"] = 3] = "SingleCmd";
})(VEXProgramMode || (VEXProgramMode = {}));
/// Structure that represents a program's status
class VEXProgramStatus {
}
var vexProgramBotStatusTypes;
(function (vexProgramBotStatusTypes) {
    vexProgramBotStatusTypes[vexProgramBotStatusTypes["BotStatusTypePuck"] = 1] = "BotStatusTypePuck";
    vexProgramBotStatusTypes[vexProgramBotStatusTypes["BotStatusTypeCode"] = 2] = "BotStatusTypeCode";
    vexProgramBotStatusTypes[vexProgramBotStatusTypes["BotStatusTypeArm"] = 3] = "BotStatusTypeArm";
    vexProgramBotStatusTypes[vexProgramBotStatusTypes["BotStatusTypeGo"] = 4] = "BotStatusTypeGo";
})(vexProgramBotStatusTypes || (vexProgramBotStatusTypes = {}));


/***/ }),

/***/ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLEDeviceManagerTypes.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLEDeviceManagerTypes.js ***!
  \************************************************************************************************/
/*! exports provided: BrainConnectionState, PowerState, CoderCommandState, BLEServiceID, BLECharacteristicsID, VEXProductTypes, VEXRobotConfigPreset, VEXDeviceMode, VEXButtonValues, VEXDriveStickType, VEXControllerValues, VEXFWUpdateStatus, FWDownloadState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrainConnectionState", function() { return BrainConnectionState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PowerState", function() { return PowerState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoderCommandState", function() { return CoderCommandState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLEServiceID", function() { return BLEServiceID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLECharacteristicsID", function() { return BLECharacteristicsID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXProductTypes", function() { return VEXProductTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXRobotConfigPreset", function() { return VEXRobotConfigPreset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXDeviceMode", function() { return VEXDeviceMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXButtonValues", function() { return VEXButtonValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXDriveStickType", function() { return VEXDriveStickType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXControllerValues", function() { return VEXControllerValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXFWUpdateStatus", function() { return VEXFWUpdateStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FWDownloadState", function() { return FWDownloadState; });
var BrainConnectionState;
(function (BrainConnectionState) {
    BrainConnectionState[BrainConnectionState["Disconnected"] = 0] = "Disconnected";
    BrainConnectionState[BrainConnectionState["Connecting"] = 1] = "Connecting";
    BrainConnectionState[BrainConnectionState["Connected"] = 2] = "Connected";
    BrainConnectionState[BrainConnectionState["Scanning"] = 3] = "Scanning";
    BrainConnectionState[BrainConnectionState["CheckingFirmware"] = 4] = "CheckingFirmware";
    BrainConnectionState[BrainConnectionState["UpdatingFirmware"] = 5] = "UpdatingFirmware";
})(BrainConnectionState || (BrainConnectionState = {}));
var PowerState;
(function (PowerState) {
    PowerState[PowerState["Off"] = 0] = "Off";
    PowerState[PowerState["Reboot"] = 2] = "Reboot";
    PowerState[PowerState["Bootload"] = 1] = "Bootload";
})(PowerState || (PowerState = {}));
/// These are the possible command on boot or after read states
var CoderCommandState;
(function (CoderCommandState) {
    CoderCommandState[CoderCommandState["Nothing"] = 0] = "Nothing";
    CoderCommandState[CoderCommandState["Play"] = 1] = "Play";
    CoderCommandState[CoderCommandState["Pause"] = 2] = "Pause";
})(CoderCommandState || (CoderCommandState = {}));
var BLEServiceID;
(function (BLEServiceID) {
    BLEServiceID["device"] = "0000180a-0000-1000-8000-00805f9b34fb";
    BLEServiceID["Programmer"] = "6faa5911-9200-49a0-a353-6152c5930ec5";
    BLEServiceID["Sensor"] = "6faa6911-9200-49a0-a353-6152c5930ec5";
    BLEServiceID["Coder"] = "6faa7911-9200-49a0-a353-6152c5930ec5";
    BLEServiceID["Reset"] = "0113de02-7a5e-11e8-adc0-fa7ae01bbebc";
    BLEServiceID["OAD"] = "6faaffc0-9200-49a0-a353-6152c5930ec5";
})(BLEServiceID || (BLEServiceID = {}));
var BLECharacteristicsID;
(function (BLECharacteristicsID) {
    BLECharacteristicsID["ProgramCommand"] = "6faa5920-9200-49a0-a353-6152c5930ec5";
    BLECharacteristicsID["ProgramSensorStatus"] = "6faa5924-9200-49a0-a353-6152c5930ec5";
    BLECharacteristicsID["ProgramPortCmdStatus"] = "6faa5925-9200-49a0-a353-6152c5930ec5";
    BLECharacteristicsID["Reset"] = "0113e104-7a5e-11e8-adc0-fa7ae01bbebc";
    BLECharacteristicsID["OADImageID"] = "6faaffc1-9200-49a0-a353-6152c5930ec5";
    BLECharacteristicsID["OADImageBlock"] = "6faaffc2-9200-49a0-a353-6152c5930ec5";
    BLECharacteristicsID["OADImageCtrl"] = "6faaffc5-9200-49a0-a353-6152c5930ec5";
    BLECharacteristicsID["DevInfoFirmware"] = "00002a26-0000-1000-8000-00805f9b34fb";
    BLECharacteristicsID["DevInfoSoftware"] = "00002a28-0000-1000-8000-00805f9b34fb";
    BLECharacteristicsID["DevInfoSystemID"] = "00002a23-0000-1000-8000-00805f9b34fb";
    BLECharacteristicsID["DevInfoModelNumber"] = "00002a24-0000-1000-8000-00805f9b34fb";
    BLECharacteristicsID["DevInfoSerialNumber"] = "00002a25-0000-1000-8000-00805f9b34fb";
    BLECharacteristicsID["DevInfoHardwareRev"] = "00002a27-0000-1000-8000-00805f9b34fb";
    BLECharacteristicsID["DevInfoLog"] = "00006a50-0000-1000-8000-00805f9b34fb";
    // TODO: the below will become obsolete soon
    BLECharacteristicsID["ProgramStatus"] = "6faa5921-9200-49a0-a353-6152c5930ec5";
    BLECharacteristicsID["ProgramBotStatus"] = "6faa5922-9200-49a0-a353-6152c5930ec5";
    BLECharacteristicsID["ProgramBotConfig"] = "6faa5923-9200-49a0-a353-6152c5930ec5";
    BLECharacteristicsID["SensorStatusShort"] = "6faa6920-9200-49a0-a353-6152c5930ec5";
    BLECharacteristicsID["SensorGyroDetails"] = "6faa6921-9200-49a0-a353-6152c5930ec5";
    BLECharacteristicsID["SensorGryoCMD"] = "6faa6922-9200-49a0-a353-6152c5930ec5";
    BLECharacteristicsID["SensorRegWrite"] = "6faa6923-9200-49a0-a353-6152c5930ec5";
    BLECharacteristicsID["SensorPortDetails"] = "6faa6925-9200-49a0-a353-6152c5930ec5";
})(BLECharacteristicsID || (BLECharacteristicsID = {}));
var VEXProductTypes;
(function (VEXProductTypes) {
    VEXProductTypes[VEXProductTypes["Unknown"] = 0] = "Unknown";
    VEXProductTypes[VEXProductTypes["VEXIQ2Controller"] = 33] = "VEXIQ2Controller";
    VEXProductTypes[VEXProductTypes["VEXIQ2Brain"] = 32] = "VEXIQ2Brain";
    VEXProductTypes[VEXProductTypes["VEXGO"] = 49] = "VEXGO";
    VEXProductTypes[VEXProductTypes["VEX123Puck"] = 65] = "VEX123Puck";
    VEXProductTypes[VEXProductTypes["VEXCoder"] = 66] = "VEXCoder";
    VEXProductTypes[VEXProductTypes["PilotSmart"] = 74] = "PilotSmart";
    VEXProductTypes[VEXProductTypes["Pilot"] = 75] = "Pilot";
    VEXProductTypes[VEXProductTypes["PilotV2Retail"] = 76] = "PilotV2Retail";
    VEXProductTypes[VEXProductTypes["PilotV2Retail_Smart"] = 77] = "PilotV2Retail_Smart";
    VEXProductTypes[VEXProductTypes["PilotV2Edu"] = 78] = "PilotV2Edu";
    VEXProductTypes[VEXProductTypes["V5_Brain"] = 85] = "V5_Brain";
})(VEXProductTypes || (VEXProductTypes = {}));
var VEXRobotConfigPreset;
(function (VEXRobotConfigPreset) {
    VEXRobotConfigPreset[VEXRobotConfigPreset["CustomConfig"] = 0] = "CustomConfig";
    VEXRobotConfigPreset[VEXRobotConfigPreset["GOCodeBase"] = 1] = "GOCodeBase";
    VEXRobotConfigPreset[VEXRobotConfigPreset["GOArm"] = 2] = "GOArm";
    VEXRobotConfigPreset[VEXRobotConfigPreset["GOControl"] = 3] = "GOControl";
    VEXRobotConfigPreset[VEXRobotConfigPreset["BOT123"] = 17] = "BOT123";
    VEXRobotConfigPreset[VEXRobotConfigPreset["AutoConfig"] = 250] = "AutoConfig";
    VEXRobotConfigPreset[VEXRobotConfigPreset["NoConfig"] = 255] = "NoConfig";
})(VEXRobotConfigPreset || (VEXRobotConfigPreset = {}));
var VEXDeviceMode;
(function (VEXDeviceMode) {
    // Should not be used
    VEXDeviceMode[VEXDeviceMode["Unknown"] = 0] = "Unknown";
    // This robot is wanting to pair
    VEXDeviceMode[VEXDeviceMode["Pair"] = 160] = "Pair";
    // This robot is ready to connect to its pair
    VEXDeviceMode[VEXDeviceMode["Connect"] = 16] = "Connect";
    // This robot is in bootload mode
    VEXDeviceMode[VEXDeviceMode["Update"] = 32] = "Update";
    // This is a robot in production test mode
    VEXDeviceMode[VEXDeviceMode["ProdTest"] = 240] = "ProdTest";
    // This is a robot in special Identify mode
    VEXDeviceMode[VEXDeviceMode["Identify"] = 176] = "Identify";
})(VEXDeviceMode || (VEXDeviceMode = {}));
/// VEX Button IDs
var VEXButtonValues;
(function (VEXButtonValues) {
    VEXButtonValues[VEXButtonValues["SET_DEFAULT"] = 255] = "SET_DEFAULT";
    VEXButtonValues[VEXButtonValues["F_DOWN"] = 0] = "F_DOWN";
    VEXButtonValues[VEXButtonValues["E_DOWN"] = 1] = "E_DOWN";
    VEXButtonValues[VEXButtonValues["F_UP"] = 2] = "F_UP";
    VEXButtonValues[VEXButtonValues["E_UP"] = 3] = "E_UP";
    VEXButtonValues[VEXButtonValues["L_DOWN"] = 4] = "L_DOWN";
    VEXButtonValues[VEXButtonValues["L_UP"] = 5] = "L_UP";
    VEXButtonValues[VEXButtonValues["R_DOWN"] = 6] = "R_DOWN";
    VEXButtonValues[VEXButtonValues["R_UP"] = 7] = "R_UP";
    VEXButtonValues[VEXButtonValues["L_STICK"] = 8] = "L_STICK";
    VEXButtonValues[VEXButtonValues["R_STICK"] = 9] = "R_STICK";
    VEXButtonValues[VEXButtonValues["POWER"] = 10] = "POWER";
})(VEXButtonValues || (VEXButtonValues = {}));
var VEXDriveStickType;
(function (VEXDriveStickType) {
    VEXDriveStickType[VEXDriveStickType["Tank"] = 1] = "Tank";
    VEXDriveStickType[VEXDriveStickType["Left_Stick"] = 2] = "Left_Stick";
    VEXDriveStickType[VEXDriveStickType["Right_Stick"] = 3] = "Right_Stick";
    VEXDriveStickType[VEXDriveStickType["Split_Stick_Left"] = 4] = "Split_Stick_Left";
    VEXDriveStickType[VEXDriveStickType["Split_Stick_Right"] = 5] = "Split_Stick_Right";
})(VEXDriveStickType || (VEXDriveStickType = {}));
class VEXControllerValues {
    constructor() {
        this.Right1X = 0;
        this.Right1Y = 0;
        this.Left1X = 0;
        this.Left1Y = 0;
        this.Buttons1 = 0;
        this.Right2X = 0;
        this.Right2Y = 0;
        this.Left2X = 0;
        this.Left2Y = 0;
        this.Buttons2 = 0;
        this.Battery1 = 0;
        this.BatteryVolt1 = 0;
        this.Battery2 = 0;
        this.BatteryVolt2 = 0;
        this.ControllerFlags = 0;
        this.GameFlags = 0;
        this.ErrorFlags = 0;
        this.SysStatusFlags = 0;
        this.MatchClock = 0;
        this.ContinuityCount = 0;
        this.LinkMode = 0;
    }
}
var VEXFWUpdateStatus;
(function (VEXFWUpdateStatus) {
    VEXFWUpdateStatus[VEXFWUpdateStatus["OAD_SUCCESS"] = 0] = "OAD_SUCCESS";
    VEXFWUpdateStatus[VEXFWUpdateStatus["OAD_CRC_ERR"] = 1] = "OAD_CRC_ERR";
    VEXFWUpdateStatus[VEXFWUpdateStatus["OAD_FLASH_ERR"] = 2] = "OAD_FLASH_ERR";
    VEXFWUpdateStatus[VEXFWUpdateStatus["OAD_BUFFER_OFL"] = 3] = "OAD_BUFFER_OFL";
    VEXFWUpdateStatus[VEXFWUpdateStatus["OAD_ALREADY_STARTED"] = 4] = "OAD_ALREADY_STARTED";
    VEXFWUpdateStatus[VEXFWUpdateStatus["OAD_NOT_STARTED"] = 5] = "OAD_NOT_STARTED";
    VEXFWUpdateStatus[VEXFWUpdateStatus["OAD_DL_NOT_COMPLETE"] = 6] = "OAD_DL_NOT_COMPLETE";
    VEXFWUpdateStatus[VEXFWUpdateStatus["OAD_NO_RESOURCES"] = 7] = "OAD_NO_RESOURCES";
    VEXFWUpdateStatus[VEXFWUpdateStatus["OAD_IMAGE_TOO_BIG"] = 8] = "OAD_IMAGE_TOO_BIG";
    VEXFWUpdateStatus[VEXFWUpdateStatus["OAD_INCOMPATIBLE_IMAGE"] = 9] = "OAD_INCOMPATIBLE_IMAGE";
    VEXFWUpdateStatus[VEXFWUpdateStatus["OAD_INVALID_FILE"] = 10] = "OAD_INVALID_FILE";
    VEXFWUpdateStatus[VEXFWUpdateStatus["OAD_ICOMPATIBLE_FILE"] = 11] = "OAD_ICOMPATIBLE_FILE";
    VEXFWUpdateStatus[VEXFWUpdateStatus["OAD_AUTH_FAIL"] = 12] = "OAD_AUTH_FAIL";
    VEXFWUpdateStatus[VEXFWUpdateStatus["OAD_EXT_NOT_SUPPORTED"] = 13] = "OAD_EXT_NOT_SUPPORTED";
    VEXFWUpdateStatus[VEXFWUpdateStatus["OAD_DL_COMPLETE"] = 14] = "OAD_DL_COMPLETE";
    VEXFWUpdateStatus[VEXFWUpdateStatus["OAD_CCCD_NOT_ENABLED"] = 15] = "OAD_CCCD_NOT_ENABLED";
    VEXFWUpdateStatus[VEXFWUpdateStatus["OAD_IM_ID_TIMEOUT"] = 16] = "OAD_IM_ID_TIMEOUT";
    VEXFWUpdateStatus[VEXFWUpdateStatus["ConnectionLost"] = 17] = "ConnectionLost";
    VEXFWUpdateStatus[VEXFWUpdateStatus["BadRF"] = 18] = "BadRF";
    VEXFWUpdateStatus[VEXFWUpdateStatus["FileError"] = 19] = "FileError";
    VEXFWUpdateStatus[VEXFWUpdateStatus["downloadAborted"] = 20] = "downloadAborted";
    VEXFWUpdateStatus[VEXFWUpdateStatus["CommunicationFailure"] = 21] = "CommunicationFailure";
    VEXFWUpdateStatus[VEXFWUpdateStatus["FileNotFound"] = 22] = "FileNotFound";
    VEXFWUpdateStatus[VEXFWUpdateStatus["Success"] = 128] = "Success";
})(VEXFWUpdateStatus || (VEXFWUpdateStatus = {}));
var FWDownloadState;
(function (FWDownloadState) {
    FWDownloadState[FWDownloadState["PaySize"] = 0] = "PaySize";
    FWDownloadState[FWDownloadState["ImgVerify"] = 2] = "ImgVerify";
    FWDownloadState[FWDownloadState["SendBlock"] = 3] = "SendBlock";
    FWDownloadState[FWDownloadState["Done"] = 4] = "Done";
})(FWDownloadState || (FWDownloadState = {}));


/***/ }),

/***/ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLEPortStatus.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLEPortStatus.js ***!
  \****************************************************************************************/
/*! exports provided: VEXPortNumber, VEXPortConfigFlags, VEXPortCommandStatus, VEXPortCommandMotorStatus, VEXDrivePortFlagConst, VEXPortCommandDriveStatus, VEXPortCommandMagnetStatus, VEXBumperPortFlagConst, VEXPortCommandBumperStatus, VEXPortCommandSoundStatus, VEXTouchLEDColorIndex, vex123DeviceFlags, VEXPortCommand123BotStatus, VEXBotCommandStatus, VEXPortDeviceID, VEXPortDetailIDs, VEXPortDetails, VEXPortMotorDetails, VEXMotorPortFlagConst, VEXMotorPortModeConst, VEXProgramPortStatus, VEXProgramEmptyPortStatus, VEXProgramMotorPortStatus, VEXProgramMagnetPortStatus, VEXProgramBumperPortStatus, VEXProgramPortConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXPortNumber", function() { return VEXPortNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXPortConfigFlags", function() { return VEXPortConfigFlags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXPortCommandStatus", function() { return VEXPortCommandStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXPortCommandMotorStatus", function() { return VEXPortCommandMotorStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXDrivePortFlagConst", function() { return VEXDrivePortFlagConst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXPortCommandDriveStatus", function() { return VEXPortCommandDriveStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXPortCommandMagnetStatus", function() { return VEXPortCommandMagnetStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXBumperPortFlagConst", function() { return VEXBumperPortFlagConst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXPortCommandBumperStatus", function() { return VEXPortCommandBumperStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXPortCommandSoundStatus", function() { return VEXPortCommandSoundStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXTouchLEDColorIndex", function() { return VEXTouchLEDColorIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vex123DeviceFlags", function() { return vex123DeviceFlags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXPortCommand123BotStatus", function() { return VEXPortCommand123BotStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXBotCommandStatus", function() { return VEXBotCommandStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXPortDeviceID", function() { return VEXPortDeviceID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXPortDetailIDs", function() { return VEXPortDetailIDs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXPortDetails", function() { return VEXPortDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXPortMotorDetails", function() { return VEXPortMotorDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXMotorPortFlagConst", function() { return VEXMotorPortFlagConst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXMotorPortModeConst", function() { return VEXMotorPortModeConst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXProgramPortStatus", function() { return VEXProgramPortStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXProgramEmptyPortStatus", function() { return VEXProgramEmptyPortStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXProgramMotorPortStatus", function() { return VEXProgramMotorPortStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXProgramMagnetPortStatus", function() { return VEXProgramMagnetPortStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXProgramBumperPortStatus", function() { return VEXProgramBumperPortStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXProgramPortConfig", function() { return VEXProgramPortConfig; });
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/index.js");

var VEXPortNumber;
(function (VEXPortNumber) {
    VEXPortNumber[VEXPortNumber["Port1"] = 0] = "Port1";
    VEXPortNumber[VEXPortNumber["Port2"] = 1] = "Port2";
    VEXPortNumber[VEXPortNumber["Port3"] = 2] = "Port3";
    VEXPortNumber[VEXPortNumber["Port4"] = 3] = "Port4";
})(VEXPortNumber || (VEXPortNumber = {}));
/// These flags can be applied to the robot's port config
var VEXPortConfigFlags;
(function (VEXPortConfigFlags) {
    VEXPortConfigFlags[VEXPortConfigFlags["FLAG_DISABLED"] = 0] = "FLAG_DISABLED";
    VEXPortConfigFlags[VEXPortConfigFlags["FLAG_ENABLED"] = 1] = "FLAG_ENABLED";
    VEXPortConfigFlags[VEXPortConfigFlags["FLAG_REVERSE"] = 2] = "FLAG_REVERSE";
    VEXPortConfigFlags[VEXPortConfigFlags["FLAG_DRV_LEFT"] = 4] = "FLAG_DRV_LEFT";
    VEXPortConfigFlags[VEXPortConfigFlags["FLAG_DRV_RIGHT"] = 8] = "FLAG_DRV_RIGHT";
    VEXPortConfigFlags[VEXPortConfigFlags["FLAG_OPTIONAL"] = 16] = "FLAG_OPTIONAL";
})(VEXPortConfigFlags || (VEXPortConfigFlags = {}));
/// Base class for probram port command values
class VEXPortCommandStatus {
    constructor() {
        this.PortNumber = 0;
        this.DeviceID = 0;
        this.ActiveCommand = 0;
        this.UpdateCounter = 0;
    }
}
/// Detailed status for a motor device
class VEXPortCommandMotorStatus extends VEXPortCommandStatus {
    constructor() {
        super();
        this.Velocity = 0;
        this.Position = 0;
        this.Current = 0;
        this.Flags = 0;
        this.ModeBits = 0;
    }
}
/// Motor flags reported in the vexProgramMotorPortStatus class
var VEXDrivePortFlagConst;
(function (VEXDrivePortFlagConst) {
    /// Switch is open
    VEXDrivePortFlagConst[VEXDrivePortFlagConst["Nothing"] = 0] = "Nothing";
    /// Bumper is actively pressed
    VEXDrivePortFlagConst[VEXDrivePortFlagConst["CrashEvent"] = 2] = "CrashEvent";
})(VEXDrivePortFlagConst || (VEXDrivePortFlagConst = {}));
/// Detailed status for a drivetrain device
class VEXPortCommandDriveStatus extends VEXPortCommandStatus {
    constructor() {
        super();
        this.Velocity = 0;
        this.Position = 0;
        this.Heading = 0;
        this.Flags = 0;
    }
}
/// Detailed status for a magnet device
class VEXPortCommandMagnetStatus extends VEXPortCommandStatus {
    constructor() {
        super();
        this.PWM = 0;
        this.Flags = 0;
    }
}
/// Motor flags reported in the vexProgramMotorPortStatus class
var VEXBumperPortFlagConst;
(function (VEXBumperPortFlagConst) {
    /// Switch is open
    VEXBumperPortFlagConst[VEXBumperPortFlagConst["Nothing"] = 0] = "Nothing";
    /// Bumper is actively pressed
    VEXBumperPortFlagConst[VEXBumperPortFlagConst["Pressing"] = 1] = "Pressing";
    /// Bumper has been pressed
    VEXBumperPortFlagConst[VEXBumperPortFlagConst["PressedEvent"] = 2] = "PressedEvent";
    /// Bumper has been released
    VEXBumperPortFlagConst[VEXBumperPortFlagConst["ReleasedEvent"] = 4] = "ReleasedEvent";
})(VEXBumperPortFlagConst || (VEXBumperPortFlagConst = {}));
/// Detailed status for a bumber device
class VEXPortCommandBumperStatus extends VEXPortCommandStatus {
    constructor() {
        super();
        /// Raw PWM for the bumpers LED -100 to 100
        this.PWM = 0;
        /// Switch
        this.State = 0;
        this.Flags = 0;
    }
}
// Detailed status for a magnet device
class VEXPortCommandSoundStatus extends VEXPortCommandStatus {
    constructor() {
        super();
        /// Sound state
        this.SoundType = 0;
        this.SoundID = 0;
    }
}
/// Possible 123 RGB LED color settings
var VEXTouchLEDColorIndex;
(function (VEXTouchLEDColorIndex) {
    VEXTouchLEDColorIndex[VEXTouchLEDColorIndex["Off"] = 0] = "Off";
    VEXTouchLEDColorIndex[VEXTouchLEDColorIndex["Red"] = 1] = "Red";
    VEXTouchLEDColorIndex[VEXTouchLEDColorIndex["Green"] = 2] = "Green";
    VEXTouchLEDColorIndex[VEXTouchLEDColorIndex["Blue"] = 3] = "Blue";
    VEXTouchLEDColorIndex[VEXTouchLEDColorIndex["Yellow"] = 4] = "Yellow";
    VEXTouchLEDColorIndex[VEXTouchLEDColorIndex["Cyan"] = 5] = "Cyan";
    VEXTouchLEDColorIndex[VEXTouchLEDColorIndex["Magenta"] = 6] = "Magenta";
    VEXTouchLEDColorIndex[VEXTouchLEDColorIndex["Orange"] = 7] = "Orange";
    VEXTouchLEDColorIndex[VEXTouchLEDColorIndex["White"] = 8] = "White";
    VEXTouchLEDColorIndex[VEXTouchLEDColorIndex["Light_Red"] = 10] = "Light_Red";
    VEXTouchLEDColorIndex[VEXTouchLEDColorIndex["Light_Green"] = 11] = "Light_Green";
    VEXTouchLEDColorIndex[VEXTouchLEDColorIndex["Light_Blue"] = 12] = "Light_Blue";
    VEXTouchLEDColorIndex[VEXTouchLEDColorIndex["Red_Green_Blink"] = 13] = "Red_Green_Blink";
    VEXTouchLEDColorIndex[VEXTouchLEDColorIndex["Custom"] = 255] = "Custom";
})(VEXTouchLEDColorIndex || (VEXTouchLEDColorIndex = {}));
/// Motor flags reported in the vexProgramMotorPortStatus class
class vex123DeviceFlags {
    constructor() {
        /// Switch is open
        this.NOTHING = 0x00;
        /// Low Battery warning
        this.LOW_BATTERY = 0x01;
        /// Robot crash detected
        this.CRASH_DETECTED = 0x02;
        /// Line sensor has been triggered
        this.LINE_DETECTED = 0x04;
        /// Robot shake detected
        this.SHAKE_DETECTED = 0x08;
    }
}
class VEXPortCommand123BotStatus extends VEXPortCommandStatus {
    constructor() {
        super();
        /// Ative Device State (vex123DeviceFlags)
        this.Flags = 0;
        /// Robot Velocity in mm/second
        this.Velocity = 0;
        /// Robot Heading in Degrees
        this.Heading = 0;
        /// Robot Position in mm
        this.Position = 0;
        /// Active button state
        this.ButtonState = 0;
        /// Flags for button pressed events
        this.PressedEvents = 0;
        /// Flags for button released events
        this.ReleasedEvents = 0;
        /// Active LED color index
        this.ColorIndex = VEXTouchLEDColorIndex.Off;
    }
}
/// Robot command status. This is used to status individual commands sent to ports
class VEXBotCommandStatus {
    constructor() {
        /// Robot batter voltage in volts
        this.Battery = 0.0;
        // Robot's configuration ID
        this.ConfigPreset = _src__WEBPACK_IMPORTED_MODULE_0__["VEXRobotConfigPreset"].NoConfig;
        /// Port Status and command status
        this.Ports = [new VEXPortCommandStatus(), new VEXPortCommandStatus(), new VEXPortCommandStatus(), new VEXPortCommandStatus(), new VEXPortCommandStatus()];
    }
}
/// These values represent device types that can be connected to the robot.
var VEXPortDeviceID;
(function (VEXPortDeviceID) {
    VEXPortDeviceID[VEXPortDeviceID["Unknown"] = 0] = "Unknown";
    VEXPortDeviceID[VEXPortDeviceID["Magnet"] = 16] = "Magnet";
    VEXPortDeviceID[VEXPortDeviceID["Motor"] = 32] = "Motor";
    VEXPortDeviceID[VEXPortDeviceID["Pot"] = 64] = "Pot";
    VEXPortDeviceID[VEXPortDeviceID["Bumper"] = 128] = "Bumper";
    VEXPortDeviceID[VEXPortDeviceID["DriveTrain"] = 160] = "DriveTrain";
    VEXPortDeviceID[VEXPortDeviceID["TouchRGB"] = 176] = "TouchRGB";
    VEXPortDeviceID[VEXPortDeviceID["Sound"] = 192] = "Sound";
    VEXPortDeviceID[VEXPortDeviceID["Drive123"] = 208] = "Drive123";
    VEXPortDeviceID[VEXPortDeviceID["Motor123"] = 224] = "Motor123";
})(VEXPortDeviceID || (VEXPortDeviceID = {}));
var VEXPortDetailIDs;
(function (VEXPortDetailIDs) {
    VEXPortDetailIDs[VEXPortDetailIDs["ValueTypeMotorDetail"] = 1] = "ValueTypeMotorDetail";
    VEXPortDetailIDs[VEXPortDetailIDs["ValueTypePotDetail"] = 2] = "ValueTypePotDetail";
    VEXPortDetailIDs[VEXPortDetailIDs["ValueTypeSwitchDetail"] = 3] = "ValueTypeSwitchDetail";
    VEXPortDetailIDs[VEXPortDetailIDs["ValueTypeDriveDetail"] = 160] = "ValueTypeDriveDetail";
})(VEXPortDetailIDs || (VEXPortDetailIDs = {}));
/// Base class used for port detail types
class VEXPortDetails {
    constructor() {
        this.portNumber = 0;
        this.deviceID = 0;
        this.valueType = 0;
        this.portFlags = 0;
    }
}
/// Detailed status for a motor device
class VEXPortMotorDetails extends VEXPortDetails {
    constructor() {
        super();
        this.timestamp = 0;
        this.velocity = 0;
        this.position = 0;
        this.positionError = 0;
        this.velocityError = 0;
        this.targetPosition = 0;
        this.targetVelocity = 0;
        this.commandVelocity = 0;
        this.motorI = 0;
        this.motorMode = 0;
        this.pwm = 0;
    }
}
/// Motor flags reported in the vexProgramMotorPortStatus class
var VEXMotorPortFlagConst;
(function (VEXMotorPortFlagConst) {
    /// No flags to report
    VEXMotorPortFlagConst[VEXMotorPortFlagConst["FlagNone"] = 0] = "FlagNone";
    /// Motor timed out on its' last command
    VEXMotorPortFlagConst[VEXMotorPortFlagConst["FlagTimeout"] = 1] = "FlagTimeout";
    /// Motor internal motor error.
    VEXMotorPortFlagConst[VEXMotorPortFlagConst["FlagDevError"] = 2] = "FlagDevError";
    /// Motor is current limiting
    VEXMotorPortFlagConst[VEXMotorPortFlagConst["FlagOOverCurrentT"] = 4] = "FlagOOverCurrentT";
    /// Motor cannot read position (Pot deadband)
    VEXMotorPortFlagConst[VEXMotorPortFlagConst["FlagOverRange"] = 8] = "FlagOverRange";
    /// Motor command is active but motor is not progressing (Timout is counting)
    VEXMotorPortFlagConst[VEXMotorPortFlagConst["FlagStall"] = 16] = "FlagStall";
    /// Motor command has timed out because of a stall
    VEXMotorPortFlagConst[VEXMotorPortFlagConst["FlagStallTimeout"] = 32] = "FlagStallTimeout";
    /// Motor has completed last position command
    VEXMotorPortFlagConst[VEXMotorPortFlagConst["FlagDone"] = 128] = "FlagDone";
})(VEXMotorPortFlagConst || (VEXMotorPortFlagConst = {}));
/// Motor flags reported in the vexProgramMotorPortStatus class
var VEXMotorPortModeConst;
(function (VEXMotorPortModeConst) {
    /// Motor is off and the default brake mode is applied
    VEXMotorPortModeConst[VEXMotorPortModeConst["Off"] = 1] = "Off";
    /// Motor is excecuting a velocity command
    VEXMotorPortModeConst[VEXMotorPortModeConst["Velocity"] = 2] = "Velocity";
    /// Motor is excecuting a position command
    VEXMotorPortModeConst[VEXMotorPortModeConst["Profile"] = 4] = "Profile";
    /// Motor is activly holding its position
    VEXMotorPortModeConst[VEXMotorPortModeConst["BrakeHold"] = 64] = "BrakeHold";
    /// Motor motor is in coast mode (this only happen when coast is NOT the default brake mode)
    VEXMotorPortModeConst[VEXMotorPortModeConst["BrakeCoast"] = 80] = "BrakeCoast";
    /// Motor motor is in brake mode (this only happen when brake is NOT the default brake mode)
    VEXMotorPortModeConst[VEXMotorPortModeConst["BrakeBrake"] = 96] = "BrakeBrake";
    /// Motor is performing a  command
    VEXMotorPortModeConst[VEXMotorPortModeConst["ActiveCommand"] = 128] = "ActiveCommand";
})(VEXMotorPortModeConst || (VEXMotorPortModeConst = {}));
class VEXProgramPortStatus {
}
/// Types used to represent an empty port
class VEXProgramEmptyPortStatus extends VEXProgramPortStatus {
    constructor() {
        super();
    }
}
/// Type representing the details of a port configured as a motor (Robot config ID = Custom)
class VEXProgramMotorPortStatus extends VEXProgramPortStatus {
    constructor() {
        super();
        /// Motor's current position in degrees
        this.position = 0;
        /// Motor's current velocity in dps
        this.velocity = 0;
        /// Motor's current current in mA
        this.current = 0;
        /// Motor's current angle in degrees (0-360)
        this.absoluteAngle = 0;
        /// Motor's current Mode Bits (TBD)
        this.modeBits = 0;
        /// Motor's current Flags (vexMotorPortFlagConst)
        this.flags = 0;
    }
}
/// Type representing the details of a port configured as a electro magnet (Robot config ID = Custom)
// tslint:disable-next-line: max-classes-per-file
class VEXProgramMagnetPortStatus extends VEXProgramPortStatus {
    constructor() {
        super();
        /// Length of time this magnet has been energized since bootup in ms
        this.onTime = 0;
        /// Current PWM power of the magnet
        this.power = 0;
        /// Currently set power setting
        this.boostPowerSetting = 0;
        /// Magnet flags (TBD)
        this.flags = 0;
    }
}
// Type representing the details of a port configured as a LED bumper (Robot config ID = Custom)
// tslint:disable-next-line: max-classes-per-file
class VEXProgramBumperPortStatus extends VEXProgramPortStatus {
    constructor() {
        super();
        /// Current set PWM power for the LED (>0 = Green, <0 = Red)
        this.power = 0;
        /// Current bumper fags (TBD)
        this.flags = 0;
        /// Current switch raw value (Only needed for debug)
        this.analogReading = 0;
    }
}
/// Type used to represent the current config for the robot's ports
// tslint:disable-next-line: max-classes-per-file
class VEXProgramPortConfig {
}


/***/ }),

/***/ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLESensorStatus.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLESensorStatus.js ***!
  \******************************************************************************************/
/*! exports provided: VEXSensorStatus, VEXProgramSensorStatus, VEXGyroDetails, VEXSensorRegValue, SensorConst, SensorFlagsConst, VEXDeviceSensorMode, VEXMotorBrakeMode, BotSensors, SensorRegConst */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXSensorStatus", function() { return VEXSensorStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXProgramSensorStatus", function() { return VEXProgramSensorStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXGyroDetails", function() { return VEXGyroDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXSensorRegValue", function() { return VEXSensorRegValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SensorConst", function() { return SensorConst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SensorFlagsConst", function() { return SensorFlagsConst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXDeviceSensorMode", function() { return VEXDeviceSensorMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXMotorBrakeMode", function() { return VEXMotorBrakeMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BotSensors", function() { return BotSensors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SensorRegConst", function() { return SensorRegConst; });
/// Value that represents the current values of the color sensor and gyro (123/Go)
class VEXSensorStatus {
}
/// Value that represents the current values of the color sensor and gyro (123/Go)
class VEXProgramSensorStatus {
    constructor() {
        /// Processed Hue value from RGBC
        this.Hue = 0;
        /// Processed brightness value in percent
        this.Brightness = 0;
        /// General Proximity value (0-255) Higher value = object closer
        this.Proximity = 0;
        /// Raw acceleration in x direction
        this.AccX = 0;
        /// Raw acceleration in y direction
        this.AccY = 0;
        /// Raw acceleration in z direction
        this.AccZ = 0;
        /// Raw gryo value in x direction
        this.GyroX = 0;
        /// Raw gryo value in y direction
        this.GyroY = 0;
        /// Raw gryo value in z direction
        this.GyroZ = 0;
        /// Pitch of the robot
        this.Pitch = 0;
        /// Role of the robot
        this.Roll = 0;
        /// Heading of the robot (0-360)
        this.Yaw = 0;
        //Raw Floor Sensor Value
        this.Floor = 0;
    }
}
/// Detailed information from the gyro sensor
class VEXGyroDetails {
}
class VEXSensorRegValue {
    constructor() {
        this.Flags = 0;
        this.DeviceAddress = 0;
        this.RegisterAddress = 0;
        this.DataLen = 0;
    }
}
var SensorConst;
(function (SensorConst) {
    SensorConst[SensorConst["CMD_SET_SENSOR_MODE"] = 16] = "CMD_SET_SENSOR_MODE";
    SensorConst[SensorConst["CMD_SET_SENSOR_REG"] = 17] = "CMD_SET_SENSOR_REG";
    SensorConst[SensorConst["CMD_SET_SENSOR_LED"] = 18] = "CMD_SET_SENSOR_LED";
    SensorConst[SensorConst["CMD_SET_GYRO_MODE"] = 32] = "CMD_SET_GYRO_MODE";
    SensorConst[SensorConst["CMD_SET_GYRO_REG"] = 33] = "CMD_SET_GYRO_REG";
    SensorConst[SensorConst["CMD_CAL_GYRO"] = 34] = "CMD_CAL_GYRO";
    SensorConst[SensorConst["CMD_SET_FLOOR_ONTIME"] = 48] = "CMD_SET_FLOOR_ONTIME";
    SensorConst[SensorConst["CMD_SET_RGB"] = 64] = "CMD_SET_RGB";
})(SensorConst || (SensorConst = {}));
var SensorFlagsConst;
(function (SensorFlagsConst) {
    SensorFlagsConst[SensorFlagsConst["SensorFlagColorMode"] = 1] = "SensorFlagColorMode";
    SensorFlagsConst[SensorFlagsConst["SensorFlagProxMode"] = 2] = "SensorFlagProxMode";
    SensorFlagsConst[SensorFlagsConst["SensorFlagGestMode"] = 4] = "SensorFlagGestMode";
})(SensorFlagsConst || (SensorFlagsConst = {}));
var VEXDeviceSensorMode;
(function (VEXDeviceSensorMode) {
    VEXDeviceSensorMode[VEXDeviceSensorMode["SENSOR_MODE_OFF"] = 0] = "SENSOR_MODE_OFF";
    VEXDeviceSensorMode[VEXDeviceSensorMode["SENSOR_MODE_COLOR_ONLY"] = 1] = "SENSOR_MODE_COLOR_ONLY";
    VEXDeviceSensorMode[VEXDeviceSensorMode["SENSOR_MODE_COLOR_PROX"] = 2] = "SENSOR_MODE_COLOR_PROX";
    VEXDeviceSensorMode[VEXDeviceSensorMode["SENSOR_MODE_GESTURE"] = 3] = "SENSOR_MODE_GESTURE";
    VEXDeviceSensorMode[VEXDeviceSensorMode["SENSOR_MODE_PROX_ONLY"] = 4] = "SENSOR_MODE_PROX_ONLY";
})(VEXDeviceSensorMode || (VEXDeviceSensorMode = {}));
var VEXMotorBrakeMode;
(function (VEXMotorBrakeMode) {
    VEXMotorBrakeMode[VEXMotorBrakeMode["Brake"] = 1] = "Brake";
    VEXMotorBrakeMode[VEXMotorBrakeMode["Coast"] = 2] = "Coast";
    VEXMotorBrakeMode[VEXMotorBrakeMode["Hold"] = 3] = "Hold";
})(VEXMotorBrakeMode || (VEXMotorBrakeMode = {}));
var BotSensors;
(function (BotSensors) {
    BotSensors[BotSensors["Gyro"] = 105] = "Gyro";
    BotSensors[BotSensors["Light"] = 57] = "Light";
})(BotSensors || (BotSensors = {}));
var SensorRegConst;
(function (SensorRegConst) {
    SensorRegConst[SensorRegConst["RegCmdFlagSetReg"] = 1] = "RegCmdFlagSetReg";
    SensorRegConst[SensorRegConst["RegCmdFlagGetReg"] = 2] = "RegCmdFlagGetReg";
})(SensorRegConst || (SensorRegConst = {}));


/***/ }),

/***/ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLEUserSettingsUpdate.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLEUserSettingsUpdate.js ***!
  \************************************************************************************************/
/*! exports provided: VEXUserSettingsUpdateStatus, CoderUserSettings, VEXAckValue, VEX123RobotUserSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXUserSettingsUpdateStatus", function() { return VEXUserSettingsUpdateStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoderUserSettings", function() { return CoderUserSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXAckValue", function() { return VEXAckValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEX123RobotUserSettings", function() { return VEX123RobotUserSettings; });
/* harmony import */ var _VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VEXBLEDeviceManagerTypes */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/types/VEXBLEDeviceManagerTypes.js");

var VEXUserSettingsUpdateStatus;
(function (VEXUserSettingsUpdateStatus) {
    VEXUserSettingsUpdateStatus[VEXUserSettingsUpdateStatus["SUCCESS"] = 0] = "SUCCESS";
    VEXUserSettingsUpdateStatus[VEXUserSettingsUpdateStatus["VERSION_ERR"] = 255] = "VERSION_ERR";
    VEXUserSettingsUpdateStatus[VEXUserSettingsUpdateStatus["PARSE_ERROR"] = 254] = "PARSE_ERROR";
})(VEXUserSettingsUpdateStatus || (VEXUserSettingsUpdateStatus = {}));
/// Data type representing the Coder user settings
class CoderUserSettings {
    constructor() {
        /// What does th coder do on boot?
        this.CommandOnBoot = _VEXBLEDeviceManagerTypes__WEBPACK_IMPORTED_MODULE_0__["CoderCommandState"].Nothing;
        /// Does the coder auto connect to last paired device?
        this.ConnectToPair = true;
        /// Idle timeout in ms
        this.IdleTimeout = 30000;
    }
}
var VEXAckValue;
(function (VEXAckValue) {
    VEXAckValue[VEXAckValue["success"] = 118] = "success";
    VEXAckValue[VEXAckValue["genericError"] = 255] = "genericError";
})(VEXAckValue || (VEXAckValue = {}));
// Data type representing the 123 Robot user settings
class VEX123RobotUserSettings {
    constructor() {
        /// Idle timeout in ms. Default is 5 minutes
        this.IdleTimeout = 300000;
        /// Sound volume (0-15). Default value = 15
        this.SoundVolume = 15;
    }
}


/***/ }),

/***/ "./node_modules/@rm-vca/vex-ble-device-manager/node_modules/@rm-vca/logger/dist/logger.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@rm-vca/vex-ble-device-manager/node_modules/@rm-vca/logger/dist/logger.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const log = __webpack_require__(/*! loglevel */ "./node_modules/loglevel/lib/loglevel.js");
const prefix = __webpack_require__(/*! loglevel-plugin-prefix */ "./node_modules/loglevel-plugin-prefix/lib/loglevel-plugin-prefix.js");
prefix.reg(log);
// log.setLevel("TRACE");
prefix.apply(log, {
    template: '[%t] %l (%n):',
    levelFormatter(level) {
        return (level.toUpperCase() + "     ").slice(0, 5);
    },
    nameFormatter(name) {
        return name || 'global';
    },
    timestampFormatter(date) {
        return date.toISOString();
    },
});
const logger = log;
module.exports = logger;


/***/ })

});
//# sourceMappingURL=03f04aa4bd2bb3e2f0b5.21.bundle.js.map