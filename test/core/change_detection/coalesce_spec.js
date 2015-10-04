var test_lib_1 = require('angular2/test_lib');
var lang_1 = require('angular2/src/core/facade/lang');
var coalesce_1 = require('angular2/src/core/change_detection/coalesce');
var proto_record_1 = require('angular2/src/core/change_detection/proto_record');
var directive_record_1 = require('angular2/src/core/change_detection/directive_record');
function main() {
    function r(funcOrValue, args, contextIndex, selfIndex, _a) {
        var _b = _a === void 0 ? {} : _a, lastInBinding = _b.lastInBinding, mode = _b.mode, name = _b.name, directiveIndex = _b.directiveIndex, argumentToPureFunction = _b.argumentToPureFunction;
        if (lang_1.isBlank(lastInBinding))
            lastInBinding = false;
        if (lang_1.isBlank(mode))
            mode = proto_record_1.RecordType.PropertyRead;
        if (lang_1.isBlank(name))
            name = "name";
        if (lang_1.isBlank(directiveIndex))
            directiveIndex = null;
        if (lang_1.isBlank(argumentToPureFunction))
            argumentToPureFunction = false;
        return new proto_record_1.ProtoRecord(mode, name, funcOrValue, args, null, contextIndex, directiveIndex, selfIndex, null, lastInBinding, false, argumentToPureFunction, false, 0);
    }
    test_lib_1.describe("change detection - coalesce", function () {
        test_lib_1.it("should work with an empty list", function () { test_lib_1.expect(coalesce_1.coalesce([])).toEqual([]); });
        test_lib_1.it("should remove non-terminal duplicate records" +
            " and update the context indices referencing them", function () {
            var rs = coalesce_1.coalesce([r("user", [], 0, 1), r("first", [], 1, 2), r("user", [], 0, 3), r("last", [], 3, 4)]);
            test_lib_1.expect(rs).toEqual([r("user", [], 0, 1), r("first", [], 1, 2), r("last", [], 1, 3)]);
        });
        test_lib_1.it("should update indices of other records", function () {
            var rs = coalesce_1.coalesce([r("dup", [], 0, 1), r("dup", [], 0, 2), r("user", [], 0, 3), r("first", [3], 3, 4)]);
            test_lib_1.expect(rs).toEqual([r("dup", [], 0, 1), r("user", [], 0, 2), r("first", [2], 2, 3)]);
        });
        test_lib_1.it("should remove non-terminal duplicate records" +
            " and update the args indices referencing them", function () {
            var rs = coalesce_1.coalesce([
                r("user1", [], 0, 1),
                r("user2", [], 0, 2),
                r("hi", [1], 0, 3),
                r("hi", [1], 0, 4),
                r("hi", [2], 0, 5)
            ]);
            test_lib_1.expect(rs).toEqual([r("user1", [], 0, 1), r("user2", [], 0, 2), r("hi", [1], 0, 3), r("hi", [2], 0, 4)]);
        });
        test_lib_1.it("should replace duplicate terminal records with self records", function () {
            var rs = coalesce_1.coalesce([r("user", [], 0, 1, { lastInBinding: true }), r("user", [], 0, 2, { lastInBinding: true })]);
            test_lib_1.expect(rs[1]).toEqual(new proto_record_1.ProtoRecord(proto_record_1.RecordType.Self, "self", null, [], null, 1, null, 2, null, true, false, false, false, 0));
        });
        test_lib_1.it("should set referencedBySelf", function () {
            var rs = coalesce_1.coalesce([r("user", [], 0, 1, { lastInBinding: true }), r("user", [], 0, 2, { lastInBinding: true })]);
            test_lib_1.expect(rs[0].referencedBySelf).toBeTruthy();
        });
        test_lib_1.it("should not coalesce directive lifecycle records", function () {
            var rs = coalesce_1.coalesce([
                r("doCheck", [], 0, 1, { mode: proto_record_1.RecordType.DirectiveLifecycle }),
                r("doCheck", [], 0, 1, { mode: proto_record_1.RecordType.DirectiveLifecycle })
            ]);
            test_lib_1.expect(rs.length).toEqual(2);
        });
        test_lib_1.it("should not coalesce protos with different names but same value", function () {
            var nullFunc = function () { };
            var rs = coalesce_1.coalesce([
                r(nullFunc, [], 0, 1, { name: "foo" }),
                r(nullFunc, [], 0, 1, { name: "bar" }),
            ]);
            test_lib_1.expect(rs.length).toEqual(2);
        });
        test_lib_1.it("should not coalesce protos with the same context index but different directive indices", function () {
            var nullFunc = function () { };
            var rs = coalesce_1.coalesce([
                r(nullFunc, [], 0, 1, { directiveIndex: new directive_record_1.DirectiveIndex(0, 0) }),
                r(nullFunc, [], 0, 1, { directiveIndex: new directive_record_1.DirectiveIndex(0, 1) }),
                r(nullFunc, [], 0, 1, { directiveIndex: new directive_record_1.DirectiveIndex(1, 0) }),
                r(nullFunc, [], 0, 1, { directiveIndex: null }),
            ]);
            test_lib_1.expect(rs.length).toEqual(4);
        });
        test_lib_1.it('should preserve the argumentToPureFunction property', function () {
            var rs = coalesce_1.coalesce([
                r("user", [], 0, 1),
                r("user", [], 0, 2, { argumentToPureFunction: true }),
                r("user", [], 0, 3),
                r("name", [], 3, 4)
            ]);
            test_lib_1.expect(rs)
                .toEqual([r("user", [], 0, 1, { argumentToPureFunction: true }), r("name", [], 1, 2)]);
        });
        test_lib_1.it('should preserve the argumentToPureFunction property (the original record)', function () {
            var rs = coalesce_1.coalesce([
                r("user", [], 0, 1, { argumentToPureFunction: true }),
                r("user", [], 0, 2),
                r("name", [], 2, 3)
            ]);
            test_lib_1.expect(rs)
                .toEqual([r("user", [], 0, 1, { argumentToPureFunction: true }), r("name", [], 1, 2)]);
        });
    });
}
exports.main = main;
//# sourceMappingURL=coalesce_spec.js.map