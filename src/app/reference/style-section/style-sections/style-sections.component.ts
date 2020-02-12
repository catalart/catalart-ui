import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'style-sections',
  templateUrl: './style-sections.component.html',
  styleUrls: ['./style-sections.component.scss']
})
export class StyleSectionsComponent {
  @Input() styleForm: FormGroup;
  @Input() loading: boolean;
  @Input() saving: boolean;
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {}

  cancelClicked() {
    this.router.navigateByUrl('reference/styles/list');
  }

  saveClicked() {
    this.onSave.emit();
  }

  get baseForm() {
    return this.styleForm.get('base');
  }

  get disabled() {
    return this.styleForm.invalid;
  }
}
