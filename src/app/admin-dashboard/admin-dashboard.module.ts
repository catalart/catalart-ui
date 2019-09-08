import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RoutingModule } from '../routing.module';
import { MaterialModule } from '../material.module';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminCardComponent } from './admin-card/admin-card.component';

@NgModule({
  declarations: [AdminDashboardComponent, AdminCardComponent],
  imports: [BrowserModule, RoutingModule, BrowserAnimationsModule, MaterialModule]
})
export class AdminDashboardModule {}
