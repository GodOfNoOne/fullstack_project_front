import { Component, inject, OnInit, signal } from '@angular/core'
import { Router } from '@angular/router'
import { Role } from '../models/role.model'
import { HomeBroViewComponent } from './home-bro-view/home-bro-view.component'
import { HomeMemberViewComponent } from './home-member-view/home-member-view.component'
import { HomeAdminViewComponent } from './home-admin-view/home-admin-view.component'
import { HeaderComponent } from '../header/header.component'
import { Page } from '../models/page.model'
import { UserManageService } from '../user-manage.service'
import { NavButtonsComponent } from '../nav-buttons/nav-buttons.component'

@Component({
  selector: 'app-home-page',
  imports: [
    HeaderComponent,
    HomeBroViewComponent,
    HomeMemberViewComponent,
    HomeAdminViewComponent,
    NavButtonsComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  private router = inject(Router)
  private userService = inject(UserManageService)

  username = this.userService.username
  role = this.userService.role

  pageType = signal<Page>('Home')

  onLogOut() {
    const wantsToLogOut = window.confirm('Are you sure you want to log out?')

    if (wantsToLogOut) {
      this.userService.logout()
    }
  }
}
