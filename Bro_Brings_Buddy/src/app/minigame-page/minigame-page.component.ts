import { Component, inject, signal } from '@angular/core'
import { Page } from '../models/page.model'
import { HeaderComponent } from '../header/header.component'
import { Router } from '@angular/router'
import { NavButtonsComponent } from '../nav-buttons/nav-buttons.component'
import { GameState } from '../models/gameState.model'

@Component({
  selector: 'app-minigame-page',
  imports: [HeaderComponent, NavButtonsComponent],
  templateUrl: './minigame-page.component.html',
  styleUrl: './minigame-page.component.css',
})
export class MinigamePageComponent {
  private router = inject(Router)
  pageType = signal<Page>('Minigame')

  state = signal<GameState>('idle')
  reactionTime = signal<number | undefined>(undefined)

  private startTime = 0
  private timeoutId: number | undefined

  startGame() {
    this.state.set('waiting')
    this.reactionTime.set(undefined)

    const randomDelay = Math.random() * 3000 + 1000

    this.timeoutId = setTimeout(() => {
      this.startTime = Date.now()
      this.state.set('ready')
    }, randomDelay)
  }

  handleClick() {
    if (this.state() === 'waiting') {
      clearTimeout(this.timeoutId)
      this.state.set('tooSoon')
      return
    }

    if (this.state() === 'ready') {
      const endTime = Date.now()
      const time = endTime - this.startTime

      this.reactionTime.set(time)
      this.state.set('clicked')
    }
  }

  reset() {
    this.state.set('idle')
    this.reactionTime.set(undefined)
  }

  goToHome() {
    this.router.navigate(['/home'])
  }
}
