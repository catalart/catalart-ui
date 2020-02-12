import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RoutingModule } from 'src/app/routing.module';
import { MaterialModule } from 'src/app/material.module';

import { CatalartCommonModule } from 'src/app/common/catalart-common.module';
import { StyleBaseSectionComponent } from './sections/style-base-section/style-base-section.component';
import { StyleSectionsComponent } from './style-sections.component';

@NgModule({
  declarations: [StyleBaseSectionComponent, StyleSectionsComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    CatalartCommonModule
  ],
  exports: [StyleSectionsComponent]
})
export class StyleSectionsModule {}
