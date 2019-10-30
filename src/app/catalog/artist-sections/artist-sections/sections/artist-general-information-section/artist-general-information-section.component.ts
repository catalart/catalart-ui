import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'artist-general-information-section',
  templateUrl: './artist-general-information-section.component.html'
})
export class ArtistGeneralInformationSectionComponent {
  @Input() artistGeneralInformationForm: FormGroup;
}
