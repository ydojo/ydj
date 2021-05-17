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
exports.dispatch = exports.addStore = void 0;
const storeMap = new Map();
const addStore = (storeClass, setState) => {
    let value = storeMap.get(storeClass);
    if (!value) {
        if (storeClass instanceof Function) {
            value = new storeClass();
        }
        else {
            value = storeClass;
        }
        if (!value.initialized) {
            value.init?.();
            value.initialized = true;
        }
        storeMap.set(storeClass, value);
        setActionMap(value, setState);
    }
};
exports.addStore = addStore;
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
    core_1.addStore(storeClass, setState);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95ZGovd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3lkai8uL2NvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vdXNlU3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly95ZGovd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8veWRqLy4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7QUNQQSxNQUFNLFFBQVEsR0FHVixJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRVAsTUFBTSxRQUFRLEdBQUcsQ0FDdEIsVUFBaUQsRUFDakQsUUFBNkQsRUFDN0QsRUFBRTtJQUNGLElBQUksS0FBSyxHQUE2QixRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9ELElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixJQUFJLFVBQVUsWUFBWSxRQUFRLEVBQUU7WUFDbEMsS0FBSyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7U0FDMUI7YUFBTTtZQUNMLEtBQUssR0FBRyxVQUFVLENBQUM7U0FDcEI7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUN0QixLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNmLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQzFCO1FBRUQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFaEMsWUFBWSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztLQUMvQjtBQUNILENBQUMsQ0FBQztBQXRCVyxnQkFBUSxZQXNCbkI7QUFF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VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7O0FDdEJBLDhFQUFzQztBQUE3Qiw2R0FBUTtBQUNqQixxRUFBZ0M7QUFBdkIsb0dBQUsiLCJmaWxlIjoieWRqLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3RcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wieWRqXCJdID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInlkalwiXSA9IGZhY3Rvcnkocm9vdFtcInJlYWN0XCJdKTtcbn0pKHNlbGYsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmVhY3RfXykge1xucmV0dXJuICIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB5ZGosIHsgQWN0aW9uTWFwIH0gZnJvbSAnaW5kZXgnO1xyXG5cclxuY29uc3Qgc3RvcmVNYXA6IE1hcDxcclxuICB5ZGouU3RvcmU8YW55PiB8IChuZXcgKCkgPT4geWRqLlN0b3JlPGFueT4pLFxyXG4gIHlkai5TdG9yZTxhbnk+XHJcbj4gPSBuZXcgTWFwKCk7XHJcblxyXG5leHBvcnQgY29uc3QgYWRkU3RvcmUgPSA8VD4oXHJcbiAgc3RvcmVDbGFzczogbmV3ICgpID0+IHlkai5TdG9yZTxUPiB8IHlkai5TdG9yZTxUPixcclxuICBzZXRTdGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248VCB8IHVuZGVmaW5lZD4+XHJcbikgPT4ge1xyXG4gIGxldCB2YWx1ZTogeWRqLlN0b3JlPFQ+IHwgdW5kZWZpbmVkID0gc3RvcmVNYXAuZ2V0KHN0b3JlQ2xhc3MpO1xyXG5cclxuICBpZiAoIXZhbHVlKSB7XHJcbiAgICBpZiAoc3RvcmVDbGFzcyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIHZhbHVlID0gbmV3IHN0b3JlQ2xhc3MoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbHVlID0gc3RvcmVDbGFzcztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXZhbHVlLmluaXRpYWxpemVkKSB7XHJcbiAgICAgIHZhbHVlLmluaXQ/LigpO1xyXG4gICAgICB2YWx1ZS5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcmVNYXAuc2V0KHN0b3JlQ2xhc3MsIHZhbHVlKTtcclxuXHJcbiAgICBzZXRBY3Rpb25NYXAodmFsdWUsIHNldFN0YXRlKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBhY3Rpb25NYXA6IEFjdGlvbk1hcCA9IHt9O1xyXG5cclxuY29uc3Qgc2V0QWN0aW9uTWFwID0gPFQ+KFxyXG4gIHN0b3JlOiB5ZGouU3RvcmU8VD4sXHJcbiAgc2V0U3RhdGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFQgfCB1bmRlZmluZWQ+PlxyXG4pID0+IHtcclxuICBmb3IgKGxldCBhY3Rpb24gaW4gc3RvcmUuYWN0aW9ucykge1xyXG4gICAgaWYgKCFhY3Rpb25NYXBbYWN0aW9uXSkge1xyXG4gICAgICBhY3Rpb25NYXBbYWN0aW9uXSA9IHsgc3RvcmUsIHNldFN0YXRlIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuZXcgRXJyb3IoYGNvbmZsaWN0IGFjdGlvbiBuYW1lOiAke2FjdGlvbn1gKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGlzcGF0Y2ggPSA8VD4oYWN0aW9uOiBzdHJpbmcsIGFyZ3M/OiBUKSA9PiB7XHJcbiAgaWYgKGFjdGlvbk1hcFthY3Rpb25dKSB7XHJcbiAgICBjb25zdCB7IHN0b3JlLCBzZXRTdGF0ZSB9ID0gYWN0aW9uTWFwW2FjdGlvbl07XHJcbiAgICBjb25zdCBjYWxsYmFjayA9IHN0b3JlLmFjdGlvbnNbYWN0aW9uXTtcclxuICAgIGNvbnN0IHJlcyA9IGNhbGxiYWNrLmNhbGwoc3RvcmUsIGFyZ3MpO1xyXG5cclxuICAgIGlmIChyZXMpIHtcclxuICAgICAgaWYgKHJlcyBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICByZXMudGhlbigoKSA9PiBzZXRTdGF0ZShzdG9yZS5zdGF0ZSkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHsgYWN0aW9uOiBhYywgZGF0YSB9ID0gcmVzO1xyXG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgICAgZGF0YS50aGVuKCh2YWwpID0+IHtcclxuICAgICAgICAgICAgc2V0U3RhdGUoc3RvcmUuc3RhdGUpO1xyXG4gICAgICAgICAgICBkaXNwYXRjaChhYywgdmFsKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZXRTdGF0ZShzdG9yZS5zdGF0ZSk7XHJcbiAgICAgICAgICBkaXNwYXRjaChhYywgZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRTdGF0ZShzdG9yZS5zdGF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG4iLCJleHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RvcmU8VD4gaW1wbGVtZW50cyB5ZGouU3RvcmU8VD4ge1xyXG4gIHN0YXRlOiBUIHwgbnVsbCA9IG51bGw7XHJcbiAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBhYnN0cmFjdCBhY3Rpb25zOiB7XHJcbiAgICBbYWN0aW9uOiBzdHJpbmddOiB5ZGouU3RvcmVDYWxsYmFjaztcclxuICB9O1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuICBzZXRTdGF0ZShzdGF0ZTogVCB8IG51bGwpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnN0YXRlICE9PSBzdGF0ZSkge1xyXG4gICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB5ZGogZnJvbSAnaW5kZXgnO1xyXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgYWRkU3RvcmUsIGRpc3BhdGNoIH0gZnJvbSAnLi4vY29yZSc7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlU3RvcmUgPSA8VD4oXHJcbiAgc3RvcmVDbGFzczogbmV3ICgpID0+IHlkai5TdG9yZTxUPiB8IHlkai5TdG9yZTxUPixcclxuICBpbml0PzogVFxyXG4pID0+IHtcclxuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKGluaXQpO1xyXG4gIGFkZFN0b3JlKHN0b3JlQ2xhc3MsIHNldFN0YXRlKTtcclxuICByZXR1cm4gW3N0YXRlLCBkaXNwYXRjaF07XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yZWFjdF9fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJleHBvcnQgeyB1c2VTdG9yZSB9IGZyb20gJy4vdXNlU3RvcmUnO1xyXG5leHBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9