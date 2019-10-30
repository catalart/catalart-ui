import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ArtistReferenceService } from 'src/app/common/services/artist-reference.service';
import { Enumeration } from 'src/app/common/models/enumeration.model';
import { takeUntil, finalize } from 'rxjs/operators';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';

@Component({
  selector: 'artwork-creator-section',
  templateUrl: './artwork-creator-section.component.html',
  styleUrls: ['./artwork-creator-section.component.scss']
})
export class ArtworkCreatorSectionComponent implements OnInit, OnDestroy {
  @Input() artworkCreatorForm: FormGroup;

  artistOptions: Enumeration[] = [];
  artistsLoading: boolean;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(private artistService: ArtistReferenceService, private sms: SnackbarMessagingService) {}

  ngOnInit() {
    this.artistsLoading = true;
    this.artistService
      .getAllArtists()
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.artistsLoading = false))
      )
      .subscribe(artistOptions => (this.artistOptions = artistOptions), error => this.sms.displayError(error));
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  get addNewArtist() {
    return this.artworkCreatorForm.get('addNewArtist');
  }
}
