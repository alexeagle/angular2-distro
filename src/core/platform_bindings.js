var di_1 = require('angular2/src/core/di');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
exports.EXCEPTION_BINDING = di_1.bind(exceptions_1.ExceptionHandler).toFactory(function () { return new exceptions_1.ExceptionHandler(dom_adapter_1.DOM, false); }, []);
//# sourceMappingURL=platform_bindings.js.map