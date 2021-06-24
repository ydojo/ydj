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
const chainDispatch = (result) => {
    if (result) {
        exports.dispatch(result.action, result.data);
    }
};
const dispatch = (action, args) => {
    if (actionMap[action]) {
        const { store, setStates } = actionMap[action];
        const callback = store.actions[action];
        const res = callback.call(store, args);
        if (res) {
            if (res instanceof Promise) {
                res.then((result) => {
                    setStatesFn(setStates, store.state);
                    chainDispatch(result);
                });
            }
            else {
                setStatesFn(setStates, store.state);
                chainDispatch(res);
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
    }, []);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95ZGovd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3lkai8uL2NvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vdXNlU3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly95ZGovd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8veWRqLy4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7QUNSQSxNQUFNLFFBQVEsR0FHVixJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRVAsTUFBTSxRQUFRLEdBQUcsQ0FDdEIsVUFBbUQsRUFDbkQsUUFBb0UsRUFDcEUsSUFBZSxFQUNmLEVBQUU7SUFDRixJQUFJLEtBQUssR0FBNkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsSUFBSSxPQUFPLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDcEMsS0FBSyxHQUFHLFVBQVUsQ0FBQztTQUNwQjthQUFNO1lBQ0wsS0FBSyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7U0FDMUI7UUFFRCxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVoQyxZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQ3RCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQzlCLElBQUksTUFBTSxFQUFFO2dCQUNWLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxH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QUNBO1VBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0QkEsOEVBQXNDO0FBQTdCLDZHQUFRO0FBQ2pCLHFFQUFnQztBQUF2QixvR0FBSztBQUNkLGtFQUFrQztBQUF6Qix5R0FBUSIsImZpbGUiOiJ5ZGouanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJyZWFjdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ5ZGpcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wieWRqXCJdID0gZmFjdG9yeShyb290W1wicmVhY3RcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yZWFjdF9fKSB7XG5yZXR1cm4gIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNvbnN0IHN0b3JlTWFwOiBNYXA8XHJcbiAgeWRqLlN0b3JlPGFueT4gfCAobmV3ICgpID0+IHlkai5TdG9yZTxhbnk+KSxcclxuICB5ZGouU3RvcmU8YW55PlxyXG4+ID0gbmV3IE1hcCgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZFN0b3JlID0gPFQ+KFxyXG4gIHN0b3JlQ2xhc3M6IChuZXcgKCkgPT4geWRqLlN0b3JlPFQ+KSB8IHlkai5TdG9yZTxUPixcclxuICBzZXRTdGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248VCB8IHVuZGVmaW5lZCB8IG51bGw+PixcclxuICBpbml0PzogVCB8IG51bGxcclxuKSA9PiB7XHJcbiAgbGV0IHZhbHVlOiB5ZGouU3RvcmU8VD4gfCB1bmRlZmluZWQgPSBzdG9yZU1hcC5nZXQoc3RvcmVDbGFzcyk7XHJcblxyXG4gIGlmICghdmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2Ygc3RvcmVDbGFzcyAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB2YWx1ZSA9IHN0b3JlQ2xhc3M7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWx1ZSA9IG5ldyBzdG9yZUNsYXNzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcmVNYXAuc2V0KHN0b3JlQ2xhc3MsIHZhbHVlKTtcclxuXHJcbiAgICBzZXRBY3Rpb25NYXAodmFsdWUsIHNldFN0YXRlKTtcclxuXHJcbiAgICBpZiAoIXZhbHVlLmluaXRpYWxpemVkKSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbHVlLmluaXQ/LigpO1xyXG4gICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAoaW5pdCAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLnN0YXRlID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgdmFsdWUuc3RhdGUgPSBpbml0O1xyXG4gICAgICAgICAgICB2YWx1ZS5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdmFsdWU/LnN0YXRlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChpbml0ICE9PSB1bmRlZmluZWQgJiYgdmFsdWUuc3RhdGUgPT09IHVuZGVmaW5lZCkgdmFsdWUuc3RhdGUgPSBpbml0O1xyXG4gICAgICAgIHZhbHVlLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdmFsdWUuc3RhdGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgc2V0QWN0aW9uTWFwKHZhbHVlLCBzZXRTdGF0ZSk7XHJcbiAgfVxyXG4gIHJldHVybiB2YWx1ZS5zdGF0ZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRTdG9yZSA9IDxUPihcclxuICBzdG9yZUNsYXNzOiAobmV3ICgpID0+IHlkai5TdG9yZTxUPikgfCB5ZGouU3RvcmU8VD5cclxuKSA9PiB7XHJcbiAgcmV0dXJuIHN0b3JlTWFwLmdldChzdG9yZUNsYXNzKTtcclxufTtcclxuXHJcbmNvbnN0IGFjdGlvbk1hcDogeWRqLkFjdGlvbk1hcCA9IHt9O1xyXG5cclxuY29uc3Qgc2V0QWN0aW9uTWFwID0gPFQ+KFxyXG4gIHN0b3JlOiB5ZGouU3RvcmU8VD4sXHJcbiAgc2V0U3RhdGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFQgfCB1bmRlZmluZWQgfCBudWxsPj5cclxuKSA9PiB7XHJcbiAgZm9yIChsZXQgYWN0aW9uIGluIHN0b3JlLmFjdGlvbnMpIHtcclxuICAgIGlmICghYWN0aW9uTWFwW2FjdGlvbl0pIHtcclxuICAgICAgYWN0aW9uTWFwW2FjdGlvbl0gPSB7XHJcbiAgICAgICAgc3RvcmUsXHJcbiAgICAgICAgc2V0U3RhdGVzOiBbXSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgc3RvcmU6IHRhcmdldCwgc2V0U3RhdGVzIH0gPSBhY3Rpb25NYXBbYWN0aW9uXTtcclxuXHJcbiAgICBpZiAoc3RvcmUgIT09IHRhcmdldCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0b3JlIGFjdGlvbnMgY29uZmxpY3QnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXNldFN0YXRlcy5pbmNsdWRlcyhzZXRTdGF0ZSkpIHtcclxuICAgICAgc2V0U3RhdGVzLnB1c2goc2V0U3RhdGUpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZW1vdmVTdG9yZSA9IDxUPihcclxuICBzdG9yZTogeWRqLlN0b3JlPFQ+LFxyXG4gIHNldFN0YXRlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxUIHwgdW5kZWZpbmVkIHwgbnVsbD4+XHJcbikgPT4ge1xyXG4gIE9iamVjdC5rZXlzKHN0b3JlLmFjdGlvbnMpLmZvckVhY2goKGFjdGlvbikgPT4ge1xyXG4gICAgY29uc3QgeyBzdG9yZTogdGFyZ2V0LCBzZXRTdGF0ZXMgfSA9IGFjdGlvbk1hcFthY3Rpb25dO1xyXG4gICAgaWYgKHN0b3JlID09PSB0YXJnZXQpIHtcclxuICAgICAgY29uc3QgbmV3U2V0U3RhdGVzID0gc2V0U3RhdGVzLmZpbHRlcigoc1N0YXRlKSA9PiBzU3RhdGUgIT09IHNldFN0YXRlKTtcclxuICAgICAgYWN0aW9uTWFwW2FjdGlvbl0uc2V0U3RhdGVzID0gbmV3U2V0U3RhdGVzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3Qgc2V0U3RhdGVzRm4gPSA8VD4oXHJcbiAgc2V0U3RhdGVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxUIHwgdW5kZWZpbmVkIHwgbnVsbD4+W10sXHJcbiAgc3RhdGU6IGFueVxyXG4pID0+IHtcclxuICBzZXRTdGF0ZXMuZm9yRWFjaCgoc2V0U3RhdGUpID0+IHtcclxuICAgIHNldFN0YXRlKHN0YXRlKTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGNoYWluRGlzcGF0Y2ggPSAocmVzdWx0OiB5ZGouSVN0b3JlUmV0dXJuIHwgdm9pZCk6IHZvaWQgPT4ge1xyXG4gIGlmIChyZXN1bHQpIHtcclxuICAgIGRpc3BhdGNoKHJlc3VsdC5hY3Rpb24sIHJlc3VsdC5kYXRhKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGlzcGF0Y2ggPSA8VD4oYWN0aW9uOiBzdHJpbmcsIGFyZ3M/OiBUKSA9PiB7XHJcbiAgaWYgKGFjdGlvbk1hcFthY3Rpb25dKSB7XHJcbiAgICBjb25zdCB7IHN0b3JlLCBzZXRTdGF0ZXMgfSA9IGFjdGlvbk1hcFthY3Rpb25dO1xyXG4gICAgY29uc3QgY2FsbGJhY2sgPSBzdG9yZS5hY3Rpb25zW2FjdGlvbl07XHJcbiAgICBjb25zdCByZXMgPSBjYWxsYmFjay5jYWxsKHN0b3JlLCBhcmdzKTtcclxuXHJcbiAgICBpZiAocmVzKSB7XHJcbiAgICAgIGlmIChyZXMgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgcmVzLnRoZW4oKHJlc3VsdDogeWRqLklTdG9yZVJldHVybiB8IHZvaWQpID0+IHtcclxuICAgICAgICAgIHNldFN0YXRlc0ZuKHNldFN0YXRlcywgc3RvcmUuc3RhdGUpO1xyXG4gICAgICAgICAgY2hhaW5EaXNwYXRjaChyZXN1bHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFN0YXRlc0ZuKHNldFN0YXRlcywgc3RvcmUuc3RhdGUpO1xyXG4gICAgICAgIGNoYWluRGlzcGF0Y2gocmVzKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0U3RhdGVzRm4oc2V0U3RhdGVzLCBzdG9yZS5zdGF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG4iLCJleHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RvcmU8VD4gaW1wbGVtZW50cyB5ZGouU3RvcmU8VD4ge1xyXG4gIHN0YXRlOiBUIHwgbnVsbCA9IG51bGw7XHJcbiAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBhYnN0cmFjdCBhY3Rpb25zOiB7XHJcbiAgICBbYWN0aW9uOiBzdHJpbmddOiB5ZGouU3RvcmVDYWxsYmFjaztcclxuICB9O1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuICBzZXRTdGF0ZShzdGF0ZTogVCB8IG51bGwpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnN0YXRlICE9PSBzdGF0ZSkge1xyXG4gICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGFkZFN0b3JlLCBnZXRTdG9yZSwgcmVtb3ZlU3RvcmUgfSBmcm9tICcuLi9jb3JlJztcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VTdG9yZSA9IDxUPihcclxuICBzdG9yZUNsYXNzOiAobmV3ICgpID0+IHlkai5TdG9yZTxUPikgfCB5ZGouU3RvcmU8VD4sXHJcbiAgaW5pdD86IFQgfCBudWxsXHJcbikgPT4ge1xyXG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGUoaW5pdCk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGluaXRTdGF0ZSA9IGFkZFN0b3JlKHN0b3JlQ2xhc3MsIHNldFN0YXRlLCBpbml0KTtcclxuICAgIGlmIChpbml0U3RhdGUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgIGluaXRTdGF0ZS50aGVuKChpU3RhdGUpID0+IHtcclxuICAgICAgICBzZXRTdGF0ZShpU3RhdGUpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldFN0YXRlKGluaXRTdGF0ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBnZXRTdG9yZShzdG9yZUNsYXNzKTtcclxuICAgICAgaWYgKHRhcmdldCkgcmVtb3ZlU3RvcmUodGFyZ2V0LCBzZXRTdGF0ZSk7XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuICByZXR1cm4gc3RhdGU7XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yZWFjdF9fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJleHBvcnQgeyB1c2VTdG9yZSB9IGZyb20gJy4vdXNlU3RvcmUnO1xyXG5leHBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xyXG5leHBvcnQgeyBkaXNwYXRjaCB9IGZyb20gJy4vY29yZSc7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=