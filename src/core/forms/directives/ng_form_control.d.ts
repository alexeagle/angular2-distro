import { EventEmitter } from 'angular2/src/core/facade/async';
import { OnChanges } from 'angular2/lifecycle_hooks';
import { SimpleChange } from 'angular2/src/core/change_detection';
import { NgControl } from './ng_control';
import { Control } from '../model';
import { ControlValueAccessor } from './control_value_accessor';
/**
 * Binds an existing {@link Control} to a DOM element.
 *
 * ### Example ([live demo](http://plnkr.co/edit/jcQlZ2tTh22BZZ2ucNAT?p=preview))
 *
 * In this example, we bind the control to an input element. When the value of the input element
 * changes, the value of the control will reflect that change. Likewise, if the value of the
 * control changes, the input element reflects that change.
 *
 *  ```typescript
 * @Component({
 *   selector: 'my-app'
 * })
 * @View({
 *   template: `
 *     <div>
 *       <h2>NgFormControl Example</h2>
 *       <form>
 *         <p>Element with existing control: <input type="text"
 * [ng-form-control]="loginControl"></p>
 *         <p>Value of existing control: {{loginControl.value}}</p>
 *       </form>
 *     </div>
 *   `,
 *   directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
 * })
 * export class App {
 *   loginControl: Control = new Control('');
 * }
 *  ```
 *
 * # ng-model
 *
 * We can also use `ng-model` to bind a domain model to the form.
 *
 * ### Example ([live demo](http://plnkr.co/edit/yHMLuHO7DNgT8XvtjTDH?p=preview))
 *
 *  ```typescript
 * @Component({selector: "login-comp"})
 * @View({
 *      directives: [FORM_DIRECTIVES],
 *      template: "<input type='text' [ng-form-control]='loginControl' [(ng-model)]='login'>"
 *      })
 * class LoginComp {
 *  loginControl: Control = new Control('');
 *  login:string;
 * }
 *  ```
 */
export declare class NgFormControl extends NgControl implements OnChanges {
    form: Control;
    update: EventEmitter;
    _added: boolean;
    model: any;
    viewModel: any;
    validators: Function[];
    constructor(validators: Function[], valueAccessors: ControlValueAccessor[]);
    onChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    path: string[];
    control: Control;
    validator: Function;
    viewToModelUpdate(newValue: any): void;
}
