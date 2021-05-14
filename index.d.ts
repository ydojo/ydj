declare global {
  import React from 'react';
}

export = ydj;

export as namespace ydj;

declare namespace ydj {
  /**
   * dispatchメソッド
   */
  declare type Dispatch = <T>(action: string, arg: T) => void;
  /**
   * useStoreメソッド
   */
  declare function useStore<T>(
    storeClass: typeof Store | Store<T>,
    init: T
  ): [T, Dispatch];

  /**
   * Storeクラス
   */
  declare class Store<T> {
    state: T | null;
    initialized: boolean;
    /**
     * 初期処理
     */
    init?(): void;
    /**
     * actionに対するコールバックを定義
     */
    actions: {
      [action: string]: ydj.StoreCallback;
    };
    setState(state: T | null): void;
  }

  /**
   * action callback
   */
  declare type StoreCallback = (
    arg: any
  ) => void | [action: string, data: any | Promise<any | void>] | Promise<void>;
}

/**
 * action map
 */
export interface ActionMap {
  [action: string]: {
    store: Store<T>;
    setState: React.Dispatch<React.SetStateAction<T>>;
  };
}
