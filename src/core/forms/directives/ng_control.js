var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_control_directive_1 = require('./abstract_control_directive');
/**
 * A base class that all control directive extend.
 * It binds a {@link Control} object to a DOM element.
 */
// Cannot currently be abstract because it would contain
// an abstract method in the public API, and we cannot reflect
// on that in Dart due to https://github.com/dart-lang/sdk/issues/18721
// Also we don't have abstract setters, see https://github.com/Microsoft/TypeScript/issues/4669
var NgControl = (function (_super) {
    __extends(NgControl, _super);
    function NgControl() {
        _super.apply(this, arguments);
        this.name = null;
        this.valueAccessor = null;
    }
    Object.defineProperty(NgControl.prototype, "validator", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgControl.prototype, "path", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    NgControl.prototype.viewToModelUpdate = function (newValue) { };
    return NgControl;
})(abstract_control_directive_1.AbstractControlDirective);
exports.NgControl = NgControl;
//# sourceMappingURL=ng_control.js.map