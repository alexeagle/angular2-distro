var test_lib_1 = require('angular2/test_lib');
var directive_metadata_1 = require('angular2/src/core/compiler/directive_metadata');
var view_1 = require('angular2/src/core/metadata/view');
var change_detection_1 = require('angular2/src/core/change_detection');
var interfaces_1 = require('angular2/src/core/linker/interfaces');
function main() {
    test_lib_1.describe('DirectiveMetadata', function () {
        var fullTypeMeta;
        var fullTemplateMeta;
        var fullDirectiveMeta;
        test_lib_1.beforeEach(function () {
            fullTypeMeta =
                new directive_metadata_1.CompileTypeMetadata({ name: 'SomeType', moduleUrl: 'someUrl', isHost: true });
            fullTemplateMeta = new directive_metadata_1.CompileTemplateMetadata({
                encapsulation: view_1.ViewEncapsulation.Emulated,
                template: '<a></a>',
                templateUrl: 'someTemplateUrl',
                styles: ['someStyle'],
                styleUrls: ['someStyleUrl'],
                ngContentSelectors: ['*']
            });
            fullDirectiveMeta = directive_metadata_1.CompileDirectiveMetadata.create({
                selector: 'someSelector',
                isComponent: true,
                dynamicLoadable: true,
                type: fullTypeMeta, template: fullTemplateMeta,
                changeDetection: change_detection_1.ChangeDetectionStrategy.Default,
                inputs: ['someProp'],
                outputs: ['someEvent'],
                host: { '(event1)': 'handler1', '[prop1]': 'expr1', 'attr1': 'attrValue2' },
                lifecycleHooks: [interfaces_1.LifecycleHooks.OnChanges]
            });
        });
        test_lib_1.describe('DirectiveMetadata', function () {
            test_lib_1.it('should serialize with full data', function () {
                test_lib_1.expect(directive_metadata_1.CompileDirectiveMetadata.fromJson(fullDirectiveMeta.toJson()))
                    .toEqual(fullDirectiveMeta);
            });
            test_lib_1.it('should serialize with no data', function () {
                var empty = directive_metadata_1.CompileDirectiveMetadata.create();
                test_lib_1.expect(directive_metadata_1.CompileDirectiveMetadata.fromJson(empty.toJson())).toEqual(empty);
            });
        });
        test_lib_1.describe('TypeMetadata', function () {
            test_lib_1.it('should serialize with full data', function () {
                test_lib_1.expect(directive_metadata_1.CompileTypeMetadata.fromJson(fullTypeMeta.toJson())).toEqual(fullTypeMeta);
            });
            test_lib_1.it('should serialize with no data', function () {
                var empty = new directive_metadata_1.CompileTypeMetadata();
                test_lib_1.expect(directive_metadata_1.CompileTypeMetadata.fromJson(empty.toJson())).toEqual(empty);
            });
        });
        test_lib_1.describe('TemplateMetadata', function () {
            test_lib_1.it('should use ViewEncapsulation.Emulated by default', function () {
                test_lib_1.expect(new directive_metadata_1.CompileTemplateMetadata({ encapsulation: null }).encapsulation)
                    .toBe(view_1.ViewEncapsulation.Emulated);
            });
            test_lib_1.it('should serialize with full data', function () {
                test_lib_1.expect(directive_metadata_1.CompileTemplateMetadata.fromJson(fullTemplateMeta.toJson()))
                    .toEqual(fullTemplateMeta);
            });
            test_lib_1.it('should serialize with no data', function () {
                var empty = new directive_metadata_1.CompileTemplateMetadata();
                test_lib_1.expect(directive_metadata_1.CompileTemplateMetadata.fromJson(empty.toJson())).toEqual(empty);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=directive_metadata_spec.js.map