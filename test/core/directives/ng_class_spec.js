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
var ng_class_1 = require('angular2/src/core/directives/ng_class');
var view_pool_1 = require('angular2/src/core/linker/view_pool');
function detectChangesAndCheck(rootTC, classes, elIndex) {
    if (elIndex === void 0) { elIndex = 0; }
    rootTC.detectChanges();
    test_lib_1.expect(rootTC.debugElement.componentViewChildren[elIndex].nativeElement.className)
        .toEqual(classes);
}
function main() {
    test_lib_1.describe('binding to CSS class list', function () {
        test_lib_1.describe('viewpool support', function () {
            test_lib_1.beforeEachBindings(function () { return [angular2_1.bind(view_pool_1.APP_VIEW_POOL_CAPACITY).toValue(100)]; });
            test_lib_1.it('should clean up when the directive is destroyed', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div *ng-for="var item of items" [ng-class]="item"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    rootTC.debugElement.componentInstance.items = [['0']];
                    rootTC.detectChanges();
                    rootTC.debugElement.componentInstance.items = [['1']];
                    detectChangesAndCheck(rootTC, '1', 1);
                    async.done();
                });
            }));
        });
        test_lib_1.describe('expressions evaluating to objects', function () {
            test_lib_1.it('should add classes specified in an object literal', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ng-class]="{foo: true, bar: false}"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    detectChangesAndCheck(rootTC, 'foo');
                    async.done();
                });
            }));
            test_lib_1.it('should add classes specified in an object literal without change in class names', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div [ng-class]=\"{'foo-bar': true, 'fooBar': true}\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    detectChangesAndCheck(rootTC, 'foo-bar fooBar');
                    async.done();
                });
            }));
            test_lib_1.it('should add and remove classes based on changes in object literal values', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ng-class]="{foo: condition, bar: !condition}"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    detectChangesAndCheck(rootTC, 'foo');
                    rootTC.debugElement.componentInstance.condition = false;
                    detectChangesAndCheck(rootTC, 'bar');
                    async.done();
                });
            }));
            test_lib_1.it('should add and remove classes based on changes to the expression object', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ng-class]="objExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    detectChangesAndCheck(rootTC, 'foo');
                    collection_1.StringMapWrapper.set(rootTC.debugElement.componentInstance.objExpr, 'bar', true);
                    detectChangesAndCheck(rootTC, 'foo bar');
                    collection_1.StringMapWrapper.set(rootTC.debugElement.componentInstance.objExpr, 'baz', true);
                    detectChangesAndCheck(rootTC, 'foo bar baz');
                    collection_1.StringMapWrapper.delete(rootTC.debugElement.componentInstance.objExpr, 'bar');
                    detectChangesAndCheck(rootTC, 'foo baz');
                    async.done();
                });
            }));
            test_lib_1.it('should add and remove classes based on reference changes to the expression object', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ng-class]="objExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    detectChangesAndCheck(rootTC, 'foo');
                    rootTC.debugElement.componentInstance.objExpr = { foo: true, bar: true };
                    detectChangesAndCheck(rootTC, 'foo bar');
                    rootTC.debugElement.componentInstance.objExpr = { baz: true };
                    detectChangesAndCheck(rootTC, 'baz');
                    async.done();
                });
            }));
            test_lib_1.it('should remove active classes when expression evaluates to null', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ng-class]="objExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    detectChangesAndCheck(rootTC, 'foo');
                    rootTC.debugElement.componentInstance.objExpr = null;
                    detectChangesAndCheck(rootTC, '');
                    rootTC.debugElement.componentInstance.objExpr = { 'foo': false, 'bar': true };
                    detectChangesAndCheck(rootTC, 'bar');
                    async.done();
                });
            }));
        });
        test_lib_1.describe('expressions evaluating to lists', function () {
            test_lib_1.it('should add classes specified in a list literal', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div [ng-class]=\"['foo', 'bar', 'foo-bar', 'fooBar']\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    detectChangesAndCheck(rootTC, 'foo bar foo-bar fooBar');
                    async.done();
                });
            }));
            test_lib_1.it('should add and remove classes based on changes to the expression', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ng-class]="arrExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    var arrExpr = rootTC.debugElement.componentInstance.arrExpr;
                    detectChangesAndCheck(rootTC, 'foo');
                    arrExpr.push('bar');
                    detectChangesAndCheck(rootTC, 'foo bar');
                    arrExpr[1] = 'baz';
                    detectChangesAndCheck(rootTC, 'foo baz');
                    collection_1.ListWrapper.remove(rootTC.debugElement.componentInstance.arrExpr, 'baz');
                    detectChangesAndCheck(rootTC, 'foo');
                    async.done();
                });
            }));
            test_lib_1.it('should add and remove classes when a reference changes', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ng-class]="arrExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    detectChangesAndCheck(rootTC, 'foo');
                    rootTC.debugElement.componentInstance.arrExpr = ['bar'];
                    detectChangesAndCheck(rootTC, 'bar');
                    async.done();
                });
            }));
            test_lib_1.it('should take initial classes into account when a reference changes', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div class="foo" [ng-class]="arrExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    detectChangesAndCheck(rootTC, 'foo');
                    rootTC.debugElement.componentInstance.arrExpr = ['bar'];
                    detectChangesAndCheck(rootTC, 'foo bar');
                    async.done();
                });
            }));
            test_lib_1.it('should ignore empty or blank class names', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div class="foo" [ng-class]="arrExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    rootTC.debugElement.componentInstance.arrExpr = ['', '  '];
                    detectChangesAndCheck(rootTC, 'foo');
                    async.done();
                });
            }));
            test_lib_1.it('should trim blanks from class names', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div class="foo" [ng-class]="arrExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    rootTC.debugElement.componentInstance.arrExpr = [' bar  '];
                    detectChangesAndCheck(rootTC, 'foo bar');
                    async.done();
                });
            }));
        });
        test_lib_1.describe('expressions evaluating to string', function () {
            test_lib_1.it('should add classes specified in a string literal', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div [ng-class]=\"'foo bar foo-bar fooBar'\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    detectChangesAndCheck(rootTC, 'foo bar foo-bar fooBar');
                    async.done();
                });
            }));
            test_lib_1.it('should add and remove classes based on changes to the expression', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ng-class]="strExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    detectChangesAndCheck(rootTC, 'foo');
                    rootTC.debugElement.componentInstance.strExpr = 'foo bar';
                    detectChangesAndCheck(rootTC, 'foo bar');
                    rootTC.debugElement.componentInstance.strExpr = 'baz';
                    detectChangesAndCheck(rootTC, 'baz');
                    async.done();
                });
            }));
            test_lib_1.it('should remove active classes when switching from string to null', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div [ng-class]=\"strExpr\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    detectChangesAndCheck(rootTC, 'foo');
                    rootTC.debugElement.componentInstance.strExpr = null;
                    detectChangesAndCheck(rootTC, '');
                    async.done();
                });
            }));
            test_lib_1.it('should take initial classes into account when switching from string to null', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div class=\"foo\" [ng-class]=\"strExpr\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    detectChangesAndCheck(rootTC, 'foo');
                    rootTC.debugElement.componentInstance.strExpr = null;
                    detectChangesAndCheck(rootTC, 'foo');
                    async.done();
                });
            }));
            test_lib_1.it('should ignore empty and blank strings', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div class=\"foo\" [ng-class]=\"strExpr\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    rootTC.debugElement.componentInstance.strExpr = '';
                    detectChangesAndCheck(rootTC, 'foo');
                    async.done();
                });
            }));
        });
        test_lib_1.describe('cooperation with other class-changing constructs', function () {
            test_lib_1.it('should co-operate with the class attribute', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ng-class]="objExpr" class="init foo"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    collection_1.StringMapWrapper.set(rootTC.debugElement.componentInstance.objExpr, 'bar', true);
                    detectChangesAndCheck(rootTC, 'init foo bar');
                    collection_1.StringMapWrapper.set(rootTC.debugElement.componentInstance.objExpr, 'foo', false);
                    detectChangesAndCheck(rootTC, 'init bar');
                    rootTC.debugElement.componentInstance.objExpr = null;
                    detectChangesAndCheck(rootTC, 'init foo');
                    async.done();
                });
            }));
            test_lib_1.it('should co-operate with the interpolated class attribute', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div [ng-class]=\"objExpr\" class=\"{{'init foo'}}\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    collection_1.StringMapWrapper.set(rootTC.debugElement.componentInstance.objExpr, 'bar', true);
                    detectChangesAndCheck(rootTC, "init foo bar");
                    collection_1.StringMapWrapper.set(rootTC.debugElement.componentInstance.objExpr, 'foo', false);
                    detectChangesAndCheck(rootTC, "init bar");
                    rootTC.debugElement.componentInstance.objExpr = null;
                    detectChangesAndCheck(rootTC, "init foo");
                    async.done();
                });
            }));
            test_lib_1.it('should co-operate with the class attribute and binding to it', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div [ng-class]=\"objExpr\" class=\"init\" [class]=\"'foo'\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    collection_1.StringMapWrapper.set(rootTC.debugElement.componentInstance.objExpr, 'bar', true);
                    detectChangesAndCheck(rootTC, "init foo bar");
                    collection_1.StringMapWrapper.set(rootTC.debugElement.componentInstance.objExpr, 'foo', false);
                    detectChangesAndCheck(rootTC, "init bar");
                    rootTC.debugElement.componentInstance.objExpr = null;
                    detectChangesAndCheck(rootTC, "init foo");
                    async.done();
                });
            }));
            test_lib_1.it('should co-operate with the class attribute and class.name binding', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div class="init foo" [ng-class]="objExpr" [class.baz]="condition"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    detectChangesAndCheck(rootTC, 'init foo baz');
                    collection_1.StringMapWrapper.set(rootTC.debugElement.componentInstance.objExpr, 'bar', true);
                    detectChangesAndCheck(rootTC, 'init foo baz bar');
                    collection_1.StringMapWrapper.set(rootTC.debugElement.componentInstance.objExpr, 'foo', false);
                    detectChangesAndCheck(rootTC, 'init baz bar');
                    rootTC.debugElement.componentInstance.condition = false;
                    detectChangesAndCheck(rootTC, 'init bar');
                    async.done();
                });
            }));
            test_lib_1.it('should co-operate with initial class and class attribute binding when binding changes', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div class="init" [ng-class]="objExpr" [class]="strExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (rootTC) {
                    detectChangesAndCheck(rootTC, 'init foo');
                    collection_1.StringMapWrapper.set(rootTC.debugElement.componentInstance.objExpr, 'bar', true);
                    detectChangesAndCheck(rootTC, 'init foo bar');
                    rootTC.debugElement.componentInstance.strExpr = 'baz';
                    detectChangesAndCheck(rootTC, 'init bar baz foo');
                    rootTC.debugElement.componentInstance.objExpr = null;
                    detectChangesAndCheck(rootTC, 'init baz');
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
var TestComponent = (function () {
    function TestComponent() {
        this.condition = true;
        this.arrExpr = ['foo'];
        this.objExpr = { 'foo': true, 'bar': false };
        this.strExpr = 'foo';
    }
    TestComponent = __decorate([
        angular2_1.Component({ selector: 'test-cmp' }),
        angular2_1.View({ directives: [ng_class_1.NgClass, angular2_1.NgFor] }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
})();
//# sourceMappingURL=ng_class_spec.js.map