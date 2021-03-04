declare const directive: {
    beforeMount: (el: any, { value }: {
        value?: boolean | undefined;
    }) => void;
    unMount: (el: any) => void;
};
export default directive;
