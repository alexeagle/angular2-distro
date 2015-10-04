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
var test_lib_1 = require('angular2/test_lib');
var core_1 = require('angular2/core');
var async_1 = require('angular2/src/core/facade/async');
var spies_1 = require('../spies');
var runtime_compiler_1 = require('angular2/src/core/compiler/runtime_compiler');
var proto_view_factory_1 = require('angular2/src/core/linker/proto_view_factory');
var view_1 = require('angular2/src/core/linker/view');
function main() {
    test_lib_1.describe('RuntimeCompiler', function () {
        var compiler;
        test_lib_1.beforeEach(test_lib_1.inject([runtime_compiler_1.RuntimeCompiler], function (_compiler) { compiler = _compiler; }));
        test_lib_1.describe('compileInHost', function () {
            var protoViewFactorySpy;
            var someProtoView;
            test_lib_1.beforeEachBindings(function () {
                protoViewFactorySpy = new spies_1.SpyProtoViewFactory();
                someProtoView = new view_1.AppProtoView(null, null, null, null, null, null);
                protoViewFactorySpy.spy('createHost').andReturn(someProtoView);
                return [core_1.bind(proto_view_factory_1.ProtoViewFactory).toValue(protoViewFactorySpy)];
            });
            test_lib_1.it('should compile the template via TemplateCompiler', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var cht;
                protoViewFactorySpy.spy('createHost')
                    .andCallFake(function (_cht) {
                    cht = _cht;
                    return someProtoView;
                });
                compiler.compileInHost(SomeComponent)
                    .then(function (_) {
                    var beginComponentCmd = cht.getTemplate().getData('app1').commands[0];
                    test_lib_1.expect(beginComponentCmd.name).toEqual('some-comp');
                    async.done();
                });
            }));
        });
        test_lib_1.it('should cache the result', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            async_1.PromiseWrapper
                .all([compiler.compileInHost(SomeComponent), compiler.compileInHost(SomeComponent)])
                .then(function (protoViewRefs) {
                test_lib_1.expect(protoViewRefs[0]).toBe(protoViewRefs[1]);
                async.done();
            });
        }));
        test_lib_1.it('should clear the cache', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            compiler.compileInHost(SomeComponent)
                .then(function (protoViewRef1) {
                compiler.clearCache();
                compiler.compileInHost(SomeComponent)
                    .then(function (protoViewRef2) {
                    test_lib_1.expect(protoViewRef1)
                        .not.toBe(protoViewRef2);
                    async.done();
                });
            });
        }));
    });
}
exports.main = main;
var SomeComponent = (function () {
    function SomeComponent() {
    }
    SomeComponent = __decorate([
        core_1.Component({ selector: 'some-comp' }),
        core_1.View({ template: '' }), 
        __metadata('design:paramtypes', [])
    ], SomeComponent);
    return SomeComponent;
})();
//# sourceMappingURL=runtime_compiler_spec.js.map