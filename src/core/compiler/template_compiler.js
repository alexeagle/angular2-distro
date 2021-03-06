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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var lang_1 = require('angular2/src/core/facade/lang');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var collection_1 = require('angular2/src/core/facade/collection');
var async_1 = require('angular2/src/core/facade/async');
var template_commands_1 = require('angular2/src/core/linker/template_commands');
var directive_metadata_1 = require('./directive_metadata');
var di_1 = require('angular2/src/core/di');
var source_module_1 = require('./source_module');
var change_detector_compiler_1 = require('./change_detector_compiler');
var style_compiler_1 = require('./style_compiler');
var command_compiler_1 = require('./command_compiler');
var template_parser_1 = require('./template_parser');
var template_normalizer_1 = require('./template_normalizer');
var runtime_metadata_1 = require('./runtime_metadata');
var application_tokens_1 = require('angular2/src/core/application_tokens');
var command_compiler_2 = require('./command_compiler');
var util_1 = require('./util');
var di_2 = require('angular2/src/core/di');
var TemplateCompiler = (function () {
    function TemplateCompiler(_runtimeMetadataResolver, _templateNormalizer, _templateParser, _styleCompiler, _commandCompiler, _cdCompiler, appId) {
        this._runtimeMetadataResolver = _runtimeMetadataResolver;
        this._templateNormalizer = _templateNormalizer;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._commandCompiler = _commandCompiler;
        this._cdCompiler = _cdCompiler;
        this._hostCacheKeys = new Map();
        this._compiledTemplateCache = new Map();
        this._compiledTemplateDone = new Map();
        this._appId = appId;
    }
    TemplateCompiler.prototype.normalizeDirectiveMetadata = function (directive) {
        if (!directive.isComponent) {
            // For non components there is nothing to be normalized yet.
            return async_1.PromiseWrapper.resolve(directive);
        }
        var normalizedTemplatePromise;
        if (directive.isComponent) {
            normalizedTemplatePromise =
                this._templateNormalizer.normalizeTemplate(directive.type, directive.template);
        }
        else {
            normalizedTemplatePromise = async_1.PromiseWrapper.resolve(null);
        }
        return normalizedTemplatePromise.then(function (normalizedTemplate) { return new directive_metadata_1.CompileDirectiveMetadata({
            type: directive.type,
            isComponent: directive.isComponent,
            dynamicLoadable: directive.dynamicLoadable,
            selector: directive.selector,
            exportAs: directive.exportAs,
            changeDetection: directive.changeDetection,
            inputs: directive.inputs,
            outputs: directive.outputs,
            hostListeners: directive.hostListeners,
            hostProperties: directive.hostProperties,
            hostAttributes: directive.hostAttributes,
            lifecycleHooks: directive.lifecycleHooks, template: normalizedTemplate
        }); });
    };
    TemplateCompiler.prototype.compileHostComponentRuntime = function (type) {
        var hostCacheKey = this._hostCacheKeys.get(type);
        if (lang_1.isBlank(hostCacheKey)) {
            hostCacheKey = new Object();
            this._hostCacheKeys.set(type, hostCacheKey);
            var compMeta = this._runtimeMetadataResolver.getMetadata(type);
            assertComponent(compMeta);
            var hostMeta = directive_metadata_1.createHostComponentMeta(compMeta.type, compMeta.selector);
            this._compileComponentRuntime(hostCacheKey, hostMeta, [compMeta], new Set());
        }
        return this._compiledTemplateDone.get(hostCacheKey)
            .then(function (compiledTemplate) { return new template_commands_1.CompiledHostTemplate(function () { return compiledTemplate; }); });
    };
    TemplateCompiler.prototype.clearCache = function () {
        this._hostCacheKeys.clear();
        this._styleCompiler.clearCache();
        this._compiledTemplateCache.clear();
        this._compiledTemplateDone.clear();
    };
    TemplateCompiler.prototype._compileComponentRuntime = function (cacheKey, compMeta, viewDirectives, compilingComponentCacheKeys) {
        var _this = this;
        var compiledTemplate = this._compiledTemplateCache.get(cacheKey);
        var done = this._compiledTemplateDone.get(cacheKey);
        if (lang_1.isBlank(compiledTemplate)) {
            var styles;
            var changeDetectorFactory;
            var commands;
            var templateId = template_commands_1.nextTemplateId();
            compiledTemplate =
                new template_commands_1.CompiledTemplate(templateId, function (_a, _b) { return [changeDetectorFactory, commands, styles]; });
            this._compiledTemplateCache.set(cacheKey, compiledTemplate);
            compilingComponentCacheKeys.add(cacheKey);
            done =
                async_1.PromiseWrapper.all([
                    this._styleCompiler.compileComponentRuntime(this._appId, templateId, compMeta.template)
                ].concat(viewDirectives.map(function (dirMeta) {
                    return _this.normalizeDirectiveMetadata(dirMeta);
                })))
                    .then(function (stylesAndNormalizedViewDirMetas) {
                    var childPromises = [];
                    var normalizedViewDirMetas = stylesAndNormalizedViewDirMetas.slice(1);
                    var parsedTemplate = _this._templateParser.parse(compMeta.template.template, normalizedViewDirMetas, compMeta.type.name);
                    var changeDetectorFactories = _this._cdCompiler.compileComponentRuntime(compMeta.type, compMeta.changeDetection, parsedTemplate);
                    changeDetectorFactory = changeDetectorFactories[0];
                    styles = stylesAndNormalizedViewDirMetas[0];
                    commands = _this._compileCommandsRuntime(compMeta, templateId, parsedTemplate, changeDetectorFactories, compilingComponentCacheKeys, childPromises);
                    return async_1.PromiseWrapper.all(childPromises);
                })
                    .then(function (_) {
                    collection_1.SetWrapper.delete(compilingComponentCacheKeys, cacheKey);
                    return compiledTemplate;
                });
            this._compiledTemplateDone.set(cacheKey, done);
        }
        return compiledTemplate;
    };
    TemplateCompiler.prototype._compileCommandsRuntime = function (compMeta, templateId, parsedTemplate, changeDetectorFactories, compilingComponentCacheKeys, childPromises) {
        var _this = this;
        return this._commandCompiler.compileComponentRuntime(compMeta, this._appId, templateId, parsedTemplate, changeDetectorFactories, function (childComponentDir) {
            var childCacheKey = childComponentDir.type.runtime;
            var childViewDirectives = _this._runtimeMetadataResolver.getViewDirectivesMetadata(childComponentDir.type.runtime);
            var childIsRecursive = collection_1.SetWrapper.has(compilingComponentCacheKeys, childCacheKey);
            var childTemplate = _this._compileComponentRuntime(childCacheKey, childComponentDir, childViewDirectives, compilingComponentCacheKeys);
            if (!childIsRecursive) {
                // Only wait for a child if it is not a cycle
                childPromises.push(_this._compiledTemplateDone.get(childCacheKey));
            }
            return childTemplate;
        });
    };
    TemplateCompiler.prototype.compileTemplatesCodeGen = function (components) {
        var _this = this;
        if (components.length === 0) {
            throw new exceptions_1.BaseException('No components given');
        }
        var declarations = [];
        var templateArguments = [];
        var componentMetas = [];
        var templateIdVariable = 'templateId';
        var appIdVariable = 'appId';
        components.forEach(function (componentWithDirs) {
            var compMeta = componentWithDirs.component;
            assertComponent(compMeta);
            componentMetas.push(compMeta);
            _this._processTemplateCodeGen(compMeta, appIdVariable, templateIdVariable, componentWithDirs.directives, declarations, templateArguments);
            if (compMeta.dynamicLoadable) {
                var hostMeta = directive_metadata_1.createHostComponentMeta(compMeta.type, compMeta.selector);
                componentMetas.push(hostMeta);
                _this._processTemplateCodeGen(hostMeta, appIdVariable, templateIdVariable, [compMeta], declarations, templateArguments);
            }
        });
        collection_1.ListWrapper.forEachWithIndex(componentMetas, function (compMeta, index) {
            var templateDataFn = util_1.codeGenValueFn([appIdVariable, templateIdVariable], "[" + templateArguments[index].join(',') + "]");
            var compiledTemplateExpr = "new " + command_compiler_2.TEMPLATE_COMMANDS_MODULE_REF + "CompiledTemplate(" + command_compiler_2.TEMPLATE_COMMANDS_MODULE_REF + "nextTemplateId()," + templateDataFn + ")";
            var variableValueExpr;
            if (compMeta.type.isHost) {
                var factoryName = "_hostTemplateFactory" + index;
                declarations.push(util_1.codeGenValueFn([], compiledTemplateExpr, factoryName) + ";");
                var constructionKeyword = util_1.IS_DART ? 'const' : 'new';
                variableValueExpr =
                    constructionKeyword + " " + command_compiler_2.TEMPLATE_COMMANDS_MODULE_REF + "CompiledHostTemplate(" + factoryName + ")";
            }
            else {
                variableValueExpr = compiledTemplateExpr;
            }
            declarations.push("" + util_1.codeGenExportVariable(templateVariableName(compMeta.type), compMeta.type.isHost) + variableValueExpr + ";");
        });
        var moduleUrl = components[0].component.type.moduleUrl;
        return new source_module_1.SourceModule("" + templateModuleUrl(moduleUrl), declarations.join('\n'));
    };
    TemplateCompiler.prototype.compileStylesheetCodeGen = function (stylesheetUrl, cssText) {
        return this._styleCompiler.compileStylesheetCodeGen(stylesheetUrl, cssText);
    };
    TemplateCompiler.prototype._processTemplateCodeGen = function (compMeta, appIdExpr, templateIdExpr, directives, targetDeclarations, targetTemplateArguments) {
        var styleExpr = this._styleCompiler.compileComponentCodeGen(appIdExpr, templateIdExpr, compMeta.template);
        var parsedTemplate = this._templateParser.parse(compMeta.template.template, directives, compMeta.type.name);
        var changeDetectorsExprs = this._cdCompiler.compileComponentCodeGen(compMeta.type, compMeta.changeDetection, parsedTemplate);
        var commandsExpr = this._commandCompiler.compileComponentCodeGen(compMeta, appIdExpr, templateIdExpr, parsedTemplate, changeDetectorsExprs.expressions, codeGenComponentTemplateFactory);
        addAll(styleExpr.declarations, targetDeclarations);
        addAll(changeDetectorsExprs.declarations, targetDeclarations);
        addAll(commandsExpr.declarations, targetDeclarations);
        targetTemplateArguments.push([changeDetectorsExprs.expressions[0], commandsExpr.expression, styleExpr.expression]);
    };
    TemplateCompiler = __decorate([
        di_1.Injectable(),
        __param(6, di_2.Inject(application_tokens_1.APP_ID)), 
        __metadata('design:paramtypes', [runtime_metadata_1.RuntimeMetadataResolver, template_normalizer_1.TemplateNormalizer, template_parser_1.TemplateParser, style_compiler_1.StyleCompiler, command_compiler_1.CommandCompiler, change_detector_compiler_1.ChangeDetectionCompiler, String])
    ], TemplateCompiler);
    return TemplateCompiler;
})();
exports.TemplateCompiler = TemplateCompiler;
var NormalizedComponentWithViewDirectives = (function () {
    function NormalizedComponentWithViewDirectives(component, directives) {
        this.component = component;
        this.directives = directives;
    }
    return NormalizedComponentWithViewDirectives;
})();
exports.NormalizedComponentWithViewDirectives = NormalizedComponentWithViewDirectives;
function assertComponent(meta) {
    if (!meta.isComponent) {
        throw new exceptions_1.BaseException("Could not compile '" + meta.type.name + "' because it is not a component.");
    }
}
function templateVariableName(type) {
    return type.name + "Template";
}
function templateModuleUrl(moduleUrl) {
    var urlWithoutSuffix = moduleUrl.substring(0, moduleUrl.length - util_1.MODULE_SUFFIX.length);
    return urlWithoutSuffix + ".template" + util_1.MODULE_SUFFIX;
}
function addAll(source, target) {
    for (var i = 0; i < source.length; i++) {
        target.push(source[i]);
    }
}
function codeGenComponentTemplateFactory(nestedCompType) {
    return "" + source_module_1.moduleRef(templateModuleUrl(nestedCompType.type.moduleUrl)) + templateVariableName(nestedCompType.type);
}
//# sourceMappingURL=template_compiler.js.map