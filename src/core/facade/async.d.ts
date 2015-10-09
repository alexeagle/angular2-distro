export { Promise };
export interface PromiseCompleter<R> {
    promise: Promise<R>;
    resolve: (value?: R | PromiseLike<R>) => void;
    reject: (error?: any, stackTrace?: string) => void;
}
export declare class PromiseWrapper {
    static resolve<T>(obj: T): Promise<T>;
    static reject(obj: any, _: any): Promise<any>;
    static catchError<T>(promise: Promise<T>, onError: (error: any) => T | PromiseLike<T>): Promise<T>;
    static all(promises: any[]): Promise<any>;
    static then<T, U>(promise: Promise<T>, success: (value: T) => U | PromiseLike<U>, rejection?: (error: any, stack?: any) => U | PromiseLike<U>): Promise<U>;
    static wrap<T>(computation: () => T): Promise<T>;
    static completer(): PromiseCompleter<any>;
}
export declare namespace NodeJS {
    interface Timer {
    }
}
export declare class TimerWrapper {
    static setTimeout(fn: (...args: any[]) => void, millis: number): NodeJS.Timer;
    static clearTimeout(id: NodeJS.Timer): void;
    static setInterval(fn: (...args: any[]) => void, millis: number): NodeJS.Timer;
    static clearInterval(id: NodeJS.Timer): void;
}
export declare class ObservableWrapper {
    static subscribe<T>(emitter: Observable, onNext: (value: T) => void, onThrow?: (exception: any) => void, onReturn?: () => void): Object;
    static isObservable(obs: any): boolean;
    static dispose(subscription: any): void;
    static callNext(emitter: EventEmitter, value: any): void;
    static callThrow(emitter: EventEmitter, error: any): void;
    static callReturn(emitter: EventEmitter): void;
}
export declare class Observable {
    observer(generator: any): Object;
}
/**
 * Use by directives and components to emit custom Events.
 *
 * ## Examples
 *
 * In the following example, `Zippy` alternatively emits `open` and `close` events when its
 * title gets clicked:
 *
 * ```
 * @Component({selector: 'zippy'})
 * @View({template: `
 *   <div class="zippy">
 *     <div (click)="toggle()">Toggle</div>
 *     <div [hidden]="!visible">
 *       <ng-content></ng-content>
 *     </div>
 *  </div>`})
 * export class Zippy {
 *   visible: boolean = true;
 *   @Output() open: EventEmitter = new EventEmitter();
 *   @Output() close: EventEmitter = new EventEmitter();
 *
 *   toggle() {
 *     this.visible = !this.visible;
 *     if (this.visible) {
 *       this.open.next(null);
 *     } else {
 *       this.close.next(null);
 *     }
 *   }
 * }
 * ```
 *
 * Use Rx.Observable but provides an adapter to make it work as specified here:
 * https://github.com/jhusain/observable-spec
 *
 * Once a reference implementation of the spec is available, switch to it.
 */
export declare class EventEmitter extends Observable {
    _subject: any;
    observer(generator: any): any;
    toRx(): any;
    next(value: any): void;
    throw(error: any): void;
    return(value?: any): void;
}
