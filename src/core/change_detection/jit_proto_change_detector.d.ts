import { ProtoChangeDetector, ChangeDetector, ChangeDetectorDefinition } from './interfaces';
export declare class JitProtoChangeDetector implements ProtoChangeDetector {
    private definition;
    _factory: Function;
    constructor(definition: ChangeDetectorDefinition);
    static isSupported(): boolean;
    instantiate(dispatcher: any): ChangeDetector;
    _createFactory(definition: ChangeDetectorDefinition): Function;
}
