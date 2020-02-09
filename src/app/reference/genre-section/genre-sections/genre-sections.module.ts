import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RoutingModule } from 'src/app/routing.module';
import { MaterialModule } from 'src/app/material.module';

import { CatalartCommonModule } from 'src/app/common/catalart-common.module';
import { GenreBaseSectionComponent } from './sections/genre-base-section/genre-base-section.component';
import { GenreSectionsComponent } from './genre-sections.component';

@NgModule({
  declarations: [GenreBaseSectionComponent, GenreSectionsComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    CatalartCommonModule
  ],
  exports: [GenreSectionsComponent]
})
export class GenreSectionsModule {}
