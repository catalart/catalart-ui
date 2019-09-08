import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RoutingModule } from '../routing.module';
import { MaterialModule } from '../material.module';
import { ArtworkModule } from './artwork-section/artwork.module';
import { ArtCollectionModule } from './art-collection-section/art-collection.module';

@NgModule({
  imports: [BrowserModule, RoutingModule, BrowserAnimationsModule, MaterialModule, ArtworkModule, ArtCollectionModule]
})
export class CatalogModule {}
