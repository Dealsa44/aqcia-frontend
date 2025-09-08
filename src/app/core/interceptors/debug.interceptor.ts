import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class DebugInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('🔍 INTERCEPTOR - Request intercepted');
    console.log('🔍 INTERCEPTOR - Original URL:', req.url);
    console.log('🔍 INTERCEPTOR - Method:', req.method);
    console.log('🔍 INTERCEPTOR - Headers:', req.headers);
    console.log('🔍 INTERCEPTOR - URL protocol:', req.url.split('://')[0]);
    console.log('🔍 INTERCEPTOR - Is HTTPS:', req.url.startsWith('https://'));
    
    // Check if URL gets modified
    const modifiedReq = req.clone();
    console.log('🔍 INTERCEPTOR - Modified URL:', modifiedReq.url);
    console.log('🔍 INTERCEPTOR - Modified URL protocol:', modifiedReq.url.split('://')[0]);
    
    return next.handle(modifiedReq).pipe(
      tap(
        event => {
          console.log('🔍 INTERCEPTOR - Response event:', event);
        },
        error => {
          console.log('🔍 INTERCEPTOR - Error event:', error);
          console.log('🔍 INTERCEPTOR - Error URL:', error.url);
          console.log('🔍 INTERCEPTOR - Error status:', error.status);
        }
      )
    );
  }
}
