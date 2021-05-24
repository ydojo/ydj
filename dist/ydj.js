(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ydj"] = factory(require("react"));
	else
		root["ydj"] = factory(root["react"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./core/index.ts":
/*!***********************!*\
  !*** ./core/index.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dispatch = exports.getStore = exports.addStore = void 0;
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
            actionMap[action] = { store, setState };
        }
        else {
            new Error(`conflict action name: ${action}`);
        }
    }
};
const dispatch = (action, args) => {
    if (actionMap[action]) {
        const { store, setState } = actionMap[action];
        const callback = store.actions[action];
        const res = callback.call(store, args);
        if (res) {
            if (res instanceof Promise) {
                res.then(() => setState(store.state));
            }
            else {
                const { action: ac, data } = res;
                if (data instanceof Promise) {
                    data.then((val) => {
                        setState(store.state);
                        exports.dispatch(ac, val);
                    });
                }
                else {
                    setState(store.state);
                    exports.dispatch(ac, data);
                }
            }
        }
        else {
            setState(store.state);
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
        const store = core_1.getStore(storeClass);
        if (!store) {
            const initState = core_1.addStore(storeClass, setState, init);
            if (initState instanceof Promise) {
                initState.then((iState) => {
                    setState(iState);
                });
            }
            else {
                setState(initState);
            }
        }
    });
    return [state, core_1.dispatch];
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
exports.Store = exports.useStore = void 0;
var useStore_1 = __webpack_require__(/*! ./useStore */ "./useStore/index.ts");
Object.defineProperty(exports, "useStore", ({ enumerable: true, get: function () { return useStore_1.useStore; } }));
var store_1 = __webpack_require__(/*! ./store */ "./store/index.ts");
Object.defineProperty(exports, "Store", ({ enumerable: true, get: function () { return store_1.Store; } }));

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95ZGovd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3lkai8uL2NvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vdXNlU3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly95ZGovd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8veWRqLy4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7QUNSQSxNQUFNLFFBQVEsR0FHVixJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRVAsTUFBTSxRQUFRLEdBQUcsQ0FDdEIsVUFBbUQsRUFDbkQsUUFBb0UsRUFDcEUsSUFBZSxFQUNmLEVBQUU7SUFDRixJQUFJLEtBQUssR0FBNkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsSUFBSSxPQUFPLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDcEMsS0FBSyxHQUFHLFVBQVUsQ0FBQztTQUNwQjthQUFNO1lBQ0wsS0FBSyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7U0FDMUI7UUFFRCxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVoQyxZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQ3RCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQzlCLElBQUksTUFBTSxFQUFFO2dCQUNWLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxH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QTtVQUNBOzs7Ozs7Ozs7Ozs7O0FDdEJBLDhFQUFzQztBQUE3Qiw2R0FBUTtBQUNqQixxRUFBZ0M7QUFBdkIsb0dBQUsiLCJmaWxlIjoieWRqLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3RcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wieWRqXCJdID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInlkalwiXSA9IGZhY3Rvcnkocm9vdFtcInJlYWN0XCJdKTtcbn0pKHNlbGYsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmVhY3RfXykge1xucmV0dXJuICIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBzdG9yZU1hcDogTWFwPFxyXG4gIHlkai5TdG9yZTxhbnk+IHwgKG5ldyAoKSA9PiB5ZGouU3RvcmU8YW55PiksXHJcbiAgeWRqLlN0b3JlPGFueT5cclxuPiA9IG5ldyBNYXAoKTtcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRTdG9yZSA9IDxUPihcclxuICBzdG9yZUNsYXNzOiAobmV3ICgpID0+IHlkai5TdG9yZTxUPikgfCB5ZGouU3RvcmU8VD4sXHJcbiAgc2V0U3RhdGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFQgfCB1bmRlZmluZWQgfCBudWxsPj4sXHJcbiAgaW5pdD86IFQgfCBudWxsXHJcbikgPT4ge1xyXG4gIGxldCB2YWx1ZTogeWRqLlN0b3JlPFQ+IHwgdW5kZWZpbmVkID0gc3RvcmVNYXAuZ2V0KHN0b3JlQ2xhc3MpO1xyXG5cclxuICBpZiAoIXZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHN0b3JlQ2xhc3MgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdmFsdWUgPSBzdG9yZUNsYXNzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWUgPSBuZXcgc3RvcmVDbGFzcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3JlTWFwLnNldChzdG9yZUNsYXNzLCB2YWx1ZSk7XHJcblxyXG4gICAgc2V0QWN0aW9uTWFwKHZhbHVlLCBzZXRTdGF0ZSk7XHJcblxyXG4gICAgaWYgKCF2YWx1ZS5pbml0aWFsaXplZCkge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSB2YWx1ZS5pbml0Py4oKTtcclxuICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgIHJldHVybiByZXN1bHQudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKGluaXQgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZS5zdGF0ZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgIHZhbHVlLnN0YXRlID0gaW5pdDtcclxuICAgICAgICAgICAgdmFsdWUuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHZhbHVlPy5zdGF0ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoaW5pdCAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLnN0YXRlID09PSB1bmRlZmluZWQpIHZhbHVlLnN0YXRlID0gaW5pdDtcclxuICAgICAgICB2YWx1ZS5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnN0YXRlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFN0b3JlID0gPFQ+KFxyXG4gIHN0b3JlQ2xhc3M6IChuZXcgKCkgPT4geWRqLlN0b3JlPFQ+KSB8IHlkai5TdG9yZTxUPlxyXG4pID0+IHtcclxuICByZXR1cm4gc3RvcmVNYXAuZ2V0KHN0b3JlQ2xhc3MpO1xyXG59O1xyXG5cclxuY29uc3QgYWN0aW9uTWFwOiB5ZGouQWN0aW9uTWFwID0ge307XHJcblxyXG5jb25zdCBzZXRBY3Rpb25NYXAgPSA8VD4oXHJcbiAgc3RvcmU6IHlkai5TdG9yZTxUPixcclxuICBzZXRTdGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248VCB8IHVuZGVmaW5lZCB8IG51bGw+PlxyXG4pID0+IHtcclxuICBmb3IgKGxldCBhY3Rpb24gaW4gc3RvcmUuYWN0aW9ucykge1xyXG4gICAgaWYgKCFhY3Rpb25NYXBbYWN0aW9uXSkge1xyXG4gICAgICBhY3Rpb25NYXBbYWN0aW9uXSA9IHsgc3RvcmUsIHNldFN0YXRlIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuZXcgRXJyb3IoYGNvbmZsaWN0IGFjdGlvbiBuYW1lOiAke2FjdGlvbn1gKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGlzcGF0Y2ggPSA8VD4oYWN0aW9uOiBzdHJpbmcsIGFyZ3M/OiBUKSA9PiB7XHJcbiAgaWYgKGFjdGlvbk1hcFthY3Rpb25dKSB7XHJcbiAgICBjb25zdCB7IHN0b3JlLCBzZXRTdGF0ZSB9ID0gYWN0aW9uTWFwW2FjdGlvbl07XHJcbiAgICBjb25zdCBjYWxsYmFjayA9IHN0b3JlLmFjdGlvbnNbYWN0aW9uXTtcclxuICAgIGNvbnN0IHJlcyA9IGNhbGxiYWNrLmNhbGwoc3RvcmUsIGFyZ3MpO1xyXG5cclxuICAgIGlmIChyZXMpIHtcclxuICAgICAgaWYgKHJlcyBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICByZXMudGhlbigoKSA9PiBzZXRTdGF0ZShzdG9yZS5zdGF0ZSkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHsgYWN0aW9uOiBhYywgZGF0YSB9ID0gcmVzO1xyXG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgICAgZGF0YS50aGVuKCh2YWwpID0+IHtcclxuICAgICAgICAgICAgc2V0U3RhdGUoc3RvcmUuc3RhdGUpO1xyXG4gICAgICAgICAgICBkaXNwYXRjaChhYywgdmFsKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZXRTdGF0ZShzdG9yZS5zdGF0ZSk7XHJcbiAgICAgICAgICBkaXNwYXRjaChhYywgZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRTdGF0ZShzdG9yZS5zdGF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG4iLCJleHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RvcmU8VD4gaW1wbGVtZW50cyB5ZGouU3RvcmU8VD4ge1xyXG4gIHN0YXRlOiBUIHwgbnVsbCA9IG51bGw7XHJcbiAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBhYnN0cmFjdCBhY3Rpb25zOiB7XHJcbiAgICBbYWN0aW9uOiBzdHJpbmddOiB5ZGouU3RvcmVDYWxsYmFjaztcclxuICB9O1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuICBzZXRTdGF0ZShzdGF0ZTogVCB8IG51bGwpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnN0YXRlICE9PSBzdGF0ZSkge1xyXG4gICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGFkZFN0b3JlLCBkaXNwYXRjaCwgZ2V0U3RvcmUgfSBmcm9tICcuLi9jb3JlJztcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VTdG9yZSA9IDxUPihcclxuICBzdG9yZUNsYXNzOiAobmV3ICgpID0+IHlkai5TdG9yZTxUPikgfCB5ZGouU3RvcmU8VD4sXHJcbiAgaW5pdD86IFQgfCBudWxsXHJcbikgPT4ge1xyXG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGUoaW5pdCk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHN0b3JlID0gZ2V0U3RvcmUoc3RvcmVDbGFzcyk7XHJcbiAgICBpZiAoIXN0b3JlKSB7XHJcbiAgICAgIGNvbnN0IGluaXRTdGF0ZSA9IGFkZFN0b3JlKHN0b3JlQ2xhc3MsIHNldFN0YXRlLCBpbml0KTtcclxuXHJcbiAgICAgIGlmIChpbml0U3RhdGUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgaW5pdFN0YXRlLnRoZW4oKGlTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgc2V0U3RhdGUoaVN0YXRlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRTdGF0ZShpbml0U3RhdGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIFtzdGF0ZSwgZGlzcGF0Y2hdO1xyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmVhY3RfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiZXhwb3J0IHsgdXNlU3RvcmUgfSBmcm9tICcuL3VzZVN0b3JlJztcclxuZXhwb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==