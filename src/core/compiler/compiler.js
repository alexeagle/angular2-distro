var runtime_compiler_1 = require("./runtime_compiler");
var template_compiler_1 = require('./template_compiler');
exports.TemplateCompiler = template_compiler_1.TemplateCompiler;
var directive_metadata_1 = require('./directive_metadata');
exports.CompileDirectiveMetadata = directive_metadata_1.CompileDirectiveMetadata;
exports.CompileTypeMetadata = directive_metadata_1.CompileTypeMetadata;
exports.CompileTemplateMetadata = directive_metadata_1.CompileTemplateMetadata;
var source_module_1 = require('./source_module');
exports.SourceModule = source_module_1.SourceModule;
exports.SourceWithImports = source_module_1.SourceWithImports;
var lang_1 = require('angular2/src/core/facade/lang');
var di_1 = require('angular2/src/core/di');
var template_parser_1 = require('angular2/src/core/compiler/template_parser');
var html_parser_1 = require('angular2/src/core/compiler/html_parser');
var template_normalizer_1 = require('angular2/src/core/compiler/template_normalizer');
var runtime_metadata_1 = require('angular2/src/core/compiler/runtime_metadata');
var change_detector_compiler_1 = require('angular2/src/core/compiler/change_detector_compiler');
var style_compiler_1 = require('angular2/src/core/compiler/style_compiler');
var command_compiler_1 = require('angular2/src/core/compiler/command_compiler');
var template_compiler_2 = require('angular2/src/core/compiler/template_compiler');
var change_detection_1 = require('angular2/src/core/change_detection/change_detection');
var compiler_1 = require('angular2/src/core/linker/compiler');
var runtime_compiler_2 = require('angular2/src/core/compiler/runtime_compiler');
var element_schema_registry_1 = require('angular2/src/core/compiler/schema/element_schema_registry');
var dom_element_schema_registry_1 = require('angular2/src/core/compiler/schema/dom_element_schema_registry');
var url_resolver_1 = require('angular2/src/core/compiler/url_resolver');
var app_root_url_1 = require('angular2/src/core/compiler/app_root_url');
var anchor_based_app_root_url_1 = require('angular2/src/core/compiler/anchor_based_app_root_url');
var change_detection_2 = require('angular2/src/core/change_detection/change_detection');
function compilerBindings() {
    return [
        change_detection_2.Lexer,
        change_detection_2.Parser,
        html_parser_1.HtmlParser,
        template_parser_1.TemplateParser,
        template_normalizer_1.TemplateNormalizer,
        runtime_metadata_1.RuntimeMetadataResolver,
        style_compiler_1.StyleCompiler,
        command_compiler_1.CommandCompiler,
        change_detector_compiler_1.ChangeDetectionCompiler,
        di_1.bind(change_detection_1.ChangeDetectorGenConfig)
            .toValue(new change_detection_1.ChangeDetectorGenConfig(lang_1.assertionsEnabled(), lang_1.assertionsEnabled(), false, true)),
        template_compiler_2.TemplateCompiler,
        di_1.bind(runtime_compiler_2.RuntimeCompiler).toClass(runtime_compiler_1.RuntimeCompiler_),
        di_1.bind(compiler_1.Compiler).toAlias(runtime_compiler_2.RuntimeCompiler),
        dom_element_schema_registry_1.DomElementSchemaRegistry,
        di_1.bind(element_schema_registry_1.ElementSchemaRegistry).toAlias(dom_element_schema_registry_1.DomElementSchemaRegistry),
        anchor_based_app_root_url_1.AnchorBasedAppRootUrl,
        di_1.bind(app_root_url_1.AppRootUrl).toAlias(anchor_based_app_root_url_1.AnchorBasedAppRootUrl),
        url_resolver_1.UrlResolver
    ];
}
exports.compilerBindings = compilerBindings;
//# sourceMappingURL=compiler.js.map