import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ArtworkFormService } from '../artwork-form.service';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';

import { Artwork } from '../artwork.model';
import { ArtworkService } from '../artwork.service';
import { BreadcrumbService } from 'src/app/common/services/breadcrumb.service';
import { baseBreadcrumb } from 'src/app/common/models/base.breadcrumb';
import { baseArtworkBreadcrumb } from '../base-artwork.breadcrumb';
import { artworkEditBreadcrumb } from './artwork-edit.breadcrumb';

@Component({
  selector: 'artwork-edit',
  templateUrl: './artwork-edit.component.html'
})
export class ArtworkEditComponent implements OnInit, OnDestroy {
  artwork: Artwork;
  artworkForm: FormGroup;
  artworkLoading = false;
  artworkSaving = false;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private artworkFormService: ArtworkFormService,
    private sms: SnackbarMessagingService,
    private router: Router,
    private artworkService: ArtworkService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([baseBreadcrumb, baseArtworkBreadcrumb, artworkEditBreadcrumb]);
    this.route.params.pipe(takeUntil(this.destroyed)).subscribe(params => {
      this.getArtwork(params.id);
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  private getArtwork(id: number): void {
    this.artworkLoading = true;
    this.artworkService
      .getArtworkById(id)
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.artworkLoading = false))
      )
      .subscribe(
        (artwork: Artwork) => {
          this.artwork = artwork;
          this.artworkForm = this.artworkFormService.buildForm(this.artwork);
        },
        error => this.sms.displayError(error)
      );
  }

  onSave(): void {
    if (this.artworkForm.valid) {
      const updatedArtwork = this.artworkFormService.mergeForm(this.artworkForm, this.artwork);
      this.artworkSaving = true;
      this.artworkService
        .saveArtwork(updatedArtwork.id, updatedArtwork)
        .pipe(
          takeUntil(this.destroyed),
          finalize(() => (this.artworkSaving = false))
        )
        .subscribe(
          () => {
            this.sms.displaySuccess('Artwork saved.');
            this.router.navigateByUrl('artwork/list');
          },
          error => this.sms.displayError(error)
        );
    } else {
      this.sms.displayErrorMessage('Unable to save artwork since the form is invalid/incomplete.');
    }
  }
}
