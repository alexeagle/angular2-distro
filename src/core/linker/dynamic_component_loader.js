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
var di_1 = require('angular2/src/core/di');
var compiler_1 = require('./compiler');
var lang_1 = require('angular2/src/core/facade/lang');
var view_manager_1 = require('angular2/src/core/linker/view_manager');
/**
 * Represents an instance of a Component created via {@link DynamicComponentLoader}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {@link #dispose}
 * method.
 */
var ComponentRef = (function () {
    /**
     * @private
     *
     * TODO(i): refactor into public/private fields
     */
    function ComponentRef(location, instance, componentType, injector, _dispose) {
        this._dispose = _dispose;
        this.location = location;
        this.instance = instance;
        this.componentType = componentType;
        this.injector = injector;
    }
    Object.defineProperty(ComponentRef.prototype, "hostView", {
        /**
         * The {@link ViewRef} of the Host View of this Component instance.
         */
        get: function () { return this.location.parentView; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentRef.prototype, "hostComponentType", {
        /**
         * @private
         *
         * Returns the type of this Component instance.
         *
         * TODO(i): this api should be removed
         */
        get: function () { return this.componentType; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentRef.prototype, "hostComponent", {
        /**
         * @private
         *
         * The instance of the component.
         *
         * TODO(i): this api should be removed
         */
        get: function () { return this.instance; },
        enumerable: true,
        configurable: true
    });
    /**
     * Destroys the component instance and all of the data structures associated with it.
     *
     * TODO(i): rename to destroy to be consistent with AppViewManager and ViewContainerRef
     */
    ComponentRef.prototype.dispose = function () { this._dispose(); };
    return ComponentRef;
})();
exports.ComponentRef = ComponentRef;
/**
 * Service for instantiating a Component and attaching it to a View at a specified location.
 */
var DynamicComponentLoader = (function () {
    /**
     * @private
     */
    function DynamicComponentLoader(_compiler, _viewManager) {
        this._compiler = _compiler;
        this._viewManager = _viewManager;
    }
    /**
     * Creates an instance of a Component `type` and attaches it to the first element in the
     * platform-specific global view that matches the component's selector.
     *
     * In a browser the platform-specific global view is the main DOM Document.
     *
     * If needed, the component's selector can be overridden via `overrideSelector`.
     *
     * You can optionally provide `injector` and this {@link Injector} will be used to instantiate the
     * Component.
     *
     * To be notified when this Component instance is destroyed, you can also optionally provide
     * `onDispose` callback.
     *
     * Returns a promise for the {@link ComponentRef} representing the newly created Component.
     *
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
     * }
     *
     *
     *
     * @ng.Component({
     *   selector: 'my-app'
     * })
     * @ng.View({
     *   template: `
     *     Parent (<child id="child"></child>)
     *   `
     * })
     * class MyApp {
     *   constructor(dynamicComponentLoader: ng.DynamicComponentLoader, injector: ng.Injector) {
     *     dynamicComponentLoader.loadAsRoot(ChildComponent, '#child', injector);
     *   }
     * }
     *
     * ng.bootstrap(MyApp);
     * ```
     *
     * Resulting DOM:
     *
     * ```
     * <my-app>
     *   Parent (
     *     <child id="child">
     *        Child
     *     </child>
     *   )
     * </my-app>
     * ```
     */
    DynamicComponentLoader.prototype.loadAsRoot = function (type, overrideSelector, injector, onDispose) {
        var _this = this;
        return this._compiler.compileInHost(type).then(function (hostProtoViewRef) {
            var hostViewRef = _this._viewManager.createRootHostView(hostProtoViewRef, overrideSelector, injector);
            var newLocation = _this._viewManager.getHostElement(hostViewRef);
            var component = _this._viewManager.getComponent(newLocation);
            var dispose = function () {
                _this._viewManager.destroyRootHostView(hostViewRef);
                if (lang_1.isPresent(onDispose)) {
                    onDispose();
                }
            };
            return new ComponentRef(newLocation, component, type, injector, dispose);
        });
    };
    /**
     * Creates an instance of a Component and attaches it to a View Container located inside of the
     * Component View of another Component instance.
     *
     * The targeted Component Instance is specified via its `hostLocation` {@link ElementRef}. The
     * location within the Component View of this Component Instance is specified via `anchorName`
     * Template Variable Name.
     *
     * You can optionally provide `bindings` to configure the {@link Injector} provisioned for this
     * Component Instance.
     *
     * Returns a promise for the {@link ComponentRef} representing the newly created Component.
     *
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
     * }
     *
     *
     * @ng.Component({
     *   selector: 'my-app'
     * })
     * @ng.View({
     *   template: `
     *     Parent (<div #child></div>)
     *   `
     * })
     * class MyApp {
     *   constructor(dynamicComponentLoader: ng.DynamicComponentLoader, elementRef: ng.ElementRef) {
     *     dynamicComponentLoader.loadIntoLocation(ChildComponent, elementRef, 'child');
     *   }
     * }
     *
     * ng.bootstrap(MyApp);
     * ```
     *
     * Resulting DOM:
     *
     * ```
     * <my-app>
     *    Parent (
     *      <div #child="" class="ng-binding"></div>
     *      <child-component class="ng-binding">Child</child-component>
     *    )
     * </my-app>
     * ```
     */
    DynamicComponentLoader.prototype.loadIntoLocation = function (type, hostLocation, anchorName, bindings) {
        if (bindings === void 0) { bindings = null; }
        return this.loadNextToLocation(type, this._viewManager.getNamedElementInComponentView(hostLocation, anchorName), bindings);
    };
    /**
     * Creates an instance of a Component and attaches it to the View Container found at the
     * `location` specified as {@link ElementRef}.
     *
     * You can optionally provide `bindings` to configure the {@link Injector} provisioned for this
     * Component Instance.
     *
     * Returns a promise for the {@link ComponentRef} representing the newly created Component.
     *
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
     * }
     *
     *
     * @ng.Component({
     *   selector: 'my-app'
     * })
     * @ng.View({
     *   template: `Parent`
     * })
     * class MyApp {
     *   constructor(dynamicComponentLoader: ng.DynamicComponentLoader, elementRef: ng.ElementRef) {
     *     dynamicComponentLoader.loadNextToLocation(ChildComponent, elementRef);
     *   }
     * }
     *
     * ng.bootstrap(MyApp);
     * ```
     *
     * Resulting DOM:
     *
     * ```
     * <my-app>Parent</my-app>
     * <child-component>Child</child-component>
     * ```
     */
    DynamicComponentLoader.prototype.loadNextToLocation = function (type, location, bindings) {
        var _this = this;
        if (bindings === void 0) { bindings = null; }
        return this._compiler.compileInHost(type).then(function (hostProtoViewRef) {
            var viewContainer = _this._viewManager.getViewContainer(location);
            var hostViewRef = viewContainer.createHostView(hostProtoViewRef, viewContainer.length, bindings);
            var newLocation = _this._viewManager.getHostElement(hostViewRef);
            var component = _this._viewManager.getComponent(newLocation);
            var dispose = function () {
                var index = viewContainer.indexOf(hostViewRef);
                if (index !== -1) {
                    viewContainer.remove(index);
                }
            };
            return new ComponentRef(newLocation, component, type, null, dispose);
        });
    };
    DynamicComponentLoader = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [compiler_1.Compiler, view_manager_1.AppViewManager])
    ], DynamicComponentLoader);
    return DynamicComponentLoader;
})();
exports.DynamicComponentLoader = DynamicComponentLoader;
//# sourceMappingURL=dynamic_component_loader.js.map