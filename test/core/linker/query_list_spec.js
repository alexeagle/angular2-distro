var test_lib_1 = require('angular2/test_lib');
var collection_1 = require('angular2/src/core/facade/collection');
var lang_1 = require('angular2/src/core/facade/lang');
var async_1 = require('angular2/src/core/facade/async');
var query_list_1 = require('angular2/src/core/linker/query_list');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
function main() {
    test_lib_1.describe('QueryList', function () {
        var queryList;
        var log;
        test_lib_1.beforeEach(function () {
            queryList = new query_list_1.QueryList();
            log = '';
        });
        function logAppend(item) { log += (log.length == 0 ? '' : ', ') + item; }
        test_lib_1.it('should support resetting and iterating over the new objects', function () {
            queryList.reset(['one']);
            queryList.reset(['two']);
            collection_1.iterateListLike(queryList, logAppend);
            test_lib_1.expect(log).toEqual('two');
        });
        test_lib_1.it('should support length', function () {
            queryList.reset(['one', 'two']);
            test_lib_1.expect(queryList.length).toEqual(2);
        });
        test_lib_1.it('should support map', function () {
            queryList.reset(['one', 'two']);
            test_lib_1.expect(queryList.map(function (x) { return x; })).toEqual(['one', 'two']);
        });
        test_lib_1.it('should support toString', function () {
            queryList.reset(['one', 'two']);
            var listString = queryList.toString();
            test_lib_1.expect(lang_1.StringWrapper.contains(listString, 'one')).toBeTruthy();
            test_lib_1.expect(lang_1.StringWrapper.contains(listString, 'two')).toBeTruthy();
        });
        test_lib_1.it('should support first and last', function () {
            queryList.reset(['one', 'two', 'three']);
            test_lib_1.expect(queryList.first).toEqual('one');
            test_lib_1.expect(queryList.last).toEqual('three');
        });
        if (dom_adapter_1.DOM.supportsDOMEvents()) {
            test_lib_1.describe('simple observable interface', function () {
                test_lib_1.it('should fire callbacks on change', test_lib_1.fakeAsync(function () {
                    var fires = 0;
                    async_1.ObservableWrapper.subscribe(queryList.changes, function (_) { fires += 1; });
                    queryList.notifyOnChanges();
                    test_lib_1.tick();
                    test_lib_1.expect(fires).toEqual(1);
                    queryList.notifyOnChanges();
                    test_lib_1.tick();
                    test_lib_1.expect(fires).toEqual(2);
                }));
                test_lib_1.it('should provides query list as an argument', test_lib_1.fakeAsync(function () {
                    var recorded;
                    async_1.ObservableWrapper.subscribe(queryList.changes, function (v) { recorded = v; });
                    queryList.reset(["one"]);
                    queryList.notifyOnChanges();
                    test_lib_1.tick();
                    test_lib_1.expect(recorded).toBe(queryList);
                }));
            });
        }
    });
}
exports.main = main;
//# sourceMappingURL=query_list_spec.js.map