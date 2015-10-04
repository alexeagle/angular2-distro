var test_lib_1 = require('angular2/test_lib');
var lang_1 = require('angular2/src/core/facade/lang');
var collection_1 = require('angular2/src/core/facade/collection');
var async_1 = require('angular2/src/core/facade/async');
var template_parser_1 = require('angular2/src/core/compiler/template_parser');
var template_commands_1 = require('angular2/src/core/linker/template_commands');
var command_compiler_1 = require('angular2/src/core/compiler/command_compiler');
var directive_metadata_1 = require('angular2/src/core/compiler/directive_metadata');
var source_module_1 = require('angular2/src/core/compiler/source_module');
var api_1 = require('angular2/src/core/render/api');
var eval_module_1 = require('./eval_module');
var util_1 = require('angular2/src/core/compiler/util');
var test_bindings_1 = require('./test_bindings');
var BEGIN_ELEMENT = 'BEGIN_ELEMENT';
var END_ELEMENT = 'END_ELEMENT';
var BEGIN_COMPONENT = 'BEGIN_COMPONENT';
var END_COMPONENT = 'END_COMPONENT';
var TEXT = 'TEXT';
var NG_CONTENT = 'NG_CONTENT';
var EMBEDDED_TEMPLATE = 'EMBEDDED_TEMPLATE';
// Attention: These module names have to correspond to real modules!
var THIS_MODULE_URL = "package:angular2/test/core/compiler/command_compiler_spec" + util_1.MODULE_SUFFIX;
var THIS_MODULE_REF = source_module_1.moduleRef(THIS_MODULE_URL);
var TEMPLATE_COMMANDS_MODULE_REF = source_module_1.moduleRef("package:angular2/src/core/linker/template_commands" + util_1.MODULE_SUFFIX);
// Attention: read by eval!
var RootComp = (function () {
    function RootComp() {
    }
    return RootComp;
})();
exports.RootComp = RootComp;
var SomeDir = (function () {
    function SomeDir() {
    }
    return SomeDir;
})();
exports.SomeDir = SomeDir;
var AComp = (function () {
    function AComp() {
    }
    return AComp;
})();
exports.AComp = AComp;
var RootCompTypeMeta = new directive_metadata_1.CompileTypeMetadata({ name: 'RootComp', runtime: RootComp, moduleUrl: THIS_MODULE_URL });
var SomeDirTypeMeta = new directive_metadata_1.CompileTypeMetadata({ name: 'SomeDir', runtime: SomeDir, moduleUrl: THIS_MODULE_URL });
var ACompTypeMeta = new directive_metadata_1.CompileTypeMetadata({ name: 'AComp', runtime: AComp, moduleUrl: THIS_MODULE_URL });
var compTypeTemplateId = collection_1.MapWrapper.createFromPairs([[RootCompTypeMeta, 1], [SomeDirTypeMeta, 2], [ACompTypeMeta, 3]]);
var APP_ID = 'app1';
var NESTED_COMPONENT = new template_commands_1.CompiledTemplate(45, function () { return []; });
function main() {
    test_lib_1.describe('CommandCompiler', function () {
        test_lib_1.beforeEachBindings(function () { return test_bindings_1.TEST_BINDINGS; });
        var parser;
        var commandCompiler;
        var componentTemplateFactory;
        test_lib_1.beforeEach(test_lib_1.inject([template_parser_1.TemplateParser, command_compiler_1.CommandCompiler], function (_templateParser, _commandCompiler) {
            parser = _templateParser;
            commandCompiler = _commandCompiler;
        }));
        function createComp(_a) {
            var type = _a.type, selector = _a.selector, template = _a.template, encapsulation = _a.encapsulation, ngContentSelectors = _a.ngContentSelectors;
            if (lang_1.isBlank(encapsulation)) {
                encapsulation = api_1.ViewEncapsulation.None;
            }
            if (lang_1.isBlank(selector)) {
                selector = 'root';
            }
            if (lang_1.isBlank(ngContentSelectors)) {
                ngContentSelectors = [];
            }
            if (lang_1.isBlank(template)) {
                template = '';
            }
            return directive_metadata_1.CompileDirectiveMetadata.create({
                selector: selector,
                isComponent: true,
                type: type,
                template: new directive_metadata_1.CompileTemplateMetadata({
                    template: template,
                    ngContentSelectors: ngContentSelectors,
                    encapsulation: encapsulation
                })
            });
        }
        function createDirective(type, selector, exportAs) {
            if (exportAs === void 0) { exportAs = null; }
            return directive_metadata_1.CompileDirectiveMetadata.create({ selector: selector, exportAs: exportAs, isComponent: false, type: type });
        }
        function createTests(run) {
            test_lib_1.describe('text', function () {
                test_lib_1.it('should create unbound text commands', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var rootComp = createComp({ type: RootCompTypeMeta, template: 'a' });
                    run(rootComp, [])
                        .then(function (data) {
                        test_lib_1.expect(data).toEqual([[TEXT, 'a', false, null]]);
                        async.done();
                    });
                }));
                test_lib_1.it('should create bound text commands', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var rootComp = createComp({ type: RootCompTypeMeta, template: '{{a}}' });
                    run(rootComp, [])
                        .then(function (data) {
                        test_lib_1.expect(data).toEqual([[TEXT, null, true, null]]);
                        async.done();
                    });
                }));
            });
            test_lib_1.describe('elements', function () {
                test_lib_1.it('should create unbound element commands', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var rootComp = createComp({ type: RootCompTypeMeta, template: '<div a="b">' });
                    run(rootComp, [])
                        .then(function (data) {
                        test_lib_1.expect(data).toEqual([
                            [BEGIN_ELEMENT, 'div', ['a', 'b'], [], [], [], false, null],
                            [END_ELEMENT]
                        ]);
                        async.done();
                    });
                }));
                test_lib_1.it('should create bound element commands', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var rootComp = createComp({
                        type: RootCompTypeMeta,
                        template: '<div a="b" #some-var (click)="someHandler" (window:scroll)="scrollTo()">'
                    });
                    run(rootComp, [])
                        .then(function (data) {
                        test_lib_1.expect(data).toEqual([
                            [
                                BEGIN_ELEMENT,
                                'div',
                                ['a', 'b'],
                                [null, 'click', 'window', 'scroll'],
                                ['someVar', null],
                                [],
                                true,
                                null
                            ],
                            [END_ELEMENT]
                        ]);
                        async.done();
                    });
                }));
                test_lib_1.it('should create element commands with directives', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var rootComp = createComp({ type: RootCompTypeMeta, template: '<div a #some-var="someExport">' });
                    var dir = directive_metadata_1.CompileDirectiveMetadata.create({
                        selector: '[a]',
                        exportAs: 'someExport',
                        isComponent: false,
                        type: SomeDirTypeMeta,
                        host: { '(click)': 'doIt()', '(window:scroll)': 'doIt()', 'role': 'button' }
                    });
                    run(rootComp, [dir])
                        .then(function (data) {
                        test_lib_1.expect(data).toEqual([
                            [
                                BEGIN_ELEMENT,
                                'div',
                                ['a', '', 'role', 'button'],
                                [null, 'click', 'window', 'scroll'],
                                ['someVar', 0],
                                ['SomeDirType'],
                                true,
                                null
                            ],
                            [END_ELEMENT]
                        ]);
                        async.done();
                    });
                }));
                test_lib_1.it('should emulate style encapsulation', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var rootComp = createComp({
                        type: RootCompTypeMeta,
                        template: '<div>',
                        encapsulation: api_1.ViewEncapsulation.Emulated
                    });
                    run(rootComp, [])
                        .then(function (data) {
                        test_lib_1.expect(data).toEqual([
                            [BEGIN_ELEMENT, 'div', ['_ngcontent-app1-1', ''], [], [], [], false, null],
                            [END_ELEMENT]
                        ]);
                        async.done();
                    });
                }));
                test_lib_1.it('should create nested nodes', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var rootComp = createComp({ type: RootCompTypeMeta, template: '<div>a</div>' });
                    run(rootComp, [])
                        .then(function (data) {
                        test_lib_1.expect(data).toEqual([
                            [BEGIN_ELEMENT, 'div', [], [], [], [], false, null],
                            [TEXT, 'a', false, null],
                            [END_ELEMENT]
                        ]);
                        async.done();
                    });
                }));
            });
            test_lib_1.describe('components', function () {
                test_lib_1.it('should create component commands', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var rootComp = createComp({ type: RootCompTypeMeta, template: '<a a="b" #some-var (click)="someHandler">' });
                    var comp = createComp({ type: ACompTypeMeta, selector: 'a' });
                    run(rootComp, [comp])
                        .then(function (data) {
                        test_lib_1.expect(data).toEqual([
                            [
                                BEGIN_COMPONENT,
                                'a',
                                ['a', 'b'],
                                [null, 'click'],
                                ['someVar', 0],
                                ['ACompType'],
                                false,
                                null,
                                3
                            ],
                            [END_COMPONENT]
                        ]);
                        async.done();
                    });
                }));
                test_lib_1.it('should emulate style encapsulation on host elements', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var rootComp = createComp({
                        type: RootCompTypeMeta,
                        template: '<a></a>',
                        encapsulation: api_1.ViewEncapsulation.Emulated
                    });
                    var comp = createComp({ type: ACompTypeMeta, selector: 'a', encapsulation: api_1.ViewEncapsulation.Emulated });
                    run(rootComp, [comp])
                        .then(function (data) {
                        test_lib_1.expect(data).toEqual([
                            [
                                BEGIN_COMPONENT,
                                'a',
                                ['_nghost-app1-3', '', '_ngcontent-app1-1', ''],
                                [],
                                [],
                                ['ACompType'],
                                false,
                                null,
                                3
                            ],
                            [END_COMPONENT]
                        ]);
                        async.done();
                    });
                }));
                test_lib_1.it('should set nativeShadow flag', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var rootComp = createComp({ type: RootCompTypeMeta, template: '<a></a>' });
                    var comp = createComp({ type: ACompTypeMeta, selector: 'a', encapsulation: api_1.ViewEncapsulation.Native });
                    run(rootComp, [comp])
                        .then(function (data) {
                        test_lib_1.expect(data).toEqual([
                            [BEGIN_COMPONENT, 'a', [], [], [], ['ACompType'], true, null, 3],
                            [END_COMPONENT]
                        ]);
                        async.done();
                    });
                }));
                test_lib_1.it('should create nested nodes and set ngContentIndex', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var rootComp = createComp({ type: RootCompTypeMeta, template: '<a>t</a>' });
                    var comp = createComp({ type: ACompTypeMeta, selector: 'a', ngContentSelectors: ['*'] });
                    run(rootComp, [comp])
                        .then(function (data) {
                        test_lib_1.expect(data).toEqual([
                            [BEGIN_COMPONENT, 'a', [], [], [], ['ACompType'], false, null, 3],
                            [TEXT, 't', false, 0],
                            [END_COMPONENT]
                        ]);
                        async.done();
                    });
                }));
            });
            test_lib_1.describe('embedded templates', function () {
                test_lib_1.it('should create embedded template commands', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var rootComp = createComp({ type: RootCompTypeMeta, template: '<template a="b"></template>' });
                    var dir = createDirective(SomeDirTypeMeta, '[a]');
                    run(rootComp, [dir], 1)
                        .then(function (data) {
                        test_lib_1.expect(data).toEqual([
                            [EMBEDDED_TEMPLATE, ['a', 'b'], [], ['SomeDirType'], false, null, 'cd1', []]
                        ]);
                        async.done();
                    });
                }));
                test_lib_1.it('should keep variable name and value for <template> elements', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var rootComp = createComp({
                        type: RootCompTypeMeta,
                        template: '<template #some-var="someValue" #some-empty-var></template>'
                    });
                    var dir = createDirective(SomeDirTypeMeta, '[a]');
                    run(rootComp, [dir], 1)
                        .then(function (data) {
                        test_lib_1.expect(data[0][2])
                            .toEqual(['someEmptyVar', '$implicit', 'someVar', 'someValue']);
                        async.done();
                    });
                }));
                test_lib_1.it('should keep variable name and value for template attributes', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var rootComp = createComp({
                        type: RootCompTypeMeta,
                        template: '<div template="var someVar=someValue; var someEmptyVar"></div>'
                    });
                    var dir = createDirective(SomeDirTypeMeta, '[a]');
                    run(rootComp, [dir], 1)
                        .then(function (data) {
                        test_lib_1.expect(data[0][2])
                            .toEqual(['someVar', 'someValue', 'someEmptyVar', '$implicit']);
                        async.done();
                    });
                }));
                test_lib_1.it('should created nested nodes', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var rootComp = createComp({ type: RootCompTypeMeta, template: '<template>t</template>' });
                    run(rootComp, [], 1)
                        .then(function (data) {
                        test_lib_1.expect(data).toEqual([
                            [
                                EMBEDDED_TEMPLATE,
                                [],
                                [],
                                [],
                                false,
                                null,
                                'cd1',
                                [[TEXT, 't', false, null]]
                            ]
                        ]);
                        async.done();
                    });
                }));
                test_lib_1.it('should calculate wether the template is merged based on nested ng-content elements', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var rootComp = createComp({
                        type: RootCompTypeMeta,
                        template: '<template><ng-content></ng-content></template>'
                    });
                    run(rootComp, [], 1)
                        .then(function (data) {
                        test_lib_1.expect(data).toEqual([[EMBEDDED_TEMPLATE, [], [], [], true, null, 'cd1', [[NG_CONTENT, null]]]]);
                        async.done();
                    });
                }));
            });
            test_lib_1.describe('ngContent', function () {
                test_lib_1.it('should create ng-content commands', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var rootComp = createComp({ type: RootCompTypeMeta, template: '<ng-content></ng-content>' });
                    run(rootComp, [])
                        .then(function (data) {
                        test_lib_1.expect(data).toEqual([[NG_CONTENT, null]]);
                        async.done();
                    });
                }));
            });
        }
        test_lib_1.describe('compileComponentRuntime', function () {
            test_lib_1.beforeEach(function () {
                componentTemplateFactory = function (directive) {
                    return new template_commands_1.CompiledTemplate(compTypeTemplateId.get(directive.type), function () { return []; });
                };
            });
            function run(component, directives, embeddedTemplateCount) {
                if (embeddedTemplateCount === void 0) { embeddedTemplateCount = 0; }
                var changeDetectorFactories = [];
                for (var i = 0; i < embeddedTemplateCount + 1; i++) {
                    (function (i) { changeDetectorFactories.push(function (_) { return ("cd" + i); }); })(i);
                }
                var parsedTemplate = parser.parse(component.template.template, directives, component.type.name);
                var commands = commandCompiler.compileComponentRuntime(component, APP_ID, compTypeTemplateId.get(component.type), parsedTemplate, changeDetectorFactories, componentTemplateFactory);
                return async_1.PromiseWrapper.resolve(humanize(commands));
            }
            createTests(run);
        });
        test_lib_1.describe('compileComponentCodeGen', function () {
            test_lib_1.beforeEach(function () {
                componentTemplateFactory = function (directive) {
                    return "new " + TEMPLATE_COMMANDS_MODULE_REF + "CompiledTemplate(" + compTypeTemplateId.get(directive.type) + ", " + util_1.codeGenValueFn([], '{}') + ")";
                };
            });
            function run(component, directives, embeddedTemplateCount) {
                if (embeddedTemplateCount === void 0) { embeddedTemplateCount = 0; }
                var changeDetectorFactoryExpressions = [];
                for (var i = 0; i < embeddedTemplateCount + 1; i++) {
                    changeDetectorFactoryExpressions.push(util_1.codeGenValueFn(['_'], "'cd" + i + "'"));
                }
                var parsedTemplate = parser.parse(component.template.template, directives, component.type.name);
                var sourceModule = commandCompiler.compileComponentCodeGen(component, "'" + APP_ID + "'", "" + compTypeTemplateId.get(component.type), parsedTemplate, changeDetectorFactoryExpressions, componentTemplateFactory);
                var testableModule = createTestableModule(sourceModule).getSourceWithImports();
                return eval_module_1.evalModule(testableModule.source, testableModule.imports, null);
            }
            createTests(run);
        });
    });
}
exports.main = main;
// Attention: read by eval!
function humanize(cmds) {
    var visitor = new CommandHumanizer();
    template_commands_1.visitAllCommands(visitor, cmds);
    return visitor.result;
}
exports.humanize = humanize;
function checkAndStringifyType(type) {
    test_lib_1.expect(lang_1.isType(type)).toBe(true);
    return lang_1.stringify(type) + "Type";
}
var CommandHumanizer = (function () {
    function CommandHumanizer() {
        this.result = [];
    }
    CommandHumanizer.prototype.visitText = function (cmd, context) {
        this.result.push([TEXT, cmd.value, cmd.isBound, cmd.ngContentIndex]);
        return null;
    };
    CommandHumanizer.prototype.visitNgContent = function (cmd, context) {
        this.result.push([NG_CONTENT, cmd.ngContentIndex]);
        return null;
    };
    CommandHumanizer.prototype.visitBeginElement = function (cmd, context) {
        this.result.push([
            BEGIN_ELEMENT,
            cmd.name,
            cmd.attrNameAndValues,
            cmd.eventTargetAndNames,
            cmd.variableNameAndValues,
            cmd.directives.map(checkAndStringifyType),
            cmd.isBound,
            cmd.ngContentIndex
        ]);
        return null;
    };
    CommandHumanizer.prototype.visitEndElement = function (context) {
        this.result.push([END_ELEMENT]);
        return null;
    };
    CommandHumanizer.prototype.visitBeginComponent = function (cmd, context) {
        this.result.push([
            BEGIN_COMPONENT,
            cmd.name,
            cmd.attrNameAndValues,
            cmd.eventTargetAndNames,
            cmd.variableNameAndValues,
            cmd.directives.map(checkAndStringifyType),
            cmd.nativeShadow,
            cmd.ngContentIndex,
            cmd.template.id
        ]);
        return null;
    };
    CommandHumanizer.prototype.visitEndComponent = function (context) {
        this.result.push([END_COMPONENT]);
        return null;
    };
    CommandHumanizer.prototype.visitEmbeddedTemplate = function (cmd, context) {
        this.result.push([
            EMBEDDED_TEMPLATE,
            cmd.attrNameAndValues,
            cmd.variableNameAndValues,
            cmd.directives.map(checkAndStringifyType),
            cmd.isMerged,
            cmd.ngContentIndex,
            cmd.changeDetectorFactory(null),
            humanize(cmd.children)
        ]);
        return null;
    };
    return CommandHumanizer;
})();
function createTestableModule(source) {
    var resultExpression = THIS_MODULE_REF + "humanize(" + source.expression + ")";
    var testableSource = source.declarations.join('\n') + "\n  " + util_1.codeGenExportVariable('run') + util_1.codeGenValueFn(['_'], resultExpression) + ";";
    return new source_module_1.SourceModule(null, testableSource);
}
//# sourceMappingURL=command_compiler_spec.js.map