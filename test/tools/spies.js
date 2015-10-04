var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var test_lib_1 = require('angular2/test_lib');
var angular2_1 = require('angular2/angular2');
var lang_1 = require('angular2/src/core/facade/lang');
var SpyComponentRef = (function (_super) {
    __extends(SpyComponentRef, _super);
    function SpyComponentRef() {
        _super.call(this);
        this.injector = angular2_1.Injector.resolveAndCreate([angular2_1.bind(angular2_1.LifeCycle).toValue({ tick: function () { } })]);
    }
    return SpyComponentRef;
})(test_lib_1.SpyObject);
exports.SpyComponentRef = SpyComponentRef;
function callNgProfilerTimeChangeDetection(config) {
    lang_1.global.ng.profiler.timeChangeDetection(config);
}
exports.callNgProfilerTimeChangeDetection = callNgProfilerTimeChangeDetection;
//# sourceMappingURL=spies.js.map