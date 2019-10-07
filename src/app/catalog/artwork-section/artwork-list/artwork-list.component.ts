import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

import { ArtworkService } from '../artwork.service';
import { ArtworkPreview } from './artwork-preview-card/artwork-preview.model';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { CatalartConfirmationDialogComponent } from 'src/app/common/components/catalart-confirmation-dialog/catalart-confirmation-dialog.component';

@Component({
  selector: 'artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.scss']
})
export class ArtworkListComponent implements OnInit, OnDestroy {
  artCatalog: ArtworkPreview[] = [];
  loading = false;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private artworkService: ArtworkService,
    private sms: SnackbarMessagingService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
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
    this.getAllArtwork(filter);
  }

  private getAllArtwork(filter?: string) {
    this.loading = true;
    this.artworkService
      .getAllArtwork(filter)
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        artwork => {
          this.artCatalog = artwork;
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
}
