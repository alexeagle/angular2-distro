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
var lang_1 = require('angular2/src/core/facade/lang');
var collection_1 = require('angular2/src/core/facade/collection');
var directive_resolver_1 = require('angular2/src/core/linker/directive_resolver');
var view_resolver_1 = require('angular2/src/core/linker/view_resolver');
var view_ref_1 = require('angular2/src/core/linker/view_ref');
var dynamic_component_loader_1 = require('angular2/src/core/linker/dynamic_component_loader');
var utils_1 = require('./utils');
var render_1 = require('angular2/src/core/render/render');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
var debug_element_1 = require('angular2/src/core/debug/debug_element');
var RootTestComponent = (function () {
    /**
     * @private
     */
    function RootTestComponent(componentRef) {
        this.debugElement = new debug_element_1.DebugElement(view_ref_1.internalView(componentRef.hostView), 0);
        this._componentParentView = view_ref_1.internalView(componentRef.hostView);
        this._componentRef = componentRef;
    }
    RootTestComponent.prototype.detectChanges = function () {
        this._componentParentView.changeDetector.detectChanges();
        this._componentParentView.changeDetector.checkNoChanges();
    };
    RootTestComponent.prototype.destroy = function () { this._componentRef.dispose(); };
    return RootTestComponent;
})();
exports.RootTestComponent = RootTestComponent;
var _nextRootElementId = 0;
/**
 * Builds a RootTestComponent for use in component level tests.
 */
var TestComponentBuilder = (function () {
    function TestComponentBuilder(_injector) {
        this._injector = _injector;
        this._bindingsOverrides = new Map();
        this._directiveOverrides = new Map();
        this._templateOverrides = new Map();
        this._viewBindingsOverrides = new Map();
        this._viewOverrides = new Map();
    }
    TestComponentBuilder.prototype._clone = function () {
        var clone = new TestComponentBuilder(this._injector);
        clone._viewOverrides = collection_1.MapWrapper.clone(this._viewOverrides);
        clone._directiveOverrides = collection_1.MapWrapper.clone(this._directiveOverrides);
        clone._templateOverrides = collection_1.MapWrapper.clone(this._templateOverrides);
        return clone;
    };
    /**
     * Overrides only the html of a {@link ComponentMetadata}.
     * All the other properties of the component's {@link ViewMetadata} are preserved.
     *
     * @param {Type} component
     * @param {string} html
     *
     * @return {TestComponentBuilder}
     */
    TestComponentBuilder.prototype.overrideTemplate = function (componentType, template) {
        var clone = this._clone();
        clone._templateOverrides.set(componentType, template);
        return clone;
    };
    /**
     * Overrides a component's {@link ViewMetadata}.
     *
     * @param {Type} component
     * @param {view} View
     *
     * @return {TestComponentBuilder}
     */
    TestComponentBuilder.prototype.overrideView = function (componentType, view) {
        var clone = this._clone();
        clone._viewOverrides.set(componentType, view);
        return clone;
    };
    /**
     * Overrides the directives from the component {@link ViewMetadata}.
     *
     * @param {Type} component
     * @param {Type} from
     * @param {Type} to
     *
     * @return {TestComponentBuilder}
     */
    TestComponentBuilder.prototype.overrideDirective = function (componentType, from, to) {
        var clone = this._clone();
        var overridesForComponent = clone._directiveOverrides.get(componentType);
        if (!lang_1.isPresent(overridesForComponent)) {
            clone._directiveOverrides.set(componentType, new Map());
            overridesForComponent = clone._directiveOverrides.get(componentType);
        }
        overridesForComponent.set(from, to);
        return clone;
    };
    /**
     * Overrides one or more injectables configured via `bindings` metadata property of a directive or
     * component.
     * Very useful when certain bindings need to be mocked out.
     *
     * The bindings specified via this method are appended to the existing `bindings` causing the
     * duplicated bindings to
     * be overridden.
     *
     * @param {Type} component
     * @param {any[]} bindings
     *
     * @return {TestComponentBuilder}
     */
    TestComponentBuilder.prototype.overrideBindings = function (type, bindings) {
        var clone = this._clone();
        clone._bindingsOverrides.set(type, bindings);
        return clone;
    };
    /**
     * Overrides one or more injectables configured via `bindings` metadata property of a directive or
     * component.
     * Very useful when certain bindings need to be mocked out.
     *
     * The bindings specified via this method are appended to the existing `bindings` causing the
     * duplicated bindings to
     * be overridden.
     *
     * @param {Type} component
     * @param {any[]} bindings
     *
     * @return {TestComponentBuilder}
     */
    TestComponentBuilder.prototype.overrideViewBindings = function (type, bindings) {
        var clone = this._clone();
        clone._viewBindingsOverrides.set(type, bindings);
        return clone;
    };
    /**
     * Builds and returns a RootTestComponent.
     *
     * @return {Promise<RootTestComponent>}
     */
    TestComponentBuilder.prototype.createAsync = function (rootComponentType) {
        var mockDirectiveResolver = this._injector.get(directive_resolver_1.DirectiveResolver);
        var mockViewResolver = this._injector.get(view_resolver_1.ViewResolver);
        collection_1.MapWrapper.forEach(this._viewOverrides, function (view, type) { mockViewResolver.setView(type, view); });
        collection_1.MapWrapper.forEach(this._templateOverrides, function (template, type) { mockViewResolver.setInlineTemplate(type, template); });
        collection_1.MapWrapper.forEach(this._directiveOverrides, function (overrides, component) {
            collection_1.MapWrapper.forEach(overrides, function (to, from) {
                mockViewResolver.overrideViewDirective(component, from, to);
            });
        });
        this._bindingsOverrides.forEach(function (bindings, type) {
            return mockDirectiveResolver.setBindingsOverride(type, bindings);
        });
        this._viewBindingsOverrides.forEach(function (bindings, type) { return mockDirectiveResolver.setViewBindingsOverride(type, bindings); });
        var rootElId = "root" + _nextRootElementId++;
        var rootEl = utils_1.el("<div id=\"" + rootElId + "\"></div>");
        var doc = this._injector.get(render_1.DOCUMENT);
        // TODO(juliemr): can/should this be optional?
        var oldRoots = dom_adapter_1.DOM.querySelectorAll(doc, '[id^=root]');
        for (var i = 0; i < oldRoots.length; i++) {
            dom_adapter_1.DOM.remove(oldRoots[i]);
        }
        dom_adapter_1.DOM.appendChild(doc.body, rootEl);
        return this._injector.get(dynamic_component_loader_1.DynamicComponentLoader)
            .loadAsRoot(rootComponentType, "#" + rootElId, this._injector)
            .then(function (componentRef) { return new RootTestComponent(componentRef); });
    };
    TestComponentBuilder = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [di_1.Injector])
    ], TestComponentBuilder);
    return TestComponentBuilder;
})();
exports.TestComponentBuilder = TestComponentBuilder;
//# sourceMappingURL=test_component_builder.js.map