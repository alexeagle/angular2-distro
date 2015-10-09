var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var collection_1 = require('angular2/src/core/facade/collection');
var exceptions_1 = require('angular2/src/core/facade/exceptions');
var lang_1 = require('angular2/src/core/facade/lang');
/**
 * `RouteParams` is an immutable map of parameters for the given route
 * based on the url matcher and optional parameters for that route.
 *
 * You can inject `RouteParams` into the constructor of a component to use it.
 *
 * ## Example
 *
 * ```
 * import {bootstrap, Component, View} from 'angular2/angular2';
 * import {Router, ROUTER_DIRECTIVES, routerBindings, RouteConfig} from 'angular2/router';
 *
 * @Component({...})
 * @View({directives: [ROUTER_DIRECTIVES]})
 * @RouteConfig([
 *  {path: '/user/:id', component: UserCmp, as: 'UserCmp'},
 * ])
 * class AppCmp {}
 *
 * @Component({...})
 * @View({ template: 'user: {{id}}' })
 * class UserCmp {
 *   string: id;
 *   constructor(params: RouteParams) {
 *     this.id = params.get('id');
 *   }
 * }
 *
 * bootstrap(AppCmp, routerBindings(AppCmp));
 * ```
 */
var RouteParams = (function () {
    function RouteParams(params) {
        this.params = params;
    }
    RouteParams.prototype.get = function (param) { return lang_1.normalizeBlank(collection_1.StringMapWrapper.get(this.params, param)); };
    return RouteParams;
})();
exports.RouteParams = RouteParams;
/**
 * `Instruction` is a tree of {@link ComponentInstruction}s with all the information needed
 * to transition each component in the app to a given route, including all auxiliary routes.
 *
 * `Instruction`s can be created using {@link Router#generate}, and can be used to
 * perform route changes with {@link Router#navigateByInstruction}.
 *
 * ## Example
 *
 * ```
 * import {bootstrap, Component, View} from 'angular2/angular2';
 * import {Router, ROUTER_DIRECTIVES, routerBindings, RouteConfig} from 'angular2/router';
 *
 * @Component({...})
 * @View({directives: [ROUTER_DIRECTIVES]})
 * @RouteConfig([
 *  {...},
 * ])
 * class AppCmp {
 *   constructor(router: Router) {
 *     var instruction = router.generate(['/MyRoute']);
 *     router.navigateByInstruction(instruction);
 *   }
 * }
 *
 * bootstrap(AppCmp, routerBindings(AppCmp));
 * ```
 */
var Instruction = (function () {
    function Instruction(component, child, auxInstruction) {
        this.component = component;
        this.child = child;
        this.auxInstruction = auxInstruction;
    }
    /**
     * Returns a new instruction that shares the state of the existing instruction, but with
     * the given child {@link Instruction} replacing the existing child.
     */
    Instruction.prototype.replaceChild = function (child) {
        return new Instruction(this.component, child, this.auxInstruction);
    };
    return Instruction;
})();
exports.Instruction = Instruction;
/**
 * Represents a partially completed instruction during recognition that only has the
 * primary (non-aux) route instructions matched.
 *
 * `PrimaryInstruction` is an internal class used by `RouteRecognizer` while it's
 * figuring out where to navigate.
 */
var PrimaryInstruction = (function () {
    function PrimaryInstruction(component, child, auxUrls) {
        this.component = component;
        this.child = child;
        this.auxUrls = auxUrls;
    }
    return PrimaryInstruction;
})();
exports.PrimaryInstruction = PrimaryInstruction;
function stringifyInstruction(instruction) {
    var params = instruction.component.urlParams.length > 0 ?
        ('?' + instruction.component.urlParams.join('&')) :
        '';
    return instruction.component.urlPath + stringifyAux(instruction) +
        stringifyPrimary(instruction.child) + params;
}
exports.stringifyInstruction = stringifyInstruction;
function stringifyPrimary(instruction) {
    if (lang_1.isBlank(instruction)) {
        return '';
    }
    var params = instruction.component.urlParams.length > 0 ?
        (';' + instruction.component.urlParams.join(';')) :
        '';
    return '/' + instruction.component.urlPath + params + stringifyAux(instruction) +
        stringifyPrimary(instruction.child);
}
function stringifyAux(instruction) {
    var routes = [];
    collection_1.StringMapWrapper.forEach(instruction.auxInstruction, function (auxInstruction, _) {
        routes.push(stringifyPrimary(auxInstruction));
    });
    if (routes.length > 0) {
        return '(' + routes.join('//') + ')';
    }
    return '';
}
/**
 * A `ComponentInstruction` represents the route state for a single component. An `Instruction` is
 * composed of a tree of these `ComponentInstruction`s.
 *
 * `ComponentInstructions` is a public API. Instances of `ComponentInstruction` are passed
 * to route lifecycle hooks, like {@link CanActivate}.
 *
 * `ComponentInstruction`s are [https://en.wikipedia.org/wiki/Hash_consing](hash consed). You should
 * never construct one yourself with "new." Instead, rely on {@link Router/PathRecognizer} to
 * construct `ComponentInstruction`s.
 *
 * You should not modify this object. It should be treated as immutable.
 */
var ComponentInstruction = (function () {
    function ComponentInstruction() {
        this.reuse = false;
    }
    Object.defineProperty(ComponentInstruction.prototype, "componentType", {
        /**
         * Returns the component type of the represented route, or `null` if this instruction
         * hasn't been resolved.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ComponentInstruction.prototype, "specificity", {
        /**
         * Returns the specificity of the route associated with this `Instruction`.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ComponentInstruction.prototype, "terminal", {
        /**
         * Returns `true` if the component type of this instruction has no child {@link RouteConfig},
         * or `false` if it does.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    return ComponentInstruction;
})();
exports.ComponentInstruction = ComponentInstruction;
var ComponentInstruction_ = (function (_super) {
    __extends(ComponentInstruction_, _super);
    function ComponentInstruction_(urlPath, urlParams, _recognizer, params) {
        if (params === void 0) { params = null; }
        _super.call(this);
        this._recognizer = _recognizer;
        this.urlPath = urlPath;
        this.urlParams = urlParams;
        this.params = params;
    }
    Object.defineProperty(ComponentInstruction_.prototype, "componentType", {
        get: function () { return this._recognizer.handler.componentType; },
        enumerable: true,
        configurable: true
    });
    ComponentInstruction_.prototype.resolveComponentType = function () { return this._recognizer.handler.resolveComponentType(); };
    Object.defineProperty(ComponentInstruction_.prototype, "specificity", {
        get: function () { return this._recognizer.specificity; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentInstruction_.prototype, "terminal", {
        get: function () { return this._recognizer.terminal; },
        enumerable: true,
        configurable: true
    });
    ComponentInstruction_.prototype.routeData = function () { return this._recognizer.handler.data; };
    return ComponentInstruction_;
})(ComponentInstruction);
exports.ComponentInstruction_ = ComponentInstruction_;
//# sourceMappingURL=instruction.js.map