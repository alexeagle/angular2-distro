var test_lib_1 = require('angular2/test_lib');
var serializer_1 = require('angular2/src/web_workers/shared/serializer');
var api_1 = require('angular2/src/web_workers/shared/api');
var core_1 = require('angular2/core');
var render_proto_view_ref_store_1 = require('angular2/src/web_workers/shared/render_proto_view_ref_store');
var render_view_with_fragments_store_1 = require('angular2/src/web_workers/shared/render_view_with_fragments_store');
var api_2 = require('angular2/src/core/render/api');
var web_worker_test_util_1 = require('../shared/web_worker_test_util');
var event_dispatcher_1 = require('angular2/src/web_workers/worker/event_dispatcher');
var async_1 = require('angular2/src/core/facade/async');
var messaging_api_1 = require('angular2/src/web_workers/shared/messaging_api');
function main() {
    test_lib_1.describe("EventDispatcher", function () {
        test_lib_1.beforeEachBindings(function () { return [
            core_1.bind(api_1.ON_WEB_WORKER)
                .toValue(true),
            render_proto_view_ref_store_1.RenderProtoViewRefStore,
            render_view_with_fragments_store_1.RenderViewWithFragmentsStore
        ]; });
        test_lib_1.it("should dispatch events", test_lib_1.inject([serializer_1.Serializer, test_lib_1.AsyncTestCompleter], function (serializer, async) {
            var messageBuses = web_worker_test_util_1.createPairedMessageBuses();
            var webWorkerEventDispatcher = new event_dispatcher_1.WebWorkerEventDispatcher(messageBuses.worker, serializer);
            var elementIndex = 15;
            var eventName = 'click';
            var eventDispatcher = new SpyEventDispatcher(function (elementIndex, eventName, locals) {
                test_lib_1.expect(elementIndex).toEqual(elementIndex);
                test_lib_1.expect(eventName).toEqual(eventName);
                async.done();
            });
            var viewRef = new render_view_with_fragments_store_1.WebWorkerRenderViewRef(0);
            serializer.allocateRenderViews(0); // serialize the ref so it's in the store
            viewRef =
                serializer.deserialize(serializer.serialize(viewRef, api_2.RenderViewRef), api_2.RenderViewRef);
            webWorkerEventDispatcher.registerEventDispatcher(viewRef, eventDispatcher);
            async_1.ObservableWrapper.callNext(messageBuses.ui.to(messaging_api_1.EVENT_CHANNEL), {
                'viewRef': viewRef.serialize(),
                'elementIndex': elementIndex,
                'eventName': eventName,
                'locals': { '$event': { 'target': { value: null } } }
            });
        }));
    });
}
exports.main = main;
var SpyEventDispatcher = (function () {
    function SpyEventDispatcher(_callback) {
        this._callback = _callback;
    }
    SpyEventDispatcher.prototype.dispatchRenderEvent = function (elementIndex, eventName, locals) {
        this._callback(elementIndex, eventName, locals);
        return false;
    };
    return SpyEventDispatcher;
})();
//# sourceMappingURL=event_dispatcher_spec.js.map