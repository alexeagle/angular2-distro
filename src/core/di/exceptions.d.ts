import { BaseException, WrappedException } from 'angular2/src/core/facade/exceptions';
import { Key } from './key';
import { Injector } from './injector';
/**
 * Base class for all errors arising from misconfigured bindings.
 */
export declare class AbstractBindingError extends BaseException {
    /** @private */
    message: string;
    /** @private */
    keys: Key[];
    /** @private */
    injectors: Injector[];
    /** @private */
    constructResolvingMessage: Function;
    constructor(injector: Injector, key: Key, constructResolvingMessage: Function);
    addKey(injector: Injector, key: Key): void;
    context: any;
}
/**
 * Thrown when trying to retrieve a dependency by `Key` from {@link Injector}, but the
 * {@link Injector} does not have a {@link Binding} for {@link Key}.
 *
 * ### Example ([live demo](http://plnkr.co/edit/vq8D3FRB9aGbnWJqtEPE?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b:B) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 */
export declare class NoBindingError extends AbstractBindingError {
    constructor(injector: Injector, key: Key);
}
/**
 * Thrown when dependencies form a cycle.
 *
 * ### Example ([live demo](http://plnkr.co/edit/wYQdNos0Tzql3ei1EV9j?p=info))
 *
 * ```typescript
 * var injector = Injector.resolveAndCreate([
 *   bind("one").toFactory((two) => "two", [[new Inject("two")]]),
 *   bind("two").toFactory((one) => "one", [[new Inject("one")]])
 * ]);
 *
 * expect(() => injector.get("one")).toThrowError();
 * ```
 *
 * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
 */
export declare class CyclicDependencyError extends AbstractBindingError {
    constructor(injector: Injector, key: Key);
}
/**
 * Thrown when a constructing type returns with an Error.
 *
 * The `InstantiationError` class contains the original error plus the dependency graph which caused
 * this object to be instantiated.
 *
 * ### Example ([live demo](http://plnkr.co/edit/7aWYdcqTQsP0eNqEdUAf?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor() {
 *     throw new Error('message');
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([A]);

 * try {
 *   injector.get(A);
 * } catch (e) {
 *   expect(e instanceof InstantiationError).toBe(true);
 *   expect(e.originalException.message).toEqual("message");
 *   expect(e.originalStack).toBeDefined();
 * }
 * ```
 */
export declare class InstantiationError extends WrappedException {
    /** @private */
    keys: Key[];
    /** @private */
    injectors: Injector[];
    /** @private */
    constructor(injector: Injector, originalException: any, originalStack: any, key: Key);
    addKey(injector: Injector, key: Key): void;
    wrapperMessage: string;
    causeKey: Key;
    context: any;
}
/**
 * Thrown when an object other then {@link Binding} (or `Type`) is passed to {@link Injector}
 * creation.
 *
 * ### Example ([live demo](http://plnkr.co/edit/YatCFbPAMCL0JSSQ4mvH?p=preview))
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate(["not a type"])).toThrowError();
 * ```
 */
export declare class InvalidBindingError extends BaseException {
    constructor(binding: any);
}
/**
 * Thrown when the class has no annotation information.
 *
 * Lack of annotation information prevents the {@link Injector} from determining which dependencies
 * need to be injected into the constructor.
 *
 * ### Example ([live demo](http://plnkr.co/edit/rHnZtlNS7vJOPQ6pcVkm?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 *
 * This error is also thrown when the class not marked with {@link @Injectable} has parameter types.
 *
 * ```typescript
 * class B {}
 *
 * class A {
 *   constructor(b:B) {} // no information about the parameter types of A is available at runtime.
 * }
 *
 * expect(() => Injector.resolveAndCreate([A,B])).toThrowError();
 * ```
 */
export declare class NoAnnotationError extends BaseException {
    constructor(typeOrFunc: any, params: any[][]);
    private static _genMessage(typeOrFunc, params);
}
/**
 * Thrown when getting an object by index.
 *
 * ### Example ([live demo](http://plnkr.co/edit/bRs0SX2OTQiJzqvjgl8P?p=preview))
 *
 * ```typescript
 * class A {}
 *
 * var injector = Injector.resolveAndCreate([A]);
 *
 * expect(() => injector.getAt(100)).toThrowError();
 * ```
 */
export declare class OutOfBoundsError extends BaseException {
    constructor(index: any);
}
/**
 * Thrown when a multi binding and a regular binding are bound to the same token.
 *
 * ### Example
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate([
 *   new Binding("Strings", {toValue: "string1", multi: true}),
 *   new Binding("Strings", {toValue: "string2", multi: false})
 * ])).toThrowError();
 * ```
 */
export declare class MixingMultiBindingsWithRegularBindings extends BaseException {
    constructor(binding1: any, binding2: any);
}
