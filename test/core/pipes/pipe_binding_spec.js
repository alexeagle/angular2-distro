var test_lib_1 = require('angular2/test_lib');
var pipe_binding_1 = require('angular2/src/core/pipes/pipe_binding');
var metadata_1 = require('angular2/src/core/metadata');
var MyPipe = (function () {
    function MyPipe() {
    }
    return MyPipe;
})();
function main() {
    test_lib_1.describe("PipeBinding", function () {
        test_lib_1.it('should create a binding out of a type', function () {
            var binding = pipe_binding_1.PipeBinding.createFromType(MyPipe, new metadata_1.Pipe({ name: 'my-pipe' }));
            test_lib_1.expect(binding.name).toEqual('my-pipe');
            test_lib_1.expect(binding.key.token).toEqual(MyPipe);
        });
    });
}
exports.main = main;
//# sourceMappingURL=pipe_binding_spec.js.map