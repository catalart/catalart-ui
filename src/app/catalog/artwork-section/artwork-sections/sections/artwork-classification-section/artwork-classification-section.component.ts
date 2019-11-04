import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { Subject } from 'rxjs';
import { Option } from 'src/app/common/models/option.model';
import { takeUntil, finalize } from 'rxjs/operators';
import { ClassificationTermReferenceService } from 'src/app/common/services/classification-term-reference.service';

@Component({
  selector: 'artwork-classification-section',
  templateUrl: './artwork-classification-section.component.html'
})
export class ArtworkClassificationSectionComponent implements OnInit, OnDestroy {
  @Input() artworkClassificationForm: FormGroup;

  termsLoading: boolean;
  classificationTermOptions: Option[] = [];

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private classificationTermService: ClassificationTermReferenceService,
    private sms: SnackbarMessagingService
  ) {}

  ngOnInit() {
    this.termsLoading = true;
    this.classificationTermService
      .getAllClassificationTerms()
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.termsLoading = false))
      )
      .subscribe(options => (this.classificationTermOptions = options), error => this.sms.displayError(error));
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
