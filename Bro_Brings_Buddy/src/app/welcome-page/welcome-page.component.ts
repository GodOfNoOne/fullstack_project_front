import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  imports: [],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.css',
})
export class WelcomePage {
  constructor(){}

  onClickSignIn() {
    console.log('clicked sign in')
  }
  onClickLogIn() {
    console.log('clicked log in')
  }
}
