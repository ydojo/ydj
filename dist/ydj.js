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
exports.dispatch = exports.actionMap = exports.addStore = void 0;
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
exports.actionMap = {};
const setActionMap = (store, setState) => {
    for (let action in store.actions) {
        if (!exports.actionMap[action]) {
            exports.actionMap[action] = { store, setState };
        }
        else {
            new Error(`conflict action name: ${action}`);
        }
    }
};
const dispatch = (action, args) => {
    if (exports.actionMap[action]) {
        const { store, setState } = exports.actionMap[action];
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
    }
};
exports.dispatch = dispatch;


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
exports.useStore = void 0;
var useStore_1 = __webpack_require__(/*! ./useStore */ "./useStore/index.ts");
Object.defineProperty(exports, "useStore", ({ enumerable: true, get: function () { return useStore_1.useStore; } }));

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95ZGovd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3lkai8uL2NvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vdXNlU3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly95ZGovd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8veWRqLy4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7QUNSQSxNQUFNLFFBQVEsR0FBaUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUVsQyxNQUFNLFFBQVEsR0FBaUIsQ0FDcEMsVUFBa0QsRUFDbEQsUUFBaUQsRUFDakQsRUFBRTtJQUNGLElBQUksS0FBSyxHQUE4QixRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWhFLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixJQUFJLFVBQVUsWUFBWSxRQUFRLEVBQUU7WUFDbEMsS0FBSyxHQUFHLElBQUksVUFBVSxFQUFLLENBQUM7U0FDN0I7YUFBTTtZQUNMLEtBQUssR0FBRyxVQUFVLENBQUM7U0FDcEI7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUN0QixLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNmLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQzFCO1FBRUQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFaEMsWUFBWSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztLQUMvQjtBQUNILENBQUMsQ0FBQztBQXRCVyxnQkFBUSxZQXNCbkI7QUFFVyxpQkFBUyxHQUFrQixFQUFFLENBQUM7QUFFM0MsTUFBTSxZQUFZLEdBQXFCLENBQ3JDLEtBQW9CLEVBQ3BCLFFBQWlELEVBQ2pELEVBQUU7SUFDRixLQUFLLElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7UUFDaEMsSUFBSSxDQUFDLGlCQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdEIsaUJBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQztTQUN6QzthQUFNO1lBQ0wsSUFBSSxLQUFLLENBQUMseUJBQXlCLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDOUM7S0FDRjtBQUNILENBQUMsQ0FBQztBQUVLLE1BQU0sUUFBUSxHQUFpQixDQUFJLE1BQWMsRUFBRSxJQUFPLEVBQUUsRUFBRTtJQUNuRSxJQUFJLGlCQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDckIsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxpQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFdkMsSUFBSSxHQUFHLEVBQUU7WUFDUCxJQUFJLEdBQUcsWUFBWSxPQUFPLEVBQUU7Z0JBQzFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3ZDO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUN2QixJQUFJLElBQUksWUFBWSxPQUFPLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTt3QkFDaEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdEIsZ0JBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3BCLENBQUMsQ0FBQyxDQUFDO2lCQUNKO3FCQUFNO29CQUNMLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3RCLGdCQUFRLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNwQjthQUNGO1NBQ0Y7S0FDRjtBQUNILENBQUMsQ0FBQztBQXZCVyxnQkFBUSxZQXVCbkI7Ozs7Ozs7Ozs7Ozs7O0FDbEVGLDBEQUFpQztBQUNqQyxxRUFBNkM7QUFFdEMsTUFBTSxRQUFRLEdBQWlCLENBQ3BDLFVBQWtELEVBQ2xELElBQU8sRUFDUCxFQUFFO0lBQ0YsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxnQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLGVBQVEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0IsT0FBTyxDQUFDLEtBQUssRUFBRSxlQUFRLENBQUMsQ0FBQztBQUMzQixDQUFDLENBQUM7QUFQVyxnQkFBUSxZQU9uQjs7Ozs7Ozs7Ozs7QUNWRixtRDs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7OztBQ3RCQSw4RUFBc0M7QUFBN0IsNkdBQVEiLCJmaWxlIjoieWRqLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3RcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wieWRqXCJdID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInlkalwiXSA9IGZhY3Rvcnkocm9vdFtcInJlYWN0XCJdKTtcbn0pKHNlbGYsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmVhY3RfXykge1xucmV0dXJuICIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBzdG9yZU1hcDogeWRqLlN0b3JlTWFwID0gbmV3IE1hcCgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZFN0b3JlOiB5ZGouQWRkU3RvcmUgPSA8VD4oXHJcbiAgc3RvcmVDbGFzczogdHlwZW9mIHlkai5JU3RvcmVDbGFzcyB8IHlkai5JU3RvcmU8VD4sXHJcbiAgc2V0U3RhdGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFQ+PlxyXG4pID0+IHtcclxuICBsZXQgdmFsdWU6IHlkai5JU3RvcmU8VD4gfCB1bmRlZmluZWQgPSBzdG9yZU1hcC5nZXQoc3RvcmVDbGFzcyk7XHJcblxyXG4gIGlmICghdmFsdWUpIHtcclxuICAgIGlmIChzdG9yZUNsYXNzIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgdmFsdWUgPSBuZXcgc3RvcmVDbGFzczxUPigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWUgPSBzdG9yZUNsYXNzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdmFsdWUuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgdmFsdWUuaW5pdD8uKCk7XHJcbiAgICAgIHZhbHVlLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9yZU1hcC5zZXQoc3RvcmVDbGFzcywgdmFsdWUpO1xyXG5cclxuICAgIHNldEFjdGlvbk1hcCh2YWx1ZSwgc2V0U3RhdGUpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBhY3Rpb25NYXA6IHlkai5BY3Rpb25NYXAgPSB7fTtcclxuXHJcbmNvbnN0IHNldEFjdGlvbk1hcDogeWRqLlNldEFjdGlvbk1hcCA9IDxUPihcclxuICBzdG9yZTogeWRqLklTdG9yZTxUPixcclxuICBzZXRTdGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248VD4+XHJcbikgPT4ge1xyXG4gIGZvciAobGV0IGFjdGlvbiBpbiBzdG9yZS5hY3Rpb25zKSB7XHJcbiAgICBpZiAoIWFjdGlvbk1hcFthY3Rpb25dKSB7XHJcbiAgICAgIGFjdGlvbk1hcFthY3Rpb25dID0geyBzdG9yZSwgc2V0U3RhdGUgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5ldyBFcnJvcihgY29uZmxpY3QgYWN0aW9uIG5hbWU6ICR7YWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkaXNwYXRjaDogeWRqLkRpc3BhdGNoID0gPFQ+KGFjdGlvbjogc3RyaW5nLCBhcmdzOiBUKSA9PiB7XHJcbiAgaWYgKGFjdGlvbk1hcFthY3Rpb25dKSB7XHJcbiAgICBjb25zdCB7IHN0b3JlLCBzZXRTdGF0ZSB9ID0gYWN0aW9uTWFwW2FjdGlvbl07XHJcbiAgICBjb25zdCBjYWxsYmFjayA9IHN0b3JlLmFjdGlvbnNbYWN0aW9uXTtcclxuICAgIGNvbnN0IHJlcyA9IGNhbGxiYWNrLmNhbGwoc3RvcmUsIGFyZ3MpO1xyXG5cclxuICAgIGlmIChyZXMpIHtcclxuICAgICAgaWYgKHJlcyBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICByZXMudGhlbigoKSA9PiBzZXRTdGF0ZShzdG9yZS5zdGF0ZSkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IFthYywgZGF0YV0gPSByZXM7XHJcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgICBkYXRhLnRoZW4oKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICBzZXRTdGF0ZShzdG9yZS5zdGF0ZSk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKGFjLCB2YWwpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNldFN0YXRlKHN0b3JlLnN0YXRlKTtcclxuICAgICAgICAgIGRpc3BhdGNoKGFjLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn07XHJcbiIsImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBhZGRTdG9yZSwgZGlzcGF0Y2ggfSBmcm9tICcuLi9jb3JlJztcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VTdG9yZTogeWRqLlVzZVN0b3JlID0gPFQ+KFxyXG4gIHN0b3JlQ2xhc3M6IHR5cGVvZiB5ZGouSVN0b3JlQ2xhc3MgfCB5ZGouSVN0b3JlPFQ+LFxyXG4gIGluaXQ6IFRcclxuKSA9PiB7XHJcbiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZShpbml0KTtcclxuICBhZGRTdG9yZShzdG9yZUNsYXNzLCBzZXRTdGF0ZSk7XHJcbiAgcmV0dXJuIFtzdGF0ZSwgZGlzcGF0Y2hdO1xyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmVhY3RfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiZXhwb3J0IHsgdXNlU3RvcmUgfSBmcm9tICcuL3VzZVN0b3JlJztcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==