var test_lib_1 = require('angular2/test_lib');
var spies_1 = require('../spies');
var life_cycle_1 = require("angular2/src/core/life_cycle/life_cycle");
function main() {
    test_lib_1.describe("LifeCycle", function () {
        test_lib_1.it("should throw when reentering tick", function () {
            var cd = new spies_1.SpyChangeDetector();
            var lc = new life_cycle_1.LifeCycle_(cd, false);
            cd.spy("detectChanges").andCallFake(function () { return lc.tick(); });
            test_lib_1.expect(function () { return lc.tick(); }).toThrowError("LifeCycle.tick is called recursively");
        });
    });
}
exports.main = main;
//# sourceMappingURL=life_cycle_spec.js.map