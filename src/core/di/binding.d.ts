import { Type } from 'angular2/src/core/facade/lang';
import { Key } from './key';
/**
 * @private
 */
export declare class Dependency {
    key: Key;
    optional: boolean;
    lowerBoundVisibility: any;
    upperBoundVisibility: any;
    properties: any[];
    constructor(key: Key, optional: boolean, lowerBoundVisibility: any, upperBoundVisibility: any, properties: any[]);
    static fromKey(key: Key): Dependency;
}
/**
 * Describes how the {@link Injector} should instantiate a given token.
 *
 * See {@link bind}.
 *
 * ### Example ([live demo](http://plnkr.co/edit/GNAyj6K6PfYg2NBzgwZ5?p%3Dpreview&p=preview))
 *
 * ```javascript
 * var injector = Injector.resolveAndCreate([
 *   new Binding("message", { toValue: 'Hello' })
 * ]);
 *
 * expect(injector.get("message")).toEqual('Hello');
 * ```
 */
export declare class Binding {
    /**
     * Token used when retrieving this binding. Usually, it is a type {@link `Type`}.
     */
    token: any;
    /**
     * Binds a DI token to an implementation class.
     *
     * ### Example ([live demo](http://plnkr.co/edit/RSTG86qgmoxCyj9SWPwY?p=preview))
     *
     * Because `toAlias` and `toClass` are often confused, the example contains both use cases for
     * easy
     * comparison.
     *
     * ```typescript
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   new Binding(Vehicle, { toClass: Car })
     * ]);
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   new Binding(Vehicle, { toAlias: Car })
     * ]);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
    toClass: Type;
    /**
     * Binds a DI token to a value.
     *
     * ### Example ([live demo](http://plnkr.co/edit/UFVsMVQIDe7l4waWziES?p=preview))
     *
     * ```javascript
     * var injector = Injector.resolveAndCreate([
     *   new Binding("message", { toValue: 'Hello' })
     * ]);
     *
     * expect(injector.get("message")).toEqual('Hello');
     * ```
     */
    toValue: any;
    /**
     * Binds a DI token as an alias for an existing token.
     *
     * An alias means that {@link Injector} returns the same instance as if the alias token was used.
     * This is in contrast to `toClass` where a separate instance of `toClass` is returned.
     *
     * ### Example ([live demo](http://plnkr.co/edit/QsatsOJJ6P8T2fMe9gr8?p=preview))
     *
     * Because `toAlias` and `toClass` are often confused the example contains both use cases for easy
     * comparison.
     *
     * ```typescript
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   new Binding(Vehicle, { toAlias: Car })
     * ]);
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   new Binding(Vehicle, { toClass: Car })
     * ]);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
    toAlias: any;
    /**
     * Binds a DI token to a function which computes the value.
     *
     * ### Example ([live demo](http://plnkr.co/edit/Scoxy0pJNqKGAPZY1VVC?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   new Binding(Number, { toFactory: () => { return 1+2; }}),
     *   new Binding(String, { toFactory: (value) => { return "Value: " + value; },
     *                       deps: [Number] })
     * ]);
     *
     * expect(injector.get(Number)).toEqual(3);
     * expect(injector.get(String)).toEqual('Value: 3');
     * ```
     *
     * Used in conjuction with dependencies.
     */
    toFactory: Function;
    /**
     * Specifies a set of dependencies
     * (as `token`s) which should be injected into the factory function.
     *
     * ### Example ([live demo](http://plnkr.co/edit/Scoxy0pJNqKGAPZY1VVC?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   new Binding(Number, { toFactory: () => { return 1+2; }}),
     *   new Binding(String, { toFactory: (value) => { return "Value: " + value; },
     *                       deps: [Number] })
     * ]);
     *
     * expect(injector.get(Number)).toEqual(3);
     * expect(injector.get(String)).toEqual('Value: 3');
     * ```
     *
     * Used in conjunction with `toFactory`.
     */
    dependencies: Object[];
    _multi: boolean;
    constructor(token: any, {toClass, toValue, toAlias, toFactory, deps, multi}: {
        toClass?: Type;
        toValue?: any;
        toAlias?: any;
        toFactory?: Function;
        deps?: Object[];
        multi?: boolean;
    });
    /**
     * Creates multiple bindings matching the same token (a multi-binding).
     *
     * Multi-bindings are used for creating pluggable service, where the system comes
     * with some default bindings, and the user can register additonal bindings.
     * The combination of the default bindings and the additional bindings will be
     * used to drive the behavior of the system.
     *
     * ### Example
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   new Binding("Strings", { toValue: "String1", multi: true}),
     *   new Binding("Strings", { toValue: "String2", multi: true})
     * ]);
     *
     * expect(injector.get("Strings")).toEqual(["String1", "String2"]);
     * ```
     *
     * Multi-bindings and regular bindings cannot be mixed. The following
     * will throw an exception:
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   new Binding("Strings", { toValue: "String1", multi: true }),
     *   new Binding("Strings", { toValue: "String2"})
     * ]);
     * ```
     */
    multi: boolean;
}
/**
 * An internal resolved representation of a {@link Binding} used by the {@link Injector}.
 *
 * It is usually created automatically by `Injector.resolveAndCreate`.
 *
 * It can be created manually, as follows:
 *
 * ### Example ([live demo](http://plnkr.co/edit/RfEnhh8kUEI0G3qsnIeT?p%3Dpreview&p=preview))
 *
 * ```typescript
 * var resolvedBindings = Injector.resolve([new Binding('message', {toValue: 'Hello'})]);
 * var injector = Injector.fromResolvedBindings(resolvedBindings);
 *
 * expect(injector.get('message')).toEqual('Hello');
 * ```
 */
export declare class ResolvedBinding {
    /**
     * A key, usually a `Type`.
     */
    key: Key;
    /**
     * @private
     * Factory function which can return an instance of an object represented by a key.
     */
    resolvedFactories: ResolvedFactory[];
    /**
     * @private
     * Indicates if the binding is a multi-binding or a regular binding.
     */
    multiBinding: boolean;
    /**
     * @private
     */
    constructor(
        /**
         * A key, usually a `Type`.
         */
        key: Key, 
        /**
         * @private
         * Factory function which can return an instance of an object represented by a key.
         */
        resolvedFactories: ResolvedFactory[], 
        /**
         * @private
         * Indicates if the binding is a multi-binding or a regular binding.
         */
        multiBinding: boolean);
    /** @private */
    resolvedFactory: ResolvedFactory;
}
/**
 * @private
 * An internal resolved representation of a factory function created by resolving {@link Binding}.
 */
export declare class ResolvedFactory {
    /**
     * Factory function which can return an instance of an object represented by a key.
     */
    factory: Function;
    /**
     * Arguments (dependencies) to the `factory` function.
     */
    dependencies: Dependency[];
    constructor(
        /**
         * Factory function which can return an instance of an object represented by a key.
         */
        factory: Function, 
        /**
         * Arguments (dependencies) to the `factory` function.
         */
        dependencies: Dependency[]);
}
/**
 * Creates a {@link Binding}.
 *
 * To construct a {@link Binding}, bind a `token` to either a class, a value, a factory function, or
 * to an alias to another `token`.
 * See {@link BindingBuilder} for more details.
 *
 * The `token` is most commonly a class or {@link angular2/di/OpaqueToken}.
 */
export declare function bind(token: any): BindingBuilder;
/**
 * Helper class for the {@link bind} function.
 */
export declare class BindingBuilder {
    token: any;
    constructor(token: any);
    /**
     * Binds a DI token to a class.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ZpBCSYqv6e2ud5KXLdxQ?p=preview))
     *
     * Because `toAlias` and `toClass` are often confused, the example contains both use cases for
     * easy comparison.
     *
     * ```typescript
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   bind(Vehicle).toClass(Car)
     * ]);
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   bind(Vehicle).toAlias(Car)
     * ]);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
    toClass(type: Type): Binding;
    /**
     * Binds a DI token to a value.
     *
     * ### Example ([live demo](http://plnkr.co/edit/G024PFHmDL0cJFgfZK8O?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   bind('message').toValue('Hello')
     * ]);
     *
     * expect(injector.get('message')).toEqual('Hello');
     * ```
     */
    toValue(value: any): Binding;
    /**
     * Binds a DI token as an alias for an existing token.
     *
     * An alias means that we will return the same instance as if the alias token was used. (This is
     * in contrast to `toClass` where a separate instance of `toClass` will be returned.)
     *
     * ### Example ([live demo](http://plnkr.co/edit/uBaoF2pN5cfc5AfZapNw?p=preview))
     *
     * Because `toAlias` and `toClass` are often confused, the example contains both use cases for
     * easy
     * comparison.
     *
     * ```typescript
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   bind(Vehicle).toAlias(Car)
     * ]);
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   bind(Vehicle).toClass(Car)
     * ]);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
    toAlias(aliasToken: any): Binding;
    /**
     * Binds a DI token to a function which computes the value.
     *
     * ### Example ([live demo](http://plnkr.co/edit/OejNIfTT3zb1iBxaIYOb?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   bind(Number).toFactory(() => { return 1+2; }),
     *   bind(String).toFactory((v) => { return "Value: " + v; }, [Number])
     * ]);
     *
     * expect(injector.get(Number)).toEqual(3);
     * expect(injector.get(String)).toEqual('Value: 3');
     * ```
     */
    toFactory(factory: Function, dependencies?: any[]): Binding;
}
/**
 * Resolve a single binding.
 */
export declare function resolveFactory(binding: Binding): ResolvedFactory;
/**
 * Converts the {@link Binding} into {@link ResolvedBinding}.
 *
 * {@link Injector} internally only uses {@link ResolvedBinding}, {@link Binding} contains
 * convenience binding syntax.
 */
export declare function resolveBinding(binding: Binding): ResolvedBinding;
/**
 * Resolve a list of Bindings.
 */
export declare function resolveBindings(bindings: Array<Type | Binding | any[]>): ResolvedBinding[];
