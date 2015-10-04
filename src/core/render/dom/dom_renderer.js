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
var di_1 = require('angular2/src/core/di');
var animation_builder_1 = require('angular2/src/animate/animation_builder');
var lang_1 = require('angular2/src/core/facade/lang');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
var event_manager_1 = require('./events/event_manager');
var shared_styles_host_1 = require('./shared_styles_host');
var profile_1 = require('../../profile/profile');
var api_1 = require('../api');
var dom_tokens_1 = require('./dom_tokens');
var view_factory_1 = require('../view_factory');
var view_1 = require('../view');
var util_1 = require('./util');
var DomRenderer = (function () {
    /**
     * @private
     */
    function DomRenderer(_eventManager, _domSharedStylesHost, _animate, document) {
        this._eventManager = _eventManager;
        this._domSharedStylesHost = _domSharedStylesHost;
        this._animate = _animate;
        this._componentCmds = new Map();
        this._createRootHostViewScope = profile_1.wtfCreateScope('DomRenderer#createRootHostView()');
        this._createViewScope = profile_1.wtfCreateScope('DomRenderer#createView()');
        this._detachFragmentScope = profile_1.wtfCreateScope('DomRenderer#detachFragment()');
        this._document = document;
    }
    DomRenderer.prototype.registerComponentTemplate = function (templateId, commands, styles) {
        this._componentCmds.set(templateId, commands);
        this._domSharedStylesHost.addStyles(styles);
    };
    DomRenderer.prototype.resolveComponentTemplate = function (templateId) {
        return this._componentCmds.get(templateId);
    };
    DomRenderer.prototype.createProtoView = function (cmds) {
        return new view_1.DefaultProtoViewRef(cmds);
    };
    DomRenderer.prototype.createRootHostView = function (hostProtoViewRef, fragmentCount, hostElementSelector) {
        var s = this._createRootHostViewScope();
        var element = dom_adapter_1.DOM.querySelector(this._document, hostElementSelector);
        if (lang_1.isBlank(element)) {
            profile_1.wtfLeave(s);
            throw new exceptions_1.BaseException("The selector \"" + hostElementSelector + "\" did not match any elements");
        }
        return profile_1.wtfLeave(s, this._createView(hostProtoViewRef, element));
    };
    DomRenderer.prototype.createView = function (protoViewRef, fragmentCount) {
        var s = this._createViewScope();
        return profile_1.wtfLeave(s, this._createView(protoViewRef, null));
    };
    DomRenderer.prototype._createView = function (protoViewRef, inplaceElement) {
        var view = view_factory_1.createRenderView(protoViewRef.cmds, inplaceElement, this);
        var sdRoots = view.nativeShadowRoots;
        for (var i = 0; i < sdRoots.length; i++) {
            this._domSharedStylesHost.addHost(sdRoots[i]);
        }
        return new api_1.RenderViewWithFragments(view, view.fragments);
    };
    DomRenderer.prototype.destroyView = function (viewRef) {
        var view = viewRef;
        var sdRoots = view.nativeShadowRoots;
        for (var i = 0; i < sdRoots.length; i++) {
            this._domSharedStylesHost.removeHost(sdRoots[i]);
        }
    };
    DomRenderer.prototype.getNativeElementSync = function (location) {
        return resolveInternalDomView(location.renderView).boundElements[location.boundElementIndex];
    };
    DomRenderer.prototype.getRootNodes = function (fragment) { return resolveInternalDomFragment(fragment); };
    DomRenderer.prototype.attachFragmentAfterFragment = function (previousFragmentRef, fragmentRef) {
        var previousFragmentNodes = resolveInternalDomFragment(previousFragmentRef);
        if (previousFragmentNodes.length > 0) {
            var sibling = previousFragmentNodes[previousFragmentNodes.length - 1];
            var nodes = resolveInternalDomFragment(fragmentRef);
            moveNodesAfterSibling(sibling, nodes);
            this.animateNodesEnter(nodes);
        }
    };
    /**
     * Iterates through all nodes being added to the DOM and animates them if necessary
     * @param nodes
     */
    DomRenderer.prototype.animateNodesEnter = function (nodes) {
        for (var i = 0; i < nodes.length; i++)
            this.animateNodeEnter(nodes[i]);
    };
    /**
     * Performs animations if necessary
     * @param node
     */
    DomRenderer.prototype.animateNodeEnter = function (node) {
        if (dom_adapter_1.DOM.isElementNode(node) && dom_adapter_1.DOM.hasClass(node, 'ng-animate')) {
            dom_adapter_1.DOM.addClass(node, 'ng-enter');
            this._animate.css()
                .addAnimationClass('ng-enter-active')
                .start(node)
                .onComplete(function () { dom_adapter_1.DOM.removeClass(node, 'ng-enter'); });
        }
    };
    /**
     * If animations are necessary, performs animations then removes the element; otherwise, it just
     * removes the element.
     * @param node
     */
    DomRenderer.prototype.animateNodeLeave = function (node) {
        if (dom_adapter_1.DOM.isElementNode(node) && dom_adapter_1.DOM.hasClass(node, 'ng-animate')) {
            dom_adapter_1.DOM.addClass(node, 'ng-leave');
            this._animate.css()
                .addAnimationClass('ng-leave-active')
                .start(node)
                .onComplete(function () {
                dom_adapter_1.DOM.removeClass(node, 'ng-leave');
                dom_adapter_1.DOM.remove(node);
            });
        }
        else {
            dom_adapter_1.DOM.remove(node);
        }
    };
    DomRenderer.prototype.attachFragmentAfterElement = function (elementRef, fragmentRef) {
        var parentView = resolveInternalDomView(elementRef.renderView);
        var element = parentView.boundElements[elementRef.boundElementIndex];
        var nodes = resolveInternalDomFragment(fragmentRef);
        moveNodesAfterSibling(element, nodes);
        this.animateNodesEnter(nodes);
    };
    DomRenderer.prototype.detachFragment = function (fragmentRef) {
        var s = this._detachFragmentScope();
        var fragmentNodes = resolveInternalDomFragment(fragmentRef);
        for (var i = 0; i < fragmentNodes.length; i++) {
            this.animateNodeLeave(fragmentNodes[i]);
        }
        profile_1.wtfLeave(s);
    };
    DomRenderer.prototype.hydrateView = function (viewRef) { resolveInternalDomView(viewRef).hydrate(); };
    DomRenderer.prototype.dehydrateView = function (viewRef) { resolveInternalDomView(viewRef).dehydrate(); };
    DomRenderer.prototype.createTemplateAnchor = function (attrNameAndValues) {
        return this.createElement('script', attrNameAndValues);
    };
    DomRenderer.prototype.createElement = function (name, attrNameAndValues) {
        var el = dom_adapter_1.DOM.createElement(name);
        this._setAttributes(el, attrNameAndValues);
        return el;
    };
    DomRenderer.prototype.mergeElement = function (existing, attrNameAndValues) {
        dom_adapter_1.DOM.clearNodes(existing);
        this._setAttributes(existing, attrNameAndValues);
    };
    DomRenderer.prototype._setAttributes = function (node, attrNameAndValues) {
        for (var attrIdx = 0; attrIdx < attrNameAndValues.length; attrIdx += 2) {
            dom_adapter_1.DOM.setAttribute(node, attrNameAndValues[attrIdx], attrNameAndValues[attrIdx + 1]);
        }
    };
    DomRenderer.prototype.createShadowRoot = function (host) { return dom_adapter_1.DOM.createShadowRoot(host); };
    DomRenderer.prototype.createText = function (value) { return dom_adapter_1.DOM.createTextNode(lang_1.isPresent(value) ? value : ''); };
    DomRenderer.prototype.appendChild = function (parent, child) { dom_adapter_1.DOM.appendChild(parent, child); };
    DomRenderer.prototype.on = function (element, eventName, callback) {
        this._eventManager.addEventListener(element, eventName, decoratePreventDefault(callback));
    };
    DomRenderer.prototype.globalOn = function (target, eventName, callback) {
        return this._eventManager.addGlobalEventListener(target, eventName, decoratePreventDefault(callback));
    };
    DomRenderer.prototype.setElementProperty = function (location, propertyName, propertyValue) {
        var view = resolveInternalDomView(location.renderView);
        dom_adapter_1.DOM.setProperty(view.boundElements[location.boundElementIndex], propertyName, propertyValue);
    };
    DomRenderer.prototype.setElementAttribute = function (location, attributeName, attributeValue) {
        var view = resolveInternalDomView(location.renderView);
        var element = view.boundElements[location.boundElementIndex];
        var dashCasedAttributeName = util_1.camelCaseToDashCase(attributeName);
        if (lang_1.isPresent(attributeValue)) {
            dom_adapter_1.DOM.setAttribute(element, dashCasedAttributeName, lang_1.stringify(attributeValue));
        }
        else {
            dom_adapter_1.DOM.removeAttribute(element, dashCasedAttributeName);
        }
    };
    DomRenderer.prototype.setElementClass = function (location, className, isAdd) {
        var view = resolveInternalDomView(location.renderView);
        var element = view.boundElements[location.boundElementIndex];
        if (isAdd) {
            dom_adapter_1.DOM.addClass(element, className);
        }
        else {
            dom_adapter_1.DOM.removeClass(element, className);
        }
    };
    DomRenderer.prototype.setElementStyle = function (location, styleName, styleValue) {
        var view = resolveInternalDomView(location.renderView);
        var element = view.boundElements[location.boundElementIndex];
        var dashCasedStyleName = util_1.camelCaseToDashCase(styleName);
        if (lang_1.isPresent(styleValue)) {
            dom_adapter_1.DOM.setStyle(element, dashCasedStyleName, lang_1.stringify(styleValue));
        }
        else {
            dom_adapter_1.DOM.removeStyle(element, dashCasedStyleName);
        }
    };
    DomRenderer.prototype.invokeElementMethod = function (location, methodName, args) {
        var view = resolveInternalDomView(location.renderView);
        var element = view.boundElements[location.boundElementIndex];
        dom_adapter_1.DOM.invoke(element, methodName, args);
    };
    DomRenderer.prototype.setText = function (viewRef, textNodeIndex, text) {
        var view = resolveInternalDomView(viewRef);
        dom_adapter_1.DOM.setText(view.boundTextNodes[textNodeIndex], text);
    };
    DomRenderer.prototype.setEventDispatcher = function (viewRef, dispatcher) {
        resolveInternalDomView(viewRef).setEventDispatcher(dispatcher);
    };
    DomRenderer = __decorate([
        di_1.Injectable(),
        __param(3, di_1.Inject(dom_tokens_1.DOCUMENT)), 
        __metadata('design:paramtypes', [event_manager_1.EventManager, shared_styles_host_1.DomSharedStylesHost, animation_builder_1.AnimationBuilder, Object])
    ], DomRenderer);
    return DomRenderer;
})();
exports.DomRenderer = DomRenderer;
function resolveInternalDomView(viewRef) {
    return viewRef;
}
function resolveInternalDomFragment(fragmentRef) {
    return fragmentRef.nodes;
}
function moveNodesAfterSibling(sibling, nodes) {
    if (nodes.length > 0 && lang_1.isPresent(dom_adapter_1.DOM.parentElement(sibling))) {
        for (var i = 0; i < nodes.length; i++) {
            dom_adapter_1.DOM.insertBefore(sibling, nodes[i]);
        }
        dom_adapter_1.DOM.insertBefore(nodes[0], sibling);
    }
}
function moveChildNodes(source, target) {
    var currChild = dom_adapter_1.DOM.firstChild(source);
    while (lang_1.isPresent(currChild)) {
        var nextChild = dom_adapter_1.DOM.nextSibling(currChild);
        dom_adapter_1.DOM.appendChild(target, currChild);
        currChild = nextChild;
    }
}
function decoratePreventDefault(eventHandler) {
    return function (event) {
        var allowDefaultBehavior = eventHandler(event);
        if (!allowDefaultBehavior) {
            // TODO(tbosch): move preventDefault into event plugins...
            dom_adapter_1.DOM.preventDefault(event);
        }
    };
}
//# sourceMappingURL=dom_renderer.js.map