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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95ZGovd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3lkai8uL2NvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vdXNlU3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly95ZGovd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8veWRqLy4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7QUNSQSxNQUFNLFFBQVEsR0FHVixJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRVAsTUFBTSxRQUFRLEdBQUcsQ0FDdEIsVUFBbUQsRUFDbkQsUUFBb0UsRUFDcEUsSUFBZSxFQUNmLEVBQUU7SUFDRixJQUFJLEtBQUssR0FBNkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsSUFBSSxPQUFPLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDcEMsS0FBSyxHQUFHLFVBQVUsQ0FBQztTQUNwQjthQUFNO1lBQ0wsS0FBSyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7U0FDMUI7UUFFRCxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVoQyxZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQ3RCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQzlCLElBQUksTUFBTSxFQUFFO2dCQUNWLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxH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LDhFQUFzQztBQUE3Qiw2R0FBUTtBQUNqQixxRUFBZ0M7QUFBdkIsb0dBQUs7QUFDZCxrRUFBa0M7QUFBekIseUdBQVEiLCJmaWxlIjoieWRqLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3RcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wieWRqXCJdID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInlkalwiXSA9IGZhY3Rvcnkocm9vdFtcInJlYWN0XCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmVhY3RfXykge1xucmV0dXJuICIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBzdG9yZU1hcDogTWFwPFxyXG4gIHlkai5TdG9yZTxhbnk+IHwgKG5ldyAoKSA9PiB5ZGouU3RvcmU8YW55PiksXHJcbiAgeWRqLlN0b3JlPGFueT5cclxuPiA9IG5ldyBNYXAoKTtcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRTdG9yZSA9IDxUPihcclxuICBzdG9yZUNsYXNzOiAobmV3ICgpID0+IHlkai5TdG9yZTxUPikgfCB5ZGouU3RvcmU8VD4sXHJcbiAgc2V0U3RhdGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFQgfCB1bmRlZmluZWQgfCBudWxsPj4sXHJcbiAgaW5pdD86IFQgfCBudWxsXHJcbikgPT4ge1xyXG4gIGxldCB2YWx1ZTogeWRqLlN0b3JlPFQ+IHwgdW5kZWZpbmVkID0gc3RvcmVNYXAuZ2V0KHN0b3JlQ2xhc3MpO1xyXG5cclxuICBpZiAoIXZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHN0b3JlQ2xhc3MgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdmFsdWUgPSBzdG9yZUNsYXNzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWUgPSBuZXcgc3RvcmVDbGFzcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3JlTWFwLnNldChzdG9yZUNsYXNzLCB2YWx1ZSk7XHJcblxyXG4gICAgc2V0QWN0aW9uTWFwKHZhbHVlLCBzZXRTdGF0ZSk7XHJcblxyXG4gICAgaWYgKCF2YWx1ZS5pbml0aWFsaXplZCkge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSB2YWx1ZS5pbml0Py4oKTtcclxuICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgIHJldHVybiByZXN1bHQudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKGluaXQgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZS5zdGF0ZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgIHZhbHVlLnN0YXRlID0gaW5pdDtcclxuICAgICAgICAgICAgdmFsdWUuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHZhbHVlPy5zdGF0ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoaW5pdCAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLnN0YXRlID09PSB1bmRlZmluZWQpIHZhbHVlLnN0YXRlID0gaW5pdDtcclxuICAgICAgICB2YWx1ZS5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnN0YXRlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHNldEFjdGlvbk1hcCh2YWx1ZSwgc2V0U3RhdGUpO1xyXG4gIH1cclxuICByZXR1cm4gdmFsdWUuc3RhdGU7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U3RvcmUgPSA8VD4oXHJcbiAgc3RvcmVDbGFzczogKG5ldyAoKSA9PiB5ZGouU3RvcmU8VD4pIHwgeWRqLlN0b3JlPFQ+XHJcbikgPT4ge1xyXG4gIHJldHVybiBzdG9yZU1hcC5nZXQoc3RvcmVDbGFzcyk7XHJcbn07XHJcblxyXG5jb25zdCBhY3Rpb25NYXA6IHlkai5BY3Rpb25NYXAgPSB7fTtcclxuXHJcbmNvbnN0IHNldEFjdGlvbk1hcCA9IDxUPihcclxuICBzdG9yZTogeWRqLlN0b3JlPFQ+LFxyXG4gIHNldFN0YXRlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxUIHwgdW5kZWZpbmVkIHwgbnVsbD4+XHJcbikgPT4ge1xyXG4gIGZvciAobGV0IGFjdGlvbiBpbiBzdG9yZS5hY3Rpb25zKSB7XHJcbiAgICBpZiAoIWFjdGlvbk1hcFthY3Rpb25dKSB7XHJcbiAgICAgIGFjdGlvbk1hcFthY3Rpb25dID0ge1xyXG4gICAgICAgIHN0b3JlLFxyXG4gICAgICAgIHNldFN0YXRlczogW10sXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IHN0b3JlOiB0YXJnZXQsIHNldFN0YXRlcyB9ID0gYWN0aW9uTWFwW2FjdGlvbl07XHJcblxyXG4gICAgaWYgKHN0b3JlICE9PSB0YXJnZXQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdG9yZSBhY3Rpb25zIGNvbmZsaWN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzZXRTdGF0ZXMuaW5jbHVkZXMoc2V0U3RhdGUpKSB7XHJcbiAgICAgIHNldFN0YXRlcy5wdXNoKHNldFN0YXRlKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVtb3ZlU3RvcmUgPSA8VD4oXHJcbiAgc3RvcmU6IHlkai5TdG9yZTxUPixcclxuICBzZXRTdGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248VCB8IHVuZGVmaW5lZCB8IG51bGw+PlxyXG4pID0+IHtcclxuICBPYmplY3Qua2V5cyhzdG9yZS5hY3Rpb25zKS5mb3JFYWNoKChhY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IHsgc3RvcmU6IHRhcmdldCwgc2V0U3RhdGVzIH0gPSBhY3Rpb25NYXBbYWN0aW9uXTtcclxuICAgIGlmIChzdG9yZSA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgIGNvbnN0IG5ld1NldFN0YXRlcyA9IHNldFN0YXRlcy5maWx0ZXIoKHNTdGF0ZSkgPT4gc1N0YXRlICE9PSBzZXRTdGF0ZSk7XHJcbiAgICAgIGFjdGlvbk1hcFthY3Rpb25dLnNldFN0YXRlcyA9IG5ld1NldFN0YXRlcztcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHNldFN0YXRlc0ZuID0gPFQ+KFxyXG4gIHNldFN0YXRlczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248VCB8IHVuZGVmaW5lZCB8IG51bGw+PltdLFxyXG4gIHN0YXRlOiBhbnlcclxuKSA9PiB7XHJcbiAgc2V0U3RhdGVzLmZvckVhY2goKHNldFN0YXRlKSA9PiB7XHJcbiAgICBzZXRTdGF0ZShzdGF0ZSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBjaGFpbkRpc3BhdGNoID0gKHJlc3VsdDogeWRqLklTdG9yZVJldHVybiB8IHZvaWQpOiB2b2lkID0+IHtcclxuICBpZiAocmVzdWx0KSB7XHJcbiAgICBkaXNwYXRjaChyZXN1bHQuYWN0aW9uLCByZXN1bHQuZGF0YSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRpc3BhdGNoID0gPFQ+KGFjdGlvbjogc3RyaW5nLCBhcmdzPzogVCkgPT4ge1xyXG4gIGlmIChhY3Rpb25NYXBbYWN0aW9uXSkge1xyXG4gICAgY29uc3QgeyBzdG9yZSwgc2V0U3RhdGVzIH0gPSBhY3Rpb25NYXBbYWN0aW9uXTtcclxuICAgIGNvbnN0IGNhbGxiYWNrID0gc3RvcmUuYWN0aW9uc1thY3Rpb25dO1xyXG4gICAgY29uc3QgcmVzID0gY2FsbGJhY2suY2FsbChzdG9yZSwgYXJncyk7XHJcblxyXG4gICAgaWYgKHJlcykge1xyXG4gICAgICBpZiAocmVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgIHJlcy50aGVuKChyZXN1bHQ6IHlkai5JU3RvcmVSZXR1cm4gfCB2b2lkKSA9PiB7XHJcbiAgICAgICAgICBzZXRTdGF0ZXNGbihzZXRTdGF0ZXMsIHN0b3JlLnN0YXRlKTtcclxuICAgICAgICAgIGNoYWluRGlzcGF0Y2gocmVzdWx0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRTdGF0ZXNGbihzZXRTdGF0ZXMsIHN0b3JlLnN0YXRlKTtcclxuICAgICAgICBjaGFpbkRpc3BhdGNoKHJlcyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldFN0YXRlc0ZuKHNldFN0YXRlcywgc3RvcmUuc3RhdGUpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuIiwiZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0b3JlPFQ+IGltcGxlbWVudHMgeWRqLlN0b3JlPFQ+IHtcclxuICBzdGF0ZT86IFQgfCBudWxsO1xyXG4gIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgYWJzdHJhY3QgYWN0aW9uczoge1xyXG4gICAgW2FjdGlvbjogc3RyaW5nXTogeWRqLlN0b3JlQ2FsbGJhY2s7XHJcbiAgfTtcclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbiAgc2V0U3RhdGUoc3RhdGU6IFQgfCBudWxsKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZSAhPT0gc3RhdGUpIHtcclxuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBhZGRTdG9yZSwgZ2V0U3RvcmUsIHJlbW92ZVN0b3JlIH0gZnJvbSAnLi4vY29yZSc7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlU3RvcmUgPSA8VD4oXHJcbiAgc3RvcmVDbGFzczogKG5ldyAoKSA9PiB5ZGouU3RvcmU8VD4pIHwgeWRqLlN0b3JlPFQ+LFxyXG4gIGluaXQ/OiBUIHwgbnVsbFxyXG4pID0+IHtcclxuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKGluaXQpO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBpbml0U3RhdGUgPSBhZGRTdG9yZShzdG9yZUNsYXNzLCBzZXRTdGF0ZSwgaW5pdCk7XHJcbiAgICBpZiAoaW5pdFN0YXRlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICBpbml0U3RhdGUudGhlbigoaVN0YXRlKSA9PiB7XHJcbiAgICAgICAgc2V0U3RhdGUoaVN0YXRlKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRTdGF0ZShpbml0U3RhdGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZ2V0U3RvcmUoc3RvcmVDbGFzcyk7XHJcbiAgICAgIGlmICh0YXJnZXQpIHJlbW92ZVN0b3JlKHRhcmdldCwgc2V0U3RhdGUpO1xyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcbiAgcmV0dXJuIHN0YXRlO1xyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmVhY3RfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiZXhwb3J0IHsgdXNlU3RvcmUgfSBmcm9tICcuL3VzZVN0b3JlJztcclxuZXhwb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcclxuZXhwb3J0IHsgZGlzcGF0Y2ggfSBmcm9tICcuL2NvcmUnO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9