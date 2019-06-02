import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'artwork-subject-matter-section',
  templateUrl: './artwork-subject-matter-section.component.html'
})
export class ArtworkSubjectMatterSectionComponent {
  @Input() artworkSubjectMatterForm: FormGroup;
}
