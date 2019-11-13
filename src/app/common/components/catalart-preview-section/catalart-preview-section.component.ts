import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'catalart-preview-section',
  templateUrl: './catalart-preview-section.component.html'
})
export class CatalartPreviewSectionComponent {
  @Input() previewForm: FormGroup;
}
