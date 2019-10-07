import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, finalize, distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { ArtistService } from '../artist.service';
import { ArtistPreview } from './artist-preview-card/artist-preview.model';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { CatalartConfirmationDialogComponent } from 'src/app/common/components/catalart-confirmation-dialog/catalart-confirmation-dialog.component';

@Component({
  selector: 'artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit, OnDestroy {
  artistCatalog: ArtistPreview[] = [];
  loading = false;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private artistService: ArtistService,
    private sms: SnackbarMessagingService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllArtists();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onViewClicked(artistPreview: ArtistPreview) {
    this.router.navigateByUrl(`artists/view/${artistPreview.id}`);
  }

  onEditClicked(artistPreview: ArtistPreview) {
    this.router.navigateByUrl(`artists/edit/${artistPreview.id}`);
  }

  addClicked() {
    this.router.navigateByUrl('artists/add');
  }

  onDeleteClicked(artistPreview: ArtistPreview) {
    this.dialog
      .open(CatalartConfirmationDialogComponent, {
        width: '300px'
      })
      .afterClosed()
      .pipe(takeUntil(this.destroyed))
      .subscribe(wasConfirmed => {
        if (wasConfirmed) {
          this.deleteArtist(artistPreview.id);
        }
      });
  }

  filter(filter: string) {
    this.getAllArtists(filter);
  }

  private getAllArtists(filter?: string) {
    this.loading = true;
    this.artistService
      .getAllArtists(filter)
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        artwork => {
          this.artistCatalog = artwork;
        },
        error => this.sms.displayError(error)
      );
  }

  private deleteArtist(artistId: number) {
    this.artistService
      .deleteArtist(artistId)
      .pipe(takeUntil(this.destroyed))
      .subscribe(
        () => {
          this.sms.displaySuccess('Artist successfully deleted');
          this.getAllArtists();
        },
        error => this.sms.displayError(error)
      );
  }
}
