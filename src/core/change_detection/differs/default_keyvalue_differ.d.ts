import { ChangeDetectorRef } from '../change_detector_ref';
import { KeyValueDiffer, KeyValueDifferFactory } from '../differs/keyvalue_differs';
export declare class DefaultKeyValueDifferFactory implements KeyValueDifferFactory {
    supports(obj: any): boolean;
    create(cdRef: ChangeDetectorRef): KeyValueDiffer;
}
export declare class DefaultKeyValueDiffer implements KeyValueDiffer {
    private _records;
    private _mapHead;
    private _previousMapHead;
    private _changesHead;
    private _changesTail;
    private _additionsHead;
    private _additionsTail;
    private _removalsHead;
    private _removalsTail;
    isDirty: boolean;
    forEachItem(fn: Function): void;
    forEachPreviousItem(fn: Function): void;
    forEachChangedItem(fn: Function): void;
    forEachAddedItem(fn: Function): void;
    forEachRemovedItem(fn: Function): void;
    diff(map: Map<any, any>): any;
    onDestroy(): void;
    check(map: Map<any, any>): boolean;
    _reset(): void;
    _truncate(lastRecord: KVChangeRecord, record: KVChangeRecord): void;
    _isInRemovals(record: KVChangeRecord): boolean;
    _addToRemovals(record: KVChangeRecord): void;
    _removeFromSeq(prev: KVChangeRecord, record: KVChangeRecord): void;
    _removeFromRemovals(record: KVChangeRecord): void;
    _addToAdditions(record: KVChangeRecord): void;
    _addToChanges(record: KVChangeRecord): void;
    toString(): string;
    _forEach(obj: any, fn: Function): void;
}
export declare class KVChangeRecord {
    key: any;
    previousValue: any;
    currentValue: any;
    _nextPrevious: KVChangeRecord;
    _next: KVChangeRecord;
    _nextAdded: KVChangeRecord;
    _nextRemoved: KVChangeRecord;
    _prevRemoved: KVChangeRecord;
    _nextChanged: KVChangeRecord;
    constructor(key: any);
    toString(): string;
}
