var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var test_lib_1 = require('angular2/test_lib');
var testability_1 = require('angular2/src/core/testability/testability');
var ng_zone_1 = require('angular2/src/core/zone/ng_zone');
var lang_1 = require('angular2/src/core/facade/lang');
var async_1 = require('angular2/src/core/facade/async');
// Schedules a microtasks (using a resolved promise .then())
function microTask(fn) {
    async_1.PromiseWrapper.resolve(null).then(function (_) { fn(); });
}
var MockNgZone = (function (_super) {
    __extends(MockNgZone, _super);
    function MockNgZone() {
        _super.call(this, { enableLongStackTrace: false });
    }
    MockNgZone.prototype.start = function () { this._onTurnStart(); };
    MockNgZone.prototype.finish = function () { this._onEventDone(); };
    MockNgZone.prototype.overrideOnTurnStart = function (onTurnStartFn) {
        this._onTurnStart = lang_1.normalizeBlank(onTurnStartFn);
    };
    MockNgZone.prototype.overrideOnEventDone = function (onEventDoneFn, waitForAsync) {
        if (waitForAsync === void 0) { waitForAsync = false; }
        this._onEventDone = lang_1.normalizeBlank(onEventDoneFn);
    };
    return MockNgZone;
})(ng_zone_1.NgZone);
function main() {
    test_lib_1.describe('Testability', function () {
        var testability, execute, ngZone;
        test_lib_1.beforeEach(function () {
            ngZone = new MockNgZone();
            testability = new testability_1.Testability(ngZone);
            execute = new test_lib_1.SpyObject().spy('execute');
        });
        test_lib_1.describe('Pending count logic', function () {
            test_lib_1.it('should start with a pending count of 0', function () { test_lib_1.expect(testability.getPendingRequestCount()).toEqual(0); });
            test_lib_1.it('should fire whenstable callbacks if pending count is 0', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                testability.whenStable(execute);
                microTask(function () {
                    test_lib_1.expect(execute).toHaveBeenCalled();
                    async.done();
                });
            }));
            test_lib_1.it('should not fire whenstable callbacks synchronously if pending count is 0', function () {
                testability.whenStable(execute);
                test_lib_1.expect(execute).not.toHaveBeenCalled();
            });
            test_lib_1.it('should not call whenstable callbacks when there are pending counts', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                testability.increasePendingRequestCount();
                testability.increasePendingRequestCount();
                testability.whenStable(execute);
                microTask(function () {
                    test_lib_1.expect(execute).not.toHaveBeenCalled();
                    testability.decreasePendingRequestCount();
                    microTask(function () {
                        test_lib_1.expect(execute).not.toHaveBeenCalled();
                        async.done();
                    });
                });
            }));
            test_lib_1.it('should fire whenstable callbacks when pending drops to 0', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                testability.increasePendingRequestCount();
                testability.whenStable(execute);
                microTask(function () {
                    test_lib_1.expect(execute).not.toHaveBeenCalled();
                    testability.decreasePendingRequestCount();
                    microTask(function () {
                        test_lib_1.expect(execute).toHaveBeenCalled();
                        async.done();
                    });
                });
            }));
            test_lib_1.it('should not fire whenstable callbacks synchronously when pending drops to 0', function () {
                testability.increasePendingRequestCount();
                testability.whenStable(execute);
                testability.decreasePendingRequestCount();
                test_lib_1.expect(execute).not.toHaveBeenCalled();
            });
        });
        test_lib_1.describe('NgZone callback logic', function () {
            test_lib_1.it('should start being ready', function () { test_lib_1.expect(testability.isAngularEventPending()).toEqual(false); });
            test_lib_1.it('should fire whenstable callback if event is already finished', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                ngZone.start();
                ngZone.finish();
                testability.whenStable(execute);
                microTask(function () {
                    test_lib_1.expect(execute).toHaveBeenCalled();
                    async.done();
                });
            }));
            test_lib_1.it('should not fire whenstable callbacks synchronously if event is already finished', function () {
                ngZone.start();
                ngZone.finish();
                testability.whenStable(execute);
                test_lib_1.expect(execute).not.toHaveBeenCalled();
            });
            test_lib_1.it('should fire whenstable callback when event finishes', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                ngZone.start();
                testability.whenStable(execute);
                microTask(function () {
                    test_lib_1.expect(execute).not.toHaveBeenCalled();
                    ngZone.finish();
                    microTask(function () {
                        test_lib_1.expect(execute).toHaveBeenCalled();
                        async.done();
                    });
                });
            }));
            test_lib_1.it('should not fire whenstable callbacks synchronously when event finishes', function () {
                ngZone.start();
                testability.whenStable(execute);
                ngZone.finish();
                test_lib_1.expect(execute).not.toHaveBeenCalled();
            });
            test_lib_1.it('should not fire whenstable callback when event did not finish', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                ngZone.start();
                testability.increasePendingRequestCount();
                testability.whenStable(execute);
                microTask(function () {
                    test_lib_1.expect(execute).not.toHaveBeenCalled();
                    testability.decreasePendingRequestCount();
                    microTask(function () {
                        test_lib_1.expect(execute).not.toHaveBeenCalled();
                        ngZone.finish();
                        microTask(function () {
                            test_lib_1.expect(execute).toHaveBeenCalled();
                            async.done();
                        });
                    });
                });
            }));
            test_lib_1.it('should not fire whenstable callback when there are pending counts', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                ngZone.start();
                testability.increasePendingRequestCount();
                testability.increasePendingRequestCount();
                testability.whenStable(execute);
                microTask(function () {
                    test_lib_1.expect(execute).not.toHaveBeenCalled();
                    ngZone.finish();
                    microTask(function () {
                        test_lib_1.expect(execute).not.toHaveBeenCalled();
                        testability.decreasePendingRequestCount();
                        microTask(function () {
                            test_lib_1.expect(execute).not.toHaveBeenCalled();
                            testability.decreasePendingRequestCount();
                            microTask(function () {
                                test_lib_1.expect(execute).toHaveBeenCalled();
                                async.done();
                            });
                        });
                    });
                });
            }));
        });
    });
}
exports.main = main;
//# sourceMappingURL=testability_spec.js.map