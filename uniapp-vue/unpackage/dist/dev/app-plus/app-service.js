if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(callback()).then(() => value), (reason) => promise.resolve(callback()).then(() => {
      throw reason;
    }));
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$1 = {
    data() {
      return {
        imghrefValue: ``,
        imghref: `http://${this.imghrefValue}:8080/img/${this.imgname}`,
        imgname: "",
        count: true,
        itimer: 1
      };
    },
    methods: {
      getServerData() {
        var imghr = this.imghrefValue.replace(/[, ]/g, "");
        formatAppLog("log", "at pages/index/index.vue:67", imghr);
        uni.request({
          url: `http://${imghr}:8080/api/img/getimgName`,
          success: (res) => {
            if (res.data.status == 0) {
              formatAppLog("log", "at pages/index/index.vue:72", res.data.imgName);
              this.imgname = res.data.imgName;
              this.imghref = `http://${imghr}:8080/img/${res.data.imgName}`;
            }
          },
          fail: (res) => {
            formatAppLog("log", "at pages/index/index.vue:79", "get\u5931\u8D25");
          },
          timeout: 1e3
        });
      },
      startUpdata() {
        this.count = false;
        if (!this.count) {
          this.itimer = setInterval(() => {
            this.getServerData();
          }, "1000");
        }
      },
      stopUpdata() {
        this.count = true;
        if (this.count) {
          clearInterval(this.itimer);
        }
      }
    }
  };
  function _sfc_render(_ctx2, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(" <h1>{{imghrefValue}}</h1> "),
      vue.createElementVNode("br"),
      vue.withDirectives(vue.createElementVNode("input", {
        type: "text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.imghrefValue = $event),
        style: { "height": "20%", "width": "80%", "margin": "auto" },
        placeholder: "\u8F93\u5165\u4F60\u7684\u670D\u52A1\u5668ipv4\u5730\u5740"
      }, null, 512), [
        [vue.vModelText, $data.imghrefValue]
      ]),
      vue.createElementVNode("br"),
      vue.withDirectives(vue.createElementVNode("button", {
        onClick: _cache[1] || (_cache[1] = ($event) => $options.startUpdata())
      }, "start", 512), [
        [vue.vShow, $data.count]
      ]),
      vue.withDirectives(vue.createElementVNode("button", {
        onClick: _cache[2] || (_cache[2] = ($event) => $options.stopUpdata())
      }, "stop", 512), [
        [vue.vShow, !$data.count]
      ]),
      vue.createElementVNode("img", {
        src: $data.imghref,
        alt: "translation",
        style: { "width": "100%", "vertical-align": "middle" }
      }, null, 8, ["src"])
    ]);
  }
  var PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-57280228"], ["__file", "E:/ds/fords/pages/index/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  const _sfc_main = {
    __name: "App",
    setup(__props) {
      const count = vue.ref(1);
      return (_ctx2, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("h1", null, "hello"),
          vue.createElementVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => count.value++)
          }, "count is " + vue.toDisplayString(count.value), 1)
        ], 64);
      };
    }
  };
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/ds/fords/App.vue"]]);
  function getAugmentedNamespace(n) {
    if (n.__esModule)
      return n;
    var a = Object.defineProperty({}, "__esModule", { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a;
  }
  var utils$1 = {};
  var ABBR = {
    th: 3,
    mi: 6,
    bi: 9,
    tr: 12
  };
  var DEFAULT_OPTIONS = {
    zeroFormat: null,
    nullFormat: null,
    defaultFormat: "0,0",
    scalePercentBy100: true,
    abbrLabel: {
      th: "k",
      mi: "m",
      bi: "b",
      tr: "t"
    }
  };
  var TRILLION = 1e12;
  var BILLION = 1e9;
  var MILLION = 1e6;
  var THOUSAND = 1e3;
  function numIsNaN(value) {
    return typeof value === "number" && isNaN(value);
  }
  function toFixed(value, maxDecimals, roundingFunction, optionals) {
    var splitValue = value.toString().split(".");
    var minDecimals = maxDecimals - (optionals || 0);
    var boundedPrecision = splitValue.length === 2 ? Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals) : minDecimals;
    var power = Math.pow(10, boundedPrecision);
    var output = (roundingFunction(value + "e+" + boundedPrecision) / power).toFixed(boundedPrecision);
    if (optionals > maxDecimals - boundedPrecision) {
      var optionalsRegExp = new RegExp("\\.?0{1," + (optionals - (maxDecimals - boundedPrecision)) + "}$");
      output = output.replace(optionalsRegExp, "");
    }
    return output;
  }
  function numberToFormat(options2, value, format2, roundingFunction) {
    var abs2 = Math.abs(value);
    var negP = false;
    var optDec = false;
    var abbr = "";
    var decimal = "";
    var neg = false;
    var abbrForce = void 0;
    var signed = void 0;
    format2 = format2 || "";
    value = value || 0;
    if (~format2.indexOf("(")) {
      negP = true;
      format2 = format2.replace(/[(|)]/g, "");
    } else if (~format2.indexOf("+") || ~format2.indexOf("-")) {
      signed = ~format2.indexOf("+") ? format2.indexOf("+") : value < 0 ? format2.indexOf("-") : -1;
      format2 = format2.replace(/[+|-]/g, "");
    }
    if (~format2.indexOf("a")) {
      abbrForce = format2.match(/a(k|m|b|t)?/);
      abbrForce = abbrForce ? abbrForce[1] : false;
      if (~format2.indexOf(" a"))
        abbr = " ";
      format2 = format2.replace(new RegExp(abbr + "a[kmbt]?"), "");
      if (abs2 >= TRILLION && !abbrForce || abbrForce === "t") {
        abbr += options2.abbrLabel.tr;
        value = value / TRILLION;
      } else if (abs2 < TRILLION && abs2 >= BILLION && !abbrForce || abbrForce === "b") {
        abbr += options2.abbrLabel.bi;
        value = value / BILLION;
      } else if (abs2 < BILLION && abs2 >= MILLION && !abbrForce || abbrForce === "m") {
        abbr += options2.abbrLabel.mi;
        value = value / MILLION;
      } else if (abs2 < MILLION && abs2 >= THOUSAND && !abbrForce || abbrForce === "k") {
        abbr += options2.abbrLabel.th;
        value = value / THOUSAND;
      }
    }
    if (~format2.indexOf("[.]")) {
      optDec = true;
      format2 = format2.replace("[.]", ".");
    }
    var int = value.toString().split(".")[0];
    var precision = format2.split(".")[1];
    var thousands = format2.indexOf(",");
    var leadingCount = (format2.split(".")[0].split(",")[0].match(/0/g) || []).length;
    if (precision) {
      if (~precision.indexOf("[")) {
        precision = precision.replace("]", "");
        precision = precision.split("[");
        decimal = toFixed(value, precision[0].length + precision[1].length, roundingFunction, precision[1].length);
      } else {
        decimal = toFixed(value, precision.length, roundingFunction);
      }
      int = decimal.split(".")[0];
      decimal = ~decimal.indexOf(".") ? "." + decimal.split(".")[1] : "";
      if (optDec && +decimal.slice(1) === 0)
        decimal = "";
    } else {
      int = toFixed(value, 0, roundingFunction);
    }
    if (abbr && !abbrForce && +int >= 1e3 && abbr !== ABBR.trillion) {
      int = "" + +int / 1e3;
      abbr = ABBR.million;
    }
    if (~int.indexOf("-")) {
      int = int.slice(1);
      neg = true;
    }
    if (int.length < leadingCount) {
      for (var i2 = leadingCount - int.length; i2 > 0; i2--) {
        int = "0" + int;
      }
    }
    if (thousands > -1) {
      int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    if (!format2.indexOf("."))
      int = "";
    var output = int + decimal + (abbr || "");
    if (negP) {
      output = (negP && neg ? "(" : "") + output + (negP && neg ? ")" : "");
    } else {
      if (signed >= 0) {
        output = signed === 0 ? (neg ? "-" : "+") + output : output + (neg ? "-" : "+");
      } else if (neg) {
        output = "-" + output;
      }
    }
    return output;
  }
  function extend$9(target, sub2) {
    Object.keys(sub2).forEach(function(key) {
      target[key] = sub2[key];
    });
  }
  var numerifyPercent = {
    regexp: /%/,
    format: function format2(value, formatType, roundingFunction, numerify2) {
      var space = ~formatType.indexOf(" %") ? " " : "";
      var output = void 0;
      if (numerify2.options.scalePercentBy100)
        value = value * 100;
      formatType = formatType.replace(/\s?%/, "");
      output = numerify2._numberToFormat(value, formatType, roundingFunction);
      if (~output.indexOf(")")) {
        output = output.split("");
        output.splice(-1, 0, space + "%");
        output = output.join("");
      } else {
        output = output + space + "%";
      }
      return output;
    }
  };
  var options = {};
  var formats = {};
  extend$9(options, DEFAULT_OPTIONS);
  function format$1(value, formatType, roundingFunction) {
    formatType = formatType || options.defaultFormat;
    roundingFunction = roundingFunction || Math.round;
    var output = void 0;
    var formatFunction = void 0;
    if (value === 0 && options.zeroFormat !== null) {
      output = options.zeroFormat;
    } else if (value === null && options.nullFormat !== null) {
      output = options.nullFormat;
    } else {
      for (var kind in formats) {
        if (formats[kind] && formatType.match(formats[kind].regexp)) {
          formatFunction = formats[kind].format;
          break;
        }
      }
      formatFunction = formatFunction || numberToFormat.bind(null, options);
      output = formatFunction(value, formatType, roundingFunction, numerify$2);
    }
    return output;
  }
  function numerify$2(input, formatType, roundingFunction) {
    var value = void 0;
    if (input === 0 || typeof input === "undefined") {
      value = 0;
    } else if (input === null || numIsNaN(input)) {
      value = null;
    } else if (typeof input === "string") {
      if (options.zeroFormat && input === options.zeroFormat) {
        value = 0;
      } else if (options.nullFormat && input === options.nullFormat || !input.replace(/[^0-9]+/g, "").length) {
        value = null;
      } else {
        value = +input;
      }
    } else {
      value = +input || null;
    }
    return format$1(value, formatType, roundingFunction);
  }
  numerify$2.options = options;
  numerify$2._numberToFormat = numberToFormat.bind(null, options);
  numerify$2.register = function(name, format2) {
    formats[name] = format2;
  };
  numerify$2.unregister = function(name) {
    formats[name] = null;
  };
  numerify$2.setOptions = function(opts) {
    extend$9(options, opts);
  };
  numerify$2.reset = function() {
    extend$9(options, DEFAULT_OPTIONS);
  };
  numerify$2.register("percentage", numerifyPercent);
  var index_es$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    "default": numerify$2
  });
  var require$$2 = /* @__PURE__ */ getAugmentedNamespace(index_es$1);
  function debounce(fn, delay) {
    var timer = null;
    return function() {
      var self2 = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(self2, args);
      }, delay);
    };
  }
  function throttle$2(fn, wait, delay) {
    var timer = null;
    var previous = null;
    return function() {
      var self2 = this;
      var args = arguments;
      var now = Date.now();
      if (!previous)
        previous = now;
      if (now - previous > wait) {
        fn.apply(self2, args);
        previous = now;
      } else if (delay) {
        clearTimeout(timer);
        timer = setTimeout(function() {
          fn.apply(self2, args);
        }, delay);
      }
    };
  }
  function set$2(target, path2, value) {
    if (!path2)
      return;
    var targetTemp = target;
    var pathArr = path2.split(".");
    pathArr.forEach(function(item, index2) {
      if (index2 === pathArr.length - 1) {
        targetTemp[item] = value;
      } else {
        if (!targetTemp[item])
          targetTemp[item] = {};
        targetTemp = targetTemp[item];
      }
    });
  }
  function get$1(target, path2, defaultValue) {
    if (!path2)
      return target;
    var pathArr = path2.split(".");
    var targetTemp = target;
    pathArr.some(function(item, index2) {
      if (targetTemp[item] === void 0) {
        targetTemp = defaultValue;
        return true;
      } else {
        targetTemp = targetTemp[item];
      }
    });
    return targetTemp;
  }
  function getStore(name) {
    try {
      return JSON.parse(window.localStorage.getItem(name));
    } catch (e) {
    }
  }
  function setStore(name, data) {
    try {
      window.localStorage.setItem(name, JSON.stringify(data));
    } catch (e) {
    }
  }
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  function getType(v2) {
    return Object.prototype.toString.call(v2);
  }
  function getTypeof(v2) {
    return typeof v2 === "undefined" ? "undefined" : _typeof(v2);
  }
  function isObject$e(v2) {
    return getType(v2) === "[object Object]";
  }
  function isArray$7(v2) {
    return getType(v2) === "[object Array]";
  }
  function isFunction$5(v2) {
    return getType(v2) === "[object Function]";
  }
  function isString$9(v2) {
    return getType(v2) === "[object String]";
  }
  function isBoolean(v2) {
    return getType(v2) === "[object Boolean]";
  }
  function isEmptyObj(v2) {
    return isObject$e(v2) && !Object.keys(v2).length;
  }
  function isNumber(v2) {
    return getType(v2) === "[object Number]";
  }
  function clone$7(v2) {
    if (isObject$e(v2))
      return Object.assign({}, v2);
    if (isArray$7(v2))
      return v2.slice();
  }
  function cloneDeep(v2) {
    return JSON.parse(JSON.stringify(v2));
  }
  function kebabToCamel(s) {
    return s.replace(/-(\w)/g, function(_, c) {
      return c.toUpperCase();
    });
  }
  function camelToKebab(s) {
    return s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function unique(arr) {
    var result = [];
    arr.forEach(function(item) {
      if (!~result.indexOf(item))
        result.push(item);
    });
    return result;
  }
  function getLinearValue(x1, y1, x2, y2, x3) {
    var k = (y2 - y1) / (x2 - x1);
    var b = y1 - x1 * k;
    if (x3 == null) {
      return { k, b };
    } else {
      return x3 * k + b;
    }
  }
  function getFnAndObjValue(target, key) {
    return isFunction$5(target) ? target(key) : !isObject$e(target) ? key : target[key] != null ? target[key] : key;
  }
  function arrDelItem(arr, diffItem) {
    return arr.filter(function(item) {
      return diffItem !== item;
    });
  }
  var arrDelArrItem = function arrDelArrItem2(arr, diffArr) {
    return arr.filter(function(item) {
      return !~diffArr.indexOf(item);
    });
  };
  function getArrMin(arr) {
    return Math.min.apply(null, arr);
  }
  function getArrMax(arr) {
    return Math.max.apply(null, arr);
  }
  function toArray(v2) {
    return Array.prototype.slice.call(v2);
  }
  function noop$2() {
  }
  function hasOwn(source, target) {
    return Object.prototype.hasOwnProperty.call(source, target);
  }
  var extend$8 = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (hasOwn(source, key))
          target[key] = source[key];
      }
    }
    return target;
  };
  function isEqual(alice, bob) {
    if (alice === bob)
      return true;
    if (alice === null || bob === null || getTypeof(alice) !== "object" || getTypeof(bob) !== "object") {
      return alice === bob;
    }
    for (var key in alice) {
      if (!hasOwn(alice, key))
        continue;
      var aliceValue = alice[key];
      var bobValue = bob[key];
      var aliceType = getTypeof(aliceValue);
      if (getTypeof(bobValue) === "undefined") {
        return false;
      } else if (aliceType === "object") {
        if (!isEqual(aliceValue, bobValue))
          return false;
      } else if (aliceValue !== bobValue) {
        return false;
      }
    }
    for (var _key in bob) {
      if (!hasOwn(bob, _key))
        continue;
      if (getTypeof(alice)[_key] === "undefined")
        return false;
    }
    return true;
  }
  var index_es = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    debounce,
    throttle: throttle$2,
    set: set$2,
    get: get$1,
    getStore,
    setStore,
    clone: clone$7,
    cloneDeep,
    getType,
    getTypeof,
    isObject: isObject$e,
    isArray: isArray$7,
    isFunction: isFunction$5,
    isString: isString$9,
    isBoolean,
    isEmptyObj,
    isNumber,
    kebabToCamel,
    camelToKebab,
    unique,
    getLinearValue,
    getFnAndObjValue,
    arrDelItem,
    arrDelArrItem,
    getArrMin,
    getArrMax,
    toArray,
    noop: noop$2,
    extend: extend$8,
    isEqual,
    hasOwn
  });
  var require$$1 = /* @__PURE__ */ getAugmentedNamespace(index_es);
  Object.defineProperty(utils$1, "__esModule", { value: true });
  function _interopDefault$3(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
  }
  var numerify$1 = _interopDefault$3(require$$2);
  var utilsLite$2 = require$$1;
  var getFormated = function getFormated2(val, type, digit) {
    var defaultVal = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "-";
    if (isNaN(val))
      return defaultVal;
    if (!type)
      return val;
    if (utilsLite$2.isFunction(type))
      return type(val, numerify$1);
    digit = isNaN(digit) ? 0 : ++digit;
    var digitStr = ".[" + new Array(digit).join(0) + "]";
    var formatter = type;
    switch (type) {
      case "KMB":
        formatter = digit ? "0,0" + digitStr + "a" : "0,0a";
        break;
      case "normal":
        formatter = digit ? "0,0" + digitStr : "0,0";
        break;
      case "percent":
        formatter = digit ? "0,0" + digitStr + "%" : "0,0.[00]%";
        break;
    }
    return numerify$1(val, formatter);
  };
  var getStackMap = function getStackMap2(stack) {
    var stackMap = {};
    Object.keys(stack).forEach(function(item) {
      stack[item].forEach(function(name) {
        stackMap[name] = item;
      });
    });
    return stackMap;
  };
  var $get = function $get2(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.send(null);
      xhr.onload = function() {
        resolve(JSON.parse(xhr.responseText));
      };
      xhr.onerror = function() {
        reject(JSON.parse(xhr.responseText));
      };
    });
  };
  var mapPromise = {};
  var getMapJSON = function getMapJSON2(_ref) {
    var position = _ref.position, positionJsonLink = _ref.positionJsonLink, beforeRegisterMapOnce = _ref.beforeRegisterMapOnce, mapURLProfix = _ref.mapURLProfix;
    var link = positionJsonLink || "" + mapURLProfix + position + ".json";
    if (!mapPromise[link]) {
      mapPromise[link] = $get(link).then(function(res) {
        if (beforeRegisterMapOnce)
          res = beforeRegisterMapOnce(res);
        return res;
      });
    }
    return mapPromise[link];
  };
  var bmapPromise = null;
  var amapPromise = null;
  var getBmap = function getBmap2(key, v2) {
    if (!bmapPromise) {
      bmapPromise = new Promise(function(resolve, reject) {
        var callbackName = "bmap" + Date.now();
        window[callbackName] = resolve;
        var script = document.createElement("script");
        script.src = ["https://api.map.baidu.com/api?v=" + (v2 || "2.0"), "ak=" + key, "callback=" + callbackName].join("&");
        document.body.appendChild(script);
      });
    }
    return bmapPromise;
  };
  var getAmap = function getAmap2(key, v2) {
    if (!amapPromise) {
      amapPromise = new Promise(function(resolve, reject) {
        var callbackName = "amap" + Date.now();
        window[callbackName] = resolve;
        var script = document.createElement("script");
        script.src = ["https://webapi.amap.com/maps?v=" + (v2 || "1.4.3"), "key=" + key, "callback=" + callbackName].join("&");
        document.body.appendChild(script);
      });
    }
    return amapPromise;
  };
  function setArrayValue(arr, index2, value) {
    if (arr[index2] !== void 0) {
      arr[index2].push(value);
    } else {
      arr[index2] = [value];
    }
  }
  utils$1.getFormated = getFormated;
  utils$1.getStackMap = getStackMap;
  utils$1.$get = $get;
  utils$1.getMapJSON = getMapJSON;
  utils$1.getBmap = getBmap;
  utils$1.getAmap = getAmap;
  utils$1.setArrayValue = setArrayValue;
  var echarts$d = {};
  var zrender$1 = {};
  var idStart = 2311;
  function _default$1N() {
    return idStart++;
  }
  var guid$2 = _default$1N;
  var env$d = {};
  if (typeof wx === "object" && typeof wx.getSystemInfoSync === "function") {
    env$d = {
      browser: {},
      os: {},
      node: false,
      wxa: true,
      canvasSupported: true,
      svgSupported: false,
      touchEventsSupported: true,
      domSupported: false
    };
  } else if (typeof document === "undefined" && typeof self !== "undefined") {
    env$d = {
      browser: {},
      os: {},
      node: false,
      worker: true,
      canvasSupported: true,
      domSupported: false
    };
  } else if (typeof navigator === "undefined") {
    env$d = {
      browser: {},
      os: {},
      node: true,
      worker: false,
      canvasSupported: true,
      svgSupported: true,
      domSupported: false
    };
  } else {
    env$d = detect(navigator.userAgent);
  }
  var _default$1M = env$d;
  function detect(ua) {
    var os = {};
    var browser = {};
    var firefox = ua.match(/Firefox\/([\d.]+)/);
    var ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/.+?rv:(([\d.]+))/);
    var edge = ua.match(/Edge\/([\d.]+)/);
    var weChat = /micromessenger/i.test(ua);
    if (firefox) {
      browser.firefox = true;
      browser.version = firefox[1];
    }
    if (ie) {
      browser.ie = true;
      browser.version = ie[1];
    }
    if (edge) {
      browser.edge = true;
      browser.version = edge[1];
    }
    if (weChat) {
      browser.weChat = true;
    }
    return {
      browser,
      os,
      node: false,
      canvasSupported: !!document.createElement("canvas").getContext,
      svgSupported: typeof SVGRect !== "undefined",
      touchEventsSupported: "ontouchstart" in window && !browser.ie && !browser.edge,
      pointerEventsSupported: "onpointerdown" in window && (browser.edge || browser.ie && browser.version >= 11),
      domSupported: typeof document !== "undefined"
    };
  }
  var env_1 = _default$1M;
  var util$6 = {};
  var BUILTIN_OBJECT = {
    "[object Function]": 1,
    "[object RegExp]": 1,
    "[object Date]": 1,
    "[object Error]": 1,
    "[object CanvasGradient]": 1,
    "[object CanvasPattern]": 1,
    "[object Image]": 1,
    "[object Canvas]": 1
  };
  var TYPED_ARRAY = {
    "[object Int8Array]": 1,
    "[object Uint8Array]": 1,
    "[object Uint8ClampedArray]": 1,
    "[object Int16Array]": 1,
    "[object Uint16Array]": 1,
    "[object Int32Array]": 1,
    "[object Uint32Array]": 1,
    "[object Float32Array]": 1,
    "[object Float64Array]": 1
  };
  var objToString = Object.prototype.toString;
  var arrayProto = Array.prototype;
  var nativeForEach = arrayProto.forEach;
  var nativeFilter = arrayProto.filter;
  var nativeSlice = arrayProto.slice;
  var nativeMap = arrayProto.map;
  var nativeReduce = arrayProto.reduce;
  var methods$1 = {};
  function $override$1(name, fn) {
    if (name === "createCanvas") {
      _ctx = null;
    }
    methods$1[name] = fn;
  }
  function clone$6(source) {
    if (source == null || typeof source !== "object") {
      return source;
    }
    var result = source;
    var typeStr = objToString.call(source);
    if (typeStr === "[object Array]") {
      if (!isPrimitive(source)) {
        result = [];
        for (var i2 = 0, len2 = source.length; i2 < len2; i2++) {
          result[i2] = clone$6(source[i2]);
        }
      }
    } else if (TYPED_ARRAY[typeStr]) {
      if (!isPrimitive(source)) {
        var Ctor = source.constructor;
        if (source.constructor.from) {
          result = Ctor.from(source);
        } else {
          result = new Ctor(source.length);
          for (var i2 = 0, len2 = source.length; i2 < len2; i2++) {
            result[i2] = clone$6(source[i2]);
          }
        }
      }
    } else if (!BUILTIN_OBJECT[typeStr] && !isPrimitive(source) && !isDom(source)) {
      result = {};
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          result[key] = clone$6(source[key]);
        }
      }
    }
    return result;
  }
  function merge$2(target, source, overwrite) {
    if (!isObject$d(source) || !isObject$d(target)) {
      return overwrite ? clone$6(source) : target;
    }
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        var targetProp = target[key];
        var sourceProp = source[key];
        if (isObject$d(sourceProp) && isObject$d(targetProp) && !isArray$6(sourceProp) && !isArray$6(targetProp) && !isDom(sourceProp) && !isDom(targetProp) && !isBuiltInObject(sourceProp) && !isBuiltInObject(targetProp) && !isPrimitive(sourceProp) && !isPrimitive(targetProp)) {
          merge$2(targetProp, sourceProp, overwrite);
        } else if (overwrite || !(key in target)) {
          target[key] = clone$6(source[key]);
        }
      }
    }
    return target;
  }
  function mergeAll(targetAndSources, overwrite) {
    var result = targetAndSources[0];
    for (var i2 = 1, len2 = targetAndSources.length; i2 < len2; i2++) {
      result = merge$2(result, targetAndSources[i2], overwrite);
    }
    return result;
  }
  function extend$7(target, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
    return target;
  }
  function defaults$3(target, source, overlay) {
    for (var key in source) {
      if (source.hasOwnProperty(key) && (overlay ? source[key] != null : target[key] == null)) {
        target[key] = source[key];
      }
    }
    return target;
  }
  var createCanvas = function() {
    return methods$1.createCanvas();
  };
  methods$1.createCanvas = function() {
    return document.createElement("canvas");
  };
  var _ctx;
  function getContext$1() {
    if (!_ctx) {
      _ctx = createCanvas().getContext("2d");
    }
    return _ctx;
  }
  function indexOf$3(array, value) {
    if (array) {
      if (array.indexOf) {
        return array.indexOf(value);
      }
      for (var i2 = 0, len2 = array.length; i2 < len2; i2++) {
        if (array[i2] === value) {
          return i2;
        }
      }
    }
    return -1;
  }
  function inherits$1(clazz2, baseClazz) {
    var clazzPrototype = clazz2.prototype;
    function F() {
    }
    F.prototype = baseClazz.prototype;
    clazz2.prototype = new F();
    for (var prop2 in clazzPrototype) {
      if (clazzPrototype.hasOwnProperty(prop2)) {
        clazz2.prototype[prop2] = clazzPrototype[prop2];
      }
    }
    clazz2.prototype.constructor = clazz2;
    clazz2.superClass = baseClazz;
  }
  function mixin$2(target, source, overlay) {
    target = "prototype" in target ? target.prototype : target;
    source = "prototype" in source ? source.prototype : source;
    defaults$3(target, source, overlay);
  }
  function isArrayLike$3(data) {
    if (!data) {
      return;
    }
    if (typeof data === "string") {
      return false;
    }
    return typeof data.length === "number";
  }
  function each$r(obj, cb, context) {
    if (!(obj && cb)) {
      return;
    }
    if (obj.forEach && obj.forEach === nativeForEach) {
      obj.forEach(cb, context);
    } else if (obj.length === +obj.length) {
      for (var i2 = 0, len2 = obj.length; i2 < len2; i2++) {
        cb.call(context, obj[i2], i2, obj);
      }
    } else {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          cb.call(context, obj[key], key, obj);
        }
      }
    }
  }
  function map$9(obj, cb, context) {
    if (!(obj && cb)) {
      return;
    }
    if (obj.map && obj.map === nativeMap) {
      return obj.map(cb, context);
    } else {
      var result = [];
      for (var i2 = 0, len2 = obj.length; i2 < len2; i2++) {
        result.push(cb.call(context, obj[i2], i2, obj));
      }
      return result;
    }
  }
  function reduce(obj, cb, memo, context) {
    if (!(obj && cb)) {
      return;
    }
    if (obj.reduce && obj.reduce === nativeReduce) {
      return obj.reduce(cb, memo, context);
    } else {
      for (var i2 = 0, len2 = obj.length; i2 < len2; i2++) {
        memo = cb.call(context, memo, obj[i2], i2, obj);
      }
      return memo;
    }
  }
  function filter$1(obj, cb, context) {
    if (!(obj && cb)) {
      return;
    }
    if (obj.filter && obj.filter === nativeFilter) {
      return obj.filter(cb, context);
    } else {
      var result = [];
      for (var i2 = 0, len2 = obj.length; i2 < len2; i2++) {
        if (cb.call(context, obj[i2], i2, obj)) {
          result.push(obj[i2]);
        }
      }
      return result;
    }
  }
  function find(obj, cb, context) {
    if (!(obj && cb)) {
      return;
    }
    for (var i2 = 0, len2 = obj.length; i2 < len2; i2++) {
      if (cb.call(context, obj[i2], i2, obj)) {
        return obj[i2];
      }
    }
  }
  function bind$2(func, context) {
    var args = nativeSlice.call(arguments, 2);
    return function() {
      return func.apply(context, args.concat(nativeSlice.call(arguments)));
    };
  }
  function curry$3(func) {
    var args = nativeSlice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(nativeSlice.call(arguments)));
    };
  }
  function isArray$6(value) {
    return objToString.call(value) === "[object Array]";
  }
  function isFunction$4(value) {
    return typeof value === "function";
  }
  function isString$8(value) {
    return objToString.call(value) === "[object String]";
  }
  function isObject$d(value) {
    var type = typeof value;
    return type === "function" || !!value && type === "object";
  }
  function isBuiltInObject(value) {
    return !!BUILTIN_OBJECT[objToString.call(value)];
  }
  function isTypedArray$2(value) {
    return !!TYPED_ARRAY[objToString.call(value)];
  }
  function isDom(value) {
    return typeof value === "object" && typeof value.nodeType === "number" && typeof value.ownerDocument === "object";
  }
  function eqNaN(value) {
    return value !== value;
  }
  function retrieve$1(values) {
    for (var i2 = 0, len2 = arguments.length; i2 < len2; i2++) {
      if (arguments[i2] != null) {
        return arguments[i2];
      }
    }
  }
  function retrieve2$2(value0, value1) {
    return value0 != null ? value0 : value1;
  }
  function retrieve3$2(value0, value1, value2) {
    return value0 != null ? value0 : value1 != null ? value1 : value2;
  }
  function slice() {
    return Function.call.apply(nativeSlice, arguments);
  }
  function normalizeCssArray$2(val) {
    if (typeof val === "number") {
      return [val, val, val, val];
    }
    var len2 = val.length;
    if (len2 === 2) {
      return [val[0], val[1], val[0], val[1]];
    } else if (len2 === 3) {
      return [val[0], val[1], val[2], val[1]];
    }
    return val;
  }
  function assert$1(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }
  function trim$2(str) {
    if (str == null) {
      return null;
    } else if (typeof str.trim === "function") {
      return str.trim();
    } else {
      return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }
  }
  var primitiveKey = "__ec_primitive__";
  function setAsPrimitive(obj) {
    obj[primitiveKey] = true;
  }
  function isPrimitive(obj) {
    return obj[primitiveKey];
  }
  function HashMap(obj) {
    var isArr = isArray$6(obj);
    this.data = {};
    var thisMap = this;
    obj instanceof HashMap ? obj.each(visit) : obj && each$r(obj, visit);
    function visit(value, key) {
      isArr ? thisMap.set(value, key) : thisMap.set(key, value);
    }
  }
  HashMap.prototype = {
    constructor: HashMap,
    get: function(key) {
      return this.data.hasOwnProperty(key) ? this.data[key] : null;
    },
    set: function(key, value) {
      return this.data[key] = value;
    },
    each: function(cb, context) {
      context !== void 0 && (cb = bind$2(cb, context));
      for (var key in this.data) {
        this.data.hasOwnProperty(key) && cb(this.data[key], key);
      }
    },
    removeKey: function(key) {
      delete this.data[key];
    }
  };
  function createHashMap$a(obj) {
    return new HashMap(obj);
  }
  function concatArray(a, b) {
    var newArray = new a.constructor(a.length + b.length);
    for (var i2 = 0; i2 < a.length; i2++) {
      newArray[i2] = a[i2];
    }
    var offset = a.length;
    for (i2 = 0; i2 < b.length; i2++) {
      newArray[i2 + offset] = b[i2];
    }
    return newArray;
  }
  function noop$1() {
  }
  util$6.$override = $override$1;
  util$6.clone = clone$6;
  util$6.merge = merge$2;
  util$6.mergeAll = mergeAll;
  util$6.extend = extend$7;
  util$6.defaults = defaults$3;
  util$6.createCanvas = createCanvas;
  util$6.getContext = getContext$1;
  util$6.indexOf = indexOf$3;
  util$6.inherits = inherits$1;
  util$6.mixin = mixin$2;
  util$6.isArrayLike = isArrayLike$3;
  util$6.each = each$r;
  util$6.map = map$9;
  util$6.reduce = reduce;
  util$6.filter = filter$1;
  util$6.find = find;
  util$6.bind = bind$2;
  util$6.curry = curry$3;
  util$6.isArray = isArray$6;
  util$6.isFunction = isFunction$4;
  util$6.isString = isString$8;
  util$6.isObject = isObject$d;
  util$6.isBuiltInObject = isBuiltInObject;
  util$6.isTypedArray = isTypedArray$2;
  util$6.isDom = isDom;
  util$6.eqNaN = eqNaN;
  util$6.retrieve = retrieve$1;
  util$6.retrieve2 = retrieve2$2;
  util$6.retrieve3 = retrieve3$2;
  util$6.slice = slice;
  util$6.normalizeCssArray = normalizeCssArray$2;
  util$6.assert = assert$1;
  util$6.trim = trim$2;
  util$6.setAsPrimitive = setAsPrimitive;
  util$6.isPrimitive = isPrimitive;
  util$6.createHashMap = createHashMap$a;
  util$6.concatArray = concatArray;
  util$6.noop = noop$1;
  var vector$3 = {};
  var ArrayCtor$1 = typeof Float32Array === "undefined" ? Array : Float32Array;
  function create$1(x, y) {
    var out2 = new ArrayCtor$1(2);
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    out2[0] = x;
    out2[1] = y;
    return out2;
  }
  function copy$1(out2, v2) {
    out2[0] = v2[0];
    out2[1] = v2[1];
    return out2;
  }
  function clone$5(v2) {
    var out2 = new ArrayCtor$1(2);
    out2[0] = v2[0];
    out2[1] = v2[1];
    return out2;
  }
  function set$1(out2, a, b) {
    out2[0] = a;
    out2[1] = b;
    return out2;
  }
  function add(out2, v1, v2) {
    out2[0] = v1[0] + v2[0];
    out2[1] = v1[1] + v2[1];
    return out2;
  }
  function scaleAndAdd$1(out2, v1, v2, a) {
    out2[0] = v1[0] + v2[0] * a;
    out2[1] = v1[1] + v2[1] * a;
    return out2;
  }
  function sub(out2, v1, v2) {
    out2[0] = v1[0] - v2[0];
    out2[1] = v1[1] - v2[1];
    return out2;
  }
  function len(v2) {
    return Math.sqrt(lenSquare(v2));
  }
  var length = len;
  function lenSquare(v2) {
    return v2[0] * v2[0] + v2[1] * v2[1];
  }
  var lengthSquare = lenSquare;
  function mul$1(out2, v1, v2) {
    out2[0] = v1[0] * v2[0];
    out2[1] = v1[1] * v2[1];
    return out2;
  }
  function div(out2, v1, v2) {
    out2[0] = v1[0] / v2[0];
    out2[1] = v1[1] / v2[1];
    return out2;
  }
  function dot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1];
  }
  function scale$1(out2, v2, s) {
    out2[0] = v2[0] * s;
    out2[1] = v2[1] * s;
    return out2;
  }
  function normalize(out2, v2) {
    var d = len(v2);
    if (d === 0) {
      out2[0] = 0;
      out2[1] = 0;
    } else {
      out2[0] = v2[0] / d;
      out2[1] = v2[1] / d;
    }
    return out2;
  }
  function distance(v1, v2) {
    return Math.sqrt((v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]));
  }
  var dist$1 = distance;
  function distanceSquare(v1, v2) {
    return (v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]);
  }
  var distSquare = distanceSquare;
  function negate(out2, v2) {
    out2[0] = -v2[0];
    out2[1] = -v2[1];
    return out2;
  }
  function lerp$1(out2, v1, v2, t) {
    out2[0] = v1[0] + t * (v2[0] - v1[0]);
    out2[1] = v1[1] + t * (v2[1] - v1[1]);
    return out2;
  }
  function applyTransform$1(out2, v2, m2) {
    var x = v2[0];
    var y = v2[1];
    out2[0] = m2[0] * x + m2[2] * y + m2[4];
    out2[1] = m2[1] * x + m2[3] * y + m2[5];
    return out2;
  }
  function min$1(out2, v1, v2) {
    out2[0] = Math.min(v1[0], v2[0]);
    out2[1] = Math.min(v1[1], v2[1]);
    return out2;
  }
  function max$1(out2, v1, v2) {
    out2[0] = Math.max(v1[0], v2[0]);
    out2[1] = Math.max(v1[1], v2[1]);
    return out2;
  }
  vector$3.create = create$1;
  vector$3.copy = copy$1;
  vector$3.clone = clone$5;
  vector$3.set = set$1;
  vector$3.add = add;
  vector$3.scaleAndAdd = scaleAndAdd$1;
  vector$3.sub = sub;
  vector$3.len = len;
  vector$3.length = length;
  vector$3.lenSquare = lenSquare;
  vector$3.lengthSquare = lengthSquare;
  vector$3.mul = mul$1;
  vector$3.div = div;
  vector$3.dot = dot;
  vector$3.scale = scale$1;
  vector$3.normalize = normalize;
  vector$3.distance = distance;
  vector$3.dist = dist$1;
  vector$3.distanceSquare = distanceSquare;
  vector$3.distSquare = distSquare;
  vector$3.negate = negate;
  vector$3.lerp = lerp$1;
  vector$3.applyTransform = applyTransform$1;
  vector$3.min = min$1;
  vector$3.max = max$1;
  function Draggable$1() {
    this.on("mousedown", this._dragStart, this);
    this.on("mousemove", this._drag, this);
    this.on("mouseup", this._dragEnd, this);
  }
  Draggable$1.prototype = {
    constructor: Draggable$1,
    _dragStart: function(e) {
      var draggingTarget = e.target;
      while (draggingTarget && !draggingTarget.draggable) {
        draggingTarget = draggingTarget.parent;
      }
      if (draggingTarget) {
        this._draggingTarget = draggingTarget;
        draggingTarget.dragging = true;
        this._x = e.offsetX;
        this._y = e.offsetY;
        this.dispatchToElement(param(draggingTarget, e), "dragstart", e.event);
      }
    },
    _drag: function(e) {
      var draggingTarget = this._draggingTarget;
      if (draggingTarget) {
        var x = e.offsetX;
        var y = e.offsetY;
        var dx = x - this._x;
        var dy = y - this._y;
        this._x = x;
        this._y = y;
        draggingTarget.drift(dx, dy, e);
        this.dispatchToElement(param(draggingTarget, e), "drag", e.event);
        var dropTarget = this.findHover(x, y, draggingTarget).target;
        var lastDropTarget = this._dropTarget;
        this._dropTarget = dropTarget;
        if (draggingTarget !== dropTarget) {
          if (lastDropTarget && dropTarget !== lastDropTarget) {
            this.dispatchToElement(param(lastDropTarget, e), "dragleave", e.event);
          }
          if (dropTarget && dropTarget !== lastDropTarget) {
            this.dispatchToElement(param(dropTarget, e), "dragenter", e.event);
          }
        }
      }
    },
    _dragEnd: function(e) {
      var draggingTarget = this._draggingTarget;
      if (draggingTarget) {
        draggingTarget.dragging = false;
      }
      this.dispatchToElement(param(draggingTarget, e), "dragend", e.event);
      if (this._dropTarget) {
        this.dispatchToElement(param(this._dropTarget, e), "drop", e.event);
      }
      this._draggingTarget = null;
      this._dropTarget = null;
    }
  };
  function param(target, e) {
    return {
      target,
      topTarget: e && e.topTarget
    };
  }
  var _default$1L = Draggable$1;
  var Draggable_1 = _default$1L;
  var arrySlice = Array.prototype.slice;
  var Eventful$4 = function(eventProcessor) {
    this._$handlers = {};
    this._$eventProcessor = eventProcessor;
  };
  Eventful$4.prototype = {
    constructor: Eventful$4,
    one: function(event2, query, handler, context) {
      return on(this, event2, query, handler, context, true);
    },
    on: function(event2, query, handler, context) {
      return on(this, event2, query, handler, context, false);
    },
    isSilent: function(event2) {
      var _h = this._$handlers;
      return !_h[event2] || !_h[event2].length;
    },
    off: function(event2, handler) {
      var _h = this._$handlers;
      if (!event2) {
        this._$handlers = {};
        return this;
      }
      if (handler) {
        if (_h[event2]) {
          var newList = [];
          for (var i2 = 0, l = _h[event2].length; i2 < l; i2++) {
            if (_h[event2][i2].h !== handler) {
              newList.push(_h[event2][i2]);
            }
          }
          _h[event2] = newList;
        }
        if (_h[event2] && _h[event2].length === 0) {
          delete _h[event2];
        }
      } else {
        delete _h[event2];
      }
      return this;
    },
    trigger: function(type) {
      var _h = this._$handlers[type];
      var eventProcessor = this._$eventProcessor;
      if (_h) {
        var args = arguments;
        var argLen = args.length;
        if (argLen > 3) {
          args = arrySlice.call(args, 1);
        }
        var len2 = _h.length;
        for (var i2 = 0; i2 < len2; ) {
          var hItem = _h[i2];
          if (eventProcessor && eventProcessor.filter && hItem.query != null && !eventProcessor.filter(type, hItem.query)) {
            i2++;
            continue;
          }
          switch (argLen) {
            case 1:
              hItem.h.call(hItem.ctx);
              break;
            case 2:
              hItem.h.call(hItem.ctx, args[1]);
              break;
            case 3:
              hItem.h.call(hItem.ctx, args[1], args[2]);
              break;
            default:
              hItem.h.apply(hItem.ctx, args);
              break;
          }
          if (hItem.one) {
            _h.splice(i2, 1);
            len2--;
          } else {
            i2++;
          }
        }
      }
      eventProcessor && eventProcessor.afterTrigger && eventProcessor.afterTrigger(type);
      return this;
    },
    triggerWithContext: function(type) {
      var _h = this._$handlers[type];
      var eventProcessor = this._$eventProcessor;
      if (_h) {
        var args = arguments;
        var argLen = args.length;
        if (argLen > 4) {
          args = arrySlice.call(args, 1, args.length - 1);
        }
        var ctx = args[args.length - 1];
        var len2 = _h.length;
        for (var i2 = 0; i2 < len2; ) {
          var hItem = _h[i2];
          if (eventProcessor && eventProcessor.filter && hItem.query != null && !eventProcessor.filter(type, hItem.query)) {
            i2++;
            continue;
          }
          switch (argLen) {
            case 1:
              hItem.h.call(ctx);
              break;
            case 2:
              hItem.h.call(ctx, args[1]);
              break;
            case 3:
              hItem.h.call(ctx, args[1], args[2]);
              break;
            default:
              hItem.h.apply(ctx, args);
              break;
          }
          if (hItem.one) {
            _h.splice(i2, 1);
            len2--;
          } else {
            i2++;
          }
        }
      }
      eventProcessor && eventProcessor.afterTrigger && eventProcessor.afterTrigger(type);
      return this;
    }
  };
  function normalizeQuery(host, query) {
    var eventProcessor = host._$eventProcessor;
    if (query != null && eventProcessor && eventProcessor.normalizeQuery) {
      query = eventProcessor.normalizeQuery(query);
    }
    return query;
  }
  function on(eventful, event2, query, handler, context, isOnce) {
    var _h = eventful._$handlers;
    if (typeof query === "function") {
      context = handler;
      handler = query;
      query = null;
    }
    if (!handler || !event2) {
      return eventful;
    }
    query = normalizeQuery(eventful, query);
    if (!_h[event2]) {
      _h[event2] = [];
    }
    for (var i2 = 0; i2 < _h[event2].length; i2++) {
      if (_h[event2][i2].h === handler) {
        return eventful;
      }
    }
    var wrap = {
      h: handler,
      one: isOnce,
      query,
      ctx: context || eventful,
      callAtLast: handler.zrEventfulCallAtLast
    };
    var lastIndex = _h[event2].length - 1;
    var lastWrap = _h[event2][lastIndex];
    lastWrap && lastWrap.callAtLast ? _h[event2].splice(lastIndex, 0, wrap) : _h[event2].push(wrap);
    return eventful;
  }
  var _default$1K = Eventful$4;
  var Eventful_1 = _default$1K;
  var event = {};
  var dom = {};
  var fourPointsTransform = {};
  var LN2 = Math.log(2);
  function determinant(rows, rank, rowStart, rowMask, colMask, detCache) {
    var cacheKey = rowMask + "-" + colMask;
    var fullRank = rows.length;
    if (detCache.hasOwnProperty(cacheKey)) {
      return detCache[cacheKey];
    }
    if (rank === 1) {
      var colStart = Math.round(Math.log((1 << fullRank) - 1 & ~colMask) / LN2);
      return rows[rowStart][colStart];
    }
    var subRowMask = rowMask | 1 << rowStart;
    var subRowStart = rowStart + 1;
    while (rowMask & 1 << subRowStart) {
      subRowStart++;
    }
    var sum = 0;
    for (var j = 0, colLocalIdx = 0; j < fullRank; j++) {
      var colTag = 1 << j;
      if (!(colTag & colMask)) {
        sum += (colLocalIdx % 2 ? -1 : 1) * rows[rowStart][j] * determinant(rows, rank - 1, subRowStart, subRowMask, colMask | colTag, detCache);
        colLocalIdx++;
      }
    }
    detCache[cacheKey] = sum;
    return sum;
  }
  function buildTransformer$1(src, dest) {
    var mA = [[src[0], src[1], 1, 0, 0, 0, -dest[0] * src[0], -dest[0] * src[1]], [0, 0, 0, src[0], src[1], 1, -dest[1] * src[0], -dest[1] * src[1]], [src[2], src[3], 1, 0, 0, 0, -dest[2] * src[2], -dest[2] * src[3]], [0, 0, 0, src[2], src[3], 1, -dest[3] * src[2], -dest[3] * src[3]], [src[4], src[5], 1, 0, 0, 0, -dest[4] * src[4], -dest[4] * src[5]], [0, 0, 0, src[4], src[5], 1, -dest[5] * src[4], -dest[5] * src[5]], [src[6], src[7], 1, 0, 0, 0, -dest[6] * src[6], -dest[6] * src[7]], [0, 0, 0, src[6], src[7], 1, -dest[7] * src[6], -dest[7] * src[7]]];
    var detCache = {};
    var det = determinant(mA, 8, 0, 0, 0, detCache);
    if (det === 0) {
      return;
    }
    var vh = [];
    for (var i2 = 0; i2 < 8; i2++) {
      for (var j = 0; j < 8; j++) {
        vh[j] == null && (vh[j] = 0);
        vh[j] += ((i2 + j) % 2 ? -1 : 1) * determinant(mA, 7, i2 === 0 ? 1 : 0, 1 << i2, 1 << j, detCache) / det * dest[i2];
      }
    }
    return function(out2, srcPointX, srcPointY) {
      var pk = srcPointX * vh[6] + srcPointY * vh[7] + 1;
      out2[0] = (srcPointX * vh[0] + srcPointY * vh[1] + vh[2]) / pk;
      out2[1] = (srcPointX * vh[3] + srcPointY * vh[4] + vh[5]) / pk;
    };
  }
  fourPointsTransform.buildTransformer = buildTransformer$1;
  var env$c = env_1;
  var _fourPointsTransform = fourPointsTransform;
  var buildTransformer = _fourPointsTransform.buildTransformer;
  var EVENT_SAVED_PROP = "___zrEVENTSAVED";
  var _calcOut$1 = [];
  function transformLocalCoord(out2, elFrom, elTarget, inX, inY) {
    return transformCoordWithViewport$1(_calcOut$1, elFrom, inX, inY, true) && transformCoordWithViewport$1(out2, elTarget, _calcOut$1[0], _calcOut$1[1]);
  }
  function transformCoordWithViewport$1(out2, el, inX, inY, inverse) {
    if (el.getBoundingClientRect && env$c.domSupported && !isCanvasEl$1(el)) {
      var saved = el[EVENT_SAVED_PROP] || (el[EVENT_SAVED_PROP] = {});
      var markers = prepareCoordMarkers(el, saved);
      var transformer = preparePointerTransformer(markers, saved, inverse);
      if (transformer) {
        transformer(out2, inX, inY);
        return true;
      }
    }
    return false;
  }
  function prepareCoordMarkers(el, saved) {
    var markers = saved.markers;
    if (markers) {
      return markers;
    }
    markers = saved.markers = [];
    var propLR = ["left", "right"];
    var propTB = ["top", "bottom"];
    for (var i2 = 0; i2 < 4; i2++) {
      var marker = document.createElement("div");
      var stl = marker.style;
      var idxLR = i2 % 2;
      var idxTB = (i2 >> 1) % 2;
      stl.cssText = [
        "position: absolute",
        "visibility: hidden",
        "padding: 0",
        "margin: 0",
        "border-width: 0",
        "user-select: none",
        "width:0",
        "height:0",
        propLR[idxLR] + ":0",
        propTB[idxTB] + ":0",
        propLR[1 - idxLR] + ":auto",
        propTB[1 - idxTB] + ":auto",
        ""
      ].join("!important;");
      el.appendChild(marker);
      markers.push(marker);
    }
    return markers;
  }
  function preparePointerTransformer(markers, saved, inverse) {
    var transformerName = inverse ? "invTrans" : "trans";
    var transformer = saved[transformerName];
    var oldSrcCoords = saved.srcCoords;
    var oldCoordTheSame = true;
    var srcCoords = [];
    var destCoords = [];
    for (var i2 = 0; i2 < 4; i2++) {
      var rect = markers[i2].getBoundingClientRect();
      var ii = 2 * i2;
      var x = rect.left;
      var y = rect.top;
      srcCoords.push(x, y);
      oldCoordTheSame = oldCoordTheSame && oldSrcCoords && x === oldSrcCoords[ii] && y === oldSrcCoords[ii + 1];
      destCoords.push(markers[i2].offsetLeft, markers[i2].offsetTop);
    }
    return oldCoordTheSame && transformer ? transformer : (saved.srcCoords = srcCoords, saved[transformerName] = inverse ? buildTransformer(destCoords, srcCoords) : buildTransformer(srcCoords, destCoords));
  }
  function isCanvasEl$1(el) {
    return el.nodeName.toUpperCase() === "CANVAS";
  }
  dom.transformLocalCoord = transformLocalCoord;
  dom.transformCoordWithViewport = transformCoordWithViewport$1;
  dom.isCanvasEl = isCanvasEl$1;
  var Eventful$3 = Eventful_1;
  event.Dispatcher = Eventful$3;
  var env$b = env_1;
  var _dom = dom;
  var isCanvasEl = _dom.isCanvasEl;
  var transformCoordWithViewport = _dom.transformCoordWithViewport;
  var isDomLevel2 = typeof window !== "undefined" && !!window.addEventListener;
  var MOUSE_EVENT_REG = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;
  var _calcOut = [];
  function clientToLocal(el, e, out2, calculate) {
    out2 = out2 || {};
    if (calculate || !env$b.canvasSupported) {
      calculateZrXY(el, e, out2);
    } else if (env$b.browser.firefox && e.layerX != null && e.layerX !== e.offsetX) {
      out2.zrX = e.layerX;
      out2.zrY = e.layerY;
    } else if (e.offsetX != null) {
      out2.zrX = e.offsetX;
      out2.zrY = e.offsetY;
    } else {
      calculateZrXY(el, e, out2);
    }
    return out2;
  }
  function calculateZrXY(el, e, out2) {
    if (env$b.domSupported && el.getBoundingClientRect) {
      var ex = e.clientX;
      var ey = e.clientY;
      if (isCanvasEl(el)) {
        var box2 = el.getBoundingClientRect();
        out2.zrX = ex - box2.left;
        out2.zrY = ey - box2.top;
        return;
      } else {
        if (transformCoordWithViewport(_calcOut, el, ex, ey)) {
          out2.zrX = _calcOut[0];
          out2.zrY = _calcOut[1];
          return;
        }
      }
    }
    out2.zrX = out2.zrY = 0;
  }
  function getNativeEvent$1(e) {
    return e || window.event;
  }
  function normalizeEvent$1(el, e, calculate) {
    e = getNativeEvent$1(e);
    if (e.zrX != null) {
      return e;
    }
    var eventType = e.type;
    var isTouch = eventType && eventType.indexOf("touch") >= 0;
    if (!isTouch) {
      clientToLocal(el, e, e, calculate);
      e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
    } else {
      var touch = eventType !== "touchend" ? e.targetTouches[0] : e.changedTouches[0];
      touch && clientToLocal(el, touch, e, calculate);
    }
    var button = e.button;
    if (e.which == null && button !== void 0 && MOUSE_EVENT_REG.test(e.type)) {
      e.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
    }
    return e;
  }
  function addEventListener$1(el, name, handler, opt) {
    if (isDomLevel2) {
      el.addEventListener(name, handler, opt);
    } else {
      el.attachEvent("on" + name, handler);
    }
  }
  function removeEventListener$1(el, name, handler, opt) {
    if (isDomLevel2) {
      el.removeEventListener(name, handler, opt);
    } else {
      el.detachEvent("on" + name, handler);
    }
  }
  var stop = isDomLevel2 ? function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.cancelBubble = true;
  } : function(e) {
    e.returnValue = false;
    e.cancelBubble = true;
  };
  function isMiddleOrRightButtonOnMouseUpDown(e) {
    return e.which === 2 || e.which === 3;
  }
  function notLeftMouse(e) {
    return e.which > 1;
  }
  event.clientToLocal = clientToLocal;
  event.getNativeEvent = getNativeEvent$1;
  event.normalizeEvent = normalizeEvent$1;
  event.addEventListener = addEventListener$1;
  event.removeEventListener = removeEventListener$1;
  event.stop = stop;
  event.isMiddleOrRightButtonOnMouseUpDown = isMiddleOrRightButtonOnMouseUpDown;
  event.notLeftMouse = notLeftMouse;
  var eventUtil$1 = event;
  var GestureMgr$1 = function() {
    this._track = [];
  };
  GestureMgr$1.prototype = {
    constructor: GestureMgr$1,
    recognize: function(event2, target, root) {
      this._doTrack(event2, target, root);
      return this._recognize(event2);
    },
    clear: function() {
      this._track.length = 0;
      return this;
    },
    _doTrack: function(event2, target, root) {
      var touches = event2.touches;
      if (!touches) {
        return;
      }
      var trackItem = {
        points: [],
        touches: [],
        target,
        event: event2
      };
      for (var i2 = 0, len2 = touches.length; i2 < len2; i2++) {
        var touch = touches[i2];
        var pos = eventUtil$1.clientToLocal(root, touch, {});
        trackItem.points.push([pos.zrX, pos.zrY]);
        trackItem.touches.push(touch);
      }
      this._track.push(trackItem);
    },
    _recognize: function(event2) {
      for (var eventName in recognizers) {
        if (recognizers.hasOwnProperty(eventName)) {
          var gestureInfo = recognizers[eventName](this._track, event2);
          if (gestureInfo) {
            return gestureInfo;
          }
        }
      }
    }
  };
  function dist(pointPair) {
    var dx = pointPair[1][0] - pointPair[0][0];
    var dy = pointPair[1][1] - pointPair[0][1];
    return Math.sqrt(dx * dx + dy * dy);
  }
  function center(pointPair) {
    return [(pointPair[0][0] + pointPair[1][0]) / 2, (pointPair[0][1] + pointPair[1][1]) / 2];
  }
  var recognizers = {
    pinch: function(track, event2) {
      var trackLen = track.length;
      if (!trackLen) {
        return;
      }
      var pinchEnd = (track[trackLen - 1] || {}).points;
      var pinchPre = (track[trackLen - 2] || {}).points || pinchEnd;
      if (pinchPre && pinchPre.length > 1 && pinchEnd && pinchEnd.length > 1) {
        var pinchScale = dist(pinchEnd) / dist(pinchPre);
        !isFinite(pinchScale) && (pinchScale = 1);
        event2.pinchScale = pinchScale;
        var pinchCenter = center(pinchEnd);
        event2.pinchX = pinchCenter[0];
        event2.pinchY = pinchCenter[1];
        return {
          type: "pinch",
          target: track[0].target,
          event: event2
        };
      }
    }
  };
  var _default$1J = GestureMgr$1;
  var GestureMgr_1 = _default$1J;
  var util$5 = util$6;
  var vec2$6 = vector$3;
  var Draggable = Draggable_1;
  var Eventful$2 = Eventful_1;
  var eventTool$1 = event;
  var GestureMgr = GestureMgr_1;
  var SILENT = "silent";
  function makeEventPacket(eveType, targetInfo, event2) {
    return {
      type: eveType,
      event: event2,
      target: targetInfo.target,
      topTarget: targetInfo.topTarget,
      cancelBubble: false,
      offsetX: event2.zrX,
      offsetY: event2.zrY,
      gestureEvent: event2.gestureEvent,
      pinchX: event2.pinchX,
      pinchY: event2.pinchY,
      pinchScale: event2.pinchScale,
      wheelDelta: event2.zrDelta,
      zrByTouch: event2.zrByTouch,
      which: event2.which,
      stop: stopEvent
    };
  }
  function stopEvent() {
    eventTool$1.stop(this.event);
  }
  function EmptyProxy() {
  }
  EmptyProxy.prototype.dispose = function() {
  };
  var handlerNames = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"];
  var Handler$1 = function(storage2, painter, proxy, painterRoot) {
    Eventful$2.call(this);
    this.storage = storage2;
    this.painter = painter;
    this.painterRoot = painterRoot;
    proxy = proxy || new EmptyProxy();
    this.proxy = null;
    this._hovered = {};
    this._lastTouchMoment;
    this._lastX;
    this._lastY;
    this._gestureMgr;
    Draggable.call(this);
    this.setHandlerProxy(proxy);
  };
  Handler$1.prototype = {
    constructor: Handler$1,
    setHandlerProxy: function(proxy) {
      if (this.proxy) {
        this.proxy.dispose();
      }
      if (proxy) {
        util$5.each(handlerNames, function(name) {
          proxy.on && proxy.on(name, this[name], this);
        }, this);
        proxy.handler = this;
      }
      this.proxy = proxy;
    },
    mousemove: function(event2) {
      var x = event2.zrX;
      var y = event2.zrY;
      var isOutside = isOutsideBoundary(this, x, y);
      var lastHovered = this._hovered;
      var lastHoveredTarget = lastHovered.target;
      if (lastHoveredTarget && !lastHoveredTarget.__zr) {
        lastHovered = this.findHover(lastHovered.x, lastHovered.y);
        lastHoveredTarget = lastHovered.target;
      }
      var hovered = this._hovered = isOutside ? {
        x,
        y
      } : this.findHover(x, y);
      var hoveredTarget = hovered.target;
      var proxy = this.proxy;
      proxy.setCursor && proxy.setCursor(hoveredTarget ? hoveredTarget.cursor : "default");
      if (lastHoveredTarget && hoveredTarget !== lastHoveredTarget) {
        this.dispatchToElement(lastHovered, "mouseout", event2);
      }
      this.dispatchToElement(hovered, "mousemove", event2);
      if (hoveredTarget && hoveredTarget !== lastHoveredTarget) {
        this.dispatchToElement(hovered, "mouseover", event2);
      }
    },
    mouseout: function(event2) {
      var eventControl = event2.zrEventControl;
      var zrIsToLocalDOM = event2.zrIsToLocalDOM;
      if (eventControl !== "only_globalout") {
        this.dispatchToElement(this._hovered, "mouseout", event2);
      }
      if (eventControl !== "no_globalout") {
        !zrIsToLocalDOM && this.trigger("globalout", {
          type: "globalout",
          event: event2
        });
      }
    },
    resize: function(event2) {
      this._hovered = {};
    },
    dispatch: function(eventName, eventArgs) {
      var handler = this[eventName];
      handler && handler.call(this, eventArgs);
    },
    dispose: function() {
      this.proxy.dispose();
      this.storage = this.proxy = this.painter = null;
    },
    setCursorStyle: function(cursorStyle) {
      var proxy = this.proxy;
      proxy.setCursor && proxy.setCursor(cursorStyle);
    },
    dispatchToElement: function(targetInfo, eventName, event2) {
      targetInfo = targetInfo || {};
      var el = targetInfo.target;
      if (el && el.silent) {
        return;
      }
      var eventHandler = "on" + eventName;
      var eventPacket = makeEventPacket(eventName, targetInfo, event2);
      while (el) {
        el[eventHandler] && (eventPacket.cancelBubble = el[eventHandler].call(el, eventPacket));
        el.trigger(eventName, eventPacket);
        el = el.parent;
        if (eventPacket.cancelBubble) {
          break;
        }
      }
      if (!eventPacket.cancelBubble) {
        this.trigger(eventName, eventPacket);
        this.painter && this.painter.eachOtherLayer(function(layer) {
          if (typeof layer[eventHandler] === "function") {
            layer[eventHandler].call(layer, eventPacket);
          }
          if (layer.trigger) {
            layer.trigger(eventName, eventPacket);
          }
        });
      }
    },
    findHover: function(x, y, exclude) {
      var list = this.storage.getDisplayList();
      var out2 = {
        x,
        y
      };
      for (var i2 = list.length - 1; i2 >= 0; i2--) {
        var hoverCheckResult;
        if (list[i2] !== exclude && !list[i2].ignore && (hoverCheckResult = isHover(list[i2], x, y))) {
          !out2.topTarget && (out2.topTarget = list[i2]);
          if (hoverCheckResult !== SILENT) {
            out2.target = list[i2];
            break;
          }
        }
      }
      return out2;
    },
    processGesture: function(event2, stage) {
      if (!this._gestureMgr) {
        this._gestureMgr = new GestureMgr();
      }
      var gestureMgr = this._gestureMgr;
      stage === "start" && gestureMgr.clear();
      var gestureInfo = gestureMgr.recognize(event2, this.findHover(event2.zrX, event2.zrY, null).target, this.proxy.dom);
      stage === "end" && gestureMgr.clear();
      if (gestureInfo) {
        var type = gestureInfo.type;
        event2.gestureEvent = type;
        this.dispatchToElement({
          target: gestureInfo.target
        }, type, gestureInfo.event);
      }
    }
  };
  util$5.each(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(name) {
    Handler$1.prototype[name] = function(event2) {
      var x = event2.zrX;
      var y = event2.zrY;
      var isOutside = isOutsideBoundary(this, x, y);
      var hovered;
      var hoveredTarget;
      if (name !== "mouseup" || !isOutside) {
        hovered = this.findHover(x, y);
        hoveredTarget = hovered.target;
      }
      if (name === "mousedown") {
        this._downEl = hoveredTarget;
        this._downPoint = [event2.zrX, event2.zrY];
        this._upEl = hoveredTarget;
      } else if (name === "mouseup") {
        this._upEl = hoveredTarget;
      } else if (name === "click") {
        if (this._downEl !== this._upEl || !this._downPoint || vec2$6.dist(this._downPoint, [event2.zrX, event2.zrY]) > 4) {
          return;
        }
        this._downPoint = null;
      }
      this.dispatchToElement(hovered, name, event2);
    };
  });
  function isHover(displayable, x, y) {
    if (displayable[displayable.rectHover ? "rectContain" : "contain"](x, y)) {
      var el = displayable;
      var isSilent;
      while (el) {
        if (el.clipPath && !el.clipPath.contain(x, y)) {
          return false;
        }
        if (el.silent) {
          isSilent = true;
        }
        el = el.parent;
      }
      return isSilent ? SILENT : true;
    }
    return false;
  }
  function isOutsideBoundary(handlerInstance, x, y) {
    var painter = handlerInstance.painter;
    return x < 0 || x > painter.getWidth() || y < 0 || y > painter.getHeight();
  }
  util$5.mixin(Handler$1, Eventful$2);
  util$5.mixin(Handler$1, Draggable);
  var _default$1I = Handler$1;
  var Handler_1 = _default$1I;
  var matrix$6 = {};
  var ArrayCtor = typeof Float32Array === "undefined" ? Array : Float32Array;
  function create() {
    var out2 = new ArrayCtor(6);
    identity(out2);
    return out2;
  }
  function identity(out2) {
    out2[0] = 1;
    out2[1] = 0;
    out2[2] = 0;
    out2[3] = 1;
    out2[4] = 0;
    out2[5] = 0;
    return out2;
  }
  function copy(out2, m2) {
    out2[0] = m2[0];
    out2[1] = m2[1];
    out2[2] = m2[2];
    out2[3] = m2[3];
    out2[4] = m2[4];
    out2[5] = m2[5];
    return out2;
  }
  function mul(out2, m1, m2) {
    var out0 = m1[0] * m2[0] + m1[2] * m2[1];
    var out1 = m1[1] * m2[0] + m1[3] * m2[1];
    var out22 = m1[0] * m2[2] + m1[2] * m2[3];
    var out3 = m1[1] * m2[2] + m1[3] * m2[3];
    var out4 = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
    var out5 = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
    out2[0] = out0;
    out2[1] = out1;
    out2[2] = out22;
    out2[3] = out3;
    out2[4] = out4;
    out2[5] = out5;
    return out2;
  }
  function translate(out2, a, v2) {
    out2[0] = a[0];
    out2[1] = a[1];
    out2[2] = a[2];
    out2[3] = a[3];
    out2[4] = a[4] + v2[0];
    out2[5] = a[5] + v2[1];
    return out2;
  }
  function rotate(out2, a, rad) {
    var aa = a[0];
    var ac = a[2];
    var atx = a[4];
    var ab = a[1];
    var ad = a[3];
    var aty = a[5];
    var st = Math.sin(rad);
    var ct = Math.cos(rad);
    out2[0] = aa * ct + ab * st;
    out2[1] = -aa * st + ab * ct;
    out2[2] = ac * ct + ad * st;
    out2[3] = -ac * st + ct * ad;
    out2[4] = ct * atx + st * aty;
    out2[5] = ct * aty - st * atx;
    return out2;
  }
  function scale(out2, a, v2) {
    var vx = v2[0];
    var vy = v2[1];
    out2[0] = a[0] * vx;
    out2[1] = a[1] * vy;
    out2[2] = a[2] * vx;
    out2[3] = a[3] * vy;
    out2[4] = a[4] * vx;
    out2[5] = a[5] * vy;
    return out2;
  }
  function invert(out2, a) {
    var aa = a[0];
    var ac = a[2];
    var atx = a[4];
    var ab = a[1];
    var ad = a[3];
    var aty = a[5];
    var det = aa * ad - ab * ac;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out2[0] = ad * det;
    out2[1] = -ab * det;
    out2[2] = -ac * det;
    out2[3] = aa * det;
    out2[4] = (ac * aty - ad * atx) * det;
    out2[5] = (ab * atx - aa * aty) * det;
    return out2;
  }
  function clone$4(a) {
    var b = create();
    copy(b, a);
    return b;
  }
  matrix$6.create = create;
  matrix$6.identity = identity;
  matrix$6.copy = copy;
  matrix$6.mul = mul;
  matrix$6.translate = translate;
  matrix$6.rotate = rotate;
  matrix$6.scale = scale;
  matrix$6.invert = invert;
  matrix$6.clone = clone$4;
  var matrix$5 = matrix$6;
  var vector$2 = vector$3;
  var mIdentity = matrix$5.identity;
  var EPSILON$3 = 5e-5;
  function isNotAroundZero$1(val) {
    return val > EPSILON$3 || val < -EPSILON$3;
  }
  var Transformable$2 = function(opts) {
    opts = opts || {};
    if (!opts.position) {
      this.position = [0, 0];
    }
    if (opts.rotation == null) {
      this.rotation = 0;
    }
    if (!opts.scale) {
      this.scale = [1, 1];
    }
    this.origin = this.origin || null;
  };
  var transformableProto = Transformable$2.prototype;
  transformableProto.transform = null;
  transformableProto.needLocalTransform = function() {
    return isNotAroundZero$1(this.rotation) || isNotAroundZero$1(this.position[0]) || isNotAroundZero$1(this.position[1]) || isNotAroundZero$1(this.scale[0] - 1) || isNotAroundZero$1(this.scale[1] - 1);
  };
  var scaleTmp = [];
  transformableProto.updateTransform = function() {
    var parent = this.parent;
    var parentHasTransform = parent && parent.transform;
    var needLocalTransform = this.needLocalTransform();
    var m2 = this.transform;
    if (!(needLocalTransform || parentHasTransform)) {
      m2 && mIdentity(m2);
      return;
    }
    m2 = m2 || matrix$5.create();
    if (needLocalTransform) {
      this.getLocalTransform(m2);
    } else {
      mIdentity(m2);
    }
    if (parentHasTransform) {
      if (needLocalTransform) {
        matrix$5.mul(m2, parent.transform, m2);
      } else {
        matrix$5.copy(m2, parent.transform);
      }
    }
    this.transform = m2;
    var globalScaleRatio = this.globalScaleRatio;
    if (globalScaleRatio != null && globalScaleRatio !== 1) {
      this.getGlobalScale(scaleTmp);
      var relX = scaleTmp[0] < 0 ? -1 : 1;
      var relY = scaleTmp[1] < 0 ? -1 : 1;
      var sx = ((scaleTmp[0] - relX) * globalScaleRatio + relX) / scaleTmp[0] || 0;
      var sy = ((scaleTmp[1] - relY) * globalScaleRatio + relY) / scaleTmp[1] || 0;
      m2[0] *= sx;
      m2[1] *= sx;
      m2[2] *= sy;
      m2[3] *= sy;
    }
    this.invTransform = this.invTransform || matrix$5.create();
    matrix$5.invert(this.invTransform, m2);
  };
  transformableProto.getLocalTransform = function(m2) {
    return Transformable$2.getLocalTransform(this, m2);
  };
  transformableProto.setTransform = function(ctx) {
    var m2 = this.transform;
    var dpr2 = ctx.dpr || 1;
    if (m2) {
      ctx.setTransform(dpr2 * m2[0], dpr2 * m2[1], dpr2 * m2[2], dpr2 * m2[3], dpr2 * m2[4], dpr2 * m2[5]);
    } else {
      ctx.setTransform(dpr2, 0, 0, dpr2, 0, 0);
    }
  };
  transformableProto.restoreTransform = function(ctx) {
    var dpr2 = ctx.dpr || 1;
    ctx.setTransform(dpr2, 0, 0, dpr2, 0, 0);
  };
  var tmpTransform = [];
  var originTransform = matrix$5.create();
  transformableProto.setLocalTransform = function(m2) {
    if (!m2) {
      return;
    }
    var sx = m2[0] * m2[0] + m2[1] * m2[1];
    var sy = m2[2] * m2[2] + m2[3] * m2[3];
    var position = this.position;
    var scale2 = this.scale;
    if (isNotAroundZero$1(sx - 1)) {
      sx = Math.sqrt(sx);
    }
    if (isNotAroundZero$1(sy - 1)) {
      sy = Math.sqrt(sy);
    }
    if (m2[0] < 0) {
      sx = -sx;
    }
    if (m2[3] < 0) {
      sy = -sy;
    }
    position[0] = m2[4];
    position[1] = m2[5];
    scale2[0] = sx;
    scale2[1] = sy;
    this.rotation = Math.atan2(-m2[1] / sy, m2[0] / sx);
  };
  transformableProto.decomposeTransform = function() {
    if (!this.transform) {
      return;
    }
    var parent = this.parent;
    var m2 = this.transform;
    if (parent && parent.transform) {
      matrix$5.mul(tmpTransform, parent.invTransform, m2);
      m2 = tmpTransform;
    }
    var origin = this.origin;
    if (origin && (origin[0] || origin[1])) {
      originTransform[4] = origin[0];
      originTransform[5] = origin[1];
      matrix$5.mul(tmpTransform, m2, originTransform);
      tmpTransform[4] -= origin[0];
      tmpTransform[5] -= origin[1];
      m2 = tmpTransform;
    }
    this.setLocalTransform(m2);
  };
  transformableProto.getGlobalScale = function(out2) {
    var m2 = this.transform;
    out2 = out2 || [];
    if (!m2) {
      out2[0] = 1;
      out2[1] = 1;
      return out2;
    }
    out2[0] = Math.sqrt(m2[0] * m2[0] + m2[1] * m2[1]);
    out2[1] = Math.sqrt(m2[2] * m2[2] + m2[3] * m2[3]);
    if (m2[0] < 0) {
      out2[0] = -out2[0];
    }
    if (m2[3] < 0) {
      out2[1] = -out2[1];
    }
    return out2;
  };
  transformableProto.transformCoordToLocal = function(x, y) {
    var v2 = [x, y];
    var invTransform = this.invTransform;
    if (invTransform) {
      vector$2.applyTransform(v2, v2, invTransform);
    }
    return v2;
  };
  transformableProto.transformCoordToGlobal = function(x, y) {
    var v2 = [x, y];
    var transform = this.transform;
    if (transform) {
      vector$2.applyTransform(v2, v2, transform);
    }
    return v2;
  };
  Transformable$2.getLocalTransform = function(target, m2) {
    m2 = m2 || [];
    mIdentity(m2);
    var origin = target.origin;
    var scale2 = target.scale || [1, 1];
    var rotation = target.rotation || 0;
    var position = target.position || [0, 0];
    if (origin) {
      m2[4] -= origin[0];
      m2[5] -= origin[1];
    }
    matrix$5.scale(m2, m2, scale2);
    if (rotation) {
      matrix$5.rotate(m2, m2, rotation);
    }
    if (origin) {
      m2[4] += origin[0];
      m2[5] += origin[1];
    }
    m2[4] += position[0];
    m2[5] += position[1];
    return m2;
  };
  var _default$1H = Transformable$2;
  var Transformable_1 = _default$1H;
  var easing = {
    linear: function(k) {
      return k;
    },
    quadraticIn: function(k) {
      return k * k;
    },
    quadraticOut: function(k) {
      return k * (2 - k);
    },
    quadraticInOut: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k;
      }
      return -0.5 * (--k * (k - 2) - 1);
    },
    cubicIn: function(k) {
      return k * k * k;
    },
    cubicOut: function(k) {
      return --k * k * k + 1;
    },
    cubicInOut: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k;
      }
      return 0.5 * ((k -= 2) * k * k + 2);
    },
    quarticIn: function(k) {
      return k * k * k * k;
    },
    quarticOut: function(k) {
      return 1 - --k * k * k * k;
    },
    quarticInOut: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k;
      }
      return -0.5 * ((k -= 2) * k * k * k - 2);
    },
    quinticIn: function(k) {
      return k * k * k * k * k;
    },
    quinticOut: function(k) {
      return --k * k * k * k * k + 1;
    },
    quinticInOut: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k * k;
      }
      return 0.5 * ((k -= 2) * k * k * k * k + 2);
    },
    sinusoidalIn: function(k) {
      return 1 - Math.cos(k * Math.PI / 2);
    },
    sinusoidalOut: function(k) {
      return Math.sin(k * Math.PI / 2);
    },
    sinusoidalInOut: function(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    },
    exponentialIn: function(k) {
      return k === 0 ? 0 : Math.pow(1024, k - 1);
    },
    exponentialOut: function(k) {
      return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    },
    exponentialInOut: function(k) {
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      if ((k *= 2) < 1) {
        return 0.5 * Math.pow(1024, k - 1);
      }
      return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    },
    circularIn: function(k) {
      return 1 - Math.sqrt(1 - k * k);
    },
    circularOut: function(k) {
      return Math.sqrt(1 - --k * k);
    },
    circularInOut: function(k) {
      if ((k *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - k * k) - 1);
      }
      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    },
    elasticIn: function(k) {
      var s;
      var a = 0.1;
      var p = 0.4;
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      if (!a || a < 1) {
        a = 1;
        s = p / 4;
      } else {
        s = p * Math.asin(1 / a) / (2 * Math.PI);
      }
      return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    },
    elasticOut: function(k) {
      var s;
      var a = 0.1;
      var p = 0.4;
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      if (!a || a < 1) {
        a = 1;
        s = p / 4;
      } else {
        s = p * Math.asin(1 / a) / (2 * Math.PI);
      }
      return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
    },
    elasticInOut: function(k) {
      var s;
      var a = 0.1;
      var p = 0.4;
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      if (!a || a < 1) {
        a = 1;
        s = p / 4;
      } else {
        s = p * Math.asin(1 / a) / (2 * Math.PI);
      }
      if ((k *= 2) < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
      }
      return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
    },
    backIn: function(k) {
      var s = 1.70158;
      return k * k * ((s + 1) * k - s);
    },
    backOut: function(k) {
      var s = 1.70158;
      return --k * k * ((s + 1) * k + s) + 1;
    },
    backInOut: function(k) {
      var s = 1.70158 * 1.525;
      if ((k *= 2) < 1) {
        return 0.5 * (k * k * ((s + 1) * k - s));
      }
      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    },
    bounceIn: function(k) {
      return 1 - easing.bounceOut(1 - k);
    },
    bounceOut: function(k) {
      if (k < 1 / 2.75) {
        return 7.5625 * k * k;
      } else if (k < 2 / 2.75) {
        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
      } else if (k < 2.5 / 2.75) {
        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
      } else {
        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
      }
    },
    bounceInOut: function(k) {
      if (k < 0.5) {
        return easing.bounceIn(k * 2) * 0.5;
      }
      return easing.bounceOut(k * 2 - 1) * 0.5 + 0.5;
    }
  };
  var _default$1G = easing;
  var easing_1 = _default$1G;
  var easingFuncs = easing_1;
  function Clip$1(options2) {
    this._target = options2.target;
    this._life = options2.life || 1e3;
    this._delay = options2.delay || 0;
    this._initialized = false;
    this.loop = options2.loop == null ? false : options2.loop;
    this.gap = options2.gap || 0;
    this.easing = options2.easing || "Linear";
    this.onframe = options2.onframe;
    this.ondestroy = options2.ondestroy;
    this.onrestart = options2.onrestart;
    this._pausedTime = 0;
    this._paused = false;
  }
  Clip$1.prototype = {
    constructor: Clip$1,
    step: function(globalTime, deltaTime) {
      if (!this._initialized) {
        this._startTime = globalTime + this._delay;
        this._initialized = true;
      }
      if (this._paused) {
        this._pausedTime += deltaTime;
        return;
      }
      var percent = (globalTime - this._startTime - this._pausedTime) / this._life;
      if (percent < 0) {
        return;
      }
      percent = Math.min(percent, 1);
      var easing2 = this.easing;
      var easingFunc = typeof easing2 === "string" ? easingFuncs[easing2] : easing2;
      var schedule = typeof easingFunc === "function" ? easingFunc(percent) : percent;
      this.fire("frame", schedule);
      if (percent === 1) {
        if (this.loop) {
          this.restart(globalTime);
          return "restart";
        }
        this._needsRemove = true;
        return "destroy";
      }
      return null;
    },
    restart: function(globalTime) {
      var remainder = (globalTime - this._startTime - this._pausedTime) % this._life;
      this._startTime = globalTime - remainder + this.gap;
      this._pausedTime = 0;
      this._needsRemove = false;
    },
    fire: function(eventType, arg) {
      eventType = "on" + eventType;
      if (this[eventType]) {
        this[eventType](this._target, arg);
      }
    },
    pause: function() {
      this._paused = true;
    },
    resume: function() {
      this._paused = false;
    }
  };
  var _default$1F = Clip$1;
  var Clip_1 = _default$1F;
  var color$1 = {};
  var LinkedList = function() {
    this.head = null;
    this.tail = null;
    this._len = 0;
  };
  var linkedListProto = LinkedList.prototype;
  linkedListProto.insert = function(val) {
    var entry = new Entry(val);
    this.insertEntry(entry);
    return entry;
  };
  linkedListProto.insertEntry = function(entry) {
    if (!this.head) {
      this.head = this.tail = entry;
    } else {
      this.tail.next = entry;
      entry.prev = this.tail;
      entry.next = null;
      this.tail = entry;
    }
    this._len++;
  };
  linkedListProto.remove = function(entry) {
    var prev = entry.prev;
    var next = entry.next;
    if (prev) {
      prev.next = next;
    } else {
      this.head = next;
    }
    if (next) {
      next.prev = prev;
    } else {
      this.tail = prev;
    }
    entry.next = entry.prev = null;
    this._len--;
  };
  linkedListProto.len = function() {
    return this._len;
  };
  linkedListProto.clear = function() {
    this.head = this.tail = null;
    this._len = 0;
  };
  var Entry = function(val) {
    this.value = val;
    this.next;
    this.prev;
  };
  var LRU$2 = function(maxSize) {
    this._list = new LinkedList();
    this._map = {};
    this._maxSize = maxSize || 10;
    this._lastRemovedEntry = null;
  };
  var LRUProto = LRU$2.prototype;
  LRUProto.put = function(key, value) {
    var list = this._list;
    var map2 = this._map;
    var removed = null;
    if (map2[key] == null) {
      var len2 = list.len();
      var entry = this._lastRemovedEntry;
      if (len2 >= this._maxSize && len2 > 0) {
        var leastUsedEntry = list.head;
        list.remove(leastUsedEntry);
        delete map2[leastUsedEntry.key];
        removed = leastUsedEntry.value;
        this._lastRemovedEntry = leastUsedEntry;
      }
      if (entry) {
        entry.value = value;
      } else {
        entry = new Entry(value);
      }
      entry.key = key;
      list.insertEntry(entry);
      map2[key] = entry;
    }
    return removed;
  };
  LRUProto.get = function(key) {
    var entry = this._map[key];
    var list = this._list;
    if (entry != null) {
      if (entry !== list.tail) {
        list.remove(entry);
        list.insertEntry(entry);
      }
      return entry.value;
    }
  };
  LRUProto.clear = function() {
    this._list.clear();
    this._map = {};
  };
  var _default$1E = LRU$2;
  var LRU_1 = _default$1E;
  var LRU$1 = LRU_1;
  var kCSSColorTable = {
    "transparent": [0, 0, 0, 0],
    "aliceblue": [240, 248, 255, 1],
    "antiquewhite": [250, 235, 215, 1],
    "aqua": [0, 255, 255, 1],
    "aquamarine": [127, 255, 212, 1],
    "azure": [240, 255, 255, 1],
    "beige": [245, 245, 220, 1],
    "bisque": [255, 228, 196, 1],
    "black": [0, 0, 0, 1],
    "blanchedalmond": [255, 235, 205, 1],
    "blue": [0, 0, 255, 1],
    "blueviolet": [138, 43, 226, 1],
    "brown": [165, 42, 42, 1],
    "burlywood": [222, 184, 135, 1],
    "cadetblue": [95, 158, 160, 1],
    "chartreuse": [127, 255, 0, 1],
    "chocolate": [210, 105, 30, 1],
    "coral": [255, 127, 80, 1],
    "cornflowerblue": [100, 149, 237, 1],
    "cornsilk": [255, 248, 220, 1],
    "crimson": [220, 20, 60, 1],
    "cyan": [0, 255, 255, 1],
    "darkblue": [0, 0, 139, 1],
    "darkcyan": [0, 139, 139, 1],
    "darkgoldenrod": [184, 134, 11, 1],
    "darkgray": [169, 169, 169, 1],
    "darkgreen": [0, 100, 0, 1],
    "darkgrey": [169, 169, 169, 1],
    "darkkhaki": [189, 183, 107, 1],
    "darkmagenta": [139, 0, 139, 1],
    "darkolivegreen": [85, 107, 47, 1],
    "darkorange": [255, 140, 0, 1],
    "darkorchid": [153, 50, 204, 1],
    "darkred": [139, 0, 0, 1],
    "darksalmon": [233, 150, 122, 1],
    "darkseagreen": [143, 188, 143, 1],
    "darkslateblue": [72, 61, 139, 1],
    "darkslategray": [47, 79, 79, 1],
    "darkslategrey": [47, 79, 79, 1],
    "darkturquoise": [0, 206, 209, 1],
    "darkviolet": [148, 0, 211, 1],
    "deeppink": [255, 20, 147, 1],
    "deepskyblue": [0, 191, 255, 1],
    "dimgray": [105, 105, 105, 1],
    "dimgrey": [105, 105, 105, 1],
    "dodgerblue": [30, 144, 255, 1],
    "firebrick": [178, 34, 34, 1],
    "floralwhite": [255, 250, 240, 1],
    "forestgreen": [34, 139, 34, 1],
    "fuchsia": [255, 0, 255, 1],
    "gainsboro": [220, 220, 220, 1],
    "ghostwhite": [248, 248, 255, 1],
    "gold": [255, 215, 0, 1],
    "goldenrod": [218, 165, 32, 1],
    "gray": [128, 128, 128, 1],
    "green": [0, 128, 0, 1],
    "greenyellow": [173, 255, 47, 1],
    "grey": [128, 128, 128, 1],
    "honeydew": [240, 255, 240, 1],
    "hotpink": [255, 105, 180, 1],
    "indianred": [205, 92, 92, 1],
    "indigo": [75, 0, 130, 1],
    "ivory": [255, 255, 240, 1],
    "khaki": [240, 230, 140, 1],
    "lavender": [230, 230, 250, 1],
    "lavenderblush": [255, 240, 245, 1],
    "lawngreen": [124, 252, 0, 1],
    "lemonchiffon": [255, 250, 205, 1],
    "lightblue": [173, 216, 230, 1],
    "lightcoral": [240, 128, 128, 1],
    "lightcyan": [224, 255, 255, 1],
    "lightgoldenrodyellow": [250, 250, 210, 1],
    "lightgray": [211, 211, 211, 1],
    "lightgreen": [144, 238, 144, 1],
    "lightgrey": [211, 211, 211, 1],
    "lightpink": [255, 182, 193, 1],
    "lightsalmon": [255, 160, 122, 1],
    "lightseagreen": [32, 178, 170, 1],
    "lightskyblue": [135, 206, 250, 1],
    "lightslategray": [119, 136, 153, 1],
    "lightslategrey": [119, 136, 153, 1],
    "lightsteelblue": [176, 196, 222, 1],
    "lightyellow": [255, 255, 224, 1],
    "lime": [0, 255, 0, 1],
    "limegreen": [50, 205, 50, 1],
    "linen": [250, 240, 230, 1],
    "magenta": [255, 0, 255, 1],
    "maroon": [128, 0, 0, 1],
    "mediumaquamarine": [102, 205, 170, 1],
    "mediumblue": [0, 0, 205, 1],
    "mediumorchid": [186, 85, 211, 1],
    "mediumpurple": [147, 112, 219, 1],
    "mediumseagreen": [60, 179, 113, 1],
    "mediumslateblue": [123, 104, 238, 1],
    "mediumspringgreen": [0, 250, 154, 1],
    "mediumturquoise": [72, 209, 204, 1],
    "mediumvioletred": [199, 21, 133, 1],
    "midnightblue": [25, 25, 112, 1],
    "mintcream": [245, 255, 250, 1],
    "mistyrose": [255, 228, 225, 1],
    "moccasin": [255, 228, 181, 1],
    "navajowhite": [255, 222, 173, 1],
    "navy": [0, 0, 128, 1],
    "oldlace": [253, 245, 230, 1],
    "olive": [128, 128, 0, 1],
    "olivedrab": [107, 142, 35, 1],
    "orange": [255, 165, 0, 1],
    "orangered": [255, 69, 0, 1],
    "orchid": [218, 112, 214, 1],
    "palegoldenrod": [238, 232, 170, 1],
    "palegreen": [152, 251, 152, 1],
    "paleturquoise": [175, 238, 238, 1],
    "palevioletred": [219, 112, 147, 1],
    "papayawhip": [255, 239, 213, 1],
    "peachpuff": [255, 218, 185, 1],
    "peru": [205, 133, 63, 1],
    "pink": [255, 192, 203, 1],
    "plum": [221, 160, 221, 1],
    "powderblue": [176, 224, 230, 1],
    "purple": [128, 0, 128, 1],
    "red": [255, 0, 0, 1],
    "rosybrown": [188, 143, 143, 1],
    "royalblue": [65, 105, 225, 1],
    "saddlebrown": [139, 69, 19, 1],
    "salmon": [250, 128, 114, 1],
    "sandybrown": [244, 164, 96, 1],
    "seagreen": [46, 139, 87, 1],
    "seashell": [255, 245, 238, 1],
    "sienna": [160, 82, 45, 1],
    "silver": [192, 192, 192, 1],
    "skyblue": [135, 206, 235, 1],
    "slateblue": [106, 90, 205, 1],
    "slategray": [112, 128, 144, 1],
    "slategrey": [112, 128, 144, 1],
    "snow": [255, 250, 250, 1],
    "springgreen": [0, 255, 127, 1],
    "steelblue": [70, 130, 180, 1],
    "tan": [210, 180, 140, 1],
    "teal": [0, 128, 128, 1],
    "thistle": [216, 191, 216, 1],
    "tomato": [255, 99, 71, 1],
    "turquoise": [64, 224, 208, 1],
    "violet": [238, 130, 238, 1],
    "wheat": [245, 222, 179, 1],
    "white": [255, 255, 255, 1],
    "whitesmoke": [245, 245, 245, 1],
    "yellow": [255, 255, 0, 1],
    "yellowgreen": [154, 205, 50, 1]
  };
  function clampCssByte(i2) {
    i2 = Math.round(i2);
    return i2 < 0 ? 0 : i2 > 255 ? 255 : i2;
  }
  function clampCssAngle(i2) {
    i2 = Math.round(i2);
    return i2 < 0 ? 0 : i2 > 360 ? 360 : i2;
  }
  function clampCssFloat(f) {
    return f < 0 ? 0 : f > 1 ? 1 : f;
  }
  function parseCssInt(str) {
    if (str.length && str.charAt(str.length - 1) === "%") {
      return clampCssByte(parseFloat(str) / 100 * 255);
    }
    return clampCssByte(parseInt(str, 10));
  }
  function parseCssFloat(str) {
    if (str.length && str.charAt(str.length - 1) === "%") {
      return clampCssFloat(parseFloat(str) / 100);
    }
    return clampCssFloat(parseFloat(str));
  }
  function cssHueToRgb(m1, m2, h) {
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
    if (h * 6 < 1) {
      return m1 + (m2 - m1) * h * 6;
    }
    if (h * 2 < 1) {
      return m2;
    }
    if (h * 3 < 2) {
      return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    }
    return m1;
  }
  function lerpNumber(a, b, p) {
    return a + (b - a) * p;
  }
  function setRgba(out2, r, g, b, a) {
    out2[0] = r;
    out2[1] = g;
    out2[2] = b;
    out2[3] = a;
    return out2;
  }
  function copyRgba(out2, a) {
    out2[0] = a[0];
    out2[1] = a[1];
    out2[2] = a[2];
    out2[3] = a[3];
    return out2;
  }
  var colorCache = new LRU$1(20);
  var lastRemovedArr = null;
  function putToCache(colorStr, rgbaArr) {
    if (lastRemovedArr) {
      copyRgba(lastRemovedArr, rgbaArr);
    }
    lastRemovedArr = colorCache.put(colorStr, lastRemovedArr || rgbaArr.slice());
  }
  function parse(colorStr, rgbaArr) {
    if (!colorStr) {
      return;
    }
    rgbaArr = rgbaArr || [];
    var cached = colorCache.get(colorStr);
    if (cached) {
      return copyRgba(rgbaArr, cached);
    }
    colorStr = colorStr + "";
    var str = colorStr.replace(/ /g, "").toLowerCase();
    if (str in kCSSColorTable) {
      copyRgba(rgbaArr, kCSSColorTable[str]);
      putToCache(colorStr, rgbaArr);
      return rgbaArr;
    }
    if (str.charAt(0) === "#") {
      if (str.length === 4) {
        var iv = parseInt(str.substr(1), 16);
        if (!(iv >= 0 && iv <= 4095)) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }
        setRgba(rgbaArr, (iv & 3840) >> 4 | (iv & 3840) >> 8, iv & 240 | (iv & 240) >> 4, iv & 15 | (iv & 15) << 4, 1);
        putToCache(colorStr, rgbaArr);
        return rgbaArr;
      } else if (str.length === 7) {
        var iv = parseInt(str.substr(1), 16);
        if (!(iv >= 0 && iv <= 16777215)) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }
        setRgba(rgbaArr, (iv & 16711680) >> 16, (iv & 65280) >> 8, iv & 255, 1);
        putToCache(colorStr, rgbaArr);
        return rgbaArr;
      }
      return;
    }
    var op = str.indexOf("(");
    var ep = str.indexOf(")");
    if (op !== -1 && ep + 1 === str.length) {
      var fname = str.substr(0, op);
      var params = str.substr(op + 1, ep - (op + 1)).split(",");
      var alpha = 1;
      switch (fname) {
        case "rgba":
          if (params.length !== 4) {
            setRgba(rgbaArr, 0, 0, 0, 1);
            return;
          }
          alpha = parseCssFloat(params.pop());
        case "rgb":
          if (params.length !== 3) {
            setRgba(rgbaArr, 0, 0, 0, 1);
            return;
          }
          setRgba(rgbaArr, parseCssInt(params[0]), parseCssInt(params[1]), parseCssInt(params[2]), alpha);
          putToCache(colorStr, rgbaArr);
          return rgbaArr;
        case "hsla":
          if (params.length !== 4) {
            setRgba(rgbaArr, 0, 0, 0, 1);
            return;
          }
          params[3] = parseCssFloat(params[3]);
          hsla2rgba(params, rgbaArr);
          putToCache(colorStr, rgbaArr);
          return rgbaArr;
        case "hsl":
          if (params.length !== 3) {
            setRgba(rgbaArr, 0, 0, 0, 1);
            return;
          }
          hsla2rgba(params, rgbaArr);
          putToCache(colorStr, rgbaArr);
          return rgbaArr;
        default:
          return;
      }
    }
    setRgba(rgbaArr, 0, 0, 0, 1);
    return;
  }
  function hsla2rgba(hsla, rgba) {
    var h = (parseFloat(hsla[0]) % 360 + 360) % 360 / 360;
    var s = parseCssFloat(hsla[1]);
    var l = parseCssFloat(hsla[2]);
    var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
    var m1 = l * 2 - m2;
    rgba = rgba || [];
    setRgba(rgba, clampCssByte(cssHueToRgb(m1, m2, h + 1 / 3) * 255), clampCssByte(cssHueToRgb(m1, m2, h) * 255), clampCssByte(cssHueToRgb(m1, m2, h - 1 / 3) * 255), 1);
    if (hsla.length === 4) {
      rgba[3] = hsla[3];
    }
    return rgba;
  }
  function rgba2hsla(rgba) {
    if (!rgba) {
      return;
    }
    var R = rgba[0] / 255;
    var G = rgba[1] / 255;
    var B = rgba[2] / 255;
    var vMin = Math.min(R, G, B);
    var vMax = Math.max(R, G, B);
    var delta = vMax - vMin;
    var L = (vMax + vMin) / 2;
    var H;
    var S;
    if (delta === 0) {
      H = 0;
      S = 0;
    } else {
      if (L < 0.5) {
        S = delta / (vMax + vMin);
      } else {
        S = delta / (2 - vMax - vMin);
      }
      var deltaR = ((vMax - R) / 6 + delta / 2) / delta;
      var deltaG = ((vMax - G) / 6 + delta / 2) / delta;
      var deltaB = ((vMax - B) / 6 + delta / 2) / delta;
      if (R === vMax) {
        H = deltaB - deltaG;
      } else if (G === vMax) {
        H = 1 / 3 + deltaR - deltaB;
      } else if (B === vMax) {
        H = 2 / 3 + deltaG - deltaR;
      }
      if (H < 0) {
        H += 1;
      }
      if (H > 1) {
        H -= 1;
      }
    }
    var hsla = [H * 360, S, L];
    if (rgba[3] != null) {
      hsla.push(rgba[3]);
    }
    return hsla;
  }
  function lift(color2, level) {
    var colorArr = parse(color2);
    if (colorArr) {
      for (var i2 = 0; i2 < 3; i2++) {
        if (level < 0) {
          colorArr[i2] = colorArr[i2] * (1 - level) | 0;
        } else {
          colorArr[i2] = (255 - colorArr[i2]) * level + colorArr[i2] | 0;
        }
        if (colorArr[i2] > 255) {
          colorArr[i2] = 255;
        } else if (color2[i2] < 0) {
          colorArr[i2] = 0;
        }
      }
      return stringify(colorArr, colorArr.length === 4 ? "rgba" : "rgb");
    }
  }
  function toHex(color2) {
    var colorArr = parse(color2);
    if (colorArr) {
      return ((1 << 24) + (colorArr[0] << 16) + (colorArr[1] << 8) + +colorArr[2]).toString(16).slice(1);
    }
  }
  function fastLerp(normalizedValue, colors, out2) {
    if (!(colors && colors.length) || !(normalizedValue >= 0 && normalizedValue <= 1)) {
      return;
    }
    out2 = out2 || [];
    var value = normalizedValue * (colors.length - 1);
    var leftIndex = Math.floor(value);
    var rightIndex = Math.ceil(value);
    var leftColor = colors[leftIndex];
    var rightColor = colors[rightIndex];
    var dv = value - leftIndex;
    out2[0] = clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv));
    out2[1] = clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv));
    out2[2] = clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv));
    out2[3] = clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv));
    return out2;
  }
  var fastMapToColor = fastLerp;
  function lerp(normalizedValue, colors, fullOutput) {
    if (!(colors && colors.length) || !(normalizedValue >= 0 && normalizedValue <= 1)) {
      return;
    }
    var value = normalizedValue * (colors.length - 1);
    var leftIndex = Math.floor(value);
    var rightIndex = Math.ceil(value);
    var leftColor = parse(colors[leftIndex]);
    var rightColor = parse(colors[rightIndex]);
    var dv = value - leftIndex;
    var color2 = stringify([clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv)), clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv)), clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv)), clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv))], "rgba");
    return fullOutput ? {
      color: color2,
      leftIndex,
      rightIndex,
      value
    } : color2;
  }
  var mapToColor = lerp;
  function modifyHSL(color2, h, s, l) {
    color2 = parse(color2);
    if (color2) {
      color2 = rgba2hsla(color2);
      h != null && (color2[0] = clampCssAngle(h));
      s != null && (color2[1] = parseCssFloat(s));
      l != null && (color2[2] = parseCssFloat(l));
      return stringify(hsla2rgba(color2), "rgba");
    }
  }
  function modifyAlpha(color2, alpha) {
    color2 = parse(color2);
    if (color2 && alpha != null) {
      color2[3] = clampCssFloat(alpha);
      return stringify(color2, "rgba");
    }
  }
  function stringify(arrColor, type) {
    if (!arrColor || !arrColor.length) {
      return;
    }
    var colorStr = arrColor[0] + "," + arrColor[1] + "," + arrColor[2];
    if (type === "rgba" || type === "hsva" || type === "hsla") {
      colorStr += "," + arrColor[3];
    }
    return type + "(" + colorStr + ")";
  }
  color$1.parse = parse;
  color$1.lift = lift;
  color$1.toHex = toHex;
  color$1.fastLerp = fastLerp;
  color$1.fastMapToColor = fastMapToColor;
  color$1.lerp = lerp;
  color$1.mapToColor = mapToColor;
  color$1.modifyHSL = modifyHSL;
  color$1.modifyAlpha = modifyAlpha;
  color$1.stringify = stringify;
  var Clip = Clip_1;
  var color = color$1;
  var _util$u = util$6;
  var isArrayLike$2 = _util$u.isArrayLike;
  var arraySlice = Array.prototype.slice;
  function defaultGetter(target, key) {
    return target[key];
  }
  function defaultSetter(target, key, value) {
    target[key] = value;
  }
  function interpolateNumber(p0, p1, percent) {
    return (p1 - p0) * percent + p0;
  }
  function interpolateString(p0, p1, percent) {
    return percent > 0.5 ? p1 : p0;
  }
  function interpolateArray(p0, p1, percent, out2, arrDim) {
    var len2 = p0.length;
    if (arrDim === 1) {
      for (var i2 = 0; i2 < len2; i2++) {
        out2[i2] = interpolateNumber(p0[i2], p1[i2], percent);
      }
    } else {
      var len22 = len2 && p0[0].length;
      for (var i2 = 0; i2 < len2; i2++) {
        for (var j = 0; j < len22; j++) {
          out2[i2][j] = interpolateNumber(p0[i2][j], p1[i2][j], percent);
        }
      }
    }
  }
  function fillArr(arr0, arr1, arrDim) {
    var arr0Len = arr0.length;
    var arr1Len = arr1.length;
    if (arr0Len !== arr1Len) {
      var isPreviousLarger = arr0Len > arr1Len;
      if (isPreviousLarger) {
        arr0.length = arr1Len;
      } else {
        for (var i2 = arr0Len; i2 < arr1Len; i2++) {
          arr0.push(arrDim === 1 ? arr1[i2] : arraySlice.call(arr1[i2]));
        }
      }
    }
    var len2 = arr0[0] && arr0[0].length;
    for (var i2 = 0; i2 < arr0.length; i2++) {
      if (arrDim === 1) {
        if (isNaN(arr0[i2])) {
          arr0[i2] = arr1[i2];
        }
      } else {
        for (var j = 0; j < len2; j++) {
          if (isNaN(arr0[i2][j])) {
            arr0[i2][j] = arr1[i2][j];
          }
        }
      }
    }
  }
  function isArraySame(arr0, arr1, arrDim) {
    if (arr0 === arr1) {
      return true;
    }
    var len2 = arr0.length;
    if (len2 !== arr1.length) {
      return false;
    }
    if (arrDim === 1) {
      for (var i2 = 0; i2 < len2; i2++) {
        if (arr0[i2] !== arr1[i2]) {
          return false;
        }
      }
    } else {
      var len22 = arr0[0].length;
      for (var i2 = 0; i2 < len2; i2++) {
        for (var j = 0; j < len22; j++) {
          if (arr0[i2][j] !== arr1[i2][j]) {
            return false;
          }
        }
      }
    }
    return true;
  }
  function catmullRomInterpolateArray(p0, p1, p2, p3, t, t2, t3, out2, arrDim) {
    var len2 = p0.length;
    if (arrDim === 1) {
      for (var i2 = 0; i2 < len2; i2++) {
        out2[i2] = catmullRomInterpolate(p0[i2], p1[i2], p2[i2], p3[i2], t, t2, t3);
      }
    } else {
      var len22 = p0[0].length;
      for (var i2 = 0; i2 < len2; i2++) {
        for (var j = 0; j < len22; j++) {
          out2[i2][j] = catmullRomInterpolate(p0[i2][j], p1[i2][j], p2[i2][j], p3[i2][j], t, t2, t3);
        }
      }
    }
  }
  function catmullRomInterpolate(p0, p1, p2, p3, t, t2, t3) {
    var v0 = (p2 - p0) * 0.5;
    var v1 = (p3 - p1) * 0.5;
    return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
  }
  function cloneValue(value) {
    if (isArrayLike$2(value)) {
      var len2 = value.length;
      if (isArrayLike$2(value[0])) {
        var ret = [];
        for (var i2 = 0; i2 < len2; i2++) {
          ret.push(arraySlice.call(value[i2]));
        }
        return ret;
      }
      return arraySlice.call(value);
    }
    return value;
  }
  function rgba2String(rgba) {
    rgba[0] = Math.floor(rgba[0]);
    rgba[1] = Math.floor(rgba[1]);
    rgba[2] = Math.floor(rgba[2]);
    return "rgba(" + rgba.join(",") + ")";
  }
  function getArrayDim(keyframes) {
    var lastValue = keyframes[keyframes.length - 1].value;
    return isArrayLike$2(lastValue && lastValue[0]) ? 2 : 1;
  }
  function createTrackClip(animator, easing2, oneTrackDone, keyframes, propName, forceAnimate) {
    var getter = animator._getter;
    var setter = animator._setter;
    var useSpline = easing2 === "spline";
    var trackLen = keyframes.length;
    if (!trackLen) {
      return;
    }
    var firstVal = keyframes[0].value;
    var isValueArray = isArrayLike$2(firstVal);
    var isValueColor = false;
    var isValueString = false;
    var arrDim = isValueArray ? getArrayDim(keyframes) : 0;
    var trackMaxTime;
    keyframes.sort(function(a, b) {
      return a.time - b.time;
    });
    trackMaxTime = keyframes[trackLen - 1].time;
    var kfPercents = [];
    var kfValues = [];
    var prevValue = keyframes[0].value;
    var isAllValueEqual = true;
    for (var i2 = 0; i2 < trackLen; i2++) {
      kfPercents.push(keyframes[i2].time / trackMaxTime);
      var value = keyframes[i2].value;
      if (!(isValueArray && isArraySame(value, prevValue, arrDim) || !isValueArray && value === prevValue)) {
        isAllValueEqual = false;
      }
      prevValue = value;
      if (typeof value === "string") {
        var colorArray = color.parse(value);
        if (colorArray) {
          value = colorArray;
          isValueColor = true;
        } else {
          isValueString = true;
        }
      }
      kfValues.push(value);
    }
    if (!forceAnimate && isAllValueEqual) {
      return;
    }
    var lastValue = kfValues[trackLen - 1];
    for (var i2 = 0; i2 < trackLen - 1; i2++) {
      if (isValueArray) {
        fillArr(kfValues[i2], lastValue, arrDim);
      } else {
        if (isNaN(kfValues[i2]) && !isNaN(lastValue) && !isValueString && !isValueColor) {
          kfValues[i2] = lastValue;
        }
      }
    }
    isValueArray && fillArr(getter(animator._target, propName), lastValue, arrDim);
    var lastFrame = 0;
    var lastFramePercent = 0;
    var start2;
    var w;
    var p0;
    var p1;
    var p2;
    var p3;
    if (isValueColor) {
      var rgba = [0, 0, 0, 0];
    }
    var onframe = function(target, percent) {
      var frame;
      if (percent < 0) {
        frame = 0;
      } else if (percent < lastFramePercent) {
        start2 = Math.min(lastFrame + 1, trackLen - 1);
        for (frame = start2; frame >= 0; frame--) {
          if (kfPercents[frame] <= percent) {
            break;
          }
        }
        frame = Math.min(frame, trackLen - 2);
      } else {
        for (frame = lastFrame; frame < trackLen; frame++) {
          if (kfPercents[frame] > percent) {
            break;
          }
        }
        frame = Math.min(frame - 1, trackLen - 2);
      }
      lastFrame = frame;
      lastFramePercent = percent;
      var range = kfPercents[frame + 1] - kfPercents[frame];
      if (range === 0) {
        return;
      } else {
        w = (percent - kfPercents[frame]) / range;
      }
      if (useSpline) {
        p1 = kfValues[frame];
        p0 = kfValues[frame === 0 ? frame : frame - 1];
        p2 = kfValues[frame > trackLen - 2 ? trackLen - 1 : frame + 1];
        p3 = kfValues[frame > trackLen - 3 ? trackLen - 1 : frame + 2];
        if (isValueArray) {
          catmullRomInterpolateArray(p0, p1, p2, p3, w, w * w, w * w * w, getter(target, propName), arrDim);
        } else {
          var value2;
          if (isValueColor) {
            value2 = catmullRomInterpolateArray(p0, p1, p2, p3, w, w * w, w * w * w, rgba, 1);
            value2 = rgba2String(rgba);
          } else if (isValueString) {
            return interpolateString(p1, p2, w);
          } else {
            value2 = catmullRomInterpolate(p0, p1, p2, p3, w, w * w, w * w * w);
          }
          setter(target, propName, value2);
        }
      } else {
        if (isValueArray) {
          interpolateArray(kfValues[frame], kfValues[frame + 1], w, getter(target, propName), arrDim);
        } else {
          var value2;
          if (isValueColor) {
            interpolateArray(kfValues[frame], kfValues[frame + 1], w, rgba, 1);
            value2 = rgba2String(rgba);
          } else if (isValueString) {
            return interpolateString(kfValues[frame], kfValues[frame + 1], w);
          } else {
            value2 = interpolateNumber(kfValues[frame], kfValues[frame + 1], w);
          }
          setter(target, propName, value2);
        }
      }
    };
    var clip = new Clip({
      target: animator._target,
      life: trackMaxTime,
      loop: animator._loop,
      delay: animator._delay,
      onframe,
      ondestroy: oneTrackDone
    });
    if (easing2 && easing2 !== "spline") {
      clip.easing = easing2;
    }
    return clip;
  }
  var Animator$2 = function(target, loop, getter, setter) {
    this._tracks = {};
    this._target = target;
    this._loop = loop || false;
    this._getter = getter || defaultGetter;
    this._setter = setter || defaultSetter;
    this._clipCount = 0;
    this._delay = 0;
    this._doneList = [];
    this._onframeList = [];
    this._clipList = [];
  };
  Animator$2.prototype = {
    when: function(time, props) {
      var tracks = this._tracks;
      for (var propName in props) {
        if (!props.hasOwnProperty(propName)) {
          continue;
        }
        if (!tracks[propName]) {
          tracks[propName] = [];
          var value = this._getter(this._target, propName);
          if (value == null) {
            continue;
          }
          if (time !== 0) {
            tracks[propName].push({
              time: 0,
              value: cloneValue(value)
            });
          }
        }
        tracks[propName].push({
          time,
          value: props[propName]
        });
      }
      return this;
    },
    during: function(callback) {
      this._onframeList.push(callback);
      return this;
    },
    pause: function() {
      for (var i2 = 0; i2 < this._clipList.length; i2++) {
        this._clipList[i2].pause();
      }
      this._paused = true;
    },
    resume: function() {
      for (var i2 = 0; i2 < this._clipList.length; i2++) {
        this._clipList[i2].resume();
      }
      this._paused = false;
    },
    isPaused: function() {
      return !!this._paused;
    },
    _doneCallback: function() {
      this._tracks = {};
      this._clipList.length = 0;
      var doneList = this._doneList;
      var len2 = doneList.length;
      for (var i2 = 0; i2 < len2; i2++) {
        doneList[i2].call(this);
      }
    },
    start: function(easing2, forceAnimate) {
      var self2 = this;
      var clipCount = 0;
      var oneTrackDone = function() {
        clipCount--;
        if (!clipCount) {
          self2._doneCallback();
        }
      };
      var lastClip;
      for (var propName in this._tracks) {
        if (!this._tracks.hasOwnProperty(propName)) {
          continue;
        }
        var clip = createTrackClip(this, easing2, oneTrackDone, this._tracks[propName], propName, forceAnimate);
        if (clip) {
          this._clipList.push(clip);
          clipCount++;
          if (this.animation) {
            this.animation.addClip(clip);
          }
          lastClip = clip;
        }
      }
      if (lastClip) {
        var oldOnFrame = lastClip.onframe;
        lastClip.onframe = function(target, percent) {
          oldOnFrame(target, percent);
          for (var i2 = 0; i2 < self2._onframeList.length; i2++) {
            self2._onframeList[i2](target, percent);
          }
        };
      }
      if (!clipCount) {
        this._doneCallback();
      }
      return this;
    },
    stop: function(forwardToLast) {
      var clipList = this._clipList;
      var animation = this.animation;
      for (var i2 = 0; i2 < clipList.length; i2++) {
        var clip = clipList[i2];
        if (forwardToLast) {
          clip.onframe(this._target, 1);
        }
        animation && animation.removeClip(clip);
      }
      clipList.length = 0;
    },
    delay: function(time) {
      this._delay = time;
      return this;
    },
    done: function(cb) {
      if (cb) {
        this._doneList.push(cb);
      }
      return this;
    },
    getClips: function() {
      return this._clipList;
    }
  };
  var _default$1D = Animator$2;
  var Animator_1 = _default$1D;
  var config = {};
  var dpr$1 = 1;
  if (typeof window !== "undefined") {
    dpr$1 = Math.max(window.devicePixelRatio || 1, 1);
  }
  var debugMode$1 = 0;
  var devicePixelRatio$2 = dpr$1;
  config.debugMode = debugMode$1;
  config.devicePixelRatio = devicePixelRatio$2;
  var _config$3 = config;
  var debugMode = _config$3.debugMode;
  var logError$2 = function() {
  };
  if (debugMode === 1) {
    logError$2 = console.error;
  }
  var _default$1C = logError$2;
  var log = _default$1C;
  var Animator$1 = Animator_1;
  var logError$1 = log;
  var _util$t = util$6;
  var isString$7 = _util$t.isString;
  var isFunction$3 = _util$t.isFunction;
  var isObject$c = _util$t.isObject;
  var isArrayLike$1 = _util$t.isArrayLike;
  var indexOf$2 = _util$t.indexOf;
  var Animatable$1 = function() {
    this.animators = [];
  };
  Animatable$1.prototype = {
    constructor: Animatable$1,
    animate: function(path2, loop) {
      var target;
      var animatingShape = false;
      var el = this;
      var zr = this.__zr;
      if (path2) {
        var pathSplitted = path2.split(".");
        var prop2 = el;
        animatingShape = pathSplitted[0] === "shape";
        for (var i2 = 0, l = pathSplitted.length; i2 < l; i2++) {
          if (!prop2) {
            continue;
          }
          prop2 = prop2[pathSplitted[i2]];
        }
        if (prop2) {
          target = prop2;
        }
      } else {
        target = el;
      }
      if (!target) {
        logError$1('Property "' + path2 + '" is not existed in element ' + el.id);
        return;
      }
      var animators = el.animators;
      var animator = new Animator$1(target, loop);
      animator.during(function(target2) {
        el.dirty(animatingShape);
      }).done(function() {
        animators.splice(indexOf$2(animators, animator), 1);
      });
      animators.push(animator);
      if (zr) {
        zr.animation.addAnimator(animator);
      }
      return animator;
    },
    stopAnimation: function(forwardToLast) {
      var animators = this.animators;
      var len2 = animators.length;
      for (var i2 = 0; i2 < len2; i2++) {
        animators[i2].stop(forwardToLast);
      }
      animators.length = 0;
      return this;
    },
    animateTo: function(target, time, delay, easing2, callback, forceAnimate) {
      animateTo(this, target, time, delay, easing2, callback, forceAnimate);
    },
    animateFrom: function(target, time, delay, easing2, callback, forceAnimate) {
      animateTo(this, target, time, delay, easing2, callback, forceAnimate, true);
    }
  };
  function animateTo(animatable, target, time, delay, easing2, callback, forceAnimate, reverse) {
    if (isString$7(delay)) {
      callback = easing2;
      easing2 = delay;
      delay = 0;
    } else if (isFunction$3(easing2)) {
      callback = easing2;
      easing2 = "linear";
      delay = 0;
    } else if (isFunction$3(delay)) {
      callback = delay;
      delay = 0;
    } else if (isFunction$3(time)) {
      callback = time;
      time = 500;
    } else if (!time) {
      time = 500;
    }
    animatable.stopAnimation();
    animateToShallow(animatable, "", animatable, target, time, delay, reverse);
    var animators = animatable.animators.slice();
    var count = animators.length;
    function done() {
      count--;
      if (!count) {
        callback && callback();
      }
    }
    if (!count) {
      callback && callback();
    }
    for (var i2 = 0; i2 < animators.length; i2++) {
      animators[i2].done(done).start(easing2, forceAnimate);
    }
  }
  function animateToShallow(animatable, path2, source, target, time, delay, reverse) {
    var objShallow = {};
    var propertyCount = 0;
    for (var name in target) {
      if (!target.hasOwnProperty(name)) {
        continue;
      }
      if (source[name] != null) {
        if (isObject$c(target[name]) && !isArrayLike$1(target[name])) {
          animateToShallow(animatable, path2 ? path2 + "." + name : name, source[name], target[name], time, delay, reverse);
        } else {
          if (reverse) {
            objShallow[name] = source[name];
            setAttrByPath(animatable, path2, name, target[name]);
          } else {
            objShallow[name] = target[name];
          }
          propertyCount++;
        }
      } else if (target[name] != null && !reverse) {
        setAttrByPath(animatable, path2, name, target[name]);
      }
    }
    if (propertyCount > 0) {
      animatable.animate(path2, false).when(time == null ? 500 : time, objShallow).delay(delay || 0);
    }
  }
  function setAttrByPath(el, path2, name, value) {
    if (!path2) {
      el.attr(name, value);
    } else {
      var props = {};
      props[path2] = {};
      props[path2][name] = value;
      el.attr(props);
    }
  }
  var _default$1B = Animatable$1;
  var Animatable_1 = _default$1B;
  var guid$1 = guid$2;
  var Eventful$1 = Eventful_1;
  var Transformable$1 = Transformable_1;
  var Animatable = Animatable_1;
  var zrUtil$11 = util$6;
  var Element$2 = function(opts) {
    Transformable$1.call(this, opts);
    Eventful$1.call(this, opts);
    Animatable.call(this, opts);
    this.id = opts.id || guid$1();
  };
  Element$2.prototype = {
    type: "element",
    name: "",
    __zr: null,
    ignore: false,
    clipPath: null,
    isGroup: false,
    drift: function(dx, dy) {
      switch (this.draggable) {
        case "horizontal":
          dy = 0;
          break;
        case "vertical":
          dx = 0;
          break;
      }
      var m2 = this.transform;
      if (!m2) {
        m2 = this.transform = [1, 0, 0, 1, 0, 0];
      }
      m2[4] += dx;
      m2[5] += dy;
      this.decomposeTransform();
      this.dirty(false);
    },
    beforeUpdate: function() {
    },
    afterUpdate: function() {
    },
    update: function() {
      this.updateTransform();
    },
    traverse: function(cb, context) {
    },
    attrKV: function(key, value) {
      if (key === "position" || key === "scale" || key === "origin") {
        if (value) {
          var target = this[key];
          if (!target) {
            target = this[key] = [];
          }
          target[0] = value[0];
          target[1] = value[1];
        }
      } else {
        this[key] = value;
      }
    },
    hide: function() {
      this.ignore = true;
      this.__zr && this.__zr.refresh();
    },
    show: function() {
      this.ignore = false;
      this.__zr && this.__zr.refresh();
    },
    attr: function(key, value) {
      if (typeof key === "string") {
        this.attrKV(key, value);
      } else if (zrUtil$11.isObject(key)) {
        for (var name in key) {
          if (key.hasOwnProperty(name)) {
            this.attrKV(name, key[name]);
          }
        }
      }
      this.dirty(false);
      return this;
    },
    setClipPath: function(clipPath) {
      var zr = this.__zr;
      if (zr) {
        clipPath.addSelfToZr(zr);
      }
      if (this.clipPath && this.clipPath !== clipPath) {
        this.removeClipPath();
      }
      this.clipPath = clipPath;
      clipPath.__zr = zr;
      clipPath.__clipTarget = this;
      this.dirty(false);
    },
    removeClipPath: function() {
      var clipPath = this.clipPath;
      if (clipPath) {
        if (clipPath.__zr) {
          clipPath.removeSelfFromZr(clipPath.__zr);
        }
        clipPath.__zr = null;
        clipPath.__clipTarget = null;
        this.clipPath = null;
        this.dirty(false);
      }
    },
    addSelfToZr: function(zr) {
      this.__zr = zr;
      var animators = this.animators;
      if (animators) {
        for (var i2 = 0; i2 < animators.length; i2++) {
          zr.animation.addAnimator(animators[i2]);
        }
      }
      if (this.clipPath) {
        this.clipPath.addSelfToZr(zr);
      }
    },
    removeSelfFromZr: function(zr) {
      this.__zr = null;
      var animators = this.animators;
      if (animators) {
        for (var i2 = 0; i2 < animators.length; i2++) {
          zr.animation.removeAnimator(animators[i2]);
        }
      }
      if (this.clipPath) {
        this.clipPath.removeSelfFromZr(zr);
      }
    }
  };
  zrUtil$11.mixin(Element$2, Animatable);
  zrUtil$11.mixin(Element$2, Transformable$1);
  zrUtil$11.mixin(Element$2, Eventful$1);
  var _default$1A = Element$2;
  var Element_1 = _default$1A;
  var vec2$5 = vector$3;
  var matrix$4 = matrix$6;
  var v2ApplyTransform$2 = vec2$5.applyTransform;
  var mathMin$3 = Math.min;
  var mathMax$3 = Math.max;
  function BoundingRect$d(x, y, width, height) {
    if (width < 0) {
      x = x + width;
      width = -width;
    }
    if (height < 0) {
      y = y + height;
      height = -height;
    }
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  BoundingRect$d.prototype = {
    constructor: BoundingRect$d,
    union: function(other) {
      var x = mathMin$3(other.x, this.x);
      var y = mathMin$3(other.y, this.y);
      this.width = mathMax$3(other.x + other.width, this.x + this.width) - x;
      this.height = mathMax$3(other.y + other.height, this.y + this.height) - y;
      this.x = x;
      this.y = y;
    },
    applyTransform: function() {
      var lt = [];
      var rb = [];
      var lb = [];
      var rt = [];
      return function(m2) {
        if (!m2) {
          return;
        }
        lt[0] = lb[0] = this.x;
        lt[1] = rt[1] = this.y;
        rb[0] = rt[0] = this.x + this.width;
        rb[1] = lb[1] = this.y + this.height;
        v2ApplyTransform$2(lt, lt, m2);
        v2ApplyTransform$2(rb, rb, m2);
        v2ApplyTransform$2(lb, lb, m2);
        v2ApplyTransform$2(rt, rt, m2);
        this.x = mathMin$3(lt[0], rb[0], lb[0], rt[0]);
        this.y = mathMin$3(lt[1], rb[1], lb[1], rt[1]);
        var maxX = mathMax$3(lt[0], rb[0], lb[0], rt[0]);
        var maxY = mathMax$3(lt[1], rb[1], lb[1], rt[1]);
        this.width = maxX - this.x;
        this.height = maxY - this.y;
      };
    }(),
    calculateTransform: function(b) {
      var a = this;
      var sx = b.width / a.width;
      var sy = b.height / a.height;
      var m2 = matrix$4.create();
      matrix$4.translate(m2, m2, [-a.x, -a.y]);
      matrix$4.scale(m2, m2, [sx, sy]);
      matrix$4.translate(m2, m2, [b.x, b.y]);
      return m2;
    },
    intersect: function(b) {
      if (!b) {
        return false;
      }
      if (!(b instanceof BoundingRect$d)) {
        b = BoundingRect$d.create(b);
      }
      var a = this;
      var ax0 = a.x;
      var ax1 = a.x + a.width;
      var ay0 = a.y;
      var ay1 = a.y + a.height;
      var bx0 = b.x;
      var bx1 = b.x + b.width;
      var by0 = b.y;
      var by1 = b.y + b.height;
      return !(ax1 < bx0 || bx1 < ax0 || ay1 < by0 || by1 < ay0);
    },
    contain: function(x, y) {
      var rect = this;
      return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
    },
    clone: function() {
      return new BoundingRect$d(this.x, this.y, this.width, this.height);
    },
    copy: function(other) {
      this.x = other.x;
      this.y = other.y;
      this.width = other.width;
      this.height = other.height;
    },
    plain: function() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      };
    }
  };
  BoundingRect$d.create = function(rect) {
    return new BoundingRect$d(rect.x, rect.y, rect.width, rect.height);
  };
  var _default$1z = BoundingRect$d;
  var BoundingRect_1 = _default$1z;
  var zrUtil$10 = util$6;
  var Element$1 = Element_1;
  var BoundingRect$c = BoundingRect_1;
  var Group$6 = function(opts) {
    opts = opts || {};
    Element$1.call(this, opts);
    for (var key in opts) {
      if (opts.hasOwnProperty(key)) {
        this[key] = opts[key];
      }
    }
    this._children = [];
    this.__storage = null;
    this.__dirty = true;
  };
  Group$6.prototype = {
    constructor: Group$6,
    isGroup: true,
    type: "group",
    silent: false,
    children: function() {
      return this._children.slice();
    },
    childAt: function(idx) {
      return this._children[idx];
    },
    childOfName: function(name) {
      var children = this._children;
      for (var i2 = 0; i2 < children.length; i2++) {
        if (children[i2].name === name) {
          return children[i2];
        }
      }
    },
    childCount: function() {
      return this._children.length;
    },
    add: function(child) {
      if (child && child !== this && child.parent !== this) {
        this._children.push(child);
        this._doAdd(child);
      }
      return this;
    },
    addBefore: function(child, nextSibling) {
      if (child && child !== this && child.parent !== this && nextSibling && nextSibling.parent === this) {
        var children = this._children;
        var idx = children.indexOf(nextSibling);
        if (idx >= 0) {
          children.splice(idx, 0, child);
          this._doAdd(child);
        }
      }
      return this;
    },
    _doAdd: function(child) {
      if (child.parent) {
        child.parent.remove(child);
      }
      child.parent = this;
      var storage2 = this.__storage;
      var zr = this.__zr;
      if (storage2 && storage2 !== child.__storage) {
        storage2.addToStorage(child);
        if (child instanceof Group$6) {
          child.addChildrenToStorage(storage2);
        }
      }
      zr && zr.refresh();
    },
    remove: function(child) {
      var zr = this.__zr;
      var storage2 = this.__storage;
      var children = this._children;
      var idx = zrUtil$10.indexOf(children, child);
      if (idx < 0) {
        return this;
      }
      children.splice(idx, 1);
      child.parent = null;
      if (storage2) {
        storage2.delFromStorage(child);
        if (child instanceof Group$6) {
          child.delChildrenFromStorage(storage2);
        }
      }
      zr && zr.refresh();
      return this;
    },
    removeAll: function() {
      var children = this._children;
      var storage2 = this.__storage;
      var child;
      var i2;
      for (i2 = 0; i2 < children.length; i2++) {
        child = children[i2];
        if (storage2) {
          storage2.delFromStorage(child);
          if (child instanceof Group$6) {
            child.delChildrenFromStorage(storage2);
          }
        }
        child.parent = null;
      }
      children.length = 0;
      return this;
    },
    eachChild: function(cb, context) {
      var children = this._children;
      for (var i2 = 0; i2 < children.length; i2++) {
        var child = children[i2];
        cb.call(context, child, i2);
      }
      return this;
    },
    traverse: function(cb, context) {
      for (var i2 = 0; i2 < this._children.length; i2++) {
        var child = this._children[i2];
        cb.call(context, child);
        if (child.type === "group") {
          child.traverse(cb, context);
        }
      }
      return this;
    },
    addChildrenToStorage: function(storage2) {
      for (var i2 = 0; i2 < this._children.length; i2++) {
        var child = this._children[i2];
        storage2.addToStorage(child);
        if (child instanceof Group$6) {
          child.addChildrenToStorage(storage2);
        }
      }
    },
    delChildrenFromStorage: function(storage2) {
      for (var i2 = 0; i2 < this._children.length; i2++) {
        var child = this._children[i2];
        storage2.delFromStorage(child);
        if (child instanceof Group$6) {
          child.delChildrenFromStorage(storage2);
        }
      }
    },
    dirty: function() {
      this.__dirty = true;
      this.__zr && this.__zr.refresh();
      return this;
    },
    getBoundingRect: function(includeChildren) {
      var rect = null;
      var tmpRect2 = new BoundingRect$c(0, 0, 0, 0);
      var children = includeChildren || this._children;
      var tmpMat = [];
      for (var i2 = 0; i2 < children.length; i2++) {
        var child = children[i2];
        if (child.ignore || child.invisible) {
          continue;
        }
        var childRect = child.getBoundingRect();
        var transform = child.getLocalTransform(tmpMat);
        if (transform) {
          tmpRect2.copy(childRect);
          tmpRect2.applyTransform(transform);
          rect = rect || tmpRect2.clone();
          rect.union(tmpRect2);
        } else {
          rect = rect || childRect.clone();
          rect.union(childRect);
        }
      }
      return rect || tmpRect2;
    }
  };
  zrUtil$10.inherits(Group$6, Element$1);
  var _default$1y = Group$6;
  var Group_1 = _default$1y;
  var DEFAULT_MIN_MERGE = 32;
  var DEFAULT_MIN_GALLOPING = 7;
  function minRunLength(n) {
    var r = 0;
    while (n >= DEFAULT_MIN_MERGE) {
      r |= n & 1;
      n >>= 1;
    }
    return n + r;
  }
  function makeAscendingRun(array, lo, hi, compare2) {
    var runHi = lo + 1;
    if (runHi === hi) {
      return 1;
    }
    if (compare2(array[runHi++], array[lo]) < 0) {
      while (runHi < hi && compare2(array[runHi], array[runHi - 1]) < 0) {
        runHi++;
      }
      reverseRun(array, lo, runHi);
    } else {
      while (runHi < hi && compare2(array[runHi], array[runHi - 1]) >= 0) {
        runHi++;
      }
    }
    return runHi - lo;
  }
  function reverseRun(array, lo, hi) {
    hi--;
    while (lo < hi) {
      var t = array[lo];
      array[lo++] = array[hi];
      array[hi--] = t;
    }
  }
  function binaryInsertionSort(array, lo, hi, start2, compare2) {
    if (start2 === lo) {
      start2++;
    }
    for (; start2 < hi; start2++) {
      var pivot = array[start2];
      var left = lo;
      var right = start2;
      var mid;
      while (left < right) {
        mid = left + right >>> 1;
        if (compare2(pivot, array[mid]) < 0) {
          right = mid;
        } else {
          left = mid + 1;
        }
      }
      var n = start2 - left;
      switch (n) {
        case 3:
          array[left + 3] = array[left + 2];
        case 2:
          array[left + 2] = array[left + 1];
        case 1:
          array[left + 1] = array[left];
          break;
        default:
          while (n > 0) {
            array[left + n] = array[left + n - 1];
            n--;
          }
      }
      array[left] = pivot;
    }
  }
  function gallopLeft(value, array, start2, length2, hint, compare2) {
    var lastOffset = 0;
    var maxOffset = 0;
    var offset = 1;
    if (compare2(value, array[start2 + hint]) > 0) {
      maxOffset = length2 - hint;
      while (offset < maxOffset && compare2(value, array[start2 + hint + offset]) > 0) {
        lastOffset = offset;
        offset = (offset << 1) + 1;
        if (offset <= 0) {
          offset = maxOffset;
        }
      }
      if (offset > maxOffset) {
        offset = maxOffset;
      }
      lastOffset += hint;
      offset += hint;
    } else {
      maxOffset = hint + 1;
      while (offset < maxOffset && compare2(value, array[start2 + hint - offset]) <= 0) {
        lastOffset = offset;
        offset = (offset << 1) + 1;
        if (offset <= 0) {
          offset = maxOffset;
        }
      }
      if (offset > maxOffset) {
        offset = maxOffset;
      }
      var tmp = lastOffset;
      lastOffset = hint - offset;
      offset = hint - tmp;
    }
    lastOffset++;
    while (lastOffset < offset) {
      var m2 = lastOffset + (offset - lastOffset >>> 1);
      if (compare2(value, array[start2 + m2]) > 0) {
        lastOffset = m2 + 1;
      } else {
        offset = m2;
      }
    }
    return offset;
  }
  function gallopRight(value, array, start2, length2, hint, compare2) {
    var lastOffset = 0;
    var maxOffset = 0;
    var offset = 1;
    if (compare2(value, array[start2 + hint]) < 0) {
      maxOffset = hint + 1;
      while (offset < maxOffset && compare2(value, array[start2 + hint - offset]) < 0) {
        lastOffset = offset;
        offset = (offset << 1) + 1;
        if (offset <= 0) {
          offset = maxOffset;
        }
      }
      if (offset > maxOffset) {
        offset = maxOffset;
      }
      var tmp = lastOffset;
      lastOffset = hint - offset;
      offset = hint - tmp;
    } else {
      maxOffset = length2 - hint;
      while (offset < maxOffset && compare2(value, array[start2 + hint + offset]) >= 0) {
        lastOffset = offset;
        offset = (offset << 1) + 1;
        if (offset <= 0) {
          offset = maxOffset;
        }
      }
      if (offset > maxOffset) {
        offset = maxOffset;
      }
      lastOffset += hint;
      offset += hint;
    }
    lastOffset++;
    while (lastOffset < offset) {
      var m2 = lastOffset + (offset - lastOffset >>> 1);
      if (compare2(value, array[start2 + m2]) < 0) {
        offset = m2;
      } else {
        lastOffset = m2 + 1;
      }
    }
    return offset;
  }
  function TimSort(array, compare2) {
    var minGallop = DEFAULT_MIN_GALLOPING;
    var runStart;
    var runLength;
    var stackSize = 0;
    var tmp = [];
    runStart = [];
    runLength = [];
    function pushRun(_runStart, _runLength) {
      runStart[stackSize] = _runStart;
      runLength[stackSize] = _runLength;
      stackSize += 1;
    }
    function mergeRuns() {
      while (stackSize > 1) {
        var n = stackSize - 2;
        if (n >= 1 && runLength[n - 1] <= runLength[n] + runLength[n + 1] || n >= 2 && runLength[n - 2] <= runLength[n] + runLength[n - 1]) {
          if (runLength[n - 1] < runLength[n + 1]) {
            n--;
          }
        } else if (runLength[n] > runLength[n + 1]) {
          break;
        }
        mergeAt(n);
      }
    }
    function forceMergeRuns() {
      while (stackSize > 1) {
        var n = stackSize - 2;
        if (n > 0 && runLength[n - 1] < runLength[n + 1]) {
          n--;
        }
        mergeAt(n);
      }
    }
    function mergeAt(i2) {
      var start1 = runStart[i2];
      var length1 = runLength[i2];
      var start2 = runStart[i2 + 1];
      var length2 = runLength[i2 + 1];
      runLength[i2] = length1 + length2;
      if (i2 === stackSize - 3) {
        runStart[i2 + 1] = runStart[i2 + 2];
        runLength[i2 + 1] = runLength[i2 + 2];
      }
      stackSize--;
      var k = gallopRight(array[start2], array, start1, length1, 0, compare2);
      start1 += k;
      length1 -= k;
      if (length1 === 0) {
        return;
      }
      length2 = gallopLeft(array[start1 + length1 - 1], array, start2, length2, length2 - 1, compare2);
      if (length2 === 0) {
        return;
      }
      if (length1 <= length2) {
        mergeLow(start1, length1, start2, length2);
      } else {
        mergeHigh(start1, length1, start2, length2);
      }
    }
    function mergeLow(start1, length1, start2, length2) {
      var i2 = 0;
      for (i2 = 0; i2 < length1; i2++) {
        tmp[i2] = array[start1 + i2];
      }
      var cursor1 = 0;
      var cursor2 = start2;
      var dest = start1;
      array[dest++] = array[cursor2++];
      if (--length2 === 0) {
        for (i2 = 0; i2 < length1; i2++) {
          array[dest + i2] = tmp[cursor1 + i2];
        }
        return;
      }
      if (length1 === 1) {
        for (i2 = 0; i2 < length2; i2++) {
          array[dest + i2] = array[cursor2 + i2];
        }
        array[dest + length2] = tmp[cursor1];
        return;
      }
      var _minGallop = minGallop;
      var count1;
      var count2;
      var exit;
      while (1) {
        count1 = 0;
        count2 = 0;
        exit = false;
        do {
          if (compare2(array[cursor2], tmp[cursor1]) < 0) {
            array[dest++] = array[cursor2++];
            count2++;
            count1 = 0;
            if (--length2 === 0) {
              exit = true;
              break;
            }
          } else {
            array[dest++] = tmp[cursor1++];
            count1++;
            count2 = 0;
            if (--length1 === 1) {
              exit = true;
              break;
            }
          }
        } while ((count1 | count2) < _minGallop);
        if (exit) {
          break;
        }
        do {
          count1 = gallopRight(array[cursor2], tmp, cursor1, length1, 0, compare2);
          if (count1 !== 0) {
            for (i2 = 0; i2 < count1; i2++) {
              array[dest + i2] = tmp[cursor1 + i2];
            }
            dest += count1;
            cursor1 += count1;
            length1 -= count1;
            if (length1 <= 1) {
              exit = true;
              break;
            }
          }
          array[dest++] = array[cursor2++];
          if (--length2 === 0) {
            exit = true;
            break;
          }
          count2 = gallopLeft(tmp[cursor1], array, cursor2, length2, 0, compare2);
          if (count2 !== 0) {
            for (i2 = 0; i2 < count2; i2++) {
              array[dest + i2] = array[cursor2 + i2];
            }
            dest += count2;
            cursor2 += count2;
            length2 -= count2;
            if (length2 === 0) {
              exit = true;
              break;
            }
          }
          array[dest++] = tmp[cursor1++];
          if (--length1 === 1) {
            exit = true;
            break;
          }
          _minGallop--;
        } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);
        if (exit) {
          break;
        }
        if (_minGallop < 0) {
          _minGallop = 0;
        }
        _minGallop += 2;
      }
      minGallop = _minGallop;
      minGallop < 1 && (minGallop = 1);
      if (length1 === 1) {
        for (i2 = 0; i2 < length2; i2++) {
          array[dest + i2] = array[cursor2 + i2];
        }
        array[dest + length2] = tmp[cursor1];
      } else if (length1 === 0) {
        throw new Error();
      } else {
        for (i2 = 0; i2 < length1; i2++) {
          array[dest + i2] = tmp[cursor1 + i2];
        }
      }
    }
    function mergeHigh(start1, length1, start2, length2) {
      var i2 = 0;
      for (i2 = 0; i2 < length2; i2++) {
        tmp[i2] = array[start2 + i2];
      }
      var cursor1 = start1 + length1 - 1;
      var cursor2 = length2 - 1;
      var dest = start2 + length2 - 1;
      var customCursor = 0;
      var customDest = 0;
      array[dest--] = array[cursor1--];
      if (--length1 === 0) {
        customCursor = dest - (length2 - 1);
        for (i2 = 0; i2 < length2; i2++) {
          array[customCursor + i2] = tmp[i2];
        }
        return;
      }
      if (length2 === 1) {
        dest -= length1;
        cursor1 -= length1;
        customDest = dest + 1;
        customCursor = cursor1 + 1;
        for (i2 = length1 - 1; i2 >= 0; i2--) {
          array[customDest + i2] = array[customCursor + i2];
        }
        array[dest] = tmp[cursor2];
        return;
      }
      var _minGallop = minGallop;
      while (true) {
        var count1 = 0;
        var count2 = 0;
        var exit = false;
        do {
          if (compare2(tmp[cursor2], array[cursor1]) < 0) {
            array[dest--] = array[cursor1--];
            count1++;
            count2 = 0;
            if (--length1 === 0) {
              exit = true;
              break;
            }
          } else {
            array[dest--] = tmp[cursor2--];
            count2++;
            count1 = 0;
            if (--length2 === 1) {
              exit = true;
              break;
            }
          }
        } while ((count1 | count2) < _minGallop);
        if (exit) {
          break;
        }
        do {
          count1 = length1 - gallopRight(tmp[cursor2], array, start1, length1, length1 - 1, compare2);
          if (count1 !== 0) {
            dest -= count1;
            cursor1 -= count1;
            length1 -= count1;
            customDest = dest + 1;
            customCursor = cursor1 + 1;
            for (i2 = count1 - 1; i2 >= 0; i2--) {
              array[customDest + i2] = array[customCursor + i2];
            }
            if (length1 === 0) {
              exit = true;
              break;
            }
          }
          array[dest--] = tmp[cursor2--];
          if (--length2 === 1) {
            exit = true;
            break;
          }
          count2 = length2 - gallopLeft(array[cursor1], tmp, 0, length2, length2 - 1, compare2);
          if (count2 !== 0) {
            dest -= count2;
            cursor2 -= count2;
            length2 -= count2;
            customDest = dest + 1;
            customCursor = cursor2 + 1;
            for (i2 = 0; i2 < count2; i2++) {
              array[customDest + i2] = tmp[customCursor + i2];
            }
            if (length2 <= 1) {
              exit = true;
              break;
            }
          }
          array[dest--] = array[cursor1--];
          if (--length1 === 0) {
            exit = true;
            break;
          }
          _minGallop--;
        } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);
        if (exit) {
          break;
        }
        if (_minGallop < 0) {
          _minGallop = 0;
        }
        _minGallop += 2;
      }
      minGallop = _minGallop;
      if (minGallop < 1) {
        minGallop = 1;
      }
      if (length2 === 1) {
        dest -= length1;
        cursor1 -= length1;
        customDest = dest + 1;
        customCursor = cursor1 + 1;
        for (i2 = length1 - 1; i2 >= 0; i2--) {
          array[customDest + i2] = array[customCursor + i2];
        }
        array[dest] = tmp[cursor2];
      } else if (length2 === 0) {
        throw new Error();
      } else {
        customCursor = dest - (length2 - 1);
        for (i2 = 0; i2 < length2; i2++) {
          array[customCursor + i2] = tmp[i2];
        }
      }
    }
    this.mergeRuns = mergeRuns;
    this.forceMergeRuns = forceMergeRuns;
    this.pushRun = pushRun;
  }
  function sort(array, compare2, lo, hi) {
    if (!lo) {
      lo = 0;
    }
    if (!hi) {
      hi = array.length;
    }
    var remaining = hi - lo;
    if (remaining < 2) {
      return;
    }
    var runLength = 0;
    if (remaining < DEFAULT_MIN_MERGE) {
      runLength = makeAscendingRun(array, lo, hi, compare2);
      binaryInsertionSort(array, lo, hi, lo + runLength, compare2);
      return;
    }
    var ts = new TimSort(array, compare2);
    var minRun = minRunLength(remaining);
    do {
      runLength = makeAscendingRun(array, lo, hi, compare2);
      if (runLength < minRun) {
        var force = remaining;
        if (force > minRun) {
          force = minRun;
        }
        binaryInsertionSort(array, lo, lo + force, lo + runLength, compare2);
        runLength = force;
      }
      ts.pushRun(lo, runLength);
      ts.mergeRuns();
      remaining -= runLength;
      lo += runLength;
    } while (remaining !== 0);
    ts.forceMergeRuns();
  }
  var timsort$2 = sort;
  var util$4 = util$6;
  var env$a = env_1;
  var Group$5 = Group_1;
  var timsort$1 = timsort$2;
  function shapeCompareFunc(a, b) {
    if (a.zlevel === b.zlevel) {
      if (a.z === b.z) {
        return a.z2 - b.z2;
      }
      return a.z - b.z;
    }
    return a.zlevel - b.zlevel;
  }
  var Storage$1 = function() {
    this._roots = [];
    this._displayList = [];
    this._displayListLen = 0;
  };
  Storage$1.prototype = {
    constructor: Storage$1,
    traverse: function(cb, context) {
      for (var i2 = 0; i2 < this._roots.length; i2++) {
        this._roots[i2].traverse(cb, context);
      }
    },
    getDisplayList: function(update, includeIgnore) {
      includeIgnore = includeIgnore || false;
      if (update) {
        this.updateDisplayList(includeIgnore);
      }
      return this._displayList;
    },
    updateDisplayList: function(includeIgnore) {
      this._displayListLen = 0;
      var roots2 = this._roots;
      var displayList = this._displayList;
      for (var i2 = 0, len2 = roots2.length; i2 < len2; i2++) {
        this._updateAndAddDisplayable(roots2[i2], null, includeIgnore);
      }
      displayList.length = this._displayListLen;
      env$a.canvasSupported && timsort$1(displayList, shapeCompareFunc);
    },
    _updateAndAddDisplayable: function(el, clipPaths, includeIgnore) {
      if (el.ignore && !includeIgnore) {
        return;
      }
      el.beforeUpdate();
      if (el.__dirty) {
        el.update();
      }
      el.afterUpdate();
      var userSetClipPath = el.clipPath;
      if (userSetClipPath) {
        if (clipPaths) {
          clipPaths = clipPaths.slice();
        } else {
          clipPaths = [];
        }
        var currentClipPath = userSetClipPath;
        var parentClipPath = el;
        while (currentClipPath) {
          currentClipPath.parent = parentClipPath;
          currentClipPath.updateTransform();
          clipPaths.push(currentClipPath);
          parentClipPath = currentClipPath;
          currentClipPath = currentClipPath.clipPath;
        }
      }
      if (el.isGroup) {
        var children = el._children;
        for (var i2 = 0; i2 < children.length; i2++) {
          var child = children[i2];
          if (el.__dirty) {
            child.__dirty = true;
          }
          this._updateAndAddDisplayable(child, clipPaths, includeIgnore);
        }
        el.__dirty = false;
      } else {
        el.__clipPaths = clipPaths;
        this._displayList[this._displayListLen++] = el;
      }
    },
    addRoot: function(el) {
      if (el.__storage === this) {
        return;
      }
      if (el instanceof Group$5) {
        el.addChildrenToStorage(this);
      }
      this.addToStorage(el);
      this._roots.push(el);
    },
    delRoot: function(el) {
      if (el == null) {
        for (var i2 = 0; i2 < this._roots.length; i2++) {
          var root = this._roots[i2];
          if (root instanceof Group$5) {
            root.delChildrenFromStorage(this);
          }
        }
        this._roots = [];
        this._displayList = [];
        this._displayListLen = 0;
        return;
      }
      if (el instanceof Array) {
        for (var i2 = 0, l = el.length; i2 < l; i2++) {
          this.delRoot(el[i2]);
        }
        return;
      }
      var idx = util$4.indexOf(this._roots, el);
      if (idx >= 0) {
        this.delFromStorage(el);
        this._roots.splice(idx, 1);
        if (el instanceof Group$5) {
          el.delChildrenFromStorage(this);
        }
      }
    },
    addToStorage: function(el) {
      if (el) {
        el.__storage = this;
        el.dirty(false);
      }
      return this;
    },
    delFromStorage: function(el) {
      if (el) {
        el.__storage = null;
      }
      return this;
    },
    dispose: function() {
      this._renderList = this._roots = null;
    },
    displayableSortFunc: shapeCompareFunc
  };
  var _default$1x = Storage$1;
  var Storage_1 = _default$1x;
  var SHADOW_PROPS = {
    "shadowBlur": 1,
    "shadowOffsetX": 1,
    "shadowOffsetY": 1,
    "textShadowBlur": 1,
    "textShadowOffsetX": 1,
    "textShadowOffsetY": 1,
    "textBoxShadowBlur": 1,
    "textBoxShadowOffsetX": 1,
    "textBoxShadowOffsetY": 1
  };
  function _default$1w(ctx, propName, value) {
    if (SHADOW_PROPS.hasOwnProperty(propName)) {
      return value *= ctx.dpr;
    }
    return value;
  }
  var fixShadow$2 = _default$1w;
  var constant = {};
  var ContextCachedBy$3 = {
    NONE: 0,
    STYLE_BIND: 1,
    PLAIN_TEXT: 2
  };
  var WILL_BE_RESTORED$2 = 9;
  constant.ContextCachedBy = ContextCachedBy$3;
  constant.WILL_BE_RESTORED = WILL_BE_RESTORED$2;
  var fixShadow$1 = fixShadow$2;
  var _constant$3 = constant;
  var ContextCachedBy$2 = _constant$3.ContextCachedBy;
  var STYLE_COMMON_PROPS = [["shadowBlur", 0], ["shadowOffsetX", 0], ["shadowOffsetY", 0], ["shadowColor", "#000"], ["lineCap", "butt"], ["lineJoin", "miter"], ["miterLimit", 10]];
  var Style$3 = function(opts) {
    this.extendFrom(opts, false);
  };
  function createLinearGradient(ctx, obj, rect) {
    var x = obj.x == null ? 0 : obj.x;
    var x2 = obj.x2 == null ? 1 : obj.x2;
    var y = obj.y == null ? 0 : obj.y;
    var y2 = obj.y2 == null ? 0 : obj.y2;
    if (!obj.global) {
      x = x * rect.width + rect.x;
      x2 = x2 * rect.width + rect.x;
      y = y * rect.height + rect.y;
      y2 = y2 * rect.height + rect.y;
    }
    x = isNaN(x) ? 0 : x;
    x2 = isNaN(x2) ? 1 : x2;
    y = isNaN(y) ? 0 : y;
    y2 = isNaN(y2) ? 0 : y2;
    var canvasGradient = ctx.createLinearGradient(x, y, x2, y2);
    return canvasGradient;
  }
  function createRadialGradient(ctx, obj, rect) {
    var width = rect.width;
    var height = rect.height;
    var min3 = Math.min(width, height);
    var x = obj.x == null ? 0.5 : obj.x;
    var y = obj.y == null ? 0.5 : obj.y;
    var r = obj.r == null ? 0.5 : obj.r;
    if (!obj.global) {
      x = x * width + rect.x;
      y = y * height + rect.y;
      r = r * min3;
    }
    var canvasGradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    return canvasGradient;
  }
  Style$3.prototype = {
    constructor: Style$3,
    fill: "#000",
    stroke: null,
    opacity: 1,
    fillOpacity: null,
    strokeOpacity: null,
    lineDash: null,
    lineDashOffset: 0,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    lineWidth: 1,
    strokeNoScale: false,
    text: null,
    font: null,
    textFont: null,
    fontStyle: null,
    fontWeight: null,
    fontSize: null,
    fontFamily: null,
    textTag: null,
    textFill: "#000",
    textStroke: null,
    textWidth: null,
    textHeight: null,
    textStrokeWidth: 0,
    textLineHeight: null,
    textPosition: "inside",
    textRect: null,
    textOffset: null,
    textAlign: null,
    textVerticalAlign: null,
    textDistance: 5,
    textShadowColor: "transparent",
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0,
    textBoxShadowColor: "transparent",
    textBoxShadowBlur: 0,
    textBoxShadowOffsetX: 0,
    textBoxShadowOffsetY: 0,
    transformText: false,
    textRotation: 0,
    textOrigin: null,
    textBackgroundColor: null,
    textBorderColor: null,
    textBorderWidth: 0,
    textBorderRadius: 0,
    textPadding: null,
    rich: null,
    truncate: null,
    blend: null,
    bind: function(ctx, el, prevEl) {
      var style = this;
      var prevStyle = prevEl && prevEl.style;
      var notCheckCache = !prevStyle || ctx.__attrCachedBy !== ContextCachedBy$2.STYLE_BIND;
      ctx.__attrCachedBy = ContextCachedBy$2.STYLE_BIND;
      for (var i2 = 0; i2 < STYLE_COMMON_PROPS.length; i2++) {
        var prop2 = STYLE_COMMON_PROPS[i2];
        var styleName = prop2[0];
        if (notCheckCache || style[styleName] !== prevStyle[styleName]) {
          ctx[styleName] = fixShadow$1(ctx, styleName, style[styleName] || prop2[1]);
        }
      }
      if (notCheckCache || style.fill !== prevStyle.fill) {
        ctx.fillStyle = style.fill;
      }
      if (notCheckCache || style.stroke !== prevStyle.stroke) {
        ctx.strokeStyle = style.stroke;
      }
      if (notCheckCache || style.opacity !== prevStyle.opacity) {
        ctx.globalAlpha = style.opacity == null ? 1 : style.opacity;
      }
      if (notCheckCache || style.blend !== prevStyle.blend) {
        ctx.globalCompositeOperation = style.blend || "source-over";
      }
      if (this.hasStroke()) {
        var lineWidth = style.lineWidth;
        ctx.lineWidth = lineWidth / (this.strokeNoScale && el && el.getLineScale ? el.getLineScale() : 1);
      }
    },
    hasFill: function() {
      var fill = this.fill;
      return fill != null && fill !== "none";
    },
    hasStroke: function() {
      var stroke = this.stroke;
      return stroke != null && stroke !== "none" && this.lineWidth > 0;
    },
    extendFrom: function(otherStyle, overwrite) {
      if (otherStyle) {
        for (var name in otherStyle) {
          if (otherStyle.hasOwnProperty(name) && (overwrite === true || (overwrite === false ? !this.hasOwnProperty(name) : otherStyle[name] != null))) {
            this[name] = otherStyle[name];
          }
        }
      }
    },
    set: function(obj, value) {
      if (typeof obj === "string") {
        this[obj] = value;
      } else {
        this.extendFrom(obj, true);
      }
    },
    clone: function() {
      var newStyle = new this.constructor();
      newStyle.extendFrom(this, true);
      return newStyle;
    },
    getGradient: function(ctx, obj, rect) {
      var method = obj.type === "radial" ? createRadialGradient : createLinearGradient;
      var canvasGradient = method(ctx, obj, rect);
      var colorStops = obj.colorStops;
      for (var i2 = 0; i2 < colorStops.length; i2++) {
        canvasGradient.addColorStop(colorStops[i2].offset, colorStops[i2].color);
      }
      return canvasGradient;
    }
  };
  var styleProto = Style$3.prototype;
  for (var i = 0; i < STYLE_COMMON_PROPS.length; i++) {
    var prop = STYLE_COMMON_PROPS[i];
    if (!(prop[0] in styleProto)) {
      styleProto[prop[0]] = prop[1];
    }
  }
  Style$3.getGradient = styleProto.getGradient;
  var _default$1v = Style$3;
  var Style_1 = _default$1v;
  var Pattern$2 = function(image2, repeat) {
    this.image = image2;
    this.repeat = repeat;
    this.type = "pattern";
  };
  Pattern$2.prototype.getCanvasPattern = function(ctx) {
    return ctx.createPattern(this.image, this.repeat || "repeat");
  };
  var _default$1u = Pattern$2;
  var Pattern_1 = _default$1u;
  var util$3 = util$6;
  var _config$2 = config;
  var devicePixelRatio$1 = _config$2.devicePixelRatio;
  var Style$2 = Style_1;
  var Pattern$1 = Pattern_1;
  function returnFalse() {
    return false;
  }
  function createDom(id, painter, dpr2) {
    var newDom = util$3.createCanvas();
    var width = painter.getWidth();
    var height = painter.getHeight();
    var newDomStyle = newDom.style;
    if (newDomStyle) {
      newDomStyle.position = "absolute";
      newDomStyle.left = 0;
      newDomStyle.top = 0;
      newDomStyle.width = width + "px";
      newDomStyle.height = height + "px";
      newDom.setAttribute("data-zr-dom-id", id);
    }
    newDom.width = width * dpr2;
    newDom.height = height * dpr2;
    return newDom;
  }
  var Layer$1 = function(id, painter, dpr2) {
    var dom2;
    dpr2 = dpr2 || devicePixelRatio$1;
    if (typeof id === "string") {
      dom2 = createDom(id, painter, dpr2);
    } else if (util$3.isObject(id)) {
      dom2 = id;
      id = dom2.id;
    }
    this.id = id;
    this.dom = dom2;
    var domStyle = dom2.style;
    if (domStyle) {
      dom2.onselectstart = returnFalse;
      domStyle["-webkit-user-select"] = "none";
      domStyle["user-select"] = "none";
      domStyle["-webkit-touch-callout"] = "none";
      domStyle["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)";
      domStyle["padding"] = 0;
      domStyle["margin"] = 0;
      domStyle["border-width"] = 0;
    }
    this.domBack = null;
    this.ctxBack = null;
    this.painter = painter;
    this.config = null;
    this.clearColor = 0;
    this.motionBlur = false;
    this.lastFrameAlpha = 0.7;
    this.dpr = dpr2;
  };
  Layer$1.prototype = {
    constructor: Layer$1,
    __dirty: true,
    __used: false,
    __drawIndex: 0,
    __startIndex: 0,
    __endIndex: 0,
    incremental: false,
    getElementCount: function() {
      return this.__endIndex - this.__startIndex;
    },
    initContext: function() {
      this.ctx = this.dom.getContext("2d");
      this.ctx.dpr = this.dpr;
    },
    createBackBuffer: function() {
      var dpr2 = this.dpr;
      this.domBack = createDom("back-" + this.id, this.painter, dpr2);
      this.ctxBack = this.domBack.getContext("2d");
      if (dpr2 !== 1) {
        this.ctxBack.scale(dpr2, dpr2);
      }
    },
    resize: function(width, height) {
      var dpr2 = this.dpr;
      var dom2 = this.dom;
      var domStyle = dom2.style;
      var domBack = this.domBack;
      if (domStyle) {
        domStyle.width = width + "px";
        domStyle.height = height + "px";
      }
      dom2.width = width * dpr2;
      dom2.height = height * dpr2;
      if (domBack) {
        domBack.width = width * dpr2;
        domBack.height = height * dpr2;
        if (dpr2 !== 1) {
          this.ctxBack.scale(dpr2, dpr2);
        }
      }
    },
    clear: function(clearAll, clearColor) {
      var dom2 = this.dom;
      var ctx = this.ctx;
      var width = dom2.width;
      var height = dom2.height;
      var clearColor = clearColor || this.clearColor;
      var haveMotionBLur = this.motionBlur && !clearAll;
      var lastFrameAlpha = this.lastFrameAlpha;
      var dpr2 = this.dpr;
      if (haveMotionBLur) {
        if (!this.domBack) {
          this.createBackBuffer();
        }
        this.ctxBack.globalCompositeOperation = "copy";
        this.ctxBack.drawImage(dom2, 0, 0, width / dpr2, height / dpr2);
      }
      ctx.clearRect(0, 0, width, height);
      if (clearColor && clearColor !== "transparent") {
        var clearColorGradientOrPattern;
        if (clearColor.colorStops) {
          clearColorGradientOrPattern = clearColor.__canvasGradient || Style$2.getGradient(ctx, clearColor, {
            x: 0,
            y: 0,
            width,
            height
          });
          clearColor.__canvasGradient = clearColorGradientOrPattern;
        } else if (clearColor.image) {
          clearColorGradientOrPattern = Pattern$1.prototype.getCanvasPattern.call(clearColor, ctx);
        }
        ctx.save();
        ctx.fillStyle = clearColorGradientOrPattern || clearColor;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }
      if (haveMotionBLur) {
        var domBack = this.domBack;
        ctx.save();
        ctx.globalAlpha = lastFrameAlpha;
        ctx.drawImage(domBack, 0, 0, width, height);
        ctx.restore();
      }
    }
  };
  var _default$1t = Layer$1;
  var Layer_1 = _default$1t;
  var _default$1s = typeof window !== "undefined" && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(func) {
    setTimeout(func, 16);
  };
  var requestAnimationFrame$2 = _default$1s;
  var text$1 = {};
  var text = {};
  var image = {};
  var LRU = LRU_1;
  var globalImageCache = new LRU(50);
  function findExistImage(newImageOrSrc) {
    if (typeof newImageOrSrc === "string") {
      var cachedImgObj = globalImageCache.get(newImageOrSrc);
      return cachedImgObj && cachedImgObj.image;
    } else {
      return newImageOrSrc;
    }
  }
  function createOrUpdateImage(newImageOrSrc, image2, hostEl, cb, cbPayload) {
    if (!newImageOrSrc) {
      return image2;
    } else if (typeof newImageOrSrc === "string") {
      if (image2 && image2.__zrImageSrc === newImageOrSrc || !hostEl) {
        return image2;
      }
      var cachedImgObj = globalImageCache.get(newImageOrSrc);
      var pendingWrap = {
        hostEl,
        cb,
        cbPayload
      };
      if (cachedImgObj) {
        image2 = cachedImgObj.image;
        !isImageReady(image2) && cachedImgObj.pending.push(pendingWrap);
      } else {
        image2 = new Image();
        image2.onload = image2.onerror = imageOnLoad;
        globalImageCache.put(newImageOrSrc, image2.__cachedImgObj = {
          image: image2,
          pending: [pendingWrap]
        });
        image2.src = image2.__zrImageSrc = newImageOrSrc;
      }
      return image2;
    } else {
      return newImageOrSrc;
    }
  }
  function imageOnLoad() {
    var cachedImgObj = this.__cachedImgObj;
    this.onload = this.onerror = this.__cachedImgObj = null;
    for (var i2 = 0; i2 < cachedImgObj.pending.length; i2++) {
      var pendingWrap = cachedImgObj.pending[i2];
      var cb = pendingWrap.cb;
      cb && cb(this, pendingWrap.cbPayload);
      pendingWrap.hostEl.dirty();
    }
    cachedImgObj.pending.length = 0;
  }
  function isImageReady(image2) {
    return image2 && image2.width && image2.height;
  }
  image.findExistImage = findExistImage;
  image.createOrUpdateImage = createOrUpdateImage;
  image.isImageReady = isImageReady;
  var BoundingRect$b = BoundingRect_1;
  var imageHelper$2 = image;
  var _util$s = util$6;
  var getContext = _util$s.getContext;
  var extend$6 = _util$s.extend;
  var retrieve2$1 = _util$s.retrieve2;
  var retrieve3$1 = _util$s.retrieve3;
  var trim$1 = _util$s.trim;
  var textWidthCache = {};
  var textWidthCacheCounter = 0;
  var TEXT_CACHE_MAX = 5e3;
  var STYLE_REG = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
  var DEFAULT_FONT$1 = "12px sans-serif";
  var methods = {};
  function $override(name, fn) {
    methods[name] = fn;
  }
  function getWidth(text2, font) {
    font = font || DEFAULT_FONT$1;
    var key = text2 + ":" + font;
    if (textWidthCache[key]) {
      return textWidthCache[key];
    }
    var textLines = (text2 + "").split("\n");
    var width = 0;
    for (var i2 = 0, l = textLines.length; i2 < l; i2++) {
      width = Math.max(measureText(textLines[i2], font).width, width);
    }
    if (textWidthCacheCounter > TEXT_CACHE_MAX) {
      textWidthCacheCounter = 0;
      textWidthCache = {};
    }
    textWidthCacheCounter++;
    textWidthCache[key] = width;
    return width;
  }
  function getBoundingRect(text2, font, textAlign, textVerticalAlign, textPadding, textLineHeight, rich, truncate) {
    return rich ? getRichTextRect(text2, font, textAlign, textVerticalAlign, textPadding, textLineHeight, rich, truncate) : getPlainTextRect(text2, font, textAlign, textVerticalAlign, textPadding, textLineHeight, truncate);
  }
  function getPlainTextRect(text2, font, textAlign, textVerticalAlign, textPadding, textLineHeight, truncate) {
    var contentBlock = parsePlainText(text2, font, textPadding, textLineHeight, truncate);
    var outerWidth = getWidth(text2, font);
    if (textPadding) {
      outerWidth += textPadding[1] + textPadding[3];
    }
    var outerHeight = contentBlock.outerHeight;
    var x = adjustTextX(0, outerWidth, textAlign);
    var y = adjustTextY(0, outerHeight, textVerticalAlign);
    var rect = new BoundingRect$b(x, y, outerWidth, outerHeight);
    rect.lineHeight = contentBlock.lineHeight;
    return rect;
  }
  function getRichTextRect(text2, font, textAlign, textVerticalAlign, textPadding, textLineHeight, rich, truncate) {
    var contentBlock = parseRichText(text2, {
      rich,
      truncate,
      font,
      textAlign,
      textPadding,
      textLineHeight
    });
    var outerWidth = contentBlock.outerWidth;
    var outerHeight = contentBlock.outerHeight;
    var x = adjustTextX(0, outerWidth, textAlign);
    var y = adjustTextY(0, outerHeight, textVerticalAlign);
    return new BoundingRect$b(x, y, outerWidth, outerHeight);
  }
  function adjustTextX(x, width, textAlign) {
    if (textAlign === "right") {
      x -= width;
    } else if (textAlign === "center") {
      x -= width / 2;
    }
    return x;
  }
  function adjustTextY(y, height, textVerticalAlign) {
    if (textVerticalAlign === "middle") {
      y -= height / 2;
    } else if (textVerticalAlign === "bottom") {
      y -= height;
    }
    return y;
  }
  function calculateTextPosition$1(out2, style, rect) {
    var textPosition = style.textPosition;
    var distance2 = style.textDistance;
    var x = rect.x;
    var y = rect.y;
    distance2 = distance2 || 0;
    var height = rect.height;
    var width = rect.width;
    var halfHeight = height / 2;
    var textAlign = "left";
    var textVerticalAlign = "top";
    switch (textPosition) {
      case "left":
        x -= distance2;
        y += halfHeight;
        textAlign = "right";
        textVerticalAlign = "middle";
        break;
      case "right":
        x += distance2 + width;
        y += halfHeight;
        textVerticalAlign = "middle";
        break;
      case "top":
        x += width / 2;
        y -= distance2;
        textAlign = "center";
        textVerticalAlign = "bottom";
        break;
      case "bottom":
        x += width / 2;
        y += height + distance2;
        textAlign = "center";
        break;
      case "inside":
        x += width / 2;
        y += halfHeight;
        textAlign = "center";
        textVerticalAlign = "middle";
        break;
      case "insideLeft":
        x += distance2;
        y += halfHeight;
        textVerticalAlign = "middle";
        break;
      case "insideRight":
        x += width - distance2;
        y += halfHeight;
        textAlign = "right";
        textVerticalAlign = "middle";
        break;
      case "insideTop":
        x += width / 2;
        y += distance2;
        textAlign = "center";
        break;
      case "insideBottom":
        x += width / 2;
        y += height - distance2;
        textAlign = "center";
        textVerticalAlign = "bottom";
        break;
      case "insideTopLeft":
        x += distance2;
        y += distance2;
        break;
      case "insideTopRight":
        x += width - distance2;
        y += distance2;
        textAlign = "right";
        break;
      case "insideBottomLeft":
        x += distance2;
        y += height - distance2;
        textVerticalAlign = "bottom";
        break;
      case "insideBottomRight":
        x += width - distance2;
        y += height - distance2;
        textAlign = "right";
        textVerticalAlign = "bottom";
        break;
    }
    out2 = out2 || {};
    out2.x = x;
    out2.y = y;
    out2.textAlign = textAlign;
    out2.textVerticalAlign = textVerticalAlign;
    return out2;
  }
  function adjustTextPositionOnRect(textPosition, rect, distance2) {
    var dummyStyle = {
      textPosition,
      textDistance: distance2
    };
    return calculateTextPosition$1({}, dummyStyle, rect);
  }
  function truncateText$1(text2, containerWidth, font, ellipsis, options2) {
    if (!containerWidth) {
      return "";
    }
    var textLines = (text2 + "").split("\n");
    options2 = prepareTruncateOptions(containerWidth, font, ellipsis, options2);
    for (var i2 = 0, len2 = textLines.length; i2 < len2; i2++) {
      textLines[i2] = truncateSingleLine(textLines[i2], options2);
    }
    return textLines.join("\n");
  }
  function prepareTruncateOptions(containerWidth, font, ellipsis, options2) {
    options2 = extend$6({}, options2);
    options2.font = font;
    var ellipsis = retrieve2$1(ellipsis, "...");
    options2.maxIterations = retrieve2$1(options2.maxIterations, 2);
    var minChar = options2.minChar = retrieve2$1(options2.minChar, 0);
    options2.cnCharWidth = getWidth("\u56FD", font);
    var ascCharWidth = options2.ascCharWidth = getWidth("a", font);
    options2.placeholder = retrieve2$1(options2.placeholder, "");
    var contentWidth = containerWidth = Math.max(0, containerWidth - 1);
    for (var i2 = 0; i2 < minChar && contentWidth >= ascCharWidth; i2++) {
      contentWidth -= ascCharWidth;
    }
    var ellipsisWidth = getWidth(ellipsis, font);
    if (ellipsisWidth > contentWidth) {
      ellipsis = "";
      ellipsisWidth = 0;
    }
    contentWidth = containerWidth - ellipsisWidth;
    options2.ellipsis = ellipsis;
    options2.ellipsisWidth = ellipsisWidth;
    options2.contentWidth = contentWidth;
    options2.containerWidth = containerWidth;
    return options2;
  }
  function truncateSingleLine(textLine, options2) {
    var containerWidth = options2.containerWidth;
    var font = options2.font;
    var contentWidth = options2.contentWidth;
    if (!containerWidth) {
      return "";
    }
    var lineWidth = getWidth(textLine, font);
    if (lineWidth <= containerWidth) {
      return textLine;
    }
    for (var j = 0; ; j++) {
      if (lineWidth <= contentWidth || j >= options2.maxIterations) {
        textLine += options2.ellipsis;
        break;
      }
      var subLength = j === 0 ? estimateLength(textLine, contentWidth, options2.ascCharWidth, options2.cnCharWidth) : lineWidth > 0 ? Math.floor(textLine.length * contentWidth / lineWidth) : 0;
      textLine = textLine.substr(0, subLength);
      lineWidth = getWidth(textLine, font);
    }
    if (textLine === "") {
      textLine = options2.placeholder;
    }
    return textLine;
  }
  function estimateLength(text2, contentWidth, ascCharWidth, cnCharWidth) {
    var width = 0;
    var i2 = 0;
    for (var len2 = text2.length; i2 < len2 && width < contentWidth; i2++) {
      var charCode = text2.charCodeAt(i2);
      width += 0 <= charCode && charCode <= 127 ? ascCharWidth : cnCharWidth;
    }
    return i2;
  }
  function getLineHeight(font) {
    return getWidth("\u56FD", font);
  }
  function measureText(text2, font) {
    return methods.measureText(text2, font);
  }
  methods.measureText = function(text2, font) {
    var ctx = getContext();
    ctx.font = font || DEFAULT_FONT$1;
    return ctx.measureText(text2);
  };
  function parsePlainText(text2, font, padding, textLineHeight, truncate) {
    text2 != null && (text2 += "");
    var lineHeight = retrieve2$1(textLineHeight, getLineHeight(font));
    var lines = text2 ? text2.split("\n") : [];
    var height = lines.length * lineHeight;
    var outerHeight = height;
    var canCacheByTextString = true;
    if (padding) {
      outerHeight += padding[0] + padding[2];
    }
    if (text2 && truncate) {
      canCacheByTextString = false;
      var truncOuterHeight = truncate.outerHeight;
      var truncOuterWidth = truncate.outerWidth;
      if (truncOuterHeight != null && outerHeight > truncOuterHeight) {
        text2 = "";
        lines = [];
      } else if (truncOuterWidth != null) {
        var options2 = prepareTruncateOptions(truncOuterWidth - (padding ? padding[1] + padding[3] : 0), font, truncate.ellipsis, {
          minChar: truncate.minChar,
          placeholder: truncate.placeholder
        });
        for (var i2 = 0, len2 = lines.length; i2 < len2; i2++) {
          lines[i2] = truncateSingleLine(lines[i2], options2);
        }
      }
    }
    return {
      lines,
      height,
      outerHeight,
      lineHeight,
      canCacheByTextString
    };
  }
  function parseRichText(text2, style) {
    var contentBlock = {
      lines: [],
      width: 0,
      height: 0
    };
    text2 != null && (text2 += "");
    if (!text2) {
      return contentBlock;
    }
    var lastIndex = STYLE_REG.lastIndex = 0;
    var result;
    while ((result = STYLE_REG.exec(text2)) != null) {
      var matchedIndex = result.index;
      if (matchedIndex > lastIndex) {
        pushTokens(contentBlock, text2.substring(lastIndex, matchedIndex));
      }
      pushTokens(contentBlock, result[2], result[1]);
      lastIndex = STYLE_REG.lastIndex;
    }
    if (lastIndex < text2.length) {
      pushTokens(contentBlock, text2.substring(lastIndex, text2.length));
    }
    var lines = contentBlock.lines;
    var contentHeight = 0;
    var contentWidth = 0;
    var pendingList = [];
    var stlPadding = style.textPadding;
    var truncate = style.truncate;
    var truncateWidth = truncate && truncate.outerWidth;
    var truncateHeight = truncate && truncate.outerHeight;
    if (stlPadding) {
      truncateWidth != null && (truncateWidth -= stlPadding[1] + stlPadding[3]);
      truncateHeight != null && (truncateHeight -= stlPadding[0] + stlPadding[2]);
    }
    for (var i2 = 0; i2 < lines.length; i2++) {
      var line2 = lines[i2];
      var lineHeight = 0;
      var lineWidth = 0;
      for (var j = 0; j < line2.tokens.length; j++) {
        var token = line2.tokens[j];
        var tokenStyle = token.styleName && style.rich[token.styleName] || {};
        var textPadding = token.textPadding = tokenStyle.textPadding;
        var font = token.font = tokenStyle.font || style.font;
        var tokenHeight = token.textHeight = retrieve2$1(tokenStyle.textHeight, getLineHeight(font));
        textPadding && (tokenHeight += textPadding[0] + textPadding[2]);
        token.height = tokenHeight;
        token.lineHeight = retrieve3$1(tokenStyle.textLineHeight, style.textLineHeight, tokenHeight);
        token.textAlign = tokenStyle && tokenStyle.textAlign || style.textAlign;
        token.textVerticalAlign = tokenStyle && tokenStyle.textVerticalAlign || "middle";
        if (truncateHeight != null && contentHeight + token.lineHeight > truncateHeight) {
          return {
            lines: [],
            width: 0,
            height: 0
          };
        }
        token.textWidth = getWidth(token.text, font);
        var tokenWidth = tokenStyle.textWidth;
        var tokenWidthNotSpecified = tokenWidth == null || tokenWidth === "auto";
        if (typeof tokenWidth === "string" && tokenWidth.charAt(tokenWidth.length - 1) === "%") {
          token.percentWidth = tokenWidth;
          pendingList.push(token);
          tokenWidth = 0;
        } else {
          if (tokenWidthNotSpecified) {
            tokenWidth = token.textWidth;
            var textBackgroundColor = tokenStyle.textBackgroundColor;
            var bgImg = textBackgroundColor && textBackgroundColor.image;
            if (bgImg) {
              bgImg = imageHelper$2.findExistImage(bgImg);
              if (imageHelper$2.isImageReady(bgImg)) {
                tokenWidth = Math.max(tokenWidth, bgImg.width * tokenHeight / bgImg.height);
              }
            }
          }
          var paddingW = textPadding ? textPadding[1] + textPadding[3] : 0;
          tokenWidth += paddingW;
          var remianTruncWidth = truncateWidth != null ? truncateWidth - lineWidth : null;
          if (remianTruncWidth != null && remianTruncWidth < tokenWidth) {
            if (!tokenWidthNotSpecified || remianTruncWidth < paddingW) {
              token.text = "";
              token.textWidth = tokenWidth = 0;
            } else {
              token.text = truncateText$1(token.text, remianTruncWidth - paddingW, font, truncate.ellipsis, {
                minChar: truncate.minChar
              });
              token.textWidth = getWidth(token.text, font);
              tokenWidth = token.textWidth + paddingW;
            }
          }
        }
        lineWidth += token.width = tokenWidth;
        tokenStyle && (lineHeight = Math.max(lineHeight, token.lineHeight));
      }
      line2.width = lineWidth;
      line2.lineHeight = lineHeight;
      contentHeight += lineHeight;
      contentWidth = Math.max(contentWidth, lineWidth);
    }
    contentBlock.outerWidth = contentBlock.width = retrieve2$1(style.textWidth, contentWidth);
    contentBlock.outerHeight = contentBlock.height = retrieve2$1(style.textHeight, contentHeight);
    if (stlPadding) {
      contentBlock.outerWidth += stlPadding[1] + stlPadding[3];
      contentBlock.outerHeight += stlPadding[0] + stlPadding[2];
    }
    for (var i2 = 0; i2 < pendingList.length; i2++) {
      var token = pendingList[i2];
      var percentWidth = token.percentWidth;
      token.width = parseInt(percentWidth, 10) / 100 * contentWidth;
    }
    return contentBlock;
  }
  function pushTokens(block, str, styleName) {
    var isEmptyStr = str === "";
    var strs = str.split("\n");
    var lines = block.lines;
    for (var i2 = 0; i2 < strs.length; i2++) {
      var text2 = strs[i2];
      var token = {
        styleName,
        text: text2,
        isLineHolder: !text2 && !isEmptyStr
      };
      if (!i2) {
        var tokens = (lines[lines.length - 1] || (lines[0] = {
          tokens: []
        })).tokens;
        var tokensLen = tokens.length;
        tokensLen === 1 && tokens[0].isLineHolder ? tokens[0] = token : (text2 || !tokensLen || isEmptyStr) && tokens.push(token);
      } else {
        lines.push({
          tokens: [token]
        });
      }
    }
  }
  function makeFont(style) {
    var font = (style.fontSize || style.fontFamily) && [
      style.fontStyle,
      style.fontWeight,
      (style.fontSize || 12) + "px",
      style.fontFamily || "sans-serif"
    ].join(" ");
    return font && trim$1(font) || style.textFont || style.font;
  }
  text.DEFAULT_FONT = DEFAULT_FONT$1;
  text.$override = $override;
  text.getWidth = getWidth;
  text.getBoundingRect = getBoundingRect;
  text.adjustTextX = adjustTextX;
  text.adjustTextY = adjustTextY;
  text.calculateTextPosition = calculateTextPosition$1;
  text.adjustTextPositionOnRect = adjustTextPositionOnRect;
  text.truncateText = truncateText$1;
  text.getLineHeight = getLineHeight;
  text.measureText = measureText;
  text.parsePlainText = parsePlainText;
  text.parseRichText = parseRichText;
  text.makeFont = makeFont;
  var roundRect = {};
  function buildPath$1(ctx, shape) {
    var x = shape.x;
    var y = shape.y;
    var width = shape.width;
    var height = shape.height;
    var r = shape.r;
    var r1;
    var r2;
    var r3;
    var r4;
    if (width < 0) {
      x = x + width;
      width = -width;
    }
    if (height < 0) {
      y = y + height;
      height = -height;
    }
    if (typeof r === "number") {
      r1 = r2 = r3 = r4 = r;
    } else if (r instanceof Array) {
      if (r.length === 1) {
        r1 = r2 = r3 = r4 = r[0];
      } else if (r.length === 2) {
        r1 = r3 = r[0];
        r2 = r4 = r[1];
      } else if (r.length === 3) {
        r1 = r[0];
        r2 = r4 = r[1];
        r3 = r[2];
      } else {
        r1 = r[0];
        r2 = r[1];
        r3 = r[2];
        r4 = r[3];
      }
    } else {
      r1 = r2 = r3 = r4 = 0;
    }
    var total;
    if (r1 + r2 > width) {
      total = r1 + r2;
      r1 *= width / total;
      r2 *= width / total;
    }
    if (r3 + r4 > width) {
      total = r3 + r4;
      r3 *= width / total;
      r4 *= width / total;
    }
    if (r2 + r3 > height) {
      total = r2 + r3;
      r2 *= height / total;
      r3 *= height / total;
    }
    if (r1 + r4 > height) {
      total = r1 + r4;
      r1 *= height / total;
      r4 *= height / total;
    }
    ctx.moveTo(x + r1, y);
    ctx.lineTo(x + width - r2, y);
    r2 !== 0 && ctx.arc(x + width - r2, y + r2, r2, -Math.PI / 2, 0);
    ctx.lineTo(x + width, y + height - r3);
    r3 !== 0 && ctx.arc(x + width - r3, y + height - r3, r3, 0, Math.PI / 2);
    ctx.lineTo(x + r4, y + height);
    r4 !== 0 && ctx.arc(x + r4, y + height - r4, r4, Math.PI / 2, Math.PI);
    ctx.lineTo(x, y + r1);
    r1 !== 0 && ctx.arc(x + r1, y + r1, r1, Math.PI, Math.PI * 1.5);
  }
  roundRect.buildPath = buildPath$1;
  var _util$r = util$6;
  var retrieve2 = _util$r.retrieve2;
  var retrieve3 = _util$r.retrieve3;
  var each$q = _util$r.each;
  var normalizeCssArray$1 = _util$r.normalizeCssArray;
  var isString$6 = _util$r.isString;
  var isObject$b = _util$r.isObject;
  var textContain$6 = text;
  var roundRectHelper$1 = roundRect;
  var imageHelper$1 = image;
  var fixShadow = fixShadow$2;
  var _constant$2 = constant;
  var ContextCachedBy$1 = _constant$2.ContextCachedBy;
  var WILL_BE_RESTORED$1 = _constant$2.WILL_BE_RESTORED;
  var DEFAULT_FONT = textContain$6.DEFAULT_FONT;
  var VALID_TEXT_ALIGN = {
    left: 1,
    right: 1,
    center: 1
  };
  var VALID_TEXT_VERTICAL_ALIGN = {
    top: 1,
    bottom: 1,
    middle: 1
  };
  var SHADOW_STYLE_COMMON_PROPS = [["textShadowBlur", "shadowBlur", 0], ["textShadowOffsetX", "shadowOffsetX", 0], ["textShadowOffsetY", "shadowOffsetY", 0], ["textShadowColor", "shadowColor", "transparent"]];
  var _tmpTextPositionResult = {};
  var _tmpBoxPositionResult = {};
  function normalizeTextStyle(style) {
    normalizeStyle(style);
    each$q(style.rich, normalizeStyle);
    return style;
  }
  function normalizeStyle(style) {
    if (style) {
      style.font = textContain$6.makeFont(style);
      var textAlign = style.textAlign;
      textAlign === "middle" && (textAlign = "center");
      style.textAlign = textAlign == null || VALID_TEXT_ALIGN[textAlign] ? textAlign : "left";
      var textVerticalAlign = style.textVerticalAlign || style.textBaseline;
      textVerticalAlign === "center" && (textVerticalAlign = "middle");
      style.textVerticalAlign = textVerticalAlign == null || VALID_TEXT_VERTICAL_ALIGN[textVerticalAlign] ? textVerticalAlign : "top";
      var textPadding = style.textPadding;
      if (textPadding) {
        style.textPadding = normalizeCssArray$1(style.textPadding);
      }
    }
  }
  function renderText(hostEl, ctx, text2, style, rect, prevEl) {
    style.rich ? renderRichText(hostEl, ctx, text2, style, rect, prevEl) : renderPlainText(hostEl, ctx, text2, style, rect, prevEl);
  }
  function renderPlainText(hostEl, ctx, text2, style, rect, prevEl) {
    var needDrawBg = needDrawBackground(style);
    var prevStyle;
    var checkCache = false;
    var cachedByMe = ctx.__attrCachedBy === ContextCachedBy$1.PLAIN_TEXT;
    if (prevEl !== WILL_BE_RESTORED$1) {
      if (prevEl) {
        prevStyle = prevEl.style;
        checkCache = !needDrawBg && cachedByMe && prevStyle;
      }
      ctx.__attrCachedBy = needDrawBg ? ContextCachedBy$1.NONE : ContextCachedBy$1.PLAIN_TEXT;
    } else if (cachedByMe) {
      ctx.__attrCachedBy = ContextCachedBy$1.NONE;
    }
    var styleFont = style.font || DEFAULT_FONT;
    if (!checkCache || styleFont !== (prevStyle.font || DEFAULT_FONT)) {
      ctx.font = styleFont;
    }
    var computedFont = hostEl.__computedFont;
    if (hostEl.__styleFont !== styleFont) {
      hostEl.__styleFont = styleFont;
      computedFont = hostEl.__computedFont = ctx.font;
    }
    var textPadding = style.textPadding;
    var textLineHeight = style.textLineHeight;
    var contentBlock = hostEl.__textCotentBlock;
    if (!contentBlock || hostEl.__dirtyText) {
      contentBlock = hostEl.__textCotentBlock = textContain$6.parsePlainText(text2, computedFont, textPadding, textLineHeight, style.truncate);
    }
    var outerHeight = contentBlock.outerHeight;
    var textLines = contentBlock.lines;
    var lineHeight = contentBlock.lineHeight;
    var boxPos = getBoxPosition(_tmpBoxPositionResult, hostEl, style, rect);
    var baseX = boxPos.baseX;
    var baseY = boxPos.baseY;
    var textAlign = boxPos.textAlign || "left";
    var textVerticalAlign = boxPos.textVerticalAlign;
    applyTextRotation(ctx, style, rect, baseX, baseY);
    var boxY = textContain$6.adjustTextY(baseY, outerHeight, textVerticalAlign);
    var textX = baseX;
    var textY = boxY;
    if (needDrawBg || textPadding) {
      var textWidth = textContain$6.getWidth(text2, computedFont);
      var outerWidth = textWidth;
      textPadding && (outerWidth += textPadding[1] + textPadding[3]);
      var boxX = textContain$6.adjustTextX(baseX, outerWidth, textAlign);
      needDrawBg && drawBackground(hostEl, ctx, style, boxX, boxY, outerWidth, outerHeight);
      if (textPadding) {
        textX = getTextXForPadding(baseX, textAlign, textPadding);
        textY += textPadding[0];
      }
    }
    ctx.textAlign = textAlign;
    ctx.textBaseline = "middle";
    ctx.globalAlpha = style.opacity || 1;
    for (var i2 = 0; i2 < SHADOW_STYLE_COMMON_PROPS.length; i2++) {
      var propItem = SHADOW_STYLE_COMMON_PROPS[i2];
      var styleProp = propItem[0];
      var ctxProp = propItem[1];
      var val = style[styleProp];
      if (!checkCache || val !== prevStyle[styleProp]) {
        ctx[ctxProp] = fixShadow(ctx, ctxProp, val || propItem[2]);
      }
    }
    textY += lineHeight / 2;
    var textStrokeWidth = style.textStrokeWidth;
    var textStrokeWidthPrev = checkCache ? prevStyle.textStrokeWidth : null;
    var strokeWidthChanged = !checkCache || textStrokeWidth !== textStrokeWidthPrev;
    var strokeChanged = !checkCache || strokeWidthChanged || style.textStroke !== prevStyle.textStroke;
    var textStroke = getStroke(style.textStroke, textStrokeWidth);
    var textFill = getFill(style.textFill);
    if (textStroke) {
      if (strokeWidthChanged) {
        ctx.lineWidth = textStrokeWidth;
      }
      if (strokeChanged) {
        ctx.strokeStyle = textStroke;
      }
    }
    if (textFill) {
      if (!checkCache || style.textFill !== prevStyle.textFill) {
        ctx.fillStyle = textFill;
      }
    }
    if (textLines.length === 1) {
      textStroke && ctx.strokeText(textLines[0], textX, textY);
      textFill && ctx.fillText(textLines[0], textX, textY);
    } else {
      for (var i2 = 0; i2 < textLines.length; i2++) {
        textStroke && ctx.strokeText(textLines[i2], textX, textY);
        textFill && ctx.fillText(textLines[i2], textX, textY);
        textY += lineHeight;
      }
    }
  }
  function renderRichText(hostEl, ctx, text2, style, rect, prevEl) {
    if (prevEl !== WILL_BE_RESTORED$1) {
      ctx.__attrCachedBy = ContextCachedBy$1.NONE;
    }
    var contentBlock = hostEl.__textCotentBlock;
    if (!contentBlock || hostEl.__dirtyText) {
      contentBlock = hostEl.__textCotentBlock = textContain$6.parseRichText(text2, style);
    }
    drawRichText(hostEl, ctx, contentBlock, style, rect);
  }
  function drawRichText(hostEl, ctx, contentBlock, style, rect) {
    var contentWidth = contentBlock.width;
    var outerWidth = contentBlock.outerWidth;
    var outerHeight = contentBlock.outerHeight;
    var textPadding = style.textPadding;
    var boxPos = getBoxPosition(_tmpBoxPositionResult, hostEl, style, rect);
    var baseX = boxPos.baseX;
    var baseY = boxPos.baseY;
    var textAlign = boxPos.textAlign;
    var textVerticalAlign = boxPos.textVerticalAlign;
    applyTextRotation(ctx, style, rect, baseX, baseY);
    var boxX = textContain$6.adjustTextX(baseX, outerWidth, textAlign);
    var boxY = textContain$6.adjustTextY(baseY, outerHeight, textVerticalAlign);
    var xLeft = boxX;
    var lineTop = boxY;
    if (textPadding) {
      xLeft += textPadding[3];
      lineTop += textPadding[0];
    }
    var xRight = xLeft + contentWidth;
    needDrawBackground(style) && drawBackground(hostEl, ctx, style, boxX, boxY, outerWidth, outerHeight);
    for (var i2 = 0; i2 < contentBlock.lines.length; i2++) {
      var line2 = contentBlock.lines[i2];
      var tokens = line2.tokens;
      var tokenCount = tokens.length;
      var lineHeight = line2.lineHeight;
      var usedWidth = line2.width;
      var leftIndex = 0;
      var lineXLeft = xLeft;
      var lineXRight = xRight;
      var rightIndex = tokenCount - 1;
      var token;
      while (leftIndex < tokenCount && (token = tokens[leftIndex], !token.textAlign || token.textAlign === "left")) {
        placeToken(hostEl, ctx, token, style, lineHeight, lineTop, lineXLeft, "left");
        usedWidth -= token.width;
        lineXLeft += token.width;
        leftIndex++;
      }
      while (rightIndex >= 0 && (token = tokens[rightIndex], token.textAlign === "right")) {
        placeToken(hostEl, ctx, token, style, lineHeight, lineTop, lineXRight, "right");
        usedWidth -= token.width;
        lineXRight -= token.width;
        rightIndex--;
      }
      lineXLeft += (contentWidth - (lineXLeft - xLeft) - (xRight - lineXRight) - usedWidth) / 2;
      while (leftIndex <= rightIndex) {
        token = tokens[leftIndex];
        placeToken(hostEl, ctx, token, style, lineHeight, lineTop, lineXLeft + token.width / 2, "center");
        lineXLeft += token.width;
        leftIndex++;
      }
      lineTop += lineHeight;
    }
  }
  function applyTextRotation(ctx, style, rect, x, y) {
    if (rect && style.textRotation) {
      var origin = style.textOrigin;
      if (origin === "center") {
        x = rect.width / 2 + rect.x;
        y = rect.height / 2 + rect.y;
      } else if (origin) {
        x = origin[0] + rect.x;
        y = origin[1] + rect.y;
      }
      ctx.translate(x, y);
      ctx.rotate(-style.textRotation);
      ctx.translate(-x, -y);
    }
  }
  function placeToken(hostEl, ctx, token, style, lineHeight, lineTop, x, textAlign) {
    var tokenStyle = style.rich[token.styleName] || {};
    tokenStyle.text = token.text;
    var textVerticalAlign = token.textVerticalAlign;
    var y = lineTop + lineHeight / 2;
    if (textVerticalAlign === "top") {
      y = lineTop + token.height / 2;
    } else if (textVerticalAlign === "bottom") {
      y = lineTop + lineHeight - token.height / 2;
    }
    !token.isLineHolder && needDrawBackground(tokenStyle) && drawBackground(hostEl, ctx, tokenStyle, textAlign === "right" ? x - token.width : textAlign === "center" ? x - token.width / 2 : x, y - token.height / 2, token.width, token.height);
    var textPadding = token.textPadding;
    if (textPadding) {
      x = getTextXForPadding(x, textAlign, textPadding);
      y -= token.height / 2 - textPadding[2] - token.textHeight / 2;
    }
    setCtx(ctx, "shadowBlur", retrieve3(tokenStyle.textShadowBlur, style.textShadowBlur, 0));
    setCtx(ctx, "shadowColor", tokenStyle.textShadowColor || style.textShadowColor || "transparent");
    setCtx(ctx, "shadowOffsetX", retrieve3(tokenStyle.textShadowOffsetX, style.textShadowOffsetX, 0));
    setCtx(ctx, "shadowOffsetY", retrieve3(tokenStyle.textShadowOffsetY, style.textShadowOffsetY, 0));
    setCtx(ctx, "textAlign", textAlign);
    setCtx(ctx, "textBaseline", "middle");
    setCtx(ctx, "font", token.font || DEFAULT_FONT);
    var textStroke = getStroke(tokenStyle.textStroke || style.textStroke, textStrokeWidth);
    var textFill = getFill(tokenStyle.textFill || style.textFill);
    var textStrokeWidth = retrieve2(tokenStyle.textStrokeWidth, style.textStrokeWidth);
    if (textStroke) {
      setCtx(ctx, "lineWidth", textStrokeWidth);
      setCtx(ctx, "strokeStyle", textStroke);
      ctx.strokeText(token.text, x, y);
    }
    if (textFill) {
      setCtx(ctx, "fillStyle", textFill);
      ctx.fillText(token.text, x, y);
    }
  }
  function needDrawBackground(style) {
    return !!(style.textBackgroundColor || style.textBorderWidth && style.textBorderColor);
  }
  function drawBackground(hostEl, ctx, style, x, y, width, height) {
    var textBackgroundColor = style.textBackgroundColor;
    var textBorderWidth = style.textBorderWidth;
    var textBorderColor = style.textBorderColor;
    var isPlainBg = isString$6(textBackgroundColor);
    setCtx(ctx, "shadowBlur", style.textBoxShadowBlur || 0);
    setCtx(ctx, "shadowColor", style.textBoxShadowColor || "transparent");
    setCtx(ctx, "shadowOffsetX", style.textBoxShadowOffsetX || 0);
    setCtx(ctx, "shadowOffsetY", style.textBoxShadowOffsetY || 0);
    if (isPlainBg || textBorderWidth && textBorderColor) {
      ctx.beginPath();
      var textBorderRadius = style.textBorderRadius;
      if (!textBorderRadius) {
        ctx.rect(x, y, width, height);
      } else {
        roundRectHelper$1.buildPath(ctx, {
          x,
          y,
          width,
          height,
          r: textBorderRadius
        });
      }
      ctx.closePath();
    }
    if (isPlainBg) {
      setCtx(ctx, "fillStyle", textBackgroundColor);
      if (style.fillOpacity != null) {
        var originalGlobalAlpha = ctx.globalAlpha;
        ctx.globalAlpha = style.fillOpacity * style.opacity;
        ctx.fill();
        ctx.globalAlpha = originalGlobalAlpha;
      } else {
        ctx.fill();
      }
    } else if (isObject$b(textBackgroundColor)) {
      var image2 = textBackgroundColor.image;
      image2 = imageHelper$1.createOrUpdateImage(image2, null, hostEl, onBgImageLoaded, textBackgroundColor);
      if (image2 && imageHelper$1.isImageReady(image2)) {
        ctx.drawImage(image2, x, y, width, height);
      }
    }
    if (textBorderWidth && textBorderColor) {
      setCtx(ctx, "lineWidth", textBorderWidth);
      setCtx(ctx, "strokeStyle", textBorderColor);
      if (style.strokeOpacity != null) {
        var originalGlobalAlpha = ctx.globalAlpha;
        ctx.globalAlpha = style.strokeOpacity * style.opacity;
        ctx.stroke();
        ctx.globalAlpha = originalGlobalAlpha;
      } else {
        ctx.stroke();
      }
    }
  }
  function onBgImageLoaded(image2, textBackgroundColor) {
    textBackgroundColor.image = image2;
  }
  function getBoxPosition(out2, hostEl, style, rect) {
    var baseX = style.x || 0;
    var baseY = style.y || 0;
    var textAlign = style.textAlign;
    var textVerticalAlign = style.textVerticalAlign;
    if (rect) {
      var textPosition = style.textPosition;
      if (textPosition instanceof Array) {
        baseX = rect.x + parsePercent$5(textPosition[0], rect.width);
        baseY = rect.y + parsePercent$5(textPosition[1], rect.height);
      } else {
        var res = hostEl && hostEl.calculateTextPosition ? hostEl.calculateTextPosition(_tmpTextPositionResult, style, rect) : textContain$6.calculateTextPosition(_tmpTextPositionResult, style, rect);
        baseX = res.x;
        baseY = res.y;
        textAlign = textAlign || res.textAlign;
        textVerticalAlign = textVerticalAlign || res.textVerticalAlign;
      }
      var textOffset = style.textOffset;
      if (textOffset) {
        baseX += textOffset[0];
        baseY += textOffset[1];
      }
    }
    out2 = out2 || {};
    out2.baseX = baseX;
    out2.baseY = baseY;
    out2.textAlign = textAlign;
    out2.textVerticalAlign = textVerticalAlign;
    return out2;
  }
  function setCtx(ctx, prop2, value) {
    ctx[prop2] = fixShadow(ctx, prop2, value);
    return ctx[prop2];
  }
  function getStroke(stroke, lineWidth) {
    return stroke == null || lineWidth <= 0 || stroke === "transparent" || stroke === "none" ? null : stroke.image || stroke.colorStops ? "#000" : stroke;
  }
  function getFill(fill) {
    return fill == null || fill === "none" ? null : fill.image || fill.colorStops ? "#000" : fill;
  }
  function parsePercent$5(value, maxValue) {
    if (typeof value === "string") {
      if (value.lastIndexOf("%") >= 0) {
        return parseFloat(value) / 100 * maxValue;
      }
      return parseFloat(value);
    }
    return value;
  }
  function getTextXForPadding(x, textAlign, textPadding) {
    return textAlign === "right" ? x - textPadding[1] : textAlign === "center" ? x + textPadding[3] / 2 - textPadding[1] / 2 : x + textPadding[3];
  }
  function needDrawText(text2, style) {
    return text2 != null && (text2 || style.textBackgroundColor || style.textBorderWidth && style.textBorderColor || style.textPadding);
  }
  text$1.normalizeTextStyle = normalizeTextStyle;
  text$1.renderText = renderText;
  text$1.getBoxPosition = getBoxPosition;
  text$1.getStroke = getStroke;
  text$1.getFill = getFill;
  text$1.parsePercent = parsePercent$5;
  text$1.needDrawText = needDrawText;
  var textHelper$1 = text$1;
  var BoundingRect$a = BoundingRect_1;
  var _constant$1 = constant;
  var WILL_BE_RESTORED = _constant$1.WILL_BE_RESTORED;
  var tmpRect$1 = new BoundingRect$a();
  var RectText$1 = function() {
  };
  RectText$1.prototype = {
    constructor: RectText$1,
    drawRectText: function(ctx, rect) {
      var style = this.style;
      rect = style.textRect || rect;
      this.__dirty && textHelper$1.normalizeTextStyle(style, true);
      var text2 = style.text;
      text2 != null && (text2 += "");
      if (!textHelper$1.needDrawText(text2, style)) {
        return;
      }
      ctx.save();
      var transform = this.transform;
      if (!style.transformText) {
        if (transform) {
          tmpRect$1.copy(rect);
          tmpRect$1.applyTransform(transform);
          rect = tmpRect$1;
        }
      } else {
        this.setTransform(ctx);
      }
      textHelper$1.renderText(this, ctx, text2, style, rect, WILL_BE_RESTORED);
      ctx.restore();
    }
  };
  var _default$1r = RectText$1;
  var RectText_1 = _default$1r;
  var zrUtil$$ = util$6;
  var Style$1 = Style_1;
  var Element = Element_1;
  var RectText = RectText_1;
  function Displayable$3(opts) {
    opts = opts || {};
    Element.call(this, opts);
    for (var name in opts) {
      if (opts.hasOwnProperty(name) && name !== "style") {
        this[name] = opts[name];
      }
    }
    this.style = new Style$1(opts.style, this);
    this._rect = null;
    this.__clipPaths = null;
  }
  Displayable$3.prototype = {
    constructor: Displayable$3,
    type: "displayable",
    __dirty: true,
    invisible: false,
    z: 0,
    z2: 0,
    zlevel: 0,
    draggable: false,
    dragging: false,
    silent: false,
    culling: false,
    cursor: "pointer",
    rectHover: false,
    progressive: false,
    incremental: false,
    globalScaleRatio: 1,
    beforeBrush: function(ctx) {
    },
    afterBrush: function(ctx) {
    },
    brush: function(ctx, prevEl) {
    },
    getBoundingRect: function() {
    },
    contain: function(x, y) {
      return this.rectContain(x, y);
    },
    traverse: function(cb, context) {
      cb.call(context, this);
    },
    rectContain: function(x, y) {
      var coord = this.transformCoordToLocal(x, y);
      var rect = this.getBoundingRect();
      return rect.contain(coord[0], coord[1]);
    },
    dirty: function() {
      this.__dirty = this.__dirtyText = true;
      this._rect = null;
      this.__zr && this.__zr.refresh();
    },
    animateStyle: function(loop) {
      return this.animate("style", loop);
    },
    attrKV: function(key, value) {
      if (key !== "style") {
        Element.prototype.attrKV.call(this, key, value);
      } else {
        this.style.set(value);
      }
    },
    setStyle: function(key, value) {
      this.style.set(key, value);
      this.dirty(false);
      return this;
    },
    useStyle: function(obj) {
      this.style = new Style$1(obj, this);
      this.dirty(false);
      return this;
    },
    calculateTextPosition: null
  };
  zrUtil$$.inherits(Displayable$3, Element);
  zrUtil$$.mixin(Displayable$3, RectText);
  var _default$1q = Displayable$3;
  var Displayable_1 = _default$1q;
  var Displayable$2 = Displayable_1;
  var BoundingRect$9 = BoundingRect_1;
  var zrUtil$_ = util$6;
  var imageHelper = image;
  function ZImage$2(opts) {
    Displayable$2.call(this, opts);
  }
  ZImage$2.prototype = {
    constructor: ZImage$2,
    type: "image",
    brush: function(ctx, prevEl) {
      var style = this.style;
      var src = style.image;
      style.bind(ctx, this, prevEl);
      var image2 = this._image = imageHelper.createOrUpdateImage(src, this._image, this, this.onload);
      if (!image2 || !imageHelper.isImageReady(image2)) {
        return;
      }
      var x = style.x || 0;
      var y = style.y || 0;
      var width = style.width;
      var height = style.height;
      var aspect = image2.width / image2.height;
      if (width == null && height != null) {
        width = height * aspect;
      } else if (height == null && width != null) {
        height = width / aspect;
      } else if (width == null && height == null) {
        width = image2.width;
        height = image2.height;
      }
      this.setTransform(ctx);
      if (style.sWidth && style.sHeight) {
        var sx = style.sx || 0;
        var sy = style.sy || 0;
        ctx.drawImage(image2, sx, sy, style.sWidth, style.sHeight, x, y, width, height);
      } else if (style.sx && style.sy) {
        var sx = style.sx;
        var sy = style.sy;
        var sWidth = width - sx;
        var sHeight = height - sy;
        ctx.drawImage(image2, sx, sy, sWidth, sHeight, x, y, width, height);
      } else {
        ctx.drawImage(image2, x, y, width, height);
      }
      if (style.text != null) {
        this.restoreTransform(ctx);
        this.drawRectText(ctx, this.getBoundingRect());
      }
    },
    getBoundingRect: function() {
      var style = this.style;
      if (!this._rect) {
        this._rect = new BoundingRect$9(style.x || 0, style.y || 0, style.width || 0, style.height || 0);
      }
      return this._rect;
    }
  };
  zrUtil$_.inherits(ZImage$2, Displayable$2);
  var _default$1p = ZImage$2;
  var Image$2 = _default$1p;
  var _config$1 = config;
  var devicePixelRatio = _config$1.devicePixelRatio;
  var util$2 = util$6;
  var logError = log;
  var BoundingRect$8 = BoundingRect_1;
  var timsort = timsort$2;
  var Layer = Layer_1;
  var requestAnimationFrame$1 = requestAnimationFrame$2;
  var Image$1 = Image$2;
  var env$9 = env_1;
  var HOVER_LAYER_ZLEVEL = 1e5;
  var CANVAS_ZLEVEL = 314159;
  var EL_AFTER_INCREMENTAL_INC = 0.01;
  var INCREMENTAL_INC = 1e-3;
  function parseInt10(val) {
    return parseInt(val, 10);
  }
  function isLayerValid(layer) {
    if (!layer) {
      return false;
    }
    if (layer.__builtin__) {
      return true;
    }
    if (typeof layer.resize !== "function" || typeof layer.refresh !== "function") {
      return false;
    }
    return true;
  }
  var tmpRect = new BoundingRect$8(0, 0, 0, 0);
  var viewRect = new BoundingRect$8(0, 0, 0, 0);
  function isDisplayableCulled(el, width, height) {
    tmpRect.copy(el.getBoundingRect());
    if (el.transform) {
      tmpRect.applyTransform(el.transform);
    }
    viewRect.width = width;
    viewRect.height = height;
    return !tmpRect.intersect(viewRect);
  }
  function isClipPathChanged(clipPaths, prevClipPaths) {
    if (clipPaths === prevClipPaths) {
      return false;
    }
    if (!clipPaths || !prevClipPaths || clipPaths.length !== prevClipPaths.length) {
      return true;
    }
    for (var i2 = 0; i2 < clipPaths.length; i2++) {
      if (clipPaths[i2] !== prevClipPaths[i2]) {
        return true;
      }
    }
    return false;
  }
  function doClip(clipPaths, ctx) {
    for (var i2 = 0; i2 < clipPaths.length; i2++) {
      var clipPath = clipPaths[i2];
      clipPath.setTransform(ctx);
      ctx.beginPath();
      clipPath.buildPath(ctx, clipPath.shape);
      ctx.clip();
      clipPath.restoreTransform(ctx);
    }
  }
  function createRoot(width, height) {
    var domRoot = document.createElement("div");
    domRoot.style.cssText = [
      "position:relative",
      "width:" + width + "px",
      "height:" + height + "px",
      "padding:0",
      "margin:0",
      "border-width:0"
    ].join(";") + ";";
    return domRoot;
  }
  var Painter$1 = function(root, storage2, opts) {
    this.type = "canvas";
    var singleCanvas = !root.nodeName || root.nodeName.toUpperCase() === "CANVAS";
    this._opts = opts = util$2.extend({}, opts || {});
    this.dpr = opts.devicePixelRatio || devicePixelRatio;
    this._singleCanvas = singleCanvas;
    this.root = root;
    var rootStyle = root.style;
    if (rootStyle) {
      rootStyle["-webkit-tap-highlight-color"] = "transparent";
      rootStyle["-webkit-user-select"] = rootStyle["user-select"] = rootStyle["-webkit-touch-callout"] = "none";
      root.innerHTML = "";
    }
    this.storage = storage2;
    var zlevelList = this._zlevelList = [];
    var layers = this._layers = {};
    this._layerConfig = {};
    this._needsManuallyCompositing = false;
    if (!singleCanvas) {
      this._width = this._getSize(0);
      this._height = this._getSize(1);
      var domRoot = this._domRoot = createRoot(this._width, this._height);
      root.appendChild(domRoot);
    } else {
      var width = root.width;
      var height = root.height;
      if (opts.width != null) {
        width = opts.width;
      }
      if (opts.height != null) {
        height = opts.height;
      }
      this.dpr = opts.devicePixelRatio || 1;
      root.width = width * this.dpr;
      root.height = height * this.dpr;
      this._width = width;
      this._height = height;
      var mainLayer = new Layer(root, this, this.dpr);
      mainLayer.__builtin__ = true;
      mainLayer.initContext();
      layers[CANVAS_ZLEVEL] = mainLayer;
      mainLayer.zlevel = CANVAS_ZLEVEL;
      zlevelList.push(CANVAS_ZLEVEL);
      this._domRoot = root;
    }
    this._hoverlayer = null;
    this._hoverElements = [];
  };
  Painter$1.prototype = {
    constructor: Painter$1,
    getType: function() {
      return "canvas";
    },
    isSingleCanvas: function() {
      return this._singleCanvas;
    },
    getViewportRoot: function() {
      return this._domRoot;
    },
    getViewportRootOffset: function() {
      var viewportRoot = this.getViewportRoot();
      if (viewportRoot) {
        return {
          offsetLeft: viewportRoot.offsetLeft || 0,
          offsetTop: viewportRoot.offsetTop || 0
        };
      }
    },
    refresh: function(paintAll) {
      var list = this.storage.getDisplayList(true);
      var zlevelList = this._zlevelList;
      this._redrawId = Math.random();
      this._paintList(list, paintAll, this._redrawId);
      for (var i2 = 0; i2 < zlevelList.length; i2++) {
        var z = zlevelList[i2];
        var layer = this._layers[z];
        if (!layer.__builtin__ && layer.refresh) {
          var clearColor = i2 === 0 ? this._backgroundColor : null;
          layer.refresh(clearColor);
        }
      }
      this.refreshHover();
      return this;
    },
    addHover: function(el, hoverStyle) {
      if (el.__hoverMir) {
        return;
      }
      var elMirror = new el.constructor({
        style: el.style,
        shape: el.shape,
        z: el.z,
        z2: el.z2,
        silent: el.silent
      });
      elMirror.__from = el;
      el.__hoverMir = elMirror;
      hoverStyle && elMirror.setStyle(hoverStyle);
      this._hoverElements.push(elMirror);
      return elMirror;
    },
    removeHover: function(el) {
      var elMirror = el.__hoverMir;
      var hoverElements = this._hoverElements;
      var idx = util$2.indexOf(hoverElements, elMirror);
      if (idx >= 0) {
        hoverElements.splice(idx, 1);
      }
      el.__hoverMir = null;
    },
    clearHover: function(el) {
      var hoverElements = this._hoverElements;
      for (var i2 = 0; i2 < hoverElements.length; i2++) {
        var from = hoverElements[i2].__from;
        if (from) {
          from.__hoverMir = null;
        }
      }
      hoverElements.length = 0;
    },
    refreshHover: function() {
      var hoverElements = this._hoverElements;
      var len2 = hoverElements.length;
      var hoverLayer = this._hoverlayer;
      hoverLayer && hoverLayer.clear();
      if (!len2) {
        return;
      }
      timsort(hoverElements, this.storage.displayableSortFunc);
      if (!hoverLayer) {
        hoverLayer = this._hoverlayer = this.getLayer(HOVER_LAYER_ZLEVEL);
      }
      var scope = {};
      hoverLayer.ctx.save();
      for (var i2 = 0; i2 < len2; ) {
        var el = hoverElements[i2];
        var originalEl = el.__from;
        if (!(originalEl && originalEl.__zr)) {
          hoverElements.splice(i2, 1);
          originalEl.__hoverMir = null;
          len2--;
          continue;
        }
        i2++;
        if (!originalEl.invisible) {
          el.transform = originalEl.transform;
          el.invTransform = originalEl.invTransform;
          el.__clipPaths = originalEl.__clipPaths;
          this._doPaintEl(el, hoverLayer, true, scope);
        }
      }
      hoverLayer.ctx.restore();
    },
    getHoverLayer: function() {
      return this.getLayer(HOVER_LAYER_ZLEVEL);
    },
    _paintList: function(list, paintAll, redrawId) {
      if (this._redrawId !== redrawId) {
        return;
      }
      paintAll = paintAll || false;
      this._updateLayerStatus(list);
      var finished = this._doPaintList(list, paintAll);
      if (this._needsManuallyCompositing) {
        this._compositeManually();
      }
      if (!finished) {
        var self2 = this;
        requestAnimationFrame$1(function() {
          self2._paintList(list, paintAll, redrawId);
        });
      }
    },
    _compositeManually: function() {
      var ctx = this.getLayer(CANVAS_ZLEVEL).ctx;
      var width = this._domRoot.width;
      var height = this._domRoot.height;
      ctx.clearRect(0, 0, width, height);
      this.eachBuiltinLayer(function(layer) {
        if (layer.virtual) {
          ctx.drawImage(layer.dom, 0, 0, width, height);
        }
      });
    },
    _doPaintList: function(list, paintAll) {
      var layerList = [];
      for (var zi = 0; zi < this._zlevelList.length; zi++) {
        var zlevel = this._zlevelList[zi];
        var layer = this._layers[zlevel];
        if (layer.__builtin__ && layer !== this._hoverlayer && (layer.__dirty || paintAll)) {
          layerList.push(layer);
        }
      }
      var finished = true;
      for (var k = 0; k < layerList.length; k++) {
        var layer = layerList[k];
        var ctx = layer.ctx;
        var scope = {};
        ctx.save();
        var start2 = paintAll ? layer.__startIndex : layer.__drawIndex;
        var useTimer = !paintAll && layer.incremental && Date.now;
        var startTime = useTimer && Date.now();
        var clearColor = layer.zlevel === this._zlevelList[0] ? this._backgroundColor : null;
        if (layer.__startIndex === layer.__endIndex) {
          layer.clear(false, clearColor);
        } else if (start2 === layer.__startIndex) {
          var firstEl = list[start2];
          if (!firstEl.incremental || !firstEl.notClear || paintAll) {
            layer.clear(false, clearColor);
          }
        }
        if (start2 === -1) {
          formatAppLog("error", "at node_modules/zrender/lib/Painter.js:438", "For some unknown reason. drawIndex is -1");
          start2 = layer.__startIndex;
        }
        for (var i2 = start2; i2 < layer.__endIndex; i2++) {
          var el = list[i2];
          this._doPaintEl(el, layer, paintAll, scope);
          el.__dirty = el.__dirtyText = false;
          if (useTimer) {
            var dTime = Date.now() - startTime;
            if (dTime > 15) {
              break;
            }
          }
        }
        layer.__drawIndex = i2;
        if (layer.__drawIndex < layer.__endIndex) {
          finished = false;
        }
        if (scope.prevElClipPaths) {
          ctx.restore();
        }
        ctx.restore();
      }
      if (env$9.wxa) {
        util$2.each(this._layers, function(layer2) {
          if (layer2 && layer2.ctx && layer2.ctx.draw) {
            layer2.ctx.draw();
          }
        });
      }
      return finished;
    },
    _doPaintEl: function(el, currentLayer, forcePaint, scope) {
      var ctx = currentLayer.ctx;
      var m2 = el.transform;
      if ((currentLayer.__dirty || forcePaint) && !el.invisible && el.style.opacity !== 0 && !(m2 && !m2[0] && !m2[3]) && !(el.culling && isDisplayableCulled(el, this._width, this._height))) {
        var clipPaths = el.__clipPaths;
        var prevElClipPaths = scope.prevElClipPaths;
        if (!prevElClipPaths || isClipPathChanged(clipPaths, prevElClipPaths)) {
          if (prevElClipPaths) {
            ctx.restore();
            scope.prevElClipPaths = null;
            scope.prevEl = null;
          }
          if (clipPaths) {
            ctx.save();
            doClip(clipPaths, ctx);
            scope.prevElClipPaths = clipPaths;
          }
        }
        el.beforeBrush && el.beforeBrush(ctx);
        el.brush(ctx, scope.prevEl || null);
        scope.prevEl = el;
        el.afterBrush && el.afterBrush(ctx);
      }
    },
    getLayer: function(zlevel, virtual) {
      if (this._singleCanvas && !this._needsManuallyCompositing) {
        zlevel = CANVAS_ZLEVEL;
      }
      var layer = this._layers[zlevel];
      if (!layer) {
        layer = new Layer("zr_" + zlevel, this, this.dpr);
        layer.zlevel = zlevel;
        layer.__builtin__ = true;
        if (this._layerConfig[zlevel]) {
          util$2.merge(layer, this._layerConfig[zlevel], true);
        } else if (this._layerConfig[zlevel - EL_AFTER_INCREMENTAL_INC]) {
          util$2.merge(layer, this._layerConfig[zlevel - EL_AFTER_INCREMENTAL_INC], true);
        }
        if (virtual) {
          layer.virtual = virtual;
        }
        this.insertLayer(zlevel, layer);
        layer.initContext();
      }
      return layer;
    },
    insertLayer: function(zlevel, layer) {
      var layersMap = this._layers;
      var zlevelList = this._zlevelList;
      var len2 = zlevelList.length;
      var prevLayer = null;
      var i2 = -1;
      var domRoot = this._domRoot;
      if (layersMap[zlevel]) {
        logError("ZLevel " + zlevel + " has been used already");
        return;
      }
      if (!isLayerValid(layer)) {
        logError("Layer of zlevel " + zlevel + " is not valid");
        return;
      }
      if (len2 > 0 && zlevel > zlevelList[0]) {
        for (i2 = 0; i2 < len2 - 1; i2++) {
          if (zlevelList[i2] < zlevel && zlevelList[i2 + 1] > zlevel) {
            break;
          }
        }
        prevLayer = layersMap[zlevelList[i2]];
      }
      zlevelList.splice(i2 + 1, 0, zlevel);
      layersMap[zlevel] = layer;
      if (!layer.virtual) {
        if (prevLayer) {
          var prevDom = prevLayer.dom;
          if (prevDom.nextSibling) {
            domRoot.insertBefore(layer.dom, prevDom.nextSibling);
          } else {
            domRoot.appendChild(layer.dom);
          }
        } else {
          if (domRoot.firstChild) {
            domRoot.insertBefore(layer.dom, domRoot.firstChild);
          } else {
            domRoot.appendChild(layer.dom);
          }
        }
      }
    },
    eachLayer: function(cb, context) {
      var zlevelList = this._zlevelList;
      var z;
      var i2;
      for (i2 = 0; i2 < zlevelList.length; i2++) {
        z = zlevelList[i2];
        cb.call(context, this._layers[z], z);
      }
    },
    eachBuiltinLayer: function(cb, context) {
      var zlevelList = this._zlevelList;
      var layer;
      var z;
      var i2;
      for (i2 = 0; i2 < zlevelList.length; i2++) {
        z = zlevelList[i2];
        layer = this._layers[z];
        if (layer.__builtin__) {
          cb.call(context, layer, z);
        }
      }
    },
    eachOtherLayer: function(cb, context) {
      var zlevelList = this._zlevelList;
      var layer;
      var z;
      var i2;
      for (i2 = 0; i2 < zlevelList.length; i2++) {
        z = zlevelList[i2];
        layer = this._layers[z];
        if (!layer.__builtin__) {
          cb.call(context, layer, z);
        }
      }
    },
    getLayers: function() {
      return this._layers;
    },
    _updateLayerStatus: function(list) {
      this.eachBuiltinLayer(function(layer2, z) {
        layer2.__dirty = layer2.__used = false;
      });
      function updatePrevLayer(idx) {
        if (prevLayer) {
          if (prevLayer.__endIndex !== idx) {
            prevLayer.__dirty = true;
          }
          prevLayer.__endIndex = idx;
        }
      }
      if (this._singleCanvas) {
        for (var i2 = 1; i2 < list.length; i2++) {
          var el = list[i2];
          if (el.zlevel !== list[i2 - 1].zlevel || el.incremental) {
            this._needsManuallyCompositing = true;
            break;
          }
        }
      }
      var prevLayer = null;
      var incrementalLayerCount = 0;
      var prevZlevel;
      for (var i2 = 0; i2 < list.length; i2++) {
        var el = list[i2];
        var zlevel = el.zlevel;
        var layer;
        if (prevZlevel !== zlevel) {
          prevZlevel = zlevel;
          incrementalLayerCount = 0;
        }
        if (el.incremental) {
          layer = this.getLayer(zlevel + INCREMENTAL_INC, this._needsManuallyCompositing);
          layer.incremental = true;
          incrementalLayerCount = 1;
        } else {
          layer = this.getLayer(zlevel + (incrementalLayerCount > 0 ? EL_AFTER_INCREMENTAL_INC : 0), this._needsManuallyCompositing);
        }
        if (!layer.__builtin__) {
          logError("ZLevel " + zlevel + " has been used by unkown layer " + layer.id);
        }
        if (layer !== prevLayer) {
          layer.__used = true;
          if (layer.__startIndex !== i2) {
            layer.__dirty = true;
          }
          layer.__startIndex = i2;
          if (!layer.incremental) {
            layer.__drawIndex = i2;
          } else {
            layer.__drawIndex = -1;
          }
          updatePrevLayer(i2);
          prevLayer = layer;
        }
        if (el.__dirty) {
          layer.__dirty = true;
          if (layer.incremental && layer.__drawIndex < 0) {
            layer.__drawIndex = i2;
          }
        }
      }
      updatePrevLayer(i2);
      this.eachBuiltinLayer(function(layer2, z) {
        if (!layer2.__used && layer2.getElementCount() > 0) {
          layer2.__dirty = true;
          layer2.__startIndex = layer2.__endIndex = layer2.__drawIndex = 0;
        }
        if (layer2.__dirty && layer2.__drawIndex < 0) {
          layer2.__drawIndex = layer2.__startIndex;
        }
      });
    },
    clear: function() {
      this.eachBuiltinLayer(this._clearLayer);
      return this;
    },
    _clearLayer: function(layer) {
      layer.clear();
    },
    setBackgroundColor: function(backgroundColor) {
      this._backgroundColor = backgroundColor;
    },
    configLayer: function(zlevel, config2) {
      if (config2) {
        var layerConfig = this._layerConfig;
        if (!layerConfig[zlevel]) {
          layerConfig[zlevel] = config2;
        } else {
          util$2.merge(layerConfig[zlevel], config2, true);
        }
        for (var i2 = 0; i2 < this._zlevelList.length; i2++) {
          var _zlevel = this._zlevelList[i2];
          if (_zlevel === zlevel || _zlevel === zlevel + EL_AFTER_INCREMENTAL_INC) {
            var layer = this._layers[_zlevel];
            util$2.merge(layer, layerConfig[zlevel], true);
          }
        }
      }
    },
    delLayer: function(zlevel) {
      var layers = this._layers;
      var zlevelList = this._zlevelList;
      var layer = layers[zlevel];
      if (!layer) {
        return;
      }
      layer.dom.parentNode.removeChild(layer.dom);
      delete layers[zlevel];
      zlevelList.splice(util$2.indexOf(zlevelList, zlevel), 1);
    },
    resize: function(width, height) {
      if (!this._domRoot.style) {
        if (width == null || height == null) {
          return;
        }
        this._width = width;
        this._height = height;
        this.getLayer(CANVAS_ZLEVEL).resize(width, height);
      } else {
        var domRoot = this._domRoot;
        domRoot.style.display = "none";
        var opts = this._opts;
        width != null && (opts.width = width);
        height != null && (opts.height = height);
        width = this._getSize(0);
        height = this._getSize(1);
        domRoot.style.display = "";
        if (this._width !== width || height !== this._height) {
          domRoot.style.width = width + "px";
          domRoot.style.height = height + "px";
          for (var id in this._layers) {
            if (this._layers.hasOwnProperty(id)) {
              this._layers[id].resize(width, height);
            }
          }
          util$2.each(this._progressiveLayers, function(layer) {
            layer.resize(width, height);
          });
          this.refresh(true);
        }
        this._width = width;
        this._height = height;
      }
      return this;
    },
    clearLayer: function(zlevel) {
      var layer = this._layers[zlevel];
      if (layer) {
        layer.clear();
      }
    },
    dispose: function() {
      this.root.innerHTML = "";
      this.root = this.storage = this._domRoot = this._layers = null;
    },
    getRenderedCanvas: function(opts) {
      opts = opts || {};
      if (this._singleCanvas && !this._compositeManually) {
        return this._layers[CANVAS_ZLEVEL].dom;
      }
      var imageLayer = new Layer("image", this, opts.pixelRatio || this.dpr);
      imageLayer.initContext();
      imageLayer.clear(false, opts.backgroundColor || this._backgroundColor);
      if (opts.pixelRatio <= this.dpr) {
        this.refresh();
        var width = imageLayer.dom.width;
        var height = imageLayer.dom.height;
        var ctx = imageLayer.ctx;
        this.eachLayer(function(layer) {
          if (layer.__builtin__) {
            ctx.drawImage(layer.dom, 0, 0, width, height);
          } else if (layer.renderToCanvas) {
            imageLayer.ctx.save();
            layer.renderToCanvas(imageLayer.ctx);
            imageLayer.ctx.restore();
          }
        });
      } else {
        var scope = {};
        var displayList = this.storage.getDisplayList(true);
        for (var i2 = 0; i2 < displayList.length; i2++) {
          var el = displayList[i2];
          this._doPaintEl(el, imageLayer, true, scope);
        }
      }
      return imageLayer.dom;
    },
    getWidth: function() {
      return this._width;
    },
    getHeight: function() {
      return this._height;
    },
    _getSize: function(whIdx) {
      var opts = this._opts;
      var wh = ["width", "height"][whIdx];
      var cwh = ["clientWidth", "clientHeight"][whIdx];
      var plt = ["paddingLeft", "paddingTop"][whIdx];
      var prb = ["paddingRight", "paddingBottom"][whIdx];
      if (opts[wh] != null && opts[wh] !== "auto") {
        return parseFloat(opts[wh]);
      }
      var root = this.root;
      var stl = document.defaultView.getComputedStyle(root);
      return (root[cwh] || parseInt10(stl[wh]) || parseInt10(root.style[wh])) - (parseInt10(stl[plt]) || 0) - (parseInt10(stl[prb]) || 0) | 0;
    },
    pathToImage: function(path2, dpr2) {
      dpr2 = dpr2 || this.dpr;
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      var rect = path2.getBoundingRect();
      var style = path2.style;
      var shadowBlurSize = style.shadowBlur * dpr2;
      var shadowOffsetX = style.shadowOffsetX * dpr2;
      var shadowOffsetY = style.shadowOffsetY * dpr2;
      var lineWidth = style.hasStroke() ? style.lineWidth : 0;
      var leftMargin = Math.max(lineWidth / 2, -shadowOffsetX + shadowBlurSize);
      var rightMargin = Math.max(lineWidth / 2, shadowOffsetX + shadowBlurSize);
      var topMargin = Math.max(lineWidth / 2, -shadowOffsetY + shadowBlurSize);
      var bottomMargin = Math.max(lineWidth / 2, shadowOffsetY + shadowBlurSize);
      var width = rect.width + leftMargin + rightMargin;
      var height = rect.height + topMargin + bottomMargin;
      canvas.width = width * dpr2;
      canvas.height = height * dpr2;
      ctx.scale(dpr2, dpr2);
      ctx.clearRect(0, 0, width, height);
      ctx.dpr = dpr2;
      var pathTransform = {
        position: path2.position,
        rotation: path2.rotation,
        scale: path2.scale
      };
      path2.position = [leftMargin - rect.x, topMargin - rect.y];
      path2.rotation = 0;
      path2.scale = [1, 1];
      path2.updateTransform();
      if (path2) {
        path2.brush(ctx);
      }
      var ImageShape = Image$1;
      var imgShape = new ImageShape({
        style: {
          x: 0,
          y: 0,
          image: canvas
        }
      });
      if (pathTransform.position != null) {
        imgShape.position = path2.position = pathTransform.position;
      }
      if (pathTransform.rotation != null) {
        imgShape.rotation = path2.rotation = pathTransform.rotation;
      }
      if (pathTransform.scale != null) {
        imgShape.scale = path2.scale = pathTransform.scale;
      }
      return imgShape;
    }
  };
  var _default$1o = Painter$1;
  var Painter_1 = _default$1o;
  var util$1 = util$6;
  var _event$1 = event;
  var Dispatcher = _event$1.Dispatcher;
  var requestAnimationFrame = requestAnimationFrame$2;
  var Animator = Animator_1;
  var Animation$1 = function(options2) {
    options2 = options2 || {};
    this.stage = options2.stage || {};
    this.onframe = options2.onframe || function() {
    };
    this._clips = [];
    this._running = false;
    this._time;
    this._pausedTime;
    this._pauseStart;
    this._paused = false;
    Dispatcher.call(this);
  };
  Animation$1.prototype = {
    constructor: Animation$1,
    addClip: function(clip) {
      this._clips.push(clip);
    },
    addAnimator: function(animator) {
      animator.animation = this;
      var clips = animator.getClips();
      for (var i2 = 0; i2 < clips.length; i2++) {
        this.addClip(clips[i2]);
      }
    },
    removeClip: function(clip) {
      var idx = util$1.indexOf(this._clips, clip);
      if (idx >= 0) {
        this._clips.splice(idx, 1);
      }
    },
    removeAnimator: function(animator) {
      var clips = animator.getClips();
      for (var i2 = 0; i2 < clips.length; i2++) {
        this.removeClip(clips[i2]);
      }
      animator.animation = null;
    },
    _update: function() {
      var time = new Date().getTime() - this._pausedTime;
      var delta = time - this._time;
      var clips = this._clips;
      var len2 = clips.length;
      var deferredEvents = [];
      var deferredClips = [];
      for (var i2 = 0; i2 < len2; i2++) {
        var clip = clips[i2];
        var e = clip.step(time, delta);
        if (e) {
          deferredEvents.push(e);
          deferredClips.push(clip);
        }
      }
      for (var i2 = 0; i2 < len2; ) {
        if (clips[i2]._needsRemove) {
          clips[i2] = clips[len2 - 1];
          clips.pop();
          len2--;
        } else {
          i2++;
        }
      }
      len2 = deferredEvents.length;
      for (var i2 = 0; i2 < len2; i2++) {
        deferredClips[i2].fire(deferredEvents[i2]);
      }
      this._time = time;
      this.onframe(delta);
      this.trigger("frame", delta);
      if (this.stage.update) {
        this.stage.update();
      }
    },
    _startLoop: function() {
      var self2 = this;
      this._running = true;
      function step() {
        if (self2._running) {
          requestAnimationFrame(step);
          !self2._paused && self2._update();
        }
      }
      requestAnimationFrame(step);
    },
    start: function() {
      this._time = new Date().getTime();
      this._pausedTime = 0;
      this._startLoop();
    },
    stop: function() {
      this._running = false;
    },
    pause: function() {
      if (!this._paused) {
        this._pauseStart = new Date().getTime();
        this._paused = true;
      }
    },
    resume: function() {
      if (this._paused) {
        this._pausedTime += new Date().getTime() - this._pauseStart;
        this._paused = false;
      }
    },
    clear: function() {
      this._clips = [];
    },
    isFinished: function() {
      return !this._clips.length;
    },
    animate: function(target, options2) {
      options2 = options2 || {};
      var animator = new Animator(target, options2.loop, options2.getter, options2.setter);
      this.addAnimator(animator);
      return animator;
    }
  };
  util$1.mixin(Animation$1, Dispatcher);
  var _default$1n = Animation$1;
  var Animation_1 = _default$1n;
  var _event = event;
  var addEventListener = _event.addEventListener;
  var removeEventListener = _event.removeEventListener;
  var normalizeEvent = _event.normalizeEvent;
  var getNativeEvent = _event.getNativeEvent;
  var zrUtil$Z = util$6;
  var Eventful = Eventful_1;
  var env$8 = env_1;
  var TOUCH_CLICK_DELAY = 300;
  var globalEventSupported = env$8.domSupported;
  var localNativeListenerNames = function() {
    var mouseHandlerNames = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"];
    var touchHandlerNames = ["touchstart", "touchend", "touchmove"];
    var pointerEventNameMap = {
      pointerdown: 1,
      pointerup: 1,
      pointermove: 1,
      pointerout: 1
    };
    var pointerHandlerNames = zrUtil$Z.map(mouseHandlerNames, function(name) {
      var nm = name.replace("mouse", "pointer");
      return pointerEventNameMap.hasOwnProperty(nm) ? nm : name;
    });
    return {
      mouse: mouseHandlerNames,
      touch: touchHandlerNames,
      pointer: pointerHandlerNames
    };
  }();
  var globalNativeListenerNames = {
    mouse: ["mousemove", "mouseup"],
    pointer: ["pointermove", "pointerup"]
  };
  function eventNameFix(name) {
    return name === "mousewheel" && env$8.browser.firefox ? "DOMMouseScroll" : name;
  }
  function isPointerFromTouch(event2) {
    var pointerType = event2.pointerType;
    return pointerType === "pen" || pointerType === "touch";
  }
  function setTouchTimer(scope) {
    scope.touching = true;
    if (scope.touchTimer != null) {
      clearTimeout(scope.touchTimer);
      scope.touchTimer = null;
    }
    scope.touchTimer = setTimeout(function() {
      scope.touching = false;
      scope.touchTimer = null;
    }, 700);
  }
  function markTouch(event2) {
    event2 && (event2.zrByTouch = true);
  }
  function normalizeGlobalEvent(instance, event2) {
    return normalizeEvent(instance.dom, new FakeGlobalEvent(instance, event2), true);
  }
  function isLocalEl(instance, el) {
    var elTmp = el;
    var isLocal = false;
    while (elTmp && elTmp.nodeType !== 9 && !(isLocal = elTmp.domBelongToZr || elTmp !== el && elTmp === instance.painterRoot)) {
      elTmp = elTmp.parentNode;
    }
    return isLocal;
  }
  function FakeGlobalEvent(instance, event2) {
    this.type = event2.type;
    this.target = this.currentTarget = instance.dom;
    this.pointerType = event2.pointerType;
    this.clientX = event2.clientX;
    this.clientY = event2.clientY;
  }
  var fakeGlobalEventProto = FakeGlobalEvent.prototype;
  fakeGlobalEventProto.stopPropagation = fakeGlobalEventProto.stopImmediatePropagation = fakeGlobalEventProto.preventDefault = zrUtil$Z.noop;
  var localDOMHandlers = {
    mousedown: function(event2) {
      event2 = normalizeEvent(this.dom, event2);
      this._mayPointerCapture = [event2.zrX, event2.zrY];
      this.trigger("mousedown", event2);
    },
    mousemove: function(event2) {
      event2 = normalizeEvent(this.dom, event2);
      var downPoint = this._mayPointerCapture;
      if (downPoint && (event2.zrX !== downPoint[0] || event2.zrY !== downPoint[1])) {
        togglePointerCapture(this, true);
      }
      this.trigger("mousemove", event2);
    },
    mouseup: function(event2) {
      event2 = normalizeEvent(this.dom, event2);
      togglePointerCapture(this, false);
      this.trigger("mouseup", event2);
    },
    mouseout: function(event2) {
      event2 = normalizeEvent(this.dom, event2);
      if (this._pointerCapturing) {
        event2.zrEventControl = "no_globalout";
      }
      var element = event2.toElement || event2.relatedTarget;
      event2.zrIsToLocalDOM = isLocalEl(this, element);
      this.trigger("mouseout", event2);
    },
    touchstart: function(event2) {
      event2 = normalizeEvent(this.dom, event2);
      markTouch(event2);
      this._lastTouchMoment = new Date();
      this.handler.processGesture(event2, "start");
      localDOMHandlers.mousemove.call(this, event2);
      localDOMHandlers.mousedown.call(this, event2);
    },
    touchmove: function(event2) {
      event2 = normalizeEvent(this.dom, event2);
      markTouch(event2);
      this.handler.processGesture(event2, "change");
      localDOMHandlers.mousemove.call(this, event2);
    },
    touchend: function(event2) {
      event2 = normalizeEvent(this.dom, event2);
      markTouch(event2);
      this.handler.processGesture(event2, "end");
      localDOMHandlers.mouseup.call(this, event2);
      if (+new Date() - this._lastTouchMoment < TOUCH_CLICK_DELAY) {
        localDOMHandlers.click.call(this, event2);
      }
    },
    pointerdown: function(event2) {
      localDOMHandlers.mousedown.call(this, event2);
    },
    pointermove: function(event2) {
      if (!isPointerFromTouch(event2)) {
        localDOMHandlers.mousemove.call(this, event2);
      }
    },
    pointerup: function(event2) {
      localDOMHandlers.mouseup.call(this, event2);
    },
    pointerout: function(event2) {
      if (!isPointerFromTouch(event2)) {
        localDOMHandlers.mouseout.call(this, event2);
      }
    }
  };
  zrUtil$Z.each(["click", "mousewheel", "dblclick", "contextmenu"], function(name) {
    localDOMHandlers[name] = function(event2) {
      event2 = normalizeEvent(this.dom, event2);
      this.trigger(name, event2);
    };
  });
  var globalDOMHandlers = {
    pointermove: function(event2) {
      if (!isPointerFromTouch(event2)) {
        globalDOMHandlers.mousemove.call(this, event2);
      }
    },
    pointerup: function(event2) {
      globalDOMHandlers.mouseup.call(this, event2);
    },
    mousemove: function(event2) {
      this.trigger("mousemove", event2);
    },
    mouseup: function(event2) {
      var pointerCaptureReleasing = this._pointerCapturing;
      togglePointerCapture(this, false);
      this.trigger("mouseup", event2);
      if (pointerCaptureReleasing) {
        event2.zrEventControl = "only_globalout";
        this.trigger("mouseout", event2);
      }
    }
  };
  function mountLocalDOMEventListeners(instance, scope) {
    var domHandlers = scope.domHandlers;
    if (env$8.pointerEventsSupported) {
      zrUtil$Z.each(localNativeListenerNames.pointer, function(nativeEventName) {
        mountSingleDOMEventListener(scope, nativeEventName, function(event2) {
          domHandlers[nativeEventName].call(instance, event2);
        });
      });
    } else {
      if (env$8.touchEventsSupported) {
        zrUtil$Z.each(localNativeListenerNames.touch, function(nativeEventName) {
          mountSingleDOMEventListener(scope, nativeEventName, function(event2) {
            domHandlers[nativeEventName].call(instance, event2);
            setTouchTimer(scope);
          });
        });
      }
      zrUtil$Z.each(localNativeListenerNames.mouse, function(nativeEventName) {
        mountSingleDOMEventListener(scope, nativeEventName, function(event2) {
          event2 = getNativeEvent(event2);
          if (!scope.touching) {
            domHandlers[nativeEventName].call(instance, event2);
          }
        });
      });
    }
  }
  function mountGlobalDOMEventListeners(instance, scope) {
    if (env$8.pointerEventsSupported) {
      zrUtil$Z.each(globalNativeListenerNames.pointer, mount);
    } else if (!env$8.touchEventsSupported) {
      zrUtil$Z.each(globalNativeListenerNames.mouse, mount);
    }
    function mount(nativeEventName) {
      function nativeEventListener(event2) {
        event2 = getNativeEvent(event2);
        if (!isLocalEl(instance, event2.target)) {
          event2 = normalizeGlobalEvent(instance, event2);
          scope.domHandlers[nativeEventName].call(instance, event2);
        }
      }
      mountSingleDOMEventListener(scope, nativeEventName, nativeEventListener, {
        capture: true
      });
    }
  }
  function mountSingleDOMEventListener(scope, nativeEventName, listener, opt) {
    scope.mounted[nativeEventName] = listener;
    scope.listenerOpts[nativeEventName] = opt;
    addEventListener(scope.domTarget, eventNameFix(nativeEventName), listener, opt);
  }
  function unmountDOMEventListeners(scope) {
    var mounted = scope.mounted;
    for (var nativeEventName in mounted) {
      if (mounted.hasOwnProperty(nativeEventName)) {
        removeEventListener(scope.domTarget, eventNameFix(nativeEventName), mounted[nativeEventName], scope.listenerOpts[nativeEventName]);
      }
    }
    scope.mounted = {};
  }
  function togglePointerCapture(instance, isPointerCapturing) {
    instance._mayPointerCapture = null;
    if (globalEventSupported && instance._pointerCapturing ^ isPointerCapturing) {
      instance._pointerCapturing = isPointerCapturing;
      var globalHandlerScope = instance._globalHandlerScope;
      isPointerCapturing ? mountGlobalDOMEventListeners(instance, globalHandlerScope) : unmountDOMEventListeners(globalHandlerScope);
    }
  }
  function DOMHandlerScope(domTarget, domHandlers) {
    this.domTarget = domTarget;
    this.domHandlers = domHandlers;
    this.mounted = {};
    this.listenerOpts = {};
    this.touchTimer = null;
    this.touching = false;
  }
  function HandlerDomProxy(dom2, painterRoot) {
    Eventful.call(this);
    this.dom = dom2;
    this.painterRoot = painterRoot;
    this._localHandlerScope = new DOMHandlerScope(dom2, localDOMHandlers);
    if (globalEventSupported) {
      this._globalHandlerScope = new DOMHandlerScope(document, globalDOMHandlers);
    }
    this._pointerCapturing = false;
    this._mayPointerCapture = null;
    mountLocalDOMEventListeners(this, this._localHandlerScope);
  }
  var handlerDomProxyProto = HandlerDomProxy.prototype;
  handlerDomProxyProto.dispose = function() {
    unmountDOMEventListeners(this._localHandlerScope);
    if (globalEventSupported) {
      unmountDOMEventListeners(this._globalHandlerScope);
    }
  };
  handlerDomProxyProto.setCursor = function(cursorStyle) {
    this.dom.style && (this.dom.style.cursor = cursorStyle || "default");
  };
  zrUtil$Z.mixin(HandlerDomProxy, Eventful);
  var _default$1m = HandlerDomProxy;
  var HandlerProxy$1 = _default$1m;
  var guid = guid$2;
  var env$7 = env_1;
  var zrUtil$Y = util$6;
  var Handler = Handler_1;
  var Storage = Storage_1;
  var Painter = Painter_1;
  var Animation = Animation_1;
  var HandlerProxy = HandlerProxy$1;
  /*!
  * ZRender, a high performance 2d drawing library.
  *
  * Copyright (c) 2013, Baidu Inc.
  * All rights reserved.
  *
  * LICENSE
  * https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
  */
  var useVML = !env$7.canvasSupported;
  var painterCtors = {
    canvas: Painter
  };
  var instances = {};
  var version = "4.3.2";
  function init(dom2, opts) {
    var zr = new ZRender(guid(), dom2, opts);
    instances[zr.id] = zr;
    return zr;
  }
  function dispose(zr) {
    if (zr) {
      zr.dispose();
    } else {
      for (var key in instances) {
        if (instances.hasOwnProperty(key)) {
          instances[key].dispose();
        }
      }
      instances = {};
    }
    return this;
  }
  function getInstance(id) {
    return instances[id];
  }
  function registerPainter(name, Ctor) {
    painterCtors[name] = Ctor;
  }
  function delInstance(id) {
    delete instances[id];
  }
  var ZRender = function(id, dom2, opts) {
    opts = opts || {};
    this.dom = dom2;
    this.id = id;
    var self2 = this;
    var storage2 = new Storage();
    var rendererType = opts.renderer;
    if (useVML) {
      if (!painterCtors.vml) {
        throw new Error("You need to require 'zrender/vml/vml' to support IE8");
      }
      rendererType = "vml";
    } else if (!rendererType || !painterCtors[rendererType]) {
      rendererType = "canvas";
    }
    var painter = new painterCtors[rendererType](dom2, storage2, opts, id);
    this.storage = storage2;
    this.painter = painter;
    var handerProxy = !env$7.node && !env$7.worker ? new HandlerProxy(painter.getViewportRoot(), painter.root) : null;
    this.handler = new Handler(storage2, painter, handerProxy, painter.root);
    this.animation = new Animation({
      stage: {
        update: zrUtil$Y.bind(this.flush, this)
      }
    });
    this.animation.start();
    this._needsRefresh;
    var oldDelFromStorage = storage2.delFromStorage;
    var oldAddToStorage = storage2.addToStorage;
    storage2.delFromStorage = function(el) {
      oldDelFromStorage.call(storage2, el);
      el && el.removeSelfFromZr(self2);
    };
    storage2.addToStorage = function(el) {
      oldAddToStorage.call(storage2, el);
      el.addSelfToZr(self2);
    };
  };
  ZRender.prototype = {
    constructor: ZRender,
    getId: function() {
      return this.id;
    },
    add: function(el) {
      this.storage.addRoot(el);
      this._needsRefresh = true;
    },
    remove: function(el) {
      this.storage.delRoot(el);
      this._needsRefresh = true;
    },
    configLayer: function(zLevel, config2) {
      if (this.painter.configLayer) {
        this.painter.configLayer(zLevel, config2);
      }
      this._needsRefresh = true;
    },
    setBackgroundColor: function(backgroundColor) {
      if (this.painter.setBackgroundColor) {
        this.painter.setBackgroundColor(backgroundColor);
      }
      this._needsRefresh = true;
    },
    refreshImmediately: function() {
      this._needsRefresh = this._needsRefreshHover = false;
      this.painter.refresh();
      this._needsRefresh = this._needsRefreshHover = false;
    },
    refresh: function() {
      this._needsRefresh = true;
    },
    flush: function() {
      var triggerRendered;
      if (this._needsRefresh) {
        triggerRendered = true;
        this.refreshImmediately();
      }
      if (this._needsRefreshHover) {
        triggerRendered = true;
        this.refreshHoverImmediately();
      }
      triggerRendered && this.trigger("rendered");
    },
    addHover: function(el, style) {
      if (this.painter.addHover) {
        var elMirror = this.painter.addHover(el, style);
        this.refreshHover();
        return elMirror;
      }
    },
    removeHover: function(el) {
      if (this.painter.removeHover) {
        this.painter.removeHover(el);
        this.refreshHover();
      }
    },
    clearHover: function() {
      if (this.painter.clearHover) {
        this.painter.clearHover();
        this.refreshHover();
      }
    },
    refreshHover: function() {
      this._needsRefreshHover = true;
    },
    refreshHoverImmediately: function() {
      this._needsRefreshHover = false;
      this.painter.refreshHover && this.painter.refreshHover();
    },
    resize: function(opts) {
      opts = opts || {};
      this.painter.resize(opts.width, opts.height);
      this.handler.resize();
    },
    clearAnimation: function() {
      this.animation.clear();
    },
    getWidth: function() {
      return this.painter.getWidth();
    },
    getHeight: function() {
      return this.painter.getHeight();
    },
    pathToImage: function(e, dpr2) {
      return this.painter.pathToImage(e, dpr2);
    },
    setCursorStyle: function(cursorStyle) {
      this.handler.setCursorStyle(cursorStyle);
    },
    findHover: function(x, y) {
      return this.handler.findHover(x, y);
    },
    on: function(eventName, eventHandler, context) {
      this.handler.on(eventName, eventHandler, context);
    },
    off: function(eventName, eventHandler) {
      this.handler.off(eventName, eventHandler);
    },
    trigger: function(eventName, event2) {
      this.handler.trigger(eventName, event2);
    },
    clear: function() {
      this.storage.delRoot();
      this.painter.clear();
    },
    dispose: function() {
      this.animation.stop();
      this.clear();
      this.storage.dispose();
      this.painter.dispose();
      this.handler.dispose();
      this.animation = this.storage = this.painter = this.handler = null;
      delInstance(this.id);
    }
  };
  zrender$1.version = version;
  zrender$1.init = init;
  zrender$1.dispose = dispose;
  zrender$1.getInstance = getInstance;
  zrender$1.registerPainter = registerPainter;
  var model = {};
  var zrUtil$X = util$6;
  var env$6 = env_1;
  var each$p = zrUtil$X.each;
  var isObject$a = zrUtil$X.isObject;
  var isArray$5 = zrUtil$X.isArray;
  var DUMMY_COMPONENT_NAME_PREFIX = "series\0";
  function normalizeToArray$4(value) {
    return value instanceof Array ? value : value == null ? [] : [value];
  }
  function defaultEmphasis(opt, key, subOpts) {
    if (opt) {
      opt[key] = opt[key] || {};
      opt.emphasis = opt.emphasis || {};
      opt.emphasis[key] = opt.emphasis[key] || {};
      for (var i2 = 0, len2 = subOpts.length; i2 < len2; i2++) {
        var subOptName = subOpts[i2];
        if (!opt.emphasis[key].hasOwnProperty(subOptName) && opt[key].hasOwnProperty(subOptName)) {
          opt.emphasis[key][subOptName] = opt[key][subOptName];
        }
      }
    }
  }
  var TEXT_STYLE_OPTIONS = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
  function getDataItemValue$3(dataItem) {
    return isObject$a(dataItem) && !isArray$5(dataItem) && !(dataItem instanceof Date) ? dataItem.value : dataItem;
  }
  function isDataItemOption$1(dataItem) {
    return isObject$a(dataItem) && !(dataItem instanceof Array);
  }
  function mappingToExists(exists, newCptOptions) {
    newCptOptions = (newCptOptions || []).slice();
    var result = zrUtil$X.map(exists || [], function(obj, index2) {
      return {
        exist: obj
      };
    });
    each$p(newCptOptions, function(cptOption, index2) {
      if (!isObject$a(cptOption)) {
        return;
      }
      for (var i2 = 0; i2 < result.length; i2++) {
        if (!result[i2].option && cptOption.id != null && result[i2].exist.id === cptOption.id + "") {
          result[i2].option = cptOption;
          newCptOptions[index2] = null;
          return;
        }
      }
      for (var i2 = 0; i2 < result.length; i2++) {
        var exist = result[i2].exist;
        if (!result[i2].option && (exist.id == null || cptOption.id == null) && cptOption.name != null && !isIdInner(cptOption) && !isIdInner(exist) && exist.name === cptOption.name + "") {
          result[i2].option = cptOption;
          newCptOptions[index2] = null;
          return;
        }
      }
    });
    each$p(newCptOptions, function(cptOption, index2) {
      if (!isObject$a(cptOption)) {
        return;
      }
      var i2 = 0;
      for (; i2 < result.length; i2++) {
        var exist = result[i2].exist;
        if (!result[i2].option && !isIdInner(exist) && cptOption.id == null) {
          result[i2].option = cptOption;
          break;
        }
      }
      if (i2 >= result.length) {
        result.push({
          option: cptOption
        });
      }
    });
    return result;
  }
  function makeIdAndName(mapResult) {
    var idMap = zrUtil$X.createHashMap();
    each$p(mapResult, function(item, index2) {
      var existCpt = item.exist;
      existCpt && idMap.set(existCpt.id, item);
    });
    each$p(mapResult, function(item, index2) {
      var opt = item.option;
      zrUtil$X.assert(!opt || opt.id == null || !idMap.get(opt.id) || idMap.get(opt.id) === item, "id duplicates: " + (opt && opt.id));
      opt && opt.id != null && idMap.set(opt.id, item);
      !item.keyInfo && (item.keyInfo = {});
    });
    each$p(mapResult, function(item, index2) {
      var existCpt = item.exist;
      var opt = item.option;
      var keyInfo = item.keyInfo;
      if (!isObject$a(opt)) {
        return;
      }
      keyInfo.name = opt.name != null ? opt.name + "" : existCpt ? existCpt.name : DUMMY_COMPONENT_NAME_PREFIX + index2;
      if (existCpt) {
        keyInfo.id = existCpt.id;
      } else if (opt.id != null) {
        keyInfo.id = opt.id + "";
      } else {
        var idNum = 0;
        do {
          keyInfo.id = "\0" + keyInfo.name + "\0" + idNum++;
        } while (idMap.get(keyInfo.id));
      }
      idMap.set(keyInfo.id, item);
    });
  }
  function isNameSpecified$1(componentModel) {
    var name = componentModel.name;
    return !!(name && name.indexOf(DUMMY_COMPONENT_NAME_PREFIX));
  }
  function isIdInner(cptOption) {
    return isObject$a(cptOption) && cptOption.id && (cptOption.id + "").indexOf("\0_ec_\0") === 0;
  }
  function compressBatches(batchA, batchB) {
    var mapA = {};
    var mapB = {};
    makeMap(batchA || [], mapA);
    makeMap(batchB || [], mapB, mapA);
    return [mapToArray(mapA), mapToArray(mapB)];
    function makeMap(sourceBatch, map2, otherMap) {
      for (var i2 = 0, len2 = sourceBatch.length; i2 < len2; i2++) {
        var seriesId = sourceBatch[i2].seriesId;
        var dataIndices = normalizeToArray$4(sourceBatch[i2].dataIndex);
        var otherDataIndices = otherMap && otherMap[seriesId];
        for (var j = 0, lenj = dataIndices.length; j < lenj; j++) {
          var dataIndex = dataIndices[j];
          if (otherDataIndices && otherDataIndices[dataIndex]) {
            otherDataIndices[dataIndex] = null;
          } else {
            (map2[seriesId] || (map2[seriesId] = {}))[dataIndex] = 1;
          }
        }
      }
    }
    function mapToArray(map2, isData) {
      var result = [];
      for (var i2 in map2) {
        if (map2.hasOwnProperty(i2) && map2[i2] != null) {
          if (isData) {
            result.push(+i2);
          } else {
            var dataIndices = mapToArray(map2[i2], true);
            dataIndices.length && result.push({
              seriesId: i2,
              dataIndex: dataIndices
            });
          }
        }
      }
      return result;
    }
  }
  function queryDataIndex(data, payload) {
    if (payload.dataIndexInside != null) {
      return payload.dataIndexInside;
    } else if (payload.dataIndex != null) {
      return zrUtil$X.isArray(payload.dataIndex) ? zrUtil$X.map(payload.dataIndex, function(value) {
        return data.indexOfRawIndex(value);
      }) : data.indexOfRawIndex(payload.dataIndex);
    } else if (payload.name != null) {
      return zrUtil$X.isArray(payload.name) ? zrUtil$X.map(payload.name, function(value) {
        return data.indexOfName(value);
      }) : data.indexOfName(payload.name);
    }
  }
  function makeInner$9() {
    var key = "__\0ec_inner_" + innerUniqueIndex++ + "_" + Math.random().toFixed(5);
    return function(hostObj) {
      return hostObj[key] || (hostObj[key] = {});
    };
  }
  var innerUniqueIndex = 0;
  function parseFinder(ecModel, finder, opt) {
    if (zrUtil$X.isString(finder)) {
      var obj = {};
      obj[finder + "Index"] = 0;
      finder = obj;
    }
    var defaultMainType = opt && opt.defaultMainType;
    if (defaultMainType && !has(finder, defaultMainType + "Index") && !has(finder, defaultMainType + "Id") && !has(finder, defaultMainType + "Name")) {
      finder[defaultMainType + "Index"] = 0;
    }
    var result = {};
    each$p(finder, function(value, key) {
      var value = finder[key];
      if (key === "dataIndex" || key === "dataIndexInside") {
        result[key] = value;
        return;
      }
      var parsedKey = key.match(/^(\w+)(Index|Id|Name)$/) || [];
      var mainType = parsedKey[1];
      var queryType = (parsedKey[2] || "").toLowerCase();
      if (!mainType || !queryType || value == null || queryType === "index" && value === "none" || opt && opt.includeMainTypes && zrUtil$X.indexOf(opt.includeMainTypes, mainType) < 0) {
        return;
      }
      var queryParam = {
        mainType
      };
      if (queryType !== "index" || value !== "all") {
        queryParam[queryType] = value;
      }
      var models = ecModel.queryComponents(queryParam);
      result[mainType + "Models"] = models;
      result[mainType + "Model"] = models[0];
    });
    return result;
  }
  function has(obj, prop2) {
    return obj && obj.hasOwnProperty(prop2);
  }
  function setAttribute(dom2, key, value) {
    dom2.setAttribute ? dom2.setAttribute(key, value) : dom2[key] = value;
  }
  function getAttribute(dom2, key) {
    return dom2.getAttribute ? dom2.getAttribute(key) : dom2[key];
  }
  function getTooltipRenderMode$2(renderModeOption) {
    if (renderModeOption === "auto") {
      return env$6.domSupported ? "html" : "richText";
    } else {
      return renderModeOption || "html";
    }
  }
  function groupData(array, getKey) {
    var buckets = zrUtil$X.createHashMap();
    var keys = [];
    zrUtil$X.each(array, function(item) {
      var key = getKey(item);
      (buckets.get(key) || (keys.push(key), buckets.set(key, []))).push(item);
    });
    return {
      keys,
      buckets
    };
  }
  model.normalizeToArray = normalizeToArray$4;
  model.defaultEmphasis = defaultEmphasis;
  model.TEXT_STYLE_OPTIONS = TEXT_STYLE_OPTIONS;
  model.getDataItemValue = getDataItemValue$3;
  model.isDataItemOption = isDataItemOption$1;
  model.mappingToExists = mappingToExists;
  model.makeIdAndName = makeIdAndName;
  model.isNameSpecified = isNameSpecified$1;
  model.isIdInner = isIdInner;
  model.compressBatches = compressBatches;
  model.queryDataIndex = queryDataIndex;
  model.makeInner = makeInner$9;
  model.parseFinder = parseFinder;
  model.setAttribute = setAttribute;
  model.getAttribute = getAttribute;
  model.getTooltipRenderMode = getTooltipRenderMode$2;
  model.groupData = groupData;
  var clazz = {};
  var zrUtil$W = util$6;
  var TYPE_DELIMITER = ".";
  var IS_CONTAINER = "___EC__COMPONENT__CONTAINER___";
  function parseClassType$2(componentType) {
    var ret = {
      main: "",
      sub: ""
    };
    if (componentType) {
      componentType = componentType.split(TYPE_DELIMITER);
      ret.main = componentType[0] || "";
      ret.sub = componentType[1] || "";
    }
    return ret;
  }
  function checkClassType(componentType) {
    zrUtil$W.assert(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(componentType), 'componentType "' + componentType + '" illegal');
  }
  function enableClassExtend$1(RootClass, mandatoryMethods) {
    RootClass.$constructor = RootClass;
    RootClass.extend = function(proto2) {
      var superClass = this;
      var ExtendedClass = function() {
        if (!proto2.$constructor) {
          superClass.apply(this, arguments);
        } else {
          proto2.$constructor.apply(this, arguments);
        }
      };
      zrUtil$W.extend(ExtendedClass.prototype, proto2);
      ExtendedClass.extend = this.extend;
      ExtendedClass.superCall = superCall;
      ExtendedClass.superApply = superApply;
      zrUtil$W.inherits(ExtendedClass, this);
      ExtendedClass.superClass = superClass;
      return ExtendedClass;
    };
  }
  var classBase = 0;
  function enableClassCheck$2(Clz) {
    var classAttr = ["__\0is_clz", classBase++, Math.random().toFixed(3)].join("_");
    Clz.prototype[classAttr] = true;
    Clz.isInstance = function(obj) {
      return !!(obj && obj[classAttr]);
    };
  }
  function superCall(context, methodName) {
    var args = zrUtil$W.slice(arguments, 2);
    return this.superClass.prototype[methodName].apply(context, args);
  }
  function superApply(context, methodName, args) {
    return this.superClass.prototype[methodName].apply(context, args);
  }
  function enableClassManagement$1(entity, options2) {
    options2 = options2 || {};
    var storage2 = {};
    entity.registerClass = function(Clazz, componentType) {
      if (componentType) {
        checkClassType(componentType);
        componentType = parseClassType$2(componentType);
        if (!componentType.sub) {
          storage2[componentType.main] = Clazz;
        } else if (componentType.sub !== IS_CONTAINER) {
          var container = makeContainer(componentType);
          container[componentType.sub] = Clazz;
        }
      }
      return Clazz;
    };
    entity.getClass = function(componentMainType, subType, throwWhenNotFound) {
      var Clazz = storage2[componentMainType];
      if (Clazz && Clazz[IS_CONTAINER]) {
        Clazz = subType ? Clazz[subType] : null;
      }
      if (throwWhenNotFound && !Clazz) {
        throw new Error(!subType ? componentMainType + ".type should be specified." : "Component " + componentMainType + "." + (subType || "") + " not exists. Load it first.");
      }
      return Clazz;
    };
    entity.getClassesByMainType = function(componentType) {
      componentType = parseClassType$2(componentType);
      var result = [];
      var obj = storage2[componentType.main];
      if (obj && obj[IS_CONTAINER]) {
        zrUtil$W.each(obj, function(o, type) {
          type !== IS_CONTAINER && result.push(o);
        });
      } else {
        result.push(obj);
      }
      return result;
    };
    entity.hasClass = function(componentType) {
      componentType = parseClassType$2(componentType);
      return !!storage2[componentType.main];
    };
    entity.getAllClassMainTypes = function() {
      var types = [];
      zrUtil$W.each(storage2, function(obj, type) {
        types.push(type);
      });
      return types;
    };
    entity.hasSubTypes = function(componentType) {
      componentType = parseClassType$2(componentType);
      var obj = storage2[componentType.main];
      return obj && obj[IS_CONTAINER];
    };
    entity.parseClassType = parseClassType$2;
    function makeContainer(componentType) {
      var container = storage2[componentType.main];
      if (!container || !container[IS_CONTAINER]) {
        container = storage2[componentType.main] = {};
        container[IS_CONTAINER] = true;
      }
      return container;
    }
    if (options2.registerWhenExtend) {
      var originalExtend = entity.extend;
      if (originalExtend) {
        entity.extend = function(proto2) {
          var ExtendedClass = originalExtend.call(this, proto2);
          return entity.registerClass(ExtendedClass, proto2.type);
        };
      }
    }
    return entity;
  }
  function setReadOnly(obj, properties) {
  }
  clazz.parseClassType = parseClassType$2;
  clazz.enableClassExtend = enableClassExtend$1;
  clazz.enableClassCheck = enableClassCheck$2;
  clazz.enableClassManagement = enableClassManagement$1;
  clazz.setReadOnly = setReadOnly;
  var zrUtil$V = util$6;
  function _default$1l(properties) {
    for (var i2 = 0; i2 < properties.length; i2++) {
      if (!properties[i2][1]) {
        properties[i2][1] = properties[i2][0];
      }
    }
    return function(model2, excludes, includes) {
      var style = {};
      for (var i3 = 0; i3 < properties.length; i3++) {
        var propName = properties[i3][1];
        if (excludes && zrUtil$V.indexOf(excludes, propName) >= 0 || includes && zrUtil$V.indexOf(includes, propName) < 0) {
          continue;
        }
        var val = model2.getShallow(propName);
        if (val != null) {
          style[properties[i3][0]] = val;
        }
      }
      return style;
    };
  }
  var makeStyleMapper$3 = _default$1l;
  var makeStyleMapper$2 = makeStyleMapper$3;
  var getLineStyle = makeStyleMapper$2([["lineWidth", "width"], ["stroke", "color"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"]]);
  var _default$1k = {
    getLineStyle: function(excludes) {
      var style = getLineStyle(this, excludes);
      style.lineDash = this.getLineDash(style.lineWidth);
      return style;
    },
    getLineDash: function(lineWidth) {
      if (lineWidth == null) {
        lineWidth = 1;
      }
      var lineType = this.get("type");
      var dotSize = Math.max(lineWidth, 2);
      var dashSize = lineWidth * 4;
      return lineType === "solid" || lineType == null ? false : lineType === "dashed" ? [dashSize, dashSize] : [dotSize, dotSize];
    }
  };
  var lineStyle = _default$1k;
  var makeStyleMapper$1 = makeStyleMapper$3;
  var getAreaStyle = makeStyleMapper$1([["fill", "color"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["opacity"], ["shadowColor"]]);
  var _default$1j = {
    getAreaStyle: function(excludes, includes) {
      return getAreaStyle(this, excludes, includes);
    }
  };
  var areaStyle = _default$1j;
  var graphic$g = {};
  var path$1 = {};
  var curve$4 = {};
  var _vector$4 = vector$3;
  var v2Create = _vector$4.create;
  var v2DistSquare = _vector$4.distSquare;
  var mathPow$1 = Math.pow;
  var mathSqrt$3 = Math.sqrt;
  var EPSILON$2 = 1e-8;
  var EPSILON_NUMERIC = 1e-4;
  var THREE_SQRT = mathSqrt$3(3);
  var ONE_THIRD = 1 / 3;
  var _v0 = v2Create();
  var _v1 = v2Create();
  var _v2 = v2Create();
  function isAroundZero(val) {
    return val > -EPSILON$2 && val < EPSILON$2;
  }
  function isNotAroundZero(val) {
    return val > EPSILON$2 || val < -EPSILON$2;
  }
  function cubicAt$1(p0, p1, p2, p3, t) {
    var onet = 1 - t;
    return onet * onet * (onet * p0 + 3 * t * p1) + t * t * (t * p3 + 3 * onet * p2);
  }
  function cubicDerivativeAt$1(p0, p1, p2, p3, t) {
    var onet = 1 - t;
    return 3 * (((p1 - p0) * onet + 2 * (p2 - p1) * t) * onet + (p3 - p2) * t * t);
  }
  function cubicRootAt(p0, p1, p2, p3, val, roots2) {
    var a = p3 + 3 * (p1 - p2) - p0;
    var b = 3 * (p2 - p1 * 2 + p0);
    var c = 3 * (p1 - p0);
    var d = p0 - val;
    var A = b * b - 3 * a * c;
    var B = b * c - 9 * a * d;
    var C = c * c - 3 * b * d;
    var n = 0;
    if (isAroundZero(A) && isAroundZero(B)) {
      if (isAroundZero(b)) {
        roots2[0] = 0;
      } else {
        var t1 = -c / b;
        if (t1 >= 0 && t1 <= 1) {
          roots2[n++] = t1;
        }
      }
    } else {
      var disc = B * B - 4 * A * C;
      if (isAroundZero(disc)) {
        var K = B / A;
        var t1 = -b / a + K;
        var t2 = -K / 2;
        if (t1 >= 0 && t1 <= 1) {
          roots2[n++] = t1;
        }
        if (t2 >= 0 && t2 <= 1) {
          roots2[n++] = t2;
        }
      } else if (disc > 0) {
        var discSqrt = mathSqrt$3(disc);
        var Y1 = A * b + 1.5 * a * (-B + discSqrt);
        var Y2 = A * b + 1.5 * a * (-B - discSqrt);
        if (Y1 < 0) {
          Y1 = -mathPow$1(-Y1, ONE_THIRD);
        } else {
          Y1 = mathPow$1(Y1, ONE_THIRD);
        }
        if (Y2 < 0) {
          Y2 = -mathPow$1(-Y2, ONE_THIRD);
        } else {
          Y2 = mathPow$1(Y2, ONE_THIRD);
        }
        var t1 = (-b - (Y1 + Y2)) / (3 * a);
        if (t1 >= 0 && t1 <= 1) {
          roots2[n++] = t1;
        }
      } else {
        var T = (2 * A * b - 3 * a * B) / (2 * mathSqrt$3(A * A * A));
        var theta = Math.acos(T) / 3;
        var ASqrt = mathSqrt$3(A);
        var tmp = Math.cos(theta);
        var t1 = (-b - 2 * ASqrt * tmp) / (3 * a);
        var t2 = (-b + ASqrt * (tmp + THREE_SQRT * Math.sin(theta))) / (3 * a);
        var t3 = (-b + ASqrt * (tmp - THREE_SQRT * Math.sin(theta))) / (3 * a);
        if (t1 >= 0 && t1 <= 1) {
          roots2[n++] = t1;
        }
        if (t2 >= 0 && t2 <= 1) {
          roots2[n++] = t2;
        }
        if (t3 >= 0 && t3 <= 1) {
          roots2[n++] = t3;
        }
      }
    }
    return n;
  }
  function cubicExtrema(p0, p1, p2, p3, extrema2) {
    var b = 6 * p2 - 12 * p1 + 6 * p0;
    var a = 9 * p1 + 3 * p3 - 3 * p0 - 9 * p2;
    var c = 3 * p1 - 3 * p0;
    var n = 0;
    if (isAroundZero(a)) {
      if (isNotAroundZero(b)) {
        var t1 = -c / b;
        if (t1 >= 0 && t1 <= 1) {
          extrema2[n++] = t1;
        }
      }
    } else {
      var disc = b * b - 4 * a * c;
      if (isAroundZero(disc)) {
        extrema2[0] = -b / (2 * a);
      } else if (disc > 0) {
        var discSqrt = mathSqrt$3(disc);
        var t1 = (-b + discSqrt) / (2 * a);
        var t2 = (-b - discSqrt) / (2 * a);
        if (t1 >= 0 && t1 <= 1) {
          extrema2[n++] = t1;
        }
        if (t2 >= 0 && t2 <= 1) {
          extrema2[n++] = t2;
        }
      }
    }
    return n;
  }
  function cubicSubdivide$1(p0, p1, p2, p3, t, out2) {
    var p01 = (p1 - p0) * t + p0;
    var p12 = (p2 - p1) * t + p1;
    var p23 = (p3 - p2) * t + p2;
    var p012 = (p12 - p01) * t + p01;
    var p123 = (p23 - p12) * t + p12;
    var p0123 = (p123 - p012) * t + p012;
    out2[0] = p0;
    out2[1] = p01;
    out2[2] = p012;
    out2[3] = p0123;
    out2[4] = p0123;
    out2[5] = p123;
    out2[6] = p23;
    out2[7] = p3;
  }
  function cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x, y, out2) {
    var t;
    var interval = 5e-3;
    var d = Infinity;
    var prev;
    var next;
    var d1;
    var d2;
    _v0[0] = x;
    _v0[1] = y;
    for (var _t = 0; _t < 1; _t += 0.05) {
      _v1[0] = cubicAt$1(x0, x1, x2, x3, _t);
      _v1[1] = cubicAt$1(y0, y1, y2, y3, _t);
      d1 = v2DistSquare(_v0, _v1);
      if (d1 < d) {
        t = _t;
        d = d1;
      }
    }
    d = Infinity;
    for (var i2 = 0; i2 < 32; i2++) {
      if (interval < EPSILON_NUMERIC) {
        break;
      }
      prev = t - interval;
      next = t + interval;
      _v1[0] = cubicAt$1(x0, x1, x2, x3, prev);
      _v1[1] = cubicAt$1(y0, y1, y2, y3, prev);
      d1 = v2DistSquare(_v1, _v0);
      if (prev >= 0 && d1 < d) {
        t = prev;
        d = d1;
      } else {
        _v2[0] = cubicAt$1(x0, x1, x2, x3, next);
        _v2[1] = cubicAt$1(y0, y1, y2, y3, next);
        d2 = v2DistSquare(_v2, _v0);
        if (next <= 1 && d2 < d) {
          t = next;
          d = d2;
        } else {
          interval *= 0.5;
        }
      }
    }
    if (out2) {
      out2[0] = cubicAt$1(x0, x1, x2, x3, t);
      out2[1] = cubicAt$1(y0, y1, y2, y3, t);
    }
    return mathSqrt$3(d);
  }
  function quadraticAt$1(p0, p1, p2, t) {
    var onet = 1 - t;
    return onet * (onet * p0 + 2 * t * p1) + t * t * p2;
  }
  function quadraticDerivativeAt$1(p0, p1, p2, t) {
    return 2 * ((1 - t) * (p1 - p0) + t * (p2 - p1));
  }
  function quadraticRootAt(p0, p1, p2, val, roots2) {
    var a = p0 - 2 * p1 + p2;
    var b = 2 * (p1 - p0);
    var c = p0 - val;
    var n = 0;
    if (isAroundZero(a)) {
      if (isNotAroundZero(b)) {
        var t1 = -c / b;
        if (t1 >= 0 && t1 <= 1) {
          roots2[n++] = t1;
        }
      }
    } else {
      var disc = b * b - 4 * a * c;
      if (isAroundZero(disc)) {
        var t1 = -b / (2 * a);
        if (t1 >= 0 && t1 <= 1) {
          roots2[n++] = t1;
        }
      } else if (disc > 0) {
        var discSqrt = mathSqrt$3(disc);
        var t1 = (-b + discSqrt) / (2 * a);
        var t2 = (-b - discSqrt) / (2 * a);
        if (t1 >= 0 && t1 <= 1) {
          roots2[n++] = t1;
        }
        if (t2 >= 0 && t2 <= 1) {
          roots2[n++] = t2;
        }
      }
    }
    return n;
  }
  function quadraticExtremum(p0, p1, p2) {
    var divider = p0 + p2 - 2 * p1;
    if (divider === 0) {
      return 0.5;
    } else {
      return (p0 - p1) / divider;
    }
  }
  function quadraticSubdivide$1(p0, p1, p2, t, out2) {
    var p01 = (p1 - p0) * t + p0;
    var p12 = (p2 - p1) * t + p1;
    var p012 = (p12 - p01) * t + p01;
    out2[0] = p0;
    out2[1] = p01;
    out2[2] = p012;
    out2[3] = p012;
    out2[4] = p12;
    out2[5] = p2;
  }
  function quadraticProjectPoint$1(x0, y0, x1, y1, x2, y2, x, y, out2) {
    var t;
    var interval = 5e-3;
    var d = Infinity;
    _v0[0] = x;
    _v0[1] = y;
    for (var _t = 0; _t < 1; _t += 0.05) {
      _v1[0] = quadraticAt$1(x0, x1, x2, _t);
      _v1[1] = quadraticAt$1(y0, y1, y2, _t);
      var d1 = v2DistSquare(_v0, _v1);
      if (d1 < d) {
        t = _t;
        d = d1;
      }
    }
    d = Infinity;
    for (var i2 = 0; i2 < 32; i2++) {
      if (interval < EPSILON_NUMERIC) {
        break;
      }
      var prev = t - interval;
      var next = t + interval;
      _v1[0] = quadraticAt$1(x0, x1, x2, prev);
      _v1[1] = quadraticAt$1(y0, y1, y2, prev);
      var d1 = v2DistSquare(_v1, _v0);
      if (prev >= 0 && d1 < d) {
        t = prev;
        d = d1;
      } else {
        _v2[0] = quadraticAt$1(x0, x1, x2, next);
        _v2[1] = quadraticAt$1(y0, y1, y2, next);
        var d2 = v2DistSquare(_v2, _v0);
        if (next <= 1 && d2 < d) {
          t = next;
          d = d2;
        } else {
          interval *= 0.5;
        }
      }
    }
    if (out2) {
      out2[0] = quadraticAt$1(x0, x1, x2, t);
      out2[1] = quadraticAt$1(y0, y1, y2, t);
    }
    return mathSqrt$3(d);
  }
  curve$4.cubicAt = cubicAt$1;
  curve$4.cubicDerivativeAt = cubicDerivativeAt$1;
  curve$4.cubicRootAt = cubicRootAt;
  curve$4.cubicExtrema = cubicExtrema;
  curve$4.cubicSubdivide = cubicSubdivide$1;
  curve$4.cubicProjectPoint = cubicProjectPoint;
  curve$4.quadraticAt = quadraticAt$1;
  curve$4.quadraticDerivativeAt = quadraticDerivativeAt$1;
  curve$4.quadraticRootAt = quadraticRootAt;
  curve$4.quadraticExtremum = quadraticExtremum;
  curve$4.quadraticSubdivide = quadraticSubdivide$1;
  curve$4.quadraticProjectPoint = quadraticProjectPoint$1;
  var bbox$2 = {};
  var vec2$4 = vector$3;
  var curve$3 = curve$4;
  var mathMin$2 = Math.min;
  var mathMax$2 = Math.max;
  var mathSin$2 = Math.sin;
  var mathCos$2 = Math.cos;
  var PI2$3 = Math.PI * 2;
  var start = vec2$4.create();
  var end = vec2$4.create();
  var extremity = vec2$4.create();
  function fromPoints$1(points2, min3, max3) {
    if (points2.length === 0) {
      return;
    }
    var p = points2[0];
    var left = p[0];
    var right = p[0];
    var top = p[1];
    var bottom = p[1];
    var i2;
    for (i2 = 1; i2 < points2.length; i2++) {
      p = points2[i2];
      left = mathMin$2(left, p[0]);
      right = mathMax$2(right, p[0]);
      top = mathMin$2(top, p[1]);
      bottom = mathMax$2(bottom, p[1]);
    }
    min3[0] = left;
    min3[1] = top;
    max3[0] = right;
    max3[1] = bottom;
  }
  function fromLine(x0, y0, x1, y1, min3, max3) {
    min3[0] = mathMin$2(x0, x1);
    min3[1] = mathMin$2(y0, y1);
    max3[0] = mathMax$2(x0, x1);
    max3[1] = mathMax$2(y0, y1);
  }
  var xDim = [];
  var yDim = [];
  function fromCubic(x0, y0, x1, y1, x2, y2, x3, y3, min3, max3) {
    var cubicExtrema2 = curve$3.cubicExtrema;
    var cubicAt2 = curve$3.cubicAt;
    var i2;
    var n = cubicExtrema2(x0, x1, x2, x3, xDim);
    min3[0] = Infinity;
    min3[1] = Infinity;
    max3[0] = -Infinity;
    max3[1] = -Infinity;
    for (i2 = 0; i2 < n; i2++) {
      var x = cubicAt2(x0, x1, x2, x3, xDim[i2]);
      min3[0] = mathMin$2(x, min3[0]);
      max3[0] = mathMax$2(x, max3[0]);
    }
    n = cubicExtrema2(y0, y1, y2, y3, yDim);
    for (i2 = 0; i2 < n; i2++) {
      var y = cubicAt2(y0, y1, y2, y3, yDim[i2]);
      min3[1] = mathMin$2(y, min3[1]);
      max3[1] = mathMax$2(y, max3[1]);
    }
    min3[0] = mathMin$2(x0, min3[0]);
    max3[0] = mathMax$2(x0, max3[0]);
    min3[0] = mathMin$2(x3, min3[0]);
    max3[0] = mathMax$2(x3, max3[0]);
    min3[1] = mathMin$2(y0, min3[1]);
    max3[1] = mathMax$2(y0, max3[1]);
    min3[1] = mathMin$2(y3, min3[1]);
    max3[1] = mathMax$2(y3, max3[1]);
  }
  function fromQuadratic(x0, y0, x1, y1, x2, y2, min3, max3) {
    var quadraticExtremum2 = curve$3.quadraticExtremum;
    var quadraticAt2 = curve$3.quadraticAt;
    var tx = mathMax$2(mathMin$2(quadraticExtremum2(x0, x1, x2), 1), 0);
    var ty = mathMax$2(mathMin$2(quadraticExtremum2(y0, y1, y2), 1), 0);
    var x = quadraticAt2(x0, x1, x2, tx);
    var y = quadraticAt2(y0, y1, y2, ty);
    min3[0] = mathMin$2(x0, x2, x);
    min3[1] = mathMin$2(y0, y2, y);
    max3[0] = mathMax$2(x0, x2, x);
    max3[1] = mathMax$2(y0, y2, y);
  }
  function fromArc(x, y, rx, ry, startAngle, endAngle, anticlockwise, min3, max3) {
    var vec2Min2 = vec2$4.min;
    var vec2Max2 = vec2$4.max;
    var diff = Math.abs(startAngle - endAngle);
    if (diff % PI2$3 < 1e-4 && diff > 1e-4) {
      min3[0] = x - rx;
      min3[1] = y - ry;
      max3[0] = x + rx;
      max3[1] = y + ry;
      return;
    }
    start[0] = mathCos$2(startAngle) * rx + x;
    start[1] = mathSin$2(startAngle) * ry + y;
    end[0] = mathCos$2(endAngle) * rx + x;
    end[1] = mathSin$2(endAngle) * ry + y;
    vec2Min2(min3, start, end);
    vec2Max2(max3, start, end);
    startAngle = startAngle % PI2$3;
    if (startAngle < 0) {
      startAngle = startAngle + PI2$3;
    }
    endAngle = endAngle % PI2$3;
    if (endAngle < 0) {
      endAngle = endAngle + PI2$3;
    }
    if (startAngle > endAngle && !anticlockwise) {
      endAngle += PI2$3;
    } else if (startAngle < endAngle && anticlockwise) {
      startAngle += PI2$3;
    }
    if (anticlockwise) {
      var tmp = endAngle;
      endAngle = startAngle;
      startAngle = tmp;
    }
    for (var angle = 0; angle < endAngle; angle += Math.PI / 2) {
      if (angle > startAngle) {
        extremity[0] = mathCos$2(angle) * rx + x;
        extremity[1] = mathSin$2(angle) * ry + y;
        vec2Min2(min3, extremity, min3);
        vec2Max2(max3, extremity, max3);
      }
    }
  }
  bbox$2.fromPoints = fromPoints$1;
  bbox$2.fromLine = fromLine;
  bbox$2.fromCubic = fromCubic;
  bbox$2.fromQuadratic = fromQuadratic;
  bbox$2.fromArc = fromArc;
  var curve$2 = curve$4;
  var vec2$3 = vector$3;
  var bbox$1 = bbox$2;
  var BoundingRect$7 = BoundingRect_1;
  var _config = config;
  var dpr = _config.devicePixelRatio;
  var CMD$2 = {
    M: 1,
    L: 2,
    C: 3,
    Q: 4,
    A: 5,
    Z: 6,
    R: 7
  };
  var min = [];
  var max = [];
  var min2 = [];
  var max2 = [];
  var mathMin$1 = Math.min;
  var mathMax$1 = Math.max;
  var mathCos$1 = Math.cos;
  var mathSin$1 = Math.sin;
  var mathSqrt$2 = Math.sqrt;
  var mathAbs = Math.abs;
  var hasTypedArray = typeof Float32Array !== "undefined";
  var PathProxy$4 = function(notSaveData) {
    this._saveData = !(notSaveData || false);
    if (this._saveData) {
      this.data = [];
    }
    this._ctx = null;
  };
  PathProxy$4.prototype = {
    constructor: PathProxy$4,
    _xi: 0,
    _yi: 0,
    _x0: 0,
    _y0: 0,
    _ux: 0,
    _uy: 0,
    _len: 0,
    _lineDash: null,
    _dashOffset: 0,
    _dashIdx: 0,
    _dashSum: 0,
    setScale: function(sx, sy, segmentIgnoreThreshold) {
      segmentIgnoreThreshold = segmentIgnoreThreshold || 0;
      this._ux = mathAbs(segmentIgnoreThreshold / dpr / sx) || 0;
      this._uy = mathAbs(segmentIgnoreThreshold / dpr / sy) || 0;
    },
    getContext: function() {
      return this._ctx;
    },
    beginPath: function(ctx) {
      this._ctx = ctx;
      ctx && ctx.beginPath();
      ctx && (this.dpr = ctx.dpr);
      if (this._saveData) {
        this._len = 0;
      }
      if (this._lineDash) {
        this._lineDash = null;
        this._dashOffset = 0;
      }
      return this;
    },
    moveTo: function(x, y) {
      this.addData(CMD$2.M, x, y);
      this._ctx && this._ctx.moveTo(x, y);
      this._x0 = x;
      this._y0 = y;
      this._xi = x;
      this._yi = y;
      return this;
    },
    lineTo: function(x, y) {
      var exceedUnit = mathAbs(x - this._xi) > this._ux || mathAbs(y - this._yi) > this._uy || this._len < 5;
      this.addData(CMD$2.L, x, y);
      if (this._ctx && exceedUnit) {
        this._needsDash() ? this._dashedLineTo(x, y) : this._ctx.lineTo(x, y);
      }
      if (exceedUnit) {
        this._xi = x;
        this._yi = y;
      }
      return this;
    },
    bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
      this.addData(CMD$2.C, x1, y1, x2, y2, x3, y3);
      if (this._ctx) {
        this._needsDash() ? this._dashedBezierTo(x1, y1, x2, y2, x3, y3) : this._ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
      }
      this._xi = x3;
      this._yi = y3;
      return this;
    },
    quadraticCurveTo: function(x1, y1, x2, y2) {
      this.addData(CMD$2.Q, x1, y1, x2, y2);
      if (this._ctx) {
        this._needsDash() ? this._dashedQuadraticTo(x1, y1, x2, y2) : this._ctx.quadraticCurveTo(x1, y1, x2, y2);
      }
      this._xi = x2;
      this._yi = y2;
      return this;
    },
    arc: function(cx, cy, r, startAngle, endAngle, anticlockwise) {
      this.addData(CMD$2.A, cx, cy, r, r, startAngle, endAngle - startAngle, 0, anticlockwise ? 0 : 1);
      this._ctx && this._ctx.arc(cx, cy, r, startAngle, endAngle, anticlockwise);
      this._xi = mathCos$1(endAngle) * r + cx;
      this._yi = mathSin$1(endAngle) * r + cy;
      return this;
    },
    arcTo: function(x1, y1, x2, y2, radius) {
      if (this._ctx) {
        this._ctx.arcTo(x1, y1, x2, y2, radius);
      }
      return this;
    },
    rect: function(x, y, w, h) {
      this._ctx && this._ctx.rect(x, y, w, h);
      this.addData(CMD$2.R, x, y, w, h);
      return this;
    },
    closePath: function() {
      this.addData(CMD$2.Z);
      var ctx = this._ctx;
      var x0 = this._x0;
      var y0 = this._y0;
      if (ctx) {
        this._needsDash() && this._dashedLineTo(x0, y0);
        ctx.closePath();
      }
      this._xi = x0;
      this._yi = y0;
      return this;
    },
    fill: function(ctx) {
      ctx && ctx.fill();
      this.toStatic();
    },
    stroke: function(ctx) {
      ctx && ctx.stroke();
      this.toStatic();
    },
    setLineDash: function(lineDash) {
      if (lineDash instanceof Array) {
        this._lineDash = lineDash;
        this._dashIdx = 0;
        var lineDashSum = 0;
        for (var i2 = 0; i2 < lineDash.length; i2++) {
          lineDashSum += lineDash[i2];
        }
        this._dashSum = lineDashSum;
      }
      return this;
    },
    setLineDashOffset: function(offset) {
      this._dashOffset = offset;
      return this;
    },
    len: function() {
      return this._len;
    },
    setData: function(data) {
      var len2 = data.length;
      if (!(this.data && this.data.length === len2) && hasTypedArray) {
        this.data = new Float32Array(len2);
      }
      for (var i2 = 0; i2 < len2; i2++) {
        this.data[i2] = data[i2];
      }
      this._len = len2;
    },
    appendPath: function(path2) {
      if (!(path2 instanceof Array)) {
        path2 = [path2];
      }
      var len2 = path2.length;
      var appendSize = 0;
      var offset = this._len;
      for (var i2 = 0; i2 < len2; i2++) {
        appendSize += path2[i2].len();
      }
      if (hasTypedArray && this.data instanceof Float32Array) {
        this.data = new Float32Array(offset + appendSize);
      }
      for (var i2 = 0; i2 < len2; i2++) {
        var appendPathData = path2[i2].data;
        for (var k = 0; k < appendPathData.length; k++) {
          this.data[offset++] = appendPathData[k];
        }
      }
      this._len = offset;
    },
    addData: function(cmd) {
      if (!this._saveData) {
        return;
      }
      var data = this.data;
      if (this._len + arguments.length > data.length) {
        this._expandData();
        data = this.data;
      }
      for (var i2 = 0; i2 < arguments.length; i2++) {
        data[this._len++] = arguments[i2];
      }
      this._prevCmd = cmd;
    },
    _expandData: function() {
      if (!(this.data instanceof Array)) {
        var newData = [];
        for (var i2 = 0; i2 < this._len; i2++) {
          newData[i2] = this.data[i2];
        }
        this.data = newData;
      }
    },
    _needsDash: function() {
      return this._lineDash;
    },
    _dashedLineTo: function(x1, y1) {
      var dashSum = this._dashSum;
      var offset = this._dashOffset;
      var lineDash = this._lineDash;
      var ctx = this._ctx;
      var x0 = this._xi;
      var y0 = this._yi;
      var dx = x1 - x0;
      var dy = y1 - y0;
      var dist2 = mathSqrt$2(dx * dx + dy * dy);
      var x = x0;
      var y = y0;
      var dash;
      var nDash = lineDash.length;
      var idx;
      dx /= dist2;
      dy /= dist2;
      if (offset < 0) {
        offset = dashSum + offset;
      }
      offset %= dashSum;
      x -= offset * dx;
      y -= offset * dy;
      while (dx > 0 && x <= x1 || dx < 0 && x >= x1 || dx === 0 && (dy > 0 && y <= y1 || dy < 0 && y >= y1)) {
        idx = this._dashIdx;
        dash = lineDash[idx];
        x += dx * dash;
        y += dy * dash;
        this._dashIdx = (idx + 1) % nDash;
        if (dx > 0 && x < x0 || dx < 0 && x > x0 || dy > 0 && y < y0 || dy < 0 && y > y0) {
          continue;
        }
        ctx[idx % 2 ? "moveTo" : "lineTo"](dx >= 0 ? mathMin$1(x, x1) : mathMax$1(x, x1), dy >= 0 ? mathMin$1(y, y1) : mathMax$1(y, y1));
      }
      dx = x - x1;
      dy = y - y1;
      this._dashOffset = -mathSqrt$2(dx * dx + dy * dy);
    },
    _dashedBezierTo: function(x1, y1, x2, y2, x3, y3) {
      var dashSum = this._dashSum;
      var offset = this._dashOffset;
      var lineDash = this._lineDash;
      var ctx = this._ctx;
      var x0 = this._xi;
      var y0 = this._yi;
      var t;
      var dx;
      var dy;
      var cubicAt2 = curve$2.cubicAt;
      var bezierLen = 0;
      var idx = this._dashIdx;
      var nDash = lineDash.length;
      var x;
      var y;
      var tmpLen = 0;
      if (offset < 0) {
        offset = dashSum + offset;
      }
      offset %= dashSum;
      for (t = 0; t < 1; t += 0.1) {
        dx = cubicAt2(x0, x1, x2, x3, t + 0.1) - cubicAt2(x0, x1, x2, x3, t);
        dy = cubicAt2(y0, y1, y2, y3, t + 0.1) - cubicAt2(y0, y1, y2, y3, t);
        bezierLen += mathSqrt$2(dx * dx + dy * dy);
      }
      for (; idx < nDash; idx++) {
        tmpLen += lineDash[idx];
        if (tmpLen > offset) {
          break;
        }
      }
      t = (tmpLen - offset) / bezierLen;
      while (t <= 1) {
        x = cubicAt2(x0, x1, x2, x3, t);
        y = cubicAt2(y0, y1, y2, y3, t);
        idx % 2 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        t += lineDash[idx] / bezierLen;
        idx = (idx + 1) % nDash;
      }
      idx % 2 !== 0 && ctx.lineTo(x3, y3);
      dx = x3 - x;
      dy = y3 - y;
      this._dashOffset = -mathSqrt$2(dx * dx + dy * dy);
    },
    _dashedQuadraticTo: function(x1, y1, x2, y2) {
      var x3 = x2;
      var y3 = y2;
      x2 = (x2 + 2 * x1) / 3;
      y2 = (y2 + 2 * y1) / 3;
      x1 = (this._xi + 2 * x1) / 3;
      y1 = (this._yi + 2 * y1) / 3;
      this._dashedBezierTo(x1, y1, x2, y2, x3, y3);
    },
    toStatic: function() {
      var data = this.data;
      if (data instanceof Array) {
        data.length = this._len;
        if (hasTypedArray) {
          this.data = new Float32Array(data);
        }
      }
    },
    getBoundingRect: function() {
      min[0] = min[1] = min2[0] = min2[1] = Number.MAX_VALUE;
      max[0] = max[1] = max2[0] = max2[1] = -Number.MAX_VALUE;
      var data = this.data;
      var xi = 0;
      var yi = 0;
      var x0 = 0;
      var y0 = 0;
      for (var i2 = 0; i2 < data.length; ) {
        var cmd = data[i2++];
        if (i2 === 1) {
          xi = data[i2];
          yi = data[i2 + 1];
          x0 = xi;
          y0 = yi;
        }
        switch (cmd) {
          case CMD$2.M:
            x0 = data[i2++];
            y0 = data[i2++];
            xi = x0;
            yi = y0;
            min2[0] = x0;
            min2[1] = y0;
            max2[0] = x0;
            max2[1] = y0;
            break;
          case CMD$2.L:
            bbox$1.fromLine(xi, yi, data[i2], data[i2 + 1], min2, max2);
            xi = data[i2++];
            yi = data[i2++];
            break;
          case CMD$2.C:
            bbox$1.fromCubic(xi, yi, data[i2++], data[i2++], data[i2++], data[i2++], data[i2], data[i2 + 1], min2, max2);
            xi = data[i2++];
            yi = data[i2++];
            break;
          case CMD$2.Q:
            bbox$1.fromQuadratic(xi, yi, data[i2++], data[i2++], data[i2], data[i2 + 1], min2, max2);
            xi = data[i2++];
            yi = data[i2++];
            break;
          case CMD$2.A:
            var cx = data[i2++];
            var cy = data[i2++];
            var rx = data[i2++];
            var ry = data[i2++];
            var startAngle = data[i2++];
            var endAngle = data[i2++] + startAngle;
            i2 += 1;
            var anticlockwise = 1 - data[i2++];
            if (i2 === 1) {
              x0 = mathCos$1(startAngle) * rx + cx;
              y0 = mathSin$1(startAngle) * ry + cy;
            }
            bbox$1.fromArc(cx, cy, rx, ry, startAngle, endAngle, anticlockwise, min2, max2);
            xi = mathCos$1(endAngle) * rx + cx;
            yi = mathSin$1(endAngle) * ry + cy;
            break;
          case CMD$2.R:
            x0 = xi = data[i2++];
            y0 = yi = data[i2++];
            var width = data[i2++];
            var height = data[i2++];
            bbox$1.fromLine(x0, y0, x0 + width, y0 + height, min2, max2);
            break;
          case CMD$2.Z:
            xi = x0;
            yi = y0;
            break;
        }
        vec2$3.min(min, min, min2);
        vec2$3.max(max, max, max2);
      }
      if (i2 === 0) {
        min[0] = min[1] = max[0] = max[1] = 0;
      }
      return new BoundingRect$7(min[0], min[1], max[0] - min[0], max[1] - min[1]);
    },
    rebuildPath: function(ctx) {
      var d = this.data;
      var x0;
      var y0;
      var xi;
      var yi;
      var x;
      var y;
      var ux = this._ux;
      var uy = this._uy;
      var len2 = this._len;
      for (var i2 = 0; i2 < len2; ) {
        var cmd = d[i2++];
        if (i2 === 1) {
          xi = d[i2];
          yi = d[i2 + 1];
          x0 = xi;
          y0 = yi;
        }
        switch (cmd) {
          case CMD$2.M:
            x0 = xi = d[i2++];
            y0 = yi = d[i2++];
            ctx.moveTo(xi, yi);
            break;
          case CMD$2.L:
            x = d[i2++];
            y = d[i2++];
            if (mathAbs(x - xi) > ux || mathAbs(y - yi) > uy || i2 === len2 - 1) {
              ctx.lineTo(x, y);
              xi = x;
              yi = y;
            }
            break;
          case CMD$2.C:
            ctx.bezierCurveTo(d[i2++], d[i2++], d[i2++], d[i2++], d[i2++], d[i2++]);
            xi = d[i2 - 2];
            yi = d[i2 - 1];
            break;
          case CMD$2.Q:
            ctx.quadraticCurveTo(d[i2++], d[i2++], d[i2++], d[i2++]);
            xi = d[i2 - 2];
            yi = d[i2 - 1];
            break;
          case CMD$2.A:
            var cx = d[i2++];
            var cy = d[i2++];
            var rx = d[i2++];
            var ry = d[i2++];
            var theta = d[i2++];
            var dTheta = d[i2++];
            var psi = d[i2++];
            var fs = d[i2++];
            var r = rx > ry ? rx : ry;
            var scaleX = rx > ry ? 1 : rx / ry;
            var scaleY = rx > ry ? ry / rx : 1;
            var isEllipse = Math.abs(rx - ry) > 1e-3;
            var endAngle = theta + dTheta;
            if (isEllipse) {
              ctx.translate(cx, cy);
              ctx.rotate(psi);
              ctx.scale(scaleX, scaleY);
              ctx.arc(0, 0, r, theta, endAngle, 1 - fs);
              ctx.scale(1 / scaleX, 1 / scaleY);
              ctx.rotate(-psi);
              ctx.translate(-cx, -cy);
            } else {
              ctx.arc(cx, cy, r, theta, endAngle, 1 - fs);
            }
            if (i2 === 1) {
              x0 = mathCos$1(theta) * rx + cx;
              y0 = mathSin$1(theta) * ry + cy;
            }
            xi = mathCos$1(endAngle) * rx + cx;
            yi = mathSin$1(endAngle) * ry + cy;
            break;
          case CMD$2.R:
            x0 = xi = d[i2];
            y0 = yi = d[i2 + 1];
            ctx.rect(d[i2++], d[i2++], d[i2++], d[i2++]);
            break;
          case CMD$2.Z:
            ctx.closePath();
            xi = x0;
            yi = y0;
        }
      }
    }
  };
  PathProxy$4.CMD = CMD$2;
  var _default$1i = PathProxy$4;
  var PathProxy_1 = _default$1i;
  var path = {};
  var line$2 = {};
  function containStroke$4(x0, y0, x1, y1, lineWidth, x, y) {
    if (lineWidth === 0) {
      return false;
    }
    var _l = lineWidth;
    var _a = 0;
    var _b = x0;
    if (y > y0 + _l && y > y1 + _l || y < y0 - _l && y < y1 - _l || x > x0 + _l && x > x1 + _l || x < x0 - _l && x < x1 - _l) {
      return false;
    }
    if (x0 !== x1) {
      _a = (y0 - y1) / (x0 - x1);
      _b = (x0 * y1 - x1 * y0) / (x0 - x1);
    } else {
      return Math.abs(x - x0) <= _l / 2;
    }
    var tmp = _a * x - y + _b;
    var _s = tmp * tmp / (_a * _a + 1);
    return _s <= _l / 2 * _l / 2;
  }
  line$2.containStroke = containStroke$4;
  var cubic$1 = {};
  var curve$1 = curve$4;
  function containStroke$3(x0, y0, x1, y1, x2, y2, x3, y3, lineWidth, x, y) {
    if (lineWidth === 0) {
      return false;
    }
    var _l = lineWidth;
    if (y > y0 + _l && y > y1 + _l && y > y2 + _l && y > y3 + _l || y < y0 - _l && y < y1 - _l && y < y2 - _l && y < y3 - _l || x > x0 + _l && x > x1 + _l && x > x2 + _l && x > x3 + _l || x < x0 - _l && x < x1 - _l && x < x2 - _l && x < x3 - _l) {
      return false;
    }
    var d = curve$1.cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x, y, null);
    return d <= _l / 2;
  }
  cubic$1.containStroke = containStroke$3;
  var quadratic$1 = {};
  var _curve$1 = curve$4;
  var quadraticProjectPoint = _curve$1.quadraticProjectPoint;
  function containStroke$2(x0, y0, x1, y1, x2, y2, lineWidth, x, y) {
    if (lineWidth === 0) {
      return false;
    }
    var _l = lineWidth;
    if (y > y0 + _l && y > y1 + _l && y > y2 + _l || y < y0 - _l && y < y1 - _l && y < y2 - _l || x > x0 + _l && x > x1 + _l && x > x2 + _l || x < x0 - _l && x < x1 - _l && x < x2 - _l) {
      return false;
    }
    var d = quadraticProjectPoint(x0, y0, x1, y1, x2, y2, x, y, null);
    return d <= _l / 2;
  }
  quadratic$1.containStroke = containStroke$2;
  var arc$1 = {};
  var util = {};
  var PI2$2 = Math.PI * 2;
  function normalizeRadian$2(angle) {
    angle %= PI2$2;
    if (angle < 0) {
      angle += PI2$2;
    }
    return angle;
  }
  util.normalizeRadian = normalizeRadian$2;
  var _util$q = util;
  var normalizeRadian$1 = _util$q.normalizeRadian;
  var PI2$1 = Math.PI * 2;
  function containStroke$1(cx, cy, r, startAngle, endAngle, anticlockwise, lineWidth, x, y) {
    if (lineWidth === 0) {
      return false;
    }
    var _l = lineWidth;
    x -= cx;
    y -= cy;
    var d = Math.sqrt(x * x + y * y);
    if (d - _l > r || d + _l < r) {
      return false;
    }
    if (Math.abs(startAngle - endAngle) % PI2$1 < 1e-4) {
      return true;
    }
    if (anticlockwise) {
      var tmp = startAngle;
      startAngle = normalizeRadian$1(endAngle);
      endAngle = normalizeRadian$1(tmp);
    } else {
      startAngle = normalizeRadian$1(startAngle);
      endAngle = normalizeRadian$1(endAngle);
    }
    if (startAngle > endAngle) {
      endAngle += PI2$1;
    }
    var angle = Math.atan2(y, x);
    if (angle < 0) {
      angle += PI2$1;
    }
    return angle >= startAngle && angle <= endAngle || angle + PI2$1 >= startAngle && angle + PI2$1 <= endAngle;
  }
  arc$1.containStroke = containStroke$1;
  function windingLine$2(x0, y0, x1, y1, x, y) {
    if (y > y0 && y > y1 || y < y0 && y < y1) {
      return 0;
    }
    if (y1 === y0) {
      return 0;
    }
    var dir = y1 < y0 ? 1 : -1;
    var t = (y - y0) / (y1 - y0);
    if (t === 1 || t === 0) {
      dir = y1 < y0 ? 0.5 : -0.5;
    }
    var x_ = t * (x1 - x0) + x0;
    return x_ === x ? Infinity : x_ > x ? dir : 0;
  }
  var windingLine_1 = windingLine$2;
  var PathProxy$3 = PathProxy_1;
  var line = line$2;
  var cubic = cubic$1;
  var quadratic = quadratic$1;
  var arc = arc$1;
  var _util$p = util;
  var normalizeRadian = _util$p.normalizeRadian;
  var curve = curve$4;
  var windingLine$1 = windingLine_1;
  var CMD$1 = PathProxy$3.CMD;
  var PI2 = Math.PI * 2;
  var EPSILON$1 = 1e-4;
  function isAroundEqual$1(a, b) {
    return Math.abs(a - b) < EPSILON$1;
  }
  var roots = [-1, -1, -1];
  var extrema = [-1, -1];
  function swapExtrema() {
    var tmp = extrema[0];
    extrema[0] = extrema[1];
    extrema[1] = tmp;
  }
  function windingCubic(x0, y0, x1, y1, x2, y2, x3, y3, x, y) {
    if (y > y0 && y > y1 && y > y2 && y > y3 || y < y0 && y < y1 && y < y2 && y < y3) {
      return 0;
    }
    var nRoots = curve.cubicRootAt(y0, y1, y2, y3, y, roots);
    if (nRoots === 0) {
      return 0;
    } else {
      var w = 0;
      var nExtrema = -1;
      var y0_;
      var y1_;
      for (var i2 = 0; i2 < nRoots; i2++) {
        var t = roots[i2];
        var unit = t === 0 || t === 1 ? 0.5 : 1;
        var x_ = curve.cubicAt(x0, x1, x2, x3, t);
        if (x_ < x) {
          continue;
        }
        if (nExtrema < 0) {
          nExtrema = curve.cubicExtrema(y0, y1, y2, y3, extrema);
          if (extrema[1] < extrema[0] && nExtrema > 1) {
            swapExtrema();
          }
          y0_ = curve.cubicAt(y0, y1, y2, y3, extrema[0]);
          if (nExtrema > 1) {
            y1_ = curve.cubicAt(y0, y1, y2, y3, extrema[1]);
          }
        }
        if (nExtrema === 2) {
          if (t < extrema[0]) {
            w += y0_ < y0 ? unit : -unit;
          } else if (t < extrema[1]) {
            w += y1_ < y0_ ? unit : -unit;
          } else {
            w += y3 < y1_ ? unit : -unit;
          }
        } else {
          if (t < extrema[0]) {
            w += y0_ < y0 ? unit : -unit;
          } else {
            w += y3 < y0_ ? unit : -unit;
          }
        }
      }
      return w;
    }
  }
  function windingQuadratic(x0, y0, x1, y1, x2, y2, x, y) {
    if (y > y0 && y > y1 && y > y2 || y < y0 && y < y1 && y < y2) {
      return 0;
    }
    var nRoots = curve.quadraticRootAt(y0, y1, y2, y, roots);
    if (nRoots === 0) {
      return 0;
    } else {
      var t = curve.quadraticExtremum(y0, y1, y2);
      if (t >= 0 && t <= 1) {
        var w = 0;
        var y_ = curve.quadraticAt(y0, y1, y2, t);
        for (var i2 = 0; i2 < nRoots; i2++) {
          var unit = roots[i2] === 0 || roots[i2] === 1 ? 0.5 : 1;
          var x_ = curve.quadraticAt(x0, x1, x2, roots[i2]);
          if (x_ < x) {
            continue;
          }
          if (roots[i2] < t) {
            w += y_ < y0 ? unit : -unit;
          } else {
            w += y2 < y_ ? unit : -unit;
          }
        }
        return w;
      } else {
        var unit = roots[0] === 0 || roots[0] === 1 ? 0.5 : 1;
        var x_ = curve.quadraticAt(x0, x1, x2, roots[0]);
        if (x_ < x) {
          return 0;
        }
        return y2 < y0 ? unit : -unit;
      }
    }
  }
  function windingArc(cx, cy, r, startAngle, endAngle, anticlockwise, x, y) {
    y -= cy;
    if (y > r || y < -r) {
      return 0;
    }
    var tmp = Math.sqrt(r * r - y * y);
    roots[0] = -tmp;
    roots[1] = tmp;
    var diff = Math.abs(startAngle - endAngle);
    if (diff < 1e-4) {
      return 0;
    }
    if (diff % PI2 < 1e-4) {
      startAngle = 0;
      endAngle = PI2;
      var dir = anticlockwise ? 1 : -1;
      if (x >= roots[0] + cx && x <= roots[1] + cx) {
        return dir;
      } else {
        return 0;
      }
    }
    if (anticlockwise) {
      var tmp = startAngle;
      startAngle = normalizeRadian(endAngle);
      endAngle = normalizeRadian(tmp);
    } else {
      startAngle = normalizeRadian(startAngle);
      endAngle = normalizeRadian(endAngle);
    }
    if (startAngle > endAngle) {
      endAngle += PI2;
    }
    var w = 0;
    for (var i2 = 0; i2 < 2; i2++) {
      var x_ = roots[i2];
      if (x_ + cx > x) {
        var angle = Math.atan2(y, x_);
        var dir = anticlockwise ? 1 : -1;
        if (angle < 0) {
          angle = PI2 + angle;
        }
        if (angle >= startAngle && angle <= endAngle || angle + PI2 >= startAngle && angle + PI2 <= endAngle) {
          if (angle > Math.PI / 2 && angle < Math.PI * 1.5) {
            dir = -dir;
          }
          w += dir;
        }
      }
    }
    return w;
  }
  function containPath(data, lineWidth, isStroke, x, y) {
    var w = 0;
    var xi = 0;
    var yi = 0;
    var x0 = 0;
    var y0 = 0;
    for (var i2 = 0; i2 < data.length; ) {
      var cmd = data[i2++];
      if (cmd === CMD$1.M && i2 > 1) {
        if (!isStroke) {
          w += windingLine$1(xi, yi, x0, y0, x, y);
        }
      }
      if (i2 === 1) {
        xi = data[i2];
        yi = data[i2 + 1];
        x0 = xi;
        y0 = yi;
      }
      switch (cmd) {
        case CMD$1.M:
          x0 = data[i2++];
          y0 = data[i2++];
          xi = x0;
          yi = y0;
          break;
        case CMD$1.L:
          if (isStroke) {
            if (line.containStroke(xi, yi, data[i2], data[i2 + 1], lineWidth, x, y)) {
              return true;
            }
          } else {
            w += windingLine$1(xi, yi, data[i2], data[i2 + 1], x, y) || 0;
          }
          xi = data[i2++];
          yi = data[i2++];
          break;
        case CMD$1.C:
          if (isStroke) {
            if (cubic.containStroke(xi, yi, data[i2++], data[i2++], data[i2++], data[i2++], data[i2], data[i2 + 1], lineWidth, x, y)) {
              return true;
            }
          } else {
            w += windingCubic(xi, yi, data[i2++], data[i2++], data[i2++], data[i2++], data[i2], data[i2 + 1], x, y) || 0;
          }
          xi = data[i2++];
          yi = data[i2++];
          break;
        case CMD$1.Q:
          if (isStroke) {
            if (quadratic.containStroke(xi, yi, data[i2++], data[i2++], data[i2], data[i2 + 1], lineWidth, x, y)) {
              return true;
            }
          } else {
            w += windingQuadratic(xi, yi, data[i2++], data[i2++], data[i2], data[i2 + 1], x, y) || 0;
          }
          xi = data[i2++];
          yi = data[i2++];
          break;
        case CMD$1.A:
          var cx = data[i2++];
          var cy = data[i2++];
          var rx = data[i2++];
          var ry = data[i2++];
          var theta = data[i2++];
          var dTheta = data[i2++];
          i2 += 1;
          var anticlockwise = 1 - data[i2++];
          var x1 = Math.cos(theta) * rx + cx;
          var y1 = Math.sin(theta) * ry + cy;
          if (i2 > 1) {
            w += windingLine$1(xi, yi, x1, y1, x, y);
          } else {
            x0 = x1;
            y0 = y1;
          }
          var _x = (x - cx) * ry / rx + cx;
          if (isStroke) {
            if (arc.containStroke(cx, cy, ry, theta, theta + dTheta, anticlockwise, lineWidth, _x, y)) {
              return true;
            }
          } else {
            w += windingArc(cx, cy, ry, theta, theta + dTheta, anticlockwise, _x, y);
          }
          xi = Math.cos(theta + dTheta) * rx + cx;
          yi = Math.sin(theta + dTheta) * ry + cy;
          break;
        case CMD$1.R:
          x0 = xi = data[i2++];
          y0 = yi = data[i2++];
          var width = data[i2++];
          var height = data[i2++];
          var x1 = x0 + width;
          var y1 = y0 + height;
          if (isStroke) {
            if (line.containStroke(x0, y0, x1, y0, lineWidth, x, y) || line.containStroke(x1, y0, x1, y1, lineWidth, x, y) || line.containStroke(x1, y1, x0, y1, lineWidth, x, y) || line.containStroke(x0, y1, x0, y0, lineWidth, x, y)) {
              return true;
            }
          } else {
            w += windingLine$1(x1, y0, x1, y1, x, y);
            w += windingLine$1(x0, y1, x0, y0, x, y);
          }
          break;
        case CMD$1.Z:
          if (isStroke) {
            if (line.containStroke(xi, yi, x0, y0, lineWidth, x, y)) {
              return true;
            }
          } else {
            w += windingLine$1(xi, yi, x0, y0, x, y);
          }
          xi = x0;
          yi = y0;
          break;
      }
    }
    if (!isStroke && !isAroundEqual$1(yi, y0)) {
      w += windingLine$1(xi, yi, x0, y0, x, y) || 0;
    }
    return w !== 0;
  }
  function contain$1(pathData, x, y) {
    return containPath(pathData, 0, false, x, y);
  }
  function containStroke(pathData, lineWidth, x, y) {
    return containPath(pathData, lineWidth, true, x, y);
  }
  path.contain = contain$1;
  path.containStroke = containStroke;
  var Displayable$1 = Displayable_1;
  var zrUtil$U = util$6;
  var PathProxy$2 = PathProxy_1;
  var pathContain = path;
  var Pattern = Pattern_1;
  var getCanvasPattern = Pattern.prototype.getCanvasPattern;
  var abs = Math.abs;
  var pathProxyForDraw = new PathProxy$2(true);
  function Path$f(opts) {
    Displayable$1.call(this, opts);
    this.path = null;
  }
  Path$f.prototype = {
    constructor: Path$f,
    type: "path",
    __dirtyPath: true,
    strokeContainThreshold: 5,
    segmentIgnoreThreshold: 0,
    subPixelOptimize: false,
    brush: function(ctx, prevEl) {
      var style = this.style;
      var path2 = this.path || pathProxyForDraw;
      var hasStroke = style.hasStroke();
      var hasFill = style.hasFill();
      var fill = style.fill;
      var stroke = style.stroke;
      var hasFillGradient = hasFill && !!fill.colorStops;
      var hasStrokeGradient = hasStroke && !!stroke.colorStops;
      var hasFillPattern = hasFill && !!fill.image;
      var hasStrokePattern = hasStroke && !!stroke.image;
      style.bind(ctx, this, prevEl);
      this.setTransform(ctx);
      if (this.__dirty) {
        var rect;
        if (hasFillGradient) {
          rect = rect || this.getBoundingRect();
          this._fillGradient = style.getGradient(ctx, fill, rect);
        }
        if (hasStrokeGradient) {
          rect = rect || this.getBoundingRect();
          this._strokeGradient = style.getGradient(ctx, stroke, rect);
        }
      }
      if (hasFillGradient) {
        ctx.fillStyle = this._fillGradient;
      } else if (hasFillPattern) {
        ctx.fillStyle = getCanvasPattern.call(fill, ctx);
      }
      if (hasStrokeGradient) {
        ctx.strokeStyle = this._strokeGradient;
      } else if (hasStrokePattern) {
        ctx.strokeStyle = getCanvasPattern.call(stroke, ctx);
      }
      var lineDash = style.lineDash;
      var lineDashOffset = style.lineDashOffset;
      var ctxLineDash = !!ctx.setLineDash;
      var scale2 = this.getGlobalScale();
      path2.setScale(scale2[0], scale2[1], this.segmentIgnoreThreshold);
      if (this.__dirtyPath || lineDash && !ctxLineDash && hasStroke) {
        path2.beginPath(ctx);
        if (lineDash && !ctxLineDash) {
          path2.setLineDash(lineDash);
          path2.setLineDashOffset(lineDashOffset);
        }
        this.buildPath(path2, this.shape, false);
        if (this.path) {
          this.__dirtyPath = false;
        }
      } else {
        ctx.beginPath();
        this.path.rebuildPath(ctx);
      }
      if (hasFill) {
        if (style.fillOpacity != null) {
          var originalGlobalAlpha = ctx.globalAlpha;
          ctx.globalAlpha = style.fillOpacity * style.opacity;
          path2.fill(ctx);
          ctx.globalAlpha = originalGlobalAlpha;
        } else {
          path2.fill(ctx);
        }
      }
      if (lineDash && ctxLineDash) {
        ctx.setLineDash(lineDash);
        ctx.lineDashOffset = lineDashOffset;
      }
      if (hasStroke) {
        if (style.strokeOpacity != null) {
          var originalGlobalAlpha = ctx.globalAlpha;
          ctx.globalAlpha = style.strokeOpacity * style.opacity;
          path2.stroke(ctx);
          ctx.globalAlpha = originalGlobalAlpha;
        } else {
          path2.stroke(ctx);
        }
      }
      if (lineDash && ctxLineDash) {
        ctx.setLineDash([]);
      }
      if (style.text != null) {
        this.restoreTransform(ctx);
        this.drawRectText(ctx, this.getBoundingRect());
      }
    },
    buildPath: function(ctx, shapeCfg, inBundle) {
    },
    createPathProxy: function() {
      this.path = new PathProxy$2();
    },
    getBoundingRect: function() {
      var rect = this._rect;
      var style = this.style;
      var needsUpdateRect = !rect;
      if (needsUpdateRect) {
        var path2 = this.path;
        if (!path2) {
          path2 = this.path = new PathProxy$2();
        }
        if (this.__dirtyPath) {
          path2.beginPath();
          this.buildPath(path2, this.shape, false);
        }
        rect = path2.getBoundingRect();
      }
      this._rect = rect;
      if (style.hasStroke()) {
        var rectWithStroke = this._rectWithStroke || (this._rectWithStroke = rect.clone());
        if (this.__dirty || needsUpdateRect) {
          rectWithStroke.copy(rect);
          var w = style.lineWidth;
          var lineScale = style.strokeNoScale ? this.getLineScale() : 1;
          if (!style.hasFill()) {
            w = Math.max(w, this.strokeContainThreshold || 4);
          }
          if (lineScale > 1e-10) {
            rectWithStroke.width += w / lineScale;
            rectWithStroke.height += w / lineScale;
            rectWithStroke.x -= w / lineScale / 2;
            rectWithStroke.y -= w / lineScale / 2;
          }
        }
        return rectWithStroke;
      }
      return rect;
    },
    contain: function(x, y) {
      var localPos = this.transformCoordToLocal(x, y);
      var rect = this.getBoundingRect();
      var style = this.style;
      x = localPos[0];
      y = localPos[1];
      if (rect.contain(x, y)) {
        var pathData = this.path.data;
        if (style.hasStroke()) {
          var lineWidth = style.lineWidth;
          var lineScale = style.strokeNoScale ? this.getLineScale() : 1;
          if (lineScale > 1e-10) {
            if (!style.hasFill()) {
              lineWidth = Math.max(lineWidth, this.strokeContainThreshold);
            }
            if (pathContain.containStroke(pathData, lineWidth / lineScale, x, y)) {
              return true;
            }
          }
        }
        if (style.hasFill()) {
          return pathContain.contain(pathData, x, y);
        }
      }
      return false;
    },
    dirty: function(dirtyPath) {
      if (dirtyPath == null) {
        dirtyPath = true;
      }
      if (dirtyPath) {
        this.__dirtyPath = dirtyPath;
        this._rect = null;
      }
      this.__dirty = this.__dirtyText = true;
      this.__zr && this.__zr.refresh();
      if (this.__clipTarget) {
        this.__clipTarget.dirty();
      }
    },
    animateShape: function(loop) {
      return this.animate("shape", loop);
    },
    attrKV: function(key, value) {
      if (key === "shape") {
        this.setShape(value);
        this.__dirtyPath = true;
        this._rect = null;
      } else {
        Displayable$1.prototype.attrKV.call(this, key, value);
      }
    },
    setShape: function(key, value) {
      var shape = this.shape;
      if (shape) {
        if (zrUtil$U.isObject(key)) {
          for (var name in key) {
            if (key.hasOwnProperty(name)) {
              shape[name] = key[name];
            }
          }
        } else {
          shape[key] = value;
        }
        this.dirty(true);
      }
      return this;
    },
    getLineScale: function() {
      var m2 = this.transform;
      return m2 && abs(m2[0] - 1) > 1e-10 && abs(m2[3] - 1) > 1e-10 ? Math.sqrt(abs(m2[0] * m2[3] - m2[2] * m2[1])) : 1;
    }
  };
  Path$f.extend = function(defaults2) {
    var Sub = function(opts) {
      Path$f.call(this, opts);
      if (defaults2.style) {
        this.style.extendFrom(defaults2.style, false);
      }
      var defaultShape = defaults2.shape;
      if (defaultShape) {
        this.shape = this.shape || {};
        var thisShape = this.shape;
        for (var name2 in defaultShape) {
          if (!thisShape.hasOwnProperty(name2) && defaultShape.hasOwnProperty(name2)) {
            thisShape[name2] = defaultShape[name2];
          }
        }
      }
      defaults2.init && defaults2.init.call(this, opts);
    };
    zrUtil$U.inherits(Sub, Path$f);
    for (var name in defaults2) {
      if (name !== "style" && name !== "shape") {
        Sub.prototype[name] = defaults2[name];
      }
    }
    return Sub;
  };
  zrUtil$U.inherits(Path$f, Displayable$1);
  var _default$1h = Path$f;
  var Path_1 = _default$1h;
  var PathProxy$1 = PathProxy_1;
  var _vector$3 = vector$3;
  var v2ApplyTransform$1 = _vector$3.applyTransform;
  var CMD = PathProxy$1.CMD;
  var points$1 = [[], [], []];
  var mathSqrt$1 = Math.sqrt;
  var mathAtan2 = Math.atan2;
  function _default$1g(path2, m2) {
    var data = path2.data;
    var cmd;
    var nPoint;
    var i2;
    var j;
    var k;
    var p;
    var M = CMD.M;
    var C = CMD.C;
    var L = CMD.L;
    var R = CMD.R;
    var A = CMD.A;
    var Q = CMD.Q;
    for (i2 = 0, j = 0; i2 < data.length; ) {
      cmd = data[i2++];
      j = i2;
      nPoint = 0;
      switch (cmd) {
        case M:
          nPoint = 1;
          break;
        case L:
          nPoint = 1;
          break;
        case C:
          nPoint = 3;
          break;
        case Q:
          nPoint = 2;
          break;
        case A:
          var x = m2[4];
          var y = m2[5];
          var sx = mathSqrt$1(m2[0] * m2[0] + m2[1] * m2[1]);
          var sy = mathSqrt$1(m2[2] * m2[2] + m2[3] * m2[3]);
          var angle = mathAtan2(-m2[1] / sy, m2[0] / sx);
          data[i2] *= sx;
          data[i2++] += x;
          data[i2] *= sy;
          data[i2++] += y;
          data[i2++] *= sx;
          data[i2++] *= sy;
          data[i2++] += angle;
          data[i2++] += angle;
          i2 += 2;
          j = i2;
          break;
        case R:
          p[0] = data[i2++];
          p[1] = data[i2++];
          v2ApplyTransform$1(p, p, m2);
          data[j++] = p[0];
          data[j++] = p[1];
          p[0] += data[i2++];
          p[1] += data[i2++];
          v2ApplyTransform$1(p, p, m2);
          data[j++] = p[0];
          data[j++] = p[1];
      }
      for (k = 0; k < nPoint; k++) {
        var p = points$1[k];
        p[0] = data[i2++];
        p[1] = data[i2++];
        v2ApplyTransform$1(p, p, m2);
        data[j++] = p[0];
        data[j++] = p[1];
      }
    }
  }
  var transformPath$1 = _default$1g;
  var Path$e = Path_1;
  var PathProxy = PathProxy_1;
  var transformPath = transformPath$1;
  var mathSqrt = Math.sqrt;
  var mathSin = Math.sin;
  var mathCos = Math.cos;
  var PI$2 = Math.PI;
  var vMag = function(v2) {
    return Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
  };
  var vRatio = function(u, v2) {
    return (u[0] * v2[0] + u[1] * v2[1]) / (vMag(u) * vMag(v2));
  };
  var vAngle = function(u, v2) {
    return (u[0] * v2[1] < u[1] * v2[0] ? -1 : 1) * Math.acos(vRatio(u, v2));
  };
  function processArc(x1, y1, x2, y2, fa, fs, rx, ry, psiDeg, cmd, path2) {
    var psi = psiDeg * (PI$2 / 180);
    var xp = mathCos(psi) * (x1 - x2) / 2 + mathSin(psi) * (y1 - y2) / 2;
    var yp = -1 * mathSin(psi) * (x1 - x2) / 2 + mathCos(psi) * (y1 - y2) / 2;
    var lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);
    if (lambda > 1) {
      rx *= mathSqrt(lambda);
      ry *= mathSqrt(lambda);
    }
    var f = (fa === fs ? -1 : 1) * mathSqrt((rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) / (rx * rx * (yp * yp) + ry * ry * (xp * xp))) || 0;
    var cxp = f * rx * yp / ry;
    var cyp = f * -ry * xp / rx;
    var cx = (x1 + x2) / 2 + mathCos(psi) * cxp - mathSin(psi) * cyp;
    var cy = (y1 + y2) / 2 + mathSin(psi) * cxp + mathCos(psi) * cyp;
    var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
    var u = [(xp - cxp) / rx, (yp - cyp) / ry];
    var v2 = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
    var dTheta = vAngle(u, v2);
    if (vRatio(u, v2) <= -1) {
      dTheta = PI$2;
    }
    if (vRatio(u, v2) >= 1) {
      dTheta = 0;
    }
    if (fs === 0 && dTheta > 0) {
      dTheta = dTheta - 2 * PI$2;
    }
    if (fs === 1 && dTheta < 0) {
      dTheta = dTheta + 2 * PI$2;
    }
    path2.addData(cmd, cx, cy, rx, ry, theta, dTheta, psi, fs);
  }
  var commandReg = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig;
  var numberReg = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
  function createPathProxyFromString(data) {
    if (!data) {
      return new PathProxy();
    }
    var cpx = 0;
    var cpy = 0;
    var subpathX = cpx;
    var subpathY = cpy;
    var prevCmd;
    var path2 = new PathProxy();
    var CMD2 = PathProxy.CMD;
    var cmdList = data.match(commandReg);
    for (var l = 0; l < cmdList.length; l++) {
      var cmdText = cmdList[l];
      var cmdStr = cmdText.charAt(0);
      var cmd;
      var p = cmdText.match(numberReg) || [];
      var pLen = p.length;
      for (var i2 = 0; i2 < pLen; i2++) {
        p[i2] = parseFloat(p[i2]);
      }
      var off = 0;
      while (off < pLen) {
        var ctlPtx;
        var ctlPty;
        var rx;
        var ry;
        var psi;
        var fa;
        var fs;
        var x1 = cpx;
        var y1 = cpy;
        switch (cmdStr) {
          case "l":
            cpx += p[off++];
            cpy += p[off++];
            cmd = CMD2.L;
            path2.addData(cmd, cpx, cpy);
            break;
          case "L":
            cpx = p[off++];
            cpy = p[off++];
            cmd = CMD2.L;
            path2.addData(cmd, cpx, cpy);
            break;
          case "m":
            cpx += p[off++];
            cpy += p[off++];
            cmd = CMD2.M;
            path2.addData(cmd, cpx, cpy);
            subpathX = cpx;
            subpathY = cpy;
            cmdStr = "l";
            break;
          case "M":
            cpx = p[off++];
            cpy = p[off++];
            cmd = CMD2.M;
            path2.addData(cmd, cpx, cpy);
            subpathX = cpx;
            subpathY = cpy;
            cmdStr = "L";
            break;
          case "h":
            cpx += p[off++];
            cmd = CMD2.L;
            path2.addData(cmd, cpx, cpy);
            break;
          case "H":
            cpx = p[off++];
            cmd = CMD2.L;
            path2.addData(cmd, cpx, cpy);
            break;
          case "v":
            cpy += p[off++];
            cmd = CMD2.L;
            path2.addData(cmd, cpx, cpy);
            break;
          case "V":
            cpy = p[off++];
            cmd = CMD2.L;
            path2.addData(cmd, cpx, cpy);
            break;
          case "C":
            cmd = CMD2.C;
            path2.addData(cmd, p[off++], p[off++], p[off++], p[off++], p[off++], p[off++]);
            cpx = p[off - 2];
            cpy = p[off - 1];
            break;
          case "c":
            cmd = CMD2.C;
            path2.addData(cmd, p[off++] + cpx, p[off++] + cpy, p[off++] + cpx, p[off++] + cpy, p[off++] + cpx, p[off++] + cpy);
            cpx += p[off - 2];
            cpy += p[off - 1];
            break;
          case "S":
            ctlPtx = cpx;
            ctlPty = cpy;
            var len2 = path2.len();
            var pathData = path2.data;
            if (prevCmd === CMD2.C) {
              ctlPtx += cpx - pathData[len2 - 4];
              ctlPty += cpy - pathData[len2 - 3];
            }
            cmd = CMD2.C;
            x1 = p[off++];
            y1 = p[off++];
            cpx = p[off++];
            cpy = p[off++];
            path2.addData(cmd, ctlPtx, ctlPty, x1, y1, cpx, cpy);
            break;
          case "s":
            ctlPtx = cpx;
            ctlPty = cpy;
            var len2 = path2.len();
            var pathData = path2.data;
            if (prevCmd === CMD2.C) {
              ctlPtx += cpx - pathData[len2 - 4];
              ctlPty += cpy - pathData[len2 - 3];
            }
            cmd = CMD2.C;
            x1 = cpx + p[off++];
            y1 = cpy + p[off++];
            cpx += p[off++];
            cpy += p[off++];
            path2.addData(cmd, ctlPtx, ctlPty, x1, y1, cpx, cpy);
            break;
          case "Q":
            x1 = p[off++];
            y1 = p[off++];
            cpx = p[off++];
            cpy = p[off++];
            cmd = CMD2.Q;
            path2.addData(cmd, x1, y1, cpx, cpy);
            break;
          case "q":
            x1 = p[off++] + cpx;
            y1 = p[off++] + cpy;
            cpx += p[off++];
            cpy += p[off++];
            cmd = CMD2.Q;
            path2.addData(cmd, x1, y1, cpx, cpy);
            break;
          case "T":
            ctlPtx = cpx;
            ctlPty = cpy;
            var len2 = path2.len();
            var pathData = path2.data;
            if (prevCmd === CMD2.Q) {
              ctlPtx += cpx - pathData[len2 - 4];
              ctlPty += cpy - pathData[len2 - 3];
            }
            cpx = p[off++];
            cpy = p[off++];
            cmd = CMD2.Q;
            path2.addData(cmd, ctlPtx, ctlPty, cpx, cpy);
            break;
          case "t":
            ctlPtx = cpx;
            ctlPty = cpy;
            var len2 = path2.len();
            var pathData = path2.data;
            if (prevCmd === CMD2.Q) {
              ctlPtx += cpx - pathData[len2 - 4];
              ctlPty += cpy - pathData[len2 - 3];
            }
            cpx += p[off++];
            cpy += p[off++];
            cmd = CMD2.Q;
            path2.addData(cmd, ctlPtx, ctlPty, cpx, cpy);
            break;
          case "A":
            rx = p[off++];
            ry = p[off++];
            psi = p[off++];
            fa = p[off++];
            fs = p[off++];
            x1 = cpx, y1 = cpy;
            cpx = p[off++];
            cpy = p[off++];
            cmd = CMD2.A;
            processArc(x1, y1, cpx, cpy, fa, fs, rx, ry, psi, cmd, path2);
            break;
          case "a":
            rx = p[off++];
            ry = p[off++];
            psi = p[off++];
            fa = p[off++];
            fs = p[off++];
            x1 = cpx, y1 = cpy;
            cpx += p[off++];
            cpy += p[off++];
            cmd = CMD2.A;
            processArc(x1, y1, cpx, cpy, fa, fs, rx, ry, psi, cmd, path2);
            break;
        }
      }
      if (cmdStr === "z" || cmdStr === "Z") {
        cmd = CMD2.Z;
        path2.addData(cmd);
        cpx = subpathX;
        cpy = subpathY;
      }
      prevCmd = cmd;
    }
    path2.toStatic();
    return path2;
  }
  function createPathOptions(str, opts) {
    var pathProxy = createPathProxyFromString(str);
    opts = opts || {};
    opts.buildPath = function(path2) {
      if (path2.setData) {
        path2.setData(pathProxy.data);
        var ctx = path2.getContext();
        if (ctx) {
          path2.rebuildPath(ctx);
        }
      } else {
        var ctx = path2;
        pathProxy.rebuildPath(ctx);
      }
    };
    opts.applyTransform = function(m2) {
      transformPath(pathProxy, m2);
      this.dirty(true);
    };
    return opts;
  }
  function createFromString$1(str, opts) {
    return new Path$e(createPathOptions(str, opts));
  }
  function extendFromString(str, opts) {
    return Path$e.extend(createPathOptions(str, opts));
  }
  function mergePath$1(pathEls, opts) {
    var pathList = [];
    var len2 = pathEls.length;
    for (var i2 = 0; i2 < len2; i2++) {
      var pathEl = pathEls[i2];
      if (!pathEl.path) {
        pathEl.createPathProxy();
      }
      if (pathEl.__dirtyPath) {
        pathEl.buildPath(pathEl.path, pathEl.shape, true);
      }
      pathList.push(pathEl.path);
    }
    var pathBundle = new Path$e(opts);
    pathBundle.createPathProxy();
    pathBundle.buildPath = function(path2) {
      path2.appendPath(pathList);
      var ctx = path2.getContext();
      if (ctx) {
        path2.rebuildPath(ctx);
      }
    };
    return pathBundle;
  }
  path$1.createFromString = createFromString$1;
  path$1.extendFromString = extendFromString;
  path$1.mergePath = mergePath$1;
  var Displayable = Displayable_1;
  var zrUtil$T = util$6;
  var textContain$5 = text;
  var textHelper = text$1;
  var _constant = constant;
  var ContextCachedBy = _constant.ContextCachedBy;
  var Text$3 = function(opts) {
    Displayable.call(this, opts);
  };
  Text$3.prototype = {
    constructor: Text$3,
    type: "text",
    brush: function(ctx, prevEl) {
      var style = this.style;
      this.__dirty && textHelper.normalizeTextStyle(style, true);
      style.fill = style.stroke = style.shadowBlur = style.shadowColor = style.shadowOffsetX = style.shadowOffsetY = null;
      var text2 = style.text;
      text2 != null && (text2 += "");
      if (!textHelper.needDrawText(text2, style)) {
        ctx.__attrCachedBy = ContextCachedBy.NONE;
        return;
      }
      this.setTransform(ctx);
      textHelper.renderText(this, ctx, text2, style, null, prevEl);
      this.restoreTransform(ctx);
    },
    getBoundingRect: function() {
      var style = this.style;
      this.__dirty && textHelper.normalizeTextStyle(style, true);
      if (!this._rect) {
        style.text;
        var rect = textContain$5.getBoundingRect(style.text + "", style.font, style.textAlign, style.textVerticalAlign, style.textPadding, style.textLineHeight, style.rich);
        rect.x += style.x || 0;
        rect.y += style.y || 0;
        if (textHelper.getStroke(style.textStroke, style.textStrokeWidth)) {
          var w = style.textStrokeWidth;
          rect.x -= w / 2;
          rect.y -= w / 2;
          rect.width += w;
          rect.height += w;
        }
        this._rect = rect;
      }
      return this._rect;
    }
  };
  zrUtil$T.inherits(Text$3, Displayable);
  var _default$1f = Text$3;
  var Text_1 = _default$1f;
  var Path$d = Path_1;
  var _default$1e = Path$d.extend({
    type: "circle",
    shape: {
      cx: 0,
      cy: 0,
      r: 0
    },
    buildPath: function(ctx, shape, inBundle) {
      if (inBundle) {
        ctx.moveTo(shape.cx + shape.r, shape.cy);
      }
      ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2, true);
    }
  });
  var Circle$2 = _default$1e;
  var env$5 = env_1;
  var shadowTemp = [["shadowBlur", 0], ["shadowColor", "#000"], ["shadowOffsetX", 0], ["shadowOffsetY", 0]];
  function _default$1d(orignalBrush) {
    return env$5.browser.ie && env$5.browser.version >= 11 ? function() {
      var clipPaths = this.__clipPaths;
      var style = this.style;
      var modified;
      if (clipPaths) {
        for (var i2 = 0; i2 < clipPaths.length; i2++) {
          var clipPath = clipPaths[i2];
          var shape = clipPath && clipPath.shape;
          var type = clipPath && clipPath.type;
          if (shape && (type === "sector" && shape.startAngle === shape.endAngle || type === "rect" && (!shape.width || !shape.height))) {
            for (var j = 0; j < shadowTemp.length; j++) {
              shadowTemp[j][2] = style[shadowTemp[j][0]];
              style[shadowTemp[j][0]] = shadowTemp[j][1];
            }
            modified = true;
            break;
          }
        }
      }
      orignalBrush.apply(this, arguments);
      if (modified) {
        for (var j = 0; j < shadowTemp.length; j++) {
          style[shadowTemp[j][0]] = shadowTemp[j][2];
        }
      }
    } : orignalBrush;
  }
  var fixClipWithShadow$2 = _default$1d;
  var Path$c = Path_1;
  var fixClipWithShadow$1 = fixClipWithShadow$2;
  var _default$1c = Path$c.extend({
    type: "sector",
    shape: {
      cx: 0,
      cy: 0,
      r0: 0,
      r: 0,
      startAngle: 0,
      endAngle: Math.PI * 2,
      clockwise: true
    },
    brush: fixClipWithShadow$1(Path$c.prototype.brush),
    buildPath: function(ctx, shape) {
      var x = shape.cx;
      var y = shape.cy;
      var r0 = Math.max(shape.r0 || 0, 0);
      var r = Math.max(shape.r, 0);
      var startAngle = shape.startAngle;
      var endAngle = shape.endAngle;
      var clockwise = shape.clockwise;
      var unitX = Math.cos(startAngle);
      var unitY = Math.sin(startAngle);
      ctx.moveTo(unitX * r0 + x, unitY * r0 + y);
      ctx.lineTo(unitX * r + x, unitY * r + y);
      ctx.arc(x, y, r, startAngle, endAngle, !clockwise);
      ctx.lineTo(Math.cos(endAngle) * r0 + x, Math.sin(endAngle) * r0 + y);
      if (r0 !== 0) {
        ctx.arc(x, y, r0, endAngle, startAngle, clockwise);
      }
      ctx.closePath();
    }
  });
  var Sector$1 = _default$1c;
  var Path$b = Path_1;
  var _default$1b = Path$b.extend({
    type: "ring",
    shape: {
      cx: 0,
      cy: 0,
      r: 0,
      r0: 0
    },
    buildPath: function(ctx, shape) {
      var x = shape.cx;
      var y = shape.cy;
      var PI22 = Math.PI * 2;
      ctx.moveTo(x + shape.r, y);
      ctx.arc(x, y, shape.r, 0, PI22, false);
      ctx.moveTo(x + shape.r0, y);
      ctx.arc(x, y, shape.r0, 0, PI22, true);
    }
  });
  var Ring$1 = _default$1b;
  var poly$1 = {};
  var _vector$2 = vector$3;
  var v2Distance$1 = _vector$2.distance;
  function interpolate(p0, p1, p2, p3, t, t2, t3) {
    var v0 = (p2 - p0) * 0.5;
    var v1 = (p3 - p1) * 0.5;
    return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
  }
  function _default$1a(points2, isLoop) {
    var len2 = points2.length;
    var ret = [];
    var distance2 = 0;
    for (var i2 = 1; i2 < len2; i2++) {
      distance2 += v2Distance$1(points2[i2 - 1], points2[i2]);
    }
    var segs = distance2 / 2;
    segs = segs < len2 ? len2 : segs;
    for (var i2 = 0; i2 < segs; i2++) {
      var pos = i2 / (segs - 1) * (isLoop ? len2 : len2 - 1);
      var idx = Math.floor(pos);
      var w = pos - idx;
      var p0;
      var p1 = points2[idx % len2];
      var p2;
      var p3;
      if (!isLoop) {
        p0 = points2[idx === 0 ? idx : idx - 1];
        p2 = points2[idx > len2 - 2 ? len2 - 1 : idx + 1];
        p3 = points2[idx > len2 - 3 ? len2 - 1 : idx + 2];
      } else {
        p0 = points2[(idx - 1 + len2) % len2];
        p2 = points2[(idx + 1) % len2];
        p3 = points2[(idx + 2) % len2];
      }
      var w2 = w * w;
      var w3 = w * w2;
      ret.push([interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3), interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)]);
    }
    return ret;
  }
  var smoothSpline$1 = _default$1a;
  var _vector$1 = vector$3;
  var v2Min = _vector$1.min;
  var v2Max = _vector$1.max;
  var v2Scale = _vector$1.scale;
  var v2Distance = _vector$1.distance;
  var v2Add = _vector$1.add;
  var v2Clone = _vector$1.clone;
  var v2Sub = _vector$1.sub;
  function _default$19(points2, smooth, isLoop, constraint) {
    var cps = [];
    var v2 = [];
    var v1 = [];
    var v22 = [];
    var prevPoint;
    var nextPoint;
    var min3;
    var max3;
    if (constraint) {
      min3 = [Infinity, Infinity];
      max3 = [-Infinity, -Infinity];
      for (var i2 = 0, len2 = points2.length; i2 < len2; i2++) {
        v2Min(min3, min3, points2[i2]);
        v2Max(max3, max3, points2[i2]);
      }
      v2Min(min3, min3, constraint[0]);
      v2Max(max3, max3, constraint[1]);
    }
    for (var i2 = 0, len2 = points2.length; i2 < len2; i2++) {
      var point = points2[i2];
      if (isLoop) {
        prevPoint = points2[i2 ? i2 - 1 : len2 - 1];
        nextPoint = points2[(i2 + 1) % len2];
      } else {
        if (i2 === 0 || i2 === len2 - 1) {
          cps.push(v2Clone(points2[i2]));
          continue;
        } else {
          prevPoint = points2[i2 - 1];
          nextPoint = points2[i2 + 1];
        }
      }
      v2Sub(v2, nextPoint, prevPoint);
      v2Scale(v2, v2, smooth);
      var d0 = v2Distance(point, prevPoint);
      var d1 = v2Distance(point, nextPoint);
      var sum = d0 + d1;
      if (sum !== 0) {
        d0 /= sum;
        d1 /= sum;
      }
      v2Scale(v1, v2, -d0);
      v2Scale(v22, v2, d1);
      var cp02 = v2Add([], point, v1);
      var cp12 = v2Add([], point, v22);
      if (constraint) {
        v2Max(cp02, cp02, min3);
        v2Min(cp02, cp02, max3);
        v2Max(cp12, cp12, min3);
        v2Min(cp12, cp12, max3);
      }
      cps.push(cp02);
      cps.push(cp12);
    }
    if (isLoop) {
      cps.push(cps.shift());
    }
    return cps;
  }
  var smoothBezier$1 = _default$19;
  var smoothSpline = smoothSpline$1;
  var smoothBezier = smoothBezier$1;
  function buildPath(ctx, shape, closePath) {
    var points2 = shape.points;
    var smooth = shape.smooth;
    if (points2 && points2.length >= 2) {
      if (smooth && smooth !== "spline") {
        var controlPoints = smoothBezier(points2, smooth, closePath, shape.smoothConstraint);
        ctx.moveTo(points2[0][0], points2[0][1]);
        var len2 = points2.length;
        for (var i2 = 0; i2 < (closePath ? len2 : len2 - 1); i2++) {
          var cp12 = controlPoints[i2 * 2];
          var cp2 = controlPoints[i2 * 2 + 1];
          var p = points2[(i2 + 1) % len2];
          ctx.bezierCurveTo(cp12[0], cp12[1], cp2[0], cp2[1], p[0], p[1]);
        }
      } else {
        if (smooth === "spline") {
          points2 = smoothSpline(points2, closePath);
        }
        ctx.moveTo(points2[0][0], points2[0][1]);
        for (var i2 = 1, l = points2.length; i2 < l; i2++) {
          ctx.lineTo(points2[i2][0], points2[i2][1]);
        }
      }
      closePath && ctx.closePath();
    }
  }
  poly$1.buildPath = buildPath;
  var Path$a = Path_1;
  var polyHelper$1 = poly$1;
  var _default$18 = Path$a.extend({
    type: "polygon",
    shape: {
      points: null,
      smooth: false,
      smoothConstraint: null
    },
    buildPath: function(ctx, shape) {
      polyHelper$1.buildPath(ctx, shape, true);
    }
  });
  var Polygon$4 = _default$18;
  var Path$9 = Path_1;
  var polyHelper = poly$1;
  var _default$17 = Path$9.extend({
    type: "polyline",
    shape: {
      points: null,
      smooth: false,
      smoothConstraint: null
    },
    style: {
      stroke: "#000",
      fill: null
    },
    buildPath: function(ctx, shape) {
      polyHelper.buildPath(ctx, shape, false);
    }
  });
  var Polyline$4 = _default$17;
  var subPixelOptimize$2 = {};
  var round$3 = Math.round;
  function subPixelOptimizeLine$2(outputShape, inputShape, style) {
    if (!inputShape) {
      return;
    }
    var x1 = inputShape.x1;
    var x2 = inputShape.x2;
    var y1 = inputShape.y1;
    var y2 = inputShape.y2;
    outputShape.x1 = x1;
    outputShape.x2 = x2;
    outputShape.y1 = y1;
    outputShape.y2 = y2;
    var lineWidth = style && style.lineWidth;
    if (!lineWidth) {
      return;
    }
    if (round$3(x1 * 2) === round$3(x2 * 2)) {
      outputShape.x1 = outputShape.x2 = subPixelOptimize$1(x1, lineWidth, true);
    }
    if (round$3(y1 * 2) === round$3(y2 * 2)) {
      outputShape.y1 = outputShape.y2 = subPixelOptimize$1(y1, lineWidth, true);
    }
  }
  function subPixelOptimizeRect$2(outputShape, inputShape, style) {
    if (!inputShape) {
      return;
    }
    var originX = inputShape.x;
    var originY = inputShape.y;
    var originWidth = inputShape.width;
    var originHeight = inputShape.height;
    outputShape.x = originX;
    outputShape.y = originY;
    outputShape.width = originWidth;
    outputShape.height = originHeight;
    var lineWidth = style && style.lineWidth;
    if (!lineWidth) {
      return;
    }
    outputShape.x = subPixelOptimize$1(originX, lineWidth, true);
    outputShape.y = subPixelOptimize$1(originY, lineWidth, true);
    outputShape.width = Math.max(subPixelOptimize$1(originX + originWidth, lineWidth, false) - outputShape.x, originWidth === 0 ? 0 : 1);
    outputShape.height = Math.max(subPixelOptimize$1(originY + originHeight, lineWidth, false) - outputShape.y, originHeight === 0 ? 0 : 1);
  }
  function subPixelOptimize$1(position, lineWidth, positiveOrNegative) {
    if (!lineWidth) {
      return position;
    }
    var doubledPosition = round$3(position * 2);
    return (doubledPosition + round$3(lineWidth)) % 2 === 0 ? doubledPosition / 2 : (doubledPosition + (positiveOrNegative ? 1 : -1)) / 2;
  }
  subPixelOptimize$2.subPixelOptimizeLine = subPixelOptimizeLine$2;
  subPixelOptimize$2.subPixelOptimizeRect = subPixelOptimizeRect$2;
  subPixelOptimize$2.subPixelOptimize = subPixelOptimize$1;
  var Path$8 = Path_1;
  var roundRectHelper = roundRect;
  var _subPixelOptimize$1 = subPixelOptimize$2;
  var subPixelOptimizeRect$1 = _subPixelOptimize$1.subPixelOptimizeRect;
  var subPixelOptimizeOutputShape$1 = {};
  var _default$16 = Path$8.extend({
    type: "rect",
    shape: {
      r: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    buildPath: function(ctx, shape) {
      var x;
      var y;
      var width;
      var height;
      if (this.subPixelOptimize) {
        subPixelOptimizeRect$1(subPixelOptimizeOutputShape$1, shape, this.style);
        x = subPixelOptimizeOutputShape$1.x;
        y = subPixelOptimizeOutputShape$1.y;
        width = subPixelOptimizeOutputShape$1.width;
        height = subPixelOptimizeOutputShape$1.height;
        subPixelOptimizeOutputShape$1.r = shape.r;
        shape = subPixelOptimizeOutputShape$1;
      } else {
        x = shape.x;
        y = shape.y;
        width = shape.width;
        height = shape.height;
      }
      if (!shape.r) {
        ctx.rect(x, y, width, height);
      } else {
        roundRectHelper.buildPath(ctx, shape);
      }
      ctx.closePath();
      return;
    }
  });
  var Rect$2 = _default$16;
  var Path$7 = Path_1;
  var _subPixelOptimize = subPixelOptimize$2;
  var subPixelOptimizeLine$1 = _subPixelOptimize.subPixelOptimizeLine;
  var subPixelOptimizeOutputShape = {};
  var _default$15 = Path$7.extend({
    type: "line",
    shape: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      percent: 1
    },
    style: {
      stroke: "#000",
      fill: null
    },
    buildPath: function(ctx, shape) {
      var x1;
      var y1;
      var x2;
      var y2;
      if (this.subPixelOptimize) {
        subPixelOptimizeLine$1(subPixelOptimizeOutputShape, shape, this.style);
        x1 = subPixelOptimizeOutputShape.x1;
        y1 = subPixelOptimizeOutputShape.y1;
        x2 = subPixelOptimizeOutputShape.x2;
        y2 = subPixelOptimizeOutputShape.y2;
      } else {
        x1 = shape.x1;
        y1 = shape.y1;
        x2 = shape.x2;
        y2 = shape.y2;
      }
      var percent = shape.percent;
      if (percent === 0) {
        return;
      }
      ctx.moveTo(x1, y1);
      if (percent < 1) {
        x2 = x1 * (1 - percent) + x2 * percent;
        y2 = y1 * (1 - percent) + y2 * percent;
      }
      ctx.lineTo(x2, y2);
    },
    pointAt: function(p) {
      var shape = this.shape;
      return [shape.x1 * (1 - p) + shape.x2 * p, shape.y1 * (1 - p) + shape.y2 * p];
    }
  });
  var Line$2 = _default$15;
  var Path$6 = Path_1;
  var vec2$2 = vector$3;
  var _curve = curve$4;
  var quadraticSubdivide = _curve.quadraticSubdivide;
  var cubicSubdivide = _curve.cubicSubdivide;
  var quadraticAt = _curve.quadraticAt;
  var cubicAt = _curve.cubicAt;
  var quadraticDerivativeAt = _curve.quadraticDerivativeAt;
  var cubicDerivativeAt = _curve.cubicDerivativeAt;
  var out = [];
  function someVectorAt(shape, t, isTangent) {
    var cpx2 = shape.cpx2;
    var cpy2 = shape.cpy2;
    if (cpx2 === null || cpy2 === null) {
      return [(isTangent ? cubicDerivativeAt : cubicAt)(shape.x1, shape.cpx1, shape.cpx2, shape.x2, t), (isTangent ? cubicDerivativeAt : cubicAt)(shape.y1, shape.cpy1, shape.cpy2, shape.y2, t)];
    } else {
      return [(isTangent ? quadraticDerivativeAt : quadraticAt)(shape.x1, shape.cpx1, shape.x2, t), (isTangent ? quadraticDerivativeAt : quadraticAt)(shape.y1, shape.cpy1, shape.y2, t)];
    }
  }
  var _default$14 = Path$6.extend({
    type: "bezier-curve",
    shape: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      cpx1: 0,
      cpy1: 0,
      percent: 1
    },
    style: {
      stroke: "#000",
      fill: null
    },
    buildPath: function(ctx, shape) {
      var x1 = shape.x1;
      var y1 = shape.y1;
      var x2 = shape.x2;
      var y2 = shape.y2;
      var cpx1 = shape.cpx1;
      var cpy1 = shape.cpy1;
      var cpx2 = shape.cpx2;
      var cpy2 = shape.cpy2;
      var percent = shape.percent;
      if (percent === 0) {
        return;
      }
      ctx.moveTo(x1, y1);
      if (cpx2 == null || cpy2 == null) {
        if (percent < 1) {
          quadraticSubdivide(x1, cpx1, x2, percent, out);
          cpx1 = out[1];
          x2 = out[2];
          quadraticSubdivide(y1, cpy1, y2, percent, out);
          cpy1 = out[1];
          y2 = out[2];
        }
        ctx.quadraticCurveTo(cpx1, cpy1, x2, y2);
      } else {
        if (percent < 1) {
          cubicSubdivide(x1, cpx1, cpx2, x2, percent, out);
          cpx1 = out[1];
          cpx2 = out[2];
          x2 = out[3];
          cubicSubdivide(y1, cpy1, cpy2, y2, percent, out);
          cpy1 = out[1];
          cpy2 = out[2];
          y2 = out[3];
        }
        ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x2, y2);
      }
    },
    pointAt: function(t) {
      return someVectorAt(this.shape, t, false);
    },
    tangentAt: function(t) {
      var p = someVectorAt(this.shape, t, true);
      return vec2$2.normalize(p, p);
    }
  });
  var BezierCurve$1 = _default$14;
  var Path$5 = Path_1;
  var _default$13 = Path$5.extend({
    type: "arc",
    shape: {
      cx: 0,
      cy: 0,
      r: 0,
      startAngle: 0,
      endAngle: Math.PI * 2,
      clockwise: true
    },
    style: {
      stroke: "#000",
      fill: null
    },
    buildPath: function(ctx, shape) {
      var x = shape.cx;
      var y = shape.cy;
      var r = Math.max(shape.r, 0);
      var startAngle = shape.startAngle;
      var endAngle = shape.endAngle;
      var clockwise = shape.clockwise;
      var unitX = Math.cos(startAngle);
      var unitY = Math.sin(startAngle);
      ctx.moveTo(unitX * r + x, unitY * r + y);
      ctx.arc(x, y, r, startAngle, endAngle, !clockwise);
    }
  });
  var Arc$1 = _default$13;
  var Path$4 = Path_1;
  var _default$12 = Path$4.extend({
    type: "compound",
    shape: {
      paths: null
    },
    _updatePathDirty: function() {
      var dirtyPath = this.__dirtyPath;
      var paths = this.shape.paths;
      for (var i2 = 0; i2 < paths.length; i2++) {
        dirtyPath = dirtyPath || paths[i2].__dirtyPath;
      }
      this.__dirtyPath = dirtyPath;
      this.__dirty = this.__dirty || dirtyPath;
    },
    beforeBrush: function() {
      this._updatePathDirty();
      var paths = this.shape.paths || [];
      var scale2 = this.getGlobalScale();
      for (var i2 = 0; i2 < paths.length; i2++) {
        if (!paths[i2].path) {
          paths[i2].createPathProxy();
        }
        paths[i2].path.setScale(scale2[0], scale2[1], paths[i2].segmentIgnoreThreshold);
      }
    },
    buildPath: function(ctx, shape) {
      var paths = shape.paths || [];
      for (var i2 = 0; i2 < paths.length; i2++) {
        paths[i2].buildPath(ctx, paths[i2].shape, true);
      }
    },
    afterBrush: function() {
      var paths = this.shape.paths || [];
      for (var i2 = 0; i2 < paths.length; i2++) {
        paths[i2].__dirtyPath = false;
      }
    },
    getBoundingRect: function() {
      this._updatePathDirty();
      return Path$4.prototype.getBoundingRect.call(this);
    }
  });
  var CompoundPath$1 = _default$12;
  var Gradient$3 = function(colorStops) {
    this.colorStops = colorStops || [];
  };
  Gradient$3.prototype = {
    constructor: Gradient$3,
    addColorStop: function(offset, color2) {
      this.colorStops.push({
        offset,
        color: color2
      });
    }
  };
  var _default$11 = Gradient$3;
  var Gradient_1 = _default$11;
  var zrUtil$S = util$6;
  var Gradient$2 = Gradient_1;
  var LinearGradient$2 = function(x, y, x2, y2, colorStops, globalCoord) {
    this.x = x == null ? 0 : x;
    this.y = y == null ? 0 : y;
    this.x2 = x2 == null ? 1 : x2;
    this.y2 = y2 == null ? 0 : y2;
    this.type = "linear";
    this.global = globalCoord || false;
    Gradient$2.call(this, colorStops);
  };
  LinearGradient$2.prototype = {
    constructor: LinearGradient$2
  };
  zrUtil$S.inherits(LinearGradient$2, Gradient$2);
  var _default$10 = LinearGradient$2;
  var LinearGradient_1 = _default$10;
  var zrUtil$R = util$6;
  var Gradient$1 = Gradient_1;
  var RadialGradient$1 = function(x, y, r, colorStops, globalCoord) {
    this.x = x == null ? 0.5 : x;
    this.y = y == null ? 0.5 : y;
    this.r = r == null ? 0.5 : r;
    this.type = "radial";
    this.global = globalCoord || false;
    Gradient$1.call(this, colorStops);
  };
  RadialGradient$1.prototype = {
    constructor: RadialGradient$1
  };
  zrUtil$R.inherits(RadialGradient$1, Gradient$1);
  var _default$$ = RadialGradient$1;
  var RadialGradient_1 = _default$$;
  var _util$o = util$6;
  var inherits = _util$o.inherits;
  var Displayble = Displayable_1;
  var BoundingRect$6 = BoundingRect_1;
  function IncrementalDisplayble(opts) {
    Displayble.call(this, opts);
    this._displayables = [];
    this._temporaryDisplayables = [];
    this._cursor = 0;
    this.notClear = true;
  }
  IncrementalDisplayble.prototype.incremental = true;
  IncrementalDisplayble.prototype.clearDisplaybles = function() {
    this._displayables = [];
    this._temporaryDisplayables = [];
    this._cursor = 0;
    this.dirty();
    this.notClear = false;
  };
  IncrementalDisplayble.prototype.addDisplayable = function(displayable, notPersistent) {
    if (notPersistent) {
      this._temporaryDisplayables.push(displayable);
    } else {
      this._displayables.push(displayable);
    }
    this.dirty();
  };
  IncrementalDisplayble.prototype.addDisplayables = function(displayables, notPersistent) {
    notPersistent = notPersistent || false;
    for (var i2 = 0; i2 < displayables.length; i2++) {
      this.addDisplayable(displayables[i2], notPersistent);
    }
  };
  IncrementalDisplayble.prototype.eachPendingDisplayable = function(cb) {
    for (var i2 = this._cursor; i2 < this._displayables.length; i2++) {
      cb && cb(this._displayables[i2]);
    }
    for (var i2 = 0; i2 < this._temporaryDisplayables.length; i2++) {
      cb && cb(this._temporaryDisplayables[i2]);
    }
  };
  IncrementalDisplayble.prototype.update = function() {
    this.updateTransform();
    for (var i2 = this._cursor; i2 < this._displayables.length; i2++) {
      var displayable = this._displayables[i2];
      displayable.parent = this;
      displayable.update();
      displayable.parent = null;
    }
    for (var i2 = 0; i2 < this._temporaryDisplayables.length; i2++) {
      var displayable = this._temporaryDisplayables[i2];
      displayable.parent = this;
      displayable.update();
      displayable.parent = null;
    }
  };
  IncrementalDisplayble.prototype.brush = function(ctx, prevEl) {
    for (var i2 = this._cursor; i2 < this._displayables.length; i2++) {
      var displayable = this._displayables[i2];
      displayable.beforeBrush && displayable.beforeBrush(ctx);
      displayable.brush(ctx, i2 === this._cursor ? null : this._displayables[i2 - 1]);
      displayable.afterBrush && displayable.afterBrush(ctx);
    }
    this._cursor = i2;
    for (var i2 = 0; i2 < this._temporaryDisplayables.length; i2++) {
      var displayable = this._temporaryDisplayables[i2];
      displayable.beforeBrush && displayable.beforeBrush(ctx);
      displayable.brush(ctx, i2 === 0 ? null : this._temporaryDisplayables[i2 - 1]);
      displayable.afterBrush && displayable.afterBrush(ctx);
    }
    this._temporaryDisplayables = [];
    this.notClear = true;
  };
  var m = [];
  IncrementalDisplayble.prototype.getBoundingRect = function() {
    if (!this._rect) {
      var rect = new BoundingRect$6(Infinity, Infinity, -Infinity, -Infinity);
      for (var i2 = 0; i2 < this._displayables.length; i2++) {
        var displayable = this._displayables[i2];
        var childRect = displayable.getBoundingRect().clone();
        if (displayable.needLocalTransform()) {
          childRect.applyTransform(displayable.getLocalTransform(m));
        }
        rect.union(childRect);
      }
      this._rect = rect;
    }
    return this._rect;
  };
  IncrementalDisplayble.prototype.contain = function(x, y) {
    var localPos = this.transformCoordToLocal(x, y);
    var rect = this.getBoundingRect();
    if (rect.contain(localPos[0], localPos[1])) {
      for (var i2 = 0; i2 < this._displayables.length; i2++) {
        var displayable = this._displayables[i2];
        if (displayable.contain(x, y)) {
          return true;
        }
      }
    }
    return false;
  };
  inherits(IncrementalDisplayble, Displayble);
  var _default$_ = IncrementalDisplayble;
  var IncrementalDisplayable$1 = _default$_;
  var zrUtil$Q = util$6;
  var pathTool = path$1;
  var colorTool$1 = color$1;
  var matrix$3 = matrix$6;
  var vector$1 = vector$3;
  var Path$3 = Path_1;
  var Transformable = Transformable_1;
  var ZImage$1 = Image$2;
  graphic$g.Image = ZImage$1;
  var Group$4 = Group_1;
  graphic$g.Group = Group$4;
  var Text$2 = Text_1;
  graphic$g.Text = Text$2;
  var Circle$1 = Circle$2;
  graphic$g.Circle = Circle$1;
  var Sector = Sector$1;
  graphic$g.Sector = Sector;
  var Ring = Ring$1;
  graphic$g.Ring = Ring;
  var Polygon$3 = Polygon$4;
  graphic$g.Polygon = Polygon$3;
  var Polyline$3 = Polyline$4;
  graphic$g.Polyline = Polyline$3;
  var Rect$1 = Rect$2;
  graphic$g.Rect = Rect$1;
  var Line$1 = Line$2;
  graphic$g.Line = Line$1;
  var BezierCurve = BezierCurve$1;
  graphic$g.BezierCurve = BezierCurve;
  var Arc = Arc$1;
  graphic$g.Arc = Arc;
  var CompoundPath = CompoundPath$1;
  graphic$g.CompoundPath = CompoundPath;
  var LinearGradient$1 = LinearGradient_1;
  graphic$g.LinearGradient = LinearGradient$1;
  var RadialGradient = RadialGradient_1;
  graphic$g.RadialGradient = RadialGradient;
  var BoundingRect$5 = BoundingRect_1;
  graphic$g.BoundingRect = BoundingRect$5;
  var IncrementalDisplayable = IncrementalDisplayable$1;
  graphic$g.IncrementalDisplayable = IncrementalDisplayable;
  var subPixelOptimizeUtil = subPixelOptimize$2;
  var mathMax = Math.max;
  var mathMin = Math.min;
  var EMPTY_OBJ = {};
  var Z2_EMPHASIS_LIFT = 1;
  var CACHED_LABEL_STYLE_PROPERTIES = {
    color: "textFill",
    textBorderColor: "textStroke",
    textBorderWidth: "textStrokeWidth"
  };
  var EMPHASIS = "emphasis";
  var NORMAL = "normal";
  var _highlightNextDigit = 1;
  var _highlightKeyMap = {};
  var _customShapeMap = {};
  function extendShape(opts) {
    return Path$3.extend(opts);
  }
  function extendPath(pathData, opts) {
    return pathTool.extendFromString(pathData, opts);
  }
  function registerShape(name, ShapeClass) {
    _customShapeMap[name] = ShapeClass;
  }
  function getShapeClass(name) {
    if (_customShapeMap.hasOwnProperty(name)) {
      return _customShapeMap[name];
    }
  }
  function makePath(pathData, opts, rect, layout2) {
    var path2 = pathTool.createFromString(pathData, opts);
    if (rect) {
      if (layout2 === "center") {
        rect = centerGraphic(rect, path2.getBoundingRect());
      }
      resizePath(path2, rect);
    }
    return path2;
  }
  function makeImage(imageUrl, rect, layout2) {
    var path2 = new ZImage$1({
      style: {
        image: imageUrl,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
      },
      onload: function(img) {
        if (layout2 === "center") {
          var boundingRect = {
            width: img.width,
            height: img.height
          };
          path2.setStyle(centerGraphic(rect, boundingRect));
        }
      }
    });
    return path2;
  }
  function centerGraphic(rect, boundingRect) {
    var aspect = boundingRect.width / boundingRect.height;
    var width = rect.height * aspect;
    var height;
    if (width <= rect.width) {
      height = rect.height;
    } else {
      width = rect.width;
      height = width / aspect;
    }
    var cx = rect.x + rect.width / 2;
    var cy = rect.y + rect.height / 2;
    return {
      x: cx - width / 2,
      y: cy - height / 2,
      width,
      height
    };
  }
  var mergePath = pathTool.mergePath;
  function resizePath(path2, rect) {
    if (!path2.applyTransform) {
      return;
    }
    var pathRect = path2.getBoundingRect();
    var m2 = pathRect.calculateTransform(rect);
    path2.applyTransform(m2);
  }
  function subPixelOptimizeLine(param2) {
    subPixelOptimizeUtil.subPixelOptimizeLine(param2.shape, param2.shape, param2.style);
    return param2;
  }
  function subPixelOptimizeRect(param2) {
    subPixelOptimizeUtil.subPixelOptimizeRect(param2.shape, param2.shape, param2.style);
    return param2;
  }
  var subPixelOptimize = subPixelOptimizeUtil.subPixelOptimize;
  function hasFillOrStroke(fillOrStroke) {
    return fillOrStroke != null && fillOrStroke !== "none";
  }
  var liftedColorMap = zrUtil$Q.createHashMap();
  var liftedColorCount = 0;
  function liftColor(color2) {
    if (typeof color2 !== "string") {
      return color2;
    }
    var liftedColor = liftedColorMap.get(color2);
    if (!liftedColor) {
      liftedColor = colorTool$1.lift(color2, -0.1);
      if (liftedColorCount < 1e4) {
        liftedColorMap.set(color2, liftedColor);
        liftedColorCount++;
      }
    }
    return liftedColor;
  }
  function cacheElementStl(el) {
    if (!el.__hoverStlDirty) {
      return;
    }
    el.__hoverStlDirty = false;
    var hoverStyle = el.__hoverStl;
    if (!hoverStyle) {
      el.__cachedNormalStl = el.__cachedNormalZ2 = null;
      return;
    }
    var normalStyle = el.__cachedNormalStl = {};
    el.__cachedNormalZ2 = el.z2;
    var elStyle = el.style;
    for (var name in hoverStyle) {
      if (hoverStyle[name] != null) {
        normalStyle[name] = elStyle[name];
      }
    }
    normalStyle.fill = elStyle.fill;
    normalStyle.stroke = elStyle.stroke;
  }
  function singleEnterEmphasis(el) {
    var hoverStl = el.__hoverStl;
    if (!hoverStl || el.__highlighted) {
      return;
    }
    var zr = el.__zr;
    var useHoverLayer = el.useHoverLayer && zr && zr.painter.type === "canvas";
    el.__highlighted = useHoverLayer ? "layer" : "plain";
    if (el.isGroup || !zr && el.useHoverLayer) {
      return;
    }
    var elTarget = el;
    var targetStyle = el.style;
    if (useHoverLayer) {
      elTarget = zr.addHover(el);
      targetStyle = elTarget.style;
    }
    rollbackDefaultTextStyle(targetStyle);
    if (!useHoverLayer) {
      cacheElementStl(elTarget);
    }
    targetStyle.extendFrom(hoverStl);
    setDefaultHoverFillStroke(targetStyle, hoverStl, "fill");
    setDefaultHoverFillStroke(targetStyle, hoverStl, "stroke");
    applyDefaultTextStyle(targetStyle);
    if (!useHoverLayer) {
      el.dirty(false);
      el.z2 += Z2_EMPHASIS_LIFT;
    }
  }
  function setDefaultHoverFillStroke(targetStyle, hoverStyle, prop2) {
    if (!hasFillOrStroke(hoverStyle[prop2]) && hasFillOrStroke(targetStyle[prop2])) {
      targetStyle[prop2] = liftColor(targetStyle[prop2]);
    }
  }
  function singleEnterNormal(el) {
    var highlighted = el.__highlighted;
    if (!highlighted) {
      return;
    }
    el.__highlighted = false;
    if (el.isGroup) {
      return;
    }
    if (highlighted === "layer") {
      el.__zr && el.__zr.removeHover(el);
    } else {
      var style = el.style;
      var normalStl = el.__cachedNormalStl;
      if (normalStl) {
        rollbackDefaultTextStyle(style);
        el.setStyle(normalStl);
        applyDefaultTextStyle(style);
      }
      var normalZ2 = el.__cachedNormalZ2;
      if (normalZ2 != null && el.z2 - normalZ2 === Z2_EMPHASIS_LIFT) {
        el.z2 = normalZ2;
      }
    }
  }
  function traverseUpdate(el, updater, commonParam) {
    var fromState = NORMAL;
    var toState = NORMAL;
    var trigger;
    el.__highlighted && (fromState = EMPHASIS, trigger = true);
    updater(el, commonParam);
    el.__highlighted && (toState = EMPHASIS, trigger = true);
    el.isGroup && el.traverse(function(child) {
      !child.isGroup && updater(child, commonParam);
    });
    trigger && el.__highDownOnUpdate && el.__highDownOnUpdate(fromState, toState);
  }
  function setElementHoverStyle(el, hoverStl) {
    hoverStl = el.__hoverStl = hoverStl !== false && (el.hoverStyle || hoverStl || {});
    el.__hoverStlDirty = true;
    if (el.__highlighted) {
      el.__cachedNormalStl = null;
      singleEnterNormal(el);
      singleEnterEmphasis(el);
    }
  }
  function onElementMouseOver(e) {
    !shouldSilent(this, e) && !this.__highByOuter && traverseUpdate(this, singleEnterEmphasis);
  }
  function onElementMouseOut(e) {
    !shouldSilent(this, e) && !this.__highByOuter && traverseUpdate(this, singleEnterNormal);
  }
  function onElementEmphasisEvent(highlightDigit) {
    this.__highByOuter |= 1 << (highlightDigit || 0);
    traverseUpdate(this, singleEnterEmphasis);
  }
  function onElementNormalEvent(highlightDigit) {
    !(this.__highByOuter &= ~(1 << (highlightDigit || 0))) && traverseUpdate(this, singleEnterNormal);
  }
  function shouldSilent(el, e) {
    return el.__highDownSilentOnTouch && e.zrByTouch;
  }
  function setHoverStyle(el, hoverStyle) {
    setAsHighDownDispatcher(el, true);
    traverseUpdate(el, setElementHoverStyle, hoverStyle);
  }
  function setAsHighDownDispatcher(el, asDispatcher) {
    var disable = asDispatcher === false;
    el.__highDownSilentOnTouch = el.highDownSilentOnTouch;
    el.__highDownOnUpdate = el.highDownOnUpdate;
    if (!disable || el.__highDownDispatcher) {
      var method = disable ? "off" : "on";
      el[method]("mouseover", onElementMouseOver)[method]("mouseout", onElementMouseOut);
      el[method]("emphasis", onElementEmphasisEvent)[method]("normal", onElementNormalEvent);
      el.__highByOuter = el.__highByOuter || 0;
      el.__highDownDispatcher = !disable;
    }
  }
  function isHighDownDispatcher(el) {
    return !!(el && el.__highDownDispatcher);
  }
  function getHighlightDigit(highlightKey) {
    var highlightDigit = _highlightKeyMap[highlightKey];
    if (highlightDigit == null && _highlightNextDigit <= 32) {
      highlightDigit = _highlightKeyMap[highlightKey] = _highlightNextDigit++;
    }
    return highlightDigit;
  }
  function setLabelStyle(normalStyle, emphasisStyle, normalModel, emphasisModel, opt, normalSpecified, emphasisSpecified) {
    opt = opt || EMPTY_OBJ;
    var labelFetcher = opt.labelFetcher;
    var labelDataIndex = opt.labelDataIndex;
    var labelDimIndex = opt.labelDimIndex;
    var labelProp = opt.labelProp;
    var showNormal = normalModel.getShallow("show");
    var showEmphasis = emphasisModel.getShallow("show");
    var baseText;
    if (showNormal || showEmphasis) {
      if (labelFetcher) {
        baseText = labelFetcher.getFormattedLabel(labelDataIndex, "normal", null, labelDimIndex, labelProp);
      }
      if (baseText == null) {
        baseText = zrUtil$Q.isFunction(opt.defaultText) ? opt.defaultText(labelDataIndex, opt) : opt.defaultText;
      }
    }
    var normalStyleText = showNormal ? baseText : null;
    var emphasisStyleText = showEmphasis ? zrUtil$Q.retrieve2(labelFetcher ? labelFetcher.getFormattedLabel(labelDataIndex, "emphasis", null, labelDimIndex, labelProp) : null, baseText) : null;
    if (normalStyleText != null || emphasisStyleText != null) {
      setTextStyle(normalStyle, normalModel, normalSpecified, opt);
      setTextStyle(emphasisStyle, emphasisModel, emphasisSpecified, opt, true);
    }
    normalStyle.text = normalStyleText;
    emphasisStyle.text = emphasisStyleText;
  }
  function modifyLabelStyle(el, normalStyleProps, emphasisStyleProps) {
    var elStyle = el.style;
    if (normalStyleProps) {
      rollbackDefaultTextStyle(elStyle);
      el.setStyle(normalStyleProps);
      applyDefaultTextStyle(elStyle);
    }
    elStyle = el.__hoverStl;
    if (emphasisStyleProps && elStyle) {
      rollbackDefaultTextStyle(elStyle);
      zrUtil$Q.extend(elStyle, emphasisStyleProps);
      applyDefaultTextStyle(elStyle);
    }
  }
  function setTextStyle(textStyle2, textStyleModel, specifiedTextStyle, opt, isEmphasis) {
    setTextStyleCommon(textStyle2, textStyleModel, opt, isEmphasis);
    specifiedTextStyle && zrUtil$Q.extend(textStyle2, specifiedTextStyle);
    return textStyle2;
  }
  function setText(textStyle2, labelModel, defaultColor) {
    var opt = {
      isRectText: true
    };
    var isEmphasis;
    if (defaultColor === false) {
      isEmphasis = true;
    } else {
      opt.autoColor = defaultColor;
    }
    setTextStyleCommon(textStyle2, labelModel, opt, isEmphasis);
  }
  function setTextStyleCommon(textStyle2, textStyleModel, opt, isEmphasis) {
    opt = opt || EMPTY_OBJ;
    if (opt.isRectText) {
      var textPosition;
      if (opt.getTextPosition) {
        textPosition = opt.getTextPosition(textStyleModel, isEmphasis);
      } else {
        textPosition = textStyleModel.getShallow("position") || (isEmphasis ? null : "inside");
        textPosition === "outside" && (textPosition = "top");
      }
      textStyle2.textPosition = textPosition;
      textStyle2.textOffset = textStyleModel.getShallow("offset");
      var labelRotate = textStyleModel.getShallow("rotate");
      labelRotate != null && (labelRotate *= Math.PI / 180);
      textStyle2.textRotation = labelRotate;
      textStyle2.textDistance = zrUtil$Q.retrieve2(textStyleModel.getShallow("distance"), isEmphasis ? null : 5);
    }
    var ecModel = textStyleModel.ecModel;
    var globalTextStyle = ecModel && ecModel.option.textStyle;
    var richItemNames = getRichItemNames(textStyleModel);
    var richResult;
    if (richItemNames) {
      richResult = {};
      for (var name in richItemNames) {
        if (richItemNames.hasOwnProperty(name)) {
          var richTextStyle = textStyleModel.getModel(["rich", name]);
          setTokenTextStyle(richResult[name] = {}, richTextStyle, globalTextStyle, opt, isEmphasis);
        }
      }
    }
    textStyle2.rich = richResult;
    setTokenTextStyle(textStyle2, textStyleModel, globalTextStyle, opt, isEmphasis, true);
    if (opt.forceRich && !opt.textStyle) {
      opt.textStyle = {};
    }
    return textStyle2;
  }
  function getRichItemNames(textStyleModel) {
    var richItemNameMap;
    while (textStyleModel && textStyleModel !== textStyleModel.ecModel) {
      var rich = (textStyleModel.option || EMPTY_OBJ).rich;
      if (rich) {
        richItemNameMap = richItemNameMap || {};
        for (var name in rich) {
          if (rich.hasOwnProperty(name)) {
            richItemNameMap[name] = 1;
          }
        }
      }
      textStyleModel = textStyleModel.parentModel;
    }
    return richItemNameMap;
  }
  function setTokenTextStyle(textStyle2, textStyleModel, globalTextStyle, opt, isEmphasis, isBlock) {
    globalTextStyle = !isEmphasis && globalTextStyle || EMPTY_OBJ;
    textStyle2.textFill = getAutoColor(textStyleModel.getShallow("color"), opt) || globalTextStyle.color;
    textStyle2.textStroke = getAutoColor(textStyleModel.getShallow("textBorderColor"), opt) || globalTextStyle.textBorderColor;
    textStyle2.textStrokeWidth = zrUtil$Q.retrieve2(textStyleModel.getShallow("textBorderWidth"), globalTextStyle.textBorderWidth);
    if (!isEmphasis) {
      if (isBlock) {
        textStyle2.insideRollbackOpt = opt;
        applyDefaultTextStyle(textStyle2);
      }
      if (textStyle2.textFill == null) {
        textStyle2.textFill = opt.autoColor;
      }
    }
    textStyle2.fontStyle = textStyleModel.getShallow("fontStyle") || globalTextStyle.fontStyle;
    textStyle2.fontWeight = textStyleModel.getShallow("fontWeight") || globalTextStyle.fontWeight;
    textStyle2.fontSize = textStyleModel.getShallow("fontSize") || globalTextStyle.fontSize;
    textStyle2.fontFamily = textStyleModel.getShallow("fontFamily") || globalTextStyle.fontFamily;
    textStyle2.textAlign = textStyleModel.getShallow("align");
    textStyle2.textVerticalAlign = textStyleModel.getShallow("verticalAlign") || textStyleModel.getShallow("baseline");
    textStyle2.textLineHeight = textStyleModel.getShallow("lineHeight");
    textStyle2.textWidth = textStyleModel.getShallow("width");
    textStyle2.textHeight = textStyleModel.getShallow("height");
    textStyle2.textTag = textStyleModel.getShallow("tag");
    if (!isBlock || !opt.disableBox) {
      textStyle2.textBackgroundColor = getAutoColor(textStyleModel.getShallow("backgroundColor"), opt);
      textStyle2.textPadding = textStyleModel.getShallow("padding");
      textStyle2.textBorderColor = getAutoColor(textStyleModel.getShallow("borderColor"), opt);
      textStyle2.textBorderWidth = textStyleModel.getShallow("borderWidth");
      textStyle2.textBorderRadius = textStyleModel.getShallow("borderRadius");
      textStyle2.textBoxShadowColor = textStyleModel.getShallow("shadowColor");
      textStyle2.textBoxShadowBlur = textStyleModel.getShallow("shadowBlur");
      textStyle2.textBoxShadowOffsetX = textStyleModel.getShallow("shadowOffsetX");
      textStyle2.textBoxShadowOffsetY = textStyleModel.getShallow("shadowOffsetY");
    }
    textStyle2.textShadowColor = textStyleModel.getShallow("textShadowColor") || globalTextStyle.textShadowColor;
    textStyle2.textShadowBlur = textStyleModel.getShallow("textShadowBlur") || globalTextStyle.textShadowBlur;
    textStyle2.textShadowOffsetX = textStyleModel.getShallow("textShadowOffsetX") || globalTextStyle.textShadowOffsetX;
    textStyle2.textShadowOffsetY = textStyleModel.getShallow("textShadowOffsetY") || globalTextStyle.textShadowOffsetY;
  }
  function getAutoColor(color2, opt) {
    return color2 !== "auto" ? color2 : opt && opt.autoColor ? opt.autoColor : null;
  }
  function applyDefaultTextStyle(textStyle2) {
    var textPosition = textStyle2.textPosition;
    var opt = textStyle2.insideRollbackOpt;
    var insideRollback;
    if (opt && textStyle2.textFill == null) {
      var autoColor = opt.autoColor;
      var isRectText = opt.isRectText;
      var useInsideStyle = opt.useInsideStyle;
      var useInsideStyleCache = useInsideStyle !== false && (useInsideStyle === true || isRectText && textPosition && typeof textPosition === "string" && textPosition.indexOf("inside") >= 0);
      var useAutoColorCache = !useInsideStyleCache && autoColor != null;
      if (useInsideStyleCache || useAutoColorCache) {
        insideRollback = {
          textFill: textStyle2.textFill,
          textStroke: textStyle2.textStroke,
          textStrokeWidth: textStyle2.textStrokeWidth
        };
      }
      if (useInsideStyleCache) {
        textStyle2.textFill = "#fff";
        if (textStyle2.textStroke == null) {
          textStyle2.textStroke = autoColor;
          textStyle2.textStrokeWidth == null && (textStyle2.textStrokeWidth = 2);
        }
      }
      if (useAutoColorCache) {
        textStyle2.textFill = autoColor;
      }
    }
    textStyle2.insideRollback = insideRollback;
  }
  function rollbackDefaultTextStyle(style) {
    var insideRollback = style.insideRollback;
    if (insideRollback) {
      style.textFill = insideRollback.textFill;
      style.textStroke = insideRollback.textStroke;
      style.textStrokeWidth = insideRollback.textStrokeWidth;
      style.insideRollback = null;
    }
  }
  function getFont(opt, ecModel) {
    var gTextStyleModel = ecModel && ecModel.getModel("textStyle");
    return zrUtil$Q.trim([
      opt.fontStyle || gTextStyleModel && gTextStyleModel.getShallow("fontStyle") || "",
      opt.fontWeight || gTextStyleModel && gTextStyleModel.getShallow("fontWeight") || "",
      (opt.fontSize || gTextStyleModel && gTextStyleModel.getShallow("fontSize") || 12) + "px",
      opt.fontFamily || gTextStyleModel && gTextStyleModel.getShallow("fontFamily") || "sans-serif"
    ].join(" "));
  }
  function animateOrSetProps(isUpdate, el, props, animatableModel, dataIndex, cb) {
    if (typeof dataIndex === "function") {
      cb = dataIndex;
      dataIndex = null;
    }
    var animationEnabled = animatableModel && animatableModel.isAnimationEnabled();
    if (animationEnabled) {
      var postfix = isUpdate ? "Update" : "";
      var duration = animatableModel.getShallow("animationDuration" + postfix);
      var animationEasing = animatableModel.getShallow("animationEasing" + postfix);
      var animationDelay = animatableModel.getShallow("animationDelay" + postfix);
      if (typeof animationDelay === "function") {
        animationDelay = animationDelay(dataIndex, animatableModel.getAnimationDelayParams ? animatableModel.getAnimationDelayParams(el, dataIndex) : null);
      }
      if (typeof duration === "function") {
        duration = duration(dataIndex);
      }
      duration > 0 ? el.animateTo(props, duration, animationDelay || 0, animationEasing, cb, !!cb) : (el.stopAnimation(), el.attr(props), cb && cb());
    } else {
      el.stopAnimation();
      el.attr(props);
      cb && cb();
    }
  }
  function updateProps$1(el, props, animatableModel, dataIndex, cb) {
    animateOrSetProps(true, el, props, animatableModel, dataIndex, cb);
  }
  function initProps(el, props, animatableModel, dataIndex, cb) {
    animateOrSetProps(false, el, props, animatableModel, dataIndex, cb);
  }
  function getTransform(target, ancestor) {
    var mat = matrix$3.identity([]);
    while (target && target !== ancestor) {
      matrix$3.mul(mat, target.getLocalTransform(), mat);
      target = target.parent;
    }
    return mat;
  }
  function applyTransform(target, transform, invert2) {
    if (transform && !zrUtil$Q.isArrayLike(transform)) {
      transform = Transformable.getLocalTransform(transform);
    }
    if (invert2) {
      transform = matrix$3.invert([], transform);
    }
    return vector$1.applyTransform([], target, transform);
  }
  function transformDirection(direction, transform, invert2) {
    var hBase = transform[4] === 0 || transform[5] === 0 || transform[0] === 0 ? 1 : Math.abs(2 * transform[4] / transform[0]);
    var vBase = transform[4] === 0 || transform[5] === 0 || transform[2] === 0 ? 1 : Math.abs(2 * transform[4] / transform[2]);
    var vertex = [direction === "left" ? -hBase : direction === "right" ? hBase : 0, direction === "top" ? -vBase : direction === "bottom" ? vBase : 0];
    vertex = applyTransform(vertex, transform, invert2);
    return Math.abs(vertex[0]) > Math.abs(vertex[1]) ? vertex[0] > 0 ? "right" : "left" : vertex[1] > 0 ? "bottom" : "top";
  }
  function groupTransition(g1, g2, animatableModel, cb) {
    if (!g1 || !g2) {
      return;
    }
    function getElMap(g) {
      var elMap = {};
      g.traverse(function(el) {
        if (!el.isGroup && el.anid) {
          elMap[el.anid] = el;
        }
      });
      return elMap;
    }
    function getAnimatableProps(el) {
      var obj = {
        position: vector$1.clone(el.position),
        rotation: el.rotation
      };
      if (el.shape) {
        obj.shape = zrUtil$Q.extend({}, el.shape);
      }
      return obj;
    }
    var elMap1 = getElMap(g1);
    g2.traverse(function(el) {
      if (!el.isGroup && el.anid) {
        var oldEl = elMap1[el.anid];
        if (oldEl) {
          var newProp = getAnimatableProps(el);
          el.attr(getAnimatableProps(oldEl));
          updateProps$1(el, newProp, animatableModel, el.dataIndex);
        }
      }
    });
  }
  function clipPointsByRect(points2, rect) {
    return zrUtil$Q.map(points2, function(point) {
      var x = point[0];
      x = mathMax(x, rect.x);
      x = mathMin(x, rect.x + rect.width);
      var y = point[1];
      y = mathMax(y, rect.y);
      y = mathMin(y, rect.y + rect.height);
      return [x, y];
    });
  }
  function clipRectByRect(targetRect, rect) {
    var x = mathMax(targetRect.x, rect.x);
    var x2 = mathMin(targetRect.x + targetRect.width, rect.x + rect.width);
    var y = mathMax(targetRect.y, rect.y);
    var y2 = mathMin(targetRect.y + targetRect.height, rect.y + rect.height);
    if (x2 >= x && y2 >= y) {
      return {
        x,
        y,
        width: x2 - x,
        height: y2 - y
      };
    }
  }
  function createIcon(iconStr, opt, rect) {
    opt = zrUtil$Q.extend({
      rectHover: true
    }, opt);
    var style = opt.style = {
      strokeNoScale: true
    };
    rect = rect || {
      x: -1,
      y: -1,
      width: 2,
      height: 2
    };
    if (iconStr) {
      return iconStr.indexOf("image://") === 0 ? (style.image = iconStr.slice(8), zrUtil$Q.defaults(style, rect), new ZImage$1(opt)) : makePath(iconStr.replace("path://", ""), opt, rect, "center");
    }
  }
  function linePolygonIntersect(a1x, a1y, a2x, a2y, points2) {
    for (var i2 = 0, p2 = points2[points2.length - 1]; i2 < points2.length; i2++) {
      var p = points2[i2];
      if (lineLineIntersect(a1x, a1y, a2x, a2y, p[0], p[1], p2[0], p2[1])) {
        return true;
      }
      p2 = p;
    }
  }
  function lineLineIntersect(a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y) {
    var mx = a2x - a1x;
    var my = a2y - a1y;
    var nx = b2x - b1x;
    var ny = b2y - b1y;
    var nmCrossProduct = crossProduct2d(nx, ny, mx, my);
    if (nearZero(nmCrossProduct)) {
      return false;
    }
    var b1a1x = a1x - b1x;
    var b1a1y = a1y - b1y;
    var q = crossProduct2d(b1a1x, b1a1y, mx, my) / nmCrossProduct;
    if (q < 0 || q > 1) {
      return false;
    }
    var p = crossProduct2d(b1a1x, b1a1y, nx, ny) / nmCrossProduct;
    if (p < 0 || p > 1) {
      return false;
    }
    return true;
  }
  function crossProduct2d(x1, y1, x2, y2) {
    return x1 * y2 - x2 * y1;
  }
  function nearZero(val) {
    return val <= 1e-6 && val >= -1e-6;
  }
  registerShape("circle", Circle$1);
  registerShape("sector", Sector);
  registerShape("ring", Ring);
  registerShape("polygon", Polygon$3);
  registerShape("polyline", Polyline$3);
  registerShape("rect", Rect$1);
  registerShape("line", Line$1);
  registerShape("bezierCurve", BezierCurve);
  registerShape("arc", Arc);
  graphic$g.Z2_EMPHASIS_LIFT = Z2_EMPHASIS_LIFT;
  graphic$g.CACHED_LABEL_STYLE_PROPERTIES = CACHED_LABEL_STYLE_PROPERTIES;
  graphic$g.extendShape = extendShape;
  graphic$g.extendPath = extendPath;
  graphic$g.registerShape = registerShape;
  graphic$g.getShapeClass = getShapeClass;
  graphic$g.makePath = makePath;
  graphic$g.makeImage = makeImage;
  graphic$g.mergePath = mergePath;
  graphic$g.resizePath = resizePath;
  graphic$g.subPixelOptimizeLine = subPixelOptimizeLine;
  graphic$g.subPixelOptimizeRect = subPixelOptimizeRect;
  graphic$g.subPixelOptimize = subPixelOptimize;
  graphic$g.setElementHoverStyle = setElementHoverStyle;
  graphic$g.setHoverStyle = setHoverStyle;
  graphic$g.setAsHighDownDispatcher = setAsHighDownDispatcher;
  graphic$g.isHighDownDispatcher = isHighDownDispatcher;
  graphic$g.getHighlightDigit = getHighlightDigit;
  graphic$g.setLabelStyle = setLabelStyle;
  graphic$g.modifyLabelStyle = modifyLabelStyle;
  graphic$g.setTextStyle = setTextStyle;
  graphic$g.setText = setText;
  graphic$g.getFont = getFont;
  graphic$g.updateProps = updateProps$1;
  graphic$g.initProps = initProps;
  graphic$g.getTransform = getTransform;
  graphic$g.applyTransform = applyTransform;
  graphic$g.transformDirection = transformDirection;
  graphic$g.groupTransition = groupTransition;
  graphic$g.clipPointsByRect = clipPointsByRect;
  graphic$g.clipRectByRect = clipRectByRect;
  graphic$g.createIcon = createIcon;
  graphic$g.linePolygonIntersect = linePolygonIntersect;
  graphic$g.lineLineIntersect = lineLineIntersect;
  var textContain$4 = text;
  var graphicUtil$3 = graphic$g;
  var PATH_COLOR = ["textStyle", "color"];
  var _default$Z = {
    getTextColor: function(isEmphasis) {
      var ecModel = this.ecModel;
      return this.getShallow("color") || (!isEmphasis && ecModel ? ecModel.get(PATH_COLOR) : null);
    },
    getFont: function() {
      return graphicUtil$3.getFont({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    },
    getTextRect: function(text2) {
      return textContain$4.getBoundingRect(text2, this.getFont(), this.getShallow("align"), this.getShallow("verticalAlign") || this.getShallow("baseline"), this.getShallow("padding"), this.getShallow("lineHeight"), this.getShallow("rich"), this.getShallow("truncateText"));
    }
  };
  var textStyle = _default$Z;
  var makeStyleMapper = makeStyleMapper$3;
  var getItemStyle = makeStyleMapper([["fill", "color"], ["stroke", "borderColor"], ["lineWidth", "borderWidth"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"], ["textPosition"], ["textAlign"]]);
  var _default$Y = {
    getItemStyle: function(excludes, includes) {
      var style = getItemStyle(this, excludes, includes);
      var lineDash = this.getBorderLineDash();
      lineDash && (style.lineDash = lineDash);
      return style;
    },
    getBorderLineDash: function() {
      var lineType = this.get("borderType");
      return lineType === "solid" || lineType == null ? null : lineType === "dashed" ? [5, 5] : [1, 1];
    }
  };
  var itemStyle = _default$Y;
  var zrUtil$P = util$6;
  var env$4 = env_1;
  var _model$g = model;
  var makeInner$8 = _model$g.makeInner;
  var _clazz$3 = clazz;
  var enableClassExtend = _clazz$3.enableClassExtend;
  var enableClassCheck$1 = _clazz$3.enableClassCheck;
  var lineStyleMixin = lineStyle;
  var areaStyleMixin = areaStyle;
  var textStyleMixin = textStyle;
  var itemStyleMixin = itemStyle;
  var mixin$1 = zrUtil$P.mixin;
  var inner$9 = makeInner$8();
  function Model$8(option, parentModel, ecModel) {
    this.parentModel = parentModel;
    this.ecModel = ecModel;
    this.option = option;
  }
  Model$8.prototype = {
    constructor: Model$8,
    init: null,
    mergeOption: function(option) {
      zrUtil$P.merge(this.option, option, true);
    },
    get: function(path2, ignoreParent) {
      if (path2 == null) {
        return this.option;
      }
      return doGet(this.option, this.parsePath(path2), !ignoreParent && getParent(this, path2));
    },
    getShallow: function(key, ignoreParent) {
      var option = this.option;
      var val = option == null ? option : option[key];
      var parentModel = !ignoreParent && getParent(this, key);
      if (val == null && parentModel) {
        val = parentModel.getShallow(key);
      }
      return val;
    },
    getModel: function(path2, parentModel) {
      var obj = path2 == null ? this.option : doGet(this.option, path2 = this.parsePath(path2));
      var thisParentModel;
      parentModel = parentModel || (thisParentModel = getParent(this, path2)) && thisParentModel.getModel(path2);
      return new Model$8(obj, parentModel, this.ecModel);
    },
    isEmpty: function() {
      return this.option == null;
    },
    restoreData: function() {
    },
    clone: function() {
      var Ctor = this.constructor;
      return new Ctor(zrUtil$P.clone(this.option));
    },
    setReadOnly: function(properties) {
    },
    parsePath: function(path2) {
      if (typeof path2 === "string") {
        path2 = path2.split(".");
      }
      return path2;
    },
    customizeGetParent: function(getParentMethod) {
      inner$9(this).getParent = getParentMethod;
    },
    isAnimationEnabled: function() {
      if (!env$4.node) {
        if (this.option.animation != null) {
          return !!this.option.animation;
        } else if (this.parentModel) {
          return this.parentModel.isAnimationEnabled();
        }
      }
    }
  };
  function doGet(obj, pathArr, parentModel) {
    for (var i2 = 0; i2 < pathArr.length; i2++) {
      if (!pathArr[i2]) {
        continue;
      }
      obj = obj && typeof obj === "object" ? obj[pathArr[i2]] : null;
      if (obj == null) {
        break;
      }
    }
    if (obj == null && parentModel) {
      obj = parentModel.get(pathArr);
    }
    return obj;
  }
  function getParent(model2, path2) {
    var getParentMethod = inner$9(model2).getParent;
    return getParentMethod ? getParentMethod.call(model2, path2) : model2.parentModel;
  }
  enableClassExtend(Model$8);
  enableClassCheck$1(Model$8);
  mixin$1(Model$8, lineStyleMixin);
  mixin$1(Model$8, areaStyleMixin);
  mixin$1(Model$8, textStyleMixin);
  mixin$1(Model$8, itemStyleMixin);
  var _default$X = Model$8;
  var Model_1 = _default$X;
  var component = {};
  var zrUtil$O = util$6;
  var _clazz$2 = clazz;
  var parseClassType$1 = _clazz$2.parseClassType;
  var base = 0;
  function getUID$1(type) {
    return [type || "", base++, Math.random().toFixed(5)].join("_");
  }
  function enableSubTypeDefaulter(entity) {
    var subTypeDefaulters = {};
    entity.registerSubTypeDefaulter = function(componentType, defaulter) {
      componentType = parseClassType$1(componentType);
      subTypeDefaulters[componentType.main] = defaulter;
    };
    entity.determineSubType = function(componentType, option) {
      var type = option.type;
      if (!type) {
        var componentTypeMain = parseClassType$1(componentType).main;
        if (entity.hasSubTypes(componentType) && subTypeDefaulters[componentTypeMain]) {
          type = subTypeDefaulters[componentTypeMain](option);
        }
      }
      return type;
    };
    return entity;
  }
  function enableTopologicalTravel(entity, dependencyGetter) {
    entity.topologicalTravel = function(targetNameList, fullNameList, callback, context) {
      if (!targetNameList.length) {
        return;
      }
      var result = makeDepndencyGraph(fullNameList);
      var graph = result.graph;
      var stack = result.noEntryList;
      var targetNameSet = {};
      zrUtil$O.each(targetNameList, function(name) {
        targetNameSet[name] = true;
      });
      while (stack.length) {
        var currComponentType = stack.pop();
        var currVertex = graph[currComponentType];
        var isInTargetNameSet = !!targetNameSet[currComponentType];
        if (isInTargetNameSet) {
          callback.call(context, currComponentType, currVertex.originalDeps.slice());
          delete targetNameSet[currComponentType];
        }
        zrUtil$O.each(currVertex.successor, isInTargetNameSet ? removeEdgeAndAdd : removeEdge);
      }
      zrUtil$O.each(targetNameSet, function() {
        throw new Error("Circle dependency may exists");
      });
      function removeEdge(succComponentType) {
        graph[succComponentType].entryCount--;
        if (graph[succComponentType].entryCount === 0) {
          stack.push(succComponentType);
        }
      }
      function removeEdgeAndAdd(succComponentType) {
        targetNameSet[succComponentType] = true;
        removeEdge(succComponentType);
      }
    };
    function makeDepndencyGraph(fullNameList) {
      var graph = {};
      var noEntryList = [];
      zrUtil$O.each(fullNameList, function(name) {
        var thisItem = createDependencyGraphItem(graph, name);
        var originalDeps = thisItem.originalDeps = dependencyGetter(name);
        var availableDeps = getAvailableDependencies(originalDeps, fullNameList);
        thisItem.entryCount = availableDeps.length;
        if (thisItem.entryCount === 0) {
          noEntryList.push(name);
        }
        zrUtil$O.each(availableDeps, function(dependentName) {
          if (zrUtil$O.indexOf(thisItem.predecessor, dependentName) < 0) {
            thisItem.predecessor.push(dependentName);
          }
          var thatItem = createDependencyGraphItem(graph, dependentName);
          if (zrUtil$O.indexOf(thatItem.successor, dependentName) < 0) {
            thatItem.successor.push(name);
          }
        });
      });
      return {
        graph,
        noEntryList
      };
    }
    function createDependencyGraphItem(graph, name) {
      if (!graph[name]) {
        graph[name] = {
          predecessor: [],
          successor: []
        };
      }
      return graph[name];
    }
    function getAvailableDependencies(originalDeps, fullNameList) {
      var availableDeps = [];
      zrUtil$O.each(originalDeps, function(dep) {
        zrUtil$O.indexOf(fullNameList, dep) >= 0 && availableDeps.push(dep);
      });
      return availableDeps;
    }
  }
  component.getUID = getUID$1;
  component.enableSubTypeDefaulter = enableSubTypeDefaulter;
  component.enableTopologicalTravel = enableTopologicalTravel;
  var layout$4 = {};
  var number = {};
  var zrUtil$N = util$6;
  var RADIAN_EPSILON = 1e-4;
  function _trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
  }
  function linearMap$1(val, domain, range, clamp2) {
    var subDomain = domain[1] - domain[0];
    var subRange = range[1] - range[0];
    if (subDomain === 0) {
      return subRange === 0 ? range[0] : (range[0] + range[1]) / 2;
    }
    if (clamp2) {
      if (subDomain > 0) {
        if (val <= domain[0]) {
          return range[0];
        } else if (val >= domain[1]) {
          return range[1];
        }
      } else {
        if (val >= domain[0]) {
          return range[0];
        } else if (val <= domain[1]) {
          return range[1];
        }
      }
    } else {
      if (val === domain[0]) {
        return range[0];
      }
      if (val === domain[1]) {
        return range[1];
      }
    }
    return (val - domain[0]) / subDomain * subRange + range[0];
  }
  function parsePercent$4(percent, all) {
    switch (percent) {
      case "center":
      case "middle":
        percent = "50%";
        break;
      case "left":
      case "top":
        percent = "0%";
        break;
      case "right":
      case "bottom":
        percent = "100%";
        break;
    }
    if (typeof percent === "string") {
      if (_trim(percent).match(/%$/)) {
        return parseFloat(percent) / 100 * all;
      }
      return parseFloat(percent);
    }
    return percent == null ? NaN : +percent;
  }
  function round$2(x, precision, returnStr) {
    if (precision == null) {
      precision = 10;
    }
    precision = Math.min(Math.max(0, precision), 20);
    x = (+x).toFixed(precision);
    return returnStr ? x : +x;
  }
  function asc(arr) {
    arr.sort(function(a, b) {
      return a - b;
    });
    return arr;
  }
  function getPrecision(val) {
    val = +val;
    if (isNaN(val)) {
      return 0;
    }
    var e = 1;
    var count = 0;
    while (Math.round(val * e) / e !== val) {
      e *= 10;
      count++;
    }
    return count;
  }
  function getPrecisionSafe$1(val) {
    var str = val.toString();
    var eIndex = str.indexOf("e");
    if (eIndex > 0) {
      var precision = +str.slice(eIndex + 1);
      return precision < 0 ? -precision : 0;
    } else {
      var dotIndex = str.indexOf(".");
      return dotIndex < 0 ? 0 : str.length - 1 - dotIndex;
    }
  }
  function getPixelPrecision$1(dataExtent, pixelExtent) {
    var log2 = Math.log;
    var LN10 = Math.LN10;
    var dataQuantity = Math.floor(log2(dataExtent[1] - dataExtent[0]) / LN10);
    var sizeQuantity = Math.round(log2(Math.abs(pixelExtent[1] - pixelExtent[0])) / LN10);
    var precision = Math.min(Math.max(-dataQuantity + sizeQuantity, 0), 20);
    return !isFinite(precision) ? 20 : precision;
  }
  function getPercentWithPrecision(valueList, idx, precision) {
    if (!valueList[idx]) {
      return 0;
    }
    var sum = zrUtil$N.reduce(valueList, function(acc, val) {
      return acc + (isNaN(val) ? 0 : val);
    }, 0);
    if (sum === 0) {
      return 0;
    }
    var digits = Math.pow(10, precision);
    var votesPerQuota = zrUtil$N.map(valueList, function(val) {
      return (isNaN(val) ? 0 : val) / sum * digits * 100;
    });
    var targetSeats = digits * 100;
    var seats = zrUtil$N.map(votesPerQuota, function(votes) {
      return Math.floor(votes);
    });
    var currentSum = zrUtil$N.reduce(seats, function(acc, val) {
      return acc + val;
    }, 0);
    var remainder = zrUtil$N.map(votesPerQuota, function(votes, idx2) {
      return votes - seats[idx2];
    });
    while (currentSum < targetSeats) {
      var max3 = Number.NEGATIVE_INFINITY;
      var maxId = null;
      for (var i2 = 0, len2 = remainder.length; i2 < len2; ++i2) {
        if (remainder[i2] > max3) {
          max3 = remainder[i2];
          maxId = i2;
        }
      }
      ++seats[maxId];
      remainder[maxId] = 0;
      ++currentSum;
    }
    return seats[idx] / digits;
  }
  var MAX_SAFE_INTEGER = 9007199254740991;
  function remRadian$1(radian) {
    var pi2 = Math.PI * 2;
    return (radian % pi2 + pi2) % pi2;
  }
  function isRadianAroundZero$1(val) {
    return val > -RADIAN_EPSILON && val < RADIAN_EPSILON;
  }
  var TIME_REG = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
  function parseDate$1(value) {
    if (value instanceof Date) {
      return value;
    } else if (typeof value === "string") {
      var match = TIME_REG.exec(value);
      if (!match) {
        return new Date(NaN);
      }
      if (!match[8]) {
        return new Date(+match[1], +(match[2] || 1) - 1, +match[3] || 1, +match[4] || 0, +(match[5] || 0), +match[6] || 0, +match[7] || 0);
      } else {
        var hour = +match[4] || 0;
        if (match[8].toUpperCase() !== "Z") {
          hour -= match[8].slice(0, 3);
        }
        return new Date(Date.UTC(+match[1], +(match[2] || 1) - 1, +match[3] || 1, hour, +(match[5] || 0), +match[6] || 0, +match[7] || 0));
      }
    } else if (value == null) {
      return new Date(NaN);
    }
    return new Date(Math.round(value));
  }
  function quantity(val) {
    return Math.pow(10, quantityExponent(val));
  }
  function quantityExponent(val) {
    if (val === 0) {
      return 0;
    }
    var exp = Math.floor(Math.log(val) / Math.LN10);
    if (val / Math.pow(10, exp) >= 10) {
      exp++;
    }
    return exp;
  }
  function nice(val, round2) {
    var exponent = quantityExponent(val);
    var exp10 = Math.pow(10, exponent);
    var f = val / exp10;
    var nf;
    if (round2) {
      if (f < 1.5) {
        nf = 1;
      } else if (f < 2.5) {
        nf = 2;
      } else if (f < 4) {
        nf = 3;
      } else if (f < 7) {
        nf = 5;
      } else {
        nf = 10;
      }
    } else {
      if (f < 1) {
        nf = 1;
      } else if (f < 2) {
        nf = 2;
      } else if (f < 3) {
        nf = 3;
      } else if (f < 5) {
        nf = 5;
      } else {
        nf = 10;
      }
    }
    val = nf * exp10;
    return exponent >= -20 ? +val.toFixed(exponent < 0 ? -exponent : 0) : val;
  }
  function quantile(ascArr, p) {
    var H = (ascArr.length - 1) * p + 1;
    var h = Math.floor(H);
    var v2 = +ascArr[h - 1];
    var e = H - h;
    return e ? v2 + e * (ascArr[h] - v2) : v2;
  }
  function reformIntervals(list) {
    list.sort(function(a, b) {
      return littleThan(a, b, 0) ? -1 : 1;
    });
    var curr = -Infinity;
    var currClose = 1;
    for (var i2 = 0; i2 < list.length; ) {
      var interval = list[i2].interval;
      var close = list[i2].close;
      for (var lg = 0; lg < 2; lg++) {
        if (interval[lg] <= curr) {
          interval[lg] = curr;
          close[lg] = !lg ? 1 - currClose : 1;
        }
        curr = interval[lg];
        currClose = close[lg];
      }
      if (interval[0] === interval[1] && close[0] * close[1] !== 1) {
        list.splice(i2, 1);
      } else {
        i2++;
      }
    }
    return list;
    function littleThan(a, b, lg2) {
      return a.interval[lg2] < b.interval[lg2] || a.interval[lg2] === b.interval[lg2] && (a.close[lg2] - b.close[lg2] === (!lg2 ? 1 : -1) || !lg2 && littleThan(a, b, 1));
    }
  }
  function isNumeric(v2) {
    return v2 - parseFloat(v2) >= 0;
  }
  number.linearMap = linearMap$1;
  number.parsePercent = parsePercent$4;
  number.round = round$2;
  number.asc = asc;
  number.getPrecision = getPrecision;
  number.getPrecisionSafe = getPrecisionSafe$1;
  number.getPixelPrecision = getPixelPrecision$1;
  number.getPercentWithPrecision = getPercentWithPrecision;
  number.MAX_SAFE_INTEGER = MAX_SAFE_INTEGER;
  number.remRadian = remRadian$1;
  number.isRadianAroundZero = isRadianAroundZero$1;
  number.parseDate = parseDate$1;
  number.quantity = quantity;
  number.quantityExponent = quantityExponent;
  number.nice = nice;
  number.quantile = quantile;
  number.reformIntervals = reformIntervals;
  number.isNumeric = isNumeric;
  var format = {};
  var zrUtil$M = util$6;
  var textContain$3 = text;
  var numberUtil$7 = number;
  function addCommas$1(x) {
    if (isNaN(x)) {
      return "-";
    }
    x = (x + "").split(".");
    return x[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (x.length > 1 ? "." + x[1] : "");
  }
  function toCamelCase$1(str, upperCaseFirst) {
    str = (str || "").toLowerCase().replace(/-(.)/g, function(match, group1) {
      return group1.toUpperCase();
    });
    if (upperCaseFirst && str) {
      str = str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
  }
  var normalizeCssArray = zrUtil$M.normalizeCssArray;
  var replaceReg = /([&<>"'])/g;
  var replaceMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  function encodeHTML$1(source) {
    return source == null ? "" : (source + "").replace(replaceReg, function(str, c) {
      return replaceMap[c];
    });
  }
  var TPL_VAR_ALIAS = ["a", "b", "c", "d", "e", "f", "g"];
  var wrapVar = function(varName, seriesIdx) {
    return "{" + varName + (seriesIdx == null ? "" : seriesIdx) + "}";
  };
  function formatTpl$1(tpl, paramsList, encode) {
    if (!zrUtil$M.isArray(paramsList)) {
      paramsList = [paramsList];
    }
    var seriesLen = paramsList.length;
    if (!seriesLen) {
      return "";
    }
    var $vars = paramsList[0].$vars || [];
    for (var i2 = 0; i2 < $vars.length; i2++) {
      var alias = TPL_VAR_ALIAS[i2];
      tpl = tpl.replace(wrapVar(alias), wrapVar(alias, 0));
    }
    for (var seriesIdx = 0; seriesIdx < seriesLen; seriesIdx++) {
      for (var k = 0; k < $vars.length; k++) {
        var val = paramsList[seriesIdx][$vars[k]];
        tpl = tpl.replace(wrapVar(TPL_VAR_ALIAS[k], seriesIdx), encode ? encodeHTML$1(val) : val);
      }
    }
    return tpl;
  }
  function formatTplSimple(tpl, param2, encode) {
    zrUtil$M.each(param2, function(value, key) {
      tpl = tpl.replace("{" + key + "}", encode ? encodeHTML$1(value) : value);
    });
    return tpl;
  }
  function getTooltipMarker$2(opt, extraCssText) {
    opt = zrUtil$M.isString(opt) ? {
      color: opt,
      extraCssText
    } : opt || {};
    var color2 = opt.color;
    var type = opt.type;
    var extraCssText = opt.extraCssText;
    var renderMode = opt.renderMode || "html";
    var markerId = opt.markerId || "X";
    if (!color2) {
      return "";
    }
    if (renderMode === "html") {
      return type === "subItem" ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + encodeHTML$1(color2) + ";" + (extraCssText || "") + '"></span>' : '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + encodeHTML$1(color2) + ";" + (extraCssText || "") + '"></span>';
    } else {
      return {
        renderMode,
        content: "{marker" + markerId + "|}  ",
        style: {
          color: color2
        }
      };
    }
  }
  function pad(str, len2) {
    str += "";
    return "0000".substr(0, len2 - str.length) + str;
  }
  function formatTime$1(tpl, value, isUTC) {
    if (tpl === "week" || tpl === "month" || tpl === "quarter" || tpl === "half-year" || tpl === "year") {
      tpl = "MM-dd\nyyyy";
    }
    var date = numberUtil$7.parseDate(value);
    var utc = isUTC ? "UTC" : "";
    var y = date["get" + utc + "FullYear"]();
    var M = date["get" + utc + "Month"]() + 1;
    var d = date["get" + utc + "Date"]();
    var h = date["get" + utc + "Hours"]();
    var m2 = date["get" + utc + "Minutes"]();
    var s = date["get" + utc + "Seconds"]();
    var S = date["get" + utc + "Milliseconds"]();
    tpl = tpl.replace("MM", pad(M, 2)).replace("M", M).replace("yyyy", y).replace("yy", y % 100).replace("dd", pad(d, 2)).replace("d", d).replace("hh", pad(h, 2)).replace("h", h).replace("mm", pad(m2, 2)).replace("m", m2).replace("ss", pad(s, 2)).replace("s", s).replace("SSS", pad(S, 3));
    return tpl;
  }
  function capitalFirst(str) {
    return str ? str.charAt(0).toUpperCase() + str.substr(1) : str;
  }
  var truncateText = textContain$3.truncateText;
  function getTextBoundingRect(opt) {
    return textContain$3.getBoundingRect(opt.text, opt.font, opt.textAlign, opt.textVerticalAlign, opt.textPadding, opt.textLineHeight, opt.rich, opt.truncate);
  }
  function getTextRect(text2, font, textAlign, textVerticalAlign, textPadding, rich, truncate, textLineHeight) {
    return textContain$3.getBoundingRect(text2, font, textAlign, textVerticalAlign, textPadding, textLineHeight, rich, truncate);
  }
  function windowOpen(link, target) {
    if (target === "_blank" || target === "blank") {
      var blank = window.open();
      blank.opener = null;
      blank.location = link;
    } else {
      window.open(link, target);
    }
  }
  format.addCommas = addCommas$1;
  format.toCamelCase = toCamelCase$1;
  format.normalizeCssArray = normalizeCssArray;
  format.encodeHTML = encodeHTML$1;
  format.formatTpl = formatTpl$1;
  format.formatTplSimple = formatTplSimple;
  format.getTooltipMarker = getTooltipMarker$2;
  format.formatTime = formatTime$1;
  format.capitalFirst = capitalFirst;
  format.truncateText = truncateText;
  format.getTextBoundingRect = getTextBoundingRect;
  format.getTextRect = getTextRect;
  format.windowOpen = windowOpen;
  var zrUtil$L = util$6;
  var BoundingRect$4 = BoundingRect_1;
  var _number$6 = number;
  var parsePercent$3 = _number$6.parsePercent;
  var formatUtil$8 = format;
  var each$o = zrUtil$L.each;
  var LOCATION_PARAMS = ["left", "right", "top", "bottom", "width", "height"];
  var HV_NAMES = [["width", "left", "right"], ["height", "top", "bottom"]];
  function boxLayout$1(orient, group, gap, maxWidth, maxHeight) {
    var x = 0;
    var y = 0;
    if (maxWidth == null) {
      maxWidth = Infinity;
    }
    if (maxHeight == null) {
      maxHeight = Infinity;
    }
    var currentLineMaxSize = 0;
    group.eachChild(function(child, idx) {
      var position = child.position;
      var rect = child.getBoundingRect();
      var nextChild = group.childAt(idx + 1);
      var nextChildRect = nextChild && nextChild.getBoundingRect();
      var nextX;
      var nextY;
      if (orient === "horizontal") {
        var moveX = rect.width + (nextChildRect ? -nextChildRect.x + rect.x : 0);
        nextX = x + moveX;
        if (nextX > maxWidth || child.newline) {
          x = 0;
          nextX = moveX;
          y += currentLineMaxSize + gap;
          currentLineMaxSize = rect.height;
        } else {
          currentLineMaxSize = Math.max(currentLineMaxSize, rect.height);
        }
      } else {
        var moveY = rect.height + (nextChildRect ? -nextChildRect.y + rect.y : 0);
        nextY = y + moveY;
        if (nextY > maxHeight || child.newline) {
          x += currentLineMaxSize + gap;
          y = 0;
          nextY = moveY;
          currentLineMaxSize = rect.width;
        } else {
          currentLineMaxSize = Math.max(currentLineMaxSize, rect.width);
        }
      }
      if (child.newline) {
        return;
      }
      position[0] = x;
      position[1] = y;
      orient === "horizontal" ? x = nextX + gap : y = nextY + gap;
    });
  }
  var box = boxLayout$1;
  var vbox = zrUtil$L.curry(boxLayout$1, "vertical");
  var hbox = zrUtil$L.curry(boxLayout$1, "horizontal");
  function getAvailableSize(positionInfo, containerRect, margin) {
    var containerWidth = containerRect.width;
    var containerHeight = containerRect.height;
    var x = parsePercent$3(positionInfo.x, containerWidth);
    var y = parsePercent$3(positionInfo.y, containerHeight);
    var x2 = parsePercent$3(positionInfo.x2, containerWidth);
    var y2 = parsePercent$3(positionInfo.y2, containerHeight);
    (isNaN(x) || isNaN(parseFloat(positionInfo.x))) && (x = 0);
    (isNaN(x2) || isNaN(parseFloat(positionInfo.x2))) && (x2 = containerWidth);
    (isNaN(y) || isNaN(parseFloat(positionInfo.y))) && (y = 0);
    (isNaN(y2) || isNaN(parseFloat(positionInfo.y2))) && (y2 = containerHeight);
    margin = formatUtil$8.normalizeCssArray(margin || 0);
    return {
      width: Math.max(x2 - x - margin[1] - margin[3], 0),
      height: Math.max(y2 - y - margin[0] - margin[2], 0)
    };
  }
  function getLayoutRect$2(positionInfo, containerRect, margin) {
    margin = formatUtil$8.normalizeCssArray(margin || 0);
    var containerWidth = containerRect.width;
    var containerHeight = containerRect.height;
    var left = parsePercent$3(positionInfo.left, containerWidth);
    var top = parsePercent$3(positionInfo.top, containerHeight);
    var right = parsePercent$3(positionInfo.right, containerWidth);
    var bottom = parsePercent$3(positionInfo.bottom, containerHeight);
    var width = parsePercent$3(positionInfo.width, containerWidth);
    var height = parsePercent$3(positionInfo.height, containerHeight);
    var verticalMargin = margin[2] + margin[0];
    var horizontalMargin = margin[1] + margin[3];
    var aspect = positionInfo.aspect;
    if (isNaN(width)) {
      width = containerWidth - right - horizontalMargin - left;
    }
    if (isNaN(height)) {
      height = containerHeight - bottom - verticalMargin - top;
    }
    if (aspect != null) {
      if (isNaN(width) && isNaN(height)) {
        if (aspect > containerWidth / containerHeight) {
          width = containerWidth * 0.8;
        } else {
          height = containerHeight * 0.8;
        }
      }
      if (isNaN(width)) {
        width = aspect * height;
      }
      if (isNaN(height)) {
        height = width / aspect;
      }
    }
    if (isNaN(left)) {
      left = containerWidth - right - width - horizontalMargin;
    }
    if (isNaN(top)) {
      top = containerHeight - bottom - height - verticalMargin;
    }
    switch (positionInfo.left || positionInfo.right) {
      case "center":
        left = containerWidth / 2 - width / 2 - margin[3];
        break;
      case "right":
        left = containerWidth - width - horizontalMargin;
        break;
    }
    switch (positionInfo.top || positionInfo.bottom) {
      case "middle":
      case "center":
        top = containerHeight / 2 - height / 2 - margin[0];
        break;
      case "bottom":
        top = containerHeight - height - verticalMargin;
        break;
    }
    left = left || 0;
    top = top || 0;
    if (isNaN(width)) {
      width = containerWidth - horizontalMargin - left - (right || 0);
    }
    if (isNaN(height)) {
      height = containerHeight - verticalMargin - top - (bottom || 0);
    }
    var rect = new BoundingRect$4(left + margin[3], top + margin[0], width, height);
    rect.margin = margin;
    return rect;
  }
  function positionElement$1(el, positionInfo, containerRect, margin, opt) {
    var h = !opt || !opt.hv || opt.hv[0];
    var v2 = !opt || !opt.hv || opt.hv[1];
    var boundingMode = opt && opt.boundingMode || "all";
    if (!h && !v2) {
      return;
    }
    var rect;
    if (boundingMode === "raw") {
      rect = el.type === "group" ? new BoundingRect$4(0, 0, +positionInfo.width || 0, +positionInfo.height || 0) : el.getBoundingRect();
    } else {
      rect = el.getBoundingRect();
      if (el.needLocalTransform()) {
        var transform = el.getLocalTransform();
        rect = rect.clone();
        rect.applyTransform(transform);
      }
    }
    positionInfo = getLayoutRect$2(zrUtil$L.defaults({
      width: rect.width,
      height: rect.height
    }, positionInfo), containerRect, margin);
    var elPos = el.position;
    var dx = h ? positionInfo.x - rect.x : 0;
    var dy = v2 ? positionInfo.y - rect.y : 0;
    el.attr("position", boundingMode === "raw" ? [dx, dy] : [elPos[0] + dx, elPos[1] + dy]);
  }
  function sizeCalculable(option, hvIdx) {
    return option[HV_NAMES[hvIdx][0]] != null || option[HV_NAMES[hvIdx][1]] != null && option[HV_NAMES[hvIdx][2]] != null;
  }
  function mergeLayoutParam$2(targetOption, newOption, opt) {
    !zrUtil$L.isObject(opt) && (opt = {});
    var ignoreSize = opt.ignoreSize;
    !zrUtil$L.isArray(ignoreSize) && (ignoreSize = [ignoreSize, ignoreSize]);
    var hResult = merge2(HV_NAMES[0], 0);
    var vResult = merge2(HV_NAMES[1], 1);
    copy2(HV_NAMES[0], targetOption, hResult);
    copy2(HV_NAMES[1], targetOption, vResult);
    function merge2(names, hvIdx) {
      var newParams = {};
      var newValueCount = 0;
      var merged = {};
      var mergedValueCount = 0;
      var enoughParamNumber = 2;
      each$o(names, function(name2) {
        merged[name2] = targetOption[name2];
      });
      each$o(names, function(name2) {
        hasProp(newOption, name2) && (newParams[name2] = merged[name2] = newOption[name2]);
        hasValue(newParams, name2) && newValueCount++;
        hasValue(merged, name2) && mergedValueCount++;
      });
      if (ignoreSize[hvIdx]) {
        if (hasValue(newOption, names[1])) {
          merged[names[2]] = null;
        } else if (hasValue(newOption, names[2])) {
          merged[names[1]] = null;
        }
        return merged;
      }
      if (mergedValueCount === enoughParamNumber || !newValueCount) {
        return merged;
      } else if (newValueCount >= enoughParamNumber) {
        return newParams;
      } else {
        for (var i2 = 0; i2 < names.length; i2++) {
          var name = names[i2];
          if (!hasProp(newParams, name) && hasProp(targetOption, name)) {
            newParams[name] = targetOption[name];
            break;
          }
        }
        return newParams;
      }
    }
    function hasProp(obj, name) {
      return obj.hasOwnProperty(name);
    }
    function hasValue(obj, name) {
      return obj[name] != null && obj[name] !== "auto";
    }
    function copy2(names, target, source) {
      each$o(names, function(name) {
        target[name] = source[name];
      });
    }
  }
  function getLayoutParams$2(source) {
    return copyLayoutParams({}, source);
  }
  function copyLayoutParams(target, source) {
    source && target && each$o(LOCATION_PARAMS, function(name) {
      source.hasOwnProperty(name) && (target[name] = source[name]);
    });
    return target;
  }
  layout$4.LOCATION_PARAMS = LOCATION_PARAMS;
  layout$4.HV_NAMES = HV_NAMES;
  layout$4.box = box;
  layout$4.vbox = vbox;
  layout$4.hbox = hbox;
  layout$4.getAvailableSize = getAvailableSize;
  layout$4.getLayoutRect = getLayoutRect$2;
  layout$4.positionElement = positionElement$1;
  layout$4.sizeCalculable = sizeCalculable;
  layout$4.mergeLayoutParam = mergeLayoutParam$2;
  layout$4.getLayoutParams = getLayoutParams$2;
  layout$4.copyLayoutParams = copyLayoutParams;
  var _default$W = {
    getBoxLayoutParams: function() {
      return {
        left: this.get("left"),
        top: this.get("top"),
        right: this.get("right"),
        bottom: this.get("bottom"),
        width: this.get("width"),
        height: this.get("height")
      };
    }
  };
  var boxLayout = _default$W;
  var zrUtil$K = util$6;
  var Model$7 = Model_1;
  var componentUtil$2 = component;
  var _clazz$1 = clazz;
  var enableClassManagement = _clazz$1.enableClassManagement;
  var parseClassType = _clazz$1.parseClassType;
  var _model$f = model;
  var makeInner$7 = _model$f.makeInner;
  var layout$3 = layout$4;
  var boxLayoutMixin = boxLayout;
  var inner$8 = makeInner$7();
  var ComponentModel$7 = Model$7.extend({
    type: "component",
    id: "",
    name: "",
    mainType: "",
    subType: "",
    componentIndex: 0,
    defaultOption: null,
    ecModel: null,
    dependentModels: [],
    uid: null,
    layoutMode: null,
    $constructor: function(option, parentModel, ecModel, extraOpt) {
      Model$7.call(this, option, parentModel, ecModel, extraOpt);
      this.uid = componentUtil$2.getUID("ec_cpt_model");
    },
    init: function(option, parentModel, ecModel, extraOpt) {
      this.mergeDefaultAndTheme(option, ecModel);
    },
    mergeDefaultAndTheme: function(option, ecModel) {
      var layoutMode = this.layoutMode;
      var inputPositionParams = layoutMode ? layout$3.getLayoutParams(option) : {};
      var themeModel = ecModel.getTheme();
      zrUtil$K.merge(option, themeModel.get(this.mainType));
      zrUtil$K.merge(option, this.getDefaultOption());
      if (layoutMode) {
        layout$3.mergeLayoutParam(option, inputPositionParams, layoutMode);
      }
    },
    mergeOption: function(option, extraOpt) {
      zrUtil$K.merge(this.option, option, true);
      var layoutMode = this.layoutMode;
      if (layoutMode) {
        layout$3.mergeLayoutParam(this.option, option, layoutMode);
      }
    },
    optionUpdated: function(newCptOption, isInit) {
    },
    getDefaultOption: function() {
      var fields = inner$8(this);
      if (!fields.defaultOption) {
        var optList = [];
        var Class = this.constructor;
        while (Class) {
          var opt = Class.prototype.defaultOption;
          opt && optList.push(opt);
          Class = Class.superClass;
        }
        var defaultOption2 = {};
        for (var i2 = optList.length - 1; i2 >= 0; i2--) {
          defaultOption2 = zrUtil$K.merge(defaultOption2, optList[i2], true);
        }
        fields.defaultOption = defaultOption2;
      }
      return fields.defaultOption;
    },
    getReferringComponents: function(mainType) {
      return this.ecModel.queryComponents({
        mainType,
        index: this.get(mainType + "Index", true),
        id: this.get(mainType + "Id", true)
      });
    }
  });
  enableClassManagement(ComponentModel$7, {
    registerWhenExtend: true
  });
  componentUtil$2.enableSubTypeDefaulter(ComponentModel$7);
  componentUtil$2.enableTopologicalTravel(ComponentModel$7, getDependencies);
  function getDependencies(componentType) {
    var deps = [];
    zrUtil$K.each(ComponentModel$7.getClassesByMainType(componentType), function(Clazz) {
      deps = deps.concat(Clazz.prototype.dependencies || []);
    });
    deps = zrUtil$K.map(deps, function(type) {
      return parseClassType(type).main;
    });
    if (componentType !== "dataset" && zrUtil$K.indexOf(deps, "dataset") <= 0) {
      deps.unshift("dataset");
    }
    return deps;
  }
  zrUtil$K.mixin(ComponentModel$7, boxLayoutMixin);
  var _default$V = ComponentModel$7;
  var Component$2 = _default$V;
  var platform = "";
  if (typeof navigator !== "undefined") {
    platform = navigator.platform || "";
  }
  var _default$U = {
    color: ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"],
    gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
    textStyle: {
      fontFamily: platform.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
      fontSize: 12,
      fontStyle: "normal",
      fontWeight: "normal"
    },
    blendMode: null,
    animation: "auto",
    animationDuration: 1e3,
    animationDurationUpdate: 300,
    animationEasing: "exponentialOut",
    animationEasingUpdate: "cubicOut",
    animationThreshold: 2e3,
    progressiveThreshold: 3e3,
    progressive: 400,
    hoverLayerThreshold: 3e3,
    useUTC: false
  };
  var globalDefault$1 = _default$U;
  var _model$e = model;
  var makeInner$6 = _model$e.makeInner;
  var normalizeToArray$3 = _model$e.normalizeToArray;
  var inner$7 = makeInner$6();
  function getNearestColorPalette(colors, requestColorNum) {
    var paletteNum = colors.length;
    for (var i2 = 0; i2 < paletteNum; i2++) {
      if (colors[i2].length > requestColorNum) {
        return colors[i2];
      }
    }
    return colors[paletteNum - 1];
  }
  var _default$T = {
    clearColorPalette: function() {
      inner$7(this).colorIdx = 0;
      inner$7(this).colorNameMap = {};
    },
    getColorFromPalette: function(name, scope, requestColorNum) {
      scope = scope || this;
      var scopeFields = inner$7(scope);
      var colorIdx = scopeFields.colorIdx || 0;
      var colorNameMap = scopeFields.colorNameMap = scopeFields.colorNameMap || {};
      if (colorNameMap.hasOwnProperty(name)) {
        return colorNameMap[name];
      }
      var defaultColorPalette = normalizeToArray$3(this.get("color", true));
      var layeredColorPalette = this.get("colorLayer", true);
      var colorPalette2 = requestColorNum == null || !layeredColorPalette ? defaultColorPalette : getNearestColorPalette(layeredColorPalette, requestColorNum);
      colorPalette2 = colorPalette2 || defaultColorPalette;
      if (!colorPalette2 || !colorPalette2.length) {
        return;
      }
      var color2 = colorPalette2[colorIdx];
      if (name) {
        colorNameMap[name] = color2;
      }
      scopeFields.colorIdx = (colorIdx + 1) % colorPalette2.length;
      return color2;
    }
  };
  var colorPalette$1 = _default$T;
  var sourceHelper = {};
  var sourceType = {};
  var SOURCE_FORMAT_ORIGINAL$4 = "original";
  var SOURCE_FORMAT_ARRAY_ROWS$2 = "arrayRows";
  var SOURCE_FORMAT_OBJECT_ROWS$2 = "objectRows";
  var SOURCE_FORMAT_KEYED_COLUMNS$2 = "keyedColumns";
  var SOURCE_FORMAT_UNKNOWN$2 = "unknown";
  var SOURCE_FORMAT_TYPED_ARRAY$3 = "typedArray";
  var SERIES_LAYOUT_BY_COLUMN$2 = "column";
  var SERIES_LAYOUT_BY_ROW$1 = "row";
  sourceType.SOURCE_FORMAT_ORIGINAL = SOURCE_FORMAT_ORIGINAL$4;
  sourceType.SOURCE_FORMAT_ARRAY_ROWS = SOURCE_FORMAT_ARRAY_ROWS$2;
  sourceType.SOURCE_FORMAT_OBJECT_ROWS = SOURCE_FORMAT_OBJECT_ROWS$2;
  sourceType.SOURCE_FORMAT_KEYED_COLUMNS = SOURCE_FORMAT_KEYED_COLUMNS$2;
  sourceType.SOURCE_FORMAT_UNKNOWN = SOURCE_FORMAT_UNKNOWN$2;
  sourceType.SOURCE_FORMAT_TYPED_ARRAY = SOURCE_FORMAT_TYPED_ARRAY$3;
  sourceType.SERIES_LAYOUT_BY_COLUMN = SERIES_LAYOUT_BY_COLUMN$2;
  sourceType.SERIES_LAYOUT_BY_ROW = SERIES_LAYOUT_BY_ROW$1;
  var _util$n = util$6;
  var createHashMap$9 = _util$n.createHashMap;
  var isTypedArray$1 = _util$n.isTypedArray;
  var _clazz = clazz;
  var enableClassCheck = _clazz.enableClassCheck;
  var _sourceType$4 = sourceType;
  var SOURCE_FORMAT_ORIGINAL$3 = _sourceType$4.SOURCE_FORMAT_ORIGINAL;
  var SERIES_LAYOUT_BY_COLUMN$1 = _sourceType$4.SERIES_LAYOUT_BY_COLUMN;
  var SOURCE_FORMAT_UNKNOWN$1 = _sourceType$4.SOURCE_FORMAT_UNKNOWN;
  var SOURCE_FORMAT_TYPED_ARRAY$2 = _sourceType$4.SOURCE_FORMAT_TYPED_ARRAY;
  var SOURCE_FORMAT_KEYED_COLUMNS$1 = _sourceType$4.SOURCE_FORMAT_KEYED_COLUMNS;
  function Source$5(fields) {
    this.fromDataset = fields.fromDataset;
    this.data = fields.data || (fields.sourceFormat === SOURCE_FORMAT_KEYED_COLUMNS$1 ? {} : []);
    this.sourceFormat = fields.sourceFormat || SOURCE_FORMAT_UNKNOWN$1;
    this.seriesLayoutBy = fields.seriesLayoutBy || SERIES_LAYOUT_BY_COLUMN$1;
    this.dimensionsDefine = fields.dimensionsDefine;
    this.encodeDefine = fields.encodeDefine && createHashMap$9(fields.encodeDefine);
    this.startIndex = fields.startIndex || 0;
    this.dimensionsDetectCount = fields.dimensionsDetectCount;
  }
  Source$5.seriesDataToSource = function(data) {
    return new Source$5({
      data,
      sourceFormat: isTypedArray$1(data) ? SOURCE_FORMAT_TYPED_ARRAY$2 : SOURCE_FORMAT_ORIGINAL$3,
      fromDataset: false
    });
  };
  enableClassCheck(Source$5);
  var _default$S = Source$5;
  var Source_1 = _default$S;
  var _model$d = model;
  var makeInner$5 = _model$d.makeInner;
  var getDataItemValue$2 = _model$d.getDataItemValue;
  var _util$m = util$6;
  var createHashMap$8 = _util$m.createHashMap;
  var each$n = _util$m.each;
  var map$8 = _util$m.map;
  var isArray$4 = _util$m.isArray;
  var isString$5 = _util$m.isString;
  var isObject$9 = _util$m.isObject;
  var isTypedArray = _util$m.isTypedArray;
  var isArrayLike = _util$m.isArrayLike;
  var extend$5 = _util$m.extend;
  _util$m.assert;
  var Source$4 = Source_1;
  var _sourceType$3 = sourceType;
  var SOURCE_FORMAT_ORIGINAL$2 = _sourceType$3.SOURCE_FORMAT_ORIGINAL;
  var SOURCE_FORMAT_ARRAY_ROWS$1 = _sourceType$3.SOURCE_FORMAT_ARRAY_ROWS;
  var SOURCE_FORMAT_OBJECT_ROWS$1 = _sourceType$3.SOURCE_FORMAT_OBJECT_ROWS;
  var SOURCE_FORMAT_KEYED_COLUMNS = _sourceType$3.SOURCE_FORMAT_KEYED_COLUMNS;
  var SOURCE_FORMAT_UNKNOWN = _sourceType$3.SOURCE_FORMAT_UNKNOWN;
  var SOURCE_FORMAT_TYPED_ARRAY$1 = _sourceType$3.SOURCE_FORMAT_TYPED_ARRAY;
  var SERIES_LAYOUT_BY_ROW = _sourceType$3.SERIES_LAYOUT_BY_ROW;
  var BE_ORDINAL$1 = {
    Must: 1,
    Might: 2,
    Not: 3
  };
  var inner$6 = makeInner$5();
  function detectSourceFormat$1(datasetModel) {
    var data = datasetModel.option.source;
    var sourceFormat = SOURCE_FORMAT_UNKNOWN;
    if (isTypedArray(data)) {
      sourceFormat = SOURCE_FORMAT_TYPED_ARRAY$1;
    } else if (isArray$4(data)) {
      if (data.length === 0) {
        sourceFormat = SOURCE_FORMAT_ARRAY_ROWS$1;
      }
      for (var i2 = 0, len2 = data.length; i2 < len2; i2++) {
        var item = data[i2];
        if (item == null) {
          continue;
        } else if (isArray$4(item)) {
          sourceFormat = SOURCE_FORMAT_ARRAY_ROWS$1;
          break;
        } else if (isObject$9(item)) {
          sourceFormat = SOURCE_FORMAT_OBJECT_ROWS$1;
          break;
        }
      }
    } else if (isObject$9(data)) {
      for (var key in data) {
        if (data.hasOwnProperty(key) && isArrayLike(data[key])) {
          sourceFormat = SOURCE_FORMAT_KEYED_COLUMNS;
          break;
        }
      }
    } else if (data != null) {
      throw new Error("Invalid data");
    }
    inner$6(datasetModel).sourceFormat = sourceFormat;
  }
  function getSource$1(seriesModel) {
    return inner$6(seriesModel).source;
  }
  function resetSourceDefaulter$1(ecModel) {
    inner$6(ecModel).datasetMap = createHashMap$8();
  }
  function prepareSource$1(seriesModel) {
    var seriesOption = seriesModel.option;
    var data = seriesOption.data;
    var sourceFormat = isTypedArray(data) ? SOURCE_FORMAT_TYPED_ARRAY$1 : SOURCE_FORMAT_ORIGINAL$2;
    var fromDataset = false;
    var seriesLayoutBy = seriesOption.seriesLayoutBy;
    var sourceHeader = seriesOption.sourceHeader;
    var dimensionsDefine = seriesOption.dimensions;
    var datasetModel = getDatasetModel(seriesModel);
    if (datasetModel) {
      var datasetOption = datasetModel.option;
      data = datasetOption.source;
      sourceFormat = inner$6(datasetModel).sourceFormat;
      fromDataset = true;
      seriesLayoutBy = seriesLayoutBy || datasetOption.seriesLayoutBy;
      sourceHeader == null && (sourceHeader = datasetOption.sourceHeader);
      dimensionsDefine = dimensionsDefine || datasetOption.dimensions;
    }
    var completeResult = completeBySourceData(data, sourceFormat, seriesLayoutBy, sourceHeader, dimensionsDefine);
    inner$6(seriesModel).source = new Source$4({
      data,
      fromDataset,
      seriesLayoutBy,
      sourceFormat,
      dimensionsDefine: completeResult.dimensionsDefine,
      startIndex: completeResult.startIndex,
      dimensionsDetectCount: completeResult.dimensionsDetectCount,
      encodeDefine: seriesOption.encode
    });
  }
  function completeBySourceData(data, sourceFormat, seriesLayoutBy, sourceHeader, dimensionsDefine) {
    if (!data) {
      return {
        dimensionsDefine: normalizeDimensionsDefine(dimensionsDefine)
      };
    }
    var dimensionsDetectCount;
    var startIndex;
    if (sourceFormat === SOURCE_FORMAT_ARRAY_ROWS$1) {
      if (sourceHeader === "auto" || sourceHeader == null) {
        arrayRowsTravelFirst(function(val) {
          if (val != null && val !== "-") {
            if (isString$5(val)) {
              startIndex == null && (startIndex = 1);
            } else {
              startIndex = 0;
            }
          }
        }, seriesLayoutBy, data, 10);
      } else {
        startIndex = sourceHeader ? 1 : 0;
      }
      if (!dimensionsDefine && startIndex === 1) {
        dimensionsDefine = [];
        arrayRowsTravelFirst(function(val, index2) {
          dimensionsDefine[index2] = val != null ? val : "";
        }, seriesLayoutBy, data);
      }
      dimensionsDetectCount = dimensionsDefine ? dimensionsDefine.length : seriesLayoutBy === SERIES_LAYOUT_BY_ROW ? data.length : data[0] ? data[0].length : null;
    } else if (sourceFormat === SOURCE_FORMAT_OBJECT_ROWS$1) {
      if (!dimensionsDefine) {
        dimensionsDefine = objectRowsCollectDimensions(data);
      }
    } else if (sourceFormat === SOURCE_FORMAT_KEYED_COLUMNS) {
      if (!dimensionsDefine) {
        dimensionsDefine = [];
        each$n(data, function(colArr, key) {
          dimensionsDefine.push(key);
        });
      }
    } else if (sourceFormat === SOURCE_FORMAT_ORIGINAL$2) {
      var value0 = getDataItemValue$2(data[0]);
      dimensionsDetectCount = isArray$4(value0) && value0.length || 1;
    } else
      ;
    return {
      startIndex,
      dimensionsDefine: normalizeDimensionsDefine(dimensionsDefine),
      dimensionsDetectCount
    };
  }
  function normalizeDimensionsDefine(dimensionsDefine) {
    if (!dimensionsDefine) {
      return;
    }
    var nameMap = createHashMap$8();
    return map$8(dimensionsDefine, function(item, index2) {
      item = extend$5({}, isObject$9(item) ? item : {
        name: item
      });
      if (item.name == null) {
        return item;
      }
      item.name += "";
      if (item.displayName == null) {
        item.displayName = item.name;
      }
      var exist = nameMap.get(item.name);
      if (!exist) {
        nameMap.set(item.name, {
          count: 1
        });
      } else {
        item.name += "-" + exist.count++;
      }
      return item;
    });
  }
  function arrayRowsTravelFirst(cb, seriesLayoutBy, data, maxLoop) {
    maxLoop == null && (maxLoop = Infinity);
    if (seriesLayoutBy === SERIES_LAYOUT_BY_ROW) {
      for (var i2 = 0; i2 < data.length && i2 < maxLoop; i2++) {
        cb(data[i2] ? data[i2][0] : null, i2);
      }
    } else {
      var value0 = data[0] || [];
      for (var i2 = 0; i2 < value0.length && i2 < maxLoop; i2++) {
        cb(value0[i2], i2);
      }
    }
  }
  function objectRowsCollectDimensions(data) {
    var firstIndex = 0;
    var obj;
    while (firstIndex < data.length && !(obj = data[firstIndex++])) {
    }
    if (obj) {
      var dimensions = [];
      each$n(obj, function(value, key) {
        dimensions.push(key);
      });
      return dimensions;
    }
  }
  function makeSeriesEncodeForAxisCoordSys$1(coordDimensions, seriesModel, source) {
    var encode = {};
    var datasetModel = getDatasetModel(seriesModel);
    if (!datasetModel || !coordDimensions) {
      return encode;
    }
    var encodeItemName = [];
    var encodeSeriesName = [];
    var ecModel = seriesModel.ecModel;
    var datasetMap = inner$6(ecModel).datasetMap;
    var key = datasetModel.uid + "_" + source.seriesLayoutBy;
    var baseCategoryDimIndex;
    var categoryWayValueDimStart;
    coordDimensions = coordDimensions.slice();
    each$n(coordDimensions, function(coordDimInfo, coordDimIdx) {
      !isObject$9(coordDimInfo) && (coordDimensions[coordDimIdx] = {
        name: coordDimInfo
      });
      if (coordDimInfo.type === "ordinal" && baseCategoryDimIndex == null) {
        baseCategoryDimIndex = coordDimIdx;
        categoryWayValueDimStart = getDataDimCountOnCoordDim(coordDimensions[coordDimIdx]);
      }
      encode[coordDimInfo.name] = [];
    });
    var datasetRecord = datasetMap.get(key) || datasetMap.set(key, {
      categoryWayDim: categoryWayValueDimStart,
      valueWayDim: 0
    });
    each$n(coordDimensions, function(coordDimInfo, coordDimIdx) {
      var coordDimName = coordDimInfo.name;
      var count = getDataDimCountOnCoordDim(coordDimInfo);
      if (baseCategoryDimIndex == null) {
        var start2 = datasetRecord.valueWayDim;
        pushDim(encode[coordDimName], start2, count);
        pushDim(encodeSeriesName, start2, count);
        datasetRecord.valueWayDim += count;
      } else if (baseCategoryDimIndex === coordDimIdx) {
        pushDim(encode[coordDimName], 0, count);
        pushDim(encodeItemName, 0, count);
      } else {
        var start2 = datasetRecord.categoryWayDim;
        pushDim(encode[coordDimName], start2, count);
        pushDim(encodeSeriesName, start2, count);
        datasetRecord.categoryWayDim += count;
      }
    });
    function pushDim(dimIdxArr, idxFrom, idxCount) {
      for (var i2 = 0; i2 < idxCount; i2++) {
        dimIdxArr.push(idxFrom + i2);
      }
    }
    function getDataDimCountOnCoordDim(coordDimInfo) {
      var dimsDef = coordDimInfo.dimsDef;
      return dimsDef ? dimsDef.length : 1;
    }
    encodeItemName.length && (encode.itemName = encodeItemName);
    encodeSeriesName.length && (encode.seriesName = encodeSeriesName);
    return encode;
  }
  function makeSeriesEncodeForNameBased(seriesModel, source, dimCount) {
    var encode = {};
    var datasetModel = getDatasetModel(seriesModel);
    if (!datasetModel) {
      return encode;
    }
    var sourceFormat = source.sourceFormat;
    var dimensionsDefine = source.dimensionsDefine;
    var potentialNameDimIndex;
    if (sourceFormat === SOURCE_FORMAT_OBJECT_ROWS$1 || sourceFormat === SOURCE_FORMAT_KEYED_COLUMNS) {
      each$n(dimensionsDefine, function(dim, idx) {
        if ((isObject$9(dim) ? dim.name : dim) === "name") {
          potentialNameDimIndex = idx;
        }
      });
    }
    var idxResult = function() {
      var idxRes0 = {};
      var idxRes1 = {};
      var guessRecords = [];
      for (var i2 = 0, len2 = Math.min(5, dimCount); i2 < len2; i2++) {
        var guessResult = doGuessOrdinal(source.data, sourceFormat, source.seriesLayoutBy, dimensionsDefine, source.startIndex, i2);
        guessRecords.push(guessResult);
        var isPureNumber = guessResult === BE_ORDINAL$1.Not;
        if (isPureNumber && idxRes0.v == null && i2 !== potentialNameDimIndex) {
          idxRes0.v = i2;
        }
        if (idxRes0.n == null || idxRes0.n === idxRes0.v || !isPureNumber && guessRecords[idxRes0.n] === BE_ORDINAL$1.Not) {
          idxRes0.n = i2;
        }
        if (fulfilled(idxRes0) && guessRecords[idxRes0.n] !== BE_ORDINAL$1.Not) {
          return idxRes0;
        }
        if (!isPureNumber) {
          if (guessResult === BE_ORDINAL$1.Might && idxRes1.v == null && i2 !== potentialNameDimIndex) {
            idxRes1.v = i2;
          }
          if (idxRes1.n == null || idxRes1.n === idxRes1.v) {
            idxRes1.n = i2;
          }
        }
      }
      function fulfilled(idxResult2) {
        return idxResult2.v != null && idxResult2.n != null;
      }
      return fulfilled(idxRes0) ? idxRes0 : fulfilled(idxRes1) ? idxRes1 : null;
    }();
    if (idxResult) {
      encode.value = idxResult.v;
      var nameDimIndex = potentialNameDimIndex != null ? potentialNameDimIndex : idxResult.n;
      encode.itemName = [nameDimIndex];
      encode.seriesName = [nameDimIndex];
    }
    return encode;
  }
  function getDatasetModel(seriesModel) {
    var option = seriesModel.option;
    var thisData = option.data;
    if (!thisData) {
      return seriesModel.ecModel.getComponent("dataset", option.datasetIndex || 0);
    }
  }
  function guessOrdinal$1(source, dimIndex) {
    return doGuessOrdinal(source.data, source.sourceFormat, source.seriesLayoutBy, source.dimensionsDefine, source.startIndex, dimIndex);
  }
  function doGuessOrdinal(data, sourceFormat, seriesLayoutBy, dimensionsDefine, startIndex, dimIndex) {
    var result;
    var maxLoop = 5;
    if (isTypedArray(data)) {
      return BE_ORDINAL$1.Not;
    }
    var dimName;
    var dimType;
    if (dimensionsDefine) {
      var dimDefItem = dimensionsDefine[dimIndex];
      if (isObject$9(dimDefItem)) {
        dimName = dimDefItem.name;
        dimType = dimDefItem.type;
      } else if (isString$5(dimDefItem)) {
        dimName = dimDefItem;
      }
    }
    if (dimType != null) {
      return dimType === "ordinal" ? BE_ORDINAL$1.Must : BE_ORDINAL$1.Not;
    }
    if (sourceFormat === SOURCE_FORMAT_ARRAY_ROWS$1) {
      if (seriesLayoutBy === SERIES_LAYOUT_BY_ROW) {
        var sample = data[dimIndex];
        for (var i2 = 0; i2 < (sample || []).length && i2 < maxLoop; i2++) {
          if ((result = detectValue(sample[startIndex + i2])) != null) {
            return result;
          }
        }
      } else {
        for (var i2 = 0; i2 < data.length && i2 < maxLoop; i2++) {
          var row = data[startIndex + i2];
          if (row && (result = detectValue(row[dimIndex])) != null) {
            return result;
          }
        }
      }
    } else if (sourceFormat === SOURCE_FORMAT_OBJECT_ROWS$1) {
      if (!dimName) {
        return BE_ORDINAL$1.Not;
      }
      for (var i2 = 0; i2 < data.length && i2 < maxLoop; i2++) {
        var item = data[i2];
        if (item && (result = detectValue(item[dimName])) != null) {
          return result;
        }
      }
    } else if (sourceFormat === SOURCE_FORMAT_KEYED_COLUMNS) {
      if (!dimName) {
        return BE_ORDINAL$1.Not;
      }
      var sample = data[dimName];
      if (!sample || isTypedArray(sample)) {
        return BE_ORDINAL$1.Not;
      }
      for (var i2 = 0; i2 < sample.length && i2 < maxLoop; i2++) {
        if ((result = detectValue(sample[i2])) != null) {
          return result;
        }
      }
    } else if (sourceFormat === SOURCE_FORMAT_ORIGINAL$2) {
      for (var i2 = 0; i2 < data.length && i2 < maxLoop; i2++) {
        var item = data[i2];
        var val = getDataItemValue$2(item);
        if (!isArray$4(val)) {
          return BE_ORDINAL$1.Not;
        }
        if ((result = detectValue(val[dimIndex])) != null) {
          return result;
        }
      }
    }
    function detectValue(val2) {
      var beStr = isString$5(val2);
      if (val2 != null && isFinite(val2) && val2 !== "") {
        return beStr ? BE_ORDINAL$1.Might : BE_ORDINAL$1.Not;
      } else if (beStr && val2 !== "-") {
        return BE_ORDINAL$1.Must;
      }
    }
    return BE_ORDINAL$1.Not;
  }
  sourceHelper.BE_ORDINAL = BE_ORDINAL$1;
  sourceHelper.detectSourceFormat = detectSourceFormat$1;
  sourceHelper.getSource = getSource$1;
  sourceHelper.resetSourceDefaulter = resetSourceDefaulter$1;
  sourceHelper.prepareSource = prepareSource$1;
  sourceHelper.makeSeriesEncodeForAxisCoordSys = makeSeriesEncodeForAxisCoordSys$1;
  sourceHelper.makeSeriesEncodeForNameBased = makeSeriesEncodeForNameBased;
  sourceHelper.guessOrdinal = guessOrdinal$1;
  var _util$l = util$6;
  var each$m = _util$l.each;
  var filter = _util$l.filter;
  var map$7 = _util$l.map;
  var isArray$3 = _util$l.isArray;
  var indexOf$1 = _util$l.indexOf;
  var isObject$8 = _util$l.isObject;
  var isString$4 = _util$l.isString;
  var createHashMap$7 = _util$l.createHashMap;
  var assert = _util$l.assert;
  var clone$3 = _util$l.clone;
  var merge$1 = _util$l.merge;
  var extend$4 = _util$l.extend;
  var mixin = _util$l.mixin;
  var modelUtil$6 = model;
  var Model$6 = Model_1;
  var ComponentModel$6 = Component$2;
  var globalDefault = globalDefault$1;
  var colorPaletteMixin$1 = colorPalette$1;
  var _sourceHelper$4 = sourceHelper;
  var resetSourceDefaulter = _sourceHelper$4.resetSourceDefaulter;
  var OPTION_INNER_KEY = "\0_ec_inner";
  var GlobalModel$1 = Model$6.extend({
    init: function(option, parentModel, theme2, optionManager) {
      theme2 = theme2 || {};
      this.option = null;
      this._theme = new Model$6(theme2);
      this._optionManager = optionManager;
    },
    setOption: function(option, optionPreprocessorFuncs) {
      assert(!(OPTION_INNER_KEY in option), "please use chart.getOption()");
      this._optionManager.setOption(option, optionPreprocessorFuncs);
      this.resetOption(null);
    },
    resetOption: function(type) {
      var optionChanged = false;
      var optionManager = this._optionManager;
      if (!type || type === "recreate") {
        var baseOption = optionManager.mountOption(type === "recreate");
        if (!this.option || type === "recreate") {
          initBase.call(this, baseOption);
        } else {
          this.restoreData();
          this.mergeOption(baseOption);
        }
        optionChanged = true;
      }
      if (type === "timeline" || type === "media") {
        this.restoreData();
      }
      if (!type || type === "recreate" || type === "timeline") {
        var timelineOption = optionManager.getTimelineOption(this);
        timelineOption && (this.mergeOption(timelineOption), optionChanged = true);
      }
      if (!type || type === "recreate" || type === "media") {
        var mediaOptions = optionManager.getMediaOption(this, this._api);
        if (mediaOptions.length) {
          each$m(mediaOptions, function(mediaOption) {
            this.mergeOption(mediaOption, optionChanged = true);
          }, this);
        }
      }
      return optionChanged;
    },
    mergeOption: function(newOption) {
      var option = this.option;
      var componentsMap = this._componentsMap;
      var newCptTypes = [];
      resetSourceDefaulter(this);
      each$m(newOption, function(componentOption, mainType) {
        if (componentOption == null) {
          return;
        }
        if (!ComponentModel$6.hasClass(mainType)) {
          option[mainType] = option[mainType] == null ? clone$3(componentOption) : merge$1(option[mainType], componentOption, true);
        } else if (mainType) {
          newCptTypes.push(mainType);
        }
      });
      ComponentModel$6.topologicalTravel(newCptTypes, ComponentModel$6.getAllClassMainTypes(), visitComponent, this);
      function visitComponent(mainType, dependencies) {
        var newCptOptionList = modelUtil$6.normalizeToArray(newOption[mainType]);
        var mapResult = modelUtil$6.mappingToExists(componentsMap.get(mainType), newCptOptionList);
        modelUtil$6.makeIdAndName(mapResult);
        each$m(mapResult, function(item, index2) {
          var opt = item.option;
          if (isObject$8(opt)) {
            item.keyInfo.mainType = mainType;
            item.keyInfo.subType = determineSubType(mainType, opt, item.exist);
          }
        });
        var dependentModels = getComponentsByTypes(componentsMap, dependencies);
        option[mainType] = [];
        componentsMap.set(mainType, []);
        each$m(mapResult, function(resultItem, index2) {
          var componentModel = resultItem.exist;
          var newCptOption = resultItem.option;
          assert(isObject$8(newCptOption) || componentModel, "Empty component definition");
          if (!newCptOption) {
            componentModel.mergeOption({}, this);
            componentModel.optionUpdated({}, false);
          } else {
            var ComponentModelClass = ComponentModel$6.getClass(mainType, resultItem.keyInfo.subType, true);
            if (componentModel && componentModel.constructor === ComponentModelClass) {
              componentModel.name = resultItem.keyInfo.name;
              componentModel.mergeOption(newCptOption, this);
              componentModel.optionUpdated(newCptOption, false);
            } else {
              var extraOpt = extend$4({
                dependentModels,
                componentIndex: index2
              }, resultItem.keyInfo);
              componentModel = new ComponentModelClass(newCptOption, this, this, extraOpt);
              extend$4(componentModel, extraOpt);
              componentModel.init(newCptOption, this, this, extraOpt);
              componentModel.optionUpdated(null, true);
            }
          }
          componentsMap.get(mainType)[index2] = componentModel;
          option[mainType][index2] = componentModel.option;
        }, this);
        if (mainType === "series") {
          createSeriesIndices(this, componentsMap.get("series"));
        }
      }
      this._seriesIndicesMap = createHashMap$7(this._seriesIndices = this._seriesIndices || []);
    },
    getOption: function() {
      var option = clone$3(this.option);
      each$m(option, function(opts, mainType) {
        if (ComponentModel$6.hasClass(mainType)) {
          var opts = modelUtil$6.normalizeToArray(opts);
          for (var i2 = opts.length - 1; i2 >= 0; i2--) {
            if (modelUtil$6.isIdInner(opts[i2])) {
              opts.splice(i2, 1);
            }
          }
          option[mainType] = opts;
        }
      });
      delete option[OPTION_INNER_KEY];
      return option;
    },
    getTheme: function() {
      return this._theme;
    },
    getComponent: function(mainType, idx) {
      var list = this._componentsMap.get(mainType);
      if (list) {
        return list[idx || 0];
      }
    },
    queryComponents: function(condition) {
      var mainType = condition.mainType;
      if (!mainType) {
        return [];
      }
      var index2 = condition.index;
      var id = condition.id;
      var name = condition.name;
      var cpts = this._componentsMap.get(mainType);
      if (!cpts || !cpts.length) {
        return [];
      }
      var result;
      if (index2 != null) {
        if (!isArray$3(index2)) {
          index2 = [index2];
        }
        result = filter(map$7(index2, function(idx) {
          return cpts[idx];
        }), function(val) {
          return !!val;
        });
      } else if (id != null) {
        var isIdArray = isArray$3(id);
        result = filter(cpts, function(cpt) {
          return isIdArray && indexOf$1(id, cpt.id) >= 0 || !isIdArray && cpt.id === id;
        });
      } else if (name != null) {
        var isNameArray = isArray$3(name);
        result = filter(cpts, function(cpt) {
          return isNameArray && indexOf$1(name, cpt.name) >= 0 || !isNameArray && cpt.name === name;
        });
      } else {
        result = cpts.slice();
      }
      return filterBySubType(result, condition);
    },
    findComponents: function(condition) {
      var query = condition.query;
      var mainType = condition.mainType;
      var queryCond = getQueryCond(query);
      var result = queryCond ? this.queryComponents(queryCond) : this._componentsMap.get(mainType);
      return doFilter(filterBySubType(result, condition));
      function getQueryCond(q) {
        var indexAttr = mainType + "Index";
        var idAttr = mainType + "Id";
        var nameAttr = mainType + "Name";
        return q && (q[indexAttr] != null || q[idAttr] != null || q[nameAttr] != null) ? {
          mainType,
          index: q[indexAttr],
          id: q[idAttr],
          name: q[nameAttr]
        } : null;
      }
      function doFilter(res) {
        return condition.filter ? filter(res, condition.filter) : res;
      }
    },
    eachComponent: function(mainType, cb, context) {
      var componentsMap = this._componentsMap;
      if (typeof mainType === "function") {
        context = cb;
        cb = mainType;
        componentsMap.each(function(components, componentType) {
          each$m(components, function(component2, index2) {
            cb.call(context, componentType, component2, index2);
          });
        });
      } else if (isString$4(mainType)) {
        each$m(componentsMap.get(mainType), cb, context);
      } else if (isObject$8(mainType)) {
        var queryResult = this.findComponents(mainType);
        each$m(queryResult, cb, context);
      }
    },
    getSeriesByName: function(name) {
      var series = this._componentsMap.get("series");
      return filter(series, function(oneSeries) {
        return oneSeries.name === name;
      });
    },
    getSeriesByIndex: function(seriesIndex) {
      return this._componentsMap.get("series")[seriesIndex];
    },
    getSeriesByType: function(subType) {
      var series = this._componentsMap.get("series");
      return filter(series, function(oneSeries) {
        return oneSeries.subType === subType;
      });
    },
    getSeries: function() {
      return this._componentsMap.get("series").slice();
    },
    getSeriesCount: function() {
      return this._componentsMap.get("series").length;
    },
    eachSeries: function(cb, context) {
      each$m(this._seriesIndices, function(rawSeriesIndex) {
        var series = this._componentsMap.get("series")[rawSeriesIndex];
        cb.call(context, series, rawSeriesIndex);
      }, this);
    },
    eachRawSeries: function(cb, context) {
      each$m(this._componentsMap.get("series"), cb, context);
    },
    eachSeriesByType: function(subType, cb, context) {
      each$m(this._seriesIndices, function(rawSeriesIndex) {
        var series = this._componentsMap.get("series")[rawSeriesIndex];
        if (series.subType === subType) {
          cb.call(context, series, rawSeriesIndex);
        }
      }, this);
    },
    eachRawSeriesByType: function(subType, cb, context) {
      return each$m(this.getSeriesByType(subType), cb, context);
    },
    isSeriesFiltered: function(seriesModel) {
      return this._seriesIndicesMap.get(seriesModel.componentIndex) == null;
    },
    getCurrentSeriesIndices: function() {
      return (this._seriesIndices || []).slice();
    },
    filterSeries: function(cb, context) {
      var filteredSeries = filter(this._componentsMap.get("series"), cb, context);
      createSeriesIndices(this, filteredSeries);
    },
    restoreData: function(payload) {
      var componentsMap = this._componentsMap;
      createSeriesIndices(this, componentsMap.get("series"));
      var componentTypes = [];
      componentsMap.each(function(components, componentType) {
        componentTypes.push(componentType);
      });
      ComponentModel$6.topologicalTravel(componentTypes, ComponentModel$6.getAllClassMainTypes(), function(componentType, dependencies) {
        each$m(componentsMap.get(componentType), function(component2) {
          (componentType !== "series" || !isNotTargetSeries(component2, payload)) && component2.restoreData();
        });
      });
    }
  });
  function isNotTargetSeries(seriesModel, payload) {
    if (payload) {
      var index2 = payload.seiresIndex;
      var id = payload.seriesId;
      var name = payload.seriesName;
      return index2 != null && seriesModel.componentIndex !== index2 || id != null && seriesModel.id !== id || name != null && seriesModel.name !== name;
    }
  }
  function mergeTheme(option, theme2) {
    var notMergeColorLayer = option.color && !option.colorLayer;
    each$m(theme2, function(themeItem, name) {
      if (name === "colorLayer" && notMergeColorLayer) {
        return;
      }
      if (!ComponentModel$6.hasClass(name)) {
        if (typeof themeItem === "object") {
          option[name] = !option[name] ? clone$3(themeItem) : merge$1(option[name], themeItem, false);
        } else {
          if (option[name] == null) {
            option[name] = themeItem;
          }
        }
      }
    });
  }
  function initBase(baseOption) {
    baseOption = baseOption;
    this.option = {};
    this.option[OPTION_INNER_KEY] = 1;
    this._componentsMap = createHashMap$7({
      series: []
    });
    this._seriesIndices;
    this._seriesIndicesMap;
    mergeTheme(baseOption, this._theme.option);
    merge$1(baseOption, globalDefault, false);
    this.mergeOption(baseOption);
  }
  function getComponentsByTypes(componentsMap, types) {
    if (!isArray$3(types)) {
      types = types ? [types] : [];
    }
    var ret = {};
    each$m(types, function(type) {
      ret[type] = (componentsMap.get(type) || []).slice();
    });
    return ret;
  }
  function determineSubType(mainType, newCptOption, existComponent) {
    var subType = newCptOption.type ? newCptOption.type : existComponent ? existComponent.subType : ComponentModel$6.determineSubType(mainType, newCptOption);
    return subType;
  }
  function createSeriesIndices(ecModel, seriesModels) {
    ecModel._seriesIndicesMap = createHashMap$7(ecModel._seriesIndices = map$7(seriesModels, function(series) {
      return series.componentIndex;
    }) || []);
  }
  function filterBySubType(components, condition) {
    return condition.hasOwnProperty("subType") ? filter(components, function(cpt) {
      return cpt.subType === condition.subType;
    }) : components;
  }
  mixin(GlobalModel$1, colorPaletteMixin$1);
  var _default$R = GlobalModel$1;
  var Global = _default$R;
  var zrUtil$J = util$6;
  var echartsAPIList = ["getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getModel", "getOption", "getViewOfComponentModel", "getViewOfSeriesModel"];
  function ExtensionAPI$1(chartInstance) {
    zrUtil$J.each(echartsAPIList, function(name) {
      this[name] = zrUtil$J.bind(chartInstance[name], chartInstance);
    }, this);
  }
  var _default$Q = ExtensionAPI$1;
  var ExtensionAPI_1 = _default$Q;
  var zrUtil$I = util$6;
  var coordinateSystemCreators = {};
  function CoordinateSystemManager() {
    this._coordinateSystems = [];
  }
  CoordinateSystemManager.prototype = {
    constructor: CoordinateSystemManager,
    create: function(ecModel, api) {
      var coordinateSystems = [];
      zrUtil$I.each(coordinateSystemCreators, function(creater, type) {
        var list = creater.create(ecModel, api);
        coordinateSystems = coordinateSystems.concat(list || []);
      });
      this._coordinateSystems = coordinateSystems;
    },
    update: function(ecModel, api) {
      zrUtil$I.each(this._coordinateSystems, function(coordSys) {
        coordSys.update && coordSys.update(ecModel, api);
      });
    },
    getCoordinateSystems: function() {
      return this._coordinateSystems.slice();
    }
  };
  CoordinateSystemManager.register = function(type, coordinateSystemCreator) {
    coordinateSystemCreators[type] = coordinateSystemCreator;
  };
  CoordinateSystemManager.get = function(type) {
    return coordinateSystemCreators[type];
  };
  var _default$P = CoordinateSystemManager;
  var CoordinateSystem$2 = _default$P;
  var zrUtil$H = util$6;
  var modelUtil$5 = model;
  var ComponentModel$5 = Component$2;
  var each$l = zrUtil$H.each;
  var clone$2 = zrUtil$H.clone;
  var map$6 = zrUtil$H.map;
  var merge = zrUtil$H.merge;
  var QUERY_REG = /^(min|max)?(.+)$/;
  function OptionManager(api) {
    this._api = api;
    this._timelineOptions = [];
    this._mediaList = [];
    this._mediaDefault;
    this._currentMediaIndices = [];
    this._optionBackup;
    this._newBaseOption;
  }
  OptionManager.prototype = {
    constructor: OptionManager,
    setOption: function(rawOption, optionPreprocessorFuncs) {
      if (rawOption) {
        zrUtil$H.each(modelUtil$5.normalizeToArray(rawOption.series), function(series) {
          series && series.data && zrUtil$H.isTypedArray(series.data) && zrUtil$H.setAsPrimitive(series.data);
        });
      }
      rawOption = clone$2(rawOption);
      var oldOptionBackup = this._optionBackup;
      var newParsedOption = parseRawOption.call(this, rawOption, optionPreprocessorFuncs, !oldOptionBackup);
      this._newBaseOption = newParsedOption.baseOption;
      if (oldOptionBackup) {
        mergeOption(oldOptionBackup.baseOption, newParsedOption.baseOption);
        if (newParsedOption.timelineOptions.length) {
          oldOptionBackup.timelineOptions = newParsedOption.timelineOptions;
        }
        if (newParsedOption.mediaList.length) {
          oldOptionBackup.mediaList = newParsedOption.mediaList;
        }
        if (newParsedOption.mediaDefault) {
          oldOptionBackup.mediaDefault = newParsedOption.mediaDefault;
        }
      } else {
        this._optionBackup = newParsedOption;
      }
    },
    mountOption: function(isRecreate) {
      var optionBackup = this._optionBackup;
      this._timelineOptions = map$6(optionBackup.timelineOptions, clone$2);
      this._mediaList = map$6(optionBackup.mediaList, clone$2);
      this._mediaDefault = clone$2(optionBackup.mediaDefault);
      this._currentMediaIndices = [];
      return clone$2(isRecreate ? optionBackup.baseOption : this._newBaseOption);
    },
    getTimelineOption: function(ecModel) {
      var option;
      var timelineOptions = this._timelineOptions;
      if (timelineOptions.length) {
        var timelineModel = ecModel.getComponent("timeline");
        if (timelineModel) {
          option = clone$2(timelineOptions[timelineModel.getCurrentIndex()], true);
        }
      }
      return option;
    },
    getMediaOption: function(ecModel) {
      var ecWidth = this._api.getWidth();
      var ecHeight = this._api.getHeight();
      var mediaList = this._mediaList;
      var mediaDefault = this._mediaDefault;
      var indices = [];
      var result = [];
      if (!mediaList.length && !mediaDefault) {
        return result;
      }
      for (var i2 = 0, len2 = mediaList.length; i2 < len2; i2++) {
        if (applyMediaQuery(mediaList[i2].query, ecWidth, ecHeight)) {
          indices.push(i2);
        }
      }
      if (!indices.length && mediaDefault) {
        indices = [-1];
      }
      if (indices.length && !indicesEquals(indices, this._currentMediaIndices)) {
        result = map$6(indices, function(index2) {
          return clone$2(index2 === -1 ? mediaDefault.option : mediaList[index2].option);
        });
      }
      this._currentMediaIndices = indices;
      return result;
    }
  };
  function parseRawOption(rawOption, optionPreprocessorFuncs, isNew) {
    var timelineOptions = [];
    var mediaList = [];
    var mediaDefault;
    var baseOption;
    var timelineOpt = rawOption.timeline;
    if (rawOption.baseOption) {
      baseOption = rawOption.baseOption;
    }
    if (timelineOpt || rawOption.options) {
      baseOption = baseOption || {};
      timelineOptions = (rawOption.options || []).slice();
    }
    if (rawOption.media) {
      baseOption = baseOption || {};
      var media = rawOption.media;
      each$l(media, function(singleMedia) {
        if (singleMedia && singleMedia.option) {
          if (singleMedia.query) {
            mediaList.push(singleMedia);
          } else if (!mediaDefault) {
            mediaDefault = singleMedia;
          }
        }
      });
    }
    if (!baseOption) {
      baseOption = rawOption;
    }
    if (!baseOption.timeline) {
      baseOption.timeline = timelineOpt;
    }
    each$l([baseOption].concat(timelineOptions).concat(zrUtil$H.map(mediaList, function(media2) {
      return media2.option;
    })), function(option) {
      each$l(optionPreprocessorFuncs, function(preProcess) {
        preProcess(option, isNew);
      });
    });
    return {
      baseOption,
      timelineOptions,
      mediaDefault,
      mediaList
    };
  }
  function applyMediaQuery(query, ecWidth, ecHeight) {
    var realMap = {
      width: ecWidth,
      height: ecHeight,
      aspectratio: ecWidth / ecHeight
    };
    var applicatable = true;
    zrUtil$H.each(query, function(value, attr) {
      var matched = attr.match(QUERY_REG);
      if (!matched || !matched[1] || !matched[2]) {
        return;
      }
      var operator = matched[1];
      var realAttr = matched[2].toLowerCase();
      if (!compare(realMap[realAttr], value, operator)) {
        applicatable = false;
      }
    });
    return applicatable;
  }
  function compare(real, expect, operator) {
    if (operator === "min") {
      return real >= expect;
    } else if (operator === "max") {
      return real <= expect;
    } else {
      return real === expect;
    }
  }
  function indicesEquals(indices1, indices2) {
    return indices1.join(",") === indices2.join(",");
  }
  function mergeOption(oldOption, newOption) {
    newOption = newOption || {};
    each$l(newOption, function(newCptOpt, mainType) {
      if (newCptOpt == null) {
        return;
      }
      var oldCptOpt = oldOption[mainType];
      if (!ComponentModel$5.hasClass(mainType)) {
        oldOption[mainType] = merge(oldCptOpt, newCptOpt, true);
      } else {
        newCptOpt = modelUtil$5.normalizeToArray(newCptOpt);
        oldCptOpt = modelUtil$5.normalizeToArray(oldCptOpt);
        var mapResult = modelUtil$5.mappingToExists(oldCptOpt, newCptOpt);
        oldOption[mainType] = map$6(mapResult, function(item) {
          return item.option && item.exist ? merge(item.exist, item.option, true) : item.exist || item.option;
        });
      }
    });
  }
  var _default$O = OptionManager;
  var OptionManager_1 = _default$O;
  var zrUtil$G = util$6;
  var modelUtil$4 = model;
  var each$k = zrUtil$G.each;
  var isObject$7 = zrUtil$G.isObject;
  var POSSIBLE_STYLES = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
  function compatEC2ItemStyle(opt) {
    var itemStyleOpt = opt && opt.itemStyle;
    if (!itemStyleOpt) {
      return;
    }
    for (var i2 = 0, len2 = POSSIBLE_STYLES.length; i2 < len2; i2++) {
      var styleName = POSSIBLE_STYLES[i2];
      var normalItemStyleOpt = itemStyleOpt.normal;
      var emphasisItemStyleOpt = itemStyleOpt.emphasis;
      if (normalItemStyleOpt && normalItemStyleOpt[styleName]) {
        opt[styleName] = opt[styleName] || {};
        if (!opt[styleName].normal) {
          opt[styleName].normal = normalItemStyleOpt[styleName];
        } else {
          zrUtil$G.merge(opt[styleName].normal, normalItemStyleOpt[styleName]);
        }
        normalItemStyleOpt[styleName] = null;
      }
      if (emphasisItemStyleOpt && emphasisItemStyleOpt[styleName]) {
        opt[styleName] = opt[styleName] || {};
        if (!opt[styleName].emphasis) {
          opt[styleName].emphasis = emphasisItemStyleOpt[styleName];
        } else {
          zrUtil$G.merge(opt[styleName].emphasis, emphasisItemStyleOpt[styleName]);
        }
        emphasisItemStyleOpt[styleName] = null;
      }
    }
  }
  function convertNormalEmphasis(opt, optType, useExtend) {
    if (opt && opt[optType] && (opt[optType].normal || opt[optType].emphasis)) {
      var normalOpt = opt[optType].normal;
      var emphasisOpt = opt[optType].emphasis;
      if (normalOpt) {
        if (useExtend) {
          opt[optType].normal = opt[optType].emphasis = null;
          zrUtil$G.defaults(opt[optType], normalOpt);
        } else {
          opt[optType] = normalOpt;
        }
      }
      if (emphasisOpt) {
        opt.emphasis = opt.emphasis || {};
        opt.emphasis[optType] = emphasisOpt;
      }
    }
  }
  function removeEC3NormalStatus(opt) {
    convertNormalEmphasis(opt, "itemStyle");
    convertNormalEmphasis(opt, "lineStyle");
    convertNormalEmphasis(opt, "areaStyle");
    convertNormalEmphasis(opt, "label");
    convertNormalEmphasis(opt, "labelLine");
    convertNormalEmphasis(opt, "upperLabel");
    convertNormalEmphasis(opt, "edgeLabel");
  }
  function compatTextStyle(opt, propName) {
    var labelOptSingle = isObject$7(opt) && opt[propName];
    var textStyle2 = isObject$7(labelOptSingle) && labelOptSingle.textStyle;
    if (textStyle2) {
      for (var i2 = 0, len2 = modelUtil$4.TEXT_STYLE_OPTIONS.length; i2 < len2; i2++) {
        var propName = modelUtil$4.TEXT_STYLE_OPTIONS[i2];
        if (textStyle2.hasOwnProperty(propName)) {
          labelOptSingle[propName] = textStyle2[propName];
        }
      }
    }
  }
  function compatEC3CommonStyles(opt) {
    if (opt) {
      removeEC3NormalStatus(opt);
      compatTextStyle(opt, "label");
      opt.emphasis && compatTextStyle(opt.emphasis, "label");
    }
  }
  function processSeries(seriesOpt) {
    if (!isObject$7(seriesOpt)) {
      return;
    }
    compatEC2ItemStyle(seriesOpt);
    removeEC3NormalStatus(seriesOpt);
    compatTextStyle(seriesOpt, "label");
    compatTextStyle(seriesOpt, "upperLabel");
    compatTextStyle(seriesOpt, "edgeLabel");
    if (seriesOpt.emphasis) {
      compatTextStyle(seriesOpt.emphasis, "label");
      compatTextStyle(seriesOpt.emphasis, "upperLabel");
      compatTextStyle(seriesOpt.emphasis, "edgeLabel");
    }
    var markPoint = seriesOpt.markPoint;
    if (markPoint) {
      compatEC2ItemStyle(markPoint);
      compatEC3CommonStyles(markPoint);
    }
    var markLine = seriesOpt.markLine;
    if (markLine) {
      compatEC2ItemStyle(markLine);
      compatEC3CommonStyles(markLine);
    }
    var markArea = seriesOpt.markArea;
    if (markArea) {
      compatEC3CommonStyles(markArea);
    }
    var data = seriesOpt.data;
    if (seriesOpt.type === "graph") {
      data = data || seriesOpt.nodes;
      var edgeData = seriesOpt.links || seriesOpt.edges;
      if (edgeData && !zrUtil$G.isTypedArray(edgeData)) {
        for (var i2 = 0; i2 < edgeData.length; i2++) {
          compatEC3CommonStyles(edgeData[i2]);
        }
      }
      zrUtil$G.each(seriesOpt.categories, function(opt) {
        removeEC3NormalStatus(opt);
      });
    }
    if (data && !zrUtil$G.isTypedArray(data)) {
      for (var i2 = 0; i2 < data.length; i2++) {
        compatEC3CommonStyles(data[i2]);
      }
    }
    var markPoint = seriesOpt.markPoint;
    if (markPoint && markPoint.data) {
      var mpData = markPoint.data;
      for (var i2 = 0; i2 < mpData.length; i2++) {
        compatEC3CommonStyles(mpData[i2]);
      }
    }
    var markLine = seriesOpt.markLine;
    if (markLine && markLine.data) {
      var mlData = markLine.data;
      for (var i2 = 0; i2 < mlData.length; i2++) {
        if (zrUtil$G.isArray(mlData[i2])) {
          compatEC3CommonStyles(mlData[i2][0]);
          compatEC3CommonStyles(mlData[i2][1]);
        } else {
          compatEC3CommonStyles(mlData[i2]);
        }
      }
    }
    if (seriesOpt.type === "gauge") {
      compatTextStyle(seriesOpt, "axisLabel");
      compatTextStyle(seriesOpt, "title");
      compatTextStyle(seriesOpt, "detail");
    } else if (seriesOpt.type === "treemap") {
      convertNormalEmphasis(seriesOpt.breadcrumb, "itemStyle");
      zrUtil$G.each(seriesOpt.levels, function(opt) {
        removeEC3NormalStatus(opt);
      });
    } else if (seriesOpt.type === "tree") {
      removeEC3NormalStatus(seriesOpt.leaves);
    }
  }
  function toArr(o) {
    return zrUtil$G.isArray(o) ? o : o ? [o] : [];
  }
  function toObj(o) {
    return (zrUtil$G.isArray(o) ? o[0] : o) || {};
  }
  function _default$N(option, isTheme) {
    each$k(toArr(option.series), function(seriesOpt) {
      isObject$7(seriesOpt) && processSeries(seriesOpt);
    });
    var axes = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
    isTheme && axes.push("valueAxis", "categoryAxis", "logAxis", "timeAxis");
    each$k(axes, function(axisName) {
      each$k(toArr(option[axisName]), function(axisOpt) {
        if (axisOpt) {
          compatTextStyle(axisOpt, "axisLabel");
          compatTextStyle(axisOpt.axisPointer, "label");
        }
      });
    });
    each$k(toArr(option.parallel), function(parallelOpt) {
      var parallelAxisDefault = parallelOpt && parallelOpt.parallelAxisDefault;
      compatTextStyle(parallelAxisDefault, "axisLabel");
      compatTextStyle(parallelAxisDefault && parallelAxisDefault.axisPointer, "label");
    });
    each$k(toArr(option.calendar), function(calendarOpt) {
      convertNormalEmphasis(calendarOpt, "itemStyle");
      compatTextStyle(calendarOpt, "dayLabel");
      compatTextStyle(calendarOpt, "monthLabel");
      compatTextStyle(calendarOpt, "yearLabel");
    });
    each$k(toArr(option.radar), function(radarOpt) {
      compatTextStyle(radarOpt, "name");
    });
    each$k(toArr(option.geo), function(geoOpt) {
      if (isObject$7(geoOpt)) {
        compatEC3CommonStyles(geoOpt);
        each$k(toArr(geoOpt.regions), function(regionObj) {
          compatEC3CommonStyles(regionObj);
        });
      }
    });
    each$k(toArr(option.timeline), function(timelineOpt) {
      compatEC3CommonStyles(timelineOpt);
      convertNormalEmphasis(timelineOpt, "label");
      convertNormalEmphasis(timelineOpt, "itemStyle");
      convertNormalEmphasis(timelineOpt, "controlStyle", true);
      var data = timelineOpt.data;
      zrUtil$G.isArray(data) && zrUtil$G.each(data, function(item) {
        if (zrUtil$G.isObject(item)) {
          convertNormalEmphasis(item, "label");
          convertNormalEmphasis(item, "itemStyle");
        }
      });
    });
    each$k(toArr(option.toolbox), function(toolboxOpt) {
      convertNormalEmphasis(toolboxOpt, "iconStyle");
      each$k(toolboxOpt.feature, function(featureOpt) {
        convertNormalEmphasis(featureOpt, "iconStyle");
      });
    });
    compatTextStyle(toObj(option.axisPointer), "label");
    compatTextStyle(toObj(option.tooltip).axisPointer, "label");
  }
  var compatStyle$1 = _default$N;
  var _util$k = util$6;
  var each$j = _util$k.each;
  var isArray$2 = _util$k.isArray;
  var isObject$6 = _util$k.isObject;
  var compatStyle = compatStyle$1;
  var _model$c = model;
  var normalizeToArray$2 = _model$c.normalizeToArray;
  function get(opt, path2) {
    path2 = path2.split(",");
    var obj = opt;
    for (var i2 = 0; i2 < path2.length; i2++) {
      obj = obj && obj[path2[i2]];
      if (obj == null) {
        break;
      }
    }
    return obj;
  }
  function set(opt, path2, val, overwrite) {
    path2 = path2.split(",");
    var obj = opt;
    var key;
    for (var i2 = 0; i2 < path2.length - 1; i2++) {
      key = path2[i2];
      if (obj[key] == null) {
        obj[key] = {};
      }
      obj = obj[key];
    }
    if (overwrite || obj[path2[i2]] == null) {
      obj[path2[i2]] = val;
    }
  }
  function compatLayoutProperties(option) {
    each$j(LAYOUT_PROPERTIES, function(prop2) {
      if (prop2[0] in option && !(prop2[1] in option)) {
        option[prop2[1]] = option[prop2[0]];
      }
    });
  }
  var LAYOUT_PROPERTIES = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]];
  var COMPATITABLE_COMPONENTS = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"];
  function _default$M(option, isTheme) {
    compatStyle(option, isTheme);
    option.series = normalizeToArray$2(option.series);
    each$j(option.series, function(seriesOpt) {
      if (!isObject$6(seriesOpt)) {
        return;
      }
      var seriesType2 = seriesOpt.type;
      if (seriesType2 === "line") {
        if (seriesOpt.clipOverflow != null) {
          seriesOpt.clip = seriesOpt.clipOverflow;
        }
      } else if (seriesType2 === "pie" || seriesType2 === "gauge") {
        if (seriesOpt.clockWise != null) {
          seriesOpt.clockwise = seriesOpt.clockWise;
        }
      } else if (seriesType2 === "gauge") {
        var pointerColor = get(seriesOpt, "pointer.color");
        pointerColor != null && set(seriesOpt, "itemStyle.color", pointerColor);
      }
      compatLayoutProperties(seriesOpt);
    });
    if (option.dataRange) {
      option.visualMap = option.dataRange;
    }
    each$j(COMPATITABLE_COMPONENTS, function(componentName) {
      var options2 = option[componentName];
      if (options2) {
        if (!isArray$2(options2)) {
          options2 = [options2];
        }
        each$j(options2, function(option2) {
          compatLayoutProperties(option2);
        });
      }
    });
  }
  var backwardCompat = _default$M;
  var _util$j = util$6;
  var createHashMap$6 = _util$j.createHashMap;
  var each$i = _util$j.each;
  function _default$L(ecModel) {
    var stackInfoMap = createHashMap$6();
    ecModel.eachSeries(function(seriesModel) {
      var stack = seriesModel.get("stack");
      if (stack) {
        var stackInfoList = stackInfoMap.get(stack) || stackInfoMap.set(stack, []);
        var data = seriesModel.getData();
        var stackInfo = {
          stackResultDimension: data.getCalculationInfo("stackResultDimension"),
          stackedOverDimension: data.getCalculationInfo("stackedOverDimension"),
          stackedDimension: data.getCalculationInfo("stackedDimension"),
          stackedByDimension: data.getCalculationInfo("stackedByDimension"),
          isStackedByIndex: data.getCalculationInfo("isStackedByIndex"),
          data,
          seriesModel
        };
        if (!stackInfo.stackedDimension || !(stackInfo.isStackedByIndex || stackInfo.stackedByDimension)) {
          return;
        }
        stackInfoList.length && data.setCalculationInfo("stackedOnSeries", stackInfoList[stackInfoList.length - 1].seriesModel);
        stackInfoList.push(stackInfo);
      }
    });
    stackInfoMap.each(calculateStack);
  }
  function calculateStack(stackInfoList) {
    each$i(stackInfoList, function(targetStackInfo, idxInStack) {
      var resultVal = [];
      var resultNaN = [NaN, NaN];
      var dims = [targetStackInfo.stackResultDimension, targetStackInfo.stackedOverDimension];
      var targetData = targetStackInfo.data;
      var isStackedByIndex = targetStackInfo.isStackedByIndex;
      var newData = targetData.map(dims, function(v0, v1, dataIndex) {
        var sum = targetData.get(targetStackInfo.stackedDimension, dataIndex);
        if (isNaN(sum)) {
          return resultNaN;
        }
        var byValue;
        var stackedDataRawIndex;
        if (isStackedByIndex) {
          stackedDataRawIndex = targetData.getRawIndex(dataIndex);
        } else {
          byValue = targetData.get(targetStackInfo.stackedByDimension, dataIndex);
        }
        var stackedOver = NaN;
        for (var j = idxInStack - 1; j >= 0; j--) {
          var stackInfo = stackInfoList[j];
          if (!isStackedByIndex) {
            stackedDataRawIndex = stackInfo.data.rawIndexOf(stackInfo.stackedByDimension, byValue);
          }
          if (stackedDataRawIndex >= 0) {
            var val = stackInfo.data.getByRawIndex(stackInfo.stackResultDimension, stackedDataRawIndex);
            if (sum >= 0 && val > 0 || sum <= 0 && val < 0) {
              sum += val;
              stackedOver = val;
              break;
            }
          }
        }
        resultVal[0] = sum;
        resultVal[1] = stackedOver;
        return resultVal;
      });
      targetData.hostModel.setData(newData);
      targetStackInfo.data = newData;
    });
  }
  var dataStack$1 = _default$L;
  var dataProvider = {};
  var _util$i = util$6;
  _util$i.isTypedArray;
  var extend$3 = _util$i.extend;
  _util$i.assert;
  var each$h = _util$i.each;
  var isObject$5 = _util$i.isObject;
  var _model$b = model;
  var getDataItemValue$1 = _model$b.getDataItemValue;
  var isDataItemOption = _model$b.isDataItemOption;
  var _number$5 = number;
  var parseDate = _number$5.parseDate;
  var Source$3 = Source_1;
  var _sourceType$2 = sourceType;
  var SOURCE_FORMAT_TYPED_ARRAY = _sourceType$2.SOURCE_FORMAT_TYPED_ARRAY;
  var SOURCE_FORMAT_ARRAY_ROWS = _sourceType$2.SOURCE_FORMAT_ARRAY_ROWS;
  var SOURCE_FORMAT_ORIGINAL$1 = _sourceType$2.SOURCE_FORMAT_ORIGINAL;
  var SOURCE_FORMAT_OBJECT_ROWS = _sourceType$2.SOURCE_FORMAT_OBJECT_ROWS;
  function DefaultDataProvider$1(source, dimSize) {
    if (!Source$3.isInstance(source)) {
      source = Source$3.seriesDataToSource(source);
    }
    this._source = source;
    var data = this._data = source.data;
    var sourceFormat = source.sourceFormat;
    if (sourceFormat === SOURCE_FORMAT_TYPED_ARRAY) {
      this._offset = 0;
      this._dimSize = dimSize;
      this._data = data;
    }
    var methods2 = providerMethods[sourceFormat === SOURCE_FORMAT_ARRAY_ROWS ? sourceFormat + "_" + source.seriesLayoutBy : sourceFormat];
    extend$3(this, methods2);
  }
  var providerProto = DefaultDataProvider$1.prototype;
  providerProto.pure = false;
  providerProto.persistent = true;
  providerProto.getSource = function() {
    return this._source;
  };
  var providerMethods = {
    "arrayRows_column": {
      pure: true,
      count: function() {
        return Math.max(0, this._data.length - this._source.startIndex);
      },
      getItem: function(idx) {
        return this._data[idx + this._source.startIndex];
      },
      appendData: appendDataSimply
    },
    "arrayRows_row": {
      pure: true,
      count: function() {
        var row = this._data[0];
        return row ? Math.max(0, row.length - this._source.startIndex) : 0;
      },
      getItem: function(idx) {
        idx += this._source.startIndex;
        var item = [];
        var data = this._data;
        for (var i2 = 0; i2 < data.length; i2++) {
          var row = data[i2];
          item.push(row ? row[idx] : null);
        }
        return item;
      },
      appendData: function() {
        throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
      }
    },
    "objectRows": {
      pure: true,
      count: countSimply,
      getItem: getItemSimply,
      appendData: appendDataSimply
    },
    "keyedColumns": {
      pure: true,
      count: function() {
        var dimName = this._source.dimensionsDefine[0].name;
        var col = this._data[dimName];
        return col ? col.length : 0;
      },
      getItem: function(idx) {
        var item = [];
        var dims = this._source.dimensionsDefine;
        for (var i2 = 0; i2 < dims.length; i2++) {
          var col = this._data[dims[i2].name];
          item.push(col ? col[idx] : null);
        }
        return item;
      },
      appendData: function(newData) {
        var data = this._data;
        each$h(newData, function(newCol, key) {
          var oldCol = data[key] || (data[key] = []);
          for (var i2 = 0; i2 < (newCol || []).length; i2++) {
            oldCol.push(newCol[i2]);
          }
        });
      }
    },
    "original": {
      count: countSimply,
      getItem: getItemSimply,
      appendData: appendDataSimply
    },
    "typedArray": {
      persistent: false,
      pure: true,
      count: function() {
        return this._data ? this._data.length / this._dimSize : 0;
      },
      getItem: function(idx, out2) {
        idx = idx - this._offset;
        out2 = out2 || [];
        var offset = this._dimSize * idx;
        for (var i2 = 0; i2 < this._dimSize; i2++) {
          out2[i2] = this._data[offset + i2];
        }
        return out2;
      },
      appendData: function(newData) {
        this._data = newData;
      },
      clean: function() {
        this._offset += this.count();
        this._data = null;
      }
    }
  };
  function countSimply() {
    return this._data.length;
  }
  function getItemSimply(idx) {
    return this._data[idx];
  }
  function appendDataSimply(newData) {
    for (var i2 = 0; i2 < newData.length; i2++) {
      this._data.push(newData[i2]);
    }
  }
  var rawValueGetters = {
    arrayRows: getRawValueSimply,
    objectRows: function(dataItem, dataIndex, dimIndex, dimName) {
      return dimIndex != null ? dataItem[dimName] : dataItem;
    },
    keyedColumns: getRawValueSimply,
    original: function(dataItem, dataIndex, dimIndex, dimName) {
      var value = getDataItemValue$1(dataItem);
      return dimIndex == null || !(value instanceof Array) ? value : value[dimIndex];
    },
    typedArray: getRawValueSimply
  };
  function getRawValueSimply(dataItem, dataIndex, dimIndex, dimName) {
    return dimIndex != null ? dataItem[dimIndex] : dataItem;
  }
  var defaultDimValueGetters$1 = {
    arrayRows: getDimValueSimply,
    objectRows: function(dataItem, dimName, dataIndex, dimIndex) {
      return converDataValue(dataItem[dimName], this._dimensionInfos[dimName]);
    },
    keyedColumns: getDimValueSimply,
    original: function(dataItem, dimName, dataIndex, dimIndex) {
      var value = dataItem && (dataItem.value == null ? dataItem : dataItem.value);
      if (!this._rawData.pure && isDataItemOption(dataItem)) {
        this.hasItemOption = true;
      }
      return converDataValue(value instanceof Array ? value[dimIndex] : value, this._dimensionInfos[dimName]);
    },
    typedArray: function(dataItem, dimName, dataIndex, dimIndex) {
      return dataItem[dimIndex];
    }
  };
  function getDimValueSimply(dataItem, dimName, dataIndex, dimIndex) {
    return converDataValue(dataItem[dimIndex], this._dimensionInfos[dimName]);
  }
  function converDataValue(value, dimInfo) {
    var dimType = dimInfo && dimInfo.type;
    if (dimType === "ordinal") {
      var ordinalMeta = dimInfo && dimInfo.ordinalMeta;
      return ordinalMeta ? ordinalMeta.parseAndCollect(value) : value;
    }
    if (dimType === "time" && typeof value !== "number" && value != null && value !== "-") {
      value = +parseDate(value);
    }
    return value == null || value === "" ? NaN : +value;
  }
  function retrieveRawValue$4(data, dataIndex, dim) {
    if (!data) {
      return;
    }
    var dataItem = data.getRawDataItem(dataIndex);
    if (dataItem == null) {
      return;
    }
    var sourceFormat = data.getProvider().getSource().sourceFormat;
    var dimName;
    var dimIndex;
    var dimInfo = data.getDimensionInfo(dim);
    if (dimInfo) {
      dimName = dimInfo.name;
      dimIndex = dimInfo.index;
    }
    return rawValueGetters[sourceFormat](dataItem, dataIndex, dimIndex, dimName);
  }
  function retrieveRawAttr(data, dataIndex, attr) {
    if (!data) {
      return;
    }
    var sourceFormat = data.getProvider().getSource().sourceFormat;
    if (sourceFormat !== SOURCE_FORMAT_ORIGINAL$1 && sourceFormat !== SOURCE_FORMAT_OBJECT_ROWS) {
      return;
    }
    var dataItem = data.getRawDataItem(dataIndex);
    if (sourceFormat === SOURCE_FORMAT_ORIGINAL$1 && !isObject$5(dataItem)) {
      dataItem = null;
    }
    if (dataItem) {
      return dataItem[attr];
    }
  }
  dataProvider.DefaultDataProvider = DefaultDataProvider$1;
  dataProvider.defaultDimValueGetters = defaultDimValueGetters$1;
  dataProvider.retrieveRawValue = retrieveRawValue$4;
  dataProvider.retrieveRawAttr = retrieveRawAttr;
  var _dataProvider$4 = dataProvider;
  var retrieveRawValue$3 = _dataProvider$4.retrieveRawValue;
  var _format$1 = format;
  var getTooltipMarker$1 = _format$1.getTooltipMarker;
  var formatTpl = _format$1.formatTpl;
  var _model$a = model;
  var getTooltipRenderMode$1 = _model$a.getTooltipRenderMode;
  var DIMENSION_LABEL_REG = /\{@(.+?)\}/g;
  var _default$K = {
    getDataParams: function(dataIndex, dataType) {
      var data = this.getData(dataType);
      var rawValue = this.getRawValue(dataIndex, dataType);
      var rawDataIndex = data.getRawIndex(dataIndex);
      var name = data.getName(dataIndex);
      var itemOpt = data.getRawDataItem(dataIndex);
      var color2 = data.getItemVisual(dataIndex, "color");
      var borderColor = data.getItemVisual(dataIndex, "borderColor");
      var tooltipModel = this.ecModel.getComponent("tooltip");
      var renderModeOption = tooltipModel && tooltipModel.get("renderMode");
      var renderMode = getTooltipRenderMode$1(renderModeOption);
      var mainType = this.mainType;
      var isSeries = mainType === "series";
      var userOutput = data.userOutput;
      return {
        componentType: mainType,
        componentSubType: this.subType,
        componentIndex: this.componentIndex,
        seriesType: isSeries ? this.subType : null,
        seriesIndex: this.seriesIndex,
        seriesId: isSeries ? this.id : null,
        seriesName: isSeries ? this.name : null,
        name,
        dataIndex: rawDataIndex,
        data: itemOpt,
        dataType,
        value: rawValue,
        color: color2,
        borderColor,
        dimensionNames: userOutput ? userOutput.dimensionNames : null,
        encode: userOutput ? userOutput.encode : null,
        marker: getTooltipMarker$1({
          color: color2,
          renderMode
        }),
        $vars: ["seriesName", "name", "value"]
      };
    },
    getFormattedLabel: function(dataIndex, status, dataType, dimIndex, labelProp) {
      status = status || "normal";
      var data = this.getData(dataType);
      var itemModel = data.getItemModel(dataIndex);
      var params = this.getDataParams(dataIndex, dataType);
      if (dimIndex != null && params.value instanceof Array) {
        params.value = params.value[dimIndex];
      }
      var formatter = itemModel.get(status === "normal" ? [labelProp || "label", "formatter"] : [status, labelProp || "label", "formatter"]);
      if (typeof formatter === "function") {
        params.status = status;
        params.dimensionIndex = dimIndex;
        return formatter(params);
      } else if (typeof formatter === "string") {
        var str = formatTpl(formatter, params);
        return str.replace(DIMENSION_LABEL_REG, function(origin, dim) {
          var len2 = dim.length;
          if (dim.charAt(0) === "[" && dim.charAt(len2 - 1) === "]") {
            dim = +dim.slice(1, len2 - 1);
          }
          return retrieveRawValue$3(data, dataIndex, dim);
        });
      }
    },
    getRawValue: function(idx, dataType) {
      return retrieveRawValue$3(this.getData(dataType), idx);
    },
    formatTooltip: function() {
    }
  };
  var dataFormat = _default$K;
  var task = {};
  var _util$h = util$6;
  _util$h.assert;
  var isArray$1 = _util$h.isArray;
  function createTask$3(define) {
    return new Task(define);
  }
  function Task(define) {
    define = define || {};
    this._reset = define.reset;
    this._plan = define.plan;
    this._count = define.count;
    this._onDirty = define.onDirty;
    this._dirty = true;
    this.context;
  }
  var taskProto = Task.prototype;
  taskProto.perform = function(performArgs) {
    var upTask = this._upstream;
    var skip = performArgs && performArgs.skip;
    if (this._dirty && upTask) {
      var context = this.context;
      context.data = context.outputData = upTask.context.outputData;
    }
    if (this.__pipeline) {
      this.__pipeline.currentTask = this;
    }
    var planResult;
    if (this._plan && !skip) {
      planResult = this._plan(this.context);
    }
    var lastModBy = normalizeModBy(this._modBy);
    var lastModDataCount = this._modDataCount || 0;
    var modBy = normalizeModBy(performArgs && performArgs.modBy);
    var modDataCount = performArgs && performArgs.modDataCount || 0;
    if (lastModBy !== modBy || lastModDataCount !== modDataCount) {
      planResult = "reset";
    }
    function normalizeModBy(val) {
      !(val >= 1) && (val = 1);
      return val;
    }
    var forceFirstProgress;
    if (this._dirty || planResult === "reset") {
      this._dirty = false;
      forceFirstProgress = reset(this, skip);
    }
    this._modBy = modBy;
    this._modDataCount = modDataCount;
    var step = performArgs && performArgs.step;
    if (upTask) {
      this._dueEnd = upTask._outputDueEnd;
    } else {
      this._dueEnd = this._count ? this._count(this.context) : Infinity;
    }
    if (this._progress) {
      var start2 = this._dueIndex;
      var end2 = Math.min(step != null ? this._dueIndex + step : Infinity, this._dueEnd);
      if (!skip && (forceFirstProgress || start2 < end2)) {
        var progress = this._progress;
        if (isArray$1(progress)) {
          for (var i2 = 0; i2 < progress.length; i2++) {
            doProgress(this, progress[i2], start2, end2, modBy, modDataCount);
          }
        } else {
          doProgress(this, progress, start2, end2, modBy, modDataCount);
        }
      }
      this._dueIndex = end2;
      var outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : end2;
      this._outputDueEnd = outputDueEnd;
    } else {
      this._dueIndex = this._outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd;
    }
    return this.unfinished();
  };
  var iterator = function() {
    var end2;
    var current;
    var modBy;
    var modDataCount;
    var winCount;
    var it = {
      reset: function(s, e, sStep, sCount) {
        current = s;
        end2 = e;
        modBy = sStep;
        modDataCount = sCount;
        winCount = Math.ceil(modDataCount / modBy);
        it.next = modBy > 1 && modDataCount > 0 ? modNext : sequentialNext;
      }
    };
    return it;
    function sequentialNext() {
      return current < end2 ? current++ : null;
    }
    function modNext() {
      var dataIndex = current % winCount * modBy + Math.ceil(current / winCount);
      var result = current >= end2 ? null : dataIndex < modDataCount ? dataIndex : current;
      current++;
      return result;
    }
  }();
  taskProto.dirty = function() {
    this._dirty = true;
    this._onDirty && this._onDirty(this.context);
  };
  function doProgress(taskIns, progress, start2, end2, modBy, modDataCount) {
    iterator.reset(start2, end2, modBy, modDataCount);
    taskIns._callingProgress = progress;
    taskIns._callingProgress({
      start: start2,
      end: end2,
      count: end2 - start2,
      next: iterator.next
    }, taskIns.context);
  }
  function reset(taskIns, skip) {
    taskIns._dueIndex = taskIns._outputDueEnd = taskIns._dueEnd = 0;
    taskIns._settedOutputEnd = null;
    var progress;
    var forceFirstProgress;
    if (!skip && taskIns._reset) {
      progress = taskIns._reset(taskIns.context);
      if (progress && progress.progress) {
        forceFirstProgress = progress.forceFirstProgress;
        progress = progress.progress;
      }
      if (isArray$1(progress) && !progress.length) {
        progress = null;
      }
    }
    taskIns._progress = progress;
    taskIns._modBy = taskIns._modDataCount = null;
    var downstream = taskIns._downstream;
    downstream && downstream.dirty();
    return forceFirstProgress;
  }
  taskProto.unfinished = function() {
    return this._progress && this._dueIndex < this._dueEnd;
  };
  taskProto.pipe = function(downTask) {
    if (this._downstream !== downTask || this._dirty) {
      this._downstream = downTask;
      downTask._upstream = this;
      downTask.dirty();
    }
  };
  taskProto.dispose = function() {
    if (this._disposed) {
      return;
    }
    this._upstream && (this._upstream._downstream = null);
    this._downstream && (this._downstream._upstream = null);
    this._dirty = false;
    this._disposed = true;
  };
  taskProto.getUpstream = function() {
    return this._upstream;
  };
  taskProto.getDownstream = function() {
    return this._downstream;
  };
  taskProto.setOutputEnd = function(end2) {
    this._outputDueEnd = this._settedOutputEnd = end2;
  };
  task.createTask = createTask$3;
  var zrUtil$F = util$6;
  var env$3 = env_1;
  var _format = format;
  var formatTime = _format.formatTime;
  var encodeHTML = _format.encodeHTML;
  var addCommas = _format.addCommas;
  var getTooltipMarker = _format.getTooltipMarker;
  var modelUtil$3 = model;
  var ComponentModel$4 = Component$2;
  var colorPaletteMixin = colorPalette$1;
  var dataFormatMixin = dataFormat;
  var _layout$4 = layout$4;
  var getLayoutParams$1 = _layout$4.getLayoutParams;
  var mergeLayoutParam$1 = _layout$4.mergeLayoutParam;
  var _task$2 = task;
  var createTask$2 = _task$2.createTask;
  var _sourceHelper$3 = sourceHelper;
  var prepareSource = _sourceHelper$3.prepareSource;
  var getSource = _sourceHelper$3.getSource;
  var _dataProvider$3 = dataProvider;
  var retrieveRawValue$2 = _dataProvider$3.retrieveRawValue;
  var inner$5 = modelUtil$3.makeInner();
  var SeriesModel$1 = ComponentModel$4.extend({
    type: "series.__base__",
    seriesIndex: 0,
    coordinateSystem: null,
    defaultOption: null,
    legendVisualProvider: null,
    visualColorAccessPath: "itemStyle.color",
    visualBorderColorAccessPath: "itemStyle.borderColor",
    layoutMode: null,
    init: function(option, parentModel, ecModel, extraOpt) {
      this.seriesIndex = this.componentIndex;
      this.dataTask = createTask$2({
        count: dataTaskCount,
        reset: dataTaskReset
      });
      this.dataTask.context = {
        model: this
      };
      this.mergeDefaultAndTheme(option, ecModel);
      prepareSource(this);
      var data = this.getInitialData(option, ecModel);
      wrapData(data, this);
      this.dataTask.context.data = data;
      inner$5(this).dataBeforeProcessed = data;
      autoSeriesName(this);
    },
    mergeDefaultAndTheme: function(option, ecModel) {
      var layoutMode = this.layoutMode;
      var inputPositionParams = layoutMode ? getLayoutParams$1(option) : {};
      var themeSubType = this.subType;
      if (ComponentModel$4.hasClass(themeSubType)) {
        themeSubType += "Series";
      }
      zrUtil$F.merge(option, ecModel.getTheme().get(this.subType));
      zrUtil$F.merge(option, this.getDefaultOption());
      modelUtil$3.defaultEmphasis(option, "label", ["show"]);
      this.fillDataTextStyle(option.data);
      if (layoutMode) {
        mergeLayoutParam$1(option, inputPositionParams, layoutMode);
      }
    },
    mergeOption: function(newSeriesOption, ecModel) {
      newSeriesOption = zrUtil$F.merge(this.option, newSeriesOption, true);
      this.fillDataTextStyle(newSeriesOption.data);
      var layoutMode = this.layoutMode;
      if (layoutMode) {
        mergeLayoutParam$1(this.option, newSeriesOption, layoutMode);
      }
      prepareSource(this);
      var data = this.getInitialData(newSeriesOption, ecModel);
      wrapData(data, this);
      this.dataTask.dirty();
      this.dataTask.context.data = data;
      inner$5(this).dataBeforeProcessed = data;
      autoSeriesName(this);
    },
    fillDataTextStyle: function(data) {
      if (data && !zrUtil$F.isTypedArray(data)) {
        var props = ["show"];
        for (var i2 = 0; i2 < data.length; i2++) {
          if (data[i2] && data[i2].label) {
            modelUtil$3.defaultEmphasis(data[i2], "label", props);
          }
        }
      }
    },
    getInitialData: function() {
    },
    appendData: function(params) {
      var data = this.getRawData();
      data.appendData(params.data);
    },
    getData: function(dataType) {
      var task2 = getCurrentTask(this);
      if (task2) {
        var data = task2.context.data;
        return dataType == null ? data : data.getLinkedData(dataType);
      } else {
        return inner$5(this).data;
      }
    },
    setData: function(data) {
      var task2 = getCurrentTask(this);
      if (task2) {
        var context = task2.context;
        if (context.data !== data && task2.modifyOutputEnd) {
          task2.setOutputEnd(data.count());
        }
        context.outputData = data;
        if (task2 !== this.dataTask) {
          context.data = data;
        }
      }
      inner$5(this).data = data;
    },
    getSource: function() {
      return getSource(this);
    },
    getRawData: function() {
      return inner$5(this).dataBeforeProcessed;
    },
    getBaseAxis: function() {
      var coordSys = this.coordinateSystem;
      return coordSys && coordSys.getBaseAxis && coordSys.getBaseAxis();
    },
    formatTooltip: function(dataIndex, multipleSeries, dataType, renderMode) {
      var series = this;
      renderMode = renderMode || "html";
      var newLine = renderMode === "html" ? "<br/>" : "\n";
      var isRichText = renderMode === "richText";
      var markers = {};
      var markerId = 0;
      function formatArrayValue(value2) {
        var vertially = zrUtil$F.reduce(value2, function(vertially2, val, idx) {
          var dimItem = data.getDimensionInfo(idx);
          return vertially2 |= dimItem && dimItem.tooltip !== false && dimItem.displayName != null;
        }, 0);
        var result = [];
        tooltipDims.length ? zrUtil$F.each(tooltipDims, function(dim) {
          setEachItem(retrieveRawValue$2(data, dataIndex, dim), dim);
        }) : zrUtil$F.each(value2, setEachItem);
        function setEachItem(val, dim) {
          var dimInfo = data.getDimensionInfo(dim);
          if (!dimInfo || dimInfo.otherDims.tooltip === false) {
            return;
          }
          var dimType = dimInfo.type;
          var markName2 = "sub" + series.seriesIndex + "at" + markerId;
          var dimHead = getTooltipMarker({
            color: color2,
            type: "subItem",
            renderMode,
            markerId: markName2
          });
          var dimHeadStr = typeof dimHead === "string" ? dimHead : dimHead.content;
          var valStr = (vertially ? dimHeadStr + encodeHTML(dimInfo.displayName || "-") + ": " : "") + encodeHTML(dimType === "ordinal" ? val + "" : dimType === "time" ? multipleSeries ? "" : formatTime("yyyy/MM/dd hh:mm:ss", val) : addCommas(val));
          valStr && result.push(valStr);
          if (isRichText) {
            markers[markName2] = color2;
            ++markerId;
          }
        }
        var newLine2 = vertially ? isRichText ? "\n" : "<br/>" : "";
        var content2 = newLine2 + result.join(newLine2 || ", ");
        return {
          renderMode,
          content: content2,
          style: markers
        };
      }
      function formatSingleValue(val) {
        return {
          renderMode,
          content: encodeHTML(addCommas(val)),
          style: markers
        };
      }
      var data = this.getData();
      var tooltipDims = data.mapDimension("defaultedTooltip", true);
      var tooltipDimLen = tooltipDims.length;
      var value = this.getRawValue(dataIndex);
      var isValueArr = zrUtil$F.isArray(value);
      var color2 = data.getItemVisual(dataIndex, "color");
      if (zrUtil$F.isObject(color2) && color2.colorStops) {
        color2 = (color2.colorStops[0] || {}).color;
      }
      color2 = color2 || "transparent";
      var formattedValue = tooltipDimLen > 1 || isValueArr && !tooltipDimLen ? formatArrayValue(value) : tooltipDimLen ? formatSingleValue(retrieveRawValue$2(data, dataIndex, tooltipDims[0])) : formatSingleValue(isValueArr ? value[0] : value);
      var content = formattedValue.content;
      var markName = series.seriesIndex + "at" + markerId;
      var colorEl = getTooltipMarker({
        color: color2,
        type: "item",
        renderMode,
        markerId: markName
      });
      markers[markName] = color2;
      ++markerId;
      var name = data.getName(dataIndex);
      var seriesName = this.name;
      if (!modelUtil$3.isNameSpecified(this)) {
        seriesName = "";
      }
      seriesName = seriesName ? encodeHTML(seriesName) + (!multipleSeries ? newLine : ": ") : "";
      var colorStr = typeof colorEl === "string" ? colorEl : colorEl.content;
      var html = !multipleSeries ? seriesName + colorStr + (name ? encodeHTML(name) + ": " + content : content) : colorStr + seriesName + content;
      return {
        html,
        markers
      };
    },
    isAnimationEnabled: function() {
      if (env$3.node) {
        return false;
      }
      var animationEnabled = this.getShallow("animation");
      if (animationEnabled) {
        if (this.getData().count() > this.getShallow("animationThreshold")) {
          animationEnabled = false;
        }
      }
      return animationEnabled;
    },
    restoreData: function() {
      this.dataTask.dirty();
    },
    getColorFromPalette: function(name, scope, requestColorNum) {
      var ecModel = this.ecModel;
      var color2 = colorPaletteMixin.getColorFromPalette.call(this, name, scope, requestColorNum);
      if (!color2) {
        color2 = ecModel.getColorFromPalette(name, scope, requestColorNum);
      }
      return color2;
    },
    coordDimToDataDim: function(coordDim) {
      return this.getRawData().mapDimension(coordDim, true);
    },
    getProgressive: function() {
      return this.get("progressive");
    },
    getProgressiveThreshold: function() {
      return this.get("progressiveThreshold");
    },
    getAxisTooltipData: null,
    getTooltipPosition: null,
    pipeTask: null,
    preventIncremental: null,
    pipelineContext: null
  });
  zrUtil$F.mixin(SeriesModel$1, dataFormatMixin);
  zrUtil$F.mixin(SeriesModel$1, colorPaletteMixin);
  function autoSeriesName(seriesModel) {
    var name = seriesModel.name;
    if (!modelUtil$3.isNameSpecified(seriesModel)) {
      seriesModel.name = getSeriesAutoName(seriesModel) || name;
    }
  }
  function getSeriesAutoName(seriesModel) {
    var data = seriesModel.getRawData();
    var dataDims = data.mapDimension("seriesName", true);
    var nameArr = [];
    zrUtil$F.each(dataDims, function(dataDim) {
      var dimInfo = data.getDimensionInfo(dataDim);
      dimInfo.displayName && nameArr.push(dimInfo.displayName);
    });
    return nameArr.join(" ");
  }
  function dataTaskCount(context) {
    return context.model.getRawData().count();
  }
  function dataTaskReset(context) {
    var seriesModel = context.model;
    seriesModel.setData(seriesModel.getRawData().cloneShallow());
    return dataTaskProgress;
  }
  function dataTaskProgress(param2, context) {
    if (context.outputData && param2.end > context.outputData.count()) {
      context.model.getRawData().cloneShallow(context.outputData);
    }
  }
  function wrapData(data, seriesModel) {
    zrUtil$F.each(data.CHANGABLE_METHODS, function(methodName) {
      data.wrapMethod(methodName, zrUtil$F.curry(onDataSelfChange, seriesModel));
    });
  }
  function onDataSelfChange(seriesModel) {
    var task2 = getCurrentTask(seriesModel);
    if (task2) {
      task2.setOutputEnd(this.count());
    }
  }
  function getCurrentTask(seriesModel) {
    var scheduler = (seriesModel.ecModel || {}).scheduler;
    var pipeline = scheduler && scheduler.getPipeline(seriesModel.uid);
    if (pipeline) {
      var task2 = pipeline.currentTask;
      if (task2) {
        var agentStubMap = task2.agentStubMap;
        if (agentStubMap) {
          task2 = agentStubMap.get(seriesModel.uid);
        }
      }
      return task2;
    }
  }
  var _default$J = SeriesModel$1;
  var Series = _default$J;
  var Group$3 = Group_1;
  var componentUtil$1 = component;
  var clazzUtil$3 = clazz;
  var Component$1 = function() {
    this.group = new Group$3();
    this.uid = componentUtil$1.getUID("viewComponent");
  };
  Component$1.prototype = {
    constructor: Component$1,
    init: function(ecModel, api) {
    },
    render: function(componentModel, ecModel, api, payload) {
    },
    dispose: function() {
    },
    filterForExposedEvent: null
  };
  var componentProto = Component$1.prototype;
  componentProto.updateView = componentProto.updateLayout = componentProto.updateVisual = function(seriesModel, ecModel, api, payload) {
  };
  clazzUtil$3.enableClassExtend(Component$1);
  clazzUtil$3.enableClassManagement(Component$1, {
    registerWhenExtend: true
  });
  var _default$I = Component$1;
  var Component_1 = _default$I;
  var _model$9 = model;
  var makeInner$4 = _model$9.makeInner;
  function _default$H() {
    var inner2 = makeInner$4();
    return function(seriesModel) {
      var fields = inner2(seriesModel);
      var pipelineContext = seriesModel.pipelineContext;
      var originalLarge = fields.large;
      var originalProgressive = fields.progressiveRender;
      var large = fields.large = pipelineContext && pipelineContext.large;
      var progressive = fields.progressiveRender = pipelineContext && pipelineContext.progressiveRender;
      return !!(originalLarge ^ large || originalProgressive ^ progressive) && "reset";
    };
  }
  var createRenderPlanner$3 = _default$H;
  var _util$g = util$6;
  var each$g = _util$g.each;
  var Group$2 = Group_1;
  var componentUtil = component;
  var clazzUtil$2 = clazz;
  var modelUtil$2 = model;
  var graphicUtil$2 = graphic$g;
  var _task$1 = task;
  var createTask$1 = _task$1.createTask;
  var createRenderPlanner$2 = createRenderPlanner$3;
  var inner$4 = modelUtil$2.makeInner();
  var renderPlanner = createRenderPlanner$2();
  function Chart() {
    this.group = new Group$2();
    this.uid = componentUtil.getUID("viewChart");
    this.renderTask = createTask$1({
      plan: renderTaskPlan,
      reset: renderTaskReset
    });
    this.renderTask.context = {
      view: this
    };
  }
  Chart.prototype = {
    type: "chart",
    init: function(ecModel, api) {
    },
    render: function(seriesModel, ecModel, api, payload) {
    },
    highlight: function(seriesModel, ecModel, api, payload) {
      toggleHighlight(seriesModel.getData(), payload, "emphasis");
    },
    downplay: function(seriesModel, ecModel, api, payload) {
      toggleHighlight(seriesModel.getData(), payload, "normal");
    },
    remove: function(ecModel, api) {
      this.group.removeAll();
    },
    dispose: function() {
    },
    incrementalPrepareRender: null,
    incrementalRender: null,
    updateTransform: null,
    filterForExposedEvent: null
  };
  var chartProto = Chart.prototype;
  chartProto.updateView = chartProto.updateLayout = chartProto.updateVisual = function(seriesModel, ecModel, api, payload) {
    this.render(seriesModel, ecModel, api, payload);
  };
  function elSetState(el, state, highlightDigit) {
    if (el) {
      el.trigger(state, highlightDigit);
      if (el.isGroup && !graphicUtil$2.isHighDownDispatcher(el)) {
        for (var i2 = 0, len2 = el.childCount(); i2 < len2; i2++) {
          elSetState(el.childAt(i2), state, highlightDigit);
        }
      }
    }
  }
  function toggleHighlight(data, payload, state) {
    var dataIndex = modelUtil$2.queryDataIndex(data, payload);
    var highlightDigit = payload && payload.highlightKey != null ? graphicUtil$2.getHighlightDigit(payload.highlightKey) : null;
    if (dataIndex != null) {
      each$g(modelUtil$2.normalizeToArray(dataIndex), function(dataIdx) {
        elSetState(data.getItemGraphicEl(dataIdx), state, highlightDigit);
      });
    } else {
      data.eachItemGraphicEl(function(el) {
        elSetState(el, state, highlightDigit);
      });
    }
  }
  clazzUtil$2.enableClassExtend(Chart, ["dispose"]);
  clazzUtil$2.enableClassManagement(Chart, {
    registerWhenExtend: true
  });
  Chart.markUpdateMethod = function(payload, methodName) {
    inner$4(payload).updateMethod = methodName;
  };
  function renderTaskPlan(context) {
    return renderPlanner(context.model);
  }
  function renderTaskReset(context) {
    var seriesModel = context.model;
    var ecModel = context.ecModel;
    var api = context.api;
    var payload = context.payload;
    var progressiveRender = seriesModel.pipelineContext.progressiveRender;
    var view = context.view;
    var updateMethod = payload && inner$4(payload).updateMethod;
    var methodName = progressiveRender ? "incrementalPrepareRender" : updateMethod && view[updateMethod] ? updateMethod : "render";
    if (methodName !== "render") {
      view[methodName](seriesModel, ecModel, api, payload);
    }
    return progressMethodMap[methodName];
  }
  var progressMethodMap = {
    incrementalPrepareRender: {
      progress: function(params, context) {
        context.view.incrementalRender(params, context.model, context.ecModel, context.api, context.payload);
      }
    },
    render: {
      forceFirstProgress: true,
      progress: function(params, context) {
        context.view.render(context.model, context.ecModel, context.api, context.payload);
      }
    }
  };
  var _default$G = Chart;
  var Chart_1 = _default$G;
  var throttle$1 = {};
  var ORIGIN_METHOD = "\0__throttleOriginMethod";
  var RATE = "\0__throttleRate";
  var THROTTLE_TYPE = "\0__throttleType";
  function throttle(fn, delay, debounce2) {
    var currCall;
    var lastCall = 0;
    var lastExec = 0;
    var timer = null;
    var diff;
    var scope;
    var args;
    var debounceNextCall;
    delay = delay || 0;
    function exec() {
      lastExec = new Date().getTime();
      timer = null;
      fn.apply(scope, args || []);
    }
    var cb = function() {
      currCall = new Date().getTime();
      scope = this;
      args = arguments;
      var thisDelay = debounceNextCall || delay;
      var thisDebounce = debounceNextCall || debounce2;
      debounceNextCall = null;
      diff = currCall - (thisDebounce ? lastCall : lastExec) - thisDelay;
      clearTimeout(timer);
      if (thisDebounce) {
        timer = setTimeout(exec, thisDelay);
      } else {
        if (diff >= 0) {
          exec();
        } else {
          timer = setTimeout(exec, -diff);
        }
      }
      lastCall = currCall;
    };
    cb.clear = function() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
    cb.debounceNextCall = function(debounceDelay) {
      debounceNextCall = debounceDelay;
    };
    return cb;
  }
  function createOrUpdate(obj, fnAttr, rate, throttleType) {
    var fn = obj[fnAttr];
    if (!fn) {
      return;
    }
    var originFn = fn[ORIGIN_METHOD] || fn;
    var lastThrottleType = fn[THROTTLE_TYPE];
    var lastRate = fn[RATE];
    if (lastRate !== rate || lastThrottleType !== throttleType) {
      if (rate == null || !throttleType) {
        return obj[fnAttr] = originFn;
      }
      fn = obj[fnAttr] = throttle(originFn, rate, throttleType === "debounce");
      fn[ORIGIN_METHOD] = originFn;
      fn[THROTTLE_TYPE] = throttleType;
      fn[RATE] = rate;
    }
    return fn;
  }
  function clear(obj, fnAttr) {
    var fn = obj[fnAttr];
    if (fn && fn[ORIGIN_METHOD]) {
      obj[fnAttr] = fn[ORIGIN_METHOD];
    }
  }
  throttle$1.throttle = throttle;
  throttle$1.createOrUpdate = createOrUpdate;
  throttle$1.clear = clear;
  var Gradient = Gradient_1;
  var _util$f = util$6;
  var isFunction$2 = _util$f.isFunction;
  var _default$F = {
    createOnAllSeries: true,
    performRawSeries: true,
    reset: function(seriesModel, ecModel) {
      var data = seriesModel.getData();
      var colorAccessPath = (seriesModel.visualColorAccessPath || "itemStyle.color").split(".");
      var color2 = seriesModel.get(colorAccessPath);
      var colorCallback = isFunction$2(color2) && !(color2 instanceof Gradient) ? color2 : null;
      if (!color2 || colorCallback) {
        color2 = seriesModel.getColorFromPalette(seriesModel.name, null, ecModel.getSeriesCount());
      }
      data.setVisual("color", color2);
      var borderColorAccessPath = (seriesModel.visualBorderColorAccessPath || "itemStyle.borderColor").split(".");
      var borderColor = seriesModel.get(borderColorAccessPath);
      data.setVisual("borderColor", borderColor);
      if (!ecModel.isSeriesFiltered(seriesModel)) {
        if (colorCallback) {
          data.each(function(idx) {
            data.setItemVisual(idx, "color", colorCallback(seriesModel.getDataParams(idx)));
          });
        }
        var dataEach = function(data2, idx) {
          var itemModel = data2.getItemModel(idx);
          var color3 = itemModel.get(colorAccessPath, true);
          var borderColor2 = itemModel.get(borderColorAccessPath, true);
          if (color3 != null) {
            data2.setItemVisual(idx, "color", color3);
          }
          if (borderColor2 != null) {
            data2.setItemVisual(idx, "borderColor", borderColor2);
          }
        };
        return {
          dataEach: data.hasItemOption ? dataEach : null
        };
      }
    }
  };
  var seriesColor = _default$F;
  var _default$E = {
    legend: {
      selector: {
        all: "\u5168\u9009",
        inverse: "\u53CD\u9009"
      }
    },
    toolbox: {
      brush: {
        title: {
          rect: "\u77E9\u5F62\u9009\u62E9",
          polygon: "\u5708\u9009",
          lineX: "\u6A2A\u5411\u9009\u62E9",
          lineY: "\u7EB5\u5411\u9009\u62E9",
          keep: "\u4FDD\u6301\u9009\u62E9",
          clear: "\u6E05\u9664\u9009\u62E9"
        }
      },
      dataView: {
        title: "\u6570\u636E\u89C6\u56FE",
        lang: ["\u6570\u636E\u89C6\u56FE", "\u5173\u95ED", "\u5237\u65B0"]
      },
      dataZoom: {
        title: {
          zoom: "\u533A\u57DF\u7F29\u653E",
          back: "\u533A\u57DF\u7F29\u653E\u8FD8\u539F"
        }
      },
      magicType: {
        title: {
          line: "\u5207\u6362\u4E3A\u6298\u7EBF\u56FE",
          bar: "\u5207\u6362\u4E3A\u67F1\u72B6\u56FE",
          stack: "\u5207\u6362\u4E3A\u5806\u53E0",
          tiled: "\u5207\u6362\u4E3A\u5E73\u94FA"
        }
      },
      restore: {
        title: "\u8FD8\u539F"
      },
      saveAsImage: {
        title: "\u4FDD\u5B58\u4E3A\u56FE\u7247",
        lang: ["\u53F3\u952E\u53E6\u5B58\u4E3A\u56FE\u7247"]
      }
    },
    series: {
      typeNames: {
        pie: "\u997C\u56FE",
        bar: "\u67F1\u72B6\u56FE",
        line: "\u6298\u7EBF\u56FE",
        scatter: "\u6563\u70B9\u56FE",
        effectScatter: "\u6D9F\u6F2A\u6563\u70B9\u56FE",
        radar: "\u96F7\u8FBE\u56FE",
        tree: "\u6811\u56FE",
        treemap: "\u77E9\u5F62\u6811\u56FE",
        boxplot: "\u7BB1\u578B\u56FE",
        candlestick: "K\u7EBF\u56FE",
        k: "K\u7EBF\u56FE",
        heatmap: "\u70ED\u529B\u56FE",
        map: "\u5730\u56FE",
        parallel: "\u5E73\u884C\u5750\u6807\u56FE",
        lines: "\u7EBF\u56FE",
        graph: "\u5173\u7CFB\u56FE",
        sankey: "\u6851\u57FA\u56FE",
        funnel: "\u6F0F\u6597\u56FE",
        gauge: "\u4EEA\u8868\u76D8\u56FE",
        pictorialBar: "\u8C61\u5F62\u67F1\u56FE",
        themeRiver: "\u4E3B\u9898\u6CB3\u6D41\u56FE",
        sunburst: "\u65ED\u65E5\u56FE"
      }
    },
    aria: {
      general: {
        withTitle: "\u8FD9\u662F\u4E00\u4E2A\u5173\u4E8E\u201C{title}\u201D\u7684\u56FE\u8868\u3002",
        withoutTitle: "\u8FD9\u662F\u4E00\u4E2A\u56FE\u8868\uFF0C"
      },
      series: {
        single: {
          prefix: "",
          withName: "\u56FE\u8868\u7C7B\u578B\u662F{seriesType}\uFF0C\u8868\u793A{seriesName}\u3002",
          withoutName: "\u56FE\u8868\u7C7B\u578B\u662F{seriesType}\u3002"
        },
        multiple: {
          prefix: "\u5B83\u7531{seriesCount}\u4E2A\u56FE\u8868\u7CFB\u5217\u7EC4\u6210\u3002",
          withName: "\u7B2C{seriesId}\u4E2A\u7CFB\u5217\u662F\u4E00\u4E2A\u8868\u793A{seriesName}\u7684{seriesType}\uFF0C",
          withoutName: "\u7B2C{seriesId}\u4E2A\u7CFB\u5217\u662F\u4E00\u4E2A{seriesType}\uFF0C",
          separator: {
            middle: "\uFF1B",
            end: "\u3002"
          }
        }
      },
      data: {
        allData: "\u5176\u6570\u636E\u662F\u2014\u2014",
        partialData: "\u5176\u4E2D\uFF0C\u524D{displayCnt}\u9879\u662F\u2014\u2014",
        withName: "{name}\u7684\u6570\u636E\u662F{value}",
        withoutName: "{value}",
        separator: {
          middle: "\uFF0C",
          end: ""
        }
      }
    }
  };
  var lang$2 = _default$E;
  var zrUtil$E = util$6;
  var lang$1 = lang$2;
  var _dataProvider$2 = dataProvider;
  var retrieveRawValue$1 = _dataProvider$2.retrieveRawValue;
  function _default$D(dom2, ecModel) {
    var ariaModel = ecModel.getModel("aria");
    if (!ariaModel.get("show")) {
      return;
    } else if (ariaModel.get("description")) {
      dom2.setAttribute("aria-label", ariaModel.get("description"));
      return;
    }
    var seriesCnt = 0;
    ecModel.eachSeries(function(seriesModel, idx) {
      ++seriesCnt;
    }, this);
    var maxDataCnt = ariaModel.get("data.maxCount") || 10;
    var maxSeriesCnt = ariaModel.get("series.maxCount") || 10;
    var displaySeriesCnt = Math.min(seriesCnt, maxSeriesCnt);
    var ariaLabel;
    if (seriesCnt < 1) {
      return;
    } else {
      var title = getTitle();
      if (title) {
        ariaLabel = replace(getConfig("general.withTitle"), {
          title
        });
      } else {
        ariaLabel = getConfig("general.withoutTitle");
      }
      var seriesLabels = [];
      var prefix = seriesCnt > 1 ? "series.multiple.prefix" : "series.single.prefix";
      ariaLabel += replace(getConfig(prefix), {
        seriesCount: seriesCnt
      });
      ecModel.eachSeries(function(seriesModel, idx) {
        if (idx < displaySeriesCnt) {
          var seriesLabel;
          var seriesName = seriesModel.get("name");
          var seriesTpl = "series." + (seriesCnt > 1 ? "multiple" : "single") + ".";
          seriesLabel = getConfig(seriesName ? seriesTpl + "withName" : seriesTpl + "withoutName");
          seriesLabel = replace(seriesLabel, {
            seriesId: seriesModel.seriesIndex,
            seriesName: seriesModel.get("name"),
            seriesType: getSeriesTypeName(seriesModel.subType)
          });
          var data = seriesModel.getData();
          window.data = data;
          if (data.count() > maxDataCnt) {
            seriesLabel += replace(getConfig("data.partialData"), {
              displayCnt: maxDataCnt
            });
          } else {
            seriesLabel += getConfig("data.allData");
          }
          var dataLabels = [];
          for (var i2 = 0; i2 < data.count(); i2++) {
            if (i2 < maxDataCnt) {
              var name = data.getName(i2);
              var value = retrieveRawValue$1(data, i2);
              dataLabels.push(replace(name ? getConfig("data.withName") : getConfig("data.withoutName"), {
                name,
                value
              }));
            }
          }
          seriesLabel += dataLabels.join(getConfig("data.separator.middle")) + getConfig("data.separator.end");
          seriesLabels.push(seriesLabel);
        }
      });
      ariaLabel += seriesLabels.join(getConfig("series.multiple.separator.middle")) + getConfig("series.multiple.separator.end");
      dom2.setAttribute("aria-label", ariaLabel);
    }
    function replace(str, keyValues) {
      if (typeof str !== "string") {
        return str;
      }
      var result = str;
      zrUtil$E.each(keyValues, function(value, key) {
        result = result.replace(new RegExp("\\{\\s*" + key + "\\s*\\}", "g"), value);
      });
      return result;
    }
    function getConfig(path2) {
      var userConfig = ariaModel.get(path2);
      if (userConfig == null) {
        var pathArr = path2.split(".");
        var result = lang$1.aria;
        for (var i2 = 0; i2 < pathArr.length; ++i2) {
          result = result[pathArr[i2]];
        }
        return result;
      } else {
        return userConfig;
      }
    }
    function getTitle() {
      var title2 = ecModel.getModel("title").option;
      if (title2 && title2.length) {
        title2 = title2[0];
      }
      return title2 && title2.text;
    }
    function getSeriesTypeName(type) {
      return lang$1.series.typeNames[type] || "\u81EA\u5B9A\u4E49\u56FE";
    }
  }
  var aria = _default$D;
  var zrUtil$D = util$6;
  var graphic$f = graphic$g;
  var textContain$2 = text;
  var PI$1 = Math.PI;
  function _default$C(api, opts) {
    opts = opts || {};
    zrUtil$D.defaults(opts, {
      text: "loading",
      textColor: "#000",
      fontSize: "12px",
      maskColor: "rgba(255, 255, 255, 0.8)",
      showSpinner: true,
      color: "#c23531",
      spinnerRadius: 10,
      lineWidth: 5,
      zlevel: 0
    });
    var group = new graphic$f.Group();
    var mask = new graphic$f.Rect({
      style: {
        fill: opts.maskColor
      },
      zlevel: opts.zlevel,
      z: 1e4
    });
    group.add(mask);
    var font = opts.fontSize + " sans-serif";
    var labelRect = new graphic$f.Rect({
      style: {
        fill: "none",
        text: opts.text,
        font,
        textPosition: "right",
        textDistance: 10,
        textFill: opts.textColor
      },
      zlevel: opts.zlevel,
      z: 10001
    });
    group.add(labelRect);
    if (opts.showSpinner) {
      var arc2 = new graphic$f.Arc({
        shape: {
          startAngle: -PI$1 / 2,
          endAngle: -PI$1 / 2 + 0.1,
          r: opts.spinnerRadius
        },
        style: {
          stroke: opts.color,
          lineCap: "round",
          lineWidth: opts.lineWidth
        },
        zlevel: opts.zlevel,
        z: 10001
      });
      arc2.animateShape(true).when(1e3, {
        endAngle: PI$1 * 3 / 2
      }).start("circularInOut");
      arc2.animateShape(true).when(1e3, {
        startAngle: PI$1 * 3 / 2
      }).delay(300).start("circularInOut");
      group.add(arc2);
    }
    group.resize = function() {
      var textWidth = textContain$2.getWidth(opts.text, font);
      var r = opts.showSpinner ? opts.spinnerRadius : 0;
      var cx = (api.getWidth() - r * 2 - (opts.showSpinner && textWidth ? 10 : 0) - textWidth) / 2 - (opts.showSpinner ? 0 : textWidth / 2);
      var cy = api.getHeight() / 2;
      opts.showSpinner && arc2.setShape({
        cx,
        cy
      });
      labelRect.setShape({
        x: cx - r,
        y: cy - r,
        width: r * 2,
        height: r * 2
      });
      mask.setShape({
        x: 0,
        y: 0,
        width: api.getWidth(),
        height: api.getHeight()
      });
    };
    group.resize();
    return group;
  }
  var _default_1 = _default$C;
  var _util$e = util$6;
  var each$f = _util$e.each;
  var map$5 = _util$e.map;
  var isFunction$1 = _util$e.isFunction;
  var createHashMap$5 = _util$e.createHashMap;
  var noop = _util$e.noop;
  var _task = task;
  var createTask = _task.createTask;
  var _component = component;
  var getUID = _component.getUID;
  var GlobalModel = Global;
  var ExtensionAPI = ExtensionAPI_1;
  var _model$8 = model;
  var normalizeToArray$1 = _model$8.normalizeToArray;
  function Scheduler(ecInstance, api, dataProcessorHandlers, visualHandlers) {
    this.ecInstance = ecInstance;
    this.api = api;
    this.unfinished;
    var dataProcessorHandlers = this._dataProcessorHandlers = dataProcessorHandlers.slice();
    var visualHandlers = this._visualHandlers = visualHandlers.slice();
    this._allHandlers = dataProcessorHandlers.concat(visualHandlers);
    this._stageTaskMap = createHashMap$5();
  }
  var proto$1 = Scheduler.prototype;
  proto$1.restoreData = function(ecModel, payload) {
    ecModel.restoreData(payload);
    this._stageTaskMap.each(function(taskRecord) {
      var overallTask = taskRecord.overallTask;
      overallTask && overallTask.dirty();
    });
  };
  proto$1.getPerformArgs = function(task2, isBlock) {
    if (!task2.__pipeline) {
      return;
    }
    var pipeline = this._pipelineMap.get(task2.__pipeline.id);
    var pCtx = pipeline.context;
    var incremental = !isBlock && pipeline.progressiveEnabled && (!pCtx || pCtx.progressiveRender) && task2.__idxInPipeline > pipeline.blockIndex;
    var step = incremental ? pipeline.step : null;
    var modDataCount = pCtx && pCtx.modDataCount;
    var modBy = modDataCount != null ? Math.ceil(modDataCount / step) : null;
    return {
      step,
      modBy,
      modDataCount
    };
  };
  proto$1.getPipeline = function(pipelineId) {
    return this._pipelineMap.get(pipelineId);
  };
  proto$1.updateStreamModes = function(seriesModel, view) {
    var pipeline = this._pipelineMap.get(seriesModel.uid);
    var data = seriesModel.getData();
    var dataLen = data.count();
    var progressiveRender = pipeline.progressiveEnabled && view.incrementalPrepareRender && dataLen >= pipeline.threshold;
    var large = seriesModel.get("large") && dataLen >= seriesModel.get("largeThreshold");
    var modDataCount = seriesModel.get("progressiveChunkMode") === "mod" ? dataLen : null;
    seriesModel.pipelineContext = pipeline.context = {
      progressiveRender,
      modDataCount,
      large
    };
  };
  proto$1.restorePipelines = function(ecModel) {
    var scheduler = this;
    var pipelineMap = scheduler._pipelineMap = createHashMap$5();
    ecModel.eachSeries(function(seriesModel) {
      var progressive = seriesModel.getProgressive();
      var pipelineId = seriesModel.uid;
      pipelineMap.set(pipelineId, {
        id: pipelineId,
        head: null,
        tail: null,
        threshold: seriesModel.getProgressiveThreshold(),
        progressiveEnabled: progressive && !(seriesModel.preventIncremental && seriesModel.preventIncremental()),
        blockIndex: -1,
        step: Math.round(progressive || 700),
        count: 0
      });
      pipe(scheduler, seriesModel, seriesModel.dataTask);
    });
  };
  proto$1.prepareStageTasks = function() {
    var stageTaskMap = this._stageTaskMap;
    var ecModel = this.ecInstance.getModel();
    var api = this.api;
    each$f(this._allHandlers, function(handler) {
      var record = stageTaskMap.get(handler.uid) || stageTaskMap.set(handler.uid, []);
      handler.reset && createSeriesStageTask(this, handler, record, ecModel, api);
      handler.overallReset && createOverallStageTask(this, handler, record, ecModel, api);
    }, this);
  };
  proto$1.prepareView = function(view, model2, ecModel, api) {
    var renderTask = view.renderTask;
    var context = renderTask.context;
    context.model = model2;
    context.ecModel = ecModel;
    context.api = api;
    renderTask.__block = !view.incrementalPrepareRender;
    pipe(this, model2, renderTask);
  };
  proto$1.performDataProcessorTasks = function(ecModel, payload) {
    performStageTasks(this, this._dataProcessorHandlers, ecModel, payload, {
      block: true
    });
  };
  proto$1.performVisualTasks = function(ecModel, payload, opt) {
    performStageTasks(this, this._visualHandlers, ecModel, payload, opt);
  };
  function performStageTasks(scheduler, stageHandlers, ecModel, payload, opt) {
    opt = opt || {};
    var unfinished;
    each$f(stageHandlers, function(stageHandler, idx) {
      if (opt.visualType && opt.visualType !== stageHandler.visualType) {
        return;
      }
      var stageHandlerRecord = scheduler._stageTaskMap.get(stageHandler.uid);
      var seriesTaskMap = stageHandlerRecord.seriesTaskMap;
      var overallTask = stageHandlerRecord.overallTask;
      if (overallTask) {
        var overallNeedDirty;
        var agentStubMap = overallTask.agentStubMap;
        agentStubMap.each(function(stub) {
          if (needSetDirty(opt, stub)) {
            stub.dirty();
            overallNeedDirty = true;
          }
        });
        overallNeedDirty && overallTask.dirty();
        updatePayload(overallTask, payload);
        var performArgs = scheduler.getPerformArgs(overallTask, opt.block);
        agentStubMap.each(function(stub) {
          stub.perform(performArgs);
        });
        unfinished |= overallTask.perform(performArgs);
      } else if (seriesTaskMap) {
        seriesTaskMap.each(function(task2, pipelineId) {
          if (needSetDirty(opt, task2)) {
            task2.dirty();
          }
          var performArgs2 = scheduler.getPerformArgs(task2, opt.block);
          performArgs2.skip = !stageHandler.performRawSeries && ecModel.isSeriesFiltered(task2.context.model);
          updatePayload(task2, payload);
          unfinished |= task2.perform(performArgs2);
        });
      }
    });
    function needSetDirty(opt2, task2) {
      return opt2.setDirty && (!opt2.dirtyMap || opt2.dirtyMap.get(task2.__pipeline.id));
    }
    scheduler.unfinished |= unfinished;
  }
  proto$1.performSeriesTasks = function(ecModel) {
    var unfinished;
    ecModel.eachSeries(function(seriesModel) {
      unfinished |= seriesModel.dataTask.perform();
    });
    this.unfinished |= unfinished;
  };
  proto$1.plan = function() {
    this._pipelineMap.each(function(pipeline) {
      var task2 = pipeline.tail;
      do {
        if (task2.__block) {
          pipeline.blockIndex = task2.__idxInPipeline;
          break;
        }
        task2 = task2.getUpstream();
      } while (task2);
    });
  };
  var updatePayload = proto$1.updatePayload = function(task2, payload) {
    payload !== "remain" && (task2.context.payload = payload);
  };
  function createSeriesStageTask(scheduler, stageHandler, stageHandlerRecord, ecModel, api) {
    var seriesTaskMap = stageHandlerRecord.seriesTaskMap || (stageHandlerRecord.seriesTaskMap = createHashMap$5());
    var seriesType2 = stageHandler.seriesType;
    var getTargetSeries = stageHandler.getTargetSeries;
    if (stageHandler.createOnAllSeries) {
      ecModel.eachRawSeries(create2);
    } else if (seriesType2) {
      ecModel.eachRawSeriesByType(seriesType2, create2);
    } else if (getTargetSeries) {
      getTargetSeries(ecModel, api).each(create2);
    }
    function create2(seriesModel) {
      var pipelineId = seriesModel.uid;
      var task2 = seriesTaskMap.get(pipelineId) || seriesTaskMap.set(pipelineId, createTask({
        plan: seriesTaskPlan,
        reset: seriesTaskReset,
        count: seriesTaskCount
      }));
      task2.context = {
        model: seriesModel,
        ecModel,
        api,
        useClearVisual: stageHandler.isVisual && !stageHandler.isLayout,
        plan: stageHandler.plan,
        reset: stageHandler.reset,
        scheduler
      };
      pipe(scheduler, seriesModel, task2);
    }
    var pipelineMap = scheduler._pipelineMap;
    seriesTaskMap.each(function(task2, pipelineId) {
      if (!pipelineMap.get(pipelineId)) {
        task2.dispose();
        seriesTaskMap.removeKey(pipelineId);
      }
    });
  }
  function createOverallStageTask(scheduler, stageHandler, stageHandlerRecord, ecModel, api) {
    var overallTask = stageHandlerRecord.overallTask = stageHandlerRecord.overallTask || createTask({
      reset: overallTaskReset
    });
    overallTask.context = {
      ecModel,
      api,
      overallReset: stageHandler.overallReset,
      scheduler
    };
    var agentStubMap = overallTask.agentStubMap = overallTask.agentStubMap || createHashMap$5();
    var seriesType2 = stageHandler.seriesType;
    var getTargetSeries = stageHandler.getTargetSeries;
    var overallProgress = true;
    var modifyOutputEnd = stageHandler.modifyOutputEnd;
    if (seriesType2) {
      ecModel.eachRawSeriesByType(seriesType2, createStub);
    } else if (getTargetSeries) {
      getTargetSeries(ecModel, api).each(createStub);
    } else {
      overallProgress = false;
      each$f(ecModel.getSeries(), createStub);
    }
    function createStub(seriesModel) {
      var pipelineId = seriesModel.uid;
      var stub = agentStubMap.get(pipelineId);
      if (!stub) {
        stub = agentStubMap.set(pipelineId, createTask({
          reset: stubReset,
          onDirty: stubOnDirty
        }));
        overallTask.dirty();
      }
      stub.context = {
        model: seriesModel,
        overallProgress,
        modifyOutputEnd
      };
      stub.agent = overallTask;
      stub.__block = overallProgress;
      pipe(scheduler, seriesModel, stub);
    }
    var pipelineMap = scheduler._pipelineMap;
    agentStubMap.each(function(stub, pipelineId) {
      if (!pipelineMap.get(pipelineId)) {
        stub.dispose();
        overallTask.dirty();
        agentStubMap.removeKey(pipelineId);
      }
    });
  }
  function overallTaskReset(context) {
    context.overallReset(context.ecModel, context.api, context.payload);
  }
  function stubReset(context, upstreamContext) {
    return context.overallProgress && stubProgress;
  }
  function stubProgress() {
    this.agent.dirty();
    this.getDownstream().dirty();
  }
  function stubOnDirty() {
    this.agent && this.agent.dirty();
  }
  function seriesTaskPlan(context) {
    return context.plan && context.plan(context.model, context.ecModel, context.api, context.payload);
  }
  function seriesTaskReset(context) {
    if (context.useClearVisual) {
      context.data.clearAllVisual();
    }
    var resetDefines = context.resetDefines = normalizeToArray$1(context.reset(context.model, context.ecModel, context.api, context.payload));
    return resetDefines.length > 1 ? map$5(resetDefines, function(v2, idx) {
      return makeSeriesTaskProgress(idx);
    }) : singleSeriesTaskProgress;
  }
  var singleSeriesTaskProgress = makeSeriesTaskProgress(0);
  function makeSeriesTaskProgress(resetDefineIdx) {
    return function(params, context) {
      var data = context.data;
      var resetDefine = context.resetDefines[resetDefineIdx];
      if (resetDefine && resetDefine.dataEach) {
        for (var i2 = params.start; i2 < params.end; i2++) {
          resetDefine.dataEach(data, i2);
        }
      } else if (resetDefine && resetDefine.progress) {
        resetDefine.progress(params, data);
      }
    };
  }
  function seriesTaskCount(context) {
    return context.data.count();
  }
  function pipe(scheduler, seriesModel, task2) {
    var pipelineId = seriesModel.uid;
    var pipeline = scheduler._pipelineMap.get(pipelineId);
    !pipeline.head && (pipeline.head = task2);
    pipeline.tail && pipeline.tail.pipe(task2);
    pipeline.tail = task2;
    task2.__idxInPipeline = pipeline.count++;
    task2.__pipeline = pipeline;
  }
  Scheduler.wrapStageHandler = function(stageHandler, visualType) {
    if (isFunction$1(stageHandler)) {
      stageHandler = {
        overallReset: stageHandler,
        seriesType: detectSeriseType(stageHandler)
      };
    }
    stageHandler.uid = getUID("stageHandler");
    visualType && (stageHandler.visualType = visualType);
    return stageHandler;
  };
  function detectSeriseType(legacyFunc) {
    seriesType = null;
    try {
      legacyFunc(ecModelMock, apiMock);
    } catch (e) {
    }
    return seriesType;
  }
  var ecModelMock = {};
  var apiMock = {};
  var seriesType;
  mockMethods(ecModelMock, GlobalModel);
  mockMethods(apiMock, ExtensionAPI);
  ecModelMock.eachSeriesByType = ecModelMock.eachRawSeriesByType = function(type) {
    seriesType = type;
  };
  ecModelMock.eachComponent = function(cond) {
    if (cond.mainType === "series" && cond.subType) {
      seriesType = cond.subType;
    }
  };
  function mockMethods(target, Clz) {
    for (var name in Clz.prototype) {
      target[name] = noop;
    }
  }
  var _default$B = Scheduler;
  var Scheduler_1 = _default$B;
  var colorAll = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"];
  var _default$A = {
    color: colorAll,
    colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], colorAll]
  };
  var light = _default$A;
  var contrastColor = "#eee";
  var axisCommon = function() {
    return {
      axisLine: {
        lineStyle: {
          color: contrastColor
        }
      },
      axisTick: {
        lineStyle: {
          color: contrastColor
        }
      },
      axisLabel: {
        textStyle: {
          color: contrastColor
        }
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "#aaa"
        }
      },
      splitArea: {
        areaStyle: {
          color: contrastColor
        }
      }
    };
  };
  var colorPalette = ["#dd6b66", "#759aa0", "#e69d87", "#8dc1a9", "#ea7e53", "#eedd78", "#73a373", "#73b9bc", "#7289ab", "#91ca8c", "#f49f42"];
  var theme = {
    color: colorPalette,
    backgroundColor: "#333",
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: contrastColor
        },
        crossStyle: {
          color: contrastColor
        },
        label: {
          color: "#000"
        }
      }
    },
    legend: {
      textStyle: {
        color: contrastColor
      }
    },
    textStyle: {
      color: contrastColor
    },
    title: {
      textStyle: {
        color: contrastColor
      }
    },
    toolbox: {
      iconStyle: {
        normal: {
          borderColor: contrastColor
        }
      }
    },
    dataZoom: {
      textStyle: {
        color: contrastColor
      }
    },
    visualMap: {
      textStyle: {
        color: contrastColor
      }
    },
    timeline: {
      lineStyle: {
        color: contrastColor
      },
      itemStyle: {
        normal: {
          color: colorPalette[1]
        }
      },
      label: {
        normal: {
          textStyle: {
            color: contrastColor
          }
        }
      },
      controlStyle: {
        normal: {
          color: contrastColor,
          borderColor: contrastColor
        }
      }
    },
    timeAxis: axisCommon(),
    logAxis: axisCommon(),
    valueAxis: axisCommon(),
    categoryAxis: axisCommon(),
    line: {
      symbol: "circle"
    },
    graph: {
      color: colorPalette
    },
    gauge: {
      title: {
        textStyle: {
          color: contrastColor
        }
      }
    },
    candlestick: {
      itemStyle: {
        normal: {
          color: "#FD1050",
          color0: "#0CF49B",
          borderColor: "#FD1050",
          borderColor0: "#0CF49B"
        }
      }
    }
  };
  theme.categoryAxis.splitLine.show = false;
  var _default$z = theme;
  var dark = _default$z;
  var ComponentModel$3 = Component$2;
  var ComponentView = Component_1;
  var _sourceHelper$2 = sourceHelper;
  var detectSourceFormat = _sourceHelper$2.detectSourceFormat;
  var _sourceType$1 = sourceType;
  var SERIES_LAYOUT_BY_COLUMN = _sourceType$1.SERIES_LAYOUT_BY_COLUMN;
  ComponentModel$3.extend({
    type: "dataset",
    defaultOption: {
      seriesLayoutBy: SERIES_LAYOUT_BY_COLUMN,
      sourceHeader: null,
      dimensions: null,
      source: null
    },
    optionUpdated: function() {
      detectSourceFormat(this);
    }
  });
  ComponentView.extend({
    type: "dataset"
  });
  var parseSVG$1 = {};
  var Path$2 = Path_1;
  var _default$y = Path$2.extend({
    type: "ellipse",
    shape: {
      cx: 0,
      cy: 0,
      rx: 0,
      ry: 0
    },
    buildPath: function(ctx, shape) {
      var k = 0.5522848;
      var x = shape.cx;
      var y = shape.cy;
      var a = shape.rx;
      var b = shape.ry;
      var ox = a * k;
      var oy = b * k;
      ctx.moveTo(x - a, y);
      ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
      ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
      ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
      ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
      ctx.closePath();
    }
  });
  var Ellipse$1 = _default$y;
  var Group$1 = Group_1;
  var ZImage = Image$2;
  var Text$1 = Text_1;
  var Circle = Circle$2;
  var Rect = Rect$2;
  var Ellipse = Ellipse$1;
  var Line = Line$2;
  var Path$1 = Path_1;
  var Polygon$2 = Polygon$4;
  var Polyline$2 = Polyline$4;
  var LinearGradient = LinearGradient_1;
  var Style = Style_1;
  var matrix$2 = matrix$6;
  var _path = path$1;
  var createFromString = _path.createFromString;
  var _util$d = util$6;
  var isString$3 = _util$d.isString;
  var extend$2 = _util$d.extend;
  var defaults$2 = _util$d.defaults;
  var trim = _util$d.trim;
  var each$e = _util$d.each;
  var DILIMITER_REG = /[\s,]+/;
  function parseXML$1(svg) {
    if (isString$3(svg)) {
      var parser = new DOMParser();
      svg = parser.parseFromString(svg, "text/xml");
    }
    if (svg.nodeType === 9) {
      svg = svg.firstChild;
    }
    while (svg.nodeName.toLowerCase() !== "svg" || svg.nodeType !== 1) {
      svg = svg.nextSibling;
    }
    return svg;
  }
  function SVGParser() {
    this._defs = {};
    this._root = null;
    this._isDefine = false;
    this._isText = false;
  }
  SVGParser.prototype.parse = function(xml, opt) {
    opt = opt || {};
    var svg = parseXML$1(xml);
    if (!svg) {
      throw new Error("Illegal svg");
    }
    var root = new Group$1();
    this._root = root;
    var viewBox = svg.getAttribute("viewBox") || "";
    var width = parseFloat(svg.getAttribute("width") || opt.width);
    var height = parseFloat(svg.getAttribute("height") || opt.height);
    isNaN(width) && (width = null);
    isNaN(height) && (height = null);
    parseAttributes(svg, root, null, true);
    var child = svg.firstChild;
    while (child) {
      this._parseNode(child, root);
      child = child.nextSibling;
    }
    var viewBoxRect;
    var viewBoxTransform;
    if (viewBox) {
      var viewBoxArr = trim(viewBox).split(DILIMITER_REG);
      if (viewBoxArr.length >= 4) {
        viewBoxRect = {
          x: parseFloat(viewBoxArr[0] || 0),
          y: parseFloat(viewBoxArr[1] || 0),
          width: parseFloat(viewBoxArr[2]),
          height: parseFloat(viewBoxArr[3])
        };
      }
    }
    if (viewBoxRect && width != null && height != null) {
      viewBoxTransform = makeViewBoxTransform(viewBoxRect, width, height);
      if (!opt.ignoreViewBox) {
        var elRoot = root;
        root = new Group$1();
        root.add(elRoot);
        elRoot.scale = viewBoxTransform.scale.slice();
        elRoot.position = viewBoxTransform.position.slice();
      }
    }
    if (!opt.ignoreRootClip && width != null && height != null) {
      root.setClipPath(new Rect({
        shape: {
          x: 0,
          y: 0,
          width,
          height
        }
      }));
    }
    return {
      root,
      width,
      height,
      viewBoxRect,
      viewBoxTransform
    };
  };
  SVGParser.prototype._parseNode = function(xmlNode, parentGroup) {
    var nodeName = xmlNode.nodeName.toLowerCase();
    if (nodeName === "defs") {
      this._isDefine = true;
    } else if (nodeName === "text") {
      this._isText = true;
    }
    var el;
    if (this._isDefine) {
      var parser = defineParsers[nodeName];
      if (parser) {
        var def = parser.call(this, xmlNode);
        var id = xmlNode.getAttribute("id");
        if (id) {
          this._defs[id] = def;
        }
      }
    } else {
      var parser = nodeParsers[nodeName];
      if (parser) {
        el = parser.call(this, xmlNode, parentGroup);
        parentGroup.add(el);
      }
    }
    var child = xmlNode.firstChild;
    while (child) {
      if (child.nodeType === 1) {
        this._parseNode(child, el);
      }
      if (child.nodeType === 3 && this._isText) {
        this._parseText(child, el);
      }
      child = child.nextSibling;
    }
    if (nodeName === "defs") {
      this._isDefine = false;
    } else if (nodeName === "text") {
      this._isText = false;
    }
  };
  SVGParser.prototype._parseText = function(xmlNode, parentGroup) {
    if (xmlNode.nodeType === 1) {
      var dx = xmlNode.getAttribute("dx") || 0;
      var dy = xmlNode.getAttribute("dy") || 0;
      this._textX += parseFloat(dx);
      this._textY += parseFloat(dy);
    }
    var text2 = new Text$1({
      style: {
        text: xmlNode.textContent,
        transformText: true
      },
      position: [this._textX || 0, this._textY || 0]
    });
    inheritStyle(parentGroup, text2);
    parseAttributes(xmlNode, text2, this._defs);
    var fontSize = text2.style.fontSize;
    if (fontSize && fontSize < 9) {
      text2.style.fontSize = 9;
      text2.scale = text2.scale || [1, 1];
      text2.scale[0] *= fontSize / 9;
      text2.scale[1] *= fontSize / 9;
    }
    var rect = text2.getBoundingRect();
    this._textX += rect.width;
    parentGroup.add(text2);
    return text2;
  };
  var nodeParsers = {
    "g": function(xmlNode, parentGroup) {
      var g = new Group$1();
      inheritStyle(parentGroup, g);
      parseAttributes(xmlNode, g, this._defs);
      return g;
    },
    "rect": function(xmlNode, parentGroup) {
      var rect = new Rect();
      inheritStyle(parentGroup, rect);
      parseAttributes(xmlNode, rect, this._defs);
      rect.setShape({
        x: parseFloat(xmlNode.getAttribute("x") || 0),
        y: parseFloat(xmlNode.getAttribute("y") || 0),
        width: parseFloat(xmlNode.getAttribute("width") || 0),
        height: parseFloat(xmlNode.getAttribute("height") || 0)
      });
      return rect;
    },
    "circle": function(xmlNode, parentGroup) {
      var circle = new Circle();
      inheritStyle(parentGroup, circle);
      parseAttributes(xmlNode, circle, this._defs);
      circle.setShape({
        cx: parseFloat(xmlNode.getAttribute("cx") || 0),
        cy: parseFloat(xmlNode.getAttribute("cy") || 0),
        r: parseFloat(xmlNode.getAttribute("r") || 0)
      });
      return circle;
    },
    "line": function(xmlNode, parentGroup) {
      var line2 = new Line();
      inheritStyle(parentGroup, line2);
      parseAttributes(xmlNode, line2, this._defs);
      line2.setShape({
        x1: parseFloat(xmlNode.getAttribute("x1") || 0),
        y1: parseFloat(xmlNode.getAttribute("y1") || 0),
        x2: parseFloat(xmlNode.getAttribute("x2") || 0),
        y2: parseFloat(xmlNode.getAttribute("y2") || 0)
      });
      return line2;
    },
    "ellipse": function(xmlNode, parentGroup) {
      var ellipse = new Ellipse();
      inheritStyle(parentGroup, ellipse);
      parseAttributes(xmlNode, ellipse, this._defs);
      ellipse.setShape({
        cx: parseFloat(xmlNode.getAttribute("cx") || 0),
        cy: parseFloat(xmlNode.getAttribute("cy") || 0),
        rx: parseFloat(xmlNode.getAttribute("rx") || 0),
        ry: parseFloat(xmlNode.getAttribute("ry") || 0)
      });
      return ellipse;
    },
    "polygon": function(xmlNode, parentGroup) {
      var points2 = xmlNode.getAttribute("points");
      if (points2) {
        points2 = parsePoints(points2);
      }
      var polygon2 = new Polygon$2({
        shape: {
          points: points2 || []
        }
      });
      inheritStyle(parentGroup, polygon2);
      parseAttributes(xmlNode, polygon2, this._defs);
      return polygon2;
    },
    "polyline": function(xmlNode, parentGroup) {
      var path2 = new Path$1();
      inheritStyle(parentGroup, path2);
      parseAttributes(xmlNode, path2, this._defs);
      var points2 = xmlNode.getAttribute("points");
      if (points2) {
        points2 = parsePoints(points2);
      }
      var polyline = new Polyline$2({
        shape: {
          points: points2 || []
        }
      });
      return polyline;
    },
    "image": function(xmlNode, parentGroup) {
      var img = new ZImage();
      inheritStyle(parentGroup, img);
      parseAttributes(xmlNode, img, this._defs);
      img.setStyle({
        image: xmlNode.getAttribute("xlink:href"),
        x: xmlNode.getAttribute("x"),
        y: xmlNode.getAttribute("y"),
        width: xmlNode.getAttribute("width"),
        height: xmlNode.getAttribute("height")
      });
      return img;
    },
    "text": function(xmlNode, parentGroup) {
      var x = xmlNode.getAttribute("x") || 0;
      var y = xmlNode.getAttribute("y") || 0;
      var dx = xmlNode.getAttribute("dx") || 0;
      var dy = xmlNode.getAttribute("dy") || 0;
      this._textX = parseFloat(x) + parseFloat(dx);
      this._textY = parseFloat(y) + parseFloat(dy);
      var g = new Group$1();
      inheritStyle(parentGroup, g);
      parseAttributes(xmlNode, g, this._defs);
      return g;
    },
    "tspan": function(xmlNode, parentGroup) {
      var x = xmlNode.getAttribute("x");
      var y = xmlNode.getAttribute("y");
      if (x != null) {
        this._textX = parseFloat(x);
      }
      if (y != null) {
        this._textY = parseFloat(y);
      }
      var dx = xmlNode.getAttribute("dx") || 0;
      var dy = xmlNode.getAttribute("dy") || 0;
      var g = new Group$1();
      inheritStyle(parentGroup, g);
      parseAttributes(xmlNode, g, this._defs);
      this._textX += dx;
      this._textY += dy;
      return g;
    },
    "path": function(xmlNode, parentGroup) {
      var d = xmlNode.getAttribute("d") || "";
      var path2 = createFromString(d);
      inheritStyle(parentGroup, path2);
      parseAttributes(xmlNode, path2, this._defs);
      return path2;
    }
  };
  var defineParsers = {
    "lineargradient": function(xmlNode) {
      var x1 = parseInt(xmlNode.getAttribute("x1") || 0, 10);
      var y1 = parseInt(xmlNode.getAttribute("y1") || 0, 10);
      var x2 = parseInt(xmlNode.getAttribute("x2") || 10, 10);
      var y2 = parseInt(xmlNode.getAttribute("y2") || 0, 10);
      var gradient = new LinearGradient(x1, y1, x2, y2);
      _parseGradientColorStops(xmlNode, gradient);
      return gradient;
    },
    "radialgradient": function(xmlNode) {
    }
  };
  function _parseGradientColorStops(xmlNode, gradient) {
    var stop2 = xmlNode.firstChild;
    while (stop2) {
      if (stop2.nodeType === 1) {
        var offset = stop2.getAttribute("offset");
        if (offset.indexOf("%") > 0) {
          offset = parseInt(offset, 10) / 100;
        } else if (offset) {
          offset = parseFloat(offset);
        } else {
          offset = 0;
        }
        var stopColor = stop2.getAttribute("stop-color") || "#000000";
        gradient.addColorStop(offset, stopColor);
      }
      stop2 = stop2.nextSibling;
    }
  }
  function inheritStyle(parent, child) {
    if (parent && parent.__inheritedStyle) {
      if (!child.__inheritedStyle) {
        child.__inheritedStyle = {};
      }
      defaults$2(child.__inheritedStyle, parent.__inheritedStyle);
    }
  }
  function parsePoints(pointsString) {
    var list = trim(pointsString).split(DILIMITER_REG);
    var points2 = [];
    for (var i2 = 0; i2 < list.length; i2 += 2) {
      var x = parseFloat(list[i2]);
      var y = parseFloat(list[i2 + 1]);
      points2.push([x, y]);
    }
    return points2;
  }
  var attributesMap = {
    "fill": "fill",
    "stroke": "stroke",
    "stroke-width": "lineWidth",
    "opacity": "opacity",
    "fill-opacity": "fillOpacity",
    "stroke-opacity": "strokeOpacity",
    "stroke-dasharray": "lineDash",
    "stroke-dashoffset": "lineDashOffset",
    "stroke-linecap": "lineCap",
    "stroke-linejoin": "lineJoin",
    "stroke-miterlimit": "miterLimit",
    "font-family": "fontFamily",
    "font-size": "fontSize",
    "font-style": "fontStyle",
    "font-weight": "fontWeight",
    "text-align": "textAlign",
    "alignment-baseline": "textBaseline"
  };
  function parseAttributes(xmlNode, el, defs, onlyInlineStyle) {
    var zrStyle = el.__inheritedStyle || {};
    var isTextEl = el.type === "text";
    if (xmlNode.nodeType === 1) {
      parseTransformAttribute(xmlNode, el);
      extend$2(zrStyle, parseStyleAttribute(xmlNode));
      if (!onlyInlineStyle) {
        for (var svgAttrName in attributesMap) {
          if (attributesMap.hasOwnProperty(svgAttrName)) {
            var attrValue = xmlNode.getAttribute(svgAttrName);
            if (attrValue != null) {
              zrStyle[attributesMap[svgAttrName]] = attrValue;
            }
          }
        }
      }
    }
    var elFillProp = isTextEl ? "textFill" : "fill";
    var elStrokeProp = isTextEl ? "textStroke" : "stroke";
    el.style = el.style || new Style();
    var elStyle = el.style;
    zrStyle.fill != null && elStyle.set(elFillProp, getPaint(zrStyle.fill, defs));
    zrStyle.stroke != null && elStyle.set(elStrokeProp, getPaint(zrStyle.stroke, defs));
    each$e(["lineWidth", "opacity", "fillOpacity", "strokeOpacity", "miterLimit", "fontSize"], function(propName) {
      var elPropName = propName === "lineWidth" && isTextEl ? "textStrokeWidth" : propName;
      zrStyle[propName] != null && elStyle.set(elPropName, parseFloat(zrStyle[propName]));
    });
    if (!zrStyle.textBaseline || zrStyle.textBaseline === "auto") {
      zrStyle.textBaseline = "alphabetic";
    }
    if (zrStyle.textBaseline === "alphabetic") {
      zrStyle.textBaseline = "bottom";
    }
    if (zrStyle.textAlign === "start") {
      zrStyle.textAlign = "left";
    }
    if (zrStyle.textAlign === "end") {
      zrStyle.textAlign = "right";
    }
    each$e(["lineDashOffset", "lineCap", "lineJoin", "fontWeight", "fontFamily", "fontStyle", "textAlign", "textBaseline"], function(propName) {
      zrStyle[propName] != null && elStyle.set(propName, zrStyle[propName]);
    });
    if (zrStyle.lineDash) {
      el.style.lineDash = trim(zrStyle.lineDash).split(DILIMITER_REG);
    }
    if (elStyle[elStrokeProp] && elStyle[elStrokeProp] !== "none") {
      el[elStrokeProp] = true;
    }
    el.__inheritedStyle = zrStyle;
  }
  var urlRegex = /url\(\s*#(.*?)\)/;
  function getPaint(str, defs) {
    var urlMatch = defs && str && str.match(urlRegex);
    if (urlMatch) {
      var url = trim(urlMatch[1]);
      var def = defs[url];
      return def;
    }
    return str;
  }
  var transformRegex = /(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.e,]*)\)/g;
  function parseTransformAttribute(xmlNode, node) {
    var transform = xmlNode.getAttribute("transform");
    if (transform) {
      transform = transform.replace(/,/g, " ");
      var m2 = null;
      var transformOps = [];
      transform.replace(transformRegex, function(str, type2, value2) {
        transformOps.push(type2, value2);
      });
      for (var i2 = transformOps.length - 1; i2 > 0; i2 -= 2) {
        var value = transformOps[i2];
        var type = transformOps[i2 - 1];
        m2 = m2 || matrix$2.create();
        switch (type) {
          case "translate":
            value = trim(value).split(DILIMITER_REG);
            matrix$2.translate(m2, m2, [parseFloat(value[0]), parseFloat(value[1] || 0)]);
            break;
          case "scale":
            value = trim(value).split(DILIMITER_REG);
            matrix$2.scale(m2, m2, [parseFloat(value[0]), parseFloat(value[1] || value[0])]);
            break;
          case "rotate":
            value = trim(value).split(DILIMITER_REG);
            matrix$2.rotate(m2, m2, parseFloat(value[0]));
            break;
          case "skew":
            value = trim(value).split(DILIMITER_REG);
            formatAppLog("warn", "at node_modules/zrender/lib/tool/parseSVG.js:601", "Skew transform is not supported yet");
            break;
          case "matrix":
            var value = trim(value).split(DILIMITER_REG);
            m2[0] = parseFloat(value[0]);
            m2[1] = parseFloat(value[1]);
            m2[2] = parseFloat(value[2]);
            m2[3] = parseFloat(value[3]);
            m2[4] = parseFloat(value[4]);
            m2[5] = parseFloat(value[5]);
            break;
        }
      }
      node.setLocalTransform(m2);
    }
  }
  var styleRegex = /([^\s:;]+)\s*:\s*([^:;]+)/g;
  function parseStyleAttribute(xmlNode) {
    var style = xmlNode.getAttribute("style");
    var result = {};
    if (!style) {
      return result;
    }
    var styleList = {};
    styleRegex.lastIndex = 0;
    var styleRegResult;
    while ((styleRegResult = styleRegex.exec(style)) != null) {
      styleList[styleRegResult[1]] = styleRegResult[2];
    }
    for (var svgAttrName in attributesMap) {
      if (attributesMap.hasOwnProperty(svgAttrName) && styleList[svgAttrName] != null) {
        result[attributesMap[svgAttrName]] = styleList[svgAttrName];
      }
    }
    return result;
  }
  function makeViewBoxTransform(viewBoxRect, width, height) {
    var scaleX = width / viewBoxRect.width;
    var scaleY = height / viewBoxRect.height;
    var scale2 = Math.min(scaleX, scaleY);
    var viewBoxScale = [scale2, scale2];
    var viewBoxPosition = [-(viewBoxRect.x + viewBoxRect.width / 2) * scale2 + width / 2, -(viewBoxRect.y + viewBoxRect.height / 2) * scale2 + height / 2];
    return {
      scale: viewBoxScale,
      position: viewBoxPosition
    };
  }
  function parseSVG(xml, opt) {
    var parser = new SVGParser();
    return parser.parse(xml, opt);
  }
  parseSVG$1.parseXML = parseXML$1;
  parseSVG$1.makeViewBoxTransform = makeViewBoxTransform;
  parseSVG$1.parseSVG = parseSVG;
  var _util$c = util$6;
  var createHashMap$4 = _util$c.createHashMap;
  var isString$2 = _util$c.isString;
  var isArray = _util$c.isArray;
  var each$d = _util$c.each;
  _util$c.assert;
  var _parseSVG = parseSVG$1;
  var parseXML = _parseSVG.parseXML;
  var storage = createHashMap$4();
  var _default$x = {
    registerMap: function(mapName, rawGeoJson, rawSpecialAreas) {
      var records;
      if (isArray(rawGeoJson)) {
        records = rawGeoJson;
      } else if (rawGeoJson.svg) {
        records = [{
          type: "svg",
          source: rawGeoJson.svg,
          specialAreas: rawGeoJson.specialAreas
        }];
      } else {
        if (rawGeoJson.geoJson && !rawGeoJson.features) {
          rawSpecialAreas = rawGeoJson.specialAreas;
          rawGeoJson = rawGeoJson.geoJson;
        }
        records = [{
          type: "geoJSON",
          source: rawGeoJson,
          specialAreas: rawSpecialAreas
        }];
      }
      each$d(records, function(record) {
        var type = record.type;
        type === "geoJson" && (type = record.type = "geoJSON");
        var parse2 = parsers[type];
        parse2(record);
      });
      return storage.set(mapName, records);
    },
    retrieveMap: function(mapName) {
      return storage.get(mapName);
    }
  };
  var parsers = {
    geoJSON: function(record) {
      var source = record.source;
      record.geoJSON = !isString$2(source) ? source : typeof JSON !== "undefined" && JSON.parse ? JSON.parse(source) : new Function("return (" + source + ");")();
    },
    svg: function(record) {
      record.svgXML = parseXML(record.source);
    }
  };
  var mapDataStorage = _default$x;
  var _export = {};
  var helper$3 = {};
  function defaultKeyGetter(item) {
    return item;
  }
  function DataDiffer$1(oldArr, newArr, oldKeyGetter, newKeyGetter, context) {
    this._old = oldArr;
    this._new = newArr;
    this._oldKeyGetter = oldKeyGetter || defaultKeyGetter;
    this._newKeyGetter = newKeyGetter || defaultKeyGetter;
    this.context = context;
  }
  DataDiffer$1.prototype = {
    constructor: DataDiffer$1,
    add: function(func) {
      this._add = func;
      return this;
    },
    update: function(func) {
      this._update = func;
      return this;
    },
    remove: function(func) {
      this._remove = func;
      return this;
    },
    execute: function() {
      var oldArr = this._old;
      var newArr = this._new;
      var oldDataIndexMap = {};
      var newDataIndexMap = {};
      var oldDataKeyArr = [];
      var newDataKeyArr = [];
      var i2;
      initIndexMap(oldArr, oldDataIndexMap, oldDataKeyArr, "_oldKeyGetter", this);
      initIndexMap(newArr, newDataIndexMap, newDataKeyArr, "_newKeyGetter", this);
      for (i2 = 0; i2 < oldArr.length; i2++) {
        var key = oldDataKeyArr[i2];
        var idx = newDataIndexMap[key];
        if (idx != null) {
          var len2 = idx.length;
          if (len2) {
            len2 === 1 && (newDataIndexMap[key] = null);
            idx = idx.shift();
          } else {
            newDataIndexMap[key] = null;
          }
          this._update && this._update(idx, i2);
        } else {
          this._remove && this._remove(i2);
        }
      }
      for (var i2 = 0; i2 < newDataKeyArr.length; i2++) {
        var key = newDataKeyArr[i2];
        if (newDataIndexMap.hasOwnProperty(key)) {
          var idx = newDataIndexMap[key];
          if (idx == null) {
            continue;
          }
          if (!idx.length) {
            this._add && this._add(idx);
          } else {
            for (var j = 0, len2 = idx.length; j < len2; j++) {
              this._add && this._add(idx[j]);
            }
          }
        }
      }
    }
  };
  function initIndexMap(arr, map2, keyArr, keyGetterName, dataDiffer) {
    for (var i2 = 0; i2 < arr.length; i2++) {
      var key = "_ec_" + dataDiffer[keyGetterName](arr[i2], i2);
      var existence = map2[key];
      if (existence == null) {
        keyArr.push(key);
        map2[key] = i2;
      } else {
        if (!existence.length) {
          map2[key] = existence = [existence];
        }
        existence.push(i2);
      }
    }
  }
  var _default$w = DataDiffer$1;
  var DataDiffer_1 = _default$w;
  var dimensionHelper = {};
  var _util$b = util$6;
  var each$c = _util$b.each;
  var createHashMap$3 = _util$b.createHashMap;
  _util$b.assert;
  var OTHER_DIMENSIONS$1 = createHashMap$3(["tooltip", "label", "itemName", "itemId", "seriesName"]);
  function summarizeDimensions$1(data) {
    var summary = {};
    var encode = summary.encode = {};
    var notExtraCoordDimMap = createHashMap$3();
    var defaultedLabel = [];
    var defaultedTooltip = [];
    var userOutput = summary.userOutput = {
      dimensionNames: data.dimensions.slice(),
      encode: {}
    };
    each$c(data.dimensions, function(dimName) {
      var dimItem = data.getDimensionInfo(dimName);
      var coordDim = dimItem.coordDim;
      if (coordDim) {
        var coordDimIndex = dimItem.coordDimIndex;
        getOrCreateEncodeArr(encode, coordDim)[coordDimIndex] = dimName;
        if (!dimItem.isExtraCoord) {
          notExtraCoordDimMap.set(coordDim, 1);
          if (mayLabelDimType(dimItem.type)) {
            defaultedLabel[0] = dimName;
          }
          getOrCreateEncodeArr(userOutput.encode, coordDim)[coordDimIndex] = dimItem.index;
        }
        if (dimItem.defaultTooltip) {
          defaultedTooltip.push(dimName);
        }
      }
      OTHER_DIMENSIONS$1.each(function(v2, otherDim) {
        var encodeArr = getOrCreateEncodeArr(encode, otherDim);
        var dimIndex = dimItem.otherDims[otherDim];
        if (dimIndex != null && dimIndex !== false) {
          encodeArr[dimIndex] = dimItem.name;
        }
      });
    });
    var dataDimsOnCoord = [];
    var encodeFirstDimNotExtra = {};
    notExtraCoordDimMap.each(function(v2, coordDim) {
      var dimArr = encode[coordDim];
      encodeFirstDimNotExtra[coordDim] = dimArr[0];
      dataDimsOnCoord = dataDimsOnCoord.concat(dimArr);
    });
    summary.dataDimsOnCoord = dataDimsOnCoord;
    summary.encodeFirstDimNotExtra = encodeFirstDimNotExtra;
    var encodeLabel = encode.label;
    if (encodeLabel && encodeLabel.length) {
      defaultedLabel = encodeLabel.slice();
    }
    var encodeTooltip = encode.tooltip;
    if (encodeTooltip && encodeTooltip.length) {
      defaultedTooltip = encodeTooltip.slice();
    } else if (!defaultedTooltip.length) {
      defaultedTooltip = defaultedLabel.slice();
    }
    encode.defaultedLabel = defaultedLabel;
    encode.defaultedTooltip = defaultedTooltip;
    return summary;
  }
  function getOrCreateEncodeArr(encode, dim) {
    if (!encode.hasOwnProperty(dim)) {
      encode[dim] = [];
    }
    return encode[dim];
  }
  function getDimensionTypeByAxis$1(axisType) {
    return axisType === "category" ? "ordinal" : axisType === "time" ? "time" : "float";
  }
  function mayLabelDimType(dimType) {
    return !(dimType === "ordinal" || dimType === "time");
  }
  dimensionHelper.OTHER_DIMENSIONS = OTHER_DIMENSIONS$1;
  dimensionHelper.summarizeDimensions = summarizeDimensions$1;
  dimensionHelper.getDimensionTypeByAxis = getDimensionTypeByAxis$1;
  var zrUtil$C = util$6;
  function DataDimensionInfo$2(opt) {
    if (opt != null) {
      zrUtil$C.extend(this, opt);
    }
    this.otherDims = {};
  }
  var _default$v = DataDimensionInfo$2;
  var DataDimensionInfo_1 = _default$v;
  var zrUtil$B = util$6;
  var Model$5 = Model_1;
  var DataDiffer = DataDiffer_1;
  var Source$2 = Source_1;
  var _dataProvider$1 = dataProvider;
  var defaultDimValueGetters = _dataProvider$1.defaultDimValueGetters;
  var DefaultDataProvider = _dataProvider$1.DefaultDataProvider;
  var _dimensionHelper$2 = dimensionHelper;
  var summarizeDimensions = _dimensionHelper$2.summarizeDimensions;
  var DataDimensionInfo$1 = DataDimensionInfo_1;
  var isObject$4 = zrUtil$B.isObject;
  var UNDEFINED = "undefined";
  var INDEX_NOT_FOUND = -1;
  var ID_PREFIX = "e\0\0";
  var dataCtors = {
    "float": typeof Float64Array === UNDEFINED ? Array : Float64Array,
    "int": typeof Int32Array === UNDEFINED ? Array : Int32Array,
    "ordinal": Array,
    "number": Array,
    "time": Array
  };
  var CtorUint32Array = typeof Uint32Array === UNDEFINED ? Array : Uint32Array;
  var CtorInt32Array = typeof Int32Array === UNDEFINED ? Array : Int32Array;
  var CtorUint16Array = typeof Uint16Array === UNDEFINED ? Array : Uint16Array;
  function getIndicesCtor(list) {
    return list._rawCount > 65535 ? CtorUint32Array : CtorUint16Array;
  }
  function cloneChunk(originalChunk) {
    var Ctor = originalChunk.constructor;
    return Ctor === Array ? originalChunk.slice() : new Ctor(originalChunk);
  }
  var TRANSFERABLE_PROPERTIES = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_rawData", "_chunkSize", "_chunkCount", "_dimValueGetter", "_count", "_rawCount", "_nameDimIdx", "_idDimIdx"];
  var CLONE_PROPERTIES = ["_extent", "_approximateExtent", "_rawExtent"];
  function transferProperties(target, source) {
    zrUtil$B.each(TRANSFERABLE_PROPERTIES.concat(source.__wrappedMethods || []), function(propName) {
      if (source.hasOwnProperty(propName)) {
        target[propName] = source[propName];
      }
    });
    target.__wrappedMethods = source.__wrappedMethods;
    zrUtil$B.each(CLONE_PROPERTIES, function(propName) {
      target[propName] = zrUtil$B.clone(source[propName]);
    });
    target._calculationInfo = zrUtil$B.extend(source._calculationInfo);
  }
  var List$1 = function(dimensions, hostModel) {
    dimensions = dimensions || ["x", "y"];
    var dimensionInfos = {};
    var dimensionNames = [];
    var invertedIndicesMap = {};
    for (var i2 = 0; i2 < dimensions.length; i2++) {
      var dimensionInfo = dimensions[i2];
      if (zrUtil$B.isString(dimensionInfo)) {
        dimensionInfo = new DataDimensionInfo$1({
          name: dimensionInfo
        });
      } else if (!(dimensionInfo instanceof DataDimensionInfo$1)) {
        dimensionInfo = new DataDimensionInfo$1(dimensionInfo);
      }
      var dimensionName = dimensionInfo.name;
      dimensionInfo.type = dimensionInfo.type || "float";
      if (!dimensionInfo.coordDim) {
        dimensionInfo.coordDim = dimensionName;
        dimensionInfo.coordDimIndex = 0;
      }
      dimensionInfo.otherDims = dimensionInfo.otherDims || {};
      dimensionNames.push(dimensionName);
      dimensionInfos[dimensionName] = dimensionInfo;
      dimensionInfo.index = i2;
      if (dimensionInfo.createInvertedIndices) {
        invertedIndicesMap[dimensionName] = [];
      }
    }
    this.dimensions = dimensionNames;
    this._dimensionInfos = dimensionInfos;
    this.hostModel = hostModel;
    this.dataType;
    this._indices = null;
    this._count = 0;
    this._rawCount = 0;
    this._storage = {};
    this._nameList = [];
    this._idList = [];
    this._optionModels = [];
    this._visual = {};
    this._layout = {};
    this._itemVisuals = [];
    this.hasItemVisual = {};
    this._itemLayouts = [];
    this._graphicEls = [];
    this._chunkSize = 1e5;
    this._chunkCount = 0;
    this._rawData;
    this._rawExtent = {};
    this._extent = {};
    this._approximateExtent = {};
    this._dimensionsSummary = summarizeDimensions(this);
    this._invertedIndicesMap = invertedIndicesMap;
    this._calculationInfo = {};
    this.userOutput = this._dimensionsSummary.userOutput;
  };
  var listProto = List$1.prototype;
  listProto.type = "list";
  listProto.hasItemOption = true;
  listProto.getDimension = function(dim) {
    if (typeof dim === "number" || !isNaN(dim) && !this._dimensionInfos.hasOwnProperty(dim)) {
      dim = this.dimensions[dim];
    }
    return dim;
  };
  listProto.getDimensionInfo = function(dim) {
    return this._dimensionInfos[this.getDimension(dim)];
  };
  listProto.getDimensionsOnCoord = function() {
    return this._dimensionsSummary.dataDimsOnCoord.slice();
  };
  listProto.mapDimension = function(coordDim, idx) {
    var dimensionsSummary = this._dimensionsSummary;
    if (idx == null) {
      return dimensionsSummary.encodeFirstDimNotExtra[coordDim];
    }
    var dims = dimensionsSummary.encode[coordDim];
    return idx === true ? (dims || []).slice() : dims && dims[idx];
  };
  listProto.initData = function(data, nameList, dimValueGetter) {
    var notProvider = Source$2.isInstance(data) || zrUtil$B.isArrayLike(data);
    if (notProvider) {
      data = new DefaultDataProvider(data, this.dimensions.length);
    }
    this._rawData = data;
    this._storage = {};
    this._indices = null;
    this._nameList = nameList || [];
    this._idList = [];
    this._nameRepeatCount = {};
    if (!dimValueGetter) {
      this.hasItemOption = false;
    }
    this.defaultDimValueGetter = defaultDimValueGetters[this._rawData.getSource().sourceFormat];
    this._dimValueGetter = dimValueGetter = dimValueGetter || this.defaultDimValueGetter;
    this._dimValueGetterArrayRows = defaultDimValueGetters.arrayRows;
    this._rawExtent = {};
    this._initDataFromProvider(0, data.count());
    if (data.pure) {
      this.hasItemOption = false;
    }
  };
  listProto.getProvider = function() {
    return this._rawData;
  };
  listProto.appendData = function(data) {
    var rawData = this._rawData;
    var start2 = this.count();
    rawData.appendData(data);
    var end2 = rawData.count();
    if (!rawData.persistent) {
      end2 += start2;
    }
    this._initDataFromProvider(start2, end2);
  };
  listProto.appendValues = function(values, names) {
    var chunkSize = this._chunkSize;
    var storage2 = this._storage;
    var dimensions = this.dimensions;
    var dimLen = dimensions.length;
    var rawExtent = this._rawExtent;
    var start2 = this.count();
    var end2 = start2 + Math.max(values.length, names ? names.length : 0);
    var originalChunkCount = this._chunkCount;
    for (var i2 = 0; i2 < dimLen; i2++) {
      var dim = dimensions[i2];
      if (!rawExtent[dim]) {
        rawExtent[dim] = getInitialExtent();
      }
      if (!storage2[dim]) {
        storage2[dim] = [];
      }
      prepareChunks(storage2, this._dimensionInfos[dim], chunkSize, originalChunkCount, end2);
      this._chunkCount = storage2[dim].length;
    }
    var emptyDataItem = new Array(dimLen);
    for (var idx = start2; idx < end2; idx++) {
      var sourceIdx = idx - start2;
      var chunkIndex = Math.floor(idx / chunkSize);
      var chunkOffset = idx % chunkSize;
      for (var k = 0; k < dimLen; k++) {
        var dim = dimensions[k];
        var val = this._dimValueGetterArrayRows(values[sourceIdx] || emptyDataItem, dim, sourceIdx, k);
        storage2[dim][chunkIndex][chunkOffset] = val;
        var dimRawExtent = rawExtent[dim];
        val < dimRawExtent[0] && (dimRawExtent[0] = val);
        val > dimRawExtent[1] && (dimRawExtent[1] = val);
      }
      if (names) {
        this._nameList[idx] = names[sourceIdx];
      }
    }
    this._rawCount = this._count = end2;
    this._extent = {};
    prepareInvertedIndex(this);
  };
  listProto._initDataFromProvider = function(start2, end2) {
    if (start2 >= end2) {
      return;
    }
    var chunkSize = this._chunkSize;
    var rawData = this._rawData;
    var storage2 = this._storage;
    var dimensions = this.dimensions;
    var dimLen = dimensions.length;
    var dimensionInfoMap = this._dimensionInfos;
    var nameList = this._nameList;
    var idList = this._idList;
    var rawExtent = this._rawExtent;
    var nameRepeatCount = this._nameRepeatCount = {};
    var nameDimIdx;
    var originalChunkCount = this._chunkCount;
    for (var i2 = 0; i2 < dimLen; i2++) {
      var dim = dimensions[i2];
      if (!rawExtent[dim]) {
        rawExtent[dim] = getInitialExtent();
      }
      var dimInfo = dimensionInfoMap[dim];
      if (dimInfo.otherDims.itemName === 0) {
        nameDimIdx = this._nameDimIdx = i2;
      }
      if (dimInfo.otherDims.itemId === 0) {
        this._idDimIdx = i2;
      }
      if (!storage2[dim]) {
        storage2[dim] = [];
      }
      prepareChunks(storage2, dimInfo, chunkSize, originalChunkCount, end2);
      this._chunkCount = storage2[dim].length;
    }
    var dataItem = new Array(dimLen);
    for (var idx = start2; idx < end2; idx++) {
      dataItem = rawData.getItem(idx, dataItem);
      var chunkIndex = Math.floor(idx / chunkSize);
      var chunkOffset = idx % chunkSize;
      for (var k = 0; k < dimLen; k++) {
        var dim = dimensions[k];
        var dimStorage = storage2[dim][chunkIndex];
        var val = this._dimValueGetter(dataItem, dim, idx, k);
        dimStorage[chunkOffset] = val;
        var dimRawExtent = rawExtent[dim];
        val < dimRawExtent[0] && (dimRawExtent[0] = val);
        val > dimRawExtent[1] && (dimRawExtent[1] = val);
      }
      if (!rawData.pure) {
        var name = nameList[idx];
        if (dataItem && name == null) {
          if (dataItem.name != null) {
            nameList[idx] = name = dataItem.name;
          } else if (nameDimIdx != null) {
            var nameDim = dimensions[nameDimIdx];
            var nameDimChunk = storage2[nameDim][chunkIndex];
            if (nameDimChunk) {
              name = nameDimChunk[chunkOffset];
              var ordinalMeta = dimensionInfoMap[nameDim].ordinalMeta;
              if (ordinalMeta && ordinalMeta.categories.length) {
                name = ordinalMeta.categories[name];
              }
            }
          }
        }
        var id = dataItem == null ? null : dataItem.id;
        if (id == null && name != null) {
          nameRepeatCount[name] = nameRepeatCount[name] || 0;
          id = name;
          if (nameRepeatCount[name] > 0) {
            id += "__ec__" + nameRepeatCount[name];
          }
          nameRepeatCount[name]++;
        }
        id != null && (idList[idx] = id);
      }
    }
    if (!rawData.persistent && rawData.clean) {
      rawData.clean();
    }
    this._rawCount = this._count = end2;
    this._extent = {};
    prepareInvertedIndex(this);
  };
  function prepareChunks(storage2, dimInfo, chunkSize, chunkCount, end2) {
    var DataCtor = dataCtors[dimInfo.type];
    var lastChunkIndex = chunkCount - 1;
    var dim = dimInfo.name;
    var resizeChunkArray = storage2[dim][lastChunkIndex];
    if (resizeChunkArray && resizeChunkArray.length < chunkSize) {
      var newStore = new DataCtor(Math.min(end2 - lastChunkIndex * chunkSize, chunkSize));
      for (var j = 0; j < resizeChunkArray.length; j++) {
        newStore[j] = resizeChunkArray[j];
      }
      storage2[dim][lastChunkIndex] = newStore;
    }
    for (var k = chunkCount * chunkSize; k < end2; k += chunkSize) {
      storage2[dim].push(new DataCtor(Math.min(end2 - k, chunkSize)));
    }
  }
  function prepareInvertedIndex(list) {
    var invertedIndicesMap = list._invertedIndicesMap;
    zrUtil$B.each(invertedIndicesMap, function(invertedIndices, dim) {
      var dimInfo = list._dimensionInfos[dim];
      var ordinalMeta = dimInfo.ordinalMeta;
      if (ordinalMeta) {
        invertedIndices = invertedIndicesMap[dim] = new CtorInt32Array(ordinalMeta.categories.length);
        for (var i2 = 0; i2 < invertedIndices.length; i2++) {
          invertedIndices[i2] = INDEX_NOT_FOUND;
        }
        for (var i2 = 0; i2 < list._count; i2++) {
          invertedIndices[list.get(dim, i2)] = i2;
        }
      }
    });
  }
  function getRawValueFromStore(list, dimIndex, rawIndex) {
    var val;
    if (dimIndex != null) {
      var chunkSize = list._chunkSize;
      var chunkIndex = Math.floor(rawIndex / chunkSize);
      var chunkOffset = rawIndex % chunkSize;
      var dim = list.dimensions[dimIndex];
      var chunk = list._storage[dim][chunkIndex];
      if (chunk) {
        val = chunk[chunkOffset];
        var ordinalMeta = list._dimensionInfos[dim].ordinalMeta;
        if (ordinalMeta && ordinalMeta.categories.length) {
          val = ordinalMeta.categories[val];
        }
      }
    }
    return val;
  }
  listProto.count = function() {
    return this._count;
  };
  listProto.getIndices = function() {
    var newIndices;
    var indices = this._indices;
    if (indices) {
      var Ctor = indices.constructor;
      var thisCount = this._count;
      if (Ctor === Array) {
        newIndices = new Ctor(thisCount);
        for (var i2 = 0; i2 < thisCount; i2++) {
          newIndices[i2] = indices[i2];
        }
      } else {
        newIndices = new Ctor(indices.buffer, 0, thisCount);
      }
    } else {
      var Ctor = getIndicesCtor(this);
      var newIndices = new Ctor(this.count());
      for (var i2 = 0; i2 < newIndices.length; i2++) {
        newIndices[i2] = i2;
      }
    }
    return newIndices;
  };
  listProto.get = function(dim, idx) {
    if (!(idx >= 0 && idx < this._count)) {
      return NaN;
    }
    var storage2 = this._storage;
    if (!storage2[dim]) {
      return NaN;
    }
    idx = this.getRawIndex(idx);
    var chunkIndex = Math.floor(idx / this._chunkSize);
    var chunkOffset = idx % this._chunkSize;
    var chunkStore = storage2[dim][chunkIndex];
    var value = chunkStore[chunkOffset];
    return value;
  };
  listProto.getByRawIndex = function(dim, rawIdx) {
    if (!(rawIdx >= 0 && rawIdx < this._rawCount)) {
      return NaN;
    }
    var dimStore = this._storage[dim];
    if (!dimStore) {
      return NaN;
    }
    var chunkIndex = Math.floor(rawIdx / this._chunkSize);
    var chunkOffset = rawIdx % this._chunkSize;
    var chunkStore = dimStore[chunkIndex];
    return chunkStore[chunkOffset];
  };
  listProto._getFast = function(dim, rawIdx) {
    var chunkIndex = Math.floor(rawIdx / this._chunkSize);
    var chunkOffset = rawIdx % this._chunkSize;
    var chunkStore = this._storage[dim][chunkIndex];
    return chunkStore[chunkOffset];
  };
  listProto.getValues = function(dimensions, idx) {
    var values = [];
    if (!zrUtil$B.isArray(dimensions)) {
      idx = dimensions;
      dimensions = this.dimensions;
    }
    for (var i2 = 0, len2 = dimensions.length; i2 < len2; i2++) {
      values.push(this.get(dimensions[i2], idx));
    }
    return values;
  };
  listProto.hasValue = function(idx) {
    var dataDimsOnCoord = this._dimensionsSummary.dataDimsOnCoord;
    for (var i2 = 0, len2 = dataDimsOnCoord.length; i2 < len2; i2++) {
      if (isNaN(this.get(dataDimsOnCoord[i2], idx))) {
        return false;
      }
    }
    return true;
  };
  listProto.getDataExtent = function(dim) {
    dim = this.getDimension(dim);
    var dimData = this._storage[dim];
    var initialExtent = getInitialExtent();
    if (!dimData) {
      return initialExtent;
    }
    var currEnd = this.count();
    var useRaw = !this._indices;
    var dimExtent;
    if (useRaw) {
      return this._rawExtent[dim].slice();
    }
    dimExtent = this._extent[dim];
    if (dimExtent) {
      return dimExtent.slice();
    }
    dimExtent = initialExtent;
    var min3 = dimExtent[0];
    var max3 = dimExtent[1];
    for (var i2 = 0; i2 < currEnd; i2++) {
      var value = this._getFast(dim, this.getRawIndex(i2));
      value < min3 && (min3 = value);
      value > max3 && (max3 = value);
    }
    dimExtent = [min3, max3];
    this._extent[dim] = dimExtent;
    return dimExtent;
  };
  listProto.getApproximateExtent = function(dim) {
    dim = this.getDimension(dim);
    return this._approximateExtent[dim] || this.getDataExtent(dim);
  };
  listProto.setApproximateExtent = function(extent, dim) {
    dim = this.getDimension(dim);
    this._approximateExtent[dim] = extent.slice();
  };
  listProto.getCalculationInfo = function(key) {
    return this._calculationInfo[key];
  };
  listProto.setCalculationInfo = function(key, value) {
    isObject$4(key) ? zrUtil$B.extend(this._calculationInfo, key) : this._calculationInfo[key] = value;
  };
  listProto.getSum = function(dim) {
    var dimData = this._storage[dim];
    var sum = 0;
    if (dimData) {
      for (var i2 = 0, len2 = this.count(); i2 < len2; i2++) {
        var value = this.get(dim, i2);
        if (!isNaN(value)) {
          sum += value;
        }
      }
    }
    return sum;
  };
  listProto.getMedian = function(dim) {
    var dimDataArray = [];
    this.each(dim, function(val, idx) {
      if (!isNaN(val)) {
        dimDataArray.push(val);
      }
    });
    var sortedDimDataArray = [].concat(dimDataArray).sort(function(a, b) {
      return a - b;
    });
    var len2 = this.count();
    return len2 === 0 ? 0 : len2 % 2 === 1 ? sortedDimDataArray[(len2 - 1) / 2] : (sortedDimDataArray[len2 / 2] + sortedDimDataArray[len2 / 2 - 1]) / 2;
  };
  listProto.rawIndexOf = function(dim, value) {
    var invertedIndices = dim && this._invertedIndicesMap[dim];
    var rawIndex = invertedIndices[value];
    if (rawIndex == null || isNaN(rawIndex)) {
      return INDEX_NOT_FOUND;
    }
    return rawIndex;
  };
  listProto.indexOfName = function(name) {
    for (var i2 = 0, len2 = this.count(); i2 < len2; i2++) {
      if (this.getName(i2) === name) {
        return i2;
      }
    }
    return -1;
  };
  listProto.indexOfRawIndex = function(rawIndex) {
    if (rawIndex >= this._rawCount || rawIndex < 0) {
      return -1;
    }
    if (!this._indices) {
      return rawIndex;
    }
    var indices = this._indices;
    var rawDataIndex = indices[rawIndex];
    if (rawDataIndex != null && rawDataIndex < this._count && rawDataIndex === rawIndex) {
      return rawIndex;
    }
    var left = 0;
    var right = this._count - 1;
    while (left <= right) {
      var mid = (left + right) / 2 | 0;
      if (indices[mid] < rawIndex) {
        left = mid + 1;
      } else if (indices[mid] > rawIndex) {
        right = mid - 1;
      } else {
        return mid;
      }
    }
    return -1;
  };
  listProto.indicesOfNearest = function(dim, value, maxDistance) {
    var storage2 = this._storage;
    var dimData = storage2[dim];
    var nearestIndices = [];
    if (!dimData) {
      return nearestIndices;
    }
    if (maxDistance == null) {
      maxDistance = Infinity;
    }
    var minDist = Infinity;
    var minDiff = -1;
    var nearestIndicesLen = 0;
    for (var i2 = 0, len2 = this.count(); i2 < len2; i2++) {
      var diff = value - this.get(dim, i2);
      var dist2 = Math.abs(diff);
      if (dist2 <= maxDistance) {
        if (dist2 < minDist || dist2 === minDist && diff >= 0 && minDiff < 0) {
          minDist = dist2;
          minDiff = diff;
          nearestIndicesLen = 0;
        }
        if (diff === minDiff) {
          nearestIndices[nearestIndicesLen++] = i2;
        }
      }
    }
    nearestIndices.length = nearestIndicesLen;
    return nearestIndices;
  };
  listProto.getRawIndex = getRawIndexWithoutIndices;
  function getRawIndexWithoutIndices(idx) {
    return idx;
  }
  function getRawIndexWithIndices(idx) {
    if (idx < this._count && idx >= 0) {
      return this._indices[idx];
    }
    return -1;
  }
  listProto.getRawDataItem = function(idx) {
    if (!this._rawData.persistent) {
      var val = [];
      for (var i2 = 0; i2 < this.dimensions.length; i2++) {
        var dim = this.dimensions[i2];
        val.push(this.get(dim, idx));
      }
      return val;
    } else {
      return this._rawData.getItem(this.getRawIndex(idx));
    }
  };
  listProto.getName = function(idx) {
    var rawIndex = this.getRawIndex(idx);
    return this._nameList[rawIndex] || getRawValueFromStore(this, this._nameDimIdx, rawIndex) || "";
  };
  listProto.getId = function(idx) {
    return getId(this, this.getRawIndex(idx));
  };
  function getId(list, rawIndex) {
    var id = list._idList[rawIndex];
    if (id == null) {
      id = getRawValueFromStore(list, list._idDimIdx, rawIndex);
    }
    if (id == null) {
      id = ID_PREFIX + rawIndex;
    }
    return id;
  }
  function normalizeDimensions(dimensions) {
    if (!zrUtil$B.isArray(dimensions)) {
      dimensions = [dimensions];
    }
    return dimensions;
  }
  listProto.each = function(dims, cb, context, contextCompat) {
    if (!this._count) {
      return;
    }
    if (typeof dims === "function") {
      contextCompat = context;
      context = cb;
      cb = dims;
      dims = [];
    }
    context = context || contextCompat || this;
    dims = zrUtil$B.map(normalizeDimensions(dims), this.getDimension, this);
    var dimSize = dims.length;
    for (var i2 = 0; i2 < this.count(); i2++) {
      switch (dimSize) {
        case 0:
          cb.call(context, i2);
          break;
        case 1:
          cb.call(context, this.get(dims[0], i2), i2);
          break;
        case 2:
          cb.call(context, this.get(dims[0], i2), this.get(dims[1], i2), i2);
          break;
        default:
          var k = 0;
          var value = [];
          for (; k < dimSize; k++) {
            value[k] = this.get(dims[k], i2);
          }
          value[k] = i2;
          cb.apply(context, value);
      }
    }
  };
  listProto.filterSelf = function(dimensions, cb, context, contextCompat) {
    if (!this._count) {
      return;
    }
    if (typeof dimensions === "function") {
      contextCompat = context;
      context = cb;
      cb = dimensions;
      dimensions = [];
    }
    context = context || contextCompat || this;
    dimensions = zrUtil$B.map(normalizeDimensions(dimensions), this.getDimension, this);
    var count = this.count();
    var Ctor = getIndicesCtor(this);
    var newIndices = new Ctor(count);
    var value = [];
    var dimSize = dimensions.length;
    var offset = 0;
    var dim0 = dimensions[0];
    for (var i2 = 0; i2 < count; i2++) {
      var keep;
      var rawIdx = this.getRawIndex(i2);
      if (dimSize === 0) {
        keep = cb.call(context, i2);
      } else if (dimSize === 1) {
        var val = this._getFast(dim0, rawIdx);
        keep = cb.call(context, val, i2);
      } else {
        for (var k = 0; k < dimSize; k++) {
          value[k] = this._getFast(dim0, rawIdx);
        }
        value[k] = i2;
        keep = cb.apply(context, value);
      }
      if (keep) {
        newIndices[offset++] = rawIdx;
      }
    }
    if (offset < count) {
      this._indices = newIndices;
    }
    this._count = offset;
    this._extent = {};
    this.getRawIndex = this._indices ? getRawIndexWithIndices : getRawIndexWithoutIndices;
    return this;
  };
  listProto.selectRange = function(range) {
    if (!this._count) {
      return;
    }
    var dimensions = [];
    for (var dim in range) {
      if (range.hasOwnProperty(dim)) {
        dimensions.push(dim);
      }
    }
    var dimSize = dimensions.length;
    if (!dimSize) {
      return;
    }
    var originalCount = this.count();
    var Ctor = getIndicesCtor(this);
    var newIndices = new Ctor(originalCount);
    var offset = 0;
    var dim0 = dimensions[0];
    var min3 = range[dim0][0];
    var max3 = range[dim0][1];
    var quickFinished = false;
    if (!this._indices) {
      var idx = 0;
      if (dimSize === 1) {
        var dimStorage = this._storage[dimensions[0]];
        for (var k = 0; k < this._chunkCount; k++) {
          var chunkStorage = dimStorage[k];
          var len2 = Math.min(this._count - k * this._chunkSize, this._chunkSize);
          for (var i2 = 0; i2 < len2; i2++) {
            var val = chunkStorage[i2];
            if (val >= min3 && val <= max3 || isNaN(val)) {
              newIndices[offset++] = idx;
            }
            idx++;
          }
        }
        quickFinished = true;
      } else if (dimSize === 2) {
        var dimStorage = this._storage[dim0];
        var dimStorage2 = this._storage[dimensions[1]];
        var min22 = range[dimensions[1]][0];
        var max22 = range[dimensions[1]][1];
        for (var k = 0; k < this._chunkCount; k++) {
          var chunkStorage = dimStorage[k];
          var chunkStorage2 = dimStorage2[k];
          var len2 = Math.min(this._count - k * this._chunkSize, this._chunkSize);
          for (var i2 = 0; i2 < len2; i2++) {
            var val = chunkStorage[i2];
            var val2 = chunkStorage2[i2];
            if ((val >= min3 && val <= max3 || isNaN(val)) && (val2 >= min22 && val2 <= max22 || isNaN(val2))) {
              newIndices[offset++] = idx;
            }
            idx++;
          }
        }
        quickFinished = true;
      }
    }
    if (!quickFinished) {
      if (dimSize === 1) {
        for (var i2 = 0; i2 < originalCount; i2++) {
          var rawIndex = this.getRawIndex(i2);
          var val = this._getFast(dim0, rawIndex);
          if (val >= min3 && val <= max3 || isNaN(val)) {
            newIndices[offset++] = rawIndex;
          }
        }
      } else {
        for (var i2 = 0; i2 < originalCount; i2++) {
          var keep = true;
          var rawIndex = this.getRawIndex(i2);
          for (var k = 0; k < dimSize; k++) {
            var dimk = dimensions[k];
            var val = this._getFast(dim, rawIndex);
            if (val < range[dimk][0] || val > range[dimk][1]) {
              keep = false;
            }
          }
          if (keep) {
            newIndices[offset++] = this.getRawIndex(i2);
          }
        }
      }
    }
    if (offset < originalCount) {
      this._indices = newIndices;
    }
    this._count = offset;
    this._extent = {};
    this.getRawIndex = this._indices ? getRawIndexWithIndices : getRawIndexWithoutIndices;
    return this;
  };
  listProto.mapArray = function(dimensions, cb, context, contextCompat) {
    if (typeof dimensions === "function") {
      contextCompat = context;
      context = cb;
      cb = dimensions;
      dimensions = [];
    }
    context = context || contextCompat || this;
    var result = [];
    this.each(dimensions, function() {
      result.push(cb && cb.apply(this, arguments));
    }, context);
    return result;
  };
  function cloneListForMapAndSample(original, excludeDimensions) {
    var allDimensions = original.dimensions;
    var list = new List$1(zrUtil$B.map(allDimensions, original.getDimensionInfo, original), original.hostModel);
    transferProperties(list, original);
    var storage2 = list._storage = {};
    var originalStorage = original._storage;
    for (var i2 = 0; i2 < allDimensions.length; i2++) {
      var dim = allDimensions[i2];
      if (originalStorage[dim]) {
        if (zrUtil$B.indexOf(excludeDimensions, dim) >= 0) {
          storage2[dim] = cloneDimStore(originalStorage[dim]);
          list._rawExtent[dim] = getInitialExtent();
          list._extent[dim] = null;
        } else {
          storage2[dim] = originalStorage[dim];
        }
      }
    }
    return list;
  }
  function cloneDimStore(originalDimStore) {
    var newDimStore = new Array(originalDimStore.length);
    for (var j = 0; j < originalDimStore.length; j++) {
      newDimStore[j] = cloneChunk(originalDimStore[j]);
    }
    return newDimStore;
  }
  function getInitialExtent() {
    return [Infinity, -Infinity];
  }
  listProto.map = function(dimensions, cb, context, contextCompat) {
    context = context || contextCompat || this;
    dimensions = zrUtil$B.map(normalizeDimensions(dimensions), this.getDimension, this);
    var list = cloneListForMapAndSample(this, dimensions);
    list._indices = this._indices;
    list.getRawIndex = list._indices ? getRawIndexWithIndices : getRawIndexWithoutIndices;
    var storage2 = list._storage;
    var tmpRetValue = [];
    var chunkSize = this._chunkSize;
    var dimSize = dimensions.length;
    var dataCount = this.count();
    var values = [];
    var rawExtent = list._rawExtent;
    for (var dataIndex = 0; dataIndex < dataCount; dataIndex++) {
      for (var dimIndex = 0; dimIndex < dimSize; dimIndex++) {
        values[dimIndex] = this.get(dimensions[dimIndex], dataIndex);
      }
      values[dimSize] = dataIndex;
      var retValue = cb && cb.apply(context, values);
      if (retValue != null) {
        if (typeof retValue !== "object") {
          tmpRetValue[0] = retValue;
          retValue = tmpRetValue;
        }
        var rawIndex = this.getRawIndex(dataIndex);
        var chunkIndex = Math.floor(rawIndex / chunkSize);
        var chunkOffset = rawIndex % chunkSize;
        for (var i2 = 0; i2 < retValue.length; i2++) {
          var dim = dimensions[i2];
          var val = retValue[i2];
          var rawExtentOnDim = rawExtent[dim];
          var dimStore = storage2[dim];
          if (dimStore) {
            dimStore[chunkIndex][chunkOffset] = val;
          }
          if (val < rawExtentOnDim[0]) {
            rawExtentOnDim[0] = val;
          }
          if (val > rawExtentOnDim[1]) {
            rawExtentOnDim[1] = val;
          }
        }
      }
    }
    return list;
  };
  listProto.downSample = function(dimension, rate, sampleValue, sampleIndex) {
    var list = cloneListForMapAndSample(this, [dimension]);
    var targetStorage = list._storage;
    var frameValues = [];
    var frameSize = Math.floor(1 / rate);
    var dimStore = targetStorage[dimension];
    var len2 = this.count();
    var chunkSize = this._chunkSize;
    var rawExtentOnDim = list._rawExtent[dimension];
    var newIndices = new (getIndicesCtor(this))(len2);
    var offset = 0;
    for (var i2 = 0; i2 < len2; i2 += frameSize) {
      if (frameSize > len2 - i2) {
        frameSize = len2 - i2;
        frameValues.length = frameSize;
      }
      for (var k = 0; k < frameSize; k++) {
        var dataIdx = this.getRawIndex(i2 + k);
        var originalChunkIndex = Math.floor(dataIdx / chunkSize);
        var originalChunkOffset = dataIdx % chunkSize;
        frameValues[k] = dimStore[originalChunkIndex][originalChunkOffset];
      }
      var value = sampleValue(frameValues);
      var sampleFrameIdx = this.getRawIndex(Math.min(i2 + sampleIndex(frameValues, value) || 0, len2 - 1));
      var sampleChunkIndex = Math.floor(sampleFrameIdx / chunkSize);
      var sampleChunkOffset = sampleFrameIdx % chunkSize;
      dimStore[sampleChunkIndex][sampleChunkOffset] = value;
      if (value < rawExtentOnDim[0]) {
        rawExtentOnDim[0] = value;
      }
      if (value > rawExtentOnDim[1]) {
        rawExtentOnDim[1] = value;
      }
      newIndices[offset++] = sampleFrameIdx;
    }
    list._count = offset;
    list._indices = newIndices;
    list.getRawIndex = getRawIndexWithIndices;
    return list;
  };
  listProto.getItemModel = function(idx) {
    var hostModel = this.hostModel;
    return new Model$5(this.getRawDataItem(idx), hostModel, hostModel && hostModel.ecModel);
  };
  listProto.diff = function(otherList) {
    var thisList = this;
    return new DataDiffer(otherList ? otherList.getIndices() : [], this.getIndices(), function(idx) {
      return getId(otherList, idx);
    }, function(idx) {
      return getId(thisList, idx);
    });
  };
  listProto.getVisual = function(key) {
    var visual = this._visual;
    return visual && visual[key];
  };
  listProto.setVisual = function(key, val) {
    if (isObject$4(key)) {
      for (var name in key) {
        if (key.hasOwnProperty(name)) {
          this.setVisual(name, key[name]);
        }
      }
      return;
    }
    this._visual = this._visual || {};
    this._visual[key] = val;
  };
  listProto.setLayout = function(key, val) {
    if (isObject$4(key)) {
      for (var name in key) {
        if (key.hasOwnProperty(name)) {
          this.setLayout(name, key[name]);
        }
      }
      return;
    }
    this._layout[key] = val;
  };
  listProto.getLayout = function(key) {
    return this._layout[key];
  };
  listProto.getItemLayout = function(idx) {
    return this._itemLayouts[idx];
  };
  listProto.setItemLayout = function(idx, layout2, merge2) {
    this._itemLayouts[idx] = merge2 ? zrUtil$B.extend(this._itemLayouts[idx] || {}, layout2) : layout2;
  };
  listProto.clearItemLayouts = function() {
    this._itemLayouts.length = 0;
  };
  listProto.getItemVisual = function(idx, key, ignoreParent) {
    var itemVisual = this._itemVisuals[idx];
    var val = itemVisual && itemVisual[key];
    if (val == null && !ignoreParent) {
      return this.getVisual(key);
    }
    return val;
  };
  listProto.setItemVisual = function(idx, key, value) {
    var itemVisual = this._itemVisuals[idx] || {};
    var hasItemVisual = this.hasItemVisual;
    this._itemVisuals[idx] = itemVisual;
    if (isObject$4(key)) {
      for (var name in key) {
        if (key.hasOwnProperty(name)) {
          itemVisual[name] = key[name];
          hasItemVisual[name] = true;
        }
      }
      return;
    }
    itemVisual[key] = value;
    hasItemVisual[key] = true;
  };
  listProto.clearAllVisual = function() {
    this._visual = {};
    this._itemVisuals = [];
    this.hasItemVisual = {};
  };
  var setItemDataAndSeriesIndex = function(child) {
    child.seriesIndex = this.seriesIndex;
    child.dataIndex = this.dataIndex;
    child.dataType = this.dataType;
  };
  listProto.setItemGraphicEl = function(idx, el) {
    var hostModel = this.hostModel;
    if (el) {
      el.dataIndex = idx;
      el.dataType = this.dataType;
      el.seriesIndex = hostModel && hostModel.seriesIndex;
      if (el.type === "group") {
        el.traverse(setItemDataAndSeriesIndex, el);
      }
    }
    this._graphicEls[idx] = el;
  };
  listProto.getItemGraphicEl = function(idx) {
    return this._graphicEls[idx];
  };
  listProto.eachItemGraphicEl = function(cb, context) {
    zrUtil$B.each(this._graphicEls, function(el, idx) {
      if (el) {
        cb && cb.call(context, el, idx);
      }
    });
  };
  listProto.cloneShallow = function(list) {
    if (!list) {
      var dimensionInfoList = zrUtil$B.map(this.dimensions, this.getDimensionInfo, this);
      list = new List$1(dimensionInfoList, this.hostModel);
    }
    list._storage = this._storage;
    transferProperties(list, this);
    if (this._indices) {
      var Ctor = this._indices.constructor;
      list._indices = new Ctor(this._indices);
    } else {
      list._indices = null;
    }
    list.getRawIndex = list._indices ? getRawIndexWithIndices : getRawIndexWithoutIndices;
    return list;
  };
  listProto.wrapMethod = function(methodName, injectFunction) {
    var originalMethod = this[methodName];
    if (typeof originalMethod !== "function") {
      return;
    }
    this.__wrappedMethods = this.__wrappedMethods || [];
    this.__wrappedMethods.push(methodName);
    this[methodName] = function() {
      var res = originalMethod.apply(this, arguments);
      return injectFunction.apply(this, [res].concat(zrUtil$B.slice(arguments)));
    };
  };
  listProto.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "map"];
  listProto.CHANGABLE_METHODS = ["filterSelf", "selectRange"];
  var _default$u = List$1;
  var List_1 = _default$u;
  var _util$a = util$6;
  var createHashMap$2 = _util$a.createHashMap;
  var each$b = _util$a.each;
  var isString$1 = _util$a.isString;
  var defaults$1 = _util$a.defaults;
  var extend$1 = _util$a.extend;
  var isObject$3 = _util$a.isObject;
  var clone$1 = _util$a.clone;
  var _model$7 = model;
  var normalizeToArray = _model$7.normalizeToArray;
  var _sourceHelper$1 = sourceHelper;
  var guessOrdinal = _sourceHelper$1.guessOrdinal;
  var BE_ORDINAL = _sourceHelper$1.BE_ORDINAL;
  var Source$1 = Source_1;
  var _dimensionHelper$1 = dimensionHelper;
  var OTHER_DIMENSIONS = _dimensionHelper$1.OTHER_DIMENSIONS;
  var DataDimensionInfo = DataDimensionInfo_1;
  function completeDimensions$1(sysDims, source, opt) {
    if (!Source$1.isInstance(source)) {
      source = Source$1.seriesDataToSource(source);
    }
    opt = opt || {};
    sysDims = (sysDims || []).slice();
    var dimsDef = (opt.dimsDef || []).slice();
    var dataDimNameMap = createHashMap$2();
    var coordDimNameMap = createHashMap$2();
    var result = [];
    var dimCount = getDimCount(source, sysDims, dimsDef, opt.dimCount);
    for (var i2 = 0; i2 < dimCount; i2++) {
      var dimDefItem = dimsDef[i2] = extend$1({}, isObject$3(dimsDef[i2]) ? dimsDef[i2] : {
        name: dimsDef[i2]
      });
      var userDimName = dimDefItem.name;
      var resultItem = result[i2] = new DataDimensionInfo();
      if (userDimName != null && dataDimNameMap.get(userDimName) == null) {
        resultItem.name = resultItem.displayName = userDimName;
        dataDimNameMap.set(userDimName, i2);
      }
      dimDefItem.type != null && (resultItem.type = dimDefItem.type);
      dimDefItem.displayName != null && (resultItem.displayName = dimDefItem.displayName);
    }
    var encodeDef = opt.encodeDef;
    if (!encodeDef && opt.encodeDefaulter) {
      encodeDef = opt.encodeDefaulter(source, dimCount);
    }
    encodeDef = createHashMap$2(encodeDef);
    encodeDef.each(function(dataDims, coordDim2) {
      dataDims = normalizeToArray(dataDims).slice();
      if (dataDims.length === 1 && !isString$1(dataDims[0]) && dataDims[0] < 0) {
        encodeDef.set(coordDim2, false);
        return;
      }
      var validDataDims = encodeDef.set(coordDim2, []);
      each$b(dataDims, function(resultDimIdx2, idx) {
        isString$1(resultDimIdx2) && (resultDimIdx2 = dataDimNameMap.get(resultDimIdx2));
        if (resultDimIdx2 != null && resultDimIdx2 < dimCount) {
          validDataDims[idx] = resultDimIdx2;
          applyDim(result[resultDimIdx2], coordDim2, idx);
        }
      });
    });
    var availDimIdx = 0;
    each$b(sysDims, function(sysDimItem, sysDimIndex) {
      var coordDim2;
      var sysDimItem;
      var sysDimItemDimsDef;
      var sysDimItemOtherDims;
      if (isString$1(sysDimItem)) {
        coordDim2 = sysDimItem;
        sysDimItem = {};
      } else {
        coordDim2 = sysDimItem.name;
        var ordinalMeta = sysDimItem.ordinalMeta;
        sysDimItem.ordinalMeta = null;
        sysDimItem = clone$1(sysDimItem);
        sysDimItem.ordinalMeta = ordinalMeta;
        sysDimItemDimsDef = sysDimItem.dimsDef;
        sysDimItemOtherDims = sysDimItem.otherDims;
        sysDimItem.name = sysDimItem.coordDim = sysDimItem.coordDimIndex = sysDimItem.dimsDef = sysDimItem.otherDims = null;
      }
      var dataDims = encodeDef.get(coordDim2);
      if (dataDims === false) {
        return;
      }
      var dataDims = normalizeToArray(dataDims);
      if (!dataDims.length) {
        for (var i3 = 0; i3 < (sysDimItemDimsDef && sysDimItemDimsDef.length || 1); i3++) {
          while (availDimIdx < result.length && result[availDimIdx].coordDim != null) {
            availDimIdx++;
          }
          availDimIdx < result.length && dataDims.push(availDimIdx++);
        }
      }
      each$b(dataDims, function(resultDimIdx2, coordDimIndex) {
        var resultItem2 = result[resultDimIdx2];
        applyDim(defaults$1(resultItem2, sysDimItem), coordDim2, coordDimIndex);
        if (resultItem2.name == null && sysDimItemDimsDef) {
          var sysDimItemDimsDefItem = sysDimItemDimsDef[coordDimIndex];
          !isObject$3(sysDimItemDimsDefItem) && (sysDimItemDimsDefItem = {
            name: sysDimItemDimsDefItem
          });
          resultItem2.name = resultItem2.displayName = sysDimItemDimsDefItem.name;
          resultItem2.defaultTooltip = sysDimItemDimsDefItem.defaultTooltip;
        }
        sysDimItemOtherDims && defaults$1(resultItem2.otherDims, sysDimItemOtherDims);
      });
    });
    function applyDim(resultItem2, coordDim2, coordDimIndex) {
      if (OTHER_DIMENSIONS.get(coordDim2) != null) {
        resultItem2.otherDims[coordDim2] = coordDimIndex;
      } else {
        resultItem2.coordDim = coordDim2;
        resultItem2.coordDimIndex = coordDimIndex;
        coordDimNameMap.set(coordDim2, true);
      }
    }
    var generateCoord = opt.generateCoord;
    var generateCoordCount = opt.generateCoordCount;
    var fromZero = generateCoordCount != null;
    generateCoordCount = generateCoord ? generateCoordCount || 1 : 0;
    var extra = generateCoord || "value";
    for (var resultDimIdx = 0; resultDimIdx < dimCount; resultDimIdx++) {
      var resultItem = result[resultDimIdx] = result[resultDimIdx] || new DataDimensionInfo();
      var coordDim = resultItem.coordDim;
      if (coordDim == null) {
        resultItem.coordDim = genName(extra, coordDimNameMap, fromZero);
        resultItem.coordDimIndex = 0;
        if (!generateCoord || generateCoordCount <= 0) {
          resultItem.isExtraCoord = true;
        }
        generateCoordCount--;
      }
      resultItem.name == null && (resultItem.name = genName(resultItem.coordDim, dataDimNameMap));
      if (resultItem.type == null && (guessOrdinal(source, resultDimIdx, resultItem.name) === BE_ORDINAL.Must || resultItem.isExtraCoord && (resultItem.otherDims.itemName != null || resultItem.otherDims.seriesName != null))) {
        resultItem.type = "ordinal";
      }
    }
    return result;
  }
  function getDimCount(source, sysDims, dimsDef, optDimCount) {
    var dimCount = Math.max(source.dimensionsDetectCount || 1, sysDims.length, dimsDef.length, optDimCount || 0);
    each$b(sysDims, function(sysDimItem) {
      var sysDimItemDimsDef = sysDimItem.dimsDef;
      sysDimItemDimsDef && (dimCount = Math.max(dimCount, sysDimItemDimsDef.length));
    });
    return dimCount;
  }
  function genName(name, map2, fromZero) {
    if (fromZero || map2.get(name) != null) {
      var i2 = 0;
      while (map2.get(name + i2) != null) {
        i2++;
      }
      name += i2;
    }
    map2.set(name, true);
    return name;
  }
  var _default$t = completeDimensions$1;
  var completeDimensions_1 = _default$t;
  var completeDimensions = completeDimensions_1;
  function _default$s(source, opt) {
    opt = opt || {};
    return completeDimensions(opt.coordDimensions || [], source, {
      dimsDef: opt.dimensionsDefine || source.dimensionsDefine,
      encodeDef: opt.encodeDefine || source.encodeDefine,
      dimCount: opt.dimensionsCount,
      encodeDefaulter: opt.encodeDefaulter,
      generateCoord: opt.generateCoord,
      generateCoordCount: opt.generateCoordCount
    });
  }
  var createDimensions$1 = _default$s;
  var referHelper = {};
  var _util$9 = util$6;
  var createHashMap$1 = _util$9.createHashMap;
  _util$9.retrieve;
  var each$a = _util$9.each;
  function CoordSysInfo(coordSysName) {
    this.coordSysName = coordSysName;
    this.coordSysDims = [];
    this.axisMap = createHashMap$1();
    this.categoryAxisMap = createHashMap$1();
    this.firstCategoryDimIndex = null;
  }
  function getCoordSysInfoBySeries$1(seriesModel) {
    var coordSysName = seriesModel.get("coordinateSystem");
    var result = new CoordSysInfo(coordSysName);
    var fetch = fetchers[coordSysName];
    if (fetch) {
      fetch(seriesModel, result, result.axisMap, result.categoryAxisMap);
      return result;
    }
  }
  var fetchers = {
    cartesian2d: function(seriesModel, result, axisMap, categoryAxisMap) {
      var xAxisModel = seriesModel.getReferringComponents("xAxis")[0];
      var yAxisModel = seriesModel.getReferringComponents("yAxis")[0];
      result.coordSysDims = ["x", "y"];
      axisMap.set("x", xAxisModel);
      axisMap.set("y", yAxisModel);
      if (isCategory(xAxisModel)) {
        categoryAxisMap.set("x", xAxisModel);
        result.firstCategoryDimIndex = 0;
      }
      if (isCategory(yAxisModel)) {
        categoryAxisMap.set("y", yAxisModel);
        result.firstCategoryDimIndex == null & (result.firstCategoryDimIndex = 1);
      }
    },
    singleAxis: function(seriesModel, result, axisMap, categoryAxisMap) {
      var singleAxisModel = seriesModel.getReferringComponents("singleAxis")[0];
      result.coordSysDims = ["single"];
      axisMap.set("single", singleAxisModel);
      if (isCategory(singleAxisModel)) {
        categoryAxisMap.set("single", singleAxisModel);
        result.firstCategoryDimIndex = 0;
      }
    },
    polar: function(seriesModel, result, axisMap, categoryAxisMap) {
      var polarModel = seriesModel.getReferringComponents("polar")[0];
      var radiusAxisModel = polarModel.findAxisModel("radiusAxis");
      var angleAxisModel = polarModel.findAxisModel("angleAxis");
      result.coordSysDims = ["radius", "angle"];
      axisMap.set("radius", radiusAxisModel);
      axisMap.set("angle", angleAxisModel);
      if (isCategory(radiusAxisModel)) {
        categoryAxisMap.set("radius", radiusAxisModel);
        result.firstCategoryDimIndex = 0;
      }
      if (isCategory(angleAxisModel)) {
        categoryAxisMap.set("angle", angleAxisModel);
        result.firstCategoryDimIndex == null && (result.firstCategoryDimIndex = 1);
      }
    },
    geo: function(seriesModel, result, axisMap, categoryAxisMap) {
      result.coordSysDims = ["lng", "lat"];
    },
    parallel: function(seriesModel, result, axisMap, categoryAxisMap) {
      var ecModel = seriesModel.ecModel;
      var parallelModel = ecModel.getComponent("parallel", seriesModel.get("parallelIndex"));
      var coordSysDims = result.coordSysDims = parallelModel.dimensions.slice();
      each$a(parallelModel.parallelAxisIndex, function(axisIndex, index2) {
        var axisModel = ecModel.getComponent("parallelAxis", axisIndex);
        var axisDim = coordSysDims[index2];
        axisMap.set(axisDim, axisModel);
        if (isCategory(axisModel) && result.firstCategoryDimIndex == null) {
          categoryAxisMap.set(axisDim, axisModel);
          result.firstCategoryDimIndex = index2;
        }
      });
    }
  };
  function isCategory(axisModel) {
    return axisModel.get("type") === "category";
  }
  referHelper.getCoordSysInfoBySeries = getCoordSysInfoBySeries$1;
  var dataStackHelper = {};
  var _util$8 = util$6;
  var each$9 = _util$8.each;
  var isString = _util$8.isString;
  function enableDataStack$2(seriesModel, dimensionInfoList, opt) {
    opt = opt || {};
    var byIndex = opt.byIndex;
    var stackedCoordDimension = opt.stackedCoordDimension;
    var mayStack = !!(seriesModel && seriesModel.get("stack"));
    var stackedByDimInfo;
    var stackedDimInfo;
    var stackResultDimension;
    var stackedOverDimension;
    each$9(dimensionInfoList, function(dimensionInfo, index2) {
      if (isString(dimensionInfo)) {
        dimensionInfoList[index2] = dimensionInfo = {
          name: dimensionInfo
        };
      }
      if (mayStack && !dimensionInfo.isExtraCoord) {
        if (!byIndex && !stackedByDimInfo && dimensionInfo.ordinalMeta) {
          stackedByDimInfo = dimensionInfo;
        }
        if (!stackedDimInfo && dimensionInfo.type !== "ordinal" && dimensionInfo.type !== "time" && (!stackedCoordDimension || stackedCoordDimension === dimensionInfo.coordDim)) {
          stackedDimInfo = dimensionInfo;
        }
      }
    });
    if (stackedDimInfo && !byIndex && !stackedByDimInfo) {
      byIndex = true;
    }
    if (stackedDimInfo) {
      stackResultDimension = "__\0ecstackresult";
      stackedOverDimension = "__\0ecstackedover";
      if (stackedByDimInfo) {
        stackedByDimInfo.createInvertedIndices = true;
      }
      var stackedDimCoordDim = stackedDimInfo.coordDim;
      var stackedDimType = stackedDimInfo.type;
      var stackedDimCoordIndex = 0;
      each$9(dimensionInfoList, function(dimensionInfo) {
        if (dimensionInfo.coordDim === stackedDimCoordDim) {
          stackedDimCoordIndex++;
        }
      });
      dimensionInfoList.push({
        name: stackResultDimension,
        coordDim: stackedDimCoordDim,
        coordDimIndex: stackedDimCoordIndex,
        type: stackedDimType,
        isExtraCoord: true,
        isCalculationCoord: true
      });
      stackedDimCoordIndex++;
      dimensionInfoList.push({
        name: stackedOverDimension,
        coordDim: stackedOverDimension,
        coordDimIndex: stackedDimCoordIndex,
        type: stackedDimType,
        isExtraCoord: true,
        isCalculationCoord: true
      });
    }
    return {
      stackedDimension: stackedDimInfo && stackedDimInfo.name,
      stackedByDimension: stackedByDimInfo && stackedByDimInfo.name,
      isStackedByIndex: byIndex,
      stackedOverDimension,
      stackResultDimension
    };
  }
  function isDimensionStacked$4(data, stackedDim) {
    return !!stackedDim && stackedDim === data.getCalculationInfo("stackedDimension");
  }
  function getStackedDimension$2(data, targetDim) {
    return isDimensionStacked$4(data, targetDim) ? data.getCalculationInfo("stackResultDimension") : targetDim;
  }
  dataStackHelper.enableDataStack = enableDataStack$2;
  dataStackHelper.isDimensionStacked = isDimensionStacked$4;
  dataStackHelper.getStackedDimension = getStackedDimension$2;
  var zrUtil$A = util$6;
  var List = List_1;
  var createDimensions = createDimensions$1;
  var _sourceType = sourceType;
  var SOURCE_FORMAT_ORIGINAL = _sourceType.SOURCE_FORMAT_ORIGINAL;
  var _dimensionHelper = dimensionHelper;
  var getDimensionTypeByAxis = _dimensionHelper.getDimensionTypeByAxis;
  var _model$6 = model;
  var getDataItemValue = _model$6.getDataItemValue;
  var CoordinateSystem$1 = CoordinateSystem$2;
  var _referHelper = referHelper;
  var getCoordSysInfoBySeries = _referHelper.getCoordSysInfoBySeries;
  var Source = Source_1;
  var _dataStackHelper$5 = dataStackHelper;
  var enableDataStack$1 = _dataStackHelper$5.enableDataStack;
  var _sourceHelper = sourceHelper;
  var makeSeriesEncodeForAxisCoordSys = _sourceHelper.makeSeriesEncodeForAxisCoordSys;
  function createListFromArray$2(source, seriesModel, opt) {
    opt = opt || {};
    if (!Source.isInstance(source)) {
      source = Source.seriesDataToSource(source);
    }
    var coordSysName = seriesModel.get("coordinateSystem");
    var registeredCoordSys = CoordinateSystem$1.get(coordSysName);
    var coordSysInfo = getCoordSysInfoBySeries(seriesModel);
    var coordSysDimDefs;
    if (coordSysInfo) {
      coordSysDimDefs = zrUtil$A.map(coordSysInfo.coordSysDims, function(dim) {
        var dimInfo = {
          name: dim
        };
        var axisModel = coordSysInfo.axisMap.get(dim);
        if (axisModel) {
          var axisType = axisModel.get("type");
          dimInfo.type = getDimensionTypeByAxis(axisType);
        }
        return dimInfo;
      });
    }
    if (!coordSysDimDefs) {
      coordSysDimDefs = registeredCoordSys && (registeredCoordSys.getDimensionsInfo ? registeredCoordSys.getDimensionsInfo() : registeredCoordSys.dimensions.slice()) || ["x", "y"];
    }
    var dimInfoList = createDimensions(source, {
      coordDimensions: coordSysDimDefs,
      generateCoord: opt.generateCoord,
      encodeDefaulter: opt.useEncodeDefaulter ? zrUtil$A.curry(makeSeriesEncodeForAxisCoordSys, coordSysDimDefs, seriesModel) : null
    });
    var firstCategoryDimIndex;
    var hasNameEncode;
    coordSysInfo && zrUtil$A.each(dimInfoList, function(dimInfo, dimIndex) {
      var coordDim = dimInfo.coordDim;
      var categoryAxisModel = coordSysInfo.categoryAxisMap.get(coordDim);
      if (categoryAxisModel) {
        if (firstCategoryDimIndex == null) {
          firstCategoryDimIndex = dimIndex;
        }
        dimInfo.ordinalMeta = categoryAxisModel.getOrdinalMeta();
      }
      if (dimInfo.otherDims.itemName != null) {
        hasNameEncode = true;
      }
    });
    if (!hasNameEncode && firstCategoryDimIndex != null) {
      dimInfoList[firstCategoryDimIndex].otherDims.itemName = 0;
    }
    var stackCalculationInfo = enableDataStack$1(seriesModel, dimInfoList);
    var list = new List(dimInfoList, seriesModel);
    list.setCalculationInfo(stackCalculationInfo);
    var dimValueGetter = firstCategoryDimIndex != null && isNeedCompleteOrdinalData(source) ? function(itemOpt, dimName, dataIndex, dimIndex) {
      return dimIndex === firstCategoryDimIndex ? dataIndex : this.defaultDimValueGetter(itemOpt, dimName, dataIndex, dimIndex);
    } : null;
    list.hasItemOption = false;
    list.initData(source, null, dimValueGetter);
    return list;
  }
  function isNeedCompleteOrdinalData(source) {
    if (source.sourceFormat === SOURCE_FORMAT_ORIGINAL) {
      var sampleItem = firstDataNotNull(source.data || []);
      return sampleItem != null && !zrUtil$A.isArray(getDataItemValue(sampleItem));
    }
  }
  function firstDataNotNull(data) {
    var i2 = 0;
    while (i2 < data.length && data[i2] == null) {
      i2++;
    }
    return data[i2];
  }
  var _default$r = createListFromArray$2;
  var createListFromArray_1 = _default$r;
  var axisHelper$3 = {};
  var clazzUtil$1 = clazz;
  function Scale$4(setting) {
    this._setting = setting || {};
    this._extent = [Infinity, -Infinity];
    this._interval = 0;
    this.init && this.init.apply(this, arguments);
  }
  Scale$4.prototype.parse = function(val) {
    return val;
  };
  Scale$4.prototype.getSetting = function(name) {
    return this._setting[name];
  };
  Scale$4.prototype.contain = function(val) {
    var extent = this._extent;
    return val >= extent[0] && val <= extent[1];
  };
  Scale$4.prototype.normalize = function(val) {
    var extent = this._extent;
    if (extent[1] === extent[0]) {
      return 0.5;
    }
    return (val - extent[0]) / (extent[1] - extent[0]);
  };
  Scale$4.prototype.scale = function(val) {
    var extent = this._extent;
    return val * (extent[1] - extent[0]) + extent[0];
  };
  Scale$4.prototype.unionExtent = function(other) {
    var extent = this._extent;
    other[0] < extent[0] && (extent[0] = other[0]);
    other[1] > extent[1] && (extent[1] = other[1]);
  };
  Scale$4.prototype.unionExtentFromData = function(data, dim) {
    this.unionExtent(data.getApproximateExtent(dim));
  };
  Scale$4.prototype.getExtent = function() {
    return this._extent.slice();
  };
  Scale$4.prototype.setExtent = function(start2, end2) {
    var thisExtent = this._extent;
    if (!isNaN(start2)) {
      thisExtent[0] = start2;
    }
    if (!isNaN(end2)) {
      thisExtent[1] = end2;
    }
  };
  Scale$4.prototype.isBlank = function() {
    return this._isBlank;
  }, Scale$4.prototype.setBlank = function(isBlank) {
    this._isBlank = isBlank;
  };
  Scale$4.prototype.getLabel = null;
  clazzUtil$1.enableClassExtend(Scale$4);
  clazzUtil$1.enableClassManagement(Scale$4, {
    registerWhenExtend: true
  });
  var _default$q = Scale$4;
  var Scale_1 = _default$q;
  var _util$7 = util$6;
  var createHashMap = _util$7.createHashMap;
  var isObject$2 = _util$7.isObject;
  var map$4 = _util$7.map;
  function OrdinalMeta$2(opt) {
    this.categories = opt.categories || [];
    this._needCollect = opt.needCollect;
    this._deduplication = opt.deduplication;
    this._map;
  }
  OrdinalMeta$2.createByAxisModel = function(axisModel) {
    var option = axisModel.option;
    var data = option.data;
    var categories = data && map$4(data, getName);
    return new OrdinalMeta$2({
      categories,
      needCollect: !categories,
      deduplication: option.dedplication !== false
    });
  };
  var proto = OrdinalMeta$2.prototype;
  proto.getOrdinal = function(category) {
    return getOrCreateMap(this).get(category);
  };
  proto.parseAndCollect = function(category) {
    var index2;
    var needCollect = this._needCollect;
    if (typeof category !== "string" && !needCollect) {
      return category;
    }
    if (needCollect && !this._deduplication) {
      index2 = this.categories.length;
      this.categories[index2] = category;
      return index2;
    }
    var map2 = getOrCreateMap(this);
    index2 = map2.get(category);
    if (index2 == null) {
      if (needCollect) {
        index2 = this.categories.length;
        this.categories[index2] = category;
        map2.set(category, index2);
      } else {
        index2 = NaN;
      }
    }
    return index2;
  };
  function getOrCreateMap(ordinalMeta) {
    return ordinalMeta._map || (ordinalMeta._map = createHashMap(ordinalMeta.categories));
  }
  function getName(obj) {
    if (isObject$2(obj) && obj.value != null) {
      return obj.value;
    } else {
      return obj + "";
    }
  }
  var _default$p = OrdinalMeta$2;
  var OrdinalMeta_1 = _default$p;
  var zrUtil$z = util$6;
  var Scale$3 = Scale_1;
  var OrdinalMeta$1 = OrdinalMeta_1;
  var scaleProto$1 = Scale$3.prototype;
  var OrdinalScale$1 = Scale$3.extend({
    type: "ordinal",
    init: function(ordinalMeta, extent) {
      if (!ordinalMeta || zrUtil$z.isArray(ordinalMeta)) {
        ordinalMeta = new OrdinalMeta$1({
          categories: ordinalMeta
        });
      }
      this._ordinalMeta = ordinalMeta;
      this._extent = extent || [0, ordinalMeta.categories.length - 1];
    },
    parse: function(val) {
      return typeof val === "string" ? this._ordinalMeta.getOrdinal(val) : Math.round(val);
    },
    contain: function(rank) {
      rank = this.parse(rank);
      return scaleProto$1.contain.call(this, rank) && this._ordinalMeta.categories[rank] != null;
    },
    normalize: function(val) {
      return scaleProto$1.normalize.call(this, this.parse(val));
    },
    scale: function(val) {
      return Math.round(scaleProto$1.scale.call(this, val));
    },
    getTicks: function() {
      var ticks = [];
      var extent = this._extent;
      var rank = extent[0];
      while (rank <= extent[1]) {
        ticks.push(rank);
        rank++;
      }
      return ticks;
    },
    getLabel: function(n) {
      if (!this.isBlank()) {
        return this._ordinalMeta.categories[n];
      }
    },
    count: function() {
      return this._extent[1] - this._extent[0] + 1;
    },
    unionExtentFromData: function(data, dim) {
      this.unionExtent(data.getApproximateExtent(dim));
    },
    getOrdinalMeta: function() {
      return this._ordinalMeta;
    },
    niceTicks: zrUtil$z.noop,
    niceExtent: zrUtil$z.noop
  });
  OrdinalScale$1.create = function() {
    return new OrdinalScale$1();
  };
  var _default$o = OrdinalScale$1;
  var Ordinal = _default$o;
  var helper$2 = {};
  var numberUtil$6 = number;
  var roundNumber$1 = numberUtil$6.round;
  function intervalScaleNiceTicks(extent, splitNumber, minInterval, maxInterval) {
    var result = {};
    var span = extent[1] - extent[0];
    var interval = result.interval = numberUtil$6.nice(span / splitNumber, true);
    if (minInterval != null && interval < minInterval) {
      interval = result.interval = minInterval;
    }
    if (maxInterval != null && interval > maxInterval) {
      interval = result.interval = maxInterval;
    }
    var precision = result.intervalPrecision = getIntervalPrecision(interval);
    var niceTickExtent = result.niceTickExtent = [roundNumber$1(Math.ceil(extent[0] / interval) * interval, precision), roundNumber$1(Math.floor(extent[1] / interval) * interval, precision)];
    fixExtent(niceTickExtent, extent);
    return result;
  }
  function getIntervalPrecision(interval) {
    return numberUtil$6.getPrecisionSafe(interval) + 2;
  }
  function clamp(niceTickExtent, idx, extent) {
    niceTickExtent[idx] = Math.max(Math.min(niceTickExtent[idx], extent[1]), extent[0]);
  }
  function fixExtent(niceTickExtent, extent) {
    !isFinite(niceTickExtent[0]) && (niceTickExtent[0] = extent[0]);
    !isFinite(niceTickExtent[1]) && (niceTickExtent[1] = extent[1]);
    clamp(niceTickExtent, 0, extent);
    clamp(niceTickExtent, 1, extent);
    if (niceTickExtent[0] > niceTickExtent[1]) {
      niceTickExtent[0] = niceTickExtent[1];
    }
  }
  helper$2.intervalScaleNiceTicks = intervalScaleNiceTicks;
  helper$2.getIntervalPrecision = getIntervalPrecision;
  helper$2.fixExtent = fixExtent;
  var numberUtil$5 = number;
  var formatUtil$7 = format;
  var Scale$2 = Scale_1;
  var helper$1 = helper$2;
  var roundNumber = numberUtil$5.round;
  var IntervalScale$3 = Scale$2.extend({
    type: "interval",
    _interval: 0,
    _intervalPrecision: 2,
    setExtent: function(start2, end2) {
      var thisExtent = this._extent;
      if (!isNaN(start2)) {
        thisExtent[0] = parseFloat(start2);
      }
      if (!isNaN(end2)) {
        thisExtent[1] = parseFloat(end2);
      }
    },
    unionExtent: function(other) {
      var extent = this._extent;
      other[0] < extent[0] && (extent[0] = other[0]);
      other[1] > extent[1] && (extent[1] = other[1]);
      IntervalScale$3.prototype.setExtent.call(this, extent[0], extent[1]);
    },
    getInterval: function() {
      return this._interval;
    },
    setInterval: function(interval) {
      this._interval = interval;
      this._niceExtent = this._extent.slice();
      this._intervalPrecision = helper$1.getIntervalPrecision(interval);
    },
    getTicks: function(expandToNicedExtent) {
      var interval = this._interval;
      var extent = this._extent;
      var niceTickExtent = this._niceExtent;
      var intervalPrecision = this._intervalPrecision;
      var ticks = [];
      if (!interval) {
        return ticks;
      }
      var safeLimit = 1e4;
      if (extent[0] < niceTickExtent[0]) {
        if (expandToNicedExtent) {
          ticks.push(roundNumber(niceTickExtent[0] - interval, intervalPrecision));
        } else {
          ticks.push(extent[0]);
        }
      }
      var tick = niceTickExtent[0];
      while (tick <= niceTickExtent[1]) {
        ticks.push(tick);
        tick = roundNumber(tick + interval, intervalPrecision);
        if (tick === ticks[ticks.length - 1]) {
          break;
        }
        if (ticks.length > safeLimit) {
          return [];
        }
      }
      var lastNiceTick = ticks.length ? ticks[ticks.length - 1] : niceTickExtent[1];
      if (extent[1] > lastNiceTick) {
        if (expandToNicedExtent) {
          ticks.push(roundNumber(lastNiceTick + interval, intervalPrecision));
        } else {
          ticks.push(extent[1]);
        }
      }
      return ticks;
    },
    getMinorTicks: function(splitNumber) {
      var ticks = this.getTicks(true);
      var minorTicks = [];
      var extent = this.getExtent();
      for (var i2 = 1; i2 < ticks.length; i2++) {
        var nextTick = ticks[i2];
        var prevTick = ticks[i2 - 1];
        var count = 0;
        var minorTicksGroup = [];
        var interval = nextTick - prevTick;
        var minorInterval = interval / splitNumber;
        while (count < splitNumber - 1) {
          var minorTick = numberUtil$5.round(prevTick + (count + 1) * minorInterval);
          if (minorTick > extent[0] && minorTick < extent[1]) {
            minorTicksGroup.push(minorTick);
          }
          count++;
        }
        minorTicks.push(minorTicksGroup);
      }
      return minorTicks;
    },
    getLabel: function(data, opt) {
      if (data == null) {
        return "";
      }
      var precision = opt && opt.precision;
      if (precision == null) {
        precision = numberUtil$5.getPrecisionSafe(data) || 0;
      } else if (precision === "auto") {
        precision = this._intervalPrecision;
      }
      data = roundNumber(data, precision, true);
      return formatUtil$7.addCommas(data);
    },
    niceTicks: function(splitNumber, minInterval, maxInterval) {
      splitNumber = splitNumber || 5;
      var extent = this._extent;
      var span = extent[1] - extent[0];
      if (!isFinite(span)) {
        return;
      }
      if (span < 0) {
        span = -span;
        extent.reverse();
      }
      var result = helper$1.intervalScaleNiceTicks(extent, splitNumber, minInterval, maxInterval);
      this._intervalPrecision = result.intervalPrecision;
      this._interval = result.interval;
      this._niceExtent = result.niceTickExtent;
    },
    niceExtent: function(opt) {
      var extent = this._extent;
      if (extent[0] === extent[1]) {
        if (extent[0] !== 0) {
          var expandSize = extent[0];
          if (!opt.fixMax) {
            extent[1] += expandSize / 2;
            extent[0] -= expandSize / 2;
          } else {
            extent[0] -= expandSize / 2;
          }
        } else {
          extent[1] = 1;
        }
      }
      var span = extent[1] - extent[0];
      if (!isFinite(span)) {
        extent[0] = 0;
        extent[1] = 1;
      }
      this.niceTicks(opt.splitNumber, opt.minInterval, opt.maxInterval);
      var interval = this._interval;
      if (!opt.fixMin) {
        extent[0] = roundNumber(Math.floor(extent[0] / interval) * interval);
      }
      if (!opt.fixMax) {
        extent[1] = roundNumber(Math.ceil(extent[1] / interval) * interval);
      }
    }
  });
  IntervalScale$3.create = function() {
    return new IntervalScale$3();
  };
  var _default$n = IntervalScale$3;
  var Interval = _default$n;
  var barGrid = {};
  var zrUtil$y = util$6;
  var _number$4 = number;
  var parsePercent$2 = _number$4.parsePercent;
  var _dataStackHelper$4 = dataStackHelper;
  var isDimensionStacked$3 = _dataStackHelper$4.isDimensionStacked;
  var createRenderPlanner$1 = createRenderPlanner$3;
  var STACK_PREFIX = "__ec_stack_";
  var LARGE_BAR_MIN_WIDTH = 0.5;
  var LargeArr = typeof Float32Array !== "undefined" ? Float32Array : Array;
  function getSeriesStackId(seriesModel) {
    return seriesModel.get("stack") || STACK_PREFIX + seriesModel.seriesIndex;
  }
  function getAxisKey(axis) {
    return axis.dim + axis.index;
  }
  function getLayoutOnAxis(opt) {
    var params = [];
    var baseAxis = opt.axis;
    var axisKey = "axis0";
    if (baseAxis.type !== "category") {
      return;
    }
    var bandWidth = baseAxis.getBandWidth();
    for (var i2 = 0; i2 < opt.count || 0; i2++) {
      params.push(zrUtil$y.defaults({
        bandWidth,
        axisKey,
        stackId: STACK_PREFIX + i2
      }, opt));
    }
    var widthAndOffsets = doCalBarWidthAndOffset(params);
    var result = [];
    for (var i2 = 0; i2 < opt.count; i2++) {
      var item = widthAndOffsets[axisKey][STACK_PREFIX + i2];
      item.offsetCenter = item.offset + item.width / 2;
      result.push(item);
    }
    return result;
  }
  function prepareLayoutBarSeries$1(seriesType2, ecModel) {
    var seriesModels = [];
    ecModel.eachSeriesByType(seriesType2, function(seriesModel) {
      if (isOnCartesian(seriesModel) && !isInLargeMode(seriesModel)) {
        seriesModels.push(seriesModel);
      }
    });
    return seriesModels;
  }
  function getValueAxesMinGaps(barSeries) {
    var axisValues = {};
    zrUtil$y.each(barSeries, function(seriesModel) {
      var cartesian = seriesModel.coordinateSystem;
      var baseAxis = cartesian.getBaseAxis();
      if (baseAxis.type !== "time" && baseAxis.type !== "value") {
        return;
      }
      var data = seriesModel.getData();
      var key2 = baseAxis.dim + "_" + baseAxis.index;
      var dim = data.mapDimension(baseAxis.dim);
      for (var i2 = 0, cnt = data.count(); i2 < cnt; ++i2) {
        var value = data.get(dim, i2);
        if (!axisValues[key2]) {
          axisValues[key2] = [value];
        } else {
          axisValues[key2].push(value);
        }
      }
    });
    var axisMinGaps = [];
    for (var key in axisValues) {
      if (axisValues.hasOwnProperty(key)) {
        var valuesInAxis = axisValues[key];
        if (valuesInAxis) {
          valuesInAxis.sort(function(a, b) {
            return a - b;
          });
          var min3 = null;
          for (var j = 1; j < valuesInAxis.length; ++j) {
            var delta = valuesInAxis[j] - valuesInAxis[j - 1];
            if (delta > 0) {
              min3 = min3 === null ? delta : Math.min(min3, delta);
            }
          }
          axisMinGaps[key] = min3;
        }
      }
    }
    return axisMinGaps;
  }
  function makeColumnLayout$1(barSeries) {
    var axisMinGaps = getValueAxesMinGaps(barSeries);
    var seriesInfoList = [];
    zrUtil$y.each(barSeries, function(seriesModel) {
      var cartesian = seriesModel.coordinateSystem;
      var baseAxis = cartesian.getBaseAxis();
      var axisExtent = baseAxis.getExtent();
      var bandWidth;
      if (baseAxis.type === "category") {
        bandWidth = baseAxis.getBandWidth();
      } else if (baseAxis.type === "value" || baseAxis.type === "time") {
        var key = baseAxis.dim + "_" + baseAxis.index;
        var minGap = axisMinGaps[key];
        var extentSpan = Math.abs(axisExtent[1] - axisExtent[0]);
        var scale2 = baseAxis.scale.getExtent();
        var scaleSpan = Math.abs(scale2[1] - scale2[0]);
        bandWidth = minGap ? extentSpan / scaleSpan * minGap : extentSpan;
      } else {
        var data = seriesModel.getData();
        bandWidth = Math.abs(axisExtent[1] - axisExtent[0]) / data.count();
      }
      var barWidth = parsePercent$2(seriesModel.get("barWidth"), bandWidth);
      var barMaxWidth = parsePercent$2(seriesModel.get("barMaxWidth"), bandWidth);
      var barMinWidth = parsePercent$2(seriesModel.get("barMinWidth") || 1, bandWidth);
      var barGap = seriesModel.get("barGap");
      var barCategoryGap = seriesModel.get("barCategoryGap");
      seriesInfoList.push({
        bandWidth,
        barWidth,
        barMaxWidth,
        barMinWidth,
        barGap,
        barCategoryGap,
        axisKey: getAxisKey(baseAxis),
        stackId: getSeriesStackId(seriesModel)
      });
    });
    return doCalBarWidthAndOffset(seriesInfoList);
  }
  function doCalBarWidthAndOffset(seriesInfoList) {
    var columnsMap = {};
    zrUtil$y.each(seriesInfoList, function(seriesInfo, idx) {
      var axisKey = seriesInfo.axisKey;
      var bandWidth = seriesInfo.bandWidth;
      var columnsOnAxis = columnsMap[axisKey] || {
        bandWidth,
        remainedWidth: bandWidth,
        autoWidthCount: 0,
        categoryGap: "20%",
        gap: "30%",
        stacks: {}
      };
      var stacks = columnsOnAxis.stacks;
      columnsMap[axisKey] = columnsOnAxis;
      var stackId = seriesInfo.stackId;
      if (!stacks[stackId]) {
        columnsOnAxis.autoWidthCount++;
      }
      stacks[stackId] = stacks[stackId] || {
        width: 0,
        maxWidth: 0
      };
      var barWidth = seriesInfo.barWidth;
      if (barWidth && !stacks[stackId].width) {
        stacks[stackId].width = barWidth;
        barWidth = Math.min(columnsOnAxis.remainedWidth, barWidth);
        columnsOnAxis.remainedWidth -= barWidth;
      }
      var barMaxWidth = seriesInfo.barMaxWidth;
      barMaxWidth && (stacks[stackId].maxWidth = barMaxWidth);
      var barMinWidth = seriesInfo.barMinWidth;
      barMinWidth && (stacks[stackId].minWidth = barMinWidth);
      var barGap = seriesInfo.barGap;
      barGap != null && (columnsOnAxis.gap = barGap);
      var barCategoryGap = seriesInfo.barCategoryGap;
      barCategoryGap != null && (columnsOnAxis.categoryGap = barCategoryGap);
    });
    var result = {};
    zrUtil$y.each(columnsMap, function(columnsOnAxis, coordSysName) {
      result[coordSysName] = {};
      var stacks = columnsOnAxis.stacks;
      var bandWidth = columnsOnAxis.bandWidth;
      var categoryGap = parsePercent$2(columnsOnAxis.categoryGap, bandWidth);
      var barGapPercent = parsePercent$2(columnsOnAxis.gap, 1);
      var remainedWidth = columnsOnAxis.remainedWidth;
      var autoWidthCount = columnsOnAxis.autoWidthCount;
      var autoWidth = (remainedWidth - categoryGap) / (autoWidthCount + (autoWidthCount - 1) * barGapPercent);
      autoWidth = Math.max(autoWidth, 0);
      zrUtil$y.each(stacks, function(column) {
        var maxWidth = column.maxWidth;
        var minWidth = column.minWidth;
        if (!column.width) {
          var finalWidth = autoWidth;
          if (maxWidth && maxWidth < finalWidth) {
            finalWidth = Math.min(maxWidth, remainedWidth);
          }
          if (minWidth && minWidth > finalWidth) {
            finalWidth = minWidth;
          }
          if (finalWidth !== autoWidth) {
            column.width = finalWidth;
            remainedWidth -= finalWidth + barGapPercent * finalWidth;
            autoWidthCount--;
          }
        } else {
          var finalWidth = column.width;
          if (maxWidth) {
            finalWidth = Math.min(finalWidth, maxWidth);
          }
          if (minWidth) {
            finalWidth = Math.max(finalWidth, minWidth);
          }
          column.width = finalWidth;
          remainedWidth -= finalWidth + barGapPercent * finalWidth;
          autoWidthCount--;
        }
      });
      autoWidth = (remainedWidth - categoryGap) / (autoWidthCount + (autoWidthCount - 1) * barGapPercent);
      autoWidth = Math.max(autoWidth, 0);
      var widthSum = 0;
      var lastColumn;
      zrUtil$y.each(stacks, function(column, idx) {
        if (!column.width) {
          column.width = autoWidth;
        }
        lastColumn = column;
        widthSum += column.width * (1 + barGapPercent);
      });
      if (lastColumn) {
        widthSum -= lastColumn.width * barGapPercent;
      }
      var offset = -widthSum / 2;
      zrUtil$y.each(stacks, function(column, stackId) {
        result[coordSysName][stackId] = result[coordSysName][stackId] || {
          bandWidth,
          offset,
          width: column.width
        };
        offset += column.width * (1 + barGapPercent);
      });
    });
    return result;
  }
  function retrieveColumnLayout$1(barWidthAndOffset, axis, seriesModel) {
    if (barWidthAndOffset && axis) {
      var result = barWidthAndOffset[getAxisKey(axis)];
      if (result != null && seriesModel != null) {
        result = result[getSeriesStackId(seriesModel)];
      }
      return result;
    }
  }
  function layout$2(seriesType2, ecModel) {
    var seriesModels = prepareLayoutBarSeries$1(seriesType2, ecModel);
    var barWidthAndOffset = makeColumnLayout$1(seriesModels);
    var lastStackCoords = {};
    var lastStackCoordsOrigin = {};
    zrUtil$y.each(seriesModels, function(seriesModel) {
      var data = seriesModel.getData();
      var cartesian = seriesModel.coordinateSystem;
      var baseAxis = cartesian.getBaseAxis();
      var stackId = getSeriesStackId(seriesModel);
      var columnLayoutInfo = barWidthAndOffset[getAxisKey(baseAxis)][stackId];
      var columnOffset = columnLayoutInfo.offset;
      var columnWidth = columnLayoutInfo.width;
      var valueAxis = cartesian.getOtherAxis(baseAxis);
      var barMinHeight = seriesModel.get("barMinHeight") || 0;
      lastStackCoords[stackId] = lastStackCoords[stackId] || [];
      lastStackCoordsOrigin[stackId] = lastStackCoordsOrigin[stackId] || [];
      data.setLayout({
        bandWidth: columnLayoutInfo.bandWidth,
        offset: columnOffset,
        size: columnWidth
      });
      var valueDim = data.mapDimension(valueAxis.dim);
      var baseDim = data.mapDimension(baseAxis.dim);
      var stacked = isDimensionStacked$3(data, valueDim);
      var isValueAxisH = valueAxis.isHorizontal();
      var valueAxisStart = getValueAxisStart(baseAxis, valueAxis);
      for (var idx = 0, len2 = data.count(); idx < len2; idx++) {
        var value = data.get(valueDim, idx);
        var baseValue = data.get(baseDim, idx);
        var sign = value >= 0 ? "p" : "n";
        var baseCoord = valueAxisStart;
        if (stacked) {
          if (!lastStackCoords[stackId][baseValue]) {
            lastStackCoords[stackId][baseValue] = {
              p: valueAxisStart,
              n: valueAxisStart
            };
          }
          baseCoord = lastStackCoords[stackId][baseValue][sign];
        }
        var x;
        var y;
        var width;
        var height;
        if (isValueAxisH) {
          var coord = cartesian.dataToPoint([value, baseValue]);
          x = baseCoord;
          y = coord[1] + columnOffset;
          width = coord[0] - valueAxisStart;
          height = columnWidth;
          if (Math.abs(width) < barMinHeight) {
            width = (width < 0 ? -1 : 1) * barMinHeight;
          }
          if (!isNaN(width)) {
            stacked && (lastStackCoords[stackId][baseValue][sign] += width);
          }
        } else {
          var coord = cartesian.dataToPoint([baseValue, value]);
          x = coord[0] + columnOffset;
          y = baseCoord;
          width = columnWidth;
          height = coord[1] - valueAxisStart;
          if (Math.abs(height) < barMinHeight) {
            height = (height <= 0 ? -1 : 1) * barMinHeight;
          }
          if (!isNaN(height)) {
            stacked && (lastStackCoords[stackId][baseValue][sign] += height);
          }
        }
        data.setItemLayout(idx, {
          x,
          y,
          width,
          height
        });
      }
    }, this);
  }
  var largeLayout = {
    seriesType: "bar",
    plan: createRenderPlanner$1(),
    reset: function(seriesModel) {
      if (!isOnCartesian(seriesModel) || !isInLargeMode(seriesModel)) {
        return;
      }
      var data = seriesModel.getData();
      var cartesian = seriesModel.coordinateSystem;
      var coordLayout = cartesian.grid.getRect();
      var baseAxis = cartesian.getBaseAxis();
      var valueAxis = cartesian.getOtherAxis(baseAxis);
      var valueDim = data.mapDimension(valueAxis.dim);
      var baseDim = data.mapDimension(baseAxis.dim);
      var valueAxisHorizontal = valueAxis.isHorizontal();
      var valueDimIdx = valueAxisHorizontal ? 0 : 1;
      var barWidth = retrieveColumnLayout$1(makeColumnLayout$1([seriesModel]), baseAxis, seriesModel).width;
      if (!(barWidth > LARGE_BAR_MIN_WIDTH)) {
        barWidth = LARGE_BAR_MIN_WIDTH;
      }
      return {
        progress
      };
      function progress(params, data2) {
        var count = params.count;
        var largePoints = new LargeArr(count * 2);
        var largeBackgroundPoints = new LargeArr(count * 2);
        var largeDataIndices = new LargeArr(count);
        var dataIndex;
        var coord = [];
        var valuePair = [];
        var pointsOffset = 0;
        var idxOffset = 0;
        while ((dataIndex = params.next()) != null) {
          valuePair[valueDimIdx] = data2.get(valueDim, dataIndex);
          valuePair[1 - valueDimIdx] = data2.get(baseDim, dataIndex);
          coord = cartesian.dataToPoint(valuePair, null, coord);
          largeBackgroundPoints[pointsOffset] = valueAxisHorizontal ? coordLayout.x + coordLayout.width : coord[0];
          largePoints[pointsOffset++] = coord[0];
          largeBackgroundPoints[pointsOffset] = valueAxisHorizontal ? coord[1] : coordLayout.y + coordLayout.height;
          largePoints[pointsOffset++] = coord[1];
          largeDataIndices[idxOffset++] = dataIndex;
        }
        data2.setLayout({
          largePoints,
          largeDataIndices,
          largeBackgroundPoints,
          barWidth,
          valueAxisStart: getValueAxisStart(baseAxis, valueAxis),
          backgroundStart: valueAxisHorizontal ? coordLayout.x : coordLayout.y,
          valueAxisHorizontal
        });
      }
    }
  };
  function isOnCartesian(seriesModel) {
    return seriesModel.coordinateSystem && seriesModel.coordinateSystem.type === "cartesian2d";
  }
  function isInLargeMode(seriesModel) {
    return seriesModel.pipelineContext && seriesModel.pipelineContext.large;
  }
  function getValueAxisStart(baseAxis, valueAxis, stacked) {
    return valueAxis.toGlobalCoord(valueAxis.dataToCoord(valueAxis.type === "log" ? 1 : 0));
  }
  barGrid.getLayoutOnAxis = getLayoutOnAxis;
  barGrid.prepareLayoutBarSeries = prepareLayoutBarSeries$1;
  barGrid.makeColumnLayout = makeColumnLayout$1;
  barGrid.retrieveColumnLayout = retrieveColumnLayout$1;
  barGrid.layout = layout$2;
  barGrid.largeLayout = largeLayout;
  var zrUtil$x = util$6;
  var numberUtil$4 = number;
  var formatUtil$6 = format;
  var scaleHelper = helper$2;
  var IntervalScale$2 = Interval;
  var intervalScaleProto$1 = IntervalScale$2.prototype;
  var mathCeil$1 = Math.ceil;
  var mathFloor$1 = Math.floor;
  var ONE_SECOND = 1e3;
  var ONE_MINUTE = ONE_SECOND * 60;
  var ONE_HOUR = ONE_MINUTE * 60;
  var ONE_DAY = ONE_HOUR * 24;
  var bisect = function(a, x, lo, hi) {
    while (lo < hi) {
      var mid = lo + hi >>> 1;
      if (a[mid][1] < x) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    return lo;
  };
  var TimeScale = IntervalScale$2.extend({
    type: "time",
    getLabel: function(val) {
      var stepLvl = this._stepLvl;
      var date = new Date(val);
      return formatUtil$6.formatTime(stepLvl[0], date, this.getSetting("useUTC"));
    },
    niceExtent: function(opt) {
      var extent = this._extent;
      if (extent[0] === extent[1]) {
        extent[0] -= ONE_DAY;
        extent[1] += ONE_DAY;
      }
      if (extent[1] === -Infinity && extent[0] === Infinity) {
        var d = new Date();
        extent[1] = +new Date(d.getFullYear(), d.getMonth(), d.getDate());
        extent[0] = extent[1] - ONE_DAY;
      }
      this.niceTicks(opt.splitNumber, opt.minInterval, opt.maxInterval);
      var interval = this._interval;
      if (!opt.fixMin) {
        extent[0] = numberUtil$4.round(mathFloor$1(extent[0] / interval) * interval);
      }
      if (!opt.fixMax) {
        extent[1] = numberUtil$4.round(mathCeil$1(extent[1] / interval) * interval);
      }
    },
    niceTicks: function(approxTickNum, minInterval, maxInterval) {
      approxTickNum = approxTickNum || 10;
      var extent = this._extent;
      var span = extent[1] - extent[0];
      var approxInterval = span / approxTickNum;
      if (minInterval != null && approxInterval < minInterval) {
        approxInterval = minInterval;
      }
      if (maxInterval != null && approxInterval > maxInterval) {
        approxInterval = maxInterval;
      }
      var scaleLevelsLen = scaleLevels.length;
      var idx = bisect(scaleLevels, approxInterval, 0, scaleLevelsLen);
      var level = scaleLevels[Math.min(idx, scaleLevelsLen - 1)];
      var interval = level[1];
      if (level[0] === "year") {
        var yearSpan = span / interval;
        var yearStep = numberUtil$4.nice(yearSpan / approxTickNum, true);
        interval *= yearStep;
      }
      var timezoneOffset = this.getSetting("useUTC") ? 0 : new Date(+extent[0] || +extent[1]).getTimezoneOffset() * 60 * 1e3;
      var niceExtent = [Math.round(mathCeil$1((extent[0] - timezoneOffset) / interval) * interval + timezoneOffset), Math.round(mathFloor$1((extent[1] - timezoneOffset) / interval) * interval + timezoneOffset)];
      scaleHelper.fixExtent(niceExtent, extent);
      this._stepLvl = level;
      this._interval = interval;
      this._niceExtent = niceExtent;
    },
    parse: function(val) {
      return +numberUtil$4.parseDate(val);
    }
  });
  zrUtil$x.each(["contain", "normalize"], function(methodName) {
    TimeScale.prototype[methodName] = function(val) {
      return intervalScaleProto$1[methodName].call(this, this.parse(val));
    };
  });
  var scaleLevels = [
    ["hh:mm:ss", ONE_SECOND],
    ["hh:mm:ss", ONE_SECOND * 5],
    ["hh:mm:ss", ONE_SECOND * 10],
    ["hh:mm:ss", ONE_SECOND * 15],
    ["hh:mm:ss", ONE_SECOND * 30],
    ["hh:mm\nMM-dd", ONE_MINUTE],
    ["hh:mm\nMM-dd", ONE_MINUTE * 5],
    ["hh:mm\nMM-dd", ONE_MINUTE * 10],
    ["hh:mm\nMM-dd", ONE_MINUTE * 15],
    ["hh:mm\nMM-dd", ONE_MINUTE * 30],
    ["hh:mm\nMM-dd", ONE_HOUR],
    ["hh:mm\nMM-dd", ONE_HOUR * 2],
    ["hh:mm\nMM-dd", ONE_HOUR * 6],
    ["hh:mm\nMM-dd", ONE_HOUR * 12],
    ["MM-dd\nyyyy", ONE_DAY],
    ["MM-dd\nyyyy", ONE_DAY * 2],
    ["MM-dd\nyyyy", ONE_DAY * 3],
    ["MM-dd\nyyyy", ONE_DAY * 4],
    ["MM-dd\nyyyy", ONE_DAY * 5],
    ["MM-dd\nyyyy", ONE_DAY * 6],
    ["week", ONE_DAY * 7],
    ["MM-dd\nyyyy", ONE_DAY * 10],
    ["week", ONE_DAY * 14],
    ["week", ONE_DAY * 21],
    ["month", ONE_DAY * 31],
    ["week", ONE_DAY * 42],
    ["month", ONE_DAY * 62],
    ["week", ONE_DAY * 70],
    ["quarter", ONE_DAY * 95],
    ["month", ONE_DAY * 31 * 4],
    ["month", ONE_DAY * 31 * 5],
    ["half-year", ONE_DAY * 380 / 2],
    ["month", ONE_DAY * 31 * 8],
    ["month", ONE_DAY * 31 * 10],
    ["year", ONE_DAY * 380]
  ];
  TimeScale.create = function(model2) {
    return new TimeScale({
      useUTC: model2.ecModel.get("useUTC")
    });
  };
  var zrUtil$w = util$6;
  var Scale$1 = Scale_1;
  var numberUtil$3 = number;
  var IntervalScale$1 = Interval;
  var scaleProto = Scale$1.prototype;
  var intervalScaleProto = IntervalScale$1.prototype;
  var getPrecisionSafe = numberUtil$3.getPrecisionSafe;
  var roundingErrorFix = numberUtil$3.round;
  var mathFloor = Math.floor;
  var mathCeil = Math.ceil;
  var mathPow = Math.pow;
  var mathLog = Math.log;
  var LogScale = Scale$1.extend({
    type: "log",
    base: 10,
    $constructor: function() {
      Scale$1.apply(this, arguments);
      this._originalScale = new IntervalScale$1();
    },
    getTicks: function(expandToNicedExtent) {
      var originalScale = this._originalScale;
      var extent = this._extent;
      var originalExtent = originalScale.getExtent();
      return zrUtil$w.map(intervalScaleProto.getTicks.call(this, expandToNicedExtent), function(val) {
        var powVal = numberUtil$3.round(mathPow(this.base, val));
        powVal = val === extent[0] && originalScale.__fixMin ? fixRoundingError(powVal, originalExtent[0]) : powVal;
        powVal = val === extent[1] && originalScale.__fixMax ? fixRoundingError(powVal, originalExtent[1]) : powVal;
        return powVal;
      }, this);
    },
    getMinorTicks: intervalScaleProto.getMinorTicks,
    getLabel: intervalScaleProto.getLabel,
    scale: function(val) {
      val = scaleProto.scale.call(this, val);
      return mathPow(this.base, val);
    },
    setExtent: function(start2, end2) {
      var base2 = this.base;
      start2 = mathLog(start2) / mathLog(base2);
      end2 = mathLog(end2) / mathLog(base2);
      intervalScaleProto.setExtent.call(this, start2, end2);
    },
    getExtent: function() {
      var base2 = this.base;
      var extent = scaleProto.getExtent.call(this);
      extent[0] = mathPow(base2, extent[0]);
      extent[1] = mathPow(base2, extent[1]);
      var originalScale = this._originalScale;
      var originalExtent = originalScale.getExtent();
      originalScale.__fixMin && (extent[0] = fixRoundingError(extent[0], originalExtent[0]));
      originalScale.__fixMax && (extent[1] = fixRoundingError(extent[1], originalExtent[1]));
      return extent;
    },
    unionExtent: function(extent) {
      this._originalScale.unionExtent(extent);
      var base2 = this.base;
      extent[0] = mathLog(extent[0]) / mathLog(base2);
      extent[1] = mathLog(extent[1]) / mathLog(base2);
      scaleProto.unionExtent.call(this, extent);
    },
    unionExtentFromData: function(data, dim) {
      this.unionExtent(data.getApproximateExtent(dim));
    },
    niceTicks: function(approxTickNum) {
      approxTickNum = approxTickNum || 10;
      var extent = this._extent;
      var span = extent[1] - extent[0];
      if (span === Infinity || span <= 0) {
        return;
      }
      var interval = numberUtil$3.quantity(span);
      var err = approxTickNum / span * interval;
      if (err <= 0.5) {
        interval *= 10;
      }
      while (!isNaN(interval) && Math.abs(interval) < 1 && Math.abs(interval) > 0) {
        interval *= 10;
      }
      var niceExtent = [numberUtil$3.round(mathCeil(extent[0] / interval) * interval), numberUtil$3.round(mathFloor(extent[1] / interval) * interval)];
      this._interval = interval;
      this._niceExtent = niceExtent;
    },
    niceExtent: function(opt) {
      intervalScaleProto.niceExtent.call(this, opt);
      var originalScale = this._originalScale;
      originalScale.__fixMin = opt.fixMin;
      originalScale.__fixMax = opt.fixMax;
    }
  });
  zrUtil$w.each(["contain", "normalize"], function(methodName) {
    LogScale.prototype[methodName] = function(val) {
      val = mathLog(val) / mathLog(this.base);
      return scaleProto[methodName].call(this, val);
    };
  });
  LogScale.create = function() {
    return new LogScale();
  };
  function fixRoundingError(val, originalVal) {
    return roundingErrorFix(val, getPrecisionSafe(originalVal));
  }
  var zrUtil$v = util$6;
  var OrdinalScale = Ordinal;
  var IntervalScale = Interval;
  var Scale = Scale_1;
  var numberUtil$2 = number;
  var _barGrid = barGrid;
  var prepareLayoutBarSeries = _barGrid.prepareLayoutBarSeries;
  var makeColumnLayout = _barGrid.makeColumnLayout;
  var retrieveColumnLayout = _barGrid.retrieveColumnLayout;
  var BoundingRect$3 = BoundingRect_1;
  function getScaleExtent(scale2, model2) {
    var scaleType = scale2.type;
    var min3 = model2.getMin();
    var max3 = model2.getMax();
    var originalExtent = scale2.getExtent();
    var axisDataLen;
    var boundaryGap;
    var span;
    if (scaleType === "ordinal") {
      axisDataLen = model2.getCategories().length;
    } else {
      boundaryGap = model2.get("boundaryGap");
      if (!zrUtil$v.isArray(boundaryGap)) {
        boundaryGap = [boundaryGap || 0, boundaryGap || 0];
      }
      if (typeof boundaryGap[0] === "boolean") {
        boundaryGap = [0, 0];
      }
      boundaryGap[0] = numberUtil$2.parsePercent(boundaryGap[0], 1);
      boundaryGap[1] = numberUtil$2.parsePercent(boundaryGap[1], 1);
      span = originalExtent[1] - originalExtent[0] || Math.abs(originalExtent[0]);
    }
    if (min3 === "dataMin") {
      min3 = originalExtent[0];
    } else if (typeof min3 === "function") {
      min3 = min3({
        min: originalExtent[0],
        max: originalExtent[1]
      });
    }
    if (max3 === "dataMax") {
      max3 = originalExtent[1];
    } else if (typeof max3 === "function") {
      max3 = max3({
        min: originalExtent[0],
        max: originalExtent[1]
      });
    }
    var fixMin = min3 != null;
    var fixMax = max3 != null;
    if (min3 == null) {
      min3 = scaleType === "ordinal" ? axisDataLen ? 0 : NaN : originalExtent[0] - boundaryGap[0] * span;
    }
    if (max3 == null) {
      max3 = scaleType === "ordinal" ? axisDataLen ? axisDataLen - 1 : NaN : originalExtent[1] + boundaryGap[1] * span;
    }
    (min3 == null || !isFinite(min3)) && (min3 = NaN);
    (max3 == null || !isFinite(max3)) && (max3 = NaN);
    scale2.setBlank(zrUtil$v.eqNaN(min3) || zrUtil$v.eqNaN(max3) || scaleType === "ordinal" && !scale2.getOrdinalMeta().categories.length);
    if (model2.getNeedCrossZero()) {
      if (min3 > 0 && max3 > 0 && !fixMin) {
        min3 = 0;
      }
      if (min3 < 0 && max3 < 0 && !fixMax) {
        max3 = 0;
      }
    }
    var ecModel = model2.ecModel;
    if (ecModel && scaleType === "time") {
      var barSeriesModels = prepareLayoutBarSeries("bar", ecModel);
      var isBaseAxisAndHasBarSeries;
      zrUtil$v.each(barSeriesModels, function(seriesModel) {
        isBaseAxisAndHasBarSeries |= seriesModel.getBaseAxis() === model2.axis;
      });
      if (isBaseAxisAndHasBarSeries) {
        var barWidthAndOffset = makeColumnLayout(barSeriesModels);
        var adjustedScale = adjustScaleForOverflow(min3, max3, model2, barWidthAndOffset);
        min3 = adjustedScale.min;
        max3 = adjustedScale.max;
      }
    }
    return {
      extent: [min3, max3],
      fixMin,
      fixMax
    };
  }
  function adjustScaleForOverflow(min3, max3, model2, barWidthAndOffset) {
    var axisExtent = model2.axis.getExtent();
    var axisLength = axisExtent[1] - axisExtent[0];
    var barsOnCurrentAxis = retrieveColumnLayout(barWidthAndOffset, model2.axis);
    if (barsOnCurrentAxis === void 0) {
      return {
        min: min3,
        max: max3
      };
    }
    var minOverflow = Infinity;
    zrUtil$v.each(barsOnCurrentAxis, function(item) {
      minOverflow = Math.min(item.offset, minOverflow);
    });
    var maxOverflow = -Infinity;
    zrUtil$v.each(barsOnCurrentAxis, function(item) {
      maxOverflow = Math.max(item.offset + item.width, maxOverflow);
    });
    minOverflow = Math.abs(minOverflow);
    maxOverflow = Math.abs(maxOverflow);
    var totalOverFlow = minOverflow + maxOverflow;
    var oldRange = max3 - min3;
    var oldRangePercentOfNew = 1 - (minOverflow + maxOverflow) / axisLength;
    var overflowBuffer = oldRange / oldRangePercentOfNew - oldRange;
    max3 += overflowBuffer * (maxOverflow / totalOverFlow);
    min3 -= overflowBuffer * (minOverflow / totalOverFlow);
    return {
      min: min3,
      max: max3
    };
  }
  function niceScaleExtent$1(scale2, model2) {
    var extentInfo = getScaleExtent(scale2, model2);
    var extent = extentInfo.extent;
    var splitNumber = model2.get("splitNumber");
    if (scale2.type === "log") {
      scale2.base = model2.get("logBase");
    }
    var scaleType = scale2.type;
    scale2.setExtent(extent[0], extent[1]);
    scale2.niceExtent({
      splitNumber,
      fixMin: extentInfo.fixMin,
      fixMax: extentInfo.fixMax,
      minInterval: scaleType === "interval" || scaleType === "time" ? model2.get("minInterval") : null,
      maxInterval: scaleType === "interval" || scaleType === "time" ? model2.get("maxInterval") : null
    });
    var interval = model2.get("interval");
    if (interval != null) {
      scale2.setInterval && scale2.setInterval(interval);
    }
  }
  function createScaleByModel$1(model2, axisType) {
    axisType = axisType || model2.get("type");
    if (axisType) {
      switch (axisType) {
        case "category":
          return new OrdinalScale(model2.getOrdinalMeta ? model2.getOrdinalMeta() : model2.getCategories(), [Infinity, -Infinity]);
        case "value":
          return new IntervalScale();
        default:
          return (Scale.getClass(axisType) || IntervalScale).create(model2);
      }
    }
  }
  function ifAxisCrossZero$1(axis) {
    var dataExtent = axis.scale.getExtent();
    var min3 = dataExtent[0];
    var max3 = dataExtent[1];
    return !(min3 > 0 && max3 > 0 || min3 < 0 && max3 < 0);
  }
  function makeLabelFormatter$1(axis) {
    var labelFormatter = axis.getLabelModel().get("formatter");
    var categoryTickStart = axis.type === "category" ? axis.scale.getExtent()[0] : null;
    if (typeof labelFormatter === "string") {
      labelFormatter = function(tpl) {
        return function(val) {
          val = axis.scale.getLabel(val);
          return tpl.replace("{value}", val != null ? val : "");
        };
      }(labelFormatter);
      return labelFormatter;
    } else if (typeof labelFormatter === "function") {
      return function(tickValue, idx) {
        if (categoryTickStart != null) {
          idx = tickValue - categoryTickStart;
        }
        return labelFormatter(getAxisRawValue(axis, tickValue), idx);
      };
    } else {
      return function(tick) {
        return axis.scale.getLabel(tick);
      };
    }
  }
  function getAxisRawValue(axis, value) {
    return axis.type === "category" ? axis.scale.getLabel(value) : value;
  }
  function estimateLabelUnionRect$1(axis) {
    var axisModel = axis.model;
    var scale2 = axis.scale;
    if (!axisModel.get("axisLabel.show") || scale2.isBlank()) {
      return;
    }
    var isCategory2 = axis.type === "category";
    var realNumberScaleTicks;
    var tickCount;
    var categoryScaleExtent = scale2.getExtent();
    if (isCategory2) {
      tickCount = scale2.count();
    } else {
      realNumberScaleTicks = scale2.getTicks();
      tickCount = realNumberScaleTicks.length;
    }
    var axisLabelModel = axis.getLabelModel();
    var labelFormatter = makeLabelFormatter$1(axis);
    var rect;
    var step = 1;
    if (tickCount > 40) {
      step = Math.ceil(tickCount / 40);
    }
    for (var i2 = 0; i2 < tickCount; i2 += step) {
      var tickValue = realNumberScaleTicks ? realNumberScaleTicks[i2] : categoryScaleExtent[0] + i2;
      var label = labelFormatter(tickValue);
      var unrotatedSingleRect = axisLabelModel.getTextRect(label);
      var singleRect = rotateTextRect(unrotatedSingleRect, axisLabelModel.get("rotate") || 0);
      rect ? rect.union(singleRect) : rect = singleRect;
    }
    return rect;
  }
  function rotateTextRect(textRect, rotate2) {
    var rotateRadians = rotate2 * Math.PI / 180;
    var boundingBox = textRect.plain();
    var beforeWidth = boundingBox.width;
    var beforeHeight = boundingBox.height;
    var afterWidth = beforeWidth * Math.abs(Math.cos(rotateRadians)) + Math.abs(beforeHeight * Math.sin(rotateRadians));
    var afterHeight = beforeWidth * Math.abs(Math.sin(rotateRadians)) + Math.abs(beforeHeight * Math.cos(rotateRadians));
    var rotatedRect = new BoundingRect$3(boundingBox.x, boundingBox.y, afterWidth, afterHeight);
    return rotatedRect;
  }
  function getOptionCategoryInterval$1(model2) {
    var interval = model2.get("interval");
    return interval == null ? "auto" : interval;
  }
  function shouldShowAllLabels$2(axis) {
    return axis.type === "category" && getOptionCategoryInterval$1(axis.getLabelModel()) === 0;
  }
  axisHelper$3.getScaleExtent = getScaleExtent;
  axisHelper$3.niceScaleExtent = niceScaleExtent$1;
  axisHelper$3.createScaleByModel = createScaleByModel$1;
  axisHelper$3.ifAxisCrossZero = ifAxisCrossZero$1;
  axisHelper$3.makeLabelFormatter = makeLabelFormatter$1;
  axisHelper$3.getAxisRawValue = getAxisRawValue;
  axisHelper$3.estimateLabelUnionRect = estimateLabelUnionRect$1;
  axisHelper$3.getOptionCategoryInterval = getOptionCategoryInterval$1;
  axisHelper$3.shouldShowAllLabels = shouldShowAllLabels$2;
  var zrUtil$u = util$6;
  var _default$m = {
    getMin: function(origin) {
      var option = this.option;
      var min3 = !origin && option.rangeStart != null ? option.rangeStart : option.min;
      if (this.axis && min3 != null && min3 !== "dataMin" && typeof min3 !== "function" && !zrUtil$u.eqNaN(min3)) {
        min3 = this.axis.scale.parse(min3);
      }
      return min3;
    },
    getMax: function(origin) {
      var option = this.option;
      var max3 = !origin && option.rangeEnd != null ? option.rangeEnd : option.max;
      if (this.axis && max3 != null && max3 !== "dataMax" && typeof max3 !== "function" && !zrUtil$u.eqNaN(max3)) {
        max3 = this.axis.scale.parse(max3);
      }
      return max3;
    },
    getNeedCrossZero: function() {
      var option = this.option;
      return option.rangeStart != null || option.rangeEnd != null ? false : !option.scale;
    },
    getCoordSysModel: zrUtil$u.noop,
    setRange: function(rangeStart, rangeEnd) {
      this.option.rangeStart = rangeStart;
      this.option.rangeEnd = rangeEnd;
    },
    resetRange: function() {
      this.option.rangeStart = this.option.rangeEnd = null;
    }
  };
  var axisModelCommonMixin$2 = _default$m;
  var symbol$1 = {};
  var zrUtil$t = util$6;
  var graphic$e = graphic$g;
  var BoundingRect$2 = BoundingRect_1;
  var _text = text;
  var calculateTextPosition = _text.calculateTextPosition;
  var Triangle = graphic$e.extendShape({
    type: "triangle",
    shape: {
      cx: 0,
      cy: 0,
      width: 0,
      height: 0
    },
    buildPath: function(path2, shape) {
      var cx = shape.cx;
      var cy = shape.cy;
      var width = shape.width / 2;
      var height = shape.height / 2;
      path2.moveTo(cx, cy - height);
      path2.lineTo(cx + width, cy + height);
      path2.lineTo(cx - width, cy + height);
      path2.closePath();
    }
  });
  var Diamond = graphic$e.extendShape({
    type: "diamond",
    shape: {
      cx: 0,
      cy: 0,
      width: 0,
      height: 0
    },
    buildPath: function(path2, shape) {
      var cx = shape.cx;
      var cy = shape.cy;
      var width = shape.width / 2;
      var height = shape.height / 2;
      path2.moveTo(cx, cy - height);
      path2.lineTo(cx + width, cy);
      path2.lineTo(cx, cy + height);
      path2.lineTo(cx - width, cy);
      path2.closePath();
    }
  });
  var Pin = graphic$e.extendShape({
    type: "pin",
    shape: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    buildPath: function(path2, shape) {
      var x = shape.x;
      var y = shape.y;
      var w = shape.width / 5 * 3;
      var h = Math.max(w, shape.height);
      var r = w / 2;
      var dy = r * r / (h - r);
      var cy = y - h + r + dy;
      var angle = Math.asin(dy / r);
      var dx = Math.cos(angle) * r;
      var tanX = Math.sin(angle);
      var tanY = Math.cos(angle);
      var cpLen = r * 0.6;
      var cpLen2 = r * 0.7;
      path2.moveTo(x - dx, cy + dy);
      path2.arc(x, cy, r, Math.PI - angle, Math.PI * 2 + angle);
      path2.bezierCurveTo(x + dx - tanX * cpLen, cy + dy + tanY * cpLen, x, y - cpLen2, x, y);
      path2.bezierCurveTo(x, y - cpLen2, x - dx + tanX * cpLen, cy + dy + tanY * cpLen, x - dx, cy + dy);
      path2.closePath();
    }
  });
  var Arrow = graphic$e.extendShape({
    type: "arrow",
    shape: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    buildPath: function(ctx, shape) {
      var height = shape.height;
      var width = shape.width;
      var x = shape.x;
      var y = shape.y;
      var dx = width / 3 * 2;
      ctx.moveTo(x, y);
      ctx.lineTo(x + dx, y + height);
      ctx.lineTo(x, y + height / 4 * 3);
      ctx.lineTo(x - dx, y + height);
      ctx.lineTo(x, y);
      ctx.closePath();
    }
  });
  var symbolCtors = {
    line: graphic$e.Line,
    rect: graphic$e.Rect,
    roundRect: graphic$e.Rect,
    square: graphic$e.Rect,
    circle: graphic$e.Circle,
    diamond: Diamond,
    pin: Pin,
    arrow: Arrow,
    triangle: Triangle
  };
  var symbolShapeMakers = {
    line: function(x, y, w, h, shape) {
      shape.x1 = x;
      shape.y1 = y + h / 2;
      shape.x2 = x + w;
      shape.y2 = y + h / 2;
    },
    rect: function(x, y, w, h, shape) {
      shape.x = x;
      shape.y = y;
      shape.width = w;
      shape.height = h;
    },
    roundRect: function(x, y, w, h, shape) {
      shape.x = x;
      shape.y = y;
      shape.width = w;
      shape.height = h;
      shape.r = Math.min(w, h) / 4;
    },
    square: function(x, y, w, h, shape) {
      var size = Math.min(w, h);
      shape.x = x;
      shape.y = y;
      shape.width = size;
      shape.height = size;
    },
    circle: function(x, y, w, h, shape) {
      shape.cx = x + w / 2;
      shape.cy = y + h / 2;
      shape.r = Math.min(w, h) / 2;
    },
    diamond: function(x, y, w, h, shape) {
      shape.cx = x + w / 2;
      shape.cy = y + h / 2;
      shape.width = w;
      shape.height = h;
    },
    pin: function(x, y, w, h, shape) {
      shape.x = x + w / 2;
      shape.y = y + h / 2;
      shape.width = w;
      shape.height = h;
    },
    arrow: function(x, y, w, h, shape) {
      shape.x = x + w / 2;
      shape.y = y + h / 2;
      shape.width = w;
      shape.height = h;
    },
    triangle: function(x, y, w, h, shape) {
      shape.cx = x + w / 2;
      shape.cy = y + h / 2;
      shape.width = w;
      shape.height = h;
    }
  };
  var symbolBuildProxies = {};
  zrUtil$t.each(symbolCtors, function(Ctor, name) {
    symbolBuildProxies[name] = new Ctor();
  });
  var SymbolClz$3 = graphic$e.extendShape({
    type: "symbol",
    shape: {
      symbolType: "",
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    calculateTextPosition: function(out2, style, rect) {
      var res = calculateTextPosition(out2, style, rect);
      var shape = this.shape;
      if (shape && shape.symbolType === "pin" && style.textPosition === "inside") {
        res.y = rect.y + rect.height * 0.4;
      }
      return res;
    },
    buildPath: function(ctx, shape, inBundle) {
      var symbolType = shape.symbolType;
      if (symbolType !== "none") {
        var proxySymbol = symbolBuildProxies[symbolType];
        if (!proxySymbol) {
          symbolType = "rect";
          proxySymbol = symbolBuildProxies[symbolType];
        }
        symbolShapeMakers[symbolType](shape.x, shape.y, shape.width, shape.height, proxySymbol.shape);
        proxySymbol.buildPath(ctx, proxySymbol.shape, inBundle);
      }
    }
  });
  function symbolPathSetColor(color2, innerColor) {
    if (this.type !== "image") {
      var symbolStyle = this.style;
      var symbolShape = this.shape;
      if (symbolShape && symbolShape.symbolType === "line") {
        symbolStyle.stroke = color2;
      } else if (this.__isEmptyBrush) {
        symbolStyle.stroke = color2;
        symbolStyle.fill = innerColor || "#fff";
      } else {
        symbolStyle.fill && (symbolStyle.fill = color2);
        symbolStyle.stroke && (symbolStyle.stroke = color2);
      }
      this.dirty(false);
    }
  }
  function createSymbol$3(symbolType, x, y, w, h, color2, keepAspect) {
    var isEmpty = symbolType.indexOf("empty") === 0;
    if (isEmpty) {
      symbolType = symbolType.substr(5, 1).toLowerCase() + symbolType.substr(6);
    }
    var symbolPath;
    if (symbolType.indexOf("image://") === 0) {
      symbolPath = graphic$e.makeImage(symbolType.slice(8), new BoundingRect$2(x, y, w, h), keepAspect ? "center" : "cover");
    } else if (symbolType.indexOf("path://") === 0) {
      symbolPath = graphic$e.makePath(symbolType.slice(7), {}, new BoundingRect$2(x, y, w, h), keepAspect ? "center" : "cover");
    } else {
      symbolPath = new SymbolClz$3({
        shape: {
          symbolType,
          x,
          y,
          width: w,
          height: h
        }
      });
    }
    symbolPath.__isEmptyBrush = isEmpty;
    symbolPath.setColor = symbolPathSetColor;
    symbolPath.setColor(color2);
    return symbolPath;
  }
  symbol$1.createSymbol = createSymbol$3;
  var zrUtil$s = util$6;
  var createListFromArray$1 = createListFromArray_1;
  var axisHelper$2 = axisHelper$3;
  var axisModelCommonMixin$1 = axisModelCommonMixin$2;
  var Model$4 = Model_1;
  var _layout$3 = layout$4;
  _layout$3.getLayoutRect;
  helper$3.getLayoutRect = _layout$3.getLayoutRect;
  var _dataStackHelper$3 = dataStackHelper;
  var enableDataStack = _dataStackHelper$3.enableDataStack;
  var isDimensionStacked$2 = _dataStackHelper$3.isDimensionStacked;
  var getStackedDimension$1 = _dataStackHelper$3.getStackedDimension;
  var _completeDimensions = completeDimensions_1;
  helper$3.completeDimensions = _completeDimensions;
  var _createDimensions = createDimensions$1;
  helper$3.createDimensions = _createDimensions;
  var _symbol$3 = symbol$1;
  helper$3.createSymbol = _symbol$3.createSymbol;
  function createList(seriesModel) {
    return createListFromArray$1(seriesModel.getSource(), seriesModel);
  }
  var dataStack = {
    isDimensionStacked: isDimensionStacked$2,
    enableDataStack,
    getStackedDimension: getStackedDimension$1
  };
  function createScale(dataExtent, option) {
    var axisModel = option;
    if (!Model$4.isInstance(option)) {
      axisModel = new Model$4(option);
      zrUtil$s.mixin(axisModel, axisModelCommonMixin$1);
    }
    var scale2 = axisHelper$2.createScaleByModel(axisModel);
    scale2.setExtent(dataExtent[0], dataExtent[1]);
    axisHelper$2.niceScaleExtent(scale2, axisModel);
    return scale2;
  }
  function mixinAxisModelCommonMethods(Model2) {
    zrUtil$s.mixin(Model2, axisModelCommonMixin$1);
  }
  helper$3.createList = createList;
  helper$3.dataStack = dataStack;
  helper$3.createScale = createScale;
  helper$3.mixinAxisModelCommonMethods = mixinAxisModelCommonMethods;
  var polygon = {};
  var windingLine = windingLine_1;
  var EPSILON = 1e-8;
  function isAroundEqual(a, b) {
    return Math.abs(a - b) < EPSILON;
  }
  function contain(points2, x, y) {
    var w = 0;
    var p = points2[0];
    if (!p) {
      return false;
    }
    for (var i2 = 1; i2 < points2.length; i2++) {
      var p2 = points2[i2];
      w += windingLine(p[0], p[1], p2[0], p2[1], x, y);
      p = p2;
    }
    var p0 = points2[0];
    if (!isAroundEqual(p[0], p0[0]) || !isAroundEqual(p[1], p0[1])) {
      w += windingLine(p[0], p[1], p0[0], p0[1], x, y);
    }
    return w !== 0;
  }
  polygon.contain = contain;
  var BoundingRect$1 = BoundingRect_1;
  var bbox = bbox$2;
  var vec2$1 = vector$3;
  var polygonContain = polygon;
  function Region$1(name, geometries, cp) {
    this.name = name;
    this.geometries = geometries;
    if (!cp) {
      var rect = this.getBoundingRect();
      cp = [rect.x + rect.width / 2, rect.y + rect.height / 2];
    } else {
      cp = [cp[0], cp[1]];
    }
    this.center = cp;
  }
  Region$1.prototype = {
    constructor: Region$1,
    properties: null,
    getBoundingRect: function() {
      var rect = this._rect;
      if (rect) {
        return rect;
      }
      var MAX_NUMBER = Number.MAX_VALUE;
      var min3 = [MAX_NUMBER, MAX_NUMBER];
      var max3 = [-MAX_NUMBER, -MAX_NUMBER];
      var min22 = [];
      var max22 = [];
      var geometries = this.geometries;
      for (var i2 = 0; i2 < geometries.length; i2++) {
        if (geometries[i2].type !== "polygon") {
          continue;
        }
        var exterior = geometries[i2].exterior;
        bbox.fromPoints(exterior, min22, max22);
        vec2$1.min(min3, min3, min22);
        vec2$1.max(max3, max3, max22);
      }
      if (i2 === 0) {
        min3[0] = min3[1] = max3[0] = max3[1] = 0;
      }
      return this._rect = new BoundingRect$1(min3[0], min3[1], max3[0] - min3[0], max3[1] - min3[1]);
    },
    contain: function(coord) {
      var rect = this.getBoundingRect();
      var geometries = this.geometries;
      if (!rect.contain(coord[0], coord[1])) {
        return false;
      }
      loopGeo:
        for (var i2 = 0, len2 = geometries.length; i2 < len2; i2++) {
          if (geometries[i2].type !== "polygon") {
            continue;
          }
          var exterior = geometries[i2].exterior;
          var interiors = geometries[i2].interiors;
          if (polygonContain.contain(exterior, coord[0], coord[1])) {
            for (var k = 0; k < (interiors ? interiors.length : 0); k++) {
              if (polygonContain.contain(interiors[k])) {
                continue loopGeo;
              }
            }
            return true;
          }
        }
      return false;
    },
    transformTo: function(x, y, width, height) {
      var rect = this.getBoundingRect();
      var aspect = rect.width / rect.height;
      if (!width) {
        width = aspect * height;
      } else if (!height) {
        height = width / aspect;
      }
      var target = new BoundingRect$1(x, y, width, height);
      var transform = rect.calculateTransform(target);
      var geometries = this.geometries;
      for (var i2 = 0; i2 < geometries.length; i2++) {
        if (geometries[i2].type !== "polygon") {
          continue;
        }
        var exterior = geometries[i2].exterior;
        var interiors = geometries[i2].interiors;
        for (var p = 0; p < exterior.length; p++) {
          vec2$1.applyTransform(exterior[p], exterior[p], transform);
        }
        for (var h = 0; h < (interiors ? interiors.length : 0); h++) {
          for (var p = 0; p < interiors[h].length; p++) {
            vec2$1.applyTransform(interiors[h][p], interiors[h][p], transform);
          }
        }
      }
      rect = this._rect;
      rect.copy(target);
      this.center = [rect.x + rect.width / 2, rect.y + rect.height / 2];
    },
    cloneShallow: function(name) {
      name == null && (name = this.name);
      var newRegion = new Region$1(name, this.geometries, this.center);
      newRegion._rect = this._rect;
      newRegion.transformTo = null;
      return newRegion;
    }
  };
  var _default$l = Region$1;
  var Region_1 = _default$l;
  var zrUtil$r = util$6;
  var Region = Region_1;
  function decode(json) {
    if (!json.UTF8Encoding) {
      return json;
    }
    var encodeScale = json.UTF8Scale;
    if (encodeScale == null) {
      encodeScale = 1024;
    }
    var features = json.features;
    for (var f = 0; f < features.length; f++) {
      var feature = features[f];
      var geometry = feature.geometry;
      var coordinates = geometry.coordinates;
      var encodeOffsets = geometry.encodeOffsets;
      for (var c = 0; c < coordinates.length; c++) {
        var coordinate = coordinates[c];
        if (geometry.type === "Polygon") {
          coordinates[c] = decodePolygon(coordinate, encodeOffsets[c], encodeScale);
        } else if (geometry.type === "MultiPolygon") {
          for (var c2 = 0; c2 < coordinate.length; c2++) {
            var polygon2 = coordinate[c2];
            coordinate[c2] = decodePolygon(polygon2, encodeOffsets[c][c2], encodeScale);
          }
        }
      }
    }
    json.UTF8Encoding = false;
    return json;
  }
  function decodePolygon(coordinate, encodeOffsets, encodeScale) {
    var result = [];
    var prevX = encodeOffsets[0];
    var prevY = encodeOffsets[1];
    for (var i2 = 0; i2 < coordinate.length; i2 += 2) {
      var x = coordinate.charCodeAt(i2) - 64;
      var y = coordinate.charCodeAt(i2 + 1) - 64;
      x = x >> 1 ^ -(x & 1);
      y = y >> 1 ^ -(y & 1);
      x += prevX;
      y += prevY;
      prevX = x;
      prevY = y;
      result.push([x / encodeScale, y / encodeScale]);
    }
    return result;
  }
  function _default$k(geoJson, nameProperty) {
    decode(geoJson);
    return zrUtil$r.map(zrUtil$r.filter(geoJson.features, function(featureObj) {
      return featureObj.geometry && featureObj.properties && featureObj.geometry.coordinates.length > 0;
    }), function(featureObj) {
      var properties = featureObj.properties;
      var geo = featureObj.geometry;
      var coordinates = geo.coordinates;
      var geometries = [];
      if (geo.type === "Polygon") {
        geometries.push({
          type: "polygon",
          exterior: coordinates[0],
          interiors: coordinates.slice(1)
        });
      }
      if (geo.type === "MultiPolygon") {
        zrUtil$r.each(coordinates, function(item) {
          if (item[0]) {
            geometries.push({
              type: "polygon",
              exterior: item[0],
              interiors: item.slice(1)
            });
          }
        });
      }
      var region = new Region(properties[nameProperty || "name"], geometries, properties.cp);
      region.properties = properties;
      return region;
    });
  }
  var parseGeoJson$1 = _default$k;
  var axisTickLabelBuilder = {};
  var zrUtil$q = util$6;
  var textContain$1 = text;
  var _model$5 = model;
  var makeInner$3 = _model$5.makeInner;
  var _axisHelper$2 = axisHelper$3;
  var makeLabelFormatter = _axisHelper$2.makeLabelFormatter;
  var getOptionCategoryInterval = _axisHelper$2.getOptionCategoryInterval;
  var shouldShowAllLabels$1 = _axisHelper$2.shouldShowAllLabels;
  var inner$3 = makeInner$3();
  function createAxisLabels$1(axis) {
    return axis.type === "category" ? makeCategoryLabels(axis) : makeRealNumberLabels(axis);
  }
  function createAxisTicks$1(axis, tickModel) {
    return axis.type === "category" ? makeCategoryTicks(axis, tickModel) : {
      ticks: axis.scale.getTicks()
    };
  }
  function makeCategoryLabels(axis) {
    var labelModel = axis.getLabelModel();
    var result = makeCategoryLabelsActually(axis, labelModel);
    return !labelModel.get("show") || axis.scale.isBlank() ? {
      labels: [],
      labelCategoryInterval: result.labelCategoryInterval
    } : result;
  }
  function makeCategoryLabelsActually(axis, labelModel) {
    var labelsCache = getListCache(axis, "labels");
    var optionLabelInterval = getOptionCategoryInterval(labelModel);
    var result = listCacheGet(labelsCache, optionLabelInterval);
    if (result) {
      return result;
    }
    var labels;
    var numericLabelInterval;
    if (zrUtil$q.isFunction(optionLabelInterval)) {
      labels = makeLabelsByCustomizedCategoryInterval(axis, optionLabelInterval);
    } else {
      numericLabelInterval = optionLabelInterval === "auto" ? makeAutoCategoryInterval(axis) : optionLabelInterval;
      labels = makeLabelsByNumericCategoryInterval(axis, numericLabelInterval);
    }
    return listCacheSet(labelsCache, optionLabelInterval, {
      labels,
      labelCategoryInterval: numericLabelInterval
    });
  }
  function makeCategoryTicks(axis, tickModel) {
    var ticksCache = getListCache(axis, "ticks");
    var optionTickInterval = getOptionCategoryInterval(tickModel);
    var result = listCacheGet(ticksCache, optionTickInterval);
    if (result) {
      return result;
    }
    var ticks;
    var tickCategoryInterval;
    if (!tickModel.get("show") || axis.scale.isBlank()) {
      ticks = [];
    }
    if (zrUtil$q.isFunction(optionTickInterval)) {
      ticks = makeLabelsByCustomizedCategoryInterval(axis, optionTickInterval, true);
    } else if (optionTickInterval === "auto") {
      var labelsResult = makeCategoryLabelsActually(axis, axis.getLabelModel());
      tickCategoryInterval = labelsResult.labelCategoryInterval;
      ticks = zrUtil$q.map(labelsResult.labels, function(labelItem) {
        return labelItem.tickValue;
      });
    } else {
      tickCategoryInterval = optionTickInterval;
      ticks = makeLabelsByNumericCategoryInterval(axis, tickCategoryInterval, true);
    }
    return listCacheSet(ticksCache, optionTickInterval, {
      ticks,
      tickCategoryInterval
    });
  }
  function makeRealNumberLabels(axis) {
    var ticks = axis.scale.getTicks();
    var labelFormatter = makeLabelFormatter(axis);
    return {
      labels: zrUtil$q.map(ticks, function(tickValue, idx) {
        return {
          formattedLabel: labelFormatter(tickValue, idx),
          rawLabel: axis.scale.getLabel(tickValue),
          tickValue
        };
      })
    };
  }
  function getListCache(axis, prop2) {
    return inner$3(axis)[prop2] || (inner$3(axis)[prop2] = []);
  }
  function listCacheGet(cache, key) {
    for (var i2 = 0; i2 < cache.length; i2++) {
      if (cache[i2].key === key) {
        return cache[i2].value;
      }
    }
  }
  function listCacheSet(cache, key, value) {
    cache.push({
      key,
      value
    });
    return value;
  }
  function makeAutoCategoryInterval(axis) {
    var result = inner$3(axis).autoInterval;
    return result != null ? result : inner$3(axis).autoInterval = axis.calculateCategoryInterval();
  }
  function calculateCategoryInterval$1(axis) {
    var params = fetchAutoCategoryIntervalCalculationParams(axis);
    var labelFormatter = makeLabelFormatter(axis);
    var rotation = (params.axisRotate - params.labelRotate) / 180 * Math.PI;
    var ordinalScale = axis.scale;
    var ordinalExtent = ordinalScale.getExtent();
    var tickCount = ordinalScale.count();
    if (ordinalExtent[1] - ordinalExtent[0] < 1) {
      return 0;
    }
    var step = 1;
    if (tickCount > 40) {
      step = Math.max(1, Math.floor(tickCount / 40));
    }
    var tickValue = ordinalExtent[0];
    var unitSpan = axis.dataToCoord(tickValue + 1) - axis.dataToCoord(tickValue);
    var unitW = Math.abs(unitSpan * Math.cos(rotation));
    var unitH = Math.abs(unitSpan * Math.sin(rotation));
    var maxW = 0;
    var maxH = 0;
    for (; tickValue <= ordinalExtent[1]; tickValue += step) {
      var width = 0;
      var height = 0;
      var rect = textContain$1.getBoundingRect(labelFormatter(tickValue), params.font, "center", "top");
      width = rect.width * 1.3;
      height = rect.height * 1.3;
      maxW = Math.max(maxW, width, 7);
      maxH = Math.max(maxH, height, 7);
    }
    var dw = maxW / unitW;
    var dh = maxH / unitH;
    isNaN(dw) && (dw = Infinity);
    isNaN(dh) && (dh = Infinity);
    var interval = Math.max(0, Math.floor(Math.min(dw, dh)));
    var cache = inner$3(axis.model);
    var axisExtent = axis.getExtent();
    var lastAutoInterval = cache.lastAutoInterval;
    var lastTickCount = cache.lastTickCount;
    if (lastAutoInterval != null && lastTickCount != null && Math.abs(lastAutoInterval - interval) <= 1 && Math.abs(lastTickCount - tickCount) <= 1 && lastAutoInterval > interval && cache.axisExtend0 === axisExtent[0] && cache.axisExtend1 === axisExtent[1]) {
      interval = lastAutoInterval;
    } else {
      cache.lastTickCount = tickCount;
      cache.lastAutoInterval = interval;
      cache.axisExtend0 = axisExtent[0];
      cache.axisExtend1 = axisExtent[1];
    }
    return interval;
  }
  function fetchAutoCategoryIntervalCalculationParams(axis) {
    var labelModel = axis.getLabelModel();
    return {
      axisRotate: axis.getRotate ? axis.getRotate() : axis.isHorizontal && !axis.isHorizontal() ? 90 : 0,
      labelRotate: labelModel.get("rotate") || 0,
      font: labelModel.getFont()
    };
  }
  function makeLabelsByNumericCategoryInterval(axis, categoryInterval, onlyTick) {
    var labelFormatter = makeLabelFormatter(axis);
    var ordinalScale = axis.scale;
    var ordinalExtent = ordinalScale.getExtent();
    var labelModel = axis.getLabelModel();
    var result = [];
    var step = Math.max((categoryInterval || 0) + 1, 1);
    var startTick = ordinalExtent[0];
    var tickCount = ordinalScale.count();
    if (startTick !== 0 && step > 1 && tickCount / step > 2) {
      startTick = Math.round(Math.ceil(startTick / step) * step);
    }
    var showAllLabel = shouldShowAllLabels$1(axis);
    var includeMinLabel = labelModel.get("showMinLabel") || showAllLabel;
    var includeMaxLabel = labelModel.get("showMaxLabel") || showAllLabel;
    if (includeMinLabel && startTick !== ordinalExtent[0]) {
      addItem(ordinalExtent[0]);
    }
    var tickValue = startTick;
    for (; tickValue <= ordinalExtent[1]; tickValue += step) {
      addItem(tickValue);
    }
    if (includeMaxLabel && tickValue - step !== ordinalExtent[1]) {
      addItem(ordinalExtent[1]);
    }
    function addItem(tVal) {
      result.push(onlyTick ? tVal : {
        formattedLabel: labelFormatter(tVal),
        rawLabel: ordinalScale.getLabel(tVal),
        tickValue: tVal
      });
    }
    return result;
  }
  function makeLabelsByCustomizedCategoryInterval(axis, categoryInterval, onlyTick) {
    var ordinalScale = axis.scale;
    var labelFormatter = makeLabelFormatter(axis);
    var result = [];
    zrUtil$q.each(ordinalScale.getTicks(), function(tickValue) {
      var rawLabel = ordinalScale.getLabel(tickValue);
      if (categoryInterval(tickValue, rawLabel)) {
        result.push(onlyTick ? tickValue : {
          formattedLabel: labelFormatter(tickValue),
          rawLabel,
          tickValue
        });
      }
    });
    return result;
  }
  axisTickLabelBuilder.createAxisLabels = createAxisLabels$1;
  axisTickLabelBuilder.createAxisTicks = createAxisTicks$1;
  axisTickLabelBuilder.calculateCategoryInterval = calculateCategoryInterval$1;
  var _util$6 = util$6;
  var each$8 = _util$6.each;
  var map$3 = _util$6.map;
  var _number$3 = number;
  var linearMap = _number$3.linearMap;
  var getPixelPrecision = _number$3.getPixelPrecision;
  var round$1 = _number$3.round;
  var _axisTickLabelBuilder = axisTickLabelBuilder;
  var createAxisTicks = _axisTickLabelBuilder.createAxisTicks;
  var createAxisLabels = _axisTickLabelBuilder.createAxisLabels;
  var calculateCategoryInterval = _axisTickLabelBuilder.calculateCategoryInterval;
  var NORMALIZED_EXTENT = [0, 1];
  var Axis$1 = function(dim, scale2, extent) {
    this.dim = dim;
    this.scale = scale2;
    this._extent = extent || [0, 0];
    this.inverse = false;
    this.onBand = false;
  };
  Axis$1.prototype = {
    constructor: Axis$1,
    contain: function(coord) {
      var extent = this._extent;
      var min3 = Math.min(extent[0], extent[1]);
      var max3 = Math.max(extent[0], extent[1]);
      return coord >= min3 && coord <= max3;
    },
    containData: function(data) {
      return this.scale.contain(data);
    },
    getExtent: function() {
      return this._extent.slice();
    },
    getPixelPrecision: function(dataExtent) {
      return getPixelPrecision(dataExtent || this.scale.getExtent(), this._extent);
    },
    setExtent: function(start2, end2) {
      var extent = this._extent;
      extent[0] = start2;
      extent[1] = end2;
    },
    dataToCoord: function(data, clamp2) {
      var extent = this._extent;
      var scale2 = this.scale;
      data = scale2.normalize(data);
      if (this.onBand && scale2.type === "ordinal") {
        extent = extent.slice();
        fixExtentWithBands(extent, scale2.count());
      }
      return linearMap(data, NORMALIZED_EXTENT, extent, clamp2);
    },
    coordToData: function(coord, clamp2) {
      var extent = this._extent;
      var scale2 = this.scale;
      if (this.onBand && scale2.type === "ordinal") {
        extent = extent.slice();
        fixExtentWithBands(extent, scale2.count());
      }
      var t = linearMap(coord, extent, NORMALIZED_EXTENT, clamp2);
      return this.scale.scale(t);
    },
    pointToData: function(point, clamp2) {
    },
    getTicksCoords: function(opt) {
      opt = opt || {};
      var tickModel = opt.tickModel || this.getTickModel();
      var result = createAxisTicks(this, tickModel);
      var ticks = result.ticks;
      var ticksCoords = map$3(ticks, function(tickValue) {
        return {
          coord: this.dataToCoord(tickValue),
          tickValue
        };
      }, this);
      var alignWithLabel = tickModel.get("alignWithLabel");
      fixOnBandTicksCoords(this, ticksCoords, alignWithLabel, opt.clamp);
      return ticksCoords;
    },
    getMinorTicksCoords: function() {
      if (this.scale.type === "ordinal") {
        return [];
      }
      var minorTickModel = this.model.getModel("minorTick");
      var splitNumber = minorTickModel.get("splitNumber");
      if (!(splitNumber > 0 && splitNumber < 100)) {
        splitNumber = 5;
      }
      var minorTicks = this.scale.getMinorTicks(splitNumber);
      var minorTicksCoords = map$3(minorTicks, function(minorTicksGroup) {
        return map$3(minorTicksGroup, function(minorTick) {
          return {
            coord: this.dataToCoord(minorTick),
            tickValue: minorTick
          };
        }, this);
      }, this);
      return minorTicksCoords;
    },
    getViewLabels: function() {
      return createAxisLabels(this).labels;
    },
    getLabelModel: function() {
      return this.model.getModel("axisLabel");
    },
    getTickModel: function() {
      return this.model.getModel("axisTick");
    },
    getBandWidth: function() {
      var axisExtent = this._extent;
      var dataExtent = this.scale.getExtent();
      var len2 = dataExtent[1] - dataExtent[0] + (this.onBand ? 1 : 0);
      len2 === 0 && (len2 = 1);
      var size = Math.abs(axisExtent[1] - axisExtent[0]);
      return Math.abs(size) / len2;
    },
    isHorizontal: null,
    getRotate: null,
    calculateCategoryInterval: function() {
      return calculateCategoryInterval(this);
    }
  };
  function fixExtentWithBands(extent, nTick) {
    var size = extent[1] - extent[0];
    var len2 = nTick;
    var margin = size / len2 / 2;
    extent[0] += margin;
    extent[1] -= margin;
  }
  function fixOnBandTicksCoords(axis, ticksCoords, alignWithLabel, clamp2) {
    var ticksLen = ticksCoords.length;
    if (!axis.onBand || alignWithLabel || !ticksLen) {
      return;
    }
    var axisExtent = axis.getExtent();
    var last;
    var diffSize;
    if (ticksLen === 1) {
      ticksCoords[0].coord = axisExtent[0];
      last = ticksCoords[1] = {
        coord: axisExtent[0]
      };
    } else {
      var crossLen = ticksCoords[ticksLen - 1].tickValue - ticksCoords[0].tickValue;
      var shift = (ticksCoords[ticksLen - 1].coord - ticksCoords[0].coord) / crossLen;
      each$8(ticksCoords, function(ticksItem) {
        ticksItem.coord -= shift / 2;
      });
      var dataExtent = axis.scale.getExtent();
      diffSize = 1 + dataExtent[1] - ticksCoords[ticksLen - 1].tickValue;
      last = {
        coord: ticksCoords[ticksLen - 1].coord + shift * diffSize
      };
      ticksCoords.push(last);
    }
    var inverse = axisExtent[0] > axisExtent[1];
    if (littleThan(ticksCoords[0].coord, axisExtent[0])) {
      clamp2 ? ticksCoords[0].coord = axisExtent[0] : ticksCoords.shift();
    }
    if (clamp2 && littleThan(axisExtent[0], ticksCoords[0].coord)) {
      ticksCoords.unshift({
        coord: axisExtent[0]
      });
    }
    if (littleThan(axisExtent[1], last.coord)) {
      clamp2 ? last.coord = axisExtent[1] : ticksCoords.pop();
    }
    if (clamp2 && littleThan(last.coord, axisExtent[1])) {
      ticksCoords.push({
        coord: axisExtent[1]
      });
    }
    function littleThan(a, b) {
      a = round$1(a);
      b = round$1(b);
      return inverse ? a > b : a < b;
    }
  }
  var _default$j = Axis$1;
  var Axis_1 = _default$j;
  var zrender = zrender$1;
  _export.zrender = zrender;
  var matrix$1 = matrix$6;
  _export.matrix = matrix$1;
  var vector = vector$3;
  _export.vector = vector;
  var zrUtil$p = util$6;
  var colorTool = color$1;
  _export.color = colorTool;
  var graphicUtil$1 = graphic$g;
  var numberUtil$1 = number;
  _export.number = numberUtil$1;
  var formatUtil$5 = format;
  _export.format = formatUtil$5;
  var _throttle = throttle$1;
  _throttle.throttle;
  _export.throttle = _throttle.throttle;
  var ecHelper = helper$3;
  _export.helper = ecHelper;
  var parseGeoJSON = parseGeoJson$1;
  _export.parseGeoJSON = parseGeoJSON;
  var _List = List_1;
  _export.List = _List;
  var _Model = Model_1;
  _export.Model = _Model;
  var _Axis = Axis_1;
  _export.Axis = _Axis;
  var _env = env_1;
  _export.env = _env;
  var parseGeoJson = parseGeoJSON;
  var ecUtil = {};
  zrUtil$p.each(["map", "each", "filter", "indexOf", "inherits", "reduce", "filter", "bind", "curry", "isArray", "isString", "isObject", "isFunction", "extend", "defaults", "clone", "merge"], function(name) {
    ecUtil[name] = zrUtil$p[name];
  });
  var graphic$d = {};
  zrUtil$p.each(["extendShape", "extendPath", "makePath", "makeImage", "mergePath", "resizePath", "createIcon", "setHoverStyle", "setLabelStyle", "setTextStyle", "setText", "getFont", "updateProps", "initProps", "getTransform", "clipPointsByRect", "clipRectByRect", "registerShape", "getShapeClass", "Group", "Image", "Text", "Circle", "Sector", "Ring", "Polygon", "Polyline", "Rect", "Line", "BezierCurve", "Arc", "IncrementalDisplayable", "CompoundPath", "LinearGradient", "RadialGradient", "BoundingRect"], function(name) {
    graphic$d[name] = graphicUtil$1[name];
  });
  _export.parseGeoJson = parseGeoJson;
  _export.util = ecUtil;
  _export.graphic = graphic$d;
  (function(exports) {
    var zrender2 = zrender$1;
    var zrUtil2 = util$6;
    var colorTool2 = color$1;
    var env2 = env_1;
    var timsort2 = timsort$2;
    var Eventful2 = Eventful_1;
    var GlobalModel2 = Global;
    var ExtensionAPI2 = ExtensionAPI_1;
    var CoordinateSystemManager2 = CoordinateSystem$2;
    var OptionManager2 = OptionManager_1;
    var backwardCompat$1 = backwardCompat;
    var dataStack2 = dataStack$1;
    var ComponentModel2 = Component$2;
    var SeriesModel2 = Series;
    var ComponentView2 = Component_1;
    var ChartView2 = Chart_1;
    var graphic2 = graphic$g;
    var modelUtil2 = model;
    var _throttle2 = throttle$1;
    var throttle2 = _throttle2.throttle;
    var seriesColor$1 = seriesColor;
    var aria$1 = aria;
    var loadingDefault = _default_1;
    var Scheduler2 = Scheduler_1;
    var lightTheme = light;
    var darkTheme = dark;
    var mapDataStorage$1 = mapDataStorage;
    var assert2 = zrUtil2.assert;
    var each2 = zrUtil2.each;
    var isFunction2 = zrUtil2.isFunction;
    var isObject2 = zrUtil2.isObject;
    var parseClassType2 = ComponentModel2.parseClassType;
    var version2 = "4.9.0";
    var dependencies = {
      zrender: "4.3.2"
    };
    var TEST_FRAME_REMAIN_TIME = 1;
    var PRIORITY_PROCESSOR_FILTER = 1e3;
    var PRIORITY_PROCESSOR_SERIES_FILTER = 800;
    var PRIORITY_PROCESSOR_DATASTACK = 900;
    var PRIORITY_PROCESSOR_STATISTIC = 5e3;
    var PRIORITY_VISUAL_LAYOUT = 1e3;
    var PRIORITY_VISUAL_PROGRESSIVE_LAYOUT = 1100;
    var PRIORITY_VISUAL_GLOBAL = 2e3;
    var PRIORITY_VISUAL_CHART = 3e3;
    var PRIORITY_VISUAL_POST_CHART_LAYOUT = 3500;
    var PRIORITY_VISUAL_COMPONENT = 4e3;
    var PRIORITY_VISUAL_BRUSH = 5e3;
    var PRIORITY = {
      PROCESSOR: {
        FILTER: PRIORITY_PROCESSOR_FILTER,
        SERIES_FILTER: PRIORITY_PROCESSOR_SERIES_FILTER,
        STATISTIC: PRIORITY_PROCESSOR_STATISTIC
      },
      VISUAL: {
        LAYOUT: PRIORITY_VISUAL_LAYOUT,
        PROGRESSIVE_LAYOUT: PRIORITY_VISUAL_PROGRESSIVE_LAYOUT,
        GLOBAL: PRIORITY_VISUAL_GLOBAL,
        CHART: PRIORITY_VISUAL_CHART,
        POST_CHART_LAYOUT: PRIORITY_VISUAL_POST_CHART_LAYOUT,
        COMPONENT: PRIORITY_VISUAL_COMPONENT,
        BRUSH: PRIORITY_VISUAL_BRUSH
      }
    };
    var IN_MAIN_PROCESS = "__flagInMainProcess";
    var OPTION_UPDATED = "__optionUpdated";
    var ACTION_REG = /^[a-zA-Z0-9_]+$/;
    function createRegisterEventWithLowercaseName(method, ignoreDisposed) {
      return function(eventName, handler, context) {
        if (!ignoreDisposed && this._disposed) {
          disposedWarning(this.id);
          return;
        }
        eventName = eventName && eventName.toLowerCase();
        Eventful2.prototype[method].call(this, eventName, handler, context);
      };
    }
    function MessageCenter() {
      Eventful2.call(this);
    }
    MessageCenter.prototype.on = createRegisterEventWithLowercaseName("on", true);
    MessageCenter.prototype.off = createRegisterEventWithLowercaseName("off", true);
    MessageCenter.prototype.one = createRegisterEventWithLowercaseName("one", true);
    zrUtil2.mixin(MessageCenter, Eventful2);
    function ECharts(dom2, theme2, opts) {
      opts = opts || {};
      if (typeof theme2 === "string") {
        theme2 = themeStorage[theme2];
      }
      this.id;
      this.group;
      this._dom = dom2;
      var defaultRenderer = "canvas";
      var zr = this._zr = zrender2.init(dom2, {
        renderer: opts.renderer || defaultRenderer,
        devicePixelRatio: opts.devicePixelRatio,
        width: opts.width,
        height: opts.height
      });
      this._throttledZrFlush = throttle2(zrUtil2.bind(zr.flush, zr), 17);
      var theme2 = zrUtil2.clone(theme2);
      theme2 && backwardCompat$1(theme2, true);
      this._theme = theme2;
      this._chartsViews = [];
      this._chartsMap = {};
      this._componentsViews = [];
      this._componentsMap = {};
      this._coordSysMgr = new CoordinateSystemManager2();
      var api = this._api = createExtensionAPI(this);
      function prioritySortFunc(a, b) {
        return a.__prio - b.__prio;
      }
      timsort2(visualFuncs, prioritySortFunc);
      timsort2(dataProcessorFuncs, prioritySortFunc);
      this._scheduler = new Scheduler2(this, api, dataProcessorFuncs, visualFuncs);
      Eventful2.call(this, this._ecEventProcessor = new EventProcessor());
      this._messageCenter = new MessageCenter();
      this._initEvents();
      this.resize = zrUtil2.bind(this.resize, this);
      this._pendingActions = [];
      zr.animation.on("frame", this._onframe, this);
      bindRenderedEvent(zr, this);
      zrUtil2.setAsPrimitive(this);
    }
    var echartsProto = ECharts.prototype;
    echartsProto._onframe = function() {
      if (this._disposed) {
        return;
      }
      var scheduler = this._scheduler;
      if (this[OPTION_UPDATED]) {
        var silent = this[OPTION_UPDATED].silent;
        this[IN_MAIN_PROCESS] = true;
        prepare(this);
        updateMethods.update.call(this);
        this[IN_MAIN_PROCESS] = false;
        this[OPTION_UPDATED] = false;
        flushPendingActions.call(this, silent);
        triggerUpdatedEvent.call(this, silent);
      } else if (scheduler.unfinished) {
        var remainTime = TEST_FRAME_REMAIN_TIME;
        var ecModel = this._model;
        var api = this._api;
        scheduler.unfinished = false;
        do {
          var startTime = +new Date();
          scheduler.performSeriesTasks(ecModel);
          scheduler.performDataProcessorTasks(ecModel);
          updateStreamModes(this, ecModel);
          scheduler.performVisualTasks(ecModel);
          renderSeries(this, this._model, api, "remain");
          remainTime -= +new Date() - startTime;
        } while (remainTime > 0 && scheduler.unfinished);
        if (!scheduler.unfinished) {
          this._zr.flush();
        }
      }
    };
    echartsProto.getDom = function() {
      return this._dom;
    };
    echartsProto.getZr = function() {
      return this._zr;
    };
    echartsProto.setOption = function(option, notMerge, lazyUpdate) {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      var silent;
      if (isObject2(notMerge)) {
        lazyUpdate = notMerge.lazyUpdate;
        silent = notMerge.silent;
        notMerge = notMerge.notMerge;
      }
      this[IN_MAIN_PROCESS] = true;
      if (!this._model || notMerge) {
        var optionManager = new OptionManager2(this._api);
        var theme2 = this._theme;
        var ecModel = this._model = new GlobalModel2();
        ecModel.scheduler = this._scheduler;
        ecModel.init(null, null, theme2, optionManager);
      }
      this._model.setOption(option, optionPreprocessorFuncs);
      if (lazyUpdate) {
        this[OPTION_UPDATED] = {
          silent
        };
        this[IN_MAIN_PROCESS] = false;
      } else {
        prepare(this);
        updateMethods.update.call(this);
        this._zr.flush();
        this[OPTION_UPDATED] = false;
        this[IN_MAIN_PROCESS] = false;
        flushPendingActions.call(this, silent);
        triggerUpdatedEvent.call(this, silent);
      }
    };
    echartsProto.setTheme = function() {
      formatAppLog("error", "at node_modules/echarts/lib/echarts.js:428", "ECharts#setTheme() is DEPRECATED in ECharts 3.0");
    };
    echartsProto.getModel = function() {
      return this._model;
    };
    echartsProto.getOption = function() {
      return this._model && this._model.getOption();
    };
    echartsProto.getWidth = function() {
      return this._zr.getWidth();
    };
    echartsProto.getHeight = function() {
      return this._zr.getHeight();
    };
    echartsProto.getDevicePixelRatio = function() {
      return this._zr.painter.dpr || window.devicePixelRatio || 1;
    };
    echartsProto.getRenderedCanvas = function(opts) {
      if (!env2.canvasSupported) {
        return;
      }
      opts = opts || {};
      opts.pixelRatio = opts.pixelRatio || 1;
      opts.backgroundColor = opts.backgroundColor || this._model.get("backgroundColor");
      var zr = this._zr;
      return zr.painter.getRenderedCanvas(opts);
    };
    echartsProto.getSvgDataURL = function() {
      if (!env2.svgSupported) {
        return;
      }
      var zr = this._zr;
      var list = zr.storage.getDisplayList();
      zrUtil2.each(list, function(el) {
        el.stopAnimation(true);
      });
      return zr.painter.toDataURL();
    };
    echartsProto.getDataURL = function(opts) {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      opts = opts || {};
      var excludeComponents = opts.excludeComponents;
      var ecModel = this._model;
      var excludesComponentViews = [];
      var self2 = this;
      each2(excludeComponents, function(componentType) {
        ecModel.eachComponent({
          mainType: componentType
        }, function(component2) {
          var view = self2._componentsMap[component2.__viewId];
          if (!view.group.ignore) {
            excludesComponentViews.push(view);
            view.group.ignore = true;
          }
        });
      });
      var url = this._zr.painter.getType() === "svg" ? this.getSvgDataURL() : this.getRenderedCanvas(opts).toDataURL("image/" + (opts && opts.type || "png"));
      each2(excludesComponentViews, function(view) {
        view.group.ignore = false;
      });
      return url;
    };
    echartsProto.getConnectedDataURL = function(opts) {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      if (!env2.canvasSupported) {
        return;
      }
      var isSvg = opts.type === "svg";
      var groupId = this.group;
      var mathMin2 = Math.min;
      var mathMax2 = Math.max;
      var MAX_NUMBER = Infinity;
      if (connectedGroups[groupId]) {
        var left = MAX_NUMBER;
        var top = MAX_NUMBER;
        var right = -MAX_NUMBER;
        var bottom = -MAX_NUMBER;
        var canvasList = [];
        var dpr2 = opts && opts.pixelRatio || 1;
        zrUtil2.each(instances2, function(chart, id) {
          if (chart.group === groupId) {
            var canvas = isSvg ? chart.getZr().painter.getSvgDom().innerHTML : chart.getRenderedCanvas(zrUtil2.clone(opts));
            var boundingRect = chart.getDom().getBoundingClientRect();
            left = mathMin2(boundingRect.left, left);
            top = mathMin2(boundingRect.top, top);
            right = mathMax2(boundingRect.right, right);
            bottom = mathMax2(boundingRect.bottom, bottom);
            canvasList.push({
              dom: canvas,
              left: boundingRect.left,
              top: boundingRect.top
            });
          }
        });
        left *= dpr2;
        top *= dpr2;
        right *= dpr2;
        bottom *= dpr2;
        var width = right - left;
        var height = bottom - top;
        var targetCanvas = zrUtil2.createCanvas();
        var zr = zrender2.init(targetCanvas, {
          renderer: isSvg ? "svg" : "canvas"
        });
        zr.resize({
          width,
          height
        });
        if (isSvg) {
          var content = "";
          each2(canvasList, function(item) {
            var x = item.left - left;
            var y = item.top - top;
            content += '<g transform="translate(' + x + "," + y + ')">' + item.dom + "</g>";
          });
          zr.painter.getSvgRoot().innerHTML = content;
          if (opts.connectedBackgroundColor) {
            zr.painter.setBackgroundColor(opts.connectedBackgroundColor);
          }
          zr.refreshImmediately();
          return zr.painter.toDataURL();
        } else {
          if (opts.connectedBackgroundColor) {
            zr.add(new graphic2.Rect({
              shape: {
                x: 0,
                y: 0,
                width,
                height
              },
              style: {
                fill: opts.connectedBackgroundColor
              }
            }));
          }
          each2(canvasList, function(item) {
            var img = new graphic2.Image({
              style: {
                x: item.left * dpr2 - left,
                y: item.top * dpr2 - top,
                image: item.dom
              }
            });
            zr.add(img);
          });
          zr.refreshImmediately();
          return targetCanvas.toDataURL("image/" + (opts && opts.type || "png"));
        }
      } else {
        return this.getDataURL(opts);
      }
    };
    echartsProto.convertToPixel = zrUtil2.curry(doConvertPixel, "convertToPixel");
    echartsProto.convertFromPixel = zrUtil2.curry(doConvertPixel, "convertFromPixel");
    function doConvertPixel(methodName, finder, value) {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      var ecModel = this._model;
      var coordSysList = this._coordSysMgr.getCoordinateSystems();
      var result;
      finder = modelUtil2.parseFinder(ecModel, finder);
      for (var i2 = 0; i2 < coordSysList.length; i2++) {
        var coordSys = coordSysList[i2];
        if (coordSys[methodName] && (result = coordSys[methodName](ecModel, finder, value)) != null) {
          return result;
        }
      }
    }
    echartsProto.containPixel = function(finder, value) {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      var ecModel = this._model;
      var result;
      finder = modelUtil2.parseFinder(ecModel, finder);
      zrUtil2.each(finder, function(models, key) {
        key.indexOf("Models") >= 0 && zrUtil2.each(models, function(model2) {
          var coordSys = model2.coordinateSystem;
          if (coordSys && coordSys.containPoint) {
            result |= !!coordSys.containPoint(value);
          } else if (key === "seriesModels") {
            var view = this._chartsMap[model2.__viewId];
            if (view && view.containPoint) {
              result |= view.containPoint(value, model2);
            }
          } else
            ;
        }, this);
      }, this);
      return !!result;
    };
    echartsProto.getVisual = function(finder, visualType) {
      var ecModel = this._model;
      finder = modelUtil2.parseFinder(ecModel, finder, {
        defaultMainType: "series"
      });
      var seriesModel = finder.seriesModel;
      var data = seriesModel.getData();
      var dataIndexInside = finder.hasOwnProperty("dataIndexInside") ? finder.dataIndexInside : finder.hasOwnProperty("dataIndex") ? data.indexOfRawIndex(finder.dataIndex) : null;
      return dataIndexInside != null ? data.getItemVisual(dataIndexInside, visualType) : data.getVisual(visualType);
    };
    echartsProto.getViewOfComponentModel = function(componentModel) {
      return this._componentsMap[componentModel.__viewId];
    };
    echartsProto.getViewOfSeriesModel = function(seriesModel) {
      return this._chartsMap[seriesModel.__viewId];
    };
    var updateMethods = {
      prepareAndUpdate: function(payload) {
        prepare(this);
        updateMethods.update.call(this, payload);
      },
      update: function(payload) {
        var ecModel = this._model;
        var api = this._api;
        var zr = this._zr;
        var coordSysMgr = this._coordSysMgr;
        var scheduler = this._scheduler;
        if (!ecModel) {
          return;
        }
        scheduler.restoreData(ecModel, payload);
        scheduler.performSeriesTasks(ecModel);
        coordSysMgr.create(ecModel, api);
        scheduler.performDataProcessorTasks(ecModel, payload);
        updateStreamModes(this, ecModel);
        coordSysMgr.update(ecModel, api);
        clearColorPalette(ecModel);
        scheduler.performVisualTasks(ecModel, payload);
        render(this, ecModel, api, payload);
        var backgroundColor = ecModel.get("backgroundColor") || "transparent";
        if (!env2.canvasSupported) {
          var colorArr = colorTool2.parse(backgroundColor);
          backgroundColor = colorTool2.stringify(colorArr, "rgb");
          if (colorArr[3] === 0) {
            backgroundColor = "transparent";
          }
        } else {
          zr.setBackgroundColor(backgroundColor);
        }
        performPostUpdateFuncs(ecModel, api);
      },
      updateTransform: function(payload) {
        var ecModel = this._model;
        var ecIns = this;
        var api = this._api;
        if (!ecModel) {
          return;
        }
        var componentDirtyList = [];
        ecModel.eachComponent(function(componentType, componentModel) {
          var componentView = ecIns.getViewOfComponentModel(componentModel);
          if (componentView && componentView.__alive) {
            if (componentView.updateTransform) {
              var result = componentView.updateTransform(componentModel, ecModel, api, payload);
              result && result.update && componentDirtyList.push(componentView);
            } else {
              componentDirtyList.push(componentView);
            }
          }
        });
        var seriesDirtyMap = zrUtil2.createHashMap();
        ecModel.eachSeries(function(seriesModel) {
          var chartView = ecIns._chartsMap[seriesModel.__viewId];
          if (chartView.updateTransform) {
            var result = chartView.updateTransform(seriesModel, ecModel, api, payload);
            result && result.update && seriesDirtyMap.set(seriesModel.uid, 1);
          } else {
            seriesDirtyMap.set(seriesModel.uid, 1);
          }
        });
        clearColorPalette(ecModel);
        this._scheduler.performVisualTasks(ecModel, payload, {
          setDirty: true,
          dirtyMap: seriesDirtyMap
        });
        renderSeries(ecIns, ecModel, api, payload, seriesDirtyMap);
        performPostUpdateFuncs(ecModel, this._api);
      },
      updateView: function(payload) {
        var ecModel = this._model;
        if (!ecModel) {
          return;
        }
        ChartView2.markUpdateMethod(payload, "updateView");
        clearColorPalette(ecModel);
        this._scheduler.performVisualTasks(ecModel, payload, {
          setDirty: true
        });
        render(this, this._model, this._api, payload);
        performPostUpdateFuncs(ecModel, this._api);
      },
      updateVisual: function(payload) {
        updateMethods.update.call(this, payload);
      },
      updateLayout: function(payload) {
        updateMethods.update.call(this, payload);
      }
    };
    function prepare(ecIns) {
      var ecModel = ecIns._model;
      var scheduler = ecIns._scheduler;
      scheduler.restorePipelines(ecModel);
      scheduler.prepareStageTasks();
      prepareView(ecIns, "component", ecModel, scheduler);
      prepareView(ecIns, "chart", ecModel, scheduler);
      scheduler.plan();
    }
    function updateDirectly(ecIns, method, payload, mainType, subType) {
      var ecModel = ecIns._model;
      if (!mainType) {
        each2(ecIns._componentsViews.concat(ecIns._chartsViews), callView);
        return;
      }
      var query = {};
      query[mainType + "Id"] = payload[mainType + "Id"];
      query[mainType + "Index"] = payload[mainType + "Index"];
      query[mainType + "Name"] = payload[mainType + "Name"];
      var condition = {
        mainType,
        query
      };
      subType && (condition.subType = subType);
      var excludeSeriesId = payload.excludeSeriesId;
      if (excludeSeriesId != null) {
        excludeSeriesId = zrUtil2.createHashMap(modelUtil2.normalizeToArray(excludeSeriesId));
      }
      ecModel && ecModel.eachComponent(condition, function(model2) {
        if (!excludeSeriesId || excludeSeriesId.get(model2.id) == null) {
          callView(ecIns[mainType === "series" ? "_chartsMap" : "_componentsMap"][model2.__viewId]);
        }
      }, ecIns);
      function callView(view) {
        view && view.__alive && view[method] && view[method](view.__model, ecModel, ecIns._api, payload);
      }
    }
    echartsProto.resize = function(opts) {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      this._zr.resize(opts);
      var ecModel = this._model;
      this._loadingFX && this._loadingFX.resize();
      if (!ecModel) {
        return;
      }
      var optionChanged = ecModel.resetOption("media");
      var silent = opts && opts.silent;
      this[IN_MAIN_PROCESS] = true;
      optionChanged && prepare(this);
      updateMethods.update.call(this);
      this[IN_MAIN_PROCESS] = false;
      flushPendingActions.call(this, silent);
      triggerUpdatedEvent.call(this, silent);
    };
    function updateStreamModes(ecIns, ecModel) {
      var chartsMap = ecIns._chartsMap;
      var scheduler = ecIns._scheduler;
      ecModel.eachSeries(function(seriesModel) {
        scheduler.updateStreamModes(seriesModel, chartsMap[seriesModel.__viewId]);
      });
    }
    echartsProto.showLoading = function(name, cfg) {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      if (isObject2(name)) {
        cfg = name;
        name = "";
      }
      name = name || "default";
      this.hideLoading();
      if (!loadingEffects[name]) {
        return;
      }
      var el = loadingEffects[name](this._api, cfg);
      var zr = this._zr;
      this._loadingFX = el;
      zr.add(el);
    };
    echartsProto.hideLoading = function() {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      this._loadingFX && this._zr.remove(this._loadingFX);
      this._loadingFX = null;
    };
    echartsProto.makeActionFromEvent = function(eventObj) {
      var payload = zrUtil2.extend({}, eventObj);
      payload.type = eventActionMap[eventObj.type];
      return payload;
    };
    echartsProto.dispatchAction = function(payload, opt) {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      if (!isObject2(opt)) {
        opt = {
          silent: !!opt
        };
      }
      if (!actions[payload.type]) {
        return;
      }
      if (!this._model) {
        return;
      }
      if (this[IN_MAIN_PROCESS]) {
        this._pendingActions.push(payload);
        return;
      }
      doDispatchAction.call(this, payload, opt.silent);
      if (opt.flush) {
        this._zr.flush(true);
      } else if (opt.flush !== false && env2.browser.weChat) {
        this._throttledZrFlush();
      }
      flushPendingActions.call(this, opt.silent);
      triggerUpdatedEvent.call(this, opt.silent);
    };
    function doDispatchAction(payload, silent) {
      var payloadType = payload.type;
      var escapeConnect = payload.escapeConnect;
      var actionWrap = actions[payloadType];
      var actionInfo = actionWrap.actionInfo;
      var cptType = (actionInfo.update || "update").split(":");
      var updateMethod = cptType.pop();
      cptType = cptType[0] != null && parseClassType2(cptType[0]);
      this[IN_MAIN_PROCESS] = true;
      var payloads = [payload];
      var batched = false;
      if (payload.batch) {
        batched = true;
        payloads = zrUtil2.map(payload.batch, function(item) {
          item = zrUtil2.defaults(zrUtil2.extend({}, item), payload);
          item.batch = null;
          return item;
        });
      }
      var eventObjBatch = [];
      var eventObj;
      var isHighDown = payloadType === "highlight" || payloadType === "downplay";
      each2(payloads, function(batchItem) {
        eventObj = actionWrap.action(batchItem, this._model, this._api);
        eventObj = eventObj || zrUtil2.extend({}, batchItem);
        eventObj.type = actionInfo.event || eventObj.type;
        eventObjBatch.push(eventObj);
        if (isHighDown) {
          updateDirectly(this, updateMethod, batchItem, "series");
        } else if (cptType) {
          updateDirectly(this, updateMethod, batchItem, cptType.main, cptType.sub);
        }
      }, this);
      if (updateMethod !== "none" && !isHighDown && !cptType) {
        if (this[OPTION_UPDATED]) {
          prepare(this);
          updateMethods.update.call(this, payload);
          this[OPTION_UPDATED] = false;
        } else {
          updateMethods[updateMethod].call(this, payload);
        }
      }
      if (batched) {
        eventObj = {
          type: actionInfo.event || payloadType,
          escapeConnect,
          batch: eventObjBatch
        };
      } else {
        eventObj = eventObjBatch[0];
      }
      this[IN_MAIN_PROCESS] = false;
      !silent && this._messageCenter.trigger(eventObj.type, eventObj);
    }
    function flushPendingActions(silent) {
      var pendingActions = this._pendingActions;
      while (pendingActions.length) {
        var payload = pendingActions.shift();
        doDispatchAction.call(this, payload, silent);
      }
    }
    function triggerUpdatedEvent(silent) {
      !silent && this.trigger("updated");
    }
    function bindRenderedEvent(zr, ecIns) {
      zr.on("rendered", function() {
        ecIns.trigger("rendered");
        if (zr.animation.isFinished() && !ecIns[OPTION_UPDATED] && !ecIns._scheduler.unfinished && !ecIns._pendingActions.length) {
          ecIns.trigger("finished");
        }
      });
    }
    echartsProto.appendData = function(params) {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      var seriesIndex = params.seriesIndex;
      var ecModel = this.getModel();
      var seriesModel = ecModel.getSeriesByIndex(seriesIndex);
      seriesModel.appendData(params);
      this._scheduler.unfinished = true;
    };
    echartsProto.on = createRegisterEventWithLowercaseName("on", false);
    echartsProto.off = createRegisterEventWithLowercaseName("off", false);
    echartsProto.one = createRegisterEventWithLowercaseName("one", false);
    function prepareView(ecIns, type, ecModel, scheduler) {
      var isComponent = type === "component";
      var viewList = isComponent ? ecIns._componentsViews : ecIns._chartsViews;
      var viewMap = isComponent ? ecIns._componentsMap : ecIns._chartsMap;
      var zr = ecIns._zr;
      var api = ecIns._api;
      for (var i2 = 0; i2 < viewList.length; i2++) {
        viewList[i2].__alive = false;
      }
      isComponent ? ecModel.eachComponent(function(componentType, model2) {
        componentType !== "series" && doPrepare(model2);
      }) : ecModel.eachSeries(doPrepare);
      function doPrepare(model2) {
        var viewId = "_ec_" + model2.id + "_" + model2.type;
        var view2 = viewMap[viewId];
        if (!view2) {
          var classType = parseClassType2(model2.type);
          var Clazz = isComponent ? ComponentView2.getClass(classType.main, classType.sub) : ChartView2.getClass(classType.sub);
          view2 = new Clazz();
          view2.init(ecModel, api);
          viewMap[viewId] = view2;
          viewList.push(view2);
          zr.add(view2.group);
        }
        model2.__viewId = view2.__id = viewId;
        view2.__alive = true;
        view2.__model = model2;
        view2.group.__ecComponentInfo = {
          mainType: model2.mainType,
          index: model2.componentIndex
        };
        !isComponent && scheduler.prepareView(view2, model2, ecModel, api);
      }
      for (var i2 = 0; i2 < viewList.length; ) {
        var view = viewList[i2];
        if (!view.__alive) {
          !isComponent && view.renderTask.dispose();
          zr.remove(view.group);
          view.dispose(ecModel, api);
          viewList.splice(i2, 1);
          delete viewMap[view.__id];
          view.__id = view.group.__ecComponentInfo = null;
        } else {
          i2++;
        }
      }
    }
    function clearColorPalette(ecModel) {
      ecModel.clearColorPalette();
      ecModel.eachSeries(function(seriesModel) {
        seriesModel.clearColorPalette();
      });
    }
    function render(ecIns, ecModel, api, payload) {
      renderComponents(ecIns, ecModel, api, payload);
      each2(ecIns._chartsViews, function(chart) {
        chart.__alive = false;
      });
      renderSeries(ecIns, ecModel, api, payload);
      each2(ecIns._chartsViews, function(chart) {
        if (!chart.__alive) {
          chart.remove(ecModel, api);
        }
      });
    }
    function renderComponents(ecIns, ecModel, api, payload, dirtyList) {
      each2(dirtyList || ecIns._componentsViews, function(componentView) {
        var componentModel = componentView.__model;
        componentView.render(componentModel, ecModel, api, payload);
        updateZ(componentModel, componentView);
      });
    }
    function renderSeries(ecIns, ecModel, api, payload, dirtyMap) {
      var scheduler = ecIns._scheduler;
      var unfinished;
      ecModel.eachSeries(function(seriesModel) {
        var chartView = ecIns._chartsMap[seriesModel.__viewId];
        chartView.__alive = true;
        var renderTask = chartView.renderTask;
        scheduler.updatePayload(renderTask, payload);
        if (dirtyMap && dirtyMap.get(seriesModel.uid)) {
          renderTask.dirty();
        }
        unfinished |= renderTask.perform(scheduler.getPerformArgs(renderTask));
        chartView.group.silent = !!seriesModel.get("silent");
        updateZ(seriesModel, chartView);
        updateBlend(seriesModel, chartView);
      });
      scheduler.unfinished |= unfinished;
      updateHoverLayerStatus(ecIns, ecModel);
      aria$1(ecIns._zr.dom, ecModel);
    }
    function performPostUpdateFuncs(ecModel, api) {
      each2(postUpdateFuncs, function(func) {
        func(ecModel, api);
      });
    }
    var MOUSE_EVENT_NAMES = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
    echartsProto._initEvents = function() {
      each2(MOUSE_EVENT_NAMES, function(eveName) {
        var handler = function(e) {
          var ecModel = this.getModel();
          var el = e.target;
          var params;
          var isGlobalOut = eveName === "globalout";
          if (isGlobalOut) {
            params = {};
          } else if (el && el.dataIndex != null) {
            var dataModel = el.dataModel || ecModel.getSeriesByIndex(el.seriesIndex);
            params = dataModel && dataModel.getDataParams(el.dataIndex, el.dataType, el) || {};
          } else if (el && el.eventData) {
            params = zrUtil2.extend({}, el.eventData);
          }
          if (params) {
            var componentType = params.componentType;
            var componentIndex = params.componentIndex;
            if (componentType === "markLine" || componentType === "markPoint" || componentType === "markArea") {
              componentType = "series";
              componentIndex = params.seriesIndex;
            }
            var model2 = componentType && componentIndex != null && ecModel.getComponent(componentType, componentIndex);
            var view = model2 && this[model2.mainType === "series" ? "_chartsMap" : "_componentsMap"][model2.__viewId];
            params.event = e;
            params.type = eveName;
            this._ecEventProcessor.eventInfo = {
              targetEl: el,
              packedEvent: params,
              model: model2,
              view
            };
            this.trigger(eveName, params);
          }
        };
        handler.zrEventfulCallAtLast = true;
        this._zr.on(eveName, handler, this);
      }, this);
      each2(eventActionMap, function(actionType, eventType) {
        this._messageCenter.on(eventType, function(event2) {
          this.trigger(eventType, event2);
        }, this);
      }, this);
    };
    echartsProto.isDisposed = function() {
      return this._disposed;
    };
    echartsProto.clear = function() {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      this.setOption({
        series: []
      }, true);
    };
    echartsProto.dispose = function() {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      this._disposed = true;
      modelUtil2.setAttribute(this.getDom(), DOM_ATTRIBUTE_KEY, "");
      var api = this._api;
      var ecModel = this._model;
      each2(this._componentsViews, function(component2) {
        component2.dispose(ecModel, api);
      });
      each2(this._chartsViews, function(chart) {
        chart.dispose(ecModel, api);
      });
      this._zr.dispose();
      delete instances2[this.id];
    };
    zrUtil2.mixin(ECharts, Eventful2);
    function disposedWarning(id) {
    }
    function updateHoverLayerStatus(ecIns, ecModel) {
      var zr = ecIns._zr;
      var storage2 = zr.storage;
      var elCount = 0;
      storage2.traverse(function(el) {
        elCount++;
      });
      if (elCount > ecModel.get("hoverLayerThreshold") && !env2.node) {
        ecModel.eachSeries(function(seriesModel) {
          if (seriesModel.preventUsingHoverLayer) {
            return;
          }
          var chartView = ecIns._chartsMap[seriesModel.__viewId];
          if (chartView.__alive) {
            chartView.group.traverse(function(el) {
              el.useHoverLayer = true;
            });
          }
        });
      }
    }
    function updateBlend(seriesModel, chartView) {
      var blendMode = seriesModel.get("blendMode") || null;
      chartView.group.traverse(function(el) {
        if (!el.isGroup) {
          if (el.style.blend !== blendMode) {
            el.setStyle("blend", blendMode);
          }
        }
        if (el.eachPendingDisplayable) {
          el.eachPendingDisplayable(function(displayable) {
            displayable.setStyle("blend", blendMode);
          });
        }
      });
    }
    function updateZ(model2, view) {
      var z = model2.get("z");
      var zlevel = model2.get("zlevel");
      view.group.traverse(function(el) {
        if (el.type !== "group") {
          z != null && (el.z = z);
          zlevel != null && (el.zlevel = zlevel);
        }
      });
    }
    function createExtensionAPI(ecInstance) {
      var coordSysMgr = ecInstance._coordSysMgr;
      return zrUtil2.extend(new ExtensionAPI2(ecInstance), {
        getCoordinateSystems: zrUtil2.bind(coordSysMgr.getCoordinateSystems, coordSysMgr),
        getComponentByElement: function(el) {
          while (el) {
            var modelInfo = el.__ecComponentInfo;
            if (modelInfo != null) {
              return ecInstance._model.getComponent(modelInfo.mainType, modelInfo.index);
            }
            el = el.parent;
          }
        }
      });
    }
    function EventProcessor() {
      this.eventInfo;
    }
    EventProcessor.prototype = {
      constructor: EventProcessor,
      normalizeQuery: function(query) {
        var cptQuery = {};
        var dataQuery = {};
        var otherQuery = {};
        if (zrUtil2.isString(query)) {
          var condCptType = parseClassType2(query);
          cptQuery.mainType = condCptType.main || null;
          cptQuery.subType = condCptType.sub || null;
        } else {
          var suffixes = ["Index", "Name", "Id"];
          var dataKeys = {
            name: 1,
            dataIndex: 1,
            dataType: 1
          };
          zrUtil2.each(query, function(val, key) {
            var reserved = false;
            for (var i2 = 0; i2 < suffixes.length; i2++) {
              var propSuffix = suffixes[i2];
              var suffixPos = key.lastIndexOf(propSuffix);
              if (suffixPos > 0 && suffixPos === key.length - propSuffix.length) {
                var mainType = key.slice(0, suffixPos);
                if (mainType !== "data") {
                  cptQuery.mainType = mainType;
                  cptQuery[propSuffix.toLowerCase()] = val;
                  reserved = true;
                }
              }
            }
            if (dataKeys.hasOwnProperty(key)) {
              dataQuery[key] = val;
              reserved = true;
            }
            if (!reserved) {
              otherQuery[key] = val;
            }
          });
        }
        return {
          cptQuery,
          dataQuery,
          otherQuery
        };
      },
      filter: function(eventType, query, args) {
        var eventInfo = this.eventInfo;
        if (!eventInfo) {
          return true;
        }
        var targetEl = eventInfo.targetEl;
        var packedEvent = eventInfo.packedEvent;
        var model2 = eventInfo.model;
        var view = eventInfo.view;
        if (!model2 || !view) {
          return true;
        }
        var cptQuery = query.cptQuery;
        var dataQuery = query.dataQuery;
        return check(cptQuery, model2, "mainType") && check(cptQuery, model2, "subType") && check(cptQuery, model2, "index", "componentIndex") && check(cptQuery, model2, "name") && check(cptQuery, model2, "id") && check(dataQuery, packedEvent, "name") && check(dataQuery, packedEvent, "dataIndex") && check(dataQuery, packedEvent, "dataType") && (!view.filterForExposedEvent || view.filterForExposedEvent(eventType, query.otherQuery, targetEl, packedEvent));
        function check(query2, host, prop2, propOnHost) {
          return query2[prop2] == null || host[propOnHost || prop2] === query2[prop2];
        }
      },
      afterTrigger: function() {
        this.eventInfo = null;
      }
    };
    var actions = {};
    var eventActionMap = {};
    var dataProcessorFuncs = [];
    var optionPreprocessorFuncs = [];
    var postUpdateFuncs = [];
    var visualFuncs = [];
    var themeStorage = {};
    var loadingEffects = {};
    var instances2 = {};
    var connectedGroups = {};
    var idBase = new Date() - 0;
    var groupIdBase = new Date() - 0;
    var DOM_ATTRIBUTE_KEY = "_echarts_instance_";
    function enableConnect(chart) {
      var STATUS_PENDING = 0;
      var STATUS_UPDATING = 1;
      var STATUS_UPDATED = 2;
      var STATUS_KEY = "__connectUpdateStatus";
      function updateConnectedChartsStatus(charts, status) {
        for (var i2 = 0; i2 < charts.length; i2++) {
          var otherChart = charts[i2];
          otherChart[STATUS_KEY] = status;
        }
      }
      each2(eventActionMap, function(actionType, eventType) {
        chart._messageCenter.on(eventType, function(event2) {
          if (connectedGroups[chart.group] && chart[STATUS_KEY] !== STATUS_PENDING) {
            if (event2 && event2.escapeConnect) {
              return;
            }
            var action = chart.makeActionFromEvent(event2);
            var otherCharts = [];
            each2(instances2, function(otherChart) {
              if (otherChart !== chart && otherChart.group === chart.group) {
                otherCharts.push(otherChart);
              }
            });
            updateConnectedChartsStatus(otherCharts, STATUS_PENDING);
            each2(otherCharts, function(otherChart) {
              if (otherChart[STATUS_KEY] !== STATUS_UPDATING) {
                otherChart.dispatchAction(action);
              }
            });
            updateConnectedChartsStatus(otherCharts, STATUS_UPDATED);
          }
        });
      });
    }
    function init2(dom2, theme2, opts) {
      var existInstance = getInstanceByDom(dom2);
      if (existInstance) {
        return existInstance;
      }
      var chart = new ECharts(dom2, theme2, opts);
      chart.id = "ec_" + idBase++;
      instances2[chart.id] = chart;
      modelUtil2.setAttribute(dom2, DOM_ATTRIBUTE_KEY, chart.id);
      enableConnect(chart);
      return chart;
    }
    function connect(groupId) {
      if (zrUtil2.isArray(groupId)) {
        var charts = groupId;
        groupId = null;
        each2(charts, function(chart) {
          if (chart.group != null) {
            groupId = chart.group;
          }
        });
        groupId = groupId || "g_" + groupIdBase++;
        each2(charts, function(chart) {
          chart.group = groupId;
        });
      }
      connectedGroups[groupId] = true;
      return groupId;
    }
    function disConnect(groupId) {
      connectedGroups[groupId] = false;
    }
    var disconnect = disConnect;
    function dispose2(chart) {
      if (typeof chart === "string") {
        chart = instances2[chart];
      } else if (!(chart instanceof ECharts)) {
        chart = getInstanceByDom(chart);
      }
      if (chart instanceof ECharts && !chart.isDisposed()) {
        chart.dispose();
      }
    }
    function getInstanceByDom(dom2) {
      return instances2[modelUtil2.getAttribute(dom2, DOM_ATTRIBUTE_KEY)];
    }
    function getInstanceById(key) {
      return instances2[key];
    }
    function registerTheme(name, theme2) {
      themeStorage[name] = theme2;
    }
    function registerPreprocessor(preprocessorFunc) {
      optionPreprocessorFuncs.push(preprocessorFunc);
    }
    function registerProcessor(priority, processor) {
      normalizeRegister(dataProcessorFuncs, priority, processor, PRIORITY_PROCESSOR_FILTER);
    }
    function registerPostUpdate(postUpdateFunc) {
      postUpdateFuncs.push(postUpdateFunc);
    }
    function registerAction(actionInfo, eventName, action) {
      if (typeof eventName === "function") {
        action = eventName;
        eventName = "";
      }
      var actionType = isObject2(actionInfo) ? actionInfo.type : [actionInfo, actionInfo = {
        event: eventName
      }][0];
      actionInfo.event = (actionInfo.event || actionType).toLowerCase();
      eventName = actionInfo.event;
      assert2(ACTION_REG.test(actionType) && ACTION_REG.test(eventName));
      if (!actions[actionType]) {
        actions[actionType] = {
          action,
          actionInfo
        };
      }
      eventActionMap[eventName] = actionType;
    }
    function registerCoordinateSystem(type, CoordinateSystem2) {
      CoordinateSystemManager2.register(type, CoordinateSystem2);
    }
    function getCoordinateSystemDimensions(type) {
      var coordSysCreator = CoordinateSystemManager2.get(type);
      if (coordSysCreator) {
        return coordSysCreator.getDimensionsInfo ? coordSysCreator.getDimensionsInfo() : coordSysCreator.dimensions.slice();
      }
    }
    function registerLayout(priority, layoutTask) {
      normalizeRegister(visualFuncs, priority, layoutTask, PRIORITY_VISUAL_LAYOUT, "layout");
    }
    function registerVisual(priority, visualTask) {
      normalizeRegister(visualFuncs, priority, visualTask, PRIORITY_VISUAL_CHART, "visual");
    }
    function normalizeRegister(targetList, priority, fn, defaultPriority, visualType) {
      if (isFunction2(priority) || isObject2(priority)) {
        fn = priority;
        priority = defaultPriority;
      }
      var stageHandler = Scheduler2.wrapStageHandler(fn, visualType);
      stageHandler.__prio = priority;
      stageHandler.__raw = fn;
      targetList.push(stageHandler);
      return stageHandler;
    }
    function registerLoading(name, loadingFx) {
      loadingEffects[name] = loadingFx;
    }
    function extendComponentModel(opts) {
      return ComponentModel2.extend(opts);
    }
    function extendComponentView(opts) {
      return ComponentView2.extend(opts);
    }
    function extendSeriesModel(opts) {
      return SeriesModel2.extend(opts);
    }
    function extendChartView(opts) {
      return ChartView2.extend(opts);
    }
    function setCanvasCreator(creator) {
      zrUtil2.$override("createCanvas", creator);
    }
    function registerMap(mapName, geoJson, specialAreas) {
      mapDataStorage$1.registerMap(mapName, geoJson, specialAreas);
    }
    function getMap(mapName) {
      var records = mapDataStorage$1.retrieveMap(mapName);
      return records && records[0] && {
        geoJson: records[0].geoJSON,
        specialAreas: records[0].specialAreas
      };
    }
    registerVisual(PRIORITY_VISUAL_GLOBAL, seriesColor$1);
    registerPreprocessor(backwardCompat$1);
    registerProcessor(PRIORITY_PROCESSOR_DATASTACK, dataStack2);
    registerLoading("default", loadingDefault);
    registerAction({
      type: "highlight",
      event: "highlight",
      update: "highlight"
    }, zrUtil2.noop);
    registerAction({
      type: "downplay",
      event: "downplay",
      update: "downplay"
    }, zrUtil2.noop);
    registerTheme("light", lightTheme);
    registerTheme("dark", darkTheme);
    var dataTool = {};
    exports.version = version2;
    exports.dependencies = dependencies;
    exports.PRIORITY = PRIORITY;
    exports.init = init2;
    exports.connect = connect;
    exports.disConnect = disConnect;
    exports.disconnect = disconnect;
    exports.dispose = dispose2;
    exports.getInstanceByDom = getInstanceByDom;
    exports.getInstanceById = getInstanceById;
    exports.registerTheme = registerTheme;
    exports.registerPreprocessor = registerPreprocessor;
    exports.registerProcessor = registerProcessor;
    exports.registerPostUpdate = registerPostUpdate;
    exports.registerAction = registerAction;
    exports.registerCoordinateSystem = registerCoordinateSystem;
    exports.getCoordinateSystemDimensions = getCoordinateSystemDimensions;
    exports.registerLayout = registerLayout;
    exports.registerVisual = registerVisual;
    exports.registerLoading = registerLoading;
    exports.extendComponentModel = extendComponentModel;
    exports.extendComponentView = extendComponentView;
    exports.extendSeriesModel = extendSeriesModel;
    exports.extendChartView = extendChartView;
    exports.setCanvasCreator = setCanvasCreator;
    exports.registerMap = registerMap;
    exports.getMap = getMap;
    exports.dataTool = dataTool;
    var ___ec_export = _export;
    (function() {
      for (var key in ___ec_export) {
        if (___ec_export.hasOwnProperty(key)) {
          exports[key] = ___ec_export[key];
        }
      }
    })();
  })(echarts$d);
  var createListFromArray = createListFromArray_1;
  var SeriesModel = Series;
  SeriesModel.extend({
    type: "series.line",
    dependencies: ["grid", "polar"],
    getInitialData: function(option, ecModel) {
      return createListFromArray(this.getSource(), this, {
        useEncodeDefaulter: true
      });
    },
    defaultOption: {
      zlevel: 0,
      z: 2,
      coordinateSystem: "cartesian2d",
      legendHoverLink: true,
      hoverAnimation: true,
      clip: true,
      label: {
        position: "top"
      },
      lineStyle: {
        width: 2,
        type: "solid"
      },
      step: false,
      smooth: false,
      smoothMonotone: null,
      symbol: "emptyCircle",
      symbolSize: 4,
      symbolRotate: null,
      showSymbol: true,
      showAllSymbol: "auto",
      connectNulls: false,
      sampling: "none",
      animationEasing: "linear",
      progressive: 0,
      hoverLayerThreshold: Infinity
    }
  });
  var labelHelper = {};
  var _dataProvider = dataProvider;
  var retrieveRawValue = _dataProvider.retrieveRawValue;
  function getDefaultLabel$1(data, dataIndex) {
    var labelDims = data.mapDimension("defaultedLabel", true);
    var len2 = labelDims.length;
    if (len2 === 1) {
      return retrieveRawValue(data, dataIndex, labelDims[0]);
    } else if (len2) {
      var vals = [];
      for (var i2 = 0; i2 < labelDims.length; i2++) {
        var val = retrieveRawValue(data, dataIndex, labelDims[i2]);
        vals.push(val);
      }
      return vals.join(" ");
    }
  }
  labelHelper.getDefaultLabel = getDefaultLabel$1;
  var zrUtil$o = util$6;
  var _symbol$2 = symbol$1;
  var createSymbol$2 = _symbol$2.createSymbol;
  var graphic$c = graphic$g;
  var _number$2 = number;
  var parsePercent$1 = _number$2.parsePercent;
  var _labelHelper = labelHelper;
  var getDefaultLabel = _labelHelper.getDefaultLabel;
  function SymbolClz$2(data, idx, seriesScope) {
    graphic$c.Group.call(this);
    this.updateData(data, idx, seriesScope);
  }
  var symbolProto = SymbolClz$2.prototype;
  var getSymbolSize = SymbolClz$2.getSymbolSize = function(data, idx) {
    var symbolSize = data.getItemVisual(idx, "symbolSize");
    return symbolSize instanceof Array ? symbolSize.slice() : [+symbolSize, +symbolSize];
  };
  function getScale(symbolSize) {
    return [symbolSize[0] / 2, symbolSize[1] / 2];
  }
  function driftSymbol(dx, dy) {
    this.parent.drift(dx, dy);
  }
  symbolProto._createSymbol = function(symbolType, data, idx, symbolSize, keepAspect) {
    this.removeAll();
    var color2 = data.getItemVisual(idx, "color");
    var symbolPath = createSymbol$2(symbolType, -1, -1, 2, 2, color2, keepAspect);
    symbolPath.attr({
      z2: 100,
      culling: true,
      scale: getScale(symbolSize)
    });
    symbolPath.drift = driftSymbol;
    this._symbolType = symbolType;
    this.add(symbolPath);
  };
  symbolProto.stopSymbolAnimation = function(toLastFrame) {
    this.childAt(0).stopAnimation(toLastFrame);
  };
  symbolProto.getSymbolPath = function() {
    return this.childAt(0);
  };
  symbolProto.getScale = function() {
    return this.childAt(0).scale;
  };
  symbolProto.highlight = function() {
    this.childAt(0).trigger("emphasis");
  };
  symbolProto.downplay = function() {
    this.childAt(0).trigger("normal");
  };
  symbolProto.setZ = function(zlevel, z) {
    var symbolPath = this.childAt(0);
    symbolPath.zlevel = zlevel;
    symbolPath.z = z;
  };
  symbolProto.setDraggable = function(draggable) {
    var symbolPath = this.childAt(0);
    symbolPath.draggable = draggable;
    symbolPath.cursor = draggable ? "move" : symbolPath.cursor;
  };
  symbolProto.updateData = function(data, idx, seriesScope) {
    this.silent = false;
    var symbolType = data.getItemVisual(idx, "symbol") || "circle";
    var seriesModel = data.hostModel;
    var symbolSize = getSymbolSize(data, idx);
    var isInit = symbolType !== this._symbolType;
    if (isInit) {
      var keepAspect = data.getItemVisual(idx, "symbolKeepAspect");
      this._createSymbol(symbolType, data, idx, symbolSize, keepAspect);
    } else {
      var symbolPath = this.childAt(0);
      symbolPath.silent = false;
      graphic$c.updateProps(symbolPath, {
        scale: getScale(symbolSize)
      }, seriesModel, idx);
    }
    this._updateCommon(data, idx, symbolSize, seriesScope);
    if (isInit) {
      var symbolPath = this.childAt(0);
      var fadeIn = seriesScope && seriesScope.fadeIn;
      var target = {
        scale: symbolPath.scale.slice()
      };
      fadeIn && (target.style = {
        opacity: symbolPath.style.opacity
      });
      symbolPath.scale = [0, 0];
      fadeIn && (symbolPath.style.opacity = 0);
      graphic$c.initProps(symbolPath, target, seriesModel, idx);
    }
    this._seriesModel = seriesModel;
  };
  var normalStyleAccessPath = ["itemStyle"];
  var emphasisStyleAccessPath = ["emphasis", "itemStyle"];
  var normalLabelAccessPath = ["label"];
  var emphasisLabelAccessPath = ["emphasis", "label"];
  symbolProto._updateCommon = function(data, idx, symbolSize, seriesScope) {
    var symbolPath = this.childAt(0);
    var seriesModel = data.hostModel;
    var color2 = data.getItemVisual(idx, "color");
    if (symbolPath.type !== "image") {
      symbolPath.useStyle({
        strokeNoScale: true
      });
    } else {
      symbolPath.setStyle({
        opacity: 1,
        shadowBlur: null,
        shadowOffsetX: null,
        shadowOffsetY: null,
        shadowColor: null
      });
    }
    var itemStyle2 = seriesScope && seriesScope.itemStyle;
    var hoverItemStyle = seriesScope && seriesScope.hoverItemStyle;
    var symbolOffset = seriesScope && seriesScope.symbolOffset;
    var labelModel = seriesScope && seriesScope.labelModel;
    var hoverLabelModel = seriesScope && seriesScope.hoverLabelModel;
    var hoverAnimation = seriesScope && seriesScope.hoverAnimation;
    var cursorStyle = seriesScope && seriesScope.cursorStyle;
    if (!seriesScope || data.hasItemOption) {
      var itemModel = seriesScope && seriesScope.itemModel ? seriesScope.itemModel : data.getItemModel(idx);
      itemStyle2 = itemModel.getModel(normalStyleAccessPath).getItemStyle(["color"]);
      hoverItemStyle = itemModel.getModel(emphasisStyleAccessPath).getItemStyle();
      symbolOffset = itemModel.getShallow("symbolOffset");
      labelModel = itemModel.getModel(normalLabelAccessPath);
      hoverLabelModel = itemModel.getModel(emphasisLabelAccessPath);
      hoverAnimation = itemModel.getShallow("hoverAnimation");
      cursorStyle = itemModel.getShallow("cursor");
    } else {
      hoverItemStyle = zrUtil$o.extend({}, hoverItemStyle);
    }
    var elStyle = symbolPath.style;
    var symbolRotate = data.getItemVisual(idx, "symbolRotate");
    symbolPath.attr("rotation", (symbolRotate || 0) * Math.PI / 180 || 0);
    if (symbolOffset) {
      symbolPath.attr("position", [parsePercent$1(symbolOffset[0], symbolSize[0]), parsePercent$1(symbolOffset[1], symbolSize[1])]);
    }
    cursorStyle && symbolPath.attr("cursor", cursorStyle);
    symbolPath.setColor(color2, seriesScope && seriesScope.symbolInnerColor);
    symbolPath.setStyle(itemStyle2);
    var opacity = data.getItemVisual(idx, "opacity");
    if (opacity != null) {
      elStyle.opacity = opacity;
    }
    var liftZ = data.getItemVisual(idx, "liftZ");
    var z2Origin = symbolPath.__z2Origin;
    if (liftZ != null) {
      if (z2Origin == null) {
        symbolPath.__z2Origin = symbolPath.z2;
        symbolPath.z2 += liftZ;
      }
    } else if (z2Origin != null) {
      symbolPath.z2 = z2Origin;
      symbolPath.__z2Origin = null;
    }
    var useNameLabel = seriesScope && seriesScope.useNameLabel;
    graphic$c.setLabelStyle(elStyle, hoverItemStyle, labelModel, hoverLabelModel, {
      labelFetcher: seriesModel,
      labelDataIndex: idx,
      defaultText: getLabelDefaultText,
      isRectText: true,
      autoColor: color2
    });
    function getLabelDefaultText(idx2, opt) {
      return useNameLabel ? data.getName(idx2) : getDefaultLabel(data, idx2);
    }
    symbolPath.__symbolOriginalScale = getScale(symbolSize);
    symbolPath.hoverStyle = hoverItemStyle;
    symbolPath.highDownOnUpdate = hoverAnimation && seriesModel.isAnimationEnabled() ? highDownOnUpdate : null;
    graphic$c.setHoverStyle(symbolPath);
  };
  function highDownOnUpdate(fromState, toState) {
    if (this.incremental || this.useHoverLayer) {
      return;
    }
    if (toState === "emphasis") {
      var scale2 = this.__symbolOriginalScale;
      var ratio = scale2[1] / scale2[0];
      var emphasisOpt = {
        scale: [Math.max(scale2[0] * 1.1, scale2[0] + 3), Math.max(scale2[1] * 1.1, scale2[1] + 3 * ratio)]
      };
      this.animateTo(emphasisOpt, 400, "elasticOut");
    } else if (toState === "normal") {
      this.animateTo({
        scale: this.__symbolOriginalScale
      }, 400, "elasticOut");
    }
  }
  symbolProto.fadeOut = function(cb, opt) {
    var symbolPath = this.childAt(0);
    this.silent = symbolPath.silent = true;
    !(opt && opt.keepLabel) && (symbolPath.style.text = null);
    graphic$c.updateProps(symbolPath, {
      style: {
        opacity: 0
      },
      scale: [0, 0]
    }, this._seriesModel, this.dataIndex, cb);
  };
  zrUtil$o.inherits(SymbolClz$2, graphic$c.Group);
  var _default$i = SymbolClz$2;
  var _Symbol = _default$i;
  var graphic$b = graphic$g;
  var SymbolClz$1 = _Symbol;
  var _util$5 = util$6;
  var isObject$1 = _util$5.isObject;
  function SymbolDraw$1(symbolCtor) {
    this.group = new graphic$b.Group();
    this._symbolCtor = symbolCtor || SymbolClz$1;
  }
  var symbolDrawProto = SymbolDraw$1.prototype;
  function symbolNeedsDraw(data, point, idx, opt) {
    return point && !isNaN(point[0]) && !isNaN(point[1]) && !(opt.isIgnore && opt.isIgnore(idx)) && !(opt.clipShape && !opt.clipShape.contain(point[0], point[1])) && data.getItemVisual(idx, "symbol") !== "none";
  }
  symbolDrawProto.updateData = function(data, opt) {
    opt = normalizeUpdateOpt(opt);
    var group = this.group;
    var seriesModel = data.hostModel;
    var oldData = this._data;
    var SymbolCtor = this._symbolCtor;
    var seriesScope = makeSeriesScope(data);
    if (!oldData) {
      group.removeAll();
    }
    data.diff(oldData).add(function(newIdx) {
      var point = data.getItemLayout(newIdx);
      if (symbolNeedsDraw(data, point, newIdx, opt)) {
        var symbolEl = new SymbolCtor(data, newIdx, seriesScope);
        symbolEl.attr("position", point);
        data.setItemGraphicEl(newIdx, symbolEl);
        group.add(symbolEl);
      }
    }).update(function(newIdx, oldIdx) {
      var symbolEl = oldData.getItemGraphicEl(oldIdx);
      var point = data.getItemLayout(newIdx);
      if (!symbolNeedsDraw(data, point, newIdx, opt)) {
        group.remove(symbolEl);
        return;
      }
      if (!symbolEl) {
        symbolEl = new SymbolCtor(data, newIdx);
        symbolEl.attr("position", point);
      } else {
        symbolEl.updateData(data, newIdx, seriesScope);
        graphic$b.updateProps(symbolEl, {
          position: point
        }, seriesModel);
      }
      group.add(symbolEl);
      data.setItemGraphicEl(newIdx, symbolEl);
    }).remove(function(oldIdx) {
      var el = oldData.getItemGraphicEl(oldIdx);
      el && el.fadeOut(function() {
        group.remove(el);
      });
    }).execute();
    this._data = data;
  };
  symbolDrawProto.isPersistent = function() {
    return true;
  };
  symbolDrawProto.updateLayout = function() {
    var data = this._data;
    if (data) {
      data.eachItemGraphicEl(function(el, idx) {
        var point = data.getItemLayout(idx);
        el.attr("position", point);
      });
    }
  };
  symbolDrawProto.incrementalPrepareUpdate = function(data) {
    this._seriesScope = makeSeriesScope(data);
    this._data = null;
    this.group.removeAll();
  };
  symbolDrawProto.incrementalUpdate = function(taskParams, data, opt) {
    opt = normalizeUpdateOpt(opt);
    function updateIncrementalAndHover(el2) {
      if (!el2.isGroup) {
        el2.incremental = el2.useHoverLayer = true;
      }
    }
    for (var idx = taskParams.start; idx < taskParams.end; idx++) {
      var point = data.getItemLayout(idx);
      if (symbolNeedsDraw(data, point, idx, opt)) {
        var el = new this._symbolCtor(data, idx, this._seriesScope);
        el.traverse(updateIncrementalAndHover);
        el.attr("position", point);
        this.group.add(el);
        data.setItemGraphicEl(idx, el);
      }
    }
  };
  function normalizeUpdateOpt(opt) {
    if (opt != null && !isObject$1(opt)) {
      opt = {
        isIgnore: opt
      };
    }
    return opt || {};
  }
  symbolDrawProto.remove = function(enableAnimation) {
    var group = this.group;
    var data = this._data;
    if (data && enableAnimation) {
      data.eachItemGraphicEl(function(el) {
        el.fadeOut(function() {
          group.remove(el);
        });
      });
    } else {
      group.removeAll();
    }
  };
  function makeSeriesScope(data) {
    var seriesModel = data.hostModel;
    return {
      itemStyle: seriesModel.getModel("itemStyle").getItemStyle(["color"]),
      hoverItemStyle: seriesModel.getModel("emphasis.itemStyle").getItemStyle(),
      symbolRotate: seriesModel.get("symbolRotate"),
      symbolOffset: seriesModel.get("symbolOffset"),
      hoverAnimation: seriesModel.get("hoverAnimation"),
      labelModel: seriesModel.getModel("label"),
      hoverLabelModel: seriesModel.getModel("emphasis.label"),
      cursorStyle: seriesModel.get("cursor")
    };
  }
  var _default$h = SymbolDraw$1;
  var SymbolDraw_1 = _default$h;
  var helper = {};
  var _dataStackHelper$2 = dataStackHelper;
  var isDimensionStacked$1 = _dataStackHelper$2.isDimensionStacked;
  var _util$4 = util$6;
  var map$2 = _util$4.map;
  function prepareDataCoordInfo$2(coordSys, data, valueOrigin) {
    var baseAxis = coordSys.getBaseAxis();
    var valueAxis = coordSys.getOtherAxis(baseAxis);
    var valueStart = getValueStart(valueAxis, valueOrigin);
    var baseAxisDim = baseAxis.dim;
    var valueAxisDim = valueAxis.dim;
    var valueDim = data.mapDimension(valueAxisDim);
    var baseDim = data.mapDimension(baseAxisDim);
    var baseDataOffset = valueAxisDim === "x" || valueAxisDim === "radius" ? 1 : 0;
    var dims = map$2(coordSys.dimensions, function(coordDim) {
      return data.mapDimension(coordDim);
    });
    var stacked;
    var stackResultDim = data.getCalculationInfo("stackResultDimension");
    if (stacked |= isDimensionStacked$1(data, dims[0])) {
      dims[0] = stackResultDim;
    }
    if (stacked |= isDimensionStacked$1(data, dims[1])) {
      dims[1] = stackResultDim;
    }
    return {
      dataDimsForPoint: dims,
      valueStart,
      valueAxisDim,
      baseAxisDim,
      stacked: !!stacked,
      valueDim,
      baseDim,
      baseDataOffset,
      stackedOverDimension: data.getCalculationInfo("stackedOverDimension")
    };
  }
  function getValueStart(valueAxis, valueOrigin) {
    var valueStart = 0;
    var extent = valueAxis.scale.getExtent();
    if (valueOrigin === "start") {
      valueStart = extent[0];
    } else if (valueOrigin === "end") {
      valueStart = extent[1];
    } else {
      if (extent[0] > 0) {
        valueStart = extent[0];
      } else if (extent[1] < 0) {
        valueStart = extent[1];
      }
    }
    return valueStart;
  }
  function getStackedOnPoint$2(dataCoordInfo, coordSys, data, idx) {
    var value = NaN;
    if (dataCoordInfo.stacked) {
      value = data.get(data.getCalculationInfo("stackedOverDimension"), idx);
    }
    if (isNaN(value)) {
      value = dataCoordInfo.valueStart;
    }
    var baseDataOffset = dataCoordInfo.baseDataOffset;
    var stackedData = [];
    stackedData[baseDataOffset] = data.get(dataCoordInfo.baseDim, idx);
    stackedData[1 - baseDataOffset] = value;
    return coordSys.dataToPoint(stackedData);
  }
  helper.prepareDataCoordInfo = prepareDataCoordInfo$2;
  helper.getStackedOnPoint = getStackedOnPoint$2;
  var _helper$1 = helper;
  var prepareDataCoordInfo$1 = _helper$1.prepareDataCoordInfo;
  var getStackedOnPoint$1 = _helper$1.getStackedOnPoint;
  function diffData(oldData, newData) {
    var diffResult = [];
    newData.diff(oldData).add(function(idx) {
      diffResult.push({
        cmd: "+",
        idx
      });
    }).update(function(newIdx, oldIdx) {
      diffResult.push({
        cmd: "=",
        idx: oldIdx,
        idx1: newIdx
      });
    }).remove(function(idx) {
      diffResult.push({
        cmd: "-",
        idx
      });
    }).execute();
    return diffResult;
  }
  function _default$g(oldData, newData, oldStackedOnPoints, newStackedOnPoints, oldCoordSys, newCoordSys, oldValueOrigin, newValueOrigin) {
    var diff = diffData(oldData, newData);
    var currPoints = [];
    var nextPoints = [];
    var currStackedPoints = [];
    var nextStackedPoints = [];
    var status = [];
    var sortedIndices = [];
    var rawIndices = [];
    var newDataOldCoordInfo = prepareDataCoordInfo$1(oldCoordSys, newData, oldValueOrigin);
    var oldDataNewCoordInfo = prepareDataCoordInfo$1(newCoordSys, oldData, newValueOrigin);
    for (var i2 = 0; i2 < diff.length; i2++) {
      var diffItem = diff[i2];
      var pointAdded = true;
      switch (diffItem.cmd) {
        case "=":
          var currentPt = oldData.getItemLayout(diffItem.idx);
          var nextPt = newData.getItemLayout(diffItem.idx1);
          if (isNaN(currentPt[0]) || isNaN(currentPt[1])) {
            currentPt = nextPt.slice();
          }
          currPoints.push(currentPt);
          nextPoints.push(nextPt);
          currStackedPoints.push(oldStackedOnPoints[diffItem.idx]);
          nextStackedPoints.push(newStackedOnPoints[diffItem.idx1]);
          rawIndices.push(newData.getRawIndex(diffItem.idx1));
          break;
        case "+":
          var idx = diffItem.idx;
          currPoints.push(oldCoordSys.dataToPoint([newData.get(newDataOldCoordInfo.dataDimsForPoint[0], idx), newData.get(newDataOldCoordInfo.dataDimsForPoint[1], idx)]));
          nextPoints.push(newData.getItemLayout(idx).slice());
          currStackedPoints.push(getStackedOnPoint$1(newDataOldCoordInfo, oldCoordSys, newData, idx));
          nextStackedPoints.push(newStackedOnPoints[idx]);
          rawIndices.push(newData.getRawIndex(idx));
          break;
        case "-":
          var idx = diffItem.idx;
          var rawIndex = oldData.getRawIndex(idx);
          if (rawIndex !== idx) {
            currPoints.push(oldData.getItemLayout(idx));
            nextPoints.push(newCoordSys.dataToPoint([oldData.get(oldDataNewCoordInfo.dataDimsForPoint[0], idx), oldData.get(oldDataNewCoordInfo.dataDimsForPoint[1], idx)]));
            currStackedPoints.push(oldStackedOnPoints[idx]);
            nextStackedPoints.push(getStackedOnPoint$1(oldDataNewCoordInfo, newCoordSys, oldData, idx));
            rawIndices.push(rawIndex);
          } else {
            pointAdded = false;
          }
      }
      if (pointAdded) {
        status.push(diffItem);
        sortedIndices.push(sortedIndices.length);
      }
    }
    sortedIndices.sort(function(a, b) {
      return rawIndices[a] - rawIndices[b];
    });
    var sortedCurrPoints = [];
    var sortedNextPoints = [];
    var sortedCurrStackedPoints = [];
    var sortedNextStackedPoints = [];
    var sortedStatus = [];
    for (var i2 = 0; i2 < sortedIndices.length; i2++) {
      var idx = sortedIndices[i2];
      sortedCurrPoints[i2] = currPoints[idx];
      sortedNextPoints[i2] = nextPoints[idx];
      sortedCurrStackedPoints[i2] = currStackedPoints[idx];
      sortedNextStackedPoints[i2] = nextStackedPoints[idx];
      sortedStatus[i2] = status[idx];
    }
    return {
      current: sortedCurrPoints,
      next: sortedNextPoints,
      stackedOnCurrent: sortedCurrStackedPoints,
      stackedOnNext: sortedNextStackedPoints,
      status: sortedStatus
    };
  }
  var lineAnimationDiff$1 = _default$g;
  var poly = {};
  var Path = Path_1;
  var vec2 = vector$3;
  var fixClipWithShadow = fixClipWithShadow$2;
  var vec2Min = vec2.min;
  var vec2Max = vec2.max;
  var scaleAndAdd = vec2.scaleAndAdd;
  var v2Copy = vec2.copy;
  var v = [];
  var cp0 = [];
  var cp1 = [];
  function isPointNull(p) {
    return isNaN(p[0]) || isNaN(p[1]);
  }
  function drawSegment(ctx, points2, start2, segLen, allLen, dir, smoothMin, smoothMax, smooth, smoothMonotone, connectNulls) {
    if (smoothMonotone === "none" || !smoothMonotone) {
      return drawNonMono.apply(this, arguments);
    } else {
      return drawMono.apply(this, arguments);
    }
  }
  function drawMono(ctx, points2, start2, segLen, allLen, dir, smoothMin, smoothMax, smooth, smoothMonotone, connectNulls) {
    var prevIdx = 0;
    var idx = start2;
    for (var k = 0; k < segLen; k++) {
      var p = points2[idx];
      if (idx >= allLen || idx < 0) {
        break;
      }
      if (isPointNull(p)) {
        if (connectNulls) {
          idx += dir;
          continue;
        }
        break;
      }
      if (idx === start2) {
        ctx[dir > 0 ? "moveTo" : "lineTo"](p[0], p[1]);
      } else {
        if (smooth > 0) {
          var prevP = points2[prevIdx];
          var dim = smoothMonotone === "y" ? 1 : 0;
          var ctrlLen = (p[dim] - prevP[dim]) * smooth;
          v2Copy(cp0, prevP);
          cp0[dim] = prevP[dim] + ctrlLen;
          v2Copy(cp1, p);
          cp1[dim] = p[dim] - ctrlLen;
          ctx.bezierCurveTo(cp0[0], cp0[1], cp1[0], cp1[1], p[0], p[1]);
        } else {
          ctx.lineTo(p[0], p[1]);
        }
      }
      prevIdx = idx;
      idx += dir;
    }
    return k;
  }
  function drawNonMono(ctx, points2, start2, segLen, allLen, dir, smoothMin, smoothMax, smooth, smoothMonotone, connectNulls) {
    var prevIdx = 0;
    var idx = start2;
    for (var k = 0; k < segLen; k++) {
      var p = points2[idx];
      if (idx >= allLen || idx < 0) {
        break;
      }
      if (isPointNull(p)) {
        if (connectNulls) {
          idx += dir;
          continue;
        }
        break;
      }
      if (idx === start2) {
        ctx[dir > 0 ? "moveTo" : "lineTo"](p[0], p[1]);
        v2Copy(cp0, p);
      } else {
        if (smooth > 0) {
          var nextIdx = idx + dir;
          var nextP = points2[nextIdx];
          if (connectNulls) {
            while (nextP && isPointNull(points2[nextIdx])) {
              nextIdx += dir;
              nextP = points2[nextIdx];
            }
          }
          var ratioNextSeg = 0.5;
          var prevP = points2[prevIdx];
          var nextP = points2[nextIdx];
          if (!nextP || isPointNull(nextP)) {
            v2Copy(cp1, p);
          } else {
            if (isPointNull(nextP) && !connectNulls) {
              nextP = p;
            }
            vec2.sub(v, nextP, prevP);
            var lenPrevSeg;
            var lenNextSeg;
            if (smoothMonotone === "x" || smoothMonotone === "y") {
              var dim = smoothMonotone === "x" ? 0 : 1;
              lenPrevSeg = Math.abs(p[dim] - prevP[dim]);
              lenNextSeg = Math.abs(p[dim] - nextP[dim]);
            } else {
              lenPrevSeg = vec2.dist(p, prevP);
              lenNextSeg = vec2.dist(p, nextP);
            }
            ratioNextSeg = lenNextSeg / (lenNextSeg + lenPrevSeg);
            scaleAndAdd(cp1, p, v, -smooth * (1 - ratioNextSeg));
          }
          vec2Min(cp0, cp0, smoothMax);
          vec2Max(cp0, cp0, smoothMin);
          vec2Min(cp1, cp1, smoothMax);
          vec2Max(cp1, cp1, smoothMin);
          ctx.bezierCurveTo(cp0[0], cp0[1], cp1[0], cp1[1], p[0], p[1]);
          scaleAndAdd(cp0, p, v, smooth * ratioNextSeg);
        } else {
          ctx.lineTo(p[0], p[1]);
        }
      }
      prevIdx = idx;
      idx += dir;
    }
    return k;
  }
  function getBoundingBox(points2, smoothConstraint) {
    var ptMin = [Infinity, Infinity];
    var ptMax = [-Infinity, -Infinity];
    if (smoothConstraint) {
      for (var i2 = 0; i2 < points2.length; i2++) {
        var pt = points2[i2];
        if (pt[0] < ptMin[0]) {
          ptMin[0] = pt[0];
        }
        if (pt[1] < ptMin[1]) {
          ptMin[1] = pt[1];
        }
        if (pt[0] > ptMax[0]) {
          ptMax[0] = pt[0];
        }
        if (pt[1] > ptMax[1]) {
          ptMax[1] = pt[1];
        }
      }
    }
    return {
      min: smoothConstraint ? ptMin : ptMax,
      max: smoothConstraint ? ptMax : ptMin
    };
  }
  var Polyline$1 = Path.extend({
    type: "ec-polyline",
    shape: {
      points: [],
      smooth: 0,
      smoothConstraint: true,
      smoothMonotone: null,
      connectNulls: false
    },
    style: {
      fill: null,
      stroke: "#000"
    },
    brush: fixClipWithShadow(Path.prototype.brush),
    buildPath: function(ctx, shape) {
      var points2 = shape.points;
      var i2 = 0;
      var len2 = points2.length;
      var result = getBoundingBox(points2, shape.smoothConstraint);
      if (shape.connectNulls) {
        for (; len2 > 0; len2--) {
          if (!isPointNull(points2[len2 - 1])) {
            break;
          }
        }
        for (; i2 < len2; i2++) {
          if (!isPointNull(points2[i2])) {
            break;
          }
        }
      }
      while (i2 < len2) {
        i2 += drawSegment(ctx, points2, i2, len2, len2, 1, result.min, result.max, shape.smooth, shape.smoothMonotone, shape.connectNulls) + 1;
      }
    }
  });
  var Polygon$1 = Path.extend({
    type: "ec-polygon",
    shape: {
      points: [],
      stackedOnPoints: [],
      smooth: 0,
      stackedOnSmooth: 0,
      smoothConstraint: true,
      smoothMonotone: null,
      connectNulls: false
    },
    brush: fixClipWithShadow(Path.prototype.brush),
    buildPath: function(ctx, shape) {
      var points2 = shape.points;
      var stackedOnPoints = shape.stackedOnPoints;
      var i2 = 0;
      var len2 = points2.length;
      var smoothMonotone = shape.smoothMonotone;
      var bbox2 = getBoundingBox(points2, shape.smoothConstraint);
      var stackedOnBBox = getBoundingBox(stackedOnPoints, shape.smoothConstraint);
      if (shape.connectNulls) {
        for (; len2 > 0; len2--) {
          if (!isPointNull(points2[len2 - 1])) {
            break;
          }
        }
        for (; i2 < len2; i2++) {
          if (!isPointNull(points2[i2])) {
            break;
          }
        }
      }
      while (i2 < len2) {
        var k = drawSegment(ctx, points2, i2, len2, len2, 1, bbox2.min, bbox2.max, shape.smooth, smoothMonotone, shape.connectNulls);
        drawSegment(ctx, stackedOnPoints, i2 + k - 1, k, len2, -1, stackedOnBBox.min, stackedOnBBox.max, shape.stackedOnSmooth, smoothMonotone, shape.connectNulls);
        i2 += k + 1;
        ctx.closePath();
      }
    }
  });
  poly.Polyline = Polyline$1;
  poly.Polygon = Polygon$1;
  var createClipPathFromCoordSys = {};
  var graphic$a = graphic$g;
  var _number$1 = number;
  var round = _number$1.round;
  function createGridClipPath$1(cartesian, hasAnimation, seriesModel) {
    var rect = cartesian.getArea();
    var isHorizontal = cartesian.getBaseAxis().isHorizontal();
    var x = rect.x;
    var y = rect.y;
    var width = rect.width;
    var height = rect.height;
    var lineWidth = seriesModel.get("lineStyle.width") || 2;
    x -= lineWidth / 2;
    y -= lineWidth / 2;
    width += lineWidth;
    height += lineWidth;
    x = Math.floor(x);
    width = Math.round(width);
    var clipPath = new graphic$a.Rect({
      shape: {
        x,
        y,
        width,
        height
      }
    });
    if (hasAnimation) {
      clipPath.shape[isHorizontal ? "width" : "height"] = 0;
      graphic$a.initProps(clipPath, {
        shape: {
          width,
          height
        }
      }, seriesModel);
    }
    return clipPath;
  }
  function createPolarClipPath$1(polar, hasAnimation, seriesModel) {
    var sectorArea = polar.getArea();
    var clipPath = new graphic$a.Sector({
      shape: {
        cx: round(polar.cx, 1),
        cy: round(polar.cy, 1),
        r0: round(sectorArea.r0, 1),
        r: round(sectorArea.r, 1),
        startAngle: sectorArea.startAngle,
        endAngle: sectorArea.endAngle,
        clockwise: sectorArea.clockwise
      }
    });
    if (hasAnimation) {
      clipPath.shape.endAngle = sectorArea.startAngle;
      graphic$a.initProps(clipPath, {
        shape: {
          endAngle: sectorArea.endAngle
        }
      }, seriesModel);
    }
    return clipPath;
  }
  function createClipPath(coordSys, hasAnimation, seriesModel) {
    if (!coordSys) {
      return null;
    } else if (coordSys.type === "polar") {
      return createPolarClipPath$1(coordSys, hasAnimation, seriesModel);
    } else if (coordSys.type === "cartesian2d") {
      return createGridClipPath$1(coordSys, hasAnimation, seriesModel);
    }
    return null;
  }
  createClipPathFromCoordSys.createGridClipPath = createGridClipPath$1;
  createClipPathFromCoordSys.createPolarClipPath = createPolarClipPath$1;
  createClipPathFromCoordSys.createClipPath = createClipPath;
  var zrUtil$n = util$6;
  var _bbox = bbox$2;
  var fromPoints = _bbox.fromPoints;
  var SymbolDraw = SymbolDraw_1;
  var SymbolClz = _Symbol;
  var lineAnimationDiff = lineAnimationDiff$1;
  var graphic$9 = graphic$g;
  var modelUtil$1 = model;
  var _poly = poly;
  var Polyline = _poly.Polyline;
  var Polygon = _poly.Polygon;
  var ChartView = Chart_1;
  var _helper = helper;
  var prepareDataCoordInfo = _helper.prepareDataCoordInfo;
  var getStackedOnPoint = _helper.getStackedOnPoint;
  var _createClipPathFromCoordSys = createClipPathFromCoordSys;
  var createGridClipPath = _createClipPathFromCoordSys.createGridClipPath;
  var createPolarClipPath = _createClipPathFromCoordSys.createPolarClipPath;
  function isPointsSame(points1, points2) {
    if (points1.length !== points2.length) {
      return;
    }
    for (var i2 = 0; i2 < points1.length; i2++) {
      var p1 = points1[i2];
      var p2 = points2[i2];
      if (p1[0] !== p2[0] || p1[1] !== p2[1]) {
        return;
      }
    }
    return true;
  }
  function getBoundingDiff(points1, points2) {
    var min1 = [];
    var max1 = [];
    var min22 = [];
    var max22 = [];
    fromPoints(points1, min1, max1);
    fromPoints(points2, min22, max22);
    return Math.max(Math.abs(min1[0] - min22[0]), Math.abs(min1[1] - min22[1]), Math.abs(max1[0] - max22[0]), Math.abs(max1[1] - max22[1]));
  }
  function getSmooth(smooth) {
    return typeof smooth === "number" ? smooth : smooth ? 0.5 : 0;
  }
  function getStackedOnPoints(coordSys, data, dataCoordInfo) {
    if (!dataCoordInfo.valueDim) {
      return [];
    }
    var points2 = [];
    for (var idx = 0, len2 = data.count(); idx < len2; idx++) {
      points2.push(getStackedOnPoint(dataCoordInfo, coordSys, data, idx));
    }
    return points2;
  }
  function turnPointsIntoStep(points2, coordSys, stepTurnAt) {
    var baseAxis = coordSys.getBaseAxis();
    var baseIndex = baseAxis.dim === "x" || baseAxis.dim === "radius" ? 0 : 1;
    var stepPoints = [];
    for (var i2 = 0; i2 < points2.length - 1; i2++) {
      var nextPt = points2[i2 + 1];
      var pt = points2[i2];
      stepPoints.push(pt);
      var stepPt = [];
      switch (stepTurnAt) {
        case "end":
          stepPt[baseIndex] = nextPt[baseIndex];
          stepPt[1 - baseIndex] = pt[1 - baseIndex];
          stepPoints.push(stepPt);
          break;
        case "middle":
          var middle = (pt[baseIndex] + nextPt[baseIndex]) / 2;
          var stepPt2 = [];
          stepPt[baseIndex] = stepPt2[baseIndex] = middle;
          stepPt[1 - baseIndex] = pt[1 - baseIndex];
          stepPt2[1 - baseIndex] = nextPt[1 - baseIndex];
          stepPoints.push(stepPt);
          stepPoints.push(stepPt2);
          break;
        default:
          stepPt[baseIndex] = pt[baseIndex];
          stepPt[1 - baseIndex] = nextPt[1 - baseIndex];
          stepPoints.push(stepPt);
      }
    }
    points2[i2] && stepPoints.push(points2[i2]);
    return stepPoints;
  }
  function getVisualGradient(data, coordSys) {
    var visualMetaList = data.getVisual("visualMeta");
    if (!visualMetaList || !visualMetaList.length || !data.count()) {
      return;
    }
    if (coordSys.type !== "cartesian2d") {
      return;
    }
    var coordDim;
    var visualMeta;
    for (var i2 = visualMetaList.length - 1; i2 >= 0; i2--) {
      var dimIndex = visualMetaList[i2].dimension;
      var dimName = data.dimensions[dimIndex];
      var dimInfo = data.getDimensionInfo(dimName);
      coordDim = dimInfo && dimInfo.coordDim;
      if (coordDim === "x" || coordDim === "y") {
        visualMeta = visualMetaList[i2];
        break;
      }
    }
    if (!visualMeta) {
      return;
    }
    var axis = coordSys.getAxis(coordDim);
    var colorStops = zrUtil$n.map(visualMeta.stops, function(stop2) {
      return {
        coord: axis.toGlobalCoord(axis.dataToCoord(stop2.value)),
        color: stop2.color
      };
    });
    var stopLen = colorStops.length;
    var outerColors = visualMeta.outerColors.slice();
    if (stopLen && colorStops[0].coord > colorStops[stopLen - 1].coord) {
      colorStops.reverse();
      outerColors.reverse();
    }
    var tinyExtent = 10;
    var minCoord = colorStops[0].coord - tinyExtent;
    var maxCoord = colorStops[stopLen - 1].coord + tinyExtent;
    var coordSpan = maxCoord - minCoord;
    if (coordSpan < 1e-3) {
      return "transparent";
    }
    zrUtil$n.each(colorStops, function(stop2) {
      stop2.offset = (stop2.coord - minCoord) / coordSpan;
    });
    colorStops.push({
      offset: stopLen ? colorStops[stopLen - 1].offset : 0.5,
      color: outerColors[1] || "transparent"
    });
    colorStops.unshift({
      offset: stopLen ? colorStops[0].offset : 0.5,
      color: outerColors[0] || "transparent"
    });
    var gradient = new graphic$9.LinearGradient(0, 0, 0, 0, colorStops, true);
    gradient[coordDim] = minCoord;
    gradient[coordDim + "2"] = maxCoord;
    return gradient;
  }
  function getIsIgnoreFunc(seriesModel, data, coordSys) {
    var showAllSymbol = seriesModel.get("showAllSymbol");
    var isAuto = showAllSymbol === "auto";
    if (showAllSymbol && !isAuto) {
      return;
    }
    var categoryAxis = coordSys.getAxesByScale("ordinal")[0];
    if (!categoryAxis) {
      return;
    }
    if (isAuto && canShowAllSymbolForCategory(categoryAxis, data)) {
      return;
    }
    var categoryDataDim = data.mapDimension(categoryAxis.dim);
    var labelMap = {};
    zrUtil$n.each(categoryAxis.getViewLabels(), function(labelItem) {
      labelMap[labelItem.tickValue] = 1;
    });
    return function(dataIndex) {
      return !labelMap.hasOwnProperty(data.get(categoryDataDim, dataIndex));
    };
  }
  function canShowAllSymbolForCategory(categoryAxis, data) {
    var axisExtent = categoryAxis.getExtent();
    var availSize = Math.abs(axisExtent[1] - axisExtent[0]) / categoryAxis.scale.count();
    isNaN(availSize) && (availSize = 0);
    var dataLen = data.count();
    var step = Math.max(1, Math.round(dataLen / 5));
    for (var dataIndex = 0; dataIndex < dataLen; dataIndex += step) {
      if (SymbolClz.getSymbolSize(data, dataIndex)[categoryAxis.isHorizontal() ? 1 : 0] * 1.5 > availSize) {
        return false;
      }
    }
    return true;
  }
  function createLineClipPath(coordSys, hasAnimation, seriesModel) {
    if (coordSys.type === "cartesian2d") {
      var isHorizontal = coordSys.getBaseAxis().isHorizontal();
      var clipPath = createGridClipPath(coordSys, hasAnimation, seriesModel);
      if (!seriesModel.get("clip", true)) {
        var rectShape = clipPath.shape;
        var expandSize = Math.max(rectShape.width, rectShape.height);
        if (isHorizontal) {
          rectShape.y -= expandSize;
          rectShape.height += expandSize * 2;
        } else {
          rectShape.x -= expandSize;
          rectShape.width += expandSize * 2;
        }
      }
      return clipPath;
    } else {
      return createPolarClipPath(coordSys, hasAnimation, seriesModel);
    }
  }
  ChartView.extend({
    type: "line",
    init: function() {
      var lineGroup = new graphic$9.Group();
      var symbolDraw = new SymbolDraw();
      this.group.add(symbolDraw.group);
      this._symbolDraw = symbolDraw;
      this._lineGroup = lineGroup;
    },
    render: function(seriesModel, ecModel, api) {
      var coordSys = seriesModel.coordinateSystem;
      var group = this.group;
      var data = seriesModel.getData();
      var lineStyleModel = seriesModel.getModel("lineStyle");
      var areaStyleModel = seriesModel.getModel("areaStyle");
      var points2 = data.mapArray(data.getItemLayout);
      var isCoordSysPolar = coordSys.type === "polar";
      var prevCoordSys = this._coordSys;
      var symbolDraw = this._symbolDraw;
      var polyline = this._polyline;
      var polygon2 = this._polygon;
      var lineGroup = this._lineGroup;
      var hasAnimation = seriesModel.get("animation");
      var isAreaChart = !areaStyleModel.isEmpty();
      var valueOrigin = areaStyleModel.get("origin");
      var dataCoordInfo = prepareDataCoordInfo(coordSys, data, valueOrigin);
      var stackedOnPoints = getStackedOnPoints(coordSys, data, dataCoordInfo);
      var showSymbol = seriesModel.get("showSymbol");
      var isIgnoreFunc = showSymbol && !isCoordSysPolar && getIsIgnoreFunc(seriesModel, data, coordSys);
      var oldData = this._data;
      oldData && oldData.eachItemGraphicEl(function(el, idx) {
        if (el.__temp) {
          group.remove(el);
          oldData.setItemGraphicEl(idx, null);
        }
      });
      if (!showSymbol) {
        symbolDraw.remove();
      }
      group.add(lineGroup);
      var step = !isCoordSysPolar && seriesModel.get("step");
      var clipShapeForSymbol;
      if (coordSys && coordSys.getArea && seriesModel.get("clip", true)) {
        clipShapeForSymbol = coordSys.getArea();
        if (clipShapeForSymbol.width != null) {
          clipShapeForSymbol.x -= 0.1;
          clipShapeForSymbol.y -= 0.1;
          clipShapeForSymbol.width += 0.2;
          clipShapeForSymbol.height += 0.2;
        } else if (clipShapeForSymbol.r0) {
          clipShapeForSymbol.r0 -= 0.5;
          clipShapeForSymbol.r1 += 0.5;
        }
      }
      this._clipShapeForSymbol = clipShapeForSymbol;
      if (!(polyline && prevCoordSys.type === coordSys.type && step === this._step)) {
        showSymbol && symbolDraw.updateData(data, {
          isIgnore: isIgnoreFunc,
          clipShape: clipShapeForSymbol
        });
        if (step) {
          points2 = turnPointsIntoStep(points2, coordSys, step);
          stackedOnPoints = turnPointsIntoStep(stackedOnPoints, coordSys, step);
        }
        polyline = this._newPolyline(points2, coordSys, hasAnimation);
        if (isAreaChart) {
          polygon2 = this._newPolygon(points2, stackedOnPoints, coordSys, hasAnimation);
        }
        lineGroup.setClipPath(createLineClipPath(coordSys, true, seriesModel));
      } else {
        if (isAreaChart && !polygon2) {
          polygon2 = this._newPolygon(points2, stackedOnPoints, coordSys, hasAnimation);
        } else if (polygon2 && !isAreaChart) {
          lineGroup.remove(polygon2);
          polygon2 = this._polygon = null;
        }
        lineGroup.setClipPath(createLineClipPath(coordSys, false, seriesModel));
        showSymbol && symbolDraw.updateData(data, {
          isIgnore: isIgnoreFunc,
          clipShape: clipShapeForSymbol
        });
        data.eachItemGraphicEl(function(el) {
          el.stopAnimation(true);
        });
        if (!isPointsSame(this._stackedOnPoints, stackedOnPoints) || !isPointsSame(this._points, points2)) {
          if (hasAnimation) {
            this._updateAnimation(data, stackedOnPoints, coordSys, api, step, valueOrigin);
          } else {
            if (step) {
              points2 = turnPointsIntoStep(points2, coordSys, step);
              stackedOnPoints = turnPointsIntoStep(stackedOnPoints, coordSys, step);
            }
            polyline.setShape({
              points: points2
            });
            polygon2 && polygon2.setShape({
              points: points2,
              stackedOnPoints
            });
          }
        }
      }
      var visualColor = getVisualGradient(data, coordSys) || data.getVisual("color");
      polyline.useStyle(zrUtil$n.defaults(lineStyleModel.getLineStyle(), {
        fill: "none",
        stroke: visualColor,
        lineJoin: "bevel"
      }));
      var smooth = seriesModel.get("smooth");
      smooth = getSmooth(seriesModel.get("smooth"));
      polyline.setShape({
        smooth,
        smoothMonotone: seriesModel.get("smoothMonotone"),
        connectNulls: seriesModel.get("connectNulls")
      });
      if (polygon2) {
        var stackedOnSeries = data.getCalculationInfo("stackedOnSeries");
        var stackedOnSmooth = 0;
        polygon2.useStyle(zrUtil$n.defaults(areaStyleModel.getAreaStyle(), {
          fill: visualColor,
          opacity: 0.7,
          lineJoin: "bevel"
        }));
        if (stackedOnSeries) {
          stackedOnSmooth = getSmooth(stackedOnSeries.get("smooth"));
        }
        polygon2.setShape({
          smooth,
          stackedOnSmooth,
          smoothMonotone: seriesModel.get("smoothMonotone"),
          connectNulls: seriesModel.get("connectNulls")
        });
      }
      this._data = data;
      this._coordSys = coordSys;
      this._stackedOnPoints = stackedOnPoints;
      this._points = points2;
      this._step = step;
      this._valueOrigin = valueOrigin;
    },
    dispose: function() {
    },
    highlight: function(seriesModel, ecModel, api, payload) {
      var data = seriesModel.getData();
      var dataIndex = modelUtil$1.queryDataIndex(data, payload);
      if (!(dataIndex instanceof Array) && dataIndex != null && dataIndex >= 0) {
        var symbol2 = data.getItemGraphicEl(dataIndex);
        if (!symbol2) {
          var pt = data.getItemLayout(dataIndex);
          if (!pt) {
            return;
          }
          if (this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(pt[0], pt[1])) {
            return;
          }
          symbol2 = new SymbolClz(data, dataIndex);
          symbol2.position = pt;
          symbol2.setZ(seriesModel.get("zlevel"), seriesModel.get("z"));
          symbol2.ignore = isNaN(pt[0]) || isNaN(pt[1]);
          symbol2.__temp = true;
          data.setItemGraphicEl(dataIndex, symbol2);
          symbol2.stopSymbolAnimation(true);
          this.group.add(symbol2);
        }
        symbol2.highlight();
      } else {
        ChartView.prototype.highlight.call(this, seriesModel, ecModel, api, payload);
      }
    },
    downplay: function(seriesModel, ecModel, api, payload) {
      var data = seriesModel.getData();
      var dataIndex = modelUtil$1.queryDataIndex(data, payload);
      if (dataIndex != null && dataIndex >= 0) {
        var symbol2 = data.getItemGraphicEl(dataIndex);
        if (symbol2) {
          if (symbol2.__temp) {
            data.setItemGraphicEl(dataIndex, null);
            this.group.remove(symbol2);
          } else {
            symbol2.downplay();
          }
        }
      } else {
        ChartView.prototype.downplay.call(this, seriesModel, ecModel, api, payload);
      }
    },
    _newPolyline: function(points2) {
      var polyline = this._polyline;
      if (polyline) {
        this._lineGroup.remove(polyline);
      }
      polyline = new Polyline({
        shape: {
          points: points2
        },
        silent: true,
        z2: 10
      });
      this._lineGroup.add(polyline);
      this._polyline = polyline;
      return polyline;
    },
    _newPolygon: function(points2, stackedOnPoints) {
      var polygon2 = this._polygon;
      if (polygon2) {
        this._lineGroup.remove(polygon2);
      }
      polygon2 = new Polygon({
        shape: {
          points: points2,
          stackedOnPoints
        },
        silent: true
      });
      this._lineGroup.add(polygon2);
      this._polygon = polygon2;
      return polygon2;
    },
    _updateAnimation: function(data, stackedOnPoints, coordSys, api, step, valueOrigin) {
      var polyline = this._polyline;
      var polygon2 = this._polygon;
      var seriesModel = data.hostModel;
      var diff = lineAnimationDiff(this._data, data, this._stackedOnPoints, stackedOnPoints, this._coordSys, coordSys, this._valueOrigin, valueOrigin);
      var current = diff.current;
      var stackedOnCurrent = diff.stackedOnCurrent;
      var next = diff.next;
      var stackedOnNext = diff.stackedOnNext;
      if (step) {
        current = turnPointsIntoStep(diff.current, coordSys, step);
        stackedOnCurrent = turnPointsIntoStep(diff.stackedOnCurrent, coordSys, step);
        next = turnPointsIntoStep(diff.next, coordSys, step);
        stackedOnNext = turnPointsIntoStep(diff.stackedOnNext, coordSys, step);
      }
      if (getBoundingDiff(current, next) > 3e3 || polygon2 && getBoundingDiff(stackedOnCurrent, stackedOnNext) > 3e3) {
        polyline.setShape({
          points: next
        });
        if (polygon2) {
          polygon2.setShape({
            points: next,
            stackedOnPoints: stackedOnNext
          });
        }
        return;
      }
      polyline.shape.__points = diff.current;
      polyline.shape.points = current;
      graphic$9.updateProps(polyline, {
        shape: {
          points: next
        }
      }, seriesModel);
      if (polygon2) {
        polygon2.setShape({
          points: current,
          stackedOnPoints: stackedOnCurrent
        });
        graphic$9.updateProps(polygon2, {
          shape: {
            points: next,
            stackedOnPoints: stackedOnNext
          }
        }, seriesModel);
      }
      var updatedDataInfo = [];
      var diffStatus = diff.status;
      for (var i2 = 0; i2 < diffStatus.length; i2++) {
        var cmd = diffStatus[i2].cmd;
        if (cmd === "=") {
          var el = data.getItemGraphicEl(diffStatus[i2].idx1);
          if (el) {
            updatedDataInfo.push({
              el,
              ptIdx: i2
            });
          }
        }
      }
      if (polyline.animators && polyline.animators.length) {
        polyline.animators[0].during(function() {
          for (var i3 = 0; i3 < updatedDataInfo.length; i3++) {
            var el2 = updatedDataInfo[i3].el;
            el2.attr("position", polyline.shape.__points[updatedDataInfo[i3].ptIdx]);
          }
        });
      }
    },
    remove: function(ecModel) {
      var group = this.group;
      var oldData = this._data;
      this._lineGroup.removeAll();
      this._symbolDraw.remove(true);
      oldData && oldData.eachItemGraphicEl(function(el, idx) {
        if (el.__temp) {
          group.remove(el);
          oldData.setItemGraphicEl(idx, null);
        }
      });
      this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._data = null;
    }
  });
  var _util$3 = util$6;
  var isFunction = _util$3.isFunction;
  function _default$f(seriesType2, defaultSymbolType, legendSymbol) {
    return {
      seriesType: seriesType2,
      performRawSeries: true,
      reset: function(seriesModel, ecModel, api) {
        var data = seriesModel.getData();
        var symbolType = seriesModel.get("symbol");
        var symbolSize = seriesModel.get("symbolSize");
        var keepAspect = seriesModel.get("symbolKeepAspect");
        var symbolRotate = seriesModel.get("symbolRotate");
        var hasSymbolTypeCallback = isFunction(symbolType);
        var hasSymbolSizeCallback = isFunction(symbolSize);
        var hasSymbolRotateCallback = isFunction(symbolRotate);
        var hasCallback = hasSymbolTypeCallback || hasSymbolSizeCallback || hasSymbolRotateCallback;
        var seriesSymbol = !hasSymbolTypeCallback && symbolType ? symbolType : defaultSymbolType;
        var seriesSymbolSize = !hasSymbolSizeCallback ? symbolSize : null;
        data.setVisual({
          legendSymbol: legendSymbol || seriesSymbol,
          symbol: seriesSymbol,
          symbolSize: seriesSymbolSize,
          symbolKeepAspect: keepAspect,
          symbolRotate
        });
        if (ecModel.isSeriesFiltered(seriesModel)) {
          return;
        }
        function dataEach(data2, idx) {
          if (hasCallback) {
            var rawValue = seriesModel.getRawValue(idx);
            var params = seriesModel.getDataParams(idx);
            hasSymbolTypeCallback && data2.setItemVisual(idx, "symbol", symbolType(rawValue, params));
            hasSymbolSizeCallback && data2.setItemVisual(idx, "symbolSize", symbolSize(rawValue, params));
            hasSymbolRotateCallback && data2.setItemVisual(idx, "symbolRotate", symbolRotate(rawValue, params));
          }
          if (data2.hasItemOption) {
            var itemModel = data2.getItemModel(idx);
            var itemSymbolType = itemModel.getShallow("symbol", true);
            var itemSymbolSize = itemModel.getShallow("symbolSize", true);
            var itemSymbolRotate = itemModel.getShallow("symbolRotate", true);
            var itemSymbolKeepAspect = itemModel.getShallow("symbolKeepAspect", true);
            if (itemSymbolType != null) {
              data2.setItemVisual(idx, "symbol", itemSymbolType);
            }
            if (itemSymbolSize != null) {
              data2.setItemVisual(idx, "symbolSize", itemSymbolSize);
            }
            if (itemSymbolRotate != null) {
              data2.setItemVisual(idx, "symbolRotate", itemSymbolRotate);
            }
            if (itemSymbolKeepAspect != null) {
              data2.setItemVisual(idx, "symbolKeepAspect", itemSymbolKeepAspect);
            }
          }
        }
        return {
          dataEach: data.hasItemOption || hasCallback ? dataEach : null
        };
      }
    };
  }
  var symbol = _default$f;
  var _util$2 = util$6;
  var map$1 = _util$2.map;
  var createRenderPlanner = createRenderPlanner$3;
  var _dataStackHelper$1 = dataStackHelper;
  var isDimensionStacked = _dataStackHelper$1.isDimensionStacked;
  function _default$e(seriesType2) {
    return {
      seriesType: seriesType2,
      plan: createRenderPlanner(),
      reset: function(seriesModel) {
        var data = seriesModel.getData();
        var coordSys = seriesModel.coordinateSystem;
        var pipelineContext = seriesModel.pipelineContext;
        var isLargeRender = pipelineContext.large;
        if (!coordSys) {
          return;
        }
        var dims = map$1(coordSys.dimensions, function(dim) {
          return data.mapDimension(dim);
        }).slice(0, 2);
        var dimLen = dims.length;
        var stackResultDim = data.getCalculationInfo("stackResultDimension");
        if (isDimensionStacked(data, dims[0])) {
          dims[0] = stackResultDim;
        }
        if (isDimensionStacked(data, dims[1])) {
          dims[1] = stackResultDim;
        }
        function progress(params, data2) {
          var segCount = params.end - params.start;
          var points2 = isLargeRender && new Float32Array(segCount * dimLen);
          for (var i2 = params.start, offset = 0, tmpIn = [], tmpOut = []; i2 < params.end; i2++) {
            var point;
            if (dimLen === 1) {
              var x = data2.get(dims[0], i2);
              point = !isNaN(x) && coordSys.dataToPoint(x, null, tmpOut);
            } else {
              var x = tmpIn[0] = data2.get(dims[0], i2);
              var y = tmpIn[1] = data2.get(dims[1], i2);
              point = !isNaN(x) && !isNaN(y) && coordSys.dataToPoint(tmpIn, null, tmpOut);
            }
            if (isLargeRender) {
              points2[offset++] = point ? point[0] : NaN;
              points2[offset++] = point ? point[1] : NaN;
            } else {
              data2.setItemLayout(i2, point && point.slice() || [NaN, NaN]);
            }
          }
          isLargeRender && data2.setLayout("symbolPoints", points2);
        }
        return dimLen && {
          progress
        };
      }
    };
  }
  var points = _default$e;
  var samplers = {
    average: function(frame) {
      var sum = 0;
      var count = 0;
      for (var i2 = 0; i2 < frame.length; i2++) {
        if (!isNaN(frame[i2])) {
          sum += frame[i2];
          count++;
        }
      }
      return count === 0 ? NaN : sum / count;
    },
    sum: function(frame) {
      var sum = 0;
      for (var i2 = 0; i2 < frame.length; i2++) {
        sum += frame[i2] || 0;
      }
      return sum;
    },
    max: function(frame) {
      var max3 = -Infinity;
      for (var i2 = 0; i2 < frame.length; i2++) {
        frame[i2] > max3 && (max3 = frame[i2]);
      }
      return isFinite(max3) ? max3 : NaN;
    },
    min: function(frame) {
      var min3 = Infinity;
      for (var i2 = 0; i2 < frame.length; i2++) {
        frame[i2] < min3 && (min3 = frame[i2]);
      }
      return isFinite(min3) ? min3 : NaN;
    },
    nearest: function(frame) {
      return frame[0];
    }
  };
  var indexSampler = function(frame, value) {
    return Math.round(frame.length / 2);
  };
  function _default$d(seriesType2) {
    return {
      seriesType: seriesType2,
      modifyOutputEnd: true,
      reset: function(seriesModel, ecModel, api) {
        var data = seriesModel.getData();
        var sampling = seriesModel.get("sampling");
        var coordSys = seriesModel.coordinateSystem;
        if (coordSys.type === "cartesian2d" && sampling) {
          var baseAxis = coordSys.getBaseAxis();
          var valueAxis = coordSys.getOtherAxis(baseAxis);
          var extent = baseAxis.getExtent();
          var size = Math.abs(extent[1] - extent[0]);
          var rate = Math.round(data.count() / size);
          if (rate > 1) {
            var sampler;
            if (typeof sampling === "string") {
              sampler = samplers[sampling];
            } else if (typeof sampling === "function") {
              sampler = sampling;
            }
            if (sampler) {
              seriesModel.setData(data.downSample(data.mapDimension(valueAxis.dim), 1 / rate, sampler, indexSampler));
            }
          }
        }
      }
    };
  }
  var dataSample$1 = _default$d;
  var zrUtil$m = util$6;
  function dimAxisMapper(dim) {
    return this._axes[dim];
  }
  var Cartesian$1 = function(name) {
    this._axes = {};
    this._dimList = [];
    this.name = name || "";
  };
  Cartesian$1.prototype = {
    constructor: Cartesian$1,
    type: "cartesian",
    getAxis: function(dim) {
      return this._axes[dim];
    },
    getAxes: function() {
      return zrUtil$m.map(this._dimList, dimAxisMapper, this);
    },
    getAxesByScale: function(scaleType) {
      scaleType = scaleType.toLowerCase();
      return zrUtil$m.filter(this.getAxes(), function(axis) {
        return axis.scale.type === scaleType;
      });
    },
    addAxis: function(axis) {
      var dim = axis.dim;
      this._axes[dim] = axis;
      this._dimList.push(dim);
    },
    dataToCoord: function(val) {
      return this._dataCoordConvert(val, "dataToCoord");
    },
    coordToData: function(val) {
      return this._dataCoordConvert(val, "coordToData");
    },
    _dataCoordConvert: function(input, method) {
      var dimList = this._dimList;
      var output = input instanceof Array ? [] : {};
      for (var i2 = 0; i2 < dimList.length; i2++) {
        var dim = dimList[i2];
        var axis = this._axes[dim];
        output[dim] = axis[method](input[dim]);
      }
      return output;
    }
  };
  var _default$c = Cartesian$1;
  var Cartesian_1 = _default$c;
  var zrUtil$l = util$6;
  var BoundingRect = BoundingRect_1;
  var Cartesian = Cartesian_1;
  function Cartesian2D$1(name) {
    Cartesian.call(this, name);
  }
  Cartesian2D$1.prototype = {
    constructor: Cartesian2D$1,
    type: "cartesian2d",
    dimensions: ["x", "y"],
    getBaseAxis: function() {
      return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x");
    },
    containPoint: function(point) {
      var axisX = this.getAxis("x");
      var axisY = this.getAxis("y");
      return axisX.contain(axisX.toLocalCoord(point[0])) && axisY.contain(axisY.toLocalCoord(point[1]));
    },
    containData: function(data) {
      return this.getAxis("x").containData(data[0]) && this.getAxis("y").containData(data[1]);
    },
    dataToPoint: function(data, reserved, out2) {
      var xAxis = this.getAxis("x");
      var yAxis = this.getAxis("y");
      out2 = out2 || [];
      out2[0] = xAxis.toGlobalCoord(xAxis.dataToCoord(data[0]));
      out2[1] = yAxis.toGlobalCoord(yAxis.dataToCoord(data[1]));
      return out2;
    },
    clampData: function(data, out2) {
      var xScale = this.getAxis("x").scale;
      var yScale = this.getAxis("y").scale;
      var xAxisExtent = xScale.getExtent();
      var yAxisExtent = yScale.getExtent();
      var x = xScale.parse(data[0]);
      var y = yScale.parse(data[1]);
      out2 = out2 || [];
      out2[0] = Math.min(Math.max(Math.min(xAxisExtent[0], xAxisExtent[1]), x), Math.max(xAxisExtent[0], xAxisExtent[1]));
      out2[1] = Math.min(Math.max(Math.min(yAxisExtent[0], yAxisExtent[1]), y), Math.max(yAxisExtent[0], yAxisExtent[1]));
      return out2;
    },
    pointToData: function(point, out2) {
      var xAxis = this.getAxis("x");
      var yAxis = this.getAxis("y");
      out2 = out2 || [];
      out2[0] = xAxis.coordToData(xAxis.toLocalCoord(point[0]));
      out2[1] = yAxis.coordToData(yAxis.toLocalCoord(point[1]));
      return out2;
    },
    getOtherAxis: function(axis) {
      return this.getAxis(axis.dim === "x" ? "y" : "x");
    },
    getArea: function() {
      var xExtent = this.getAxis("x").getGlobalExtent();
      var yExtent = this.getAxis("y").getGlobalExtent();
      var x = Math.min(xExtent[0], xExtent[1]);
      var y = Math.min(yExtent[0], yExtent[1]);
      var width = Math.max(xExtent[0], xExtent[1]) - x;
      var height = Math.max(yExtent[0], yExtent[1]) - y;
      var rect = new BoundingRect(x, y, width, height);
      return rect;
    }
  };
  zrUtil$l.inherits(Cartesian2D$1, Cartesian);
  var _default$b = Cartesian2D$1;
  var Cartesian2D_1 = _default$b;
  var zrUtil$k = util$6;
  var Axis = Axis_1;
  var Axis2D$1 = function(dim, scale2, coordExtent, axisType, position) {
    Axis.call(this, dim, scale2, coordExtent);
    this.type = axisType || "value";
    this.position = position || "bottom";
  };
  Axis2D$1.prototype = {
    constructor: Axis2D$1,
    index: 0,
    getAxesOnZeroOf: null,
    model: null,
    isHorizontal: function() {
      var position = this.position;
      return position === "top" || position === "bottom";
    },
    getGlobalExtent: function(asc2) {
      var ret = this.getExtent();
      ret[0] = this.toGlobalCoord(ret[0]);
      ret[1] = this.toGlobalCoord(ret[1]);
      asc2 && ret[0] > ret[1] && ret.reverse();
      return ret;
    },
    getOtherAxis: function() {
      this.grid.getOtherAxis();
    },
    pointToData: function(point, clamp2) {
      return this.coordToData(this.toLocalCoord(point[this.dim === "x" ? 0 : 1]), clamp2);
    },
    toLocalCoord: null,
    toGlobalCoord: null
  };
  zrUtil$k.inherits(Axis2D$1, Axis);
  var _default$a = Axis2D$1;
  var Axis2D_1 = _default$a;
  var zrUtil$j = util$6;
  var defaultOption = {
    show: true,
    zlevel: 0,
    z: 0,
    inverse: false,
    name: "",
    nameLocation: "end",
    nameRotate: null,
    nameTruncate: {
      maxWidth: null,
      ellipsis: "...",
      placeholder: "."
    },
    nameTextStyle: {},
    nameGap: 15,
    silent: false,
    triggerEvent: false,
    tooltip: {
      show: false
    },
    axisPointer: {},
    axisLine: {
      show: true,
      onZero: true,
      onZeroAxisIndex: null,
      lineStyle: {
        color: "#333",
        width: 1,
        type: "solid"
      },
      symbol: ["none", "none"],
      symbolSize: [10, 15]
    },
    axisTick: {
      show: true,
      inside: false,
      length: 5,
      lineStyle: {
        width: 1
      }
    },
    axisLabel: {
      show: true,
      inside: false,
      rotate: 0,
      showMinLabel: null,
      showMaxLabel: null,
      margin: 8,
      fontSize: 12
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ["#ccc"],
        width: 1,
        type: "solid"
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
      }
    }
  };
  var axisDefault$1 = {};
  axisDefault$1.categoryAxis = zrUtil$j.merge({
    boundaryGap: true,
    deduplication: null,
    splitLine: {
      show: false
    },
    axisTick: {
      alignWithLabel: false,
      interval: "auto"
    },
    axisLabel: {
      interval: "auto"
    }
  }, defaultOption);
  axisDefault$1.valueAxis = zrUtil$j.merge({
    boundaryGap: [0, 0],
    splitNumber: 5,
    minorTick: {
      show: false,
      splitNumber: 5,
      length: 3,
      lineStyle: {}
    },
    minorSplitLine: {
      show: false,
      lineStyle: {
        color: "#eee",
        width: 1
      }
    }
  }, defaultOption);
  axisDefault$1.timeAxis = zrUtil$j.defaults({
    scale: true,
    min: "dataMin",
    max: "dataMax"
  }, axisDefault$1.valueAxis);
  axisDefault$1.logAxis = zrUtil$j.defaults({
    scale: true,
    logBase: 10
  }, axisDefault$1.valueAxis);
  var _default$9 = axisDefault$1;
  var axisDefault_1 = _default$9;
  var zrUtil$i = util$6;
  var axisDefault = axisDefault_1;
  var ComponentModel$2 = Component$2;
  var _layout$2 = layout$4;
  var getLayoutParams = _layout$2.getLayoutParams;
  var mergeLayoutParam = _layout$2.mergeLayoutParam;
  var OrdinalMeta = OrdinalMeta_1;
  var AXIS_TYPES = ["value", "category", "time", "log"];
  function _default$8(axisName, BaseAxisModelClass, axisTypeDefaulter, extraDefaultOption) {
    zrUtil$i.each(AXIS_TYPES, function(axisType) {
      BaseAxisModelClass.extend({
        type: axisName + "Axis." + axisType,
        mergeDefaultAndTheme: function(option, ecModel) {
          var layoutMode = this.layoutMode;
          var inputPositionParams = layoutMode ? getLayoutParams(option) : {};
          var themeModel = ecModel.getTheme();
          zrUtil$i.merge(option, themeModel.get(axisType + "Axis"));
          zrUtil$i.merge(option, this.getDefaultOption());
          option.type = axisTypeDefaulter(axisName, option);
          if (layoutMode) {
            mergeLayoutParam(option, inputPositionParams, layoutMode);
          }
        },
        optionUpdated: function() {
          var thisOption = this.option;
          if (thisOption.type === "category") {
            this.__ordinalMeta = OrdinalMeta.createByAxisModel(this);
          }
        },
        getCategories: function(rawData) {
          var option = this.option;
          if (option.type === "category") {
            if (rawData) {
              return option.data;
            }
            return this.__ordinalMeta.categories;
          }
        },
        getOrdinalMeta: function() {
          return this.__ordinalMeta;
        },
        defaultOption: zrUtil$i.mergeAll([{}, axisDefault[axisType + "Axis"], extraDefaultOption], true)
      });
    });
    ComponentModel$2.registerSubTypeDefaulter(axisName + "Axis", zrUtil$i.curry(axisTypeDefaulter, axisName));
  }
  var axisModelCreator$1 = _default$8;
  var zrUtil$h = util$6;
  var ComponentModel$1 = Component$2;
  var axisModelCreator = axisModelCreator$1;
  var axisModelCommonMixin = axisModelCommonMixin$2;
  var AxisModel = ComponentModel$1.extend({
    type: "cartesian2dAxis",
    axis: null,
    init: function() {
      AxisModel.superApply(this, "init", arguments);
      this.resetRange();
    },
    mergeOption: function() {
      AxisModel.superApply(this, "mergeOption", arguments);
      this.resetRange();
    },
    restoreData: function() {
      AxisModel.superApply(this, "restoreData", arguments);
      this.resetRange();
    },
    getCoordSysModel: function() {
      return this.ecModel.queryComponents({
        mainType: "grid",
        index: this.option.gridIndex,
        id: this.option.gridId
      })[0];
    }
  });
  function getAxisType(axisDim, option) {
    return option.type || (option.data ? "category" : "value");
  }
  zrUtil$h.merge(AxisModel.prototype, axisModelCommonMixin);
  var extraOption = {
    offset: 0
  };
  axisModelCreator("x", AxisModel, getAxisType, extraOption);
  axisModelCreator("y", AxisModel, getAxisType, extraOption);
  var ComponentModel = Component$2;
  ComponentModel.extend({
    type: "grid",
    dependencies: ["xAxis", "yAxis"],
    layoutMode: "box",
    coordinateSystem: null,
    defaultOption: {
      show: false,
      zlevel: 0,
      z: 0,
      left: "10%",
      top: 60,
      right: "10%",
      bottom: 60,
      containLabel: false,
      backgroundColor: "rgba(0,0,0,0)",
      borderWidth: 1,
      borderColor: "#ccc"
    }
  });
  var _util$1 = util$6;
  var isObject = _util$1.isObject;
  var each$7 = _util$1.each;
  var map = _util$1.map;
  var indexOf = _util$1.indexOf;
  _util$1.retrieve;
  var _layout$1 = layout$4;
  var getLayoutRect$1 = _layout$1.getLayoutRect;
  var _axisHelper$1 = axisHelper$3;
  var createScaleByModel = _axisHelper$1.createScaleByModel;
  var ifAxisCrossZero = _axisHelper$1.ifAxisCrossZero;
  var niceScaleExtent = _axisHelper$1.niceScaleExtent;
  var estimateLabelUnionRect = _axisHelper$1.estimateLabelUnionRect;
  var Cartesian2D = Cartesian2D_1;
  var Axis2D = Axis2D_1;
  var CoordinateSystem = CoordinateSystem$2;
  var _dataStackHelper = dataStackHelper;
  var getStackedDimension = _dataStackHelper.getStackedDimension;
  function isAxisUsedInTheGrid(axisModel, gridModel, ecModel) {
    return axisModel.getCoordSysModel() === gridModel;
  }
  function Grid(gridModel, ecModel, api) {
    this._coordsMap = {};
    this._coordsList = [];
    this._axesMap = {};
    this._axesList = [];
    this._initCartesian(gridModel, ecModel, api);
    this.model = gridModel;
  }
  var gridProto = Grid.prototype;
  gridProto.type = "grid";
  gridProto.axisPointerEnabled = true;
  gridProto.getRect = function() {
    return this._rect;
  };
  gridProto.update = function(ecModel, api) {
    var axesMap = this._axesMap;
    this._updateScale(ecModel, this.model);
    each$7(axesMap.x, function(xAxis) {
      niceScaleExtent(xAxis.scale, xAxis.model);
    });
    each$7(axesMap.y, function(yAxis) {
      niceScaleExtent(yAxis.scale, yAxis.model);
    });
    var onZeroRecords = {};
    each$7(axesMap.x, function(xAxis) {
      fixAxisOnZero(axesMap, "y", xAxis, onZeroRecords);
    });
    each$7(axesMap.y, function(yAxis) {
      fixAxisOnZero(axesMap, "x", yAxis, onZeroRecords);
    });
    this.resize(this.model, api);
  };
  function fixAxisOnZero(axesMap, otherAxisDim, axis, onZeroRecords) {
    axis.getAxesOnZeroOf = function() {
      return otherAxisOnZeroOf ? [otherAxisOnZeroOf] : [];
    };
    var otherAxes = axesMap[otherAxisDim];
    var otherAxisOnZeroOf;
    var axisModel = axis.model;
    var onZero = axisModel.get("axisLine.onZero");
    var onZeroAxisIndex = axisModel.get("axisLine.onZeroAxisIndex");
    if (!onZero) {
      return;
    }
    if (onZeroAxisIndex != null) {
      if (canOnZeroToAxis(otherAxes[onZeroAxisIndex])) {
        otherAxisOnZeroOf = otherAxes[onZeroAxisIndex];
      }
    } else {
      for (var idx in otherAxes) {
        if (otherAxes.hasOwnProperty(idx) && canOnZeroToAxis(otherAxes[idx]) && !onZeroRecords[getOnZeroRecordKey(otherAxes[idx])]) {
          otherAxisOnZeroOf = otherAxes[idx];
          break;
        }
      }
    }
    if (otherAxisOnZeroOf) {
      onZeroRecords[getOnZeroRecordKey(otherAxisOnZeroOf)] = true;
    }
    function getOnZeroRecordKey(axis2) {
      return axis2.dim + "_" + axis2.index;
    }
  }
  function canOnZeroToAxis(axis) {
    return axis && axis.type !== "category" && axis.type !== "time" && ifAxisCrossZero(axis);
  }
  gridProto.resize = function(gridModel, api, ignoreContainLabel) {
    var gridRect = getLayoutRect$1(gridModel.getBoxLayoutParams(), {
      width: api.getWidth(),
      height: api.getHeight()
    });
    this._rect = gridRect;
    var axesList = this._axesList;
    adjustAxes();
    if (!ignoreContainLabel && gridModel.get("containLabel")) {
      each$7(axesList, function(axis) {
        if (!axis.model.get("axisLabel.inside")) {
          var labelUnionRect = estimateLabelUnionRect(axis);
          if (labelUnionRect) {
            var dim = axis.isHorizontal() ? "height" : "width";
            var margin = axis.model.get("axisLabel.margin");
            gridRect[dim] -= labelUnionRect[dim] + margin;
            if (axis.position === "top") {
              gridRect.y += labelUnionRect.height + margin;
            } else if (axis.position === "left") {
              gridRect.x += labelUnionRect.width + margin;
            }
          }
        }
      });
      adjustAxes();
    }
    function adjustAxes() {
      each$7(axesList, function(axis) {
        var isHorizontal = axis.isHorizontal();
        var extent = isHorizontal ? [0, gridRect.width] : [0, gridRect.height];
        var idx = axis.inverse ? 1 : 0;
        axis.setExtent(extent[idx], extent[1 - idx]);
        updateAxisTransform(axis, isHorizontal ? gridRect.x : gridRect.y);
      });
    }
  };
  gridProto.getAxis = function(axisType, axisIndex) {
    var axesMapOnDim = this._axesMap[axisType];
    if (axesMapOnDim != null) {
      if (axisIndex == null) {
        for (var name in axesMapOnDim) {
          if (axesMapOnDim.hasOwnProperty(name)) {
            return axesMapOnDim[name];
          }
        }
      }
      return axesMapOnDim[axisIndex];
    }
  };
  gridProto.getAxes = function() {
    return this._axesList.slice();
  };
  gridProto.getCartesian = function(xAxisIndex, yAxisIndex) {
    if (xAxisIndex != null && yAxisIndex != null) {
      var key = "x" + xAxisIndex + "y" + yAxisIndex;
      return this._coordsMap[key];
    }
    if (isObject(xAxisIndex)) {
      yAxisIndex = xAxisIndex.yAxisIndex;
      xAxisIndex = xAxisIndex.xAxisIndex;
    }
    for (var i2 = 0, coordList = this._coordsList; i2 < coordList.length; i2++) {
      if (coordList[i2].getAxis("x").index === xAxisIndex || coordList[i2].getAxis("y").index === yAxisIndex) {
        return coordList[i2];
      }
    }
  };
  gridProto.getCartesians = function() {
    return this._coordsList.slice();
  };
  gridProto.convertToPixel = function(ecModel, finder, value) {
    var target = this._findConvertTarget(ecModel, finder);
    return target.cartesian ? target.cartesian.dataToPoint(value) : target.axis ? target.axis.toGlobalCoord(target.axis.dataToCoord(value)) : null;
  };
  gridProto.convertFromPixel = function(ecModel, finder, value) {
    var target = this._findConvertTarget(ecModel, finder);
    return target.cartesian ? target.cartesian.pointToData(value) : target.axis ? target.axis.coordToData(target.axis.toLocalCoord(value)) : null;
  };
  gridProto._findConvertTarget = function(ecModel, finder) {
    var seriesModel = finder.seriesModel;
    var xAxisModel = finder.xAxisModel || seriesModel && seriesModel.getReferringComponents("xAxis")[0];
    var yAxisModel = finder.yAxisModel || seriesModel && seriesModel.getReferringComponents("yAxis")[0];
    var gridModel = finder.gridModel;
    var coordsList = this._coordsList;
    var cartesian;
    var axis;
    if (seriesModel) {
      cartesian = seriesModel.coordinateSystem;
      indexOf(coordsList, cartesian) < 0 && (cartesian = null);
    } else if (xAxisModel && yAxisModel) {
      cartesian = this.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
    } else if (xAxisModel) {
      axis = this.getAxis("x", xAxisModel.componentIndex);
    } else if (yAxisModel) {
      axis = this.getAxis("y", yAxisModel.componentIndex);
    } else if (gridModel) {
      var grid = gridModel.coordinateSystem;
      if (grid === this) {
        cartesian = this._coordsList[0];
      }
    }
    return {
      cartesian,
      axis
    };
  };
  gridProto.containPoint = function(point) {
    var coord = this._coordsList[0];
    if (coord) {
      return coord.containPoint(point);
    }
  };
  gridProto._initCartesian = function(gridModel, ecModel, api) {
    var axisPositionUsed = {
      left: false,
      right: false,
      top: false,
      bottom: false
    };
    var axesMap = {
      x: {},
      y: {}
    };
    var axesCount = {
      x: 0,
      y: 0
    };
    ecModel.eachComponent("xAxis", createAxisCreator("x"), this);
    ecModel.eachComponent("yAxis", createAxisCreator("y"), this);
    if (!axesCount.x || !axesCount.y) {
      this._axesMap = {};
      this._axesList = [];
      return;
    }
    this._axesMap = axesMap;
    each$7(axesMap.x, function(xAxis, xAxisIndex) {
      each$7(axesMap.y, function(yAxis, yAxisIndex) {
        var key = "x" + xAxisIndex + "y" + yAxisIndex;
        var cartesian = new Cartesian2D(key);
        cartesian.grid = this;
        cartesian.model = gridModel;
        this._coordsMap[key] = cartesian;
        this._coordsList.push(cartesian);
        cartesian.addAxis(xAxis);
        cartesian.addAxis(yAxis);
      }, this);
    }, this);
    function createAxisCreator(axisType) {
      return function(axisModel, idx) {
        if (!isAxisUsedInTheGrid(axisModel, gridModel)) {
          return;
        }
        var axisPosition = axisModel.get("position");
        if (axisType === "x") {
          if (axisPosition !== "top" && axisPosition !== "bottom") {
            axisPosition = axisPositionUsed.bottom ? "top" : "bottom";
          }
        } else {
          if (axisPosition !== "left" && axisPosition !== "right") {
            axisPosition = axisPositionUsed.left ? "right" : "left";
          }
        }
        axisPositionUsed[axisPosition] = true;
        var axis = new Axis2D(axisType, createScaleByModel(axisModel), [0, 0], axisModel.get("type"), axisPosition);
        var isCategory2 = axis.type === "category";
        axis.onBand = isCategory2 && axisModel.get("boundaryGap");
        axis.inverse = axisModel.get("inverse");
        axisModel.axis = axis;
        axis.model = axisModel;
        axis.grid = this;
        axis.index = idx;
        this._axesList.push(axis);
        axesMap[axisType][idx] = axis;
        axesCount[axisType]++;
      };
    }
  };
  gridProto._updateScale = function(ecModel, gridModel) {
    each$7(this._axesList, function(axis) {
      axis.scale.setExtent(Infinity, -Infinity);
    });
    ecModel.eachSeries(function(seriesModel) {
      if (isCartesian2D(seriesModel)) {
        var axesModels = findAxesModels(seriesModel);
        var xAxisModel = axesModels[0];
        var yAxisModel = axesModels[1];
        if (!isAxisUsedInTheGrid(xAxisModel, gridModel) || !isAxisUsedInTheGrid(yAxisModel, gridModel)) {
          return;
        }
        var cartesian = this.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
        var data = seriesModel.getData();
        var xAxis = cartesian.getAxis("x");
        var yAxis = cartesian.getAxis("y");
        if (data.type === "list") {
          unionExtent(data, xAxis);
          unionExtent(data, yAxis);
        }
      }
    }, this);
    function unionExtent(data, axis, seriesModel) {
      each$7(data.mapDimension(axis.dim, true), function(dim) {
        axis.scale.unionExtentFromData(data, getStackedDimension(data, dim));
      });
    }
  };
  gridProto.getTooltipAxes = function(dim) {
    var baseAxes = [];
    var otherAxes = [];
    each$7(this.getCartesians(), function(cartesian) {
      var baseAxis = dim != null && dim !== "auto" ? cartesian.getAxis(dim) : cartesian.getBaseAxis();
      var otherAxis = cartesian.getOtherAxis(baseAxis);
      indexOf(baseAxes, baseAxis) < 0 && baseAxes.push(baseAxis);
      indexOf(otherAxes, otherAxis) < 0 && otherAxes.push(otherAxis);
    });
    return {
      baseAxes,
      otherAxes
    };
  };
  function updateAxisTransform(axis, coordBase) {
    var axisExtent = axis.getExtent();
    var axisExtentSum = axisExtent[0] + axisExtent[1];
    axis.toGlobalCoord = axis.dim === "x" ? function(coord) {
      return coord + coordBase;
    } : function(coord) {
      return axisExtentSum - coord + coordBase;
    };
    axis.toLocalCoord = axis.dim === "x" ? function(coord) {
      return coord - coordBase;
    } : function(coord) {
      return axisExtentSum - coord + coordBase;
    };
  }
  var axesTypes = ["xAxis", "yAxis"];
  function findAxesModels(seriesModel, ecModel) {
    return map(axesTypes, function(axisType) {
      var axisModel = seriesModel.getReferringComponents(axisType)[0];
      return axisModel;
    });
  }
  function isCartesian2D(seriesModel) {
    return seriesModel.get("coordinateSystem") === "cartesian2d";
  }
  Grid.create = function(ecModel, api) {
    var grids = [];
    ecModel.eachComponent("grid", function(gridModel, idx) {
      var grid = new Grid(gridModel, ecModel, api);
      grid.name = "grid_" + idx;
      grid.resize(gridModel, api, true);
      gridModel.coordinateSystem = grid;
      grids.push(grid);
    });
    ecModel.eachSeries(function(seriesModel) {
      if (!isCartesian2D(seriesModel)) {
        return;
      }
      var axesModels = findAxesModels(seriesModel);
      var xAxisModel = axesModels[0];
      var yAxisModel = axesModels[1];
      var gridModel = xAxisModel.getCoordSysModel();
      var grid = gridModel.coordinateSystem;
      seriesModel.coordinateSystem = grid.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
    });
    return grids;
  };
  Grid.dimensions = Grid.prototype.dimensions = Cartesian2D.prototype.dimensions;
  CoordinateSystem.register("cartesian2d", Grid);
  var _util = util$6;
  var retrieve = _util.retrieve;
  var defaults = _util.defaults;
  var extend = _util.extend;
  var each$6 = _util.each;
  var formatUtil$4 = format;
  var graphic$8 = graphic$g;
  var Model$3 = Model_1;
  var _number = number;
  var isRadianAroundZero = _number.isRadianAroundZero;
  var remRadian = _number.remRadian;
  var _symbol$1 = symbol$1;
  var createSymbol$1 = _symbol$1.createSymbol;
  var matrixUtil = matrix$6;
  var _vector = vector$3;
  var v2ApplyTransform = _vector.applyTransform;
  var _axisHelper = axisHelper$3;
  var shouldShowAllLabels = _axisHelper.shouldShowAllLabels;
  var PI = Math.PI;
  var AxisBuilder$2 = function(axisModel, opt) {
    this.opt = opt;
    this.axisModel = axisModel;
    defaults(opt, {
      labelOffset: 0,
      nameDirection: 1,
      tickDirection: 1,
      labelDirection: 1,
      silent: true
    });
    this.group = new graphic$8.Group();
    var dumbGroup = new graphic$8.Group({
      position: opt.position.slice(),
      rotation: opt.rotation
    });
    dumbGroup.updateTransform();
    this._transform = dumbGroup.transform;
    this._dumbGroup = dumbGroup;
  };
  AxisBuilder$2.prototype = {
    constructor: AxisBuilder$2,
    hasBuilder: function(name) {
      return !!builders[name];
    },
    add: function(name) {
      builders[name].call(this);
    },
    getGroup: function() {
      return this.group;
    }
  };
  var builders = {
    axisLine: function() {
      var opt = this.opt;
      var axisModel = this.axisModel;
      if (!axisModel.get("axisLine.show")) {
        return;
      }
      var extent = this.axisModel.axis.getExtent();
      var matrix2 = this._transform;
      var pt1 = [extent[0], 0];
      var pt2 = [extent[1], 0];
      if (matrix2) {
        v2ApplyTransform(pt1, pt1, matrix2);
        v2ApplyTransform(pt2, pt2, matrix2);
      }
      var lineStyle2 = extend({
        lineCap: "round"
      }, axisModel.getModel("axisLine.lineStyle").getLineStyle());
      this.group.add(new graphic$8.Line({
        anid: "line",
        subPixelOptimize: true,
        shape: {
          x1: pt1[0],
          y1: pt1[1],
          x2: pt2[0],
          y2: pt2[1]
        },
        style: lineStyle2,
        strokeContainThreshold: opt.strokeContainThreshold || 5,
        silent: true,
        z2: 1
      }));
      var arrows = axisModel.get("axisLine.symbol");
      var arrowSize = axisModel.get("axisLine.symbolSize");
      var arrowOffset = axisModel.get("axisLine.symbolOffset") || 0;
      if (typeof arrowOffset === "number") {
        arrowOffset = [arrowOffset, arrowOffset];
      }
      if (arrows != null) {
        if (typeof arrows === "string") {
          arrows = [arrows, arrows];
        }
        if (typeof arrowSize === "string" || typeof arrowSize === "number") {
          arrowSize = [arrowSize, arrowSize];
        }
        var symbolWidth = arrowSize[0];
        var symbolHeight = arrowSize[1];
        each$6([{
          rotate: opt.rotation + Math.PI / 2,
          offset: arrowOffset[0],
          r: 0
        }, {
          rotate: opt.rotation - Math.PI / 2,
          offset: arrowOffset[1],
          r: Math.sqrt((pt1[0] - pt2[0]) * (pt1[0] - pt2[0]) + (pt1[1] - pt2[1]) * (pt1[1] - pt2[1]))
        }], function(point, index2) {
          if (arrows[index2] !== "none" && arrows[index2] != null) {
            var symbol2 = createSymbol$1(arrows[index2], -symbolWidth / 2, -symbolHeight / 2, symbolWidth, symbolHeight, lineStyle2.stroke, true);
            var r = point.r + point.offset;
            var pos = [pt1[0] + r * Math.cos(opt.rotation), pt1[1] - r * Math.sin(opt.rotation)];
            symbol2.attr({
              rotation: point.rotate,
              position: pos,
              silent: true,
              z2: 11
            });
            this.group.add(symbol2);
          }
        }, this);
      }
    },
    axisTickLabel: function() {
      var axisModel = this.axisModel;
      var opt = this.opt;
      var ticksEls = buildAxisMajorTicks(this, axisModel, opt);
      var labelEls = buildAxisLabel(this, axisModel, opt);
      fixMinMaxLabelShow(axisModel, labelEls, ticksEls);
      buildAxisMinorTicks(this, axisModel, opt);
    },
    axisName: function() {
      var opt = this.opt;
      var axisModel = this.axisModel;
      var name = retrieve(opt.axisName, axisModel.get("name"));
      if (!name) {
        return;
      }
      var nameLocation = axisModel.get("nameLocation");
      var nameDirection = opt.nameDirection;
      var textStyleModel = axisModel.getModel("nameTextStyle");
      var gap = axisModel.get("nameGap") || 0;
      var extent = this.axisModel.axis.getExtent();
      var gapSignal = extent[0] > extent[1] ? -1 : 1;
      var pos = [
        nameLocation === "start" ? extent[0] - gapSignal * gap : nameLocation === "end" ? extent[1] + gapSignal * gap : (extent[0] + extent[1]) / 2,
        isNameLocationCenter(nameLocation) ? opt.labelOffset + nameDirection * gap : 0
      ];
      var labelLayout;
      var nameRotation = axisModel.get("nameRotate");
      if (nameRotation != null) {
        nameRotation = nameRotation * PI / 180;
      }
      var axisNameAvailableWidth;
      if (isNameLocationCenter(nameLocation)) {
        labelLayout = innerTextLayout(opt.rotation, nameRotation != null ? nameRotation : opt.rotation, nameDirection);
      } else {
        labelLayout = endTextLayout(opt, nameLocation, nameRotation || 0, extent);
        axisNameAvailableWidth = opt.axisNameAvailableWidth;
        if (axisNameAvailableWidth != null) {
          axisNameAvailableWidth = Math.abs(axisNameAvailableWidth / Math.sin(labelLayout.rotation));
          !isFinite(axisNameAvailableWidth) && (axisNameAvailableWidth = null);
        }
      }
      var textFont = textStyleModel.getFont();
      var truncateOpt = axisModel.get("nameTruncate", true) || {};
      var ellipsis = truncateOpt.ellipsis;
      var maxWidth = retrieve(opt.nameTruncateMaxWidth, truncateOpt.maxWidth, axisNameAvailableWidth);
      var truncatedText = ellipsis != null && maxWidth != null ? formatUtil$4.truncateText(name, maxWidth, textFont, ellipsis, {
        minChar: 2,
        placeholder: truncateOpt.placeholder
      }) : name;
      var tooltipOpt = axisModel.get("tooltip", true);
      var mainType = axisModel.mainType;
      var formatterParams = {
        componentType: mainType,
        name,
        $vars: ["name"]
      };
      formatterParams[mainType + "Index"] = axisModel.componentIndex;
      var textEl = new graphic$8.Text({
        anid: "name",
        __fullText: name,
        __truncatedText: truncatedText,
        position: pos,
        rotation: labelLayout.rotation,
        silent: isLabelSilent(axisModel),
        z2: 1,
        tooltip: tooltipOpt && tooltipOpt.show ? extend({
          content: name,
          formatter: function() {
            return name;
          },
          formatterParams
        }, tooltipOpt) : null
      });
      graphic$8.setTextStyle(textEl.style, textStyleModel, {
        text: truncatedText,
        textFont,
        textFill: textStyleModel.getTextColor() || axisModel.get("axisLine.lineStyle.color"),
        textAlign: textStyleModel.get("align") || labelLayout.textAlign,
        textVerticalAlign: textStyleModel.get("verticalAlign") || labelLayout.textVerticalAlign
      });
      if (axisModel.get("triggerEvent")) {
        textEl.eventData = makeAxisEventDataBase(axisModel);
        textEl.eventData.targetType = "axisName";
        textEl.eventData.name = name;
      }
      this._dumbGroup.add(textEl);
      textEl.updateTransform();
      this.group.add(textEl);
      textEl.decomposeTransform();
    }
  };
  var makeAxisEventDataBase = AxisBuilder$2.makeAxisEventDataBase = function(axisModel) {
    var eventData = {
      componentType: axisModel.mainType,
      componentIndex: axisModel.componentIndex
    };
    eventData[axisModel.mainType + "Index"] = axisModel.componentIndex;
    return eventData;
  };
  var innerTextLayout = AxisBuilder$2.innerTextLayout = function(axisRotation, textRotation, direction) {
    var rotationDiff = remRadian(textRotation - axisRotation);
    var textAlign;
    var textVerticalAlign;
    if (isRadianAroundZero(rotationDiff)) {
      textVerticalAlign = direction > 0 ? "top" : "bottom";
      textAlign = "center";
    } else if (isRadianAroundZero(rotationDiff - PI)) {
      textVerticalAlign = direction > 0 ? "bottom" : "top";
      textAlign = "center";
    } else {
      textVerticalAlign = "middle";
      if (rotationDiff > 0 && rotationDiff < PI) {
        textAlign = direction > 0 ? "right" : "left";
      } else {
        textAlign = direction > 0 ? "left" : "right";
      }
    }
    return {
      rotation: rotationDiff,
      textAlign,
      textVerticalAlign
    };
  };
  function endTextLayout(opt, textPosition, textRotate, extent) {
    var rotationDiff = remRadian(textRotate - opt.rotation);
    var textAlign;
    var textVerticalAlign;
    var inverse = extent[0] > extent[1];
    var onLeft = textPosition === "start" && !inverse || textPosition !== "start" && inverse;
    if (isRadianAroundZero(rotationDiff - PI / 2)) {
      textVerticalAlign = onLeft ? "bottom" : "top";
      textAlign = "center";
    } else if (isRadianAroundZero(rotationDiff - PI * 1.5)) {
      textVerticalAlign = onLeft ? "top" : "bottom";
      textAlign = "center";
    } else {
      textVerticalAlign = "middle";
      if (rotationDiff < PI * 1.5 && rotationDiff > PI / 2) {
        textAlign = onLeft ? "left" : "right";
      } else {
        textAlign = onLeft ? "right" : "left";
      }
    }
    return {
      rotation: rotationDiff,
      textAlign,
      textVerticalAlign
    };
  }
  var isLabelSilent = AxisBuilder$2.isLabelSilent = function(axisModel) {
    var tooltipOpt = axisModel.get("tooltip");
    return axisModel.get("silent") || !(axisModel.get("triggerEvent") || tooltipOpt && tooltipOpt.show);
  };
  function fixMinMaxLabelShow(axisModel, labelEls, tickEls) {
    if (shouldShowAllLabels(axisModel.axis)) {
      return;
    }
    var showMinLabel = axisModel.get("axisLabel.showMinLabel");
    var showMaxLabel = axisModel.get("axisLabel.showMaxLabel");
    labelEls = labelEls || [];
    tickEls = tickEls || [];
    var firstLabel = labelEls[0];
    var nextLabel = labelEls[1];
    var lastLabel = labelEls[labelEls.length - 1];
    var prevLabel = labelEls[labelEls.length - 2];
    var firstTick = tickEls[0];
    var nextTick = tickEls[1];
    var lastTick = tickEls[tickEls.length - 1];
    var prevTick = tickEls[tickEls.length - 2];
    if (showMinLabel === false) {
      ignoreEl(firstLabel);
      ignoreEl(firstTick);
    } else if (isTwoLabelOverlapped(firstLabel, nextLabel)) {
      if (showMinLabel) {
        ignoreEl(nextLabel);
        ignoreEl(nextTick);
      } else {
        ignoreEl(firstLabel);
        ignoreEl(firstTick);
      }
    }
    if (showMaxLabel === false) {
      ignoreEl(lastLabel);
      ignoreEl(lastTick);
    } else if (isTwoLabelOverlapped(prevLabel, lastLabel)) {
      if (showMaxLabel) {
        ignoreEl(prevLabel);
        ignoreEl(prevTick);
      } else {
        ignoreEl(lastLabel);
        ignoreEl(lastTick);
      }
    }
  }
  function ignoreEl(el) {
    el && (el.ignore = true);
  }
  function isTwoLabelOverlapped(current, next, labelLayout) {
    var firstRect = current && current.getBoundingRect().clone();
    var nextRect = next && next.getBoundingRect().clone();
    if (!firstRect || !nextRect) {
      return;
    }
    var mRotationBack = matrixUtil.identity([]);
    matrixUtil.rotate(mRotationBack, mRotationBack, -current.rotation);
    firstRect.applyTransform(matrixUtil.mul([], mRotationBack, current.getLocalTransform()));
    nextRect.applyTransform(matrixUtil.mul([], mRotationBack, next.getLocalTransform()));
    return firstRect.intersect(nextRect);
  }
  function isNameLocationCenter(nameLocation) {
    return nameLocation === "middle" || nameLocation === "center";
  }
  function createTicks(ticksCoords, tickTransform, tickEndCoord, tickLineStyle, aniid) {
    var tickEls = [];
    var pt1 = [];
    var pt2 = [];
    for (var i2 = 0; i2 < ticksCoords.length; i2++) {
      var tickCoord = ticksCoords[i2].coord;
      pt1[0] = tickCoord;
      pt1[1] = 0;
      pt2[0] = tickCoord;
      pt2[1] = tickEndCoord;
      if (tickTransform) {
        v2ApplyTransform(pt1, pt1, tickTransform);
        v2ApplyTransform(pt2, pt2, tickTransform);
      }
      var tickEl = new graphic$8.Line({
        anid: aniid + "_" + ticksCoords[i2].tickValue,
        subPixelOptimize: true,
        shape: {
          x1: pt1[0],
          y1: pt1[1],
          x2: pt2[0],
          y2: pt2[1]
        },
        style: tickLineStyle,
        z2: 2,
        silent: true
      });
      tickEls.push(tickEl);
    }
    return tickEls;
  }
  function buildAxisMajorTicks(axisBuilder, axisModel, opt) {
    var axis = axisModel.axis;
    var tickModel = axisModel.getModel("axisTick");
    if (!tickModel.get("show") || axis.scale.isBlank()) {
      return;
    }
    var lineStyleModel = tickModel.getModel("lineStyle");
    var tickEndCoord = opt.tickDirection * tickModel.get("length");
    var ticksCoords = axis.getTicksCoords();
    var ticksEls = createTicks(ticksCoords, axisBuilder._transform, tickEndCoord, defaults(lineStyleModel.getLineStyle(), {
      stroke: axisModel.get("axisLine.lineStyle.color")
    }), "ticks");
    for (var i2 = 0; i2 < ticksEls.length; i2++) {
      axisBuilder.group.add(ticksEls[i2]);
    }
    return ticksEls;
  }
  function buildAxisMinorTicks(axisBuilder, axisModel, opt) {
    var axis = axisModel.axis;
    var minorTickModel = axisModel.getModel("minorTick");
    if (!minorTickModel.get("show") || axis.scale.isBlank()) {
      return;
    }
    var minorTicksCoords = axis.getMinorTicksCoords();
    if (!minorTicksCoords.length) {
      return;
    }
    var lineStyleModel = minorTickModel.getModel("lineStyle");
    var tickEndCoord = opt.tickDirection * minorTickModel.get("length");
    var minorTickLineStyle = defaults(lineStyleModel.getLineStyle(), defaults(axisModel.getModel("axisTick").getLineStyle(), {
      stroke: axisModel.get("axisLine.lineStyle.color")
    }));
    for (var i2 = 0; i2 < minorTicksCoords.length; i2++) {
      var minorTicksEls = createTicks(minorTicksCoords[i2], axisBuilder._transform, tickEndCoord, minorTickLineStyle, "minorticks_" + i2);
      for (var k = 0; k < minorTicksEls.length; k++) {
        axisBuilder.group.add(minorTicksEls[k]);
      }
    }
  }
  function buildAxisLabel(axisBuilder, axisModel, opt) {
    var axis = axisModel.axis;
    var show = retrieve(opt.axisLabelShow, axisModel.get("axisLabel.show"));
    if (!show || axis.scale.isBlank()) {
      return;
    }
    var labelModel = axisModel.getModel("axisLabel");
    var labelMargin = labelModel.get("margin");
    var labels = axis.getViewLabels();
    var labelRotation = (retrieve(opt.labelRotate, labelModel.get("rotate")) || 0) * PI / 180;
    var labelLayout = innerTextLayout(opt.rotation, labelRotation, opt.labelDirection);
    var rawCategoryData = axisModel.getCategories && axisModel.getCategories(true);
    var labelEls = [];
    var silent = isLabelSilent(axisModel);
    var triggerEvent = axisModel.get("triggerEvent");
    each$6(labels, function(labelItem, index2) {
      var tickValue = labelItem.tickValue;
      var formattedLabel = labelItem.formattedLabel;
      var rawLabel = labelItem.rawLabel;
      var itemLabelModel = labelModel;
      if (rawCategoryData && rawCategoryData[tickValue] && rawCategoryData[tickValue].textStyle) {
        itemLabelModel = new Model$3(rawCategoryData[tickValue].textStyle, labelModel, axisModel.ecModel);
      }
      var textColor = itemLabelModel.getTextColor() || axisModel.get("axisLine.lineStyle.color");
      var tickCoord = axis.dataToCoord(tickValue);
      var pos = [tickCoord, opt.labelOffset + opt.labelDirection * labelMargin];
      var textEl = new graphic$8.Text({
        anid: "label_" + tickValue,
        position: pos,
        rotation: labelLayout.rotation,
        silent,
        z2: 10
      });
      graphic$8.setTextStyle(textEl.style, itemLabelModel, {
        text: formattedLabel,
        textAlign: itemLabelModel.getShallow("align", true) || labelLayout.textAlign,
        textVerticalAlign: itemLabelModel.getShallow("verticalAlign", true) || itemLabelModel.getShallow("baseline", true) || labelLayout.textVerticalAlign,
        textFill: typeof textColor === "function" ? textColor(axis.type === "category" ? rawLabel : axis.type === "value" ? tickValue + "" : tickValue, index2) : textColor
      });
      if (triggerEvent) {
        textEl.eventData = makeAxisEventDataBase(axisModel);
        textEl.eventData.targetType = "axisLabel";
        textEl.eventData.value = rawLabel;
      }
      axisBuilder._dumbGroup.add(textEl);
      textEl.updateTransform();
      labelEls.push(textEl);
      axisBuilder.group.add(textEl);
      textEl.decomposeTransform();
    });
    return labelEls;
  }
  var _default$7 = AxisBuilder$2;
  var AxisBuilder_1 = _default$7;
  var modelHelper$1 = {};
  var zrUtil$g = util$6;
  var Model$2 = Model_1;
  var each$5 = zrUtil$g.each;
  var curry$2 = zrUtil$g.curry;
  function collect(ecModel, api) {
    var result = {
      axesInfo: {},
      seriesInvolved: false,
      coordSysAxesInfo: {},
      coordSysMap: {}
    };
    collectAxesInfo(result, ecModel, api);
    result.seriesInvolved && collectSeriesInfo(result, ecModel);
    return result;
  }
  function collectAxesInfo(result, ecModel, api) {
    var globalTooltipModel = ecModel.getComponent("tooltip");
    var globalAxisPointerModel = ecModel.getComponent("axisPointer");
    var linksOption = globalAxisPointerModel.get("link", true) || [];
    var linkGroups = [];
    each$5(api.getCoordinateSystems(), function(coordSys) {
      if (!coordSys.axisPointerEnabled) {
        return;
      }
      var coordSysKey = makeKey(coordSys.model);
      var axesInfoInCoordSys = result.coordSysAxesInfo[coordSysKey] = {};
      result.coordSysMap[coordSysKey] = coordSys;
      var coordSysModel = coordSys.model;
      var baseTooltipModel = coordSysModel.getModel("tooltip", globalTooltipModel);
      each$5(coordSys.getAxes(), curry$2(saveTooltipAxisInfo, false, null));
      if (coordSys.getTooltipAxes && globalTooltipModel && baseTooltipModel.get("show")) {
        var triggerAxis = baseTooltipModel.get("trigger") === "axis";
        var cross = baseTooltipModel.get("axisPointer.type") === "cross";
        var tooltipAxes = coordSys.getTooltipAxes(baseTooltipModel.get("axisPointer.axis"));
        if (triggerAxis || cross) {
          each$5(tooltipAxes.baseAxes, curry$2(saveTooltipAxisInfo, cross ? "cross" : true, triggerAxis));
        }
        if (cross) {
          each$5(tooltipAxes.otherAxes, curry$2(saveTooltipAxisInfo, "cross", false));
        }
      }
      function saveTooltipAxisInfo(fromTooltip, triggerTooltip, axis) {
        var axisPointerModel = axis.model.getModel("axisPointer", globalAxisPointerModel);
        var axisPointerShow = axisPointerModel.get("show");
        if (!axisPointerShow || axisPointerShow === "auto" && !fromTooltip && !isHandleTrigger(axisPointerModel)) {
          return;
        }
        if (triggerTooltip == null) {
          triggerTooltip = axisPointerModel.get("triggerTooltip");
        }
        axisPointerModel = fromTooltip ? makeAxisPointerModel(axis, baseTooltipModel, globalAxisPointerModel, ecModel, fromTooltip, triggerTooltip) : axisPointerModel;
        var snap = axisPointerModel.get("snap");
        var key = makeKey(axis.model);
        var involveSeries = triggerTooltip || snap || axis.type === "category";
        var axisInfo = result.axesInfo[key] = {
          key,
          axis,
          coordSys,
          axisPointerModel,
          triggerTooltip,
          involveSeries,
          snap,
          useHandle: isHandleTrigger(axisPointerModel),
          seriesModels: []
        };
        axesInfoInCoordSys[key] = axisInfo;
        result.seriesInvolved |= involveSeries;
        var groupIndex = getLinkGroupIndex(linksOption, axis);
        if (groupIndex != null) {
          var linkGroup = linkGroups[groupIndex] || (linkGroups[groupIndex] = {
            axesInfo: {}
          });
          linkGroup.axesInfo[key] = axisInfo;
          linkGroup.mapper = linksOption[groupIndex].mapper;
          axisInfo.linkGroup = linkGroup;
        }
      }
    });
  }
  function makeAxisPointerModel(axis, baseTooltipModel, globalAxisPointerModel, ecModel, fromTooltip, triggerTooltip) {
    var tooltipAxisPointerModel = baseTooltipModel.getModel("axisPointer");
    var volatileOption = {};
    each$5(["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], function(field) {
      volatileOption[field] = zrUtil$g.clone(tooltipAxisPointerModel.get(field));
    });
    volatileOption.snap = axis.type !== "category" && !!triggerTooltip;
    if (tooltipAxisPointerModel.get("type") === "cross") {
      volatileOption.type = "line";
    }
    var labelOption = volatileOption.label || (volatileOption.label = {});
    labelOption.show == null && (labelOption.show = false);
    if (fromTooltip === "cross") {
      var tooltipAxisPointerLabelShow = tooltipAxisPointerModel.get("label.show");
      labelOption.show = tooltipAxisPointerLabelShow != null ? tooltipAxisPointerLabelShow : true;
      if (!triggerTooltip) {
        var crossStyle = volatileOption.lineStyle = tooltipAxisPointerModel.get("crossStyle");
        crossStyle && zrUtil$g.defaults(labelOption, crossStyle.textStyle);
      }
    }
    return axis.model.getModel("axisPointer", new Model$2(volatileOption, globalAxisPointerModel, ecModel));
  }
  function collectSeriesInfo(result, ecModel) {
    ecModel.eachSeries(function(seriesModel) {
      var coordSys = seriesModel.coordinateSystem;
      var seriesTooltipTrigger = seriesModel.get("tooltip.trigger", true);
      var seriesTooltipShow = seriesModel.get("tooltip.show", true);
      if (!coordSys || seriesTooltipTrigger === "none" || seriesTooltipTrigger === false || seriesTooltipTrigger === "item" || seriesTooltipShow === false || seriesModel.get("axisPointer.show", true) === false) {
        return;
      }
      each$5(result.coordSysAxesInfo[makeKey(coordSys.model)], function(axisInfo) {
        var axis = axisInfo.axis;
        if (coordSys.getAxis(axis.dim) === axis) {
          axisInfo.seriesModels.push(seriesModel);
          axisInfo.seriesDataCount == null && (axisInfo.seriesDataCount = 0);
          axisInfo.seriesDataCount += seriesModel.getData().count();
        }
      });
    }, this);
  }
  function getLinkGroupIndex(linksOption, axis) {
    var axisModel = axis.model;
    var dim = axis.dim;
    for (var i2 = 0; i2 < linksOption.length; i2++) {
      var linkOption = linksOption[i2] || {};
      if (checkPropInLink(linkOption[dim + "AxisId"], axisModel.id) || checkPropInLink(linkOption[dim + "AxisIndex"], axisModel.componentIndex) || checkPropInLink(linkOption[dim + "AxisName"], axisModel.name)) {
        return i2;
      }
    }
  }
  function checkPropInLink(linkPropValue, axisPropValue) {
    return linkPropValue === "all" || zrUtil$g.isArray(linkPropValue) && zrUtil$g.indexOf(linkPropValue, axisPropValue) >= 0 || linkPropValue === axisPropValue;
  }
  function fixValue(axisModel) {
    var axisInfo = getAxisInfo(axisModel);
    if (!axisInfo) {
      return;
    }
    var axisPointerModel = axisInfo.axisPointerModel;
    var scale2 = axisInfo.axis.scale;
    var option = axisPointerModel.option;
    var status = axisPointerModel.get("status");
    var value = axisPointerModel.get("value");
    if (value != null) {
      value = scale2.parse(value);
    }
    var useHandle = isHandleTrigger(axisPointerModel);
    if (status == null) {
      option.status = useHandle ? "show" : "hide";
    }
    var extent = scale2.getExtent().slice();
    extent[0] > extent[1] && extent.reverse();
    if (value == null || value > extent[1]) {
      value = extent[1];
    }
    if (value < extent[0]) {
      value = extent[0];
    }
    option.value = value;
    if (useHandle) {
      option.status = axisInfo.axis.scale.isBlank() ? "hide" : "show";
    }
  }
  function getAxisInfo(axisModel) {
    var coordSysAxesInfo = (axisModel.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
    return coordSysAxesInfo && coordSysAxesInfo.axesInfo[makeKey(axisModel)];
  }
  function getAxisPointerModel(axisModel) {
    var axisInfo = getAxisInfo(axisModel);
    return axisInfo && axisInfo.axisPointerModel;
  }
  function isHandleTrigger(axisPointerModel) {
    return !!axisPointerModel.get("handle.show");
  }
  function makeKey(model2) {
    return model2.type + "||" + model2.id;
  }
  modelHelper$1.collect = collect;
  modelHelper$1.fixValue = fixValue;
  modelHelper$1.getAxisInfo = getAxisInfo;
  modelHelper$1.getAxisPointerModel = getAxisPointerModel;
  modelHelper$1.makeKey = makeKey;
  var echarts$c = echarts$d;
  var axisPointerModelHelper$2 = modelHelper$1;
  var AxisView$2 = echarts$c.extendComponentView({
    type: "axis",
    _axisPointer: null,
    axisPointerClass: null,
    render: function(axisModel, ecModel, api, payload) {
      this.axisPointerClass && axisPointerModelHelper$2.fixValue(axisModel);
      AxisView$2.superApply(this, "render", arguments);
      updateAxisPointer(this, axisModel, ecModel, api, payload, true);
    },
    updateAxisPointer: function(axisModel, ecModel, api, payload, force) {
      updateAxisPointer(this, axisModel, ecModel, api, payload, false);
    },
    remove: function(ecModel, api) {
      var axisPointer = this._axisPointer;
      axisPointer && axisPointer.remove(api);
      AxisView$2.superApply(this, "remove", arguments);
    },
    dispose: function(ecModel, api) {
      disposeAxisPointer(this, api);
      AxisView$2.superApply(this, "dispose", arguments);
    }
  });
  function updateAxisPointer(axisView, axisModel, ecModel, api, payload, forceRender) {
    var Clazz = AxisView$2.getAxisPointerClass(axisView.axisPointerClass);
    if (!Clazz) {
      return;
    }
    var axisPointerModel = axisPointerModelHelper$2.getAxisPointerModel(axisModel);
    axisPointerModel ? (axisView._axisPointer || (axisView._axisPointer = new Clazz())).render(axisModel, axisPointerModel, api, forceRender) : disposeAxisPointer(axisView, api);
  }
  function disposeAxisPointer(axisView, ecModel, api) {
    var axisPointer = axisView._axisPointer;
    axisPointer && axisPointer.dispose(ecModel, api);
    axisView._axisPointer = null;
  }
  var axisPointerClazz = [];
  AxisView$2.registerAxisPointerClass = function(type, clazz2) {
    axisPointerClazz[type] = clazz2;
  };
  AxisView$2.getAxisPointerClass = function(type) {
    return type && axisPointerClazz[type];
  };
  var _default$6 = AxisView$2;
  var AxisView_1 = _default$6;
  var cartesianAxisHelper$2 = {};
  var zrUtil$f = util$6;
  function layout$1(gridModel, axisModel, opt) {
    opt = opt || {};
    var grid = gridModel.coordinateSystem;
    var axis = axisModel.axis;
    var layout2 = {};
    var otherAxisOnZeroOf = axis.getAxesOnZeroOf()[0];
    var rawAxisPosition = axis.position;
    var axisPosition = otherAxisOnZeroOf ? "onZero" : rawAxisPosition;
    var axisDim = axis.dim;
    var rect = grid.getRect();
    var rectBound = [rect.x, rect.x + rect.width, rect.y, rect.y + rect.height];
    var idx = {
      left: 0,
      right: 1,
      top: 0,
      bottom: 1,
      onZero: 2
    };
    var axisOffset = axisModel.get("offset") || 0;
    var posBound = axisDim === "x" ? [rectBound[2] - axisOffset, rectBound[3] + axisOffset] : [rectBound[0] - axisOffset, rectBound[1] + axisOffset];
    if (otherAxisOnZeroOf) {
      var onZeroCoord = otherAxisOnZeroOf.toGlobalCoord(otherAxisOnZeroOf.dataToCoord(0));
      posBound[idx.onZero] = Math.max(Math.min(onZeroCoord, posBound[1]), posBound[0]);
    }
    layout2.position = [axisDim === "y" ? posBound[idx[axisPosition]] : rectBound[0], axisDim === "x" ? posBound[idx[axisPosition]] : rectBound[3]];
    layout2.rotation = Math.PI / 2 * (axisDim === "x" ? 0 : 1);
    var dirMap = {
      top: -1,
      bottom: 1,
      left: -1,
      right: 1
    };
    layout2.labelDirection = layout2.tickDirection = layout2.nameDirection = dirMap[rawAxisPosition];
    layout2.labelOffset = otherAxisOnZeroOf ? posBound[idx[rawAxisPosition]] - posBound[idx.onZero] : 0;
    if (axisModel.get("axisTick.inside")) {
      layout2.tickDirection = -layout2.tickDirection;
    }
    if (zrUtil$f.retrieve(opt.labelInside, axisModel.get("axisLabel.inside"))) {
      layout2.labelDirection = -layout2.labelDirection;
    }
    var labelRotate = axisModel.get("axisLabel.rotate");
    layout2.labelRotate = axisPosition === "top" ? -labelRotate : labelRotate;
    layout2.z2 = 1;
    return layout2;
  }
  cartesianAxisHelper$2.layout = layout$1;
  var axisSplitHelper = {};
  var zrUtil$e = util$6;
  var graphic$7 = graphic$g;
  function rectCoordAxisBuildSplitArea$1(axisView, axisGroup, axisModel, gridModel) {
    var axis = axisModel.axis;
    if (axis.scale.isBlank()) {
      return;
    }
    var splitAreaModel = axisModel.getModel("splitArea");
    var areaStyleModel = splitAreaModel.getModel("areaStyle");
    var areaColors = areaStyleModel.get("color");
    var gridRect = gridModel.coordinateSystem.getRect();
    var ticksCoords = axis.getTicksCoords({
      tickModel: splitAreaModel,
      clamp: true
    });
    if (!ticksCoords.length) {
      return;
    }
    var areaColorsLen = areaColors.length;
    var lastSplitAreaColors = axisView.__splitAreaColors;
    var newSplitAreaColors = zrUtil$e.createHashMap();
    var colorIndex = 0;
    if (lastSplitAreaColors) {
      for (var i2 = 0; i2 < ticksCoords.length; i2++) {
        var cIndex = lastSplitAreaColors.get(ticksCoords[i2].tickValue);
        if (cIndex != null) {
          colorIndex = (cIndex + (areaColorsLen - 1) * i2) % areaColorsLen;
          break;
        }
      }
    }
    var prev = axis.toGlobalCoord(ticksCoords[0].coord);
    var areaStyle2 = areaStyleModel.getAreaStyle();
    areaColors = zrUtil$e.isArray(areaColors) ? areaColors : [areaColors];
    for (var i2 = 1; i2 < ticksCoords.length; i2++) {
      var tickCoord = axis.toGlobalCoord(ticksCoords[i2].coord);
      var x;
      var y;
      var width;
      var height;
      if (axis.isHorizontal()) {
        x = prev;
        y = gridRect.y;
        width = tickCoord - x;
        height = gridRect.height;
        prev = x + width;
      } else {
        x = gridRect.x;
        y = prev;
        width = gridRect.width;
        height = tickCoord - y;
        prev = y + height;
      }
      var tickValue = ticksCoords[i2 - 1].tickValue;
      tickValue != null && newSplitAreaColors.set(tickValue, colorIndex);
      axisGroup.add(new graphic$7.Rect({
        anid: tickValue != null ? "area_" + tickValue : null,
        shape: {
          x,
          y,
          width,
          height
        },
        style: zrUtil$e.defaults({
          fill: areaColors[colorIndex]
        }, areaStyle2),
        silent: true
      }));
      colorIndex = (colorIndex + 1) % areaColorsLen;
    }
    axisView.__splitAreaColors = newSplitAreaColors;
  }
  function rectCoordAxisHandleRemove$1(axisView) {
    axisView.__splitAreaColors = null;
  }
  axisSplitHelper.rectCoordAxisBuildSplitArea = rectCoordAxisBuildSplitArea$1;
  axisSplitHelper.rectCoordAxisHandleRemove = rectCoordAxisHandleRemove$1;
  var zrUtil$d = util$6;
  var graphic$6 = graphic$g;
  var AxisBuilder$1 = AxisBuilder_1;
  var AxisView$1 = AxisView_1;
  var cartesianAxisHelper$1 = cartesianAxisHelper$2;
  var _axisSplitHelper = axisSplitHelper;
  var rectCoordAxisBuildSplitArea = _axisSplitHelper.rectCoordAxisBuildSplitArea;
  var rectCoordAxisHandleRemove = _axisSplitHelper.rectCoordAxisHandleRemove;
  var axisBuilderAttrs = ["axisLine", "axisTickLabel", "axisName"];
  var selfBuilderAttrs = ["splitArea", "splitLine", "minorSplitLine"];
  var CartesianAxisView = AxisView$1.extend({
    type: "cartesianAxis",
    axisPointerClass: "CartesianAxisPointer",
    render: function(axisModel, ecModel, api, payload) {
      this.group.removeAll();
      var oldAxisGroup = this._axisGroup;
      this._axisGroup = new graphic$6.Group();
      this.group.add(this._axisGroup);
      if (!axisModel.get("show")) {
        return;
      }
      var gridModel = axisModel.getCoordSysModel();
      var layout2 = cartesianAxisHelper$1.layout(gridModel, axisModel);
      var axisBuilder = new AxisBuilder$1(axisModel, layout2);
      zrUtil$d.each(axisBuilderAttrs, axisBuilder.add, axisBuilder);
      this._axisGroup.add(axisBuilder.getGroup());
      zrUtil$d.each(selfBuilderAttrs, function(name) {
        if (axisModel.get(name + ".show")) {
          this["_" + name](axisModel, gridModel);
        }
      }, this);
      graphic$6.groupTransition(oldAxisGroup, this._axisGroup, axisModel);
      CartesianAxisView.superCall(this, "render", axisModel, ecModel, api, payload);
    },
    remove: function() {
      rectCoordAxisHandleRemove(this);
    },
    _splitLine: function(axisModel, gridModel) {
      var axis = axisModel.axis;
      if (axis.scale.isBlank()) {
        return;
      }
      var splitLineModel = axisModel.getModel("splitLine");
      var lineStyleModel = splitLineModel.getModel("lineStyle");
      var lineColors = lineStyleModel.get("color");
      lineColors = zrUtil$d.isArray(lineColors) ? lineColors : [lineColors];
      var gridRect = gridModel.coordinateSystem.getRect();
      var isHorizontal = axis.isHorizontal();
      var lineCount = 0;
      var ticksCoords = axis.getTicksCoords({
        tickModel: splitLineModel
      });
      var p1 = [];
      var p2 = [];
      var lineStyle2 = lineStyleModel.getLineStyle();
      for (var i2 = 0; i2 < ticksCoords.length; i2++) {
        var tickCoord = axis.toGlobalCoord(ticksCoords[i2].coord);
        if (isHorizontal) {
          p1[0] = tickCoord;
          p1[1] = gridRect.y;
          p2[0] = tickCoord;
          p2[1] = gridRect.y + gridRect.height;
        } else {
          p1[0] = gridRect.x;
          p1[1] = tickCoord;
          p2[0] = gridRect.x + gridRect.width;
          p2[1] = tickCoord;
        }
        var colorIndex = lineCount++ % lineColors.length;
        var tickValue = ticksCoords[i2].tickValue;
        this._axisGroup.add(new graphic$6.Line({
          anid: tickValue != null ? "line_" + ticksCoords[i2].tickValue : null,
          subPixelOptimize: true,
          shape: {
            x1: p1[0],
            y1: p1[1],
            x2: p2[0],
            y2: p2[1]
          },
          style: zrUtil$d.defaults({
            stroke: lineColors[colorIndex]
          }, lineStyle2),
          silent: true
        }));
      }
    },
    _minorSplitLine: function(axisModel, gridModel) {
      var axis = axisModel.axis;
      var minorSplitLineModel = axisModel.getModel("minorSplitLine");
      var lineStyleModel = minorSplitLineModel.getModel("lineStyle");
      var gridRect = gridModel.coordinateSystem.getRect();
      var isHorizontal = axis.isHorizontal();
      var minorTicksCoords = axis.getMinorTicksCoords();
      if (!minorTicksCoords.length) {
        return;
      }
      var p1 = [];
      var p2 = [];
      var lineStyle2 = lineStyleModel.getLineStyle();
      for (var i2 = 0; i2 < minorTicksCoords.length; i2++) {
        for (var k = 0; k < minorTicksCoords[i2].length; k++) {
          var tickCoord = axis.toGlobalCoord(minorTicksCoords[i2][k].coord);
          if (isHorizontal) {
            p1[0] = tickCoord;
            p1[1] = gridRect.y;
            p2[0] = tickCoord;
            p2[1] = gridRect.y + gridRect.height;
          } else {
            p1[0] = gridRect.x;
            p1[1] = tickCoord;
            p2[0] = gridRect.x + gridRect.width;
            p2[1] = tickCoord;
          }
          this._axisGroup.add(new graphic$6.Line({
            anid: "minor_line_" + minorTicksCoords[i2][k].tickValue,
            subPixelOptimize: true,
            shape: {
              x1: p1[0],
              y1: p1[1],
              x2: p2[0],
              y2: p2[1]
            },
            style: lineStyle2,
            silent: true
          }));
        }
      }
    },
    _splitArea: function(axisModel, gridModel) {
      rectCoordAxisBuildSplitArea(this, this._axisGroup, axisModel, gridModel);
    }
  });
  CartesianAxisView.extend({
    type: "xAxis"
  });
  CartesianAxisView.extend({
    type: "yAxis"
  });
  var echarts$b = echarts$d;
  var zrUtil$c = util$6;
  var graphic$5 = graphic$g;
  echarts$b.extendComponentView({
    type: "grid",
    render: function(gridModel, ecModel) {
      this.group.removeAll();
      if (gridModel.get("show")) {
        this.group.add(new graphic$5.Rect({
          shape: gridModel.coordinateSystem.getRect(),
          style: zrUtil$c.defaults({
            fill: gridModel.get("backgroundColor")
          }, gridModel.getItemStyle()),
          silent: true,
          z2: -1
        }));
      }
    }
  });
  echarts$b.registerPreprocessor(function(option) {
    if (option.xAxis && option.yAxis && !option.grid) {
      option.grid = {};
    }
  });
  var echarts$a = echarts$d;
  var visualSymbol = symbol;
  var layoutPoints = points;
  var dataSample = dataSample$1;
  echarts$a.registerVisual(visualSymbol("line", "circle", "line"));
  echarts$a.registerLayout(layoutPoints("line"));
  echarts$a.registerProcessor(echarts$a.PRIORITY.PROCESSOR.STATISTIC, dataSample("line"));
  var zrUtil$b = util$6;
  var modelUtil = model;
  function _default$5(finder, ecModel) {
    var point = [];
    var seriesIndex = finder.seriesIndex;
    var seriesModel;
    if (seriesIndex == null || !(seriesModel = ecModel.getSeriesByIndex(seriesIndex))) {
      return {
        point: []
      };
    }
    var data = seriesModel.getData();
    var dataIndex = modelUtil.queryDataIndex(data, finder);
    if (dataIndex == null || dataIndex < 0 || zrUtil$b.isArray(dataIndex)) {
      return {
        point: []
      };
    }
    var el = data.getItemGraphicEl(dataIndex);
    var coordSys = seriesModel.coordinateSystem;
    if (seriesModel.getTooltipPosition) {
      point = seriesModel.getTooltipPosition(dataIndex) || [];
    } else if (coordSys && coordSys.dataToPoint) {
      point = coordSys.dataToPoint(data.getValues(zrUtil$b.map(coordSys.dimensions, function(dim) {
        return data.mapDimension(dim);
      }), dataIndex, true)) || [];
    } else if (el) {
      var rect = el.getBoundingRect().clone();
      rect.applyTransform(el.transform);
      point = [rect.x + rect.width / 2, rect.y + rect.height / 2];
    }
    return {
      point,
      el
    };
  }
  var findPointFromSeries$2 = _default$5;
  var zrUtil$a = util$6;
  var _model$4 = model;
  var makeInner$2 = _model$4.makeInner;
  var modelHelper = modelHelper$1;
  var findPointFromSeries$1 = findPointFromSeries$2;
  var each$4 = zrUtil$a.each;
  var curry$1 = zrUtil$a.curry;
  var inner$2 = makeInner$2();
  function _default$4(payload, ecModel, api) {
    var currTrigger = payload.currTrigger;
    var point = [payload.x, payload.y];
    var finder = payload;
    var dispatchAction = payload.dispatchAction || zrUtil$a.bind(api.dispatchAction, api);
    var coordSysAxesInfo = ecModel.getComponent("axisPointer").coordSysAxesInfo;
    if (!coordSysAxesInfo) {
      return;
    }
    if (illegalPoint(point)) {
      point = findPointFromSeries$1({
        seriesIndex: finder.seriesIndex,
        dataIndex: finder.dataIndex
      }, ecModel).point;
    }
    var isIllegalPoint = illegalPoint(point);
    var inputAxesInfo = finder.axesInfo;
    var axesInfo = coordSysAxesInfo.axesInfo;
    var shouldHide = currTrigger === "leave" || illegalPoint(point);
    var outputFinder = {};
    var showValueMap = {};
    var dataByCoordSys = {
      list: [],
      map: {}
    };
    var updaters = {
      showPointer: curry$1(showPointer, showValueMap),
      showTooltip: curry$1(showTooltip, dataByCoordSys)
    };
    each$4(coordSysAxesInfo.coordSysMap, function(coordSys, coordSysKey) {
      var coordSysContainsPoint = isIllegalPoint || coordSys.containPoint(point);
      each$4(coordSysAxesInfo.coordSysAxesInfo[coordSysKey], function(axisInfo, key) {
        var axis = axisInfo.axis;
        var inputAxisInfo = findInputAxisInfo(inputAxesInfo, axisInfo);
        if (!shouldHide && coordSysContainsPoint && (!inputAxesInfo || inputAxisInfo)) {
          var val = inputAxisInfo && inputAxisInfo.value;
          if (val == null && !isIllegalPoint) {
            val = axis.pointToData(point);
          }
          val != null && processOnAxis(axisInfo, val, updaters, false, outputFinder);
        }
      });
    });
    var linkTriggers = {};
    each$4(axesInfo, function(tarAxisInfo, tarKey) {
      var linkGroup = tarAxisInfo.linkGroup;
      if (linkGroup && !showValueMap[tarKey]) {
        each$4(linkGroup.axesInfo, function(srcAxisInfo, srcKey) {
          var srcValItem = showValueMap[srcKey];
          if (srcAxisInfo !== tarAxisInfo && srcValItem) {
            var val = srcValItem.value;
            linkGroup.mapper && (val = tarAxisInfo.axis.scale.parse(linkGroup.mapper(val, makeMapperParam(srcAxisInfo), makeMapperParam(tarAxisInfo))));
            linkTriggers[tarAxisInfo.key] = val;
          }
        });
      }
    });
    each$4(linkTriggers, function(val, tarKey) {
      processOnAxis(axesInfo[tarKey], val, updaters, true, outputFinder);
    });
    updateModelActually(showValueMap, axesInfo, outputFinder);
    dispatchTooltipActually(dataByCoordSys, point, payload, dispatchAction);
    dispatchHighDownActually(axesInfo, dispatchAction, api);
    return outputFinder;
  }
  function processOnAxis(axisInfo, newValue, updaters, dontSnap, outputFinder) {
    var axis = axisInfo.axis;
    if (axis.scale.isBlank() || !axis.containData(newValue)) {
      return;
    }
    if (!axisInfo.involveSeries) {
      updaters.showPointer(axisInfo, newValue);
      return;
    }
    var payloadInfo = buildPayloadsBySeries(newValue, axisInfo);
    var payloadBatch = payloadInfo.payloadBatch;
    var snapToValue = payloadInfo.snapToValue;
    if (payloadBatch[0] && outputFinder.seriesIndex == null) {
      zrUtil$a.extend(outputFinder, payloadBatch[0]);
    }
    if (!dontSnap && axisInfo.snap) {
      if (axis.containData(snapToValue) && snapToValue != null) {
        newValue = snapToValue;
      }
    }
    updaters.showPointer(axisInfo, newValue, payloadBatch, outputFinder);
    updaters.showTooltip(axisInfo, payloadInfo, snapToValue);
  }
  function buildPayloadsBySeries(value, axisInfo) {
    var axis = axisInfo.axis;
    var dim = axis.dim;
    var snapToValue = value;
    var payloadBatch = [];
    var minDist = Number.MAX_VALUE;
    var minDiff = -1;
    each$4(axisInfo.seriesModels, function(series, idx) {
      var dataDim = series.getData().mapDimension(dim, true);
      var seriesNestestValue;
      var dataIndices;
      if (series.getAxisTooltipData) {
        var result = series.getAxisTooltipData(dataDim, value, axis);
        dataIndices = result.dataIndices;
        seriesNestestValue = result.nestestValue;
      } else {
        dataIndices = series.getData().indicesOfNearest(dataDim[0], value, axis.type === "category" ? 0.5 : null);
        if (!dataIndices.length) {
          return;
        }
        seriesNestestValue = series.getData().get(dataDim[0], dataIndices[0]);
      }
      if (seriesNestestValue == null || !isFinite(seriesNestestValue)) {
        return;
      }
      var diff = value - seriesNestestValue;
      var dist2 = Math.abs(diff);
      if (dist2 <= minDist) {
        if (dist2 < minDist || diff >= 0 && minDiff < 0) {
          minDist = dist2;
          minDiff = diff;
          snapToValue = seriesNestestValue;
          payloadBatch.length = 0;
        }
        each$4(dataIndices, function(dataIndex) {
          payloadBatch.push({
            seriesIndex: series.seriesIndex,
            dataIndexInside: dataIndex,
            dataIndex: series.getData().getRawIndex(dataIndex)
          });
        });
      }
    });
    return {
      payloadBatch,
      snapToValue
    };
  }
  function showPointer(showValueMap, axisInfo, value, payloadBatch) {
    showValueMap[axisInfo.key] = {
      value,
      payloadBatch
    };
  }
  function showTooltip(dataByCoordSys, axisInfo, payloadInfo, value) {
    var payloadBatch = payloadInfo.payloadBatch;
    var axis = axisInfo.axis;
    var axisModel = axis.model;
    var axisPointerModel = axisInfo.axisPointerModel;
    if (!axisInfo.triggerTooltip || !payloadBatch.length) {
      return;
    }
    var coordSysModel = axisInfo.coordSys.model;
    var coordSysKey = modelHelper.makeKey(coordSysModel);
    var coordSysItem = dataByCoordSys.map[coordSysKey];
    if (!coordSysItem) {
      coordSysItem = dataByCoordSys.map[coordSysKey] = {
        coordSysId: coordSysModel.id,
        coordSysIndex: coordSysModel.componentIndex,
        coordSysType: coordSysModel.type,
        coordSysMainType: coordSysModel.mainType,
        dataByAxis: []
      };
      dataByCoordSys.list.push(coordSysItem);
    }
    coordSysItem.dataByAxis.push({
      axisDim: axis.dim,
      axisIndex: axisModel.componentIndex,
      axisType: axisModel.type,
      axisId: axisModel.id,
      value,
      valueLabelOpt: {
        precision: axisPointerModel.get("label.precision"),
        formatter: axisPointerModel.get("label.formatter")
      },
      seriesDataIndices: payloadBatch.slice()
    });
  }
  function updateModelActually(showValueMap, axesInfo, outputFinder) {
    var outputAxesInfo = outputFinder.axesInfo = [];
    each$4(axesInfo, function(axisInfo, key) {
      var option = axisInfo.axisPointerModel.option;
      var valItem = showValueMap[key];
      if (valItem) {
        !axisInfo.useHandle && (option.status = "show");
        option.value = valItem.value;
        option.seriesDataIndices = (valItem.payloadBatch || []).slice();
      } else {
        !axisInfo.useHandle && (option.status = "hide");
      }
      option.status === "show" && outputAxesInfo.push({
        axisDim: axisInfo.axis.dim,
        axisIndex: axisInfo.axis.model.componentIndex,
        value: option.value
      });
    });
  }
  function dispatchTooltipActually(dataByCoordSys, point, payload, dispatchAction) {
    if (illegalPoint(point) || !dataByCoordSys.list.length) {
      dispatchAction({
        type: "hideTip"
      });
      return;
    }
    var sampleItem = ((dataByCoordSys.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
    dispatchAction({
      type: "showTip",
      escapeConnect: true,
      x: point[0],
      y: point[1],
      tooltipOption: payload.tooltipOption,
      position: payload.position,
      dataIndexInside: sampleItem.dataIndexInside,
      dataIndex: sampleItem.dataIndex,
      seriesIndex: sampleItem.seriesIndex,
      dataByCoordSys: dataByCoordSys.list
    });
  }
  function dispatchHighDownActually(axesInfo, dispatchAction, api) {
    var zr = api.getZr();
    var highDownKey = "axisPointerLastHighlights";
    var lastHighlights = inner$2(zr)[highDownKey] || {};
    var newHighlights = inner$2(zr)[highDownKey] = {};
    each$4(axesInfo, function(axisInfo, key) {
      var option = axisInfo.axisPointerModel.option;
      option.status === "show" && each$4(option.seriesDataIndices, function(batchItem) {
        var key2 = batchItem.seriesIndex + " | " + batchItem.dataIndex;
        newHighlights[key2] = batchItem;
      });
    });
    var toHighlight = [];
    var toDownplay = [];
    zrUtil$a.each(lastHighlights, function(batchItem, key) {
      !newHighlights[key] && toDownplay.push(batchItem);
    });
    zrUtil$a.each(newHighlights, function(batchItem, key) {
      !lastHighlights[key] && toHighlight.push(batchItem);
    });
    toDownplay.length && api.dispatchAction({
      type: "downplay",
      escapeConnect: true,
      batch: toDownplay
    });
    toHighlight.length && api.dispatchAction({
      type: "highlight",
      escapeConnect: true,
      batch: toHighlight
    });
  }
  function findInputAxisInfo(inputAxesInfo, axisInfo) {
    for (var i2 = 0; i2 < (inputAxesInfo || []).length; i2++) {
      var inputAxisInfo = inputAxesInfo[i2];
      if (axisInfo.axis.dim === inputAxisInfo.axisDim && axisInfo.axis.model.componentIndex === inputAxisInfo.axisIndex) {
        return inputAxisInfo;
      }
    }
  }
  function makeMapperParam(axisInfo) {
    var axisModel = axisInfo.axis.model;
    var item = {};
    var dim = item.axisDim = axisInfo.axis.dim;
    item.axisIndex = item[dim + "AxisIndex"] = axisModel.componentIndex;
    item.axisName = item[dim + "AxisName"] = axisModel.name;
    item.axisId = item[dim + "AxisId"] = axisModel.id;
    return item;
  }
  function illegalPoint(point) {
    return !point || point[0] == null || isNaN(point[0]) || point[1] == null || isNaN(point[1]);
  }
  var axisTrigger$1 = _default$4;
  var echarts$9 = echarts$d;
  echarts$9.extendComponentModel({
    type: "axisPointer",
    coordSysAxesInfo: null,
    defaultOption: {
      show: "auto",
      triggerOn: null,
      zlevel: 0,
      z: 50,
      type: "line",
      snap: false,
      triggerTooltip: true,
      value: null,
      status: null,
      link: [],
      animation: null,
      animationDurationUpdate: 200,
      lineStyle: {
        color: "#aaa",
        width: 1,
        type: "solid"
      },
      shadowStyle: {
        color: "rgba(150,150,150,0.3)"
      },
      label: {
        show: true,
        formatter: null,
        precision: "auto",
        margin: 3,
        color: "#fff",
        padding: [5, 7, 5, 7],
        backgroundColor: "auto",
        borderColor: null,
        borderWidth: 0,
        shadowBlur: 3,
        shadowColor: "#aaa"
      },
      handle: {
        show: false,
        icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
        size: 45,
        margin: 50,
        color: "#333",
        shadowBlur: 3,
        shadowColor: "#aaa",
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        throttle: 40
      }
    }
  });
  var globalListener$2 = {};
  var zrUtil$9 = util$6;
  var env$2 = env_1;
  var _model$3 = model;
  var makeInner$1 = _model$3.makeInner;
  var inner$1 = makeInner$1();
  var each$3 = zrUtil$9.each;
  function register(key, api, handler) {
    if (env$2.node) {
      return;
    }
    var zr = api.getZr();
    inner$1(zr).records || (inner$1(zr).records = {});
    initGlobalListeners(zr, api);
    var record = inner$1(zr).records[key] || (inner$1(zr).records[key] = {});
    record.handler = handler;
  }
  function initGlobalListeners(zr, api) {
    if (inner$1(zr).initialized) {
      return;
    }
    inner$1(zr).initialized = true;
    useHandler("click", zrUtil$9.curry(doEnter, "click"));
    useHandler("mousemove", zrUtil$9.curry(doEnter, "mousemove"));
    useHandler("globalout", onLeave);
    function useHandler(eventType, cb) {
      zr.on(eventType, function(e) {
        var dis = makeDispatchAction$1(api);
        each$3(inner$1(zr).records, function(record) {
          record && cb(record, e, dis.dispatchAction);
        });
        dispatchTooltipFinally(dis.pendings, api);
      });
    }
  }
  function dispatchTooltipFinally(pendings, api) {
    var showLen = pendings.showTip.length;
    var hideLen = pendings.hideTip.length;
    var actuallyPayload;
    if (showLen) {
      actuallyPayload = pendings.showTip[showLen - 1];
    } else if (hideLen) {
      actuallyPayload = pendings.hideTip[hideLen - 1];
    }
    if (actuallyPayload) {
      actuallyPayload.dispatchAction = null;
      api.dispatchAction(actuallyPayload);
    }
  }
  function onLeave(record, e, dispatchAction) {
    record.handler("leave", null, dispatchAction);
  }
  function doEnter(currTrigger, record, e, dispatchAction) {
    record.handler(currTrigger, e, dispatchAction);
  }
  function makeDispatchAction$1(api) {
    var pendings = {
      showTip: [],
      hideTip: []
    };
    var dispatchAction = function(payload) {
      var pendingList = pendings[payload.type];
      if (pendingList) {
        pendingList.push(payload);
      } else {
        payload.dispatchAction = dispatchAction;
        api.dispatchAction(payload);
      }
    };
    return {
      dispatchAction,
      pendings
    };
  }
  function unregister(key, api) {
    if (env$2.node) {
      return;
    }
    var zr = api.getZr();
    var record = (inner$1(zr).records || {})[key];
    if (record) {
      inner$1(zr).records[key] = null;
    }
  }
  globalListener$2.register = register;
  globalListener$2.unregister = unregister;
  var echarts$8 = echarts$d;
  var globalListener$1 = globalListener$2;
  var AxisPointerView = echarts$8.extendComponentView({
    type: "axisPointer",
    render: function(globalAxisPointerModel, ecModel, api) {
      var globalTooltipModel = ecModel.getComponent("tooltip");
      var triggerOn = globalAxisPointerModel.get("triggerOn") || globalTooltipModel && globalTooltipModel.get("triggerOn") || "mousemove|click";
      globalListener$1.register("axisPointer", api, function(currTrigger, e, dispatchAction) {
        if (triggerOn !== "none" && (currTrigger === "leave" || triggerOn.indexOf(currTrigger) >= 0)) {
          dispatchAction({
            type: "updateAxisPointer",
            currTrigger,
            x: e && e.offsetX,
            y: e && e.offsetY
          });
        }
      });
    },
    remove: function(ecModel, api) {
      globalListener$1.unregister(api.getZr(), "axisPointer");
      AxisPointerView.superApply(this._model, "remove", arguments);
    },
    dispose: function(ecModel, api) {
      globalListener$1.unregister("axisPointer", api);
      AxisPointerView.superApply(this._model, "dispose", arguments);
    }
  });
  var zrUtil$8 = util$6;
  var clazzUtil = clazz;
  var graphic$4 = graphic$g;
  var axisPointerModelHelper$1 = modelHelper$1;
  var eventTool = event;
  var throttleUtil = throttle$1;
  var _model$2 = model;
  var makeInner = _model$2.makeInner;
  var inner = makeInner();
  var clone = zrUtil$8.clone;
  var bind$1 = zrUtil$8.bind;
  function BaseAxisPointer$1() {
  }
  BaseAxisPointer$1.prototype = {
    _group: null,
    _lastGraphicKey: null,
    _handle: null,
    _dragging: false,
    _lastValue: null,
    _lastStatus: null,
    _payloadInfo: null,
    animationThreshold: 15,
    render: function(axisModel, axisPointerModel, api, forceRender) {
      var value = axisPointerModel.get("value");
      var status = axisPointerModel.get("status");
      this._axisModel = axisModel;
      this._axisPointerModel = axisPointerModel;
      this._api = api;
      if (!forceRender && this._lastValue === value && this._lastStatus === status) {
        return;
      }
      this._lastValue = value;
      this._lastStatus = status;
      var group = this._group;
      var handle = this._handle;
      if (!status || status === "hide") {
        group && group.hide();
        handle && handle.hide();
        return;
      }
      group && group.show();
      handle && handle.show();
      var elOption = {};
      this.makeElOption(elOption, value, axisModel, axisPointerModel, api);
      var graphicKey = elOption.graphicKey;
      if (graphicKey !== this._lastGraphicKey) {
        this.clear(api);
      }
      this._lastGraphicKey = graphicKey;
      var moveAnimation = this._moveAnimation = this.determineAnimation(axisModel, axisPointerModel);
      if (!group) {
        group = this._group = new graphic$4.Group();
        this.createPointerEl(group, elOption, axisModel, axisPointerModel);
        this.createLabelEl(group, elOption, axisModel, axisPointerModel);
        api.getZr().add(group);
      } else {
        var doUpdateProps = zrUtil$8.curry(updateProps, axisPointerModel, moveAnimation);
        this.updatePointerEl(group, elOption, doUpdateProps, axisPointerModel);
        this.updateLabelEl(group, elOption, doUpdateProps, axisPointerModel);
      }
      updateMandatoryProps(group, axisPointerModel, true);
      this._renderHandle(value);
    },
    remove: function(api) {
      this.clear(api);
    },
    dispose: function(api) {
      this.clear(api);
    },
    determineAnimation: function(axisModel, axisPointerModel) {
      var animation = axisPointerModel.get("animation");
      var axis = axisModel.axis;
      var isCategoryAxis = axis.type === "category";
      var useSnap = axisPointerModel.get("snap");
      if (!useSnap && !isCategoryAxis) {
        return false;
      }
      if (animation === "auto" || animation == null) {
        var animationThreshold = this.animationThreshold;
        if (isCategoryAxis && axis.getBandWidth() > animationThreshold) {
          return true;
        }
        if (useSnap) {
          var seriesDataCount = axisPointerModelHelper$1.getAxisInfo(axisModel).seriesDataCount;
          var axisExtent = axis.getExtent();
          return Math.abs(axisExtent[0] - axisExtent[1]) / seriesDataCount > animationThreshold;
        }
        return false;
      }
      return animation === true;
    },
    makeElOption: function(elOption, value, axisModel, axisPointerModel, api) {
    },
    createPointerEl: function(group, elOption, axisModel, axisPointerModel) {
      var pointerOption = elOption.pointer;
      if (pointerOption) {
        var pointerEl = inner(group).pointerEl = new graphic$4[pointerOption.type](clone(elOption.pointer));
        group.add(pointerEl);
      }
    },
    createLabelEl: function(group, elOption, axisModel, axisPointerModel) {
      if (elOption.label) {
        var labelEl = inner(group).labelEl = new graphic$4.Rect(clone(elOption.label));
        group.add(labelEl);
        updateLabelShowHide(labelEl, axisPointerModel);
      }
    },
    updatePointerEl: function(group, elOption, updateProps2) {
      var pointerEl = inner(group).pointerEl;
      if (pointerEl && elOption.pointer) {
        pointerEl.setStyle(elOption.pointer.style);
        updateProps2(pointerEl, {
          shape: elOption.pointer.shape
        });
      }
    },
    updateLabelEl: function(group, elOption, updateProps2, axisPointerModel) {
      var labelEl = inner(group).labelEl;
      if (labelEl) {
        labelEl.setStyle(elOption.label.style);
        updateProps2(labelEl, {
          shape: elOption.label.shape,
          position: elOption.label.position
        });
        updateLabelShowHide(labelEl, axisPointerModel);
      }
    },
    _renderHandle: function(value) {
      if (this._dragging || !this.updateHandleTransform) {
        return;
      }
      var axisPointerModel = this._axisPointerModel;
      var zr = this._api.getZr();
      var handle = this._handle;
      var handleModel = axisPointerModel.getModel("handle");
      var status = axisPointerModel.get("status");
      if (!handleModel.get("show") || !status || status === "hide") {
        handle && zr.remove(handle);
        this._handle = null;
        return;
      }
      var isInit;
      if (!this._handle) {
        isInit = true;
        handle = this._handle = graphic$4.createIcon(handleModel.get("icon"), {
          cursor: "move",
          draggable: true,
          onmousemove: function(e) {
            eventTool.stop(e.event);
          },
          onmousedown: bind$1(this._onHandleDragMove, this, 0, 0),
          drift: bind$1(this._onHandleDragMove, this),
          ondragend: bind$1(this._onHandleDragEnd, this)
        });
        zr.add(handle);
      }
      updateMandatoryProps(handle, axisPointerModel, false);
      var includeStyles = ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
      handle.setStyle(handleModel.getItemStyle(null, includeStyles));
      var handleSize = handleModel.get("size");
      if (!zrUtil$8.isArray(handleSize)) {
        handleSize = [handleSize, handleSize];
      }
      handle.attr("scale", [handleSize[0] / 2, handleSize[1] / 2]);
      throttleUtil.createOrUpdate(this, "_doDispatchAxisPointer", handleModel.get("throttle") || 0, "fixRate");
      this._moveHandleToValue(value, isInit);
    },
    _moveHandleToValue: function(value, isInit) {
      updateProps(this._axisPointerModel, !isInit && this._moveAnimation, this._handle, getHandleTransProps(this.getHandleTransform(value, this._axisModel, this._axisPointerModel)));
    },
    _onHandleDragMove: function(dx, dy) {
      var handle = this._handle;
      if (!handle) {
        return;
      }
      this._dragging = true;
      var trans = this.updateHandleTransform(getHandleTransProps(handle), [dx, dy], this._axisModel, this._axisPointerModel);
      this._payloadInfo = trans;
      handle.stopAnimation();
      handle.attr(getHandleTransProps(trans));
      inner(handle).lastProp = null;
      this._doDispatchAxisPointer();
    },
    _doDispatchAxisPointer: function() {
      var handle = this._handle;
      if (!handle) {
        return;
      }
      var payloadInfo = this._payloadInfo;
      var axisModel = this._axisModel;
      this._api.dispatchAction({
        type: "updateAxisPointer",
        x: payloadInfo.cursorPoint[0],
        y: payloadInfo.cursorPoint[1],
        tooltipOption: payloadInfo.tooltipOption,
        axesInfo: [{
          axisDim: axisModel.axis.dim,
          axisIndex: axisModel.componentIndex
        }]
      });
    },
    _onHandleDragEnd: function(moveAnimation) {
      this._dragging = false;
      var handle = this._handle;
      if (!handle) {
        return;
      }
      var value = this._axisPointerModel.get("value");
      this._moveHandleToValue(value);
      this._api.dispatchAction({
        type: "hideTip"
      });
    },
    getHandleTransform: null,
    updateHandleTransform: null,
    clear: function(api) {
      this._lastValue = null;
      this._lastStatus = null;
      var zr = api.getZr();
      var group = this._group;
      var handle = this._handle;
      if (zr && group) {
        this._lastGraphicKey = null;
        group && zr.remove(group);
        handle && zr.remove(handle);
        this._group = null;
        this._handle = null;
        this._payloadInfo = null;
      }
    },
    doClear: function() {
    },
    buildLabel: function(xy, wh, xDimIndex) {
      xDimIndex = xDimIndex || 0;
      return {
        x: xy[xDimIndex],
        y: xy[1 - xDimIndex],
        width: wh[xDimIndex],
        height: wh[1 - xDimIndex]
      };
    }
  };
  BaseAxisPointer$1.prototype.constructor = BaseAxisPointer$1;
  function updateProps(animationModel, moveAnimation, el, props) {
    if (!propsEqual(inner(el).lastProp, props)) {
      inner(el).lastProp = props;
      moveAnimation ? graphic$4.updateProps(el, props, animationModel) : (el.stopAnimation(), el.attr(props));
    }
  }
  function propsEqual(lastProps, newProps) {
    if (zrUtil$8.isObject(lastProps) && zrUtil$8.isObject(newProps)) {
      var equals = true;
      zrUtil$8.each(newProps, function(item, key) {
        equals = equals && propsEqual(lastProps[key], item);
      });
      return !!equals;
    } else {
      return lastProps === newProps;
    }
  }
  function updateLabelShowHide(labelEl, axisPointerModel) {
    labelEl[axisPointerModel.get("label.show") ? "show" : "hide"]();
  }
  function getHandleTransProps(trans) {
    return {
      position: trans.position.slice(),
      rotation: trans.rotation || 0
    };
  }
  function updateMandatoryProps(group, axisPointerModel, silent) {
    var z = axisPointerModel.get("z");
    var zlevel = axisPointerModel.get("zlevel");
    group && group.traverse(function(el) {
      if (el.type !== "group") {
        z != null && (el.z = z);
        zlevel != null && (el.zlevel = zlevel);
        el.silent = silent;
      }
    });
  }
  clazzUtil.enableClassExtend(BaseAxisPointer$1);
  var _default$3 = BaseAxisPointer$1;
  var BaseAxisPointer_1 = _default$3;
  var viewHelper$1 = {};
  var zrUtil$7 = util$6;
  var graphic$3 = graphic$g;
  var textContain = text;
  var formatUtil$3 = format;
  var matrix = matrix$6;
  var axisHelper$1 = axisHelper$3;
  var AxisBuilder = AxisBuilder_1;
  function buildElStyle(axisPointerModel) {
    var axisPointerType = axisPointerModel.get("type");
    var styleModel = axisPointerModel.getModel(axisPointerType + "Style");
    var style;
    if (axisPointerType === "line") {
      style = styleModel.getLineStyle();
      style.fill = null;
    } else if (axisPointerType === "shadow") {
      style = styleModel.getAreaStyle();
      style.stroke = null;
    }
    return style;
  }
  function buildLabelElOption(elOption, axisModel, axisPointerModel, api, labelPos) {
    var value = axisPointerModel.get("value");
    var text2 = getValueLabel(value, axisModel.axis, axisModel.ecModel, axisPointerModel.get("seriesDataIndices"), {
      precision: axisPointerModel.get("label.precision"),
      formatter: axisPointerModel.get("label.formatter")
    });
    var labelModel = axisPointerModel.getModel("label");
    var paddings = formatUtil$3.normalizeCssArray(labelModel.get("padding") || 0);
    var font = labelModel.getFont();
    var textRect = textContain.getBoundingRect(text2, font);
    var position = labelPos.position;
    var width = textRect.width + paddings[1] + paddings[3];
    var height = textRect.height + paddings[0] + paddings[2];
    var align = labelPos.align;
    align === "right" && (position[0] -= width);
    align === "center" && (position[0] -= width / 2);
    var verticalAlign = labelPos.verticalAlign;
    verticalAlign === "bottom" && (position[1] -= height);
    verticalAlign === "middle" && (position[1] -= height / 2);
    confineInContainer(position, width, height, api);
    var bgColor = labelModel.get("backgroundColor");
    if (!bgColor || bgColor === "auto") {
      bgColor = axisModel.get("axisLine.lineStyle.color");
    }
    elOption.label = {
      shape: {
        x: 0,
        y: 0,
        width,
        height,
        r: labelModel.get("borderRadius")
      },
      position: position.slice(),
      style: {
        text: text2,
        textFont: font,
        textFill: labelModel.getTextColor(),
        textPosition: "inside",
        textPadding: paddings,
        fill: bgColor,
        stroke: labelModel.get("borderColor") || "transparent",
        lineWidth: labelModel.get("borderWidth") || 0,
        shadowBlur: labelModel.get("shadowBlur"),
        shadowColor: labelModel.get("shadowColor"),
        shadowOffsetX: labelModel.get("shadowOffsetX"),
        shadowOffsetY: labelModel.get("shadowOffsetY")
      },
      z2: 10
    };
  }
  function confineInContainer(position, width, height, api) {
    var viewWidth = api.getWidth();
    var viewHeight = api.getHeight();
    position[0] = Math.min(position[0] + width, viewWidth) - width;
    position[1] = Math.min(position[1] + height, viewHeight) - height;
    position[0] = Math.max(position[0], 0);
    position[1] = Math.max(position[1], 0);
  }
  function getValueLabel(value, axis, ecModel, seriesDataIndices, opt) {
    value = axis.scale.parse(value);
    var text2 = axis.scale.getLabel(value, {
      precision: opt.precision
    });
    var formatter = opt.formatter;
    if (formatter) {
      var params = {
        value: axisHelper$1.getAxisRawValue(axis, value),
        axisDimension: axis.dim,
        axisIndex: axis.index,
        seriesData: []
      };
      zrUtil$7.each(seriesDataIndices, function(idxItem) {
        var series = ecModel.getSeriesByIndex(idxItem.seriesIndex);
        var dataIndex = idxItem.dataIndexInside;
        var dataParams = series && series.getDataParams(dataIndex);
        dataParams && params.seriesData.push(dataParams);
      });
      if (zrUtil$7.isString(formatter)) {
        text2 = formatter.replace("{value}", text2);
      } else if (zrUtil$7.isFunction(formatter)) {
        text2 = formatter(params);
      }
    }
    return text2;
  }
  function getTransformedPosition(axis, value, layoutInfo) {
    var transform = matrix.create();
    matrix.rotate(transform, transform, layoutInfo.rotation);
    matrix.translate(transform, transform, layoutInfo.position);
    return graphic$3.applyTransform([axis.dataToCoord(value), (layoutInfo.labelOffset || 0) + (layoutInfo.labelDirection || 1) * (layoutInfo.labelMargin || 0)], transform);
  }
  function buildCartesianSingleLabelElOption(value, elOption, layoutInfo, axisModel, axisPointerModel, api) {
    var textLayout = AxisBuilder.innerTextLayout(layoutInfo.rotation, 0, layoutInfo.labelDirection);
    layoutInfo.labelMargin = axisPointerModel.get("label.margin");
    buildLabelElOption(elOption, axisModel, axisPointerModel, api, {
      position: getTransformedPosition(axisModel.axis, value, layoutInfo),
      align: textLayout.textAlign,
      verticalAlign: textLayout.textVerticalAlign
    });
  }
  function makeLineShape(p1, p2, xDimIndex) {
    xDimIndex = xDimIndex || 0;
    return {
      x1: p1[xDimIndex],
      y1: p1[1 - xDimIndex],
      x2: p2[xDimIndex],
      y2: p2[1 - xDimIndex]
    };
  }
  function makeRectShape(xy, wh, xDimIndex) {
    xDimIndex = xDimIndex || 0;
    return {
      x: xy[xDimIndex],
      y: xy[1 - xDimIndex],
      width: wh[xDimIndex],
      height: wh[1 - xDimIndex]
    };
  }
  function makeSectorShape(cx, cy, r0, r, startAngle, endAngle) {
    return {
      cx,
      cy,
      r0,
      r,
      startAngle,
      endAngle,
      clockwise: true
    };
  }
  viewHelper$1.buildElStyle = buildElStyle;
  viewHelper$1.buildLabelElOption = buildLabelElOption;
  viewHelper$1.getValueLabel = getValueLabel;
  viewHelper$1.getTransformedPosition = getTransformedPosition;
  viewHelper$1.buildCartesianSingleLabelElOption = buildCartesianSingleLabelElOption;
  viewHelper$1.makeLineShape = makeLineShape;
  viewHelper$1.makeRectShape = makeRectShape;
  viewHelper$1.makeSectorShape = makeSectorShape;
  var BaseAxisPointer = BaseAxisPointer_1;
  var viewHelper = viewHelper$1;
  var cartesianAxisHelper = cartesianAxisHelper$2;
  var AxisView = AxisView_1;
  var CartesianAxisPointer = BaseAxisPointer.extend({
    makeElOption: function(elOption, value, axisModel, axisPointerModel, api) {
      var axis = axisModel.axis;
      var grid = axis.grid;
      var axisPointerType = axisPointerModel.get("type");
      var otherExtent = getCartesian(grid, axis).getOtherAxis(axis).getGlobalExtent();
      var pixelValue = axis.toGlobalCoord(axis.dataToCoord(value, true));
      if (axisPointerType && axisPointerType !== "none") {
        var elStyle = viewHelper.buildElStyle(axisPointerModel);
        var pointerOption = pointerShapeBuilder[axisPointerType](axis, pixelValue, otherExtent);
        pointerOption.style = elStyle;
        elOption.graphicKey = pointerOption.type;
        elOption.pointer = pointerOption;
      }
      var layoutInfo = cartesianAxisHelper.layout(grid.model, axisModel);
      viewHelper.buildCartesianSingleLabelElOption(value, elOption, layoutInfo, axisModel, axisPointerModel, api);
    },
    getHandleTransform: function(value, axisModel, axisPointerModel) {
      var layoutInfo = cartesianAxisHelper.layout(axisModel.axis.grid.model, axisModel, {
        labelInside: false
      });
      layoutInfo.labelMargin = axisPointerModel.get("handle.margin");
      return {
        position: viewHelper.getTransformedPosition(axisModel.axis, value, layoutInfo),
        rotation: layoutInfo.rotation + (layoutInfo.labelDirection < 0 ? Math.PI : 0)
      };
    },
    updateHandleTransform: function(transform, delta, axisModel, axisPointerModel) {
      var axis = axisModel.axis;
      var grid = axis.grid;
      var axisExtent = axis.getGlobalExtent(true);
      var otherExtent = getCartesian(grid, axis).getOtherAxis(axis).getGlobalExtent();
      var dimIndex = axis.dim === "x" ? 0 : 1;
      var currPosition = transform.position;
      currPosition[dimIndex] += delta[dimIndex];
      currPosition[dimIndex] = Math.min(axisExtent[1], currPosition[dimIndex]);
      currPosition[dimIndex] = Math.max(axisExtent[0], currPosition[dimIndex]);
      var cursorOtherValue = (otherExtent[1] + otherExtent[0]) / 2;
      var cursorPoint = [cursorOtherValue, cursorOtherValue];
      cursorPoint[dimIndex] = currPosition[dimIndex];
      var tooltipOptions = [{
        verticalAlign: "middle"
      }, {
        align: "center"
      }];
      return {
        position: currPosition,
        rotation: transform.rotation,
        cursorPoint,
        tooltipOption: tooltipOptions[dimIndex]
      };
    }
  });
  function getCartesian(grid, axis) {
    var opt = {};
    opt[axis.dim + "AxisIndex"] = axis.index;
    return grid.getCartesian(opt);
  }
  var pointerShapeBuilder = {
    line: function(axis, pixelValue, otherExtent) {
      var targetShape = viewHelper.makeLineShape([pixelValue, otherExtent[0]], [pixelValue, otherExtent[1]], getAxisDimIndex(axis));
      return {
        type: "Line",
        subPixelOptimize: true,
        shape: targetShape
      };
    },
    shadow: function(axis, pixelValue, otherExtent) {
      var bandWidth = Math.max(1, axis.getBandWidth());
      var span = otherExtent[1] - otherExtent[0];
      return {
        type: "Rect",
        shape: viewHelper.makeRectShape([pixelValue - bandWidth / 2, otherExtent[0]], [bandWidth, span], getAxisDimIndex(axis))
      };
    }
  };
  function getAxisDimIndex(axis) {
    return axis.dim === "x" ? 0 : 1;
  }
  AxisView.registerAxisPointerClass("CartesianAxisPointer", CartesianAxisPointer);
  var echarts$7 = echarts$d;
  var zrUtil$6 = util$6;
  var axisPointerModelHelper = modelHelper$1;
  var axisTrigger = axisTrigger$1;
  echarts$7.registerPreprocessor(function(option) {
    if (option) {
      (!option.axisPointer || option.axisPointer.length === 0) && (option.axisPointer = {});
      var link = option.axisPointer.link;
      if (link && !zrUtil$6.isArray(link)) {
        option.axisPointer.link = [link];
      }
    }
  });
  echarts$7.registerProcessor(echarts$7.PRIORITY.PROCESSOR.STATISTIC, function(ecModel, api) {
    ecModel.getComponent("axisPointer").coordSysAxesInfo = axisPointerModelHelper.collect(ecModel, api);
  });
  echarts$7.registerAction({
    type: "updateAxisPointer",
    event: "updateAxisPointer",
    update: ":updateAxisPointer"
  }, axisTrigger);
  var echarts$6 = echarts$d;
  echarts$6.extendComponentModel({
    type: "tooltip",
    dependencies: ["axisPointer"],
    defaultOption: {
      zlevel: 0,
      z: 60,
      show: true,
      showContent: true,
      trigger: "item",
      triggerOn: "mousemove|click",
      alwaysShowContent: false,
      displayMode: "single",
      renderMode: "auto",
      confine: false,
      showDelay: 0,
      hideDelay: 100,
      transitionDuration: 0.4,
      enterable: false,
      backgroundColor: "rgba(50,50,50,0.7)",
      borderColor: "#333",
      borderRadius: 4,
      borderWidth: 0,
      padding: 5,
      extraCssText: "",
      axisPointer: {
        type: "line",
        axis: "auto",
        animation: "auto",
        animationDurationUpdate: 200,
        animationEasingUpdate: "exponentialOut",
        crossStyle: {
          color: "#999",
          width: 1,
          type: "dashed",
          textStyle: {}
        }
      },
      textStyle: {
        color: "#fff",
        fontSize: 14
      }
    }
  });
  var zrUtil$5 = util$6;
  var zrColor = color$1;
  var eventUtil = event;
  var domUtil = dom;
  var env$1 = env_1;
  var formatUtil$2 = format;
  var each$2 = zrUtil$5.each;
  var toCamelCase = formatUtil$2.toCamelCase;
  var vendors = ["", "-webkit-", "-moz-", "-o-"];
  var gCssText = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;";
  function assembleTransition(duration) {
    var transitionCurve = "cubic-bezier(0.23, 1, 0.32, 1)";
    var transitionText = "left " + duration + "s " + transitionCurve + ",top " + duration + "s " + transitionCurve;
    return zrUtil$5.map(vendors, function(vendorPrefix) {
      return vendorPrefix + "transition:" + transitionText;
    }).join(";");
  }
  function assembleFont(textStyleModel) {
    var cssText = [];
    var fontSize = textStyleModel.get("fontSize");
    var color2 = textStyleModel.getTextColor();
    color2 && cssText.push("color:" + color2);
    cssText.push("font:" + textStyleModel.getFont());
    var lineHeight = textStyleModel.get("lineHeight");
    if (lineHeight == null) {
      lineHeight = Math.round(fontSize * 3 / 2);
    }
    fontSize && cssText.push("line-height:" + lineHeight + "px");
    var shadowColor = textStyleModel.get("textShadowColor");
    var shadowBlur = textStyleModel.get("textShadowBlur") || 0;
    var shadowOffsetX = textStyleModel.get("textShadowOffsetX") || 0;
    var shadowOffsetY = textStyleModel.get("textShadowOffsetY") || 0;
    shadowBlur && cssText.push("text-shadow:" + shadowOffsetX + "px " + shadowOffsetY + "px " + shadowBlur + "px " + shadowColor);
    each$2(["decoration", "align"], function(name) {
      var val = textStyleModel.get(name);
      val && cssText.push("text-" + name + ":" + val);
    });
    return cssText.join(";");
  }
  function assembleCssText(tooltipModel) {
    var cssText = [];
    var transitionDuration = tooltipModel.get("transitionDuration");
    var backgroundColor = tooltipModel.get("backgroundColor");
    var textStyleModel = tooltipModel.getModel("textStyle");
    var padding = tooltipModel.get("padding");
    transitionDuration && cssText.push(assembleTransition(transitionDuration));
    if (backgroundColor) {
      if (env$1.canvasSupported) {
        cssText.push("background-Color:" + backgroundColor);
      } else {
        cssText.push("background-Color:#" + zrColor.toHex(backgroundColor));
        cssText.push("filter:alpha(opacity=70)");
      }
    }
    each$2(["width", "color", "radius"], function(name) {
      var borderName = "border-" + name;
      var camelCase = toCamelCase(borderName);
      var val = tooltipModel.get(camelCase);
      val != null && cssText.push(borderName + ":" + val + (name === "color" ? "" : "px"));
    });
    cssText.push(assembleFont(textStyleModel));
    if (padding != null) {
      cssText.push("padding:" + formatUtil$2.normalizeCssArray(padding).join("px ") + "px");
    }
    return cssText.join(";") + ";";
  }
  function makeStyleCoord$1(out2, zr, appendToBody, zrX, zrY) {
    var zrPainter = zr && zr.painter;
    if (appendToBody) {
      var zrViewportRoot = zrPainter && zrPainter.getViewportRoot();
      if (zrViewportRoot) {
        domUtil.transformLocalCoord(out2, zrViewportRoot, document.body, zrX, zrY);
      }
    } else {
      out2[0] = zrX;
      out2[1] = zrY;
      var viewportRootOffset = zrPainter && zrPainter.getViewportRootOffset();
      if (viewportRootOffset) {
        out2[0] += viewportRootOffset.offsetLeft;
        out2[1] += viewportRootOffset.offsetTop;
      }
    }
    out2[2] = out2[0] / zr.getWidth();
    out2[3] = out2[1] / zr.getHeight();
  }
  function TooltipContent$1(container, api, opt) {
    if (env$1.wxa) {
      return null;
    }
    var el = document.createElement("div");
    el.domBelongToZr = true;
    this.el = el;
    var zr = this._zr = api.getZr();
    var appendToBody = this._appendToBody = opt && opt.appendToBody;
    this._styleCoord = [0, 0, 0, 0];
    makeStyleCoord$1(this._styleCoord, zr, appendToBody, api.getWidth() / 2, api.getHeight() / 2);
    if (appendToBody) {
      document.body.appendChild(el);
    } else {
      container.appendChild(el);
    }
    this._container = container;
    this._show = false;
    this._hideTimeout;
    var self2 = this;
    el.onmouseenter = function() {
      if (self2._enterable) {
        clearTimeout(self2._hideTimeout);
        self2._show = true;
      }
      self2._inContent = true;
    };
    el.onmousemove = function(e) {
      e = e || window.event;
      if (!self2._enterable) {
        var handler = zr.handler;
        var zrViewportRoot = zr.painter.getViewportRoot();
        eventUtil.normalizeEvent(zrViewportRoot, e, true);
        handler.dispatch("mousemove", e);
      }
    };
    el.onmouseleave = function() {
      if (self2._enterable) {
        if (self2._show) {
          self2.hideLater(self2._hideDelay);
        }
      }
      self2._inContent = false;
    };
  }
  TooltipContent$1.prototype = {
    constructor: TooltipContent$1,
    _enterable: true,
    update: function(tooltipModel) {
      var container = this._container;
      var stl = container.currentStyle || document.defaultView.getComputedStyle(container);
      var domStyle = container.style;
      if (domStyle.position !== "absolute" && stl.position !== "absolute") {
        domStyle.position = "relative";
      }
      var alwaysShowContent = tooltipModel.get("alwaysShowContent");
      alwaysShowContent && this._moveTooltipIfResized();
    },
    _moveTooltipIfResized: function() {
      var ratioX = this._styleCoord[2];
      var ratioY = this._styleCoord[3];
      var realX = ratioX * this._zr.getWidth();
      var realY = ratioY * this._zr.getHeight();
      this.moveTo(realX, realY);
    },
    show: function(tooltipModel) {
      clearTimeout(this._hideTimeout);
      var el = this.el;
      var styleCoord = this._styleCoord;
      el.style.cssText = gCssText + assembleCssText(tooltipModel) + ";left:" + styleCoord[0] + "px;top:" + styleCoord[1] + "px;" + (tooltipModel.get("extraCssText") || "");
      el.style.display = el.innerHTML ? "block" : "none";
      el.style.pointerEvents = this._enterable ? "auto" : "none";
      this._show = true;
    },
    setContent: function(content) {
      this.el.innerHTML = content == null ? "" : content;
    },
    setEnterable: function(enterable) {
      this._enterable = enterable;
    },
    getSize: function() {
      var el = this.el;
      return [el.clientWidth, el.clientHeight];
    },
    moveTo: function(zrX, zrY) {
      var styleCoord = this._styleCoord;
      makeStyleCoord$1(styleCoord, this._zr, this._appendToBody, zrX, zrY);
      var style = this.el.style;
      style.left = styleCoord[0] + "px";
      style.top = styleCoord[1] + "px";
    },
    hide: function() {
      this.el.style.display = "none";
      this._show = false;
    },
    hideLater: function(time) {
      if (this._show && !(this._inContent && this._enterable)) {
        if (time) {
          this._hideDelay = time;
          this._show = false;
          this._hideTimeout = setTimeout(zrUtil$5.bind(this.hide, this), time);
        } else {
          this.hide();
        }
      }
    },
    isShow: function() {
      return this._show;
    },
    dispose: function() {
      this.el.parentNode.removeChild(this.el);
    },
    getOuterSize: function() {
      var width = this.el.clientWidth;
      var height = this.el.clientHeight;
      if (document.defaultView && document.defaultView.getComputedStyle) {
        var stl = document.defaultView.getComputedStyle(this.el);
        if (stl) {
          width += parseInt(stl.borderLeftWidth, 10) + parseInt(stl.borderRightWidth, 10);
          height += parseInt(stl.borderTopWidth, 10) + parseInt(stl.borderBottomWidth, 10);
        }
      }
      return {
        width,
        height
      };
    }
  };
  var _default$2 = TooltipContent$1;
  var TooltipContent_1 = _default$2;
  var zrUtil$4 = util$6;
  var Text = Text_1;
  var graphicUtil = graphic$g;
  function makeStyleCoord(out2, zr, zrX, zrY) {
    out2[0] = zrX;
    out2[1] = zrY;
    out2[2] = out2[0] / zr.getWidth();
    out2[3] = out2[1] / zr.getHeight();
  }
  function TooltipRichContent$1(api) {
    var zr = this._zr = api.getZr();
    this._styleCoord = [0, 0, 0, 0];
    makeStyleCoord(this._styleCoord, zr, api.getWidth() / 2, api.getHeight() / 2);
    this._show = false;
    this._hideTimeout;
  }
  TooltipRichContent$1.prototype = {
    constructor: TooltipRichContent$1,
    _enterable: true,
    update: function(tooltipModel) {
      var alwaysShowContent = tooltipModel.get("alwaysShowContent");
      alwaysShowContent && this._moveTooltipIfResized();
    },
    _moveTooltipIfResized: function() {
      var ratioX = this._styleCoord[2];
      var ratioY = this._styleCoord[3];
      var realX = ratioX * this._zr.getWidth();
      var realY = ratioY * this._zr.getHeight();
      this.moveTo(realX, realY);
    },
    show: function(tooltipModel) {
      if (this._hideTimeout) {
        clearTimeout(this._hideTimeout);
      }
      this.el.attr("show", true);
      this._show = true;
    },
    setContent: function(content, markerRich, tooltipModel) {
      if (this.el) {
        this._zr.remove(this.el);
      }
      var markers = {};
      var text2 = content;
      var prefix = "{marker";
      var suffix = "|}";
      var startId = text2.indexOf(prefix);
      while (startId >= 0) {
        var endId = text2.indexOf(suffix);
        var name = text2.substr(startId + prefix.length, endId - startId - prefix.length);
        if (name.indexOf("sub") > -1) {
          markers["marker" + name] = {
            textWidth: 4,
            textHeight: 4,
            textBorderRadius: 2,
            textBackgroundColor: markerRich[name],
            textOffset: [3, 0]
          };
        } else {
          markers["marker" + name] = {
            textWidth: 10,
            textHeight: 10,
            textBorderRadius: 5,
            textBackgroundColor: markerRich[name]
          };
        }
        text2 = text2.substr(endId + 1);
        startId = text2.indexOf("{marker");
      }
      var textStyleModel = tooltipModel.getModel("textStyle");
      var fontSize = textStyleModel.get("fontSize");
      var lineHeight = tooltipModel.get("textLineHeight");
      if (lineHeight == null) {
        lineHeight = Math.round(fontSize * 3 / 2);
      }
      this.el = new Text({
        style: graphicUtil.setTextStyle({}, textStyleModel, {
          rich: markers,
          text: content,
          textBackgroundColor: tooltipModel.get("backgroundColor"),
          textBorderRadius: tooltipModel.get("borderRadius"),
          textFill: tooltipModel.get("textStyle.color"),
          textPadding: tooltipModel.get("padding"),
          textLineHeight: lineHeight
        }),
        z: tooltipModel.get("z")
      });
      this._zr.add(this.el);
      var self2 = this;
      this.el.on("mouseover", function() {
        if (self2._enterable) {
          clearTimeout(self2._hideTimeout);
          self2._show = true;
        }
        self2._inContent = true;
      });
      this.el.on("mouseout", function() {
        if (self2._enterable) {
          if (self2._show) {
            self2.hideLater(self2._hideDelay);
          }
        }
        self2._inContent = false;
      });
    },
    setEnterable: function(enterable) {
      this._enterable = enterable;
    },
    getSize: function() {
      var bounding = this.el.getBoundingRect();
      return [bounding.width, bounding.height];
    },
    moveTo: function(x, y) {
      if (this.el) {
        var styleCoord = this._styleCoord;
        makeStyleCoord(styleCoord, this._zr, x, y);
        this.el.attr("position", [styleCoord[0], styleCoord[1]]);
      }
    },
    hide: function() {
      if (this.el) {
        this.el.hide();
      }
      this._show = false;
    },
    hideLater: function(time) {
      if (this._show && !(this._inContent && this._enterable)) {
        if (time) {
          this._hideDelay = time;
          this._show = false;
          this._hideTimeout = setTimeout(zrUtil$4.bind(this.hide, this), time);
        } else {
          this.hide();
        }
      }
    },
    isShow: function() {
      return this._show;
    },
    dispose: function() {
      clearTimeout(this._hideTimeout);
      if (this.el) {
        this._zr.remove(this.el);
      }
    },
    getOuterSize: function() {
      var size = this.getSize();
      return {
        width: size[0],
        height: size[1]
      };
    }
  };
  var _default$1 = TooltipRichContent$1;
  var TooltipRichContent_1 = _default$1;
  var echarts$5 = echarts$d;
  var zrUtil$3 = util$6;
  var env = env_1;
  var TooltipContent = TooltipContent_1;
  var TooltipRichContent = TooltipRichContent_1;
  var formatUtil$1 = format;
  var numberUtil = number;
  var graphic$2 = graphic$g;
  var findPointFromSeries = findPointFromSeries$2;
  var layoutUtil$1 = layout$4;
  var Model$1 = Model_1;
  var globalListener = globalListener$2;
  var axisHelper = axisHelper$3;
  var axisPointerViewHelper = viewHelper$1;
  var _model$1 = model;
  var getTooltipRenderMode = _model$1.getTooltipRenderMode;
  var bind = zrUtil$3.bind;
  var each$1 = zrUtil$3.each;
  var parsePercent = numberUtil.parsePercent;
  var proxyRect = new graphic$2.Rect({
    shape: {
      x: -1,
      y: -1,
      width: 2,
      height: 2
    }
  });
  echarts$5.extendComponentView({
    type: "tooltip",
    init: function(ecModel, api) {
      if (env.node) {
        return;
      }
      var tooltipModel = ecModel.getComponent("tooltip");
      var renderMode = tooltipModel.get("renderMode");
      this._renderMode = getTooltipRenderMode(renderMode);
      var tooltipContent;
      if (this._renderMode === "html") {
        tooltipContent = new TooltipContent(api.getDom(), api, {
          appendToBody: tooltipModel.get("appendToBody", true)
        });
        this._newLine = "<br/>";
      } else {
        tooltipContent = new TooltipRichContent(api);
        this._newLine = "\n";
      }
      this._tooltipContent = tooltipContent;
    },
    render: function(tooltipModel, ecModel, api) {
      if (env.node) {
        return;
      }
      this.group.removeAll();
      this._tooltipModel = tooltipModel;
      this._ecModel = ecModel;
      this._api = api;
      this._lastDataByCoordSys = null;
      this._alwaysShowContent = tooltipModel.get("alwaysShowContent");
      var tooltipContent = this._tooltipContent;
      tooltipContent.update(tooltipModel);
      tooltipContent.setEnterable(tooltipModel.get("enterable"));
      this._initGlobalListener();
      this._keepShow();
    },
    _initGlobalListener: function() {
      var tooltipModel = this._tooltipModel;
      var triggerOn = tooltipModel.get("triggerOn");
      globalListener.register("itemTooltip", this._api, bind(function(currTrigger, e, dispatchAction) {
        if (triggerOn !== "none") {
          if (triggerOn.indexOf(currTrigger) >= 0) {
            this._tryShow(e, dispatchAction);
          } else if (currTrigger === "leave") {
            this._hide(dispatchAction);
          }
        }
      }, this));
    },
    _keepShow: function() {
      var tooltipModel = this._tooltipModel;
      var ecModel = this._ecModel;
      var api = this._api;
      if (this._lastX != null && this._lastY != null && tooltipModel.get("triggerOn") !== "none") {
        var self2 = this;
        clearTimeout(this._refreshUpdateTimeout);
        this._refreshUpdateTimeout = setTimeout(function() {
          !api.isDisposed() && self2.manuallyShowTip(tooltipModel, ecModel, api, {
            x: self2._lastX,
            y: self2._lastY
          });
        });
      }
    },
    manuallyShowTip: function(tooltipModel, ecModel, api, payload) {
      if (payload.from === this.uid || env.node) {
        return;
      }
      var dispatchAction = makeDispatchAction(payload, api);
      this._ticket = "";
      var dataByCoordSys = payload.dataByCoordSys;
      if (payload.tooltip && payload.x != null && payload.y != null) {
        var el = proxyRect;
        el.position = [payload.x, payload.y];
        el.update();
        el.tooltip = payload.tooltip;
        this._tryShow({
          offsetX: payload.x,
          offsetY: payload.y,
          target: el
        }, dispatchAction);
      } else if (dataByCoordSys) {
        this._tryShow({
          offsetX: payload.x,
          offsetY: payload.y,
          position: payload.position,
          dataByCoordSys: payload.dataByCoordSys,
          tooltipOption: payload.tooltipOption
        }, dispatchAction);
      } else if (payload.seriesIndex != null) {
        if (this._manuallyAxisShowTip(tooltipModel, ecModel, api, payload)) {
          return;
        }
        var pointInfo = findPointFromSeries(payload, ecModel);
        var cx = pointInfo.point[0];
        var cy = pointInfo.point[1];
        if (cx != null && cy != null) {
          this._tryShow({
            offsetX: cx,
            offsetY: cy,
            position: payload.position,
            target: pointInfo.el
          }, dispatchAction);
        }
      } else if (payload.x != null && payload.y != null) {
        api.dispatchAction({
          type: "updateAxisPointer",
          x: payload.x,
          y: payload.y
        });
        this._tryShow({
          offsetX: payload.x,
          offsetY: payload.y,
          position: payload.position,
          target: api.getZr().findHover(payload.x, payload.y).target
        }, dispatchAction);
      }
    },
    manuallyHideTip: function(tooltipModel, ecModel, api, payload) {
      var tooltipContent = this._tooltipContent;
      if (!this._alwaysShowContent && this._tooltipModel) {
        tooltipContent.hideLater(this._tooltipModel.get("hideDelay"));
      }
      this._lastX = this._lastY = null;
      if (payload.from !== this.uid) {
        this._hide(makeDispatchAction(payload, api));
      }
    },
    _manuallyAxisShowTip: function(tooltipModel, ecModel, api, payload) {
      var seriesIndex = payload.seriesIndex;
      var dataIndex = payload.dataIndex;
      var coordSysAxesInfo = ecModel.getComponent("axisPointer").coordSysAxesInfo;
      if (seriesIndex == null || dataIndex == null || coordSysAxesInfo == null) {
        return;
      }
      var seriesModel = ecModel.getSeriesByIndex(seriesIndex);
      if (!seriesModel) {
        return;
      }
      var data = seriesModel.getData();
      var tooltipModel = buildTooltipModel([data.getItemModel(dataIndex), seriesModel, (seriesModel.coordinateSystem || {}).model, tooltipModel]);
      if (tooltipModel.get("trigger") !== "axis") {
        return;
      }
      api.dispatchAction({
        type: "updateAxisPointer",
        seriesIndex,
        dataIndex,
        position: payload.position
      });
      return true;
    },
    _tryShow: function(e, dispatchAction) {
      var el = e.target;
      var tooltipModel = this._tooltipModel;
      if (!tooltipModel) {
        return;
      }
      this._lastX = e.offsetX;
      this._lastY = e.offsetY;
      var dataByCoordSys = e.dataByCoordSys;
      if (dataByCoordSys && dataByCoordSys.length) {
        this._showAxisTooltip(dataByCoordSys, e);
      } else if (el && el.dataIndex != null) {
        this._lastDataByCoordSys = null;
        this._showSeriesItemTooltip(e, el, dispatchAction);
      } else if (el && el.tooltip) {
        this._lastDataByCoordSys = null;
        this._showComponentItemTooltip(e, el, dispatchAction);
      } else {
        this._lastDataByCoordSys = null;
        this._hide(dispatchAction);
      }
    },
    _showOrMove: function(tooltipModel, cb) {
      var delay = tooltipModel.get("showDelay");
      cb = zrUtil$3.bind(cb, this);
      clearTimeout(this._showTimout);
      delay > 0 ? this._showTimout = setTimeout(cb, delay) : cb();
    },
    _showAxisTooltip: function(dataByCoordSys, e) {
      var ecModel = this._ecModel;
      var globalTooltipModel = this._tooltipModel;
      var point = [e.offsetX, e.offsetY];
      var singleDefaultHTML = [];
      var singleParamsList = [];
      var singleTooltipModel = buildTooltipModel([e.tooltipOption, globalTooltipModel]);
      var renderMode = this._renderMode;
      var newLine = this._newLine;
      var markers = {};
      each$1(dataByCoordSys, function(itemCoordSys) {
        each$1(itemCoordSys.dataByAxis, function(item) {
          var axisModel = ecModel.getComponent(item.axisDim + "Axis", item.axisIndex);
          var axisValue = item.value;
          var seriesDefaultHTML = [];
          if (!axisModel || axisValue == null) {
            return;
          }
          var valueLabel = axisPointerViewHelper.getValueLabel(axisValue, axisModel.axis, ecModel, item.seriesDataIndices, item.valueLabelOpt);
          zrUtil$3.each(item.seriesDataIndices, function(idxItem) {
            var series = ecModel.getSeriesByIndex(idxItem.seriesIndex);
            var dataIndex = idxItem.dataIndexInside;
            var dataParams = series && series.getDataParams(dataIndex);
            dataParams.axisDim = item.axisDim;
            dataParams.axisIndex = item.axisIndex;
            dataParams.axisType = item.axisType;
            dataParams.axisId = item.axisId;
            dataParams.axisValue = axisHelper.getAxisRawValue(axisModel.axis, axisValue);
            dataParams.axisValueLabel = valueLabel;
            if (dataParams) {
              singleParamsList.push(dataParams);
              var seriesTooltip = series.formatTooltip(dataIndex, true, null, renderMode);
              var html;
              if (zrUtil$3.isObject(seriesTooltip)) {
                html = seriesTooltip.html;
                var newMarkers = seriesTooltip.markers;
                zrUtil$3.merge(markers, newMarkers);
              } else {
                html = seriesTooltip;
              }
              seriesDefaultHTML.push(html);
            }
          });
          var firstLine = valueLabel;
          if (renderMode !== "html") {
            singleDefaultHTML.push(seriesDefaultHTML.join(newLine));
          } else {
            singleDefaultHTML.push((firstLine ? formatUtil$1.encodeHTML(firstLine) + newLine : "") + seriesDefaultHTML.join(newLine));
          }
        });
      }, this);
      singleDefaultHTML.reverse();
      singleDefaultHTML = singleDefaultHTML.join(this._newLine + this._newLine);
      var positionExpr = e.position;
      this._showOrMove(singleTooltipModel, function() {
        if (this._updateContentNotChangedOnAxis(dataByCoordSys)) {
          this._updatePosition(singleTooltipModel, positionExpr, point[0], point[1], this._tooltipContent, singleParamsList);
        } else {
          this._showTooltipContent(singleTooltipModel, singleDefaultHTML, singleParamsList, Math.random(), point[0], point[1], positionExpr, void 0, markers);
        }
      });
    },
    _showSeriesItemTooltip: function(e, el, dispatchAction) {
      var ecModel = this._ecModel;
      var seriesIndex = el.seriesIndex;
      var seriesModel = ecModel.getSeriesByIndex(seriesIndex);
      var dataModel = el.dataModel || seriesModel;
      var dataIndex = el.dataIndex;
      var dataType = el.dataType;
      var data = dataModel.getData(dataType);
      var tooltipModel = buildTooltipModel([data.getItemModel(dataIndex), dataModel, seriesModel && (seriesModel.coordinateSystem || {}).model, this._tooltipModel]);
      var tooltipTrigger = tooltipModel.get("trigger");
      if (tooltipTrigger != null && tooltipTrigger !== "item") {
        return;
      }
      var params = dataModel.getDataParams(dataIndex, dataType);
      var seriesTooltip = dataModel.formatTooltip(dataIndex, false, dataType, this._renderMode);
      var defaultHtml;
      var markers;
      if (zrUtil$3.isObject(seriesTooltip)) {
        defaultHtml = seriesTooltip.html;
        markers = seriesTooltip.markers;
      } else {
        defaultHtml = seriesTooltip;
        markers = null;
      }
      var asyncTicket = "item_" + dataModel.name + "_" + dataIndex;
      this._showOrMove(tooltipModel, function() {
        this._showTooltipContent(tooltipModel, defaultHtml, params, asyncTicket, e.offsetX, e.offsetY, e.position, e.target, markers);
      });
      dispatchAction({
        type: "showTip",
        dataIndexInside: dataIndex,
        dataIndex: data.getRawIndex(dataIndex),
        seriesIndex,
        from: this.uid
      });
    },
    _showComponentItemTooltip: function(e, el, dispatchAction) {
      var tooltipOpt = el.tooltip;
      if (typeof tooltipOpt === "string") {
        var content = tooltipOpt;
        tooltipOpt = {
          content,
          formatter: content
        };
      }
      var subTooltipModel = new Model$1(tooltipOpt, this._tooltipModel, this._ecModel);
      var defaultHtml = subTooltipModel.get("content");
      var asyncTicket = Math.random();
      this._showOrMove(subTooltipModel, function() {
        this._showTooltipContent(subTooltipModel, defaultHtml, subTooltipModel.get("formatterParams") || {}, asyncTicket, e.offsetX, e.offsetY, e.position, el);
      });
      dispatchAction({
        type: "showTip",
        from: this.uid
      });
    },
    _showTooltipContent: function(tooltipModel, defaultHtml, params, asyncTicket, x, y, positionExpr, el, markers) {
      this._ticket = "";
      if (!tooltipModel.get("showContent") || !tooltipModel.get("show")) {
        return;
      }
      var tooltipContent = this._tooltipContent;
      var formatter = tooltipModel.get("formatter");
      positionExpr = positionExpr || tooltipModel.get("position");
      var html = defaultHtml;
      if (formatter && typeof formatter === "string") {
        html = formatUtil$1.formatTpl(formatter, params, true);
      } else if (typeof formatter === "function") {
        var callback = bind(function(cbTicket, html2) {
          if (cbTicket === this._ticket) {
            tooltipContent.setContent(html2, markers, tooltipModel);
            this._updatePosition(tooltipModel, positionExpr, x, y, tooltipContent, params, el);
          }
        }, this);
        this._ticket = asyncTicket;
        html = formatter(params, asyncTicket, callback);
      }
      tooltipContent.setContent(html, markers, tooltipModel);
      tooltipContent.show(tooltipModel);
      this._updatePosition(tooltipModel, positionExpr, x, y, tooltipContent, params, el);
    },
    _updatePosition: function(tooltipModel, positionExpr, x, y, content, params, el) {
      var viewWidth = this._api.getWidth();
      var viewHeight = this._api.getHeight();
      positionExpr = positionExpr || tooltipModel.get("position");
      var contentSize = content.getSize();
      var align = tooltipModel.get("align");
      var vAlign = tooltipModel.get("verticalAlign");
      var rect = el && el.getBoundingRect().clone();
      el && rect.applyTransform(el.transform);
      if (typeof positionExpr === "function") {
        positionExpr = positionExpr([x, y], params, content.el, rect, {
          viewSize: [viewWidth, viewHeight],
          contentSize: contentSize.slice()
        });
      }
      if (zrUtil$3.isArray(positionExpr)) {
        x = parsePercent(positionExpr[0], viewWidth);
        y = parsePercent(positionExpr[1], viewHeight);
      } else if (zrUtil$3.isObject(positionExpr)) {
        positionExpr.width = contentSize[0];
        positionExpr.height = contentSize[1];
        var layoutRect = layoutUtil$1.getLayoutRect(positionExpr, {
          width: viewWidth,
          height: viewHeight
        });
        x = layoutRect.x;
        y = layoutRect.y;
        align = null;
        vAlign = null;
      } else if (typeof positionExpr === "string" && el) {
        var pos = calcTooltipPosition(positionExpr, rect, contentSize);
        x = pos[0];
        y = pos[1];
      } else {
        var pos = refixTooltipPosition(x, y, content, viewWidth, viewHeight, align ? null : 20, vAlign ? null : 20);
        x = pos[0];
        y = pos[1];
      }
      align && (x -= isCenterAlign(align) ? contentSize[0] / 2 : align === "right" ? contentSize[0] : 0);
      vAlign && (y -= isCenterAlign(vAlign) ? contentSize[1] / 2 : vAlign === "bottom" ? contentSize[1] : 0);
      if (tooltipModel.get("confine")) {
        var pos = confineTooltipPosition(x, y, content, viewWidth, viewHeight);
        x = pos[0];
        y = pos[1];
      }
      content.moveTo(x, y);
    },
    _updateContentNotChangedOnAxis: function(dataByCoordSys) {
      var lastCoordSys = this._lastDataByCoordSys;
      var contentNotChanged = !!lastCoordSys && lastCoordSys.length === dataByCoordSys.length;
      contentNotChanged && each$1(lastCoordSys, function(lastItemCoordSys, indexCoordSys) {
        var lastDataByAxis = lastItemCoordSys.dataByAxis || {};
        var thisItemCoordSys = dataByCoordSys[indexCoordSys] || {};
        var thisDataByAxis = thisItemCoordSys.dataByAxis || [];
        contentNotChanged &= lastDataByAxis.length === thisDataByAxis.length;
        contentNotChanged && each$1(lastDataByAxis, function(lastItem, indexAxis) {
          var thisItem = thisDataByAxis[indexAxis] || {};
          var lastIndices = lastItem.seriesDataIndices || [];
          var newIndices = thisItem.seriesDataIndices || [];
          contentNotChanged &= lastItem.value === thisItem.value && lastItem.axisType === thisItem.axisType && lastItem.axisId === thisItem.axisId && lastIndices.length === newIndices.length;
          contentNotChanged && each$1(lastIndices, function(lastIdxItem, j) {
            var newIdxItem = newIndices[j];
            contentNotChanged &= lastIdxItem.seriesIndex === newIdxItem.seriesIndex && lastIdxItem.dataIndex === newIdxItem.dataIndex;
          });
        });
      });
      this._lastDataByCoordSys = dataByCoordSys;
      return !!contentNotChanged;
    },
    _hide: function(dispatchAction) {
      this._lastDataByCoordSys = null;
      dispatchAction({
        type: "hideTip",
        from: this.uid
      });
    },
    dispose: function(ecModel, api) {
      if (env.node) {
        return;
      }
      this._tooltipContent.dispose();
      globalListener.unregister("itemTooltip", api);
    }
  });
  function buildTooltipModel(modelCascade) {
    var resultModel = modelCascade.pop();
    while (modelCascade.length) {
      var tooltipOpt = modelCascade.pop();
      if (tooltipOpt) {
        if (Model$1.isInstance(tooltipOpt)) {
          tooltipOpt = tooltipOpt.get("tooltip", true);
        }
        if (typeof tooltipOpt === "string") {
          tooltipOpt = {
            formatter: tooltipOpt
          };
        }
        resultModel = new Model$1(tooltipOpt, resultModel, resultModel.ecModel);
      }
    }
    return resultModel;
  }
  function makeDispatchAction(payload, api) {
    return payload.dispatchAction || zrUtil$3.bind(api.dispatchAction, api);
  }
  function refixTooltipPosition(x, y, content, viewWidth, viewHeight, gapH, gapV) {
    var size = content.getOuterSize();
    var width = size.width;
    var height = size.height;
    if (gapH != null) {
      if (x + width + gapH > viewWidth) {
        x -= width + gapH;
      } else {
        x += gapH;
      }
    }
    if (gapV != null) {
      if (y + height + gapV > viewHeight) {
        y -= height + gapV;
      } else {
        y += gapV;
      }
    }
    return [x, y];
  }
  function confineTooltipPosition(x, y, content, viewWidth, viewHeight) {
    var size = content.getOuterSize();
    var width = size.width;
    var height = size.height;
    x = Math.min(x + width, viewWidth) - width;
    y = Math.min(y + height, viewHeight) - height;
    x = Math.max(x, 0);
    y = Math.max(y, 0);
    return [x, y];
  }
  function calcTooltipPosition(position, rect, contentSize) {
    var domWidth = contentSize[0];
    var domHeight = contentSize[1];
    var gap = 5;
    var x = 0;
    var y = 0;
    var rectWidth = rect.width;
    var rectHeight = rect.height;
    switch (position) {
      case "inside":
        x = rect.x + rectWidth / 2 - domWidth / 2;
        y = rect.y + rectHeight / 2 - domHeight / 2;
        break;
      case "top":
        x = rect.x + rectWidth / 2 - domWidth / 2;
        y = rect.y - domHeight - gap;
        break;
      case "bottom":
        x = rect.x + rectWidth / 2 - domWidth / 2;
        y = rect.y + rectHeight + gap;
        break;
      case "left":
        x = rect.x - domWidth - gap;
        y = rect.y + rectHeight / 2 - domHeight / 2;
        break;
      case "right":
        x = rect.x + rectWidth + gap;
        y = rect.y + rectHeight / 2 - domHeight / 2;
    }
    return [x, y];
  }
  function isCenterAlign(align) {
    return align === "center" || align === "middle";
  }
  var echarts$4 = echarts$d;
  echarts$4.registerAction({
    type: "showTip",
    event: "showTip",
    update: "tooltip:manuallyShowTip"
  }, function() {
  });
  echarts$4.registerAction({
    type: "hideTip",
    event: "hideTip",
    update: "tooltip:manuallyHideTip"
  }, function() {
  });
  var echarts$3 = echarts$d;
  var zrUtil$2 = util$6;
  var Model = Model_1;
  var _model = model;
  var isNameSpecified = _model.isNameSpecified;
  var lang = lang$2;
  var langSelector = lang.legend.selector;
  var defaultSelectorOption = {
    all: {
      type: "all",
      title: zrUtil$2.clone(langSelector.all)
    },
    inverse: {
      type: "inverse",
      title: zrUtil$2.clone(langSelector.inverse)
    }
  };
  var LegendModel = echarts$3.extendComponentModel({
    type: "legend.plain",
    dependencies: ["series"],
    layoutMode: {
      type: "box",
      ignoreSize: true
    },
    init: function(option, parentModel, ecModel) {
      this.mergeDefaultAndTheme(option, ecModel);
      option.selected = option.selected || {};
      this._updateSelector(option);
    },
    mergeOption: function(option) {
      LegendModel.superCall(this, "mergeOption", option);
      this._updateSelector(option);
    },
    _updateSelector: function(option) {
      var selector = option.selector;
      if (selector === true) {
        selector = option.selector = ["all", "inverse"];
      }
      if (zrUtil$2.isArray(selector)) {
        zrUtil$2.each(selector, function(item, index2) {
          zrUtil$2.isString(item) && (item = {
            type: item
          });
          selector[index2] = zrUtil$2.merge(item, defaultSelectorOption[item.type]);
        });
      }
    },
    optionUpdated: function() {
      this._updateData(this.ecModel);
      var legendData = this._data;
      if (legendData[0] && this.get("selectedMode") === "single") {
        var hasSelected = false;
        for (var i2 = 0; i2 < legendData.length; i2++) {
          var name = legendData[i2].get("name");
          if (this.isSelected(name)) {
            this.select(name);
            hasSelected = true;
            break;
          }
        }
        !hasSelected && this.select(legendData[0].get("name"));
      }
    },
    _updateData: function(ecModel) {
      var potentialData = [];
      var availableNames = [];
      ecModel.eachRawSeries(function(seriesModel) {
        var seriesName = seriesModel.name;
        availableNames.push(seriesName);
        var isPotential;
        if (seriesModel.legendVisualProvider) {
          var provider = seriesModel.legendVisualProvider;
          var names = provider.getAllNames();
          if (!ecModel.isSeriesFiltered(seriesModel)) {
            availableNames = availableNames.concat(names);
          }
          if (names.length) {
            potentialData = potentialData.concat(names);
          } else {
            isPotential = true;
          }
        } else {
          isPotential = true;
        }
        if (isPotential && isNameSpecified(seriesModel)) {
          potentialData.push(seriesModel.name);
        }
      });
      this._availableNames = availableNames;
      var rawData = this.get("data") || potentialData;
      var legendData = zrUtil$2.map(rawData, function(dataItem) {
        if (typeof dataItem === "string" || typeof dataItem === "number") {
          dataItem = {
            name: dataItem
          };
        }
        return new Model(dataItem, this, this.ecModel);
      }, this);
      this._data = legendData;
    },
    getData: function() {
      return this._data;
    },
    select: function(name) {
      var selected = this.option.selected;
      var selectedMode = this.get("selectedMode");
      if (selectedMode === "single") {
        var data = this._data;
        zrUtil$2.each(data, function(dataItem) {
          selected[dataItem.get("name")] = false;
        });
      }
      selected[name] = true;
    },
    unSelect: function(name) {
      if (this.get("selectedMode") !== "single") {
        this.option.selected[name] = false;
      }
    },
    toggleSelected: function(name) {
      var selected = this.option.selected;
      if (!selected.hasOwnProperty(name)) {
        selected[name] = true;
      }
      this[selected[name] ? "unSelect" : "select"](name);
    },
    allSelect: function() {
      var data = this._data;
      var selected = this.option.selected;
      zrUtil$2.each(data, function(dataItem) {
        selected[dataItem.get("name", true)] = true;
      });
    },
    inverseSelect: function() {
      var data = this._data;
      var selected = this.option.selected;
      zrUtil$2.each(data, function(dataItem) {
        var name = dataItem.get("name", true);
        if (!selected.hasOwnProperty(name)) {
          selected[name] = true;
        }
        selected[name] = !selected[name];
      });
    },
    isSelected: function(name) {
      var selected = this.option.selected;
      return !(selected.hasOwnProperty(name) && !selected[name]) && zrUtil$2.indexOf(this._availableNames, name) >= 0;
    },
    getOrient: function() {
      return this.get("orient") === "vertical" ? {
        index: 1,
        name: "vertical"
      } : {
        index: 0,
        name: "horizontal"
      };
    },
    defaultOption: {
      zlevel: 0,
      z: 4,
      show: true,
      orient: "horizontal",
      left: "center",
      top: 0,
      align: "auto",
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "#ccc",
      borderRadius: 0,
      borderWidth: 0,
      padding: 5,
      itemGap: 10,
      itemWidth: 25,
      itemHeight: 14,
      inactiveColor: "#ccc",
      inactiveBorderColor: "#ccc",
      itemStyle: {
        borderWidth: 0
      },
      textStyle: {
        color: "#333"
      },
      selectedMode: true,
      selector: false,
      selectorLabel: {
        show: true,
        borderRadius: 10,
        padding: [3, 5, 3, 5],
        fontSize: 12,
        fontFamily: " sans-serif",
        color: "#666",
        borderWidth: 1,
        borderColor: "#666"
      },
      emphasis: {
        selectorLabel: {
          show: true,
          color: "#eee",
          backgroundColor: "#666"
        }
      },
      selectorPosition: "auto",
      selectorItemGap: 7,
      selectorButtonGap: 10,
      tooltip: {
        show: false
      }
    }
  });
  var echarts$2 = echarts$d;
  var zrUtil$1 = util$6;
  function legendSelectActionHandler(methodName, payload, ecModel) {
    var selectedMap = {};
    var isToggleSelect = methodName === "toggleSelected";
    var isSelected;
    ecModel.eachComponent("legend", function(legendModel) {
      if (isToggleSelect && isSelected != null) {
        legendModel[isSelected ? "select" : "unSelect"](payload.name);
      } else if (methodName === "allSelect" || methodName === "inverseSelect") {
        legendModel[methodName]();
      } else {
        legendModel[methodName](payload.name);
        isSelected = legendModel.isSelected(payload.name);
      }
      var legendData = legendModel.getData();
      zrUtil$1.each(legendData, function(model2) {
        var name = model2.get("name");
        if (name === "\n" || name === "") {
          return;
        }
        var isItemSelected = legendModel.isSelected(name);
        if (selectedMap.hasOwnProperty(name)) {
          selectedMap[name] = selectedMap[name] && isItemSelected;
        } else {
          selectedMap[name] = isItemSelected;
        }
      });
    });
    return methodName === "allSelect" || methodName === "inverseSelect" ? {
      selected: selectedMap
    } : {
      name: payload.name,
      selected: selectedMap
    };
  }
  echarts$2.registerAction("legendToggleSelect", "legendselectchanged", zrUtil$1.curry(legendSelectActionHandler, "toggleSelected"));
  echarts$2.registerAction("legendAllSelect", "legendselectall", zrUtil$1.curry(legendSelectActionHandler, "allSelect"));
  echarts$2.registerAction("legendInverseSelect", "legendinverseselect", zrUtil$1.curry(legendSelectActionHandler, "inverseSelect"));
  echarts$2.registerAction("legendSelect", "legendselected", zrUtil$1.curry(legendSelectActionHandler, "select"));
  echarts$2.registerAction("legendUnSelect", "legendunselected", zrUtil$1.curry(legendSelectActionHandler, "unSelect"));
  var listComponent = {};
  var _layout = layout$4;
  var getLayoutRect = _layout.getLayoutRect;
  var layoutBox = _layout.box;
  var positionElement = _layout.positionElement;
  var formatUtil = format;
  var graphic$1 = graphic$g;
  function layout(group, componentModel, api) {
    var boxLayoutParams = componentModel.getBoxLayoutParams();
    var padding = componentModel.get("padding");
    var viewportSize = {
      width: api.getWidth(),
      height: api.getHeight()
    };
    var rect = getLayoutRect(boxLayoutParams, viewportSize, padding);
    layoutBox(componentModel.get("orient"), group, componentModel.get("itemGap"), rect.width, rect.height);
    positionElement(group, boxLayoutParams, viewportSize, padding);
  }
  function makeBackground$1(rect, componentModel) {
    var padding = formatUtil.normalizeCssArray(componentModel.get("padding"));
    var style = componentModel.getItemStyle(["color", "opacity"]);
    style.fill = componentModel.get("backgroundColor");
    var rect = new graphic$1.Rect({
      shape: {
        x: rect.x - padding[3],
        y: rect.y - padding[0],
        width: rect.width + padding[1] + padding[3],
        height: rect.height + padding[0] + padding[2],
        r: componentModel.get("borderRadius")
      },
      style,
      silent: true,
      z2: -1
    });
    return rect;
  }
  listComponent.layout = layout;
  listComponent.makeBackground = makeBackground$1;
  var echarts$1 = echarts$d;
  var zrUtil = util$6;
  var _symbol = symbol$1;
  var createSymbol = _symbol.createSymbol;
  var graphic = graphic$g;
  var _listComponent = listComponent;
  var makeBackground = _listComponent.makeBackground;
  var layoutUtil = layout$4;
  var curry = zrUtil.curry;
  var each = zrUtil.each;
  var Group = graphic.Group;
  echarts$1.extendComponentView({
    type: "legend.plain",
    newlineDisabled: false,
    init: function() {
      this.group.add(this._contentGroup = new Group());
      this._backgroundEl;
      this.group.add(this._selectorGroup = new Group());
      this._isFirstRender = true;
    },
    getContentGroup: function() {
      return this._contentGroup;
    },
    getSelectorGroup: function() {
      return this._selectorGroup;
    },
    render: function(legendModel, ecModel, api) {
      var isFirstRender = this._isFirstRender;
      this._isFirstRender = false;
      this.resetInner();
      if (!legendModel.get("show", true)) {
        return;
      }
      var itemAlign = legendModel.get("align");
      var orient = legendModel.get("orient");
      if (!itemAlign || itemAlign === "auto") {
        itemAlign = legendModel.get("left") === "right" && orient === "vertical" ? "right" : "left";
      }
      var selector = legendModel.get("selector", true);
      var selectorPosition = legendModel.get("selectorPosition", true);
      if (selector && (!selectorPosition || selectorPosition === "auto")) {
        selectorPosition = orient === "horizontal" ? "end" : "start";
      }
      this.renderInner(itemAlign, legendModel, ecModel, api, selector, orient, selectorPosition);
      var positionInfo = legendModel.getBoxLayoutParams();
      var viewportSize = {
        width: api.getWidth(),
        height: api.getHeight()
      };
      var padding = legendModel.get("padding");
      var maxSize = layoutUtil.getLayoutRect(positionInfo, viewportSize, padding);
      var mainRect = this.layoutInner(legendModel, itemAlign, maxSize, isFirstRender, selector, selectorPosition);
      var layoutRect = layoutUtil.getLayoutRect(zrUtil.defaults({
        width: mainRect.width,
        height: mainRect.height
      }, positionInfo), viewportSize, padding);
      this.group.attr("position", [layoutRect.x - mainRect.x, layoutRect.y - mainRect.y]);
      this.group.add(this._backgroundEl = makeBackground(mainRect, legendModel));
    },
    resetInner: function() {
      this.getContentGroup().removeAll();
      this._backgroundEl && this.group.remove(this._backgroundEl);
      this.getSelectorGroup().removeAll();
    },
    renderInner: function(itemAlign, legendModel, ecModel, api, selector, orient, selectorPosition) {
      var contentGroup = this.getContentGroup();
      var legendDrawnMap = zrUtil.createHashMap();
      var selectMode = legendModel.get("selectedMode");
      var excludeSeriesId = [];
      ecModel.eachRawSeries(function(seriesModel) {
        !seriesModel.get("legendHoverLink") && excludeSeriesId.push(seriesModel.id);
      });
      each(legendModel.getData(), function(itemModel, dataIndex) {
        var name = itemModel.get("name");
        if (!this.newlineDisabled && (name === "" || name === "\n")) {
          contentGroup.add(new Group({
            newline: true
          }));
          return;
        }
        var seriesModel = ecModel.getSeriesByName(name)[0];
        if (legendDrawnMap.get(name)) {
          return;
        }
        if (seriesModel) {
          var data = seriesModel.getData();
          var color2 = data.getVisual("color");
          var borderColor = data.getVisual("borderColor");
          if (typeof color2 === "function") {
            color2 = color2(seriesModel.getDataParams(0));
          }
          if (typeof borderColor === "function") {
            borderColor = borderColor(seriesModel.getDataParams(0));
          }
          var legendSymbolType = data.getVisual("legendSymbol") || "roundRect";
          var symbolType = data.getVisual("symbol");
          var itemGroup = this._createItem(name, dataIndex, itemModel, legendModel, legendSymbolType, symbolType, itemAlign, color2, borderColor, selectMode);
          itemGroup.on("click", curry(dispatchSelectAction, name, null, api, excludeSeriesId)).on("mouseover", curry(dispatchHighlightAction, seriesModel.name, null, api, excludeSeriesId)).on("mouseout", curry(dispatchDownplayAction, seriesModel.name, null, api, excludeSeriesId));
          legendDrawnMap.set(name, true);
        } else {
          ecModel.eachRawSeries(function(seriesModel2) {
            if (legendDrawnMap.get(name)) {
              return;
            }
            if (seriesModel2.legendVisualProvider) {
              var provider = seriesModel2.legendVisualProvider;
              if (!provider.containName(name)) {
                return;
              }
              var idx = provider.indexOfName(name);
              var color3 = provider.getItemVisual(idx, "color");
              var borderColor2 = provider.getItemVisual(idx, "borderColor");
              var legendSymbolType2 = "roundRect";
              var itemGroup2 = this._createItem(name, dataIndex, itemModel, legendModel, legendSymbolType2, null, itemAlign, color3, borderColor2, selectMode);
              itemGroup2.on("click", curry(dispatchSelectAction, null, name, api, excludeSeriesId)).on("mouseover", curry(dispatchHighlightAction, null, name, api, excludeSeriesId)).on("mouseout", curry(dispatchDownplayAction, null, name, api, excludeSeriesId));
              legendDrawnMap.set(name, true);
            }
          }, this);
        }
      }, this);
      if (selector) {
        this._createSelector(selector, legendModel, api, orient, selectorPosition);
      }
    },
    _createSelector: function(selector, legendModel, api, orient, selectorPosition) {
      var selectorGroup = this.getSelectorGroup();
      each(selector, function(selectorItem) {
        createSelectorButton(selectorItem);
      });
      function createSelectorButton(selectorItem) {
        var type = selectorItem.type;
        var labelText = new graphic.Text({
          style: {
            x: 0,
            y: 0,
            align: "center",
            verticalAlign: "middle"
          },
          onclick: function() {
            api.dispatchAction({
              type: type === "all" ? "legendAllSelect" : "legendInverseSelect"
            });
          }
        });
        selectorGroup.add(labelText);
        var labelModel = legendModel.getModel("selectorLabel");
        var emphasisLabelModel = legendModel.getModel("emphasis.selectorLabel");
        graphic.setLabelStyle(labelText.style, labelText.hoverStyle = {}, labelModel, emphasisLabelModel, {
          defaultText: selectorItem.title,
          isRectText: false
        });
        graphic.setHoverStyle(labelText);
      }
    },
    _createItem: function(name, dataIndex, itemModel, legendModel, legendSymbolType, symbolType, itemAlign, color2, borderColor, selectMode) {
      var itemWidth = legendModel.get("itemWidth");
      var itemHeight = legendModel.get("itemHeight");
      var inactiveColor = legendModel.get("inactiveColor");
      var inactiveBorderColor = legendModel.get("inactiveBorderColor");
      var symbolKeepAspect = legendModel.get("symbolKeepAspect");
      var legendModelItemStyle = legendModel.getModel("itemStyle");
      var isSelected = legendModel.isSelected(name);
      var itemGroup = new Group();
      var textStyleModel = itemModel.getModel("textStyle");
      var itemIcon = itemModel.get("icon");
      var tooltipModel = itemModel.getModel("tooltip");
      var legendGlobalTooltipModel = tooltipModel.parentModel;
      legendSymbolType = itemIcon || legendSymbolType;
      var legendSymbol = createSymbol(legendSymbolType, 0, 0, itemWidth, itemHeight, isSelected ? color2 : inactiveColor, symbolKeepAspect == null ? true : symbolKeepAspect);
      itemGroup.add(setSymbolStyle(legendSymbol, legendSymbolType, legendModelItemStyle, borderColor, inactiveBorderColor, isSelected));
      if (!itemIcon && symbolType && (symbolType !== legendSymbolType || symbolType === "none")) {
        var size = itemHeight * 0.8;
        if (symbolType === "none") {
          symbolType = "circle";
        }
        var legendSymbolCenter = createSymbol(symbolType, (itemWidth - size) / 2, (itemHeight - size) / 2, size, size, isSelected ? color2 : inactiveColor, symbolKeepAspect == null ? true : symbolKeepAspect);
        itemGroup.add(setSymbolStyle(legendSymbolCenter, symbolType, legendModelItemStyle, borderColor, inactiveBorderColor, isSelected));
      }
      var textX = itemAlign === "left" ? itemWidth + 5 : -5;
      var textAlign = itemAlign;
      var formatter = legendModel.get("formatter");
      var content = name;
      if (typeof formatter === "string" && formatter) {
        content = formatter.replace("{name}", name != null ? name : "");
      } else if (typeof formatter === "function") {
        content = formatter(name);
      }
      itemGroup.add(new graphic.Text({
        style: graphic.setTextStyle({}, textStyleModel, {
          text: content,
          x: textX,
          y: itemHeight / 2,
          textFill: isSelected ? textStyleModel.getTextColor() : inactiveColor,
          textAlign,
          textVerticalAlign: "middle"
        })
      }));
      var hitRect = new graphic.Rect({
        shape: itemGroup.getBoundingRect(),
        invisible: true,
        tooltip: tooltipModel.get("show") ? zrUtil.extend({
          content: name,
          formatter: legendGlobalTooltipModel.get("formatter", true) || function() {
            return name;
          },
          formatterParams: {
            componentType: "legend",
            legendIndex: legendModel.componentIndex,
            name,
            $vars: ["name"]
          }
        }, tooltipModel.option) : null
      });
      itemGroup.add(hitRect);
      itemGroup.eachChild(function(child) {
        child.silent = true;
      });
      hitRect.silent = !selectMode;
      this.getContentGroup().add(itemGroup);
      graphic.setHoverStyle(itemGroup);
      itemGroup.__legendDataIndex = dataIndex;
      return itemGroup;
    },
    layoutInner: function(legendModel, itemAlign, maxSize, isFirstRender, selector, selectorPosition) {
      var contentGroup = this.getContentGroup();
      var selectorGroup = this.getSelectorGroup();
      layoutUtil.box(legendModel.get("orient"), contentGroup, legendModel.get("itemGap"), maxSize.width, maxSize.height);
      var contentRect = contentGroup.getBoundingRect();
      var contentPos = [-contentRect.x, -contentRect.y];
      if (selector) {
        layoutUtil.box("horizontal", selectorGroup, legendModel.get("selectorItemGap", true));
        var selectorRect = selectorGroup.getBoundingRect();
        var selectorPos = [-selectorRect.x, -selectorRect.y];
        var selectorButtonGap = legendModel.get("selectorButtonGap", true);
        var orientIdx = legendModel.getOrient().index;
        var wh = orientIdx === 0 ? "width" : "height";
        var hw = orientIdx === 0 ? "height" : "width";
        var yx = orientIdx === 0 ? "y" : "x";
        if (selectorPosition === "end") {
          selectorPos[orientIdx] += contentRect[wh] + selectorButtonGap;
        } else {
          contentPos[orientIdx] += selectorRect[wh] + selectorButtonGap;
        }
        selectorPos[1 - orientIdx] += contentRect[hw] / 2 - selectorRect[hw] / 2;
        selectorGroup.attr("position", selectorPos);
        contentGroup.attr("position", contentPos);
        var mainRect = {
          x: 0,
          y: 0
        };
        mainRect[wh] = contentRect[wh] + selectorButtonGap + selectorRect[wh];
        mainRect[hw] = Math.max(contentRect[hw], selectorRect[hw]);
        mainRect[yx] = Math.min(0, selectorRect[yx] + selectorPos[1 - orientIdx]);
        return mainRect;
      } else {
        contentGroup.attr("position", contentPos);
        return this.group.getBoundingRect();
      }
    },
    remove: function() {
      this.getContentGroup().removeAll();
      this._isFirstRender = true;
    }
  });
  function setSymbolStyle(symbol2, symbolType, legendModelItemStyle, borderColor, inactiveBorderColor, isSelected) {
    var itemStyle2;
    if (symbolType !== "line" && symbolType.indexOf("empty") < 0) {
      itemStyle2 = legendModelItemStyle.getItemStyle();
      symbol2.style.stroke = borderColor;
      if (!isSelected) {
        itemStyle2.stroke = inactiveBorderColor;
      }
    } else {
      itemStyle2 = legendModelItemStyle.getItemStyle(["borderWidth", "borderColor"]);
    }
    return symbol2.setStyle(itemStyle2);
  }
  function dispatchSelectAction(seriesName, dataName, api, excludeSeriesId) {
    dispatchDownplayAction(seriesName, dataName, api, excludeSeriesId);
    api.dispatchAction({
      type: "legendToggleSelect",
      name: seriesName != null ? seriesName : dataName
    });
    dispatchHighlightAction(seriesName, dataName, api, excludeSeriesId);
  }
  function dispatchHighlightAction(seriesName, dataName, api, excludeSeriesId) {
    var el = api.getZr().storage.getDisplayList()[0];
    if (!(el && el.useHoverLayer)) {
      api.dispatchAction({
        type: "highlight",
        seriesName,
        name: dataName,
        excludeSeriesId
      });
    }
  }
  function dispatchDownplayAction(seriesName, dataName, api, excludeSeriesId) {
    var el = api.getZr().storage.getDisplayList()[0];
    if (!(el && el.useHoverLayer)) {
      api.dispatchAction({
        type: "downplay",
        seriesName,
        name: dataName,
        excludeSeriesId
      });
    }
  }
  function _default(ecModel) {
    var legendModels = ecModel.findComponents({
      mainType: "legend"
    });
    if (legendModels && legendModels.length) {
      ecModel.filterSeries(function(series) {
        for (var i2 = 0; i2 < legendModels.length; i2++) {
          if (!legendModels[i2].isSelected(series.name)) {
            return false;
          }
        }
        return true;
      });
    }
  }
  var legendFilter$1 = _default;
  var echarts = echarts$d;
  var legendFilter = legendFilter$1;
  var Component = Component$2;
  echarts.registerProcessor(echarts.PRIORITY.PROCESSOR.SERIES_FILTER, legendFilter);
  Component.registerSubTypeDefaulter("legend", function() {
    return "plain";
  });
  var constants$1 = {};
  Object.defineProperty(constants$1, "__esModule", { value: true });
  var DEFAULT_THEME = {
    categoryAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    valueAxis: {
      axisLine: { show: false }
    },
    line: {
      smooth: true
    },
    grid: {
      containLabel: true,
      left: 10,
      right: 10
    }
  };
  var DEFAULT_COLORS = ["#19d4ae", "#5ab1ef", "#fa6e86", "#ffb980", "#0067a6", "#c4b4e4", "#d87a80", "#9cbbff", "#d9d0c7", "#87a997", "#d49ea2", "#5b4947", "#7ba3a8"];
  var HEAT_MAP_COLOR = ["#313695", "#4575b4", "#74add1", "#abd9e9", "#e0f3f8", "#ffffbf", "#fee090", "#fdae61", "#f46d43", "#d73027", "#a50026"];
  var HEAT_BMAP_COLOR = ["blue", "blue", "green", "yellow", "red"];
  var itemPoint = function itemPoint2(color2) {
    return ['<span style="', "background-color:" + color2 + ";", "display: inline-block;", "width: 10px;", "height: 10px;", "border-radius: 50%;", "margin-right:2px;", '"></span>'].join("");
  };
  var STATIC_PROPS = ["initOptions", "loading", "dataEmpty", "judgeWidth", "widthChangeDelay"];
  var ECHARTS_SETTINGS = ["grid", "dataZoom", "visualMap", "toolbox", "title", "legend", "xAxis", "yAxis", "radar", "tooltip", "axisPointer", "brush", "geo", "timeline", "graphic", "series", "backgroundColor", "textStyle"];
  constants$1.DEFAULT_THEME = DEFAULT_THEME;
  constants$1.DEFAULT_COLORS = DEFAULT_COLORS;
  constants$1.HEAT_MAP_COLOR = HEAT_MAP_COLOR;
  constants$1.HEAT_BMAP_COLOR = HEAT_BMAP_COLOR;
  constants$1.itemPoint = itemPoint;
  constants$1.STATIC_PROPS = STATIC_PROPS;
  constants$1.ECHARTS_SETTINGS = ECHARTS_SETTINGS;
  function _interopDefault$2(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
  }
  var utilsLite$1 = require$$1;
  var echartsLib = _interopDefault$2(echarts$d);
  var numerify = _interopDefault$2(require$$2);
  var constants = constants$1;
  var Loading = {
    render: function render() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "v-charts-component-loading" }, [_c("div", { staticClass: "loader" }, [_c("div", { staticClass: "loading-spinner" }, [_c("svg", { staticClass: "circular", attrs: { "viewBox": "25 25 50 50" } }, [_c("circle", { staticClass: "path", attrs: { "cx": "50", "cy": "50", "r": "20", "fill": "none" } })])])])]);
    },
    staticRenderFns: []
  };
  var DataEmpty = {
    render: function render() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "v-charts-data-empty" }, [_vm._v(" \u6682\u65E0\u6570\u636E ")]);
    },
    staticRenderFns: []
  };
  var _extends$1 = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function setExtend(options2, extend2) {
    Object.keys(extend2).forEach(function(attr) {
      var value = extend2[attr];
      if (~attr.indexOf(".")) {
        utilsLite$1.set(options2, attr, value);
      } else if (typeof value === "function") {
        options2[attr] = value(options2[attr]);
      } else {
        if (utilsLite$1.isArray(options2[attr]) && utilsLite$1.isObject(options2[attr][0])) {
          options2[attr].forEach(function(option, index2) {
            options2[attr][index2] = _extends$1({}, option, value);
          });
        } else if (utilsLite$1.isObject(options2[attr])) {
          options2[attr] = _extends$1({}, options2[attr], value);
        } else {
          options2[attr] = value;
        }
      }
    });
  }
  function setMark(seriesItem, marks) {
    Object.keys(marks).forEach(function(key) {
      if (marks[key])
        seriesItem[key] = marks[key];
    });
  }
  function setAnimation(options2, animation) {
    Object.keys(animation).forEach(function(key) {
      options2[key] = animation[key];
    });
  }
  var core = {
    render: function render(h) {
      return h("div", {
        class: [utilsLite$1.camelToKebab(this.$options.name || this.$options._componentTag)],
        style: this.canvasStyle
      }, [h("div", {
        style: this.canvasStyle,
        class: { "v-charts-mask-status": this.dataEmpty || this.loading },
        ref: "canvas"
      }), h(DataEmpty, {
        style: { display: this.dataEmpty ? "" : "none" }
      }), h(Loading, {
        style: { display: this.loading ? "" : "none" }
      }), this.$slots.default]);
    },
    props: {
      data: {
        type: [Object, Array],
        default: function _default2() {
          return {};
        }
      },
      settings: {
        type: Object,
        default: function _default2() {
          return {};
        }
      },
      width: { type: String, default: "auto" },
      height: { type: String, default: "400px" },
      beforeConfig: { type: Function },
      afterConfig: { type: Function },
      afterSetOption: { type: Function },
      afterSetOptionOnce: { type: Function },
      events: { type: Object },
      grid: { type: [Object, Array] },
      colors: { type: Array },
      tooltipVisible: { type: Boolean, default: true },
      legendVisible: { type: Boolean, default: true },
      legendPosition: { type: String },
      markLine: { type: Object },
      markArea: { type: Object },
      markPoint: { type: Object },
      visualMap: { type: [Object, Array] },
      dataZoom: { type: [Object, Array] },
      toolbox: { type: [Object, Array] },
      initOptions: {
        type: Object,
        default: function _default2() {
          return {};
        }
      },
      title: [Object, Array],
      legend: [Object, Array],
      xAxis: [Object, Array],
      yAxis: [Object, Array],
      radar: Object,
      tooltip: Object,
      axisPointer: [Object, Array],
      brush: [Object, Array],
      geo: [Object, Array],
      timeline: [Object, Array],
      graphic: [Object, Array],
      series: [Object, Array],
      backgroundColor: [Object, String],
      textStyle: [Object, Array],
      animation: Object,
      theme: Object,
      themeName: String,
      loading: Boolean,
      dataEmpty: Boolean,
      extend: Object,
      judgeWidth: { type: Boolean, default: false },
      widthChangeDelay: { type: Number, default: 300 },
      tooltipFormatter: { type: Function },
      resizeable: { type: Boolean, default: true },
      resizeDelay: { type: Number, default: 200 },
      changeDelay: { type: Number, default: 0 },
      setOptionOpts: { type: [Boolean, Object], default: true },
      cancelResizeCheck: Boolean,
      notSetUnchange: Array,
      log: Boolean
    },
    watch: {
      data: {
        deep: true,
        handler: function handler(v2) {
          if (v2) {
            this.changeHandler();
          }
        }
      },
      settings: {
        deep: true,
        handler: function handler(v2) {
          if (v2.type && this.chartLib)
            this.chartHandler = this.chartLib[v2.type];
          this.changeHandler();
        }
      },
      width: "nextTickResize",
      height: "nextTickResize",
      events: {
        deep: true,
        handler: "createEventProxy"
      },
      theme: {
        deep: true,
        handler: "themeChange"
      },
      themeName: "themeChange",
      resizeable: "resizeableHandler"
    },
    computed: {
      canvasStyle: function canvasStyle() {
        return {
          width: this.width,
          height: this.height,
          position: "relative"
        };
      },
      chartColor: function chartColor() {
        return this.colors || this.theme && this.theme.color || constants.DEFAULT_COLORS;
      }
    },
    methods: {
      dataHandler: function dataHandler() {
        if (!this.chartHandler)
          return;
        var data = this.data;
        var _data = data, _data$columns = _data.columns, columns = _data$columns === void 0 ? [] : _data$columns, _data$rows = _data.rows, rows = _data$rows === void 0 ? [] : _data$rows;
        var extra = {
          tooltipVisible: this.tooltipVisible,
          legendVisible: this.legendVisible,
          echarts: this.echarts,
          color: this.chartColor,
          tooltipFormatter: this.tooltipFormatter,
          _once: this._once
        };
        if (this.beforeConfig)
          data = this.beforeConfig(data);
        var options2 = this.chartHandler(columns, rows, this.settings, extra);
        if (options2) {
          if (typeof options2.then === "function") {
            options2.then(this.optionsHandler);
          } else {
            this.optionsHandler(options2);
          }
        }
      },
      nextTickResize: function nextTickResize() {
        this.$nextTick(this.resize);
      },
      resize: function resize() {
        if (!this.cancelResizeCheck) {
          if (this.$el && this.$el.clientWidth && this.$el.clientHeight) {
            this.echartsResize();
          }
        } else {
          this.echartsResize();
        }
      },
      echartsResize: function echartsResize() {
        this.echarts && this.echarts.resize();
      },
      optionsHandler: function optionsHandler(options2) {
        var _this = this;
        if (this.legendPosition && options2.legend) {
          options2.legend[this.legendPosition] = 10;
          if (~["left", "right"].indexOf(this.legendPosition)) {
            options2.legend.top = "middle";
            options2.legend.orient = "vertical";
          }
        }
        options2.color = this.chartColor;
        constants.ECHARTS_SETTINGS.forEach(function(setting) {
          if (_this[setting])
            options2[setting] = _this[setting];
        });
        if (this.animation)
          setAnimation(options2, this.animation);
        if (this.markArea || this.markLine || this.markPoint) {
          var marks = {
            markArea: this.markArea,
            markLine: this.markLine,
            markPoint: this.markPoint
          };
          var series = options2.series;
          if (utilsLite$1.isArray(series)) {
            series.forEach(function(item) {
              setMark(item, marks);
            });
          } else if (utilsLite$1.isObject(series)) {
            setMark(series, marks);
          }
        }
        if (this.extend)
          setExtend(options2, this.extend);
        if (this.afterConfig)
          options2 = this.afterConfig(options2);
        var setOptionOpts = this.setOptionOpts;
        if ((this.settings.bmap || this.settings.amap) && !utilsLite$1.isObject(setOptionOpts)) {
          setOptionOpts = false;
        }
        if (this.notSetUnchange && this.notSetUnchange.length) {
          this.notSetUnchange.forEach(function(item) {
            var value = options2[item];
            if (value) {
              if (utilsLite$1.isEqual(value, _this._store[item])) {
                options2[item] = void 0;
              } else {
                _this._store[item] = utilsLite$1.cloneDeep(value);
              }
            }
          });
          if (utilsLite$1.isObject(setOptionOpts)) {
            setOptionOpts.notMerge = false;
          } else {
            setOptionOpts = false;
          }
        }
        if (this._isDestroyed)
          return;
        if (this.log)
          formatAppLog("log", "at node_modules/v-charts/lib/core.js:309", options2);
        this.echarts.setOption(options2, setOptionOpts);
        this.$emit("ready", this.echarts, options2, echartsLib);
        if (!this._once["ready-once"]) {
          this._once["ready-once"] = true;
          this.$emit("ready-once", this.echarts, options2, echartsLib);
        }
        if (this.judgeWidth)
          this.judgeWidthHandler(options2);
        if (this.afterSetOption)
          this.afterSetOption(this.echarts, options2, echartsLib);
        if (this.afterSetOptionOnce && !this._once["afterSetOptionOnce"]) {
          this._once["afterSetOptionOnce"] = true;
          this.afterSetOptionOnce(this.echarts, options2, echartsLib);
        }
      },
      judgeWidthHandler: function judgeWidthHandler(options2) {
        var _this2 = this;
        var widthChangeDelay = this.widthChangeDelay, resize = this.resize;
        if (this.$el.clientWidth || this.$el.clientHeight) {
          resize();
        } else {
          this.$nextTick(function(_) {
            if (_this2.$el.clientWidth || _this2.$el.clientHeight) {
              resize();
            } else {
              setTimeout(function(_2) {
                resize();
                if (!_this2.$el.clientWidth || !_this2.$el.clientHeight) {
                  formatAppLog("warn", "at node_modules/v-charts/lib/core.js:339", " Can't get dom width or height ");
                }
              }, widthChangeDelay);
            }
          });
        }
      },
      resizeableHandler: function resizeableHandler(resizeable) {
        if (resizeable && !this._once.onresize)
          this.addResizeListener();
        if (!resizeable && this._once.onresize)
          this.removeResizeListener();
      },
      init: function init2() {
        if (this.echarts)
          return;
        var themeName = this.themeName || this.theme || constants.DEFAULT_THEME;
        this.echarts = echartsLib.init(this.$refs.canvas, themeName, this.initOptions);
        if (this.data)
          this.changeHandler();
        this.createEventProxy();
        if (this.resizeable)
          this.addResizeListener();
      },
      addResizeListener: function addResizeListener() {
        window.addEventListener("resize", this.resizeHandler);
        this._once.onresize = true;
      },
      removeResizeListener: function removeResizeListener() {
        window.removeEventListener("resize", this.resizeHandler);
        this._once.onresize = false;
      },
      addWatchToProps: function addWatchToProps() {
        var _this3 = this;
        var watchedVariable = this._watchers.map(function(watcher) {
          return watcher.expression;
        });
        Object.keys(this.$props).forEach(function(prop2) {
          if (!~watchedVariable.indexOf(prop2) && !~constants.STATIC_PROPS.indexOf(prop2)) {
            var opts = {};
            if (~["[object Object]", "[object Array]"].indexOf(utilsLite$1.getType(_this3.$props[prop2]))) {
              opts.deep = true;
            }
            _this3.$watch(prop2, function() {
              _this3.changeHandler();
            }, opts);
          }
        });
      },
      createEventProxy: function createEventProxy() {
        var _this4 = this;
        var self2 = this;
        var keys = Object.keys(this.events || {});
        keys.length && keys.forEach(function(ev) {
          if (_this4.registeredEvents.indexOf(ev) === -1) {
            _this4.registeredEvents.push(ev);
            _this4.echarts.on(ev, function(ev2) {
              return function() {
                if (ev2 in self2.events) {
                  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                  }
                  self2.events[ev2].apply(null, args);
                }
              };
            }(ev));
          }
        });
      },
      themeChange: function themeChange(theme2) {
        this.clean();
        this.echarts = null;
        this.init();
      },
      clean: function clean() {
        if (this.resizeable)
          this.removeResizeListener();
        this.echarts.dispose();
      }
    },
    created: function created() {
      this.echarts = null;
      this.registeredEvents = [];
      this._once = {};
      this._store = {};
      this.resizeHandler = utilsLite$1.debounce(this.resize, this.resizeDelay);
      this.changeHandler = utilsLite$1.debounce(this.dataHandler, this.changeDelay);
      this.addWatchToProps();
    },
    mounted: function mounted() {
      this.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.clean();
    },
    _numerify: numerify
  };
  var core_1 = core;
  function _interopDefault$1(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
  }
  var utils = utils$1;
  var utilsLite = require$$1;
  var Core = _interopDefault$1(core_1);
  var _extends = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function getLineXAxis(args) {
    var dimension = args.dimension, rows = args.rows, xAxisName = args.xAxisName, axisVisible = args.axisVisible, xAxisType = args.xAxisType;
    return dimension.map(function(item, index2) {
      return {
        type: xAxisType,
        nameLocation: "middle",
        nameGap: 22,
        name: xAxisName[index2] || "",
        axisTick: { show: true, lineStyle: { color: "#eee" } },
        data: rows.map(function(row) {
          return row[item];
        }),
        show: axisVisible
      };
    });
  }
  function getLineSeries(args) {
    var rows = args.rows, axisSite = args.axisSite, metrics = args.metrics, area = args.area, stack = args.stack, nullAddZero = args.nullAddZero, labelMap = args.labelMap, label = args.label, itemStyle2 = args.itemStyle, lineStyle2 = args.lineStyle, areaStyle2 = args.areaStyle, dimension = args.dimension;
    var series = [];
    var dataTemp = {};
    var stackMap = stack && utils.getStackMap(stack);
    metrics.forEach(function(item) {
      dataTemp[item] = [];
    });
    rows.forEach(function(row) {
      metrics.forEach(function(item) {
        var value = null;
        if (row[item] != null) {
          value = row[item];
        } else if (nullAddZero) {
          value = 0;
        }
        dataTemp[item].push([row[dimension[0]], value]);
      });
    });
    metrics.forEach(function(item) {
      var seriesItem = {
        name: labelMap[item] != null ? labelMap[item] : item,
        type: "line",
        data: dataTemp[item]
      };
      if (area)
        seriesItem.areaStyle = { normal: {} };
      if (axisSite.right) {
        seriesItem.yAxisIndex = ~axisSite.right.indexOf(item) ? 1 : 0;
      }
      if (stack && stackMap[item])
        seriesItem.stack = stackMap[item];
      if (label)
        seriesItem.label = label;
      if (itemStyle2)
        seriesItem.itemStyle = itemStyle2;
      if (lineStyle2)
        seriesItem.lineStyle = lineStyle2;
      if (areaStyle2)
        seriesItem.areaStyle = areaStyle2;
      series.push(seriesItem);
    });
    return series;
  }
  function getLineYAxis(args) {
    var yAxisName = args.yAxisName, yAxisType = args.yAxisType, axisVisible = args.axisVisible, scale2 = args.scale, min3 = args.min, max3 = args.max, digit = args.digit;
    var yAxisBase = {
      type: "value",
      axisTick: {
        show: false
      },
      show: axisVisible
    };
    var yAxis = [];
    var _loop = function _loop2(i3) {
      if (yAxisType[i3]) {
        yAxis[i3] = _extends({}, yAxisBase, {
          axisLabel: {
            formatter: function formatter(val) {
              return utils.getFormated(val, yAxisType[i3], digit);
            }
          }
        });
      } else {
        yAxis[i3] = _extends({}, yAxisBase);
      }
      yAxis[i3].name = yAxisName[i3] || "";
      yAxis[i3].scale = scale2[i3] || false;
      yAxis[i3].min = min3[i3] || null;
      yAxis[i3].max = max3[i3] || null;
    };
    for (var i2 = 0; i2 < 2; i2++) {
      _loop(i2);
    }
    return yAxis;
  }
  function getLineTooltip(args) {
    var axisSite = args.axisSite, yAxisType = args.yAxisType, digit = args.digit, labelMap = args.labelMap, tooltipFormatter = args.tooltipFormatter;
    var rightItems = axisSite.right || [];
    var rightList = labelMap ? rightItems.map(function(item) {
      return labelMap[item] === void 0 ? item : labelMap[item];
    }) : rightItems;
    return {
      trigger: "axis",
      formatter: function formatter(items) {
        if (tooltipFormatter) {
          return tooltipFormatter.apply(null, arguments);
        }
        var tpl = [];
        var _items$ = items[0], name = _items$.name, axisValueLabel = _items$.axisValueLabel;
        var title = name || axisValueLabel;
        tpl.push(title + "<br>");
        items.forEach(function(_ref) {
          var seriesName = _ref.seriesName, data = _ref.data, marker = _ref.marker;
          var showData = null;
          var type = ~rightList.indexOf(seriesName) ? yAxisType[1] : yAxisType[0];
          var itemData = utilsLite.isArray(data) ? data[1] : data;
          showData = utils.getFormated(itemData, type, digit);
          tpl.push(marker);
          tpl.push(seriesName + ": " + showData);
          tpl.push("<br>");
        });
        return tpl.join("");
      }
    };
  }
  function getLegend(args) {
    var metrics = args.metrics, legendName = args.legendName, labelMap = args.labelMap;
    if (!legendName && !labelMap)
      return { data: metrics };
    var data = labelMap ? metrics.map(function(item) {
      return labelMap[item] == null ? item : labelMap[item];
    }) : metrics;
    return {
      data,
      formatter: function formatter(name) {
        return legendName[name] != null ? legendName[name] : name;
      }
    };
  }
  var line$1 = function line$$1(columns, rows, settings, extra) {
    rows = utilsLite.isArray(rows) ? rows : [];
    columns = utilsLite.isArray(columns) ? columns : [];
    var _settings$axisSite = settings.axisSite, axisSite = _settings$axisSite === void 0 ? {} : _settings$axisSite, _settings$yAxisType = settings.yAxisType, yAxisType = _settings$yAxisType === void 0 ? ["normal", "normal"] : _settings$yAxisType, _settings$xAxisType = settings.xAxisType, xAxisType = _settings$xAxisType === void 0 ? "category" : _settings$xAxisType, _settings$yAxisName = settings.yAxisName, yAxisName = _settings$yAxisName === void 0 ? [] : _settings$yAxisName, _settings$dimension = settings.dimension, dimension = _settings$dimension === void 0 ? [columns[0]] : _settings$dimension, _settings$xAxisName = settings.xAxisName, xAxisName = _settings$xAxisName === void 0 ? [] : _settings$xAxisName, _settings$axisVisible = settings.axisVisible, axisVisible = _settings$axisVisible === void 0 ? true : _settings$axisVisible, area = settings.area, stack = settings.stack, _settings$scale = settings.scale, scale2 = _settings$scale === void 0 ? [false, false] : _settings$scale, _settings$min = settings.min, min3 = _settings$min === void 0 ? [null, null] : _settings$min, _settings$max = settings.max, max3 = _settings$max === void 0 ? [null, null] : _settings$max, _settings$nullAddZero = settings.nullAddZero, nullAddZero = _settings$nullAddZero === void 0 ? false : _settings$nullAddZero, _settings$digit = settings.digit, digit = _settings$digit === void 0 ? 2 : _settings$digit, _settings$legendName = settings.legendName, legendName = _settings$legendName === void 0 ? {} : _settings$legendName, _settings$labelMap = settings.labelMap, labelMap = _settings$labelMap === void 0 ? {} : _settings$labelMap, label = settings.label, itemStyle2 = settings.itemStyle, lineStyle2 = settings.lineStyle, areaStyle2 = settings.areaStyle;
    var tooltipVisible = extra.tooltipVisible, legendVisible = extra.legendVisible, tooltipFormatter = extra.tooltipFormatter;
    var metrics = columns.slice();
    if (axisSite.left && axisSite.right) {
      metrics = axisSite.left.concat(axisSite.right);
    } else if (axisSite.left && !axisSite.right) {
      metrics = axisSite.left;
    } else if (settings.metrics) {
      metrics = settings.metrics;
    } else {
      metrics.splice(columns.indexOf(dimension[0]), 1);
    }
    var legend = legendVisible && getLegend({ metrics, legendName, labelMap });
    var tooltip = tooltipVisible && getLineTooltip({
      axisSite,
      yAxisType,
      digit,
      labelMap,
      xAxisType,
      tooltipFormatter
    });
    var xAxis = getLineXAxis({
      dimension,
      rows,
      xAxisName,
      axisVisible,
      xAxisType
    });
    var yAxis = getLineYAxis({
      yAxisName,
      yAxisType,
      axisVisible,
      scale: scale2,
      min: min3,
      max: max3,
      digit
    });
    var series = getLineSeries({
      rows,
      axisSite,
      metrics,
      area,
      stack,
      nullAddZero,
      labelMap,
      label,
      itemStyle: itemStyle2,
      lineStyle: lineStyle2,
      areaStyle: areaStyle2,
      xAxisType,
      dimension
    });
    var options2 = { legend, xAxis, series, yAxis, tooltip };
    return options2;
  };
  var index = _extends({}, Core, {
    name: "VeLine",
    data: function data() {
      this.chartHandler = line$1;
      return {};
    }
  });
  var line_common = index;
  function createApp() {
    const app = vue.createVueApp(App);
    app.component(line_common.name, line_common);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
