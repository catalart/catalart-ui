import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, finalize, distinctUntilChanged, debounceTime } from 'rxjs/operators';

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
  searchableCatalog: ArtworkPreview[] = [];
  loading = false;
  searchForm: FormGroup;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private artworkService: ArtworkService,
    private sms: SnackbarMessagingService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllArtwork();
    this.setupSearch();
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

  private getAllArtwork() {
    this.loading = true;
    this.artworkService
      .getAllArtwork()
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        artwork => {
          this.artCatalog = artwork;
          this.searchableCatalog = [...this.artCatalog];
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

  private setupSearch() {
    this.searchForm = this.fb.group({
      searchInput: ''
    });
    this.searchForm.valueChanges
      .pipe(
        takeUntil(this.destroyed),
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (this.searchInput.value) {
          this.filterCatalog(this.searchInput.value);
        } else {
          this.searchableCatalog = [...this.artCatalog];
        }
      });
  }

  private filterCatalog(searchInput: string) {
    const searchTerm = searchInput.toLowerCase();
    this.searchableCatalog = [...this.artCatalog].filter(art => art.title.toLowerCase().includes(searchTerm));
  }

  get searchInput() {
    return this.searchForm.get('searchInput');
  }
}
