import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ArtCollectionPreview } from './art-collection-preview.model';

@Component({
  selector: 'art-collection-preview-card',
  templateUrl: './art-collection-preview-card.component.html',
  styleUrls: ['./art-collection-preview-card.component.scss']
})
export class ArtCollectionPreviewCardComponent {
  @Input() artCollectionPreview: ArtCollectionPreview;
  @Output() onViewClicked: EventEmitter<any> = new EventEmitter();
  @Output() onEditClicked: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteClicked: EventEmitter<any> = new EventEmitter();
}
