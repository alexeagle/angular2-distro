var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var async_1 = require('angular2/src/core/facade/async');
var collection_1 = require('angular2/src/core/facade/collection');
var lang_1 = require('angular2/src/core/facade/lang');
var metadata_1 = require('angular2/src/core/metadata');
var di_1 = require('angular2/src/core/di');
var control_container_1 = require('./control_container');
var model_1 = require('../model');
var shared_1 = require('./shared');
var formDirectiveBinding = lang_1.CONST_EXPR(new di_1.Binding(control_container_1.ControlContainer, { toAlias: di_1.forwardRef(function () { return NgForm; }) }));
/**
 * If `NgForm` is bound in a component, `<form>` elements in that component will be
 * upgraded to use the Angular form system.
 *
 * # Typical Use
 *
 * Include `FORM_DIRECTIVES` in the `directives` section of a {@link View} annotation
 * to use `NgForm` and its associated controls.
 *
 * # Structure
 *
 * An Angular form is a collection of {@link Control}s in some hierarchy.
 * `Control`s can be at the top level or can be organized in {@link ControlGroups}
 * or {@link ControlArray}s. This hierarchy is reflected in the form's `value`, a
 * JSON object that mirrors the form structure.
 *
 * # Submission
 *
 * The `ng-submit` event signals when the user triggers a form submission.
 *
 * ### Example ([live demo](http://plnkr.co/edit/ltdgYj4P0iY64AR71EpL?p=preview))
 *
 *  ```typescript
 * @Component({
 *   selector: 'my-app'
 * })
 * @View({
 *   template: `
 *     <div>
 *       <p>Submit the form to see the data object Angular builds</p>
 *       <h2>NgForm demo</h2>
 *       <form #f="form" (ng-submit)="onSubmit(f.value)">
 *         <h3>Control group: credentials</h3>
 *         <div ng-control-group="credentials">
 *           <p>Login: <input type="text" ng-control="login"></p>
 *           <p>Password: <input type="password" ng-control="password"></p>
 *         </div>
 *         <h3>Control group: person</h3>
 *         <div ng-control-group="person">
 *           <p>First name: <input type="text" ng-control="firstName"></p>
 *           <p>Last name: <input type="text" ng-control="lastName"></p>
 *         </div>
 *         <button type="submit">Submit Form</button>
 *       <p>Form data submitted:</p>
 *       </form>
 *       <pre>{{data}}</pre>
 *     </div>
 * `,
 *   directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
 * })
 * export class App {
 *   constructor() {}
 *
 *   data: string;
 *
 *   onSubmit(data) {
 *     this.data = JSON.stringify(data, null, 2);
 *   }
 * }
 *  ```
 */
var NgForm = (function (_super) {
    __extends(NgForm, _super);
    function NgForm() {
        _super.apply(this, arguments);
        this.form = new model_1.ControlGroup({});
        this.ngSubmit = new async_1.EventEmitter();
    }
    Object.defineProperty(NgForm.prototype, "formDirective", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgForm.prototype, "control", {
        get: function () { return this.form; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgForm.prototype, "path", {
        get: function () { return []; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgForm.prototype, "controls", {
        get: function () { return this.form.controls; },
        enumerable: true,
        configurable: true
    });
    NgForm.prototype.addControl = function (dir) {
        var _this = this;
        this._later(function (_) {
            var container = _this._findContainer(dir.path);
            var ctrl = new model_1.Control();
            shared_1.setUpControl(ctrl, dir);
            container.addControl(dir.name, ctrl);
            ctrl.updateValidity();
        });
    };
    NgForm.prototype.getControl = function (dir) { return this.form.find(dir.path); };
    NgForm.prototype.removeControl = function (dir) {
        var _this = this;
        this._later(function (_) {
            var container = _this._findContainer(dir.path);
            if (lang_1.isPresent(container)) {
                container.removeControl(dir.name);
                container.updateValidity();
            }
        });
    };
    NgForm.prototype.addControlGroup = function (dir) {
        var _this = this;
        this._later(function (_) {
            var container = _this._findContainer(dir.path);
            var group = new model_1.ControlGroup({});
            container.addControl(dir.name, group);
            group.updateValidity();
        });
    };
    NgForm.prototype.removeControlGroup = function (dir) {
        var _this = this;
        this._later(function (_) {
            var container = _this._findContainer(dir.path);
            if (lang_1.isPresent(container)) {
                container.removeControl(dir.name);
                container.updateValidity();
            }
        });
    };
    NgForm.prototype.getControlGroup = function (dir) {
        return this.form.find(dir.path);
    };
    NgForm.prototype.updateModel = function (dir, value) {
        var _this = this;
        this._later(function (_) {
            var ctrl = _this.form.find(dir.path);
            ctrl.updateValue(value);
        });
    };
    NgForm.prototype.onSubmit = function () {
        async_1.ObservableWrapper.callNext(this.ngSubmit, null);
        return false;
    };
    NgForm.prototype._findContainer = function (path) {
        path.pop();
        return collection_1.ListWrapper.isEmpty(path) ? this.form : this.form.find(path);
    };
    NgForm.prototype._later = function (fn) { async_1.PromiseWrapper.then(async_1.PromiseWrapper.resolve(null), fn, function (_) { }); };
    NgForm = __decorate([
        metadata_1.Directive({
            selector: 'form:not([ng-no-form]):not([ng-form-model]),ng-form,[ng-form]',
            bindings: [formDirectiveBinding],
            host: {
                '(submit)': 'onSubmit()',
            },
            outputs: ['ngSubmit'],
            exportAs: 'form'
        }), 
        __metadata('design:paramtypes', [])
    ], NgForm);
    return NgForm;
})(control_container_1.ControlContainer);
exports.NgForm = NgForm;
//# sourceMappingURL=ng_form.js.map