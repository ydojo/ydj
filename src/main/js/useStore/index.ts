import ydj from 'index';
import { useState } from 'react';
import { addStore, dispatch } from '../core';

export const useStore = <T>(
  storeClass: new () => ydj.Store<T> | ydj.Store<T>,
  init: T
) => {
  const [state, setState] = useState(init);
  addStore(storeClass, setState);
  return [state, dispatch];
};
