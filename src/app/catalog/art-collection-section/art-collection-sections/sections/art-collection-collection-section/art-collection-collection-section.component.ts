import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Option } from 'src/app/common/models/option.model';
import { ArtworkService } from 'src/app/catalog/artwork-section/artwork.service';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';

@Component({
  selector: 'art-collection-collection-section',
  templateUrl: './art-collection-collection-section.component.html'
})
export class ArtCollectionCollectionSectionComponent implements OnInit {
  @Input() artCollectionCollectionForm: FormGroup;

  artworkLoading = false;
  artworkOptions: Option[] = [];

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(private artworkService: ArtworkService, private sms: SnackbarMessagingService) {}

  ngOnInit() {
    this.artworkLoading = true;
    this.artworkService
      .getAllArtworkAsOptions()
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => (this.artworkLoading = false))
      )
      .subscribe(artworkOptions => (this.artworkOptions = artworkOptions), error => this.sms.displayError(error));
  }
}
