this["webpackChunkwebapp"]([11],{

/***/ "./src/texteditor/utils/languageDataList.ts":
/*!**************************************************!*\
  !*** ./src/texteditor/utils/languageDataList.ts ***!
  \**************************************************/
/*! exports provided: language_List_PG_Python_Basic, language_List_PG_Python_Rover, language_List_PG_Python_Enh, language_List_PG_Python_VIQC, language_List_PG_Python_VRC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "language_List_PG_Python_Basic", function() { return language_List_PG_Python_Basic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "language_List_PG_Python_Rover", function() { return language_List_PG_Python_Rover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "language_List_PG_Python_Enh", function() { return language_List_PG_Python_Enh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "language_List_PG_Python_VIQC", function() { return language_List_PG_Python_VIQC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "language_List_PG_Python_VRC", function() { return language_List_PG_Python_VRC; });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function language_List_PG_Python_Basic() {
  return _language_List_PG_Python_Basic.apply(this, arguments);
}
function _language_List_PG_Python_Basic() {
  _language_List_PG_Python_Basic = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var language_py;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          language_py = {
            vexclass: ['Drivetrain', 'Brain', 'Electromagnet', 'Pen', 'Bumper', 'Distance', 'EyeSensor', 'Location', 'Event'],
            vexclassinstance: ['drivetrain', 'magnet', 'pen', 'brain', 'left_bumper', 'right_bumper', 'front_distance', 'left_distance', 'right_distance', 'front_eye', 'down_eye', 'location', 'asyncio'],
            vexfunctions: ['drive', 'drive_for', 'turn', 'turn_for', 'turn_to_heading', 'turn_to_rotation', 'stop', 'set_drive_velocity', 'set_turn_velocity', 'set_heading', 'set_rotation', 'is_done', 'is_moving', 'heading', 'rotation', 'print', 'run', 'sleep', 'energize', 'move', 'set_pen_color', 'set_print_precision', 'set_pen_width', 'set_pen_color_rgb', 'fill', 'clear', 'new_line', 'set_print_color', 'timer_reset', 'timer_time', 'timer_event', 'pressed', 'found_object', 'get_distance', 'near_object', 'detect', 'brightness', 'position', 'position_angle', 'wait', 'monitor_sensor', 'monitor_variable', 'vr_thread', 'stop_project', 'range', 'broadcast', 'broadcast_and_wait', 'on_pressed', 'on_released', 'object_detected', 'object_lost'],
            vexenumglobals: ['FORWARD', 'REVERSE', 'DEGREES', 'PERCENT', 'SECONDS', 'MM', 'INCHES', 'RIGHT', 'LEFT', 'BOOST', 'DROP', 'UP', 'DOWN', 'BLACK', 'RED', 'GREEN', 'BLUE', 'SECONDS', 'MSEC', 'TURNS', 'NONE', 'EXTRA_THIN', 'THIN', 'MEDIUM', 'WIDE', 'EXTRA_WIDE', 'X', 'Y']
          };
          return _context.abrupt("return", language_py);
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _language_List_PG_Python_Basic.apply(this, arguments);
}
function language_List_PG_Python_Rover() {
  return _language_List_PG_Python_Rover.apply(this, arguments);
}
function _language_List_PG_Python_Rover() {
  _language_List_PG_Python_Rover = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var language_py;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          language_py = {
            vexclass: ['Drivetrain', 'Brain', 'Rover', 'Distance', 'Event'],
            vexclassinstance: ['drivetrain', 'brain', 'rover', 'front_distance', 'distance', 'asyncio'],
            vexfunctions: ['drive', 'drive_for', 'drive_to', 'go_to', 'turn', 'turn_for', 'turn_to', 'turn_to_heading', 'turn_to_rotation', 'stop', 'set_drive_velocity', 'set_turn_velocity', 'set_heading', 'set_rotation', 'is_done', 'is_moving', 'heading', 'rotation', 'print', 'run', 'sleep', 'set_print_precision', 'clear', 'new_line', 'set_print_color', 'timer_reset', 'timer_time', 'timer_event', 'found_object', 'get_distance', 'wait', 'monitor_sensor', 'monitor_variable', 'vr_thread', 'stop_project', 'range', 'broadcast', 'broadcast_and_wait', 'pickup', 'drop', 'use', 'absorb_radiation', 'standby', 'location', 'on_under_attack', 'on_level_up', 'battery', 'minerals_stored', 'level', 'exp', 'enemy_level', 'enemy_radiation', 'storage_capacity', 'under_attack', 'detects', 'sees', 'angle'],
            vexenumglobals: ['FORWARD', 'REVERSE', 'DEGREES', 'PERCENT', 'SECONDS', 'MM', 'INCHES', 'RIGHT', 'LEFT', 'BOOST', 'DROP', 'UP', 'DOWN', 'BLACK', 'RED', 'GREEN', 'BLUE', 'SECONDS', 'MSEC', 'TURNS', 'NONE', 'X', 'Y', 'MINERALS', 'ENEMY', 'BASE', 'OBSTACLE', 'HAZARD', 'ROVER']
          };
          return _context2.abrupt("return", language_py);
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _language_List_PG_Python_Rover.apply(this, arguments);
}
function language_List_PG_Python_Enh() {
  return _language_List_PG_Python_Enh.apply(this, arguments);
}
function _language_List_PG_Python_Enh() {
  _language_List_PG_Python_Enh = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var language_py;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          language_py = {
            vexclass: ['Drivetrain', 'Brain', 'Electromagnet', 'Pen', 'Bumper', 'Distance', 'EyeSensor', 'Location', 'Event'],
            vexclassinstance: ['drivetrain', 'magnet', 'pen', 'brain', 'left_bumper', 'right_bumper', 'front_distance', 'left_distance', 'right_distance', 'front_eye', 'down_eye', 'rear_eye', 'left_eye', 'right_eye', 'location', 'asyncio'],
            vexfunctions: ['drive', 'drive_for', 'turn', 'turn_for', 'turn_to_heading', 'turn_to_rotation', 'stop', 'set_drive_velocity', 'set_turn_velocity', 'set_heading', 'set_rotation', 'is_done', 'is_moving', 'heading', 'rotation', 'print', 'run', 'sleep', 'energize', 'move', 'set_pen_color', 'set_print_precision', 'set_pen_width', 'set_pen_color_rgb', 'fill', 'clear', 'new_line', 'set_print_color', 'timer_reset', 'timer_time', 'timer_event', 'pressed', 'found_object', 'get_distance', 'near_object', 'detect', 'brightness', 'position', 'position_angle', 'wait', 'monitor_sensor', 'monitor_variable', 'vr_thread', 'stop_project', 'range', 'broadcast', 'broadcast_and_wait', 'on_pressed', 'on_released', 'object_detected', 'object_lost'],
            vexenumglobals: ['FORWARD', 'REVERSE', 'DEGREES', 'PERCENT', 'SECONDS', 'MM', 'INCHES', 'RIGHT', 'LEFT', 'BOOST', 'DROP', 'UP', 'DOWN', 'BLACK', 'RED', 'GREEN', 'BLUE', 'SECONDS', 'MSEC', 'TURNS', 'NONE', 'EXTRA_THIN', 'THIN', 'MEDIUM', 'WIDE', 'EXTRA_WIDE']
          };
          return _context3.abrupt("return", language_py);
        case 2:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _language_List_PG_Python_Enh.apply(this, arguments);
}
function language_List_PG_Python_VIQC() {
  return _language_List_PG_Python_VIQC.apply(this, arguments);
}
function _language_List_PG_Python_VIQC() {
  _language_List_PG_Python_VIQC = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var language_py;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          language_py = {
            vexclass: ['Drivetrain', 'Brain', 'Bumper', 'Distance', 'Sonar', 'Motor', 'Optical', 'ColorSensor', 'Event'],
            vexclassinstance: ['brain', 'drivetrain', 'intake_motor', 'intake_motor_group', 'bumper', 'intake_bumper', 'distance', 'front_distance', 'front_optical', 'catapult_motor', 'color', 'catapult_tension_motor', 'arm_motor', 'arm_motor_group', 'timer', 'screen', 'battery'],
            vexfunctions: ['drive', 'drive_for', 'turn', 'turn_for', 'turn_to_heading', 'turn_to_rotation', 'stop', 'set_drive_velocity', 'set_turn_velocity', 'set_timeout', 'set_heading', 'set_rotation', 'is_done', 'is_moving', 'is_spinning', 'heading', 'rotation', 'velocity', 'spin', 'spin_for', 'spin_to_position', 'set_position', 'set_velocity', 'print', 'set_print_precision', 'clear_screen', 'next_row', 'event', 'time', 'clear', 'pressed', 'pressing', 'released', 'found_object', 'distance', 'object_distance', 'object_detected', 'object_lost', 'is_near_object', 'color', 'hue', 'detect', 'brightness', 'is_object_detected', 'object_distance', 'position', 'wait', 'monitor_sensor', 'monitor_variable', 'vr_thread', 'stop_project', 'range', 'broadcast', 'broadcast_and_wait'],
            vexenumglobals: ['FORWARD', 'REVERSE', 'DEGREES', 'PERCENT', 'RPM', 'SECONDS', 'MM', 'INCHES', 'RIGHT', 'LEFT', 'BOOST', 'DROP', 'UP', 'DOWN', 'BLACK', 'RED', 'GREEN', 'BLUE', 'YELLOW', 'ORANGE', 'PURPLE', 'WHITE', 'RED_VIOLET', 'VIOLET', 'BLUE_VIOLET', 'BLUE_GREEN', 'YELLOW_GREEN', 'YELLOW_ORANGE', 'RED_ORANGE', 'SECONDS', 'MSEC', 'TURNS', 'NONE', 'EXTRA_THIN', 'THIN', 'MEDIUM', 'WIDE', 'EXTRA_WIDE', 'X', 'Y']
          };
          return _context4.abrupt("return", language_py);
        case 2:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _language_List_PG_Python_VIQC.apply(this, arguments);
}
function language_List_PG_Python_VRC() {
  return _language_List_PG_Python_VRC.apply(this, arguments);
}
function _language_List_PG_Python_VRC() {
  _language_List_PG_Python_VRC = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var language_py;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          language_py = {
            vexclass: ['Drivetrain', 'Brain', 'Bumper', 'Distance', 'GPS', 'Optical', 'Rotation', 'Motor', 'Event', 'LineTracker'],
            vexclassinstance: ['drivetrain', 'brain', 'bumper', 'distance', 'bottom_distance', 'gps', 'roller_optical', 'optical', 'rotation', 'motor', 'intake_motor_group', 'arm_motor', 'intake_motor', 'fork_motor_group', 'left_distance', 'right_distance', 'center_distance', 'bottom_line_tracker', 'middle_line_tracker', 'top_line_tracker', 'timer', 'screen', 'battery'],
            vexfunctions: ['drive', 'drive_for', 'turn', 'turn_for', 'turn_to_heading', 'turn_to_rotation', 'stop', 'set_drive_velocity', 'set_turn_velocity', 'set_timeout', 'set_heading', 'set_rotation', 'is_done', 'is_moving', 'is_spinning', 'heading', 'velocity', 'spin', 'spin_for', 'spin_to_position', 'set_position', 'set_velocity', 'print', 'set_print_precision', 'clear_screen', 'next_row', 'event', 'time', 'clear', 'pressed', 'pressing', 'released', 'found_object', 'get_distance', 'object_detected', 'object_lost', 'is_near_object', 'color', 'hue', 'detect', 'brightness', 'is_object_detected', 'object_distance', 'position', 'position_angle', 'angle', 'x_position', 'y_position', 'wait', 'monitor_sensor', 'monitor_variable', 'vr_thread', 'stop_project', 'range', 'broadcast', 'broadcast_and_wait', 'reflectivity'],
            vexenumglobals: ['FORWARD', 'REVERSE', 'DEGREES', 'PERCENT', 'SECONDS', 'MM', 'INCHES', 'RIGHT', 'LEFT', 'UP', 'DOWN', 'BLACK', 'RED', 'GREEN', 'BLUE', 'YELLOW', 'ORANGE', 'PURPLE', 'SECONDS', 'MSEC', 'TURNS', 'NONE', 'DPS', 'RPM']
          };
          return _context5.abrupt("return", language_py);
        case 2:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _language_List_PG_Python_VRC.apply(this, arguments);
}

/***/ })

});
//# sourceMappingURL=d03a03465f77b56286dd.11.bundle.js.map