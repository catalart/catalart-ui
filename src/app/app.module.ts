import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { CatalogModule } from './catalog/catalog.module';
import { CatalartCommonModule } from './common/catalart-common.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdminDashboardModule,
    CatalogModule,
    CatalartCommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
