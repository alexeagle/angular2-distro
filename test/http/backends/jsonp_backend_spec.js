var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var test_lib_1 = require('angular2/test_lib');
var browser_jsonp_1 = require('angular2/src/http/backends/browser_jsonp');
var jsonp_backend_1 = require('angular2/src/http/backends/jsonp_backend');
var core_1 = require('angular2/core');
var lang_1 = require('angular2/src/core/facade/lang');
var async_1 = require('angular2/src/core/facade/async');
var static_request_1 = require('angular2/src/http/static_request');
var collection_1 = require('angular2/src/core/facade/collection');
var base_request_options_1 = require('angular2/src/http/base_request_options');
var base_response_options_1 = require('angular2/src/http/base_response_options');
var enums_1 = require('angular2/src/http/enums');
var addEventListenerSpy;
var existingScripts = [];
var unused;
var MockBrowserJsonp = (function (_super) {
    __extends(MockBrowserJsonp, _super);
    function MockBrowserJsonp() {
        _super.call(this);
        this.callbacks = new collection_1.Map();
    }
    MockBrowserJsonp.prototype.addEventListener = function (type, cb) { this.callbacks.set(type, cb); };
    MockBrowserJsonp.prototype.removeEventListener = function (type, cb) { this.callbacks.delete(type); };
    MockBrowserJsonp.prototype.dispatchEvent = function (type, argument) {
        if (!lang_1.isPresent(argument)) {
            argument = {};
        }
        var cb = this.callbacks.get(type);
        if (lang_1.isPresent(cb)) {
            cb(argument);
        }
    };
    MockBrowserJsonp.prototype.build = function (url) {
        var script = new MockBrowserJsonp();
        script.src = url;
        existingScripts.push(script);
        return script;
    };
    MockBrowserJsonp.prototype.send = function (node) {
    };
    MockBrowserJsonp.prototype.cleanup = function (node) {
    };
    return MockBrowserJsonp;
})(browser_jsonp_1.BrowserJsonp);
function main() {
    test_lib_1.describe('JSONPBackend', function () {
        var backend;
        var sampleRequest;
        test_lib_1.beforeEach(function () {
            var injector = core_1.Injector.resolveAndCreate([
                core_1.bind(base_response_options_1.ResponseOptions)
                    .toClass(base_response_options_1.BaseResponseOptions),
                core_1.bind(browser_jsonp_1.BrowserJsonp).toClass(MockBrowserJsonp),
                jsonp_backend_1.JSONPBackend
            ]);
            backend = injector.get(jsonp_backend_1.JSONPBackend);
            var base = new base_request_options_1.BaseRequestOptions();
            sampleRequest = new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ url: 'https://google.com' })));
        });
        test_lib_1.afterEach(function () { existingScripts = []; });
        test_lib_1.it('should create a connection', function () {
            var instance;
            test_lib_1.expect(function () { return instance = backend.createConnection(sampleRequest); }).not.toThrow();
            test_lib_1.expect(instance).toBeAnInstanceOf(jsonp_backend_1.JSONPConnection);
        });
        test_lib_1.describe('JSONPConnection', function () {
            test_lib_1.it('should use the injected BaseResponseOptions to create the response', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var connection = new jsonp_backend_1.JSONPConnection(sampleRequest, new MockBrowserJsonp(), new base_response_options_1.ResponseOptions({ type: enums_1.ResponseTypes.Error }));
                connection.response.subscribe(function (res) {
                    test_lib_1.expect(res.type).toBe(enums_1.ResponseTypes.Error);
                    async.done();
                });
                connection.finished();
                existingScripts[0].dispatchEvent('load');
            }));
            test_lib_1.it('should ignore load/callback when disposed', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var connection = new jsonp_backend_1.JSONPConnection(sampleRequest, new MockBrowserJsonp());
                var spy = new test_lib_1.SpyObject();
                var loadSpy = spy.spy('load');
                var errorSpy = spy.spy('error');
                var returnSpy = spy.spy('cancelled');
                var request = connection.response.subscribe(loadSpy, errorSpy, returnSpy);
                request.unsubscribe();
                connection.finished('Fake data');
                existingScripts[0].dispatchEvent('load');
                async_1.TimerWrapper.setTimeout(function () {
                    test_lib_1.expect(connection.readyState).toBe(enums_1.ReadyStates.Cancelled);
                    test_lib_1.expect(loadSpy).not.toHaveBeenCalled();
                    test_lib_1.expect(errorSpy).not.toHaveBeenCalled();
                    test_lib_1.expect(returnSpy).not.toHaveBeenCalled();
                    async.done();
                }, 10);
            }));
            test_lib_1.it('should report error if loaded without invoking callback', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var connection = new jsonp_backend_1.JSONPConnection(sampleRequest, new MockBrowserJsonp());
                connection.response.subscribe(function (res) {
                    test_lib_1.expect("response listener called").toBe(false);
                    async.done();
                }, function (err) {
                    test_lib_1.expect(lang_1.StringWrapper.contains(err.message, 'did not invoke callback')).toBe(true);
                    async.done();
                });
                existingScripts[0].dispatchEvent('load');
            }));
            test_lib_1.it('should report error if script contains error', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var connection = new jsonp_backend_1.JSONPConnection(sampleRequest, new MockBrowserJsonp());
                connection.response.subscribe(function (res) {
                    test_lib_1.expect("response listener called").toBe(false);
                    async.done();
                }, function (err) {
                    test_lib_1.expect(err['message']).toBe('Oops!');
                    async.done();
                });
                existingScripts[0].dispatchEvent('error', ({ message: "Oops!" }));
            }));
            test_lib_1.it('should throw if request method is not GET', function () {
                [enums_1.RequestMethods.Post, enums_1.RequestMethods.Put, enums_1.RequestMethods.Delete, enums_1.RequestMethods.Options,
                    enums_1.RequestMethods.Head, enums_1.RequestMethods.Patch]
                    .forEach(function (method) {
                    var base = new base_request_options_1.BaseRequestOptions();
                    var req = new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ url: 'https://google.com', method: method })));
                    test_lib_1.expect(function () { return new jsonp_backend_1.JSONPConnection(req, new MockBrowserJsonp()).response.subscribe(); })
                        .toThrowError();
                });
            });
            test_lib_1.it('should respond with data passed to callback', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var connection = new jsonp_backend_1.JSONPConnection(sampleRequest, new MockBrowserJsonp());
                connection.response.subscribe(function (res) {
                    test_lib_1.expect(res.json()).toEqual(({ fake_payload: true, blob_id: 12345 }));
                    async.done();
                });
                connection.finished(({ fake_payload: true, blob_id: 12345 }));
                existingScripts[0].dispatchEvent('load');
            }));
        });
    });
}
exports.main = main;
//# sourceMappingURL=jsonp_backend_spec.js.map