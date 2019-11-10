import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Option } from 'src/app/common/models/option.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'artist-art-institution-section',
  templateUrl: './artist-art-institution-section.component.html'
})
export class ArtistArtInstitutionSectionComponent implements OnInit, OnDestroy {
  @Input() artInstitutionsForm: FormGroup;

  artInstitutionOptions: Option[] = [];
  artInstitutionsLoading: boolean;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {}

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
