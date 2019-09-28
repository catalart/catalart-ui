import { Component, Input, SimpleChanges, OnChanges, ChangeDetectorRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Option } from '../../models/option.model';
import { _getOptionScrollPosition } from '@angular/material';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

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
export class CatalartMultiSelectComponent implements ControlValueAccessor, OnChanges {
  @Input() options: Option[] = [];
  @Input() loading: boolean;
  @Input() selectedOptions: Option[] = [];

  leftSideOptions: Option[] = [];
  rightSideOptions: Option[] = [];
  private stagedLeftList: Option[] = [];
  private stagedRightList: Option[] = [];

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.options) {
      this.refreshOptions();
    }
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  set value(options: Option[]) {
    this.selectedOptions = options || [];
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
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.value = [...this.rightSideOptions];
    }
  }

  onMoveAllRight() {
    this.rightSideOptions = [...this.options];
    this.stagedRightList = [];
    this.stagedLeftList = [];
    this.value = this.rightSideOptions;
  }

  onMoveAllLeft() {
    this.leftSideOptions = [...this.options];
    this.stagedRightList = [];
    this.stagedLeftList = [];
    this.value = [];
  }

  stageInLeftList(item: Option, $event) {
    if (this.stagedLeftList.some(stagedItem => item.id === stagedItem.id)) {
      this.stagedLeftList = this.stagedLeftList.filter(stagedItem => item.id !== stagedItem.id);
    } else {
      this.stagedLeftList = [...this.stagedLeftList, item];
    }
  }

  itemInStagedLeftList(item: Option) {
    return this.stagedLeftList.some(stagedItem => item.id === stagedItem.id);
  }

  stageInRightList(item: Option, $event) {
    if (this.stagedRightList.some(stagedItem => item.id === stagedItem.id)) {
      this.stagedRightList = this.stagedRightList.filter(stagedItem => item.id !== stagedItem.id);
    } else {
      this.stagedRightList = [...this.stagedRightList, item];
    }
  }

  itemInStagedRightList(item: Option) {
    return this.stagedRightList.some(stagedItem => item.id === stagedItem.id);
  }

  moveStagedRight() {
    this.rightSideOptions = [...this.rightSideOptions, ...this.stagedLeftList];
    this.leftSideOptions = this.leftSideOptions.filter(option =>
      this.stagedLeftList.some(left => left.id === option.id)
    );
    this.value = [...this.rightSideOptions];
    this.stagedLeftList = [];
  }

  moveStagedLeft() {
    this.leftSideOptions = [...this.leftSideOptions, ...this.stagedRightList];
    this.rightSideOptions = this.rightSideOptions.filter(
      option => !this.stagedRightList.some(right => right.id === option.id)
    );
    this.value = [...this.rightSideOptions];
    this.stagedRightList = [];
  }

  private refreshOptions() {
    this.leftSideOptions = [...this.options.filter(o => !this.selectedOptions.some(so => so.id === o.id))];
    this.rightSideOptions = [...this.options.filter(o => this.selectedOptions.some(so => so.id === o.id))];
  }
}
