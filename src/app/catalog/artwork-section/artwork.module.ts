import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RoutingModule } from '../../routing.module';
import { MaterialModule } from '../../material.module';
import { ArtworkSectionsModule } from './artwork-sections/artwork-sections.module';
import { CommonModule } from 'src/app/common/common.module';

import { ArtworkListComponent } from './artwork-list/artwork-list.component';
import { ArtworkPreviewCardComponent } from './artwork-list/artwork-preview-card/artwork-preview-card.component';
import { ArtworkEditComponent } from './artwork-edit/artwork-edit.component';
import { ArtworkSectionComponent } from './artwork-section.component';

import { ArtworkFormService } from './artwork-form.service';
import { ArtworkAddComponent } from './artwork-add/artwork-add.component';

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
    CommonModule
  ],
  providers: [ArtworkFormService]
})
export class ArtworkModule {}
