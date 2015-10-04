import * as viewModule from './view';
import { ChangeDetectorRef } from '../change_detection/change_detector_ref';
import { RenderViewRef, RenderFragmentRef } from 'angular2/src/core/render/api';
export declare function internalView(viewRef: ViewRef): viewModule.AppView;
export declare function internalProtoView(protoViewRef: ProtoViewRef): viewModule.AppProtoView;
/**
 * Represents a View containing a single Element that is the Host Element of a {@link Component}
 * instance.
 *
 * A Host View is created for every dynamically created Component that was compiled on its own (as
 * opposed to as a part of another Component's Template) via {@link Compiler#compileInHost} or one
 * of the higher-level APIs: {@link AppViewManager#createRootHostView},
 * {@link AppViewManager#createHostViewInContainer}, {@link ViewContainerRef#createHostView}.
 */
export interface HostViewRef {
    /**
     * @private
     */
    changeDetectorRef: ChangeDetectorRef;
}
/**
 * Represents an Angular View.
 *
 * <!-- TODO: move the next two paragraphs to the dev guide -->
 * A View is a fundamental building block of the application UI. It is the smallest grouping of
 * Elements which are created and destroyed together.
 *
 * Properties of elements in a View can change, but the structure (number and order) of elements in
 * a View cannot. Changing the structure of Elements can only be done by inserting, moving or
 * removing nested Views via a {@link ViewContainer}. Each View can contain many View Containers.
 * <!-- /TODO -->
 *
 * ## Example
 *
 * Given this template...
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ng-for="var item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * ... we have two {@link ProtoViewRef}s:
 *
 * Outer {@link ProtoViewRef}:
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <template ng-for var-item [ng-for-of]="items"></template>
 * </ul>
 * ```
 *
 * Inner {@link ProtoViewRef}:
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * Notice that the original template is broken down into two separate {@link ProtoViewRef}s.
 *
 * The outer/inner {@link ProtoViewRef}s are then assembled into views like so:
 *
 * ```
 * <!-- ViewRef: outer-0 -->
 * Count: 2
 * <ul>
 *   <template view-container-ref></template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outer-0 -->
 * ```
 */
export declare class ViewRef implements HostViewRef {
    _view: viewModule.AppView;
    private _changeDetectorRef;
    /**
     * @private
     */
    constructor(_view: viewModule.AppView);
    /**
     * @private
     *
     * Return `RenderViewRef`
     */
    render: RenderViewRef;
    /**
     * @private
     *
     * Return `RenderFragmentRef`
     */
    renderFragment: RenderFragmentRef;
    /**
     * @private
     *
     * Return `ChangeDetectorRef`
     */
    changeDetectorRef: ChangeDetectorRef;
    /**
     * Sets `value` of local variable called `variableName` in this View.
     */
    setLocal(variableName: string, value: any): void;
}
/**
 * Represents an Angular ProtoView.
 *
 * A ProtoView is a prototypical {@link ViewRef View} that is the result of Template compilation and
 * is used by Angular to efficiently create an instance of this View based on the compiled Template.
 *
 * Most ProtoViews are created and used internally by Angular and you don't need to know about them,
 * except in advanced use-cases where you compile components yourself via the low-level
 * {@link Compiler#compileInHost} API.
 *
 *
 * ## Example
 *
 * Given this template:
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ng-for="var item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * Angular desugars and compiles the template into two ProtoViews:
 *
 * Outer ProtoView:
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <template ng-for var-item [ng-for-of]="items"></template>
 * </ul>
 * ```
 *
 * Inner ProtoView:
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * Notice that the original template is broken down into two separate ProtoViews.
 */
export declare class ProtoViewRef {
    _protoView: viewModule.AppProtoView;
    /**
     * @private
     */
    constructor(_protoView: viewModule.AppProtoView);
}
