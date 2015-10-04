var test_lib_1 = require('angular2/test_lib');
var base_request_options_1 = require('angular2/src/http/base_request_options');
var enums_1 = require('angular2/src/http/enums');
function main() {
    test_lib_1.describe('BaseRequestOptions', function () {
        test_lib_1.it('should create a new object when calling merge', function () {
            var options1 = new base_request_options_1.BaseRequestOptions();
            var options2 = options1.merge(new base_request_options_1.RequestOptions({ method: enums_1.RequestMethods.Delete }));
            test_lib_1.expect(options2).not.toBe(options1);
            test_lib_1.expect(options2.method).toBe(enums_1.RequestMethods.Delete);
        });
        test_lib_1.it('should retain previously merged values when merging again', function () {
            var options1 = new base_request_options_1.BaseRequestOptions();
            var options2 = options1.merge(new base_request_options_1.RequestOptions({ method: enums_1.RequestMethods.Delete }));
            test_lib_1.expect(options2.method).toBe(enums_1.RequestMethods.Delete);
        });
    });
}
exports.main = main;
//# sourceMappingURL=base_request_options_spec.js.map