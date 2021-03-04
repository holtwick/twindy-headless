export declare const sign: (x: number) => number;
export declare function getValueByPath(obj: any, path: any): any;
export declare function indexOf(array: any, obj: any, fn: any): any;
export declare const isMobile: {
    Android: () => false | RegExpMatchArray | null;
    BlackBerry: () => false | RegExpMatchArray | null;
    iOS: () => false | RegExpMatchArray | null;
    Opera: () => false | RegExpMatchArray | null;
    Windows: () => false | RegExpMatchArray | null;
    any: () => false | RegExpMatchArray | null;
};
export declare function removeElement(el: any): void;
export declare function escapeRegExpChars(value: any): any;
export declare function escapeRegExp(value: any): any;
export declare const supportsTouch: boolean;
