import { FormGroup } from '@angular/forms';

export interface IFormService<ApiModel> {
  buildForm(apiObject: ApiModel): FormGroup;
  mergeForm(form: FormGroup): ApiModel;
}
