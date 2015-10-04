var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var collection_1 = require('angular2/src/core/facade/collection');
var lang_1 = require('angular2/src/core/facade/lang');
var metadata_1 = require('../core/metadata');
var directive_resolver_1 = require('angular2/src/core/linker/directive_resolver');
var MockDirectiveResolver = (function (_super) {
    __extends(MockDirectiveResolver, _super);
    function MockDirectiveResolver() {
        _super.apply(this, arguments);
        this._bindingsOverrides = new collection_1.Map();
        this._viewBindingsOverrides = new collection_1.Map();
    }
    MockDirectiveResolver.prototype.resolve = function (type) {
        var dm = _super.prototype.resolve.call(this, type);
        var bindingsOverride = this._bindingsOverrides.get(type);
        var viewBindingsOverride = this._viewBindingsOverrides.get(type);
        var bindings = dm.bindings;
        if (lang_1.isPresent(bindingsOverride)) {
            bindings = dm.bindings.concat(bindingsOverride);
        }
        if (dm instanceof metadata_1.ComponentMetadata) {
            var viewBindings = dm.viewBindings;
            if (lang_1.isPresent(viewBindingsOverride)) {
                viewBindings = dm.viewBindings.concat(viewBindingsOverride);
            }
            return new metadata_1.ComponentMetadata({
                selector: dm.selector,
                inputs: dm.inputs,
                outputs: dm.outputs,
                host: dm.host,
                bindings: bindings,
                exportAs: dm.exportAs,
                moduleId: dm.moduleId,
                queries: dm.queries,
                changeDetection: dm.changeDetection,
                viewBindings: viewBindings
            });
        }
        return new metadata_1.DirectiveMetadata({
            selector: dm.selector,
            inputs: dm.inputs,
            outputs: dm.outputs,
            host: dm.host,
            bindings: bindings,
            exportAs: dm.exportAs,
            moduleId: dm.moduleId,
            queries: dm.queries
        });
    };
    MockDirectiveResolver.prototype.setBindingsOverride = function (type, bindings) {
        this._bindingsOverrides.set(type, bindings);
    };
    MockDirectiveResolver.prototype.setViewBindingsOverride = function (type, viewBindings) {
        this._viewBindingsOverrides.set(type, viewBindings);
    };
    return MockDirectiveResolver;
})(directive_resolver_1.DirectiveResolver);
exports.MockDirectiveResolver = MockDirectiveResolver;
//# sourceMappingURL=directive_resolver_mock.js.map