import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'catalart-search',
  templateUrl: './catalart-search.component.html',
  styleUrls: ['./catalart-search.component.scss']
})
export class CatalartSearchComponent implements OnInit {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.setupSearch();
  }

  filter() {
    if (this.searchInput.dirty) {
      if (!!this.searchInput.value) {
        this.onSearch.emit(this.searchInput.value);
      } else {
        this.onSearch.emit();
      }
      this.searchInput.markAsPristine();
    }
  }

  clear() {
    this.searchInput.patchValue('');
    this.filter();
  }

  private setupSearch() {
    this.searchForm = this.fb.group({
      searchInput: ''
    });
  }

  get searchInput() {
    return this.searchForm.get('searchInput');
  }
}
