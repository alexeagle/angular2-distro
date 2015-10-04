import { LocationStrategy } from './location_strategy';
/**
 * `PathLocationStrategy` is a {@link LocationStrategy} used to configure the
 * {@link Location} service to represent its state in the
 * [path](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax) of the
 * browser's URL.
 *
 * If you're using `PathLocationStrategy`, you must provide a binding for
 * {@link APP_BASE_HREF} to a string representing the URL prefix that should
 * be preserved when generating and recognizing URLs.
 *
 * For instance, if you provide an `APP_BASE_HREF` of `'/my/app'` and call
 * `location.go('/foo')`, the browser's URL will become
 * `example.com/my/app/foo`.
 *
 * ## Example
 *
 * ```
 * import {Component, View, bind} from 'angular2/angular2';
 * import {
 *   APP_BASE_HREF
 *   ROUTER_DIRECTIVES,
 *   routerBindings,
 *   RouteConfig,
 *   Location,
 *   LocationStrategy,
 *   PathLocationStrategy
 * } from 'angular2/router';
 *
 * @Component({...})
 * @View({directives: [ROUTER_DIRECTIVES]})
 * @RouteConfig([
 *  {...},
 * ])
 * class AppCmp {
 *   constructor(location: Location) {
 *     location.go('/foo');
 *   }
 * }
 *
 * bootstrap(AppCmp, [
 *   routerBindings(AppCmp),
 *   bind(LocationStrategy).toClass(PathLocationStrategy),
 *   bind(APP_BASE_HREF).toValue('/my/app')
 * ]);
 * ```
 */
export declare class PathLocationStrategy extends LocationStrategy {
    private _location;
    private _history;
    private _baseHref;
    constructor();
    onPopState(fn: EventListener): void;
    getBaseHref(): string;
    path(): string;
    pushState(state: any, title: string, url: string): void;
    forward(): void;
    back(): void;
}
