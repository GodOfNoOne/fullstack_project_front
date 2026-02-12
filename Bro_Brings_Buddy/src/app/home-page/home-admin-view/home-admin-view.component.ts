import { Component, input } from '@angular/core'
import { Role } from '../../models/role.model'
import { ApplicationsListComponent } from '../../applications-list/applications-list.component'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-home-admin-view',
  imports: [ApplicationsListComponent, RouterLink],
  templateUrl: './home-admin-view.component.html',
  styleUrl: './home-admin-view.component.css',
})
export class HomeAdminViewComponent {
  username = input<string>()
  role = input<Role>()
}
