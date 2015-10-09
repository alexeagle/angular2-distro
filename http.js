/**
 * @module
 * @description
 * The http module provides services to perform http requests. To get started, see the {@link Http}
 * class.
 */
var core_1 = require('angular2/core');
var http_1 = require('./src/http/http');
var xhr_backend_1 = require('./src/http/backends/xhr_backend');
var jsonp_backend_1 = require('./src/http/backends/jsonp_backend');
var browser_xhr_1 = require('./src/http/backends/browser_xhr');
var browser_jsonp_1 = require('./src/http/backends/browser_jsonp');
var base_request_options_1 = require('./src/http/base_request_options');
var base_response_options_1 = require('./src/http/base_response_options');
var mock_backend_1 = require('./src/http/backends/mock_backend');
exports.MockConnection = mock_backend_1.MockConnection;
exports.MockBackend = mock_backend_1.MockBackend;
var static_request_1 = require('./src/http/static_request');
exports.Request = static_request_1.Request;
var static_response_1 = require('./src/http/static_response');
exports.Response = static_response_1.Response;
var interfaces_1 = require('./src/http/interfaces');
exports.Connection = interfaces_1.Connection;
exports.ConnectionBackend = interfaces_1.ConnectionBackend;
var browser_xhr_2 = require('./src/http/backends/browser_xhr');
exports.BrowserXhr = browser_xhr_2.BrowserXhr;
var base_request_options_2 = require('./src/http/base_request_options');
exports.BaseRequestOptions = base_request_options_2.BaseRequestOptions;
exports.RequestOptions = base_request_options_2.RequestOptions;
var base_response_options_2 = require('./src/http/base_response_options');
exports.BaseResponseOptions = base_response_options_2.BaseResponseOptions;
exports.ResponseOptions = base_response_options_2.ResponseOptions;
var xhr_backend_2 = require('./src/http/backends/xhr_backend');
exports.XHRBackend = xhr_backend_2.XHRBackend;
exports.XHRConnection = xhr_backend_2.XHRConnection;
var jsonp_backend_2 = require('./src/http/backends/jsonp_backend');
exports.JSONPBackend = jsonp_backend_2.JSONPBackend;
exports.JSONPConnection = jsonp_backend_2.JSONPConnection;
var http_2 = require('./src/http/http');
exports.Http = http_2.Http;
exports.Jsonp = http_2.Jsonp;
var headers_1 = require('./src/http/headers');
exports.Headers = headers_1.Headers;
var enums_1 = require('./src/http/enums');
exports.ResponseTypes = enums_1.ResponseTypes;
exports.ReadyStates = enums_1.ReadyStates;
exports.RequestMethods = enums_1.RequestMethods;
var url_search_params_1 = require('./src/http/url_search_params');
exports.URLSearchParams = url_search_params_1.URLSearchParams;
/**
 * Provides a basic set of injectables to use the {@link Http} service in any application.
 *
 * The `HTTP_BINDINGS` should be included either in a component's injector,
 * or in the root injector when bootstrapping an application.
 *
 * ### Example ([live demo](http://plnkr.co/edit/snj7Nv?p=preview))
 *
 * ```
 * import {bootstrap, Component, NgFor, View} from 'angular2/angular2';
 * import {HTTP_BINDINGS, Http} from 'angular2/http';
 *
 * @Component({
 *   selector: 'app',
 *   bindings: [HTTP_BINDINGS]
 * })
 * @View({
 *   template: `
 *     <div>
 *       <h1>People</h1>
 *       <ul>
 *         <li *ng-for="#person of people">
 *           {{person.name}}
 *         </li>
 *       </ul>
 *     </div>
 *   `,
 *   directives: [NgFor]
 * })
 * export class App {
 *   people: Object[];
 *   constructor(http:Http) {
 *     http.get('people.json').subscribe(res => {
 *       this.people = res.json();
 *     });
 *   }
 *   active:boolean = false;
 *   toggleActiveState() {
 *     this.active = !this.active;
 *   }
 * }
 *
 * bootstrap(App)
 *   .catch(err => console.error(err));
 * ```
 *
 * The primary public API included in `HTTP_BINDINGS` is the {@link Http} class.
 * However, other bindings required by `Http` are included,
 * which may be beneficial to override in certain cases.
 *
 * The bindings included in `HTTP_BINDINGS` include:
 *  * {@link Http}
 *  * {@link XHRBackend}
 *  * `BrowserXHR` - Private factory to create `XMLHttpRequest` instances
 *  * {@link RequestOptions} - Bound to {@link BaseRequestOptions} class
 *  * {@link ResponseOptions} - Bound to {@link BaseResponseOptions} class
 *
 * There may be cases where it makes sense to extend the base request options,
 * such as to add a search string to be appended to all URLs.
 * To accomplish this, a new binding for {@link RequestOptions} should
 * be added in the same injector as `HTTP_BINDINGS`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/aCMEXi?p=preview))
 *
 * ```
 * import {bind, bootstrap} from 'angular2/angular2';
 * import {HTTP_BINDINGS, BaseRequestOptions, RequestOptions} from 'angular2/http';
 *
 * class MyOptions extends BaseRequestOptions {
 *   search: string = 'coreTeam=true';
 * }
 *
 * bootstrap(App, [HTTP_BINDINGS, bind(RequestOptions).toClass(MyOptions)])
 *   .catch(err => console.error(err));
 * ```
 *
 * Likewise, to use a mock backend for unit tests, the {@link XHRBackend}
 * binding should be bound to {@link MockBackend}.
 *
 * ### Example ([live demo](http://plnkr.co/edit/7LWALD?p=preview))
 *
 * ```
 * import {bind, Injector} from 'angular2/angular2';
 * import {HTTP_BINDINGS, Http, Response, XHRBackend, MockBackend} from 'angular2/http';
 *
 * var people = [{name: 'Jeff'}, {name: 'Tobias'}];
 *
 * var injector = Injector.resolveAndCreate([
 *   HTTP_BINDINGS,
 *   MockBackend,
 *   bind(XHRBackend).toAlias(MockBackend)
 * ]);
 * var http = injector.get(Http);
 * var backend = injector.get(MockBackend);
 *
 * // Listen for any new requests
 * backend.connections.observer({
 *   next: connection => {
 *     var response = new Response({body: people});
 *     setTimeout(() => {
 *       // Send a response to the request
 *       connection.mockRespond(response);
 *     });
 *   });
 *
 * http.get('people.json').observer({
 *   next: res => {
 *     // Response came from mock backend
 *     console.log('first person', res.json()[0].name);
 *   }
 * });
 * ```
 */
exports.HTTP_BINDINGS = [
    // TODO(pascal): use factory type annotations once supported in DI
    // issue: https://github.com/angular/angular/issues/3183
    core_1.bind(http_1.Http)
        .toFactory(function (xhrBackend, requestOptions) { return new http_1.Http(xhrBackend, requestOptions); }, [xhr_backend_1.XHRBackend, base_request_options_1.RequestOptions]),
    browser_xhr_1.BrowserXhr,
    core_1.bind(base_request_options_1.RequestOptions).toClass(base_request_options_1.BaseRequestOptions),
    core_1.bind(base_response_options_1.ResponseOptions).toClass(base_response_options_1.BaseResponseOptions),
    xhr_backend_1.XHRBackend
];
/**
 * Provides a basic set of bindings to use the {@link Jsonp} service in any application.
 *
 * The `JSONP_BINDINGS` should be included either in a component's injector,
 * or in the root injector when bootstrapping an application.
 *
 * ### Example ([live demo](http://plnkr.co/edit/vmeN4F?p=preview))
 *
 * ```
 * import {Component, NgFor, View} from 'angular2/angular2';
 * import {JSONP_BINDINGS, Jsonp} from 'angular2/http';
 *
 * @Component({
 *   selector: 'app',
 *   bindings: [JSONP_BINDINGS]
 * })
 * @View({
 *   template: `
 *     <div>
 *       <h1>People</h1>
 *       <ul>
 *         <li *ng-for="#person of people">
 *           {{person.name}}
 *         </li>
 *       </ul>
 *     </div>
 *   `,
 *   directives: [NgFor]
 * })
 * export class App {
 *   people: Array<Object>;
 *   constructor(jsonp:Jsonp) {
 *     jsonp.request('people.json').subscribe(res => {
 *       this.people = res.json();
 *     })
 *   }
 * }
 * ```
 *
 * The primary public API included in `JSONP_BINDINGS` is the {@link Jsonp} class.
 * However, other bindings required by `Jsonp` are included,
 * which may be beneficial to override in certain cases.
 *
 * The bindings included in `JSONP_BINDINGS` include:
 *  * {@link Jsonp}
 *  * {@link JSONPBackend}
 *  * `BrowserJsonp` - Private factory
 *  * {@link RequestOptions} - Bound to {@link BaseRequestOptions} class
 *  * {@link ResponseOptions} - Bound to {@link BaseResponseOptions} class
 *
 * There may be cases where it makes sense to extend the base request options,
 * such as to add a search string to be appended to all URLs.
 * To accomplish this, a new binding for {@link RequestOptions} should
 * be added in the same injector as `JSONP_BINDINGS`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/TFug7x?p=preview))
 *
 * ```
 * import {bind, bootstrap} from 'angular2/angular2';
 * import {JSONP_BINDINGS, BaseRequestOptions, RequestOptions} from 'angular2/http';
 *
 * class MyOptions extends BaseRequestOptions {
 *   search: string = 'coreTeam=true';
 * }
 *
 * bootstrap(App, [JSONP_BINDINGS, bind(RequestOptions).toClass(MyOptions)])
 *   .catch(err => console.error(err));
 * ```
 *
 * Likewise, to use a mock backend for unit tests, the {@link JSONPBackend}
 * binding should be bound to {@link MockBackend}.
 *
 * ### Example ([live demo](http://plnkr.co/edit/HDqZWL?p=preview))
 *
 * ```
 * import {bind, Injector} from 'angular2/angular2';
 * import {JSONP_BINDINGS, Jsonp, Response, JSONPBackend, MockBackend} from 'angular2/http';
 *
 * var people = [{name: 'Jeff'}, {name: 'Tobias'}];
 * var injector = Injector.resolveAndCreate([
 *   JSONP_BINDINGS,
 *   MockBackend,
 *   bind(JSONPBackend).toAlias(MockBackend)
 * ]);
 * var jsonp = injector.get(Jsonp);
 * var backend = injector.get(MockBackend);
 *
 * // Listen for any new requests
 * backend.connections.observer({
 *   next: connection => {
 *     var response = new Response({body: people});
 *     setTimeout(() => {
 *       // Send a response to the request
 *       connection.mockRespond(response);
 *     });
 *   });

 * jsonp.get('people.json').observer({
 *   next: res => {
 *     // Response came from mock backend
 *     console.log('first person', res.json()[0].name);
 *   }
 * });
 * ```
 */
exports.JSONP_BINDINGS = [
    // TODO(pascal): use factory type annotations once supported in DI
    // issue: https://github.com/angular/angular/issues/3183
    core_1.bind(http_1.Jsonp)
        .toFactory(function (jsonpBackend, requestOptions) { return new http_1.Jsonp(jsonpBackend, requestOptions); }, [jsonp_backend_1.JSONPBackend, base_request_options_1.RequestOptions]),
    browser_jsonp_1.BrowserJsonp,
    core_1.bind(base_request_options_1.RequestOptions).toClass(base_request_options_1.BaseRequestOptions),
    core_1.bind(base_response_options_1.ResponseOptions).toClass(base_response_options_1.BaseResponseOptions),
    core_1.bind(jsonp_backend_1.JSONPBackend).toClass(jsonp_backend_1.JSONPBackend_)
];
//# sourceMappingURL=http.js.map