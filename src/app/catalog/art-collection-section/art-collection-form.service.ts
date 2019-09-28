import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IFormService } from 'src/app/common/models/form-service.interface';
import { ArtCollection } from './art-collection.model';
import { Option } from 'src/app/common/models/option.model';

@Injectable()
export class ArtCollectionFormService implements IFormService<ArtCollection> {
  constructor(private fb: FormBuilder) {}

  buildForm(artCollection: ArtCollection): FormGroup {
    return this.fb.group({
      informationSection: this.buildInformationSection(artCollection),
      collectionSection: this.buildCollectionSection(artCollection)
    });
  }

  private buildInformationSection(artCollection: ArtCollection): FormGroup {
    return this.fb.group({
      name: [artCollection.name, [Validators.required]],
      type: [artCollection.type, [Validators.required]],
      description: [artCollection.description, [Validators.required]],
      location: [artCollection.location, [Validators.required]]
    });
  }

  private buildCollectionSection(artCollection: ArtCollection): FormGroup {
    return this.fb.group({
      containsArtCollections: [artCollection.containsArtCollections],
      artwork: [artCollection.artwork]
    });
  }

  mergeForm(form: FormGroup, artCollection: ArtCollection): ArtCollection {
    const artCollectionFormValue = form.value;

    return {
      ...artCollection,
      ...this.mergeInformationSection(artCollectionFormValue.informationSection),
      ...this.mergeCollectionSection(artCollectionFormValue.collectionSection)
    };
  }

  private mergeInformationSection(informationSection: any): Partial<ArtCollection> {
    return {
      name: informationSection.name,
      type: informationSection.type,
      description: informationSection.description,
      location: informationSection.location
    };
  }

  private mergeCollectionSection(collectionSection: any): Partial<ArtCollection> {
    return {
      artwork: collectionSection.artwork
    };
  }
}
