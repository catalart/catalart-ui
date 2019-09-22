import { Component, Input, SimpleChanges, OnChanges, ChangeDetectorRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Option } from '../../models/option.model';
import { _getOptionScrollPosition } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'catalart-multi-select',
  templateUrl: './catalart-multi-select.component.html',
  styleUrls: ['./catalart-multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CatalartMultiSelectComponent,
      multi: true
    }
  ]
})
export class CatalartMultiSelectComponent implements ControlValueAccessor {
  @Input() options: Option[] = [];
  @Input() loading: boolean;
  @Input() selectedOptions: Option[] = [];

  leftSideOptions: Option[] = [];
  rightSideOptions: Option[] = [];

  onChange: any = () => {};
  onTouch: any = () => {};

  set value(options: Option[]) {
    this.selectedOptions = options;
    this.onChange(options);
    this.onTouch(options);
    this.refreshOptions();
  }

  writeValue(value: Option[]) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  drop(event: CdkDragDrop<Option[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.value = [...this.rightSideOptions];
    }
  }

  onMoveAllRight() {
    this.rightSideOptions = [...this.options];
    this.value = this.rightSideOptions;
  }

  onMoveAllLeft() {
    this.leftSideOptions = [...this.options];
    this.value = [];
  }

  private refreshOptions() {
    this.leftSideOptions = [...this.options.filter(o => !this.selectedOptions.some(so => so.id === o.id))];
    this.rightSideOptions = [...this.options.filter(o => this.selectedOptions.some(so => so.id === o.id))];
  }
}
