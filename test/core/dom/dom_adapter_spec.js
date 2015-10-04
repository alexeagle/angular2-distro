var test_lib_1 = require('angular2/test_lib');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
function main() {
    test_lib_1.describe('dom adapter', function () {
        test_lib_1.it('should not coalesque text nodes', function () {
            var el1 = test_lib_1.el('<div>a</div>');
            var el2 = test_lib_1.el('<div>b</div>');
            dom_adapter_1.DOM.appendChild(el2, dom_adapter_1.DOM.firstChild(el1));
            test_lib_1.expect(dom_adapter_1.DOM.childNodes(el2).length).toBe(2);
            var el2Clone = dom_adapter_1.DOM.clone(el2);
            test_lib_1.expect(dom_adapter_1.DOM.childNodes(el2Clone).length).toBe(2);
        });
        test_lib_1.it('should clone correctly', function () {
            var el1 = test_lib_1.el('<div x="y">a<span>b</span></div>');
            var clone = dom_adapter_1.DOM.clone(el1);
            test_lib_1.expect(clone).not.toBe(el1);
            dom_adapter_1.DOM.setAttribute(clone, 'test', '1');
            test_lib_1.expect(test_lib_1.stringifyElement(clone)).toEqual('<div test="1" x="y">a<span>b</span></div>');
            test_lib_1.expect(dom_adapter_1.DOM.getAttribute(el1, 'test')).toBeFalsy();
            var cNodes = dom_adapter_1.DOM.childNodes(clone);
            var firstChild = cNodes[0];
            var secondChild = cNodes[1];
            test_lib_1.expect(dom_adapter_1.DOM.parentElement(firstChild)).toBe(clone);
            test_lib_1.expect(dom_adapter_1.DOM.nextSibling(firstChild)).toBe(secondChild);
            test_lib_1.expect(dom_adapter_1.DOM.isTextNode(firstChild)).toBe(true);
            test_lib_1.expect(dom_adapter_1.DOM.parentElement(secondChild)).toBe(clone);
            test_lib_1.expect(dom_adapter_1.DOM.nextSibling(secondChild)).toBeFalsy();
            test_lib_1.expect(dom_adapter_1.DOM.isElementNode(secondChild)).toBe(true);
        });
        test_lib_1.it('should be able to create text nodes and use them with the other APIs', function () {
            var t = dom_adapter_1.DOM.createTextNode('hello');
            test_lib_1.expect(dom_adapter_1.DOM.isTextNode(t)).toBe(true);
            var d = dom_adapter_1.DOM.createElement('div');
            dom_adapter_1.DOM.appendChild(d, t);
            test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(d)).toEqual('hello');
        });
        test_lib_1.it('should set className via the class attribute', function () {
            var d = dom_adapter_1.DOM.createElement('div');
            dom_adapter_1.DOM.setAttribute(d, 'class', 'class1');
            test_lib_1.expect(d.className).toEqual('class1');
        });
        test_lib_1.it('should allow to remove nodes without parents', function () {
            var d = dom_adapter_1.DOM.createElement('div');
            test_lib_1.expect(function () { return dom_adapter_1.DOM.remove(d); }).not.toThrow();
        });
        if (dom_adapter_1.DOM.supportsDOMEvents()) {
            test_lib_1.describe('getBaseHref', function () {
                test_lib_1.beforeEach(function () { return dom_adapter_1.DOM.resetBaseElement(); });
                test_lib_1.it('should return null if base element is absent', function () { test_lib_1.expect(dom_adapter_1.DOM.getBaseHref()).toBeNull(); });
                test_lib_1.it('should return the value of the base element', function () {
                    var baseEl = dom_adapter_1.DOM.createElement('base');
                    dom_adapter_1.DOM.setAttribute(baseEl, 'href', '/drop/bass/connon/');
                    var headEl = dom_adapter_1.DOM.defaultDoc().head;
                    dom_adapter_1.DOM.appendChild(headEl, baseEl);
                    var baseHref = dom_adapter_1.DOM.getBaseHref();
                    dom_adapter_1.DOM.removeChild(headEl, baseEl);
                    dom_adapter_1.DOM.resetBaseElement();
                    test_lib_1.expect(baseHref).toEqual('/drop/bass/connon/');
                });
                test_lib_1.it('should return a relative url', function () {
                    var baseEl = dom_adapter_1.DOM.createElement('base');
                    dom_adapter_1.DOM.setAttribute(baseEl, 'href', 'base');
                    var headEl = dom_adapter_1.DOM.defaultDoc().head;
                    dom_adapter_1.DOM.appendChild(headEl, baseEl);
                    var baseHref = dom_adapter_1.DOM.getBaseHref();
                    dom_adapter_1.DOM.removeChild(headEl, baseEl);
                    dom_adapter_1.DOM.resetBaseElement();
                    test_lib_1.expect(baseHref).toEqual('/base');
                });
            });
        }
    });
}
exports.main = main;
//# sourceMappingURL=dom_adapter_spec.js.map