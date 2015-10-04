import { ChangeDetectorDefinition, Locals } from 'angular2/src/core/change_detection/change_detection';
export declare const PROP_NAME: string;
/**
 * In this case, we expect `id` and `expression` to be the same string.
 */
export declare function getDefinition(id: string): TestDefinition;
export declare class TestDefinition {
    id: string;
    cdDef: ChangeDetectorDefinition;
    locals: Locals;
    constructor(id: string, cdDef: ChangeDetectorDefinition, locals: Locals);
}
/**
 * Get all available ChangeDetectorDefinition objects. Used to pre-generate Dart
 * `ChangeDetector` classes.
 */
export declare function getAllDefinitions(): TestDefinition[];
