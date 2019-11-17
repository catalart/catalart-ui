import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { ArtistFormService } from '../artist-form.service';

import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import { baseBreadcrumb } from 'src/app/common/models/base.breadcrumb';
import { baseArtistBreadcrumb } from '../base-artist.breadcrumb';
import { BreadcrumbService } from 'src/app/common/services/breadcrumb.service';
import { artistAddBreadcrumb } from './artist-add.breadcrumb';

@Component({
  selector: 'artist-add',
  templateUrl: './artist-add.component.html'
})
export class ArtistAddComponent implements OnInit, OnDestroy {
  artistForm: FormGroup;
  saving = false;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private artistFormService: ArtistFormService,
    private sms: SnackbarMessagingService,
    private router: Router,
    private artistService: ArtistService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([baseBreadcrumb, baseArtistBreadcrumb, artistAddBreadcrumb]);
    this.artistForm = this.artistFormService.buildForm(new Artist());
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onSave() {
    if (this.artistForm.valid) {
      const createdArtist = this.artistFormService.mergeForm(this.artistForm, new Artist());
      this.saving = true;
      this.artistService
        .createArtist(createdArtist)
        .pipe(
          takeUntil(this.destroyed),
          finalize(() => (this.saving = false))
        )
        .subscribe(
          () => {
            this.router.navigateByUrl('artists/list');
          },
          error => this.sms.displayError(error)
        );
    } else {
      this.sms.displayErrorMessage('Unable to add artist since the form is invalid/incomplete.');
    }
  }
}
