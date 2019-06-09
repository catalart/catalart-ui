import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Artwork } from './artwork.model';
import { IFormService } from 'src/app/common/models/form-service.interface';

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
      creatorIdentity: [artwork.creator.identity, [Validators.required]],
      creationRole: [artwork.creator.role, [Validators.required]],
      creationEarliestDate: [artwork.creationDate.earliestDate, [Validators.required]],
      creationLatestDate: [artwork.creationDate.latestDate, [Validators.required]]
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
      preview: artwork.preview
    });
  }

  private buildCitationSection(artwork: Artwork): FormGroup {
    return this.fb.group({
      citation: [artwork.citation, [Validators.required]]
    });
  }

  mergeForm(form: FormGroup, artwork: Artwork): Artwork {
    const artworkFormValue = form.value;
    return {
      ...artwork,
      ...this.mergeClassificationSection(artworkFormValue.classificationSection),
      ...this.mergeTitleSection(artworkFormValue.titleSection),
      ...this.mergeCreationSection(artworkFormValue.creationSection),
      ...this.mergeMeasurementsSection(artworkFormValue.measurementsSection),
      ...this.mergeMaterialsAndTechniquesSection(form),
      ...this.mergeSubjectMatterSection(form),
      ...this.mergeLocationSection(form),
      ...this.mergeVisualDocumentationSection(form),
      ...this.mergeCitationSection(form)
    };
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
      creator: {
        identity: creationSection.creatorIdentity,
        role: creationSection.role
      },
      creationDate: {
        earliestDate: creationSection.creationEarliestDate,
        latestDate: creationSection.creationLatestDate
      }
    };
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
