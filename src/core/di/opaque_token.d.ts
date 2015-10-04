/**
 * Creates a token that can be used in a DI Binding.
 *
 * ### Example ([live demo](http://plnkr.co/edit/Ys9ezXpj2Mnoy3Uc8KBp?p=preview))
 *
 * ```typescript
 * var t = new OpaqueToken("binding");
 *
 * var injector = Injector.resolveAndCreate([
 *   bind(t).toValue("bindingValue")
 * ]);
 *
 * expect(injector.get(t)).toEqual("bindingValue");
 * ```
 *
 * Using an `OpaqueToken` is preferable to using strings as tokens because of possible collisions
 * caused by multiple bindings using the same string as two different tokens.
 *
 * Using an `OpaqueToken` is preferable to using an `Object` as tokens because it provides better
 * error messages.
 */
export declare class OpaqueToken {
    private _desc;
    constructor(_desc: string);
    toString(): string;
}
