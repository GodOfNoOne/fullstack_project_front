import { Component, computed, inject, input, signal } from '@angular/core'
import { ApplicationFrom } from '../models/application-form.model'
import { ApplicationComponent } from './application/application.component'
import { ApplicationService } from './application.service'
import { Role } from '../models/role.model'
import { Page } from '../models/page.model'

@Component({
  selector: 'app-applications-list',
  imports: [ApplicationComponent],
  templateUrl: './applications-list.component.html',
  styleUrl: './applications-list.component.css',
})
export class ApplicationsListComponent {
  username = input<string>()
  role = input<Role>()
  pageType = input<Page>()

  canDeleteApp = computed(() => {
    if (this.role() === 'bro') {
      return false
    }
    return true
  })

  canVote = computed(() => {
    if (this.pageType() === 'Admin') {
      return true
    }
    return false
  })

  private applicationService = inject(ApplicationService)
  applicationsList = computed(() => {
    if (this.pageType() === 'Admin') {
      return this.applicationService
        .getApplications()
        .filter((app) => app.fromUser !== this.username())
    } else if (this.role() === 'member') {
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
