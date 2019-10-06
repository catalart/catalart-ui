import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'artist-sections',
  templateUrl: './artist-sections.component.html',
  styleUrls: ['./artist-sections.component.scss']
})
export class ArtistSectionsComponent {
  @Input() artistForm: FormGroup;
  @Input() loading: boolean;
  @Input() saving: boolean;
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {}

  cancelClicked() {
    this.router.navigateByUrl('artists/list');
  }

  saveClicked() {
    this.onSave.emit();
  }

  get generalInformationForm() {
    return this.artistForm.get('generalInformation');
  }
}
