import { Promise, Observable } from 'angular2/src/core/facade/async';
import { ChangeDetectorRef, PipeOnDestroy, PipeTransform } from 'angular2/src/core/change_detection';
/**
 * The `async` pipe subscribes to an Observable or Promise and returns the latest value it has
 * emitted.
 * When a new value is emitted, the `async` pipe marks the component to be checked for changes.
 *
 * # Example
 * The example below binds the `time` Observable to the view. Every 500ms, the `time` Observable
 * updates the view with the current time.
 *
 * ```
 * import {Observable} from 'angular2/core';
 * @Component({
 *   selector: "task-cmp"
 * })
 * @View({
 *   template: "Time: {{ time | async }}"
 * })
 * class Task {
 *   time = new Observable<number>(observer => {
 *     setInterval(_ =>
 *       observer.next(new Date().getTime()), 500);
 *   });
 * }
 * ```
 */
export declare class AsyncPipe implements PipeTransform, PipeOnDestroy {
    _ref: ChangeDetectorRef;
    _latestValue: Object;
    _latestReturnedValue: Object;
    _subscription: Object;
    _obj: Observable | Promise<any>;
    private _strategy;
    constructor(_ref: ChangeDetectorRef);
    onDestroy(): void;
    transform(obj: Observable | Promise<any>, args?: any[]): any;
    _subscribe(obj: Observable | Promise<any>): void;
    _selectStrategy(obj: Observable | Promise<any>): any;
    _dispose(): void;
    _updateLatestValue(async: any, value: Object): void;
}
