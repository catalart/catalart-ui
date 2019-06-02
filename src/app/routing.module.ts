import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ArtCollectionListComponent } from './catalog/art-collection-list/art-collection-list.component';
import { ArtworkListComponent } from './catalog/artwork-list/artwork-list.component';

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
    component: ArtworkListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
