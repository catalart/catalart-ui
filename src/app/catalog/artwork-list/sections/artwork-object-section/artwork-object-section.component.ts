import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Enumeration } from 'src/app/common/models/enumeration.model';

@Component({
  selector: 'artwork-object-section',
  templateUrl: './artwork-object-section.component.html'
})
export class ArtworkObjectSectionComponent {
  @Input() artworkObjectForm: FormGroup;

  catalogOptions: Enumeration[] = [
    {
      id: 1,
      text: 'Item',
      label: 'ITEM'
    },
    {
      id: 2,
      text: 'Volume',
      label: 'VOLUME'
    },
    {
      id: 3,
      text: 'Album',
      label: 'ALBUM'
    },
    {
      id: 4,
      text: 'Group',
      label: 'GROUP'
    },
    {
      id: 5,
      text: 'Subgroup',
      label: 'SUBGROUP'
    },
    {
      id: 6,
      text: 'Collection',
      label: 'COLLECTION'
    }
  ];
}
