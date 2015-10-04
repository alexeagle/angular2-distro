var test_lib_1 = require('angular2/test_lib');
var spies_1 = require('../spies');
var lang_1 = require('angular2/src/core/facade/lang');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var collection_1 = require('angular2/src/core/facade/collection');
var change_detection_1 = require('angular2/src/core/change_detection/change_detection');
var pipes_1 = require('angular2/src/core/change_detection/pipes');
var jit_proto_change_detector_1 = require('angular2/src/core/change_detection/jit_proto_change_detector');
var change_detector_config_1 = require('./change_detector_config');
var change_detector_spec_util_1 = require('./change_detector_spec_util');
var change_detector_classes_1 = require('./generated/change_detector_classes');
var platform_1 = require('../../platform');
var _DEFAULT_CONTEXT = lang_1.CONST_EXPR(new Object());
/**
 * Tests in this spec run against three different implementations of `AbstractChangeDetector`,
 * `dynamic` (which use reflection to inspect objects), `JIT` (which are generated only for
 * Javascript at runtime using `eval`) and `Pregen` (which are generated only for Dart prior
 * to app deploy to avoid the need for reflection).
 *
 * Pre-generated classes require knowledge of the shape of the change detector at the time of Dart
 * transformation, so in these tests we abstract a `ChangeDetectorDefinition` out into the
 * change_detector_config library and define a build step which pre-generates the necessary change
 * detectors to execute these tests. Once that built step has run, those generated change detectors
 * can be found in the generated/change_detector_classes library.
 */
function main() {
    collection_1.ListWrapper.forEach(['dynamic', 'JIT', 'Pregen'], function (cdType) {
        if (cdType == "JIT" && platform_1.IS_DART)
            return;
        if (cdType == "Pregen" && !platform_1.IS_DART)
            return;
        test_lib_1.describe(cdType + " Change Detector", function () {
            function _getProtoChangeDetector(def) {
                switch (cdType) {
                    case 'dynamic':
                        return new change_detection_1.DynamicProtoChangeDetector(def);
                    case 'JIT':
                        return new jit_proto_change_detector_1.JitProtoChangeDetector(def);
                    case 'Pregen':
                        return change_detector_classes_1.getFactoryById(def.id)(def);
                    default:
                        return null;
                }
            }
            function _createWithoutHydrate(expression) {
                var dispatcher = new TestDispatcher();
                var cd = _getProtoChangeDetector(change_detector_config_1.getDefinition(expression).cdDef).instantiate(dispatcher);
                return new _ChangeDetectorAndDispatcher(cd, dispatcher);
            }
            function _createChangeDetector(expression, context, registry, dispatcher) {
                if (context === void 0) { context = _DEFAULT_CONTEXT; }
                if (registry === void 0) { registry = null; }
                if (dispatcher === void 0) { dispatcher = null; }
                if (lang_1.isBlank(dispatcher))
                    dispatcher = new TestDispatcher();
                var testDef = change_detector_config_1.getDefinition(expression);
                var protoCd = _getProtoChangeDetector(testDef.cdDef);
                var cd = protoCd.instantiate(dispatcher);
                cd.hydrate(context, testDef.locals, null, registry);
                return new _ChangeDetectorAndDispatcher(cd, dispatcher);
            }
            function _bindSimpleValue(expression, context) {
                if (context === void 0) { context = _DEFAULT_CONTEXT; }
                var val = _createChangeDetector(expression, context);
                val.changeDetector.detectChanges();
                return val.dispatcher.log;
            }
            test_lib_1.it('should support literals', function () { test_lib_1.expect(_bindSimpleValue('10')).toEqual(['propName=10']); });
            test_lib_1.it('should strip quotes from literals', function () { test_lib_1.expect(_bindSimpleValue('"str"')).toEqual(['propName=str']); });
            test_lib_1.it('should support newlines in literals', function () { test_lib_1.expect(_bindSimpleValue('"a\n\nb"')).toEqual(['propName=a\n\nb']); });
            test_lib_1.it('should support + operations', function () { test_lib_1.expect(_bindSimpleValue('10 + 2')).toEqual(['propName=12']); });
            test_lib_1.it('should support - operations', function () { test_lib_1.expect(_bindSimpleValue('10 - 2')).toEqual(['propName=8']); });
            test_lib_1.it('should support * operations', function () { test_lib_1.expect(_bindSimpleValue('10 * 2')).toEqual(['propName=20']); });
            test_lib_1.it('should support / operations', function () {
                test_lib_1.expect(_bindSimpleValue('10 / 2')).toEqual([("propName=" + 5.0)]);
            }); // dart exp=5.0, js exp=5
            test_lib_1.it('should support % operations', function () { test_lib_1.expect(_bindSimpleValue('11 % 2')).toEqual(['propName=1']); });
            test_lib_1.it('should support == operations on identical', function () { test_lib_1.expect(_bindSimpleValue('1 == 1')).toEqual(['propName=true']); });
            test_lib_1.it('should support != operations', function () { test_lib_1.expect(_bindSimpleValue('1 != 1')).toEqual(['propName=false']); });
            test_lib_1.it('should support == operations on coerceible', function () {
                var expectedValue = platform_1.IS_DART ? 'false' : 'true';
                test_lib_1.expect(_bindSimpleValue('1 == true')).toEqual([("propName=" + expectedValue)]);
            });
            test_lib_1.it('should support === operations on identical', function () { test_lib_1.expect(_bindSimpleValue('1 === 1')).toEqual(['propName=true']); });
            test_lib_1.it('should support !== operations', function () { test_lib_1.expect(_bindSimpleValue('1 !== 1')).toEqual(['propName=false']); });
            test_lib_1.it('should support === operations on coerceible', function () { test_lib_1.expect(_bindSimpleValue('1 === true')).toEqual(['propName=false']); });
            test_lib_1.it('should support true < operations', function () { test_lib_1.expect(_bindSimpleValue('1 < 2')).toEqual(['propName=true']); });
            test_lib_1.it('should support false < operations', function () { test_lib_1.expect(_bindSimpleValue('2 < 1')).toEqual(['propName=false']); });
            test_lib_1.it('should support false > operations', function () { test_lib_1.expect(_bindSimpleValue('1 > 2')).toEqual(['propName=false']); });
            test_lib_1.it('should support true > operations', function () { test_lib_1.expect(_bindSimpleValue('2 > 1')).toEqual(['propName=true']); });
            test_lib_1.it('should support true <= operations', function () { test_lib_1.expect(_bindSimpleValue('1 <= 2')).toEqual(['propName=true']); });
            test_lib_1.it('should support equal <= operations', function () { test_lib_1.expect(_bindSimpleValue('2 <= 2')).toEqual(['propName=true']); });
            test_lib_1.it('should support false <= operations', function () { test_lib_1.expect(_bindSimpleValue('2 <= 1')).toEqual(['propName=false']); });
            test_lib_1.it('should support true >= operations', function () { test_lib_1.expect(_bindSimpleValue('2 >= 1')).toEqual(['propName=true']); });
            test_lib_1.it('should support equal >= operations', function () { test_lib_1.expect(_bindSimpleValue('2 >= 2')).toEqual(['propName=true']); });
            test_lib_1.it('should support false >= operations', function () { test_lib_1.expect(_bindSimpleValue('1 >= 2')).toEqual(['propName=false']); });
            test_lib_1.it('should support true && operations', function () { test_lib_1.expect(_bindSimpleValue('true && true')).toEqual(['propName=true']); });
            test_lib_1.it('should support false && operations', function () { test_lib_1.expect(_bindSimpleValue('true && false')).toEqual(['propName=false']); });
            test_lib_1.it('should support true || operations', function () { test_lib_1.expect(_bindSimpleValue('true || false')).toEqual(['propName=true']); });
            test_lib_1.it('should support false || operations', function () { test_lib_1.expect(_bindSimpleValue('false || false')).toEqual(['propName=false']); });
            test_lib_1.it('should support negate', function () { test_lib_1.expect(_bindSimpleValue('!true')).toEqual(['propName=false']); });
            test_lib_1.it('should support double negate', function () { test_lib_1.expect(_bindSimpleValue('!!true')).toEqual(['propName=true']); });
            test_lib_1.it('should support true conditionals', function () { test_lib_1.expect(_bindSimpleValue('1 < 2 ? 1 : 2')).toEqual(['propName=1']); });
            test_lib_1.it('should support false conditionals', function () { test_lib_1.expect(_bindSimpleValue('1 > 2 ? 1 : 2')).toEqual(['propName=2']); });
            test_lib_1.it('should support keyed access to a list item', function () { test_lib_1.expect(_bindSimpleValue('["foo", "bar"][0]')).toEqual(['propName=foo']); });
            test_lib_1.it('should support keyed access to a map item', function () { test_lib_1.expect(_bindSimpleValue('{"foo": "bar"}["foo"]')).toEqual(['propName=bar']); });
            test_lib_1.it('should report all changes on the first run including uninitialized values', function () {
                test_lib_1.expect(_bindSimpleValue('value', new Uninitialized())).toEqual(['propName=null']);
            });
            test_lib_1.it('should report all changes on the first run including null values', function () {
                var td = new TestData(null);
                test_lib_1.expect(_bindSimpleValue('a', td)).toEqual(['propName=null']);
            });
            test_lib_1.it('should support simple chained property access', function () {
                var address = new Address('Grenoble');
                var person = new Person('Victor', address);
                test_lib_1.expect(_bindSimpleValue('address.city', person)).toEqual(['propName=Grenoble']);
            });
            test_lib_1.it('should support the safe navigation operator', function () {
                var person = new Person('Victor', null);
                test_lib_1.expect(_bindSimpleValue('address?.city', person)).toEqual(['propName=null']);
                test_lib_1.expect(_bindSimpleValue('address?.toString()', person)).toEqual(['propName=null']);
                person.address = new Address('MTV');
                test_lib_1.expect(_bindSimpleValue('address?.city', person)).toEqual(['propName=MTV']);
                test_lib_1.expect(_bindSimpleValue('address?.toString()', person)).toEqual(['propName=MTV']);
            });
            test_lib_1.it('should support method calls', function () {
                var person = new Person('Victor');
                test_lib_1.expect(_bindSimpleValue('sayHi("Jim")', person)).toEqual(['propName=Hi, Jim']);
            });
            test_lib_1.it('should support function calls', function () {
                var td = new TestData(function () { return function (a) { return a; }; });
                test_lib_1.expect(_bindSimpleValue('a()(99)', td)).toEqual(['propName=99']);
            });
            test_lib_1.it('should support chained method calls', function () {
                var person = new Person('Victor');
                var td = new TestData(person);
                test_lib_1.expect(_bindSimpleValue('a.sayHi("Jim")', td)).toEqual(['propName=Hi, Jim']);
            });
            test_lib_1.it('should do simple watching', function () {
                var person = new Person('misko');
                var val = _createChangeDetector('name', person);
                val.changeDetector.detectChanges();
                test_lib_1.expect(val.dispatcher.log).toEqual(['propName=misko']);
                val.dispatcher.clear();
                val.changeDetector.detectChanges();
                test_lib_1.expect(val.dispatcher.log).toEqual([]);
                val.dispatcher.clear();
                person.name = 'Misko';
                val.changeDetector.detectChanges();
                test_lib_1.expect(val.dispatcher.log).toEqual(['propName=Misko']);
            });
            test_lib_1.it('should support literal array', function () {
                var val = _createChangeDetector('[1, 2]');
                val.changeDetector.detectChanges();
                test_lib_1.expect(val.dispatcher.loggedValues).toEqual([[1, 2]]);
                val = _createChangeDetector('[1, a]', new TestData(2));
                val.changeDetector.detectChanges();
                test_lib_1.expect(val.dispatcher.loggedValues).toEqual([[1, 2]]);
            });
            test_lib_1.it('should support literal maps', function () {
                var val = _createChangeDetector('{z: 1}');
                val.changeDetector.detectChanges();
                test_lib_1.expect(val.dispatcher.loggedValues[0]['z']).toEqual(1);
                val = _createChangeDetector('{z: a}', new TestData(1));
                val.changeDetector.detectChanges();
                test_lib_1.expect(val.dispatcher.loggedValues[0]['z']).toEqual(1);
            });
            test_lib_1.it('should support interpolation', function () {
                var val = _createChangeDetector('interpolation', new TestData('value'));
                val.changeDetector.hydrate(new TestData('value'), null, null, null);
                val.changeDetector.detectChanges();
                test_lib_1.expect(val.dispatcher.log).toEqual(['propName=BvalueA']);
            });
            test_lib_1.it('should output empty strings for null values in interpolation', function () {
                var val = _createChangeDetector('interpolation', new TestData('value'));
                val.changeDetector.hydrate(new TestData(null), null, null, null);
                val.changeDetector.detectChanges();
                test_lib_1.expect(val.dispatcher.log).toEqual(['propName=BA']);
            });
            test_lib_1.it('should escape values in literals that indicate interpolation', function () { test_lib_1.expect(_bindSimpleValue('"$"')).toEqual(['propName=$']); });
            test_lib_1.describe('pure functions', function () {
                test_lib_1.it('should preserve memoized result', function () {
                    var person = new Person('bob');
                    var val = _createChangeDetector('passThrough([12])', person);
                    val.changeDetector.detectChanges();
                    val.changeDetector.detectChanges();
                    test_lib_1.expect(val.dispatcher.loggedValues).toEqual([[12]]);
                });
            });
            test_lib_1.describe('change notification', function () {
                test_lib_1.describe('simple checks', function () {
                    test_lib_1.it('should pass a change record to the dispatcher', function () {
                        var person = new Person('bob');
                        var val = _createChangeDetector('name', person);
                        val.changeDetector.detectChanges();
                        test_lib_1.expect(val.dispatcher.loggedValues).toEqual(['bob']);
                    });
                });
                test_lib_1.describe('pipes', function () {
                    test_lib_1.it('should pass a change record to the dispatcher', function () {
                        var registry = new FakePipes('pipe', function () { return new CountingPipe(); });
                        var person = new Person('bob');
                        var val = _createChangeDetector('name | pipe', person, registry);
                        val.changeDetector.detectChanges();
                        test_lib_1.expect(val.dispatcher.loggedValues).toEqual(['bob state:0']);
                    });
                    test_lib_1.it('should support arguments in pipes', function () {
                        var registry = new FakePipes('pipe', function () { return new MultiArgPipe(); });
                        var address = new Address('two');
                        var person = new Person('value', address);
                        var val = _createChangeDetector("name | pipe:'one':address.city", person, registry);
                        val.changeDetector.detectChanges();
                        test_lib_1.expect(val.dispatcher.loggedValues).toEqual(['value one two default']);
                    });
                    test_lib_1.it('should not reevaluate pure pipes unless its context or arg changes', function () {
                        var pipe = new CountingPipe();
                        var registry = new FakePipes('pipe', function () { return pipe; }, { pure: true });
                        var person = new Person('bob');
                        var val = _createChangeDetector('name | pipe', person, registry);
                        val.changeDetector.detectChanges();
                        test_lib_1.expect(pipe.state).toEqual(1);
                        val.changeDetector.detectChanges();
                        test_lib_1.expect(pipe.state).toEqual(1);
                        person.name = 'jim';
                        val.changeDetector.detectChanges();
                        test_lib_1.expect(pipe.state).toEqual(2);
                    });
                    test_lib_1.it('should reevaluate impure pipes neither context nor arg changes', function () {
                        var pipe = new CountingPipe();
                        var registry = new FakePipes('pipe', function () { return pipe; }, { pure: false });
                        var person = new Person('bob');
                        var val = _createChangeDetector('name | pipe', person, registry);
                        val.changeDetector.detectChanges();
                        test_lib_1.expect(pipe.state).toEqual(1);
                        val.changeDetector.detectChanges();
                        test_lib_1.expect(pipe.state).toEqual(2);
                    });
                    test_lib_1.it('should support pipes as arguments to pure functions', function () {
                        var registry = new FakePipes('pipe', function () { return new IdentityPipe(); });
                        var person = new Person('bob');
                        var val = _createChangeDetector('(name | pipe).length', person, registry);
                        val.changeDetector.detectChanges();
                        test_lib_1.expect(val.dispatcher.loggedValues).toEqual([3]);
                    });
                });
                test_lib_1.it('should notify the dispatcher after content children have checked', function () {
                    var val = _createChangeDetector('name', new Person('bob'));
                    val.changeDetector.detectChanges();
                    test_lib_1.expect(val.dispatcher.afterContentCheckedCalled).toEqual(true);
                });
                test_lib_1.it('should notify the dispatcher after view children have been checked', function () {
                    var val = _createChangeDetector('name', new Person('bob'));
                    val.changeDetector.detectChanges();
                    test_lib_1.expect(val.dispatcher.afterViewCheckedCalled).toEqual(true);
                });
                test_lib_1.describe('updating directives', function () {
                    var directive1;
                    var directive2;
                    test_lib_1.beforeEach(function () {
                        directive1 = new TestDirective();
                        directive2 = new TestDirective();
                    });
                    test_lib_1.it('should happen directly, without invoking the dispatcher', function () {
                        var val = _createWithoutHydrate('directNoDispatcher');
                        val.changeDetector.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([directive1], []), null);
                        val.changeDetector.detectChanges();
                        test_lib_1.expect(val.dispatcher.loggedValues).toEqual([]);
                        test_lib_1.expect(directive1.a).toEqual(42);
                    });
                    test_lib_1.describe('lifecycle', function () {
                        test_lib_1.describe('onChanges', function () {
                            test_lib_1.it('should notify the directive when a group of records changes', function () {
                                var cd = _createWithoutHydrate('groupChanges').changeDetector;
                                cd.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([directive1, directive2], []), null);
                                cd.detectChanges();
                                test_lib_1.expect(directive1.changes).toEqual({ 'a': 1, 'b': 2 });
                                test_lib_1.expect(directive2.changes).toEqual({ 'a': 3 });
                            });
                        });
                        test_lib_1.describe('doCheck', function () {
                            test_lib_1.it('should notify the directive when it is checked', function () {
                                var cd = _createWithoutHydrate('directiveDoCheck').changeDetector;
                                cd.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([directive1], []), null);
                                cd.detectChanges();
                                test_lib_1.expect(directive1.doCheckCalled).toBe(true);
                                directive1.doCheckCalled = false;
                                cd.detectChanges();
                                test_lib_1.expect(directive1.doCheckCalled).toBe(true);
                            });
                            test_lib_1.it('should not call doCheck in detectNoChanges', function () {
                                var cd = _createWithoutHydrate('directiveDoCheck').changeDetector;
                                cd.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([directive1], []), null);
                                cd.checkNoChanges();
                                test_lib_1.expect(directive1.doCheckCalled).toBe(false);
                            });
                        });
                        test_lib_1.describe('onInit', function () {
                            test_lib_1.it('should notify the directive after it has been checked the first time', function () {
                                var cd = _createWithoutHydrate('directiveOnInit').changeDetector;
                                cd.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([directive1, directive2], []), null);
                                cd.detectChanges();
                                test_lib_1.expect(directive1.onInitCalled).toBe(true);
                                directive1.onInitCalled = false;
                                cd.detectChanges();
                                test_lib_1.expect(directive1.onInitCalled).toBe(false);
                            });
                            test_lib_1.it('should not call onInit in detectNoChanges', function () {
                                var cd = _createWithoutHydrate('directiveOnInit').changeDetector;
                                cd.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([directive1], []), null);
                                cd.checkNoChanges();
                                test_lib_1.expect(directive1.onInitCalled).toBe(false);
                            });
                        });
                        test_lib_1.describe('afterContentInit', function () {
                            test_lib_1.it('should be called after processing the content children', function () {
                                var cd = _createWithoutHydrate('emptyWithDirectiveRecords').changeDetector;
                                cd.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([directive1, directive2], []), null);
                                cd.detectChanges();
                                test_lib_1.expect(directive1.afterContentInitCalled).toBe(true);
                                test_lib_1.expect(directive2.afterContentInitCalled).toBe(true);
                                // reset directives
                                directive1.afterContentInitCalled = false;
                                directive2.afterContentInitCalled = false;
                                // Verify that checking should not call them.
                                cd.checkNoChanges();
                                test_lib_1.expect(directive1.afterContentInitCalled).toBe(false);
                                test_lib_1.expect(directive2.afterContentInitCalled).toBe(false);
                                // re-verify that changes should not call them
                                cd.detectChanges();
                                test_lib_1.expect(directive1.afterContentInitCalled).toBe(false);
                                test_lib_1.expect(directive2.afterContentInitCalled).toBe(false);
                            });
                            test_lib_1.it('should not be called when afterContentInit is false', function () {
                                var cd = _createWithoutHydrate('noCallbacks').changeDetector;
                                cd.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([directive1], []), null);
                                cd.detectChanges();
                                test_lib_1.expect(directive1.afterContentInitCalled).toEqual(false);
                            });
                        });
                        test_lib_1.describe('afterContentChecked', function () {
                            test_lib_1.it('should be called after processing all the children', function () {
                                var cd = _createWithoutHydrate('emptyWithDirectiveRecords').changeDetector;
                                cd.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([directive1, directive2], []), null);
                                cd.detectChanges();
                                test_lib_1.expect(directive1.afterContentCheckedCalled).toBe(true);
                                test_lib_1.expect(directive2.afterContentCheckedCalled).toBe(true);
                                // reset directives
                                directive1.afterContentCheckedCalled = false;
                                directive2.afterContentCheckedCalled = false;
                                // Verify that checking should not call them.
                                cd.checkNoChanges();
                                test_lib_1.expect(directive1.afterContentCheckedCalled).toBe(false);
                                test_lib_1.expect(directive2.afterContentCheckedCalled).toBe(false);
                                // re-verify that changes are still detected
                                cd.detectChanges();
                                test_lib_1.expect(directive1.afterContentCheckedCalled).toBe(true);
                                test_lib_1.expect(directive2.afterContentCheckedCalled).toBe(true);
                            });
                            test_lib_1.it('should not be called when afterContentChecked is false', function () {
                                var cd = _createWithoutHydrate('noCallbacks').changeDetector;
                                cd.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([directive1], []), null);
                                cd.detectChanges();
                                test_lib_1.expect(directive1.afterContentCheckedCalled).toEqual(false);
                            });
                            test_lib_1.it('should be called in reverse order so the child is always notified before the parent', function () {
                                var cd = _createWithoutHydrate('emptyWithDirectiveRecords').changeDetector;
                                var onChangesDoneCalls = [];
                                var td1;
                                td1 = new TestDirective(function () { return onChangesDoneCalls.push(td1); });
                                var td2;
                                td2 = new TestDirective(function () { return onChangesDoneCalls.push(td2); });
                                cd.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([td1, td2], []), null);
                                cd.detectChanges();
                                test_lib_1.expect(onChangesDoneCalls).toEqual([td2, td1]);
                            });
                            test_lib_1.it('should be called before processing view children', function () {
                                var parent = _createWithoutHydrate('directNoDispatcher').changeDetector;
                                var child = _createWithoutHydrate('directNoDispatcher').changeDetector;
                                parent.addShadowDomChild(child);
                                var orderOfOperations = [];
                                var directiveInShadowDom;
                                directiveInShadowDom =
                                    new TestDirective(function () { orderOfOperations.push(directiveInShadowDom); });
                                var parentDirective;
                                parentDirective =
                                    new TestDirective(function () { orderOfOperations.push(parentDirective); });
                                parent.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([parentDirective], []), null);
                                child.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([directiveInShadowDom], []), null);
                                parent.detectChanges();
                                test_lib_1.expect(orderOfOperations).toEqual([parentDirective, directiveInShadowDom]);
                            });
                        });
                        test_lib_1.describe('afterViewInit', function () {
                            test_lib_1.it('should be called after processing the view children', function () {
                                var cd = _createWithoutHydrate('emptyWithDirectiveRecords').changeDetector;
                                cd.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([directive1, directive2], []), null);
                                cd.detectChanges();
                                test_lib_1.expect(directive1.afterViewInitCalled).toBe(true);
                                test_lib_1.expect(directive2.afterViewInitCalled).toBe(true);
                                // reset directives
                                directive1.afterViewInitCalled = false;
                                directive2.afterViewInitCalled = false;
                                // Verify that checking should not call them.
                                cd.checkNoChanges();
                                test_lib_1.expect(directive1.afterViewInitCalled).toBe(false);
                                test_lib_1.expect(directive2.afterViewInitCalled).toBe(false);
                                // re-verify that changes should not call them
                                cd.detectChanges();
                                test_lib_1.expect(directive1.afterViewInitCalled).toBe(false);
                                test_lib_1.expect(directive2.afterViewInitCalled).toBe(false);
                            });
                            test_lib_1.it('should not be called when afterViewInit is false', function () {
                                var cd = _createWithoutHydrate('noCallbacks').changeDetector;
                                cd.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([directive1], []), null);
                                cd.detectChanges();
                                test_lib_1.expect(directive1.afterViewInitCalled).toEqual(false);
                            });
                        });
                        test_lib_1.describe('afterViewChecked', function () {
                            test_lib_1.it('should be called after processing the view children', function () {
                                var cd = _createWithoutHydrate('emptyWithDirectiveRecords').changeDetector;
                                cd.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([directive1, directive2], []), null);
                                cd.detectChanges();
                                test_lib_1.expect(directive1.afterViewCheckedCalled).toBe(true);
                                test_lib_1.expect(directive2.afterViewCheckedCalled).toBe(true);
                                // reset directives
                                directive1.afterViewCheckedCalled = false;
                                directive2.afterViewCheckedCalled = false;
                                // Verify that checking should not call them.
                                cd.checkNoChanges();
                                test_lib_1.expect(directive1.afterViewCheckedCalled).toBe(false);
                                test_lib_1.expect(directive2.afterViewCheckedCalled).toBe(false);
                                // re-verify that changes should call them
                                cd.detectChanges();
                                test_lib_1.expect(directive1.afterViewCheckedCalled).toBe(true);
                                test_lib_1.expect(directive2.afterViewCheckedCalled).toBe(true);
                            });
                            test_lib_1.it('should not be called when afterViewChecked is false', function () {
                                var cd = _createWithoutHydrate('noCallbacks').changeDetector;
                                cd.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([directive1], []), null);
                                cd.detectChanges();
                                test_lib_1.expect(directive1.afterViewCheckedCalled).toEqual(false);
                            });
                            test_lib_1.it('should be called in reverse order so the child is always notified before the parent', function () {
                                var cd = _createWithoutHydrate('emptyWithDirectiveRecords').changeDetector;
                                var onChangesDoneCalls = [];
                                var td1;
                                td1 = new TestDirective(null, function () { return onChangesDoneCalls.push(td1); });
                                var td2;
                                td2 = new TestDirective(null, function () { return onChangesDoneCalls.push(td2); });
                                cd.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([td1, td2], []), null);
                                cd.detectChanges();
                                test_lib_1.expect(onChangesDoneCalls).toEqual([td2, td1]);
                            });
                            test_lib_1.it('should be called after processing view children', function () {
                                var parent = _createWithoutHydrate('directNoDispatcher').changeDetector;
                                var child = _createWithoutHydrate('directNoDispatcher').changeDetector;
                                parent.addShadowDomChild(child);
                                var orderOfOperations = [];
                                var directiveInShadowDom;
                                directiveInShadowDom = new TestDirective(null, function () { orderOfOperations.push(directiveInShadowDom); });
                                var parentDirective;
                                parentDirective =
                                    new TestDirective(null, function () { orderOfOperations.push(parentDirective); });
                                parent.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([parentDirective], []), null);
                                child.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([directiveInShadowDom], []), null);
                                parent.detectChanges();
                                test_lib_1.expect(orderOfOperations).toEqual([directiveInShadowDom, parentDirective]);
                            });
                        });
                    });
                });
            });
            test_lib_1.describe("logBindingUpdate", function () {
                test_lib_1.it('should be called for element updates in the dev mode', function () {
                    var person = new Person('bob');
                    var val = _createChangeDetector('name', person);
                    val.changeDetector.detectChanges();
                    test_lib_1.expect(val.dispatcher.debugLog).toEqual(['propName=bob']);
                });
                test_lib_1.it('should be called for directive updates in the dev mode', function () {
                    var val = _createWithoutHydrate('directNoDispatcher');
                    val.changeDetector.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([new TestDirective()], []), null);
                    val.changeDetector.detectChanges();
                    test_lib_1.expect(val.dispatcher.debugLog).toEqual(["a=42"]);
                });
                test_lib_1.it('should not be called in the prod mode', function () {
                    var person = new Person('bob');
                    var val = _createChangeDetector('updateElementProduction', person);
                    val.changeDetector.detectChanges();
                    test_lib_1.expect(val.dispatcher.debugLog).toEqual([]);
                });
            });
            test_lib_1.describe('reading directives', function () {
                test_lib_1.it('should read directive properties', function () {
                    var directive = new TestDirective();
                    directive.a = 'aaa';
                    var val = _createWithoutHydrate('readingDirectives');
                    val.changeDetector.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([directive], []), null);
                    val.changeDetector.detectChanges();
                    test_lib_1.expect(val.dispatcher.loggedValues).toEqual(['aaa']);
                });
            });
            test_lib_1.describe('enforce no new changes', function () {
                test_lib_1.it('should throw when a record gets changed after it has been checked', function () {
                    var val = _createChangeDetector('a', new TestData('value'));
                    test_lib_1.expect(function () { val.changeDetector.checkNoChanges(); })
                        .toThrowError(new RegExp('Expression [\'"]a in location[\'"] has changed after it was checked'));
                });
                test_lib_1.it('should not break the next run', function () {
                    var val = _createChangeDetector('a', new TestData('value'));
                    test_lib_1.expect(function () { return val.changeDetector.checkNoChanges(); })
                        .toThrowError(new RegExp('Expression [\'"]a in location[\'"] has changed after it was checked.'));
                    val.changeDetector.detectChanges();
                    test_lib_1.expect(val.dispatcher.loggedValues).toEqual(['value']);
                });
            });
            test_lib_1.describe('error handling', function () {
                test_lib_1.it('should wrap exceptions into ChangeDetectionError', function () {
                    var val = _createChangeDetector('invalidFn(1)');
                    try {
                        val.changeDetector.detectChanges();
                        throw new exceptions_1.BaseException('fail');
                    }
                    catch (e) {
                        test_lib_1.expect(e).toBeAnInstanceOf(change_detection_1.ChangeDetectionError);
                        test_lib_1.expect(e.location).toEqual('invalidFn(1) in location');
                    }
                });
                test_lib_1.it('should handle unexpected errors in the event handler itself', function () {
                    var throwingDispatcher = new spies_1.SpyChangeDispatcher();
                    throwingDispatcher.spy("getDebugContext")
                        .andCallFake(function (_, __) { throw new exceptions_1.BaseException('boom'); });
                    var val = _createChangeDetector('invalidFn(1)', _DEFAULT_CONTEXT, null, throwingDispatcher);
                    try {
                        val.changeDetector.detectChanges();
                        throw new exceptions_1.BaseException('fail');
                    }
                    catch (e) {
                        test_lib_1.expect(e).toBeAnInstanceOf(change_detection_1.ChangeDetectionError);
                        test_lib_1.expect(e.location).toEqual(null);
                    }
                });
            });
            test_lib_1.describe('Locals', function () {
                test_lib_1.it('should read a value from locals', function () { test_lib_1.expect(_bindSimpleValue('valueFromLocals')).toEqual(['propName=value']); });
                test_lib_1.it('should invoke a function from local', function () { test_lib_1.expect(_bindSimpleValue('functionFromLocals')).toEqual(['propName=value']); });
                test_lib_1.it('should handle nested locals', function () { test_lib_1.expect(_bindSimpleValue('nestedLocals')).toEqual(['propName=value']); });
                test_lib_1.it('should fall back to a regular field read when the locals map' +
                    'does not have the requested field', function () {
                    test_lib_1.expect(_bindSimpleValue('fallbackLocals', new Person('Jim')))
                        .toEqual(['propName=Jim']);
                });
                test_lib_1.it('should correctly handle nested properties', function () {
                    var address = new Address('Grenoble');
                    var person = new Person('Victor', address);
                    test_lib_1.expect(_bindSimpleValue('contextNestedPropertyWithLocals', person))
                        .toEqual(['propName=Grenoble']);
                    test_lib_1.expect(_bindSimpleValue('localPropertyWithSimilarContext', person))
                        .toEqual(['propName=MTV']);
                });
            });
            test_lib_1.describe('handle children', function () {
                var parent, child;
                test_lib_1.beforeEach(function () {
                    parent = _createChangeDetector('10').changeDetector;
                    child = _createChangeDetector('"str"').changeDetector;
                });
                test_lib_1.it('should add light dom children', function () {
                    parent.addChild(child);
                    test_lib_1.expect(parent.lightDomChildren.length).toEqual(1);
                    test_lib_1.expect(parent.lightDomChildren[0]).toBe(child);
                });
                test_lib_1.it('should add shadow dom children', function () {
                    parent.addShadowDomChild(child);
                    test_lib_1.expect(parent.shadowDomChildren.length).toEqual(1);
                    test_lib_1.expect(parent.shadowDomChildren[0]).toBe(child);
                });
                test_lib_1.it('should remove light dom children', function () {
                    parent.addChild(child);
                    parent.removeChild(child);
                    test_lib_1.expect(parent.lightDomChildren).toEqual([]);
                });
                test_lib_1.it('should remove shadow dom children', function () {
                    parent.addShadowDomChild(child);
                    parent.removeShadowDomChild(child);
                    test_lib_1.expect(parent.shadowDomChildren.length).toEqual(0);
                });
            });
            test_lib_1.describe('mode', function () {
                test_lib_1.it('should set the mode to CheckAlways when the default change detection is used', function () {
                    var cd = _createWithoutHydrate('emptyUsingDefaultStrategy').changeDetector;
                    test_lib_1.expect(cd.mode).toEqual(null);
                    cd.hydrate(_DEFAULT_CONTEXT, null, null, null);
                    test_lib_1.expect(cd.mode).toEqual(change_detection_1.ChangeDetectionStrategy.CheckAlways);
                });
                test_lib_1.it('should set the mode to CheckOnce when the push change detection is used', function () {
                    var cd = _createWithoutHydrate('emptyUsingOnPushStrategy').changeDetector;
                    cd.hydrate(_DEFAULT_CONTEXT, null, null, null);
                    test_lib_1.expect(cd.mode).toEqual(change_detection_1.ChangeDetectionStrategy.CheckOnce);
                });
                test_lib_1.it('should not check a detached change detector', function () {
                    var val = _createChangeDetector('a', new TestData('value'));
                    val.changeDetector.hydrate(_DEFAULT_CONTEXT, null, null, null);
                    val.changeDetector.mode = change_detection_1.ChangeDetectionStrategy.Detached;
                    val.changeDetector.detectChanges();
                    test_lib_1.expect(val.dispatcher.log).toEqual([]);
                });
                test_lib_1.it('should not check a checked change detector', function () {
                    var val = _createChangeDetector('a', new TestData('value'));
                    val.changeDetector.hydrate(_DEFAULT_CONTEXT, null, null, null);
                    val.changeDetector.mode = change_detection_1.ChangeDetectionStrategy.Checked;
                    val.changeDetector.detectChanges();
                    test_lib_1.expect(val.dispatcher.log).toEqual([]);
                });
                test_lib_1.it('should change CheckOnce to Checked', function () {
                    var cd = _createChangeDetector('10').changeDetector;
                    cd.hydrate(_DEFAULT_CONTEXT, null, null, null);
                    cd.mode = change_detection_1.ChangeDetectionStrategy.CheckOnce;
                    cd.detectChanges();
                    test_lib_1.expect(cd.mode).toEqual(change_detection_1.ChangeDetectionStrategy.Checked);
                });
                test_lib_1.it('should not change the CheckAlways', function () {
                    var cd = _createChangeDetector('10').changeDetector;
                    cd.hydrate(_DEFAULT_CONTEXT, null, null, null);
                    cd.mode = change_detection_1.ChangeDetectionStrategy.CheckAlways;
                    cd.detectChanges();
                    test_lib_1.expect(cd.mode).toEqual(change_detection_1.ChangeDetectionStrategy.CheckAlways);
                });
                test_lib_1.describe('marking OnPush detectors as CheckOnce after an update', function () {
                    var childDirectiveDetectorRegular;
                    var childDirectiveDetectorOnPush;
                    var directives;
                    test_lib_1.beforeEach(function () {
                        childDirectiveDetectorRegular = _createWithoutHydrate('10').changeDetector;
                        childDirectiveDetectorRegular.hydrate(_DEFAULT_CONTEXT, null, null, null);
                        childDirectiveDetectorRegular.mode = change_detection_1.ChangeDetectionStrategy.CheckAlways;
                        childDirectiveDetectorOnPush =
                            _createWithoutHydrate('emptyUsingOnPushStrategy').changeDetector;
                        childDirectiveDetectorOnPush.hydrate(_DEFAULT_CONTEXT, null, null, null);
                        childDirectiveDetectorOnPush.mode = change_detection_1.ChangeDetectionStrategy.Checked;
                        directives =
                            new FakeDirectives([new TestData(null), new TestData(null)], [childDirectiveDetectorRegular, childDirectiveDetectorOnPush]);
                    });
                    test_lib_1.it('should set the mode to CheckOnce when a binding is updated', function () {
                        var parentDetector = _createWithoutHydrate('onPushRecordsUsingDefaultStrategy').changeDetector;
                        parentDetector.hydrate(_DEFAULT_CONTEXT, null, directives, null);
                        parentDetector.detectChanges();
                        // making sure that we only change the status of OnPush components
                        test_lib_1.expect(childDirectiveDetectorRegular.mode).toEqual(change_detection_1.ChangeDetectionStrategy.CheckAlways);
                        test_lib_1.expect(childDirectiveDetectorOnPush.mode).toEqual(change_detection_1.ChangeDetectionStrategy.CheckOnce);
                    });
                    test_lib_1.it('should mark OnPush detectors as CheckOnce after an event', function () {
                        var cd = _createWithoutHydrate('onPushWithEvent').changeDetector;
                        cd.hydrate(_DEFAULT_CONTEXT, null, directives, null);
                        cd.mode = change_detection_1.ChangeDetectionStrategy.Checked;
                        cd.handleEvent("event", 0, null);
                        test_lib_1.expect(cd.mode).toEqual(change_detection_1.ChangeDetectionStrategy.CheckOnce);
                    });
                    test_lib_1.it('should mark OnPush detectors as CheckOnce after a host event', function () {
                        var cd = _createWithoutHydrate('onPushWithHostEvent').changeDetector;
                        cd.hydrate(_DEFAULT_CONTEXT, null, directives, null);
                        cd.handleEvent("host-event", 0, null);
                        test_lib_1.expect(childDirectiveDetectorOnPush.mode).toEqual(change_detection_1.ChangeDetectionStrategy.CheckOnce);
                    });
                    if (platform_1.IS_DART) {
                        test_lib_1.describe('OnPushObserve', function () {
                            test_lib_1.it('should mark OnPushObserve detectors as CheckOnce when an observable fires an event', test_lib_1.fakeAsync(function () {
                                var context = new TestDirective();
                                context.a = change_detector_spec_util_1.createObservableModel();
                                var cd = _createWithoutHydrate('onPushObserveBinding').changeDetector;
                                cd.hydrate(context, null, directives, null);
                                cd.detectChanges();
                                test_lib_1.expect(cd.mode).toEqual(change_detection_1.ChangeDetectionStrategy.Checked);
                                context.a.pushUpdate();
                                test_lib_1.tick();
                                test_lib_1.expect(cd.mode).toEqual(change_detection_1.ChangeDetectionStrategy.CheckOnce);
                            }));
                            test_lib_1.it('should mark OnPushObserve detectors as CheckOnce when an observable context fires an event', test_lib_1.fakeAsync(function () {
                                var context = change_detector_spec_util_1.createObservableModel();
                                var cd = _createWithoutHydrate('onPushObserveComponent').changeDetector;
                                cd.hydrate(context, null, directives, null);
                                cd.detectChanges();
                                test_lib_1.expect(cd.mode).toEqual(change_detection_1.ChangeDetectionStrategy.Checked);
                                context.pushUpdate();
                                test_lib_1.tick();
                                test_lib_1.expect(cd.mode).toEqual(change_detection_1.ChangeDetectionStrategy.CheckOnce);
                            }));
                            test_lib_1.it('should mark OnPushObserve detectors as CheckOnce when an observable directive fires an event', test_lib_1.fakeAsync(function () {
                                var dir = change_detector_spec_util_1.createObservableModel();
                                var directives = new FakeDirectives([dir], []);
                                var cd = _createWithoutHydrate('onPushObserveDirective').changeDetector;
                                cd.hydrate(_DEFAULT_CONTEXT, null, directives, null);
                                cd.detectChanges();
                                test_lib_1.expect(cd.mode).toEqual(change_detection_1.ChangeDetectionStrategy.Checked);
                                dir.pushUpdate();
                                test_lib_1.tick();
                                test_lib_1.expect(cd.mode).toEqual(change_detection_1.ChangeDetectionStrategy.CheckOnce);
                            }));
                            test_lib_1.it('should unsubscribe from an old observable when an object changes', test_lib_1.fakeAsync(function () {
                                var originalModel = change_detector_spec_util_1.createObservableModel();
                                var context = new TestDirective();
                                context.a = originalModel;
                                var cd = _createWithoutHydrate('onPushObserveBinding').changeDetector;
                                cd.hydrate(context, null, directives, null);
                                cd.detectChanges();
                                context.a = change_detector_spec_util_1.createObservableModel();
                                cd.mode = change_detection_1.ChangeDetectionStrategy.CheckOnce;
                                cd.detectChanges();
                                // Updating this model will not reenable the detector. This model is not longer
                                // used.
                                originalModel.pushUpdate();
                                test_lib_1.tick();
                                test_lib_1.expect(cd.mode).toEqual(change_detection_1.ChangeDetectionStrategy.Checked);
                            }));
                            test_lib_1.it('should unsubscribe from observables when dehydrating', test_lib_1.fakeAsync(function () {
                                var originalModel = change_detector_spec_util_1.createObservableModel();
                                var context = new TestDirective();
                                context.a = originalModel;
                                var cd = _createWithoutHydrate('onPushObserveBinding').changeDetector;
                                cd.hydrate(context, null, directives, null);
                                cd.detectChanges();
                                cd.dehydrate();
                                context.a = "not an observable model";
                                cd.hydrate(context, null, directives, null);
                                cd.detectChanges();
                                // Updating this model will not reenable the detector. This model is not longer
                                // used.
                                originalModel.pushUpdate();
                                test_lib_1.tick();
                                test_lib_1.expect(cd.mode).toEqual(change_detection_1.ChangeDetectionStrategy.Checked);
                            }));
                        });
                    }
                });
            });
            test_lib_1.describe('markPathToRootAsCheckOnce', function () {
                function changeDetector(mode, parent) {
                    var val = _createChangeDetector('10');
                    val.changeDetector.mode = mode;
                    if (lang_1.isPresent(parent))
                        parent.addChild(val.changeDetector);
                    return val.changeDetector;
                }
                test_lib_1.it('should mark all checked detectors as CheckOnce until reaching a detached one', function () {
                    var root = changeDetector(change_detection_1.ChangeDetectionStrategy.CheckAlways, null);
                    var disabled = changeDetector(change_detection_1.ChangeDetectionStrategy.Detached, root);
                    var parent = changeDetector(change_detection_1.ChangeDetectionStrategy.Checked, disabled);
                    var checkAlwaysChild = changeDetector(change_detection_1.ChangeDetectionStrategy.CheckAlways, parent);
                    var checkOnceChild = changeDetector(change_detection_1.ChangeDetectionStrategy.CheckOnce, checkAlwaysChild);
                    var checkedChild = changeDetector(change_detection_1.ChangeDetectionStrategy.Checked, checkOnceChild);
                    checkedChild.markPathToRootAsCheckOnce();
                    test_lib_1.expect(root.mode).toEqual(change_detection_1.ChangeDetectionStrategy.CheckAlways);
                    test_lib_1.expect(disabled.mode).toEqual(change_detection_1.ChangeDetectionStrategy.Detached);
                    test_lib_1.expect(parent.mode).toEqual(change_detection_1.ChangeDetectionStrategy.CheckOnce);
                    test_lib_1.expect(checkAlwaysChild.mode).toEqual(change_detection_1.ChangeDetectionStrategy.CheckAlways);
                    test_lib_1.expect(checkOnceChild.mode).toEqual(change_detection_1.ChangeDetectionStrategy.CheckOnce);
                    test_lib_1.expect(checkedChild.mode).toEqual(change_detection_1.ChangeDetectionStrategy.CheckOnce);
                });
            });
            test_lib_1.describe('hydration', function () {
                test_lib_1.it('should be able to rehydrate a change detector', function () {
                    var cd = _createChangeDetector('name').changeDetector;
                    cd.hydrate('some context', null, null, null);
                    test_lib_1.expect(cd.hydrated()).toBe(true);
                    cd.dehydrate();
                    test_lib_1.expect(cd.hydrated()).toBe(false);
                    cd.hydrate('other context', null, null, null);
                    test_lib_1.expect(cd.hydrated()).toBe(true);
                });
                test_lib_1.it('should destroy all active pipes implementing onDestroy during dehyration', function () {
                    var pipe = new PipeWithOnDestroy();
                    var registry = new FakePipes('pipe', function () { return pipe; });
                    var cd = _createChangeDetector('name | pipe', new Person('bob'), registry).changeDetector;
                    cd.detectChanges();
                    cd.dehydrate();
                    test_lib_1.expect(pipe.destroyCalled).toBe(true);
                });
                test_lib_1.it('should not call onDestroy all pipes that do not implement onDestroy', function () {
                    var pipe = new CountingPipe();
                    var registry = new FakePipes('pipe', function () { return pipe; });
                    var cd = _createChangeDetector('name | pipe', new Person('bob'), registry).changeDetector;
                    cd.detectChanges();
                    test_lib_1.expect(function () { return cd.dehydrate(); }).not.toThrow();
                });
                test_lib_1.it('should throw when detectChanges is called on a dehydrated detector', function () {
                    var context = new Person('Bob');
                    var val = _createChangeDetector('name', context);
                    val.changeDetector.detectChanges();
                    test_lib_1.expect(val.dispatcher.log).toEqual(['propName=Bob']);
                    val.changeDetector.dehydrate();
                    test_lib_1.expect(function () { val.changeDetector.detectChanges(); })
                        .toThrowErrorWith("Attempt to detect changes on a dehydrated detector");
                    test_lib_1.expect(val.dispatcher.log).toEqual(['propName=Bob']);
                });
            });
            test_lib_1.it('should do nothing when no change', function () {
                var registry = new FakePipes('pipe', function () { return new IdentityPipe(); });
                var ctx = new Person('Megatron');
                var val = _createChangeDetector('name | pipe', ctx, registry);
                val.changeDetector.detectChanges();
                test_lib_1.expect(val.dispatcher.log).toEqual(['propName=Megatron']);
                val.dispatcher.clear();
                val.changeDetector.detectChanges();
                test_lib_1.expect(val.dispatcher.log).toEqual([]);
            });
            test_lib_1.it('should unwrap the wrapped value', function () {
                var registry = new FakePipes('pipe', function () { return new WrappedPipe(); });
                var ctx = new Person('Megatron');
                var val = _createChangeDetector('name | pipe', ctx, registry);
                val.changeDetector.detectChanges();
                test_lib_1.expect(val.dispatcher.log).toEqual(['propName=Megatron']);
            });
            test_lib_1.describe('handleEvent', function () {
                var locals;
                var d;
                test_lib_1.beforeEach(function () {
                    locals = new change_detection_1.Locals(null, collection_1.MapWrapper.createFromStringMap({ "$event": "EVENT" }));
                    d = new TestDirective();
                });
                test_lib_1.it('should execute events', function () {
                    var val = _createChangeDetector('(event)="onEvent($event)"', d, null);
                    val.changeDetector.handleEvent("event", 0, locals);
                    test_lib_1.expect(d.event).toEqual("EVENT");
                });
                test_lib_1.it('should execute host events', function () {
                    var val = _createWithoutHydrate('(host-event)="onEvent($event)"');
                    val.changeDetector.hydrate(_DEFAULT_CONTEXT, null, new FakeDirectives([d], []), null);
                    val.changeDetector.handleEvent("host-event", 0, locals);
                    test_lib_1.expect(d.event).toEqual("EVENT");
                });
                test_lib_1.it('should support field assignments', function () {
                    var val = _createChangeDetector('(event)="b=a=$event"', d, null);
                    val.changeDetector.handleEvent("event", 0, locals);
                    test_lib_1.expect(d.a).toEqual("EVENT");
                    test_lib_1.expect(d.b).toEqual("EVENT");
                });
                test_lib_1.it('should support keyed assignments', function () {
                    d.a = ["OLD"];
                    var val = _createChangeDetector('(event)="a[0]=$event"', d, null);
                    val.changeDetector.handleEvent("event", 0, locals);
                    test_lib_1.expect(d.a).toEqual(["EVENT"]);
                });
                test_lib_1.it('should support chains', function () {
                    d.a = 0;
                    var val = _createChangeDetector('(event)="a=a+1; a=a+1;"', d, null);
                    val.changeDetector.handleEvent("event", 0, locals);
                    test_lib_1.expect(d.a).toEqual(2);
                });
                // TODO: enable after chaning dart infrastructure for generating tests
                // it('should throw when trying to assign to a local', () => {
                //   expect(() => {
                //     _createChangeDetector('(event)="$event=1"', d, null)
                //   }).toThrowError(new RegExp("Cannot reassign a variable binding"));
                // });
                test_lib_1.it('should return the prevent default value', function () {
                    var val = _createChangeDetector('(event)="false"', d, null);
                    var res = val.changeDetector.handleEvent("event", 0, locals);
                    test_lib_1.expect(res).toBe(true);
                    val = _createChangeDetector('(event)="true"', d, null);
                    res = val.changeDetector.handleEvent("event", 0, locals);
                    test_lib_1.expect(res).toBe(false);
                });
            });
        });
    });
}
exports.main = main;
var CountingPipe = (function () {
    function CountingPipe() {
        this.state = 0;
    }
    CountingPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return value + " state:" + this.state++;
    };
    return CountingPipe;
})();
var PipeWithOnDestroy = (function () {
    function PipeWithOnDestroy() {
        this.destroyCalled = false;
    }
    PipeWithOnDestroy.prototype.onDestroy = function () { this.destroyCalled = true; };
    PipeWithOnDestroy.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return null;
    };
    return PipeWithOnDestroy;
})();
var IdentityPipe = (function () {
    function IdentityPipe() {
    }
    IdentityPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return value;
    };
    return IdentityPipe;
})();
var WrappedPipe = (function () {
    function WrappedPipe() {
    }
    WrappedPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return change_detection_1.WrappedValue.wrap(value);
    };
    return WrappedPipe;
})();
var MultiArgPipe = (function () {
    function MultiArgPipe() {
    }
    MultiArgPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        var arg1 = args[0];
        var arg2 = args[1];
        var arg3 = args.length > 2 ? args[2] : 'default';
        return value + " " + arg1 + " " + arg2 + " " + arg3;
    };
    return MultiArgPipe;
})();
var FakePipes = (function () {
    function FakePipes(pipeType, factory, _a) {
        var pure = (_a === void 0 ? {} : _a).pure;
        this.pipeType = pipeType;
        this.factory = factory;
        this.numberOfLookups = 0;
        this.pure = lang_1.normalizeBool(pure);
    }
    FakePipes.prototype.get = function (type) {
        if (type != this.pipeType)
            return null;
        this.numberOfLookups++;
        return new pipes_1.SelectedPipe(this.factory(), this.pure);
    };
    return FakePipes;
})();
var TestDirective = (function () {
    function TestDirective(afterContentCheckedSpy, afterViewCheckedSpy) {
        if (afterContentCheckedSpy === void 0) { afterContentCheckedSpy = null; }
        if (afterViewCheckedSpy === void 0) { afterViewCheckedSpy = null; }
        this.afterContentCheckedSpy = afterContentCheckedSpy;
        this.afterViewCheckedSpy = afterViewCheckedSpy;
        this.doCheckCalled = false;
        this.onInitCalled = false;
        this.afterContentInitCalled = false;
        this.afterContentCheckedCalled = false;
        this.afterViewInitCalled = false;
        this.afterViewCheckedCalled = false;
    }
    TestDirective.prototype.onEvent = function (event) { this.event = event; };
    TestDirective.prototype.doCheck = function () { this.doCheckCalled = true; };
    TestDirective.prototype.onInit = function () { this.onInitCalled = true; };
    TestDirective.prototype.onChanges = function (changes) {
        var r = {};
        collection_1.StringMapWrapper.forEach(changes, function (c, key) { return r[key] = c.currentValue; });
        this.changes = r;
    };
    TestDirective.prototype.afterContentInit = function () { this.afterContentInitCalled = true; };
    TestDirective.prototype.afterContentChecked = function () {
        this.afterContentCheckedCalled = true;
        if (lang_1.isPresent(this.afterContentCheckedSpy)) {
            this.afterContentCheckedSpy();
        }
    };
    TestDirective.prototype.afterViewInit = function () { this.afterViewInitCalled = true; };
    TestDirective.prototype.afterViewChecked = function () {
        this.afterViewCheckedCalled = true;
        if (lang_1.isPresent(this.afterViewCheckedSpy)) {
            this.afterViewCheckedSpy();
        }
    };
    return TestDirective;
})();
var Person = (function () {
    function Person(name, address) {
        if (address === void 0) { address = null; }
        this.name = name;
        this.address = address;
    }
    Person.prototype.sayHi = function (m) { return "Hi, " + m; };
    Person.prototype.passThrough = function (val) { return val; };
    Person.prototype.toString = function () {
        var address = this.address == null ? '' : ' address=' + this.address.toString();
        return 'name=' + this.name + address;
    };
    return Person;
})();
var Address = (function () {
    function Address(city) {
        this.city = city;
    }
    Address.prototype.toString = function () { return lang_1.isBlank(this.city) ? '-' : this.city; };
    return Address;
})();
var Uninitialized = (function () {
    function Uninitialized() {
    }
    return Uninitialized;
})();
var TestData = (function () {
    function TestData(a) {
        this.a = a;
    }
    return TestData;
})();
var FakeDirectives = (function () {
    function FakeDirectives(directives, detectors) {
        this.directives = directives;
        this.detectors = detectors;
    }
    FakeDirectives.prototype.getDirectiveFor = function (di) { return this.directives[di.directiveIndex]; };
    FakeDirectives.prototype.getDetectorFor = function (di) { return this.detectors[di.directiveIndex]; };
    return FakeDirectives;
})();
var TestDispatcher = (function () {
    function TestDispatcher() {
        this.afterContentCheckedCalled = false;
        this.afterViewCheckedCalled = false;
        this.clear();
    }
    TestDispatcher.prototype.clear = function () {
        this.log = [];
        this.debugLog = [];
        this.loggedValues = [];
        this.afterContentCheckedCalled = true;
    };
    TestDispatcher.prototype.notifyOnBinding = function (target, value) {
        this.log.push(target.name + "=" + this._asString(value));
        this.loggedValues.push(value);
    };
    TestDispatcher.prototype.logBindingUpdate = function (target, value) { this.debugLog.push(target.name + "=" + this._asString(value)); };
    TestDispatcher.prototype.notifyAfterContentChecked = function () { this.afterContentCheckedCalled = true; };
    TestDispatcher.prototype.notifyAfterViewChecked = function () { this.afterViewCheckedCalled = true; };
    TestDispatcher.prototype.getDebugContext = function (a, b) { return null; };
    TestDispatcher.prototype._asString = function (value) { return (lang_1.isBlank(value) ? 'null' : value.toString()); };
    return TestDispatcher;
})();
var _ChangeDetectorAndDispatcher = (function () {
    function _ChangeDetectorAndDispatcher(changeDetector, dispatcher) {
        this.changeDetector = changeDetector;
        this.dispatcher = dispatcher;
    }
    return _ChangeDetectorAndDispatcher;
})();
//# sourceMappingURL=change_detector_spec.js.map