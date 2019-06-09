import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'art-collection-sections',
  templateUrl: './art-collection-sections.component.html',
  styleUrls: ['./art-collection-sections.component.scss']
})
export class ArtCollectionSectionsComponent {
  @Input() artCollectionForm: FormGroup;
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {}

  cancelClicked() {
    this.router.navigateByUrl('art-collections/list');
  }

  saveClicked() {
    this.onSave.emit();
  }

  get artCollectionInformationForm() {
    return this.artCollectionForm.get('informationSection');
  }

  get artCollectionCollectionForm() {
    return this.artCollectionForm.get('collectionSection');
  }
}
