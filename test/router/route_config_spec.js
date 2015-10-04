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
var test_lib_1 = require('angular2/test_lib');
var bootstrap_1 = require('angular2/bootstrap');
var metadata_1 = require('angular2/src/core/metadata');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
var core_1 = require('angular2/core');
var render_1 = require('angular2/src/core/render/render');
var router_1 = require('angular2/router');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var location_strategy_1 = require('angular2/src/router/location_strategy');
var mock_location_strategy_1 = require('angular2/src/mock/mock_location_strategy');
var _ArrayLogger = (function () {
    function _ArrayLogger() {
        this.res = [];
    }
    _ArrayLogger.prototype.log = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logError = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logGroup = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logGroupEnd = function () { };
    ;
    return _ArrayLogger;
})();
function main() {
    test_lib_1.describe('RouteConfig with POJO arguments', function () {
        var fakeDoc, el, testBindings;
        test_lib_1.beforeEach(function () {
            fakeDoc = dom_adapter_1.DOM.createHtmlDocument();
            el = dom_adapter_1.DOM.createElement('app-cmp', fakeDoc);
            dom_adapter_1.DOM.appendChild(fakeDoc.body, el);
            var logger = new _ArrayLogger();
            var exceptionHandler = new exceptions_1.ExceptionHandler(logger, true);
            testBindings = [
                router_1.ROUTER_BINDINGS,
                core_1.bind(location_strategy_1.LocationStrategy).toClass(mock_location_strategy_1.MockLocationStrategy),
                core_1.bind(render_1.DOCUMENT).toValue(fakeDoc),
                core_1.bind(exceptions_1.ExceptionHandler).toValue(exceptionHandler)
            ];
        });
        test_lib_1.it('should bootstrap an app with a hierarchy', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            bootstrap_1.bootstrap(HierarchyAppCmp, [core_1.bind(router_1.ROUTER_PRIMARY_COMPONENT).toValue(HierarchyAppCmp), testBindings])
                .then(function (applicationRef) {
                var router = applicationRef.hostComponent.router;
                router.subscribe(function (_) {
                    test_lib_1.expect(el).toHaveText('root { parent { hello } }');
                    test_lib_1.expect(applicationRef.hostComponent.location.path()).toEqual('/parent/child');
                    async.done();
                });
                router.navigateByUrl('/parent/child');
            });
        }));
        test_lib_1.it('should work in an app with redirects', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            bootstrap_1.bootstrap(RedirectAppCmp, [core_1.bind(router_1.ROUTER_PRIMARY_COMPONENT).toValue(RedirectAppCmp), testBindings])
                .then(function (applicationRef) {
                var router = applicationRef.hostComponent.router;
                router.subscribe(function (_) {
                    test_lib_1.expect(el).toHaveText('root { hello }');
                    test_lib_1.expect(applicationRef.hostComponent.location.path()).toEqual('/after');
                    async.done();
                });
                router.navigateByUrl('/before');
            });
        }));
        test_lib_1.it('should work in an app with async components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            bootstrap_1.bootstrap(AsyncAppCmp, [core_1.bind(router_1.ROUTER_PRIMARY_COMPONENT).toValue(AsyncAppCmp), testBindings])
                .then(function (applicationRef) {
                var router = applicationRef.hostComponent.router;
                router.subscribe(function (_) {
                    test_lib_1.expect(el).toHaveText('root { hello }');
                    test_lib_1.expect(applicationRef.hostComponent.location.path()).toEqual('/hello');
                    async.done();
                });
                router.navigateByUrl('/hello');
            });
        }));
        test_lib_1.it('should work in an app with a constructor component', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            bootstrap_1.bootstrap(ExplicitConstructorAppCmp, [core_1.bind(router_1.ROUTER_PRIMARY_COMPONENT).toValue(ExplicitConstructorAppCmp), testBindings])
                .then(function (applicationRef) {
                var router = applicationRef.hostComponent.router;
                router.subscribe(function (_) {
                    test_lib_1.expect(el).toHaveText('root { hello }');
                    test_lib_1.expect(applicationRef.hostComponent.location.path()).toEqual('/hello');
                    async.done();
                });
                router.navigateByUrl('/hello');
            });
        }));
        test_lib_1.it('should throw if a config is missing a target', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            bootstrap_1.bootstrap(WrongConfigCmp, [core_1.bind(router_1.ROUTER_PRIMARY_COMPONENT).toValue(WrongConfigCmp), testBindings])
                .catch(function (e) {
                test_lib_1.expect(e.originalException)
                    .toContainError('Route config should contain exactly one "component", "loader", or "redirectTo" property.');
                async.done();
                return null;
            });
        }));
        test_lib_1.it('should throw if a config has an invalid component type', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            bootstrap_1.bootstrap(WrongComponentTypeCmp, [core_1.bind(router_1.ROUTER_PRIMARY_COMPONENT).toValue(WrongComponentTypeCmp), testBindings])
                .catch(function (e) {
                test_lib_1.expect(e.originalException)
                    .toContainError('Invalid component type "intentionallyWrongComponentType". Valid types are "constructor" and "loader".');
                async.done();
                return null;
            });
        }));
        test_lib_1.it('should throw if a config has an invalid alias name', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            bootstrap_1.bootstrap(BadAliasCmp, [core_1.bind(router_1.ROUTER_PRIMARY_COMPONENT).toValue(BadAliasCmp), testBindings])
                .catch(function (e) {
                test_lib_1.expect(e.originalException)
                    .toContainError("Route '/child' with alias 'child' does not begin with an uppercase letter. Route aliases should be CamelCase like 'Child'.");
                async.done();
                return null;
            });
        }));
    });
}
exports.main = main;
var HelloCmp = (function () {
    function HelloCmp() {
    }
    HelloCmp = __decorate([
        metadata_1.Component({ selector: 'hello-cmp' }),
        metadata_1.View({ template: 'hello' }), 
        __metadata('design:paramtypes', [])
    ], HelloCmp);
    return HelloCmp;
})();
var RedirectAppCmp = (function () {
    function RedirectAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    RedirectAppCmp = __decorate([
        metadata_1.Component({ selector: 'app-cmp' }),
        metadata_1.View({ template: "root { <router-outlet></router-outlet> }", directives: router_1.ROUTER_DIRECTIVES }),
        router_1.RouteConfig([{ path: '/before', redirectTo: '/after' }, { path: '/after', component: HelloCmp }]), 
        __metadata('design:paramtypes', [router_1.Router, location_strategy_1.LocationStrategy])
    ], RedirectAppCmp);
    return RedirectAppCmp;
})();
function HelloLoader() {
    return Promise.resolve(HelloCmp);
}
var AsyncAppCmp = (function () {
    function AsyncAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    AsyncAppCmp = __decorate([
        metadata_1.Component({ selector: 'app-cmp' }),
        metadata_1.View({ template: "root { <router-outlet></router-outlet> }", directives: router_1.ROUTER_DIRECTIVES }),
        router_1.RouteConfig([
            { path: '/hello', component: { type: 'loader', loader: HelloLoader } },
        ]), 
        __metadata('design:paramtypes', [router_1.Router, location_strategy_1.LocationStrategy])
    ], AsyncAppCmp);
    return AsyncAppCmp;
})();
var ExplicitConstructorAppCmp = (function () {
    function ExplicitConstructorAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    ExplicitConstructorAppCmp = __decorate([
        metadata_1.Component({ selector: 'app-cmp' }),
        metadata_1.View({ template: "root { <router-outlet></router-outlet> }", directives: router_1.ROUTER_DIRECTIVES }),
        router_1.RouteConfig([
            { path: '/hello', component: { type: 'constructor', constructor: HelloCmp } },
        ]), 
        __metadata('design:paramtypes', [router_1.Router, location_strategy_1.LocationStrategy])
    ], ExplicitConstructorAppCmp);
    return ExplicitConstructorAppCmp;
})();
var ParentCmp = (function () {
    function ParentCmp() {
    }
    ParentCmp = __decorate([
        metadata_1.Component({ selector: 'parent-cmp' }),
        metadata_1.View({ template: "parent { <router-outlet></router-outlet> }", directives: router_1.ROUTER_DIRECTIVES }),
        router_1.RouteConfig([{ path: '/child', component: HelloCmp }]), 
        __metadata('design:paramtypes', [])
    ], ParentCmp);
    return ParentCmp;
})();
var HierarchyAppCmp = (function () {
    function HierarchyAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    HierarchyAppCmp = __decorate([
        metadata_1.Component({ selector: 'app-cmp' }),
        metadata_1.View({ template: "root { <router-outlet></router-outlet> }", directives: router_1.ROUTER_DIRECTIVES }),
        router_1.RouteConfig([{ path: '/parent/...', component: ParentCmp }]), 
        __metadata('design:paramtypes', [router_1.Router, location_strategy_1.LocationStrategy])
    ], HierarchyAppCmp);
    return HierarchyAppCmp;
})();
var WrongConfigCmp = (function () {
    function WrongConfigCmp() {
    }
    WrongConfigCmp = __decorate([
        metadata_1.Component({ selector: 'app-cmp' }),
        metadata_1.View({ template: "root { <router-outlet></router-outlet> }", directives: router_1.ROUTER_DIRECTIVES }),
        router_1.RouteConfig([{ path: '/hello' }]), 
        __metadata('design:paramtypes', [])
    ], WrongConfigCmp);
    return WrongConfigCmp;
})();
var BadAliasCmp = (function () {
    function BadAliasCmp() {
    }
    BadAliasCmp = __decorate([
        metadata_1.Component({ selector: 'app-cmp' }),
        metadata_1.View({ template: "root { <router-outlet></router-outlet> }", directives: router_1.ROUTER_DIRECTIVES }),
        router_1.RouteConfig([{ path: '/child', component: HelloCmp, as: 'child' }]), 
        __metadata('design:paramtypes', [])
    ], BadAliasCmp);
    return BadAliasCmp;
})();
var WrongComponentTypeCmp = (function () {
    function WrongComponentTypeCmp() {
    }
    WrongComponentTypeCmp = __decorate([
        metadata_1.Component({ selector: 'app-cmp' }),
        metadata_1.View({ template: "root { <router-outlet></router-outlet> }", directives: router_1.ROUTER_DIRECTIVES }),
        router_1.RouteConfig([
            { path: '/hello', component: { type: 'intentionallyWrongComponentType', constructor: HelloCmp } },
        ]), 
        __metadata('design:paramtypes', [])
    ], WrongComponentTypeCmp);
    return WrongComponentTypeCmp;
})();
//# sourceMappingURL=route_config_spec.js.map