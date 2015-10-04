var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var test_lib_1 = require('angular2/test_lib');
var event_manager_1 = require('angular2/src/core/render/dom/events/event_manager');
var ng_zone_1 = require('angular2/src/core/zone/ng_zone');
var collection_1 = require('angular2/src/core/facade/collection');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
function main() {
    var domEventPlugin;
    test_lib_1.beforeEach(function () { domEventPlugin = new event_manager_1.DomEventsPlugin(); });
    test_lib_1.describe('EventManager', function () {
        test_lib_1.it('should delegate event bindings to plugins that are passed in from the most generic one to the most specific one', function () {
            var element = test_lib_1.el('<div></div>');
            var handler = function (e) { return e; };
            var plugin = new FakeEventManagerPlugin(['click']);
            var manager = new event_manager_1.EventManager([domEventPlugin, plugin], new FakeNgZone());
            manager.addEventListener(element, 'click', handler);
            test_lib_1.expect(plugin._eventHandler.get('click')).toBe(handler);
        });
        test_lib_1.it('should delegate event bindings to the first plugin supporting the event', function () {
            var element = test_lib_1.el('<div></div>');
            var clickHandler = function (e) { return e; };
            var dblClickHandler = function (e) { return e; };
            var plugin1 = new FakeEventManagerPlugin(['dblclick']);
            var plugin2 = new FakeEventManagerPlugin(['click', 'dblclick']);
            var manager = new event_manager_1.EventManager([plugin2, plugin1], new FakeNgZone());
            manager.addEventListener(element, 'click', clickHandler);
            manager.addEventListener(element, 'dblclick', dblClickHandler);
            test_lib_1.expect(plugin1._eventHandler.has('click')).toBe(false);
            test_lib_1.expect(plugin2._eventHandler.get('click')).toBe(clickHandler);
            test_lib_1.expect(plugin2._eventHandler.has('dblclick')).toBe(false);
            test_lib_1.expect(plugin1._eventHandler.get('dblclick')).toBe(dblClickHandler);
        });
        test_lib_1.it('should throw when no plugin can handle the event', function () {
            var element = test_lib_1.el('<div></div>');
            var plugin = new FakeEventManagerPlugin(['dblclick']);
            var manager = new event_manager_1.EventManager([plugin], new FakeNgZone());
            test_lib_1.expect(function () { return manager.addEventListener(element, 'click', null); })
                .toThrowError('No event manager plugin found for event click');
        });
        test_lib_1.it('events are caught when fired from a child', function () {
            var element = test_lib_1.el('<div><div></div></div>');
            // Workaround for https://bugs.webkit.org/show_bug.cgi?id=122755
            dom_adapter_1.DOM.appendChild(dom_adapter_1.DOM.defaultDoc().body, element);
            var child = dom_adapter_1.DOM.firstChild(element);
            var dispatchedEvent = dom_adapter_1.DOM.createMouseEvent('click');
            var receivedEvent = null;
            var handler = function (e) { receivedEvent = e; };
            var manager = new event_manager_1.EventManager([domEventPlugin], new FakeNgZone());
            manager.addEventListener(element, 'click', handler);
            dom_adapter_1.DOM.dispatchEvent(child, dispatchedEvent);
            test_lib_1.expect(receivedEvent).toBe(dispatchedEvent);
        });
        test_lib_1.it('should add and remove global event listeners', function () {
            var element = test_lib_1.el('<div><div></div></div>');
            dom_adapter_1.DOM.appendChild(dom_adapter_1.DOM.defaultDoc().body, element);
            var dispatchedEvent = dom_adapter_1.DOM.createMouseEvent('click');
            var receivedEvent = null;
            var handler = function (e) { receivedEvent = e; };
            var manager = new event_manager_1.EventManager([domEventPlugin], new FakeNgZone());
            var remover = manager.addGlobalEventListener("document", 'click', handler);
            dom_adapter_1.DOM.dispatchEvent(element, dispatchedEvent);
            test_lib_1.expect(receivedEvent).toBe(dispatchedEvent);
            receivedEvent = null;
            remover();
            dom_adapter_1.DOM.dispatchEvent(element, dispatchedEvent);
            test_lib_1.expect(receivedEvent).toBe(null);
        });
    });
}
exports.main = main;
var FakeEventManagerPlugin = (function (_super) {
    __extends(FakeEventManagerPlugin, _super);
    function FakeEventManagerPlugin(_supports) {
        _super.call(this);
        this._supports = _supports;
        this._eventHandler = new collection_1.Map();
    }
    FakeEventManagerPlugin.prototype.supports = function (eventName) { return collection_1.ListWrapper.contains(this._supports, eventName); };
    FakeEventManagerPlugin.prototype.addEventListener = function (element, eventName, handler) {
        var _this = this;
        this._eventHandler.set(eventName, handler);
        return function () { collection_1.MapWrapper.delete(_this._eventHandler, eventName); };
    };
    return FakeEventManagerPlugin;
})(event_manager_1.EventManagerPlugin);
var FakeNgZone = (function (_super) {
    __extends(FakeNgZone, _super);
    function FakeNgZone() {
        _super.call(this, { enableLongStackTrace: false });
    }
    FakeNgZone.prototype.run = function (fn) { fn(); };
    FakeNgZone.prototype.runOutsideAngular = function (fn) { return fn(); };
    return FakeNgZone;
})(ng_zone_1.NgZone);
//# sourceMappingURL=event_manager_spec.js.map