var test_lib_1 = require('angular2/test_lib');
var url_parser_1 = require('angular2/src/router/url_parser');
function main() {
    test_lib_1.describe('ParsedUrl', function () {
        var urlParser;
        test_lib_1.beforeEach(function () { urlParser = new url_parser_1.UrlParser(); });
        test_lib_1.it('should work in a simple case', function () {
            var url = urlParser.parse('hello/there');
            test_lib_1.expect(url.toString()).toEqual('hello/there');
        });
        test_lib_1.it('should remove the leading slash', function () {
            var url = urlParser.parse('/hello/there');
            test_lib_1.expect(url.toString()).toEqual('hello/there');
        });
        test_lib_1.it('should work with a single aux route', function () {
            var url = urlParser.parse('hello/there(a)');
            test_lib_1.expect(url.toString()).toEqual('hello/there(a)');
        });
        test_lib_1.it('should work with multiple aux routes', function () {
            var url = urlParser.parse('hello/there(a//b)');
            test_lib_1.expect(url.toString()).toEqual('hello/there(a//b)');
        });
        test_lib_1.it('should work with children after an aux route', function () {
            var url = urlParser.parse('hello/there(a//b)/c/d');
            test_lib_1.expect(url.toString()).toEqual('hello/there(a//b)/c/d');
        });
        test_lib_1.it('should work when aux routes have children', function () {
            var url = urlParser.parse('hello(aa/bb//bb/cc)');
            test_lib_1.expect(url.toString()).toEqual('hello(aa/bb//bb/cc)');
        });
        test_lib_1.it('should parse an aux route with an aux route', function () {
            var url = urlParser.parse('hello(aa(bb))');
            test_lib_1.expect(url.toString()).toEqual('hello(aa(bb))');
        });
        test_lib_1.it('should simplify an empty aux route definition', function () {
            var url = urlParser.parse('hello()/there');
            test_lib_1.expect(url.toString()).toEqual('hello/there');
        });
        test_lib_1.it('should parse a key-value matrix param', function () {
            var url = urlParser.parse('hello/friend;name=bob');
            test_lib_1.expect(url.toString()).toEqual('hello/friend;name=bob');
        });
        test_lib_1.it('should parse multiple key-value matrix params', function () {
            var url = urlParser.parse('hello/there;greeting=hi;whats=up');
            test_lib_1.expect(url.toString()).toEqual('hello/there;greeting=hi;whats=up');
        });
        test_lib_1.it('should ignore matrix params on the first segment', function () {
            var url = urlParser.parse('profile;a=1/hi');
            test_lib_1.expect(url.toString()).toEqual('profile/hi');
        });
        test_lib_1.it('should parse a key-only matrix param', function () {
            var url = urlParser.parse('hello/there;hi');
            test_lib_1.expect(url.toString()).toEqual('hello/there;hi');
        });
        test_lib_1.it('should parse a key-value query param', function () {
            var url = urlParser.parse('hello/friend?name=bob');
            test_lib_1.expect(url.toString()).toEqual('hello/friend?name=bob');
        });
        test_lib_1.it('should parse multiple key-value query params', function () {
            var url = urlParser.parse('hello/there?greeting=hi&whats=up');
            test_lib_1.expect(url.params).toEqual({ 'greeting': 'hi', 'whats': 'up' });
            test_lib_1.expect(url.toString()).toEqual('hello/there?greeting=hi&whats=up');
        });
        test_lib_1.it('should parse a key-only matrix param', function () {
            var url = urlParser.parse('hello/there?hi');
            test_lib_1.expect(url.toString()).toEqual('hello/there?hi');
        });
        test_lib_1.it('should parse a route with matrix and query params', function () {
            var url = urlParser.parse('hello/there;sort=asc;unfiltered?hi&friend=true');
            test_lib_1.expect(url.toString()).toEqual('hello/there;sort=asc;unfiltered?hi&friend=true');
        });
        test_lib_1.it('should parse a route with matrix params and aux routes', function () {
            var url = urlParser.parse('hello/there;sort=asc(modal)');
            test_lib_1.expect(url.toString()).toEqual('hello/there;sort=asc(modal)');
        });
        test_lib_1.it('should parse an aux route with matrix params', function () {
            var url = urlParser.parse('hello/there(modal;sort=asc)');
            test_lib_1.expect(url.toString()).toEqual('hello/there(modal;sort=asc)');
        });
        test_lib_1.it('should parse a route with matrix params, aux routes, and query params', function () {
            var url = urlParser.parse('hello/there;sort=asc(modal)?friend=true');
            test_lib_1.expect(url.toString()).toEqual('hello/there;sort=asc(modal)?friend=true');
        });
    });
}
exports.main = main;
//# sourceMappingURL=url_parser_spec.js.map