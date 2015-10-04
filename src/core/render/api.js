(function (ViewType) {
    // A view that contains the host element with bound component directive.
    // Contains a COMPONENT view
    ViewType[ViewType["HOST"] = 0] = "HOST";
    // The view of the component
    // Can contain 0 to n EMBEDDED views
    ViewType[ViewType["COMPONENT"] = 1] = "COMPONENT";
    // A view that is embedded into another View via a <template> element
    // inside of a COMPONENT view
    ViewType[ViewType["EMBEDDED"] = 2] = "EMBEDDED";
})(exports.ViewType || (exports.ViewType = {}));
var ViewType = exports.ViewType;
/**
 * Represents an Angular ProtoView in the Rendering Context.
 *
 * When you implement a custom {@link Renderer}, `RenderProtoViewRef` specifies what Render View
 * your renderer should create.
 *
 * `RenderProtoViewRef` is a counterpart to {@link ProtoViewRef} available in the Application
 * Context. But unlike `ProtoViewRef`, `RenderProtoViewRef` contains all static nested Proto Views
 * that are recursively merged into a single Render Proto View.

 *
 * <!-- TODO: this is created by Renderer#createProtoView in the new compiler -->
 */
// TODO(i): refactor this to an interface
var RenderProtoViewRef = (function () {
    /**
     * @private
     */
    function RenderProtoViewRef() {
    }
    return RenderProtoViewRef;
})();
exports.RenderProtoViewRef = RenderProtoViewRef;
/**
 * Represents a list of sibling Nodes that can be moved by the {@link Renderer} independently of
 * other Render Fragments.
 *
 * Any {@link RenderView} has one Render Fragment.
 *
 * Additionally any View with an Embedded View that contains a {@link NgContent View Projection}
 * results in additional Render Fragment.
 */
/*
  <div>foo</div>
  {{bar}}


  <div>foo</div> -> view 1 / fragment 1
  <ul>
    <template ng-for>
      <li>{{fg}}</li> -> view 2 / fragment 1
    </template>
  </ul>
  {{bar}}


  <div>foo</div> -> view 1 / fragment 1
  <ul>
    <template ng-if>
      <li><ng-content></></li> -> view 1 / fragment 2
    </template>
    <template ng-for>
      <li><ng-content></></li> ->
      <li></li>                -> view 1 / fragment 2 + view 2 / fragment 1..n-1
    </template>
  </ul>
  {{bar}}
 */
// TODO(i): refactor into an interface
var RenderFragmentRef = (function () {
    function RenderFragmentRef() {
    }
    return RenderFragmentRef;
})();
exports.RenderFragmentRef = RenderFragmentRef;
/**
 * Represents an Angular View in the Rendering Context.
 *
 * `RenderViewRef` specifies to the {@link Renderer} what View to update or destroy.
 *
 * Unlike a {@link ViewRef} available in the Application Context, Render View contains all the
 * static Component Views that have been recursively merged into a single Render View.
 *
 * Each `RenderViewRef` contains one or more {@link RenderFragmentRef Render Fragments}, these
 * Fragments are created, hydrated, dehydrated and destroyed as a single unit together with the
 * View.
 */
// TODO(i): refactor into an interface
var RenderViewRef = (function () {
    function RenderViewRef() {
    }
    return RenderViewRef;
})();
exports.RenderViewRef = RenderViewRef;
/**
 * Defines template and style encapsulation options available for Component's {@link View}.
 *
 * See {@link ViewMetadata#encapsulation}.
 */
(function (ViewEncapsulation) {
    /**
     * Emulate `Native` scoping of styles by adding an attribute containing surrogate id to the Host
     * Element and pre-processing the style rules provided via
     * {@link ViewMetadata#styles} or {@link ViewMetadata#stylesUrls}, and adding the new Host Element
     * attribute to all selectors.
     *
     * This is the default option.
     */
    ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
    /**
     * Use the native encapsulation mechanism of the renderer.
     *
     * For the DOM this means using [Shadow DOM](https://w3c.github.io/webcomponents/spec/shadow/) and
     * creating a ShadowRoot for Component's Host Element.
     */
    ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
    /**
     * Don't provide any template or style encapsulation.
     */
    ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
})(exports.ViewEncapsulation || (exports.ViewEncapsulation = {}));
var ViewEncapsulation = exports.ViewEncapsulation;
exports.VIEW_ENCAPSULATION_VALUES = [ViewEncapsulation.Emulated, ViewEncapsulation.Native, ViewEncapsulation.None];
/**
 * Container class produced by a {@link Renderer} when creating a Render View.
 *
 * An instance of `RenderViewWithFragments` contains a {@link RenderViewRef} and an array of
 * {@link RenderFragmentRef}s belonging to this Render View.
 */
// TODO(i): refactor this by RenderViewWithFragments and adding fragments directly to RenderViewRef
var RenderViewWithFragments = (function () {
    function RenderViewWithFragments(
        /**
         * Reference to the {@link RenderViewRef}.
         */
        viewRef, 
        /**
         * Array of {@link RenderFragmentRef}s ordered in the depth-first order.
         */
        fragmentRefs) {
        this.viewRef = viewRef;
        this.fragmentRefs = fragmentRefs;
    }
    return RenderViewWithFragments;
})();
exports.RenderViewWithFragments = RenderViewWithFragments;
/**
 * Injectable service that provides a low-level interface for modifying the UI.
 *
 * Use this service to bypass Angular's templating and make custom UI changes that can't be
 * expressed declaratively. For example if you need to set a property or an attribute whose name is
 * not statically known, use {@link #setElementProperty} or {@link #setElementAttribute}
 * respectively.
 *
 * If you are implementing a custom renderer, you must implement this interface.
 *
 * The default Renderer implementation is {@link DomRenderer}. Also see {@link WebWorkerRenderer}.
 */
var Renderer = (function () {
    /**
     * @private
     *
     * Private constructor is required so that this class gets converted into an interface in our
     * public api.
     *
     * We implement this a class so that we have a DI token available for binding.
     */
    function Renderer() {
    }
    ;
    /**
     * Registers a component template represented as arrays of {@link RenderTemplateCmd}s and styles
     * with the Renderer.
     *
     * Once a template is registered it can be referenced via {@link RenderBeginComponentCmd} when
     * {@link #createProtoView creating Render ProtoView}.
     */
    Renderer.prototype.registerComponentTemplate = function (templateId, commands, styles) { };
    /**
     * Creates a {@link RenderProtoViewRef} from an array of {@link RenderTemplateCmd}`s.
     */
    Renderer.prototype.createProtoView = function (cmds) { return null; };
    /**
     * Creates a Root Host View based on the provided `hostProtoViewRef`.
     *
     * `fragmentCount` is the number of nested {@link RenderFragmentRef}s in this View. This parameter
     * is non-optional so that the renderer can create a result synchronously even when application
     * runs in a different context (e.g. in a Web Worker).
     *
     * `hostElementSelector` is a (CSS) selector for querying the main document to find the Host
     * Element. The newly created Root Host View should be attached to this element.
     *
     * Returns an instance of {@link RenderViewWithFragments}, representing the Render View.
     */
    Renderer.prototype.createRootHostView = function (hostProtoViewRef, fragmentCount, hostElementSelector) {
        return null;
    };
    /**
     * Creates a Render View based on the provided `protoViewRef`.
     *
     * `fragmentCount` is the number of nested {@link RenderFragmentRef}s in this View. This parameter
     * is non-optional so that the renderer can create a result synchronously even when application
     * runs in a different context (e.g. in a Web Worker).
     *
     * Returns an instance of {@link RenderViewWithFragments}, representing the Render View.
     */
    Renderer.prototype.createView = function (protoViewRef, fragmentCount) {
        return null;
    };
    /**
     * Destroys a Render View specified via `viewRef`.
     *
     * This operation should be performed only on a View that has already been dehydrated and
     * all of its Render Fragments have been detached.
     *
     * Destroying a View indicates to the Renderer that this View is not going to be referenced in any
     * future operations. If the Renderer created any renderer-specific objects for this View, these
     * objects should now be destroyed to prevent memory leaks.
     */
    Renderer.prototype.destroyView = function (viewRef) { };
    /**
     * Attaches the Nodes of a Render Fragment after the last Node of `previousFragmentRef`.
     */
    Renderer.prototype.attachFragmentAfterFragment = function (previousFragmentRef, fragmentRef) { };
    /**
     * Attaches the Nodes of the Render Fragment after an Element.
     */
    Renderer.prototype.attachFragmentAfterElement = function (elementRef, fragmentRef) { };
    /**
     * Detaches the Nodes of a Render Fragment from their parent.
     *
     * This operations should be called only on a View that has been already
     * {@link #dehydrateView dehydrated}.
     */
    Renderer.prototype.detachFragment = function (fragmentRef) { };
    /**
     * Notifies a custom Renderer to initialize a Render View.
     *
     * This method is called by Angular after a Render View has been created, or when a previously
     * dehydrated Render View is about to be reused.
     */
    Renderer.prototype.hydrateView = function (viewRef) { };
    /**
     * Notifies a custom Renderer that a Render View is no longer active.
     *
     * This method is called by Angular before a Render View will be destroyed, or when a hydrated
     * Render View is about to be put into a pool for future reuse.
     */
    Renderer.prototype.dehydrateView = function (viewRef) { };
    /**
     * Returns the underlying native element at the specified `location`, or `null` if direct access
     * to native elements is not supported (e.g. when the application runs in a web worker).
     *
     * <div class="callout is-critical">
     *   <header>Use with caution</header>
     *   <p>
     *    Use this api as the last resort when direct access to DOM is needed. Use templating and
     *    data-binding, or other {@link Renderer} methods instead.
     *   </p>
     *   <p>
     *    Relying on direct DOM access creates tight coupling between your application and rendering
     *    layers which will make it impossible to separate the two and deploy your application into a
     *    web worker.
     *   </p>
     * </div>
     */
    Renderer.prototype.getNativeElementSync = function (location) { return null; };
    /**
     * Sets a property on the Element specified via `location`.
     */
    Renderer.prototype.setElementProperty = function (location, propertyName, propertyValue) { };
    /**
     * Sets an attribute on the Element specified via `location`.
     *
     * If `attributeValue` is `null`, the attribute is removed.
     */
    Renderer.prototype.setElementAttribute = function (location, attributeName, attributeValue) { };
    /**
     * Sets a (CSS) class on the Element specified via `location`.
     *
     * `isAdd` specifies if the class should be added or removed.
     */
    Renderer.prototype.setElementClass = function (location, className, isAdd) { };
    /**
     * Sets a (CSS) inline style on the Element specified via `location`.
     *
     * If `styleValue` is `null`, the style is removed.
     */
    Renderer.prototype.setElementStyle = function (location, styleName, styleValue) { };
    /**
     * Calls a method on the Element specified via `location`.
     */
    Renderer.prototype.invokeElementMethod = function (location, methodName, args) { };
    /**
     * Sets the value of an interpolated TextNode at the specified index to the `text` value.
     *
     * `textNodeIndex` is the depth-first index of the Node among interpolated Nodes in the Render
     * View.
     */
    Renderer.prototype.setText = function (viewRef, textNodeIndex, text) { };
    /**
     * Sets a dispatcher to relay all events triggered in the given Render View.
     *
     * Each Render View can have only one Event Dispatcher, if this method is called multiple times,
     * the last provided dispatcher will be used.
     */
    Renderer.prototype.setEventDispatcher = function (viewRef, dispatcher) { };
    return Renderer;
})();
exports.Renderer = Renderer;
//# sourceMappingURL=api.js.map