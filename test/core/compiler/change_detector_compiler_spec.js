var test_lib_1 = require('angular2/test_lib');
var di_1 = require('angular2/src/core/di');
var lang_1 = require('angular2/src/core/facade/lang');
var collection_1 = require('angular2/src/core/facade/collection');
var change_detector_compiler_1 = require('angular2/src/core/compiler/change_detector_compiler');
var directive_metadata_1 = require('angular2/src/core/compiler/directive_metadata');
var source_module_1 = require('angular2/src/core/compiler/source_module');
var template_parser_1 = require('angular2/src/core/compiler/template_parser');
var change_detection_1 = require('angular2/src/core/change_detection/change_detection');
var eval_module_1 = require('./eval_module');
var test_bindings_1 = require('./test_bindings');
var change_detector_mocks_1 = require('./change_detector_mocks');
var util_1 = require('angular2/src/core/compiler/util');
// Attention: These module names have to correspond to real modules!
var THIS_MODULE_ID = 'angular2/test/core/compiler/change_detector_compiler_spec';
var THIS_MODULE_URL = "package:" + THIS_MODULE_ID + util_1.MODULE_SUFFIX;
var THIS_MODULE_REF = source_module_1.moduleRef(THIS_MODULE_URL);
function main() {
    test_lib_1.describe('ChangeDetectorCompiler', function () {
        test_lib_1.beforeEachBindings(function () { return test_bindings_1.TEST_BINDINGS; });
        var parser;
        var compiler;
        test_lib_1.beforeEach(test_lib_1.inject([template_parser_1.TemplateParser, change_detector_compiler_1.ChangeDetectionCompiler], function (_parser, _compiler) {
            parser = _parser;
            compiler = _compiler;
        }));
        test_lib_1.describe('compileComponentRuntime', function () {
            function detectChanges(compiler, template, directives) {
                if (directives === void 0) { directives = lang_1.CONST_EXPR([]); }
                var type = new directive_metadata_1.CompileTypeMetadata({ name: lang_1.stringify(SomeComponent), moduleUrl: THIS_MODULE_URL });
                var parsedTemplate = parser.parse(template, directives, 'TestComp');
                var factories = compiler.compileComponentRuntime(type, change_detection_1.ChangeDetectionStrategy.Default, parsedTemplate);
                return testChangeDetector(factories[0]);
            }
            test_lib_1.describe('no jit', function () {
                test_lib_1.beforeEachBindings(function () { return [
                    di_1.bind(change_detection_1.ChangeDetectorGenConfig)
                        .toValue(new change_detection_1.ChangeDetectorGenConfig(true, true, false, false))
                ]; });
                test_lib_1.it('should watch element properties', function () {
                    test_lib_1.expect(detectChanges(compiler, '<div [el-prop]="someProp">'))
                        .toEqual(['elementProperty(elProp)=someValue']);
                });
            });
            test_lib_1.describe('jit', function () {
                test_lib_1.beforeEachBindings(function () { return [
                    di_1.bind(change_detection_1.ChangeDetectorGenConfig)
                        .toValue(new change_detection_1.ChangeDetectorGenConfig(true, true, false, true))
                ]; });
                test_lib_1.it('should watch element properties', function () {
                    test_lib_1.expect(detectChanges(compiler, '<div [el-prop]="someProp">'))
                        .toEqual(['elementProperty(elProp)=someValue']);
                });
            });
        });
        test_lib_1.describe('compileComponentCodeGen', function () {
            function detectChanges(compiler, template, directives) {
                if (directives === void 0) { directives = lang_1.CONST_EXPR([]); }
                var type = new directive_metadata_1.CompileTypeMetadata({ name: lang_1.stringify(SomeComponent), moduleUrl: THIS_MODULE_URL });
                var parsedTemplate = parser.parse(template, directives, 'TestComp');
                var sourceExpressions = compiler.compileComponentCodeGen(type, change_detection_1.ChangeDetectionStrategy.Default, parsedTemplate);
                var testableModule = createTestableModule(sourceExpressions, 0).getSourceWithImports();
                return eval_module_1.evalModule(testableModule.source, testableModule.imports, null);
            }
            test_lib_1.it('should watch element properties', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                detectChanges(compiler, '<div [el-prop]="someProp">')
                    .then(function (value) {
                    test_lib_1.expect(value).toEqual(['elementProperty(elProp)=someValue']);
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
function createTestableModule(source, changeDetectorIndex) {
    var resultExpression = THIS_MODULE_REF + "testChangeDetector(([" + source.expressions.join(',') + "])[" + changeDetectorIndex + "])";
    var testableSource = source.declarations.join('\n') + "\n  " + util_1.codeGenExportVariable('run') + util_1.codeGenValueFn(['_'], resultExpression) + ";";
    return new source_module_1.SourceModule(null, testableSource);
}
function testChangeDetector(changeDetectorFactory) {
    var dispatcher = new change_detector_mocks_1.TestDispatcher([], []);
    var cd = changeDetectorFactory(dispatcher);
    var ctx = new SomeComponent();
    ctx.someProp = 'someValue';
    var locals = new change_detection_1.Locals(null, collection_1.MapWrapper.createFromStringMap({ 'someVar': null }));
    cd.hydrate(ctx, locals, dispatcher, new change_detector_mocks_1.TestPipes());
    cd.detectChanges();
    return dispatcher.log;
}
exports.testChangeDetector = testChangeDetector;
var SomeComponent = (function () {
    function SomeComponent() {
    }
    return SomeComponent;
})();
//# sourceMappingURL=change_detector_compiler_spec.js.map