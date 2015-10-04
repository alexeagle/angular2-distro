var lang_1 = require('angular2/src/core/facade/lang');
var compiler_1 = require('angular2/src/core/compiler/compiler');
var application_common_1 = require('./application_common');
var application_tokens_1 = require('./application_tokens');
exports.APP_COMPONENT = application_tokens_1.APP_COMPONENT;
exports.APP_ID = application_tokens_1.APP_ID;
var application_common_2 = require('./application_common');
exports.platform = application_common_2.platform;
var application_ref_1 = require('./application_ref');
exports.PlatformRef = application_ref_1.PlatformRef;
exports.ApplicationRef = application_ref_1.ApplicationRef;
exports.applicationCommonBindings = application_ref_1.applicationCommonBindings;
exports.createNgZone = application_ref_1.createNgZone;
exports.platformCommon = application_ref_1.platformCommon;
exports.platformBindings = application_ref_1.platformBindings;
/// See [commonBootstrap] for detailed documentation.
function bootstrap(appComponentType, appBindings) {
    if (appBindings === void 0) { appBindings = null; }
    var bindings = [compiler_1.compilerBindings()];
    if (lang_1.isPresent(appBindings)) {
        bindings.push(appBindings);
    }
    return application_common_1.commonBootstrap(appComponentType, bindings);
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=application.js.map