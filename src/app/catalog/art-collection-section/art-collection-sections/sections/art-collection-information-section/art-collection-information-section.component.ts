import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'art-collection-information-section',
  templateUrl: './art-collection-information-section.component.html'
})
export class ArtCollectionInformationSectionComponent {
  @Input() artCollectionInformationForm: FormGroup;
}
