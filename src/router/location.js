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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var location_strategy_1 = require('./location_strategy');
var lang_1 = require('angular2/src/core/facade/lang');
var async_1 = require('angular2/src/core/facade/async');
var lang_2 = require('angular2/src/core/facade/lang');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var di_1 = require('angular2/src/core/di');
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
exports.APP_BASE_HREF = lang_1.CONST_EXPR(new di_1.OpaqueToken('appBaseHref'));
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
var Location = (function () {
    function Location(platformStrategy, href) {
        var _this = this;
        this.platformStrategy = platformStrategy;
        this._subject = new async_1.EventEmitter();
        var browserBaseHref = lang_1.isPresent(href) ? href : this.platformStrategy.getBaseHref();
        if (lang_2.isBlank(browserBaseHref)) {
            throw new exceptions_1.BaseException("No base href set. Either provide a binding to \"appBaseHrefToken\" or add a base element.");
        }
        this._baseHref = stripTrailingSlash(stripIndexHtml(browserBaseHref));
        this.platformStrategy.onPopState(function (_) { async_1.ObservableWrapper.callNext(_this._subject, { 'url': _this.path(), 'pop': true }); });
    }
    /**
     * Returns the normalized URL path.
     */
    Location.prototype.path = function () { return this.normalize(this.platformStrategy.path()); };
    /**
     * Given a string representing a URL, returns the normalized URL path.
     */
    Location.prototype.normalize = function (url) {
        return stripTrailingSlash(_stripBaseHref(this._baseHref, stripIndexHtml(url)));
    };
    /**
     * Given a string representing a URL, returns the normalized URL path.
     * If the given URL doesn't begin with a leading slash (`'/'`), this method adds one
     * before normalizing.
     */
    Location.prototype.normalizeAbsolutely = function (url) {
        if (!url.startsWith('/')) {
            url = '/' + url;
        }
        return stripTrailingSlash(_addBaseHref(this._baseHref, url));
    };
    /**
     * Changes the browsers URL to the normalized version of the given URL, and pushes a
     * new item onto the platform's history.
     */
    Location.prototype.go = function (url) {
        var finalUrl = this.normalizeAbsolutely(url);
        this.platformStrategy.pushState(null, '', finalUrl);
    };
    /**
     * Navigates forward in the platform's history.
     */
    Location.prototype.forward = function () { this.platformStrategy.forward(); };
    /**
     * Navigates back in the platform's history.
     */
    Location.prototype.back = function () { this.platformStrategy.back(); };
    /**
     * Subscribe to the platform's `popState` events.
     */
    Location.prototype.subscribe = function (onNext, onThrow, onReturn) {
        if (onThrow === void 0) { onThrow = null; }
        if (onReturn === void 0) { onReturn = null; }
        async_1.ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
    };
    Location = __decorate([
        di_1.Injectable(),
        __param(1, di_1.Optional()),
        __param(1, di_1.Inject(exports.APP_BASE_HREF)), 
        __metadata('design:paramtypes', [location_strategy_1.LocationStrategy, String])
    ], Location);
    return Location;
})();
exports.Location = Location;
function _stripBaseHref(baseHref, url) {
    if (baseHref.length > 0 && url.startsWith(baseHref)) {
        return url.substring(baseHref.length);
    }
    return url;
}
function _addBaseHref(baseHref, url) {
    if (!url.startsWith(baseHref)) {
        return baseHref + url;
    }
    return url;
}
function stripIndexHtml(url) {
    if (/\/index.html$/g.test(url)) {
        // '/index.html'.length == 11
        return url.substring(0, url.length - 11);
    }
    return url;
}
function stripTrailingSlash(url) {
    if (/\/$/g.test(url)) {
        url = url.substring(0, url.length - 1);
    }
    return url;
}
//# sourceMappingURL=location.js.map