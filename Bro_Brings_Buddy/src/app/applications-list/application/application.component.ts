import { Component, input } from '@angular/core'
import { ApplicationFrom } from '../../models/application-form.model'

@Component({
  selector: 'app-application',
  imports: [],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css',
})
export class ApplicationComponent {
  application = input<ApplicationFrom>()
  canDeleteApp = input.required<boolean>()
}
