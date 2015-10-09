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
var spies_1 = require('./spies');
var core_1 = require('angular2/core');
var debug_1 = require('angular2/src/core/debug');
var router_1 = require('angular2/router');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
var instruction_1 = require("angular2/src/router/instruction");
var dummyInstruction = new router_1.Instruction(new instruction_1.ComponentInstruction_('detail', [], null), null, {});
function main() {
    test_lib_1.describe('router-link directive', function () {
        var tcb;
        test_lib_1.beforeEachBindings(function () {
            return [core_1.bind(router_1.Location).toValue(makeDummyLocation()), core_1.bind(router_1.Router).toValue(makeDummyRouter())];
        });
        test_lib_1.beforeEach(test_lib_1.inject([test_lib_1.TestComponentBuilder], function (tcBuilder) { tcb = tcBuilder; }));
        test_lib_1.it('should update a[href] attribute', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tcb.createAsync(TestComponent)
                .then(function (testComponent) {
                testComponent.detectChanges();
                var anchorElement = testComponent.debugElement.query(debug_1.By.css('a')).nativeElement;
                test_lib_1.expect(dom_adapter_1.DOM.getAttribute(anchorElement, 'href')).toEqual('/detail');
                async.done();
            });
        }));
        test_lib_1.it('should call router.navigate when a link is clicked', test_lib_1.inject([test_lib_1.AsyncTestCompleter, router_1.Router], function (async, router) {
            tcb.createAsync(TestComponent)
                .then(function (testComponent) {
                testComponent.detectChanges();
                // TODO: shouldn't this be just 'click' rather than '^click'?
                testComponent.debugElement.query(debug_1.By.css('a')).triggerEventHandler('click', null);
                test_lib_1.expect(router.spy('navigateByInstruction')).toHaveBeenCalledWith(dummyInstruction);
                async.done();
            });
        }));
    });
}
exports.main = main;
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
var TestComponent = (function () {
    function TestComponent() {
    }
    TestComponent = __decorate([
        core_1.Component({ selector: 'test-component' }),
        core_1.View({
            template: "\n    <div>\n      <a [router-link]=\"['/Detail']\">detail view</a>\n    </div>",
            directives: [router_1.RouterLink]
        }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
})();
function makeDummyLocation() {
    var dl = new spies_1.SpyLocation();
    dl.spy('normalizeAbsolutely').andCallFake(function (url) { return url; });
    return dl;
}
function makeDummyRouter() {
    var dr = new spies_1.SpyRouter();
    dr.spy('generate').andCallFake(function (routeParams) { return dummyInstruction; });
    dr.spy('isRouteActive').andCallFake(function (_) { return false; });
    dr.spy('navigateInstruction');
    return dr;
}
//# sourceMappingURL=router_link_spec.js.map