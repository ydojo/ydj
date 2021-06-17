(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ydj"] = factory(require("react"));
	else
		root["ydj"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./core/index.ts":
/*!***********************!*\
  !*** ./core/index.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dispatch = exports.removeStore = exports.getStore = exports.addStore = void 0;
const storeMap = new Map();
const addStore = (storeClass, setState, init) => {
    let value = storeMap.get(storeClass);
    if (!value) {
        if (typeof storeClass !== 'function') {
            value = storeClass;
        }
        else {
            value = new storeClass();
        }
        storeMap.set(storeClass, value);
        setActionMap(value, setState);
        if (!value.initialized) {
            const result = value.init?.();
            if (result) {
                return result.then(() => {
                    if (value) {
                        if (init !== undefined && value.state === undefined)
                            value.state = init;
                        value.initialized = true;
                    }
                    return value?.state;
                });
            }
            else {
                if (init !== undefined && value.state === undefined)
                    value.state = init;
                value.initialized = true;
                return value.state;
            }
        }
    }
    else {
        setActionMap(value, setState);
    }
    return value.state;
};
exports.addStore = addStore;
const getStore = (storeClass) => {
    return storeMap.get(storeClass);
};
exports.getStore = getStore;
const actionMap = {};
const setActionMap = (store, setState) => {
    for (let action in store.actions) {
        if (!actionMap[action]) {
            actionMap[action] = {
                store,
                setStates: [],
            };
        }
        const { store: target, setStates } = actionMap[action];
        if (store !== target) {
            throw new Error('store actions conflict');
        }
        if (!setStates.includes(setState)) {
            setStates.push(setState);
        }
    }
};
const removeStore = (store, setState) => {
    Object.keys(store.actions).forEach((action) => {
        const { store: target, setStates } = actionMap[action];
        if (store === target) {
            const newSetStates = setStates.filter((sState) => sState !== setState);
            actionMap[action].setStates = newSetStates;
        }
    });
};
exports.removeStore = removeStore;
const setStatesFn = (setStates, state) => {
    setStates.forEach((setState) => {
        setState(state);
    });
};
const dispatch = (action, args) => {
    if (actionMap[action]) {
        const { store, setStates } = actionMap[action];
        const callback = store.actions[action];
        const res = callback.call(store, args);
        if (res) {
            if (res instanceof Promise) {
                res.then(() => setStatesFn(setStates, store.state));
            }
            else {
                const { action: ac, data } = res;
                if (data instanceof Promise) {
                    data.then((val) => {
                        setStatesFn(setStates, store.state);
                        exports.dispatch(ac, val);
                    });
                }
                else {
                    setStatesFn(setStates, store.state);
                    exports.dispatch(ac, data);
                }
            }
        }
        else {
            setStatesFn(setStates, store.state);
        }
    }
};
exports.dispatch = dispatch;


/***/ }),

/***/ "./store/index.ts":
/*!************************!*\
  !*** ./store/index.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Store = void 0;
class Store {
    constructor() {
        this.state = null;
        this.initialized = false;
    }
    setState(state) {
        if (this.state !== state) {
            this.state = state;
        }
    }
}
exports.Store = Store;


/***/ }),

/***/ "./useStore/index.ts":
/*!***************************!*\
  !*** ./useStore/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useStore = void 0;
const react_1 = __webpack_require__(/*! react */ "react");
const core_1 = __webpack_require__(/*! ../core */ "./core/index.ts");
const useStore = (storeClass, init) => {
    const [state, setState] = react_1.useState(init);
    react_1.useEffect(() => {
        const initState = core_1.addStore(storeClass, setState, init);
        if (initState instanceof Promise) {
            initState.then((iState) => {
                setState(iState);
            });
        }
        else {
            setState(initState);
        }
        return () => {
            const target = core_1.getStore(storeClass);
            if (target)
                core_1.removeStore(target, setState);
        };
    });
    return state;
};
exports.useStore = useStore;


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!******************!*\
  !*** ./index.ts ***!
  \******************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dispatch = exports.Store = exports.useStore = void 0;
var useStore_1 = __webpack_require__(/*! ./useStore */ "./useStore/index.ts");
Object.defineProperty(exports, "useStore", ({ enumerable: true, get: function () { return useStore_1.useStore; } }));
var store_1 = __webpack_require__(/*! ./store */ "./store/index.ts");
Object.defineProperty(exports, "Store", ({ enumerable: true, get: function () { return store_1.Store; } }));
var core_1 = __webpack_require__(/*! ./core */ "./core/index.ts");
Object.defineProperty(exports, "dispatch", ({ enumerable: true, get: function () { return core_1.dispatch; } }));

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95ZGovd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3lkai8uL2NvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vdXNlU3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly95ZGovd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8veWRqLy4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7QUNSQSxNQUFNLFFBQVEsR0FHVixJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRVAsTUFBTSxRQUFRLEdBQUcsQ0FDdEIsVUFBbUQsRUFDbkQsUUFBb0UsRUFDcEUsSUFBZSxFQUNmLEVBQUU7SUFDRixJQUFJLEtBQUssR0FBNkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsSUFBSSxPQUFPLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDcEMsS0FBSyxHQUFHLFVBQVUsQ0FBQztTQUNwQjthQUFNO1lBQ0wsS0FBSyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7U0FDMUI7UUFFRCxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVoQyxZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQ3RCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQzlCLElBQUksTUFBTSxFQUFFO2dCQUNWLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxH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Q0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7OztBQ3RCQSw4RUFBc0M7QUFBN0IsNkdBQVE7QUFDakIscUVBQWdDO0FBQXZCLG9HQUFLO0FBQ2Qsa0VBQWtDO0FBQXpCLHlHQUFRIiwiZmlsZSI6Inlkai5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInJlYWN0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInlkalwiXSA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ5ZGpcIl0gPSBmYWN0b3J5KHJvb3RbXCJyZWFjdFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JlYWN0X18pIHtcbnJldHVybiAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY29uc3Qgc3RvcmVNYXA6IE1hcDxcclxuICB5ZGouU3RvcmU8YW55PiB8IChuZXcgKCkgPT4geWRqLlN0b3JlPGFueT4pLFxyXG4gIHlkai5TdG9yZTxhbnk+XHJcbj4gPSBuZXcgTWFwKCk7XHJcblxyXG5leHBvcnQgY29uc3QgYWRkU3RvcmUgPSA8VD4oXHJcbiAgc3RvcmVDbGFzczogKG5ldyAoKSA9PiB5ZGouU3RvcmU8VD4pIHwgeWRqLlN0b3JlPFQ+LFxyXG4gIHNldFN0YXRlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxUIHwgdW5kZWZpbmVkIHwgbnVsbD4+LFxyXG4gIGluaXQ/OiBUIHwgbnVsbFxyXG4pID0+IHtcclxuICBsZXQgdmFsdWU6IHlkai5TdG9yZTxUPiB8IHVuZGVmaW5lZCA9IHN0b3JlTWFwLmdldChzdG9yZUNsYXNzKTtcclxuXHJcbiAgaWYgKCF2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBzdG9yZUNsYXNzICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHZhbHVlID0gc3RvcmVDbGFzcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbHVlID0gbmV3IHN0b3JlQ2xhc3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9yZU1hcC5zZXQoc3RvcmVDbGFzcywgdmFsdWUpO1xyXG5cclxuICAgIHNldEFjdGlvbk1hcCh2YWx1ZSwgc2V0U3RhdGUpO1xyXG5cclxuICAgIGlmICghdmFsdWUuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gdmFsdWUuaW5pdD8uKCk7XHJcbiAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICByZXR1cm4gcmVzdWx0LnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChpbml0ICE9PSB1bmRlZmluZWQgJiYgdmFsdWUuc3RhdGUgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICB2YWx1ZS5zdGF0ZSA9IGluaXQ7XHJcbiAgICAgICAgICAgIHZhbHVlLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB2YWx1ZT8uc3RhdGU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGluaXQgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZS5zdGF0ZSA9PT0gdW5kZWZpbmVkKSB2YWx1ZS5zdGF0ZSA9IGluaXQ7XHJcbiAgICAgICAgdmFsdWUuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS5zdGF0ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBzZXRBY3Rpb25NYXAodmFsdWUsIHNldFN0YXRlKTtcclxuICB9XHJcbiAgcmV0dXJuIHZhbHVlLnN0YXRlO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFN0b3JlID0gPFQ+KFxyXG4gIHN0b3JlQ2xhc3M6IChuZXcgKCkgPT4geWRqLlN0b3JlPFQ+KSB8IHlkai5TdG9yZTxUPlxyXG4pID0+IHtcclxuICByZXR1cm4gc3RvcmVNYXAuZ2V0KHN0b3JlQ2xhc3MpO1xyXG59O1xyXG5cclxuY29uc3QgYWN0aW9uTWFwOiB5ZGouQWN0aW9uTWFwID0ge307XHJcblxyXG5jb25zdCBzZXRBY3Rpb25NYXAgPSA8VD4oXHJcbiAgc3RvcmU6IHlkai5TdG9yZTxUPixcclxuICBzZXRTdGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248VCB8IHVuZGVmaW5lZCB8IG51bGw+PlxyXG4pID0+IHtcclxuICBmb3IgKGxldCBhY3Rpb24gaW4gc3RvcmUuYWN0aW9ucykge1xyXG4gICAgaWYgKCFhY3Rpb25NYXBbYWN0aW9uXSkge1xyXG4gICAgICBhY3Rpb25NYXBbYWN0aW9uXSA9IHtcclxuICAgICAgICBzdG9yZSxcclxuICAgICAgICBzZXRTdGF0ZXM6IFtdLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyBzdG9yZTogdGFyZ2V0LCBzZXRTdGF0ZXMgfSA9IGFjdGlvbk1hcFthY3Rpb25dO1xyXG5cclxuICAgIGlmIChzdG9yZSAhPT0gdGFyZ2V0KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignc3RvcmUgYWN0aW9ucyBjb25mbGljdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghc2V0U3RhdGVzLmluY2x1ZGVzKHNldFN0YXRlKSkge1xyXG4gICAgICBzZXRTdGF0ZXMucHVzaChzZXRTdGF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlbW92ZVN0b3JlID0gPFQ+KFxyXG4gIHN0b3JlOiB5ZGouU3RvcmU8VD4sXHJcbiAgc2V0U3RhdGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFQgfCB1bmRlZmluZWQgfCBudWxsPj5cclxuKSA9PiB7XHJcbiAgT2JqZWN0LmtleXMoc3RvcmUuYWN0aW9ucykuZm9yRWFjaCgoYWN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCB7IHN0b3JlOiB0YXJnZXQsIHNldFN0YXRlcyB9ID0gYWN0aW9uTWFwW2FjdGlvbl07XHJcbiAgICBpZiAoc3RvcmUgPT09IHRhcmdldCkge1xyXG4gICAgICBjb25zdCBuZXdTZXRTdGF0ZXMgPSBzZXRTdGF0ZXMuZmlsdGVyKChzU3RhdGUpID0+IHNTdGF0ZSAhPT0gc2V0U3RhdGUpO1xyXG4gICAgICBhY3Rpb25NYXBbYWN0aW9uXS5zZXRTdGF0ZXMgPSBuZXdTZXRTdGF0ZXM7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBzZXRTdGF0ZXNGbiA9IDxUPihcclxuICBzZXRTdGF0ZXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFQgfCB1bmRlZmluZWQgfCBudWxsPj5bXSxcclxuICBzdGF0ZTogYW55XHJcbikgPT4ge1xyXG4gIHNldFN0YXRlcy5mb3JFYWNoKChzZXRTdGF0ZSkgPT4ge1xyXG4gICAgc2V0U3RhdGUoc3RhdGUpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRpc3BhdGNoID0gPFQ+KGFjdGlvbjogc3RyaW5nLCBhcmdzPzogVCkgPT4ge1xyXG4gIGlmIChhY3Rpb25NYXBbYWN0aW9uXSkge1xyXG4gICAgY29uc3QgeyBzdG9yZSwgc2V0U3RhdGVzIH0gPSBhY3Rpb25NYXBbYWN0aW9uXTtcclxuICAgIGNvbnN0IGNhbGxiYWNrID0gc3RvcmUuYWN0aW9uc1thY3Rpb25dO1xyXG4gICAgY29uc3QgcmVzID0gY2FsbGJhY2suY2FsbChzdG9yZSwgYXJncyk7XHJcblxyXG4gICAgaWYgKHJlcykge1xyXG4gICAgICBpZiAocmVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgIHJlcy50aGVuKCgpID0+IHNldFN0YXRlc0ZuKHNldFN0YXRlcywgc3RvcmUuc3RhdGUpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCB7IGFjdGlvbjogYWMsIGRhdGEgfSA9IHJlcztcclxuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICAgIGRhdGEudGhlbigodmFsKSA9PiB7XHJcbiAgICAgICAgICAgIHNldFN0YXRlc0ZuKHNldFN0YXRlcywgc3RvcmUuc3RhdGUpO1xyXG4gICAgICAgICAgICBkaXNwYXRjaChhYywgdmFsKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZXRTdGF0ZXNGbihzZXRTdGF0ZXMsIHN0b3JlLnN0YXRlKTtcclxuICAgICAgICAgIGRpc3BhdGNoKGFjLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldFN0YXRlc0ZuKHNldFN0YXRlcywgc3RvcmUuc3RhdGUpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuIiwiZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0b3JlPFQ+IGltcGxlbWVudHMgeWRqLlN0b3JlPFQ+IHtcclxuICBzdGF0ZTogVCB8IG51bGwgPSBudWxsO1xyXG4gIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgYWJzdHJhY3QgYWN0aW9uczoge1xyXG4gICAgW2FjdGlvbjogc3RyaW5nXTogeWRqLlN0b3JlQ2FsbGJhY2s7XHJcbiAgfTtcclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbiAgc2V0U3RhdGUoc3RhdGU6IFQgfCBudWxsKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZSAhPT0gc3RhdGUpIHtcclxuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBhZGRTdG9yZSwgZ2V0U3RvcmUsIHJlbW92ZVN0b3JlIH0gZnJvbSAnLi4vY29yZSc7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlU3RvcmUgPSA8VD4oXHJcbiAgc3RvcmVDbGFzczogKG5ldyAoKSA9PiB5ZGouU3RvcmU8VD4pIHwgeWRqLlN0b3JlPFQ+LFxyXG4gIGluaXQ/OiBUIHwgbnVsbFxyXG4pID0+IHtcclxuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKGluaXQpO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBpbml0U3RhdGUgPSBhZGRTdG9yZShzdG9yZUNsYXNzLCBzZXRTdGF0ZSwgaW5pdCk7XHJcbiAgICBpZiAoaW5pdFN0YXRlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICBpbml0U3RhdGUudGhlbigoaVN0YXRlKSA9PiB7XHJcbiAgICAgICAgc2V0U3RhdGUoaVN0YXRlKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRTdGF0ZShpbml0U3RhdGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZ2V0U3RvcmUoc3RvcmVDbGFzcyk7XHJcbiAgICAgIGlmICh0YXJnZXQpIHJlbW92ZVN0b3JlKHRhcmdldCwgc2V0U3RhdGUpO1xyXG4gICAgfTtcclxuICB9KTtcclxuICByZXR1cm4gc3RhdGU7XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yZWFjdF9fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJleHBvcnQgeyB1c2VTdG9yZSB9IGZyb20gJy4vdXNlU3RvcmUnO1xyXG5leHBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xyXG5leHBvcnQgeyBkaXNwYXRjaCB9IGZyb20gJy4vY29yZSc7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=