var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var test_lib_1 = require('angular2/test_lib');
var core_1 = require('angular2/core');
var mock_backend_1 = require('angular2/src/http/backends/mock_backend');
var http_1 = require('angular2/http');
var Rx = require('@reactivex/rxjs/dist/cjs/Rx');
var Observable = Rx.Observable, Subject = Rx.Subject;
var SpyObserver = (function (_super) {
    __extends(SpyObserver, _super);
    function SpyObserver() {
        _super.call(this);
        this.onNext = this.spy('onNext');
        this.onError = this.spy('onError');
        this.onCompleted = this.spy('onCompleted');
    }
    return SpyObserver;
})(test_lib_1.SpyObject);
function main() {
    test_lib_1.describe('injectables', function () {
        var url = 'http://foo.bar';
        var http;
        var parentInjector;
        var childInjector;
        var jsonpBackend;
        var xhrBackend;
        var jsonp;
        var http;
        test_lib_1.it('should allow using jsonpInjectables and httpInjectables in same injector', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            parentInjector = core_1.Injector.resolveAndCreate([core_1.bind(http_1.XHRBackend).toClass(mock_backend_1.MockBackend), core_1.bind(http_1.JSONPBackend).toClass(mock_backend_1.MockBackend)]);
            childInjector = parentInjector.resolveAndCreateChild([
                http_1.HTTP_BINDINGS,
                http_1.JSONP_BINDINGS,
                core_1.bind(http_1.XHRBackend).toClass(mock_backend_1.MockBackend),
                core_1.bind(http_1.JSONPBackend).toClass(mock_backend_1.MockBackend)
            ]);
            http = childInjector.get(http_1.Http);
            jsonp = childInjector.get(http_1.Jsonp);
            jsonpBackend = childInjector.get(http_1.JSONPBackend);
            xhrBackend = childInjector.get(http_1.XHRBackend);
            var xhrCreatedConnections = 0;
            var jsonpCreatedConnections = 0;
            xhrBackend.connections.subscribe(function () {
                xhrCreatedConnections++;
                test_lib_1.expect(xhrCreatedConnections).toEqual(1);
                if (jsonpCreatedConnections) {
                    async.done();
                }
            });
            http.get(url).subscribe(function () { });
            jsonpBackend.connections.subscribe(function () {
                jsonpCreatedConnections++;
                test_lib_1.expect(jsonpCreatedConnections).toEqual(1);
                if (xhrCreatedConnections) {
                    async.done();
                }
            });
            jsonp.request(url).subscribe(function () { });
        }));
    });
    test_lib_1.describe('http', function () {
        var url = 'http://foo.bar';
        var http;
        var injector;
        var backend;
        var baseResponse;
        var jsonp;
        test_lib_1.beforeEach(function () {
            injector = core_1.Injector.resolveAndCreate([
                http_1.BaseRequestOptions,
                mock_backend_1.MockBackend,
                core_1.bind(http_1.Http).toFactory(function (backend, defaultOptions) {
                    return new http_1.Http(backend, defaultOptions);
                }, [mock_backend_1.MockBackend, http_1.BaseRequestOptions]),
                core_1.bind(http_1.Jsonp).toFactory(function (backend, defaultOptions) {
                    return new http_1.Jsonp(backend, defaultOptions);
                }, [mock_backend_1.MockBackend, http_1.BaseRequestOptions])
            ]);
            http = injector.get(http_1.Http);
            jsonp = injector.get(http_1.Jsonp);
            backend = injector.get(mock_backend_1.MockBackend);
            baseResponse = new http_1.Response(new http_1.ResponseOptions({ body: 'base response' }));
        });
        test_lib_1.afterEach(function () { return backend.verifyNoPendingRequests(); });
        test_lib_1.describe('Http', function () {
            test_lib_1.describe('.request()', function () {
                test_lib_1.it('should return an Observable', function () { test_lib_1.expect(http.request(url)).toBeAnInstanceOf(Observable); });
                test_lib_1.it('should accept a fully-qualified request as its only parameter', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        test_lib_1.expect(c.request.url).toBe('https://google.com');
                        c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: 'Thank you' })));
                        async.done();
                    });
                    http.request(new http_1.Request(new http_1.RequestOptions({ url: 'https://google.com' })))
                        .subscribe(function (res) { });
                }));
                test_lib_1.it('should perform a get request for given url if only passed a string', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) { return c.mockRespond(baseResponse); });
                    http.request('http://basic.connection')
                        .subscribe(function (res) {
                        test_lib_1.expect(res.text()).toBe('base response');
                        async.done();
                    });
                }));
                test_lib_1.it('should perform a get request and complete the response', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) { return c.mockRespond(baseResponse); });
                    http.request('http://basic.connection')
                        .subscribe(function (res) { test_lib_1.expect(res.text()).toBe('base response'); }, null, function () { async.done(); });
                }));
                test_lib_1.it('should perform multiple get requests and complete the responses', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) { return c.mockRespond(baseResponse); });
                    http.request('http://basic.connection')
                        .subscribe(function (res) { test_lib_1.expect(res.text()).toBe('base response'); });
                    http.request('http://basic.connection')
                        .subscribe(function (res) { test_lib_1.expect(res.text()).toBe('base response'); }, null, function () { async.done(); });
                }));
                // TODO: make dart not complain about "argument type 'Map' cannot be assigned to the
                // parameter type 'IRequestOptions'"
                // xit('should perform a get request for given url if passed a dictionary',
                //     inject([AsyncTestCompleter], async => {
                //       ObservableWrapper.subscribe(backend.connections, c => c.mockRespond(baseResponse));
                //       ObservableWrapper.subscribe(http.request(url, {method: RequestMethods.GET}), res =>
                //       {
                //         expect(res.text()).toBe('base response');
                //         async.done();
                //       });
                //     }));
                test_lib_1.it('should throw if url is not a string or Request', function () {
                    var req = {};
                    test_lib_1.expect(function () { return http.request(req); })
                        .toThrowError('First argument must be a url string or Request instance.');
                });
            });
            test_lib_1.describe('.get()', function () {
                test_lib_1.it('should perform a get request for given url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        test_lib_1.expect(c.request.method).toBe(http_1.RequestMethods.Get);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.get(url).subscribe(function (res) { });
                }));
            });
            test_lib_1.describe('.post()', function () {
                test_lib_1.it('should perform a post request for given url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        test_lib_1.expect(c.request.method).toBe(http_1.RequestMethods.Post);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.post(url, 'post me').subscribe(function (res) { });
                }));
                test_lib_1.it('should attach the provided body to the request', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var body = 'this is my post body';
                    backend.connections.subscribe(function (c) {
                        test_lib_1.expect(c.request.text()).toBe(body);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.post(url, body).subscribe(function (res) { });
                }));
            });
            test_lib_1.describe('.put()', function () {
                test_lib_1.it('should perform a put request for given url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        test_lib_1.expect(c.request.method).toBe(http_1.RequestMethods.Put);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.put(url, 'put me').subscribe(function (res) { });
                }));
                test_lib_1.it('should attach the provided body to the request', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var body = 'this is my put body';
                    backend.connections.subscribe(function (c) {
                        test_lib_1.expect(c.request.text()).toBe(body);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.put(url, body).subscribe(function (res) { });
                }));
            });
            test_lib_1.describe('.delete()', function () {
                test_lib_1.it('should perform a delete request for given url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        test_lib_1.expect(c.request.method).toBe(http_1.RequestMethods.Delete);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.delete(url).subscribe(function (res) { });
                }));
            });
            test_lib_1.describe('.patch()', function () {
                test_lib_1.it('should perform a patch request for given url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        test_lib_1.expect(c.request.method).toBe(http_1.RequestMethods.Patch);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.patch(url, 'this is my patch body').subscribe(function (res) { });
                }));
                test_lib_1.it('should attach the provided body to the request', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var body = 'this is my patch body';
                    backend.connections.subscribe(function (c) {
                        test_lib_1.expect(c.request.text()).toBe(body);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.patch(url, body).subscribe(function (res) { });
                }));
            });
            test_lib_1.describe('.head()', function () {
                test_lib_1.it('should perform a head request for given url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        test_lib_1.expect(c.request.method).toBe(http_1.RequestMethods.Head);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.head(url).subscribe(function (res) { });
                }));
            });
            test_lib_1.describe('searchParams', function () {
                test_lib_1.it('should append search params to url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var params = new http_1.URLSearchParams();
                    params.append('q', 'puppies');
                    backend.connections.subscribe(function (c) {
                        test_lib_1.expect(c.request.url).toEqual('https://www.google.com?q=puppies');
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.get('https://www.google.com', new http_1.RequestOptions({ search: params }))
                        .subscribe(function (res) { });
                }));
                test_lib_1.it('should append string search params to url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        test_lib_1.expect(c.request.url).toEqual('https://www.google.com?q=piggies');
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.get('https://www.google.com', new http_1.RequestOptions({ search: 'q=piggies' }))
                        .subscribe(function (res) { });
                }));
                test_lib_1.it('should produce valid url when url already contains a query', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        test_lib_1.expect(c.request.url).toEqual('https://www.google.com?q=angular&as_eq=1.x');
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.get('https://www.google.com?q=angular', new http_1.RequestOptions({ search: 'as_eq=1.x' }))
                        .subscribe(function (res) { });
                }));
            });
            test_lib_1.describe('string method names', function () {
                test_lib_1.it('should allow case insensitive strings for method names', function () {
                    test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                        backend.connections.subscribe(function (c) {
                            test_lib_1.expect(c.request.method)
                                .toBe(http_1.RequestMethods.Post);
                            c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: 'Thank you' })));
                            async.done();
                        });
                        http.request(new http_1.Request(new http_1.RequestOptions({ url: 'https://google.com', method: 'PosT' })))
                            .subscribe(function (res) { });
                    });
                });
                test_lib_1.it('should throw when invalid string parameter is passed for method name', function () {
                    test_lib_1.expect(function () {
                        http.request(new http_1.Request(new http_1.RequestOptions({ url: 'https://google.com', method: 'Invalid' })));
                    }).toThrowError('Invalid request method. The method "Invalid" is not supported.');
                });
            });
        });
        test_lib_1.describe('Jsonp', function () {
            test_lib_1.describe('.request()', function () {
                test_lib_1.it('should throw if url is not a string or Request', function () {
                    var req = {};
                    test_lib_1.expect(function () { return jsonp.request(req); })
                        .toThrowError('First argument must be a url string or Request instance.');
                });
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=http_spec.js.map