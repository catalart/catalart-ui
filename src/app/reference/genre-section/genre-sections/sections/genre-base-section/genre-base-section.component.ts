import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'genre-base-section',
  templateUrl: './genre-base-section.component.html'
})
export class GenreBaseSectionComponent {
  @Input() baseForm: FormGroup;
}
