import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Artwork } from './artwork.model';
import { IFormService } from 'src/app/common/models/form-service.interface';

@Injectable()
export class ArtworkFormService implements IFormService<Artwork> {
  constructor(private fb: FormBuilder) {}

  buildForm(artwork: Artwork): FormGroup {
    return this.fb.group({
      objectSection: this.fb.group({
        catalogLevel: [artwork.catalogLevel, [Validators.required]],
        objectType: [artwork.objectType, [Validators.required]]
      }),
      classificationSection: this.fb.group({
        classificationTerm: [artwork.classificationTerm, [Validators.required]]
      }),
      titleSection: this.fb.group({
        title: [artwork.title, [Validators.required]]
      }),
      creationSection: this.fb.group({
        creatorIdentity: [artwork.creator.identity, [Validators.required]],
        creationRole: [artwork.creator.role, [Validators.required]],
        creationEarliestDate: [artwork.creationDate.earliestDate, [Validators.required]],
        creationLatestDate: [artwork.creationDate.latestDate, [Validators.required]]
      }),
      measurementsSection: this.fb.group({
        dimensions: [artwork.dimensions, [Validators.required]]
      }),
      materialsAndTechniquesSection: this.fb.group({
        materialsAndTechniquesDescription: [artwork.materialsAndTechniquesDescription, [Validators.required]]
      }),
      subjectMatterSection: this.fb.group({
        generalSubjectTerms: [artwork.generalSubjectTerms, [Validators.required]]
      }),
      locationSection: this.fb.group({
        currentLocation: [artwork.currentLocation, [Validators.required]]
      }),
      visualDocumentationSection: this.fb.group({
        preview: artwork.preview
      }),
      citationSection: this.fb.group({
        citation: [artwork.citation, [Validators.required]]
      })
    });
  }

  mergeForm(form: FormGroup): Artwork {
    return null;
  }
}
