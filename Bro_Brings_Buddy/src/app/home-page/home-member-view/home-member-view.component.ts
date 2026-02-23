import { Component, inject, input } from '@angular/core'
import { ApplicationsListComponent } from '../../applications-list/applications-list.component'
import { Role } from '../../models/role.model'
import { Router } from '@angular/router'
import { NavButtonsComponent } from '../../nav-buttons/nav-buttons.component'

@Component({
  selector: 'app-home-member-view',
  imports: [ApplicationsListComponent, NavButtonsComponent],
  templateUrl: './home-member-view.component.html',
  styleUrl: './home-member-view.component.css',
})
export class HomeMemberViewComponent {
  private router = inject(Router)
  username = input<string>()
  role = input<Role>()

  goToMinigame() {
    this.router.navigate(['/minigame'])
  }
}
