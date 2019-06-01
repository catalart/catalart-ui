import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RoutingModule } from '../routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [BrowserModule, RoutingModule, BrowserAnimationsModule, MaterialModule],
  bootstrap: [AdminDashboardComponent]
})
export class AdminDashboardModule {}
