import { DoCheck, OnDestroy } from 'angular2/lifecycle_hooks';
import { ElementRef } from 'angular2/src/core/linker';
import { IterableDiffers, KeyValueDiffers } from 'angular2/src/core/change_detection';
import { Renderer } from 'angular2/src/core/render';
/**
 * Adds and removes CSS classes based on an {expression} value.
 *
 * The result of expression is used to add and remove CSS classes using the following logic,
 * based on expression's value type:
 * - {string} - all the CSS classes (space - separated) are added
 * - {Array} - all the CSS classes (Array elements) are added
 * - {Object} - each key corresponds to a CSS class name while values
 * are interpreted as {boolean} expression. If a given expression
 * evaluates to {true} a corresponding CSS class is added - otherwise
 * it is removed.
 *
 * # Example:
 *
 * ```
 * <div class="message" [ng-class]="{error: errorCount > 0}">
 *     Please check errors.
 * </div>
 * ```
 */
export declare class NgClass implements DoCheck, OnDestroy {
    private _iterableDiffers;
    private _keyValueDiffers;
    private _ngEl;
    private _renderer;
    private _differ;
    private _mode;
    private _initialClasses;
    private _rawClass;
    constructor(_iterableDiffers: IterableDiffers, _keyValueDiffers: KeyValueDiffers, _ngEl: ElementRef, _renderer: Renderer);
    initialClasses: any;
    rawClass: any;
    doCheck(): void;
    onDestroy(): void;
    private _cleanupClasses(rawClassVal);
    private _applyKeyValueChanges(changes);
    private _applyIterableChanges(changes);
    private _applyInitialClasses(isCleanup);
    private _applyClasses(rawClassVal, isCleanup);
    private _toggleClass(className, enabled);
}
