import { LocationStrategy } from './location_strategy';
import { EventEmitter } from 'angular2/src/core/facade/async';
import { OpaqueToken } from 'angular2/src/core/di';
/**
 * The `APP_BASE_HREF` token represents the base href to be used with the
 * {@link PathLocationStrategy}.
 *
 * If you're using {@link PathLocationStrategy}, you must provide a binding to a string
 * representing the URL prefix that should be preserved when generating and recognizing
 * URLs.
 *
 * ## Example
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
 * bootstrap(AppCmp, [
 *   routerBindings(AppCmp),
 *   PathLocationStrategy,
 *   bind(APP_BASE_HREF).toValue('/my/app')
 * ]);
 * ```
 */
export declare const APP_BASE_HREF: OpaqueToken;
/**
 * `Location` is a service that applications can use to interact with a browser's URL.
 * Depending on which {@link LocationStrategy} is used, `Location` will either persist
 * to the URL's path or the URL's hash segment.
 *
 * Note: it's better to use {@link Router#navigate} service to trigger route changes. Use
 * `Location` only if you need to interact with or create normalized URLs outside of
 * routing.
 *
 * `Location` is responsible for normalizing the URL against the application's base href.
 * A normalized URL is absolute from the URL host, includes the application's base href, and has no
 * trailing slash:
 * - `/my/app/user/123` is normalized
 * - `my/app/user/123` **is not** normalized
 * - `/my/app/user/123/` **is not** normalized
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
 * bootstrap(AppCmp, [routerBindings(AppCmp)]);
 * ```
 */
export declare class Location {
    platformStrategy: LocationStrategy;
    _subject: EventEmitter;
    _baseHref: string;
    constructor(platformStrategy: LocationStrategy, href?: string);
    /**
     * Returns the normalized URL path.
     */
    path(): string;
    /**
     * Given a string representing a URL, returns the normalized URL path.
     */
    normalize(url: string): string;
    /**
     * Given a string representing a URL, returns the normalized URL path.
     * If the given URL doesn't begin with a leading slash (`'/'`), this method adds one
     * before normalizing.
     */
    normalizeAbsolutely(url: string): string;
    /**
     * Changes the browsers URL to the normalized version of the given URL, and pushes a
     * new item onto the platform's history.
     */
    go(url: string): void;
    /**
     * Navigates forward in the platform's history.
     */
    forward(): void;
    /**
     * Navigates back in the platform's history.
     */
    back(): void;
    /**
     * Subscribe to the platform's `popState` events.
     */
    subscribe(onNext: (value: any) => void, onThrow?: (exception: any) => void, onReturn?: () => void): void;
}
