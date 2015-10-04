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
var proto_view_factory_1 = require('angular2/src/core/linker/proto_view_factory');
var di_1 = require('angular2/src/core/di');
var lang_1 = require('angular2/src/core/facade/lang');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var async_1 = require('angular2/src/core/facade/async');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var template_commands_1 = require('angular2/src/core/linker/template_commands');
/**
 * Low-level service for compiling {@link Component}s into {@link ProtoViewRef ProtoViews}s, which
 * can later be used to create and render a Component instance.
 *
 * Most applications should instead use higher-level {@link DynamicComponentLoader} service, which
 * both compiles and instantiates a Component.
 */
var Compiler = (function () {
    /**
     * @private
     */
    function Compiler(_protoViewFactory) {
        this._protoViewFactory = _protoViewFactory;
    }
    Compiler.prototype.compileInHost = function (componentType) {
        var metadatas = reflection_1.reflector.annotations(componentType);
        var compiledHostTemplate = null;
        for (var i = 0; i < metadatas.length; i++) {
            var metadata = metadatas[i];
            if (metadata instanceof template_commands_1.CompiledHostTemplate) {
                compiledHostTemplate = metadata;
                break;
            }
        }
        if (lang_1.isBlank(compiledHostTemplate)) {
            throw new exceptions_1.BaseException("No precompiled template for component " + lang_1.stringify(componentType) + " found");
        }
        return async_1.PromiseWrapper.resolve(this._createProtoView(compiledHostTemplate));
    };
    Compiler.prototype._createProtoView = function (compiledHostTemplate) {
        return this._protoViewFactory.createHost(compiledHostTemplate).ref;
    };
    Compiler.prototype.clearCache = function () { this._protoViewFactory.clearCache(); };
    Compiler = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [proto_view_factory_1.ProtoViewFactory])
    ], Compiler);
    return Compiler;
})();
exports.Compiler = Compiler;
function internalCreateProtoView(compiler, compiledHostTemplate) {
    return compiler._createProtoView(compiledHostTemplate);
}
exports.internalCreateProtoView = internalCreateProtoView;
//# sourceMappingURL=compiler.js.map