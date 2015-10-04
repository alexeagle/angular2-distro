var lang_1 = require('angular2/src/core/facade/lang');
var view_1 = require('./view');
function createRenderView(fragmentCmds, inplaceElement, nodeFactory) {
    var builders = [];
    visitAll(new RenderViewBuilder(null, null, inplaceElement, builders, nodeFactory), fragmentCmds);
    var boundElements = [];
    var boundTextNodes = [];
    var nativeShadowRoots = [];
    var fragments = [];
    var viewElementOffset = 0;
    var view;
    var eventDispatcher = function (boundElementIndex, eventName, event) {
        return view.dispatchRenderEvent(boundElementIndex, eventName, event);
    };
    var globalEventAdders = [];
    for (var i = 0; i < builders.length; i++) {
        var builder = builders[i];
        addAll(builder.boundElements, boundElements);
        addAll(builder.boundTextNodes, boundTextNodes);
        addAll(builder.nativeShadowRoots, nativeShadowRoots);
        if (lang_1.isBlank(builder.rootNodesParent)) {
            fragments.push(new view_1.DefaultRenderFragmentRef(builder.fragmentRootNodes));
        }
        for (var j = 0; j < builder.eventData.length; j++) {
            var eventData = builder.eventData[j];
            var boundElementIndex = eventData[0] + viewElementOffset;
            var target = eventData[1];
            var eventName = eventData[2];
            if (lang_1.isPresent(target)) {
                var handler = createEventHandler(boundElementIndex, target + ":" + eventName, eventDispatcher);
                globalEventAdders.push(createGlobalEventAdder(target, eventName, handler, nodeFactory));
            }
            else {
                var handler = createEventHandler(boundElementIndex, eventName, eventDispatcher);
                nodeFactory.on(boundElements[boundElementIndex], eventName, handler);
            }
        }
        viewElementOffset += builder.boundElements.length;
    }
    view = new view_1.DefaultRenderView(fragments, boundTextNodes, boundElements, nativeShadowRoots, globalEventAdders);
    return view;
}
exports.createRenderView = createRenderView;
function createEventHandler(boundElementIndex, eventName, eventDispatcher) {
    return function ($event) { return eventDispatcher(boundElementIndex, eventName, $event); };
}
function createGlobalEventAdder(target, eventName, eventHandler, nodeFactory) {
    return function () { return nodeFactory.globalOn(target, eventName, eventHandler); };
}
var RenderViewBuilder = (function () {
    function RenderViewBuilder(parentComponent, rootNodesParent, inplaceElement, allBuilders, factory) {
        this.parentComponent = parentComponent;
        this.rootNodesParent = rootNodesParent;
        this.inplaceElement = inplaceElement;
        this.allBuilders = allBuilders;
        this.factory = factory;
        this.boundTextNodes = [];
        this.boundElements = [];
        this.eventData = [];
        this.fragmentRootNodes = [];
        this.nativeShadowRoots = [];
        this.parentStack = [rootNodesParent];
        allBuilders.push(this);
    }
    Object.defineProperty(RenderViewBuilder.prototype, "parent", {
        get: function () { return this.parentStack[this.parentStack.length - 1]; },
        enumerable: true,
        configurable: true
    });
    RenderViewBuilder.prototype.visitText = function (cmd, context) {
        var text = this.factory.createText(cmd.value);
        this._addChild(text, cmd.ngContentIndex);
        if (cmd.isBound) {
            this.boundTextNodes.push(text);
        }
        return null;
    };
    RenderViewBuilder.prototype.visitNgContent = function (cmd, context) {
        if (lang_1.isPresent(this.parentComponent)) {
            var projectedNodes = this.parentComponent.project();
            for (var i = 0; i < projectedNodes.length; i++) {
                var node = projectedNodes[i];
                this._addChild(node, cmd.ngContentIndex);
            }
        }
        return null;
    };
    RenderViewBuilder.prototype.visitBeginElement = function (cmd, context) {
        this.parentStack.push(this._beginElement(cmd));
        return null;
    };
    RenderViewBuilder.prototype.visitEndElement = function (context) {
        this._endElement();
        return null;
    };
    RenderViewBuilder.prototype.visitBeginComponent = function (cmd, context) {
        var el = this._beginElement(cmd);
        var root = el;
        if (cmd.nativeShadow) {
            root = this.factory.createShadowRoot(el);
            this.nativeShadowRoots.push(root);
        }
        this.parentStack.push(new Component(el, root, cmd, this.factory));
        return null;
    };
    RenderViewBuilder.prototype.visitEndComponent = function (context) {
        var c = this.parent;
        var template = this.factory.resolveComponentTemplate(c.cmd.templateId);
        this._visitChildTemplate(template, c, c.shadowRoot);
        this._endElement();
        return null;
    };
    RenderViewBuilder.prototype.visitEmbeddedTemplate = function (cmd, context) {
        var el = this.factory.createTemplateAnchor(cmd.attrNameAndValues);
        this._addChild(el, cmd.ngContentIndex);
        this.boundElements.push(el);
        if (cmd.isMerged) {
            this._visitChildTemplate(cmd.children, this.parentComponent, null);
        }
        return null;
    };
    RenderViewBuilder.prototype._beginElement = function (cmd) {
        var el;
        if (lang_1.isPresent(this.inplaceElement)) {
            el = this.inplaceElement;
            this.inplaceElement = null;
            this.factory.mergeElement(el, cmd.attrNameAndValues);
            this.fragmentRootNodes.push(el);
        }
        else {
            el = this.factory.createElement(cmd.name, cmd.attrNameAndValues);
            this._addChild(el, cmd.ngContentIndex);
        }
        if (cmd.isBound) {
            this.boundElements.push(el);
            for (var i = 0; i < cmd.eventTargetAndNames.length; i += 2) {
                var target = cmd.eventTargetAndNames[i];
                var eventName = cmd.eventTargetAndNames[i + 1];
                this.eventData.push([this.boundElements.length - 1, target, eventName]);
            }
        }
        return el;
    };
    RenderViewBuilder.prototype._endElement = function () { this.parentStack.pop(); };
    RenderViewBuilder.prototype._visitChildTemplate = function (cmds, parent, rootNodesParent) {
        visitAll(new RenderViewBuilder(parent, rootNodesParent, null, this.allBuilders, this.factory), cmds);
    };
    RenderViewBuilder.prototype._addChild = function (node, ngContentIndex) {
        var parent = this.parent;
        if (lang_1.isPresent(parent)) {
            if (parent instanceof Component) {
                parent.addContentNode(ngContentIndex, node);
            }
            else {
                this.factory.appendChild(parent, node);
            }
        }
        else {
            this.fragmentRootNodes.push(node);
        }
    };
    return RenderViewBuilder;
})();
var Component = (function () {
    function Component(hostElement, shadowRoot, cmd, factory) {
        this.hostElement = hostElement;
        this.shadowRoot = shadowRoot;
        this.cmd = cmd;
        this.factory = factory;
        this.contentNodesByNgContentIndex = [];
        this.projectingNgContentIndex = 0;
    }
    Component.prototype.addContentNode = function (ngContentIndex, node) {
        if (lang_1.isBlank(ngContentIndex)) {
            if (this.cmd.nativeShadow) {
                this.factory.appendChild(this.hostElement, node);
            }
        }
        else {
            while (this.contentNodesByNgContentIndex.length <= ngContentIndex) {
                this.contentNodesByNgContentIndex.push([]);
            }
            this.contentNodesByNgContentIndex[ngContentIndex].push(node);
        }
    };
    Component.prototype.project = function () {
        var ngContentIndex = this.projectingNgContentIndex++;
        return ngContentIndex < this.contentNodesByNgContentIndex.length ?
            this.contentNodesByNgContentIndex[ngContentIndex] :
            [];
    };
    return Component;
})();
function addAll(source, target) {
    for (var i = 0; i < source.length; i++) {
        target.push(source[i]);
    }
}
function visitAll(visitor, fragmentCmds) {
    for (var i = 0; i < fragmentCmds.length; i++) {
        fragmentCmds[i].visit(visitor, null);
    }
}
//# sourceMappingURL=view_factory.js.map