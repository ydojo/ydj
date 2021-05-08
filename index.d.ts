declare global {
  import React from 'react';
}

export = ydj;

export as namespace ydj;

declare namespace ydj {
  interface BaseStore {
    initialized: boolean;
    /**
     * 初期処理
     */
    init?(): void;
    /**
     * actionに対するコールバックを定義
     */
    actions: {
      [action: string]: StoreCallback;
    };
  }
  /**
   * Storeインターフェース
   */
  interface IStore<T> extends BaseStore {
    state: T | null;
  }

  /**
   * Storeクラス
   */
  class IStoreClass<T> extends IStore<T> {
    state: T | null;
    initialized: boolean;
    actions: {
      [action: string]: StoreCallback;
    };
    setState(state: T | null): void;
  }

  /**
   * action callback
   */
  type StoreCallback = <T>(
    arg: T
  ) => void | [action: string, data: any | Promise<any>] | Promise<void>;

  /**
   * useStoreメソッド
   */
  type UseStore = <T>(
    storeClass: typeof IStoreClass | IStore<T>,
    init: T
  ) => [T, Dispatch];

  /**
   * dispatchメソッド
   */
  type Dispatch = <T>(action: string, arg: T) => void;

  /**
   * store map
   */
  type StoreMap = Map<IStore<any> | typeof IStoreClass, IStore<any>>;

  /**
   * add store method
   */
  type AddStore = <T>(
    storeClass: typeof IStoreClass | IStore<T>,
    setState: React.Dispatch<React.SetStateAction<T>>
  ) => void;

  /**
   * action map
   */
  interface ActionMap {
    [action: string]: {
      store: IStore<T>;
      setState: React.Dispatch<React.SetStateAction<T>>;
    };
  }

  /**
   * set Actions
   */
  type SetActionMap = <T>(
    store: IStore<T>,
    setState: React.Dispatch<React.SetStateAction<T>>
  ) => void;
}
