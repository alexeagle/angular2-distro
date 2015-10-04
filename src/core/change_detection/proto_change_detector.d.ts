import { ChangeDetector, ProtoChangeDetector, ChangeDetectorDefinition } from './interfaces';
import { BindingRecord, BindingTarget } from './binding_record';
import { DirectiveIndex } from './directive_record';
import { EventBinding } from './event_binding';
import { ProtoRecord } from './proto_record';
export declare class DynamicProtoChangeDetector implements ProtoChangeDetector {
    private _definition;
    _propertyBindingRecords: ProtoRecord[];
    _propertyBindingTargets: BindingTarget[];
    _eventBindingRecords: EventBinding[];
    _directiveIndices: DirectiveIndex[];
    constructor(_definition: ChangeDetectorDefinition);
    instantiate(dispatcher: any): ChangeDetector;
}
export declare function createPropertyRecords(definition: ChangeDetectorDefinition): ProtoRecord[];
export declare function createEventRecords(definition: ChangeDetectorDefinition): EventBinding[];
export declare class ProtoRecordBuilder {
    records: ProtoRecord[];
    constructor();
    add(b: BindingRecord, variableNames: string[], bindingIndex: number): void;
    _setArgumentToPureFunction(startIndex: number): void;
    _appendRecords(b: BindingRecord, variableNames: string[], bindingIndex: number): void;
}
