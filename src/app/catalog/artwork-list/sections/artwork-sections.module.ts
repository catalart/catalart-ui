import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RoutingModule } from 'src/app/routing.module';
import { MaterialModule } from 'src/app/material.module';

import { ArtworkObjectSectionComponent } from './artwork-object-section/artwork-object-section.component';
import { ArtworkCitationSectionComponent } from './artwork-citation-section/artwork-citation-section.component';
import { ArtworkCreationSectionComponent } from './artwork-creation-section/artwork-creation-section.component';
import { ArtworkLocationSectionComponent } from './artwork-location-section/artwork-location-section.component';
import { ArtworkMaterialAndTechniquesSectionComponent } from './artwork-material-and-techniques-section/artwork-material-and-techniques-section.component';
import { ArtworkMeasurementsSectionComponent } from './artwork-measurements-section/artwork-measurements-section.component';
import { ArtworkSubjectMatterSectionComponent } from './artwork-subject-matter-section/artwork-subject-matter-section.component';
import { ArtworkTitleSectionComponent } from './artwork-title-section/artwork-title-section.component';
import { ArtworkVisualDocumentationSectionComponent } from './artwork-visual-documentation-section/artwork-visual-documentation-section.component';
import { ArtworkClassificationSectionComponent } from './artwork-classification-section/artwork-classification-section.component';
import { CommonModule } from 'src/app/common/common.module';

@NgModule({
  declarations: [
    ArtworkCitationSectionComponent,
    ArtworkCreationSectionComponent,
    ArtworkClassificationSectionComponent,
    ArtworkLocationSectionComponent,
    ArtworkMaterialAndTechniquesSectionComponent,
    ArtworkMeasurementsSectionComponent,
    ArtworkObjectSectionComponent,
    ArtworkSubjectMatterSectionComponent,
    ArtworkTitleSectionComponent,
    ArtworkVisualDocumentationSectionComponent
  ],
  imports: [BrowserModule, RoutingModule, BrowserAnimationsModule, MaterialModule, ReactiveFormsModule, CommonModule],
  exports: [
    ArtworkCitationSectionComponent,
    ArtworkCreationSectionComponent,
    ArtworkClassificationSectionComponent,
    ArtworkLocationSectionComponent,
    ArtworkMaterialAndTechniquesSectionComponent,
    ArtworkMeasurementsSectionComponent,
    ArtworkObjectSectionComponent,
    ArtworkSubjectMatterSectionComponent,
    ArtworkTitleSectionComponent,
    ArtworkVisualDocumentationSectionComponent
  ]
})
export class ArtworkSectionsModule {}
