import { ResolvedBinding, Binding, Dependency } from './binding';
import { Type } from 'angular2/src/core/facade/lang';
import { Key } from './key';
export declare const UNDEFINED: Object;
/**
 * Visibility of a {@link Binding}.
 */
export declare enum Visibility {
    /**
     * A `Public` {@link Binding} is only visible to regular (as opposed to host) child injectors.
     */
    Public = 0,
    /**
     * A `Private` {@link Binding} is only visible to host (as opposed to regular) child injectors.
     */
    Private = 1,
    /**
     * A `PublicAndPrivate` {@link Binding} is visible to both host and regular child injectors.
     */
    PublicAndPrivate = 2,
}
export interface ProtoInjectorStrategy {
    getBindingAtIndex(index: number): ResolvedBinding;
    createInjectorStrategy(inj: Injector): InjectorStrategy;
}
export declare class ProtoInjectorInlineStrategy implements ProtoInjectorStrategy {
    binding0: ResolvedBinding;
    binding1: ResolvedBinding;
    binding2: ResolvedBinding;
    binding3: ResolvedBinding;
    binding4: ResolvedBinding;
    binding5: ResolvedBinding;
    binding6: ResolvedBinding;
    binding7: ResolvedBinding;
    binding8: ResolvedBinding;
    binding9: ResolvedBinding;
    keyId0: number;
    keyId1: number;
    keyId2: number;
    keyId3: number;
    keyId4: number;
    keyId5: number;
    keyId6: number;
    keyId7: number;
    keyId8: number;
    keyId9: number;
    visibility0: Visibility;
    visibility1: Visibility;
    visibility2: Visibility;
    visibility3: Visibility;
    visibility4: Visibility;
    visibility5: Visibility;
    visibility6: Visibility;
    visibility7: Visibility;
    visibility8: Visibility;
    visibility9: Visibility;
    constructor(protoEI: ProtoInjector, bwv: BindingWithVisibility[]);
    getBindingAtIndex(index: number): any;
    createInjectorStrategy(injector: Injector): InjectorStrategy;
}
export declare class ProtoInjectorDynamicStrategy implements ProtoInjectorStrategy {
    bindings: ResolvedBinding[];
    keyIds: number[];
    visibilities: Visibility[];
    constructor(protoInj: ProtoInjector, bwv: BindingWithVisibility[]);
    getBindingAtIndex(index: number): any;
    createInjectorStrategy(ei: Injector): InjectorStrategy;
}
export declare class ProtoInjector {
    _strategy: ProtoInjectorStrategy;
    numberOfBindings: number;
    constructor(bwv: BindingWithVisibility[]);
    getBindingAtIndex(index: number): any;
}
export interface InjectorStrategy {
    getObjByKeyId(keyId: number, visibility: Visibility): any;
    getObjAtIndex(index: number): any;
    getMaxNumberOfObjects(): number;
    attach(parent: Injector, isHost: boolean): void;
    resetConstructionCounter(): void;
    instantiateBinding(binding: ResolvedBinding, visibility: Visibility): any;
}
export declare class InjectorInlineStrategy implements InjectorStrategy {
    injector: Injector;
    protoStrategy: ProtoInjectorInlineStrategy;
    obj0: any;
    obj1: any;
    obj2: any;
    obj3: any;
    obj4: any;
    obj5: any;
    obj6: any;
    obj7: any;
    obj8: any;
    obj9: any;
    constructor(injector: Injector, protoStrategy: ProtoInjectorInlineStrategy);
    resetConstructionCounter(): void;
    instantiateBinding(binding: ResolvedBinding, visibility: Visibility): any;
    attach(parent: Injector, isHost: boolean): void;
    getObjByKeyId(keyId: number, visibility: Visibility): any;
    getObjAtIndex(index: number): any;
    getMaxNumberOfObjects(): number;
}
export declare class InjectorDynamicStrategy implements InjectorStrategy {
    protoStrategy: ProtoInjectorDynamicStrategy;
    injector: Injector;
    objs: any[];
    constructor(protoStrategy: ProtoInjectorDynamicStrategy, injector: Injector);
    resetConstructionCounter(): void;
    instantiateBinding(binding: ResolvedBinding, visibility: Visibility): any;
    attach(parent: Injector, isHost: boolean): void;
    getObjByKeyId(keyId: number, visibility: Visibility): any;
    getObjAtIndex(index: number): any;
    getMaxNumberOfObjects(): number;
}
export declare class BindingWithVisibility {
    binding: ResolvedBinding;
    visibility: Visibility;
    constructor(binding: ResolvedBinding, visibility: Visibility);
    getKeyId(): number;
}
/**
 * FIXME(alexeagle): make internal
 * Used to provide dependencies that cannot be easily expressed as bindings.
 */
export interface DependencyProvider {
    getDependency(injector: Injector, binding: ResolvedBinding, dependency: Dependency): any;
}
/**
 * A dependency injection container used for instantiating objects and resolving dependencies.
 *
 * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
 * constructor dependencies.
 *
 * In typical use, application code asks for the dependencies in the constructor and they are
 * resolved by the `Injector`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/jzjec0?p=preview))
 *
 * The following example creates an `Injector` configured to create `Engine` and `Car`.
 *
 * ```typescript
 * @Injectable()
 * class Engine {
 * }
 *
 * @Injectable()
 * class Car {
 *   constructor(public engine:Engine) {}
 * }
 *
 * var injector = Injector.resolveAndCreate([Car, Engine]);
 * var car = injector.get(Car);
 * expect(car instanceof Car).toBe(true);
 * expect(car.engine instanceof Engine).toBe(true);
 * ```
 *
 * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
 * resolve all of the object's dependencies automatically.
 */
export declare class Injector {
    _proto: any;
    _parent: Injector;
    private _depProvider;
    private _debugContext;
    /**
     * Turns an array of binding definitions into an array of resolved bindings.
     *
     * A resolution is a process of flattening multiple nested arrays and converting individual
     * bindings into an array of {@link ResolvedBinding}s.
     *
     * ### Example ([live demo](http://plnkr.co/edit/AiXTHi?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var bindings = Injector.resolve([Car, [[Engine]]]);
     *
     * expect(bindings.length).toEqual(2);
     *
     * expect(bindings[0] instanceof ResolvedBinding).toBe(true);
     * expect(bindings[0].key.displayName).toBe("Car");
     * expect(bindings[0].dependencies.length).toEqual(1);
     * expect(bindings[0].factory).toBeDefined();
     *
     * expect(bindings[1].key.displayName).toBe("Engine");
     * });
     * ```
     *
     * See {@link fromResolvedBindings} for more info.
     */
    static resolve(bindings: Array<Type | Binding | any[]>): ResolvedBinding[];
    /**
     * Resolves an array of bindings and creates an injector from those bindings.
     *
     * The passed-in bindings can be an array of `Type`, {@link Binding},
     * or a recursive array of more bindings.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ePOccA?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = Injector.resolveAndCreate([Car, Engine]);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     *
     * This function is slower than the corresponding `fromResolvedBindings`
     * because it needs to resolve the passed-in bindings first.
     * See {@link resolve} and {@link fromResolvedBindings}.
     */
    static resolveAndCreate(bindings: Array<Type | Binding | any[]>): Injector;
    /**
     * Creates an injector from previously resolved bindings.
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/KrSMci?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var bindings = Injector.resolve([Car, Engine]);
     * var injector = Injector.fromResolvedBindings(bindings);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     */
    static fromResolvedBindings(bindings: ResolvedBinding[]): Injector;
    _strategy: InjectorStrategy;
    _isHost: boolean;
    _constructionCounter: number;
    /**
     * Private
     */
    constructor(_proto: any, _parent?: Injector, _depProvider?: any, _debugContext?: Function);
    /**
     * Retrieves an instance from the injector based on the provided token.
     * Throws {@link NoBindingError} if not found.
     *
     * ### Example ([live demo](http://plnkr.co/edit/HeXSHg?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   bind("validToken").toValue("Value")
     * ]);
     * expect(injector.get("validToken")).toEqual("Value");
     * expect(() => injector.get("invalidToken")).toThrowError();
     * ```
     *
     * `Injector` returns itself when given `Injector` as a token.
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([]);
     * expect(injector.get(Injector)).toBe(injector);
     * ```
     */
    get(token: any): any;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * Returns null if not found.
     *
     * ### Example ([live demo](http://plnkr.co/edit/tpEbEy?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   bind("validToken").toValue("Value")
     * ]);
     * expect(injector.getOptional("validToken")).toEqual("Value");
     * expect(injector.getOptional("invalidToken")).toBe(null);
     * ```
     *
     * `Injector` returns itself when given `Injector` as a token.
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([]);
     * expect(injector.getOptional(Injector)).toBe(injector);
     * ```
     */
    getOptional(token: any): any;
    /**
     * Parent of this injector.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/eosMGo?p=preview))
     *
     * ```typescript
     * var parent = Injector.resolveAndCreate([]);
     * var child = parent.resolveAndCreateChild([]);
     * expect(child.parent).toBe(parent);
     * ```
     */
    parent: Injector;
    /**
     * Resolves an array of bindings and creates a child injector from those bindings.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * The passed-in bindings can be an array of `Type`, {@link Binding},
     * or a recursive array of more bindings.
     *
     * ### Example ([live demo](http://plnkr.co/edit/opB3T4?p=preview))
     *
     * ```typescript
     * class ParentBinding {}
     * class ChildBinding {}
     *
     * var parent = Injector.resolveAndCreate([ParentBinding]);
     * var child = parent.resolveAndCreateChild([ChildBinding]);
     *
     * expect(child.get(ParentBinding) instanceof ParentBinding).toBe(true);
     * expect(child.get(ChildBinding) instanceof ChildBinding).toBe(true);
     * expect(child.get(ParentBinding)).toBe(parent.get(ParentBinding));
     * ```
     *
     * This function is slower than the corresponding `createChildFromResolved`
     * because it needs to resolve the passed-in bindings first.
     * See {@link resolve} and {@link createChildFromResolved}.
     */
    resolveAndCreateChild(bindings: Array<Type | Binding | any[]>): Injector;
    /**
     * Creates a child injector from previously resolved bindings.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/VhyfjN?p=preview))
     *
     * ```typescript
     * class ParentBinding {}
     * class ChildBinding {}
     *
     * var parentBindings = Injector.resolve([ParentBinding]);
     * var childBindings = Injector.resolve([ChildBinding]);
     *
     * var parent = Injector.fromResolvedBindings(parentBindings);
     * var child = parent.createChildFromResolved(childBindings);
     *
     * expect(child.get(ParentBinding) instanceof ParentBinding).toBe(true);
     * expect(child.get(ChildBinding) instanceof ChildBinding).toBe(true);
     * expect(child.get(ParentBinding)).toBe(parent.get(ParentBinding));
     * ```
     */
    createChildFromResolved(bindings: ResolvedBinding[]): Injector;
    /**
     * Resolves a binding and instantiates an object in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/yvVXoB?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = Injector.resolveAndCreate([Engine]);
     *
     * var car = injector.resolveAndInstantiate(Car);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.resolveAndInstantiate(Car));
     * ```
     */
    resolveAndInstantiate(binding: Type | Binding): any;
    /**
     * Instantiates an object using a resolved binding in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ptCImQ?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = Injector.resolveAndCreate([Engine]);
     * var carBinding = Injector.resolve([Car])[0];
     * var car = injector.instantiateResolved(carBinding);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.instantiateResolved(carBinding));
     * ```
     */
    instantiateResolved(binding: ResolvedBinding): any;
    _new(binding: ResolvedBinding, visibility: Visibility): any;
    private _instantiateBinding(binding, visibility);
    private _instantiate(binding, resolvedFactory, visibility);
    private _getByDependency(binding, dep, bindingVisibility);
    private _getByKey(key, lowerBoundVisibility, upperBoundVisibility, optional, bindingVisibility);
    _throwOrNull(key: Key, optional: boolean): any;
    _getByKeySelf(key: Key, optional: boolean, bindingVisibility: Visibility): any;
    _getByKeyHost(key: Key, optional: boolean, bindingVisibility: Visibility, lowerBoundVisibility: Object): any;
    _getPrivateDependency(key: Key, optional: boolean, inj: Injector): any;
    _getByKeyDefault(key: Key, optional: boolean, bindingVisibility: Visibility, lowerBoundVisibility: Object): any;
    displayName: string;
    toString(): string;
}
