var test_lib_1 = require('angular2/test_lib');
var core_1 = require('angular2/core');
function main() {
    test_lib_1.describe('binding', function () {
        test_lib_1.describe('type errors', function () {
            test_lib_1.it('should throw when trying to create a class binding and not passing a class', function () {
                test_lib_1.expect(function () { core_1.bind('foo').toClass(0); })
                    .toThrowError('Trying to create a class binding but "0" is not a class!');
            });
            test_lib_1.it('should throw when trying to create a factory binding and not passing a function', function () {
                test_lib_1.expect(function () { core_1.bind('foo').toFactory(0); })
                    .toThrowError('Trying to create a factory binding but "0" is not a function!');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=binding_spec.js.map