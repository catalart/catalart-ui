import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Enumeration } from 'src/app/common/models/enumeration.model';
import { Subject } from 'rxjs';
import { ArtistReferenceService } from 'src/app/common/services/artist-reference.service';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'artwork-artist-section',
  templateUrl: './artwork-artist-section.component.html'
})
export class ArtworkArtistSectionComponent implements OnInit, OnDestroy {
  @Input() artworkArtistForm: FormGroup;

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
    return this.artworkArtistForm.get('addNewArtist');
  }
}
