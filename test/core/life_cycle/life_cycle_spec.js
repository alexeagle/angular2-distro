var test_lib_1 = require('angular2/test_lib');
var core_1 = require('angular2/core');
var spies_1 = require('../spies');
function main() {
    test_lib_1.describe("LifeCycle", function () {
        test_lib_1.it("should throw when reentering tick", function () {
            var cd = new spies_1.SpyChangeDetector();
            var lc = new core_1.LifeCycle(cd, false);
            cd.spy("detectChanges").andCallFake(function () { return lc.tick(); });
            test_lib_1.expect(function () { return lc.tick(); }).toThrowError("LifeCycle.tick is called recursively");
        });
    });
}
exports.main = main;
//# sourceMappingURL=life_cycle_spec.js.map