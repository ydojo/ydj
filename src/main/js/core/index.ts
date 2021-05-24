import React from 'react';

const storeMap: Map<
  ydj.Store<any> | (new () => ydj.Store<any>),
  ydj.Store<any>
> = new Map();

export const addStore = <T>(
  storeClass: (new () => ydj.Store<T>) | ydj.Store<T>,
  setState: React.Dispatch<React.SetStateAction<T | undefined | null>>,
  init?: T | null
) => {
  let value: ydj.Store<T> | undefined = storeMap.get(storeClass);

  if (!value) {
    if (typeof storeClass !== 'function') {
      value = storeClass;
    } else {
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
      } else {
        if (init !== undefined && value.state === undefined) value.state = init;
        value.initialized = true;
        return value.state;
      }
    }
  }
};

export const getStore = <T>(
  storeClass: (new () => ydj.Store<T>) | ydj.Store<T>
) => {
  return storeMap.get(storeClass);
};

const actionMap: ydj.ActionMap = {};

const setActionMap = <T>(
  store: ydj.Store<T>,
  setState: React.Dispatch<React.SetStateAction<T | undefined | null>>
) => {
  for (let action in store.actions) {
    if (!actionMap[action]) {
      actionMap[action] = { store, setState };
    } else {
      new Error(`conflict action name: ${action}`);
    }
  }
};

export const dispatch = <T>(action: string, args?: T) => {
  if (actionMap[action]) {
    const { store, setState } = actionMap[action];
    const callback = store.actions[action];
    const res = callback.call(store, args);

    if (res) {
      if (res instanceof Promise) {
        res.then(() => setState(store.state));
      } else {
        const { action: ac, data } = res;
        if (data instanceof Promise) {
          data.then((val) => {
            setState(store.state);
            dispatch(ac, val);
          });
        } else {
          setState(store.state);
          dispatch(ac, data);
        }
      }
    } else {
      setState(store.state);
    }
  }
};
