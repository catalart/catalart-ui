import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IFormService } from 'src/app/common/models/form-service.interface';
import { Artist } from './artist.model';
import { DateAndPlaceFormService } from 'src/app/common/forms/date-and-place-form.service';
import { PreviewFormService } from 'src/app/common/forms/preview-form.service';

@Injectable()
export class ArtistFormService implements IFormService<Artist> {
  constructor(
    private fb: FormBuilder,
    private dateAndPlaceFormService: DateAndPlaceFormService,
    private previewFormService: PreviewFormService
  ) {}

  buildForm(artist: Artist): FormGroup {
    return this.fb.group({
      generalInformation: this.buildGeneralInformationSection(artist),
      born: this.dateAndPlaceFormService.buildForm(artist.born, { forceDateToBeSelected: true }),
      died: this.dateAndPlaceFormService.buildForm(artist.died),
      preview: this.previewFormService.buildForm(artist.preview),
      artMovements: this.buildArtMovementsSection(artist),
      artInstitutions: this.buildArtInstitutionsSection(artist)
    });
  }

  mergeForm(form: FormGroup, artist: Artist): Artist {
    const artistFormValue = form.value;

    return {
      ...artist,
      ...this.mergeGeneralInformationSection(artistFormValue.generalInformation),
      ...this.mergeBirthInformation(form.get('born') as FormGroup, artist),
      ...this.mergeDeathInformation(form.get('died') as FormGroup, artist),
      ...this.mergeArtInstitutionsSection(artistFormValue.artInstitutions),
      ...this.mergeArtMovementsSection(artistFormValue.artMovements),
      ...this.mergePreviewSection(form.get('preview') as FormGroup)
    };
  }

  private buildGeneralInformationSection(artist: Artist): FormGroup {
    return this.fb.group({
      identity: [artist.identity, [Validators.required]],
      role: [artist.role, [Validators.required]],
      nationality: [artist.nationality]
    });
  }

  private buildArtMovementsSection(artist: Artist): FormGroup {
    return this.fb.group({
      artMovements: [artist.artMovements || []]
    });
  }

  private buildArtInstitutionsSection(artist: Artist): FormGroup {
    return this.fb.group({
      artInstitutions: [artist.artInstitutions || []]
    });
  }

  private mergeGeneralInformationSection(generalInformationSection: any): Partial<Artist> {
    return {
      identity: generalInformationSection.identity,
      role: generalInformationSection.role,
      nationality: generalInformationSection.nationality
    };
  }

  private mergeBirthInformation(birthInformationSection: FormGroup, artist: Artist): Partial<Artist> {
    return {
      born: this.dateAndPlaceFormService.mergeForm(birthInformationSection, artist.born)
    };
  }

  private mergeDeathInformation(birthInformationSection: FormGroup, artist: Artist): Partial<Artist> {
    return {
      died: this.dateAndPlaceFormService.mergeForm(birthInformationSection, artist.died)
    };
  }

  private mergeArtInstitutionsSection(artInstitutionsSection: any): Partial<Artist> {
    return {
      artInstitutions: [...artInstitutionsSection.artInstitutions]
    };
  }

  private mergeArtMovementsSection(artInstitutionsSection: any): Partial<Artist> {
    return {
      artMovements: [...artInstitutionsSection.artMovements]
    };
  }

  private mergePreviewSection(previewSection: FormGroup): Partial<Artist> {
    return {
      preview: this.previewFormService.mergeForm(previewSection)
    };
  }
}
