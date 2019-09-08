import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { ArtCollectionFormService } from '../art-collection-form.service';

import { ArtCollection } from '../art-collection.model';
import { ArtCollectionService } from '../art-collection.service';

@Component({
  selector: 'art-collection-edit',
  templateUrl: './art-collection-edit.component.html'
})
export class ArtCollectionEditComponent implements OnInit, OnDestroy {
  artCollection: ArtCollection;
  artCollectionForm: FormGroup;
  artCollectionSaving: boolean;
  artCollectionLoading: boolean;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private artCollectionFormService: ArtCollectionFormService,
    private artCollectionService: ArtCollectionService,
    private sms: SnackbarMessagingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroyed)).subscribe(params => {
      this.getArtCollection(params.id);
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  private getArtCollection(id: number): void {
    this.artCollectionLoading = true;
    this.artCollectionService
      .getArtCollectionById(id)
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.artCollectionLoading = false))
      )
      .subscribe(
        (artCollection: ArtCollection) => {
          this.artCollection = artCollection;
          this.artCollectionForm = this.artCollectionFormService.buildForm(this.artCollection);
        },
        error => this.sms.displayError(error)
      );
  }

  onSave(): void {
    if (this.artCollectionForm.valid) {
      const updatedArtCollection = this.artCollectionFormService.mergeForm(this.artCollectionForm, this.artCollection);
      this.artCollectionSaving = true;
      this.artCollectionService
        .saveArtCollection(updatedArtCollection.id, updatedArtCollection)
        .pipe(
          takeUntil(this.destroyed),
          finalize(() => (this.artCollectionSaving = false))
        )
        .subscribe(
          () => {
            this.sms.displaySuccess('Art collection saved.');
            this.router.navigateByUrl('art-collections/list');
          },
          error => this.sms.displayError(error)
        );
    } else {
      this.sms.displayErrorMessage('Unable to save art collection since the form is invalid/incomplete.');
    }
  }
}
