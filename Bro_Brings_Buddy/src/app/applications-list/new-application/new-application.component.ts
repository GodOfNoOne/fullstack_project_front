import { Component, computed, inject, signal } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatAutocompleteModule } from '@angular/material/autocomplete'

@Component({
  selector: 'app-new-application',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule],
  templateUrl: './new-application.component.html',
})
export class NewApplicationComponent {
  private dialogRef = inject(MatDialogRef<NewApplicationComponent>)
  pageType = inject(MAT_DIALOG_DATA).pageType
  appType = this.pageType ? 'admin' : 'member'

  users = signal(['Itay', 'Daniel', 'Noa', 'Shahar', 'Eden'])

  search = signal('')

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
      console.log('Invalid user selection')
      return
    }

    console.log('Submitted Application for:', selectedUser)
    this.dialogRef.close(selectedUser)
  }

  close() {
    this.dialogRef.close()
  }
}
