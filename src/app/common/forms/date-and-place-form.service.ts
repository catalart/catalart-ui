import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IFormService } from 'src/app/common/models/form-service.interface';
import { Date, DateAndPlace, Place } from '../models/date-and-place.model';

@Injectable({
  providedIn: 'root'
})
export class DateAndPlaceFormService implements IFormService<DateAndPlace> {
  constructor(private fb: FormBuilder) {}

  buildForm(dateAndPlace: DateAndPlace): FormGroup {
    const form = this.fb.group({
      date: this.buildDateSection(new Date()),
      place: this.buildPlaceSection(new Place())
    });

    this.watchPlaceSwitch(form);
    return form;
  }

  mergeForm(form: FormGroup, date: DateAndPlace): DateAndPlace {
    const dateAndPlaceFormValue = form.value;

    return {
      ...date,
      ...this.mergeDateSection(dateAndPlaceFormValue.date),
      ...this.mergePlaceSection(dateAndPlaceFormValue.place)
    };
  }

  private buildDateSection(date: Date): FormGroup {
    const form = this.fb.group({
      isDateKnown: [date.isDateKnown],
      isWithinARange: [date.isWithinARange],
      startYear: [date.startYear],
      endYear: [date.endYear],
      exactYear: [date.exactYear]
    });

    this.watchSwitches(form);

    return form;
  }

  private buildPlaceSection(place: Place) {
    return this.fb.group({
      isPlaceKnown: [place.isPlaceKnown],
      location: [place.location]
    });
  }

  private watchPlaceSwitch(form: FormGroup): void {
    const isPlaceKnownSwitch = form.get('place.isPlaceKnown');
    const place = form.get('place.location');

    isPlaceKnownSwitch.valueChanges.subscribe(value => {
      if (!!value) {
        place.setValidators([Validators.required]);
      } else {
        place.setValidators(null);
      }
      place.updateValueAndValidity();
    });
    isPlaceKnownSwitch.updateValueAndValidity();
  }

  private watchSwitches(form: FormGroup): void {
    const isDateKnown = form.get('isDateKnown');
    const rangeSwitch = form.get('isWithinARange');
    const startYear = form.get('startYear');
    const endYear = form.get('endYear');
    const exactYear = form.get('exactYear');

    // Potentially use a merge from rxjs
    isDateKnown.valueChanges.subscribe(() => {
      this.setDateValidators(isDateKnown.value, rangeSwitch.value, startYear, endYear, exactYear);
    });

    rangeSwitch.valueChanges.subscribe(() => {
      this.setDateValidators(isDateKnown.value, rangeSwitch.value, startYear, endYear, exactYear);
    });
    rangeSwitch.updateValueAndValidity();
    isDateKnown.updateValueAndValidity();
  }

  private setDateValidators(
    isDateKnown: boolean,
    isWithinARange: boolean,
    startYear: AbstractControl,
    endYear: AbstractControl,
    exactYear: AbstractControl
  ) {
    if (isDateKnown) {
      if (isWithinARange) {
        startYear.setValidators([Validators.required]);
        endYear.setValidators([Validators.required]);
        exactYear.setValidators(null);
        exactYear.patchValue(null);
      } else {
        startYear.setValidators(null);
        startYear.patchValue(null);
        endYear.setValidators(null);
        endYear.patchValue(null);
        exactYear.setValidators([Validators.required]);
      }
    } else {
      startYear.setValidators(null);
      startYear.patchValue(null);
      endYear.setValidators(null);
      endYear.patchValue(null);
      exactYear.setValidators(null);
      exactYear.patchValue(null);
    }

    startYear.updateValueAndValidity();
    endYear.updateValueAndValidity();
    exactYear.updateValueAndValidity();
  }

  private mergeDateSection(dateValue: any): Date {
    return <Date>{
      isWithinARange: !!dateValue.isWithinARange,
      endYear: dateValue.endYear,
      startYear: dateValue.startYear,
      exactYear: dateValue.exactYear
    };
  }

  private mergePlaceSection(placeValue: any): Place {
    return <Place>{
      isPlaceKnown: placeValue.isPlaceKnown,
      location: placeValue.location
    };
  }
}
