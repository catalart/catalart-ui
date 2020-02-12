import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IFormService } from 'src/app/common/models/form-service.interface';
import { Style } from './style.model';

@Injectable()
export class StyleFormService implements IFormService<Style> {
  constructor(private fb: FormBuilder) {}

  buildForm(style: Style): FormGroup {
    return this.fb.group({
      base: this.buildBaseSection(style)
    });
  }

  private buildBaseSection(style: Style) {
    return this.fb.group({
      name: [style.name, Validators.required],
      label: [style.label, Validators.required],
      description: [style.description, Validators.maxLength(1000)]
    });
  }

  mergeForm(form: FormGroup, style: Style): Style {
    const styleFormValue = form.value;

    return {
      ...style,
      ...this.mergeBaseSection(styleFormValue.base)
    };
  }

  mergeBaseSection(baseSection: any): Partial<Style> {
    return {
      name: baseSection.name,
      label: baseSection.label,
      description: baseSection.description
    };
  }
}
