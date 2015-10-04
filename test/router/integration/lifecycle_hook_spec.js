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
var core_1 = require('angular2/core');
var lang_1 = require('angular2/src/core/facade/lang');
var async_1 = require('angular2/src/core/facade/async');
var router_1 = require('angular2/src/router/router');
var router_2 = require('angular2/router');
var route_config_decorator_1 = require('angular2/src/router/route_config_decorator');
var location_mock_1 = require('angular2/src/mock/location_mock');
var location_1 = require('angular2/src/router/location');
var route_registry_1 = require('angular2/src/router/route_registry');
var lifecycle_annotations_1 = require('angular2/src/router/lifecycle_annotations');
var directive_resolver_1 = require('angular2/src/core/linker/directive_resolver');
var cmpInstanceCount;
var log;
var eventBus;
var completer;
function main() {
    test_lib_1.describe('Router lifecycle hooks', function () {
        var tcb;
        var rootTC;
        var rtr;
        test_lib_1.beforeEachBindings(function () { return [
            route_registry_1.RouteRegistry,
            directive_resolver_1.DirectiveResolver,
            core_1.bind(location_1.Location).toClass(location_mock_1.SpyLocation),
            core_1.bind(router_2.Router)
                .toFactory(function (registry, location) { return new router_1.RootRouter(registry, location, MyComp); }, [route_registry_1.RouteRegistry, location_1.Location])
        ]; });
        test_lib_1.beforeEach(test_lib_1.inject([test_lib_1.TestComponentBuilder, router_2.Router], function (tcBuilder, router) {
            tcb = tcBuilder;
            rtr = router;
            cmpInstanceCount = 0;
            log = [];
            eventBus = new async_1.EventEmitter();
        }));
        function compile(template) {
            if (template === void 0) { template = "<router-outlet></router-outlet>"; }
            return tcb.overrideView(MyComp, new core_1.View({
                template: ('<div>' + template + '</div>'),
                directives: [router_2.RouterOutlet, router_2.RouterLink]
            }))
                .createAsync(MyComp)
                .then(function (tc) { rootTC = tc; });
        }
        test_lib_1.it('should call the onActivate hook', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/on-activate'); })
                .then(function (_) {
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('activate cmp');
                test_lib_1.expect(log).toEqual(['activate: null -> /on-activate']);
                async.done();
            });
        }));
        test_lib_1.it('should wait for a parent component\'s onActivate hook to resolve before calling its child\'s', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) {
                async_1.ObservableWrapper.subscribe(eventBus, function (ev) {
                    if (ev.startsWith('parent activate')) {
                        completer.resolve(true);
                    }
                });
                rtr.navigateByUrl('/parent-activate/child-activate')
                    .then(function (_) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('parent {activate cmp}');
                    test_lib_1.expect(log).toEqual([
                        'parent activate: null -> /parent-activate',
                        'activate: null -> /child-activate'
                    ]);
                    async.done();
                });
            });
        }));
        test_lib_1.it('should call the onDeactivate hook', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/on-deactivate'); })
                .then(function (_) { return rtr.navigateByUrl('/a'); })
                .then(function (_) {
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('A');
                test_lib_1.expect(log).toEqual(['deactivate: /on-deactivate -> /a']);
                async.done();
            });
        }));
        test_lib_1.it('should wait for a child component\'s onDeactivate hook to resolve before calling its parent\'s', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/parent-deactivate/child-deactivate'); })
                .then(function (_) {
                async_1.ObservableWrapper.subscribe(eventBus, function (ev) {
                    if (ev.startsWith('deactivate')) {
                        completer.resolve(true);
                        rootTC.detectChanges();
                        test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('parent {deactivate cmp}');
                    }
                });
                rtr.navigateByUrl('/a').then(function (_) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('A');
                    test_lib_1.expect(log).toEqual([
                        'deactivate: /child-deactivate -> null',
                        'parent deactivate: /parent-deactivate -> /a'
                    ]);
                    async.done();
                });
            });
        }));
        test_lib_1.it('should reuse a component when the canReuse hook returns true', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/on-reuse/1/a'); })
                .then(function (_) {
                rootTC.detectChanges();
                test_lib_1.expect(log).toEqual([]);
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('reuse {A}');
                test_lib_1.expect(cmpInstanceCount).toBe(1);
            })
                .then(function (_) { return rtr.navigateByUrl('/on-reuse/2/b'); })
                .then(function (_) {
                rootTC.detectChanges();
                test_lib_1.expect(log).toEqual(['reuse: /on-reuse/1 -> /on-reuse/2']);
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('reuse {B}');
                test_lib_1.expect(cmpInstanceCount).toBe(1);
                async.done();
            });
        }));
        test_lib_1.it('should not reuse a component when the canReuse hook returns false', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/never-reuse/1/a'); })
                .then(function (_) {
                rootTC.detectChanges();
                test_lib_1.expect(log).toEqual([]);
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('reuse {A}');
                test_lib_1.expect(cmpInstanceCount).toBe(1);
            })
                .then(function (_) { return rtr.navigateByUrl('/never-reuse/2/b'); })
                .then(function (_) {
                rootTC.detectChanges();
                test_lib_1.expect(log).toEqual([]);
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('reuse {B}');
                test_lib_1.expect(cmpInstanceCount).toBe(2);
                async.done();
            });
        }));
        test_lib_1.it('should navigate when canActivate returns true', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) {
                async_1.ObservableWrapper.subscribe(eventBus, function (ev) {
                    if (ev.startsWith('canActivate')) {
                        completer.resolve(true);
                    }
                });
                rtr.navigateByUrl('/can-activate/a')
                    .then(function (_) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('canActivate {A}');
                    test_lib_1.expect(log).toEqual(['canActivate: null -> /can-activate']);
                    async.done();
                });
            });
        }));
        test_lib_1.it('should not navigate when canActivate returns false', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) {
                async_1.ObservableWrapper.subscribe(eventBus, function (ev) {
                    if (ev.startsWith('canActivate')) {
                        completer.resolve(false);
                    }
                });
                rtr.navigateByUrl('/can-activate/a')
                    .then(function (_) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('');
                    test_lib_1.expect(log).toEqual(['canActivate: null -> /can-activate']);
                    async.done();
                });
            });
        }));
        test_lib_1.it('should navigate away when canDeactivate returns true', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/can-deactivate/a'); })
                .then(function (_) {
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('canDeactivate {A}');
                test_lib_1.expect(log).toEqual([]);
                async_1.ObservableWrapper.subscribe(eventBus, function (ev) {
                    if (ev.startsWith('canDeactivate')) {
                        completer.resolve(true);
                    }
                });
                rtr.navigateByUrl('/a').then(function (_) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('A');
                    test_lib_1.expect(log).toEqual(['canDeactivate: /can-deactivate -> /a']);
                    async.done();
                });
            });
        }));
        test_lib_1.it('should not navigate away when canDeactivate returns false', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/can-deactivate/a'); })
                .then(function (_) {
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('canDeactivate {A}');
                test_lib_1.expect(log).toEqual([]);
                async_1.ObservableWrapper.subscribe(eventBus, function (ev) {
                    if (ev.startsWith('canDeactivate')) {
                        completer.resolve(false);
                    }
                });
                rtr.navigateByUrl('/a').then(function (_) {
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('canDeactivate {A}');
                    test_lib_1.expect(log).toEqual(['canDeactivate: /can-deactivate -> /a']);
                    async.done();
                });
            });
        }));
        test_lib_1.it('should run activation and deactivation hooks in the correct order', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/activation-hooks/child'); })
                .then(function (_) {
                test_lib_1.expect(log).toEqual([
                    'canActivate child: null -> /child',
                    'canActivate parent: null -> /activation-hooks',
                    'onActivate parent: null -> /activation-hooks',
                    'onActivate child: null -> /child'
                ]);
                log = [];
                return rtr.navigateByUrl('/a');
            })
                .then(function (_) {
                test_lib_1.expect(log).toEqual([
                    'canDeactivate parent: /activation-hooks -> /a',
                    'canDeactivate child: /child -> null',
                    'onDeactivate child: /child -> null',
                    'onDeactivate parent: /activation-hooks -> /a'
                ]);
                async.done();
            });
        }));
        test_lib_1.it('should only run reuse hooks when reusing', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/reuse-hooks/1'); })
                .then(function (_) {
                test_lib_1.expect(log).toEqual(['canActivate: null -> /reuse-hooks/1', 'onActivate: null -> /reuse-hooks/1']);
                async_1.ObservableWrapper.subscribe(eventBus, function (ev) {
                    if (ev.startsWith('canReuse')) {
                        completer.resolve(true);
                    }
                });
                log = [];
                return rtr.navigateByUrl('/reuse-hooks/2');
            })
                .then(function (_) {
                test_lib_1.expect(log).toEqual([
                    'canReuse: /reuse-hooks/1 -> /reuse-hooks/2',
                    'onReuse: /reuse-hooks/1 -> /reuse-hooks/2'
                ]);
                async.done();
            });
        }));
        test_lib_1.it('should not run reuse hooks when not reusing', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/reuse-hooks/1'); })
                .then(function (_) {
                test_lib_1.expect(log).toEqual(['canActivate: null -> /reuse-hooks/1', 'onActivate: null -> /reuse-hooks/1']);
                async_1.ObservableWrapper.subscribe(eventBus, function (ev) {
                    if (ev.startsWith('canReuse')) {
                        completer.resolve(false);
                    }
                });
                log = [];
                return rtr.navigateByUrl('/reuse-hooks/2');
            })
                .then(function (_) {
                test_lib_1.expect(log).toEqual([
                    'canReuse: /reuse-hooks/1 -> /reuse-hooks/2',
                    'canActivate: /reuse-hooks/1 -> /reuse-hooks/2',
                    'canDeactivate: /reuse-hooks/1 -> /reuse-hooks/2',
                    'onDeactivate: /reuse-hooks/1 -> /reuse-hooks/2',
                    'onActivate: /reuse-hooks/1 -> /reuse-hooks/2'
                ]);
                async.done();
            });
        }));
    });
}
exports.main = main;
var A = (function () {
    function A() {
    }
    A = __decorate([
        core_1.Component({ selector: 'a-cmp' }),
        core_1.View({ template: "A" }), 
        __metadata('design:paramtypes', [])
    ], A);
    return A;
})();
var B = (function () {
    function B() {
    }
    B = __decorate([
        core_1.Component({ selector: 'b-cmp' }),
        core_1.View({ template: "B" }), 
        __metadata('design:paramtypes', [])
    ], B);
    return B;
})();
var MyComp = (function () {
    function MyComp() {
    }
    MyComp = __decorate([
        core_1.Component({ selector: 'my-comp' }), 
        __metadata('design:paramtypes', [])
    ], MyComp);
    return MyComp;
})();
function logHook(name, next, prev) {
    var message = name + ': ' + (lang_1.isPresent(prev) ? ('/' + prev.urlPath) : 'null') + ' -> ' +
        (lang_1.isPresent(next) ? ('/' + next.urlPath) : 'null');
    log.push(message);
    async_1.ObservableWrapper.callNext(eventBus, message);
}
var ActivateCmp = (function () {
    function ActivateCmp() {
    }
    ActivateCmp.prototype.onActivate = function (next, prev) {
        logHook('activate', next, prev);
    };
    ActivateCmp = __decorate([
        core_1.Component({ selector: 'activate-cmp' }),
        core_1.View({ template: 'activate cmp' }), 
        __metadata('design:paramtypes', [])
    ], ActivateCmp);
    return ActivateCmp;
})();
var ParentActivateCmp = (function () {
    function ParentActivateCmp() {
    }
    ParentActivateCmp.prototype.onActivate = function (next, prev) {
        completer = async_1.PromiseWrapper.completer();
        logHook('parent activate', next, prev);
        return completer.promise;
    };
    ParentActivateCmp = __decorate([
        core_1.Component({ selector: 'parent-activate-cmp' }),
        core_1.View({ template: "parent {<router-outlet></router-outlet>}", directives: [router_2.RouterOutlet] }),
        route_config_decorator_1.RouteConfig([new route_config_decorator_1.Route({ path: '/child-activate', component: ActivateCmp })]), 
        __metadata('design:paramtypes', [])
    ], ParentActivateCmp);
    return ParentActivateCmp;
})();
var DeactivateCmp = (function () {
    function DeactivateCmp() {
    }
    DeactivateCmp.prototype.onDeactivate = function (next, prev) {
        logHook('deactivate', next, prev);
    };
    DeactivateCmp = __decorate([
        core_1.Component({ selector: 'deactivate-cmp' }),
        core_1.View({ template: 'deactivate cmp' }), 
        __metadata('design:paramtypes', [])
    ], DeactivateCmp);
    return DeactivateCmp;
})();
var WaitDeactivateCmp = (function () {
    function WaitDeactivateCmp() {
    }
    WaitDeactivateCmp.prototype.onDeactivate = function (next, prev) {
        completer = async_1.PromiseWrapper.completer();
        logHook('deactivate', next, prev);
        return completer.promise;
    };
    WaitDeactivateCmp = __decorate([
        core_1.Component({ selector: 'deactivate-cmp' }),
        core_1.View({ template: 'deactivate cmp' }), 
        __metadata('design:paramtypes', [])
    ], WaitDeactivateCmp);
    return WaitDeactivateCmp;
})();
var ParentDeactivateCmp = (function () {
    function ParentDeactivateCmp() {
    }
    ParentDeactivateCmp.prototype.onDeactivate = function (next, prev) {
        logHook('parent deactivate', next, prev);
    };
    ParentDeactivateCmp = __decorate([
        core_1.Component({ selector: 'parent-deactivate-cmp' }),
        core_1.View({ template: "parent {<router-outlet></router-outlet>}", directives: [router_2.RouterOutlet] }),
        route_config_decorator_1.RouteConfig([new route_config_decorator_1.Route({ path: '/child-deactivate', component: WaitDeactivateCmp })]), 
        __metadata('design:paramtypes', [])
    ], ParentDeactivateCmp);
    return ParentDeactivateCmp;
})();
var ReuseCmp = (function () {
    function ReuseCmp() {
        cmpInstanceCount += 1;
    }
    ReuseCmp.prototype.canReuse = function (next, prev) { return true; };
    ReuseCmp.prototype.onReuse = function (next, prev) { logHook('reuse', next, prev); };
    ReuseCmp = __decorate([
        core_1.Component({ selector: 'reuse-cmp' }),
        core_1.View({ template: "reuse {<router-outlet></router-outlet>}", directives: [router_2.RouterOutlet] }),
        route_config_decorator_1.RouteConfig([new route_config_decorator_1.Route({ path: '/a', component: A }), new route_config_decorator_1.Route({ path: '/b', component: B })]), 
        __metadata('design:paramtypes', [])
    ], ReuseCmp);
    return ReuseCmp;
})();
var NeverReuseCmp = (function () {
    function NeverReuseCmp() {
        cmpInstanceCount += 1;
    }
    NeverReuseCmp.prototype.canReuse = function (next, prev) { return false; };
    NeverReuseCmp.prototype.onReuse = function (next, prev) { logHook('reuse', next, prev); };
    NeverReuseCmp = __decorate([
        core_1.Component({ selector: 'never-reuse-cmp' }),
        core_1.View({ template: "reuse {<router-outlet></router-outlet>}", directives: [router_2.RouterOutlet] }),
        route_config_decorator_1.RouteConfig([new route_config_decorator_1.Route({ path: '/a', component: A }), new route_config_decorator_1.Route({ path: '/b', component: B })]), 
        __metadata('design:paramtypes', [])
    ], NeverReuseCmp);
    return NeverReuseCmp;
})();
var CanActivateCmp = (function () {
    function CanActivateCmp() {
    }
    CanActivateCmp.canActivate = function (next, prev) {
        completer = async_1.PromiseWrapper.completer();
        logHook('canActivate', next, prev);
        return completer.promise;
    };
    CanActivateCmp = __decorate([
        core_1.Component({ selector: 'can-activate-cmp' }),
        core_1.View({ template: "canActivate {<router-outlet></router-outlet>}", directives: [router_2.RouterOutlet] }),
        route_config_decorator_1.RouteConfig([new route_config_decorator_1.Route({ path: '/a', component: A }), new route_config_decorator_1.Route({ path: '/b', component: B })]),
        lifecycle_annotations_1.CanActivate(CanActivateCmp.canActivate), 
        __metadata('design:paramtypes', [])
    ], CanActivateCmp);
    return CanActivateCmp;
})();
var CanDeactivateCmp = (function () {
    function CanDeactivateCmp() {
    }
    CanDeactivateCmp.prototype.canDeactivate = function (next, prev) {
        completer = async_1.PromiseWrapper.completer();
        logHook('canDeactivate', next, prev);
        return completer.promise;
    };
    CanDeactivateCmp = __decorate([
        core_1.Component({ selector: 'can-deactivate-cmp' }),
        core_1.View({ template: "canDeactivate {<router-outlet></router-outlet>}", directives: [router_2.RouterOutlet] }),
        route_config_decorator_1.RouteConfig([new route_config_decorator_1.Route({ path: '/a', component: A }), new route_config_decorator_1.Route({ path: '/b', component: B })]), 
        __metadata('design:paramtypes', [])
    ], CanDeactivateCmp);
    return CanDeactivateCmp;
})();
var AllHooksChildCmp = (function () {
    function AllHooksChildCmp() {
    }
    AllHooksChildCmp.prototype.canDeactivate = function (next, prev) {
        logHook('canDeactivate child', next, prev);
        return true;
    };
    AllHooksChildCmp.prototype.onDeactivate = function (next, prev) {
        logHook('onDeactivate child', next, prev);
    };
    AllHooksChildCmp.canActivate = function (next, prev) {
        logHook('canActivate child', next, prev);
        return true;
    };
    AllHooksChildCmp.prototype.onActivate = function (next, prev) {
        logHook('onActivate child', next, prev);
    };
    AllHooksChildCmp = __decorate([
        core_1.Component({ selector: 'all-hooks-child-cmp' }),
        core_1.View({ template: "child" }),
        lifecycle_annotations_1.CanActivate(AllHooksChildCmp.canActivate), 
        __metadata('design:paramtypes', [])
    ], AllHooksChildCmp);
    return AllHooksChildCmp;
})();
var AllHooksParentCmp = (function () {
    function AllHooksParentCmp() {
    }
    AllHooksParentCmp.prototype.canDeactivate = function (next, prev) {
        logHook('canDeactivate parent', next, prev);
        return true;
    };
    AllHooksParentCmp.prototype.onDeactivate = function (next, prev) {
        logHook('onDeactivate parent', next, prev);
    };
    AllHooksParentCmp.canActivate = function (next, prev) {
        logHook('canActivate parent', next, prev);
        return true;
    };
    AllHooksParentCmp.prototype.onActivate = function (next, prev) {
        logHook('onActivate parent', next, prev);
    };
    AllHooksParentCmp = __decorate([
        core_1.Component({ selector: 'all-hooks-parent-cmp' }),
        core_1.View({ template: "<router-outlet></router-outlet>", directives: [router_2.RouterOutlet] }),
        route_config_decorator_1.RouteConfig([new route_config_decorator_1.Route({ path: '/child', component: AllHooksChildCmp })]),
        lifecycle_annotations_1.CanActivate(AllHooksParentCmp.canActivate), 
        __metadata('design:paramtypes', [])
    ], AllHooksParentCmp);
    return AllHooksParentCmp;
})();
var ReuseHooksCmp = (function () {
    function ReuseHooksCmp() {
    }
    ReuseHooksCmp.prototype.canReuse = function (next, prev) {
        completer = async_1.PromiseWrapper.completer();
        logHook('canReuse', next, prev);
        return completer.promise;
    };
    ReuseHooksCmp.prototype.onReuse = function (next, prev) {
        logHook('onReuse', next, prev);
    };
    ReuseHooksCmp.prototype.canDeactivate = function (next, prev) {
        logHook('canDeactivate', next, prev);
        return true;
    };
    ReuseHooksCmp.prototype.onDeactivate = function (next, prev) {
        logHook('onDeactivate', next, prev);
    };
    ReuseHooksCmp.canActivate = function (next, prev) {
        logHook('canActivate', next, prev);
        return true;
    };
    ReuseHooksCmp.prototype.onActivate = function (next, prev) {
        logHook('onActivate', next, prev);
    };
    ReuseHooksCmp = __decorate([
        core_1.Component({ selector: 'reuse-hooks-cmp' }),
        core_1.View({ template: 'reuse hooks cmp' }),
        lifecycle_annotations_1.CanActivate(ReuseHooksCmp.canActivate), 
        __metadata('design:paramtypes', [])
    ], ReuseHooksCmp);
    return ReuseHooksCmp;
})();
var LifecycleCmp = (function () {
    function LifecycleCmp() {
    }
    LifecycleCmp = __decorate([
        core_1.Component({ selector: 'lifecycle-cmp' }),
        core_1.View({ template: "<router-outlet></router-outlet>", directives: [router_2.RouterOutlet] }),
        route_config_decorator_1.RouteConfig([
            new route_config_decorator_1.Route({ path: '/a', component: A }),
            new route_config_decorator_1.Route({ path: '/on-activate', component: ActivateCmp }),
            new route_config_decorator_1.Route({ path: '/parent-activate/...', component: ParentActivateCmp }),
            new route_config_decorator_1.Route({ path: '/on-deactivate', component: DeactivateCmp }),
            new route_config_decorator_1.Route({ path: '/parent-deactivate/...', component: ParentDeactivateCmp }),
            new route_config_decorator_1.Route({ path: '/on-reuse/:number/...', component: ReuseCmp }),
            new route_config_decorator_1.Route({ path: '/never-reuse/:number/...', component: NeverReuseCmp }),
            new route_config_decorator_1.Route({ path: '/can-activate/...', component: CanActivateCmp }),
            new route_config_decorator_1.Route({ path: '/can-deactivate/...', component: CanDeactivateCmp }),
            new route_config_decorator_1.Route({ path: '/activation-hooks/...', component: AllHooksParentCmp }),
            new route_config_decorator_1.Route({ path: '/reuse-hooks/:number', component: ReuseHooksCmp })
        ]), 
        __metadata('design:paramtypes', [])
    ], LifecycleCmp);
    return LifecycleCmp;
})();
//# sourceMappingURL=lifecycle_hook_spec.js.map