import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { GenreFormService } from '../genre-form.service';
import { GenreService } from '../genre.service';

import { Genre } from '../genre.model';
import { baseGenreBreadcrumb } from '../base-genre.breadcrumb';
import { baseBreadcrumb } from 'src/app/common/models/base.breadcrumb';
import { genreAddBreadcrumb } from './genre-add.breadcrumb';
import { BreadcrumbService } from 'src/app/common/services/breadcrumb.service';

@Component({
  selector: 'genre-add',
  templateUrl: './genre-add.component.html'
})
export class GenreAddComponent implements OnInit {
  genre: Genre;
  genreForm: FormGroup;
  saving: boolean;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private genreFormService: GenreFormService,
    private sms: SnackbarMessagingService,
    private router: Router,
    private genreService: GenreService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.genreForm = this.genreFormService.buildForm(new Genre());
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([baseBreadcrumb, baseGenreBreadcrumb, genreAddBreadcrumb]);
  }

  onSave() {
    if (this.genreForm.valid) {
      const createdGenre = this.genreFormService.mergeForm(this.genreForm, new Genre());
      this.saving = true;
      this.genreService
        .createGenre(createdGenre)
        .pipe(
          takeUntil(this.destroyed),
          finalize(() => (this.saving = false))
        )
        .subscribe(
          () => {
            this.sms.displaySuccess('Genre created.');
            this.router.navigateByUrl('reference/genres/list');
          },
          error => this.sms.displayError(error)
        );
    } else {
      this.sms.displayErrorMessage('Unable to add genres since the form is invalid/incomplete.');
    }
  }
}
