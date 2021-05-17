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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95ZGovd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3lkai8uL2NvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vdXNlU3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly95ZGovd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8veWRqLy4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7QUNQQSxNQUFNLFFBQVEsR0FHVixJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRVAsTUFBTSxRQUFRLEdBQUcsQ0FDdEIsVUFBaUQsRUFDakQsUUFBaUQsRUFDakQsRUFBRTtJQUNGLElBQUksS0FBSyxHQUE2QixRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9ELElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixJQUFJLFVBQVUsWUFBWSxRQUFRLEVBQUU7WUFDbEMsS0FBSyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7U0FDMUI7YUFBTTtZQUNMLEtBQUssR0FBRyxVQUFVLENBQUM7U0FDcEI7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUN0QixLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNmLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQzFCO1FBRUQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFaEMsWUFBWSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztLQUMvQjtBQUNILENBQUMsQ0FBQztBQXRCVyxnQkFBUSxZQXNCbkI7QUFF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VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7O0FDdEJBLDhFQUFzQztBQUE3Qiw2R0FBUTtBQUNqQixxRUFBZ0M7QUFBdkIsb0dBQUsiLCJmaWxlIjoieWRqLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3RcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wieWRqXCJdID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInlkalwiXSA9IGZhY3Rvcnkocm9vdFtcInJlYWN0XCJdKTtcbn0pKHNlbGYsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmVhY3RfXykge1xucmV0dXJuICIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB5ZGosIHsgQWN0aW9uTWFwIH0gZnJvbSAnaW5kZXgnO1xyXG5cclxuY29uc3Qgc3RvcmVNYXA6IE1hcDxcclxuICB5ZGouU3RvcmU8YW55PiB8IChuZXcgKCkgPT4geWRqLlN0b3JlPGFueT4pLFxyXG4gIHlkai5TdG9yZTxhbnk+XHJcbj4gPSBuZXcgTWFwKCk7XHJcblxyXG5leHBvcnQgY29uc3QgYWRkU3RvcmUgPSA8VD4oXHJcbiAgc3RvcmVDbGFzczogbmV3ICgpID0+IHlkai5TdG9yZTxUPiB8IHlkai5TdG9yZTxUPixcclxuICBzZXRTdGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248VD4+XHJcbikgPT4ge1xyXG4gIGxldCB2YWx1ZTogeWRqLlN0b3JlPFQ+IHwgdW5kZWZpbmVkID0gc3RvcmVNYXAuZ2V0KHN0b3JlQ2xhc3MpO1xyXG5cclxuICBpZiAoIXZhbHVlKSB7XHJcbiAgICBpZiAoc3RvcmVDbGFzcyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIHZhbHVlID0gbmV3IHN0b3JlQ2xhc3MoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbHVlID0gc3RvcmVDbGFzcztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXZhbHVlLmluaXRpYWxpemVkKSB7XHJcbiAgICAgIHZhbHVlLmluaXQ/LigpO1xyXG4gICAgICB2YWx1ZS5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcmVNYXAuc2V0KHN0b3JlQ2xhc3MsIHZhbHVlKTtcclxuXHJcbiAgICBzZXRBY3Rpb25NYXAodmFsdWUsIHNldFN0YXRlKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBhY3Rpb25NYXA6IEFjdGlvbk1hcCA9IHt9O1xyXG5cclxuY29uc3Qgc2V0QWN0aW9uTWFwID0gPFQ+KFxyXG4gIHN0b3JlOiB5ZGouU3RvcmU8VD4sXHJcbiAgc2V0U3RhdGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFQ+PlxyXG4pID0+IHtcclxuICBmb3IgKGxldCBhY3Rpb24gaW4gc3RvcmUuYWN0aW9ucykge1xyXG4gICAgaWYgKCFhY3Rpb25NYXBbYWN0aW9uXSkge1xyXG4gICAgICBhY3Rpb25NYXBbYWN0aW9uXSA9IHsgc3RvcmUsIHNldFN0YXRlIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuZXcgRXJyb3IoYGNvbmZsaWN0IGFjdGlvbiBuYW1lOiAke2FjdGlvbn1gKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGlzcGF0Y2ggPSA8VD4oYWN0aW9uOiBzdHJpbmcsIGFyZ3M6IFQpID0+IHtcclxuICBpZiAoYWN0aW9uTWFwW2FjdGlvbl0pIHtcclxuICAgIGNvbnN0IHsgc3RvcmUsIHNldFN0YXRlIH0gPSBhY3Rpb25NYXBbYWN0aW9uXTtcclxuICAgIGNvbnN0IGNhbGxiYWNrID0gc3RvcmUuYWN0aW9uc1thY3Rpb25dO1xyXG4gICAgY29uc3QgcmVzID0gY2FsbGJhY2suY2FsbChzdG9yZSwgYXJncyk7XHJcblxyXG4gICAgaWYgKHJlcykge1xyXG4gICAgICBpZiAocmVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgIHJlcy50aGVuKCgpID0+IHNldFN0YXRlKHN0b3JlLnN0YXRlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgeyBhY3Rpb246IGFjLCBkYXRhIH0gPSByZXM7XHJcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgICBkYXRhLnRoZW4oKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICBzZXRTdGF0ZShzdG9yZS5zdGF0ZSk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKGFjLCB2YWwpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNldFN0YXRlKHN0b3JlLnN0YXRlKTtcclxuICAgICAgICAgIGRpc3BhdGNoKGFjLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldFN0YXRlKHN0b3JlLnN0YXRlKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcbiIsImV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdG9yZTxUPiBpbXBsZW1lbnRzIHlkai5TdG9yZTxUPiB7XHJcbiAgc3RhdGU6IFQgfCBudWxsID0gbnVsbDtcclxuICBpbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGFic3RyYWN0IGFjdGlvbnM6IHtcclxuICAgIFthY3Rpb246IHN0cmluZ106IHlkai5TdG9yZUNhbGxiYWNrO1xyXG4gIH07XHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG4gIHNldFN0YXRlKHN0YXRlOiBUIHwgbnVsbCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUgIT09IHN0YXRlKSB7XHJcbiAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHlkaiBmcm9tICdpbmRleCc7XHJcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBhZGRTdG9yZSwgZGlzcGF0Y2ggfSBmcm9tICcuLi9jb3JlJztcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VTdG9yZSA9IDxUPihcclxuICBzdG9yZUNsYXNzOiBuZXcgKCkgPT4geWRqLlN0b3JlPFQ+IHwgeWRqLlN0b3JlPFQ+LFxyXG4gIGluaXQ6IFRcclxuKSA9PiB7XHJcbiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZShpbml0KTtcclxuICBhZGRTdG9yZShzdG9yZUNsYXNzLCBzZXRTdGF0ZSk7XHJcbiAgcmV0dXJuIFtzdGF0ZSwgZGlzcGF0Y2hdO1xyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmVhY3RfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiZXhwb3J0IHsgdXNlU3RvcmUgfSBmcm9tICcuL3VzZVN0b3JlJztcclxuZXhwb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==