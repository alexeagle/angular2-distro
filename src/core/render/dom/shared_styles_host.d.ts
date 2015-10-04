export declare class SharedStylesHost {
    _styles: string[];
    _stylesSet: Set<string>;
    constructor();
    addStyles(styles: string[]): void;
    onStylesAdded(additions: string[]): void;
    getAllStyles(): string[];
}
export declare class DomSharedStylesHost extends SharedStylesHost {
    private _hostNodes;
    constructor(doc: any);
    _addStylesToHost(styles: string[], host: Node): void;
    addHost(hostNode: Node): void;
    removeHost(hostNode: Node): void;
    onStylesAdded(additions: string[]): void;
}
