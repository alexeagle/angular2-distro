var test_lib_1 = require('angular2/test_lib');
var directive_metadata_1 = require('angular2/src/core/compiler/directive_metadata');
var view_1 = require('angular2/src/core/metadata/view');
var template_normalizer_1 = require('angular2/src/core/compiler/template_normalizer');
var xhr_1 = require('angular2/src/core/compiler/xhr');
var test_bindings_1 = require('./test_bindings');
function main() {
    test_lib_1.describe('TemplateNormalizer', function () {
        var dirType;
        test_lib_1.beforeEachBindings(function () { return test_bindings_1.TEST_BINDINGS; });
        test_lib_1.beforeEach(function () {
            dirType = new directive_metadata_1.CompileTypeMetadata({ moduleUrl: 'package:some/module/a.js', name: 'SomeComp' });
        });
        test_lib_1.describe('loadTemplate', function () {
            test_lib_1.describe('inline template', function () {
                test_lib_1.it('should store the template', test_lib_1.inject([test_lib_1.AsyncTestCompleter, template_normalizer_1.TemplateNormalizer], function (async, normalizer) {
                    normalizer.normalizeTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({
                        encapsulation: null,
                        template: 'a',
                        templateUrl: null,
                        styles: [],
                        styleUrls: ['test.css']
                    }))
                        .then(function (template) {
                        test_lib_1.expect(template.template).toEqual('a');
                        test_lib_1.expect(template.templateUrl).toEqual('package:some/module/a.js');
                        async.done();
                    });
                }));
                test_lib_1.it('should resolve styles on the annotation against the moduleUrl', test_lib_1.inject([test_lib_1.AsyncTestCompleter, template_normalizer_1.TemplateNormalizer], function (async, normalizer) {
                    normalizer.normalizeTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({
                        encapsulation: null,
                        template: '',
                        templateUrl: null,
                        styles: [],
                        styleUrls: ['test.css']
                    }))
                        .then(function (template) {
                        test_lib_1.expect(template.styleUrls).toEqual(['package:some/module/test.css']);
                        async.done();
                    });
                }));
                test_lib_1.it('should resolve styles in the template against the moduleUrl', test_lib_1.inject([test_lib_1.AsyncTestCompleter, template_normalizer_1.TemplateNormalizer], function (async, normalizer) {
                    normalizer.normalizeTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({
                        encapsulation: null,
                        template: '<style>@import test.css</style>',
                        templateUrl: null,
                        styles: [],
                        styleUrls: []
                    }))
                        .then(function (template) {
                        test_lib_1.expect(template.styleUrls).toEqual(['package:some/module/test.css']);
                        async.done();
                    });
                }));
            });
            test_lib_1.describe('templateUrl', function () {
                test_lib_1.it('should load a template from a url that is resolved against moduleUrl', test_lib_1.inject([test_lib_1.AsyncTestCompleter, template_normalizer_1.TemplateNormalizer, xhr_1.XHR], function (async, normalizer, xhr) {
                    xhr.expect('package:some/module/sometplurl.html', 'a');
                    normalizer.normalizeTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({
                        encapsulation: null,
                        template: null,
                        templateUrl: 'sometplurl.html',
                        styles: [],
                        styleUrls: ['test.css']
                    }))
                        .then(function (template) {
                        test_lib_1.expect(template.template).toEqual('a');
                        test_lib_1.expect(template.templateUrl)
                            .toEqual('package:some/module/sometplurl.html');
                        async.done();
                    });
                    xhr.flush();
                }));
                test_lib_1.it('should resolve styles on the annotation against the moduleUrl', test_lib_1.inject([test_lib_1.AsyncTestCompleter, template_normalizer_1.TemplateNormalizer, xhr_1.XHR], function (async, normalizer, xhr) {
                    xhr.expect('package:some/module/tpl/sometplurl.html', '');
                    normalizer.normalizeTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({
                        encapsulation: null,
                        template: null,
                        templateUrl: 'tpl/sometplurl.html',
                        styles: [],
                        styleUrls: ['test.css']
                    }))
                        .then(function (template) {
                        test_lib_1.expect(template.styleUrls).toEqual(['package:some/module/test.css']);
                        async.done();
                    });
                    xhr.flush();
                }));
                test_lib_1.it('should resolve styles in the template against the templateUrl', test_lib_1.inject([test_lib_1.AsyncTestCompleter, template_normalizer_1.TemplateNormalizer, xhr_1.XHR], function (async, normalizer, xhr) {
                    xhr.expect('package:some/module/tpl/sometplurl.html', '<style>@import test.css</style>');
                    normalizer.normalizeTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({
                        encapsulation: null,
                        template: null,
                        templateUrl: 'tpl/sometplurl.html',
                        styles: [],
                        styleUrls: []
                    }))
                        .then(function (template) {
                        test_lib_1.expect(template.styleUrls).toEqual(['package:some/module/tpl/test.css']);
                        async.done();
                    });
                    xhr.flush();
                }));
            });
            test_lib_1.it('should throw if no template was specified', test_lib_1.inject([template_normalizer_1.TemplateNormalizer], function (normalizer) {
                test_lib_1.expect(function () { return normalizer.normalizeTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] })); })
                    .toThrowError('No template specified for component SomeComp');
            }));
        });
        test_lib_1.describe('normalizeLoadedTemplate', function () {
            test_lib_1.it('should store the viewEncapsulationin the result', test_lib_1.inject([template_normalizer_1.TemplateNormalizer], function (normalizer) {
                var viewEncapsulation = view_1.ViewEncapsulation.Native;
                var template = normalizer.normalizeLoadedTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({ encapsulation: viewEncapsulation, styles: [], styleUrls: [] }), '', 'package:some/module/');
                test_lib_1.expect(template.encapsulation).toBe(viewEncapsulation);
            }));
            test_lib_1.it('should keep the template as html', test_lib_1.inject([template_normalizer_1.TemplateNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), 'a', 'package:some/module/');
                test_lib_1.expect(template.template).toEqual('a');
            }));
            test_lib_1.it('should collect ngContent', test_lib_1.inject([template_normalizer_1.TemplateNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<ng-content select="a"></ng-content>', 'package:some/module/');
                test_lib_1.expect(template.ngContentSelectors).toEqual(['a']);
            }));
            test_lib_1.it('should normalize ngContent wildcard selector', test_lib_1.inject([template_normalizer_1.TemplateNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<ng-content></ng-content><ng-content select></ng-content><ng-content select="*"></ng-content>', 'package:some/module/');
                test_lib_1.expect(template.ngContentSelectors).toEqual(['*', '*', '*']);
            }));
            test_lib_1.it('should collect top level styles in the template', test_lib_1.inject([template_normalizer_1.TemplateNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<style>a</style>', 'package:some/module/');
                test_lib_1.expect(template.styles).toEqual(['a']);
            }));
            test_lib_1.it('should collect styles inside in elements', test_lib_1.inject([template_normalizer_1.TemplateNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<div><style>a</style></div>', 'package:some/module/');
                test_lib_1.expect(template.styles).toEqual(['a']);
            }));
            test_lib_1.it('should collect styleUrls in the template', test_lib_1.inject([template_normalizer_1.TemplateNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<link rel="stylesheet" href="aUrl">', 'package:some/module/');
                test_lib_1.expect(template.styleUrls).toEqual(['package:some/module/aUrl']);
            }));
            test_lib_1.it('should collect styleUrls in elements', test_lib_1.inject([template_normalizer_1.TemplateNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<div><link rel="stylesheet" href="aUrl"></div>', 'package:some/module/');
                test_lib_1.expect(template.styleUrls).toEqual(['package:some/module/aUrl']);
            }));
            test_lib_1.it('should ignore link elements with non stylesheet rel attribute', test_lib_1.inject([template_normalizer_1.TemplateNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<link href="b" rel="a"></link>', 'package:some/module/');
                test_lib_1.expect(template.styleUrls).toEqual([]);
            }));
            test_lib_1.it('should extract @import style urls into styleAbsUrl', test_lib_1.inject([template_normalizer_1.TemplateNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: ['@import "test.css";'], styleUrls: [] }), '', 'package:some/module/id');
                test_lib_1.expect(template.styles).toEqual(['']);
                test_lib_1.expect(template.styleUrls).toEqual(['package:some/module/test.css']);
            }));
            test_lib_1.it('should resolve relative urls in inline styles', test_lib_1.inject([template_normalizer_1.TemplateNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({
                    encapsulation: null,
                    styles: ['.foo{background-image: url(\'double.jpg\');'],
                    styleUrls: []
                }), '', 'package:some/module/id');
                test_lib_1.expect(template.styles)
                    .toEqual(['.foo{background-image: url(\'package:some/module/double.jpg\');']);
            }));
            test_lib_1.it('should resolve relative style urls in styleUrls', test_lib_1.inject([template_normalizer_1.TemplateNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: ['test.css'] }), '', 'package:some/module/id');
                test_lib_1.expect(template.styles).toEqual([]);
                test_lib_1.expect(template.styleUrls).toEqual(['package:some/module/test.css']);
            }));
            test_lib_1.it('should normalize ViewEncapsulation.Emulated to ViewEncapsulation.None if there are no stlyes nor stylesheets', test_lib_1.inject([template_normalizer_1.TemplateNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({ encapsulation: view_1.ViewEncapsulation.Emulated, styles: [], styleUrls: [] }), '', 'package:some/module/id');
                test_lib_1.expect(template.encapsulation).toEqual(view_1.ViewEncapsulation.None);
            }));
            test_lib_1.it('should ignore ng-content in elements with ng-non-bindable', test_lib_1.inject([template_normalizer_1.TemplateNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<div ng-non-bindable><ng-content select="a"></ng-content></div>', 'package:some/module/');
                test_lib_1.expect(template.ngContentSelectors).toEqual([]);
            }));
            test_lib_1.it('should still collect <style> in elements with ng-non-bindable', test_lib_1.inject([template_normalizer_1.TemplateNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new directive_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<div ng-non-bindable><style>div {color:red}</style></div>', 'package:some/module/');
                test_lib_1.expect(template.styles).toEqual(['div {color:red}']);
            }));
        });
    });
}
exports.main = main;
//# sourceMappingURL=template_normalizer_spec.js.map