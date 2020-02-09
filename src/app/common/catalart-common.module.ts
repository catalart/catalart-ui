import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../material.module';
import { RoutingModule } from '../routing.module';

import { CatalartSectionComponent } from './components/catalart-section/catalart-section.component';
import { CatalartDropdownComponent } from './components/catalart-dropdown/catalart-dropdown.component';
import { CatalartTagsComponent } from './components/catalart-tags/catalart-tags.component';
import { CatalartSectionContainerComponent } from './components/catalart-section-container/catalart-section-container.component';
import { LoadingMaskComponent } from './components/loading-mask/loading-mask.component';
import { CatalartSwitchComponent } from './components/catalart-switch/catalart-switch.component';
import { CatalartConfirmationDialogComponent } from './components/catalart-confirmation-dialog/catalart-confirmation-dialog.component';
import { CatalartMultiSelectComponent } from './components/catalart-multi-select/catalart-multi-select.component';
import { CatalartButtonComponent } from './components/catalart-button/catalart-button.component';
import { CatalartSearchComponent } from './components/catalart-search/catalart-search.component';
import { CatalartSearchBarComponent } from './components/catalart-search-bar/catalart-search-bar.component';
import { CatalartPreviewSectionComponent } from './components/catalart-preview-section/catalart-preview-section.component';
import { CatalartDateAndPlaceSectionComponent } from './components/catalart-date-and-place-section/catalart-date-and-place-section.component';
import { CatalartBreadcrumbsComponent } from './components/catalart-breadcrumbs/catalart-breadcrumbs.component';
import { CatalartContainerComponent } from './components/catalart-container/catalart-container.component';
import { CatalartReferenceTableComponent } from './components/catalart-reference-table/catalart-reference-table.component';

@NgModule({
  imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule, RoutingModule],
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
    CatalartButtonComponent,
    CatalartSearchComponent,
    CatalartSearchBarComponent,
    CatalartPreviewSectionComponent,
    CatalartDateAndPlaceSectionComponent,
    CatalartBreadcrumbsComponent,
    CatalartContainerComponent,
    CatalartReferenceTableComponent
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
    CatalartButtonComponent,
    CatalartSearchComponent,
    CatalartSearchBarComponent,
    CatalartPreviewSectionComponent,
    CatalartDateAndPlaceSectionComponent,
    CatalartBreadcrumbsComponent,
    CatalartContainerComponent,
    CatalartReferenceTableComponent
  ]
})
export class CatalartCommonModule {}
