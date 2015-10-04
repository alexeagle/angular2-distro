var test_lib_1 = require('angular2/test_lib');
var pipes_1 = require('angular2/src/core/pipes');
function main() {
    test_lib_1.describe("SlicePipe", function () {
        var list;
        var str;
        var pipe;
        test_lib_1.beforeEach(function () {
            list = [1, 2, 3, 4, 5];
            str = 'tuvwxyz';
            pipe = new pipes_1.SlicePipe();
        });
        test_lib_1.describe("supports", function () {
            test_lib_1.it("should support strings", function () { test_lib_1.expect(pipe.supports(str)).toBe(true); });
            test_lib_1.it("should support lists", function () { test_lib_1.expect(pipe.supports(list)).toBe(true); });
            test_lib_1.it("should not support other objects", function () {
                test_lib_1.expect(pipe.supports(new Object())).toBe(false);
                test_lib_1.expect(pipe.supports(null)).toBe(false);
            });
        });
        test_lib_1.describe("transform", function () {
            test_lib_1.it('should return all items after START index when START is positive and END is omitted', function () {
                test_lib_1.expect(pipe.transform(list, [3])).toEqual([4, 5]);
                test_lib_1.expect(pipe.transform(str, [3])).toEqual('wxyz');
            });
            test_lib_1.it('should return last START items when START is negative and END is omitted', function () {
                test_lib_1.expect(pipe.transform(list, [-3])).toEqual([3, 4, 5]);
                test_lib_1.expect(pipe.transform(str, [-3])).toEqual('xyz');
            });
            test_lib_1.it('should return all items between START and END index when START and END are positive', function () {
                test_lib_1.expect(pipe.transform(list, [1, 3])).toEqual([2, 3]);
                test_lib_1.expect(pipe.transform(str, [1, 3])).toEqual('uv');
            });
            test_lib_1.it('should return all items between START and END from the end when START and END are negative', function () {
                test_lib_1.expect(pipe.transform(list, [-4, -2])).toEqual([2, 3]);
                test_lib_1.expect(pipe.transform(str, [-4, -2])).toEqual('wx');
            });
            test_lib_1.it('should return an empty value if START is greater than END', function () {
                test_lib_1.expect(pipe.transform(list, [4, 2])).toEqual([]);
                test_lib_1.expect(pipe.transform(str, [4, 2])).toEqual('');
            });
            test_lib_1.it('should return an empty value if START greater than input length', function () {
                test_lib_1.expect(pipe.transform(list, [99])).toEqual([]);
                test_lib_1.expect(pipe.transform(str, [99])).toEqual('');
            });
            test_lib_1.it('should return entire input if START is negative and greater than input length', function () {
                test_lib_1.expect(pipe.transform(list, [-99])).toEqual([1, 2, 3, 4, 5]);
                test_lib_1.expect(pipe.transform(str, [-99])).toEqual('tuvwxyz');
            });
            test_lib_1.it('should not modify the input list', function () {
                test_lib_1.expect(pipe.transform(list, [2])).toEqual([3, 4, 5]);
                test_lib_1.expect(list).toEqual([1, 2, 3, 4, 5]);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=slice_pipe_spec.js.map