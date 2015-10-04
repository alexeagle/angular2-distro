var test_lib_1 = require('angular2/test_lib');
var core_1 = require('angular2/core');
var lang_1 = require('angular2/src/core/facade/lang');
function main() {
    test_lib_1.describe("forwardRef", function () {
        test_lib_1.it('should wrap and unwrap the reference', function () {
            var ref = core_1.forwardRef(function () { return String; });
            test_lib_1.expect(ref instanceof lang_1.Type).toBe(true);
            test_lib_1.expect(core_1.resolveForwardRef(ref)).toBe(String);
        });
    });
}
exports.main = main;
//# sourceMappingURL=forward_ref_spec.js.map