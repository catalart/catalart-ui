import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ArtistFormService } from '../artist-form.service';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'artist-edit',
  templateUrl: './artist-edit.component.html'
})
export class ArtistEditComponent implements OnInit, OnDestroy {
  artist: Artist;
  artistForm: FormGroup;
  artistLoading = false;
  artistSaving = false;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private artistFormService: ArtistFormService,
    private sms: SnackbarMessagingService,
    private router: Router,
    private artistService: ArtistService
  ) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroyed)).subscribe(params => {
      this.getArtist(params.id);
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  private getArtist(id: number): void {
    this.artistLoading = true;
    this.artistService
      .getArtistById(id)
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.artistLoading = false))
      )
      .subscribe(
        (artist: Artist) => {
          this.artist = artist;
          this.artistForm = this.artistFormService.buildForm(this.artist);
        },
        error => this.sms.displayError(error)
      );
  }

  onSave(): void {
    if (this.artistForm.valid) {
      const updatedArtist = this.artistFormService.mergeForm(this.artistForm, this.artist);
      this.artistSaving = true;
      this.artistService
        .saveArtist(updatedArtist.id, updatedArtist)
        .pipe(
          takeUntil(this.destroyed),
          finalize(() => (this.artistSaving = false))
        )
        .subscribe(
          () => {
            this.sms.displaySuccess('Artist saved.');
            this.router.navigateByUrl('artists/list');
          },
          error => this.sms.displayError(error)
        );
    } else {
      this.sms.displayErrorMessage('Unable to save artist since the form is invalid/incomplete.');
    }
  }
}
