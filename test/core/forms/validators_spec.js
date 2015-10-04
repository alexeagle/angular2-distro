var test_lib_1 = require('angular2/test_lib');
var core_1 = require('angular2/core');
function main() {
    function validator(key, error) {
        return function (c) {
            var r = {};
            r[key] = error;
            return r;
        };
    }
    test_lib_1.describe("Validators", function () {
        test_lib_1.describe("required", function () {
            test_lib_1.it("should error on an empty string", function () { test_lib_1.expect(core_1.Validators.required(new core_1.Control(""))).toEqual({ "required": true }); });
            test_lib_1.it("should error on null", function () { test_lib_1.expect(core_1.Validators.required(new core_1.Control(null))).toEqual({ "required": true }); });
            test_lib_1.it("should not error on a non-empty string", function () { test_lib_1.expect(core_1.Validators.required(new core_1.Control("not empty"))).toEqual(null); });
        });
        test_lib_1.describe("compose", function () {
            test_lib_1.it("should return a null validator when given null", function () { test_lib_1.expect(core_1.Validators.compose(null)).toBe(core_1.Validators.nullValidator); });
            test_lib_1.it("should collect errors from all the validators", function () {
                var c = core_1.Validators.compose([validator("a", true), validator("b", true)]);
                test_lib_1.expect(c(new core_1.Control(""))).toEqual({ "a": true, "b": true });
            });
            test_lib_1.it("should run validators left to right", function () {
                var c = core_1.Validators.compose([validator("a", 1), validator("a", 2)]);
                test_lib_1.expect(c(new core_1.Control(""))).toEqual({ "a": 2 });
            });
            test_lib_1.it("should return null when no errors", function () {
                var c = core_1.Validators.compose([core_1.Validators.nullValidator, core_1.Validators.nullValidator]);
                test_lib_1.expect(c(new core_1.Control(""))).toEqual(null);
            });
        });
        test_lib_1.describe("controlGroupValidator", function () {
            test_lib_1.it("should collect errors from the child controls", function () {
                var one = new core_1.Control("one", validator("a", true));
                var two = new core_1.Control("one", validator("b", true));
                var g = new core_1.ControlGroup({ "one": one, "two": two });
                test_lib_1.expect(core_1.Validators.group(g)).toEqual({ "a": [one], "b": [two] });
            });
            test_lib_1.it("should not include controls that have no errors", function () {
                var one = new core_1.Control("one", validator("a", true));
                var two = new core_1.Control("two");
                var g = new core_1.ControlGroup({ "one": one, "two": two });
                test_lib_1.expect(core_1.Validators.group(g)).toEqual({ "a": [one] });
            });
            test_lib_1.it("should return null when no errors", function () {
                var g = new core_1.ControlGroup({ "one": new core_1.Control("one") });
                test_lib_1.expect(core_1.Validators.group(g)).toEqual(null);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=validators_spec.js.map