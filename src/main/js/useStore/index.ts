export const useStore: ydj.UseStore = <T>(
  storeClass: ydj.IStoreClass<T> | ydj.IStore<T>
) => {
  const dispatch = (action: string) => {};
  return [null, dispatch];
};
