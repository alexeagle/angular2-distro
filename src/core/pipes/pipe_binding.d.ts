import { Type } from 'angular2/src/core/facade/lang';
import { ResolvedFactory } from 'angular2/src/core/di/binding';
import { Key, ResolvedBinding } from 'angular2/src/core/di';
import { PipeMetadata } from '../metadata/directives';
export declare class PipeBinding extends ResolvedBinding {
    name: string;
    pure: boolean;
    constructor(name: string, pure: boolean, key: Key, resolvedFactories: ResolvedFactory[], multiBinding: boolean);
    static createFromType(type: Type, metadata: PipeMetadata): PipeBinding;
}
