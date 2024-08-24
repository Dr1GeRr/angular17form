import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionService } from './session.service';  // Import the SessionService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Corrected to styleUrls (plural)
})
export class AppComponent {
  title = 'multilayerform';

  constructor(private sessionService: SessionService) {
    // The SessionService will start the session timer automatically
  }
}
