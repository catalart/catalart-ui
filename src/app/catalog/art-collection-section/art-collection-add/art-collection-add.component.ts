import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { ArtCollectionFormService } from '../art-collection-form.service';
import { ArtCollectionService } from '../art-collection.service';

import { ArtCollection } from '../art-collection.model';
import { baseArtCollectionBreadcrumb } from '../base-art-collection.breadcrumb';
import { baseBreadcrumb } from 'src/app/common/models/base.breadcrumb';
import { artCollectionAddBreadcrumb } from './art-collection-add.breadcrumb';
import { BreadcrumbService } from 'src/app/common/services/breadcrumb.service';

@Component({
  selector: 'art-collection-add',
  templateUrl: './art-collection-add.component.html'
})
export class ArtCollectionAddComponent implements OnInit {
  artCollection: ArtCollection;
  artCollectionForm: FormGroup;
  saving: boolean;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private artCollectionFormService: ArtCollectionFormService,
    private sms: SnackbarMessagingService,
    private router: Router,
    private artCollectionService: ArtCollectionService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.artCollectionForm = this.artCollectionFormService.buildForm(new ArtCollection());
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([baseBreadcrumb, baseArtCollectionBreadcrumb, artCollectionAddBreadcrumb]);
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
