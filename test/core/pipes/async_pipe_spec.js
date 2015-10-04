var test_lib_1 = require('angular2/test_lib');
var spies_1 = require('./spies');
var lang_1 = require('angular2/src/core/facade/lang');
var core_1 = require('angular2/core');
var async_1 = require('angular2/src/core/facade/async');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
function main() {
    test_lib_1.describe("AsyncPipe", function () {
        test_lib_1.describe('Observable', function () {
            var emitter;
            var pipe;
            var ref;
            var message = new Object();
            test_lib_1.beforeEach(function () {
                emitter = new async_1.EventEmitter();
                ref = new spies_1.SpyChangeDetectorRef();
                pipe = new core_1.AsyncPipe(ref);
            });
            test_lib_1.describe("transform", function () {
                test_lib_1.it("should return null when subscribing to an observable", function () { test_lib_1.expect(pipe.transform(emitter)).toBe(null); });
                test_lib_1.it("should return the latest available value wrapped", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    pipe.transform(emitter);
                    async_1.ObservableWrapper.callNext(emitter, message);
                    async_1.TimerWrapper.setTimeout(function () {
                        test_lib_1.expect(pipe.transform(emitter)).toEqual(new core_1.WrappedValue(message));
                        async.done();
                    }, 0);
                }));
                test_lib_1.it("should return same value when nothing has changed since the last call", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    pipe.transform(emitter);
                    async_1.ObservableWrapper.callNext(emitter, message);
                    async_1.TimerWrapper.setTimeout(function () {
                        pipe.transform(emitter);
                        test_lib_1.expect(pipe.transform(emitter)).toBe(message);
                        async.done();
                    }, 0);
                }));
                test_lib_1.it("should dispose of the existing subscription when subscribing to a new observable", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    pipe.transform(emitter);
                    var newEmitter = new async_1.EventEmitter();
                    test_lib_1.expect(pipe.transform(newEmitter)).toBe(null);
                    // this should not affect the pipe
                    async_1.ObservableWrapper.callNext(emitter, message);
                    async_1.TimerWrapper.setTimeout(function () {
                        test_lib_1.expect(pipe.transform(newEmitter)).toBe(null);
                        async.done();
                    }, 0);
                }));
                test_lib_1.it("should request a change detection check upon receiving a new value", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    pipe.transform(emitter);
                    async_1.ObservableWrapper.callNext(emitter, message);
                    async_1.TimerWrapper.setTimeout(function () {
                        test_lib_1.expect(ref.spy('markForCheck')).toHaveBeenCalled();
                        async.done();
                    }, 0);
                }));
            });
            test_lib_1.describe("onDestroy", function () {
                test_lib_1.it("should do nothing when no subscription", function () { test_lib_1.expect(function () { return pipe.onDestroy(); }).not.toThrow(); });
                test_lib_1.it("should dispose of the existing subscription", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    pipe.transform(emitter);
                    pipe.onDestroy();
                    async_1.ObservableWrapper.callNext(emitter, message);
                    async_1.TimerWrapper.setTimeout(function () {
                        test_lib_1.expect(pipe.transform(emitter)).toBe(null);
                        async.done();
                    }, 0);
                }));
            });
        });
        test_lib_1.describe("Promise", function () {
            var message = new Object();
            var pipe;
            var completer;
            var ref;
            // adds longer timers for passing tests in IE
            var timer = (!lang_1.isBlank(dom_adapter_1.DOM) && test_lib_1.browserDetection.isIE) ? 50 : 0;
            test_lib_1.beforeEach(function () {
                completer = async_1.PromiseWrapper.completer();
                ref = new spies_1.SpyChangeDetectorRef();
                pipe = new core_1.AsyncPipe(ref);
            });
            test_lib_1.describe("transform", function () {
                test_lib_1.it("should return null when subscribing to a promise", function () { test_lib_1.expect(pipe.transform(completer.promise)).toBe(null); });
                test_lib_1.it("should return the latest available value", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    pipe.transform(completer.promise);
                    completer.resolve(message);
                    async_1.TimerWrapper.setTimeout(function () {
                        test_lib_1.expect(pipe.transform(completer.promise)).toEqual(new core_1.WrappedValue(message));
                        async.done();
                    }, timer);
                }));
                test_lib_1.it("should return unwrapped value when nothing has changed since the last call", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    pipe.transform(completer.promise);
                    completer.resolve(message);
                    async_1.TimerWrapper.setTimeout(function () {
                        pipe.transform(completer.promise);
                        test_lib_1.expect(pipe.transform(completer.promise)).toBe(message);
                        async.done();
                    }, timer);
                }));
                test_lib_1.it("should dispose of the existing subscription when subscribing to a new promise", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    pipe.transform(completer.promise);
                    var newCompleter = async_1.PromiseWrapper.completer();
                    test_lib_1.expect(pipe.transform(newCompleter.promise)).toBe(null);
                    // this should not affect the pipe, so it should return WrappedValue
                    completer.resolve(message);
                    async_1.TimerWrapper.setTimeout(function () {
                        test_lib_1.expect(pipe.transform(newCompleter.promise)).toBe(null);
                        async.done();
                    }, timer);
                }));
                test_lib_1.it("should request a change detection check upon receiving a new value", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    pipe.transform(completer.promise);
                    completer.resolve(message);
                    async_1.TimerWrapper.setTimeout(function () {
                        test_lib_1.expect(ref.spy('markForCheck')).toHaveBeenCalled();
                        async.done();
                    }, timer);
                }));
                test_lib_1.describe("onDestroy", function () {
                    test_lib_1.it("should do nothing when no source", function () { test_lib_1.expect(function () { return pipe.onDestroy(); }).not.toThrow(); });
                    test_lib_1.it("should dispose of the existing source", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                        pipe.transform(completer.promise);
                        test_lib_1.expect(pipe.transform(completer.promise)).toBe(null);
                        completer.resolve(message);
                        async_1.TimerWrapper.setTimeout(function () {
                            test_lib_1.expect(pipe.transform(completer.promise)).toEqual(new core_1.WrappedValue(message));
                            pipe.onDestroy();
                            test_lib_1.expect(pipe.transform(completer.promise)).toBe(null);
                            async.done();
                        }, timer);
                    }));
                });
            });
        });
        test_lib_1.describe('null', function () {
            test_lib_1.it('should return null when given null', function () {
                var pipe = new core_1.AsyncPipe(null);
                test_lib_1.expect(pipe.transform(null, [])).toEqual(null);
            });
        });
        test_lib_1.describe('other types', function () {
            test_lib_1.it('should throw when given an invalid object', function () {
                var pipe = new core_1.AsyncPipe(null);
                test_lib_1.expect(function () { return pipe.transform("some bogus object", []); }).toThrowError();
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=async_pipe_spec.js.map