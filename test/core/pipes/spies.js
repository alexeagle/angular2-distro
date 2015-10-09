var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var change_detector_ref_1 = require('angular2/src/core/change_detection/change_detector_ref');
var test_lib_1 = require('angular2/test_lib');
var SpyChangeDetectorRef = (function (_super) {
    __extends(SpyChangeDetectorRef, _super);
    function SpyChangeDetectorRef() {
        _super.call(this, change_detector_ref_1.ChangeDetectorRef_);
    }
    return SpyChangeDetectorRef;
})(test_lib_1.SpyObject);
exports.SpyChangeDetectorRef = SpyChangeDetectorRef;
//# sourceMappingURL=spies.js.map