var event_config_1 = require('angular2/src/core/linker/event_config');
var test_lib_1 = require('angular2/test_lib');
function main() {
    test_lib_1.describe('EventConfig', function () {
        test_lib_1.describe('parse', function () {
            test_lib_1.it('should handle short form events', function () {
                var eventConfig = event_config_1.EventConfig.parse('shortForm');
                test_lib_1.expect(eventConfig.fieldName).toEqual('shortForm');
                test_lib_1.expect(eventConfig.eventName).toEqual('shortForm');
                test_lib_1.expect(eventConfig.isLongForm).toEqual(false);
            });
            test_lib_1.it('should handle long form events', function () {
                var eventConfig = event_config_1.EventConfig.parse('fieldName: eventName');
                test_lib_1.expect(eventConfig.fieldName).toEqual('fieldName');
                test_lib_1.expect(eventConfig.eventName).toEqual('eventName');
                test_lib_1.expect(eventConfig.isLongForm).toEqual(true);
            });
        });
        test_lib_1.describe('getFullName', function () {
            test_lib_1.it('should handle short form events', function () {
                var eventConfig = new event_config_1.EventConfig('shortForm', 'shortForm', false);
                test_lib_1.expect(eventConfig.getFullName()).toEqual('shortForm');
            });
            test_lib_1.it('should handle long form events', function () {
                var eventConfig = new event_config_1.EventConfig('fieldName', 'eventName', true);
                test_lib_1.expect(eventConfig.getFullName()).toEqual('fieldName:eventName');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=event_config_spec.js.map