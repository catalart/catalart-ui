import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Option } from 'src/app/common/models/option.model';
import { Subject } from 'rxjs';
import { ArtInstitutionReferenceService } from 'src/app/common/services/art-institution-reference.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';

@Component({
  selector: 'artist-art-institution-section',
  templateUrl: './artist-art-institution-section.component.html'
})
export class ArtistArtInstitutionSectionComponent implements OnInit, OnDestroy {
  @Input() artInstitutionsForm: FormGroup;

  artInstitutionOptions: Option[] = [];
  artInstitutionsLoading: boolean;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(private artInstitutionService: ArtInstitutionReferenceService, private sms: SnackbarMessagingService) {}

  ngOnInit() {
    this.artInstitutionsLoading = true;
    this.artInstitutionService
      .getAllArtInstitutions()
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.artInstitutionsLoading = false))
      )
      .subscribe(options => (this.artInstitutionOptions = options), error => this.sms.displayError(error));
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
