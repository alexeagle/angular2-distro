var test_lib_1 = require('angular2/test_lib');
var lang_1 = require('angular2/src/core/facade/lang');
var core_1 = require('angular2/core');
function main() {
    test_lib_1.describe("JsonPipe", function () {
        var regNewLine = '\n';
        var inceptionObj;
        var inceptionObjString;
        var pipe;
        var collection;
        function normalize(obj) { return lang_1.StringWrapper.replace(obj, regNewLine, ''); }
        test_lib_1.beforeEach(function () {
            inceptionObj = { dream: { dream: { dream: 'Limbo' } } };
            inceptionObjString = "{\n" + "  \"dream\": {\n" + "    \"dream\": {\n" +
                "      \"dream\": \"Limbo\"\n" + "    }\n" + "  }\n" + "}";
            pipe = new core_1.JsonPipe();
            collection = [];
        });
        test_lib_1.describe("transform", function () {
            test_lib_1.it("should return JSON-formatted string", function () { test_lib_1.expect(pipe.transform(inceptionObj)).toEqual(inceptionObjString); });
            test_lib_1.it("should return JSON-formatted string even when normalized", function () {
                var dream1 = normalize(pipe.transform(inceptionObj));
                var dream2 = normalize(inceptionObjString);
                test_lib_1.expect(dream1).toEqual(dream2);
            });
            test_lib_1.it("should return JSON-formatted string similar to Json.stringify", function () {
                var dream1 = normalize(pipe.transform(inceptionObj));
                var dream2 = normalize(lang_1.Json.stringify(inceptionObj));
                test_lib_1.expect(dream1).toEqual(dream2);
            });
            test_lib_1.it("should return same ref when nothing has changed since the last call", function () {
                test_lib_1.expect(pipe.transform(inceptionObj)).toEqual(inceptionObjString);
                test_lib_1.expect(pipe.transform(inceptionObj)).toEqual(inceptionObjString);
            });
            test_lib_1.it("should return a new value when something changed but the ref hasn't", function () {
                var stringCollection = '[]';
                var stringCollectionWith1 = '[\n' +
                    '  1' +
                    '\n]';
                test_lib_1.expect(pipe.transform(collection)).toEqual(stringCollection);
                collection.push(1);
                test_lib_1.expect(pipe.transform(collection)).toEqual(stringCollectionWith1);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=json_pipe_spec.js.map