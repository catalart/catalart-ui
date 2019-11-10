import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Option } from 'src/app/common/models/option.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'artist-art-movement-section',
  templateUrl: './artist-art-movement-section.component.html'
})
export class ArtistArtMovementSectionComponent implements OnInit, OnDestroy {
  @Input() artMovementsForm: FormGroup;

  artMovementOptions: Option[] = [];
  artMovementsLoading: boolean;

  private destroyed: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {}

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
