export = ydj;

export as namespace ydj;

declare namespace ydj {
  class IStore<T> {
    state?: T;
    init(): T;
    actions: {
      [action: string]: (...args: any[]) => T | void;
    };
  }
}
