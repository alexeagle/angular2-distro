export { TemplateCompiler } from './template_compiler';
export { CompileDirectiveMetadata, CompileTypeMetadata, CompileTemplateMetadata } from './directive_metadata';
export { SourceModule, SourceWithImports } from './source_module';
import { Type } from 'angular2/src/core/facade/lang';
import { Binding } from 'angular2/src/core/di';
export declare function compilerBindings(): Array<Type | Binding | any[]>;
