import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IFormService } from 'src/app/common/models/form-service.interface';
import { Preview } from '../models/preview.model';
import { CustomValidators } from './custom-validators';

@Injectable({
  providedIn: 'root'
})
export class PreviewFormService implements IFormService<Preview> {
  constructor(private fb: FormBuilder) {}

  buildForm(preview: Preview = new Preview()): FormGroup {
    return this.fb.group({
      preview: [preview.url, CustomValidators.validUrl]
    });
  }

  mergeForm(form: any): Preview {
    const previewFormValue = form instanceof FormGroup ? form.value : form;

    return {
      url: previewFormValue.preview
    };
  }
}
