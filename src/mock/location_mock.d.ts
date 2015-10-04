import { EventEmitter } from 'angular2/src/core/facade/async';
import { Location } from 'angular2/src/router/location';
export declare class SpyLocation implements Location {
    urlChanges: string[];
    _path: string;
    _subject: EventEmitter;
    _baseHref: string;
    setInitialPath(url: string): void;
    setBaseHref(url: string): void;
    path(): string;
    simulateUrlPop(pathname: string): void;
    normalizeAbsolutely(url: string): string;
    go(url: string): void;
    forward(): void;
    back(): void;
    subscribe(onNext: (value: any) => void, onThrow?: (error: any) => void, onReturn?: () => void): void;
    platformStrategy: any;
    normalize(url: string): string;
}
