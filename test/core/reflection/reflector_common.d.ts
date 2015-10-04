export declare class ClassDecoratorMeta {
    value: any;
    constructor(value: any);
}
export declare class ParamDecoratorMeta {
    value: any;
    constructor(value: any);
}
export declare class PropDecoratorMeta {
    value: any;
    constructor(value: any);
}
export declare function classDecorator(value: any): ClassDecoratorMeta;
export declare function paramDecorator(value: any): ParamDecoratorMeta;
export declare function propDecorator(value: any): PropDecoratorMeta;
export declare var ClassDecorator: (...args: any[]) => (cls: any) => any;
export declare var ParamDecorator: any;
export declare var PropDecorator: any;
export declare class HasGetterAndSetterDecorators {
}
