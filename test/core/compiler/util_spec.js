var test_lib_1 = require('angular2/test_lib');
var platform_1 = require('../../platform');
var util_1 = require('angular2/src/core/compiler/util');
function main() {
    test_lib_1.describe('util', function () {
        test_lib_1.describe('escapeSingleQuoteString', function () {
            test_lib_1.it('should escape single quotes', function () { test_lib_1.expect(util_1.escapeSingleQuoteString("'")).toEqual("'\\''"); });
            test_lib_1.it('should escape backslash', function () { test_lib_1.expect(util_1.escapeSingleQuoteString('\\')).toEqual("'\\\\'"); });
            test_lib_1.it('should escape newlines', function () { test_lib_1.expect(util_1.escapeSingleQuoteString('\n')).toEqual("'\\n'"); });
            if (platform_1.IS_DART) {
                test_lib_1.it('should escape $', function () { test_lib_1.expect(util_1.escapeSingleQuoteString('$')).toEqual("'\\$'"); });
            }
            else {
                test_lib_1.it('should not escape $', function () { test_lib_1.expect(util_1.escapeSingleQuoteString('$')).toEqual("'$'"); });
            }
        });
        test_lib_1.describe('escapeDoubleQuoteString', function () {
            test_lib_1.it('should escape double quotes', function () { test_lib_1.expect(util_1.escapeDoubleQuoteString("\"")).toEqual("\"\\\"\""); });
            test_lib_1.it('should escape backslash', function () { test_lib_1.expect(util_1.escapeDoubleQuoteString('\\')).toEqual("\"\\\\\""); });
            test_lib_1.it('should escape newlines', function () { test_lib_1.expect(util_1.escapeDoubleQuoteString('\n')).toEqual("\"\\n\""); });
            if (platform_1.IS_DART) {
                test_lib_1.it('should escape $', function () { test_lib_1.expect(util_1.escapeDoubleQuoteString('$')).toEqual("\"\\$\""); });
            }
            else {
                test_lib_1.it('should not escape $', function () { test_lib_1.expect(util_1.escapeDoubleQuoteString('$')).toEqual("\"$\""); });
            }
        });
    });
}
exports.main = main;
//# sourceMappingURL=util_spec.js.map