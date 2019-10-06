import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Artwork, Creator } from './artwork.model';
import { IFormService } from 'src/app/common/models/form-service.interface';
import { Enumeration } from 'src/app/common/models/enumeration.model';
import { CustomValidators } from 'src/app/common/forms/custom-validators';

@Injectable()
export class ArtworkFormService implements IFormService<Artwork> {
  constructor(private fb: FormBuilder) {}

  buildForm(artwork: Artwork): FormGroup {
    return this.fb.group({
      classificationSection: this.buildClassificationSection(artwork),
      titleSection: this.buildTitleSection(artwork),
      creationSection: this.buildCreationSection(artwork),
      measurementsSection: this.buildMeasurementsSection(artwork),
      materialsAndTechniquesSection: this.buildMaterialsAndTechniquesSection(artwork),
      subjectMatterSection: this.buildSubjectMatterSection(artwork),
      locationSection: this.buildLocationSection(artwork),
      visualDocumentationSection: this.buildVisualDocumentationSection(artwork),
      citationSection: this.buildCitationSection(artwork)
    });
  }

  private buildClassificationSection(artwork: Artwork): FormGroup {
    return this.fb.group({
      classificationTerm: [artwork.classificationTerm, [Validators.required]]
    });
  }

  private buildTitleSection(artwork: Artwork): FormGroup {
    return this.fb.group({
      title: [artwork.title, [Validators.required]]
    });
  }

  private buildCreationSection(artwork: Artwork): FormGroup {
    return this.fb.group({
      creatorForm: this.buildCreatorForm(artwork.creator),
      creationEarliestDate: [artwork.creationDate.earliestDate, [Validators.required]],
      creationLatestDate: [artwork.creationDate.latestDate, [Validators.required]]
    });
  }

  private buildCreatorForm(creator: Creator): FormGroup {
    return this.fb.group({
      addNewArtist: false,
      creator: new Enumeration(creator.id, creator.identity),
      identity: creator.identity,
      role: creator.role
    });
  }

  private buildMeasurementsSection(artwork: Artwork): FormGroup {
    return this.fb.group({
      dimensions: [artwork.dimensions, [Validators.required]]
    });
  }

  private buildMaterialsAndTechniquesSection(artwork: Artwork): FormGroup {
    return this.fb.group({
      materialsAndTechniquesDescription: [artwork.materialsAndTechniquesDescription, [Validators.required]]
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

  private buildVisualDocumentationSection(artwork: Artwork): FormGroup {
    return this.fb.group({
      preview: [artwork.preview, [CustomValidators.validUrl]]
    });
  }

  private buildCitationSection(artwork: Artwork): FormGroup {
    return this.fb.group({
      citation: [artwork.citation, [Validators.required]]
    });
  }

  mergeForm(form: FormGroup, artwork: Artwork): Artwork {
    const artworkFormValue = form.value;
    return Object.assign(artwork, {
      ...this.mergeClassificationSection(artworkFormValue.classificationSection),
      ...this.mergeTitleSection(artworkFormValue.titleSection),
      ...this.mergeCreationSection(artworkFormValue.creationSection),
      ...this.mergeMeasurementsSection(artworkFormValue.measurementsSection),
      ...this.mergeMaterialsAndTechniquesSection(artworkFormValue.materialsAndTechniquesSection),
      ...this.mergeSubjectMatterSection(artworkFormValue.subjectMatterSection),
      ...this.mergeLocationSection(artworkFormValue.locationSection),
      ...this.mergeVisualDocumentationSection(artworkFormValue.visualDocumentationSection),
      ...this.mergeCitationSection(artworkFormValue.citationSection)
    });
  }

  private mergeClassificationSection(classificationSection: any): Partial<Artwork> {
    return {
      classificationTerm: classificationSection.classificationTerm
    };
  }

  private mergeTitleSection(titleSection: any): Partial<Artwork> {
    return {
      title: titleSection.title
    };
  }

  private mergeCreationSection(creationSection: any): Partial<Artwork> {
    return {
      creator: this.mergeCreatorSection(creationSection.creatorForm),
      creationDate: {
        earliestDate: creationSection.creationEarliestDate,
        latestDate: creationSection.creationLatestDate
      }
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

  private mergeMaterialsAndTechniquesSection(materialsAndTechniquesSection: any): Partial<Artwork> {
    return {
      materialsAndTechniquesDescription: materialsAndTechniquesSection.materialsAndTechniquesDescription
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
      preview: visualDocumentationSection.preview
    };
  }

  private mergeCitationSection(citationSection: any): Partial<Artwork> {
    return {
      citation: citationSection.citation
    };
  }
}
