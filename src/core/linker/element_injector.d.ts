import { Type } from 'angular2/src/core/facade/lang';
import { Injector, Key, Dependency, Binding, ResolvedBinding } from 'angular2/src/core/di';
import { ProtoInjector, BindingWithVisibility, DependencyProvider } from 'angular2/src/core/di/injector';
import { ResolvedBinding_ } from 'angular2/src/core/di/binding';
import { QueryMetadata } from '../metadata/di';
import * as viewModule from './view';
import * as avmModule from './view_manager';
import { ViewContainerRef } from './view_container_ref';
import { ElementRef } from './element_ref';
import { TemplateRef } from './template_ref';
import { DirectiveMetadata } from '../metadata/directives';
import { QueryList } from './query_list';
import { SetterFn } from 'angular2/src/core/reflection/types';
export declare class StaticKeys {
    viewManagerId: number;
    templateRefId: number;
    viewContainerId: number;
    changeDetectorRefId: number;
    elementRefId: number;
    constructor();
    static instance(): StaticKeys;
}
export declare class TreeNode<T extends TreeNode<any>> {
    _parent: T;
    constructor(parent: T);
    addChild(child: T): void;
    remove(): void;
    parent: T;
}
export declare class DirectiveDependency extends Dependency {
    attributeName: string;
    queryDecorator: QueryMetadata;
    constructor(key: Key, optional: boolean, lowerBoundVisibility: Object, upperBoundVisibility: Object, properties: any[], attributeName: string, queryDecorator: QueryMetadata);
    _verify(): void;
    static createFrom(d: Dependency): Dependency;
    static _attributeName(properties: any): string;
    static _query(properties: any): QueryMetadata;
}
export declare class DirectiveBinding extends ResolvedBinding_ {
    metadata: DirectiveMetadata;
    bindings: Array<Type | Binding | any[]>;
    viewBindings: Array<Type | Binding | any[]>;
    callOnDestroy: boolean;
    constructor(key: Key, factory: Function, deps: Dependency[], metadata: DirectiveMetadata, bindings: Array<Type | Binding | any[]>, viewBindings: Array<Type | Binding | any[]>);
    displayName: string;
    queries: QueryMetadataWithSetter[];
    eventEmitters: string[];
    static createFromBinding(binding: Binding, meta: DirectiveMetadata): DirectiveBinding;
    static createFromType(type: Type, annotation: DirectiveMetadata): DirectiveBinding;
}
export declare class PreBuiltObjects {
    viewManager: avmModule.AppViewManager;
    view: viewModule.AppView;
    elementRef: ElementRef;
    templateRef: TemplateRef;
    nestedView: viewModule.AppView;
    constructor(viewManager: avmModule.AppViewManager, view: viewModule.AppView, elementRef: ElementRef, templateRef: TemplateRef);
}
export declare class QueryMetadataWithSetter {
    setter: SetterFn;
    metadata: QueryMetadata;
    constructor(setter: SetterFn, metadata: QueryMetadata);
}
export declare class EventEmitterAccessor {
    eventName: string;
    getter: Function;
    constructor(eventName: string, getter: Function);
    subscribe(view: viewModule.AppView, boundElementIndex: number, directive: Object): Object;
}
export declare class ProtoElementInjector {
    parent: ProtoElementInjector;
    index: number;
    distanceToParent: number;
    _firstBindingIsComponent: boolean;
    directiveVariableBindings: Map<string, number>;
    view: viewModule.AppView;
    attributes: Map<string, string>;
    eventEmitterAccessors: EventEmitterAccessor[][];
    protoQueryRefs: ProtoQueryRef[];
    protoInjector: ProtoInjector;
    static create(parent: ProtoElementInjector, index: number, bindings: DirectiveBinding[], firstBindingIsComponent: boolean, distanceToParent: number, directiveVariableBindings: Map<string, number>): ProtoElementInjector;
    private static _createDirectiveBindingWithVisibility(dirBindings, bd, firstBindingIsComponent);
    private static _createBindingsWithVisibility(dirBindings, bd);
    private static _createBindingWithVisibility(firstBindingIsComponent, dirBinding, dirBindings, binding);
    private static _createViewBindingsWithVisibility(dirBindings, bd);
    constructor(parent: ProtoElementInjector, index: number, bwv: BindingWithVisibility[], distanceToParent: number, _firstBindingIsComponent: boolean, directiveVariableBindings: Map<string, number>);
    instantiate(parent: ElementInjector): ElementInjector;
    directParent(): ProtoElementInjector;
    hasBindings: boolean;
    getBindingAtIndex(index: number): any;
}
export declare class ElementInjector extends TreeNode<ElementInjector> implements DependencyProvider {
    _proto: ProtoElementInjector;
    private _host;
    private _preBuiltObjects;
    private _queryStrategy;
    hydrated: boolean;
    private _injector;
    private _strategy;
    constructor(_proto: ProtoElementInjector, parent: ElementInjector);
    dehydrate(): void;
    hydrate(imperativelyCreatedInjector: Injector, host: ElementInjector, preBuiltObjects: PreBuiltObjects): void;
    private _debugContext();
    private _reattachInjectors(imperativelyCreatedInjector);
    private _reattachInjector(injector, parentInjector, isBoundary);
    hasVariableBinding(name: string): boolean;
    getVariableBinding(name: string): any;
    get(token: any): any;
    hasDirective(type: Type): boolean;
    getEventEmitterAccessors(): EventEmitterAccessor[][];
    getDirectiveVariableBindings(): Map<string, number>;
    getComponent(): any;
    getInjector(): Injector;
    getElementRef(): ElementRef;
    getViewContainerRef(): ViewContainerRef;
    getNestedView(): viewModule.AppView;
    getView(): viewModule.AppView;
    directParent(): ElementInjector;
    isComponentKey(key: Key): boolean;
    getDependency(injector: Injector, binding: ResolvedBinding, dep: Dependency): any;
    private _buildAttribute(dep);
    addDirectivesMatchingQuery(query: QueryMetadata, list: any[]): void;
    private _buildQueryStrategy();
    link(parent: ElementInjector): void;
    unlink(): void;
    getDirectiveAtIndex(index: number): any;
    hasInstances(): boolean;
    getHost(): ElementInjector;
    getBoundElementIndex(): number;
    getRootViewInjectors(): ElementInjector[];
    afterViewChecked(): void;
    afterContentChecked(): void;
    traverseAndSetQueriesAsDirty(): void;
    private _setQueriesAsDirty();
}
export declare class ProtoQueryRef {
    dirIndex: number;
    setter: SetterFn;
    query: QueryMetadata;
    constructor(dirIndex: number, setter: SetterFn, query: QueryMetadata);
    usesPropertySyntax: boolean;
}
export declare class QueryRef {
    protoQueryRef: ProtoQueryRef;
    private originator;
    list: QueryList<any>;
    dirty: boolean;
    constructor(protoQueryRef: ProtoQueryRef, originator: ElementInjector);
    isViewQuery: boolean;
    update(): void;
    private _update();
    private _visit(inj, aggregator);
    private _visitInjector(inj, aggregator);
    private _visitViewContainer(vc, aggregator);
    private _visitView(view, aggregator);
    private _aggregateVariableBindings(inj, aggregator);
    private _aggregateDirective(inj, aggregator);
    dehydrate(): void;
    hydrate(): void;
}
