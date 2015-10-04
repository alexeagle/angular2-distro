var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
var di_1 = require('angular2/src/core/di');
var location_strategy_1 = require('./location_strategy');
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
var PathLocationStrategy = (function (_super) {
    __extends(PathLocationStrategy, _super);
    function PathLocationStrategy() {
        _super.call(this);
        this._location = dom_adapter_1.DOM.getLocation();
        this._history = dom_adapter_1.DOM.getHistory();
        this._baseHref = dom_adapter_1.DOM.getBaseHref();
    }
    PathLocationStrategy.prototype.onPopState = function (fn) {
        dom_adapter_1.DOM.getGlobalEventTarget('window').addEventListener('popstate', fn, false);
    };
    PathLocationStrategy.prototype.getBaseHref = function () { return this._baseHref; };
    PathLocationStrategy.prototype.path = function () { return this._location.pathname; };
    PathLocationStrategy.prototype.pushState = function (state, title, url) { this._history.pushState(state, title, url); };
    PathLocationStrategy.prototype.forward = function () { this._history.forward(); };
    PathLocationStrategy.prototype.back = function () { this._history.back(); };
    PathLocationStrategy = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PathLocationStrategy);
    return PathLocationStrategy;
})(location_strategy_1.LocationStrategy);
exports.PathLocationStrategy = PathLocationStrategy;
//# sourceMappingURL=path_location_strategy.js.map