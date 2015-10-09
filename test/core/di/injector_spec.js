var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var lang_1 = require('angular2/src/core/facade/lang');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var test_lib_1 = require('angular2/test_lib');
var spies_1 = require('../spies');
var core_1 = require('angular2/core');
var metadata_1 = require('angular2/src/core/di/metadata');
var binding_1 = require('angular2/src/core/di/binding');
var injector_1 = require('angular2/src/core/di/injector');
var CustomDependencyMetadata = (function (_super) {
    __extends(CustomDependencyMetadata, _super);
    function CustomDependencyMetadata() {
        _super.apply(this, arguments);
    }
    return CustomDependencyMetadata;
})(metadata_1.DependencyMetadata);
var Engine = (function () {
    function Engine() {
    }
    return Engine;
})();
var BrokenEngine = (function () {
    function BrokenEngine() {
        throw new exceptions_1.BaseException("Broken Engine");
    }
    return BrokenEngine;
})();
var DashboardSoftware = (function () {
    function DashboardSoftware() {
    }
    return DashboardSoftware;
})();
var Dashboard = (function () {
    function Dashboard(software) {
    }
    Dashboard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [DashboardSoftware])
    ], Dashboard);
    return Dashboard;
})();
var TurboEngine = (function (_super) {
    __extends(TurboEngine, _super);
    function TurboEngine() {
        _super.apply(this, arguments);
    }
    return TurboEngine;
})(Engine);
var Car = (function () {
    function Car(engine) {
        this.engine = engine;
    }
    Car = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [Engine])
    ], Car);
    return Car;
})();
var CarWithOptionalEngine = (function () {
    function CarWithOptionalEngine(engine) {
        this.engine = engine;
    }
    CarWithOptionalEngine = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [Engine])
    ], CarWithOptionalEngine);
    return CarWithOptionalEngine;
})();
var CarWithDashboard = (function () {
    function CarWithDashboard(engine, dashboard) {
        this.engine = engine;
        this.dashboard = dashboard;
    }
    CarWithDashboard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [Engine, Dashboard])
    ], CarWithDashboard);
    return CarWithDashboard;
})();
var SportsCar = (function (_super) {
    __extends(SportsCar, _super);
    function SportsCar(engine) {
        _super.call(this, engine);
    }
    SportsCar = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [Engine])
    ], SportsCar);
    return SportsCar;
})(Car);
var CarWithInject = (function () {
    function CarWithInject(engine) {
        this.engine = engine;
    }
    CarWithInject = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(TurboEngine)), 
        __metadata('design:paramtypes', [Engine])
    ], CarWithInject);
    return CarWithInject;
})();
var CyclicEngine = (function () {
    function CyclicEngine(car) {
    }
    CyclicEngine = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [Car])
    ], CyclicEngine);
    return CyclicEngine;
})();
var NoAnnotations = (function () {
    function NoAnnotations(secretDependency) {
    }
    return NoAnnotations;
})();
function main() {
    var dynamicBindings = [
        core_1.bind('binding0')
            .toValue(1),
        core_1.bind('binding1').toValue(1),
        core_1.bind('binding2').toValue(1),
        core_1.bind('binding3').toValue(1),
        core_1.bind('binding4').toValue(1),
        core_1.bind('binding5').toValue(1),
        core_1.bind('binding6').toValue(1),
        core_1.bind('binding7').toValue(1),
        core_1.bind('binding8').toValue(1),
        core_1.bind('binding9').toValue(1),
        core_1.bind('binding10').toValue(1)
    ];
    [{ strategy: 'inline', bindings: [], strategyClass: injector_1.InjectorInlineStrategy },
        {
            strategy: 'dynamic',
            bindings: dynamicBindings,
            strategyClass: injector_1.InjectorDynamicStrategy
        }].forEach(function (context) {
        function createInjector(bindings) {
            return core_1.Injector.resolveAndCreate(bindings.concat(context['bindings']));
        }
        test_lib_1.describe("injector " + context['strategy'], function () {
            test_lib_1.it("should use the right strategy", function () {
                var injector = createInjector([]);
                test_lib_1.expect(injector.internalStrategy).toBeAnInstanceOf(context['strategyClass']);
            });
            test_lib_1.it('should instantiate a class without dependencies', function () {
                var injector = createInjector([Engine]);
                var engine = injector.get(Engine);
                test_lib_1.expect(engine).toBeAnInstanceOf(Engine);
            });
            test_lib_1.it('should resolve dependencies based on type information', function () {
                var injector = createInjector([Engine, Car]);
                var car = injector.get(Car);
                test_lib_1.expect(car).toBeAnInstanceOf(Car);
                test_lib_1.expect(car.engine).toBeAnInstanceOf(Engine);
            });
            test_lib_1.it('should resolve dependencies based on @Inject annotation', function () {
                var injector = createInjector([TurboEngine, Engine, CarWithInject]);
                var car = injector.get(CarWithInject);
                test_lib_1.expect(car).toBeAnInstanceOf(CarWithInject);
                test_lib_1.expect(car.engine).toBeAnInstanceOf(TurboEngine);
            });
            test_lib_1.it('should throw when no type and not @Inject', function () {
                test_lib_1.expect(function () { return createInjector([NoAnnotations]); })
                    .toThrowError('Cannot resolve all parameters for NoAnnotations(?). ' +
                    'Make sure they all have valid type or annotations.');
            });
            test_lib_1.it('should cache instances', function () {
                var injector = createInjector([Engine]);
                var e1 = injector.get(Engine);
                var e2 = injector.get(Engine);
                test_lib_1.expect(e1).toBe(e2);
            });
            test_lib_1.it('should bind to a value', function () {
                var injector = createInjector([core_1.bind(Engine).toValue("fake engine")]);
                var engine = injector.get(Engine);
                test_lib_1.expect(engine).toEqual("fake engine");
            });
            test_lib_1.it('should bind to a factory', function () {
                function sportsCarFactory(e) { return new SportsCar(e); }
                var injector = createInjector([Engine, core_1.bind(Car).toFactory(sportsCarFactory, [Engine])]);
                var car = injector.get(Car);
                test_lib_1.expect(car).toBeAnInstanceOf(SportsCar);
                test_lib_1.expect(car.engine).toBeAnInstanceOf(Engine);
            });
            test_lib_1.it('should supporting binding to null', function () {
                var injector = createInjector([core_1.bind(Engine).toValue(null)]);
                var engine = injector.get(Engine);
                test_lib_1.expect(engine).toBeNull();
            });
            test_lib_1.it('should bind to an alias', function () {
                var injector = createInjector([Engine, core_1.bind(SportsCar).toClass(SportsCar), core_1.bind(Car).toAlias(SportsCar)]);
                var car = injector.get(Car);
                var sportsCar = injector.get(SportsCar);
                test_lib_1.expect(car).toBeAnInstanceOf(SportsCar);
                test_lib_1.expect(car).toBe(sportsCar);
            });
            test_lib_1.it('should support multibindings', function () {
                var injector = createInjector([
                    Engine,
                    new core_1.Binding(Car, { toClass: SportsCar, multi: true }),
                    new core_1.Binding(Car, { toClass: CarWithOptionalEngine, multi: true })
                ]);
                var cars = injector.get(Car);
                test_lib_1.expect(cars.length).toEqual(2);
                test_lib_1.expect(cars[0]).toBeAnInstanceOf(SportsCar);
                test_lib_1.expect(cars[1]).toBeAnInstanceOf(CarWithOptionalEngine);
            });
            test_lib_1.it('should support multibindings that are created using toAlias', function () {
                var injector = createInjector([Engine, SportsCar, new core_1.Binding(Car, { toAlias: SportsCar, multi: true })]);
                var cars = injector.get(Car);
                test_lib_1.expect(cars.length).toEqual(1);
                test_lib_1.expect(cars[0]).toBe(injector.get(SportsCar));
            });
            test_lib_1.it('should throw when the aliased binding does not exist', function () {
                var injector = createInjector([core_1.bind('car').toAlias(SportsCar)]);
                var e = "No provider for " + lang_1.stringify(SportsCar) + "! (car -> " + lang_1.stringify(SportsCar) + ")";
                test_lib_1.expect(function () { return injector.get('car'); }).toThrowError(e);
            });
            test_lib_1.it('should throw with a meaningful message when the aliased binding is blank', function () {
                test_lib_1.expect(function () { return core_1.bind('car').toAlias(null); }).toThrowError('Can not alias car to a blank value!');
            });
            test_lib_1.it('should handle forwardRef in toAlias', function () {
                var injector = createInjector([
                    core_1.bind('originalEngine')
                        .toClass(core_1.forwardRef(function () { return Engine; })),
                    core_1.bind('aliasedEngine').toAlias(core_1.forwardRef(function () { return 'originalEngine'; }))
                ]);
                test_lib_1.expect(injector.get('aliasedEngine')).toBeAnInstanceOf(Engine);
            });
            test_lib_1.it('should support overriding factory dependencies', function () {
                var injector = createInjector([Engine, core_1.bind(Car).toFactory(function (e) { return new SportsCar(e); }, [Engine])]);
                var car = injector.get(Car);
                test_lib_1.expect(car).toBeAnInstanceOf(SportsCar);
                test_lib_1.expect(car.engine).toBeAnInstanceOf(Engine);
            });
            test_lib_1.it('should support optional dependencies', function () {
                var injector = createInjector([CarWithOptionalEngine]);
                var car = injector.get(CarWithOptionalEngine);
                test_lib_1.expect(car.engine).toEqual(null);
            });
            test_lib_1.it("should flatten passed-in bindings", function () {
                var injector = createInjector([[[Engine, Car]]]);
                var car = injector.get(Car);
                test_lib_1.expect(car).toBeAnInstanceOf(Car);
            });
            test_lib_1.it("should use the last binding when there are multiple bindings for same token", function () {
                var injector = createInjector([core_1.bind(Engine).toClass(Engine), core_1.bind(Engine).toClass(TurboEngine)]);
                test_lib_1.expect(injector.get(Engine)).toBeAnInstanceOf(TurboEngine);
            });
            test_lib_1.it('should use non-type tokens', function () {
                var injector = createInjector([core_1.bind('token').toValue('value')]);
                test_lib_1.expect(injector.get('token')).toEqual('value');
            });
            test_lib_1.it('should throw when given invalid bindings', function () {
                test_lib_1.expect(function () { return createInjector(["blah"]); })
                    .toThrowError('Invalid binding - only instances of Binding and Type are allowed, got: blah');
                test_lib_1.expect(function () { return createInjector([core_1.bind("blah")]); })
                    .toThrowError('Invalid binding - only instances of Binding and Type are allowed, ' +
                    'got: blah');
            });
            test_lib_1.it('should provide itself', function () {
                var parent = createInjector([]);
                var child = parent.resolveAndCreateChild([]);
                test_lib_1.expect(child.get(core_1.Injector)).toBe(child);
            });
            test_lib_1.it('should throw when no provider defined', function () {
                var injector = createInjector([]);
                test_lib_1.expect(function () { return injector.get('NonExisting'); }).toThrowError('No provider for NonExisting!');
            });
            test_lib_1.it('should show the full path when no provider', function () {
                var injector = createInjector([CarWithDashboard, Engine, Dashboard]);
                test_lib_1.expect(function () { return injector.get(CarWithDashboard); })
                    .toThrowError("No provider for DashboardSoftware! (" + lang_1.stringify(CarWithDashboard) + " -> " + lang_1.stringify(Dashboard) + " -> DashboardSoftware)");
            });
            test_lib_1.it('should throw when trying to instantiate a cyclic dependency', function () {
                var injector = createInjector([Car, core_1.bind(Engine).toClass(CyclicEngine)]);
                test_lib_1.expect(function () { return injector.get(Car); })
                    .toThrowError("Cannot instantiate cyclic dependency! (" + lang_1.stringify(Car) + " -> " + lang_1.stringify(Engine) + " -> " + lang_1.stringify(Car) + ")");
            });
            test_lib_1.it('should show the full path when error happens in a constructor', function () {
                var bindings = core_1.Injector.resolve([Car, core_1.bind(Engine).toClass(BrokenEngine)]);
                var proto = new injector_1.ProtoInjector([
                    new injector_1.BindingWithVisibility(bindings[0], injector_1.Visibility.Public),
                    new injector_1.BindingWithVisibility(bindings[1], injector_1.Visibility.Public)
                ]);
                var injector = new core_1.Injector(proto, null, null);
                try {
                    injector.get(Car);
                    throw "Must throw";
                }
                catch (e) {
                    test_lib_1.expect(e.message)
                        .toContain("Error during instantiation of Engine! (" + lang_1.stringify(Car) + " -> Engine)");
                    test_lib_1.expect(e.originalException instanceof exceptions_1.BaseException).toBeTruthy();
                    test_lib_1.expect(e.causeKey.token).toEqual(Engine);
                }
            });
            test_lib_1.it('should provide context when throwing an exception ', function () {
                var engineBinding = core_1.Injector.resolve([core_1.bind(Engine).toClass(BrokenEngine)])[0];
                var protoParent = new injector_1.ProtoInjector([new injector_1.BindingWithVisibility(engineBinding, injector_1.Visibility.Public)]);
                var carBinding = core_1.Injector.resolve([Car])[0];
                var protoChild = new injector_1.ProtoInjector([new injector_1.BindingWithVisibility(carBinding, injector_1.Visibility.Public)]);
                var parent = new core_1.Injector(protoParent, null, null, function () { return "parentContext"; });
                var child = new core_1.Injector(protoChild, parent, null, function () { return "childContext"; });
                try {
                    child.get(Car);
                    throw "Must throw";
                }
                catch (e) {
                    test_lib_1.expect(e.context).toEqual("childContext");
                }
            });
            test_lib_1.it('should instantiate an object after a failed attempt', function () {
                var isBroken = true;
                var injector = createInjector([Car, core_1.bind(Engine).toFactory(function () { return isBroken ? new BrokenEngine() : new Engine(); })]);
                test_lib_1.expect(function () { return injector.get(Car); }).toThrowError(new RegExp("Error"));
                isBroken = false;
                test_lib_1.expect(injector.get(Car)).toBeAnInstanceOf(Car);
            });
            test_lib_1.it('should support null values', function () {
                var injector = createInjector([core_1.bind('null').toValue(null)]);
                test_lib_1.expect(injector.get('null')).toBe(null);
            });
            test_lib_1.it('should use custom dependency provider', function () {
                var e = new Engine();
                var depProvider = new spies_1.SpyDependencyProvider();
                depProvider.spy("getDependency").andReturn(e);
                var bindings = core_1.Injector.resolve([Car]);
                var proto = new injector_1.ProtoInjector([new injector_1.BindingWithVisibility(bindings[0], injector_1.Visibility.Public)]);
                var injector = new core_1.Injector(proto, null, depProvider);
                test_lib_1.expect(injector.get(Car).engine).toEqual(e);
                test_lib_1.expect(depProvider.spy("getDependency"))
                    .toHaveBeenCalledWith(injector, bindings[0], bindings[0].resolvedFactories[0].dependencies[0]);
            });
        });
        test_lib_1.describe("child", function () {
            test_lib_1.it('should load instances from parent injector', function () {
                var parent = core_1.Injector.resolveAndCreate([Engine]);
                var child = parent.resolveAndCreateChild([]);
                var engineFromParent = parent.get(Engine);
                var engineFromChild = child.get(Engine);
                test_lib_1.expect(engineFromChild).toBe(engineFromParent);
            });
            test_lib_1.it("should not use the child bindings when resolving the dependencies of a parent binding", function () {
                var parent = core_1.Injector.resolveAndCreate([Car, Engine]);
                var child = parent.resolveAndCreateChild([core_1.bind(Engine).toClass(TurboEngine)]);
                var carFromChild = child.get(Car);
                test_lib_1.expect(carFromChild.engine).toBeAnInstanceOf(Engine);
            });
            test_lib_1.it('should create new instance in a child injector', function () {
                var parent = core_1.Injector.resolveAndCreate([Engine]);
                var child = parent.resolveAndCreateChild([core_1.bind(Engine).toClass(TurboEngine)]);
                var engineFromParent = parent.get(Engine);
                var engineFromChild = child.get(Engine);
                test_lib_1.expect(engineFromParent).not.toBe(engineFromChild);
                test_lib_1.expect(engineFromChild).toBeAnInstanceOf(TurboEngine);
            });
            test_lib_1.it("should give access to parent", function () {
                var parent = core_1.Injector.resolveAndCreate([]);
                var child = parent.resolveAndCreateChild([]);
                test_lib_1.expect(child.parent).toBe(parent);
            });
        });
        test_lib_1.describe('resolveAndInstantiate', function () {
            test_lib_1.it('should instantiate an object in the context of the injector', function () {
                var inj = core_1.Injector.resolveAndCreate([Engine]);
                var car = inj.resolveAndInstantiate(Car);
                test_lib_1.expect(car).toBeAnInstanceOf(Car);
                test_lib_1.expect(car.engine).toBe(inj.get(Engine));
            });
            test_lib_1.it('should not store the instantiated object in the injector', function () {
                var inj = core_1.Injector.resolveAndCreate([Engine]);
                inj.resolveAndInstantiate(Car);
                test_lib_1.expect(function () { return inj.get(Car); }).toThrowError();
            });
        });
        test_lib_1.describe('instantiate', function () {
            test_lib_1.it('should instantiate an object in the context of the injector', function () {
                var inj = core_1.Injector.resolveAndCreate([Engine]);
                var car = inj.instantiateResolved(core_1.Injector.resolve([Car])[0]);
                test_lib_1.expect(car).toBeAnInstanceOf(Car);
                test_lib_1.expect(car.engine).toBe(inj.get(Engine));
            });
        });
        test_lib_1.describe("depedency resolution", function () {
            test_lib_1.describe("@Self()", function () {
                test_lib_1.it("should return a dependency from self", function () {
                    var inj = core_1.Injector.resolveAndCreate([Engine, core_1.bind(Car).toFactory(function (e) { return new Car(e); }, [[Engine, new core_1.SelfMetadata()]])]);
                    test_lib_1.expect(inj.get(Car)).toBeAnInstanceOf(Car);
                });
                test_lib_1.it("should throw when not requested binding on self", function () {
                    var parent = core_1.Injector.resolveAndCreate([Engine]);
                    var child = parent.resolveAndCreateChild([core_1.bind(Car).toFactory(function (e) { return new Car(e); }, [[Engine, new core_1.SelfMetadata()]])]);
                    test_lib_1.expect(function () { return child.get(Car); })
                        .toThrowError("No provider for Engine! (" + lang_1.stringify(Car) + " -> " + lang_1.stringify(Engine) + ")");
                });
            });
            test_lib_1.describe("@Host()", function () {
                test_lib_1.it("should return a dependency from same host", function () {
                    var parent = core_1.Injector.resolveAndCreate([Engine]);
                    var child = parent.resolveAndCreateChild([core_1.bind(Car).toFactory(function (e) { return new Car(e); }, [[Engine, new core_1.HostMetadata()]])]);
                    test_lib_1.expect(child.get(Car)).toBeAnInstanceOf(Car);
                });
                test_lib_1.it("should return a private dependency declared at the host", function () {
                    var engine = core_1.Injector.resolve([Engine])[0];
                    var protoParent = new injector_1.ProtoInjector([new injector_1.BindingWithVisibility(engine, injector_1.Visibility.Private)]);
                    var parent = new core_1.Injector(protoParent);
                    var child = core_1.Injector.resolveAndCreate([core_1.bind(Car).toFactory(function (e) { return new Car(e); }, [[Engine, new core_1.HostMetadata()]])]);
                    child.internalStrategy.attach(parent, true); // host
                    test_lib_1.expect(child.get(Car)).toBeAnInstanceOf(Car);
                });
                test_lib_1.it("should not return a public dependency declared at the host", function () {
                    var engine = core_1.Injector.resolve([Engine])[0];
                    var protoParent = new injector_1.ProtoInjector([new injector_1.BindingWithVisibility(engine, injector_1.Visibility.Public)]);
                    var parent = new core_1.Injector(protoParent);
                    var child = core_1.Injector.resolveAndCreate([core_1.bind(Car).toFactory(function (e) { return new Car(e); }, [[Engine, new core_1.HostMetadata()]])]);
                    child.internalStrategy.attach(parent, true); // host
                    test_lib_1.expect(function () { return child.get(Car); })
                        .toThrowError("No provider for Engine! (" + lang_1.stringify(Car) + " -> " + lang_1.stringify(Engine) + ")");
                });
                test_lib_1.it("should not skip self", function () {
                    var parent = core_1.Injector.resolveAndCreate([Engine]);
                    var child = parent.resolveAndCreateChild([
                        core_1.bind(Engine)
                            .toClass(TurboEngine),
                        core_1.bind(Car).toFactory(function (e) { return new Car(e); }, [[Engine, new core_1.HostMetadata()]])
                    ]);
                    test_lib_1.expect(child.get(Car).engine).toBeAnInstanceOf(TurboEngine);
                });
            });
            test_lib_1.describe("default", function () {
                test_lib_1.it("should return a private dependency declared at the host", function () {
                    var engine = core_1.Injector.resolve([Engine])[0];
                    var protoParent = new injector_1.ProtoInjector([new injector_1.BindingWithVisibility(engine, injector_1.Visibility.Private)]);
                    var parent = new core_1.Injector(protoParent);
                    var child = core_1.Injector.resolveAndCreate([
                        core_1.bind(Engine)
                            .toClass(BrokenEngine),
                        core_1.bind(Car).toFactory(function (e) { return new Car(e); }, [[Engine, new core_1.SkipSelfMetadata()]])
                    ]);
                    child.internalStrategy.attach(parent, true); // boundary
                    test_lib_1.expect(child.get(Car)).toBeAnInstanceOf(Car);
                });
                test_lib_1.it("should return a public dependency declared at the host", function () {
                    var engine = core_1.Injector.resolve([Engine])[0];
                    var protoParent = new injector_1.ProtoInjector([new injector_1.BindingWithVisibility(engine, injector_1.Visibility.Public)]);
                    var parent = new core_1.Injector(protoParent);
                    var child = core_1.Injector.resolveAndCreate([
                        core_1.bind(Engine)
                            .toClass(BrokenEngine),
                        core_1.bind(Car).toFactory(function (e) { return new Car(e); }, [[Engine, new core_1.SkipSelfMetadata()]])
                    ]);
                    child.internalStrategy.attach(parent, true); // boundary
                    test_lib_1.expect(child.get(Car)).toBeAnInstanceOf(Car);
                });
                test_lib_1.it("should not return a private dependency declared NOT at the host", function () {
                    var engine = core_1.Injector.resolve([Engine])[0];
                    var protoParent = new injector_1.ProtoInjector([new injector_1.BindingWithVisibility(engine, injector_1.Visibility.Private)]);
                    var parent = new core_1.Injector(protoParent);
                    var child = core_1.Injector.resolveAndCreate([
                        core_1.bind(Engine)
                            .toClass(BrokenEngine),
                        core_1.bind(Car).toFactory(function (e) { return new Car(e); }, [[Engine, new core_1.SkipSelfMetadata()]])
                    ]);
                    child.internalStrategy.attach(parent, false);
                    test_lib_1.expect(function () { return child.get(Car); })
                        .toThrowError("No provider for Engine! (" + lang_1.stringify(Car) + " -> " + lang_1.stringify(Engine) + ")");
                });
                test_lib_1.it("should not skip self", function () {
                    var parent = core_1.Injector.resolveAndCreate([Engine]);
                    var child = parent.resolveAndCreateChild([
                        core_1.bind(Engine)
                            .toClass(TurboEngine),
                        core_1.bind(Car).toFactory(function (e) { return new Car(e); }, [Engine])
                    ]);
                    test_lib_1.expect(child.get(Car).engine).toBeAnInstanceOf(TurboEngine);
                });
            });
        });
        test_lib_1.describe('resolve', function () {
            test_lib_1.it('should resolve and flatten', function () {
                var bindings = core_1.Injector.resolve([Engine, [BrokenEngine]]);
                bindings.forEach(function (b) {
                    if (lang_1.isBlank(b))
                        return; // the result is a sparse array
                    test_lib_1.expect(b instanceof binding_1.ResolvedBinding_).toBe(true);
                });
            });
            test_lib_1.it("should support multi bindings", function () {
                var binding = core_1.Injector.resolve([
                    new core_1.Binding(Engine, { toClass: BrokenEngine, multi: true }),
                    new core_1.Binding(Engine, { toClass: TurboEngine, multi: true })
                ])[0];
                test_lib_1.expect(binding.key.token).toBe(Engine);
                test_lib_1.expect(binding.multiBinding).toEqual(true);
                test_lib_1.expect(binding.resolvedFactories.length).toEqual(2);
            });
            test_lib_1.it("should support multi bindings with only one binding", function () {
                var binding = core_1.Injector.resolve([new core_1.Binding(Engine, { toClass: BrokenEngine, multi: true })])[0];
                test_lib_1.expect(binding.key.token).toBe(Engine);
                test_lib_1.expect(binding.multiBinding).toEqual(true);
                test_lib_1.expect(binding.resolvedFactories.length).toEqual(1);
            });
            test_lib_1.it("should throw when mixing multi bindings with regular bindings", function () {
                test_lib_1.expect(function () {
                    core_1.Injector.resolve([new core_1.Binding(Engine, { toClass: BrokenEngine, multi: true }), Engine]);
                }).toThrowErrorWith("Cannot mix multi bindings and regular bindings");
                test_lib_1.expect(function () {
                    core_1.Injector.resolve([Engine, new core_1.Binding(Engine, { toClass: BrokenEngine, multi: true })]);
                }).toThrowErrorWith("Cannot mix multi bindings and regular bindings");
            });
            test_lib_1.it('should resolve forward references', function () {
                var bindings = core_1.Injector.resolve([
                    core_1.forwardRef(function () { return Engine; }),
                    [core_1.bind(core_1.forwardRef(function () { return BrokenEngine; })).toClass(core_1.forwardRef(function () { return Engine; }))],
                    core_1.bind(core_1.forwardRef(function () { return String; })).toFactory(function () { return 'OK'; }, [core_1.forwardRef(function () { return Engine; })])
                ]);
                var engineBinding = bindings[0];
                var brokenEngineBinding = bindings[1];
                var stringBinding = bindings[2];
                test_lib_1.expect(engineBinding.resolvedFactories[0].factory() instanceof Engine).toBe(true);
                test_lib_1.expect(brokenEngineBinding.resolvedFactories[0].factory() instanceof Engine).toBe(true);
                test_lib_1.expect(stringBinding.resolvedFactories[0].dependencies[0].key).toEqual(core_1.Key.get(Engine));
            });
            test_lib_1.it('should support overriding factory dependencies with dependency annotations', function () {
                var bindings = core_1.Injector.resolve([
                    core_1.bind("token")
                        .toFactory(function (e) { return "result"; }, [[new core_1.InjectMetadata("dep"), new CustomDependencyMetadata()]])
                ]);
                var binding = bindings[0];
                test_lib_1.expect(binding.resolvedFactories[0].dependencies[0].key.token).toEqual("dep");
                test_lib_1.expect(binding.resolvedFactories[0].dependencies[0].properties)
                    .toEqual([new CustomDependencyMetadata()]);
            });
        });
        test_lib_1.describe("displayName", function () {
            test_lib_1.it("should work", function () {
                test_lib_1.expect(core_1.Injector.resolveAndCreate([Engine, BrokenEngine]).displayName)
                    .toEqual('Injector(bindings: [ "Engine" ,  "BrokenEngine" ])');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=injector_spec.js.map