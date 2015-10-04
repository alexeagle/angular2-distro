var test_lib_1 = require('angular2/test_lib');
var proto_change_detector_1 = require('angular2/src/core/change_detection/proto_change_detector');
var binding_record_1 = require('angular2/src/core/change_detection/binding_record');
var parser_1 = require('angular2/src/core/change_detection/parser/parser');
function main() {
    test_lib_1.describe("ProtoRecordBuilder", function () {
        test_lib_1.it('should set argumentToPureFunction flag', test_lib_1.inject([parser_1.Parser], function (p) {
            var builder = new proto_change_detector_1.ProtoRecordBuilder();
            var ast = p.parseBinding("[1,2]", "location"); // collection literal is a pure function
            builder.add(binding_record_1.BindingRecord.createForElementProperty(ast, 0, "property"), [], 0);
            var isPureFunc = builder.records.map(function (r) { return r.argumentToPureFunction; });
            test_lib_1.expect(isPureFunc).toEqual([true, true, false]);
        }));
        test_lib_1.it('should not set argumentToPureFunction flag when not needed', test_lib_1.inject([parser_1.Parser], function (p) {
            var builder = new proto_change_detector_1.ProtoRecordBuilder();
            var ast = p.parseBinding("f(1,2)", "location");
            builder.add(binding_record_1.BindingRecord.createForElementProperty(ast, 0, "property"), [], 0);
            var isPureFunc = builder.records.map(function (r) { return r.argumentToPureFunction; });
            test_lib_1.expect(isPureFunc).toEqual([false, false, false]);
        }));
    });
}
exports.main = main;
//# sourceMappingURL=proto_record_builder_spec.js.map