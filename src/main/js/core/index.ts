import React from 'react';
import ydj, { ActionMap } from 'index';

const storeMap: Map<
  ydj.IStore<any> | typeof ydj.IStore,
  ydj.IStore<any>
> = new Map();

export const addStore = <T>(
  storeClass: typeof ydj.IStore | ydj.IStore<T>,
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

const actionMap: ActionMap = {};

const setActionMap = <T>(
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

export const dispatch = <T>(action: string, args: T) => {
  if (actionMap[action]) {
    const { store, setState } = actionMap[action];
    const callback = store.actions[action];
    const res = callback.call(store, args);

    if (res) {
      if (res instanceof Promise) {
        res.then(() => setState(store.state));
      } else {
        const [ac, data] = res;
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
    }
  }
};
