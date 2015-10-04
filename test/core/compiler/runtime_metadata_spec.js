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
var runtime_metadata_1 = require('angular2/src/core/compiler/runtime_metadata');
var interfaces_1 = require('angular2/src/core/linker/interfaces');
var core_1 = require('angular2/core');
var test_bindings_1 = require('./test_bindings');
var util_1 = require('angular2/src/core/compiler/util');
function main() {
    test_lib_1.describe('RuntimeMetadataResolver', function () {
        test_lib_1.beforeEachBindings(function () { return test_bindings_1.TEST_BINDINGS; });
        test_lib_1.describe('getMetadata', function () {
            test_lib_1.it('should read metadata', test_lib_1.inject([runtime_metadata_1.RuntimeMetadataResolver], function (resolver) {
                var meta = resolver.getMetadata(ComponentWithEverything);
                test_lib_1.expect(meta.selector).toEqual('someSelector');
                test_lib_1.expect(meta.exportAs).toEqual('someExportAs');
                test_lib_1.expect(meta.isComponent).toBe(true);
                test_lib_1.expect(meta.dynamicLoadable).toBe(true);
                test_lib_1.expect(meta.type.runtime).toBe(ComponentWithEverything);
                test_lib_1.expect(meta.type.name).toEqual(lang_1.stringify(ComponentWithEverything));
                test_lib_1.expect(meta.type.moduleUrl).toEqual("package:someModuleId" + util_1.MODULE_SUFFIX);
                test_lib_1.expect(meta.lifecycleHooks).toEqual(interfaces_1.LIFECYCLE_HOOKS_VALUES);
                test_lib_1.expect(meta.changeDetection).toBe(core_1.ChangeDetectionStrategy.CheckAlways);
                test_lib_1.expect(meta.inputs).toEqual({ 'someProp': 'someProp' });
                test_lib_1.expect(meta.outputs).toEqual({ 'someEvent': 'someEvent' });
                test_lib_1.expect(meta.hostListeners).toEqual({ 'someHostListener': 'someHostListenerExpr' });
                test_lib_1.expect(meta.hostProperties).toEqual({ 'someHostProp': 'someHostPropExpr' });
                test_lib_1.expect(meta.hostAttributes).toEqual({ 'someHostAttr': 'someHostAttrValue' });
                test_lib_1.expect(meta.template.encapsulation).toBe(core_1.ViewEncapsulation.Emulated);
                test_lib_1.expect(meta.template.styles).toEqual(['someStyle']);
                test_lib_1.expect(meta.template.styleUrls).toEqual(['someStyleUrl']);
                test_lib_1.expect(meta.template.template).toEqual('someTemplate');
                test_lib_1.expect(meta.template.templateUrl).toEqual('someTemplateUrl');
            }));
            test_lib_1.it('should use the moduleUrl from the reflector if none is given', test_lib_1.inject([runtime_metadata_1.RuntimeMetadataResolver], function (resolver) {
                var value = resolver.getMetadata(DirectiveWithoutModuleId).type.moduleUrl;
                var expectedEndValue = util_1.IS_DART ? 'base/dist/dart/angular2/test/core/compiler/runtime_metadata_spec.dart' :
                    './';
                test_lib_1.expect(value.endsWith(expectedEndValue)).toBe(true);
            }));
        });
        test_lib_1.describe('getViewDirectivesMetadata', function () {
            test_lib_1.it('should return the directive metadatas', test_lib_1.inject([runtime_metadata_1.RuntimeMetadataResolver], function (resolver) {
                test_lib_1.expect(resolver.getViewDirectivesMetadata(ComponentWithEverything))
                    .toEqual([resolver.getMetadata(DirectiveWithoutModuleId)]);
            }));
        });
    });
}
exports.main = main;
var DirectiveWithoutModuleId = (function () {
    function DirectiveWithoutModuleId() {
    }
    DirectiveWithoutModuleId = __decorate([
        core_1.Directive({ selector: 'someSelector' }), 
        __metadata('design:paramtypes', [])
    ], DirectiveWithoutModuleId);
    return DirectiveWithoutModuleId;
})();
var ComponentWithEverything = (function () {
    function ComponentWithEverything() {
    }
    ComponentWithEverything.prototype.onChanges = function (changes) { };
    ComponentWithEverything.prototype.onInit = function () { };
    ComponentWithEverything.prototype.doCheck = function () { };
    ComponentWithEverything.prototype.onDestroy = function () { };
    ComponentWithEverything.prototype.afterContentInit = function () { };
    ComponentWithEverything.prototype.afterContentChecked = function () { };
    ComponentWithEverything.prototype.afterViewInit = function () { };
    ComponentWithEverything.prototype.afterViewChecked = function () { };
    ComponentWithEverything = __decorate([
        core_1.Component({
            selector: 'someSelector',
            inputs: ['someProp'],
            outputs: ['someEvent'],
            host: {
                '[someHostProp]': 'someHostPropExpr',
                '(someHostListener)': 'someHostListenerExpr',
                'someHostAttr': 'someHostAttrValue'
            },
            exportAs: 'someExportAs',
            moduleId: 'someModuleId',
            changeDetection: core_1.ChangeDetectionStrategy.CheckAlways
        }),
        core_1.View({
            template: 'someTemplate',
            templateUrl: 'someTemplateUrl',
            encapsulation: core_1.ViewEncapsulation.Emulated,
            styles: ['someStyle'],
            styleUrls: ['someStyleUrl'],
            directives: [DirectiveWithoutModuleId]
        }), 
        __metadata('design:paramtypes', [])
    ], ComponentWithEverything);
    return ComponentWithEverything;
})();
//# sourceMappingURL=runtime_metadata_spec.js.map