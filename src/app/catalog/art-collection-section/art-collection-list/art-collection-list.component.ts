import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ArtCollectionPreview } from './art-collection-preview-card/art-collection-preview.model';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { ArtCollectionService } from '../art-collection.service';
import { CatalartConfirmationDialogComponent } from 'src/app/common/components/catalart-confirmation-dialog/catalart-confirmation-dialog.component';
import { takeUntil, finalize, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'art-collection-list',
  templateUrl: './art-collection-list.component.html',
  styleUrls: ['./art-collection-list.component.scss']
})
export class ArtCollectionListComponent implements OnInit, OnDestroy {
  artCollectionCatalog: ArtCollectionPreview[] = [];
  searchableCatalog: ArtCollectionPreview[] = [];
  loading = false;
  searchForm: FormGroup;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private artCollectionService: ArtCollectionService,
    private sms: SnackbarMessagingService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllArtCollections();
    this.setupSearch();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onViewClicked(artCollectionPreview: ArtCollectionPreview) {
    this.router.navigateByUrl(`art-collections/view/${artCollectionPreview.id}`);
  }

  onEditClicked(artCollectionPreview: ArtCollectionPreview) {
    this.router.navigateByUrl(`art-collections/edit/${artCollectionPreview.id}`);
  }

  addClicked() {
    this.router.navigateByUrl('art-collections/add');
  }

  onDeleteClicked(artCollectionPreview: ArtCollectionPreview) {
    this.dialog
      .open(CatalartConfirmationDialogComponent, {
        width: '300px'
      })
      .afterClosed()
      .pipe(takeUntil(this.destroyed))
      .subscribe(wasConfirmed => {
        if (wasConfirmed) {
          this.deleteArtCollection(artCollectionPreview.id);
        }
      });
  }

  private getAllArtCollections() {
    this.loading = true;
    this.artCollectionService
      .getAllArtCollections()
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        artCollectionCatalog => {
          this.artCollectionCatalog = artCollectionCatalog;
          this.searchableCatalog = [...this.artCollectionCatalog];
        },
        error => this.sms.displayError(error)
      );
  }

  private deleteArtCollection(artCollectionId: number) {
    this.artCollectionService
      .deleteArtCollection(artCollectionId)
      .pipe(takeUntil(this.destroyed))
      .subscribe(
        () => {
          this.sms.displaySuccess('Art collection successfully deleted');
          this.getAllArtCollections();
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
          this.searchableCatalog = [...this.artCollectionCatalog];
        }
      });
  }

  private filterCatalog(searchInput: string) {
    const searchTerm = searchInput.toLowerCase();
    this.searchableCatalog = [...this.artCollectionCatalog].filter(artCollection =>
      artCollection.name.toLowerCase().includes(searchTerm)
    );
  }

  get searchInput() {
    return this.searchForm.get('searchInput');
  }
}
