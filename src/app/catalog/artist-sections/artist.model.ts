import { Option } from 'src/app/common/models/option.model';
import { DateAndPlace } from 'src/app/common/models/date-and-place.model';
import { Preview } from 'src/app/common/models/preview.model';

export class Artist {
  id: number;
  identity: string;
  role: string;
  preview: Preview;
  born: DateAndPlace;
  died: DateAndPlace;
  nationality: string;
  artMovements: Option[];
  artInstitutions: Option[];
}
