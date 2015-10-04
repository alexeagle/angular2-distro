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
var lang_1 = require('angular2/src/core/facade/lang');
var async_1 = require('angular2/src/core/facade/async');
var core_1 = require('angular2/core');
var location_mock_1 = require('angular2/src/mock/location_mock');
var router_1 = require('angular2/router');
var router_2 = require('angular2/src/router/router');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
function main() {
    test_lib_1.describe('router-link directive', function () {
        var tcb;
        var rootTC;
        var router, location;
        test_lib_1.beforeEachBindings(function () { return [
            router_1.RouteRegistry,
            core_1.DirectiveResolver,
            core_1.bind(router_1.Location).toClass(location_mock_1.SpyLocation),
            core_1.bind(router_1.Router)
                .toFactory(function (registry, location) { return new router_2.RootRouter(registry, location, MyComp); }, [router_1.RouteRegistry, router_1.Location])
        ]; });
        test_lib_1.beforeEach(test_lib_1.inject([test_lib_1.TestComponentBuilder, router_1.Router, router_1.Location], function (tcBuilder, rtr, loc) {
            tcb = tcBuilder;
            router = rtr;
            location = loc;
        }));
        function compile(template) {
            if (template === void 0) { template = "<router-outlet></router-outlet>"; }
            return tcb.overrideView(MyComp, new core_1.View({
                template: ('<div>' + template + '</div>'),
                directives: [router_1.RouterOutlet, router_1.RouterLink]
            }))
                .createAsync(MyComp)
                .then(function (tc) { rootTC = tc; });
        }
        test_lib_1.it('should generate absolute hrefs that include the base href', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            location.setBaseHref('/my/base');
            compile('<a href="hello" [router-link]="[\'./User\']"></a>')
                .then(function (_) {
                return router.config([new router_1.Route({ path: '/user', component: UserCmp, as: 'User' })]);
            })
                .then(function (_) { return router.navigateByUrl('/a/b'); })
                .then(function (_) {
                rootTC.detectChanges();
                test_lib_1.expect(getHref(rootTC)).toEqual('/my/base/user');
                async.done();
            });
        }));
        test_lib_1.it('should generate link hrefs without params', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile('<a href="hello" [router-link]="[\'./User\']"></a>')
                .then(function (_) {
                return router.config([new router_1.Route({ path: '/user', component: UserCmp, as: 'User' })]);
            })
                .then(function (_) { return router.navigateByUrl('/a/b'); })
                .then(function (_) {
                rootTC.detectChanges();
                test_lib_1.expect(getHref(rootTC)).toEqual('/user');
                async.done();
            });
        }));
        test_lib_1.it('should generate link hrefs with params', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile('<a href="hello" [router-link]="[\'./User\', {name: name}]">{{name}}</a>')
                .then(function (_) { return router.config([new router_1.Route({ path: '/user/:name', component: UserCmp, as: 'User' })]); })
                .then(function (_) { return router.navigateByUrl('/a/b'); })
                .then(function (_) {
                rootTC.debugElement.componentInstance.name = 'brian';
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('brian');
                test_lib_1.expect(dom_adapter_1.DOM.getAttribute(rootTC.debugElement.componentViewChildren[0].nativeElement, 'href'))
                    .toEqual('/user/brian');
                async.done();
            });
        }));
        test_lib_1.it('should generate link hrefs from a child to its sibling', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return router.config([new router_1.Route({ path: '/page/:number', component: SiblingPageCmp, as: 'Page' })]); })
                .then(function (_) { return router.navigateByUrl('/page/1'); })
                .then(function (_) {
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.getAttribute(rootTC.debugElement.componentViewChildren[1]
                    .componentViewChildren[0]
                    .nativeElement, 'href'))
                    .toEqual('/page/2');
                async.done();
            });
        }));
        test_lib_1.it('should generate link hrefs when asynchronously loaded', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return router.config([
                new router_1.AsyncRoute({
                    path: '/child-with-grandchild/...',
                    loader: parentCmpLoader,
                    as: 'ChildWithGrandchild'
                })
            ]); })
                .then(function (_) { return router.navigate(['/ChildWithGrandchild']); })
                .then(function (_) {
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.getAttribute(rootTC.debugElement.componentViewChildren[1]
                    .componentViewChildren[0]
                    .nativeElement, 'href'))
                    .toEqual('/child-with-grandchild/grandchild');
                async.done();
            });
        }));
        test_lib_1.it('should generate relative links preserving the existing parent route', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return router.config([new router_1.Route({ path: '/book/:title/...', component: BookCmp, as: 'Book' })]); })
                .then(function (_) { return router.navigateByUrl('/book/1984/page/1'); })
                .then(function (_) {
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.getAttribute(rootTC.debugElement.componentViewChildren[1]
                    .componentViewChildren[0]
                    .nativeElement, 'href'))
                    .toEqual('/book/1984/page/100');
                test_lib_1.expect(dom_adapter_1.DOM.getAttribute(rootTC.debugElement.componentViewChildren[1]
                    .componentViewChildren[2]
                    .componentViewChildren[0]
                    .nativeElement, 'href'))
                    .toEqual('/book/1984/page/2');
                async.done();
            });
        }));
        test_lib_1.describe('router-link-active CSS class', function () {
            test_lib_1.it('should be added to the associated element', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                router.config([
                    new router_1.Route({ path: '/child', component: HelloCmp, as: 'Child' }),
                    new router_1.Route({ path: '/better-child', component: Hello2Cmp, as: 'BetterChild' })
                ])
                    .then(function (_) { return compile("<a [router-link]=\"['./Child']\" class=\"child-link\">Child</a>\n                                <a [router-link]=\"['./BetterChild']\" class=\"better-child-link\">Better Child</a>\n                                <router-outlet></router-outlet>"); })
                    .then(function (_) {
                    var element = rootTC.debugElement.nativeElement;
                    rootTC.detectChanges();
                    var link1 = dom_adapter_1.DOM.querySelector(element, '.child-link');
                    var link2 = dom_adapter_1.DOM.querySelector(element, '.better-child-link');
                    test_lib_1.expect(link1).not.toHaveCssClass('router-link-active');
                    test_lib_1.expect(link2).not.toHaveCssClass('router-link-active');
                    router.subscribe(function (_) {
                        rootTC.detectChanges();
                        test_lib_1.expect(link1).not.toHaveCssClass('router-link-active');
                        test_lib_1.expect(link2).toHaveCssClass('router-link-active');
                        async.done();
                    });
                    router.navigateByUrl('/better-child');
                });
            }));
            test_lib_1.it('should be added to links in child routes', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                router.config([
                    new router_1.Route({ path: '/child', component: HelloCmp, as: 'Child' }),
                    new router_1.Route({
                        path: '/child-with-grandchild/...',
                        component: ParentCmp,
                        as: 'ChildWithGrandchild'
                    })
                ])
                    .then(function (_) { return compile("<a [router-link]=\"['./Child']\" class=\"child-link\">Child</a>\n                                <a [router-link]=\"['./ChildWithGrandchild/Grandchild']\" class=\"child-with-grandchild-link\">Better Child</a>\n                                <router-outlet></router-outlet>"); })
                    .then(function (_) {
                    var element = rootTC.debugElement.nativeElement;
                    rootTC.detectChanges();
                    var link1 = dom_adapter_1.DOM.querySelector(element, '.child-link');
                    var link2 = dom_adapter_1.DOM.querySelector(element, '.child-with-grandchild-link');
                    test_lib_1.expect(link1).not.toHaveCssClass('router-link-active');
                    test_lib_1.expect(link2).not.toHaveCssClass('router-link-active');
                    router.subscribe(function (_) {
                        rootTC.detectChanges();
                        test_lib_1.expect(link1).not.toHaveCssClass('router-link-active');
                        test_lib_1.expect(link2).toHaveCssClass('router-link-active');
                        var link3 = dom_adapter_1.DOM.querySelector(element, '.grandchild-link');
                        var link4 = dom_adapter_1.DOM.querySelector(element, '.better-grandchild-link');
                        test_lib_1.expect(link3).toHaveCssClass('router-link-active');
                        test_lib_1.expect(link4).not.toHaveCssClass('router-link-active');
                        async.done();
                    });
                    router.navigateByUrl('/child-with-grandchild/grandchild');
                });
            }));
        });
        test_lib_1.describe('when clicked', function () {
            var clickOnElement = function (view) {
                var anchorEl = rootTC.debugElement.componentViewChildren[0].nativeElement;
                var dispatchedEvent = dom_adapter_1.DOM.createMouseEvent('click');
                dom_adapter_1.DOM.dispatchEvent(anchorEl, dispatchedEvent);
                return dispatchedEvent;
            };
            test_lib_1.it('should navigate to link hrefs without params', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                compile('<a href="hello" [router-link]="[\'./User\']"></a>')
                    .then(function (_) { return router.config([new router_1.Route({ path: '/user', component: UserCmp, as: 'User' })]); })
                    .then(function (_) { return router.navigateByUrl('/a/b'); })
                    .then(function (_) {
                    rootTC.detectChanges();
                    var dispatchedEvent = clickOnElement(rootTC);
                    test_lib_1.expect(dom_adapter_1.DOM.isPrevented(dispatchedEvent)).toBe(true);
                    // router navigation is async.
                    router.subscribe(function (_) {
                        test_lib_1.expect(location.urlChanges).toEqual(['/user']);
                        async.done();
                    });
                });
            }));
            test_lib_1.it('should navigate to link hrefs in presence of base href', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                location.setBaseHref('/base');
                compile('<a href="hello" [router-link]="[\'./User\']"></a>')
                    .then(function (_) { return router.config([new router_1.Route({ path: '/user', component: UserCmp, as: 'User' })]); })
                    .then(function (_) { return router.navigateByUrl('/a/b'); })
                    .then(function (_) {
                    rootTC.detectChanges();
                    var dispatchedEvent = clickOnElement(rootTC);
                    test_lib_1.expect(dom_adapter_1.DOM.isPrevented(dispatchedEvent)).toBe(true);
                    // router navigation is async.
                    router.subscribe(function (_) {
                        test_lib_1.expect(location.urlChanges).toEqual(['/base/user']);
                        async.done();
                    });
                });
            }));
        });
    });
}
exports.main = main;
function getHref(tc) {
    return dom_adapter_1.DOM.getAttribute(tc.debugElement.componentViewChildren[0].nativeElement, 'href');
}
var MyComp = (function () {
    function MyComp() {
    }
    MyComp = __decorate([
        core_1.Component({ selector: 'my-comp' }), 
        __metadata('design:paramtypes', [])
    ], MyComp);
    return MyComp;
})();
var UserCmp = (function () {
    function UserCmp(params) {
        this.user = params.get('name');
    }
    UserCmp = __decorate([
        core_1.Component({ selector: 'user-cmp' }),
        core_1.View({ template: "hello {{user}}" }), 
        __metadata('design:paramtypes', [router_1.RouteParams])
    ], UserCmp);
    return UserCmp;
})();
var SiblingPageCmp = (function () {
    function SiblingPageCmp(params) {
        this.pageNumber = lang_1.NumberWrapper.parseInt(params.get('number'), 10);
        this.nextPage = this.pageNumber + 1;
    }
    SiblingPageCmp = __decorate([
        core_1.Component({ selector: 'page-cmp' }),
        core_1.View({
            template: "page #{{pageNumber}} | <a href=\"hello\" [router-link]=\"['../Page', {number: nextPage}]\">next</a>",
            directives: [router_1.RouterLink]
        }), 
        __metadata('design:paramtypes', [router_1.RouteParams])
    ], SiblingPageCmp);
    return SiblingPageCmp;
})();
var HelloCmp = (function () {
    function HelloCmp() {
    }
    HelloCmp = __decorate([
        core_1.Component({ selector: 'hello-cmp' }),
        core_1.View({ template: 'hello' }), 
        __metadata('design:paramtypes', [])
    ], HelloCmp);
    return HelloCmp;
})();
var Hello2Cmp = (function () {
    function Hello2Cmp() {
    }
    Hello2Cmp = __decorate([
        core_1.Component({ selector: 'hello2-cmp' }),
        core_1.View({ template: 'hello2' }), 
        __metadata('design:paramtypes', [])
    ], Hello2Cmp);
    return Hello2Cmp;
})();
function parentCmpLoader() {
    return async_1.PromiseWrapper.resolve(ParentCmp);
}
var ParentCmp = (function () {
    function ParentCmp(router) {
        this.router = router;
    }
    ParentCmp = __decorate([
        core_1.Component({ selector: 'parent-cmp' }),
        core_1.View({
            template: "{ <a [router-link]=\"['./Grandchild']\" class=\"grandchild-link\">Grandchild</a>\n               <a [router-link]=\"['./BetterGrandchild']\" class=\"better-grandchild-link\">Better Grandchild</a>\n               <router-outlet></router-outlet> }",
            directives: router_1.ROUTER_DIRECTIVES
        }),
        router_1.RouteConfig([
            new router_1.Route({ path: '/grandchild', component: HelloCmp, as: 'Grandchild' }),
            new router_1.Route({ path: '/better-grandchild', component: Hello2Cmp, as: 'BetterGrandchild' })
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], ParentCmp);
    return ParentCmp;
})();
var BookCmp = (function () {
    function BookCmp(params) {
        this.title = params.get('title');
    }
    BookCmp = __decorate([
        core_1.Component({ selector: 'book-cmp' }),
        core_1.View({
            template: "<a href=\"hello\" [router-link]=\"['./Page', {number: 100}]\">{{title}}</a> |\n    <router-outlet></router-outlet>",
            directives: router_1.ROUTER_DIRECTIVES
        }),
        router_1.RouteConfig([new router_1.Route({ path: '/page/:number', component: SiblingPageCmp, as: 'Page' })]), 
        __metadata('design:paramtypes', [router_1.RouteParams])
    ], BookCmp);
    return BookCmp;
})();
//# sourceMappingURL=router_link_spec.js.map