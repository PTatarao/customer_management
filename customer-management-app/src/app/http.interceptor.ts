import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve token from localStorage (or another storage method)
    const authToken = localStorage.getItem('token');

    // Clone the request to modify headers
    const modifiedReq = req.clone({
      setHeaders: {
        'Authorization': `${authToken}`,
        'Content-Type': 'application/json' // You can add more headers if needed
      }
    });

    // Send the modified request
    return next.handle(modifiedReq);
  }
}
