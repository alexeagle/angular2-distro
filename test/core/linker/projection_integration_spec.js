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
var debug_1 = require('angular2/src/core/debug');
function main() {
    test_lib_1.describe('projection', function () {
        test_lib_1.it('should support simple components', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<simple>' +
                    '<div>A</div>' +
                    '</simple>',
                directives: [Simple]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('SIMPLE(A)');
                async.done();
            });
        }));
        test_lib_1.it('should support simple components with text interpolation as direct children', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '{{\'START(\'}}<simple>' +
                    '{{text}}' +
                    '</simple>{{\')END\'}}',
                directives: [Simple]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                main.debugElement.componentInstance.text = 'A';
                main.detectChanges();
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('START(SIMPLE(A))END');
                async.done();
            });
        }));
        test_lib_1.it('should support projecting text interpolation to a non bound element', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(Simple, new core_1.ViewMetadata({ template: 'SIMPLE(<div><ng-content></ng-content></div>)', directives: [] }))
                .overrideView(MainComp, new core_1.ViewMetadata({ template: '<simple>{{text}}</simple>', directives: [Simple] }))
                .createAsync(MainComp)
                .then(function (main) {
                main.debugElement.componentInstance.text = 'A';
                main.detectChanges();
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('SIMPLE(A)');
                async.done();
            });
        }));
        test_lib_1.it('should support projecting text interpolation to a non bound element with other bound elements after it', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(Simple, new core_1.ViewMetadata({
                template: 'SIMPLE(<div><ng-content></ng-content></div><div [tab-index]="0">EL</div>)',
                directives: []
            }))
                .overrideView(MainComp, new core_1.ViewMetadata({ template: '<simple>{{text}}</simple>', directives: [Simple] }))
                .createAsync(MainComp)
                .then(function (main) {
                main.debugElement.componentInstance.text = 'A';
                main.detectChanges();
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('SIMPLE(AEL)');
                async.done();
            });
        }));
        test_lib_1.it('should not show the light dom even if there is no content tag', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({ template: '<empty>A</empty>', directives: [Empty] }))
                .createAsync(MainComp)
                .then(function (main) {
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('');
                async.done();
            });
        }));
        test_lib_1.it('should support multiple content tags', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<multiple-content-tags>' +
                    '<div>B</div>' +
                    '<div>C</div>' +
                    '<div class="left">A</div>' +
                    '</multiple-content-tags>',
                directives: [MultipleContentTagsComponent]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('(A, BC)');
                async.done();
            });
        }));
        test_lib_1.it('should redistribute only direct children', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<multiple-content-tags>' +
                    '<div>B<div class="left">A</div></div>' +
                    '<div>C</div>' +
                    '</multiple-content-tags>',
                directives: [MultipleContentTagsComponent]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('(, BAC)');
                async.done();
            });
        }));
        test_lib_1.it("should redistribute direct child viewcontainers when the light dom changes", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<multiple-content-tags>' +
                    '<template manual class="left"><div>A1</div></template>' +
                    '<div>B</div>' +
                    '</multiple-content-tags>',
                directives: [MultipleContentTagsComponent, ManualViewportDirective]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                var viewportDirectives = main.debugElement.queryAll(debug_1.By.directive(ManualViewportDirective))
                    .map(function (de) { return de.inject(ManualViewportDirective); });
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('(, B)');
                viewportDirectives.forEach(function (d) { return d.show(); });
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('(A1, B)');
                viewportDirectives.forEach(function (d) { return d.hide(); });
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('(, B)');
                async.done();
            });
        }));
        test_lib_1.it("should support nested components", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<outer-with-indirect-nested>' +
                    '<div>A</div>' +
                    '<div>B</div>' +
                    '</outer-with-indirect-nested>',
                directives: [OuterWithIndirectNestedComponent]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('OUTER(SIMPLE(AB))');
                async.done();
            });
        }));
        test_lib_1.it("should support nesting with content being direct child of a nested component", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<outer>' +
                    '<template manual class="left"><div>A</div></template>' +
                    '<div>B</div>' +
                    '<div>C</div>' +
                    '</outer>',
                directives: [OuterComponent, ManualViewportDirective],
            }))
                .createAsync(MainComp)
                .then(function (main) {
                var viewportDirective = main.debugElement.query(debug_1.By.directive(ManualViewportDirective))
                    .inject(ManualViewportDirective);
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('OUTER(INNER(INNERINNER(,BC)))');
                viewportDirective.show();
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('OUTER(INNER(INNERINNER(A,BC)))');
                async.done();
            });
        }));
        test_lib_1.it('should redistribute when the shadow dom changes', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<conditional-content>' +
                    '<div class="left">A</div>' +
                    '<div>B</div>' +
                    '<div>C</div>' +
                    '</conditional-content>',
                directives: [ConditionalContentComponent]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                var viewportDirective = main.debugElement.query(debug_1.By.directive(ManualViewportDirective))
                    .inject(ManualViewportDirective);
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('(, BC)');
                viewportDirective.show();
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('(A, BC)');
                viewportDirective.hide();
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('(, BC)');
                async.done();
            });
        }));
        // GH-2095 - https://github.com/angular/angular/issues/2095
        // important as we are removing the ng-content element during compilation,
        // which could skrew up text node indices.
        test_lib_1.it('should support text nodes after content tags', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({ template: '<simple string-prop="text"></simple>', directives: [Simple] }))
                .overrideTemplate(Simple, '<ng-content></ng-content><p>P,</p>{{stringProp}}')
                .createAsync(MainComp)
                .then(function (main) {
                main.detectChanges();
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('P,text');
                async.done();
            });
        }));
        // important as we are moving style tags around during compilation,
        // which could skrew up text node indices.
        test_lib_1.it('should support text nodes after style tags', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({ template: '<simple string-prop="text"></simple>', directives: [Simple] }))
                .overrideTemplate(Simple, '<style></style><p>P,</p>{{stringProp}}')
                .createAsync(MainComp)
                .then(function (main) {
                main.detectChanges();
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('P,text');
                async.done();
            });
        }));
        test_lib_1.it('should support moving non projected light dom around', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<empty>' +
                    '  <template manual><div>A</div></template>' +
                    '</empty>' +
                    'START(<div project></div>)END',
                directives: [Empty, ProjectDirective, ManualViewportDirective],
            }))
                .createAsync(MainComp)
                .then(function (main) {
                var sourceDirective = main.debugElement.query(debug_1.By.directive(ManualViewportDirective))
                    .inject(ManualViewportDirective);
                var projectDirective = main.debugElement.query(debug_1.By.directive(ProjectDirective)).inject(ProjectDirective);
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('START()END');
                projectDirective.show(sourceDirective.templateRef);
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('START(A)END');
                async.done();
            });
        }));
        test_lib_1.it('should support moving projected light dom around', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<simple><template manual><div>A</div></template></simple>' +
                    'START(<div project></div>)END',
                directives: [Simple, ProjectDirective, ManualViewportDirective],
            }))
                .createAsync(MainComp)
                .then(function (main) {
                var sourceDirective = main.debugElement.query(debug_1.By.directive(ManualViewportDirective))
                    .inject(ManualViewportDirective);
                var projectDirective = main.debugElement.query(debug_1.By.directive(ProjectDirective)).inject(ProjectDirective);
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('SIMPLE()START()END');
                projectDirective.show(sourceDirective.templateRef);
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('SIMPLE()START(A)END');
                async.done();
            });
        }));
        test_lib_1.it('should support moving ng-content around', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<conditional-content>' +
                    '<div class="left">A</div>' +
                    '<div>B</div>' +
                    '</conditional-content>' +
                    'START(<div project></div>)END',
                directives: [ConditionalContentComponent, ProjectDirective, ManualViewportDirective]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                var sourceDirective = main.debugElement.query(debug_1.By.directive(ManualViewportDirective))
                    .inject(ManualViewportDirective);
                var projectDirective = main.debugElement.query(debug_1.By.directive(ProjectDirective)).inject(ProjectDirective);
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('(, B)START()END');
                projectDirective.show(sourceDirective.templateRef);
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('(, B)START(A)END');
                // Stamping ng-content multiple times should not produce the content multiple
                // times...
                projectDirective.show(sourceDirective.templateRef);
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('(, B)START(A)END');
                async.done();
            });
        }));
        // Note: This does not use a ng-content element, but
        // is still important as we are merging proto views independent of
        // the presence of ng-content elements!
        test_lib_1.it('should still allow to implement a recursive trees', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({ template: '<tree></tree>', directives: [Tree] }))
                .createAsync(MainComp)
                .then(function (main) {
                main.detectChanges();
                var manualDirective = main.debugElement.query(debug_1.By.directive(ManualViewportDirective))
                    .inject(ManualViewportDirective);
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('TREE(0:)');
                manualDirective.show();
                main.detectChanges();
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('TREE(0:TREE(1:))');
                async.done();
            });
        }));
        if (dom_adapter_1.DOM.supportsNativeShadowDOM()) {
            test_lib_1.it('should support native content projection', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MainComp, new core_1.ViewMetadata({
                    template: '<simple-native>' +
                        '<div>A</div>' +
                        '</simple-native>',
                    directives: [SimpleNative]
                }))
                    .createAsync(MainComp)
                    .then(function (main) {
                    test_lib_1.expect(main.debugElement.nativeElement).toHaveText('SIMPLE(A)');
                    async.done();
                });
            }));
        }
        test_lib_1.it('should support nested conditionals that contain ng-contents', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: "<conditional-text>a</conditional-text>",
                directives: [ConditionalTextComponent]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('MAIN()');
                var viewportElement = main.debugElement.componentViewChildren[0].componentViewChildren[0];
                viewportElement.inject(ManualViewportDirective).show();
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('MAIN(FIRST())');
                viewportElement =
                    main.debugElement.componentViewChildren[0].componentViewChildren[1];
                viewportElement.inject(ManualViewportDirective).show();
                test_lib_1.expect(main.debugElement.nativeElement).toHaveText('MAIN(FIRST(SECOND(a)))');
                async.done();
            });
        }));
    });
}
exports.main = main;
var MainComp = (function () {
    function MainComp() {
        this.text = '';
    }
    MainComp = __decorate([
        core_1.Component({ selector: 'main' }),
        core_1.View({ template: '', directives: [] }), 
        __metadata('design:paramtypes', [])
    ], MainComp);
    return MainComp;
})();
var Simple = (function () {
    function Simple() {
        this.stringProp = '';
    }
    Simple = __decorate([
        core_1.Component({ selector: 'simple', inputs: ['stringProp'] }),
        core_1.View({ template: 'SIMPLE(<ng-content></ng-content>)', directives: [] }), 
        __metadata('design:paramtypes', [])
    ], Simple);
    return Simple;
})();
var SimpleNative = (function () {
    function SimpleNative() {
    }
    SimpleNative = __decorate([
        core_1.Component({ selector: 'simple-native' }),
        core_1.View({
            template: 'SIMPLE(<content></content>)',
            directives: [],
            encapsulation: core_1.ViewEncapsulation.Native
        }), 
        __metadata('design:paramtypes', [])
    ], SimpleNative);
    return SimpleNative;
})();
var Empty = (function () {
    function Empty() {
    }
    Empty = __decorate([
        core_1.Component({ selector: 'empty' }),
        core_1.View({ template: '', directives: [] }), 
        __metadata('design:paramtypes', [])
    ], Empty);
    return Empty;
})();
var MultipleContentTagsComponent = (function () {
    function MultipleContentTagsComponent() {
    }
    MultipleContentTagsComponent = __decorate([
        core_1.Component({ selector: 'multiple-content-tags' }),
        core_1.View({
            template: '(<ng-content select=".left"></ng-content>, <ng-content></ng-content>)',
            directives: []
        }), 
        __metadata('design:paramtypes', [])
    ], MultipleContentTagsComponent);
    return MultipleContentTagsComponent;
})();
var ManualViewportDirective = (function () {
    function ManualViewportDirective(vc, templateRef) {
        this.vc = vc;
        this.templateRef = templateRef;
    }
    ManualViewportDirective.prototype.show = function () { this.vc.createEmbeddedView(this.templateRef, 0); };
    ManualViewportDirective.prototype.hide = function () { this.vc.clear(); };
    ManualViewportDirective = __decorate([
        core_1.Directive({ selector: '[manual]' }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.TemplateRef])
    ], ManualViewportDirective);
    return ManualViewportDirective;
})();
var ProjectDirective = (function () {
    function ProjectDirective(vc) {
        this.vc = vc;
    }
    ProjectDirective.prototype.show = function (templateRef) { this.vc.createEmbeddedView(templateRef, 0); };
    ProjectDirective.prototype.hide = function () { this.vc.clear(); };
    ProjectDirective = __decorate([
        core_1.Directive({ selector: '[project]' }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], ProjectDirective);
    return ProjectDirective;
})();
var OuterWithIndirectNestedComponent = (function () {
    function OuterWithIndirectNestedComponent() {
    }
    OuterWithIndirectNestedComponent = __decorate([
        core_1.Component({ selector: 'outer-with-indirect-nested' }),
        core_1.View({
            template: 'OUTER(<simple><div><ng-content></ng-content></div></simple>)',
            directives: [Simple]
        }), 
        __metadata('design:paramtypes', [])
    ], OuterWithIndirectNestedComponent);
    return OuterWithIndirectNestedComponent;
})();
var OuterComponent = (function () {
    function OuterComponent() {
    }
    OuterComponent = __decorate([
        core_1.Component({ selector: 'outer' }),
        core_1.View({
            template: 'OUTER(<inner><ng-content select=".left" class="left"></ng-content><ng-content></ng-content></inner>)',
            directives: [core_1.forwardRef(function () { return InnerComponent; })]
        }), 
        __metadata('design:paramtypes', [])
    ], OuterComponent);
    return OuterComponent;
})();
var InnerComponent = (function () {
    function InnerComponent() {
    }
    InnerComponent = __decorate([
        core_1.Component({ selector: 'inner' }),
        core_1.View({
            template: 'INNER(<innerinner><ng-content select=".left" class="left"></ng-content><ng-content></ng-content></innerinner>)',
            directives: [core_1.forwardRef(function () { return InnerInnerComponent; })]
        }), 
        __metadata('design:paramtypes', [])
    ], InnerComponent);
    return InnerComponent;
})();
var InnerInnerComponent = (function () {
    function InnerInnerComponent() {
    }
    InnerInnerComponent = __decorate([
        core_1.Component({ selector: 'innerinner' }),
        core_1.View({
            template: 'INNERINNER(<ng-content select=".left"></ng-content>,<ng-content></ng-content>)',
            directives: []
        }), 
        __metadata('design:paramtypes', [])
    ], InnerInnerComponent);
    return InnerInnerComponent;
})();
var ConditionalContentComponent = (function () {
    function ConditionalContentComponent() {
    }
    ConditionalContentComponent = __decorate([
        core_1.Component({ selector: 'conditional-content' }),
        core_1.View({
            template: '<div>(<div *manual><ng-content select=".left"></ng-content></div>, <ng-content></ng-content>)</div>',
            directives: [ManualViewportDirective]
        }), 
        __metadata('design:paramtypes', [])
    ], ConditionalContentComponent);
    return ConditionalContentComponent;
})();
var ConditionalTextComponent = (function () {
    function ConditionalTextComponent() {
    }
    ConditionalTextComponent = __decorate([
        core_1.Component({ selector: 'conditional-text' }),
        core_1.View({
            template: 'MAIN(<template manual>FIRST(<template manual>SECOND(<ng-content></ng-content>)</template>)</template>)',
            directives: [ManualViewportDirective]
        }), 
        __metadata('design:paramtypes', [])
    ], ConditionalTextComponent);
    return ConditionalTextComponent;
})();
var Tab = (function () {
    function Tab() {
    }
    Tab = __decorate([
        core_1.Component({ selector: 'tab' }),
        core_1.View({
            template: '<div><div *manual>TAB(<ng-content></ng-content>)</div></div>',
            directives: [ManualViewportDirective]
        }), 
        __metadata('design:paramtypes', [])
    ], Tab);
    return Tab;
})();
var Tree = (function () {
    function Tree() {
        this.depth = 0;
    }
    Tree = __decorate([
        core_1.Component({ selector: 'tree', inputs: ['depth'] }),
        core_1.View({
            template: 'TREE({{depth}}:<tree *manual [depth]="depth+1"></tree>)',
            directives: [ManualViewportDirective, Tree]
        }), 
        __metadata('design:paramtypes', [])
    ], Tree);
    return Tree;
})();
//# sourceMappingURL=projection_integration_spec.js.map