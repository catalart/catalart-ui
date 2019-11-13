import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'artwork-medium-section',
  templateUrl: './artwork-medium-section.component.html'
})
export class ArtworkMediumSectionComponent {
  @Input() artworkMediumForm: FormGroup;
}
