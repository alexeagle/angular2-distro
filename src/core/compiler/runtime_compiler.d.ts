import { Compiler } from 'angular2/src/core/linker/compiler';
import { ProtoViewRef } from 'angular2/src/core/linker/view_ref';
import { ProtoViewFactory } from 'angular2/src/core/linker/proto_view_factory';
import { TemplateCompiler } from './template_compiler';
import { Type } from 'angular2/src/core/facade/lang';
import { Promise } from 'angular2/src/core/facade/async';
export declare class RuntimeCompiler extends Compiler {
    private _templateCompiler;
    /**
     * @private
     */
    constructor(_protoViewFactory: ProtoViewFactory, _templateCompiler: TemplateCompiler);
    compileInHost(componentType: Type): Promise<ProtoViewRef>;
    clearCache(): void;
}
