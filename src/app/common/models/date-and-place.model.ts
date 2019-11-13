export class Date {
  isDateKnown: boolean;
  isWithinARange: boolean;
  startYear: number;
  endYear: number;
  exactYear: number;
}

export class Place {
  isPlaceKnown: boolean;
  location: string;
}

export class DateAndPlace {
  date: Date = new Date();
  place?: Place = new Place();
}
