export abstract class Store<T> implements ydj.Store<T> {
  state?: T | null;
  initialized: boolean = false;
  abstract actions: {
    [action: string]: ydj.StoreCallback;
  };
  constructor() {}
  setState(state: T | null): void {
    if (this.state !== state) {
      this.state = state;
    }
  }
}
