declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (BooleanConstructor | ObjectConstructor)[];
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
    standalone: {
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
}, unknown, unknown, {}, {
    doCancel(): void;
    doClose(): void;
    keyPress(event: any): void;
    doFocus(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "update:modelValue" | "didopen" | "willclose" | "cancel")[], "close" | "update:modelValue" | "didopen" | "willclose" | "cancel", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    close: boolean;
    modelValue: boolean;
    title: string;
    standalone: boolean;
    role: string;
    canCancel: boolean;
    onCancel: Function;
} & {}>, {
    close: boolean;
    modelValue: boolean;
    title: string;
    standalone: boolean;
    role: string;
    canCancel: boolean;
    onCancel: Function;
}>;
export default _default;
