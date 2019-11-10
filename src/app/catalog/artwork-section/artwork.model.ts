import { Option } from 'src/app/common/models/option.model';
import { DateAndPlace } from 'src/app/common/models/date-and-place.model';
import { Preview } from 'src/app/common/models/preview.model';

export class Creator {
  id: number;
  identity: string;
  role: string;
}

export class Artwork {
  id: number;
  title: string;
  creator: Creator = new Creator();
  creationDate: DateAndPlace = new DateAndPlace();
  dimensions: string;
  materialsAndTechniquesDescription: string;
  generalSubjectTerms: string[];
  currentLocation: string;
  preview: Preview;
  citation: string;
  genre: Option;
  style: Option;
}
