import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RoutingModule } from 'src/app/routing.module';
import { MaterialModule } from 'src/app/material.module';

import { ArtworkCitationSectionComponent } from './sections/artwork-citation-section/artwork-citation-section.component';
import { ArtworkArtistSectionComponent } from './sections/artwork-artist-section/artwork-artist-section.component';
import { ArtworkLocationSectionComponent } from './sections/artwork-location-section/artwork-location-section.component';
import { ArtworkMaterialAndTechniquesSectionComponent } from './sections/artwork-material-and-techniques-section/artwork-material-and-techniques-section.component';
import { ArtworkMeasurementsSectionComponent } from './sections/artwork-measurements-section/artwork-measurements-section.component';
import { ArtworkSubjectMatterSectionComponent } from './sections/artwork-subject-matter-section/artwork-subject-matter-section.component';
import { ArtworkTitleSectionComponent } from './sections/artwork-title-section/artwork-title-section.component';
import { ArtworkClassificationSectionComponent } from './sections/artwork-classification-section/artwork-classification-section.component';
import { CatalartCommonModule } from 'src/app/common/catalart-common.module';
import { ArtworkSectionsComponent } from './artwork-sections.component';

@NgModule({
  declarations: [
    ArtworkCitationSectionComponent,
    ArtworkArtistSectionComponent,
    ArtworkClassificationSectionComponent,
    ArtworkLocationSectionComponent,
    ArtworkMaterialAndTechniquesSectionComponent,
    ArtworkMeasurementsSectionComponent,
    ArtworkSubjectMatterSectionComponent,
    ArtworkTitleSectionComponent,
    ArtworkSectionsComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    CatalartCommonModule
  ],
  exports: [ArtworkSectionsComponent]
})
export class ArtworkSectionsModule {}
