import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

import { ArtworkService } from '../artwork.service';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { CatalartConfirmationDialogComponent } from 'src/app/common/components/catalart-confirmation-dialog/catalart-confirmation-dialog.component';

import { ArtworkPreview } from './artwork-preview-card/artwork-preview.model';
import { Query } from 'src/app/common/models/query.model';

@Component({
  selector: 'artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.scss']
})
export class ArtworkListComponent implements OnInit, OnDestroy {
  artCatalog: ArtworkPreview[] = [];
  loading = false;
  totalResults = 100;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  query: Query;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private artworkService: ArtworkService,
    private sms: SnackbarMessagingService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.setQueryOptions();
    this.getAllArtwork();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onViewClicked(artworkPreview: ArtworkPreview) {
    this.router.navigateByUrl(`artwork/view/${artworkPreview.id}`);
  }

  onEditClicked(artworkPreview: ArtworkPreview) {
    this.router.navigateByUrl(`artwork/edit/${artworkPreview.id}`);
  }

  addClicked() {
    this.router.navigateByUrl('artwork/add');
  }

  onDeleteClicked(artworkPreview: ArtworkPreview) {
    this.dialog
      .open(CatalartConfirmationDialogComponent, {
        width: '300px'
      })
      .afterClosed()
      .pipe(takeUntil(this.destroyed))
      .subscribe(wasConfirmed => {
        if (wasConfirmed) {
          this.deleteArtwork(artworkPreview.id);
        }
      });
  }

  filter(filter: string) {
    this.query.filter = filter;
    this.query.offset = 0;
    this.getAllArtwork();
  }

  updatePaginationOptions(pageEvent: PageEvent) {
    this.query.updateGivenPageEvent(pageEvent);
    this.getAllArtwork();
  }

  private getAllArtwork() {
    this.loading = true;
    this.artworkService
      .getAllArtwork(this.query)
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        res => {
          this.artCatalog = res.results;
          this.totalResults = res.totalNumberOfResults;
        },
        error => this.sms.displayError(error)
      );
  }

  private deleteArtwork(artworkId: number) {
    this.artworkService
      .deleteArtwork(artworkId)
      .pipe(takeUntil(this.destroyed))
      .subscribe(
        () => {
          this.sms.displaySuccess('Artwork successfully deleted');
          this.getAllArtwork();
        },
        error => this.sms.displayError(error)
      );
  }

  private setQueryOptions() {
    this.query = Query.fromPaginationParameters('', 1, 10);
  }
}
