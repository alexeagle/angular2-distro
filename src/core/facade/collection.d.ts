export declare var Map: MapConstructor;
export declare var Set: SetConstructor;
export declare class MapWrapper {
    static clone<K, V>(m: Map<K, V>): Map<K, V>;
    static createFromStringMap<T>(stringMap: {
        [key: string]: T;
    }): Map<string, T>;
    static toStringMap<T>(m: Map<string, T>): {
        [key: string]: T;
    };
    static createFromPairs(pairs: any[]): Map<any, any>;
    static forEach<K, V>(m: Map<K, V>, fn: Function): void;
    static get<K, V>(map: Map<K, V>, key: K): V;
    static size(m: Map<any, any>): number;
    static delete<K>(m: Map<K, any>, k: K): void;
    static clearValues(m: Map<any, any>): void;
    static iterable<T>(m: T): T;
    static keys<K>(m: Map<K, any>): K[];
    static values<V>(m: Map<any, V>): V[];
}
/**
 * Wraps Javascript Objects
 */
export declare class StringMapWrapper {
    static create(): {
        [k: string]: any;
    };
    static contains(map: {
        [key: string]: any;
    }, key: string): boolean;
    static get<V>(map: {
        [key: string]: V;
    }, key: string): V;
    static set<V>(map: {
        [key: string]: V;
    }, key: string, value: V): void;
    static keys(map: {
        [key: string]: any;
    }): string[];
    static isEmpty(map: {
        [key: string]: any;
    }): boolean;
    static delete(map: {
        [key: string]: any;
    }, key: string): void;
    static forEach<K, V>(map: {
        [key: string]: V;
    }, callback: Function): void;
    static merge<V>(m1: {
        [key: string]: V;
    }, m2: {
        [key: string]: V;
    }): {
        [key: string]: V;
    };
    static equals<V>(m1: {
        [key: string]: V;
    }, m2: {
        [key: string]: V;
    }): boolean;
}
export interface Predicate<T> {
    (value: T, index?: number, array?: T[]): boolean;
}
export declare class ListWrapper {
    static createFixedSize(size: number): any[];
    static createGrowableSize(size: number): any[];
    static clone<T>(array: T[]): T[];
    static map<T, V>(array: T[], fn: (t: any) => V): V[];
    static forEach<T>(array: T[], fn: (t: any) => void): void;
    static forEachWithIndex<T>(array: T[], fn: (t: any, n: number) => void): void;
    static first<T>(array: T[]): T;
    static last<T>(array: T[]): T;
    static find<T>(list: T[], pred: Predicate<T>): T;
    static indexOf<T>(array: T[], value: T, startIndex?: number): number;
    static reduce<T, E>(list: T[], fn: (accumValue: E, currentValue: T, currentIndex: number, array: T[]) => E, init: E): E;
    static filter<T>(array: T[], pred: Predicate<T>): T[];
    static any(list: any[], pred: Function): boolean;
    static contains<T>(list: T[], el: T): boolean;
    static reversed<T>(array: T[]): T[];
    static concat(a: any[], b: any[]): any[];
    static insert<T>(list: T[], index: number, value: T): void;
    static removeAt<T>(list: T[], index: number): T;
    static removeAll<T>(list: T[], items: T[]): void;
    static removeLast<T>(list: T[]): T;
    static remove<T>(list: T[], el: T): boolean;
    static clear(list: any[]): void;
    static join(list: any[], s: string): string;
    static isEmpty(list: any[]): boolean;
    static fill(list: any[], value: any, start?: number, end?: number): void;
    static equals(a: any[], b: any[]): boolean;
    static slice<T>(l: T[], from?: number, to?: number): T[];
    static splice<T>(l: T[], from: number, length: number): T[];
    static sort<T>(l: T[], compareFn?: (a: T, b: T) => number): void;
    static toString<T>(l: T[]): string;
    static toJSON<T>(l: T[]): string;
    static maximum<T>(list: T[], predicate: (t: any) => number): T;
}
export declare function isListLikeIterable(obj: any): boolean;
export declare function iterateListLike(obj: any, fn: Function): void;
export declare class SetWrapper {
    static createFromList<T>(lst: T[]): Set<T>;
    static has<T>(s: Set<T>, key: T): boolean;
    static delete<K>(m: Set<K>, k: K): void;
}
