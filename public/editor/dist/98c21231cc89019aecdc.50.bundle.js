this["webpackChunkwebapp"]([50],{

/***/ "./src/HardwareInterface/GO123/Vex123WebBLE.ts":
/*!*****************************************************!*\
  !*** ./src/HardwareInterface/GO123/Vex123WebBLE.ts ***!
  \*****************************************************/
/*! exports provided: Vex123WebBLE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vex123WebBLE", function() { return Vex123WebBLE; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types_HWErrors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/HWErrors */ "./src/HardwareInterface/types/HWErrors.ts");
/* harmony import */ var _GO123Interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GO123Interface */ "./src/HardwareInterface/GO123/GO123Interface.ts");
/* harmony import */ var _GO123WebBLE__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GO123WebBLE */ "./src/HardwareInterface/GO123/GO123WebBLE.ts");
/* harmony import */ var _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @rm-vca/vex-ble-device-manager */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("Vex123WebBLE");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();
log.setHistoryLogger("HWInterface");

// tslint:disable: member-ordering

// interface types/enums



// parent classes/types



// low-level interface

var Vex123WebBLE = /*#__PURE__*/function (_GO123WebBLE) {
  _inherits(Vex123WebBLE, _GO123WebBLE);
  var _super = _createSuper(Vex123WebBLE);
  function Vex123WebBLE() {
    var _this;
    _classCallCheck(this, Vex123WebBLE);
    _this = _super.call(this);
    log.debug("construct Vex123WebBLE");
    return _this;
  }
  _createClass(Vex123WebBLE, [{
    key: "initWebBLE",
    value: function initWebBLE() {
      _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_4__["init"]("123");
    }

    //#region connection control
    //#region internal calls for connection control
    //#endregion internal calls for connection control
    //#endregion connection control

    //#region brain info
    //#endregion brain info

    //#region program control
    //#endregion program control

    //#region project downloads
    //#endregion project downloads

    //#region compilers
    //#endregion compilers

    //#region script commands
    //#endregion script commands

    //#region remote control
  }, {
    key: "sendControllerButton",
    value: function sendControllerButton(command, buttonID, whenPressed) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_1__["OperationNotSupportedError"]();
    }
  }, {
    key: "sendControllerJoystickPreset",
    value: function sendControllerJoystickPreset(newType, driveSensi, turnSensi) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_1__["OperationNotSupportedError"]();
    }
  }, {
    key: "saveControllerConfig",
    value: function saveControllerConfig() {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_1__["OperationNotSupportedError"]();
    }
  }, {
    key: "sendControllerValues",
    value: function sendControllerValues(leftX, leftY, rightX, rightY, buttons) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_1__["OperationNotSupportedError"]();
    }
    //#endregion remote control

    //#region firmware
  }, {
    key: "getFWUpdateMessages",
    value: function getFWUpdateMessages() {
      return _GO123Interface__WEBPACK_IMPORTED_MODULE_2__["GO123Interface"].FWUpdateMessages123;
    }
    //#endregion firmware

    //#region internal firmware
    //#endregion internal firmware

    //#region internal firmware low level
    //#endregion firmware

    //#region events
    //#endregion

    //#region native -> webapp events
    //#region status events
    //#endregion status events
    //#endregion native -> webapp events

    //#region webBLE event wrappers
  }, {
    key: "onWebBLEPortUpdate",
    value: function onWebBLEPortUpdate(data) {
      var out = {
        battery: data.Battery,
        ports: []
      };
      data.Ports.forEach(function (port) {
        var deviceID = port.DeviceID;
        if (deviceID === _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_4__["VEXPortDeviceID"].Motor123) {
          var motorData = port;
          var motorOut = {
            portNumber: port.PortNumber,
            activeCommand: port.ActiveCommand,
            updateCounter: port.UpdateCounter,
            deviceID: deviceID,
            velocity: motorData.Velocity,
            position: motorData.Position,
            current: motorData.Current,
            flags: motorData.Flags,
            modeBits: motorData.ModeBits
          };
          out.ports.push(motorOut);
        } else if (deviceID === _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_4__["VEXPortDeviceID"].Drive123) {
          var driveData = port;
          var driveOut = {
            portNumber: port.PortNumber,
            activeCommand: port.ActiveCommand,
            updateCounter: port.UpdateCounter,
            deviceID: deviceID,
            velocity: driveData.Velocity,
            position: driveData.Position,
            heading: driveData.Heading,
            flags: driveData.Flags,
            buttonState: driveData.ButtonState,
            pressedEvents: driveData.PressedEvents,
            releasedEvents: driveData.ReleasedEvents,
            colorIndex: driveData.ColorIndex
          };
          out.ports.push(driveOut);
        } else if (deviceID === _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_4__["VEXPortDeviceID"].Sound) {
          var soundData = port;
          var soundOut = {
            portNumber: port.PortNumber,
            activeCommand: port.ActiveCommand,
            updateCounter: port.UpdateCounter,
            deviceID: deviceID,
            soundType: soundData.SoundType,
            soundID: soundData.SoundID
          };
          out.ports.push(soundOut);
        }
      });
      this.onGO123BLEPortsUpdate(out);
    }
    //#endregion webBLE event wrappers

    //#region webble logging
    //#endregion webble logging
  }]);
  return Vex123WebBLE;
}(_GO123WebBLE__WEBPACK_IMPORTED_MODULE_3__["GO123WebBLE"]);


/***/ })

});
//# sourceMappingURL=98c21231cc89019aecdc.50.bundle.js.map