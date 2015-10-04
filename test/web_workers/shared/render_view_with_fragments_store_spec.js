var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var test_lib_1 = require("angular2/test_lib");
var api_1 = require("angular2/src/core/render/api");
var render_view_with_fragments_store_1 = require("angular2/src/web_workers/shared/render_view_with_fragments_store");
var collection_1 = require("angular2/src/core/facade/collection");
function main() {
    test_lib_1.describe("RenderViewWithFragmentsStore", function () {
        test_lib_1.describe("on WebWorker", function () {
            var store;
            test_lib_1.beforeEach(function () { store = new render_view_with_fragments_store_1.RenderViewWithFragmentsStore(true); });
            test_lib_1.it("should allocate fragmentCount + 1 refs", function () {
                var view = store.allocate(10);
                var viewRef = view.viewRef;
                test_lib_1.expect(viewRef.refNumber).toEqual(0);
                var fragmentRefs = view.fragmentRefs;
                test_lib_1.expect(fragmentRefs.length).toEqual(10);
                for (var i = 0; i < fragmentRefs.length; i++) {
                    test_lib_1.expect(fragmentRefs[i].refNumber).toEqual(i + 1);
                }
            });
            test_lib_1.it("should not reuse a reference", function () {
                store.allocate(10);
                var view = store.allocate(0);
                var viewRef = view.viewRef;
                test_lib_1.expect(viewRef.refNumber).toEqual(11);
            });
            test_lib_1.it("should be serializable", function () {
                var view = store.allocate(1);
                test_lib_1.expect(store.deserializeViewWithFragments(store.serializeViewWithFragments(view)))
                    .toEqual(view);
            });
            test_lib_1.it("should remove a view and all attached fragments", function () {
                var NUM_FRAGMENTS = 5;
                var view = store.allocate(NUM_FRAGMENTS);
                var viewRef = view.viewRef.refNumber;
                store.remove(view.viewRef);
                test_lib_1.expect(store.deserializeRenderViewRef(viewRef++)).toBeNull();
                for (var i = 0; i < NUM_FRAGMENTS; i++) {
                    test_lib_1.expect(store.deserializeRenderFragmentRef(viewRef++)).toBeNull();
                }
            });
        });
        test_lib_1.describe("on UI", function () {
            var store;
            test_lib_1.beforeEach(function () { store = new render_view_with_fragments_store_1.RenderViewWithFragmentsStore(false); });
            function createMockRenderViewWithFragments() {
                var view = new MockRenderViewRef();
                var fragments = collection_1.ListWrapper.createGrowableSize(20);
                for (var i = 0; i < 20; i++) {
                    fragments[i] = new MockRenderFragmentRef();
                }
                return new api_1.RenderViewWithFragments(view, fragments);
            }
            test_lib_1.it("should associate views with the correct references", function () {
                var renderViewWithFragments = createMockRenderViewWithFragments();
                store.store(renderViewWithFragments, 100);
                test_lib_1.expect(store.deserializeRenderViewRef(100)).toBe(renderViewWithFragments.viewRef);
                for (var i = 0; i < renderViewWithFragments.fragmentRefs.length; i++) {
                    test_lib_1.expect(store.deserializeRenderFragmentRef(101 + i))
                        .toBe(renderViewWithFragments.fragmentRefs[i]);
                }
            });
            test_lib_1.describe("RenderViewWithFragments", function () {
                test_lib_1.it("should be serializable", function () {
                    var renderViewWithFragments = createMockRenderViewWithFragments();
                    store.store(renderViewWithFragments, 0);
                    var deserialized = store.deserializeViewWithFragments(store.serializeViewWithFragments(renderViewWithFragments));
                    test_lib_1.expect(deserialized.viewRef).toBe(renderViewWithFragments.viewRef);
                    test_lib_1.expect(deserialized.fragmentRefs.length)
                        .toEqual(renderViewWithFragments.fragmentRefs.length);
                    for (var i = 0; i < deserialized.fragmentRefs.length; i++) {
                        var val = deserialized.fragmentRefs[i];
                        test_lib_1.expect(val).toBe(renderViewWithFragments.fragmentRefs[i]);
                    }
                    ;
                });
            });
            test_lib_1.describe("RenderViewRef", function () {
                test_lib_1.it("should be serializable", function () {
                    var renderViewWithFragments = createMockRenderViewWithFragments();
                    store.store(renderViewWithFragments, 0);
                    var deserialized = store.deserializeRenderViewRef(store.serializeRenderViewRef(renderViewWithFragments.viewRef));
                    test_lib_1.expect(deserialized).toBe(renderViewWithFragments.viewRef);
                });
            });
            test_lib_1.describe("RenderFragmentRef", function () {
                test_lib_1.it("should be serializable", function () {
                    var renderViewWithFragments = createMockRenderViewWithFragments();
                    store.store(renderViewWithFragments, 0);
                    var serialized = store.serializeRenderFragmentRef(renderViewWithFragments.fragmentRefs[0]);
                    var deserialized = store.deserializeRenderFragmentRef(serialized);
                    test_lib_1.expect(deserialized).toBe(renderViewWithFragments.fragmentRefs[0]);
                });
            });
        });
    });
}
exports.main = main;
var MockRenderViewRef = (function (_super) {
    __extends(MockRenderViewRef, _super);
    function MockRenderViewRef() {
        _super.call(this);
    }
    return MockRenderViewRef;
})(api_1.RenderViewRef);
var MockRenderFragmentRef = (function (_super) {
    __extends(MockRenderFragmentRef, _super);
    function MockRenderFragmentRef() {
        _super.call(this);
    }
    return MockRenderFragmentRef;
})(api_1.RenderFragmentRef);
//# sourceMappingURL=render_view_with_fragments_store_spec.js.map