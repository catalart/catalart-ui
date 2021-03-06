import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';
import { SnackbarMessagingService } from '../../services/snackbar-messaging.service';

@Component({
  selector: 'catalart-tags',
  templateUrl: './catalart-tags.component.html',
  styleUrls: ['./catalart-tags.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: CatalartTagsComponent, multi: true }]
})
export class CatalartTagsComponent implements ControlValueAccessor {
  tags: string[] = [];
  tagForm: FormGroup;

  constructor(private fb: FormBuilder, private sms: SnackbarMessagingService) {
    this.tagForm = this.fb.group({
      tags: []
    });
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  set value(tags: string[]) {
    this.tags = tags;
    this.onChange(tags);
    this.onTouch(tags);
  }

  removeTag(tag: string) {
    this.value = this.tags.filter(t => t !== tag);
  }

  addTag(tag: string) {
    if (!!this.tags && this.tags.length > 0) {
      this.value = Array.from(new Set([...this.tags, tag]));
    } else {
      this.value = [tag];
    }
  }

  onEnter() {
    const tag = this.tagForm.get('tags').value;
    if (tag.length > 2) {
      this.addTag(tag);
      this.tagForm.get('tags').patchValue('');
    } else {
      this.sms.displayWarningMessage('An entered tags must be at least 3 characters');
    }
  }

  writeValue(value: string[]) {
    this.value = value;
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
