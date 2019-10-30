import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'catalart-search-bar',
  templateUrl: './catalart-search-bar.component.html',
  styleUrls: ['./catalart-search-bar.component.scss']
})
export class CatalartSearchBarComponent {
  @Input() ariaLabel: string;

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onAdd: EventEmitter<any> = new EventEmitter<any>();

  search($event: string) {
    this.onSearch.emit($event);
  }

  add() {
    this.onAdd.emit();
  }
}
