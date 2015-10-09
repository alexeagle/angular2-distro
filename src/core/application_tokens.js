var di_1 = require('angular2/src/core/di');
var lang_1 = require('angular2/src/core/facade/lang');
/**
 *  @internal
 */
exports.APP_COMPONENT_REF_PROMISE = lang_1.CONST_EXPR(new di_1.OpaqueToken('Promise<ComponentRef>'));
/**
 * An {@link angular2/di/OpaqueToken} representing the application root type in the {@link
 * Injector}.
 *
 * ```
 * @Component(...)
 * @View(...)
 * class MyApp {
 *   ...
 * }
 *
 * bootstrap(MyApp).then((appRef:ApplicationRef) {
 *   expect(appRef.injector.get(appComponentTypeToken)).toEqual(MyApp);
 * });
 *
 * ```
 */
exports.APP_COMPONENT = lang_1.CONST_EXPR(new di_1.OpaqueToken('AppComponent'));
/**
 * A DI Token representing a unique string id assigned to the application by Angular and used
 * primarily for prefixing application attributes and CSS styles when
 * {@link ViewEncapsulation#Emulated} is being used.
 *
 * If you need to avoid randomly generated value to be used as an application id, you can provide
 * a custom value via a DI binding <!-- TODO: provider --> configuring the root {@link Injector}
 * using this token.
 */
exports.APP_ID = lang_1.CONST_EXPR(new di_1.OpaqueToken('AppId'));
function _appIdRandomBindingFactory() {
    return "" + _randomChar() + _randomChar() + _randomChar();
}
/**
 * Bindings that will generate a random APP_ID_TOKEN.
 */
exports.APP_ID_RANDOM_BINDING = lang_1.CONST_EXPR(new di_1.Binding(exports.APP_ID, { toFactory: _appIdRandomBindingFactory, deps: [] }));
function _randomChar() {
    return lang_1.StringWrapper.fromCharCode(97 + lang_1.Math.floor(lang_1.Math.random() * 25));
}
//# sourceMappingURL=application_tokens.js.map