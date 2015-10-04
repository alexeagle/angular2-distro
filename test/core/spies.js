var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var change_detection_1 = require('angular2/src/core/change_detection/change_detection');
var api_1 = require('angular2/src/core/render/api');
var directive_resolver_1 = require('angular2/src/core/linker/directive_resolver');
var view_1 = require('angular2/src/core/linker/view');
var element_ref_1 = require('angular2/src/core/linker/element_ref');
var view_manager_1 = require('angular2/src/core/linker/view_manager');
var view_pool_1 = require('angular2/src/core/linker/view_pool');
var view_listener_1 = require('angular2/src/core/linker/view_listener');
var proto_view_factory_1 = require('angular2/src/core/linker/proto_view_factory');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
var xhr_1 = require('angular2/src/core/compiler/xhr');
var element_injector_1 = require('angular2/src/core/linker/element_injector');
var test_lib_1 = require('angular2/test_lib');
var SpyDependencyProvider = (function (_super) {
    __extends(SpyDependencyProvider, _super);
    function SpyDependencyProvider() {
        _super.apply(this, arguments);
    }
    return SpyDependencyProvider;
})(test_lib_1.SpyObject);
exports.SpyDependencyProvider = SpyDependencyProvider;
var SpyChangeDetector = (function (_super) {
    __extends(SpyChangeDetector, _super);
    function SpyChangeDetector() {
        _super.call(this, change_detection_1.DynamicChangeDetector);
    }
    return SpyChangeDetector;
})(test_lib_1.SpyObject);
exports.SpyChangeDetector = SpyChangeDetector;
var SpyChangeDispatcher = (function (_super) {
    __extends(SpyChangeDispatcher, _super);
    function SpyChangeDispatcher() {
        _super.apply(this, arguments);
    }
    return SpyChangeDispatcher;
})(test_lib_1.SpyObject);
exports.SpyChangeDispatcher = SpyChangeDispatcher;
var SpyIterableDifferFactory = (function (_super) {
    __extends(SpyIterableDifferFactory, _super);
    function SpyIterableDifferFactory() {
        _super.apply(this, arguments);
    }
    return SpyIterableDifferFactory;
})(test_lib_1.SpyObject);
exports.SpyIterableDifferFactory = SpyIterableDifferFactory;
var SpyDirectiveResolver = (function (_super) {
    __extends(SpyDirectiveResolver, _super);
    function SpyDirectiveResolver() {
        _super.call(this, directive_resolver_1.DirectiveResolver);
    }
    return SpyDirectiveResolver;
})(test_lib_1.SpyObject);
exports.SpyDirectiveResolver = SpyDirectiveResolver;
var SpyView = (function (_super) {
    __extends(SpyView, _super);
    function SpyView() {
        _super.call(this, view_1.AppView);
    }
    return SpyView;
})(test_lib_1.SpyObject);
exports.SpyView = SpyView;
var SpyElementRef = (function (_super) {
    __extends(SpyElementRef, _super);
    function SpyElementRef() {
        _super.call(this, element_ref_1.ElementRef);
    }
    return SpyElementRef;
})(test_lib_1.SpyObject);
exports.SpyElementRef = SpyElementRef;
var SpyAppViewManager = (function (_super) {
    __extends(SpyAppViewManager, _super);
    function SpyAppViewManager() {
        _super.call(this, view_manager_1.AppViewManager);
    }
    return SpyAppViewManager;
})(test_lib_1.SpyObject);
exports.SpyAppViewManager = SpyAppViewManager;
var SpyRenderer = (function (_super) {
    __extends(SpyRenderer, _super);
    function SpyRenderer() {
        _super.call(this, api_1.Renderer);
    }
    return SpyRenderer;
})(test_lib_1.SpyObject);
exports.SpyRenderer = SpyRenderer;
var SpyAppViewPool = (function (_super) {
    __extends(SpyAppViewPool, _super);
    function SpyAppViewPool() {
        _super.call(this, view_pool_1.AppViewPool);
    }
    return SpyAppViewPool;
})(test_lib_1.SpyObject);
exports.SpyAppViewPool = SpyAppViewPool;
var SpyAppViewListener = (function (_super) {
    __extends(SpyAppViewListener, _super);
    function SpyAppViewListener() {
        _super.call(this, view_listener_1.AppViewListener);
    }
    return SpyAppViewListener;
})(test_lib_1.SpyObject);
exports.SpyAppViewListener = SpyAppViewListener;
var SpyProtoViewFactory = (function (_super) {
    __extends(SpyProtoViewFactory, _super);
    function SpyProtoViewFactory() {
        _super.call(this, proto_view_factory_1.ProtoViewFactory);
    }
    return SpyProtoViewFactory;
})(test_lib_1.SpyObject);
exports.SpyProtoViewFactory = SpyProtoViewFactory;
var SpyProtoElementInjector = (function (_super) {
    __extends(SpyProtoElementInjector, _super);
    function SpyProtoElementInjector() {
        _super.call(this, element_injector_1.ProtoElementInjector);
    }
    return SpyProtoElementInjector;
})(test_lib_1.SpyObject);
exports.SpyProtoElementInjector = SpyProtoElementInjector;
var SpyElementInjector = (function (_super) {
    __extends(SpyElementInjector, _super);
    function SpyElementInjector() {
        _super.call(this, element_injector_1.ElementInjector);
    }
    return SpyElementInjector;
})(test_lib_1.SpyObject);
exports.SpyElementInjector = SpyElementInjector;
var SpyPreBuiltObjects = (function (_super) {
    __extends(SpyPreBuiltObjects, _super);
    function SpyPreBuiltObjects() {
        _super.call(this, element_injector_1.PreBuiltObjects);
    }
    return SpyPreBuiltObjects;
})(test_lib_1.SpyObject);
exports.SpyPreBuiltObjects = SpyPreBuiltObjects;
var SpyDomAdapter = (function (_super) {
    __extends(SpyDomAdapter, _super);
    function SpyDomAdapter() {
        _super.call(this, dom_adapter_1.DomAdapter);
    }
    return SpyDomAdapter;
})(test_lib_1.SpyObject);
exports.SpyDomAdapter = SpyDomAdapter;
var SpyXHR = (function (_super) {
    __extends(SpyXHR, _super);
    function SpyXHR() {
        _super.call(this, xhr_1.XHR);
    }
    return SpyXHR;
})(test_lib_1.SpyObject);
exports.SpyXHR = SpyXHR;
var SpyRenderEventDispatcher = (function (_super) {
    __extends(SpyRenderEventDispatcher, _super);
    function SpyRenderEventDispatcher() {
        // Note: RenderEventDispatcher is an interface,
        // so we can't pass it to super() and have to register
        // the spy methods on our own.
        _super.call(this);
        this.spy('dispatchRenderEvent');
    }
    return SpyRenderEventDispatcher;
})(test_lib_1.SpyObject);
exports.SpyRenderEventDispatcher = SpyRenderEventDispatcher;
var SpyNgControl = (function (_super) {
    __extends(SpyNgControl, _super);
    function SpyNgControl() {
        _super.apply(this, arguments);
    }
    return SpyNgControl;
})(test_lib_1.SpyObject);
exports.SpyNgControl = SpyNgControl;
var SpyValueAccessor = (function (_super) {
    __extends(SpyValueAccessor, _super);
    function SpyValueAccessor() {
        _super.apply(this, arguments);
    }
    return SpyValueAccessor;
})(test_lib_1.SpyObject);
exports.SpyValueAccessor = SpyValueAccessor;
//# sourceMappingURL=spies.js.map