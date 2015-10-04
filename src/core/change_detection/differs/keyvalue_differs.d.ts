import { ChangeDetectorRef } from '../change_detector_ref';
import { Binding } from 'angular2/src/core/di';
export interface KeyValueDiffer {
    diff(object: Object): any;
    onDestroy(): any;
}
/**
 * Provides a factory for {@link KeyValueDiffer}.
 */
export interface KeyValueDifferFactory {
    supports(objects: Object): boolean;
    create(cdRef: ChangeDetectorRef): KeyValueDiffer;
}
/**
 * A repository of different Map diffing strategies used by NgClass, NgStyle, and others.
 */
export declare class KeyValueDiffers {
    factories: KeyValueDifferFactory[];
    constructor(factories: KeyValueDifferFactory[]);
    static create(factories: KeyValueDifferFactory[], parent?: KeyValueDiffers): KeyValueDiffers;
    /**
     * Takes an array of {@link KeyValueDifferFactory} and returns a binding used to extend the
     * inherited {@link KeyValueDiffers} instance with the provided factories and return a new
     * {@link KeyValueDiffers} instance.
     *
     * The following example shows how to extend an existing list of factories,
           * which will only be applied to the injector for this component and its children.
           * This step is all that's required to make a new {@link KeyValueDiffer} available.
     *
     * # Example
     *
     * ```
     * @Component({
     *   viewBindings: [
     *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
     *   ]
     * })
     * ```
     */
    static extend(factories: KeyValueDifferFactory[]): Binding;
    find(kv: Object): KeyValueDifferFactory;
}
