import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'catalart-date-and-place-section',
  templateUrl: './catalart-date-and-place-section.component.html'
})
export class CatalartDateAndPlaceSectionComponent {
  @Input() dateAndPlaceForm: FormGroup;
  @Input() title: string;
  @Input() forceDateToBeSelected = false;
  @Input() forcePlaceToBeSelected = false;

  get isDateKnown() {
    return this.forceDateToBeSelected || (this.dateForm.get('isDateKnown') && this.dateForm.get('isDateKnown').value);
  }

  get isWithinARange() {
    return this.dateForm.get('isWithinARange') && this.dateForm.get('isWithinARange').value;
  }

  get isPlaceKnown() {
    return this.placeForm.get('isPlaceKnown') && this.placeForm.get('isPlaceKnown').value;
  }

  get dateForm() {
    return this.dateAndPlaceForm.get('date');
  }

  get placeForm() {
    return this.dateAndPlaceForm.get('place');
  }
}
