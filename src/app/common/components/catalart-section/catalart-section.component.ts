import { Component, Input } from '@angular/core';

@Component({
  selector: 'catalart-section',
  templateUrl: './catalart-section.component.html',
  styleUrls: ['./catalart-section.component.scss']
})
export class CatalartSectionComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() invalid: boolean;
}
