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
var change_detection_1 = require('angular2/src/core/change_detection');
var linker_1 = require('angular2/src/core/linker');
var metadata_1 = require('angular2/src/core/metadata');
var render_1 = require('angular2/src/core/render');
var lang_1 = require('angular2/src/core/facade/lang');
/**
 * Adds or removes styles based on an {expression}.
 *
 * When the expression assigned to `ng-style` evaluates to an object, the corresponding element
 * styles are updated. Style names to update are taken from the object keys and values - from the
 * corresponding object values.
 *
 * # Example:
 *
 * ```
 * <div [ng-style]="{'text-align': alignExp}"></div>
 * ```
 *
 * In the above example the `text-align` style will be updated based on the `alignExp` value
 * changes.
 *
 * # Syntax
 *
 * - `<div [ng-style]="{'text-align': alignExp}"></div>`
 * - `<div [ng-style]="styleExp"></div>`
 */
var NgStyle = (function () {
    function NgStyle(_differs, _ngEl, _renderer) {
        this._differs = _differs;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
    }
    Object.defineProperty(NgStyle.prototype, "rawStyle", {
        set: function (v) {
            this._rawStyle = v;
            if (lang_1.isBlank(this._differ) && lang_1.isPresent(v)) {
                this._differ = this._differs.find(this._rawStyle).create(null);
            }
        },
        enumerable: true,
        configurable: true
    });
    NgStyle.prototype.doCheck = function () {
        if (lang_1.isPresent(this._differ)) {
            var changes = this._differ.diff(this._rawStyle);
            if (lang_1.isPresent(changes)) {
                this._applyChanges(changes);
            }
        }
    };
    NgStyle.prototype._applyChanges = function (changes) {
        var _this = this;
        changes.forEachAddedItem(function (record) { _this._setStyle(record.key, record.currentValue); });
        changes.forEachChangedItem(function (record) { _this._setStyle(record.key, record.currentValue); });
        changes.forEachRemovedItem(function (record) { _this._setStyle(record.key, null); });
    };
    NgStyle.prototype._setStyle = function (name, val) {
        this._renderer.setElementStyle(this._ngEl, name, val);
    };
    NgStyle = __decorate([
        metadata_1.Directive({ selector: '[ng-style]', inputs: ['rawStyle: ng-style'] }), 
        __metadata('design:paramtypes', [change_detection_1.KeyValueDiffers, linker_1.ElementRef, render_1.Renderer])
    ], NgStyle);
    return NgStyle;
})();
exports.NgStyle = NgStyle;
//# sourceMappingURL=ng_style.js.map