import { ReferenceItem } from 'src/app/common/models/reference-item.interface';

export class Genre implements ReferenceItem {
  id: number;
  name: string;
  label: string;
  description: string;
}
