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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var lang_1 = require('angular2/src/core/facade/lang');
var async_1 = require('angular2/src/core/facade/async');
var metadata_1 = require('angular2/src/core/metadata');
var di_1 = require('angular2/src/core/di');
var control_value_accessor_1 = require('./control_value_accessor');
var ng_control_1 = require('./ng_control');
var model_1 = require('../model');
var validators_1 = require('../validators');
var shared_1 = require('./shared');
var formControlBinding = lang_1.CONST_EXPR(new di_1.Binding(ng_control_1.NgControl, { toAlias: di_1.forwardRef(function () { return NgModel; }) }));
/**
 * Binds a domain model to a form control.
 *
 * # Usage
 *
 * `ng-model` binds an existing domain model to a form control. For a
 * two-way binding, use `[(ng-model)]` to ensure the model updates in
 * both directions.
 *
 * ### Example ([live demo](http://plnkr.co/edit/R3UX5qDaUqFO2VYR0UzH?p=preview))
 *  ```typescript
 * @Component({selector: "search-comp"})
 * @View({
 *      directives: [FORM_DIRECTIVES],
 *      template: `<input type='text' [(ng-model)]="searchQuery">`
 *      })
 * class SearchComp {
 *  searchQuery: string;
 * }
 *  ```
 */
var NgModel = (function (_super) {
    __extends(NgModel, _super);
    function NgModel(validators, valueAccessors) {
        _super.call(this);
        this._control = new model_1.Control();
        this._added = false;
        this.update = new async_1.EventEmitter();
        this.validators = validators;
        this.valueAccessor = shared_1.selectValueAccessor(this, valueAccessors);
    }
    NgModel.prototype.onChanges = function (changes) {
        if (!this._added) {
            shared_1.setUpControl(this._control, this);
            this._control.updateValidity();
            this._added = true;
        }
        if (shared_1.isPropertyUpdated(changes, this.viewModel)) {
            this._control.updateValue(this.model);
            this.viewModel = this.model;
        }
    };
    Object.defineProperty(NgModel.prototype, "control", {
        get: function () { return this._control; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModel.prototype, "path", {
        get: function () { return []; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModel.prototype, "validator", {
        get: function () { return validators_1.Validators.compose(this.validators); },
        enumerable: true,
        configurable: true
    });
    NgModel.prototype.viewToModelUpdate = function (newValue) {
        this.viewModel = newValue;
        async_1.ObservableWrapper.callNext(this.update, newValue);
    };
    NgModel = __decorate([
        metadata_1.Directive({
            selector: '[ng-model]:not([ng-control]):not([ng-form-control])',
            bindings: [formControlBinding],
            inputs: ['model: ngModel'],
            outputs: ['update: ngModel'],
            exportAs: 'form'
        }),
        __param(0, di_1.Optional()),
        __param(0, di_1.Inject(validators_1.NG_VALIDATORS)),
        __param(1, di_1.Optional()),
        __param(1, di_1.Inject(control_value_accessor_1.NG_VALUE_ACCESSOR)), 
        __metadata('design:paramtypes', [Array, Array])
    ], NgModel);
    return NgModel;
})(ng_control_1.NgControl);
exports.NgModel = NgModel;
//# sourceMappingURL=ng_model.js.map