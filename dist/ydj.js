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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95ZGovd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3lkai8uL2NvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqLy4vdXNlU3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8veWRqL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly95ZGovd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8veWRqLy4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7QUNSQSxNQUFNLFFBQVEsR0FHVixJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRVAsTUFBTSxRQUFRLEdBQUcsQ0FDdEIsVUFBbUQsRUFDbkQsUUFBb0UsRUFDcEUsSUFBZSxFQUNmLEVBQUU7SUFDRixJQUFJLEtBQUssR0FBNkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsSUFBSSxPQUFPLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDcEMsS0FBSyxHQUFHLFVBQVUsQ0FBQztTQUNwQjthQUFNO1lBQ0wsS0FBSyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7U0FDMUI7UUFFRCxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVoQyxZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQ3RCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQzlCLElBQUksTUFBTSxFQUFFO2dCQUNWLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ3RCLElBQUksS0FBSyxFQUFFO3dCQUNULElBQUksSUFBSSxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVM7NEJBQ2pELEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO3dCQUNyQixLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztxQkFDMUI7b0JBQ0QsT0FBTyxLQUFLLEVBQUUsS0FBSyxDQUFDO2dCQUN0QixDQUFDLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLElBQUksSUFBSSxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVM7b0JBQUUsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ3hFLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN6QixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDcEI7U0FDRjtLQUNGO0FBQ0gsQ0FBQyxDQUFDO0FBcENXLGdCQUFRLFlBb0NuQjtBQUVLLE1BQU0sUUFBUSxHQUFHLENBQ3RCLFVBQW1ELEVBQ25ELEVBQUU7SUFDRixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDO0FBSlcsZ0JBQVEsWUFJbkI7QUFFRixNQUFNLFNBQVMsR0FBa0IsRUFBRSxDQUFDO0FBRXBDLE1BQU0sWUFBWSxHQUFHLENBQ25CLEtBQW1CLEVBQ25CLFFBQW9FLEVBQ3BFLEVBQUU7SUFDRixLQUFLLElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7UUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN0QixTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUc7Z0JBQ2xCLEtBQUs7Z0JBQ0wsU0FBUyxFQUFFLEVBQUU7YUFDZCxDQUFDO1NBQ0g7UUFDRCxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdkQsSUFBSSxLQUFLLEtBQUssTUFBTSxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztTQUMzQztRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUI7S0FDRjtBQUNILENBQUMsQ0FBQztBQUVLLE1BQU0sV0FBVyxHQUFHLENBQ3pCLEtBQW1CLEVBQ25CLFFBQW9FLEVBQ3BFLEVBQUU7SUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUM1QyxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkQsSUFBSSxLQUFLLEtBQUssTUFBTSxFQUFFO1lBQ3BCLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQztZQUN2RSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztTQUM1QztJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBWFcsbUJBQVcsZUFXdEI7QUFFRixNQUFNLFdBQVcsR0FBRyxDQUNsQixTQUF1RSxFQUN2RSxLQUFVLEVBQ1YsRUFBRTtJQUNGLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUM3QixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFSyxNQUFNLFFBQVEsR0FBRyxDQUFJLE1BQWMsRUFBRSxJQUFRLEVBQUUsRUFBRTtJQUN0RCxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNyQixNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXZDLElBQUksR0FBRyxFQUFFO1lBQ1AsSUFBSSxHQUFHLFlBQVksT0FBTyxFQUFFO2dCQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDckQ7aUJBQU07Z0JBQ0wsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO2dCQUNqQyxJQUFJLElBQUksWUFBWSxPQUFPLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTt3QkFDaEIsV0FBVyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3BDLGdCQUFRLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNwQixDQUFDLENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxXQUFXLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEMsZ0JBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ3BCO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsV0FBVyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckM7S0FDRjtBQUNILENBQUMsQ0FBQztBQXpCVyxnQkFBUSxZQXlCbkI7Ozs7Ozs7Ozs7Ozs7O0FDM0hGLE1BQXNCLEtBQUs7SUFNekI7UUFMQSxVQUFLLEdBQWEsSUFBSSxDQUFDO1FBQ3ZCLGdCQUFXLEdBQVksS0FBSyxDQUFDO0lBSWQsQ0FBQztJQUNoQixRQUFRLENBQUMsS0FBZTtRQUN0QixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztDQUNGO0FBWkQsc0JBWUM7Ozs7Ozs7Ozs7Ozs7O0FDWkQsMERBQTRDO0FBQzVDLHFFQUEwRDtBQUVuRCxNQUFNLFFBQVEsR0FBRyxDQUN0QixVQUFtRCxFQUNuRCxJQUFlLEVBQ2YsRUFBRTtJQUNGLE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxpQkFBUyxDQUFDLEdBQUcsRUFBRTtRQUNiLE1BQU0sS0FBSyxHQUFHLGVBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsTUFBTSxTQUFTLEdBQUcsZUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFdkQsSUFBSSxTQUFTLFlBQVksT0FBTyxFQUFFO2dCQUNoQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ3hCLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkIsQ0FBQyxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDckI7U0FDRjtRQUNELE9BQU8sR0FBRyxFQUFFO1lBQ1YsTUFBTSxNQUFNLEdBQUcsZUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BDLElBQUksTUFBTTtnQkFBRSxrQkFBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBeEJXLGdCQUFRLFlBd0JuQjs7Ozs7Ozs7Ozs7QUMzQkYsbUQ7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0QkEsOEVBQXNDO0FBQTdCLDZHQUFRO0FBQ2pCLHFFQUFnQztBQUF2QixvR0FBSztBQUNkLGtFQUFrQztBQUF6Qix5R0FBUSIsImZpbGUiOiJ5ZGouanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJyZWFjdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ5ZGpcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wieWRqXCJdID0gZmFjdG9yeShyb290W1wicmVhY3RcIl0pO1xufSkoc2VsZiwgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yZWFjdF9fKSB7XG5yZXR1cm4gIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNvbnN0IHN0b3JlTWFwOiBNYXA8XHJcbiAgeWRqLlN0b3JlPGFueT4gfCAobmV3ICgpID0+IHlkai5TdG9yZTxhbnk+KSxcclxuICB5ZGouU3RvcmU8YW55PlxyXG4+ID0gbmV3IE1hcCgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZFN0b3JlID0gPFQ+KFxyXG4gIHN0b3JlQ2xhc3M6IChuZXcgKCkgPT4geWRqLlN0b3JlPFQ+KSB8IHlkai5TdG9yZTxUPixcclxuICBzZXRTdGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248VCB8IHVuZGVmaW5lZCB8IG51bGw+PixcclxuICBpbml0PzogVCB8IG51bGxcclxuKSA9PiB7XHJcbiAgbGV0IHZhbHVlOiB5ZGouU3RvcmU8VD4gfCB1bmRlZmluZWQgPSBzdG9yZU1hcC5nZXQoc3RvcmVDbGFzcyk7XHJcblxyXG4gIGlmICghdmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2Ygc3RvcmVDbGFzcyAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB2YWx1ZSA9IHN0b3JlQ2xhc3M7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWx1ZSA9IG5ldyBzdG9yZUNsYXNzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcmVNYXAuc2V0KHN0b3JlQ2xhc3MsIHZhbHVlKTtcclxuXHJcbiAgICBzZXRBY3Rpb25NYXAodmFsdWUsIHNldFN0YXRlKTtcclxuXHJcbiAgICBpZiAoIXZhbHVlLmluaXRpYWxpemVkKSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbHVlLmluaXQ/LigpO1xyXG4gICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAoaW5pdCAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLnN0YXRlID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgdmFsdWUuc3RhdGUgPSBpbml0O1xyXG4gICAgICAgICAgICB2YWx1ZS5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdmFsdWU/LnN0YXRlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChpbml0ICE9PSB1bmRlZmluZWQgJiYgdmFsdWUuc3RhdGUgPT09IHVuZGVmaW5lZCkgdmFsdWUuc3RhdGUgPSBpbml0O1xyXG4gICAgICAgIHZhbHVlLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdmFsdWUuc3RhdGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U3RvcmUgPSA8VD4oXHJcbiAgc3RvcmVDbGFzczogKG5ldyAoKSA9PiB5ZGouU3RvcmU8VD4pIHwgeWRqLlN0b3JlPFQ+XHJcbikgPT4ge1xyXG4gIHJldHVybiBzdG9yZU1hcC5nZXQoc3RvcmVDbGFzcyk7XHJcbn07XHJcblxyXG5jb25zdCBhY3Rpb25NYXA6IHlkai5BY3Rpb25NYXAgPSB7fTtcclxuXHJcbmNvbnN0IHNldEFjdGlvbk1hcCA9IDxUPihcclxuICBzdG9yZTogeWRqLlN0b3JlPFQ+LFxyXG4gIHNldFN0YXRlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxUIHwgdW5kZWZpbmVkIHwgbnVsbD4+XHJcbikgPT4ge1xyXG4gIGZvciAobGV0IGFjdGlvbiBpbiBzdG9yZS5hY3Rpb25zKSB7XHJcbiAgICBpZiAoIWFjdGlvbk1hcFthY3Rpb25dKSB7XHJcbiAgICAgIGFjdGlvbk1hcFthY3Rpb25dID0ge1xyXG4gICAgICAgIHN0b3JlLFxyXG4gICAgICAgIHNldFN0YXRlczogW10sXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IHN0b3JlOiB0YXJnZXQsIHNldFN0YXRlcyB9ID0gYWN0aW9uTWFwW2FjdGlvbl07XHJcblxyXG4gICAgaWYgKHN0b3JlICE9PSB0YXJnZXQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdG9yZSBhY3Rpb25zIGNvbmZsaWN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzZXRTdGF0ZXMuaW5jbHVkZXMoc2V0U3RhdGUpKSB7XHJcbiAgICAgIHNldFN0YXRlcy5wdXNoKHNldFN0YXRlKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVtb3ZlU3RvcmUgPSA8VD4oXHJcbiAgc3RvcmU6IHlkai5TdG9yZTxUPixcclxuICBzZXRTdGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248VCB8IHVuZGVmaW5lZCB8IG51bGw+PlxyXG4pID0+IHtcclxuICBPYmplY3Qua2V5cyhzdG9yZS5hY3Rpb25zKS5mb3JFYWNoKChhY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IHsgc3RvcmU6IHRhcmdldCwgc2V0U3RhdGVzIH0gPSBhY3Rpb25NYXBbYWN0aW9uXTtcclxuICAgIGlmIChzdG9yZSA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgIGNvbnN0IG5ld1NldFN0YXRlcyA9IHNldFN0YXRlcy5maWx0ZXIoKHNTdGF0ZSkgPT4gc1N0YXRlICE9PSBzZXRTdGF0ZSk7XHJcbiAgICAgIGFjdGlvbk1hcFthY3Rpb25dLnNldFN0YXRlcyA9IG5ld1NldFN0YXRlcztcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHNldFN0YXRlc0ZuID0gPFQ+KFxyXG4gIHNldFN0YXRlczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248VCB8IHVuZGVmaW5lZCB8IG51bGw+PltdLFxyXG4gIHN0YXRlOiBhbnlcclxuKSA9PiB7XHJcbiAgc2V0U3RhdGVzLmZvckVhY2goKHNldFN0YXRlKSA9PiB7XHJcbiAgICBzZXRTdGF0ZShzdGF0ZSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGlzcGF0Y2ggPSA8VD4oYWN0aW9uOiBzdHJpbmcsIGFyZ3M/OiBUKSA9PiB7XHJcbiAgaWYgKGFjdGlvbk1hcFthY3Rpb25dKSB7XHJcbiAgICBjb25zdCB7IHN0b3JlLCBzZXRTdGF0ZXMgfSA9IGFjdGlvbk1hcFthY3Rpb25dO1xyXG4gICAgY29uc3QgY2FsbGJhY2sgPSBzdG9yZS5hY3Rpb25zW2FjdGlvbl07XHJcbiAgICBjb25zdCByZXMgPSBjYWxsYmFjay5jYWxsKHN0b3JlLCBhcmdzKTtcclxuXHJcbiAgICBpZiAocmVzKSB7XHJcbiAgICAgIGlmIChyZXMgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgcmVzLnRoZW4oKCkgPT4gc2V0U3RhdGVzRm4oc2V0U3RhdGVzLCBzdG9yZS5zdGF0ZSkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHsgYWN0aW9uOiBhYywgZGF0YSB9ID0gcmVzO1xyXG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgICAgZGF0YS50aGVuKCh2YWwpID0+IHtcclxuICAgICAgICAgICAgc2V0U3RhdGVzRm4oc2V0U3RhdGVzLCBzdG9yZS5zdGF0ZSk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKGFjLCB2YWwpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNldFN0YXRlc0ZuKHNldFN0YXRlcywgc3RvcmUuc3RhdGUpO1xyXG4gICAgICAgICAgZGlzcGF0Y2goYWMsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0U3RhdGVzRm4oc2V0U3RhdGVzLCBzdG9yZS5zdGF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG4iLCJleHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RvcmU8VD4gaW1wbGVtZW50cyB5ZGouU3RvcmU8VD4ge1xyXG4gIHN0YXRlOiBUIHwgbnVsbCA9IG51bGw7XHJcbiAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBhYnN0cmFjdCBhY3Rpb25zOiB7XHJcbiAgICBbYWN0aW9uOiBzdHJpbmddOiB5ZGouU3RvcmVDYWxsYmFjaztcclxuICB9O1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuICBzZXRTdGF0ZShzdGF0ZTogVCB8IG51bGwpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnN0YXRlICE9PSBzdGF0ZSkge1xyXG4gICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGFkZFN0b3JlLCBnZXRTdG9yZSwgcmVtb3ZlU3RvcmUgfSBmcm9tICcuLi9jb3JlJztcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VTdG9yZSA9IDxUPihcclxuICBzdG9yZUNsYXNzOiAobmV3ICgpID0+IHlkai5TdG9yZTxUPikgfCB5ZGouU3RvcmU8VD4sXHJcbiAgaW5pdD86IFQgfCBudWxsXHJcbikgPT4ge1xyXG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGUoaW5pdCk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHN0b3JlID0gZ2V0U3RvcmUoc3RvcmVDbGFzcyk7XHJcbiAgICBpZiAoIXN0b3JlKSB7XHJcbiAgICAgIGNvbnN0IGluaXRTdGF0ZSA9IGFkZFN0b3JlKHN0b3JlQ2xhc3MsIHNldFN0YXRlLCBpbml0KTtcclxuXHJcbiAgICAgIGlmIChpbml0U3RhdGUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgaW5pdFN0YXRlLnRoZW4oKGlTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgc2V0U3RhdGUoaVN0YXRlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRTdGF0ZShpbml0U3RhdGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBnZXRTdG9yZShzdG9yZUNsYXNzKTtcclxuICAgICAgaWYgKHRhcmdldCkgcmVtb3ZlU3RvcmUodGFyZ2V0LCBzZXRTdGF0ZSk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG4gIHJldHVybiBzdGF0ZTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JlYWN0X187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImV4cG9ydCB7IHVzZVN0b3JlIH0gZnJvbSAnLi91c2VTdG9yZSc7XHJcbmV4cG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XHJcbmV4cG9ydCB7IGRpc3BhdGNoIH0gZnJvbSAnLi9jb3JlJztcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==