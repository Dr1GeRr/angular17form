import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add the JWT token to the Authorization header
    const token = this.authService.tokenValue;
    let headers: any = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Get CSRF token from localStorage or cookies
    const csrfToken = localStorage.getItem('csrfToken'); // Adjust this if your token is stored elsewhere (e.g., cookies)
    if (csrfToken) {
      headers['X-CSRF-TOKEN'] = csrfToken;
    }

    // Clone the request and set the new headers
    request = request.clone({
      setHeaders: headers
    });

    return next.handle(request);
  }
}
