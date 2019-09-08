import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'artwork-citation-section',
  templateUrl: './artwork-citation-section.component.html'
})
export class ArtworkCitationSectionComponent {
  @Input() artworkCitationForm: FormGroup;
}
