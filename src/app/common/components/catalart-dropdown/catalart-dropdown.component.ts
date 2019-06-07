import { Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Enumeration } from '../../models/enumeration.model';

@Component({
  selector: 'catalart-dropdown',
  templateUrl: './catalart-dropdown.component.html',
  styleUrls: ['./catalart-dropdown.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: CatalartDropdownComponent, multi: true }]
})
export class CatalartDropdownComponent implements ControlValueAccessor {
  @Input() options: Enumeration[] = [];
  @Input() placeholderText: string;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedOption: [{}, [Validators.required]]
    });
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  set value(option: Enumeration) {
    this.selectedOption.patchValue(option);
    this.onChange(option);
    this.onTouch(option);
  }

  writeValue(value: Enumeration) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  compareFn(e1: Enumeration, e2: Enumeration): boolean {
    return e1 && e2 && e1.id === e2.id;
  }

  get selectedOption() {
    return this.form.get('selectedOption');
  }
}
