import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RoutingModule } from '../../routing.module';
import { MaterialModule } from '../../material.module';
import { ArtworkSectionsModule } from './artwork-sections/artwork-sections.module';
import { CatalartCommonModule } from 'src/app/common/catalart-common.module';

import { ArtworkListComponent } from './artwork-list/artwork-list.component';
import { ArtworkPreviewCardComponent } from './artwork-list/artwork-preview-card/artwork-preview-card.component';
import { ArtworkEditComponent } from './artwork-edit/artwork-edit.component';
import { ArtworkSectionComponent } from './artwork-section.component';
import { ArtworkAddComponent } from './artwork-add/artwork-add.component';

import { ArtworkFormService } from './artwork-form.service';
import { ArtworkService } from './artwork.service';

@NgModule({
  declarations: [
    ArtworkSectionComponent,
    ArtworkListComponent,
    ArtworkPreviewCardComponent,
    ArtworkEditComponent,
    ArtworkAddComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    ArtworkSectionsModule,
    CatalartCommonModule,
    HttpClientModule
  ],
  providers: [ArtworkFormService, ArtworkService]
})
export class ArtworkModule {}
