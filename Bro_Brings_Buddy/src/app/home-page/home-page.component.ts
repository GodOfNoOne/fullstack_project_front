import { Component, inject, signal } from '@angular/core'
import { Router } from '@angular/router'
import { Role } from '../models/role.model'
import { HomeBroViewComponent } from './home-bro-view/home-bro-view.component'
import { HomeMemberViewComponent } from './home-member-view/home-member-view.component'
import { HomeAdminViewComponent } from './home-admin-view/home-admin-view.component'
import { HeaderComponent } from '../header/header.component'
import { Page } from '../models/page.model'

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, HomeBroViewComponent, HomeMemberViewComponent, HomeAdminViewComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  private router = inject(Router)

  //When I make backend I'll make a service that will get the username and role
  username = signal('GodOfNoOne')
  role = signal<Role>('member')

  pageType = signal<Page>('Home')
  onLogOut() {
    const wantsToLogOut = window.confirm('Are you sure you want to log out?')

    if (wantsToLogOut) {
      this.router.navigate([''])
    }
  }
}
