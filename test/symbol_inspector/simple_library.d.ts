export declare class A {
    constructor(b: ConsParamType);
    field: FieldType;
    getter: GetterType;
    method(p: ParamType): MethodReturnType;
    methodWithFunc(closure: ClosureReturn): void;
    static staticField: StaticFieldType;
    static staticMethod(): void;
}
export declare class ConsParamType {
}
export declare class FieldType {
}
export declare class GetterType {
}
export declare class MethodReturnType {
}
export declare class ParamType {
}
export declare class StaticFieldType {
}
export declare class ClosureReturn {
}
export declare class ClosureParam {
}
export declare class TypedefReturnType {
}
export declare class TypedefParam {
}
export declare class Generic<K> {
    getter: K;
}
export interface SomeInterface {
    someMethod(): any;
}
