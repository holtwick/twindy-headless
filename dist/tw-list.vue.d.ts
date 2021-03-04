declare const _default: import("vue").DefineComponent<{
    distance: {
        type: NumberConstructor;
        default: number;
    };
    scrollable: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, {
    count: number;
    loading: boolean;
}, {}, {
    doMore(): void;
    onScroll(ev: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    distance: number;
    scrollable: boolean;
} & {}>, {
    distance: number;
    scrollable: boolean;
}>;
export default _default;
