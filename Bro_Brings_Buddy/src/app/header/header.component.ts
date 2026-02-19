import { Component, input } from '@angular/core'
import { AsyncPipe, DatePipe } from '@angular/common'
import { interval, map, Observable, startWith } from 'rxjs'
import { Role } from '../models/role.model'
import { Page } from '../models/page.model'

@Component({
  selector: 'app-header',
  imports: [DatePipe, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  username = input<string>()
  role = input<Role>()
  pageType = input.required<Page>()

  readonly dateTime$: Observable<Date> = interval(1000).pipe(
    startWith(0),
    map(() => new Date()),
  )
}
