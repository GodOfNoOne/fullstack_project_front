import { Component, inject, OnInit, signal } from '@angular/core'
import { Page } from '../models/page.model'
import { HeaderComponent } from '../header/header.component'
import { RouterLink } from '@angular/router'
import { Role } from '../models/role.model'
import { ApplicationsListComponent } from '../applications-list/applications-list.component'
import { UserManageService } from '../user-manage.service'

@Component({
  selector: 'app-admin-page',
  imports: [HeaderComponent, RouterLink, ApplicationsListComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent implements OnInit {
  private userService = inject(UserManageService)

  ngOnInit(): void {
    this.userService.restoreUser()
  }

  username = this.userService.username
  role = this.userService.role
  pageType = signal<Page>('Admin')
}
