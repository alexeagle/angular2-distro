/**
 * @module
 * @description
 * This module is used for handling user input, by defining and building a {@link ControlGroup} that
 * consists of
 * {@link Control} objects, and mapping them onto the DOM. {@link Control} objects can then be used
 * to read information
 * from the form DOM elements.
 *
 * This module is not included in the `angular2` module; you must import the forms module
 * explicitly.
 *
 */
export { AbstractControl, Control, ControlGroup, ControlArray } from './forms/model';
export { AbstractControlDirective } from './forms/directives/abstract_control_directive';
export { Form } from './forms/directives/form_interface';
export { ControlContainer } from './forms/directives/control_container';
export { NgControlName } from './forms/directives/ng_control_name';
export { NgFormControl } from './forms/directives/ng_form_control';
export { NgModel } from './forms/directives/ng_model';
export { NgControl } from './forms/directives/ng_control';
export { NgControlGroup } from './forms/directives/ng_control_group';
export { NgFormModel } from './forms/directives/ng_form_model';
export { NgForm } from './forms/directives/ng_form';
export { ControlValueAccessor } from './forms/directives/control_value_accessor';
export { DefaultValueAccessor } from './forms/directives/default_value_accessor';
export { NgControlStatus } from './forms/directives/ng_control_status';
export { CheckboxControlValueAccessor } from './forms/directives/checkbox_value_accessor';
export { NgSelectOption, SelectControlValueAccessor } from './forms/directives/select_control_value_accessor';
export { FORM_DIRECTIVES } from './forms/directives';
export { NG_VALIDATORS, Validators } from './forms/validators';
export { DefaultValidators } from './forms/directives/validators';
export { FormBuilder } from './forms/form_builder';
import { Type } from './facade/lang';
/**
 * Shorthand set of bindings used for building Angular forms.
 *
 * ### Example:
 *
 * ```typescript
 * bootstrap(MyApp, [FORM_BINDINGS]);
 * ```
 */
export declare const FORM_BINDINGS: Type[];
