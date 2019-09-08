import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'artwork-classification-section',
  templateUrl: './artwork-classification-section.component.html'
})
export class ArtworkClassificationSectionComponent {
  @Input() artworkClassificationForm: FormGroup;
}
