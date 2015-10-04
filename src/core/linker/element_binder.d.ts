import * as eiModule from './element_injector';
import { DirectiveBinding } from './element_injector';
import * as viewModule from './view';
export declare class ElementBinder {
    index: number;
    parent: ElementBinder;
    distanceToParent: number;
    protoElementInjector: eiModule.ProtoElementInjector;
    componentDirective: DirectiveBinding;
    nestedProtoView: viewModule.AppProtoView;
    constructor(index: number, parent: ElementBinder, distanceToParent: number, protoElementInjector: eiModule.ProtoElementInjector, componentDirective: DirectiveBinding, nestedProtoView: viewModule.AppProtoView);
}
