var lang_1 = require('angular2/src/core/facade/lang');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var collection_1 = require('angular2/src/core/facade/collection');
var change_detection_util_1 = require('./change_detection_util');
var change_detector_ref_1 = require('./change_detector_ref');
var exceptions_2 = require('./exceptions');
var constants_1 = require('./constants');
var profile_1 = require('../profile/profile');
var observable_facade_1 = require('./observable_facade');
var _scope_check = profile_1.wtfCreateScope("ChangeDetector#check(ascii id, bool throwOnChange)");
var _Context = (function () {
    function _Context(element, componentElement, context, locals, injector, expression) {
        this.element = element;
        this.componentElement = componentElement;
        this.context = context;
        this.locals = locals;
        this.injector = injector;
        this.expression = expression;
    }
    return _Context;
})();
var AbstractChangeDetector = (function () {
    function AbstractChangeDetector(id, dispatcher, numberOfPropertyProtoRecords, bindingTargets, directiveIndices, strategy) {
        this.id = id;
        this.dispatcher = dispatcher;
        this.numberOfPropertyProtoRecords = numberOfPropertyProtoRecords;
        this.bindingTargets = bindingTargets;
        this.directiveIndices = directiveIndices;
        this.strategy = strategy;
        this.lightDomChildren = [];
        this.shadowDomChildren = [];
        // The names of the below fields must be kept in sync with codegen_name_util.ts or
        // change detection will fail.
        this.alreadyChecked = false;
        this.locals = null;
        this.mode = null;
        this.pipes = null;
        this.ref = new change_detector_ref_1.ChangeDetectorRef_(this);
    }
    AbstractChangeDetector.prototype.addChild = function (cd) {
        this.lightDomChildren.push(cd);
        cd.parent = this;
    };
    AbstractChangeDetector.prototype.removeChild = function (cd) { collection_1.ListWrapper.remove(this.lightDomChildren, cd); };
    AbstractChangeDetector.prototype.addShadowDomChild = function (cd) {
        this.shadowDomChildren.push(cd);
        cd.parent = this;
    };
    AbstractChangeDetector.prototype.removeShadowDomChild = function (cd) { collection_1.ListWrapper.remove(this.shadowDomChildren, cd); };
    AbstractChangeDetector.prototype.remove = function () { this.parent.removeChild(this); };
    AbstractChangeDetector.prototype.handleEvent = function (eventName, elIndex, locals) {
        var res = this.handleEventInternal(eventName, elIndex, locals);
        this.markPathToRootAsCheckOnce();
        return res;
    };
    AbstractChangeDetector.prototype.handleEventInternal = function (eventName, elIndex, locals) { return false; };
    AbstractChangeDetector.prototype.detectChanges = function () { this.runDetectChanges(false); };
    AbstractChangeDetector.prototype.checkNoChanges = function () { throw new exceptions_1.BaseException("Not implemented"); };
    AbstractChangeDetector.prototype.runDetectChanges = function (throwOnChange) {
        if (this.mode === constants_1.ChangeDetectionStrategy.Detached ||
            this.mode === constants_1.ChangeDetectionStrategy.Checked)
            return;
        var s = _scope_check(this.id, throwOnChange);
        this.detectChangesInRecords(throwOnChange);
        this._detectChangesInLightDomChildren(throwOnChange);
        if (!throwOnChange)
            this.afterContentLifecycleCallbacks();
        this._detectChangesInShadowDomChildren(throwOnChange);
        if (!throwOnChange)
            this.afterViewLifecycleCallbacks();
        if (this.mode === constants_1.ChangeDetectionStrategy.CheckOnce)
            this.mode = constants_1.ChangeDetectionStrategy.Checked;
        this.alreadyChecked = true;
        profile_1.wtfLeave(s);
    };
    // This method is not intended to be overridden. Subclasses should instead provide an
    // implementation of `detectChangesInRecordsInternal` which does the work of detecting changes
    // and which this method will call.
    // This method expects that `detectChangesInRecordsInternal` will set the property
    // `this.propertyBindingIndex` to the propertyBindingIndex of the first proto record. This is to
    // facilitate error reporting.
    AbstractChangeDetector.prototype.detectChangesInRecords = function (throwOnChange) {
        if (!this.hydrated()) {
            this.throwDehydratedError();
        }
        try {
            this.detectChangesInRecordsInternal(throwOnChange);
        }
        catch (e) {
            this._throwError(e, e.stack);
        }
    };
    // Subclasses should override this method to perform any work necessary to detect and report
    // changes. For example, changes should be reported via `ChangeDetectionUtil.addChange`, lifecycle
    // methods should be called, etc.
    // This implementation should also set `this.propertyBindingIndex` to the propertyBindingIndex of
    // the
    // first proto record to facilitate error reporting. See {@link #detectChangesInRecords}.
    AbstractChangeDetector.prototype.detectChangesInRecordsInternal = function (throwOnChange) { };
    // This method is not intended to be overridden. Subclasses should instead provide an
    // implementation of `hydrateDirectives`.
    AbstractChangeDetector.prototype.hydrate = function (context, locals, directives, pipes) {
        this.mode = change_detection_util_1.ChangeDetectionUtil.changeDetectionMode(this.strategy);
        this.context = context;
        if (this.strategy === constants_1.ChangeDetectionStrategy.OnPushObserve) {
            this.observeComponent(context);
        }
        this.locals = locals;
        this.pipes = pipes;
        this.hydrateDirectives(directives);
        this.alreadyChecked = false;
    };
    // Subclasses should override this method to hydrate any directives.
    AbstractChangeDetector.prototype.hydrateDirectives = function (directives) { };
    // This method is not intended to be overridden. Subclasses should instead provide an
    // implementation of `dehydrateDirectives`.
    AbstractChangeDetector.prototype.dehydrate = function () {
        this.dehydrateDirectives(true);
        // This is an experimental feature. Works only in Dart.
        if (this.strategy === constants_1.ChangeDetectionStrategy.OnPushObserve) {
            this._unsubsribeFromObservables();
        }
        this.context = null;
        this.locals = null;
        this.pipes = null;
    };
    // Subclasses should override this method to dehydrate any directives. This method should reverse
    // any work done in `hydrateDirectives`.
    AbstractChangeDetector.prototype.dehydrateDirectives = function (destroyPipes) { };
    AbstractChangeDetector.prototype.hydrated = function () { return this.context !== null; };
    AbstractChangeDetector.prototype.afterContentLifecycleCallbacks = function () {
        this.dispatcher.notifyAfterContentChecked();
        this.afterContentLifecycleCallbacksInternal();
    };
    AbstractChangeDetector.prototype.afterContentLifecycleCallbacksInternal = function () { };
    AbstractChangeDetector.prototype.afterViewLifecycleCallbacks = function () {
        this.dispatcher.notifyAfterViewChecked();
        this.afterViewLifecycleCallbacksInternal();
    };
    AbstractChangeDetector.prototype.afterViewLifecycleCallbacksInternal = function () { };
    AbstractChangeDetector.prototype._detectChangesInLightDomChildren = function (throwOnChange) {
        var c = this.lightDomChildren;
        for (var i = 0; i < c.length; ++i) {
            c[i].runDetectChanges(throwOnChange);
        }
    };
    AbstractChangeDetector.prototype._detectChangesInShadowDomChildren = function (throwOnChange) {
        var c = this.shadowDomChildren;
        for (var i = 0; i < c.length; ++i) {
            c[i].runDetectChanges(throwOnChange);
        }
    };
    AbstractChangeDetector.prototype.markAsCheckOnce = function () { this.mode = constants_1.ChangeDetectionStrategy.CheckOnce; };
    AbstractChangeDetector.prototype.markPathToRootAsCheckOnce = function () {
        var c = this;
        while (lang_1.isPresent(c) && c.mode !== constants_1.ChangeDetectionStrategy.Detached) {
            if (c.mode === constants_1.ChangeDetectionStrategy.Checked)
                c.mode = constants_1.ChangeDetectionStrategy.CheckOnce;
            c = c.parent;
        }
    };
    // This is an experimental feature. Works only in Dart.
    AbstractChangeDetector.prototype._unsubsribeFromObservables = function () {
        if (lang_1.isPresent(this.subscriptions)) {
            for (var i = 0; i < this.subscriptions.length; ++i) {
                var s = this.subscriptions[i];
                if (lang_1.isPresent(this.subscriptions[i])) {
                    s.cancel();
                    this.subscriptions[i] = null;
                }
            }
        }
    };
    // This is an experimental feature. Works only in Dart.
    AbstractChangeDetector.prototype.observeValue = function (value, index) {
        var _this = this;
        if (observable_facade_1.isObservable(value)) {
            this._createArrayToStoreObservables();
            if (lang_1.isBlank(this.subscriptions[index])) {
                this.streams[index] = value.changes;
                this.subscriptions[index] = value.changes.listen(function (_) { return _this.ref.markForCheck(); });
            }
            else if (this.streams[index] !== value.changes) {
                this.subscriptions[index].cancel();
                this.streams[index] = value.changes;
                this.subscriptions[index] = value.changes.listen(function (_) { return _this.ref.markForCheck(); });
            }
        }
        return value;
    };
    // This is an experimental feature. Works only in Dart.
    AbstractChangeDetector.prototype.observeDirective = function (value, index) {
        var _this = this;
        if (observable_facade_1.isObservable(value)) {
            this._createArrayToStoreObservables();
            var arrayIndex = this.numberOfPropertyProtoRecords + index + 2; // +1 is component
            this.streams[arrayIndex] = value.changes;
            this.subscriptions[arrayIndex] = value.changes.listen(function (_) { return _this.ref.markForCheck(); });
        }
        return value;
    };
    // This is an experimental feature. Works only in Dart.
    AbstractChangeDetector.prototype.observeComponent = function (value) {
        var _this = this;
        if (observable_facade_1.isObservable(value)) {
            this._createArrayToStoreObservables();
            var index = this.numberOfPropertyProtoRecords + 1;
            this.streams[index] = value.changes;
            this.subscriptions[index] = value.changes.listen(function (_) { return _this.ref.markForCheck(); });
        }
        return value;
    };
    AbstractChangeDetector.prototype._createArrayToStoreObservables = function () {
        if (lang_1.isBlank(this.subscriptions)) {
            this.subscriptions = collection_1.ListWrapper.createFixedSize(this.numberOfPropertyProtoRecords +
                this.directiveIndices.length + 2);
            this.streams = collection_1.ListWrapper.createFixedSize(this.numberOfPropertyProtoRecords +
                this.directiveIndices.length + 2);
        }
    };
    AbstractChangeDetector.prototype.getDirectiveFor = function (directives, index) {
        return directives.getDirectiveFor(this.directiveIndices[index]);
    };
    AbstractChangeDetector.prototype.getDetectorFor = function (directives, index) {
        return directives.getDetectorFor(this.directiveIndices[index]);
    };
    AbstractChangeDetector.prototype.notifyDispatcher = function (value) {
        this.dispatcher.notifyOnBinding(this._currentBinding(), value);
    };
    AbstractChangeDetector.prototype.logBindingUpdate = function (value) {
        this.dispatcher.logBindingUpdate(this._currentBinding(), value);
    };
    AbstractChangeDetector.prototype.addChange = function (changes, oldValue, newValue) {
        if (lang_1.isBlank(changes)) {
            changes = {};
        }
        changes[this._currentBinding().name] = change_detection_util_1.ChangeDetectionUtil.simpleChange(oldValue, newValue);
        return changes;
    };
    AbstractChangeDetector.prototype._throwError = function (exception, stack) {
        var error;
        try {
            var c = this.dispatcher.getDebugContext(this._currentBinding().elementIndex, null);
            var context = lang_1.isPresent(c) ? new _Context(c.element, c.componentElement, c.context, c.locals, c.injector, this._currentBinding().debug) :
                null;
            error = new exceptions_2.ChangeDetectionError(this._currentBinding().debug, exception, stack, context);
        }
        catch (e) {
            // if an error happens during getting the debug context, we throw a ChangeDetectionError
            // without the extra information.
            error = new exceptions_2.ChangeDetectionError(null, exception, stack, null);
        }
        throw error;
    };
    AbstractChangeDetector.prototype.throwOnChangeError = function (oldValue, newValue) {
        throw new exceptions_2.ExpressionChangedAfterItHasBeenCheckedException(this._currentBinding().debug, oldValue, newValue, null);
    };
    AbstractChangeDetector.prototype.throwDehydratedError = function () { throw new exceptions_2.DehydratedException(); };
    AbstractChangeDetector.prototype._currentBinding = function () {
        return this.bindingTargets[this.propertyBindingIndex];
    };
    return AbstractChangeDetector;
})();
exports.AbstractChangeDetector = AbstractChangeDetector;
//# sourceMappingURL=abstract_change_detector.js.map