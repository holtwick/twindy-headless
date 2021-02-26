export interface TwindyNotification {
    id?: string;
    active?: boolean;
    title: string;
    message?: string;
    timeout?: number;
    confirm?: (id: string) => void;
    cancel?: (id: string) => void;
}
export interface TwindyMenuItem {
    id: string | number;
    title?: string;
    checked?: boolean;
    blocked?: boolean;
    action?: (item: any) => void;
}
export interface TwindyEventEmitter {
    on?(name: string, fn: Function): void;
    off?(name: string, fn: Function): void;
    addEventListener?(name: string, fn: Function): void;
    removeEventListener?(name: string, fn: Function): void;
}
