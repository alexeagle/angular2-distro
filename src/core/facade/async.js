var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = require('angular2/src/core/facade/lang');
// TODO(jeffbcross): use ES6 import once typings are available
var Subject = require('@reactivex/rxjs/dist/cjs/Subject');
var PromiseWrapper = (function () {
    function PromiseWrapper() {
    }
    PromiseWrapper.resolve = function (obj) { return Promise.resolve(obj); };
    PromiseWrapper.reject = function (obj, _) { return Promise.reject(obj); };
    // Note: We can't rename this method into `catch`, as this is not a valid
    // method name in Dart.
    PromiseWrapper.catchError = function (promise, onError) {
        return promise.catch(onError);
    };
    PromiseWrapper.all = function (promises) {
        if (promises.length == 0)
            return Promise.resolve([]);
        return Promise.all(promises);
    };
    PromiseWrapper.then = function (promise, success, rejection) {
        return promise.then(success, rejection);
    };
    PromiseWrapper.wrap = function (computation) {
        return new Promise(function (res, rej) {
            try {
                res(computation());
            }
            catch (e) {
                rej(e);
            }
        });
    };
    PromiseWrapper.completer = function () {
        var resolve;
        var reject;
        var p = new Promise(function (res, rej) {
            resolve = res;
            reject = rej;
        });
        return { promise: p, resolve: resolve, reject: reject };
    };
    return PromiseWrapper;
})();
exports.PromiseWrapper = PromiseWrapper;
var TimerWrapper = (function () {
    function TimerWrapper() {
    }
    TimerWrapper.setTimeout = function (fn, millis) { return lang_1.global.setTimeout(fn, millis); };
    TimerWrapper.clearTimeout = function (id) { lang_1.global.clearTimeout(id); };
    TimerWrapper.setInterval = function (fn, millis) {
        return lang_1.global.setInterval(fn, millis);
    };
    TimerWrapper.clearInterval = function (id) { lang_1.global.clearInterval(id); };
    return TimerWrapper;
})();
exports.TimerWrapper = TimerWrapper;
var ObservableWrapper = (function () {
    function ObservableWrapper() {
    }
    // TODO(vsavkin): when we use rxnext, try inferring the generic type from the first arg
    ObservableWrapper.subscribe = function (emitter, onNext, onThrow, onReturn) {
        if (onThrow === void 0) { onThrow = null; }
        if (onReturn === void 0) { onReturn = null; }
        return emitter.observer({ next: onNext, throw: onThrow, return: onReturn });
    };
    ObservableWrapper.isObservable = function (obs) { return obs instanceof Observable; };
    ObservableWrapper.dispose = function (subscription) { subscription.unsubscribe(); };
    ObservableWrapper.callNext = function (emitter, value) { emitter.next(value); };
    ObservableWrapper.callThrow = function (emitter, error) { emitter.throw(error); };
    ObservableWrapper.callReturn = function (emitter) { emitter.return(null); };
    return ObservableWrapper;
})();
exports.ObservableWrapper = ObservableWrapper;
// TODO: vsavkin change to interface
var Observable = (function () {
    function Observable() {
    }
    Observable.prototype.observer = function (generator) { return null; };
    return Observable;
})();
exports.Observable = Observable;
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
var EventEmitter = (function (_super) {
    __extends(EventEmitter, _super);
    function EventEmitter() {
        _super.apply(this, arguments);
        this._subject = new Subject();
    }
    EventEmitter.prototype.observer = function (generator) {
        return this._subject.subscribe(function (value) { setTimeout(function () { return generator.next(value); }); }, function (error) { return generator.throw ? generator.throw(error) : null; }, function () { return generator.return ? generator.return() : null; });
    };
    EventEmitter.prototype.toRx = function () { return this; };
    EventEmitter.prototype.next = function (value) { this._subject.next(value); };
    EventEmitter.prototype.throw = function (error) { this._subject.error(error); };
    EventEmitter.prototype.return = function (value) { this._subject.complete(); };
    return EventEmitter;
})(Observable);
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=async.js.map