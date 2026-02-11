import { Component, inject, signal } from '@angular/core'
import { Router } from '@angular/router'
import { HomeHeaderComponent } from './home-header/home-header.component'
import { Role } from '../models/role.model'
import { HomeBroViewComponent } from './home-bro-view/home-bro-view.component'
import { HomeMemberViewComponent } from './home-member-view/home-member-view.component'
import { HomeAdminViewComponent } from './home-admin-view/home-admin-view.component'

@Component({
  selector: 'app-home-page',
  imports: [
    HomeHeaderComponent,
    HomeBroViewComponent,
    HomeMemberViewComponent,
    HomeAdminViewComponent,
  ],
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  private router = inject(Router)
  username = signal('GodOfNoOne')
  role = signal<Role>('admin')
  onLogOut() {
    const wantsToLogOut = window.confirm('Are you sure you want to log out?')

    if (wantsToLogOut) {
      this.router.navigate([''])
    }
  }
}
