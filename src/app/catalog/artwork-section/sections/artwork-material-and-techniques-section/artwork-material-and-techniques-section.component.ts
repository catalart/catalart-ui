import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'artwork-material-and-techniques-section',
  templateUrl: './artwork-material-and-techniques-section.component.html'
})
export class ArtworkMaterialAndTechniquesSectionComponent {
  @Input() artworkMaterialAndTechniquesForm: FormGroup;
}
