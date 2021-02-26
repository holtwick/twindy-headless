import { TwindyEventEmitter } from "../types";
export declare function useOn(emitter: TwindyEventEmitter, eventName: string, fn: EventHandlerNonNull, trigger?: boolean): () => void;
