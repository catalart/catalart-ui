import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';

import { CatalartSectionComponent } from './components/catalart-section/catalart-section.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CatalartDropdownComponent } from './components/catalart-dropdown/catalart-dropdown.component';
import { CatalartTagsComponent } from './components/catalart-tags/catalart-tags.component';
import { CatalartSectionContainerComponent } from './components/section-container/catalart-section-container.component';
import { LoadingMaskComponent } from './components/loading-mask/loading-mask.component';
import { CatalartSwitchComponent } from './components/catalart-switch/catalart-switch.component';
import { CatalartConfirmationDialogComponent } from './components/catalart-confirmation-dialog/catalart-confirmation-dialog.component';
import { CatalartMultiSelectComponent } from './components/catalart-multi-select/catalart-multi-select.component';
import { CatalartButtonComponent } from './components/catalart-button/catalart-button.component';

@NgModule({
  imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
  entryComponents: [CatalartConfirmationDialogComponent],
  declarations: [
    CatalartSectionComponent,
    CatalartDropdownComponent,
    CatalartTagsComponent,
    CatalartSectionContainerComponent,
    LoadingMaskComponent,
    CatalartSwitchComponent,
    CatalartConfirmationDialogComponent,
    CatalartMultiSelectComponent,
    CatalartButtonComponent
  ],
  exports: [
    CatalartSectionComponent,
    CatalartDropdownComponent,
    CatalartTagsComponent,
    CatalartSectionContainerComponent,
    LoadingMaskComponent,
    CatalartSwitchComponent,
    CatalartConfirmationDialogComponent,
    CatalartMultiSelectComponent,
    CatalartButtonComponent
  ]
})
export class CatalartCommonModule {}
