import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Option } from 'src/app/common/models/option.model';

@Component({
  selector: 'art-collection-collection-section',
  templateUrl: './art-collection-collection-section.component.html'
})
export class ArtCollectionCollectionSectionComponent {
  @Input() artCollectionCollectionForm: FormGroup;

  get artworkOptions(): Option[] {
    return [
      new Option(1, 'test 1'),
      new Option(2, 'test 2'),
      new Option(3, 'test 3'),
      new Option(4, 'test 4'),
      new Option(5, 'test 5'),
      new Option(6, 'test 6'),
      new Option(7, 'test 7')
    ];
  }
}
