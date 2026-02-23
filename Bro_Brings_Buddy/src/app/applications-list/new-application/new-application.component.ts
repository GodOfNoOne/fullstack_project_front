import { Component, computed, inject, OnInit, output, signal } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { ApplicationService } from '../application.service'
import { AppType } from '../../models/app-type.model'

@Component({
  selector: 'app-new-application',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule],
  templateUrl: './new-application.component.html',
  styleUrl: './new-application.component.css',
})
export class NewApplicationComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<NewApplicationComponent>)
  private applicationService = inject(ApplicationService)
  pageType = inject(MAT_DIALOG_DATA).pageType
  appType = this.pageType ? 'Admin' : 'Member'

  users = signal<string[]>([])

  search = signal('')

  ngOnInit() {
    this.applicationService.getAvailableUsers(this.appType as AppType).subscribe({
      next: (data) => {
        this.users.set(data)
      },
      error: (err) => {
        console.error('Failed to load users', err)
      },
    })
  }

  filteredUsers = computed(() => {
    const value = this.search().toLowerCase()
    return this.users().filter((user) => user.toLowerCase().includes(value))
  })

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.search.set(value)
  }

  onSelect(value: string) {
    this.search.set(value)
  }

  submit() {
    const selectedUser = this.search().trim()

    if (!this.users().includes(selectedUser)) {
      alert(`There is no ${selectedUser} in the system`)
      return
    }

    console.log(`Submitted ${this.appType} Application for:`, selectedUser)
    this.dialogRef.close({ selectedUser: selectedUser, appType: this.appType })
  }

  close() {
    this.dialogRef.close()
  }
}
