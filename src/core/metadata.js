/**
 * This indirection is needed to free up Component, etc symbols in the public API
 * to be used by the decorator versions of these annotations.
 */
var di_1 = require('./metadata/di');
exports.QueryMetadata = di_1.QueryMetadata;
exports.ContentChildrenMetadata = di_1.ContentChildrenMetadata;
exports.ContentChildMetadata = di_1.ContentChildMetadata;
exports.ViewChildrenMetadata = di_1.ViewChildrenMetadata;
exports.ViewQueryMetadata = di_1.ViewQueryMetadata;
exports.ViewChildMetadata = di_1.ViewChildMetadata;
exports.AttributeMetadata = di_1.AttributeMetadata;
var directives_1 = require('./metadata/directives');
exports.ComponentMetadata = directives_1.ComponentMetadata;
exports.DirectiveMetadata = directives_1.DirectiveMetadata;
exports.PipeMetadata = directives_1.PipeMetadata;
exports.InputMetadata = directives_1.InputMetadata;
exports.OutputMetadata = directives_1.OutputMetadata;
exports.HostBindingMetadata = directives_1.HostBindingMetadata;
exports.HostListenerMetadata = directives_1.HostListenerMetadata;
var view_1 = require('./metadata/view');
exports.ViewMetadata = view_1.ViewMetadata;
exports.ViewEncapsulation = view_1.ViewEncapsulation;
var di_2 = require('./metadata/di');
var directives_2 = require('./metadata/directives');
var view_2 = require('./metadata/view');
var decorators_1 = require('./util/decorators');
/**
 * {@link ComponentMetadata} factory function.
 */
exports.Component = decorators_1.makeDecorator(directives_2.ComponentMetadata, function (fn) { return fn.View = exports.View; });
/**
 * {@link DirectiveMetadata} factory function.
 */
exports.Directive = decorators_1.makeDecorator(directives_2.DirectiveMetadata);
/**
 * {@link ViewMetadata} factory function.
 */
exports.View = decorators_1.makeDecorator(view_2.ViewMetadata, function (fn) { return fn.View = exports.View; });
/**
 * {@link AttributeMetadata} factory function.
 */
exports.Attribute = decorators_1.makeParamDecorator(di_2.AttributeMetadata);
/**
 * {@link QueryMetadata} factory function.
 */
exports.Query = decorators_1.makeParamDecorator(di_2.QueryMetadata);
/**
 * {@link ContentChildrenMetadata} factory function.
 */
exports.ContentChildren = decorators_1.makePropDecorator(di_2.ContentChildrenMetadata);
/**
 * {@link ContentChildMetadata} factory function.
 */
exports.ContentChild = decorators_1.makePropDecorator(di_2.ContentChildMetadata);
/**
 * {@link ViewChildrenMetadata} factory function.
 */
exports.ViewChildren = decorators_1.makePropDecorator(di_2.ViewChildrenMetadata);
/**
 * {@link ViewChildMetadata} factory function.
 */
exports.ViewChild = decorators_1.makePropDecorator(di_2.ViewChildMetadata);
/**
 * {@link di/ViewQueryMetadata} factory function.
 */
exports.ViewQuery = decorators_1.makeParamDecorator(di_2.ViewQueryMetadata);
/**
 * {@link PipeMetadata} factory function.
 */
exports.Pipe = decorators_1.makeDecorator(directives_2.PipeMetadata);
/**
 * {@link InputMetadata} factory function.
 *
 * See {@link InputMetadata}.
 */
exports.Input = decorators_1.makePropDecorator(directives_2.InputMetadata);
/**
 * {@link OutputMetadata} factory function.
 *
 * See {@link OutputMetadatas}.
 */
exports.Output = decorators_1.makePropDecorator(directives_2.OutputMetadata);
/**
 * {@link HostBindingMetadata} factory function.
 */
exports.HostBinding = decorators_1.makePropDecorator(directives_2.HostBindingMetadata);
/**
 * {@link HostListenerMetadata} factory function.
 */
exports.HostListener = decorators_1.makePropDecorator(directives_2.HostListenerMetadata);
//# sourceMappingURL=metadata.js.map