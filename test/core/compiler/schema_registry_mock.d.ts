import { ElementSchemaRegistry } from 'angular2/src/core/compiler/schema/element_schema_registry';
export declare class MockSchemaRegistry implements ElementSchemaRegistry {
    existingProperties: {
        [key: string]: boolean;
    };
    attrPropMapping: {
        [key: string]: string;
    };
    constructor(existingProperties: {
        [key: string]: boolean;
    }, attrPropMapping: {
        [key: string]: string;
    });
    hasProperty(tagName: string, property: string): boolean;
    getMappedPropName(attrName: string): string;
}
