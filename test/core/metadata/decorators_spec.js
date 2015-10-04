var test_lib_1 = require('angular2/test_lib');
var angular2_1 = require('angular2/angular2');
var reflection_1 = require('angular2/src/core/reflection/reflection');
function main() {
    test_lib_1.describe('es5 decorators', function () {
        test_lib_1.it('should declare directive class', function () {
            var MyDirective = angular2_1.Directive({}).Class({ constructor: function () { this.works = true; } });
            test_lib_1.expect(new MyDirective().works).toEqual(true);
        });
        test_lib_1.it('should declare Component class', function () {
            var MyComponent = angular2_1.Component({}).View({}).View({}).Class({ constructor: function () { this.works = true; } });
            test_lib_1.expect(new MyComponent().works).toEqual(true);
        });
        test_lib_1.it('should create type in ES5', function () {
            function MyComponent() { }
            ;
            var as;
            MyComponent.annotations = as = angular2_1.Component({}).View({});
            test_lib_1.expect(reflection_1.reflector.annotations(MyComponent)).toEqual(as.annotations);
        });
    });
}
exports.main = main;
//# sourceMappingURL=decorators_spec.js.map