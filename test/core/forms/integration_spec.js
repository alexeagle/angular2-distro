var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var test_lib_1 = require('angular2/test_lib');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
var core_1 = require('angular2/core');
var debug_1 = require('angular2/src/core/debug');
var collection_1 = require('angular2/src/core/facade/collection');
function main() {
    test_lib_1.describe("integration tests", function () {
        test_lib_1.it("should initialize DOM elements with the given form object", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var t = "<div [ng-form-model]=\"form\">\n                <input type=\"text\" ng-control=\"login\">\n               </div>";
            tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                rootTC.debugElement.componentInstance.form =
                    new core_1.ControlGroup({ "login": new core_1.Control("loginValue") });
                rootTC.detectChanges();
                var input = rootTC.debugElement.query(debug_1.By.css("input"));
                test_lib_1.expect(input.nativeElement.value).toEqual("loginValue");
                async.done();
            });
        }));
        test_lib_1.it("should update the control group values on DOM change", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var form = new core_1.ControlGroup({ "login": new core_1.Control("oldValue") });
            var t = "<div [ng-form-model]=\"form\">\n                <input type=\"text\" ng-control=\"login\">\n              </div>";
            tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                rootTC.debugElement.componentInstance.form = form;
                rootTC.detectChanges();
                var input = rootTC.debugElement.query(debug_1.By.css("input"));
                input.nativeElement.value = "updatedValue";
                test_lib_1.dispatchEvent(input.nativeElement, "change");
                test_lib_1.expect(form.value).toEqual({ "login": "updatedValue" });
                async.done();
            });
        }));
        test_lib_1.it("should emit ng-submit event on submit", test_lib_1.inject([test_lib_1.TestComponentBuilder], test_lib_1.fakeAsync(function (tcb) {
            var t = "<div><form [ng-form-model]=\"form\" (ng-submit)=\"name='updated'\"></form><span>{{name}}</span></div>";
            var rootTC;
            tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (root) { rootTC = root; });
            test_lib_1.tick();
            rootTC.debugElement.componentInstance.form = new core_1.ControlGroup({});
            rootTC.debugElement.componentInstance.name = 'old';
            test_lib_1.tick();
            var form = rootTC.debugElement.query(debug_1.By.css("form"));
            test_lib_1.dispatchEvent(form.nativeElement, "submit");
            test_lib_1.tick();
            test_lib_1.expect(rootTC.debugElement.componentInstance.name).toEqual('updated');
        })));
        test_lib_1.it("should work with single controls", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var control = new core_1.Control("loginValue");
            var t = "<div><input type=\"text\" [ng-form-control]=\"form\"></div>";
            tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                rootTC.debugElement.componentInstance.form = control;
                rootTC.detectChanges();
                var input = rootTC.debugElement.query(debug_1.By.css("input"));
                test_lib_1.expect(input.nativeElement.value).toEqual("loginValue");
                input.nativeElement.value = "updatedValue";
                test_lib_1.dispatchEvent(input.nativeElement, "change");
                test_lib_1.expect(control.value).toEqual("updatedValue");
                async.done();
            });
        }));
        test_lib_1.it("should update DOM elements when rebinding the control group", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var t = "<div [ng-form-model]=\"form\">\n                <input type=\"text\" ng-control=\"login\">\n               </div>";
            tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                rootTC.debugElement.componentInstance.form =
                    new core_1.ControlGroup({ "login": new core_1.Control("oldValue") });
                rootTC.detectChanges();
                rootTC.debugElement.componentInstance.form =
                    new core_1.ControlGroup({ "login": new core_1.Control("newValue") });
                rootTC.detectChanges();
                var input = rootTC.debugElement.query(debug_1.By.css("input"));
                test_lib_1.expect(input.nativeElement.value).toEqual("newValue");
                async.done();
            });
        }));
        test_lib_1.it("should update DOM elements when updating the value of a control", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var login = new core_1.Control("oldValue");
            var form = new core_1.ControlGroup({ "login": login });
            var t = "<div [ng-form-model]=\"form\">\n                <input type=\"text\" ng-control=\"login\">\n               </div>";
            tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                rootTC.debugElement.componentInstance.form = form;
                rootTC.detectChanges();
                login.updateValue("newValue");
                rootTC.detectChanges();
                var input = rootTC.debugElement.query(debug_1.By.css("input"));
                test_lib_1.expect(input.nativeElement.value).toEqual("newValue");
                async.done();
            });
        }));
        test_lib_1.it("should mark controls as touched after interacting with the DOM control", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            var login = new core_1.Control("oldValue");
            var form = new core_1.ControlGroup({ "login": login });
            var t = "<div [ng-form-model]=\"form\">\n                <input type=\"text\" ng-control=\"login\">\n               </div>";
            tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                rootTC.debugElement.componentInstance.form = form;
                rootTC.detectChanges();
                var loginEl = rootTC.debugElement.query(debug_1.By.css("input"));
                test_lib_1.expect(login.touched).toBe(false);
                test_lib_1.dispatchEvent(loginEl.nativeElement, "blur");
                test_lib_1.expect(login.touched).toBe(true);
                async.done();
            });
        }));
        test_lib_1.describe("different control types", function () {
            test_lib_1.it("should support <input type=text>", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div [ng-form-model]=\"form\">\n                  <input type=\"text\" ng-control=\"text\">\n                </div>";
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                    rootTC.debugElement.componentInstance.form =
                        new core_1.ControlGroup({ "text": new core_1.Control("old") });
                    rootTC.detectChanges();
                    var input = rootTC.debugElement.query(debug_1.By.css("input"));
                    test_lib_1.expect(input.nativeElement.value).toEqual("old");
                    input.nativeElement.value = "new";
                    test_lib_1.dispatchEvent(input.nativeElement, "input");
                    test_lib_1.expect(rootTC.debugElement.componentInstance.form.value).toEqual({ "text": "new" });
                    async.done();
                });
            }));
            test_lib_1.it("should support <input> without type", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div [ng-form-model]=\"form\">\n                  <input ng-control=\"text\">\n                </div>";
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                    rootTC.debugElement.componentInstance.form =
                        new core_1.ControlGroup({ "text": new core_1.Control("old") });
                    rootTC.detectChanges();
                    var input = rootTC.debugElement.query(debug_1.By.css("input"));
                    test_lib_1.expect(input.nativeElement.value).toEqual("old");
                    input.nativeElement.value = "new";
                    test_lib_1.dispatchEvent(input.nativeElement, "input");
                    test_lib_1.expect(rootTC.debugElement.componentInstance.form.value).toEqual({ "text": "new" });
                    async.done();
                });
            }));
            test_lib_1.it("should support <textarea>", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div [ng-form-model]=\"form\">\n                  <textarea ng-control=\"text\"></textarea>\n                </div>";
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                    rootTC.debugElement.componentInstance.form =
                        new core_1.ControlGroup({ "text": new core_1.Control('old') });
                    rootTC.detectChanges();
                    var textarea = rootTC.debugElement.query(debug_1.By.css("textarea"));
                    test_lib_1.expect(textarea.nativeElement.value).toEqual("old");
                    textarea.nativeElement.value = "new";
                    test_lib_1.dispatchEvent(textarea.nativeElement, "input");
                    test_lib_1.expect(rootTC.debugElement.componentInstance.form.value).toEqual({ "text": 'new' });
                    async.done();
                });
            }));
            test_lib_1.it("should support <type=checkbox>", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div [ng-form-model]=\"form\">\n                  <input type=\"checkbox\" ng-control=\"checkbox\">\n                </div>";
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                    rootTC.debugElement.componentInstance.form =
                        new core_1.ControlGroup({ "checkbox": new core_1.Control(true) });
                    rootTC.detectChanges();
                    var input = rootTC.debugElement.query(debug_1.By.css("input"));
                    test_lib_1.expect(input.nativeElement.checked).toBe(true);
                    input.nativeElement.checked = false;
                    test_lib_1.dispatchEvent(input.nativeElement, "change");
                    test_lib_1.expect(rootTC.debugElement.componentInstance.form.value).toEqual({ "checkbox": false });
                    async.done();
                });
            }));
            test_lib_1.it("should support <select>", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div [ng-form-model]=\"form\">\n                    <select ng-control=\"city\">\n                      <option value=\"SF\"></option>\n                      <option value=\"NYC\"></option>\n                    </select>\n                  </div>";
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                    rootTC.debugElement.componentInstance.form =
                        new core_1.ControlGroup({ "city": new core_1.Control("SF") });
                    rootTC.detectChanges();
                    var select = rootTC.debugElement.query(debug_1.By.css("select"));
                    var sfOption = rootTC.debugElement.query(debug_1.By.css("option"));
                    test_lib_1.expect(select.nativeElement.value).toEqual('SF');
                    test_lib_1.expect(sfOption.nativeElement.selected).toBe(true);
                    select.nativeElement.value = 'NYC';
                    test_lib_1.dispatchEvent(select.nativeElement, "change");
                    test_lib_1.expect(rootTC.debugElement.componentInstance.form.value).toEqual({ "city": 'NYC' });
                    test_lib_1.expect(sfOption.nativeElement.selected).toBe(false);
                    async.done();
                });
            }));
            test_lib_1.it("should support <select> with a dynamic list of options", test_lib_1.inject([test_lib_1.TestComponentBuilder], test_lib_1.fakeAsync(function (tcb) {
                var t = "<div [ng-form-model]=\"form\">\n                      <select ng-control=\"city\">\n                        <option *ng-for=\"#c of data\" [value]=\"c\"></option>\n                      </select>\n                  </div>";
                var rootTC;
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rtc) { return rootTC = rtc; });
                test_lib_1.tick();
                rootTC.debugElement.componentInstance.form =
                    new core_1.ControlGroup({ "city": new core_1.Control("NYC") });
                rootTC.debugElement.componentInstance.data = ['SF', 'NYC'];
                rootTC.detectChanges();
                test_lib_1.tick();
                var select = rootTC.debugElement.query(debug_1.By.css('select'));
                test_lib_1.expect(select.nativeElement.value).toEqual('NYC');
            })));
            test_lib_1.it("should support custom value accessors", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div [ng-form-model]=\"form\">\n                  <input type=\"text\" ng-control=\"name\" wrapped-value>\n                </div>";
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                    rootTC.debugElement.componentInstance.form =
                        new core_1.ControlGroup({ "name": new core_1.Control("aa") });
                    rootTC.detectChanges();
                    var input = rootTC.debugElement.query(debug_1.By.css("input"));
                    test_lib_1.expect(input.nativeElement.value).toEqual("!aa!");
                    input.nativeElement.value = "!bb!";
                    test_lib_1.dispatchEvent(input.nativeElement, "change");
                    test_lib_1.expect(rootTC.debugElement.componentInstance.form.value).toEqual({ "name": "bb" });
                    async.done();
                });
            }));
        });
        test_lib_1.describe("validations", function () {
            test_lib_1.it("should use validators defined in html", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var form = new core_1.ControlGroup({ "login": new core_1.Control("aa") });
                var t = "<div [ng-form-model]=\"form\">\n                  <input type=\"text\" ng-control=\"login\" required>\n                 </div>";
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                    rootTC.debugElement.componentInstance.form = form;
                    rootTC.detectChanges();
                    test_lib_1.expect(form.valid).toEqual(true);
                    var input = rootTC.debugElement.query(debug_1.By.css("input"));
                    input.nativeElement.value = "";
                    test_lib_1.dispatchEvent(input.nativeElement, "change");
                    test_lib_1.expect(form.valid).toEqual(false);
                    async.done();
                });
            }));
            test_lib_1.it("should use validators defined in the model", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var form = new core_1.ControlGroup({ "login": new core_1.Control("aa", core_1.Validators.required) });
                var t = "<div [ng-form-model]=\"form\">\n                  <input type=\"text\" ng-control=\"login\">\n                 </div>";
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                    rootTC.debugElement.componentInstance.form = form;
                    rootTC.detectChanges();
                    test_lib_1.expect(form.valid).toEqual(true);
                    var input = rootTC.debugElement.query(debug_1.By.css("input"));
                    input.nativeElement.value = "";
                    test_lib_1.dispatchEvent(input.nativeElement, "change");
                    test_lib_1.expect(form.valid).toEqual(false);
                    async.done();
                });
            }));
        });
        test_lib_1.describe("nested forms", function () {
            test_lib_1.it("should init DOM with the given form object", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var form = new core_1.ControlGroup({ "nested": new core_1.ControlGroup({ "login": new core_1.Control("value") }) });
                var t = "<div [ng-form-model]=\"form\">\n                  <div ng-control-group=\"nested\">\n                    <input type=\"text\" ng-control=\"login\">\n                  </div>\n              </div>";
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                    rootTC.debugElement.componentInstance.form = form;
                    rootTC.detectChanges();
                    var input = rootTC.debugElement.query(debug_1.By.css("input"));
                    test_lib_1.expect(input.nativeElement.value).toEqual("value");
                    async.done();
                });
            }));
            test_lib_1.it("should update the control group values on DOM change", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var form = new core_1.ControlGroup({ "nested": new core_1.ControlGroup({ "login": new core_1.Control("value") }) });
                var t = "<div [ng-form-model]=\"form\">\n                    <div ng-control-group=\"nested\">\n                      <input type=\"text\" ng-control=\"login\">\n                    </div>\n                </div>";
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                    rootTC.debugElement.componentInstance.form = form;
                    rootTC.detectChanges();
                    var input = rootTC.debugElement.query(debug_1.By.css("input"));
                    input.nativeElement.value = "updatedValue";
                    test_lib_1.dispatchEvent(input.nativeElement, "change");
                    test_lib_1.expect(form.value).toEqual({ "nested": { "login": "updatedValue" } });
                    async.done();
                });
            }));
        });
        test_lib_1.it("should support ng-model for complex forms", test_lib_1.inject([test_lib_1.TestComponentBuilder], test_lib_1.fakeAsync(function (tcb) {
            var form = new core_1.ControlGroup({ "name": new core_1.Control("") });
            var t = "<div [ng-form-model]=\"form\"><input type=\"text\" ng-control=\"name\" [(ng-model)]=\"name\"></div>";
            var rootTC;
            tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (root) { rootTC = root; });
            test_lib_1.tick();
            rootTC.debugElement.componentInstance.name = 'oldValue';
            rootTC.debugElement.componentInstance.form = form;
            rootTC.detectChanges();
            var input = rootTC.debugElement.query(debug_1.By.css("input")).nativeElement;
            test_lib_1.expect(input.value).toEqual("oldValue");
            input.value = "updatedValue";
            test_lib_1.dispatchEvent(input, "change");
            test_lib_1.tick();
            test_lib_1.expect(rootTC.debugElement.componentInstance.name).toEqual("updatedValue");
        })));
        test_lib_1.it("should support ng-model for single fields", test_lib_1.inject([test_lib_1.TestComponentBuilder], test_lib_1.fakeAsync(function (tcb) {
            var form = new core_1.Control("");
            var t = "<div><input type=\"text\" [ng-form-control]=\"form\" [(ng-model)]=\"name\"></div>";
            var rootTC;
            tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (root) { rootTC = root; });
            test_lib_1.tick();
            rootTC.debugElement.componentInstance.form = form;
            rootTC.debugElement.componentInstance.name = "oldValue";
            rootTC.detectChanges();
            var input = rootTC.debugElement.query(debug_1.By.css("input")).nativeElement;
            test_lib_1.expect(input.value).toEqual("oldValue");
            input.value = "updatedValue";
            test_lib_1.dispatchEvent(input, "change");
            test_lib_1.tick();
            test_lib_1.expect(rootTC.debugElement.componentInstance.name).toEqual("updatedValue");
        })));
        test_lib_1.describe("template-driven forms", function () {
            test_lib_1.it("should add new controls and control groups", test_lib_1.inject([test_lib_1.TestComponentBuilder], test_lib_1.fakeAsync(function (tcb) {
                var t = "<form>\n                     <div ng-control-group=\"user\">\n                      <input type=\"text\" ng-control=\"login\">\n                     </div>\n               </form>";
                var rootTC;
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (root) { rootTC = root; });
                test_lib_1.tick();
                rootTC.debugElement.componentInstance.name = null;
                rootTC.detectChanges();
                var form = rootTC.debugElement.componentViewChildren[0].inject(core_1.NgForm);
                test_lib_1.expect(form.controls['user']).not.toBeDefined();
                test_lib_1.tick();
                test_lib_1.expect(form.controls['user']).toBeDefined();
                test_lib_1.expect(form.controls['user'].controls['login']).toBeDefined();
            })));
            test_lib_1.it("should emit ng-submit event on submit", test_lib_1.inject([test_lib_1.TestComponentBuilder], test_lib_1.fakeAsync(function (tcb) {
                var t = "<div><form (ng-submit)=\"name='updated'\"></form></div>";
                var rootTC;
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (root) { rootTC = root; });
                test_lib_1.tick();
                rootTC.debugElement.componentInstance.name = 'old';
                var form = rootTC.debugElement.query(debug_1.By.css("form"));
                test_lib_1.dispatchEvent(form.nativeElement, "submit");
                test_lib_1.tick();
                test_lib_1.expect(rootTC.debugElement.componentInstance.name).toEqual("updated");
            })));
            test_lib_1.it("should not create a template-driven form when ng-no-form is used", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<form ng-no-form>\n               </form>";
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                    rootTC.debugElement.componentInstance.name = null;
                    rootTC.detectChanges();
                    test_lib_1.expect(rootTC.debugElement.componentViewChildren.length).toEqual(0);
                    async.done();
                });
            }));
            test_lib_1.it("should remove controls", test_lib_1.inject([test_lib_1.TestComponentBuilder], test_lib_1.fakeAsync(function (tcb) {
                var t = "<form>\n                    <div *ng-if=\"name == 'show'\">\n                      <input type=\"text\" ng-control=\"login\">\n                    </div>\n                  </form>";
                var rootTC;
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (root) { rootTC = root; });
                test_lib_1.tick();
                rootTC.debugElement.componentInstance.name = 'show';
                rootTC.detectChanges();
                test_lib_1.tick();
                var form = rootTC.debugElement.componentViewChildren[0].inject(core_1.NgForm);
                test_lib_1.expect(form.controls['login']).toBeDefined();
                rootTC.debugElement.componentInstance.name = 'hide';
                rootTC.detectChanges();
                test_lib_1.tick();
                test_lib_1.expect(form.controls['login']).not.toBeDefined();
            })));
            test_lib_1.it("should remove control groups", test_lib_1.inject([test_lib_1.TestComponentBuilder], test_lib_1.fakeAsync(function (tcb) {
                var t = "<form>\n                     <div *ng-if=\"name=='show'\" ng-control-group=\"user\">\n                      <input type=\"text\" ng-control=\"login\">\n                     </div>\n               </form>";
                var rootTC;
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (root) { rootTC = root; });
                test_lib_1.tick();
                rootTC.debugElement.componentInstance.name = 'show';
                rootTC.detectChanges();
                test_lib_1.tick();
                var form = rootTC.debugElement.componentViewChildren[0].inject(core_1.NgForm);
                test_lib_1.expect(form.controls['user']).toBeDefined();
                rootTC.debugElement.componentInstance.name = 'hide';
                rootTC.detectChanges();
                test_lib_1.tick();
                test_lib_1.expect(form.controls['user']).not.toBeDefined();
            })));
            test_lib_1.it("should support ng-model for complex forms", test_lib_1.inject([test_lib_1.TestComponentBuilder], test_lib_1.fakeAsync(function (tcb) {
                var t = "<form>\n                      <input type=\"text\" ng-control=\"name\" [(ng-model)]=\"name\">\n               </form>";
                var rootTC;
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (root) { rootTC = root; });
                test_lib_1.tick();
                rootTC.debugElement.componentInstance.name = "oldValue";
                rootTC.detectChanges();
                test_lib_1.tick();
                var input = rootTC.debugElement.query(debug_1.By.css("input")).nativeElement;
                test_lib_1.expect(input.value).toEqual("oldValue");
                input.value = "updatedValue";
                test_lib_1.dispatchEvent(input, "change");
                test_lib_1.tick();
                test_lib_1.expect(rootTC.debugElement.componentInstance.name).toEqual("updatedValue");
            })));
            test_lib_1.it("should support ng-model for single fields", test_lib_1.inject([test_lib_1.TestComponentBuilder], test_lib_1.fakeAsync(function (tcb) {
                var t = "<div><input type=\"text\" [(ng-model)]=\"name\"></div>";
                var rootTC;
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (root) { rootTC = root; });
                test_lib_1.tick();
                rootTC.debugElement.componentInstance.name = "oldValue";
                rootTC.detectChanges();
                var input = rootTC.debugElement.query(debug_1.By.css("input")).nativeElement;
                test_lib_1.expect(input.value).toEqual("oldValue");
                input.value = "updatedValue";
                test_lib_1.dispatchEvent(input, "change");
                test_lib_1.tick();
                test_lib_1.expect(rootTC.debugElement.componentInstance.name).toEqual("updatedValue");
            })));
        });
        test_lib_1.describe("setting status classes", function () {
            test_lib_1.it("should work with single fields", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var form = new core_1.Control("", core_1.Validators.required);
                var t = "<div><input type=\"text\" [ng-form-control]=\"form\"></div>";
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                    rootTC.debugElement.componentInstance.form = form;
                    rootTC.detectChanges();
                    var input = rootTC.debugElement.query(debug_1.By.css("input")).nativeElement;
                    test_lib_1.expect(sortedClassList(input)).toEqual(['ng-invalid', 'ng-pristine', 'ng-untouched']);
                    test_lib_1.dispatchEvent(input, "blur");
                    rootTC.detectChanges();
                    test_lib_1.expect(sortedClassList(input)).toEqual(["ng-invalid", "ng-pristine", "ng-touched"]);
                    input.value = "updatedValue";
                    test_lib_1.dispatchEvent(input, "change");
                    rootTC.detectChanges();
                    test_lib_1.expect(sortedClassList(input)).toEqual(["ng-dirty", "ng-touched", "ng-valid"]);
                    async.done();
                });
            }));
            test_lib_1.it("should work with complex model-driven forms", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var form = new core_1.ControlGroup({ "name": new core_1.Control("", core_1.Validators.required) });
                var t = "<form [ng-form-model]=\"form\"><input type=\"text\" ng-control=\"name\"></form>";
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                    rootTC.debugElement.componentInstance.form = form;
                    rootTC.detectChanges();
                    var input = rootTC.debugElement.query(debug_1.By.css("input")).nativeElement;
                    test_lib_1.expect(sortedClassList(input)).toEqual(["ng-invalid", "ng-pristine", "ng-untouched"]);
                    test_lib_1.dispatchEvent(input, "blur");
                    rootTC.detectChanges();
                    test_lib_1.expect(sortedClassList(input)).toEqual(["ng-invalid", "ng-pristine", "ng-touched"]);
                    input.value = "updatedValue";
                    test_lib_1.dispatchEvent(input, "change");
                    rootTC.detectChanges();
                    test_lib_1.expect(sortedClassList(input)).toEqual(["ng-dirty", "ng-touched", "ng-valid"]);
                    async.done();
                });
            }));
            test_lib_1.it("should work with ng-model", test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div><input [(ng-model)]=\"name\" required></div>";
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (rootTC) {
                    rootTC.debugElement.componentInstance.name = "";
                    rootTC.detectChanges();
                    var input = rootTC.debugElement.query(debug_1.By.css("input")).nativeElement;
                    test_lib_1.expect(sortedClassList(input)).toEqual(["ng-invalid", "ng-pristine", "ng-untouched"]);
                    test_lib_1.dispatchEvent(input, "blur");
                    rootTC.detectChanges();
                    test_lib_1.expect(sortedClassList(input)).toEqual(["ng-invalid", "ng-pristine", "ng-touched"]);
                    input.value = "updatedValue";
                    test_lib_1.dispatchEvent(input, "change");
                    rootTC.detectChanges();
                    test_lib_1.expect(sortedClassList(input)).toEqual(["ng-dirty", "ng-touched", "ng-valid"]);
                    async.done();
                });
            }));
        });
        test_lib_1.describe("ng-model corner cases", function () {
            test_lib_1.it("should not update the view when the value initially came from the view", test_lib_1.inject([test_lib_1.TestComponentBuilder], test_lib_1.fakeAsync(function (tcb) {
                var form = new core_1.Control("");
                var t = "<div><input type=\"text\" [ng-form-control]=\"form\" [(ng-model)]=\"name\"></div>";
                var rootTC;
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (root) { rootTC = root; });
                test_lib_1.tick();
                rootTC.debugElement.componentInstance.form = form;
                rootTC.detectChanges();
                // In Firefox, effective text selection in the real DOM requires an actual focus
                // of the field. This is not an issue in a new HTML document.
                if (test_lib_1.browserDetection.isFirefox) {
                    var fakeDoc = dom_adapter_1.DOM.createHtmlDocument();
                    dom_adapter_1.DOM.appendChild(fakeDoc.body, rootTC.debugElement.nativeElement);
                }
                var input = rootTC.debugElement.query(debug_1.By.css("input")).nativeElement;
                input.value = "aa";
                input.selectionStart = 1;
                test_lib_1.dispatchEvent(input, "change");
                test_lib_1.tick();
                rootTC.detectChanges();
                // selection start has not changed because we did not reset the value
                test_lib_1.expect(input.selectionStart).toEqual(1);
            })));
            test_lib_1.it("should update the view when the model is set back to what used to be in the view", test_lib_1.inject([test_lib_1.TestComponentBuilder], test_lib_1.fakeAsync(function (tcb) {
                var t = "<input type=\"text\" [(ng-model)]=\"name\">";
                var rootTC;
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (root) { rootTC = root; });
                test_lib_1.tick();
                rootTC.debugElement.componentInstance.name = "";
                rootTC.detectChanges();
                // Type "aa" into the input.
                var input = rootTC.debugElement.query(debug_1.By.css("input")).nativeElement;
                input.value = "aa";
                input.selectionStart = 1;
                test_lib_1.dispatchEvent(input, "change");
                test_lib_1.tick();
                rootTC.detectChanges();
                test_lib_1.expect(rootTC.debugElement.componentInstance.name).toEqual("aa");
                // Programatically update the input value to be "bb".
                rootTC.debugElement.componentInstance.name = "bb";
                test_lib_1.tick();
                rootTC.detectChanges();
                test_lib_1.expect(input.value).toEqual("bb");
                // Programatically set it back to "aa".
                rootTC.debugElement.componentInstance.name = "aa";
                test_lib_1.tick();
                rootTC.detectChanges();
                test_lib_1.expect(input.value).toEqual("aa");
            })));
            test_lib_1.it("should not crash when validity is checked from a binding", test_lib_1.inject([test_lib_1.TestComponentBuilder], test_lib_1.fakeAsync(function (tcb) {
                // {{x.valid}} used to crash because valid() tried to read a property
                // from form.control before it was set. This test verifies this bug is
                // fixed.
                var t = "<form><div ng-control-group=\"x\" #x=\"form\">\n                  <input type=\"text\" ng-control=\"test\"></div>{{x.valid}}</form>";
                var rootTC;
                tcb.overrideTemplate(MyComp, t).createAsync(MyComp).then(function (root) { rootTC = root; });
                test_lib_1.tick();
                rootTC.detectChanges();
            })));
        });
    });
}
exports.main = main;
var WrappedValue = (function () {
    function WrappedValue(cd) {
        cd.valueAccessor = this;
    }
    WrappedValue.prototype.writeValue = function (value) { this.value = "!" + value + "!"; };
    WrappedValue.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    WrappedValue.prototype.registerOnTouched = function (fn) { };
    WrappedValue.prototype.handleOnChange = function (value) { this.onChange(value.substring(1, value.length - 1)); };
    WrappedValue = __decorate([
        angular2_1.Directive({
            selector: '[wrapped-value]',
            host: { '(change)': 'handleOnChange($event.target.value)', '[value]': 'value' }
        }), 
        __metadata('design:paramtypes', [core_1.NgControl])
    ], WrappedValue);
    return WrappedValue;
})();
var MyComp = (function () {
    function MyComp() {
    }
    MyComp = __decorate([
        angular2_1.Component({ selector: "my-comp" }),
        angular2_1.View({ directives: [core_1.FORM_DIRECTIVES, WrappedValue, core_1.NgIf, core_1.NgFor] }), 
        __metadata('design:paramtypes', [])
    ], MyComp);
    return MyComp;
})();
function sortedClassList(el) {
    var l = dom_adapter_1.DOM.classList(el);
    collection_1.ListWrapper.sort(l);
    return l;
}
//# sourceMappingURL=integration_spec.js.map