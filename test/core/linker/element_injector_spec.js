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
// TODO(tbosch): clang-format screws this up, see https://github.com/angular/clang-format/issues/11.
// Enable clang-format here again when this is fixed.
// clang-format off
var test_lib_1 = require('angular2/test_lib');
var spies_1 = require('../spies');
var lang_1 = require('angular2/src/core/facade/lang');
var collection_1 = require('angular2/src/core/facade/collection');
var element_injector_1 = require('angular2/src/core/linker/element_injector');
var metadata_1 = require('angular2/src/core/metadata');
var core_1 = require('angular2/core');
var view_container_ref_1 = require('angular2/src/core/linker/view_container_ref');
var template_ref_1 = require('angular2/src/core/linker/template_ref');
var element_ref_1 = require('angular2/src/core/linker/element_ref');
var change_detection_1 = require('angular2/src/core/change_detection/change_detection');
var query_list_1 = require('angular2/src/core/linker/query_list');
function createDummyView(detector) {
    if (detector === void 0) { detector = null; }
    var res = new spies_1.SpyView();
    res.prop("changeDetector", detector);
    res.prop("elementOffset", 0);
    res.prop("elementInjectors", []);
    res.prop("viewContainers", []);
    res.prop("ownBindersCount", 0);
    return res;
}
function addInj(view, inj) {
    var injs = view.elementInjectors;
    injs.push(inj);
    var containers = view.viewContainers;
    containers.push(null);
    view.prop("ownBindersCount", view.ownBindersCount + 1);
}
var SimpleDirective = (function () {
    function SimpleDirective() {
    }
    SimpleDirective = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SimpleDirective);
    return SimpleDirective;
})();
var SimpleService = (function () {
    function SimpleService() {
    }
    return SimpleService;
})();
var SomeOtherDirective = (function () {
    function SomeOtherDirective() {
    }
    SomeOtherDirective = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SomeOtherDirective);
    return SomeOtherDirective;
})();
var _constructionCount = 0;
var CountingDirective = (function () {
    function CountingDirective() {
        this.count = _constructionCount;
        _constructionCount += 1;
    }
    CountingDirective = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CountingDirective);
    return CountingDirective;
})();
var FancyCountingDirective = (function (_super) {
    __extends(FancyCountingDirective, _super);
    function FancyCountingDirective() {
        _super.call(this);
    }
    FancyCountingDirective = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FancyCountingDirective);
    return FancyCountingDirective;
})(CountingDirective);
var NeedsDirective = (function () {
    function NeedsDirective(dependency) {
        this.dependency = dependency;
    }
    NeedsDirective = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Self()), 
        __metadata('design:paramtypes', [SimpleDirective])
    ], NeedsDirective);
    return NeedsDirective;
})();
var OptionallyNeedsDirective = (function () {
    function OptionallyNeedsDirective(dependency) {
        this.dependency = dependency;
    }
    OptionallyNeedsDirective = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Self()),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [SimpleDirective])
    ], OptionallyNeedsDirective);
    return OptionallyNeedsDirective;
})();
var NeeedsDirectiveFromHost = (function () {
    function NeeedsDirectiveFromHost(dependency) {
        this.dependency = dependency;
    }
    NeeedsDirectiveFromHost = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [SimpleDirective])
    ], NeeedsDirectiveFromHost);
    return NeeedsDirectiveFromHost;
})();
var NeedsDirectiveFromHostShadowDom = (function () {
    function NeedsDirectiveFromHostShadowDom(dependency) {
        this.dependency = dependency;
    }
    NeedsDirectiveFromHostShadowDom = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [SimpleDirective])
    ], NeedsDirectiveFromHostShadowDom);
    return NeedsDirectiveFromHostShadowDom;
})();
var NeedsService = (function () {
    function NeedsService(service) {
        this.service = service;
    }
    NeedsService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject("service")), 
        __metadata('design:paramtypes', [Object])
    ], NeedsService);
    return NeedsService;
})();
var NeedsServiceFromHost = (function () {
    function NeedsServiceFromHost(service) {
        this.service = service;
    }
    NeedsServiceFromHost = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Host()),
        __param(0, core_1.Inject("service")), 
        __metadata('design:paramtypes', [Object])
    ], NeedsServiceFromHost);
    return NeedsServiceFromHost;
})();
var HasEventEmitter = (function () {
    function HasEventEmitter() {
        this.emitter = "emitter";
    }
    return HasEventEmitter;
})();
var NeedsAttribute = (function () {
    function NeedsAttribute(typeAttribute, titleAttribute, fooAttribute) {
        this.typeAttribute = typeAttribute;
        this.titleAttribute = titleAttribute;
        this.fooAttribute = fooAttribute;
    }
    NeedsAttribute = __decorate([
        __param(0, metadata_1.Attribute('type')),
        __param(1, metadata_1.Attribute('title')),
        __param(2, metadata_1.Attribute('foo')), 
        __metadata('design:paramtypes', [String, String, String])
    ], NeedsAttribute);
    return NeedsAttribute;
})();
var NeedsAttributeNoType = (function () {
    function NeedsAttributeNoType(fooAttribute) {
        this.fooAttribute = fooAttribute;
    }
    NeedsAttributeNoType = __decorate([
        core_1.Injectable(),
        __param(0, metadata_1.Attribute('foo')), 
        __metadata('design:paramtypes', [Object])
    ], NeedsAttributeNoType);
    return NeedsAttributeNoType;
})();
var NeedsQuery = (function () {
    function NeedsQuery(query) {
        this.query = query;
    }
    NeedsQuery = __decorate([
        core_1.Injectable(),
        __param(0, metadata_1.Query(CountingDirective)), 
        __metadata('design:paramtypes', [query_list_1.QueryList])
    ], NeedsQuery);
    return NeedsQuery;
})();
var NeedsViewQuery = (function () {
    function NeedsViewQuery(query) {
        this.query = query;
    }
    NeedsViewQuery = __decorate([
        core_1.Injectable(),
        __param(0, metadata_1.ViewQuery(CountingDirective)), 
        __metadata('design:paramtypes', [query_list_1.QueryList])
    ], NeedsViewQuery);
    return NeedsViewQuery;
})();
var NeedsQueryByVarBindings = (function () {
    function NeedsQueryByVarBindings(query) {
        this.query = query;
    }
    NeedsQueryByVarBindings = __decorate([
        core_1.Injectable(),
        __param(0, metadata_1.Query("one,two")), 
        __metadata('design:paramtypes', [query_list_1.QueryList])
    ], NeedsQueryByVarBindings);
    return NeedsQueryByVarBindings;
})();
var NeedsTemplateRefQuery = (function () {
    function NeedsTemplateRefQuery(query) {
        this.query = query;
    }
    NeedsTemplateRefQuery = __decorate([
        core_1.Injectable(),
        __param(0, metadata_1.Query(template_ref_1.TemplateRef)), 
        __metadata('design:paramtypes', [query_list_1.QueryList])
    ], NeedsTemplateRefQuery);
    return NeedsTemplateRefQuery;
})();
var NeedsElementRef = (function () {
    function NeedsElementRef(ref) {
        this.elementRef = ref;
    }
    NeedsElementRef = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [element_ref_1.ElementRef])
    ], NeedsElementRef);
    return NeedsElementRef;
})();
var NeedsViewContainer = (function () {
    function NeedsViewContainer(vc) {
        this.viewContainer = vc;
    }
    NeedsViewContainer = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [view_container_ref_1.ViewContainerRef])
    ], NeedsViewContainer);
    return NeedsViewContainer;
})();
var NeedsTemplateRef = (function () {
    function NeedsTemplateRef(ref) {
        this.templateRef = ref;
    }
    NeedsTemplateRef = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [template_ref_1.TemplateRef])
    ], NeedsTemplateRef);
    return NeedsTemplateRef;
})();
var OptionallyInjectsTemplateRef = (function () {
    function OptionallyInjectsTemplateRef(ref) {
        this.templateRef = ref;
    }
    OptionallyInjectsTemplateRef = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [template_ref_1.TemplateRef])
    ], OptionallyInjectsTemplateRef);
    return OptionallyInjectsTemplateRef;
})();
var DirectiveNeedsChangeDetectorRef = (function () {
    function DirectiveNeedsChangeDetectorRef(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
    }
    DirectiveNeedsChangeDetectorRef = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [change_detection_1.ChangeDetectorRef])
    ], DirectiveNeedsChangeDetectorRef);
    return DirectiveNeedsChangeDetectorRef;
})();
var ComponentNeedsChangeDetectorRef = (function () {
    function ComponentNeedsChangeDetectorRef(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
    }
    ComponentNeedsChangeDetectorRef = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [change_detection_1.ChangeDetectorRef])
    ], ComponentNeedsChangeDetectorRef);
    return ComponentNeedsChangeDetectorRef;
})();
var PipeNeedsChangeDetectorRef = (function () {
    function PipeNeedsChangeDetectorRef(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
    }
    PipeNeedsChangeDetectorRef = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [change_detection_1.ChangeDetectorRef])
    ], PipeNeedsChangeDetectorRef);
    return PipeNeedsChangeDetectorRef;
})();
var A_Needs_B = (function () {
    function A_Needs_B(dep) {
    }
    return A_Needs_B;
})();
var B_Needs_A = (function () {
    function B_Needs_A(dep) {
    }
    return B_Needs_A;
})();
var DirectiveWithDestroy = (function () {
    function DirectiveWithDestroy() {
        this.onDestroyCounter = 0;
    }
    DirectiveWithDestroy.prototype.onDestroy = function () { this.onDestroyCounter++; };
    return DirectiveWithDestroy;
})();
function main() {
    var defaultPreBuiltObjects = new element_injector_1.PreBuiltObjects(null, createDummyView(), new spies_1.SpyElementRef(), null);
    // An injector with more than 10 bindings will switch to the dynamic strategy
    var dynamicBindings = [];
    for (var i = 0; i < 20; i++) {
        dynamicBindings.push(core_1.bind(i).toValue(i));
    }
    function createPei(parent, index, bindings, distance, hasShadowRoot, dirVariableBindings) {
        if (distance === void 0) { distance = 1; }
        if (hasShadowRoot === void 0) { hasShadowRoot = false; }
        if (dirVariableBindings === void 0) { dirVariableBindings = null; }
        var directiveBinding = bindings.map(function (b) {
            if (b instanceof element_injector_1.DirectiveBinding)
                return b;
            if (b instanceof core_1.Binding)
                return element_injector_1.DirectiveBinding.createFromBinding(b, null);
            return element_injector_1.DirectiveBinding.createFromType(b, null);
        });
        return element_injector_1.ProtoElementInjector.create(parent, index, directiveBinding, hasShadowRoot, distance, dirVariableBindings);
    }
    function injector(bindings, imperativelyCreatedInjector, isComponent, preBuiltObjects, attributes, dirVariableBindings) {
        if (imperativelyCreatedInjector === void 0) { imperativelyCreatedInjector = null; }
        if (isComponent === void 0) { isComponent = false; }
        if (preBuiltObjects === void 0) { preBuiltObjects = null; }
        if (attributes === void 0) { attributes = null; }
        if (dirVariableBindings === void 0) { dirVariableBindings = null; }
        var proto = createPei(null, 0, bindings, 0, isComponent, dirVariableBindings);
        proto.attributes = attributes;
        var inj = proto.instantiate(null);
        var preBuilt = lang_1.isPresent(preBuiltObjects) ? preBuiltObjects : defaultPreBuiltObjects;
        inj.hydrate(imperativelyCreatedInjector, null, preBuilt);
        return inj;
    }
    function parentChildInjectors(parentBindings, childBindings, parentPreBuildObjects, imperativelyCreatedInjector) {
        if (parentPreBuildObjects === void 0) { parentPreBuildObjects = null; }
        if (imperativelyCreatedInjector === void 0) { imperativelyCreatedInjector = null; }
        if (lang_1.isBlank(parentPreBuildObjects))
            parentPreBuildObjects = defaultPreBuiltObjects;
        var protoParent = createPei(null, 0, parentBindings);
        var parent = protoParent.instantiate(null);
        parent.hydrate(null, null, parentPreBuildObjects);
        var protoChild = createPei(protoParent, 1, childBindings, 1, false);
        var child = protoChild.instantiate(parent);
        child.hydrate(imperativelyCreatedInjector, null, defaultPreBuiltObjects);
        return child;
    }
    function hostShadowInjectors(hostBindings, shadowBindings, imperativelyCreatedInjector) {
        if (imperativelyCreatedInjector === void 0) { imperativelyCreatedInjector = null; }
        var protoHost = createPei(null, 0, hostBindings, 0, true);
        var host = protoHost.instantiate(null);
        host.hydrate(null, null, defaultPreBuiltObjects);
        var protoShadow = createPei(null, 0, shadowBindings, 0, false);
        var shadow = protoShadow.instantiate(null);
        shadow.hydrate(imperativelyCreatedInjector, host, null);
        return shadow;
    }
    test_lib_1.describe('TreeNodes', function () {
        var root, child;
        test_lib_1.beforeEach(function () {
            root = new element_injector_1.TreeNode(null);
            child = new element_injector_1.TreeNode(root);
        });
        test_lib_1.it('should support removing and adding the parent', function () {
            test_lib_1.expect(child.parent).toEqual(root);
            child.remove();
            test_lib_1.expect(child.parent).toEqual(null);
            root.addChild(child);
            test_lib_1.expect(child.parent).toEqual(root);
        });
    });
    test_lib_1.describe("ProtoElementInjector", function () {
        test_lib_1.describe("direct parent", function () {
            test_lib_1.it("should return parent proto injector when distance is 1", function () {
                var distance = 1;
                var protoParent = createPei(null, 0, []);
                var protoChild = createPei(protoParent, 0, [], distance, false);
                test_lib_1.expect(protoChild.directParent()).toEqual(protoParent);
            });
            test_lib_1.it("should return null otherwise", function () {
                var distance = 2;
                var protoParent = createPei(null, 0, []);
                var protoChild = createPei(protoParent, 0, [], distance, false);
                test_lib_1.expect(protoChild.directParent()).toEqual(null);
            });
        });
        test_lib_1.describe('inline strategy', function () {
            test_lib_1.it("should allow for direct access using getBindingAtIndex", function () {
                var proto = createPei(null, 0, [core_1.bind(SimpleDirective).toClass(SimpleDirective)]);
                test_lib_1.expect(proto.getBindingAtIndex(0)).toBeAnInstanceOf(element_injector_1.DirectiveBinding);
                test_lib_1.expect(function () { return proto.getBindingAtIndex(-1); }).toThrowError('Index -1 is out-of-bounds.');
                test_lib_1.expect(function () { return proto.getBindingAtIndex(10); }).toThrowError('Index 10 is out-of-bounds.');
            });
        });
        test_lib_1.describe('dynamic strategy', function () {
            test_lib_1.it("should allow for direct access using getBindingAtIndex", function () {
                var proto = createPei(null, 0, dynamicBindings);
                test_lib_1.expect(proto.getBindingAtIndex(0)).toBeAnInstanceOf(element_injector_1.DirectiveBinding);
                test_lib_1.expect(function () { return proto.getBindingAtIndex(-1); }).toThrowError('Index -1 is out-of-bounds.');
                test_lib_1.expect(function () { return proto.getBindingAtIndex(dynamicBindings.length - 1); }).not.toThrow();
                test_lib_1.expect(function () { return proto.getBindingAtIndex(dynamicBindings.length); })
                    .toThrowError("Index " + dynamicBindings.length + " is out-of-bounds.");
            });
        });
        test_lib_1.describe('event emitters', function () {
            test_lib_1.it('should return a list of event accessors', function () {
                var binding = element_injector_1.DirectiveBinding.createFromType(HasEventEmitter, new metadata_1.DirectiveMetadata({ outputs: ['emitter'] }));
                var inj = createPei(null, 0, [binding]);
                test_lib_1.expect(inj.eventEmitterAccessors.length).toEqual(1);
                var accessor = inj.eventEmitterAccessors[0][0];
                test_lib_1.expect(accessor.eventName).toEqual('emitter');
                test_lib_1.expect(accessor.getter(new HasEventEmitter())).toEqual('emitter');
            });
            test_lib_1.it('should allow a different event vs field name', function () {
                var binding = element_injector_1.DirectiveBinding.createFromType(HasEventEmitter, new metadata_1.DirectiveMetadata({ outputs: ['emitter: publicEmitter'] }));
                var inj = createPei(null, 0, [binding]);
                test_lib_1.expect(inj.eventEmitterAccessors.length).toEqual(1);
                var accessor = inj.eventEmitterAccessors[0][0];
                test_lib_1.expect(accessor.eventName).toEqual('publicEmitter');
                test_lib_1.expect(accessor.getter(new HasEventEmitter())).toEqual('emitter');
            });
        });
        test_lib_1.describe(".create", function () {
            test_lib_1.it("should collect bindings from all directives", function () {
                var pei = createPei(null, 0, [
                    element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new metadata_1.ComponentMetadata({ bindings: [core_1.bind('injectable1').toValue('injectable1')] })),
                    element_injector_1.DirectiveBinding.createFromType(SomeOtherDirective, new metadata_1.ComponentMetadata({
                        bindings: [core_1.bind('injectable2').toValue('injectable2')]
                    }))
                ]);
                test_lib_1.expect(pei.getBindingAtIndex(0).key.token).toBe(SimpleDirective);
                test_lib_1.expect(pei.getBindingAtIndex(1).key.token).toBe(SomeOtherDirective);
                test_lib_1.expect(pei.getBindingAtIndex(2).key.token).toEqual("injectable1");
                test_lib_1.expect(pei.getBindingAtIndex(3).key.token).toEqual("injectable2");
            });
            test_lib_1.it("should collect view bindings from the component", function () {
                var pei = createPei(null, 0, [element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new metadata_1.ComponentMetadata({
                        viewBindings: [core_1.bind('injectable1').toValue('injectable1')]
                    }))], 0, true);
                test_lib_1.expect(pei.getBindingAtIndex(0).key.token).toBe(SimpleDirective);
                test_lib_1.expect(pei.getBindingAtIndex(1).key.token).toEqual("injectable1");
            });
            test_lib_1.it("should flatten nested arrays", function () {
                var pei = createPei(null, 0, [
                    element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new metadata_1.ComponentMetadata({
                        viewBindings: [[[core_1.bind('view').toValue('view')]]],
                        bindings: [[[core_1.bind('host').toValue('host')]]]
                    }))
                ], 0, true);
                test_lib_1.expect(pei.getBindingAtIndex(0).key.token).toBe(SimpleDirective);
                test_lib_1.expect(pei.getBindingAtIndex(1).key.token).toEqual("view");
                test_lib_1.expect(pei.getBindingAtIndex(2).key.token).toEqual("host");
            });
            test_lib_1.it('should support an arbitrary number of bindings', function () {
                var pei = createPei(null, 0, dynamicBindings);
                for (var i = 0; i < dynamicBindings.length; i++) {
                    test_lib_1.expect(pei.getBindingAtIndex(i).key.token).toBe(i);
                }
            });
        });
    });
    test_lib_1.describe("ElementInjector", function () {
        test_lib_1.describe("instantiate", function () {
            test_lib_1.it("should create an element injector", function () {
                var protoParent = createPei(null, 0, []);
                var protoChild1 = createPei(protoParent, 1, []);
                var protoChild2 = createPei(protoParent, 2, []);
                var p = protoParent.instantiate(null);
                var c1 = protoChild1.instantiate(p);
                var c2 = protoChild2.instantiate(p);
                test_lib_1.expect(c1.parent).toEqual(p);
                test_lib_1.expect(c2.parent).toEqual(p);
                test_lib_1.expect(lang_1.isBlank(p.parent)).toBeTruthy();
            });
            test_lib_1.describe("direct parent", function () {
                test_lib_1.it("should return parent injector when distance is 1", function () {
                    var distance = 1;
                    var protoParent = createPei(null, 0, []);
                    var protoChild = createPei(protoParent, 1, [], distance);
                    var p = protoParent.instantiate(null);
                    var c = protoChild.instantiate(p);
                    test_lib_1.expect(c.directParent()).toEqual(p);
                });
                test_lib_1.it("should return null otherwise", function () {
                    var distance = 2;
                    var protoParent = createPei(null, 0, []);
                    var protoChild = createPei(protoParent, 1, [], distance);
                    var p = protoParent.instantiate(null);
                    var c = protoChild.instantiate(p);
                    test_lib_1.expect(c.directParent()).toEqual(null);
                });
            });
        });
        test_lib_1.describe("hasBindings", function () {
            test_lib_1.it("should be true when there are bindings", function () {
                var p = createPei(null, 0, [SimpleDirective]);
                test_lib_1.expect(p.hasBindings).toBeTruthy();
            });
            test_lib_1.it("should be false otherwise", function () {
                var p = createPei(null, 0, []);
                test_lib_1.expect(p.hasBindings).toBeFalsy();
            });
        });
        test_lib_1.describe("hasInstances", function () {
            test_lib_1.it("should be false when no directives are instantiated", function () { test_lib_1.expect(injector([]).hasInstances()).toBe(false); });
            test_lib_1.it("should be true when directives are instantiated", function () { test_lib_1.expect(injector([SimpleDirective]).hasInstances()).toBe(true); });
        });
        [{ strategy: 'inline', bindings: [] }, { strategy: 'dynamic',
                bindings: dynamicBindings }].forEach(function (context) {
            var extraBindings = context['bindings'];
            test_lib_1.describe(context['strategy'] + " strategy", function () {
                test_lib_1.describe("hydrate", function () {
                    test_lib_1.it("should instantiate directives that have no dependencies", function () {
                        var bindings = collection_1.ListWrapper.concat([SimpleDirective], extraBindings);
                        var inj = injector(bindings);
                        test_lib_1.expect(inj.get(SimpleDirective)).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should instantiate directives that depend on an arbitrary number of directives", function () {
                        var bindings = collection_1.ListWrapper.concat([SimpleDirective, NeedsDirective], extraBindings);
                        var inj = injector(bindings);
                        var d = inj.get(NeedsDirective);
                        test_lib_1.expect(d).toBeAnInstanceOf(NeedsDirective);
                        test_lib_1.expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should instantiate bindings that have dependencies with set visibility", function () {
                        var childInj = parentChildInjectors(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new metadata_1.ComponentMetadata({
                                bindings: [core_1.bind('injectable1').toValue('injectable1')]
                            }))], extraBindings), [element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new metadata_1.ComponentMetadata({
                                bindings: [
                                    core_1.bind('injectable1')
                                        .toValue('new-injectable1'),
                                    core_1.bind('injectable2')
                                        .toFactory(function (val) { return (val + "-injectable2"); }, [[new core_1.InjectMetadata('injectable1'), new core_1.SkipSelfMetadata()]])
                                ]
                            }))]);
                        test_lib_1.expect(childInj.get('injectable2')).toEqual('injectable1-injectable2');
                    });
                    test_lib_1.it("should instantiate bindings that have dependencies", function () {
                        var bindings = [
                            core_1.bind('injectable1')
                                .toValue('injectable1'),
                            core_1.bind('injectable2')
                                .toFactory(function (val) { return (val + "-injectable2"); }, ['injectable1'])
                        ];
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new metadata_1.DirectiveMetadata({ bindings: bindings }))], extraBindings));
                        test_lib_1.expect(inj.get('injectable2')).toEqual('injectable1-injectable2');
                    });
                    test_lib_1.it("should instantiate viewBindings that have dependencies", function () {
                        var viewBindings = [
                            core_1.bind('injectable1')
                                .toValue('injectable1'),
                            core_1.bind('injectable2')
                                .toFactory(function (val) { return (val + "-injectable2"); }, ['injectable1'])
                        ];
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new metadata_1.ComponentMetadata({
                                viewBindings: viewBindings }))], extraBindings), null, true);
                        test_lib_1.expect(inj.get('injectable2')).toEqual('injectable1-injectable2');
                    });
                    test_lib_1.it("should instantiate components that depend on viewBindings bindings", function () {
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(NeedsService, new metadata_1.ComponentMetadata({
                                viewBindings: [core_1.bind('service').toValue('service')]
                            }))], extraBindings), null, true);
                        test_lib_1.expect(inj.get(NeedsService).service).toEqual('service');
                    });
                    test_lib_1.it("should instantiate bindings lazily", function () {
                        var created = false;
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new metadata_1.ComponentMetadata({
                                bindings: [core_1.bind('service').toFactory(function () { return created = true; })]
                            }))], extraBindings), null, true);
                        test_lib_1.expect(created).toBe(false);
                        inj.get('service');
                        test_lib_1.expect(created).toBe(true);
                    });
                    test_lib_1.it("should instantiate view bindings lazily", function () {
                        var created = false;
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new metadata_1.ComponentMetadata({
                                viewBindings: [core_1.bind('service').toFactory(function () { return created = true; })]
                            }))], extraBindings), null, true);
                        test_lib_1.expect(created).toBe(false);
                        inj.get('service');
                        test_lib_1.expect(created).toBe(true);
                    });
                    test_lib_1.it("should not instantiate other directives that depend on viewBindings bindings", function () {
                        var directiveAnnotation = new metadata_1.ComponentMetadata({
                            viewBindings: collection_1.ListWrapper.concat([core_1.bind("service").toValue("service")], extraBindings)
                        });
                        var componentDirective = element_injector_1.DirectiveBinding.createFromType(SimpleDirective, directiveAnnotation);
                        test_lib_1.expect(function () { injector([componentDirective, NeedsService], null); })
                            .toThrowError(test_lib_1.containsRegexp("No provider for service! (" + lang_1.stringify(NeedsService) + " -> service)"));
                    });
                    test_lib_1.it("should instantiate directives that depend on bindings of other directives", function () {
                        var shadowInj = hostShadowInjectors(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new metadata_1.ComponentMetadata({
                                bindings: [core_1.bind('service').toValue('hostService')] }))], extraBindings), collection_1.ListWrapper.concat([NeedsService], extraBindings));
                        test_lib_1.expect(shadowInj.get(NeedsService).service).toEqual('hostService');
                    });
                    test_lib_1.it("should instantiate directives that depend on imperatively created injector bindings (bootstrap)", function () {
                        var imperativelyCreatedInjector = core_1.Injector.resolveAndCreate([
                            core_1.bind("service").toValue('appService')
                        ]);
                        var inj = injector([NeedsService], imperativelyCreatedInjector);
                        test_lib_1.expect(inj.get(NeedsService).service).toEqual('appService');
                        test_lib_1.expect(function () { return injector([NeedsServiceFromHost], imperativelyCreatedInjector); }).toThrowError();
                    });
                    test_lib_1.it("should instantiate directives that depend on imperatively created injector bindings (root injector)", function () {
                        var imperativelyCreatedInjector = core_1.Injector.resolveAndCreate([
                            core_1.bind("service").toValue('appService')
                        ]);
                        var inj = hostShadowInjectors([SimpleDirective], [NeedsService, NeedsServiceFromHost], imperativelyCreatedInjector);
                        test_lib_1.expect(inj.get(NeedsService).service).toEqual('appService');
                        test_lib_1.expect(inj.get(NeedsServiceFromHost).service).toEqual('appService');
                    });
                    test_lib_1.it("should instantiate directives that depend on imperatively created injector bindings (child injector)", function () {
                        var imperativelyCreatedInjector = core_1.Injector.resolveAndCreate([
                            core_1.bind("service").toValue('appService')
                        ]);
                        var inj = parentChildInjectors([], [NeedsService, NeedsServiceFromHost], null, imperativelyCreatedInjector);
                        test_lib_1.expect(inj.get(NeedsService).service).toEqual('appService');
                        test_lib_1.expect(inj.get(NeedsServiceFromHost).service).toEqual('appService');
                    });
                    test_lib_1.it("should prioritize viewBindings over bindings for the same binding", function () {
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(NeedsService, new metadata_1.ComponentMetadata({
                                bindings: [core_1.bind('service').toValue('hostService')],
                                viewBindings: [core_1.bind('service').toValue('viewService')] }))], extraBindings), null, true);
                        test_lib_1.expect(inj.get(NeedsService).service).toEqual('viewService');
                    });
                    test_lib_1.it("should prioritize directive bindings over component bindings", function () {
                        var component = element_injector_1.DirectiveBinding.createFromType(NeedsService, new metadata_1.ComponentMetadata({
                            bindings: [core_1.bind('service').toValue('compService')] }));
                        var directive = element_injector_1.DirectiveBinding.createFromType(SomeOtherDirective, new metadata_1.DirectiveMetadata({
                            bindings: [core_1.bind('service').toValue('dirService')] }));
                        var inj = injector(collection_1.ListWrapper.concat([component, directive], extraBindings), null, true);
                        test_lib_1.expect(inj.get(NeedsService).service).toEqual('dirService');
                    });
                    test_lib_1.it("should not instantiate a directive in a view that has a host dependency on bindings" +
                        " of the component", function () {
                        test_lib_1.expect(function () {
                            hostShadowInjectors(collection_1.ListWrapper.concat([
                                element_injector_1.DirectiveBinding.createFromType(SomeOtherDirective, new metadata_1.DirectiveMetadata({
                                    bindings: [core_1.bind('service').toValue('hostService')] }))], extraBindings), collection_1.ListWrapper.concat([NeedsServiceFromHost], extraBindings));
                        }).toThrowError(new RegExp("No provider for service!"));
                    });
                    test_lib_1.it("should not instantiate a directive in a view that has a host dependency on bindings" +
                        " of a decorator directive", function () {
                        test_lib_1.expect(function () {
                            hostShadowInjectors(collection_1.ListWrapper.concat([
                                SimpleDirective,
                                element_injector_1.DirectiveBinding.createFromType(SomeOtherDirective, new metadata_1.DirectiveMetadata({
                                    bindings: [core_1.bind('service').toValue('hostService')] }))], extraBindings), collection_1.ListWrapper.concat([NeedsServiceFromHost], extraBindings));
                        }).toThrowError(new RegExp("No provider for service!"));
                    });
                    test_lib_1.it("should instantiate directives that depend on pre built objects", function () {
                        var templateRef = new template_ref_1.TemplateRef_(new spies_1.SpyElementRef());
                        var bindings = collection_1.ListWrapper.concat([NeedsTemplateRef], extraBindings);
                        var inj = injector(bindings, null, false, new element_injector_1.PreBuiltObjects(null, null, null, templateRef));
                        test_lib_1.expect(inj.get(NeedsTemplateRef).templateRef).toEqual(templateRef);
                    });
                    test_lib_1.it("should get directives", function () {
                        var child = hostShadowInjectors(collection_1.ListWrapper.concat([SomeOtherDirective, SimpleDirective], extraBindings), [NeedsDirectiveFromHostShadowDom]);
                        var d = child.get(NeedsDirectiveFromHostShadowDom);
                        test_lib_1.expect(d).toBeAnInstanceOf(NeedsDirectiveFromHostShadowDom);
                        test_lib_1.expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should get directives from the host", function () {
                        var child = parentChildInjectors(collection_1.ListWrapper.concat([SimpleDirective], extraBindings), [NeeedsDirectiveFromHost]);
                        var d = child.get(NeeedsDirectiveFromHost);
                        test_lib_1.expect(d).toBeAnInstanceOf(NeeedsDirectiveFromHost);
                        test_lib_1.expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should throw when a dependency cannot be resolved", function () {
                        test_lib_1.expect(function () { return injector(collection_1.ListWrapper.concat([NeeedsDirectiveFromHost], extraBindings)); })
                            .toThrowError(test_lib_1.containsRegexp("No provider for " + lang_1.stringify(SimpleDirective) + "! (" + lang_1.stringify(NeeedsDirectiveFromHost) + " -> " + lang_1.stringify(SimpleDirective) + ")"));
                    });
                    test_lib_1.it("should inject null when an optional dependency cannot be resolved", function () {
                        var inj = injector(collection_1.ListWrapper.concat([OptionallyNeedsDirective], extraBindings));
                        var d = inj.get(OptionallyNeedsDirective);
                        test_lib_1.expect(d.dependency).toEqual(null);
                    });
                    test_lib_1.it("should accept bindings instead of types", function () {
                        var inj = injector(collection_1.ListWrapper.concat([core_1.bind(SimpleDirective).toClass(SimpleDirective)], extraBindings));
                        test_lib_1.expect(inj.get(SimpleDirective)).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should allow for direct access using getDirectiveAtIndex", function () {
                        var bindings = collection_1.ListWrapper.concat([core_1.bind(SimpleDirective).toClass(SimpleDirective)], extraBindings);
                        var inj = injector(bindings);
                        var firsIndexOut = bindings.length > 10 ? bindings.length : 10;
                        test_lib_1.expect(inj.getDirectiveAtIndex(0)).toBeAnInstanceOf(SimpleDirective);
                        test_lib_1.expect(function () { return inj.getDirectiveAtIndex(-1); }).toThrowError('Index -1 is out-of-bounds.');
                        test_lib_1.expect(function () { return inj.getDirectiveAtIndex(firsIndexOut); })
                            .toThrowError("Index " + firsIndexOut + " is out-of-bounds.");
                    });
                    test_lib_1.it("should instantiate directives that depend on the containing component", function () {
                        var directiveBinding = element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new metadata_1.ComponentMetadata());
                        var shadow = hostShadowInjectors(collection_1.ListWrapper.concat([directiveBinding], extraBindings), [NeeedsDirectiveFromHost]);
                        var d = shadow.get(NeeedsDirectiveFromHost);
                        test_lib_1.expect(d).toBeAnInstanceOf(NeeedsDirectiveFromHost);
                        test_lib_1.expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should not instantiate directives that depend on other directives in the containing component's ElementInjector", function () {
                        var directiveBinding = element_injector_1.DirectiveBinding.createFromType(SomeOtherDirective, new metadata_1.ComponentMetadata());
                        test_lib_1.expect(function () {
                            hostShadowInjectors(collection_1.ListWrapper.concat([directiveBinding, SimpleDirective], extraBindings), [NeedsDirective]);
                        })
                            .toThrowError(test_lib_1.containsRegexp("No provider for " + lang_1.stringify(SimpleDirective) + "! (" + lang_1.stringify(NeedsDirective) + " -> " + lang_1.stringify(SimpleDirective) + ")"));
                    });
                });
                test_lib_1.describe("getRootViewInjectors", function () {
                    test_lib_1.it("should return an empty array if there is no nested view", function () {
                        var inj = injector(extraBindings);
                        test_lib_1.expect(inj.getRootViewInjectors()).toEqual([]);
                    });
                    test_lib_1.it("should return an empty array on a dehydrated view", function () {
                        var inj = injector(extraBindings);
                        inj.dehydrate();
                        test_lib_1.expect(inj.getRootViewInjectors()).toEqual([]);
                    });
                });
                test_lib_1.describe("dehydrate", function () {
                    function cycleHydrate(inj, host) {
                        if (host === void 0) { host = null; }
                        // Each injection supports 3 query slots, so we cycle 4 times.
                        for (var i = 0; i < 4; i++) {
                            inj.dehydrate();
                            inj.hydrate(null, host, defaultPreBuiltObjects);
                        }
                    }
                    test_lib_1.it("should handle repeated hydration / dehydration", function () {
                        var inj = injector(extraBindings);
                        cycleHydrate(inj);
                    });
                    test_lib_1.it("should handle repeated hydration / dehydration with query present", function () {
                        var inj = injector(collection_1.ListWrapper.concat([NeedsQuery], extraBindings));
                        cycleHydrate(inj);
                    });
                    test_lib_1.it("should handle repeated hydration / dehydration with view query present", function () {
                        var inj = injector(extraBindings);
                        var host = injector(collection_1.ListWrapper.concat([NeedsViewQuery], extraBindings));
                        cycleHydrate(inj, host);
                    });
                });
                test_lib_1.describe("lifecycle", function () {
                    test_lib_1.it("should call onDestroy on directives subscribed to this event", function () {
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(DirectiveWithDestroy, new metadata_1.DirectiveMetadata())], extraBindings));
                        var destroy = inj.get(DirectiveWithDestroy);
                        inj.dehydrate();
                        test_lib_1.expect(destroy.onDestroyCounter).toBe(1);
                    });
                    test_lib_1.it("should work with services", function () {
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new metadata_1.DirectiveMetadata({ bindings: [SimpleService] }))], extraBindings));
                        inj.dehydrate();
                    });
                });
                test_lib_1.describe('static attributes', function () {
                    test_lib_1.it('should be injectable', function () {
                        var attributes = new Map();
                        attributes.set('type', 'text');
                        attributes.set('title', '');
                        var inj = injector(collection_1.ListWrapper.concat([NeedsAttribute], extraBindings), null, false, null, attributes);
                        var needsAttribute = inj.get(NeedsAttribute);
                        test_lib_1.expect(needsAttribute.typeAttribute).toEqual('text');
                        test_lib_1.expect(needsAttribute.titleAttribute).toEqual('');
                        test_lib_1.expect(needsAttribute.fooAttribute).toEqual(null);
                    });
                    test_lib_1.it('should be injectable without type annotation', function () {
                        var attributes = new Map();
                        attributes.set('foo', 'bar');
                        var inj = injector(collection_1.ListWrapper.concat([NeedsAttributeNoType], extraBindings), null, false, null, attributes);
                        var needsAttribute = inj.get(NeedsAttributeNoType);
                        test_lib_1.expect(needsAttribute.fooAttribute).toEqual('bar');
                    });
                });
                test_lib_1.describe("refs", function () {
                    test_lib_1.it("should inject ElementRef", function () {
                        var inj = injector(collection_1.ListWrapper.concat([NeedsElementRef], extraBindings));
                        test_lib_1.expect(inj.get(NeedsElementRef).elementRef).toBe(defaultPreBuiltObjects.elementRef);
                    });
                    test_lib_1.it("should inject ChangeDetectorRef of the component's view into the component", function () {
                        var cd = new change_detection_1.DynamicChangeDetector(null, null, 0, [], [], null, [], [], [], null);
                        var view = createDummyView();
                        var childView = createDummyView(cd);
                        view.spy('getNestedView').andReturn(childView);
                        var binding = element_injector_1.DirectiveBinding.createFromType(ComponentNeedsChangeDetectorRef, new metadata_1.ComponentMetadata());
                        var inj = injector(collection_1.ListWrapper.concat([binding], extraBindings), null, true, new element_injector_1.PreBuiltObjects(null, view, new spies_1.SpyElementRef(), null));
                        test_lib_1.expect(inj.get(ComponentNeedsChangeDetectorRef).changeDetectorRef).toBe(cd.ref);
                    });
                    test_lib_1.it("should inject ChangeDetectorRef of the containing component into directives", function () {
                        var cd = new change_detection_1.DynamicChangeDetector(null, null, 0, [], [], null, [], [], [], null);
                        var view = createDummyView(cd);
                        var binding = element_injector_1.DirectiveBinding.createFromType(DirectiveNeedsChangeDetectorRef, new metadata_1.DirectiveMetadata());
                        var inj = injector(collection_1.ListWrapper.concat([binding], extraBindings), null, false, new element_injector_1.PreBuiltObjects(null, view, new spies_1.SpyElementRef(), null));
                        test_lib_1.expect(inj.get(DirectiveNeedsChangeDetectorRef).changeDetectorRef).toBe(cd.ref);
                    });
                    test_lib_1.it('should inject ViewContainerRef', function () {
                        var inj = injector(collection_1.ListWrapper.concat([NeedsViewContainer], extraBindings));
                        test_lib_1.expect(inj.get(NeedsViewContainer).viewContainer).toBeAnInstanceOf(view_container_ref_1.ViewContainerRef_);
                    });
                    test_lib_1.it("should inject TemplateRef", function () {
                        var templateRef = new template_ref_1.TemplateRef_(new spies_1.SpyElementRef());
                        var inj = injector(collection_1.ListWrapper.concat([NeedsTemplateRef], extraBindings), null, false, new element_injector_1.PreBuiltObjects(null, null, null, templateRef));
                        test_lib_1.expect(inj.get(NeedsTemplateRef).templateRef).toEqual(templateRef);
                    });
                    test_lib_1.it("should throw if there is no TemplateRef", function () {
                        test_lib_1.expect(function () { return injector(collection_1.ListWrapper.concat([NeedsTemplateRef], extraBindings)); })
                            .toThrowError("No provider for TemplateRef! (" + lang_1.stringify(NeedsTemplateRef) + " -> TemplateRef)");
                    });
                    test_lib_1.it('should inject null if there is no TemplateRef when the dependency is optional', function () {
                        var inj = injector(collection_1.ListWrapper.concat([OptionallyInjectsTemplateRef], extraBindings));
                        var instance = inj.get(OptionallyInjectsTemplateRef);
                        test_lib_1.expect(instance.templateRef).toBeNull();
                    });
                });
                test_lib_1.describe('queries', function () {
                    var dummyView;
                    var preBuildObjects;
                    test_lib_1.beforeEach(function () {
                        _constructionCount = 0;
                        dummyView = createDummyView();
                        preBuildObjects = new element_injector_1.PreBuiltObjects(null, dummyView, new spies_1.SpyElementRef(), null);
                    });
                    function expectDirectives(query, type, expectedIndex) {
                        var currentCount = 0;
                        test_lib_1.expect(query.length).toEqual(expectedIndex.length);
                        collection_1.iterateListLike(query, function (i) {
                            test_lib_1.expect(i).toBeAnInstanceOf(type);
                            test_lib_1.expect(i.count).toBe(expectedIndex[currentCount]);
                            currentCount += 1;
                        });
                    }
                    test_lib_1.it('should be injectable', function () {
                        var inj = injector(collection_1.ListWrapper.concat([NeedsQuery], extraBindings), null, false, preBuildObjects);
                        test_lib_1.expect(inj.get(NeedsQuery).query).toBeAnInstanceOf(query_list_1.QueryList);
                    });
                    test_lib_1.it('should contain directives on the same injector', function () {
                        var inj = injector(collection_1.ListWrapper.concat([
                            NeedsQuery,
                            CountingDirective
                        ], extraBindings), null, false, preBuildObjects);
                        addInj(dummyView, inj);
                        inj.afterContentChecked();
                        expectDirectives(inj.get(NeedsQuery).query, CountingDirective, [0]);
                    });
                    test_lib_1.it('should contain PreBuiltObjects on the same injector', function () {
                        var preBuiltObjects = new element_injector_1.PreBuiltObjects(null, dummyView, null, new template_ref_1.TemplateRef_(new spies_1.SpyElementRef()));
                        var inj = injector(collection_1.ListWrapper.concat([
                            NeedsTemplateRefQuery
                        ], extraBindings), null, false, preBuiltObjects);
                        addInj(dummyView, inj);
                        inj.afterContentChecked();
                        test_lib_1.expect(inj.get(NeedsTemplateRefQuery).query.first).toBe(preBuiltObjects.templateRef);
                    });
                    test_lib_1.it('should contain the element when no directives are bound to the var binding', function () {
                        var dirs = [NeedsQueryByVarBindings];
                        var dirVariableBindings = collection_1.MapWrapper.createFromStringMap({
                            "one": null // element
                        });
                        var inj = injector(dirs.concat(extraBindings), null, false, preBuildObjects, null, dirVariableBindings);
                        addInj(dummyView, inj);
                        inj.afterContentChecked();
                        test_lib_1.expect(inj.get(NeedsQueryByVarBindings).query.first).toBe(preBuildObjects.elementRef);
                    });
                    test_lib_1.it('should contain directives on the same injector when querying by variable bindings' +
                        'in the order of var bindings specified in the query', function () {
                        var dirs = [NeedsQueryByVarBindings, NeedsDirective, SimpleDirective];
                        var dirVariableBindings = collection_1.MapWrapper.createFromStringMap({
                            "one": 2,
                            "two": 1 // 1 is the index of NeedsDirective
                        });
                        var inj = injector(dirs.concat(extraBindings), null, false, preBuildObjects, null, dirVariableBindings);
                        addInj(dummyView, inj);
                        inj.afterContentChecked();
                        // NeedsQueryByVarBindings queries "one,two", so SimpleDirective should be before NeedsDirective
                        test_lib_1.expect(inj.get(NeedsQueryByVarBindings).query.first).toBeAnInstanceOf(SimpleDirective);
                        test_lib_1.expect(inj.get(NeedsQueryByVarBindings).query.last).toBeAnInstanceOf(NeedsDirective);
                    });
                    test_lib_1.it('should contain directives on the same and a child injector in construction order', function () {
                        var protoParent = createPei(null, 0, [NeedsQuery, CountingDirective]);
                        var protoChild = createPei(protoParent, 1, collection_1.ListWrapper.concat([CountingDirective], extraBindings));
                        var parent = protoParent.instantiate(null);
                        var child = protoChild.instantiate(parent);
                        parent.hydrate(null, null, preBuildObjects);
                        child.hydrate(null, null, preBuildObjects);
                        addInj(dummyView, parent);
                        addInj(dummyView, child);
                        parent.afterContentChecked();
                        expectDirectives(parent.get(NeedsQuery).query, CountingDirective, [0, 1]);
                    });
                });
            });
        });
    });
}
exports.main = main;
var ContextWithHandler = (function () {
    function ContextWithHandler(handler) {
        this.handler = handler;
    }
    return ContextWithHandler;
})();
//# sourceMappingURL=element_injector_spec.js.map