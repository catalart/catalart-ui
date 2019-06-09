import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ArtworkFormService } from '../artwork-form.service';
import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';

import { Artwork } from '../artwork.model';

@Component({
  selector: 'artwork-edit',
  templateUrl: './artwork-edit.component.html'
})
export class ArtworkEditComponent implements OnInit, OnDestroy {
  artwork: Artwork;
  artworkForm: FormGroup;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private artworkFormService: ArtworkFormService,
    private sms: SnackbarMessagingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroyed)).subscribe(params => {
      this.getArtwork(params.id);
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  private getArtwork(id: number): void {
    // Fill in with service call
    this.artwork = {
      id: 1,
      classificationTerm: 'paintings',
      title: 'Les Adieux de Télémaque et Eucharis',
      creator: {
        identity: 'Michaelangelo',
        role: 'painter'
      },
      creationDate: {
        earliestDate: '1000 BC',
        latestDate: '2000 AD'
      },
      dimensions: '1000cm x 2000cm',
      materialsAndTechniquesDescription: 'Oil Painting',
      generalSubjectTerms: ['woman', 'child', 'room'],
      currentLocation: 'Metropolitan Museum of Art',
      preview: 'http://www.getty.edu/research/publications/electronic_publications/cdwa/examples/images/fig6.jpg',
      citation: 'some citation'
    };
    this.artworkForm = this.artworkFormService.buildForm(this.artwork);
  }

  onSave() {
    this.sms.displayMessage('Save is not implemented yet');
    this.router.navigateByUrl('artwork/list');
  }
}
