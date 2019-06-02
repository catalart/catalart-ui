import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RoutingModule } from '../../routing.module';
import { MaterialModule } from '../../material.module';

import { ArtworkListComponent } from './artwork-list.component';
import { ArtworkPreviewCardComponent } from './artwork-preview-card/artwork-preview-card.component';
import { ArtworkEditComponent } from './artwork-edit/artwork-edit.component';

import { ArtworkFormService } from './artwork-edit/artwork-form.service';

@NgModule({
  declarations: [ArtworkListComponent, ArtworkPreviewCardComponent, ArtworkEditComponent],
  imports: [BrowserModule, RoutingModule, BrowserAnimationsModule, MaterialModule, ReactiveFormsModule],
  providers: [ArtworkFormService]
})
export class ArtworkModule {}
