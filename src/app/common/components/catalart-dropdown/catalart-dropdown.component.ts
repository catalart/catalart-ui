import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Enumeration } from '../../models/enumeration.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'catalart-dropdown',
  templateUrl: './catalart-dropdown.component.html',
  styleUrls: ['./catalart-dropdown.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: CatalartDropdownComponent, multi: true }]
})
export class CatalartDropdownComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() options: Enumeration[] = [];
  @Input() placeholderText: string;
  @Input() loading: boolean;

  form: FormGroup;
  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedOption: [{}, [Validators.required]]
    });
  }

  ngOnInit() {
    this.watchForm();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  set value(option: Enumeration) {
    this.selectedOption.patchValue(option, { emitEvent: false });
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

  private watchForm() {
    this.form.valueChanges.pipe(takeUntil(this.destroyed)).subscribe(() => {
      this.value = this.selectedOption.value;
    });
  }

  get selectedOption() {
    return this.form.get('selectedOption');
  }
}
