import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Import CommonModule for Angular directives
import { FormsModule } from '@angular/forms';  // Import FormsModule for form handling

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],  // Ensure this is styleUrls (plural)
  imports: [CommonModule, FormsModule]  // Import CommonModule and FormsModule here
})
export class contactcomponent {
  constructor(private http: HttpClient) { }

  submitContactDetails(data: any) {
    const csrfToken = localStorage.getItem('csrfToken');  // Retrieve CSRF token from local storage
    const headers = new HttpHeaders().set('X-CSRF-TOKEN', csrfToken || '');  // Set CSRF token in headers

    this.http.post('/api/submitContactDetails', data, { headers }).subscribe(response => {
      console.log('Contact details submitted', response);
    });
  }
}
