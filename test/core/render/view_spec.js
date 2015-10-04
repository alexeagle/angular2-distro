var test_lib_1 = require('angular2/test_lib');
var view_1 = require('angular2/src/core/render/view');
function main() {
    test_lib_1.describe('DefaultRenderView', function () {
        test_lib_1.describe('hydrate', function () {
            test_lib_1.it('should register global event listeners', function () {
                var addCount = 0;
                var adder = function () { addCount++; };
                var view = new view_1.DefaultRenderView([], [], [], [], [adder]);
                view.hydrate();
                test_lib_1.expect(addCount).toBe(1);
            });
        });
        test_lib_1.describe('dehydrate', function () {
            test_lib_1.it('should deregister global event listeners', function () {
                var removeCount = 0;
                var adder = function () { return function () { removeCount++; }; };
                var view = new view_1.DefaultRenderView([], [], [], [], [adder]);
                view.hydrate();
                view.dehydrate();
                test_lib_1.expect(removeCount).toBe(1);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=view_spec.js.map