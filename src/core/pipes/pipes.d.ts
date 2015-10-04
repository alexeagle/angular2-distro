import { Injector } from 'angular2/src/core/di';
import { PipeBinding } from './pipe_binding';
import * as cd from 'angular2/src/core/change_detection/pipes';
export declare class ProtoPipes {
    /**
    * Map of {@link PipeMetadata} names to {@link PipeMetadata} implementations.
    */
    config: {
        [key: string]: PipeBinding;
    };
    static fromBindings(bindings: PipeBinding[]): ProtoPipes;
    constructor(
        /**
        * Map of {@link PipeMetadata} names to {@link PipeMetadata} implementations.
        */
        config: {
        [key: string]: PipeBinding;
    });
    get(name: string): PipeBinding;
}
export declare class Pipes implements cd.Pipes {
    proto: ProtoPipes;
    injector: Injector;
    _config: {
        [key: string]: cd.SelectedPipe;
    };
    constructor(proto: ProtoPipes, injector: Injector);
    get(name: string): cd.SelectedPipe;
}
