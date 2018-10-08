/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module 'microstates' {
  export function create<T> (c: { new(): T; }, value: any): T;
  export function Store<T> (T, callback: (next: T) => void): T;
}