import { Pipes } from 'angular2/src/core/change_detection/pipes';
import { ProtoChangeDetector, ChangeDispatcher, DirectiveIndex, BindingTarget } from 'angular2/src/core/change_detection/change_detection';
export declare class TestDirective {
    eventLog: string[];
    dirProp: string;
    onEvent(value: string): void;
}
export declare class TestDispatcher implements ChangeDispatcher {
    directives: any[];
    detectors: ProtoChangeDetector[];
    log: string[];
    constructor(directives: any[], detectors: ProtoChangeDetector[]);
    getDirectiveFor(di: DirectiveIndex): any;
    getDetectorFor(di: DirectiveIndex): ProtoChangeDetector;
    clear(): void;
    notifyOnBinding(target: BindingTarget, value: any): void;
    logBindingUpdate(target: any, value: any): void;
    notifyAfterContentChecked(): void;
    notifyAfterViewChecked(): void;
    getDebugContext(a: any, b: any): any;
    _asString(value: any): any;
}
export declare class TestPipes implements Pipes {
    get(type: string): any;
}
