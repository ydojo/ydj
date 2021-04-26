export abstract class Store<T> implements ydj.IStore<T> {
  state: T | null = null;
  updated: boolean = false;
  initialized: boolean = false;
  abstract actions: {
    [action: string]: ydj.StoreCallback;
  };
}
