declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    close: {
        type: BooleanConstructor;
        default: boolean;
    };
    role: {
        default: string;
    };
    canCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    onCancel: {
        type: FunctionConstructor;
        default: () => void;
    };
}, {
    root: import("vue").Ref<any>;
    open: import("vue").Ref<boolean>;
    doCancel(): void;
    doClose(): void;
    didOpen(): void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "update:modelValue" | "didOpen" | "willOpen" | "willClose" | "didClose" | "cancel")[], "close" | "update:modelValue" | "didOpen" | "willOpen" | "willClose" | "didClose" | "cancel", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    close: boolean;
    modelValue: boolean;
    active: boolean;
    title: string;
    role: string;
    canCancel: boolean;
    onCancel: Function;
} & {}>, {
    close: boolean;
    modelValue: boolean;
    active: boolean;
    title: string;
    role: string;
    canCancel: boolean;
    onCancel: Function;
}>;
export default _default;
