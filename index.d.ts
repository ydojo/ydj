export = ydj;

export as namespace ydj;

declare namespace ydj {
  /**
   * Storeインターフェース
   */
  interface IStore<T> {
    state: T | null;
    updated: boolean;
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
   * action callback
   */
  type StoreCallback = (...args: any[]) => void | Promise<void>;

  /**
   * storeクラス
   */
  type IStoreClass<T> = new () => IStore<T>;

  /**
   * useStoreメソッド
   */
  type UseStore = <T>(
    storeClass: IStoreClass<T> | IStore<T>
  ) => [T | null, Dispatch];

  /**
   * dispatchメソッド
   */
  type Dispatch = (action: string, ...args: any[]) => void;

  /**
   * dispatcher
   */
  class Dispatcher {}
}
