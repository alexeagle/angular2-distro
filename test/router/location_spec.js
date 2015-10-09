var test_lib_1 = require('angular2/test_lib');
var core_1 = require('angular2/core');
var lang_1 = require('angular2/src/core/facade/lang');
var location_1 = require('angular2/src/router/location');
var location_strategy_1 = require('angular2/src/router/location_strategy');
var mock_location_strategy_1 = require('angular2/src/mock/mock_location_strategy');
function main() {
    test_lib_1.describe('Location', function () {
        var locationStrategy, location;
        function makeLocation(baseHref, binding) {
            if (baseHref === void 0) { baseHref = '/my/app'; }
            if (binding === void 0) { binding = lang_1.CONST_EXPR([]); }
            locationStrategy = new mock_location_strategy_1.MockLocationStrategy();
            locationStrategy.internalBaseHref = baseHref;
            var injector = core_1.Injector.resolveAndCreate([location_1.Location, core_1.bind(location_strategy_1.LocationStrategy).toValue(locationStrategy), binding]);
            return location = injector.get(location_1.Location);
        }
        test_lib_1.beforeEach(makeLocation);
        test_lib_1.it('should normalize relative urls on navigate', function () {
            location.go('user/btford');
            test_lib_1.expect(locationStrategy.path()).toEqual('/my/app/user/btford');
        });
        test_lib_1.it('should not prepend urls with starting slash when an empty URL is provided', function () { test_lib_1.expect(location.normalizeAbsolutely('')).toEqual(locationStrategy.getBaseHref()); });
        test_lib_1.it('should not prepend path with an extra slash when a baseHref has a trailing slash', function () {
            var location = makeLocation('/my/slashed/app/');
            test_lib_1.expect(location.normalizeAbsolutely('/page')).toEqual('/my/slashed/app/page');
        });
        test_lib_1.it('should not append urls with leading slash on navigate', function () {
            location.go('/my/app/user/btford');
            test_lib_1.expect(locationStrategy.path()).toEqual('/my/app/user/btford');
        });
        test_lib_1.it('should remove index.html from base href', function () {
            var location = makeLocation('/my/app/index.html');
            location.go('user/btford');
            test_lib_1.expect(locationStrategy.path()).toEqual('/my/app/user/btford');
        });
        test_lib_1.it('should normalize urls on popstate', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            locationStrategy.simulatePopState('/my/app/user/btford');
            location.subscribe(function (ev) {
                test_lib_1.expect(ev['url']).toEqual('/user/btford');
                async.done();
            });
        }));
        test_lib_1.it('should normalize location path', function () {
            locationStrategy.internalPath = '/my/app/user/btford';
            test_lib_1.expect(location.path()).toEqual('/user/btford');
        });
        test_lib_1.it('should use optional base href param', function () {
            var location = makeLocation('/', core_1.bind(location_1.APP_BASE_HREF).toValue('/my/custom/href'));
            location.go('user/btford');
            test_lib_1.expect(locationStrategy.path()).toEqual('/my/custom/href/user/btford');
        });
        test_lib_1.it('should throw when no base href is provided', function () {
            var locationStrategy = new mock_location_strategy_1.MockLocationStrategy();
            locationStrategy.internalBaseHref = null;
            test_lib_1.expect(function () { return new location_1.Location(locationStrategy); })
                .toThrowError("No base href set. Either provide a binding for the APP_BASE_HREF token or add a base element to the document.");
        });
        test_lib_1.it('should revert to the previous path when a back() operation is executed', function () {
            var locationStrategy = new mock_location_strategy_1.MockLocationStrategy();
            var location = new location_1.Location(locationStrategy);
            function assertUrl(path) { test_lib_1.expect(location.path()).toEqual(path); }
            location.go('/ready');
            assertUrl('/ready');
            location.go('/ready/set');
            assertUrl('/ready/set');
            location.go('/ready/set/go');
            assertUrl('/ready/set/go');
            location.back();
            assertUrl('/ready/set');
            location.back();
            assertUrl('/ready');
        });
    });
}
exports.main = main;
//# sourceMappingURL=location_spec.js.map