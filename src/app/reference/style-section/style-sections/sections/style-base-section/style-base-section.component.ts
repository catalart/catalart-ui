import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'style-base-section',
  templateUrl: './style-base-section.component.html'
})
export class StyleBaseSectionComponent {
  @Input() baseForm: FormGroup;
}
