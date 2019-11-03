import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(map(res => this.handleResponse(res)));
  }

  private handleResponse(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      if (event.body.success) {
        const successfulResponse = event.clone({ body: event.body.result });
        return successfulResponse;
      }
    }
  }
}
