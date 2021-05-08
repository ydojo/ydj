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
    storeClass: typeof IStoreClass | IStore<T>,
    init: T
  ): [T, Dispatch];

  declare interface BaseStore {
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
  }

  /**
   * Storeインターフェース
   */
  declare interface IStore<T> extends BaseStore {
    state: T | null;
  }

  /**
   * Storeクラス
   */
  declare abstract class Store<T> implements IStore<T> {
    state: T | null;
    initialized: boolean;
    abstract actions: {
      [action: string]: StoreCallback;
    };
    setState(state: T | null): void;
  }

  /**
   * Storeクラス
   */
  declare class IStoreClass<T> extends Store<T> {}

  /**
   * action callback
   */
  declare type StoreCallback = <T>(
    arg: T
  ) => void | [action: string, data: any | Promise<any>] | Promise<void>;
}

/**
 * action map
 */
export interface ActionMap {
  [action: string]: {
    store: IStore<T>;
    setState: React.Dispatch<React.SetStateAction<T>>;
  };
}
