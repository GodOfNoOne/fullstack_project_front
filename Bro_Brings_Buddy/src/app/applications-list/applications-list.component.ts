import { Component, computed, inject, input, OnInit, signal } from '@angular/core'
import { ApplicationComponent } from './application/application.component'
import { ApplicationService } from './application.service'
import { Role } from '../models/role.model'
import { Page } from '../models/page.model'
import { MatDialog } from '@angular/material/dialog'
import { NewApplicationComponent } from './new-application/new-application.component'
import { ApplicationFrom } from '../models/application-form.model'
import { finalize } from 'rxjs'

@Component({
  selector: 'app-applications-list',
  imports: [ApplicationComponent],
  templateUrl: './applications-list.component.html',
  styleUrl: './applications-list.component.css',
})
export class ApplicationsListComponent {
  private applicationService = inject(ApplicationService)

  applicationsList = signal<ApplicationFrom[]>([])
  username = input<string>()
  role = input<Role>()
  pageType = input<Page>()
  loading = signal(false)

  ngOnInit() {
    this.reloadApplications()
  }

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

  canAddApp = computed(() => {
    if (this.role() === 'bro') {
      return false
    }
    return true
  })

  onDeleteApp(appId: number) {
    this.loading.set(true)

    this.applicationService
      .deleteApplication(appId)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.reloadApplications()
        },
        error: () => {
          alert('Failed to delete application')
        },
      })
  }

  onVote(appId: number) {
    this.applicationService.updateAdminVotes(appId, 'Vote').subscribe({
      next: () => {
        this.reloadApplications()
      },
      error: (err) => {
        alert(err.error?.message)
      },
    })
  }

  onUnvote(appId: number) {
    this.applicationService.updateAdminVotes(appId, 'Unvote').subscribe({
      next: () => {
        this.reloadApplications()
      },
      error: (err) => {
        alert(err.error?.message)
      },
    })
  }

  reloadApplications() {
    this.loading.set(true)

    this.applicationService
      .getApplicationsForUser(this.pageType()!)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((apps) => this.applicationsList.set(apps))
  }

  private dialog = inject(MatDialog)

  openNewAppDialog() {
    const dialogRef = this.dialog.open(NewApplicationComponent, {
      width: '31.25rem',
      disableClose: true,
      panelClass: 'custom-dialog',
      data: {
        pageType: this.pageType(),
      },
    })

    dialogRef.afterClosed().subscribe((submitResult) => {
      if (!submitResult) return

      this.applicationService
        .createNewApplication(submitResult.selectedUser, submitResult.appType)
        .subscribe({
          next: () => {
            this.reloadApplications()
          },
          error: (err) => {
            alert(err.error.message)
          },
        })
    })
  }
}
