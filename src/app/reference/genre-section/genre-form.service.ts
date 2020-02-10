import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IFormService } from 'src/app/common/models/form-service.interface';
import { Genre } from './genre.model';

@Injectable()
export class GenreFormService implements IFormService<Genre> {
  constructor(private fb: FormBuilder) {}

  buildForm(genre: Genre): FormGroup {
    return this.fb.group({
      base: this.buildBaseSection(genre)
    });
  }

  private buildBaseSection(genre: Genre) {
    return this.fb.group({
      name: [genre.name, Validators.required],
      label: [genre.label, Validators.required],
      description: [genre.description, Validators.maxLength(1000)]
    });
  }

  mergeForm(form: FormGroup, genre: Genre): Genre {
    const genreFormValue = form.value;

    return {
      ...genre,
      ...this.mergeBaseSection(genreFormValue.base)
    };
  }

  mergeBaseSection(baseSection: any): Partial<Genre> {
    return {
      name: baseSection.name,
      label: baseSection.label,
      description: baseSection.description
    };
  }
}
