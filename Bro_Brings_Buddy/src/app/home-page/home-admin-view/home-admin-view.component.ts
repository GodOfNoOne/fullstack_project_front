import { Component, inject, input } from '@angular/core'
import { Role } from '../../models/role.model'
import { ApplicationsListComponent } from '../../applications-list/applications-list.component'
import { Router } from '@angular/router'
import { NavButtonsComponent } from '../../nav-buttons/nav-buttons.component'

@Component({
  selector: 'app-home-admin-view',
  imports: [ApplicationsListComponent, NavButtonsComponent],
  templateUrl: './home-admin-view.component.html',
  styleUrl: './home-admin-view.component.css',
})
export class HomeAdminViewComponent {
  private router = inject(Router)
  username = input<string>()
  role = input<Role>()

  goToMinigame() {
    this.router.navigate(['/minigame'])
  }
  goToAdmin() {
    this.router.navigate(['/admin'])
  }
}
