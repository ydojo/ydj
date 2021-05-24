import { useEffect, useState } from 'react';
import { addStore, dispatch, getStore } from '../core';

export const useStore = <T>(
  storeClass: (new () => ydj.Store<T>) | ydj.Store<T>,
  init?: T | null
) => {
  const store = getStore(storeClass);
  const [state, setState] = useState(init);
  useEffect(() => {
    if (!store) {
      const initState = addStore(storeClass, setState, init);

      if (initState instanceof Promise) {
        initState.then((iState) => {
          setState(iState);
        });
      } else {
        setState(initState);
      }
    }
  });
  return [state, dispatch];
};
