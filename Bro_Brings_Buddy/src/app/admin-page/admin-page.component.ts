import { Component, signal } from '@angular/core'
import { Page } from '../models/page.model'
import { HeaderComponent } from '../header/header.component'
import { RouterLink } from '@angular/router'
import { Role } from '../models/role.model'
import { ApplicationsListComponent } from '../applications-list/applications-list.component'

@Component({
  selector: 'app-admin-page',
  imports: [HeaderComponent, RouterLink, ApplicationsListComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent {
  //When I make backend I'll make a service that will get the username and roll
  username = signal('GodOfNoOne')
  pageType = signal<Page>('Admin')
}
