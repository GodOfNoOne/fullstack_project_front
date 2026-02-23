import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-welcome-page',
  imports: [],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css',
})
export class WelcomePageComponenet {
  private router = inject(Router)

  onClickSignIn() {
    this.router.navigate(['/sign-in'])
  }
  onClickLogIn() {
    this.router.navigate(['/log-in'])
  }
}
