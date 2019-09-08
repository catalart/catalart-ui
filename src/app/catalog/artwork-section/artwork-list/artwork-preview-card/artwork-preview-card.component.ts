import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ArtworkPreview } from './artwork-preview.model';

@Component({
  selector: 'artwork-preview-card',
  templateUrl: './artwork-preview-card.component.html',
  styleUrls: ['./artwork-preview-card.component.scss']
})
export class ArtworkPreviewCardComponent {
  @Input() artworkPreview: ArtworkPreview;
  @Output() onViewClicked: EventEmitter<any> = new EventEmitter();
  @Output() onEditClicked: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteClicked: EventEmitter<any> = new EventEmitter();
}
