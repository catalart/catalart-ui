import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RoutingModule } from '../../routing.module';
import { MaterialModule } from '../../material.module';
import { CatalartCommonModule } from 'src/app/common/catalart-common.module';
import { GenreSectionsModule } from './genre-sections/genre-sections.module';

import { GenreSectionComponent } from './genre-section.component';
import { GenreEditComponent } from './genre-edit/genre-edit.component';
import { GenreAddComponent } from './genre-add/art-collection-add.component';

import { GenreFormService } from './genre-form.service';
import { GenreService } from './genre.service';
import { GenreListComponent } from './genre-list/genre-list.component';

@NgModule({
  declarations: [GenreSectionComponent, GenreListComponent, GenreEditComponent, GenreAddComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    GenreSectionsModule,
    CatalartCommonModule
  ],
  providers: [GenreFormService, GenreService]
})
export class GenreModule {}
