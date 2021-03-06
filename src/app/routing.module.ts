import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ArtworkListComponent } from './catalog/artwork-section/artwork-list/artwork-list.component';
import { ArtworkEditComponent } from './catalog/artwork-section/artwork-edit/artwork-edit.component';
import { ArtworkSectionComponent } from './catalog/artwork-section/artwork-section.component';
import { ArtworkAddComponent } from './catalog/artwork-section/artwork-add/artwork-add.component';
import { ComplexSearchComponent } from './complex-search/complex-search.component';
import { ArtCollectionSectionComponent } from './catalog/art-collection-section/art-collection-section.component';
import { ArtCollectionListComponent } from './catalog/art-collection-section/art-collection-list/art-collection-list.component';
import { ArtCollectionEditComponent } from './catalog/art-collection-section/art-collection-edit/art-collection-edit.component';
import { ArtCollectionAddComponent } from './catalog/art-collection-section/art-collection-add/art-collection-add.component';
import { ArtistListComponent } from './catalog/artist-sections/artist-list/artist-list.component';
import { ArtistSectionComponent } from './catalog/artist-sections/artist-section.component';
import { ArtistEditComponent } from './catalog/artist-sections/artist-edit/artist-edit.component';
import { ArtistAddComponent } from './catalog/artist-sections/artist-add/artist-add.component';
import { ReferenceComponent } from './reference/reference.component';
import { GenreSectionComponent } from './reference/genre-section/genre-section.component';
import { GenreListComponent } from './reference/genre-section/genre-list/genre-list.component';
import { GenreEditComponent } from './reference/genre-section/genre-edit/genre-edit.component';
import { GenreAddComponent } from './reference/genre-section/genre-add/genre-add.component';
import { StyleAddComponent } from './reference/style-section/style-add/style-add.component';
import { StyleEditComponent } from './reference/style-section/style-edit/style-edit.component';
import { StyleListComponent } from './reference/style-section/style-list/style-list.component';
import { StyleSectionComponent } from './reference/style-section/style-section.component';

const routes: Routes = [
  {
    path: '',
    component: ComplexSearchComponent
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'reference',
    component: ReferenceComponent,
    children: [
      {
        path: 'genres',
        component: GenreSectionComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: GenreListComponent
          },
          {
            path: 'edit/:id',
            component: GenreEditComponent
          },
          {
            path: 'add',
            component: GenreAddComponent
          }
        ]
      },
      {
        path: 'styles',
        component: StyleSectionComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: StyleListComponent
          },
          {
            path: 'edit/:id',
            component: StyleEditComponent
          },
          {
            path: 'add',
            component: StyleAddComponent
          }
        ]
      }
    ]
  },
  {
    path: 'art-collections',
    component: ArtCollectionSectionComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ArtCollectionListComponent
      },
      {
        path: 'edit/:id',
        component: ArtCollectionEditComponent
      },
      {
        path: 'add',
        component: ArtCollectionAddComponent
      }
    ]
  },
  {
    path: 'artwork',
    component: ArtworkSectionComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ArtworkListComponent
      },
      {
        path: 'edit/:id',
        component: ArtworkEditComponent
      },
      {
        path: 'add',
        component: ArtworkAddComponent
      }
    ]
  },
  {
    path: 'artists',
    component: ArtistSectionComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ArtistListComponent
      },
      {
        path: 'edit/:id',
        component: ArtistEditComponent
      },
      {
        path: 'add',
        component: ArtistAddComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
