import { AnimationBuilder } from 'angular2/src/animate/animation_builder';
import { EventManager } from './events/event_manager';
import { DomSharedStylesHost } from './shared_styles_host';
import { WtfScopeFn } from '../../profile/profile';
import { Renderer, RenderProtoViewRef, RenderViewRef, RenderElementRef, RenderFragmentRef, RenderViewWithFragments, RenderTemplateCmd, RenderEventDispatcher } from '../api';
import { NodeFactory } from '../view_factory';
export declare class DomRenderer implements Renderer, NodeFactory<Node> {
    private _eventManager;
    private _domSharedStylesHost;
    private _animate;
    private _componentCmds;
    private _document;
    /**
     * @private
     */
    constructor(_eventManager: EventManager, _domSharedStylesHost: DomSharedStylesHost, _animate: AnimationBuilder, document: any);
    registerComponentTemplate(templateId: number, commands: RenderTemplateCmd[], styles: string[]): void;
    resolveComponentTemplate(templateId: number): RenderTemplateCmd[];
    createProtoView(cmds: RenderTemplateCmd[]): RenderProtoViewRef;
    _createRootHostViewScope: WtfScopeFn;
    createRootHostView(hostProtoViewRef: RenderProtoViewRef, fragmentCount: number, hostElementSelector: string): RenderViewWithFragments;
    _createViewScope: WtfScopeFn;
    createView(protoViewRef: RenderProtoViewRef, fragmentCount: number): RenderViewWithFragments;
    private _createView(protoViewRef, inplaceElement);
    destroyView(viewRef: RenderViewRef): void;
    getNativeElementSync(location: RenderElementRef): any;
    getRootNodes(fragment: RenderFragmentRef): Node[];
    attachFragmentAfterFragment(previousFragmentRef: RenderFragmentRef, fragmentRef: RenderFragmentRef): void;
    /**
     * Iterates through all nodes being added to the DOM and animates them if necessary
     * @param nodes
     */
    animateNodesEnter(nodes: Node[]): void;
    /**
     * Performs animations if necessary
     * @param node
     */
    animateNodeEnter(node: Node): void;
    /**
     * If animations are necessary, performs animations then removes the element; otherwise, it just
     * removes the element.
     * @param node
     */
    animateNodeLeave(node: Node): void;
    attachFragmentAfterElement(elementRef: RenderElementRef, fragmentRef: RenderFragmentRef): void;
    _detachFragmentScope: WtfScopeFn;
    detachFragment(fragmentRef: RenderFragmentRef): void;
    hydrateView(viewRef: RenderViewRef): void;
    dehydrateView(viewRef: RenderViewRef): void;
    createTemplateAnchor(attrNameAndValues: string[]): Node;
    createElement(name: string, attrNameAndValues: string[]): Node;
    mergeElement(existing: Node, attrNameAndValues: string[]): void;
    private _setAttributes(node, attrNameAndValues);
    createShadowRoot(host: Node): Node;
    createText(value: string): Node;
    appendChild(parent: Node, child: Node): void;
    on(element: Node, eventName: string, callback: Function): void;
    globalOn(target: string, eventName: string, callback: Function): Function;
    setElementProperty(location: RenderElementRef, propertyName: string, propertyValue: any): void;
    setElementAttribute(location: RenderElementRef, attributeName: string, attributeValue: string): void;
    setElementClass(location: RenderElementRef, className: string, isAdd: boolean): void;
    setElementStyle(location: RenderElementRef, styleName: string, styleValue: string): void;
    invokeElementMethod(location: RenderElementRef, methodName: string, args: any[]): void;
    setText(viewRef: RenderViewRef, textNodeIndex: number, text: string): void;
    setEventDispatcher(viewRef: RenderViewRef, dispatcher: RenderEventDispatcher): void;
}
