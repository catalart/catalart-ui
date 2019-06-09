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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
