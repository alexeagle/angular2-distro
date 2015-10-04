var test_lib_1 = require('angular2/test_lib');
var spies_1 = require('../../spies');
var iterable_differs_1 = require('angular2/src/core/change_detection/differs/iterable_differs');
var core_1 = require('angular2/core');
function main() {
    test_lib_1.describe('IterableDiffers', function () {
        var factory1;
        var factory2;
        var factory3;
        test_lib_1.beforeEach(function () {
            factory1 = new spies_1.SpyIterableDifferFactory();
            factory2 = new spies_1.SpyIterableDifferFactory();
            factory3 = new spies_1.SpyIterableDifferFactory();
        });
        test_lib_1.it('should throw when no suitable implementation found', function () {
            var differs = new iterable_differs_1.IterableDiffers([]);
            test_lib_1.expect(function () { return differs.find("some object"); })
                .toThrowErrorWith("Cannot find a differ supporting object 'some object'");
        });
        test_lib_1.it('should return the first suitable implementation', function () {
            factory1.spy("supports").andReturn(false);
            factory2.spy("supports").andReturn(true);
            factory3.spy("supports").andReturn(true);
            var differs = iterable_differs_1.IterableDiffers.create([factory1, factory2, factory3]);
            test_lib_1.expect(differs.find("some object")).toBe(factory2);
        });
        test_lib_1.it('should copy over differs from the parent repo', function () {
            factory1.spy("supports").andReturn(true);
            factory2.spy("supports").andReturn(false);
            var parent = iterable_differs_1.IterableDiffers.create([factory1]);
            var child = iterable_differs_1.IterableDiffers.create([factory2], parent);
            test_lib_1.expect(child.factories).toEqual([factory2, factory1]);
        });
        test_lib_1.describe(".extend()", function () {
            test_lib_1.it('should throw if calling extend when creating root injector', function () {
                var injector = core_1.Injector.resolveAndCreate([iterable_differs_1.IterableDiffers.extend([])]);
                test_lib_1.expect(function () { return injector.get(iterable_differs_1.IterableDiffers); })
                    .toThrowErrorWith("Cannot extend IterableDiffers without a parent injector");
            });
            test_lib_1.it('should extend di-inherited diffesr', function () {
                var parent = new iterable_differs_1.IterableDiffers([factory1]);
                var injector = core_1.Injector.resolveAndCreate([core_1.bind(iterable_differs_1.IterableDiffers).toValue(parent)]);
                var childInjector = injector.resolveAndCreateChild([iterable_differs_1.IterableDiffers.extend([factory2])]);
                test_lib_1.expect(injector.get(iterable_differs_1.IterableDiffers).factories).toEqual([factory1]);
                test_lib_1.expect(childInjector.get(iterable_differs_1.IterableDiffers).factories).toEqual([factory2, factory1]);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=iterable_differs_spec.js.map