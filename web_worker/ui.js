function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('../src/core/facade'));
__export(require('../src/core/zone'));
__export(require("../src/web_workers/ui/application"));
__export(require("../src/web_workers/shared/client_message_broker"));
__export(require("../src/web_workers/shared/service_message_broker"));
var serializer_1 = require('../src/web_workers/shared/serializer');
exports.PRIMITIVE = serializer_1.PRIMITIVE;
//# sourceMappingURL=ui.js.map