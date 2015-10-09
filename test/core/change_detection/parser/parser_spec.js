var test_lib_1 = require('angular2/test_lib');
var lang_1 = require('angular2/src/core/facade/lang');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var parser_1 = require('angular2/src/core/change_detection/parser/parser');
var unparser_1 = require('./unparser');
var lexer_1 = require('angular2/src/core/change_detection/parser/lexer');
var ast_1 = require('angular2/src/core/change_detection/parser/ast');
var TestData = (function () {
    function TestData(a, b, fnReturnValue) {
        this.a = a;
        this.b = b;
        this.fnReturnValue = fnReturnValue;
    }
    TestData.prototype.fn = function () { return this.fnReturnValue; };
    TestData.prototype.add = function (a, b) { return a + b; };
    return TestData;
})();
function main() {
    function createParser() { return new parser_1.Parser(new lexer_1.Lexer(), reflection_1.reflector); }
    function parseAction(text, location) {
        if (location === void 0) { location = null; }
        return createParser().parseAction(text, location);
    }
    function parseBinding(text, location) {
        if (location === void 0) { location = null; }
        return createParser().parseBinding(text, location);
    }
    function parseTemplateBindings(text, location) {
        if (location === void 0) { location = null; }
        return createParser().parseTemplateBindings(text, location);
    }
    function parseInterpolation(text, location) {
        if (location === void 0) { location = null; }
        return createParser().parseInterpolation(text, location);
    }
    function parseSimpleBinding(text, location) {
        if (location === void 0) { location = null; }
        return createParser().parseSimpleBinding(text, location);
    }
    function unparse(ast) { return new unparser_1.Unparser().unparse(ast); }
    function checkBinding(exp, expected) {
        var ast = parseBinding(exp);
        if (lang_1.isBlank(expected))
            expected = exp;
        test_lib_1.expect(unparse(ast)).toEqual(expected);
    }
    function checkAction(exp, expected) {
        var ast = parseAction(exp);
        if (lang_1.isBlank(expected))
            expected = exp;
        test_lib_1.expect(unparse(ast)).toEqual(expected);
    }
    function expectActionError(text) { return test_lib_1.expect(function () { return parseAction(text); }); }
    function expectBindingError(text) { return test_lib_1.expect(function () { return parseBinding(text); }); }
    test_lib_1.describe("parser", function () {
        test_lib_1.describe("parseAction", function () {
            test_lib_1.it('should parse numbers', function () { checkAction("1"); });
            test_lib_1.it('should parse strings', function () {
                checkAction("'1'", '"1"');
                checkAction('"1"');
            });
            test_lib_1.it('should parse null', function () { checkAction("null"); });
            test_lib_1.it('should parse unary - expressions', function () {
                checkAction("-1", "0 - 1");
                checkAction("+1", "1");
            });
            test_lib_1.it('should parse unary ! expressions', function () {
                checkAction("!true");
                checkAction("!!true");
                checkAction("!!!true");
            });
            test_lib_1.it('should parse multiplicative expressions', function () { checkAction("3*4/2%5", "3 * 4 / 2 % 5"); });
            test_lib_1.it('should parse additive expressions', function () { checkAction("3 + 6 - 2"); });
            test_lib_1.it('should parse relational expressions', function () {
                checkAction("2 < 3");
                checkAction("2 > 3");
                checkAction("2 <= 2");
                checkAction("2 >= 2");
            });
            test_lib_1.it('should parse equality expressions', function () {
                checkAction("2 == 3");
                checkAction("2 != 3");
            });
            test_lib_1.it('should parse strict equality expressions', function () {
                checkAction("2 === 3");
                checkAction("2 !== 3");
            });
            test_lib_1.it('should parse expressions', function () {
                checkAction("true && true");
                checkAction("true || false");
            });
            test_lib_1.it('should parse grouped expressions', function () { checkAction("(1 + 2) * 3", "1 + 2 * 3"); });
            test_lib_1.it('should parse an empty string', function () { checkAction(''); });
            test_lib_1.describe("literals", function () {
                test_lib_1.it('should parse array', function () {
                    checkAction("[1][0]");
                    checkAction("[[1]][0][0]");
                    checkAction("[]");
                    checkAction("[].length");
                    checkAction("[1, 2].length");
                });
                test_lib_1.it('should parse map', function () {
                    checkAction("{}");
                    checkAction("{a: 1}[2]");
                    checkAction("{}[\"a\"]");
                });
                test_lib_1.it('should only allow identifier, string, or keyword as map key', function () {
                    expectActionError('{(:0}')
                        .toThrowError(new RegExp('expected identifier, keyword, or string'));
                    expectActionError('{1234:0}')
                        .toThrowError(new RegExp('expected identifier, keyword, or string'));
                });
            });
            test_lib_1.describe("member access", function () {
                test_lib_1.it("should parse field access", function () {
                    checkAction("a");
                    checkAction("a.a");
                });
                test_lib_1.it('should only allow identifier or keyword as member names', function () {
                    expectActionError('x.(').toThrowError(new RegExp('identifier or keyword'));
                    expectActionError('x. 1234').toThrowError(new RegExp('identifier or keyword'));
                    expectActionError('x."foo"').toThrowError(new RegExp('identifier or keyword'));
                });
                test_lib_1.it('should parse safe field access', function () {
                    checkAction('a?.a');
                    checkAction('a.a?.a');
                });
            });
            test_lib_1.describe("method calls", function () {
                test_lib_1.it("should parse method calls", function () {
                    checkAction("fn()");
                    checkAction("add(1, 2)");
                    checkAction("a.add(1, 2)");
                    checkAction("fn().add(1, 2)");
                });
            });
            test_lib_1.describe("functional calls", function () { test_lib_1.it("should parse function calls", function () { checkAction("fn()(1, 2)"); }); });
            test_lib_1.describe("conditional", function () {
                test_lib_1.it('should parse ternary/conditional expressions', function () {
                    checkAction("7 == 3 + 4 ? 10 : 20");
                    checkAction("false ? 10 : 20");
                });
                test_lib_1.it('should throw on incorrect ternary operator syntax', function () {
                    expectActionError("true?1").toThrowError(new RegExp('Parser Error: Conditional expression true\\?1 requires all 3 expressions'));
                });
            });
            test_lib_1.describe("if", function () {
                test_lib_1.it('should parse if statements', function () {
                    checkAction("if (true) a = 0");
                    checkAction("if (true) {a = 0;}", "if (true) a = 0");
                });
            });
            test_lib_1.describe("assignment", function () {
                test_lib_1.it("should support field assignments", function () {
                    checkAction("a = 12");
                    checkAction("a.a.a = 123");
                    checkAction("a = 123; b = 234;");
                });
                test_lib_1.it("should throw on safe field assignments", function () {
                    expectActionError("a?.a = 123")
                        .toThrowError(new RegExp('cannot be used in the assignment'));
                });
                test_lib_1.it("should support array updates", function () { checkAction("a[0] = 200"); });
            });
            test_lib_1.it("should error when using pipes", function () { expectActionError('x|blah').toThrowError(new RegExp('Cannot have a pipe')); });
            test_lib_1.it('should store the source in the result', function () { test_lib_1.expect(parseAction('someExpr').source).toBe('someExpr'); });
            test_lib_1.it('should store the passed-in location', function () { test_lib_1.expect(parseAction('someExpr', 'location').location).toBe('location'); });
            test_lib_1.it("should throw when encountering interpolation", function () {
                expectActionError("{{a()}}")
                    .toThrowErrorWith('Got interpolation ({{}}) where expression was expected');
            });
        });
        test_lib_1.describe("general error handling", function () {
            test_lib_1.it("should throw on an unexpected token", function () {
                expectActionError("[1,2] trac").toThrowError(new RegExp('Unexpected token \'trac\''));
            });
            test_lib_1.it('should throw a reasonable error for unconsumed tokens', function () {
                expectActionError(")")
                    .toThrowError(new RegExp("Unexpected token \\) at column 1 in \\[\\)\\]"));
            });
            test_lib_1.it('should throw on missing expected token', function () {
                expectActionError("a(b").toThrowError(new RegExp("Missing expected \\) at the end of the expression \\[a\\(b\\]"));
            });
        });
        test_lib_1.describe("parseBinding", function () {
            test_lib_1.describe("pipes", function () {
                test_lib_1.it("should parse pipes", function () {
                    checkBinding('a(b | c)', 'a((b | c))');
                    checkBinding('a.b(c.d(e) | f)', 'a.b((c.d(e) | f))');
                    checkBinding('[1, 2, 3] | a', '([1, 2, 3] | a)');
                    checkBinding('{a: 1} | b', '({a: 1} | b)');
                    checkBinding('a[b] | c', '(a[b] | c)');
                    checkBinding('a?.b | c', '(a?.b | c)');
                    checkBinding('true | a', '(true | a)');
                    checkBinding('a | b:c | d', '(a | b:(c | d))');
                    checkBinding('(a | b:c) | d', '((a | b:c) | d)');
                });
                test_lib_1.it('should only allow identifier or keyword as formatter names', function () {
                    expectBindingError('"Foo"|(').toThrowError(new RegExp('identifier or keyword'));
                    expectBindingError('"Foo"|1234').toThrowError(new RegExp('identifier or keyword'));
                    expectBindingError('"Foo"|"uppercase"').toThrowError(new RegExp('identifier or keyword'));
                });
            });
            test_lib_1.it('should store the source in the result', function () { test_lib_1.expect(parseBinding('someExpr').source).toBe('someExpr'); });
            test_lib_1.it('should store the passed-in location', function () { test_lib_1.expect(parseBinding('someExpr', 'location').location).toBe('location'); });
            test_lib_1.it('should throw on chain expressions', function () {
                test_lib_1.expect(function () { return parseBinding("1;2"); }).toThrowError(new RegExp("contain chained expression"));
            });
            test_lib_1.it('should throw on assignment', function () {
                test_lib_1.expect(function () { return parseBinding("a=2"); }).toThrowError(new RegExp("contain assignments"));
            });
            test_lib_1.it('should throw when encountering interpolation', function () {
                expectBindingError("{{a.b}}")
                    .toThrowErrorWith('Got interpolation ({{}}) where expression was expected');
            });
        });
        test_lib_1.describe('parseTemplateBindings', function () {
            function keys(templateBindings) {
                return templateBindings.map(function (binding) { return binding.key; });
            }
            function keyValues(templateBindings) {
                return templateBindings.map(function (binding) {
                    if (binding.keyIsVar) {
                        return '#' + binding.key + (lang_1.isBlank(binding.name) ? '=null' : '=' + binding.name);
                    }
                    else {
                        return binding.key + (lang_1.isBlank(binding.expression) ? '' : "=" + binding.expression);
                    }
                });
            }
            function exprSources(templateBindings) {
                return templateBindings.map(function (binding) { return lang_1.isPresent(binding.expression) ? binding.expression.source : null; });
            }
            test_lib_1.it('should parse an empty string', function () { test_lib_1.expect(parseTemplateBindings('')).toEqual([]); });
            test_lib_1.it('should parse a string without a value', function () { test_lib_1.expect(keys(parseTemplateBindings('a'))).toEqual(['a']); });
            test_lib_1.it('should only allow identifier, string, or keyword including dashes as keys', function () {
                var bindings = parseTemplateBindings("a:'b'");
                test_lib_1.expect(keys(bindings)).toEqual(['a']);
                bindings = parseTemplateBindings("'a':'b'");
                test_lib_1.expect(keys(bindings)).toEqual(['a']);
                bindings = parseTemplateBindings("\"a\":'b'");
                test_lib_1.expect(keys(bindings)).toEqual(['a']);
                bindings = parseTemplateBindings("a-b:'c'");
                test_lib_1.expect(keys(bindings)).toEqual(['a-b']);
                test_lib_1.expect(function () { parseTemplateBindings('(:0'); })
                    .toThrowError(new RegExp('expected identifier, keyword, or string'));
                test_lib_1.expect(function () { parseTemplateBindings('1234:0'); })
                    .toThrowError(new RegExp('expected identifier, keyword, or string'));
            });
            test_lib_1.it('should detect expressions as value', function () {
                var bindings = parseTemplateBindings("a:b");
                test_lib_1.expect(exprSources(bindings)).toEqual(['b']);
                bindings = parseTemplateBindings("a:1+1");
                test_lib_1.expect(exprSources(bindings)).toEqual(['1+1']);
            });
            test_lib_1.it('should detect names as value', function () {
                var bindings = parseTemplateBindings("a:#b");
                test_lib_1.expect(keyValues(bindings)).toEqual(['a', '#b=\$implicit']);
            });
            test_lib_1.it('should allow space and colon as separators', function () {
                var bindings = parseTemplateBindings("a:b");
                test_lib_1.expect(keys(bindings)).toEqual(['a']);
                test_lib_1.expect(exprSources(bindings)).toEqual(['b']);
                bindings = parseTemplateBindings("a b");
                test_lib_1.expect(keys(bindings)).toEqual(['a']);
                test_lib_1.expect(exprSources(bindings)).toEqual(['b']);
            });
            test_lib_1.it('should allow multiple pairs', function () {
                var bindings = parseTemplateBindings("a 1 b 2");
                test_lib_1.expect(keys(bindings)).toEqual(['a', 'a-b']);
                test_lib_1.expect(exprSources(bindings)).toEqual(['1 ', '2']);
            });
            test_lib_1.it('should store the sources in the result', function () {
                var bindings = parseTemplateBindings("a 1,b 2");
                test_lib_1.expect(bindings[0].expression.source).toEqual('1');
                test_lib_1.expect(bindings[1].expression.source).toEqual('2');
            });
            test_lib_1.it('should store the passed-in location', function () {
                var bindings = parseTemplateBindings("a 1,b 2", 'location');
                test_lib_1.expect(bindings[0].expression.location).toEqual('location');
            });
            test_lib_1.it('should support var/# notation', function () {
                var bindings = parseTemplateBindings("var i");
                test_lib_1.expect(keyValues(bindings)).toEqual(['#i=\$implicit']);
                bindings = parseTemplateBindings("#i");
                test_lib_1.expect(keyValues(bindings)).toEqual(['#i=\$implicit']);
                bindings = parseTemplateBindings("var a; var b");
                test_lib_1.expect(keyValues(bindings)).toEqual(['#a=\$implicit', '#b=\$implicit']);
                bindings = parseTemplateBindings("#a; #b;");
                test_lib_1.expect(keyValues(bindings)).toEqual(['#a=\$implicit', '#b=\$implicit']);
                bindings = parseTemplateBindings("var i-a = k-a");
                test_lib_1.expect(keyValues(bindings)).toEqual(['#i-a=k-a']);
                bindings = parseTemplateBindings("keyword var item; var i = k");
                test_lib_1.expect(keyValues(bindings)).toEqual(['keyword', '#item=\$implicit', '#i=k']);
                bindings = parseTemplateBindings("keyword: #item; #i = k");
                test_lib_1.expect(keyValues(bindings)).toEqual(['keyword', '#item=\$implicit', '#i=k']);
                bindings = parseTemplateBindings("directive: var item in expr; var a = b", 'location');
                test_lib_1.expect(keyValues(bindings))
                    .toEqual(['directive', '#item=\$implicit', 'directive-in=expr in location', '#a=b']);
            });
            test_lib_1.it('should parse pipes', function () {
                var bindings = parseTemplateBindings('key value|pipe');
                var ast = bindings[0].expression.ast;
                test_lib_1.expect(ast).toBeAnInstanceOf(ast_1.BindingPipe);
            });
        });
        test_lib_1.describe('parseInterpolation', function () {
            test_lib_1.it('should return null if no interpolation', function () { test_lib_1.expect(parseInterpolation('nothing')).toBe(null); });
            test_lib_1.it('should parse no prefix/suffix interpolation', function () {
                var ast = parseInterpolation('{{a}}').ast;
                test_lib_1.expect(ast.strings).toEqual(['', '']);
                test_lib_1.expect(ast.expressions.length).toEqual(1);
                test_lib_1.expect(ast.expressions[0].name).toEqual('a');
            });
            test_lib_1.it('should parse prefix/suffix with multiple interpolation', function () {
                var originalExp = 'before {{ a }} middle {{ b }} after';
                var ast = parseInterpolation(originalExp).ast;
                test_lib_1.expect(new unparser_1.Unparser().unparse(ast)).toEqual(originalExp);
            });
            test_lib_1.it("should throw on empty interpolation expressions", function () {
                test_lib_1.expect(function () { return parseInterpolation("{{}}"); })
                    .toThrowErrorWith("Parser Error: Blank expressions are not allowed in interpolated strings");
                test_lib_1.expect(function () { return parseInterpolation("foo {{  }}"); })
                    .toThrowErrorWith("Parser Error: Blank expressions are not allowed in interpolated strings");
            });
        });
        test_lib_1.describe("parseSimpleBinding", function () {
            test_lib_1.it("should parse a field access", function () {
                var p = parseSimpleBinding("name");
                test_lib_1.expect(unparse(p)).toEqual("name");
            });
            test_lib_1.it("should parse a constant", function () {
                var p = parseSimpleBinding("[1, 2]");
                test_lib_1.expect(unparse(p)).toEqual("[1, 2]");
            });
            test_lib_1.it("should throw when the given expression is not just a field name", function () {
                test_lib_1.expect(function () { return parseSimpleBinding("name + 1"); })
                    .toThrowErrorWith('Simple binding expression can only contain field access and constants');
            });
            test_lib_1.it('should throw when encountering interpolation', function () {
                test_lib_1.expect(function () { return parseSimpleBinding('{{exp}}'); })
                    .toThrowErrorWith('Got interpolation ({{}}) where expression was expected');
            });
        });
        test_lib_1.describe('wrapLiteralPrimitive', function () {
            test_lib_1.it('should wrap a literal primitive', function () {
                test_lib_1.expect(unparse(createParser().wrapLiteralPrimitive("foo", null))).toEqual('"foo"');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=parser_spec.js.map