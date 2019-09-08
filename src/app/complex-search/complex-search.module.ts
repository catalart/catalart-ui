import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { RoutingModule } from '../routing.module';
import { MaterialModule } from '../material.module';
import { CatalartCommonModule } from '../common/catalart-common.module';
import { ComplexSearchComponent } from './complex-search.component';

@NgModule({
  declarations: [ComplexSearchComponent],
  imports: [RoutingModule, BrowserAnimationsModule, MaterialModule, CatalartCommonModule, ReactiveFormsModule]
})
export class ComplexSearchModule {}
