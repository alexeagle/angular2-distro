var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var test_lib_1 = require('angular2/test_lib');
var style_url_resolver_1 = require('angular2/src/core/compiler/style_url_resolver');
var url_resolver_1 = require('angular2/src/core/compiler/url_resolver');
function main() {
    test_lib_1.describe('StyleUrlResolver', function () {
        var urlResolver;
        test_lib_1.beforeEach(function () { urlResolver = new url_resolver_1.UrlResolver(); });
        test_lib_1.it('should resolve "url()" urls', function () {
            var css = "\n      .foo {\n        background-image: url(\"double.jpg\");\n        background-image: url('simple.jpg');\n        background-image: url(noquote.jpg);\n      }";
            var expectedCss = "\n      .foo {\n        background-image: url('http://ng.io/double.jpg');\n        background-image: url('http://ng.io/simple.jpg');\n        background-image: url('http://ng.io/noquote.jpg');\n      }";
            var resolvedCss = style_url_resolver_1.resolveStyleUrls(urlResolver, 'http://ng.io', css).style;
            test_lib_1.expect(resolvedCss).toEqual(expectedCss);
        });
        test_lib_1.it('should not strip quotes from inlined SVG styles', function () {
            var css = "\n      .selector {\n        background:rgb(55,71,79) url('data:image/svg+xml;utf8,<?xml version=\"1.0\"?>');\n        background:rgb(55,71,79) url(\"data:image/svg+xml;utf8,<?xml version='1.0'?>\");\n        background:rgb(55,71,79) url(\"/some/data:image\");\n      }\n      ";
            var expectedCss = "\n      .selector {\n        background:rgb(55,71,79) url('data:image/svg+xml;utf8,<?xml version=\"1.0\"?>');\n        background:rgb(55,71,79) url(\"data:image/svg+xml;utf8,<?xml version='1.0'?>\");\n        background:rgb(55,71,79) url('http://ng.io/some/data:image');\n      }\n      ";
            var resolvedCss = style_url_resolver_1.resolveStyleUrls(urlResolver, 'http://ng.io', css).style;
            test_lib_1.expect(resolvedCss).toEqual(expectedCss);
        });
        test_lib_1.it('should extract "@import" urls', function () {
            var css = "\n      @import '1.css';\n      @import \"2.css\";\n      ";
            var styleWithImports = style_url_resolver_1.resolveStyleUrls(urlResolver, 'http://ng.io', css);
            test_lib_1.expect(styleWithImports.style.trim()).toEqual('');
            test_lib_1.expect(styleWithImports.styleUrls).toEqual(['http://ng.io/1.css', 'http://ng.io/2.css']);
        });
        test_lib_1.it('should extract "@import url()" urls', function () {
            var css = "\n      @import url('3.css');\n      @import url(\"4.css\");\n      @import url(5.css);\n      ";
            var styleWithImports = style_url_resolver_1.resolveStyleUrls(urlResolver, 'http://ng.io', css);
            test_lib_1.expect(styleWithImports.style.trim()).toEqual('');
            test_lib_1.expect(styleWithImports.styleUrls)
                .toEqual(['http://ng.io/3.css', 'http://ng.io/4.css', 'http://ng.io/5.css']);
        });
        test_lib_1.it('should extract "@import urls and keep rules in the same line', function () {
            var css = "@import url('some.css');div {color: red};";
            var styleWithImports = style_url_resolver_1.resolveStyleUrls(urlResolver, 'http://ng.io', css);
            test_lib_1.expect(styleWithImports.style.trim()).toEqual('div {color: red};');
            test_lib_1.expect(styleWithImports.styleUrls).toEqual(['http://ng.io/some.css']);
        });
        test_lib_1.it('should extract media query in "@import"', function () {
            var css = "\n      @import 'print1.css' print;\n      @import url(print2.css) print;\n      ";
            var styleWithImports = style_url_resolver_1.resolveStyleUrls(urlResolver, 'http://ng.io', css);
            test_lib_1.expect(styleWithImports.style.trim()).toEqual('');
            test_lib_1.expect(styleWithImports.styleUrls)
                .toEqual(['http://ng.io/print1.css', 'http://ng.io/print2.css']);
        });
        test_lib_1.it('should leave absolute non-package @import urls intact', function () {
            var css = "@import url('http://server.com/some.css');";
            var styleWithImports = style_url_resolver_1.resolveStyleUrls(urlResolver, 'http://ng.io', css);
            test_lib_1.expect(styleWithImports.style.trim()).toEqual("@import url('http://server.com/some.css');");
            test_lib_1.expect(styleWithImports.styleUrls).toEqual([]);
        });
        test_lib_1.it('should resolve package @import urls', function () {
            var css = "@import url('package:a/b/some.css');";
            var styleWithImports = style_url_resolver_1.resolveStyleUrls(new FakeUrlResolver(), 'http://ng.io', css);
            test_lib_1.expect(styleWithImports.style.trim()).toEqual("");
            test_lib_1.expect(styleWithImports.styleUrls).toEqual(['fake_resolved_url']);
        });
    });
}
exports.main = main;
/// The real thing behaves differently between Dart and JS for package URIs.
var FakeUrlResolver = (function (_super) {
    __extends(FakeUrlResolver, _super);
    function FakeUrlResolver() {
        _super.call(this);
    }
    FakeUrlResolver.prototype.resolve = function (baseUrl, url) { return 'fake_resolved_url'; };
    return FakeUrlResolver;
})(url_resolver_1.UrlResolver);
//# sourceMappingURL=style_url_resolver_spec.js.map