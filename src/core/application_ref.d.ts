import { NgZone } from 'angular2/src/core/zone/ng_zone';
import { Type } from 'angular2/src/core/facade/lang';
import { Binding, Injector } from 'angular2/src/core/di';
import { Promise } from 'angular2/src/core/facade/async';
import { ComponentRef } from 'angular2/src/core/linker/dynamic_component_loader';
/**
 * Constructs the set of bindings meant for use at the platform level.
 *
 * These are bindings that should be singletons shared among all Angular applications
 * running on the page.
 */
export declare function platformBindings(): Array<Type | Binding | any[]>;
/**
 * Construct a default set of bindings which should be included in any Angular
 * application, regardless of whether it runs on the UI thread or in a web worker.
 */
export declare function applicationCommonBindings(): Array<Type | Binding | any[]>;
/**
 * Create an Angular zone.
 */
export declare function createNgZone(): NgZone;
/**
 * @private
 */
export declare function platformCommon(bindings?: Array<Type | Binding | any[]>, initializer?: () => void): PlatformRef;
/**
 * The Angular platform is the entry point for Angular on a web page. Each page
 * has exactly one platform, and services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 *
 * A page's platform is initialized implicitly when {@link bootstrap}() is called, or
 * explicitly by calling {@link platform}().
 */
export declare class PlatformRef {
    private _injector;
    private _dispose;
    /**
     * @private
     */
    _applications: ApplicationRef[];
    /**
     * @private
     */
    constructor(_injector: Injector, _dispose: () => void);
    /**
     * Retrieve the platform {@link Injector}, which is the parent injector for
     * every Angular application on the page and provides singleton bindings.
     */
    injector: Injector;
    /**
     * Instantiate a new Angular application on the page.
     *
     * # What is an application?
     *
     * Each Angular application has its own zone, change detection, compiler,
     * renderer, and other framework components. An application hosts one or more
     * root components, which can be initialized via `ApplicationRef.bootstrap()`.
     *
     * # Application Bindings
     *
     * Angular applications require numerous bindings to be properly instantiated.
     * When using `application()` to create a new app on the page, these bindings
     * must be provided. Fortunately, there are helper functions to configure
     * typical bindings, as shown in the example below.
     *
     * # Example
     * ```
     * var myAppBindings = [MyAppService];
     *
     * platform()
     *   .application([applicationCommonBindings(), applicationDomBindings(), myAppBindings])
     *   .bootstrap(MyTopLevelComponent);
     * ```
     * # See Also
     *
     * See the {@link bootstrap} documentation for more details.
     */
    application(bindings: Array<Type | Binding | any[]>): ApplicationRef;
    /**
     * Instantiate a new Angular application on the page, using bindings which
     * are only available asynchronously. One such use case is to initialize an
     * application running in a web worker.
     *
     * # Usage
     *
     * `bindingFn` is a function that will be called in the new application's zone.
     * It should return a {@link Promise} to a list of bindings to be used for the
     * new application. Once this promise resolves, the application will be
     * constructed in the same manner as a normal `application()`.
     */
    asyncApplication(bindingFn: (zone: NgZone) => Promise<Array<Type | Binding | any[]>>): Promise<ApplicationRef>;
    private _initApp(zone, bindings);
    /**
     * Destroy the Angular platform and all Angular applications on the page.
     */
    dispose(): void;
    /**
     * @private
     */
    _applicationDisposed(app: ApplicationRef): void;
}
/**
 * A reference to an Angular application running on a page.
 *
 * For more about Angular applications, see the documentation for {@link bootstrap}.
 */
export declare class ApplicationRef {
    private _platform;
    private _zone;
    private _injector;
    private _bootstrapListeners;
    private _rootComponents;
    /**
     * @private
     */
    constructor(_platform: PlatformRef, _zone: NgZone, _injector: Injector);
    /**
     * Register a listener to be called each time `bootstrap()` is called to bootstrap
     * a new root component.
     */
    registerBootstrapListener(listener: (ref: ComponentRef) => void): void;
    /**
     * Bootstrap a new component at the root level of the application.
     *
     * # Bootstrap process
     *
     * When bootstrapping a new root component into an application, Angular mounts the
     * specified application component onto DOM elements identified by the [componentType]'s
     * selector and kicks off automatic change detection to finish initializing the component.
     *
     * # Optional Bindings
     *
     * Bindings for the given component can optionally be overridden via the `bindings`
     * parameter. These bindings will only apply for the root component being added and any
     * child components under it.
     *
     * # Example
     * ```
     * var app = platform.application([applicationCommonBindings(), applicationDomBindings()];
     * app.bootstrap(FirstRootComponent);
     * app.bootstrap(SecondRootComponent, [bind(OverrideBinding).toClass(OverriddenBinding)]);
     * ```
     */
    bootstrap(componentType: Type, bindings?: Array<Type | Binding | any[]>): Promise<ComponentRef>;
    /**
     * Retrieve the application {@link Injector}.
     */
    injector: Injector;
    /**
     * Retrieve the application {@link NgZone}.
     */
    zone: NgZone;
    /**
     * Dispose of this application and all of its components.
     */
    dispose(): void;
}
