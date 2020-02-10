import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { GenreFormService } from '../genre-form.service';

import { Genre } from '../genre.model';
import { GenreService } from '../genre.service';
import { BreadcrumbService } from 'src/app/common/services/breadcrumb.service';
import { genreEditBreadcrumb } from './genre-edit.breadcrumb';
import { baseGenreBreadcrumb } from '../base-genre.breadcrumb';
import { baseBreadcrumb } from 'src/app/common/models/base.breadcrumb';

@Component({
  selector: 'genre-edit',
  templateUrl: './genre-edit.component.html'
})
export class GenreEditComponent implements OnInit, OnDestroy {
  genre: Genre;
  genreForm: FormGroup;
  genreSaving: boolean;
  genreLoading: boolean;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private genreFormService: GenreFormService,
    private genreService: GenreService,
    private sms: SnackbarMessagingService,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([baseBreadcrumb, baseGenreBreadcrumb, genreEditBreadcrumb]);
    this.route.params.pipe(takeUntil(this.destroyed)).subscribe(params => {
      this.getGenre(params.id);
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  private getGenre(id: number): void {
    this.genreLoading = true;
    this.genreService
      .getGenreById(id)
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.genreLoading = false))
      )
      .subscribe(
        (genre: Genre) => {
          this.genre = genre;
          this.genreForm = this.genreFormService.buildForm(this.genre);
        },
        error => this.sms.displayError(error)
      );
  }

  onSave(): void {
    if (this.genreForm.valid) {
      const updatedGenre = this.genreFormService.mergeForm(this.genreForm, this.genre);
      this.genreSaving = true;
      this.genreService
        .saveGenre(updatedGenre.id, updatedGenre)
        .pipe(
          takeUntil(this.destroyed),
          finalize(() => (this.genreSaving = false))
        )
        .subscribe(
          () => {
            this.sms.displaySuccess('Genre saved.');
            this.router.navigateByUrl('reference/genres/list');
          },
          error => this.sms.displayError(error)
        );
    } else {
      this.sms.displayErrorMessage('Unable to save genre since the form is invalid/incomplete.');
    }
  }
}
