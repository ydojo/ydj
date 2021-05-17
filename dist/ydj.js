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
const addStore = (storeClass, setState, init) => {
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
            if (init !== undefined)
                value.state = init;
            value.initialized = true;
        }
        storeMap.set(storeClass, value);
        setActionMap(value, setState);
    }
    return value.state;
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
    const initState = core_1.addStore(storeClass, setState);
    return [initState, core_1.dispatch];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95ZGovd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3lkai8uL2NvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vdXNlU3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly95ZGovd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8veWRqLy4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7QUNQQSxNQUFNLFFBQVEsR0FHVixJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRVAsTUFBTSxRQUFRLEdBQUcsQ0FDdEIsVUFBaUQsRUFDakQsUUFBNkQsRUFDN0QsSUFBUSxFQUNSLEVBQUU7SUFDRixJQUFJLEtBQUssR0FBNkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsSUFBSSxVQUFVLFlBQVksUUFBUSxFQUFFO1lBQ2xDLEtBQUssR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1NBQzFCO2FBQU07WUFDTCxLQUFLLEdBQUcsVUFBVSxDQUFDO1NBQ3BCO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDdEIsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7WUFDZixJQUFJLElBQUksS0FBSyxTQUFTO2dCQUFFLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQzNDLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQzFCO1FBRUQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFaEMsWUFBWSxD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Qjs7Ozs7Ozs7Ozs7QUNYRixtRDs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7OztBQ3RCQSw4RUFBc0M7QUFBN0IsNkdBQVE7QUFDakIscUVBQWdDO0FBQXZCLG9HQUFLIiwiZmlsZSI6Inlkai5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInJlYWN0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInlkalwiXSA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ5ZGpcIl0gPSBmYWN0b3J5KHJvb3RbXCJyZWFjdFwiXSk7XG59KShzZWxmLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JlYWN0X18pIHtcbnJldHVybiAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeWRqLCB7IEFjdGlvbk1hcCB9IGZyb20gJ2luZGV4JztcclxuXHJcbmNvbnN0IHN0b3JlTWFwOiBNYXA8XHJcbiAgeWRqLlN0b3JlPGFueT4gfCAobmV3ICgpID0+IHlkai5TdG9yZTxhbnk+KSxcclxuICB5ZGouU3RvcmU8YW55PlxyXG4+ID0gbmV3IE1hcCgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZFN0b3JlID0gPFQ+KFxyXG4gIHN0b3JlQ2xhc3M6IG5ldyAoKSA9PiB5ZGouU3RvcmU8VD4gfCB5ZGouU3RvcmU8VD4sXHJcbiAgc2V0U3RhdGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFQgfCB1bmRlZmluZWQ+PixcclxuICBpbml0PzogVFxyXG4pID0+IHtcclxuICBsZXQgdmFsdWU6IHlkai5TdG9yZTxUPiB8IHVuZGVmaW5lZCA9IHN0b3JlTWFwLmdldChzdG9yZUNsYXNzKTtcclxuXHJcbiAgaWYgKCF2YWx1ZSkge1xyXG4gICAgaWYgKHN0b3JlQ2xhc3MgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICB2YWx1ZSA9IG5ldyBzdG9yZUNsYXNzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWx1ZSA9IHN0b3JlQ2xhc3M7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF2YWx1ZS5pbml0aWFsaXplZCkge1xyXG4gICAgICB2YWx1ZS5pbml0Py4oKTtcclxuICAgICAgaWYgKGluaXQgIT09IHVuZGVmaW5lZCkgdmFsdWUuc3RhdGUgPSBpbml0O1xyXG4gICAgICB2YWx1ZS5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcmVNYXAuc2V0KHN0b3JlQ2xhc3MsIHZhbHVlKTtcclxuXHJcbiAgICBzZXRBY3Rpb25NYXAodmFsdWUsIHNldFN0YXRlKTtcclxuICB9XHJcbiAgcmV0dXJuIHZhbHVlLnN0YXRlO1xyXG59O1xyXG5cclxuY29uc3QgYWN0aW9uTWFwOiBBY3Rpb25NYXAgPSB7fTtcclxuXHJcbmNvbnN0IHNldEFjdGlvbk1hcCA9IDxUPihcclxuICBzdG9yZTogeWRqLlN0b3JlPFQ+LFxyXG4gIHNldFN0YXRlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxUIHwgdW5kZWZpbmVkPj5cclxuKSA9PiB7XHJcbiAgZm9yIChsZXQgYWN0aW9uIGluIHN0b3JlLmFjdGlvbnMpIHtcclxuICAgIGlmICghYWN0aW9uTWFwW2FjdGlvbl0pIHtcclxuICAgICAgYWN0aW9uTWFwW2FjdGlvbl0gPSB7IHN0b3JlLCBzZXRTdGF0ZSB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbmV3IEVycm9yKGBjb25mbGljdCBhY3Rpb24gbmFtZTogJHthY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRpc3BhdGNoID0gPFQ+KGFjdGlvbjogc3RyaW5nLCBhcmdzPzogVCkgPT4ge1xyXG4gIGlmIChhY3Rpb25NYXBbYWN0aW9uXSkge1xyXG4gICAgY29uc3QgeyBzdG9yZSwgc2V0U3RhdGUgfSA9IGFjdGlvbk1hcFthY3Rpb25dO1xyXG4gICAgY29uc3QgY2FsbGJhY2sgPSBzdG9yZS5hY3Rpb25zW2FjdGlvbl07XHJcbiAgICBjb25zdCByZXMgPSBjYWxsYmFjay5jYWxsKHN0b3JlLCBhcmdzKTtcclxuXHJcbiAgICBpZiAocmVzKSB7XHJcbiAgICAgIGlmIChyZXMgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgcmVzLnRoZW4oKCkgPT4gc2V0U3RhdGUoc3RvcmUuc3RhdGUpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCB7IGFjdGlvbjogYWMsIGRhdGEgfSA9IHJlcztcclxuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICAgIGRhdGEudGhlbigodmFsKSA9PiB7XHJcbiAgICAgICAgICAgIHNldFN0YXRlKHN0b3JlLnN0YXRlKTtcclxuICAgICAgICAgICAgZGlzcGF0Y2goYWMsIHZhbCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc2V0U3RhdGUoc3RvcmUuc3RhdGUpO1xyXG4gICAgICAgICAgZGlzcGF0Y2goYWMsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0U3RhdGUoc3RvcmUuc3RhdGUpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuIiwiZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0b3JlPFQ+IGltcGxlbWVudHMgeWRqLlN0b3JlPFQ+IHtcclxuICBzdGF0ZTogVCB8IG51bGwgPSBudWxsO1xyXG4gIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgYWJzdHJhY3QgYWN0aW9uczoge1xyXG4gICAgW2FjdGlvbjogc3RyaW5nXTogeWRqLlN0b3JlQ2FsbGJhY2s7XHJcbiAgfTtcclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbiAgc2V0U3RhdGUoc3RhdGU6IFQgfCBudWxsKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZSAhPT0gc3RhdGUpIHtcclxuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeWRqIGZyb20gJ2luZGV4JztcclxuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGFkZFN0b3JlLCBkaXNwYXRjaCB9IGZyb20gJy4uL2NvcmUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZVN0b3JlID0gPFQ+KFxyXG4gIHN0b3JlQ2xhc3M6IG5ldyAoKSA9PiB5ZGouU3RvcmU8VD4gfCB5ZGouU3RvcmU8VD4sXHJcbiAgaW5pdD86IFRcclxuKSA9PiB7XHJcbiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZShpbml0KTtcclxuICBjb25zdCBpbml0U3RhdGUgPSBhZGRTdG9yZShzdG9yZUNsYXNzLCBzZXRTdGF0ZSk7XHJcbiAgcmV0dXJuIFtpbml0U3RhdGUsIGRpc3BhdGNoXTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JlYWN0X187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImV4cG9ydCB7IHVzZVN0b3JlIH0gZnJvbSAnLi91c2VTdG9yZSc7XHJcbmV4cG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=