import { Component, Input, OnInit } from '@angular/core';
import { Artist } from '../../../artist.model';
import { Option } from 'src/app/common/models/option.model';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { ArtworkReferenceService } from 'src/app/common/services/artwork-reference.service';

@Component({
  selector: 'artist-artwork-section',
  templateUrl: './artist-artwork-section.component.html'
})
export class ArtistArtworkSectionComponent implements OnInit {
  @Input() artist: Artist;

  artwork: Option[] = [];
  artworkLoading = false;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(private artworkReferenceService: ArtworkReferenceService, private sms: SnackbarMessagingService) {}

  ngOnInit() {
    this.artworkLoading = true;
    this.artworkReferenceService
      .getAllArtworkByArtist(this.artist.id)
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.artworkLoading = false))
      )
      .subscribe(
        (artwork: Option[]) => {
          this.artwork = artwork;
        },
        error => this.sms.displayError(error)
      );
  }
}
