import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { Subject } from 'rxjs';
import { Option } from 'src/app/common/models/option.model';
import { takeUntil, finalize } from 'rxjs/operators';
import { ArtworkGenreReferenceService } from 'src/app/common/services/artwork-genre-reference.service';
import { ArtworkStyleReferenceService } from 'src/app/common/services/artwork-style-reference.service';

@Component({
  selector: 'artwork-classification-section',
  templateUrl: './artwork-classification-section.component.html'
})
export class ArtworkClassificationSectionComponent implements OnInit, OnDestroy {
  @Input() artworkClassificationForm: FormGroup;

  styleOptions: Option[] = [];
  stylesLoading: boolean;
  genreOptions: Option[] = [];
  genresLoading: boolean;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private genreService: ArtworkGenreReferenceService,
    private styleService: ArtworkStyleReferenceService,
    private sms: SnackbarMessagingService
  ) {}

  ngOnInit() {
    this.loadGenres();
    this.loadStyles();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  private loadGenres() {
    this.genresLoading = true;
    this.genreService
      .getAllGenres()
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.genresLoading = false))
      )
      .subscribe(
        options => (this.genreOptions = options),
        error => this.sms.displayError(error)
      );
  }

  private loadStyles() {
    this.stylesLoading = true;
    this.styleService
      .getAllStyles()
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.stylesLoading = false))
      )
      .subscribe(
        options => (this.styleOptions = options),
        error => this.sms.displayError(error)
      );
  }
}
