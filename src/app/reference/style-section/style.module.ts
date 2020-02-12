import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RoutingModule } from '../../routing.module';
import { MaterialModule } from '../../material.module';
import { CatalartCommonModule } from 'src/app/common/catalart-common.module';
import { StyleSectionsModule } from './style-sections/style-sections.module';

import { StyleSectionComponent } from './style-section.component';
import { StyleEditComponent } from './style-edit/style-edit.component';
import { StyleAddComponent } from './style-add/style-add.component';

import { StyleFormService } from './style-form.service';
import { StyleService } from './style.service';
import { StyleListComponent } from './style-list/style-list.component';

@NgModule({
  declarations: [StyleSectionComponent, StyleListComponent, StyleEditComponent, StyleAddComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    StyleSectionsModule,
    CatalartCommonModule
  ],
  providers: [StyleFormService, StyleService]
})
export class StyleModule {}
