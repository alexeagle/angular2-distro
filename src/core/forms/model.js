var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = require('angular2/src/core/facade/lang');
var async_1 = require('angular2/src/core/facade/async');
var collection_1 = require('angular2/src/core/facade/collection');
var validators_1 = require('./validators');
/**
 * Indicates that a Control is valid, i.e. that no errors exist in the input value.
 */
exports.VALID = "VALID";
/**
 * Indicates that a Control is invalid, i.e. that an error exists in the input value.
 */
exports.INVALID = "INVALID";
function isControl(control) {
    return control instanceof AbstractControl;
}
exports.isControl = isControl;
function _find(control, path) {
    if (lang_1.isBlank(path))
        return null;
    if (!(path instanceof Array)) {
        path = path.split("/");
    }
    if (path instanceof Array && collection_1.ListWrapper.isEmpty(path))
        return null;
    return collection_1.ListWrapper.reduce(path, function (v, name) {
        if (v instanceof ControlGroup) {
            return lang_1.isPresent(v.controls[name]) ? v.controls[name] : null;
        }
        else if (v instanceof ControlArray) {
            var index = name;
            return lang_1.isPresent(v.at(index)) ? v.at(index) : null;
        }
        else {
            return null;
        }
    }, control);
}
/**
 * Omitting from external API doc as this is really an abstract internal concept.
 */
var AbstractControl = (function () {
    function AbstractControl(validator) {
        this.validator = validator;
        this._pristine = true;
        this._touched = false;
    }
    Object.defineProperty(AbstractControl.prototype, "value", {
        get: function () { return this._value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "status", {
        get: function () { return this._status; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "valid", {
        get: function () { return this._status === exports.VALID; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "errors", {
        get: function () { return this._errors; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "pristine", {
        get: function () { return this._pristine; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "dirty", {
        get: function () { return !this.pristine; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "touched", {
        get: function () { return this._touched; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "untouched", {
        get: function () { return !this._touched; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "valueChanges", {
        get: function () { return this._valueChanges; },
        enumerable: true,
        configurable: true
    });
    AbstractControl.prototype.markAsTouched = function () { this._touched = true; };
    AbstractControl.prototype.markAsDirty = function (_a) {
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        onlySelf = lang_1.normalizeBool(onlySelf);
        this._pristine = false;
        if (lang_1.isPresent(this._parent) && !onlySelf) {
            this._parent.markAsDirty({ onlySelf: onlySelf });
        }
    };
    AbstractControl.prototype.setParent = function (parent) { this._parent = parent; };
    AbstractControl.prototype.updateValidity = function (_a) {
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        onlySelf = lang_1.normalizeBool(onlySelf);
        this._errors = this.validator(this);
        this._status = lang_1.isPresent(this._errors) ? exports.INVALID : exports.VALID;
        if (lang_1.isPresent(this._parent) && !onlySelf) {
            this._parent.updateValidity({ onlySelf: onlySelf });
        }
    };
    AbstractControl.prototype.updateValueAndValidity = function (_a) {
        var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
        onlySelf = lang_1.normalizeBool(onlySelf);
        emitEvent = lang_1.isPresent(emitEvent) ? emitEvent : true;
        this._updateValue();
        if (emitEvent) {
            async_1.ObservableWrapper.callNext(this._valueChanges, this._value);
        }
        this._errors = this.validator(this);
        this._status = lang_1.isPresent(this._errors) ? exports.INVALID : exports.VALID;
        if (lang_1.isPresent(this._parent) && !onlySelf) {
            this._parent.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
        }
    };
    AbstractControl.prototype.find = function (path) { return _find(this, path); };
    AbstractControl.prototype.getError = function (errorCode, path) {
        if (path === void 0) { path = null; }
        var control = lang_1.isPresent(path) && !collection_1.ListWrapper.isEmpty(path) ? this.find(path) : this;
        if (lang_1.isPresent(control) && lang_1.isPresent(control._errors)) {
            return collection_1.StringMapWrapper.get(control._errors, errorCode);
        }
        else {
            return null;
        }
    };
    AbstractControl.prototype.hasError = function (errorCode, path) {
        if (path === void 0) { path = null; }
        return lang_1.isPresent(this.getError(errorCode, path));
    };
    AbstractControl.prototype._updateValue = function () { };
    return AbstractControl;
})();
exports.AbstractControl = AbstractControl;
/**
 * Defines a part of a form that cannot be divided into other controls. `Control`s have values and
 * validation state, which is determined by an optional validation function.
 *
 * `Control` is one of the three fundamental building blocks used to define forms in Angular, along
 * with {@link ControlGroup} and {@link ControlArray}.
 *
 * # Usage
 *
 * By default, a `Control` is created for every `<input>` or other form component.
 * With {@link NgFormControl} or {@link NgFormModel} an existing {@link Control} can be
 * bound to a DOM element instead. This `Control` can be configured with a custom
 * validation function.
 *
 * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
 */
var Control = (function (_super) {
    __extends(Control, _super);
    function Control(value, validator) {
        if (value === void 0) { value = null; }
        if (validator === void 0) { validator = validators_1.Validators.nullValidator; }
        _super.call(this, validator);
        this._value = value;
        this.updateValidity({ onlySelf: true });
        this._valueChanges = new async_1.EventEmitter();
    }
    /**
     * Set the value of the control to `value`.
     *
     * If `onlySelf` is `true`, this change will only affect the validation of this `Control`
     * and not its parent component. If `emitEvent` is `true`, this change will cause a
     * `valueChanges` event on the `Control` to be emitted. Both of these options default to
     * `false`.
     *
     * If `emitModelToViewChange` is `true`, the view will be notified about the new value
     * via an `onChange` event. This is the default behavior if `emitModelToViewChange` is not
     * specified.
     */
    Control.prototype.updateValue = function (value, _a) {
        var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent, emitModelToViewChange = _b.emitModelToViewChange;
        emitModelToViewChange = lang_1.isPresent(emitModelToViewChange) ? emitModelToViewChange : true;
        this._value = value;
        if (lang_1.isPresent(this._onChange) && emitModelToViewChange)
            this._onChange(this._value);
        this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
    };
    /**
     * Register a listener for change events.
     */
    Control.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    return Control;
})(AbstractControl);
exports.Control = Control;
/**
 * Defines a part of a form, of fixed length, that can contain other controls.
 *
 * A `ControlGroup` aggregates the values and errors of each {@link Control} in the group. Thus, if
 * one of the controls in a group is invalid, the entire group is invalid. Similarly, if a control
 * changes its value, the entire group changes as well.
 *
 * `ControlGroup` is one of the three fundamental building blocks used to define forms in Angular,
 * along with {@link Control} and {@link ControlArray}. {@link ControlArray} can also contain other
 * controls, but is of variable length.
 *
 * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
 */
var ControlGroup = (function (_super) {
    __extends(ControlGroup, _super);
    function ControlGroup(controls, optionals, validator) {
        if (optionals === void 0) { optionals = null; }
        if (validator === void 0) { validator = validators_1.Validators.group; }
        _super.call(this, validator);
        this.controls = controls;
        this._optionals = lang_1.isPresent(optionals) ? optionals : {};
        this._valueChanges = new async_1.EventEmitter();
        this._setParentForControls();
        this._value = this._reduceValue();
        this.updateValidity({ onlySelf: true });
    }
    ControlGroup.prototype.addControl = function (name, control) {
        this.controls[name] = control;
        control.setParent(this);
    };
    ControlGroup.prototype.removeControl = function (name) { collection_1.StringMapWrapper.delete(this.controls, name); };
    ControlGroup.prototype.include = function (controlName) {
        collection_1.StringMapWrapper.set(this._optionals, controlName, true);
        this.updateValueAndValidity();
    };
    ControlGroup.prototype.exclude = function (controlName) {
        collection_1.StringMapWrapper.set(this._optionals, controlName, false);
        this.updateValueAndValidity();
    };
    ControlGroup.prototype.contains = function (controlName) {
        var c = collection_1.StringMapWrapper.contains(this.controls, controlName);
        return c && this._included(controlName);
    };
    ControlGroup.prototype._setParentForControls = function () {
        var _this = this;
        collection_1.StringMapWrapper.forEach(this.controls, function (control, name) { control.setParent(_this); });
    };
    ControlGroup.prototype._updateValue = function () { this._value = this._reduceValue(); };
    ControlGroup.prototype._reduceValue = function () {
        return this._reduceChildren({}, function (acc, control, name) {
            acc[name] = control.value;
            return acc;
        });
    };
    ControlGroup.prototype._reduceChildren = function (initValue, fn) {
        var _this = this;
        var res = initValue;
        collection_1.StringMapWrapper.forEach(this.controls, function (control, name) {
            if (_this._included(name)) {
                res = fn(res, control, name);
            }
        });
        return res;
    };
    ControlGroup.prototype._included = function (controlName) {
        var isOptional = collection_1.StringMapWrapper.contains(this._optionals, controlName);
        return !isOptional || collection_1.StringMapWrapper.get(this._optionals, controlName);
    };
    return ControlGroup;
})(AbstractControl);
exports.ControlGroup = ControlGroup;
/**
 * Defines a part of a form, of variable length, that can contain other controls.
 *
 * A `ControlArray` aggregates the values and errors of each {@link Control} in the group. Thus, if
 * one of the controls in a group is invalid, the entire group is invalid. Similarly, if a control
 * changes its value, the entire group changes as well.
 *
 * `ControlArray` is one of the three fundamental building blocks used to define forms in Angular,
 * along with {@link Control} and {@link ControlGroup}. {@link ControlGroup} can also contain
 * other controls, but is of fixed length.
 *
 * # Adding or removing controls
 *
 * To change the controls in the array, use the `push`, `insert`, or `removeAt` methods
 * in `ControlArray` itself. These methods ensure the controls are properly tracked in the
 * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
 * the `ControlArray` directly, as that will result in strange and unexpected behavior such
 * as broken change detection.
 *
 * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
 */
var ControlArray = (function (_super) {
    __extends(ControlArray, _super);
    function ControlArray(controls, validator) {
        if (validator === void 0) { validator = validators_1.Validators.array; }
        _super.call(this, validator);
        this.controls = controls;
        this._valueChanges = new async_1.EventEmitter();
        this._setParentForControls();
        this._updateValue();
        this.updateValidity({ onlySelf: true });
    }
    /**
     * Get the {@link AbstractControl} at the given `index` in the array.
     */
    ControlArray.prototype.at = function (index) { return this.controls[index]; };
    /**
     * Insert a new {@link AbstractControl} at the end of the array.
     */
    ControlArray.prototype.push = function (control) {
        this.controls.push(control);
        control.setParent(this);
        this.updateValueAndValidity();
    };
    /**
     * Insert a new {@link AbstractControl} at the given `index` in the array.
     */
    ControlArray.prototype.insert = function (index, control) {
        collection_1.ListWrapper.insert(this.controls, index, control);
        control.setParent(this);
        this.updateValueAndValidity();
    };
    /**
     * Remove the control at the given `index` in the array.
     */
    ControlArray.prototype.removeAt = function (index) {
        collection_1.ListWrapper.removeAt(this.controls, index);
        this.updateValueAndValidity();
    };
    Object.defineProperty(ControlArray.prototype, "length", {
        /**
         * Get the length of the control array.
         */
        get: function () { return this.controls.length; },
        enumerable: true,
        configurable: true
    });
    ControlArray.prototype._updateValue = function () { this._value = this.controls.map(function (control) { return control.value; }); };
    ControlArray.prototype._setParentForControls = function () {
        var _this = this;
        this.controls.forEach(function (control) { control.setParent(_this); });
    };
    return ControlArray;
})(AbstractControl);
exports.ControlArray = ControlArray;
//# sourceMappingURL=model.js.map