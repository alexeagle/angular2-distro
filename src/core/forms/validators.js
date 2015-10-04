var lang_1 = require('angular2/src/core/facade/lang');
var lang_2 = require('angular2/src/core/facade/lang');
var collection_1 = require('angular2/src/core/facade/collection');
var di_1 = require('angular2/src/core/di');
exports.NG_VALIDATORS = lang_2.CONST_EXPR(new di_1.OpaqueToken("NgValidators"));
/**
 * Provides a set of validators used by form controls.
 *
 * # Example
 *
 * ```
 * var loginControl = new Control("", Validators.required)
 * ```
 */
var Validators = (function () {
    function Validators() {
    }
    Validators.required = function (control) {
        return lang_1.isBlank(control.value) || control.value == "" ? { "required": true } : null;
    };
    Validators.nullValidator = function (c) { return null; };
    Validators.compose = function (validators) {
        if (lang_1.isBlank(validators))
            return Validators.nullValidator;
        return function (control) {
            var res = collection_1.ListWrapper.reduce(validators, function (res, validator) {
                var errors = validator(control);
                return lang_1.isPresent(errors) ? collection_1.StringMapWrapper.merge(res, errors) : res;
            }, {});
            return collection_1.StringMapWrapper.isEmpty(res) ? null : res;
        };
    };
    Validators.group = function (group) {
        var res = {};
        collection_1.StringMapWrapper.forEach(group.controls, function (control, name) {
            if (group.contains(name) && lang_1.isPresent(control.errors)) {
                Validators._mergeErrors(control, res);
            }
        });
        return collection_1.StringMapWrapper.isEmpty(res) ? null : res;
    };
    Validators.array = function (array) {
        var res = {};
        array.controls.forEach(function (control) {
            if (lang_1.isPresent(control.errors)) {
                Validators._mergeErrors(control, res);
            }
        });
        return collection_1.StringMapWrapper.isEmpty(res) ? null : res;
    };
    Validators._mergeErrors = function (control, res) {
        collection_1.StringMapWrapper.forEach(control.errors, function (value, error) {
            if (!collection_1.StringMapWrapper.contains(res, error)) {
                res[error] = [];
            }
            var current = res[error];
            current.push(control);
        });
    };
    return Validators;
})();
exports.Validators = Validators;
//# sourceMappingURL=validators.js.map