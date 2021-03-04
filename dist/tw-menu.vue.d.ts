declare const _default: import("vue").DefineComponent<{
    items: {
        type: ArrayConstructor;
        default: () => never[];
    };
    target: {
        type: {
            new (): Element;
            prototype: Element;
        };
    };
}, unknown, {
    blocked: boolean;
}, {}, {
    doAction(item: any): Promise<void>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    items: unknown[];
} & {
    target?: Element | undefined;
}>, {
    items: unknown[];
}>;
export default _default;
