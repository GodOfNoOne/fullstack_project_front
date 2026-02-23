import { Component, computed, input, output } from '@angular/core'
import { Direction } from '../models/directions.model'

@Component({
  selector: 'app-nav-buttons',
  imports: [],
  templateUrl: './nav-buttons.component.html',
})
export class NavButtonsComponent {
  label = input.required<string>()
  direction = input<Direction>('left')

  clicked = output()

  onClick() {
    this.clicked.emit()
  }
}
