import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

import { SnackbarMessagingService } from 'src/app/common/services/snackbar-messaging.service';
import { ArtCollectionFormService } from '../art-collection-form.service';

import { ArtCollection } from '../art-collection.model';

@Component({
  selector: 'art-collection-edit',
  templateUrl: './art-collection-edit.component.html'
})
export class ArtCollectionEditComponent implements OnInit, OnDestroy {
  artCollection: ArtCollection;
  artCollectionForm: FormGroup;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private artCollectionFormService: ArtCollectionFormService,
    private sms: SnackbarMessagingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroyed)).subscribe(params => {
      this.getArtCollection(params.id);
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  private getArtCollection(id: number): void {
    // Fill in with service call
    this.artCollection = {
      id: 1,
      name: 'The Getty Museum',
      type: 'museum',
      description:
        'The J. Paul Getty Museum, commonly referred to as the Getty, is an art museum in California housed on two campuses: the Getty Center and Getty Villa.',
      location: '1200 Getty Center Drive, Los Angeles, California',
      containsArtCollections: true,
      artCollections: [
        {
          id: 1,
          text: 'The Monet Collection'
        }
      ],
      artwork: []
    };
    this.artCollectionForm = this.artCollectionFormService.buildForm(this.artCollection);
  }

  onSave() {
    const updatedArtCollection = this.artCollectionFormService.mergeForm(this.artCollectionForm, this.artCollection);
    this.sms.displayMessage('Save is not implemented yet');
    this.router.navigateByUrl('art-collections/list');
  }
}
