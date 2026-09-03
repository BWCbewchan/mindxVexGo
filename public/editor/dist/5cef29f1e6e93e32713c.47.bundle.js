this["webpackChunkwebapp"]([47],{

/***/ "./src/HardwareInterface/GO123/GOBLE.ts":
/*!**********************************************!*\
  !*** ./src/HardwareInterface/GO123/GOBLE.ts ***!
  \**********************************************/
/*! exports provided: GOBLE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GOBLE", function() { return GOBLE; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GO123Interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GO123Interface */ "./src/HardwareInterface/GO123/GO123Interface.ts");
/* harmony import */ var _GO123BLE__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GO123BLE */ "./src/HardwareInterface/GO123/GO123BLE.ts");
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

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("GOBLE");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();
log.setHistoryLogger("HWInterface");

// tslint:disable: member-ordering

// parent classes/types


var GOBLE = /*#__PURE__*/function (_GO123BLE) {
  _inherits(GOBLE, _GO123BLE);
  var _super = _createSuper(GOBLE);
  function GOBLE() {
    var _this;
    _classCallCheck(this, GOBLE);
    _this = _super.call(this);
    log.debug("construct GOBLE");
    return _this;
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
  //#endregion remote control

  //#region firmware
  _createClass(GOBLE, [{
    key: "getFWUpdateMessages",
    value: function getFWUpdateMessages() {
      return _GO123Interface__WEBPACK_IMPORTED_MODULE_1__["GO123Interface"].FWUpdateMessagesGO;
    }
    //#endregion firmware

    //#region internal firmware
    //#endregion internal firmware

    //#region internal firmware low level
    //#endregion firmware

    //#region events
    //#endregion events

    //#region native -> webapp events
    //#region status events
    //#endregion status events
    //#endregion native -> webapp events
  }]);
  return GOBLE;
}(_GO123BLE__WEBPACK_IMPORTED_MODULE_2__["GO123BLE"]);


/***/ })

});
//# sourceMappingURL=5cef29f1e6e93e32713c.47.bundle.js.map