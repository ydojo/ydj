export abstract class Store<T> implements ydj.IStore<T> {
  abstract state?: T;
  abstract init(): T;
  abstract actions: {
    [action: string]: (...args: any[]) => T | void;
  };
}
