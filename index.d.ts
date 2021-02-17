export declare type State = Record<string | number | symbol, unknown>;
export declare type PartialState<T extends State> = Partial<T> | ((state: T) => Partial<T>);
export declare type StateSelector<T extends State, U> = (state: T) => U;
export declare type EqualityChecker<T> = (state: T, newState: unknown) => boolean;
export declare type StateListener<T> = (state: T, previousState: T) => void;
export declare type StateSliceListener<T> = (slice: T, previousSlice: T) => void;
export declare type SetState<T extends State> = (partial: PartialState<T>, replace?: boolean) => void;
export declare type GetState<T extends State> = () => T;
export declare type Destroy = () => void;
export interface Subscribe<T extends State> {
    (listener: StateListener<T>): () => void;
    <StateSlice>(listener: StateSliceListener<StateSlice>, selector: StateSelector<T, StateSlice>, equalityFn?: EqualityChecker<StateSlice>): () => void;
}
export interface StoreApi<T extends State> {
    setState: SetState<T>;
    getState: GetState<T>;
    subscribe: Subscribe<T>;
    destroy: Destroy;
}
declare type NamedSet<S extends State> = (partial: PartialState<S>, replace?: boolean, name?: string) => void;
declare const zustandFlipper: <S extends Record<string | number | symbol, unknown>>(
    fn: (set: NamedSet<S>, get: GetState<S>, api: StoreApi<S>) => S,
    prefix?: string | undefined,
) => (
    set: SetState<S>,
    get: GetState<S>,
    api: StoreApi<S> & {
        dispatch?: unknown;
        devtools?: any;
    },
) => S;
export default zustandFlipper;
