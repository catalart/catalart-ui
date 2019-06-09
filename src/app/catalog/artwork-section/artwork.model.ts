import { Enumeration } from 'src/app/common/models/enumeration.model';

export class Creator {
  identity: string;
  role: string;
}

export class CreationDate {
  earliestDate: string;
  latestDate: string;
}

export class Artwork {
  catalogLevel: Enumeration = new Enumeration();
  objectType: string;
  classificationTerm: string;
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
