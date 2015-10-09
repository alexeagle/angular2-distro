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
var async_1 = require('angular2/src/core/facade/async');
var lang_1 = require('angular2/src/core/facade/lang');
var collection_1 = require('angular2/src/core/facade/collection');
var runtime_metadata_1 = require('angular2/src/core/compiler/runtime_metadata');
var template_compiler_1 = require('angular2/src/core/compiler/template_compiler');
var eval_module_1 = require('./eval_module');
var source_module_1 = require('angular2/src/core/compiler/source_module');
var xhr_1 = require('angular2/src/core/compiler/xhr');
var view_1 = require('angular2/src/core/metadata/view');
var change_detection_1 = require('angular2/src/core/change_detection/change_detection');
var template_commands_1 = require('angular2/src/core/linker/template_commands');
var core_1 = require('angular2/core');
var test_bindings_1 = require('./test_bindings');
var change_detector_mocks_1 = require('./change_detector_mocks');
var util_1 = require('angular2/src/core/compiler/util');
var application_tokens_1 = require('angular2/src/core/application_tokens');
// Attention: This path has to point to this test file!
var THIS_MODULE_ID = 'angular2/test/core/compiler/template_compiler_spec';
var THIS_MODULE_REF = source_module_1.moduleRef("package:" + THIS_MODULE_ID + util_1.MODULE_SUFFIX);
var APP_ID_VALUE = 'app1';
function main() {
    test_lib_1.describe('TemplateCompiler', function () {
        var compiler;
        var runtimeMetadataResolver;
        test_lib_1.beforeEachBindings(function () { return [core_1.bind(application_tokens_1.APP_ID).toValue(APP_ID_VALUE), test_bindings_1.TEST_BINDINGS]; });
        test_lib_1.beforeEach(test_lib_1.inject([template_compiler_1.TemplateCompiler, runtime_metadata_1.RuntimeMetadataResolver], function (_compiler, _runtimeMetadataResolver) {
            compiler = _compiler;
            runtimeMetadataResolver = _runtimeMetadataResolver;
        }));
        test_lib_1.describe('compile templates', function () {
            function runTests(compile) {
                test_lib_1.it('should throw for non components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    async_1.PromiseWrapper.catchError(async_1.PromiseWrapper.wrap(function () { return compile([NonComponent]); }), function (error) {
                        test_lib_1.expect(error.message)
                            .toEqual("Could not compile '" + lang_1.stringify(NonComponent) + "' because it is not a component.");
                        async.done();
                    });
                }));
                test_lib_1.it('should compile host components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    compile([CompWithBindingsAndStyles])
                        .then(function (humanizedTemplate) {
                        test_lib_1.expect(humanizedTemplate['styles']).toEqual([]);
                        test_lib_1.expect(humanizedTemplate['commands'][0]).toEqual('<comp-a>');
                        test_lib_1.expect(humanizedTemplate['cd']).toEqual(['elementProperty(title)=someDirValue']);
                        async.done();
                    });
                }));
                test_lib_1.it('should compile nested components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    compile([CompWithBindingsAndStyles])
                        .then(function (humanizedTemplate) {
                        var nestedTemplate = humanizedTemplate['commands'][1];
                        test_lib_1.expect(nestedTemplate['styles']).toEqual(['div {color: red}']);
                        test_lib_1.expect(nestedTemplate['commands'][0]).toEqual('<a>');
                        test_lib_1.expect(nestedTemplate['cd']).toEqual(['elementProperty(href)=someCtxValue']);
                        async.done();
                    });
                }));
                test_lib_1.it('should compile recursive components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    compile([TreeComp])
                        .then(function (humanizedTemplate) {
                        test_lib_1.expect(humanizedTemplate['commands'][0]).toEqual('<tree>');
                        test_lib_1.expect(humanizedTemplate['commands'][1]['commands'][0]).toEqual('<tree>');
                        test_lib_1.expect(humanizedTemplate['commands'][1]['commands'][1]['commands'][0])
                            .toEqual('<tree>');
                        async.done();
                    });
                }));
                test_lib_1.it('should pass the right change detector to embedded templates', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    compile([CompWithEmbeddedTemplate])
                        .then(function (humanizedTemplate) {
                        test_lib_1.expect(humanizedTemplate['commands'][1]['commands'][0]).toEqual('<template>');
                        test_lib_1.expect(humanizedTemplate['commands'][1]['commands'][1]['cd'])
                            .toEqual(['elementProperty(href)=someCtxValue']);
                        async.done();
                    });
                }));
            }
            test_lib_1.describe('compileHostComponentRuntime', function () {
                function compile(components) {
                    return compiler.compileHostComponentRuntime(components[0])
                        .then(function (compiledHostTemplate) { return humanizeTemplate(compiledHostTemplate.getTemplate()); });
                }
                runTests(compile);
                test_lib_1.it('should cache components for parallel requests', test_lib_1.inject([test_lib_1.AsyncTestCompleter, xhr_1.XHR], function (async, xhr) {
                    xhr.expect('package:angular2/test/core/compiler/compUrl.html', 'a');
                    async_1.PromiseWrapper.all([compile([CompWithTemplateUrl]), compile([CompWithTemplateUrl])])
                        .then(function (humanizedTemplates) {
                        test_lib_1.expect(humanizedTemplates[0]['commands'][1]['commands']).toEqual(['#text(a)']);
                        test_lib_1.expect(humanizedTemplates[1]['commands'][1]['commands']).toEqual(['#text(a)']);
                        async.done();
                    });
                    xhr.flush();
                }));
                test_lib_1.it('should cache components for sequential requests', test_lib_1.inject([test_lib_1.AsyncTestCompleter, xhr_1.XHR], function (async, xhr) {
                    xhr.expect('package:angular2/test/core/compiler/compUrl.html', 'a');
                    compile([CompWithTemplateUrl])
                        .then(function (humanizedTemplate0) {
                        return compile([CompWithTemplateUrl])
                            .then(function (humanizedTemplate1) {
                            test_lib_1.expect(humanizedTemplate0['commands'][1]['commands'])
                                .toEqual(['#text(a)']);
                            test_lib_1.expect(humanizedTemplate1['commands'][1]['commands'])
                                .toEqual(['#text(a)']);
                            async.done();
                        });
                    });
                    xhr.flush();
                }));
                test_lib_1.it('should allow to clear the cache', test_lib_1.inject([test_lib_1.AsyncTestCompleter, xhr_1.XHR], function (async, xhr) {
                    xhr.expect('package:angular2/test/core/compiler/compUrl.html', 'a');
                    compile([CompWithTemplateUrl])
                        .then(function (humanizedTemplate) {
                        compiler.clearCache();
                        xhr.expect('package:angular2/test/core/compiler/compUrl.html', 'b');
                        var result = compile([CompWithTemplateUrl]);
                        xhr.flush();
                        return result;
                    })
                        .then(function (humanizedTemplate) {
                        test_lib_1.expect(humanizedTemplate['commands'][1]['commands']).toEqual(['#text(b)']);
                        async.done();
                    });
                    xhr.flush();
                }));
            });
            test_lib_1.describe('compileTemplatesCodeGen', function () {
                function normalizeComponent(component) {
                    var compAndViewDirMetas = [runtimeMetadataResolver.getMetadata(component)].concat(runtimeMetadataResolver.getViewDirectivesMetadata(component));
                    return async_1.PromiseWrapper.all(compAndViewDirMetas.map(function (meta) { return compiler.normalizeDirectiveMetadata(meta); }))
                        .then(function (normalizedCompAndViewDirMetas) {
                        return new template_compiler_1.NormalizedComponentWithViewDirectives(normalizedCompAndViewDirMetas[0], normalizedCompAndViewDirMetas.slice(1));
                    });
                }
                function compile(components) {
                    return async_1.PromiseWrapper.all(components.map(normalizeComponent))
                        .then(function (normalizedCompWithViewDirMetas) {
                        var sourceModule = compiler.compileTemplatesCodeGen(normalizedCompWithViewDirMetas);
                        var sourceWithImports = testableTemplateModule(sourceModule, normalizedCompWithViewDirMetas[0].component)
                            .getSourceWithImports();
                        return eval_module_1.evalModule(sourceWithImports.source, sourceWithImports.imports, null);
                    });
                }
                runTests(compile);
            });
        });
        test_lib_1.describe('normalizeDirectiveMetadata', function () {
            test_lib_1.it('should return the given DirectiveMetadata for non components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var meta = runtimeMetadataResolver.getMetadata(NonComponent);
                compiler.normalizeDirectiveMetadata(meta).then(function (normMeta) {
                    test_lib_1.expect(normMeta).toBe(meta);
                    async.done();
                });
            }));
            test_lib_1.it('should normalize the template', test_lib_1.inject([test_lib_1.AsyncTestCompleter, xhr_1.XHR], function (async, xhr) {
                xhr.expect('package:angular2/test/core/compiler/compUrl.html', 'loadedTemplate');
                compiler.normalizeDirectiveMetadata(runtimeMetadataResolver.getMetadata(CompWithTemplateUrl))
                    .then(function (meta) {
                    test_lib_1.expect(meta.template.template).toEqual('loadedTemplate');
                    async.done();
                });
                xhr.flush();
            }));
            test_lib_1.it('should copy all the other fields', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var meta = runtimeMetadataResolver.getMetadata(CompWithBindingsAndStyles);
                compiler.normalizeDirectiveMetadata(meta).then(function (normMeta) {
                    test_lib_1.expect(normMeta.type).toEqual(meta.type);
                    test_lib_1.expect(normMeta.isComponent).toEqual(meta.isComponent);
                    test_lib_1.expect(normMeta.dynamicLoadable).toEqual(meta.dynamicLoadable);
                    test_lib_1.expect(normMeta.selector).toEqual(meta.selector);
                    test_lib_1.expect(normMeta.exportAs).toEqual(meta.exportAs);
                    test_lib_1.expect(normMeta.changeDetection).toEqual(meta.changeDetection);
                    test_lib_1.expect(normMeta.inputs).toEqual(meta.inputs);
                    test_lib_1.expect(normMeta.outputs).toEqual(meta.outputs);
                    test_lib_1.expect(normMeta.hostListeners).toEqual(meta.hostListeners);
                    test_lib_1.expect(normMeta.hostProperties).toEqual(meta.hostProperties);
                    test_lib_1.expect(normMeta.hostAttributes).toEqual(meta.hostAttributes);
                    test_lib_1.expect(normMeta.lifecycleHooks).toEqual(meta.lifecycleHooks);
                    async.done();
                });
            }));
        });
        test_lib_1.describe('compileStylesheetCodeGen', function () {
            test_lib_1.it('should compile stylesheets into code', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var cssText = 'div {color: red}';
                var sourceModule = compiler.compileStylesheetCodeGen('package:someModuleUrl', cssText)[0];
                var sourceWithImports = testableStylesModule(sourceModule).getSourceWithImports();
                eval_module_1.evalModule(sourceWithImports.source, sourceWithImports.imports, null)
                    .then(function (loadedCssText) {
                    test_lib_1.expect(loadedCssText).toEqual([cssText]);
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
var CompWithBindingsAndStyles = (function () {
    function CompWithBindingsAndStyles() {
    }
    CompWithBindingsAndStyles = __decorate([
        core_1.Component({
            selector: 'comp-a',
            host: { '[title]': 'someProp' },
            moduleId: THIS_MODULE_ID,
            exportAs: 'someExportAs'
        }),
        core_1.View({
            template: '<a [href]="someProp"></a>',
            styles: ['div {color: red}'],
            encapsulation: view_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], CompWithBindingsAndStyles);
    return CompWithBindingsAndStyles;
})();
var TreeComp = (function () {
    function TreeComp() {
    }
    TreeComp = __decorate([
        core_1.Component({ selector: 'tree', moduleId: THIS_MODULE_ID }),
        core_1.View({ template: '<tree></tree>', directives: [TreeComp], encapsulation: view_1.ViewEncapsulation.None }), 
        __metadata('design:paramtypes', [])
    ], TreeComp);
    return TreeComp;
})();
var CompWithTemplateUrl = (function () {
    function CompWithTemplateUrl() {
    }
    CompWithTemplateUrl = __decorate([
        core_1.Component({ selector: 'comp-url', moduleId: THIS_MODULE_ID }),
        core_1.View({ templateUrl: 'compUrl.html', encapsulation: view_1.ViewEncapsulation.None }), 
        __metadata('design:paramtypes', [])
    ], CompWithTemplateUrl);
    return CompWithTemplateUrl;
})();
var CompWithEmbeddedTemplate = (function () {
    function CompWithEmbeddedTemplate() {
    }
    CompWithEmbeddedTemplate = __decorate([
        core_1.Component({ selector: 'comp-tpl', moduleId: THIS_MODULE_ID }),
        core_1.View({
            template: '<template><a [href]="someProp"></a></template>',
            encapsulation: view_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], CompWithEmbeddedTemplate);
    return CompWithEmbeddedTemplate;
})();
var NonComponent = (function () {
    function NonComponent() {
    }
    NonComponent = __decorate([
        core_1.Directive({ selector: 'plain', moduleId: THIS_MODULE_ID }),
        core_1.View({ template: '' }), 
        __metadata('design:paramtypes', [])
    ], NonComponent);
    return NonComponent;
})();
function testableTemplateModule(sourceModule, normComp) {
    var resultExpression = THIS_MODULE_REF + "humanizeTemplate(Host" + normComp.type.name + "Template.getTemplate())";
    var testableSource = sourceModule.sourceWithModuleRefs + "\n  " + util_1.codeGenExportVariable('run') + util_1.codeGenValueFn(['_'], resultExpression) + ";";
    return new source_module_1.SourceModule(sourceModule.moduleUrl, testableSource);
}
function testableStylesModule(sourceModule) {
    var testableSource = sourceModule.sourceWithModuleRefs + "\n  " + util_1.codeGenExportVariable('run') + util_1.codeGenValueFn(['_'], 'STYLES') + ";";
    return new source_module_1.SourceModule(sourceModule.moduleUrl, testableSource);
}
// Attention: read by eval!
function humanizeTemplate(template, humanizedTemplates) {
    if (humanizedTemplates === void 0) { humanizedTemplates = null; }
    if (lang_1.isBlank(humanizedTemplates)) {
        humanizedTemplates = new Map();
    }
    var result = humanizedTemplates.get(template.id);
    if (lang_1.isPresent(result)) {
        return result;
    }
    var templateData = template.getData(APP_ID_VALUE);
    var commands = [];
    result = {
        'styles': templateData.styles,
        'commands': commands,
        'cd': testChangeDetector(templateData.changeDetectorFactory)
    };
    humanizedTemplates.set(template.id, result);
    template_commands_1.visitAllCommands(new CommandHumanizer(commands, humanizedTemplates), templateData.commands);
    return result;
}
exports.humanizeTemplate = humanizeTemplate;
var TestContext = (function () {
    function TestContext() {
    }
    return TestContext;
})();
function testChangeDetector(changeDetectorFactory) {
    var ctx = new TestContext();
    ctx.someProp = 'someCtxValue';
    var dir1 = new TestContext();
    dir1.someProp = 'someDirValue';
    var dispatcher = new change_detector_mocks_1.TestDispatcher([dir1], []);
    var cd = changeDetectorFactory(dispatcher);
    var locals = new change_detection_1.Locals(null, collection_1.MapWrapper.createFromStringMap({ 'someVar': null }));
    cd.hydrate(ctx, locals, dispatcher, new change_detector_mocks_1.TestPipes());
    cd.detectChanges();
    return dispatcher.log;
}
var CommandHumanizer = (function () {
    function CommandHumanizer(result, humanizedTemplates) {
        this.result = result;
        this.humanizedTemplates = humanizedTemplates;
    }
    CommandHumanizer.prototype.visitText = function (cmd, context) {
        this.result.push("#text(" + cmd.value + ")");
        return null;
    };
    CommandHumanizer.prototype.visitNgContent = function (cmd, context) { return null; };
    CommandHumanizer.prototype.visitBeginElement = function (cmd, context) {
        this.result.push("<" + cmd.name + ">");
        return null;
    };
    CommandHumanizer.prototype.visitEndElement = function (context) {
        this.result.push('</>');
        return null;
    };
    CommandHumanizer.prototype.visitBeginComponent = function (cmd, context) {
        this.result.push("<" + cmd.name + ">");
        this.result.push(humanizeTemplate(cmd.template, this.humanizedTemplates));
        return null;
    };
    CommandHumanizer.prototype.visitEndComponent = function (context) { return this.visitEndElement(context); };
    CommandHumanizer.prototype.visitEmbeddedTemplate = function (cmd, context) {
        this.result.push("<template>");
        this.result.push({ 'cd': testChangeDetector(cmd.changeDetectorFactory) });
        this.result.push("</template>");
        return null;
    };
    return CommandHumanizer;
})();
//# sourceMappingURL=template_compiler_spec.js.map