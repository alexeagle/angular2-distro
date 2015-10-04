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
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
var core_1 = require('angular2/core');
var platform_1 = require('../../platform');
function main() {
    test_lib_1.describe('ng-if directive', function () {
        test_lib_1.it('should work in a template attribute', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var html = '<div><copy-me template="ng-if booleanCondition">hello</copy-me></div>';
            tcb.overrideTemplate(TestComponent, html)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(rootTC.debugElement.nativeElement, 'copy-me').length)
                    .toEqual(1);
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('hello');
                async.done();
            });
        }));
        test_lib_1.it('should work in a template element', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var html = '<div><template [ng-if]="booleanCondition"><copy-me>hello2</copy-me></template></div>';
            tcb.overrideTemplate(TestComponent, html)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(rootTC.debugElement.nativeElement, 'copy-me').length)
                    .toEqual(1);
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('hello2');
                async.done();
            });
        }));
        test_lib_1.it('should toggle node when condition changes', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var html = '<div><copy-me template="ng-if booleanCondition">hello</copy-me></div>';
            tcb.overrideTemplate(TestComponent, html)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.debugElement.componentInstance.booleanCondition = false;
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(rootTC.debugElement.nativeElement, 'copy-me').length)
                    .toEqual(0);
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('');
                rootTC.debugElement.componentInstance.booleanCondition = true;
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(rootTC.debugElement.nativeElement, 'copy-me').length)
                    .toEqual(1);
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('hello');
                rootTC.debugElement.componentInstance.booleanCondition = false;
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(rootTC.debugElement.nativeElement, 'copy-me').length)
                    .toEqual(0);
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('');
                async.done();
            });
        }));
        test_lib_1.it('should handle nested if correctly', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var html = '<div><template [ng-if]="booleanCondition"><copy-me *ng-if="nestedBooleanCondition">hello</copy-me></template></div>';
            tcb.overrideTemplate(TestComponent, html)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.debugElement.componentInstance.booleanCondition = false;
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(rootTC.debugElement.nativeElement, 'copy-me').length)
                    .toEqual(0);
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('');
                rootTC.debugElement.componentInstance.booleanCondition = true;
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(rootTC.debugElement.nativeElement, 'copy-me').length)
                    .toEqual(1);
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('hello');
                rootTC.debugElement.componentInstance.nestedBooleanCondition = false;
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(rootTC.debugElement.nativeElement, 'copy-me').length)
                    .toEqual(0);
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('');
                rootTC.debugElement.componentInstance.nestedBooleanCondition = true;
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(rootTC.debugElement.nativeElement, 'copy-me').length)
                    .toEqual(1);
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('hello');
                rootTC.debugElement.componentInstance.booleanCondition = false;
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(rootTC.debugElement.nativeElement, 'copy-me').length)
                    .toEqual(0);
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('');
                async.done();
            });
        }));
        test_lib_1.it('should update several nodes with if', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var html = '<div>' +
                '<copy-me template="ng-if numberCondition + 1 >= 2">helloNumber</copy-me>' +
                '<copy-me template="ng-if stringCondition == \'foo\'">helloString</copy-me>' +
                '<copy-me template="ng-if functionCondition(stringCondition, numberCondition)">helloFunction</copy-me>' +
                '</div>';
            tcb.overrideTemplate(TestComponent, html)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(rootTC.debugElement.nativeElement, 'copy-me').length)
                    .toEqual(3);
                test_lib_1.expect(dom_adapter_1.DOM.getText(rootTC.debugElement.nativeElement))
                    .toEqual('helloNumberhelloStringhelloFunction');
                rootTC.debugElement.componentInstance.numberCondition = 0;
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(rootTC.debugElement.nativeElement, 'copy-me').length)
                    .toEqual(1);
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('helloString');
                rootTC.debugElement.componentInstance.numberCondition = 1;
                rootTC.debugElement.componentInstance.stringCondition = "bar";
                rootTC.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(rootTC.debugElement.nativeElement, 'copy-me').length)
                    .toEqual(1);
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('helloNumber');
                async.done();
            });
        }));
        if (!platform_1.IS_DART) {
            test_lib_1.it('should not add the element twice if the condition goes from true to true (JS)', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var html = '<div><copy-me template="ng-if numberCondition">hello</copy-me></div>';
                tcb.overrideTemplate(TestComponent, html)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(rootTC.debugElement.nativeElement, 'copy-me').length)
                        .toEqual(1);
                    test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('hello');
                    rootTC.debugElement.componentInstance.numberCondition = 2;
                    rootTC.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(rootTC.debugElement.nativeElement, 'copy-me').length)
                        .toEqual(1);
                    test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('hello');
                    async.done();
                });
            }));
            test_lib_1.it('should not recreate the element if the condition goes from true to true (JS)', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var html = '<div><copy-me template="ng-if numberCondition">hello</copy-me></div>';
                tcb.overrideTemplate(TestComponent, html)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    rootTC.detectChanges();
                    dom_adapter_1.DOM.addClass(dom_adapter_1.DOM.querySelector(rootTC.debugElement.nativeElement, 'copy-me'), "foo");
                    rootTC.debugElement.componentInstance.numberCondition = 2;
                    rootTC.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.hasClass(dom_adapter_1.DOM.querySelector(rootTC.debugElement.nativeElement, 'copy-me'), "foo"))
                        .toBe(true);
                    async.done();
                });
            }));
        }
        if (platform_1.IS_DART) {
            test_lib_1.it('should not create the element if the condition is not a boolean (DART)', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var html = '<div><copy-me template="ng-if numberCondition">hello</copy-me></div>';
                tcb.overrideTemplate(TestComponent, html)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    test_lib_1.expect(function () { return rootTC.detectChanges(); }).toThrowError();
                    test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(rootTC.debugElement.nativeElement, 'copy-me').length)
                        .toEqual(0);
                    test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('');
                    async.done();
                });
            }));
        }
    });
}
exports.main = main;
var TestComponent = (function () {
    function TestComponent() {
        this.booleanCondition = true;
        this.nestedBooleanCondition = true;
        this.numberCondition = 1;
        this.stringCondition = "foo";
        this.functionCondition = function (s, n) { return s == "foo" && n == 1; };
    }
    TestComponent = __decorate([
        core_1.Component({ selector: 'test-cmp' }),
        core_1.View({ directives: [core_1.NgIf] }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
})();
//# sourceMappingURL=ng_if_spec.js.map