import { Component, inject, OnInit, signal } from '@angular/core'
import { Page } from '../models/page.model'
import { HeaderComponent } from '../header/header.component'
import { Router } from '@angular/router'
import { ApplicationsListComponent } from '../applications-list/applications-list.component'
import { UserManageService } from '../user-manage.service'
import { NavButtonsComponent } from '../nav-buttons/nav-buttons.component'

@Component({
  selector: 'app-admin-page',
  imports: [HeaderComponent, ApplicationsListComponent, NavButtonsComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent implements OnInit {
  private userService = inject(UserManageService)
  private router = inject(Router)

  ngOnInit(): void {
    this.userService.restoreUser()
  }

  username = this.userService.username
  role = this.userService.role
  pageType = signal<Page>('Admin')

  goToHome() {
    this.router.navigate(['/home'])
  }
}
