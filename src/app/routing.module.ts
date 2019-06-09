import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ArtCollectionListComponent } from './catalog/art-collection-list/art-collection-list.component';
import { ArtworkListComponent } from './catalog/artwork-section/artwork-list/artwork-list.component';
import { ArtworkEditComponent } from './catalog/artwork-section/artwork-edit/artwork-edit.component';
import { ArtworkSectionComponent } from './catalog/artwork-section/artwork-section.component';

const routes: Routes = [
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'art-collections',
    component: ArtCollectionListComponent
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
