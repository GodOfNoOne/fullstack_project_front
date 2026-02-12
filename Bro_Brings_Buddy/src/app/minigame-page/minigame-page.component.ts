import { Component, signal } from '@angular/core'
import { Page } from '../models/page.model'
import { HeaderComponent } from '../header/header.component'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-minigame-page',
  imports: [HeaderComponent, RouterLink],
  templateUrl: './minigame-page.component.html',
  styleUrl: './minigame-page.component.css',
})
export class MinigamePageComponent {
  pageType = signal<Page>('Minigame')
}
