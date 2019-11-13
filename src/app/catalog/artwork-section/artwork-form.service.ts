import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Artwork, Creator } from './artwork.model';
import { IFormService } from 'src/app/common/models/form-service.interface';
import { Enumeration } from 'src/app/common/models/enumeration.model';
import { DateAndPlaceFormService } from 'src/app/common/forms/date-and-place-form.service';
import { PreviewFormService } from 'src/app/common/forms/preview-form.service';

@Injectable()
export class ArtworkFormService implements IFormService<Artwork> {
  constructor(
    private fb: FormBuilder,
    private dateAndPlaceFormService: DateAndPlaceFormService,
    private previewFormService: PreviewFormService
  ) {}

  buildForm(artwork: Artwork): FormGroup {
    return this.fb.group({
      classificationSection: this.buildClassificationSection(artwork),
      titleSection: this.buildTitleSection(artwork),
      artistSection: this.buildArtistSection(artwork.creator),
      creationDateSection: this.dateAndPlaceFormService.buildForm(artwork.creationDate),
      measurementsSection: this.buildMeasurementsSection(artwork),
      mediumSection: this.buildMediumSection(artwork),
      subjectMatterSection: this.buildSubjectMatterSection(artwork),
      locationSection: this.buildLocationSection(artwork),
      visualDocumentationSection: this.previewFormService.buildForm(artwork.preview),
      citationSection: this.buildCitationSection(artwork)
    });
  }

  mergeForm(form: FormGroup, artwork: Artwork): Artwork {
    const artworkFormValue = form.value;
    return Object.assign(artwork, {
      ...this.mergeClassificationSection(artworkFormValue.classificationSection),
      ...this.mergeTitleSection(artworkFormValue.titleSection),
      ...this.mergeArtistSection(artworkFormValue.artistSection),
      ...this.mergeCreationDateSection(artworkFormValue.creationDateSection, artwork),
      ...this.mergeMeasurementsSection(artworkFormValue.measurementsSection),
      ...this.mergeMediumSection(artworkFormValue.mediumSection),
      ...this.mergeSubjectMatterSection(artworkFormValue.subjectMatterSection),
      ...this.mergeLocationSection(artworkFormValue.locationSection),
      ...this.mergeVisualDocumentationSection(artworkFormValue.visualDocumentationSection),
      ...this.mergeCitationSection(artworkFormValue.citationSection)
    });
  }

  private buildClassificationSection(artwork: Artwork): FormGroup {
    return this.fb.group({
      style: [artwork.style, [Validators.required]],
      genre: [artwork.genre, [Validators.required]]
    });
  }

  private buildTitleSection(artwork: Artwork): FormGroup {
    return this.fb.group({
      title: [artwork.title, [Validators.required]]
    });
  }

  private buildArtistSection(creator: Creator): FormGroup {
    const form = this.fb.group({
      addNewArtist: false,
      creator: new Enumeration(creator.id, creator.identity),
      identity: creator.identity,
      role: creator.role
    });
    this.watchAddArtistSwitch(form);
    return form;
  }

  private watchAddArtistSwitch(form: FormGroup) {
    const addNewArtistControl = form.get('addNewArtist');
    const creatorControl = form.get('creator');
    const identityControl = form.get('identity');
    const roleControl = form.get('role');

    addNewArtistControl.valueChanges.subscribe(value => {
      if (!!value) {
        creatorControl.setValidators(null);
        identityControl.setValidators([Validators.required]);
        roleControl.setValidators([Validators.required]);
      } else {
        creatorControl.setValidators([Validators.required]);
        identityControl.setValidators(null);
        roleControl.setValidators(null);
      }
      creatorControl.updateValueAndValidity();
      identityControl.updateValueAndValidity();
      roleControl.updateValueAndValidity();
    });

    addNewArtistControl.updateValueAndValidity();
  }

  private buildMeasurementsSection(artwork: Artwork): FormGroup {
    return this.fb.group({
      dimensions: [artwork.dimensions, [Validators.required]]
    });
  }

  private buildMediumSection(artwork: Artwork): FormGroup {
    return this.fb.group({
      medium: [artwork.medium, [Validators.required]]
    });
  }

  private buildSubjectMatterSection(artwork: Artwork): FormGroup {
    return this.fb.group({
      generalSubjectTerms: [artwork.generalSubjectTerms, [Validators.required]]
    });
  }

  private buildLocationSection(artwork: Artwork): FormGroup {
    return this.fb.group({
      currentLocation: [artwork.currentLocation, [Validators.required]]
    });
  }

  private buildCitationSection(artwork: Artwork): FormGroup {
    return this.fb.group({
      citation: [artwork.citation, [Validators.required]]
    });
  }

  private mergeClassificationSection(classificationSection: any): Partial<Artwork> {
    return {
      genre: classificationSection.genre,
      style: classificationSection.style
    };
  }

  private mergeTitleSection(titleSection: any): Partial<Artwork> {
    return {
      title: titleSection.title
    };
  }

  private mergeArtistSection(creationSection: any): Partial<Artwork> {
    return {
      creator: this.mergeCreatorSection(creationSection)
    };
  }

  private mergeCreationDateSection(creationDateSection: any, artwork: Artwork): Partial<Artwork> {
    return {
      creationDate: this.dateAndPlaceFormService.mergeForm(creationDateSection, artwork.creationDate)
    };
  }

  private mergeCreatorSection(creator: any): Creator {
    if (!creator.addNewArtist) {
      return Object.assign(new Creator(), {
        id: creator.creator.id
      });
    }
    return Object.assign(new Creator(), {
      identity: creator.identity,
      role: creator.role
    });
  }

  private mergeMeasurementsSection(measurementsSection: any): Partial<Artwork> {
    return {
      dimensions: measurementsSection.dimensions
    };
  }

  private mergeMediumSection(mediumSection: any): Partial<Artwork> {
    return {
      medium: mediumSection.medium
    };
  }

  private mergeSubjectMatterSection(subjectMatterSection: any): Partial<Artwork> {
    return {
      generalSubjectTerms: subjectMatterSection.generalSubjectTerms
    };
  }

  private mergeLocationSection(locationSection: any): Partial<Artwork> {
    return {
      currentLocation: locationSection.currentLocation
    };
  }

  private mergeVisualDocumentationSection(visualDocumentationSection: any): Partial<Artwork> {
    return {
      preview: this.previewFormService.mergeForm(visualDocumentationSection)
    };
  }

  private mergeCitationSection(citationSection: any): Partial<Artwork> {
    return {
      citation: citationSection.citation
    };
  }
}
