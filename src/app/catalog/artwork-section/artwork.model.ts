import { Option } from 'src/app/common/models/option.model';

export class Creator {
  id: number;
  identity: string;
  role: string;
}

export class CreationDate {
  earliestDate: string;
  latestDate: string;
}

export class Artwork {
  id: number;
  classificationTerm: Option;
  title: string;
  creator: Creator = new Creator();
  creationDate: CreationDate = new CreationDate();
  dimensions: string;
  materialsAndTechniquesDescription: string;
  generalSubjectTerms: string[];
  currentLocation: string;
  preview: string; // url
  citation: string;
}
