import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RoutingModule } from 'src/app/routing.module';
import { MaterialModule } from 'src/app/material.module';

import { CatalartCommonModule } from 'src/app/common/catalart-common.module';
import { ArtCollectionSectionsComponent } from './art-collection-sections.component';
import { ArtCollectionCollectionSectionComponent } from './sections/art-collection-collection-section/art-collection-collection-section.component';
import { ArtCollectionInformationSectionComponent } from './sections/art-collection-information-section/art-collection-information-section.component';

@NgModule({
  declarations: [
    ArtCollectionInformationSectionComponent,
    ArtCollectionCollectionSectionComponent,
    ArtCollectionSectionsComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    CatalartCommonModule
  ],
  exports: [ArtCollectionSectionsComponent]
})
export class ArtCollectionSectionsModule {}
