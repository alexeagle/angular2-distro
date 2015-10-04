import { ConnectionBackend, Connection } from '../interfaces';
import { ReadyStates } from '../enums';
import { Request } from '../static_request';
import { ResponseOptions } from '../base_response_options';
import { BrowserJsonp } from './browser_jsonp';
export declare class JSONPConnection implements Connection {
    private _dom;
    private baseResponseOptions;
    readyState: ReadyStates;
    request: Request;
    response: any;
    private _id;
    private _script;
    private _responseData;
    private _finished;
    /**
     * @private
     */
    constructor(req: Request, _dom: BrowserJsonp, baseResponseOptions?: ResponseOptions);
    finished(data?: any): void;
}
export declare class JSONPBackend implements ConnectionBackend {
    private _browserJSONP;
    private _baseResponseOptions;
    /**
     * @private
     */
    constructor(_browserJSONP: BrowserJsonp, _baseResponseOptions: ResponseOptions);
    createConnection(request: Request): JSONPConnection;
}
