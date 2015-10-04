var test_lib_1 = require('angular2/test_lib');
var core_1 = require('angular2/core');
function main() {
    test_lib_1.describe("UpperCasePipe", function () {
        var upper;
        var lower;
        var pipe;
        test_lib_1.beforeEach(function () {
            lower = 'something';
            upper = 'SOMETHING';
            pipe = new core_1.UpperCasePipe();
        });
        test_lib_1.describe("transform", function () {
            test_lib_1.it("should return uppercase", function () {
                var val = pipe.transform(lower);
                test_lib_1.expect(val).toEqual(upper);
            });
            test_lib_1.it("should uppercase when there is a new value", function () {
                var val = pipe.transform(lower);
                test_lib_1.expect(val).toEqual(upper);
                var val2 = pipe.transform('wat');
                test_lib_1.expect(val2).toEqual('WAT');
            });
            test_lib_1.it("should not support other objects", function () { test_lib_1.expect(function () { return pipe.transform(new Object()); }).toThrowError(); });
        });
    });
}
exports.main = main;
//# sourceMappingURL=uppercase_pipe_spec.js.map