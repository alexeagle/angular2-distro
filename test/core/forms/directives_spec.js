var test_lib_1 = require('angular2/test_lib');
var spies_1 = require('../spies');
var core_1 = require('angular2/core');
var shared_1 = require('angular2/src/core/forms/directives/shared');
var DummyControlValueAccessor = (function () {
    function DummyControlValueAccessor() {
    }
    DummyControlValueAccessor.prototype.registerOnChange = function (fn) { };
    DummyControlValueAccessor.prototype.registerOnTouched = function (fn) { };
    DummyControlValueAccessor.prototype.writeValue = function (obj) { this.writtenValue = obj; };
    return DummyControlValueAccessor;
})();
function main() {
    test_lib_1.describe("Form Directives", function () {
        var defaultAccessor;
        test_lib_1.beforeEach(function () { defaultAccessor = new core_1.DefaultValueAccessor(null, null); });
        test_lib_1.describe("shared", function () {
            test_lib_1.describe("selectValueAccessor", function () {
                var dir;
                test_lib_1.beforeEach(function () { dir = new spies_1.SpyNgControl(); });
                test_lib_1.it("should throw when given an empty array", function () { test_lib_1.expect(function () { return shared_1.selectValueAccessor(dir, []); }).toThrowError(); });
                test_lib_1.it("should return the default value accessor when no other provided", function () { test_lib_1.expect(shared_1.selectValueAccessor(dir, [defaultAccessor])).toEqual(defaultAccessor); });
                test_lib_1.it("should return checkbox accessor when provided", function () {
                    var checkboxAccessor = new core_1.CheckboxControlValueAccessor(null, null);
                    test_lib_1.expect(shared_1.selectValueAccessor(dir, [defaultAccessor, checkboxAccessor]))
                        .toEqual(checkboxAccessor);
                });
                test_lib_1.it("should return select accessor when provided", function () {
                    var selectAccessor = new core_1.SelectControlValueAccessor(null, null, new core_1.QueryList());
                    test_lib_1.expect(shared_1.selectValueAccessor(dir, [defaultAccessor, selectAccessor]))
                        .toEqual(selectAccessor);
                });
                test_lib_1.it("should throw when more than one build-in accessor is provided", function () {
                    var checkboxAccessor = new core_1.CheckboxControlValueAccessor(null, null);
                    var selectAccessor = new core_1.SelectControlValueAccessor(null, null, new core_1.QueryList());
                    test_lib_1.expect(function () { return shared_1.selectValueAccessor(dir, [checkboxAccessor, selectAccessor]); }).toThrowError();
                });
                test_lib_1.it("should return custom accessor when provided", function () {
                    var customAccessor = new spies_1.SpyValueAccessor();
                    var checkboxAccessor = new core_1.CheckboxControlValueAccessor(null, null);
                    test_lib_1.expect(shared_1.selectValueAccessor(dir, [defaultAccessor, customAccessor, checkboxAccessor]))
                        .toEqual(customAccessor);
                });
                test_lib_1.it("should throw when more than one custom accessor is provided", function () {
                    var customAccessor = new spies_1.SpyValueAccessor();
                    test_lib_1.expect(function () { return shared_1.selectValueAccessor(dir, [customAccessor, customAccessor]); }).toThrowError();
                });
            });
        });
        test_lib_1.describe("NgFormModel", function () {
            var form;
            var formModel;
            var loginControlDir;
            test_lib_1.beforeEach(function () {
                form = new core_1.NgFormModel();
                formModel = new core_1.ControlGroup({ "login": new core_1.Control(null) });
                form.form = formModel;
                loginControlDir = new core_1.NgControlName(form, [], [defaultAccessor]);
                loginControlDir.name = "login";
                loginControlDir.valueAccessor = new DummyControlValueAccessor();
            });
            test_lib_1.it("should reexport control properties", function () {
                test_lib_1.expect(form.control).toBe(formModel);
                test_lib_1.expect(form.value).toBe(formModel.value);
                test_lib_1.expect(form.valid).toBe(formModel.valid);
                test_lib_1.expect(form.errors).toBe(formModel.errors);
                test_lib_1.expect(form.pristine).toBe(formModel.pristine);
                test_lib_1.expect(form.dirty).toBe(formModel.dirty);
                test_lib_1.expect(form.touched).toBe(formModel.touched);
                test_lib_1.expect(form.untouched).toBe(formModel.untouched);
            });
            test_lib_1.describe("addControl", function () {
                test_lib_1.it("should throw when no control found", function () {
                    var dir = new core_1.NgControlName(form, null, [defaultAccessor]);
                    dir.name = "invalidName";
                    test_lib_1.expect(function () { return form.addControl(dir); })
                        .toThrowError(new RegExp("Cannot find control 'invalidName'"));
                });
                test_lib_1.it("should throw when no value accessor", function () {
                    var dir = new core_1.NgControlName(form, null, null);
                    dir.name = "login";
                    test_lib_1.expect(function () { return form.addControl(dir); })
                        .toThrowError(new RegExp("No value accessor for 'login'"));
                });
                test_lib_1.it("should set up validator", function () {
                    loginControlDir.validators = [core_1.Validators.required];
                    test_lib_1.expect(formModel.find(["login"]).valid).toBe(true);
                    // this will add the required validator and recalculate the validity
                    form.addControl(loginControlDir);
                    test_lib_1.expect(formModel.find(["login"]).valid).toBe(false);
                });
                test_lib_1.it("should write value to the DOM", function () {
                    formModel.find(["login"]).updateValue("initValue");
                    form.addControl(loginControlDir);
                    test_lib_1.expect(loginControlDir.valueAccessor.writtenValue).toEqual("initValue");
                });
                test_lib_1.it("should add the directive to the list of directives included in the form", function () {
                    form.addControl(loginControlDir);
                    test_lib_1.expect(form.directives).toEqual([loginControlDir]);
                });
            });
            test_lib_1.describe("removeControl", function () {
                test_lib_1.it("should remove the directive to the list of directives included in the form", function () {
                    form.addControl(loginControlDir);
                    form.removeControl(loginControlDir);
                    test_lib_1.expect(form.directives).toEqual([]);
                });
            });
            test_lib_1.describe("onChanges", function () {
                test_lib_1.it("should update dom values of all the directives", function () {
                    form.addControl(loginControlDir);
                    formModel.find(["login"]).updateValue("new value");
                    form.onChanges(null);
                    test_lib_1.expect(loginControlDir.valueAccessor.writtenValue).toEqual("new value");
                });
            });
        });
        test_lib_1.describe("NgForm", function () {
            var form;
            var formModel;
            var loginControlDir;
            var personControlGroupDir;
            test_lib_1.beforeEach(function () {
                form = new core_1.NgForm();
                formModel = form.form;
                personControlGroupDir = new core_1.NgControlGroup(form);
                personControlGroupDir.name = "person";
                loginControlDir = new core_1.NgControlName(personControlGroupDir, null, [defaultAccessor]);
                loginControlDir.name = "login";
                loginControlDir.valueAccessor = new DummyControlValueAccessor();
            });
            test_lib_1.it("should reexport control properties", function () {
                test_lib_1.expect(form.control).toBe(formModel);
                test_lib_1.expect(form.value).toBe(formModel.value);
                test_lib_1.expect(form.valid).toBe(formModel.valid);
                test_lib_1.expect(form.errors).toBe(formModel.errors);
                test_lib_1.expect(form.pristine).toBe(formModel.pristine);
                test_lib_1.expect(form.dirty).toBe(formModel.dirty);
                test_lib_1.expect(form.touched).toBe(formModel.touched);
                test_lib_1.expect(form.untouched).toBe(formModel.untouched);
            });
            test_lib_1.describe("addControl & addControlGroup", function () {
                test_lib_1.it("should create a control with the given name", test_lib_1.fakeAsync(function () {
                    form.addControlGroup(personControlGroupDir);
                    form.addControl(loginControlDir);
                    test_lib_1.flushMicrotasks();
                    test_lib_1.expect(formModel.find(["person", "login"])).not.toBeNull;
                }));
                // should update the form's value and validity
            });
            test_lib_1.describe("removeControl & removeControlGroup", function () {
                test_lib_1.it("should remove control", test_lib_1.fakeAsync(function () {
                    form.addControlGroup(personControlGroupDir);
                    form.addControl(loginControlDir);
                    form.removeControlGroup(personControlGroupDir);
                    form.removeControl(loginControlDir);
                    test_lib_1.flushMicrotasks();
                    test_lib_1.expect(formModel.find(["person"])).toBeNull();
                    test_lib_1.expect(formModel.find(["person", "login"])).toBeNull();
                }));
                // should update the form's value and validity
            });
        });
        test_lib_1.describe("NgControlGroup", function () {
            var formModel;
            var controlGroupDir;
            test_lib_1.beforeEach(function () {
                formModel = new core_1.ControlGroup({ "login": new core_1.Control(null) });
                var parent = new core_1.NgFormModel();
                parent.form = new core_1.ControlGroup({ "group": formModel });
                controlGroupDir = new core_1.NgControlGroup(parent);
                controlGroupDir.name = "group";
            });
            test_lib_1.it("should reexport control properties", function () {
                test_lib_1.expect(controlGroupDir.control).toBe(formModel);
                test_lib_1.expect(controlGroupDir.value).toBe(formModel.value);
                test_lib_1.expect(controlGroupDir.valid).toBe(formModel.valid);
                test_lib_1.expect(controlGroupDir.errors).toBe(formModel.errors);
                test_lib_1.expect(controlGroupDir.pristine).toBe(formModel.pristine);
                test_lib_1.expect(controlGroupDir.dirty).toBe(formModel.dirty);
                test_lib_1.expect(controlGroupDir.touched).toBe(formModel.touched);
                test_lib_1.expect(controlGroupDir.untouched).toBe(formModel.untouched);
            });
        });
        test_lib_1.describe("NgFormControl", function () {
            var controlDir;
            var control;
            test_lib_1.beforeEach(function () {
                controlDir = new core_1.NgFormControl([], [defaultAccessor]);
                controlDir.valueAccessor = new DummyControlValueAccessor();
                control = new core_1.Control(null);
                controlDir.form = control;
            });
            test_lib_1.it("should reexport control properties", function () {
                test_lib_1.expect(controlDir.control).toBe(control);
                test_lib_1.expect(controlDir.value).toBe(control.value);
                test_lib_1.expect(controlDir.valid).toBe(control.valid);
                test_lib_1.expect(controlDir.errors).toBe(control.errors);
                test_lib_1.expect(controlDir.pristine).toBe(control.pristine);
                test_lib_1.expect(controlDir.dirty).toBe(control.dirty);
                test_lib_1.expect(controlDir.touched).toBe(control.touched);
                test_lib_1.expect(controlDir.untouched).toBe(control.untouched);
            });
            test_lib_1.it("should set up validator", function () {
                controlDir.validators = [core_1.Validators.required];
                test_lib_1.expect(control.valid).toBe(true);
                // this will add the required validator and recalculate the validity
                controlDir.onChanges({});
                test_lib_1.expect(control.valid).toBe(false);
            });
        });
        test_lib_1.describe("NgModel", function () {
            var ngModel;
            test_lib_1.beforeEach(function () {
                ngModel = new core_1.NgModel([], [defaultAccessor]);
                ngModel.valueAccessor = new DummyControlValueAccessor();
            });
            test_lib_1.it("should reexport control properties", function () {
                var control = ngModel.control;
                test_lib_1.expect(ngModel.control).toBe(control);
                test_lib_1.expect(ngModel.value).toBe(control.value);
                test_lib_1.expect(ngModel.valid).toBe(control.valid);
                test_lib_1.expect(ngModel.errors).toBe(control.errors);
                test_lib_1.expect(ngModel.pristine).toBe(control.pristine);
                test_lib_1.expect(ngModel.dirty).toBe(control.dirty);
                test_lib_1.expect(ngModel.touched).toBe(control.touched);
                test_lib_1.expect(ngModel.untouched).toBe(control.untouched);
            });
            test_lib_1.it("should set up validator", function () {
                ngModel.validators = [core_1.Validators.required];
                test_lib_1.expect(ngModel.control.valid).toBe(true);
                // this will add the required validator and recalculate the validity
                ngModel.onChanges({});
                test_lib_1.expect(ngModel.control.valid).toBe(false);
            });
        });
        test_lib_1.describe("NgControlName", function () {
            var formModel;
            var controlNameDir;
            test_lib_1.beforeEach(function () {
                formModel = new core_1.Control("name");
                var parent = new core_1.NgFormModel();
                parent.form = new core_1.ControlGroup({ "name": formModel });
                controlNameDir = new core_1.NgControlName(parent, [], [defaultAccessor]);
                controlNameDir.name = "name";
            });
            test_lib_1.it("should reexport control properties", function () {
                test_lib_1.expect(controlNameDir.control).toBe(formModel);
                test_lib_1.expect(controlNameDir.value).toBe(formModel.value);
                test_lib_1.expect(controlNameDir.valid).toBe(formModel.valid);
                test_lib_1.expect(controlNameDir.errors).toBe(formModel.errors);
                test_lib_1.expect(controlNameDir.pristine).toBe(formModel.pristine);
                test_lib_1.expect(controlNameDir.dirty).toBe(formModel.dirty);
                test_lib_1.expect(controlNameDir.touched).toBe(formModel.touched);
                test_lib_1.expect(controlNameDir.untouched).toBe(formModel.untouched);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=directives_spec.js.map