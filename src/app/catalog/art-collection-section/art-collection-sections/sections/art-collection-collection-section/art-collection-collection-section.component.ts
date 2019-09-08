import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'art-collection-collection-section',
  templateUrl: './art-collection-collection-section.component.html'
})
export class ArtCollectionCollectionSectionComponent {
  @Input() artCollectionCollectionForm: FormGroup;
}
