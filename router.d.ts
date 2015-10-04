/**
 * @module
 * @description
 * Maps application URLs into application states, to support deep-linking and navigation.
 */
export { Router } from './src/router/router';
export { RouterOutlet } from './src/router/router_outlet';
export { RouterLink } from './src/router/router_link';
export { RouteParams } from './src/router/instruction';
export { RouteRegistry } from './src/router/route_registry';
export { LocationStrategy } from './src/router/location_strategy';
export { HashLocationStrategy } from './src/router/hash_location_strategy';
export { PathLocationStrategy } from './src/router/path_location_strategy';
export { Location, APP_BASE_HREF } from './src/router/location';
export * from './src/router/route_config_decorator';
export * from './src/router/route_definition';
export { OnActivate, OnDeactivate, OnReuse, CanDeactivate, CanReuse } from './src/router/interfaces';
export { CanActivate } from './src/router/lifecycle_annotations';
export { Instruction, ComponentInstruction } from './src/router/instruction';
export { OpaqueToken } from 'angular2/angular2';
export { ROUTE_DATA } from './src/router/route_data';
import { OpaqueToken } from './core';
import { Type } from './src/core/facade/lang';
/**
 * Token used to bind the component with the top-level {@link RouteConfig}s for the
 * application.
 *
 * You can use the {@link routerBindings} function in your {@link bootstrap} bindings to
 * simplify setting up these bindings.
 *
 * ## Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
 *
 * ```
 * import {Component, View} from 'angular2/angular2';
 * import {
 *   ROUTER_DIRECTIVES,
 *   ROUTER_BINDINGS,
 *   ROUTER_PRIMARY_COMPONENT,
 *   RouteConfig
 * } from 'angular2/router';
 *
 * @Component({...})
 * @View({directives: [ROUTER_DIRECTIVES]})
 * @RouteConfig([
 *  {...},
 * ])
 * class AppCmp {
 *   // ...
 * }
 *
 * bootstrap(AppCmp, [
 *   ROUTER_BINDINGS,
 *   bind(ROUTER_PRIMARY_COMPONENT).toValue(AppCmp)
 * ]);
 * ```
 */
export declare const ROUTER_PRIMARY_COMPONENT: OpaqueToken;
/**
 * A list of directives. To use the router directives like {@link RouterOutlet} and
 * {@link RouterLink}, add this to your `directives` array in the {@link View} decorator of your
 * component.
 *
 * ## Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
 *
 * ```
 * import {Component, View} from 'angular2/angular2';
 * import {ROUTER_DIRECTIVES, routerBindings, RouteConfig} from 'angular2/router';
 *
 * @Component({...})
 * @View({directives: [ROUTER_DIRECTIVES]})
 * @RouteConfig([
 *  {...},
 * ])
 * class AppCmp {
 *    // ...
 * }
 *
 * bootstrap(AppCmp, [routerBindings(AppCmp)]);
 * ```
 */
export declare const ROUTER_DIRECTIVES: any[];
/**
 * A list of {@link Binding}s. To use the router, you must add this to your application.
 *
 * Note that you also need to bind to {@link ROUTER_PRIMARY_COMPONENT}.
 *
 * You can use the {@link routerBindings} function in your {@link bootstrap} bindings to
 * simplify setting up these bindings.
 *
 * ## Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
 *
 * ```
 * import {Component, View} from 'angular2/angular2';
 * import {
 *   ROUTER_DIRECTIVES,
 *   ROUTER_BINDINGS,
 *   ROUTER_PRIMARY_COMPONENT,
 *   RouteConfig
 * } from 'angular2/router';
 *
 * @Component({...})
 * @View({directives: [ROUTER_DIRECTIVES]})
 * @RouteConfig([
 *  {...},
 * ])
 * class AppCmp {
 *   // ...
 * }
 *
 * bootstrap(AppCmp, [
 *   ROUTER_BINDINGS,
 *   bind(ROUTER_PRIMARY_COMPONENT).toValue(AppCmp)
 * ]);
 * ```
 */
export declare const ROUTER_BINDINGS: any[];
/**
 * A list of {@link Binding}s. To use the router, you must add these bindings to
 * your application.
 *
 * ## Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
 *
 * ```
 * import {Component, View} from 'angular2/angular2';
 * import {ROUTER_DIRECTIVES, routerBindings, RouteConfig} from 'angular2/router';
 *
 * @Component({...})
 * @View({directives: [ROUTER_DIRECTIVES]})
 * @RouteConfig([
 *  {...},
 * ])
 * class AppCmp {
 *   // ...
 * }
 *
 * bootstrap(AppCmp, [routerBindings(AppCmp)]);
 * ```
 */
export declare function routerBindings(primaryComponent: Type): Array<any>;
