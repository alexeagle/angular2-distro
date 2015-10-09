var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ng_zone_1 = require('angular2/src/core/zone/ng_zone');
var lang_1 = require('angular2/src/core/facade/lang');
var di_1 = require('angular2/src/core/di');
var application_tokens_1 = require('./application_tokens');
var async_1 = require('angular2/src/core/facade/async');
var collection_1 = require('angular2/src/core/facade/collection');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var testability_1 = require('angular2/src/core/testability/testability');
var dynamic_component_loader_1 = require('angular2/src/core/linker/dynamic_component_loader');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
var view_ref_1 = require('angular2/src/core/linker/view_ref');
var life_cycle_1 = require('angular2/src/core/life_cycle/life_cycle');
var change_detection_1 = require('angular2/src/core/change_detection/change_detection');
var view_pool_1 = require('angular2/src/core/linker/view_pool');
var view_manager_1 = require('angular2/src/core/linker/view_manager');
var view_manager_utils_1 = require('angular2/src/core/linker/view_manager_utils');
var view_listener_1 = require('angular2/src/core/linker/view_listener');
var proto_view_factory_1 = require('./linker/proto_view_factory');
var pipes_1 = require('angular2/src/core/pipes');
var view_resolver_1 = require('./linker/view_resolver');
var directive_resolver_1 = require('./linker/directive_resolver');
var pipe_resolver_1 = require('./linker/pipe_resolver');
var compiler_1 = require('angular2/src/core/linker/compiler');
var dynamic_component_loader_2 = require("./linker/dynamic_component_loader");
var view_manager_2 = require("./linker/view_manager");
var compiler_2 = require("./linker/compiler");
/**
 * Constructs the set of bindings meant for use at the platform level.
 *
 * These are bindings that should be singletons shared among all Angular applications
 * running on the page.
 */
function platformBindings() {
    return [di_1.bind(reflection_1.Reflector).toValue(reflection_1.reflector), testability_1.TestabilityRegistry];
}
exports.platformBindings = platformBindings;
/**
 * Construct bindings specific to an individual root component.
 */
function _componentBindings(appComponentType) {
    return [
        di_1.bind(application_tokens_1.APP_COMPONENT)
            .toValue(appComponentType),
        di_1.bind(application_tokens_1.APP_COMPONENT_REF_PROMISE)
            .toFactory(function (dynamicComponentLoader, injector) {
            // TODO(rado): investigate whether to support bindings on root component.
            return dynamicComponentLoader.loadAsRoot(appComponentType, null, injector)
                .then(function (componentRef) {
                if (lang_1.isPresent(componentRef.location.nativeElement)) {
                    injector.get(testability_1.TestabilityRegistry)
                        .registerApplication(componentRef.location.nativeElement, injector.get(testability_1.Testability));
                }
                return componentRef;
            });
        }, [dynamic_component_loader_1.DynamicComponentLoader, di_1.Injector]),
        di_1.bind(appComponentType)
            .toFactory(function (p) { return p.then(function (ref) { return ref.instance; }); }, [application_tokens_1.APP_COMPONENT_REF_PROMISE]),
    ];
}
/**
 * Construct a default set of bindings which should be included in any Angular
 * application, regardless of whether it runs on the UI thread or in a web worker.
 */
function applicationCommonBindings() {
    return [
        di_1.bind(compiler_1.Compiler)
            .toClass(compiler_2.Compiler_),
        application_tokens_1.APP_ID_RANDOM_BINDING,
        view_pool_1.AppViewPool,
        di_1.bind(view_pool_1.APP_VIEW_POOL_CAPACITY).toValue(10000),
        di_1.bind(view_manager_1.AppViewManager).toClass(view_manager_2.AppViewManager_),
        view_manager_utils_1.AppViewManagerUtils,
        view_listener_1.AppViewListener,
        proto_view_factory_1.ProtoViewFactory,
        view_resolver_1.ViewResolver,
        pipes_1.DEFAULT_PIPES,
        di_1.bind(change_detection_1.IterableDiffers).toValue(change_detection_1.defaultIterableDiffers),
        di_1.bind(change_detection_1.KeyValueDiffers).toValue(change_detection_1.defaultKeyValueDiffers),
        directive_resolver_1.DirectiveResolver,
        pipe_resolver_1.PipeResolver,
        di_1.bind(dynamic_component_loader_1.DynamicComponentLoader).toClass(dynamic_component_loader_2.DynamicComponentLoader_),
        di_1.bind(life_cycle_1.LifeCycle).toFactory(function (exceptionHandler) { return new life_cycle_1.LifeCycle_(null, lang_1.assertionsEnabled()); }, [exceptions_1.ExceptionHandler]),
    ];
}
exports.applicationCommonBindings = applicationCommonBindings;
/**
 * Create an Angular zone.
 */
function createNgZone() {
    return new ng_zone_1.NgZone({ enableLongStackTrace: lang_1.assertionsEnabled() });
}
exports.createNgZone = createNgZone;
var _platform;
/**
 * FIXME(alexeagle): make internal
 */
function platformCommon(bindings, initializer) {
    if (lang_1.isPresent(_platform)) {
        if (lang_1.isBlank(bindings)) {
            return _platform;
        }
        throw "platform() can only be called once per page";
    }
    if (lang_1.isPresent(initializer)) {
        initializer();
    }
    if (lang_1.isBlank(bindings)) {
        bindings = platformBindings();
    }
    _platform = new PlatformRef_(di_1.Injector.resolveAndCreate(bindings), function () { _platform = null; });
    return _platform;
}
exports.platformCommon = platformCommon;
/**
 * The Angular platform is the entry point for Angular on a web page. Each page
 * has exactly one platform, and services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 *
 * A page's platform is initialized implicitly when {@link bootstrap}() is called, or
 * explicitly by calling {@link platform}().
 */
var PlatformRef = (function () {
    function PlatformRef() {
    }
    Object.defineProperty(PlatformRef.prototype, "injector", {
        /**
         * Retrieve the platform {@link Injector}, which is the parent injector for
         * every Angular application on the page and provides singleton bindings.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    return PlatformRef;
})();
exports.PlatformRef = PlatformRef;
var PlatformRef_ = (function (_super) {
    __extends(PlatformRef_, _super);
    function PlatformRef_(_injector, _dispose) {
        _super.call(this);
        this._injector = _injector;
        this._dispose = _dispose;
        this._applications = [];
    }
    Object.defineProperty(PlatformRef_.prototype, "injector", {
        get: function () { return this._injector; },
        enumerable: true,
        configurable: true
    });
    PlatformRef_.prototype.application = function (bindings) {
        var app = this._initApp(createNgZone(), bindings);
        return app;
    };
    PlatformRef_.prototype.asyncApplication = function (bindingFn) {
        var _this = this;
        var zone = createNgZone();
        var completer = async_1.PromiseWrapper.completer();
        zone.run(function () {
            async_1.PromiseWrapper.then(bindingFn(zone), function (bindings) {
                completer.resolve(_this._initApp(zone, bindings));
            });
        });
        return completer.promise;
    };
    PlatformRef_.prototype._initApp = function (zone, bindings) {
        var _this = this;
        var injector;
        zone.run(function () {
            bindings.push(di_1.bind(ng_zone_1.NgZone).toValue(zone));
            bindings.push(di_1.bind(ApplicationRef).toValue(_this));
            var exceptionHandler;
            try {
                injector = _this.injector.resolveAndCreateChild(bindings);
                exceptionHandler = injector.get(exceptions_1.ExceptionHandler);
                zone.overrideOnErrorHandler(function (e, s) { return exceptionHandler.call(e, s); });
            }
            catch (e) {
                if (lang_1.isPresent(exceptionHandler)) {
                    exceptionHandler.call(e, e.stack);
                }
                else {
                    dom_adapter_1.DOM.logError(e);
                }
            }
        });
        var app = new ApplicationRef_(this, zone, injector);
        this._applications.push(app);
        return app;
    };
    PlatformRef_.prototype.dispose = function () {
        this._applications.forEach(function (app) { return app.dispose(); });
        this._dispose();
    };
    PlatformRef_.prototype._applicationDisposed = function (app) { collection_1.ListWrapper.remove(this._applications, app); };
    return PlatformRef_;
})(PlatformRef);
exports.PlatformRef_ = PlatformRef_;
/**
 * A reference to an Angular application running on a page.
 *
 * For more about Angular applications, see the documentation for {@link bootstrap}.
 */
var ApplicationRef = (function () {
    function ApplicationRef() {
    }
    Object.defineProperty(ApplicationRef.prototype, "injector", {
        /**
         * Retrieve the application {@link Injector}.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ApplicationRef.prototype, "zone", {
        /**
         * Retrieve the application {@link NgZone}.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    return ApplicationRef;
})();
exports.ApplicationRef = ApplicationRef;
var ApplicationRef_ = (function (_super) {
    __extends(ApplicationRef_, _super);
    function ApplicationRef_(_platform, _zone, _injector) {
        _super.call(this);
        this._platform = _platform;
        this._zone = _zone;
        this._injector = _injector;
        this._bootstrapListeners = [];
        this._rootComponents = [];
    }
    ApplicationRef_.prototype.registerBootstrapListener = function (listener) {
        this._bootstrapListeners.push(listener);
    };
    ApplicationRef_.prototype.bootstrap = function (componentType, bindings) {
        var _this = this;
        var completer = async_1.PromiseWrapper.completer();
        this._zone.run(function () {
            var componentBindings = _componentBindings(componentType);
            if (lang_1.isPresent(bindings)) {
                componentBindings.push(bindings);
            }
            var exceptionHandler = _this._injector.get(exceptions_1.ExceptionHandler);
            try {
                var injector = _this._injector.resolveAndCreateChild(componentBindings);
                var compRefToken = injector.get(application_tokens_1.APP_COMPONENT_REF_PROMISE);
                var tick = function (componentRef) {
                    var appChangeDetector = view_ref_1.internalView(componentRef.hostView).changeDetector;
                    var lc = injector.get(life_cycle_1.LifeCycle);
                    lc.registerWith(_this._zone, appChangeDetector);
                    lc.tick();
                    completer.resolve(componentRef);
                    _this._rootComponents.push(componentRef);
                    _this._bootstrapListeners.forEach(function (listener) { return listener(componentRef); });
                };
                var tickResult = async_1.PromiseWrapper.then(compRefToken, tick);
                async_1.PromiseWrapper.then(tickResult, function (_) { });
                async_1.PromiseWrapper.then(tickResult, null, function (err, stackTrace) { return completer.reject(err, stackTrace); });
            }
            catch (e) {
                exceptionHandler.call(e, e.stack);
                completer.reject(e, e.stack);
            }
        });
        return completer.promise;
    };
    Object.defineProperty(ApplicationRef_.prototype, "injector", {
        get: function () { return this._injector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationRef_.prototype, "zone", {
        get: function () { return this._zone; },
        enumerable: true,
        configurable: true
    });
    ApplicationRef_.prototype.dispose = function () {
        // TODO(alxhub): Dispose of the NgZone.
        this._rootComponents.forEach(function (ref) { return ref.dispose(); });
        this._platform._applicationDisposed(this);
    };
    return ApplicationRef_;
})(ApplicationRef);
exports.ApplicationRef_ = ApplicationRef_;
//# sourceMappingURL=application_ref.js.map