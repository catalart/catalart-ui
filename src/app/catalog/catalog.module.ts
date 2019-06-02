import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RoutingModule } from '../routing.module';
import { MaterialModule } from '../material.module';

import { ArtworkListComponent } from './artwork-list/artwork-list.component';
import { ArtCollectionListComponent } from './art-collection-list/art-collection-list.component';

@NgModule({
  declarations: [ArtworkListComponent, ArtCollectionListComponent],
  imports: [BrowserModule, RoutingModule, BrowserAnimationsModule, MaterialModule]
})
export class CatalogModule {}
