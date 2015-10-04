import { AppViewListener } from 'angular2/src/core/linker/view_listener';
import { AppView } from 'angular2/src/core/linker/view';
import { Renderer } from 'angular2/src/core/render/api';
import { DebugElement } from './debug_element';
export declare function inspectNativeElement(element: any): DebugElement;
export declare class DebugElementViewListener implements AppViewListener {
    private _renderer;
    constructor(_renderer: Renderer);
    viewCreated(view: AppView): void;
    viewDestroyed(view: AppView): void;
}
export declare const ELEMENT_PROBE_BINDINGS: any[];
