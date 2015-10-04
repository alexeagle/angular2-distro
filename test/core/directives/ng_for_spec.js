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
var ng_for_1 = require('angular2/src/core/directives/ng_for');
function main() {
    test_lib_1.describe('ng-for', function () {
        var TEMPLATE = '<div><copy-me template="ng-for #item of items">{{item.toString()}};</copy-me></div>';
        test_lib_1.it('should reflect initial elements', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, TEMPLATE)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('1;2;');
                async.done();
            });
        }));
        test_lib_1.it('should reflect added elements', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, TEMPLATE)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                rootTC.debugElement.componentInstance.items.push(3);
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('1;2;3;');
                async.done();
            });
        }));
        test_lib_1.it('should reflect removed elements', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, TEMPLATE)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                collection_1.ListWrapper.removeAt(rootTC.debugElement.componentInstance.items, 1);
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('1;');
                async.done();
            });
        }));
        test_lib_1.it('should reflect moved elements', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, TEMPLATE)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                collection_1.ListWrapper.removeAt(rootTC.debugElement.componentInstance.items, 0);
                rootTC.debugElement.componentInstance.items.push(1);
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('2;1;');
                async.done();
            });
        }));
        test_lib_1.it('should reflect a mix of all changes (additions/removals/moves)', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, TEMPLATE)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.debugElement.componentInstance.items = [0, 1, 2, 3, 4, 5];
                rootTC.detectChanges();
                rootTC.debugElement.componentInstance.items = [6, 2, 7, 0, 4, 8];
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('6;2;7;0;4;8;');
                async.done();
            });
        }));
        test_lib_1.it('should iterate over an array of objects', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<ul><li template="ng-for #item of items">{{item["name"]}};</li></ul>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                // INIT
                rootTC.debugElement.componentInstance.items = [{ 'name': 'misko' }, { 'name': 'shyam' }];
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('misko;shyam;');
                // GROW
                rootTC.debugElement.componentInstance.items.push({ 'name': 'adam' });
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('misko;shyam;adam;');
                // SHRINK
                collection_1.ListWrapper.removeAt(rootTC.debugElement.componentInstance.items, 2);
                collection_1.ListWrapper.removeAt(rootTC.debugElement.componentInstance.items, 0);
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('shyam;');
                async.done();
            });
        }));
        test_lib_1.it('should gracefully handle nulls', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<ul><li template="ng-for #item of null">{{item}};</li></ul>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('');
                async.done();
            });
        }));
        test_lib_1.it('should gracefully handle ref changing to null and back', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, TEMPLATE)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('1;2;');
                rootTC.debugElement.componentInstance.items = null;
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('');
                rootTC.debugElement.componentInstance.items = [1, 2, 3];
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('1;2;3;');
                async.done();
            });
        }));
        test_lib_1.it('should throw on ref changing to string', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, TEMPLATE)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('1;2;');
                rootTC.debugElement.componentInstance.items = 'whaaa';
                test_lib_1.expect(function () { return rootTC.detectChanges(); }).toThrowError();
                async.done();
            });
        }));
        test_lib_1.it('should works with duplicates', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, TEMPLATE)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                var a = new Foo();
                rootTC.debugElement.componentInstance.items = [a, a];
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('foo;foo;');
                async.done();
            });
        }));
        test_lib_1.it('should repeat over nested arrays', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div>' +
                '<div template="ng-for #item of items">' +
                '<div template="ng-for #subitem of item">' +
                '{{subitem}}-{{item.length}};' +
                '</div>|' +
                '</div>' +
                '</div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.debugElement.componentInstance.items = [['a', 'b'], ['c']];
                rootTC.detectChanges();
                rootTC.detectChanges();
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('a-2;b-2;|c-1;|');
                rootTC.debugElement.componentInstance.items = [['e'], ['f', 'g']];
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('e-1;|f-2;g-2;|');
                async.done();
            });
        }));
        test_lib_1.it('should repeat over nested arrays with no intermediate element', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div><template ng-for #item [ng-for-of]="items">' +
                '<div template="ng-for #subitem of item">' +
                '{{subitem}}-{{item.length}};' +
                '</div></template></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.debugElement.componentInstance.items = [['a', 'b'], ['c']];
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('a-2;b-2;c-1;');
                rootTC.debugElement.componentInstance.items = [['e'], ['f', 'g']];
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('e-1;f-2;g-2;');
                async.done();
            });
        }));
        test_lib_1.it('should display indices correctly', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div><copy-me template="ng-for: var item of items; var i=index">{{i.toString()}}</copy-me></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.debugElement.componentInstance.items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('0123456789');
                rootTC.debugElement.componentInstance.items = [1, 2, 6, 7, 4, 3, 5, 8, 9, 0];
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('0123456789');
                async.done();
            });
        }));
        test_lib_1.it('should display last item correctly', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div><copy-me template="ng-for: var item of items; var isLast=last">{{isLast.toString()}}</copy-me></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.debugElement.componentInstance.items = [0, 1, 2];
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('falsefalsetrue');
                rootTC.debugElement.componentInstance.items = [2, 1];
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('falsetrue');
                async.done();
            });
        }));
        test_lib_1.it('should display even items correctly', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div><copy-me template="ng-for: var item of items; var isEven=even">{{isEven.toString()}}</copy-me></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.debugElement.componentInstance.items = [0, 1, 2];
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('truefalsetrue');
                rootTC.debugElement.componentInstance.items = [2, 1];
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('truefalse');
                async.done();
            });
        }));
        test_lib_1.it('should display odd items correctly', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div><copy-me template="ng-for: var item of items; var isOdd=odd">{{isOdd.toString()}}</copy-me></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.debugElement.componentInstance.items = [0, 1, 2, 3];
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('falsetruefalsetrue');
                rootTC.debugElement.componentInstance.items = [2, 1];
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.nativeElement).toHaveText('falsetrue');
                async.done();
            });
        }));
    });
}
exports.main = main;
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.toString = function () { return 'foo'; };
    return Foo;
})();
var TestComponent = (function () {
    function TestComponent() {
        this.items = [1, 2];
    }
    TestComponent = __decorate([
        angular2_1.Component({ selector: 'test-cmp' }),
        angular2_1.View({ directives: [ng_for_1.NgFor] }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
})();
//# sourceMappingURL=ng_for_spec.js.map