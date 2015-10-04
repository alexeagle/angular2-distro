var di_1 = require('angular2/src/core/di');
var schema_registry_mock_1 = require('./schema_registry_mock');
var element_schema_registry_1 = require('angular2/src/core/compiler/schema/element_schema_registry');
exports.TEST_BINDINGS = [di_1.bind(element_schema_registry_1.ElementSchemaRegistry).toValue(new schema_registry_mock_1.MockSchemaRegistry({}, {}))];
//# sourceMappingURL=test_bindings.js.map