import { Component, signal } from '@angular/core';
import { WelcomePage } from "./welcome-page/welcome-page.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [WelcomePage, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Bro_Brings_Buddy');
}
