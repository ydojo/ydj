import ydj from 'index';
import { useState } from 'react';
import { addStore, dispatch } from '../core';

export const useStore = <T>(
  storeClass: typeof ydj.Store | ydj.Store<T>,
  init: T
) => {
  const [state, setState] = useState(init);
  addStore(storeClass, setState);
  return [state, dispatch];
};
