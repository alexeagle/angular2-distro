import { ViewMetadata } from '../metadata/view';
import { Type } from 'angular2/src/core/facade/lang';
export declare class ViewResolver {
    _cache: Map<Type, ViewMetadata>;
    resolve(component: Type): ViewMetadata;
    _resolve(component: Type): ViewMetadata;
}
