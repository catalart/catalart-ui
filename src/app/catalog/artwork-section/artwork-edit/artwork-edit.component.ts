import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Artwork } from './artwork.model';
import { FormGroup } from '@angular/forms';
import { ArtworkFormService } from './artwork-form.service';

@Component({
  selector: 'artwork-edit',
  templateUrl: './artwork-edit.component.html',
  styleUrls: ['./artwork-edit.component.scss']
})
export class ArtworkEditComponent implements OnInit, OnDestroy {
  artwork: Artwork;
  artworkForm: FormGroup;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private artworkFormService: ArtworkFormService, private router: Router) {}

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
      catalogLevel: {
        id: 1,
        text: 'Item',
        label: 'ITEM'
      },
      objectType: 'painting',
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

  onCancel() {
    this.router.navigateByUrl('artwork/list');
  }

  get artworkObjectForm() {
    return this.artworkForm.get('objectSection');
  }

  get classificationForm() {
    return this.artworkForm.get('classificationSection');
  }

  get titleForm() {
    return this.artworkForm.get('titleSection');
  }

  get creationForm() {
    return this.artworkForm.get('creationSection');
  }

  get measurementsForm() {
    return this.artworkForm.get('measurementsSection');
  }

  get materialsAndTechniquesForm() {
    return this.artworkForm.get('materialsAndTechniquesSection');
  }

  get subjectMatterForm() {
    return this.artworkForm.get('subjectMatterSection');
  }

  get locationForm() {
    return this.artworkForm.get('locationSection');
  }

  get visualDocumentationForm() {
    return this.artworkForm.get('visualDocumentationSection');
  }

  get citationForm() {
    return this.artworkForm.get('citationSection');
  }
}
