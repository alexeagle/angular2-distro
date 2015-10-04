var test_lib_1 = require('angular2/test_lib');
function main() {
    test_lib_1.describe('Shim', function () {
        test_lib_1.it('should provide correct function.name ', function () {
            var functionWithoutName = function (_) { };
            function foo(_) { }
            ;
            test_lib_1.expect(functionWithoutName.name).toEqual('');
            test_lib_1.expect(foo.name).toEqual('foo');
        });
    });
}
exports.main = main;
//# sourceMappingURL=shim_spec.js.map