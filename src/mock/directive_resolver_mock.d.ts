import { Type } from 'angular2/src/core/facade/lang';
import { DirectiveMetadata } from '../core/metadata';
import { DirectiveResolver } from 'angular2/src/core/linker/directive_resolver';
export declare class MockDirectiveResolver extends DirectiveResolver {
    private _bindingsOverrides;
    private _viewBindingsOverrides;
    resolve(type: Type): DirectiveMetadata;
    setBindingsOverride(type: Type, bindings: any[]): void;
    setViewBindingsOverride(type: Type, viewBindings: any[]): void;
}
