import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

import { ArtistService } from '../artist.service';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { CatalartConfirmationDialogComponent } from 'src/app/common/components/catalart-confirmation-dialog/catalart-confirmation-dialog.component';

import { ArtistPreview } from './artist-preview-card/artist-preview.model';
import { Query } from 'src/app/common/models/query.model';
import { baseBreadcrumb } from 'src/app/common/models/base.breadcrumb';
import { baseArtistBreadcrumb } from '../base-artist.breadcrumb';
import { BreadcrumbService } from 'src/app/common/services/breadcrumb.service';

@Component({
  selector: 'artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit, OnDestroy {
  artistCatalog: ArtistPreview[] = [];
  loading = false;
  totalResults: number;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  query: Query;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private artistService: ArtistService,
    private sms: SnackbarMessagingService,
    private dialog: MatDialog,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([baseBreadcrumb, baseArtistBreadcrumb]);
    this.setQueryOptions();
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
    this.query.filter = filter;
    this.query.offset = 0;
    this.getAllArtists();
  }

  updatePaginationOptions(pageEvent: PageEvent) {
    this.query.updateGivenPageEvent(pageEvent);
    this.getAllArtists();
  }

  private getAllArtists() {
    this.loading = true;
    this.artistService
      .getAllArtists(this.query)
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        result => {
          this.artistCatalog = result.results;
          this.totalResults = result.totalNumberOfResults;
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

  private setQueryOptions() {
    this.query = Query.fromPaginationParameters('', 1, 10);
  }
}
