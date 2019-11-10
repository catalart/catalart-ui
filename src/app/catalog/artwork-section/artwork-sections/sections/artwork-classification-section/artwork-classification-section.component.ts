import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { Subject } from 'rxjs';
import { Option } from 'src/app/common/models/option.model';
import { takeUntil, finalize } from 'rxjs/operators';
import { GenreReferenceService } from 'src/app/common/services/genre-reference.service';

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

  constructor(private genreService: GenreReferenceService, private sms: SnackbarMessagingService) {}

  ngOnInit() {
    this.genresLoading = true;
    this.genreService
      .getAllGenres()
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.genresLoading = false))
      )
      .subscribe(options => (this.genreOptions = options), error => this.sms.displayError(error));
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
