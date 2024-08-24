import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessionTimeout: any;
  private readonly TIMEOUT_DURATION = 15 * 60 * 1000; // 15 minutes

  constructor(private router: Router, private authService: AuthService) {
    this.resetTimer();
    this.initListener();
  }

  initListener() {
    document.body.addEventListener('mousemove', () => this.resetTimer());
    document.body.addEventListener('keydown', () => this.resetTimer());
    document.body.addEventListener('click', () => this.resetTimer());
  }

  resetTimer() {
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
    }
    this.sessionTimeout = setTimeout(() => this.endSession(), this.TIMEOUT_DURATION);
  }

  endSession() {
    this.authService.logout();  // Log out the user
    this.router.navigate(['/login']);  // Redirect to login page
    alert('Your session has expired. Please log in again.');
  }
}
