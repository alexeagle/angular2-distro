import { EventEmitter } from 'angular2/src/core/facade/async';
import { LocationStrategy } from 'angular2/src/router/location_strategy';
export declare class MockLocationStrategy extends LocationStrategy {
    internalBaseHref: string;
    internalPath: string;
    internalTitle: string;
    urlChanges: string[];
    _subject: EventEmitter;
    constructor();
    simulatePopState(url: string): void;
    path(): string;
    simulateUrlPop(pathname: string): void;
    pushState(ctx: any, title: string, url: string): void;
    onPopState(fn: (value: any) => void): void;
    getBaseHref(): string;
    back(): void;
    forward(): void;
}
