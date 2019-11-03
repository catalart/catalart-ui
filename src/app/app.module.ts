import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RoutingModule } from './routing.module';
import { MaterialModule } from './material.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { CatalogModule } from './catalog/catalog.module';
import { CatalartCommonModule } from './common/catalart-common.module';
import { ComplexSearchModule } from './complex-search/complex-search.module';

import { ErrorInterceptor } from './interceptors/error.interceptor';

import { AppComponent } from './app.component';
import { ResponseInterceptor } from './interceptors/response.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdminDashboardModule,
    CatalogModule,
    CatalartCommonModule,
    ComplexSearchModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
