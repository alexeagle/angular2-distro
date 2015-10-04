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
    });
}
exports.main = main;
//# sourceMappingURL=style_url_resolver_spec.js.map