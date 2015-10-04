var test_lib_1 = require('angular2/test_lib');
var core_1 = require('angular2/core');
var async_1 = require('angular2/src/core/facade/async');
function main() {
    test_lib_1.describe("Form Model", function () {
        test_lib_1.describe("Control", function () {
            test_lib_1.it("should default the value to null", function () {
                var c = new core_1.Control();
                test_lib_1.expect(c.value).toBe(null);
                test_lib_1.expect(c.validator).toBe(core_1.Validators.nullValidator);
            });
            test_lib_1.describe("validator", function () {
                test_lib_1.it("should run validator with the initial value", function () {
                    var c = new core_1.Control("value", core_1.Validators.required);
                    test_lib_1.expect(c.valid).toEqual(true);
                });
                test_lib_1.it("should rerun the validator when the value changes", function () {
                    var c = new core_1.Control("value", core_1.Validators.required);
                    c.updateValue(null);
                    test_lib_1.expect(c.valid).toEqual(false);
                });
                test_lib_1.it("should return errors", function () {
                    var c = new core_1.Control(null, core_1.Validators.required);
                    test_lib_1.expect(c.errors).toEqual({ "required": true });
                });
            });
            test_lib_1.describe("dirty", function () {
                test_lib_1.it("should be false after creating a control", function () {
                    var c = new core_1.Control("value");
                    test_lib_1.expect(c.dirty).toEqual(false);
                });
                test_lib_1.it("should be true after changing the value of the control", function () {
                    var c = new core_1.Control("value");
                    c.markAsDirty();
                    test_lib_1.expect(c.dirty).toEqual(true);
                });
            });
            test_lib_1.describe("updateValue", function () {
                var g, c;
                test_lib_1.beforeEach(function () {
                    c = new core_1.Control("oldValue");
                    g = new core_1.ControlGroup({ "one": c });
                });
                test_lib_1.it("should update the value of the control", function () {
                    c.updateValue("newValue");
                    test_lib_1.expect(c.value).toEqual("newValue");
                });
                test_lib_1.it("should invoke onChanges if it is present", function () {
                    var onChanges;
                    c.registerOnChange(function (v) { return onChanges = ["invoked", v]; });
                    c.updateValue("newValue");
                    test_lib_1.expect(onChanges).toEqual(["invoked", "newValue"]);
                });
                test_lib_1.it("should not invoke on change when explicitly specified", function () {
                    var onChange = null;
                    c.registerOnChange(function (v) { return onChange = ["invoked", v]; });
                    c.updateValue("newValue", { emitModelToViewChange: false });
                    test_lib_1.expect(onChange).toBeNull();
                });
                test_lib_1.it("should update the parent", function () {
                    c.updateValue("newValue");
                    test_lib_1.expect(g.value).toEqual({ "one": "newValue" });
                });
                test_lib_1.it("should not update the parent when explicitly specified", function () {
                    c.updateValue("newValue", { onlySelf: true });
                    test_lib_1.expect(g.value).toEqual({ "one": "oldValue" });
                });
                test_lib_1.it("should fire an event", test_lib_1.fakeAsync(function () {
                    async_1.ObservableWrapper.subscribe(c.valueChanges, function (value) { test_lib_1.expect(value).toEqual("newValue"); });
                    c.updateValue("newValue");
                    test_lib_1.tick();
                }));
                test_lib_1.it("should not fire an event when explicitly specified", test_lib_1.fakeAsync(function () {
                    async_1.ObservableWrapper.subscribe(c.valueChanges, function (value) { throw "Should not happen"; });
                    c.updateValue("newValue", { emitEvent: false });
                    test_lib_1.tick();
                }));
            });
            test_lib_1.describe("valueChanges", function () {
                var c;
                test_lib_1.beforeEach(function () { c = new core_1.Control("old"); });
                test_lib_1.it("should fire an event after the value has been updated", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(c.valueChanges, function (value) {
                        test_lib_1.expect(c.value).toEqual('new');
                        test_lib_1.expect(value).toEqual('new');
                        async.done();
                    });
                    c.updateValue("new");
                }));
                test_lib_1.it("should return a cold observable", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    c.updateValue("will be ignored");
                    async_1.ObservableWrapper.subscribe(c.valueChanges, function (value) {
                        test_lib_1.expect(value).toEqual('new');
                        async.done();
                    });
                    c.updateValue("new");
                }));
            });
        });
        test_lib_1.describe("ControlGroup", function () {
            test_lib_1.describe("value", function () {
                test_lib_1.it("should be the reduced value of the child controls", function () {
                    var g = new core_1.ControlGroup({ "one": new core_1.Control("111"), "two": new core_1.Control("222") });
                    test_lib_1.expect(g.value).toEqual({ "one": "111", "two": "222" });
                });
                test_lib_1.it("should be empty when there are no child controls", function () {
                    var g = new core_1.ControlGroup({});
                    test_lib_1.expect(g.value).toEqual({});
                });
                test_lib_1.it("should support nested groups", function () {
                    var g = new core_1.ControlGroup({ "one": new core_1.Control("111"), "nested": new core_1.ControlGroup({ "two": new core_1.Control("222") }) });
                    test_lib_1.expect(g.value).toEqual({ "one": "111", "nested": { "two": "222" } });
                    (g.controls["nested"].find("two")).updateValue("333");
                    test_lib_1.expect(g.value).toEqual({ "one": "111", "nested": { "two": "333" } });
                });
            });
            test_lib_1.describe("validator", function () {
                test_lib_1.it("should run the validator with the initial value (valid)", function () {
                    var g = new core_1.ControlGroup({ "one": new core_1.Control('value', core_1.Validators.required) });
                    test_lib_1.expect(g.valid).toEqual(true);
                    test_lib_1.expect(g.errors).toEqual(null);
                });
                test_lib_1.it("should run the validator with the initial value (invalid)", function () {
                    var one = new core_1.Control(null, core_1.Validators.required);
                    var g = new core_1.ControlGroup({ "one": one });
                    test_lib_1.expect(g.valid).toEqual(false);
                    test_lib_1.expect(g.errors).toEqual({ "required": [one] });
                });
                test_lib_1.it("should run the validator with the value changes", function () {
                    var c = new core_1.Control(null, core_1.Validators.required);
                    var g = new core_1.ControlGroup({ "one": c });
                    c.updateValue("some value");
                    test_lib_1.expect(g.valid).toEqual(true);
                    test_lib_1.expect(g.errors).toEqual(null);
                });
            });
            test_lib_1.describe("dirty", function () {
                var c, g;
                test_lib_1.beforeEach(function () {
                    c = new core_1.Control('value');
                    g = new core_1.ControlGroup({ "one": c });
                });
                test_lib_1.it("should be false after creating a control", function () { test_lib_1.expect(g.dirty).toEqual(false); });
                test_lib_1.it("should be false after changing the value of the control", function () {
                    c.markAsDirty();
                    test_lib_1.expect(g.dirty).toEqual(true);
                });
            });
            test_lib_1.describe("optional components", function () {
                test_lib_1.describe("contains", function () {
                    var group;
                    test_lib_1.beforeEach(function () {
                        group = new core_1.ControlGroup({
                            "required": new core_1.Control("requiredValue"),
                            "optional": new core_1.Control("optionalValue")
                        }, { "optional": false });
                    });
                    // rename contains into has
                    test_lib_1.it("should return false when the component is not included", function () { test_lib_1.expect(group.contains("optional")).toEqual(false); });
                    test_lib_1.it("should return false when there is no component with the given name", function () { test_lib_1.expect(group.contains("something else")).toEqual(false); });
                    test_lib_1.it("should return true when the component is included", function () {
                        test_lib_1.expect(group.contains("required")).toEqual(true);
                        group.include("optional");
                        test_lib_1.expect(group.contains("optional")).toEqual(true);
                    });
                });
                test_lib_1.it("should not include an inactive component into the group value", function () {
                    var group = new core_1.ControlGroup({ "required": new core_1.Control("requiredValue"), "optional": new core_1.Control("optionalValue") }, { "optional": false });
                    test_lib_1.expect(group.value).toEqual({ "required": "requiredValue" });
                    group.include("optional");
                    test_lib_1.expect(group.value).toEqual({ "required": "requiredValue", "optional": "optionalValue" });
                });
                test_lib_1.it("should not run Validators on an inactive component", function () {
                    var group = new core_1.ControlGroup({
                        "required": new core_1.Control("requiredValue", core_1.Validators.required),
                        "optional": new core_1.Control("", core_1.Validators.required)
                    }, { "optional": false });
                    test_lib_1.expect(group.valid).toEqual(true);
                    group.include("optional");
                    test_lib_1.expect(group.valid).toEqual(false);
                });
                test_lib_1.describe("valueChanges", function () {
                    var g, c1, c2;
                    test_lib_1.beforeEach(function () {
                        c1 = new core_1.Control("old1");
                        c2 = new core_1.Control("old2");
                        g = new core_1.ControlGroup({ "one": c1, "two": c2 }, { "two": true });
                    });
                    test_lib_1.it("should fire an event after the value has been updated", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                        async_1.ObservableWrapper.subscribe(g.valueChanges, function (value) {
                            test_lib_1.expect(g.value).toEqual({ 'one': 'new1', 'two': 'old2' });
                            test_lib_1.expect(value).toEqual({ 'one': 'new1', 'two': 'old2' });
                            async.done();
                        });
                        c1.updateValue("new1");
                    }));
                    test_lib_1.it("should fire an event after the control's observable fired an event", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                        var controlCallbackIsCalled = false;
                        async_1.ObservableWrapper.subscribe(c1.valueChanges, function (value) { controlCallbackIsCalled = true; });
                        async_1.ObservableWrapper.subscribe(g.valueChanges, function (value) {
                            test_lib_1.expect(controlCallbackIsCalled).toBe(true);
                            async.done();
                        });
                        c1.updateValue("new1");
                    }));
                    test_lib_1.it("should fire an event when a control is excluded", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                        async_1.ObservableWrapper.subscribe(g.valueChanges, function (value) {
                            test_lib_1.expect(value).toEqual({ 'one': 'old1' });
                            async.done();
                        });
                        g.exclude("two");
                    }));
                    test_lib_1.it("should fire an event when a control is included", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                        g.exclude("two");
                        async_1.ObservableWrapper.subscribe(g.valueChanges, function (value) {
                            test_lib_1.expect(value).toEqual({ 'one': 'old1', 'two': 'old2' });
                            async.done();
                        });
                        g.include("two");
                    }));
                    test_lib_1.it("should fire an event every time a control is updated", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                        var loggedValues = [];
                        async_1.ObservableWrapper.subscribe(g.valueChanges, function (value) {
                            loggedValues.push(value);
                            if (loggedValues.length == 2) {
                                test_lib_1.expect(loggedValues)
                                    .toEqual([{ "one": "new1", "two": "old2" }, { "one": "new1", "two": "new2" }]);
                                async.done();
                            }
                        });
                        c1.updateValue("new1");
                        c2.updateValue("new2");
                    }));
                    test_lib_1.xit("should not fire an event when an excluded control is updated", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                        // hard to test without hacking zones
                    }));
                });
                test_lib_1.describe("getError", function () {
                    test_lib_1.it("should return the error when it is present", function () {
                        var c = new core_1.Control("", core_1.Validators.required);
                        var g = new core_1.ControlGroup({ "one": c });
                        test_lib_1.expect(c.getError("required")).toEqual(true);
                        test_lib_1.expect(g.getError("required", ["one"])).toEqual(true);
                    });
                    test_lib_1.it("should return null otherwise", function () {
                        var c = new core_1.Control("not empty", core_1.Validators.required);
                        var g = new core_1.ControlGroup({ "one": c });
                        test_lib_1.expect(c.getError("invalid")).toEqual(null);
                        test_lib_1.expect(g.getError("required", ["one"])).toEqual(null);
                        test_lib_1.expect(g.getError("required", ["invalid"])).toEqual(null);
                    });
                });
            });
        });
        test_lib_1.describe("ControlArray", function () {
            test_lib_1.describe("adding/removing", function () {
                var a;
                var c1, c2, c3;
                test_lib_1.beforeEach(function () {
                    a = new core_1.ControlArray([]);
                    c1 = new core_1.Control(1);
                    c2 = new core_1.Control(2);
                    c3 = new core_1.Control(3);
                });
                test_lib_1.it("should support pushing", function () {
                    a.push(c1);
                    test_lib_1.expect(a.length).toEqual(1);
                    test_lib_1.expect(a.controls).toEqual([c1]);
                });
                test_lib_1.it("should support removing", function () {
                    a.push(c1);
                    a.push(c2);
                    a.push(c3);
                    a.removeAt(1);
                    test_lib_1.expect(a.controls).toEqual([c1, c3]);
                });
                test_lib_1.it("should support inserting", function () {
                    a.push(c1);
                    a.push(c3);
                    a.insert(1, c2);
                    test_lib_1.expect(a.controls).toEqual([c1, c2, c3]);
                });
            });
            test_lib_1.describe("value", function () {
                test_lib_1.it("should be the reduced value of the child controls", function () {
                    var a = new core_1.ControlArray([new core_1.Control(1), new core_1.Control(2)]);
                    test_lib_1.expect(a.value).toEqual([1, 2]);
                });
                test_lib_1.it("should be an empty array when there are no child controls", function () {
                    var a = new core_1.ControlArray([]);
                    test_lib_1.expect(a.value).toEqual([]);
                });
            });
            test_lib_1.describe("validator", function () {
                test_lib_1.it("should run the validator with the initial value (valid)", function () {
                    var a = new core_1.ControlArray([new core_1.Control(1, core_1.Validators.required), new core_1.Control(2, core_1.Validators.required)]);
                    test_lib_1.expect(a.valid).toBe(true);
                    test_lib_1.expect(a.errors).toBe(null);
                });
                test_lib_1.it("should run the validator with the initial value (invalid)", function () {
                    var a = new core_1.ControlArray([
                        new core_1.Control(1, core_1.Validators.required),
                        new core_1.Control(null, core_1.Validators.required),
                        new core_1.Control(2, core_1.Validators.required)
                    ]);
                    test_lib_1.expect(a.valid).toBe(false);
                    test_lib_1.expect(a.errors).toEqual({ "required": [a.controls[1]] });
                });
                test_lib_1.it("should run the validator when the value changes", function () {
                    var a = new core_1.ControlArray([]);
                    var c = new core_1.Control(null, core_1.Validators.required);
                    a.push(c);
                    test_lib_1.expect(a.valid).toBe(false);
                    c.updateValue("some value");
                    test_lib_1.expect(a.valid).toBe(true);
                    test_lib_1.expect(a.errors).toBe(null);
                });
            });
            test_lib_1.describe("dirty", function () {
                var c;
                var a;
                test_lib_1.beforeEach(function () {
                    c = new core_1.Control('value');
                    a = new core_1.ControlArray([c]);
                });
                test_lib_1.it("should be false after creating a control", function () { test_lib_1.expect(a.dirty).toEqual(false); });
                test_lib_1.it("should be false after changing the value of the control", function () {
                    c.markAsDirty();
                    test_lib_1.expect(a.dirty).toEqual(true);
                });
            });
            test_lib_1.describe("valueChanges", function () {
                var a;
                var c1, c2;
                test_lib_1.beforeEach(function () {
                    c1 = new core_1.Control("old1");
                    c2 = new core_1.Control("old2");
                    a = new core_1.ControlArray([c1, c2]);
                });
                test_lib_1.it("should fire an event after the value has been updated", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(a.valueChanges, function (value) {
                        test_lib_1.expect(a.value).toEqual(['new1', 'old2']);
                        test_lib_1.expect(value).toEqual(['new1', 'old2']);
                        async.done();
                    });
                    c1.updateValue("new1");
                }));
                test_lib_1.it("should fire an event after the control's observable fired an event", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var controlCallbackIsCalled = false;
                    async_1.ObservableWrapper.subscribe(c1.valueChanges, function (value) { controlCallbackIsCalled = true; });
                    async_1.ObservableWrapper.subscribe(a.valueChanges, function (value) {
                        test_lib_1.expect(controlCallbackIsCalled).toBe(true);
                        async.done();
                    });
                    c1.updateValue("new1");
                }));
                test_lib_1.it("should fire an event when a control is removed", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(a.valueChanges, function (value) {
                        test_lib_1.expect(value).toEqual(['old1']);
                        async.done();
                    });
                    a.removeAt(1);
                }));
                test_lib_1.it("should fire an event when a control is added", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    a.removeAt(1);
                    async_1.ObservableWrapper.subscribe(a.valueChanges, function (value) {
                        test_lib_1.expect(value).toEqual(['old1', 'old2']);
                        async.done();
                    });
                    a.push(c2);
                }));
            });
        });
        test_lib_1.describe("find", function () {
            test_lib_1.it("should return null when path is null", function () {
                var g = new core_1.ControlGroup({});
                test_lib_1.expect(g.find(null)).toEqual(null);
            });
            test_lib_1.it("should return null when path is empty", function () {
                var g = new core_1.ControlGroup({});
                test_lib_1.expect(g.find([])).toEqual(null);
            });
            test_lib_1.it("should return null when path is invalid", function () {
                var g = new core_1.ControlGroup({});
                test_lib_1.expect(g.find(["one", "two"])).toEqual(null);
            });
            test_lib_1.it("should return a child of a control group", function () {
                var g = new core_1.ControlGroup({ "one": new core_1.Control("111"), "nested": new core_1.ControlGroup({ "two": new core_1.Control("222") }) });
                test_lib_1.expect(g.find(["nested", "two"]).value).toEqual("222");
                test_lib_1.expect(g.find(["one"]).value).toEqual("111");
                test_lib_1.expect(g.find("nested/two").value).toEqual("222");
                test_lib_1.expect(g.find("one").value).toEqual("111");
            });
            test_lib_1.it("should return an element of an array", function () {
                var g = new core_1.ControlGroup({ "array": new core_1.ControlArray([new core_1.Control("111")]) });
                test_lib_1.expect(g.find(["array", 0]).value).toEqual("111");
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=model_spec.js.map