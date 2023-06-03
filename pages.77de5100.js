// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../data-provider/models/equipment/EquipmentSkills.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
var EquipmentSkills = /*#__PURE__*/function (_Map) {
  _inherits(EquipmentSkills, _Map);
  var _super = _createSuper(EquipmentSkills);
  function EquipmentSkills() {
    _classCallCheck(this, EquipmentSkills);
    return _super.apply(this, arguments);
  }
  _createClass(EquipmentSkills, [{
    key: "get",
    value: function get(key) {
      return _get(_getPrototypeOf(EquipmentSkills.prototype), "get", this).call(this, key) || 0;
    }
  }, {
    key: "add",
    value: function add(key, val) {
      this.set(key, val + this.get(key));
    }
  }, {
    key: "addSkills",
    value: function addSkills(m) {
      var _iterator = _createForOfIteratorHelper(m),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            k = _step$value[0],
            v = _step$value[1];
          this.add(k, v);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "substract",
    value: function substract(key, val) {
      this.set(key, val + this.get(key));
    }
  }, {
    key: "substractSkills",
    value: function substractSkills(m) {
      var _iterator2 = _createForOfIteratorHelper(m),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
            k = _step2$value[0],
            v = _step2$value[1];
          this.substract(k, v);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "multiply",
    value: function multiply(factor) {
      var _iterator3 = _createForOfIteratorHelper(this),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _step3$value = _slicedToArray(_step3.value, 2),
            k = _step3$value[0],
            v = _step3$value[1];
          this.set(k, v * factor);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }]);
  return EquipmentSkills;
}( /*#__PURE__*/_wrapNativeSuper(Map));
exports.default = EquipmentSkills;
},{}],"../../data-provider/data-provider.module.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _this = this;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var EquipmentSkills_1 = __importDefault(require("./models/equipment/EquipmentSkills"));
var MAX_RARITY = 7;
exports.MAX_RARITY = MAX_RARITY;
var TORSO_UP_ID = 83;
exports.TORSO_UP_ID = TORSO_UP_ID;
var DUMMY_PIECE = {
  name: 'None',
  type: -1,
  defense: {
    base: 0,
    max: 0,
    maxLr: 0
  },
  resistance: [0, 0, 0, 0, 0],
  category: -1,
  slots: 0,
  rarity: 0,
  skills: new EquipmentSkills_1.default(),
  isGeneric: true
};
exports.DUMMY_PIECE = DUMMY_PIECE;
/** fetch from data directory */
var getRawData = function getRawData(url) {
  return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url);
          case 2:
            return _context.abrupt("return", _context.sent.json());
          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
};
/** fetch and parse generic equipment data */
var getDataWithTransformedSkillMap = function getDataWithTransformedSkillMap(url) {
  return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var raw;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getRawData(url);
          case 2:
            raw = _context2.sent;
            return _context2.abrupt("return", raw.map(function (rawX) {
              var skillMap = new EquipmentSkills_1.default();
              for (var x in rawX.skills) {
                var skill = rawX.skills[x];
                skillMap.set(parseInt(x), skill);
              }
              return Object.assign({}, rawX, {
                skills: skillMap
              });
            }));
          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
};
/** get a list of all head armor pieces */
var getHead = function getHead() {
  return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", getDataWithTransformedSkillMap('./head.json'));
          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
};
exports.getHead = getHead;
/** get a list of all chest armor pieces */
var getChest = function getChest() {
  return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", getDataWithTransformedSkillMap('./chest.json'));
          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
};
exports.getChest = getChest;
/** get a list of all arms armor pieces */
var getArms = function getArms() {
  return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", getDataWithTransformedSkillMap('./arms.json'));
          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
};
exports.getArms = getArms;
/** get a list of all waist armor pieces */
var getWaist = function getWaist() {
  return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", getDataWithTransformedSkillMap('./waist.json'));
          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
};
exports.getWaist = getWaist;
/** get a list of all legs armor pieces */
var getLegs = function getLegs() {
  return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", getDataWithTransformedSkillMap('./legs.json'));
          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
};
exports.getLegs = getLegs;
/** get a list of all decorations */
var getDecorations = function getDecorations() {
  return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", getDataWithTransformedSkillMap('./decorations.json'));
          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
};
exports.getDecorations = getDecorations;
/** get a mapping of internal id to name for all skills */
var getSkillNameMap = function getSkillNameMap() {
  return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var raw, map, id;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return getRawData('./skill-names.json');
          case 2:
            raw = _context9.sent;
            map = new Map();
            for (id in raw) {
              map.set(parseInt(id), raw[id]);
            }
            return _context9.abrupt("return", map);
          case 6:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
};
exports.getSkillNameMap = getSkillNameMap;
/** get a list of skill category names, as used in the UI */
var getSkillCategories = function getSkillCategories() {
  return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            return _context10.abrupt("return", getRawData('./skill-categories.json'));
          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
};
exports.getSkillCategories = getSkillCategories;
/** get a mapping of internal id of skill to all activations (positive and negative) of that skill */
var getSkillActivationMap = function getSkillActivationMap() {
  return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
    var raw, map, _loop, id;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return getRawData('./skills.json');
          case 2:
            raw = _context11.sent;
            map = new Map();
            _loop = function _loop(id) {
              var parsedId = parseInt(id);
              map.set(parsedId, raw[id].map(function (activation) {
                return Object.assign({}, activation, {
                  requiredSkill: parsedId
                });
              }));
            };
            for (id in raw) {
              _loop(id);
            }
            return _context11.abrupt("return", map);
          case 7:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
};
exports.getSkillActivationMap = getSkillActivationMap;
},{"./models/equipment/EquipmentSkills":"../../data-provider/models/equipment/EquipmentSkills.ts"}],"../../helper/range.helper.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range = function (start, end) {
  return Array.from({
    length: end - start
  }, function (_, k) {
    return k + start;
  });
};
},{}],"../../data-provider/models/equipment/EquipmentCategory.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-unused-vars */
var EquipmentCategory;
(function (EquipmentCategory) {
  EquipmentCategory[EquipmentCategory["HEAD"] = 0] = "HEAD";
  EquipmentCategory[EquipmentCategory["CHEST"] = 1] = "CHEST";
  EquipmentCategory[EquipmentCategory["ARMS"] = 2] = "ARMS";
  EquipmentCategory[EquipmentCategory["WAIST"] = 3] = "WAIST";
  EquipmentCategory[EquipmentCategory["LEGS"] = 4] = "LEGS";
  EquipmentCategory[EquipmentCategory["CHARM"] = 5] = "CHARM";
  EquipmentCategory[EquipmentCategory["WEAPON"] = 6] = "WEAPON";
})(EquipmentCategory || (EquipmentCategory = {}));
exports.default = EquipmentCategory;
},{}],"../../data-provider/models/user/UserCharmList.ts":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var range_helper_1 = require("../../../helper/range.helper");
var EquipmentCategory_1 = __importDefault(require("../equipment/EquipmentCategory"));
var EquipmentSkills_1 = __importDefault(require("../equipment/EquipmentSkills"));
var UserCharmList = /*#__PURE__*/function () {
  function UserCharmList() {
    _classCallCheck(this, UserCharmList);
    this.list = [];
  }
  _createClass(UserCharmList, [{
    key: "get",
    value: /** get the list of charms */
    function get() {
      return this.list;
    }
    /** adds a given charm to list */
  }, {
    key: "add",
    value: function add(charm) {
      return this.list.push(charm);
    }
    /** removes charm at specified index from list */
  }, {
    key: "remove",
    value: function remove(index) {
      this.list = this.list.filter(function (_, i) {
        return i !== index;
      });
    }
    /** serializes charm list as csv */
  }, {
    key: "serialize",
    value: function serialize(skillNames) {
      return this.list.map(function (charm) {
        var s = [];
        var skillArray = Array.from(charm.skills.entries());
        skillArray.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            sId = _ref2[0],
            sVal = _ref2[1];
          s.push("".concat(skillNames.get(sId), ",").concat(sVal, ","));
        });
        var amountOfSkills = skillArray.length;
        // eslint-disable-next-line no-unused-vars
        for (var _ in range_helper_1.range(amountOfSkills, 2)) {
          s.push(',,');
        }
        s.push("".concat(charm.slots));
        return s.join('');
      }).join('\n');
    }
    /** populate charm list from csv */
  }, {
    key: "deserialize",
    value: function deserialize(csv, skillNames) {
      var newList = [];
      var _iterator = _createForOfIteratorHelper(csv.split('\n')),
        _step;
      try {
        var _loop = function _loop() {
          var charm = _step.value;
          var spl = charm.split(',');
          var slots = parseInt(spl[4]);
          var skills = [[0, 1], [2, 3]].filter(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
              _ = _ref4[0],
              j = _ref4[1];
            return !isNaN(parseInt(spl[j]));
          }).map(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
              i = _ref6[0],
              j = _ref6[1];
            var name = spl[i];
            var id = Array.from(skillNames.entries()).find(function (_ref7) {
              var _ref8 = _slicedToArray(_ref7, 2),
                _ = _ref8[0],
                n = _ref8[1];
              return n === name;
            })[0];
            // build skill model
            var skill = {
              name: name,
              points: parseInt(spl[j]),
              id: id
            };
            return skill;
          });
          var skillMap = new EquipmentSkills_1.default(skills.map(function (skill) {
            return [skill.id, skill.points];
          }));
          var newCharm = {
            name: UserCharmList.getCharmName(skillMap, slots, skillNames),
            category: EquipmentCategory_1.default.CHARM,
            slots: slots,
            rarity: 0,
            skills: skillMap
          };
          newList.push(newCharm);
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.list = newList;
      return newList;
    }
  }], [{
    key: "Instance",
    get: function get() {
      return this._instance || (this._instance = new this());
    }
  }, {
    key: "getCharmName",
    value: function getCharmName(skills, slots, skillNames) {
      var skillStrings = Array.from(skills.entries()).map(function (s) {
        return "".concat(skillNames.get(s[0]), ":").concat(s[1]);
      });
      var slotString = slots !== 0 ? "".concat(slots, " Slots") : '';
      return [].concat(_toConsumableArray(skillStrings), [slotString]).join(' ').trim();
    }
  }]);
  return UserCharmList;
}();
exports.default = UserCharmList;
},{"../../../helper/range.helper":"../../helper/range.helper.ts","../equipment/EquipmentCategory":"../../data-provider/models/equipment/EquipmentCategory.ts","../equipment/EquipmentSkills":"../../data-provider/models/equipment/EquipmentSkills.ts"}],"../../helper/html.helper.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlToElement = function (html) {
  var template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
};
},{}],"../ui/charms.component.ts":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var UserCharmList_1 = __importDefault(require("../../data-provider/models/user/UserCharmList"));
var html_helper_1 = require("../../helper/html.helper");
var EquipmentCategory_1 = __importDefault(require("../../data-provider/models/equipment/EquipmentCategory"));
var range_helper_1 = require("../../helper/range.helper");
var EquipmentSkills_1 = __importDefault(require("../../data-provider/models/equipment/EquipmentSkills"));
var saveToStorage = function saveToStorage(skillNames) {
  window.localStorage.setItem('charms', UserCharmList_1.default.Instance.serialize(skillNames));
};
var getFromStorage = function getFromStorage() {
  return window.localStorage.getItem('charms');
};
var validSkill = function validSkill(id, points) {
  return points !== 0 && id !== -1;
};
var removeTableElement = function removeTableElement(index) {
  var ele = document.getElementsByClassName("charm-".concat(index))[0];
  ele.remove();
};
var populateCharmsFromCSV = function populateCharmsFromCSV(csv, skillNames) {
  UserCharmList_1.default.Instance.deserialize(csv, skillNames);
  UserCharmList_1.default.Instance.get().forEach(function (charm, i) {
    addTableElement(charm, i, skillNames);
  });
};
var purgeTable = function purgeTable() {
  var entries = document.getElementsByClassName('charm-table-ele');
  for (var _i = 0, _Array$from = Array.from(entries); _i < _Array$from.length; _i++) {
    var entry = _Array$from[_i];
    entry.remove();
  }
};
var addTableElement = function addTableElement(charm, index, skillNames) {
  var ele = html_helper_1.htmlToElement("<tr class=\"charm-table-ele charm-".concat(index, "\" data-index=\"").concat(index, "\"></tr>"));
  // get real table elements
  for (var _i2 = 0, _Array$from2 = Array.from(charm.skills.keys()); _i2 < _Array$from2.length; _i2++) {
    var skill = _Array$from2[_i2];
    ele.appendChild(html_helper_1.htmlToElement("<td>".concat(skillNames.get(skill), "</td>")));
    ele.appendChild(html_helper_1.htmlToElement("<td>".concat(charm.skills.get(skill), "</td>")));
  }
  // get placeholder table elements
  var amountOfSkills = Array.from(charm.skills.keys()).length;
  // eslint-disable-next-line no-unused-vars
  for (var _ in range_helper_1.range(amountOfSkills, 2)) {
    ele.appendChild(html_helper_1.htmlToElement('<td></td>'));
    ele.appendChild(html_helper_1.htmlToElement('<td></td>'));
  }
  // get slots and delete
  ele.appendChild(html_helper_1.htmlToElement("<td>".concat(charm.slots, "</td>")));
  var d = html_helper_1.htmlToElement('<td class="charm-delete">X</td>');
  d.addEventListener('click', function () {
    return removeCharm(index, skillNames);
  });
  ele.appendChild(d);
  // add final element
  var tbody = document.getElementById('charm-table').children[0];
  tbody.appendChild(ele);
};
var addCharm = function addCharm(charm, skillNames) {
  var i = UserCharmList_1.default.Instance.add(charm);
  addTableElement(charm, i - 1, skillNames);
  saveToStorage(skillNames);
};
var removeCharm = function removeCharm(index, skillNames) {
  UserCharmList_1.default.Instance.remove(index);
  removeTableElement(index);
  saveToStorage(skillNames);
};
var onExportClick = function onExportClick(skillNames) {
  var str = UserCharmList_1.default.Instance.serialize(skillNames);
  var blob = new Blob([str], {
    type: 'text/plain'
  });
  var a = document.getElementById('charm-download');
  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = 'charms.csv';
  a.click();
};
var onImportClick = function onImportClick(e) {
  e.preventDefault();
  var inp = document.getElementById('charm-upload');
  inp.click();
};
var onFileUploaded = function onFileUploaded(skillNames) {
  var inp = document.getElementById('charm-upload');
  if (!inp.files) {
    return;
  }
  var file = inp.files[0];
  file.text().then(function (text) {
    try {
      UserCharmList_1.default.Instance.deserialize(text, skillNames);
      saveToStorage(skillNames);
      purgeTable();
      UserCharmList_1.default.Instance.get().forEach(function (charm, i) {
        addTableElement(charm, i, skillNames);
      });
    } catch (_a) {
      alert('Could not process file');
    }
  });
};
var onAddClick = function onAddClick(skillNames) {
  // parse data
  var slots = parseInt(document.getElementById('charm-slots').value);
  var skills = [1, 2].map(function (x) {
    return {
      id: parseInt(document.getElementById("charm-skill-".concat(x, "-name")).value),
      points: parseInt(document.getElementById("charm-skill-".concat(x, "-points")).value)
    };
  });
  // return if charm invalid
  if (slots === 0 && !skills.some(function (s) {
    return validSkill(s.id, s.points);
  })) {
    return;
  }
  // map to model
  var skillsMap = new EquipmentSkills_1.default(skills.filter(function (s) {
    return validSkill(s.id, s.points);
  }).map(function (s) {
    return [s.id, s.points];
  }));
  var charm = {
    name: UserCharmList_1.default.getCharmName(skillsMap, slots, skillNames),
    slots: slots,
    category: EquipmentCategory_1.default.CHARM,
    rarity: 0,
    skills: skillsMap
  };
  // add
  addCharm(charm, skillNames);
};
var attachControlListeners = function attachControlListeners(skillNames) {
  document.getElementById('charm-add').addEventListener('click', function () {
    return onAddClick(skillNames);
  });
  document.getElementById('charm-export').addEventListener('click', function () {
    return onExportClick(skillNames);
  });
  document.getElementById('charm-import').addEventListener('click', function (e) {
    return onImportClick(e);
  });
  document.getElementById('charm-upload').addEventListener('change', function () {
    return onFileUploaded(skillNames);
  });
};
var populatePointsPickers = function populatePointsPickers() {
  var pickers = document.getElementsByClassName('charm-points-pick');
  for (var _i3 = 0, _Array$from3 = Array.from(pickers); _i3 < _Array$from3.length; _i3++) {
    var picker = _Array$from3[_i3];
    var _iterator = _createForOfIteratorHelper(range_helper_1.range(-10, 11).reverse()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var amount = _step.value;
        picker.appendChild(html_helper_1.htmlToElement("\n        <option ".concat(amount === 0 ? 'selected="selected"' : '', " value=\"").concat(amount, "\">").concat(amount, "</option>\n      ")));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
};
var populateSkillsPickers = function populateSkillsPickers(skillNames, skillActivation, skillCategories) {
  var pickers = document.getElementsByClassName('charm-skill-pick');
  var _loop = function _loop() {
    var picker = _Array$from4[_i4];
    // make optgroup for each category
    var optGroups = skillCategories.map(function (category, i) {
      return html_helper_1.htmlToElement("\n        <optgroup label=\"".concat(category, "\" data-category=\"").concat(i, "\"></optgroup>\n      "));
    });
    // append skill options to optgroup
    skillActivation.forEach(function (activationList) {
      // continue if skill cant be activated -- Torso Up
      if (activationList.length === 0) {
        return;
      }
      var dummyActivation = activationList[0];
      var category = dummyActivation.category;
      var skill = dummyActivation.requiredSkill;
      var name = skillNames.get(skill);
      var ele = html_helper_1.htmlToElement("\n        <option value=\"".concat(skill, "\" data-skill=\"").concat(skill, "\">").concat(name, "</option>\n      "));
      optGroups[category].appendChild(ele);
    });
    // add default
    optGroups.unshift(html_helper_1.htmlToElement("\n      <option value=\"-1\" data-skill=\"-1\">None</option>\n    "));
    // add elements and select default
    picker.append.apply(picker, _toConsumableArray(optGroups));
    picker.getElementsByTagName('option')[0].selected = true;
  };
  for (var _i4 = 0, _Array$from4 = Array.from(pickers); _i4 < _Array$from4.length; _i4++) {
    _loop();
  }
};
var populateCharmPicker = function populateCharmPicker(skillNames, skillActivation, skillCategories) {
  populatePointsPickers();
  populateSkillsPickers(skillNames, skillActivation, skillCategories);
};
exports.renderCharmPicker = function (skillNames, skillActivation, skillCategories) {
  populateCharmPicker(skillNames, skillActivation, skillCategories);
  attachControlListeners(skillNames);
  var savedCharms = getFromStorage();
  if (savedCharms) {
    populateCharmsFromCSV(savedCharms, skillNames);
  }
};
},{"../../data-provider/models/user/UserCharmList":"../../data-provider/models/user/UserCharmList.ts","../../helper/html.helper":"../../helper/html.helper.ts","../../data-provider/models/equipment/EquipmentCategory":"../../data-provider/models/equipment/EquipmentCategory.ts","../../helper/range.helper":"../../helper/range.helper.ts","../../data-provider/models/equipment/EquipmentSkills":"../../data-provider/models/equipment/EquipmentSkills.ts"}],"../../data-provider/models/user/UserEquipmentSettings.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var EquipmentCategory_1 = __importDefault(require("../equipment/EquipmentCategory"));
var UserEquipmentSettings = /*#__PURE__*/function () {
  function UserEquipmentSettings() {
    var _this = this;
    _classCallCheck(this, UserEquipmentSettings);
    this.pins = [];
    this.exclusions = [];
    var supportedCategoires = [EquipmentCategory_1.default.HEAD, EquipmentCategory_1.default.CHEST, EquipmentCategory_1.default.ARMS, EquipmentCategory_1.default.WAIST, EquipmentCategory_1.default.LEGS];
    supportedCategoires.forEach(function (_) {
      _this.pins.push(undefined);
      _this.exclusions.push([]);
    });
    this.isActive = false;
  }
  _createClass(UserEquipmentSettings, [{
    key: "addPin",
    value: /** pins given equipment to corresponding category */
    function addPin(x) {
      this.pins[x.category] = x;
    }
    /** removes pin of category */
  }, {
    key: "removePin",
    value: function removePin(cat) {
      this.pins[cat] = undefined;
    }
    /** adds given equipment to exclusion list of corresponding category */
  }, {
    key: "addExclusion",
    value: function addExclusion(x) {
      this.exclusions[x.category].push(x);
    }
    /** removes equipment from exclusion list */
  }, {
    key: "removeExclusion",
    value: function removeExclusion(x) {
      var arr = this.exclusions[x.category];
      var index = arr.findIndex(function (y) {
        return y.name === x.name;
      });
      this.exclusions[x.category].splice(index, 1);
    }
    /** returns true if pin is same as given element */
  }, {
    key: "hasPin",
    value: function hasPin(x) {
      if (!x) return false;
      if (x.isGeneric) return false;
      var pin = this.pins[x.category];
      if (!pin) return false;
      return pin.name === x.name;
    }
    /** returns true if piece is already excluded */
  }, {
    key: "hasExclusion",
    value: function hasExclusion(x) {
      return !!this.exclusions[x.category].find(function (y) {
        return y.name === x.name;
      });
    }
    /** serializes settings as json */
  }, {
    key: "serialize",
    value: function serialize() {
      return JSON.stringify({
        pins: this.pins,
        exclusions: this.exclusions
      });
    }
    /** populate settings from json */
  }, {
    key: "deserialize",
    value: function deserialize(raw) {
      var parsed = JSON.parse(raw);
      this.pins = parsed.pins;
      this.exclusions = parsed.exclusions;
    }
  }], [{
    key: "Instance",
    get: function get() {
      return this._instance || (this._instance = new this());
    }
  }]);
  return UserEquipmentSettings;
}();
exports.default = UserEquipmentSettings;
},{"../equipment/EquipmentCategory":"../../data-provider/models/equipment/EquipmentCategory.ts"}],"../ui/eq-settings.component.ts":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var EquipmentCategory_1 = __importDefault(require("../../data-provider/models/equipment/EquipmentCategory"));
var UserEquipmentSettings_1 = __importDefault(require("../../data-provider/models/user/UserEquipmentSettings"));
var html_helper_1 = require("../../helper/html.helper");
var saveToStorage = function saveToStorage() {
  window.localStorage.setItem('eq-settings', UserEquipmentSettings_1.default.Instance.serialize());
};
var getFromStorage = function getFromStorage() {
  return window.localStorage.getItem('eq-settings');
};
var getExclusionElement = function getExclusionElement(x) {
  var root = document.createElement('div');
  root.style.textAlign = 'left';
  root.setAttribute('data-name', x.name);
  root.classList.add('eq-exclusion-ele');
  var content = html_helper_1.htmlToElement("<span>".concat(x.name, "</span>"));
  var remove = html_helper_1.htmlToElement('<span>X</span>');
  remove.addEventListener('click', function () {
    return exports.removeExlusion(x);
  });
  remove.style.marginRight = '1em';
  remove.style.marginLeft = '1em';
  remove.style.cursor = 'pointer';
  root.appendChild(remove);
  root.appendChild(content);
  return root;
};
var getPinPicker = function getPinPicker(cat, eq) {
  var _ref;
  var root = document.createElement('div');
  root.style.textAlign = 'left';
  var content = document.createElement('select');
  content.setAttribute('id', "eq-".concat(cat, "-pin-picker"));
  content.style.width = '72%';
  var _iterator = _createForOfIteratorHelper((_ref = [{
      name: 'None',
      category: cat
    }]).concat.apply(_ref, _toConsumableArray(eq))),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var x = _step.value;
      content.appendChild(html_helper_1.htmlToElement("<option value=\"".concat(x.name, "\">").concat(x.name, "</option>")));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  content.addEventListener('change', function () {
    exports.addPin({
      name: content.value,
      category: cat
    });
  });
  var remove = html_helper_1.htmlToElement('<span>X</span>');
  remove.addEventListener('click', function () {
    return exports.removePin(eq[0].category);
  });
  remove.style.marginRight = '1em';
  remove.style.marginLeft = '1em';
  remove.style.cursor = 'pointer';
  root.appendChild(remove);
  root.appendChild(content);
  return root;
};
var renderColumns = function renderColumns(armor) {
  var parent = document.getElementById('eq-container');
  for (var _i = 0, _arr = [[EquipmentCategory_1.default.HEAD, 'Head', armor[0]], [EquipmentCategory_1.default.CHEST, 'Chest', armor[1]], [EquipmentCategory_1.default.ARMS, 'Arms', armor[2]], [EquipmentCategory_1.default.WAIST, 'Waist', armor[3]], [EquipmentCategory_1.default.LEGS, 'Legs', armor[4]]]; _i < _arr.length; _i++) {
    var item = _arr[_i];
    var cat = item[0];
    var name = item[1];
    var eq = item[2];
    var root = html_helper_1.htmlToElement("<div class=\"eq-column\" data-eq-column-type=\"".concat(cat, "\"></div>"));
    // pins
    var pinHeader = html_helper_1.htmlToElement("<div class=\"eq-column-item eq-column-header\">".concat(name, " Pinned</div>"));
    var pinContent = html_helper_1.htmlToElement('<div class="eq-column-item eq-column-content eq-column-pin"></div>');
    var pinElement = getPinPicker(cat, eq);
    pinContent.appendChild(pinElement);
    // exclusions
    var exclusionHeader = html_helper_1.htmlToElement("<div class=\"eq-column-item eq-column-header\">".concat(name, " Excluded</div>"));
    var exclusionContent = html_helper_1.htmlToElement("<div id=\"eq-".concat(cat, "-exclusion\" class=\"eq-column-item eq-column-content eq-column-exclusion\"></div>"));
    root.appendChild(pinHeader);
    root.appendChild(pinContent);
    root.appendChild(exclusionHeader);
    root.appendChild(exclusionContent);
    parent.appendChild(root);
  }
};
var _addExclusion = function _addExclusion(x) {
  var parent = document.getElementById("eq-".concat(x.category, "-exclusion"));
  parent.appendChild(getExclusionElement(x));
};
exports.removeExlusion = function (x) {
  var ele = Array.from(document.getElementsByClassName('eq-exclusion-ele')).find(function (a) {
    var b = a;
    return b.getAttribute('data-name') === x.name;
  });
  if (!ele) return;
  ele.remove();
  UserEquipmentSettings_1.default.Instance.removeExclusion(x);
  saveToStorage();
};
exports.removePin = function (cat) {
  var ele = document.getElementById("eq-".concat(cat, "-pin-picker"));
  UserEquipmentSettings_1.default.Instance.removePin(cat);
  ele.selectedIndex = 0;
  saveToStorage();
};
exports.addExclusion = function (x) {
  if (UserEquipmentSettings_1.default.Instance.hasExclusion(x)) return;
  UserEquipmentSettings_1.default.Instance.addExclusion(x);
  _addExclusion(x);
  saveToStorage();
};
exports.addPin = function (x) {
  if (x.name === 'None') {
    UserEquipmentSettings_1.default.Instance.removePin(x.category);
    saveToStorage();
    return;
  }
  UserEquipmentSettings_1.default.Instance.addPin(x);
  saveToStorage();
  var select = document.getElementById("eq-".concat(x.category, "-pin-picker"));
  select.value = x.name;
};
exports.renderEqSettings = function (armor) {
  renderColumns(armor);
  var raw = getFromStorage();
  if (raw) UserEquipmentSettings_1.default.Instance.deserialize(raw);
  var _iterator2 = _createForOfIteratorHelper(UserEquipmentSettings_1.default.Instance.exclusions),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var exclusionList = _step2.value;
      var _iterator3 = _createForOfIteratorHelper(exclusionList),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var x = _step3.value;
          _addExclusion(x);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  UserEquipmentSettings_1.default.Instance.pins.forEach(function (x, i) {
    if (x) exports.addPin(x);else exports.removePin(i);
  });
};
},{"../../data-provider/models/equipment/EquipmentCategory":"../../data-provider/models/equipment/EquipmentCategory.ts","../../data-provider/models/user/UserEquipmentSettings":"../../data-provider/models/user/UserEquipmentSettings.ts","../../helper/html.helper":"../../helper/html.helper.ts"}],"../ui/navbar.component.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var onMouseEnter = function onMouseEnter(ele) {
  if (!ele.classList.contains('navbar-selected')) {
    ele.classList.add('navbar-hover');
  }
};
var onMouseLeave = function onMouseLeave(ele) {
  ele.classList.remove('navbar-hover');
};
var onClick = function onClick(parent, ele) {
  for (var _i = 0, _Array$from = Array.from(parent.children); _i < _Array$from.length; _i++) {
    var li = _Array$from[_i];
    li.classList.remove('navbar-selected');
    li.classList.remove('navbar-hover');
  }
  ele.classList.add('navbar-selected');
  var selection = ele.getAttribute('data-selection');
  var panels = document.getElementsByClassName('panel');
  for (var _i2 = 0, _Array$from2 = Array.from(panels); _i2 < _Array$from2.length; _i2++) {
    var panel = _Array$from2[_i2];
    var panelNumber = panel.getAttribute('data-panel-number');
    if (selection === panelNumber) {
      panel.classList.remove('hidden');
    } else {
      panel.classList.add('hidden');
    }
  }
};
/** initiate navbar state and attaches handlers */
exports.initiateNavbar = function () {
  var ul = document.getElementById('navbar-container').children[0];
  var _loop = function _loop() {
    var li = _Array$from3[_i3];
    li.addEventListener('mouseenter', function () {
      return onMouseEnter(li);
    });
    li.addEventListener('mouseleave', function () {
      return onMouseLeave(li);
    });
    li.addEventListener('click', function () {
      return onClick(ul, li);
    });
  };
  for (var _i3 = 0, _Array$from3 = Array.from(ul.children); _i3 < _Array$from3.length; _i3++) {
    _loop();
  }
  onClick(ul, ul.children[0]);
};
},{}],"../ui/picker.component.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var html_helper_1 = require("../../helper/html.helper");
var getActivationElements = function getActivationElements() {
  return Array.from(document.getElementsByClassName('search-picker-activation'));
};
/** uncheck all selected skill activations */
var resetSkillActivations = function resetSkillActivations() {
  var activations = getActivationElements();
  activations.forEach(function (element) {
    var checkbox = element.children[0];
    var text = element.children[1];
    checkbox.checked = false;
    text.classList.remove('highlighted');
  });
};
exports.resetSkillActivations = resetSkillActivations;
/** get list of currently selected skill activations */
var getSkillActivations = function getSkillActivations() {
  var activations = getActivationElements();
  return activations
  // get only checked skills
  .filter(function (element) {
    var checkbox = element.children[0];
    return checkbox.checked;
  })
  // map to proper data model
  .map(function (element) {
    var name = element.textContent.trim();
    var id = parseInt(element.getAttribute('data-id'));
    var requiredSkill = parseInt(element.getAttribute('data-skill'));
    var requiredPoints = parseInt(element.getAttribute('data-points'));
    var category = parseInt(element.parentElement.getAttribute('data-category'));
    return {
      id: id,
      name: name,
      requiredPoints: requiredPoints,
      requiredSkill: requiredSkill,
      isPositive: requiredPoints > 0,
      category: category
    };
  });
};
exports.getSkillActivations = getSkillActivations;
var renderCategories = function renderCategories(skillCategories) {
  for (var index in skillCategories) {
    var categoryName = skillCategories[index];
    var node = html_helper_1.htmlToElement("\n      <div class=\"search-picker-category\" id=\"search-picker-category-".concat(index, "\" data-category=\"").concat(index, "\">\n        <div class=\"search-picker-category-title banner\">").concat(categoryName, "</div>\n      </div>\n    "));
    document.getElementById('search-skill-picker').appendChild(node);
  }
};
var renderActivations = function renderActivations(skillActivation) {
  skillActivation.forEach(function (activationList) {
    activationList.filter(function (activation) {
      return activation.isPositive;
    }).reverse().forEach(function (activation) {
      var node = html_helper_1.htmlToElement("\n          <div class=\"search-picker-activation\" data-skill=\"".concat(activation.requiredSkill, "\" data-points=\"").concat(activation.requiredPoints, "\" data-id=\"").concat(activation.id, "\">\n            <input style=\"float:left;\" type=\"checkbox\">\n            <div class=\"search-picker-activation-name\">").concat(activation.name, "</div>\n          </div>\n        "));
      document.getElementById("search-picker-category-".concat(activation.category)).appendChild(node);
    });
  });
};
var attachClickListener = function attachClickListener() {
  var elements = Array.from(document.getElementsByClassName('search-picker-activation'));
  var _loop = function _loop() {
    var item = _elements[_i];
    item.addEventListener('click', function (event) {
      // tick checkbox
      var target = event.target;
      var input = item.children[0];
      if (target.tagName !== 'INPUT') {
        input.checked = !input.checked;
      }
      // add highlight class
      var text = item.children[1];
      input.checked ? text.classList.add('highlighted') : text.classList.remove('highlighted');
    });
  };
  for (var _i = 0, _elements = elements; _i < _elements.length; _i++) {
    _loop();
  }
};
/** render all components of skillpicker and attach handlers */
var renderSkillPicker = function renderSkillPicker(skillActivation, skillCategories) {
  renderCategories(skillCategories);
  renderActivations(skillActivation);
  attachClickListener();
};
exports.renderSkillPicker = renderSkillPicker;
},{"../../helper/html.helper":"../../helper/html.helper.ts"}],"../../scorer/models/ArmorEvaluation.ts":[function(require,module,exports) {
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var data_provider_module_1 = require("../../data-provider/data-provider.module");
var EquipmentCategory_1 = __importDefault(require("../../data-provider/models/equipment/EquipmentCategory"));
var EquipmentSkills_1 = __importDefault(require("../../data-provider/models/equipment/EquipmentSkills"));
var ArmorEvaluation = /*#__PURE__*/function () {
  function ArmorEvaluation(equipment, skills, score, totalSlots, torsoUp) {
    _classCallCheck(this, ArmorEvaluation);
    this.skills = new EquipmentSkills_1.default();
    this.score = 0;
    this.totalSlots = 0;
    this.torsoUp = 0;
    this.equipment = equipment;
    if (skills) this.skills = skills;
    if (score) this.score = score;
    if (totalSlots) this.totalSlots = totalSlots;
    if (torsoUp) this.torsoUp = torsoUp;
  }
  _createClass(ArmorEvaluation, [{
    key: "getSlots",
    value: function getSlots() {
      return this.equipment.map(function (x) {
        return x.slots;
      }).filter(function (x) {
        return x > 0;
      });
    }
  }, {
    key: "getSlotsExceptChest",
    value: function getSlotsExceptChest() {
      return this.equipment.filter(function (x) {
        return x.category !== EquipmentCategory_1.default.CHEST;
      }).map(function (x) {
        return x.slots;
      }).filter(function (x) {
        return x > 0;
      });
    }
  }, {
    key: "copy",
    value: function copy() {
      return new ArmorEvaluation(this.equipment.map(function (x) {
        return x;
      }), new EquipmentSkills_1.default(this.skills), this.score, this.totalSlots, this.torsoUp);
    }
  }, {
    key: "addPiece",
    value: function addPiece(piece) {
      if (piece.skills.has(data_provider_module_1.TORSO_UP_ID)) this.torsoUp++;else {
        if (piece.category === EquipmentCategory_1.default.CHEST && this.torsoUp > 0) {
          var _iterator = _createForOfIteratorHelper(piece.skills),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _step$value = _slicedToArray(_step.value, 2),
                k = _step$value[0],
                v = _step$value[1];
              this.skills.add(k, v * (this.torsoUp + 1));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else {
          this.skills.addSkills(piece.skills);
        }
      }
      this.equipment[piece.category] = piece;
      this.score = this.score + piece.score;
      this.totalSlots = this.totalSlots + piece.slots;
    }
  }]);
  return ArmorEvaluation;
}();
exports.default = ArmorEvaluation;
},{"../../data-provider/data-provider.module":"../../data-provider/data-provider.module.ts","../../data-provider/models/equipment/EquipmentCategory":"../../data-provider/models/equipment/EquipmentCategory.ts","../../data-provider/models/equipment/EquipmentSkills":"../../data-provider/models/equipment/EquipmentSkills.ts"}],"../../searcher/models/ArmorSet.ts":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var EquipmentSkills_1 = __importDefault(require("../../data-provider/models/equipment/EquipmentSkills"));
var EquipmentCategory_1 = __importDefault(require("../../data-provider/models/equipment/EquipmentCategory"));
var ArmorSet = /*#__PURE__*/function () {
  function ArmorSet(armorEval, decoEval, skillActivations) {
    _classCallCheck(this, ArmorSet);
    var chest = armorEval.equipment[EquipmentCategory_1.default.CHEST];
    this.chest = armorEval.torsoUp > 0 ? ArmorSet.applyTorsoUpToChest(chest, armorEval.torsoUp) : chest;
    this.head = armorEval.equipment[EquipmentCategory_1.default.HEAD];
    this.arms = armorEval.equipment[EquipmentCategory_1.default.ARMS];
    this.waist = armorEval.equipment[EquipmentCategory_1.default.WAIST];
    this.legs = armorEval.equipment[EquipmentCategory_1.default.LEGS];
    this.charm = armorEval.equipment[EquipmentCategory_1.default.CHARM];
    this.decos = decoEval.decos;
    this.evaluation = this.evaluate(armorEval, decoEval, skillActivations);
  }
  _createClass(ArmorSet, [{
    key: "getPieces",
    value: function getPieces() {
      return [this.head, this.chest, this.arms, this.waist, this.legs];
    }
  }, {
    key: "evaluate",
    value: function evaluate(armorEval, decoEval, activations) {
      var totalDefense = {
        base: 0,
        max: 0
      };
      var totalResistance = [0, 0, 0, 0, 0];
      // iterate over all armor pieces
      var _iterator = _createForOfIteratorHelper(this.getPieces()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var piece = _step.value;
          totalDefense.base += piece.defense.base;
          totalDefense.max += piece.defense.max;
          totalResistance = piece.resistance.map(function (res, i) {
            return res + totalResistance[i];
          });
        }
        // get total skills
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var decoSkills = new EquipmentSkills_1.default();
      decoEval.decos.forEach(function (d) {
        return decoSkills.addSkills(d.skills);
      });
      var skills = new EquipmentSkills_1.default(armorEval.skills);
      skills.addSkills(new EquipmentSkills_1.default(decoSkills));
      // get activations
      var a = [];
      var _iterator2 = _createForOfIteratorHelper(skills),
        _step2;
      try {
        var _loop = function _loop() {
          var _step2$value = _slicedToArray(_step2.value, 2),
            sId = _step2$value[0],
            sVal = _step2$value[1];
          if (Math.abs(sVal) < 10) {
            return "continue";
          }
          var activationsOfSkill = activations.get(sId).filter(function (act) {
            return act.isPositive ? sVal >= act.requiredPoints : sVal <= act.requiredPoints;
          });
          a.push.apply(a, _toConsumableArray(activationsOfSkill));
        };
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _ret = _loop();
          if (_ret === "continue") continue;
        }
        // build, save and return model
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var thisEval = {
        defense: totalDefense,
        resistance: totalResistance,
        activations: a,
        skills: skills,
        torsoUp: armorEval.torsoUp
      };
      this.evaluation = thisEval;
      return thisEval;
    }
  }], [{
    key: "applyTorsoUpToChest",
    value: function applyTorsoUpToChest(chest, torsoUp) {
      var newSkills = new EquipmentSkills_1.default(chest.skills);
      newSkills.multiply(torsoUp + 1);
      return Object.assign({}, chest, {
        skills: newSkills
      });
    }
  }]);
  return ArmorSet;
}();
exports.default = ArmorSet;
},{"../../data-provider/models/equipment/EquipmentSkills":"../../data-provider/models/equipment/EquipmentSkills.ts","../../data-provider/models/equipment/EquipmentCategory":"../../data-provider/models/equipment/EquipmentCategory.ts"}],"../../data-provider/models/equipment/ArmorType.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-unused-vars */
var ArmorType;
(function (ArmorType) {
  ArmorType[ArmorType["ALL"] = 0] = "ALL";
  ArmorType[ArmorType["BLADEMASTER"] = 1] = "BLADEMASTER";
  ArmorType[ArmorType["GUNNER"] = 2] = "GUNNER";
})(ArmorType || (ArmorType = {}));
exports.default = ArmorType;
},{}],"../../data-filter/data-filter.module.ts":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var data_provider_module_1 = require("../data-provider/data-provider.module");
var ArmorType_1 = __importDefault(require("../data-provider/models/equipment/ArmorType"));
var EquipmentCategory_1 = __importDefault(require("../data-provider/models/equipment/EquipmentCategory"));
var EquipmentSkills_1 = __importDefault(require("../data-provider/models/equipment/EquipmentSkills"));
var filterType = function filterType(piece, type) {
  return piece.type === ArmorType_1.default.ALL || piece.type === type;
};
exports.filterType = filterType;
var filterExclusions = function filterExclusions(piece, exclusionNames) {
  return !exclusionNames.includes(piece.name);
};
var filterRarity = function filterRarity(item, rarity) {
  return item.rarity <= rarity;
};
exports.filterRarity = filterRarity;
var filterHasSkill = function filterHasSkill(item, desiredSkills) {
  return desiredSkills.some(function (act) {
    var s = item.skills.get(act.requiredSkill);
    return s && s > 0;
  });
};
exports.filterHasSkill = filterHasSkill;
var applyRarityFilter = function applyRarityFilter(items, rarity) {
  if (rarity === data_provider_module_1.MAX_RARITY) return items;
  return items.filter(function (x) {
    return filterRarity(x, rarity);
  });
};
exports.applyRarityFilter = applyRarityFilter;
var applyCharmFilter = function applyCharmFilter(charms, skills) {
  var _charms$filter;
  // find generic slot charms
  var genericSlotCharms = [];
  var _loop = function _loop() {
    var slots = _arr[_i];
    var x = charms.find(function (c) {
      return c.slots === slots;
    });
    if (x) {
      var newC = {
        name: "".concat(slots, " Slot Charm"),
        slots: slots,
        category: EquipmentCategory_1.default.CHARM,
        rarity: 0,
        skills: new EquipmentSkills_1.default()
      };
      genericSlotCharms.push(newC);
    }
  };
  for (var _i = 0, _arr = [3, 2, 1]; _i < _arr.length; _i++) {
    _loop();
  }
  // build list of charms with wanted skills or with slots
  var result = (_charms$filter = charms.filter(function (x) {
    return filterHasSkill(x, skills);
  })).concat.apply(_charms$filter, genericSlotCharms);
  // return list with dummy charm if there are no pieces
  if (result.length === 0) {
    return [Object.assign({}, data_provider_module_1.DUMMY_PIECE, {
      category: EquipmentCategory_1.default.CHARM
    })];
  }
  return result;
};
exports.applyCharmFilter = applyCharmFilter;
var applyArmorFilter = function applyArmorFilter(pieces, rarity, type, category, pin, exclusions, skills) {
  var _sorted$filter$concat, _sorted$filter;
  if (pin) return [pieces.find(function (x) {
    return x.name === pin.name;
  })];
  var excludedNames = exclusions.map(function (e) {
    return e.name;
  });
  var rarityFiltered = applyRarityFilter(pieces, rarity);
  var typeFiltered = rarityFiltered.filter(function (p) {
    return filterType(p, type);
  });
  var exclusionFiltered = typeFiltered.filter(function (p) {
    return filterExclusions(p, excludedNames);
  });
  var sorted = exclusionFiltered.sort(function (a, b) {
    return b.defense.max - a.defense.max;
  });
  // find generic slot pieces with highest defense
  var genericSlotPieces = [];
  var _loop2 = function _loop2() {
    var slots = _arr2[_i2];
    var x = sorted.find(function (p) {
      return p.slots === slots;
    });
    if (x) {
      var p = {
        type: x.type,
        defense: x.defense,
        resistance: x.resistance,
        name: "".concat(slots, " Slot Piece"),
        slots: slots,
        category: x.category,
        rarity: x.rarity,
        skills: new EquipmentSkills_1.default(),
        isGeneric: true
      };
      if (filterExclusions(p, excludedNames)) genericSlotPieces.push(p);
    }
  };
  for (var _i2 = 0, _arr2 = [3, 2, 1]; _i2 < _arr2.length; _i2++) {
    _loop2();
  }
  // find piece with torso up with highest defense
  var torsoUpPieces = [sorted.find(function (p) {
    return p.skills.has(data_provider_module_1.TORSO_UP_ID);
  })].filter(function (x) {
    return x !== undefined;
  }).map(function (x) {
    var renamed = Object.assign({}, x, {
      name: 'Torso Up Piece',
      isGeneric: true
    });
    return renamed;
  }).filter(function (x) {
    return filterExclusions(x, excludedNames);
  });
  // build list of pieces with wanted skills, with slots, or with torso up
  var result = (_sorted$filter$concat = (_sorted$filter = sorted.filter(function (x) {
    return filterHasSkill(x, skills);
  })).concat.apply(_sorted$filter, genericSlotPieces)).concat.apply(_sorted$filter$concat, _toConsumableArray(torsoUpPieces));
  // return list with dummy element if there are no pieces
  if (result.length === 0) {
    return [Object.assign({}, data_provider_module_1.DUMMY_PIECE, {
      type: type,
      category: category
    })];
  }
  return result;
};
exports.applyArmorFilter = applyArmorFilter;
},{"../data-provider/data-provider.module":"../../data-provider/data-provider.module.ts","../data-provider/models/equipment/ArmorType":"../../data-provider/models/equipment/ArmorType.ts","../data-provider/models/equipment/EquipmentCategory":"../../data-provider/models/equipment/EquipmentCategory.ts","../data-provider/models/equipment/EquipmentSkills":"../../data-provider/models/equipment/EquipmentSkills.ts"}],"../../scorer/scorer.module.ts":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var data_provider_module_1 = require("../data-provider/data-provider.module");
var EquipmentSkills_1 = __importDefault(require("../data-provider/models/equipment/EquipmentSkills"));
/** get score of a skill map relative to wanted skills */
var getScoreFromSkillMap = function getScoreFromSkillMap(m, w) {
  var score = 0;
  var _iterator = _createForOfIteratorHelper(w),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 1),
        sId = _step$value[0];
      score += m.get(sId) || 0;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return score;
};
exports.getScoreFromSkillMap = getScoreFromSkillMap;
var scoreTorsoUpPieces = function scoreTorsoUpPieces(piece, maxTorsoScore) {
  if (piece.skills.has(data_provider_module_1.TORSO_UP_ID)) {
    var newPiece = Object.assign({}, piece, {
      score: maxTorsoScore
    });
    return newPiece;
  }
  return piece;
};
exports.scoreTorsoUpPieces = scoreTorsoUpPieces;
/** apply score to a list of decos */
var evaluateListOfDecos = function evaluateListOfDecos(decos, wantedSkills) {
  var skillMap = new EquipmentSkills_1.default();
  decos.forEach(function (deco) {
    return skillMap.addSkills(deco.skills);
  });
  // get max of default and computed score
  // default score can only be higher than computed when the decos of 2 wanted skills cancel each other out (e.g. handicraft and sharpness)
  var computedScore = getScoreFromSkillMap(skillMap, wantedSkills);
  var defaultScore = Math.max.apply(Math, _toConsumableArray(Array.from(skillMap.values())));
  var score = Math.max(computedScore, defaultScore);
  return {
    skills: skillMap,
    decos: decos,
    score: score
  };
};
exports.evaluateListOfDecos = evaluateListOfDecos;
/**
 * checks if deco permutation is the same or better than comparison in respect to wanted skills
 * returns 0 if better/different, returns 1 if same, returns 2 if worse
 */
var decoPermWorseOrSameAsComparison = function decoPermWorseOrSameAsComparison(perm, comparison, wantedSkills) {
  var arr = [];
  for (var _i2 = 0, _Array$from = Array.from(wantedSkills.entries()); _i2 < _Array$from.length; _i2++) {
    var w = _Array$from[_i2];
    var wId = w[0];
    var a = perm.skills.get(wId);
    var b = comparison.skills.get(wId);
    if (a > b) return 0;
    if (a === b) arr.push(1);else arr.push(2);
  }
  return Math.max.apply(Math, arr);
};
exports.decoPermWorseOrSameAsComparison = decoPermWorseOrSameAsComparison;
/** returns a mapping of slot level to the amount of score it is worth */
var getDecoSlotScoreMap = function getDecoSlotScoreMap(decoPermutationsPerSlotLevel) {
  var m = new Map(Array.from(decoPermutationsPerSlotLevel.entries()).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      slotLevel = _ref2[0],
      permList = _ref2[1];
    return [slotLevel, Math.max.apply(Math, _toConsumableArray(permList.map(function (x) {
      return x.score;
    })))];
  }));
  m.set(0, 0);
  return m;
};
exports.getDecoSlotScoreMap = getDecoSlotScoreMap;
/** prune a list of deco permutations of all duplicates and downgrades */
var pruneDecoPermutations = function pruneDecoPermutations(permList, wantedSkills) {
  // we go through entire list left through right => x
  // for each ele, we check the entire list again => y
  // if y is an upgrade of x, then x will be filtered out
  // if y is the same as x, and y is further right in the list, then x will be filtered
  // only if x has no upgrade, and no element right of it that is the same will it remain in the list
  var res = permList.filter(function (x, i) {
    var shouldBeFiltered = false;
    for (var j = 0; j < permList.length; j++) {
      if (i === j) continue;
      var y = permList[j];
      var v = decoPermWorseOrSameAsComparison(x, y, wantedSkills);
      if (v === 2) {
        shouldBeFiltered = true;
        break;
      }
      if (j > i && v === 1) {
        shouldBeFiltered = true;
        break;
      }
    }
    return !shouldBeFiltered;
  });
  return res;
};
exports.pruneDecoPermutations = pruneDecoPermutations;
},{"../data-provider/data-provider.module":"../../data-provider/data-provider.module.ts","../data-provider/models/equipment/EquipmentSkills":"../../data-provider/models/equipment/EquipmentSkills.ts"}],"../../scorer/models/DecoEvaluation.ts":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var EquipmentSkills_1 = __importDefault(require("../../data-provider/models/equipment/EquipmentSkills"));
var DecoEvaluation = /*#__PURE__*/function () {
  function DecoEvaluation(decoMinSlotMap, unusedSlotsSum, missingSkills, decos, requiredSlots) {
    _classCallCheck(this, DecoEvaluation);
    this.decos = [];
    this.requiredSlots = 0;
    this.decoMinSlotMap = decoMinSlotMap;
    this.unusedSlotsSum = unusedSlotsSum;
    this.missingSkills = missingSkills;
    if (decos) this.decos = decos;
    this.requiredSlots = requiredSlots || this.calculateRequiredSlots();
  }
  _createClass(DecoEvaluation, [{
    key: "copy",
    value: function copy() {
      return new DecoEvaluation(this.decoMinSlotMap, this.unusedSlotsSum, new EquipmentSkills_1.default(this.missingSkills), this.decos.map(function (x) {
        return x;
      }), this.requiredSlots);
    }
  }, {
    key: "calculateRequiredSlots",
    value: function calculateRequiredSlots() {
      var newRequiredSlots = 0;
      var _iterator = _createForOfIteratorHelper(this.missingSkills),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var w = _step.value;
          var sId = w[0];
          var sVal = w[1];
          newRequiredSlots += this.decoMinSlotMap.getMinRequiredSlotsForSkill(sId, sVal);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.requiredSlots = newRequiredSlots;
      return newRequiredSlots;
    }
  }, {
    key: "addPerm",
    value: function addPerm(perm, slotLevel) {
      var _this$decos;
      this.unusedSlotsSum -= slotLevel;
      (_this$decos = this.decos).push.apply(_this$decos, _toConsumableArray(perm.decos));
      // use custom loop instead of EquipmentSkills.substractSkills and DecoEvaluation.calculateRequiredSlots
      // to save on processing because this method is called a lot
      var newRequiredSlots = 0;
      var _iterator2 = _createForOfIteratorHelper(this.missingSkills),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var w = _step2.value;
          var sId = w[0];
          var sVal = w[1];
          var newVal = sVal - perm.skills.get(sId);
          this.missingSkills.set(sId, newVal);
          newRequiredSlots += this.decoMinSlotMap.getMinRequiredSlotsForSkill(sId, newVal);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      this.requiredSlots = newRequiredSlots;
    }
  }]);
  return DecoEvaluation;
}();
exports.default = DecoEvaluation;
},{"../../data-provider/models/equipment/EquipmentSkills":"../../data-provider/models/equipment/EquipmentSkills.ts"}],"../../scorer/models/DecoMinSlotMap.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
var _marked = /*#__PURE__*/_regeneratorRuntime().mark(decoVariationMinSlotsGenerator);
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
Object.defineProperty(exports, "__esModule", {
  value: true
});
function decoVariationMinSlotsGenerator(decosOfSkill, skillId, requiredPoints, requiredSlots, existingPoints) {
  var _iterator, _step, deco, newExistingPoints, newRequiredSlots;
  return _regeneratorRuntime().wrap(function decoVariationMinSlotsGenerator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _iterator = _createForOfIteratorHelper(decosOfSkill);
          _context.prev = 1;
          _iterator.s();
        case 3:
          if ((_step = _iterator.n()).done) {
            _context.next = 15;
            break;
          }
          deco = _step.value;
          newExistingPoints = existingPoints + deco.skills.get(skillId);
          newRequiredSlots = requiredSlots + deco.requiredSlots;
          if (!(newExistingPoints >= requiredPoints)) {
            _context.next = 12;
            break;
          }
          _context.next = 10;
          return newRequiredSlots;
        case 10:
          _context.next = 13;
          break;
        case 12:
          return _context.delegateYield(decoVariationMinSlotsGenerator(decosOfSkill, skillId, requiredPoints, newRequiredSlots, newExistingPoints), "t0", 13);
        case 13:
          _context.next = 3;
          break;
        case 15:
          _context.next = 20;
          break;
        case 17:
          _context.prev = 17;
          _context.t1 = _context["catch"](1);
          _iterator.e(_context.t1);
        case 20:
          _context.prev = 20;
          _iterator.f();
          return _context.finish(20);
        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 17, 20, 23]]);
}
/** calculates and saves how many slots are required to get x points of a certain skill */
var DecoMinSlotMap = /*#__PURE__*/function () {
  function DecoMinSlotMap(allDecos, wantedSkills) {
    var _this = this;
    _classCallCheck(this, DecoMinSlotMap);
    this.decorationsOfSkillMap = new Map();
    this.calculations = new Map();
    var _iterator2 = _createForOfIteratorHelper(wantedSkills),
      _step2;
    try {
      var _loop = function _loop() {
        var w = _step2.value;
        var sId = w[0];
        // set decorations of skill
        var decosOfSkill = allDecos.filter(function (x) {
          return x.skills.get(sId) > 0;
        }).sort(function (a, b) {
          return b.skills.get(sId) - a.skills.get(sId);
        });
        _this.decorationsOfSkillMap.set(sId, decosOfSkill);
        // init calculation map of that skill
        _this.calculations.set(sId, new Map());
      };
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  _createClass(DecoMinSlotMap, [{
    key: "calculateMinRequiredSlots",
    value: function calculateMinRequiredSlots(skillId, skillPoints) {
      var decosOfSkill = this.decorationsOfSkillMap.get(skillId);
      if (decosOfSkill.length === 0) return DecoMinSlotMap.DUMMY_SCORE;
      var minRequiredSlots = DecoMinSlotMap.DUMMY_SCORE;
      var _iterator3 = _createForOfIteratorHelper(decoVariationMinSlotsGenerator(decosOfSkill, skillId, skillPoints, 0, 0)),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var reqSlots = _step3.value;
          if (reqSlots < minRequiredSlots) minRequiredSlots = reqSlots;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return minRequiredSlots;
    }
  }, {
    key: "getMinRequiredSlotsForSkill",
    value: function getMinRequiredSlotsForSkill(skillId, skillPoints) {
      var m = this.calculations.get(skillId);
      if (skillPoints <= 0) return 0;
      if (m.has(skillPoints)) return m.get(skillPoints);
      var newCalc = this.calculateMinRequiredSlots(skillId, skillPoints);
      m.set(skillPoints, newCalc);
      return newCalc;
    }
  }]);
  return DecoMinSlotMap;
}();
DecoMinSlotMap.DUMMY_SCORE = 1000;
exports.default = DecoMinSlotMap;
},{}],"../../searcher/searcher.module.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
var _marked = /*#__PURE__*/_regeneratorRuntime().mark(getArmorPermutations),
  _marked2 = /*#__PURE__*/_regeneratorRuntime().mark(getDecoPermutations);
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var data_provider_module_1 = require("../data-provider/data-provider.module");
var EquipmentCategory_1 = __importDefault(require("../data-provider/models/equipment/EquipmentCategory"));
var EquipmentSkills_1 = __importDefault(require("../data-provider/models/equipment/EquipmentSkills"));
var ArmorEvaluation_1 = __importDefault(require("../scorer/models/ArmorEvaluation"));
var ArmorSet_1 = __importDefault(require("./models/ArmorSet"));
var data_filter_module_1 = require("../data-filter/data-filter.module");
var scorer_module_1 = require("../scorer/scorer.module");
var DecoEvaluation_1 = __importDefault(require("../scorer/models/DecoEvaluation"));
var DecoMinSlotMap_1 = __importDefault(require("../scorer/models/DecoMinSlotMap"));
// #region initial search data
/** get initial armor eval with all dummy pieces */
var getIntiailArmorEval = function getIntiailArmorEval(type) {
  var categoryArray = [EquipmentCategory_1.default.HEAD, EquipmentCategory_1.default.CHEST, EquipmentCategory_1.default.ARMS, EquipmentCategory_1.default.WAIST, EquipmentCategory_1.default.LEGS, EquipmentCategory_1.default.CHARM];
  var pieces = categoryArray.map(function (x) {
    return Object.assign({}, data_provider_module_1.DUMMY_PIECE, {
      type: type,
      category: x,
      score: 0
    });
  });
  return new ArmorEvaluation_1.default(pieces);
};
/** returns all the ways you can possibly arrange the viable decorations on a given slot level (1, 2, 3) */
var getDecorationVariationsPerSlotLevel = function getDecorationVariationsPerSlotLevel(decorations, wantedSkills) {
  // get all decorations of specific slot
  var rawOneSlots = decorations.filter(function (d) {
    return d.requiredSlots === 1;
  });
  var rawTwoSlots = decorations.filter(function (d) {
    return d.requiredSlots === 2;
  });
  var rawThreeSlots = decorations.filter(function (d) {
    return d.requiredSlots === 3;
  });
  // create dummy for unused slots
  var dummy = {
    name: 'None',
    rarity: 0,
    requiredSlots: 0,
    skills: new EquipmentSkills_1.default()
  };
  // get all variations for 1 slot
  var oneSlotVariations = rawOneSlots.map(function (x) {
    return [x];
  }).concat([[dummy]]);
  var oneSlotEvaluated = scorer_module_1.pruneDecoPermutations(oneSlotVariations.map(function (x) {
    return scorer_module_1.evaluateListOfDecos(x, wantedSkills);
  }), wantedSkills);
  var prunedOneSlotVariations = oneSlotEvaluated.map(function (x) {
    return x.decos;
  });
  // get all variations for 2 slots
  var twoOneSlotDecoVariations = [];
  for (var i = 0; i < prunedOneSlotVariations.length; i++) {
    var x = prunedOneSlotVariations[i];
    for (var j = Math.abs(i); j < prunedOneSlotVariations.length; j++) {
      var y = prunedOneSlotVariations[j];
      twoOneSlotDecoVariations.push(x.concat(y));
    }
  }
  var twoSlotVariations = rawTwoSlots.map(function (x) {
    return [x];
  }).concat(twoOneSlotDecoVariations);
  var twoSlotEvaluated = scorer_module_1.pruneDecoPermutations(twoSlotVariations.map(function (x) {
    return scorer_module_1.evaluateListOfDecos(x, wantedSkills);
  }), wantedSkills);
  // get all variations for 3 slots
  var threeOneSlotDecoVariations = [];
  for (var _i = 0; _i < prunedOneSlotVariations.length; _i++) {
    var _x = prunedOneSlotVariations[_i];
    for (var _j = Math.abs(_i); _j < twoOneSlotDecoVariations.length; _j++) {
      var _y = twoOneSlotDecoVariations[_j];
      threeOneSlotDecoVariations.push(_x.concat(_y));
    }
  }
  var oneAndTwoSlotDecoVariations = [];
  var _iterator = _createForOfIteratorHelper(rawOneSlots),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var oneSlot = _step.value;
      var _iterator2 = _createForOfIteratorHelper(rawTwoSlots),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var twoSlot = _step2.value;
          oneAndTwoSlotDecoVariations.push([oneSlot, twoSlot]);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var threeSlotVariations = rawThreeSlots.map(function (x) {
    return [x];
  }).concat(oneAndTwoSlotDecoVariations).concat(threeOneSlotDecoVariations);
  var threeSlotEvaluated = scorer_module_1.pruneDecoPermutations(threeSlotVariations.map(function (x) {
    return scorer_module_1.evaluateListOfDecos(x, wantedSkills);
  }), wantedSkills);
  // return pruned evaluations
  return new Map([[0, []], [1, oneSlotEvaluated], [2, twoSlotEvaluated], [3, threeSlotEvaluated]]);
};
// #endregion
// #region search logic
function getArmorPermutations(equipment, previousEval, maximumRemainingScore, requiredScore, categoryIndex) {
  var _iterator3, _step3, piece, thisEval;
  return _regeneratorRuntime().wrap(function getArmorPermutations$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _iterator3 = _createForOfIteratorHelper(equipment[categoryIndex]);
          _context.prev = 1;
          _iterator3.s();
        case 3:
          if ((_step3 = _iterator3.n()).done) {
            _context.next = 18;
            break;
          }
          piece = _step3.value;
          // create and eval new set
          thisEval = previousEval.copy();
          thisEval.addPiece(piece);
          // yield it if score is sufficient
          if (!(thisEval.score >= requiredScore)) {
            _context.next = 12;
            break;
          }
          _context.next = 10;
          return thisEval;
        case 10:
          _context.next = 14;
          break;
        case 12:
          if (!(thisEval.score + maximumRemainingScore[categoryIndex] < requiredScore)) {
            _context.next = 14;
            break;
          }
          return _context.abrupt("break", 18);
        case 14:
          if (!(categoryIndex > 0)) {
            _context.next = 16;
            break;
          }
          return _context.delegateYield(getArmorPermutations(equipment, thisEval, maximumRemainingScore, requiredScore, categoryIndex - 1), "t0", 16);
        case 16:
          _context.next = 3;
          break;
        case 18:
          _context.next = 23;
          break;
        case 20:
          _context.prev = 20;
          _context.t1 = _context["catch"](1);
          _iterator3.e(_context.t1);
        case 23:
          _context.prev = 23;
          _iterator3.f();
          return _context.finish(23);
        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 20, 23, 26]]);
}
function getDecoPermutations(decoPermutationsPerSlotLevel, slotsOfArmor, previousEval, slotIndex) {
  var slotLevel, _iterator4, _step4, perm, thisEval;
  return _regeneratorRuntime().wrap(function getDecoPermutations$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          slotLevel = slotsOfArmor[slotIndex];
          _iterator4 = _createForOfIteratorHelper(decoPermutationsPerSlotLevel.get(slotLevel));
          _context2.prev = 2;
          _iterator4.s();
        case 4:
          if ((_step4 = _iterator4.n()).done) {
            _context2.next = 19;
            break;
          }
          perm = _step4.value;
          // create and eval new set
          thisEval = previousEval.copy();
          thisEval.addPerm(perm, slotLevel);
          // yield it if score is sufficient
          if (!(thisEval.requiredSlots <= 0)) {
            _context2.next = 13;
            break;
          }
          _context2.next = 11;
          return thisEval;
        case 11:
          _context2.next = 15;
          break;
        case 13:
          if (!(thisEval.unusedSlotsSum < thisEval.requiredSlots)) {
            _context2.next = 15;
            break;
          }
          return _context2.abrupt("continue", 17);
        case 15:
          if (!(slotIndex > 0)) {
            _context2.next = 17;
            break;
          }
          return _context2.delegateYield(getDecoPermutations(decoPermutationsPerSlotLevel, slotsOfArmor, thisEval, slotIndex - 1), "t0", 17);
        case 17:
          _context2.next = 4;
          break;
        case 19:
          _context2.next = 24;
          break;
        case 21:
          _context2.prev = 21;
          _context2.t1 = _context2["catch"](2);
          _iterator4.e(_context2.t1);
        case 24:
          _context2.prev = 24;
          _iterator4.f();
          return _context2.finish(24);
        case 27:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[2, 21, 24, 27]]);
}
var transformTorsoUpDecoPermutation = function transformTorsoUpDecoPermutation(perm, torsoUp) {
  var factor = torsoUp + 1;
  var score = perm.score * factor;
  var decos = perm.decos.map(function (d) {
    var newSkills = new EquipmentSkills_1.default(d.skills);
    newSkills.multiply(factor);
    var newDeco = Object.assign({}, d, {
      affectedByTorsoUp: true,
      name: d.name.concat(' (TorsoUp)'),
      skills: newSkills
    });
    return newDeco;
  });
  var newTotalSkills = new EquipmentSkills_1.default(perm.skills);
  newTotalSkills.multiply(factor);
  var skills = newTotalSkills;
  return {
    score: score,
    decos: decos,
    skills: skills
  };
};
var findSufficientDecoPermutation = function findSufficientDecoPermutation(armorEval, constraints, wantedSkills, decoMinSlotMap, decoPermutationsPerSlotLevel) {
  var _inner = function _inner(_slotList, _initialEval) {
    if (_initialEval.requiredSlots <= 0) return _initialEval;
    if (_initialEval.unusedSlotsSum < _initialEval.requiredSlots) return undefined;
    if (_slotList.length === 0) return undefined;
    var decoEvaluation = getDecoPermutations(decoPermutationsPerSlotLevel, _slotList, _initialEval, _slotList.length - 1).next().value;
    if (decoEvaluation) return decoEvaluation;
    return undefined;
  };
  var r;
  var torsoSlots = armorEval.equipment[EquipmentCategory_1.default.CHEST].slots;
  var missingSkills = new EquipmentSkills_1.default(Array.from(wantedSkills).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      sId = _ref2[0],
      sVal = _ref2[1];
    return [sId, sVal - armorEval.skills.get(sId)];
  }));
  var slotSum = armorEval.totalSlots + constraints.weaponSlots;
  if (armorEval.torsoUp > 0 && torsoSlots > 0) {
    // if torso up, fill the chest slots and then iterate over permutations from there
    var slotList = armorEval.getSlotsExceptChest().concat(constraints.weaponSlots ? constraints.weaponSlots : []);
    var slotSumWithoutTorso = slotSum - torsoSlots;
    var initialEval = new DecoEvaluation_1.default(decoMinSlotMap, slotSumWithoutTorso, missingSkills);
    var _iterator5 = _createForOfIteratorHelper(decoPermutationsPerSlotLevel.get(torsoSlots)),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var chestPerm = _step5.value;
        var transformedPerm = transformTorsoUpDecoPermutation(chestPerm, armorEval.torsoUp);
        var copiedEval = initialEval.copy();
        copiedEval.addPerm(transformedPerm, torsoSlots);
        var temp = _inner(slotList, copiedEval);
        if (temp) {
          r = temp;
          break;
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  } else {
    // otherwise just iterate over permutations
    var _slotList2 = armorEval.getSlots().concat(constraints.weaponSlots ? constraints.weaponSlots : []);
    r = _inner(_slotList2, new DecoEvaluation_1.default(decoMinSlotMap, armorEval.totalSlots + constraints.weaponSlots, missingSkills));
  }
  return r;
};
var findSets = function findSets(armorPieces, decorations, charms, constraints, skillData) {
  var wantedSkills = new EquipmentSkills_1.default(constraints.skillActivations.map(function (x) {
    return [x.requiredSkill, x.requiredPoints];
  }));
  var decoPermutationsPerSlotLevel = getDecorationVariationsPerSlotLevel(decorations, wantedSkills);
  var slotScoreMap = scorer_module_1.getDecoSlotScoreMap(decoPermutationsPerSlotLevel);
  var initialArmorEval = getIntiailArmorEval(constraints.armorType);
  var wantedScore = scorer_module_1.getScoreFromSkillMap(wantedSkills, wantedSkills) - slotScoreMap.get(constraints.weaponSlots);
  var decoMinSlotMap = new DecoMinSlotMap_1.default(decorations, wantedSkills);
  var skilledEquipment = armorPieces;
  skilledEquipment.push(charms);
  // score equipment
  var scoredEquipment = skilledEquipment.map(function (equList) {
    return equList.map(function (equ) {
      var score = slotScoreMap.get(equ.slots) + scorer_module_1.getScoreFromSkillMap(equ.skills, wantedSkills);
      return Object.assign({}, equ, {
        score: score
      });
    });
  });
  // reorder equipment and manually rescore torso up pieces
  var maxTorsoScore = Math.max.apply(Math, _toConsumableArray(scoredEquipment[1].map(function (x) {
    return x.score;
  })));
  var readjustedEquipment = [scoredEquipment[1], scoredEquipment[0].map(function (x) {
    return scorer_module_1.scoreTorsoUpPieces(x, maxTorsoScore);
  }), scoredEquipment[2], scoredEquipment[3].map(function (x) {
    return scorer_module_1.scoreTorsoUpPieces(x, maxTorsoScore);
  }), scoredEquipment[4].map(function (x) {
    return scorer_module_1.scoreTorsoUpPieces(x, maxTorsoScore);
  }), scoredEquipment[5]];
  // sort equipment by score
  var sorted = readjustedEquipment.map(function (l) {
    return l.sort(function (a, b) {
      return b.score - a.score;
    });
  });
  // get list of maximum score of remaining iterations
  var maximumRemainingScore = [0];
  var sumOfAllIterations = 0;
  sorted.map(function (x) {
    return x[0].score;
  }).forEach(function (m) {
    sumOfAllIterations += m;
    maximumRemainingScore.push(sumOfAllIterations);
  });
  var length = 0;
  var validSets = [];
  // try all viable armor permuations
  var _iterator6 = _createForOfIteratorHelper(getArmorPermutations(sorted, initialArmorEval, maximumRemainingScore, wantedScore, sorted.length - 1)),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var armorEvaluation = _step6.value;
      // find first sufficient deco eval
      var decoEvaluation = findSufficientDecoPermutation(armorEvaluation, constraints, wantedSkills, decoMinSlotMap, decoPermutationsPerSlotLevel);
      // build and append set if there is any deco eval
      if (decoEvaluation) {
        var set = new ArmorSet_1.default(armorEvaluation, decoEvaluation, skillData.skillActivation);
        validSets.push(set);
        // exit if enough sets found
        if (length === constraints.limit - 1) break;
        length++;
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  return validSets;
};
// #endregion
// #region entrypoint
var search = function search(armorPieces, decorations, charms, constraints, skillData) {
  var a = armorPieces.map(function (piecesOfCategory, i) {
    return data_filter_module_1.applyArmorFilter(piecesOfCategory, constraints.armorRarity, constraints.armorType, i, constraints.pins[i], constraints.exclusions[i], constraints.skillActivations);
  });
  var c = data_filter_module_1.applyCharmFilter(charms, constraints.skillActivations);
  var d = data_filter_module_1.applyRarityFilter(decorations, constraints.decoRarity).filter(function (x) {
    return data_filter_module_1.filterHasSkill(x, constraints.skillActivations);
  });
  return findSets(a, d, c, constraints, skillData);
};
exports.search = search;
},{"../data-provider/data-provider.module":"../../data-provider/data-provider.module.ts","../data-provider/models/equipment/EquipmentCategory":"../../data-provider/models/equipment/EquipmentCategory.ts","../data-provider/models/equipment/EquipmentSkills":"../../data-provider/models/equipment/EquipmentSkills.ts","../scorer/models/ArmorEvaluation":"../../scorer/models/ArmorEvaluation.ts","./models/ArmorSet":"../../searcher/models/ArmorSet.ts","../data-filter/data-filter.module":"../../data-filter/data-filter.module.ts","../scorer/scorer.module":"../../scorer/scorer.module.ts","../scorer/models/DecoEvaluation":"../../scorer/models/DecoEvaluation.ts","../scorer/models/DecoMinSlotMap":"../../scorer/models/DecoMinSlotMap.ts"}],"../ui/global-settings.component.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGlobalSettings = function () {
  var armorSelect = document.getElementById('armor-type');
  var weaponSlots = document.getElementById('weapon-slots');
  var armorRarity = document.getElementById('armor-rarity');
  var decoRarity = document.getElementById('deco-rarity');
  var limit = document.getElementById('search-limit');
  return {
    armorType: parseInt(armorSelect.value),
    weaponSlots: parseInt(weaponSlots.value),
    armorRarity: parseInt(armorRarity.value),
    decoRarity: parseInt(decoRarity.value),
    limit: parseInt(limit.value)
  };
};
},{}],"../ui/search-results.component.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
var _marked = /*#__PURE__*/_regeneratorRuntime().mark(moreSkillsIterator);
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var UserEquipmentSettings_1 = __importDefault(require("../../data-provider/models/user/UserEquipmentSettings"));
var html_helper_1 = require("../../helper/html.helper");
var eq_settings_component_1 = require("./eq-settings.component");
function moreSkillsIterator(skillActivations) {
  var rContainer, countDiv, totalActCount, i;
  return _regeneratorRuntime().wrap(function moreSkillsIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          rContainer = clearAndGetResultsContainer();
          countDiv = document.createElement('div');
          rContainer.appendChild(countDiv);
          totalActCount = Array.from(skillActivations.values()).reduce(function (sum, c) {
            return sum + c.length;
          }, 0);
          i = 0;
        case 5:
          if (!(i < totalActCount)) {
            _context.next = 12;
            break;
          }
          countDiv.innerHTML = "Checked ".concat(i, " possible skills ...");
          _context.next = 9;
          return i;
        case 9:
          i++;
          _context.next = 5;
          break;
        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
exports.moreSkillsIterator = moreSkillsIterator;
var onSetClick = function onSetClick(tbNode, viewGetter) {
  var children = tbNode.childNodes;
  var finalNode = children[children.length - 1];
  // toggle if details have already been rendered
  if (finalNode.classList.contains('result-set-details')) {
    finalNode.classList.toggle('hidden');
    return;
  }
  // render and append them otherwise
  tbNode.appendChild(viewGetter());
};
var PINS_OR_EXCL_ACTIVE_BANNER = html_helper_1.htmlToElement("\n  <div class=\"results-banner banner\">\n    You have some pins or exclusions active, which may be limiting results. You may find some results by removing those pins or exclusions.\n  <div>\n");
var getExpandedView = function getExpandedView(set, skillData, searchParams) {
  // build header
  var header = html_helper_1.htmlToElement("\n    <tr>\n      <th>Skill</th>\n      <th style=\"width: 6%\">Weapon</th>\n      <th style=\"width: 6%\">Head</th>\n      <th style=\"width: 6%\">Chest</th>\n      <th style=\"width: 6%\">Arms</th>\n      <th style=\"width: 6%\">Waist</th>\n      <th style=\"width: 6%\">Legs</th>\n      <th style=\"width: 6%\">Charm</th>\n      <th style=\"width: 6%\">Deco</th>\n      <th style=\"width: 6%\">Total</th>\n      <th>Active</th>\n    </tr>\n  ");
  // build skills rows
  var skillRows = Array.from(set.evaluation.skills.entries()).sort(function (_ref, _ref2) {
    var _ref3 = _slicedToArray(_ref, 2),
      _a = _ref3[0],
      a = _ref3[1];
    var _ref4 = _slicedToArray(_ref2, 2),
      _b = _ref4[0],
      b = _ref4[1];
    return b - a;
  }).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      sId = _ref6[0],
      sVal = _ref6[1];
    var r = document.createElement('tr');
    var computedDecoValue = set.decos.map(function (d) {
      return d.skills.get(sId);
    }).reduce(function (sum, c) {
      return sum + c;
    }, 0);
    r.appendChild(html_helper_1.htmlToElement("<td>".concat(skillData.skillName.get(sId) ? skillData.skillName.get(sId) : '', "</td>")));
    r.appendChild(html_helper_1.htmlToElement('<td></td>')); // weapon
    var _iterator = _createForOfIteratorHelper(set.getPieces()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var p = _step.value;
        r.append(html_helper_1.htmlToElement("<td>".concat(p.skills.get(sId) ? p.skills.get(sId) : '', "</td>")));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    r.append(html_helper_1.htmlToElement("<td>".concat(set.charm.skills.get(sId) ? set.charm.skills.get(sId) : '', "</td>")));
    r.append(html_helper_1.htmlToElement("<td>".concat(computedDecoValue || '', "</td>")));
    r.append(html_helper_1.htmlToElement("<td>".concat(sVal, "</td>")));
    var possibleAct = set.evaluation.activations.find(function (a) {
      return a.requiredSkill === sId;
    });
    if (possibleAct) r.append(html_helper_1.htmlToElement("<td ".concat(!possibleAct.isPositive ? 'class="neg-skill"' : '', "}\">").concat(possibleAct.name, "</td>")));
    return r;
  });
  // build slot list
  var slotRow = document.createElement('tr');
  slotRow.appendChild(html_helper_1.htmlToElement('<td>Slots</td>'));
  var rawSlowList = [searchParams.weaponSlots].concat(_toConsumableArray(set.getPieces().map(function (x) {
    return x.slots;
  })), [set.charm.slots]);
  rawSlowList.forEach(function (s) {
    return slotRow.appendChild(html_helper_1.htmlToElement("<td>".concat(s, "</td>")));
  });
  // append elements to table
  var skillTable = html_helper_1.htmlToElement('<table class="result-set-skill-table"></table>');
  skillTable.appendChild(header);
  skillRows.forEach(function (x) {
    return skillTable.appendChild(x);
  });
  skillTable.appendChild(slotRow);
  // build deco list
  var decoNameMap = new Map();
  var _iterator2 = _createForOfIteratorHelper(set.decos),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var deco = _step2.value;
      var name = deco.name;
      decoNameMap.set(name, 1 + (decoNameMap.get(name) || 0));
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  var decoNameList = Array.from(decoNameMap.entries()).map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
      name = _ref8[0],
      amount = _ref8[1];
    return "".concat(amount, " x ").concat(name);
  });
  var decoNameString = decoNameList.join(', ');
  var decoNameContainer = html_helper_1.htmlToElement("\n    <div><span>".concat(decoNameString, "</span></div>\n  "));
  // build piece table
  var pieceTable = html_helper_1.htmlToElement('<table class="result-set-piece-table"></table>');
  var pieceTableHeader = html_helper_1.htmlToElement('<tr><th>Def</th><th>Piece</th><th>Pin</th><th>Excl</th></tr>');
  pieceTable.appendChild(pieceTableHeader);
  var _iterator3 = _createForOfIteratorHelper(set.getPieces()),
    _step3;
  try {
    var _loop = function _loop() {
      var piece = _step3.value;
      var pieceTableEle = document.createElement('tr');
      var pieceTableDef = html_helper_1.htmlToElement("<td style=\"width: 20%;\">".concat(piece.defense.max, "</td>"));
      var pieceTableName = html_helper_1.htmlToElement("<td style=\"width: 50%;\">".concat(piece.name, "</td>"));
      var pieceTablePin = piece.isGeneric ? html_helper_1.htmlToElement('<td style="user-select: none; width: 15%;"></td>') : html_helper_1.htmlToElement('<td style="user-select: none; width: 15%; cursor: pointer;">✓</td>');
      var pieceTableExcl = html_helper_1.htmlToElement('<td style="user-select: none; width: 15%; cursor: pointer;">X</td>');
      if (UserEquipmentSettings_1.default.Instance.hasPin(piece)) pieceTablePin.classList.add('pin-highlighted');
      if (UserEquipmentSettings_1.default.Instance.hasExclusion(piece)) pieceTableExcl.classList.add('excl-highlighted');
      pieceTablePin.addEventListener('click', function () {
        if (piece.isGeneric) return;
        if (UserEquipmentSettings_1.default.Instance.hasPin(piece)) {
          eq_settings_component_1.removePin(piece.category);
          pieceTablePin.classList.remove('pin-highlighted');
        } else {
          eq_settings_component_1.addPin(piece);
          pieceTablePin.classList.add('pin-highlighted');
        }
      });
      pieceTableExcl.addEventListener('click', function () {
        if (UserEquipmentSettings_1.default.Instance.hasExclusion(piece)) {
          eq_settings_component_1.removeExlusion(piece);
          pieceTableExcl.classList.remove('excl-highlighted');
        } else {
          eq_settings_component_1.addExclusion(piece);
          pieceTableExcl.classList.add('excl-highlighted');
        }
      });
      pieceTableEle.appendChild(pieceTableDef);
      pieceTableEle.appendChild(pieceTableName);
      pieceTableEle.appendChild(pieceTablePin);
      pieceTableEle.appendChild(pieceTableExcl);
      pieceTable.appendChild(pieceTableEle);
    };
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      _loop();
    }
    // return final div
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  var tr = html_helper_1.htmlToElement('<tr class="result-set-details"></tr>');
  var td = html_helper_1.htmlToElement('<td colspan="6""></td>');
  var d = html_helper_1.htmlToElement('<div class="result-set-details-container"></div>');
  td.appendChild(d);
  tr.appendChild(td);
  d.appendChild(pieceTable);
  d.appendChild(skillTable);
  d.appendChild(document.createElement('div')); // dummy for easy grid
  d.appendChild(decoNameContainer);
  return tr;
};
var getSetElement = function getSetElement(set, skillData, searchParams) {
  // get bonus and negative skills
  var requiredActivations = searchParams.skillActivations;
  var unrelatedActivations = set.evaluation.activations.filter(function (act) {
    return !act.isPositive ||
    // negative skill
    !requiredActivations.find(function (req) {
      return req.requiredSkill === act.requiredSkill;
    }) ||
    // skill is not in required
    requiredActivations.find(function (req) {
      return req.requiredSkill === act.requiredSkill && act.requiredPoints > req.requiredPoints;
    }); // skill is upgrade of smth required
  });

  var unrelatedHtmlStrings = unrelatedActivations.sort(function (a, b) {
    return b.requiredPoints - a.requiredPoints;
  }).map(function (x) {
    return "<span class=\"result-set-unrelated-skill ".concat(!x.isPositive ? 'neg-skill' : '', "\">").concat(x.name, "</span>");
  });
  // get basic display components
  var tb = html_helper_1.htmlToElement('<tbody class="result-set"></tbody>');
  var row1 = html_helper_1.htmlToElement("\n    <tr class=\"result-set-row result-set-row1\">\n      <td>".concat(set.head.name, "</td>\n      <td>").concat(set.chest.name, "</td>\n      <td>").concat(set.arms.name, "</td>\n      <td>").concat(set.waist.name, "</td>\n      <td>").concat(set.legs.name, "</td>\n      <td>").concat(set.charm.name, "</td>\n    </tr>"));
  var row2 = html_helper_1.htmlToElement("\n    <tr class=\"result-set-row result-set-row2\">\n      <td colspan=\"6\">\n        <p><span class=\"def\">DEF</span> <span>".concat(set.evaluation.defense.max, "</span></p>\n        <p><span class=\"fir\">FIR</span> <span>").concat(set.evaluation.resistance[0], "</span></p>\n        <p><span class=\"wat\">WAT</span> <span>").concat(set.evaluation.resistance[1], "</span></p>\n        <p><span class=\"ice\">ICE</span> <span>").concat(set.evaluation.resistance[2], "</span></p>\n        <p><span class=\"thn\">THN</span> <span>").concat(set.evaluation.resistance[3], "</span></p>\n        <p><span class=\"drg\">DRG</span> <span>").concat(set.evaluation.resistance[4], "</span></p>\n        <span class=\"result-set-unrelated\">").concat(unrelatedHtmlStrings.join(''), "</span>\n      </td>\n    </tr>"));
  // append basic display components
  var getter = function getter() {
    return getExpandedView(set, skillData, searchParams);
  };
  for (var _i2 = 0, _arr2 = [row1, row2]; _i2 < _arr2.length; _i2++) {
    var row = _arr2[_i2];
    tb.appendChild(row);
    row.addEventListener('click', function () {
      return onSetClick(tb, getter);
    });
  }
  return tb;
};
var onMoreSkillsActClick = function onMoreSkillsActClick(d) {
  var id = parseInt(d.getAttribute('data-id'));
  for (var _i3 = 0, _Array$from = Array.from(document.getElementsByClassName('search-picker-activation')); _i3 < _Array$from.length; _i3++) {
    var ele = _Array$from[_i3];
    var thisId = parseInt(ele.getAttribute('data-id'));
    if (id === thisId) {
      ele.click();
      break;
    }
  }
};
var clearAndGetResultsContainer = function clearAndGetResultsContainer() {
  var resultContainer = document.getElementById('search-results');
  for (var _i4 = 0, _Array$from2 = Array.from(resultContainer.children); _i4 < _Array$from2.length; _i4++) {
    var c = _Array$from2[_i4];
    c.remove();
  }
  return resultContainer;
};
exports.renderMoreSkills = function (activations, pinsOrExclActive) {
  var resultContainer = clearAndGetResultsContainer();
  if (activations.length === 0) {
    resultContainer.appendChild(html_helper_1.htmlToElement("\n      <div class=\"results-banner banner\">\n        Can't fit more skills\n      <div>\n    "));
    if (pinsOrExclActive) resultContainer.appendChild(PINS_OR_EXCL_ACTIVE_BANNER);
    return;
  }
  var _iterator4 = _createForOfIteratorHelper(activations),
    _step4;
  try {
    var _loop2 = function _loop2() {
      var act = _step4.value;
      var d = html_helper_1.htmlToElement("<div class=\"results-more-skills-act\" data-id=\"".concat(act.id, "\"></div>"));
      d.appendChild(html_helper_1.htmlToElement("<span class=\"results-more-skills-act-content\">".concat(act.name, "</span>")));
      d.addEventListener('click', function () {
        onMoreSkillsActClick(d);
      });
      resultContainer.appendChild(d);
    };
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      _loop2();
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
};
exports.renderResults = function (sets, skillData, searchParams, pinsOrExclActive) {
  var resultContainer = clearAndGetResultsContainer();
  // add search param element
  resultContainer.appendChild(html_helper_1.htmlToElement("\n    <div class=\"results-title\">Results for ".concat(searchParams.skillActivations.map(function (x) {
    return x.name;
  }).join(', '), " (").concat(sets.length, " matches)</div>\n  ")));
  // return if no results
  if (sets.length === 0) {
    resultContainer.appendChild(html_helper_1.htmlToElement("\n      <div class=\"results-banner banner\">\n        No matching armor sets\n      <div>\n    "));
    if (pinsOrExclActive) resultContainer.appendChild(PINS_OR_EXCL_ACTIVE_BANNER);
    return;
  }
  // build table and table header
  var table = html_helper_1.htmlToElement('<table class="results-table" id="results-table"></table>');
  var header = html_helper_1.htmlToElement('<tr><th>Head</th><th>Torso</th><th>Arms</th><th>Waist</th><th>Legs</th><th>Charm</th></tr>');
  resultContainer.appendChild(table);
  table.appendChild(header);
  // build and append html elements for each armor set
  sets.sort(function (a, b) {
    return b.evaluation.defense.max - a.evaluation.defense.max;
  }).map(function (set) {
    return getSetElement(set, skillData, searchParams);
  }).forEach(function (ele) {
    return table.appendChild(ele);
  });
};
},{"../../data-provider/models/user/UserEquipmentSettings":"../../data-provider/models/user/UserEquipmentSettings.ts","../../helper/html.helper":"../../helper/html.helper.ts","./eq-settings.component":"../ui/eq-settings.component.ts"}],"../ui/search-controls.component.ts":[function(require,module,exports) {
var define;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _this = this;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var UserCharmList_1 = __importDefault(require("../../data-provider/models/user/UserCharmList"));
var searcher_module_1 = require("../../searcher/searcher.module");
var global_settings_component_1 = require("./global-settings.component");
var picker_component_1 = require("./picker.component");
var search_results_component_1 = require("./search-results.component");
var UserEquipmentSettings_1 = __importDefault(require("../../data-provider/models/user/UserEquipmentSettings"));
var pinsOrExclusionsActive = function pinsOrExclusionsActive(pins, exclusions) {
  return pins.some(function (p) {
    return p !== undefined;
  }) || exclusions.some(function (eL) {
    return eL.length > 0;
  });
};
var arrangeSearchData = function arrangeSearchData() {
  // build params
  var globalSettings = global_settings_component_1.getGlobalSettings();
  var skillActivations = picker_component_1.getSkillActivations();
  // return if no skill selected
  if (skillActivations.length === 0) {
    return;
  }
  // sanitize activation input to only include highest version of each skill
  var sanitizedSkillActivations = skillActivations.filter(function (thisAct, i) {
    return skillActivations.every(function (compareAct, j) {
      if (i === j) return true;
      if (thisAct.requiredSkill !== compareAct.requiredSkill) return true;
      return thisAct.requiredPoints >= compareAct.requiredPoints;
    });
  });
  // create search params
  var searchParams = {
    weaponSlots: globalSettings.weaponSlots,
    armorType: globalSettings.armorType,
    armorRarity: globalSettings.armorRarity,
    decoRarity: globalSettings.decoRarity,
    limit: Math.min(Math.max(globalSettings.limit, 1), 1000),
    skillActivations: sanitizedSkillActivations,
    pins: UserEquipmentSettings_1.default.Instance.pins,
    exclusions: UserEquipmentSettings_1.default.Instance.exclusions
  };
  return searchParams;
};
var searchLogic = function searchLogic(equData, skillData) {
  var searchParams = arrangeSearchData();
  if (!searchParams) {
    alert('Please select at least one skill');
    return;
  }
  // search for sets
  var result = searcher_module_1.search(equData.armor, equData.decorations, UserCharmList_1.default.Instance.get(), searchParams, skillData);
  // render results
  search_results_component_1.renderResults(result, skillData, searchParams, pinsOrExclusionsActive(searchParams.pins, searchParams.exclusions));
};
var moreSkillsLogic = function moreSkillsLogic(equData, skillData) {
  return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var searchParams, charms, aquirableSkills, outputIterator, _iterator, _step, actMap, sActs, processedActs, breakFlag, _iterator2, _step2, _loop, _ret;
    return _regeneratorRuntime().wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            searchParams = arrangeSearchData();
            if (searchParams) {
              _context2.next = 4;
              break;
            }
            alert('Please select at least one skill');
            return _context2.abrupt("return");
          case 4:
            charms = UserCharmList_1.default.Instance.get();
            aquirableSkills = [];
            outputIterator = search_results_component_1.moreSkillsIterator(skillData.skillActivation);
            _iterator = _createForOfIteratorHelper(skillData.skillActivation);
            _context2.prev = 8;
            _iterator.s();
          case 10:
            if ((_step = _iterator.n()).done) {
              _context2.next = 36;
              break;
            }
            actMap = _step.value;
            sActs = actMap[1];
            processedActs = sActs.filter(function (act) {
              return act.requiredPoints >= 0;
            }).filter(function (act) {
              return !searchParams.skillActivations.map(function (x) {
                return x.id;
              }).includes(act.id);
            }).filter(function (act) {
              return !searchParams.skillActivations.find(function (x) {
                return act.requiredSkill === x.requiredSkill && act.requiredPoints < x.requiredPoints;
              });
            }).sort(function (a, b) {
              return a.requiredPoints - b.requiredPoints;
            });
            breakFlag = false;
            _iterator2 = _createForOfIteratorHelper(processedActs);
            _context2.prev = 16;
            _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
              var act, newParams, r;
              return _regeneratorRuntime().wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      act = _step2.value;
                      outputIterator.next();
                      if (!breakFlag) {
                        _context.next = 4;
                        break;
                      }
                      return _context.abrupt("return", "continue");
                    case 4:
                      newParams = Object.assign({}, searchParams, {
                        limit: 1,
                        skillActivations: searchParams.skillActivations.concat(act)
                      });
                      _context.next = 7;
                      return new Promise(function (resolve, _reject) {
                        setTimeout(function () {
                          var innerR = searcher_module_1.search(equData.armor, equData.decorations, charms, newParams, skillData);
                          resolve(innerR);
                        });
                      });
                    case 7:
                      r = _context.sent;
                      if (r.length === 0) breakFlag = true;else aquirableSkills.push(act);
                    case 9:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _loop);
            });
            _iterator2.s();
          case 19:
            if ((_step2 = _iterator2.n()).done) {
              _context2.next = 26;
              break;
            }
            return _context2.delegateYield(_loop(), "t0", 21);
          case 21:
            _ret = _context2.t0;
            if (!(_ret === "continue")) {
              _context2.next = 24;
              break;
            }
            return _context2.abrupt("continue", 24);
          case 24:
            _context2.next = 19;
            break;
          case 26:
            _context2.next = 31;
            break;
          case 28:
            _context2.prev = 28;
            _context2.t1 = _context2["catch"](16);
            _iterator2.e(_context2.t1);
          case 31:
            _context2.prev = 31;
            _iterator2.f();
            return _context2.finish(31);
          case 34:
            _context2.next = 10;
            break;
          case 36:
            _context2.next = 41;
            break;
          case 38:
            _context2.prev = 38;
            _context2.t2 = _context2["catch"](8);
            _iterator.e(_context2.t2);
          case 41:
            _context2.prev = 41;
            _iterator.f();
            return _context2.finish(41);
          case 44:
            search_results_component_1.renderMoreSkills(aquirableSkills, pinsOrExclusionsActive(searchParams.pins, searchParams.exclusions));
          case 45:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, null, [[8, 38, 41, 44], [16, 28, 31, 34]]);
  }));
};
var resetLogic = function resetLogic() {
  picker_component_1.resetSkillActivations();
};
/** attach handlers for control buttons */
exports.attachControlListeners = function (equData, skillData) {
  var searchBtn = document.getElementById('search-btn');
  var moreSkillsBtn = document.getElementById('more-btn');
  var resetBtn = document.getElementById('reset-btn');
  searchBtn.addEventListener('click', function () {
    searchLogic(equData, skillData);
  });
  moreSkillsBtn.addEventListener('click', function () {
    moreSkillsLogic(equData, skillData);
  });
  resetBtn.addEventListener('click', function () {
    resetLogic();
  });
};
},{"../../data-provider/models/user/UserCharmList":"../../data-provider/models/user/UserCharmList.ts","../../searcher/searcher.module":"../../searcher/searcher.module.ts","./global-settings.component":"../ui/global-settings.component.ts","./picker.component":"../ui/picker.component.ts","./search-results.component":"../ui/search-results.component.ts","../../data-provider/models/user/UserEquipmentSettings":"../../data-provider/models/user/UserEquipmentSettings.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _this = this;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var data_provider_module_1 = require("../../data-provider/data-provider.module");
var charms_component_1 = require("../ui/charms.component");
var eq_settings_component_1 = require("../ui/eq-settings.component");
var navbar_component_1 = require("../ui/navbar.component");
var picker_component_1 = require("../ui/picker.component");
var search_controls_component_1 = require("../ui/search-controls.component");
var main = function main() {
  return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var armor, decorations, skillData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // initiate static components
            navbar_component_1.initiateNavbar();
            // load remaining data
            _context.next = 3;
            return data_provider_module_1.getHead();
          case 3:
            _context.t0 = _context.sent;
            _context.next = 6;
            return data_provider_module_1.getChest();
          case 6:
            _context.t1 = _context.sent;
            _context.next = 9;
            return data_provider_module_1.getArms();
          case 9:
            _context.t2 = _context.sent;
            _context.next = 12;
            return data_provider_module_1.getWaist();
          case 12:
            _context.t3 = _context.sent;
            _context.next = 15;
            return data_provider_module_1.getLegs();
          case 15:
            _context.t4 = _context.sent;
            armor = [_context.t0, _context.t1, _context.t2, _context.t3, _context.t4];
            _context.next = 19;
            return data_provider_module_1.getDecorations();
          case 19:
            decorations = _context.sent;
            _context.next = 22;
            return data_provider_module_1.getSkillNameMap();
          case 22:
            _context.t5 = _context.sent;
            _context.next = 25;
            return data_provider_module_1.getSkillActivationMap();
          case 25:
            _context.t6 = _context.sent;
            _context.next = 28;
            return data_provider_module_1.getSkillCategories();
          case 28:
            _context.t7 = _context.sent;
            skillData = {
              skillName: _context.t5,
              skillActivation: _context.t6,
              skillCategories: _context.t7
            };
            // render ui
            picker_component_1.renderSkillPicker(skillData.skillActivation, skillData.skillCategories);
            charms_component_1.renderCharmPicker(skillData.skillName, skillData.skillActivation, skillData.skillCategories);
            eq_settings_component_1.renderEqSettings(armor);
            // initialize search controls
            search_controls_component_1.attachControlListeners({
              armor: armor,
              decorations: decorations
            }, skillData);
          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
};
main();
},{"../../data-provider/data-provider.module":"../../data-provider/data-provider.module.ts","../ui/charms.component":"../ui/charms.component.ts","../ui/eq-settings.component":"../ui/eq-settings.component.ts","../ui/navbar.component":"../ui/navbar.component.ts","../ui/picker.component":"../ui/picker.component.ts","../ui/search-controls.component":"../ui/search-controls.component.ts"}],"../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61621" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/pages.77de5100.js.map