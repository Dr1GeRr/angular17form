import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personal',
  standalone: true,
  templateUrl: './personal.component.html',
  imports: [FormsModule] // Import FormsModule here
})
export class PersonalComponent {
  constructor(private http: HttpClient) { }

  updateUserInfo(data: any) {
    const csrfToken = localStorage.getItem('csrfToken');
    const headers = new HttpHeaders().set('X-CSRF-TOKEN', csrfToken || '');

    this.http.post('/api/updateUserInfo', data, { headers }).subscribe(response => {
      console.log('User info updated', response);
    });
  }
}
