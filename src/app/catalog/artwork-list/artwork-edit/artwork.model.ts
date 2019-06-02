import { Enumeration } from 'src/app/common/models/enumeration.model';

export class Artwork {
  catalogLevel: Enumeration;
  objectType: string;
  classificationTerm: string;
  title: string;
  creator: Creator;
  creationDate: CreationDate;
  dimensions: string;
  materialsAndTechniquesDescription: string;
  generalSubjectTerms: string[];
  currentLocation: string;
  preview: string; // url
  citation: string;
}

export class Creator {
  identity: string;
  role: string;
}

export class CreationDate {
  earliestDate: string;
  latestDate: string;
}
