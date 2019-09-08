import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'artwork-creation-section',
  templateUrl: './artwork-creation-section.component.html'
})
export class ArtworkCreationSectionComponent {
  @Input() artworkCreationForm: FormGroup;

  get artworkCreatorForm(): FormGroup {
    return this.artworkCreationForm.get('creatorForm') as FormGroup;
  }
}
