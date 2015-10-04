export declare class SymbolsDiff {
    actual: string[];
    expected: string[];
    missing: string[];
    extra: string[];
    errors: string[];
    constructor(actual: string[], expected: string[]);
    computeDiff(): void;
    shouldIgnore(expected: string): boolean;
}
