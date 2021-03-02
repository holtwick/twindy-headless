export declare function arrayRemoveElement(arr: any, el: any): any[];
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: ArrayConstructor;
    };
    allTags: {
        type: ObjectConstructor;
    };
}, {
    candidates: import("vue").Ref<any[]>;
    tags: import("vue").ComputedRef<any[]>;
    filter: import("vue").Ref<string>;
    setTags(tags2?: any[]): void;
    doRemoveTag(id: any): void;
    handleSelection(item: any): Promise<void>;
    handleFilter(filter2: any): void;
    handleDeleteLast(): void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "create")[], "update:modelValue" | "create", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    modelValue?: unknown[];
    allTags?: Record<string, any>;
}>, {}>;
export default _default;
