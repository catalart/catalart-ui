import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'artwork-sections',
  templateUrl: './artwork-sections.component.html',
  styleUrls: ['./artwork-sections.component.scss']
})
export class ArtworkSectionsComponent {
  @Input() artworkForm: FormGroup;
  @Input() loading: boolean;
  @Input() saving: boolean;
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {}

  cancelClicked() {
    this.router.navigateByUrl('artwork/list');
  }

  saveClicked() {
    this.onSave.emit();
  }

  get artworkObjectForm() {
    return this.artworkForm.get('objectSection');
  }

  get classificationForm() {
    return this.artworkForm.get('classificationSection');
  }

  get titleForm() {
    return this.artworkForm.get('titleSection');
  }

  get artistForm() {
    return this.artworkForm.get('artistSection');
  }

  get creationDateForm() {
    return this.artworkForm.get('creationDateSection');
  }

  get measurementsForm() {
    return this.artworkForm.get('measurementsSection');
  }

  get mediumForm() {
    return this.artworkForm.get('mediumSection');
  }

  get subjectMatterForm() {
    return this.artworkForm.get('subjectMatterSection');
  }

  get locationForm() {
    return this.artworkForm.get('locationSection');
  }

  get previewForm() {
    return this.artworkForm.get('visualDocumentationSection');
  }

  get citationForm() {
    return this.artworkForm.get('citationSection');
  }

  get isFormInvalid() {
    return this.artworkForm.invalid;
  }
}
