var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var di_1 = require('angular2/src/core/di');
var lang_1 = require('angular2/src/core/facade/lang');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var view_ref_1 = require('./view_ref');
var api_1 = require('angular2/src/core/render/api');
var view_manager_utils_1 = require('./view_manager_utils');
var view_pool_1 = require('./view_pool');
var view_listener_1 = require('./view_listener');
var profile_1 = require('../profile/profile');
var proto_view_factory_1 = require('./proto_view_factory');
/**
 * Service exposing low level API for creating, moving and destroying Views.
 *
 * Most applications should use higher-level abstractions like {@link DynamicComponentLoader} and
 * {@link ViewContainerRef} instead.
 */
var AppViewManager = (function () {
    /**
     * @private
     */
    function AppViewManager(_viewPool, _viewListener, _utils, _renderer, _protoViewFactory) {
        this._viewPool = _viewPool;
        this._viewListener = _viewListener;
        this._utils = _utils;
        this._renderer = _renderer;
        this._createRootHostViewScope = profile_1.wtfCreateScope('AppViewManager#createRootHostView()');
        this._destroyRootHostViewScope = profile_1.wtfCreateScope('AppViewManager#destroyRootHostView()');
        this._createEmbeddedViewInContainerScope = profile_1.wtfCreateScope('AppViewManager#createEmbeddedViewInContainer()');
        this._createHostViewInContainerScope = profile_1.wtfCreateScope('AppViewManager#createHostViewInContainer()');
        this._destroyViewInContainerScope = profile_1.wtfCreateScope('AppViewMananger#destroyViewInContainer()');
        this._attachViewInContainerScope = profile_1.wtfCreateScope('AppViewMananger#attachViewInContainer()');
        this._detachViewInContainerScope = profile_1.wtfCreateScope('AppViewMananger#detachViewInContainer()');
        this._protoViewFactory = _protoViewFactory;
    }
    /**
     * Returns a {@link ViewContainerRef} of the View Container at the specified location.
     */
    AppViewManager.prototype.getViewContainer = function (location) {
        var hostView = view_ref_1.internalView(location.parentView);
        return hostView.elementInjectors[location.boundElementIndex].getViewContainerRef();
    };
    /**
     * Returns the {@link ElementRef} that makes up the specified Host View.
     */
    AppViewManager.prototype.getHostElement = function (hostViewRef) {
        var hostView = view_ref_1.internalView(hostViewRef);
        if (hostView.proto.type !== api_1.ViewType.HOST) {
            throw new exceptions_1.BaseException('This operation is only allowed on host views');
        }
        return hostView.elementRefs[hostView.elementOffset];
    };
    /**
     * Searches the Component View of the Component specified via `hostLocation` and returns the
     * {@link ElementRef} for the Element identified via a Variable Name `variableName`.
     *
     * Throws an exception if the specified `hostLocation` is not a Host Element of a Component, or if
     * variable `variableName` couldn't be found in the Component View of this Component.
     */
    AppViewManager.prototype.getNamedElementInComponentView = function (hostLocation, variableName) {
        var hostView = view_ref_1.internalView(hostLocation.parentView);
        var boundElementIndex = hostLocation.boundElementIndex;
        var componentView = hostView.getNestedView(boundElementIndex);
        if (lang_1.isBlank(componentView)) {
            throw new exceptions_1.BaseException("There is no component directive at element " + boundElementIndex);
        }
        var binderIdx = componentView.proto.variableLocations.get(variableName);
        if (lang_1.isBlank(binderIdx)) {
            throw new exceptions_1.BaseException("Could not find variable " + variableName);
        }
        return componentView.elementRefs[componentView.elementOffset + binderIdx];
    };
    /**
     * Returns the component instance for the provided Host Element.
     */
    AppViewManager.prototype.getComponent = function (hostLocation) {
        var hostView = view_ref_1.internalView(hostLocation.parentView);
        var boundElementIndex = hostLocation.boundElementIndex;
        return this._utils.getComponentInstance(hostView, boundElementIndex);
    };
    /**
     * Creates an instance of a Component and attaches it to the first element in the global View
     * (usually DOM Document) that matches the component's selector or `overrideSelector`.
     *
     * This as a low-level way to bootstrap an application and upgrade an existing Element to a
     * Host Element. Most applications should use {@link DynamicComponentLoader#loadAsRoot} instead.
     *
     * The Component and its View are created based on the `hostProtoViewRef` which can be obtained
     * by compiling the component with {@link Compiler#compileInHost}.
     *
     * Use {@link AppViewManager#destroyRootHostView} to destroy the created Component and it's Host
     * View.
     *
     * ## Example
     *
     * ```
     * @ng.Component({
     *   selector: 'child-component'
     * })
     * @ng.View({
     *   template: 'Child'
     * })
     * class ChildComponent {
     *
     * }
     *
     * @ng.Component({
     *   selector: 'my-app'
     * })
     * @ng.View({
     *   template: `
     *     Parent (<some-component></some-component>)
     *   `
     * })
     * class MyApp {
     *   viewRef: ng.ViewRef;
     *
     *   constructor(public appViewManager: ng.AppViewManager, compiler: ng.Compiler) {
     *     compiler.compileInHost(ChildComponent).then((protoView: ng.ProtoViewRef) => {
     *       this.viewRef = appViewManager.createRootHostView(protoView, 'some-component', null);
     *     })
     *   }
     *
     *   onDestroy() {
     *     this.appViewManager.destroyRootHostView(this.viewRef);
     *     this.viewRef = null;
     *   }
     * }
     *
     * ng.bootstrap(MyApp);
     * ```
     */
    AppViewManager.prototype.createRootHostView = function (hostProtoViewRef, overrideSelector, injector) {
        var s = this._createRootHostViewScope();
        var hostProtoView = view_ref_1.internalProtoView(hostProtoViewRef);
        this._protoViewFactory.initializeProtoViewIfNeeded(hostProtoView);
        var hostElementSelector = overrideSelector;
        if (lang_1.isBlank(hostElementSelector)) {
            hostElementSelector = hostProtoView.elementBinders[0].componentDirective.metadata.selector;
        }
        var renderViewWithFragments = this._renderer.createRootHostView(hostProtoView.render, hostProtoView.mergeInfo.embeddedViewCount + 1, hostElementSelector);
        var hostView = this._createMainView(hostProtoView, renderViewWithFragments);
        this._renderer.hydrateView(hostView.render);
        this._utils.hydrateRootHostView(hostView, injector);
        return profile_1.wtfLeave(s, hostView.ref);
    };
    /**
     * Destroys the Host View created via {@link AppViewManager#createRootHostView}.
     *
     * Along with the Host View, the Component Instance as well as all nested View and Components are
     * destroyed as well.
     */
    AppViewManager.prototype.destroyRootHostView = function (hostViewRef) {
        // Note: Don't put the hostView into the view pool
        // as it is depending on the element for which it was created.
        var s = this._destroyRootHostViewScope();
        var hostView = view_ref_1.internalView(hostViewRef);
        this._renderer.detachFragment(hostView.renderFragment);
        this._renderer.dehydrateView(hostView.render);
        this._viewDehydrateRecurse(hostView);
        this._viewListener.viewDestroyed(hostView);
        this._renderer.destroyView(hostView.render);
        profile_1.wtfLeave(s);
    };
    /**
     * Instantiates an Embedded View based on the {@link TemplateRef `templateRef`} and inserts it
     * into the View Container specified via `viewContainerLocation` at the specified `index`.
     *
     * Returns the {@link ViewRef} for the newly created View.
     *
     * This as a low-level way to create and attach an Embedded via to a View Container. Most
     * applications should used {@link ViewContainerRef#createEmbeddedView} instead.
     *
     * Use {@link AppViewManager#destroyViewInContainer} to destroy the created Embedded View.
     */
    // TODO(i): this low-level version of ViewContainerRef#createEmbeddedView doesn't add anything new
    //    we should make it private, otherwise we have two apis to do the same thing.
    AppViewManager.prototype.createEmbeddedViewInContainer = function (viewContainerLocation, index, templateRef) {
        var s = this._createEmbeddedViewInContainerScope();
        var protoView = view_ref_1.internalProtoView(templateRef.protoViewRef);
        if (protoView.type !== api_1.ViewType.EMBEDDED) {
            throw new exceptions_1.BaseException('This method can only be called with embedded ProtoViews!');
        }
        this._protoViewFactory.initializeProtoViewIfNeeded(protoView);
        return profile_1.wtfLeave(s, this._createViewInContainer(viewContainerLocation, index, protoView, templateRef.elementRef, null));
    };
    /**
     * Instantiates a single {@link Component} and inserts its Host View into the View Container
     * found at `viewContainerLocation`. Within the container, the view will be inserted at position
     * specified via `index`.
     *
     * The component is instantiated using its {@link ProtoViewRef `protoViewRef`} which can be
     * obtained via {@link Compiler#compileInHost}.
     *
     * You can optionally specify `imperativelyCreatedInjector`, which configure the {@link Injector}
     * that will be created for the Host View.
     *
     * Returns the {@link HostViewRef} of the Host View created for the newly instantiated Component.
     *
     * Use {@link AppViewManager#destroyViewInContainer} to destroy the created Host View.
     */
    AppViewManager.prototype.createHostViewInContainer = function (viewContainerLocation, index, protoViewRef, imperativelyCreatedInjector) {
        var s = this._createHostViewInContainerScope();
        var protoView = view_ref_1.internalProtoView(protoViewRef);
        if (protoView.type !== api_1.ViewType.HOST) {
            throw new exceptions_1.BaseException('This method can only be called with host ProtoViews!');
        }
        this._protoViewFactory.initializeProtoViewIfNeeded(protoView);
        return profile_1.wtfLeave(s, this._createViewInContainer(viewContainerLocation, index, protoView, viewContainerLocation, imperativelyCreatedInjector));
    };
    /**
     *
     * See {@link AppViewManager#destroyViewInContainer}.
     */
    AppViewManager.prototype._createViewInContainer = function (viewContainerLocation, index, protoView, context, imperativelyCreatedInjector) {
        var parentView = view_ref_1.internalView(viewContainerLocation.parentView);
        var boundElementIndex = viewContainerLocation.boundElementIndex;
        var contextView = view_ref_1.internalView(context.parentView);
        var contextBoundElementIndex = context.boundElementIndex;
        var embeddedFragmentView = contextView.getNestedView(contextBoundElementIndex);
        var view;
        if (protoView.type === api_1.ViewType.EMBEDDED && lang_1.isPresent(embeddedFragmentView) &&
            !embeddedFragmentView.hydrated()) {
            // Case 1: instantiate the first view of a template that has been merged into a parent
            view = embeddedFragmentView;
            this._attachRenderView(parentView, boundElementIndex, index, view);
        }
        else {
            // Case 2: instantiate another copy of the template or a host ProtoView.
            // This is a separate case
            // as we only inline one copy of the template into the parent view.
            view = this._createPooledView(protoView);
            this._attachRenderView(parentView, boundElementIndex, index, view);
            this._renderer.hydrateView(view.render);
        }
        this._utils.attachViewInContainer(parentView, boundElementIndex, contextView, contextBoundElementIndex, index, view);
        this._utils.hydrateViewInContainer(parentView, boundElementIndex, contextView, contextBoundElementIndex, index, imperativelyCreatedInjector);
        return view.ref;
    };
    AppViewManager.prototype._attachRenderView = function (parentView, boundElementIndex, index, view) {
        var elementRef = parentView.elementRefs[boundElementIndex];
        if (index === 0) {
            this._renderer.attachFragmentAfterElement(elementRef, view.renderFragment);
        }
        else {
            var prevView = parentView.viewContainers[boundElementIndex].views[index - 1];
            this._renderer.attachFragmentAfterFragment(prevView.renderFragment, view.renderFragment);
        }
    };
    /**
     * Destroys an Embedded or Host View attached to a View Container at the specified `index`.
     *
     * The View Container is located via `viewContainerLocation`.
     */
    AppViewManager.prototype.destroyViewInContainer = function (viewContainerLocation, index) {
        var s = this._destroyViewInContainerScope();
        var parentView = view_ref_1.internalView(viewContainerLocation.parentView);
        var boundElementIndex = viewContainerLocation.boundElementIndex;
        this._destroyViewInContainer(parentView, boundElementIndex, index);
        profile_1.wtfLeave(s);
    };
    /**
     *
     * See {@link AppViewManager#detachViewInContainer}.
     */
    // TODO(i): refactor detachViewInContainer+attachViewInContainer to moveViewInContainer
    AppViewManager.prototype.attachViewInContainer = function (viewContainerLocation, index, viewRef) {
        var s = this._attachViewInContainerScope();
        var view = view_ref_1.internalView(viewRef);
        var parentView = view_ref_1.internalView(viewContainerLocation.parentView);
        var boundElementIndex = viewContainerLocation.boundElementIndex;
        // TODO(tbosch): the public methods attachViewInContainer/detachViewInContainer
        // are used for moving elements without the same container.
        // We will change this into an atomic `move` operation, which should preserve the
        // previous parent injector (see https://github.com/angular/angular/issues/1377).
        // Right now we are destroying any special
        // context view that might have been used.
        this._utils.attachViewInContainer(parentView, boundElementIndex, null, null, index, view);
        this._attachRenderView(parentView, boundElementIndex, index, view);
        return profile_1.wtfLeave(s, viewRef);
    };
    /**
     * See {@link AppViewManager#attachViewInContainer}.
     */
    // TODO(i): refactor detachViewInContainer+attachViewInContainer to moveViewInContainer
    AppViewManager.prototype.detachViewInContainer = function (viewContainerLocation, index) {
        var s = this._detachViewInContainerScope();
        var parentView = view_ref_1.internalView(viewContainerLocation.parentView);
        var boundElementIndex = viewContainerLocation.boundElementIndex;
        var viewContainer = parentView.viewContainers[boundElementIndex];
        var view = viewContainer.views[index];
        this._utils.detachViewInContainer(parentView, boundElementIndex, index);
        this._renderer.detachFragment(view.renderFragment);
        return profile_1.wtfLeave(s, view.ref);
    };
    AppViewManager.prototype._createMainView = function (protoView, renderViewWithFragments) {
        var mergedParentView = this._utils.createView(protoView, renderViewWithFragments, this, this._renderer);
        this._renderer.setEventDispatcher(mergedParentView.render, mergedParentView);
        this._viewListener.viewCreated(mergedParentView);
        return mergedParentView;
    };
    AppViewManager.prototype._createPooledView = function (protoView) {
        var view = this._viewPool.getView(protoView);
        if (lang_1.isBlank(view)) {
            view = this._createMainView(protoView, this._renderer.createView(protoView.render, protoView.mergeInfo.embeddedViewCount + 1));
        }
        return view;
    };
    AppViewManager.prototype._destroyPooledView = function (view) {
        var wasReturned = this._viewPool.returnView(view);
        if (!wasReturned) {
            this._viewListener.viewDestroyed(view);
            this._renderer.destroyView(view.render);
        }
    };
    AppViewManager.prototype._destroyViewInContainer = function (parentView, boundElementIndex, index) {
        var viewContainer = parentView.viewContainers[boundElementIndex];
        var view = viewContainer.views[index];
        this._viewDehydrateRecurse(view);
        this._utils.detachViewInContainer(parentView, boundElementIndex, index);
        if (view.viewOffset > 0) {
            // Case 1: a view that is part of another view.
            // Just detach the fragment
            this._renderer.detachFragment(view.renderFragment);
        }
        else {
            // Case 2: a view that is not part of another view.
            // dehydrate and destroy it.
            this._renderer.dehydrateView(view.render);
            this._renderer.detachFragment(view.renderFragment);
            this._destroyPooledView(view);
        }
    };
    AppViewManager.prototype._viewDehydrateRecurse = function (view) {
        if (view.hydrated()) {
            this._utils.dehydrateView(view);
        }
        var viewContainers = view.viewContainers;
        var startViewOffset = view.viewOffset;
        var endViewOffset = view.viewOffset + view.proto.mergeInfo.viewCount - 1;
        var elementOffset = view.elementOffset;
        for (var viewIdx = startViewOffset; viewIdx <= endViewOffset; viewIdx++) {
            var currView = view.views[viewIdx];
            for (var binderIdx = 0; binderIdx < currView.proto.elementBinders.length; binderIdx++, elementOffset++) {
                var vc = viewContainers[elementOffset];
                if (lang_1.isPresent(vc)) {
                    for (var j = vc.views.length - 1; j >= 0; j--) {
                        this._destroyViewInContainer(currView, elementOffset, j);
                    }
                }
            }
        }
    };
    AppViewManager = __decorate([
        di_1.Injectable(),
        __param(4, di_1.Inject(di_1.forwardRef(function () { return proto_view_factory_1.ProtoViewFactory; }))), 
        __metadata('design:paramtypes', [view_pool_1.AppViewPool, view_listener_1.AppViewListener, view_manager_utils_1.AppViewManagerUtils, api_1.Renderer, Object])
    ], AppViewManager);
    return AppViewManager;
})();
exports.AppViewManager = AppViewManager;
//# sourceMappingURL=view_manager.js.map