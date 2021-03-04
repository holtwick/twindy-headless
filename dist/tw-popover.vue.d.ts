declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    target: {
        default: boolean;
    };
    transition: {
        type: StringConstructor;
        default: string;
    };
    arrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    placement: {
        default: string;
    };
    theme: {
        default: string;
    };
    text: {
        default: string;
    };
    offset: {
        default: () => number[];
    };
}, {
    id: import("vue").Ref<string>;
    popover: import("vue").Ref<any>;
    open: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue: boolean;
    active: boolean;
    target: boolean;
    transition: string;
    arrow: boolean;
    placement: string;
    theme: string;
    text: string;
    offset: number[];
} & {}>, {
    modelValue: boolean;
    active: boolean;
    target: boolean;
    transition: string;
    arrow: boolean;
    placement: string;
    theme: string;
    text: string;
    offset: number[];
}>;
export default _default;
