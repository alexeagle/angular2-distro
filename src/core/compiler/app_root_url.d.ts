/**
 * Specifies app root url for the application.
 *
 * Used by the {@link Compiler} when resolving HTML and CSS template URLs.
 *
 * This interface can be overridden by the application developer to create custom behavior.
 *
 * See {@link Compiler}
 */
export declare class AppRootUrl {
    private _value;
    constructor(value: string);
    /**
     * Returns the base URL of the currently running application.
     */
    value: string;
}
