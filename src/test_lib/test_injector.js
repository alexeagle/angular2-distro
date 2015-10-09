var di_1 = require('angular2/src/core/di');
var pipes_1 = require('angular2/src/core/pipes');
var animation_builder_1 = require('angular2/src/animate/animation_builder');
var animation_builder_mock_1 = require('angular2/src/mock/animation_builder_mock');
var proto_view_factory_1 = require('angular2/src/core/linker/proto_view_factory');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var change_detection_1 = require('angular2/src/core/change_detection/change_detection');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var view_resolver_1 = require('angular2/src/core/linker/view_resolver');
var directive_resolver_1 = require('angular2/src/core/linker/directive_resolver');
var pipe_resolver_1 = require('angular2/src/core/linker/pipe_resolver');
var dynamic_component_loader_1 = require('angular2/src/core/linker/dynamic_component_loader');
var xhr_1 = require('angular2/src/core/compiler/xhr');
var ng_zone_1 = require('angular2/src/core/zone/ng_zone');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
var event_manager_1 = require('angular2/src/core/render/dom/events/event_manager');
var directive_resolver_mock_1 = require('angular2/src/mock/directive_resolver_mock');
var view_resolver_mock_1 = require('angular2/src/mock/view_resolver_mock');
var xhr_mock_1 = require('angular2/src/core/compiler/xhr_mock');
var mock_location_strategy_1 = require('angular2/src/mock/mock_location_strategy');
var location_strategy_1 = require('angular2/src/router/location_strategy');
var ng_zone_mock_1 = require('angular2/src/mock/ng_zone_mock');
var test_component_builder_1 = require('./test_component_builder');
var di_2 = require('angular2/src/core/di');
var debug_1 = require('angular2/src/core/debug');
var collection_1 = require('angular2/src/core/facade/collection');
var lang_1 = require('angular2/src/core/facade/lang');
var view_pool_1 = require('angular2/src/core/linker/view_pool');
var view_manager_1 = require('angular2/src/core/linker/view_manager');
var view_manager_utils_1 = require('angular2/src/core/linker/view_manager_utils');
var api_1 = require('angular2/src/core/render/api');
var render_1 = require('angular2/src/core/render/render');
var application_tokens_1 = require('angular2/src/core/application_tokens');
var serializer_1 = require("angular2/src/web_workers/shared/serializer");
var utils_1 = require('./utils');
var compiler_1 = require('angular2/src/core/compiler/compiler');
var dom_renderer_1 = require("angular2/src/core/render/dom/dom_renderer");
var dynamic_component_loader_2 = require("angular2/src/core/linker/dynamic_component_loader");
var view_manager_2 = require("angular2/src/core/linker/view_manager");
/**
 * Returns the root injector bindings.
 *
 * This must be kept in sync with the _rootBindings in application.js
 *
 * @returns {any[]}
 */
function _getRootBindings() {
    return [
        di_1.bind(reflection_1.Reflector)
            .toValue(reflection_1.reflector),
    ];
}
/**
 * Returns the application injector bindings.
 *
 * This must be kept in sync with _injectorBindings() in application.js
 *
 * @returns {any[]}
 */
function _getAppBindings() {
    var appDoc;
    // The document is only available in browser environment
    try {
        appDoc = dom_adapter_1.DOM.defaultDoc();
    }
    catch (e) {
        appDoc = null;
    }
    return [
        compiler_1.compilerBindings(),
        di_1.bind(change_detection_1.ChangeDetectorGenConfig).toValue(new change_detection_1.ChangeDetectorGenConfig(true, true, false, true)),
        di_1.bind(render_1.DOCUMENT).toValue(appDoc),
        di_1.bind(render_1.DomRenderer).toClass(dom_renderer_1.DomRenderer_),
        di_1.bind(api_1.Renderer).toAlias(render_1.DomRenderer),
        di_1.bind(application_tokens_1.APP_ID).toValue('a'),
        render_1.DomSharedStylesHost,
        di_1.bind(render_1.SharedStylesHost).toAlias(render_1.DomSharedStylesHost),
        view_pool_1.AppViewPool,
        di_1.bind(view_manager_1.AppViewManager).toClass(view_manager_2.AppViewManager_),
        view_manager_utils_1.AppViewManagerUtils,
        serializer_1.Serializer,
        debug_1.ELEMENT_PROBE_BINDINGS,
        di_1.bind(view_pool_1.APP_VIEW_POOL_CAPACITY).toValue(500),
        proto_view_factory_1.ProtoViewFactory,
        di_1.bind(directive_resolver_1.DirectiveResolver).toClass(directive_resolver_mock_1.MockDirectiveResolver),
        di_1.bind(view_resolver_1.ViewResolver).toClass(view_resolver_mock_1.MockViewResolver),
        pipes_1.DEFAULT_PIPES,
        di_1.bind(change_detection_1.IterableDiffers).toValue(change_detection_1.defaultIterableDiffers),
        di_1.bind(change_detection_1.KeyValueDiffers).toValue(change_detection_1.defaultKeyValueDiffers),
        utils_1.Log,
        di_1.bind(dynamic_component_loader_1.DynamicComponentLoader).toClass(dynamic_component_loader_2.DynamicComponentLoader_),
        pipe_resolver_1.PipeResolver,
        di_1.bind(exceptions_1.ExceptionHandler).toValue(new exceptions_1.ExceptionHandler(dom_adapter_1.DOM)),
        di_1.bind(location_strategy_1.LocationStrategy).toClass(mock_location_strategy_1.MockLocationStrategy),
        di_1.bind(xhr_1.XHR).toClass(xhr_mock_1.MockXHR),
        test_component_builder_1.TestComponentBuilder,
        di_1.bind(ng_zone_1.NgZone).toClass(ng_zone_mock_1.MockNgZone),
        di_1.bind(animation_builder_1.AnimationBuilder).toClass(animation_builder_mock_1.MockAnimationBuilder),
        event_manager_1.EventManager,
        new di_1.Binding(event_manager_1.EVENT_MANAGER_PLUGINS, { toClass: event_manager_1.DomEventsPlugin, multi: true })
    ];
}
function createTestInjector(bindings) {
    var rootInjector = di_2.Injector.resolveAndCreate(_getRootBindings());
    return rootInjector.resolveAndCreateChild(collection_1.ListWrapper.concat(_getAppBindings(), bindings));
}
exports.createTestInjector = createTestInjector;
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
function inject(tokens, fn) {
    return new FunctionWithParamTokens(tokens, fn);
}
exports.inject = inject;
var FunctionWithParamTokens = (function () {
    function FunctionWithParamTokens(_tokens, _fn) {
        this._tokens = _tokens;
        this._fn = _fn;
    }
    /**
     * Returns the value of the executed function.
     */
    FunctionWithParamTokens.prototype.execute = function (injector) {
        var params = this._tokens.map(function (t) { return injector.get(t); });
        return lang_1.FunctionWrapper.apply(this._fn, params);
    };
    FunctionWithParamTokens.prototype.hasToken = function (token) { return this._tokens.indexOf(token) > -1; };
    return FunctionWithParamTokens;
})();
exports.FunctionWithParamTokens = FunctionWithParamTokens;
//# sourceMappingURL=test_injector.js.map