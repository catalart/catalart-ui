import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';

import { CatalartSectionComponent } from './components/catalart-section/catalart-section.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CatalartDropdownComponent } from './components/catalart-dropdown/catalart-dropdown.component';
import { CatalartTagsComponent } from './components/catalart-tags/catalart-tags.component';

@NgModule({
  imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
  declarations: [CatalartSectionComponent, CatalartDropdownComponent, CatalartTagsComponent],
  exports: [CatalartSectionComponent, CatalartDropdownComponent, CatalartTagsComponent]
})
export class CommonModule {}
