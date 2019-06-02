import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'artwork-location-section',
  templateUrl: './artwork-location-section.component.html'
})
export class ArtworkLocationSectionComponent {
  @Input() artworkLocationForm: FormGroup;
}
