import { Type } from 'angular2/src/core/facade/lang';
export { NgControlName } from './directives/ng_control_name';
export { NgFormControl } from './directives/ng_form_control';
export { NgModel } from './directives/ng_model';
export { NgControl } from './directives/ng_control';
export { NgControlGroup } from './directives/ng_control_group';
export { NgFormModel } from './directives/ng_form_model';
export { NgForm } from './directives/ng_form';
export { ControlValueAccessor } from './directives/control_value_accessor';
export { DefaultValueAccessor } from './directives/default_value_accessor';
export { CheckboxControlValueAccessor } from './directives/checkbox_value_accessor';
export { SelectControlValueAccessor, NgSelectOption } from './directives/select_control_value_accessor';
export { DefaultValidators } from './directives/validators';
export { NgControlStatus } from './directives/ng_control_status';
/**
 *
 * A list of all the form directives used as part of a `@View` annotation.
 *
 *  This is a shorthand for importing them each individually.
 *
 * ### Example:
 *
 * ```typescript
 * @View({
 *   directives: [FORM_DIRECTIVES]
 * })
 * @Component({
 *   selector: 'my-app'
 * })
 * class MyApp {}
 * ```
 */
export declare const FORM_DIRECTIVES: Type[];
