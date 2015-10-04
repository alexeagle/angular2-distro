var di_1 = require('angular2/src/core/di');
var forms_1 = require('angular2/src/core/forms');
var lang_1 = require('angular2/src/core/facade/lang');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var async_1 = require('angular2/src/core/facade/async');
var xhr_1 = require('angular2/src/core/compiler/xhr');
var xhr_impl_1 = require('angular2/src/web_workers/worker/xhr_impl');
var app_root_url_1 = require('angular2/src/core/compiler/app_root_url');
var renderer_1 = require('./renderer');
var api_1 = require('angular2/src/core/render/api');
var client_message_broker_1 = require('angular2/src/web_workers/shared/client_message_broker');
var message_bus_1 = require('angular2/src/web_workers/shared/message_bus');
var application_ref_1 = require('angular2/src/core/application_ref');
var serializer_1 = require("angular2/src/web_workers/shared/serializer");
var api_2 = require("angular2/src/web_workers/shared/api");
var render_proto_view_ref_store_1 = require('angular2/src/web_workers/shared/render_proto_view_ref_store');
var render_view_with_fragments_store_1 = require('angular2/src/web_workers/shared/render_view_with_fragments_store');
var async_2 = require('angular2/src/core/facade/async');
var messaging_api_1 = require('angular2/src/web_workers/shared/messaging_api');
var event_dispatcher_1 = require('angular2/src/web_workers/worker/event_dispatcher');
var compiler_1 = require('angular2/src/core/compiler/compiler');
/**
 * Initialize the Angular 'platform' on the page in a manner suitable for applications
 * running in a web worker. Applications running on a web worker do not have direct
 * access to DOM APIs.
 *
 * See {@link PlatformRef} for details on the Angular platform.
 *
 * # Without specified bindings
 *
 * If no bindings are specified, `platform`'s behavior depends on whether an existing
 * platform exists:
 *
 * If no platform exists, a new one will be created with the default {@link platformBindings}.
 *
 * If a platform already exists, it will be returned (regardless of what bindings it
 * was created with). This is a convenience feature, allowing for multiple applications
 * to be loaded into the same platform without awareness of each other.
 *
 * # With specified bindings
 *
 * It is also possible to specify bindings to be made in the new platform. These bindings
 * will be shared between all applications on the page. For example, an abstraction for
 * the browser cookie jar should be bound at the platform level, because there is only one
 * cookie jar regardless of how many applications on the age will be accessing it.
 *
 * If bindings are specified directly, `platform` will create the Angular platform with
 * them if a platform did not exist already. If it did exist, however, an error will be
 * thrown.
 *
 * # For Web Worker Appplications
 *
 * This version of `platform` initializes Angular for use with applications
 * that do not directly touch the DOM, such as applications which run in a
 * web worker context. Applications that need direct access to the DOM should
 * use `platform` from `core/application_common` instead.
 */
function platform(bindings) {
    return application_ref_1.platformCommon(bindings);
}
exports.platform = platform;
var PrintLogger = (function () {
    function PrintLogger() {
        this.log = lang_1.print;
        this.logError = lang_1.print;
        this.logGroup = lang_1.print;
    }
    PrintLogger.prototype.logGroupEnd = function () { };
    return PrintLogger;
})();
function webWorkerBindings(appComponentType, bus, initData) {
    return [
        compiler_1.compilerBindings(),
        serializer_1.Serializer,
        di_1.bind(message_bus_1.MessageBus).toValue(bus),
        client_message_broker_1.ClientMessageBrokerFactory,
        renderer_1.WebWorkerRenderer,
        di_1.bind(api_1.Renderer).toAlias(renderer_1.WebWorkerRenderer),
        di_1.bind(api_2.ON_WEB_WORKER).toValue(true),
        render_view_with_fragments_store_1.RenderViewWithFragmentsStore,
        render_proto_view_ref_store_1.RenderProtoViewRefStore,
        di_1.bind(exceptions_1.ExceptionHandler).toFactory(function () { return new exceptions_1.ExceptionHandler(new PrintLogger()); }, []),
        xhr_impl_1.WebWorkerXHRImpl,
        di_1.bind(xhr_1.XHR).toAlias(xhr_impl_1.WebWorkerXHRImpl),
        di_1.bind(app_root_url_1.AppRootUrl).toValue(new app_root_url_1.AppRootUrl(initData['rootUrl'])),
        event_dispatcher_1.WebWorkerEventDispatcher,
        forms_1.FORM_BINDINGS
    ];
}
function bootstrapWebWorkerCommon(appComponentType, bus, appBindings) {
    if (appBindings === void 0) { appBindings = null; }
    var bootstrapProcess = async_1.PromiseWrapper.completer();
    var appPromise = platform().asyncApplication(function (zone) {
        // TODO(rado): prepopulate template cache, so applications with only
        // index.html and main.js are possible.
        //
        bus.attachToZone(zone);
        bus.initChannel(messaging_api_1.SETUP_CHANNEL, false);
        var subscription;
        var emitter = bus.from(messaging_api_1.SETUP_CHANNEL);
        subscription = async_2.ObservableWrapper.subscribe(emitter, function (message) {
            var bindings = [application_ref_1.applicationCommonBindings(), webWorkerBindings(appComponentType, bus, message)];
            if (lang_1.isPresent(appBindings)) {
                bindings.push(appBindings);
            }
            bootstrapProcess.resolve(bindings);
            async_2.ObservableWrapper.dispose(subscription);
        });
        async_2.ObservableWrapper.callNext(bus.to(messaging_api_1.SETUP_CHANNEL), "ready");
        return bootstrapProcess.promise;
    });
    return async_1.PromiseWrapper.then(appPromise, function (app) { return app.bootstrap(appComponentType); });
}
exports.bootstrapWebWorkerCommon = bootstrapWebWorkerCommon;
//# sourceMappingURL=application_common.js.map