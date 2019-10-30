import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RoutingModule } from '../../routing.module';
import { MaterialModule } from '../../material.module';
import { ArtistSectionsModule } from './artist-sections/artist-sections.module';
import { CatalartCommonModule } from 'src/app/common/catalart-common.module';

import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistEditComponent } from './artist-edit/artist-edit.component';
import { ArtistAddComponent } from './artist-add/artist-add.component';
import { ArtistSectionComponent } from './artist-section.component';
import { ArtistPreviewCardComponent } from './artist-list/artist-preview-card/artist-preview-card.component';
import { ArtistFormService } from './artist-form.service';
import { ArtistService } from './artist.service';

@NgModule({
  declarations: [
    ArtistSectionComponent,
    ArtistListComponent,
    ArtistPreviewCardComponent,
    ArtistEditComponent,
    ArtistAddComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    ArtistSectionsModule,
    CatalartCommonModule,
    HttpClientModule
  ],
  providers: [ArtistFormService, ArtistService]
})
export class ArtistModule {}
