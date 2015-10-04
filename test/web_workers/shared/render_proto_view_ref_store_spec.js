var test_lib_1 = require("angular2/test_lib");
var api_1 = require("angular2/src/core/render/api");
var render_proto_view_ref_store_1 = require("angular2/src/web_workers/shared/render_proto_view_ref_store");
function main() {
    test_lib_1.describe("RenderProtoViewRefStore", function () {
        test_lib_1.describe("on WebWorker", function () {
            var store;
            test_lib_1.beforeEach(function () { store = new render_proto_view_ref_store_1.RenderProtoViewRefStore(true); });
            test_lib_1.it("should allocate refs", function () {
                test_lib_1.expect(store.allocate().refNumber).toBe(0);
                test_lib_1.expect(store.allocate().refNumber).toBe(1);
            });
            test_lib_1.it("should be serializable", function () {
                var protoView = store.allocate();
                test_lib_1.expect(store.deserialize(store.serialize(protoView))).toEqual(protoView);
            });
        });
        test_lib_1.describe("on UI", function () {
            var store;
            test_lib_1.beforeEach(function () { store = new render_proto_view_ref_store_1.RenderProtoViewRefStore(false); });
            test_lib_1.it("should associate views with the correct references", function () {
                var renderProtoViewRef = new api_1.RenderProtoViewRef();
                store.store(renderProtoViewRef, 100);
                test_lib_1.expect(store.deserialize(100)).toBe(renderProtoViewRef);
            });
            test_lib_1.it("should be serializable", function () {
                var renderProtoViewRef = new api_1.RenderProtoViewRef();
                store.store(renderProtoViewRef, 0);
                var deserialized = store.deserialize(store.serialize(renderProtoViewRef));
                test_lib_1.expect(deserialized).toBe(renderProtoViewRef);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=render_proto_view_ref_store_spec.js.map