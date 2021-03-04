declare const _default: import("vue").DefineComponent<{
    uid: {
        type: StringConstructor;
        default: string;
    };
    items: {
        type: ArrayConstructor;
        default: never[];
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    minSize: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    filter: {
        type: StringConstructor;
        default: string;
    };
}, {
    filterText: import("vue").Ref<string>;
    target: import("vue").Ref<any>;
    input: import("vue").Ref<any>;
    active: import("vue").ComputedRef<boolean>;
    selected: import("vue").Ref<number>;
    itemCandidate: import("vue").Ref<null>;
    focus: import("vue").Ref<boolean>;
    resizeInput(): void;
    doInput(): void;
    doClear(): void;
    doMove(delta: any): void;
    doAddItem(item: any): void;
    doAddSelection(): void;
    doDeleteLast(ev: any): void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("filter" | "deleteLast" | "add" | "update:filter")[], "filter" | "deleteLast" | "add" | "update:filter", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    filter: string;
    uid: string;
    items: unknown[];
    placeholder: string;
    minSize: string | number;
} & {}>, {
    filter: string;
    uid: string;
    items: unknown[];
    placeholder: string;
    minSize: string | number;
}>;
export default _default;
