import type { StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla';
type Immer = <T, Mps extends [StoreMutatorIdentifier, unknown][] = [], Mcs extends [StoreMutatorIdentifier, unknown][] = []>(initializer: StateCreator<T, [...Mps, ['zustand/flipper', never]], Mcs>) => StateCreator<T, Mps, [['zustand/flipper', never], ...Mcs]>;
declare module 'zustand/vanilla' {
    interface StoreMutators<S, A> {
        ['zustand/flipper']: WithFlipper<S>;
    }
}
type Write<T, U> = Omit<T, keyof U> & U;

type Cast<T, U> = T extends U ? T : U;
type TakeTwo<T> = T extends {
    length: 0;
} ? [undefined, undefined] : T extends {
    length: 1;
} ? [...a0: Cast<T, unknown[]>, a1: undefined] : T extends {
    length: 0 | 1;
} ? [...a0: Cast<T, unknown[]>, a1: undefined] : T extends {
    length: 2;
} ? T : T extends {
    length: 1 | 2;
} ? T : T extends {
    length: 0 | 1 | 2;
} ? T : T extends [infer A0, infer A1, ...unknown[]] ? [A0, A1] : T extends [infer A0, (infer A1)?, ...unknown[]] ? [A0, A1?] : T extends [(infer A0)?, (infer A1)?, ...unknown[]] ? [A0?, A1?] : never;

type WithFlipper<S> = Write<S, StoreImmer<S>>;

type StoreImmer<S> = S extends {
    setState: (...a: infer Sa) => infer Sr;
} ? {
    setState<A extends string>(...a: [...a: TakeTwo<Sa>, actionName?: A]): Sr;
} : never;


export const zustandFlipper: Immer;


export default zustandFlipper;