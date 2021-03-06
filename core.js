function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * @module
 * @description
 * Starting point to import all public core APIs.
 */
__export(require('./src/core/metadata'));
__export(require('./src/core/util'));
__export(require('./src/core/di'));
__export(require('./src/core/pipes'));
__export(require('./src/core/facade'));
__export(require('./src/core/application'));
__export(require('./src/core/bootstrap'));
__export(require('./src/core/services'));
__export(require('./src/core/linker'));
__export(require('./src/core/lifecycle'));
__export(require('./src/core/zone'));
__export(require('./src/core/render'));
__export(require('./src/core/directives'));
__export(require('./src/core/forms'));
__export(require('./src/core/debug'));
__export(require('./src/core/change_detection'));
//# sourceMappingURL=core.js.map