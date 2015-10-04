var test_lib_1 = require('angular2/test_lib');
var spies_1 = require('../spies');
var view_1 = require('angular2/src/core/linker/view');
var view_container_ref_1 = require('angular2/src/core/linker/view_container_ref');
var element_ref_1 = require('angular2/src/core/linker/element_ref');
var view_ref_1 = require('angular2/src/core/linker/view_ref');
function main() {
    // TODO(tbosch): add missing tests
    test_lib_1.describe('ViewContainerRef', function () {
        var location;
        var view;
        var viewManager;
        function createViewContainer() { return new view_container_ref_1.ViewContainerRef(viewManager, location); }
        test_lib_1.beforeEach(function () {
            viewManager = new spies_1.SpyAppViewManager();
            view = new spies_1.SpyView();
            view.prop("viewContainers", [null]);
            location = new element_ref_1.ElementRef(new view_ref_1.ViewRef(view), 0, null);
        });
        test_lib_1.describe('length', function () {
            test_lib_1.it('should return a 0 length if there is no underlying AppViewContainer', function () {
                var vc = createViewContainer();
                test_lib_1.expect(vc.length).toBe(0);
            });
            test_lib_1.it('should return the size of the underlying AppViewContainer', function () {
                var vc = createViewContainer();
                var appVc = new view_1.AppViewContainer();
                view.prop("viewContainers", [appVc]);
                appVc.views = [new spies_1.SpyView()];
                test_lib_1.expect(vc.length).toBe(1);
            });
        });
        // TODO: add missing tests here!
    });
}
exports.main = main;
//# sourceMappingURL=view_container_ref_spec.js.map