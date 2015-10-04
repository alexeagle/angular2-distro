import { EventEmitter } from 'angular2/src/core/facade/async';
export declare class MockEventEmitter extends EventEmitter {
    private _nextFns;
    constructor();
    observer(generator: any): any;
    next(value: any): void;
}
