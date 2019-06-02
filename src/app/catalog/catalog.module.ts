import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RoutingModule } from '../routing.module';
import { MaterialModule } from '../material.module';
import { ArtworkModule } from './artwork-list/artwork.module';

import { ArtCollectionListComponent } from './art-collection-list/art-collection-list.component';

@NgModule({
  declarations: [ArtCollectionListComponent],
  imports: [BrowserModule, RoutingModule, BrowserAnimationsModule, MaterialModule, ArtworkModule]
})
export class CatalogModule {}
