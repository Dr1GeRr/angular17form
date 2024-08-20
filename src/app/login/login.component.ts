import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const csrfToken = localStorage.getItem('csrfToken'); // Fetch CSRF token if stored in localStorage
    const headers = new HttpHeaders().set('X-CSRF-TOKEN', csrfToken || ''); // Set the CSRF token header

    this.authService.login(this.username, this.password, headers).subscribe({
      next: () => {
        // Redirect to the protected route after login
        this.router.navigate(['/personal']);
      },
      error: (error) => {
        console.error('Login failed', error);
      },
      complete: () => {
        console.log('Login request completed');
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
