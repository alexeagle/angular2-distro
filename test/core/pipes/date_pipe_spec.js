var test_lib_1 = require('angular2/test_lib');
var core_1 = require('angular2/core');
var lang_1 = require('angular2/src/core/facade/lang');
function main() {
    test_lib_1.describe("DatePipe", function () {
        var date;
        var pipe;
        test_lib_1.beforeEach(function () {
            date = lang_1.DateWrapper.create(2015, 6, 15, 21, 43, 11);
            pipe = new core_1.DatePipe();
        });
        test_lib_1.describe("supports", function () {
            test_lib_1.it("should support date", function () { test_lib_1.expect(pipe.supports(date)).toBe(true); });
            test_lib_1.it("should support int", function () { test_lib_1.expect(pipe.supports(123456789)).toBe(true); });
            test_lib_1.it("should not support other objects", function () {
                test_lib_1.expect(pipe.supports(new Object())).toBe(false);
                test_lib_1.expect(pipe.supports(null)).toBe(false);
            });
        });
        // TODO(mlaval): enable tests when Intl API is no longer used, see
        // https://github.com/angular/angular/issues/3333
        if (test_lib_1.browserDetection.supportsIntlApi) {
            test_lib_1.describe("transform", function () {
                test_lib_1.it('should format each component correctly', function () {
                    test_lib_1.expect(pipe.transform(date, ['y'])).toEqual('2015');
                    test_lib_1.expect(pipe.transform(date, ['yy'])).toEqual('15');
                    test_lib_1.expect(pipe.transform(date, ['M'])).toEqual('6');
                    test_lib_1.expect(pipe.transform(date, ['MM'])).toEqual('06');
                    test_lib_1.expect(pipe.transform(date, ['MMM'])).toEqual('Jun');
                    test_lib_1.expect(pipe.transform(date, ['MMMM'])).toEqual('June');
                    test_lib_1.expect(pipe.transform(date, ['d'])).toEqual('15');
                    test_lib_1.expect(pipe.transform(date, ['E'])).toEqual('Mon');
                    test_lib_1.expect(pipe.transform(date, ['EEEE'])).toEqual('Monday');
                    test_lib_1.expect(pipe.transform(date, ['H'])).toEqual('21');
                    test_lib_1.expect(pipe.transform(date, ['j'])).toEqual('9 PM');
                    test_lib_1.expect(pipe.transform(date, ['m'])).toEqual('43');
                    test_lib_1.expect(pipe.transform(date, ['s'])).toEqual('11');
                });
                test_lib_1.it('should format common multi component patterns', function () {
                    test_lib_1.expect(pipe.transform(date, ['yMEd'])).toEqual('Mon, 6/15/2015');
                    test_lib_1.expect(pipe.transform(date, ['MEd'])).toEqual('Mon, 6/15');
                    test_lib_1.expect(pipe.transform(date, ['MMMd'])).toEqual('Jun 15');
                    test_lib_1.expect(pipe.transform(date, ['yMMMMEEEEd'])).toEqual('Monday, June 15, 2015');
                    test_lib_1.expect(pipe.transform(date, ['jms'])).toEqual('9:43:11 PM');
                    test_lib_1.expect(pipe.transform(date, ['ms'])).toEqual('43:11');
                });
                test_lib_1.it('should format with pattern aliases', function () {
                    test_lib_1.expect(pipe.transform(date, ['medium'])).toEqual('Jun 15, 2015, 9:43:11 PM');
                    test_lib_1.expect(pipe.transform(date, ['short'])).toEqual('6/15/2015, 9:43 PM');
                    test_lib_1.expect(pipe.transform(date, ['fullDate'])).toEqual('Monday, June 15, 2015');
                    test_lib_1.expect(pipe.transform(date, ['longDate'])).toEqual('June 15, 2015');
                    test_lib_1.expect(pipe.transform(date, ['mediumDate'])).toEqual('Jun 15, 2015');
                    test_lib_1.expect(pipe.transform(date, ['shortDate'])).toEqual('6/15/2015');
                    test_lib_1.expect(pipe.transform(date, ['mediumTime'])).toEqual('9:43:11 PM');
                    test_lib_1.expect(pipe.transform(date, ['shortTime'])).toEqual('9:43 PM');
                });
            });
        }
    });
}
exports.main = main;
//# sourceMappingURL=date_pipe_spec.js.map