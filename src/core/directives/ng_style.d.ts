import { DoCheck } from 'angular2/lifecycle_hooks';
import { KeyValueDiffer, KeyValueDiffers } from 'angular2/src/core/change_detection';
import { ElementRef } from 'angular2/src/core/linker';
import { Renderer } from 'angular2/src/core/render';
/**
 * Adds or removes styles based on an {expression}.
 *
 * When the expression assigned to `ng-style` evaluates to an object, the corresponding element
 * styles are updated. Style names to update are taken from the object keys and values - from the
 * corresponding object values.
 *
 * # Example:
 *
 * ```
 * <div [ng-style]="{'text-align': alignExp}"></div>
 * ```
 *
 * In the above example the `text-align` style will be updated based on the `alignExp` value
 * changes.
 *
 * # Syntax
 *
 * - `<div [ng-style]="{'text-align': alignExp}"></div>`
 * - `<div [ng-style]="styleExp"></div>`
 */
export declare class NgStyle implements DoCheck {
    private _differs;
    private _ngEl;
    private _renderer;
    _rawStyle: any;
    _differ: KeyValueDiffer;
    constructor(_differs: KeyValueDiffers, _ngEl: ElementRef, _renderer: Renderer);
    rawStyle: any;
    doCheck(): void;
    private _applyChanges(changes);
    private _setStyle(name, val);
}
