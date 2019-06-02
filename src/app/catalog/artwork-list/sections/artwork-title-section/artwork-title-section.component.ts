import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'artwork-title-section',
  templateUrl: './artwork-title-section.component.html'
})
export class ArtworkTitleSectionComponent {
  @Input() artworkTitleForm: FormGroup;
}
