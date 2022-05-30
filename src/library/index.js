var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value);
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? (val) => !!map[val.toLowerCase()]
    : (val) => !!map[val];
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$1(item)
        ? parseStringStyle(item)
        : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$1(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$1(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString$1(val)
    ? val
    : val == null
    ? ""
    : isArray$1(val) ||
      (isObject(val) &&
        (val.toString === objectToString || !isFunction$1(val.toString)))
    ? JSON.stringify(val, replacer, 2)
    : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2]) => {
          entries[`${key} =>`] = val2;
          return entries;
        },
        {}
      ),
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()],
    };
  } else if (isObject(val) && !isArray$1(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction$1 = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction$1(val.then) && isFunction$1(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) =>
  isString$1(key) &&
  key !== "NaN" &&
  key[0] !== "-" &&
  "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) =>
  str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction(
  (str) => str.charAt(0).toUpperCase() + str.slice(1)
);
const toHandlerKey = cacheStringFunction((str) =>
  str ? `on${capitalize(str)}` : ``
);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value,
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return (
    _globalThis ||
    (_globalThis =
      typeof globalThis !== "undefined"
        ? globalThis
        : typeof self !== "undefined"
        ? self
        : typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
        ? global
        : {})
  );
};
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index =
        (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
          this
        ) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = this.parent;
      }
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this.active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
    }
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = /* @__PURE__ */ new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = createDep()));
    }
    trackEffects(dep);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger$1(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  for (const effect of isArray$1(dep) ? dep : [...dep]) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(
  `__proto__,__v_isRef,__isVue`
);
const builtInSymbols = new Set(
  Object.getOwnPropertyNames(Symbol)
    .map((key) => Symbol[key])
    .filter(isSymbol)
);
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function (...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function (...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (
      key === "__v_raw" &&
      receiver ===
        (isReadonly2
          ? shallow
            ? shallowReadonlyMap
            : readonlyMap
          : shallow
          ? shallowReactiveMap
          : reactiveMap
        ).get(target)
    ) {
      return target;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow && !isReadonly(value)) {
      if (!isShallow(value)) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey =
      isArray$1(target) && isIntegerKey(key)
        ? Number(key) < target.length
        : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger$1(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger$1(target, "set", key, value);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger$1(target, "delete", key, void 0);
  }
  return result;
}
function has$1(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has: has$1,
  ownKeys,
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  },
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet,
});
const toShallow = (value) => value;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "get", key);
  }
  !isReadonly2 && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "has", key);
  }
  !isReadonly2 && track(rawTarget, "has", rawKey);
  return key === rawKey
    ? target.has(key)
    : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger$1(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger$1(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger$1(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger$1(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger$1(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function (...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair =
      method === "entries" || (method === Symbol.iterator && targetIsMap);
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 &&
      track(
        rawTarget,
        "iterate",
        isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
      );
    return {
      next() {
        const { value, done: done2 } = innerIterator.next();
        return done2
          ? { value, done: done2 }
          : {
              value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
              done: done2,
            };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  };
}
function createReadonlyMethod(type) {
  return function (...args) {
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false),
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true),
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false),
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true),
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(
      method,
      false,
      false
    );
    readonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      false
    );
    shallowInstrumentations2[method] = createIterableMethod(
      method,
      false,
      true
    );
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2,
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations,
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow
    ? isReadonly2
      ? shallowReadonlyInstrumentations
      : shallowInstrumentations
    : isReadonly2
    ? readonlyInstrumentations
    : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target
        ? instrumentations
        : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false),
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true),
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false),
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value)
    ? 0
    : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function createReactiveObject(
  target,
  isReadonly2,
  baseHandlers,
  collectionHandlers,
  proxyMap
) {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => (isObject(value) ? reactive(value) : value);
const toReadonly = (value) => (isObject(value) ? readonly(value) : value);
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()));
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep);
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    newVal = this.__v_isShallow ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this.__v_isShallow ? newVal : toReactive(newVal);
      triggerRefValue(this);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  },
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs)
    ? objectWithRefs
    : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction$1(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(
    getter,
    setter,
    onlyGetter || !setter,
    isSSR
  );
  return cRef;
}
Promise.resolve();
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction$1(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (
            errorCapturedHooks[i](err, exposedInstance, errorInfo) === false
          ) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo,
      ]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start2 = flushIndex + 1;
  let end = queue.length;
  while (start2 < end) {
    const middle = (start2 + end) >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? (start2 = middle + 1) : (end = middle);
  }
  return start2;
}
function queueJob(job) {
  if (
    (!queue.length ||
      !queue.includes(
        job,
        isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
      )) &&
    job !== currentPreFlushParentJob
  ) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queueCb(cb, activeQueue, pendingQueue, index) {
  if (!isArray$1(cb)) {
    if (
      !activeQueue ||
      !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)
    ) {
      pendingQueue.push(cb);
    }
  } else {
    pendingQueue.push(...cb);
  }
  queueFlush();
}
function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    for (
      preFlushIndex = 0;
      preFlushIndex < activePreFlushCbs.length;
      preFlushIndex++
    ) {
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen, parentJob);
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (
      postFlushIndex = 0;
      postFlushIndex < activePostFlushCbs.length;
      postFlushIndex++
    ) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => (job.id == null ? Infinity : job.id);
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  flushPreFlushCbs(seen);
  queue.sort((a, b) => getId(a) - getId(b));
  const check = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false);
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (
      queue.length ||
      pendingPreFlushCbs.length ||
      pendingPostFlushCbs.length
    ) {
      flushJobs(seen);
    }
  }
}
function emit$1(instance, event, ...rawArgs) {
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${
      modelArg === "modelValue" ? "model" : modelArg
    }Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => a.trim());
    } else if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  let handlerName;
  let handler =
    props[(handlerName = toHandlerKey(event))] ||
    props[(handlerName = toHandlerKey(camelize(event)))];
  if (!handler && isModelListener2) {
    handler = props[(handlerName = toHandlerKey(hyphenate(event)))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(
        raw2,
        appContext,
        true
      );
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, null);
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => (normalized[key] = null));
  } else {
    extend(normalized, raw);
  }
  cache.set(comp, normalized);
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return (
    hasOwn(options, key[0].toLowerCase() + key.slice(1)) ||
    hasOwn(options, hyphenate(key)) ||
    hasOwn(options, key)
  );
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = (instance && instance.type.__scopeId) || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    const res = fn(...args);
    setCurrentRenderingInstance(prevInstance);
    if (renderFnWithContext._d) {
      setBlockTracking(1);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function markAttrsAccessed() {}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit,
    render: render2,
    renderCache,
    data,
    setupState,
    ctx,
    inheritAttrs,
  } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(
        render2.call(
          proxyToUse,
          proxyToUse,
          renderCache,
          props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render3 = Component;
      if (false);
      result = normalizeVNode(
        render3.length > 1
          ? render3(
              props,
              false
                ? {
                    get attrs() {
                      markAttrsAccessed();
                      return attrs;
                    },
                    slots,
                    emit,
                  }
                : { attrs, slots, emit }
            )
          : render3(props, null)
      );
      fallthroughAttrs = Component.props
        ? attrs
        : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment$1);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs);
      }
    }
  }
  if (vnode.dirs) {
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (
      nextProps[key] !== prevProps[key] &&
      !isEmitListener(emitsOptions, key)
    ) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function provide$1(key, value) {
  if (!currentInstance);
  else {
    let provides = currentInstance.provides;
    const parentProvides =
      currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides =
      instance.parent == null
        ? instance.vnode.appContext && instance.vnode.appContext.provides
        : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$1(defaultValue)
        ? defaultValue.call(instance.proxy)
        : defaultValue;
    } else;
  }
}
function watchEffect(effect, options) {
  return doWatch(effect, null, options);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(
  source,
  cb,
  { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ
) {
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some(isReactive);
    getter = () =>
      source.map((s) => {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return traverse(s);
        } else if (isFunction$1(s)) {
          return callWithErrorHandling(s, instance, 2);
        } else;
      });
  } else if (isFunction$1(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup,
      ]);
    }
    return NOOP;
  }
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (
        deep ||
        forceTrigger ||
        (isMultiSource
          ? newValue.some((v2, i) => hasChanged(v2, oldValue[i]))
          : hasChanged(newValue, oldValue)) ||
        false
      ) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onCleanup,
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        job();
      }
    };
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(
      effect.run.bind(effect),
      instance && instance.suspense
    );
  } else {
    effect.run();
  }
  return () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$1(source)
    ? source.includes(".")
      ? createPathGetter(publicThis, source)
      : () => publicThis[source]
    : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$1(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path2) {
  const segments = path2.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v2) => {
      traverse(v2, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map(),
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator,
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children2 =
        slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children2 || !children2.length) {
        return;
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      const child = children2[0];
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(
        innerChild,
        rawProps,
        state,
        instance
      );
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (
        oldInnerChild &&
        oldInnerChild.type !== Comment$1 &&
        (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)
      ) {
        const leavingHooks = resolveTransitionHooks(
          oldInnerChild,
          rawProps,
          state,
          instance
        );
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            instance.update();
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment$1) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(
              state,
              oldInnerChild
            );
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  },
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled,
  } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(true);
      }
      const leavingVNode = leavingVNodesCache[key];
      if (
        leavingVNode &&
        isSameVNodeType(vnode, leavingVNode) &&
        leavingVNode.el._leaveCb
      ) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done2 = (el._enterCb = (cancelled) => {
        if (called) return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      });
      if (hook) {
        hook(el, done2);
        if (hook.length <= 1) {
          done2();
        }
      } else {
        done2();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(true);
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done2 = (el._leaveCb = (cancelled) => {
        if (called) return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      });
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        onLeave(el, done2);
        if (onLeave.length <= 1) {
          done2();
        }
      } else {
        done2();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    },
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode)
    ? vnode.children
      ? vnode.children[0]
      : void 0
    : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children2, keepComment = false) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children2.length; i++) {
    const child = children2[i];
    if (child.type === Fragment) {
      if (child.patchFlag & 128) keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment));
    } else if (keepComment || child.type !== Comment$1) {
      ret.push(child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options) {
  return isFunction$1(options)
    ? { setup: options, name: options.name }
    : options;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook =
    hook.__wdc ||
    (hook.__wdc = () => {
      let current = target;
      while (current) {
        if (current.isDeactivated) {
          return;
        }
        current = current.parent;
      }
      return hook();
    });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook =
      hook.__weh ||
      (hook.__weh = (...args) => {
        if (target.isUnmounted) {
          return;
        }
        pauseTracking();
        setCurrentInstance(target);
        const res = callWithAsyncErrorHandling(hook, target, type, args);
        unsetCurrentInstance();
        resetTracking();
        return res;
      });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook =
  (lifecycle) =>
  (hook, target = currentInstance) =>
    (!isInSSRComponentSetup || lifecycle === "sp") &&
    injectHook(lifecycle, hook, target);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render: render2,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters,
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(
      injectOptions,
      ctx,
      checkDuplicateProperties,
      instance.appContext.config.unwrapInjectedRef
    );
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$1(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject(data));
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction$1(opt)
        ? opt.bind(publicThis, publicThis)
        : isFunction$1(opt.get)
        ? opt.get.bind(publicThis, publicThis)
        : NOOP;
      const set2 =
        !isFunction$1(opt) && isFunction$1(opt.set)
          ? opt.set.bind(publicThis)
          : NOOP;
      const c = computed({
        get: get2,
        set: set2,
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v2) => (c.value = v2),
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction$1(provideOptions)
      ? provideOptions.call(publicThis)
      : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide$1(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => (publicThis[key] = val),
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render2 && instance.render === NOOP) {
    instance.render = render2;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
}
function resolveInjections(
  injectOptions,
  ctx,
  checkDuplicateProperties = NOOP,
  unwrapRef = false
) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v2) => (injected.value = v2),
        });
      } else {
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray$1(hook)
      ? hook.map((h2) => h2.bind(instance.proxy))
      : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".")
    ? createPathGetter(publicThis, key)
    : () => publicThis[key];
  if (isString$1(raw)) {
    const handler = ctx[raw];
    if (isFunction$1(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction$1(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction$1(raw.handler)
        ? raw.handler.bind(publicThis)
        : ctx[raw.handler];
      if (isFunction$1(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies },
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) =>
        mergeOptions(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  cache.set(base, resolved);
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose");
    else {
      const strat = internalOptionMergeStrats[key] || (strats && strats[key]);
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject,
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction$1(to) ? to.call(this, this) : to,
      isFunction$1(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to
    ? extend(extend(/* @__PURE__ */ Object.create(null), to), from)
    : from;
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag },
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (
        !rawProps ||
        (!hasOwn(rawProps, key) &&
          ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey)))
      ) {
        if (options) {
          if (
            rawPrevProps &&
            (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)
          ) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || (!hasOwn(rawProps, key) && true)) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger$1(instance, "set", "$attrs");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, (camelKey = camelize(key)))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction$1(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys) needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = (normalized[normalizedKey] =
          isArray$1(opt) || isFunction$1(opt) ? { type: opt } : opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  cache.set(comp, res);
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction$1(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) =>
  isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  const normalized = withCtx((...args) => {
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];
    if (isFunction$1(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children2) => {
  const normalized = normalizeSlotValue(children2);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children2) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children2._;
    if (type) {
      instance.slots = toRaw(children2);
      def(children2, "_", type);
    } else {
      normalizeObjectSlots(children2, (instance.slots = {}));
    }
  } else {
    instance.slots = {};
    if (children2) {
      normalizeVNodeSlots(instance, children2);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children2, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children2._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children2);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children2.$stable;
      normalizeObjectSlots(children2, slots);
    }
    deletionComparisonTarget = children2;
  } else if (children2) {
    normalizeVNodeSlots(instance, children2);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    return vnode;
  }
  const instance = internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (isFunction$1(dir)) {
      dir = {
        mounted: dir,
        updated: dir,
      };
    }
    if (dir.deep) {
      traverse(value);
    }
    bindings.push({
      dir,
      instance,
      value,
      oldValue: void 0,
      arg,
      modifiers,
    });
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode,
      ]);
      resetTracking();
    }
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap(),
  };
}
let uid = 0;
function createAppAPI(render2, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (rootProps != null && !isObject(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app2 = (context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v2) {},
      use(plugin, ...options) {
        if (installedPlugins.has(plugin));
        else if (plugin && isFunction$1(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app2, ...options);
        } else if (isFunction$1(plugin)) {
          installedPlugins.add(plugin);
          plugin(app2, ...options);
        } else;
        return app2;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app2;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app2;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app2;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render2(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app2._container = rootContainer;
          rootContainer.__vue_app__ = app2;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render2(null, app2._container);
          delete app2._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app2;
      },
    });
    return app2;
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach((r, i) =>
      setRef(
        r,
        oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue =
    vnode.shapeFlag & 4
      ? getExposeProxy(vnode.component) || vnode.component.proxy
      : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? (owner.refs = {}) : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString$1(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction$1(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString$1(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray$1(existing) && remove(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
              } else {
                ref2.value = [refValue];
                if (rawRef.k) refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (isRef(ref2)) {
          ref2.value = value;
          if (rawRef.k) refs[rawRef.k] = value;
        } else;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    cloneNode: hostCloneNode,
    insertStaticContent: hostInsertStaticContent,
  } = options;
  const patch = (
    n1,
    n2,
    container2,
    anchor = null,
    parentComponent = null,
    parentSuspense = null,
    isSVG = false,
    slotScopeIds = null,
    optimized = !!n2.dynamicChildren
  ) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container2, anchor);
        break;
      case Comment$1:
        processCommentNode(n1, n2, container2, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container2, anchor, isSVG);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container2,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container2,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container2,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container2,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container2,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else;
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container2, anchor) => {
    if (n1 == null) {
      hostInsert((n2.el = hostCreateText(n2.children)), container2, anchor);
    } else {
      const el = (n2.el = n1.el);
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container2, anchor) => {
    if (n1 == null) {
      hostInsert(
        (n2.el = hostCreateComment(n2.children || "")),
        container2,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container2, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container2,
      anchor,
      isSVG,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el, anchor }, container2, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container2, nextSibling);
      el = next;
    }
    hostInsert(anchor, container2, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (
    n1,
    n2,
    container2,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds,
    optimized
  ) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(
        n2,
        container2,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (
    vnode,
    container2,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds,
    optimized
  ) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode;
    if (vnode.el && hostCloneNode !== void 0 && patchFlag === -1) {
      el = vnode.el = hostCloneNode(vnode.el);
    } else {
      el = vnode.el = hostCreateElement(
        vnode.type,
        isSVG,
        props && props.is,
        props
      );
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(
          vnode.children,
          el,
          null,
          parentComponent,
          parentSuspense,
          isSVG && type !== "foreignObject",
          slotScopeIds,
          optimized
        );
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(
              el,
              key,
              null,
              props[key],
              isSVG,
              vnode.children,
              parentComponent,
              parentSuspense,
              unmountChildren
            );
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value);
        }
        if ((vnodeHook = props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks =
      (!parentSuspense || (parentSuspense && !parentSuspense.pendingBranch)) &&
      transition &&
      !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container2, anchor);
    if (
      (vnodeHook = props && props.onVnodeMounted) ||
      needCallTransitionHooks ||
      dirs
    ) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (
    children2,
    container2,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds,
    optimized,
    start2 = 0
  ) => {
    for (let i = start2; i < children2.length; i++) {
      const child = (children2[i] = optimized
        ? cloneIfMounted(children2[i])
        : normalizeVNode(children2[i]));
      patch(
        null,
        child,
        container2,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (
    n1,
    n2,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds,
    optimized
  ) => {
    const el = (n2.el = n1.el);
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if ((vnodeHook = newProps.onVnodeBeforeUpdate)) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(
          el,
          n2,
          oldProps,
          newProps,
          parentComponent,
          parentSuspense,
          isSVG
        );
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(
                el,
                key,
                prev,
                next,
                isSVG,
                n1.children,
                parentComponent,
                parentSuspense,
                unmountChildren
              );
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(
        el,
        n2,
        oldProps,
        newProps,
        parentComponent,
        parentSuspense,
        isSVG
      );
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (
    oldChildren,
    newChildren,
    fallbackContainer,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds
  ) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container2 =
        oldVNode.el &&
        (oldVNode.type === Fragment ||
          !isSameVNodeType(oldVNode, newVNode) ||
          oldVNode.shapeFlag & (6 | 64))
          ? hostParentNode(oldVNode.el)
          : fallbackContainer;
      patch(
        oldVNode,
        newVNode,
        container2,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (
    el,
    vnode,
    oldProps,
    newProps,
    parentComponent,
    parentSuspense,
    isSVG
  ) => {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        if (isReservedProp(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(
            el,
            key,
            prev,
            next,
            isSVG,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              isSVG,
              vnode.children,
              parentComponent,
              parentSuspense,
              unmountChildren
            );
          }
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (
    n1,
    n2,
    container2,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds,
    optimized
  ) => {
    const fragmentStartAnchor = (n2.el = n1 ? n1.el : hostCreateText(""));
    const fragmentEndAnchor = (n2.anchor = n1 ? n1.anchor : hostCreateText(""));
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds
        ? slotScopeIds.concat(fragmentSlotScopeIds)
        : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container2, anchor);
      hostInsert(fragmentEndAnchor, container2, anchor);
      mountChildren(
        n2.children,
        container2,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      if (
        patchFlag > 0 &&
        patchFlag & 64 &&
        dynamicChildren &&
        n1.dynamicChildren
      ) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container2,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds
        );
        if (
          n2.key != null ||
          (parentComponent && n2 === parentComponent.subTree)
        ) {
          traverseStaticChildren(n1, n2, true);
        }
      } else {
        patchChildren(
          n1,
          n2,
          container2,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (
    n1,
    n2,
    container2,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds,
    optimized
  ) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container2, anchor, isSVG, optimized);
      } else {
        mountComponent(
          n2,
          container2,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (
    initialVNode,
    container2,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    optimized
  ) => {
    const instance = (initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    ));
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = (instance.subTree = createVNode(Comment$1));
        processCommentNode(null, placeholder, container2, anchor);
      }
      return;
    }
    setupRenderEffect(
      instance,
      initialVNode,
      container2,
      anchor,
      parentSuspense,
      isSVG,
      optimized
    );
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = (n2.component = n1.component);
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.component = n1.component;
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (
    instance,
    initialVNode,
    container2,
    anchor,
    parentSuspense,
    isSVG,
    optimized
  ) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (
          !isAsyncWrapperVNode &&
          (vnodeHook = props && props.onVnodeBeforeMount)
        ) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type
              .__asyncLoader()
              .then(() => !instance.isUnmounted && hydrateSubTree());
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = (instance.subTree = renderComponentRoot(instance));
          patch(
            null,
            subTree,
            container2,
            anchor,
            instance,
            parentSuspense,
            isSVG
          );
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (
          !isAsyncWrapperVNode &&
          (vnodeHook = props && props.onVnodeMounted)
        ) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container2 = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if ((vnodeHook = next.props && next.props.onVnodeBeforeUpdate)) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          hostParentNode(prevTree.el),
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if ((vnodeHook = next.props && next.props.onVnodeUpdated)) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
      }
    };
    const effect = (instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(instance.update),
      instance.scope
    ));
    const update2 = (instance.update = effect.run.bind(effect));
    update2.id = instance.uid;
    toggleRecurse(instance, true);
    update2();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(void 0, instance.update);
    resetTracking();
  };
  const patchChildren = (
    n1,
    n2,
    container2,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds,
    optimized = false
  ) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container2,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container2,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container2, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container2,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container2, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container2,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (
    c1,
    c2,
    container2,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds,
    optimized
  ) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = (c2[i] = optimized
        ? cloneIfMounted(c2[i])
        : normalizeVNode(c2[i]));
      patch(
        c1[i],
        nextChild,
        container2,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container2,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (
    c1,
    c2,
    container2,
    parentAnchor,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds,
    optimized
  ) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = (c2[i] = optimized
        ? cloneIfMounted(c2[i])
        : normalizeVNode(c2[i]));
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container2,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = (c2[e2] = optimized
        ? cloneIfMounted(c2[e2])
        : normalizeVNode(c2[e2]));
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container2,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            (c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i])),
            container2,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = (c2[i] = optimized
          ? cloneIfMounted(c2[i])
          : normalizeVNode(c2[i]));
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (
              newIndexToOldIndexMap[j - s2] === 0 &&
              isSameVNodeType(prevChild, c2[j])
            ) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container2,
            null,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved
        ? getSequence(newIndexToOldIndexMap)
        : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container2,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container2, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container2, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children: children2, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container2, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container2, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container2, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container2, anchor);
      for (let i = 0; i < children2.length; i++) {
        move(children2[i], container2, anchor, moveType);
      }
      hostInsert(vnode.anchor, container2, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container2, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container2, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container2, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container2, anchor);
    }
  };
  const unmount = (
    vnode,
    parentComponent,
    parentSuspense,
    doRemove = false,
    optimized = false
  ) => {
    const {
      type,
      props,
      ref: ref2,
      children: children2,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs,
    } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (
      shouldInvokeVnodeHook &&
      (vnodeHook = props && props.onVnodeBeforeUnmount)
    ) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          optimized,
          internals,
          doRemove
        );
      } else if (
        dynamicChildren &&
        (type !== Fragment || (patchFlag > 0 && patchFlag & 64))
      ) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (
        (type === Fragment && patchFlag & (128 | 256)) ||
        (!optimized && shapeFlag & 16)
      ) {
        unmountChildren(children2, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (
      (shouldInvokeVnodeHook &&
        (vnodeHook = props && props.onVnodeUnmounted)) ||
      shouldInvokeDirs
    ) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs &&
          invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      removeFragment(el, anchor);
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update: update2, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update2) {
      update2.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (
      parentSuspense &&
      parentSuspense.pendingBranch &&
      !parentSuspense.isUnmounted &&
      instance.asyncDep &&
      !instance.asyncResolved &&
      instance.suspenseId === parentSuspense.pendingId
    ) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (
    children2,
    parentComponent,
    parentSuspense,
    doRemove = false,
    optimized = false,
    start2 = 0
  ) => {
    for (let i = start2; i < children2.length; i++) {
      unmount(
        children2[i],
        parentComponent,
        parentSuspense,
        doRemove,
        optimized
      );
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render2 = (vnode, container2, isSVG) => {
    if (vnode == null) {
      if (container2._vnode) {
        unmount(container2._vnode, null, null, true);
      }
    } else {
      patch(
        container2._vnode || null,
        vnode,
        container2,
        null,
        null,
        null,
        isSVG
      );
    }
    flushPostFlushCbs();
    container2._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options,
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render: render2,
    hydrate,
    createApp: createAppAPI(render2, hydrate),
  };
}
function toggleRecurse({ effect, update: update2 }, allowed) {
  effect.allowRecurse = update2.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow) traverseStaticChildren(c1, c2);
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v2, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v2 = result.length - 1;
      while (u < v2) {
        c = (u + v2) >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v2 = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v2 = result[u - 1];
  while (u-- > 0) {
    result[u] = v2;
    v2 = p2[v2];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props) =>
  props && (props.disabled || props.disabled === "");
const isTargetSVG = (target) =>
  typeof SVGElement !== "undefined" && target instanceof SVGElement;
const resolveTarget = (props, select) => {
  const targetSelector = props && props.to;
  if (isString$1(targetSelector)) {
    if (!select) {
      return null;
    } else {
      const target = select(targetSelector);
      return target;
    }
  } else {
    return targetSelector;
  }
};
const TeleportImpl = {
  __isTeleport: true,
  process(
    n1,
    n2,
    container2,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds,
    optimized,
    internals
  ) {
    const {
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      o: { insert, querySelector, createText, createComment },
    } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { shapeFlag, children: children2, dynamicChildren } = n2;
    if (n1 == null) {
      const placeholder = (n2.el = createText(""));
      const mainAnchor = (n2.anchor = createText(""));
      insert(placeholder, container2, anchor);
      insert(mainAnchor, container2, anchor);
      const target = (n2.target = resolveTarget(n2.props, querySelector));
      const targetAnchor = (n2.targetAnchor = createText(""));
      if (target) {
        insert(targetAnchor, target);
        isSVG = isSVG || isTargetSVG(target);
      }
      const mount = (container3, anchor2) => {
        if (shapeFlag & 16) {
          mountChildren(
            children2,
            container3,
            anchor2,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        }
      };
      if (disabled) {
        mount(container2, mainAnchor);
      } else if (target) {
        mount(target, targetAnchor);
      }
    } else {
      n2.el = n1.el;
      const mainAnchor = (n2.anchor = n1.anchor);
      const target = (n2.target = n1.target);
      const targetAnchor = (n2.targetAnchor = n1.targetAnchor);
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container2 : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      isSVG = isSVG || isTargetSVG(target);
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          currentContainer,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds
        );
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          currentContainer,
          currentAnchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          false
        );
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(n2, container2, mainAnchor, internals, 1);
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = (n2.target = resolveTarget(
            n2.props,
            querySelector
          ));
          if (nextTarget) {
            moveTeleport(n2, nextTarget, null, internals, 0);
          }
        } else if (wasDisabled) {
          moveTeleport(n2, target, targetAnchor, internals, 1);
        }
      }
    }
  },
  remove(
    vnode,
    parentComponent,
    parentSuspense,
    optimized,
    { um: unmount, o: { remove: hostRemove } },
    doRemove
  ) {
    const {
      shapeFlag,
      children: children2,
      anchor,
      targetAnchor,
      target,
      props,
    } = vnode;
    if (target) {
      hostRemove(targetAnchor);
    }
    if (doRemove || !isTeleportDisabled(props)) {
      hostRemove(anchor);
      if (shapeFlag & 16) {
        for (let i = 0; i < children2.length; i++) {
          const child = children2[i];
          unmount(
            child,
            parentComponent,
            parentSuspense,
            true,
            !!child.dynamicChildren
          );
        }
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport,
};
function moveTeleport(
  vnode,
  container2,
  parentAnchor,
  { o: { insert }, m: move },
  moveType = 2
) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container2, parentAnchor);
  }
  const { el, anchor, shapeFlag, children: children2, props } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container2, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled(props)) {
    if (shapeFlag & 16) {
      for (let i = 0; i < children2.length; i++) {
        move(children2[i], container2, parentAnchor, 2);
      }
    }
  }
  if (isReorder) {
    insert(anchor, container2, parentAnchor);
  }
}
function hydrateTeleport(
  node,
  vnode,
  parentComponent,
  parentSuspense,
  slotScopeIds,
  optimized,
  { o: { nextSibling, parentNode, querySelector } },
  hydrateChildren
) {
  const target = (vnode.target = resolveTarget(vnode.props, querySelector));
  if (target) {
    const targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (isTeleportDisabled(vnode.props)) {
        vnode.anchor = hydrateChildren(
          nextSibling(node),
          vnode,
          parentNode(node),
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
        vnode.targetAnchor = targetNode;
      } else {
        vnode.anchor = nextSibling(node);
        vnode.targetAnchor = hydrateChildren(
          targetNode,
          vnode,
          target,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      }
      target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
    }
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol();
function resolveDynamicComponent(component) {
  if (isString$1(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveAsset(
  type,
  name,
  warnMissing = true,
  maybeSelfReference = false
) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(Component);
      if (
        selfName &&
        (selfName === name ||
          selfName === camelize(name) ||
          selfName === capitalize(camelize(name)))
      ) {
        return Component;
      }
    }
    const res =
      resolve(instance[type] || Component[type], name) ||
      resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry2, name) {
  return (
    registry2 &&
    (registry2[name] ||
      registry2[camelize(name)] ||
      registry2[capitalize(camelize(name))])
  );
}
const Fragment = Symbol(void 0);
const Text = Symbol(void 0);
const Comment$1 = Symbol(void 0);
const Static = Symbol(void 0);
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push((currentBlock = disableTracking ? null : []));
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren =
    isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(
  type,
  props,
  children2,
  patchFlag,
  dynamicProps,
  shapeFlag
) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children2,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props, children2, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(type, props, children2, patchFlag, dynamicProps, true)
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => (key != null ? key : null);
const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
  return ref2 != null
    ? isString$1(ref2) || isRef(ref2) || isFunction$1(ref2)
      ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for }
      : ref2
    : null;
};
function createBaseVNode(
  type,
  props = null,
  children2 = null,
  patchFlag = 0,
  dynamicProps = null,
  shapeFlag = type === Fragment ? 0 : 1,
  isBlockNode = false,
  needFullChildrenNormalization = false
) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children: children2,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children2);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children2) {
    vnode.shapeFlag |= isString$1(children2) ? 8 : 16;
  }
  if (
    isBlockTreeEnabled > 0 &&
    !isBlockNode &&
    currentBlock &&
    (vnode.patchFlag > 0 || shapeFlag & 6) &&
    vnode.patchFlag !== 32
  ) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(
  type,
  props = null,
  children2 = null,
  patchFlag = 0,
  dynamicProps = null,
  isBlockNode = false
) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment$1;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(type, props, true);
    if (children2) {
      normalizeChildren(cloned, children2);
    }
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString$1(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray$1(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString$1(type)
    ? 1
    : isSuspense(type)
    ? 128
    : isTeleport(type)
    ? 64
    : isObject(type)
    ? 4
    : isFunction$1(type)
    ? 2
    : 0;
  return createBaseVNode(
    type,
    props,
    children2,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props) return null;
  return isProxy(props) || InternalObjectKey in props
    ? extend({}, props)
    : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children: children2 } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref:
      extraProps && extraProps.ref
        ? mergeRef && ref2
          ? isArray$1(ref2)
            ? ref2.concat(normalizeRef(extraProps))
            : [ref2, normalizeRef(extraProps)]
          : normalizeRef(extraProps)
        : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: children2,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag:
      extraProps && vnode.type !== Fragment
        ? patchFlag === -1
          ? 16
          : patchFlag | 16
        : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
  };
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock
    ? (openBlock(), createBlock(Comment$1, null, text))
    : createVNode(Comment$1, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment$1);
  } else if (isArray$1(child)) {
    return createVNode(Fragment, null, child.slice());
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children2) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children2 == null) {
    children2 = null;
  } else if (isArray$1(children2)) {
    type = 16;
  } else if (typeof children2 === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children2.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children2._;
      if (!slotFlag && !(InternalObjectKey in children2)) {
        children2._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children2._ = 1;
        } else {
          children2._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction$1(children2)) {
    children2 = { default: children2, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children2 = String(children2);
    if (shapeFlag & 64) {
      type = 16;
      children2 = [createTextVNode(children2)];
    } else {
      type = 8;
    }
  }
  vnode.children = children2;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (
          incoming &&
          existing !== incoming &&
          !(isArray$1(existing) && existing.includes(incoming))
        ) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [vnode, prevVNode]);
}
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache && cache[index];
  if (isArray$1(source) || isString$1(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) =>
        renderItem(item, i, void 0, cached && cached[i])
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index] = ret;
  }
  return ret;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE) {
    return createVNode(
      "slot",
      name === "default" ? null : { name },
      fallback && fallback()
    );
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(
    Fragment,
    { key: props.key || `_${name}` },
    validSlotContent || (fallback ? fallback() : []),
    validSlotContent && slots._ === 1 ? 64 : -2
  );
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child)) return true;
    if (child.type === Comment$1) return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  })
    ? vnodes
    : null;
}
const getPublicInstance = (i) => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = extend(/* @__PURE__ */ Object.create(null), {
  $: (i) => i,
  $el: (i) => i.vnode.el,
  $data: (i) => i.data,
  $props: (i) => i.props,
  $attrs: (i) => i.attrs,
  $slots: (i) => i.slots,
  $refs: (i) => i.refs,
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => resolveMergedOptions(i),
  $forceUpdate: (i) => () => queueJob(i.update),
  $nextTick: (i) => nextTick.bind(i.proxy),
  $watch: (i) => instanceWatch.bind(i),
});
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } =
      instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        (normalizedProps = instance.propsOptions[0]) &&
        hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      (cssModule = type.__cssModules) &&
      (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      ((globalProperties = appContext.config.globalProperties),
      hasOwn(globalProperties, key))
    ) {
      {
        return globalProperties[key];
      }
    } else;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has(
    { _: { data, setupState, accessCache, ctx, appContext, propsOptions } },
    key
  ) {
    let normalizedProps;
    return (
      !!accessCache[key] ||
      (data !== EMPTY_OBJ && hasOwn(data, key)) ||
      (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) ||
      ((normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key)) ||
      hasOwn(ctx, key) ||
      hasOwn(publicPropertiesMap, key) ||
      hasOwn(appContext.config.globalProperties, key)
    );
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      this.set(target, key, descriptor.get(), null);
    } else if (descriptor.value != null) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  },
};
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext =
    (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null,
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children: children2 } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children2);
  const setupResult = isStateful
    ? setupStatefulComponent(instance, isSSR)
    : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(
    new Proxy(instance.ctx, PublicInstanceProxyHandlers)
  );
  const { setup } = Component;
  if (setup) {
    const setupContext = (instance.setupContext =
      setup.length > 1 ? createSetupContext(instance) : null);
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [
      instance.props,
      setupContext,
    ]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult
          .then((resolvedResult) => {
            handleSetupResult(instance, resolvedResult, isSSR);
          })
          .catch((e) => {
            handleError(e, instance, 0);
          });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$1(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else;
  finishComponentSetup(instance, isSSR);
}
let compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } =
          Component;
        const finalCompilerOptions = extend(
          extend(
            {
              isCustomElement,
              delimiters,
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        Component.render = compile(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, {
    get(target, key) {
      track(instance, "get", "$attrs");
      return target[key];
    },
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return {
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      slots: instance.slots,
      emit: instance.emit,
      expose,
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return (
      instance.exposeProxy ||
      (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key) {
          if (key in target) {
            return target[key];
          } else if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
          }
        },
      }))
    );
  }
}
function getComponentName(Component) {
  return isFunction$1(Component)
    ? Component.displayName || Component.name
    : Component.name;
}
function isClassComponent(value) {
  return isFunction$1(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h$1(type, propsOrChildren, children2) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray$1(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children2 = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children2)) {
      children2 = [children2];
    }
    return createVNode(type, propsOrChildren, children2);
  }
}
const version = "3.2.31";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG
      ? doc.createElementNS(svgNS, tag)
      : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  cloneNode(el) {
    const cloned = el.cloneNode(true);
    if (`_value` in el) {
      cloned._value = el._value;
    }
    return cloned;
  },
  insertStaticContent(content, parent, anchor, isSVG, start2, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start2 && (start2 === end || start2.nextSibling)) {
      while (true) {
        parent.insertBefore(start2.cloneNode(true), anchor);
        if (start2 === end || !(start2 = start2.nextSibling)) break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      before ? before.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild,
    ];
  },
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (
      value ? [value, ...transitionClasses] : [...transitionClasses]
    ).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString$1(next);
  if (next && !isCssString) {
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
    if (prev && !isString$1(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v2) => setStyle(style, name, v2));
  } else {
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return (prefixCache[rawName] = name);
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return (prefixCache[rawName] = prefixed);
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || (isBoolean && !includeBooleanAttr(value))) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
}
function patchDOMProp(
  el,
  key,
  value,
  prevChildren,
  parentComponent,
  parentSuspense,
  unmountChildren
) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (
    key === "value" &&
    el.tagName !== "PROGRESS" &&
    !el.tagName.includes("-")
  ) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      el[key] = includeBooleanAttr(value);
      return;
    } else if (value == null && type === "string") {
      el[key] = "";
      el.removeAttribute(key);
      return;
    } else if (type === "number") {
      try {
        el[key] = 0;
      } catch (_a2) {}
      el.removeAttribute(key);
      return;
    }
  }
  try {
    el[key] = value;
  } catch (e) {}
}
let _getNow = Date.now;
let skipTimestampCheck = false;
if (typeof window !== "undefined") {
  if (_getNow() > document.createEvent("Event").timeStamp) {
    _getNow = () => performance.now();
  }
  const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
  skipTimestampCheck = !!(ffMatch && Number(ffMatch[1]) <= 53);
}
let cachedNow = 0;
const p = Promise.resolve();
const reset = () => {
  cachedNow = 0;
};
const getNow = () => cachedNow || (p.then(reset), (cachedNow = _getNow()));
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = (invokers[rawName] = createInvoker(nextValue, instance));
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while ((m = name.match(optionsModifierRE))) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  return [hyphenate(name.slice(2)), options];
}
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    const timeStamp = e.timeStamp || _getNow();
    if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
      callWithAsyncErrorHandling(
        patchStopImmediatePropagation(e, invoker.value),
        instance,
        5,
        [e]
      );
    }
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray$1(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (
  el,
  key,
  prevValue,
  nextValue,
  isSVG = false,
  prevChildren,
  parentComponent,
  parentSuspense,
  unmountChildren
) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (
    key[0] === "."
      ? ((key = key.slice(1)), true)
      : key[0] === "^"
      ? ((key = key.slice(1)), false)
      : shouldSetAsProp(el, key, nextValue, isSVG)
  ) {
    patchDOMProp(
      el,
      key,
      nextValue,
      prevChildren,
      parentComponent,
      parentSuspense,
      unmountChildren
    );
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction$1(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString$1(value)) {
    return false;
  }
  return key in el;
}
const TRANSITION = "transition";
const ANIMATION = "animation";
const Transition = (props, { slots }) =>
  h$1(BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true,
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
Transition.props = /* @__PURE__ */ extend(
  {},
  BaseTransition.props,
  DOMTransitionPropsValidators
);
const callHook = (hook, args = []) => {
  if (isArray$1(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook
    ? isArray$1(hook)
      ? hook.some((h2) => h2.length > 1)
      : hook.length > 1
    : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`,
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled,
  } = baseProps;
  const finishEnter = (el, isAppear, done2) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done2 && done2();
  };
  const finishLeave = (el, done2) => {
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done2 && done2();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done2) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done2);
      callHook(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done2) {
      const resolve2 = () => finishLeave(el, done2);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    },
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const { _vtc } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = (el._endId = ++endId);
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles2 = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles2[key] || "").split(", ");
  const transitionDelays = getStyleProperties(TRANSITION + "Delay");
  const transitionDurations = getStyleProperties(TRANSITION + "Duration");
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(ANIMATION + "Delay");
  const animationDurations = getStyleProperties(ANIMATION + "Duration");
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type =
      timeout > 0
        ? transitionTimeout > animationTimeout
          ? TRANSITION
          : ANIMATION
        : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  const hasTransform =
    type === TRANSITION &&
    /\b(transform|all)(,|$)/.test(styles2[TRANSITION + "Property"]);
  return {
    type,
    timeout,
    propCount,
    hasTransform,
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"];
  return isArray$1(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    trigger(target, "input");
  }
}
function trigger(el, type) {
  const e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
const vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el._assign = getModelAssigner(vnode);
    const castToNumber =
      number || (vnode.props && vnode.props.type === "number");
    addEventListener(el, lazy ? "change" : "input", (e) => {
      if (e.target.composing) return;
      let domValue = el.value;
      if (trim) {
        domValue = domValue.trim();
      } else if (castToNumber) {
        domValue = toNumber(domValue);
      }
      el._assign(domValue);
    });
    if (trim) {
      addEventListener(el, "change", () => {
        el.value = el.value.trim();
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, modifiers: { lazy, trim, number } }, vnode) {
    el._assign = getModelAssigner(vnode);
    if (el.composing) return;
    if (document.activeElement === el) {
      if (lazy) {
        return;
      }
      if (trim && el.value.trim() === value) {
        return;
      }
      if ((number || el.type === "number") && toNumber(el.value) === value) {
        return;
      }
    }
    const newValue = value == null ? "" : value;
    if (el.value !== newValue) {
      el.value = newValue;
    }
  },
};
const rendererOptions = extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app2 = ensureRenderer().createApp(...args);
  const { mount } = app2;
  app2.mount = (containerOrSelector) => {
    const container2 = normalizeContainer(containerOrSelector);
    if (!container2) return;
    const component = app2._component;
    if (!isFunction$1(component) && !component.render && !component.template) {
      component.template = container2.innerHTML;
    }
    container2.innerHTML = "";
    const proxy = mount(container2, false, container2 instanceof SVGElement);
    if (container2 instanceof Element) {
      container2.removeAttribute("v-cloak");
      container2.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
};
function normalizeContainer(container2) {
  if (isString$1(container2)) {
    const res = document.querySelector(container2);
    return res;
  }
  return container2;
}
function T(t, n, ...u) {
  if (t in n) {
    let o = n[t];
    return typeof o == "function" ? o(...u) : o;
  }
  let e = new Error(
    `Tried to handle "${t}" but there is no handler defined. Only defined handlers are: ${Object.keys(
      n
    )
      .map((o) => `"${o}"`)
      .join(", ")}.`
  );
  throw (Error.captureStackTrace && Error.captureStackTrace(e, T), e);
}
function x(_a2) {
  var _b = _a2,
    { visible: t = true, features: n = 0 } = _b,
    u = __objRest(_b, ["visible", "features"]);
  var e;
  if (t || (n & 2 && u.props.static)) return Se(u);
  if (n & 1) {
    let o = ((e = u.props.unmount) != null ? e : true) ? 0 : 1;
    return T(o, {
      [0]() {
        return null;
      },
      [1]() {
        return Se(
          __spreadProps(__spreadValues({}, u), {
            props: __spreadProps(__spreadValues({}, u.props), {
              hidden: true,
              style: { display: "none" },
            }),
          })
        );
      },
    });
  }
  return Se(u);
}
function Se({ props: t, attrs: n, slots: u, slot: e, name: o }) {
  var a;
  let _a2 = L(t, ["unmount", "static"]),
    { as: r } = _a2,
    s = __objRest(_a2, ["as"]),
    d = (a = u.default) == null ? void 0 : a.call(u, e);
  if (r === "template") {
    if (Object.keys(s).length > 0 || Object.keys(n).length > 0) {
      let [i, ...l] = d != null ? d : [];
      if (!co(i) || l.length > 0)
        throw new Error(
          [
            'Passing props on "template"!',
            "",
            `The current component <${o} /> is rendering a "template".`,
            "However we need to passthrough the following props:",
            Object.keys(s)
              .concat(Object.keys(n))
              .map((c) => `  - ${c}`).join(`
`),
            "",
            "You can apply a few solutions:",
            [
              'Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".',
              "Render a single element as the child so that we can forward the props onto that element.",
            ].map((c) => `  - ${c}`).join(`
`),
          ].join(`
`)
        );
      return cloneVNode(i, s);
    }
    return Array.isArray(d) && d.length === 1 ? d[0] : d;
  }
  return h$1(r, s, d);
}
function L(t, n = []) {
  let u = Object.assign({}, t);
  for (let e of n) e in u && delete u[e];
  return u;
}
function co(t) {
  return t == null
    ? false
    : typeof t.type == "string" ||
        typeof t.type == "object" ||
        typeof t.type == "function";
}
var mo = 0;
function vo() {
  return ++mo;
}
function h() {
  return vo();
}
function bo(t) {
  throw new Error("Unexpected object: " + t);
}
function J(t, n) {
  let u = n.resolveItems();
  if (u.length <= 0) return null;
  let e = n.resolveActiveIndex(),
    o = e != null ? e : -1,
    r = (() => {
      switch (t.focus) {
        case 0:
          return u.findIndex((s) => !n.resolveDisabled(s));
        case 1: {
          let s = u
            .slice()
            .reverse()
            .findIndex((d, a, i) =>
              o !== -1 && i.length - a - 1 >= o ? false : !n.resolveDisabled(d)
            );
          return s === -1 ? s : u.length - 1 - s;
        }
        case 2:
          return u.findIndex((s, d) =>
            d <= o ? false : !n.resolveDisabled(s)
          );
        case 3: {
          let s = u
            .slice()
            .reverse()
            .findIndex((d) => !n.resolveDisabled(d));
          return s === -1 ? s : u.length - 1 - s;
        }
        case 4:
          return u.findIndex((s) => n.resolveId(s) === t.id);
        case 5:
          return null;
        default:
          bo(t);
      }
    })();
  return r === -1 ? e : r;
}
function v(t) {
  return t == null || t.value == null
    ? null
    : "$el" in t.value
    ? t.value.$el
    : t.value;
}
function C(t, n, u) {
  typeof window != "undefined" &&
    watchEffect((e) => {
      window.addEventListener(t, n, u),
        e(() => {
          window.removeEventListener(t, n, u);
        });
    });
}
var at = Symbol("Context");
function it() {
  return I() !== null;
}
function I() {
  return inject(at, null);
}
function M(t) {
  provide$1(at, t);
}
function ut(t, n) {
  if (t) return t;
  let u = n != null ? n : "button";
  if (typeof u == "string" && u.toLowerCase() === "button") return "button";
}
function P(t, n) {
  let u = ref(ut(t.value.type, t.value.as));
  return (
    onMounted(() => {
      u.value = ut(t.value.type, t.value.as);
    }),
    watchEffect(() => {
      var e;
      u.value ||
        !v(n) ||
        (v(n) instanceof HTMLButtonElement &&
          !((e = v(n)) == null ? void 0 : e.hasAttribute("type")) &&
          (u.value = "button"));
    }),
    u
  );
}
function Y({ container: t, accept: n, walk: u, enabled: e }) {
  watchEffect(() => {
    let o = t.value;
    if (!o || (e !== void 0 && !e.value)) return;
    let r = Object.assign((d) => n(d), { acceptNode: n }),
      s = document.createTreeWalker(o, NodeFilter.SHOW_ELEMENT, r, false);
    for (; s.nextNode(); ) u(s.currentNode);
  });
}
var ct = Symbol("ComboboxContext");
function ee(t) {
  let n = inject(ct, null);
  if (n === null) {
    let u = new Error(`<${t} /> is missing a parent <Combobox /> component.`);
    throw (Error.captureStackTrace && Error.captureStackTrace(u, ee), u);
  }
  return n;
}
defineComponent({
  name: "Combobox",
  emits: { "update:modelValue": (t) => true },
  props: {
    as: { type: [Object, String], default: "template" },
    disabled: { type: [Boolean], default: false },
    modelValue: { type: [Object, String, Number, Boolean] },
  },
  setup(t, { slots: n, attrs: u, emit: e }) {
    let o = ref(1),
      r = ref(null),
      s = ref(null),
      d = ref(null),
      a = ref(null),
      i = ref({ static: false, hold: false }),
      l = ref([]),
      c = ref(null),
      p2 = computed(() => t.modelValue),
      f = {
        comboboxState: o,
        value: p2,
        inputRef: s,
        labelRef: r,
        buttonRef: d,
        optionsRef: a,
        disabled: computed(() => t.disabled),
        options: l,
        activeOptionIndex: c,
        inputPropsRef: ref({ displayValue: void 0 }),
        optionsPropsRef: i,
        closeCombobox() {
          t.disabled || (o.value !== 1 && ((o.value = 1), (c.value = null)));
        },
        openCombobox() {
          t.disabled || (o.value !== 0 && (o.value = 0));
        },
        goToOption(m, g) {
          if (t.disabled || (a.value && !i.value.static && o.value === 1))
            return;
          let S = J(m === 4 ? { focus: 4, id: g } : { focus: m }, {
            resolveItems: () => l.value,
            resolveActiveIndex: () => c.value,
            resolveId: (y) => y.id,
            resolveDisabled: (y) => y.dataRef.disabled,
          });
          c.value !== S && (c.value = S);
        },
        syncInputValue() {
          let m = f.value.value;
          if (!v(f.inputRef) || m === void 0) return;
          let g = f.inputPropsRef.value.displayValue;
          typeof g == "function"
            ? (f.inputRef.value.value = g(m))
            : typeof m == "string" && (f.inputRef.value.value = m);
        },
        selectOption(m) {
          let g = l.value.find((y) => y.id === m);
          if (!g) return;
          let { dataRef: S } = g;
          e("update:modelValue", S.value), f.syncInputValue();
        },
        selectActiveOption() {
          if (c.value === null) return;
          let { dataRef: m } = l.value[c.value];
          e("update:modelValue", m.value), f.syncInputValue();
        },
        registerOption(m, g) {
          var R, E;
          let S = c.value !== null ? l.value[c.value] : null,
            y = Array.from(
              (E =
                (R = a.value) == null
                  ? void 0
                  : R.querySelectorAll(
                      '[id^="headlessui-combobox-option-"]'
                    )) != null
                ? E
                : []
            ).reduce((D, w, F) => Object.assign(D, { [w.id]: F }), {});
          (l.value = [...l.value, { id: m, dataRef: g }].sort(
            (D, w) => y[D.id] - y[w.id]
          )),
            (c.value = (() => (S === null ? null : l.value.indexOf(S)))());
        },
        unregisterOption(m) {
          let g = l.value.slice(),
            S = c.value !== null ? g[c.value] : null,
            y = g.findIndex((R) => R.id === m);
          y !== -1 && g.splice(y, 1),
            (l.value = g),
            (c.value = (() =>
              y === c.value || S === null ? null : g.indexOf(S))());
        },
      };
    C("mousedown", (m) => {
      var S, y, R;
      let g = m.target;
      o.value === 0 &&
        (((S = v(s)) == null ? void 0 : S.contains(g)) ||
          ((y = v(d)) == null ? void 0 : y.contains(g)) ||
          ((R = v(a)) == null ? void 0 : R.contains(g)) ||
          f.closeCombobox());
    }),
      watch([f.value, f.inputRef], () => f.syncInputValue(), {
        immediate: true,
      }),
      provide$1(ct, f),
      M(computed(() => T(o.value, { [0]: 0, [1]: 1 })));
    let b = computed(() =>
      c.value === null ? null : l.value[c.value].dataRef.value
    );
    return () => {
      let m = {
        open: o.value === 0,
        disabled: t.disabled,
        activeIndex: c.value,
        activeOption: b.value,
      };
      return x({
        props: L(t, ["modelValue", "onUpdate:modelValue", "disabled"]),
        slot: m,
        slots: n,
        attrs: u,
        name: "Combobox",
      });
    };
  },
});
defineComponent({
  name: "ComboboxLabel",
  props: { as: { type: [Object, String], default: "label" } },
  setup(t, { attrs: n, slots: u }) {
    let e = ee("ComboboxLabel"),
      o = `headlessui-combobox-label-${h()}`;
    function r() {
      var s;
      (s = v(e.inputRef)) == null || s.focus({ preventScroll: true });
    }
    return () => {
      let s = { open: e.comboboxState.value === 0, disabled: e.disabled.value },
        d = { id: o, ref: e.labelRef, onClick: r };
      return x({
        props: __spreadValues(__spreadValues({}, t), d),
        slot: s,
        attrs: n,
        slots: u,
        name: "ComboboxLabel",
      });
    };
  },
});
defineComponent({
  name: "ComboboxButton",
  props: { as: { type: [Object, String], default: "button" } },
  setup(t, { attrs: n, slots: u }) {
    let e = ee("ComboboxButton"),
      o = `headlessui-combobox-button-${h()}`;
    function r(a) {
      e.disabled.value ||
        (e.comboboxState.value === 0
          ? e.closeCombobox()
          : (a.preventDefault(), e.openCombobox()),
        nextTick(() => {
          var i;
          return (i = v(e.inputRef)) == null
            ? void 0
            : i.focus({ preventScroll: true });
        }));
    }
    function s(a) {
      switch (a.key) {
        case "ArrowDown":
          a.preventDefault(),
            a.stopPropagation(),
            e.comboboxState.value === 1 &&
              (e.openCombobox(),
              nextTick(() => {
                e.value.value || e.goToOption(0);
              })),
            nextTick(() => {
              var i;
              return (i = e.inputRef.value) == null
                ? void 0
                : i.focus({ preventScroll: true });
            });
          return;
        case "ArrowUp":
          a.preventDefault(),
            a.stopPropagation(),
            e.comboboxState.value === 1 &&
              (e.openCombobox(),
              nextTick(() => {
                e.value.value || e.goToOption(3);
              })),
            nextTick(() => {
              var i;
              return (i = e.inputRef.value) == null
                ? void 0
                : i.focus({ preventScroll: true });
            });
          return;
        case "Escape":
          a.preventDefault(),
            e.optionsRef.value &&
              !e.optionsPropsRef.value.static &&
              a.stopPropagation(),
            e.closeCombobox(),
            nextTick(() => {
              var i;
              return (i = e.inputRef.value) == null
                ? void 0
                : i.focus({ preventScroll: true });
            });
          return;
      }
    }
    let d = P(
      computed(() => ({ as: t.as, type: n.type })),
      e.buttonRef
    );
    return () => {
      var l, c;
      let a = { open: e.comboboxState.value === 0, disabled: e.disabled.value },
        i = {
          ref: e.buttonRef,
          id: o,
          type: d.value,
          tabindex: "-1",
          "aria-haspopup": true,
          "aria-controls": (l = v(e.optionsRef)) == null ? void 0 : l.id,
          "aria-expanded": e.disabled.value
            ? void 0
            : e.comboboxState.value === 0,
          "aria-labelledby": e.labelRef.value
            ? [(c = v(e.labelRef)) == null ? void 0 : c.id, o].join(" ")
            : void 0,
          disabled: e.disabled.value === true ? true : void 0,
          onKeydown: s,
          onClick: r,
        };
      return x({
        props: __spreadValues(__spreadValues({}, t), i),
        slot: a,
        attrs: n,
        slots: u,
        name: "ComboboxButton",
      });
    };
  },
});
defineComponent({
  name: "ComboboxInput",
  props: {
    as: { type: [Object, String], default: "input" },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
    displayValue: { type: Function },
  },
  emits: { change: (t) => true },
  setup(t, { emit: n, attrs: u, slots: e }) {
    let o = ee("ComboboxInput"),
      r = `headlessui-combobox-input-${h()}`;
    o.inputPropsRef = computed(() => t);
    function s(a) {
      switch (a.key) {
        case "Enter":
          a.preventDefault(),
            a.stopPropagation(),
            o.selectActiveOption(),
            o.closeCombobox();
          break;
        case "ArrowDown":
          return (
            a.preventDefault(),
            a.stopPropagation(),
            T(o.comboboxState.value, {
              [0]: () => o.goToOption(2),
              [1]: () => {
                o.openCombobox(),
                  nextTick(() => {
                    o.value.value || o.goToOption(0);
                  });
              },
            })
          );
        case "ArrowUp":
          return (
            a.preventDefault(),
            a.stopPropagation(),
            T(o.comboboxState.value, {
              [0]: () => o.goToOption(1),
              [1]: () => {
                o.openCombobox(),
                  nextTick(() => {
                    o.value.value || o.goToOption(3);
                  });
              },
            })
          );
        case "Home":
        case "PageUp":
          return a.preventDefault(), a.stopPropagation(), o.goToOption(0);
        case "End":
        case "PageDown":
          return a.preventDefault(), a.stopPropagation(), o.goToOption(3);
        case "Escape":
          a.preventDefault(),
            o.optionsRef.value &&
              !o.optionsPropsRef.value.static &&
              a.stopPropagation(),
            o.closeCombobox();
          break;
        case "Tab":
          o.selectActiveOption(), o.closeCombobox();
          break;
      }
    }
    function d(a) {
      o.openCombobox(), n("change", a);
    }
    return () => {
      var c, p2, f, b, m;
      let a = { open: o.comboboxState.value === 0 },
        i = {
          "aria-controls": (c = o.optionsRef.value) == null ? void 0 : c.id,
          "aria-expanded": o.disabled ? void 0 : o.comboboxState.value === 0,
          "aria-activedescendant":
            o.activeOptionIndex.value === null ||
            (p2 = o.options.value[o.activeOptionIndex.value]) == null
              ? void 0
              : p2.id,
          "aria-labelledby":
            (m = (f = v(o.labelRef)) == null ? void 0 : f.id) != null
              ? m
              : (b = v(o.buttonRef)) == null
              ? void 0
              : b.id,
          id: r,
          onKeydown: s,
          onChange: d,
          onInput: d,
          role: "combobox",
          type: "text",
          tabIndex: 0,
          ref: o.inputRef,
        },
        l = L(t, ["displayValue"]);
      return x({
        props: __spreadValues(__spreadValues({}, l), i),
        slot: a,
        attrs: u,
        slots: e,
        features: 1 | 2,
        name: "ComboboxInput",
      });
    };
  },
});
defineComponent({
  name: "ComboboxOptions",
  props: {
    as: { type: [Object, String], default: "ul" },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
    hold: { type: [Boolean], default: false },
  },
  setup(t, { attrs: n, slots: u }) {
    let e = ee("ComboboxOptions"),
      o = `headlessui-combobox-options-${h()}`;
    watchEffect(() => {
      e.optionsPropsRef.value.static = t.static;
    }),
      watchEffect(() => {
        e.optionsPropsRef.value.hold = t.hold;
      });
    let r = I(),
      s = computed(() =>
        r !== null ? r.value === 0 : e.comboboxState.value === 0
      );
    return (
      Y({
        container: computed(() => v(e.optionsRef)),
        enabled: computed(() => e.comboboxState.value === 0),
        accept(d) {
          return d.getAttribute("role") === "option"
            ? NodeFilter.FILTER_REJECT
            : d.hasAttribute("role")
            ? NodeFilter.FILTER_SKIP
            : NodeFilter.FILTER_ACCEPT;
        },
        walk(d) {
          d.setAttribute("role", "none");
        },
      }),
      () => {
        var l, c, p2, f;
        let d = { open: e.comboboxState.value === 0 },
          a = {
            "aria-activedescendant":
              e.activeOptionIndex.value === null ||
              (l = e.options.value[e.activeOptionIndex.value]) == null
                ? void 0
                : l.id,
            "aria-labelledby":
              (f = (c = v(e.labelRef)) == null ? void 0 : c.id) != null
                ? f
                : (p2 = v(e.buttonRef)) == null
                ? void 0
                : p2.id,
            id: o,
            ref: e.optionsRef,
            role: "listbox",
          },
          i = L(t, ["hold"]);
        return x({
          props: __spreadValues(__spreadValues({}, i), a),
          slot: d,
          attrs: n,
          slots: u,
          features: 1 | 2,
          visible: s.value,
          name: "ComboboxOptions",
        });
      }
    );
  },
});
defineComponent({
  name: "ComboboxOption",
  props: {
    as: { type: [Object, String], default: "li" },
    value: { type: [Object, String, Number, Boolean] },
    disabled: { type: Boolean, default: false },
  },
  setup(t, { slots: n, attrs: u }) {
    let e = ee("ComboboxOption"),
      o = `headlessui-combobox-option-${h()}`,
      r = computed(() =>
        e.activeOptionIndex.value !== null
          ? e.options.value[e.activeOptionIndex.value].id === o
          : false
      ),
      s = computed(() => toRaw(e.value.value) === toRaw(t.value)),
      d = computed(() => ({ disabled: t.disabled, value: t.value }));
    onMounted(() => e.registerOption(o, d)),
      onUnmounted(() => e.unregisterOption(o)),
      onMounted(() => {
        watch(
          [e.comboboxState, s],
          () => {
            e.comboboxState.value === 0 && (!s.value || e.goToOption(4, o));
          },
          { immediate: true }
        );
      }),
      watchEffect(() => {
        e.comboboxState.value === 0 &&
          (!r.value ||
            nextTick(() => {
              var p2, f;
              return (f =
                (p2 = document.getElementById(o)) == null
                  ? void 0
                  : p2.scrollIntoView) == null
                ? void 0
                : f.call(p2, { block: "nearest" });
            }));
      });
    function a(p2) {
      if (t.disabled) return p2.preventDefault();
      e.selectOption(o),
        e.closeCombobox(),
        nextTick(() => {
          var f;
          return (f = v(e.inputRef)) == null
            ? void 0
            : f.focus({ preventScroll: true });
        });
    }
    function i() {
      if (t.disabled) return e.goToOption(5);
      e.goToOption(4, o);
    }
    function l() {
      t.disabled || r.value || e.goToOption(4, o);
    }
    function c() {
      t.disabled || !r.value || e.optionsPropsRef.value.hold || e.goToOption(5);
    }
    return () => {
      let { disabled: p2 } = t,
        f = { active: r.value, selected: s.value, disabled: p2 },
        b = {
          id: o,
          role: "option",
          tabIndex: p2 === true ? void 0 : -1,
          "aria-disabled": p2 === true ? true : void 0,
          "aria-selected": s.value === true ? s.value : void 0,
          disabled: void 0,
          onClick: a,
          onFocus: i,
          onPointermove: l,
          onMousemove: l,
          onPointerleave: c,
          onMouseleave: c,
        };
      return x({
        props: __spreadValues(__spreadValues({}, t), b),
        slot: f,
        attrs: u,
        slots: n,
        name: "ComboboxOption",
      });
    };
  },
});
var Ke = [
  "[contentEditable=true]",
  "[tabindex]",
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "iframe",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
]
  .map((t) => `${t}:not([tabindex='-1'])`)
  .join(",");
function ae(t = document.body) {
  return t == null ? [] : Array.from(t.querySelectorAll(Ke));
}
function mt(t, n = 0) {
  return t === document.body
    ? false
    : T(n, {
        [0]() {
          return t.matches(Ke);
        },
        [1]() {
          let u = t;
          for (; u !== null; ) {
            if (u.matches(Ke)) return true;
            u = u.parentElement;
          }
          return false;
        },
      });
}
function te(t) {
  t == null || t.focus({ preventScroll: true });
}
function O(t, n) {
  let u = Array.isArray(t)
      ? t.slice().sort((l, c) => {
          let p2 = l.compareDocumentPosition(c);
          return p2 & Node.DOCUMENT_POSITION_FOLLOWING
            ? -1
            : p2 & Node.DOCUMENT_POSITION_PRECEDING
            ? 1
            : 0;
        })
      : ae(t),
    e = document.activeElement,
    o = (() => {
      if (n & (1 | 4)) return 1;
      if (n & (2 | 8)) return -1;
      throw new Error(
        "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last"
      );
    })(),
    r = (() => {
      if (n & 1) return 0;
      if (n & 2) return Math.max(0, u.indexOf(e)) - 1;
      if (n & 4) return Math.max(0, u.indexOf(e)) + 1;
      if (n & 8) return u.length - 1;
      throw new Error(
        "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last"
      );
    })(),
    s = n & 32 ? { preventScroll: true } : {},
    d = 0,
    a = u.length,
    i;
  do {
    if (d >= a || d + a <= 0) return 0;
    let l = r + d;
    if (n & 16) l = (l + a) % a;
    else {
      if (l < 0) return 3;
      if (l >= a) return 1;
    }
    (i = u[l]), i == null || i.focus(s), (d += o);
  } while (i !== document.activeElement);
  return i.hasAttribute("tabindex") || i.setAttribute("tabindex", "0"), 2;
}
function ie(t, n) {
  for (let u of t) if (u.contains(n)) return true;
  return false;
}
function Re(t, n = ref(true), u = ref({})) {
  let e = ref(typeof window != "undefined" ? document.activeElement : null),
    o = ref(null);
  function r() {
    if (!n.value || t.value.size !== 1) return;
    let { initialFocus: d } = u.value,
      a = document.activeElement;
    if (d) {
      if (d === a) return;
    } else if (ie(t.value, a)) return;
    if (((e.value = a), d)) te(d);
    else {
      let i = false;
      for (let l of t.value)
        if (O(l, 1) === 2) {
          i = true;
          break;
        }
      i ||
        console.warn(
          "There are no focusable elements inside the <FocusTrap />"
        );
    }
    o.value = document.activeElement;
  }
  function s() {
    te(e.value), (e.value = null), (o.value = null);
  }
  watchEffect(r),
    onUpdated(() => {
      n.value ? r() : s();
    }),
    onUnmounted(s),
    C("keydown", (d) => {
      if (
        !!n.value &&
        d.key === "Tab" &&
        !!document.activeElement &&
        t.value.size === 1
      ) {
        d.preventDefault();
        for (let a of t.value)
          if (O(a, (d.shiftKey ? 2 : 4) | 16) === 2) {
            o.value = document.activeElement;
            break;
          }
      }
    }),
    C(
      "focus",
      (d) => {
        if (!n.value || t.value.size !== 1) return;
        let a = o.value;
        if (!a) return;
        let i = d.target;
        i && i instanceof HTMLElement
          ? ie(t.value, i)
            ? ((o.value = i), te(i))
            : (d.preventDefault(), d.stopPropagation(), te(a))
          : te(o.value);
      },
      true
    );
}
var bt = "body > *",
  oe = /* @__PURE__ */ new Set(),
  K = /* @__PURE__ */ new Map();
function gt(t) {
  t.setAttribute("aria-hidden", "true"), (t.inert = true);
}
function xt(t) {
  let n = K.get(t);
  !n ||
    (n["aria-hidden"] === null
      ? t.removeAttribute("aria-hidden")
      : t.setAttribute("aria-hidden", n["aria-hidden"]),
    (t.inert = n.inert));
}
function yt(t, n = ref(true)) {
  watchEffect((u) => {
    if (!n.value || !t.value) return;
    let e = t.value;
    oe.add(e);
    for (let o of K.keys()) o.contains(e) && (xt(o), K.delete(o));
    document.querySelectorAll(bt).forEach((o) => {
      if (o instanceof HTMLElement) {
        for (let r of oe) if (o.contains(r)) return;
        oe.size === 1 &&
          (K.set(o, {
            "aria-hidden": o.getAttribute("aria-hidden"),
            inert: o.inert,
          }),
          gt(o));
      }
    }),
      u(() => {
        if ((oe.delete(e), oe.size > 0))
          document.querySelectorAll(bt).forEach((o) => {
            if (o instanceof HTMLElement && !K.has(o)) {
              for (let r of oe) if (o.contains(r)) return;
              K.set(o, {
                "aria-hidden": o.getAttribute("aria-hidden"),
                inert: o.inert,
              }),
                gt(o);
            }
          });
        else for (let o of K.keys()) xt(o), K.delete(o);
      });
  });
}
var St = Symbol("StackContext");
function ht() {
  return inject(St, () => {});
}
function Rt(t) {
  let n = ht();
  watchEffect((u) => {
    let e = t == null ? void 0 : t.value;
    !e || (n(0, e), u(() => n(1, e)));
  });
}
function Te(t) {
  let n = ht();
  function u(...e) {
    t == null || t(...e), n(...e);
  }
  provide$1(St, u);
}
var Tt = Symbol("ForcePortalRootContext");
function Ot() {
  return inject(Tt, false);
}
var Ne = defineComponent({
  name: "ForcePortalRoot",
  props: {
    as: { type: [Object, String], default: "template" },
    force: { type: Boolean, default: false },
  },
  setup(t, { slots: n, attrs: u }) {
    return (
      provide$1(Tt, t.force),
      () => {
        let _a2 = t,
          { force: e } = _a2,
          o = __objRest(_a2, ["force"]);
        return x({
          props: o,
          slot: {},
          slots: n,
          attrs: u,
          name: "ForcePortalRoot",
        });
      }
    );
  },
});
function It() {
  let t = document.getElementById("headlessui-portal-root");
  if (t) return t;
  let n = document.createElement("div");
  return (
    n.setAttribute("id", "headlessui-portal-root"), document.body.appendChild(n)
  );
}
var Pt = defineComponent({
    name: "Portal",
    props: { as: { type: [Object, String], default: "div" } },
    setup(t, { slots: n, attrs: u }) {
      let e = Ot(),
        o = inject(Dt, null),
        r = ref(e === true || o === null ? It() : o.resolveTarget());
      watchEffect(() => {
        e || (o !== null && (r.value = o.resolveTarget()));
      });
      let s = ref(null);
      return (
        Rt(s),
        onUnmounted(() => {
          var a;
          let d = document.getElementById("headlessui-portal-root");
          !d ||
            (r.value === d &&
              r.value.children.length <= 0 &&
              ((a = r.value.parentElement) == null || a.removeChild(r.value)));
        }),
        Te(),
        () => {
          if (r.value === null) return null;
          let d = { ref: s };
          return h$1(
            Teleport,
            { to: r.value },
            x({
              props: __spreadValues(__spreadValues({}, t), d),
              slot: {},
              attrs: u,
              slots: n,
              name: "Portal",
            })
          );
        }
      );
    },
  }),
  Dt = Symbol("PortalGroupContext"),
  wt = defineComponent({
    name: "PortalGroup",
    props: {
      as: { type: [Object, String], default: "template" },
      target: { type: Object, default: null },
    },
    setup(t, { attrs: n, slots: u }) {
      let e = reactive({
        resolveTarget() {
          return t.target;
        },
      });
      return (
        provide$1(Dt, e),
        () => {
          let _a2 = t,
            { target: o } = _a2,
            r = __objRest(_a2, ["target"]);
          return x({
            props: r,
            slot: {},
            attrs: n,
            slots: u,
            name: "PortalGroup",
          });
        }
      );
    },
  });
var Lt = Symbol("DescriptionContext");
function Xo() {
  let t = inject(Lt, null);
  if (t === null) throw new Error("Missing parent");
  return t;
}
function G({ slot: t = ref({}), name: n = "Description", props: u = {} } = {}) {
  let e = ref([]);
  function o(r) {
    return (
      e.value.push(r),
      () => {
        let s = e.value.indexOf(r);
        s !== -1 && e.value.splice(s, 1);
      }
    );
  }
  return (
    provide$1(Lt, { register: o, slot: t, name: n, props: u }),
    computed(() => (e.value.length > 0 ? e.value.join(" ") : void 0))
  );
}
var ne = defineComponent({
  name: "Description",
  props: { as: { type: [Object, String], default: "p" } },
  setup(t, { attrs: n, slots: u }) {
    let e = Xo(),
      o = `headlessui-description-${h()}`;
    return (
      onMounted(() => onUnmounted(e.register(o))),
      () => {
        let { name: r = "Description", slot: s = ref({}), props: d = {} } = e,
          a = t,
          i = __spreadProps(
            __spreadValues(
              {},
              Object.entries(d).reduce(
                (l, [c, p2]) => Object.assign(l, { [c]: unref(p2) }),
                {}
              )
            ),
            { id: o }
          );
        return x({
          props: __spreadValues(__spreadValues({}, a), i),
          slot: s.value,
          attrs: n,
          slots: u,
          name: r,
        });
      }
    );
  },
});
var kt = Symbol("DialogContext");
function $e(t) {
  let n = inject(kt, null);
  if (n === null) {
    let u = new Error(`<${t} /> is missing a parent <Dialog /> component.`);
    throw (Error.captureStackTrace && Error.captureStackTrace(u, $e), u);
  }
  return n;
}
var Ee = "DC8F892D-2EBD-447C-A4C8-A03058436FF4",
  Gr = defineComponent({
    name: "Dialog",
    inheritAttrs: false,
    props: {
      as: { type: [Object, String], default: "div" },
      static: { type: Boolean, default: false },
      unmount: { type: Boolean, default: true },
      open: { type: [Boolean, String], default: Ee },
      initialFocus: { type: Object, default: null },
    },
    emits: { close: (t) => true },
    setup(t, { emit: n, attrs: u, slots: e }) {
      let o = ref(/* @__PURE__ */ new Set()),
        r = I(),
        s = computed(() =>
          t.open === Ee && r !== null
            ? T(r.value, { [0]: true, [1]: false })
            : t.open
        );
      if (!(t.open !== Ee || r !== null))
        throw new Error(
          "You forgot to provide an `open` prop to the `Dialog`."
        );
      if (typeof s.value != "boolean")
        throw new Error(
          `You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${
            s.value === Ee ? void 0 : t.open
          }`
        );
      let a = computed(() => (t.open ? 0 : 1)),
        i = computed(() => (r !== null ? r.value === 0 : a.value === 0)),
        l = ref(null),
        c = ref(a.value === 0);
      onUpdated(() => {
        c.value = a.value === 0;
      });
      let p2 = `headlessui-dialog-${h()}`,
        f = computed(() => ({ initialFocus: t.initialFocus }));
      Re(o, c, f),
        yt(l, c),
        Te((y, R) =>
          T(y, {
            [0]() {
              o.value.add(R);
            },
            [1]() {
              o.value.delete(R);
            },
          })
        );
      let b = G({
          name: "DialogDescription",
          slot: computed(() => ({ open: s.value })),
        }),
        m = ref(null),
        g = {
          titleId: m,
          dialogState: a,
          setTitleId(y) {
            m.value !== y && (m.value = y);
          },
          close() {
            n("close", false);
          },
        };
      provide$1(kt, g),
        C("mousedown", (y) => {
          let R = y.target;
          a.value === 0 &&
            o.value.size === 1 &&
            (ie(o.value, R) ||
              (g.close(), nextTick(() => (R == null ? void 0 : R.focus()))));
        }),
        C("keydown", (y) => {
          y.key === "Escape" &&
            a.value === 0 &&
            (o.value.size > 1 ||
              (y.preventDefault(), y.stopPropagation(), g.close()));
        }),
        watchEffect((y) => {
          if (a.value !== 0) return;
          let R = document.documentElement.style.overflow,
            E = document.documentElement.style.paddingRight,
            D = window.innerWidth - document.documentElement.clientWidth;
          (document.documentElement.style.overflow = "hidden"),
            (document.documentElement.style.paddingRight = `${D}px`),
            y(() => {
              (document.documentElement.style.overflow = R),
                (document.documentElement.style.paddingRight = E);
            });
        }),
        watchEffect((y) => {
          if (a.value !== 0) return;
          let R = v(l);
          if (!R) return;
          let E = new IntersectionObserver((D) => {
            for (let w of D)
              w.boundingClientRect.x === 0 &&
                w.boundingClientRect.y === 0 &&
                w.boundingClientRect.width === 0 &&
                w.boundingClientRect.height === 0 &&
                g.close();
          });
          E.observe(R), y(() => E.disconnect());
        });
      function S(y) {
        y.stopPropagation();
      }
      return () => {
        let y = __spreadProps(__spreadValues({}, u), {
            ref: l,
            id: p2,
            role: "dialog",
            "aria-modal": a.value === 0 ? true : void 0,
            "aria-labelledby": m.value,
            "aria-describedby": b.value,
            onClick: S,
          }),
          _a2 = t,
          { open: R, initialFocus: E } = _a2,
          D = __objRest(_a2, ["open", "initialFocus"]),
          w = { open: a.value === 0 };
        return h$1(Ne, { force: true }, () =>
          h$1(Pt, () =>
            h$1(wt, { target: l.value }, () =>
              h$1(Ne, { force: false }, () =>
                x({
                  props: __spreadValues(__spreadValues({}, D), y),
                  slot: w,
                  attrs: u,
                  slots: e,
                  visible: i.value,
                  features: 1 | 2,
                  name: "Dialog",
                })
              )
            )
          )
        );
      };
    },
  }),
  _r = defineComponent({
    name: "DialogOverlay",
    props: { as: { type: [Object, String], default: "div" } },
    setup(t, { attrs: n, slots: u }) {
      let e = $e("DialogOverlay"),
        o = `headlessui-dialog-overlay-${h()}`;
      function r(s) {
        s.target === s.currentTarget &&
          (s.preventDefault(), s.stopPropagation(), e.close());
      }
      return () =>
        x({
          props: __spreadValues(__spreadValues({}, t), {
            id: o,
            "aria-hidden": true,
            onClick: r,
          }),
          slot: { open: e.dialogState.value === 0 },
          attrs: n,
          slots: u,
          name: "DialogOverlay",
        });
    },
  }),
  qr = defineComponent({
    name: "DialogTitle",
    props: { as: { type: [Object, String], default: "h2" } },
    setup(t, { attrs: n, slots: u }) {
      let e = $e("DialogTitle"),
        o = `headlessui-dialog-title-${h()}`;
      return (
        onMounted(() => {
          e.setTitleId(o), onUnmounted(() => e.setTitleId(null));
        }),
        () =>
          x({
            props: __spreadValues(__spreadValues({}, t), { id: o }),
            slot: { open: e.dialogState.value === 0 },
            attrs: n,
            slots: u,
            name: "DialogTitle",
          })
      );
    },
  });
var At = Symbol("DisclosureContext");
function qe(t) {
  let n = inject(At, null);
  if (n === null) {
    let u = new Error(`<${t} /> is missing a parent <Disclosure /> component.`);
    throw (Error.captureStackTrace && Error.captureStackTrace(u, qe), u);
  }
  return n;
}
var Ht = Symbol("DisclosurePanelContext");
function an() {
  return inject(Ht, null);
}
defineComponent({
  name: "Disclosure",
  props: {
    as: { type: [Object, String], default: "template" },
    defaultOpen: { type: [Boolean], default: false },
  },
  setup(t, { slots: n, attrs: u }) {
    let e = `headlessui-disclosure-button-${h()}`,
      o = `headlessui-disclosure-panel-${h()}`,
      r = ref(t.defaultOpen ? 0 : 1),
      s = ref(null),
      d = ref(null),
      a = {
        buttonId: e,
        panelId: o,
        disclosureState: r,
        panel: s,
        button: d,
        toggleDisclosure() {
          r.value = T(r.value, { [0]: 1, [1]: 0 });
        },
        closeDisclosure() {
          r.value !== 1 && (r.value = 1);
        },
        close(i) {
          a.closeDisclosure();
          let l = (() =>
            i
              ? i instanceof HTMLElement
                ? i
                : i.value instanceof HTMLElement
                ? v(i)
                : v(a.button)
              : v(a.button))();
          l == null || l.focus();
        },
      };
    return (
      provide$1(At, a),
      M(computed(() => T(r.value, { [0]: 0, [1]: 1 }))),
      () => {
        let _a2 = t,
          { defaultOpen: i } = _a2,
          l = __objRest(_a2, ["defaultOpen"]),
          c = { open: r.value === 0, close: a.close };
        return x({ props: l, slot: c, slots: n, attrs: u, name: "Disclosure" });
      }
    );
  },
});
defineComponent({
  name: "DisclosureButton",
  props: {
    as: { type: [Object, String], default: "button" },
    disabled: { type: [Boolean], default: false },
  },
  setup(t, { attrs: n, slots: u }) {
    let e = qe("DisclosureButton"),
      o = an(),
      r = o === null ? false : o === e.panelId,
      s = ref(null);
    r ||
      watchEffect(() => {
        e.button.value = s.value;
      });
    let d = P(
      computed(() => ({ as: t.as, type: n.type })),
      s
    );
    function a() {
      var c;
      t.disabled ||
        (r
          ? (e.toggleDisclosure(), (c = v(e.button)) == null || c.focus())
          : e.toggleDisclosure());
    }
    function i(c) {
      var p2;
      if (!t.disabled)
        if (r)
          switch (c.key) {
            case " ":
            case "Enter":
              c.preventDefault(),
                c.stopPropagation(),
                e.toggleDisclosure(),
                (p2 = v(e.button)) == null || p2.focus();
              break;
          }
        else
          switch (c.key) {
            case " ":
            case "Enter":
              c.preventDefault(), c.stopPropagation(), e.toggleDisclosure();
              break;
          }
    }
    function l(c) {
      switch (c.key) {
        case " ":
          c.preventDefault();
          break;
      }
    }
    return () => {
      let c = { open: e.disclosureState.value === 0 },
        p2 = r
          ? { ref: s, type: d.value, onClick: a, onKeydown: i }
          : {
              id: e.buttonId,
              ref: s,
              type: d.value,
              "aria-expanded": t.disabled
                ? void 0
                : e.disclosureState.value === 0,
              "aria-controls": v(e.panel) ? e.panelId : void 0,
              disabled: t.disabled ? true : void 0,
              onClick: a,
              onKeydown: i,
              onKeyup: l,
            };
      return x({
        props: __spreadValues(__spreadValues({}, t), p2),
        slot: c,
        attrs: n,
        slots: u,
        name: "DisclosureButton",
      });
    };
  },
});
defineComponent({
  name: "DisclosurePanel",
  props: {
    as: { type: [Object, String], default: "div" },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
  },
  setup(t, { attrs: n, slots: u }) {
    let e = qe("DisclosurePanel");
    provide$1(Ht, e.panelId);
    let o = I(),
      r = computed(() =>
        o !== null ? o.value === 0 : e.disclosureState.value === 0
      );
    return () => {
      let s = { open: e.disclosureState.value === 0, close: e.close },
        d = { id: e.panelId, ref: e.panel };
      return x({
        props: __spreadValues(__spreadValues({}, t), d),
        slot: s,
        attrs: n,
        slots: u,
        features: 1 | 2,
        visible: r.value,
        name: "DisclosurePanel",
      });
    };
  },
});
defineComponent({
  name: "FocusTrap",
  props: {
    as: { type: [Object, String], default: "div" },
    initialFocus: { type: Object, default: null },
  },
  setup(t, { attrs: n, slots: u }) {
    let e = ref(/* @__PURE__ */ new Set()),
      o = ref(null),
      r = ref(true),
      s = computed(() => ({ initialFocus: t.initialFocus }));
    return (
      onMounted(() => {
        !o.value || (e.value.add(o.value), Re(e, r, s));
      }),
      onUnmounted(() => {
        r.value = false;
      }),
      () => {
        let d = {},
          a = { ref: o },
          _a2 = t,
          { initialFocus: i } = _a2,
          l = __objRest(_a2, ["initialFocus"]);
        return x({
          props: __spreadValues(__spreadValues({}, l), a),
          slot: d,
          attrs: n,
          slots: u,
          name: "FocusTrap",
        });
      }
    );
  },
});
function gn(t) {
  requestAnimationFrame(() => requestAnimationFrame(t));
}
var Kt = Symbol("ListboxContext");
function pe(t) {
  let n = inject(Kt, null);
  if (n === null) {
    let u = new Error(`<${t} /> is missing a parent <Listbox /> component.`);
    throw (Error.captureStackTrace && Error.captureStackTrace(u, pe), u);
  }
  return n;
}
defineComponent({
  name: "Listbox",
  emits: { "update:modelValue": (t) => true },
  props: {
    as: { type: [Object, String], default: "template" },
    disabled: { type: [Boolean], default: false },
    horizontal: { type: [Boolean], default: false },
    modelValue: { type: [Object, String, Number, Boolean] },
  },
  setup(t, { slots: n, attrs: u, emit: e }) {
    let o = ref(1),
      r = ref(null),
      s = ref(null),
      d = ref(null),
      a = ref([]),
      i = ref(""),
      l = ref(null),
      c = computed(() => t.modelValue),
      p2 = {
        listboxState: o,
        value: c,
        orientation: computed(() => (t.horizontal ? "horizontal" : "vertical")),
        labelRef: r,
        buttonRef: s,
        optionsRef: d,
        disabled: computed(() => t.disabled),
        options: a,
        searchQuery: i,
        activeOptionIndex: l,
        closeListbox() {
          t.disabled || (o.value !== 1 && ((o.value = 1), (l.value = null)));
        },
        openListbox() {
          t.disabled || (o.value !== 0 && (o.value = 0));
        },
        goToOption(f, b) {
          if (t.disabled || o.value === 1) return;
          let m = J(f === 4 ? { focus: 4, id: b } : { focus: f }, {
            resolveItems: () => a.value,
            resolveActiveIndex: () => l.value,
            resolveId: (g) => g.id,
            resolveDisabled: (g) => g.dataRef.disabled,
          });
          (i.value === "" && l.value === m) || ((i.value = ""), (l.value = m));
        },
        search(f) {
          if (t.disabled || o.value === 1) return;
          let m = i.value !== "" ? 0 : 1;
          i.value += f.toLowerCase();
          let S = (
              l.value !== null
                ? a.value
                    .slice(l.value + m)
                    .concat(a.value.slice(0, l.value + m))
                : a.value
            ).find(
              (R) =>
                R.dataRef.textValue.startsWith(i.value) && !R.dataRef.disabled
            ),
            y = S ? a.value.indexOf(S) : -1;
          y === -1 || y === l.value || (l.value = y);
        },
        clearSearch() {
          t.disabled || (o.value !== 1 && i.value !== "" && (i.value = ""));
        },
        registerOption(f, b) {
          var g, S;
          let m = Array.from(
            (S =
              (g = d.value) == null
                ? void 0
                : g.querySelectorAll('[id^="headlessui-listbox-option-"]')) !=
              null
              ? S
              : []
          ).reduce((y, R, E) => Object.assign(y, { [R.id]: E }), {});
          a.value = [...a.value, { id: f, dataRef: b }].sort(
            (y, R) => m[y.id] - m[R.id]
          );
        },
        unregisterOption(f) {
          let b = a.value.slice(),
            m = l.value !== null ? b[l.value] : null,
            g = b.findIndex((S) => S.id === f);
          g !== -1 && b.splice(g, 1),
            (a.value = b),
            (l.value = (() =>
              g === l.value || m === null ? null : b.indexOf(m))());
        },
        select(f) {
          t.disabled || e("update:modelValue", f);
        },
      };
    return (
      C("mousedown", (f) => {
        var g, S, y;
        let b = f.target,
          m = document.activeElement;
        o.value === 0 &&
          (((g = v(s)) == null ? void 0 : g.contains(b)) ||
            (((S = v(d)) == null ? void 0 : S.contains(b)) || p2.closeListbox(),
            !(m !== document.body && (m == null ? void 0 : m.contains(b))) &&
              (f.defaultPrevented ||
                (y = v(s)) == null ||
                y.focus({ preventScroll: true }))));
      }),
      provide$1(Kt, p2),
      M(computed(() => T(o.value, { [0]: 0, [1]: 1 }))),
      () => {
        let f = { open: o.value === 0, disabled: t.disabled };
        return x({
          props: L(t, [
            "modelValue",
            "onUpdate:modelValue",
            "disabled",
            "horizontal",
          ]),
          slot: f,
          slots: n,
          attrs: u,
          name: "Listbox",
        });
      }
    );
  },
});
defineComponent({
  name: "ListboxLabel",
  props: { as: { type: [Object, String], default: "label" } },
  setup(t, { attrs: n, slots: u }) {
    let e = pe("ListboxLabel"),
      o = `headlessui-listbox-label-${h()}`;
    function r() {
      var s;
      (s = v(e.buttonRef)) == null || s.focus({ preventScroll: true });
    }
    return () => {
      let s = { open: e.listboxState.value === 0, disabled: e.disabled.value },
        d = { id: o, ref: e.labelRef, onClick: r };
      return x({
        props: __spreadValues(__spreadValues({}, t), d),
        slot: s,
        attrs: n,
        slots: u,
        name: "ListboxLabel",
      });
    };
  },
});
defineComponent({
  name: "ListboxButton",
  props: { as: { type: [Object, String], default: "button" } },
  setup(t, { attrs: n, slots: u }) {
    let e = pe("ListboxButton"),
      o = `headlessui-listbox-button-${h()}`;
    function r(i) {
      switch (i.key) {
        case " ":
        case "Enter":
        case "ArrowDown":
          i.preventDefault(),
            e.openListbox(),
            nextTick(() => {
              var l;
              (l = v(e.optionsRef)) == null || l.focus({ preventScroll: true }),
                e.value.value || e.goToOption(0);
            });
          break;
        case "ArrowUp":
          i.preventDefault(),
            e.openListbox(),
            nextTick(() => {
              var l;
              (l = v(e.optionsRef)) == null || l.focus({ preventScroll: true }),
                e.value.value || e.goToOption(3);
            });
          break;
      }
    }
    function s(i) {
      switch (i.key) {
        case " ":
          i.preventDefault();
          break;
      }
    }
    function d(i) {
      e.disabled.value ||
        (e.listboxState.value === 0
          ? (e.closeListbox(),
            nextTick(() => {
              var l;
              return (l = v(e.buttonRef)) == null
                ? void 0
                : l.focus({ preventScroll: true });
            }))
          : (i.preventDefault(),
            e.openListbox(),
            gn(() => {
              var l;
              return (l = v(e.optionsRef)) == null
                ? void 0
                : l.focus({ preventScroll: true });
            })));
    }
    let a = P(
      computed(() => ({ as: t.as, type: n.type })),
      e.buttonRef
    );
    return () => {
      var c, p2;
      let i = { open: e.listboxState.value === 0, disabled: e.disabled.value },
        l = {
          ref: e.buttonRef,
          id: o,
          type: a.value,
          "aria-haspopup": true,
          "aria-controls": (c = v(e.optionsRef)) == null ? void 0 : c.id,
          "aria-expanded": e.disabled.value
            ? void 0
            : e.listboxState.value === 0,
          "aria-labelledby": e.labelRef.value
            ? [(p2 = v(e.labelRef)) == null ? void 0 : p2.id, o].join(" ")
            : void 0,
          disabled: e.disabled.value === true ? true : void 0,
          onKeydown: r,
          onKeyup: s,
          onClick: d,
        };
      return x({
        props: __spreadValues(__spreadValues({}, t), l),
        slot: i,
        attrs: n,
        slots: u,
        name: "ListboxButton",
      });
    };
  },
});
defineComponent({
  name: "ListboxOptions",
  props: {
    as: { type: [Object, String], default: "ul" },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
  },
  setup(t, { attrs: n, slots: u }) {
    let e = pe("ListboxOptions"),
      o = `headlessui-listbox-options-${h()}`,
      r = ref(null);
    function s(i) {
      switch ((r.value && clearTimeout(r.value), i.key)) {
        case " ":
          if (e.searchQuery.value !== "")
            return i.preventDefault(), i.stopPropagation(), e.search(i.key);
        case "Enter":
          if (
            (i.preventDefault(),
            i.stopPropagation(),
            e.activeOptionIndex.value !== null)
          ) {
            let { dataRef: l } = e.options.value[e.activeOptionIndex.value];
            e.select(l.value);
          }
          e.closeListbox(),
            nextTick(() => {
              var l;
              return (l = v(e.buttonRef)) == null
                ? void 0
                : l.focus({ preventScroll: true });
            });
          break;
        case T(e.orientation.value, {
          vertical: "ArrowDown",
          horizontal: "ArrowRight",
        }):
          return i.preventDefault(), i.stopPropagation(), e.goToOption(2);
        case T(e.orientation.value, {
          vertical: "ArrowUp",
          horizontal: "ArrowLeft",
        }):
          return i.preventDefault(), i.stopPropagation(), e.goToOption(1);
        case "Home":
        case "PageUp":
          return i.preventDefault(), i.stopPropagation(), e.goToOption(0);
        case "End":
        case "PageDown":
          return i.preventDefault(), i.stopPropagation(), e.goToOption(3);
        case "Escape":
          i.preventDefault(),
            i.stopPropagation(),
            e.closeListbox(),
            nextTick(() => {
              var l;
              return (l = v(e.buttonRef)) == null
                ? void 0
                : l.focus({ preventScroll: true });
            });
          break;
        case "Tab":
          i.preventDefault(), i.stopPropagation();
          break;
        default:
          i.key.length === 1 &&
            (e.search(i.key),
            (r.value = setTimeout(() => e.clearSearch(), 350)));
          break;
      }
    }
    let d = I(),
      a = computed(() =>
        d !== null ? d.value === 0 : e.listboxState.value === 0
      );
    return () => {
      var p2, f, b, m;
      let i = { open: e.listboxState.value === 0 },
        l = {
          "aria-activedescendant":
            e.activeOptionIndex.value === null ||
            (p2 = e.options.value[e.activeOptionIndex.value]) == null
              ? void 0
              : p2.id,
          "aria-labelledby":
            (m = (f = v(e.labelRef)) == null ? void 0 : f.id) != null
              ? m
              : (b = v(e.buttonRef)) == null
              ? void 0
              : b.id,
          "aria-orientation": e.orientation.value,
          id: o,
          onKeydown: s,
          role: "listbox",
          tabIndex: 0,
          ref: e.optionsRef,
        };
      return x({
        props: __spreadValues(__spreadValues({}, t), l),
        slot: i,
        attrs: n,
        slots: u,
        features: 1 | 2,
        visible: a.value,
        name: "ListboxOptions",
      });
    };
  },
});
defineComponent({
  name: "ListboxOption",
  props: {
    as: { type: [Object, String], default: "li" },
    value: { type: [Object, String, Number, Boolean] },
    disabled: { type: Boolean, default: false },
  },
  setup(t, { slots: n, attrs: u }) {
    let e = pe("ListboxOption"),
      o = `headlessui-listbox-option-${h()}`,
      r = computed(() =>
        e.activeOptionIndex.value !== null
          ? e.options.value[e.activeOptionIndex.value].id === o
          : false
      ),
      s = computed(() => toRaw(e.value.value) === toRaw(t.value)),
      d = ref({ disabled: t.disabled, value: t.value, textValue: "" });
    onMounted(() => {
      var f, b;
      let p2 =
        (b =
          (f = document.getElementById(o)) == null ? void 0 : f.textContent) ==
        null
          ? void 0
          : b.toLowerCase().trim();
      p2 !== void 0 && (d.value.textValue = p2);
    }),
      onMounted(() => e.registerOption(o, d)),
      onUnmounted(() => e.unregisterOption(o)),
      onMounted(() => {
        watch(
          [e.listboxState, s],
          () => {
            var p2, f;
            e.listboxState.value === 0 &&
              (!s.value ||
                (e.goToOption(4, o),
                (f =
                  (p2 = document.getElementById(o)) == null
                    ? void 0
                    : p2.focus) == null || f.call(p2)));
          },
          { immediate: true }
        );
      }),
      watchEffect(() => {
        e.listboxState.value === 0 &&
          (!r.value ||
            nextTick(() => {
              var p2, f;
              return (f =
                (p2 = document.getElementById(o)) == null
                  ? void 0
                  : p2.scrollIntoView) == null
                ? void 0
                : f.call(p2, { block: "nearest" });
            }));
      });
    function a(p2) {
      if (t.disabled) return p2.preventDefault();
      e.select(t.value),
        e.closeListbox(),
        nextTick(() => {
          var f;
          return (f = v(e.buttonRef)) == null
            ? void 0
            : f.focus({ preventScroll: true });
        });
    }
    function i() {
      if (t.disabled) return e.goToOption(5);
      e.goToOption(4, o);
    }
    function l() {
      t.disabled || r.value || e.goToOption(4, o);
    }
    function c() {
      t.disabled || !r.value || e.goToOption(5);
    }
    return () => {
      let { disabled: p2 } = t,
        f = { active: r.value, selected: s.value, disabled: p2 },
        b = {
          id: o,
          role: "option",
          tabIndex: p2 === true ? void 0 : -1,
          "aria-disabled": p2 === true ? true : void 0,
          "aria-selected": s.value === true ? s.value : void 0,
          disabled: void 0,
          onClick: a,
          onFocus: i,
          onPointermove: l,
          onMousemove: l,
          onPointerleave: c,
          onMouseleave: c,
        };
      return x({
        props: __spreadValues(__spreadValues({}, t), b),
        slot: f,
        attrs: u,
        slots: n,
        name: "ListboxOption",
      });
    };
  },
});
function Rn(t) {
  requestAnimationFrame(() => requestAnimationFrame(t));
}
var Nt = Symbol("MenuContext");
function De(t) {
  let n = inject(Nt, null);
  if (n === null) {
    let u = new Error(`<${t} /> is missing a parent <Menu /> component.`);
    throw (Error.captureStackTrace && Error.captureStackTrace(u, De), u);
  }
  return n;
}
defineComponent({
  name: "Menu",
  props: { as: { type: [Object, String], default: "template" } },
  setup(t, { slots: n, attrs: u }) {
    let e = ref(1),
      o = ref(null),
      r = ref(null),
      s = ref([]),
      d = ref(""),
      a = ref(null),
      i = {
        menuState: e,
        buttonRef: o,
        itemsRef: r,
        items: s,
        searchQuery: d,
        activeItemIndex: a,
        closeMenu: () => {
          (e.value = 1), (a.value = null);
        },
        openMenu: () => (e.value = 0),
        goToItem(l, c) {
          let p2 = J(l === 4 ? { focus: 4, id: c } : { focus: l }, {
            resolveItems: () => s.value,
            resolveActiveIndex: () => a.value,
            resolveId: (f) => f.id,
            resolveDisabled: (f) => f.dataRef.disabled,
          });
          (d.value === "" && a.value === p2) ||
            ((d.value = ""), (a.value = p2));
        },
        search(l) {
          let p2 = d.value !== "" ? 0 : 1;
          d.value += l.toLowerCase();
          let b = (
              a.value !== null
                ? s.value
                    .slice(a.value + p2)
                    .concat(s.value.slice(0, a.value + p2))
                : s.value
            ).find(
              (g) =>
                g.dataRef.textValue.startsWith(d.value) && !g.dataRef.disabled
            ),
            m = b ? s.value.indexOf(b) : -1;
          m === -1 || m === a.value || (a.value = m);
        },
        clearSearch() {
          d.value = "";
        },
        registerItem(l, c) {
          var f, b;
          let p2 = Array.from(
            (b =
              (f = r.value) == null
                ? void 0
                : f.querySelectorAll('[id^="headlessui-menu-item-"]')) != null
              ? b
              : []
          ).reduce((m, g, S) => Object.assign(m, { [g.id]: S }), {});
          s.value = [...s.value, { id: l, dataRef: c }].sort(
            (m, g) => p2[m.id] - p2[g.id]
          );
        },
        unregisterItem(l) {
          let c = s.value.slice(),
            p2 = a.value !== null ? c[a.value] : null,
            f = c.findIndex((b) => b.id === l);
          f !== -1 && c.splice(f, 1),
            (s.value = c),
            (a.value = (() =>
              f === a.value || p2 === null ? null : c.indexOf(p2))());
        },
      };
    return (
      C("mousedown", (l) => {
        var f, b, m;
        let c = l.target,
          p2 = document.activeElement;
        e.value === 0 &&
          (((f = v(o)) == null ? void 0 : f.contains(c)) ||
            (((b = v(r)) == null ? void 0 : b.contains(c)) || i.closeMenu(),
            !(p2 !== document.body && (p2 == null ? void 0 : p2.contains(c))) &&
              (l.defaultPrevented ||
                (m = v(o)) == null ||
                m.focus({ preventScroll: true }))));
      }),
      provide$1(Nt, i),
      M(computed(() => T(e.value, { [0]: 0, [1]: 1 }))),
      () => {
        let l = { open: e.value === 0 };
        return x({ props: t, slot: l, slots: n, attrs: u, name: "Menu" });
      }
    );
  },
});
defineComponent({
  name: "MenuButton",
  props: {
    disabled: { type: Boolean, default: false },
    as: { type: [Object, String], default: "button" },
  },
  setup(t, { attrs: n, slots: u }) {
    let e = De("MenuButton"),
      o = `headlessui-menu-button-${h()}`;
    function r(i) {
      switch (i.key) {
        case " ":
        case "Enter":
        case "ArrowDown":
          i.preventDefault(),
            i.stopPropagation(),
            e.openMenu(),
            nextTick(() => {
              var l;
              (l = v(e.itemsRef)) == null || l.focus({ preventScroll: true }),
                e.goToItem(0);
            });
          break;
        case "ArrowUp":
          i.preventDefault(),
            i.stopPropagation(),
            e.openMenu(),
            nextTick(() => {
              var l;
              (l = v(e.itemsRef)) == null || l.focus({ preventScroll: true }),
                e.goToItem(3);
            });
          break;
      }
    }
    function s(i) {
      switch (i.key) {
        case " ":
          i.preventDefault();
          break;
      }
    }
    function d(i) {
      t.disabled ||
        (e.menuState.value === 0
          ? (e.closeMenu(),
            nextTick(() => {
              var l;
              return (l = v(e.buttonRef)) == null
                ? void 0
                : l.focus({ preventScroll: true });
            }))
          : (i.preventDefault(),
            i.stopPropagation(),
            e.openMenu(),
            Rn(() => {
              var l;
              return (l = v(e.itemsRef)) == null
                ? void 0
                : l.focus({ preventScroll: true });
            })));
    }
    let a = P(
      computed(() => ({ as: t.as, type: n.type })),
      e.buttonRef
    );
    return () => {
      var c;
      let i = { open: e.menuState.value === 0 },
        l = {
          ref: e.buttonRef,
          id: o,
          type: a.value,
          "aria-haspopup": true,
          "aria-controls": (c = v(e.itemsRef)) == null ? void 0 : c.id,
          "aria-expanded": t.disabled ? void 0 : e.menuState.value === 0,
          onKeydown: r,
          onKeyup: s,
          onClick: d,
        };
      return x({
        props: __spreadValues(__spreadValues({}, t), l),
        slot: i,
        attrs: n,
        slots: u,
        name: "MenuButton",
      });
    };
  },
});
defineComponent({
  name: "MenuItems",
  props: {
    as: { type: [Object, String], default: "div" },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
  },
  setup(t, { attrs: n, slots: u }) {
    let e = De("MenuItems"),
      o = `headlessui-menu-items-${h()}`,
      r = ref(null);
    Y({
      container: computed(() => v(e.itemsRef)),
      enabled: computed(() => e.menuState.value === 0),
      accept(l) {
        return l.getAttribute("role") === "menuitem"
          ? NodeFilter.FILTER_REJECT
          : l.hasAttribute("role")
          ? NodeFilter.FILTER_SKIP
          : NodeFilter.FILTER_ACCEPT;
      },
      walk(l) {
        l.setAttribute("role", "none");
      },
    });
    function s(l) {
      var c;
      switch ((r.value && clearTimeout(r.value), l.key)) {
        case " ":
          if (e.searchQuery.value !== "")
            return l.preventDefault(), l.stopPropagation(), e.search(l.key);
        case "Enter":
          if (
            (l.preventDefault(),
            l.stopPropagation(),
            e.activeItemIndex.value !== null)
          ) {
            let { id: p2 } = e.items.value[e.activeItemIndex.value];
            (c = document.getElementById(p2)) == null || c.click();
          }
          e.closeMenu(),
            nextTick(() => {
              var p2;
              return (p2 = v(e.buttonRef)) == null
                ? void 0
                : p2.focus({ preventScroll: true });
            });
          break;
        case "ArrowDown":
          return l.preventDefault(), l.stopPropagation(), e.goToItem(2);
        case "ArrowUp":
          return l.preventDefault(), l.stopPropagation(), e.goToItem(1);
        case "Home":
        case "PageUp":
          return l.preventDefault(), l.stopPropagation(), e.goToItem(0);
        case "End":
        case "PageDown":
          return l.preventDefault(), l.stopPropagation(), e.goToItem(3);
        case "Escape":
          l.preventDefault(),
            l.stopPropagation(),
            e.closeMenu(),
            nextTick(() => {
              var p2;
              return (p2 = v(e.buttonRef)) == null
                ? void 0
                : p2.focus({ preventScroll: true });
            });
          break;
        case "Tab":
          l.preventDefault(), l.stopPropagation();
          break;
        default:
          l.key.length === 1 &&
            (e.search(l.key),
            (r.value = setTimeout(() => e.clearSearch(), 350)));
          break;
      }
    }
    function d(l) {
      switch (l.key) {
        case " ":
          l.preventDefault();
          break;
      }
    }
    let a = I(),
      i = computed(() =>
        a !== null ? a.value === 0 : e.menuState.value === 0
      );
    return () => {
      var f, b;
      let l = { open: e.menuState.value === 0 },
        c = {
          "aria-activedescendant":
            e.activeItemIndex.value === null ||
            (f = e.items.value[e.activeItemIndex.value]) == null
              ? void 0
              : f.id,
          "aria-labelledby": (b = v(e.buttonRef)) == null ? void 0 : b.id,
          id: o,
          onKeydown: s,
          onKeyup: d,
          role: "menu",
          tabIndex: 0,
          ref: e.itemsRef,
        };
      return x({
        props: __spreadValues(__spreadValues({}, t), c),
        slot: l,
        attrs: n,
        slots: u,
        features: 1 | 2,
        visible: i.value,
        name: "MenuItems",
      });
    };
  },
});
defineComponent({
  name: "MenuItem",
  props: {
    as: { type: [Object, String], default: "template" },
    disabled: { type: Boolean, default: false },
  },
  setup(t, { slots: n, attrs: u }) {
    let e = De("MenuItem"),
      o = `headlessui-menu-item-${h()}`,
      r = computed(() =>
        e.activeItemIndex.value !== null
          ? e.items.value[e.activeItemIndex.value].id === o
          : false
      ),
      s = ref({ disabled: t.disabled, textValue: "" });
    onMounted(() => {
      var p2, f;
      let c =
        (f =
          (p2 = document.getElementById(o)) == null
            ? void 0
            : p2.textContent) == null
          ? void 0
          : f.toLowerCase().trim();
      c !== void 0 && (s.value.textValue = c);
    }),
      onMounted(() => e.registerItem(o, s)),
      onUnmounted(() => e.unregisterItem(o)),
      watchEffect(() => {
        e.menuState.value === 0 &&
          (!r.value ||
            nextTick(() => {
              var c, p2;
              return (p2 =
                (c = document.getElementById(o)) == null
                  ? void 0
                  : c.scrollIntoView) == null
                ? void 0
                : p2.call(c, { block: "nearest" });
            }));
      });
    function d(c) {
      if (t.disabled) return c.preventDefault();
      e.closeMenu(),
        nextTick(() => {
          var p2;
          return (p2 = v(e.buttonRef)) == null
            ? void 0
            : p2.focus({ preventScroll: true });
        });
    }
    function a() {
      if (t.disabled) return e.goToItem(5);
      e.goToItem(4, o);
    }
    function i() {
      t.disabled || r.value || e.goToItem(4, o);
    }
    function l() {
      t.disabled || !r.value || e.goToItem(5);
    }
    return () => {
      let { disabled: c } = t,
        p2 = { active: r.value, disabled: c };
      return x({
        props: __spreadValues(__spreadValues({}, t), {
          id: o,
          role: "menuitem",
          tabIndex: c === true ? void 0 : -1,
          "aria-disabled": c === true ? true : void 0,
          onClick: d,
          onFocus: a,
          onPointermove: i,
          onMousemove: i,
          onPointerleave: l,
          onMouseleave: l,
        }),
        slot: p2,
        attrs: u,
        slots: n,
        name: "MenuItem",
      });
    };
  },
});
var Wt = Symbol("PopoverContext");
function Le(t) {
  let n = inject(Wt, null);
  if (n === null) {
    let u = new Error(`<${t} /> is missing a parent <${Cn.name} /> component.`);
    throw (Error.captureStackTrace && Error.captureStackTrace(u, Le), u);
  }
  return n;
}
var Ut = Symbol("PopoverGroupContext");
function $t() {
  return inject(Ut, null);
}
var Gt = Symbol("PopoverPanelContext");
function On() {
  return inject(Gt, null);
}
var Cn = defineComponent({
  name: "Popover",
  props: { as: { type: [Object, String], default: "div" } },
  setup(t, { slots: n, attrs: u }) {
    let e = `headlessui-popover-button-${h()}`,
      o = `headlessui-popover-panel-${h()}`,
      r = ref(1),
      s = ref(null),
      d = ref(null),
      a = {
        popoverState: r,
        buttonId: e,
        panelId: o,
        panel: d,
        button: s,
        togglePopover() {
          r.value = T(r.value, { [0]: 1, [1]: 0 });
        },
        closePopover() {
          r.value !== 1 && (r.value = 1);
        },
        close(f) {
          a.closePopover();
          let b = (() =>
            f
              ? f instanceof HTMLElement
                ? f
                : f.value instanceof HTMLElement
                ? v(f)
                : v(a.button)
              : v(a.button))();
          b == null || b.focus();
        },
      };
    provide$1(Wt, a), M(computed(() => T(r.value, { [0]: 0, [1]: 1 })));
    let i = {
        buttonId: e,
        panelId: o,
        close() {
          a.closePopover();
        },
      },
      l = $t(),
      c = l == null ? void 0 : l.registerPopover;
    function p2() {
      var f, b, m;
      return (m = l == null ? void 0 : l.isFocusWithinPopoverGroup()) != null
        ? m
        : ((f = v(s)) == null ? void 0 : f.contains(document.activeElement)) ||
            ((b = v(d)) == null ? void 0 : b.contains(document.activeElement));
    }
    return (
      watchEffect(() => (c == null ? void 0 : c(i))),
      C(
        "focus",
        () => {
          r.value === 0 && (p2() || !s || !d || a.closePopover());
        },
        true
      ),
      C("mousedown", (f) => {
        var m, g, S;
        let b = f.target;
        r.value === 0 &&
          (((m = v(s)) == null ? void 0 : m.contains(b)) ||
            ((g = v(d)) == null ? void 0 : g.contains(b)) ||
            (a.closePopover(),
            mt(b, 1) || (f.preventDefault(), (S = v(s)) == null || S.focus())));
      }),
      () => {
        let f = { open: r.value === 0, close: a.close };
        return x({ props: t, slot: f, slots: n, attrs: u, name: "Popover" });
      }
    );
  },
});
defineComponent({
  name: "PopoverButton",
  props: {
    as: { type: [Object, String], default: "button" },
    disabled: { type: [Boolean], default: false },
  },
  setup(t, { attrs: n, slots: u }) {
    let e = Le("PopoverButton"),
      o = $t(),
      r = o == null ? void 0 : o.closeOthers,
      s = On(),
      d = s === null ? false : s === e.panelId,
      a = ref(null),
      i = ref(typeof window == "undefined" ? null : document.activeElement);
    C(
      "focus",
      () => {
        (i.value = a.value), (a.value = document.activeElement);
      },
      true
    );
    let l = ref(null);
    d ||
      watchEffect(() => {
        e.button.value = l.value;
      });
    let c = P(
      computed(() => ({ as: t.as, type: n.type })),
      l
    );
    function p2(m) {
      var g, S, y, R;
      if (d) {
        if (e.popoverState.value === 1) return;
        switch (m.key) {
          case " ":
          case "Enter":
            m.preventDefault(),
              m.stopPropagation(),
              e.closePopover(),
              (g = v(e.button)) == null || g.focus();
            break;
        }
      } else
        switch (m.key) {
          case " ":
          case "Enter":
            m.preventDefault(),
              m.stopPropagation(),
              e.popoverState.value === 1 && (r == null || r(e.buttonId)),
              e.togglePopover();
            break;
          case "Escape":
            if (e.popoverState.value !== 0)
              return r == null ? void 0 : r(e.buttonId);
            if (
              !v(e.button) ||
              !((S = v(e.button)) == null
                ? void 0
                : S.contains(document.activeElement))
            )
              return;
            m.preventDefault(), m.stopPropagation(), e.closePopover();
            break;
          case "Tab":
            if (e.popoverState.value !== 0 || !e.panel || !e.button) return;
            if (m.shiftKey) {
              if (
                !i.value ||
                ((y = v(e.button)) == null ? void 0 : y.contains(i.value)) ||
                ((R = v(e.panel)) == null ? void 0 : R.contains(i.value))
              )
                return;
              let E = ae(),
                D = E.indexOf(i.value);
              if (E.indexOf(v(e.button)) > D) return;
              m.preventDefault(), m.stopPropagation(), O(v(e.panel), 8);
            } else m.preventDefault(), m.stopPropagation(), O(v(e.panel), 1);
            break;
        }
    }
    function f(m) {
      var g, S;
      if (
        !d &&
        (m.key === " " && m.preventDefault(),
        e.popoverState.value === 0 && !!e.panel && !!e.button)
      )
        switch (m.key) {
          case "Tab":
            if (
              !i.value ||
              ((g = v(e.button)) == null ? void 0 : g.contains(i.value)) ||
              ((S = v(e.panel)) == null ? void 0 : S.contains(i.value))
            )
              return;
            let y = ae(),
              R = y.indexOf(i.value);
            if (y.indexOf(v(e.button)) > R) return;
            m.preventDefault(), m.stopPropagation(), O(v(e.panel), 8);
            break;
        }
    }
    function b() {
      var m, g;
      t.disabled ||
        (d
          ? (e.closePopover(), (m = v(e.button)) == null || m.focus())
          : (e.popoverState.value === 1 && (r == null || r(e.buttonId)),
            (g = v(e.button)) == null || g.focus(),
            e.togglePopover()));
    }
    return () => {
      let m = { open: e.popoverState.value === 0 },
        g = d
          ? { ref: l, type: c.value, onKeydown: p2, onClick: b }
          : {
              ref: l,
              id: e.buttonId,
              type: c.value,
              "aria-expanded": t.disabled ? void 0 : e.popoverState.value === 0,
              "aria-controls": v(e.panel) ? e.panelId : void 0,
              disabled: t.disabled ? true : void 0,
              onKeydown: p2,
              onKeyup: f,
              onClick: b,
            };
      return x({
        props: __spreadValues(__spreadValues({}, t), g),
        slot: m,
        attrs: n,
        slots: u,
        name: "PopoverButton",
      });
    };
  },
});
defineComponent({
  name: "PopoverOverlay",
  props: {
    as: { type: [Object, String], default: "div" },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
  },
  setup(t, { attrs: n, slots: u }) {
    let e = Le("PopoverOverlay"),
      o = `headlessui-popover-overlay-${h()}`,
      r = I(),
      s = computed(() =>
        r !== null ? r.value === 0 : e.popoverState.value === 0
      );
    function d() {
      e.closePopover();
    }
    return () => {
      let a = { open: e.popoverState.value === 0 };
      return x({
        props: __spreadValues(__spreadValues({}, t), {
          id: o,
          "aria-hidden": true,
          onClick: d,
        }),
        slot: a,
        attrs: n,
        slots: u,
        features: 1 | 2,
        visible: s.value,
        name: "PopoverOverlay",
      });
    };
  },
});
defineComponent({
  name: "PopoverPanel",
  props: {
    as: { type: [Object, String], default: "div" },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
    focus: { type: Boolean, default: false },
  },
  setup(t, { attrs: n, slots: u }) {
    let { focus: e } = t,
      o = Le("PopoverPanel");
    provide$1(Gt, o.panelId),
      onUnmounted(() => {
        o.panel.value = null;
      }),
      watchEffect(() => {
        var i;
        if (!e || o.popoverState.value !== 0 || !o.panel) return;
        let a = document.activeElement;
        ((i = v(o.panel)) == null ? void 0 : i.contains(a)) || O(v(o.panel), 1);
      }),
      C("keydown", (a) => {
        var l, c;
        if (
          o.popoverState.value !== 0 ||
          !v(o.panel) ||
          a.key !== "Tab" ||
          !document.activeElement ||
          !((l = v(o.panel)) == null
            ? void 0
            : l.contains(document.activeElement))
        )
          return;
        a.preventDefault();
        let i = O(v(o.panel), a.shiftKey ? 2 : 4);
        if (i === 3) return (c = v(o.button)) == null ? void 0 : c.focus();
        if (i === 1) {
          if (!v(o.button)) return;
          let p2 = ae(),
            f = p2.indexOf(v(o.button)),
            b = p2.splice(f + 1).filter((m) => {
              var g;
              return !((g = v(o.panel)) == null ? void 0 : g.contains(m));
            });
          O(b, 1) === 0 && O(document.body, 1);
        }
      }),
      C(
        "focus",
        () => {
          var a;
          !e ||
            (o.popoverState.value === 0 &&
              (!v(o.panel) ||
                ((a = v(o.panel)) == null
                  ? void 0
                  : a.contains(document.activeElement)) ||
                o.closePopover()));
        },
        true
      );
    let r = I(),
      s = computed(() =>
        r !== null ? r.value === 0 : o.popoverState.value === 0
      );
    function d(a) {
      var i, l;
      switch (a.key) {
        case "Escape":
          if (
            o.popoverState.value !== 0 ||
            !v(o.panel) ||
            !((i = v(o.panel)) == null
              ? void 0
              : i.contains(document.activeElement))
          )
            return;
          a.preventDefault(),
            a.stopPropagation(),
            o.closePopover(),
            (l = v(o.button)) == null || l.focus();
          break;
      }
    }
    return () => {
      let a = { open: o.popoverState.value === 0, close: o.close },
        i = { ref: o.panel, id: o.panelId, onKeydown: d };
      return x({
        props: __spreadValues(__spreadValues({}, t), i),
        slot: a,
        attrs: n,
        slots: u,
        features: 1 | 2,
        visible: s.value,
        name: "PopoverPanel",
      });
    };
  },
});
defineComponent({
  name: "PopoverGroup",
  props: { as: { type: [Object, String], default: "div" } },
  setup(t, { attrs: n, slots: u }) {
    let e = ref(null),
      o = ref([]);
    function r(i) {
      let l = o.value.indexOf(i);
      l !== -1 && o.value.splice(l, 1);
    }
    function s(i) {
      return (
        o.value.push(i),
        () => {
          r(i);
        }
      );
    }
    function d() {
      var l;
      let i = document.activeElement;
      return ((l = v(e)) == null ? void 0 : l.contains(i))
        ? true
        : o.value.some((c) => {
            var p2, f;
            return (
              ((p2 = document.getElementById(c.buttonId)) == null
                ? void 0
                : p2.contains(i)) ||
              ((f = document.getElementById(c.panelId)) == null
                ? void 0
                : f.contains(i))
            );
          });
    }
    function a(i) {
      for (let l of o.value) l.buttonId !== i && l.close();
    }
    return (
      provide$1(Ut, {
        registerPopover: s,
        unregisterPopover: r,
        isFocusWithinPopoverGroup: d,
        closeOthers: a,
      }),
      () =>
        x({
          props: __spreadValues(__spreadValues({}, t), { ref: e }),
          slot: {},
          attrs: n,
          slots: u,
          name: "PopoverGroup",
        })
    );
  },
});
var _t = Symbol("LabelContext");
function qt() {
  let t = inject(_t, null);
  if (t === null) {
    let n = new Error(
      "You used a <Label /> component, but it is not inside a parent."
    );
    throw (Error.captureStackTrace && Error.captureStackTrace(n, qt), n);
  }
  return t;
}
function fe({ slot: t = {}, name: n = "Label", props: u = {} } = {}) {
  let e = ref([]);
  function o(r) {
    return (
      e.value.push(r),
      () => {
        let s = e.value.indexOf(r);
        s !== -1 && e.value.splice(s, 1);
      }
    );
  }
  return (
    provide$1(_t, { register: o, slot: t, name: n, props: u }),
    computed(() => (e.value.length > 0 ? e.value.join(" ") : void 0))
  );
}
var Me = defineComponent({
  name: "Label",
  props: {
    as: { type: [Object, String], default: "label" },
    passive: { type: [Boolean], default: false },
  },
  setup(t, { slots: n, attrs: u }) {
    let e = qt(),
      o = `headlessui-label-${h()}`;
    return (
      onMounted(() => onUnmounted(e.register(o))),
      () => {
        let { name: r = "Label", slot: s = {}, props: d = {} } = e,
          _a2 = t,
          { passive: a } = _a2,
          i = __objRest(_a2, ["passive"]),
          l = __spreadProps(
            __spreadValues(
              {},
              Object.entries(d).reduce(
                (p2, [f, b]) => Object.assign(p2, { [f]: unref(b) }),
                {}
              )
            ),
            { id: o }
          ),
          c = __spreadValues(__spreadValues({}, i), l);
        return (
          a && delete c.onClick,
          x({ props: c, slot: s, attrs: u, slots: n, name: r })
        );
      }
    );
  },
});
var Qt = Symbol("RadioGroupContext");
function Jt(t) {
  let n = inject(Qt, null);
  if (n === null) {
    let u = new Error(`<${t} /> is missing a parent <RadioGroup /> component.`);
    throw (Error.captureStackTrace && Error.captureStackTrace(u, Jt), u);
  }
  return n;
}
var wi = defineComponent({
  name: "RadioGroup",
  emits: { "update:modelValue": (t) => true },
  props: {
    as: { type: [Object, String], default: "div" },
    disabled: { type: [Boolean], default: false },
    modelValue: { type: [Object, String, Number, Boolean] },
  },
  setup(t, { emit: n, attrs: u, slots: e }) {
    let o = ref(null),
      r = ref([]),
      s = fe({ name: "RadioGroupLabel" }),
      d = G({ name: "RadioGroupDescription" }),
      a = computed(() => t.modelValue),
      i = {
        options: r,
        value: a,
        disabled: computed(() => t.disabled),
        firstOption: computed(() =>
          r.value.find((p2) => !p2.propsRef.disabled)
        ),
        containsCheckedOption: computed(() =>
          r.value.some((p2) => toRaw(p2.propsRef.value) === toRaw(t.modelValue))
        ),
        change(p2) {
          var b;
          if (t.disabled || a.value === p2) return false;
          let f =
            (b = r.value.find((m) => toRaw(m.propsRef.value) === toRaw(p2))) ==
            null
              ? void 0
              : b.propsRef;
          return (f == null ? void 0 : f.disabled)
            ? false
            : (n("update:modelValue", p2), true);
        },
        registerOption(p2) {
          var b;
          let f = Array.from(
            (b = o.value) == null
              ? void 0
              : b.querySelectorAll('[id^="headlessui-radiogroup-option-"]')
          ).reduce((m, g, S) => Object.assign(m, { [g.id]: S }), {});
          r.value.push(p2), r.value.sort((m, g) => f[m.id] - f[g.id]);
        },
        unregisterOption(p2) {
          let f = r.value.findIndex((b) => b.id === p2);
          f !== -1 && r.value.splice(f, 1);
        },
      };
    provide$1(Qt, i),
      Y({
        container: computed(() => v(o)),
        accept(p2) {
          return p2.getAttribute("role") === "radio"
            ? NodeFilter.FILTER_REJECT
            : p2.hasAttribute("role")
            ? NodeFilter.FILTER_SKIP
            : NodeFilter.FILTER_ACCEPT;
        },
        walk(p2) {
          p2.setAttribute("role", "none");
        },
      });
    function l(p2) {
      if (!o.value || !o.value.contains(p2.target)) return;
      let f = r.value
        .filter((b) => b.propsRef.disabled === false)
        .map((b) => b.element);
      switch (p2.key) {
        case "ArrowLeft":
        case "ArrowUp":
          if ((p2.preventDefault(), p2.stopPropagation(), O(f, 2 | 16) === 2)) {
            let m = r.value.find((g) => g.element === document.activeElement);
            m && i.change(m.propsRef.value);
          }
          break;
        case "ArrowRight":
        case "ArrowDown":
          if ((p2.preventDefault(), p2.stopPropagation(), O(f, 4 | 16) === 2)) {
            let m = r.value.find((g) => g.element === document.activeElement);
            m && i.change(m.propsRef.value);
          }
          break;
        case " ":
          {
            p2.preventDefault(), p2.stopPropagation();
            let b = r.value.find((m) => m.element === document.activeElement);
            b && i.change(b.propsRef.value);
          }
          break;
      }
    }
    let c = `headlessui-radiogroup-${h()}`;
    return () => {
      let _a2 = t,
        { modelValue: p2, disabled: f } = _a2,
        b = __objRest(_a2, ["modelValue", "disabled"]),
        m = {
          ref: o,
          id: c,
          role: "radiogroup",
          "aria-labelledby": s.value,
          "aria-describedby": d.value,
          onKeydown: l,
        };
      return x({
        props: __spreadValues(__spreadValues({}, b), m),
        slot: {},
        attrs: u,
        slots: e,
        name: "RadioGroup",
      });
    };
  },
});
var Li = defineComponent({
    name: "RadioGroupOption",
    props: {
      as: { type: [Object, String], default: "div" },
      value: { type: [Object, String, Number, Boolean] },
      disabled: { type: Boolean, default: false },
    },
    setup(t, { attrs: n, slots: u }) {
      let e = Jt("RadioGroupOption"),
        o = `headlessui-radiogroup-option-${h()}`,
        r = fe({ name: "RadioGroupLabel" }),
        s = G({ name: "RadioGroupDescription" }),
        d = ref(null),
        a = computed(() => ({ value: t.value, disabled: t.disabled })),
        i = ref(1);
      onMounted(() => e.registerOption({ id: o, element: d, propsRef: a })),
        onUnmounted(() => e.unregisterOption(o));
      let l = computed(() => {
          var S;
          return ((S = e.firstOption.value) == null ? void 0 : S.id) === o;
        }),
        c = computed(() => e.disabled.value || t.disabled),
        p2 = computed(() => toRaw(e.value.value) === toRaw(t.value)),
        f = computed(() =>
          c.value
            ? -1
            : p2.value || (!e.containsCheckedOption.value && l.value)
            ? 0
            : -1
        );
      function b() {
        var S;
        !e.change(t.value) ||
          ((i.value |= 2), (S = d.value) == null || S.focus());
      }
      function m() {
        i.value |= 2;
      }
      function g() {
        i.value &= ~2;
      }
      return () => {
        let S = L(t, ["value", "disabled"]),
          y = {
            checked: p2.value,
            disabled: c.value,
            active: Boolean(i.value & 2),
          },
          R = {
            id: o,
            ref: d,
            role: "radio",
            "aria-checked": p2.value ? "true" : "false",
            "aria-labelledby": r.value,
            "aria-describedby": s.value,
            "aria-disabled": c.value ? true : void 0,
            tabIndex: f.value,
            onClick: c.value ? void 0 : b,
            onFocus: c.value ? void 0 : m,
            onBlur: c.value ? void 0 : g,
          };
        return x({
          props: __spreadValues(__spreadValues({}, S), R),
          slot: y,
          attrs: n,
          slots: u,
          name: "RadioGroupOption",
        });
      };
    },
  }),
  Mi = Me,
  ki = ne;
var Zt = Symbol("GroupContext");
defineComponent({
  name: "SwitchGroup",
  props: { as: { type: [Object, String], default: "template" } },
  setup(t, { slots: n, attrs: u }) {
    let e = ref(null),
      o = fe({
        name: "SwitchLabel",
        props: {
          onClick() {
            !e.value ||
              (e.value.click(), e.value.focus({ preventScroll: true }));
          },
        },
      }),
      r = G({ name: "SwitchDescription" });
    return (
      provide$1(Zt, { switchRef: e, labelledby: o, describedby: r }),
      () => x({ props: t, slot: {}, slots: n, attrs: u, name: "SwitchGroup" })
    );
  },
});
defineComponent({
  name: "Switch",
  emits: { "update:modelValue": (t) => true },
  props: {
    as: { type: [Object, String], default: "button" },
    modelValue: { type: Boolean, default: false },
  },
  setup(t, { emit: n, attrs: u, slots: e }) {
    let o = inject(Zt, null),
      r = `headlessui-switch-${h()}`;
    function s() {
      n("update:modelValue", !t.modelValue);
    }
    let d = ref(null),
      a = o === null ? d : o.switchRef,
      i = P(
        computed(() => ({ as: t.as, type: u.type })),
        a
      );
    function l(f) {
      f.preventDefault(), s();
    }
    function c(f) {
      f.key !== "Tab" && f.preventDefault(), f.key === " " && s();
    }
    function p2(f) {
      f.preventDefault();
    }
    return () => {
      let f = { checked: t.modelValue },
        b = {
          id: r,
          ref: a,
          role: "switch",
          type: i.value,
          tabIndex: 0,
          "aria-checked": t.modelValue,
          "aria-labelledby": o == null ? void 0 : o.labelledby.value,
          "aria-describedby": o == null ? void 0 : o.describedby.value,
          onClick: l,
          onKeyup: c,
          onKeypress: p2,
        };
      return x({
        props: __spreadValues(__spreadValues({}, t), b),
        slot: f,
        attrs: u,
        slots: e,
        name: "Switch",
      });
    };
  },
});
var oo = Symbol("TabsContext");
function ve(t) {
  let n = inject(oo, null);
  if (n === null) {
    let u = new Error(`<${t} /> is missing a parent <TabGroup /> component.`);
    throw (Error.captureStackTrace && Error.captureStackTrace(u, ve), u);
  }
  return n;
}
defineComponent({
  name: "TabGroup",
  emits: { change: (t) => true },
  props: {
    as: { type: [Object, String], default: "template" },
    selectedIndex: { type: [Number], default: null },
    defaultIndex: { type: [Number], default: 0 },
    vertical: { type: [Boolean], default: false },
    manual: { type: [Boolean], default: false },
  },
  setup(t, { slots: n, attrs: u, emit: e }) {
    let o = ref(null),
      r = ref([]),
      s = ref([]),
      d = {
        selectedIndex: o,
        orientation: computed(() => (t.vertical ? "vertical" : "horizontal")),
        activation: computed(() => (t.manual ? "manual" : "auto")),
        tabs: r,
        panels: s,
        setSelectedIndex(a) {
          o.value !== a && ((o.value = a), e("change", a));
        },
        registerTab(a) {
          r.value.includes(a) || r.value.push(a);
        },
        unregisterTab(a) {
          let i = r.value.indexOf(a);
          i !== -1 && r.value.splice(i, 1);
        },
        registerPanel(a) {
          s.value.includes(a) || s.value.push(a);
        },
        unregisterPanel(a) {
          let i = s.value.indexOf(a);
          i !== -1 && s.value.splice(i, 1);
        },
      };
    return (
      provide$1(oo, d),
      watchEffect(() => {
        var c;
        if (
          d.tabs.value.length <= 0 ||
          (t.selectedIndex === null && o.value !== null)
        )
          return;
        let a = d.tabs.value.map((p2) => v(p2)).filter(Boolean),
          i = a.filter((p2) => !p2.hasAttribute("disabled")),
          l = (c = t.selectedIndex) != null ? c : t.defaultIndex;
        if (l < 0) o.value = a.indexOf(i[0]);
        else if (l > d.tabs.value.length) o.value = a.indexOf(i[i.length - 1]);
        else {
          let p2 = a.slice(0, l),
            b = [...a.slice(l), ...p2].find((m) => i.includes(m));
          if (!b) return;
          o.value = a.indexOf(b);
        }
      }),
      () => {
        let a = { selectedIndex: o.value };
        return x({
          props: L(t, [
            "selectedIndex",
            "defaultIndex",
            "manual",
            "vertical",
            "onChange",
          ]),
          slot: a,
          slots: n,
          attrs: u,
          name: "TabGroup",
        });
      }
    );
  },
});
defineComponent({
  name: "TabList",
  props: { as: { type: [Object, String], default: "div" } },
  setup(t, { attrs: n, slots: u }) {
    let e = ve("TabList");
    return () => {
      let o = { selectedIndex: e.selectedIndex.value },
        r = { role: "tablist", "aria-orientation": e.orientation.value };
      return x({
        props: __spreadValues(__spreadValues({}, t), r),
        slot: o,
        attrs: n,
        slots: u,
        name: "TabList",
      });
    };
  },
});
defineComponent({
  name: "Tab",
  props: {
    as: { type: [Object, String], default: "button" },
    disabled: { type: [Boolean], default: false },
  },
  setup(t, { attrs: n, slots: u }) {
    let e = ve("Tab"),
      o = `headlessui-tabs-tab-${h()}`,
      r = ref();
    onMounted(() => e.registerTab(r)), onUnmounted(() => e.unregisterTab(r));
    let s = computed(() => e.tabs.value.indexOf(r)),
      d = computed(() => s.value === e.selectedIndex.value);
    function a(p2) {
      let f = e.tabs.value.map((b) => v(b)).filter(Boolean);
      if (p2.key === " " || p2.key === "Enter") {
        p2.preventDefault(), p2.stopPropagation(), e.setSelectedIndex(s.value);
        return;
      }
      switch (p2.key) {
        case "Home":
        case "PageUp":
          return p2.preventDefault(), p2.stopPropagation(), O(f, 1);
        case "End":
        case "PageDown":
          return p2.preventDefault(), p2.stopPropagation(), O(f, 8);
      }
      return T(e.orientation.value, {
        vertical() {
          if (p2.key === "ArrowUp") return O(f, 2 | 16);
          if (p2.key === "ArrowDown") return O(f, 4 | 16);
        },
        horizontal() {
          if (p2.key === "ArrowLeft") return O(f, 2 | 16);
          if (p2.key === "ArrowRight") return O(f, 4 | 16);
        },
      });
    }
    function i() {
      var p2;
      (p2 = v(r)) == null || p2.focus();
    }
    function l() {
      var p2;
      t.disabled ||
        ((p2 = v(r)) == null || p2.focus(), e.setSelectedIndex(s.value));
    }
    let c = P(
      computed(() => ({ as: t.as, type: n.type })),
      r
    );
    return () => {
      var b, m;
      let p2 = { selected: d.value },
        f = {
          ref: r,
          onKeydown: a,
          onFocus: e.activation.value === "manual" ? i : l,
          onClick: l,
          id: o,
          role: "tab",
          type: c.value,
          "aria-controls":
            (m = (b = e.panels.value[s.value]) == null ? void 0 : b.value) ==
            null
              ? void 0
              : m.id,
          "aria-selected": d.value,
          tabIndex: d.value ? 0 : -1,
          disabled: t.disabled ? true : void 0,
        };
      return x({
        props: __spreadValues(__spreadValues({}, t), f),
        slot: p2,
        attrs: n,
        slots: u,
        name: "Tab",
      });
    };
  },
});
defineComponent({
  name: "TabPanels",
  props: { as: { type: [Object, String], default: "div" } },
  setup(t, { slots: n, attrs: u }) {
    let e = ve("TabPanels");
    return () => {
      let o = { selectedIndex: e.selectedIndex.value };
      return x({ props: t, slot: o, attrs: u, slots: n, name: "TabPanels" });
    };
  },
});
defineComponent({
  name: "TabPanel",
  props: {
    as: { type: [Object, String], default: "div" },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
  },
  setup(t, { attrs: n, slots: u }) {
    let e = ve("TabPanel"),
      o = `headlessui-tabs-panel-${h()}`,
      r = ref();
    onMounted(() => e.registerPanel(r)),
      onUnmounted(() => e.unregisterPanel(r));
    let s = computed(() => e.panels.value.indexOf(r)),
      d = computed(() => s.value === e.selectedIndex.value);
    return () => {
      var l, c;
      let a = { selected: d.value },
        i = {
          ref: r,
          id: o,
          role: "tabpanel",
          "aria-labelledby":
            (c = (l = e.tabs.value[s.value]) == null ? void 0 : l.value) == null
              ? void 0
              : c.id,
          tabIndex: d.value ? 0 : -1,
        };
      return x({
        props: __spreadValues(__spreadValues({}, t), i),
        slot: a,
        attrs: n,
        slots: u,
        features: 2 | 1,
        visible: d.value,
        name: "TabPanel",
      });
    };
  },
});
function no(t) {
  let n = { called: false };
  return (...u) => {
    if (!n.called) return (n.called = true), t(...u);
  };
}
function Ze() {
  let t = [],
    n = [],
    u = {
      enqueue(e) {
        n.push(e);
      },
      requestAnimationFrame(...e) {
        let o = requestAnimationFrame(...e);
        u.add(() => cancelAnimationFrame(o));
      },
      nextFrame(...e) {
        u.requestAnimationFrame(() => {
          u.requestAnimationFrame(...e);
        });
      },
      setTimeout(...e) {
        let o = setTimeout(...e);
        u.add(() => clearTimeout(o));
      },
      add(e) {
        t.push(e);
      },
      dispose() {
        for (let e of t.splice(0)) e();
      },
      async workQueue() {
        for (let e of n.splice(0)) await e();
      },
    };
  return u;
}
function et(t, ...n) {
  t && n.length > 0 && t.classList.add(...n);
}
function Fe(t, ...n) {
  t && n.length > 0 && t.classList.remove(...n);
}
function $n(t, n) {
  let u = Ze();
  if (!t) return u.dispose;
  let { transitionDuration: e, transitionDelay: o } = getComputedStyle(t),
    [r, s] = [e, o].map((d) => {
      let [a = 0] = d
        .split(",")
        .filter(Boolean)
        .map((i) => (i.includes("ms") ? parseFloat(i) : parseFloat(i) * 1e3))
        .sort((i, l) => l - i);
      return a;
    });
  return (
    r !== 0 ? u.setTimeout(() => n("finished"), r + s) : n("finished"),
    u.add(() => n("cancelled")),
    u.dispose
  );
}
function tt(t, n, u, e, o, r) {
  let s = Ze(),
    d = r !== void 0 ? no(r) : () => {};
  return (
    Fe(t, ...o),
    et(t, ...n, ...u),
    s.nextFrame(() => {
      Fe(t, ...u),
        et(t, ...e),
        s.add($n(t, (a) => (Fe(t, ...e, ...n), et(t, ...o), d(a))));
    }),
    s.add(() => Fe(t, ...n, ...u, ...e, ...o)),
    s.add(() => d("cancelled")),
    s.dispose
  );
}
function Q(t = "") {
  return t.split(" ").filter((n) => n.trim().length > 1);
}
var lt = Symbol("TransitionContext");
function _n() {
  return inject(lt, null) !== null;
}
function qn() {
  let t = inject(lt, null);
  if (t === null)
    throw new Error(
      "A <TransitionChild /> is used but it is missing a parent <TransitionRoot />."
    );
  return t;
}
function zn() {
  let t = inject(rt, null);
  if (t === null)
    throw new Error(
      "A <TransitionChild /> is used but it is missing a parent <TransitionRoot />."
    );
  return t;
}
var rt = Symbol("NestingContext");
function He(t) {
  return "children" in t
    ? He(t.children)
    : t.value.filter(({ state: n }) => n === "visible").length > 0;
}
function io(t) {
  let n = ref([]),
    u = ref(false);
  onMounted(() => (u.value = true)), onUnmounted(() => (u.value = false));
  function e(r, s = 1) {
    let d = n.value.findIndex(({ id: a }) => a === r);
    d !== -1 &&
      (T(s, {
        [0]() {
          n.value.splice(d, 1);
        },
        [1]() {
          n.value[d].state = "hidden";
        },
      }),
      !He(n) && u.value && (t == null || t()));
  }
  function o(r) {
    let s = n.value.find(({ id: d }) => d === r);
    return (
      s
        ? s.state !== "visible" && (s.state = "visible")
        : n.value.push({ id: r, state: "visible" }),
      () => e(r, 0)
    );
  }
  return { children: n, register: o, unregister: e };
}
var uo = 1,
  Qn = defineComponent({
    props: {
      as: { type: [Object, String], default: "div" },
      show: { type: [Boolean], default: null },
      unmount: { type: [Boolean], default: true },
      appear: { type: [Boolean], default: false },
      enter: { type: [String], default: "" },
      enterFrom: { type: [String], default: "" },
      enterTo: { type: [String], default: "" },
      entered: { type: [String], default: "" },
      leave: { type: [String], default: "" },
      leaveFrom: { type: [String], default: "" },
      leaveTo: { type: [String], default: "" },
    },
    emits: {
      beforeEnter: () => true,
      afterEnter: () => true,
      beforeLeave: () => true,
      afterLeave: () => true,
    },
    setup(t, { emit: n, attrs: u, slots: e }) {
      if (!_n() && it())
        return () =>
          h$1(
            Yn,
            __spreadProps(__spreadValues({}, t), {
              onBeforeEnter: () => n("beforeEnter"),
              onAfterEnter: () => n("afterEnter"),
              onBeforeLeave: () => n("beforeLeave"),
              onAfterLeave: () => n("afterLeave"),
            }),
            e
          );
      let o = ref(null),
        r = ref("visible"),
        s = computed(() => (t.unmount ? 0 : 1)),
        { show: d, appear: a } = qn(),
        { register: i, unregister: l } = zn(),
        c = { value: true },
        p2 = h(),
        f = { value: false },
        b = io(() => {
          f.value || ((r.value = "hidden"), l(p2), n("afterLeave"));
        });
      onMounted(() => {
        let F = i(p2);
        onUnmounted(F);
      }),
        watchEffect(() => {
          if (s.value === 1 && !!p2) {
            if (d && r.value !== "visible") {
              r.value = "visible";
              return;
            }
            T(r.value, { hidden: () => l(p2), visible: () => i(p2) });
          }
        });
      let m = Q(t.enter),
        g = Q(t.enterFrom),
        S = Q(t.enterTo),
        y = Q(t.entered),
        R = Q(t.leave),
        E = Q(t.leaveFrom),
        D = Q(t.leaveTo);
      onMounted(() => {
        watchEffect(() => {
          if (r.value === "visible") {
            let F = v(o);
            if (F instanceof Comment && F.data === "")
              throw new Error(
                "Did you forget to passthrough the `ref` to the actual DOM node?"
              );
          }
        });
      });
      function w(F) {
        let xe = c.value && !a.value,
          U = v(o);
        !U ||
          !(U instanceof HTMLElement) ||
          xe ||
          ((f.value = true),
          d.value && n("beforeEnter"),
          d.value || n("beforeLeave"),
          F(
            d.value
              ? tt(U, m, g, S, y, (ye) => {
                  (f.value = false), ye === "finished" && n("afterEnter");
                })
              : tt(U, R, E, D, y, (ye) => {
                  (f.value = false),
                    ye === "finished" &&
                      (He(b) || ((r.value = "hidden"), l(p2), n("afterLeave")));
                })
          ));
      }
      return (
        onMounted(() => {
          watch(
            [d, a],
            (F, xe, U) => {
              w(U), (c.value = false);
            },
            { immediate: true }
          );
        }),
        provide$1(rt, b),
        M(computed(() => T(r.value, { visible: 0, hidden: 1 }))),
        () => {
          let _a2 = t,
            {
              appear: F,
              show: xe,
              enter: U,
              enterFrom: ye,
              enterTo: Xn,
              entered: Zn,
              leave: el,
              leaveFrom: tl,
              leaveTo: ol,
            } = _a2,
            so = __objRest(_a2, [
              "appear",
              "show",
              "enter",
              "enterFrom",
              "enterTo",
              "entered",
              "leave",
              "leaveFrom",
              "leaveTo",
            ]);
          return x({
            props: __spreadValues(__spreadValues({}, so), { ref: o }),
            slot: {},
            slots: e,
            attrs: u,
            features: uo,
            visible: r.value === "visible",
            name: "TransitionChild",
          });
        }
      );
    },
  }),
  Jn = Qn,
  Yn = defineComponent({
    inheritAttrs: false,
    props: {
      as: { type: [Object, String], default: "div" },
      show: { type: [Boolean], default: null },
      unmount: { type: [Boolean], default: true },
      appear: { type: [Boolean], default: false },
      enter: { type: [String], default: "" },
      enterFrom: { type: [String], default: "" },
      enterTo: { type: [String], default: "" },
      entered: { type: [String], default: "" },
      leave: { type: [String], default: "" },
      leaveFrom: { type: [String], default: "" },
      leaveTo: { type: [String], default: "" },
    },
    emits: {
      beforeEnter: () => true,
      afterEnter: () => true,
      beforeLeave: () => true,
      afterLeave: () => true,
    },
    setup(t, { emit: n, attrs: u, slots: e }) {
      let o = I(),
        r = computed(() =>
          t.show === null && o !== null
            ? T(o.value, { [0]: true, [1]: false })
            : t.show
        );
      watchEffect(() => {
        if (![true, false].includes(r.value))
          throw new Error(
            'A <Transition /> is used but it is missing a `:show="true | false"` prop.'
          );
      });
      let s = ref(r.value ? "visible" : "hidden"),
        d = io(() => {
          s.value = "hidden";
        }),
        a = { value: true },
        i = { show: r, appear: computed(() => t.appear || !a.value) };
      return (
        onMounted(() => {
          watchEffect(() => {
            (a.value = false),
              r.value ? (s.value = "visible") : He(d) || (s.value = "hidden");
          });
        }),
        provide$1(rt, d),
        provide$1(lt, i),
        () => {
          let l = L(t, ["show", "appear", "unmount"]),
            c = { unmount: t.unmount };
          return x({
            props: __spreadProps(__spreadValues({}, c), { as: "template" }),
            slot: {},
            slots: __spreadProps(__spreadValues({}, e), {
              default: () => [
                h$1(
                  Jn,
                  __spreadValues(
                    __spreadValues(
                      __spreadValues(
                        {
                          onBeforeEnter: () => n("beforeEnter"),
                          onAfterEnter: () => n("afterEnter"),
                          onBeforeLeave: () => n("beforeLeave"),
                          onAfterLeave: () => n("afterLeave"),
                        },
                        u
                      ),
                      c
                    ),
                    l
                  ),
                  e.default
                ),
              ],
            }),
            attrs: {},
            features: uo,
            visible: s.value === "visible",
            name: "Transition",
          });
        }
      );
    },
  });

function setupCheckoutButtons() {
  const { state, send: send2 } = useOverlay();
  document
    .querySelectorAll("button[data-sell-store][data-sell-product]")
    .forEach((el) => {
      el.addEventListener("click", () => {
        var _a2, _b, _c;
        if (!state.value.matches("closed")) return;
        const store_id = el.attributes["data-sell-store"].value;
        const product_id = el.attributes["data-sell-product"].value;
        const variant_id =
          (_a2 = el.attributes["data-sell-variant"]) == null
            ? void 0
            : _a2.value;
        const darkMode =
          ((_b = el.attributes["data-sell-darkmode"]) == null
            ? void 0
            : _b.value) === "true";
        const theme =
          (_c = el.attributes["data-sell-theme"]) == null ? void 0 : _c.value;
        send2({
          type: "OPEN",
          store_id,
          product_id,
          variant_id,
          customization: {
            darkMode,
            theme,
          },
        });
      });
    });
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign = function () {
  __assign =
    Object.assign ||
    function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p2 in s)
          if (Object.prototype.hasOwnProperty.call(s, p2)) t[p2] = s[p2];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p2 in s)
    if (Object.prototype.hasOwnProperty.call(s, p2) && e.indexOf(p2) < 0)
      t[p2] = s[p2];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s); i < p2.length; i++) {
      if (
        e.indexOf(p2[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(s, p2[i])
      )
        t[p2[i]] = s[p2[i]];
    }
  return t;
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function () {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      },
    };
  throw new TypeError(
    s ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error2) {
    e = { error: error2 };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
var ActionTypes;
(function (ActionTypes2) {
  ActionTypes2["Start"] = "xstate.start";
  ActionTypes2["Stop"] = "xstate.stop";
  ActionTypes2["Raise"] = "xstate.raise";
  ActionTypes2["Send"] = "xstate.send";
  ActionTypes2["Cancel"] = "xstate.cancel";
  ActionTypes2["NullEvent"] = "";
  ActionTypes2["Assign"] = "xstate.assign";
  ActionTypes2["After"] = "xstate.after";
  ActionTypes2["DoneState"] = "done.state";
  ActionTypes2["DoneInvoke"] = "done.invoke";
  ActionTypes2["Log"] = "xstate.log";
  ActionTypes2["Init"] = "xstate.init";
  ActionTypes2["Invoke"] = "xstate.invoke";
  ActionTypes2["ErrorExecution"] = "error.execution";
  ActionTypes2["ErrorCommunication"] = "error.communication";
  ActionTypes2["ErrorPlatform"] = "error.platform";
  ActionTypes2["ErrorCustom"] = "xstate.error";
  ActionTypes2["Update"] = "xstate.update";
  ActionTypes2["Pure"] = "xstate.pure";
  ActionTypes2["Choose"] = "xstate.choose";
})(ActionTypes || (ActionTypes = {}));
var SpecialTargets;
(function (SpecialTargets2) {
  SpecialTargets2["Parent"] = "#_parent";
  SpecialTargets2["Internal"] = "#_internal";
})(SpecialTargets || (SpecialTargets = {}));
var start$1 = ActionTypes.Start;
var stop$1 = ActionTypes.Stop;
var raise$1 = ActionTypes.Raise;
var send$4 = ActionTypes.Send;
var cancel$1 = ActionTypes.Cancel;
var nullEvent = ActionTypes.NullEvent;
var assign$5 = ActionTypes.Assign;
var after$1 = ActionTypes.After;
var doneState = ActionTypes.DoneState;
var log$1 = ActionTypes.Log;
var init = ActionTypes.Init;
var invoke = ActionTypes.Invoke;
var errorExecution = ActionTypes.ErrorExecution;
var errorPlatform = ActionTypes.ErrorPlatform;
var error$2 = ActionTypes.ErrorCustom;
var update = ActionTypes.Update;
var choose$1 = ActionTypes.Choose;
var pure$2 = ActionTypes.Pure;
var actionTypes = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  after: after$1,
  assign: assign$5,
  cancel: cancel$1,
  choose: choose$1,
  doneState,
  error: error$2,
  errorExecution,
  errorPlatform,
  init,
  invoke,
  log: log$1,
  nullEvent,
  pure: pure$2,
  raise: raise$1,
  send: send$4,
  start: start$1,
  stop: stop$1,
  update,
});
var STATE_DELIMITER = ".";
var EMPTY_ACTIVITY_MAP = {};
var DEFAULT_GUARD_TYPE = "xstate.guard";
var TARGETLESS_KEY = "";
var IS_PRODUCTION = true;
var _a;
function matchesState(parentStateId, childStateId, delimiter) {
  if (delimiter === void 0) {
    delimiter = STATE_DELIMITER;
  }
  var parentStateValue = toStateValue(parentStateId, delimiter);
  var childStateValue = toStateValue(childStateId, delimiter);
  if (isString(childStateValue)) {
    if (isString(parentStateValue)) {
      return childStateValue === parentStateValue;
    }
    return false;
  }
  if (isString(parentStateValue)) {
    return parentStateValue in childStateValue;
  }
  return Object.keys(parentStateValue).every(function (key) {
    if (!(key in childStateValue)) {
      return false;
    }
    return matchesState(parentStateValue[key], childStateValue[key]);
  });
}
function getEventType(event) {
  try {
    return isString(event) || typeof event === "number"
      ? "".concat(event)
      : event.type;
  } catch (e) {
    throw new Error(
      "Events must be strings or objects with a string event.type property."
    );
  }
}
function toStatePath(stateId, delimiter) {
  try {
    if (isArray(stateId)) {
      return stateId;
    }
    return stateId.toString().split(delimiter);
  } catch (e) {
    throw new Error("'".concat(stateId, "' is not a valid state path."));
  }
}
function isStateLike(state) {
  return (
    typeof state === "object" &&
    "value" in state &&
    "context" in state &&
    "event" in state &&
    "_event" in state
  );
}
function toStateValue(stateValue, delimiter) {
  if (isStateLike(stateValue)) {
    return stateValue.value;
  }
  if (isArray(stateValue)) {
    return pathToStateValue(stateValue);
  }
  if (typeof stateValue !== "string") {
    return stateValue;
  }
  var statePath = toStatePath(stateValue, delimiter);
  return pathToStateValue(statePath);
}
function pathToStateValue(statePath) {
  if (statePath.length === 1) {
    return statePath[0];
  }
  var value = {};
  var marker = value;
  for (var i = 0; i < statePath.length - 1; i++) {
    if (i === statePath.length - 2) {
      marker[statePath[i]] = statePath[i + 1];
    } else {
      marker[statePath[i]] = {};
      marker = marker[statePath[i]];
    }
  }
  return value;
}
function mapValues(collection, iteratee) {
  var result = {};
  var collectionKeys = Object.keys(collection);
  for (var i = 0; i < collectionKeys.length; i++) {
    var key = collectionKeys[i];
    result[key] = iteratee(collection[key], key, collection, i);
  }
  return result;
}
function mapFilterValues(collection, iteratee, predicate) {
  var e_1, _a2;
  var result = {};
  try {
    for (
      var _b = __values(Object.keys(collection)), _c = _b.next();
      !_c.done;
      _c = _b.next()
    ) {
      var key = _c.value;
      var item = collection[key];
      if (!predicate(item)) {
        continue;
      }
      result[key] = iteratee(item, key, collection);
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1,
    };
  } finally {
    try {
      if (_c && !_c.done && (_a2 = _b.return)) _a2.call(_b);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
  return result;
}
var path = function (props) {
  return function (object) {
    var e_2, _a2;
    var result = object;
    try {
      for (
        var props_1 = __values(props), props_1_1 = props_1.next();
        !props_1_1.done;
        props_1_1 = props_1.next()
      ) {
        var prop = props_1_1.value;
        result = result[prop];
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1,
      };
    } finally {
      try {
        if (props_1_1 && !props_1_1.done && (_a2 = props_1.return))
          _a2.call(props_1);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
    return result;
  };
};
function nestedPath(props, accessorProp) {
  return function (object) {
    var e_3, _a2;
    var result = object;
    try {
      for (
        var props_2 = __values(props), props_2_1 = props_2.next();
        !props_2_1.done;
        props_2_1 = props_2.next()
      ) {
        var prop = props_2_1.value;
        result = result[accessorProp][prop];
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1,
      };
    } finally {
      try {
        if (props_2_1 && !props_2_1.done && (_a2 = props_2.return))
          _a2.call(props_2);
      } finally {
        if (e_3) throw e_3.error;
      }
    }
    return result;
  };
}
function toStatePaths(stateValue) {
  if (!stateValue) {
    return [[]];
  }
  if (isString(stateValue)) {
    return [[stateValue]];
  }
  var result = flatten(
    Object.keys(stateValue).map(function (key) {
      var subStateValue = stateValue[key];
      if (
        typeof subStateValue !== "string" &&
        (!subStateValue || !Object.keys(subStateValue).length)
      ) {
        return [[key]];
      }
      return toStatePaths(stateValue[key]).map(function (subPath) {
        return [key].concat(subPath);
      });
    })
  );
  return result;
}
function flatten(array) {
  var _a2;
  return (_a2 = []).concat.apply(_a2, __spreadArray([], __read(array), false));
}
function toArrayStrict(value) {
  if (isArray(value)) {
    return value;
  }
  return [value];
}
function toArray(value) {
  if (value === void 0) {
    return [];
  }
  return toArrayStrict(value);
}
function mapContext(mapper, context, _event) {
  var e_5, _a2;
  if (isFunction(mapper)) {
    return mapper(context, _event.data);
  }
  var result = {};
  try {
    for (
      var _b = __values(Object.keys(mapper)), _c = _b.next();
      !_c.done;
      _c = _b.next()
    ) {
      var key = _c.value;
      var subMapper = mapper[key];
      if (isFunction(subMapper)) {
        result[key] = subMapper(context, _event.data);
      } else {
        result[key] = subMapper;
      }
    }
  } catch (e_5_1) {
    e_5 = {
      error: e_5_1,
    };
  } finally {
    try {
      if (_c && !_c.done && (_a2 = _b.return)) _a2.call(_b);
    } finally {
      if (e_5) throw e_5.error;
    }
  }
  return result;
}
function isBuiltInEvent(eventType) {
  return /^(done|error)\./.test(eventType);
}
function isPromiseLike(value) {
  if (value instanceof Promise) {
    return true;
  }
  if (
    value !== null &&
    (isFunction(value) || typeof value === "object") &&
    isFunction(value.then)
  ) {
    return true;
  }
  return false;
}
function isBehavior(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    "transition" in value &&
    typeof value.transition === "function"
  );
}
function partition(items, predicate) {
  var e_6, _a2;
  var _b = __read([[], []], 2),
    truthy = _b[0],
    falsy = _b[1];
  try {
    for (
      var items_1 = __values(items), items_1_1 = items_1.next();
      !items_1_1.done;
      items_1_1 = items_1.next()
    ) {
      var item = items_1_1.value;
      if (predicate(item)) {
        truthy.push(item);
      } else {
        falsy.push(item);
      }
    }
  } catch (e_6_1) {
    e_6 = {
      error: e_6_1,
    };
  } finally {
    try {
      if (items_1_1 && !items_1_1.done && (_a2 = items_1.return))
        _a2.call(items_1);
    } finally {
      if (e_6) throw e_6.error;
    }
  }
  return [truthy, falsy];
}
function updateHistoryStates(hist, stateValue) {
  return mapValues(hist.states, function (subHist, key) {
    if (!subHist) {
      return void 0;
    }
    var subStateValue =
      (isString(stateValue) ? void 0 : stateValue[key]) ||
      (subHist ? subHist.current : void 0);
    if (!subStateValue) {
      return void 0;
    }
    return {
      current: subStateValue,
      states: updateHistoryStates(subHist, subStateValue),
    };
  });
}
function updateHistoryValue(hist, stateValue) {
  return {
    current: stateValue,
    states: updateHistoryStates(hist, stateValue),
  };
}
function updateContext(context, _event, assignActions, state) {
  var updatedContext = context
    ? assignActions.reduce(function (acc, assignAction) {
        var e_7, _a2;
        var assignment = assignAction.assignment;
        var meta = {
          state,
          action: assignAction,
          _event,
        };
        var partialUpdate = {};
        if (isFunction(assignment)) {
          partialUpdate = assignment(acc, _event.data, meta);
        } else {
          try {
            for (
              var _b = __values(Object.keys(assignment)), _c = _b.next();
              !_c.done;
              _c = _b.next()
            ) {
              var key = _c.value;
              var propAssignment = assignment[key];
              partialUpdate[key] = isFunction(propAssignment)
                ? propAssignment(acc, _event.data, meta)
                : propAssignment;
            }
          } catch (e_7_1) {
            e_7 = {
              error: e_7_1,
            };
          } finally {
            try {
              if (_c && !_c.done && (_a2 = _b.return)) _a2.call(_b);
            } finally {
              if (e_7) throw e_7.error;
            }
          }
        }
        return Object.assign({}, acc, partialUpdate);
      }, context)
    : context;
  return updatedContext;
}
var warn = function () {};
function isArray(value) {
  return Array.isArray(value);
}
function isFunction(value) {
  return typeof value === "function";
}
function isString(value) {
  return typeof value === "string";
}
function toGuard(condition, guardMap) {
  if (!condition) {
    return void 0;
  }
  if (isString(condition)) {
    return {
      type: DEFAULT_GUARD_TYPE,
      name: condition,
      predicate: guardMap ? guardMap[condition] : void 0,
    };
  }
  if (isFunction(condition)) {
    return {
      type: DEFAULT_GUARD_TYPE,
      name: condition.name,
      predicate: condition,
    };
  }
  return condition;
}
function isObservable(value) {
  try {
    return "subscribe" in value && isFunction(value.subscribe);
  } catch (e) {
    return false;
  }
}
var symbolObservable = /* @__PURE__ */ (function () {
  return (typeof Symbol === "function" && Symbol.observable) || "@@observable";
})();
(_a = {}),
  (_a[symbolObservable] = function () {
    return this;
  }),
  (_a[Symbol.observable] = function () {
    return this;
  }),
  _a;
function isMachine(value) {
  return !!value && "__xstatenode" in value;
}
function isActor$1(value) {
  return !!value && typeof value.send === "function";
}
function toEventObject(event, payload) {
  if (isString(event) || typeof event === "number") {
    return __assign(
      {
        type: event,
      },
      payload
    );
  }
  return event;
}
function toSCXMLEvent(event, scxmlEvent) {
  if (!isString(event) && "$$type" in event && event.$$type === "scxml") {
    return event;
  }
  var eventObject = toEventObject(event);
  return __assign(
    {
      name: eventObject.type,
      data: eventObject,
      $$type: "scxml",
      type: "external",
    },
    scxmlEvent
  );
}
function toTransitionConfigArray(event, configLike) {
  var transitions = toArrayStrict(configLike).map(function (transitionLike) {
    if (
      typeof transitionLike === "undefined" ||
      typeof transitionLike === "string" ||
      isMachine(transitionLike)
    ) {
      return {
        target: transitionLike,
        event,
      };
    }
    return __assign(__assign({}, transitionLike), {
      event,
    });
  });
  return transitions;
}
function normalizeTarget(target) {
  if (target === void 0 || target === TARGETLESS_KEY) {
    return void 0;
  }
  return toArray(target);
}
function evaluateGuard(machine, guard, context, _event, state) {
  var guards = machine.options.guards;
  var guardMeta = {
    state,
    cond: guard,
    _event,
  };
  if (guard.type === DEFAULT_GUARD_TYPE) {
    return (
      (guards === null || guards === void 0 ? void 0 : guards[guard.name]) ||
      guard.predicate
    )(context, _event.data, guardMeta);
  }
  var condFn =
    guards === null || guards === void 0 ? void 0 : guards[guard.type];
  if (!condFn) {
    throw new Error(
      "Guard '"
        .concat(guard.type, "' is not implemented on machine '")
        .concat(machine.id, "'.")
    );
  }
  return condFn(context, _event.data, guardMeta);
}
function toInvokeSource$1(src) {
  if (typeof src === "string") {
    return {
      type: src,
    };
  }
  return src;
}
function toObserver(nextHandler, errorHandler, completionHandler) {
  if (typeof nextHandler === "object") {
    return nextHandler;
  }
  var noop2 = function () {
    return void 0;
  };
  return {
    next: nextHandler,
    error: errorHandler || noop2,
    complete: completionHandler || noop2,
  };
}
function createInvokeId(stateNodeId, index) {
  return "".concat(stateNodeId, ":invocation[").concat(index, "]");
}
var initEvent = /* @__PURE__ */ toSCXMLEvent({
  type: init,
});
function getActionFunction(actionType, actionFunctionMap) {
  return actionFunctionMap ? actionFunctionMap[actionType] || void 0 : void 0;
}
function toActionObject(action, actionFunctionMap) {
  var actionObject;
  if (isString(action) || typeof action === "number") {
    var exec = getActionFunction(action, actionFunctionMap);
    if (isFunction(exec)) {
      actionObject = {
        type: action,
        exec,
      };
    } else if (exec) {
      actionObject = exec;
    } else {
      actionObject = {
        type: action,
        exec: void 0,
      };
    }
  } else if (isFunction(action)) {
    actionObject = {
      type: action.name || action.toString(),
      exec: action,
    };
  } else {
    var exec = getActionFunction(action.type, actionFunctionMap);
    if (isFunction(exec)) {
      actionObject = __assign(__assign({}, action), {
        exec,
      });
    } else if (exec) {
      var actionType = exec.type || action.type;
      actionObject = __assign(__assign(__assign({}, exec), action), {
        type: actionType,
      });
    } else {
      actionObject = action;
    }
  }
  return actionObject;
}
var toActionObjects = function (action, actionFunctionMap) {
  if (!action) {
    return [];
  }
  var actions2 = isArray(action) ? action : [action];
  return actions2.map(function (subAction) {
    return toActionObject(subAction, actionFunctionMap);
  });
};
function toActivityDefinition(action) {
  var actionObject = toActionObject(action);
  return __assign(
    __assign(
      {
        id: isString(action) ? action : actionObject.id,
      },
      actionObject
    ),
    {
      type: actionObject.type,
    }
  );
}
function raise(event) {
  if (!isString(event)) {
    return send$3(event, {
      to: SpecialTargets.Internal,
    });
  }
  return {
    type: raise$1,
    event,
  };
}
function resolveRaise(action) {
  return {
    type: raise$1,
    _event: toSCXMLEvent(action.event),
  };
}
function send$3(event, options) {
  return {
    to: options ? options.to : void 0,
    type: send$4,
    event: isFunction(event) ? event : toEventObject(event),
    delay: options ? options.delay : void 0,
    id:
      options && options.id !== void 0
        ? options.id
        : isFunction(event)
        ? event.name
        : getEventType(event),
  };
}
function resolveSend(action, ctx, _event, delaysMap) {
  var meta = {
    _event,
  };
  var resolvedEvent = toSCXMLEvent(
    isFunction(action.event)
      ? action.event(ctx, _event.data, meta)
      : action.event
  );
  var resolvedDelay;
  if (isString(action.delay)) {
    var configDelay = delaysMap && delaysMap[action.delay];
    resolvedDelay = isFunction(configDelay)
      ? configDelay(ctx, _event.data, meta)
      : configDelay;
  } else {
    resolvedDelay = isFunction(action.delay)
      ? action.delay(ctx, _event.data, meta)
      : action.delay;
  }
  var resolvedTarget = isFunction(action.to)
    ? action.to(ctx, _event.data, meta)
    : action.to;
  return __assign(__assign({}, action), {
    to: resolvedTarget,
    _event: resolvedEvent,
    event: resolvedEvent.data,
    delay: resolvedDelay,
  });
}
function sendParent(event, options) {
  return send$3(
    event,
    __assign(__assign({}, options), {
      to: SpecialTargets.Parent,
    })
  );
}
function sendTo(actor, event, options) {
  return send$3(
    event,
    __assign(__assign({}, options), {
      to: actor,
    })
  );
}
function sendUpdate() {
  return sendParent(update);
}
function respond(event, options) {
  return send$3(
    event,
    __assign(__assign({}, options), {
      to: function (_, __, _a2) {
        var _event = _a2._event;
        return _event.origin;
      },
    })
  );
}
var defaultLogExpr = function (context, event) {
  return {
    context,
    event,
  };
};
function log(expr, label) {
  if (expr === void 0) {
    expr = defaultLogExpr;
  }
  return {
    type: log$1,
    label,
    expr,
  };
}
var resolveLog = function (action, ctx, _event) {
  return __assign(__assign({}, action), {
    value: isString(action.expr)
      ? action.expr
      : action.expr(ctx, _event.data, {
          _event,
        }),
  });
};
var cancel = function (sendId) {
  return {
    type: cancel$1,
    sendId,
  };
};
function start(activity) {
  var activityDef = toActivityDefinition(activity);
  return {
    type: ActionTypes.Start,
    activity: activityDef,
    exec: void 0,
  };
}
function stop(actorRef) {
  var activity = isFunction(actorRef)
    ? actorRef
    : toActivityDefinition(actorRef);
  return {
    type: ActionTypes.Stop,
    activity,
    exec: void 0,
  };
}
function resolveStop(action, context, _event) {
  var actorRefOrString = isFunction(action.activity)
    ? action.activity(context, _event.data)
    : action.activity;
  var resolvedActorRef =
    typeof actorRefOrString === "string"
      ? {
          id: actorRefOrString,
        }
      : actorRefOrString;
  var actionObject = {
    type: ActionTypes.Stop,
    activity: resolvedActorRef,
  };
  return actionObject;
}
var assign$4 = function (assignment) {
  return {
    type: assign$5,
    assignment,
  };
};
function isActionObject(action) {
  return typeof action === "object" && "type" in action;
}
function after(delayRef, id) {
  var idSuffix = id ? "#".concat(id) : "";
  return ""
    .concat(ActionTypes.After, "(")
    .concat(delayRef, ")")
    .concat(idSuffix);
}
function done(id, data) {
  var type = "".concat(ActionTypes.DoneState, ".").concat(id);
  var eventObject = {
    type,
    data,
  };
  eventObject.toString = function () {
    return type;
  };
  return eventObject;
}
function doneInvoke(id, data) {
  var type = "".concat(ActionTypes.DoneInvoke, ".").concat(id);
  var eventObject = {
    type,
    data,
  };
  eventObject.toString = function () {
    return type;
  };
  return eventObject;
}
function error$1(id, data) {
  var type = "".concat(ActionTypes.ErrorPlatform, ".").concat(id);
  var eventObject = {
    type,
    data,
  };
  eventObject.toString = function () {
    return type;
  };
  return eventObject;
}
function pure$1(getActions) {
  return {
    type: ActionTypes.Pure,
    get: getActions,
  };
}
function forwardTo(target, options) {
  return send$3(
    function (_, event) {
      return event;
    },
    __assign(__assign({}, options), {
      to: target,
    })
  );
}
function escalate(errorData, options) {
  return sendParent(
    function (context, event, meta) {
      return {
        type: error$2,
        data: isFunction(errorData)
          ? errorData(context, event, meta)
          : errorData,
      };
    },
    __assign(__assign({}, options), {
      to: SpecialTargets.Parent,
    })
  );
}
function choose(conds) {
  return {
    type: ActionTypes.Choose,
    conds,
  };
}
function resolveActions(
  machine,
  currentState,
  currentContext,
  _event,
  actions2,
  preserveActionOrder
) {
  if (preserveActionOrder === void 0) {
    preserveActionOrder = false;
  }
  var _a2 = __read(
      preserveActionOrder
        ? [[], actions2]
        : partition(actions2, function (action) {
            return action.type === assign$5;
          }),
      2
    ),
    assignActions = _a2[0],
    otherActions = _a2[1];
  var updatedContext = assignActions.length
    ? updateContext(currentContext, _event, assignActions, currentState)
    : currentContext;
  var preservedContexts = preserveActionOrder ? [currentContext] : void 0;
  var resolvedActions = flatten(
    otherActions
      .map(function (actionObject) {
        var _a3;
        switch (actionObject.type) {
          case raise$1:
            return resolveRaise(actionObject);
          case send$4:
            var sendAction = resolveSend(
              actionObject,
              updatedContext,
              _event,
              machine.options.delays
            );
            return sendAction;
          case log$1:
            return resolveLog(actionObject, updatedContext, _event);
          case choose$1: {
            var chooseAction = actionObject;
            var matchedActions =
              (_a3 = chooseAction.conds.find(function (condition) {
                var guard = toGuard(condition.cond, machine.options.guards);
                return (
                  !guard ||
                  evaluateGuard(
                    machine,
                    guard,
                    updatedContext,
                    _event,
                    currentState
                  )
                );
              })) === null || _a3 === void 0
                ? void 0
                : _a3.actions;
            if (!matchedActions) {
              return [];
            }
            var _b = __read(
                resolveActions(
                  machine,
                  currentState,
                  updatedContext,
                  _event,
                  toActionObjects(
                    toArray(matchedActions),
                    machine.options.actions
                  ),
                  preserveActionOrder
                ),
                2
              ),
              resolvedActionsFromChoose = _b[0],
              resolvedContextFromChoose = _b[1];
            updatedContext = resolvedContextFromChoose;
            preservedContexts === null || preservedContexts === void 0
              ? void 0
              : preservedContexts.push(updatedContext);
            return resolvedActionsFromChoose;
          }
          case pure$2: {
            var matchedActions = actionObject.get(updatedContext, _event.data);
            if (!matchedActions) {
              return [];
            }
            var _c = __read(
                resolveActions(
                  machine,
                  currentState,
                  updatedContext,
                  _event,
                  toActionObjects(
                    toArray(matchedActions),
                    machine.options.actions
                  ),
                  preserveActionOrder
                ),
                2
              ),
              resolvedActionsFromPure = _c[0],
              resolvedContext = _c[1];
            updatedContext = resolvedContext;
            preservedContexts === null || preservedContexts === void 0
              ? void 0
              : preservedContexts.push(updatedContext);
            return resolvedActionsFromPure;
          }
          case stop$1: {
            return resolveStop(actionObject, updatedContext, _event);
          }
          case assign$5: {
            updatedContext = updateContext(
              updatedContext,
              _event,
              [actionObject],
              currentState
            );
            preservedContexts === null || preservedContexts === void 0
              ? void 0
              : preservedContexts.push(updatedContext);
            break;
          }
          default:
            var resolvedActionObject = toActionObject(
              actionObject,
              machine.options.actions
            );
            var exec_1 = resolvedActionObject.exec;
            if (exec_1 && preservedContexts) {
              var contextIndex_1 = preservedContexts.length - 1;
              resolvedActionObject = __assign(
                __assign({}, resolvedActionObject),
                {
                  exec: function (_ctx) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                      args[_i - 1] = arguments[_i];
                    }
                    exec_1.apply(
                      void 0,
                      __spreadArray(
                        [preservedContexts[contextIndex_1]],
                        __read(args),
                        false
                      )
                    );
                  },
                }
              );
            }
            return resolvedActionObject;
        }
      })
      .filter(function (a) {
        return !!a;
      })
  );
  return [resolvedActions, updatedContext];
}
var actions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  actionTypes,
  after,
  assign: assign$4,
  cancel,
  choose,
  done,
  doneInvoke,
  error: error$1,
  escalate,
  forwardTo,
  getActionFunction,
  initEvent,
  isActionObject,
  log,
  pure: pure$1,
  raise,
  resolveActions,
  resolveLog,
  resolveRaise,
  resolveSend,
  resolveStop,
  respond,
  send: send$3,
  sendParent,
  sendTo,
  sendUpdate,
  start,
  stop,
  toActionObject,
  toActionObjects,
  toActivityDefinition,
});
var provide = function (service, fn) {
  var result = fn(service);
  return result;
};
function createNullActor(id) {
  var _a2;
  return (
    (_a2 = {
      id,
      send: function () {
        return void 0;
      },
      subscribe: function () {
        return {
          unsubscribe: function () {
            return void 0;
          },
        };
      },
      getSnapshot: function () {
        return void 0;
      },
      toJSON: function () {
        return {
          id,
        };
      },
    }),
    (_a2[symbolObservable] = function () {
      return this;
    }),
    _a2
  );
}
function createInvocableActor(invokeDefinition, machine, context, _event) {
  var _a2;
  var invokeSrc = toInvokeSource$1(invokeDefinition.src);
  var serviceCreator =
    (_a2 =
      machine === null || machine === void 0
        ? void 0
        : machine.options.services) === null || _a2 === void 0
      ? void 0
      : _a2[invokeSrc.type];
  var resolvedData = invokeDefinition.data
    ? mapContext(invokeDefinition.data, context, _event)
    : void 0;
  var tempActor = serviceCreator
    ? createDeferredActor(serviceCreator, invokeDefinition.id, resolvedData)
    : createNullActor(invokeDefinition.id);
  tempActor.meta = invokeDefinition;
  return tempActor;
}
function createDeferredActor(entity, id, data) {
  var tempActor = createNullActor(id);
  tempActor.deferred = true;
  if (isMachine(entity)) {
    var initialState_1 = (tempActor.state = provide(void 0, function () {
      return (data ? entity.withContext(data) : entity).initialState;
    }));
    tempActor.getSnapshot = function () {
      return initialState_1;
    };
  }
  return tempActor;
}
function isActor(item) {
  try {
    return typeof item.send === "function";
  } catch (e) {
    return false;
  }
}
function isSpawnedActor(item) {
  return isActor(item) && "id" in item;
}
function toActorRef(actorRefLike) {
  var _a2;
  return __assign(
    ((_a2 = {
      subscribe: function () {
        return {
          unsubscribe: function () {
            return void 0;
          },
        };
      },
      id: "anonymous",
      getSnapshot: function () {
        return void 0;
      },
    }),
    (_a2[symbolObservable] = function () {
      return this;
    }),
    _a2),
    actorRefLike
  );
}
var isLeafNode = function (stateNode) {
  return stateNode.type === "atomic" || stateNode.type === "final";
};
function getChildren(stateNode) {
  return Object.keys(stateNode.states).map(function (key) {
    return stateNode.states[key];
  });
}
function getAllStateNodes(stateNode) {
  var stateNodes = [stateNode];
  if (isLeafNode(stateNode)) {
    return stateNodes;
  }
  return stateNodes.concat(
    flatten(getChildren(stateNode).map(getAllStateNodes))
  );
}
function getConfiguration(prevStateNodes, stateNodes) {
  var e_1, _a2, e_2, _b, e_3, _c, e_4, _d;
  var prevConfiguration = new Set(prevStateNodes);
  var prevAdjList = getAdjList(prevConfiguration);
  var configuration = new Set(stateNodes);
  try {
    for (
      var configuration_1 = __values(configuration),
        configuration_1_1 = configuration_1.next();
      !configuration_1_1.done;
      configuration_1_1 = configuration_1.next()
    ) {
      var s = configuration_1_1.value;
      var m = s.parent;
      while (m && !configuration.has(m)) {
        configuration.add(m);
        m = m.parent;
      }
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1,
    };
  } finally {
    try {
      if (
        configuration_1_1 &&
        !configuration_1_1.done &&
        (_a2 = configuration_1.return)
      )
        _a2.call(configuration_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
  var adjList = getAdjList(configuration);
  try {
    for (
      var configuration_2 = __values(configuration),
        configuration_2_1 = configuration_2.next();
      !configuration_2_1.done;
      configuration_2_1 = configuration_2.next()
    ) {
      var s = configuration_2_1.value;
      if (
        s.type === "compound" &&
        (!adjList.get(s) || !adjList.get(s).length)
      ) {
        if (prevAdjList.get(s)) {
          prevAdjList.get(s).forEach(function (sn) {
            return configuration.add(sn);
          });
        } else {
          s.initialStateNodes.forEach(function (sn) {
            return configuration.add(sn);
          });
        }
      } else {
        if (s.type === "parallel") {
          try {
            for (
              var _e = ((e_3 = void 0), __values(getChildren(s))),
                _f = _e.next();
              !_f.done;
              _f = _e.next()
            ) {
              var child = _f.value;
              if (child.type === "history") {
                continue;
              }
              if (!configuration.has(child)) {
                configuration.add(child);
                if (prevAdjList.get(child)) {
                  prevAdjList.get(child).forEach(function (sn) {
                    return configuration.add(sn);
                  });
                } else {
                  child.initialStateNodes.forEach(function (sn) {
                    return configuration.add(sn);
                  });
                }
              }
            }
          } catch (e_3_1) {
            e_3 = {
              error: e_3_1,
            };
          } finally {
            try {
              if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
            } finally {
              if (e_3) throw e_3.error;
            }
          }
        }
      }
    }
  } catch (e_2_1) {
    e_2 = {
      error: e_2_1,
    };
  } finally {
    try {
      if (
        configuration_2_1 &&
        !configuration_2_1.done &&
        (_b = configuration_2.return)
      )
        _b.call(configuration_2);
    } finally {
      if (e_2) throw e_2.error;
    }
  }
  try {
    for (
      var configuration_3 = __values(configuration),
        configuration_3_1 = configuration_3.next();
      !configuration_3_1.done;
      configuration_3_1 = configuration_3.next()
    ) {
      var s = configuration_3_1.value;
      var m = s.parent;
      while (m && !configuration.has(m)) {
        configuration.add(m);
        m = m.parent;
      }
    }
  } catch (e_4_1) {
    e_4 = {
      error: e_4_1,
    };
  } finally {
    try {
      if (
        configuration_3_1 &&
        !configuration_3_1.done &&
        (_d = configuration_3.return)
      )
        _d.call(configuration_3);
    } finally {
      if (e_4) throw e_4.error;
    }
  }
  return configuration;
}
function getValueFromAdj(baseNode, adjList) {
  var childStateNodes = adjList.get(baseNode);
  if (!childStateNodes) {
    return {};
  }
  if (baseNode.type === "compound") {
    var childStateNode = childStateNodes[0];
    if (childStateNode) {
      if (isLeafNode(childStateNode)) {
        return childStateNode.key;
      }
    } else {
      return {};
    }
  }
  var stateValue = {};
  childStateNodes.forEach(function (csn) {
    stateValue[csn.key] = getValueFromAdj(csn, adjList);
  });
  return stateValue;
}
function getAdjList(configuration) {
  var e_5, _a2;
  var adjList = /* @__PURE__ */ new Map();
  try {
    for (
      var configuration_4 = __values(configuration),
        configuration_4_1 = configuration_4.next();
      !configuration_4_1.done;
      configuration_4_1 = configuration_4.next()
    ) {
      var s = configuration_4_1.value;
      if (!adjList.has(s)) {
        adjList.set(s, []);
      }
      if (s.parent) {
        if (!adjList.has(s.parent)) {
          adjList.set(s.parent, []);
        }
        adjList.get(s.parent).push(s);
      }
    }
  } catch (e_5_1) {
    e_5 = {
      error: e_5_1,
    };
  } finally {
    try {
      if (
        configuration_4_1 &&
        !configuration_4_1.done &&
        (_a2 = configuration_4.return)
      )
        _a2.call(configuration_4);
    } finally {
      if (e_5) throw e_5.error;
    }
  }
  return adjList;
}
function getValue(rootNode, configuration) {
  var config = getConfiguration([rootNode], configuration);
  return getValueFromAdj(rootNode, getAdjList(config));
}
function has(iterable, item) {
  if (Array.isArray(iterable)) {
    return iterable.some(function (member) {
      return member === item;
    });
  }
  if (iterable instanceof Set) {
    return iterable.has(item);
  }
  return false;
}
function nextEvents(configuration) {
  return __spreadArray(
    [],
    __read(
      new Set(
        flatten(
          __spreadArray(
            [],
            __read(
              configuration.map(function (sn) {
                return sn.ownEvents;
              })
            ),
            false
          )
        )
      )
    ),
    false
  );
}
function isInFinalState(configuration, stateNode) {
  if (stateNode.type === "compound") {
    return getChildren(stateNode).some(function (s) {
      return s.type === "final" && has(configuration, s);
    });
  }
  if (stateNode.type === "parallel") {
    return getChildren(stateNode).every(function (sn) {
      return isInFinalState(configuration, sn);
    });
  }
  return false;
}
function getMeta(configuration) {
  if (configuration === void 0) {
    configuration = [];
  }
  return configuration.reduce(function (acc, stateNode) {
    if (stateNode.meta !== void 0) {
      acc[stateNode.id] = stateNode.meta;
    }
    return acc;
  }, {});
}
function getTagsFromConfiguration(configuration) {
  return new Set(
    flatten(
      configuration.map(function (sn) {
        return sn.tags;
      })
    )
  );
}
function stateValuesEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a === void 0 || b === void 0) {
    return false;
  }
  if (isString(a) || isString(b)) {
    return a === b;
  }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  return (
    aKeys.length === bKeys.length &&
    aKeys.every(function (key) {
      return stateValuesEqual(a[key], b[key]);
    })
  );
}
function isStateConfig(state) {
  if (typeof state !== "object" || state === null) {
    return false;
  }
  return "value" in state && "_event" in state;
}
function bindActionToState(action, state) {
  var exec = action.exec;
  var boundAction = __assign(__assign({}, action), {
    exec:
      exec !== void 0
        ? function () {
            return exec(state.context, state.event, {
              action,
              state,
              _event: state._event,
            });
          }
        : void 0,
  });
  return boundAction;
}
var State = /* @__PURE__ */ (function () {
  function State2(config) {
    var _this = this;
    var _a2;
    this.actions = [];
    this.activities = EMPTY_ACTIVITY_MAP;
    this.meta = {};
    this.events = [];
    this.value = config.value;
    this.context = config.context;
    this._event = config._event;
    this._sessionid = config._sessionid;
    this.event = this._event.data;
    this.historyValue = config.historyValue;
    this.history = config.history;
    this.actions = config.actions || [];
    this.activities = config.activities || EMPTY_ACTIVITY_MAP;
    this.meta = getMeta(config.configuration);
    this.events = config.events || [];
    this.matches = this.matches.bind(this);
    this.toStrings = this.toStrings.bind(this);
    this.configuration = config.configuration;
    this.transitions = config.transitions;
    this.children = config.children;
    this.done = !!config.done;
    this.tags =
      (_a2 = Array.isArray(config.tags)
        ? new Set(config.tags)
        : config.tags) !== null && _a2 !== void 0
        ? _a2
        : /* @__PURE__ */ new Set();
    this.machine = config.machine;
    Object.defineProperty(this, "nextEvents", {
      get: function () {
        return nextEvents(_this.configuration);
      },
    });
  }
  State2.from = function (stateValue, context) {
    if (stateValue instanceof State2) {
      if (stateValue.context !== context) {
        return new State2({
          value: stateValue.value,
          context,
          _event: stateValue._event,
          _sessionid: null,
          historyValue: stateValue.historyValue,
          history: stateValue.history,
          actions: [],
          activities: stateValue.activities,
          meta: {},
          events: [],
          configuration: [],
          transitions: [],
          children: {},
        });
      }
      return stateValue;
    }
    var _event = initEvent;
    return new State2({
      value: stateValue,
      context,
      _event,
      _sessionid: null,
      historyValue: void 0,
      history: void 0,
      actions: [],
      activities: void 0,
      meta: void 0,
      events: [],
      configuration: [],
      transitions: [],
      children: {},
    });
  };
  State2.create = function (config) {
    return new State2(config);
  };
  State2.inert = function (stateValue, context) {
    if (stateValue instanceof State2) {
      if (!stateValue.actions.length) {
        return stateValue;
      }
      var _event = initEvent;
      return new State2({
        value: stateValue.value,
        context,
        _event,
        _sessionid: null,
        historyValue: stateValue.historyValue,
        history: stateValue.history,
        activities: stateValue.activities,
        configuration: stateValue.configuration,
        transitions: [],
        children: {},
      });
    }
    return State2.from(stateValue, context);
  };
  State2.prototype.toStrings = function (stateValue, delimiter) {
    var _this = this;
    if (stateValue === void 0) {
      stateValue = this.value;
    }
    if (delimiter === void 0) {
      delimiter = ".";
    }
    if (isString(stateValue)) {
      return [stateValue];
    }
    var valueKeys = Object.keys(stateValue);
    return valueKeys.concat.apply(
      valueKeys,
      __spreadArray(
        [],
        __read(
          valueKeys.map(function (key) {
            return _this
              .toStrings(stateValue[key], delimiter)
              .map(function (s) {
                return key + delimiter + s;
              });
          })
        ),
        false
      )
    );
  };
  State2.prototype.toJSON = function () {
    var _a2 = this;
    _a2.configuration;
    _a2.transitions;
    var tags = _a2.tags;
    _a2.machine;
    var jsonValues = __rest(_a2, [
      "configuration",
      "transitions",
      "tags",
      "machine",
    ]);
    return __assign(__assign({}, jsonValues), {
      tags: Array.from(tags),
    });
  };
  State2.prototype.matches = function (parentStateValue) {
    return matchesState(parentStateValue, this.value);
  };
  State2.prototype.hasTag = function (tag) {
    return this.tags.has(tag);
  };
  State2.prototype.can = function (event) {
    var _a2;
    {
      warn(!!this.machine);
    }
    var transitionData =
      (_a2 = this.machine) === null || _a2 === void 0
        ? void 0
        : _a2.getTransitionData(this, event);
    return (
      !!(transitionData === null || transitionData === void 0
        ? void 0
        : transitionData.transitions.length) &&
      transitionData.transitions.some(function (t) {
        return t.target !== void 0 || t.actions.length;
      })
    );
  };
  return State2;
})();
var defaultOptions = {
  deferEvents: false,
};
var Scheduler = /* @__PURE__ */ (function () {
  function Scheduler2(options) {
    this.processingEvent = false;
    this.queue = [];
    this.initialized = false;
    this.options = __assign(__assign({}, defaultOptions), options);
  }
  Scheduler2.prototype.initialize = function (callback) {
    this.initialized = true;
    if (callback) {
      if (!this.options.deferEvents) {
        this.schedule(callback);
        return;
      }
      this.process(callback);
    }
    this.flushEvents();
  };
  Scheduler2.prototype.schedule = function (task) {
    if (!this.initialized || this.processingEvent) {
      this.queue.push(task);
      return;
    }
    if (this.queue.length !== 0) {
      throw new Error(
        "Event queue should be empty when it is not processing events"
      );
    }
    this.process(task);
    this.flushEvents();
  };
  Scheduler2.prototype.clear = function () {
    this.queue = [];
  };
  Scheduler2.prototype.flushEvents = function () {
    var nextCallback = this.queue.shift();
    while (nextCallback) {
      this.process(nextCallback);
      nextCallback = this.queue.shift();
    }
  };
  Scheduler2.prototype.process = function (callback) {
    this.processingEvent = true;
    try {
      callback();
    } catch (e) {
      this.clear();
      throw e;
    } finally {
      this.processingEvent = false;
    }
  };
  return Scheduler2;
})();
var children = /* @__PURE__ */ new Map();
var sessionIdIndex = 0;
var registry = {
  bookId: function () {
    return "x:".concat(sessionIdIndex++);
  },
  register: function (id, actor) {
    children.set(id, actor);
    return id;
  },
  get: function (id) {
    return children.get(id);
  },
  free: function (id) {
    children.delete(id);
  },
};
function getGlobal() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
}
function getDevTools() {
  var global2 = getGlobal();
  if (global2 && "__xstate__" in global2) {
    return global2.__xstate__;
  }
  return void 0;
}
function registerService(service) {
  if (!getGlobal()) {
    return;
  }
  var devTools = getDevTools();
  if (devTools) {
    devTools.register(service);
  }
}
function spawnBehavior(behavior, options) {
  if (options === void 0) {
    options = {};
  }
  var state = behavior.initialState;
  var observers = /* @__PURE__ */ new Set();
  var mailbox = [];
  var flushing = false;
  var flush = function () {
    if (flushing) {
      return;
    }
    flushing = true;
    while (mailbox.length > 0) {
      var event_1 = mailbox.shift();
      state = behavior.transition(state, event_1, actorCtx);
      observers.forEach(function (observer) {
        return observer.next(state);
      });
    }
    flushing = false;
  };
  var actor = toActorRef({
    id: options.id,
    send: function (event) {
      mailbox.push(event);
      flush();
    },
    getSnapshot: function () {
      return state;
    },
    subscribe: function (next, handleError2, complete) {
      var observer = toObserver(next, handleError2, complete);
      observers.add(observer);
      observer.next(state);
      return {
        unsubscribe: function () {
          observers.delete(observer);
        },
      };
    },
  });
  var actorCtx = {
    parent: options.parent,
    self: actor,
    id: options.id || "anonymous",
    observers,
  };
  state = behavior.start ? behavior.start(actorCtx) : state;
  return actor;
}
var DEFAULT_SPAWN_OPTIONS = {
  sync: false,
  autoForward: false,
};
var InterpreterStatus;
(function (InterpreterStatus2) {
  InterpreterStatus2[(InterpreterStatus2["NotStarted"] = 0)] = "NotStarted";
  InterpreterStatus2[(InterpreterStatus2["Running"] = 1)] = "Running";
  InterpreterStatus2[(InterpreterStatus2["Stopped"] = 2)] = "Stopped";
})(InterpreterStatus || (InterpreterStatus = {}));
var Interpreter = /* @__PURE__ */ (function () {
  function Interpreter2(machine, options) {
    var _this = this;
    if (options === void 0) {
      options = Interpreter2.defaultOptions;
    }
    this.machine = machine;
    this.scheduler = new Scheduler();
    this.delayedEventsMap = {};
    this.listeners = /* @__PURE__ */ new Set();
    this.contextListeners = /* @__PURE__ */ new Set();
    this.stopListeners = /* @__PURE__ */ new Set();
    this.doneListeners = /* @__PURE__ */ new Set();
    this.eventListeners = /* @__PURE__ */ new Set();
    this.sendListeners = /* @__PURE__ */ new Set();
    this.initialized = false;
    this.status = InterpreterStatus.NotStarted;
    this.children = /* @__PURE__ */ new Map();
    this.forwardTo = /* @__PURE__ */ new Set();
    this.init = this.start;
    this.send = function (event, payload) {
      if (isArray(event)) {
        _this.batch(event);
        return _this.state;
      }
      var _event = toSCXMLEvent(toEventObject(event, payload));
      if (_this.status === InterpreterStatus.Stopped) {
        return _this.state;
      }
      if (
        _this.status !== InterpreterStatus.Running &&
        !_this.options.deferEvents
      ) {
        throw new Error(
          'Event "'
            .concat(_event.name, '" was sent to uninitialized service "')
            .concat(
              _this.machine.id,
              '". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.\nEvent: '
            )
            .concat(JSON.stringify(_event.data))
        );
      }
      _this.scheduler.schedule(function () {
        _this.forward(_event);
        var nextState = _this.nextState(_event);
        _this.update(nextState, _event);
      });
      return _this._state;
    };
    this.sendTo = function (event, to) {
      var isParent =
        _this.parent &&
        (to === SpecialTargets.Parent || _this.parent.id === to);
      var target = isParent
        ? _this.parent
        : isString(to)
        ? _this.children.get(to) || registry.get(to)
        : isActor$1(to)
        ? to
        : void 0;
      if (!target) {
        if (!isParent) {
          throw new Error(
            "Unable to send event to child '"
              .concat(to, "' from service '")
              .concat(_this.id, "'.")
          );
        }
        return;
      }
      if ("machine" in target) {
        target.send(
          __assign(__assign({}, event), {
            name:
              event.name === error$2
                ? "".concat(error$1(_this.id))
                : event.name,
            origin: _this.sessionId,
          })
        );
      } else {
        target.send(event.data);
      }
    };
    var resolvedOptions = __assign(
      __assign({}, Interpreter2.defaultOptions),
      options
    );
    var clock = resolvedOptions.clock,
      logger = resolvedOptions.logger,
      parent = resolvedOptions.parent,
      id = resolvedOptions.id;
    var resolvedId = id !== void 0 ? id : machine.id;
    this.id = resolvedId;
    this.logger = logger;
    this.clock = clock;
    this.parent = parent;
    this.options = resolvedOptions;
    this.scheduler = new Scheduler({
      deferEvents: this.options.deferEvents,
    });
    this.sessionId = registry.bookId();
  }
  Object.defineProperty(Interpreter2.prototype, "initialState", {
    get: function () {
      var _this = this;
      if (this._initialState) {
        return this._initialState;
      }
      return provide(this, function () {
        _this._initialState = _this.machine.initialState;
        return _this._initialState;
      });
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(Interpreter2.prototype, "state", {
    get: function () {
      return this._state;
    },
    enumerable: false,
    configurable: true,
  });
  Interpreter2.prototype.execute = function (state, actionsConfig) {
    var e_1, _a2;
    try {
      for (
        var _b = __values(state.actions), _c = _b.next();
        !_c.done;
        _c = _b.next()
      ) {
        var action = _c.value;
        this.exec(action, state, actionsConfig);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1,
      };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return)) _a2.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };
  Interpreter2.prototype.update = function (state, _event) {
    var e_2, _a2, e_3, _b, e_4, _c, e_5, _d;
    var _this = this;
    state._sessionid = this.sessionId;
    this._state = state;
    if (this.options.execute) {
      this.execute(this.state);
    }
    this.children.forEach(function (child) {
      _this.state.children[child.id] = child;
    });
    if (this.devTools) {
      this.devTools.send(_event.data, state);
    }
    if (state.event) {
      try {
        for (
          var _e = __values(this.eventListeners), _f = _e.next();
          !_f.done;
          _f = _e.next()
        ) {
          var listener = _f.value;
          listener(state.event);
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1,
        };
      } finally {
        try {
          if (_f && !_f.done && (_a2 = _e.return)) _a2.call(_e);
        } finally {
          if (e_2) throw e_2.error;
        }
      }
    }
    try {
      for (
        var _g = __values(this.listeners), _h = _g.next();
        !_h.done;
        _h = _g.next()
      ) {
        var listener = _h.value;
        listener(state, state.event);
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1,
      };
    } finally {
      try {
        if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
      } finally {
        if (e_3) throw e_3.error;
      }
    }
    try {
      for (
        var _j = __values(this.contextListeners), _k = _j.next();
        !_k.done;
        _k = _j.next()
      ) {
        var contextListener = _k.value;
        contextListener(
          this.state.context,
          this.state.history ? this.state.history.context : void 0
        );
      }
    } catch (e_4_1) {
      e_4 = {
        error: e_4_1,
      };
    } finally {
      try {
        if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
      } finally {
        if (e_4) throw e_4.error;
      }
    }
    var isDone = isInFinalState(state.configuration || [], this.machine);
    if (this.state.configuration && isDone) {
      var finalChildStateNode = state.configuration.find(function (sn) {
        return sn.type === "final" && sn.parent === _this.machine;
      });
      var doneData =
        finalChildStateNode && finalChildStateNode.doneData
          ? mapContext(finalChildStateNode.doneData, state.context, _event)
          : void 0;
      try {
        for (
          var _l = __values(this.doneListeners), _m = _l.next();
          !_m.done;
          _m = _l.next()
        ) {
          var listener = _m.value;
          listener(doneInvoke(this.id, doneData));
        }
      } catch (e_5_1) {
        e_5 = {
          error: e_5_1,
        };
      } finally {
        try {
          if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
        } finally {
          if (e_5) throw e_5.error;
        }
      }
      this.stop();
    }
  };
  Interpreter2.prototype.onTransition = function (listener) {
    this.listeners.add(listener);
    if (this.status === InterpreterStatus.Running) {
      listener(this.state, this.state.event);
    }
    return this;
  };
  Interpreter2.prototype.subscribe = function (
    nextListenerOrObserver,
    _,
    completeListener
  ) {
    var _this = this;
    if (!nextListenerOrObserver) {
      return {
        unsubscribe: function () {
          return void 0;
        },
      };
    }
    var listener;
    var resolvedCompleteListener = completeListener;
    if (typeof nextListenerOrObserver === "function") {
      listener = nextListenerOrObserver;
    } else {
      listener = nextListenerOrObserver.next.bind(nextListenerOrObserver);
      resolvedCompleteListener = nextListenerOrObserver.complete.bind(
        nextListenerOrObserver
      );
    }
    this.listeners.add(listener);
    if (this.status === InterpreterStatus.Running) {
      listener(this.state);
    }
    if (resolvedCompleteListener) {
      this.onDone(resolvedCompleteListener);
    }
    return {
      unsubscribe: function () {
        listener && _this.listeners.delete(listener);
        resolvedCompleteListener &&
          _this.doneListeners.delete(resolvedCompleteListener);
      },
    };
  };
  Interpreter2.prototype.onEvent = function (listener) {
    this.eventListeners.add(listener);
    return this;
  };
  Interpreter2.prototype.onSend = function (listener) {
    this.sendListeners.add(listener);
    return this;
  };
  Interpreter2.prototype.onChange = function (listener) {
    this.contextListeners.add(listener);
    return this;
  };
  Interpreter2.prototype.onStop = function (listener) {
    this.stopListeners.add(listener);
    return this;
  };
  Interpreter2.prototype.onDone = function (listener) {
    this.doneListeners.add(listener);
    return this;
  };
  Interpreter2.prototype.off = function (listener) {
    this.listeners.delete(listener);
    this.eventListeners.delete(listener);
    this.sendListeners.delete(listener);
    this.stopListeners.delete(listener);
    this.doneListeners.delete(listener);
    this.contextListeners.delete(listener);
    return this;
  };
  Interpreter2.prototype.start = function (initialState) {
    var _this = this;
    if (this.status === InterpreterStatus.Running) {
      return this;
    }
    this.machine._init();
    registry.register(this.sessionId, this);
    this.initialized = true;
    this.status = InterpreterStatus.Running;
    var resolvedState =
      initialState === void 0
        ? this.initialState
        : provide(this, function () {
            return isStateConfig(initialState)
              ? _this.machine.resolveState(initialState)
              : _this.machine.resolveState(
                  State.from(initialState, _this.machine.context)
                );
          });
    if (this.options.devTools) {
      this.attachDev();
    }
    this.scheduler.initialize(function () {
      _this.update(resolvedState, initEvent);
    });
    return this;
  };
  Interpreter2.prototype.stop = function () {
    var e_6, _a2, e_7, _b, e_8, _c, e_9, _d, e_10, _e;
    var _this = this;
    try {
      for (
        var _f = __values(this.listeners), _g = _f.next();
        !_g.done;
        _g = _f.next()
      ) {
        var listener = _g.value;
        this.listeners.delete(listener);
      }
    } catch (e_6_1) {
      e_6 = {
        error: e_6_1,
      };
    } finally {
      try {
        if (_g && !_g.done && (_a2 = _f.return)) _a2.call(_f);
      } finally {
        if (e_6) throw e_6.error;
      }
    }
    try {
      for (
        var _h = __values(this.stopListeners), _j = _h.next();
        !_j.done;
        _j = _h.next()
      ) {
        var listener = _j.value;
        listener();
        this.stopListeners.delete(listener);
      }
    } catch (e_7_1) {
      e_7 = {
        error: e_7_1,
      };
    } finally {
      try {
        if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
      } finally {
        if (e_7) throw e_7.error;
      }
    }
    try {
      for (
        var _k = __values(this.contextListeners), _l = _k.next();
        !_l.done;
        _l = _k.next()
      ) {
        var listener = _l.value;
        this.contextListeners.delete(listener);
      }
    } catch (e_8_1) {
      e_8 = {
        error: e_8_1,
      };
    } finally {
      try {
        if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
      } finally {
        if (e_8) throw e_8.error;
      }
    }
    try {
      for (
        var _m = __values(this.doneListeners), _o = _m.next();
        !_o.done;
        _o = _m.next()
      ) {
        var listener = _o.value;
        this.doneListeners.delete(listener);
      }
    } catch (e_9_1) {
      e_9 = {
        error: e_9_1,
      };
    } finally {
      try {
        if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
      } finally {
        if (e_9) throw e_9.error;
      }
    }
    if (!this.initialized) {
      return this;
    }
    __spreadArray([], __read(this.state.configuration), false)
      .sort(function (a, b) {
        return b.order - a.order;
      })
      .forEach(function (stateNode) {
        var e_11, _a3;
        try {
          for (
            var _b2 = __values(stateNode.definition.exit), _c2 = _b2.next();
            !_c2.done;
            _c2 = _b2.next()
          ) {
            var action = _c2.value;
            _this.exec(action, _this.state);
          }
        } catch (e_11_1) {
          e_11 = {
            error: e_11_1,
          };
        } finally {
          try {
            if (_c2 && !_c2.done && (_a3 = _b2.return)) _a3.call(_b2);
          } finally {
            if (e_11) throw e_11.error;
          }
        }
      });
    this.children.forEach(function (child) {
      if (isFunction(child.stop)) {
        child.stop();
      }
    });
    try {
      for (
        var _p = __values(Object.keys(this.delayedEventsMap)), _q = _p.next();
        !_q.done;
        _q = _p.next()
      ) {
        var key = _q.value;
        this.clock.clearTimeout(this.delayedEventsMap[key]);
      }
    } catch (e_10_1) {
      e_10 = {
        error: e_10_1,
      };
    } finally {
      try {
        if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
      } finally {
        if (e_10) throw e_10.error;
      }
    }
    this.scheduler.clear();
    this.initialized = false;
    this.status = InterpreterStatus.Stopped;
    registry.free(this.sessionId);
    return this;
  };
  Interpreter2.prototype.batch = function (events) {
    var _this = this;
    if (
      this.status === InterpreterStatus.NotStarted &&
      this.options.deferEvents
    );
    else if (this.status !== InterpreterStatus.Running) {
      throw new Error(
        ""
          .concat(
            events.length,
            ' event(s) were sent to uninitialized service "'
          )
          .concat(
            this.machine.id,
            '". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.'
          )
      );
    }
    this.scheduler.schedule(function () {
      var e_12, _a2;
      var nextState = _this.state;
      var batchChanged = false;
      var batchedActions = [];
      var _loop_1 = function (event_12) {
        var _event = toSCXMLEvent(event_12);
        _this.forward(_event);
        nextState = provide(_this, function () {
          return _this.machine.transition(nextState, _event);
        });
        batchedActions.push.apply(
          batchedActions,
          __spreadArray(
            [],
            __read(
              nextState.actions.map(function (a) {
                return bindActionToState(a, nextState);
              })
            ),
            false
          )
        );
        batchChanged = batchChanged || !!nextState.changed;
      };
      try {
        for (
          var events_1 = __values(events), events_1_1 = events_1.next();
          !events_1_1.done;
          events_1_1 = events_1.next()
        ) {
          var event_1 = events_1_1.value;
          _loop_1(event_1);
        }
      } catch (e_12_1) {
        e_12 = {
          error: e_12_1,
        };
      } finally {
        try {
          if (events_1_1 && !events_1_1.done && (_a2 = events_1.return))
            _a2.call(events_1);
        } finally {
          if (e_12) throw e_12.error;
        }
      }
      nextState.changed = batchChanged;
      nextState.actions = batchedActions;
      _this.update(nextState, toSCXMLEvent(events[events.length - 1]));
    });
  };
  Interpreter2.prototype.sender = function (event) {
    return this.send.bind(this, event);
  };
  Interpreter2.prototype.nextState = function (event) {
    var _this = this;
    var _event = toSCXMLEvent(event);
    if (
      _event.name.indexOf(errorPlatform) === 0 &&
      !this.state.nextEvents.some(function (nextEvent) {
        return nextEvent.indexOf(errorPlatform) === 0;
      })
    ) {
      throw _event.data.data;
    }
    var nextState = provide(this, function () {
      return _this.machine.transition(_this.state, _event);
    });
    return nextState;
  };
  Interpreter2.prototype.forward = function (event) {
    var e_13, _a2;
    try {
      for (
        var _b = __values(this.forwardTo), _c = _b.next();
        !_c.done;
        _c = _b.next()
      ) {
        var id = _c.value;
        var child = this.children.get(id);
        if (!child) {
          throw new Error(
            "Unable to forward event '"
              .concat(event, "' from interpreter '")
              .concat(this.id, "' to nonexistant child '")
              .concat(id, "'.")
          );
        }
        child.send(event);
      }
    } catch (e_13_1) {
      e_13 = {
        error: e_13_1,
      };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return)) _a2.call(_b);
      } finally {
        if (e_13) throw e_13.error;
      }
    }
  };
  Interpreter2.prototype.defer = function (sendAction) {
    var _this = this;
    this.delayedEventsMap[sendAction.id] = this.clock.setTimeout(function () {
      if (sendAction.to) {
        _this.sendTo(sendAction._event, sendAction.to);
      } else {
        _this.send(sendAction._event);
      }
    }, sendAction.delay);
  };
  Interpreter2.prototype.cancel = function (sendId) {
    this.clock.clearTimeout(this.delayedEventsMap[sendId]);
    delete this.delayedEventsMap[sendId];
  };
  Interpreter2.prototype.exec = function (action, state, actionFunctionMap) {
    if (actionFunctionMap === void 0) {
      actionFunctionMap = this.machine.options.actions;
    }
    var context = state.context,
      _event = state._event;
    var actionOrExec =
      action.exec || getActionFunction(action.type, actionFunctionMap);
    var exec = isFunction(actionOrExec)
      ? actionOrExec
      : actionOrExec
      ? actionOrExec.exec
      : action.exec;
    if (exec) {
      try {
        return exec(context, _event.data, {
          action,
          state: this.state,
          _event,
        });
      } catch (err) {
        if (this.parent) {
          this.parent.send({
            type: "xstate.error",
            data: err,
          });
        }
        throw err;
      }
    }
    switch (action.type) {
      case send$4:
        var sendAction = action;
        if (typeof sendAction.delay === "number") {
          this.defer(sendAction);
          return;
        } else {
          if (sendAction.to) {
            this.sendTo(sendAction._event, sendAction.to);
          } else {
            this.send(sendAction._event);
          }
        }
        break;
      case cancel$1:
        this.cancel(action.sendId);
        break;
      case start$1: {
        if (this.status !== InterpreterStatus.Running) {
          return;
        }
        var activity = action.activity;
        if (!this.state.activities[activity.id || activity.type]) {
          break;
        }
        if (activity.type === ActionTypes.Invoke) {
          var invokeSource = toInvokeSource$1(activity.src);
          var serviceCreator = this.machine.options.services
            ? this.machine.options.services[invokeSource.type]
            : void 0;
          var id = activity.id,
            data = activity.data;
          var autoForward =
            "autoForward" in activity
              ? activity.autoForward
              : !!activity.forward;
          if (!serviceCreator) {
            return;
          }
          var resolvedData = data ? mapContext(data, context, _event) : void 0;
          if (typeof serviceCreator === "string") {
            return;
          }
          var source = isFunction(serviceCreator)
            ? serviceCreator(context, _event.data, {
                data: resolvedData,
                src: invokeSource,
                meta: activity.meta,
              })
            : serviceCreator;
          if (!source) {
            return;
          }
          var options = void 0;
          if (isMachine(source)) {
            source = resolvedData ? source.withContext(resolvedData) : source;
            options = {
              autoForward,
            };
          }
          this.spawn(source, id, options);
        } else {
          this.spawnActivity(activity);
        }
        break;
      }
      case stop$1: {
        this.stopChild(action.activity.id);
        break;
      }
      case log$1:
        var label = action.label,
          value = action.value;
        if (label) {
          this.logger(label, value);
        } else {
          this.logger(value);
        }
        break;
    }
    return void 0;
  };
  Interpreter2.prototype.removeChild = function (childId) {
    var _a2;
    this.children.delete(childId);
    this.forwardTo.delete(childId);
    (_a2 = this.state) === null || _a2 === void 0
      ? true
      : delete _a2.children[childId];
  };
  Interpreter2.prototype.stopChild = function (childId) {
    var child = this.children.get(childId);
    if (!child) {
      return;
    }
    this.removeChild(childId);
    if (isFunction(child.stop)) {
      child.stop();
    }
  };
  Interpreter2.prototype.spawn = function (entity, name, options) {
    if (isPromiseLike(entity)) {
      return this.spawnPromise(Promise.resolve(entity), name);
    } else if (isFunction(entity)) {
      return this.spawnCallback(entity, name);
    } else if (isSpawnedActor(entity)) {
      return this.spawnActor(entity, name);
    } else if (isObservable(entity)) {
      return this.spawnObservable(entity, name);
    } else if (isMachine(entity)) {
      return this.spawnMachine(
        entity,
        __assign(__assign({}, options), {
          id: name,
        })
      );
    } else if (isBehavior(entity)) {
      return this.spawnBehavior(entity, name);
    } else {
      throw new Error(
        'Unable to spawn entity "'
          .concat(name, '" of type "')
          .concat(typeof entity, '".')
      );
    }
  };
  Interpreter2.prototype.spawnMachine = function (machine, options) {
    var _this = this;
    if (options === void 0) {
      options = {};
    }
    var childService = new Interpreter2(
      machine,
      __assign(__assign({}, this.options), {
        parent: this,
        id: options.id || machine.id,
      })
    );
    var resolvedOptions = __assign(
      __assign({}, DEFAULT_SPAWN_OPTIONS),
      options
    );
    if (resolvedOptions.sync) {
      childService.onTransition(function (state) {
        _this.send(update, {
          state,
          id: childService.id,
        });
      });
    }
    var actor = childService;
    this.children.set(childService.id, actor);
    if (resolvedOptions.autoForward) {
      this.forwardTo.add(childService.id);
    }
    childService
      .onDone(function (doneEvent) {
        _this.removeChild(childService.id);
        _this.send(
          toSCXMLEvent(doneEvent, {
            origin: childService.id,
          })
        );
      })
      .start();
    return actor;
  };
  Interpreter2.prototype.spawnBehavior = function (behavior, id) {
    var actorRef = spawnBehavior(behavior, {
      id,
      parent: this,
    });
    this.children.set(id, actorRef);
    return actorRef;
  };
  Interpreter2.prototype.spawnPromise = function (promise, id) {
    var _a2;
    var _this = this;
    var canceled = false;
    var resolvedData;
    promise.then(
      function (response) {
        if (!canceled) {
          resolvedData = response;
          _this.removeChild(id);
          _this.send(
            toSCXMLEvent(doneInvoke(id, response), {
              origin: id,
            })
          );
        }
      },
      function (errorData) {
        if (!canceled) {
          _this.removeChild(id);
          var errorEvent = error$1(id, errorData);
          try {
            _this.send(
              toSCXMLEvent(errorEvent, {
                origin: id,
              })
            );
          } catch (error2) {
            if (_this.devTools) {
              _this.devTools.send(errorEvent, _this.state);
            }
            if (_this.machine.strict) {
              _this.stop();
            }
          }
        }
      }
    );
    var actor =
      ((_a2 = {
        id,
        send: function () {
          return void 0;
        },
        subscribe: function (next, handleError2, complete) {
          var observer = toObserver(next, handleError2, complete);
          var unsubscribed = false;
          promise.then(
            function (response) {
              if (unsubscribed) {
                return;
              }
              observer.next(response);
              if (unsubscribed) {
                return;
              }
              observer.complete();
            },
            function (err) {
              if (unsubscribed) {
                return;
              }
              observer.error(err);
            }
          );
          return {
            unsubscribe: function () {
              return (unsubscribed = true);
            },
          };
        },
        stop: function () {
          canceled = true;
        },
        toJSON: function () {
          return {
            id,
          };
        },
        getSnapshot: function () {
          return resolvedData;
        },
      }),
      (_a2[symbolObservable] = function () {
        return this;
      }),
      _a2);
    this.children.set(id, actor);
    return actor;
  };
  Interpreter2.prototype.spawnCallback = function (callback, id) {
    var _a2;
    var _this = this;
    var canceled = false;
    var receivers = /* @__PURE__ */ new Set();
    var listeners = /* @__PURE__ */ new Set();
    var emitted;
    var receive = function (e) {
      emitted = e;
      listeners.forEach(function (listener) {
        return listener(e);
      });
      if (canceled) {
        return;
      }
      _this.send(
        toSCXMLEvent(e, {
          origin: id,
        })
      );
    };
    var callbackStop;
    try {
      callbackStop = callback(receive, function (newListener) {
        receivers.add(newListener);
      });
    } catch (err) {
      this.send(error$1(id, err));
    }
    if (isPromiseLike(callbackStop)) {
      return this.spawnPromise(callbackStop, id);
    }
    var actor =
      ((_a2 = {
        id,
        send: function (event) {
          return receivers.forEach(function (receiver) {
            return receiver(event);
          });
        },
        subscribe: function (next) {
          var observer = toObserver(next);
          listeners.add(observer.next);
          return {
            unsubscribe: function () {
              listeners.delete(observer.next);
            },
          };
        },
        stop: function () {
          canceled = true;
          if (isFunction(callbackStop)) {
            callbackStop();
          }
        },
        toJSON: function () {
          return {
            id,
          };
        },
        getSnapshot: function () {
          return emitted;
        },
      }),
      (_a2[symbolObservable] = function () {
        return this;
      }),
      _a2);
    this.children.set(id, actor);
    return actor;
  };
  Interpreter2.prototype.spawnObservable = function (source, id) {
    var _a2;
    var _this = this;
    var emitted;
    var subscription = source.subscribe(
      function (value) {
        emitted = value;
        _this.send(
          toSCXMLEvent(value, {
            origin: id,
          })
        );
      },
      function (err) {
        _this.removeChild(id);
        _this.send(
          toSCXMLEvent(error$1(id, err), {
            origin: id,
          })
        );
      },
      function () {
        _this.removeChild(id);
        _this.send(
          toSCXMLEvent(doneInvoke(id), {
            origin: id,
          })
        );
      }
    );
    var actor =
      ((_a2 = {
        id,
        send: function () {
          return void 0;
        },
        subscribe: function (next, handleError2, complete) {
          return source.subscribe(next, handleError2, complete);
        },
        stop: function () {
          return subscription.unsubscribe();
        },
        getSnapshot: function () {
          return emitted;
        },
        toJSON: function () {
          return {
            id,
          };
        },
      }),
      (_a2[symbolObservable] = function () {
        return this;
      }),
      _a2);
    this.children.set(id, actor);
    return actor;
  };
  Interpreter2.prototype.spawnActor = function (actor, name) {
    this.children.set(name, actor);
    return actor;
  };
  Interpreter2.prototype.spawnActivity = function (activity) {
    var implementation =
      this.machine.options && this.machine.options.activities
        ? this.machine.options.activities[activity.type]
        : void 0;
    if (!implementation) {
      return;
    }
    var dispose = implementation(this.state.context, activity);
    this.spawnEffect(activity.id, dispose);
  };
  Interpreter2.prototype.spawnEffect = function (id, dispose) {
    var _a2;
    this.children.set(
      id,
      ((_a2 = {
        id,
        send: function () {
          return void 0;
        },
        subscribe: function () {
          return {
            unsubscribe: function () {
              return void 0;
            },
          };
        },
        stop: dispose || void 0,
        getSnapshot: function () {
          return void 0;
        },
        toJSON: function () {
          return {
            id,
          };
        },
      }),
      (_a2[symbolObservable] = function () {
        return this;
      }),
      _a2)
    );
  };
  Interpreter2.prototype.attachDev = function () {
    var global2 = getGlobal();
    if (this.options.devTools && global2) {
      if (global2.__REDUX_DEVTOOLS_EXTENSION__) {
        var devToolsOptions =
          typeof this.options.devTools === "object"
            ? this.options.devTools
            : void 0;
        this.devTools = global2.__REDUX_DEVTOOLS_EXTENSION__.connect(
          __assign(
            __assign(
              {
                name: this.id,
                autoPause: true,
                stateSanitizer: function (state) {
                  return {
                    value: state.value,
                    context: state.context,
                    actions: state.actions,
                  };
                },
              },
              devToolsOptions
            ),
            {
              features: __assign(
                {
                  jump: false,
                  skip: false,
                },
                devToolsOptions ? devToolsOptions.features : void 0
              ),
            }
          ),
          this.machine
        );
        this.devTools.init(this.state);
      }
      registerService(this);
    }
  };
  Interpreter2.prototype.toJSON = function () {
    return {
      id: this.id,
    };
  };
  Interpreter2.prototype[symbolObservable] = function () {
    return this;
  };
  Interpreter2.prototype.getSnapshot = function () {
    if (this.status === InterpreterStatus.NotStarted) {
      return this.initialState;
    }
    return this._state;
  };
  Interpreter2.defaultOptions = {
    execute: true,
    deferEvents: true,
    clock: {
      setTimeout: function (fn, ms) {
        return setTimeout(fn, ms);
      },
      clearTimeout: function (id) {
        return clearTimeout(id);
      },
    },
    logger: /* @__PURE__ */ console.log.bind(console),
    devTools: false,
  };
  Interpreter2.interpret = interpret;
  return Interpreter2;
})();
function interpret(machine, options) {
  var interpreter = new Interpreter(machine, options);
  return interpreter;
}
function toInvokeSource(src) {
  if (typeof src === "string") {
    var simpleSrc = {
      type: src,
    };
    simpleSrc.toString = function () {
      return src;
    };
    return simpleSrc;
  }
  return src;
}
function toInvokeDefinition(invokeConfig) {
  return __assign(
    __assign(
      {
        type: invoke,
      },
      invokeConfig
    ),
    {
      toJSON: function () {
        invokeConfig.onDone;
        invokeConfig.onError;
        var invokeDef = __rest(invokeConfig, ["onDone", "onError"]);
        return __assign(__assign({}, invokeDef), {
          type: invoke,
          src: toInvokeSource(invokeConfig.src),
        });
      },
    }
  );
}
var NULL_EVENT = "";
var STATE_IDENTIFIER = "#";
var WILDCARD = "*";
var EMPTY_OBJECT = {};
var isStateId = function (str) {
  return str[0] === STATE_IDENTIFIER;
};
var createDefaultOptions = function () {
  return {
    actions: {},
    guards: {},
    services: {},
    activities: {},
    delays: {},
  };
};
var validateArrayifiedTransitions = function (stateNode, event, transitions) {
  var hasNonLastUnguardedTarget = transitions
    .slice(0, -1)
    .some(function (transition) {
      return (
        !("cond" in transition) &&
        !("in" in transition) &&
        (isString(transition.target) || isMachine(transition.target))
      );
    });
  var eventText =
    event === NULL_EVENT ? "the transient event" : "event '".concat(event, "'");
  warn(
    !hasNonLastUnguardedTarget,
    "One or more transitions for "
      .concat(eventText, " on state '")
      .concat(stateNode.id, "' are unreachable. ") +
      "Make sure that the default transition is the last one defined."
  );
};
var StateNode = /* @__PURE__ */ (function () {
  function StateNode2(config, options, _context, _stateInfo) {
    var _this = this;
    if (_context === void 0) {
      _context = "context" in config ? config.context : void 0;
    }
    var _a2;
    this.config = config;
    this._context = _context;
    this.order = -1;
    this.__xstatenode = true;
    this.__cache = {
      events: void 0,
      relativeValue: /* @__PURE__ */ new Map(),
      initialStateValue: void 0,
      initialState: void 0,
      on: void 0,
      transitions: void 0,
      candidates: {},
      delayedTransitions: void 0,
    };
    this.idMap = {};
    this.tags = [];
    this.options = Object.assign(createDefaultOptions(), options);
    this.parent =
      _stateInfo === null || _stateInfo === void 0 ? void 0 : _stateInfo.parent;
    this.key =
      this.config.key ||
      (_stateInfo === null || _stateInfo === void 0
        ? void 0
        : _stateInfo.key) ||
      this.config.id ||
      "(machine)";
    this.machine = this.parent ? this.parent.machine : this;
    this.path = this.parent ? this.parent.path.concat(this.key) : [];
    this.delimiter =
      this.config.delimiter ||
      (this.parent ? this.parent.delimiter : STATE_DELIMITER);
    this.id =
      this.config.id ||
      __spreadArray([this.machine.key], __read(this.path), false).join(
        this.delimiter
      );
    this.version = this.parent ? this.parent.version : this.config.version;
    this.type =
      this.config.type ||
      (this.config.parallel
        ? "parallel"
        : this.config.states && Object.keys(this.config.states).length
        ? "compound"
        : this.config.history
        ? "history"
        : "atomic");
    this.schema = this.parent
      ? this.machine.schema
      : (_a2 = this.config.schema) !== null && _a2 !== void 0
      ? _a2
      : {};
    this.description = this.config.description;
    this.initial = this.config.initial;
    this.states = this.config.states
      ? mapValues(this.config.states, function (stateConfig, key) {
          var _a3;
          var stateNode = new StateNode2(stateConfig, {}, void 0, {
            parent: _this,
            key,
          });
          Object.assign(
            _this.idMap,
            __assign(
              ((_a3 = {}), (_a3[stateNode.id] = stateNode), _a3),
              stateNode.idMap
            )
          );
          return stateNode;
        })
      : EMPTY_OBJECT;
    var order = 0;
    function dfs(stateNode) {
      var e_1, _a3;
      stateNode.order = order++;
      try {
        for (
          var _b = __values(getChildren(stateNode)), _c = _b.next();
          !_c.done;
          _c = _b.next()
        ) {
          var child = _c.value;
          dfs(child);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1,
        };
      } finally {
        try {
          if (_c && !_c.done && (_a3 = _b.return)) _a3.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }
    dfs(this);
    this.history =
      this.config.history === true ? "shallow" : this.config.history || false;
    this._transient =
      !!this.config.always ||
      (!this.config.on
        ? false
        : Array.isArray(this.config.on)
        ? this.config.on.some(function (_a3) {
            var event = _a3.event;
            return event === NULL_EVENT;
          })
        : NULL_EVENT in this.config.on);
    this.strict = !!this.config.strict;
    this.onEntry = toArray(this.config.entry || this.config.onEntry).map(
      function (action) {
        return toActionObject(action);
      }
    );
    this.onExit = toArray(this.config.exit || this.config.onExit).map(function (
      action
    ) {
      return toActionObject(action);
    });
    this.meta = this.config.meta;
    this.doneData = this.type === "final" ? this.config.data : void 0;
    this.invoke = toArray(this.config.invoke).map(function (invokeConfig, i) {
      var _a3, _b;
      if (isMachine(invokeConfig)) {
        var invokeId = createInvokeId(_this.id, i);
        _this.machine.options.services = __assign(
          ((_a3 = {}), (_a3[invokeId] = invokeConfig), _a3),
          _this.machine.options.services
        );
        return toInvokeDefinition({
          src: invokeId,
          id: invokeId,
        });
      } else if (isString(invokeConfig.src)) {
        var invokeId = invokeConfig.id || createInvokeId(_this.id, i);
        return toInvokeDefinition(
          __assign(__assign({}, invokeConfig), {
            id: invokeId,
            src: invokeConfig.src,
          })
        );
      } else if (isMachine(invokeConfig.src) || isFunction(invokeConfig.src)) {
        var invokeId = invokeConfig.id || createInvokeId(_this.id, i);
        _this.machine.options.services = __assign(
          ((_b = {}), (_b[invokeId] = invokeConfig.src), _b),
          _this.machine.options.services
        );
        return toInvokeDefinition(
          __assign(
            __assign(
              {
                id: invokeId,
              },
              invokeConfig
            ),
            {
              src: invokeId,
            }
          )
        );
      } else {
        var invokeSource = invokeConfig.src;
        return toInvokeDefinition(
          __assign(
            __assign(
              {
                id: createInvokeId(_this.id, i),
              },
              invokeConfig
            ),
            {
              src: invokeSource,
            }
          )
        );
      }
    });
    this.activities = toArray(this.config.activities)
      .concat(this.invoke)
      .map(function (activity) {
        return toActivityDefinition(activity);
      });
    this.transition = this.transition.bind(this);
    this.tags = toArray(this.config.tags);
  }
  StateNode2.prototype._init = function () {
    if (this.__cache.transitions) {
      return;
    }
    getAllStateNodes(this).forEach(function (stateNode) {
      return stateNode.on;
    });
  };
  StateNode2.prototype.withConfig = function (options, context) {
    var _a2 = this.options,
      actions2 = _a2.actions,
      activities = _a2.activities,
      guards = _a2.guards,
      services = _a2.services,
      delays = _a2.delays;
    return new StateNode2(
      this.config,
      {
        actions: __assign(__assign({}, actions2), options.actions),
        activities: __assign(__assign({}, activities), options.activities),
        guards: __assign(__assign({}, guards), options.guards),
        services: __assign(__assign({}, services), options.services),
        delays: __assign(__assign({}, delays), options.delays),
      },
      context !== null && context !== void 0 ? context : this.context
    );
  };
  StateNode2.prototype.withContext = function (context) {
    return new StateNode2(this.config, this.options, context);
  };
  Object.defineProperty(StateNode2.prototype, "context", {
    get: function () {
      return isFunction(this._context) ? this._context() : this._context;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(StateNode2.prototype, "definition", {
    get: function () {
      return {
        id: this.id,
        key: this.key,
        version: this.version,
        context: this.context,
        type: this.type,
        initial: this.initial,
        history: this.history,
        states: mapValues(this.states, function (state) {
          return state.definition;
        }),
        on: this.on,
        transitions: this.transitions,
        entry: this.onEntry,
        exit: this.onExit,
        activities: this.activities || [],
        meta: this.meta,
        order: this.order || -1,
        data: this.doneData,
        invoke: this.invoke,
        description: this.description,
        tags: this.tags,
      };
    },
    enumerable: false,
    configurable: true,
  });
  StateNode2.prototype.toJSON = function () {
    return this.definition;
  };
  Object.defineProperty(StateNode2.prototype, "on", {
    get: function () {
      if (this.__cache.on) {
        return this.__cache.on;
      }
      var transitions = this.transitions;
      return (this.__cache.on = transitions.reduce(function (map, transition) {
        map[transition.eventType] = map[transition.eventType] || [];
        map[transition.eventType].push(transition);
        return map;
      }, {}));
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(StateNode2.prototype, "after", {
    get: function () {
      return (
        this.__cache.delayedTransitions ||
        ((this.__cache.delayedTransitions = this.getDelayedTransitions()),
        this.__cache.delayedTransitions)
      );
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(StateNode2.prototype, "transitions", {
    get: function () {
      return (
        this.__cache.transitions ||
        ((this.__cache.transitions = this.formatTransitions()),
        this.__cache.transitions)
      );
    },
    enumerable: false,
    configurable: true,
  });
  StateNode2.prototype.getCandidates = function (eventName) {
    if (this.__cache.candidates[eventName]) {
      return this.__cache.candidates[eventName];
    }
    var transient = eventName === NULL_EVENT;
    var candidates = this.transitions.filter(function (transition) {
      var sameEventType = transition.eventType === eventName;
      return transient
        ? sameEventType
        : sameEventType || transition.eventType === WILDCARD;
    });
    this.__cache.candidates[eventName] = candidates;
    return candidates;
  };
  StateNode2.prototype.getDelayedTransitions = function () {
    var _this = this;
    var afterConfig = this.config.after;
    if (!afterConfig) {
      return [];
    }
    var mutateEntryExit = function (delay, i) {
      var delayRef = isFunction(delay)
        ? "".concat(_this.id, ":delay[").concat(i, "]")
        : delay;
      var eventType = after(delayRef, _this.id);
      _this.onEntry.push(
        send$3(eventType, {
          delay,
        })
      );
      _this.onExit.push(cancel(eventType));
      return eventType;
    };
    var delayedTransitions = isArray(afterConfig)
      ? afterConfig.map(function (transition, i) {
          var eventType = mutateEntryExit(transition.delay, i);
          return __assign(__assign({}, transition), {
            event: eventType,
          });
        })
      : flatten(
          Object.keys(afterConfig).map(function (delay, i) {
            var configTransition = afterConfig[delay];
            var resolvedTransition = isString(configTransition)
              ? {
                  target: configTransition,
                }
              : configTransition;
            var resolvedDelay = !isNaN(+delay) ? +delay : delay;
            var eventType = mutateEntryExit(resolvedDelay, i);
            return toArray(resolvedTransition).map(function (transition) {
              return __assign(__assign({}, transition), {
                event: eventType,
                delay: resolvedDelay,
              });
            });
          })
        );
    return delayedTransitions.map(function (delayedTransition) {
      var delay = delayedTransition.delay;
      return __assign(__assign({}, _this.formatTransition(delayedTransition)), {
        delay,
      });
    });
  };
  StateNode2.prototype.getStateNodes = function (state) {
    var _a2;
    var _this = this;
    if (!state) {
      return [];
    }
    var stateValue =
      state instanceof State
        ? state.value
        : toStateValue(state, this.delimiter);
    if (isString(stateValue)) {
      var initialStateValue = this.getStateNode(stateValue).initial;
      return initialStateValue !== void 0
        ? this.getStateNodes(
            ((_a2 = {}), (_a2[stateValue] = initialStateValue), _a2)
          )
        : [this, this.states[stateValue]];
    }
    var subStateKeys = Object.keys(stateValue);
    var subStateNodes = [this];
    subStateNodes.push.apply(
      subStateNodes,
      __spreadArray(
        [],
        __read(
          flatten(
            subStateKeys.map(function (subStateKey) {
              return _this
                .getStateNode(subStateKey)
                .getStateNodes(stateValue[subStateKey]);
            })
          )
        ),
        false
      )
    );
    return subStateNodes;
  };
  StateNode2.prototype.handles = function (event) {
    var eventType = getEventType(event);
    return this.events.includes(eventType);
  };
  StateNode2.prototype.resolveState = function (state) {
    var stateFromConfig = state instanceof State ? state : State.create(state);
    var configuration = Array.from(
      getConfiguration([], this.getStateNodes(stateFromConfig.value))
    );
    return new State(
      __assign(__assign({}, stateFromConfig), {
        value: this.resolve(stateFromConfig.value),
        configuration,
        done: isInFinalState(configuration, this),
        tags: getTagsFromConfiguration(configuration),
        machine: this.machine,
      })
    );
  };
  StateNode2.prototype.transitionLeafNode = function (
    stateValue,
    state,
    _event
  ) {
    var stateNode = this.getStateNode(stateValue);
    var next = stateNode.next(state, _event);
    if (!next || !next.transitions.length) {
      return this.next(state, _event);
    }
    return next;
  };
  StateNode2.prototype.transitionCompoundNode = function (
    stateValue,
    state,
    _event
  ) {
    var subStateKeys = Object.keys(stateValue);
    var stateNode = this.getStateNode(subStateKeys[0]);
    var next = stateNode._transition(
      stateValue[subStateKeys[0]],
      state,
      _event
    );
    if (!next || !next.transitions.length) {
      return this.next(state, _event);
    }
    return next;
  };
  StateNode2.prototype.transitionParallelNode = function (
    stateValue,
    state,
    _event
  ) {
    var e_2, _a2;
    var transitionMap = {};
    try {
      for (
        var _b = __values(Object.keys(stateValue)), _c = _b.next();
        !_c.done;
        _c = _b.next()
      ) {
        var subStateKey = _c.value;
        var subStateValue = stateValue[subStateKey];
        if (!subStateValue) {
          continue;
        }
        var subStateNode = this.getStateNode(subStateKey);
        var next = subStateNode._transition(subStateValue, state, _event);
        if (next) {
          transitionMap[subStateKey] = next;
        }
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1,
      };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return)) _a2.call(_b);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
    var stateTransitions = Object.keys(transitionMap).map(function (key) {
      return transitionMap[key];
    });
    var enabledTransitions = flatten(
      stateTransitions.map(function (st) {
        return st.transitions;
      })
    );
    var willTransition = stateTransitions.some(function (st) {
      return st.transitions.length > 0;
    });
    if (!willTransition) {
      return this.next(state, _event);
    }
    var entryNodes = flatten(
      stateTransitions.map(function (t) {
        return t.entrySet;
      })
    );
    var configuration = flatten(
      Object.keys(transitionMap).map(function (key) {
        return transitionMap[key].configuration;
      })
    );
    return {
      transitions: enabledTransitions,
      entrySet: entryNodes,
      exitSet: flatten(
        stateTransitions.map(function (t) {
          return t.exitSet;
        })
      ),
      configuration,
      source: state,
      actions: flatten(
        Object.keys(transitionMap).map(function (key) {
          return transitionMap[key].actions;
        })
      ),
    };
  };
  StateNode2.prototype._transition = function (stateValue, state, _event) {
    if (isString(stateValue)) {
      return this.transitionLeafNode(stateValue, state, _event);
    }
    if (Object.keys(stateValue).length === 1) {
      return this.transitionCompoundNode(stateValue, state, _event);
    }
    return this.transitionParallelNode(stateValue, state, _event);
  };
  StateNode2.prototype.getTransitionData = function (state, event) {
    return this._transition(state.value, state, toSCXMLEvent(event));
  };
  StateNode2.prototype.next = function (state, _event) {
    var e_3, _a2;
    var _this = this;
    var eventName = _event.name;
    var actions2 = [];
    var nextStateNodes = [];
    var selectedTransition;
    try {
      for (
        var _b = __values(this.getCandidates(eventName)), _c = _b.next();
        !_c.done;
        _c = _b.next()
      ) {
        var candidate = _c.value;
        var cond = candidate.cond,
          stateIn = candidate.in;
        var resolvedContext = state.context;
        var isInState = stateIn
          ? isString(stateIn) && isStateId(stateIn)
            ? state.matches(
                toStateValue(
                  this.getStateNodeById(stateIn).path,
                  this.delimiter
                )
              )
            : matchesState(
                toStateValue(stateIn, this.delimiter),
                path(this.path.slice(0, -2))(state.value)
              )
          : true;
        var guardPassed = false;
        try {
          guardPassed =
            !cond ||
            evaluateGuard(this.machine, cond, resolvedContext, _event, state);
        } catch (err) {
          throw new Error(
            "Unable to evaluate guard '"
              .concat(cond.name || cond.type, "' in transition for event '")
              .concat(eventName, "' in state node '")
              .concat(this.id, "':\n")
              .concat(err.message)
          );
        }
        if (guardPassed && isInState) {
          if (candidate.target !== void 0) {
            nextStateNodes = candidate.target;
          }
          actions2.push.apply(
            actions2,
            __spreadArray([], __read(candidate.actions), false)
          );
          selectedTransition = candidate;
          break;
        }
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1,
      };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return)) _a2.call(_b);
      } finally {
        if (e_3) throw e_3.error;
      }
    }
    if (!selectedTransition) {
      return void 0;
    }
    if (!nextStateNodes.length) {
      return {
        transitions: [selectedTransition],
        entrySet: [],
        exitSet: [],
        configuration: state.value ? [this] : [],
        source: state,
        actions: actions2,
      };
    }
    var allNextStateNodes = flatten(
      nextStateNodes.map(function (stateNode) {
        return _this.getRelativeStateNodes(stateNode, state.historyValue);
      })
    );
    var isInternal = !!selectedTransition.internal;
    var reentryNodes = isInternal
      ? []
      : flatten(
          allNextStateNodes.map(function (n) {
            return _this.nodesFromChild(n);
          })
        );
    return {
      transitions: [selectedTransition],
      entrySet: reentryNodes,
      exitSet: isInternal ? [] : [this],
      configuration: allNextStateNodes,
      source: state,
      actions: actions2,
    };
  };
  StateNode2.prototype.nodesFromChild = function (childStateNode) {
    if (childStateNode.escapes(this)) {
      return [];
    }
    var nodes = [];
    var marker = childStateNode;
    while (marker && marker !== this) {
      nodes.push(marker);
      marker = marker.parent;
    }
    nodes.push(this);
    return nodes;
  };
  StateNode2.prototype.escapes = function (stateNode) {
    if (this === stateNode) {
      return false;
    }
    var parent = this.parent;
    while (parent) {
      if (parent === stateNode) {
        return false;
      }
      parent = parent.parent;
    }
    return true;
  };
  StateNode2.prototype.getActions = function (
    transition,
    currentContext,
    _event,
    prevState
  ) {
    var e_4, _a2, e_5, _b;
    var prevConfig = getConfiguration(
      [],
      prevState ? this.getStateNodes(prevState.value) : [this]
    );
    var resolvedConfig = transition.configuration.length
      ? getConfiguration(prevConfig, transition.configuration)
      : prevConfig;
    try {
      for (
        var resolvedConfig_1 = __values(resolvedConfig),
          resolvedConfig_1_1 = resolvedConfig_1.next();
        !resolvedConfig_1_1.done;
        resolvedConfig_1_1 = resolvedConfig_1.next()
      ) {
        var sn = resolvedConfig_1_1.value;
        if (!has(prevConfig, sn)) {
          transition.entrySet.push(sn);
        }
      }
    } catch (e_4_1) {
      e_4 = {
        error: e_4_1,
      };
    } finally {
      try {
        if (
          resolvedConfig_1_1 &&
          !resolvedConfig_1_1.done &&
          (_a2 = resolvedConfig_1.return)
        )
          _a2.call(resolvedConfig_1);
      } finally {
        if (e_4) throw e_4.error;
      }
    }
    try {
      for (
        var prevConfig_1 = __values(prevConfig),
          prevConfig_1_1 = prevConfig_1.next();
        !prevConfig_1_1.done;
        prevConfig_1_1 = prevConfig_1.next()
      ) {
        var sn = prevConfig_1_1.value;
        if (!has(resolvedConfig, sn) || has(transition.exitSet, sn.parent)) {
          transition.exitSet.push(sn);
        }
      }
    } catch (e_5_1) {
      e_5 = {
        error: e_5_1,
      };
    } finally {
      try {
        if (
          prevConfig_1_1 &&
          !prevConfig_1_1.done &&
          (_b = prevConfig_1.return)
        )
          _b.call(prevConfig_1);
      } finally {
        if (e_5) throw e_5.error;
      }
    }
    var doneEvents = flatten(
      transition.entrySet.map(function (sn2) {
        var events = [];
        if (sn2.type !== "final") {
          return events;
        }
        var parent = sn2.parent;
        if (!parent.parent) {
          return events;
        }
        events.push(
          done(sn2.id, sn2.doneData),
          done(
            parent.id,
            sn2.doneData
              ? mapContext(sn2.doneData, currentContext, _event)
              : void 0
          )
        );
        var grandparent = parent.parent;
        if (grandparent.type === "parallel") {
          if (
            getChildren(grandparent).every(function (parentNode) {
              return isInFinalState(transition.configuration, parentNode);
            })
          ) {
            events.push(done(grandparent.id));
          }
        }
        return events;
      })
    );
    transition.exitSet.sort(function (a, b) {
      return b.order - a.order;
    });
    transition.entrySet.sort(function (a, b) {
      return a.order - b.order;
    });
    var entryStates = new Set(transition.entrySet);
    var exitStates = new Set(transition.exitSet);
    var _c = __read(
        [
          flatten(
            Array.from(entryStates).map(function (stateNode) {
              return __spreadArray(
                __spreadArray(
                  [],
                  __read(
                    stateNode.activities.map(function (activity) {
                      return start(activity);
                    })
                  ),
                  false
                ),
                __read(stateNode.onEntry),
                false
              );
            })
          ).concat(doneEvents.map(raise)),
          flatten(
            Array.from(exitStates).map(function (stateNode) {
              return __spreadArray(
                __spreadArray([], __read(stateNode.onExit), false),
                __read(
                  stateNode.activities.map(function (activity) {
                    return stop(activity);
                  })
                ),
                false
              );
            })
          ),
        ],
        2
      ),
      entryActions = _c[0],
      exitActions = _c[1];
    var actions2 = toActionObjects(
      exitActions.concat(transition.actions).concat(entryActions),
      this.machine.options.actions
    );
    return actions2;
  };
  StateNode2.prototype.transition = function (state, event, context) {
    if (state === void 0) {
      state = this.initialState;
    }
    var _event = toSCXMLEvent(event);
    var currentState;
    if (state instanceof State) {
      currentState =
        context === void 0
          ? state
          : this.resolveState(State.from(state, context));
    } else {
      var resolvedStateValue = isString(state)
        ? this.resolve(pathToStateValue(this.getResolvedPath(state)))
        : this.resolve(state);
      var resolvedContext =
        context !== null && context !== void 0 ? context : this.machine.context;
      currentState = this.resolveState(
        State.from(resolvedStateValue, resolvedContext)
      );
    }
    if (!IS_PRODUCTION && _event.name === WILDCARD) {
      throw new Error(
        "An event cannot have the wildcard type ('".concat(WILDCARD, "')")
      );
    }
    if (this.strict) {
      if (!this.events.includes(_event.name) && !isBuiltInEvent(_event.name)) {
        throw new Error(
          "Machine '"
            .concat(this.id, "' does not accept event '")
            .concat(_event.name, "'")
        );
      }
    }
    var stateTransition = this._transition(
      currentState.value,
      currentState,
      _event
    ) || {
      transitions: [],
      configuration: [],
      entrySet: [],
      exitSet: [],
      source: currentState,
      actions: [],
    };
    var prevConfig = getConfiguration(
      [],
      this.getStateNodes(currentState.value)
    );
    var resolvedConfig = stateTransition.configuration.length
      ? getConfiguration(prevConfig, stateTransition.configuration)
      : prevConfig;
    stateTransition.configuration = __spreadArray(
      [],
      __read(resolvedConfig),
      false
    );
    return this.resolveTransition(
      stateTransition,
      currentState,
      currentState.context,
      _event
    );
  };
  StateNode2.prototype.resolveRaisedTransition = function (
    state,
    _event,
    originalEvent
  ) {
    var _a2;
    var currentActions = state.actions;
    state = this.transition(state, _event);
    state._event = originalEvent;
    state.event = originalEvent.data;
    (_a2 = state.actions).unshift.apply(
      _a2,
      __spreadArray([], __read(currentActions), false)
    );
    return state;
  };
  StateNode2.prototype.resolveTransition = function (
    stateTransition,
    currentState,
    context,
    _event
  ) {
    var e_6, _a2;
    var _this = this;
    if (_event === void 0) {
      _event = initEvent;
    }
    var configuration = stateTransition.configuration;
    var willTransition =
      !currentState || stateTransition.transitions.length > 0;
    var resolvedStateValue = willTransition
      ? getValue(this.machine, configuration)
      : void 0;
    var historyValue = currentState
      ? currentState.historyValue
        ? currentState.historyValue
        : stateTransition.source
        ? this.machine.historyValue(currentState.value)
        : void 0
      : void 0;
    var actions2 = this.getActions(
      stateTransition,
      context,
      _event,
      currentState
    );
    var activities = currentState ? __assign({}, currentState.activities) : {};
    try {
      for (
        var actions_1 = __values(actions2), actions_1_1 = actions_1.next();
        !actions_1_1.done;
        actions_1_1 = actions_1.next()
      ) {
        var action = actions_1_1.value;
        if (action.type === start$1) {
          activities[action.activity.id || action.activity.type] = action;
        } else if (action.type === stop$1) {
          activities[action.activity.id || action.activity.type] = false;
        }
      }
    } catch (e_6_1) {
      e_6 = {
        error: e_6_1,
      };
    } finally {
      try {
        if (actions_1_1 && !actions_1_1.done && (_a2 = actions_1.return))
          _a2.call(actions_1);
      } finally {
        if (e_6) throw e_6.error;
      }
    }
    var _b = __read(
        resolveActions(
          this,
          currentState,
          context,
          _event,
          actions2,
          this.machine.config.preserveActionOrder
        ),
        2
      ),
      resolvedActions = _b[0],
      updatedContext = _b[1];
    var _c = __read(
        partition(resolvedActions, function (action2) {
          return (
            action2.type === raise$1 ||
            (action2.type === send$4 && action2.to === SpecialTargets.Internal)
          );
        }),
        2
      ),
      raisedEvents = _c[0],
      nonRaisedActions = _c[1];
    var invokeActions = resolvedActions.filter(function (action2) {
      var _a3;
      return (
        action2.type === start$1 &&
        ((_a3 = action2.activity) === null || _a3 === void 0
          ? void 0
          : _a3.type) === invoke
      );
    });
    var children2 = invokeActions.reduce(
      function (acc, action2) {
        acc[action2.activity.id] = createInvocableActor(
          action2.activity,
          _this.machine,
          updatedContext,
          _event
        );
        return acc;
      },
      currentState ? __assign({}, currentState.children) : {}
    );
    var resolvedConfiguration = willTransition
      ? stateTransition.configuration
      : currentState
      ? currentState.configuration
      : [];
    var isDone = isInFinalState(resolvedConfiguration, this);
    var nextState = new State({
      value: resolvedStateValue || currentState.value,
      context: updatedContext,
      _event,
      _sessionid: currentState ? currentState._sessionid : null,
      historyValue: resolvedStateValue
        ? historyValue
          ? updateHistoryValue(historyValue, resolvedStateValue)
          : void 0
        : currentState
        ? currentState.historyValue
        : void 0,
      history:
        !resolvedStateValue || stateTransition.source ? currentState : void 0,
      actions: resolvedStateValue ? nonRaisedActions : [],
      activities: resolvedStateValue
        ? activities
        : currentState
        ? currentState.activities
        : {},
      events: [],
      configuration: resolvedConfiguration,
      transitions: stateTransition.transitions,
      children: children2,
      done: isDone,
      tags:
        currentState === null || currentState === void 0
          ? void 0
          : currentState.tags,
      machine: this,
    });
    var didUpdateContext = context !== updatedContext;
    nextState.changed = _event.name === update || didUpdateContext;
    var history = nextState.history;
    if (history) {
      delete history.history;
    }
    var isTransient =
      !isDone &&
      (this._transient ||
        configuration.some(function (stateNode) {
          return stateNode._transient;
        }));
    if (!willTransition && (!isTransient || _event.name === NULL_EVENT)) {
      return nextState;
    }
    var maybeNextState = nextState;
    if (!isDone) {
      if (isTransient) {
        maybeNextState = this.resolveRaisedTransition(
          maybeNextState,
          {
            type: nullEvent,
          },
          _event
        );
      }
      while (raisedEvents.length) {
        var raisedEvent = raisedEvents.shift();
        maybeNextState = this.resolveRaisedTransition(
          maybeNextState,
          raisedEvent._event,
          _event
        );
      }
    }
    var changed =
      maybeNextState.changed ||
      (history
        ? !!maybeNextState.actions.length ||
          didUpdateContext ||
          typeof history.value !== typeof maybeNextState.value ||
          !stateValuesEqual(maybeNextState.value, history.value)
        : void 0);
    maybeNextState.changed = changed;
    maybeNextState.history = history;
    maybeNextState.tags = getTagsFromConfiguration(
      maybeNextState.configuration
    );
    return maybeNextState;
  };
  StateNode2.prototype.getStateNode = function (stateKey) {
    if (isStateId(stateKey)) {
      return this.machine.getStateNodeById(stateKey);
    }
    if (!this.states) {
      throw new Error(
        "Unable to retrieve child state '"
          .concat(stateKey, "' from '")
          .concat(this.id, "'; no child states exist.")
      );
    }
    var result = this.states[stateKey];
    if (!result) {
      throw new Error(
        "Child state '"
          .concat(stateKey, "' does not exist on '")
          .concat(this.id, "'")
      );
    }
    return result;
  };
  StateNode2.prototype.getStateNodeById = function (stateId) {
    var resolvedStateId = isStateId(stateId)
      ? stateId.slice(STATE_IDENTIFIER.length)
      : stateId;
    if (resolvedStateId === this.id) {
      return this;
    }
    var stateNode = this.machine.idMap[resolvedStateId];
    if (!stateNode) {
      throw new Error(
        "Child state node '#"
          .concat(resolvedStateId, "' does not exist on machine '")
          .concat(this.id, "'")
      );
    }
    return stateNode;
  };
  StateNode2.prototype.getStateNodeByPath = function (statePath) {
    if (typeof statePath === "string" && isStateId(statePath)) {
      try {
        return this.getStateNodeById(statePath.slice(1));
      } catch (e) {}
    }
    var arrayStatePath = toStatePath(statePath, this.delimiter).slice();
    var currentStateNode = this;
    while (arrayStatePath.length) {
      var key = arrayStatePath.shift();
      if (!key.length) {
        break;
      }
      currentStateNode = currentStateNode.getStateNode(key);
    }
    return currentStateNode;
  };
  StateNode2.prototype.resolve = function (stateValue) {
    var _a2;
    var _this = this;
    if (!stateValue) {
      return this.initialStateValue || EMPTY_OBJECT;
    }
    switch (this.type) {
      case "parallel":
        return mapValues(
          this.initialStateValue,
          function (subStateValue, subStateKey) {
            return subStateValue
              ? _this
                  .getStateNode(subStateKey)
                  .resolve(stateValue[subStateKey] || subStateValue)
              : EMPTY_OBJECT;
          }
        );
      case "compound":
        if (isString(stateValue)) {
          var subStateNode = this.getStateNode(stateValue);
          if (
            subStateNode.type === "parallel" ||
            subStateNode.type === "compound"
          ) {
            return (
              (_a2 = {}),
              (_a2[stateValue] = subStateNode.initialStateValue),
              _a2
            );
          }
          return stateValue;
        }
        if (!Object.keys(stateValue).length) {
          return this.initialStateValue || {};
        }
        return mapValues(stateValue, function (subStateValue, subStateKey) {
          return subStateValue
            ? _this.getStateNode(subStateKey).resolve(subStateValue)
            : EMPTY_OBJECT;
        });
      default:
        return stateValue || EMPTY_OBJECT;
    }
  };
  StateNode2.prototype.getResolvedPath = function (stateIdentifier) {
    if (isStateId(stateIdentifier)) {
      var stateNode =
        this.machine.idMap[stateIdentifier.slice(STATE_IDENTIFIER.length)];
      if (!stateNode) {
        throw new Error(
          "Unable to find state node '".concat(stateIdentifier, "'")
        );
      }
      return stateNode.path;
    }
    return toStatePath(stateIdentifier, this.delimiter);
  };
  Object.defineProperty(StateNode2.prototype, "initialStateValue", {
    get: function () {
      var _a2;
      if (this.__cache.initialStateValue) {
        return this.__cache.initialStateValue;
      }
      var initialStateValue;
      if (this.type === "parallel") {
        initialStateValue = mapFilterValues(
          this.states,
          function (state) {
            return state.initialStateValue || EMPTY_OBJECT;
          },
          function (stateNode) {
            return !(stateNode.type === "history");
          }
        );
      } else if (this.initial !== void 0) {
        if (!this.states[this.initial]) {
          throw new Error(
            "Initial state '"
              .concat(this.initial, "' not found on '")
              .concat(this.key, "'")
          );
        }
        initialStateValue = isLeafNode(this.states[this.initial])
          ? this.initial
          : ((_a2 = {}),
            (_a2[this.initial] = this.states[this.initial].initialStateValue),
            _a2);
      } else {
        initialStateValue = {};
      }
      this.__cache.initialStateValue = initialStateValue;
      return this.__cache.initialStateValue;
    },
    enumerable: false,
    configurable: true,
  });
  StateNode2.prototype.getInitialState = function (stateValue, context) {
    this._init();
    var configuration = this.getStateNodes(stateValue);
    return this.resolveTransition(
      {
        configuration,
        entrySet: configuration,
        exitSet: [],
        transitions: [],
        source: void 0,
        actions: [],
      },
      void 0,
      context !== null && context !== void 0 ? context : this.machine.context,
      void 0
    );
  };
  Object.defineProperty(StateNode2.prototype, "initialState", {
    get: function () {
      var initialStateValue = this.initialStateValue;
      if (!initialStateValue) {
        throw new Error(
          "Cannot retrieve initial state from simple state '".concat(
            this.id,
            "'."
          )
        );
      }
      return this.getInitialState(initialStateValue);
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(StateNode2.prototype, "target", {
    get: function () {
      var target;
      if (this.type === "history") {
        var historyConfig = this.config;
        if (isString(historyConfig.target)) {
          target = isStateId(historyConfig.target)
            ? pathToStateValue(
                this.machine
                  .getStateNodeById(historyConfig.target)
                  .path.slice(this.path.length - 1)
              )
            : historyConfig.target;
        } else {
          target = historyConfig.target;
        }
      }
      return target;
    },
    enumerable: false,
    configurable: true,
  });
  StateNode2.prototype.getRelativeStateNodes = function (
    relativeStateId,
    historyValue,
    resolve2
  ) {
    if (resolve2 === void 0) {
      resolve2 = true;
    }
    return resolve2
      ? relativeStateId.type === "history"
        ? relativeStateId.resolveHistory(historyValue)
        : relativeStateId.initialStateNodes
      : [relativeStateId];
  };
  Object.defineProperty(StateNode2.prototype, "initialStateNodes", {
    get: function () {
      var _this = this;
      if (isLeafNode(this)) {
        return [this];
      }
      if (this.type === "compound" && !this.initial) {
        if (!IS_PRODUCTION) {
          warn(
            false,
            "Compound state node '".concat(this.id, "' has no initial state.")
          );
        }
        return [this];
      }
      var initialStateNodePaths = toStatePaths(this.initialStateValue);
      return flatten(
        initialStateNodePaths.map(function (initialPath) {
          return _this.getFromRelativePath(initialPath);
        })
      );
    },
    enumerable: false,
    configurable: true,
  });
  StateNode2.prototype.getFromRelativePath = function (relativePath) {
    if (!relativePath.length) {
      return [this];
    }
    var _a2 = __read(relativePath),
      stateKey = _a2[0],
      childStatePath = _a2.slice(1);
    if (!this.states) {
      throw new Error(
        "Cannot retrieve subPath '".concat(
          stateKey,
          "' from node with no states"
        )
      );
    }
    var childStateNode = this.getStateNode(stateKey);
    if (childStateNode.type === "history") {
      return childStateNode.resolveHistory();
    }
    if (!this.states[stateKey]) {
      throw new Error(
        "Child state '"
          .concat(stateKey, "' does not exist on '")
          .concat(this.id, "'")
      );
    }
    return this.states[stateKey].getFromRelativePath(childStatePath);
  };
  StateNode2.prototype.historyValue = function (relativeStateValue) {
    if (!Object.keys(this.states).length) {
      return void 0;
    }
    return {
      current: relativeStateValue || this.initialStateValue,
      states: mapFilterValues(
        this.states,
        function (stateNode, key) {
          if (!relativeStateValue) {
            return stateNode.historyValue();
          }
          var subStateValue = isString(relativeStateValue)
            ? void 0
            : relativeStateValue[key];
          return stateNode.historyValue(
            subStateValue || stateNode.initialStateValue
          );
        },
        function (stateNode) {
          return !stateNode.history;
        }
      ),
    };
  };
  StateNode2.prototype.resolveHistory = function (historyValue) {
    var _this = this;
    if (this.type !== "history") {
      return [this];
    }
    var parent = this.parent;
    if (!historyValue) {
      var historyTarget = this.target;
      return historyTarget
        ? flatten(
            toStatePaths(historyTarget).map(function (relativeChildPath) {
              return parent.getFromRelativePath(relativeChildPath);
            })
          )
        : parent.initialStateNodes;
    }
    var subHistoryValue = nestedPath(
      parent.path,
      "states"
    )(historyValue).current;
    if (isString(subHistoryValue)) {
      return [parent.getStateNode(subHistoryValue)];
    }
    return flatten(
      toStatePaths(subHistoryValue).map(function (subStatePath) {
        return _this.history === "deep"
          ? parent.getFromRelativePath(subStatePath)
          : [parent.states[subStatePath[0]]];
      })
    );
  };
  Object.defineProperty(StateNode2.prototype, "stateIds", {
    get: function () {
      var _this = this;
      var childStateIds = flatten(
        Object.keys(this.states).map(function (stateKey) {
          return _this.states[stateKey].stateIds;
        })
      );
      return [this.id].concat(childStateIds);
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(StateNode2.prototype, "events", {
    get: function () {
      var e_7, _a2, e_8, _b;
      if (this.__cache.events) {
        return this.__cache.events;
      }
      var states2 = this.states;
      var events = new Set(this.ownEvents);
      if (states2) {
        try {
          for (
            var _c = __values(Object.keys(states2)), _d = _c.next();
            !_d.done;
            _d = _c.next()
          ) {
            var stateId = _d.value;
            var state = states2[stateId];
            if (state.states) {
              try {
                for (
                  var _e = ((e_8 = void 0), __values(state.events)),
                    _f = _e.next();
                  !_f.done;
                  _f = _e.next()
                ) {
                  var event_1 = _f.value;
                  events.add("".concat(event_1));
                }
              } catch (e_8_1) {
                e_8 = {
                  error: e_8_1,
                };
              } finally {
                try {
                  if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                } finally {
                  if (e_8) throw e_8.error;
                }
              }
            }
          }
        } catch (e_7_1) {
          e_7 = {
            error: e_7_1,
          };
        } finally {
          try {
            if (_d && !_d.done && (_a2 = _c.return)) _a2.call(_c);
          } finally {
            if (e_7) throw e_7.error;
          }
        }
      }
      return (this.__cache.events = Array.from(events));
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(StateNode2.prototype, "ownEvents", {
    get: function () {
      var events = new Set(
        this.transitions
          .filter(function (transition) {
            return !(
              !transition.target &&
              !transition.actions.length &&
              transition.internal
            );
          })
          .map(function (transition) {
            return transition.eventType;
          })
      );
      return Array.from(events);
    },
    enumerable: false,
    configurable: true,
  });
  StateNode2.prototype.resolveTarget = function (_target) {
    var _this = this;
    if (_target === void 0) {
      return void 0;
    }
    return _target.map(function (target) {
      if (!isString(target)) {
        return target;
      }
      var isInternalTarget = target[0] === _this.delimiter;
      if (isInternalTarget && !_this.parent) {
        return _this.getStateNodeByPath(target.slice(1));
      }
      var resolvedTarget = isInternalTarget ? _this.key + target : target;
      if (_this.parent) {
        try {
          var targetStateNode = _this.parent.getStateNodeByPath(resolvedTarget);
          return targetStateNode;
        } catch (err) {
          throw new Error(
            "Invalid transition definition for state node '"
              .concat(_this.id, "':\n")
              .concat(err.message)
          );
        }
      } else {
        return _this.getStateNodeByPath(resolvedTarget);
      }
    });
  };
  StateNode2.prototype.formatTransition = function (transitionConfig) {
    var _this = this;
    var normalizedTarget = normalizeTarget(transitionConfig.target);
    var internal =
      "internal" in transitionConfig
        ? transitionConfig.internal
        : normalizedTarget
        ? normalizedTarget.some(function (_target) {
            return isString(_target) && _target[0] === _this.delimiter;
          })
        : true;
    var guards = this.machine.options.guards;
    var target = this.resolveTarget(normalizedTarget);
    var transition = __assign(__assign({}, transitionConfig), {
      actions: toActionObjects(toArray(transitionConfig.actions)),
      cond: toGuard(transitionConfig.cond, guards),
      target,
      source: this,
      internal,
      eventType: transitionConfig.event,
      toJSON: function () {
        return __assign(__assign({}, transition), {
          target: transition.target
            ? transition.target.map(function (t) {
                return "#".concat(t.id);
              })
            : void 0,
          source: "#".concat(_this.id),
        });
      },
    });
    return transition;
  };
  StateNode2.prototype.formatTransitions = function () {
    var e_9, _a2;
    var _this = this;
    var onConfig;
    if (!this.config.on) {
      onConfig = [];
    } else if (Array.isArray(this.config.on)) {
      onConfig = this.config.on;
    } else {
      var _b = this.config.on,
        _c = WILDCARD,
        _d = _b[_c],
        wildcardConfigs = _d === void 0 ? [] : _d,
        strictTransitionConfigs_1 = __rest(_b, [
          typeof _c === "symbol" ? _c : _c + "",
        ]);
      onConfig = flatten(
        Object.keys(strictTransitionConfigs_1)
          .map(function (key) {
            if (!IS_PRODUCTION && key === NULL_EVENT) {
              warn(
                false,
                "Empty string transition configs (e.g., `{ on: { '': ... }}`) for transient transitions are deprecated. Specify the transition in the `{ always: ... }` property instead. " +
                  'Please check the `on` configuration for "#'.concat(
                    _this.id,
                    '".'
                  )
              );
            }
            var transitionConfigArray = toTransitionConfigArray(
              key,
              strictTransitionConfigs_1[key]
            );
            if (!IS_PRODUCTION) {
              validateArrayifiedTransitions(_this, key, transitionConfigArray);
            }
            return transitionConfigArray;
          })
          .concat(toTransitionConfigArray(WILDCARD, wildcardConfigs))
      );
    }
    var eventlessConfig = this.config.always
      ? toTransitionConfigArray("", this.config.always)
      : [];
    var doneConfig = this.config.onDone
      ? toTransitionConfigArray(String(done(this.id)), this.config.onDone)
      : [];
    if (!IS_PRODUCTION) {
      warn(
        !(this.config.onDone && !this.parent),
        'Root nodes cannot have an ".onDone" transition. Please check the config of "'.concat(
          this.id,
          '".'
        )
      );
    }
    var invokeConfig = flatten(
      this.invoke.map(function (invokeDef) {
        var settleTransitions = [];
        if (invokeDef.onDone) {
          settleTransitions.push.apply(
            settleTransitions,
            __spreadArray(
              [],
              __read(
                toTransitionConfigArray(
                  String(doneInvoke(invokeDef.id)),
                  invokeDef.onDone
                )
              ),
              false
            )
          );
        }
        if (invokeDef.onError) {
          settleTransitions.push.apply(
            settleTransitions,
            __spreadArray(
              [],
              __read(
                toTransitionConfigArray(
                  String(error$1(invokeDef.id)),
                  invokeDef.onError
                )
              ),
              false
            )
          );
        }
        return settleTransitions;
      })
    );
    var delayedTransitions = this.after;
    var formattedTransitions = flatten(
      __spreadArray(
        __spreadArray(
          __spreadArray(
            __spreadArray([], __read(doneConfig), false),
            __read(invokeConfig),
            false
          ),
          __read(onConfig),
          false
        ),
        __read(eventlessConfig),
        false
      ).map(function (transitionConfig) {
        return toArray(transitionConfig).map(function (transition) {
          return _this.formatTransition(transition);
        });
      })
    );
    try {
      for (
        var delayedTransitions_1 = __values(delayedTransitions),
          delayedTransitions_1_1 = delayedTransitions_1.next();
        !delayedTransitions_1_1.done;
        delayedTransitions_1_1 = delayedTransitions_1.next()
      ) {
        var delayedTransition = delayedTransitions_1_1.value;
        formattedTransitions.push(delayedTransition);
      }
    } catch (e_9_1) {
      e_9 = {
        error: e_9_1,
      };
    } finally {
      try {
        if (
          delayedTransitions_1_1 &&
          !delayedTransitions_1_1.done &&
          (_a2 = delayedTransitions_1.return)
        )
          _a2.call(delayedTransitions_1);
      } finally {
        if (e_9) throw e_9.error;
      }
    }
    return formattedTransitions;
  };
  return StateNode2;
})();
function createMachine(config, options) {
  return new StateNode(config, options);
}
var assign$3 = assign$4;
function isActorWithState(actorRef) {
  return "state" in actorRef;
}
var noop = function () {};
function defaultGetSnapshot(actorRef) {
  return "getSnapshot" in actorRef
    ? actorRef.getSnapshot()
    : isActorWithState(actorRef)
    ? actorRef.state
    : void 0;
}
function useActor(actorRef, getSnapshot) {
  if (getSnapshot === void 0) {
    getSnapshot = defaultGetSnapshot;
  }
  var actorRefRef = isRef(actorRef) ? actorRef : shallowRef(actorRef);
  var state = shallowRef(getSnapshot(actorRefRef.value));
  var send2 = function (event) {
    actorRefRef.value.send(event);
  };
  watch(
    actorRefRef,
    function (newActor, _, onCleanup) {
      state.value = getSnapshot(newActor);
      var unsubscribe = newActor.subscribe({
        next: function (emitted) {
          return (state.value = emitted);
        },
        error: noop,
        complete: noop,
      }).unsubscribe;
      onCleanup(function () {
        return unsubscribe();
      });
    },
    {
      immediate: true,
    }
  );
  return { state, send: send2 };
}
const global_transitions = {
  CLOSE: "closed",
  ERROR: "error",
  UPDATE_CONTEXT: {
    actions: assign$3((_, event) => {
      const _a2 = event,
        { type } = _a2,
        newContext = __objRest(_a2, ["type"]);
      return newContext;
    }),
  },
};
const overlayInitialContext = {
  store_id: null,
  product_id: null,
  variant_id: null,
  coupon: null,
  quantity: null,
  product: null,
  variant: null,
  error: null,
};
const closed_state = {
  entry: assign$3(overlayInitialContext),
  on: {
    OPEN: {
      target: "checkout",
      actions: assign$3((_, event) => ({
        store_id: event.store_id,
        product_id: event.product_id,
        variant_id: event.variant_id,
        customization: event.customization,
      })),
    },
  },
};
const error = {
  on: {
    FETCH: "checkout",
  },
};
const entry = {
  on: {
    VARIANT_SELECTION: "variant_selection",
    VARIANT_OVERVIEW: "overview",
  },
  invoke: {
    id: "openingCheckout",
    src: (context) => (send2) => {
      if (!context.store_id || !context.product_id) {
        throw {
          message: "This checkout button is not properly configured.",
          errors: __spreadValues(
            {},
            !context.store_id ? { store_id: [] } : { product_id: [] }
          ),
        };
      }
      send2(!context.variant_id ? "VARIANT_SELECTION" : "VARIANT_OVERVIEW");
    },
  },
};
const BASE_API_URL = "https://sell.app/api/v2/fast-checkout";
function route(url, parameters) {
  for (const [key, value] of Object.entries(parameters)) {
    url = url.replace(`{${key}}`, value);
  }
  return url;
}
function blank(value) {
  if (value === null) {
    return true;
  }
  if (typeof value === "string") {
    return value.trim() === "";
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return false;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === "object") {
    return Object.entries(value).length === 0;
  }
  return !value;
}
function filled(value) {
  return !blank(value);
}
function recordFilter(o, predicate) {
  return Object.fromEntries(
    Object.entries(o).filter((entry2) => {
      const [key, value] = entry2;
      return predicate(value, key);
    })
  );
}
const api = {
  async get(url, query) {
    const compiledUrl = new URL(url);
    if (query) {
      compiledUrl.search = new URLSearchParams(
        recordFilter(query, filled)
      ).toString();
    }
    return await api_fetch(compiledUrl.toString(), {
      headers: {
        Accept: "application/json",
      },
    });
  },
  async post(url, body) {
    return await api_fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recordFilter(body, filled)),
    });
  },
};
const VALIDATION_ERROR_STATUS_CODE = 422;
const FORBIDDEN_STATUS_CODE = 403;
async function api_fetch(url, init2) {
  var _a2, _b;
  const response = await fetch(url, init2);
  if (
    !response.ok &&
    response.status !== VALIDATION_ERROR_STATUS_CODE &&
    response.status !== FORBIDDEN_STATUS_CODE
  ) {
    throw new Error(
      "Oops... Something went wrong while processing your request."
    );
  }
  const jsonResponse = await response.json();
  if (!response.ok) {
    throw {
      code: response.status,
      message: (_a2 = jsonResponse.message) != null ? _a2 : "",
      errors: (_b = jsonResponse.errors) != null ? _b : {},
    };
  }
  return jsonResponse;
}
const API_PATH$2 = `${BASE_API_URL}/{store_id}/{product_id}/{variant_id}`;
async function checkoutProduct(store_id, product_id, variant_id, body) {
  const url = route(API_PATH$2, { store_id, product_id, variant_id });
  return await api.post(url, body);
}
const API_PATH$1 = `${BASE_API_URL}/{store_id}/{product_id}`;
async function fetchProduct(store_id, product_id, query = {}) {
  const url = route(API_PATH$1, { store_id, product_id });
  return await api.get(url, query);
}
const API_PATH = `${BASE_API_URL}/{store_id}/{product_id}/{variant_id}`;
async function fetchProductVariant(
  store_id,
  product_id,
  variant_id,
  parameters = {}
) {
  const url = route(API_PATH, { store_id, product_id, variant_id });
  return await api.get(url, parameters);
}
const { assign: assign$2, pure, send: send$2 } = actions;
const onError = pure((_, event) => {
  const isValidationError =
    typeof event.data === "object" && "errors" in event.data;
  let shouldRedirectToErrorDialog = !isValidationError;
  const error2 = isValidationError
    ? event.data
    : { message: event.data, errors: {} };
  if (
    !isValidationError ||
    "store_id" in error2.errors ||
    "product_id" in error2.errors ||
    "variant_id" in error2.errors ||
    error2.code === 403
  ) {
    if ("store_id" in error2.errors) {
      error2.message = "This store could not be found.";
    } else if ("product_id" in error2.errors) {
      error2.message = "This product could not be found.";
    } else if ("variant_id" in error2.errors) {
      error2.message = "This variant could not be found.";
    } else {
      error2.message = "It looks like something went wrong.";
    }
    error2.message += " Please contact the seller to let them know.";
    if (error2.code === 403) {
      error2.message =
        "You have either been blacklisted by the store owner, or you are using a VPN/Proxy. If you are using a proxy, please disable it.";
    }
    error2.errors = {};
    shouldRedirectToErrorDialog = true;
  }
  const actions2 = [
    assign$2(() => ({
      error: error2,
    })),
  ];
  if (shouldRedirectToErrorDialog) {
    actions2.push(send$2("ERROR"));
  }
  return actions2;
});
const { assign: assign$1, send: send$1 } = actions;
const variant_selection = {
  on: {
    NEXT: {
      target: "overview",
      actions: assign$1((context, event) => ({
        variant_id: event.variant_id,
      })),
    },
  },
  meta: {
    component: "VariantSelection",
  },
  initial: "fetchProductVariantList",
  states: {
    fetchProductVariantList: {
      tags: ["loading"],
      on: {
        FINISH_FETCH: "selectProductVariant",
      },
      invoke: {
        id: "fetchVariantList",
        src: async (context) => {
          var _a2;
          if (
            ((_a2 = context.product) == null ? void 0 : _a2.id.toString()) ===
            context.product_id
          ) {
            return context.product;
          }
          return await fetchProduct(context.store_id, context.product_id);
        },
        onDone: {
          actions: [
            assign$1((context, event) => ({
              product: event.data,
              error: null,
            })),
            send$1((context, event) => {
              if (event.data.variants.length === 1) {
                return {
                  type: "NEXT",
                  variant_id: event.data.variants[0].id.toString(),
                };
              }
              return { type: "FINISH_FETCH" };
            }),
          ],
        },
        onError: {
          target: "#embed.error",
          actions: onError,
        },
      },
    },
    selectProductVariant: {},
  },
};
const { assign, send } = actions;
const overview = {
  on: {
    PREVIOUS: "variant_selection",
    NEXT: "payment_method",
    FETCH: {
      internal: true,
      target: [".fetchStates.fetching"],
    },
    FINISH_FETCH: {
      internal: true,
      target: [".fetchStates.idle", ".overviewStates.idle"],
    },
  },
  meta: {
    component: "Overview",
  },
  type: "parallel",
  states: {
    fetchStates: {
      initial: "fetching",
      states: {
        fetching: {
          tags: ["fetching"],
          invoke: {
            id: "fetchProductVariant",
            src: async (context) => {
              var _a2;
              return {
                product:
                  ((_a2 = context.product) == null
                    ? void 0
                    : _a2.id.toString()) === context.product_id
                    ? context.product
                    : await fetchProduct(context.store_id, context.product_id, {
                        withoutVariants: true,
                      }),
                variant: await fetchProductVariant(
                  context.store_id,
                  context.product_id,
                  context.variant_id,
                  {
                    coupon: context.coupon,
                    quantity: context.quantity,
                    extra: context.extra,
                  }
                ),
              };
            },
            onDone: {
              actions: [
                assign((context, event) => {
                  var _a2;
                  return {
                    product: event.data.product,
                    variant: event.data.variant,
                    quantity:
                      (_a2 = context.quantity) != null
                        ? _a2
                        : event.data.variant.minimum_purchase_quantity,
                    error: null,
                  };
                }),
                send("FINISH_FETCH"),
              ],
            },
            onError: {
              actions: [onError, send("FINISH_FETCH")],
            },
          },
        },
        idle: {},
      },
    },
    overviewStates: {
      initial: "loading",
      states: {
        loading: {
          tags: ["loading"],
        },
        idle: {},
      },
    },
  },
};
const payment_method = {
  on: {
    PREVIOUS: "overview",
    NEXT: "customer_email",
  },
  meta: {
    component: "PaymentMethod",
  },
};
const customer_email = {
  on: {
    PREVIOUS: "payment_method",
  },
  meta: {
    component: "CustomerEmail",
  },
  initial: "enterCustomerEmail",
  states: {
    enterCustomerEmail: {
      on: {
        CHECKOUT: "checkout_product",
      },
    },
    checkout_product: {
      invoke: {
        id: "checkout_product",
        src: async (context) =>
          await checkoutProduct(
            context.store_id,
            context.product_id,
            context.variant_id,
            {
              coupon: context.coupon,
              quantity: context.quantity,
              extra: context.extra,
              customer_email: checkout_information.customer_email,
              payment_method: checkout_information.payment_method,
              additional_information:
                checkout_information.additional_information,
            }
          ),
        onDone: {
          target: "#embed.invoice_processed",
          actions: [
            assign$3((context, event) => ({
              order: event.data.payment_url,
              error: null,
            })),
            (_, event) => {
              window.open(event.data.payment_url, "_blank");
            },
          ],
        },
        onError: {
          target: "#embed.checkout.payment_method",
          actions: onError,
        },
      },
    },
  },
};
const checkout = {
  initial: "entry",
  states: {
    entry,
    variant_selection,
    overview,
    payment_method,
    customer_email,
  },
};
const invoice_processed = {};
const states = {
  closed: closed_state,
  error,
  checkout,
  invoice_processed,
};
const machineConfig = {
  id: "embed",
  initial: "closed",
  context: overlayInitialContext,
  on: global_transitions,
  states,
};
const overlayMachine = createMachine(machineConfig);
const overlayState = interpret(overlayMachine).start();
function useOverlay() {
  const { state, send: send2 } = useActor(overlayState);
  const context = computed(() => state.value.context);
  return {
    context,
    send: send2,
    state,
  };
}
const checkout_information = reactive({
  customer_email: "",
  payment_method: "STRIPE",
  additional_information: {},
});
function render$8(_ctx, _cache) {
  return (
    openBlock(),
    createBlock(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
      },
      [
        createVNode("path", {
          "fill-rule": "evenodd",
          d: "M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z",
          "clip-rule": "evenodd",
        }),
      ]
    )
  );
}
function render$7(_ctx, _cache) {
  return (
    openBlock(),
    createBlock(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
      },
      [
        createVNode("path", {
          "fill-rule": "evenodd",
          d: "M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z",
          "clip-rule": "evenodd",
        }),
      ]
    )
  );
}
function render$6(_ctx, _cache) {
  return (
    openBlock(),
    createBlock(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
      },
      [
        createVNode("path", {
          "fill-rule": "evenodd",
          d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
          "clip-rule": "evenodd",
        }),
      ]
    )
  );
}
function render$5(_ctx, _cache) {
  return (
    openBlock(),
    createBlock(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
      },
      [
        createVNode("path", {
          "fill-rule": "evenodd",
          d: "M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z",
          "clip-rule": "evenodd",
        }),
        createVNode("path", {
          d: "M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z",
        }),
      ]
    )
  );
}
function render$4(_ctx, _cache) {
  return (
    openBlock(),
    createBlock(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
      },
      [
        createVNode("path", {
          d: "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z",
        }),
        createVNode("path", {
          d: "M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z",
        }),
      ]
    )
  );
}
function render$3(_ctx, _cache) {
  return (
    openBlock(),
    createBlock(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
      },
      [
        createVNode("path", {
          "fill-rule": "evenodd",
          d: "M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
          "clip-rule": "evenodd",
        }),
      ]
    )
  );
}
function render$2(_ctx, _cache) {
  return (
    openBlock(),
    createBlock(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
      },
      [
        createVNode("path", {
          "fill-rule": "evenodd",
          d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
          "clip-rule": "evenodd",
        }),
      ]
    )
  );
}
function render$1(_ctx, _cache) {
  return (
    openBlock(),
    createBlock(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
      },
      [
        createVNode("path", {
          "fill-rule": "evenodd",
          d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
          "clip-rule": "evenodd",
        }),
      ]
    )
  );
}
function render(_ctx, _cache) {
  return (
    openBlock(),
    createBlock(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        "stroke-width": "2",
        stroke: "currentColor",
        "aria-hidden": "true",
      },
      [
        createVNode("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        }),
      ]
    )
  );
}
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$e = {
  name: "Spinner",
};
const _hoisted_1$e = {
  class: "sell-animate-spin sell-h-5 sell-w-5",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
};
const _hoisted_2$c = /* @__PURE__ */ createBaseVNode(
  "circle",
  {
    class: "sell-opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4",
  },
  null,
  -1
);
const _hoisted_3$a = /* @__PURE__ */ createBaseVNode(
  "path",
  {
    class: "sell-opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
  },
  null,
  -1
);
const _hoisted_4$7 = [_hoisted_2$c, _hoisted_3$a];
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$e, _hoisted_4$7);
}
var Spinner = /* @__PURE__ */ _export_sfc(_sfc_main$e, [
  ["render", _sfc_render$e],
]);
const _sfc_main$d = defineComponent({
  name: "Button",
  components: {
    Spinner,
  },
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
const _hoisted_1$d = ["disabled"];
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Spinner = resolveComponent("Spinner");
  return (
    openBlock(),
    createElementBlock(
      "button",
      {
        class: normalizeClass([
          "sell-inline-flex sell-items-center sell-justify-center sm:sell-text-sm sell-font-medium sell-px-4 sell-py-2 sell-rounded-md sell-shadow-sm focus:sell-ring-2 focus:sell-outline-none disabled:sell-opacity-75 disabled:sell-cursor-not-allowed",
          {
            "sell-font-semibold sell-transition sell-duration-150 ease-in-out sell-shadow hover:sell-shadow-lg sell-bg-slate-400 dark:sell-bg-slate-700 hover:sell-bg-slate-500 dark:hover:sell-bg-slate-600 sell-text-white":
              typeof _ctx.$attrs.toffee !== "undefined",
            "sell-bg-white hover:sell-bg-slate-50 dark:sell-bg-slate-800 dark:hover:sell-bg-slate-800 sell-text-slate-700 dark:sell-text-slate-50 sell-border sell-border-slate-300 dark:sell-border-slate-900 focus:sell-ring-offset-2 sell-ring-offset-transparent focus:sell-ring-slate-500":
              typeof _ctx.$attrs.outline !== "undefined",
            "sell-bg-red-600 hover:sell-bg-red-700 sell-text-white focus:sell-ring-offset-2 sell-ring-offset-transparent focus:sell-ring-red-500":
              typeof _ctx.$attrs.danger !== "undefined",
          },
        ]),
        disabled: _ctx.disabled || _ctx.loading,
      },
      [
        !_ctx.loading
          ? renderSlot(_ctx.$slots, "default", { key: 0 })
          : (openBlock(), createBlock(_component_Spinner, { key: 1 })),
      ],
      10,
      _hoisted_1$d
    )
  );
}
var Button = /* @__PURE__ */ _export_sfc(_sfc_main$d, [
  ["render", _sfc_render$d],
]);
const _sfc_main$c = defineComponent({
  name: "Navigator",
  components: {
    Button,
  },
  props: {
    back: {
      type: Object,
      required: false,
      default: {
        type: "PREVIOUS",
      },
    },
    next: {
      type: Object,
      required: false,
      default: {
        type: "NEXT",
      },
    },
  },
  setup() {
    const { state, send: send2 } = useOverlay();
    return {
      send: send2,
      state,
    };
  },
});
const _hoisted_1$c = {
  class:
    "sell-mt-6 sell-w-full sell-justify-between sell-flex sell-items-center sell-col-span-2 sell-space-x-2",
};
const _hoisted_2$b = /* @__PURE__ */ createTextVNode("Back");
const _hoisted_3$9 = /* @__PURE__ */ createTextVNode("Continue");
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Button = resolveComponent("Button");
  return (
    openBlock(),
    createElementBlock("div", _hoisted_1$c, [
      createVNode(
        _component_Button,
        {
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.send(_ctx.back)),
          class:
            "sell-w-24 sell-outline-none focus:sell-ring-0 sell-shadow-lg hover:sell-shadow-xl hover:sell-bg-slate-50 dark:hover:sell-bg-black dark:sell-bg-slate-800 dark:sell-text-white",
          disabled: _ctx.state.hasTag("loading"),
        },
        {
          default: withCtx(() => [_hoisted_2$b]),
          _: 1,
        },
        8,
        ["disabled"]
      ),
      createVNode(
        _component_Button,
        {
          loading: _ctx.state.hasTag("loading"),
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.send(_ctx.next)),
          class: "sell-w-24",
          style: normalizeStyle({
            "background-color": _ctx.state.context.customization.theme,
          }),
          toffee: "",
        },
        {
          default: withCtx(() => [_hoisted_3$9]),
          _: 1,
        },
        8,
        ["loading", "style"]
      ),
    ])
  );
}
var Navigator = /* @__PURE__ */ _export_sfc(_sfc_main$c, [
  ["render", _sfc_render$c],
]);
const _sfc_main$b = defineComponent({
  name: "VariantSelection",
  components: {
    Navigator,
    RadioGroup: wi,
    RadioGroupDescription: ki,
    RadioGroupLabel: Mi,
    RadioGroupOption: Li,
    DialogTitle: qr,
    Button,
  },
  setup() {
    const { context, send: send2, state } = useOverlay();
    const product = computed(() => context.value.product);
    const selected_variant = ref(null);
    function selectVariant() {
      if (blank(selected_variant)) {
        return;
      }
      send2({
        type: "NEXT",
        variant_id: selected_variant.value,
      });
    }
    return {
      state,
      product,
      selected_variant,
      selectVariant,
      context,
    };
  },
});
const _hoisted_1$b = {
  class: "sell-flex sell-flex-col sell-px-4 sell-pt-5 sell-pb-4 sm:sell-p-6",
};
const _hoisted_2$a = /* @__PURE__ */ createBaseVNode(
  "p",
  {
    class:
      "sell-mb-4 sell-font-medium sell-text-center dark:sell-text-white sell-text-sm",
  },
  "Select the product you would like to purchase",
  -1
);
const _hoisted_3$8 = /* @__PURE__ */ createTextVNode("Variants");
const _hoisted_4$6 = { class: "sell-space-y-4" };
const _hoisted_5$4 = {
  class:
    "sell-flex sell-flex-col sm:sell-flex-row sm:sell-justify-between sell-text-left",
};
const _hoisted_6$4 = { class: "sell-flex sell-items-center sell-flex-grow-0" };
const _hoisted_7$2 = { class: "sell-text-sm" };
const _hoisted_8$2 = {
  class:
    "sell-mt-2 sell-flex sell-text-sm sm:sell-mt-0 sm:sell-block sm:sell-ml-4 sm:sell-text-right sell-w-auto sell-flex-shrink-0",
};
const _hoisted_9$2 = {
  class: "sell-font-medium sell-text-slate-900 dark:sell-text-white",
};
const _hoisted_10$2 = /* @__PURE__ */ createBaseVNode(
  "div",
  {
    class:
      "sell-absolute -sell-inset-px sell-rounded-lg sell-pointer-events-none",
    "aria-hidden": "true",
  },
  null,
  -1
);
const _hoisted_11$2 = {
  class:
    "sell-mt-6 sell-w-full sell-justify-end sell-flex sell-items-center sell-col-span-2 sell-space-x-2",
};
const _hoisted_12$2 = /* @__PURE__ */ createTextVNode("Continue");
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DialogTitle = resolveComponent("DialogTitle");
  const _component_RadioGroupLabel = resolveComponent("RadioGroupLabel");
  const _component_RadioGroupDescription = resolveComponent(
    "RadioGroupDescription"
  );
  const _component_RadioGroupOption = resolveComponent("RadioGroupOption");
  const _component_RadioGroup = resolveComponent("RadioGroup");
  const _component_Button = resolveComponent("Button");
  return (
    openBlock(),
    createElementBlock("div", null, [
      createBaseVNode("div", _hoisted_1$b, [
        createVNode(
          _component_DialogTitle,
          {
            as: "h2",
            class:
              "sell-mb-1 sell-font-bold sell-text-center dark:sell-text-white sell-text-xl",
          },
          {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.product.title), 1),
            ]),
            _: 1,
          }
        ),
        _hoisted_2$a,
        createVNode(
          _component_RadioGroup,
          {
            modelValue: _ctx.selected_variant,
            "onUpdate:modelValue":
              _cache[0] ||
              (_cache[0] = ($event) => (_ctx.selected_variant = $event)),
          },
          {
            default: withCtx(() => [
              createVNode(
                _component_RadioGroupLabel,
                { class: "sell-sr-only" },
                {
                  default: withCtx(() => [_hoisted_3$8]),
                  _: 1,
                }
              ),
              createBaseVNode("div", _hoisted_4$6, [
                (openBlock(true),
                createElementBlock(
                  Fragment,
                  null,
                  renderList(_ctx.product.variants, (variant) => {
                    return (
                      openBlock(),
                      createBlock(
                        _component_RadioGroupOption,
                        {
                          key: variant.id,
                          as: "template",
                          value: variant.id,
                        },
                        {
                          default: withCtx(({ checked }) => [
                            createBaseVNode(
                              "div",
                              {
                                class: normalizeClass([
                                  "sell-flex sell-flex-col",
                                  [
                                    checked
                                      ? "sell-shadow-lg dark:sell-shadow-black sell-shadow-slate-500 sell-bg-white dark:sell-bg-slate-900 sell-shadow-slate-400 dark:sell-shadow-black"
                                      : "sell-bg-slate-50 dark:sell-bg-slate-800 sell-shadow dark:sell-shadow-black/20 dark:hover:sell-bg-slate-900 hover:sell-bg-white hover:sell-shadow-slate-400 dark:hover:sell-shadow-black",
                                    "sell-transition sell-duration-200 ease-in-out sell-relative sell-block sell-rounded-lg sell-px-6 sell-py-4 sell-cursor-pointer sm:sell-flex sm:sell-justify-between focus:sell-outline-none",
                                  ],
                                ]),
                              },
                              [
                                createBaseVNode("div", _hoisted_5$4, [
                                  createBaseVNode("div", _hoisted_6$4, [
                                    createBaseVNode("div", _hoisted_7$2, [
                                      createVNode(
                                        _component_RadioGroupLabel,
                                        {
                                          as: "p",
                                          class:
                                            "sell-font-medium sell-text-slate-900 dark:sell-text-white",
                                          style: {
                                            "text-transform": "capitalize",
                                          },
                                        },
                                        {
                                          default: withCtx(() => [
                                            createTextVNode(
                                              toDisplayString(
                                                variant.title.toLowerCase()
                                              ),
                                              1
                                            ),
                                          ]),
                                          _: 2,
                                        },
                                        1024
                                      ),
                                    ]),
                                  ]),
                                  createBaseVNode("div", _hoisted_8$2, [
                                    createBaseVNode(
                                      "div",
                                      _hoisted_9$2,
                                      toDisplayString(variant.price),
                                      1
                                    ),
                                  ]),
                                ]),
                                createVNode(
                                  _component_RadioGroupDescription,
                                  {
                                    as: "div",
                                    class:
                                      "sell-flex sell-text-xs sell-text-left sell-mt-2",
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        toDisplayString(variant.description),
                                        1
                                      ),
                                    ]),
                                    _: 2,
                                  },
                                  1024
                                ),
                                _hoisted_10$2,
                              ],
                              2
                            ),
                          ]),
                          _: 2,
                        },
                        1032,
                        ["value"]
                      )
                    );
                  }),
                  128
                )),
              ]),
            ]),
            _: 1,
          },
          8,
          ["modelValue"]
        ),
        createBaseVNode("div", _hoisted_11$2, [
          createVNode(
            _component_Button,
            {
              loading: _ctx.state.hasTag("loading"),
              onClick:
                _cache[1] || (_cache[1] = ($event) => _ctx.selectVariant()),
              class: "sell-w-24",
              toffee: "",
            },
            {
              default: withCtx(() => [_hoisted_12$2]),
              _: 1,
            },
            8,
            ["loading"]
          ),
        ]),
      ]),
    ])
  );
}
var VariantSelection = /* @__PURE__ */ _export_sfc(_sfc_main$b, [
  ["render", _sfc_render$b],
]);
const _sfc_main$a = defineComponent({
  name: "NumberInput",
  components: {
    MinusIcon: render$3,
    PlusIcon: render$1,
  },
  inheritAttrs: false,
  props: {
    modelValue: Number,
    min: Number,
    max: Number,
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    function emitUpdate(value) {
      var _a2;
      value = parseInt(value.toString());
      if (isNaN(value)) {
        value = 0;
      }
      if (value < ((_a2 = props.min) != null ? _a2 : 1)) {
        value = props.min;
      } else if (props.max !== null && value > props.max) {
        value = props.max;
      }
      emit("update:modelValue", value);
    }
    const canModify = computed(() => props.min !== props.max);
    const canIncrement = computed(
      () =>
        canModify.value && (!!props.max ? props.modelValue < props.max : true)
    );
    function increment() {
      if (canIncrement.value) {
        emitUpdate(props.modelValue + 1);
      }
    }
    const canDecrement = computed(() => {
      var _a2;
      return (
        canModify.value &&
        props.modelValue > ((_a2 = props.min) != null ? _a2 : 1)
      );
    });
    function decrement() {
      if (canDecrement.value) {
        emitUpdate(props.modelValue - 1);
      }
    }
    return {
      emitUpdate,
      canModify,
      canIncrement,
      increment,
      canDecrement,
      decrement,
    };
  },
});
const _hoisted_1$a = { class: "sell-relative" };
const _hoisted_2$9 = ["disabled"];
const _hoisted_3$7 = ["value", "disabled"];
const _hoisted_4$5 = ["disabled"];
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MinusIcon = resolveComponent("MinusIcon");
  const _component_PlusIcon = resolveComponent("PlusIcon");
  return (
    openBlock(),
    createElementBlock("div", _hoisted_1$a, [
      createBaseVNode(
        "button",
        {
          class:
            "sell-absolute sell-inset-y-0 sell-left-0 sell-pl-3 sell-flex sell-items-center dark:sell-text-white disabled:sell-opacity-50 disabled:sell-cursor-not-allowed",
          disabled: !_ctx.canDecrement,
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.decrement()),
        },
        [createVNode(_component_MinusIcon, { class: "sell-w-5 sell-h-5" })],
        8,
        _hoisted_2$9
      ),
      createBaseVNode(
        "input",
        mergeProps(_ctx.$attrs, {
          value: _ctx.modelValue,
          class:
            "sell-w-full sell-rounded-lg sell-shadow-sm sell-text-center dark:sell-bg-slate-800 dark:sell-border-slate-800 dark:sell-text-white focus:sell-outline-none focus:sell-ring-1 focus:sell-ring-slate-500 focus:sell-border-slate-500",
          type: "text",
          inputmode: "numeric",
          onInput:
            _cache[1] ||
            (_cache[1] = ($event) => _ctx.emitUpdate($event.target.value)),
          disabled: !_ctx.canModify,
        }),
        null,
        16,
        _hoisted_3$7
      ),
      createBaseVNode(
        "button",
        {
          class:
            "sell-absolute sell-inset-y-0 sell-right-0 sell-pr-3 sell-flex sell-items-center dark:sell-text-white disabled:sell-opacity-50 disabled:sell-cursor-not-allowed",
          disabled: !_ctx.canIncrement,
          onClick: _cache[2] || (_cache[2] = ($event) => _ctx.increment()),
        },
        [createVNode(_component_PlusIcon, { class: "sell-w-5 sell-h-5" })],
        8,
        _hoisted_4$5
      ),
    ])
  );
}
var NumberInput = /* @__PURE__ */ _export_sfc(_sfc_main$a, [
  ["render", _sfc_render$a],
]);
const _sfc_main$9 = defineComponent({
  name: "InputGroup",
  components: {
    ExclamationCircleIcon: render$6,
  },
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      required: true,
    },
    errorKey: String,
    modelValue: {
      type: null,
      required: false,
    },
    label: String,
  },
  emits: ["update:modelValue"],
  setup(props, { slots, emit }) {
    const { context } = useOverlay();
    function emitUpdate(value) {
      emit("update:modelValue", value);
    }
    const hasSlot = (name) => !!slots[name];
    const error2 = computed(() => {
      var _a2, _b, _c;
      return (_c =
        (_b = (_a2 = context.value.error) == null ? void 0 : _a2.errors) == null
          ? void 0
          : _b[props.errorKey]) == null
        ? void 0
        : _c[0];
    });
    return {
      hasSlot,
      emitUpdate,
      error: error2,
    };
  },
});
const _hoisted_1$9 = {
  class:
    "sell-block sell-text-sm sell-font-medium sell-text-slate-700 dark:sell-text-white",
};
const _hoisted_2$8 = {
  key: 0,
  class:
    "sell-absolute sell-inset-y-0 sell-left-0 sell-pl-3 sell-flex sell-items-center sell-pointer-events-none",
};
const _hoisted_3$6 = ["type", "value"];
const _hoisted_4$4 = ["checked", "type", "value"];
const _hoisted_5$3 = ["value"];
const _hoisted_6$3 = ["textContent"];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ExclamationCircleIcon = resolveComponent(
    "ExclamationCircleIcon"
  );
  return (
    openBlock(),
    createElementBlock(
      Fragment,
      null,
      [
        createBaseVNode(
          "div",
          {
            class: normalizeClass({
              "sell-w-full sell-flex sell-justify-between":
                _ctx.type === "checkbox",
            }),
          },
          [
            createBaseVNode(
              "label",
              _hoisted_1$9,
              toDisplayString(_ctx.label),
              1
            ),
            createBaseVNode(
              "div",
              {
                class: normalizeClass([
                  "sell-relative sell-rounded-md",
                  { "sell-mt-1": _ctx.type !== "checkbox" && !!_ctx.label },
                ]),
              },
              [
                _ctx.type !== "checkbox" && _ctx.type !== "textarea"
                  ? (openBlock(),
                    createElementBlock("div", _hoisted_2$8, [
                      renderSlot(_ctx.$slots, "icon"),
                    ]))
                  : createCommentVNode("", true),
                _ctx.type !== "textarea" && _ctx.type !== "checkbox"
                  ? (openBlock(),
                    createElementBlock(
                      "input",
                      mergeProps(
                        {
                          key: 1,
                          type: _ctx.type,
                          class: {
                            "sell-block sell-w-full sell-rounded-md sm:sell-text-sm disabled:sell-opacity-70 sell-shadow-lg sell-shadow-slate-300 focus:sell-shadow-slate-400 dark:sell-shadow-black/20 dark:focus:sell-shadow-black focus:sell-ring-0 focus:sell-border-transparent sell-border-transparent sell-placeholder-slate-600 focus:sell-placeholder-slate-800 dark:focus:sell-placeholder-slate-400 sell-text-black dark:sell-text-white sell-bg-slate-100 focus:sell-bg-white dark:sell-bg-slate-900 dark:focus:sell-bg-slate-800 sell-transition sell-duration-300 ease-in-out":
                              _ctx.type !== "checkbox",
                            "sell-pl-10": _ctx.hasSlot("icon"),
                            "sell-placeholder-red-300 dark:sell-placeholder-red-600 sell-text-red-900 sell-border-red-300 focus:sell-ring-red-500 focus:sell-border-red-500":
                              !!_ctx.error,
                            "sell-pr-10":
                              !!_ctx.error && _ctx.type !== "number",
                          },
                          value: _ctx.modelValue,
                        },
                        _ctx.$attrs,
                        {
                          onInput:
                            _cache[0] ||
                            (_cache[0] = ($event) =>
                              _ctx.emitUpdate($event.target.value)),
                        }
                      ),
                      null,
                      16,
                      _hoisted_3$6
                    ))
                  : _ctx.type === "checkbox"
                  ? (openBlock(),
                    createElementBlock(
                      "input",
                      mergeProps(
                        {
                          key: 2,
                          checked: _ctx.modelValue,
                          type: _ctx.type,
                          class:
                            "sell-rounded hover:sell-bg-slate-100 dark:hover:sell-bg-slate-700 sell-text-slate dark:sell-text-slate-700 sell-bg-white focus:sell-bg-slate-50 dark:sell-bg-slate-800 dark:focus:sell-bg-slate-700 sell-text-black dark:sell-text-white sell-placeholder-slate-600 dark:sell-placeholder-slate-500 focus:sell-placeholder-slate-800 dark:focus:sell-placeholder-slate-400 sell-border sell-border-slate-400 dark:sell-border-slate-900 focus:sell-border-slate-500 dark:focus:sell-border-slate-800 focus:sell-ring-0 sell-shadow-md sell-shadow-slate-200 focus:sell-shadow-slate-300 dark:sell-shadow-black/20 dark:focus:sell-shadow-black sell-transition sell-duration-200 ease-in-out disabled:sell-bg-slate-100 dark:disabled:sell-bg-slate-900 disabled:sell-opacity-70",
                          value: _ctx.modelValue,
                        },
                        _ctx.$attrs,
                        {
                          onInput:
                            _cache[1] ||
                            (_cache[1] = ($event) =>
                              _ctx.emitUpdate($event.target.checked)),
                        }
                      ),
                      null,
                      16,
                      _hoisted_4$4
                    ))
                  : (openBlock(),
                    createElementBlock(
                      "textarea",
                      mergeProps(
                        {
                          key: 3,
                          class: [
                            "sell-block sell-w-full sell-rounded-md sm:sell-text-sm disabled:sell-opacity-70 sell-shadow-lg sell-shadow-slate-300 focus:sell-shadow-slate-400 dark:sell-shadow-black/20 dark:focus:sell-shadow-black focus:sell-ring-0 focus:sell-border-transparent sell-border-transparent sell-placeholder-slate-600 focus:sell-placeholder-slate-800 dark:focus:sell-placeholder-slate-400 sell-text-black dark:sell-text-white sell-bg-slate-100 focus:sell-bg-white dark:sell-bg-slate-900 dark:focus:sell-bg-slate-800 sell-transition sell-duration-300 ease-in-out",
                            {
                              "sell-placeholder-red-300 sell-text-red-900 sell-border-red-300 focus:sell-ring-red-500 focus:sell-border-red-500":
                                !!_ctx.error,
                            },
                          ],
                          value: _ctx.modelValue,
                        },
                        _ctx.$attrs,
                        {
                          onInput:
                            _cache[2] ||
                            (_cache[2] = ($event) =>
                              _ctx.emitUpdate($event.target.value)),
                        }
                      ),
                      null,
                      16,
                      _hoisted_5$3
                    )),
                !!_ctx.error && (_ctx.type === "text" || _ctx.type === "email")
                  ? (openBlock(),
                    createElementBlock(
                      "div",
                      {
                        key: 4,
                        class: normalizeClass([
                          "sell-absolute sell-inset-y-0 sell-right-0 sell-pr-3 sell-flex sell-items-center sell-pointer-events-none",
                          { "sell-mr-6": _ctx.type === "number" },
                        ]),
                      },
                      [
                        createVNode(_component_ExclamationCircleIcon, {
                          class:
                            "sell-h-5 sell-w-5 sell-text-red-500 dark:sell-text-red-900",
                          "aria-hidden": "true",
                        }),
                      ],
                      2
                    ))
                  : createCommentVNode("", true),
              ],
              2
            ),
          ],
          2
        ),
        !!_ctx.error
          ? (openBlock(),
            createElementBlock(
              "p",
              {
                key: 0,
                class:
                  "sell-mt-3 sell-text-xs sell-text-red-600 dark:sell-text-red sell-w-full sell-flex-grow",
                textContent: toDisplayString(_ctx.error),
              },
              null,
              8,
              _hoisted_6$3
            ))
          : createCommentVNode("", true),
      ],
      64
    )
  );
}
var InputGroup = /* @__PURE__ */ _export_sfc(_sfc_main$9, [
  ["render", _sfc_render$9],
]);
const _sfc_main$8 = defineComponent({
  name: "Overview",
  components: {
    InputGroup,
    Button,
    DialogTitle: qr,
    NumberInput,
    GiftIcon: render$5,
    PlusSmIcon: render$2,
  },
  setup() {
    var _a2, _b, _c;
    const { context, state, send: send2 } = useOverlay();
    const data = reactive({
      coupon: (_a2 = context.value.coupon) != null ? _a2 : "",
      quantity: (_b = context.value.quantity) != null ? _b : 0,
      extra: (_c = context.value.extra) != null ? _c : "0.00",
    });
    const orMore = ref(
      context.value.extra !== void 0 && context.value.extra !== "0.00"
    );
    function apply(key, value) {
      send2([
        {
          type: "UPDATE_CONTEXT",
          [key]: value != null ? value : data[key],
        },
        "FETCH",
      ]);
    }
    watch(
      () => data.quantity,
      (quantity) => {
        apply("quantity", quantity);
      }
    );
    const product = computed(() => context.value.product);
    const variant = computed(() => context.value.variant);
    const isSoldOut = computed(() => variant.value.stock === false);
    const isLoading = computed(() => state.value.hasTag("fetching"));
    return {
      product,
      variant,
      send: send2,
      data,
      context,
      orMore,
      apply,
      isSoldOut,
      isLoading,
    };
  },
});
const _hoisted_1$8 = {
  key: 0,
  class:
    "sell-aspect-w-3 sell-aspect-h-1 sell-flex-shrink-0 sell-rounded-t-2xl sell-overflow-hidden sell-bg-slate-100 dark:sell-bg-black",
};
const _hoisted_2$7 = ["src", "alt"];
const _hoisted_3$5 = {
  class:
    "sell-flex sell-flex-col sell-px-4 sell-pt-5 sell-pb-4 sell-sm:p-6 sell-space-y-3",
};
const _hoisted_4$3 = {
  class: "sell-flex sell-flex-col sell-mx-auto sell-items-center",
};
const _hoisted_5$2 = {
  key: 0,
  class:
    "sell-text-xl sell-text-center sell-font-light dark:sell-text-white sell-line-through",
};
const _hoisted_6$2 = {
  class: "sell-text-xl sell-text-center dark:sell-text-white sell-font-bold",
};
const _hoisted_7$1 = {
  key: 0,
  class: "sell-flex sell-flex-col sell-mx-auto sell-items-center",
};
const _hoisted_8$1 = { class: "sell-flex sell-flex-col" };
const _hoisted_9$1 = { class: "sell-flex sell-gap-2 sell-items-center" };
const _hoisted_10$1 = /* @__PURE__ */ createBaseVNode(
  "span",
  { class: "dark:sell-text-white sell-font-semibold" },
  "$",
  -1
);
const _hoisted_11$1 = /* @__PURE__ */ createTextVNode(" Add ");
const _hoisted_12$1 = ["textContent"];
const _hoisted_13 = ["innerHTML"];
const _hoisted_14 = {
  class:
    "sell-flex sell-flex-col sell-gap-1 sell-rounded-md sell-shadow-sm sell-flex-shrink-0",
};
const _hoisted_15 = { class: "sell-flex sell-gap-1" };
const _hoisted_16 = {
  class:
    "sell-relative sell-flex sell-items-stretch sell-flex-grow focus-within:sell-z-10",
};
const _hoisted_17 = /* @__PURE__ */ createBaseVNode("span", null, "Apply", -1);
const _hoisted_18 = ["textContent"];
const _hoisted_19 = {
  key: 1,
  class:
    "sell-mt-1 sell-text-center sell-p-2 sell-bg-green-600 sell-text-white sell-text-xs sell-rounded-xl sell-text-left",
};
const _hoisted_20 = { class: "sell-flex sell-flex-col sell-gap-1" };
const _hoisted_21 = { class: "sell-flex sell-space-x-2" };
const _hoisted_22 = {
  class:
    "sell-inline-block sell-text-left sell-text-sm sell-ml-1 dark:sell-text-white",
};
const _hoisted_23 = /* @__PURE__ */ createBaseVNode(
  "span",
  null,
  "Stock:\xA0",
  -1
);
const _hoisted_24 = {
  key: 0,
  class: "sell-text-lg",
};
const _hoisted_25 = { key: 1 };
const _hoisted_26 = ["textContent"];
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n2;
  const _component_DialogTitle = resolveComponent("DialogTitle");
  const _component_InputGroup = resolveComponent("InputGroup");
  const _component_Button = resolveComponent("Button");
  const _component_GiftIcon = resolveComponent("GiftIcon");
  const _component_NumberInput = resolveComponent("NumberInput");
  return (
    openBlock(),
    createElementBlock("div", null, [
      ((_a2 = _ctx.variant.images) == null ? void 0 : _a2.length) > 0
        ? (openBlock(),
          createElementBlock("div", _hoisted_1$8, [
            createBaseVNode(
              "img",
              {
                class: "sell-object-scale-down sell-h-32 sell-w-96",
                src: _ctx.variant.images[0],
                alt: _ctx.variant.title,
              },
              null,
              8,
              _hoisted_2$7
            ),
          ]))
        : createCommentVNode("", true),
      createBaseVNode("div", _hoisted_3$5, [
        createBaseVNode("div", null, [
          createVNode(
            _component_DialogTitle,
            {
              as: "h1",
              class: "sell-font-semibold dark:sell-text-white sell-text-lg",
            },
            {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.product.title), 1),
              ]),
              _: 1,
            }
          ),
        ]),
        createBaseVNode("div", _hoisted_4$3, [
          _ctx.variant.price !== _ctx.variant.total
            ? (openBlock(),
              createElementBlock(
                "div",
                _hoisted_5$2,
                toDisplayString(_ctx.variant.price),
                1
              ))
            : createCommentVNode("", true),
          createBaseVNode(
            "div",
            _hoisted_6$2,
            toDisplayString(_ctx.variant.total),
            1
          ),
        ]),
        _ctx.variant.humble
          ? (openBlock(),
            createElementBlock("div", _hoisted_7$1, [
              _ctx.orMore
                ? (openBlock(),
                  createBlock(
                    Transition,
                    {
                      key: 0,
                      appear: "",
                      "enter-from-class": "sell-opacity-0 sell-scale-0",
                      "enter-to-class": "sell-opacity-1 sell-scale-100",
                      "enter-active-class":
                        "sell-transition sell-transform sell-origin",
                      "leave-from-class": "sell-opacity-1 sell-scale-100",
                      "leave-to-class": "sell-opacity-0 sell-scale-0",
                      "leave-active-class": "sell-transition sell-transform",
                    },
                    {
                      default: withCtx(() => {
                        var _a3, _b2, _c2, _d2, _e2;
                        return [
                          createBaseVNode("div", _hoisted_8$1, [
                            createBaseVNode("div", _hoisted_9$1, [
                              createVNode(
                                _component_InputGroup,
                                {
                                  modelValue: _ctx.data.extra,
                                  "onUpdate:modelValue":
                                    _cache[0] ||
                                    (_cache[0] = ($event) =>
                                      (_ctx.data.extra = $event)),
                                  autocomplete: "off",
                                  type: "number",
                                  placeholder: "0.00",
                                },
                                {
                                  icon: withCtx(() => [_hoisted_10$1]),
                                  _: 1,
                                },
                                8,
                                ["modelValue"]
                              ),
                              createVNode(
                                _component_Button,
                                {
                                  onClick:
                                    _cache[1] ||
                                    (_cache[1] = ($event) =>
                                      _ctx.apply("extra")),
                                  toffee: "",
                                },
                                {
                                  default: withCtx(() => [_hoisted_11$1]),
                                  _: 1,
                                }
                              ),
                            ]),
                            (
                              (_c2 =
                                (_b2 =
                                  (_a3 = _ctx.context.error) == null
                                    ? void 0
                                    : _a3.errors) == null
                                  ? void 0
                                  : _b2.extra) == null
                                ? void 0
                                : _c2[0]
                            )
                              ? (openBlock(),
                                createElementBlock(
                                  "p",
                                  {
                                    key: 0,
                                    class:
                                      "sell-ml-1.5 sell-text-left sell-text-sm sell-text-red-600 dark:sell-text-red sell-w-full",
                                    textContent: toDisplayString(
                                      (_e2 =
                                        (_d2 = _ctx.context.error) == null
                                          ? void 0
                                          : _d2.errors) == null
                                        ? void 0
                                        : _e2.extra[0]
                                    ),
                                  },
                                  null,
                                  8,
                                  _hoisted_12$1
                                ))
                              : createCommentVNode("", true),
                          ]),
                        ];
                      }),
                      _: 1,
                    }
                  ))
                : (openBlock(),
                  createElementBlock(
                    "button",
                    {
                      key: 1,
                      onClick:
                        _cache[2] ||
                        (_cache[2] = ($event) => (_ctx.orMore = true)),
                      class: "hover:sell-underline dark:sell-text-white",
                    },
                    "or more"
                  )),
            ]))
          : createCommentVNode("", true),
        createBaseVNode(
          "p",
          {
            class:
              "sell-shadow sell-shadow-slate-400 dark:sell-shadow-black sell-bg-slate-100 dark:sell-bg-slate-800 dark:sell-text-slate-100 sell-p-2 sell-rounded-xl sell-overflow-auto sell-overscroll-contain sell-h-32 sell-text-sm",
            innerHTML: _ctx.product.description,
          },
          null,
          8,
          _hoisted_13
        ),
        createBaseVNode("div", _hoisted_14, [
          createBaseVNode("div", _hoisted_15, [
            createBaseVNode("div", _hoisted_16, [
              withDirectives(
                createBaseVNode(
                  "input",
                  {
                    type: "text",
                    name: "coupon-code",
                    class:
                      "focus:sell-outline-none sell-shadow-lg sell-shadow-slate-200 focus:sell-shadow-slate-300 dark:sell-shadow-black/20 dark:focus:sell-shadow-black focus:sell-ring-0 focus:sell-border-transparent sell-border-transparent sell-placeholder-slate-600 focus:sell-placeholder-slate-800 dark:focus:sell-placeholder-slate-400 sell-text-black dark:sell-text-white sell-block sell-w-full sell-rounded-md sm:sell-text-sm sell-bg-slate-50 focus:sell-bg-white dark:sell-bg-slate-900 dark:focus:sell-bg-slate-800 w-full sell-transition sell-duration-300 ease-in-out",
                    placeholder: "Enter Coupon",
                    "onUpdate:modelValue":
                      _cache[3] ||
                      (_cache[3] = ($event) => (_ctx.data.coupon = $event)),
                  },
                  null,
                  512
                ),
                [[vModelText, _ctx.data.coupon]]
              ),
            ]),
            createVNode(
              _component_Button,
              {
                outline: "",
                loading: _ctx.isLoading,
                type: "button",
                onClick:
                  _cache[4] || (_cache[4] = ($event) => _ctx.apply("coupon")),
                class:
                  "sell-relative sell-inline-flex sell-items-center sell-space-x-2 sell-px-4 sell-py-2",
              },
              {
                default: withCtx(() => [
                  createVNode(_component_GiftIcon, {
                    class:
                      "sell-h-5 sell-w-5 sell-text-slate-400 dark:sell-text-slate-50",
                    "aria-hidden": "true",
                  }),
                  _hoisted_17,
                ]),
                _: 1,
              },
              8,
              ["loading"]
            ),
          ]),
          (
            (_d =
              (_c = (_b = _ctx.context.error) == null ? void 0 : _b.errors) ==
              null
                ? void 0
                : _c.coupon) == null
              ? void 0
              : _d[0]
          )
            ? (openBlock(),
              createElementBlock(
                "p",
                {
                  key: 0,
                  class:
                    "sell-ml-1.5 sell-text-left sell-text-sm sell-text-red-600 dark:sell-text-red sell-w-full",
                  textContent: toDisplayString(
                    (_f =
                      (_e = _ctx.context.error) == null ? void 0 : _e.errors) ==
                      null
                      ? void 0
                      : _f.coupon[0]
                  ),
                },
                null,
                8,
                _hoisted_18
              ))
            : createCommentVNode("", true),
          _ctx.variant.coupon &&
          ((_i =
            (_h = (_g = _ctx.context.error) == null ? void 0 : _g.errors) ==
            null
              ? void 0
              : _h.coupon) == null
            ? void 0
            : _i[0]) === void 0
            ? (openBlock(),
              createElementBlock(
                "p",
                _hoisted_19,
                "A " +
                  toDisplayString(_ctx.variant.coupon) +
                  " coupon has successfully been applied!",
                1
              ))
            : createCommentVNode("", true),
        ]),
        createBaseVNode("div", _hoisted_20, [
          createBaseVNode("div", _hoisted_21, [
            createVNode(
              _component_NumberInput,
              {
                modelValue: _ctx.data.quantity,
                "onUpdate:modelValue":
                  _cache[5] ||
                  (_cache[5] = ($event) => (_ctx.data.quantity = $event)),
                min: _ctx.variant.minimum_purchase_quantity,
                max: _ctx.variant.maximum_purchase_quantity,
              },
              null,
              8,
              ["modelValue", "min", "max"]
            ),
            createVNode(
              _component_Button,
              {
                loading: _ctx.isLoading,
                disabled: _ctx.isSoldOut,
                style: normalizeStyle({
                  "background-color": _ctx.context.customization.theme,
                }),
                class:
                  "sell-w-full disabled:sell-bg-red-600 !sell-text-lg sell-text-white sell-font-medium sell-rounded-md disabled:focus:sell-ring-slate-500",
                onClick:
                  _cache[6] || (_cache[6] = ($event) => _ctx.send("NEXT")),
                toffee: "",
                textContent: toDisplayString(
                  _ctx.isSoldOut ? "Sold out" : "Buy now"
                ),
              },
              null,
              8,
              ["loading", "disabled", "style", "textContent"]
            ),
          ]),
          createBaseVNode("p", _hoisted_22, [
            _hoisted_23,
            !_ctx.variant.stock
              ? (openBlock(), createElementBlock("span", _hoisted_24, "0"))
              : (openBlock(),
                createElementBlock(
                  "span",
                  _hoisted_25,
                  toDisplayString(_ctx.variant.stock),
                  1
                )),
          ]),
          (
            (_l =
              (_k = (_j = _ctx.context.error) == null ? void 0 : _j.errors) ==
              null
                ? void 0
                : _k.quantity) == null
              ? void 0
              : _l[0]
          )
            ? (openBlock(),
              createElementBlock(
                "p",
                {
                  key: 0,
                  class:
                    "sell-ml-1.5 sell-text-left sell-text-sm sell-text-red-600 dark:sell-text-red sell-w-full",
                  textContent: toDisplayString(
                    (_n2 =
                      (_m = _ctx.context.error) == null ? void 0 : _m.errors) ==
                      null
                      ? void 0
                      : _n2.quantity[0]
                  ),
                },
                null,
                8,
                _hoisted_26
              ))
            : createCommentVNode("", true),
        ]),
      ]),
    ])
  );
}
var Overview = /* @__PURE__ */ _export_sfc(_sfc_main$8, [
  ["render", _sfc_render$8],
]);
const _sfc_main$7 = defineComponent({
  name: "PaymentMethod",
  components: {
    Navigator,
    RadioGroup: wi,
    RadioGroupDescription: ki,
    RadioGroupLabel: Mi,
    RadioGroupOption: Li,
    DialogTitle: qr,
  },
  setup() {
    const { context } = useOverlay();
    const getDescription = (method) => {
      switch (method) {
        case "COINBASE":
          return "Pay using crypto: BTC, ETH, and more";
        case "PAYPAL":
          return "Checkout with your PayPal account";
        case "PAYSTACK":
          return "The Stripe of Africa";
        case "STRIPE":
          return "Pay with credit card, debit card, and more";
        case "CASHAPP":
          return "Checkout with your CashApp account";
        default:
          return null;
      }
    };
    return {
      checkout_information,
      context,
      getDescription,
    };
  },
});
const _hoisted_1$7 = {
  class: "sell-flex sell-flex-col sell-px-4 sell-pt-5 sell-pb-4 sm:sell-p-6",
};
const _hoisted_2$6 = /* @__PURE__ */ createTextVNode("Payment");
const _hoisted_3$4 = /* @__PURE__ */ createTextVNode("Payment Method");
const _hoisted_4$2 = { class: "sell-space-y-4" };
const _hoisted_5$1 = {
  class:
    "sell-flex sell-flex-col sm:sell-flex-row sm:sell-justify-between sell-text-left",
};
const _hoisted_6$1 = { class: "sell-flex sell-items-center sell-flex-grow-0" };
const _hoisted_7 = { class: "sell-text-sm" };
const _hoisted_8 = {
  class:
    "sell-mt-2 sell-flex sell-text-sm sm:sell-mt-0 sm:sell-block sm:sell-ml-4 sm:sell-text-right sell-w-auto sell-flex-shrink-0",
};
const _hoisted_9 = {
  class: "sell-font-medium sell-text-slate-900 dark:sell-text-white",
};
const _hoisted_10 = /* @__PURE__ */ createBaseVNode(
  "div",
  {
    class:
      "sell-absolute -sell-inset-px sell-rounded-lg sell-pointer-events-none",
    "aria-hidden": "true",
  },
  null,
  -1
);
const _hoisted_11 = ["textContent"];
const _hoisted_12 = ["textContent"];
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const _component_DialogTitle = resolveComponent("DialogTitle");
  const _component_RadioGroupLabel = resolveComponent("RadioGroupLabel");
  const _component_RadioGroupDescription = resolveComponent(
    "RadioGroupDescription"
  );
  const _component_RadioGroupOption = resolveComponent("RadioGroupOption");
  const _component_RadioGroup = resolveComponent("RadioGroup");
  const _component_Navigator = resolveComponent("Navigator");
  return (
    openBlock(),
    createElementBlock("div", null, [
      createBaseVNode("div", _hoisted_1$7, [
        createVNode(
          _component_DialogTitle,
          {
            as: "h2",
            class:
              "sell-mb-4 sell-font-bold sell-text-center dark:sell-text-white sell-text-xl",
          },
          {
            default: withCtx(() => [_hoisted_2$6]),
            _: 1,
          }
        ),
        createVNode(
          _component_RadioGroup,
          {
            modelValue: _ctx.checkout_information.payment_method,
            "onUpdate:modelValue":
              _cache[0] ||
              (_cache[0] = ($event) =>
                (_ctx.checkout_information.payment_method = $event)),
          },
          {
            default: withCtx(() => [
              createVNode(
                _component_RadioGroupLabel,
                { class: "sell-sr-only" },
                {
                  default: withCtx(() => [_hoisted_3$4]),
                  _: 1,
                }
              ),
              createBaseVNode("div", _hoisted_4$2, [
                (openBlock(true),
                createElementBlock(
                  Fragment,
                  null,
                  renderList(_ctx.context.variant.payment_methods, (method) => {
                    return (
                      openBlock(),
                      createBlock(
                        _component_RadioGroupOption,
                        {
                          key: method,
                          as: "template",
                          value: method,
                        },
                        {
                          default: withCtx(({ checked }) => [
                            createBaseVNode(
                              "div",
                              {
                                class: normalizeClass([
                                  "sell-flex sell-flex-col",
                                  [
                                    checked
                                      ? "sell-shadow-lg dark:sell-shadow-black sell-shadow-slate-500 sell-bg-white dark:sell-bg-slate-900 sell-shadow-slate-400 dark:sell-shadow-black"
                                      : "sell-bg-slate-50 dark:sell-bg-slate-800 sell-shadow dark:sell-shadow-black/20 dark:hover:sell-bg-slate-900 hover:sell-bg-white hover:sell-shadow-slate-400 dark:hover:sell-shadow-black",
                                    "sell-transition sell-duration-200 ease-in-out sell-relative sell-block sell-rounded-lg sell-px-6 sell-py-4 sell-cursor-pointer sm:sell-flex sm:sell-justify-between focus:sell-outline-none",
                                  ],
                                ]),
                              },
                              [
                                createBaseVNode("div", _hoisted_5$1, [
                                  createBaseVNode("div", _hoisted_6$1, [
                                    createBaseVNode("div", _hoisted_7, [
                                      createVNode(
                                        _component_RadioGroupLabel,
                                        {
                                          as: "p",
                                          class:
                                            "sell-font-medium sell-text-slate-900 dark:sell-text-white",
                                          style: {
                                            "text-transform": "capitalize",
                                          },
                                        },
                                        {
                                          default: withCtx(() => [
                                            createTextVNode(
                                              toDisplayString(
                                                method.toLowerCase()
                                              ),
                                              1
                                            ),
                                          ]),
                                          _: 2,
                                        },
                                        1024
                                      ),
                                    ]),
                                  ]),
                                  createBaseVNode("div", _hoisted_8, [
                                    createBaseVNode(
                                      "div",
                                      _hoisted_9,
                                      toDisplayString(
                                        _ctx.context.variant.total
                                      ),
                                      1
                                    ),
                                  ]),
                                ]),
                                createVNode(
                                  _component_RadioGroupDescription,
                                  {
                                    as: "div",
                                    class:
                                      "sell-flex sell-text-xs sell-text-left dark:sell-text-slate-100 sell-mt-2",
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        toDisplayString(
                                          _ctx.getDescription(method)
                                        ),
                                        1
                                      ),
                                    ]),
                                    _: 2,
                                  },
                                  1024
                                ),
                                _hoisted_10,
                              ],
                              2
                            ),
                          ]),
                          _: 2,
                        },
                        1032,
                        ["value"]
                      )
                    );
                  }),
                  128
                )),
              ]),
            ]),
            _: 1,
          },
          8,
          ["modelValue"]
        ),
        !!((_c =
          (_b = (_a2 = _ctx.context.error) == null ? void 0 : _a2.errors) ==
          null
            ? void 0
            : _b.payment_method) == null
          ? void 0
          : _c[0])
          ? (openBlock(),
            createElementBlock(
              "p",
              {
                key: 0,
                class:
                  "sell-ml-1.5 sell-mt-1 sell-text-left sell-text-sm sell-text-red-600 dark:sell-text-red sell-w-full",
                textContent: toDisplayString(
                  (_e =
                    (_d = _ctx.context.error) == null ? void 0 : _d.errors) ==
                    null
                    ? void 0
                    : _e.payment_method[0]
                ),
              },
              null,
              8,
              _hoisted_11
            ))
          : createCommentVNode("", true),
        !!((_h =
          (_g = (_f = _ctx.context.error) == null ? void 0 : _f.errors) == null
            ? void 0
            : _g.total) == null
          ? void 0
          : _h[0])
          ? (openBlock(),
            createElementBlock(
              "p",
              {
                key: 1,
                class:
                  "sell-ml-1.5 sell-mt-1 sell-text-left sell-text-sm sell-text-red-600 dark:sell-text-red sell-w-full",
                textContent: toDisplayString(
                  (_j =
                    (_i = _ctx.context.error) == null ? void 0 : _i.errors) ==
                    null
                    ? void 0
                    : _j.total[0]
                ),
              },
              null,
              8,
              _hoisted_12
            ))
          : createCommentVNode("", true),
        createVNode(_component_Navigator),
      ]),
    ])
  );
}
var PaymentMethod = /* @__PURE__ */ _export_sfc(_sfc_main$7, [
  ["render", _sfc_render$7],
]);
const _sfc_main$6 = defineComponent({
  name: "AdditionalInformation",
  components: {
    ArrowLeftIcon: render$8,
    ArrowRightIcon: render$7,
    InputGroup,
  },
  setup() {
    var _a2;
    const { context } = useOverlay();
    const required_fields = computed(
      () => context.value.variant.additional_information
    );
    if (context.value.variant.additional_information.length > 0) {
      (_a2 = checkout_information.additional_information) != null
        ? _a2
        : (checkout_information.additional_information = {});
      required_fields.value.forEach((field) => {
        var _a3, _b, _c, _d;
        if (
          ((_a3 = checkout_information.additional_information[field.key]) !=
          null
            ? _a3
            : null) === null
        ) {
          let defaultValue;
          if (field.type === "CHECKBOX") {
            defaultValue = false;
          } else if (field.type === "NUMBER") {
            defaultValue = 0;
          } else {
            defaultValue = "";
          }
          (_d = (_b = checkout_information.additional_information)[
            (_c = field.key)
          ]) != null
            ? _d
            : (_b[_c] = defaultValue);
        }
      });
    }
    return {
      checkout_information,
      context,
      required_fields,
    };
  },
});
const _hoisted_1$6 = { class: "sell-space-y-3" };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_InputGroup = resolveComponent("InputGroup");
  return (
    openBlock(),
    createElementBlock("div", _hoisted_1$6, [
      (openBlock(true),
      createElementBlock(
        Fragment,
        null,
        renderList(_ctx.required_fields, (field) => {
          return (
            openBlock(),
            createElementBlock(
              Fragment,
              { key: field },
              [
                field.type === "TEXTAREA"
                  ? (openBlock(),
                    createBlock(
                      _component_InputGroup,
                      {
                        key: 0,
                        modelValue:
                          _ctx.checkout_information.additional_information[
                            field.key
                          ],
                        "onUpdate:modelValue": ($event) =>
                          (_ctx.checkout_information.additional_information[
                            field.key
                          ] = $event),
                        type: field.type.toLowerCase(),
                        "error-key": `additional_information.${field.key}`,
                        placeholder: field.label,
                        rows: "3",
                        label: field.label,
                      },
                      null,
                      8,
                      [
                        "modelValue",
                        "onUpdate:modelValue",
                        "type",
                        "error-key",
                        "placeholder",
                        "label",
                      ]
                    ))
                  : field.type === "NUMBER"
                  ? (openBlock(),
                    createBlock(
                      _component_InputGroup,
                      {
                        key: 1,
                        modelValue:
                          _ctx.checkout_information.additional_information[
                            field.key
                          ],
                        "onUpdate:modelValue": ($event) =>
                          (_ctx.checkout_information.additional_information[
                            field.key
                          ] = $event),
                        type: field.type.toLowerCase(),
                        "error-key": `additional_information.${field.key}`,
                        placeholder: field.label,
                        label: field.label,
                        min: "1",
                      },
                      null,
                      8,
                      [
                        "modelValue",
                        "onUpdate:modelValue",
                        "type",
                        "error-key",
                        "placeholder",
                        "label",
                      ]
                    ))
                  : (openBlock(),
                    createBlock(
                      _component_InputGroup,
                      {
                        key: 2,
                        modelValue:
                          _ctx.checkout_information.additional_information[
                            field.key
                          ],
                        "onUpdate:modelValue": ($event) =>
                          (_ctx.checkout_information.additional_information[
                            field.key
                          ] = $event),
                        type: field.type.toLowerCase(),
                        "error-key": `additional_information.${field.key}`,
                        placeholder: field.label,
                        label: field.label,
                      },
                      null,
                      8,
                      [
                        "modelValue",
                        "onUpdate:modelValue",
                        "type",
                        "error-key",
                        "placeholder",
                        "label",
                      ]
                    )),
              ],
              64
            )
          );
        }),
        128
      )),
    ])
  );
}
var AdditionalInformation = /* @__PURE__ */ _export_sfc(_sfc_main$6, [
  ["render", _sfc_render$6],
]);
const _sfc_main$5 = defineComponent({
  name: "CustomerEmail",
  components: {
    Navigator,
    Button,
    InputGroup,
    AdditionalInformation,
    MailIcon: render$4,
    DialogTitle: qr,
  },
  setup() {
    const { context } = useOverlay();
    return {
      checkout_information,
      context,
    };
  },
});
const _hoisted_1$5 = {
  class: "sell-flex sell-flex-col sell-px-4 sell-pt-5 sell-pb-4 sm:sell-p-6",
};
const _hoisted_2$5 = /* @__PURE__ */ createTextVNode("Product delivery");
const _hoisted_3$3 = { class: "sell-p-3 sell-text-left" };
const _hoisted_4$1 = {
  key: 0,
  class: "sell-p-3 sell-text-left",
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DialogTitle = resolveComponent("DialogTitle");
  const _component_MailIcon = resolveComponent("MailIcon");
  const _component_InputGroup = resolveComponent("InputGroup");
  const _component_AdditionalInformation = resolveComponent(
    "AdditionalInformation"
  );
  const _component_Navigator = resolveComponent("Navigator");
  return (
    openBlock(),
    createElementBlock("div", _hoisted_1$5, [
      createVNode(
        _component_DialogTitle,
        {
          as: "h1",
          class:
            "sell-font-bold sell-text-center sell-text-xl dark:sell-text-white",
        },
        {
          default: withCtx(() => [_hoisted_2$5]),
          _: 1,
        }
      ),
      createBaseVNode("div", _hoisted_3$3, [
        createVNode(
          _component_InputGroup,
          {
            "error-key": "customer_email",
            type: "email",
            label: "Email",
            placeholder: "example@example.com",
            modelValue: _ctx.checkout_information.customer_email,
            "onUpdate:modelValue":
              _cache[0] ||
              (_cache[0] = ($event) =>
                (_ctx.checkout_information.customer_email = $event)),
          },
          {
            icon: withCtx(() => [
              createVNode(_component_MailIcon, {
                class: "sell-h-5 sell-w-5 sell-text-slate-400",
                "aria-hidden": "true",
              }),
            ]),
            _: 1,
          },
          8,
          ["modelValue"]
        ),
      ]),
      _ctx.context.variant.additional_information.length > 0
        ? (openBlock(),
          createElementBlock("div", _hoisted_4$1, [
            createVNode(_component_AdditionalInformation),
          ]))
        : createCommentVNode("", true),
      createVNode(_component_Navigator, {
        next: { type: "CHECKOUT" },
        "loading-state": "checkout.step.customer_email.checkout_product",
      }),
    ])
  );
}
var CustomerEmail = /* @__PURE__ */ _export_sfc(_sfc_main$5, [
  ["render", _sfc_render$5],
]);
const _sfc_main$4 = defineComponent({
  name: "DialogMessage",
  components: {
    DialogTitle: qr,
  },
  props: {
    title: String,
    message: {
      type: String,
      required: false,
      default: null,
    },
  },
});
const _hoisted_1$4 = {
  class:
    "sell-flex sell-flex-col sell-items-center sell-justify-evenly sell-h-4/6 sell-w-full sell-p-6",
};
const _hoisted_2$4 = { class: "sell-flex sell-flex-col sell-items-center" };
const _hoisted_3$2 = {
  class:
    "sell-bg-slate-100 sell-p-4 sell-rounded-lg sell-w-11/12 sell-rounded sell-mt-4 dark:sell-bg-slate-800 dark:sell-text-white",
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DialogTitle = resolveComponent("DialogTitle");
  return (
    openBlock(),
    createElementBlock("div", _hoisted_1$4, [
      createBaseVNode("div", _hoisted_2$4, [
        renderSlot(_ctx.$slots, "default"),
        createVNode(
          _component_DialogTitle,
          {
            as: "h2",
            class:
              "sell-mb-0 sell-mt-3 sell-font-bold sell-text-2xl dark:sell-text-white",
          },
          {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.title), 1),
            ]),
            _: 1,
          }
        ),
      ]),
      createBaseVNode("div", _hoisted_3$2, [
        renderSlot(_ctx.$slots, "action", {}, () => [
          createBaseVNode("p", null, toDisplayString(_ctx.message), 1),
        ]),
      ]),
    ])
  );
}
var DialogMessage = /* @__PURE__ */ _export_sfc(_sfc_main$4, [
  ["render", _sfc_render$4],
]);
const _sfc_main$3 = {
  name: "LoadingSpinner",
};
const _hoisted_1$3 = {
  class:
    "sell-absolute sell-flex sell-justify-center sell-items-center sell-w-full sell-h-full sell-z-50 sell-bg-opacity-70",
};
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode(
  "span",
  {
    class:
      "sell-animate-ping sell-absolute sell-inline-flex sell-h-24 sell-w-24 sell-rounded-full sell-bg-slate-700 sell-opacity-75",
  },
  null,
  -1
);
const _hoisted_3$1 = [_hoisted_2$3];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$3, _hoisted_3$1);
}
var LoadingSpinner = /* @__PURE__ */ _export_sfc(_sfc_main$3, [
  ["render", _sfc_render$3],
]);
const _sfc_main$2 = defineComponent({
  name: "SuccessDialog",
  components: {
    DialogMessage,
    CheckCircleIcon: render,
  },
  setup: function () {
    const { context } = useOverlay();
    return {
      context,
    };
  },
});
const _hoisted_1$2 = /* @__PURE__ */ createTextVNode(
  " Your order has been created! If the payment gateway did not open by itself, "
);
const _hoisted_2$2 = ["href"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CheckCircleIcon = resolveComponent("CheckCircleIcon");
  const _component_DialogMessage = resolveComponent("DialogMessage");
  return (
    openBlock(),
    createBlock(
      _component_DialogMessage,
      {
        class:
          "sell-bg-white sell-text-center dark:sell-bg-ultra sell-rounded-2xl sell-shadow-xl",
        title: "Order Created",
      },
      {
        action: withCtx(() => [
          createBaseVNode("p", null, [
            _hoisted_1$2,
            createBaseVNode(
              "a",
              {
                href: _ctx.context.order,
                target: "_blank",
              },
              "click here to open it.",
              8,
              _hoisted_2$2
            ),
          ]),
        ]),
        default: withCtx(() => [
          createVNode(_component_CheckCircleIcon, {
            class: "sell-h-24 sell-w-24 sell-text-green-600",
          }),
        ]),
        _: 1,
      }
    )
  );
}
var SuccessDialog = /* @__PURE__ */ _export_sfc(_sfc_main$2, [
  ["render", _sfc_render$2],
]);
const _sfc_main$1 = defineComponent({
  name: "HeadsUpDialog",
  components: {
    DialogMessage,
  },
});
const _hoisted_1$1 = /* @__PURE__ */ createBaseVNode(
  "p",
  { class: "sell-mb-4" },
  "Once paid, the order will instantly be sent to your entered email. That's it!",
  -1
);
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode(
  "p",
  { class: "sell-text-xs" },
  "Note: If you paid with PayPal, we will send the product to your PayPal email for security reasons.",
  -1
);
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DialogMessage = resolveComponent("DialogMessage");
  return (
    openBlock(),
    createBlock(
      _component_DialogMessage,
      {
        class:
          "sell-bg-white sell-text-center dark:sell-bg-ultra sell-rounded-2xl sell-shadow-xl",
        title: "What's Next?",
      },
      {
        action: withCtx(() => [_hoisted_1$1, _hoisted_2$1]),
        _: 1,
      }
    )
  );
}
var HeadsUpDialog = /* @__PURE__ */ _export_sfc(_sfc_main$1, [
  ["render", _sfc_render$1],
]);
function mergeMeta(meta) {
  return Object.keys(meta).reduce((acc, key) => {
    const value = meta[key];
    Object.assign(acc, value);
    return acc;
  }, {});
}
const _sfc_main = defineComponent({
  name: "Embed",
  components: {
    LoadingSpinner,
    Dialog: Gr,
    DialogOverlay: _r,
    DialogTitle: qr,
    TransitionChild: Qn,
    TransitionRoot: Yn,
    ExclamationCircleIcon: render$6,
    VariantSelection,
    Overview,
    PaymentMethod,
    CustomerEmail,
    Navigator,
    DialogMessage,
    CheckCircleIcon: render,
    SuccessDialog,
    HeadsUpDialog,
  },
  setup: function () {
    const { context, state, send: send2 } = useOverlay();
    setupCheckoutButtons();
    const stepComponent = computed(() => {
      if (!state.value.matches("checkout")) return null;
      return mergeMeta(state.value.meta).component;
    });
    return {
      stepComponent,
      context,
      state,
      send: send2,
    };
  },
});
const _hoisted_1 = { class: "sell-fixed sell-z-10 sell-inset-0" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode(
  "span",
  {
    class:
      "sell-hidden sm:sell-inline-block sm:sell-align-middle sm:sell-h-screen",
    "aria-hidden": "true",
  },
  "\u200B",
  -1
);
const _hoisted_3 = {
  class:
    "sell-relative sell-z-50 sell-max-w-sm sell-w-full sell-inline-block sell-align-middle",
};
const _hoisted_4 = {
  key: 1,
  class: "sell-space-y-4",
};
const _hoisted_5 = {
  key: 1,
  class: "sell-space-y-6",
};
const _hoisted_6 = /* @__PURE__ */ createBaseVNode(
  "div",
  {
    class:
      "sell-flex sell-w-full sell-justify-center sell-p-2 sell-bg-opacity-0 sell-absolute sell-bottom-0 sell-z-10",
  },
  [
    /* @__PURE__ */ createBaseVNode(
      "div",
      {
        class:
          "sell-flex sell-filter sell-drop-shadow-lg sell-blur-sm hover:sell-blur-none sell-transition sell-duration-500",
      },
      [
        /* @__PURE__ */ createBaseVNode("img", {
          class: "sell-h-6 sell-w-6",
          loading: "lazy",
          src: "https://sell.app/img/logo.png",
          alt: "Sell Logo",
        }),
        /* @__PURE__ */ createBaseVNode(
          "a",
          {
            href: "https://sell.app",
            target: "_blank",
            class: "sell-text-sm sell-font-semibold sell-pl-1 sell-text-white",
          },
          "Powered by Sell.app"
        ),
      ]
    ),
  ],
  -1
);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DialogOverlay = resolveComponent("DialogOverlay");
  const _component_TransitionChild = resolveComponent("TransitionChild");
  const _component_LoadingSpinner = resolveComponent("LoadingSpinner");
  const _component_SuccessDialog = resolveComponent("SuccessDialog");
  const _component_HeadsUpDialog = resolveComponent("HeadsUpDialog");
  const _component_ExclamationCircleIcon = resolveComponent(
    "ExclamationCircleIcon"
  );
  const _component_DialogMessage = resolveComponent("DialogMessage");
  const _component_Dialog = resolveComponent("Dialog");
  const _component_TransitionRoot = resolveComponent("TransitionRoot");
  return (
    openBlock(),
    createBlock(
      _component_TransitionRoot,
      {
        as: "template",
        show: !_ctx.state.matches("closed"),
      },
      {
        default: withCtx(() => [
          createVNode(
            _component_Dialog,
            {
              as: "div",
              onClose:
                _cache[0] || (_cache[0] = ($event) => _ctx.send("CLOSE")),
            },
            {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_1, [
                  createBaseVNode(
                    "div",
                    {
                      class: normalizeClass([
                        "sell-flex sell-items-center sell-justify-center sell-min-h-screen sell-text-center",
                        { "sell-dark": _ctx.context.customization.darkMode },
                      ]),
                    },
                    [
                      createVNode(
                        _component_TransitionChild,
                        {
                          as: "template",
                          enter: "sell-ease-out sell-duration-300",
                          "enter-from": "sell-opacity-0",
                          "enter-to": "sell-opacity-100",
                          leave: "sell-ease-in sell-duration-200",
                          "leave-from": "sell-opacity-100",
                          "leave-to": "sell-opacity-0",
                        },
                        {
                          default: withCtx(() => [
                            createVNode(_component_DialogOverlay, {
                              class:
                                "sell-fixed sell-inset-0 sell-bg-slate-500 dark:sell-bg-black sell-bg-opacity-75 dark:sell-bg-opacity-80 sell-transition-opacity",
                            }),
                          ]),
                          _: 1,
                        }
                      ),
                      _hoisted_2,
                      createVNode(
                        _component_TransitionChild,
                        {
                          as: "template",
                          enter: "sell-ease-out sell-duration-300",
                          "enter-from":
                            "sell-opacity-0 sell-translate-y-4 sm:sell-translate-y-0 sm:sell-scale-95",
                          "enter-to":
                            "sell-opacity-100 sell-translate-y-0 sm:sell-scale-100",
                          leave: "sell-ease-in sell-duration-200",
                          "leave-from":
                            "sell-opacity-100 sell-translate-y-0 sm:sell-scale-100",
                          "leave-to":
                            "sell-opacity-0 sell-translate-y-4 sm:sell-translate-y-0 sm:sell-scale-95",
                        },
                        {
                          default: withCtx(() => [
                            createBaseVNode("div", _hoisted_3, [
                              _ctx.state.hasTag("loading")
                                ? (openBlock(),
                                  createBlock(_component_LoadingSpinner, {
                                    key: 0,
                                  }))
                                : (openBlock(),
                                  createElementBlock("div", _hoisted_4, [
                                    _ctx.stepComponent
                                      ? (openBlock(),
                                        createBlock(
                                          Transition,
                                          {
                                            key: 0,
                                            "enter-active-class":
                                              "sell-duration-500 sell-ease-out",
                                            "enter-from-class":
                                              "sell-opacity-0 -sell-translate-x-full md:sell-translate-x-full",
                                            "enter-to-class":
                                              "sell-opacity-100 sell-translate-x-0",
                                            "leave-active-class":
                                              "sell-duration-500 sell-ease-out",
                                            "leave-from-class":
                                              "sell-opacity-100 sell-translate-x-0",
                                            "leave-to-class":
                                              "sell-opacity-0 -sell-translate-x-full",
                                            mode: "out-in",
                                          },
                                          {
                                            default: withCtx(() => [
                                              (openBlock(),
                                              createBlock(
                                                resolveDynamicComponent(
                                                  _ctx.stepComponent
                                                ),
                                                {
                                                  class:
                                                    "sell-bg-white sell-text-center dark:sell-bg-ultra sell-rounded-2xl sell-shadow-xl",
                                                }
                                              )),
                                            ]),
                                            _: 1,
                                          }
                                        ))
                                      : _ctx.state.matches("invoice_processed")
                                      ? (openBlock(),
                                        createElementBlock("div", _hoisted_5, [
                                          createVNode(_component_SuccessDialog),
                                          createVNode(_component_HeadsUpDialog),
                                        ]))
                                      : _ctx.state.matches("error")
                                      ? (openBlock(),
                                        createBlock(
                                          _component_DialogMessage,
                                          {
                                            key: 2,
                                            class:
                                              "sell-bg-white sell-text-center dark:sell-bg-ultra sell-rounded-2xl sell-shadow-xl",
                                            title: "Whoops",
                                            message: _ctx.context.error.message,
                                          },
                                          {
                                            default: withCtx(() => [
                                              createVNode(
                                                _component_ExclamationCircleIcon,
                                                {
                                                  class:
                                                    "sell-h-24 sell-w-24 sell-text-slate-600",
                                                }
                                              ),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ["message"]
                                        ))
                                      : createCommentVNode("", true),
                                  ])),
                            ]),
                          ]),
                          _: 1,
                        }
                      ),
                      _hoisted_6,
                    ],
                    2
                  ),
                ]),
              ]),
              _: 1,
            }
          ),
        ]),
        _: 1,
      },
      8,
      ["show"]
    )
  );
}

export function onClickCheckout(data) {
  const { state, send: send2 } = useOverlay();
  const el = document.getElementById("sellapplaunch");
  var _a2, _b, _c;
  if (!state.value.matches("closed")) return;
  const store_id = data.store_id ?? el.attributes["data-sell-store"].value;
  const product_id =
    data.product_id ?? el.attributes["data-sell-product"].value;
  const variant_id =
    (_a2 = data.variant ?? el.attributes["data-sell-variant"]) == null
      ? void 0
      : _a2.value;
  const darkMode =
    ((_b = data.darkmode ?? el.attributes["data-sell-darkmode"]) == null
      ? void 0
      : _b.value) === "true";
  const theme =
    (_c = data.theme ?? el.attributes["data-sell-theme"]) == null
      ? void 0
      : _c.value;
  send2({
    type: "OPEN",
    store_id,
    product_id,
    variant_id,
    customization: {
      darkMode,
      theme,
    },
  });
}

var Embed = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
var styles = "";
const app = createApp(Embed);
let container;
"undefined" != typeof window &&
  ((container = document.createElement("div")),
  document.body.append(container)),
  app.mount(container);
