import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RoutingModule } from 'src/app/routing.module';
import { MaterialModule } from 'src/app/material.module';

import { CatalartCommonModule } from 'src/app/common/catalart-common.module';
import { ArtistSectionsComponent } from './artist-sections.component';
import { ArtistGeneralInformationSectionComponent } from './sections/artist-general-information-section/artist-general-information-section.component';

@NgModule({
  declarations: [ArtistSectionsComponent, ArtistGeneralInformationSectionComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    CatalartCommonModule
  ],
  exports: [ArtistSectionsComponent]
})
export class ArtistSectionsModule {}
