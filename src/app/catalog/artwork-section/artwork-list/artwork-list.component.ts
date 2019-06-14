import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArtworkPreview } from './artwork-preview-card/artwork-preview.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { ArtworkService } from '../artwork.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';

@Component({
  selector: 'artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.scss']
})
export class ArtworkListComponent implements OnInit, OnDestroy {
  artCatalog: ArtworkPreview[] = [];
  loading = false;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private artworkService: ArtworkService, private sms: SnackbarMessagingService) {}

  ngOnInit() {
    this.loading = true;
    this.artworkService
      .getAllArtwork()
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        artwork => {
          this.artCatalog = artwork;
        },
        error => this.sms.displayError(error)
      );
  }

  ngOnDestroy() {}

  onViewClicked(artworkPreview: ArtworkPreview) {
    this.router.navigateByUrl(`artwork/view/${artworkPreview.id}`);
  }

  onEditClicked(artworkPreview: ArtworkPreview) {
    this.router.navigateByUrl(`artwork/edit/${artworkPreview.id}`);
  }

  addClicked() {
    this.router.navigateByUrl('artwork/add');
  }
}
