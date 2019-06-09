import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { ArtCollectionFormService } from '../art-collection-form.service';

import { ArtCollection } from '../art-collection.model';

@Component({
  selector: 'art-collection-add',
  templateUrl: './art-collection-add.component.html'
})
export class ArtCollectionAddComponent {
  artCollection: ArtCollection;
  artCollectionForm: FormGroup;

  constructor(
    private artCollectionFormService: ArtCollectionFormService,
    private sms: SnackbarMessagingService,
    private router: Router
  ) {
    this.artCollectionForm = this.artCollectionFormService.buildForm(new ArtCollection());
  }

  onSave() {
    const updatedArtCollection = this.artCollectionFormService.mergeForm(this.artCollectionForm, this.artCollection);
    this.sms.displayMessage('Save is not implemented yet');
    this.router.navigateByUrl('art-collections/list');
  }
}
