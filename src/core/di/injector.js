var collection_1 = require('angular2/src/core/facade/collection');
var binding_1 = require('./binding');
var exceptions_1 = require('./exceptions');
var lang_1 = require('angular2/src/core/facade/lang');
var key_1 = require('./key');
var metadata_1 = require('./metadata');
// Threshold for the dynamic version
var _MAX_CONSTRUCTION_COUNTER = 10;
exports.UNDEFINED = lang_1.CONST_EXPR(new Object());
/**
 * Visibility of a {@link Binding}.
 */
(function (Visibility) {
    /**
     * A `Public` {@link Binding} is only visible to regular (as opposed to host) child injectors.
     */
    Visibility[Visibility["Public"] = 0] = "Public";
    /**
     * A `Private` {@link Binding} is only visible to host (as opposed to regular) child injectors.
     */
    Visibility[Visibility["Private"] = 1] = "Private";
    /**
     * A `PublicAndPrivate` {@link Binding} is visible to both host and regular child injectors.
     */
    Visibility[Visibility["PublicAndPrivate"] = 2] = "PublicAndPrivate";
})(exports.Visibility || (exports.Visibility = {}));
var Visibility = exports.Visibility;
function canSee(src, dst) {
    return (src === dst) ||
        (dst === Visibility.PublicAndPrivate || src === Visibility.PublicAndPrivate);
}
var ProtoInjectorInlineStrategy = (function () {
    function ProtoInjectorInlineStrategy(protoEI, bwv) {
        this.binding0 = null;
        this.binding1 = null;
        this.binding2 = null;
        this.binding3 = null;
        this.binding4 = null;
        this.binding5 = null;
        this.binding6 = null;
        this.binding7 = null;
        this.binding8 = null;
        this.binding9 = null;
        this.keyId0 = null;
        this.keyId1 = null;
        this.keyId2 = null;
        this.keyId3 = null;
        this.keyId4 = null;
        this.keyId5 = null;
        this.keyId6 = null;
        this.keyId7 = null;
        this.keyId8 = null;
        this.keyId9 = null;
        this.visibility0 = null;
        this.visibility1 = null;
        this.visibility2 = null;
        this.visibility3 = null;
        this.visibility4 = null;
        this.visibility5 = null;
        this.visibility6 = null;
        this.visibility7 = null;
        this.visibility8 = null;
        this.visibility9 = null;
        var length = bwv.length;
        if (length > 0) {
            this.binding0 = bwv[0].binding;
            this.keyId0 = bwv[0].getKeyId();
            this.visibility0 = bwv[0].visibility;
        }
        if (length > 1) {
            this.binding1 = bwv[1].binding;
            this.keyId1 = bwv[1].getKeyId();
            this.visibility1 = bwv[1].visibility;
        }
        if (length > 2) {
            this.binding2 = bwv[2].binding;
            this.keyId2 = bwv[2].getKeyId();
            this.visibility2 = bwv[2].visibility;
        }
        if (length > 3) {
            this.binding3 = bwv[3].binding;
            this.keyId3 = bwv[3].getKeyId();
            this.visibility3 = bwv[3].visibility;
        }
        if (length > 4) {
            this.binding4 = bwv[4].binding;
            this.keyId4 = bwv[4].getKeyId();
            this.visibility4 = bwv[4].visibility;
        }
        if (length > 5) {
            this.binding5 = bwv[5].binding;
            this.keyId5 = bwv[5].getKeyId();
            this.visibility5 = bwv[5].visibility;
        }
        if (length > 6) {
            this.binding6 = bwv[6].binding;
            this.keyId6 = bwv[6].getKeyId();
            this.visibility6 = bwv[6].visibility;
        }
        if (length > 7) {
            this.binding7 = bwv[7].binding;
            this.keyId7 = bwv[7].getKeyId();
            this.visibility7 = bwv[7].visibility;
        }
        if (length > 8) {
            this.binding8 = bwv[8].binding;
            this.keyId8 = bwv[8].getKeyId();
            this.visibility8 = bwv[8].visibility;
        }
        if (length > 9) {
            this.binding9 = bwv[9].binding;
            this.keyId9 = bwv[9].getKeyId();
            this.visibility9 = bwv[9].visibility;
        }
    }
    ProtoInjectorInlineStrategy.prototype.getBindingAtIndex = function (index) {
        if (index == 0)
            return this.binding0;
        if (index == 1)
            return this.binding1;
        if (index == 2)
            return this.binding2;
        if (index == 3)
            return this.binding3;
        if (index == 4)
            return this.binding4;
        if (index == 5)
            return this.binding5;
        if (index == 6)
            return this.binding6;
        if (index == 7)
            return this.binding7;
        if (index == 8)
            return this.binding8;
        if (index == 9)
            return this.binding9;
        throw new exceptions_1.OutOfBoundsError(index);
    };
    ProtoInjectorInlineStrategy.prototype.createInjectorStrategy = function (injector) {
        return new InjectorInlineStrategy(injector, this);
    };
    return ProtoInjectorInlineStrategy;
})();
exports.ProtoInjectorInlineStrategy = ProtoInjectorInlineStrategy;
var ProtoInjectorDynamicStrategy = (function () {
    function ProtoInjectorDynamicStrategy(protoInj, bwv) {
        var len = bwv.length;
        this.bindings = collection_1.ListWrapper.createFixedSize(len);
        this.keyIds = collection_1.ListWrapper.createFixedSize(len);
        this.visibilities = collection_1.ListWrapper.createFixedSize(len);
        for (var i = 0; i < len; i++) {
            this.bindings[i] = bwv[i].binding;
            this.keyIds[i] = bwv[i].getKeyId();
            this.visibilities[i] = bwv[i].visibility;
        }
    }
    ProtoInjectorDynamicStrategy.prototype.getBindingAtIndex = function (index) {
        if (index < 0 || index >= this.bindings.length) {
            throw new exceptions_1.OutOfBoundsError(index);
        }
        return this.bindings[index];
    };
    ProtoInjectorDynamicStrategy.prototype.createInjectorStrategy = function (ei) {
        return new InjectorDynamicStrategy(this, ei);
    };
    return ProtoInjectorDynamicStrategy;
})();
exports.ProtoInjectorDynamicStrategy = ProtoInjectorDynamicStrategy;
var ProtoInjector = (function () {
    function ProtoInjector(bwv) {
        this.numberOfBindings = bwv.length;
        this._strategy = bwv.length > _MAX_CONSTRUCTION_COUNTER ?
            new ProtoInjectorDynamicStrategy(this, bwv) :
            new ProtoInjectorInlineStrategy(this, bwv);
    }
    ProtoInjector.prototype.getBindingAtIndex = function (index) { return this._strategy.getBindingAtIndex(index); };
    return ProtoInjector;
})();
exports.ProtoInjector = ProtoInjector;
var InjectorInlineStrategy = (function () {
    function InjectorInlineStrategy(injector, protoStrategy) {
        this.injector = injector;
        this.protoStrategy = protoStrategy;
        this.obj0 = exports.UNDEFINED;
        this.obj1 = exports.UNDEFINED;
        this.obj2 = exports.UNDEFINED;
        this.obj3 = exports.UNDEFINED;
        this.obj4 = exports.UNDEFINED;
        this.obj5 = exports.UNDEFINED;
        this.obj6 = exports.UNDEFINED;
        this.obj7 = exports.UNDEFINED;
        this.obj8 = exports.UNDEFINED;
        this.obj9 = exports.UNDEFINED;
    }
    InjectorInlineStrategy.prototype.resetConstructionCounter = function () { this.injector._constructionCounter = 0; };
    InjectorInlineStrategy.prototype.instantiateBinding = function (binding, visibility) {
        return this.injector._new(binding, visibility);
    };
    InjectorInlineStrategy.prototype.attach = function (parent, isHost) {
        var inj = this.injector;
        inj._parent = parent;
        inj._isHost = isHost;
    };
    InjectorInlineStrategy.prototype.getObjByKeyId = function (keyId, visibility) {
        var p = this.protoStrategy;
        var inj = this.injector;
        if (p.keyId0 === keyId && canSee(p.visibility0, visibility)) {
            if (this.obj0 === exports.UNDEFINED) {
                this.obj0 = inj._new(p.binding0, p.visibility0);
            }
            return this.obj0;
        }
        if (p.keyId1 === keyId && canSee(p.visibility1, visibility)) {
            if (this.obj1 === exports.UNDEFINED) {
                this.obj1 = inj._new(p.binding1, p.visibility1);
            }
            return this.obj1;
        }
        if (p.keyId2 === keyId && canSee(p.visibility2, visibility)) {
            if (this.obj2 === exports.UNDEFINED) {
                this.obj2 = inj._new(p.binding2, p.visibility2);
            }
            return this.obj2;
        }
        if (p.keyId3 === keyId && canSee(p.visibility3, visibility)) {
            if (this.obj3 === exports.UNDEFINED) {
                this.obj3 = inj._new(p.binding3, p.visibility3);
            }
            return this.obj3;
        }
        if (p.keyId4 === keyId && canSee(p.visibility4, visibility)) {
            if (this.obj4 === exports.UNDEFINED) {
                this.obj4 = inj._new(p.binding4, p.visibility4);
            }
            return this.obj4;
        }
        if (p.keyId5 === keyId && canSee(p.visibility5, visibility)) {
            if (this.obj5 === exports.UNDEFINED) {
                this.obj5 = inj._new(p.binding5, p.visibility5);
            }
            return this.obj5;
        }
        if (p.keyId6 === keyId && canSee(p.visibility6, visibility)) {
            if (this.obj6 === exports.UNDEFINED) {
                this.obj6 = inj._new(p.binding6, p.visibility6);
            }
            return this.obj6;
        }
        if (p.keyId7 === keyId && canSee(p.visibility7, visibility)) {
            if (this.obj7 === exports.UNDEFINED) {
                this.obj7 = inj._new(p.binding7, p.visibility7);
            }
            return this.obj7;
        }
        if (p.keyId8 === keyId && canSee(p.visibility8, visibility)) {
            if (this.obj8 === exports.UNDEFINED) {
                this.obj8 = inj._new(p.binding8, p.visibility8);
            }
            return this.obj8;
        }
        if (p.keyId9 === keyId && canSee(p.visibility9, visibility)) {
            if (this.obj9 === exports.UNDEFINED) {
                this.obj9 = inj._new(p.binding9, p.visibility9);
            }
            return this.obj9;
        }
        return exports.UNDEFINED;
    };
    InjectorInlineStrategy.prototype.getObjAtIndex = function (index) {
        if (index == 0)
            return this.obj0;
        if (index == 1)
            return this.obj1;
        if (index == 2)
            return this.obj2;
        if (index == 3)
            return this.obj3;
        if (index == 4)
            return this.obj4;
        if (index == 5)
            return this.obj5;
        if (index == 6)
            return this.obj6;
        if (index == 7)
            return this.obj7;
        if (index == 8)
            return this.obj8;
        if (index == 9)
            return this.obj9;
        throw new exceptions_1.OutOfBoundsError(index);
    };
    InjectorInlineStrategy.prototype.getMaxNumberOfObjects = function () { return _MAX_CONSTRUCTION_COUNTER; };
    return InjectorInlineStrategy;
})();
exports.InjectorInlineStrategy = InjectorInlineStrategy;
var InjectorDynamicStrategy = (function () {
    function InjectorDynamicStrategy(protoStrategy, injector) {
        this.protoStrategy = protoStrategy;
        this.injector = injector;
        this.objs = collection_1.ListWrapper.createFixedSize(protoStrategy.bindings.length);
        collection_1.ListWrapper.fill(this.objs, exports.UNDEFINED);
    }
    InjectorDynamicStrategy.prototype.resetConstructionCounter = function () { this.injector._constructionCounter = 0; };
    InjectorDynamicStrategy.prototype.instantiateBinding = function (binding, visibility) {
        return this.injector._new(binding, visibility);
    };
    InjectorDynamicStrategy.prototype.attach = function (parent, isHost) {
        var inj = this.injector;
        inj._parent = parent;
        inj._isHost = isHost;
    };
    InjectorDynamicStrategy.prototype.getObjByKeyId = function (keyId, visibility) {
        var p = this.protoStrategy;
        for (var i = 0; i < p.keyIds.length; i++) {
            if (p.keyIds[i] === keyId && canSee(p.visibilities[i], visibility)) {
                if (this.objs[i] === exports.UNDEFINED) {
                    this.objs[i] = this.injector._new(p.bindings[i], p.visibilities[i]);
                }
                return this.objs[i];
            }
        }
        return exports.UNDEFINED;
    };
    InjectorDynamicStrategy.prototype.getObjAtIndex = function (index) {
        if (index < 0 || index >= this.objs.length) {
            throw new exceptions_1.OutOfBoundsError(index);
        }
        return this.objs[index];
    };
    InjectorDynamicStrategy.prototype.getMaxNumberOfObjects = function () { return this.objs.length; };
    return InjectorDynamicStrategy;
})();
exports.InjectorDynamicStrategy = InjectorDynamicStrategy;
var BindingWithVisibility = (function () {
    function BindingWithVisibility(binding, visibility) {
        this.binding = binding;
        this.visibility = visibility;
    }
    ;
    BindingWithVisibility.prototype.getKeyId = function () { return this.binding.key.id; };
    return BindingWithVisibility;
})();
exports.BindingWithVisibility = BindingWithVisibility;
/**
 * A dependency injection container used for instantiating objects and resolving dependencies.
 *
 * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
 * constructor dependencies.
 *
 * In typical use, application code asks for the dependencies in the constructor and they are
 * resolved by the `Injector`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/jzjec0?p=preview))
 *
 * The following example creates an `Injector` configured to create `Engine` and `Car`.
 *
 * ```typescript
 * @Injectable()
 * class Engine {
 * }
 *
 * @Injectable()
 * class Car {
 *   constructor(public engine:Engine) {}
 * }
 *
 * var injector = Injector.resolveAndCreate([Car, Engine]);
 * var car = injector.get(Car);
 * expect(car instanceof Car).toBe(true);
 * expect(car.engine instanceof Engine).toBe(true);
 * ```
 *
 * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
 * resolve all of the object's dependencies automatically.
 */
var Injector = (function () {
    /**
     * Private
     */
    function Injector(_proto /* ProtoInjector */, _parent, _depProvider, _debugContext) {
        if (_parent === void 0) { _parent = null; }
        if (_depProvider === void 0) { _depProvider = null; }
        if (_debugContext === void 0) { _debugContext = null; }
        this._proto = _proto;
        this._parent = _parent;
        this._depProvider = _depProvider;
        this._debugContext = _debugContext;
        this._isHost = false;
        this._constructionCounter = 0;
        this._strategy = _proto._strategy.createInjectorStrategy(this);
    }
    /**
     * Turns an array of binding definitions into an array of resolved bindings.
     *
     * A resolution is a process of flattening multiple nested arrays and converting individual
     * bindings into an array of {@link ResolvedBinding}s.
     *
     * ### Example ([live demo](http://plnkr.co/edit/AiXTHi?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var bindings = Injector.resolve([Car, [[Engine]]]);
     *
     * expect(bindings.length).toEqual(2);
     *
     * expect(bindings[0] instanceof ResolvedBinding).toBe(true);
     * expect(bindings[0].key.displayName).toBe("Car");
     * expect(bindings[0].dependencies.length).toEqual(1);
     * expect(bindings[0].factory).toBeDefined();
     *
     * expect(bindings[1].key.displayName).toBe("Engine");
     * });
     * ```
     *
     * See {@link fromResolvedBindings} for more info.
     */
    Injector.resolve = function (bindings) {
        return binding_1.resolveBindings(bindings);
    };
    /**
     * Resolves an array of bindings and creates an injector from those bindings.
     *
     * The passed-in bindings can be an array of `Type`, {@link Binding},
     * or a recursive array of more bindings.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ePOccA?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = Injector.resolveAndCreate([Car, Engine]);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     *
     * This function is slower than the corresponding `fromResolvedBindings`
     * because it needs to resolve the passed-in bindings first.
     * See {@link resolve} and {@link fromResolvedBindings}.
     */
    Injector.resolveAndCreate = function (bindings) {
        var resolvedBindings = Injector.resolve(bindings);
        return Injector.fromResolvedBindings(resolvedBindings);
    };
    /**
     * Creates an injector from previously resolved bindings.
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/KrSMci?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var bindings = Injector.resolve([Car, Engine]);
     * var injector = Injector.fromResolvedBindings(bindings);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     */
    Injector.fromResolvedBindings = function (bindings) {
        var bd = bindings.map(function (b) { return new BindingWithVisibility(b, Visibility.Public); });
        var proto = new ProtoInjector(bd);
        return new Injector(proto, null, null);
    };
    /**
     * @internal
     */
    Injector.prototype.debugContext = function () { return this._debugContext(); };
    /**
     * Retrieves an instance from the injector based on the provided token.
     * Throws {@link NoBindingError} if not found.
     *
     * ### Example ([live demo](http://plnkr.co/edit/HeXSHg?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   bind("validToken").toValue("Value")
     * ]);
     * expect(injector.get("validToken")).toEqual("Value");
     * expect(() => injector.get("invalidToken")).toThrowError();
     * ```
     *
     * `Injector` returns itself when given `Injector` as a token.
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([]);
     * expect(injector.get(Injector)).toBe(injector);
     * ```
     */
    Injector.prototype.get = function (token) {
        return this._getByKey(key_1.Key.get(token), null, null, false, Visibility.PublicAndPrivate);
    };
    /**
     * Retrieves an instance from the injector based on the provided token.
     * Returns null if not found.
     *
     * ### Example ([live demo](http://plnkr.co/edit/tpEbEy?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   bind("validToken").toValue("Value")
     * ]);
     * expect(injector.getOptional("validToken")).toEqual("Value");
     * expect(injector.getOptional("invalidToken")).toBe(null);
     * ```
     *
     * `Injector` returns itself when given `Injector` as a token.
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([]);
     * expect(injector.getOptional(Injector)).toBe(injector);
     * ```
     */
    Injector.prototype.getOptional = function (token) {
        return this._getByKey(key_1.Key.get(token), null, null, true, Visibility.PublicAndPrivate);
    };
    /**
     * @internal
     */
    Injector.prototype.getAt = function (index) { return this._strategy.getObjAtIndex(index); };
    Object.defineProperty(Injector.prototype, "parent", {
        /**
         * Parent of this injector.
         *
         * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
         * -->
         *
         * ### Example ([live demo](http://plnkr.co/edit/eosMGo?p=preview))
         *
         * ```typescript
         * var parent = Injector.resolveAndCreate([]);
         * var child = parent.resolveAndCreateChild([]);
         * expect(child.parent).toBe(parent);
         * ```
         */
        get: function () { return this._parent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Injector.prototype, "internalStrategy", {
        /**
         * @internal
         * Internal. Do not use.
         * We return `any` not to export the InjectorStrategy type.
         */
        get: function () { return this._strategy; },
        enumerable: true,
        configurable: true
    });
    /**
     * Resolves an array of bindings and creates a child injector from those bindings.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * The passed-in bindings can be an array of `Type`, {@link Binding},
     * or a recursive array of more bindings.
     *
     * ### Example ([live demo](http://plnkr.co/edit/opB3T4?p=preview))
     *
     * ```typescript
     * class ParentBinding {}
     * class ChildBinding {}
     *
     * var parent = Injector.resolveAndCreate([ParentBinding]);
     * var child = parent.resolveAndCreateChild([ChildBinding]);
     *
     * expect(child.get(ParentBinding) instanceof ParentBinding).toBe(true);
     * expect(child.get(ChildBinding) instanceof ChildBinding).toBe(true);
     * expect(child.get(ParentBinding)).toBe(parent.get(ParentBinding));
     * ```
     *
     * This function is slower than the corresponding `createChildFromResolved`
     * because it needs to resolve the passed-in bindings first.
     * See {@link resolve} and {@link createChildFromResolved}.
     */
    Injector.prototype.resolveAndCreateChild = function (bindings) {
        var resolvedBindings = Injector.resolve(bindings);
        return this.createChildFromResolved(resolvedBindings);
    };
    /**
     * Creates a child injector from previously resolved bindings.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/VhyfjN?p=preview))
     *
     * ```typescript
     * class ParentBinding {}
     * class ChildBinding {}
     *
     * var parentBindings = Injector.resolve([ParentBinding]);
     * var childBindings = Injector.resolve([ChildBinding]);
     *
     * var parent = Injector.fromResolvedBindings(parentBindings);
     * var child = parent.createChildFromResolved(childBindings);
     *
     * expect(child.get(ParentBinding) instanceof ParentBinding).toBe(true);
     * expect(child.get(ChildBinding) instanceof ChildBinding).toBe(true);
     * expect(child.get(ParentBinding)).toBe(parent.get(ParentBinding));
     * ```
     */
    Injector.prototype.createChildFromResolved = function (bindings) {
        var bd = bindings.map(function (b) { return new BindingWithVisibility(b, Visibility.Public); });
        var proto = new ProtoInjector(bd);
        var inj = new Injector(proto, null, null);
        inj._parent = this;
        return inj;
    };
    /**
     * Resolves a binding and instantiates an object in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/yvVXoB?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = Injector.resolveAndCreate([Engine]);
     *
     * var car = injector.resolveAndInstantiate(Car);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.resolveAndInstantiate(Car));
     * ```
     */
    Injector.prototype.resolveAndInstantiate = function (binding) {
        return this.instantiateResolved(Injector.resolve([binding])[0]);
    };
    /**
     * Instantiates an object using a resolved binding in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ptCImQ?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = Injector.resolveAndCreate([Engine]);
     * var carBinding = Injector.resolve([Car])[0];
     * var car = injector.instantiateResolved(carBinding);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.instantiateResolved(carBinding));
     * ```
     */
    Injector.prototype.instantiateResolved = function (binding) {
        return this._instantiateBinding(binding, Visibility.PublicAndPrivate);
    };
    Injector.prototype._new = function (binding, visibility) {
        if (this._constructionCounter++ > this._strategy.getMaxNumberOfObjects()) {
            throw new exceptions_1.CyclicDependencyError(this, binding.key);
        }
        return this._instantiateBinding(binding, visibility);
    };
    Injector.prototype._instantiateBinding = function (binding, visibility) {
        if (binding.multiBinding) {
            var res = collection_1.ListWrapper.createFixedSize(binding.resolvedFactories.length);
            for (var i = 0; i < binding.resolvedFactories.length; ++i) {
                res[i] = this._instantiate(binding, binding.resolvedFactories[i], visibility);
            }
            return res;
        }
        else {
            return this._instantiate(binding, binding.resolvedFactories[0], visibility);
        }
    };
    Injector.prototype._instantiate = function (binding, resolvedFactory, visibility) {
        var factory = resolvedFactory.factory;
        var deps = resolvedFactory.dependencies;
        var length = deps.length;
        var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19;
        try {
            d0 = length > 0 ? this._getByDependency(binding, deps[0], visibility) : null;
            d1 = length > 1 ? this._getByDependency(binding, deps[1], visibility) : null;
            d2 = length > 2 ? this._getByDependency(binding, deps[2], visibility) : null;
            d3 = length > 3 ? this._getByDependency(binding, deps[3], visibility) : null;
            d4 = length > 4 ? this._getByDependency(binding, deps[4], visibility) : null;
            d5 = length > 5 ? this._getByDependency(binding, deps[5], visibility) : null;
            d6 = length > 6 ? this._getByDependency(binding, deps[6], visibility) : null;
            d7 = length > 7 ? this._getByDependency(binding, deps[7], visibility) : null;
            d8 = length > 8 ? this._getByDependency(binding, deps[8], visibility) : null;
            d9 = length > 9 ? this._getByDependency(binding, deps[9], visibility) : null;
            d10 = length > 10 ? this._getByDependency(binding, deps[10], visibility) : null;
            d11 = length > 11 ? this._getByDependency(binding, deps[11], visibility) : null;
            d12 = length > 12 ? this._getByDependency(binding, deps[12], visibility) : null;
            d13 = length > 13 ? this._getByDependency(binding, deps[13], visibility) : null;
            d14 = length > 14 ? this._getByDependency(binding, deps[14], visibility) : null;
            d15 = length > 15 ? this._getByDependency(binding, deps[15], visibility) : null;
            d16 = length > 16 ? this._getByDependency(binding, deps[16], visibility) : null;
            d17 = length > 17 ? this._getByDependency(binding, deps[17], visibility) : null;
            d18 = length > 18 ? this._getByDependency(binding, deps[18], visibility) : null;
            d19 = length > 19 ? this._getByDependency(binding, deps[19], visibility) : null;
        }
        catch (e) {
            if (e instanceof exceptions_1.AbstractBindingError || e instanceof exceptions_1.InstantiationError) {
                e.addKey(this, binding.key);
            }
            throw e;
        }
        var obj;
        try {
            switch (length) {
                case 0:
                    obj = factory();
                    break;
                case 1:
                    obj = factory(d0);
                    break;
                case 2:
                    obj = factory(d0, d1);
                    break;
                case 3:
                    obj = factory(d0, d1, d2);
                    break;
                case 4:
                    obj = factory(d0, d1, d2, d3);
                    break;
                case 5:
                    obj = factory(d0, d1, d2, d3, d4);
                    break;
                case 6:
                    obj = factory(d0, d1, d2, d3, d4, d5);
                    break;
                case 7:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6);
                    break;
                case 8:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7);
                    break;
                case 9:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8);
                    break;
                case 10:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9);
                    break;
                case 11:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10);
                    break;
                case 12:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11);
                    break;
                case 13:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12);
                    break;
                case 14:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13);
                    break;
                case 15:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14);
                    break;
                case 16:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15);
                    break;
                case 17:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16);
                    break;
                case 18:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17);
                    break;
                case 19:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18);
                    break;
                case 20:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19);
                    break;
            }
        }
        catch (e) {
            throw new exceptions_1.InstantiationError(this, e, e.stack, binding.key);
        }
        return obj;
    };
    Injector.prototype._getByDependency = function (binding, dep, bindingVisibility) {
        var special = lang_1.isPresent(this._depProvider) ?
            this._depProvider.getDependency(this, binding, dep) :
            exports.UNDEFINED;
        if (special !== exports.UNDEFINED) {
            return special;
        }
        else {
            return this._getByKey(dep.key, dep.lowerBoundVisibility, dep.upperBoundVisibility, dep.optional, bindingVisibility);
        }
    };
    Injector.prototype._getByKey = function (key, lowerBoundVisibility, upperBoundVisibility, optional, bindingVisibility) {
        if (key === INJECTOR_KEY) {
            return this;
        }
        if (upperBoundVisibility instanceof metadata_1.SelfMetadata) {
            return this._getByKeySelf(key, optional, bindingVisibility);
        }
        else if (upperBoundVisibility instanceof metadata_1.HostMetadata) {
            return this._getByKeyHost(key, optional, bindingVisibility, lowerBoundVisibility);
        }
        else {
            return this._getByKeyDefault(key, optional, bindingVisibility, lowerBoundVisibility);
        }
    };
    Injector.prototype._throwOrNull = function (key, optional) {
        if (optional) {
            return null;
        }
        else {
            throw new exceptions_1.NoBindingError(this, key);
        }
    };
    Injector.prototype._getByKeySelf = function (key, optional, bindingVisibility) {
        var obj = this._strategy.getObjByKeyId(key.id, bindingVisibility);
        return (obj !== exports.UNDEFINED) ? obj : this._throwOrNull(key, optional);
    };
    Injector.prototype._getByKeyHost = function (key, optional, bindingVisibility, lowerBoundVisibility) {
        var inj = this;
        if (lowerBoundVisibility instanceof metadata_1.SkipSelfMetadata) {
            if (inj._isHost) {
                return this._getPrivateDependency(key, optional, inj);
            }
            else {
                inj = inj._parent;
            }
        }
        while (inj != null) {
            var obj = inj._strategy.getObjByKeyId(key.id, bindingVisibility);
            if (obj !== exports.UNDEFINED)
                return obj;
            if (lang_1.isPresent(inj._parent) && inj._isHost) {
                return this._getPrivateDependency(key, optional, inj);
            }
            else {
                inj = inj._parent;
            }
        }
        return this._throwOrNull(key, optional);
    };
    Injector.prototype._getPrivateDependency = function (key, optional, inj) {
        var obj = inj._parent._strategy.getObjByKeyId(key.id, Visibility.Private);
        return (obj !== exports.UNDEFINED) ? obj : this._throwOrNull(key, optional);
    };
    Injector.prototype._getByKeyDefault = function (key, optional, bindingVisibility, lowerBoundVisibility) {
        var inj = this;
        if (lowerBoundVisibility instanceof metadata_1.SkipSelfMetadata) {
            bindingVisibility = inj._isHost ? Visibility.PublicAndPrivate : Visibility.Public;
            inj = inj._parent;
        }
        while (inj != null) {
            var obj = inj._strategy.getObjByKeyId(key.id, bindingVisibility);
            if (obj !== exports.UNDEFINED)
                return obj;
            bindingVisibility = inj._isHost ? Visibility.PublicAndPrivate : Visibility.Public;
            inj = inj._parent;
        }
        return this._throwOrNull(key, optional);
    };
    Object.defineProperty(Injector.prototype, "displayName", {
        get: function () {
            return "Injector(bindings: [" + _mapBindings(this, function (b) { return (" \"" + b.key.displayName + "\" "); }).join(", ") + "])";
        },
        enumerable: true,
        configurable: true
    });
    Injector.prototype.toString = function () { return this.displayName; };
    return Injector;
})();
exports.Injector = Injector;
var INJECTOR_KEY = key_1.Key.get(Injector);
function _mapBindings(injector, fn) {
    var res = [];
    for (var i = 0; i < injector._proto.numberOfBindings; ++i) {
        res.push(fn(injector._proto.getBindingAtIndex(i)));
    }
    return res;
}
//# sourceMappingURL=injector.js.map