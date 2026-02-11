import { Component, input } from '@angular/core'
import { AsyncPipe, DatePipe } from '@angular/common'
import { interval, map, Observable, startWith } from 'rxjs'
import { required } from '@angular/forms/signals'
import { Role } from '../../models/role.model'

@Component({
  selector: 'app-home-header',
  imports: [DatePipe, AsyncPipe],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.css',
})
export class HomeHeaderComponent {
  username = input<string>()
  role = input<Role>()

  readonly dateTime$: Observable<Date> = interval(1000).pipe(
    startWith(0),
    map(() => new Date()),
  )
}
