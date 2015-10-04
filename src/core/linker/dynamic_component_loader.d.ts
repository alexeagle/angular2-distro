import { Injector, ResolvedBinding } from 'angular2/src/core/di';
import { Compiler } from './compiler';
import { Type } from 'angular2/src/core/facade/lang';
import { Promise } from 'angular2/src/core/facade/async';
import { AppViewManager } from 'angular2/src/core/linker/view_manager';
import { ElementRef } from './element_ref';
import { HostViewRef } from './view_ref';
/**
 * Represents an instance of a Component created via {@link DynamicComponentLoader}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {@link #dispose}
 * method.
 */
export declare class ComponentRef {
    private _dispose;
    /**
     * Location of the Host Element of this Component Instance.
     */
    location: ElementRef;
    /**
     * The instance of the Component.
     */
    instance: any;
    /**
     * The user defined component type, represented via the constructor function.
     *
     * <!-- TODO: customize wording for Dart docs -->
     */
    componentType: Type;
    /**
     * @private
     *
     * The injector provided {@link DynamicComponentLoader#loadAsRoot}.
     *
     * TODO(i): this api is useless and should be replaced by an injector retrieved from
     *     the HostElementRef, which is currently not possible.
     */
    injector: Injector;
    /**
     * @private
     *
     * TODO(i): refactor into public/private fields
     */
    constructor(location: ElementRef, instance: any, componentType: Type, injector: Injector, _dispose: () => void);
    /**
     * The {@link ViewRef} of the Host View of this Component instance.
     */
    hostView: HostViewRef;
    /**
     * @private
     *
     * Returns the type of this Component instance.
     *
     * TODO(i): this api should be removed
     */
    hostComponentType: Type;
    /**
     * @private
     *
     * The instance of the component.
     *
     * TODO(i): this api should be removed
     */
    hostComponent: any;
    /**
     * Destroys the component instance and all of the data structures associated with it.
     *
     * TODO(i): rename to destroy to be consistent with AppViewManager and ViewContainerRef
     */
    dispose(): void;
}
/**
 * Service for instantiating a Component and attaching it to a View at a specified location.
 */
export declare class DynamicComponentLoader {
    private _compiler;
    private _viewManager;
    /**
     * @private
     */
    constructor(_compiler: Compiler, _viewManager: AppViewManager);
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
    loadAsRoot(type: Type, overrideSelector: string, injector: Injector, onDispose?: () => void): Promise<ComponentRef>;
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
    loadIntoLocation(type: Type, hostLocation: ElementRef, anchorName: string, bindings?: ResolvedBinding[]): Promise<ComponentRef>;
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
    loadNextToLocation(type: Type, location: ElementRef, bindings?: ResolvedBinding[]): Promise<ComponentRef>;
}
