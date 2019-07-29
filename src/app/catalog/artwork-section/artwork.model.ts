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
