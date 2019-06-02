import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss']
})
export class AdminCardComponent {
  @Input() icon: string;
  @Input() title: string;
}
