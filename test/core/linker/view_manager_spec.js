var test_lib_1 = require('angular2/test_lib');
var spies_1 = require('../spies');
var core_1 = require('angular2/core');
var view_ref_1 = require('angular2/src/core/linker/view_ref');
var template_ref_1 = require('angular2/src/core/linker/template_ref');
var api_1 = require('angular2/src/core/render/api');
var view_manager_1 = require('angular2/src/core/linker/view_manager');
var view_manager_utils_1 = require('angular2/src/core/linker/view_manager_utils');
var view_manager_utils_spec_1 = require('./view_manager_utils_spec');
function main() {
    // TODO(tbosch): add missing tests
    test_lib_1.describe('AppViewManager', function () {
        var renderer;
        var utils;
        var viewListener;
        var viewPool;
        var linker;
        var manager;
        var createdRenderViews;
        function wrapPv(protoView) { return new view_ref_1.ProtoViewRef(protoView); }
        function wrapView(view) { return new view_ref_1.ViewRef(view); }
        function resetSpies() {
            viewListener.spy('viewCreated').reset();
            viewListener.spy('viewDestroyed').reset();
            renderer.spy('createView').reset();
            renderer.spy('destroyView').reset();
            renderer.spy('createRootHostView').reset();
            renderer.spy('setEventDispatcher').reset();
            renderer.spy('hydrateView').reset();
            renderer.spy('dehydrateView').reset();
            viewPool.spy('returnView').reset();
        }
        test_lib_1.beforeEach(function () {
            renderer = new spies_1.SpyRenderer();
            utils = new view_manager_utils_1.AppViewManagerUtils();
            viewListener = new spies_1.SpyAppViewListener();
            viewPool = new spies_1.SpyAppViewPool();
            linker = new spies_1.SpyProtoViewFactory();
            manager = new view_manager_1.AppViewManager(viewPool, viewListener, utils, renderer, linker);
            createdRenderViews = [];
            renderer.spy('createRootHostView')
                .andCallFake(function (_a, renderFragmentCount, _b) {
                var fragments = [];
                for (var i = 0; i < renderFragmentCount; i++) {
                    fragments.push(new api_1.RenderFragmentRef());
                }
                var rv = new api_1.RenderViewWithFragments(new api_1.RenderViewRef(), fragments);
                createdRenderViews.push(rv);
                return rv;
            });
            renderer.spy('createView')
                .andCallFake(function (_a, renderFragmentCount) {
                var fragments = [];
                for (var i = 0; i < renderFragmentCount; i++) {
                    fragments.push(new api_1.RenderFragmentRef());
                }
                var rv = new api_1.RenderViewWithFragments(new api_1.RenderViewRef(), fragments);
                createdRenderViews.push(rv);
                return rv;
            });
            viewPool.spy('returnView').andReturn(true);
        });
        test_lib_1.describe('createRootHostView', function () {
            var hostProtoView;
            test_lib_1.beforeEach(function () { hostProtoView = view_manager_utils_spec_1.createHostPv([view_manager_utils_spec_1.createNestedElBinder(view_manager_utils_spec_1.createComponentPv())]); });
            test_lib_1.it('should initialize the ProtoView', function () {
                manager.createRootHostView(wrapPv(hostProtoView), null, null);
                test_lib_1.expect(linker.spy('initializeProtoViewIfNeeded')).toHaveBeenCalledWith(hostProtoView);
            });
            test_lib_1.it('should create the view', function () {
                var rootView = view_ref_1.internalView(manager.createRootHostView(wrapPv(hostProtoView), null, null));
                test_lib_1.expect(rootView.proto).toBe(hostProtoView);
                test_lib_1.expect(viewListener.spy('viewCreated')).toHaveBeenCalledWith(rootView);
            });
            test_lib_1.it('should hydrate the view', function () {
                var injector = core_1.Injector.resolveAndCreate([]);
                var rootView = view_ref_1.internalView(manager.createRootHostView(wrapPv(hostProtoView), null, injector));
                test_lib_1.expect(rootView.hydrated()).toBe(true);
                test_lib_1.expect(renderer.spy('hydrateView')).toHaveBeenCalledWith(rootView.render);
            });
            test_lib_1.it('should create and set the render view using the component selector', function () {
                var rootView = view_ref_1.internalView(manager.createRootHostView(wrapPv(hostProtoView), null, null));
                test_lib_1.expect(renderer.spy('createRootHostView'))
                    .toHaveBeenCalledWith(hostProtoView.render, hostProtoView.mergeInfo.embeddedViewCount + 1, 'someComponent');
                test_lib_1.expect(rootView.render).toBe(createdRenderViews[0].viewRef);
                test_lib_1.expect(rootView.renderFragment).toBe(createdRenderViews[0].fragmentRefs[0]);
            });
            test_lib_1.it('should allow to override the selector', function () {
                var selector = 'someOtherSelector';
                view_ref_1.internalView(manager.createRootHostView(wrapPv(hostProtoView), selector, null));
                test_lib_1.expect(renderer.spy('createRootHostView'))
                    .toHaveBeenCalledWith(hostProtoView.render, hostProtoView.mergeInfo.embeddedViewCount + 1, selector);
            });
            test_lib_1.it('should set the event dispatcher', function () {
                var rootView = view_ref_1.internalView(manager.createRootHostView(wrapPv(hostProtoView), null, null));
                test_lib_1.expect(renderer.spy('setEventDispatcher')).toHaveBeenCalledWith(rootView.render, rootView);
            });
        });
        test_lib_1.describe('destroyRootHostView', function () {
            var hostProtoView;
            var hostView;
            var hostRenderViewRef;
            test_lib_1.beforeEach(function () {
                hostProtoView = view_manager_utils_spec_1.createHostPv([view_manager_utils_spec_1.createNestedElBinder(view_manager_utils_spec_1.createComponentPv())]);
                hostView =
                    view_ref_1.internalView(manager.createRootHostView(wrapPv(hostProtoView), null, null));
                hostRenderViewRef = hostView.render;
            });
            test_lib_1.it('should dehydrate', function () {
                manager.destroyRootHostView(wrapView(hostView));
                test_lib_1.expect(hostView.hydrated()).toBe(false);
                test_lib_1.expect(renderer.spy('dehydrateView')).toHaveBeenCalledWith(hostView.render);
            });
            test_lib_1.it('should destroy the render view', function () {
                manager.destroyRootHostView(wrapView(hostView));
                test_lib_1.expect(renderer.spy('destroyView')).toHaveBeenCalledWith(hostRenderViewRef);
                test_lib_1.expect(viewListener.spy('viewDestroyed')).toHaveBeenCalledWith(hostView);
            });
            test_lib_1.it('should not return the view to the pool', function () {
                manager.destroyRootHostView(wrapView(hostView));
                test_lib_1.expect(viewPool.spy('returnView')).not.toHaveBeenCalled();
            });
        });
        test_lib_1.describe('createEmbeddedViewInContainer', function () {
            test_lib_1.describe('basic functionality', function () {
                var hostView;
                var childProtoView;
                var vcRef;
                var templateRef;
                test_lib_1.beforeEach(function () {
                    childProtoView = view_manager_utils_spec_1.createEmbeddedPv();
                    var hostProtoView = view_manager_utils_spec_1.createHostPv([view_manager_utils_spec_1.createNestedElBinder(view_manager_utils_spec_1.createComponentPv([view_manager_utils_spec_1.createNestedElBinder(childProtoView)]))]);
                    hostView =
                        view_ref_1.internalView(manager.createRootHostView(wrapPv(hostProtoView), null, null));
                    vcRef = hostView.elementRefs[1];
                    templateRef = new template_ref_1.TemplateRef(hostView.elementRefs[1]);
                    resetSpies();
                });
                test_lib_1.it('should initialize the ProtoView', function () {
                    manager.createEmbeddedViewInContainer(vcRef, 0, templateRef);
                    test_lib_1.expect(linker.spy('initializeProtoViewIfNeeded')).toHaveBeenCalledWith(childProtoView);
                });
                test_lib_1.describe('create the first view', function () {
                    test_lib_1.it('should create an AppViewContainer if not yet existing', function () {
                        manager.createEmbeddedViewInContainer(vcRef, 0, templateRef);
                        test_lib_1.expect(hostView.viewContainers[1]).toBeTruthy();
                    });
                    test_lib_1.it('should use an existing nested view', function () {
                        var childView = view_ref_1.internalView(manager.createEmbeddedViewInContainer(vcRef, 0, templateRef));
                        test_lib_1.expect(childView.proto).toBe(childProtoView);
                        test_lib_1.expect(childView).toBe(hostView.views[2]);
                        test_lib_1.expect(viewListener.spy('viewCreated')).not.toHaveBeenCalled();
                        test_lib_1.expect(renderer.spy('createView')).not.toHaveBeenCalled();
                    });
                    test_lib_1.it('should attach the fragment', function () {
                        var childView = view_ref_1.internalView(manager.createEmbeddedViewInContainer(vcRef, 0, templateRef));
                        test_lib_1.expect(childView.proto).toBe(childProtoView);
                        test_lib_1.expect(hostView.viewContainers[1].views.length).toBe(1);
                        test_lib_1.expect(hostView.viewContainers[1].views[0]).toBe(childView);
                        test_lib_1.expect(renderer.spy('attachFragmentAfterElement'))
                            .toHaveBeenCalledWith(vcRef, childView.renderFragment);
                    });
                    test_lib_1.it('should hydrate the view but not the render view', function () {
                        var childView = view_ref_1.internalView(manager.createEmbeddedViewInContainer(vcRef, 0, templateRef));
                        test_lib_1.expect(childView.hydrated()).toBe(true);
                        test_lib_1.expect(renderer.spy('hydrateView')).not.toHaveBeenCalled();
                    });
                    test_lib_1.it('should not set the EventDispatcher', function () {
                        view_ref_1.internalView(manager.createEmbeddedViewInContainer(vcRef, 0, templateRef));
                        test_lib_1.expect(renderer.spy('setEventDispatcher')).not.toHaveBeenCalled();
                    });
                });
                test_lib_1.describe('create the second view', function () {
                    var firstChildView;
                    test_lib_1.beforeEach(function () {
                        firstChildView =
                            view_ref_1.internalView(manager.createEmbeddedViewInContainer(vcRef, 0, templateRef));
                        resetSpies();
                    });
                    test_lib_1.it('should create a new view', function () {
                        var childView = view_ref_1.internalView(manager.createEmbeddedViewInContainer(vcRef, 1, templateRef));
                        test_lib_1.expect(childView.proto).toBe(childProtoView);
                        test_lib_1.expect(childView).not.toBe(firstChildView);
                        test_lib_1.expect(viewListener.spy('viewCreated')).toHaveBeenCalledWith(childView);
                        test_lib_1.expect(renderer.spy('createView'))
                            .toHaveBeenCalledWith(childProtoView.render, childProtoView.mergeInfo.embeddedViewCount + 1);
                        test_lib_1.expect(childView.render).toBe(createdRenderViews[1].viewRef);
                        test_lib_1.expect(childView.renderFragment).toBe(createdRenderViews[1].fragmentRefs[0]);
                    });
                    test_lib_1.it('should attach the fragment', function () {
                        var childView = view_ref_1.internalView(manager.createEmbeddedViewInContainer(vcRef, 1, templateRef));
                        test_lib_1.expect(childView.proto).toBe(childProtoView);
                        test_lib_1.expect(hostView.viewContainers[1].views[1]).toBe(childView);
                        test_lib_1.expect(renderer.spy('attachFragmentAfterFragment'))
                            .toHaveBeenCalledWith(firstChildView.renderFragment, childView.renderFragment);
                    });
                    test_lib_1.it('should hydrate the view', function () {
                        var childView = view_ref_1.internalView(manager.createEmbeddedViewInContainer(vcRef, 1, templateRef));
                        test_lib_1.expect(childView.hydrated()).toBe(true);
                        test_lib_1.expect(renderer.spy('hydrateView')).toHaveBeenCalledWith(childView.render);
                    });
                    test_lib_1.it('should set the EventDispatcher', function () {
                        var childView = view_ref_1.internalView(manager.createEmbeddedViewInContainer(vcRef, 1, templateRef));
                        test_lib_1.expect(renderer.spy('setEventDispatcher'))
                            .toHaveBeenCalledWith(childView.render, childView);
                    });
                });
                test_lib_1.describe('create another view when the first view has been returned', function () {
                    test_lib_1.beforeEach(function () {
                        view_ref_1.internalView(manager.createEmbeddedViewInContainer(vcRef, 0, templateRef));
                        manager.destroyViewInContainer(vcRef, 0);
                        resetSpies();
                    });
                    test_lib_1.it('should use an existing nested view', function () {
                        var childView = view_ref_1.internalView(manager.createEmbeddedViewInContainer(vcRef, 0, templateRef));
                        test_lib_1.expect(childView.proto).toBe(childProtoView);
                        test_lib_1.expect(childView).toBe(hostView.views[2]);
                        test_lib_1.expect(viewListener.spy('viewCreated')).not.toHaveBeenCalled();
                        test_lib_1.expect(renderer.spy('createView')).not.toHaveBeenCalled();
                    });
                });
                test_lib_1.describe('create a host view', function () {
                    test_lib_1.it('should initialize the ProtoView', function () {
                        var newHostPv = view_manager_utils_spec_1.createHostPv([view_manager_utils_spec_1.createNestedElBinder(view_manager_utils_spec_1.createComponentPv())]);
                        manager.createHostViewInContainer(vcRef, 0, wrapPv(newHostPv), null);
                        test_lib_1.expect(linker.spy('initializeProtoViewIfNeeded')).toHaveBeenCalledWith(newHostPv);
                    });
                    test_lib_1.it('should always create a new view and not use the embedded view', function () {
                        var newHostPv = view_manager_utils_spec_1.createHostPv([view_manager_utils_spec_1.createNestedElBinder(view_manager_utils_spec_1.createComponentPv())]);
                        var newHostView = view_ref_1.internalView(manager.createHostViewInContainer(vcRef, 0, wrapPv(newHostPv), null));
                        test_lib_1.expect(newHostView.proto).toBe(newHostPv);
                        test_lib_1.expect(newHostView).not.toBe(hostView.views[2]);
                        test_lib_1.expect(viewListener.spy('viewCreated')).toHaveBeenCalledWith(newHostView);
                        test_lib_1.expect(renderer.spy('createView'))
                            .toHaveBeenCalledWith(newHostPv.render, newHostPv.mergeInfo.embeddedViewCount + 1);
                    });
                });
            });
        });
        test_lib_1.describe('destroyViewInContainer', function () {
            test_lib_1.describe('basic functionality', function () {
                var hostView;
                var childProtoView;
                var vcRef;
                var templateRef;
                var firstChildView;
                test_lib_1.beforeEach(function () {
                    childProtoView = view_manager_utils_spec_1.createEmbeddedPv();
                    var hostProtoView = view_manager_utils_spec_1.createHostPv([view_manager_utils_spec_1.createNestedElBinder(view_manager_utils_spec_1.createComponentPv([view_manager_utils_spec_1.createNestedElBinder(childProtoView)]))]);
                    hostView =
                        view_ref_1.internalView(manager.createRootHostView(wrapPv(hostProtoView), null, null));
                    vcRef = hostView.elementRefs[1];
                    templateRef = new template_ref_1.TemplateRef(hostView.elementRefs[1]);
                    firstChildView =
                        view_ref_1.internalView(manager.createEmbeddedViewInContainer(vcRef, 0, templateRef));
                    resetSpies();
                });
                test_lib_1.describe('destroy the first view', function () {
                    test_lib_1.it('should dehydrate the app view but not the render view', function () {
                        manager.destroyViewInContainer(vcRef, 0);
                        test_lib_1.expect(firstChildView.hydrated()).toBe(false);
                        test_lib_1.expect(renderer.spy('dehydrateView')).not.toHaveBeenCalled();
                    });
                    test_lib_1.it('should detach', function () {
                        manager.destroyViewInContainer(vcRef, 0);
                        test_lib_1.expect(hostView.viewContainers[1].views).toEqual([]);
                        test_lib_1.expect(renderer.spy('detachFragment'))
                            .toHaveBeenCalledWith(firstChildView.renderFragment);
                    });
                    test_lib_1.it('should not return the view to the pool', function () {
                        manager.destroyViewInContainer(vcRef, 0);
                        test_lib_1.expect(viewPool.spy('returnView')).not.toHaveBeenCalled();
                    });
                });
                test_lib_1.describe('destroy another view', function () {
                    var secondChildView;
                    test_lib_1.beforeEach(function () {
                        secondChildView =
                            view_ref_1.internalView(manager.createEmbeddedViewInContainer(vcRef, 1, templateRef));
                        resetSpies();
                    });
                    test_lib_1.it('should dehydrate', function () {
                        manager.destroyViewInContainer(vcRef, 1);
                        test_lib_1.expect(secondChildView.hydrated()).toBe(false);
                        test_lib_1.expect(renderer.spy('dehydrateView')).toHaveBeenCalledWith(secondChildView.render);
                    });
                    test_lib_1.it('should detach', function () {
                        manager.destroyViewInContainer(vcRef, 1);
                        test_lib_1.expect(hostView.viewContainers[1].views[0]).toBe(firstChildView);
                        test_lib_1.expect(renderer.spy('detachFragment'))
                            .toHaveBeenCalledWith(secondChildView.renderFragment);
                    });
                    test_lib_1.it('should return the view to the pool', function () {
                        manager.destroyViewInContainer(vcRef, 1);
                        test_lib_1.expect(viewPool.spy('returnView')).toHaveBeenCalledWith(secondChildView);
                    });
                });
            });
            test_lib_1.describe('recursively destroy views in ViewContainers', function () {
                test_lib_1.describe('destroy child views when a component is destroyed', function () {
                    var hostView;
                    var childProtoView;
                    var vcRef;
                    var templateRef;
                    var firstChildView;
                    var secondChildView;
                    test_lib_1.beforeEach(function () {
                        childProtoView = view_manager_utils_spec_1.createEmbeddedPv();
                        var hostProtoView = view_manager_utils_spec_1.createHostPv([view_manager_utils_spec_1.createNestedElBinder(view_manager_utils_spec_1.createComponentPv([view_manager_utils_spec_1.createNestedElBinder(childProtoView)]))]);
                        hostView = view_ref_1.internalView(manager.createRootHostView(wrapPv(hostProtoView), null, null));
                        vcRef = hostView.elementRefs[1];
                        templateRef = new template_ref_1.TemplateRef(hostView.elementRefs[1]);
                        firstChildView =
                            view_ref_1.internalView(manager.createEmbeddedViewInContainer(vcRef, 0, templateRef));
                        secondChildView =
                            view_ref_1.internalView(manager.createEmbeddedViewInContainer(vcRef, 1, templateRef));
                        resetSpies();
                    });
                    test_lib_1.it('should dehydrate', function () {
                        manager.destroyRootHostView(wrapView(hostView));
                        test_lib_1.expect(firstChildView.hydrated()).toBe(false);
                        test_lib_1.expect(secondChildView.hydrated()).toBe(false);
                        test_lib_1.expect(renderer.spy('dehydrateView')).toHaveBeenCalledWith(hostView.render);
                        test_lib_1.expect(renderer.spy('dehydrateView')).toHaveBeenCalledWith(secondChildView.render);
                    });
                    test_lib_1.it('should detach', function () {
                        manager.destroyRootHostView(wrapView(hostView));
                        test_lib_1.expect(hostView.viewContainers[1].views).toEqual([]);
                        test_lib_1.expect(renderer.spy('detachFragment'))
                            .toHaveBeenCalledWith(firstChildView.renderFragment);
                        test_lib_1.expect(renderer.spy('detachFragment'))
                            .toHaveBeenCalledWith(secondChildView.renderFragment);
                    });
                    test_lib_1.it('should return the view to the pool', function () {
                        manager.destroyRootHostView(wrapView(hostView));
                        test_lib_1.expect(viewPool.spy('returnView')).not.toHaveBeenCalledWith(firstChildView);
                        test_lib_1.expect(viewPool.spy('returnView')).toHaveBeenCalledWith(secondChildView);
                    });
                });
                test_lib_1.describe('destroy child views over multiple levels', function () {
                    var hostView;
                    var childProtoView;
                    var nestedChildProtoView;
                    var vcRef;
                    var templateRef;
                    var nestedVcRefs;
                    var childViews;
                    var nestedChildViews;
                    test_lib_1.beforeEach(function () {
                        nestedChildProtoView = view_manager_utils_spec_1.createEmbeddedPv();
                        childProtoView = view_manager_utils_spec_1.createEmbeddedPv([
                            view_manager_utils_spec_1.createNestedElBinder(view_manager_utils_spec_1.createComponentPv([view_manager_utils_spec_1.createNestedElBinder(nestedChildProtoView)]))
                        ]);
                        var hostProtoView = view_manager_utils_spec_1.createHostPv([view_manager_utils_spec_1.createNestedElBinder(view_manager_utils_spec_1.createComponentPv([view_manager_utils_spec_1.createNestedElBinder(childProtoView)]))]);
                        hostView = view_ref_1.internalView(manager.createRootHostView(wrapPv(hostProtoView), null, null));
                        vcRef = hostView.elementRefs[1];
                        templateRef = new template_ref_1.TemplateRef(hostView.elementRefs[1]);
                        nestedChildViews = [];
                        childViews = [];
                        nestedVcRefs = [];
                        for (var i = 0; i < 2; i++) {
                            var view = view_ref_1.internalView(manager.createEmbeddedViewInContainer(vcRef, i, templateRef));
                            childViews.push(view);
                            var nestedVcRef = view.elementRefs[view.elementOffset];
                            nestedVcRefs.push(nestedVcRef);
                            for (var j = 0; j < 2; j++) {
                                var nestedView = view_ref_1.internalView(manager.createEmbeddedViewInContainer(nestedVcRef, j, templateRef));
                                nestedChildViews.push(nestedView);
                            }
                        }
                        resetSpies();
                    });
                    test_lib_1.it('should dehydrate all child views', function () {
                        manager.destroyRootHostView(wrapView(hostView));
                        childViews.forEach(function (childView) { return test_lib_1.expect(childView.hydrated()).toBe(false); });
                        nestedChildViews.forEach(function (childView) { return test_lib_1.expect(childView.hydrated()).toBe(false); });
                    });
                });
            });
        });
        test_lib_1.describe('attachViewInContainer', function () {
        });
        test_lib_1.describe('detachViewInContainer', function () {
        });
    });
}
exports.main = main;
//# sourceMappingURL=view_manager_spec.js.map