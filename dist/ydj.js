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
                const [ac, data] = res;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95ZGovd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3lkai8uL2NvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vdXNlU3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly95ZGovd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8veWRqLy4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7QUNQQSxNQUFNLFFBQVEsR0FHVixJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRVAsTUFBTSxRQUFRLEdBQUcsQ0FDdEIsVUFBaUQsRUFDakQsUUFBaUQsRUFDakQsRUFBRTtJQUNGLElBQUksS0FBSyxHQUE2QixRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9ELElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixJQUFJLFVBQVUsWUFBWSxRQUFRLEVBQUU7WUFDbEMsS0FBSyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7U0FDMUI7YUFBTTtZQUNMLEtBQUssR0FBRyxVQUFVLENBQUM7U0FDcEI7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUN0QixLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNmLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQzFCO1FBRUQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFaEMsWUFBWSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztLQUMvQjtBQUNILENBQUMsQ0FBQztBQXRCVyxnQkFBUSxZQXNCbkI7QUFF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Ozs7Ozs7Ozs7Ozs7QUN0QkEsOEVBQXNDO0FBQTdCLDZHQUFRO0FBQ2pCLHFFQUFnQztBQUF2QixvR0FBSyIsImZpbGUiOiJ5ZGouanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJyZWFjdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ5ZGpcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wieWRqXCJdID0gZmFjdG9yeShyb290W1wicmVhY3RcIl0pO1xufSkoc2VsZiwgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yZWFjdF9fKSB7XG5yZXR1cm4gIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHlkaiwgeyBBY3Rpb25NYXAgfSBmcm9tICdpbmRleCc7XHJcblxyXG5jb25zdCBzdG9yZU1hcDogTWFwPFxyXG4gIHlkai5TdG9yZTxhbnk+IHwgKG5ldyAoKSA9PiB5ZGouU3RvcmU8YW55PiksXHJcbiAgeWRqLlN0b3JlPGFueT5cclxuPiA9IG5ldyBNYXAoKTtcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRTdG9yZSA9IDxUPihcclxuICBzdG9yZUNsYXNzOiBuZXcgKCkgPT4geWRqLlN0b3JlPFQ+IHwgeWRqLlN0b3JlPFQ+LFxyXG4gIHNldFN0YXRlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxUPj5cclxuKSA9PiB7XHJcbiAgbGV0IHZhbHVlOiB5ZGouU3RvcmU8VD4gfCB1bmRlZmluZWQgPSBzdG9yZU1hcC5nZXQoc3RvcmVDbGFzcyk7XHJcblxyXG4gIGlmICghdmFsdWUpIHtcclxuICAgIGlmIChzdG9yZUNsYXNzIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgdmFsdWUgPSBuZXcgc3RvcmVDbGFzcygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWUgPSBzdG9yZUNsYXNzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdmFsdWUuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgdmFsdWUuaW5pdD8uKCk7XHJcbiAgICAgIHZhbHVlLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9yZU1hcC5zZXQoc3RvcmVDbGFzcywgdmFsdWUpO1xyXG5cclxuICAgIHNldEFjdGlvbk1hcCh2YWx1ZSwgc2V0U3RhdGUpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGFjdGlvbk1hcDogQWN0aW9uTWFwID0ge307XHJcblxyXG5jb25zdCBzZXRBY3Rpb25NYXAgPSA8VD4oXHJcbiAgc3RvcmU6IHlkai5TdG9yZTxUPixcclxuICBzZXRTdGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248VD4+XHJcbikgPT4ge1xyXG4gIGZvciAobGV0IGFjdGlvbiBpbiBzdG9yZS5hY3Rpb25zKSB7XHJcbiAgICBpZiAoIWFjdGlvbk1hcFthY3Rpb25dKSB7XHJcbiAgICAgIGFjdGlvbk1hcFthY3Rpb25dID0geyBzdG9yZSwgc2V0U3RhdGUgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5ldyBFcnJvcihgY29uZmxpY3QgYWN0aW9uIG5hbWU6ICR7YWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkaXNwYXRjaCA9IDxUPihhY3Rpb246IHN0cmluZywgYXJnczogVCkgPT4ge1xyXG4gIGlmIChhY3Rpb25NYXBbYWN0aW9uXSkge1xyXG4gICAgY29uc3QgeyBzdG9yZSwgc2V0U3RhdGUgfSA9IGFjdGlvbk1hcFthY3Rpb25dO1xyXG4gICAgY29uc3QgY2FsbGJhY2sgPSBzdG9yZS5hY3Rpb25zW2FjdGlvbl07XHJcbiAgICBjb25zdCByZXMgPSBjYWxsYmFjay5jYWxsKHN0b3JlLCBhcmdzKTtcclxuXHJcbiAgICBpZiAocmVzKSB7XHJcbiAgICAgIGlmIChyZXMgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgcmVzLnRoZW4oKCkgPT4gc2V0U3RhdGUoc3RvcmUuc3RhdGUpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBbYWMsIGRhdGFdID0gcmVzO1xyXG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgICAgZGF0YS50aGVuKCh2YWwpID0+IHtcclxuICAgICAgICAgICAgc2V0U3RhdGUoc3RvcmUuc3RhdGUpO1xyXG4gICAgICAgICAgICBkaXNwYXRjaChhYywgdmFsKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZXRTdGF0ZShzdG9yZS5zdGF0ZSk7XHJcbiAgICAgICAgICBkaXNwYXRjaChhYywgZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRTdGF0ZShzdG9yZS5zdGF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG4iLCJleHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RvcmU8VD4gaW1wbGVtZW50cyB5ZGouU3RvcmU8VD4ge1xyXG4gIHN0YXRlOiBUIHwgbnVsbCA9IG51bGw7XHJcbiAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBhYnN0cmFjdCBhY3Rpb25zOiB7XHJcbiAgICBbYWN0aW9uOiBzdHJpbmddOiB5ZGouU3RvcmVDYWxsYmFjaztcclxuICB9O1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuICBzZXRTdGF0ZShzdGF0ZTogVCB8IG51bGwpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnN0YXRlICE9PSBzdGF0ZSkge1xyXG4gICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB5ZGogZnJvbSAnaW5kZXgnO1xyXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgYWRkU3RvcmUsIGRpc3BhdGNoIH0gZnJvbSAnLi4vY29yZSc7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlU3RvcmUgPSA8VD4oXHJcbiAgc3RvcmVDbGFzczogbmV3ICgpID0+IHlkai5TdG9yZTxUPiB8IHlkai5TdG9yZTxUPixcclxuICBpbml0OiBUXHJcbikgPT4ge1xyXG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGUoaW5pdCk7XHJcbiAgYWRkU3RvcmUoc3RvcmVDbGFzcywgc2V0U3RhdGUpO1xyXG4gIHJldHVybiBbc3RhdGUsIGRpc3BhdGNoXTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JlYWN0X187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImV4cG9ydCB7IHVzZVN0b3JlIH0gZnJvbSAnLi91c2VTdG9yZSc7XHJcbmV4cG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=