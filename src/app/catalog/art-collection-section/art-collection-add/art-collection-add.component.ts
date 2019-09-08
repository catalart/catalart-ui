import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { ArtCollectionFormService } from '../art-collection-form.service';
import { ArtCollectionService } from '../art-collection.service';

import { ArtCollection } from '../art-collection.model';

@Component({
  selector: 'art-collection-add',
  templateUrl: './art-collection-add.component.html'
})
export class ArtCollectionAddComponent {
  artCollection: ArtCollection;
  artCollectionForm: FormGroup;
  saving: boolean;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private artCollectionFormService: ArtCollectionFormService,
    private sms: SnackbarMessagingService,
    private router: Router,
    private artCollectionService: ArtCollectionService
  ) {
    this.artCollectionForm = this.artCollectionFormService.buildForm(new ArtCollection());
  }

  onSave() {
    if (this.artCollectionForm.valid) {
      const createdArtCollection = this.artCollectionFormService.mergeForm(this.artCollectionForm, new ArtCollection());
      this.saving = true;
      this.artCollectionService
        .createArtCollection(createdArtCollection)
        .pipe(
          takeUntil(this.destroyed),
          finalize(() => (this.saving = false))
        )
        .subscribe(
          () => {
            this.sms.displaySuccess('Art collection created.');
            this.router.navigateByUrl('art-collections/list');
          },
          error => this.sms.displayError(error)
        );
    } else {
      this.sms.displayErrorMessage('Unable to add art collection since the form is invalid/incomplete.');
    }
  }
}
