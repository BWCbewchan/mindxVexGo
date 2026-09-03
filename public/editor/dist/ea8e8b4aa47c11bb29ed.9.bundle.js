this["webpackChunkwebapp"]([9],{

/***/ "./src/FeatureLock/LicenseSystem.ts":
/*!******************************************!*\
  !*** ./src/FeatureLock/LicenseSystem.ts ***!
  \******************************************/
/*! exports provided: logout, teamLogin, classLogin, getLicenseWithRefresh, getLicenseAfterRefresh, getLicenseWithoutRefresh, getClassInformation, getTeamInformation, getUnityAuthDataMessage, shouldUseStudentID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "teamLogin", function() { return teamLogin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classLogin", function() { return classLogin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLicenseWithRefresh", function() { return getLicenseWithRefresh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLicenseAfterRefresh", function() { return getLicenseAfterRefresh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLicenseWithoutRefresh", function() { return getLicenseWithoutRefresh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClassInformation", function() { return getClassInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeamInformation", function() { return getTeamInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUnityAuthDataMessage", function() { return getUnityAuthDataMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldUseStudentID", function() { return shouldUseStudentID; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Licenses__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Licenses */ "./src/FeatureLock/Licenses.ts");
/* harmony import */ var _VirtualSkillsLicenseSystem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VirtualSkillsLicenseSystem */ "./src/FeatureLock/VirtualSkillsLicenseSystem.ts");
/* harmony import */ var _VRClassSystem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VRClassSystem */ "./src/FeatureLock/VRClassSystem.ts");
/* harmony import */ var _SimWindow_UnitySkillsEnums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SimWindow/UnitySkillsEnums */ "./src/SimWindow/UnitySkillsEnums.ts");
/* harmony import */ var _Playgrounds_VRPlaygroundData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Playgrounds/VRPlaygroundData */ "./src/Playgrounds/VRPlaygroundData.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("VirtualSkillsLicenseSystem");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();







/**
 * will log out of the current license system
 */
function logout() {
  return _logout.apply(this, arguments);
}
/**
 * Checks the provided team information for a valid season and will use that for
 * a virtual skills license.
 * @param team the team number 
 * @param code the auth code for the team
 * @param program the program for the team
 * @returns 
 */
function _logout() {
  _logout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _VirtualSkillsLicenseSystem__WEBPACK_IMPORTED_MODULE_2__["logout"]();
          _VRClassSystem__WEBPACK_IMPORTED_MODULE_3__["classSystem"].logout();
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _logout.apply(this, arguments);
}
function teamLogin(_x, _x2, _x3) {
  return _teamLogin.apply(this, arguments);
}
/**
 * Call this to login to a VR Class. if all ready logged in, if the code matches,
 * nothing will happen. otherwise, the exsisting login will be logged out and we
 * will try the new one
 * @param code the class code from the dashboard to log in with
 * @param studentID the optional unique ID for the student for the research project
 * @returns Promise that resolves true if we were able to login
 */
function _teamLogin() {
  _teamLogin = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(team, code, program) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          // make sure we are not logged into a VR Class. this should never really happen...
          _VRClassSystem__WEBPACK_IMPORTED_MODULE_3__["classSystem"].logout();
          return _context2.abrupt("return", _VirtualSkillsLicenseSystem__WEBPACK_IMPORTED_MODULE_2__["login"](team, code, program));
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _teamLogin.apply(this, arguments);
}
function classLogin(_x4, _x5) {
  return _classLogin.apply(this, arguments);
}
/**
 * Gets the current license. This will also trigger a refresh of the cache data
 * if the data is no longer valid. Will return the current value right away
 * even if the data needs to be refreshed.
 * @returns the current license
 */
function _classLogin() {
  _classLogin = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(code, studentID) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          // make sure we are not logged into a virtual skills team. this should never
          // really happen...
          _VirtualSkillsLicenseSystem__WEBPACK_IMPORTED_MODULE_2__["logout"]();
          return _context3.abrupt("return", _VRClassSystem__WEBPACK_IMPORTED_MODULE_3__["classSystem"].login(code, studentID));
        case 2:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _classLogin.apply(this, arguments);
}
function getLicenseWithRefresh() {
  var VirtualSkillsLicense = _VirtualSkillsLicenseSystem__WEBPACK_IMPORTED_MODULE_2__["getLicense"]();
  if (VirtualSkillsLicense !== _Licenses__WEBPACK_IMPORTED_MODULE_1__["FeatureLockLicense"].Standard) {
    return VirtualSkillsLicense;
  }
  return _VRClassSystem__WEBPACK_IMPORTED_MODULE_3__["classSystem"].getLevelWithRefresh();
}

/** 
 * Returns the current license, but will wait to make sure the value is valid
 * before it is returned.
 * @returns the current license after refresh if needed
 */
function getLicenseAfterRefresh() {
  return _getLicenseAfterRefresh.apply(this, arguments);
}
/** 
 * Returns the current license. This will never refresh the data.
 * @returns the current license
 */
function _getLicenseAfterRefresh() {
  _getLicenseAfterRefresh = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var VirtualSkillsLicense;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          VirtualSkillsLicense = _VirtualSkillsLicenseSystem__WEBPACK_IMPORTED_MODULE_2__["getLicense"]();
          if (!(VirtualSkillsLicense !== _Licenses__WEBPACK_IMPORTED_MODULE_1__["FeatureLockLicense"].Standard)) {
            _context4.next = 3;
            break;
          }
          return _context4.abrupt("return", VirtualSkillsLicense);
        case 3:
          return _context4.abrupt("return", _VRClassSystem__WEBPACK_IMPORTED_MODULE_3__["classSystem"].getLevelAfterRefresh());
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _getLicenseAfterRefresh.apply(this, arguments);
}
function getLicenseWithoutRefresh() {
  var VirtualSkillsLicense = _VirtualSkillsLicenseSystem__WEBPACK_IMPORTED_MODULE_2__["getLicense"]();
  if (VirtualSkillsLicense !== _Licenses__WEBPACK_IMPORTED_MODULE_1__["FeatureLockLicense"].Standard) {
    return VirtualSkillsLicense;
  }
  return _VRClassSystem__WEBPACK_IMPORTED_MODULE_3__["classSystem"].getLevelNoRefresh();
}

/**
 * Grabs the metadata for the current class license.
 */
function getClassInformation() {
  var VRClassLicense = _VRClassSystem__WEBPACK_IMPORTED_MODULE_3__["classSystem"].getLevelNoRefresh();
  if (VRClassLicense !== _Licenses__WEBPACK_IMPORTED_MODULE_1__["FeatureLockLicense"].Standard) {
    return _VRClassSystem__WEBPACK_IMPORTED_MODULE_3__["classSystem"].getClassInfo();
  }
  return null;
}

/**
 * Grabs the metadata for the current team license.
 */
function getTeamInformation() {
  var VirtualSkillsLicense = _VirtualSkillsLicenseSystem__WEBPACK_IMPORTED_MODULE_2__["getLicense"]();
  if (VirtualSkillsLicense !== _Licenses__WEBPACK_IMPORTED_MODULE_1__["FeatureLockLicense"].Standard) {
    return _VirtualSkillsLicenseSystem__WEBPACK_IMPORTED_MODULE_2__["getTeamInfo"]();
  }
  return null;
}

/**
 * builds the message for the unity auth data for skills
 * @param playground the name of the playground that is currently selected. used when using VR license or demo to set the program
 */
function getUnityAuthDataMessage(playground) {
  log.debug("getUnityAuthDataMessage", playground);
  var playgroundTier = Object(_Playgrounds_VRPlaygroundData__WEBPACK_IMPORTED_MODULE_5__["getSceneTier"])(playground);
  var supportsVIQC = playgroundTier && playgroundTier.includes(_Licenses__WEBPACK_IMPORTED_MODULE_1__["FeatureLockLicense"].VirtualSkillsIQ);
  var supportsVRC = playgroundTier && playgroundTier.includes(_Licenses__WEBPACK_IMPORTED_MODULE_1__["FeatureLockLicense"].VirtualSkillsV5);
  var baseProgram = supportsVIQC ? _SimWindow_UnitySkillsEnums__WEBPACK_IMPORTED_MODULE_4__["UnitySkillsRECProgram"].VIQC : supportsVRC ? _SimWindow_UnitySkillsEnums__WEBPACK_IMPORTED_MODULE_4__["UnitySkillsRECProgram"].VRC : null; // this should never be null...

  if (_VirtualSkillsLicenseSystem__WEBPACK_IMPORTED_MODULE_2__["isValid"]()) {
    // using a virtual skills license
    var teamInfo = _VirtualSkillsLicenseSystem__WEBPACK_IMPORTED_MODULE_2__["getSkillsInfo"]();
    var program = teamInfo.isDemo ? baseProgram : teamInfo.program === "VRC" ? _SimWindow_UnitySkillsEnums__WEBPACK_IMPORTED_MODULE_4__["UnitySkillsRECProgram"].VRC : teamInfo.program === "VEXU" ? _SimWindow_UnitySkillsEnums__WEBPACK_IMPORTED_MODULE_4__["UnitySkillsRECProgram"].VEXU : _SimWindow_UnitySkillsEnums__WEBPACK_IMPORTED_MODULE_4__["UnitySkillsRECProgram"].VIQC;
    return {
      command: "SkillsAuthData",
      registrationType: _SimWindow_UnitySkillsEnums__WEBPACK_IMPORTED_MODULE_4__["UnitySkillsRegistrationType"].skills,
      teamNumber: teamInfo.teamNumber,
      teamName: teamInfo.teamName,
      teamId: teamInfo.teamID,
      teamKey: teamInfo.authCode,
      isDemo: teamInfo.isDemo,
      recProgram: program
    };
  }
  var VRClassLicense = _VRClassSystem__WEBPACK_IMPORTED_MODULE_3__["classSystem"].getLevelNoRefresh();
  var supportsVR = VRClassLicense === _Licenses__WEBPACK_IMPORTED_MODULE_1__["FeatureLockLicense"].Advanced;
  var registrationType = supportsVR ? _SimWindow_UnitySkillsEnums__WEBPACK_IMPORTED_MODULE_4__["UnitySkillsRegistrationType"].vr : _SimWindow_UnitySkillsEnums__WEBPACK_IMPORTED_MODULE_4__["UnitySkillsRegistrationType"].none;
  return {
    command: "SkillsAuthData",
    registrationType: registrationType,
    teamNumber: "VR",
    teamName: "VEXcode VR",
    teamId: -1,
    teamKey: "",
    isDemo: false,
    recProgram: baseProgram
  };
}

/** indicates if we should ask for a student ID on login */
function shouldUseStudentID() {
  return !!false;
}


/***/ }),

/***/ "./src/FeatureLock/VirtualSkillsLicenseSystem.ts":
/*!*******************************************************!*\
  !*** ./src/FeatureLock/VirtualSkillsLicenseSystem.ts ***!
  \*******************************************************/
/*! exports provided: getLicense, login, logout, getTeamInfo, getSkillsInfo, isValid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLicense", function() { return getLicense; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeamInfo", function() { return getTeamInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSkillsInfo", function() { return getSkillsInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValid", function() { return isValid; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GlobalEventSystem */ "./src/GlobalEventSystem.ts");
/* harmony import */ var _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../StorageInterface/VEXcodeStorage */ "./src/StorageInterface/VEXcodeStorage.ts");
/* harmony import */ var _Licenses__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Licenses */ "./src/FeatureLock/Licenses.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("VirtualSkillsLicenseSystem");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();





//#region types
/** the different virtual skills program options */

//#endregion types

//#region constants
var SKILLS_TEAM_KEY = "VirtualSkillsTeam";
var SKILLS_NAME_KEY = "VirtualSkillsName";
var SKILLS_CODE_KEY = "VirtualSkillsCode";
var SKILLS_TEAM_ID_KEY = "VirtualSkillsID";
var SKILLS_DEMO_KEY = "VirtualSkillsDemo";
var SKILLS_PROGRAM_KEY = "VirtualSkillsProgram";
var ROBOT_EVENTS_DEV = "https://test.robotevents.com/api/virtualSkillsVerify";
var ROBOT_EVENTS_PROD = "https://www.robotevents.com/api/virtualSkillsVerify";
/** URL to robot events API to check the skills */
var ROBOT_EVENTS_URL =  false ? undefined : ROBOT_EVENTS_PROD;

// /** max age of a server check cache in days */
// const CHECK_AGE = 1;
//#endregion constants

var teamNumber = null;
var authCode = null;
var teamProgram = null;
var teamName = null;
var isDemo = null;
var teamID = null;
var isValidTeam = false;

/**
 * Checks the provided data against the Robot Events server. This lets us check if
 * a team is valid or not and grabs extra meta data.
 * @param team the team number to check
 * @param code the auth code for the team
 * @param program the program for the team
 * @returns null if the team is not valid or the meta data for the team if valid
 */
function checkServer(_x, _x2, _x3) {
  return _checkServer.apply(this, arguments);
}
/**
 * checks the server with the current team information
 */
function _checkServer() {
  _checkServer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(team, code, program) {
    var paramsObject, params, url, response, responseData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // create the URL with the correct params to check the license;
          paramsObject = {
            team: team,
            auth_code: code
          };
          if (program) {
            log.debug("adding program");
            paramsObject.program = program;
          }
          params = new URLSearchParams(paramsObject).toString();
          url = ROBOT_EVENTS_URL + "?" + params;
          log.debug("checking", url);
          _context.next = 7;
          return fetch(url, {
            method: "POST",
            redirect: "follow"
          });
        case 7:
          response = _context.sent;
          log.debug("request complete", response);
          if (response.ok) {
            _context.next = 12;
            break;
          }
          log.debug("response was not OK");
          return _context.abrupt("return", null);
        case 12:
          _context.next = 14;
          return response.json();
        case 14:
          responseData = _context.sent;
          log.debug("responseData", responseData);
          if (!(responseData.message !== "verified")) {
            _context.next = 19;
            break;
          }
          log.debug("response was not verified");
          return _context.abrupt("return", null);
        case 19:
          isValidTeam = true;
          return _context.abrupt("return", {
            teamName: responseData.team_name,
            teamNumber: responseData.team,
            isDemo: responseData.is_done,
            teamID: responseData.team_id,
            program: responseData.program
          });
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _checkServer.apply(this, arguments);
}
function checkTeam() {
  return _checkTeam.apply(this, arguments);
}
/**
 * will try to validate and use the provided team information.
 * @param team the team number 
 * @param code the auth code for the team
 * @param program the program for the team
 * @returns 
 */
function _checkTeam() {
  _checkTeam = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          log.info("checking team", teamNumber);

          // make sure we have the info we need to check the team
          if (teamNumber) {
            _context2.next = 4;
            break;
          }
          log.info("no team number to check");
          return _context2.abrupt("return", false);
        case 4:
          if (authCode) {
            _context2.next = 7;
            break;
          }
          log.info("no auth code to check");
          return _context2.abrupt("return", false);
        case 7:
          _context2.next = 9;
          return checkServer(teamNumber, authCode, teamProgram);
        case 9:
          result = _context2.sent;
          // check the result
          if (!result) {
            updateTeamData();
          } else {
            updateTeamData(_objectSpread(_objectSpread({}, result), {}, {
              authCode: authCode
            }));
          }
          // return if the team is valid or not
          return _context2.abrupt("return", !!result);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _checkTeam.apply(this, arguments);
}
function login(_x4, _x5, _x6) {
  return _login.apply(this, arguments);
}
/**
 * will log out of the current virtual skills team. if logged in, event to
 * update the data will be triggered.
 */
function _login() {
  _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(team, code, program) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          // if logged in we should log out. not really sure why this would happen
          if (isValid()) {
            log.warn("how did we get to login if we are already logged in?");
            logout();
          }

          // store the new information
          teamNumber = team;
          authCode = code;
          teamProgram = program;

          // check the team and return the result.
          return _context3.abrupt("return", checkTeam());
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _login.apply(this, arguments);
}
function logout() {
  return _logout.apply(this, arguments);
}
/**
 * check to see if the current team information is for a valid team. this does
 * not check against the server.
 * @returns true if the info is valid.
 */
function _logout() {
  _logout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          isValidTeam = false;
          updateTeamData();
        case 2:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _logout.apply(this, arguments);
}
function isValid() {
  return isValidTeam;
}

/** 
 * should be called on load to pull the cached data, if any, before having that
 * data verified.
 */
function readStoredTeamData() {
  var storedData = {
    teamNumber: _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].readKey(SKILLS_TEAM_KEY),
    authCode: _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].readKey(SKILLS_CODE_KEY),
    teamName: _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].readKey(SKILLS_NAME_KEY),
    teamID: parseInt(_StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].readKey(SKILLS_TEAM_ID_KEY) || "0"),
    isDemo: _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].readKey(SKILLS_DEMO_KEY) === "true",
    program: _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].readKey(SKILLS_PROGRAM_KEY)
  };
  log.debug("stored data:", storedData);
  teamNumber = storedData.teamNumber;
  authCode = storedData.authCode;
  teamName = storedData.teamName;
  teamID = storedData.teamID;
  isDemo = storedData.isDemo;
  teamProgram = storedData.program;
}

/**
 * this should be called after checking the server. it will update the data in
 * the local storage and if the data changed, trigger the event to let the app
 * know of the new data.
 * @param data the new data from the server or null to reset the data
 */
function updateTeamData(data) {
  log.debug("updateTeamData", data);
  var changed = false;
  if (data !== null && data !== void 0 && data.teamNumber) {
    _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].writeKey(SKILLS_TEAM_KEY, data.teamNumber);
  } else {
    _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].clearKey(SKILLS_TEAM_KEY);
  }
  changed = changed || teamNumber !== (data === null || data === void 0 ? void 0 : data.teamNumber);
  teamNumber = (data === null || data === void 0 ? void 0 : data.teamNumber) || null;
  if (data !== null && data !== void 0 && data.authCode) {
    _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].writeKey(SKILLS_CODE_KEY, data.authCode);
  } else {
    _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].clearKey(SKILLS_CODE_KEY);
  }
  changed = changed || authCode !== (data === null || data === void 0 ? void 0 : data.authCode);
  authCode = (data === null || data === void 0 ? void 0 : data.authCode) || null;
  if (data !== null && data !== void 0 && data.teamName) {
    _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].writeKey(SKILLS_NAME_KEY, data.teamName);
  } else {
    _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].clearKey(SKILLS_NAME_KEY);
  }
  changed = changed || teamName !== (data === null || data === void 0 ? void 0 : data.teamName);
  teamName = (data === null || data === void 0 ? void 0 : data.teamName) || null;
  if (data !== null && data !== void 0 && data.teamID) {
    _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].writeKey(SKILLS_TEAM_ID_KEY, "".concat(data.teamID));
  } else {
    _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].clearKey(SKILLS_TEAM_ID_KEY);
  }
  changed = changed || teamID !== (data === null || data === void 0 ? void 0 : data.teamID);
  teamID = (data === null || data === void 0 ? void 0 : data.teamID) || null;
  if (data !== null && data !== void 0 && data.isDemo) {
    _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].writeKey(SKILLS_DEMO_KEY, "".concat(data.isDemo));
  } else {
    _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].clearKey(SKILLS_DEMO_KEY);
  }
  changed = changed || isDemo !== (data === null || data === void 0 ? void 0 : data.isDemo);
  isDemo = (data === null || data === void 0 ? void 0 : data.isDemo) || null;
  if (data !== null && data !== void 0 && data.program) {
    _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].writeKey(SKILLS_PROGRAM_KEY, data.program);
  } else {
    _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_2__["storageInterface"].clearKey(SKILLS_PROGRAM_KEY);
  }
  changed = changed || teamProgram !== (data === null || data === void 0 ? void 0 : data.program);
  teamProgram = (data === null || data === void 0 ? void 0 : data.program) || null;
  if (changed) {
    log.info("team info changed");
    _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]("FeatureLock.DataUpdate");
  }
}

/**
 * checks what license the team information is for. If the team information is
 * invalid, the license is standard.
 * @returns the licenses that represents the current team information or 
 * FeatureLockLicense.Standard if there is not valid team.
 */
function getLicense() {
  if (!isValid()) {
    return _Licenses__WEBPACK_IMPORTED_MODULE_3__["FeatureLockLicense"].Standard;
  }
  if (teamProgram === "VIQRC") {
    return _Licenses__WEBPACK_IMPORTED_MODULE_3__["FeatureLockLicense"].VirtualSkillsIQ;
  }
  return _Licenses__WEBPACK_IMPORTED_MODULE_3__["FeatureLockLicense"].VirtualSkillsV5;
}

// pull cached and check data on load
readStoredTeamData();
checkTeam();

/**
 * returns the information for the current team or null if team info is not valid
 * @returns the team information or null
 */
function getTeamInfo() {
  if (!isValid()) {
    return null;
  }
  return {
    teamName: teamName,
    teamNumber: teamNumber,
    teamID: teamID,
    program: teamProgram,
    isDemo: isDemo
  };
}
function getSkillsInfo() {
  if (!isValid()) {
    return null;
  }
  return {
    teamName: teamName,
    teamNumber: teamNumber,
    teamID: teamID,
    program: teamProgram,
    isDemo: isDemo,
    authCode: authCode
  };
}


/***/ }),

/***/ "./src/Playgrounds/VRPlaygroundData.ts":
/*!*********************************************!*\
  !*** ./src/Playgrounds/VRPlaygroundData.ts ***!
  \*********************************************/
/*! exports provided: getUnitySceneName, getScenes, getSceneData, getSceneRobot, getSceneTier, getSceneList, unityScenesInfoVR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUnitySceneName", function() { return getUnitySceneName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScenes", function() { return getScenes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSceneData", function() { return getSceneData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSceneRobot", function() { return getSceneRobot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSceneTier", function() { return getSceneTier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSceneList", function() { return getSceneList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unityScenesInfoVR", function() { return unityScenesInfoVR; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../targetPlatform */ "./src/targetPlatform.ts");
/* harmony import */ var _FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../FeatureLock/Licenses */ "./src/FeatureLock/Licenses.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("VRPlaygroundData");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();



var FreeTierArray = [_FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Standard, _FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Enhanced, _FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Advanced, _FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].VirtualSkillsIQ, _FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].VirtualSkillsV5];
var basePath = _targetPlatform__WEBPACK_IMPORTED_MODULE_1__["targetIsIQ"] ? "SimUnityBuilds/IQ/" : "SimUnityBuilds/V5/";
var unityScenesInfoVirtualSkills = {
  defualt: {
    robot: "vr",
    unityData: {
      loaderUrl: basePath + "VEXcodeSimulator.loader.js",
      dataUrl: basePath + "VEXcodeSimulator.data.unityweb",
      codeUrl: basePath + "VEXcodeSimulator.wasm.unityweb",
      frameworkUrl: basePath + "VEXcodeSimulator.framework.js.unityweb"
    },
    tier: FreeTierArray
  }
};

// TODO: we should automatically sort this by Tier then alphabetically.
// We will need the translated playground names to do that sorting.s
var unityScenesInfoVR = {
  // default: {
  //   robot: "vr",
  //   isDummy: true,
  //   unityData: {
  //     loaderUrl: "",
  //     dataUrl: "",
  //     codeUrl: "",
  //     frameworkUrl: "",
  //   }
  // },
  // defaultRover: {
  //   robot: "rover",
  //   isDummy: true,
  //   unityData: {
  //     loaderUrl: "",
  //     dataUrl: "",
  //     codeUrl: "",
  //     frameworkUrl: "",
  //   }
  // },
  Virtual123: {
    robot: "vr123",
    unityData: {
      loaderUrl: "Playgrounds/Virtual123/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/Virtual123/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/Virtual123/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/Virtual123/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: [_FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Advanced]
  },
  GOMars: {
    robot: "vrGO",
    unityData: {
      loaderUrl: "Playgrounds/GoMars/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/GoMars/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/GoMars/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/GoMars/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: [_FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Advanced]
  },
  VIQC22: {
    robot: "viqc22",
    unityData: {
      loaderUrl: "Playgrounds/VIQC22/VEXcodeSimulator.loader.js",
      dataUrl: "Playgrounds/VIQC22/VEXcodeSimulator.data.unityweb",
      codeUrl: "Playgrounds/VIQC22/VEXcodeSimulator.wasm.unityweb",
      frameworkUrl: "Playgrounds/VIQC22/VEXcodeSimulator.framework.js.unityweb"
    },
    tier: [_FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Advanced]
  },
  VIQC23: {
    robot: "viqc23",
    unityData: {
      loaderUrl: "Playgrounds/VIQC23/VEXcodeSimulator.loader.js",
      dataUrl: "Playgrounds/VIQC23/VEXcodeSimulator.data.unityweb",
      codeUrl: "Playgrounds/VIQC23/VEXcodeSimulator.wasm.unityweb",
      frameworkUrl: "Playgrounds/VIQC23/VEXcodeSimulator.framework.js.unityweb"
    },
    tier: [_FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Advanced]
  },
  VIQC24: {
    robot: "viqc24",
    unityData: {
      loaderUrl: "Playgrounds/VIQC24/VEXcodeSimulator.loader.js",
      dataUrl: "Playgrounds/VIQC24/VEXcodeSimulator.data.unityweb",
      codeUrl: "Playgrounds/VIQC24/VEXcodeSimulator.wasm.unityweb",
      frameworkUrl: "Playgrounds/VIQC24/VEXcodeSimulator.framework.js.unityweb"
    },
    tier: [_FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Advanced, _FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].VirtualSkillsIQ]
  },
  VRC22: {
    robot: "vrc22",
    unityData: {
      loaderUrl: "Playgrounds/VRC22/VEXcodeSimulator.loader.js",
      dataUrl: "Playgrounds/VRC22/VEXcodeSimulator.data.unityweb",
      codeUrl: "Playgrounds/VRC22/VEXcodeSimulator.wasm.unityweb",
      frameworkUrl: "Playgrounds/VRC22/VEXcodeSimulator.framework.js.unityweb"
    },
    tier: [_FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Advanced],
    comingSoon: false
  },
  VRC23: {
    robot: "vrc23",
    unityData: {
      loaderUrl: "Playgrounds/VRC23/VEXcodeSimulator.loader.js",
      dataUrl: "Playgrounds/VRC23/VEXcodeSimulator.data.unityweb",
      codeUrl: "Playgrounds/VRC23/VEXcodeSimulator.wasm.unityweb",
      frameworkUrl: "Playgrounds/VRC23/VEXcodeSimulator.framework.js.unityweb"
    },
    tier: [_FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Advanced],
    comingSoon: false
  },
  VRC24: {
    robot: "vrc24",
    unityData: {
      loaderUrl: "Playgrounds/VRC24/VEXcodeSimulator.loader.js",
      dataUrl: "Playgrounds/VRC24/VEXcodeSimulator.data.unityweb",
      codeUrl: "Playgrounds/VRC24/VEXcodeSimulator.wasm.unityweb",
      frameworkUrl: "Playgrounds/VRC24/VEXcodeSimulator.framework.js.unityweb"
    },
    tier: [_FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Advanced, _FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].VirtualSkillsV5],
    comingSoon: false
  },
  RoverRescue: {
    robot: "rover",
    unityData: {
      loaderUrl: "Playgrounds/RoverRescue/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/RoverRescue/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/RoverRescue/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/RoverRescue/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: [_FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Advanced]
  },
  ArtCanvasPlus: {
    robot: "vr",
    unityData: {
      loaderUrl: "Playgrounds/ArtCanvasPlus/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/ArtCanvasPlus/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/ArtCanvasPlus/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/ArtCanvasPlus/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: [_FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Enhanced, _FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Advanced]
  },
  CastleCrasherPlus: {
    robot: "vr",
    unityData: {
      loaderUrl: "Playgrounds/CastleCrasherPlus/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/CastleCrasherPlus/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/CastleCrasherPlus/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/CastleCrasherPlus/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: [_FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Enhanced, _FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Advanced]
  },
  MazePlus: {
    robot: "vrEnhMaze",
    unityData: {
      loaderUrl: "Playgrounds/MazePlus/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/MazePlus/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/MazePlus/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/MazePlus/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: [_FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Enhanced, _FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_2__["FeatureLockLicense"].Advanced]
  },
  ArtCanvas: {
    robot: "vr",
    unityData: {
      loaderUrl: "Playgrounds/ArtCanvas/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/ArtCanvas/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/ArtCanvas/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/ArtCanvas/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: FreeTierArray
  },
  CastleCrasher: {
    robot: "vr",
    unityData: {
      loaderUrl: "Playgrounds/CastleCrasher/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/CastleCrasher/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/CastleCrasher/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/CastleCrasher/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: FreeTierArray
  },
  CoralReefRescue: {
    robot: "vr",
    unityData: {
      loaderUrl: "Playgrounds/CoralReefRescue/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/CoralReefRescue/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/CoralReefRescue/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/CoralReefRescue/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: FreeTierArray
  },
  PuckMaze: {
    robot: "vr",
    unityData: {
      loaderUrl: "Playgrounds/PuckMaze/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/PuckMaze/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/PuckMaze/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/PuckMaze/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: FreeTierArray
  },
  DiskMover: {
    robot: "vr",
    unityData: {
      loaderUrl: "Playgrounds/DiskMover/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/DiskMover/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/DiskMover/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/DiskMover/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: FreeTierArray
  },
  Magnet: {
    robot: "vr",
    unityData: {
      loaderUrl: "Playgrounds/DiskTransport/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/DiskTransport/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/DiskTransport/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/DiskTransport/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: FreeTierArray
  },
  DynamicCastleCrasher: {
    robot: "vr",
    unityData: {
      loaderUrl: "Playgrounds/DynamicCastleCrasher/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/DynamicCastleCrasher/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/DynamicCastleCrasher/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/DynamicCastleCrasher/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: FreeTierArray
  },
  DynamicWallMaze: {
    robot: "vr",
    unityData: {
      loaderUrl: "Playgrounds/DynamicWallMaze/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/DynamicWallMaze/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/DynamicWallMaze/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/DynamicWallMaze/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: FreeTierArray
  },
  EncodedMessage: {
    robot: "vr",
    unityData: {
      loaderUrl: "Playgrounds/EncodedMessage/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/EncodedMessage/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/EncodedMessage/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/EncodedMessage/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: FreeTierArray
  },
  Grid: {
    robot: "vr",
    unityData: {
      loaderUrl: "Playgrounds/Grid/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/Grid/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/Grid/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/Grid/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: FreeTierArray
  },
  HiddenPixelArt: {
    robot: "vr",
    unityData: {
      loaderUrl: "Playgrounds/HiddenPixelArt/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/HiddenPixelArt/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/HiddenPixelArt/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/HiddenPixelArt/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: FreeTierArray
  },
  LineDetector: {
    robot: "vr",
    unityData: {
      loaderUrl: "Playgrounds/LineDetector/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/LineDetector/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/LineDetector/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/LineDetector/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: FreeTierArray
  },
  Number: {
    robot: "vr",
    unityData: {
      loaderUrl: "Playgrounds/Number/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/Number/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/Number/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/Number/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: FreeTierArray
  },
  ShapeTracer: {
    robot: "vr",
    unityData: {
      loaderUrl: "Playgrounds/ShapeTracer/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/ShapeTracer/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/ShapeTracer/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/ShapeTracer/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: FreeTierArray
  },
  WallMaze: {
    robot: "vr",
    unityData: {
      loaderUrl: "Playgrounds/WallMaze/VEXcodePlaygrounds.loader.js",
      dataUrl: "Playgrounds/WallMaze/VEXcodePlaygrounds.data.unityweb",
      codeUrl: "Playgrounds/WallMaze/VEXcodePlaygrounds.wasm.unityweb",
      frameworkUrl: "Playgrounds/WallMaze/VEXcodePlaygrounds.framework.js.unityweb"
    },
    tier: FreeTierArray
  }
};

// if (!isSafari) {
//   // TODO: remove by "isDummy" flag instead of hardcoded delete
//   delete unityScenesInfoVR.default;
//   delete unityScenesInfoVR.defaultRover;
// }

var unityScenesInfo = _targetPlatform__WEBPACK_IMPORTED_MODULE_1__["targetIsPlaygrounds"] ? unityScenesInfoVR : unityScenesInfoVirtualSkills;
var currentSceneName = _targetPlatform__WEBPACK_IMPORTED_MODULE_1__["targetIsPlaygrounds"] ? "ArtCanvas" : Object.keys(unityScenesInfo)[0];
log.debug("initial scene name:", currentSceneName);
function getSceneData(name) {
  var out = Object.assign({}, unityScenesInfo[name].unityData);
  return out;
}
function getSceneRobot(name) {
  return unityScenesInfo[name].robot;
}
function getUnitySceneName() {
  return currentSceneName;
}
function getScenes(robot) {
  if (robot) {
    return Object.entries(unityScenesInfo).filter(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        scene = _ref2[1];
      return scene.robot === robot;
    }).map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        name = _ref4[0],
        scene = _ref4[1];
      return name;
    });
  }
  return Object.keys(unityScenesInfo);
}

/**
 * gets the tier info for the specified playground
 * @param name the name of the playground to check
 * @returns the list of tiers that the playground works with
 */
function getSceneTier(name) {
  return unityScenesInfo[name].tier;
}

/**
 * will return a list of the meta data for all the non-dummy scenes
 */
function getSceneList() {
  var out = [];
  for (var _i2 = 0, _Object$entries = Object.entries(unityScenesInfo); _i2 < _Object$entries.length; _i2++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
      name = _Object$entries$_i[0],
      scene = _Object$entries$_i[1];
    if (scene.isDummy) {
      continue;
    }
    var metaData = {
      name: name,
      robot: scene.robot,
      tier: scene.tier,
      comingSoon: scene.comingSoon
    };
    out.push(metaData);
  }
  return out;
}


/***/ }),

/***/ "./src/SimWindow/UnitySkillsEnums.ts":
/*!*******************************************!*\
  !*** ./src/SimWindow/UnitySkillsEnums.ts ***!
  \*******************************************/
/*! exports provided: UnitySkillsRegistrationType, UnitySkillsRECProgram */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitySkillsRegistrationType", function() { return UnitySkillsRegistrationType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitySkillsRECProgram", function() { return UnitySkillsRECProgram; });
var UnitySkillsRegistrationType = /*#__PURE__*/function (UnitySkillsRegistrationType) {
  UnitySkillsRegistrationType[UnitySkillsRegistrationType["none"] = 0] = "none";
  UnitySkillsRegistrationType[UnitySkillsRegistrationType["vr"] = 1] = "vr";
  UnitySkillsRegistrationType[UnitySkillsRegistrationType["skills"] = 2] = "skills";
  return UnitySkillsRegistrationType;
}(UnitySkillsRegistrationType || {});
var UnitySkillsRECProgram = /*#__PURE__*/function (UnitySkillsRECProgram) {
  UnitySkillsRECProgram[UnitySkillsRECProgram["VRC"] = 0] = "VRC";
  UnitySkillsRECProgram[UnitySkillsRECProgram["VIQC"] = 1] = "VIQC";
  UnitySkillsRECProgram[UnitySkillsRECProgram["VEXU"] = 2] = "VEXU";
  return UnitySkillsRECProgram;
}(UnitySkillsRECProgram || {});


/***/ })

});
//# sourceMappingURL=ea8e8b4aa47c11bb29ed.9.bundle.js.map