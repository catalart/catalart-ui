import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'artwork-measurements-section',
  templateUrl: './artwork-measurements-section.component.html'
})
export class ArtworkMeasurementsSectionComponent {
  @Input() artworkMeasurementsForm: FormGroup;
}
