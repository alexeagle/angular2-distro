import { Binding } from 'angular2/src/core/di';
import { Injector } from 'angular2/src/core/di';
import { Type } from 'angular2/src/core/facade/lang';
export declare function createTestInjector(bindings: Array<Type | Binding | any[]>): Injector;
/**
 * Allows injecting dependencies in `beforeEach()` and `it()`.
 *
 * Example:
 *
 * ```
 * beforeEach(inject([Dependency, AClass], (dep, object) => {
 *   // some code that uses `dep` and `object`
 *   // ...
 * }));
 *
 * it('...', inject([AClass, AsyncTestCompleter], (object, async) => {
 *   object.doSomething().then(() => {
 *     expect(...);
 *     async.done();
 *   });
 * })
 * ```
 *
 * Notes:
 * - injecting an `AsyncTestCompleter` allow completing async tests - this is the equivalent of
 *   adding a `done` parameter in Jasmine,
 * - inject is currently a function because of some Traceur limitation the syntax should eventually
 *   becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
 *
 * @param {Array} tokens
 * @param {Function} fn
 * @return {FunctionWithParamTokens}
 */
export declare function inject(tokens: any[], fn: Function): FunctionWithParamTokens;
export declare class FunctionWithParamTokens {
    private _tokens;
    private _fn;
    constructor(_tokens: any[], _fn: Function);
    /**
     * Returns the value of the executed function.
     */
    execute(injector: Injector): any;
    hasToken(token: any): boolean;
}
