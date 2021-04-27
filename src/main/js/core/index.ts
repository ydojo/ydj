import React from 'react';

const storeMap: ydj.StoreMap = new Map();

export const addStore: ydj.AddStore = <T>(
  storeClass: typeof ydj.IStoreClass | ydj.IStore<T>,
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  let value: ydj.IStore<T> | undefined = storeMap.get(storeClass);

  if (!value) {
    if (storeClass instanceof Function) {
      value = new storeClass<T>();
    } else {
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

export const actionMap: ydj.ActionMap = {};

const setActionMap: ydj.SetActionMap = <T>(
  store: ydj.IStore<T>,
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  for (let action in store.actions) {
    if (!actionMap[action]) {
      actionMap[action] = { store, setState };
    } else {
      new Error(`conflict action name: ${action}`);
    }
  }
};

export const dispatch: ydj.Dispatch = <T>(action: string, args: T) => {
  if (actionMap[action]) {
    const { store, setState } = actionMap[action];
    const callback = store.actions[action];
    const res = callback.call(store, args);

    if (res) {
      if (res instanceof Promise) {
        res.then(() => {
          if (store.updated) {
            setState(store.state);
            store.updated = false;
          }
        });
      } else {
        const [ac, data] = res;
        if (data instanceof Promise) {
          data.then((val) => {
            if (store.updated) {
              setState(store.state);
              store.updated = false;
            }
            dispatch(ac, val);
          });
        } else {
          if (store.updated) {
            setState(store.state);
            store.updated = false;
          }
          dispatch(ac, data);
        }
      }
    }
  }
};
