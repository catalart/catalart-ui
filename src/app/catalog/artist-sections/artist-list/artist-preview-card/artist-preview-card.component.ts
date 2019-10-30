import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ArtistPreview } from './artist-preview.model';

@Component({
  selector: 'artist-preview-card',
  templateUrl: './artist-preview-card.component.html',
  styleUrls: ['./artist-preview-card.component.scss']
})
export class ArtistPreviewCardComponent {
  @Input() artistPreview: ArtistPreview;
  @Output() onViewClicked: EventEmitter<any> = new EventEmitter();
  @Output() onEditClicked: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteClicked: EventEmitter<any> = new EventEmitter();
}
