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
var collection_1 = require('angular2/src/core/facade/collection');
var angular2_1 = require('angular2/angular2');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
var ng_style_1 = require('angular2/src/core/directives/ng_style');
function main() {
    test_lib_1.describe('binding to CSS styles', function () {
        test_lib_1.it('should add styles specified in an object literal', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<div [ng-style]=\"{'max-width': '40px'}\"></div>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.getStyle(rootTC.debugElement.componentViewChildren[0].nativeElement, 'max-width'))
                    .toEqual('40px');
                async.done();
            });
        }));
        test_lib_1.it('should add and change styles specified in an object expression', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<div [ng-style]=\"expr\"></div>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                var expr;
                rootTC.debugElement.componentInstance.expr = { 'max-width': '40px' };
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.getStyle(rootTC.debugElement.componentViewChildren[0].nativeElement, 'max-width'))
                    .toEqual('40px');
                expr = rootTC.debugElement.componentInstance.expr;
                expr['max-width'] = '30%';
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.getStyle(rootTC.debugElement.componentViewChildren[0].nativeElement, 'max-width'))
                    .toEqual('30%');
                async.done();
            });
        }));
        test_lib_1.it('should remove styles when deleting a key in an object expression', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<div [ng-style]=\"expr\"></div>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.debugElement.componentInstance.expr = { 'max-width': '40px' };
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.getStyle(rootTC.debugElement.componentViewChildren[0].nativeElement, 'max-width'))
                    .toEqual('40px');
                collection_1.StringMapWrapper.delete(rootTC.debugElement.componentInstance.expr, 'max-width');
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.getStyle(rootTC.debugElement.componentViewChildren[0].nativeElement, 'max-width'))
                    .toEqual('');
                async.done();
            });
        }));
        test_lib_1.it('should co-operate with the style attribute', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<div style=\"font-size: 12px\" [ng-style]=\"expr\"></div>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.debugElement.componentInstance.expr = { 'max-width': '40px' };
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.getStyle(rootTC.debugElement.componentViewChildren[0].nativeElement, 'max-width'))
                    .toEqual('40px');
                test_lib_1.expect(dom_adapter_1.DOM.getStyle(rootTC.debugElement.componentViewChildren[0].nativeElement, 'font-size'))
                    .toEqual('12px');
                collection_1.StringMapWrapper.delete(rootTC.debugElement.componentInstance.expr, 'max-width');
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.getStyle(rootTC.debugElement.componentViewChildren[0].nativeElement, 'max-width'))
                    .toEqual('');
                test_lib_1.expect(dom_adapter_1.DOM.getStyle(rootTC.debugElement.componentViewChildren[0].nativeElement, 'font-size'))
                    .toEqual('12px');
                async.done();
            });
        }));
        test_lib_1.it('should co-operate with the style.[styleName]="expr" special-case in the compiler', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<div [style.font-size.px]=\"12\" [ng-style]=\"expr\"></div>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.debugElement.componentInstance.expr = { 'max-width': '40px' };
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.getStyle(rootTC.debugElement.componentViewChildren[0].nativeElement, 'max-width'))
                    .toEqual('40px');
                test_lib_1.expect(dom_adapter_1.DOM.getStyle(rootTC.debugElement.componentViewChildren[0].nativeElement, 'font-size'))
                    .toEqual('12px');
                collection_1.StringMapWrapper.delete(rootTC.debugElement.componentInstance.expr, 'max-width');
                test_lib_1.expect(dom_adapter_1.DOM.getStyle(rootTC.debugElement.componentViewChildren[0].nativeElement, 'font-size'))
                    .toEqual('12px');
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.getStyle(rootTC.debugElement.componentViewChildren[0].nativeElement, 'max-width'))
                    .toEqual('');
                async.done();
            });
        }));
    });
}
exports.main = main;
var TestComponent = (function () {
    function TestComponent() {
    }
    TestComponent = __decorate([
        angular2_1.Component({ selector: 'test-cmp' }),
        angular2_1.View({ directives: [ng_style_1.NgStyle] }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
})();
//# sourceMappingURL=ng_style_spec.js.map