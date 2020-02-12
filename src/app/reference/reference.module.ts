import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RoutingModule } from '../routing.module';
import { MaterialModule } from '../material.module';
import { GenreModule } from './genre-section/genre.module';
import { StyleModule } from './style-section/style.module';

import { ReferenceComponent } from './reference.component';

@NgModule({
  declarations: [ReferenceComponent],
  imports: [BrowserModule, RoutingModule, BrowserAnimationsModule, MaterialModule, GenreModule, StyleModule],
  exports: [ReferenceComponent]
})
export class ReferenceModule {}
