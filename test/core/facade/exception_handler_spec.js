var test_lib_1 = require('angular2/test_lib');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var _CustomException = (function () {
    function _CustomException() {
        this.context = "some context";
    }
    _CustomException.prototype.toString = function () { return "custom"; };
    return _CustomException;
})();
function main() {
    test_lib_1.describe('ExceptionHandler', function () {
        test_lib_1.it("should output exception", function () {
            var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.BaseException("message!"));
            test_lib_1.expect(e).toContain("message!");
        });
        test_lib_1.it("should output stackTrace", function () {
            var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.BaseException("message!"), "stack!");
            test_lib_1.expect(e).toContain("stack!");
        });
        test_lib_1.it("should join a long stackTrace", function () {
            var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.BaseException("message!"), ["stack1", "stack2"]);
            test_lib_1.expect(e).toContain("stack1");
            test_lib_1.expect(e).toContain("stack2");
        });
        test_lib_1.it("should output reason when present", function () {
            var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.BaseException("message!"), null, "reason!");
            test_lib_1.expect(e).toContain("reason!");
        });
        test_lib_1.describe("context", function () {
            test_lib_1.it("should print context", function () {
                var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.WrappedException("message!", null, null, "context!"));
                test_lib_1.expect(e).toContain("context!");
            });
            test_lib_1.it("should print nested context", function () {
                var original = new exceptions_1.WrappedException("message!", null, null, "context!");
                var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.WrappedException("message", original));
                test_lib_1.expect(e).toContain("context!");
            });
            test_lib_1.it("should not print context when the passed-in exception is not a BaseException", function () {
                var e = exceptions_1.ExceptionHandler.exceptionToString(new _CustomException());
                test_lib_1.expect(e).not.toContain("context");
            });
        });
        test_lib_1.describe('original exception', function () {
            test_lib_1.it("should print original exception message if available (original is BaseException)", function () {
                var realOriginal = new exceptions_1.BaseException("inner");
                var original = new exceptions_1.WrappedException("wrapped", realOriginal);
                var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.WrappedException("wrappedwrapped", original));
                test_lib_1.expect(e).toContain("inner");
            });
            test_lib_1.it("should print original exception message if available (original is not BaseException)", function () {
                var realOriginal = new _CustomException();
                var original = new exceptions_1.WrappedException("wrapped", realOriginal);
                var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.WrappedException("wrappedwrapped", original));
                test_lib_1.expect(e).toContain("custom");
            });
        });
        test_lib_1.describe('original stack', function () {
            test_lib_1.it("should print original stack if available", function () {
                var realOriginal = new exceptions_1.BaseException("inner");
                var original = new exceptions_1.WrappedException("wrapped", realOriginal, "originalStack");
                var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.WrappedException("wrappedwrapped", original, "wrappedStack"));
                test_lib_1.expect(e).toContain("originalStack");
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=exception_handler_spec.js.map