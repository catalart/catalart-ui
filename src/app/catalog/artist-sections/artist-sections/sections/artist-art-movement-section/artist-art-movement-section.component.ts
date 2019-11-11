import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Option } from 'src/app/common/models/option.model';
import { Subject } from 'rxjs';
import { ArtMovementReferenceService } from 'src/app/common/services/art-movement-reference.service';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'artist-art-movement-section',
  templateUrl: './artist-art-movement-section.component.html'
})
export class ArtistArtMovementSectionComponent implements OnInit, OnDestroy {
  @Input() artMovementsForm: FormGroup;

  artMovementOptions: Option[] = [];
  artMovementsLoading: boolean;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(private artMovementService: ArtMovementReferenceService, private sms: SnackbarMessagingService) {}

  ngOnInit() {
    this.artMovementsLoading = true;
    this.artMovementService
      .getAllArtMovements()
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.artMovementsLoading = false))
      )
      .subscribe(options => (this.artMovementOptions = options), error => this.sms.displayError(error));
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
