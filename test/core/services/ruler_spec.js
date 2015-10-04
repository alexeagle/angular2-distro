var test_lib_1 = require('angular2/test_lib');
var spies_1 = require('../spies');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
var ruler_1 = require('angular2/src/core/services/ruler');
var rectangle_mock_1 = require('./rectangle_mock');
function assertDimensions(rect, left, right, top, bottom, width, height) {
    test_lib_1.expect(rect.left).toEqual(left);
    test_lib_1.expect(rect.right).toEqual(right);
    test_lib_1.expect(rect.top).toEqual(top);
    test_lib_1.expect(rect.bottom).toEqual(bottom);
    test_lib_1.expect(rect.width).toEqual(width);
    test_lib_1.expect(rect.height).toEqual(height);
}
function main() {
    test_lib_1.describe('ruler service', function () {
        test_lib_1.it('should allow measuring ElementRefs', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var ruler = new ruler_1.Ruler(test_lib_1.SpyObject.stub(new spies_1.SpyDomAdapter(), { 'getBoundingClientRect': rectangle_mock_1.createRectangle(10, 20, 200, 100) }));
            var elRef = new spies_1.SpyElementRef();
            ruler.measure(elRef).then(function (rect) {
                assertDimensions(rect, 10, 210, 20, 120, 200, 100);
                async.done();
            });
        }));
        test_lib_1.it('should return 0 for all rectangle values while measuring elements in a document fragment', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var ruler = new ruler_1.Ruler(dom_adapter_1.DOM);
            var elRef = new spies_1.SpyElementRef();
            elRef.prop("nativeElement", dom_adapter_1.DOM.createElement('div'));
            ruler.measure(elRef).then(function (rect) {
                // here we are using an element created in a doc fragment so all the measures will come
                // back as 0
                assertDimensions(rect, 0, 0, 0, 0, 0, 0);
                async.done();
            });
        }));
    });
}
exports.main = main;
//# sourceMappingURL=ruler_spec.js.map