var test_lib_1 = require('angular2/test_lib');
var html_parser_1 = require('angular2/src/core/compiler/html_parser');
var html_ast_1 = require('angular2/src/core/compiler/html_ast');
function main() {
    test_lib_1.describe('DomParser', function () {
        var parser;
        test_lib_1.beforeEach(function () { parser = new html_parser_1.HtmlParser(); });
        test_lib_1.describe('parse', function () {
            test_lib_1.describe('text nodes', function () {
                test_lib_1.it('should parse root level text nodes', function () {
                    test_lib_1.expect(humanizeDom(parser.parse('a', 'TestComp')))
                        .toEqual([[html_ast_1.HtmlTextAst, 'a', 'TestComp > #text(a):nth-child(0)']]);
                });
                test_lib_1.it('should parse text nodes inside regular elements', function () {
                    test_lib_1.expect(humanizeDom(parser.parse('<div>a</div>', 'TestComp')))
                        .toEqual([
                        [html_ast_1.HtmlElementAst, 'div', 'TestComp > div:nth-child(0)'],
                        [html_ast_1.HtmlTextAst, 'a', 'TestComp > div:nth-child(0) > #text(a):nth-child(0)']
                    ]);
                });
                test_lib_1.it('should parse text nodes inside template elements', function () {
                    test_lib_1.expect(humanizeDom(parser.parse('<template>a</template>', 'TestComp')))
                        .toEqual([
                        [html_ast_1.HtmlElementAst, 'template', 'TestComp > template:nth-child(0)'],
                        [html_ast_1.HtmlTextAst, 'a', 'TestComp > template:nth-child(0) > #text(a):nth-child(0)']
                    ]);
                });
            });
            test_lib_1.describe('elements', function () {
                test_lib_1.it('should parse root level elements', function () {
                    test_lib_1.expect(humanizeDom(parser.parse('<div></div>', 'TestComp')))
                        .toEqual([[html_ast_1.HtmlElementAst, 'div', 'TestComp > div:nth-child(0)']]);
                });
                test_lib_1.it('should parse elements inside of regular elements', function () {
                    test_lib_1.expect(humanizeDom(parser.parse('<div><span></span></div>', 'TestComp')))
                        .toEqual([
                        [html_ast_1.HtmlElementAst, 'div', 'TestComp > div:nth-child(0)'],
                        [html_ast_1.HtmlElementAst, 'span', 'TestComp > div:nth-child(0) > span:nth-child(0)']
                    ]);
                });
                test_lib_1.it('should parse elements inside of template elements', function () {
                    test_lib_1.expect(humanizeDom(parser.parse('<template><span></span></template>', 'TestComp')))
                        .toEqual([
                        [html_ast_1.HtmlElementAst, 'template', 'TestComp > template:nth-child(0)'],
                        [html_ast_1.HtmlElementAst, 'span', 'TestComp > template:nth-child(0) > span:nth-child(0)']
                    ]);
                });
            });
            test_lib_1.describe('attributes', function () {
                test_lib_1.it('should parse attributes on regular elements', function () {
                    test_lib_1.expect(humanizeDom(parser.parse('<div k="v"></div>', 'TestComp')))
                        .toEqual([
                        [html_ast_1.HtmlElementAst, 'div', 'TestComp > div:nth-child(0)'],
                        [html_ast_1.HtmlAttrAst, 'k', 'v', 'TestComp > div:nth-child(0)[k=v]']
                    ]);
                });
                test_lib_1.it('should parse attributes on template elements', function () {
                    test_lib_1.expect(humanizeDom(parser.parse('<template k="v"></template>', 'TestComp')))
                        .toEqual([
                        [html_ast_1.HtmlElementAst, 'template', 'TestComp > template:nth-child(0)'],
                        [html_ast_1.HtmlAttrAst, 'k', 'v', 'TestComp > template:nth-child(0)[k=v]']
                    ]);
                });
            });
        });
        test_lib_1.describe('unparse', function () {
            test_lib_1.it('should unparse text nodes', function () { test_lib_1.expect(parser.unparse(parser.parse('a', null))).toEqual('a'); });
            test_lib_1.it('should unparse elements', function () { test_lib_1.expect(parser.unparse(parser.parse('<a></a>', null))).toEqual('<a></a>'); });
            test_lib_1.it('should unparse attributes', function () {
                test_lib_1.expect(parser.unparse(parser.parse('<div a b="c"></div>', null)))
                    .toEqual('<div a="" b="c"></div>');
            });
            test_lib_1.it('should unparse nested elements', function () {
                test_lib_1.expect(parser.unparse(parser.parse('<div><a></a></div>', null)))
                    .toEqual('<div><a></a></div>');
            });
            test_lib_1.it('should unparse nested text nodes', function () {
                test_lib_1.expect(parser.unparse(parser.parse('<div>a</div>', null))).toEqual('<div>a</div>');
            });
        });
    });
}
exports.main = main;
function humanizeDom(asts) {
    var humanizer = new Humanizer();
    html_ast_1.htmlVisitAll(humanizer, asts);
    return humanizer.result;
}
var Humanizer = (function () {
    function Humanizer() {
        this.result = [];
    }
    Humanizer.prototype.visitElement = function (ast, context) {
        this.result.push([html_ast_1.HtmlElementAst, ast.name, ast.sourceInfo]);
        html_ast_1.htmlVisitAll(this, ast.attrs);
        html_ast_1.htmlVisitAll(this, ast.children);
        return null;
    };
    Humanizer.prototype.visitAttr = function (ast, context) {
        this.result.push([html_ast_1.HtmlAttrAst, ast.name, ast.value, ast.sourceInfo]);
        return null;
    };
    Humanizer.prototype.visitText = function (ast, context) {
        this.result.push([html_ast_1.HtmlTextAst, ast.value, ast.sourceInfo]);
        return null;
    };
    return Humanizer;
})();
//# sourceMappingURL=html_parser_spec.js.map