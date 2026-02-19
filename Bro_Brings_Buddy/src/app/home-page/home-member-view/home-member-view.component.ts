import { Component, input } from '@angular/core'
import { ApplicationsListComponent } from '../../applications-list/applications-list.component'
import { Role } from '../../models/role.model'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-home-member-view',
  imports: [ApplicationsListComponent, RouterLink],
  templateUrl: './home-member-view.component.html',
  styleUrl: './home-member-view.component.css',
})
export class HomeMemberViewComponent {
  username = input<string>()
  role = input<Role>()
}
