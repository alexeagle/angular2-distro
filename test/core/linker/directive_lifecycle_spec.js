var test_lib_1 = require('angular2/test_lib');
var directive_lifecycle_reflector_1 = require('angular2/src/core/linker/directive_lifecycle_reflector');
var interfaces_1 = require('angular2/src/core/linker/interfaces');
function main() {
    test_lib_1.describe('Create DirectiveMetadata', function () {
        test_lib_1.describe('lifecycle', function () {
            test_lib_1.describe("onChanges", function () {
                test_lib_1.it("should be true when the directive has the onChanges method", function () {
                    test_lib_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(interfaces_1.LifecycleHooks.OnChanges, DirectiveWithOnChangesMethod))
                        .toBe(true);
                });
                test_lib_1.it("should be false otherwise", function () {
                    test_lib_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(interfaces_1.LifecycleHooks.OnChanges, DirectiveNoHooks)).toBe(false);
                });
            });
            test_lib_1.describe("onDestroy", function () {
                test_lib_1.it("should be true when the directive has the onDestroy method", function () {
                    test_lib_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(interfaces_1.LifecycleHooks.OnDestroy, DirectiveWithOnDestroyMethod))
                        .toBe(true);
                });
                test_lib_1.it("should be false otherwise", function () {
                    test_lib_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(interfaces_1.LifecycleHooks.OnDestroy, DirectiveNoHooks)).toBe(false);
                });
            });
            test_lib_1.describe("onInit", function () {
                test_lib_1.it("should be true when the directive has the onInit method", function () {
                    test_lib_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(interfaces_1.LifecycleHooks.OnInit, DirectiveWithOnInitMethod)).toBe(true);
                });
                test_lib_1.it("should be false otherwise", function () {
                    test_lib_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(interfaces_1.LifecycleHooks.OnInit, DirectiveNoHooks)).toBe(false);
                });
            });
            test_lib_1.describe("doCheck", function () {
                test_lib_1.it("should be true when the directive has the doCheck method", function () {
                    test_lib_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(interfaces_1.LifecycleHooks.DoCheck, DirectiveWithOnCheckMethod)).toBe(true);
                });
                test_lib_1.it("should be false otherwise", function () {
                    test_lib_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(interfaces_1.LifecycleHooks.DoCheck, DirectiveNoHooks)).toBe(false);
                });
            });
            test_lib_1.describe("afterContentInit", function () {
                test_lib_1.it("should be true when the directive has the afterContentInit method", function () {
                    test_lib_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(interfaces_1.LifecycleHooks.AfterContentInit, DirectiveWithAfterContentInitMethod))
                        .toBe(true);
                });
                test_lib_1.it("should be false otherwise", function () {
                    test_lib_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(interfaces_1.LifecycleHooks.AfterContentInit, DirectiveNoHooks)).toBe(false);
                });
            });
            test_lib_1.describe("afterContentChecked", function () {
                test_lib_1.it("should be true when the directive has the afterContentChecked method", function () {
                    test_lib_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(interfaces_1.LifecycleHooks.AfterContentChecked, DirectiveWithAfterContentCheckedMethod))
                        .toBe(true);
                });
                test_lib_1.it("should be false otherwise", function () {
                    test_lib_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(interfaces_1.LifecycleHooks.AfterContentChecked, DirectiveNoHooks))
                        .toBe(false);
                });
            });
            test_lib_1.describe("afterViewInit", function () {
                test_lib_1.it("should be true when the directive has the afterViewInit method", function () {
                    test_lib_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(interfaces_1.LifecycleHooks.AfterViewInit, DirectiveWithAfterViewInitMethod))
                        .toBe(true);
                });
                test_lib_1.it("should be false otherwise", function () {
                    test_lib_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(interfaces_1.LifecycleHooks.AfterViewInit, DirectiveNoHooks)).toBe(false);
                });
            });
            test_lib_1.describe("afterViewChecked", function () {
                test_lib_1.it("should be true when the directive has the afterViewChecked method", function () {
                    test_lib_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(interfaces_1.LifecycleHooks.AfterViewChecked, DirectiveWithAfterViewCheckedMethod))
                        .toBe(true);
                });
                test_lib_1.it("should be false otherwise", function () {
                    test_lib_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(interfaces_1.LifecycleHooks.AfterViewChecked, DirectiveNoHooks)).toBe(false);
                });
            });
        });
    });
}
exports.main = main;
var DirectiveNoHooks = (function () {
    function DirectiveNoHooks() {
    }
    return DirectiveNoHooks;
})();
var DirectiveWithOnChangesMethod = (function () {
    function DirectiveWithOnChangesMethod() {
    }
    DirectiveWithOnChangesMethod.prototype.onChanges = function (_) { };
    return DirectiveWithOnChangesMethod;
})();
var DirectiveWithOnInitMethod = (function () {
    function DirectiveWithOnInitMethod() {
    }
    DirectiveWithOnInitMethod.prototype.onInit = function () { };
    return DirectiveWithOnInitMethod;
})();
var DirectiveWithOnCheckMethod = (function () {
    function DirectiveWithOnCheckMethod() {
    }
    DirectiveWithOnCheckMethod.prototype.doCheck = function () { };
    return DirectiveWithOnCheckMethod;
})();
var DirectiveWithOnDestroyMethod = (function () {
    function DirectiveWithOnDestroyMethod() {
    }
    DirectiveWithOnDestroyMethod.prototype.onDestroy = function () { };
    return DirectiveWithOnDestroyMethod;
})();
var DirectiveWithAfterContentInitMethod = (function () {
    function DirectiveWithAfterContentInitMethod() {
    }
    DirectiveWithAfterContentInitMethod.prototype.afterContentInit = function () { };
    return DirectiveWithAfterContentInitMethod;
})();
var DirectiveWithAfterContentCheckedMethod = (function () {
    function DirectiveWithAfterContentCheckedMethod() {
    }
    DirectiveWithAfterContentCheckedMethod.prototype.afterContentChecked = function () { };
    return DirectiveWithAfterContentCheckedMethod;
})();
var DirectiveWithAfterViewInitMethod = (function () {
    function DirectiveWithAfterViewInitMethod() {
    }
    DirectiveWithAfterViewInitMethod.prototype.afterViewInit = function () { };
    return DirectiveWithAfterViewInitMethod;
})();
var DirectiveWithAfterViewCheckedMethod = (function () {
    function DirectiveWithAfterViewCheckedMethod() {
    }
    DirectiveWithAfterViewCheckedMethod.prototype.afterViewChecked = function () { };
    return DirectiveWithAfterViewCheckedMethod;
})();
//# sourceMappingURL=directive_lifecycle_spec.js.map