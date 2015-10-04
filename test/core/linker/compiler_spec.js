var test_lib_1 = require('angular2/test_lib');
var core_1 = require('angular2/core');
var spies_1 = require('../spies');
var template_commands_1 = require('angular2/src/core/linker/template_commands');
var compiler_1 = require('angular2/src/core/linker/compiler');
var proto_view_factory_1 = require('angular2/src/core/linker/proto_view_factory');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var view_1 = require('angular2/src/core/linker/view');
function main() {
    test_lib_1.describe('Compiler', function () {
        var compiler;
        var protoViewFactorySpy;
        var someProtoView;
        var cht;
        test_lib_1.beforeEachBindings(function () {
            protoViewFactorySpy = new spies_1.SpyProtoViewFactory();
            someProtoView = new view_1.AppProtoView(null, null, null, null, null, null);
            protoViewFactorySpy.spy('createHost').andReturn(someProtoView);
            return [core_1.bind(proto_view_factory_1.ProtoViewFactory).toValue(protoViewFactorySpy), compiler_1.Compiler];
        });
        test_lib_1.beforeEach(test_lib_1.inject([compiler_1.Compiler], function (_compiler) {
            compiler = _compiler;
            cht = new template_commands_1.CompiledHostTemplate(function () { return new template_commands_1.CompiledTemplate(23, null); });
            reflection_1.reflector.registerType(SomeComponent, new reflection_1.ReflectionInfo([cht]));
        }));
        test_lib_1.it('should read the template from an annotation', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compiler.compileInHost(SomeComponent)
                .then(function (_) {
                test_lib_1.expect(protoViewFactorySpy.spy('createHost')).toHaveBeenCalledWith(cht);
                async.done();
            });
        }));
        test_lib_1.it('should clear the cache', function () {
            compiler.clearCache();
            test_lib_1.expect(protoViewFactorySpy.spy('clearCache')).toHaveBeenCalled();
        });
    });
}
exports.main = main;
var SomeComponent = (function () {
    function SomeComponent() {
    }
    return SomeComponent;
})();
//# sourceMappingURL=compiler_spec.js.map