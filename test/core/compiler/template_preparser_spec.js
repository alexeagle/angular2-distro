var test_lib_1 = require('angular2/test_lib');
var html_parser_1 = require('angular2/src/core/compiler/html_parser');
var template_preparser_1 = require('angular2/src/core/compiler/template_preparser');
function main() {
    test_lib_1.describe('preparseElement', function () {
        var htmlParser;
        test_lib_1.beforeEach(test_lib_1.inject([html_parser_1.HtmlParser], function (_htmlParser) { htmlParser = _htmlParser; }));
        function preparse(html) {
            return template_preparser_1.preparseElement(htmlParser.parse(html, '')[0]);
        }
        test_lib_1.it('should detect script elements', test_lib_1.inject([html_parser_1.HtmlParser], function (htmlParser) {
            test_lib_1.expect(preparse('<script>').type).toBe(template_preparser_1.PreparsedElementType.SCRIPT);
        }));
        test_lib_1.it('should detect style elements', test_lib_1.inject([html_parser_1.HtmlParser], function (htmlParser) {
            test_lib_1.expect(preparse('<style>').type).toBe(template_preparser_1.PreparsedElementType.STYLE);
        }));
        test_lib_1.it('should detect stylesheet elements', test_lib_1.inject([html_parser_1.HtmlParser], function (htmlParser) {
            test_lib_1.expect(preparse('<link rel="stylesheet">').type).toBe(template_preparser_1.PreparsedElementType.STYLESHEET);
            test_lib_1.expect(preparse('<link rel="stylesheet" href="someUrl">').hrefAttr).toEqual('someUrl');
            test_lib_1.expect(preparse('<link rel="someRel">').type).toBe(template_preparser_1.PreparsedElementType.OTHER);
        }));
        test_lib_1.it('should detect ng-content elements', test_lib_1.inject([html_parser_1.HtmlParser], function (htmlParser) {
            test_lib_1.expect(preparse('<ng-content>').type).toBe(template_preparser_1.PreparsedElementType.NG_CONTENT);
        }));
        test_lib_1.it('should normalize ng-content.select attribute', test_lib_1.inject([html_parser_1.HtmlParser], function (htmlParser) {
            test_lib_1.expect(preparse('<ng-content>').selectAttr).toEqual('*');
            test_lib_1.expect(preparse('<ng-content select>').selectAttr).toEqual('*');
            test_lib_1.expect(preparse('<ng-content select="*">').selectAttr).toEqual('*');
        }));
    });
}
exports.main = main;
//# sourceMappingURL=template_preparser_spec.js.map