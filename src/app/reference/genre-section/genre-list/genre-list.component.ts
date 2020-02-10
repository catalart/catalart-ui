import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatDialog, PageEvent } from '@angular/material';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { GenreService } from '../genre.service';
import { CatalartConfirmationDialogComponent } from 'src/app/common/components/catalart-confirmation-dialog/catalart-confirmation-dialog.component';
import { takeUntil, finalize } from 'rxjs/operators';
import { Query } from 'src/app/common/models/query.model';
import { BreadcrumbService } from 'src/app/common/services/breadcrumb.service';
import { baseBreadcrumb } from 'src/app/common/models/base.breadcrumb';
import { baseGenreBreadcrumb } from '../base-genre.breadcrumb';
import { Genre } from '../genre.model';

@Component({
  selector: 'genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit, OnDestroy {
  genres: Genre[] = [];
  loading = false;
  totalResults = 100;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  query: Query;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private genreService: GenreService,
    private sms: SnackbarMessagingService,
    private dialog: MatDialog,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([baseBreadcrumb, baseGenreBreadcrumb]);
    this.setQueryOptions();
    this.getAllGenres();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onEditClicked(genreId: number) {
    this.router.navigateByUrl(`reference/genres/edit/${genreId}`);
  }

  addClicked() {
    this.router.navigateByUrl('reference/genres/add');
  }

  onDeleteClicked(genreId: number) {
    this.dialog
      .open(CatalartConfirmationDialogComponent, {
        width: '300px'
      })
      .afterClosed()
      .pipe(takeUntil(this.destroyed))
      .subscribe(wasConfirmed => {
        if (wasConfirmed) {
          this.deleteGenre(genreId);
        }
      });
  }

  private getAllGenres() {
    this.loading = true;
    this.genreService
      .getAllGenres()
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        res => {
          this.genres = res.results;
          this.totalResults = res.totalNumberOfResults;
        },
        error => this.sms.displayError(error)
      );
  }

  private deleteGenre(GenreId: number) {
    this.genreService
      .deleteGenre(GenreId)
      .pipe(takeUntil(this.destroyed))
      .subscribe(
        () => {
          this.sms.displaySuccess('Genre successfully deleted');
          this.getAllGenres();
        },
        error => this.sms.displayError(error)
      );
  }

  private setQueryOptions() {
    this.query = Query.fromPaginationParameters('', 1, 10);
  }
}
