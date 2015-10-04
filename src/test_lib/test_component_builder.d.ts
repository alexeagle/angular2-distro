import { Injector } from 'angular2/src/core/di';
import { Type } from 'angular2/src/core/facade/lang';
import { Promise } from 'angular2/src/core/facade/async';
import { ViewMetadata } from '../core/metadata';
import { AppView } from 'angular2/src/core/linker/view';
import { ComponentRef } from 'angular2/src/core/linker/dynamic_component_loader';
import { DebugElement } from 'angular2/src/core/debug/debug_element';
export declare class RootTestComponent {
    _componentRef: ComponentRef;
    _componentParentView: AppView;
    debugElement: DebugElement;
    /**
     * @private
     */
    constructor(componentRef: ComponentRef);
    detectChanges(): void;
    destroy(): void;
}
/**
 * Builds a RootTestComponent for use in component level tests.
 */
export declare class TestComponentBuilder {
    private _injector;
    _bindingsOverrides: Map<Type, any[]>;
    _directiveOverrides: Map<Type, Map<Type, Type>>;
    _templateOverrides: Map<Type, string>;
    _viewBindingsOverrides: Map<Type, any[]>;
    _viewOverrides: Map<Type, ViewMetadata>;
    constructor(_injector: Injector);
    _clone(): TestComponentBuilder;
    /**
     * Overrides only the html of a {@link ComponentMetadata}.
     * All the other properties of the component's {@link ViewMetadata} are preserved.
     *
     * @param {Type} component
     * @param {string} html
     *
     * @return {TestComponentBuilder}
     */
    overrideTemplate(componentType: Type, template: string): TestComponentBuilder;
    /**
     * Overrides a component's {@link ViewMetadata}.
     *
     * @param {Type} component
     * @param {view} View
     *
     * @return {TestComponentBuilder}
     */
    overrideView(componentType: Type, view: ViewMetadata): TestComponentBuilder;
    /**
     * Overrides the directives from the component {@link ViewMetadata}.
     *
     * @param {Type} component
     * @param {Type} from
     * @param {Type} to
     *
     * @return {TestComponentBuilder}
     */
    overrideDirective(componentType: Type, from: Type, to: Type): TestComponentBuilder;
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
    overrideBindings(type: Type, bindings: any[]): TestComponentBuilder;
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
    overrideViewBindings(type: Type, bindings: any[]): TestComponentBuilder;
    /**
     * Builds and returns a RootTestComponent.
     *
     * @return {Promise<RootTestComponent>}
     */
    createAsync(rootComponentType: Type): Promise<RootTestComponent>;
}
