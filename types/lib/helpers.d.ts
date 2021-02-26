export declare const sign: (x: number) => number;
export declare function getValueByPath(obj: any, path: any): any;
export declare function indexOf(array: any, obj: any, fn: any): any;
export declare const merge: (target: any, source: any, deep?: boolean) => any;
export declare const isMobile: {
    Android: () => RegExpMatchArray;
    BlackBerry: () => RegExpMatchArray;
    iOS: () => RegExpMatchArray;
    Opera: () => RegExpMatchArray;
    Windows: () => RegExpMatchArray;
    any: () => RegExpMatchArray;
};
export declare function removeElement(el: any): void;
export declare function escapeRegExpChars(value: any): any;
export declare function escapeRegExp(value: any): any;
export declare const supportsTouch: boolean;
