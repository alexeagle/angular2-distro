import { LocationStrategy } from './location_strategy';
/**
 * `HashLocationStrategy` is a {@link LocationStrategy} used to configure the
 * {@link Location} service to represent its state in the
 * [hash fragment](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax)
 * of the browser's URL.
 *
 * `HashLocationStrategy` is the default binding for {@link LocationStrategy}
 * provided in {@link routerBindings} and {@link ROUTER_BINDINGS}.
 *
 * For instance, if you call `location.go('/foo')`, the browser's URL will become
 * `example.com#/foo`.
 *
 * ## Example
 *
 * ```
 * import {Component, View} from 'angular2/angular2';
 * import {
 *   ROUTER_DIRECTIVES,
 *   routerBindings,
 *   RouteConfig,
 *   Location
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
 *   routerBindings(AppCmp) // includes binding to HashLocationStrategy
 * ]);
 * ```
 */
export declare class HashLocationStrategy extends LocationStrategy {
    private _location;
    private _history;
    constructor();
    onPopState(fn: EventListener): void;
    getBaseHref(): string;
    path(): string;
    pushState(state: any, title: string, url: string): void;
    forward(): void;
    back(): void;
}
