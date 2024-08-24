import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;
  public token: Observable<string | null>;

  constructor(private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
    this.token = this.tokenSubject.asObservable();
  }

  public get tokenValue(): string | null {
    return this.tokenSubject.value;
  }

  login(username: string, password: string, headers?: HttpHeaders): Observable<any> {
    const options = headers ? { headers } : {};
    return this.http.post<any>(`/api/auth/login`, { username, password }, options)
      .pipe(map(response => {
        // Store JWT token in local storage
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.tokenSubject.next(response.token);
        }
        return response;
      }));
  }

  logout(): void {
    // Clear session-related data
    localStorage.removeItem('token');         // Remove JWT token
    localStorage.removeItem('csrfToken');     // Remove CSRF token if stored
    // You can clear other session-related data here if necessary
    this.tokenSubject.next(null);
  }

  isAuthenticated(): boolean {
    // Check if the token exists
    return !!this.tokenValue;
  }
}
