import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'artwork-visual-documentation-section',
  templateUrl: './artwork-visual-documentation-section.component.html'
})
export class ArtworkVisualDocumentationSectionComponent {
  @Input() artworkVisualDocumentationForm: FormGroup;
}
