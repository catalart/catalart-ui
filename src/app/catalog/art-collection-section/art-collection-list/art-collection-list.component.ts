import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArtCollectionPreview } from './art-collection-preview-card/art-collection-preview.model';

@Component({
  selector: 'art-collection-list',
  templateUrl: './art-collection-list.component.html',
  styleUrls: ['./art-collection-list.component.scss']
})
export class ArtCollectionListComponent {
  artCollectionCatalog: ArtCollectionPreview[] = [
    {
      id: 1,
      name: 'Bowdoin Art Collection',
      location: 'Brunswick Maine'
    },
    {
      id: 2,
      name: 'Getty Art Museum',
      location: 'Los Angeles, CA'
    }
  ];

  constructor(private router: Router) {}

  onViewClicked(artCollectionPreview: ArtCollectionPreview) {
    this.router.navigateByUrl(`art-collections/view/${artCollectionPreview.id}`);
  }

  onEditClicked(artCollectionPreview: ArtCollectionPreview) {
    this.router.navigateByUrl(`art-collections/edit/${artCollectionPreview.id}`);
  }

  addClicked() {
    this.router.navigateByUrl('art-collections/add');
  }
}
