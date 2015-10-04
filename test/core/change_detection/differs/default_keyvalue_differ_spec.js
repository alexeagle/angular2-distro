var test_lib_1 = require('angular2/test_lib');
var default_keyvalue_differ_1 = require('angular2/src/core/change_detection/differs/default_keyvalue_differ');
var lang_1 = require('angular2/src/core/facade/lang');
var collection_1 = require('angular2/src/core/facade/collection');
var util_1 = require('../../../core/change_detection/util');
// todo(vicb): Update the code & tests for object equality
function main() {
    test_lib_1.describe('keyvalue differ', function () {
        test_lib_1.describe('DefaultKeyValueDiffer', function () {
            var differ;
            var m;
            test_lib_1.beforeEach(function () {
                differ = new default_keyvalue_differ_1.DefaultKeyValueDiffer();
                m = new Map();
            });
            test_lib_1.afterEach(function () { differ = null; });
            test_lib_1.it('should detect additions', function () {
                differ.check(m);
                m.set('a', 1);
                differ.check(m);
                test_lib_1.expect(differ.toString())
                    .toEqual(util_1.kvChangesAsString({ map: ['a[null->1]'], additions: ['a[null->1]'] }));
                m.set('b', 2);
                differ.check(m);
                test_lib_1.expect(differ.toString())
                    .toEqual(util_1.kvChangesAsString({ map: ['a', 'b[null->2]'], previous: ['a'], additions: ['b[null->2]'] }));
            });
            test_lib_1.it('should handle changing key/values correctly', function () {
                m.set(1, 10);
                m.set(2, 20);
                differ.check(m);
                m.set(2, 10);
                m.set(1, 20);
                differ.check(m);
                test_lib_1.expect(differ.toString())
                    .toEqual(util_1.kvChangesAsString({
                    map: ['1[10->20]', '2[20->10]'],
                    previous: ['1[10->20]', '2[20->10]'],
                    changes: ['1[10->20]', '2[20->10]']
                }));
            });
            test_lib_1.it('should expose previous and current value', function () {
                var previous, current;
                m.set(1, 10);
                differ.check(m);
                m.set(1, 20);
                differ.check(m);
                differ.forEachChangedItem(function (record) {
                    previous = record.previousValue;
                    current = record.currentValue;
                });
                test_lib_1.expect(previous).toEqual(10);
                test_lib_1.expect(current).toEqual(20);
            });
            test_lib_1.it('should do basic map watching', function () {
                differ.check(m);
                m.set('a', 'A');
                differ.check(m);
                test_lib_1.expect(differ.toString())
                    .toEqual(util_1.kvChangesAsString({ map: ['a[null->A]'], additions: ['a[null->A]'] }));
                m.set('b', 'B');
                differ.check(m);
                test_lib_1.expect(differ.toString())
                    .toEqual(util_1.kvChangesAsString({ map: ['a', 'b[null->B]'], previous: ['a'], additions: ['b[null->B]'] }));
                m.set('b', 'BB');
                m.set('d', 'D');
                differ.check(m);
                test_lib_1.expect(differ.toString())
                    .toEqual(util_1.kvChangesAsString({
                    map: ['a', 'b[B->BB]', 'd[null->D]'],
                    previous: ['a', 'b[B->BB]'],
                    additions: ['d[null->D]'],
                    changes: ['b[B->BB]']
                }));
                collection_1.MapWrapper.delete(m, 'b');
                differ.check(m);
                test_lib_1.expect(differ.toString())
                    .toEqual(util_1.kvChangesAsString({ map: ['a', 'd'], previous: ['a', 'b[BB->null]', 'd'], removals: ['b[BB->null]'] }));
                m.clear();
                differ.check(m);
                test_lib_1.expect(differ.toString())
                    .toEqual(util_1.kvChangesAsString({ previous: ['a[A->null]', 'd[D->null]'], removals: ['a[A->null]', 'd[D->null]'] }));
            });
            test_lib_1.it('should test string by value rather than by reference (DART)', function () {
                m.set('foo', 'bar');
                differ.check(m);
                var f = 'f';
                var oo = 'oo';
                var b = 'b';
                var ar = 'ar';
                m.set(f + oo, b + ar);
                differ.check(m);
                test_lib_1.expect(differ.toString()).toEqual(util_1.kvChangesAsString({ map: ['foo'], previous: ['foo'] }));
            });
            test_lib_1.it('should not see a NaN value as a change (JS)', function () {
                m.set('foo', lang_1.NumberWrapper.NaN);
                differ.check(m);
                differ.check(m);
                test_lib_1.expect(differ.toString()).toEqual(util_1.kvChangesAsString({ map: ['foo'], previous: ['foo'] }));
            });
            // JS specific tests (JS Objects)
            if (lang_1.isJsObject({})) {
                test_lib_1.describe('JsObject changes', function () {
                    test_lib_1.it('should support JS Object', function () {
                        var f = new default_keyvalue_differ_1.DefaultKeyValueDifferFactory();
                        test_lib_1.expect(f.supports({})).toBeTruthy();
                        test_lib_1.expect(f.supports("not supported")).toBeFalsy();
                        test_lib_1.expect(f.supports(0)).toBeFalsy();
                        test_lib_1.expect(f.supports(null)).toBeFalsy();
                    });
                    test_lib_1.it('should do basic object watching', function () {
                        var m = {};
                        differ.check(m);
                        m['a'] = 'A';
                        differ.check(m);
                        test_lib_1.expect(differ.toString())
                            .toEqual(util_1.kvChangesAsString({ map: ['a[null->A]'], additions: ['a[null->A]'] }));
                        m['b'] = 'B';
                        differ.check(m);
                        test_lib_1.expect(differ.toString())
                            .toEqual(util_1.kvChangesAsString({ map: ['a', 'b[null->B]'], previous: ['a'], additions: ['b[null->B]'] }));
                        m['b'] = 'BB';
                        m['d'] = 'D';
                        differ.check(m);
                        test_lib_1.expect(differ.toString())
                            .toEqual(util_1.kvChangesAsString({
                            map: ['a', 'b[B->BB]', 'd[null->D]'],
                            previous: ['a', 'b[B->BB]'],
                            additions: ['d[null->D]'],
                            changes: ['b[B->BB]']
                        }));
                        m = {};
                        m['a'] = 'A';
                        m['d'] = 'D';
                        differ.check(m);
                        test_lib_1.expect(differ.toString())
                            .toEqual(util_1.kvChangesAsString({
                            map: ['a', 'd'],
                            previous: ['a', 'b[BB->null]', 'd'],
                            removals: ['b[BB->null]']
                        }));
                        m = {};
                        differ.check(m);
                        test_lib_1.expect(differ.toString())
                            .toEqual(util_1.kvChangesAsString({
                            previous: ['a[A->null]', 'd[D->null]'],
                            removals: ['a[A->null]', 'd[D->null]']
                        }));
                    });
                });
                test_lib_1.describe('diff', function () {
                    test_lib_1.it('should return self when there is a change', function () {
                        m.set('a', 'A');
                        test_lib_1.expect(differ.diff(m)).toBe(differ);
                    });
                    test_lib_1.it('should return null when there is no change', function () {
                        m.set('a', 'A');
                        differ.diff(m);
                        test_lib_1.expect(differ.diff(m)).toEqual(null);
                    });
                    test_lib_1.it('should treat null as an empty list', function () {
                        m.set('a', 'A');
                        differ.diff(m);
                        test_lib_1.expect(differ.diff(null).toString())
                            .toEqual(util_1.kvChangesAsString({ previous: ['a[A->null]'], removals: ['a[A->null]'] }));
                    });
                    test_lib_1.it('should throw when given an invalid collection', function () {
                        test_lib_1.expect(function () { return differ.diff("invalid"); }).toThrowErrorWith("Error trying to diff 'invalid'");
                    });
                });
            }
        });
    });
}
exports.main = main;
//# sourceMappingURL=default_keyvalue_differ_spec.js.map