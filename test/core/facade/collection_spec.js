var test_lib_1 = require('angular2/test_lib');
var collection_1 = require('angular2/src/core/facade/collection');
function main() {
    test_lib_1.describe('ListWrapper', function () {
        var l;
        test_lib_1.describe('splice', function () {
            test_lib_1.it('should remove sublist of given length and return it', function () {
                var list = [1, 2, 3, 4, 5, 6];
                test_lib_1.expect(collection_1.ListWrapper.splice(list, 1, 3)).toEqual([2, 3, 4]);
                test_lib_1.expect(list).toEqual([1, 5, 6]);
            });
            test_lib_1.it('should support negative start', function () {
                var list = [1, 2, 3, 4, 5, 6];
                test_lib_1.expect(collection_1.ListWrapper.splice(list, -5, 3)).toEqual([2, 3, 4]);
                test_lib_1.expect(list).toEqual([1, 5, 6]);
            });
        });
        test_lib_1.describe('fill', function () {
            test_lib_1.beforeEach(function () { l = [1, 2, 3, 4]; });
            test_lib_1.it('should fill the whole list if neither start nor end are specified', function () {
                collection_1.ListWrapper.fill(l, 9);
                test_lib_1.expect(l).toEqual([9, 9, 9, 9]);
            });
            test_lib_1.it('should fill up to the end if end is not specified', function () {
                collection_1.ListWrapper.fill(l, 9, 1);
                test_lib_1.expect(l).toEqual([1, 9, 9, 9]);
            });
            test_lib_1.it('should support negative start', function () {
                collection_1.ListWrapper.fill(l, 9, -1);
                test_lib_1.expect(l).toEqual([1, 2, 3, 9]);
            });
            test_lib_1.it('should support negative end', function () {
                collection_1.ListWrapper.fill(l, 9, -2, -1);
                test_lib_1.expect(l).toEqual([1, 2, 9, 4]);
            });
        });
        test_lib_1.describe('slice', function () {
            test_lib_1.beforeEach(function () { l = [1, 2, 3, 4]; });
            test_lib_1.it('should return the whole list if neither start nor end are specified', function () { test_lib_1.expect(collection_1.ListWrapper.slice(l)).toEqual([1, 2, 3, 4]); });
            test_lib_1.it('should return up to the end if end is not specified', function () { test_lib_1.expect(collection_1.ListWrapper.slice(l, 1)).toEqual([2, 3, 4]); });
            test_lib_1.it('should support negative start', function () { test_lib_1.expect(collection_1.ListWrapper.slice(l, -1)).toEqual([4]); });
            test_lib_1.it('should support negative end', function () { test_lib_1.expect(collection_1.ListWrapper.slice(l, -3, -1)).toEqual([2, 3]); });
            test_lib_1.it('should return empty list if start is greater than end', function () {
                test_lib_1.expect(collection_1.ListWrapper.slice(l, 4, 2)).toEqual([]);
                test_lib_1.expect(collection_1.ListWrapper.slice(l, -2, -4)).toEqual([]);
            });
        });
        test_lib_1.describe('indexOf', function () {
            test_lib_1.beforeEach(function () { l = [1, 2, 3, 4]; });
            test_lib_1.it('should find values that exist', function () { test_lib_1.expect(collection_1.ListWrapper.indexOf(l, 1)).toEqual(0); });
            test_lib_1.it('should not find values that do not exist', function () { test_lib_1.expect(collection_1.ListWrapper.indexOf(l, 9)).toEqual(-1); });
            test_lib_1.it('should respect the startIndex parameter', function () { test_lib_1.expect(collection_1.ListWrapper.indexOf(l, 1, 1)).toEqual(-1); });
        });
        test_lib_1.describe('maximum', function () {
            test_lib_1.it('should return the maximal element', function () { test_lib_1.expect(collection_1.ListWrapper.maximum([1, 2, 3, 4], function (x) { return x; })).toEqual(4); });
            test_lib_1.it('should ignore null values', function () { test_lib_1.expect(collection_1.ListWrapper.maximum([null, 2, 3, null], function (x) { return x; })).toEqual(3); });
            test_lib_1.it('should use the provided function to determine maximum', function () { test_lib_1.expect(collection_1.ListWrapper.maximum([1, 2, 3, 4], function (x) { return -x; })).toEqual(1); });
            test_lib_1.it('should return null for an empty list', function () { test_lib_1.expect(collection_1.ListWrapper.maximum([], function (x) { return x; })).toEqual(null); });
        });
        test_lib_1.describe('forEachWithIndex', function () {
            var l;
            test_lib_1.beforeEach(function () { l = ["a", "b"]; });
            test_lib_1.it('should iterate over an array passing values and indices', function () {
                var record = [];
                collection_1.ListWrapper.forEachWithIndex(l, function (value, index) { return record.push([value, index]); });
                test_lib_1.expect(record).toEqual([["a", 0], ["b", 1]]);
            });
        });
    });
    test_lib_1.describe('StringMapWrapper', function () {
        test_lib_1.describe('equals', function () {
            test_lib_1.it('should return true when comparing empty maps', function () { test_lib_1.expect(collection_1.StringMapWrapper.equals({}, {})).toBe(true); });
            test_lib_1.it('should return true when comparing the same map', function () {
                var m1 = { 'a': 1, 'b': 2, 'c': 3 };
                test_lib_1.expect(collection_1.StringMapWrapper.equals(m1, m1)).toBe(true);
            });
            test_lib_1.it('should return true when comparing different maps with the same keys and values', function () {
                var m1 = { 'a': 1, 'b': 2, 'c': 3 };
                var m2 = { 'a': 1, 'b': 2, 'c': 3 };
                test_lib_1.expect(collection_1.StringMapWrapper.equals(m1, m2)).toBe(true);
            });
            test_lib_1.it('should return false when comparing maps with different numbers of keys', function () {
                var m1 = { 'a': 1, 'b': 2, 'c': 3 };
                var m2 = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };
                test_lib_1.expect(collection_1.StringMapWrapper.equals(m1, m2)).toBe(false);
                test_lib_1.expect(collection_1.StringMapWrapper.equals(m2, m1)).toBe(false);
            });
            test_lib_1.it('should return false when comparing maps with different keys', function () {
                var m1 = { 'a': 1, 'b': 2, 'c': 3 };
                var m2 = { 'a': 1, 'b': 2, 'CC': 3 };
                test_lib_1.expect(collection_1.StringMapWrapper.equals(m1, m2)).toBe(false);
                test_lib_1.expect(collection_1.StringMapWrapper.equals(m2, m1)).toBe(false);
            });
            test_lib_1.it('should return false when comparing maps with different values', function () {
                var m1 = { 'a': 1, 'b': 2, 'c': 3 };
                var m2 = { 'a': 1, 'b': 20, 'c': 3 };
                test_lib_1.expect(collection_1.StringMapWrapper.equals(m1, m2)).toBe(false);
                test_lib_1.expect(collection_1.StringMapWrapper.equals(m2, m1)).toBe(false);
            });
        });
        test_lib_1.describe('MapWrapper', function () {
            test_lib_1.it('should return a list of keys values', function () {
                var m = new Map();
                m.set('a', 'b');
                test_lib_1.expect(collection_1.MapWrapper.keys(m)).toEqual(['a']);
                test_lib_1.expect(collection_1.MapWrapper.values(m)).toEqual(['b']);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=collection_spec.js.map