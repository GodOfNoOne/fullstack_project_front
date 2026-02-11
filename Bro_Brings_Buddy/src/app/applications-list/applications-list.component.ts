import { Component, computed, inject, input, signal } from '@angular/core'
import { ApplicationFrom } from '../models/application-form.model'
import { ApplicationComponent } from './application/application.component'
import { ApplicationService } from './application.service'
import { Role } from '../models/role.model'

@Component({
  selector: 'app-applications-list',
  imports: [ApplicationComponent],
  templateUrl: './applications-list.component.html',
  styleUrl: './applications-list.component.css',
})
export class ApplicationsListComponent {
  username = input<string>()
  role = input<Role>()

  canDeleteApp = computed(() => {
    if (this.role() === 'bro') {
      return false
    }
    return true
  })

  private applicationService = inject(ApplicationService)
  applicationsList = computed(() => {
    if (this.role() === 'member') {
      console.log(
        this.applicationService.getApplications().filter((app) => app.fromUser === this.username()),
      )
      return this.applicationService
        .getApplications()
        .filter((app) => app.fromUser === this.username() && app.appType === 'Member')
    } else if (this.role() === 'admin') {
      return this.applicationService
        .getApplications()
        .filter((app) => app.fromUser === this.username())
    }
    return this.applicationService
      .getApplications()
      .filter((app) => app.forUser === this.username() && app.appType === 'Member')
  })
}
