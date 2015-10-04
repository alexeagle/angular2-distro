var test_lib_1 = require('angular2/test_lib');
var mock_backend_1 = require('angular2/src/http/backends/mock_backend');
var core_1 = require('angular2/core');
var static_request_1 = require('angular2/src/http/static_request');
var static_response_1 = require('angular2/src/http/static_response');
var base_request_options_1 = require('angular2/src/http/base_request_options');
var base_response_options_1 = require('angular2/src/http/base_response_options');
function main() {
    test_lib_1.describe('MockBackend', function () {
        var backend;
        var sampleRequest1;
        var sampleResponse1;
        var sampleRequest2;
        var sampleResponse2;
        var connection;
        test_lib_1.beforeEach(function () {
            var injector = core_1.Injector.resolveAndCreate([core_1.bind(base_response_options_1.ResponseOptions).toClass(base_response_options_1.BaseResponseOptions), mock_backend_1.MockBackend]);
            backend = injector.get(mock_backend_1.MockBackend);
            var base = new base_request_options_1.BaseRequestOptions();
            sampleRequest1 = new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ url: 'https://google.com' })));
            sampleResponse1 = new static_response_1.Response(new base_response_options_1.ResponseOptions({ body: 'response1' }));
            sampleRequest2 = new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ url: 'https://google.com' })));
            sampleResponse2 = new static_response_1.Response(new base_response_options_1.ResponseOptions({ body: 'response2' }));
        });
        test_lib_1.it('should create a new MockBackend', function () { test_lib_1.expect(backend).toBeAnInstanceOf(mock_backend_1.MockBackend); });
        test_lib_1.it('should create a new MockConnection', function () { test_lib_1.expect(backend.createConnection(sampleRequest1)).toBeAnInstanceOf(mock_backend_1.MockConnection); });
        test_lib_1.it('should create a new connection and allow subscription', function () {
            var connection = backend.createConnection(sampleRequest1);
            connection.response.subscribe(function () { });
        });
        test_lib_1.it('should allow responding after subscription', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var connection = backend.createConnection(sampleRequest1);
            connection.response.subscribe(function (res) { async.done(); });
            connection.mockRespond(sampleResponse1);
        }));
        test_lib_1.it('should allow subscribing after responding', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var connection = backend.createConnection(sampleRequest1);
            connection.mockRespond(sampleResponse1);
            connection.response.subscribe(function (res) { async.done(); });
        }));
        test_lib_1.it('should allow responding after subscription with an error', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var connection = backend.createConnection(sampleRequest1);
            connection.response.subscribe(null, function () { async.done(); });
            connection.mockError(new Error('nope'));
        }));
        test_lib_1.it('should not throw when there are no unresolved requests', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var connection = backend.createConnection(sampleRequest1);
            connection.response.subscribe(function () { async.done(); });
            connection.mockRespond(sampleResponse1);
            backend.verifyNoPendingRequests();
        }));
        test_lib_1.xit('should throw when there are unresolved requests', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var connection = backend.createConnection(sampleRequest1);
            connection.response.subscribe(function () { async.done(); });
            backend.verifyNoPendingRequests();
        }));
        test_lib_1.it('should work when requests are resolved out of order', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var connection1 = backend.createConnection(sampleRequest1);
            var connection2 = backend.createConnection(sampleRequest1);
            connection1.response.subscribe(function () { async.done(); });
            connection2.response.subscribe(function () { });
            connection2.mockRespond(sampleResponse1);
            connection1.mockRespond(sampleResponse1);
            backend.verifyNoPendingRequests();
        }));
        test_lib_1.xit('should allow double subscribing', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var responses = [sampleResponse1, sampleResponse2];
            backend.connections.subscribe(function (c) { return c.mockRespond(responses.shift()); });
            var responseObservable = backend.createConnection(sampleRequest1).response;
            responseObservable.subscribe(function (res) { return test_lib_1.expect(res.text()).toBe('response1'); });
            responseObservable.subscribe(function (res) { return test_lib_1.expect(res.text()).toBe('response2'); }, null, async.done);
        }));
        // TODO(robwormald): readyStates are leaving?
        test_lib_1.it('should allow resolution of requests manually', function () {
            var connection1 = backend.createConnection(sampleRequest1);
            var connection2 = backend.createConnection(sampleRequest1);
            connection1.response.subscribe(function () { });
            connection2.response.subscribe(function () { });
            backend.resolveAllConnections();
            backend.verifyNoPendingRequests();
        });
    });
}
exports.main = main;
//# sourceMappingURL=mock_backend_spec.js.map