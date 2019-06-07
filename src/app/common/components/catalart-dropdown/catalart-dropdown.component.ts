import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Enumeration } from '../../models/enumeration.model';

@Component({
  selector: 'catalart-dropdown',
  templateUrl: './catalart-dropdown.component.html',
  styleUrls: ['./catalart-dropdown.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: CatalartDropdownComponent, multi: true }]
})
export class CatalartDropdownComponent implements ControlValueAccessor {
  catalogOptions: Enumeration[] = [];

  onChange: any = () => {};
  onTouch: any = () => {};

  set value(catalogOptions: Enumeration[]) {
    this.catalogOptions = catalogOptions;
    this.onChange(catalogOptions);
    this.onTouch(catalogOptions);
  }

  writeValue(value: Enumeration[]) {
    this.value = value;
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
