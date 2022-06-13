import {
  Destroy,
  GetState,
  Mutate,
  State,
  StoreMutatorIdentifier,
  Subscribe,
} from "zustand";

export declare type SetState<T extends State> = {
  _(
    partial: T | Partial<T> | ((state: T) => T | Partial<T>),
    replace?: boolean | undefined,
    name?: string
  ): void;
}["_"];

declare type StoreApi<T extends State> = {
  setState: SetState<T>;
  getState: GetState<T>;
  subscribe: Subscribe<T>;
  destroy: Destroy;
};

declare type Get<T, K, F = never> = K extends keyof T ? T[K] : F;
declare type StateCreator<
  T extends State,
  Mis extends [StoreMutatorIdentifier, unknown][] = [],
  Mos extends [StoreMutatorIdentifier, unknown][] = [],
  U = T
> = ((
  setState: Get<Mutate<StoreApi<T>, Mis>, "setState", undefined>,
  getState: Get<Mutate<StoreApi<T>, Mis>, "getState", undefined>,
  store: Mutate<StoreApi<T>, Mis>,
  $$storeMutations: Mis
) => U) & {
  $$storeMutators?: Mos;
};

type PopArgument<T extends (...a: never[]) => unknown> = T extends (
  ...a: [...infer A, infer _]
) => infer R
  ? (...a: A) => R
  : never;

type Logger = <
  T extends State,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>;

declare const zustandFlipper: Logger;

export default zustandFlipper;
