import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RoutingModule } from '../../routing.module';
import { MaterialModule } from '../../material.module';
import { CatalartCommonModule } from 'src/app/common/catalart-common.module';
import { ArtCollectionSectionsModule } from './art-collection-sections/art-collection-sections.module';

import { ArtCollectionListComponent } from './art-collection-list/art-collection-list.component';
import { ArtCollectionSectionComponent } from './art-collection-section.component';
import { ArtCollectionPreviewCardComponent } from './art-collection-list/art-collection-preview-card/art-collection-preview-card.component';
import { ArtCollectionEditComponent } from './art-collection-edit/art-collection-edit.component';
import { ArtCollectionAddComponent } from './art-collection-add/art-collection-add.component';

import { ArtCollectionFormService } from './art-collection-form.service';
import { ArtCollectionService } from './art-collection.service';

@NgModule({
  declarations: [
    ArtCollectionSectionComponent,
    ArtCollectionListComponent,
    ArtCollectionPreviewCardComponent,
    ArtCollectionEditComponent,
    ArtCollectionAddComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    ArtCollectionSectionsModule,
    CatalartCommonModule
  ],
  providers: [ArtCollectionFormService, ArtCollectionService]
})
export class ArtCollectionModule {}
