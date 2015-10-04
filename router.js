/**
 * @module
 * @description
 * Maps application URLs into application states, to support deep-linking and navigation.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var router_1 = require('./src/router/router');
exports.Router = router_1.Router;
var router_outlet_1 = require('./src/router/router_outlet');
exports.RouterOutlet = router_outlet_1.RouterOutlet;
var router_link_1 = require('./src/router/router_link');
exports.RouterLink = router_link_1.RouterLink;
var instruction_1 = require('./src/router/instruction');
exports.RouteParams = instruction_1.RouteParams;
var route_registry_1 = require('./src/router/route_registry');
exports.RouteRegistry = route_registry_1.RouteRegistry;
var location_strategy_1 = require('./src/router/location_strategy');
exports.LocationStrategy = location_strategy_1.LocationStrategy;
var hash_location_strategy_1 = require('./src/router/hash_location_strategy');
exports.HashLocationStrategy = hash_location_strategy_1.HashLocationStrategy;
var path_location_strategy_1 = require('./src/router/path_location_strategy');
exports.PathLocationStrategy = path_location_strategy_1.PathLocationStrategy;
var location_1 = require('./src/router/location');
exports.Location = location_1.Location;
exports.APP_BASE_HREF = location_1.APP_BASE_HREF;
__export(require('./src/router/route_config_decorator'));
__export(require('./src/router/route_definition'));
var lifecycle_annotations_1 = require('./src/router/lifecycle_annotations');
exports.CanActivate = lifecycle_annotations_1.CanActivate;
var instruction_2 = require('./src/router/instruction');
exports.Instruction = instruction_2.Instruction;
exports.ComponentInstruction = instruction_2.ComponentInstruction;
var angular2_1 = require('angular2/angular2');
exports.OpaqueToken = angular2_1.OpaqueToken;
var route_data_1 = require('./src/router/route_data');
exports.ROUTE_DATA = route_data_1.ROUTE_DATA;
var location_strategy_2 = require('./src/router/location_strategy');
var path_location_strategy_2 = require('./src/router/path_location_strategy');
var router_2 = require('./src/router/router');
var router_outlet_2 = require('./src/router/router_outlet');
var router_link_2 = require('./src/router/router_link');
var route_registry_2 = require('./src/router/route_registry');
var location_2 = require('./src/router/location');
var core_1 = require('./core');
var lang_1 = require('./src/core/facade/lang');
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
exports.ROUTER_PRIMARY_COMPONENT = lang_1.CONST_EXPR(new core_1.OpaqueToken('RouterPrimaryComponent'));
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
exports.ROUTER_DIRECTIVES = lang_1.CONST_EXPR([router_outlet_2.RouterOutlet, router_link_2.RouterLink]);
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
exports.ROUTER_BINDINGS = lang_1.CONST_EXPR([
    route_registry_2.RouteRegistry,
    lang_1.CONST_EXPR(new core_1.Binding(location_strategy_2.LocationStrategy, { toClass: path_location_strategy_2.PathLocationStrategy })),
    location_2.Location,
    lang_1.CONST_EXPR(new core_1.Binding(router_2.Router, {
        toFactory: routerFactory,
        deps: lang_1.CONST_EXPR([route_registry_2.RouteRegistry, location_2.Location, exports.ROUTER_PRIMARY_COMPONENT])
    }))
]);
function routerFactory(registry, location, primaryComponent) {
    return new router_2.RootRouter(registry, location, primaryComponent);
}
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
function routerBindings(primaryComponent) {
    return [exports.ROUTER_BINDINGS, core_1.bind(exports.ROUTER_PRIMARY_COMPONENT).toValue(primaryComponent)];
}
exports.routerBindings = routerBindings;
//# sourceMappingURL=router.js.map