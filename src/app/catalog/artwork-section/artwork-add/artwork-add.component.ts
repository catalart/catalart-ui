import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { ArtworkFormService } from '../artwork-form.service';
import { ArtworkService } from '../artwork.service';

import { Artwork } from '../artwork.model';
import { takeUntil, finalize } from 'rxjs/operators';
import { BreadcrumbService } from 'src/app/common/services/breadcrumb.service';
import { baseBreadcrumb } from 'src/app/common/models/base.breadcrumb';
import { artworkAddBreadcrumb } from './artwork-add.breadcrumb';
import { baseArtworkBreadcrumb } from '../base-artwork.breadcrumb';

@Component({
  selector: 'artwork-add',
  templateUrl: './artwork-add.component.html'
})
export class ArtworkAddComponent implements OnInit, OnDestroy {
  artworkForm: FormGroup;
  saving = false;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private artworkFormService: ArtworkFormService,
    private sms: SnackbarMessagingService,
    private router: Router,
    private artworkService: ArtworkService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([baseBreadcrumb, baseArtworkBreadcrumb, artworkAddBreadcrumb]);
    this.artworkForm = this.artworkFormService.buildForm(new Artwork());
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onSave() {
    if (this.artworkForm.valid) {
      const createdArtwork = this.artworkFormService.mergeForm(this.artworkForm, new Artwork());
      this.saving = true;
      this.artworkService
        .createArtwork(createdArtwork)
        .pipe(
          takeUntil(this.destroyed),
          finalize(() => (this.saving = false))
        )
        .subscribe(
          () => {
            this.router.navigateByUrl('artwork/list');
          },
          error => this.sms.displayError(error)
        );
    } else {
      this.sms.displayErrorMessage('Unable to add artwork since the form is invalid/incomplete.');
    }
  }
}
