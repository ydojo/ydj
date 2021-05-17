import ydj from 'index';
import { useState } from 'react';
import { addStore, dispatch } from '../core';

export const useStore = <T>(
  storeClass: new () => ydj.Store<T> | ydj.Store<T>,
  init?: T
) => {
  const [state, setState] = useState(init);
  const initState = addStore(storeClass, setState, init);
  if (initState !== undefined) {
    return [initState, dispatch];
  } else {
    return [state, dispatch];
  }
};
