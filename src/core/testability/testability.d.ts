import { NgZone } from '../zone/ng_zone';
/**
 * The Testability service provides testing hooks that can be accessed from
 * the browser and by services such as Protractor. Each bootstrapped Angular
 * application on the page will have an instance of Testability.
 */
export declare class Testability {
    _ngZone: NgZone;
    _pendingCount: number;
    _callbacks: Function[];
    _isAngularEventPending: boolean;
    constructor(_ngZone: NgZone);
    _watchAngularEvents(_ngZone: NgZone): void;
    increasePendingRequestCount(): number;
    decreasePendingRequestCount(): number;
    isStable(): boolean;
    _runCallbacksIfReady(): void;
    whenStable(callback: Function): void;
    getPendingRequestCount(): number;
    isAngularEventPending(): boolean;
    findBindings(using: any, binding: string, exactMatch: boolean): any[];
}
export declare class TestabilityRegistry {
    _applications: Map<any, Testability>;
    constructor();
    registerApplication(token: any, testability: Testability): void;
    getAllTestabilities(): Testability[];
    findTestabilityInTree(elem: Node, findInAncestors?: boolean): Testability;
}
export interface GetTestability {
    addToWindow(registry: TestabilityRegistry): void;
}
export declare function setTestabilityGetter(getter: GetTestability): void;
