var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var test_lib_1 = require('angular2/test_lib');
var spies_1 = require('./spies');
var client_message_broker_1 = require('angular2/src/web_workers/shared/client_message_broker');
var xhr_impl_1 = require("angular2/src/web_workers/worker/xhr_impl");
var async_1 = require("angular2/src/core/facade/async");
function main() {
    test_lib_1.describe("WebWorkerXHRImpl", function () {
        test_lib_1.it("should pass requests through the broker and return the response", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var URL = "http://www.example.com/test";
            var RESPONSE = "Example response text";
            var messageBroker = new spies_1.SpyMessageBroker();
            messageBroker.spy("runOnService")
                .andCallFake(function (args, returnType) {
                test_lib_1.expect(args.method).toEqual("get");
                test_lib_1.expect(args.args.length).toEqual(1);
                test_lib_1.expect(args.args[0].value).toEqual(URL);
                return async_1.PromiseWrapper.wrap(function () { return RESPONSE; });
            });
            var xhrImpl = new xhr_impl_1.WebWorkerXHRImpl(new MockMessageBrokerFactory(messageBroker));
            xhrImpl.get(URL).then(function (response) {
                test_lib_1.expect(response).toEqual(RESPONSE);
                async.done();
            });
        }));
    });
}
exports.main = main;
var MockMessageBrokerFactory = (function (_super) {
    __extends(MockMessageBrokerFactory, _super);
    function MockMessageBrokerFactory(_messageBroker) {
        _super.call(this, null, null);
        this._messageBroker = _messageBroker;
    }
    MockMessageBrokerFactory.prototype.createMessageBroker = function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        return this._messageBroker;
    };
    return MockMessageBrokerFactory;
})(client_message_broker_1.ClientMessageBrokerFactory);
//# sourceMappingURL=xhr_impl_spec.js.map