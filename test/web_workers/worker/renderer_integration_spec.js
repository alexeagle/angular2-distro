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
var test_lib_1 = require("angular2/test_lib");
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
var core_1 = require('angular2/core');
var renderer_1 = require("angular2/src/web_workers/worker/renderer");
var client_message_broker_1 = require("angular2/src/web_workers/shared/client_message_broker");
var serializer_1 = require("angular2/src/web_workers/shared/serializer");
var api_1 = require("angular2/src/core/render/api");
var dom_renderer_1 = require('angular2/src/core/render/dom/dom_renderer');
var render_proto_view_ref_store_1 = require("angular2/src/web_workers/shared/render_proto_view_ref_store");
var render_view_with_fragments_store_1 = require('angular2/src/web_workers/shared/render_view_with_fragments_store');
var impl_1 = require('angular2/src/web_workers/ui/impl');
var renderer_2 = require('angular2/src/web_workers/ui/renderer');
var web_worker_test_util_1 = require('../shared/web_worker_test_util');
var service_message_broker_1 = require('angular2/src/web_workers/shared/service_message_broker');
var event_dispatcher_1 = require('angular2/src/web_workers/worker/event_dispatcher');
function main() {
    function createWebWorkerBrokerFactory(messageBuses, workerSerializer, uiSerializer, domRenderer, uiRenderProtoViewStore, uiRenderViewStore) {
        var uiMessageBus = messageBuses.ui;
        var workerMessageBus = messageBuses.worker;
        // set up the worker side
        var webWorkerBrokerFactory = new client_message_broker_1.ClientMessageBrokerFactory(workerMessageBus, workerSerializer);
        // set up the ui side
        var uiMessageBrokerFactory = new service_message_broker_1.ServiceMessageBrokerFactory(uiMessageBus, uiSerializer);
        var renderer = new renderer_2.MessageBasedRenderer(uiMessageBrokerFactory, uiMessageBus, uiSerializer, uiRenderProtoViewStore, uiRenderViewStore, domRenderer);
        renderer.start();
        new impl_1.WebWorkerApplication(null, null);
        return webWorkerBrokerFactory;
    }
    function createWorkerRenderer(workerSerializer, uiSerializer, domRenderer, uiRenderProtoViewStore, uiRenderViewStore, workerRenderProtoViewStore, workerRenderViewStore) {
        var messageBuses = web_worker_test_util_1.createPairedMessageBuses();
        var brokerFactory = createWebWorkerBrokerFactory(messageBuses, workerSerializer, uiSerializer, domRenderer, uiRenderProtoViewStore, uiRenderViewStore);
        var workerEventDispatcher = new event_dispatcher_1.WebWorkerEventDispatcher(messageBuses.worker, workerSerializer);
        return new renderer_1.WebWorkerRenderer(brokerFactory, workerRenderProtoViewStore, workerRenderViewStore, workerEventDispatcher);
    }
    test_lib_1.describe("Web Worker Renderer", function () {
        var uiInjector;
        var uiRenderViewStore;
        test_lib_1.beforeEachBindings(function () {
            var uiRenderProtoViewStore = new render_proto_view_ref_store_1.RenderProtoViewRefStore(false);
            uiRenderViewStore = new render_view_with_fragments_store_1.RenderViewWithFragmentsStore(false);
            uiInjector = test_lib_1.createTestInjector([
                core_1.bind(render_proto_view_ref_store_1.RenderProtoViewRefStore)
                    .toValue(uiRenderProtoViewStore),
                core_1.bind(render_view_with_fragments_store_1.RenderViewWithFragmentsStore).toValue(uiRenderViewStore),
                core_1.bind(api_1.Renderer).toClass(dom_renderer_1.DomRenderer)
            ]);
            var uiSerializer = uiInjector.get(serializer_1.Serializer);
            var domRenderer = uiInjector.get(dom_renderer_1.DomRenderer);
            var workerRenderProtoViewStore = new render_proto_view_ref_store_1.RenderProtoViewRefStore(true);
            var workerRenderViewStore = new render_view_with_fragments_store_1.RenderViewWithFragmentsStore(true);
            return [
                core_1.bind(render_proto_view_ref_store_1.RenderProtoViewRefStore)
                    .toValue(workerRenderProtoViewStore),
                core_1.bind(render_view_with_fragments_store_1.RenderViewWithFragmentsStore).toValue(workerRenderViewStore),
                core_1.bind(api_1.Renderer).toFactory(function (workerSerializer) {
                    return createWorkerRenderer(workerSerializer, uiSerializer, domRenderer, uiRenderProtoViewStore, uiRenderViewStore, workerRenderProtoViewStore, workerRenderViewStore);
                }, [serializer_1.Serializer])
            ];
        });
        function getRenderElement(elementRef) {
            var renderView = uiRenderViewStore.deserializeRenderViewRef(elementRef.renderView.refNumber);
            return renderView.boundElements[elementRef.boundElementIndex];
        }
        test_lib_1.it('should update text nodes', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MyComp, new core_1.ViewMetadata({ template: '<div>{{ctxProp}}</div>' }))
                .createAsync(MyComp)
                .then(function (rootTC) {
                var renderEl = getRenderElement(rootTC.debugElement.elementRef);
                test_lib_1.expect(renderEl).toHaveText('');
                rootTC.debugElement.componentInstance.ctxProp = 'Hello World!';
                rootTC.detectChanges();
                test_lib_1.expect(renderEl).toHaveText('Hello World!');
                async.done();
            });
        }));
        test_lib_1.it('should update any element property/attributes/class/style independent of the compilation on the root element and other elements', test_lib_1.inject([test_lib_1.TestComponentBuilder, api_1.Renderer, test_lib_1.AsyncTestCompleter], function (tcb, renderer, async) {
            tcb.overrideView(MyComp, new core_1.ViewMetadata({ template: '<input [title]="y" style="position:absolute">' }))
                .createAsync(MyComp)
                .then(function (rootTC) {
                var checkSetters = function (elr) {
                    var el = getRenderElement(elr);
                    renderer.setElementProperty(elr, 'tabIndex', 1);
                    test_lib_1.expect(el.tabIndex).toEqual(1);
                    renderer.setElementClass(elr, 'a', true);
                    test_lib_1.expect(dom_adapter_1.DOM.hasClass(el, 'a')).toBe(true);
                    renderer.setElementClass(elr, 'a', false);
                    test_lib_1.expect(dom_adapter_1.DOM.hasClass(el, 'a')).toBe(false);
                    renderer.setElementStyle(elr, 'width', '10px');
                    test_lib_1.expect(dom_adapter_1.DOM.getStyle(el, 'width')).toEqual('10px');
                    renderer.setElementStyle(elr, 'width', null);
                    test_lib_1.expect(dom_adapter_1.DOM.getStyle(el, 'width')).toEqual('');
                    renderer.setElementAttribute(elr, 'someAttr', 'someValue');
                    test_lib_1.expect(dom_adapter_1.DOM.getAttribute(el, 'some-attr')).toEqual('someValue');
                };
                // root element
                checkSetters(rootTC.debugElement.elementRef);
                // nested elements
                checkSetters(rootTC.debugElement.componentViewChildren[0].elementRef);
                async.done();
            });
        }));
        test_lib_1.it('should add and remove fragments', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MyComp, new core_1.ViewMetadata({
                template: '<template [ng-if]="ctxBoolProp">hello</template>',
                directives: [core_1.NgIf]
            }))
                .createAsync(MyComp)
                .then(function (rootTC) {
                var rootEl = getRenderElement(rootTC.debugElement.elementRef);
                test_lib_1.expect(rootEl).toHaveText('');
                rootTC.debugElement.componentInstance.ctxBoolProp = true;
                rootTC.detectChanges();
                test_lib_1.expect(rootEl).toHaveText('hello');
                rootTC.debugElement.componentInstance.ctxBoolProp = false;
                rootTC.detectChanges();
                test_lib_1.expect(rootEl).toHaveText('');
                async.done();
            });
        }));
        if (dom_adapter_1.DOM.supportsDOMEvents()) {
            test_lib_1.it('should call actions on the element independent of the compilation', test_lib_1.inject([test_lib_1.TestComponentBuilder, api_1.Renderer, test_lib_1.AsyncTestCompleter], function (tcb, renderer, async) {
                tcb.overrideView(MyComp, new core_1.ViewMetadata({ template: '<input [title]="y"></input>' }))
                    .createAsync(MyComp)
                    .then(function (rootTC) {
                    var elRef = rootTC.debugElement.componentViewChildren[0].elementRef;
                    renderer.invokeElementMethod(elRef, 'setAttribute', ['a', 'b']);
                    test_lib_1.expect(dom_adapter_1.DOM.getAttribute(getRenderElement(elRef), 'a')).toEqual('b');
                    async.done();
                });
            }));
        }
    });
}
exports.main = main;
var MyComp = (function () {
    function MyComp() {
        this.ctxProp = 'initial value';
        this.ctxNumProp = 0;
        this.ctxBoolProp = false;
    }
    MyComp.prototype.throwError = function () { throw 'boom'; };
    MyComp = __decorate([
        core_1.Component({ selector: 'my-comp' }),
        core_1.View({ directives: [] }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MyComp);
    return MyComp;
})();
//# sourceMappingURL=renderer_integration_spec.js.map