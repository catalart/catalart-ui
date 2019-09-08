import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'catalart-switch',
  templateUrl: './catalart-switch.component.html',
  styleUrls: ['./catalart-switch.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: CatalartSwitchComponent, multi: true }]
})
export class CatalartSwitchComponent implements ControlValueAccessor {
  @Input() trueText = 'Yes';
  @Input() falseText = 'No';

  isRightSideChosen: boolean;

  onChange: any = () => {};
  onTouch: any = () => {};

  set value(isRightSideChosen: boolean) {
    this.isRightSideChosen = isRightSideChosen;
    this.onChange(isRightSideChosen);
    this.onTouch(isRightSideChosen);
  }

  writeValue(value: boolean) {
    this.isRightSideChosen = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
