var test_lib_1 = require('angular2/test_lib');
var platform_1 = require('../../../platform');
var dom_element_schema_registry_1 = require('angular2/src/core/compiler/schema/dom_element_schema_registry');
function main() {
    // DOMElementSchema can only be used on the JS side where we can safely
    // use reflection for DOM elements
    if (platform_1.IS_DART)
        return;
    var registry;
    test_lib_1.beforeEach(function () { registry = new dom_element_schema_registry_1.DomElementSchemaRegistry(); });
    test_lib_1.describe('DOMElementSchema', function () {
        test_lib_1.it('should detect properties on regular elements', function () {
            test_lib_1.expect(registry.hasProperty('div', 'id')).toBeTruthy();
            test_lib_1.expect(registry.hasProperty('div', 'title')).toBeTruthy();
            test_lib_1.expect(registry.hasProperty('div', 'unknown')).toBeFalsy();
        });
        test_lib_1.it('should return true for custom-like elements', function () { test_lib_1.expect(registry.hasProperty('custom-like', 'unknown')).toBeTruthy(); });
        test_lib_1.it('should not re-map property names that are not specified in DOM facade', function () { test_lib_1.expect(registry.getMappedPropName('readonly')).toEqual('readOnly'); });
        test_lib_1.it('should not re-map property names that are not specified in DOM facade', function () {
            test_lib_1.expect(registry.getMappedPropName('title')).toEqual('title');
            test_lib_1.expect(registry.getMappedPropName('exotic-unknown')).toEqual('exotic-unknown');
        });
    });
}
exports.main = main;
//# sourceMappingURL=dom_element_schema_registry_spec.js.map