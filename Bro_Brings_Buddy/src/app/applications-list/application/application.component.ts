import { Component, inject, input, output } from '@angular/core'
import { ApplicationFrom } from '../../models/application-form.model'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-application',
  imports: [DatePipe],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css',
})
export class ApplicationComponent {
  application = input<ApplicationFrom>()
  canDeleteApp = input.required<boolean>()
  canVote = input.required<boolean>()

  deleteApp = output<number>()

  onDelete() {
    const wantsToDelete = window.confirm('Are you sure you want to this delete application?')

    if (wantsToDelete) {
      this.deleteApp.emit(this.application()!.appId)
    }
  }

  vote = output<number>()
  unvote = output<number>()

  onVote() {
    this.vote.emit(this.application()!.appId)
  }
  onUnvote() {
    this.unvote.emit(this.application()!.appId)
  }
}
