var test_lib_1 = require('angular2/test_lib');
var tools_1 = require('angular2/tools');
var spies_1 = require('./spies');
function main() {
    test_lib_1.describe('profiler', function () {
        test_lib_1.beforeEach(function () { tools_1.enableDebugTools((new spies_1.SpyComponentRef())); });
        test_lib_1.afterEach(function () { tools_1.disableDebugTools(); });
        test_lib_1.it('should time change detection', function () { spies_1.callNgProfilerTimeChangeDetection(); });
        test_lib_1.it('should time change detection with recording', function () { spies_1.callNgProfilerTimeChangeDetection({ 'record': true }); });
    });
}
exports.main = main;
//# sourceMappingURL=tools_spec.js.map