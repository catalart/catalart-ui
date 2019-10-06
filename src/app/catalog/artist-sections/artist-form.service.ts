import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IFormService } from 'src/app/common/models/form-service.interface';
import { Artist } from './artist.model';
import { CustomValidators } from 'src/app/common/forms/custom-validators';

@Injectable()
export class ArtistFormService implements IFormService<Artist> {
  constructor(private fb: FormBuilder) {}

  buildForm(artist: Artist): FormGroup {
    return this.fb.group({
      generalInformation: this.buildGeneralInformationSection(artist)
    });
  }

  mergeForm(form: FormGroup, artist: Artist): Artist {
    const artistFormValue = form.value;

    return {
      ...artist,
      ...this.mergeGeneralInformationSection(artistFormValue.generalInformation)
    };
  }

  private buildGeneralInformationSection(artist: Artist): FormGroup {
    return this.fb.group({
      identity: [artist.identity, [Validators.required]],
      role: [artist.role, [Validators.required]],
      preview: [artist.preview, [Validators.required, CustomValidators.validUrl]]
    });
  }

  private mergeGeneralInformationSection(generalInformationSection: any): Partial<Artist> {
    return {
      identity: generalInformationSection.identity,
      role: generalInformationSection.role,
      preview: generalInformationSection.preview
    };
  }
}
