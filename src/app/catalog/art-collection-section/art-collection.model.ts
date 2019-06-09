import { Option } from 'src/app/common/models/option.model';

export class ArtCollection {
  id: number;
  name: string;
  type: string;
  description: string;
  location: string;
  containsArtCollections: boolean;
  artCollections: Option[];
  artwork: Option[];
}
