import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'catalart-button',
  templateUrl: 'catalart-button.component.html',
  styleUrls: ['./catalart-button.component.scss']
})
export class CatalartButtonComponent {
  @Input() title = '';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() positive: boolean;

  @Output() onClick: EventEmitter<any> = new EventEmitter();
}
