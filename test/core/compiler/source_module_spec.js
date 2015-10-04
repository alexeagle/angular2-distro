var test_lib_1 = require('angular2/test_lib');
var source_module_1 = require('angular2/src/core/compiler/source_module');
function main() {
    test_lib_1.describe('SourceModule', function () {
        test_lib_1.describe('getSourceWithImports', function () {
            test_lib_1.it('should generate named imports for modules', function () {
                var sourceWithImports = new source_module_1.SourceModule('package:some/moda', source_module_1.moduleRef('package:some/modb') + "A")
                    .getSourceWithImports();
                test_lib_1.expect(sourceWithImports.source).toEqual('import0.A');
                test_lib_1.expect(sourceWithImports.imports).toEqual([['package:some/modb', 'import0']]);
            });
            test_lib_1.it('should dedupe imports', function () {
                var sourceWithImports = new source_module_1.SourceModule('package:some/moda', source_module_1.moduleRef('package:some/modb') + "A + " + source_module_1.moduleRef('package:some/modb') + "B")
                    .getSourceWithImports();
                test_lib_1.expect(sourceWithImports.source).toEqual('import0.A + import0.B');
                test_lib_1.expect(sourceWithImports.imports).toEqual([['package:some/modb', 'import0']]);
            });
            test_lib_1.it('should not use an import for the moduleUrl of the SourceModule', function () {
                var sourceWithImports = new source_module_1.SourceModule('package:some/moda', source_module_1.moduleRef('package:some/moda') + "A")
                    .getSourceWithImports();
                test_lib_1.expect(sourceWithImports.source).toEqual('A');
                test_lib_1.expect(sourceWithImports.imports).toEqual([]);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=source_module_spec.js.map