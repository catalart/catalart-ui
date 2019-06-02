import { Component } from '@angular/core';
import { ArtworkPreview } from './artwork-preview-card/artwork-preview.model';
import { Router } from '@angular/router';

@Component({
  selector: 'artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.scss']
})
export class ArtworkListComponent {
  artCatalog: ArtworkPreview[] = [
    {
      id: 1,
      creationDate: '1766-1782',
      creatorIdentity: 'Michaelangelo',
      preview: 'http://www.getty.edu/research/publications/electronic_publications/cdwa/examples/images/fig6.jpg',
      title: 'Les Adieux de Télémaque et Eucharis'
    },
    {
      id: 2,
      creationDate: 'before 952 BCE',
      creatorIdentity: 'Some bro',
      preview: 'http://www.getty.edu/research/publications/electronic_publications/cdwa/examples/images/fig02.jpg',
      title: 'Polyptych with Saint James Major, Madonna and Child, and various Saints'
    },
    {
      id: 3,
      creationDate: '1066 AD',
      creatorIdentity: 'Gogh, Vincent van',
      preview: '',
      title: 'Starry Night'
    }
  ];

  constructor(private router: Router) {}

  onViewClicked(artworkPreview: ArtworkPreview) {
    this.router.navigateByUrl(`artwork/view/${artworkPreview.id}`);
  }

  onEditClicked(artworkPreview: ArtworkPreview) {
    this.router.navigateByUrl(`artwork/edit/${artworkPreview.id}`);
  }
}
