import { Type } from 'angular2/src/core/facade/lang';
import { ViewMetadata } from '../core/metadata';
import { ViewResolver } from 'angular2/src/core/linker/view_resolver';
export declare class MockViewResolver extends ViewResolver {
    _views: Map<Type, ViewMetadata>;
    _inlineTemplates: Map<Type, string>;
    _viewCache: Map<Type, ViewMetadata>;
    _directiveOverrides: Map<Type, Map<Type, Type>>;
    constructor();
    /**
     * Overrides the {@link ViewMetadata} for a component.
     *
     * @param {Type} component
     * @param {ViewDefinition} view
     */
    setView(component: Type, view: ViewMetadata): void;
    /**
     * Overrides the inline template for a component - other configuration remains unchanged.
     *
     * @param {Type} component
     * @param {string} template
     */
    setInlineTemplate(component: Type, template: string): void;
    /**
     * Overrides a directive from the component {@link ViewMetadata}.
     *
     * @param {Type} component
     * @param {Type} from
     * @param {Type} to
     */
    overrideViewDirective(component: Type, from: Type, to: Type): void;
    /**
     * Returns the {@link ViewMetadata} for a component:
     * - Set the {@link ViewMetadata} to the overridden view when it exists or fallback to the default
     * `ViewResolver`,
     *   see `setView`.
     * - Override the directives, see `overrideViewDirective`.
     * - Override the @View definition, see `setInlineTemplate`.
     *
     * @param component
     * @returns {ViewDefinition}
     */
    resolve(component: Type): ViewMetadata;
    /**
     * Once a component has been compiled, the AppProtoView is stored in the compiler cache.
     *
     * Then it should not be possible to override the component configuration after the component
     * has been compiled.
     *
     * @param {Type} component
     */
    _checkOverrideable(component: Type): void;
}
