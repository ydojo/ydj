export abstract class Store<T> implements ydj.IStoreClass<T> {
  state: T | null = null;
  updated: boolean = false;
  initialized: boolean = false;
  abstract actions: {
    [action: string]: ydj.StoreCallback;
  };
  constructor() {}
  setState(state: T | null): void {
    if (this.state !== state) {
      this.updated = true;
      this.state = state;
    }
  }
}
