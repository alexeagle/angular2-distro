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
var di_1 = require('angular2/src/core/di');
var lang_1 = require('angular2/src/core/facade/lang');
var metadata_1 = require('angular2/src/core/metadata');
var validators_1 = require('../validators');
var DEFAULT_VALIDATORS = lang_1.CONST_EXPR(new di_1.Binding(validators_1.NG_VALIDATORS, { toValue: validators_1.Validators.required, multi: true }));
var DefaultValidators = (function () {
    function DefaultValidators() {
    }
    DefaultValidators = __decorate([
        metadata_1.Directive({
            selector: '[required][ng-control],[required][ng-form-control],[required][ng-model]',
            bindings: [DEFAULT_VALIDATORS]
        }), 
        __metadata('design:paramtypes', [])
    ], DefaultValidators);
    return DefaultValidators;
})();
exports.DefaultValidators = DefaultValidators;
//# sourceMappingURL=validators.js.map