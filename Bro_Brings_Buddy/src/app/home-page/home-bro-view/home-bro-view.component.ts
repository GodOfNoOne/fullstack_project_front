import { Component, input } from '@angular/core'
import { ApplicationFrom } from '../../models/application-form.model'
import { Role } from '../../models/role.model'
import { ApplicationsListComponent } from '../../applications-list/applications-list.component'

@Component({
  selector: 'app-home-bro-view',
  imports: [ApplicationsListComponent],
  templateUrl: './home-bro-view.component.html',
  styleUrl: './home-bro-view.component.css',
})
export class HomeBroViewComponent {
  username = input<string>()
  role = input<Role>()
}
