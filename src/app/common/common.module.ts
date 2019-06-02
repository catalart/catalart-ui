import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';

import { CatalartSectionComponent } from './components/catalart-section/catalart-section.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
  declarations: [CatalartSectionComponent],
  exports: [CatalartSectionComponent]
})
export class CommonModule {}
