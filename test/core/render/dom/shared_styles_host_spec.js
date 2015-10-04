var test_lib_1 = require('angular2/test_lib');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
var shared_styles_host_1 = require('angular2/src/core/render/dom/shared_styles_host');
function main() {
    test_lib_1.describe('DomSharedStylesHost', function () {
        var doc;
        var ssh;
        var someHost;
        test_lib_1.beforeEach(function () {
            doc = dom_adapter_1.DOM.createHtmlDocument();
            doc.title = '';
            ssh = new shared_styles_host_1.DomSharedStylesHost(doc);
            someHost = dom_adapter_1.DOM.createElement('div');
        });
        test_lib_1.it('should add existing styles to new hosts', function () {
            ssh.addStyles(['a {};']);
            ssh.addHost(someHost);
            test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(someHost)).toEqual('<style>a {};</style>');
        });
        test_lib_1.it('should add new styles to hosts', function () {
            ssh.addHost(someHost);
            ssh.addStyles(['a {};']);
            test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(someHost)).toEqual('<style>a {};</style>');
        });
        test_lib_1.it('should add styles only once to hosts', function () {
            ssh.addStyles(['a {};']);
            ssh.addHost(someHost);
            ssh.addStyles(['a {};']);
            test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(someHost)).toEqual('<style>a {};</style>');
        });
        test_lib_1.it('should use the document head as default host', function () {
            ssh.addStyles(['a {};', 'b {};']);
            test_lib_1.expect(doc.head).toHaveText('a {};b {};');
        });
    });
}
exports.main = main;
//# sourceMappingURL=shared_styles_host_spec.js.map