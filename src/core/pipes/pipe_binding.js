var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var binding_1 = require('angular2/src/core/di/binding');
var di_1 = require('angular2/src/core/di');
var PipeBinding = (function (_super) {
    __extends(PipeBinding, _super);
    function PipeBinding(name, pure, key, resolvedFactories, multiBinding) {
        _super.call(this, key, resolvedFactories, multiBinding);
        this.name = name;
        this.pure = pure;
    }
    PipeBinding.createFromType = function (type, metadata) {
        var binding = new di_1.Binding(type, { toClass: type });
        var rb = binding_1.resolveBinding(binding);
        return new PipeBinding(metadata.name, metadata.pure, rb.key, rb.resolvedFactories, rb.multiBinding);
    };
    return PipeBinding;
})(di_1.ResolvedBinding);
exports.PipeBinding = PipeBinding;
//# sourceMappingURL=pipe_binding.js.map