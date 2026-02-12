import { Component, computed, inject, input } from '@angular/core'
import { ApplicationComponent } from './application/application.component'
import { ApplicationService } from './application.service'
import { Role } from '../models/role.model'
import { Page } from '../models/page.model'
import { MatDialog } from '@angular/material/dialog'
import { NewApplicationComponent } from './new-application/new-application.component'

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

  private dialog = inject(MatDialog)

  openNewAppDialog() {
    this.dialog.open(NewApplicationComponent, {
      width: '500px',
      disableClose: true,
      panelClass: 'custom-dialog',
      data: {
        pageType: this.pageType(),
      },
    })
  }
}
