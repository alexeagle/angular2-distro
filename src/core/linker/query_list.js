var collection_1 = require('angular2/src/core/facade/collection');
var lang_1 = require('angular2/src/core/facade/lang');
var async_1 = require('angular2/src/core/facade/async');
/**
 * An unmodifiable list of items that Angular keeps up to date when the state
 * of the application changes.
 *
 * The type of object that {@link QueryMetadata} and {@link ViewQueryMetadata} provide.
 *
 * Implements an iterable interface, therefore it can be used in both ES6
 * javascript `for (var i of items)` loops as well as in Angular templates with
 * `*ng-for="#i of myList"`.
 *
 * Changes can be observed by subscribing to the changes `Observable`.
 *
 * NOTE: In the future this class will implement an `Observable` interface.
 *
 * ### Example ([live demo](http://plnkr.co/edit/RX8sJnQYl9FWuSCWme5z?p=preview))
 * ```javascript
 * @Component({...})
 * class Container {
 *   constructor(@Query(Item) items: QueryList<Item>) {
 *     items.changes.subscribe(_ => console.log(items.length));
 *   }
 * }
 * ```
 */
var QueryList = (function () {
    function QueryList() {
        this._results = [];
        this._emitter = new async_1.EventEmitter();
    }
    Object.defineProperty(QueryList.prototype, "changes", {
        get: function () { return this._emitter; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryList.prototype, "length", {
        get: function () { return this._results.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryList.prototype, "first", {
        get: function () { return collection_1.ListWrapper.first(this._results); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryList.prototype, "last", {
        get: function () { return collection_1.ListWrapper.last(this._results); },
        enumerable: true,
        configurable: true
    });
    /**
     * returns a new list with the passsed in function applied to each element.
     */
    QueryList.prototype.map = function (fn) { return this._results.map(fn); };
    QueryList.prototype[lang_1.getSymbolIterator()] = function () { return this._results[lang_1.getSymbolIterator()](); };
    QueryList.prototype.toString = function () { return this._results.toString(); };
    /**
     * @internal
     */
    QueryList.prototype.reset = function (res) { this._results = res; };
    /** @internal */
    QueryList.prototype.notifyOnChanges = function () { this._emitter.next(this); };
    return QueryList;
})();
exports.QueryList = QueryList;
//# sourceMappingURL=query_list.js.map