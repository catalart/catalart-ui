import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'genre-sections',
  templateUrl: './genre-sections.component.html',
  styleUrls: ['./genre-sections.component.scss']
})
export class GenreSectionsComponent {
  @Input() genreForm: FormGroup;
  @Input() loading: boolean;
  @Input() saving: boolean;
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {}

  cancelClicked() {
    this.router.navigateByUrl('genres/list');
  }

  saveClicked() {
    this.onSave.emit();
  }

  get baseForm() {
    return this.genreForm.get('base');
  }

  get disabled() {
    return this.genreForm.invalid;
  }
}
